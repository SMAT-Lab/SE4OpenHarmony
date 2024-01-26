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
import Logger from '../common/utils/Logger'
import grantPermission from '../common/utils/PermissionUtils'
import { DeviceScreen } from '../common/utils/DeviceScreen'
import Camera from '../common/utils/Camera'
import { CustomDialogExample } from '../view/CustomDialogView'
import CommonConstants from '../common/constants/CommonConstants';

const TAG: string = '[IndexPage]';

@Entry
@Component
struct Index {
  @State private recognitionResult: string = '';
  @Watch('watchedCamera') @State private camera: Camera = new Camera();
  private surfaceId: string = '';
  private xcomponentController: XComponentController = new XComponentController();
  private screenHeight: number = DeviceScreen.getDeviceHeight();
  private xcomponentHeight: number = this.screenHeight - CommonConstants.OTHER_HEIGHT;

  watchedCamera() {
    if (this.camera.result !== this.recognitionResult) {
      this.recognitionResult = this.camera.result;
      if (this.recognitionResult) {
        this.dialogController.open();
      }
    }
  }

  async aboutToAppear() {
    await grantPermission().then(() => {
      this.XComponentinit();
    }).catch((err: BusinessError) => {
      Logger.info(TAG, `grantPermission faild  ${JSON.stringify(err.code)}`);
    })
  }

  async aboutToDisappear() {
    await this.camera.releaseCamera();
    this.dialogController.close()
  }

  onPageShow() {
    this.XComponentinit();
  }

  onPageHide() {
    this.camera.releaseCamera();
    this.dialogController.close()
  }

  async XComponentinit() {
    this.xcomponentController.setXComponentSurfaceSize({
      surfaceWidth: CommonConstants.SURFACE_WIDTH,
      surfaceHeight: CommonConstants.SURFACE_HEIGHT
    });
    this.surfaceId = this.xcomponentController.getXComponentSurfaceId();
    await this.camera.initCamera(this.surfaceId);
  }

  async refresh() {
    this.camera.previewOutput!.start();
  }

  dialogController: CustomDialogController = new CustomDialogController({
    builder: CustomDialogExample({
      text: this.recognitionResult,
    }),
    cancel: this.refresh
  })

  build() {
    Row() {
      Column() {
        Row() {
          XComponent({
            id: CommonConstants.XCOMPONENT_ID,
            type: CommonConstants.XCOMPONENT_TYPE,
            controller: this.xcomponentController
          })
            .onLoad(() => {
              this.XComponentinit()
            })
            .width(CommonConstants.FULL_WIDTH)
            .height(this.xcomponentHeight)
        }
        .width(CommonConstants.FULL_WIDTH)
        .margin({ top: $r('app.float.top_height') })
        .flexGrow(CommonConstants.TRUE_NUMBER)

        Column() {
          Text($r('app.string.Recognize_text'))
            .fontSize($r('app.float.button_tip_size'))
            .fontColor(Color.White)
            .margin({ top: $r('app.float.indicate_upper_margin') })
          Row()
            .backgroundColor($r('app.color.round_color'))
            .width($r('app.float.decorative_point_size'))
            .height($r('app.float.decorative_point_size'))
            .border({
              radius: $r('app.float.decorative_dots_rounded_corners')
            })
            .margin({
              top: $r('app.float.decorative_dots_upper_margin'),
              bottom: $r('app.float.decorative_dots_bottom_margin')
            })
          Row() {
            Row()
              .backgroundColor(Color.White)
              .width($r('app.float.button_size'))
              .height($r('app.float.button_size'))
              .border({
                radius: $r('app.float.button_border_radius')
              })
          }
          .onClick(async () => {
            await this.camera.takePicture()
          })
          .backgroundColor(Color.Black)
          .width($r('app.float.button_border_size'))
          .height($r('app.float.button_border_size'))
          .border({
            color: Color.White,
            width: $r('app.float.button_border_width'),
            radius: $r('app.float.button_border_radius')
          })
          .justifyContent(FlexAlign.Center)
          .alignItems(VerticalAlign.Center)
        }
        .width(CommonConstants.FULL_WIDTH)
        .flexShrink(CommonConstants.FALSE_NUMBER)
        .height($r('app.float.camera_lower_height'))
        .backgroundColor(Color.Black)
        .alignItems(HorizontalAlign.Center)
      }
      .width(CommonConstants.FULL_WIDTH)
      .height(CommonConstants.FULL_Height)
      .backgroundColor(Color.Black)
    }
    .height(CommonConstants.FULL_Height)
  }
}