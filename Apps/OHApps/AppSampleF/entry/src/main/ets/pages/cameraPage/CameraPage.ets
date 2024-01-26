/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Logger from '../../utils/Logger';
import CameraModel from '../../model/CameraModel';
import grantPermission from '../../utils/PermissionUtils';
import display from '@ohos.display';
import router from '@ohos.router';
import emitter from '@ohos.events.emitter';
import animator from '@ohos.animator';
import { BusinessError } from '@ohos.base';

const TAG: string = '[CameraPage]';
enum CameraMode {
  MODE_PHOTO = 0, // 拍照模式
  MODE_VIDEO = 1 // 录像模式
};
let innerEventText: emitter.InnerEvent = {
  eventId: 1,
  priority: emitter.EventPriority.HIGH
};

@Entry
@Component
struct CameraPage {
  private surfaceId: string = '-1';
  private mXComponentController: XComponentController = new XComponentController();
  private cameraModel: CameraModel = new CameraModel();
  private windowWidth: number = 300;
  private windowHeight: number = 300;
  @State imageThumbnail: string = '';
  @State videoThumbnail: Resource | undefined = undefined;
  @State currentModel: number = CameraMode.MODE_PHOTO;
  @State isRecording: boolean = false;
  @State textMove: number = 45;
  @State isPointShow: boolean = true;
  @State isTitleShow: boolean = true;
  @State timeShow: boolean = false;
  @State translateY: number = 80;
  @State count: number = 0;
  @State duration: number = 2500;
  @State resultInit: string = '';
  @State text: string = '';
  @State isShow: boolean = false;

  async aboutToAppear() {
    this.isShow = true;
    this.windowWidth = display.getDefaultDisplaySync().width;
    this.windowHeight = display.getDefaultDisplaySync().height;
    Logger.info(TAG, `windowWidth  ${JSON.stringify(this.windowWidth)}`);
    Logger.info(TAG, `windowHeight  ${JSON.stringify(this.windowHeight)}`);
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
  }

  onPageShow() {
    this.isShow = true;
    if (!this.isShow) {
      this.cameraModel.initCamera(this.surfaceId);
    }
    Logger.info(TAG, `onPageShow,onPageShow=${this.count}`);
    this.text = '';
    setTimeout(() => {
      this.animationStart();
    }, 1000)
  }

  onPageHide() {
    Logger.info(TAG, `onPageHide,=${this.count}`);
    // this.cameraModel.cameraRelease();
    this.count = 0;
    this.isShow = false;
  }

  async aboutToDisappear() {
    emitter.off(innerEventText.eventId);
    this.cameraModel.cameraRelease();
    Logger.info(TAG, 'aboutToDisappear,}');
  }

  animationStart() {
    Logger.info(TAG, `animationScan start`);
    if (this.isShow) {
      Logger.info(TAG, `animationScan 1`);
      this.translateY = 20
      animateTo({
        duration: 2000,
        curve: Curve.EaseOut,
        iterations: -1,
        playMode: PlayMode.Normal,
        onFinish: () => {
          console.info('play end')
        }
      }, () => {
        this.translateY = 400
      })
    } else {
      Logger.info(TAG, `animationScan 2`);
      animateTo({}, () => {
        this.translateY = 80
      })
    }
  }

  build() {
    if (this.isShow) {
      Stack() {
        Stack({ alignContent: Alignment.Top }) {
          XComponent({
            id: 'componentId',
            type: 'surface',
            controller: this.mXComponentController
          })
            .onLoad(() => {
              Logger.info(TAG, 'onLoad is called');
              this.mXComponentController.setXComponentSurfaceSize({
                surfaceWidth: this.windowWidth,
                surfaceHeight: this.windowHeight
              });
              this.surfaceId = this.mXComponentController.getXComponentSurfaceId();
              Logger.info(TAG, `onLoad surfaceId: ${this.surfaceId}`);
              this.cameraModel?.initCamera(this.surfaceId);
              emitter.once(innerEventText, (res) => {
                this.text = res.data && res.data.text;
                Logger.info(TAG, `this.text==on==${this.text}`);
                if (this.text !== '' && this.count === 0) {
                  this.count++;
                  Logger.info(TAG, `this.count,this.count=${this.count}`);
                  AppStorage.setOrCreate<string>('text', this.text);
                  router.pushUrl({
                    url: 'pages/messagePage/Message'
                  });
                  setTimeout(() => {
                    this.animationStart();
                  }, 1000)
                }
              });
            })
            .width('100%')
            .height('100%')
            .layoutWeight(1)

          Image($r('app.media.ic_lattice'))
            .width('100%')
            .height('95%')

          Row() {
            Image($r('app.media.icon'))
              .width(26)
              .height(26)
              .margin({ left: 20 })
              .onClick(() => {
                Logger.info(TAG, 'back===11=');
                router.back();
                Logger.info(TAG, 'back===Get=');
                this.cameraModel.cameraRelease();
                Logger.info(TAG, 'back===cameraRelease=');
                Logger.info(TAG, 'back===back=');
              })
            Blank()
            Image($r('app.media.icon'))
              .width(32)
              .height(32)
              .margin({ right: 20 })
          }
          .margin({ top: 20 })
          .width('100%')

          Image($r('app.media.ic_dot_scanning'))
            .margin({ top: 80 })
            .width('100%')
            .translate({ y: this.translateY })
        }
        .width('100%')
        .height('100%')

        Column() {
          Row() {
            Text($r('app.string.text_description'))
              .fontColor(Color.White)
              .fontSize(16)
          }

          Row() {
            Flex({ direction: FlexDirection.Row, justifyContent: FlexAlign.SpaceAround }) {
              Image($r('app.media.icon'))
                .width(40)
                .height(40)

              Image($r('app.media.icon'))
                .width(45)
                .height(45)
                .opacity(0)

              Image($r("app.media.icon"))
                .width(45)
                .height(45)
            }
          }
          .margin({ top: 20 })

          Row() {
            Flex({ direction: FlexDirection.Row, justifyContent: FlexAlign.SpaceAround }) {
              Text($r('app.string.camera_sweep'))
                .fontSize(16)
                .fontColor(Color.White)

              Text($r('app.string.camera_pictures'))
                .fontSize(16)
                .fontColor(Color.White)

              Text($r('app.string.camera_pai'))
                .fontSize(16)
                .fontColor(Color.White)
            }
            .align(Alignment.Bottom)
            .height('100%')
            .width('100%')
          }
          .margin({ top: 30 })
        }
        .width('100%')
        .height('20%')
        .position({ x: 0, y: '80%' })
      }
      .width('100%')
      .height('100%')
    }
  }
}