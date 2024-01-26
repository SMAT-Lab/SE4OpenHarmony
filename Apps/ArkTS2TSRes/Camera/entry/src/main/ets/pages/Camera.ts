interface CameraPage_Params {
    mXComponentController?: XComponentController;
    surfaceId?: string;
    cameraIcon?: Resource;
    cameraModel?: CameraModel;
    imageThumbnail?: string;
    videoThumbnail?: Resource | undefined;
    currentModel?: number;
    isRecording?: boolean;
    textMove?: number;
    isPointShow?: boolean;
    isTitleShow?: boolean;
    rotation?: number;
    resolution?: number;
    timeShow?: boolean;
    textTimerController?: TextTimerController;
    format?: string;
    takePictureHandle?;
    animateParam?: AnimateParam;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Camera_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
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
import prompt from '@ohos.promptAction';
import camera from '@ohos.multimedia.camera';
import CameraModel from '../model/CameraModel';
import { VideoFrame } from '../model/CameraModel';
import Title from '../component/TitleComponent';
import grantPermission from '../utlis/PermissionUtils';
import Logger from '../utlis/Logger';
import { GlobalContext } from '../utlis/GlobalContext';
import { BusinessError } from '@ohos.base';
import common from '@ohos.app.ability.common';
import Want from '@ohos.app.ability.Want';
enum CameraMode {
    modePhoto = 0,
    modeVideo = 1 // 录像模式
}
;
const TAG: string = '[CameraPage]';
class CameraPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.mXComponentController = new XComponentController();
        this.surfaceId = '-1';
        this.cameraIcon = $r('app.media.take_photo_normal');
        this.cameraModel = new CameraModel();
        this.__imageThumbnail = new ObservedPropertySimple('', this, "imageThumbnail");
        this.__videoThumbnail = new ObservedPropertyObject(undefined, this, "videoThumbnail");
        this.__currentModel = new ObservedPropertySimple(CameraMode.modePhoto, this, "currentModel");
        this.__isRecording = new ObservedPropertySimple(false, this, "isRecording");
        this.__textMove = new ObservedPropertySimple(45, this, "textMove");
        this.__isPointShow = new ObservedPropertySimple(true, this, "isPointShow");
        this.__isTitleShow = new ObservedPropertySimple(true, this, "isTitleShow");
        this.__rotation = AppStorage.SetAndLink('selectType_0', 0, this, "rotation");
        this.__resolution = AppStorage.SetAndLink('selectType_1', 0, this, "resolution");
        this.__timeShow = new ObservedPropertySimple(false, this, "timeShow");
        this.textTimerController = new TextTimerController();
        this.__format = new ObservedPropertySimple('mm:ss', this, "format");
        this.takePictureHandle = (thumbnail: string) => {
            this.imageThumbnail = thumbnail;
            Logger.info(TAG, `takePicture end , thumbnail: ${this.imageThumbnail}`);
        };
        this.animateParam = {
            duration: 500,
            onFinish: () => {
                this.isPointShow = true;
            }
        };
        this.updateWithValueParams(params);
        this.declareWatch("rotation", this.rotationChange);
        this.declareWatch("resolution", this.resolutionChange);
    }
    updateWithValueParams(params: CameraPage_Params) {
        if (params.mXComponentController !== undefined) {
            this.mXComponentController = params.mXComponentController;
        }
        if (params.surfaceId !== undefined) {
            this.surfaceId = params.surfaceId;
        }
        if (params.cameraIcon !== undefined) {
            this.cameraIcon = params.cameraIcon;
        }
        if (params.cameraModel !== undefined) {
            this.cameraModel = params.cameraModel;
        }
        if (params.imageThumbnail !== undefined) {
            this.imageThumbnail = params.imageThumbnail;
        }
        if (params.videoThumbnail !== undefined) {
            this.videoThumbnail = params.videoThumbnail;
        }
        if (params.currentModel !== undefined) {
            this.currentModel = params.currentModel;
        }
        if (params.isRecording !== undefined) {
            this.isRecording = params.isRecording;
        }
        if (params.textMove !== undefined) {
            this.textMove = params.textMove;
        }
        if (params.isPointShow !== undefined) {
            this.isPointShow = params.isPointShow;
        }
        if (params.isTitleShow !== undefined) {
            this.isTitleShow = params.isTitleShow;
        }
        if (params.timeShow !== undefined) {
            this.timeShow = params.timeShow;
        }
        if (params.textTimerController !== undefined) {
            this.textTimerController = params.textTimerController;
        }
        if (params.format !== undefined) {
            this.format = params.format;
        }
        if (params.takePictureHandle !== undefined) {
            this.takePictureHandle = params.takePictureHandle;
        }
        if (params.animateParam !== undefined) {
            this.animateParam = params.animateParam;
        }
    }
    aboutToBeDeleted() {
        this.__imageThumbnail.aboutToBeDeleted();
        this.__videoThumbnail.aboutToBeDeleted();
        this.__currentModel.aboutToBeDeleted();
        this.__isRecording.aboutToBeDeleted();
        this.__textMove.aboutToBeDeleted();
        this.__isPointShow.aboutToBeDeleted();
        this.__isTitleShow.aboutToBeDeleted();
        this.__rotation.aboutToBeDeleted();
        this.__resolution.aboutToBeDeleted();
        this.__timeShow.aboutToBeDeleted();
        this.__format.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private mXComponentController: XComponentController;
    private surfaceId: string;
    private cameraIcon: Resource;
    private cameraModel: CameraModel;
    private __imageThumbnail: ObservedPropertySimple<string>;
    get imageThumbnail() {
        return this.__imageThumbnail.get();
    }
    set imageThumbnail(newValue: string) {
        this.__imageThumbnail.set(newValue);
    }
    private __videoThumbnail: ObservedPropertyObject<Resource | undefined>;
    get videoThumbnail() {
        return this.__videoThumbnail.get();
    }
    set videoThumbnail(newValue: Resource | undefined) {
        this.__videoThumbnail.set(newValue);
    }
    private __currentModel: ObservedPropertySimple<number>;
    get currentModel() {
        return this.__currentModel.get();
    }
    set currentModel(newValue: number) {
        this.__currentModel.set(newValue);
    }
    private __isRecording: ObservedPropertySimple<boolean>;
    get isRecording() {
        return this.__isRecording.get();
    }
    set isRecording(newValue: boolean) {
        this.__isRecording.set(newValue);
    }
    private __textMove: ObservedPropertySimple<number>;
    get textMove() {
        return this.__textMove.get();
    }
    set textMove(newValue: number) {
        this.__textMove.set(newValue);
    }
    private __isPointShow: ObservedPropertySimple<boolean>;
    get isPointShow() {
        return this.__isPointShow.get();
    }
    set isPointShow(newValue: boolean) {
        this.__isPointShow.set(newValue);
    }
    private __isTitleShow: ObservedPropertySimple<boolean>;
    get isTitleShow() {
        return this.__isTitleShow.get();
    }
    set isTitleShow(newValue: boolean) {
        this.__isTitleShow.set(newValue);
    }
    private __rotation: ObservedPropertyAbstract<number>;
    get rotation() {
        return this.__rotation.get();
    }
    set rotation(newValue: number) {
        this.__rotation.set(newValue);
    }
    private __resolution: ObservedPropertyAbstract<number>;
    get resolution() {
        return this.__resolution.get();
    }
    set resolution(newValue: number) {
        this.__resolution.set(newValue);
    }
    private __timeShow: ObservedPropertySimple<boolean>;
    get timeShow() {
        return this.__timeShow.get();
    }
    set timeShow(newValue: boolean) {
        this.__timeShow.set(newValue);
    }
    private textTimerController: TextTimerController;
    private __format: ObservedPropertySimple<string>;
    get format() {
        return this.__format.get();
    }
    set format(newValue: string) {
        this.__format.set(newValue);
    }
    /**
     * 旋转角度改变监听方法
     */
    rotationChange() {
        Logger.info(TAG, `rotationChange begin ${this.rotation}`);
        // 0°
        if (this.rotation == 0) {
            Logger.info(TAG, `rotationChange ${this.rotation}`);
            this.cameraModel.setImageRotation(camera.ImageRotation.ROTATION_0);
            // 90°
        }
        else if (this.rotation == 1) {
            Logger.info(TAG, `rotationChange ${this.rotation}`);
            this.cameraModel.setImageRotation(camera.ImageRotation.ROTATION_90);
            // 180°
        }
        else if (this.rotation == 2) {
            Logger.info(TAG, `rotationChange ${this.rotation}`);
            this.cameraModel.setImageRotation(camera.ImageRotation.ROTATION_180);
            // 270°
        }
        else if (this.rotation == 3) {
            Logger.info(TAG, `rotationChange ${this.rotation}`);
            this.cameraModel.setImageRotation(camera.ImageRotation.ROTATION_270);
        }
        Logger.info(TAG, 'rotationChange end');
    }
    /**
     * 分辨率改变监听方法
     */
    resolutionChange() {
        Logger.info(TAG, `resolutionChange begin ${this.resolution}`);
        // 不支持 则为默认800*600
        if (this.resolution == 0) {
            Logger.info(TAG, `resolutionChange ${this.resolution}`);
            this.cameraModel.setVideoFrameWH(VideoFrame.VIDEOFRAME_1920_1080);
        }
        else if (this.resolution == 1) {
            Logger.info(TAG, `resolutionChange ${this.resolution}`);
            this.cameraModel.setVideoFrameWH(VideoFrame.VIDEOFRAME_1920_1080);
            // 1280*720
        }
        else if (this.resolution == 2) {
            Logger.info(TAG, `resolutionChange ${this.resolution}`);
            this.cameraModel.setVideoFrameWH(VideoFrame.VIDEOFRAME_1280_720);
            // 800*600
        }
        else if (this.resolution == 3) {
            Logger.info(TAG, `resolutionChange ${this.resolution}`);
            this.cameraModel.setVideoFrameWH(VideoFrame.VIDEOFRAME_800_600);
        }
        Logger.info(TAG, 'resolutionChange end');
    }
    async aboutToAppear() {
        await grantPermission().then(res => {
            Logger.info(TAG, `权限申请成功  ${JSON.stringify(res)}`);
            if (this.surfaceId) {
                this.cameraModel.initCamera(this.surfaceId);
            }
        }).catch((rej: BusinessError) => {
            Logger.info(TAG, `权限申请失败  ${JSON.stringify(rej)}`);
        });
        this.surfaceId = this.mXComponentController.getXComponentSurfaceId();
        Logger.info(TAG, `aboutToAppear,surfaceId=${this.surfaceId}`);
        this.cameraModel.setTakePictureHandleCallback((photoUri: string): void => this.takePictureHandle(photoUri));
    }
    onPageHide() {
        Logger.info(TAG, 'onPageHide begin');
        if (this.isRecording) {
            Logger.info(TAG, 'stopVideo begin');
            this.timeShow = false;
            this.textTimerController.pause();
            this.cameraModel.stopVideo();
            this.isRecording = false;
            this.cameraModel.cameraRelease();
            this.videoThumbnail = $r('app.media.video_poster');
        }
        Logger.info(TAG, 'onPageHide end');
    }
    onPageShow() {
        this.cameraModel.initCamera(this.surfaceId);
    }
    getCameraIcon() {
        if (this.currentModel === CameraMode.modePhoto) {
            this.cameraIcon = $r('app.media.take_photo_normal');
        }
        else {
            if (this.isRecording) {
                this.cameraIcon = $r('app.media.take_video_stop');
            }
            else {
                this.cameraIcon = $r('app.media.take_video_normal');
            }
        }
    }
    refreshVideoState() {
        if (this.isRecording) {
            Logger.info(TAG, 'stopVideo begin');
            this.timeShow = false;
            this.textTimerController.pause();
            this.cameraModel.stopVideo();
            this.isRecording = false;
            this.videoThumbnail = $r('app.media.video_poster');
        }
        else {
            Logger.info(TAG, 'startVideo begin');
            this.timeShow = true;
            this.textTimerController.reset();
            this.textTimerController.start();
            this.cameraModel.startVideo();
            this.isRecording = true;
        }
    }
    startAbilityToPhoto() {
        let want: Want = {
            bundleName: 'com.huawei.hmos.photos',
            abilityName: 'com.huawei.hmos.photos.MainAbility'
        };
        Logger.info(TAG, `startAbility `);
        (GlobalContext.getContext().getValue('cameraContext') as common.UIAbilityContext).startAbility(want, (err: BusinessError) => {
            Logger.info(TAG, `startAbility error  ${err}`);
        });
    }
    private takePictureHandle;
    private animateParam: AnimateParam;
    /**
     * 拍照事件
     */
    photoEvent() {
        if (this.currentModel === CameraMode.modeVideo) {
            Context.animateTo(this.animateParam, () => {
                this.isPointShow = false;
                this.textMove = this.textMove + 56;
            });
            if (this.isRecording) {
                this.timeShow = false;
                this.isRecording = false;
                this.cameraModel.stopVideo();
            }
            this.cameraModel.initCamera(this.surfaceId);
            this.currentModel = CameraMode.modePhoto;
            this.videoThumbnail = undefined;
        }
    }
    /**
     * 录像事件
     */
    videoEvent() {
        if (this.currentModel === CameraMode.modePhoto) {
            Context.animateTo(this.animateParam, () => {
                this.isPointShow = false;
                this.textMove = this.textMove - 56;
            });
            this.currentModel = CameraMode.modeVideo;
        }
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        __Common__.create();
        __Common__.visibility(this.isTitleShow ? Visibility.Visible : Visibility.None);
        let earlierCreatedChild_2: Title = (this && this.findChildById) ? this.findChildById("2") as Title : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Title("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        __Common__.pop();
        Stack.create({ alignContent: Alignment.Bottom });
        Stack.layoutWeight(1);
        Stack.backgroundColor($r('app.color.COLOR_000000'));
        Stack.width('100%');
        Stack.height('100%');
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.width('97%');
        Stack.height('100%');
        XComponent.create({
            id: 'componentId',
            type: 'surface',
            controller: this.mXComponentController
        });
        XComponent.onLoad(() => {
            Logger.info(TAG, 'onLoad is called');
            this.mXComponentController.setXComponentSurfaceSize({ surfaceWidth: 640, surfaceHeight: 480 });
            this.surfaceId = this.mXComponentController.getXComponentSurfaceId();
            Logger.info(TAG, `onLoad surfaceId: ${this.surfaceId}`);
            this.currentModel = CameraMode.modePhoto;
            this.cameraModel.initCamera(this.surfaceId);
        });
        XComponent.width('100%');
        XComponent.height('100%');
        XComponent.margin({ bottom: 152 });
        Gesture.create(GesturePriority.Low);
        SwipeGesture.create({ direction: SwipeDirection.Horizontal, speed: 40 });
        SwipeGesture.onAction((event: GestureEvent) => {
            Logger.info(TAG, `SwipeGesture event: ${JSON.stringify(event)}`);
            // 右滑
            if (event.angle > 0) {
                this.photoEvent();
            }
            else {
                this.videoEvent();
            }
        });
        SwipeGesture.pop();
        Gesture.pop();
        Column.create();
        Column.justifyContent(FlexAlign.Start);
        Column.visibility(this.timeShow ? Visibility.Visible : Visibility.Hidden);
        Column.width('100%');
        Column.height('30%');
        TextTimer.create({ isCountDown: false, count: 60000, controller: this.textTimerController });
        TextTimer.height(60);
        TextTimer.fontSize(24);
        TextTimer.format(this.format);
        TextTimer.fontColor(Color.Red);
        TextTimer.fontSize(50);
        TextTimer.pop();
        Column.pop();
        Stack.pop();
        Column.create();
        Column.padding({ bottom: 10 });
        Column.backgroundColor($r('app.color.COLOR_000000'));
        Column.alignItems(HorizontalAlign.Start);
        Column.size({ height: 130, width: '100%' });
        Row.create();
        Row.offset({ x: this.textMove });
        Row.size({ height: 40, width: '100%' });
        Row.justifyContent(FlexAlign.Center);
        Column.create();
        Text.create($r('app.string.photo'));
        Text.id('photo');
        Text.fontSize(14);
        Text.fontColor(this.currentModel === CameraMode.modePhoto ? Color.White : Color.Gray);
        Text.onClick(() => {
            this.photoEvent();
        });
        Text.pop();
        If.create();
        if (this.currentModel === CameraMode.modePhoto) {
            If.branchId(0);
            Text.create();
            Text.width(4);
            Text.height(4);
            Text.margin({ top: 5 });
            Text.borderRadius(2);
            Text.backgroundColor(Color.Red);
            Text.pop();
        }
        If.pop();
        Column.pop();
        Column.create();
        Text.create($r('app.string.video'));
        Text.fontColor(this.currentModel === CameraMode.modeVideo ? Color.White : Color.Gray);
        Text.fontSize(14);
        Text.id('video');
        Text.margin({ left: 30 });
        Text.onClick(() => {
            this.videoEvent();
        });
        Text.pop();
        If.create();
        if (this.currentModel === CameraMode.modeVideo) {
            If.branchId(0);
            Text.create();
            Text.width(4);
            Text.height(4);
            Text.margin({ left: 30, top: 5 });
            Text.borderRadius(2);
            Text.backgroundColor(Color.Red);
            Text.pop();
        }
        If.pop();
        Column.pop();
        Row.pop();
        Row.create();
        Row.size({ height: 80, width: '100%' });
        Row.margin({ right: 10 });
        Row.justifyContent(FlexAlign.SpaceBetween);
        If.create();
        if (this.currentModel === CameraMode.modeVideo) {
            If.branchId(0);
            Image.create(this.videoThumbnail);
            Image.id('intoPhoto');
            Image.objectFit(ImageFit.Fill);
            Image.margin({ left: 24 });
            Image.borderRadius(5);
            Image.aspectRatio(1);
            Image.backgroundColor(Color.Gray);
            Image.size({ width: 40, height: 40 });
            Image.onClick(e => {
                this.startAbilityToPhoto();
            });
        }
        else {
            If.branchId(1);
            Image.create(this.imageThumbnail);
            Image.id('intoPhoto');
            Image.objectFit(ImageFit.Fill);
            Image.margin({ left: 24 });
            Image.borderRadius(5);
            Image.aspectRatio(1);
            Image.backgroundColor(Color.Gray);
            Image.size({ width: 40, height: 40 });
            Image.onClick(e => {
                this.startAbilityToPhoto();
            });
        }
        If.pop();
        Image.create(this.currentModel === CameraMode.modePhoto ? $r('app.media.take_photo_normal') : this.isRecording ? $r('app.media.take_video_stop') : $r('app.media.take_video_normal'));
        Image.size({ width: 64, height: 64 });
        Image.margin({ left: 10 });
        Image.id('camera');
        Image.onClick(() => {
            if (this.currentModel === CameraMode.modePhoto) {
                Logger.info(TAG, 'takePicture begin');
                prompt.showToast({ message: '拍照中...', duration: 200 });
                this.cameraModel.takePicture();
            }
            else if (this.currentModel === CameraMode.modeVideo) {
                // 录制时隐藏标题组件
                this.isTitleShow = !this.isTitleShow;
                this.refreshVideoState();
            }
        });
        Column.create();
        Column.width(40);
        Column.height(40);
        Column.pop();
        Row.pop();
        Column.pop();
        Stack.pop();
        Column.pop();
    }
    async aboutToDisappear() {
        if (this.isRecording) {
            await this.cameraModel.stopVideo();
        }
        await this.cameraModel.cameraRelease();
    }
}
loadDocument(new CameraPage("1", undefined, {}));
