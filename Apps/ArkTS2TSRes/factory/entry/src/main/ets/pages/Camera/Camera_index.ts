interface Camera_index_Params {
    name?: string;
    StepTips?: string;
    mXComponentController?: XComponentController;
    surfaceId?: number;
    cameraDeviceIndex?: number;
    assetUri?: string;
    thumbnail?: PixelMap;
    isTakePictureEnabled?: boolean;
    isTakeVideoEnabled?: boolean;
    clickFrequency?: number;
    resolutionSelectVal?: string;
    captureBtnScale?: number;
    handleTakePicture?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Camera_index_" + ++__generate__Id;
}
/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Logger from '../../model/Logger';
import CameraService from './CameraService';
import FirstDialog from '../../common/FirstDialog';
import prompt from '@ohos.prompt';
import router from '@ohos.router';
const TAG = "Camera";
class Camera_index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__name = new ObservedPropertySimple('CameraVideo', this, "name");
        this.__StepTips = new ObservedPropertySimple('测试目的：用于测试相机录像分辨率能力\n预期结果：所有分辨率均可以录像，录像与预览一致', this, "StepTips");
        this.mXComponentController = new XComponentController();
        this.__surfaceId = new ObservedPropertySimple(0, this, "surfaceId");
        this.__cameraDeviceIndex = new ObservedPropertySimple(0, this, "cameraDeviceIndex");
        this.__assetUri = new ObservedPropertySimple(undefined, this, "assetUri");
        this.__thumbnail = new ObservedPropertyObject(undefined, this, "thumbnail");
        this.__isTakePictureEnabled = new ObservedPropertySimple(true, this, "isTakePictureEnabled");
        this.__isTakeVideoEnabled = new ObservedPropertySimple(true, this, "isTakeVideoEnabled");
        this.__clickFrequency = new ObservedPropertySimple(0 // 点击次数
        , this, "clickFrequency");
        this.__resolutionSelectVal = new ObservedPropertySimple('' // 下拉框默认value
        , this, "resolutionSelectVal");
        this.__captureBtnScale = new ObservedPropertySimple(1, this, "captureBtnScale");
        this.handleTakePicture = (assetUri: string) => {
            this.assetUri = assetUri;
            Logger.info(TAG, `takePicture end, assetUri: ${this.assetUri}`);
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Camera_index_Params) {
        if (params.name !== undefined) {
            this.name = params.name;
        }
        if (params.StepTips !== undefined) {
            this.StepTips = params.StepTips;
        }
        if (params.mXComponentController !== undefined) {
            this.mXComponentController = params.mXComponentController;
        }
        if (params.surfaceId !== undefined) {
            this.surfaceId = params.surfaceId;
        }
        if (params.cameraDeviceIndex !== undefined) {
            this.cameraDeviceIndex = params.cameraDeviceIndex;
        }
        if (params.assetUri !== undefined) {
            this.assetUri = params.assetUri;
        }
        if (params.thumbnail !== undefined) {
            this.thumbnail = params.thumbnail;
        }
        if (params.isTakePictureEnabled !== undefined) {
            this.isTakePictureEnabled = params.isTakePictureEnabled;
        }
        if (params.isTakeVideoEnabled !== undefined) {
            this.isTakeVideoEnabled = params.isTakeVideoEnabled;
        }
        if (params.clickFrequency !== undefined) {
            this.clickFrequency = params.clickFrequency;
        }
        if (params.resolutionSelectVal !== undefined) {
            this.resolutionSelectVal = params.resolutionSelectVal;
        }
        if (params.captureBtnScale !== undefined) {
            this.captureBtnScale = params.captureBtnScale;
        }
        if (params.handleTakePicture !== undefined) {
            this.handleTakePicture = params.handleTakePicture;
        }
    }
    aboutToBeDeleted() {
        this.__name.aboutToBeDeleted();
        this.__StepTips.aboutToBeDeleted();
        this.__surfaceId.aboutToBeDeleted();
        this.__cameraDeviceIndex.aboutToBeDeleted();
        this.__assetUri.aboutToBeDeleted();
        this.__thumbnail.aboutToBeDeleted();
        this.__isTakePictureEnabled.aboutToBeDeleted();
        this.__isTakeVideoEnabled.aboutToBeDeleted();
        this.__clickFrequency.aboutToBeDeleted();
        this.__resolutionSelectVal.aboutToBeDeleted();
        this.__captureBtnScale.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __name: ObservedPropertySimple<string>;
    get name() {
        return this.__name.get();
    }
    set name(newValue: string) {
        this.__name.set(newValue);
    }
    private __StepTips: ObservedPropertySimple<string>;
    get StepTips() {
        return this.__StepTips.get();
    }
    set StepTips(newValue: string) {
        this.__StepTips.set(newValue);
    }
    private mXComponentController: XComponentController;
    private __surfaceId: ObservedPropertySimple<number>;
    get surfaceId() {
        return this.__surfaceId.get();
    }
    set surfaceId(newValue: number) {
        this.__surfaceId.set(newValue);
    }
    private __cameraDeviceIndex: ObservedPropertySimple<number>;
    get cameraDeviceIndex() {
        return this.__cameraDeviceIndex.get();
    }
    set cameraDeviceIndex(newValue: number) {
        this.__cameraDeviceIndex.set(newValue);
    }
    private __assetUri: ObservedPropertySimple<string>;
    get assetUri() {
        return this.__assetUri.get();
    }
    set assetUri(newValue: string) {
        this.__assetUri.set(newValue);
    }
    private __thumbnail: ObservedPropertyObject<PixelMap>;
    get thumbnail() {
        return this.__thumbnail.get();
    }
    set thumbnail(newValue: PixelMap) {
        this.__thumbnail.set(newValue);
    }
    private __isTakePictureEnabled: ObservedPropertySimple<boolean>;
    get isTakePictureEnabled() {
        return this.__isTakePictureEnabled.get();
    }
    set isTakePictureEnabled(newValue: boolean) {
        this.__isTakePictureEnabled.set(newValue);
    }
    private __isTakeVideoEnabled: ObservedPropertySimple<boolean>;
    get isTakeVideoEnabled() {
        return this.__isTakeVideoEnabled.get();
    }
    set isTakeVideoEnabled(newValue: boolean) {
        this.__isTakeVideoEnabled.set(newValue);
    }
    private __clickFrequency: ObservedPropertySimple<number>; // 点击次数
    get clickFrequency() {
        return this.__clickFrequency.get();
    }
    set clickFrequency(newValue: number) {
        this.__clickFrequency.set(newValue);
    }
    private __resolutionSelectVal: ObservedPropertySimple<string>; // 下拉框默认value
    get resolutionSelectVal() {
        return this.__resolutionSelectVal.get();
    }
    set resolutionSelectVal(newValue: string) {
        this.__resolutionSelectVal.set(newValue);
    }
    private __captureBtnScale: ObservedPropertySimple<number>;
    get captureBtnScale() {
        return this.__captureBtnScale.get();
    }
    set captureBtnScale(newValue: number) {
        this.__captureBtnScale.set(newValue);
    }
    async aboutToAppear() {
        await FirstDialog.ChooseDialog(this.StepTips, this.name);
        CameraService.setTakePictureCallback(this.handleTakePicture.bind(this));
        Logger.info(TAG, `takePicture end, assetUri: ${this.assetUri}`);
    }
    async cameraInit(obj?) {
        CameraService.initCamera(this.surfaceId, this.cameraDeviceIndex).then(() => {
            this.resolutionSelectVal = String(CameraService.videoResolution[this.clickFrequency].value);
            Logger.info(TAG, `resolutionSelectVal ${this.resolutionSelectVal}`); //1280x960
        });
    }
    private handleTakePicture;
    onPageShow() {
        // @ts-ignore
        this.surfaceId = this.mXComponentController.getXComponentSurfaceId();
        CameraService.initCamera(this.surfaceId, this.cameraDeviceIndex);
    }
    onPageHide() {
        CameraService.releaseCamera();
        Logger.info(TAG, `onPageHide releaseCamera end`);
    }
    render() {
        Stack.create({ alignContent: Alignment.BottomEnd });
        Stack.width('100%');
        Stack.height('100%');
        Stack.backgroundColor(Color.Black);
        Gesture.create(GesturePriority.Low);
        PanGesture.create({ direction: PanDirection.Left | PanDirection.Right });
        PanGesture.onActionEnd(() => {
            router.back();
        });
        PanGesture.pop();
        Gesture.pop();
        XComponent.create({
            id: 'componentId',
            type: 'surface',
            controller: this.mXComponentController
        });
        XComponent.size({ width: '100%', height: '100%' });
        XComponent.onLoad(async () => {
            Logger.info(TAG, 'onLoad is called');
            // @ts-ignore
            this.surfaceId = this.mXComponentController.getXComponentSurfaceId();
            Logger.info(TAG, `onLoad surfaceId: ${this.surfaceId}`);
            this.cameraInit();
        });
        Row.create();
        Row.size({ width: '100%', height: '30%' });
        Row.justifyContent(FlexAlign.SpaceBetween);
        If.create();
        if (this.assetUri !== undefined) {
            If.branchId(0);
            Image.create(this.assetUri);
            Image.size({ height: '100%' });
            Image.border({ width: 1, color: Color.White, style: BorderStyle.Solid });
            Image.onClick(async () => {
                await globalThis.context.startAbility({
                    parameters: { uri: 'photodetail' },
                    bundleName: 'com.ohos.photos',
                    abilityName: 'com.ohos.photos.MainAbility'
                });
            });
        }
        If.pop();
        Blank.create();
        Blank.pop();
        If.create();
        if (this.thumbnail !== undefined) {
            If.branchId(0);
            Image.create(this.thumbnail);
            Image.height('100%');
            Image.aspectRatio(4 / 3);
            Image.border({ width: 1, color: Color.White, style: BorderStyle.Solid });
            Image.onClick(async () => {
                await globalThis.context.startAbility({
                    parameters: { uri: 'photodetail' },
                    bundleName: 'com.ohos.photos',
                    abilityName: 'com.ohos.photos.MainAbility'
                });
            });
        }
        If.pop();
        Row.pop();
        Column.create();
        Column.size({ height: '100%' });
        Column.justifyContent(FlexAlign.Center);
        Image.create(this.isTakeVideoEnabled ? $r('app.media.take_video_normal') : $r('app.media.take_video_stop'));
        Image.width(76);
        Image.aspectRatio(1);
        Image.enabled(this.isTakeVideoEnabled);
        Image.onTouch((event: TouchEvent) => {
            this.isTakeVideoEnabled = false;
            if (event.type === TouchType.Up) {
                this.isTakeVideoEnabled = false;
                prompt.showToast({
                    message: '录制中，请等待三秒', duration: 1000
                });
                CameraService.StartRecording().then(() => {
                    setTimeout(() => {
                        CameraService.stopRecording().then((thumbnailPixelMap) => {
                            this.thumbnail = thumbnailPixelMap;
                            this.isTakeVideoEnabled = true;
                        });
                    }, 3000);
                });
            }
        });
        Column.pop();
        Row.create();
        Row.size({ width: '100%', height: 76 });
        Row.justifyContent(FlexAlign.Center);
        Stack.create({ alignContent: Alignment.Center });
        Stack.width(76);
        Stack.aspectRatio(1);
        Image.create($r('app.media.ic_circled'));
        Image.fillColor(Color.White);
        Image.create($r('app.media.ic_circled_filled'));
        Image.width(54);
        Image.aspectRatio(1);
        Image.fillColor(Color.White);
        Image.scale({ x: this.captureBtnScale, y: this.captureBtnScale, z: this.captureBtnScale });
        Image.enabled(this.isTakePictureEnabled);
        Image.onTouch(async (event: TouchEvent) => {
            if (event.type === TouchType.Down) {
                Context.animateTo({ duration: 125, curve: Curve.Sharp, delay: 0 }, () => {
                    this.captureBtnScale = 0.85;
                });
            }
            else if (event.type === TouchType.Up) {
                Context.animateTo({ duration: 125, curve: Curve.Sharp, delay: 0,
                    onFinish: () => {
                        this.captureBtnScale = 1;
                    } }, () => {
                    this.captureBtnScale = 1;
                });
                this.isTakePictureEnabled = false;
                CameraService.takePicture();
                this.isTakePictureEnabled = true;
            }
        });
        Stack.pop();
        Row.pop();
        Stack.pop();
    }
}
loadDocument(new Camera_index("1", undefined, {}));
