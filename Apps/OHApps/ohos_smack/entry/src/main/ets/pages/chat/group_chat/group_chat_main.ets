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
import { MUCOperation, RoomConfig, Smack } from '@ohos/smack'
import { GlobalContext } from '../../../entity/GlobalContext';
import prompt from '@ohos.prompt';
import { Constant } from '../../../entity/Constant';

@Entry
@Component
struct Group_chat_main {
  @State chatContentList: Array<ChatContentEntity> = []
  @State inputMessage: string = ''
  @State roomName: string = ''
  @State isJoin: number = 0 //0-false,1-true
  private userName: string = '';
  private role: string = '';
  private affiliation: string = '';
  private voiceList: Array<string> = [];//群可发言列表
  private ownerList: Array<string> = [];
  private leaveFlag: boolean = false; //离开标志
  @State message: string = '请把我加入会议中'


  //获取房间配置信息
  private setPublicRoom() {
    let roomInfo = Smack.getRoomConfig();
    let roomConfig= JSON.parse(roomInfo) as RoomConfig;

    roomConfig.publicroom = '1';
    roomConfig.persistentroom = '0';
    roomConfig.moderatedroom = '0';
    roomConfig.membersonly = '0';
    roomConfig.allowinvites = '1';

    Smack.setRoomConfig(JSON.stringify(roomConfig))
  }

  //是否是拥有者
  isOwner(): boolean {
    if (this.ownerList && this.ownerList.length>0) {
      for (let i = 0; i < this.ownerList.length; i++) {
        let user = this.ownerList[i].split("@")[0];
        if (user == this.userName) {
          return true;
        }
      }
    }
    return false;
  }

  //获取房屋拥有者列表
  onGetAllOwnerList() {
    this.ownerList = []
    let roomitems = Smack.requestList(MUCOperation.RequestOwnerList)
    if (roomitems) {
      let items:Array<ESObject>=JSON.parse(roomitems)
      for (let index = 0; index < items.length; index++) {
        let str :string= items[index].jid.replace(" ", "")
        this.ownerList.push(str);
      }
    }
  }

  // 获取可发言列表，用于排查游客
  getVoiceList() {
    this.voiceList = []
    let roomitems = Smack.requestList(MUCOperation.RequestVoiceList)
    if (roomitems) {
      let items:Array<ESObject>=JSON.parse(roomitems)
      for (let index = 0; index < items.length; index++) {
        let str :string= items[index].jid.replace(" ", "")
        this.voiceList.push(str);
      }
    }
  }

  // 是否可进行发言
  isVoice(): boolean {
    if (this.voiceList && this.voiceList.length > 0) {
      for (let i = 0; i < this.voiceList.length; i++) {
        let user = this.voiceList[i].split("@")[0];
        if (user == this.userName) {
          return true;
        }
      }
    }

    return false;
  }

  aboutToAppear() {
    this.userName = GlobalContext.getContext().getValue('userName').toString().split('@')[0];
    this.leaveFlag = false;

    let that = this
    Smack.registerInvitationListener((v0:string) => {
      let info :ESObject= JSON.parse(v0)

      let reason: string = info.reason;
      if (reason && reason == "invite") { // 接受邀请

      } else if (reason == "room inviation refuesd") { // 拒绝邀请
        prompt.showToast({
          message: '对方拒绝邀请'
        })
      }
    })

    Smack.registerMessageCallback2((id, msg, type) => {
      let id_name = id.toString().split("/")[1]
      let id_msg = msg.toString().trim();
      if (id_msg !== "" && type == '4') {
        setTimeout(() => {
          if (id_name == this.userName) {
            id_name = '1';
          }
          this.chatContentList.push(new ChatContentEntity(id_name, id_msg))
        }, 100)
      }
    })
    Smack.registerNonrosterPresenceCallback((from: string, to: string, presence: string)=>{
      let room = from.split("@")[0];
      let user = from.split("/")[1];

      if (room == this.roomName && user == this.userName && presence == '5' && !this.leaveFlag) {
        Smack.leave("leave");
        prompt.showToast({
          message: '房间被销毁'
        })
        router.clear();
        router.push({
          url: 'pages/main'
        })
      }
    });

    Smack.registerMUCParticipantPresenceListener((name:string,jsonStr: string) => {
      let obj:ESObject=JSON.parse(jsonStr)
      setTimeout(() => {
        switch (obj.flags) {
          case '1':
            this.chatContentList.push(new ChatContentEntity(name, name + "操作成功", 1, true))
            break;
          case '2':
            this.chatContentList.push(new ChatContentEntity(name, name + "修改了昵称", 1, true))
            break;
          case '3':
            this.chatContentList.push(new ChatContentEntity(name, name + "被踢出了群聊", 1, true))
            break;
          case '4':
            this.chatContentList.push(new ChatContentEntity(name, name + "被群聊屏蔽了", 1, true))
            break;

        }
      }, 100)

      //      switch (presenceType) {
      //        case "0":
      //          this.chatContentList.push(new ChatContentEntity(name, name + "进入了房间", 1, true))
      //          break
      //        case "1":
      //          this.chatContentList.push(new ChatContentEntity(name, name + "状态空闲", 1, true))
      //          break
      //        case "2":
      //          this.chatContentList.push(new ChatContentEntity(name, name + "离开了", 1, true))
      //          break
      //        case "3":
      //          this.chatContentList.push(new ChatContentEntity(name, name + "状态变更为请勿打扰", 1, true))
      //          break
      //        case "4":
      //          this.chatContentList.push(new ChatContentEntity(name, name + "长时间离线了", 1, true))
      //          break
      //        case "5":
      //          this.chatContentList.push(new ChatContentEntity(name, name + "离开了房间", 1, true))
      //          break
      //        case "9":
      //          this.chatContentList.push(new ChatContentEntity(name, name + "的状态发生变化", 1, true))
      //          break
      //      }
    })

    let result = Smack.parseXML();
    GlobalContext.getContext().setValue('roomInfo', result)
    let roominfo: ESObject = JSON.parse(result)
    this.roomName = roominfo.description
    try {
      this.onGetAllOwnerList();
      if (this.isOwner()) {
        this.setPublicRoom();
      }
    } catch (e) {
    }
  }

  unregisterCallback() {
    Smack.unregisterMessageCallback();
    Smack.unregisterMUCParticipantPresenceListener();
    Smack.unregisterNonrosterPresenceCallback();
    Smack.unregisterInvitationListener();
  }

  aboutToDisappear() {
    this.leaveFlag = true;
    try {
      this.unregisterCallback();
      Smack.leave("leave msg");
    } catch (e) {
      console.error('test group aboutToDisappear err:'+e.message);
    }
  }

  requestVoice() {
    this.role = Smack.getRole();
    this.affiliation = Smack.getAffiliation();
    Smack.requestVoice();
  }

  build() {
    Flex({ direction: FlexDirection.Column }) {
      Toolbar({
        title: this.roomName,
        isBack: true,
        rightIcon: $r('app.media.more'),
        rightClickCallBack: () => {
          router.push({
            url: "pages/chat/group_chat/group_chat_setting"
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
        .padding({ bottom: 130 })
        .height('100%')

        Flex({ direction: FlexDirection.Row, justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center }) {
          TextInput({ placeholder: '请输入', text: this.inputMessage }).onChange(v => {
            this.inputMessage = v
          })
          Button('发 送').width(100).margin({ left: 8 })
            .onClick(e => {
              this.onSendGroupMessage()
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

  // todo 发送群聊信息
  onSendGroupMessage() {
    Smack.sendGroupMessage(this.inputMessage);
    this.inputMessage = ''
  }
}