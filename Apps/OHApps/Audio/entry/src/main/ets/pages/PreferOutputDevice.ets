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
import common from '@ohos.app.ability.common';
import fs from '@ohos.file.fs';
import audio from '@ohos.multimedia.audio';
import router from '@ohos.router';
import resourceManager from '@ohos.resourceManager';
import { BusinessError } from '@ohos.base';

class Options {
  offset: number = 0;
  length: number = 0;
}

@Entry
@Component
struct PreferOutputDevice {
  private appContext?: common.Context;
  private audioRendererOption: audio.AudioRendererOptions = {
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
  private audioRenderer?: audio.AudioRenderer;
  private audioSource = 'test1.wav';
  private fileDescriptor?: resourceManager.RawFileDescriptor;
  private audioRoutingManager?: audio.AudioRoutingManager;
  @State preferOutputDeviceName: string = '';

  async aboutToAppear(): Promise<void> {
    this.init();
  }

  async init(): Promise<void> {
    if (this.appContext) {
      return;
    }
    this.appContext = getContext();
    let audioManager = audio.getAudioManager();
    this.audioRoutingManager = audioManager.getRoutingManager();
    this.audioRoutingManager.on('deviceChange', audio.DeviceFlag.OUTPUT_DEVICES_FLAG, async (deviceChanged) => {
      await this.getPreferOutputDeviceForRendererInfo();
    });
    await this.getPreferOutputDeviceForRendererInfo();
    await this.getStageFileDescriptor(this.audioSource).then((res) => {
      this.fileDescriptor = res;
    });
    await this.renderPlay();
  }

  async over(): Promise<void> {
    this.appContext = undefined;
    if (this.audioRenderer) {
      await this.audioRenderer.release();
      this.audioRenderer = undefined;
    }
    if (this.fileDescriptor) {
      this.closeResource(this.audioSource);
      this.fileDescriptor = undefined;
    }
    this.audioRoutingManager = undefined;
  }

  onBackPress(): void {
    this.over();
  }

  async onPageHide(): Promise<void> {
    this.over();
  }

  onPageShow(): void {
    this.init();
  }

  async getStageFileDescriptor(fileName: string): Promise<resourceManager.RawFileDescriptor | undefined> {
    let fileDescriptor: resourceManager.RawFileDescriptor | undefined = undefined;
    if (this.appContext) {
      let mgr = this.appContext.resourceManager;
      await mgr.getRawFd(fileName).then(value => {
        fileDescriptor = value;
        console.log('case getRawFileDescriptor success fileName: ' + fileName);
      }).catch((error: BusinessError) => {
        console.log('case getRawFileDescriptor err: ' + error);
      });
    }
    return fileDescriptor;
  }

  async closeResource(fileName: string): Promise<void> {
    if (this.appContext) {
      let mgr = this.appContext.resourceManager;
      await mgr.closeRawFd(fileName).then(() => {
        console.log('case closeRawFd success fileName: ' + fileName);
      }).catch((error: BusinessError) => {
        console.log('case closeRawFd err: ' + error);
      });
    }
  }

  getPreferOutputDeviceForRendererInfo(): void {
    if (this.audioRoutingManager) {
      this.audioRoutingManager.getPreferOutputDeviceForRendererInfo(this.audioRendererOption.rendererInfo)
        .then(data => {
          console.log(`--zhangkai--getPreferOutputDeviceForRendererInfo data:${JSON.stringify(data[0])}`);
          this.preferOutputDeviceName = this.getDeviceList(data[0]);
        }).catch((err: BusinessError) => {
        this.preferOutputDeviceName = 'Invalid';
        console.log(`getPreferOutputDeviceForRendererInfo err:${JSON.stringify(err)}`);
      });
    }
  }

  getZNDeviceTypeName(deviceTypeName: string): string {
    if (this.appContext) {
      let map = new Map<string, string>();
      map.set('EARPIECE', this.appContext.resourceManager.getStringSync($r('app.string.EarPiece').id));
      map.set('SPEAKER', this.appContext.resourceManager.getStringSync($r('app.string.Speaker').id));
      map.set('WIRED_HEADSET', this.appContext.resourceManager.getStringSync($r('app.string.WiredHeadset').id));
      map.set('WIRED_HEADPHONES', this.appContext.resourceManager.getStringSync($r('app.string.WiredHeadPhones').id));
      map.set('BLUETOOTH_A2DP', this.appContext.resourceManager.getStringSync($r('app.string.Bluetooth_A2DP').id));
      map.set('BLUETOOTH_SCO', this.appContext.resourceManager.getStringSync($r('app.string.BLUETOOTH_SCO').id));
      map.set('USB_HEADSET', this.appContext.resourceManager.getStringSync($r('app.string.USB_Headset').id));
      if (map.get(deviceTypeName)) {
        return map.get(deviceTypeName) as string;
      } else {
        return 'Invalid';
      }
    } else {
      return '';
    }
  }

  getDeviceList(deviceDescriptor: audio.AudioDeviceDescriptor): string {
    let deviceTypeName = this.getDeviceTypeNameByValue(deviceDescriptor.deviceType);
    return this.getZNDeviceTypeName(deviceTypeName);
  }

  getDeviceTypeNameByValue(value: audio.DeviceType): string {
    let map = new Map<number, string>();
    map.set(1, 'EARPIECE');
    map.set(2, 'SPEAKER');
    map.set(3, 'WIRED_HEADSET');
    map.set(4, 'WIRED_HEADPHONES');
    map.set(8, 'BLUETOOTH_A2DP');
    map.set(7, 'BLUETOOTH_SCO');
    map.set(22, 'USB_HEADSET');
    if (map.get(value)) {
      return map.get(value) as string;
    }
    return 'Invalid';
  }

  async renderPlay(): Promise<void> {
    if (this.audioRenderer) {
      return;
    }
    try {
      this.audioRenderer = await audio.createAudioRenderer(this.audioRendererOption);
    } catch (err) {
      let error = err as BusinessError;
      console.error(`audioRenderer create : Error: ${JSON.stringify(error)}`);
      return;
    }
    let bufferSize : number;
    try {
      bufferSize = await this.audioRenderer.getBufferSize();
      await this.audioRenderer.start();
    } catch (err) {
      let error = err as BusinessError;
      console.error(`audioRenderer start : Error: ${JSON.stringify(error)}`);
      return;
    }

    try {
      if (!this.fileDescriptor) {
        return;
      }
      let startOffset = this.fileDescriptor.offset;
      let cur = startOffset;
      let buf = new ArrayBuffer(bufferSize);
      while (true) {
        // when render released,state is changed to STATE_RELEASED
        if (this.audioRenderer.state === audio.AudioState.STATE_RELEASED) {
          break;
        }
        while (cur <= startOffset + this.fileDescriptor.length) {
          // when render released,state is changed to STATE_RELEASED
          if (this.audioRenderer.state.valueOf() === audio.AudioState.STATE_RELEASED.valueOf()) {
            break;
          }
          let options: Options = {
            offset: cur,
            length: bufferSize
          }
          await fs.read(this.fileDescriptor.fd, buf, options);
          await this.audioRenderer.write(buf);
          cur += bufferSize;
        }
        cur = startOffset;
      }
    } catch (err) {
      let error = err as BusinessError;
      console.error(`audioRenderer write : Error: ${JSON.stringify(error)}`);
    }
  }

  build() {
    Column() {
      Row() {
        Navigation() {
          NavRouter() {
            NavDestination() {
            }
          }
        }
        .height('100%')
        .width('100%')
        .hideBackButton(false)
        .titleMode(NavigationTitleMode.Mini)
        .title($r('app.string.SelectOutputDevice'))
        .mode(NavigationMode.Stack);
      }.height(56).width('100%').id('back_btn')
      .onClick(async () => {
        await router.pushUrl({ url: 'pages/Index' });
      });

      Column() {
        Row() {
          Row() {
            Image($r('app.media.ic_call')).width(48).height(48);
            Text($r('app.string.VoiceCallType'))
              .fontSize(16)
              .margin({ left: 12 })
              .fontFamily($r('sys.string.ohos_id_text_font_family_medium'))
              .fontColor('#182431')
              .fontWeight(500);
          }

          Row() {
            Text(this.preferOutputDeviceName)
              .id('device_name_text')
              .fontFamily($r('sys.string.ohos_id_text_font_family_medium'))
              .fontColor('#182431')
              .fontWeight(400)
              .opacity(0.6);
          }
        }
        .justifyContent(FlexAlign.SpaceBetween)
        .height(72)
        .width('100%')
        .padding({ left: '3.35%', right: '3.35%' })
        .backgroundColor(Color.White)
        .borderRadius(24);
      }.padding({ left: '3.35%', right: '3.35%' });
    }
    .height('100%').width('100%').backgroundColor('#f1f3f5');
  }
}