interface IjkVideoPlayerPage_Params {
    progressValue?: number;
    currentTime?: string;
    totalTime?: string;
    loadingVisible?: Visibility;
    replayVisible?: Visibility;
    slideEnable?: boolean;
    aspRatio?: number;
    mContext?: object | undefined;
    mFirst?: boolean;
    mDestroyPage?: boolean;
    playSpeed?: string;
    oldSeconds?: number;
    isSeekTo?: boolean;
    isCurrentTime?: boolean;
    videoUrl?: string;
    xcomponentController?: XComponentController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "IjkVideoPlayerPage_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import router from '@ohos.router';
import { IjkMediaPlayer } from "@ohos/ijkplayer";
import { OnPreparedListener } from "@ohos/ijkplayer";
import { OnVideoSizeChangedListener } from "@ohos/ijkplayer";
import { OnCompletionListener } from "@ohos/ijkplayer";
import { OnBufferingUpdateListener } from "@ohos/ijkplayer";
import { OnErrorListener, OnTimedTextListener } from "@ohos/ijkplayer";
import { OnInfoListener } from "@ohos/ijkplayer";
import { OnSeekCompleteListener } from "@ohos/ijkplayer";
import { LogUtils } from "@ohos/ijkplayer";
import { PlayStatus } from "../common/PlayStatus";
import prompt from '@ohos.promptAction';
import { RouterParam } from "./RouterParam";
let CONTROL_PlayStatus = PlayStatus.INIT;
let PROGRESS_MAX_VALUE: number = 100;
let mIjkMediaPlayer = IjkMediaPlayer.getInstance();
let updateProgressTimer: number = 0;
let videoUrls: string[] = ["http://devimages.apple.com.edgekey.net/streaming/examples/bipbop_4x3/bipbop_4x3_variant.m3u8",
    "http://devimages.apple.com.edgekey.net/streaming/examples/bipbop_4x3/bipbop_4x3_variant.m3u8"
];
let curIndex: number = 0;
class IjkVideoPlayerPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__progressValue = new ObservedPropertySimple(0, this, "progressValue");
        this.__currentTime = new ObservedPropertySimple("00:00", this, "currentTime");
        this.__totalTime = new ObservedPropertySimple("00:00", this, "totalTime");
        this.__loadingVisible = new ObservedPropertySimple(Visibility.None, this, "loadingVisible");
        this.__replayVisible = new ObservedPropertySimple(Visibility.None, this, "replayVisible");
        this.__slideEnable = new ObservedPropertySimple(false, this, "slideEnable");
        this.__aspRatio = new ObservedPropertySimple(0.5, this, "aspRatio");
        this.__mContext = new ObservedPropertyObject(undefined, this, "mContext");
        this.__mFirst = new ObservedPropertySimple(true, this, "mFirst");
        this.__mDestroyPage = new ObservedPropertySimple(false, this, "mDestroyPage");
        this.__playSpeed = new ObservedPropertySimple('1f', this, "playSpeed");
        this.__oldSeconds = new ObservedPropertySimple(0, this, "oldSeconds");
        this.__isSeekTo = new ObservedPropertySimple(false, this, "isSeekTo");
        this.__isCurrentTime = new ObservedPropertySimple(false, this, "isCurrentTime");
        this.videoUrl = '';
        this.xcomponentController = new XComponentController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: IjkVideoPlayerPage_Params) {
        if (params.progressValue !== undefined) {
            this.progressValue = params.progressValue;
        }
        if (params.currentTime !== undefined) {
            this.currentTime = params.currentTime;
        }
        if (params.totalTime !== undefined) {
            this.totalTime = params.totalTime;
        }
        if (params.loadingVisible !== undefined) {
            this.loadingVisible = params.loadingVisible;
        }
        if (params.replayVisible !== undefined) {
            this.replayVisible = params.replayVisible;
        }
        if (params.slideEnable !== undefined) {
            this.slideEnable = params.slideEnable;
        }
        if (params.aspRatio !== undefined) {
            this.aspRatio = params.aspRatio;
        }
        if (params.mContext !== undefined) {
            this.mContext = params.mContext;
        }
        if (params.mFirst !== undefined) {
            this.mFirst = params.mFirst;
        }
        if (params.mDestroyPage !== undefined) {
            this.mDestroyPage = params.mDestroyPage;
        }
        if (params.playSpeed !== undefined) {
            this.playSpeed = params.playSpeed;
        }
        if (params.oldSeconds !== undefined) {
            this.oldSeconds = params.oldSeconds;
        }
        if (params.isSeekTo !== undefined) {
            this.isSeekTo = params.isSeekTo;
        }
        if (params.isCurrentTime !== undefined) {
            this.isCurrentTime = params.isCurrentTime;
        }
        if (params.videoUrl !== undefined) {
            this.videoUrl = params.videoUrl;
        }
        if (params.xcomponentController !== undefined) {
            this.xcomponentController = params.xcomponentController;
        }
    }
    aboutToBeDeleted() {
        this.__progressValue.aboutToBeDeleted();
        this.__currentTime.aboutToBeDeleted();
        this.__totalTime.aboutToBeDeleted();
        this.__loadingVisible.aboutToBeDeleted();
        this.__replayVisible.aboutToBeDeleted();
        this.__slideEnable.aboutToBeDeleted();
        this.__aspRatio.aboutToBeDeleted();
        this.__mContext.aboutToBeDeleted();
        this.__mFirst.aboutToBeDeleted();
        this.__mDestroyPage.aboutToBeDeleted();
        this.__playSpeed.aboutToBeDeleted();
        this.__oldSeconds.aboutToBeDeleted();
        this.__isSeekTo.aboutToBeDeleted();
        this.__isCurrentTime.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __progressValue: ObservedPropertySimple<number>;
    get progressValue() {
        return this.__progressValue.get();
    }
    set progressValue(newValue: number) {
        this.__progressValue.set(newValue);
    }
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
    private __loadingVisible: ObservedPropertySimple<Visibility>;
    get loadingVisible() {
        return this.__loadingVisible.get();
    }
    set loadingVisible(newValue: Visibility) {
        this.__loadingVisible.set(newValue);
    }
    private __replayVisible: ObservedPropertySimple<Visibility>;
    get replayVisible() {
        return this.__replayVisible.get();
    }
    set replayVisible(newValue: Visibility) {
        this.__replayVisible.set(newValue);
    }
    private __slideEnable: ObservedPropertySimple<boolean>;
    get slideEnable() {
        return this.__slideEnable.get();
    }
    set slideEnable(newValue: boolean) {
        this.__slideEnable.set(newValue);
    }
    private __aspRatio: ObservedPropertySimple<number>;
    get aspRatio() {
        return this.__aspRatio.get();
    }
    set aspRatio(newValue: number) {
        this.__aspRatio.set(newValue);
    }
    private __mContext: ObservedPropertyObject<object | undefined>;
    get mContext() {
        return this.__mContext.get();
    }
    set mContext(newValue: object | undefined) {
        this.__mContext.set(newValue);
    }
    private __mFirst: ObservedPropertySimple<boolean>;
    get mFirst() {
        return this.__mFirst.get();
    }
    set mFirst(newValue: boolean) {
        this.__mFirst.set(newValue);
    }
    private __mDestroyPage: ObservedPropertySimple<boolean>;
    get mDestroyPage() {
        return this.__mDestroyPage.get();
    }
    set mDestroyPage(newValue: boolean) {
        this.__mDestroyPage.set(newValue);
    }
    private __playSpeed: ObservedPropertySimple<string>;
    get playSpeed() {
        return this.__playSpeed.get();
    }
    set playSpeed(newValue: string) {
        this.__playSpeed.set(newValue);
    }
    private __oldSeconds: ObservedPropertySimple<number>;
    get oldSeconds() {
        return this.__oldSeconds.get();
    }
    set oldSeconds(newValue: number) {
        this.__oldSeconds.set(newValue);
    }
    private __isSeekTo: ObservedPropertySimple<boolean>;
    get isSeekTo() {
        return this.__isSeekTo.get();
    }
    set isSeekTo(newValue: boolean) {
        this.__isSeekTo.set(newValue);
    }
    private __isCurrentTime: ObservedPropertySimple<boolean>;
    get isCurrentTime() {
        return this.__isCurrentTime.get();
    }
    set isCurrentTime(newValue: boolean) {
        this.__isCurrentTime.set(newValue);
    }
    private videoUrl: string;
    aboutToAppear() {
        LogUtils.getInstance().LOGI("aboutToAppear");
        this.videoUrl = (router.getParams() as RouterParam).videoUrl;
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
    private xcomponentController: XComponentController;
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Auto, justifyContent: FlexAlign.Start });
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.height('100px');
        Flex.width('100%');
        Flex.backgroundColor(Color.Black);
        Text.create("ijkplayer播放器");
        Text.fontSize('30px');
        Text.fontColor(Color.White);
        Text.margin('10px');
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Flex.pop();
        Divider.create();
        Divider.vertical(false);
        Divider.strokeWidth('20px');
        Divider.color(Color.White);
        Divider.lineCap(LineCapStyle.Round);
        Stack.create({ alignContent: Alignment.Center });
        Stack.width('100%');
        Stack.height('700px');
        Stack.backgroundColor('#000000');
        Stack.clip(true);
        XComponent.create({
            id: 'xcomponentId',
            type: 'surface',
            libraryname: 'ijkplayer_napi'
        });
        XComponent.onLoad((event?: object) => {
            if (!!event) {
                this.initDelayPlay(event);
            }
        });
        XComponent.onDestroy(() => {
        });
        XComponent.width('100%');
        Image.create($r('app.media.icon_replay'));
        Image.objectFit(ImageFit.Auto);
        Image.width('120px');
        Image.height('120px');
        Image.visibility(this.replayVisible);
        Image.border({ width: 0 });
        Image.borderStyle(BorderStyle.Dashed);
        Image.onClick(() => {
            this.startPlayOrResumePlay();
        });
        Image.create($r('app.media.icon_load'));
        Image.objectFit(ImageFit.Auto);
        Image.width('120px');
        Image.height('120px');
        Image.visibility(this.loadingVisible);
        Image.border({ width: 0 });
        Image.borderStyle(BorderStyle.Dashed);
        Stack.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start });
        Text.create(this.currentTime);
        Text.width('100px');
        Text.fontSize('20px');
        Text.margin('20px');
        Text.pop();
        Slider.create({
            value: this.progressValue,
            min: 0,
            max: PROGRESS_MAX_VALUE,
            step: 1,
            style: SliderStyle.OutSet
        });
        Slider.width('600px');
        Slider.blockColor(Color.Blue);
        Slider.trackColor(Color.Gray);
        Slider.selectedColor(Color.Blue);
        Slider.showSteps(true);
        Slider.showTips(true);
        Slider.enabled(this.slideEnable);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            if (mode == 2) {
                this.isSeekTo = true;
                this.mDestroyPage = false;
                this.showLoadIng();
                LogUtils.getInstance().LOGI("slider-->seekValue start:" + value);
                let seekValue = value * (mIjkMediaPlayer.getDuration() / 100);
                this.seekTo(seekValue + "");
                this.setProgress();
                LogUtils.getInstance().LOGI("slider-->seekValue end:" + seekValue);
                this.isSeekTo = false;
            }
        });
        Text.create(this.totalTime);
        Text.width('100px');
        Text.fontSize('20px');
        Text.margin('10px');
        Text.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start });
        Button.createWithLabel('播放');
        Button.onClick(() => {
            this.startPlayOrResumePlay();
        });
        Button.width('400px');
        Button.height('80px');
        Button.margin('15px');
        Button.pop();
        Button.createWithLabel('暂停');
        Button.onClick(() => {
            this.pause();
        });
        Button.width('400px');
        Button.height('80px');
        Button.margin('15px');
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start });
        Button.createWithLabel('停止');
        Button.onClick(() => {
            this.stop();
        });
        Button.width('400px');
        Button.height('80px');
        Button.margin('15px');
        Button.pop();
        Button.createWithLabel('切换');
        Button.onClick(() => {
            this.playNext();
        });
        Button.width('400px');
        Button.height('80px');
        Button.margin('15px');
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start });
        Button.createWithLabel('1.5倍速');
        Button.onClick(() => {
            this.playSpeed = '1.5f';
            this.stop();
            this.startPlayOrResumePlay();
        });
        Button.width('400px');
        Button.height('80px');
        Button.margin('15px');
        Button.pop();
        Button.createWithLabel('2 倍速');
        Button.onClick(() => {
            this.playSpeed = '2f';
            this.stop();
            this.startPlayOrResumePlay();
        });
        Button.width('400px');
        Button.height('80px');
        Button.margin('15px');
        Button.pop();
        Flex.pop();
        Flex.pop();
    }
    private initDelayPlay(context: object) {
        this.mContext = context;
        let that = this;
        setTimeout(() => {
            that.startPlayOrResumePlay();
            that.mFirst = false;
        }, 300);
    }
    private startPlayOrResumePlay() {
        this.mDestroyPage = false;
        LogUtils.getInstance().LOGI("startPlayOrResumePlay start CONTROL_PlayStatus:" + CONTROL_PlayStatus);
        if (CONTROL_PlayStatus == PlayStatus.INIT) {
            this.stopProgressTask();
            this.startProgressTask();
            this.play(this.videoUrl.toString());
        }
        if (CONTROL_PlayStatus == PlayStatus.PAUSE) {
            mIjkMediaPlayer.start();
            this.setProgress();
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
        let newSeconds: number | string = totalSeconds % 60;
        let minutes: number | string = (totalSeconds / 60) % 60;
        let hours: number | string = totalSeconds / 3600;
        LogUtils.getInstance().LOGI("stringForTime hours:" + hours + ",minutes:" + minutes + ",seconds:" + newSeconds);
        hours = this.completionNum(Math.floor(Math.floor(hours * 100) / 100));
        minutes = this.completionNum(Math.floor(Math.floor(minutes * 100) / 100));
        newSeconds = Math.floor(Math.floor(newSeconds * 100) / 100);
        if (this.isCurrentTime) {
            if (this.oldSeconds < newSeconds || newSeconds === 0 || this.isSeekTo) {
                this.oldSeconds = newSeconds;
            }
            else {
                newSeconds = this.oldSeconds;
            }
        }
        newSeconds = this.completionNum(newSeconds);
        if (hours > 0) {
            return hours + ":" + minutes + ":" + newSeconds;
        }
        else {
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
        this.isCurrentTime = false;
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
        //设置视频源http请求头
        let headers = new Map([
            ["user_agent", "Mozilla/5.0 BiliDroid/7.30.0 (bbcallen@gmail.com)"],
            ["referer", "https://www.bilibili.com"]
        ]);
        mIjkMediaPlayer.setDataSourceHeader(headers);
        //使用精确寻帧 例如，拖动播放后，会寻找最近的关键帧进行播放，很有可能关键帧的位置不是拖动后的位置，而是较前的位置.可以设置这个参数来解决问题
        mIjkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER, "enable-accurate-seek", "1");
        //预读数据的缓冲区大小
        mIjkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER, "max-buffer-size", "102400");
        //停止预读的最小帧数
        mIjkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER, "min-frames", "100");
        //启动预加载
        mIjkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER, "start-on-prepared", "1");
        // 设置无缓冲，这是播放器的缓冲区，有数据就播放
        mIjkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER, "packet-buffering", "0");
        //跳帧处理,放CPU处理较慢时，进行跳帧处理，保证播放流程，画面和声音同步
        mIjkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER, "framedrop", "5");
        // 最大缓冲cache是3s， 有时候网络波动，会突然在短时间内收到好几秒的数据
        // 因此需要播放器丢包，才不会累积延时
        // 这个和第三个参数packet-buffering无关。
        mIjkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER, "max_cached_duration", "3000");
        // 无限制收流
        mIjkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER, "infbuf", "1");
        mIjkMediaPlayer.setOptionLong(IjkMediaPlayer.OPT_CATEGORY_PLAYER, "infbuf", "1");
        // 屏幕常亮
        mIjkMediaPlayer.setScreenOnWhilePlaying(true);
        // 设置超时
        mIjkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_FORMAT, "timeout", "10000000");
        mIjkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_FORMAT, "connect_timeout", "10000000");
        mIjkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_FORMAT, "addrinfo_timeout", "10000000");
        mIjkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_FORMAT, "dns_cache_timeout", "10000000");
        // 设置音量
        // mIjkMediaPlayer.setVolume("0.5", "0.5");
        // 变速播放
        mIjkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER, "soundtouch", "1");
        mIjkMediaPlayer.setSpeed(this.playSpeed);
        let Speed = mIjkMediaPlayer.getSpeed();
        LogUtils.getInstance().LOGI('getSpeed--' + Speed);
        //是否开启循环播放
        mIjkMediaPlayer.setLoopCount(true);
        let mOnVideoSizeChangedListener: OnVideoSizeChangedListener = {
            onVideoSizeChanged: (width: number, height: number, sar_num: number, sar_den: number) => {
                that.aspRatio = width / height;
                LogUtils.getInstance()
                    .LOGI("setOnVideoSizeChangedListener-->go:" + width + "," + height + "," + sar_num + "," + sar_den);
                that.hideLoadIng();
            }
        };
        mIjkMediaPlayer.setOnVideoSizeChangedListener(mOnVideoSizeChangedListener);
        let mOnPreparedListener: OnPreparedListener = {
            onPrepared: () => {
                LogUtils.getInstance().LOGI("setOnPreparedListener-->go");
            }
        };
        mIjkMediaPlayer.setOnPreparedListener(mOnPreparedListener);
        let mOnTimedTextListener: OnTimedTextListener = {
            onTimedText: () => {
            }
        };
        mIjkMediaPlayer.setOnTimedTextListener(mOnTimedTextListener);
        let mOnCompletionListener: OnCompletionListener = {
            onCompletion: () => {
                LogUtils.getInstance().LOGI("OnCompletionListener-->go");
                that.showRePlay();
                that.currentTime = that.stringForTime(mIjkMediaPlayer.getDuration());
                that.progressValue = PROGRESS_MAX_VALUE;
                that.slideEnable = false;
                that.stop();
            }
        };
        mIjkMediaPlayer.setOnCompletionListener(mOnCompletionListener);
        let mOnBufferingUpdateListener: OnBufferingUpdateListener = {
            onBufferingUpdate: (percent: number) => {
                LogUtils.getInstance().LOGI("OnBufferingUpdateListener-->go:" + percent);
                let MediaInfo = mIjkMediaPlayer.getMediaInfo();
                LogUtils.getInstance().LOGI('getMediaInfo---' + MediaInfo);
                let VideoWidth = mIjkMediaPlayer.getVideoWidth();
                LogUtils.getInstance().LOGI('getVideoWidth---' + VideoWidth);
                let VideoHeight = mIjkMediaPlayer.getVideoHeight();
                LogUtils.getInstance().LOGI('getVideoHeight---' + VideoHeight);
                let VideoSarNum = mIjkMediaPlayer.getVideoSarNum();
                LogUtils.getInstance().LOGI('getVideoSarNum---' + VideoSarNum);
                let VideoSarDen = mIjkMediaPlayer.getVideoSarDen();
                LogUtils.getInstance().LOGI('getVideoSarDen---' + VideoSarDen);
                let AudioSessionId = mIjkMediaPlayer.getAudioSessionId();
                LogUtils.getInstance().LOGI('getAudioSessionId---' + AudioSessionId);
                let Looping = mIjkMediaPlayer.isLooping();
                LogUtils.getInstance().LOGI('isLooping---' + Looping);
            }
        };
        mIjkMediaPlayer.setOnBufferingUpdateListener(mOnBufferingUpdateListener);
        let mOnSeekCompleteListener: OnSeekCompleteListener = {
            onSeekComplete: () => {
                LogUtils.getInstance().LOGI("OnSeekCompleteListener-->go");
                that.startPlayOrResumePlay();
            }
        };
        mIjkMediaPlayer.setOnSeekCompleteListener(mOnSeekCompleteListener);
        let mOnInfoListener: OnInfoListener = {
            onInfo: (what: number, extra: number) => {
                LogUtils.getInstance().LOGI("OnInfoListener-->go:" + what + "===" + extra);
                that.hideLoadIng();
            }
        };
        mIjkMediaPlayer.setOnInfoListener(mOnInfoListener);
        let mOnErrorListener: OnErrorListener = {
            onError: (what: number, extra: number) => {
                this.stopProgressTask();
                LogUtils.getInstance().LOGI("OnErrorListener-->go:" + what + "===" + extra);
                that.hideLoadIng();
                prompt.showToast({
                    message: "亲，视频播放异常，系统开小差咯"
                });
            }
        };
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
        mIjkMediaPlayer.selectTrack(value);
        mIjkMediaPlayer.deselectTrack(value);
    }
    private playNext() {
        if (curIndex == videoUrls.length - 1) {
            curIndex = 0;
        }
        else {
            curIndex++;
        }
        CONTROL_PlayStatus = PlayStatus.INIT;
        mIjkMediaPlayer.stop();
        mIjkMediaPlayer.reset();
        this.startProgressTask();
        this.videoUrl = videoUrls[curIndex];
        this.play(this.videoUrl);
    }
}
loadDocument(new IjkVideoPlayerPage("1", undefined, {}));
