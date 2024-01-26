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
import { BusinessError } from '@ohos.base';
import camera from '@ohos.multimedia.camera';
import common from '@ohos.app.ability.common';
import image from '@ohos.multimedia.image';
import textRecognition from '@hms.ai.ocr.textRecognition';
import Logger from './Logger';
import CommonConstants from '../constants/CommonConstants';

const TAG: string = '[CameraModel]';

export default class Camera {
  private cameraMgr: camera.CameraManager | undefined = undefined;
  private cameraDevice: camera.CameraDevice | undefined = undefined;
  private capability: camera.CameraOutputCapability | undefined = undefined;
  private cameraInput: camera.CameraInput | undefined = undefined;
  public previewOutput: camera.PreviewOutput | undefined = undefined;
  private receiver: image.ImageReceiver | undefined = undefined;
  private photoSurfaceId: string | undefined = undefined;
  private photoOutput: camera.PhotoOutput | undefined = undefined;
  private captureSession: camera.CaptureSession | undefined = undefined;
  public result: string = '';
  private imgReceive: Function | undefined = undefined;

  async initCamera(surfaceId: string): Promise<void> {
    this.cameraMgr = camera.getCameraManager(getContext(this) as common.UIAbilityContext);
    let cameraArray = this.getCameraDevices(this.cameraMgr);
    this.cameraDevice = cameraArray[CommonConstants.INPUT_DEVICE_INDEX];
    this.cameraInput = this.getCameraInput(this.cameraDevice, this.cameraMgr) as camera.CameraInput;
    await this.cameraInput.open();
    this.capability = this.cameraMgr.getSupportedOutputCapability(this.cameraDevice);

    // Preview output stream
    this.previewOutput = this.getPreviewOutput(this.cameraMgr, this.capability, surfaceId) as camera.PreviewOutput;

    // Photo output stream
    this.receiver = image.createImageReceiver(CommonConstants.IMAGE_RECEIVER_WIDTH, CommonConstants.IMAGE_RECEIVER_HEIGHT,
      image.ImageFormat.JPEG, CommonConstants.IMAGE_RECEIVER_CAPACITY);
    this.photoSurfaceId = await this.getImageReceiverSurfaceId(this.receiver) as string;
    this.photoOutput = this.getPhotoOutput(this.cameraMgr, this.capability, this.photoSurfaceId) as camera.PhotoOutput;
    this.receiver!.on('imageArrival', this.imgReceive = async () => {
      let receiverImage = await this.receiver!.readLatestImage();
      let buffer = new ArrayBuffer(CommonConstants.ARRAYBUFFER_SIZE);
      let img = await receiverImage.getComponent(image.ComponentType.JPEG);
      buffer = img!.byteBuffer;
      await this.previewOutput!.stop();
      this.result = await this.recognizeImage(buffer);
      await receiverImage.release();
    })

    // Session Init
    this.captureSession = this.getCaptureSession(this.cameraMgr) as camera.CaptureSession;
    this.beginConfig(this.captureSession);
    this.startSession(this.captureSession, this.cameraInput, this.previewOutput, this.photoOutput);
  }

  async takePicture() {
    this.result = '';
    this.photoOutput!.capture();
  }

  async recognizeImage(buffer: ArrayBuffer): Promise<string> {
    let imageResource = image.createImageSource(buffer);
    let pixelMapInstance = await imageResource.createPixelMap();
    let visionInfo: textRecognition.VisionInfo = {
      pixelMap: pixelMapInstance
    };
    let textConfiguration: textRecognition.TextRecognitionConfiguration = {
      isDirectionDetectionSupported: true
    };
    let recognitionString: string = '';
    if (canIUse("SystemCapability.AI.OCR.TextRecognition")) {
      await textRecognition.recognizeText(visionInfo, textConfiguration).then((TextRecognitionResult) => {
        recognitionString = TextRecognitionResult.value;
      }).catch((err: BusinessError) => {
        let context = getContext(this) as common.UIAbilityContext
        recognitionString = context.resourceManager.getStringSync($r('app.string.unrecognizable').id);
        Logger.error(TAG, `recognizeText faild ${err}`);
      })
      pixelMapInstance.release();
      imageResource.release();
    } else {
      let context = getContext(this) as common.UIAbilityContext
      recognitionString = context.resourceManager.getStringSync($r('app.string.Device_not_support').id);
      Logger.error(TAG, `device not support`);
    }
    return recognitionString;
  }

  async releaseCamera(): Promise<void> {
    if (this.cameraInput) {
      await this.cameraInput.close();
      Logger.info(TAG, 'cameraInput release');
    }
    if (this.previewOutput) {
      await this.previewOutput.release();
      Logger.info(TAG, 'previewOutput release');
    }
    if (this.receiver) {
      await this.receiver.release();
      Logger.info(TAG, 'receiver release');
    }
    if (this.photoOutput) {
      await this.photoOutput.release();
      Logger.info(TAG, 'photoOutput release');
    }
    if (this.captureSession) {
      await this.captureSession.release();
      Logger.info(TAG, 'captureSession release');
      this.captureSession = undefined;
    }
    this.imgReceive = undefined;
  }

  getCameraDevices(cameraManager: camera.CameraManager): Array<camera.CameraDevice> {
    let cameraArray: Array<camera.CameraDevice> = cameraManager.getSupportedCameras();
    if (cameraArray != undefined && cameraArray.length > 0) {
      return cameraArray;
    } else {
      Logger.error(TAG, `getSupportedCameras faild`);
      return [];
    }
  }

  getCameraInput(cameraDevice: camera.CameraDevice, cameraManager: camera.CameraManager): camera.CameraInput | undefined {
    let cameraInput: camera.CameraInput | undefined = undefined;
    cameraInput = cameraManager.createCameraInput(cameraDevice);
    return cameraInput;
  }

  getPreviewOutput(cameraManager: camera.CameraManager, cameraOutputCapability: camera.CameraOutputCapability,
                   surfaceId: string): camera.PreviewOutput | undefined {
    let previewProfilesArray: Array<camera.Profile> = cameraOutputCapability.previewProfiles;
    let previewOutput: camera.PreviewOutput | undefined = undefined;
    previewOutput = cameraManager.createPreviewOutput(previewProfilesArray[CommonConstants.OUTPUT_DEVICE_INDEX], surfaceId);
    return previewOutput;
  }

  async startPreviewOutput(previewOutput: camera.PreviewOutput): Promise<void> {
    previewOutput.start().then(() => {
      Logger.info(TAG, `previewOutput start success`);
    }).catch((err: BusinessError) => {
      Logger.error(TAG, `previewOutput start faild errorCode =  ${err.code}`);
    });
  }

  async getImageReceiverSurfaceId(receiver: image.ImageReceiver): Promise<string | undefined> {
    let photoSurfaceId: string | undefined = undefined;
    if (receiver !== undefined) {
      photoSurfaceId = await receiver.getReceivingSurfaceId();
      Logger.info(TAG, `getReceivingSurfaceId success`);
    }
    return photoSurfaceId;
  }

  getPhotoOutput(cameraManager: camera.CameraManager, cameraOutputCapability: camera.CameraOutputCapability,
                 photoSurfaceId: string): camera.PhotoOutput | undefined {
    let photoProfilesArray: Array<camera.Profile> = cameraOutputCapability.photoProfiles;
    if (!photoProfilesArray) {
      Logger.info(TAG, `createOutput photoProfilesArray == null || undefined`);
    }
    let photoOutput: camera.PhotoOutput | undefined = undefined;
    try {
      photoOutput = cameraManager.createPhotoOutput(photoProfilesArray[CommonConstants.OUTPUT_DEVICE_INDEX], photoSurfaceId);
    } catch (error) {
      Logger.error(TAG, `Failed to createPhotoOutput. error: ${JSON.stringify(error as BusinessError)}`);
    }
    return photoOutput;
  }

  getCaptureSession(cameraManager: camera.CameraManager): camera.CaptureSession | undefined {
    let captureSession: camera.CaptureSession | undefined = undefined;
    try {
      captureSession = cameraManager.createCaptureSession();
    } catch (error) {
      Logger.error(TAG, `Failed to create the CaptureSession instance. error: ${JSON.stringify(error as BusinessError)}`);
    }
    return captureSession;
  }

  beginConfig(captureSession: camera.CaptureSession): void {
    try {
      captureSession.beginConfig();
    } catch (error) {
      Logger.error(TAG, `Failed to beginConfig. error: ${JSON.stringify(error as BusinessError)}`);
    }
  }

  async startSession(captureSession: camera.CaptureSession, cameraInput: camera.CameraInput, previewOutput:
    camera.PreviewOutput, photoOutput: camera.PhotoOutput): Promise<void> {
    captureSession.addInput(cameraInput);
    captureSession.addOutput(previewOutput);
    captureSession.addOutput(photoOutput);
    await captureSession.commitConfig();
    await captureSession.start();
  }
}