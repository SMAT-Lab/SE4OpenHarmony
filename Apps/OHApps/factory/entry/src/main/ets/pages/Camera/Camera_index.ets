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
import Logger from '../../model/Logger'
import CameraService from './CameraService'
import FirstDialog from '../../common/FirstDialog'
import prompt from '@ohos.prompt'
import router from '@ohos.router'


const TAG = "Camera"

@Entry
@Component
struct Camera_index {
  @State name: string = 'CameraVideo';
  @State StepTips: string = '测试目的：用于测试相机录像分辨率能力\n预期结果：所有分辨率均可以录像，录像与预览一致';
  private mXComponentController: XComponentController = new XComponentController()
  @State surfaceId: number = 0;
  @State cameraDeviceIndex: number = 0
  @State assetUri: string = undefined
  @State thumbnail: PixelMap = undefined
  @State isTakePictureEnabled: boolean = true
  @State isTakeVideoEnabled: boolean = true
  @State clickFrequency: number = 0 // 点击次数
  @State resolutionSelectVal: string = '' // 下拉框默认value
  @State captureBtnScale: number = 1

  async aboutToAppear() {
    await FirstDialog.ChooseDialog(this.StepTips, this.name);
    CameraService.setTakePictureCallback(this.handleTakePicture.bind(this))
    Logger.info(TAG, `takePicture end, assetUri: ${this.assetUri}`)
  }


  async cameraInit(obj?) {
    CameraService.initCamera(this.surfaceId, this.cameraDeviceIndex).then(() => {
      this.resolutionSelectVal = String(CameraService.videoResolution[this.clickFrequency].value)
      Logger.info(TAG, `resolutionSelectVal ${this.resolutionSelectVal}`) //1280x960
    })
  }

  handleTakePicture = (assetUri: string) => {
    this.assetUri = assetUri
    Logger.info(TAG, `takePicture end, assetUri: ${this.assetUri}`)
  }

  onPageShow() {
    // @ts-ignore
    this.surfaceId = this.mXComponentController.getXComponentSurfaceId()
    CameraService.initCamera(this.surfaceId, this.cameraDeviceIndex)
  }

  onPageHide() {
    CameraService.releaseCamera()
    Logger.info(TAG, `onPageHide releaseCamera end`)
  }

  build() {
    Stack({ alignContent: Alignment.BottomEnd }) {
      XComponent({
        id: 'componentId',
        type: 'surface',
        controller: this.mXComponentController
      })
        .size({ width: '100%', height: '100%' })
        .onLoad(async () => {
          Logger.info(TAG, 'onLoad is called')
          // @ts-ignore
          this.surfaceId = this.mXComponentController.getXComponentSurfaceId()
          Logger.info(TAG, `onLoad surfaceId: ${this.surfaceId}`)
          this.cameraInit()
        })

      Row() {
        if (this.assetUri !== undefined) {
          Image(this.assetUri)
            .size({ height: '100%' })
            .border({ width: 1, color: Color.White, style: BorderStyle.Solid })
            .onClick(async () => {
              await globalThis.context.startAbility({
                parameters: { uri: 'photodetail' },
                bundleName: 'com.ohos.photos',
                abilityName: 'com.ohos.photos.MainAbility'
              })
            })
        }
        Blank()
        if (this.thumbnail !== undefined) {
          Image(this.thumbnail)
            .height('100%')
            .aspectRatio(4 / 3)
            .border({ width: 1, color: Color.White, style: BorderStyle.Solid })
            .onClick(async () => {
              await globalThis.context.startAbility({
                parameters: { uri: 'photodetail' },
                bundleName: 'com.ohos.photos',
                abilityName: 'com.ohos.photos.MainAbility'
              })
            })
        }
      }.size({ width: '100%', height: '30%' }).justifyContent(FlexAlign.SpaceBetween)

      Column() {
        Image(this.isTakeVideoEnabled ? $r('app.media.take_video_normal') : $r('app.media.take_video_stop'))
          .width(76).aspectRatio(1).enabled(this.isTakeVideoEnabled)
          .onTouch((event: TouchEvent) => {
            this.isTakeVideoEnabled = false
            if (event.type === TouchType.Up) {
              this.isTakeVideoEnabled = false
              prompt.showToast({
                message: '录制中，请等待三秒', duration: 1000
              });
              CameraService.StartRecording().then(() => {
                setTimeout(() => {
                  CameraService.stopRecording().then((thumbnailPixelMap) => {
                    this.thumbnail = thumbnailPixelMap
                    this.isTakeVideoEnabled = true
                  })
                }, 3000)
              })
            }
          })
      }.size({ height: '100%' }).justifyContent(FlexAlign.Center)

      Row() {
        Stack({ alignContent: Alignment.Center }) {
          Image($r('app.media.ic_circled')).fillColor(Color.White)
          Image($r('app.media.ic_circled_filled'))
            .width(54)
            .aspectRatio(1)
            .fillColor(Color.White)
            .scale({ x: this.captureBtnScale, y: this.captureBtnScale, z: this.captureBtnScale })
            .enabled(this.isTakePictureEnabled)
            .onTouch(async (event: TouchEvent) => {
              if (event.type === TouchType.Down) {
                animateTo(
                  { duration: 125, curve: Curve.Sharp, delay: 0 },
                  () => {
                    this.captureBtnScale = 0.85
                  })
              } else if (event.type === TouchType.Up) {
                animateTo(
                  { duration: 125, curve: Curve.Sharp, delay: 0,
                    onFinish: () => {
                      this.captureBtnScale = 1
                    } },
                  () => {
                    this.captureBtnScale = 1
                  })
                this.isTakePictureEnabled = false
                CameraService.takePicture()
                this.isTakePictureEnabled = true
              }
            })
        }.width(76).aspectRatio(1)
      }.size({ width: '100%', height: 76 }).justifyContent(FlexAlign.Center)
    }.width('100%').height('100%').backgroundColor(Color.Black)
    .gesture(
      PanGesture({ direction: PanDirection.Left | PanDirection.Right })
        .onActionEnd(() => {
          router.back()
        })
    )
  }
}