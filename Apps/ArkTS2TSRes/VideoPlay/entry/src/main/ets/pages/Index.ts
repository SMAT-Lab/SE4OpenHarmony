interface Index_Params {
    surfaceId?: string;
    timeout?: number;
    xComponentController?: XComponentController;
    avPlayManage?: avPlayManage;
    isSwiping?: boolean;
    isClickScreen?: boolean;
    flag?: boolean;
    XComponentFlag?: boolean;
    speedSelect?: number;
    videoListSelect?: number;
    durationTime?: number;
    currentTime?: number;
    surfaceW?: number;
    surfaceH?: number;
    show?: boolean;
    videoSelect?: number;
    percent?: number;
    windowWidth?: number;
    windowHeight?: number;
    videoName?: Resource;
    videoIndex?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import avPlayManage from '../videomanager/AvPlayManager';
import media from '@ohos.multimedia.media';
import display from '@ohos.display';
import emitter from '@ohos.events.emitter';
import { VideoOperate } from '../components/VideoOperate';
import { ExitVideo } from '../components/ExitVideo';
import { timeConvert } from '../utils/TimeUtils';
import { VideoPanel } from '../components/VideoPanel';
import { GlobalContext } from '../utils/GlobalContext';
const PROPORTION = 0.99; // 占屏幕比例
const SURFACEW = 0.9; // 表面宽比例
const SURFACEH = 1.78; // 表面高比例
const TIMEOUT = 0; // 定时器编号
const SET_TIME_OUT = 8000; // 间隔8s
const SET_INTERVAL = 100; // interval间隔时间
class innerInfo {
    eventId: number = 0;
    priority: emitter.EventPriority = 0;
}
let innerEventFalse: innerInfo = {
    eventId: 1,
    priority: emitter.EventPriority.HIGH
};
let innerEventTrue: innerInfo = {
    eventId: 2,
    priority: emitter.EventPriority.HIGH
};
let innerEventWH: innerInfo = {
    eventId: 3,
    priority: emitter.EventPriority.HIGH
};
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.surfaceId = '';
        this.timeout = 0;
        this.xComponentController = new XComponentController();
        this.__avPlayManage = new ObservedPropertyObject(new avPlayManage(), this, "avPlayManage");
        this.__isSwiping = new ObservedPropertySimple(false, this, "isSwiping");
        this.__isClickScreen = new ObservedPropertySimple(false, this, "isClickScreen");
        this.__flag = new ObservedPropertySimple(true, this, "flag");
        this.__XComponentFlag = new ObservedPropertySimple(false, this, "XComponentFlag");
        this.__speedSelect = new ObservedPropertySimple(0, this, "speedSelect");
        this.__videoListSelect = new ObservedPropertySimple(0, this, "videoListSelect");
        this.__durationTime = new ObservedPropertySimple(0, this, "durationTime");
        this.__currentTime = new ObservedPropertySimple(0, this, "currentTime");
        this.__surfaceW = new ObservedPropertySimple(0, this, "surfaceW");
        this.__surfaceH = new ObservedPropertySimple(0, this, "surfaceH");
        this.__show = new ObservedPropertySimple(false, this, "show");
        this.__videoSelect = new ObservedPropertySimple(0, this, "videoSelect");
        this.__percent = new ObservedPropertySimple(0, this, "percent");
        this.__windowWidth = new ObservedPropertySimple(300, this, "windowWidth");
        this.__windowHeight = new ObservedPropertySimple(300, this, "windowHeight");
        this.__videoName = AppStorage.SetAndLink('videoName', $r('app.string.video_res_1'), this, "videoName");
        this.__videoIndex = AppStorage.SetAndLink('videoIndex', 0, this, "videoIndex");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.surfaceId !== undefined) {
            this.surfaceId = params.surfaceId;
        }
        if (params.timeout !== undefined) {
            this.timeout = params.timeout;
        }
        if (params.xComponentController !== undefined) {
            this.xComponentController = params.xComponentController;
        }
        if (params.avPlayManage !== undefined) {
            this.avPlayManage = params.avPlayManage;
        }
        if (params.isSwiping !== undefined) {
            this.isSwiping = params.isSwiping;
        }
        if (params.isClickScreen !== undefined) {
            this.isClickScreen = params.isClickScreen;
        }
        if (params.flag !== undefined) {
            this.flag = params.flag;
        }
        if (params.XComponentFlag !== undefined) {
            this.XComponentFlag = params.XComponentFlag;
        }
        if (params.speedSelect !== undefined) {
            this.speedSelect = params.speedSelect;
        }
        if (params.videoListSelect !== undefined) {
            this.videoListSelect = params.videoListSelect;
        }
        if (params.durationTime !== undefined) {
            this.durationTime = params.durationTime;
        }
        if (params.currentTime !== undefined) {
            this.currentTime = params.currentTime;
        }
        if (params.surfaceW !== undefined) {
            this.surfaceW = params.surfaceW;
        }
        if (params.surfaceH !== undefined) {
            this.surfaceH = params.surfaceH;
        }
        if (params.show !== undefined) {
            this.show = params.show;
        }
        if (params.videoSelect !== undefined) {
            this.videoSelect = params.videoSelect;
        }
        if (params.percent !== undefined) {
            this.percent = params.percent;
        }
        if (params.windowWidth !== undefined) {
            this.windowWidth = params.windowWidth;
        }
        if (params.windowHeight !== undefined) {
            this.windowHeight = params.windowHeight;
        }
    }
    aboutToBeDeleted() {
        this.__avPlayManage.aboutToBeDeleted();
        this.__isSwiping.aboutToBeDeleted();
        this.__isClickScreen.aboutToBeDeleted();
        this.__flag.aboutToBeDeleted();
        this.__XComponentFlag.aboutToBeDeleted();
        this.__speedSelect.aboutToBeDeleted();
        this.__videoListSelect.aboutToBeDeleted();
        this.__durationTime.aboutToBeDeleted();
        this.__currentTime.aboutToBeDeleted();
        this.__surfaceW.aboutToBeDeleted();
        this.__surfaceH.aboutToBeDeleted();
        this.__show.aboutToBeDeleted();
        this.__videoSelect.aboutToBeDeleted();
        this.__percent.aboutToBeDeleted();
        this.__windowWidth.aboutToBeDeleted();
        this.__windowHeight.aboutToBeDeleted();
        this.__videoName.aboutToBeDeleted();
        this.__videoIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private surfaceId: string;
    private timeout: number; // 定时器编号
    private xComponentController: XComponentController;
    private __avPlayManage: ObservedPropertyObject<avPlayManage>;
    get avPlayManage() {
        return this.__avPlayManage.get();
    }
    set avPlayManage(newValue: avPlayManage) {
        this.__avPlayManage.set(newValue);
    }
    private __isSwiping: ObservedPropertySimple<boolean>; // 用户滑动过程中
    get isSwiping() {
        return this.__isSwiping.get();
    }
    set isSwiping(newValue: boolean) {
        this.__isSwiping.set(newValue);
    }
    private __isClickScreen: ObservedPropertySimple<boolean>; // 是否点击
    get isClickScreen() {
        return this.__isClickScreen.get();
    }
    set isClickScreen(newValue: boolean) {
        this.__isClickScreen.set(newValue);
    }
    private __flag: ObservedPropertySimple<boolean>; // 暂停播放
    get flag() {
        return this.__flag.get();
    }
    set flag(newValue: boolean) {
        this.__flag.set(newValue);
    }
    private __XComponentFlag: ObservedPropertySimple<boolean>;
    get XComponentFlag() {
        return this.__XComponentFlag.get();
    }
    set XComponentFlag(newValue: boolean) {
        this.__XComponentFlag.set(newValue);
    }
    private __speedSelect: ObservedPropertySimple<number>; // 倍速选择
    get speedSelect() {
        return this.__speedSelect.get();
    }
    set speedSelect(newValue: number) {
        this.__speedSelect.set(newValue);
    }
    private __videoListSelect: ObservedPropertySimple<number>; // 视频列表选择
    get videoListSelect() {
        return this.__videoListSelect.get();
    }
    set videoListSelect(newValue: number) {
        this.__videoListSelect.set(newValue);
    }
    private __durationTime: ObservedPropertySimple<number>; // 视频总时长
    get durationTime() {
        return this.__durationTime.get();
    }
    set durationTime(newValue: number) {
        this.__durationTime.set(newValue);
    }
    private __currentTime: ObservedPropertySimple<number>; // 视频当前时间
    get currentTime() {
        return this.__currentTime.get();
    }
    set currentTime(newValue: number) {
        this.__currentTime.set(newValue);
    }
    private __surfaceW: ObservedPropertySimple<number>;
    get surfaceW() {
        return this.__surfaceW.get();
    }
    set surfaceW(newValue: number) {
        this.__surfaceW.set(newValue);
    }
    private __surfaceH: ObservedPropertySimple<number>;
    get surfaceH() {
        return this.__surfaceH.get();
    }
    set surfaceH(newValue: number) {
        this.__surfaceH.set(newValue);
    }
    private __show: ObservedPropertySimple<boolean>; // videoPanel组件是否弹出
    get show() {
        return this.__show.get();
    }
    set show(newValue: boolean) {
        this.__show.set(newValue);
    }
    private __videoSelect: ObservedPropertySimple<number>; // 视频列表选择
    get videoSelect() {
        return this.__videoSelect.get();
    }
    set videoSelect(newValue: number) {
        this.__videoSelect.set(newValue);
    }
    private __percent: ObservedPropertySimple<number>;
    get percent() {
        return this.__percent.get();
    }
    set percent(newValue: number) {
        this.__percent.set(newValue);
    }
    private __windowWidth: ObservedPropertySimple<number>;
    get windowWidth() {
        return this.__windowWidth.get();
    }
    set windowWidth(newValue: number) {
        this.__windowWidth.set(newValue);
    }
    private __windowHeight: ObservedPropertySimple<number>;
    get windowHeight() {
        return this.__windowHeight.get();
    }
    set windowHeight(newValue: number) {
        this.__windowHeight.set(newValue);
    }
    private __videoName: ObservedPropertyAbstract<Resource>;
    get videoName() {
        return this.__videoName.get();
    }
    set videoName(newValue: Resource) {
        this.__videoName.set(newValue);
    }
    private __videoIndex: ObservedPropertyAbstract<number>; // 视频索引
    get videoIndex() {
        return this.__videoIndex.get();
    }
    set videoIndex(newValue: number) {
        this.__videoIndex.set(newValue);
    }
    setTimer(): void {
        let that = this;
        this.timeout = setTimeout(() => {
            that.isClickScreen = false; // 隐藏操作面板
        }, SET_TIME_OUT); // 8秒后隐藏
    }
    clearTimer(): void {
        if (this.timeout !== TIMEOUT) {
            clearTimeout(this.timeout);
            this.timeout = TIMEOUT;
        }
    }
    aboutToAppear() {
        this.windowWidth = display.getDefaultDisplaySync().width;
        this.windowHeight = display.getDefaultDisplaySync().height;
        this.surfaceW = (GlobalContext.getContext().getObject('windowWidth') as number) * SURFACEW;
        this.surfaceH = this.surfaceW / SURFACEH;
        this.flag = true;
        AppStorage.setOrCreate('avPlayManage', this.avPlayManage);
    }
    aboutToDisappear() {
        this.avPlayManage.videoRelease();
        emitter.off(innerEventFalse.eventId);
    }
    onPageHide() {
        this.avPlayManage.videoPause();
        this.flag = false;
    }
    onPageShow() {
        emitter.on(innerEventTrue, (res) => {
            if (res.data) {
                this.flag = res.data.flag;
                this.XComponentFlag = res.data.flag;
            }
        });
        emitter.on(innerEventFalse, (res) => {
            if (res.data) {
                this.flag = res.data.flag;
            }
        });
        emitter.on(innerEventWH, (res) => {
            if (res.data) {
                this.windowWidth = res.data.width;
                this.windowHeight = res.data.height;
                this.setVideoWH();
            }
        });
        if (this.flag == false) {
            this.clearTimer();
        }
    }
    setVideoWH(): void {
        if (this.percent >= 1) { // 横向视频
            this.surfaceW = Math.round(this.windowWidth * PROPORTION);
            this.surfaceH = Math.round(this.surfaceW / this.percent);
        }
        else { // 纵向视频
            this.surfaceH = Math.round(this.windowHeight * PROPORTION);
            this.surfaceW = Math.round(this.surfaceH * this.percent);
        }
    }
    CoverXComponent(parent = null) {
        XComponent.create({
            id: 'xComponent',
            type: 'surface',
            controller: this.xComponentController
        });
        XComponent.visibility(this.XComponentFlag ? Visibility.Visible : Visibility.Hidden);
        XComponent.onLoad(() => {
            this.surfaceId = this.xComponentController.getXComponentSurfaceId();
            this.avPlayManage.initPlayer(this.surfaceId, (avPlayer: media.AVPlayer) => {
                this.percent = avPlayer.width / avPlayer.height;
                this.setVideoWH();
                this.durationTime = this.avPlayManage.getDurationTime();
                setInterval(() => {
                    if (!this.isSwiping) {
                        this.currentTime = this.avPlayManage.getCurrentTime();
                    }
                }, SET_INTERVAL);
            });
        });
        XComponent.height(`${this.surfaceH}px`);
        XComponent.width(`${this.surfaceW}px`);
    }
    render() {
        Stack.create();
        Stack.onClick(() => {
            this.isClickScreen = !this.isClickScreen;
            if (this.isClickScreen) {
                this.setTimer();
            }
            else {
                this.clearTimer();
            }
        });
        Stack.backgroundColor(Color.Black);
        Stack.height('100%');
        Stack.width('100%');
        Column.create();
        Column.align(Alignment.TopStart);
        Column.margin({ top: $r('app.float.size_80') });
        Column.id('Video');
        Column.justifyContent(FlexAlign.Center);
        this.CoverXComponent(this);
        Column.pop();
        Text.create();
        Text.height(`${this.surfaceH}px`);
        Text.width(`${this.surfaceW}px`);
        Text.margin({ top: $r('app.float.size_80') });
        Text.backgroundColor(Color.Black);
        Text.opacity($r('app.float.size_zero_five'));
        Text.visibility(this.isSwiping ? Visibility.Visible : Visibility.Hidden);
        Text.pop();
        __Common__.create();
        __Common__.zIndex(3);
        let earlierCreatedChild_2: VideoPanel = (this && this.findChildById) ? this.findChildById("2") as VideoPanel : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new VideoPanel("2", this, { show: this.__show, videoSelect: this.__videoSelect }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        __Common__.pop();
        Row.create();
        Row.margin({ top: $r('app.float.size_80') });
        Row.visibility(this.isSwiping ? Visibility.Visible : Visibility.Hidden);
        Text.create(timeConvert(this.currentTime));
        Text.fontSize($r('app.float.size_24'));
        Text.opacity($r('app.float.size_1'));
        Text.fontColor($r("app.color.slider_selected"));
        Text.pop();
        Text.create("/" + timeConvert(this.durationTime));
        Text.fontSize($r('app.float.size_24'));
        Text.opacity($r('app.float.size_1'));
        Text.fontColor(Color.White);
        Text.pop();
        Row.pop();
        Column.create();
        Column.onTouch((event) => {
            if (event.type == TouchType.Down) {
                this.isClickScreen = true;
                this.clearTimer();
            }
            else if (event.type == TouchType.Up) {
                this.setTimer();
            }
            else if (event.type == TouchType.Move) {
                this.isClickScreen = true;
                this.clearTimer();
            }
        });
        Column.visibility(this.isClickScreen ? Visibility.Visible : Visibility.Hidden);
        Column.width('100%');
        Column.height('100%');
        Row.create();
        Row.width('100%');
        Row.justifyContent(FlexAlign.Start);
        let earlierCreatedChild_3: ExitVideo = (this && this.findChildById) ? this.findChildById("3") as ExitVideo : undefined;
        if (earlierCreatedChild_3 == undefined) {
            // 返回
            View.create(new ExitVideo("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        Row.pop();
        Blank.create();
        Blank.pop();
        Column.create();
        Column.justifyContent(FlexAlign.Center);
        __Common__.create();
        __Common__.width('100%');
        let earlierCreatedChild_4: VideoOperate = (this && this.findChildById) ? this.findChildById("4") as VideoOperate : undefined;
        if (earlierCreatedChild_4 == undefined) {
            // 进度条
            View.create(new VideoOperate("4", this, {
                flag: this.__flag,
                avPlayManage: this.__avPlayManage,
                currentTime: this.__currentTime,
                durationTime: this.__durationTime,
                isSwiping: this.__isSwiping,
                XComponentFlag: this.__XComponentFlag
            }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({});
            View.create(earlierCreatedChild_4);
        }
        __Common__.pop();
        Row.create();
        Row.id('Choose');
        Row.margin({ top: $r('app.float.size_10') });
        Row.width('100%');
        Row.height($r('app.float.size_50'));
        Row.backgroundColor($r('app.color.video_play'));
        Row.borderRadius({ topLeft: $r('app.float.size_45'), topRight: $r('app.float.size_45') });
        Row.alignItems(VerticalAlign.Center);
        Row.onClick(() => {
            this.show = !this.show;
            this.videoSelect = this.videoIndex;
        });
        Image.create($r('app.media.ic_video_view_list'));
        Image.width($r('app.float.size_32'));
        Image.height($r('app.float.size_32'));
        Image.margin({ left: $r('app.float.size_30') });
        Text.create(this.videoName);
        Text.fontSize($r('app.float.size_20'));
        Text.fontColor(Color.White);
        Text.fontWeight(FontWeight.Regular);
        Text.margin({ left: $r('app.float.size_10') });
        Text.pop();
        Blank.create();
        Blank.pop();
        Column.create();
        Column.margin({ right: $r('app.float.size_25') });
        Image.create($r('app.media.ic_video_list_up'));
        Image.width($r('app.float.size_30'));
        Image.height($r('app.float.size_20'));
        Column.pop();
        Row.pop();
        Column.pop();
        Column.pop();
        Stack.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
