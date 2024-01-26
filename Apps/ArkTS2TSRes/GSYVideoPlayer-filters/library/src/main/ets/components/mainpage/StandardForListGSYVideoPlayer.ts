interface StandardForListGSYVideoPlayer_Params {
    mIVideoPlayer?: IVideoPlayer | undefined;
    currentTime?: string;
    totalTime?: string;
    progressValue?: number;
    slideEnable?: boolean;
    eventType?: string;
    showBottomUi?: boolean;
    fullShowTop?: boolean;
    fullShowLock?: boolean;
    lock?: boolean;
    showPlay?: boolean;
    showPause?: boolean;
    showFull?: Visibility;
    mDestroyPage?: boolean;
    loadingVisible?: Visibility;
    mDirection?: number;
    screenIsFull?: boolean;
    showVolumeUi?: boolean;
    showBrightnessUi?: boolean;
    showSeekProgressUi?: boolean;
    mCurrentVolumeValue?: number;
    mMaxVolumeValue?: number;
    mCurrentBrightness?: number;
    mSeekCurrentTime?: string;
    mSeekTimePosition?: number;
    isSeek?: boolean;
    mSeekDirectionRes?: Resource;
    coverVisible?: Visibility;
    title?: string;
    xComponentId?: string;
    uiTime?: number;
    sec?: number;
    PROGRESS_MAX_VALUE?: number;
    ijkComponentVisible?: Visibility;
    videoModel?: StandardGSYVideoModel;
    videoInit?: (iVideoPlayer: IVideoPlayer, xid: string) => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "StandardForListGSYVideoPlayer_" + ++__generate__Id;
}
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
import { LogUtils } from '../utils/LogUtils';
import { IjkVideoPlayer } from './IjkVideoPlayer';
import { IVideoPlayer } from './IVideoPlayer';
import { PlayStatus } from './CommonConstants';
import emitter from '@ohos.events.emitter';
import { GlobalContext } from './GlobalContext';
import { PlayerType } from './CommonConstants';
import { AvVideoPlayer } from './AvVideoPlayer';
import { StandardGSYVideoModel } from './StandardGSYVideoModel';
let updateProgressTimer: number = 0;
let changeHeight: number = 0;
let screenHeight: number = 0;
let uiLockTime: number = 0;
let videoPlayEvent: emitter.InnerEvent = {
    eventId: 1
};
let videoInitEvent: emitter.InnerEvent = {
    eventId: 2
};
let videoPauseEvent: emitter.InnerEvent = {
    eventId: 3
};
export class StandardForListGSYVideoPlayer extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.mIVideoPlayer = undefined;
        this.__currentTime = new ObservedPropertySimple("00:00", this, "currentTime");
        this.addProvidedVar("currentTime", this.__currentTime, false);
        this.__totalTime = new ObservedPropertySimple("00:00", this, "totalTime");
        this.addProvidedVar("totalTime", this.__totalTime, false);
        this.__progressValue = new ObservedPropertySimple(0, this, "progressValue");
        this.__slideEnable = new ObservedPropertySimple(false, this, "slideEnable");
        this.__eventType = new ObservedPropertySimple('', this, "eventType");
        this.__showBottomUi = new ObservedPropertySimple(false, this, "showBottomUi");
        this.__fullShowTop = new ObservedPropertySimple(false, this, "fullShowTop");
        this.__fullShowLock = new ObservedPropertySimple(false, this, "fullShowLock");
        this.__lock = new ObservedPropertySimple(false, this, "lock");
        this.__showPlay = new ObservedPropertySimple(true, this, "showPlay");
        this.__showPause = new ObservedPropertySimple(false, this, "showPause");
        this.__showFull = new ObservedPropertySimple(Visibility.None, this, "showFull");
        this.__mDestroyPage = new ObservedPropertySimple(false, this, "mDestroyPage");
        this.__loadingVisible = new ObservedPropertySimple(Visibility.None, this, "loadingVisible");
        this.__mDirection = new ObservedPropertySimple(0, this, "mDirection");
        this.__screenIsFull = new ObservedPropertySimple(false, this, "screenIsFull");
        this.__showVolumeUi = new ObservedPropertySimple(false, this, "showVolumeUi");
        this.__showBrightnessUi = new ObservedPropertySimple(false, this, "showBrightnessUi");
        this.__showSeekProgressUi = new ObservedPropertySimple(false, this, "showSeekProgressUi");
        this.__mCurrentVolumeValue = new ObservedPropertySimple(0, this, "mCurrentVolumeValue");
        this.__mMaxVolumeValue = new ObservedPropertySimple(20, this, "mMaxVolumeValue");
        this.__mCurrentBrightness = new ObservedPropertySimple(10, this, "mCurrentBrightness");
        this.__mSeekCurrentTime = new ObservedPropertySimple(this.currentTime, this, "mSeekCurrentTime");
        this.__mSeekTimePosition = new ObservedPropertySimple(0, this, "mSeekTimePosition");
        this.isSeek = false;
        this.__mSeekDirectionRes = new ObservedPropertyObject($r('app.media.video_forward_icon'), this, "mSeekDirectionRes");
        this.__coverVisible = new ObservedPropertySimple(Visibility.Visible, this, "coverVisible");
        this.title = "";
        this.xComponentId = 'xid';
        this.uiTime = 0;
        this.sec = 3;
        this.PROGRESS_MAX_VALUE = 100;
        this.__ijkComponentVisible = new ObservedPropertySimple(Visibility.Hidden, this, "ijkComponentVisible");
        this.videoModel = new StandardGSYVideoModel();
        this.videoInit = (iVideoPlayer: IVideoPlayer, xid: string) => {
            LogUtils.getInstance().LOGI('IJKVideoInit');
            this.mIVideoPlayer = iVideoPlayer;
            this.xComponentId = xid;
            this.mIVideoPlayer.setUp(this.videoModel.getUrl(), this.videoModel.getCacheWithPlay());
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: StandardForListGSYVideoPlayer_Params) {
        if (params.mIVideoPlayer !== undefined) {
            this.mIVideoPlayer = params.mIVideoPlayer;
        }
        if (params.currentTime !== undefined) {
            this.currentTime = params.currentTime;
        }
        if (params.totalTime !== undefined) {
            this.totalTime = params.totalTime;
        }
        if (params.progressValue !== undefined) {
            this.progressValue = params.progressValue;
        }
        if (params.slideEnable !== undefined) {
            this.slideEnable = params.slideEnable;
        }
        if (params.eventType !== undefined) {
            this.eventType = params.eventType;
        }
        if (params.showBottomUi !== undefined) {
            this.showBottomUi = params.showBottomUi;
        }
        if (params.fullShowTop !== undefined) {
            this.fullShowTop = params.fullShowTop;
        }
        if (params.fullShowLock !== undefined) {
            this.fullShowLock = params.fullShowLock;
        }
        if (params.lock !== undefined) {
            this.lock = params.lock;
        }
        if (params.showPlay !== undefined) {
            this.showPlay = params.showPlay;
        }
        if (params.showPause !== undefined) {
            this.showPause = params.showPause;
        }
        if (params.showFull !== undefined) {
            this.showFull = params.showFull;
        }
        if (params.mDestroyPage !== undefined) {
            this.mDestroyPage = params.mDestroyPage;
        }
        if (params.loadingVisible !== undefined) {
            this.loadingVisible = params.loadingVisible;
        }
        if (params.mDirection !== undefined) {
            this.mDirection = params.mDirection;
        }
        if (params.screenIsFull !== undefined) {
            this.screenIsFull = params.screenIsFull;
        }
        if (params.showVolumeUi !== undefined) {
            this.showVolumeUi = params.showVolumeUi;
        }
        if (params.showBrightnessUi !== undefined) {
            this.showBrightnessUi = params.showBrightnessUi;
        }
        if (params.showSeekProgressUi !== undefined) {
            this.showSeekProgressUi = params.showSeekProgressUi;
        }
        if (params.mCurrentVolumeValue !== undefined) {
            this.mCurrentVolumeValue = params.mCurrentVolumeValue;
        }
        if (params.mMaxVolumeValue !== undefined) {
            this.mMaxVolumeValue = params.mMaxVolumeValue;
        }
        if (params.mCurrentBrightness !== undefined) {
            this.mCurrentBrightness = params.mCurrentBrightness;
        }
        if (params.mSeekCurrentTime !== undefined) {
            this.mSeekCurrentTime = params.mSeekCurrentTime;
        }
        if (params.mSeekTimePosition !== undefined) {
            this.mSeekTimePosition = params.mSeekTimePosition;
        }
        if (params.isSeek !== undefined) {
            this.isSeek = params.isSeek;
        }
        if (params.mSeekDirectionRes !== undefined) {
            this.mSeekDirectionRes = params.mSeekDirectionRes;
        }
        if (params.coverVisible !== undefined) {
            this.coverVisible = params.coverVisible;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.xComponentId !== undefined) {
            this.xComponentId = params.xComponentId;
        }
        if (params.uiTime !== undefined) {
            this.uiTime = params.uiTime;
        }
        if (params.sec !== undefined) {
            this.sec = params.sec;
        }
        if (params.PROGRESS_MAX_VALUE !== undefined) {
            this.PROGRESS_MAX_VALUE = params.PROGRESS_MAX_VALUE;
        }
        if (params.ijkComponentVisible !== undefined) {
            this.ijkComponentVisible = params.ijkComponentVisible;
        }
        if (params.videoModel !== undefined) {
            this.videoModel = params.videoModel;
        }
        if (params.videoInit !== undefined) {
            this.videoInit = params.videoInit;
        }
    }
    aboutToBeDeleted() {
        this.__currentTime.aboutToBeDeleted();
        this.__totalTime.aboutToBeDeleted();
        this.__progressValue.aboutToBeDeleted();
        this.__slideEnable.aboutToBeDeleted();
        this.__eventType.aboutToBeDeleted();
        this.__showBottomUi.aboutToBeDeleted();
        this.__fullShowTop.aboutToBeDeleted();
        this.__fullShowLock.aboutToBeDeleted();
        this.__lock.aboutToBeDeleted();
        this.__showPlay.aboutToBeDeleted();
        this.__showPause.aboutToBeDeleted();
        this.__showFull.aboutToBeDeleted();
        this.__mDestroyPage.aboutToBeDeleted();
        this.__loadingVisible.aboutToBeDeleted();
        this.__mDirection.aboutToBeDeleted();
        this.__screenIsFull.aboutToBeDeleted();
        this.__showVolumeUi.aboutToBeDeleted();
        this.__showBrightnessUi.aboutToBeDeleted();
        this.__showSeekProgressUi.aboutToBeDeleted();
        this.__mCurrentVolumeValue.aboutToBeDeleted();
        this.__mMaxVolumeValue.aboutToBeDeleted();
        this.__mCurrentBrightness.aboutToBeDeleted();
        this.__mSeekCurrentTime.aboutToBeDeleted();
        this.__mSeekTimePosition.aboutToBeDeleted();
        this.__mSeekDirectionRes.aboutToBeDeleted();
        this.__coverVisible.aboutToBeDeleted();
        this.__ijkComponentVisible.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private mIVideoPlayer: IVideoPlayer | undefined;
    private __currentTime: ObservedPropertySimple<string>;
    get currentTime() {
        return this.__currentTime.get();
    }
    set currentTime(newValue: string) {
        this.__currentTime.set(newValue);
    }
    private __totalTime: ObservedPropertySimple<string>;
    get totalTime() {
        return this.__totalTime.get();
    }
    set totalTime(newValue: string) {
        this.__totalTime.set(newValue);
    }
    private __progressValue: ObservedPropertySimple<number>;
    get progressValue() {
        return this.__progressValue.get();
    }
    set progressValue(newValue: number) {
        this.__progressValue.set(newValue);
    }
    private __slideEnable: ObservedPropertySimple<boolean>;
    get slideEnable() {
        return this.__slideEnable.get();
    }
    set slideEnable(newValue: boolean) {
        this.__slideEnable.set(newValue);
    }
    private __eventType: ObservedPropertySimple<string>;
    get eventType() {
        return this.__eventType.get();
    }
    set eventType(newValue: string) {
        this.__eventType.set(newValue);
    }
    private __showBottomUi: ObservedPropertySimple<boolean>;
    get showBottomUi() {
        return this.__showBottomUi.get();
    }
    set showBottomUi(newValue: boolean) {
        this.__showBottomUi.set(newValue);
    }
    private __fullShowTop: ObservedPropertySimple<boolean>;
    get fullShowTop() {
        return this.__fullShowTop.get();
    }
    set fullShowTop(newValue: boolean) {
        this.__fullShowTop.set(newValue);
    }
    private __fullShowLock: ObservedPropertySimple<boolean>;
    get fullShowLock() {
        return this.__fullShowLock.get();
    }
    set fullShowLock(newValue: boolean) {
        this.__fullShowLock.set(newValue);
    }
    private __lock: ObservedPropertySimple<boolean>;
    get lock() {
        return this.__lock.get();
    }
    set lock(newValue: boolean) {
        this.__lock.set(newValue);
    }
    private __showPlay: ObservedPropertySimple<boolean>;
    get showPlay() {
        return this.__showPlay.get();
    }
    set showPlay(newValue: boolean) {
        this.__showPlay.set(newValue);
    }
    private __showPause: ObservedPropertySimple<boolean>;
    get showPause() {
        return this.__showPause.get();
    }
    set showPause(newValue: boolean) {
        this.__showPause.set(newValue);
    }
    private __showFull: ObservedPropertySimple<Visibility>;
    get showFull() {
        return this.__showFull.get();
    }
    set showFull(newValue: Visibility) {
        this.__showFull.set(newValue);
    }
    private __mDestroyPage: ObservedPropertySimple<boolean>;
    get mDestroyPage() {
        return this.__mDestroyPage.get();
    }
    set mDestroyPage(newValue: boolean) {
        this.__mDestroyPage.set(newValue);
    }
    private __loadingVisible: ObservedPropertySimple<Visibility>;
    get loadingVisible() {
        return this.__loadingVisible.get();
    }
    set loadingVisible(newValue: Visibility) {
        this.__loadingVisible.set(newValue);
    }
    private __mDirection: ObservedPropertySimple<number>;
    get mDirection() {
        return this.__mDirection.get();
    }
    set mDirection(newValue: number) {
        this.__mDirection.set(newValue);
    }
    private __screenIsFull: ObservedPropertySimple<boolean>;
    get screenIsFull() {
        return this.__screenIsFull.get();
    }
    set screenIsFull(newValue: boolean) {
        this.__screenIsFull.set(newValue);
    }
    // 是否显示音量数值的布局
    private __showVolumeUi: ObservedPropertySimple<boolean>;
    get showVolumeUi() {
        return this.__showVolumeUi.get();
    }
    set showVolumeUi(newValue: boolean) {
        this.__showVolumeUi.set(newValue);
    }
    // 是否显示亮度数值的布局
    private __showBrightnessUi: ObservedPropertySimple<boolean>;
    get showBrightnessUi() {
        return this.__showBrightnessUi.get();
    }
    set showBrightnessUi(newValue: boolean) {
        this.__showBrightnessUi.set(newValue);
    }
    // 是否显示横向滑动的进度布局
    private __showSeekProgressUi: ObservedPropertySimple<boolean>;
    get showSeekProgressUi() {
        return this.__showSeekProgressUi.get();
    }
    set showSeekProgressUi(newValue: boolean) {
        this.__showSeekProgressUi.set(newValue);
    }
    // 当前音量 [0-20]
    private __mCurrentVolumeValue: ObservedPropertySimple<number>;
    get mCurrentVolumeValue() {
        return this.__mCurrentVolumeValue.get();
    }
    set mCurrentVolumeValue(newValue: number) {
        this.__mCurrentVolumeValue.set(newValue);
    }
    // 系统最大音量
    private __mMaxVolumeValue: ObservedPropertySimple<number>;
    get mMaxVolumeValue() {
        return this.__mMaxVolumeValue.get();
    }
    set mMaxVolumeValue(newValue: number) {
        this.__mMaxVolumeValue.set(newValue);
    }
    // 当前亮度 [0-255]
    private __mCurrentBrightness: ObservedPropertySimple<number>;
    get mCurrentBrightness() {
        return this.__mCurrentBrightness.get();
    }
    set mCurrentBrightness(newValue: number) {
        this.__mCurrentBrightness.set(newValue);
    }
    // 拖拽的时间
    private __mSeekCurrentTime: ObservedPropertySimple<string>;
    get mSeekCurrentTime() {
        return this.__mSeekCurrentTime.get();
    }
    set mSeekCurrentTime(newValue: string) {
        this.__mSeekCurrentTime.set(newValue);
    }
    // 当前进度
    private __mSeekTimePosition: ObservedPropertySimple<number>;
    get mSeekTimePosition() {
        return this.__mSeekTimePosition.get();
    }
    set mSeekTimePosition(newValue: number) {
        this.__mSeekTimePosition.set(newValue);
    }
    // 是否拖动进度条
    private isSeek: boolean;
    // 当前拖拽进度的方向资源
    private __mSeekDirectionRes: ObservedPropertyObject<Resource>;
    get mSeekDirectionRes() {
        return this.__mSeekDirectionRes.get();
    }
    set mSeekDirectionRes(newValue: Resource) {
        this.__mSeekDirectionRes.set(newValue);
    }
    private __coverVisible: ObservedPropertySimple<Visibility>;
    get coverVisible() {
        return this.__coverVisible.get();
    }
    set coverVisible(newValue: Visibility) {
        this.__coverVisible.set(newValue);
    }
    public title: string;
    private xComponentId: string;
    private uiTime: number;
    private sec: number;
    private PROGRESS_MAX_VALUE: number;
    private __ijkComponentVisible: ObservedPropertySimple<Visibility>;
    get ijkComponentVisible() {
        return this.__ijkComponentVisible.get();
    }
    set ijkComponentVisible(newValue: Visibility) {
        this.__ijkComponentVisible.set(newValue);
    }
    public videoModel: StandardGSYVideoModel;
    private videoInit: (iVideoPlayer: IVideoPlayer, xid: string) => void;
    topTitle(parent = null) {
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start });
        Flex.align(Alignment.BottomEnd);
        Flex.backgroundColor($r('app.color.bottom_controls_color'));
        Flex.position({ x: 0, y: 0 });
        Flex.padding(10);
        Image.create($r('app.media.video_back'));
        Image.width(15);
        Image.height(15);
        Image.margin({ top: 10, left: 15 });
        Image.onClick(() => {
            this.videoModel.ExecuteBackClickListener();
        });
        Text.create(this.videoModel.getTitle());
        Text.fontSize('10vp');
        Text.margin({ top: 10, left: 5 });
        Text.fontColor($r('app.color.color_white'));
        Text.pop();
        Flex.pop();
    }
    middleControls(parent = null) {
        Row.create();
        Row.width("100%");
        Row.height('100%');
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.align(Alignment.BottomEnd);
        Flex.width('33.3%');
        Flex.height('100%');
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.align(Alignment.BottomEnd);
        Flex.width('33.3%');
        Flex.height('100%');
        If.create();
        if (this.showPlay) {
            If.branchId(0);
            Image.create($r('app.media.video_play_pressed'));
            Image.width(30);
            Image.height(30);
            Image.onClick(() => {
                this.videoToPlay();
            });
        }
        If.pop();
        Image.create($r('app.media.icon_load'));
        Image.objectFit(ImageFit.Auto);
        Image.width(30);
        Image.height(30);
        Image.visibility(this.loadingVisible);
        Image.border({ width: 0 });
        Image.borderStyle(BorderStyle.Dashed);
        If.create();
        if (this.showPause) {
            If.branchId(0);
            Image.create($r('app.media.video_pause_normal'));
            Image.width(30);
            Image.height(30);
            Image.onClick(() => {
                LogUtils.getInstance().LOGI('click pause');
                this.videoToPause();
            });
        }
        If.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.End });
        Flex.align(Alignment.BottomEnd);
        Flex.width('33.3%');
        Flex.height('100%');
        If.create();
        if (this.mDirection == 1 && this.fullShowLock) {
            If.branchId(0);
            Image.create(this.lock ? $r('app.media.lock') : $r('app.media.unlock'));
            Image.width(20);
            Image.height(20);
            Image.objectFit(ImageFit.Contain);
            Image.margin({ right: 15 });
            Image.onClick(() => {
                this.lock = !this.lock;
                if (this.lock) {
                    this.showBottomUi = false;
                    this.fullShowTop = false;
                    this.showPlay = false;
                    this.showPause = false;
                }
            });
        }
        If.pop();
        Flex.pop();
        Row.pop();
    }
    private videoToPause() {
        if (this.mIVideoPlayer) {
            LogUtils.getInstance().LOGI('standardGSYVideoPlayer onPause1 click');
            this.mIVideoPlayer.pause();
        }
    }
    private videoToPlay() {
        if (this.mIVideoPlayer) {
            LogUtils.getInstance().LOGI('standardGSYVideoPlayer onPlay click');
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
            }
            else {
                LogUtils.getInstance().LOGI('videoJudgeToPlay2');
                if (this.mIVideoPlayer.playStatus == PlayStatus.PAUSE) {
                    LogUtils.getInstance().LOGI('standardGSYVideoPlayer videoJudgeToPlay ResumePlay');
                    this.mIVideoPlayer.resumePlay();
                }
                else {
                    LogUtils.getInstance().LOGI('standardGSYVideoPlayer videoJudgeToPlay play: ' + this.mIVideoPlayer.videoUrl);
                    this.mIVideoPlayer.play();
                }
            }
        }
    }
    bottomControls(parent = null) {
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start });
        Flex.padding({ bottom: 10 });
        Flex.align(Alignment.BottomEnd);
        Flex.backgroundColor($r('app.color.bottom_controls_color'));
        Text.create(this.currentTime);
        Text.width('80px');
        Text.fontSize('20px');
        Text.margin({ left: 20 });
        Text.fontColor($r('app.color.color_white'));
        Text.pop();
        Slider.create({
            value: this.progressValue,
            min: 0,
            max: this.PROGRESS_MAX_VALUE,
            step: 1,
            style: SliderStyle.OutSet
        });
        Slider.layoutWeight(1);
        Slider.blockColor(Color.Blue);
        Slider.trackColor(Color.Gray);
        Slider.selectedColor(Color.Blue);
        Slider.showSteps(true);
        Slider.showTips(true);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            clearTimeout(this.uiTime);
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
                        this.isSeek = false;
                        let seekValue = value * (this.mIVideoPlayer.getDuration() / 100);
                        this.mIVideoPlayer.seekTo(seekValue);
                        this.mIVideoPlayer.firstOrSeek = true;
                        LogUtils.getInstance().LOGI('slider-->seekValue end: ' + seekValue);
                        break;
                }
            }
        });
        Text.create(this.totalTime);
        Text.fontSize('20px');
        Text.margin({ right: ((this.showFull == Visibility.Visible)) ? 5 : 20 });
        Text.fontColor($r('app.color.color_white'));
        Text.pop();
        Image.create(this.screenIsFull ? $r('app.media.video_shrink') : $r('app.media.video_enlarge'));
        Image.width(20);
        Image.height(18);
        Image.margin({ right: 15 });
        Image.onClick(() => {
            this.videoModel.ExecuteFullClickListener();
        });
        Image.visibility(this.showFull);
        Flex.pop();
    }
    VolumeUi(parent = null) {
        Column.create();
        Column.visibility(this.showVolumeUi ? Visibility.Visible : Visibility.Hidden);
        Column.width(50);
        Column.alignSelf(ItemAlign.Center);
        Progress.create({
            value: Number((this.mCurrentVolumeValue / this.mMaxVolumeValue * 100).toFixed(0)),
            total: 100,
            type: ProgressType.Linear
        });
        Progress.style({ strokeWidth: 10, enableSmoothEffect: false });
        Progress.height('30%');
        Progress.rotate({ angle: -180 });
        Progress.alignSelf(ItemAlign.Center);
        Progress.backgroundColor(Color.White);
        Image.create($r('app.media.video_volume_icon'));
        Image.objectFit(ImageFit.Auto);
        Image.margin({ top: 5, left: 5 });
        Image.width(30);
        Image.height(30);
        Image.alignSelf(ItemAlign.Center);
        Image.borderStyle(BorderStyle.Dashed);
        Column.pop();
    }
    BrightnessUi(parent = null) {
        Column.create();
        Column.visibility(this.showBrightnessUi ? Visibility.Visible : Visibility.Hidden);
        Column.width(80);
        Column.alignSelf(ItemAlign.Center);
        Image.create($r('app.media.video_brightness_6_white_36dp'));
        Image.objectFit(ImageFit.Auto);
        Image.width(30);
        Image.height(30);
        Image.border({ width: 0 });
        Image.alignSelf(ItemAlign.Center);
        Text.create((this.mCurrentBrightness / 255 * 100).toFixed(0) + '%');
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.width(80);
        Text.pop();
        Column.pop();
    }
    SeekProgressUi(parent = null) {
        Column.create();
        Column.visibility(this.showSeekProgressUi ? Visibility.Visible : Visibility.Hidden);
        Column.width(200);
        Column.backgroundColor('#55bcbcbc');
        Column.alignItems(HorizontalAlign.Center);
        Column.alignSelf(ItemAlign.Center);
        Image.create(this.mSeekDirectionRes);
        Image.objectFit(ImageFit.Auto);
        Image.width(30);
        Image.height(30);
        Image.border({ width: 0 });
        Image.margin({ top: 10 });
        Image.alignSelf(ItemAlign.Center);
        Row.create();
        Row.margin({ top: 10 });
        Text.create(this.mSeekCurrentTime);
        Text.fontColor(Color.Blue);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Text.create('/');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Text.create(this.totalTime);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Row.pop();
        Progress.create({
            value: this.mSeekTimePosition,
            total: 100,
            type: ProgressType.Linear
        });
        Progress.style({ strokeWidth: 5, enableSmoothEffect: false });
        Progress.padding({ left: 10, right: 10 });
        Progress.margin({ top: 10, bottom: 10 });
        Progress.backgroundColor(Color.White);
        Column.pop();
    }
    render() {
        Stack.create({ alignContent: Alignment.Bottom });
        Gesture.create(GesturePriority.Low);
        GestureGroup.create(GestureMode.Parallel);
        TapGesture.create();
        TapGesture.onAction((event: GestureEvent | undefined) => {
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
        });
        TapGesture.pop();
        TapGesture.create({ count: 2 });
        TapGesture.onAction((event: GestureEvent | undefined) => {
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
            }
            else {
                if (this.mIVideoPlayer.isPlaying()) {
                    this.videoToPause();
                }
                else {
                    this.videoToPlay();
                }
            }
        });
        TapGesture.pop();
        GestureGroup.pop();
        Gesture.pop();
        Stack.onAreaChange((oldValue: Area, newValue: Area) => {
            changeHeight = newValue.height as number;
            screenHeight = px2vp(display.getDefaultDisplaySync().height);
            this.mDirection = this.getDirection();
            this.screenIsFull = (screenHeight - changeHeight) < 50;
            // 如果用户不隐藏状态栏，全屏的时候组件高度与手机的高度差距小于50.就显示上方控制栏
            if (this.mDirection == 1 && this.screenIsFull) {
                this.fullShowTop = true;
                this.fullShowLock = true;
            }
        });
        Stack.backgroundColor(Color.Black);
        If.create();
        if (GlobalContext.getContext().getObject('playType') == PlayerType.SYSTEM_AVPLAYER) {
            If.branchId(0);
            let earlierCreatedChild_2: AvVideoPlayer = (this && this.findChildById) ? this.findChildById("2") as AvVideoPlayer : undefined;
            if (earlierCreatedChild_2 == undefined) {
                View.create(new AvVideoPlayer("2", this, { videoInit: this.videoInit }));
            }
            else {
                earlierCreatedChild_2.updateWithValueParams({
                    videoInit: this.videoInit
                });
                if (!earlierCreatedChild_2.needsUpdate()) {
                    earlierCreatedChild_2.markStatic();
                }
                View.create(earlierCreatedChild_2);
            }
        }
        else {
            If.branchId(1);
            let earlierCreatedChild_3: IjkVideoPlayer = (this && this.findChildById) ? this.findChildById("3") as IjkVideoPlayer : undefined;
            if (earlierCreatedChild_3 == undefined) {
                View.create(new IjkVideoPlayer("3", this, { videoInit: this.videoInit, isVisible: this.__ijkComponentVisible }));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({
                    videoInit: this.videoInit
                });
                View.create(earlierCreatedChild_3);
            }
        }
        If.pop();
        If.create();
        if (this.videoModel.getCoverImage()) {
            If.branchId(0);
            Image.create(this.videoModel.getCoverImage());
            Image.width('100%');
            Image.height('100%');
            Image.visibility(this.coverVisible);
        }
        If.pop();
        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.SpaceBetween });
        Flex.width('100%');
        Flex.height('100%');
        this.VolumeUi(this);
        this.SeekProgressUi(this);
        this.BrightnessUi(this);
        Flex.pop();
        this.middleControls(this);
        If.create();
        if (this.showBottomUi) {
            If.branchId(0);
            If.create();
            if (this.mDirection == 1 && this.fullShowTop) {
                If.branchId(0);
                this.topTitle(this);
            }
            If.pop();
            this.bottomControls(this);
        }
        If.pop();
        Stack.pop();
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
                }
                else {
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
                    }
                    else {
                        this.goPause();
                    }
                }
            }
        });
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
        this.startProgressTask();
        this.ijkComponentVisible = Visibility.Visible;
        if (this.mIVideoPlayer) {
            this.totalTime = this.stringForTime(this.mIVideoPlayer.getDuration());
        }
        LogUtils.getInstance().LOGI('standardGSYVideoPlayer onPlayingListener end.');
    }
    private goInit() {
        LogUtils.getInstance().LOGI('standardGSYVideoPlayer onErrorListener');
        clearTimeout(this.uiTime);
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
        clearTimeout(this.uiTime);
        clearTimeout(uiLockTime);
        this.showBottomUi = true;
    }
    aboutToAppear() {
        LogUtils.getInstance().setLogSwitch(true);
        LogUtils.getInstance().LOGI('standardGSYVideoPlayer aboutToAppear');
        this.emitterInit();
        this.mDirection = this.getDirection();
    }
    aboutToDisappear() {
        LogUtils.getInstance().LOGI('standardGSYVideoPlayer aboutToDisappear');
        this.emitterOff();
        this.stop();
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
        }
        else {
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
        }
        else {
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
        }, 1000);
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
        clearTimeout(this.uiTime);
        this.showPause = true;
        this.showBottomUi = true;
        if (this.mDirection == 1 && this.screenIsFull) {
            this.fullShowLock = true;
            this.fullShowTop = true;
        }
        this.sec = 3;
        this.uiTime = setInterval(() => {
            if (this.sec <= 0) {
                clearTimeout(this.uiTime);
                this.showBottomUi = false;
                this.showPause = false;
                this.fullShowLock = false;
            }
            else {
                this.sec--;
            }
        }, 1000);
    }
    private timeLockCountdown() {
        clearTimeout(uiLockTime);
        this.fullShowLock = true;
        this.sec = 3;
        uiLockTime = setInterval(() => {
            if (this.sec <= 0) {
                clearTimeout(uiLockTime);
                this.fullShowLock = false;
            }
            else {
                this.sec--;
            }
        }, 1000);
    }
}
