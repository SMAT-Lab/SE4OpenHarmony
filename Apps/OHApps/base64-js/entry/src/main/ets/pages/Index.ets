/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import base64 from 'base64-js'
import util from '@ohos.util';
import { Unit8ArrayUtils } from './Unit8ArrayUtils';


@Entry
@Component
struct Index {
  @State length: number = 0
  @State toByteArrayStr: string = ''
  @State fromByteArray: string = ''
  @State toByteArray: Uint8Array = new Uint8Array([0, 0, 0])

  encode(input: string) {
    if (input != '') {
      let inputValue = Unit8ArrayUtils.stringToUint8Array(input)
      let base = new util.Base64Helper()
      let encode_value = base.encodeSync(inputValue)
      this.fromByteArray = base64.fromByteArray(encode_value)
      this.length = base64.byteLength(this.fromByteArray)
      this.toByteArray = base.decodeSync(base64.toByteArray(this.fromByteArray))
    } else {
      this.length = 0
      this.toByteArray = new Uint8Array([0, 0, 0])
      this.fromByteArray = ''
    }
  }

  build() {
    Row() {
      Column() {
        TextInput({ placeholder: "请输入base64解码字符" })
          .onChange((v) => {
            this.encode(v)
          })
        Row() {
          Text('length:')
          Text(this.length + '')
        }.width('90%')

        Row() {
          Text('toByteArray:')
          Text(Unit8ArrayUtils.Uint8ArrayToString(this.toByteArray))
        }.width('90%')

        Row() {
          Text('fromByteArray:')
          Text(this.fromByteArray)
        }.width('90%')
      }.justifyContent(FlexAlign.Start)
      .width('100%')
      .height('85%')
    }
    .height('100%')
  }
}