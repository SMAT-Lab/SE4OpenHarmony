interface Group_chat_main_Params {
    chatContentList?: Array<ChatContentEntity>;
    inputMessage?: string;
    roomName?: string;
    isJoin?: number;
    userName?: string;
    role?: string;
    affiliation?: string;
    voiceList?: Array<string>;
    ownerList?: Array<string>;
    leaveFlag?: boolean;
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "group_chat_main_" + ++__generate__Id;
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
import { Toolbar } from '../../base/toolbar';
import router from '@ohos.router';
import { ChatContentEntity } from '../../../entity/ChatContentEntity';
import { MUCOperation, RoomConfig, Smack } from '@ohos/smack';
import { GlobalContext } from '../../../entity/GlobalContext';
import prompt from '@ohos.prompt';
import { Constant } from '../../../entity/Constant';
class Group_chat_main extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__chatContentList = new ObservedPropertyObject([], this, "chatContentList");
        this.__inputMessage = new ObservedPropertySimple('', this, "inputMessage");
        this.__roomName = new ObservedPropertySimple('', this, "roomName");
        this.__isJoin = new ObservedPropertySimple(0 //0-false,1-true
        , this, "isJoin");
        this.userName = '';
        this.role = '';
        this.affiliation = '';
        this.voiceList = [];
        this.ownerList = [];
        this.leaveFlag = false;
        this.__message = new ObservedPropertySimple('请把我加入会议中'
        //获取房间配置信息
        , this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Group_chat_main_Params) {
        if (params.chatContentList !== undefined) {
            this.chatContentList = params.chatContentList;
        }
        if (params.inputMessage !== undefined) {
            this.inputMessage = params.inputMessage;
        }
        if (params.roomName !== undefined) {
            this.roomName = params.roomName;
        }
        if (params.isJoin !== undefined) {
            this.isJoin = params.isJoin;
        }
        if (params.userName !== undefined) {
            this.userName = params.userName;
        }
        if (params.role !== undefined) {
            this.role = params.role;
        }
        if (params.affiliation !== undefined) {
            this.affiliation = params.affiliation;
        }
        if (params.voiceList !== undefined) {
            this.voiceList = params.voiceList;
        }
        if (params.ownerList !== undefined) {
            this.ownerList = params.ownerList;
        }
        if (params.leaveFlag !== undefined) {
            this.leaveFlag = params.leaveFlag;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        this.__chatContentList.aboutToBeDeleted();
        this.__inputMessage.aboutToBeDeleted();
        this.__roomName.aboutToBeDeleted();
        this.__isJoin.aboutToBeDeleted();
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __chatContentList: ObservedPropertyObject<Array<ChatContentEntity>>;
    get chatContentList() {
        return this.__chatContentList.get();
    }
    set chatContentList(newValue: Array<ChatContentEntity>) {
        this.__chatContentList.set(newValue);
    }
    private __inputMessage: ObservedPropertySimple<string>;
    get inputMessage() {
        return this.__inputMessage.get();
    }
    set inputMessage(newValue: string) {
        this.__inputMessage.set(newValue);
    }
    private __roomName: ObservedPropertySimple<string>;
    get roomName() {
        return this.__roomName.get();
    }
    set roomName(newValue: string) {
        this.__roomName.set(newValue);
    }
    private __isJoin: ObservedPropertySimple<number>; //0-false,1-true
    get isJoin() {
        return this.__isJoin.get();
    }
    set isJoin(newValue: number) {
        this.__isJoin.set(newValue);
    }
    private userName: string;
    private role: string;
    private affiliation: string;
    private voiceList: Array<string>; //群可发言列表
    private ownerList: Array<string>;
    private leaveFlag: boolean; //离开标志
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    //获取房间配置信息
    private setPublicRoom() {
        let roomInfo = Smack.getRoomConfig();
        let roomConfig = JSON.parse(roomInfo) as RoomConfig;
        roomConfig.publicroom = '1';
        roomConfig.persistentroom = '0';
        roomConfig.moderatedroom = '0';
        roomConfig.membersonly = '0';
        roomConfig.allowinvites = '1';
        Smack.setRoomConfig(JSON.stringify(roomConfig));
    }
    //是否是拥有者
    isOwner(): boolean {
        if (this.ownerList && this.ownerList.length > 0) {
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
        this.ownerList = [];
        let roomitems = Smack.requestList(MUCOperation.RequestOwnerList);
        if (roomitems) {
            let items: Array<any> = JSON.parse(roomitems);
            for (let index = 0; index < items.length; index++) {
                let str: string = items[index].jid.replace(" ", "");
                this.ownerList.push(str);
            }
        }
    }
    // 获取可发言列表，用于排查游客
    getVoiceList() {
        this.voiceList = [];
        let roomitems = Smack.requestList(MUCOperation.RequestVoiceList);
        if (roomitems) {
            let items: Array<any> = JSON.parse(roomitems);
            for (let index = 0; index < items.length; index++) {
                let str: string = items[index].jid.replace(" ", "");
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
        let that = this;
        Smack.registerInvitationListener((v0: string) => {
            let info: any = JSON.parse(v0);
            let reason: string = info.reason;
            if (reason && reason == "invite") { // 接受邀请
            }
            else if (reason == "room inviation refuesd") { // 拒绝邀请
                prompt.showToast({
                    message: '对方拒绝邀请'
                });
            }
        });
        Smack.registerMessageCallback2((id, msg, type) => {
            let id_name = id.toString().split("/")[1];
            let id_msg = msg.toString().trim();
            if (id_msg !== "" && type == '4') {
                setTimeout(() => {
                    if (id_name == this.userName) {
                        id_name = '1';
                    }
                    this.chatContentList.push(new ChatContentEntity(id_name, id_msg));
                }, 100);
            }
        });
        Smack.registerNonrosterPresenceCallback((from: string, to: string, presence: string) => {
            let room = from.split("@")[0];
            let user = from.split("/")[1];
            if (room == this.roomName && user == this.userName && presence == '5' && !this.leaveFlag) {
                Smack.leave("leave");
                prompt.showToast({
                    message: '房间被销毁'
                });
                router.clear();
                router.push({
                    url: 'pages/main'
                });
            }
        });
        Smack.registerMUCParticipantPresenceListener((name: string, jsonStr: string) => {
            let obj: any = JSON.parse(jsonStr);
            setTimeout(() => {
                switch (obj.flags) {
                    case '1':
                        this.chatContentList.push(new ChatContentEntity(name, name + "操作成功", 1, true));
                        break;
                    case '2':
                        this.chatContentList.push(new ChatContentEntity(name, name + "修改了昵称", 1, true));
                        break;
                    case '3':
                        this.chatContentList.push(new ChatContentEntity(name, name + "被踢出了群聊", 1, true));
                        break;
                    case '4':
                        this.chatContentList.push(new ChatContentEntity(name, name + "被群聊屏蔽了", 1, true));
                        break;
                }
            }, 100);
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
        });
        let result = Smack.parseXML();
        GlobalContext.getContext().setValue('roomInfo', result);
        let roominfo: any = JSON.parse(result);
        this.roomName = roominfo.description;
        try {
            this.onGetAllOwnerList();
            if (this.isOwner()) {
                this.setPublicRoom();
            }
        }
        catch (e) {
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
        }
        catch (e) {
            console.error('test group aboutToDisappear err:' + e.message);
        }
    }
    requestVoice() {
        this.role = Smack.getRole();
        this.affiliation = Smack.getAffiliation();
        Smack.requestVoice();
    }
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('100%');
        Flex.backgroundColor('#ececec');
        let earlierCreatedChild_2: Toolbar = (this && this.findChildById) ? this.findChildById("2") as Toolbar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Toolbar("2", this, {
                title: this.roomName,
                isBack: true,
                rightIcon: $r('app.media.more'),
                rightClickCallBack: () => {
                    router.push({
                        url: "pages/chat/group_chat/group_chat_setting"
                    });
                }
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: this.roomName,
                isBack: true,
                rightIcon: $r('app.media.more'),
                rightClickCallBack: () => {
                    router.push({
                        url: "pages/chat/group_chat/group_chat_setting"
                    });
                }
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Stack.create({ alignContent: Alignment.Bottom });
        List.create();
        List.padding({ bottom: 130 });
        List.height('100%');
        ForEach.create("3", this, ObservedObject.GetRawObject(this.chatContentList), (item: ChatContentEntity) => {
            ListItem.create();
            ListItem.padding(10);
            Flex.create({ direction: FlexDirection.Column });
            If.create();
            if (item.isTip) {
                If.branchId(0);
                Column.create();
                Column.width('100%');
                Text.create(item.message);
                Text.fontSize(13);
                Text.textAlign(TextAlign.Center);
                Text.backgroundColor('#ffe2e2e2');
                Text.padding({ left: 10, right: 10, top: 5, bottom: 5 });
                Text.borderRadius(10);
                Text.pop();
                Column.pop();
            }
            else {
                If.branchId(1);
                Flex.create({ justifyContent: item.author == '1' ? FlexAlign.End : FlexAlign.Start });
                Flex.create({ direction: FlexDirection.Column });
                Text.create(item.author == '1' ? '我' : item.author);
                Text.fontSize(15);
                Text.padding(5);
                Text.alignSelf(item.author == '1' ? ItemAlign.End : ItemAlign.Start);
                Text.pop();
                If.create();
                if (item.messageType == 1) {
                    If.branchId(0);
                    Text.create(item.message);
                    Text.backgroundColor(item.author != '1' ? '#ffffff' : '#95ec69');
                    Text.padding({ left: 15, top: 10, right: 15, bottom: 10 });
                    Text.alignSelf(ItemAlign.End);
                    Text.fontSize(18);
                    Text.borderRadius(10);
                    Text.pop();
                }
                else if (item.messageType == 2) {
                    If.branchId(1);
                    Image.create(item.message);
                    Image.objectFit(ImageFit.Cover);
                    Image.width('50%');
                }
                If.pop();
                Flex.pop();
                Flex.pop();
            }
            If.pop();
            Flex.pop();
            ListItem.pop();
        }, (item: ChatContentEntity) => JSON.stringify(item));
        ForEach.pop();
        List.pop();
        Flex.create({ direction: FlexDirection.Row, justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
        Flex.height(px2vp(120));
        Flex.width('100%');
        Flex.padding({ left: 15, right: 15 });
        Flex.backgroundColor('#ffffff');
        TextInput.create({ placeholder: '请输入', text: this.inputMessage });
        TextInput.onChange(v => {
            this.inputMessage = v;
        });
        Button.createWithLabel('发 送');
        Button.width(100);
        Button.margin({ left: 8 });
        Button.onClick(e => {
            this.onSendGroupMessage();
        });
        Button.pop();
        Flex.pop();
        Stack.pop();
        Flex.pop();
    }
    // todo 发送群聊信息
    onSendGroupMessage() {
        Smack.sendGroupMessage(this.inputMessage);
        this.inputMessage = '';
    }
}
loadDocument(new Group_chat_main("1", undefined, {}));
