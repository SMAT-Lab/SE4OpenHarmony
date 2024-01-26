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
import {Constant} from '../../../entity/Constant'
import { Smack } from '@ohos/smack'
import { GlobalContext } from '../../../entity/GlobalContext';

@Entry
@Component
export struct Group_list {
  @State groupList: Array<string> = []
  dialogController: CustomDialogController = new CustomDialogController({
    builder: CustomDialogExample({}),
    customStyle: true,
    alignment: DialogAlignment.TopEnd,
    offset: { dx: -20, dy: 50 }
  })

  aboutToAppear() {
    this.getAllGroup()
  }

  // todo 获取所有群聊列表
  getAllGroup() {
    for (let i = 0; i < 10; i++) {
      this.groupList.push('群聊名称 ' + (i + 1))
    }
  }

  build() {
    Column() {
      Toolbar({ title: '群聊',
        rightIcon: $r('app.media.add'),
        rightClickCallBack: () => {
          this.dialogController.open()
        }
      })
//      List() {
//        ForEach(this.groupList, item => {
//          ListItem() {
//            Column() {
//              Text(item)
//                .fontSize(18)
//                .padding(12)
//                .width('100%')
//                .textAlign(TextAlign.Start)
//                .margin({ bottom: 1 })
//                .backgroundColor('#ffffff')
//            }
//          }
//          .onClick(e => {
//            router.push({
//              url: 'pages/chat/group_chat/group_chat_main'
//            })
//          })
//        }, item => item.toString())
//      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#ffffff')

  }
}

@CustomDialog
struct CustomDialogExample {
  controller: CustomDialogController = {} as CustomDialogController

  build() {
    Column() {
      Text('创建群聊')
        .fontSize(36)
        .padding(10)
        .onClick(() => {
          router.push({
            url: 'pages/tabs/group/create_group_chat'
          })
          if(this.controller != null){
            this.controller.close()
          }
        })

      Text('')
        .height(1)
        .width('100%')
        .backgroundColor('#ececec')

      Text('加入群聊')
        .fontSize(36)
        .padding(10)
        .onClick(() => {
          router.push({
            url: 'pages/tabs/group/Join_in_group'
          })
          if(this.controller != null) {
            this.controller.close()
          }
        })
      // Text('加入加密群聊')
      //   .fontSize(36)
      //   .padding(10)
      //   .onClick(() => {
      //     if(this.controller != null) {
      //       this.controller.close()
      //     }
      //   })
    }
    .backgroundColor('#ffffff')
    .borderRadius(10)
    .width(100)

  }
}


