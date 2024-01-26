/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
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

import { length, encode, decode, test } from '@protobufjs/base64'
import util from '@ohos.util';

@Entry
@Component
struct Index {
    @State private testString: string = "harmonys os";
    @State message: string = ''

    build() {
        Row() {
            Column() {
                TextInput({ text: this.testString, placeholder: '请输入内容' })
                    .fontSize(16)
                    .onChange((value: string) => {
                        this.testString = value
                    })
                Button("encode")
                    .fontSize(30)
                    .margin({top:20})
                    .fontWeight(FontWeight.Bold)
                    .onClick(event => {
                        const textEncoder = new util.TextEncoder()
                        let uint8Array = textEncoder.encodeInto(this.testString)
                        this.message = "encode result: " + encode(uint8Array, 0, uint8Array.length)
                    })

                Button("decode")
                    .fontSize(30)
                    .fontWeight(FontWeight.Bold)
                    .margin({ top: 20 })
                    .onClick(event => {
                        const textEncoder = new util.TextEncoder()
                        let uint8Array = textEncoder.encodeInto(this.testString)
                        let encodeStr = encode(uint8Array, 0, uint8Array.length)

                        let decodeUint8Array = new Uint8Array(length(encodeStr))
                        decode(encodeStr, decodeUint8Array, 0)
                        this.message = "decode result: " + JSON.stringify(decodeUint8Array)
                    })

                Button("length")
                    .fontSize(30)
                    .fontWeight(FontWeight.Bold)
                    .margin({ top: 20 })
                    .onClick(event => {
                        const textEncoder = new util.TextEncoder()
                        let uint8Array = textEncoder.encodeInto(this.testString)
                        let encodeStr = encode(uint8Array, 0, uint8Array.length)
                        this.message = "byte length: " + length(encodeStr)
                    })

                Button("test")
                    .fontSize(30)
                    .fontWeight(FontWeight.Bold)
                    .margin({ top: 20 })
                    .onClick(event => {
                        this.message = "test result: " + test(this.testString) + "\r\n"
                    })
                Text(this.message)
                    .fontSize(18)
                    .margin({ right: 10, left: 10 })
                    .fontWeight(FontWeight.Bold)
                    .height("50%")
            }
            .width('100%')
        }
        .height('100%')
    }
}

