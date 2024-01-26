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
import caverPhone from 'caverphone'
import hilog from '@ohos.hilog';

@Entry
@Component
struct Index {
  build() {
    Row() {
      Column({ space: 10 }) {
        Button('解析null')
          .width('80%')
          .height('100px')
          .onClick(() => {
            try {
              let result: caverPhone = caverPhone(null);
              hilog.info(0x0000, 'caverPhone', '%{public}s', result)
            } catch (error) {
              hilog.info(0x0000, 'caverPhone', '%{public}s', "error: " + error)
            }
          })

        Button('解析undefined')
          .width('80%')
          .height('100px')
          .onClick(() => {
            try {
              let result: caverPhone = caverPhone(undefined);
              hilog.info(0x0000, 'caverPhone', '%{public}s', result)
            } catch (error) {
              hilog.info(0x0000, 'caverPhone', '%{public}s', "error: " + error)
            }
          })

        Button('解析空字符串')
          .width('80%')
          .height('100px')
          .onClick(() => {
            let result: caverPhone = caverPhone('');
            hilog.info(0x0000, 'caverPhone', '%{public}s', result)
          })

        Button('解析汉字')
          .width('80%')
          .height('100px')
          .onClick(() => {
            let result: caverPhone = caverPhone('你好啊');
            hilog.info(0x0000, 'caverPhone', '%{public}s', result)
          })

        Button('解析Cailean')
          .width('80%')
          .height('100px')
          .onClick(() => {
            let result: caverPhone = caverPhone('Cailean');
            hilog.info(0x0000, 'caverPhone', '%{public}s', result)
          })
      }
      .width('100%')
    }
    .height('100%')
  }
}