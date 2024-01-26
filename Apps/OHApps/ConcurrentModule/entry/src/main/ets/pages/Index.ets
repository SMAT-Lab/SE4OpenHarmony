/*
 * Copyright (c) 2023 Shenzhen Kaihong Digital Industry Development Co., Ltd.
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
import { Logger } from '../common/Common';
import fs from '@ohos.file.fs';

@Entry
@Component
struct Index {
  scroller: Scroller = new Scroller();

  build() {
    Scroll(this.scroller) {
      Row() {
        Column() {
          Button($r('app.string.strSortText'))
            .fontSize(16)
            .fontColor('#FFFFFF')
            .fontWeight(500)
            .padding(15)
            .margin(10)
            .width('300')
            .height('60')
            .id('strSort')
            .onClick(() => {
              router.pushUrl({
                url: 'pages/StrSort',
                params: {
                  data: 'message',
                }
              }, router.RouterMode.Standard);
            })

          Button($r('app.string.copyFileText'))
            .fontSize(16)
            .fontColor('#FFFFFF')
            .fontWeight(500)
            .padding(15)
            .margin(10)
            .width('300')
            .height('60')
            .id('fileCopy')
            .onClick(() => {
              router.pushUrl({
                url: 'pages/CopyFile',
                params: {
                  data3: 'message',
                }
              }, router.RouterMode.Standard);
            })
        }
        .width('100%')
      }
      .backgroundColor('#f1f3f5')
      .height('100%')
    }
  }
}