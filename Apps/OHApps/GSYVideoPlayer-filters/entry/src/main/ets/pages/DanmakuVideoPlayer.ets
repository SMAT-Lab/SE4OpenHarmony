/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import display from '@ohos.display';
import window from '@ohos.window';
import { BusinessError } from '@ohos.base';
import {
  AvVideoPlayer,
  GlobalContext,
  IjkVideoPlayer,
  IVideoPlayer,
  LogUtils,
  PlayerType,
  PlayStatus,
  StandardGSYVideoModel
} from '@ohos/gsyvideoplayer';
import audio from '@ohos.multimedia.audio';
import emitter from '@ohos.events.emitter';
import settings from '@ohos.settings';
import {
  BaseDanmaku,
  BaseDanmakuParser,
  Callback,
  DANMAKU_STYLE_STROKEN,
  DanmakuContext,
  DanmakuTimer,
  DanmakuView,
  IDanmakus,
  IDanmakuView,
  JSONSource,
  OnDanmakuClickListener,
  Proxy,
  SpannedCacheStuffer,
  SystemClock
} from '@ohos/danmakuflamemaster';
import { BiliDanmukuParser } from './BiliDanmakuParser';
import { sourceData } from './DanmakuData';

let updateProgressTimer: number = 0;
let changeWidth: number = 0;
let changeHeight: number = 0;
let screenWidth: number = 0;
let screenHeight: number = 0;
let uiTime: number = 0;
let uiLockTime: number = 0;
let windowClass: window.Window | undefined = undefined;

let videoPlayEvent: emitter.InnerEvent = {
  eventId: 1
};
let videoInitEvent: emitter.InnerEvent = {
  eventId: 2
};
let videoPauseEvent: emitter.InnerEvent = {
  eventId: 3
};

let touchStartX: number = 0;
let touchStartY: number = 0;

@Component
export struct DanmakuVideoPlayer {
  mIVideoPlayer: IVideoPlayer | undefined = undefined;
  @Provide currentTime: string = "00:00";
  @Provide totalTime: string = "00:00";
  @State progressValue: number = 0;
  @State slideEnable: boolean = false;
  @State eventType: string = '';
  @State showBottomUi: boolean = false;
  @State fullShowTop: boolean = false;
  @State fullShowLock: boolean = false;
  @State lock: boolean = false;
  @State showPlay: boolean = true;
  @State showPause: boolean = false;
  @State mDestroyPage: boolean = false;
  @State loadingVisible: Visibility = Visibility.None;
  @State mDirection: number = 0;
  @State screenIsFull: boolean = false;
  @State danMuText: string = "弹幕关";
  // 是否显示音量数值的布局
  @State showVolumeUi: boolean = false;
  // 是否显示亮度数值的布局
  @State showBrightnessUi: boolean = false;
  // 是否显示横向滑动的进度布局
  @State showSeekProgressUi: boolean = false;
  // 当前音量 [0-20]
  @State mCurrentVolumeValue: number = 0;
  // 系统最大音量
  @State mMaxVolumeValue: number = 20;
  // 当前亮度 [0-255]
  @State mCurrentBrightness: number = 10;
  // 拖拽的时间
  @State mSeekCurrentTime: string = this.currentTime;
  // 当前进度
  @State mSeekTimePosition: number = 0;
  // 是否拖动进度条
  private isSeek: boolean = false;
  // 是否正在加载手势滑动禁止
  private isLoadNotSeek: boolean = false;
  // 当前拖拽进度的方向资源
  @State mSeekDirectionRes: Resource = $r('app.media.video_forward_icon');
  private mAudioManager: audio.AudioManager | null = null;
  private isVerticalDrag: boolean = false;
  private isHorizontalDrag: boolean = false;
  @State coverVisible: Visibility = Visibility.Visible;
  private panOptionBrightAndVolume: PanGestureOptions = new PanGestureOptions({ direction: PanDirection.Vertical });
  private panOptionSeek: PanGestureOptions = new PanGestureOptions({ direction: PanDirection.Horizontal });
  public title: string = "";
  private xComponentId: string = 'xid';
  @State ijkComponentVisible: Visibility = Visibility.Hidden;
  private danMuShow: boolean = true;
  sec: number = 3;
  PROGRESS_MAX_VALUE: number = 100;
  public videoModel: StandardGSYVideoModel = new StandardGSYVideoModel();
  @State
  model: DanmakuView.Model = new DanmakuView.Model()
  private mContext: DanmakuContext | undefined = undefined;
  private mParser: BaseDanmakuParser | undefined = undefined;
  private mCacheStufferAdapter: Proxy = new Pro()

  private createParser(): BaseDanmakuParser {
    let parser: BaseDanmakuParser = new BiliDanmukuParser();
    let jsonSource = new JSONSource(sourceData)
    parser.load(jsonSource)
    return parser;
  }

  videoInit: (iVideoPlayer: IVideoPlayer, xid: string) => void = (iVideoPlayer: IVideoPlayer, xid: string) => {
    LogUtils.getInstance().LOGI('VideoInit')
    this.mIVideoPlayer = iVideoPlayer
    this.xComponentId = xid;
    this.mIVideoPlayer.setUp(this.videoModel.getUrl(), this.videoModel.getCacheWithPlay())
  }

  private addDanmaku(isLive: Boolean) {
    if (this.mContext) {
      let danmaku: BaseDanmaku = this.mContext.mDanmakuFactory.createDanmaku(BaseDanmaku.TYPE_SCROLL_RL);
      danmaku.text = "这是一条弹幕" + SystemClock.uptimeMillis();
      danmaku.padding = 5;
      danmaku.priority = 0; // 可能会被各种过滤器过滤并隐藏显示
      danmaku.isLive = isLive.valueOf();
      danmaku.setTime(this.model.getCurrentTime() + 1200);
      if (this.mParser) {
        danmaku.textSize = 25 * (this.mParser.getDisplayer().getDensity() * 0.8);
      }
      danmaku.textColor = 0xffff0000;
      danmaku.textShadowColor = 0xffffffff;
      danmaku.borderColor = 0xff00ff00;
      this.model.addDanmaku(danmaku);
    }
  }

  @Builder
  topTitle() {
    Flex({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start }) {
      Image($r('app.media.video_back'))
        .width(15)
        .height(15)
        .margin({ top: 10, left: 15 })
        .onClick(() => {
          this.videoModel.ExecuteBackClickListener();
        })
      Text(this.videoModel.getTitle())
        .fontSize('10vp')
        .margin({ top: 10, left: 5 })
        .fontColor($r('app.color.color_white'))
    }
    .align(Alignment.BottomEnd)
    .backgroundColor($r('app.color.bottom_controls_color'))
    .position({ x: 0, y: 0 })
    .padding(10)
  }

  @Builder
  middleControls() {
    Row() {
      Flex({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
      }
      .align(Alignment.BottomEnd)
      .width('33.3%')
      .height('100%')

      Flex({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
        if (this.showPlay) {
          Image($r('app.media.video_play_pressed'))
            .width(30)
            .height(30)
            .onClick(() => {
              this.videoToPlay();
            })
        }

        Image($r('app.media.icon_load'))
          .objectFit(ImageFit.Auto)
          .width(30)
          .height(30)
          .visibility(this.loadingVisible)
          .border({ width: 0 })
          .borderStyle(BorderStyle.Dashed)

        if (this.showPause) {
          Image($r('app.media.video_pause_normal'))
            .width(30)
            .height(30)
            .onClick(() => {
              LogUtils.getInstance().LOGI('click pause')
              this.videoToPause();
            })
        }
      }
      .align(Alignment.BottomEnd)
      .width('33.3%')
      .height('100%')

      Flex({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.End }) {
        if (this.mDirection == 1 && this.fullShowLock) {
          Image(this.lock ? $r('app.media.lock') : $r('app.media.unlock'))
            .width(20)
            .height(20)
            .objectFit(ImageFit.Contain)
            .margin({ right: 15 })
            .onClick(() => {
              this.lock = !this.lock;
              if (this.lock) {
                this.showBottomUi = false;
                this.fullShowTop = false;
                this.showPlay = false;
                this.showPause = false;
              }
            })
        }
      }
      .align(Alignment.BottomEnd)
      .width('33.3%')
      .height('100%')
    }.width("100%")
    .height('100%')
  }

  private videoToPause() {
    if (this.mIVideoPlayer) {
      LogUtils.getInstance().LOGI('standardGSYVideoPlayer onPause1 click')
      this.mIVideoPlayer.pause();
    }
  }

  private videoToPlay() {
    if (this.mIVideoPlayer) {
      LogUtils.getInstance().LOGI('standardGSYVideoPlayer onPlay click')
      this.timeCountdown();
      this.loadingVisible = Visibility.Visible;
      this.showPause = false;
      this.showPlay = false;
      this.videoJudgeToPlay();
    }
  }

  private videoJudgeToPlay() {
    LogUtils.getInstance().LOGI('videoJudgeToPlay');
    if (this.mIVideoPlayer) {
      if (GlobalContext.getContext().getObject('xid') !== this.mIVideoPlayer.xComponentId) {
        LogUtils.getInstance().LOGI('videoJudgeToPlay1');
        this.mIVideoPlayer.play();
        this.mIVideoPlayer.firstOrSeek = true;
      } else {
        LogUtils.getInstance().LOGI('videoJudgeToPlay2');
        if (this.mIVideoPlayer.playStatus == PlayStatus.PAUSE) {
          LogUtils.getInstance().LOGI('standardGSYVideoPlayer videoJudgeToPlay ResumePlay');
          this.mIVideoPlayer.resumePlay();
        } else {
          LogUtils.getInstance().LOGI('standardGSYVideoPlayer videoJudgeToPlay play: ' + this.mIVideoPlayer.videoUrl);
          this.mIVideoPlayer.play();
        }
      }
    }
  }

  @Builder
  bottomControls() {
    Column() {
      Flex({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start }) {
        Text(this.currentTime)
          .width('80px')
          .fontSize('20px')
          .margin({ left: 20 })
          .fontColor($r('app.color.color_white'))

        Slider({
          value: this.progressValue,
          min: 0,
          max: this.PROGRESS_MAX_VALUE,
          step: 1,
          style: SliderStyle.OutSet
        })
          .blockColor(Color.Blue)
          .trackColor(Color.Gray)
          .selectedColor(Color.Blue)
          .showSteps(true)
          .showTips(true)
          .onChange((value: number, mode: SliderChangeMode) => {
            clearTimeout(uiTime);
            if (this.mIVideoPlayer) {
              switch (mode) {
                case SliderChangeMode.Begin:
                // 通知的回调会到的慢一点，导致下面设置的showPause = true无效
                // 使用isSeek参数去控制pause通知里面的状态操作
                  this.mIVideoPlayer.pause();
                  this.isSeek = true;
                  this.stopProgressTask();
                  this.showPlay = false;
                  this.showPause = true;
                  break;
                case SliderChangeMode.End:
                  this.showPause = false;
                  this.loadingVisible = Visibility.Visible;
                  let seekValue = value * (this.mIVideoPlayer.getDuration() / 100);
                  this.mIVideoPlayer.seekTo(seekValue);
                  this.model.seekTo(seekValue);
                  this.mIVideoPlayer.firstOrSeek = true;
                  LogUtils.getInstance().LOGI('slider-->seekValue end: ' + seekValue);
                  break;
              }
            }
          })
        Text(this.totalTime).width('80px').fontSize('20px').margin({ right: 5 }).fontColor($r('app.color.color_white'))

        Image(this.screenIsFull ? $r('app.media.video_shrink') : $r('app.media.video_enlarge'))
          .width(20)
          .height(18)
          .margin({ right: 15 })
          .onClick(() => {
            this.videoModel.ExecuteFullClickListener();
          })
      }.padding({ bottom: 10 })
      .align(Alignment.BottomEnd)
      .backgroundColor($r('app.color.bottom_controls_color'))

      Row() {
        Text("发送弹幕")
          .backgroundColor($r('app.color.color_add_danmu'))
          .width("90%")
          .textAlign(TextAlign.Center)
          .fontColor($r('app.color.color_add_text_danmu'))
          .onClick(() => {
            this.addDanmaku(false);
          })
          .layoutWeight(1)
        Text(this.danMuText)
          .textAlign(TextAlign.Center)
          .fontColor($r('app.color.color_show_danmu'))
          .onClick(() => {
            if (this.danMuShow) {
              this.model.hide();
              this.danMuText = '弹幕开';
            } else {
              this.model.setWidth(vp2px(changeWidth));
              this.model.setHeight(vp2px(changeHeight - 1));
              this.model.hide();
              this.model.show();
              this.danMuText = '弹幕关';
            }
            this.danMuShow = !this.danMuShow;
          })
      }.backgroundColor($r('app.color.bottom_controls_color')).margin({ bottom: (this.screenIsFull ? 10 : 0) })
    }
  }

  @Builder
  VolumeUi() {
    Column() {
      Progress({
        value: Number((this.mCurrentVolumeValue / this.mMaxVolumeValue * 100).toFixed(0)),
        total: 100,
        type: ProgressType.Linear
      })
        .style({ strokeWidth: 10, enableSmoothEffect: false })
        .rotate({ angle: -90 })
        .margin({top: 20, left: -20})
        .alignSelf(ItemAlign.Center)
        .backgroundColor(Color.White);

      Image($r('app.media.video_volume_icon'))
        .objectFit(ImageFit.Auto)
        .margin({ top: 50, left: -15 })
        .width(30)
        .height(30)
        .alignSelf(ItemAlign.Center)
        .borderStyle(BorderStyle.Dashed)
    }.visibility(this.showVolumeUi ? Visibility.Visible : Visibility.Hidden)
    .alignSelf(ItemAlign.Center)
  }

  @Builder
  BrightnessUi() {
    Column() {
      Image($r('app.media.video_brightness_6_white_36dp'))
        .objectFit(ImageFit.Auto)
        .width(30)
        .height(30)
        .border({ width: 0 })
        .alignSelf(ItemAlign.Center)

      Text((this.mCurrentBrightness / 255 * 100).toFixed(0) + '%')
        .fontColor(Color.White)
        .textAlign(TextAlign.Center)
        .width(80)
    }.visibility(this.showBrightnessUi ? Visibility.Visible : Visibility.Hidden)
    .width(80)
    .alignSelf(ItemAlign.Center)
  }

  @Builder
  SeekProgressUi() {
    Column() {
      Image(this.mSeekDirectionRes)
        .objectFit(ImageFit.Auto)
        .width(30)
        .height(30)
        .border({ width: 0 })
        .margin({ top: 10 })
        .alignSelf(ItemAlign.Center)

      Row() {
        Text(this.mSeekCurrentTime)
          .fontColor(Color.Blue)
          .textAlign(TextAlign.Center)

        Text('/')
          .textAlign(TextAlign.Center)

        Text(this.totalTime)
          .fontColor(Color.White)
          .textAlign(TextAlign.Center)
      }.margin({ top: 10 })

      Progress({
        value: this.mSeekTimePosition,
        total: 100,
        type: ProgressType.Linear
      })
        .style({ strokeWidth: 5, enableSmoothEffect: false })
        .padding({ left: 10, right: 10 })
        .margin({ top: 10, bottom: 10 })
        .backgroundColor(Color.White);
    }
    .visibility(this.showSeekProgressUi ? Visibility.Visible : Visibility.Hidden)
    .width(200)
    .backgroundColor('#55bcbcbc')
    .alignItems(HorizontalAlign.Center)
    .alignSelf(ItemAlign.Center)
  }

  build() {
    Stack({ alignContent: Alignment.Bottom }) {
      if (GlobalContext.getContext().getObject('playType') == PlayerType.SYSTEM_AVPLAYER) {
        AvVideoPlayer({ videoInit: this.videoInit })
      } else {
        IjkVideoPlayer({ videoInit: this.videoInit, isVisible: this.ijkComponentVisible })
      }

      if (this.videoModel.getCoverImage()) {
        Image(this.videoModel.getCoverImage())
          .width('100%')
          .height('100%')
          .visibility(this.coverVisible)
      }

      Flex({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.SpaceBetween }) {
        this.VolumeUi()
        this.SeekProgressUi()
        this.BrightnessUi()
      }.width('100%')
      .height('100%')

      this.middleControls()
      DanmakuView({ model: $model }).backgroundColor(Color.Transparent).position({ x: 0, y: 0 }).enabled(false)
      if (this.showBottomUi) {
        if (this.mDirection == 1 && this.fullShowTop) {
          this.topTitle()
        }
        this.bottomControls()
      }
    }
    .gesture(GestureGroup(GestureMode.Parallel,
      TapGesture().onAction((event: GestureEvent | undefined) => {
        if (event) {
          if (this.lock) {
            this.timeLockCountdown();
            return;
          }

          if (this.loadingVisible == Visibility.Visible) {
            return;
          }

          if (!this.showPlay) {
            this.timeCountdown();
          }
          if (event && event.fingerList && event.fingerList[0]) {
            LogUtils.getInstance().LOGI('TapGesture event.onActionStart start x: ' + event.fingerList[0].localX +
            " ---event.onActionStart start y: " + event.fingerList[0].localY);
          }
        }
      }),
      // 绑定声音屏幕亮度拖动手势
      PanGesture(this.panOptionBrightAndVolume)
        .onActionStart((event: GestureEvent | undefined) => {
          LogUtils.getInstance().LOGI('Vertical Pan Start');
          if (this.lock) {
            return;
          }
          if (this.isHorizontalDrag) {
            return;
          }
          if (event && event.fingerList && event.fingerList[0]) {
            touchStartX = event.fingerList[0].localX;
            touchStartY = event.fingerList[0].localY;
            LogUtils.getInstance().LOGI('VerticalPanBrightAndVolume event.onActionStart start x: ' + touchStartX +
            ' event.onActionStart start y: ' + touchStartY);
          }
        })
        .onActionUpdate((event: GestureEvent | undefined) => {
          if (this.lock) {
            return;
          }
          if (this.isHorizontalDrag) {
            return;
          }
          this.isVerticalDrag = true;
          if (event && event.fingerList && event.fingerList[0]) {
            let touchY = event.fingerList[0].localY;
            let deltaY = touchY - touchStartY;

            // 移动距离占播放器高度的比例(deltaY取反是因为值的正负与滑动方向相反)
            let percent = (-deltaY / changeHeight);
            let width = changeWidth as number;
            if (touchStartX >= (width / 2)) {
              this.showVolumeUi = true;

              let playerVolumeValue = this.mCurrentVolumeValue;
              playerVolumeValue += this.mMaxVolumeValue * percent;

              if (playerVolumeValue < 0) {
                playerVolumeValue = 0;
              }
              if (playerVolumeValue > this.mMaxVolumeValue) {
                playerVolumeValue = this.mMaxVolumeValue;
              }
              this.mCurrentVolumeValue = playerVolumeValue;
              if (this.mAudioManager) {
                this.mAudioManager.setVolume(audio.AudioVolumeType.MEDIA, playerVolumeValue, (err: BusinessError) => {
                  if (err) {
                    LogUtils.getInstance().LOGI(`Failed to set the volume. ${err}`);
                    return;
                  }
                })
              }
            } else {
              this.showBrightnessUi = true;

              let brightness = this.mCurrentBrightness;
              brightness += 255 * percent;
              if (brightness < 0) {
                brightness = 5;
              }
              if (brightness > 255) {
                brightness = 255;
              }
              let finalValue = brightness / 255;
              if (windowClass) {
                windowClass.setWindowBrightness(finalValue);
              }
              this.mCurrentBrightness = brightness;
            }
            touchStartY = touchY;
          }
        })
        .onActionEnd((event: GestureEvent | undefined) => {
          LogUtils.getInstance().LOGI('Vertical Pan End')
          this.showVolumeUi = false;
          this.showBrightnessUi = false;
          this.isVerticalDrag = false;
        }),
      PanGesture(this.panOptionSeek)
        .onActionStart((event: GestureEvent | undefined) => {
          LogUtils.getInstance().LOGI('Horizontal Pan Start');
          if (!this.mIVideoPlayer) {
            return;
          }
          if (this.lock) {
            return;
          }

          if (this.loadingVisible == Visibility.Visible) {
            this.isLoadNotSeek = true;
            return;
          }

          if (this.isVerticalDrag) {
            return;
          }
          if (event && event.fingerList && event.fingerList[0]) {
            this.isSeek = true;
            this.mIVideoPlayer.pause();
            this.showPlay = false;
            this.showPause = false;
            this.stopProgressTask();
            touchStartX = event.fingerList[0].localX;
            this.mSeekTimePosition = this.progressValue;
            LogUtils.getInstance()
              .LOGI('HorizontalSeekProgress event.onActionStart start x: ' + event.fingerList[0].localX +
              ' event.onActionStart start y: ' + event.fingerList[0].localY);
          }
        })
        .onActionUpdate((event: GestureEvent | undefined) => {
          if (!this.mIVideoPlayer) {
            return;
          }
          if (this.lock) {
            return;
          }

          if (this.isLoadNotSeek) {
            return;
          }

          if (this.isVerticalDrag) {
            return;
          }
          this.isHorizontalDrag = true;
          if (event && event.fingerList && event.fingerList[0]) {
            this.showSeekProgressUi = true;

            let touchX = event.fingerList[0].localX;
            let deltaX = touchX - touchStartX;
            if (deltaX > 0) {
              this.mSeekDirectionRes = $r('app.media.video_forward_icon');
            } else {
              this.mSeekDirectionRes = $r('app.media.video_backward_icon');
            }

            let position: number = this.mIVideoPlayer.getCurrentPosition();
            let totalTimeDuration: number = this.mIVideoPlayer.getDuration();
            let seekTimePosition: number = Number(position + (deltaX * totalTimeDuration / changeWidth));
            if (seekTimePosition < 0) {
              seekTimePosition = 0
            }
            if (seekTimePosition > totalTimeDuration) {
              seekTimePosition = totalTimeDuration;
            }

            // 当前调整的进度
            this.mSeekCurrentTime = this.stringForTime(seekTimePosition);

            // 设置当前进度
            if (totalTimeDuration != 0) {
              this.mSeekTimePosition = Number((seekTimePosition / totalTimeDuration).toFixed(2)) * 100;
            }
          }
        })
        .onActionEnd((event: GestureEvent | undefined) => {
          if (!this.mIVideoPlayer) {
            return;
          }

          if (this.isLoadNotSeek) {
            this.isLoadNotSeek = false;
            return;
          }

          if (this.isHorizontalDrag && this.mIVideoPlayer) {
            this.progressValue = this.mSeekTimePosition;
            this.loadingVisible = Visibility.Visible;
            this.showPause = false;
            this.mIVideoPlayer.seekTo(this.mSeekTimePosition * (this.mIVideoPlayer.getDuration() / 100));
            this.model.seekTo(this.mSeekTimePosition * (this.mIVideoPlayer.getDuration() / 100));
          }
          this.isHorizontalDrag = false;
          this.showSeekProgressUi = false;
        }),
      TapGesture({ count: 2 }).onAction((event: GestureEvent | undefined) => {
        if (this.lock) {
          return;
        }

        if (this.loadingVisible == Visibility.Visible) {
          return;
        }

        if (!this.mIVideoPlayer) {
          return;
        }
        LogUtils.getInstance().LOGI('double click start');
        if (this.mIVideoPlayer.xComponentId != GlobalContext.getContext().getObject('xid')) {

          this.videoToPlay();
        } else {
          if (this.mIVideoPlayer.isPlaying()) {
            this.videoToPause();
          } else {
            this.videoToPlay();
          }
        }
      })
    )).onAreaChange((oldValue: Area, newValue: Area) => {
      changeWidth = newValue.width as number;
      changeHeight = newValue.height as number;
      screenWidth = px2vp(display.getDefaultDisplaySync().width);
      screenHeight = px2vp(display.getDefaultDisplaySync().height);
      this.mDirection = this.getDirection();
      this.screenIsFull = (screenHeight - changeHeight) < 50;
      // 如果用户不隐藏状态栏，全屏的时候组件高度与手机的高度差距小于50.就显示上方控制栏
      if (this.mDirection == 1 && this.screenIsFull) {
        this.fullShowTop = true;
        this.fullShowLock = true;
      }
      this.model.setWidth(vp2px(changeWidth));
      this.model.setHeight(vp2px(changeHeight));
      if (this.danMuShow) {
        this.model.hide();
        this.model.show();
      } else {
        this.model.hide();
      }
    }).backgroundColor(Color.Black)
  }

  /**
   * 注册的emitter消息回调，在list列表中，每个item都可以收到，只能通过xid区分当前是哪个才是真正的被点击的item
   * 去做相应的事件处理，不是当前选中的，一律变为初始状态（goInit）
   */
  private emitterInit() {
    emitter.on(videoPlayEvent, (data: emitter.EventData) => {
      if (data && data.data && typeof data.data.xid === 'string') {
        if (this.xComponentId == data.data.xid) {
          this.goPlaying();
        } else {
          this.goInit();
        }
      }
    });
    emitter.on(videoInitEvent, (data: emitter.EventData) => {
      if (data && data.data && typeof data.data.xid === 'string') {
        if (this.xComponentId == data.data.xid) {
          this.goInit();
        }
      }
    });
    emitter.on(videoPauseEvent, (data: emitter.EventData) => {
      if (data && data.data && typeof data.data.xid === 'string') {
        if (this.xComponentId == data.data.xid) {
          if (GlobalContext.getContext().getObject('playType') == PlayerType.SYSTEM_AVPLAYER) {
            if (this.mIVideoPlayer && this.mIVideoPlayer.isPlaying()) {
              this.goPause();
            }
          } else {
            this.goPause();
          }
        }
      }
    })
  }

  private goPlaying() {
    LogUtils.getInstance().LOGI('standardGSYVideoPlayer onPlayingListener');
    this.loadingVisible = Visibility.None;
    this.showPlay = false;
    this.showPause = true;
    this.showBottomUi = true;
    this.coverVisible = Visibility.None;
    this.timeCountdown();
    this.stopProgressTask();
    if (!this.isSeek) {
      this.model.resume();
    }
    this.isSeek = false;
    this.startProgressTask();
    this.ijkComponentVisible = Visibility.Visible;
    if (this.mIVideoPlayer) {
      this.totalTime = this.stringForTime(this.mIVideoPlayer.getDuration());
    }
    LogUtils.getInstance().LOGI('standardGSYVideoPlayer onPlayingListener end.');
  }

  private goInit() {
    LogUtils.getInstance().LOGI('standardGSYVideoPlayer onErrorListener');
    clearTimeout(uiTime);
    if (this.mIVideoPlayer && GlobalContext.getContext().getObject('playType') == PlayerType.SYSTEM_AVPLAYER) {
      LogUtils.getInstance().LOGI('PlayerType.SYSTEM_AVPLAYER need to stop');
      this.mIVideoPlayer.stop();
    }
    this.loadingVisible = Visibility.None;
    this.coverVisible = Visibility.Visible;
    this.ijkComponentVisible = Visibility.Hidden;
    this.showBottomUi = false;
    this.showPlay = true;
    this.showPause = false;
  }

  private goPause() {
    LogUtils.getInstance().LOGI('standardGSYVideoPlayer onPauseListener');
    if (!this.isSeek) {
      this.showPlay = true;
      this.showPause = false;
    }
    this.stopProgressTask();
    clearTimeout(uiTime);
    clearTimeout(uiLockTime);
    this.model.pause();
    this.showBottomUi = true;
  }

  aboutToAppear() {
    LogUtils.getInstance().setLogSwitch(true);
    LogUtils.getInstance().LOGI('standardGSYVideoPlayer aboutToAppear');
    this.emitterInit();
    this.mDirection = this.getDirection();
    try {
      let promise = window.getLastWindow(getContext(this));
      promise.then((data) => {
        windowClass = data;
      }).catch((error: BusinessError) => {
        LogUtils.getInstance().LOGI('Failed to obtain the top window. Cause: ' + JSON.stringify(error));
      })
    } catch (exception) {
      LogUtils.getInstance().LOGI('Failed to obtain the top window. Cause: ' + JSON.stringify(exception));
    }
    let groupid = audio.DEFAULT_VOLUME_GROUP_ID;
    this.mAudioManager = audio.getAudioManager();
    let volumeManager: audio.AudioVolumeManager = this.mAudioManager.getVolumeManager();
    let audioVolumeGroupManager = volumeManager.getVolumeGroupManagerSync(groupid);
    this.mMaxVolumeValue = audioVolumeGroupManager.getMaxVolumeSync(audio.AudioVolumeType.MEDIA);
    this.mCurrentVolumeValue = audioVolumeGroupManager.getVolumeSync(audio.AudioVolumeType.MEDIA);
    this.mCurrentBrightness = Number(settings.getValueSync(getContext(this), settings.display.SCREEN_BRIGHTNESS_STATUS, '10'));

    setTimeout(() => {
      this.danmuInit()
    }, 0)
  }

  danmuInit() {
    let maxLinesPair: Map<number, number> = new Map();
    maxLinesPair.set(BaseDanmaku.TYPE_SCROLL_RL, 5); // 滚动弹幕最大显示5行
    // 设置是否禁止重叠
    let overlappingEnablePair: Map<number, boolean> = new Map();
    overlappingEnablePair.set(BaseDanmaku.TYPE_SCROLL_RL, true);
    overlappingEnablePair.set(BaseDanmaku.TYPE_FIX_TOP, true);
    this.mContext = DanmakuContext.create();
    this.mContext.setDanmakuStyle(DANMAKU_STYLE_STROKEN, 3)
      .setDuplicateMergingEnabled(false)
      .setScrollSpeedFactor(1.2)
      .setScaleTextSize(1.2)
      .setCacheStuffer(new SpannedCacheStuffer(), this.mCacheStufferAdapter) // 图文混排使用SpannedCacheStuffer
      .setMaximumLines(maxLinesPair)
      .preventOverlapping(overlappingEnablePair)
      .setDanmakuMargin(40);
    let that = this
    if (this.model != null) {
      this.mParser = this.createParser();
      this.model.setCallback(new Call(that));
      this.model.setOnDanmakuClickListener(new OnDanMu(that))
      this.model.prepare(this.mParser, this.mContext);
      this.model.showFPS(false);
    }
  }

  aboutToDisappear() {
    LogUtils.getInstance().LOGI('standardGSYVideoPlayer aboutToDisappear');
    this.emitterOff();
    this.stop();
    this.model.stop();
    this.model.release();
  }

  private emitterOff() {
    emitter.off(1);
    emitter.off(2);
    emitter.off(3);
  }

  private getDirection(): number {
    return getContext().getApplicationContext().resourceManager.getConfigurationSync().direction;
  }

  resumePlay() {
    LogUtils.getInstance().LOGI('standardGSYVideoPlayer resumePlay');
    if (this.mIVideoPlayer) {
      this.timeCountdown();
      this.videoJudgeToPlay();
    }
  }

  stop() {
    LogUtils.getInstance().LOGI('standardGSYVideoPlayer stop');
    this.stopProgressTask();
    if (this.mIVideoPlayer) {
      this.mIVideoPlayer.stop();
      this.mIVideoPlayer.release();
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
    let seconds: number | string = totalSeconds % 60;
    let minutes: number | string = (totalSeconds / 60) % 60;
    let hours: number | string = (totalSeconds / 3600);

    hours = this.completionNum(Math.floor(Math.floor(hours * 100) / 100));
    minutes = this.completionNum(Math.floor(Math.floor(minutes * 100) / 100));
    seconds = this.completionNum(Math.floor(Math.floor(seconds * 100) / 100));

    if (hours > 0) {
      return hours + ":" + minutes + ":" + seconds;
    } else {
      return minutes + ":" + seconds;
    }
  }

  private stopProgressTask() {
    LogUtils.getInstance().LOGI('stopProgressTask');
    clearInterval(updateProgressTimer);
  }

  private startProgressTask() {
    let that = this;
    updateProgressTimer = setInterval(() => {
      LogUtils.getInstance().LOGI('startProgressTask');
      if (!that.mDestroyPage) {
        that.setProgress();
      }
    }, 1000)
  }

  private setProgress() {
    if (this.mIVideoPlayer) {
      let position = this.mIVideoPlayer.getCurrentPosition();
      let duration = this.mIVideoPlayer.getDuration();
      let pos = 0;
      if (duration > 0) {
        this.slideEnable = true;
        let curPercent = position / duration;
        pos = curPercent * 100;
        this.progressValue = pos;
      }
      LogUtils.getInstance()
        .LOGI('setProgress position: ' + position + ' duration: ' + duration + ' progressValue: ' + pos);
      this.totalTime = this.stringForTime(duration);
      if (position > duration) {
        position = duration;
      }
      this.currentTime = this.stringForTime(position);
    }
  }

  private timeCountdown() {
    clearTimeout(uiTime);
    this.showPause = true;
    this.showBottomUi = true;
    if (this.mDirection == 1 && this.screenIsFull) {
      this.fullShowLock = true;
      this.fullShowTop = true;
    }
    this.sec = 3;
    uiTime = setInterval(() => {
      if (this.sec <= 0) {
        clearTimeout(uiTime);
        this.showBottomUi = false;
        this.showPause = false;
        this.fullShowLock = false;
      } else {
        this.sec--;
      }
    }, 1000)
  }

  private timeLockCountdown() {
    clearTimeout(uiLockTime);
    this.fullShowLock = true;
    this.sec = 3;
    uiLockTime = setInterval(() => {
      if (this.sec <= 0) {
        clearTimeout(uiLockTime);
        this.fullShowLock = false;
      } else {
        this.sec--;
      }
    }, 1000)
  }
}

class Call implements Callback {
  private that: ESObject;

  constructor(that: ESObject) {
    this.that = that
  }

  public updateTimer(timer: DanmakuTimer): void {
  }

  public drawingFinished(): void {

  }

  public danmakuShown(danmaku: BaseDanmaku): void {
  }

  public prepared(): void {
  }
}

class OnDanMu implements OnDanmakuClickListener {
  private that: ESObject;

  constructor(that: ESObject) {
    this.that = that
  }

  onDanmakuClick(danmakus: IDanmakus): boolean {
    console.log('DFM onDanmakuClick: danmakus size:' + danmakus.size())
    let latest: BaseDanmaku = danmakus.last()
    if (null != latest) {
      console.log('DFM onDanmakuClick: text of latest danmaku:' + latest.text)
      return true
    }
    return false
  };

  onDanmakuLongClick(danmakus: IDanmakus): boolean {
    return false
  };

  onViewClick(view: IDanmakuView): boolean {
    this.that.isVisible = true
    return false
  };
}

class Pro extends Proxy {
  public prepareDrawing(danmaku: BaseDanmaku, fromWorkerThread: boolean): void {
  }

  public releaseResource(danmaku: BaseDanmaku): void {
    // TODO 重要:清理含有ImageSpan的text中的一些占用内存的资源 例如drawable
  }
}
;