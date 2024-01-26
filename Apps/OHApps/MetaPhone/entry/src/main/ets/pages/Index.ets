/**
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
import { metaphone } from 'metaphone'
import hilog from '@ohos.hilog'

@Entry
@Component
struct Index {
  @State message: string = 'Hello World'

  build() {
    Row() {
      Column({ space: 10 }) {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)

        Button('获取发音代码:undefined')
          .width('80%')
          .height('100px')
          .onClick(() => {
            let result = metaphone(undefined);
            hilog.info(0x0000, 'metaPhone', '%{public}s', "result: " + result)
          })
        Button('获取发音代码:null')
          .width('80%')
          .height('100px')
          .onClick(() => {
            let result = metaphone(null);
            hilog.info(0x0000, 'metaPhone', '%{public}s', "result: " + result)
          })
        Button("获取发音代码：''")
          .width('80%')
          .height('100px')
          .onClick(() => {
            let result = metaphone('');
            hilog.info(0x0000, 'metaPhone', '%{public}s', "result: " + result)
          })

        Button('获取发音代码：0 1 2')
          .width('80%')
          .height('100px')
          .onClick(() => {
            let result = metaphone('0 1 2');
            hilog.info(0x0000, 'metaPhone', '%{public}s', "result: " + result)
          })

        Button('获取发音代码： f o ')
          .width('80%')
          .height('100px')
          .onClick(() => {
            let result = metaphone(' f o ');
            hilog.info(0x0000, 'metaPhone', '%{public}s', "result: " + result)
          })

        Button('获取发音代码:0f1o2')
          .width('80%')
          .height('100px')
          .onClick(() => {
            let result = metaphone('0f1o2');
            hilog.info(0x0000, 'metaPhone', '%{public}s', "result: " + result)
          })

        Button('获取发音代码:Agrippa')
          .width('80%')
          .height('100px')
          .onClick(() => {
            let result = metaphone('Agrippa');
            hilog.info(0x0000, 'metaPhone', '%{public}s', "result: " + result)
          })
      }
      .width('100%')
    }
    .height('100%')
  }
}