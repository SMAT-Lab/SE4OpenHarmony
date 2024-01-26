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

import overlay from '@ohos.bundle.overlay';
import { BusinessError } from '@ohos.base';

@Entry
@Component
struct Overlay {
  private resmgr = getContext().resourceManager;
  @State message: string = 'Test Overlay'
  @State resources: string = this.resmgr.getStringSync($r("app.string.test_string").id)
  @State pixmap: PixelMap = this.resmgr.getDrawableDescriptor($r("app.media.icon").id).getPixelMap()

  build() {
    Column() {
      Text($r('app.string.title'))
        .width('100%')
        .height(50)
        .backgroundColor($r('app.color.text_color'))
        .fontColor(Color.White)
        .fontSize(20)
        .padding({ left: 15 })

      Text(`${this.message}`)
        .fontSize(40)
        .fontWeight(FontWeight.Bold)
        .margin({
          top: 40
        })

      Button() {
        Text('disable')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
      }
      .type(ButtonType.Capsule)
      .margin({
        top: 50
      })
      .backgroundColor('#0D9FFB')
      .width('50%')
      .height('5%')
      .onClick(() => {
        // 非使能
        overlay.setOverlayEnabled("libraryOverlay", false, (err, data) => {
          console.log("this err",err)
          console.log("this data",data)
          if (err && err.code != 0) {
            console.log("error:" + JSON.stringify(err));
            this.message = this.resmgr.getStringSync($r('app.string.unEnableFailed').id);
          } else {
            console.log("data:" + JSON.stringify(data));
            this.message = this.resmgr.getStringSync($r('app.string.unEnableSuccess').id);
          }
        })
      })

      Button() {
        Text('enable')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
      }
      .type(ButtonType.Capsule)
      .margin({
        top: 20
      })
      .backgroundColor('#0D9FFB')
      .width('50%')
      .height('5%')
      .onClick(() => {
        // 使能
        overlay.setOverlayEnabled("libraryOverlay", true, (err, data) => {
          if (err && err.code != 0) {
            console.log("error:" + JSON.stringify(err));
            this.message = this.resmgr.getStringSync($r('app.string.enableFailed').id);
          } else {
            this.message = this.resmgr.getStringSync($r('app.string.enableSuccess').id);
          }
        })
      })

      Button() {
        Text('addResource')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
      }
      .type(ButtonType.Capsule)
      .margin({
        top: 20
      })
      .backgroundColor('#0D9FFB')
      .width('50%')
      .height('5%')
      .onClick(() => {
        let path = getContext().bundleCodeDir + "/libraryRuntimeOverlay-default-signed.hsp";
        try {
          let ret = this.resmgr.addResource(path);
          console.error("addResource: ret" + JSON.stringify(ret));
        } catch (error) {
          let code = (error as BusinessError).code;
          let message = (error as BusinessError).message;
          console.error(`addResource failed, error code: ${code}, message: ${message}.`);
        }
        this.pixmap = this.resmgr.getDrawableDescriptor($r("app.media.icon").id).getPixelMap();
        this.resources = this.resmgr.getStringSync($r("app.string.test_string").id);
      })

      Button() {
        Text('removeResource')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
      }
      .type(ButtonType.Capsule)
      .margin({
        top: 20
      })
      .backgroundColor('#0D9FFB')
      .width('50%')
      .height('5%')
      .onClick(() => {
        let path = getContext().bundleCodeDir + "/libraryRuntimeOverlay-default-signed.hsp";
        try {
          this.resmgr.removeResource(path);
        } catch (error) {
          let code = (error as BusinessError).code;
          let message = (error as BusinessError).message;
          console.error(`removeResource failed, error code: ${code}, message: ${message}.`);
        }
        this.pixmap = this.resmgr.getDrawableDescriptor($r("app.media.icon").id).getPixelMap();
        this.resources = this.resmgr.getStringSync($r("app.string.test_string").id);
      })

      Image(this.pixmap)
        .width(100)
        .height(100)

      Text(this.resources)
        .fontSize(40)
        .fontWeight(FontWeight.Bold)
    }
    .width('100%')
    .height('100%')
  }
}