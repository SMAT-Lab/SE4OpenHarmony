/*
* Copyright (C) 2023 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
import audio from '@ohos.multimedia.audio';
import fs from '@ohos.file.fs';
import router from '@ohos.router';
import { BusinessError } from '@ohos.base';

const MIN_RECORD_SECOND = 5;
const TOTAL_SECOND = 30;
const RANDOM_NUM = 10000;
const INTERVAL_TIME = 1000;
const READ_TIME_OUT = 0;
class Options {
  offset: number = 0;
  length: number = 0;
}

@Entry
@Component
struct NormalCapturer {
  @State fontColor: string = '#182431';
  @State selectedFontColor: string = '#007DFF';
  @State currentIndex: number = 0;
  private audioCapturer?: audio.AudioCapturer;
  private audioRenderer?: audio.AudioRenderer;
  @State recordState: string = 'init'; // [init,started,continued,paused,stoped];
  private audioCapturerOptions: audio.AudioCapturerOptions = {
    streamInfo: {
      samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
      channels: audio.AudioChannel.CHANNEL_2,
      sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
      encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
    },
    capturerInfo: {
      source: audio.SourceType.SOURCE_TYPE_MIC,
      capturerFlags: 0
    }
  };
  private audioRendererOptions: audio.AudioRendererOptions = {
    streamInfo: {
      samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
      channels: audio.AudioChannel.CHANNEL_2,
      sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
      encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
    },
    rendererInfo: {
      usage: audio.StreamUsage.STREAM_USAGE_MUSIC,
      rendererFlags: 0
    }
  };
  @State title: string = '';
  @State date: string = '';
  @State playSec: number = 0;
  @State renderState: number = 0;
  @State recordSec: number = 0;
  @State showTime: string = '00:00:00';
  private interval: number = 0;
  private bufferSize = 0;
  private path = ``;
  private fd = 0;
  @State isRecordOver: boolean = false;
  @State start: number = 0;
  @State capturerOffsetStart: number = 0;

  @Builder TabBuilder(index: number, btnId: string) {
    Column() {
      Text(index === 0 ? $r('app.string.NORMAL_CAPTURER') : $r('app.string.PARALLEL_CAPTURER'))
        .fontColor(this.currentIndex === index ? this.selectedFontColor : this.fontColor)
        .opacity(this.currentIndex === index ? 1 : 0.6)
        .fontSize(16)
        .fontWeight(this.currentIndex === index ? 500 : 400)
        .lineHeight(22)
        .margin({ top: 17, bottom: 7 });
      Divider()
        .strokeWidth(2)
        .color('#007DFF')
        .opacity(this.currentIndex === index ? 1 : 0);
    }.width(78).id('btn_' + btnId);
  }

  async aboutToAppear(): Promise<void> {
    console.log('NomalCapturer aboutToAppear');
    await this.initResource();
  }

  async initResource(): Promise<void> {
    try {
      this.audioCapturer = await audio.createAudioCapturer(this.audioCapturerOptions);
      this.bufferSize = await this.audioCapturer.getBufferSize();
      this.recordState = 'init';
      this.title = `${this.getDate(2)}_${Math.floor(Math.random() * RANDOM_NUM)}`;
      this.path = `/data/storage/el2/base/haps/entry/files/normal_capturer_${this.title}.pcm`;
      this.date = this.getDate(1);
      await this.openFile(this.path);
    } catch (err) {
      let error = err as BusinessError;
      console.log(`NormalCapturer:createAudioCapturer err=${JSON.stringify(error)}`);
    }
  }

  async releseResource(): Promise<void> {
    if (this.fd > 0) {
      this.closeFile();
      this.fd = 0;
    }
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (this.audioCapturer) {
      console.log('NomalCapturer,audioCapturer released');
      await this.audioCapturer.release();
      this.audioCapturer = undefined;
      this.recordState = 'init';
      clearInterval(this.interval);
    }
    if (this.audioRenderer) {
      console.log('NomalCapturer,audioRenderer released');
      await this.audioRenderer.release();
      this.audioRenderer = undefined;
    }
  }

  async aboutToDisappear(): Promise<void> {
    console.log('NomalCapturer,aboutToDisappear is called');
    await this.releseResource();
  }

  async openFile(path: string): Promise<void> {
    console.log(path);
    try {
      await fs.open(path, 0o100);
      console.log('file created success');
    } catch (err) {
      let error = err as BusinessError;
      console.log('file created err:' + JSON.stringify(error));
      return;
    }

    try {
      let file = await fs.open(path, 0o2);
      this.fd = file.fd;
      console.log(`file open success for read and write mode,fd=${file.fd}`);
    } catch (err) {
      let error = err as BusinessError;
      console.log('file open err:' + JSON.stringify(error));
      return;
    }
  }

  async closeFile(): Promise<void> {
    try {
      await fs.close(this.fd);
      console.log('file close success');
    } catch (err) {
      let error = err as BusinessError;
      console.log('file close err:' + JSON.stringify(error));
      return;
    }
  }

  async capturerStart(): Promise<void> {
    if (!this.audioCapturer) {
      console.log(`NormalCapturer,capturerStart:audioCapturer is null`);
      return;
    }

    try {
      await this.audioCapturer.start();
      // when start,init recordSec
      this.recordSec = 0;
      this.recordState = 'started';
      console.log('audioCapturer start ok');
      clearInterval(this.interval);
      this.interval = setInterval(async () => {
        if (this.recordSec >= TOTAL_SECOND) {
          // over TOTAL_SECOND,need to stop auto
          clearInterval(this.interval);
          if (this.audioCapturer && this.audioCapturer.state === audio.AudioState.STATE_RUNNING) {
            await this.capturerStop();
          }
          return;
        }
        this.recordSec++;
        this.showTime = this.getTimesBySecond(this.recordSec);

      }, INTERVAL_TIME);
      setTimeout(async () => {
        await this.readCapturer();
      }, READ_TIME_OUT);
    } catch (err) {
      let error = err as BusinessError;
      console.log(`NormalCapturer:audioCapturer start err=${JSON.stringify(error)}`);
    }
  }

  async renderCreate(): Promise<void> {
    try {
      this.audioRenderer = await audio.createAudioRenderer(this.audioRendererOptions);
      this.renderState = this.audioRenderer.state;
      this.audioRenderer.on('stateChange', (state) => {
        this.renderState = state;
      });
    } catch (err) {
      let error = err as BusinessError;
      console.log(`createAudioRenderer err=${JSON.stringify(error)}`);
    }
  }

  async renderStart(): Promise<void> {
    if (!this.audioRenderer) {
      return;
    }
    let bufferSize = 0;
    try {
      bufferSize = await this.audioRenderer.getBufferSize();
      await this.audioRenderer.start();
    } catch (err) {
      let error = err as BusinessError;
      console.log(`start err:${JSON.stringify(error)}`);
    }

    try {
      let stat = await fs.stat(this.path);
      let buf = new ArrayBuffer(bufferSize);
      console.log(`audioRenderer write start..........`);
      let startOffset = this.start;
      while (startOffset <= stat.size) {
        if (this.audioRenderer.state === audio.AudioState.STATE_PAUSED) {
          break;
        }
        // change tag,to stop
        if (this.audioRenderer.state === audio.AudioState.STATE_STOPPED) {
          break;
        }
        if (this.audioRenderer.state === audio.AudioState.STATE_RELEASED) {
          return;
        }
        let options: Options = {
          offset: startOffset,
          length: bufferSize
        };
        console.log('renderStart,options=' + JSON.stringify(options));

        await fs.read(this.fd, buf, options);
        await this.audioRenderer.write(buf);
        this.playSec = Math.round(startOffset / stat.size * this.recordSec);
        startOffset = startOffset + bufferSize;
        this.start = startOffset;
      }
      console.log(`audioRenderer write end..........`)
      if (this.audioRenderer.state === audio.AudioState.STATE_RUNNING) {
        this.start = 0;
        await this.renderStop();
      }
    } catch (err) {
      let error = err as BusinessError;
      console.log(`write err:${JSON.stringify(error)}`);
    }
  }

  async renderPause(): Promise<void> {
    if (!this.audioRenderer) {
      return;
    }
    try {
      await this.audioRenderer.pause();
    } catch (err) {
      let error = err as BusinessError;
      console.log(`pause err:${JSON.stringify(error)}`);
    }
  }

  async renderStop(): Promise<void> {
    if (!this.audioRenderer) {
      return;
    }
    try {
      await this.audioRenderer.stop();
      this.start = 0;
    } catch (err) {
      let error = err as BusinessError;
      console.log(`stop err:${JSON.stringify(error)}`);
    }
  }

  async releaseStop(): Promise<void> {
    if (!this.audioRenderer) {
      return;
    }
    try {
      await this.audioRenderer.release();
    } catch (err) {
      let error = err as BusinessError;
      console.log(`release err:${JSON.stringify(error)}`);
    }
  }

  async capturerContinue(): Promise<void> {
    if (!this.audioCapturer) {
      console.log(`NormalCapturer,capturerContinue:audioCapturer is null`);
      return;
    }

    try {
      await this.audioCapturer.start()
      this.recordState = 'continued';
      console.log('audioCapturer start ok');
      this.interval = setInterval(async () => {
        if (this.recordSec >= TOTAL_SECOND) {
          // over TOTAL_SECOND,need to stop auto
          clearInterval(this.interval);
          if (this.audioCapturer && this.audioCapturer.state === audio.AudioState.STATE_RUNNING) {
            await this.capturerStop();
          }
          return;
        }
        this.recordSec++;
        this.showTime = this.getTimesBySecond(this.recordSec);
      }, INTERVAL_TIME);
      setTimeout(async () => {
        await this.readCapturer();
      }, READ_TIME_OUT);
    } catch (err) {
      let error = err as BusinessError;
      console.log(`NormalCapturer:audioCapturer start err=${JSON.stringify(error)}`);
    }
  }

  async capturerStop(): Promise<void> {
    if (!this.audioCapturer) {
      console.log(`NormalCapturer,capturerStop:audioCapturer is null`);
      return;
    }
    if (this.recordSec < MIN_RECORD_SECOND) {
      return;
    }

    try {
      await this.audioCapturer.stop();
      // when recordState is started or continued
      this.recordState = 'stopped';
      clearInterval(this.interval);
    } catch (err) {
      let error = err as BusinessError;
      // when recordState is paused
      this.recordState = 'stopped';
      console.log(`NormalCapturer:audioCapturer stop err=${JSON.stringify(error)}`);
    }
    this.isRecordOver = true;
    await this.renderCreate();
  }

  async capturerPause(): Promise<void> {
    if (!this.audioCapturer) {
      console.log(`NormalCapturer,capturerPause:audioCapturer is null`);
      return;
    }

    try {
      await this.audioCapturer.stop();
      this.recordState = 'paused';

      clearInterval(this.interval);
    } catch (err) {
      let error = err as BusinessError;
      console.log(`NormalCapturer:audioCapturer stop err=${JSON.stringify(error)}`);
      return;
    }
  }

  async readCapturer(): Promise<void> {
    console.log('NormalCapturer:readCapturer enter');
    if (!this.audioCapturer) {
      console.log(`NormalCapturer,readCapturer:audioCapturer is null`);
      return;
    }

    try {
      let startOffset = this.capturerOffsetStart;
      while (true) {
        if (this.audioCapturer.state === audio.AudioState.STATE_STOPPED) {
          console.log('state is changed to be stopped');
          break;
        }
        let buffer = await this.audioCapturer.read(this.bufferSize, true);
        console.log('NormalCapturer:readCapturer read success');
        let options: Options = {
          offset: startOffset,
          length: this.bufferSize
        };
        let writen = await fs.write(this.fd, buffer, options);
        console.log(`NormalCapturer:readCapturer,startOffset=${startOffset},writen=${writen}`);
        startOffset += this.bufferSize;
        this.capturerOffsetStart = startOffset;
      }
    } catch (err) {
      let error = err as BusinessError;
      console.log(`readCapturer err=${JSON.stringify(error)}`);
    }
  }

  formatNumber(num: number): string {
    if (num <= 9) {
      return '0' + num;
    } else {
      return '' + num;
    }
  }

  getDate(mode: number): string {
    let date = new Date();
    if (mode === 1) {
      return `${date.getFullYear()}/${this.formatNumber(date.getMonth() + 1)}/${this.formatNumber(date.getDate())}`;
    } else {
      return `${date.getFullYear()}${this.formatNumber(date.getMonth() + 1)}${this.formatNumber(date.getDate())}`;
    }
  }

  getTimesBySecond(t: number): string {
    let h = Math.floor(t / 60 / 60 % 24);
    let m = Math.floor(t / 60 % 60);
    let s = Math.floor(t % 60);
    let hs = h < 10 ? '0' + h : h;
    let ms = m < 10 ? '0' + m : m;
    let ss = s < 10 ? '0' + s : s;
    return `${hs}:${ms}:${ss}`;
  }

  @Builder InitRecord() {
    Column() {
      Image($r('app.media.ic_record')).width(56).height(56);
    }
    .width('100%')
    .height(56)
    .position({ y: 60 })
    .id('normal_start_record_btn')
    .onClick(() => {
      this.capturerStart();
    });
  }

  @Builder StartedRecord() {
    Column() {
      Text(this.showTime).fontSize(21).fontWeight(500).margin({ bottom: 8 })
    }.width('100%').height(66).position({ y: 30 }).id('normal_show_time_txt');


    Column() {
      Image($r('app.media.ic_recording')).width(56).height(56);
    }
    .width('100%')
    .height(56)
    .position({ y: 60 })
    .id('normal_stop_record_btn')
    .onClick(() => {
      this.capturerStop();
    });

    Column() {
      Image($r('app.media.ic_record_pause')).width(24).height(24);
      Text($r('app.string.PAUSE')).fontSize(12).fontWeight(400).id('normal_pause_record_btn').margin({ top: 2 });
    }
    .height(56)
    .width(56)
    .position({ x: '80%', y: 60 })
    .alignItems(HorizontalAlign.Center)
    .justifyContent(FlexAlign.Center)
    .onClick(() => {
      this.capturerPause();
    });
  }

  @Builder PausedRecord() {
    Column() {
      Text(this.showTime).fontSize(21).fontWeight(500).margin({ bottom: 8 });
    }.width('100%').height(66).position({ y: 30 });

    Column() {
      Image($r('app.media.ic_recording')).width(56).height(56);
    }.width('100%').height(56).position({ y: 60 })
    .onClick(() => {
      this.capturerStop();
    });

    Column() {
      Image($r('app.media.ic_record_continue')).width(24).height(24);
      Text($r('app.string.CONTINUE')).fontSize(12).fontWeight(400).margin({ top: 2 });
    }
    .height(56)
    .width(56)
    .position({ x: '80%', y: 60 })
    .alignItems(HorizontalAlign.Center)
    .justifyContent(FlexAlign.Center)
    .id('normal_continue_record_btn')
    .onClick(() => {
      this.capturerContinue();
    });
  }

  @Builder FinishedRecord() {
    Column() {
      Image($r('app.media.ic_record')).width(56).height(56);
    }
    .width('100%')
    .height(56)
    .position({ y: 60 })
    .opacity(0.4)
    .id('disalbe_btn');
  }

  build() {
    Column() {
      Column() {
        Navigation() {
        }
        .width('100%')
        .height('100%')
        .hideBackButton(false)
        .titleMode(NavigationTitleMode.Mini)
        .title($r('app.string.AUDIO_CAPTURER'))
        .mode(NavigationMode.Stack)
        .backgroundColor('#F1F3F5');
      }
      .id('normal_capturer_back_btn')
      .width('100%')
      .height(56)
      .onClick(async () => {
        await router.replaceUrl({ url: 'pages/Index' });
      });

      Column() {
        Tabs({ barPosition: BarPosition.Start, index: 0 }) {
          TabContent() {
          }.tabBar(this.TabBuilder(0, 'normal_capturer'));

          TabContent() {
          }.tabBar(this.TabBuilder(1, 'parallel_capturer'));
        }
        .vertical(false)
        .barMode(BarMode.Fixed)
        .barWidth(360)
        .barHeight(56)
        .animationDuration(400)
        .onChange((index: number) => {
          this.currentIndex = index;
          if (this.currentIndex === 1) {
            router.replaceUrl({ url: 'pages/ParallelCapturer' });
          }
        })
        .width('100%')
        .height(56)
      }.padding({ left: 12, right: 12 });


      if (this.isRecordOver === true) {
        Column() {
          Row() {
            Text(this.title)
              .fontSize(16)
              .fontWeight(500)
              .fontColor('#182431')
              .fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
            if (this.renderState === audio.AudioState.STATE_RUNNING) {
              Image($r('app.media.ic_record_playing')).width(24).height(24).id('playing_state');
            } else {
              Image($r('app.media.ic_record_paused')).width(24).height(24).id('paused_state');
            }

          }.width('100%').height(24).justifyContent(FlexAlign.SpaceBetween).margin({ top: 16 });

          Row() {
            Text(this.date)
              .fontSize(16)
              .fontWeight(400)
              .fontColor('#182431')
              .opacity(0.6)
              .fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
            Text(this.getTimesBySecond(this.recordSec) + '')
              .fontSize(16)
              .fontWeight(400)
              .fontColor('#182431')
              .opacity(0.6)
              .fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
          }.width('100%').height(24).justifyContent(FlexAlign.SpaceBetween).margin({ top: 4 });

          Row() {
            Progress({ value: this.playSec, total: this.recordSec, type: ProgressType.Linear })
              .color('#007DFF')
              .value(this.playSec)
              .width('100%')
              .height(4)
          }.margin({ top: 23, bottom: 3 });

          Row() {
            Text(this.getTimesBySecond(this.playSec) + '')
              .fontSize(12)
              .fontFamily($r('sys.string.ohos_id_text_font_family_medium'))
              .fontColor('#182431')
              .opacity(0.6)
              .fontWeight(400);
            Text(this.getTimesBySecond(this.recordSec) + '')
              .fontSize(12)
              .fontFamily($r('sys.string.ohos_id_text_font_family_medium'))
              .fontColor('#182431')
              .opacity(0.6)
              .fontWeight(400);
          }.justifyContent(FlexAlign.SpaceBetween).width('100%');
        }
        .width('100%')
        .height(126)
        .backgroundColor(Color.White)
        .borderRadius(24)
        .margin({ top: 12 })
        .padding({ left: 12, right: 12 })
        .id('normal_player')
        .onClick(() => {
          if (this.renderState === audio.AudioState.STATE_PREPARED) {
            this.renderStart();
          }
          if (this.renderState === audio.AudioState.STATE_RUNNING) {
            this.renderPause();
          }
          if (this.renderState === audio.AudioState.STATE_PAUSED) {
            this.renderStart();
          }
          if (this.renderState === audio.AudioState.STATE_STOPPED) {
            this.renderStart();
          }
        });
      }
      Row() {
        if (this.recordState === 'init') {
          this.InitRecord();
        } else if (this.recordState === 'started') {
          this.StartedRecord();
        } else if (this.recordState === 'paused') {
          this.PausedRecord();
        } else if (this.recordState === 'continued') {
          this.StartedRecord();
        } else if (this.recordState === 'stopped') {
          this.FinishedRecord();
        }
      }
      .width('100%')
      .alignItems(VerticalAlign.Center)
      .height(116)
      .position({ y: '82%' });
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Start)
    .backgroundColor('#F1F3F5')
    .padding({ left: 12, right: 12 });
  }
}
