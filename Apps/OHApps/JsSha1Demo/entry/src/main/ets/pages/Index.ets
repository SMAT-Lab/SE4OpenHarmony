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

import sha1 from 'js-sha1';

@Extend(Text) function textFancy(fontSize: number, textColor: Color, isBold: Boolean) {
  .fontSize(fontSize)
  .fontColor(textColor)
  .fontWeight(isBold ? FontWeight.Bold : FontWeight.Normal)
}

@Extend(Button) function buttonFancy() {
  .type(ButtonType.Capsule)
  .width(90)
  .height(60)
  .align(Alignment.Center)
}

@Entry
@Component
struct Index {
  @State statement: string = ""
  @State resultText: string = "sha1: " + "\n\n\n" + "sha1.hex: " + "\n\n\n" + "sha1.array: " + "\n\n\n" + "sha1.digest: " + "\n\n\n" + "sha1.arrayBuffer: "

  build() {
    Column() {
      Text("输入一个需要安全散列算法1的字符串").textFancy(16, Color.Green, true).margin(40)
      TextInput({ placeholder: '请输入字符串', text: this.statement })
        .onChange((value: string) => {
          this.statement = value;
        })
        .width('100%')
        .margin(15)

      Button() {
        Text("执行安全散列算法1").textFancy(16, Color.White, false)
      }
      .buttonFancy()
      .onClick(() => {
        let sha1Results = "sha1: " + sha1(this.statement);
        let hexResults = "sha1.hex: " + sha1.hex(this.statement);
        let arrayResults = "sha1.array: " + JSON.stringify(sha1.array(this.statement));
        let digestResults = "sha1.digest: " + JSON.stringify(sha1.digest(this.statement));
        let arrayBuffer:number[] = sha1.arrayBuffer(this.statement);
        let arrayBufferResults :string = "sha1.arrayBuffer: ";
        if (arrayBuffer instanceof ArrayBuffer) {
          arrayBufferResults = arrayBufferResults + JSON.stringify((new Uint8Array(arrayBuffer)).slice());
        }
        let results = sha1Results + "\n\n\n" + hexResults + "\n\n\n" + arrayResults + "\n\n\n" + digestResults + "\n\n\n" + arrayBufferResults;
        this.resultText = results;
      }).width(200)

      Text(this.resultText).textFancy(12, Color.Black, true).margin(30)
    }.width('100%')
  }
}