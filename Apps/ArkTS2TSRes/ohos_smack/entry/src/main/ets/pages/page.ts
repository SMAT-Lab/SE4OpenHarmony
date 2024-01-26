interface Item_Params {
    text?: string;
    click?: () => void;
}
interface page_Params {
    service?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "page_" + ++__generate__Id;
}
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
import { PresenceType, Smack } from '@ohos/smack';
import { MUCRoomAffiliation } from '@ohos/smack';
import { MUCRoomRole } from '@ohos/smack';
import { PresenceRoomType } from '@ohos/smack';
import { MUCOperation } from '@ohos/smack';
import { Constant } from '../entity/Constant';
import { RoomConfig } from '@ohos/smack';
class page extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.service = "@" + Constant.HOST_DOMAIN + Constant.HOST_RES;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: page_Params) {
        if (params.service !== undefined) {
            this.service = params.service;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private service: string;
    aboutToAppear() {
        Smack.registerGroupMessageCallback((id: any, msg: any) => {
            console.info('群聊消息接收到了  id = ' + id + '   msg = ' + msg);
        });
        Smack.registerInvitationListener((v0: string) => {
            console.info('群聊邀請接收到了  v0 = ' + v0);
        });
        Smack.registerMUCParticipantPresenceListener((nike: string, presenceType: string) => {
            console.info('我在群中的状态变化（踢出、禁止、授予权限等）  nike = ' + nike + '   presenceType = ' + presenceType);
        });
        Smack.handleSubscriptionRequestListener((resultStr: any) => {
            console.info('handleSubscriptionRequestListener  resultStr = ' + resultStr);
        });
    }
    render() {
        Row.create();
        Row.height('100%');
        Scroll.create();
        Column.create();
        Column.width('100%');
        let earlierCreatedChild_2: Item = (this && this.findChildById) ? this.findChildById("2") as Item : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Item("2", this, {
                text: '登录',
                click: () => {
                    Smack.Login('test@' + Constant.HOST_IP + Constant.HOST_RES, '123');
                }
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                text: '登录',
                click: () => {
                    Smack.Login('test@' + Constant.HOST_IP + Constant.HOST_RES, '123');
                }
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: Item = (this && this.findChildById) ? this.findChildById("3") as Item : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new Item("3", this, {
                text: '发送单人消息',
                click: () => {
                    Smack.send('test3' + this.service, 'hello from test2 abc');
                }
            }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                text: '发送单人消息',
                click: () => {
                    Smack.send('test3' + this.service, 'hello from test2 abc');
                }
            });
            if (!earlierCreatedChild_3.needsUpdate()) {
                earlierCreatedChild_3.markStatic();
            }
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: Item = (this && this.findChildById) ? this.findChildById("4") as Item : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new Item("4", this, {
                text: '注册',
                click: () => {
                    Smack.registers(Constant.HOST_IP, "test2", "123456");
                }
            }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                text: '注册',
                click: () => {
                    Smack.registers(Constant.HOST_IP, "test2", "123456");
                }
            });
            if (!earlierCreatedChild_4.needsUpdate()) {
                earlierCreatedChild_4.markStatic();
            }
            View.create(earlierCreatedChild_4);
        }
        let earlierCreatedChild_5: Item = (this && this.findChildById) ? this.findChildById("5") as Item : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new Item("5", this, {
                text: '注销',
                click: () => {
                    Smack.unregister();
                }
            }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                text: '注销',
                click: () => {
                    Smack.unregister();
                }
            });
            if (!earlierCreatedChild_5.needsUpdate()) {
                earlierCreatedChild_5.markStatic();
            }
            View.create(earlierCreatedChild_5);
        }
        let earlierCreatedChild_6: Item = (this && this.findChildById) ? this.findChildById("6") as Item : undefined;
        if (earlierCreatedChild_6 == undefined) {
            View.create(new Item("6", this, {
                text: '修改密码',
                click: () => {
                    Smack.changPwd("test");
                }
            }));
        }
        else {
            earlierCreatedChild_6.updateWithValueParams({
                text: '修改密码',
                click: () => {
                    Smack.changPwd("test");
                }
            });
            if (!earlierCreatedChild_6.needsUpdate()) {
                earlierCreatedChild_6.markStatic();
            }
            View.create(earlierCreatedChild_6);
        }
        let earlierCreatedChild_7: Item = (this && this.findChildById) ? this.findChildById("7") as Item : undefined;
        if (earlierCreatedChild_7 == undefined) {
            View.create(new Item("7", this, {
                text: '创建分组',
                click: () => {
                    Smack.createGroup("foo");
                }
            }));
        }
        else {
            earlierCreatedChild_7.updateWithValueParams({
                text: '创建分组',
                click: () => {
                    Smack.createGroup("foo");
                }
            });
            if (!earlierCreatedChild_7.needsUpdate()) {
                earlierCreatedChild_7.markStatic();
            }
            View.create(earlierCreatedChild_7);
        }
        let earlierCreatedChild_8: Item = (this && this.findChildById) ? this.findChildById("8") as Item : undefined;
        if (earlierCreatedChild_8 == undefined) {
            View.create(new Item("8", this, {
                text: '获取好友列表',
                click: () => {
                    console.log("Test NAPI getFriends result:" + Smack.getFriendList());
                }
            }));
        }
        else {
            earlierCreatedChild_8.updateWithValueParams({
                text: '获取好友列表',
                click: () => {
                    console.log("Test NAPI getFriends result:" + Smack.getFriendList());
                }
            });
            if (!earlierCreatedChild_8.needsUpdate()) {
                earlierCreatedChild_8.markStatic();
            }
            View.create(earlierCreatedChild_8);
        }
        let earlierCreatedChild_9: Item = (this && this.findChildById) ? this.findChildById("9") as Item : undefined;
        if (earlierCreatedChild_9 == undefined) {
            View.create(new Item("9", this, {
                text: '添加好友',
                click: () => {
                    Smack.addFriends("test@" + Constant.HOST_DOMAIN, "test", "group");
                }
            }));
        }
        else {
            earlierCreatedChild_9.updateWithValueParams({
                text: '添加好友',
                click: () => {
                    Smack.addFriends("test@" + Constant.HOST_DOMAIN, "test", "group");
                }
            });
            if (!earlierCreatedChild_9.needsUpdate()) {
                earlierCreatedChild_9.markStatic();
            }
            View.create(earlierCreatedChild_9);
        }
        let earlierCreatedChild_10: Item = (this && this.findChildById) ? this.findChildById("10") as Item : undefined;
        if (earlierCreatedChild_10 == undefined) {
            View.create(new Item("10", this, {
                text: '删除好友',
                click: () => {
                    Smack.delfriend("test3" + this.service);
                }
            }));
        }
        else {
            earlierCreatedChild_10.updateWithValueParams({
                text: '删除好友',
                click: () => {
                    Smack.delfriend("test3" + this.service);
                }
            });
            if (!earlierCreatedChild_10.needsUpdate()) {
                earlierCreatedChild_10.markStatic();
            }
            View.create(earlierCreatedChild_10);
        }
        let earlierCreatedChild_11: Item = (this && this.findChildById) ? this.findChildById("11") as Item : undefined;
        if (earlierCreatedChild_11 == undefined) {
            View.create(new Item("11", this, {
                text: '修改登录状态',
                click: () => {
                    Smack.changePresence(PresenceType.Away, '在线');
                }
            }));
        }
        else {
            earlierCreatedChild_11.updateWithValueParams({
                text: '修改登录状态',
                click: () => {
                    Smack.changePresence(PresenceType.Away, '在线');
                }
            });
            if (!earlierCreatedChild_11.needsUpdate()) {
                earlierCreatedChild_11.markStatic();
            }
            View.create(earlierCreatedChild_11);
        }
        let earlierCreatedChild_12: Item = (this && this.findChildById) ? this.findChildById("12") as Item : undefined;
        if (earlierCreatedChild_12 == undefined) {
            View.create(new Item("12", this, {
                text: '修改好友分组',
                click: () => {
                    Smack.changeFriendGroup("test3@" + Constant.HOST_DOMAIN, "friend");
                }
            }));
        }
        else {
            earlierCreatedChild_12.updateWithValueParams({
                text: '修改好友分组',
                click: () => {
                    Smack.changeFriendGroup("test3@" + Constant.HOST_DOMAIN, "friend");
                }
            });
            if (!earlierCreatedChild_12.needsUpdate()) {
                earlierCreatedChild_12.markStatic();
            }
            View.create(earlierCreatedChild_12);
        }
        let earlierCreatedChild_13: Item = (this && this.findChildById) ? this.findChildById("13") as Item : undefined;
        if (earlierCreatedChild_13 == undefined) {
            View.create(new Item("13", this, {
                text: '修改好友分组名称',
                click: () => {
                    Smack.changeGroup("ts", "friend");
                }
            }));
        }
        else {
            earlierCreatedChild_13.updateWithValueParams({
                text: '修改好友分组名称',
                click: () => {
                    Smack.changeGroup("ts", "friend");
                }
            });
            if (!earlierCreatedChild_13.needsUpdate()) {
                earlierCreatedChild_13.markStatic();
            }
            View.create(earlierCreatedChild_13);
        }
        let earlierCreatedChild_14: Item = (this && this.findChildById) ? this.findChildById("14") as Item : undefined;
        if (earlierCreatedChild_14 == undefined) {
            View.create(new Item("14", this, {
                text: '创建群组',
                click: () => {
                    Smack.createRoom("444@" + Constant.HOST_IP + Constant.HOST_RES, "room1", Constant.HOST_DOMAIN, Constant.SERVICE_NAME);
                }
            }));
        }
        else {
            earlierCreatedChild_14.updateWithValueParams({
                text: '创建群组',
                click: () => {
                    Smack.createRoom("444@" + Constant.HOST_IP + Constant.HOST_RES, "room1", Constant.HOST_DOMAIN, Constant.SERVICE_NAME);
                }
            });
            if (!earlierCreatedChild_14.needsUpdate()) {
                earlierCreatedChild_14.markStatic();
            }
            View.create(earlierCreatedChild_14);
        }
        let earlierCreatedChild_15: Item = (this && this.findChildById) ? this.findChildById("15") as Item : undefined;
        if (earlierCreatedChild_15 == undefined) {
            View.create(new Item("15", this, {
                text: '加入群组',
                click: () => {
                    Smack.join();
                }
            }));
        }
        else {
            earlierCreatedChild_15.updateWithValueParams({
                text: '加入群组',
                click: () => {
                    Smack.join();
                }
            });
            if (!earlierCreatedChild_15.needsUpdate()) {
                earlierCreatedChild_15.markStatic();
            }
            View.create(earlierCreatedChild_15);
        }
        let earlierCreatedChild_16: Item = (this && this.findChildById) ? this.findChildById("16") as Item : undefined;
        if (earlierCreatedChild_16 == undefined) {
            View.create(new Item("16", this, {
                text: '离开群组',
                click: () => {
                    Smack.leave("leave msg");
                }
            }));
        }
        else {
            earlierCreatedChild_16.updateWithValueParams({
                text: '离开群组',
                click: () => {
                    Smack.leave("leave msg");
                }
            });
            if (!earlierCreatedChild_16.needsUpdate()) {
                earlierCreatedChild_16.markStatic();
            }
            View.create(earlierCreatedChild_16);
        }
        let earlierCreatedChild_17: Item = (this && this.findChildById) ? this.findChildById("17") as Item : undefined;
        if (earlierCreatedChild_17 == undefined) {
            View.create(new Item("17", this, {
                text: '发送群组消息',
                click: () => {
                    Smack.sendGroupMessage("group msg test");
                }
            }));
        }
        else {
            earlierCreatedChild_17.updateWithValueParams({
                text: '发送群组消息',
                click: () => {
                    Smack.sendGroupMessage("group msg test");
                }
            });
            if (!earlierCreatedChild_17.needsUpdate()) {
                earlierCreatedChild_17.markStatic();
            }
            View.create(earlierCreatedChild_17);
        }
        let earlierCreatedChild_18: Item = (this && this.findChildById) ? this.findChildById("18") as Item : undefined;
        if (earlierCreatedChild_18 == undefined) {
            View.create(new Item("18", this, {
                text: '设置群组主题',
                click: () => {
                    Smack.setSubject("subject");
                }
            }));
        }
        else {
            earlierCreatedChild_18.updateWithValueParams({
                text: '设置群组主题',
                click: () => {
                    Smack.setSubject("subject");
                }
            });
            if (!earlierCreatedChild_18.needsUpdate()) {
                earlierCreatedChild_18.markStatic();
            }
            View.create(earlierCreatedChild_18);
        }
        let earlierCreatedChild_19: Item = (this && this.findChildById) ? this.findChildById("19") as Item : undefined;
        if (earlierCreatedChild_19 == undefined) {
            View.create(new Item("19", this, {
                text: '销毁群组',
                click: () => {
                    Smack.destroy("999@" + Constant.HOST_IP + Constant.HOST_RES, "123");
                }
            }));
        }
        else {
            earlierCreatedChild_19.updateWithValueParams({
                text: '销毁群组',
                click: () => {
                    Smack.destroy("999@" + Constant.HOST_IP + Constant.HOST_RES, "123");
                }
            });
            if (!earlierCreatedChild_19.needsUpdate()) {
                earlierCreatedChild_19.markStatic();
            }
            View.create(earlierCreatedChild_19);
        }
        let earlierCreatedChild_20: Item = (this && this.findChildById) ? this.findChildById("20") as Item : undefined;
        if (earlierCreatedChild_20 == undefined) {
            View.create(new Item("20", this, {
                text: '踢出群组',
                click: () => {
                    Smack.kick("555", "kick");
                }
            }));
        }
        else {
            earlierCreatedChild_20.updateWithValueParams({
                text: '踢出群组',
                click: () => {
                    Smack.kick("555", "kick");
                }
            });
            if (!earlierCreatedChild_20.needsUpdate()) {
                earlierCreatedChild_20.markStatic();
            }
            View.create(earlierCreatedChild_20);
        }
        let earlierCreatedChild_21: Item = (this && this.findChildById) ? this.findChildById("21") as Item : undefined;
        if (earlierCreatedChild_21 == undefined) {
            View.create(new Item("21", this, {
                text: '踢出群组并拉进黑名单',
                click: () => {
                    Smack.ban("555", "ban");
                }
            }));
        }
        else {
            earlierCreatedChild_21.updateWithValueParams({
                text: '踢出群组并拉进黑名单',
                click: () => {
                    Smack.ban("555", "ban");
                }
            });
            if (!earlierCreatedChild_21.needsUpdate()) {
                earlierCreatedChild_21.markStatic();
            }
            View.create(earlierCreatedChild_21);
        }
        let earlierCreatedChild_22: Item = (this && this.findChildById) ? this.findChildById("22") as Item : undefined;
        if (earlierCreatedChild_22 == undefined) {
            View.create(new Item("22", this, {
                text: '授予发言权限',
                click: () => {
                    Smack.grantVoice("555", "grantVoice");
                }
            }));
        }
        else {
            earlierCreatedChild_22.updateWithValueParams({
                text: '授予发言权限',
                click: () => {
                    Smack.grantVoice("555", "grantVoice");
                }
            });
            if (!earlierCreatedChild_22.needsUpdate()) {
                earlierCreatedChild_22.markStatic();
            }
            View.create(earlierCreatedChild_22);
        }
        let earlierCreatedChild_23: Item = (this && this.findChildById) ? this.findChildById("23") as Item : undefined;
        if (earlierCreatedChild_23 == undefined) {
            View.create(new Item("23", this, {
                text: '移除发言权限',
                click: () => {
                    Smack.revokeVoice("555", "revokeVoice");
                }
            }));
        }
        else {
            earlierCreatedChild_23.updateWithValueParams({
                text: '移除发言权限',
                click: () => {
                    Smack.revokeVoice("555", "revokeVoice");
                }
            });
            if (!earlierCreatedChild_23.needsUpdate()) {
                earlierCreatedChild_23.markStatic();
            }
            View.create(earlierCreatedChild_23);
        }
        let earlierCreatedChild_24: Item = (this && this.findChildById) ? this.findChildById("24") as Item : undefined;
        if (earlierCreatedChild_24 == undefined) {
            View.create(new Item("24", this, {
                text: '岗位设置 ',
                click: () => {
                    Smack.setAffiliation("555", MUCRoomAffiliation.AffiliationOwner, "AffiliationOwner");
                }
            }));
        }
        else {
            earlierCreatedChild_24.updateWithValueParams({
                text: '岗位设置 ',
                click: () => {
                    Smack.setAffiliation("555", MUCRoomAffiliation.AffiliationOwner, "AffiliationOwner");
                }
            });
            if (!earlierCreatedChild_24.needsUpdate()) {
                earlierCreatedChild_24.markStatic();
            }
            View.create(earlierCreatedChild_24);
        }
        let earlierCreatedChild_25: Item = (this && this.findChildById) ? this.findChildById("25") as Item : undefined;
        if (earlierCreatedChild_25 == undefined) {
            View.create(new Item("25", this, {
                text: '角色设置 RoleModerator',
                click: () => {
                    Smack.setRole("888", MUCRoomRole.RoleModerator, "RoleModerator");
                }
            }));
        }
        else {
            earlierCreatedChild_25.updateWithValueParams({
                text: '角色设置 RoleModerator',
                click: () => {
                    Smack.setRole("888", MUCRoomRole.RoleModerator, "RoleModerator");
                }
            });
            if (!earlierCreatedChild_25.needsUpdate()) {
                earlierCreatedChild_25.markStatic();
            }
            View.create(earlierCreatedChild_25);
        }
        let earlierCreatedChild_26: Item = (this && this.findChildById) ? this.findChildById("26") as Item : undefined;
        if (earlierCreatedChild_26 == undefined) {
            View.create(new Item("26", this, {
                text: '更改登录状态 Away',
                click: () => {
                    Smack.setPresence(PresenceRoomType.Away, "Away");
                }
            }));
        }
        else {
            earlierCreatedChild_26.updateWithValueParams({
                text: '更改登录状态 Away',
                click: () => {
                    Smack.setPresence(PresenceRoomType.Away, "Away");
                }
            });
            if (!earlierCreatedChild_26.needsUpdate()) {
                earlierCreatedChild_26.markStatic();
            }
            View.create(earlierCreatedChild_26);
        }
        let earlierCreatedChild_27: Item = (this && this.findChildById) ? this.findChildById("27") as Item : undefined;
        if (earlierCreatedChild_27 == undefined) {
            View.create(new Item("27", this, {
                text: '邀请成员 ',
                click: () => {
                    Smack.invite("777" + this.service, "invite");
                }
            }));
        }
        else {
            earlierCreatedChild_27.updateWithValueParams({
                text: '邀请成员 ',
                click: () => {
                    Smack.invite("777" + this.service, "invite");
                }
            });
            if (!earlierCreatedChild_27.needsUpdate()) {
                earlierCreatedChild_27.markStatic();
            }
            View.create(earlierCreatedChild_27);
        }
        let earlierCreatedChild_28: Item = (this && this.findChildById) ? this.findChildById("28") as Item : undefined;
        if (earlierCreatedChild_28 == undefined) {
            View.create(new Item("28", this, {
                text: '解析xml',
                click: () => {
                    Smack.parseXML();
                }
            }));
        }
        else {
            earlierCreatedChild_28.updateWithValueParams({
                text: '解析xml',
                click: () => {
                    Smack.parseXML();
                }
            });
            if (!earlierCreatedChild_28.needsUpdate()) {
                earlierCreatedChild_28.markStatic();
            }
            View.create(earlierCreatedChild_28);
        }
        let earlierCreatedChild_29: Item = (this && this.findChildById) ? this.findChildById("29") as Item : undefined;
        if (earlierCreatedChild_29 == undefined) {
            View.create(new Item("29", this, {
                text: '获取全部群聊成员',
                click: () => {
                    let number: any = Smack.getRoomItems();
                    console.info('getRoomItems = ' + JSON.stringify(number));
                }
            }));
        }
        else {
            earlierCreatedChild_29.updateWithValueParams({
                text: '获取全部群聊成员',
                click: () => {
                    let number: any = Smack.getRoomItems();
                    console.info('getRoomItems = ' + JSON.stringify(number));
                }
            });
            if (!earlierCreatedChild_29.needsUpdate()) {
                earlierCreatedChild_29.markStatic();
            }
            View.create(earlierCreatedChild_29);
        }
        let earlierCreatedChild_30: Item = (this && this.findChildById) ? this.findChildById("30") as Item : undefined;
        if (earlierCreatedChild_30 == undefined) {
            View.create(new Item("30", this, {
                text: '过滤群聊成员',
                click: () => {
                    let list: any = Smack.requestList(MUCOperation.RequestOwnerList);
                    console.info('requestList = ' + JSON.stringify(list));
                }
            }));
        }
        else {
            earlierCreatedChild_30.updateWithValueParams({
                text: '过滤群聊成员',
                click: () => {
                    let list: any = Smack.requestList(MUCOperation.RequestOwnerList);
                    console.info('requestList = ' + JSON.stringify(list));
                }
            });
            if (!earlierCreatedChild_30.needsUpdate()) {
                earlierCreatedChild_30.markStatic();
            }
            View.create(earlierCreatedChild_30);
        }
        let earlierCreatedChild_31: Item = (this && this.findChildById) ? this.findChildById("31") as Item : undefined;
        if (earlierCreatedChild_31 == undefined) {
            View.create(new Item("31", this, {
                text: '拒绝加入群聊',
                click: () => {
                    Smack.declineInvitation("888_room@" + Constant.SERVICE_NAME + "." + Constant.HOST_DOMAIN, "888@" + Constant.HOST_DOMAIN, "room inviation refuesd");
                }
            }));
        }
        else {
            earlierCreatedChild_31.updateWithValueParams({
                text: '拒绝加入群聊',
                click: () => {
                    Smack.declineInvitation("888_room@" + Constant.SERVICE_NAME + "." + Constant.HOST_DOMAIN, "888@" + Constant.HOST_DOMAIN, "room inviation refuesd");
                }
            });
            if (!earlierCreatedChild_31.needsUpdate()) {
                earlierCreatedChild_31.markStatic();
            }
            View.create(earlierCreatedChild_31);
        }
        let earlierCreatedChild_32: Item = (this && this.findChildById) ? this.findChildById("32") as Item : undefined;
        if (earlierCreatedChild_32 == undefined) {
            View.create(new Item("32", this, {
                text: '创建并加入房间',
                click: () => {
                    let info: any = Smack.createOrJoinRoom("room4", Constant.HOST_DOMAIN, Constant.SERVICE_NAME, "123");
                }
            }));
        }
        else {
            earlierCreatedChild_32.updateWithValueParams({
                text: '创建并加入房间',
                click: () => {
                    let info: any = Smack.createOrJoinRoom("room4", Constant.HOST_DOMAIN, Constant.SERVICE_NAME, "123");
                }
            });
            if (!earlierCreatedChild_32.needsUpdate()) {
                earlierCreatedChild_32.markStatic();
            }
            View.create(earlierCreatedChild_32);
        }
        let earlierCreatedChild_33: Item = (this && this.findChildById) ? this.findChildById("33") as Item : undefined;
        if (earlierCreatedChild_33 == undefined) {
            View.create(new Item("33", this, {
                text: '房间设置密码',
                click: () => {
                    let info: any = Smack.setPassword("123123");
                }
            }));
        }
        else {
            earlierCreatedChild_33.updateWithValueParams({
                text: '房间设置密码',
                click: () => {
                    let info: any = Smack.setPassword("123123");
                }
            });
            if (!earlierCreatedChild_33.needsUpdate()) {
                earlierCreatedChild_33.markStatic();
            }
            View.create(earlierCreatedChild_33);
        }
        let earlierCreatedChild_34: Item = (this && this.findChildById) ? this.findChildById("34") as Item : undefined;
        if (earlierCreatedChild_34 == undefined) {
            View.create(new Item("34", this, {
                text: '获取加入房间的房间信息',
                click: () => {
                    let info: any = Smack.getRoomInfo();
                    console.info('getRoomInfo = ' + JSON.stringify(info));
                }
            }));
        }
        else {
            earlierCreatedChild_34.updateWithValueParams({
                text: '获取加入房间的房间信息',
                click: () => {
                    let info: any = Smack.getRoomInfo();
                    console.info('getRoomInfo = ' + JSON.stringify(info));
                }
            });
            if (!earlierCreatedChild_34.needsUpdate()) {
                earlierCreatedChild_34.markStatic();
            }
            View.create(earlierCreatedChild_34);
        }
        let earlierCreatedChild_35: Item = (this && this.findChildById) ? this.findChildById("35") as Item : undefined;
        if (earlierCreatedChild_35 == undefined) {
            View.create(new Item("35", this, {
                text: '获取群聊配置',
                click: () => {
                    let config: any = Smack.requestRoomConfig();
                    console.info('config = ' + JSON.stringify(config));
                }
            }));
        }
        else {
            earlierCreatedChild_35.updateWithValueParams({
                text: '获取群聊配置',
                click: () => {
                    let config: any = Smack.requestRoomConfig();
                    console.info('config = ' + JSON.stringify(config));
                }
            });
            if (!earlierCreatedChild_35.needsUpdate()) {
                earlierCreatedChild_35.markStatic();
            }
            View.create(earlierCreatedChild_35);
        }
        let earlierCreatedChild_36: Item = (this && this.findChildById) ? this.findChildById("36") as Item : undefined;
        if (earlierCreatedChild_36 == undefined) {
            View.create(new Item("36", this, {
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
                    roomConfig.whois = "anyone"; // "anyone" : "moderators"
                    roomConfig.roomname = "roomName"; //roomName
                    roomConfig.roomdesc = "room desc";
                    roomConfig.maxusers = "25";
                    roomConfig.roomsecret = "123";
                    //              roomConfig.roomadmins = ""
                    //              roomConfig.roomowners = "";
                    roomConfig.presencebroadcast = ["participant", "moderator", "visitor"];
                    console.info("test page setRoomConfig str:" + JSON.stringify(roomConfig));
                    let info: any = Smack.setRoomConfig(JSON.stringify(roomConfig));
                }
            }));
        }
        else {
            earlierCreatedChild_36.updateWithValueParams({
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
                    roomConfig.whois = "anyone"; // "anyone" : "moderators"
                    roomConfig.roomname = "roomName"; //roomName
                    roomConfig.roomdesc = "room desc";
                    roomConfig.maxusers = "25";
                    roomConfig.roomsecret = "123";
                    //              roomConfig.roomadmins = ""
                    //              roomConfig.roomowners = "";
                    roomConfig.presencebroadcast = ["participant", "moderator", "visitor"];
                    console.info("test page setRoomConfig str:" + JSON.stringify(roomConfig));
                    let info: any = Smack.setRoomConfig(JSON.stringify(roomConfig));
                }
            });
            if (!earlierCreatedChild_36.needsUpdate()) {
                earlierCreatedChild_36.markStatic();
            }
            View.create(earlierCreatedChild_36);
        }
        let earlierCreatedChild_37: Item = (this && this.findChildById) ? this.findChildById("37") as Item : undefined;
        if (earlierCreatedChild_37 == undefined) {
            View.create(new Item("37", this, {
                text: '从该聊天室踢出用户群',
                click: () => {
                    let info: any = Smack.bans("888,555", "bans");
                }
            }));
        }
        else {
            earlierCreatedChild_37.updateWithValueParams({
                text: '从该聊天室踢出用户群',
                click: () => {
                    let info: any = Smack.bans("888,555", "bans");
                }
            });
            if (!earlierCreatedChild_37.needsUpdate()) {
                earlierCreatedChild_37.markStatic();
            }
            View.create(earlierCreatedChild_37);
        }
        let earlierCreatedChild_38: Item = (this && this.findChildById) ? this.findChildById("38") as Item : undefined;
        if (earlierCreatedChild_38 == undefined) {
            View.create(new Item("38", this, {
                text: '更改聊天室成员的昵称',
                click: () => {
                    let info: any = Smack.setNick("new_nike_name");
                }
            }));
        }
        else {
            earlierCreatedChild_38.updateWithValueParams({
                text: '更改聊天室成员的昵称',
                click: () => {
                    let info: any = Smack.setNick("new_nike_name");
                }
            });
            if (!earlierCreatedChild_38.needsUpdate()) {
                earlierCreatedChild_38.markStatic();
            }
            View.create(earlierCreatedChild_38);
        }
        let earlierCreatedChild_39: Item = (this && this.findChildById) ? this.findChildById("39") as Item : undefined;
        if (earlierCreatedChild_39 == undefined) {
            View.create(new Item("39", this, {
                text: '目前是否在多人聊天中',
                click: () => {
                    let isJoined: any = Smack.isJoined();
                    console.info('isJoined = ' + isJoined);
                }
            }));
        }
        else {
            earlierCreatedChild_39.updateWithValueParams({
                text: '目前是否在多人聊天中',
                click: () => {
                    let isJoined: any = Smack.isJoined();
                    console.info('isJoined = ' + isJoined);
                }
            });
            if (!earlierCreatedChild_39.needsUpdate()) {
                earlierCreatedChild_39.markStatic();
            }
            View.create(earlierCreatedChild_39);
        }
        let earlierCreatedChild_40: Item = (this && this.findChildById) ? this.findChildById("40") as Item : undefined;
        if (earlierCreatedChild_40 == undefined) {
            View.create(new Item("40", this, {
                text: '返回房间里用户的昵称',
                click: () => {
                    let nick: any = Smack.nick();
                    console.info('nick = ' + nick);
                }
            }));
        }
        else {
            earlierCreatedChild_40.updateWithValueParams({
                text: '返回房间里用户的昵称',
                click: () => {
                    let nick: any = Smack.nick();
                    console.info('nick = ' + nick);
                }
            });
            if (!earlierCreatedChild_40.needsUpdate()) {
                earlierCreatedChild_40.markStatic();
            }
            View.create(earlierCreatedChild_40);
        }
        let earlierCreatedChild_41: Item = (this && this.findChildById) ? this.findChildById("41") as Item : undefined;
        if (earlierCreatedChild_41 == undefined) {
            View.create(new Item("41", this, {
                text: '是否连接',
                click: () => {
                    let isConnected: any = Smack.isConnected();
                    console.info('连接状态 = ' + isConnected);
                }
            }));
        }
        else {
            earlierCreatedChild_41.updateWithValueParams({
                text: '是否连接',
                click: () => {
                    let isConnected: any = Smack.isConnected();
                    console.info('连接状态 = ' + isConnected);
                }
            });
            if (!earlierCreatedChild_41.needsUpdate()) {
                earlierCreatedChild_41.markStatic();
            }
            View.create(earlierCreatedChild_41);
        }
        let earlierCreatedChild_42: Item = (this && this.findChildById) ? this.findChildById("42") as Item : undefined;
        if (earlierCreatedChild_42 == undefined) {
            View.create(new Item("42", this, {
                text: '用户名称',
                click: () => {
                    let username: any = Smack.username();
                    console.info('连接状态 = ' + username);
                }
            }));
        }
        else {
            earlierCreatedChild_42.updateWithValueParams({
                text: '用户名称',
                click: () => {
                    let username: any = Smack.username();
                    console.info('连接状态 = ' + username);
                }
            });
            if (!earlierCreatedChild_42.needsUpdate()) {
                earlierCreatedChild_42.markStatic();
            }
            View.create(earlierCreatedChild_42);
        }
        let earlierCreatedChild_43: Item = (this && this.findChildById) ? this.findChildById("43") as Item : undefined;
        if (earlierCreatedChild_43 == undefined) {
            View.create(new Item("43", this, {
                text: 'connect',
                click: () => {
                    let connect: any = Smack.connect();
                    console.info('connect = ' + connect);
                }
            }));
        }
        else {
            earlierCreatedChild_43.updateWithValueParams({
                text: 'connect',
                click: () => {
                    let connect: any = Smack.connect();
                    console.info('connect = ' + connect);
                }
            });
            if (!earlierCreatedChild_43.needsUpdate()) {
                earlierCreatedChild_43.markStatic();
            }
            View.create(earlierCreatedChild_43);
        }
        let earlierCreatedChild_44: Item = (this && this.findChildById) ? this.findChildById("44") as Item : undefined;
        if (earlierCreatedChild_44 == undefined) {
            View.create(new Item("44", this, {
                text: 'setServer',
                click: () => {
                    Smack.setServer(Constant.HOST_IP);
                    console.info('setServer = ');
                }
            }));
        }
        else {
            earlierCreatedChild_44.updateWithValueParams({
                text: 'setServer',
                click: () => {
                    Smack.setServer(Constant.HOST_IP);
                    console.info('setServer = ');
                }
            });
            if (!earlierCreatedChild_44.needsUpdate()) {
                earlierCreatedChild_44.markStatic();
            }
            View.create(earlierCreatedChild_44);
        }
        let earlierCreatedChild_45: Item = (this && this.findChildById) ? this.findChildById("45") as Item : undefined;
        if (earlierCreatedChild_45 == undefined) {
            View.create(new Item("45", this, {
                text: 'setUsernameAndPassword',
                click: () => {
                    let value: any = Smack.setUsernameAndPassword("zhang", "123456");
                    console.info('setUsernameAndPassword = ' + value);
                }
            }));
        }
        else {
            earlierCreatedChild_45.updateWithValueParams({
                text: 'setUsernameAndPassword',
                click: () => {
                    let value: any = Smack.setUsernameAndPassword("zhang", "123456");
                    console.info('setUsernameAndPassword = ' + value);
                }
            });
            if (!earlierCreatedChild_45.needsUpdate()) {
                earlierCreatedChild_45.markStatic();
            }
            View.create(earlierCreatedChild_45);
        }
        let earlierCreatedChild_46: Item = (this && this.findChildById) ? this.findChildById("46") as Item : undefined;
        if (earlierCreatedChild_46 == undefined) {
            View.create(new Item("46", this, {
                text: 'setPort',
                click: () => {
                    let value: any = Smack.setPort(Constant.HOST_PORT);
                    console.info('setUsernameAndPassword = ' + value);
                }
            }));
        }
        else {
            earlierCreatedChild_46.updateWithValueParams({
                text: 'setPort',
                click: () => {
                    let value: any = Smack.setPort(Constant.HOST_PORT);
                    console.info('setUsernameAndPassword = ' + value);
                }
            });
            if (!earlierCreatedChild_46.needsUpdate()) {
                earlierCreatedChild_46.markStatic();
            }
            View.create(earlierCreatedChild_46);
        }
        let earlierCreatedChild_47: Item = (this && this.findChildById) ? this.findChildById("47") as Item : undefined;
        if (earlierCreatedChild_47 == undefined) {
            View.create(new Item("47", this, {
                text: 'password',
                click: () => {
                    let value: any = Smack.password();
                    console.info('password = ' + value);
                }
            }));
        }
        else {
            earlierCreatedChild_47.updateWithValueParams({
                text: 'password',
                click: () => {
                    let value: any = Smack.password();
                    console.info('password = ' + value);
                }
            });
            if (!earlierCreatedChild_47.needsUpdate()) {
                earlierCreatedChild_47.markStatic();
            }
            View.create(earlierCreatedChild_47);
        }
        let earlierCreatedChild_48: Item = (this && this.findChildById) ? this.findChildById("48") as Item : undefined;
        if (earlierCreatedChild_48 == undefined) {
            View.create(new Item("48", this, {
                text: 'setResource',
                click: () => {
                    let value: any = Smack.setResource(Constant.HOST_RES.replace("/", ""));
                    console.info('password = ' + value);
                }
            }));
        }
        else {
            earlierCreatedChild_48.updateWithValueParams({
                text: 'setResource',
                click: () => {
                    let value: any = Smack.setResource(Constant.HOST_RES.replace("/", ""));
                    console.info('password = ' + value);
                }
            });
            if (!earlierCreatedChild_48.needsUpdate()) {
                earlierCreatedChild_48.markStatic();
            }
            View.create(earlierCreatedChild_48);
        }
        let earlierCreatedChild_49: Item = (this && this.findChildById) ? this.findChildById("49") as Item : undefined;
        if (earlierCreatedChild_49 == undefined) {
            View.create(new Item("49", this, {
                text: 'receiveFriends',
                click: () => {
                    let value: any = Smack.receiveFriends("555@" + Constant.HOST_DOMAIN, "group", "receive request");
                }
            }));
        }
        else {
            earlierCreatedChild_49.updateWithValueParams({
                text: 'receiveFriends',
                click: () => {
                    let value: any = Smack.receiveFriends("555@" + Constant.HOST_DOMAIN, "group", "receive request");
                }
            });
            if (!earlierCreatedChild_49.needsUpdate()) {
                earlierCreatedChild_49.markStatic();
            }
            View.create(earlierCreatedChild_49);
        }
        let earlierCreatedChild_50: Item = (this && this.findChildById) ? this.findChildById("50") as Item : undefined;
        if (earlierCreatedChild_50 == undefined) {
            View.create(new Item("50", this, {
                text: 'rejectFriends',
                click: () => {
                    let value: any = Smack.rejectFriends("555@" + Constant.HOST_DOMAIN, "reject request");
                }
            }));
        }
        else {
            earlierCreatedChild_50.updateWithValueParams({
                text: 'rejectFriends',
                click: () => {
                    let value: any = Smack.rejectFriends("555@" + Constant.HOST_DOMAIN, "reject request");
                }
            });
            if (!earlierCreatedChild_50.needsUpdate()) {
                earlierCreatedChild_50.markStatic();
            }
            View.create(earlierCreatedChild_50);
        }
        Column.pop();
        Scroll.pop();
        Row.pop();
    }
}
class Item extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.text = '';
        this.click = () => { };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Item_Params) {
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.click !== undefined) {
            this.click = params.click;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private text: string;
    private click: () => void;
    render() {
        Column.create();
        Button.createWithLabel(this.text);
        Button.fontSize(px2fp(30));
        Button.width('90%');
        Button.margin(px2vp(10));
        Button.padding(px2vp(15));
        Button.onClick(v => {
            this.click();
        });
        Button.pop();
        Column.pop();
    }
}
loadDocument(new page("1", undefined, {}));
