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
    currentCachePercent?: number;
    xcomponentController?: XComponentController;
    videoUrl?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "IjkVideoPlayerPage_" + ++__generate__Id;
}
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
import { IjkMediaPlayer, LogUtils, OnBufferingUpdateListener, OnCompletionListener, OnErrorListener, OnInfoListener, OnPreparedListener, OnSeekCompleteListener, OnVideoSizeChangedListener } from '@ohos/ijkplayer';
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
        this.__currentCachePercent = new ObservedPropertySimple(10, this, "currentCachePercent");
        this.xcomponentController = new XComponentController();
        this.videoUrl = '';
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
        if (params.currentCachePercent !== undefined) {
            this.currentCachePercent = params.currentCachePercent;
        }
        if (params.xcomponentController !== undefined) {
            this.xcomponentController = params.xcomponentController;
        }
        if (params.videoUrl !== undefined) {
            this.videoUrl = params.videoUrl;
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
        this.__currentCachePercent.aboutToBeDeleted();
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
    private __currentCachePercent: ObservedPropertySimple<number>;
    get currentCachePercent() {
        return this.__currentCachePercent.get();
    }
    set currentCachePercent(newValue: number) {
        this.__currentCachePercent.set(newValue);
    }
    private xcomponentController: XComponentController;
    private videoUrl: string;
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
        GlobalProxyServer?.getInstance()?.setServer(server);
        let proxyUrl: string | undefined = await GlobalProxyServer?.getInstance()?.getServer()?.getProxyUrl(this.videoUrl);
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
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start });
        Text.create('当前缓存进度：');
        Text.fontSize(15);
        Text.width('15%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Progress.create({ value: 0, total: 100, type: ProgressType.Linear });
        Progress.color(Color.Red);
        Progress.backgroundColor(Color.Gray);
        Progress.value(this.currentCachePercent);
        Progress.width('65%');
        Text.create('');
        Text.fontSize(15);
        Text.width('15%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
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
    }
    private async playNext() {
        if (curIndex == videoUrls.length - 1) {
            curIndex = 0;
        }
        else {
            curIndex++;
        }
        this.currentCachePercent = 0;
        CONTROL_PlayStatus = PlayStatus.INIT;
        mIjkMediaPlayer.stop();
        mIjkMediaPlayer.reset();
        this.startProgressTask();
        this.videoUrl = videoUrls[curIndex];
        let self = this;
        class MyCacheListener implements CacheListener {
            onCacheAvailable(cacheFilePath: string, url: string, percentsAvailable: number) {
                self.currentCachePercent = percentsAvailable;
            }
        }
        GlobalProxyServer?.getInstance()?.getServer()?.registerCacheListener(new MyCacheListener(), this.videoUrl);
        let proxyUrl: string | undefined = await GlobalProxyServer?.getInstance()?.getServer()?.getProxyUrl(this.videoUrl);
        this.videoUrl = proxyUrl ? proxyUrl : this.videoUrl;
        if (this.videoUrl.startsWith(getContext().cacheDir)) {
            self.currentCachePercent = 100;
        }
        this.play(this.videoUrl);
    }
}
loadDocument(new IjkVideoPlayerPage("1", undefined, {}));
