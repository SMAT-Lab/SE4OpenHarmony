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

import camera from '@ohos.multimedia.camera'
import image from '@ohos.multimedia.image'
import mediaLibrary from '@ohos.multimedia.mediaLibrary'
import media from '@ohos.multimedia.media';
import deviceInfo from '@ohos.deviceInfo';
import type common from '@ohos.app.ability.common'
import MediaModel from './MediaModel'
import Logger from '../utils/Logger'

const TAG: string = '[CameraModel]'

const CAMERASIZE = {
  WIDTH: 1920,
  HEIGHT: 1080
}

/**
 * 相机服务
 */
export default class CameraModel {
  private cameraInput: camera.CameraInput;
  private previewOutput: camera.PreviewOutput;
  private fileAsset: mediaLibrary.FileAsset;
  private photoUri: string = '';
  private mediaModel: MediaModel;
  private fd: number = -1;
  private receiver: image.ImageReceiver;
  private context: any;
  private cameraManager: camera.CameraManager;
  private cameras: Array<camera.CameraDevice>;
  private photoOutPut: camera.PhotoOutput;
  private captureSession: camera.CaptureSession;
  private cameraOutputCapability: camera.CameraOutputCapability;
  private videoOutput: camera.VideoOutput;
  private avRecorder: media.AVRecorder;

  private avRecorderProfile: media.VideoRecorderProfile = {
    audioBitrate: 48000,
    audioChannels: 2,
    audioCodec: media.CodecMimeType.AUDIO_AAC,
    audioSampleRate: 48000,
    fileFormat: media.ContainerFormatType.CFT_MPEG_4,
    videoBitrate: 2000000,
    videoCodec: media.CodecMimeType.VIDEO_MPEG4,
    videoFrameWidth: 640,
    videoFrameHeight: 480,
    videoFrameRate: 30
  }

  private videoSourceType = 0;

  constructor(context: common.Context) {
    this.context = context
    this.mediaModel = MediaModel.getMediaInstance(context)
    // 服务端代码，创建ImageReceiver
    this.receiver = image.createImageReceiver(CAMERASIZE.WIDTH, CAMERASIZE.HEIGHT, 4, 8) // 4表示生成的图像格式，8表示用户希望同时访问的最大图像数
    Logger.info(TAG, `createImageReceiver`)
    // 获取Surface ID
    this.receiver.getReceivingSurfaceId((surfaceId) => {
      Logger.info(TAG, `getReceivingSurfaceId surfaceId is ${surfaceId}`)
    })
    // 注册Surface的监听，在surface的buffer准备好后触发
    this.receiver.on('imageArrival', () => {
      Logger.info(TAG, `imageArrival`)
      // 去获取Surface中最新的buffer
      this.receiver.readNextImage((err, image) => {
        Logger.info(TAG, `readNextImage`)
        if (err || image === undefined) {
          Logger.error(TAG, `failed to get valid image`)
          return
        }
        image.getComponent(4, (errMsg, img) => {
          // 4表示图像类型为JPEG
          // 消费component.byteBuffer，例如：将buffer内容保存成图片。
          Logger.info(TAG, `getComponent`)
          if (errMsg || img === undefined) {
            Logger.info(TAG, `failed to get valid buffer`)
            return
          }
          let buffer = new ArrayBuffer(4096)
          if (img.byteBuffer) {
            buffer = img.byteBuffer
          } else {
            Logger.error(TAG, `img.byteBuffer is undefined`)
          }
        })
      })
    })
  }

  /**
   * 创建相机
   */
  async createCamera(surfaceId: string): Promise<void> {
    Logger.info(TAG, `initCamera surfaceId:${surfaceId}`);
    // await this.releaseCamera();
    Logger.info(TAG, `deviceInfo.deviceType = ${deviceInfo.deviceType}`);
    if (deviceInfo.deviceType === 'default') {
      Logger.info(TAG, `deviceInfo.deviceType default 1 = ${deviceInfo.deviceType}`);
      this.videoSourceType = 1;
      Logger.info(TAG, `deviceInfo.deviceType default 2 = ${deviceInfo.deviceType}`);
    } else {
      Logger.info(TAG, `deviceInfo.deviceType other 1 = ${deviceInfo.deviceType}`);
      this.videoSourceType = 0;
      Logger.info(TAG, `deviceInfo.deviceType other 2 = ${deviceInfo.deviceType}`);
    }
    Logger.info(TAG, `getCameraManager begin`);
    try {
      Logger.info(TAG, `getCameraManager try begin`);
      this.cameraManager = camera.getCameraManager(this.context);
      Logger.info(TAG, `getCameraManager try end`);
    } catch (e) {
      Logger.info(TAG, `getCameraManager catch e:${JSON.stringify(e)}`);
    }
    Logger.info(TAG, `getCameraManager end`);
    Logger.info(TAG, `getCameraManager ${JSON.stringify(this.cameraManager)}`);
    this.cameras = this.cameraManager.getSupportedCameras();
    Logger.info(TAG, `createCamera get cameras ${this.cameras.length}`);
    if (this.cameras.length === 0) {
      Logger.info(TAG, 'cannot get cameras');
      return;
    }

    Logger.info(TAG, `createCamera cameras=${this.cameras}`);
    let mCamera = this.cameras[0];
    Logger.info(TAG, `createCamera mCamera=${mCamera}`);
    this.cameraInput = this.cameraManager.createCameraInput(mCamera);
    Logger.info(TAG, `createCamera cameraInput=${this.cameraInput}`);
    this.cameraInput.open();
    Logger.info(TAG, 'createCameraInput');
    this.cameraOutputCapability = this.cameraManager.getSupportedOutputCapability(mCamera);
    let previewProfile = this.cameraOutputCapability.previewProfiles[0];
    this.previewOutput = this.cameraManager.createPreviewOutput(
      previewProfile,
      surfaceId
    );
    Logger.info(TAG, 'createPreviewOutput');
    let rSurfaceId = await this.receiver.getReceivingSurfaceId();
    let photoProfile = this.cameraOutputCapability.photoProfiles[0];
    this.photoOutPut = this.cameraManager.createPhotoOutput(
      photoProfile,
      rSurfaceId
    );
    this.captureSession = this.cameraManager.createCaptureSession();
    Logger.info(TAG, 'createCaptureSession');
    this.captureSession.beginConfig();
    Logger.info(TAG, 'beginConfig');
    this.captureSession.addInput(this.cameraInput);
    this.captureSession.addOutput(this.previewOutput);
    this.captureSession.addOutput(this.photoOutPut);
    await this.captureSession.commitConfig();
    await this.captureSession.start();
    Logger.info(TAG, 'captureSession start');
  }

  /**
   * 开始录像
   */
  async startVideo(): Promise<void> {
    Logger.info(TAG, 'startVideo begin');
    Logger.info(TAG, 'startVideo 1');
    await this.captureSession.stop();
    Logger.info(TAG, 'startVideo 2');
    this.captureSession.beginConfig();
    Logger.info(TAG, 'startVideo 3');
    if (this.videoOutput) {
      try {
        Logger.info(TAG, 'startVideo 4');
        this.captureSession.removeOutput(this.videoOutput);
      } catch (e) {
        Logger.info(TAG, `startVideo catch e:${e}`);
      }
    }
    if (this.videoOutput) {
      try {
        Logger.info(TAG, 'startVideo 5');
        this.captureSession.removeOutput(this.videoOutput);
        Logger.info(TAG, 'startVideo 6');
      } catch (e) {
        Logger.info(TAG, `startVideo catch e:${JSON.stringify(e)}`);
      }
      try {
        Logger.info(TAG, 'startVideo release');
        await this.videoOutput.release();
      } catch (e) {
        Logger.info(TAG, `startVideo catch e:${JSON.stringify(e)}`);
      }
    }
    Logger.info(TAG, 'startVideo 7');
    this.fileAsset = await this.mediaModel.createAndGetUri(mediaLibrary.MediaType.VIDEO);
    Logger.info(TAG, `startVideo fileAsset:${this.fileAsset}`);
    this.fd = await this.mediaModel.getFdPath(this.fileAsset);
    Logger.info(TAG, `startVideo fd:${this.fd}`);
    this.avRecorder = await media.createAVRecorder();

    Logger.info(TAG, `startVideo into createAVRecorder:${this.avRecorder}`);
    if (this.avRecorder != null) {
      Logger.info(TAG, `startVideo createAVRecorder success:${this.avRecorder}`);

      let videoConfig: media.VideoRecorderConfig = {
        audioSourceType: 1,
        videoSourceType: this.videoSourceType,
        profile: this.avRecorderProfile,
        url: `fd://${this.fd}`,
        rotation: 0
      }

      Logger.info(TAG, `startVideo videoConfig:${JSON.stringify(videoConfig)}`);
      try {
        await this.avRecorder.prepare(videoConfig);
      } catch (err) {
        Logger.info(TAG, `startVideo err:${err}`);
      }

      Logger.info(TAG, `startVideo prepare`);
      let videoId = await this.avRecorder.getInputSurface();
      let videoProfile = this.cameraOutputCapability.videoProfiles[0];
      Logger.info(TAG, `startVideo capability.videoProfiles[]=: ${JSON.stringify(this.cameraOutputCapability.videoProfiles)}`);
      Logger.info(TAG, `startVideo videoProfile:${JSON.stringify(videoProfile)}`);
      this.videoOutput = this.cameraManager.createVideoOutput(videoProfile, videoId);
      Logger.info(TAG, `startVideo videoOutput:${this.videoOutput}`);
      this.captureSession.addOutput(this.videoOutput);
      Logger.info(TAG, `startVideo addOutput`);
      await this.captureSession.commitConfig();
      Logger.info(TAG, `startVideo commitConfig`);
      await this.captureSession.start();
      Logger.info(TAG, `startVideo commitConfig captureSession`);
      await this.videoOutput.start();
      Logger.info(TAG, `startVideo commitConfig videoOutput`);
      await this.avRecorder.start();
      Logger.info(TAG, 'startVideo end');

    } else {
      Logger.info(TAG, `startVideo createAVRecorder fail, error null`);
    }
  }

  /**
   * 停止录像
   */
  async stopVideo(): Promise<string> {
    Logger.info(TAG, 'stopVideo called');
    await this.avRecorder.stop();
    await this.avRecorder.release();
    await this.videoOutput.stop();
    // 停止结束时复制录制的视频至沙箱cache目录中
    let fileName = await this.copyVideo();
    await this.fileAsset.close(this.fd);
    return fileName;
  }

  /**
   * 复制视频至video
   */
  async copyVideo(): Promise<string> {
    let url = this.fileAsset.uri;
    Logger.info(TAG, `stopVideo uri:${url}`);
    let fileName = await this.mediaModel.copyVideo(this.fd);
    Logger.info(TAG, `stopVideo fileName:${fileName}`);
    return fileName;
  }

  /**
   * 关闭相机
   */
  async releaseCamera(): Promise<void> {
    Logger.info(TAG, `releaseCamera start`);
    if (this.cameraInput) {
      await this.cameraInput.close();
    }
    if (this.previewOutput) {
      await this.previewOutput.release();
    }
    if (this.photoOutPut) {
      await this.photoOutPut.release();
    }
    if (this.videoOutput) {
      await this.videoOutput.release();
    }
    if (this.captureSession) {
      await this.captureSession.release();
    }
    Logger.info(TAG, `releaseCamera end`);
  }
}

