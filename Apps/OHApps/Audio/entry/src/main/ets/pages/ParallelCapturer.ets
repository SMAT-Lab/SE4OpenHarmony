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
import common from '@ohos.app.ability.common';
import router from '@ohos.router';
import resourceManager from '@ohos.resourceManager';
import { BusinessError } from '@ohos.base';

const TOTAL_SECOND = 30;
const NORMAL_INDEX = 0;
const SCREEN_INDEX = 1;
const MIN_RECORD_SECOND = 5;
const RANDOM_NUM = 10000;
const INTERVAL_TIME = 1000;
const READ_TIME_OUT_SCREEN = 0;
const READ_TIME_OUT_NORMAL = 0;
class Options {
  offset: number = 0;
  length: number = 0;
}

@Entry
@Component
struct ParallelCapturer {
  @State fontColor: string = '#182431';
  @State selectedFontColor: string = '#007DFF';
  @State currentIndex: number = 1;
  // Capturer
  private audioCapturerNormal?: audio.AudioCapturer;
  private audioCapturerScreen?: audio.AudioCapturer;
  @State recordState: string = 'init'; // [init,started,stoped]
  @State recordSec: number = 0;
  private interval: number = 0;
  @State showTime: string = '00:00:00';
  private audioCapturerOptionNormal: audio.AudioCapturerOptions = {
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
  private audioCapturerOptionScreen: audio.AudioCapturerOptions = {
    streamInfo: {
      samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
      channels: audio.AudioChannel.CHANNEL_2,
      sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
      encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
    },
    capturerInfo: {
      source: 2,
      capturerFlags: 0
    },
    playbackCaptureConfig: {
      filterOptions: {
        usages: [audio.StreamUsage.STREAM_USAGE_MUSIC]
      }
    }
  };
  // recorder data
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
  private bufferSizeNormal = 0;
  private bufferSizeScreen = 0;
  @State date: string = '';
  private audioRenderers: audio.AudioRenderer[] = [];
  @State titleList: string[] = ['', ''];
  @State pathList: string[] = ['', ''];
  @State fdList: number[] = [0, 0];
  @State playSecList: number[] = [0, 0];
  @State renderStateList: number[] = [0, 0];
  @State renderStartOffsetList: number[] = [0, 0];
  @State isRecordOver: boolean = false;

  // Music Player
  private audioRendererOptionsMusic: audio.AudioRendererOptions = {
    streamInfo: {
      samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
      channels: audio.AudioChannel.CHANNEL_2,
      sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
      encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
    },
    rendererInfo: {
      usage: audio.StreamUsage.STREAM_USAGE_MUSIC,
      rendererFlags: 0
    },
    privacyType: 0
  };
  private audioRendererMusic?: audio.AudioRenderer;
  @State renderMusicState: number = 0;
  @State curTimeSec: number = 0;
  @State startMusicOffset: number = 0;
  private appContext?: common.Context;
  private fileDescriptor?: resourceManager.RawFileDescriptor;
  private audioSource = 'test1.wav';

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
    console.log('ParallelCapturer aboutToAppear');
    await this.initResource();
  }

  async initResource(): Promise<void> {
    this.appContext = getContext(this);
    this.fileDescriptor = await this.getStageFileDescriptor(this.audioSource);
    await this.CreateMusicRenderer(this.audioRendererOptionsMusic);
    try {
      this.audioCapturerNormal = await audio.createAudioCapturer(this.audioCapturerOptionNormal);
      console.log('ParallelCapturer,Normal capturer successs');
      this.audioCapturerScreen = await audio.createAudioCapturer(this.audioCapturerOptionScreen);
      console.log('ParallelCapturer,Screen capturer successs');

      this.bufferSizeNormal = await this.audioCapturerNormal.getBufferSize();
      this.bufferSizeScreen = await this.audioCapturerScreen.getBufferSize();
      // recorder init
      this.recordState = 'init';
    } catch (err) {
      let error = err as BusinessError;
      console.log(`ParallelCapturer:createAudioCapturer err=${JSON.stringify(error)}`);
    }
  }

  async releseResource(): Promise<void> {
    if (this.interval !== 0) {
      clearInterval(this.interval);
    }
    if (this.fdList[NORMAL_INDEX] > 0) {
      this.closeFile(this.fdList[NORMAL_INDEX]);
      this.fdList[NORMAL_INDEX] = 0;
    }

    if (this.fdList[SCREEN_INDEX] > 0) {
      this.closeFile(this.fdList[SCREEN_INDEX]);
      this.fdList[SCREEN_INDEX] = 0;
    }

    if (this.audioCapturerNormal) {
      await this.audioCapturerNormal.release();
      console.log('ParallelCapturer,audioCapturerNormal.release success');
      this.audioCapturerNormal = undefined;
    }

    if (this.audioCapturerScreen) {
      await this.audioCapturerScreen.release();
      console.log('ParallelCapturer,audioCapturerScreen.release success');
      this.audioCapturerScreen = undefined;
    }

    if (this.fileDescriptor) {
      await this.closeResource('test1.wav');
      this.fileDescriptor = undefined;
    }

    if (this.audioRendererMusic) {
      await this.audioRendererMusic.release();
      this.audioRendererMusic = undefined;
    }
    for (let index = 0; index < this.audioRenderers.length; index++) {
      await this.audioRenderers[index].release();
    }
    this.audioRenderers = [];
  }

  async aboutToDisappear(): Promise<void> {
    console.log('ParallelCapturer aboutToDisappear');
    await this.releseResource();
  }

  async openFile(path: string): Promise<number | undefined> {
    try {
      await fs.open(path, 0o100);
      console.log('ParallelCapturer,file created success');
    } catch (err) {
      let error = err as BusinessError;
      console.log('ParallelCapturer,file created err:' + JSON.stringify(error));
      return;
    }

    let file: fs.File;
    try {
      file = await fs.open(path, 0o2);
      console.log(`ParallelCapturer,file open success for read and write mode,fd=${file.fd}`);
      return file.fd;
    } catch (err) {
      let error = err as BusinessError;
      console.log('ParallelCapturer,file open err:' + JSON.stringify(error));
      return 0;
    }
  }

  async closeFile(fd: number): Promise<void> {
    try {
      await fs.close(fd);
      console.log('ParallelCapturer,file close success');
    } catch (err) {
      let error = err as BusinessError;
      console.log('ParallelCapturer,file close err:' + JSON.stringify(error));
      return;
    }
  }

  sleep(ms: number): Promise<number> {
    return new Promise<number>((resolve) => setTimeout(resolve, ms));
  }

  async capturerStart(): Promise<void> {
    if (!this.audioCapturerNormal) {
      console.log(`ParallelCapturer:audioCapturerNormal is null`);
      return;
    }
    if (!this.audioCapturerScreen) {
      console.log(`ParallelCapturer:audioCapturerScreen is null`);
      return;
    }
    if (this.renderMusicState === audio.AudioState.STATE_PREPARED) {
      this.startMusicRenderer();
    }
    await this.sleep(200);

    try {
      await this.audioCapturerNormal.start();
      console.log('ParallelCapturer,audioCapturerNormal start success');
      await this.audioCapturerScreen.start();
      console.log('ParallelCapturer,audioCapturerScreen start success');

      // when start,init recordSec
      this.recordState = 'started';
      console.log('audioCapturer start ok');

      clearInterval(this.interval);
      this.interval = setInterval(async () => {
        if (this.recordSec >= TOTAL_SECOND) {
          // over TOTAL_SECOND,need to stop automatically
          this.capturerStop();
          return;
        }
        this.recordSec++;
        this.showTime = this.getTimesBySecond(this.recordSec);
      }, INTERVAL_TIME);

      let titleNormal = `${this.getDate(2)}_${Math.floor(Math.random() * RANDOM_NUM)}_Normal`;
      let pathNormal = `/data/storage/el2/base/haps/entry/files/capturer_${titleNormal}.pcm`;
      let mode = 1;
      this.date = this.getDate(mode);
      let titleScreen = `${this.getDate(2)}_${Math.floor(Math.random() * RANDOM_NUM)}_Screen`;
      let pathScreen = `/data/storage/el2/base/haps/entry/files/capturer_${titleScreen}.pcm`;
      this.titleList[NORMAL_INDEX] = titleNormal;
      this.titleList[SCREEN_INDEX] = titleScreen;
      this.pathList[NORMAL_INDEX] = pathNormal;
      this.pathList[SCREEN_INDEX] = pathScreen;
      let fdNormal = await this.openFile(pathNormal) as number;
      let fdScreen = await this.openFile(pathScreen) as number;
      this.fdList[NORMAL_INDEX] = fdNormal;
      this.fdList[SCREEN_INDEX] = fdScreen;
      setTimeout(async () => {
        if (this.audioCapturerNormal) {
          await this.readCapturer(this.audioCapturerNormal, this.bufferSizeNormal, fdNormal);
          console.log('ParallelCapturer,audioCapturerNormal readCapturer success');
        }
      }, READ_TIME_OUT_NORMAL);
      setTimeout(async () => {
        if (this.audioCapturerScreen) {
          await this.readCapturer(this.audioCapturerScreen, this.bufferSizeScreen, fdScreen);
          console.log('ParallelCapturer,audioCapturerScreen readCapturer success');
        }
      }, READ_TIME_OUT_SCREEN);
    } catch (err) {
      let error = err as BusinessError;
      console.log(`ParallelCapturer,:audioCapturer start err=${JSON.stringify(error)}`);
    }
  }

  async capturerStop(): Promise<void> {
    if (this.recordSec < MIN_RECORD_SECOND || !this.audioCapturerNormal || !this.audioCapturerScreen) {
      return;
    }
    try {

      await this.audioCapturerNormal.stop();
      await this.audioCapturerScreen.stop();
      // when recordState is stopped
      this.recordState = 'stopped';
      clearInterval(this.interval);
      if (this.renderMusicState === audio.AudioState.STATE_RUNNING) {
        this.pauseMusicRenderer();
      }
    } catch (err) {
      let error = err as BusinessError;
      console.log(`ParallelCapturer,:audioCapturer stop err=${JSON.stringify(error)}`);
    }
    this.isRecordOver = true;

    console.log(JSON.stringify(this.titleList));
    await this.renderCreate();
  }

  async readCapturer(audioCapturer: audio.AudioCapturer, bufferSize: number, fd: number): Promise<void> {
    console.log('ParallelCapturer,start readCapturer');
    try {
      let startOffset = 0;
      while (true) {
        if (audioCapturer.state === audio.AudioState.STATE_STOPPED) {
          console.log('ParallelCapturer,state is changed to be stopped');
          break;
        }
        let buffer = await audioCapturer.read(bufferSize, true);
        if (fd === this.fdList[NORMAL_INDEX]) {
          console.log('NormalCapturer:readCapturer Normal read success');
        } else if (fd === this.fdList[SCREEN_INDEX]) {
          console.log('NormalCapturer:readCapturer Screen read success');
        }

        let options: Options = {
          offset: startOffset,
          length: bufferSize
        };
        let writenSize = await fs.write(fd, buffer, options);
        if (fd === this.fdList[NORMAL_INDEX]) {
          console.log('ParallelCapturer--Normal,fd===' + fd + ',writenSize=' + writenSize);
        } else if (fd === this.fdList[SCREEN_INDEX]) {
          console.log('ParallelCapturer--Screen,fd===' + fd + ',writenSize=' + writenSize);
        }
        startOffset += bufferSize;
      }
    }
    catch (err) {
      let error = err as BusinessError;
      console.log(`ParallelCapturer,readCapturer err=${JSON.stringify(error)}`);
    }
  }

  async renderCreate(): Promise<void> {
    try {
      this.audioRenderers[NORMAL_INDEX] = await audio.createAudioRenderer(this.audioRendererOptions);
      this.audioRenderers[SCREEN_INDEX] = await audio.createAudioRenderer(this.audioRendererOptions);

      this.renderStateList[NORMAL_INDEX] = this.audioRenderers[NORMAL_INDEX].state;
      this.renderStateList[SCREEN_INDEX] = this.audioRenderers[SCREEN_INDEX].state;

      this.audioRenderers[NORMAL_INDEX].on('stateChange', (state) => {
        console.log('ParallelCapturer,renderStateList[0] is changed to ' + state);
        this.renderStateList[NORMAL_INDEX] = state;
      });
      this.audioRenderers[SCREEN_INDEX].on('stateChange', (state) => {
        console.log('ParallelCapturer,renderStateList[1] is changed to ' + state);
        this.renderStateList[SCREEN_INDEX] = state;
      });
    } catch (err) {
      let error = err as BusinessError;
      console.log(`ParallelCapturer,createAudioRenderer err=${JSON.stringify(error)}`);
    }
  }

  async renderStart(index: number): Promise<void> {
    let bufferSize = 0;
    try {
      bufferSize = await this.audioRenderers[index].getBufferSize();
      await this.audioRenderers[index].start();
    } catch (err) {
      let error = err as BusinessError;
      console.log(`ParallelCapturer,audioRenderers start err:${JSON.stringify(error)}`);
    }

    try {
      let stat = await fs.stat(this.pathList[index]);
      console.log(`ParallelCapturer,index:${index} stat=${JSON.stringify(stat)}`);
      let buf = new ArrayBuffer(bufferSize);
      console.log(`ParallelCapturer,audioRenderer write start..........`);
      let startOffset = this.renderStartOffsetList[index];
      while (startOffset <= stat.size) {
        if (this.audioRenderers[index].state === audio.AudioState.STATE_PAUSED) {
          break;
        }
        // change tag,to stop
        if (this.audioRenderers[index].state === audio.AudioState.STATE_STOPPED) {
          break;
        }
        if (this.audioRenderers[index].state === audio.AudioState.STATE_RELEASED) {
          return
        }
        let options: Options = {
          offset: startOffset,
          length: bufferSize
        };
        await fs.read(this.fdList[index], buf, options);
        await this.audioRenderers[index].write(buf);
        this.playSecList[index] = Math.round(startOffset / stat.size * this.recordSec); //changed
        startOffset = startOffset + bufferSize;
        this.renderStartOffsetList[index] = startOffset;
      }
      console.log(`ParallelCapturer,audioRenderer write end..........`);
      if (this.audioRenderers[index].state === audio.AudioState.STATE_RUNNING) {
        this.renderStartOffsetList[index] = 0;
        await this.renderStop(index);
      }
    } catch (err) {
      let error = err as BusinessError;
      console.log(`ParallelCapturer,write err:${JSON.stringify(error)}`);
    }
  }

  async renderPause(index: number): Promise<void> {
    try {
      await this.audioRenderers[index].pause();
    } catch (err) {
      let error = err as BusinessError;
      console.log(`ParallelCapturer,pause err:${JSON.stringify(error)}`);
    }
  }

  async renderStop(index: number): Promise<void> {
    try {
      await this.audioRenderers[index].stop();
      this.renderStartOffsetList[index] = 0;
    } catch (err) {
      let error = err as BusinessError;
      console.log(`ParallelCapturer,stop err:${JSON.stringify(error)}`);
    }
  }

  async renderRelease(index: number): Promise<void> {
    try {
      await this.audioRenderers[index].release();
    } catch (err) {
      let error = err as BusinessError;
      console.log(`ParallelCapturer,release err:${JSON.stringify(error)}`);
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
    let date = new Date()
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

  // start music player
  async getStageFileDescriptor(fileName: string): Promise<resourceManager.RawFileDescriptor | undefined> {
    let fileDescriptor: resourceManager.RawFileDescriptor | undefined = undefined;
    if (this.appContext) {
      let mgr = this.appContext.resourceManager;
      await mgr.getRawFd(fileName).then(value => {
        fileDescriptor = value;
        console.log('ParallelCapturer,case getRawFileDescriptor success fileName: ' + fileName);
      }).catch((error: BusinessError) => {
        console.log('ParallelCapturer,case getRawFileDescriptor err: ' + error);
      });
    }
    return fileDescriptor;
  }

  async closeResource(fileName: string): Promise<void> {
    if (this.appContext) {
      let mgr = this.appContext.resourceManager;
      await mgr.closeRawFd(fileName).then(() => {
        console.log('ParallelCapturer,case closeRawFd success fileName: ' + fileName);
      }).catch((error: BusinessError) => {
        console.log('ParallelCapturer,case closeRawFd err: ' + error);
      });
    }
  }

  async CreateMusicRenderer(options: audio.AudioRendererOptions): Promise<void> {
    try {
      this.audioRendererMusic = await audio.createAudioRenderer(options);
      this.renderMusicState = this.audioRendererMusic.state;
      this.audioRendererMusic.on('stateChange', (state) => {
        console.log('ParallelCapturer,renderMusicState is changed to ' + state);
        this.renderMusicState = state;
      });
    } catch (err) {
      let error = err as BusinessError;
      console.log(`ParallelCapturer,createAudioRenderer err=${JSON.stringify(error)}`);
    }
  }

  async startMusicRenderer(): Promise<void> {
    if (!this.audioRendererMusic || !this.fileDescriptor) {
      return;
    }
    let bufferSize: number = 0;
    try {
      bufferSize = await this.audioRendererMusic.getBufferSize();
      await this.audioRendererMusic.start();
    } catch (err) {
      let error = err as BusinessError;
      console.error(`ParallelCapturer,audioRenderer start : Error: ${JSON.stringify(error)}`);
      return;
    }
    try {
      let buf = new ArrayBuffer(bufferSize);
      let start = this.fileDescriptor.offset;
      if (this.startMusicOffset === 0) {
        this.startMusicOffset = start;
      }
      let cur = this.startMusicOffset;
      // start + this.fileDescriptor.length is end offset
      while (cur <= start + this.fileDescriptor.length) {
        // when render released,state is changed to STATE_RELEASED
        if (this.audioRendererMusic.state === audio.AudioState.STATE_RELEASED) {
          break;
        }
        // when render paused,state is changed to STATE_PAUSED
        if (this.audioRendererMusic.state === audio.AudioState.STATE_PAUSED) {
          this.startMusicOffset = cur;
          break;
        }

        // change tag,to stop
        if (this.audioRendererMusic.state === audio.AudioState.STATE_STOPPED) {
          this.startMusicOffset = cur;
          break;
        }

        let options: Options = {
          offset: cur,
          length: bufferSize
        };
        console.log('startMusicRenderer,options=' + JSON.stringify(options));
        await fs.read(this.fileDescriptor.fd, buf, options);
        await this.audioRendererMusic.write(buf);
        // update progress
        this.curTimeSec = this.getCurTimeSec(TOTAL_SECOND, this.fileDescriptor.length, cur - start);
        cur += bufferSize;
      }
      // when audio play completed,update state to stopped
      if (this.audioRendererMusic.state === audio.AudioState.STATE_RUNNING) {
        await this.audioRendererMusic.stop();
        this.startMusicOffset = 0;
        this.curTimeSec = TOTAL_SECOND;
      }
    } catch (err) {
      let error = err as BusinessError;
      console.error(`ParallelCapturer,audioRenderer write : Error: ${JSON.stringify(error)}`);
    }
  }

  async pauseMusicRenderer(): Promise<void> {
    try {
      if (this.audioRendererMusic) {
        await this.audioRendererMusic.pause();
      }
    } catch (err) {
      let error = err as BusinessError;
      console.error(`ParallelCapturer,pauseMusicRenderer pause : Error: ${JSON.stringify(error)}`);
      return;
    }
  }

  async stopMusicRenderer(): Promise<void> {
    try {
      if (this.audioRendererMusic) {
        await this.audioRendererMusic.stop();
      }
    } catch (err) {
      let error = err as BusinessError;
      console.error(`ParallelCapturer,pauseMusicRenderer stop : Error: ${JSON.stringify(error)}`);
      return;
    }
  }

  getCurTimeSec(totalSec: number, totalLen: number, PastLen: number): number {
    return Number((totalSec / totalLen * PastLen).toFixed(0));
  }

  @Builder InitRecord() {
    Column() {
      Image($r('app.media.ic_record')).width(56).height(56);
    }
    .width('100%')
    .height(56)
    .position({ y: 60 })
    .id('parallel_start_btn')
    .onClick(() => {
      this.capturerStart();
    });
  }

  @Builder StartedRecord() {
    Column() {
      Text(this.showTime).fontSize(21).fontWeight(500).margin({ bottom: 8 });
    }.width('100%').height(66).position({ y: 30 });

    Column() {
      Image($r('app.media.ic_recording')).width(56).height(56);
    }
    .width('100%')
    .height(56)
    .position({ y: 60 })
    .id('parallel_stop_btn')
    .onClick(() => {
      this.capturerStop();
    });
  }

  @Builder FinishedRecord() {
    Column() {
      Image($r('app.media.ic_record')).width(56).height(56);
    }.width('100%').height(56).position({ y: 60 }).opacity(0.4);
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
      .id('parallel_capturer_back_btn')
      .width('100%')
      .height(56)
      .onClick(async () => {
        await router.replaceUrl({ url: 'pages/Index' });
      });

      Column() {
        Tabs({ barPosition: BarPosition.Start, index: 1 }) {
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
          this.currentIndex = index
          console.log(`${index}`)
          if (this.currentIndex === 0) {
            router.replaceUrl({ url: 'pages/NormalCapturer' });
          }
        })
        .width('100%')
        .height(56)
      }.padding({ left: 12, right: 12 });

      Column() {
        Row() {
          Row() {
            Image($r('app.media.ic_music')).width(48).height(48);
            Text($r('app.string.MusicType'))
              .fontSize(16)
              .margin({ left: 12 })
              .fontFamily($r('sys.string.ohos_id_text_font_family_medium'))
              .fontColor('#182431')
              .fontWeight(500);
          }

          if (this.renderMusicState === audio.AudioState.STATE_RUNNING) {
            Image($r('app.media.ic_play_y')).width(36).height(36);
          } else {
            Image($r('app.media.ic_pause_y')).width(36).height(36);
          }

        }.justifyContent(FlexAlign.SpaceBetween).width('100%').margin({ top: 12 });

        Row() {
          Progress({ value: this.curTimeSec, total: TOTAL_SECOND, type: ProgressType.Linear })
            .color('#007DFF')
            .value(this.curTimeSec)
            .width('100%')
            .height(4)
        }.margin({ top: 24, bottom: 3 }).width('100%');

        Row() {
          Text(this.getTimesBySecond(this.curTimeSec))
            .fontSize(12)
            .fontFamily($r('sys.string.ohos_id_text_font_family_medium'))
            .fontColor('#182431')
            .opacity(0.6)
            .fontWeight(400);
          Text(this.getTimesBySecond(TOTAL_SECOND))
            .fontSize(12)
            .fontFamily($r('sys.string.ohos_id_text_font_family_medium'))
            .fontColor('#182431')
            .opacity(0.6)
            .fontWeight(400);
        }.justifyContent(FlexAlign.SpaceBetween).width('100%');
      }
      .id('music_player_card')
      .height(126)
      .width('100%')
      .padding({ left: 12, right: 12 })
      .backgroundColor(Color.White)
      .margin({ bottom: 20, top: 12 })
      .borderRadius(24)
      .margin({ top: 12 })
      .onClick(() => {
        if (this.renderMusicState === audio.AudioState.STATE_PREPARED) {
          this.startMusicRenderer();
        }
        if (this.renderMusicState === audio.AudioState.STATE_RUNNING) {
          this.pauseMusicRenderer();
        }
        if (this.renderMusicState === audio.AudioState.STATE_PAUSED) {
          this.startMusicRenderer();
        }
        if (this.renderMusicState === audio.AudioState.STATE_STOPPED) {
          this.startMusicRenderer();
        }
      });

      if (this.isRecordOver === true) {
        Column() {
          Row() {
            Text($r('app.string.RECORD_RESULT'))
              .fontSize(14)
              .fontWeight(400)
              .fontFamily($r('sys.string.ohos_id_text_font_family_medium'))
              .opacity(0.6)
              .id('record_result')
              .textAlign(TextAlign.Start);
          }.padding({ left: 12, right: 12 }).width('100%').margin({ top: 16, bottom: 8 });

          ForEach(this.titleList, (item: string, index) => {
            Column() {
              Row() {
                Text(this.titleList[index as number])
                  .fontSize(16)
                  .fontWeight(500)
                  .fontColor('#182431')
                  .fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
                if (this.renderStateList[index as number] === audio.AudioState.STATE_RUNNING) {
                  Image($r('app.media.ic_record_playing')).width(24).height(24).id('playing_state' + (index as number));
                } else {
                  Image($r('app.media.ic_record_paused')).width(24).height(24).id('paused_state' + (index as number));
                }

              }.width('100%').height(24).justifyContent(FlexAlign.SpaceBetween).margin({ top: 16 });

              Row() {
                Text(this.date)
                  .fontSize(14)
                  .fontWeight(400)
                  .fontColor('#182431')
                  .opacity(0.6)
                  .fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
                Text(this.getTimesBySecond(this.recordSec) + '')
                  .fontSize(14)
                  .fontWeight(400)
                  .fontColor('#182431')
                  .opacity(0.6)
                  .fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
              }.width('100%').height(24).justifyContent(FlexAlign.SpaceBetween).margin({ top: 4 });

              Row() {
                Progress({ value: this.playSecList[index as number], total: this.recordSec, type: ProgressType.Linear })
                  .color('#007DFF')
                  .value(this.playSecList[index as number])
                  .width('100%')
                  .height(4);
              }.margin({ top: 23, bottom: 3 });

              Row() {
                Text(this.getTimesBySecond(this.playSecList[index as number]) + '')
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
            .padding({ left: 12, right: 12 })
            .borderRadius(24)
            .margin({ bottom: 12 })
            .id('record_player' + (index as number))
            .onClick(() => {
              if (this.renderStateList[index as number] === audio.AudioState.STATE_PREPARED) {
                this.renderStart(index as number);
              }
              if (this.renderStateList[index as number] === audio.AudioState.STATE_RUNNING) {
                this.renderPause(index as number);
              }
              if (this.renderStateList[index as number] === audio.AudioState.STATE_PAUSED) {
                this.renderStart(index as number);
              }
              if (this.renderStateList[index as number] === audio.AudioState.STATE_STOPPED) {
                this.renderStart(index as number);
              }
            });
          });
        }
      }
      Row() {
        if (this.recordState === 'init') { // init
          this.InitRecord();
        } else if (this.recordState === 'started') { // started
          this.StartedRecord();
        } else if (this.recordState === 'stopped') { // finished
          this.FinishedRecord();
        }
      }
      .width('100%')
      .position({ y: '82%' })
      .alignItems(VerticalAlign.Top)
      .height(116)
      .id('record_btn');
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Start)
    .backgroundColor('#F1F3F5')
    .padding({ left: 12, right: 12 });
  }
}
