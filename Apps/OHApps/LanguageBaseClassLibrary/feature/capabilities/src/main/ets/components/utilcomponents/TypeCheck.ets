/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

import { ShowKey } from './typecheck/ShowKey';
import { CheckType } from './typecheck/CheckType';


let int8Array: Int8Array = new Int8Array(new ArrayBuffer(8));
let numVal: Number = new Number(55);
let strVal: String = new String('zhangsan');
let boolVal: Boolean = new Boolean(true);
;
for (let i = 0; i < int8Array.length; i++) {
  int8Array[i] = i;
}

@Preview
@Component
export struct TypeCheck {
  @State checkResult: string = '';
  @State presetValue: Array<Int8Array | Number | String | Boolean> = [numVal, strVal, boolVal, int8Array];

  build() {
    Scroll() {
      Column() {
        Text(this.checkResult)
          .width('100%')
          .height(200)
          .fontSize(20)
          .margin(20)
          .padding({ left: 5, right: 5 })
          .border({ width: 2, radius: 15, color: Color.Gray })
        ShowKey({ presetValue: $presetValue, checkResult: $checkResult })
        CheckType({ presetValue: $presetValue, checkResult: $checkResult })
      }
      .width('100%')
      .padding(16)
    }
    .scrollBar(BarState.Off)
    .align(Alignment.Start)
  }
}