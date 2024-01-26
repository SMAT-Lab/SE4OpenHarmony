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

export const send: (jidToStr: string, msg: string) => string;

export const registers: (ip: string, name: string, pwd: string) => number;

export const changpwd: (pwd: string) => string;

export const createGroup: (group: string) => string;

export const addFriends: (jidStr: string, username: string, group: string) => string;

export const delfriend: (jidStr: String) => string;

export const getFriendList: () => string;

export const changePresence: (jidStr: String, status: string) => string;

export const login: (jidStr: string, pwd: string) => number;

export const loginout: () => number;

export const unregister: () => number;

export const changeFriendGroup: (jidStr: string, group: string) => number;

export const changeGroup: (oldGroup: string, newGroup: string) => number;


export const registerMessageCallback: (register: any) => number;
export const register_message: (status: boolean, register: any) => number;
/**
 * jid: 当前登录用户id标识, roomStr: 房间名称, domain: 标识符, serviceName: 不知道
 */
export const createRoom: (jid: string, roomStr: string, domain: string, serviceName: string) => number;
/**
 * name: 离开原因
 */
export const leave: (name: string) => number;
/**
 * name: 消息内容
 */
export const sendGroupMessage: (name: string) => number;
/**
 * name：主题名称
 */
export const setSubject: (name: string) => number;
/**
 *
 */
export const join: () => number;
/**
 * jid：当前登录人的id标识  password：登录密码
 */
export const destroy: (jid: string, password: string) => number;
/**
 * nick：被提出人的昵称  reason：原因
 */
export const kick: (nick: string, reason: string) => number;
/**
 * nick：被拉黑人的昵称  reason：原因
 */
export const ban: (nick: string, reason: string) => number;
/**
 * nick：被拉黑人的昵称  reason：原因
 */
export const bans: (nick: string, reason: string) => number;
/**
 * 房间游客请求发言
 */
export const requestVoice: () => void;
/**
 * nick:被授予发言权的人的昵称  reason：原因
 */
export const grantVoice: (nick: string, reason: string) => number;

export const grantVoices: (nick: string, reason: string) => number;
/**
 * nick:被撤销发言权的人的昵称  reason：原因
 */
export const revokeVoice: (nick: string, reason: string) => number;

export const revokeVoices: (nick: string, reason: string) => number;

/**
 * status:狀態  register：註冊回調
 */
export const registerMessageGroup: (status: boolean, register: any) => number;
export const registerGroupMessageCallback: (register: any) => number;
/**
 * 获取在房间中的从属关系
 */
export const getAffiliation: () => string;
/**
 * 获取在房间中的角色
 */
export const getRole: () => string;
/**
 * nick:暱稱   affiliation:狀態   reason:原因
 */
export const setAffiliation: (nick: string, affiliation: string, reason: string) => number;
/**
 * nick:暱稱   role:狀態   reason:原因
 */
export const setRole: (nick: string, role: string, reason: string) => number;

export const setRoles: (nick: string, role: string, reason: string) => number;
/**
 * presence:狀態   msg:原因
 */
export const setPresence: (presence: string, msg: string) => number;
/**
 * presence:狀態   msg:原因
 */
export const invite: (jid: string, reason: string) => number;
/**
 *
 */
export const requestRoomConfig: () => string;
/**
 *
 */
export const getRoomItems: () => string;
/**
 *  operation：参数筛选
 */
export const requestList: (operation: string) => string;
/**
 *  room：邀请加入的房间号  invitor：邀请人的jid    reason：拒绝原因
 */
export const declineInvitation: (room: string, invitor: string, reason: string) => string;
/**
 *  status:狀態  register：註冊回調
 */
export const registerInvitationListener: ( register: any) => number;
/**
 *
 */
export const getRoomInfo: () => string;
/**
 * room：房间名   domain：    serviceName：     password：房间密码
 */
export const createOrJoinRoom: (room: string, domain: string, serviceName: string, password?: string) => number;
/**
 * password： 密码
 */
export const setPassword: (password: string) => number;
/**
 *  config：配置项
 */
export const setRoomConfig: (config: string) => number;
/**
 * name：昵称
 */
export const setNick: (name: string) => number;
/**
 *
 */
export const isJoined: () => string;
/**
 *
 */
export const nick: () => string;
/**
 * status:狀態  register：註冊回調
 */
export const registerMUCParticipantPresenceListener: (status: boolean, register: any) => number;

export const registerMUCParticipantPresenceListener2: (register: any) => number;

/**
 * retrun: number is  0 表示没有连接 1表示连接
 */
export const isConnected: () => number;

export const username: () => string;

export const connect: () => number;

export const setServer: (name: string) => string;

export const setUsernameAndPassword: (username: string, password: string) => number;

export const setPort: (port: number) => number;

export const password: () => string;

export const resource: () => string;

export const setResource: (resource: string) => string;

export const onLogin: () => number;

export const server: () => string;

export const authed: () => number;

export const port: () => number;

export const compression: () => number;

export const setAffiliations: (nick: string, affiliationStr: string, reason: string) => string;

export const handleSubscriptionRequestListener: (register: any) => string;

export const receiveFriends: (jidStr: string, groupName: string, msg: string) => string;

export const rejectFriends: (jidStr: string, reason: string) => string;
// 房间销毁监听回调
export const registerNonrosterPresenceCallback: (register: any) => number;

//取消消息接收监听
export const unregisterMessageCallback: () => number;
//
export const unregisterGroupMessageCallback: () => number;
//
export const unregisterInvitationListener: () => number;
//取消
export const unregisterMUCParticipantPresenceListener: () => number;
//取消订阅监听
export const unSubscriptionRequestListener: () => number;
//取消房间销毁监听
export const unregisterNonrosterPresenceCallback: () => number;

