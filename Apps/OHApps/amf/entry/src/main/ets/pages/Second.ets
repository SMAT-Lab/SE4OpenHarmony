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

import {
  test1,
  test2,
  test3,
  test4,
  test5,
  test6,
  test7,
  test8,
  test9,
  test10
} from './testAmf'

@Entry
@Component
struct Index {
  @State message: string = 'AMF.stringify和AMF.parse,点击后看展示'
  @State message2: string = 'AMF.serialize和AMF.deserialize,点击后看展示'
  @State changedMsg: string = '待转换'
  @State changedMsg2: string = '待转换'
  @State hint1: string = '转换后数据'
  @State hint2: string = '转换后数据'
  @State data1: string = ''
  @State data2: string = ''

  build() {
    Scroll() {
      Column() {
        Button('测试接口响应时长')
          .onClick(() => {
            test1();
          })

        Button('测试基础数据类型')
          .onClick(() => {
            test2()
          })
          .margin({ top: 15 })
        Button('测试string')
          .onClick(() => {
            test3()
          })
          .margin({ top: 15 })
        Button('测试date')
          .onClick(() => {
            test4()
          })
          .margin({ top: 15 })
        Button('测试array')
          .onClick(() => {
            test5()
          })
          .margin({ top: 15 })
        Button('测试object')
          .onClick(() => {
            test6()
          })
          .margin({ top: 15 })
        Button('测试class mapping')
          .onClick(() => {
            test7()
          })
          .margin({ top: 15 })
        Button('测试class mapping + serializable')
          .onClick(() => {
            test8()
          })
          .margin({ top: 15 })
        Button('测试bytearray')
          .onClick(() => {
            test9()
          })
          .margin({ top: 15 })
        Button('测试Exception')
          .onClick(() => {
            test10()

          })
          .margin({ top: 15 })


      }
    }
    .width('100%')
    .height('100%')
  }
}