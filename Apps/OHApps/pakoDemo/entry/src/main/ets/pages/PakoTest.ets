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

import pako from 'pako'
import prompt from '@ohos.promptAction';

interface levelType {
  level: number
}

interface optionsType {
  gzip: boolean,
  level: number
}

let levelData: levelType = { level: 3 }
let ungzipTestData: optionsType = { gzip: true, level: 9 }

@Entry
@Component
export default struct deflateDemo {
  @State Deflate1: string = "0"
  @State Deflate2: string = "0"
  @State Deflate3: string = "0"
  @State Inflate: string = "0"
  @State Inflate2: string = "0"
  @State ungzip1: string = "0"

  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Start }) {
      List({ space: 20, initialIndex: 0 }) {
        ListItem() {
          Column({ space: 12 }) {
            Button('测试Deflate接口1', { type: ButtonType.Normal })
              .fontSize(18)
              .fontColor('#000')
              .height(60)
              .width(300)
              .margin({ top: 20 })
              .backgroundColor('#12939f')
              .onClick(() => {
                this.DeflateTest1()
              })

            Text('预期结果:120,94,99,100,98,102,97,101,99,231,224,228,226,230,225,229,227,23,16,20,18,6,0,5,69,0,191')
              .fontSize(20)
              .margin({ top: 16 })

            Text('实际结果: ' + this.Deflate1)
              .fontSize(20)
              .margin({ top: 16 })

            Button('测试Deflate接口2', { type: ButtonType.Normal })
              .fontSize(18)
              .fontColor('#000')
              .height(60)
              .width(300)
              .margin({ top: 20 })
              .backgroundColor('#12939f')
              .onClick(() => {
                this.DeflateTest2()
              })

            Text('预期结果:120,156,99,100,98,102,97,101,99,231,224,4,0,0,174,0,46')
              .fontSize(20)
              .margin({ top: 16 })

            Text('实际结果: ' + this.Deflate2)
              .fontSize(20)
              .margin({ top: 16 })

            Button('测试Deflate接口3', { type: ButtonType.Normal })
              .fontSize(18)
              .fontColor('#000')
              .height(60)
              .width(300)
              .margin({ top: 20 })
              .backgroundColor('#12939f')
              .onClick(() => {
                this.DeflateTest3()
              })

            Text('预期结果:99,100,98,102,97,101,99,231,224,4,0')
              .fontSize(20)
              .margin({ top: 16 })

            Text('实际结果: ' + this.Deflate3)
              .fontSize(20)
              .margin({ top: 16 })

            Button('测试Inflate接口', { type: ButtonType.Normal })
              .fontSize(18)
              .fontColor('#000')
              .height(60)
              .width(300)
              .margin({ top: 20 })
              .backgroundColor('#12939f')
              .onClick(() => {
                this.InflateInflateTest()
              })

            Text('预期结果:1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19')
              .fontSize(20)
              .margin({ top: 16 })

            Text('实际结果: ' + this.Inflate)
              .fontSize(20)
              .margin({ top: 16 })

            Button('测试inflateRaw接口', { type: ButtonType.Normal })
              .fontSize(18)
              .fontColor('#000')
              .height(60)
              .width(300)
              .margin({ top: 20 })
              .backgroundColor('#12939f')
              .onClick(() => {
                this.InflateInflateRawTest()
              })

            Text('预期结果:1,2,3,4,5,6,7,8,9')
              .fontSize(20)
              .margin({ top: 16 })

            Text('实际结果: ' + this.Inflate2)
              .fontSize(20)
              .margin({ top: 16 })

            Button('测试ungzip接口', { type: ButtonType.Normal })
              .fontSize(18)
              .fontColor('#000')
              .height(60)
              .width(300)
              .margin({ top: 20 })
              .backgroundColor('#12939f')
              .onClick(() => {
                this.ungzipTest()
              })

            Text('预期结果:1,2,3,4,5,6,7,8,9')
              .fontSize(20)
              .margin({ top: 16 })

            Text('实际结果: ' + this.ungzip1)
              .fontSize(20)
              .margin({ top: 16 })
          }
        }

      }
    }
  }

  DeflateTest1() {
    let chunk1 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9])
    let chunk2 = new Uint8Array([10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
    const deflate: pako.Deflate= new pako.Deflate(levelData);
    deflate.push(chunk1, false);
    deflate.push(chunk2, true);
    let deflateArray: Uint8Array = deflate.result
    this.Deflate1 = deflateArray.toString()
    let err = deflate.err == deflate.msg
    prompt.showToast({ message: "" + err, duration: 4000 })
  }

  DeflateTest2() {
    const data = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    let array = new Uint8Array([120, 156, 99, 100, 98, 102, 97, 101, 99, 231, 224, 4, 0, 0, 174, 0, 46])
    let deflateArray: Uint8Array = pako.deflate(data)
    this.Deflate2 = deflateArray.toString()
    let result: Boolean = (deflateArray.toString() === array.toString())
    prompt.showToast({ message: result.toString(), duration: 4000 })
  }

  DeflateTest3() {
    let data = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9])
    let deflateArray: Uint8Array = pako.deflateRaw(data)
    let array = new Uint8Array([99, 100, 98, 102, 97, 101, 99, 231, 224, 4, 0])
    this.Deflate3 = deflateArray.toString()
    let result: Boolean = (deflateArray.toString() === array.toString())
    prompt.showToast({ message: result.toString(), duration: 4000 })

  }

  InflateInflateTest() {
    const chunk1 = new Uint8Array([120, 94, 99, 100, 98, 102, 97, 101, 99, 231, 224])
    const chunk2 = new Uint8Array([228, 226, 230, 225, 229, 227, 23, 16, 20, 18, 6, 0, 5, 69, 0, 191]);
    const inflate:pako.Inflate = new pako.Inflate(levelData);

    inflate.push(chunk1, false);
    inflate.push(chunk2, true); // true -> last chunk

    let err = inflate.err == inflate.msg
    this.Inflate = inflate.result.toString()
    prompt.showToast({ message: "" + err, duration: 4000 })
  }

  InflateInflateRawTest() {
    const chunk1 = new Uint8Array([99, 100, 98, 102, 97, 101, 99, 231, 224, 4, 0])
    const inflate: pako.inflateRaw = new pako.inflateRaw(chunk1);
    this.Inflate2 = inflate.toString()
    let array = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9])
    let result: Boolean = (inflate.toString() === array.toString())
    prompt.showToast({ message: result.toString(), duration: 4000 })
  }

  ungzipTest() {
    let array = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9])
    let gzip: pako.gzip = new pako.gzip(array, ungzipTestData);
    let ungzip: pako.ungzip = new pako.ungzip(gzip, ungzipTestData);
    this.ungzip1 = ungzip.toString()
    let result: Boolean = (ungzip.toString() === array.toString())
    prompt.showToast({ message: result.toString(), duration: 4000 })
  }
}