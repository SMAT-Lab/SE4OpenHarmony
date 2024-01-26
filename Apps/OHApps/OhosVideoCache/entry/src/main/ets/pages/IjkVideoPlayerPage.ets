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

import {
  IjkMediaPlayer,
  LogUtils,
  OnBufferingUpdateListener,
  OnCompletionListener,
  OnErrorListener,
  OnInfoListener,
  OnPreparedListener,
  OnSeekCompleteListener,
  OnVideoSizeChangedListener
} from '@ohos/ijkplayer';
import { PlayStatus } from '../PlayStatus';
import prompt from '@ohos.prompt';
import { CommonConstants } from '../CommonConstants';
import { CacheListener, HttpProxyCacheServer, HttpProxyCacheServerBuilder } from '@ohos/video-cache';
import GlobalProxyServer from '../GlobalProxyServer';

let CONTROL_PlayStatus = PlayStatus.INIT;
let PROGRESS_MAX_VALUE: number = 100;
let mIjkMediaPlayer = IjkMediaPlayer.getInstance();
let updateProgressTimer: number = 0;
let videoUrls: Array<string> = CommonConstants.VIDEO_HTTPS_LISTS;
let curIndex: number = 0;

@Entry
@Component
struct IjkVideoPlayerPage {
  @State progressValue: number = 0;
  @State currentTime: string = "00:00";
  @State totalTime: string = "00:00";
  @State loadingVisible: Visibility = Visibility.None;
  @State replayVisible: Visibility = Visibility.None;
  @State slideEnable: boolean = false;
  @State aspRatio: number = 0.5;
  @State mContext: object | undefined = undefined;
  @State mFirst: boolean = true;
  @State mDestroyPage: boolean = false;
  @State playSpeed: string = '1f';
  @State oldSeconds: number = 0;
  @State isSeekTo: boolean = false;
  @State isCurrentTime: boolean = false;
  @State currentCachePercent: number = 10;
  xcomponentController: XComponentController = new XComponentController()
  private videoUrl: string = '';

  async aboutToAppear() {
    LogUtils.getInstance().LOGI("aboutToAppear");
    this.videoUrl = videoUrls[0];
    let self = this;

    class MyCacheListener implements CacheListener {
      onCacheAvailable(cacheFilePath: string, url: string, percentsAvailable: number) {
       self.currentCachePercent = percentsAvailable;
      }
    }

    let server: HttpProxyCacheServer = new HttpProxyCacheServerBuilder(getContext())
      .build();
    server.registerCacheListener(new MyCacheListener(), this.videoUrl);
    GlobalProxyServer?.getInstance()?.setServer(server)
    let proxyUrl: string | undefined = await GlobalProxyServer?.getInstance()?.getServer()?.getProxyUrl(this.videoUrl)
    this.videoUrl = proxyUrl ? proxyUrl : this.videoUrl;
    if (this.videoUrl.startsWith(getContext().cacheDir)) {
      self.currentCachePercent = 100;
    }
  }

  aboutToDisappear() {
    LogUtils.getInstance().LOGI("aboutToDisappear");
    this.mDestroyPage = true;
    mIjkMediaPlayer.setScreenOnWhilePlaying(false);
    if (CONTROL_PlayStatus != PlayStatus.INIT) {
      this.stop();
    }
  }

  onPageShow() {
    if (this.mContext && !this.mFirst) {
      this.startPlayOrResumePlay();
    }
  }

  onPageHide() {
    this.pause();
  }

  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Auto, justifyContent: FlexAlign.Start }) {
      Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
        Text("ijkplayer播放器")
          .fontSize('30px')
          .fontColor(Color.White)
          .margin('10px')
          .fontWeight(FontWeight.Bold)
      }.height('100px').width('100%').backgroundColor(Color.Black)

      Divider().vertical(false).strokeWidth('20px').color(Color.White).lineCap(LineCapStyle.Round)
      Stack({ alignContent: Alignment.Center }) {
        XComponent({
          id: 'xcomponentId',
          type: 'surface',
          libraryname: 'ijkplayer_napi'
        })
          .onLoad((event?: object) => {
            if (!!event) {
              this.initDelayPlay(event);
            }
          })
          .onDestroy(() => {
          })
          .width('100%')
        Image($r('app.media.icon_replay'))
          .objectFit(ImageFit.Auto)
          .width('120px')
          .height('120px')
          .visibility(this.replayVisible)
          .border({ width: 0 })
          .borderStyle(BorderStyle.Dashed)
          .onClick(() => {
            this.startPlayOrResumePlay();
          })
        Image($r('app.media.icon_load'))
          .objectFit(ImageFit.Auto)
          .width('120px')
          .height('120px')
          .visibility(this.loadingVisible)
          .border({ width: 0 })
          .borderStyle(BorderStyle.Dashed)
      }.width('100%').height('700px').backgroundColor('#000000').clip(true)

      Flex({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start }) {
        Text(this.currentTime).width('100px').fontSize('20px').margin('20px')
        Slider({
          value: this.progressValue,
          min: 0,
          max: PROGRESS_MAX_VALUE,
          step: 1,
          style: SliderStyle.OutSet
        })
          .width('600px')
          .blockColor(Color.Blue)
          .trackColor(Color.Gray)
          .selectedColor(Color.Blue)
          .showSteps(true)
          .showTips(true)
          .enabled(this.slideEnable)
          .onChange((value: number, mode: SliderChangeMode) => {
            if (mode == 2) {
              this.isSeekTo = true;
              this.mDestroyPage = false;
              this.showLoadIng();
              LogUtils.getInstance().LOGI("slider-->seekValue start:" + value);
              let seekValue = value * (mIjkMediaPlayer.getDuration() / 100);
              this.seekTo(seekValue + "");
              this.setProgress()
              LogUtils.getInstance().LOGI("slider-->seekValue end:" + seekValue);
              this.isSeekTo = false;
            }
          })
        Text(this.totalTime).width('100px').fontSize('20px').margin('10px')
      }

      Flex({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start }) {
        Button('播放')
          .onClick(() => {
            this.startPlayOrResumePlay();
          })
          .width('400px')
          .height('80px')
          .margin('15px')
        Button('暂停')
          .onClick(() => {
            this.pause();
          })
          .width('400px')
          .height('80px')
          .margin('15px')
      }

      Flex({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start }) {
        Button('停止')
          .onClick(() => {
            this.stop();
          })
          .width('400px')
          .height('80px')
          .margin('15px')

        Button('切换')
          .onClick(() => {
            this.playNext();
          })
          .width('400px')
          .height('80px')
          .margin('15px')
      }

      Flex({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start }) {
        Button('1.5倍速')
          .onClick(() => {
            this.playSpeed = '1.5f'
            this.stop();
            this.startPlayOrResumePlay()
          })
          .width('400px')
          .height('80px')
          .margin('15px')

        Button('2 倍速')
          .onClick(() => {
            this.playSpeed = '2f'
            this.stop();
            this.startPlayOrResumePlay()
          })
          .width('400px')
          .height('80px')
          .margin('15px')
      }

      Flex({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start }) {
        Text('当前缓存进度：').fontSize(15).width('15%').textAlign(TextAlign.Center)
        Progress({ value: 0, total: 100, type: ProgressType.Linear })
          .color(Color.Red)
          .backgroundColor(Color.Gray)
          .value(this.currentCachePercent)
          .width('65%')

        Text('').fontSize(15).width('15%').textAlign(TextAlign.Center)
      }
    }
  }

  private initDelayPlay(context: object) {
    this.mContext = context;
    let that = this;
    setTimeout(() => {
      that.startPlayOrResumePlay();
      that.mFirst = false;
    }, 300)
  }

  private startPlayOrResumePlay() {
    this.mDestroyPage = false;
    LogUtils.getInstance().LOGI("startPlayOrResumePlay start CONTROL_PlayStatus:" + CONTROL_PlayStatus)
    if (CONTROL_PlayStatus == PlayStatus.INIT) {
      this.stopProgressTask();
      this.startProgressTask();
      this.play(this.videoUrl.toString());
    }
    if (CONTROL_PlayStatus == PlayStatus.PAUSE) {
      mIjkMediaPlayer.start();
      this.setProgress()
    }
  }

  private completionNum(num: number): string | number {
    if (num < 10) {
      return '0' + num;
    } else {
      return num;
    }
  }

  private stringForTime(timeMs: number): string {
    let totalSeconds: number | string = (timeMs / 1000);
    let newSeconds: number | string = totalSeconds % 60;
    let minutes: number | string = (totalSeconds / 60) % 60;
    let hours: number | string = totalSeconds / 3600;
    LogUtils.getInstance().LOGI("stringForTime hours:" + hours + ",minutes:" + minutes + ",seconds:" + newSeconds);
    hours = this.completionNum(Math.floor(Math.floor(hours * 100) / 100));
    minutes = this.completionNum(Math.floor(Math.floor(minutes * 100) / 100));
    newSeconds = Math.floor(Math.floor(newSeconds * 100) / 100)
    if (this.isCurrentTime) {
      if (this.oldSeconds < newSeconds || newSeconds === 0 || this.isSeekTo) {
        this.oldSeconds = newSeconds
      } else {
        newSeconds = this.oldSeconds
      }
    }
    newSeconds = this.completionNum(newSeconds);
    if (hours > 0) {
      return hours + ":" + minutes + ":" + newSeconds;
    } else {
      return minutes + ":" + newSeconds;
    }
  }

  private setProgress() {
    let position = mIjkMediaPlayer.getCurrentPosition();
    let duration = mIjkMediaPlayer.getDuration();
    let pos = 0;
    if (duration > 0) {
      this.slideEnable = true;
      let curPercent = position / duration;
      pos = curPercent * 100;
      this.progressValue = pos;
    }
    LogUtils.getInstance()
      .LOGI("setProgress position:" + position + ",duration:" + duration + ",progressValue:" + pos);
    this.totalTime = this.stringForTime(duration);
    if (position > duration) {
      position = duration;
    }
    this.isCurrentTime = true;
    this.currentTime = this.stringForTime(position);
    this.isCurrentTime = false
  }

  private startProgressTask() {
    let that = this;
    updateProgressTimer = setInterval(() => {
      LogUtils.getInstance().LOGI("startProgressTask");
      if (!that.mDestroyPage) {
        that.setProgress();
      }
    }, 300);
  }

  private stopProgressTask() {
    LogUtils.getInstance().LOGI("stopProgressTask");
    clearInterval(updateProgressTimer);
  }

  private showLoadIng() {
    this.loadingVisible = Visibility.Visible;
    this.replayVisible = Visibility.None;
  }

  private hideLoadIng() {
    this.loadingVisible = Visibility.None;
    this.replayVisible = Visibility.None;
  }

  private showRePlay() {
    this.loadingVisible = Visibility.None;
    this.replayVisible = Visibility.Visible;
  }

  private play(url: string) {
    let that = this;
    that.showLoadIng();
    //设置XComponent回调的context
    if (!!this.mContext) {
      mIjkMediaPlayer.setContext(this.mContext);
    }
    if (CONTROL_PlayStatus == PlayStatus.INIT) {
      mIjkMediaPlayer.reset();
    }
    CONTROL_PlayStatus = PlayStatus.PLAY;
    //设置debug模式
    mIjkMediaPlayer.setDebug(true);
    //初始化配置
    mIjkMediaPlayer.native_setup();
    //设置视频源
    mIjkMediaPlayer.setDataSource(url);
    // 设置无缓冲，这是播放器的缓冲区，有数据就播放
    mIjkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER, "packet-buffering", "0");
    // 变速播放
    mIjkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER, "soundtouch", "1");
    mIjkMediaPlayer.setSpeed(this.playSpeed);
    //设置视频源http请求头
    let headers = new Map([
      ["allowCrossProtocolRedirects", "true"]
    ]);
    mIjkMediaPlayer.setDataSourceHeader(headers);

    let mOnVideoSizeChangedListener: OnVideoSizeChangedListener = {
      onVideoSizeChanged: (width: number, height: number, sar_num: number, sar_den: number) => {
        that.aspRatio = width / height;
        LogUtils.getInstance()
          .LOGI("setOnVideoSizeChangedListener-->go:" + width + "," + height + "," + sar_num + "," + sar_den)
        that.hideLoadIng();
      }
    }
    mIjkMediaPlayer.setOnVideoSizeChangedListener(mOnVideoSizeChangedListener);
    let mOnPreparedListener: OnPreparedListener = {
      onPrepared: () => {
        LogUtils.getInstance().LOGI("setOnPreparedListener-->go");
      }
    }
    mIjkMediaPlayer.setOnPreparedListener(mOnPreparedListener);

    let mOnCompletionListener: OnCompletionListener = {
      onCompletion: () => {
        LogUtils.getInstance().LOGI("OnCompletionListener-->go")
        that.showRePlay();
        that.currentTime = that.stringForTime(mIjkMediaPlayer.getDuration());
        that.progressValue = PROGRESS_MAX_VALUE;
        that.slideEnable = false;
        that.stop();
      }
    }
    mIjkMediaPlayer.setOnCompletionListener(mOnCompletionListener);

    let mOnBufferingUpdateListener: OnBufferingUpdateListener = {
      onBufferingUpdate: (percent: number) => {
        LogUtils.getInstance().LOGI("OnBufferingUpdateListener-->go:" + percent);
      }
    }
    mIjkMediaPlayer.setOnBufferingUpdateListener(mOnBufferingUpdateListener);

    let mOnSeekCompleteListener: OnSeekCompleteListener = {
      onSeekComplete: () => {
        LogUtils.getInstance().LOGI("OnSeekCompleteListener-->go");
        that.startPlayOrResumePlay();
      }
    }
    mIjkMediaPlayer.setOnSeekCompleteListener(mOnSeekCompleteListener);

    let mOnInfoListener: OnInfoListener = {
      onInfo: (what: number, extra: number) => {
        LogUtils.getInstance().LOGI("OnInfoListener-->go:" + what + "===" + extra);
        that.hideLoadIng();
      }
    }
    mIjkMediaPlayer.setOnInfoListener(mOnInfoListener);


    let mOnErrorListener: OnErrorListener = {
      onError: (what: number, extra: number) => {
        this.stopProgressTask();
        LogUtils.getInstance().LOGI("OnErrorListener-->go:" + what + "===" + extra)
        that.hideLoadIng();
        prompt.showToast({
          message: "亲，视频播放异常，系统开小差咯"
        });
      }
    }

    mIjkMediaPlayer.setOnErrorListener(mOnErrorListener);

    mIjkMediaPlayer.setMessageListener();

    mIjkMediaPlayer.prepareAsync();

    mIjkMediaPlayer.start();
  }

  private pause() {
    if (mIjkMediaPlayer.isPlaying()) {
      mIjkMediaPlayer.pause();
      this.setProgress();
      this.mDestroyPage = true;
      CONTROL_PlayStatus = PlayStatus.PAUSE;
    }
  }

  private stop() {
    CONTROL_PlayStatus = PlayStatus.INIT;
    mIjkMediaPlayer.stop();
    mIjkMediaPlayer.release();
    this.stopProgressTask();
  }

  private seekTo(value: string) {
    mIjkMediaPlayer.seekTo(value);
  }

  private async playNext() {
    if (curIndex == videoUrls.length - 1) {
      curIndex = 0;
    } else {
      curIndex++;
    }
    this.currentCachePercent = 0;
    CONTROL_PlayStatus = PlayStatus.INIT;
    mIjkMediaPlayer.stop();
    mIjkMediaPlayer.reset();
    this.startProgressTask();
    this.videoUrl = videoUrls[curIndex]
    let self = this;

    class MyCacheListener implements CacheListener {
      onCacheAvailable(cacheFilePath: string, url: string, percentsAvailable: number) {
       self.currentCachePercent = percentsAvailable;
      }
    }

    GlobalProxyServer?.getInstance()?.getServer()?.registerCacheListener(new MyCacheListener(), this.videoUrl)
    let proxyUrl: string | undefined = await GlobalProxyServer?.getInstance()?.getServer()?.getProxyUrl(this.videoUrl)
    this.videoUrl = proxyUrl ? proxyUrl : this.videoUrl;
    if (this.videoUrl.startsWith(getContext().cacheDir)) {
      self.currentCachePercent = 100;
    }
    this.play(this.videoUrl);
  }
}
