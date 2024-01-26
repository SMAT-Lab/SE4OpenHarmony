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
import { Constant } from '../../../entity/Constant'
import { MUCRoomAffiliation, MUCRoomRole, Smack } from '@ohos/smack'
import { GlobalContext } from '../../../entity/GlobalContext';
import prompt from '@ohos.prompt';

let jid: string = ''
let service: string = ''
let domain: string = ''
let users: string = ''
let roomName: string = ''
let vInfo: string = ''
let vPassword: string = ''

@Entry
@Component
struct One_chat_main {
  @State chatContentList: Array<ChatContentEntity> = []
  private userName: string = ''
  @State inputMessage: string = ''
  @State message: string = '请把我加入会议中'
  beInviteDialog: CustomDialogController = new CustomDialogController({
    builder: BeInvitedDialog({ user: users,
      Message: this.message, accept: () => {
        Smack.createOrJoinRoom(roomName, Constant.HOST_DOMAIN, Constant.SERVICE_NAME, vPassword);
        setTimeout(() => {
          let isJoined = Smack.isJoined();
          if (isJoined == '1') {
            router.replace({
              url: 'pages/chat/group_chat/group_chat_main',
              params: { roomData: roomName }
            })
          } else {
            prompt.showToast({
              message: '进入房间失败'
            })
          }
        }, 1000)

      }, refuse: () => {
        Smack.declineInvitation(vInfo, users, "room inviation refuesd");
      } }),
    customStyle: true,
    autoCancel: false,
    alignment: DialogAlignment.Center,
  })

  aboutToAppear() {
    console.log('解析参数');
    this.userName =(router.getParams() as Record<string, Object>)['userName'] as string
    let that = this
    Smack.registerInvitationListener((v0:string) => {
      let info :ESObject= JSON.parse(v0)
      let reason: string = info.reason;
      if (reason && reason == "invite") { // 接受邀请
        roomName = info.room.substring(0, info.room.indexOf("@"))
        service = info.room.substring(info.room.indexOf("@") + 1, info.room.indexOf("."))
        domain = info.room.substring(info.room.indexOf(".") + 1, info.room.length)
        jid = GlobalContext.getContext().getValue('userName') as string;
        users = info.from
        vInfo = info.room
        vPassword = info.password
        setTimeout(() => {
          that.beInviteDialog.open()
        }, 500)
      } else if (reason == "room inviation refuesd") { // 拒绝邀请
        prompt.showToast({
          message: '对方拒绝邀请'
        })
      }
    })

    Smack.registerMessageCallback2((id, msg, type) => {
      let id_name = id.toString().split("@")[0]
      let id_msg = msg.toString().trim();
      if (id_name == this.userName && id_msg !== "" && type == "1") {
        setTimeout(() => {
          this.chatContentList.push(new ChatContentEntity(id_name, id_msg))
        }, 100)
      }
    })
  }
  aboutToDisappear() {
    Smack.unregisterInvitationListener();
    Smack.unregisterMessageCallback();
  }


  build() {
    Flex({ direction: FlexDirection.Column }) {
      Toolbar({
        title: this.userName,
        isBack: true,
        rightIcon: $r('app.media.more'),
        rightClickCallBack: () => {
          router.push({
            url: "pages/chat/one_chat/one_chat_setting",
            params: {
              userName: this.userName
            }
          })
        }
      })

      Stack({ alignContent: Alignment.Bottom }) {
        List() {
          ForEach(this.chatContentList, (item:ChatContentEntity)=> {
            ListItem() {
              Flex({ direction: FlexDirection.Column }) {
                if (item.isTip) {
                  Column() {
                    Text(item.message)
                      .fontSize(px2fp(20))
                      .textAlign(TextAlign.Center)
                      .backgroundColor('#ffe2e2e2')
                      .padding({ left: 10, right: 10, top: 5, bottom: 5 })
                      .borderRadius(10)
                  }.width('100%')
                } else {
                  Flex({ justifyContent: item.author == '我' ? FlexAlign.End : FlexAlign.Start }) {
                    Flex({ direction: FlexDirection.Column }) {
                      Text(item.author == '我' ? '我' : item.author)
                        .fontSize(px2fp(25))
                        .padding(5)
                        .alignSelf(item.author == '我' ? ItemAlign.End : ItemAlign.Start)
                      if (item.messageType == 1) {
                        Text(item.message)
                          .backgroundColor(item.author != '我' ? '#ffffff' : '#95ec69')
                          .padding({ left: 15, top: 10, right: 15, bottom: 10 })
                          .alignSelf(ItemAlign.End)
                          .fontSize(px2fp(30))
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
          }, (item :ChatContentEntity)=> JSON.stringify(item))
        }
        .padding({ bottom: 130 })
        .height('100%')


        Flex({ direction: FlexDirection.Row, justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center }) {
          TextInput({ placeholder: '请输入', text: this.inputMessage })
            .height(px2vp(90))
            .padding({left: 10})
            .fontSize(px2fp(25))
            .onChange(v => {
              this.inputMessage = v
            })
            .placeholderFont({size: px2fp(25)})

          Button('发 送')
            .width(150)
            .margin({ left: 8 })
            .height(px2vp(80))
            .fontSize(px2fp(25))
            .onClick(e => {
              this.onSendSingleMessage()
            })
        }
        .height(px2vp(120))
        .width('100%')
        .padding({ left: 15, right: 15 })
        .backgroundColor('#ffffff')
      }

    }
    .height('100%')
    .backgroundColor('#ececec')
  }

  // todo 发送单聊信息
  onSendSingleMessage() {
    if (this.inputMessage !== '') {
      Smack.send(this.userName + "@" + Constant.HOST_DOMAIN, this.inputMessage)
      this.chatContentList.push(new ChatContentEntity('我', this.inputMessage))
      this.inputMessage = ''
    }
  }
}

@CustomDialog
struct BeInvitedDialog {
  controller: CustomDialogController = {} as CustomDialogController
  user: string = ''
  Message: string = ''
  accept: () => void = () => {}
  refuse: () => void = () => {}

  build() {
    Flex({ direction: FlexDirection.Column }) {

      Text($r('app.string.invite_str', this.user))
        .fontSize(20)
        .padding(5)
        .width('100%')
        .textAlign(TextAlign.Center)
      Text('Message:' + this.Message)
        .height(40)
        .fontSize(16)
        .padding(5)
        .width('100%')
        .textAlign(TextAlign.Center)
      Row() {
        Text("(A)接受")
          .fontColor(Color.Green)
          .fontSize(16)
          .onClick(v => {
            this.accept()
            this.controller.close()
          })
          .textAlign(TextAlign.Center)
          .layoutWeight(1)
        Text("拒绝")
          .fontColor(Color.Red)
          .fontSize(16)
          .onClick(v => {
            this.refuse()
            this.controller.close()
          })
          .textAlign(TextAlign.Center)
          .layoutWeight(1)
      }.width('100%').margin({ top: 30 })
    }
    .padding(20)
    .height(180)
    .backgroundColor('#ffffff')
    .borderRadius(10)
    .width('80%')
  }
}