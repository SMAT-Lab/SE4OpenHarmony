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
struct Add_group {
  @State groupName: string = ''

  build() {
    Flex({ direction: FlexDirection.Column }) {
      Toolbar({
        title: '创建好友分组',
        isBack: true
      })
      Flex({ direction: FlexDirection.Column }) {
        Text('分组名称').fontSize(30).padding(10)
        TextInput({ text: this.groupName , placeholder: '请输入'})
          .height(80)
          .fontSize(30)
          .onChange(v => {
            this.groupName = v
          })
        Button('创 建')
          .height(80)
          .fontSize(30)
          .onClick(e => {
          this.onAddGroup()
        }).margin({ top: 20 })
      }
      .padding(30)
    }
    .backgroundColor('#ffffff')
    .borderRadius(10)
  }

  // todo 创建好友分组
  onAddGroup() {
    if (this.groupName == '') {
      prompt.showToast({
        message: '请输入完整'
      })
    } else {
      Smack.createGroup(this.groupName + '@' + Constant.HOST_IP)

      prompt.showToast({
        message: '已创建'
      })
    }
  }
}