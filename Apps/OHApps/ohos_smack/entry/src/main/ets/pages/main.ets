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

import { Friends_list } from './tabs/friends/friends_list'
import { Group_list } from './tabs/group/group_list'
import { Meeting_list } from './tabs/meeting/meeting_list'
import { Setting } from './tabs/setting'
import {Constant} from '../entity/Constant'
import { Smack } from '@ohos/smack'
import prompt from '@ohos.prompt'

@Entry
@Component
struct Main {
  @State message: string = 'Hello World'
  @State mbare: string = ""
  @State musername: string = ""
  @State  mmsg: string = ""
  addFriendsDialog: CustomDialogController = new CustomDialogController({
    builder: AddFriendsDialog({
      bare:$mbare,
      user:$musername,
      Message:$mmsg,
    }),
    customStyle: true,
    autoCancel: false,
    alignment: DialogAlignment.Center,
  })

  aboutToAppear() {

    Smack.handleSubscriptionRequestListener((json:ESObject) => {
      console.info("收到好友添加申请"+json)
      setTimeout(()=>{
        let obj:ESObject=JSON.parse(json)
        this.mbare = obj.jid
        this.musername = obj.name
        this.mmsg = obj.msg
        if (obj.msg == '') {
          this.addFriendsDialog.open()
        }
      },500)
    })
  }

  build() {
    Row() {
      Column() {
        Tabs({ barPosition: BarPosition.End }) {
          TabContent() {
            Friends_list()
          }
          .tabBar('好友')

          TabContent() {
            Group_list()
          }
          .tabBar('群聊')

          //          TabContent() {
          //            Meeting_list()
          //          }
          //          .tabBar('会议')

          TabContent() {
            Setting()
          }
          .tabBar('设置')
        }

      }
      .width('100%')
    }
    .height('100%')
  }
}

@CustomDialog
struct AddFriendsDialog {
  controller: CustomDialogController ={} as CustomDialogController;
  @Link bare:string
  @Link user: string
  @Link Message: string
  @State groupName:string=""
  accept: () => void = () => {}
  refuse: () => void = () => {}

  build() {
    Column() {
      Text($r('app.string.add_friends_str', this.user))
        .height(px2vp(40))
        .fontSize(px2fp(35))
        .textAlign(TextAlign.Center)
        .margin({ top: px2vp(20) })
      Row() {
        Text("昵称:").fontSize(px2fp(30)).width('20%')
        TextInput({ text: this.user }).fontSize(px2fp(30)).width('70%')
      }.margin({ top: px2vp(20) }).padding({ left: px2vp(10), right:  px2vp(10) })

      Row() {
        Text("分组:").fontSize(px2fp(30)).width('20%')
        TextInput({ text: this.groupName, placeholder: "请输入好友分组" }).fontSize(px2fp(30)).onChange(v=>{
          this.groupName=v
        }).width('70%')
      }.margin({ top:  px2vp(10) }).padding({ left:  px2vp(10), right:  px2vp(10) })

      Row() {
        Text("(A)接受")
          .fontColor(Color.Green)
          .fontSize(px2fp(40))
          .onClick(v => {
            if (this.bare && this.groupName) {
              Smack.receiveFriends(this.bare, this.groupName, "receive request");
              this.controller.close()
            } else {
              prompt.showToast({
                message: '请输入信息'
              })
            }
          })
          .textAlign(TextAlign.Center)
          .layoutWeight(1)
        Text("拒绝")
          .fontColor(Color.Red)
          .fontSize(px2fp(40))
          .onClick(v => {
            Smack.rejectFriends(this.bare, "reject request");
            this.controller.close()
          })
          .textAlign(TextAlign.Center)
          .layoutWeight(1)
      }.margin({ top: px2vp(30), bottom: px2vp(10)})
    }
    .padding(px2vp(10))
    // .height(px2vp(460))
    .backgroundColor('#ffffff')
    .borderRadius(10)
    .width('80%')
  }
}