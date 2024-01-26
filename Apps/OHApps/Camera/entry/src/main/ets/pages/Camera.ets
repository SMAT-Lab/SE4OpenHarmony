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
import { GlobalContext } from '../utlis/GlobalContext'
import { BusinessError } from '@ohos.base';
import common from '@ohos.app.ability.common';
import Want from '@ohos.app.ability.Want';

enum CameraMode {
  modePhoto = 0, // 拍照模式
  modeVideo = 1 // 录像模式
};

const TAG: string = '[CameraPage]';

@Entry
@Component
struct CameraPage {
  private mXComponentController: XComponentController = new XComponentController();
  private surfaceId: string = '-1';
  private cameraIcon:Resource = $r('app.media.take_photo_normal')
  private cameraModel: CameraModel = new CameraModel();
  @State imageThumbnail: string = '';
  @State videoThumbnail: Resource | undefined = undefined;
  @State currentModel: number = CameraMode.modePhoto;
  @State isRecording: boolean = false;
  @State textMove: number = 45;
  @State isPointShow: boolean = true;
  @State isTitleShow: boolean = true;
  @StorageLink('selectType_0') @Watch('rotationChange') rotation: number = 0;
  @StorageLink('selectType_1') @Watch('resolutionChange') resolution: number = 0;
  @State timeShow: boolean = false;
  private textTimerController: TextTimerController = new TextTimerController();
  @State format: string = 'mm:ss';


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
    } else if (this.rotation == 1) {
      Logger.info(TAG, `rotationChange ${this.rotation}`);
      this.cameraModel.setImageRotation(camera.ImageRotation.ROTATION_90);
      // 180°
    } else if (this.rotation == 2) {
      Logger.info(TAG, `rotationChange ${this.rotation}`);
      this.cameraModel.setImageRotation(camera.ImageRotation.ROTATION_180);
      // 270°
    } else if (this.rotation == 3) {
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
    } else if (this.resolution == 1) {
      Logger.info(TAG, `resolutionChange ${this.resolution}`);
      this.cameraModel.setVideoFrameWH(VideoFrame.VIDEOFRAME_1920_1080);
      // 1280*720
    } else if (this.resolution == 2) {
      Logger.info(TAG, `resolutionChange ${this.resolution}`);
      this.cameraModel.setVideoFrameWH(VideoFrame.VIDEOFRAME_1280_720);
      // 800*600
    } else if (this.resolution == 3) {
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
    })

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


  getCameraIcon(){
    if (this.currentModel === CameraMode.modePhoto) {
      this.cameraIcon =  $r('app.media.take_photo_normal');
    } else {
      if (this.isRecording) {
        this.cameraIcon = $r('app.media.take_video_stop');
      } else {
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
    } else {
      Logger.info(TAG, 'startVideo begin');
      this.timeShow = true;
      this.textTimerController.reset();
      this.textTimerController.start();
      this.cameraModel.startVideo();
      this.isRecording = true;
    }
  }

  startAbilityToPhoto() {
    let want:Want = {
      bundleName: 'com.huawei.hmos.photos',
      abilityName: 'com.huawei.hmos.photos.MainAbility'
    };
    Logger.info(TAG, `startAbility `);
    (GlobalContext.getContext().getValue('cameraContext') as common.UIAbilityContext).startAbility(want,(err:BusinessError)=>{
      Logger.info(TAG, `startAbility error  ${err}`);
    })
  }

  takePictureHandle = (thumbnail: string) => {
    this.imageThumbnail = thumbnail;
    Logger.info(TAG, `takePicture end , thumbnail: ${this.imageThumbnail}`);
  };
  animateParam: AnimateParam = {
    duration: 500,
    onFinish: () => {
      this.isPointShow = true;
    }
  };

  /**
   * 拍照事件
   */
  photoEvent() {
    if (this.currentModel === CameraMode.modeVideo) {
      animateTo(this.animateParam, () => {
        this.isPointShow = false;
        this.textMove = this.textMove + 56;
      });

      if (this.isRecording) {
        this.timeShow = false;
        this.isRecording = false;
        this.cameraModel.stopVideo();
      }
      this.cameraModel.initCamera(this.surfaceId)
      this.currentModel = CameraMode.modePhoto;
      this.videoThumbnail = undefined;
    }
  }

  /**
   * 录像事件
   */
  videoEvent() {
    if (this.currentModel === CameraMode.modePhoto) {
      animateTo(this.animateParam, () => {
        this.isPointShow = false;
        this.textMove = this.textMove - 56;
      });
      this.currentModel = CameraMode.modeVideo;
    }
  }

  build() {
    Column() {
      Title()
        .visibility(this.isTitleShow ? Visibility.Visible : Visibility.None)
      Stack({ alignContent: Alignment.Bottom }) {
        Stack({ alignContent: Alignment.TopStart }) {
          XComponent({
            id: 'componentId',
            type: 'surface',
            controller: this.mXComponentController
          })
            .onLoad(() => {
              Logger.info(TAG, 'onLoad is called');
              this.mXComponentController.setXComponentSurfaceSize({ surfaceWidth: 640, surfaceHeight: 480 });
              this.surfaceId = this.mXComponentController.getXComponentSurfaceId();
              Logger.info(TAG, `onLoad surfaceId: ${this.surfaceId}`);
              this.currentModel = CameraMode.modePhoto;
              this.cameraModel.initCamera(this.surfaceId);
            })
            .width('100%')
            .height('100%')
            .margin({ bottom: 152 })
            .gesture(
              SwipeGesture({ direction: SwipeDirection.Horizontal, speed: 40 })
                .onAction((event: GestureEvent) => {
                  Logger.info(TAG, `SwipeGesture event: ${JSON.stringify(event)}`);
                  // 右滑
                  if (event.angle > 0) {
                    this.photoEvent();
                  } else {
                    this.videoEvent();
                  }
                })
            )

          Column() {
            TextTimer({ isCountDown: false, count: 60000, controller: this.textTimerController })
              .height(60)
              .fontSize(24)
              .format(this.format)
              .fontColor(Color.Red)
              .fontSize(50)
          }
          .justifyContent(FlexAlign.Start)
          .visibility(this.timeShow ? Visibility.Visible : Visibility.Hidden)
          .width('100%')
          .height('30%')
        }
        .width('97%')
        .height('100%')

        Column() {
          Row() {
            Column() {
              Text($r('app.string.photo'))
                .id('photo')
                .fontSize(14)
                .fontColor(this.currentModel === CameraMode.modePhoto ? Color.White : Color.Gray)
                .onClick(() => {
                  this.photoEvent();
                })
              if (this.currentModel === CameraMode.modePhoto) {
                Text()
                  .width(4)
                  .height(4)
                  .margin({ top: 5 })
                  .borderRadius(2)
                  .backgroundColor(Color.Red)
              }
            }

            Column() {
              Text($r('app.string.video'))
                .fontColor(this.currentModel === CameraMode.modeVideo ? Color.White : Color.Gray)
                .fontSize(14)
                .id('video')
                .margin({ left: 30 })
                .onClick(() => {
                  this.videoEvent();
                })
              if (this.currentModel === CameraMode.modeVideo) {
                Text()
                  .width(4)
                  .height(4)
                  .margin({ left: 30, top: 5 })
                  .borderRadius(2)
                  .backgroundColor(Color.Red)
              }
            }
          }
          .offset({ x: this.textMove })
          .size({ height: 40, width: '100%' })
          .justifyContent(FlexAlign.Center)


          Row() {
            if (this.currentModel === CameraMode.modeVideo) {
              Image(this.videoThumbnail)
                .id('intoPhoto')
                .objectFit(ImageFit.Fill)
                .margin({ left: 24 })
                .borderRadius(5)
                .aspectRatio(1)
                .backgroundColor(Color.Gray)
                .size({ width: 40, height: 40 })
                .onClick(e => {
                  this.startAbilityToPhoto();
                })

            } else {
              Image(this.imageThumbnail)
                .id('intoPhoto')
                .objectFit(ImageFit.Fill)
                .margin({ left: 24 })
                .borderRadius(5)
                .aspectRatio(1)
                .backgroundColor(Color.Gray)
                .size({ width: 40, height: 40 })
                .onClick(e => {
                  this.startAbilityToPhoto();
                })
            }

            Image(this.currentModel=== CameraMode.modePhoto ? $r('app.media.take_photo_normal'): this.isRecording? $r('app.media.take_video_stop'):$r('app.media.take_video_normal') )
              .size({ width: 64, height: 64 })
              .margin({ left: 10 })
              .id('camera')
              .onClick(() => {
                if (this.currentModel === CameraMode.modePhoto) {
                  Logger.info(TAG, 'takePicture begin');
                  prompt.showToast({ message: '拍照中...', duration: 200 });
                  this.cameraModel.takePicture();
                } else if (this.currentModel === CameraMode.modeVideo) {
                  // 录制时隐藏标题组件
                  this.isTitleShow = !this.isTitleShow;
                  this.refreshVideoState();
                }
              })

            Column() {
            }
            .width(40)
            .height(40)
          }
          .size({ height: 80, width: '100%' })
          .margin({ right: 10 })
          .justifyContent(FlexAlign.SpaceBetween)
        }
        .padding({ bottom: 10 })
        .backgroundColor($r('app.color.COLOR_000000'))
        .alignItems(HorizontalAlign.Start)
        .size({ height: 130, width: '100%' })
      }
      .layoutWeight(1)
      .backgroundColor($r('app.color.COLOR_000000'))
      .width('100%')
      .height('100%')
    }
    .width('100%')
    .height('100%')
  }

  async aboutToDisappear() {
    if (this.isRecording) {
      await this.cameraModel.stopVideo();
    }
    await this.cameraModel.cameraRelease();
  }
}