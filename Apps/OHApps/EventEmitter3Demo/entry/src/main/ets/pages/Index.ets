/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import router from '@ohos.router'
import EventEmitter from 'eventemitter3'
import { GlobalContext } from './GlobalContext'

@Entry
@Component
struct Index {
  @State message: string = '常用场景举例'
  @State emitter: EventEmitter<string, Object> | undefined = undefined;

  aboutToAppear() {
    this.emitter = new EventEmitter<string, Object>();
  }

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(30)
          .fontWeight(FontWeight.Bold)
          .textAlign(TextAlign.Center)
          .width('100%')
          .height(100)

        Button('监听文件读取完成的事件')
          .width('100%')
          .height(50)
          .backgroundColor(Color.Blue)
          .fontColor(Color.White)
          .margin(20)
          .onClick(() => {
            router.pushUrl({
              url: 'pages/FileRead'
            })
          })
        Button() {
          Text('页面之间的通信: \r\n1.不同的页面之间通信 需要使用同一个EventEmitter对象\r\n2.不同的页面之间通信 发送事件.emit一定要在监听事件emitter.on之后，否则无法接收')
            .textAlign(TextAlign.Center)
        }
        .width('100%')
        .backgroundColor(Color.Blue)
        .fontColor(Color.White)
        .padding(10)
        .margin(20)
        .onClick(() => {
          router.pushUrl({
            url: 'pages/JumpOne'
          }).then(() => {
            let emitterInstance: EventEmitter<string, Object> | undefined = GlobalContext.getContext()
              .getObject(GlobalContext.KEY_EMITTER) as EventEmitter<string, Object>;
            if (emitterInstance) {
              emitterInstance.emit('pageOne', '这是首页发给第一个页面的信息');
            }
          })

        })

        Button('处理事件排序')
          .width('100%')
          .height(50)
          .backgroundColor(Color.Blue)
          .fontColor(Color.White)
          .margin(20)
          .onClick(() => {
            router.pushUrl({
              url: 'pages/EventSequencing'
            })
          })
        Button('测试所有API')
          .width('100%')
          .height(50)
          .backgroundColor(Color.Blue)
          .fontColor(Color.White)
          .margin(20)
          .onClick(() => {
            router.pushUrl({
              url: 'pages/ApiTest'
            })
          })

      }
      .width('100%')
    }
    .height('100%')
  }
}