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
import { Smack } from '@ohos/smack'

@Entry
@Component
struct Change_group_name {
  @State oldName: string = ''
  @State newName: string = ''

  aboutToAppear() {
    this.oldName = (router.getParams() as Record<string, Object>)['name'] as string
  }

  build() {
    Flex({ direction: FlexDirection.Column }) {
      Toolbar({
        title: '修改分组名称',
        isBack: true
      })
      Flex({ direction: FlexDirection.Column }) {
        Text('原始名称：' + this.oldName).fontSize(30).padding(10)

        Text('新的名称').fontSize(30).padding(10)
        TextInput({ placeholder: "请输入" })
          .height(80)
          .fontSize(30)
          .onChange(value => {
            this.newName = value
          })

        Button('修 改')
          .height(80)
          .fontSize(30)
          .onClick(e => {
            this.onChangeName()
          }).margin({ top: 20 })
      }
      .padding(30)
    }
    .backgroundColor('#ffffff')
    .borderRadius(10)
  }

  // todo 修改分组名称
  onChangeName() {
    if (this.newName == '') {
      prompt.showToast({
        message: '请输入完整'
      })
    } else {
      Smack.changeGroup(this.oldName, this.newName);
      prompt.showToast({
        message: '已修改'
      })
    }
  }
}