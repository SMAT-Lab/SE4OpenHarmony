/*
 * Copyright (c) 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import uart_ctl from '@ohos.uartapipart'
import Prompt from '@system.prompt'

@Entry
@Component
struct Index {
  @State title: string = 'Uart Demo'

  build() {
    Row() {
      Column() {
        Text(this.title)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
      }
      .width('100%')
    }
    .height('100%')
    .onAppear(() => {
      uart_ctl.onTouch((event) => {
        switch (event) {
          case uart_ctl.EventCode.right:
            Prompt.showToast({ message: "get event right" });
            break;
          case uart_ctl.EventCode.left:
            Prompt.showToast({ message: "get event left" });
            break;
          case uart_ctl.EventCode.back:
            Prompt.showToast({ message: "get event back" });
            break;
          case uart_ctl.EventCode.forward:
            Prompt.showToast({ message: "get event forward" });
            break;
          case uart_ctl.EventCode.pullUp:
            Prompt.showToast({ message: "get event pull up" });
            break;
          case uart_ctl.EventCode.pullDown:
            Prompt.showToast({ message: "get event pull down" });
            break;
          case uart_ctl.EventCode.pullMove:
            Prompt.showToast({ message: "get event pull move" });
            break;
          case uart_ctl.EventCode.touch1:
            Prompt.showToast({ message: "get event touch1" });
            break;
          case uart_ctl.EventCode.touch2:
            Prompt.showToast({ message: "get event touch2" });
            break;
          case uart_ctl.EventCode.touch3:
            Prompt.showToast({ message: "get event touch3" });
            break;
          case uart_ctl.EventCode.touch4:
            Prompt.showToast({ message: "get event touch4" });
            break;
          case uart_ctl.EventCode.touch5:
            Prompt.showToast({ message: "get event touch5" });
            break;
          default:
            Prompt.showToast({ message: "error" });
            break;
        }
      });
    })
  }
}