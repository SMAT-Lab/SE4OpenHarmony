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

import { PresenceType, Smack } from '@ohos/smack'
import { MUCRoomAffiliation } from '@ohos/smack'
import { MUCRoomRole } from '@ohos/smack'
import { PresenceRoomType } from '@ohos/smack'
import { MUCOperation } from '@ohos/smack'
import {Constant} from '../entity/Constant'
import { RoomConfig } from '@ohos/smack'

@Entry
@Component
struct page {

  service:string="@"+Constant.HOST_DOMAIN+Constant.HOST_RES
  aboutToAppear() {
    Smack.registerGroupMessageCallback((id:ESObject, msg:ESObject) => {
      console.info('群聊消息接收到了  id = ' + id + '   msg = ' + msg)
    })
    Smack.registerInvitationListener((v0:string) => {
      console.info('群聊邀請接收到了  v0 = ' + v0 )
    })
    Smack.registerMUCParticipantPresenceListener((nike: string, presenceType: string) => {
      console.info('我在群中的状态变化（踢出、禁止、授予权限等）  nike = ' + nike + '   presenceType = ' + presenceType )
    })
    Smack.handleSubscriptionRequestListener((resultStr:ESObject) => {
      console.info('handleSubscriptionRequestListener  resultStr = ' + resultStr)
    })
  }

  build() {
    Row() {
      Scroll() {
        Column() {
          Item({
            text: '登录',
            click: () => {
              Smack.Login('test@'+Constant.HOST_IP+Constant.HOST_RES, '123');

            }
          })

          Item({
            text: '发送单人消息',
            click: () => {
              Smack.send('test3'+this.service, 'hello from test2 abc');
            }
          })

          Item({
            text: '注册',
            click: () => {
              Smack.registers(Constant.HOST_IP,"test2", "123456");
            }
          })

          Item({
            text: '注销',
            click: () => {
              Smack.unregister();
            }
          })

          Item({
            text: '修改密码',
            click: () => {
              Smack.changPwd("test");
            }
          })

          Item({
            text: '创建分组',
            click: () => {
              Smack.createGroup("foo");
            }
          })

          Item({
            text: '获取好友列表',
            click: () => {
              console.log("Test NAPI getFriends result:" + Smack.getFriendList());
            }
          })

          Item({
            text: '添加好友',
            click: () => {
              Smack.addFriends("test@"+Constant.HOST_DOMAIN, "test", "group");
            }
          })

          Item({
            text: '删除好友',
            click: () => {
              Smack.delfriend("test3"+this.service);
            }
          })

          Item({
            text: '修改登录状态',
            click: () => {
              Smack.changePresence(PresenceType.Away, '在线');
            }
          })

          Item({
            text: '修改好友分组',
            click: () => {
              Smack.changeFriendGroup("test3@"+Constant.HOST_DOMAIN, "friend");
            }
          })

          Item({
            text: '修改好友分组名称',
            click: () => {
              Smack.changeGroup("ts", "friend");
            }
          })

          Item({
            text: '创建群组',
            click: () => {
              Smack.createRoom("444@"+Constant.HOST_IP+Constant.HOST_RES, "room1", Constant.HOST_DOMAIN, Constant.SERVICE_NAME);
            }
          })

          Item({
            text: '加入群组',
            click: () => {
              Smack.join();
            }
          })

          Item({
            text: '离开群组',
            click: () => {
              Smack.leave("leave msg");
            }
          })

          Item({
            text: '发送群组消息',
            click: () => {
              Smack.sendGroupMessage("group msg test");
            }
          })

          Item({
            text: '设置群组主题',
            click: () => {
              Smack.setSubject("subject");
            }
          })

          Item({
            text: '销毁群组',
            click: () => {
              Smack.destroy("999@"+Constant.HOST_IP+Constant.HOST_RES, "123");
            }
          })

          Item({
            text: '踢出群组',
            click: () => {
              Smack.kick("555", "kick");
            }
          })

          Item({
            text: '踢出群组并拉进黑名单',
            click: () => {
              Smack.ban("555", "ban");
            }
          })

          Item({
            text: '授予发言权限',
            click: () => {
              Smack.grantVoice("555", "grantVoice");
            }
          })

          Item({
            text: '移除发言权限',
            click: () => {
              Smack.revokeVoice("555", "revokeVoice");
            }
          })

          Item({
            text: '岗位设置 ',
            click: () => {
              Smack.setAffiliation("555", MUCRoomAffiliation.AffiliationOwner, "AffiliationOwner");
            }
          })

          Item({
            text: '角色设置 RoleModerator',
            click: () => {
              Smack.setRole("888", MUCRoomRole.RoleModerator, "RoleModerator");
            }
          })

          Item({
            text: '更改登录状态 Away',
            click: () => {
              Smack.setPresence(PresenceRoomType.Away, "Away");
            }
          })

          Item({
            text: '邀请成员 ',
            click: () => {
              Smack.invite("777"+this.service, "invite");
            }
          })

          Item({
            text: '解析xml',
            click: () => {
              Smack.parseXML();
            }
          })

          Item({
            text: '获取全部群聊成员',
            click: () => {
              let number:ESObject = Smack.getRoomItems();
              console.info('getRoomItems = ' + JSON.stringify(number))
            }
          })

          Item({
            text: '过滤群聊成员',
            click: () => {
              let list:ESObject = Smack.requestList(MUCOperation.RequestOwnerList);
              console.info('requestList = ' + JSON.stringify(list))
            }
          })

          Item({
            text: '拒绝加入群聊',
            click: () => {
              Smack.declineInvitation("888_room@"+Constant.SERVICE_NAME+"."+Constant.HOST_DOMAIN, "888@"+Constant.HOST_DOMAIN, "room inviation refuesd");
            }
          })

          Item({
            text: '创建并加入房间',
            click: () => {
              let info:ESObject = Smack.createOrJoinRoom("room4", Constant.HOST_DOMAIN, Constant.SERVICE_NAME, "123");
            }
          })

          Item({
            text: '房间设置密码',
            click: () => {
              let info:ESObject = Smack.setPassword("123123");
            }
          })

          Item({
            text: '获取加入房间的房间信息',
            click: () => {
              let info:ESObject = Smack.getRoomInfo();
              console.info('getRoomInfo = ' + JSON.stringify(info))
            }
          })

          Item({
            text: '获取群聊配置',
            click: () => {
              let config:ESObject = Smack.requestRoomConfig();
              console.info('config = ' + JSON.stringify(config))
            }
          })

          Item({
            text: '设置群聊配置',
            click: () => {
              console.info("test page setRoomConfig");
              let roomConfig: RoomConfig = new RoomConfig();
//              roomConfig = JSON.parse(Smack.getRoomConfig());
//              let  JidVal = roomConfig.whois == "anyone" ? "任何人" : "审核者"
//              let  switchAllowpm = roomConfig.allowpm
//              let  roomName = roomConfig.roomname
//              let  roomDesc = roomConfig.roomdesc
//              let  roomMaxusers = roomConfig.maxusers
//              let  roomPassword = roomConfig.roomsecret
//              let  roomAdmins = roomConfig.roomadmins
//              let  roomOwners = roomConfig.roomowners
//              let  roomPresencebroadcast = roomConfig.presencebroadcast

              roomConfig.allowinvites = "1";
              roomConfig.canchangenick = "1";
              roomConfig.changesubject = "1";
              roomConfig.enablelogging = "1";
              roomConfig.membersonly = "1";
              roomConfig.moderatedroom = "1";
              roomConfig.passwordprotectedroom = "1";
              roomConfig.persistentroom = "1";
              roomConfig.publicroom = "1";
              roomConfig.registration = "1";
              roomConfig.reservednick = "1";
              roomConfig.allowpm = 'anyone';
              roomConfig.whois = "anyone";// "anyone" : "moderators"
              roomConfig.roomname = "roomName";//roomName
              roomConfig.roomdesc = "room desc";
              roomConfig.maxusers = "25"
              roomConfig.roomsecret = "123"
//              roomConfig.roomadmins = ""
//              roomConfig.roomowners = "";
              roomConfig.presencebroadcast = ["participant", "moderator", "visitor"];
              console.info("test page setRoomConfig str:"+JSON.stringify(roomConfig))
              let info:ESObject = Smack.setRoomConfig(JSON.stringify(roomConfig));
            }
          })

          Item({
            text: '从该聊天室踢出用户群',
            click: () => {
              let info:ESObject = Smack.bans("888,555", "bans");
            }
          })

          Item({
            text: '更改聊天室成员的昵称',
            click: () => {
              let info:ESObject = Smack.setNick("new_nike_name");
            }
          })

          Item({
            text: '目前是否在多人聊天中',
            click: () => {
              let isJoined:ESObject = Smack.isJoined();
              console.info('isJoined = ' + isJoined)
            }
          })

          Item({
            text: '返回房间里用户的昵称',
            click: () => {
              let nick:ESObject = Smack.nick();
              console.info('nick = ' + nick)
            }
          })
          Item({
            text: '是否连接',
            click: () => {
              let isConnected:ESObject = Smack.isConnected();
              console.info('连接状态 = ' + isConnected)
            }
          })
          Item({
            text: '用户名称',
            click: () => {
              let username:ESObject = Smack.username();
              console.info('连接状态 = ' + username)
            }
          })
          Item({
            text: 'connect',
            click: () => {
              let connect:ESObject = Smack.connect();
              console.info('connect = ' + connect)
            }
          })
          Item({
            text: 'setServer',
            click: () => {
              Smack.setServer(Constant.HOST_IP);
              console.info('setServer = ')
            }
          })
          Item({
            text: 'setUsernameAndPassword',
            click: () => {
              let value:ESObject=Smack.setUsernameAndPassword("zhang", "123456");
              console.info('setUsernameAndPassword = '+value)
            }
          })
          Item({
            text: 'setPort',
            click: () => {
              let value:ESObject=Smack.setPort(Constant.HOST_PORT);
              console.info('setUsernameAndPassword = '+value)
            }
          })
          Item({
            text: 'password',
            click: () => {
              let value:ESObject=Smack.password();
              console.info('password = '+value)
            }
          })
          Item({
            text: 'setResource',
            click: () => {
              let value:ESObject=Smack.setResource(Constant.HOST_RES.replace("/",""));
              console.info('password = '+value)
            }
          })
          Item({
            text: 'receiveFriends',
            click: () => {
              let value:ESObject=Smack.receiveFriends("555@"+Constant.HOST_DOMAIN, "group", "receive request");
            }
          })

          Item({
            text: 'rejectFriends',
            click: () => {
              let value:ESObject=Smack.rejectFriends("555@"+Constant.HOST_DOMAIN, "reject request");
            }
          })
        }
        .width('100%')
      }
    }
    .height('100%')
  }
}

@Component
struct Item {
  text: string = ''
  click: () => void = () => {}

  build() {
    Column() {
      Button(this.text)
        .fontSize(px2fp(30))
        .width('90%')
        .margin(px2vp(10))
        .padding(px2vp(15))
        .onClick(v => {
          this.click()
        })
    }

  }
}
