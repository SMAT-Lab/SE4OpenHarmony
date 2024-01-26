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

import testNapi from "libentry.so"
import { FriendsEntity } from './FriendsEntity'
import convertxml from '@ohos.convertxml';
import { RoomInfo } from './RoomInfo';
import { RoomConfig } from './RoomConfig';
export class Smack {

    /**
     * 登陆
     * @param name
     * @param password
     */
    public static Login(name: string, password: string): number{
        let value = testNapi.login(name, password)
        return value
    }

    /**
     * 发送消息
     * @param jidStr
     * @param text
     */
    public static send(jidStr: string, text: string): void{
        testNapi.send(jidStr, text);
    }

    /**
     * 退出登陆
     */
    public static loginout(): void{
        testNapi.loginout();
    }

    /**
     * 添加好友
     * @param jidStr
     * @param username
     * @param group
     */
    public static addFriends(jidStr: string, username: string, group: string): void{
        testNapi.addFriends(jidStr, username, group);
    }

    /**
     * 删除好友
     * @param jidStr
     * @param username
     * @param group
     */
    public static delfriend(jidStr: string): void{
        testNapi.delfriend(jidStr);
    }

    /**
     * 创建分组
     * @param jidStr
     * @param username
     * @param group
     */
    public static createGroup(jidStr: string): void{
        testNapi.createGroup(jidStr);
    }
    /**
     * 修改用户状态
     * @param jidStr
     */
    public static changePresence(statusType: string, status: string): void{
        testNapi.changePresence(statusType, status);
    }

    /**
     * 注册
     * @param name
     * @param password
     */
    public static registers(ip: string, name: string, password: string): number{
        return testNapi.registers(ip, name, password);
    }

    /**
     * 修改密码
     * @param password
     */
    public static changPwd(password: string): void{
        testNapi.changpwd(password);
    }

    /**
     * 获取好友列表
     */
    returnData: Array<FriendsEntity> = []

    public static getFriendList(): Array<FriendsEntity>{
        let returnData: Array<FriendsEntity> = []
        let res: string = testNapi.getFriendList();
        console.info('ssss-getFriendList' + JSON.stringify(res))
        if (res.length > 3) {
            res = res.substr(0, res.length - 2) + ']'
        }
        let data: Array<any> = JSON.parse(res)
        console.info("ssss-getFriendList-" + JSON.stringify(data))
        data.forEach(item => {
            let groupName: string = item.group
            let userName: string = item.name
            let userId: string = item.jid

            let groupIndex = this.hasGroup(returnData, groupName)
            if (groupIndex == -1) {
                let itemData = new FriendsEntity()
                itemData.groupName = groupName
                itemData.names.push({
                    userName: userName,
                    userId: userId
                })
                returnData.push(itemData)
            } else {
                let getData = returnData[groupIndex]
                getData.names.push({
                    userName: userName,
                    userId: userId
                })
            }
        })
        return returnData
    }

    private static hasGroup(returnData: Array<FriendsEntity>, groupName: string): number{
        for (var i = 0; i < returnData.length; i++) {
            if (returnData[i].groupName == groupName) {
                return i
            }
        }
        return -1
    }

    private hasGroup(groupName: string): number{
        for (var i = 0; i < this.returnData.length; i++) {
            if (this.returnData[i].groupName == groupName) {
                return i
            }
        }
        return -1
    }

    /**
     * 取消注册
     * @param jidStr
     * @param username
     * @param group
     */
    public static unregister(): void {
        testNapi.unregister();
    }

    /**
     * 更改好友分组
     * @param name
     * @param group
     */
    public static changeFriendGroup(name: string, group: string): void {
        testNapi.changeFriendGroup(name, group);
    }

    /**
     * 修改分组名称
     * @param oldName
     * @param newName
     */
    public static changeGroup(oldName: string, newName: string): void {
        testNapi.changeGroup(oldName, newName);
    }

    /**
     * 获取消息
     * @param status 状态
     * @param register
     */
    public static registerMessageCallback(callback: (fromId: number, msg: string) => void): void {
        testNapi.registerMessageCallback(callback);
    }

    /**
     * 消息接受监听
     * @param callback
     */
    // public static registerMessageCallback2(callback: (fromId: number, msg: string/*, type: string*/) => void) {
    public static registerMessageCallback2(callback: (fromId: string, msg: string, type: string) => void): void {
        testNapi.registerMessageCallback(callback);
    }

    public static unregisterMessageCallback(): void {
        testNapi.unregisterMessageCallback();
    }

    public static onMessageRecived(fromId: number, msg: string): void {
        console.info("onMessageRecived fromId:" + fromId + ", msg:" + msg + ",size ");
    }

    public static createRoom(jid: string, roomStr: string, domain: string, serviceName: string): number{
        let value = testNapi.createRoom(jid, roomStr, domain, serviceName)
        return value
    }

    public static leave(name: string): number{
        let value = testNapi.leave(name)
        return value
    }

    public static sendGroupMessage(name: string): number{
        let value = testNapi.sendGroupMessage(name)
        return value
    }

    public static setSubject(name: string): number{
        let value = testNapi.setSubject(name)
        return value
    }

    public static join(): number{
        let value = testNapi.join()
        return value
    }

    public static destroy(jid: string, password: string): number{
        let value = testNapi.destroy(jid, password)
        return value
    }

    public static kick(nick: string, reason: string): number{
        let value = testNapi.kick(nick, reason)
        return value
    }

    public static ban(nick: string, reason: string): number{
        let value = testNapi.ban(nick, reason)
        return value
    }

    public static requestVoice(): void{
        testNapi.requestVoice()
    }

    public static grantVoice(nick: string, reason: string): number{
        let value = testNapi.grantVoice(nick, reason)
        return value
    }

    public static revokeVoice(nick: string, reason: string): number{
        let value = testNapi.revokeVoice(nick, reason)
        return value
    }

    public static registerGroupMessageCallback(callback: (fromId: number, msg: string) => void) {
        testNapi.registerGroupMessageCallback(callback);
    }

    public static unregisterGroupMessageCallback(): void {
        testNapi.unregisterGroupMessageCallback();
    }

    public static getAffiliation(): string{
        let value = testNapi.getAffiliation()
        return value
    }

    public static getRole(): string{
        let value = testNapi.getRole()
        return value
    }

    public static setAffiliation(nick: string, affiliation: string, reason: string): number{
        let value = testNapi.setAffiliation(nick, affiliation, reason)
        return value
    }

    public static setRole(nick: string, role: string, reason: string): number{
        let value = testNapi.setRole(nick, role, reason)
        return value
    }

    public static setRoles(nick: string, role: string, reason: string): number{
        let value = testNapi.setRoles(nick, role, reason)
        return value
    }

    public static setPresence(presence: string, msg: string): number{
        let value = testNapi.setPresence(presence, msg)
        return value
    }

    public static invite(jid: string, reason: string): number{
        let value = testNapi.invite(jid, reason)
        return value
    }

    public static parseXML(): string {
        var xml = testNapi.getRoomInfo()
        let str = this.xml(xml)
        let jsonObj = JSON.parse(str)
        let info = new RoomInfo()
        for (var i = 0; i < jsonObj._elements[0]._elements.length; i++) {
            let obj = jsonObj._elements[0]._elements[i]
            if (obj._elements[0]._elements != undefined) {
                switch (obj._attributes.var) {
                    case "muc#roominfo_description":
                        info.description = obj._elements[0]._elements[0]._text
                        break;
                    case "muc#roominfo_subject":
                        info.subject = obj._elements[0]._elements[0]._text
                        break;
                    case "muc#roominfo_occupants":
                        info.occupants = obj._elements[0]._elements[0]._text
                        break;
                    case "x-muc#roominfo_creationdate":
                        info.creationdate = obj._elements[0]._elements[0]._text
                        break;
                }
            }
        }
        console.info('ssss-' + JSON.stringify(info))
        return JSON.stringify(info);
    }

    public static getRoomConfig(): string {
        var xml = testNapi.requestRoomConfig()
        let config = new RoomConfig()
        let str = this.xml(xml)
        let jsonObj = JSON.parse(str)
        for (var i = 0; i < jsonObj._elements[0]._elements.length; i++) {
            let obj = jsonObj._elements[0]._elements[i]
            if (obj._name == 'field' && obj._attributes != undefined && obj._elements != undefined) {
                switch (obj._attributes.var) {
                    case "muc#roomconfig_roomname":
                        config.roomname = obj._elements[0]._elements[0]._text
                        break;
                    case "muc#roomconfig_roomdesc":
                        config.roomdesc = obj._elements[0]._elements[0]._text
                        break;
                    case "muc#roomconfig_changesubject":
                        config.changesubject = obj._elements[0]._elements[0]._text
                        break;
                    case "muc#roomconfig_maxusers":
                        for (let j = 0;j < obj._elements.length; j++) {
                            if (obj._elements[j]._name == "value") {
                                config.maxusers = obj._elements[j]._elements[0]._text
                            }
                        }
                        break;
                    case "muc#roomconfig_presencebroadcast":
                        config.presencebroadcast = []
                        for (let j = 0;j < obj._elements.length; j++) {
                            if (obj._elements[j]._name == "value") {
                                config.presencebroadcast.push(obj._elements[j]._elements[0]._text)
                            }
                        }
                        break;
                    case "muc#roomconfig_publicroom":
                        config.publicroom = obj._elements[0]._elements[0]._text
                        break;
                    case "muc#roomconfig_persistentroom":
                        config.persistentroom = obj._elements[0]._elements[0]._text
                        break;
                    case "muc#roomconfig_moderatedroom":
                        config.moderatedroom = obj._elements[0]._elements[0]._text
                        break;
                    case "muc#roomconfig_membersonly":
                        config.membersonly = obj._elements[0]._elements[0]._text
                        break;
                    case "muc#roomconfig_allowinvites":
                        config.allowinvites = obj._elements[0]._elements[0]._text
                        break;
                    case "muc#roomconfig_passwordprotectedroom":
                        config.passwordprotectedroom = obj._elements[0]._elements[0]._text
                        break;
                    case "muc#roomconfig_roomsecret":
                        config.roomsecret = obj._elements[0]._elements[0]._text
                        break;
                    case "muc#roomconfig_whois":
                        for (let j = 0;j < obj._elements.length; j++) {
                            if (obj._elements[j]._name == "value") {
                                config.whois = obj._elements[j]._elements[0]._text
                            }
                        }

                        break;
                    case "muc#roomconfig_allowpm":
                        for (let j = 0;j < obj._elements.length; j++) {
                            if (obj._elements[j]._name == "value") {
                                config.allowpm = obj._elements[j]._elements[0]._text
                            }
                        }
                        break;
                    case "muc#roomconfig_enablelogging":
                        config.enablelogging = obj._elements[0]._elements[0]._text
                        break;
                    case "x-muc#roomconfig_reservednick":
                        config.reservednick = obj._elements[0]._elements[0]._text
                        break;
                    case "x-muc#roomconfig_canchangenick":
                        config.canchangenick = obj._elements[0]._elements[0]._text
                        break;
                    case "x-muc#roomconfig_registration":
                        config.registration = obj._elements[0]._elements[0]._text
                        break;
                    case "muc#roomconfig_roomadmins":
                        config.roomadmins = obj._elements[0]._elements[0]._text
                        break;
                    case "muc#roomconfig_roomowners":
                        config.roomowners = obj._elements[0]._elements[0]._text
                        break;
                }
            }
        }
        return JSON.stringify(config);
    }

    public static xml(ml: string): string {
        let conv = new convertxml.ConvertXML();
        let options = {
            trim: false,
            declarationKey: "_declaration",
            instructionKey: "_instruction",
            attributesKey: "_attributes",
            textKey: "_text",
            cdataKey: "_cdata",
            doctypeKey: "_doctype",
            commentKey: "_comment",
            parentKey: "_parent",
            typeKey: "_type",
            nameKey: "_name",
            elementsKey: "_elements"
        }
        let result = JSON.stringify(conv.convert(ml, options));
        return result
    }

    public static requestRoomConfig(): string{
        let value = testNapi.requestRoomConfig()
        return value
    }

    public static getRoomItems(): string{
        let value = testNapi.getRoomItems()
        value = JSON.stringify(value).replace(",]", "]")
        let str = JSON.parse(value)
        console.info('sssss-getRoomItems' + str)
        return str
    }

    public static getRoomInfo(): string{
        let value = testNapi.getRoomInfo()
        return value
    }

    public static requestList(operation: string): string{
        let value = testNapi.requestList(operation)
        let str = JSON.stringify(value).replace(",]", "]")
        return JSON.parse(str) + ""
    }

    public static declineInvitation(room: string, invitor: string, reason: string): string{
        let value = testNapi.declineInvitation(room, invitor, reason)
        return value
    }

    public static registerInvitationListener(callback: (v0: string) => void): void {
        testNapi.registerInvitationListener(callback);
    }

    public static unregisterInvitationListener(): void {
        testNapi.unregisterInvitationListener();
    }

    public static onHandleInvitation(resultStr: string): void {
        console.info("onHandleSubscriptionRequest resultStr:" + resultStr);
    }
    public static createOrJoinRoom(room: string, domain: string, serviceName: string, password?: string): number{
        if (password == undefined) {
            password = ""
        }
        let value = -1;
        if (room && domain && serviceName) {
            value = testNapi.createOrJoinRoom(room, domain, serviceName, password)
        }
        return value
    }

    public static setPassword(password: string): number{
        let value = testNapi.setPassword(password)
        return value
    }

    public static setRoomConfig(config: string): number{
        console.info('setRoomConfig start = ' + config)
        let configInfo: RoomConfig = JSON.parse(config)
        let configStr = JSON.stringify(configInfo.presencebroadcast)
        if(configInfo.presencebroadcast){
            configInfo.presencebroadcast = []
            configInfo.presencebroadcast[0] = configStr.replace(/\[/g, "").replace(/\]/g, "").replace(/\{/g, "").replace(/\}/g, "").replace(/\"/g, '').replace(/\,/g, ' ')
        }

        config = JSON.stringify(configInfo)
        let s1 = config
            .replace(/\"/g, "")
            .replace(/\{/g, "")
            .replace(/\}/g, "")
            .replace(/\[/g, "")
            .replace(/\]/g, "")
        console.info('setRoomConfig end = ' + s1)
        let value = testNapi.setRoomConfig(s1)
        return value
    }

    public static registerMUCParticipantPresenceListener(callback: (nike: string, presenceType: string, affiliationType: string) => void): void {
        testNapi.registerMUCParticipantPresenceListener2(callback);
    }

    /**
     * 取消房间销毁监听
     */
    public static unregisterMUCParticipantPresenceListener(): void {
        testNapi.unregisterMUCParticipantPresenceListener();
    }

    public static bans(nick: string, reason: string): number{
        let value = testNapi.bans(nick, reason)
        return value
    }

    public static setNick(nick: string): number{
        let value = testNapi.setNick(nick)
        return value
    }

    public static isJoined(): string{
        let value = testNapi.isJoined()
        return value
    }

    public static nick(): string{
        let value = testNapi.nick()
        return value
    }

    public static isConnected(): boolean{
        return testNapi.isConnected() == 1 ? true : false;
    }

    public static username(): string{
        return testNapi.username();
    }

    public static connect(): boolean{
        return testNapi.connect() == 1 ? true : false;
    }

    public static setServer(server: string): void{
        if (server)
        testNapi.setServer(server)
    }

    public static setUsernameAndPassword(username: string, password: string): number{
        let value = testNapi.setUsernameAndPassword(username, password)
        return value
    }

    public static setPort(port: number): number{
        let value = testNapi.setPort(port);
        return value
    }

    public static password(): string{
        let value = testNapi.password();
        return value;
    }

    public static resource(): string{
        return testNapi.resource();
    }

    public static setResource(resource: string): string{
        return testNapi.setResource(resource);
    }

    public static grantVoices(nicks: string, reason: string): number{
        return testNapi.grantVoices(nicks, reason);
    }

    public static revokeVoices(nicks: string, reason: string): number{
        return testNapi.revokeVoices(nicks, reason);
    }

    public static onLogin(): boolean{
        return testNapi.onLogin() == 1 ? true : false;
    }

    public static server(): string{
        return testNapi.server()
    }

    public static authed(): boolean{
        return testNapi.authed() == 1 ? true : false;
    }

    public static port(): number{
        return testNapi.port();
    }

    public static compression(): boolean{
        return testNapi.compression() == 1 ? true : false;
    }

    public static setAffiliations(nick: string, affiliationStr: string, reason: string): string {
        return testNapi.setAffiliations(nick, affiliationStr, reason);
    }

    public static handleSubscriptionRequestListener(callback: (resultStr: string) => void): void {
        testNapi.handleSubscriptionRequestListener(callback);
    }

    public static unSubscriptionRequestListener(): void {
        testNapi.unSubscriptionRequestListener();
    }

    public static onHandleSubscriptionRequest(resultStr: string) {
        console.info("onHandleSubscriptionRequest resultStr:" + resultStr);
    }

    public static receiveFriends(jidStr: string, groupName: string, msg: string): string {
        return testNapi.receiveFriends(jidStr, groupName, msg);

    }

    public static rejectFriends(jidStr: string, reason: string): string {
        return testNapi.rejectFriends(jidStr, reason);

    }

    public static registerNonrosterPresenceCallback(callback: (from: string, to: string, presence: string) => void): void {
        testNapi.registerNonrosterPresenceCallback(callback);
    }

    public static unregisterNonrosterPresenceCallback(): void {
        testNapi.unregisterNonrosterPresenceCallback();
    }
}