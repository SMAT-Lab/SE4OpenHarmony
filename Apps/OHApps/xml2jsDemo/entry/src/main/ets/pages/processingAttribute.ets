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
struct processingAttribute {
  @State message: string = ""
  xml: string = '<root><text>Hello xml2js!</text><Foo:Bar/><test1>123.123</test1><test2>true</test2></root>'
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

        Button("解析XML，转大写")
          .fontSize(30)
          .margin(10)
          .onClick(() => {
            this.processingAttribute()
          })
        Button("解析XML，转小写")
          .fontSize(30)
          .margin(10)
          .onClick(() => {
            this.processingAttribute2()
          })
        Button("解析XML，将第一个字符转换为小写")
          .fontSize(30)
          .margin(10)
          .onClick(() => {
            this.processingAttribute3()
          })
        Button("解析XML，去除xml命名空间前缀")
          .fontSize(30)
          .margin(10)
          .onClick(() => {
            this.processingAttribute4()
          })
        Button("解析XML，将类整数字符串解析为整数")
          .fontSize(30)
          .margin(10)
          .onClick(() => {
            this.processingAttribute5()
          })
        Button("解析XML，将类似布尔的字符床解析为布尔值")
          .fontSize(30)
          .margin(10)
          .onClick(() => {
            this.processingAttribute6()
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

  private processingAttribute() {
    // 将名称转换为大写
    xml2js.parseString(this.xml, {
      tagNameProcessors: [this.nameToUpperCase],
      attrNameProcessors: [this.nameToUpperCase],
      valueProcessors: [this.nameToUpperCase],
      attrValueProcessors: [this.nameToUpperCase] }, (err:ESObject, result:ESObject) => {
      this.message = JSON.stringify(result)
    });
  }

  private processingAttribute2() {
    // 将名称转换为小写。option.normalize(设置为时自动使用true)
    xml2js.parseString(this.xml, {
      tagNameProcessors: [xml2js.processors.normalize],
      attrNameProcessors: [xml2js.processors.normalize],
      valueProcessors: [xml2js.processors.normalize],
      attrValueProcessors: [xml2js.processors.normalize] }, (err:ESObject, result:ESObject) => {
      this.message = JSON.stringify(result)
    });
  }

  private processingAttribute3() {
    // 将第一个字符转换为小写。例如：“MyTagName”变成“myTagName”
    xml2js.parseString(this.xml, {
      tagNameProcessors: [xml2js.processors.firstCharLowerCase],
      attrNameProcessors: [xml2js.processors.firstCharLowerCase],
      valueProcessors: [xml2js.processors.firstCharLowerCase],
      attrValueProcessors: [xml2js.processors.firstCharLowerCase] }, (err:ESObject, result:ESObject) => {
      this.message = JSON.stringify(result)
    });
  }

  private processingAttribute4() {
    // 去除xml命名空间前缀。例如<foo:Bar/>将变为“Bar”。（注意：xmlns前缀没有被剥离。）
    xml2js.parseString(this.xml, {
      tagNameProcessors: [xml2js.processors.stripPrefix],
      attrNameProcessors: [xml2js.processors.stripPrefix],
      valueProcessors: [xml2js.processors.stripPrefix],
      attrValueProcessors: [xml2js.processors.stripPrefix] }, (err:ESObject, result:ESObject) => {
      this.message = JSON.stringify(result)
    });
  }

  private processingAttribute5() {
    // 将类似整数的字符串解析为整数，将类似浮点字符串解析为浮点数 例如“0”变为0，“15.56”变为15.56
    xml2js.parseString(this.xml, {
      tagNameProcessors: [xml2js.processors.parseNumbers],
      attrNameProcessors: [xml2js.processors.parseNumbers],
      valueProcessors: [xml2js.processors.parseNumbers],
      attrValueProcessors: [xml2js.processors.parseNumbers] }, (err:ESObject, result:ESObject) => {
      this.message = JSON.stringify(result)
    });
  }

  private processingAttribute6() {
    // 将类似布尔值的字符串解析为布尔值 例如“真”变为真，“假”变为假
    xml2js.parseString(this.xml, {
      tagNameProcessors: [xml2js.processors.parseBooleans],
      attrNameProcessors: [xml2js.processors.parseBooleans],
      valueProcessors: [xml2js.processors.parseBooleans],
      attrValueProcessors: [xml2js.processors.parseBooleans] }, (err:ESObject, result:ESObject) => {
      this.message = JSON.stringify(result)
    });
  }

  private nameToUpperCase(name: string) {
    return name.toLocaleUpperCase();
  }
}