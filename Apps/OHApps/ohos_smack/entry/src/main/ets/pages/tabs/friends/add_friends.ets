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
import prompt from '@ohos.prompt';
import { Constant } from '../../../entity/Constant'
import { Smack } from '@ohos/smack'

@Entry
@Component
struct Add_friends {
  @State name: string = ''
  @State group: string = ''

  build() {
    Flex({ direction: FlexDirection.Column }) {
      Toolbar({
        title: '添加好友',
        isBack: true
      })
      Flex({ direction: FlexDirection.Column }) {
        Text('名称').fontSize(30).padding(10)

        TextInput({ text: this.name }).height(80)
          .fontSize(30)
          .onChange(value => {
            this.name = value
          })
        Text('分组').fontSize(30).padding(10)
        TextInput({ text: this.group }).height(80)
          .fontSize(30)
          .onChange(value => {
            this.group = value
          })

        Button('添 加')
          .height(80)
          .fontSize(30)
          .onClick(e => {
          this.onAddFriends()
        }).margin({ top: 20 })
      }
      .padding(30)
    }
    .backgroundColor('#ffffff')
    .borderRadius(10)
  }

  // todo 添加好友
  onAddFriends() {
    if (this.name == '' || this.group == '') {
      prompt.showToast({
        message: '请输入完整'
      })
    } else {
      Smack.addFriends(this.name + "@" + Constant.HOST_DOMAIN, this.name, this.group)
      prompt.showToast({
        message: '已发送好友请求'
      })
    }
  }
}