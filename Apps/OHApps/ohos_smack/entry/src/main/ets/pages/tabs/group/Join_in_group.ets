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
import { Smack } from '@ohos/smack'
import { Constant } from '../../../entity/Constant'
import prompt from '@ohos.prompt';

@Entry
@Component
struct Join_in_group {
  private room: string = '';

  build() {
    Flex({ direction: FlexDirection.Column }) {
      Toolbar({
        title: '加入群聊',
        isBack: true
      })
      Flex({ direction: FlexDirection.Column }) {
        Text('群聊名称').fontSize(15).padding(10)
        TextInput().onChange((str: string) => {
          this.room = str;
        })
        Button('加 入').onClick(e => {
          if (this.room) {
            this.onJoinInGroup()
          } else {
            prompt.showToast({
              message: '输入房间名称'
            })
          }
        }).margin({ top: 20 })
      }
      .padding(30)
    }
    .backgroundColor('#ffffff')
    .borderRadius(10)
  }

  // todo 加入群聊
  onJoinInGroup() {
    Smack.createOrJoinRoom(this.room, Constant.HOST_DOMAIN, Constant.SERVICE_NAME/*, password?: string*/)
    setTimeout(() => {
      let isJoined = Smack.isJoined();
      if (isJoined == '1') {
        router.replace({
          url: 'pages/chat/group_chat/group_chat_main'
        })
      } else {
        prompt.showToast({
          message: '进入房间失败'
        })
      }
    }, 500)
  }
}