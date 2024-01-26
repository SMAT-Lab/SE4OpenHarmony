/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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

async function routePage(index: number) {
  let path:string = '';
  switch (index) {
    case 0:
      path = 'pages/simpleParseXml';
      break
    case 1:
      path = 'pages/promiseUsage';
      break
    case 2:
      path = 'pages/xmlBuilder';
      break
    case 3:
      path = 'pages/processingAttribute';
      break
  }
  let options:ESObject = {
    url: path
  }as ESObject
  try {
    await router.push(options)
  } catch (err) {
    console.error(`fail callback,code:${err.code},msg:${err.msg}`)
  }
}

@Entry
@Component
struct Index {
  build() {
    Row() {
      Column() {
        Button("简单解析XML")
          .fontSize(30)
          .margin(10)
          .onClick(() => {
            routePage(0)
          })
        Button("使用PromiseUsage方式解析")
          .fontSize(30)
          .margin(10)
          .onClick(() => {
            routePage(1)
          })
        Button("构建xml")
          .fontSize(30)
          .margin(10)
          .onClick(() => {
            routePage(2)
          })
        Button("处理属性、标签名称和值")
          .fontSize(30)
          .margin(10)
          .onClick(() => {
            routePage(3)
          })
      }
      .width('100%')
    }
    .height('100%')
  }
}