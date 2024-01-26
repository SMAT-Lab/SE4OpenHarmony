/*
 * Copyright 2023 Unionman Technology Co., Ltd.
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
import { TitleBar } from '../../common/TitleBar';
import media from '@ohos.multimedia.media';
import Logger from '../../model/Logger';
import config from '@ohos.accessibility.config';
import { BusinessError } from '@ohos.base';

const TAG = 'audioSample'

enum playType {
  LEFT,
  RIGHT,
  ALL
}

@Entry
@Component
export struct audioSample {
  @State myPlayType: playType = playType.ALL; //
  private fileName: string[] = ['EP11.mp4', 'Technology.wav'];
  private avPlayer: media.AVPlayer;

  async releaseAllAudio() {
    if (this.avPlayer) {
      await this.avPlayer.stop();
      await this.avPlayer.release();
      this.avPlayer = undefined;
    }
  }

  // 注册avplayer回调函数
  setAVPlayerCallback() {
    // seek操作结果回调函数
    this.avPlayer.on('seekDone', (seekDoneTime: number) => {
      Logger.info(TAG, `AVPlayer seek succeeded, seek time is ${seekDoneTime}`);
    })
    // error回调监听函数,当avPlayer在操作过程中出现错误时调用 reset接口触发重置流程
    this.avPlayer.on('error', (err) => {
      Logger.error(`Invoke avPlayer failed, code is ${err.code}, message is ${err.message}`);
      this.avPlayer.reset(); // 调用reset重置资源，触发idle状态
    })
    // 状态机变化回调函数
    this.avPlayer.on('stateChange', async (state: string, reason: media.StateChangeReason) => {
      switch (state) {
        case 'idle': // 成功调用reset接口后触发该状态机上报
          Logger.info(TAG, ' AVPlayer state idle called.');
          break;
        case 'initialized': // avplayer 设置播放源后触发该状态上报
          Logger.info(TAG, ' AVPlayer state initialized called.');
          this.avPlayer.prepare();
          break;
        case 'prepared': // prepare调用成功后上报该状态机
          Logger.info(TAG, ' AVPlayer state prepared called.');
          this.avPlayer.play(); // 调用播放接口开始播放
          break;
        case 'playing': // play成功调用后触发该状态机上报
          Logger.info(TAG, ' AVPlayer state playing called.');
          break;
        case 'paused': // pause成功调用后触发该状态机上报
          Logger.info(TAG, ' AVPlayer state paused called.');
          this.avPlayer.play(); // 再次播放接口开始播放
          break;
        case 'completed': // 播放结束后触发该状态机上报
          Logger.info(TAG, ' AVPlayer state completed called.');
          this.avPlayer.stop(); //调用播放结束接口
          break;
        case 'stopped': // stop接口成功调用后触发该状态机上报
          Logger.info(TAG, ' AVPlayer state stopped called.');
          this.avPlayer.reset(); // 调用reset接口初始化avplayer状态
          break;
        case 'released':
          Logger.info(TAG, ' AVPlayer state released called.');
          break;
        default:
          Logger.info(TAG, ' AVPlayer state unknown called.');
          break;
      }
    })
  }

  async aboutToDisappear() {
    this.releaseAllAudio();
    await config.audioBalance.set(0);
  }

  async startPlay(fileDescriptor) {
    // 创建avPlayer实例对象
    this.avPlayer = await media.createAVPlayer();
    // 创建状态机变化回调函数
    this.setAVPlayerCallback();
    // 通过UIAbilityContext的resourceManager成员的getRawFd接口获取媒体资源播放地址
    // 返回类型为{fd,offset,length},fd为HAP包fd地址，offset为媒体资源偏移量，length为播放长度
    let avFileDescriptor: media.AVFileDescriptor =
      { fd: fileDescriptor.fd, offset: fileDescriptor.offset, length: fileDescriptor.length };
    // 为fdSrc赋值触发initialized状态机上报
    this.avPlayer.fdSrc = avFileDescriptor;
    await this.avPlayer.prepare();
    // this.avPlayer.setVolume(1);
    await this.avPlayer.play();
  }
  async playAudioAll() {
    await this.releaseAllAudio();
    let fileDescriptor = await globalThis.context.resourceManager.getRawFd(this.fileName[1]);

    switch (this.myPlayType) {
      case playType.LEFT:
        config.audioBalance.set(-1).then(() => {
          Logger.info(TAG, `accessibilityConfigSetting config success.`);
          this.startPlay(fileDescriptor);
        }).catch((err: BusinessError) => {
          Logger.error(TAG, `accessibilityConfigSetting config fail. err: ${JSON.stringify(err)}`);
          return;
        });
        break;
      case playType.RIGHT:
        // TODO:右声道适配存在问题
        config.audioBalance.set(1).then(() => {
          this.startPlay(fileDescriptor);
          Logger.info(TAG, `accessibilityConfigSetting config success.`);
        }).catch((err: BusinessError) => {
          Logger.error(TAG, `accessibilityConfigSetting config fail. err: ${JSON.stringify(err)}`);
          return;
        });
        break;
      case playType.ALL:
        fileDescriptor = await globalThis.context.resourceManager.getRawFd(this.fileName[0]);
        await this.startPlay(fileDescriptor);
        break;
    }
  }

  build() {
    Column() {
      TitleBar({ title: '扬声器测试' })
      Scroll() {
        Row() {
          Text("左声道播放")
            .layoutWeight(1)
            .height('100%')
            .backgroundColor(Color.Blue)
            .onClick(() => {
              this.myPlayType = playType.LEFT;
              this.playAudioAll();
            })
          Column() {
            Text("全声道播放")
              .height('50%')
              .onClick(() => {
                this.myPlayType = playType.ALL;
                this.playAudioAll();
              })
            Text("暂停播放")
              .height('50%')
              .onClick(() => {
                this.releaseAllAudio();
              })
          }.layoutWeight(1)

          Text("右声道播放")
            .layoutWeight(1)
            .backgroundColor(Color.Blue)
            .height('100%')
            .onClick(() => {
              this.myPlayType = playType.RIGHT;
              this.playAudioAll();
            })
        }
        .height(40)
        .width('100%')
        .constraintSize({ minHeight: '100%' })
      }
    }
  }
}
