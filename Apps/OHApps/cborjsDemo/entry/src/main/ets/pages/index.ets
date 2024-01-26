/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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

import CBOR from 'cbor-js';
import prompt from '@ohos.prompt';


@Entry
@Component
struct Index {
  @State onChangeText: string = '默认 testWorld'

  build() {
    Row() {
      Column() {
        TextInput({ placeholder: '请输入', text: '默认 testWorld' })
          .placeholderColor('rgb(0, 0, 255)')
          .placeholderFont({ size: 15, weight: 100, family: 'cursive', style: FontStyle.Italic })
          .caretColor(Color.Blue)
          .height(50)
          .width('50%')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontFamily("sans-serif")
          .fontStyle(FontStyle.Normal)
          .fontColor(Color.Red)
          .onChange((value: string) => {
            this.onChangeText = value
          })

        Button('测试cbor编解码', { type: ButtonType.Normal, stateEffect: true })
          .borderRadius(8)
          .backgroundColor(0x317aff)
          .width('50%')
          .margin('10')
          .onClick(() => {
            if (this.onChangeText == '') {
              prompt.showToast({ message: '请输入需要编码的值', duration: 200 })
              return
            } else {
              testCbor(this.onChangeText)
            }
          })
      }
      .width('100%')
    }
    .height('100%')
  }
}

function testCbor(initial:string) {
  let encoded:ArrayBuffer = CBOR.encode(initial)
  let decoded:ArrayBuffer = CBOR.decode(encoded)
  if (initial.toString() == decoded.toString()) {
    console.log('解码值和原值相同');
    prompt.showToast({ message: '解码值和原值相同', duration: 200 })
  } else if (initial === decoded.toString()) {
    console.log('解码值和原值相同');
    prompt.showToast({ message: '解码值和原值相同', duration: 200 })
  } else {
    console.log('解码值和原值不同');
    prompt.showToast({ message: '解码值和原值不同', duration: 200 })
  }
}

