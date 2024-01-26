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
import { encode } from "@msgpack/msgpack";
import Util from './Util';

@Entry
@Component
struct MultiDecodePage {
  @State message: string = "展示原数据"
  @State message2: string = "decodeMulti解码后的数据展示"
  encodedUint8: Uint8Array | undefined = undefined;

  build() {
    Row() {
      Column() {
        Button('对象展示').onClick(() => {
          console.log('dodo click on!')
          let bar: Bar = {
            name: "bar",
          }
          this.message = JSON.stringify([
            "foo",
            10,
            bar,
            [1, 2, 3],
          ])
        })
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
        Button('点击MultiDecode').onClick(() => {
          let bar: Bar = {
            name: "bar",
          }
          let items = [
            "foo",
            10,
            bar,
            [1, 2, 3],
          ]
          let encodedItems = items.map((item) => encode<undefined>(item));
          let encoded = new Uint8Array(encodedItems.reduce((p, c) => p + c.byteLength, 0));
          let offset = 0;
          for (let encodedItem of encodedItems) {
            encoded.set(encodedItem, offset);
            offset += encodedItem.byteLength;
          }
          let result: Array<Object> = [];
          Util.decodeMultiSetResult(encoded, result)
          let retStr1 = JSON.stringify(result);
          this.message2 = retStr1;
        })
        Text(this.message2)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
      }
      .width('100%')
    }
    .height('100%')
  }
}

interface Bar {
  name: string;
}