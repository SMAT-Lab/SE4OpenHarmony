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

export class RoomConfig {
    roomname: string //房间名称
    roomdesc: string //房间描述
    changesubject:  string  //允许成员更改主题
    maxusers: string //最大房间成员人数
/*    maxusers_options: Array<{
        label: string,
        value: string
    }> =
        [{
             "label": "10",
             "value": "10"
         },
         {
             "label": "20",
             "value": "20"
         },
         {
             "label": "30",
             "value": "30"
         },
         {
             "label": "40",
             "value": "40"
         },
         {
             "label": "50",
             "value": "50"
         },
         {
             "label": "无",
             "value": "0"
         }
        ] //最大房间成员人数选项*/
    presencebroadcast: Array<string> = [] //广播其存在的角色
   /* presencebroadcast_option: Array<{
        label: string,
        value: string
    }> = [
        {
            "label": "参与者",
            "value": "participant"
        },
        {
            "label": "审核者",
            "value": "moderator"
        },
        {
            "label": "访客",
            "value": "visitor"
        }
    ]*/
    publicroom:  string  //在目录中列出房间
    persistentroom:  string  //永久房间
    moderatedroom:  string  //房间需要审核
    membersonly:  string  //房间仅对成员开放
    allowinvites:  string  //允许成员邀请其他人
    passwordprotectedroom:  string  //需要密码才能进入房间
    roomsecret: string  //密码
    whois: string //能够发现成员真实 JID 的角色
  /*  whois_option: Array<{ label: string,value: string }> = [
    {
        "label": "任何人",
        "value": "anyone"
    },
    {
        "label": "审核者",
        "value": "moderators"
    }
]*/
    allowpm: string //Allowed to Send Private Messages
//    allowpm_option: Array<{ label: string,value: string }> = [
//        {
//            "label": "任何人",
//            "value": "anyone"
//        },
//        {
//            "label": "参与者",
//            "value": "participants"
//        },
//        {
//            "label": "审核者",
//            "value": "moderators"
//        },
//        {
//            "label": "无",
//            "value": "none"
//        }
//    ]
    enablelogging: string  //记录房间聊天
    reservednick:  string //仅允许注册昵称登录
    canchangenick:  string  //允许成员修改昵称
    registration:  string //允许用户注册房间
    roomadmins: string  //房间管理员
    roomowners: string  //房间拥有者
}