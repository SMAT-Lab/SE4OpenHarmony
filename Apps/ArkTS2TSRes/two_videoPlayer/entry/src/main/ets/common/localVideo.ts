interface localVideo_Params {
    src?: Resource;
    videoIndex?: number;
    SpeedIndex?: number;
    title?: string;
    currentProgressRate?: number;
    autoPlays?: boolean;
    controls?: number;
    isFullScreen?: boolean;
    isPlay?: boolean;
    inVerticalSetValue?: number;
    currentTime?: number;
    duration?: number;
    currentSpeed?: string;
    intervalID?: number;
    keyDownTimes?: number;
    startx?: number;
    starty?: number;
    endx?: number;
    endy?: number;
    //定时器的id
    timeoutID?: number;
    // 设备管理对象
    controller?: VideoController;
    scroller?: Scroller;
    isKeyboardDelegate?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "localVideo_" + ++__generate__Id;
}
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
import prompt from '@ohos.prompt';
import deviceManager from '@ohos.distributedHardware.deviceManager';
import featureAbility from '@ohos.ability.featureAbility';
import window from '@ohos.window';
import { KeyCode } from '@ohos.multimodalInput.keyCode';
import hilog from '@ohos.hilog';
import abilityAccessCtrl from '@ohos.abilityAccessCtrl';
export class localVideo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.src = $r('app.media.EP11');
        this.__videoIndex = new ObservedPropertySimple(0, this, "videoIndex");
        this.__SpeedIndex = new ObservedPropertySimple(1, this, "SpeedIndex");
        this.__title = new ObservedPropertySimple("本地视频", this, "title");
        this.__currentProgressRate = new ObservedPropertySimple(1, this, "currentProgressRate");
        this.__autoPlays = new ObservedPropertySimple(true, this, "autoPlays");
        this.__controls = new ObservedPropertySimple(0, this, "controls");
        this.__isFullScreen = new ObservedPropertySimple(false, this, "isFullScreen");
        this.__isPlay = new ObservedPropertySimple(true, this, "isPlay");
        this.__inVerticalSetValue = new ObservedPropertySimple(0
        // 当前播放进度
        , this, "inVerticalSetValue");
        this.__currentTime = new ObservedPropertySimple(0
        // 视频时长
        , this, "currentTime");
        this.__duration = new ObservedPropertySimple(0, this, "duration");
        this.__currentSpeed = new ObservedPropertySimple('1.0X', this, "currentSpeed");
        this.__intervalID = new ObservedPropertySimple(0
        //按下左右键的时长
        , this, "intervalID");
        this.__keyDownTimes = new ObservedPropertySimple(0, this, "keyDownTimes");
        this.startx = 0;
        this.starty = 0;
        this.endx = 0;
        this.endy = 0;
        this.timeoutID = 0;
        this.controller = new VideoController();
        this.scroller = new Scroller();
        this.__isKeyboardDelegate = new ObservedPropertySimple(false, this, "isKeyboardDelegate");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: localVideo_Params) {
        if (params.src !== undefined) {
            this.src = params.src;
        }
        if (params.videoIndex !== undefined) {
            this.videoIndex = params.videoIndex;
        }
        if (params.SpeedIndex !== undefined) {
            this.SpeedIndex = params.SpeedIndex;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.currentProgressRate !== undefined) {
            this.currentProgressRate = params.currentProgressRate;
        }
        if (params.autoPlays !== undefined) {
            this.autoPlays = params.autoPlays;
        }
        if (params.controls !== undefined) {
            this.controls = params.controls;
        }
        if (params.isFullScreen !== undefined) {
            this.isFullScreen = params.isFullScreen;
        }
        if (params.isPlay !== undefined) {
            this.isPlay = params.isPlay;
        }
        if (params.inVerticalSetValue !== undefined) {
            this.inVerticalSetValue = params.inVerticalSetValue;
        }
        if (params.currentTime !== undefined) {
            this.currentTime = params.currentTime;
        }
        if (params.duration !== undefined) {
            this.duration = params.duration;
        }
        if (params.currentSpeed !== undefined) {
            this.currentSpeed = params.currentSpeed;
        }
        if (params.intervalID !== undefined) {
            this.intervalID = params.intervalID;
        }
        if (params.keyDownTimes !== undefined) {
            this.keyDownTimes = params.keyDownTimes;
        }
        if (params.startx !== undefined) {
            this.startx = params.startx;
        }
        if (params.starty !== undefined) {
            this.starty = params.starty;
        }
        if (params.endx !== undefined) {
            this.endx = params.endx;
        }
        if (params.endy !== undefined) {
            this.endy = params.endy;
        }
        if (params.timeoutID !== undefined) {
            this.timeoutID = params.timeoutID;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.isKeyboardDelegate !== undefined) {
            this.isKeyboardDelegate = params.isKeyboardDelegate;
        }
    }
    aboutToBeDeleted() {
        this.__videoIndex.aboutToBeDeleted();
        this.__SpeedIndex.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
        this.__currentProgressRate.aboutToBeDeleted();
        this.__autoPlays.aboutToBeDeleted();
        this.__controls.aboutToBeDeleted();
        this.__isFullScreen.aboutToBeDeleted();
        this.__isPlay.aboutToBeDeleted();
        this.__inVerticalSetValue.aboutToBeDeleted();
        this.__currentTime.aboutToBeDeleted();
        this.__duration.aboutToBeDeleted();
        this.__currentSpeed.aboutToBeDeleted();
        this.__intervalID.aboutToBeDeleted();
        this.__keyDownTimes.aboutToBeDeleted();
        this.__isKeyboardDelegate.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private src: Resource;
    private __videoIndex: ObservedPropertySimple<number>;
    get videoIndex() {
        return this.__videoIndex.get();
    }
    set videoIndex(newValue: number) {
        this.__videoIndex.set(newValue);
    }
    private __SpeedIndex: ObservedPropertySimple<number>;
    get SpeedIndex() {
        return this.__SpeedIndex.get();
    }
    set SpeedIndex(newValue: number) {
        this.__SpeedIndex.set(newValue);
    }
    private __title: ObservedPropertySimple<string>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    // 当前视频播放速率
    private __currentProgressRate: ObservedPropertySimple<number>;
    get currentProgressRate() {
        return this.__currentProgressRate.get();
    }
    set currentProgressRate(newValue: number) {
        this.__currentProgressRate.set(newValue);
    }
    private __autoPlays: ObservedPropertySimple<boolean>;
    get autoPlays() {
        return this.__autoPlays.get();
    }
    set autoPlays(newValue: boolean) {
        this.__autoPlays.set(newValue);
    }
    // 是否显示控制栏
    private __controls: ObservedPropertySimple<number>;
    get controls() {
        return this.__controls.get();
    }
    set controls(newValue: number) {
        this.__controls.set(newValue);
    }
    private __isFullScreen: ObservedPropertySimple<boolean>;
    get isFullScreen() {
        return this.__isFullScreen.get();
    }
    set isFullScreen(newValue: boolean) {
        this.__isFullScreen.set(newValue);
    }
    // 是否正在播放
    private __isPlay: ObservedPropertySimple<boolean>;
    get isPlay() {
        return this.__isPlay.get();
    }
    set isPlay(newValue: boolean) {
        this.__isPlay.set(newValue);
    }
    // 滑动条进度
    private __inVerticalSetValue: ObservedPropertySimple<number>;
    get inVerticalSetValue() {
        return this.__inVerticalSetValue.get();
    }
    set inVerticalSetValue(newValue: number) {
        this.__inVerticalSetValue.set(newValue);
    }
    // 当前播放进度
    private __currentTime: ObservedPropertySimple<number>;
    get currentTime() {
        return this.__currentTime.get();
    }
    set currentTime(newValue: number) {
        this.__currentTime.set(newValue);
    }
    // 视频时长
    private __duration: ObservedPropertySimple<number>;
    get duration() {
        return this.__duration.get();
    }
    set duration(newValue: number) {
        this.__duration.set(newValue);
    }
    private __currentSpeed: ObservedPropertySimple<string>;
    get currentSpeed() {
        return this.__currentSpeed.get();
    }
    set currentSpeed(newValue: string) {
        this.__currentSpeed.set(newValue);
    }
    private __intervalID: ObservedPropertySimple<number>;
    get intervalID() {
        return this.__intervalID.get();
    }
    set intervalID(newValue: number) {
        this.__intervalID.set(newValue);
    }
    //按下左右键的时长
    private __keyDownTimes: ObservedPropertySimple<number>;
    get keyDownTimes() {
        return this.__keyDownTimes.get();
    }
    set keyDownTimes(newValue: number) {
        this.__keyDownTimes.set(newValue);
    }
    private startx: number;
    private starty: number;
    private endx: number;
    private endy: number;
    //定时器的id
    private timeoutID: number;
    // 设备管理对象
    private controller: VideoController;
    private scroller: Scroller;
    private __isKeyboardDelegate: ObservedPropertySimple<boolean>;
    get isKeyboardDelegate() {
        return this.__isKeyboardDelegate.get();
    }
    set isKeyboardDelegate(newValue: boolean) {
        this.__isKeyboardDelegate.set(newValue);
    }
    // aboutToAppear() {
    //   hilog.info(0xF811,"localVideoOnpageshow","localVideoOnpageshow")
    //   let context = getContext(this);
    //   let manger=abilityAccessCtrl.createAtManager()
    //   manger.requestPermissionsFromUser(context,['ohos.permission.DISTRIBUTED_DATASYNC']);
    //   console.info("======================>verifyPermissionCallback====================>");
    // }
    onInit() {
        this.SpeedIndex = 1;
        this.isPlay = true;
        this.currentTime = 0;
        this.currentSpeed = '1.0X';
        this.currentProgressRate = 1;
        this.inVerticalSetValue = 0;
        hilog.info(0xF811, "onInit", "onInit");
    }
    changeScreenmode() {
        hilog.info(0xF811, "changeScreenmode", "changeScreenmode");
        this.isFullScreen = !this.isFullScreen;
        //获取当前窗口
        let FullScreen = this.isFullScreen;
        let windowClass: window.Window;
        let context = getContext(this);
        let promise = window.getLastWindow(context);
        promise.then((data) => {
            windowClass = data;
            console.info('Succeeded in obtaining the top window. Data: ' + JSON.stringify(data));
            //设置全屏状态
            let promise = windowClass.setFullScreen(FullScreen);
            promise.then(() => {
                console.info('Succeeded in enabling the full-screen mode. ');
            }).catch((err: Error) => {
                console.error('Failed to enable the full-screen mode. Cause: ' + JSON.stringify(err));
            });
        }).catch((err: Error) => {
            console.error('Failed to obtain the top window. Cause: ' + JSON.stringify(err));
        });
    }
    setScreenKeepOn() {
        hilog.info(0xF811, "setScreenKeepOn", "setScreenKeepOn");
        //获取当前窗口
        let windowClass: window.Window;
        let context = getContext(this);
        let promise = window.getLastWindow(context);
        promise.then((data) => {
            console.info('XXXXX Succeeded in obtaining the top window. Data: ' + JSON.stringify(data));
            windowClass = data;
            //设置常亮状态
            let isKeepScreenOn = true;
            let promise = windowClass.setKeepScreenOn(isKeepScreenOn);
            console.log("XXXXX setKeepScreenOn");
            promise.then(() => {
                console.info('XXXXX Succeeded in setting the screen to be always on.');
            }).catch((err: Error) => {
                console.info('XXXXX Failed to set the screen to be always on. Cause:  ' + JSON.stringify(err));
            });
        }).catch((err: Error) => {
            console.error('XXXXX Failed to obtain the top window. Cause: ' + JSON.stringify(err));
        });
    }
    timeToString(time: number) {
        hilog.info(0xF811, "timeToString", "timeToString");
        let second = Math.floor(time % 60);
        let minute = Math.floor(time / 60);
        return minute + ':' + second;
    }
    render() {
        Stack.create({ alignContent: Alignment.Bottom });
        Video.create({
            src: this.src,
            currentProgressRate: this.currentProgressRate,
            controller: this.controller
        });
        Video.width('100%');
        Video.height('100%');
        Video.autoPlay(this.autoPlays);
        Video.controls(false);
        Video.loop(true);
        Video.focusable(false);
        Video.objectFit(ImageFit.Contain);
        Video.onStart(() => {
            hilog.info(0xF811, "Video.Onstart", "Video.Onstart");
            console.log("XXX onStart");
            this.isPlay = true;
            this.setScreenKeepOn();
            //this.setTimer()
        });
        Video.onPause(() => {
            hilog.info(0xF811, "Video.onPause", "Video.onPause");
            console.log("XXX onPause");
            this.isPlay = false;
        });
        Video.onFinish(() => {
            hilog.info(0xF811, "Video.onFinish", "Video.onFinish");
            console.log("XXX onFinish");
            // this.onInit()
            // this.controller.setCurrentTime(0, SeekMode.Accurate)
        });
        Video.onError(() => {
            hilog.info(0xF811, "Video.onError", "Video.onError");
            this.isPlay = false;
        });
        Video.onPrepared((e) => {
            hilog.info(0xF811, "Video.onPrepared", "Video.onPrepared");
            console.error('XXX onPrepared is ' + e.duration);
            this.duration = e.duration;
        });
        Video.onSeeked((e) => {
            hilog.info(0xF811, "Video.onSeeked", "Video.onSeeked");
            console.error('XXX onSeekedis ' + e.time);
            this.currentTime = e.time;
        });
        Video.onUpdate((e) => {
            hilog.info(0xF811, "Video.onUpdate", "Video.onUpdate");
            this.currentTime = e.time;
        });
        Gesture.create(GesturePriority.Low);
        TapGesture.create({ count: 1 });
        TapGesture.onAction(() => {
            if (this.controls) {
                hilog.info(0xF811, "controls0", "controls0");
                this.controls = 0;
            }
            else {
                hilog.info(0xF811, "controls1", "controls1");
                this.controls = 1;
            }
        });
        TapGesture.pop();
        Gesture.pop();
        Gesture.create(GesturePriority.Low);
        TapGesture.create({ count: 2 });
        TapGesture.onAction(() => {
            if (this.isPlay) {
                hilog.info(0xF811, "isPlaypause", "isPlaypause");
                this.isPlay = !this.isPlay;
                this.controller.pause();
            }
            else {
                hilog.info(0xF811, "isPlaystart", "isPlaystart");
                this.isPlay = !this.isPlay;
                this.controller.start();
            }
        });
        TapGesture.pop();
        Gesture.pop();
        Video.onTouch((event: TouchEvent) => {
            if (event.type === TouchType.Down) {
                hilog.info(0xF811, "TouchType.Down", "TouchType.Down");
                this.startx = event.touches[0].screenX;
                this.starty = event.touches[0].screenY;
            }
            if (event.type === TouchType.Up) {
                hilog.info(0xF811, "TouchType.Up", "TouchType.Up");
                this.endx = event.touches[0].screenX;
                this.endy = event.touches[0].screenY;
                //右滑
                if (this.endx > this.startx && Math.abs(this.endy - this.starty) < 100) {
                    hilog.info(0xF811, "videoIndex--", "videoIndex--");
                    this.videoIndex--;
                    this.onInit();
                }
                //左滑
                else if (this.endx < this.startx && Math.abs(this.endy - this.starty) < 100) {
                    hilog.info(0xF811, "videoIndex++", "videoIndex++");
                    this.videoIndex++;
                    this.onInit();
                }
            }
        });
        // 控制栏
        Column.create();
        // 控制栏
        Column.padding(10);
        // 控制栏
        Column.justifyContent(FlexAlign.Center);
        // 控制栏
        Column.width('100%');
        // 控制栏
        Column.visibility(this.controls);
        Row.create();
        Row.align(Alignment.Bottom);
        Image.create(this.isPlay ? $r('app.media.ic_public_pause') : $r('app.media.ic_public_play'));
        Image.id("Play");
        Image.width(32);
        Image.height(32);
        Image.focusable(false);
        Image.onClick(() => {
            hilog.info(0xF811, "onClickPause", "onClickPause");
            this.isPlay = !this.isPlay;
            if (this.isPlay) {
                this.controller.start();
            }
            else {
                this.controller.pause();
            }
        });
        Slider.create({
            value: this.currentTime,
            min: 0,
            max: this.duration,
            step: 1
        });
        Slider.id("Slider");
        Slider.width('54%');
        Slider.blockColor(Color.White);
        Slider.trackColor(Color.Gray);
        Slider.selectedColor(Color.White);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            hilog.info(0xF811, "Slider", "Slider");
            this.inVerticalSetValue = value;
            this.currentTime = value;
            this.controller.setCurrentTime(value, SeekMode.Accurate);
            console.error('XXXX value:' + value + 'mode:' + mode.toString());
        });
        Slider.focusable(true);
        Slider.onFocus(() => {
            hilog.info(0xF811, "SlideronFocus", "SlideronFocus");
            console.error("XXXX onFocus4");
        });
        Slider.onKeyEvent((event: KeyEvent) => {
            hilog.info(0xF811, "SlideronKeyEvent", "SlideronKeyEvent");
            event.stopPropagation();
            console.error("onKeyEvent" + event.keyText);
            if (event.type == KeyType.Up && event.keyCode === KeyCode.KEYCODE_ENTER) {
                console.error("XXXX 按下home键 4 time" + event.timestamp);
                if (this.isPlay == true)
                    this.controller.pause();
                else
                    this.controller.start();
            }
        });
        Text.create(this.timeToString(this.currentTime) + "/" + this.timeToString(this.duration));
        Text.fontColor(Color.White);
        Text.fontSize(20);
        Text.pop();
        Row.pop();
        // 控制栏
        Column.pop();
        Stack.pop();
    }
}
