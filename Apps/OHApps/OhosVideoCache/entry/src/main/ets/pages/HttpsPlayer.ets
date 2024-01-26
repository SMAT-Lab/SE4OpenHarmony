/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { CommonConstants } from '../CommonConstants';
import Logger from '../Logger';
import MediaLibraryUtils from '../MediaLibraryUtils';
import mediaLibrary from '@ohos.multimedia.mediaLibrary';
import media from '@ohos.multimedia.media';
import audio from '@ohos.multimedia.audio';
import { CacheListener, HttpProxyCacheServer, HttpProxyCacheServerBuilder } from '@ohos/video-cache';
import GlobalProxyServer from '../GlobalProxyServer';
import fs from '@ohos.file.fs';

const TAG: string = 'MediaDemo HttpPlayer:';


@Entry
@Component
struct HttpPlayer {
  @State ratio: number = 1.0;
  @State mediaLibUtils: MediaLibraryUtils = new MediaLibraryUtils();
  @State isPlaying: boolean = true;
  @State currentTime: string = '0';
  @State durationTimeText: string = '100';
  @State setValue: number = 0;
  @State isLoop: boolean = false;
  @State videoName: string = '';
  @State isSpeed: boolean = false;
  @State descriptionValue: string = '';
  @State isBuffering: boolean = false;
  @State speedTag: number = 1;
  @State scaleTag: number = 0;
  @State currentCachePercent: number = 0;
  private avPlayer: media.AVPlayer | undefined = undefined;
  private duration: number = -1;
  private fdPath: string = '';
  private surfaceID: string = '';
  private isPrepare: boolean = false;
  private isNext = false;
  private index: number = -1;
  private movingTime: number = -1;
  private screenWidth: number = 1080; // 设备屏幕宽，建议使用接口调用获取
  private screenHeight: number = 1920; // 设备屏幕高，建议使用接口调用获取
  private volumeValue: number = 1.00;
  private mXcomponentController: XComponentController = new XComponentController();
  private SRC_LIST: Array<string> = new Array();

  // 界面初始化函数
  async aboutToAppear() {
    this.videoName = CommonConstants.VIDEO_HTTPS_LISTS[0];
    this.SRC_LIST = CommonConstants.VIDEO_HTTPS_LISTS;
    this.index = CommonConstants.VIDEO_HTTPS_LISTS.map(item => item).indexOf(this.videoName);
    Logger.info(TAG, 'aboutToAppear success, and play source is' + this.videoName);
  }

  // 界面销毁监听
  async aboutToDisappear(): Promise<void> {
    Logger.info(TAG, 'aboutToDisappear success');
    GlobalProxyServer?.getInstance()?.getServer()?.shutdown()
    this.setOffCallback();
    await this.avPlayer?.stop();
    await this.avPlayer?.release();
  }

  // 设置播放时间上报监听
  timeUpdate(): void {
    this.avPlayer?.on('timeUpdate', (time: number) => {
      Logger.info(TAG, 'timeUpdate called: time is :' + time);
      Logger.info(TAG, 'timeUpdate called: currentTime is :' + this.avPlayer?.currentTime);
      this.currentTime = this.mediaLibUtils.getShowTime(time);
      this.setValue = Math.round((time / this.duration) * 100);
    })
  }

  // 设置错误监听
  setErrorCallback(): void {
    this.avPlayer?.on('error', (error) => {
      Logger.error(TAG, 'error happened,message is :' + error.message);
      // 当error上报时自动播放下一个视频或者音频 this.nextVideo();
    })
  }

  // 注销回调函数接口
  setOffCallback(): void {
    this.avPlayer?.off('volumeChange');
    this.avPlayer?.off('endOfStream');
    this.avPlayer?.off('seekDone');
    this.avPlayer?.off('durationUpdate');
    this.avPlayer?.off('speedDone');
    this.avPlayer?.off('bitrateDone');
    this.avPlayer?.off('bufferingUpdate');
    this.avPlayer?.off('startRenderFrame');
    this.avPlayer?.off('videoSizeChange');
    this.avPlayer?.off('audioInterrupt');
    this.avPlayer?.off('availableBitrates');
    this.avPlayer?.off('error');
    this.avPlayer?.off('stateChange');
  }

  //设置播放surfaceID，播放音频时无需设置
  setSurfaceID(): void {
    if (this.avPlayer !== undefined) {
      this.avPlayer.surfaceId = this.surfaceID;
    }
  }

  // 视频信息上报函数
  async setSourceInfo(): Promise<void> {
    // 音量变化回调函数
    this.avPlayer?.on('volumeChange', (vol: number) => {
      Logger.info(TAG, 'volumeChange success,and new volume is :' + vol);
    });
    // 视频播放结束触发回调
    this.avPlayer?.on('endOfStream', () => {
      Logger.info(TAG, 'endOfStream success');
    });
    // seek操作回调函数
    this.avPlayer?.on('seekDone', (seekDoneTime: number) => {
      Logger.info(TAG, 'seekDone success,and seek time is:' + seekDoneTime);
    });
    // 视频总时长上报函数
    this.avPlayer?.on('durationUpdate', (duration: number) => {
      Logger.info(TAG, 'durationUpdate success,and durationUpdate is:' + duration);
    });
    // 设置倍速播放回调函数
    this.avPlayer?.on('speedDone', (speed: number) => {
      Logger.info(TAG, 'speedDone success,and speed value is:' + speed);
      Logger.info(TAG, 'speed state is :' + this.getState());
    });
    // bitrate设置成功回调函数
    this.avPlayer?.on('bitrateDone', (bitrate: number) => {
      Logger.info(TAG, 'bitrateDone success,and bitrate value is:' + bitrate);
    });
    // 缓冲上报回调函数
    this.avPlayer?.on('bufferingUpdate', (infoType: media.BufferingInfoType, value: number) => {
      Logger.info(TAG, 'bufferingUpdate success,and infoType value is:' + infoType + ', value is :' + value);
      switch (infoType) {
        case media.BufferingInfoType.BUFFERING_START:
          this.isBuffering = false;
          break;
        case media.BufferingInfoType.BUFFERING_END:
          this.isBuffering = true;
          break;
        case media.BufferingInfoType.BUFFERING_PERCENT:
          break;
        case media.BufferingInfoType.CACHED_DURATION:
          break;
        default:
          break;
      }
    });
    // 首帧上报回调函数
    this.avPlayer?.on('startRenderFrame', () => {
      Logger.info(TAG, 'startRenderFrame success');
    });
    // 视频宽高上报回调函数
    this.avPlayer?.on('videoSizeChange', (width: number, height: number) => {
      Logger.info(TAG, 'videoSizeChange success,and width is:' + width + ', height is :' + height);
    });
    // 焦点上报回调函数
    this.avPlayer?.on('audioInterrupt', (info: audio.InterruptEvent) => {
      // 触发焦点上报后调用暂停接口暂停播放
      this.pause();
      this.isPlaying = !this.isPlaying;
      Logger.info(TAG, 'audioInterrupt success,and InterruptEvent info is:' + JSON.stringify(info));
    });
    // HLS上报所有支持的比特率
    this.avPlayer?.on('availableBitrates', (bitrates: Array<number>) => {
      Logger.info(TAG, 'availableBitrates success,and availableBitrates length is:' + bitrates.length);
    });
  }

  // 状态机上报回调函数
  async setStateChangeCallback(): Promise<void> {
    this.avPlayer?.on('stateChange', async (state, reason) => {
      Logger.info(TAG, 'stateChange callback function is triggered,state is:' + state + ',reason is :' + reason);
      switch (state) {
        case 'idle':
          Logger.info(TAG, 'state idle called');
          break;
        case 'initialized':
          Logger.info(TAG, 'state initialized called');
          if (this.isNext) {
            this.setSurfaceID();
            await this.avPlayer?.prepare();
          }
          break;
        case 'prepared':
          this.getTrackDescription();
        // 设置焦点上报类型
          if (this.avPlayer != undefined) {
            this.avPlayer.audioInterruptMode = audio.InterruptMode.INDEPENDENT_MODE;
            this.duration = this.avPlayer?.duration;
            this.durationTimeText = this.mediaLibUtils.getShowTime(this.duration);
            Logger.info(TAG, 'state prepared called ：' + this.getCurrentTime());
            if (this.isNext) {
              this.play();
              this.isNext = false;
            }
          }
          break;
        case 'playing':
          Logger.info(TAG, 'state playing called');
          break;
        case 'paused':
          Logger.info(TAG, 'state paused called');
          if (!this.isPlaying) {
            this.isPlaying = !this.isPlaying;
          }
          break;
        case 'completed':
          Logger.info(TAG, 'state completed called');
          this.isPlaying = !this.isPlaying;
          break;
        case 'stopped':
          Logger.info(TAG, 'state stopped called');
          break;
        case 'released':
          Logger.info(TAG, 'state released called');
          break;
        case 'error':
          Logger.info(TAG, 'state error called');
          break;
        default:
          Logger.info(TAG, 'unkown state :' + state);
          break;
      }
    });
  }

  // 创建AVPlayer实例对象
  async createAVPlayer(): Promise<boolean> {
    Logger.info(TAG, 'createAVPlayer start');
    let ret = false
    let self = this;
    if (this.avPlayer !== undefined) {
      await this.avPlayer?.release();
      this.avPlayer = undefined;
    }
    this.avPlayer = await media.createAVPlayer();
    if (this.avPlayer !== undefined) {
      ret = true;
    }

    class MyCacheListener implements CacheListener {
      onCacheAvailable(cacheFilePath: string, url: string, percentsAvailable: number) {
        self.currentCachePercent = percentsAvailable;
      }
    }

    let server: HttpProxyCacheServer = new HttpProxyCacheServerBuilder(getContext())
      .build();
    server.registerCacheListener(new MyCacheListener(), this.videoName);
    GlobalProxyServer?.getInstance()?.setServer(server)
    let proxyUrl: string | undefined = await GlobalProxyServer?.getInstance()?.getServer()?.getProxyUrl(this.videoName)
    let newUrl = proxyUrl ? proxyUrl : this.videoName;
    // 由于avplayer不支持直接加载本地文件路径 这里需要转化为fd的路径
    if (newUrl.startsWith(getContext().cacheDir)) {
      let file = fs.openSync(newUrl, fs.OpenMode.READ_ONLY);
      newUrl = "fd://" + file.fd;
      self.currentCachePercent = 100;
    }
    this.fdPath = newUrl;
    if (this.avPlayer && this.getState() === 'idle') {
      this.avPlayer.url = this.fdPath;
    }
    Logger.info(TAG, 'createAVPlayer end');
    return ret;
  }

  // 播放文件打开函数
  async openMediaFile(fileName: string): Promise<mediaLibrary.FileAsset> {
    let fileAsset = await this.mediaLibUtils.findFile('0', fileName);
    return fileAsset;
  }

  // 调用播放接口
  async play(): Promise<void> {
    if (!this.isPrepare) {
      // 设置surfaceID，当播放的问题纯音频时，无需设置
      if (this.getState() == "initialized") {
        this.setSurfaceID();
      }
      await this.avPlayer?.prepare();
      this.isPrepare = !this.isPrepare;
    }
    Logger.info(TAG, 'start to play');
    this.avPlayer?.play();
  }

  // 暂停接口
  pause(): void {
    Logger.info(TAG, 'start to pause');
    this.avPlayer?.pause();
  }

  // 设置倍数接口
  setSpeed(speedValue: number): void {
    Logger.info(TAG, 'set speed value is:' + speedValue);
    switch (speedValue) {
      case 0:
        this.avPlayer?.setSpeed(media.PlaybackSpeed.SPEED_FORWARD_0_75_X);
        break;
      case 1:
        this.avPlayer?.setSpeed(media.PlaybackSpeed.SPEED_FORWARD_1_00_X);
        break;
      case 2:
        this.avPlayer?.setSpeed(media.PlaybackSpeed.SPEED_FORWARD_1_25_X);
        break;
      case 3:
        this.avPlayer?.setSpeed(media.PlaybackSpeed.SPEED_FORWARD_1_75_X);
        break;
      case 4:
        this.avPlayer?.setSpeed(media.PlaybackSpeed.SPEED_FORWARD_2_00_X);
        break;
      default:
        Logger.info(TAG, 'no this mode speed:' + speedValue);
        break;
    }
  }

  // 设置视频缩放接口
  setScaleType(sacleValue: number): void {
    Logger.info(TAG, 'set videoScaleType value is:' + sacleValue);
    switch (sacleValue) {
      case 0:
        if (this.avPlayer != undefined) {
          this.avPlayer.videoScaleType = media.VideoScaleType.VIDEO_SCALE_TYPE_FIT;
        }
        break;
      case 1:
        if (this.avPlayer != undefined) {
          this.avPlayer.videoScaleType = media.VideoScaleType.VIDEO_SCALE_TYPE_FIT_CROP;
        }
        break;
      default:
        Logger.info(TAG, 'no this mode videoScaleType:' + sacleValue);
        break;
    }
  }

  // 获取当前播放时间函数
  getCurrentTime(): number {
    return this.avPlayer?.currentTime ? this.avPlayer?.currentTime : 0;
  }

  // 获取当前播放状态函数
  getState(): string {
    return this.avPlayer?.state ? this.avPlayer?.state : '';
  }

  // 设置loop函数
  setLoop(loopValue: boolean): void {
    if (this.avPlayer != undefined) {
      this.avPlayer.loop = loopValue;
    }
  }

  // 获取轨道信息接口
  async getTrackDescription(): Promise<void> {
    await this.avPlayer?.getTrackDescription().then((arrayList: Array<media.MediaDescription>) => {
      this.descriptionValue = '';
      for (let i = 0; i < arrayList.length; i++) {
        for (let j = 0; j < arrayList[i].length; j++) {
          let property = arrayList[i][j];
          Logger.info(TAG, 'case key is  ' + j);
          Logger.info(TAG, 'case value is  ' + property);
          this.descriptionValue += j + " = " + property + "\n";
        }
      }
    }, (error: Error) => {
      Logger.info(TAG, 'getTrackDescription failed,message is:' + error.message);
    })
    Logger.info(TAG, 'getTrackDescription end, value is:' + this.descriptionValue);
  }

  // 初始化函数
  async initAVPlayer(): Promise<void> {
    Logger.info(TAG, 'initAVPlayer success');
    this.fdPath = this.videoName;
    Logger.info(TAG, 'file id is : ' + this.fdPath);
    this.surfaceID = this.mXcomponentController.getXComponentSurfaceId();
    Logger.info(TAG, 'surfaceID is : ' + this.surfaceID);
    await this.createAVPlayer();
    this.setStateChangeCallback();
    this.setErrorCallback();
    this.timeUpdate();
    this.setSourceInfo();
  }

  // 切换下个视频的接口
  async nextVideo(): Promise<void> {
    // 调用reset函数，重置播放器状态至idle
    await this.avPlayer?.reset();
    this.currentCachePercent = 0;
    this.isLoop = false;
    // 获取当前播放文件的下一个视频文件在列表中的下标
    if (this.index === (this.SRC_LIST.length - 1)) {
      this.index = 0;
    } else {
      this.index = this.index + 1;
    }
    this.fdPath = this.SRC_LIST[this.index];
    this.videoName = this.SRC_LIST[this.index];
    this.isBuffering = false;
    Logger.info(TAG, 'file id is : ' + this.fdPath);
    let self = this;

    class MyCacheListener implements CacheListener {
      onCacheAvailable(cacheFilePath: string, url: string, percentsAvailable: number) {
        self.currentCachePercent = percentsAvailable;
      }
    }

    GlobalProxyServer?.getInstance()?.getServer()?.registerCacheListener(new MyCacheListener(), this.fdPath)
    let proxyUrl: string | undefined = await GlobalProxyServer?.getInstance()?.getServer()?.getProxyUrl(this.fdPath)
    let newUrl = proxyUrl ? proxyUrl : this.fdPath;
    if (newUrl.startsWith(getContext().cacheDir)) {
      let file = fs.openSync(newUrl, fs.OpenMode.READ_ONLY);
      newUrl = "fd://" + file.fd;
      self.currentCachePercent = 100;
    }
    this.fdPath = newUrl;
    // 开始进入下一个视频的播放
    if (this.getState() === 'idle') {
      if (this.avPlayer != undefined) {
        this.avPlayer.url = newUrl;
      }
      // 将当前切视频状态置为true
      this.isNext = true;
      this.isPlaying = false;
    } else {
      Logger.info(TAG, 'this state is not idle');
    }
  }

  // 切换上个视频的接口
  async preVideo(): Promise<void> {
    this.currentCachePercent = 0;
    await this.avPlayer?.reset();
    this.isLoop = false;
    if (this.index === (0)) {
      this.index = this.SRC_LIST.length - 1;
    } else {
      this.index = this.index - 1;
    }
    this.fdPath = this.SRC_LIST[this.index];
    this.videoName = this.SRC_LIST[this.index];
    this.isBuffering = false;
    Logger.info(TAG, 'file id is : ' + this.fdPath);
    let self = this;

    class MyCacheListener implements CacheListener {
      onCacheAvailable(cacheFilePath: string, url: string, percentsAvailable: number) {
        self.currentCachePercent = percentsAvailable;
      }
    }

    GlobalProxyServer?.getInstance()?.getServer()?.registerCacheListener(new MyCacheListener(), this.fdPath)
    let proxyUrl: string | undefined = await GlobalProxyServer?.getInstance()?.getServer()?.getProxyUrl(this.fdPath)
    let newUrl = proxyUrl ? proxyUrl : this.fdPath;
    if (newUrl.startsWith(getContext().cacheDir)) {
      let file = fs.openSync(newUrl, fs.OpenMode.READ_ONLY);
      newUrl = "fd://" + file.fd;
      self.currentCachePercent = 100;
    }
    this.fdPath = newUrl;
    if (this.getState() === 'idle') {
      if (this.avPlayer != undefined) {
        this.avPlayer.url = newUrl;
      }
      // 将当前切视频状态置为true
      this.isNext = true;
      this.isPlaying = false;
    } else {
      Logger.info(TAG, 'nextVideo failed,state is not idle');
    }
  }

  // 轨道信息子界面
  @Builder
  MenuBuilderInfo() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
      Text(this.descriptionValue)
    }
    .width(200)
    .height(300)
  }

  build() {
    Stack({ alignContent: Alignment.Bottom }) {
      Row() {
        // 当播放的是非音频时，加载XComponent控件
        XComponent({
          id: 'componentId',
          type: 'surface',
          controller: this.mXcomponentController
        })
          .onLoad(() => {
            // 加载完成后调用初始化播放器函数
            this.initAVPlayer();
          })
          .width('100%')
          .aspectRatio(this.ratio)
      }
      .height('80%')
      .width('100%')
      .justifyContent(FlexAlign.Center)
      .position({ x: 0, y: 0 })
      .alignItems(VerticalAlign.Top)
      .gesture(
        GestureGroup(GestureMode.Exclusive,
          PanGesture({ direction: PanDirection.Vertical })
            .onActionStart(() => {
              Logger.info(TAG, 'onActionStart  Vertical moving start');
            })
            .onActionUpdate((event: GestureEvent) => {
              // 上下滑动触发音量调节
              let volumeNum = Number.parseFloat(((event.offsetY / this.screenHeight) * 1.00).toString());
              this.volumeValue = this.volumeValue - volumeNum;
              if (this.volumeValue < 0) {
                this.volumeValue = 0.00;
              } else if (this.volumeValue > 1.00) {
                this.volumeValue = 1.00;
              }
              Logger.info(TAG, 'onActionStart Vertical moving update, moving time is :' + this.volumeValue);
              this.avPlayer?.setVolume(this.volumeValue);
            })
            .onActionEnd(() => {
              Logger.info(TAG, 'onActionStart  Vertical moving end');
            }))
      )

      Column() {
        Row() {
          LoadingProgress()
            .width('80px')
            .height('80px')
            .visibility(this.isBuffering ? Visibility.Hidden : Visibility.Visible)
            .color(Color.Blue)
          Text(this.videoName).fontSize(15).width('50%').textAlign(TextAlign.Center)
          Image($r('app.media.icon_info'))
            .width('60px')
            .height('60px')
            .margin({ left: '10vp' })
            .bindContextMenu(this.MenuBuilderInfo, ResponseType.LongPress)
        }

        Row() {
          Text(this.currentTime).fontSize(15).width('15%').textAlign(TextAlign.Center)
          Slider({
            value: this.setValue,
            min: 0,
            max: 100,
            step: 1,
            style: SliderStyle.OutSet
          })
            .blockColor(Color.Grey)
            .trackColor(Color.Orange)
            .trackColor(Color.Blue)
            .showSteps(true)
            .showTips(false)
            .width('65%')
            .onChange((value: number, mode: SliderChangeMode) => {
              if (mode !== SliderChangeMode.Begin) {
                this.avPlayer?.seek((value / 100) * this.duration, 0);
              }
            })
          Text(this.durationTimeText).fontSize(15).width('15%').textAlign(TextAlign.Center)
        }
        .alignItems(VerticalAlign.Center)

        Row() {
          Text('当前缓存进度：').fontSize(15).width('15%').textAlign(TextAlign.Center)
          Progress({ value: 0, total: 100, type: ProgressType.Linear })
            .color(Color.Red)
            .backgroundColor(Color.Gray)
            .value(this.currentCachePercent)
            .width('65%')

          Text('').fontSize(15).width('15%').textAlign(TextAlign.Center)
        }
        .alignItems(VerticalAlign.Center)


        Row() {
          // 点击执行上一个视频播放
          Image($r('app.media.icon_Previous'))
            .width('45vp').height('45vp')
            .margin({ left: '10vp' })
            .onClick(() => {
              this.preVideo();
            })
          // 根据状态不同设置播放暂停图标显示
          Image(this.isPlaying ? $r('app.media.icon_pause') : $r('app.media.icon_play'))
            .width('45vp').height('45vp')
            .margin({ left: '10vp' })
            .onClick(() => {
              if (this.isPlaying) {
                this.play();
              } else {
                this.pause();
              }
              this.isPlaying = !this.isPlaying;
            })
          // 点击执行下一个视频播放
          Image($r('app.media.icon_next'))
            .width('45vp').height('45vp')
            .margin({ left: '10vp' })
            .onClick(() => {
              this.nextVideo();
            })
          // 点击图标设置是否循环播放
          Image(this.isLoop ? $r('app.media.icon_single') : $r('app.media.icon_repeatplay'))
            .width('45vp').height('45vp')
            .margin({ left: '10vp' })
            .onClick(() => {
              this.isLoop = !this.isLoop;
              this.setLoop(this.isLoop);
            })
          // 点击图标设置倍速
          Select([{ value: 'speed：0.75' },
            { value: 'speed：1.00' },
            { value: 'speed：1.25' },
            { value: 'speed：1.75' },
            { value: 'speed：2.00' }])
            .selected(this.speedTag)
            .value('Speed')
            .font({ size: 16, weight: 400 })
            .fontColor('#182431')
            .selectedOptionFont({ size: 16, weight: 400 })
            .optionFont({ size: 16, weight: 400 })
            .onSelect((index: number) => {
              Logger.info(TAG, 'Select:' + index);
              this.setSpeed(index);
              this.speedTag = index;
            })
          // 点击图标设置缩放模式
          Select([{ value: '0' },
            { value: '1' },])
            .selected(this.scaleTag)
            .value('ScaleType')
            .font({ size: 16, weight: 400 })
            .fontColor('#182431')
            .selectedOptionFont({ size: 16, weight: 400 })
            .optionFont({ size: 16, weight: 400 })
            .onSelect((index: number) => {
              Logger.info(TAG, 'Select:' + index);
              this.setScaleType(index);
              this.scaleTag = index;
            })
        }.width('100%').justifyContent(FlexAlign.Center)
      }
      .justifyContent(FlexAlign.Start)
    }
    .width('100%')
    .height('100%')
    .backgroundColor(Color.White)
  }
}