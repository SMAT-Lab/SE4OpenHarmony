let __generate__Id: number = 0;
function generateId(): string {
    return "CameraService_" + ++__generate__Id;
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
import camera from '@ohos.multimedia.camera';
import { CameraPosition, CameraPreviewAspectRatio, CameraResolutionType, CaptureMode } from '../constants/CameraConstants';
import CameraLifecycleProxy from './CameraLifecycleProxy';
import image from '@ohos.multimedia.image';
import CameraLifecycle from './CameraLifecycle';
import RGBLuminanceSource from '../../core/RGBLuminanceSource';
import BinaryBitmap from '../../core/BinaryBitmap';
import HybridBinarizer from '../../core/common/HybridBinarizer';
import MultiFormatReader from '../../core/MultiFormatReader';
import DecodeHintType from '../../core/DecodeHintType';
import BarcodeFormat from '../../core/BarcodeFormat';
import { CameraCodeScanConst, DecodeResultAttribute, ImageAttribute } from '../constants/CameraCodeScanConst';
import display from '@ohos.display';
import { GlobalContext } from '../utils/GlobalContext';
import common from '@ohos.app.ability.common';
import mediaLibrary from '@ohos.multimedia.mediaLibrary';
import fileio from '@ohos.fileio';
import { profileType } from '../utils/CameraType';
export default class CameraService {
    private static instance: CameraService | null = null;
    private cameraManager: camera.CameraManager | null = null;
    private camerasInfo: Array<camera.CameraDevice> | null = null;
    private cameraInput: camera.CameraInput | null = null;
    private outputCapability: camera.CameraOutputCapability | null = null;
    private previewProfile: camera.Profile | null = null;
    private outputRation: number = 0;
    private outputRationRange: Array<number> = [];
    private curMode: CaptureMode = CaptureMode.PHOTO;
    private curCameraPosition: CameraPosition = CameraPosition.BACK;
    private previewId: string = "";
    private previewOutput: camera.PreviewOutput | null = null;
    private cameraOutput: camera.CameraOutput | null = null;
    private captureSession: camera.CaptureSession | null = null;
    private isSessionStart: boolean = false;
    private isSessionCapture: boolean = false;
    private cameraLifecycleProxy: CameraLifecycleProxy;
    private isRun: boolean = true;
    private timeId: number = 0;
    private globalDisplay = GlobalContext.getContext().getObject("display") as display.Display;
    private constructor() {
        this.cameraLifecycleProxy = new CameraLifecycleProxy();
    }
    public static getInstance() {
        if (CameraService.instance == null) {
            CameraService.instance = new CameraService();
        }
        return CameraService.instance;
    }
    // 初始化
    public init(context: any, previewId?: string, captureMode?: CaptureMode, capturePosition?: CameraPosition) {
        let globalDisplay1 = GlobalContext.getContext().getObject("display") as display.Display;
        this.globalDisplay = globalDisplay1;
        this.previewId = previewId ?? this.previewId;
        this.curMode = captureMode ?? this.curMode;
        this.curCameraPosition = capturePosition ?? this.curCameraPosition;
        this.cameraManager = camera.getCameraManager(context);
        this.camerasInfo = (this.cameraManager as camera.CameraManager).getSupportedCameras();
        this.configureCamera(this.curCameraPosition);
    }
    // 创建相机
    private async buildCameraIO(cameraDevice: camera.CameraDevice) {
        if (!!this.cameraInput) {
            await this.cameraInput.close();
        }
        this.cameraInput = (this.cameraManager as camera.CameraManager).createCameraInput(cameraDevice);
        await (this.cameraInput as camera.CameraInput).open();
        this.previewOutput = (this.cameraManager as camera.CameraManager).createPreviewOutput(this.previewProfile as camera.Profile, this.previewId);
        this.captureSession = (this.cameraManager as camera.CameraManager).createCaptureSession();
        (this.captureSession as camera.CaptureSession).beginConfig();
        (this.captureSession as camera.CaptureSession).addInput((this.cameraInput as camera.CameraInput));
        (this.captureSession as camera.CaptureSession).addOutput(this.previewOutput as camera.CameraOutput);
        await this.initPreviewFrame();
    }
    private async startPreview() {
        await (this.captureSession as camera.CaptureSession).commitConfig();
        await (this.captureSession as camera.CaptureSession).start();
        this.isSessionStart = true;
        this.cameraLifecycleProxy.onPreviewStart(this.curMode);
    }
    private async setDefaultPreviewResolution() {
        this.previewProfile = this.getOutputScaleProfile(CameraResolutionType.PREVIEW);
        this.cameraLifecycleProxy.onCameraConfigure(this.curMode, this.curCameraPosition, (this.previewProfile as camera.Profile).size, (this.outputCapability as camera.CameraOutputCapability).previewProfiles);
    }
    private getOutputScaleProfile(resolutionType: CameraResolutionType): camera.Profile {
        let targetScale = this.getAspectRatio();
        let outputProfile = this.getOutputProfile(resolutionType);
        let outputProfiles = this.getOutputProfiles(resolutionType);
        let index = -1;
        let distances: number = this.globalDisplay.width;
        let newProfiles: profileType[] = [];
        for (let i = 0; i < (outputProfiles as camera.Profile[]).length - 1; i++) {
            let resolution: camera.Size = outputProfiles[i].size;
            let resolutionScale = resolution.width / resolution.height;
            let temp = Math.abs(resolution.width - this.globalDisplay.width);
            let isDifferentResolution = ((outputProfile == null || resolution.width !== (outputProfile as camera.Profile).size.width) || (resolution.height !== (outputProfile as camera.Profile).size.height));
            if (resolutionScale === targetScale && temp <= distances && isDifferentResolution) {
                distances = temp;
                index = i;
            }
            if (outputProfiles[i].format == 1003) {
                newProfiles.push(outputProfiles[i]);
            }
        }
        let profile: camera.Profile = (index === -1 ? outputProfiles[Math.round((Math.random() * ((outputProfiles as camera.Profile[]).length - 1)))]
            : outputProfiles[index]);
        for (let index = 0; index < newProfiles.length - 1; index++) {
            if (newProfiles[index].size.width == profile.size.width && newProfiles[index].size.height == profile.size.height) {
                profile = newProfiles[index];
            }
        }
        return profile;
    }
    private getAspectRatio(): number {
        switch (this.curMode) {
            case CaptureMode.PHOTO:
            case CaptureMode.PREVIEW_FRAME:
                return CameraPreviewAspectRatio.ASPECT_RATIO_4_3;
            case CaptureMode.VIDEO:
                return CameraPreviewAspectRatio.ASPECT_RATIO_16_9;
            default:
                return CameraPreviewAspectRatio.ASPECT_RATIO_1_1;
                break;
        }
    }
    private setDefaultPreviewRation() {
        if (this.curCameraPosition === CameraPosition.BACK) {
            this.outputRationRange = (this.captureSession as camera.CaptureSession).getZoomRatioRange();
            this.setZoomRatio(this.outputRationRange[0]);
        }
    }
    private async stopPreview() {
        if (this.isSessionStart) {
            this.cameraLifecycleProxy.onPreviewStop();
            await (this.captureSession as camera.CaptureSession).stop();
        }
    }
    // 扫码解析
    async initPreviewFrame() {
        let mReceiver = image.createImageReceiver((this.previewProfile as camera.Profile).size.width, (this.previewProfile as camera.Profile).size.height, 2000, 8);
        let mSurfaceId = await mReceiver.getReceivingSurfaceId();
        this.cameraOutput = (this.cameraManager as camera.CameraManager).createPreviewOutput(this.previewProfile as camera.Profile, mSurfaceId);
        (this.captureSession as camera.CaptureSession).addOutput(this.cameraOutput as camera.CameraOutput);
        // 相机扫描
        mReceiver.on('imageArrival', async () => {
            let imageData = await mReceiver.readNextImage();
            let imageComponent = await imageData.getComponent(4);
            let imageBuffer = imageComponent.byteBuffer;
            this.cameraLifecycleProxy.onCaptureSuccess(this.curMode, imageBuffer);
            // todo hj decode
            if (this.isRun) {
                this.isRun = false;
                let result = await this.decode(imageData, imageComponent);
                let decodeResult: string = "";
                if (result != undefined) {
                    decodeResult = result as string;
                    AppStorage.setOrCreate(CameraCodeScanConst.QR_CODE_PARSE_RESULT, decodeResult);
                    console.log("decodeText==AppStorage" + decodeResult);
                }
                console.log("decodeText==" + result);
            }
            await imageData.release();
        });
    }
    // 相机扫码解析函数
    async decode(imageData: image.Image, imageComponent: image.Component): Promise<string | undefined | void> {
        try {
            let width = imageData.size.width;
            let height = imageData.size.height;
            const int32Array = new Uint8ClampedArray(imageComponent.byteBuffer);
            const luminanceSource = new RGBLuminanceSource(int32Array, width, height);
            const binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource));
            const reader = new MultiFormatReader();
            const hints: Map<DecodeHintType, Array<BarcodeFormat>> = new Map();
            hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.CODABAR, BarcodeFormat.QR_CODE]);
            reader.setHints(hints);
            let result = reader.decode(binaryBitmap);
            let text = result.getText();
            clearTimeout(this.timeId);
            this.isRun = true;
            return text;
        }
        catch (e) {
            this.timeId = setTimeout(() => {
                this.isRun = true;
            }, 100);
            console.log("decodeText.e==" + e);
        }
    }
    /**
     * 解析图片二维码信息
     * @param canvasContext
     * @param imageSrc
     */
    async parseImageQRCode(imageSrc: string): Promise<DecodeResultAttribute> {
        let imageSource = await this.getImageSource(imageSrc);
        // 相册图片的宽高
        const width = imageSource.width;
        const height = imageSource.height;
        let num = imageSource.pixelMap.getPixelBytesNumber();
        // 相册图片的arrayBuffer
        let arrayBuffer: ArrayBuffer = new ArrayBuffer(num);
        await imageSource.pixelMap.readPixelsToBuffer(arrayBuffer);
        const int32Array = new Int32Array(arrayBuffer);
        const luminanceSource = new RGBLuminanceSource(int32Array, width, height);
        const binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource));
        const reader = new MultiFormatReader();
        const hints: Map<DecodeHintType, Array<BarcodeFormat>> = new Map();
        hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.QR_CODE]);
        reader.setHints(hints);
        try {
            // 解析二维码
            let decodeResult = reader.decode(binaryBitmap);
            let decodeText = decodeResult.getText();
            return {
                isSucess: true, decodeResult: decodeText
            };
        }
        catch (err) {
            let error = `The error is ${err}`;
            return {
                isSucess: false, decodeResult: error
            };
        }
    }
    /**
     * 获取图片的属性
     * @param context
     * @param imageSrc
     */
    async getImageSource(imageSrc: string): Promise<ImageAttribute> {
        let media = mediaLibrary.getMediaLibrary(AppStorage.Get<common.UIAbilityContext>('context'));
        let imagesIdFetchOp: mediaLibrary.MediaFetchOptions = {
            selections: ``,
            selectionArgs: [],
            uri: imageSrc
        };
        // 获取图片文件资源
        let fetchIdFileResult = await media.getFileAssets(imagesIdFetchOp);
        let fileIdAsset = await fetchIdFileResult.getFirstObject();
        // 将字符串分割，下标为1的数据即为图片类型
        let imgType = fileIdAsset.displayName.split('.')[1];
        // 获取文件描述符
        let fd = await fileIdAsset.open('RW');
        let context = AppStorage.Get<common.UIAbilityContext>('context');
        // 获取当前时间
        let time = new Date().getTime();
        // 拼接路径
        let imagePath = `${context?.cacheDir}/${time.toString()}_note.${imgType}`;
        // 将图片copy到此路径当中
        await fileio.copyFile(fd, imagePath);
        // 创建一个图片源类
        let imageSource = image.createImageSource(imagePath);
        // 创建PixelMap数组
        let pixelMap = await imageSource.createPixelMap();
        // 4、关闭安fd,Asset
        await fileIdAsset.close(fd);
        return {
            width: fileIdAsset.width, height: fileIdAsset.height, pixelMap: pixelMap
        };
    }
    public async startCapture() {
        if (this.isSessionStart && !this.isCapturing()) {
            this.isSessionCapture = true;
        }
    }
    public async stopCapture() {
        if (this.isCapturing()) {
            this.isSessionCapture = false;
            this.cameraLifecycleProxy.onCaptureStop(this.curMode);
        }
    }
    public async switchCamera() {
        let targetPosition = (this.curCameraPosition === CameraPosition.FRONT)
            ? CameraPosition.BACK
            : CameraPosition.FRONT;
        this.configureCamera(targetPosition);
    }
    // 配置相机
    public async configureCamera(cameraPosition: CameraPosition) {
        let targetCameraIndex = (this.camerasInfo as Array<camera.CameraDevice>).findIndex((checkCamera) => {
            return checkCamera.cameraPosition.valueOf() === cameraPosition.valueOf();
        });
        if (targetCameraIndex >= 0) {
            this.curCameraPosition = cameraPosition;
            let cameraDevice = (this.camerasInfo as Array<camera.CameraDevice>)[targetCameraIndex];
            await this.stopCapture();
            await this.stopPreview();
            this.outputCapability = (this.cameraManager as camera.CameraManager).getSupportedOutputCapability(cameraDevice);
            await this.setDefaultPreviewResolution();
            await this.buildCameraIO(cameraDevice);
            await this.startPreview();
            this.setDefaultPreviewRation();
        }
    }
    public getOutputProfiles(resolution: CameraResolutionType): camera.Profile[] | void {
        switch (resolution) {
            case CameraResolutionType.PREVIEW:
                return (this.outputCapability as camera.CameraOutputCapability).previewProfiles;
        }
    }
    public getOutputProfile(resolution: CameraResolutionType): camera.Profile | void {
        switch (resolution) {
            case CameraResolutionType.PREVIEW:
                return (this.previewProfile as camera.Profile);
        }
    }
    public async setZoomRatio(zoomRatio: number): Promise<number> {
        if (this.curCameraPosition === CameraPosition.FRONT) {
            return this.outputRation;
        }
        if (this.outputRationRange != null) {
            let ratioMin = this.outputRationRange[0];
            let ratioMax = this.outputRationRange[1];
            let ratio = Number(Math.max(ratioMin, Math.min(ratioMax, zoomRatio)).toFixed(1));
            (this.captureSession as camera.CaptureSession).setZoomRatio(ratio);
            this.outputRation = ratio;
            this.cameraLifecycleProxy.onRatioChanged(this.outputRation, this.outputRationRange);
        }
        return this.outputRation;
    }
    public getZoomRatioRange(): Array<number> {
        return this.outputRationRange;
    }
    public isCapturing() {
        return this.isSessionCapture;
    }
    public getCaptureMode(): CaptureMode {
        return this.curMode;
    }
    public addLifecycleListener(listener: CameraLifecycle) {
        this.cameraLifecycleProxy.addListener(listener);
    }
    async release() {
        this.stopCapture();
        if (this.isSessionStart) {
            await (this.captureSession as camera.CaptureSession).stop();
            await (this.captureSession as camera.CaptureSession).release();
            this.isSessionStart = false;
            this.isSessionCapture = false;
        }
    }
    async destroy() {
        await this.release();
        this.cameraLifecycleProxy.onDestroy();
        this.cameraLifecycleProxy.removeAllListener();
    }
}
