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
import router from '@ohos.router';

@Entry
@Component
struct Index {
  build() {
    Row() {
      Column() {
        Button('简单编码解码')
          .onClick(() => {
            router.push({ url: 'pages/EncodeDecodePage' })
          })
        Button('构造器编码解码')
          .margin({ top: 10 })
          .onClick(() => {
            router.push({ url: 'pages/EncodeDecodeConstructorPage' })
          })
        Button('复杂Multi编码解码')
          .margin({ top: 10 })
          .onClick(() => {
            router.push({ url: 'pages/MultiDecodePage' })
          })
        Button('特殊字符扩展编解码')
          .margin({ top: 10 })
          .onClick(() => {
            router.push({ url: 'pages/ExamPage' })
          })
      }
      .width('100%')
    }
    .height('100%')
  }
}
