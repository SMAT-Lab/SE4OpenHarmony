/**
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * This software is distributed under a license. The full license
 * agreement can be found in the file LICENSE in this distribution.
 * This software may not be copied, modified, sold or distributed
 * other than expressed in the named license agreement.
 *
 * This software is distributed without any warranty.
 */

import { Toolbar } from '../../base/toolbar'
import router from '@ohos.router';
import { ChatContentEntity } from '../../../entity/ChatContentEntity'

@Entry
@Component
struct Meeting_chat_main {
  @State chatContentList: Array<ChatContentEntity> = []

  aboutToAppear() {

  }

  build() {
    Flex({ direction: FlexDirection.Column }) {
      Toolbar({
        title: '120会议',
        isBack: true,
        rightIcon: $r('app.media.more'),
        rightClickCallBack: () => {
          router.push({
            url: "pages/chat/meeting_chat/meeting_chat_setting"
          })
        }
      })

      Stack({ alignContent: Alignment.Bottom }) {
        List() {
          ForEach(this.chatContentList, (item : ChatContentEntity) => {
            ListItem() {
              Flex({ direction: FlexDirection.Column }) {
                if (item.isTip) {
                  Column() {
                    Text(item.message)
                      .fontSize(13)
                      .textAlign(TextAlign.Center)
                      .backgroundColor('#ffe2e2e2')
                      .padding({ left: 10, right: 10, top: 5, bottom: 5 })
                      .borderRadius(10)
                  }.width('100%')
                } else {
                  Flex({ justifyContent: item.author == '1' ? FlexAlign.End : FlexAlign.Start }) {
                    Flex({ direction: FlexDirection.Column }) {
                      Text(item.author == '1' ? '我' : item.author)
                        .fontSize(15)
                        .padding(5)
                        .alignSelf(item.author == '1' ? ItemAlign.End : ItemAlign.Start)
                      if (item.messageType == 1) {
                        Text(item.message)
                          .backgroundColor(item.author != '1' ? '#ffffff' : '#95ec69')
                          .padding({ left: 15, top: 10, right: 15, bottom: 10 })
                          .alignSelf(ItemAlign.End)
                          .fontSize(18)
                          .borderRadius(10)
                      } else if (item.messageType == 2) {
                        Image(item.message)
                          .objectFit(ImageFit.Cover)
                          .width('50%')
                      }
                    }
                  }
                }
              }
            }
            .padding(10)
          }, (item : ChatContentEntity) => JSON.stringify(item))
        }
        .margin({ bottom: 60 })

        Flex({ direction: FlexDirection.Row, justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center }) {
          TextInput({ placeholder: '请输入' })
          Button('发 送').width(100).margin({ left: 8 })
            .onClick(e => {
              this.onSendMeetingMessage()
            })
        }
        .height(60)
        .width('100%')
        .padding({ left: 15, right: 15 })
        .backgroundColor('#ffffff')
      }
    }
    .height('100%')
    .backgroundColor('#ececec')
  }

  // todo 发送会议信息
  onSendMeetingMessage() {

  }
}