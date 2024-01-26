interface TextDialog_Params {
    controller?: CustomDialogController;
    newGroup?: string;
}
interface One_chat_setting_Params {
    textDialog?: CustomDialogController;
    userName?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "one_chat_setting_" + ++__generate__Id;
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
import prompt from '@ohos.prompt';
import { Constant } from '../../../entity/Constant';
import router from '@ohos.router';
import { Smack } from '@ohos/smack';
import { GlobalContext } from '../../../entity/GlobalContext';
class One_chat_setting extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.textDialog = new CustomDialogController({
            builder: () => {
                let jsDialog = new TextDialog("3", this, {});
                jsDialog.setController(this.textDialog);
                View.create(jsDialog);
            },
            customStyle: true,
            alignment: DialogAlignment.Center
        }, this);
        this.__userName = new ObservedPropertySimple('', this, "userName");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: One_chat_setting_Params) {
        if (params.textDialog !== undefined) {
            this.textDialog = params.textDialog;
        }
        if (params.userName !== undefined) {
            this.userName = params.userName;
        }
    }
    aboutToBeDeleted() {
        this.__userName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private textDialog: CustomDialogController;
    private __userName: ObservedPropertySimple<string>;
    get userName() {
        return this.__userName.get();
    }
    set userName(newValue: string) {
        this.__userName.set(newValue);
    }
    aboutToAppear() {
        this.userName = (router.getParams() as Record<string, Object>)['userName'] as string;
    }
    RandomStr(length: number, firstToUpper?: boolean) {
        let str = "";
        for (let i = 0; i < length; i++) {
            if (firstToUpper && i == 1) {
                str += String.fromCharCode(this.RangeInteger(97, 123)).toUpperCase();
            }
            str += String.fromCharCode(this.RangeInteger(97, 123));
        }
        return str;
    }
    RangeInteger(min: number, max: number): number {
        const range = max - min;
        const value = Math.floor(Math.random() * range) + min;
        return value;
    }
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Flex.width('100%');
        Flex.backgroundColor('#ececec');
        let earlierCreatedChild_2: Toolbar = (this && this.findChildById) ? this.findChildById("2") as Toolbar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Toolbar("2", this, {
                isBack: true,
                title: '好友设置',
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                isBack: true,
                title: '好友设置'
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Text.create('更改好友分组');
        Text.padding(15);
        Text.backgroundColor('#ffffff');
        Text.fontSize(18);
        Text.onClick(e => {
            this.textDialog.open();
        });
        Text.pop();
        Line.create();
        Line.width('100%');
        Line.height(1);
        Line.backgroundColor('#ececec');
        Line.margin({ left: 20 });
        Text.create('邀请到会议');
        Text.padding(15);
        Text.fontSize(18);
        Text.backgroundColor('#ffffff');
        Text.onClick(e => {
            let roomName: string = Smack.username() + this.RandomStr(3);
            Smack.createOrJoinRoom(roomName, Constant.HOST_DOMAIN, Constant.SERVICE_NAME /*, password?: string*/);
            setTimeout(() => {
                let isJoined = Smack.isJoined();
                if (isJoined == '1') {
                    Smack.invite(this.userName + "@" + Constant.HOST_DOMAIN + Constant.HOST_RES, "invite");
                    router.back();
                    router.replace({
                        url: 'pages/chat/group_chat/group_chat_main'
                    });
                }
                else {
                    prompt.showToast({
                        message: '创建房间失败'
                    });
                }
            }, 800);
        });
        Text.pop();
        Line.create();
        Line.width('100%');
        Line.height(1);
        Line.backgroundColor('#ececec');
        Line.margin({ left: 20 });
        Column.create();
        Column.width('100%');
        Button.createWithLabel('删 除 好 友');
        Button.height(40);
        Button.fontSize(15);
        Button.width('50%');
        Button.backgroundColor('red');
        Button.margin({ top: 30 });
        Button.onClick(e => {
            this.onDeleteFriend();
        });
        Button.pop();
        Column.pop();
        Flex.pop();
    }
    // todo 删除好友
    onDeleteFriend() {
        Smack.delfriend(this.userName + "@" + Constant.HOST_DOMAIN);
        prompt.showToast({
            message: '删除完成'
        });
        router.clear();
        router.replace({
            url: 'pages/main'
        });
    }
}
class TextDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = {} as CustomDialogController;
        this.__newGroup = new ObservedPropertySimple('', this, "newGroup");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TextDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.newGroup !== undefined) {
            this.newGroup = params.newGroup;
        }
    }
    aboutToBeDeleted() {
        this.__newGroup.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private __newGroup: ObservedPropertySimple<string>;
    get newGroup() {
        return this.__newGroup.get();
    }
    set newGroup(newValue: string) {
        this.__newGroup.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Flex.width('90%');
        Flex.backgroundColor('#ffffff');
        Flex.height(px2vp(330));
        Flex.padding(px2vp(20));
        Flex.borderRadius(10);
        Text.create('请输入新的分组名称');
        Text.fontSize(px2vp(30));
        Text.margin({ top: 10 });
        Text.pop();
        TextInput.create();
        TextInput.margin({ bottom: 20, top: 10 });
        TextInput.height(px2vp(80));
        TextInput.fontSize(px2fp(30));
        TextInput.onChange(v => {
            this.newGroup = v;
        });
        Button.createWithLabel('修 改');
        Button.height(px2vp(80));
        Button.fontSize(px2fp(30));
        Button.onClick(e => {
            this.onChangeFriendsGroup();
            this.controller.close();
        });
        Button.pop();
        Flex.pop();
    }
    // todo 修改好友分组信息
    onChangeFriendsGroup() {
        if (this.newGroup == '') {
            prompt.showToast({
                message: '请输入完整'
            });
        }
        else {
            let name: string = (router.getParams() as Record<string, Object>)['userName'] as string;
            Smack.changeFriendGroup(name + "@" + Constant.HOST_DOMAIN, this.newGroup);
            prompt.showToast({
                message: '更改完成'
            });
        }
    }
}
loadDocument(new One_chat_setting("1", undefined, {}));
