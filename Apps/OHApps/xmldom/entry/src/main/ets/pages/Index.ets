/**
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 * */

import { DOMParser, XMLSerializer, DOMImplementation } from '@xmldom/xmldom'

@Entry
@Component
struct Index {
  @State text: string = '展示结果区'

  onParseFromString() {
    const XML = '<xml attr="&quot;">&lt; &amp;</xml>'
    const actual: ESObject = new DOMParser().parseFromString(XML).toString()
    this.text = actual
  }

  onSerializeToString() {
    const str = '<a:foo xmlns:a="AAA"><bar xmlns="AAA"/></a:foo>'
    const doc: ESObject = new DOMParser().parseFromString(str, "text/xml")
    const child: ESObject = doc.createElementNS('AAA', 'child')
    let xmlSerializer = new XMLSerializer()
    let xmlSerializerStr = xmlSerializer.serializeToString(child)
    this.text = xmlSerializerStr
  }

  onDOMImplementation() {
    const impl: ESObject = new DOMImplementation()
    const doc: ESObject = impl.createDocumentType('qualifiedName', 'publicId', 'systemId')
    this.text = doc.name
  }

  onErrorHandler() {
    const errors: string[] = []
    const parser = new DOMParser({
      errorHandler: (msg: ESObject) => {
        errors.push(msg)
      },
    })

    parser.parseFromString('<xml attr=value/>', 'text/xml')
    parser.parseFromString('<doc a1=></doc>', 'text/xml')
    parser.parseFromString('<xml a="1" a="2"></xml>', 'text/xml')
    this.text = errors[0] + '\n' + errors[1] + '\n' + errors[2]
  }

  build() {
    Row() {
      Column() {
        Button('parseFromString')
          .margin({ top: px2vp(30) })
          .onClick(() => this.onParseFromString())
        Button('serializeToString')
          .margin({ top: px2vp(30) })
          .onClick(() => this.onSerializeToString())
        Button('DOMImplementation')
          .margin({ top: px2vp(30) })
          .onClick(() => this.onDOMImplementation())
        Button('errorHandler')
          .margin({ top: px2vp(30) })
          .onClick(() => this.onErrorHandler())


        TextArea({ text: this.text })
          .textAlign(TextAlign.Start)
          .fontSize(px2fp(35))

          .margin({ top: px2vp(30) })
          .width('100%')
          .backgroundColor(Color.Orange)
      }
      .height('100%')
      .width('100%')

      .padding({ top: px2vp(100) })
    }
    .height('100%')
  }

}