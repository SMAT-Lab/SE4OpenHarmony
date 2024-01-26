/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

import imtype from 'imtype';
import { GlobalContext } from '../entryability/GlobalContext';

@Entry
@Component
struct PicturePage {
  @State jpg: boolean = false;
  @State png: boolean = false;
  @State gif: boolean = false;
  @State tif: boolean = false;
  @State bmp: boolean = false;

  build() {

    Column() {


      Button('是否jpg:' + this.jpg)
        .fontSize(18)
        .margin({ left: 18 })
        .onClick(() => {
          this.jpgTest()
        })
        .margin({ top: 18 })

      Button('是否png:' + this.png)
        .fontSize(18)
        .margin({ left: 18 })
        .onClick(() => {
          this.pngTest()
        })
        .margin({ top: 18 })


      Button('是否gif:' + this.gif)
        .fontSize(18)
        .margin({ left: 18 })
        .onClick(() => {
          this.gifTest()
        })
        .margin({ top: 18 })

      Button('是否tif:' + this.tif)
        .fontSize(18)
        .margin({ left: 18 })
        .onClick(() => {
          this.tifTest()
        })
        .margin({ top: 18 })

      Button('是否bmp:' + this.bmp)
        .fontSize(18)
        .margin({ left: 18 })
        .onClick(() => {
          this.bmpTest()
        })
        .margin({ top: 18 })

      Button('文本测试')
        .fontSize(18)
        .margin({ left: 18 })
        .onClick(() => {
          this.textTest()
        })
        .margin({ top: 18 })

    }
    .margin({ top: 18 })
  }

  jpgTest() {
    let context:Context = GlobalContext.getContext().getObject("context") as Context
    context.resourceManager.getMediaContent( $r("app.media.jpg").id)
      .then((data:Iterable<number>) => {
        this.jpg = imtype.isJPG(new Uint8Array(data))
      })
      .catch((err:Error) => {
        console.log('addFileToDisk err=' + err)
      })
  }

  pngTest() {
    let context:Context = GlobalContext.getContext().getObject("context") as Context
    context.resourceManager.getMediaContent($r("app.media.png").id)
      .then((data:Iterable<number>) => {
        this.png = imtype.isPNG(new Uint8Array(data))
      })
      .catch((err:Error) => {
        console.log('addFileToDisk err=' + err)
      })
  }

  gifTest() {
    let context:Context = GlobalContext.getContext().getObject("context") as Context
    context.resourceManager.getMediaContent($r("app.media.gif").id)
      .then((data:Iterable<number>) => {
        this.gif = imtype.isGIF(new Uint8Array(data))
      })
      .catch((err:Error) => {
        console.log('addFileToDisk err=' + err)
      })
  }

  bmpTest() {
    let context:Context = GlobalContext.getContext().getObject("context") as Context
    context.resourceManager.getMediaContent($r("app.media.bmp").id)
      .then((data:Iterable<number>) => {
        this.bmp = imtype.isBMP(new Uint8Array(data))
      })
      .catch((err:Error) => {
        console.log('addFileToDisk err=' + err)
      })
  }

  tifTest() {
    let context:Context = GlobalContext.getContext().getObject("context") as Context
    context.resourceManager.getMediaContent($r("app.media.tif").id)
      .then((data:Iterable<number>) => {
        this.tif = imtype.isTIF(new Uint8Array(data))
      })
      .catch((err:Error) => {
        console.log('addFileToDisk err=' + err)
      })
  }

  textTest() {
    let context:Context = GlobalContext.getContext().getObject("context") as Context
    context.resourceManager.getMediaContent($r("app.media.text").id)
      .then((data:Iterable<number>) => {
        console.log('是否jpg:' + imtype.isJPG(new Uint8Array(data)));
        console.log('是否png:' + imtype.isPNG(new Uint8Array(data)));
        console.log('是否gif:' + imtype.isGIF(new Uint8Array(data)));
        console.log('是否bmp:' + imtype.isBMP(new Uint8Array(data)));
        console.log('是否tif:' + imtype.isTIF(new Uint8Array(data)));
      })
      .catch((err:Error) => {
        console.log('addFileToDisk err=' + err)
      })

  }
}