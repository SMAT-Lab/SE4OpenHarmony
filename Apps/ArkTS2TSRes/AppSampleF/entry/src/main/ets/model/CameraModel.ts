let __generate__Id: number = 0;
function generateId(): string {
    return "CameraModel_" + ++__generate__Id;
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
import camera from '@ohos.multimedia.camera';
import images from '@ohos.multimedia.image';
import emitter from '@ohos.events.emitter';
import image from '@ohos.multimedia.image';
import { BusinessError } from '@ohos.base';
import Logger from '../utils/Logger';
import QRCode, { ImageWH } from '../utils/DeCode';
// 相机宽高
interface CameraWH {
    width: number;
    height: number;
}
;
const FOUR: number = 4; // format
const EIGHT: number = 8; // capacity
const FOUR_THOUSAND_AND_SIXTY_NINE: number = 4096; // buffer大小
const cameraWH: CameraWH = {
    width: 480,
    height: 640
};
const TAG = '[CameraModel]';
export default class CameraService {
    private cameraMgr?: camera.CameraManager;
    private camerasArray?: Array<camera.CameraDevice>;
    private cameraInput?: camera.CameraInput;
    private previewOutput?: camera.PreviewOutput;
    private photoOutPut?: camera.PhotoOutput;
    private capSession?: camera.CaptureSession;
    private videoOutput?: camera.VideoOutput;
    private capability?: camera.CameraOutputCapability;
    private receiver?: images.ImageReceiver;
    private pixelMap?: images.PixelMap;
    private idInterval: number = -1;
    constructor() {
        this.receiver = images.createImageReceiver(cameraWH.width, cameraWH.height, FOUR, EIGHT);
        Logger.info(TAG, 'createImageReceiver');
        this.receiver?.on('imageArrival', () => {
            Logger.info(TAG, 'imageArrival');
            this.receiver?.readNextImage((err: BusinessError, image: image.Image) => {
                Logger.info(TAG, 'readNextImage image:' + JSON.stringify(image.size));
                if (err || image === undefined) {
                    Logger.error(TAG, 'failed to get valid image');
                    return;
                }
                image.getComponent(FOUR, async (errMsg: BusinessError, img: image.Component) => {
                    Logger.info(TAG, 'getComponent');
                    Logger.info(TAG, 'img.byteBuffer ' + img.byteBuffer.byteLength);
                    if (errMsg || img === undefined) {
                        Logger.info(TAG, 'failed to get valid buffer');
                        return;
                    }
                    let buffer: ArrayBuffer = new ArrayBuffer(FOUR_THOUSAND_AND_SIXTY_NINE);
                    if (img.byteBuffer) {
                        buffer = img.byteBuffer;
                        Logger.info(TAG, 'buffer==' + buffer.byteLength);
                        let imageSourceApi: image.ImageSource = images.createImageSource(buffer);
                        this.pixelMap = await imageSourceApi.createPixelMap();
                        let imageInfo: image.ImageInfo = await this.pixelMap?.getImageInfo();
                        let w: number = imageInfo.size.width;
                        let h: number = imageInfo.size.height;
                        Logger.info(TAG, 'imageInfo==w==' + w);
                        Logger.info(TAG, 'imageInfo==h==' + h);
                        Logger.info(TAG, 'imageInfo.density==h==' + imageInfo.density);
                        this.scanCode(w, h);
                    }
                    else {
                        Logger.error(TAG, 'img.byteBuffer is undefined');
                    }
                    image.release();
                });
            });
        });
    }
    /**
     * 扫描二维码
     * @param w,h
     */
    async scanCode(w: number, h: number) {
        try {
            let qrCode: QRCode = new QRCode();
            let wh: ImageWH = {
                width: w,
                height: h
            };
            let text: string = await qrCode.decode(this.pixelMap as image.PixelMap, wh);
            Logger.info(TAG, 'text==JSON.stringify===' + JSON.stringify(text));
            Logger.info(TAG, 'text=====' + text);
            let eventDataText: emitter.EventData = {
                data: {
                    'text': text
                }
            };
            let innerEventText: emitter.InnerEvent = {
                eventId: 1,
                priority: emitter.EventPriority.IMMEDIATE
            };
            Logger.info(TAG, 'emit=====before');
            emitter.emit(innerEventText, eventDataText);
            Logger.info(TAG, 'emit=====after');
        }
        catch (err) {
            Logger.info(TAG, 'err=====err' + err);
            this.takePicture();
        }
    }
    /**
     * 初始化相机
     * @param surfaceId
     */
    async initCamera(surfaceId: string): Promise<void> {
        Logger.info(TAG, `initCamera surfaceId:${surfaceId}`);
        await this.cameraRelease();
        Logger.info(TAG, `initCamera this.cameraRelease surfaceId:${surfaceId}`);
        Logger.info(TAG, 'getCameraManager begin');
        try {
            Logger.info(TAG, 'getCameraManager try begin');
            this.cameraMgr = camera.getCameraManager(AppStorage.get('cameraContext'));
            Logger.info(TAG, 'getCameraManager try end');
        }
        catch (e) {
            Logger.info(TAG, `getCameraManager catch e:${JSON.stringify(e)}`);
            Logger.info(TAG, `getCameraManager catch code:${JSON.stringify(e.code)}`);
            Logger.info(TAG, `getCameraManager catch message:${JSON.stringify(e.message)}`);
        }
        Logger.info(TAG, 'getCameraManager end');
        Logger.info(TAG, `getCameraManager ${JSON.stringify(this.cameraMgr)}`);
        this.camerasArray = this.cameraMgr?.getSupportedCameras();
        Logger.info(TAG, `get cameras ${this.camerasArray?.length}`);
        if (this.camerasArray?.length === 0) {
            Logger.info(TAG, 'cannot get cameras');
            return;
        }
        let mCamera = this.camerasArray && this.camerasArray[0] as camera.CameraDevice;
        this.cameraInput = this.cameraMgr?.createCameraInput(mCamera);
        this.cameraInput?.open();
        Logger.info(TAG, 'createCameraInput');
        this.capability = this.cameraMgr?.getSupportedOutputCapability(mCamera);
        let previewProfile = this.capability?.previewProfiles[0];
        this.previewOutput = this.cameraMgr?.createPreviewOutput(previewProfile, surfaceId);
        Logger.info(TAG, 'createPreviewOutput');
        let rSurfaceId = await this.receiver?.getReceivingSurfaceId();
        let photoProfile = this.capability?.photoProfiles[0];
        this.photoOutPut = this.cameraMgr?.createPhotoOutput(photoProfile, rSurfaceId);
        this.capSession = this.cameraMgr?.createCaptureSession();
        Logger.info(TAG, 'createCaptureSession');
        this.capSession?.beginConfig();
        Logger.info(TAG, 'beginConfig');
        this.capSession?.addInput(this.cameraInput);
        this.capSession?.addOutput(this.previewOutput);
        this.capSession?.addOutput(this.photoOutPut);
        await this.capSession?.commitConfig();
        await this.capSession?.start();
        Logger.info(TAG, 'captureSession start');
        this.takePicture();
    }
    /**
     * 拍照
     */
    async takePicture() {
        Logger.info(TAG, 'takePicture');
        let photoSettings: camera.PhotoCaptureSetting = {
            rotation: 0,
            quality: camera.QualityLevel.QUALITY_LEVEL_MEDIUM,
            location: {
                // 位置信息，经纬度
                latitude: 12.9698,
                longitude: 77.75,
                altitude: 1000
            },
            mirror: false,
        };
        try {
            this.photoOutPut?.capture(photoSettings);
        }
        catch (e) {
            Logger.error(TAG, 'takePicture err:' + e);
        }
        Logger.info(TAG, 'takePicture done');
    }
    /**
     * 资源释放
     */
    async cameraRelease(): Promise<void> {
        Logger.info(TAG, 'releaseCamera');
        if (this.idInterval !== -1) {
            Logger.info(TAG, 'clearInterval idInterval');
            clearInterval(this.idInterval);
            this.idInterval = -1;
        }
        if (this.cameraInput) {
            await this.cameraInput?.close();
            this.cameraInput = undefined;
        }
        if (this.previewOutput) {
            await this.previewOutput?.release();
            this.previewOutput = undefined;
        }
        if (this.photoOutPut) {
            await this.photoOutPut?.release();
            this.photoOutPut = undefined;
        }
        if (this.videoOutput) {
            await this.videoOutput?.release();
            this.videoOutput = undefined;
        }
        if (this.capSession) {
            await this.capSession?.release();
            this.capSession = undefined;
        }
    }
}
