interface BeInvitedDialog_Params {
    controller?: CustomDialogController;
    user?: string;
    Message?: string;
    accept?: () => void;
    refuse?: () => void;
}
interface One_chat_main_Params {
    chatContentList?: Array<ChatContentEntity>;
    userName?: string;
    inputMessage?: string;
    message?: string;
    beInviteDialog?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "one_chat_main_" + ++__generate__Id;
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
import { Constant } from '../../../entity/Constant';
import { MUCRoomAffiliation, MUCRoomRole, Smack } from '@ohos/smack';
import { GlobalContext } from '../../../entity/GlobalContext';
import prompt from '@ohos.prompt';
let jid: string = '';
let service: string = '';
let domain: string = '';
let users: string = '';
let roomName: string = '';
let vInfo: string = '';
let vPassword: string = '';
class One_chat_main extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__chatContentList = new ObservedPropertyObject([], this, "chatContentList");
        this.userName = '';
        this.__inputMessage = new ObservedPropertySimple('', this, "inputMessage");
        this.__message = new ObservedPropertySimple('请把我加入会议中', this, "message");
        this.beInviteDialog = new CustomDialogController({
            builder: () => {
                let jsDialog = new BeInvitedDialog("4", this, { user: users,
                    Message: this.message, accept: () => {
                        Smack.createOrJoinRoom(roomName, Constant.HOST_DOMAIN, Constant.SERVICE_NAME, vPassword);
                        setTimeout(() => {
                            let isJoined = Smack.isJoined();
                            if (isJoined == '1') {
                                router.replace({
                                    url: 'pages/chat/group_chat/group_chat_main',
                                    params: { roomData: roomName }
                                });
                            }
                            else {
                                prompt.showToast({
                                    message: '进入房间失败'
                                });
                            }
                        }, 1000);
                    }, refuse: () => {
                        Smack.declineInvitation(vInfo, users, "room inviation refuesd");
                    } });
                jsDialog.setController(this.beInviteDialog);
                View.create(jsDialog);
            },
            customStyle: true,
            autoCancel: false,
            alignment: DialogAlignment.Center
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: One_chat_main_Params) {
        if (params.chatContentList !== undefined) {
            this.chatContentList = params.chatContentList;
        }
        if (params.userName !== undefined) {
            this.userName = params.userName;
        }
        if (params.inputMessage !== undefined) {
            this.inputMessage = params.inputMessage;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.beInviteDialog !== undefined) {
            this.beInviteDialog = params.beInviteDialog;
        }
    }
    aboutToBeDeleted() {
        this.__chatContentList.aboutToBeDeleted();
        this.__inputMessage.aboutToBeDeleted();
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
    private userName: string;
    private __inputMessage: ObservedPropertySimple<string>;
    get inputMessage() {
        return this.__inputMessage.get();
    }
    set inputMessage(newValue: string) {
        this.__inputMessage.set(newValue);
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private beInviteDialog: CustomDialogController;
    aboutToAppear() {
        console.log('解析参数');
        this.userName = (router.getParams() as Record<string, Object>)['userName'] as string;
        let that = this;
        Smack.registerInvitationListener((v0: string) => {
            let info: any = JSON.parse(v0);
            let reason: string = info.reason;
            if (reason && reason == "invite") { // 接受邀请
                roomName = info.room.substring(0, info.room.indexOf("@"));
                service = info.room.substring(info.room.indexOf("@") + 1, info.room.indexOf("."));
                domain = info.room.substring(info.room.indexOf(".") + 1, info.room.length);
                jid = GlobalContext.getContext().getValue('userName') as string;
                users = info.from;
                vInfo = info.room;
                vPassword = info.password;
                setTimeout(() => {
                    that.beInviteDialog.open();
                }, 500);
            }
            else if (reason == "room inviation refuesd") { // 拒绝邀请
                prompt.showToast({
                    message: '对方拒绝邀请'
                });
            }
        });
        Smack.registerMessageCallback2((id, msg, type) => {
            let id_name = id.toString().split("@")[0];
            let id_msg = msg.toString().trim();
            if (id_name == this.userName && id_msg !== "" && type == "1") {
                setTimeout(() => {
                    this.chatContentList.push(new ChatContentEntity(id_name, id_msg));
                }, 100);
            }
        });
    }
    aboutToDisappear() {
        Smack.unregisterInvitationListener();
        Smack.unregisterMessageCallback();
    }
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('100%');
        Flex.backgroundColor('#ececec');
        let earlierCreatedChild_2: Toolbar = (this && this.findChildById) ? this.findChildById("2") as Toolbar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Toolbar("2", this, {
                title: this.userName,
                isBack: true,
                rightIcon: $r('app.media.more'),
                rightClickCallBack: () => {
                    router.push({
                        url: "pages/chat/one_chat/one_chat_setting",
                        params: {
                            userName: this.userName
                        }
                    });
                }
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: this.userName,
                isBack: true,
                rightIcon: $r('app.media.more'),
                rightClickCallBack: () => {
                    router.push({
                        url: "pages/chat/one_chat/one_chat_setting",
                        params: {
                            userName: this.userName
                        }
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
                Text.fontSize(px2fp(20));
                Text.textAlign(TextAlign.Center);
                Text.backgroundColor('#ffe2e2e2');
                Text.padding({ left: 10, right: 10, top: 5, bottom: 5 });
                Text.borderRadius(10);
                Text.pop();
                Column.pop();
            }
            else {
                If.branchId(1);
                Flex.create({ justifyContent: item.author == '我' ? FlexAlign.End : FlexAlign.Start });
                Flex.create({ direction: FlexDirection.Column });
                Text.create(item.author == '我' ? '我' : item.author);
                Text.fontSize(px2fp(25));
                Text.padding(5);
                Text.alignSelf(item.author == '我' ? ItemAlign.End : ItemAlign.Start);
                Text.pop();
                If.create();
                if (item.messageType == 1) {
                    If.branchId(0);
                    Text.create(item.message);
                    Text.backgroundColor(item.author != '我' ? '#ffffff' : '#95ec69');
                    Text.padding({ left: 15, top: 10, right: 15, bottom: 10 });
                    Text.alignSelf(ItemAlign.End);
                    Text.fontSize(px2fp(30));
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
        TextInput.height(px2vp(90));
        TextInput.padding({ left: 10 });
        TextInput.fontSize(px2fp(25));
        TextInput.onChange(v => {
            this.inputMessage = v;
        });
        TextInput.placeholderFont({ size: px2fp(25) });
        Button.createWithLabel('发 送');
        Button.width(150);
        Button.margin({ left: 8 });
        Button.height(px2vp(80));
        Button.fontSize(px2fp(25));
        Button.onClick(e => {
            this.onSendSingleMessage();
        });
        Button.pop();
        Flex.pop();
        Stack.pop();
        Flex.pop();
    }
    // todo 发送单聊信息
    onSendSingleMessage() {
        if (this.inputMessage !== '') {
            Smack.send(this.userName + "@" + Constant.HOST_DOMAIN, this.inputMessage);
            this.chatContentList.push(new ChatContentEntity('我', this.inputMessage));
            this.inputMessage = '';
        }
    }
}
class BeInvitedDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = {} as CustomDialogController;
        this.user = '';
        this.Message = '';
        this.accept = () => { };
        this.refuse = () => { };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BeInvitedDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.user !== undefined) {
            this.user = params.user;
        }
        if (params.Message !== undefined) {
            this.Message = params.Message;
        }
        if (params.accept !== undefined) {
            this.accept = params.accept;
        }
        if (params.refuse !== undefined) {
            this.refuse = params.refuse;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private user: string;
    private Message: string;
    private accept: () => void;
    private refuse: () => void;
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Flex.padding(20);
        Flex.height(180);
        Flex.backgroundColor('#ffffff');
        Flex.borderRadius(10);
        Flex.width('80%');
        Text.create($r('app.string.invite_str', this.user));
        Text.fontSize(20);
        Text.padding(5);
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Text.create('Message:' + this.Message);
        Text.height(40);
        Text.fontSize(16);
        Text.padding(5);
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Row.create();
        Row.width('100%');
        Row.margin({ top: 30 });
        Text.create("(A)接受");
        Text.fontColor(Color.Green);
        Text.fontSize(16);
        Text.onClick(v => {
            this.accept();
            this.controller.close();
        });
        Text.textAlign(TextAlign.Center);
        Text.layoutWeight(1);
        Text.pop();
        Text.create("拒绝");
        Text.fontColor(Color.Red);
        Text.fontSize(16);
        Text.onClick(v => {
            this.refuse();
            this.controller.close();
        });
        Text.textAlign(TextAlign.Center);
        Text.layoutWeight(1);
        Text.pop();
        Row.pop();
        Flex.pop();
    }
}
loadDocument(new One_chat_main("1", undefined, {}));
