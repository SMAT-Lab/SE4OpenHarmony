/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
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
import Logger from '../../utils/Logger';
import { ChatSource } from '../data/DataSource';
import ChatComponent from '../../component/ChatComponent'
import { ChatBox } from '../data/ChatBox'
import { getMockTool } from '../../mock/MockData'
import Tool from '../data/Tool'
import User from '../data/User'
import ChatController from '../../controller/ChatController';
import LoginResult from '../data/LoginResult';

const TAG: string = '[ChatPage]';

@Entry
@Component
struct ChatPage {
  private scroller: Scroller = new Scroller();
  private scrollerTool: Scroller = new Scroller();
  @State chats: ChatSource = new ChatSource();
  private toolArr: Array<Tool> = getMockTool(); // 用户信息模拟数据
  @State isSend: boolean = true; // 是否为发送消息
  @State isInput: boolean = false; // 是否正在输入
  private currentUser: User | null = null; // 当前用户信息
  private oppositeUser: User | null = null; // 对端用户信息
  private userInfo: LoginResult | null = null; // 登录返回结果信息
  private chatController: ChatController = new ChatController();
  @State inputValue: string = '';

  aboutToAppear() {
    if (AppStorage.get("currentUser")) {
      this.currentUser = AppStorage.get("currentUser")!;
    }
    if (AppStorage.get("oppositeUser")) {
      this.oppositeUser = AppStorage.get("oppositeUser")!;
    }
    if (AppStorage.get("userInfo")) {
      this.userInfo = AppStorage.get("userInfo")!;
    }

    this.chatController.onMessage(this.userInfo?.getId(), (value: string) => {
      Logger.info(TAG, `ChatPage onMessage begin msg value: ${value}`);
      if (value) {
        this.chats.pushData(new ChatBox(false, value, this.oppositeUser?.getUserIcon()));
      }
    })

  }

  build() {
    Column() {
      Row() {
        Image($r('app.media.app_icon'))
          .id('chatBack')
          .width(20)
          .height(20)
          .objectFit(ImageFit.Contain)
          .margin({ left: 16 })
          .onClick(e => {
            router.back();
          })
        Image($r('app.media.app_icon'))
          .width(50)
          .height(50)
          .objectFit(ImageFit.Contain)
          .margin({ left: 16, right: 16 })
          .borderRadius(25)
        Text(this.oppositeUser?.getUsername())
          .height(30)
          .fontColor($r('app.color.COLOR_FFFFFF'))
          .fontSize(20)
          .fontFamily($r('app.string.Font_family_regular'))
          .textAlign(TextAlign.Center)

        Blank()

        Image($r('app.media.app_icon'))
          .width(32)
          .height(32)
          .objectFit(ImageFit.Contain)
          .margin({ left: 20 })
        Image($r('app.media.app_icon'))
          .width(32)
          .height(32)
          .objectFit(ImageFit.Contain)
          .margin({ left: 20 })
        Image($r('app.media.app_icon'))
          .width(32)
          .height(32)
          .objectFit(ImageFit.Contain)
          .margin({ left: 20, right: 20 })
      }
      .width('100%')
      .height('8%')
      .justifyContent(FlexAlign.SpaceBetween)

      Divider()
        .vertical(false)
        .height(2)
        .color($r('app.color.COLOR_1E1E1E'))

      // 消息滚动面板
      Column() {
        Scroll(this.scroller) {
          Column() {
            LazyForEach(this.chats, (item: ChatBox, index: number) => {
              Row() {
                ChatComponent({ item: item })
              }
              .margin({ top: 5, bottom: 10 })
            }, (item: ChatBox) => item.message)
          }
          .width('100%')
          .margin({ top: 10 })
        }
        .scrollable(ScrollDirection.Vertical)
        .scrollBar(BarState.Off)
        .width('100%')
        .height('100%')
        .margin({ bottom: 8 })
        .align(Alignment.Top)
      }
      .width('100%')
      .height('75%')

      Column() {
        // 工具栏
        Row() {
          // 横向工具栏列表
          Scroll(this.scrollerTool) {
            Row() {
              ForEach(this.toolArr, (tool: Tool) => {
                Row() {
                  Image($r('app.media.app_icon'))
                    .width(30)
                    .height(30)
                    .objectFit(ImageFit.Contain)
                    .margin({ right: 8 })
                  Text(tool.getToolName())
                    .height(20)
                    .fontColor($r('app.color.COLOR_E6FFFFFF'))
                    .fontSize(16)
                    .fontFamily($r('app.string.Font_family_regular'))
                    .textAlign(TextAlign.Center)
                    .textOverflow({ overflow: TextOverflow.Ellipsis })
                }
                .width(120)
                .height('80%')
                .margin({ left: 12 })
                .backgroundColor($r('app.color.COLOR_393939'))
                .borderRadius(18)
                .justifyContent(FlexAlign.Center)
              })
            }
            .height('100%')
            .justifyContent(FlexAlign.Start)
          }
          .scrollable(ScrollDirection.Horizontal)
          .scrollBar(BarState.Off)
          .width('95%')
          .height('100%')
        }
        .width('100%')
        .height('40%')

        // 消息输入框
        Row() {
          this.inputComponent()
        }
        .width('100%')
        .height('60%')
      }
      .width('100%')
      .height('17%')
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.COLOR_000000'))
  }

  @Builder
  inputComponent() {
    Stack() {
      Row()
        .width('95%')
        .height('70%')
        .borderRadius(32)
        .backgroundColor($r('app.color.COLOR_393939'))

      if (this.isInput) {
        Row() {
          Row() {
            Image($r('app.media.app_icon'))
              .width(26)
              .height(26)
              .objectFit(ImageFit.Contain)
          }
          .width(44)
          .height(44)
          .margin({ left: 5 })
          .borderRadius(22)
          .backgroundColor($r('app.color.COLOR_168CF6'))
          .justifyContent(FlexAlign.Center)

          Blank()

          Image($r('app.media.app_icon'))
            .width(42)
            .height(42)
            .objectFit(ImageFit.Contain)

          Row() {
            Image($r('app.media.app_icon'))
              .width(32)
              .height(32)
              .objectFit(ImageFit.Contain)
          }
          .id('msgSend')
          .width(36)
          .height(36)
          .margin({ left: 15, right: 10 })
          .borderRadius(22)
          .backgroundColor($r('app.color.COLOR_FE2B54'))
          .justifyContent(FlexAlign.Center)
          .onClick(e => {
            Logger.info(TAG, 'onClick send');
            if (this.inputValue) {
              this.chats.pushData(new ChatBox(true, this.inputValue, this.currentUser?.getUserIcon()));
              this.chatController.sendMessage(this.oppositeUser?.getUsername(), this.inputValue);
              this.inputValue = '';
            }
          })
        }
        .width('95%')
        .height('70%')
      } else {
        Row() {
          Row() {
            Image($r('app.media.app_icon'))
              .width(28)
              .height(28)
              .objectFit(ImageFit.Contain)
          }
          .width(44)
          .height(44)
          .margin({ left: 5 })
          .borderRadius(22)
          .backgroundColor($r('app.color.COLOR_AE4EF7'))
          .justifyContent(FlexAlign.Center)

          Blank()

          Image($r('app.media.app_icon'))
            .width(42)
            .height(42)
            .objectFit(ImageFit.Contain)
          Image($r('app.media.app_icon'))
            .width(42)
            .height(42)
            .objectFit(ImageFit.Contain)
            .margin({ left: 15, right: 15 })
          Image($r('app.media.app_icon'))
            .width(36)
            .height(36)
            .objectFit(ImageFit.Contain)
            .margin({ right: 10 })
        }
        .width('95%')
        .height('70%')
      }

      TextInput({ placeholder: $r('app.string.Send_Message'), text: this.inputValue })
        .id('chatInput')
        .width('50%')
        .height('65%')
        .placeholderColor($r('app.color.COLOR_99F1F3F5'))
        .backgroundColor($r('app.color.COLOR_393939'))
        .fontColor($r('app.color.COLOR_FFFFFF'))
        .offset({ x: -50 })
        .padding({ left: 0 })
        .onChange(value => {
          Logger.info(TAG, `TextInput onChange value= ${value}`);
          this.inputValue = value;
          if (this.inputValue) {
            this.isInput = true;
          } else {
            this.isInput = false;
          }
        })
    }
    .alignContent(Alignment.Center)
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.COLOR_000000'))
  }
}