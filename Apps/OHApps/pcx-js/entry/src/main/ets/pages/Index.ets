/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import image from '@ohos.multimedia.image';
import { DecodeType } from "./utils/decode"
import PCX from 'pcx-js'

interface Tests {
  name: string
  func: () => void
}

@Entry
@Component
struct Index {
  @State p1Pixels: PixelMap | undefined = undefined;
  mCount: number = 0
  @State p2Pixels: PixelMap | undefined = undefined;
  @State p3Pixels: PixelMap | undefined = undefined;
  mCount2: number = 0
  @State p4Pixels: PixelMap | undefined = undefined;
  @State p5Pixels: PixelMap | undefined = undefined;
  smallUint8: Uint8Array | undefined = undefined;
  smallPcx: PCX | undefined = undefined;
  @State testTimeHint: string = '测试耗时文字提醒'
  @State testTimeHint2: string = ''
  @State testNilPcx: string = '测试对象为空情况'
  @State testNoDataPcx: string = '测试pcx图片入参有问题情况'

  build() {
    Scroll() {
      Column() {
        Button('解码thimbleweed.pcx_585KB').fontSize(20).onClick(() => {

          getContext(this).resourceManager.getMediaContent($r("app.media.thimbleweed").id).then((uint8Array) => {
            let pcxDecoder: PCX = new PCX(uint8Array.buffer);
            let decodeData: DecodeType = pcxDecoder.decode();
            this.RBGA2BGRA(decodeData.pixelArray)
            image.createPixelMap(this.typedArrayToBuffer(decodeData.pixelArray), {
              'size': {
                'width': decodeData.width,
                'height': decodeData.height
              }
            }).then((pixels) => {
              this.p1Pixels = pixels;
            })
          })
        })

        Image(this.p1Pixels == undefined ? "" : this.p1Pixels)
          .objectFit(ImageFit.Contain)
          .width(200)
          .height(200)
          .backgroundColor(Color.Pink)
          .margin(10)
        Button('解码small.pcx_1KB').fontSize(20).onClick(() => {

          getContext(this).resourceManager.getMediaContent($r('app.media.small').id).then((uint8Array) => {
            this.smallUint8 = uint8Array;
            let pcxDecoder: PCX = new PCX(uint8Array.buffer);
            this.smallPcx = pcxDecoder;
            let decodeData: DecodeType = pcxDecoder.decode();
            this.RBGA2BGRA(decodeData.pixelArray)
            image.createPixelMap(this.typedArrayToBuffer(decodeData.pixelArray), {
              'size': {
                'width': decodeData.width,
                'height': decodeData.height
              }
            }).then((pixels) => {
              this.p2Pixels = pixels;
            })
          })
        })

        Image(this.p2Pixels == undefined ? "" : this.p2Pixels)
          .objectFit(ImageFit.Contain)
          .width(200)
          .height(200)
          .backgroundColor(Color.Pink)
          .margin(10)
        Button('解码parrot.pcx_25KB').fontSize(20).onClick(() => {
          getContext(this).resourceManager.getMediaContent($r('app.media.parrot').id).then((uint8Array) => {
            let pcxDecoder: PCX = new PCX(uint8Array.buffer);
            let decodeData: DecodeType = pcxDecoder.decode();
            this.RBGA2BGRA(decodeData.pixelArray)
            image.createPixelMap(this.typedArrayToBuffer(decodeData.pixelArray), {
              'size': {
                'width': decodeData.width,
                'height': decodeData.height
              }
            }).then((pixels) => {
              this.p3Pixels = pixels;
            })
          })
        })

        Image(this.p3Pixels == undefined ? "" : this.p3Pixels)
          .objectFit(ImageFit.Contain)
          .width(200)
          .height(200)
          .backgroundColor(Color.Pink)
          .margin(10)

        Button('解码16col.pcx_40KB').fontSize(20).onClick(() => {
          getContext(this).resourceManager.getMediaContent($r('app.media.16col').id).then((uint8Array) => {
            let pcxDecoder: PCX = new PCX(uint8Array.buffer);
            let decodeData: DecodeType = pcxDecoder.decode();
            this.RBGA2BGRA(decodeData.pixelArray)
            image.createPixelMap(this.typedArrayToBuffer(decodeData.pixelArray), {
              'size': {
                'width': decodeData.width,
                'height': decodeData.height
              }
            }).then((pixels) => {
              this.p4Pixels = pixels;
            })
          })
        })

        Image(this!.p4Pixels)
          .objectFit(ImageFit.Contain)
          .width(200)
          .height(200)
          .backgroundColor(Color.Pink)
          .margin(10)
        Button('解码clown.pcx 73KB').fontSize(20).onClick(() => {
          getContext(this).resourceManager.getMediaContent($r('app.media.clown').id).then((uint8Array) => {
            let pcxDecoder: PCX = new PCX(uint8Array.buffer);
            let decodeData: DecodeType = pcxDecoder.decode();
            this.RBGA2BGRA(decodeData.pixelArray)
            image.createPixelMap(this.typedArrayToBuffer(decodeData.pixelArray), {
              'size': {
                'width': decodeData.width,
                'height': decodeData.height
              }
            }).then((pixels) => {
              this.p5Pixels = pixels;
            })
          })
        })

        Image(this.p5Pixels == undefined ? "" : this.p5Pixels)
          .objectFit(ImageFit.Contain)
          .width(200)
          .height(200)
          .backgroundColor(Color.Pink)
          .margin(10)

        Text(this.testTimeHint).margin({ top: 5, bottom: 5 })
        Text(this.testTimeHint2).margin({ top: 5, bottom: 5 })
        Button('先点击small再点击这个测试耗时按钮').onClick(() => {
          if (this.smallUint8 && this.smallPcx) {
            this.clickTestTime()
          } else {
            this.testTimeHint = 'smallUint8&smallPcx为空,请先点击small加载,才能继续测试'
          }
        })
          .margin({ top: 5, bottom: 5 })
        Text(this.testNilPcx)
          .margin({ top: 5, bottom: 5 })
        Button('点击空对象PCX调用decode').onClick(() => {
          let pcx: PCX | null = null
          if (!pcx) {
            this.testNilPcx = 'pcx对象为空无法继续调用'
          } else if (this.smallUint8) {
            let pcx: PCX = new PCX(this.smallUint8);
            this.testNilPcx = 'pcx对象不为空并且small有数据则能够调用decode方法'
            let decodeData: DecodeType = pcx.decode();
          }
        })
          .margin({ top: 5, bottom: 5 })
        Text(this.testNoDataPcx)
          .margin({ top: 5, bottom: 5 })
        Button('点击调用无参数PCX的解析').onClick(() => {
          this.testErrorInput();
        }).margin({ top: 5, bottom: 5 })


      }
    }
    .width('100%')
    .height('100%')
  }

  aboutToAppear() {

  }

  testErrorInput() {
    try {
      let pcx: PCX = new PCX();
      let decodeData: DecodeType = pcx.decode();
    } catch (err) {
      this.testNoDataPcx = 'pcx没有解析数据调用解码会程序异常,如果存在这种场景请主动捕获异常'
    }
  }

  RBGA2BGRA(input: Uint8ClampedArray) {
    for (let i = 0; i < input.byteLength; i = i + 4) {
      let colorR = input[i+0];
      let colorG = input[i+1];
      let colorB = input[i+2];
      let colorA = input[i+3];
      let temp = colorR;
      input[i+0] = colorB;
      input[i+2] = temp;
    }
  }

  private getSysTime(): number {
    return new Date().getTime();
  }

  testTimeFunction(name: string, func: Function, count: number, invalid?: number) {
    let sumAve = 0;
    for (let i = 0; i < count; i++) {
      let s = this.getSysTime();
      func();
      let e = this.getSysTime();
      sumAve += (e - s) * 1000
    }
    let ave = (sumAve * 1.0) / (count * 1.0 * (invalid ? invalid : 1));

    console.log(`pcx-js:${name} averageTime = ${ave}us`)
    this.testTimeHint2 += `pcx-js:${name} averageTime = ${ave}us`
  }

  clickTestTime() {
    for (let i = 0; i < this.tests.length; i++) {
      let obj = this.tests[i];
      this.testTimeFunction(obj.name, obj.func, 1000);
    }
  }

  tests: Array<Tests> = [
    {
      name: 'new PCX()',
      func: () => {
        let encoder: PCX = new PCX(this.smallUint8);
      }
    },
    {
      name: 'pcx.decode()',
      func: () => {
        // let pcx = new PCX(this.smallUint8);
        this.smallPcx!.decode();
      }
    }
  ]

  typedArrayToBuffer(array: Uint8ClampedArray): ArrayBuffer {
    return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset)
  }
}