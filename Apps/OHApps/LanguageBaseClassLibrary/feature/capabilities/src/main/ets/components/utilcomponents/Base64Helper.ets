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

import util from '@ohos.util';

@Component
export struct Base64Helper {
  @State resultEncode: string = '';
  @State resultDecode: string = '';
  @State input: string = 'harmony';

  build() {
    Scroll() {
      Column({ space: 12 }) {
        Row() {
          Text($r('app.string.change_str'))
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .textAlign(TextAlign.End)

          Text(this.input)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .textAlign(TextAlign.Start)
        }
        .width('100%')
        .height('10%')

        Text(this.resultEncode)
          .width('100%')
          .height('10%')
          .padding({ left: 10 })
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .border({ width: 2, radius: 10, color: Color.Black })

        Button() {
          Text($r("app.string.encode"))
            .fontSize(25)
            .fontColor(Color.White)
        }
        .key('encodeBtn')
        .width('100%')
        .height(50)
        .type(ButtonType.Capsule)
        .onClick(() => {
          this.encode();
        })

        Text(this.resultDecode)
          .width('100%')
          .height('10%')
          .fontSize(20)
          .padding({ left: 10 })
          .fontWeight(FontWeight.Bold)
          .border({ width: 2, radius: 10, color: Color.Black })
          .margin({ top: 50 })

        Button() {
          Text($r("app.string.decode"))
            .fontSize(25)
            .fontColor(Color.White)
        }
        .key('decodeBtn')
        .width('100%')
        .height(50)
        .type(ButtonType.Capsule)
        .onClick(() => {
          this.decode();
        })
      }
      .width('100%')
      .padding(16)
    }
    .scrollBar(BarState.Off)
    .align(Alignment.Start)
  }

  encode() {
    let strToAscii: number[] = [];
    for (let i = 0;i < this.input.length; i++) {
      strToAscii.push(this.input.charCodeAt(i));
    }
    let that = new util.Base64Helper();
    let encodeNum = new Uint8Array(strToAscii);
    this.resultEncode = that.encodeToStringSync(encodeNum);
  }

  decode() {
    let that = new util.Base64Helper();
    if (this.resultEncode === undefined || this.resultEncode === '') {
      return;
    }
    let decodeNum = that.decodeSync(this.resultEncode);
    this.resultDecode = '';
    for (let i = 0; i < decodeNum.length; i++) {
      this.resultDecode += String.fromCharCode(decodeNum[i]);
    }
  }
}