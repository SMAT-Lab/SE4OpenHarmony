/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import router from '@ohos.router'

@Entry
@Component
struct Index {

  @Builder
  buildButton(text1: string, page1: string, text2: string|null, page2: string|null) {
    Row({ space: 10 }) {
      Button(text1)
        .layoutWeight(1)
        .onClick(() => {
          let path = 'pages/' + page1
          console.log("jump:" + path);
          router.pushUrl({
            url: path,
          })
        })

      if (text2) {
        Button(text2)
          .layoutWeight(1)
          .onClick(() => {
            let path = 'pages/' + page2
            console.log("jump:" + path);
            router.pushUrl({
              url: path,
            })
          })
      }
    }.width('100%').justifyContent(FlexAlign.Center).padding({ left: 10, right: 10 })
  }

  build() {
    Column({ space: 20 }) {
      this.buildButton('显示Confirm弹框', 'Confirm', '显示带输入框的弹框', 'InputContent')
      this.buildButton('显示List弹框', 'ListSelect', '显示Loading弹框', 'Loading')
      this.buildButton('Bottom类型的List弹框', 'BottomListDialogExample', 'Bottom类型的自定义弹框', 'BottomScrollDialogExample')
      this.buildButton('复杂交互的Bottom弹框', 'BottomTextDialogExample', '显示气泡类型弹框', 'PopupButtonExample')
      this.buildButton('自定义全屏弹框', 'FullScreen', '消息类型弹框', 'Message')
      this.buildButton('顶部打开的弹框', 'TopContent', '联想类弹框', 'RealtimeInput')
      this.buildButton('抽屉类弹框', 'SideBarContainerExample', '弹框动画展示', 'PositionContent')
      this.buildButton('大图浏览类弹框', 'ImageBrowser', null, null)
    }
    .backgroundColor(Color.White).margin({ top: 20 })
  }
}