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
import md5 from 'js-md5'

@Entry
@Component
struct Index {
  @State message: string = 'js-md5'
  @State inputText: string = ''

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: 'input your word', text: this.inputText })
          .height(60)
          .border({ width: 5, color: Color.Red })
          .placeholderColor(Color.Blue)
          .placeholderFont({ size: 20, weight: FontWeight.Normal, family: "sans-serif", style: FontStyle.Italic })
          .caretColor(Color.Blue)
          .enterKeyType(EnterKeyType.Search)
          .onChange((value: string) => {
            this.inputText = value
          })

        Button('md5').width(300).margin(20).fontSize(25).onClick(() => {
          let mess: string = md5(this.inputText);
          this.showDialog(mess)
        })
        Button('md5.hex').width(300).margin(20).fontSize(25).onClick(() => {
          let mess: string = md5.hex(this.inputText);
          this.showDialog(mess)
        })
        Button('md5.base64').width(300).margin(20).fontSize(25).onClick(() => {
          let mess: string = md5.base64(this.inputText);
          this.showDialog(mess)
        })


      }
      .width('100%')
    }
    .height('100%')
  }

  showDialog(message: string) {
    AlertDialog.show({
      title: '',
      message: message,
      confirm: {
        value: 'OK',
        action: () => {

        }
      }
    })
  }
}