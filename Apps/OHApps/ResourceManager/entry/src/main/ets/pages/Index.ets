/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import CommonEventManager from '@ohos.commonEventManager';
import { BusinessError } from '@ohos.base';

let subscriber: CommonEventManager.CommonEventSubscriber; // 用于保存创建成功的订阅者对象，后续使用其完成订阅及退订的动作
// 订阅者信息
let subscribeInfo: CommonEventManager.CommonEventSubscribeInfo = {
  events: ["TestResourcesEvent"]
};
// 订阅事件回调
function JumpToResApiExample (err: BusinessError, data: CommonEventManager.CommonEventData) {
  if (err) {
    console.error(`subscribe failed, code is ${err.code}, message is ${err.message}`);
  } else {
    router.pushUrl({ url: 'pages/BasicResources' });
  }
}
// 创建订阅者回调
function createTestResources(err: BusinessError, commonEventSubscriber: CommonEventManager.CommonEventSubscriber) {
  if(!err) {
    subscriber = commonEventSubscriber;
    try {
      CommonEventManager.subscribe(subscriber, JumpToResApiExample);
    } catch (error) {
      let code = (error as BusinessError).code;
      let message = (error as BusinessError).message;
      console.error(`subscribe failed, code is ${code}, message is ${message}`);
    }
  } else {
    console.error(`createSubscriber failed, code is ${err.code}, message is ${err.message}`);
  }
}
// 创建订阅者
try {
  CommonEventManager.createSubscriber(subscribeInfo, createTestResources);
} catch (error) {
  let code = (error as BusinessError).code;
  let message = (error as BusinessError).message;
  console.error(`createSubscriber failed, code is ${code}, message is ${message}`);
}

@Entry
@Component
struct Index {
  build() {
    Column({ space: 20 }) {
      Text($r('app.string.title'))
        .width('100%')
        .height(50)
        .backgroundColor($r('app.color.text_color'))
        .fontColor(Color.White)
        .fontSize(20)
        .padding({ left: 15 })

      Button($r('app.string.testResources')).onClick(() => {
        router.pushUrl({ url: 'pages/BasicResources' });
      })
        .width('80%')
        .height(50)
        .margin({ top: 200 })
        .fontWeight(FontWeight.Bold)
        .align(Alignment.Center)
        .position({x:50, y:50});

      Button($r('app.string.testOverlay')).onClick(() => {
        router.pushUrl({ url: 'pages/Overlay' });
      })
        .width('80%')
        .height(50)
        .margin({ top: 200 })
        .fontWeight(FontWeight.Bold)
        .align(Alignment.Center)
        .position({x:50, y:120})

    }.width('100%').height(100)
  }
}