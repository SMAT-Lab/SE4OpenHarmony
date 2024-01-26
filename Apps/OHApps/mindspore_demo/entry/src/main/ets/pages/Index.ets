/* Copyright 2023 Unionman Technology Co., Ltd.
 *
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
 *
 */
import hilog from '@ohos.hilog'
import msliteNapi from 'libentry.so' // 导入msliteNapi模块。

let context = getContext()
const TAG = 'MSLiteNativeDemo'
let resourceManager = context.resourceManager;
@Entry
@Component
struct Index {
  @State message: string = 'MindSpore Lite Demo'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(30)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
              hilog.info(0x0000, TAG, '*** Start MSLite Demo ***');
              let ret: number = 0;
              ret = msliteNapi.runDemo("", resourceManager); // 调用runDemo()，执行AI模型推理。
              if (ret == -1) {
                hilog.info(0x0000, TAG, 'Error when running MSLite Demo!')};
              hilog.info(0x0000, TAG, '*** Finished MSLite Demo ***');
          })
      }
      .width('100%')
    }
    .height('100%')
  }
}