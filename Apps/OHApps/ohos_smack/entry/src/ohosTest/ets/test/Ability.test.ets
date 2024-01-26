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

import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import { Constant } from '../../../main/ets/entity/Constant';
import { FriendsEntity, MUCOperation, MUCRoomAffiliation, MUCRoomRole, PresenceType,
  RoomConfig, Smack } from '@ohos/smack'
export default function abilityTest() {
  let userName :string|null= ''
  let userPassword :string|null= ''
  let resource:string = ''
  let ip:string =''
  let port:number = 0
  let compression:boolean =false
  let authed:boolean = false
  let uName:string = ''
  let uPassword:string = ''
  describe('ActsAbilityTest', () => {
    beforeAll(() => {

    })
    beforeEach(() => {

    })
    afterEach(() => {

    })
    afterAll(() => {

    })

    it('test_register_none_name',0, () => {
      userName= null;
      userPassword= '123456';
      let result: number = Smack.registers(Constant.HOST_IP, userName, userPassword)
      if(result == 0){
        expect(result).assertEqual(0);
      }else{
        expect(result).assertLargerOrEqual(1);
      }
    })

    it('test_register_none_pwd',0, () => {
      userName= 'testuser';
      userPassword= null;
      let result: number = Smack.registers(Constant.HOST_IP, userName, userPassword)
      if(result == 0){
        expect(result).assertEqual(0);
      }else{
        expect(result).assertEqual(2);
      }
    })

    it('test_register_userone',0, () => {
      userName= 'testuser01';
      userPassword= '123456';
      let result: number = Smack.registers(Constant.HOST_IP, userName, userPassword)
      if(result == 0){
        expect(result).assertEqual(0);
      }else{
        expect(result).assertEqual(-1);
      }
    })

    it('test_set_server_none',0, () => {
      Smack.setServer('');
      let server =Smack.server();
      if(server == undefined){
        expect(server).assertUndefined();
      }else{
        expect(server).assertEqual('');
      }
    })

    it('test_set_server_null',0, () => {
      Smack.setServer(null);
      let server =Smack.server();
      if(server == undefined){
        expect(server).assertUndefined();
      }else{
        expect(server).assertEqual('');
      }
    })

    it('test_set_server_undefined',0, () => {
      Smack.setServer(undefined);
      let server =Smack.server();
      if(server == undefined){
        expect(server).assertUndefined();
      }else{
        expect(server).assertEqual('');
      }
    })

    it('test_set_server',0, () => {
      Smack.setServer(Constant.HOST_IP);
      Smack.setServer(Constant.SERVICE_NAME);
      let server =Smack.server();
      if(server == undefined){
        expect(server).assertUndefined();
      }else{
        expect(server).assertEqual(Constant.SERVICE_NAME);
      }
    })

    it('test_set_resource_none',0, () => {
      let resource = '';
      let setResResult =Smack.setResource(resource)
      if(setResResult == undefined){
        expect(setResResult).assertUndefined();
      }else{
        expect(setResResult).assertContain('');
      }
    })

    it('test_set_resource_undefined',0, () => {
      let resource = undefined;
      let setResResult =Smack.setResource(resource)
      if(setResResult == undefined){
        expect(setResResult).assertUndefined();
      }else{
        expect(setResResult).assertContain('');
      }
    })

    it('test_set_resource',0, () => {
      let resource = Constant.HOST_RES.replace("/", "");
      let setResResult =Smack.setResource(resource)
      if(setResResult == undefined){
        expect(setResResult).assertUndefined();
      }else{
        expect(setResResult).assertContain(resource);
      }
    })

    it('test_set_port_none',0, () => {
      let setPortResult =Smack.setPort(null)
      if(setPortResult == undefined){
        expect(setPortResult).assertUndefined();
      }else{
        expect(setPortResult).assertEqual(0);
      }
    })

    it('test_set_port_undefined',0, () => {
      let setPortResult =Smack.setPort(undefined)
      if(setPortResult == undefined){
        expect(setPortResult).assertUndefined();
      }else{
        expect(setPortResult).assertEqual(0);
      }
    })

    it('test_set_port',0, () => {
      let setPortResult =Smack.setPort(Constant.HOST_PORT)
      if(setPortResult == undefined){
        expect(setPortResult).assertUndefined();
      }else{
        expect(setPortResult).assertEqual(Constant.HOST_PORT);
      }
    })

    it('test_set_username_and_pwd',0, () => {
      let setNameAndPwdResult = Smack.setUsernameAndPassword(userName, userPassword);
      if(setNameAndPwdResult == undefined){
        expect(setNameAndPwdResult).assertUndefined();
      }else{
        expect(setNameAndPwdResult).assertEqual(0);
      }
    })

    it('test_connect_server_userone',0, () => {
      Smack.connect()
      uName = Smack.username()
      uPassword = Smack.password()
      resource = Smack.resource()
      ip = Smack.server()
      port = Smack.port()
      compression = Smack.compression()
      authed = Smack.authed();
      let isConnect:boolean =Smack.isConnected();
      expect(isConnect).assertTrue;
    })

    it('test_get_port',0, () => {
      let port =Smack.port();
      if(port == undefined){
        expect(port).assertUndefined();
      }else{
        expect(port).assertEqual(Constant.HOST_PORT);
      }
    })

    it('test_get_server',0, () => {
      let server =Smack.server();
      if(server == undefined){
        expect(server).assertUndefined();
      }else{
        expect(server).assertEqual(Constant.SERVICE_NAME);
      }
    })

    it('test_get_compression',0, () => {
      let compression =Smack.compression();
      if(compression == undefined){
        expect(compression).assertUndefined();
      }else{
        expect(compression).assertTrue();
      }
    })

    it('test_get_authed',0, () => {
      let authed =Smack.authed();
      if(authed == undefined){
        expect(authed).assertUndefined();
      }else{
        expect(authed).assertFalse();
      }
    })

    it('test_get_resource',0, () => {
      let res = Constant.HOST_RES.replace("/", "");
      let resource =Smack.resource();
      if(resource == undefined){
        expect(resource).assertUndefined();
      }else{
        expect(resource).assertContain(res);
      }
    })

    it('test_login_success_userone',0, () => {
      try {
        let LoginName = uName + '@' + Constant.HOST_IP
        userName = uName + '@' + Constant.HOST_IP + Constant.HOST_RES
        let result:number = Smack.Login(LoginName, uPassword);
        if(result == 1){
          expect(result).assertEqual(1);
        }else{
          expect(result).assertEqual(-1);
        }
      } catch (e) {
        hilog.info(0x0000, 'testTag', '%{public}s', "onLogin fail  " + e.message);
      }
    })

    it('test_unregister_userone',0, () => {
      Smack.unregister();
      let isConnect:boolean =Smack.isConnected();
      expect(isConnect).assertFalse;
    })

    it('test_register_usertwo',0, () => {
      userName='testuser02';
      userPassword='123456';
      let result: number = Smack.registers(Constant.HOST_IP, userName, userPassword)
      if(result == 0){
        expect(result).assertEqual(0);
      }else{
        expect(result).assertEqual(2);
      }
    })

    it('test_connect_server_usertwo',0, () => {
      Smack.setServer(Constant.HOST_IP)
      Smack.setServer(Constant.SERVICE_NAME)
      Smack.setResource(Constant.HOST_RES.replace("/", ""))
      Smack.setPort(Constant.HOST_PORT);
      Smack.setUsernameAndPassword(userName, userPassword)
      Smack.connect()
      uName = Smack.username()
      uPassword = Smack.password()
      resource = Smack.resource()
      ip = Smack.server()
      port = Smack.port()
      compression = Smack.compression()
      authed = Smack.authed();
      let isConnect:boolean =Smack.isConnected();
      expect(isConnect).assertTrue;
    })

    it('test_login_fail_usertwo',0, () => {
      try {
        let LoginName = uName + '@errorUserName' + Constant.HOST_IP
        userName = uName + '@' + Constant.HOST_IP + Constant.HOST_RES
        let result:number = Smack.Login(LoginName, uPassword);
        expect(result).assertEqual(-1)
      } catch (e) {
        hilog.info(0x0000, 'testTag', '%{public}s', "test_login_fail  " + e.message);
      }
    })

    it('test_login_success_usertwo',0, () => {
      try {
        let LoginName = uName + '@' + Constant.HOST_IP
        userName = uName + '@' + Constant.HOST_IP + Constant.HOST_RES
        let result:number = Smack.Login(LoginName, uPassword);
        if(result == 1){
          expect(result).assertEqual(1);
        }else{
          expect(result).assertEqual(-1);
        }
      } catch (e) {
        hilog.info(0x0000, 'testTag', '%{public}s', "onLogin fail  " + e.message);
      }
    })

    it('test_changePwd_none',0, () => {
      Smack.changPwd('');
      let result = Smack.password();
      expect(result).assertContain(userPassword);
    })

    it('test_changePwd_one',0, () => {
      Smack.changPwd(null);
      let result = Smack.password();
      expect(result).assertContain(userPassword);
    })

    it('test_changePwd_userTwo',0, () => {
      let pwd = '123456';
      Smack.changPwd(pwd);
      let chengeResultPwd = Smack.password();
      expect(chengeResultPwd).assertEqual(pwd);
    })

    it('test_changePresence',0, () => {
      let chengeResultPre =Smack.changePresence(PresenceType.Away, '在线')
      expect(chengeResultPre).assertUndefined();
    })

    it('test_send_msg',0, () => {
      let sendMsgResult = Smack.send('admin'+ "@" + Constant.HOST_DOMAIN, 'testmsg')
      expect(sendMsgResult).assertUndefined();
    })

    it('test_send_msg_none',0, () => {
      let sendMsgResult = Smack.send('admin'+ "@" + Constant.HOST_DOMAIN, '')
      expect(sendMsgResult).assertUndefined();
    })

    it('test_register_msg_callback',0, () => {
      Smack.registerMessageCallback((id, msg)=>{
        let id_msg = msg.toString().trim();
        expect(id_msg).assertUndefined();
      })
    })

    it('test_send_msg_second',0, () => {
      let sendMsgResult = Smack.send('test'+ "@" + Constant.HOST_DOMAIN, 'testOthermsg')
      expect(sendMsgResult).assertUndefined();
    })

    it('test_add_friend',0, () => {
      let sendAddFriendResult = Smack.addFriends('admin' + "@" + Constant.HOST_DOMAIN,'admin', 'grouptest')
      expect(sendAddFriendResult).assertUndefined();
    })

    it('test_delete_friends',0, () => {
      let deleteFriendResult = Smack.delfriend('test' + '@' + Constant.HOST_IP);
      expect(deleteFriendResult).assertUndefined();
    })

    it('test_list_friends',0, () => {
      let friendlist: Array<FriendsEntity> = Smack.getFriendList()
      expect(friendlist.length).assertLargerOrEqual(0);
    })

    it('test_change_group_name_none',0, () => {
      let changeResult= Smack.changeGroup('', 'grouptestone')
      expect(changeResult).assertUndefined();
    })

    it('test_change_group_name',0, () => {
      let changeResult= Smack.changeGroup('grouptest', 'grouptestone')
      expect(changeResult).assertUndefined();
    })

    it('test_change_new_group',0, () => {
      let changeResult= Smack.changeFriendGroup('admin' + "@" + Constant.HOST_DOMAIN, 'grouptestone')
      expect(changeResult).assertUndefined();
    })

    it('test_create_room',0, () => {
      let createRoomResult= Smack.createRoom(userName, 'roomName',  Constant.HOST_DOMAIN, Constant.SERVICE_NAME);
      expect(createRoomResult).assertContain(userName);
    })
    //
    it('test_send_room_msg',0, () => {
      let msg ="group msg test";
      let sendRoomMsgResult= Smack.sendGroupMessage("group msg test");
      if(sendRoomMsgResult == undefined) {
        expect(sendRoomMsgResult).assertUndefined();
      }else{
        expect(sendRoomMsgResult).assertContain(msg);
      }
    })

    it('test_send_room_msg_none',0, () => {
      let msg ="";
      let sendRoomMsgResult= Smack.sendGroupMessage(msg);
      if(sendRoomMsgResult == undefined) {
        expect(sendRoomMsgResult).assertUndefined();
      }else{
        expect(sendRoomMsgResult).assertContain(msg);
      }
    })

    it('test_send_room_no_msg',0, () => {
      let msg =undefined;
      let sendRoomMsgResult:number|string= Smack.sendGroupMessage(msg);
      if(sendRoomMsgResult == undefined) {
        expect(sendRoomMsgResult).assertUndefined();
      }else{
        expect(String(sendRoomMsgResult).length).assertLargerOrEqual(0);
      }
    })

    it('test_set_room_subject_none',0, () => {
      let subject ="";
      let setRoomSubjectResult= Smack.setSubject(subject);
      if(setRoomSubjectResult == undefined){
        expect(setRoomSubjectResult).assertUndefined();
      }else{
        expect(setRoomSubjectResult).assertContain(subject);
      }
    })

    it('test_set_room_subject_undefined',0, () => {
      let subject =undefined;
      let setRoomSubjectResult= Smack.setSubject(subject);
      if(setRoomSubjectResult == undefined){
        expect(setRoomSubjectResult).assertUndefined();
      }else{
        expect(setRoomSubjectResult).assertContain('');
      }
    })

    it('test_set_room_subject',0, () => {
      let subject ="subject";
      let setRoomSubjectResult= Smack.setSubject(subject);
      if(setRoomSubjectResult == undefined){
        expect(setRoomSubjectResult).assertUndefined();
      }else{
        expect(setRoomSubjectResult).assertContain(subject);
      }
    })

    it('test_friends_number',0, () => {
      let friends: Array<FriendsEntity> = Smack.getFriendList()
      expect(friends.length).assertLargerOrEqual(0);
    })

    it('test_destroy_room_none',0, () => {
      let destroyResult = Smack.destroy(userName, "");
      if(destroyResult == undefined){
        expect(destroyResult).assertUndefined();
      }else{
        expect(destroyResult).assertEqual(0);
      }
    })

    it('test_destroy_room_null',0, () => {
      let destroyResult = Smack.destroy(userName, null);
      if(destroyResult == undefined){
        expect(destroyResult).assertUndefined();
      }else{
        expect(destroyResult).assertEqual(0);
      }
    })

    it('test_destroy_room_zero',0, () => {
      let destroyResult = Smack.destroy(userName, '0');
      if(destroyResult == undefined){
        expect(destroyResult).assertUndefined();
      }else{
        expect(destroyResult).assertEqual(0);
      }
    })

    it('test_destroy_room_undefined',0, () => {
      let roomName =undefined;
      let destroyResult = Smack.destroy(userName, roomName);
      if(destroyResult == undefined){
        expect(destroyResult).assertUndefined();
      }else{
        expect(destroyResult).assertEqual(0);
      }
    })

    it('test_destroy_room',0, () => {
      let destroyResult = Smack.destroy(userName, "grouptestone");
      if(destroyResult == undefined){
        expect(destroyResult).assertUndefined();
      }else{
        expect(destroyResult).assertEqual(0);
      }
    })

    it('test_create_new_room',0, () => {
      let createRoomResult= Smack.createRoom(userName, 'roomNewName',  Constant.HOST_DOMAIN, Constant.SERVICE_NAME);
      if(createRoomResult == undefined){
        expect(createRoomResult).assertUndefined();
      }else{
        expect(createRoomResult).assertContain(userName);
      }
    })

    it('test_kick_member_none',0, () => {
      let kickResult= Smack.kick("", "kick");
      if(kickResult == undefined){
        expect(kickResult).assertUndefined();
      }else{
        expect(kickResult).assertEqual(0);
      }
    })

    it('test_kick_member_null',0, () => {
      let kickResult= Smack.kick(null, "kick");
      if(kickResult == undefined){
        expect(kickResult).assertUndefined();
      }else{
        expect(kickResult).assertEqual(0);
      }
    })

    it('test_kick_member_undefined',0, () => {
      let kickResult= Smack.kick(undefined, "kick");
      if(kickResult == undefined){
        expect(kickResult).assertUndefined();
      }else{
        expect(kickResult).assertEqual(0);
      }
    })

    it('test_kick_member',0, () => {
      let kickResult= Smack.kick("testtwo", "kick");
      if(kickResult == undefined){
        expect(kickResult).assertUndefined();
      }else{
        expect(kickResult).assertEqual(0);
      }
    })

    it('test_ban_member',0, () => {
      let banResult= Smack.ban("testthree", "ban");
      if(banResult == undefined){
        expect(banResult).assertUndefined();
      }else{
        expect(banResult).assertEqual(0);
      }
    })

    it('test_revokeVoice_member',0, () => {
      let revokeVoiceResult= Smack.revokeVoice("admin", "revokeVoice");
      if(revokeVoiceResult == undefined){
        expect(revokeVoiceResult).assertUndefined();
      }else{
        expect(revokeVoiceResult).assertEqual(0);
      }
    })

    it('test_grantVoice_member',0, () => {
      let grantVoiceResult= Smack.grantVoice("admin", "grantVoice");
      if(grantVoiceResult == undefined){
        expect(grantVoiceResult).assertUndefined();
      }else{
        expect(grantVoiceResult).assertEqual(0);
      }
    })

    it('test_setAffiliation_memeber',0, () => {
      let setAffiliationResult= Smack.setAffiliation(userName, MUCRoomAffiliation.AffiliationOwner, "AffiliationOwner");
      if(setAffiliationResult == undefined){
        expect(setAffiliationResult).assertUndefined();
      }else{
        expect(setAffiliationResult).assertContain(userName);
      }
    })

    it('test_setRoles_memeber',0, () => {
      let setRolesResult= Smack.setRole(userName, MUCRoomRole.RoleParticipant, "RoleParticipant");
      if(setRolesResult == undefined){
        expect(setRolesResult).assertUndefined();
      }else{
        expect(setRolesResult).assertContain(userName);
      }
    })

    it('test_invite_memeber',0, () => {
      let inviteMemberName ="admin@"+Constant.HOST_DOMAIN+Constant.HOST_RES;
      let inviteResult= Smack.invite(inviteMemberName, "invite");
      if(inviteResult == undefined){
        expect(inviteResult).assertUndefined();
      }else{
        expect(inviteResult).assertContain(inviteMemberName);
      }
    })

    it('test_getRoom_memeber',0, () => {
      let roomitems: Array<ESObject> = JSON.parse(Smack.getRoomItems())
      expect(roomitems.length).assertLargerOrEqual(0);
    })

    it('test_decline_invitation',0, () => {
      let declineInvitationName ="admin_room@"+Constant.SERVICE_NAME+"."+Constant.HOST_DOMAIN;
      let declineResult = Smack.declineInvitation(declineInvitationName, "admin@"+Constant.HOST_DOMAIN, "room inviation refuesd");
      if(declineResult == undefined){
        expect(declineResult).assertUndefined();
      }else{
        expect(declineResult).assertContain(declineInvitationName);
      }
    })

    it('test_destroy_new_room_none',0, () => {
      let destroyResult = Smack.destroy('', "roomNewName");
      if(destroyResult == undefined){
        expect(destroyResult).assertUndefined();
      }else{
        expect(destroyResult).assertEqual(0);
      }
    })

    it('test_destroy_new_room_null',0, () => {
      let destroyResult = Smack.destroy(null, "roomNewName");
      if(destroyResult == undefined){
        expect(destroyResult).assertUndefined();
      }else{
        expect(destroyResult).assertEqual(0);
      }
    })

    it('test_destroy_new_room_undefined',0, () => {
      let destroyResult = Smack.destroy(undefined, "roomNewName");
      if(destroyResult == undefined){
        expect(destroyResult).assertUndefined();
      }else{
        expect(destroyResult).assertEqual(0);
      }
    })

    it('test_destroy_new_room',0, () => {
      let destroyResult = Smack.destroy(userName, "roomNewName");
      if(destroyResult == undefined){
        expect(destroyResult).assertUndefined();
      }else{
        expect(destroyResult).assertEqual(0);
      }
    })

    it('test_createOrJoin_none_room',0, () => {
      let roomName = '';
      let createOrJoinRoomResult= Smack.createOrJoinRoom(roomName, Constant.HOST_DOMAIN, Constant.SERVICE_NAME, "123");
      if(createOrJoinRoomResult == undefined){
        expect(createOrJoinRoomResult).assertUndefined();
      }else{
        expect(createOrJoinRoomResult).assertEqual(-1);
      }
    })

    it('test_createOrJoin_null_room',0, () => {
      let roomName = null;
      let createOrJoinRoomResult= Smack.createOrJoinRoom(roomName, Constant.HOST_DOMAIN, Constant.SERVICE_NAME, "123");
      if(createOrJoinRoomResult == undefined){
        expect(createOrJoinRoomResult).assertUndefined();
      }else{
        expect(createOrJoinRoomResult).assertEqual(-1);
      }
    })

    it('test_createOrJoin_undefined_room',0, () => {
      let roomName = undefined;
      let createOrJoinRoomResult= Smack.createOrJoinRoom(roomName, Constant.HOST_DOMAIN, Constant.SERVICE_NAME, "123");
      if(createOrJoinRoomResult == undefined){
        expect(createOrJoinRoomResult).assertUndefined();
      }else{
        expect(createOrJoinRoomResult).assertEqual(-1);
      }
    })

    it('test_createOrJoin_room',0, () => {
      let roomName = "roomthird";
      let createOrJoinRoomResult= Smack.createOrJoinRoom(roomName, Constant.HOST_DOMAIN, Constant.SERVICE_NAME, "123");
      if(createOrJoinRoomResult == undefined){
        expect(createOrJoinRoomResult).assertUndefined();
      }else{
        expect(createOrJoinRoomResult).assertContain(roomName);
      }
    })

    it('test_setPassword_room_none',0, () => {
      let password = "";
      let setPasswordRoomResult= Smack.setPassword(password);
      if(setPasswordRoomResult == undefined){
        expect(setPasswordRoomResult).assertUndefined();
      }else{
        expect(setPasswordRoomResult).assertContain('');
      }
    })

    it('test_setPassword_room_null',0, () => {
      let password = null;
      let setPasswordRoomResult= Smack.setPassword(password);
      if(setPasswordRoomResult == undefined){
        expect(setPasswordRoomResult).assertUndefined();
      }else{
        expect(setPasswordRoomResult).assertContain('');
      }
    })

    it('test_setPassword_room',0, () => {
      let password = "123456";
      let setPasswordRoomResult= Smack.setPassword(password);
      if(setPasswordRoomResult == undefined){
        expect(setPasswordRoomResult).assertUndefined();
      }else{
        expect(setPasswordRoomResult).assertContain(password);
      }
    })

    it('test_setPassword_arr_room',0, () => {
      let arrPassword = ["123456"];
      let setArrPasswordRoomResult= Smack.setPassword(arrPassword[0]);
      if(setArrPasswordRoomResult == undefined){
        expect(setArrPasswordRoomResult).assertUndefined();
      }else{
        expect(setArrPasswordRoomResult).assertContain(arrPassword[0]);
      }
    })

    it('test_get_room_info',0, () => {
      let infoResult= Smack.getRoomInfo();
      if(infoResult == undefined){
        expect(infoResult).assertUndefined();
      }else{
        expect(infoResult).assertContain('roomthird');
      }
    })

    it('test_get_parseXML_info',0, () => {
      let xmlResult= Smack.parseXML();
      if(xmlResult == undefined){
        expect(xmlResult).assertUndefined();
      }else{
        let jsonXML:ESObject = JSON.parse(xmlResult);
        expect(jsonXML.description).assertContain('roomthird');
      }
    })

    it('test_request_room_config',0, () => {
      let configResult= Smack.requestRoomConfig();
      if(configResult == undefined){
        expect(configResult).assertUndefined();
      }else{
        expect(configResult).assertContain('roomthird');
      }
    })

    it('test_set_room_config',0, () => {
      let roomConfig: RoomConfig =JSON.parse(Smack.getRoomConfig());
      let configResult= Smack.setRoomConfig(JSON.stringify(roomConfig));
      hilog.info(0x0000, 'testTag', '%{public}s', "configResult : " +configResult );
      if(configResult == undefined){
        expect(configResult).assertUndefined();
      }else{
        expect(configResult).assertContain('roomthird');
      }
    })

    it('test_room_config',0, () => {
      let roomConfig: RoomConfig =JSON.parse(Smack.getRoomConfig());
      let configResult= Smack.setRoomConfig(JSON.stringify(roomConfig));
      hilog.info(0x0000, 'testTag', '%{public}s', "configResult : " +configResult );
      if(configResult == undefined){
        expect(configResult).assertUndefined();
      }else{
        expect(configResult).assertContain('roomthird');
      }
    })

    it('test_bans_member',0, () => {
      let bansMember="userOne,userTwo";
      let bansResult =Smack.bans(bansMember, "bans");
      if(bansResult == undefined){
        expect(bansResult).assertUndefined();
      }else{
        expect(bansResult).assertContain(bansMember);
      }
    })

    it('test_bans_member_null',0, () => {
      let bansMember=null;
      let bansResult =Smack.bans(bansMember, "bans");
      if(bansResult == undefined){
        expect(bansResult).assertUndefined();
      }else{
        expect(bansResult).assertContain('');
      }
    })

    it('test_setNick_member_none',0, () => {
      let setNickResult =Smack.setNick('');
      if(setNickResult == undefined){
        expect(setNickResult).assertUndefined();
      }else{
        expect(setNickResult).assertContain('');
      }
    })

    it('test_setNick_member_null',0, () => {
      let setNickResult =Smack.setNick(null);
      if(setNickResult == undefined){
        expect(setNickResult).assertUndefined();
      }else{
        expect(setNickResult).assertContain('');
      }
    })

    it('test_setNick_member',0, () => {
      let setNickResult =Smack.setNick(userName);
      if(setNickResult == undefined){
        expect(setNickResult).assertUndefined();
      }else{
        expect(setNickResult).assertContain(userName);
      }
    })

    it('test_isJoined_member',0, () => {
      let isJoinedResult =Smack.isJoined();
      hilog.info(0x0000, 'testTag', '%{public}s', "isJoinedResult : " +isJoinedResult );
      if(isJoinedResult == undefined){
        expect(isJoinedResult).assertUndefined();
      }else{
        expect(isJoinedResult).assertEqual('1');
      }
    })

    it('test_room_member_name',0, () => {
      let nickNameResult =Smack.nick();
      if(nickNameResult == undefined){
        expect(nickNameResult).assertUndefined();
      }else{
        expect(userName).assertContain(nickNameResult);
      }
    })

    it('test_is_connnect',0, () => {
      let isConnect:boolean =Smack.isConnected();
      expect(isConnect).assertTrue;
    })

    it('test_get_usrename',0, () => {
      let userName =Smack.username();
      if(userName == undefined){
        expect(userName).assertUndefined();
      }else{
        expect(userName).assertContain(userName);
      }
    })

    it('test_get_password',0, () => {
      let password =Smack.password();
      if(password == undefined){
        expect(password).assertUndefined();
      }else{
        expect(userPassword).assertContain(password);
      }
    })
    //
    it('test_setRoles',0, () => {
      let userArr:string[]=[(userName as string)];
      let str = ""
      for (let i = 0;i < userArr.length; i++) {
        str = str.concat(userArr[i])
        if (i != userArr.length - 1)
          str = str.concat(",")
      }
      let setRolesResult= Smack.setRoles(str, MUCRoomRole.RoleParticipant, "RoleParticipant");
      if(setRolesResult == undefined){
        expect(setRolesResult).assertUndefined();
      }else{
        expect(setRolesResult).assertContain(userName);
      }
    })

    it('test_grantVoices_members',0, () => {
      let userArr:string[]=[userName as string];
      let str = ""
      for (let i = 0;i < userArr.length; i++) {
        str = str.concat(userArr[i])
        if (i != userArr.length - 1)
          str = str.concat(",")
      }
      let grantVoicesResult= Smack.grantVoices(str, "grantVoices");
      if(grantVoicesResult == undefined){
        expect(grantVoicesResult).assertUndefined();
      }else{
        expect(grantVoicesResult).assertEqual(0);
      }
    })

    it('test_revokeVoices_members',0, () => {
      let userArr:string[]=[userName as string];
      let str = ""
      for (let i = 0;i < userArr.length; i++) {
        str = str.concat(userArr[i])
        if (i != userArr.length - 1)
          str = str.concat(",")
      }
      let revokeVoicesResult=  Smack.revokeVoices(str, "revokeVoices");
      if(revokeVoicesResult == undefined){
        expect(revokeVoicesResult).assertUndefined();
      }else{
        expect(revokeVoicesResult).assertEqual(0);
      }
    })

    it('test_setAffiliations_members',0, () => {
      let user=userName+",admin"
      let setAffiliationsResult=  Smack.setAffiliations(user, MUCRoomAffiliation.AffiliationOwner, "AffiliationOwner");
      if(setAffiliationsResult == undefined){
        expect(setAffiliationsResult).assertUndefined();
      }else{
        expect(setAffiliationsResult).assertContain(userName);
      }
    })

    it('test_receiveFriendsGroup',0, () => {
      let username ="testfour@"+Constant.HOST_DOMAIN;
      let receiveFriendsResult=  Smack.receiveFriends(username, "group", "receive request");
      if(receiveFriendsResult == undefined){
        expect(receiveFriendsResult).assertUndefined();
      }else{
        expect(receiveFriendsResult).assertContain(username);
      }
    })

    it('test_receiveFriendsNone',0, () => {
      let username ="testfour@"+Constant.HOST_DOMAIN;
      let receiveFriendsResult=  Smack.receiveFriends(username, "", "receive request");
      if(receiveFriendsResult == undefined){
        expect(receiveFriendsResult).assertUndefined();
      }else{
        expect(receiveFriendsResult).assertContain(username);
      }
    })

    it('test_rejectFriends',0, () => {
      let username ="testfour@"+Constant.HOST_DOMAIN;
      let rejectFriendsResult=  Smack.rejectFriends(username, "reject request");
      if(rejectFriendsResult == undefined){
        expect(rejectFriendsResult).assertUndefined();
      }else{
        expect(rejectFriendsResult).assertContain(username);
      }
    })

    it('test_leave_room',0, () => {
      let msg_leave ="leave msg";
      let leaveRoomResult= Smack.leave(msg_leave);
      if(leaveRoomResult == undefined){
        expect(leaveRoomResult).assertUndefined();
      }else{
        expect(leaveRoomResult).assertContain(msg_leave);
      }
    })

    it('test_login_out',0, () => {
      Smack.loginout();
      let isConnect:boolean =Smack.isConnected();
      hilog.info(0x0000, 'testTag', '%{public}s', "is connect : " +isConnect );
      expect(isConnect).assertFalse;
    })

  })

}