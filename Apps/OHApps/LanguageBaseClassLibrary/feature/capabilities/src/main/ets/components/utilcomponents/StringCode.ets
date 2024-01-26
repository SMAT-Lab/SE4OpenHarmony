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
import { getString } from '@ohos/common';
import { SpecInput } from './stringcode/SpecInput';

@Preview
@Component
export struct StringCode {
  @State specStrInput_f: string = '';
  @State specStrInput_s: string = '';
  @State specStrInput_d: string = '';
  @State specStrInput_i: string = '';
  @State resen: string = '';
  @State resdec: string = '';
  @State read: string = '';
  @State write: string = '';
  private resArray: Uint8Array | undefined = undefined;

  build() {
    Scroll() {
      Column({ space: 12 }) {
        Row() {
          Text($r('app.string.SpecString'))
            .fontSize(15)
            .textAlign(TextAlign.Start)
          Text($r('app.string.SpecString_info'))
            .fontSize(15)
            .textAlign(TextAlign.Start)
        }

        SpecInput({ result_str: $r('app.string.result_f'), specStrInput: $specStrInput_f })
        SpecInput({ result_str: $r('app.string.result_i'), specStrInput: $specStrInput_i })
        SpecInput({ result_str: $r('app.string.result_d'), specStrInput: $specStrInput_d })
        SpecInput({ result_str: $r('app.string.result_s'), specStrInput: $specStrInput_s })
        Button() {
          Text($r('app.string.SpecFormOutput'))
            .fontSize(15)
            .fontWeight(FontWeight.Bold)
            .fontColor(Color.White)
        }
        .id('specFormatOutput')
        .width('100%')
        .height(40)
        .onClick(() => {
          this.specStrInput_f = util.format("%f", "OpenHarmony 4.0")
          this.specStrInput_i = util.format("%i", "OpenHarmony 4.0")
          this.specStrInput_d = util.format("%d", "OpenHarmony 4.0")
          this.specStrInput_s = util.format("%s", "OpenHarmony 4.0")
        })

        Divider()
          .strokeWidth(4)
          .color($r('sys.color.ohos_id_color_floating_button_shadow_end'))

        Row() {
          Text($r('app.string.SpecString'))
            .fontSize(15)
            .textAlign(TextAlign.Start)
          Text($r('app.string.StringCodec_info'))
            .fontSize(15)
            .margin({ left: 5 })
            .textAlign(TextAlign.Start)
        }

        Row() {
          Text($r('app.string.result'))
            .width('20%')
            .height(30)
            .fontSize(15)
            .textAlign(TextAlign.Start)
          Text(this.resen)
            .height(60)
            .fontSize(15)
            .layoutWeight(1)
            .maxLines(2)
            .textAlign(TextAlign.Start)
            .border({ width: 2, radius: 5, color: $r('app.color.text_color') })
        }
        .margin({ top: 20 })
        .width('100%')

        Row() {
          Text($r('app.string.read'))
            .width('20%')
            .fontSize(15)
            .textAlign(TextAlign.Start)
          Text(this.read)
            .id('read')
            .width('30%')
            .fontSize(15)
            .height(30)
            .textAlign(TextAlign.Start)
            .border({ width: 2, radius: 5, color: $r('app.color.text_color') })
          Text($r('app.string.write'))
            .width('20%')
            .fontSize(15)
            .textAlign(TextAlign.Center)
          Text(this.write)
            .id('write')
            .width('30%')
            .fontSize(15)
            .height(30)
            .textAlign(TextAlign.Start)
            .border({ width: 2, radius: 5, color: $r('app.color.text_color') })
        }
        .width('100%')

        Button() {
          Text($r('app.string.Text_encoder'))
            .fontColor(Color.White)
            .fontSize(15)
            .fontWeight(FontWeight.Bold)
        }
        .id('textEncoder')
        .width('100%')
        .height(40)
        .onClick(() => {
          this.textEncode();
        })

        Row() {
          Text($r('app.string.result'))
            .width('20%')
            .height(30)
            .fontSize(15)
            .textAlign(TextAlign.Start)
            .fontColor(Color.Black)
          Text(this.resdec)
            .id('decRes')
            .width('80%')
            .height(60)
            .fontSize(15)
            .textAlign(TextAlign.Start)
            .maxLines(2)
            .border({ width: 2, radius: 5, color: $r('app.color.text_color') })
        }
        .margin({ top: 20 })
        .width(300)

        Button() {
          Text($r('app.string.Text_decoder'))
            .fontColor(Color.White)
            .fontSize(15)
            .fontWeight(FontWeight.Bold)
        }
        .id('textDecoder')
        .width('100%')
        .height(40)
        .margin({ bottom: 50 })
        .onClick(() => {
          this.textDecode();
        })
      }
      .width('100%')
      .padding(16)
    }
    .scrollBar(BarState.Off)
    .align(Alignment.Start)
  }

  textEncode() {
    let textEncoder = new util.TextEncoder();
    let buffer = new ArrayBuffer(100);
    this.resArray = new Uint8Array(buffer);
    this.resArray = textEncoder.encodeInto(getString($r('app.string.message')));
    let resArratNum = textEncoder.encodeIntoUint8Array(getString($r('app.string.message')), this.resArray);
    this.resen = this.resArray.toString();
    this.read = JSON.stringify(resArratNum.read);
    this.write = JSON.stringify(resArratNum.written);
  }

  textDecode() {
    let textDecoder = util.TextDecoder.create('utf-8', { ignoreBOM : true });
    if (this.resArray === undefined) {
      return;
    }
    this.resdec = textDecoder.decodeWithStream(this.resArray, { stream: false });
  }
}

