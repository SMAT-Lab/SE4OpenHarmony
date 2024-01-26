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

@Entry
@Component
struct Meeting_chat_setting {

  @State allList: Array<string> = []

  aboutToAppear() {
    this.onGetAllMeetingMember()
  }

  // todo 查看所有会议成员
  onGetAllMeetingMember() {
    this.allList.push('花花')
    this.allList.push('娜娜')
    this.allList.push('丽丽')
    this.allList.push('木木')
    this.allList.push('贱贱')
  }

  build() {
    Flex({ direction: FlexDirection.Column }) {
      Toolbar({
        title: '会议成员',
        isBack: true
      })

      List() {
        ForEach(this.allList, (item : string) => {
          ListItem() {
            Text(item)
              .padding(13)
              .backgroundColor('#ffffff')
              .fontSize(18)
              .width('100%')
              .margin({ bottom: 1 })

          }
        }, (item : string) => JSON.stringify(item))
      }
    }
    .backgroundColor('#ececec')
  }
}