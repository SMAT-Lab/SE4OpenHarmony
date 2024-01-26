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
import EventEmitter from 'eventemitter3'
import router from '@ohos.router';
import { GlobalContext } from './GlobalContext'

@Entry
@Component
struct JumpOne {
  @State message: string = 'Hello World'

  aboutToAppear() {
    const ctx = this
    let emitter: EventEmitter<string, Object> | undefined = GlobalContext.getContext()
      .getObject(GlobalContext.KEY_EMITTER) as EventEmitter<string, Object>;
    if (emitter) {
      emitter.on('pageOne', (data: string) => {
        console.log(`componentB Data: ${data}`);
        ctx.message = data
      });
    }
  }

  onPageShow() {

  }

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .width('100%')
          .backgroundColor(Color.Grey)
          .fontColor(Color.Black)
          .height(150)
        Button('去第二个页面')
          .backgroundColor(Color.Blue)
          .fontColor(Color.White)
          .width('100%')
          .height(50)
          .margin(20)
          .onClick(() => {
            router.pushUrl({
              url: 'pages/JumpTwo'
            }).then(() => {
              let emitter: EventEmitter<string, Object> | undefined = GlobalContext.getContext()
                .getObject(GlobalContext.KEY_EMITTER) as EventEmitter<string, Object>;
              if (emitter) {
                emitter.emit('pageTwo', '这是第一页发给第二个页面的信息');
              }
            })
          })
        Button('返回')
          .backgroundColor(Color.Blue)
          .fontColor(Color.White)
          .width('100%')
          .height(50)
          .margin(20)
          .onClick(() => {
            router.back({
              url: "pages/Index"
            })
          })
      }
      .width('100%')
    }
    .height('100%')
  }
}