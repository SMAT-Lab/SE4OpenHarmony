/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 *
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
 *
 */
import media from '@ohos.multimedia.media';
import Logger from '../model/Logger';

const TAG: string = 'AVPlayerUtils';

export default class AVPlayerUtils {
  private avPlayer: media.AVPlayer = undefined
  private avPlayerState: string = ''
  private playPath: string = ''
  private surfaceID: string = ''
  private timeUpdateCallBack: (time: number) => void = undefined

  async initVideoPlayer(playSrc: string, surfaceID: string) {
    await this.release()
    this.playPath = playSrc
    this.surfaceID = surfaceID
    // 创建avPlayer实例对象
    this.avPlayer = await media.createAVPlayer()
    Logger.info(TAG, 'createVideoPlayer')
    // 创建状态机变化回调函数
    this.setAVPlayerCallback();
    this.avPlayer.url = this.playPath
    Logger.info(TAG, 'this.avPlayer.url' + this.avPlayer.url)
    this.avPlayer.on('timeUpdate', (time: number) => {
      Logger.info(TAG, 'timeUpdate success,and new time is :' + time)
      if (this.timeUpdateCallBack) {
        this.timeUpdateCallBack(time)
      }
    });
    Logger.info(TAG, 'init VideoPlayer finish')
  }

  // 注册avplayer回调函数
  setAVPlayerCallback() {
    // seek操作结果回调函数
    this.avPlayer.on('seekDone', (seekDoneTime: number) => {
      Logger.info(TAG, `AVPlayer seek succeeded, seek time is ${seekDoneTime}`);
    })
    // error回调监听函数,当avPlayer在操作过程中出现错误时调用 reset接口触发重置流程
    this.avPlayer.on('error', err => {
      Logger.error(TAG, `Invoke avPlayer failed, code is ${err.code}, message is ${err.message}`);
      this.avPlayer.reset(); // 调用reset重置资源，触发idle状态
    })
    // 状态机变化回调函数
    this.avPlayer.on('stateChange', async (state: string, reason: media.StateChangeReason) => {
      switch (state) {
        case 'idle': // 成功调用reset接口后触发该状态机上报
          Logger.info(TAG, 'AVPlayer state idle called.');
          this.avPlayerState = 'idle';
          this.avPlayer.release(); // 调用release接口销毁实例对象
          break;
        case 'initialized': // avplayer 设置播放源后触发该状态上报
          Logger.info(TAG, 'AVPlayer state initialized called.');
          this.avPlayerState = 'initialized';
          this.avPlayer.surfaceId = this.surfaceID;
          Logger.info(TAG, 'setDisplaySurface');
          this.avPlayer.prepare();
          break;
        case 'prepared': // prepare调用成功后上报该状态机
          Logger.info(TAG, 'AVPlayer state prepared called.');
          this.avPlayerState = 'prepared';
          break;
        case 'playing': // play成功调用后触发该状态机上报
          Logger.info(TAG, 'AVPlayer state playing called.');
          this.avPlayerState = 'playing';
          break;
        case 'paused': // pause成功调用后触发该状态机上报
          Logger.info(TAG, 'AVPlayer state paused called.');
          this.avPlayerState = 'paused';
          break;
        case 'completed': // 播放结束后触发该状态机上报
          Logger.info(TAG, 'AVPlayer state completed called.');
          this.avPlayerState = 'completed';
          break;
        case 'stopped': // stop接口成功调用后触发该状态机上报
          Logger.info(TAG, 'AVPlayer state stopped called.');
          this.avPlayerState = 'stopped';
          break;
        case 'released':
          Logger.info(TAG, 'AVPlayer state released called.');
          this.avPlayerState = 'released';
          break;
        default:
          Logger.info(TAG, 'AVPlayer state unknown called.');
          break;
      }
    })
  }

  async play() {
    Logger.info(TAG, 'play')
    if (typeof (this.avPlayer) != 'undefined') {
      await this.avPlayer.play()
    }
  }

  async seek(time: number) {
    Logger.info(TAG, 'seek')
    if (typeof (this.avPlayer) != 'undefined' &&
    (this.avPlayerState === 'prepared' || this.avPlayerState === 'playing' || this.avPlayerState === 'paused' || this.avPlayerState === 'completed')) {
      this.avPlayer.seek(time * 1000)
    }
  }

  async setSpeed(speed: media.PlaybackSpeed) {
    Logger.info(TAG, 'setSpeed')
    if (typeof (this.avPlayer) != 'undefined') {
      this.avPlayer.setSpeed(speed)
    }
  }

  async pause() {
    Logger.info(TAG, 'pause')
    if (typeof (this.avPlayer) != 'undefined') {
      await this.avPlayer.pause()
    }
  }

  async stop() {
    Logger.info(TAG, 'stop')
    if (typeof (this.avPlayer) != 'undefined') {
      await this.avPlayer.stop()
    }
  }

  async reset(playSrc: string) {
    Logger.info(TAG, 'reset')
    if (typeof (this.avPlayer) != 'undefined') {
      this.playPath = playSrc
      await this.avPlayer.reset()
      this.avPlayer.url = this.playPath
      await this.avPlayer.prepare()
    }
  }

  async release() {
    Logger.info(TAG, 'release')
    if (typeof (this.avPlayer) != 'undefined') {
      await this.avPlayer.release()
      Logger.info(TAG, 'release success')
    }
  }

  setTimeUpdateCallBackCallBack(callback) {
    this.timeUpdateCallBack = callback
  }
}