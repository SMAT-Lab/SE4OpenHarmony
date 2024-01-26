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
import {encode,decode} from 'hex-encode-decode'
@Entry
@Component
struct Index {
  @State message: string = 'hex-encode-decode的编码与解码'
  @State inputText: string = ''
  @State encodes: string = ''
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

        Button('编码').width(300).margin(20).fontSize(25).onClick(()=>{
          this.encodes =encode(this.inputText) ;
          AlertDialog.show(
            {
              title: '',
              message: this.encodes,
              confirm: {
                value: 'OK',
                action: () => {
                }
              }
            }
          )
        })

        Button('解码').fontSize(25).width(300).margin(20)
          .onClick(()=>{
            let content:string = 'ABCDEFGHIJKabcdefj123456+/AA==!@';
            let encodes:string =encode(content) ;
            let decodes:string = decode(this.encodes)
            AlertDialog.show({
              title:'',
              message:decodes,
              confirm:{
                value: 'OK',
                action:() => {

                }
              }
            })
          })
      }
      .width('100%')
    }
    .height('100%')
  }
}