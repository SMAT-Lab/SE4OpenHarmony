interface CustomDialogExample_Params {
    controller?: CustomDialogController;
    textValue?: string;
}
interface SimpleDemo_Params {
    cropHint?: string;
    screenHeight?: string;
    videoModel?: StandardGSYVideoModel;
    dialogController?: CustomDialogController;
    backClickListener?: () => void;
    fullClickListener?: () => void;
    videoUrl?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SimpleDemo_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { BaseVideoPlayer, GlobalContext, LogUtils, OrientationUtil, StandardGSYVideoModel, StandardGSYVideoPlayer } from '@ohos/gsyvideoplayer';
import router from '@ohos.router';
import Window from '@ohos.window';
import display from '@ohos.display';
import promptAction from '@ohos.promptAction';
import systemDateTime from '@ohos.systemDateTime';
let mDirection = 0;
let screenWidth = 0;
class SimpleDemo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__cropHint = new ObservedPropertySimple('视频裁剪中...', this, "cropHint");
        this.__screenHeight = new ObservedPropertySimple('30%', this, "screenHeight");
        this.videoModel = new StandardGSYVideoModel();
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogExample("2", this, {
                    textValue: this.__cropHint
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            autoCancel: false,
            alignment: DialogAlignment.Center,
            offset: { dx: 0, dy: 0 },
            customStyle: false
        }, this);
        this.backClickListener = () => {
            if (screenWidth < 1000 && mDirection == 1) {
                this.changeOrientation();
            }
            router.back();
        };
        this.fullClickListener = () => {
            this.changeOrientation();
        };
        this.videoUrl = "http://1251017968.vod2.myqcloud.com/3eb04eefvodtransgzp1251017968/8782b1285285890810009576163/v.f30.mp4";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SimpleDemo_Params) {
        if (params.cropHint !== undefined) {
            this.cropHint = params.cropHint;
        }
        if (params.screenHeight !== undefined) {
            this.screenHeight = params.screenHeight;
        }
        if (params.videoModel !== undefined) {
            this.videoModel = params.videoModel;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
        if (params.backClickListener !== undefined) {
            this.backClickListener = params.backClickListener;
        }
        if (params.fullClickListener !== undefined) {
            this.fullClickListener = params.fullClickListener;
        }
        if (params.videoUrl !== undefined) {
            this.videoUrl = params.videoUrl;
        }
    }
    aboutToBeDeleted() {
        this.__cropHint.aboutToBeDeleted();
        this.__screenHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __cropHint: ObservedPropertySimple<string>;
    get cropHint() {
        return this.__cropHint.get();
    }
    set cropHint(newValue: string) {
        this.__cropHint.set(newValue);
    }
    private __screenHeight: ObservedPropertySimple<string>;
    get screenHeight() {
        return this.__screenHeight.get();
    }
    set screenHeight(newValue: string) {
        this.__screenHeight.set(newValue);
    }
    private videoModel: StandardGSYVideoModel;
    private dialogController: CustomDialogController;
    private backClickListener: () => void;
    private fullClickListener: () => void;
    private videoUrl;
    render() {
        Row.create();
        Column.create();
        Column.width('100%');
        Button.createWithLabel("点击截图");
        Button.onClick(() => {
            let player = GlobalContext.getContext().getObject("currentPlayer") as BaseVideoPlayer;
            if (player) {
                this.testSetFramePerformance();
                let path = getContext(this).cacheDir + "/test.jpeg";
                player.saveFrame(path, {
                    shotResult(code: number) {
                        promptAction.showToast({
                            message: code == 0 ? "截图操作成功" : "截图操作失败"
                        });
                    }
                });
            }
        });
        Button.pop();
        Button.createWithLabel("startGif");
        Button.onClick(() => {
            let player = GlobalContext.getContext().getObject("currentPlayer") as BaseVideoPlayer;
            if (player) {
                let path = getContext(this).cacheDir + "/tempGif";
                let sStartGifTime = systemDateTime.getTime(true) / 1000;
                player.startGif(path);
                let eStartGifTime = systemDateTime.getTime(true) / 1000;
                let aStartGifTime = eStartGifTime - sStartGifTime;
                LogUtils.getInstance().LOGI('startGifTime:' + aStartGifTime + 'us');
                promptAction.showToast({
                    message: "开始gif截图"
                });
            }
        });
        Button.pop();
        Button.createWithLabel("stopGif");
        Button.onClick(() => {
            let player = GlobalContext.getContext().getObject("currentPlayer") as BaseVideoPlayer;
            if (player) {
                this.dialogController.open();
                let path = getContext(this).cacheDir + "/gifTest.gif";
                let that = this;
                let sStopGifTime = systemDateTime.getTime(true) / 1000;
                player.stopGif(path, {
                    gifResult(code: number) {
                        that.dialogController.close();
                        promptAction.showToast({
                            message: code == 0 ? "gif截图成功" : "gif截图失败"
                        });
                    }
                });
                let eStopGifTime = systemDateTime.getTime(true) / 1000;
                let aStopGifTime = eStopGifTime - sStopGifTime;
                LogUtils.getInstance().LOGI('stopGifTime:' + aStopGifTime + 'us');
            }
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
    async aboutToAppear() {
        this.testModelPerformance();
        this.videoModel.setUrl(this.videoUrl, false);
        this.videoModel.setTitle("这是测试视频的标题");
        this.videoModel.setBackClickListener(this.backClickListener);
        this.videoModel.setFullClickListener(this.fullClickListener);
        this.videoModel.setCoverImage($r('app.media.app_icon'));
        mDirection = this.getDirection();
        screenWidth = px2vp(display.getDefaultDisplaySync().width);
    }
    private testSetFramePerformance() {
        let player = GlobalContext.getContext().getObject("currentPlayer") as BaseVideoPlayer;
        if (player) {
            let path = getContext(this).cacheDir + "/test.jpeg";
            let sFrameTime = systemDateTime.getTime(true) / 1000;
            for (let i = 0; i < 10; i++) {
                player.saveFrame(path, {
                    shotResult(code: number) {
                    }
                });
            }
            let eFrameTime = systemDateTime.getTime(true) / 1000;
            let aFrameTime = (eFrameTime - sFrameTime) / 10;
            LogUtils.getInstance().LOGI('setFrameTime:' + aFrameTime + 'us');
        }
    }
    private testModelPerformance() {
        let sTime = systemDateTime.getTime(true) / 1000;
        for (let i = 0; i < 2000; i++) {
            this.videoModel.setUrl(this.videoUrl, false);
        }
        let endTime = systemDateTime.getTime(true) / 1000;
        let aTime = (endTime - sTime) / 2000;
        LogUtils.getInstance().LOGI('setUrlTime:' + aTime + 'us');
        sTime = systemDateTime.getTime(true) / 1000;
        for (let i = 0; i < 2000; i++) {
            this.videoModel.setTitle("这是测试视频的标题");
        }
        endTime = systemDateTime.getTime(true) / 1000;
        aTime = (endTime - sTime) / 2000;
        LogUtils.getInstance().LOGI('setTitleTime:' + aTime + 'us');
        sTime = systemDateTime.getTime(true) / 1000;
        for (let i = 0; i < 2000; i++) {
            this.videoModel.setBackClickListener(this.backClickListener);
        }
        endTime = systemDateTime.getTime(true) / 1000;
        aTime = (endTime - sTime) / 2000;
        LogUtils.getInstance().LOGI('setBackClickListenerTime:' + aTime + 'us');
        sTime = systemDateTime.getTime(true) / 1000;
        for (let i = 0; i < 2000; i++) {
            this.videoModel.setFullClickListener(this.fullClickListener);
        }
        endTime = systemDateTime.getTime(true) / 1000;
        aTime = (endTime - sTime) / 2000;
        LogUtils.getInstance().LOGI('setFullClickListenerTime:' + aTime + 'us');
        sTime = systemDateTime.getTime(true) / 1000;
        for (let i = 0; i < 2000; i++) {
            this.videoModel.setCoverImage($r('app.media.app_icon'));
        }
        endTime = systemDateTime.getTime(true) / 1000;
        aTime = (endTime - sTime) / 2000;
        LogUtils.getInstance().LOGI('setCoverImageTime:' + aTime + 'us');
    }
    aboutToDisappear() {
        let player = GlobalContext.getContext().getObject("currentPlayer") as BaseVideoPlayer;
        if (player) {
            let sTime = systemDateTime.getTime(true) / 1000;
            player.stop();
            let endTime = systemDateTime.getTime(true) / 1000;
            let aTime = endTime - sTime;
            LogUtils.getInstance().LOGI('stopTime:' + aTime + 'us');
        }
    }
    onPageShow() {
        let player = GlobalContext.getContext().getObject("currentPlayer") as BaseVideoPlayer;
        if (player) {
            let sTime = systemDateTime.getTime(true) / 1000;
            player.resumePlay();
            let endTime = systemDateTime.getTime(true) / 1000;
            let aTime = endTime - sTime;
            LogUtils.getInstance().LOGI('resumePlayTime:' + aTime + 'us');
        }
    }
    onPageHide() {
        let player = GlobalContext.getContext().getObject("currentPlayer") as BaseVideoPlayer;
        if (player) {
            let sTime = systemDateTime.getTime(true) / 1000;
            player.pause();
            let endTime = systemDateTime.getTime(true) / 1000;
            let aTime = endTime - sTime;
            LogUtils.getInstance().LOGI('pauseTime:' + aTime + 'us');
        }
    }
    onBackPress() {
        if (screenWidth < 1000 && mDirection == 1) {
            this.changeOrientation();
        }
        let player = GlobalContext.getContext().getObject("currentPlayer") as BaseVideoPlayer;
        if (player) {
            player.stop();
        }
    }
    private getDirection(): number {
        return getContext().getApplicationContext().resourceManager.getConfigurationSync().direction;
    }
    private changeOrientation() {
        if (screenWidth > 1000) {
            if (mDirection == 0) {
                this.screenHeight = '100%';
                mDirection = 1;
            }
            else {
                this.screenHeight = '30%';
                mDirection = 0;
            }
        }
        else {
            if (mDirection == 0) {
                OrientationUtil.changeOrientation(getContext(), Window.Orientation.LANDSCAPE_INVERTED);
                this.screenHeight = '100%';
                mDirection = 1;
            }
            else {
                OrientationUtil.changeOrientation(getContext(), Window.Orientation.PORTRAIT);
                this.screenHeight = '30%';
                mDirection = 0;
            }
        }
    }
}
class CustomDialogExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = undefined;
        this.__textValue = new SynchedPropertySimpleTwoWay(params.textValue, this, "textValue");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomDialogExample_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__textValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private __textValue: SynchedPropertySimpleTwoWay<string>;
    get textValue() {
        return this.__textValue.get();
    }
    set textValue(newValue: string) {
        this.__textValue.set(newValue);
    }
    render() {
        Stack.create();
        Stack.width(200);
        Stack.height(200);
        Column.create();
        LoadingProgress.create();
        LoadingProgress.color(Color.Blue);
        LoadingProgress.width(100);
        Column.pop();
        Stack.pop();
    }
}
loadDocument(new SimpleDemo("1", undefined, {}));
