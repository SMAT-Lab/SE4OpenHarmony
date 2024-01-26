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
import xml2js from 'xml2js';

@Entry
@Component
struct simpleParseXml {
  @State message: string = ""
  xml: string = '<root>Hello xml2js!</root>'
  controller: TextAreaController = new TextAreaController()

  build() {
    Row() {
      Column() {
        TextArea({ placeholder: 'input your xml', controller: this.controller, text: this.xml })
          .placeholderColor("rgb(0,0,225)")
          .textAlign(TextAlign.Center)
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontFamily("sans-serif")
          .fontStyle(FontStyle.Normal)
          .fontColor(Color.Red)
          .margin(10)
          .enabled(false)

        Button("解析XML")
          .fontSize(30)
          .margin(10)
          .onClick(() => {
            this.simpleParseXml()
          })
        Text(this.message)
          .backgroundColor("#ffc4c1c1")
          .fontSize(18)
          .width("95%")
          .height("50%")
      }
      .width('100%')
    }
    .height('100%')
  }

  private simpleParseXml() {
    xml2js.parseString(this.xml, (err:ESObject, result:ESObject) => {
      this.message = JSON.stringify(result)
    })
  }
}