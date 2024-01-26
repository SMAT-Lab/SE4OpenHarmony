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
// @ts-nocheck

import camera from '@ohos.multimedia.camera'
import deviceInfo from '@ohos.deviceInfo'
import fileio from '@ohos.fileio'
import image from '@ohos.multimedia.image'
import media from '@ohos.multimedia.media'
import mediaLibrary from '@ohos.multimedia.mediaLibrary'
import Logger from '../../model/Logger'
import MediaUtils from './MediaUtils'
import ThumbnailGetter from './ThumbnailGetter'

const CameraSize = {
  WIDTH: 1280,
  HEIGHT: 720
}
const TAG = 'CameraService'

class CameraService {
  private static instance: CameraService = new CameraService()
  private mediaUtil = MediaUtils.getInstance()
  private cameraManager: camera.CameraManager = undefined
  cameras: Array<camera.CameraDevice> = undefined
  private cameraInput: camera.CameraInput = undefined
  private previewOutput: camera.PreviewOutput = undefined
  private photoOutput: camera.PhotoOutput = undefined
  private cameraOutputCapability: camera.CameraOutputCapability = undefined
  private captureSession: camera.CaptureSession = undefined
  private mReceiver: image.ImageReceiver = undefined
  private videoPrepareFile: mediaLibrary.FileAsset = undefined
  private mFileAssetId = 0
  private avRecorder: media.AVRecorder = undefined
  private videoOutput: camera.VideoOutput = undefined
  private mThumbnailGetter = new ThumbnailGetter()
  private handleTakePicture: (photoUri: string) => void = undefined
  private videoConfig: any = {
    audioSourceType: 1,
    videoSourceType: 1,
    profile: {
      audioBitrate: 48000,
      audioChannels: 1,
      audioCodec: 'audio/mp4a-latm',
      audioSampleRate: 48000,
      fileFormat: 'mp4',
      videoBitrate: 280000,
      videoCodec: 'video/avc',
      videoFrameWidth: 640,
      videoFrameHeight: 480,
      videoFrameRate: 30,
    },
    rotation: 0,
    url: '',
    orientationHint: 0,
    location: { latitude: 30, longitude: 130 },
  }
  private videoProfileObj: camera.VideoProfile = {
    format: 1,
    size: {
      "width": 640,
      "height": 480
    },
    frameRateRange: {
      "min": 5,
      "max": 5
    }
  }
  private photoProfileObj: camera.Profile = {
    format: 1,
    size: {
      "width": 640,
      "height": 480
    }
  }
  private videoOutputStopBol: boolean = true
  resolution: any = null
  photoResolution: any = null
  videoResolution: any = null

  constructor() {
    try {
      this.mReceiver = image.createImageReceiver(CameraSize.WIDTH, CameraSize.HEIGHT, image.ImageFormat.JPEG, 8)
      Logger.info(TAG, 'createImageReceiver')
      this.mReceiver.on('imageArrival', () => {
        Logger.info(TAG, 'imageArrival')
        this.mReceiver.readNextImage((err, image) => {
          Logger.info(TAG, 'readNextImage')
          if (err || image === undefined) {
            Logger.error(TAG, 'failed to get valid image')
            return
          }
          image.getComponent(4, (errMsg, img) => {
            Logger.info(TAG, 'getComponent')
            if (errMsg || img === undefined) {
              Logger.info(TAG, 'failed to get valid buffer')
              return
            }
            let buffer
            if (img.byteBuffer) {
              buffer = img.byteBuffer
            } else {
              Logger.error(TAG, 'img.byteBuffer is undefined')
            }
            this.savePicture(buffer, image)
          })
        })
      })
    } catch (err) {
      Logger.info(TAG, `image Receiver err ${err.message}`)
    }
  }

  async savePicture(buffer: ArrayBuffer, img: image.Image) {
    try {
      Logger.info(TAG, 'savePicture')
      let imgFileAsset = await this.mediaUtil.createAndGetUri(mediaLibrary.MediaType.IMAGE)
      let imgPhotoUri = imgFileAsset.uri
      Logger.info(TAG, `photoUri = ${imgPhotoUri}`)
      let imgFd = await this.mediaUtil.getFdPath(imgFileAsset)
      Logger.info(TAG, `fd = ${imgFd}`)
      await fileio.write(imgFd, buffer)
      await imgFileAsset.close(imgFd)
      await img.release()
      Logger.info(TAG, 'save image done')
      if (this.handleTakePicture) {
        this.handleTakePicture(imgPhotoUri)
      }
    } catch (err) {
      Logger.info(TAG, `save picture err ${err.message}`)
    }
  }

  public async createVideoFd(): Promise<number> {
    Logger.info(TAG, `getVideoFd E`)
    try {
      let dataUri = await this.mediaUtil.createAndGetUri(mediaLibrary.MediaType.VIDEO)
      this.videoPrepareFile = await this.mediaUtil.queryFile(dataUri);
      const fdNumber = await this.videoPrepareFile.open('Rw')
      return fdNumber;
    } catch (err) {
      Logger.error(TAG, `createVideoFd err: ` + err)
    }
    Logger.info(TAG, `getVideoFd X`)
  }

  async initCamera(surfaceId: number, cameraDeviceIndex: number, obj?, photoIndex?, previewObj?) {
    try {
      if (deviceInfo.deviceType === 'default') {
        this.videoConfig.videoSourceType = 1
      } else {
        this.videoConfig.videoSourceType = 1
      }
      Logger.info(TAG, `cameraDeviceIndex success: ${cameraDeviceIndex}`)
      await this.releaseCamera()
      await this.getCameraManagerFn()
      await this.getSupportedCamerasFn()
      await this.getSupportedOutputCapabilityFn(cameraDeviceIndex)
      if (previewObj) {
        previewObj.format = this.cameraOutputCapability.previewProfiles[0].format
        Logger.info(TAG, `previewObj format: ${previewObj.format}`)
      }
      await this.createPreviewOutputFn(previewObj ? previewObj : this.cameraOutputCapability.previewProfiles[0], surfaceId)
      await this.createPhotoOutputFn(obj ? obj : this.cameraOutputCapability.photoProfiles[photoIndex?photoIndex:0])
      await this.createCameraInputFn(this.cameras[cameraDeviceIndex])
      await this.cameraInputOpenFn()
      await this.sessionFlowFn()

    } catch (err) {
      Logger.info(TAG, 'initCamera err: ' + JSON.stringify(err.message))
    }
  }

  setTakePictureCallback(callback) {
    this.handleTakePicture = callback
  }
  // 拍照
  async takePicture(imageRotation?) {
    try {
      Logger.info(TAG, 'takePicture start')
      let photoSettings = {
        rotation: imageRotation ? Number(imageRotation) : 0,
        quality: 1,
        location: {
          latitude: 0,
          longitude: 0,
          altitude: 0
        },
        mirror: false
      }
      Logger.info(TAG, `photoOutput capture photoSettings: ` + JSON.stringify(photoSettings))
      await this.photoOutput.capture(photoSettings)
      Logger.info(TAG, 'takePicture end')
    } catch (err) {
      Logger.info(TAG, `takePicture fail err: ${err}, message: ${err.message}, code: ${err.code}`)
    }
  }

  public async createVideoOutput() {
    Logger.info(TAG, `createVideoOutput start`)
    Logger.info(TAG, `createVideoOutput saveCameraAsset: ${this.mSaveCameraAsset}`)
    this.mFileAssetId = await this.createVideoFd()
    this.videoConfig.url = `fd://${this.mFileAssetId.toString()}`
    await media.createAVRecorder().then((recorder) => {
      Logger.info(TAG, `createVideoOutput createAVRecorder record: ${recorder}`)
      this.avRecorder = recorder
    })
    if (this.avRecorder != null) {
      this.avRecorder.on('error', (error) => {
        if (error) {
          Logger.error(TAG, `createVideoOutput error: ${JSON.stringify(error)}`)
        }
      })
      Logger.info(TAG, `createVideoOutput size = ${JSON.stringify(this.cameraOutputCapability.videoProfiles[0].size)}`)
      this.videoConfig.profile.videoFrameWidth = this.cameraOutputCapability.videoProfiles[0].size.width
      this.videoConfig.profile.videoFrameHeight = this.cameraOutputCapability.videoProfiles[0].size.height
      Logger.info(TAG, `createVideoOutput videoConfig: ` + JSON.stringify(this.videoConfig))
      await this.avRecorder.prepare(this.videoConfig)
      Logger.info(TAG, `createVideoOutput AVRecorder.prepare succeed.`)
    } else {
      Logger.error(TAG, `createVideoOutput createAVRecorder failed.`)
      return
    }

    const videoId = await this.avRecorder.getInputSurface()
    Logger.info(`${this.TAG} createVideoOutput profileVideo =  ${JSON.stringify(this.cameraOutputCapability.videoProfiles[0])}.`)
    try {
      this.videoOutput = this.cameraManager.createVideoOutput(this.cameraOutputCapability.videoProfiles[0], videoId)
    } catch (error) {
      Logger.error(TAG, `createVideoOutput failed: ${JSON.stringify(error)}`)
    }
    Logger.info(TAG, `createVideoOutput end`)
  }
  // 开始录制
  async StartRecording() {
    try {
      Logger.info(TAG, `StartRecording begin`)
      await this.captureSession.stop()
      this.captureSession.beginConfig()
      // if (this.videoOutput) {
      //   await this.captureSession.removeOutput(this.videoOutput)
      //   Logger.info(TAG, `old videoOutput has been removed.`)
      // }
      await this.createVideoOutput()
      this.captureSession.addOutput(this.videoOutput)
      Logger.info(TAG, `StartRecording addOutput finished.`)
      await this.captureSession.commitConfig()
      Logger.info(TAG, `StartRecording commitConfig finished.`)
      await this.captureSession.start()
      Logger.info(TAG, `StartRecording Session.start finished.`)
    } catch (err) {
      Logger.info(TAG, `remove videoOutput ${err}`)
    }
    await this.videoOutput.start().then(() => {
      Logger.info(TAG, `videoOutput.start()`)
    })
    await this.avRecorder.start().then(() => {
      Logger.info(TAG, `AVRecorder.start()`)
    })
    Logger.info(TAG, `StartRecording end`)
  }
  // 停止录制
  async stopRecording() {
    if (!this.videoOutput || !this.avRecorder) {
      Logger.error(TAG, `stopRecording error videoOutPut: ${this.videoOutput},AVRecorder: ${this.avRecorder} .`)
      return
    }
    try {
      await this.avRecorder.stop()
      await this.avRecorder.release()
    } catch (err) {
      Logger.error(TAG, `stop AVRecorder ${err}`)
    }

    try {
      await this.videoOutput.stop()
    } catch (err) {
      Logger.error(TAG, `stop videoOutput ${err}`)
    }

    if (this.mFileAssetId != undefined) {
      await this.videoPrepareFile.close(this.mFileAssetId)
      this.mFileAssetId = undefined
      Logger.info(TAG, `fileAsset.close().`)
    }

    const thumbnailPixelMap = await this.mThumbnailGetter.getThumbnailInfo(1280, 960)
    Logger.info(TAG, `stopRecording invoke X.`)
    return thumbnailPixelMap
  }
  // 查询相机设备在模式下支持的输出能力
  async getSupportedOutputCapabilityFn(cameraDeviceIndex) {
    Logger.info(TAG, `cameraOutputCapability cameraId: ${this.cameras[cameraDeviceIndex].cameraId}`)
    // @ts-ignore
    this.cameraOutputCapability = this.cameraManager.getSupportedOutputCapability(this.cameras[cameraDeviceIndex])
    let previewSize = []
    let photoSize = []
    let videoSize = []
    this.cameraOutputCapability.previewProfiles.forEach((item, index) => {
      Logger.info(TAG, `cameraOutputCapability previewProfiles index: ${index}, item:` + JSON.stringify(item))
      previewSize.push({
        value: `${item.size.width}x${item.size.height}`
      })
    })
    this.cameraOutputCapability.photoProfiles.forEach((item, index) => {
      Logger.info(TAG, `cameraOutputCapability photoProfiles index: ${index}, item:` + JSON.stringify(item))
      photoSize.push({
        value: `${item.size.width}x${item.size.height}`
      })
    })
    this.cameraOutputCapability.videoProfiles.forEach((item, index) => {
      Logger.info(TAG, `cameraOutputCapability videoProfiles index: ${index}, item:` + JSON.stringify(item))
      videoSize.push({
        value: `${item.size.width}x${item.size.height}`
      })
    })
    Logger.info(TAG, `cameraOutputCapability previewProfiles:` + JSON.stringify(this.cameraOutputCapability.previewProfiles))
    Logger.info(TAG, `cameraOutputCapability photoProfiles:` + JSON.stringify(this.cameraOutputCapability.photoProfiles))
    Logger.info(TAG, `cameraOutputCapability videoProfiles:` + JSON.stringify(this.cameraOutputCapability.videoProfiles))
    Logger.info(TAG, `cameraOutputCapability previewProfiles previewSize:` + JSON.stringify(previewSize))
    this.resolution = previewSize
    this.photoResolution = photoSize
    this.videoResolution = videoSize
    return previewSize
  }
  // 释放会话及其相关参数
  async releaseCamera() {
    try {
      if (this.cameraInput) {
        await this.cameraInput.release()
      }
      if (this.previewOutput) {
        await this.previewOutput.release()
      }
      if (this.photoOutput) {
        await this.photoOutput.release()
      }
      if (this.videoOutput) {
        await this.videoOutput.release()
      }
      if (this.captureSession) {
        await this.captureSession.release()
      }
      Logger.info(TAG, `releaseCamera success`)
    } catch (err) {
      Logger.info(TAG, `releaseCamera fail err: ${err}, message: ${err.message}, code: ${err.code}`)
    }
  }
  // 释放会话
  async releaseSession() {
    await this.previewOutput.stop()
    await this.photoOutput.release()
    await this.captureSession.release()
    Logger.info(TAG, `releaseSession success`)
  }
  // 获取相机管理器实例
  async getCameraManagerFn() {
    try {
      this.cameraManager = await camera.getCameraManager(globalThis.context)
      Logger.info(TAG, `getCameraManager success: ` + JSON.stringify(this.cameraManager))
    } catch (err) {
      Logger.info(TAG, `getCameraManagerFn fail err: ${err}, message: ${err.message}, code: ${err.code}`)
    }
  }
  // 获取支持指定的相机设备对象
  async getSupportedCamerasFn() {
    try {
      this.cameras = await this.cameraManager.getSupportedCameras()
      Logger.info(TAG, `getSupportedCameras success: ` + JSON.stringify(this.cameras))
      Logger.info(TAG, `getSupportedCameras length success: ${this.cameras.length}`)
    } catch (err) {
      Logger.info(TAG, `getSupportedCamerasFn fail err: ${err}, message: ${err.message}, code: ${err.code}`)
    }
  }
  // 创建previewOutput输出对象
  async createPreviewOutputFn(previewProfilesObj, surfaceId) {
    try {
      Logger.info(TAG, `createPreviewOutputFn previewProfilesObj success: ` + JSON.stringify(previewProfilesObj))
      this.previewOutput = await this.cameraManager.createPreviewOutput(previewProfilesObj, surfaceId.toString())
      Logger.info(TAG, `createPreviewOutputFn success: ` + JSON.stringify(this.previewOutput))
    } catch (err) {
      Logger.info(TAG, `createPreviewOutputFn fail err: ${err}, message: ${err.message}, code: ${err.code}`)
    }
  }
  // 创建photoOutput输出对象
  async createPhotoOutputFn(photoProfileObj) {
    try {
      Logger.info(TAG, `createPhotoOutputFn photoProfileObj success: ` + JSON.stringify(photoProfileObj))
      let mSurfaceId = await this.mReceiver.getReceivingSurfaceId()
      this.photoOutput = await this.cameraManager.createPhotoOutput(photoProfileObj, mSurfaceId)
      Logger.info(TAG, `createPhotoOutputFn success: ` + JSON.stringify(this.photoOutput))
    } catch (err) {
      Logger.info(TAG, `createPhotoOutputFn fail err: ${err}, message: ${err.message}, code: ${err.code}`)
    }
  }
  // 创建cameraInput输出对象
  async createCameraInputFn(cameraDeviceIndex) {
    try {
      this.cameraInput = await this.cameraManager.createCameraInput(cameraDeviceIndex)
      Logger.info(TAG, `createCameraInputFn success: ${this.cameraInput}`)
    } catch (err) {
      Logger.info(TAG, `createCameraInputFn fail err: ${err}, message: ${err.message}, code: ${err.code}`)
    }
  }
  // 打开相机
  async cameraInputOpenFn() {
    await this.cameraInput.open()
      .then((data) => {
        Logger.info(TAG, `cameraInputOpenFn open success: ${data}`)
      })
      .catch((err) => {
        Logger.info(TAG, `cameraInputOpenFn fail err: ${err}, message: ${err.message}, code: ${err.code}`)
      })
  }
  // 会话流程
  async sessionFlowFn() {
    try {
      // 创建captureSession实例
      this.captureSession = await this.cameraManager.createCaptureSession()
      // 开始配置会话
      await this.captureSession.beginConfig()
      // cameraInput加入会话
      await this.captureSession.addInput(this.cameraInput)
      // previewOutput加入会话
      await this.captureSession.addOutput(this.previewOutput)
      // photoOutput加入会话
      await this.captureSession.addOutput(this.photoOutput)
      // 提交配置会话
      await this.captureSession.commitConfig()
      // 开启会话
      await this.captureSession.start()
      Logger.info(TAG, `sessionFlowFn success`)
    } catch (err) {
      Logger.info(TAG, `sessionFlowFn fail err: ${err}, message: ${err.message}, code: ${err.code}`)
    }
  }
}

export default new CameraService()