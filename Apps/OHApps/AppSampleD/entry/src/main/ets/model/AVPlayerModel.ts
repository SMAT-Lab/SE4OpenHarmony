/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import media from '@ohos.multimedia.media';
import Logger from '../utils/Logger'

const TAG: string = '[AVPlayerModel]'

export default  class AVPlayerModel {
  private avPlayer: media.AVPlayer;
  private count: number = 1;
  private surfaceID: string = ''; // surfaceID用于播放画面显示，具体的值需要通过Xcomponent接口获取，相关文档链接见上面Xcomponent创建方法
  private isSeek: boolean = true; // 用于区分模式是否支持seek操作

  private context;

  constructor(context) {
    this.context = context;
  }

  // 注册avplayer回调函数
  setAVPlayerCallback() {
    // seek操作结果回调函数
    this.avPlayer.on('seekDone', (seekDoneTime) => {
      Logger.info(TAG, `AVPlayer seek succeeded, seek time is ${seekDoneTime}`);
    })
    // error回调监听函数,当avPlayer在操作过程中出现错误时调用reset接口触发重置流程
    this.avPlayer.on('error', (err) => {
      Logger.info(TAG, `Invoke avPlayer failed, code is ${err.code}, message is ${err.message}`);
      this.avPlayer.reset(); // 调用reset重置资源，触发idle状态
    })
    // 状态机变化回调函数
    this.avPlayer.on('stateChange', async (state, reason) => {
      switch (state) {
        case 'idle': // 成功调用reset接口后触发该状态机上报
          Logger.info(TAG, 'AVPlayer state idle called.');
          this.avPlayer.release(); // 调用release接口销毁实例对象
          break;
        case 'initialized': // avplayer 设置播放源后触发该状态上报
          Logger.info(TAG, 'AVPlayerstate initialized called.');
          if (this.surfaceID) {
            this.avPlayer.surfaceId = this.surfaceID; // 设置显示画面，当播放的资源为纯音频时无需设置
          }
          this.avPlayer.prepare().then(() => {
            Logger.info(TAG, 'AVPlayer prepare succeeded.');
          }, (err) => {
            Logger.info(TAG, `Invoke prepare failed, code is ${err.code}, message is ${err.message}`);
          });
          break;
        case 'prepared': // prepare调用成功后上报该状态机
          Logger.info(TAG, 'AVPlayer state prepared called.');
          this.avPlayer.play(); // 调用播放接口开始播放
          break;
        case 'playing': // play成功调用后触发该状态机上报
          Logger.info(TAG, 'AVPlayer state playing called.');
          if (this.count !== 0) {
            if (this.isSeek) {
              Logger.info(TAG, 'AVPlayer start to seek.');
            } else {
              // 当播放模式不支持seek操作时继续播放到结尾
              Logger.info(TAG, 'AVPlayer wait to play end.');
            }
          } else {
            this.avPlayer.pause(); // 调用暂停接口暂停播放
          }
          this.count++;
          break;
        case 'paused': // pause成功调用后触发该状态机上报
          Logger.info(TAG, 'AVPlayer state paused called.');
          this.avPlayer.loop = true;
          break;
        case 'completed': // 播放结束后触发该状态机上报
          Logger.info(TAG, 'AVPlayer state completed called.');
          this.avPlayer.play(); // 再次播放接口开始播放
          break;
        case 'stopped': // stop接口成功调用后触发该状态机上报
          Logger.info(TAG, 'AVPlayer state stopped called.');
          this.avPlayer.reset(); // 调用reset接口初始化avplayer状态
          break;
        case 'released':
          Logger.info(TAG, 'AVPlayer state released called.');
          break;
        default:
          Logger.info(TAG, 'AVPlayer state unknown called.');
          break;
      }
    })
  }

  public play(){
    if (this.avPlayer) {
      this.avPlayer.play();
    }
  }
  public paused(){
    if (this.avPlayer) {
      this.avPlayer.pause();
    }
  }

  // 以下demo为使用资源管理接口获取打包在HAP内的媒体资源文件并通过fdSrc属性进行播放示例
  async avPlayerFdSrcDemo(avName: string, surfaceID?: string) {
    if (surfaceID) {
      this.surfaceID = surfaceID;
    }
    // 创建avPlayer实例对象
    this.avPlayer = await media.createAVPlayer();
    // 创建状态机变化回调函数
    this.setAVPlayerCallback();
    // 通过UIAbilityContext的resourceManager成员的getRawFd接口获取媒体资源播放地址
    // 返回类型为{fd,offset,length},fd为HAP包fd地址，offset为媒体资源偏移量，length为播放长度
    let context = this.context;
    let fileDescriptor = await context.resourceManager.getRawFd(avName);
    this.isSeek = false; // 支持seek操作
    // 为fdSrc赋值触发initialized状态机上报
    this.avPlayer.fdSrc = fileDescriptor;
  }

  // 以下demo为通过url设置网络地址来实现播放直播码流的demo
  async avPlayerLiveDemo() {
    // 创建avPlayer实例对象
    this.avPlayer = await media.createAVPlayer();
    // 创建状态机变化回调函数
    this.setAVPlayerCallback();
    this.isSeek = false; // 不支持seek操作
    this.avPlayer.url = 'http://xxx.xxx.xxx.xxx:xx/xx/index.m3u8'; // 播放hls网络直播码流
  }
}
