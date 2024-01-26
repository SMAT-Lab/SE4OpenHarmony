interface DanmakuVideoPlayer_Params {
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
    mDestroyPage?: boolean;
    loadingVisible?: Visibility;
    mDirection?: number;
    screenIsFull?: boolean;
    danMuText?: string;
    showVolumeUi?: boolean;
    showBrightnessUi?: boolean;
    showSeekProgressUi?: boolean;
    mCurrentVolumeValue?: number;
    mMaxVolumeValue?: number;
    mCurrentBrightness?: number;
    mSeekCurrentTime?: string;
    mSeekTimePosition?: number;
    isSeek?: boolean;
    isLoadNotSeek?: boolean;
    mSeekDirectionRes?: Resource;
    mAudioManager?: audio.AudioManager | null;
    isVerticalDrag?: boolean;
    isHorizontalDrag?: boolean;
    coverVisible?: Visibility;
    panOptionBrightAndVolume?: PanGestureOptions;
    panOptionSeek?: PanGestureOptions;
    title?: string;
    xComponentId?: string;
    ijkComponentVisible?: Visibility;
    danMuShow?: boolean;
    sec?: number;
    PROGRESS_MAX_VALUE?: number;
    videoModel?: StandardGSYVideoModel;
    model?: DanmakuView.Model;
    mContext?: DanmakuContext | undefined;
    mParser?: BaseDanmakuParser | undefined;
    mCacheStufferAdapter?: Proxy;
    videoInit?: (iVideoPlayer: IVideoPlayer, xid: string) => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DanmakuVideoPlayer_" + ++__generate__Id;
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
import window from '@ohos.window';
import { BusinessError } from '@ohos.base';
import { AvVideoPlayer, GlobalContext, IjkVideoPlayer, IVideoPlayer, LogUtils, PlayerType, PlayStatus, StandardGSYVideoModel } from '@ohos/gsyvideoplayer';
import audio from '@ohos.multimedia.audio';
import emitter from '@ohos.events.emitter';
import settings from '@ohos.settings';
import { BaseDanmaku, BaseDanmakuParser, Callback, DANMAKU_STYLE_STROKEN, DanmakuContext, DanmakuTimer, DanmakuView, IDanmakus, IDanmakuView, JSONSource, OnDanmakuClickListener, Proxy, SpannedCacheStuffer, SystemClock } from '@ohos/danmakuflamemaster';
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
export class DanmakuVideoPlayer extends View {
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
        this.__mDestroyPage = new ObservedPropertySimple(false, this, "mDestroyPage");
        this.__loadingVisible = new ObservedPropertySimple(Visibility.None, this, "loadingVisible");
        this.__mDirection = new ObservedPropertySimple(0, this, "mDirection");
        this.__screenIsFull = new ObservedPropertySimple(false, this, "screenIsFull");
        this.__danMuText = new ObservedPropertySimple("弹幕关", this, "danMuText");
        this.__showVolumeUi = new ObservedPropertySimple(false, this, "showVolumeUi");
        this.__showBrightnessUi = new ObservedPropertySimple(false, this, "showBrightnessUi");
        this.__showSeekProgressUi = new ObservedPropertySimple(false, this, "showSeekProgressUi");
        this.__mCurrentVolumeValue = new ObservedPropertySimple(0, this, "mCurrentVolumeValue");
        this.__mMaxVolumeValue = new ObservedPropertySimple(20, this, "mMaxVolumeValue");
        this.__mCurrentBrightness = new ObservedPropertySimple(10, this, "mCurrentBrightness");
        this.__mSeekCurrentTime = new ObservedPropertySimple(this.currentTime, this, "mSeekCurrentTime");
        this.__mSeekTimePosition = new ObservedPropertySimple(0, this, "mSeekTimePosition");
        this.isSeek = false;
        this.isLoadNotSeek = false;
        this.__mSeekDirectionRes = new ObservedPropertyObject($r('app.media.video_forward_icon'), this, "mSeekDirectionRes");
        this.mAudioManager = null;
        this.isVerticalDrag = false;
        this.isHorizontalDrag = false;
        this.__coverVisible = new ObservedPropertySimple(Visibility.Visible, this, "coverVisible");
        this.panOptionBrightAndVolume = new PanGestureOptions({ direction: PanDirection.Vertical });
        this.panOptionSeek = new PanGestureOptions({ direction: PanDirection.Horizontal });
        this.title = "";
        this.xComponentId = 'xid';
        this.__ijkComponentVisible = new ObservedPropertySimple(Visibility.Hidden, this, "ijkComponentVisible");
        this.danMuShow = true;
        this.sec = 3;
        this.PROGRESS_MAX_VALUE = 100;
        this.videoModel = new StandardGSYVideoModel();
        this.__model = new ObservedPropertyObject(new DanmakuView.Model(), this, "model");
        this.mContext = undefined;
        this.mParser = undefined;
        this.mCacheStufferAdapter = new Pro();
        this.videoInit = (iVideoPlayer: IVideoPlayer, xid: string) => {
            LogUtils.getInstance().LOGI('VideoInit');
            this.mIVideoPlayer = iVideoPlayer;
            this.xComponentId = xid;
            this.mIVideoPlayer.setUp(this.videoModel.getUrl(), this.videoModel.getCacheWithPlay());
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DanmakuVideoPlayer_Params) {
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
        if (params.danMuText !== undefined) {
            this.danMuText = params.danMuText;
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
        if (params.isLoadNotSeek !== undefined) {
            this.isLoadNotSeek = params.isLoadNotSeek;
        }
        if (params.mSeekDirectionRes !== undefined) {
            this.mSeekDirectionRes = params.mSeekDirectionRes;
        }
        if (params.mAudioManager !== undefined) {
            this.mAudioManager = params.mAudioManager;
        }
        if (params.isVerticalDrag !== undefined) {
            this.isVerticalDrag = params.isVerticalDrag;
        }
        if (params.isHorizontalDrag !== undefined) {
            this.isHorizontalDrag = params.isHorizontalDrag;
        }
        if (params.coverVisible !== undefined) {
            this.coverVisible = params.coverVisible;
        }
        if (params.panOptionBrightAndVolume !== undefined) {
            this.panOptionBrightAndVolume = params.panOptionBrightAndVolume;
        }
        if (params.panOptionSeek !== undefined) {
            this.panOptionSeek = params.panOptionSeek;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.xComponentId !== undefined) {
            this.xComponentId = params.xComponentId;
        }
        if (params.ijkComponentVisible !== undefined) {
            this.ijkComponentVisible = params.ijkComponentVisible;
        }
        if (params.danMuShow !== undefined) {
            this.danMuShow = params.danMuShow;
        }
        if (params.sec !== undefined) {
            this.sec = params.sec;
        }
        if (params.PROGRESS_MAX_VALUE !== undefined) {
            this.PROGRESS_MAX_VALUE = params.PROGRESS_MAX_VALUE;
        }
        if (params.videoModel !== undefined) {
            this.videoModel = params.videoModel;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.mContext !== undefined) {
            this.mContext = params.mContext;
        }
        if (params.mParser !== undefined) {
            this.mParser = params.mParser;
        }
        if (params.mCacheStufferAdapter !== undefined) {
            this.mCacheStufferAdapter = params.mCacheStufferAdapter;
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
        this.__mDestroyPage.aboutToBeDeleted();
        this.__loadingVisible.aboutToBeDeleted();
        this.__mDirection.aboutToBeDeleted();
        this.__screenIsFull.aboutToBeDeleted();
        this.__danMuText.aboutToBeDeleted();
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
        this.__model.aboutToBeDeleted();
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
    private __danMuText: ObservedPropertySimple<string>;
    get danMuText() {
        return this.__danMuText.get();
    }
    set danMuText(newValue: string) {
        this.__danMuText.set(newValue);
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
    // 是否正在加载手势滑动禁止
    private isLoadNotSeek: boolean;
    // 当前拖拽进度的方向资源
    private __mSeekDirectionRes: ObservedPropertyObject<Resource>;
    get mSeekDirectionRes() {
        return this.__mSeekDirectionRes.get();
    }
    set mSeekDirectionRes(newValue: Resource) {
        this.__mSeekDirectionRes.set(newValue);
    }
    private mAudioManager: audio.AudioManager | null;
    private isVerticalDrag: boolean;
    private isHorizontalDrag: boolean;
    private __coverVisible: ObservedPropertySimple<Visibility>;
    get coverVisible() {
        return this.__coverVisible.get();
    }
    set coverVisible(newValue: Visibility) {
        this.__coverVisible.set(newValue);
    }
    private panOptionBrightAndVolume: PanGestureOptions;
    private panOptionSeek: PanGestureOptions;
    public title: string;
    private xComponentId: string;
    private __ijkComponentVisible: ObservedPropertySimple<Visibility>;
    get ijkComponentVisible() {
        return this.__ijkComponentVisible.get();
    }
    set ijkComponentVisible(newValue: Visibility) {
        this.__ijkComponentVisible.set(newValue);
    }
    private danMuShow: boolean;
    private sec: number;
    private PROGRESS_MAX_VALUE: number;
    public videoModel: StandardGSYVideoModel;
    private __model: ObservedPropertyObject<DanmakuView.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: DanmakuView.Model) {
        this.__model.set(newValue);
    }
    private mContext: DanmakuContext | undefined;
    private mParser: BaseDanmakuParser | undefined;
    private mCacheStufferAdapter: Proxy;
    private createParser(): BaseDanmakuParser {
        let parser: BaseDanmakuParser = new BiliDanmukuParser();
        let jsonSource = new JSONSource(sourceData);
        parser.load(jsonSource);
        return parser;
    }
    private videoInit: (iVideoPlayer: IVideoPlayer, xid: string) => void;
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
        Column.create();
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
        Slider.blockColor(Color.Blue);
        Slider.trackColor(Color.Gray);
        Slider.selectedColor(Color.Blue);
        Slider.showSteps(true);
        Slider.showTips(true);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
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
        });
        Text.create(this.totalTime);
        Text.width('80px');
        Text.fontSize('20px');
        Text.margin({ right: 5 });
        Text.fontColor($r('app.color.color_white'));
        Text.pop();
        Image.create(this.screenIsFull ? $r('app.media.video_shrink') : $r('app.media.video_enlarge'));
        Image.width(20);
        Image.height(18);
        Image.margin({ right: 15 });
        Image.onClick(() => {
            this.videoModel.ExecuteFullClickListener();
        });
        Flex.pop();
        Row.create();
        Row.backgroundColor($r('app.color.bottom_controls_color'));
        Row.margin({ bottom: (this.screenIsFull ? 10 : 0) });
        Text.create("发送弹幕");
        Text.backgroundColor($r('app.color.color_add_danmu'));
        Text.width("90%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor($r('app.color.color_add_text_danmu'));
        Text.onClick(() => {
            this.addDanmaku(false);
        });
        Text.layoutWeight(1);
        Text.pop();
        Text.create(this.danMuText);
        Text.textAlign(TextAlign.Center);
        Text.fontColor($r('app.color.color_show_danmu'));
        Text.onClick(() => {
            if (this.danMuShow) {
                this.model.hide();
                this.danMuText = '弹幕开';
            }
            else {
                this.model.setWidth(vp2px(changeWidth));
                this.model.setHeight(vp2px(changeHeight - 1));
                this.model.hide();
                this.model.show();
                this.danMuText = '弹幕关';
            }
            this.danMuShow = !this.danMuShow;
        });
        Text.pop();
        Row.pop();
        Column.pop();
    }
    VolumeUi(parent = null) {
        Column.create();
        Column.visibility(this.showVolumeUi ? Visibility.Visible : Visibility.Hidden);
        Column.alignSelf(ItemAlign.Center);
        Progress.create({
            value: Number((this.mCurrentVolumeValue / this.mMaxVolumeValue * 100).toFixed(0)),
            total: 100,
            type: ProgressType.Linear
        });
        Progress.style({ strokeWidth: 10, enableSmoothEffect: false });
        Progress.rotate({ angle: -90 });
        Progress.margin({ top: 20, left: -20 });
        Progress.alignSelf(ItemAlign.Center);
        Progress.backgroundColor(Color.White);
        Image.create($r('app.media.video_volume_icon'));
        Image.objectFit(ImageFit.Auto);
        Image.margin({ top: 50, left: -15 });
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
        // 绑定声音屏幕亮度拖动手势
        PanGesture.create(this.panOptionBrightAndVolume);
        // 绑定声音屏幕亮度拖动手势
        PanGesture.onActionStart((event: GestureEvent | undefined) => {
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
        });
        // 绑定声音屏幕亮度拖动手势
        PanGesture.onActionUpdate((event: GestureEvent | undefined) => {
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
                        });
                    }
                }
                else {
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
        });
        // 绑定声音屏幕亮度拖动手势
        PanGesture.onActionEnd((event: GestureEvent | undefined) => {
            LogUtils.getInstance().LOGI('Vertical Pan End');
            this.showVolumeUi = false;
            this.showBrightnessUi = false;
            this.isVerticalDrag = false;
        });
        // 绑定声音屏幕亮度拖动手势
        PanGesture.pop();
        PanGesture.create(this.panOptionSeek);
        PanGesture.onActionStart((event: GestureEvent | undefined) => {
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
        });
        PanGesture.onActionUpdate((event: GestureEvent | undefined) => {
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
                }
                else {
                    this.mSeekDirectionRes = $r('app.media.video_backward_icon');
                }
                let position: number = this.mIVideoPlayer.getCurrentPosition();
                let totalTimeDuration: number = this.mIVideoPlayer.getDuration();
                let seekTimePosition: number = Number(position + (deltaX * totalTimeDuration / changeWidth));
                if (seekTimePosition < 0) {
                    seekTimePosition = 0;
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
        });
        PanGesture.onActionEnd((event: GestureEvent | undefined) => {
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
        });
        PanGesture.pop();
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
            }
            else {
                this.model.hide();
            }
        });
        Stack.backgroundColor(Color.Black);
        If.create();
        if (GlobalContext.getContext().getObject('playType') == PlayerType.SYSTEM_AVPLAYER) {
            If.branchId(0);
        }
        else {
            If.branchId(1);
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
            });
        }
        catch (exception) {
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
            this.danmuInit();
        }, 0);
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
        let that = this;
        if (this.model != null) {
            this.mParser = this.createParser();
            this.model.setCallback(new Call(that));
            this.model.setOnDanmakuClickListener(new OnDanMu(that));
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
class Call implements Callback {
    private that: any;
    constructor(that: any) {
        this.that = that;
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
    private that: any;
    constructor(that: any) {
        this.that = that;
    }
    onDanmakuClick(danmakus: IDanmakus): boolean {
        console.log('DFM onDanmakuClick: danmakus size:' + danmakus.size());
        let latest: BaseDanmaku = danmakus.last();
        if (null != latest) {
            console.log('DFM onDanmakuClick: text of latest danmaku:' + latest.text);
            return true;
        }
        return false;
    }
    ;
    onDanmakuLongClick(danmakus: IDanmakus): boolean {
        return false;
    }
    ;
    onViewClick(view: IDanmakuView): boolean {
        this.that.isVisible = true;
        return false;
    }
    ;
}
class Pro extends Proxy {
    public prepareDrawing(danmaku: BaseDanmaku, fromWorkerThread: boolean): void {
    }
    public releaseResource(danmaku: BaseDanmaku): void {
        // TODO 重要:清理含有ImageSpan的text中的一些占用内存的资源 例如drawable
    }
}
;
