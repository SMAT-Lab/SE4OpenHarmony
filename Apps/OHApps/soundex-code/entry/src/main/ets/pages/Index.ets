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
import { soundex } from 'soundex-code'

@Entry
@Component
struct Index {
  @State message: string = '点我看测试结果'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            this.clickTest();
          })
      }
      .width('100%')
    }
    .height('100%')
  }

  clickTest() {
    let a1 = soundex('phonetics') // => 'P532'
    let a2 = soundex('Ashcraft') // => 'A261'
    let a3 = soundex('Lissajous') // => 'L222'
    let a4 = soundex('Smith') === soundex('Schmit') // => true
    let a5 = soundex('Ashcraftersson', 6) // => 'A26136'
    let a6 = soundex('A', 6) // => 'A000'
    console.log("soundex('phonetics') ="+a1)
    console.log("soundex('Ashcraft') ="+a2)
    console.log("soundex('Lissajous') ="+a3)
    console.log("soundex('Smith') === soundex('Schmit') ="+a4)
    console.log("soundex('Ashcraftersson') ="+a5)
    console.log("soundex('A', 6) ="+a6)
  }
}