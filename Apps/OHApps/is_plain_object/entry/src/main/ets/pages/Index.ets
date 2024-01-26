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
import {isPlainObject} from 'is-plain-object'

@Entry
@Component
struct Index {
  @State message: string = 'Test'
  @State public result: Boolean = false
  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
        Button('isObject')
          .width('90%')
          .height(50)
          .margin({
            bottom: 10
          })
          .onClick(() => {
            this.click()
          })
        Text("结果 :" + this.result)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .margin({ top: "30px" })
      }
      .width('100%')
    }
    .height('100%')
  }
  click(){
    this.result = isPlainObject({});
    console.log('isObject expect true',this.result);
  }
}