interface AddFriendsDialog_Params {
    controller?: CustomDialogController;
    bare?: string;
    user?: string;
    Message?: string;
    groupName?: string;
    accept?: () => void;
    refuse?: () => void;
}
interface Main_Params {
    message?: string;
    mbare?: string;
    musername?: string;
    mmsg?: string;
    addFriendsDialog?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "main_" + ++__generate__Id;
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
import { Friends_list } from './tabs/friends/friends_list';
import { Group_list } from './tabs/group/group_list';
import { Meeting_list } from './tabs/meeting/meeting_list';
import { Setting } from './tabs/setting';
import { Constant } from '../entity/Constant';
import { Smack } from '@ohos/smack';
import prompt from '@ohos.prompt';
class Main extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__mbare = new ObservedPropertySimple("", this, "mbare");
        this.__musername = new ObservedPropertySimple("", this, "musername");
        this.__mmsg = new ObservedPropertySimple("", this, "mmsg");
        this.addFriendsDialog = new CustomDialogController({
            builder: () => {
                let jsDialog = new AddFriendsDialog("5", this, {
                    bare: this.__mbare,
                    user: this.__musername,
                    Message: this.__mmsg,
                });
                jsDialog.setController(this.addFriendsDialog);
                View.create(jsDialog);
            },
            customStyle: true,
            autoCancel: false,
            alignment: DialogAlignment.Center
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Main_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.mbare !== undefined) {
            this.mbare = params.mbare;
        }
        if (params.musername !== undefined) {
            this.musername = params.musername;
        }
        if (params.mmsg !== undefined) {
            this.mmsg = params.mmsg;
        }
        if (params.addFriendsDialog !== undefined) {
            this.addFriendsDialog = params.addFriendsDialog;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__mbare.aboutToBeDeleted();
        this.__musername.aboutToBeDeleted();
        this.__mmsg.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __mbare: ObservedPropertySimple<string>;
    get mbare() {
        return this.__mbare.get();
    }
    set mbare(newValue: string) {
        this.__mbare.set(newValue);
    }
    private __musername: ObservedPropertySimple<string>;
    get musername() {
        return this.__musername.get();
    }
    set musername(newValue: string) {
        this.__musername.set(newValue);
    }
    private __mmsg: ObservedPropertySimple<string>;
    get mmsg() {
        return this.__mmsg.get();
    }
    set mmsg(newValue: string) {
        this.__mmsg.set(newValue);
    }
    private addFriendsDialog: CustomDialogController;
    aboutToAppear() {
        Smack.handleSubscriptionRequestListener((json: any) => {
            console.info("收到好友添加申请" + json);
            setTimeout(() => {
                let obj: any = JSON.parse(json);
                this.mbare = obj.jid;
                this.musername = obj.name;
                this.mmsg = obj.msg;
                if (obj.msg == '') {
                    this.addFriendsDialog.open();
                }
            }, 500);
        });
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Tabs.create({ barPosition: BarPosition.End });
        TabContent.create();
        TabContent.tabBar('好友');
        let earlierCreatedChild_2: Friends_list = (this && this.findChildById) ? this.findChildById("2") as Friends_list : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Friends_list("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar('群聊');
        let earlierCreatedChild_3: Group_list = (this && this.findChildById) ? this.findChildById("3") as Group_list : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new Group_list("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        TabContent.pop();
        //          TabContent() {
        //            Meeting_list()
        //          }
        //          .tabBar('会议')
        TabContent.create();
        //          TabContent() {
        //            Meeting_list()
        //          }
        //          .tabBar('会议')
        TabContent.tabBar('设置');
        let earlierCreatedChild_4: Setting = (this && this.findChildById) ? this.findChildById("4") as Setting : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new Setting("4", this, {}));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({});
            View.create(earlierCreatedChild_4);
        }
        //          TabContent() {
        //            Meeting_list()
        //          }
        //          .tabBar('会议')
        TabContent.pop();
        Tabs.pop();
        Column.pop();
        Row.pop();
    }
}
class AddFriendsDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = {} as CustomDialogController;
        this.__bare = new SynchedPropertySimpleTwoWay(params.bare, this, "bare");
        this.__user = new SynchedPropertySimpleTwoWay(params.user, this, "user");
        this.__Message = new SynchedPropertySimpleTwoWay(params.Message, this, "Message");
        this.__groupName = new ObservedPropertySimple("", this, "groupName");
        this.accept = () => { };
        this.refuse = () => { };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AddFriendsDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.groupName !== undefined) {
            this.groupName = params.groupName;
        }
        if (params.accept !== undefined) {
            this.accept = params.accept;
        }
        if (params.refuse !== undefined) {
            this.refuse = params.refuse;
        }
    }
    aboutToBeDeleted() {
        this.__bare.aboutToBeDeleted();
        this.__user.aboutToBeDeleted();
        this.__Message.aboutToBeDeleted();
        this.__groupName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private __bare: SynchedPropertySimpleTwoWay<string>;
    get bare() {
        return this.__bare.get();
    }
    set bare(newValue: string) {
        this.__bare.set(newValue);
    }
    private __user: SynchedPropertySimpleTwoWay<string>;
    get user() {
        return this.__user.get();
    }
    set user(newValue: string) {
        this.__user.set(newValue);
    }
    private __Message: SynchedPropertySimpleTwoWay<string>;
    get Message() {
        return this.__Message.get();
    }
    set Message(newValue: string) {
        this.__Message.set(newValue);
    }
    private __groupName: ObservedPropertySimple<string>;
    get groupName() {
        return this.__groupName.get();
    }
    set groupName(newValue: string) {
        this.__groupName.set(newValue);
    }
    private accept: () => void;
    private refuse: () => void;
    render() {
        Column.create();
        Column.padding(px2vp(10));
        Column.backgroundColor('#ffffff');
        Column.borderRadius(10);
        Column.width('80%');
        Text.create($r('app.string.add_friends_str', this.user));
        Text.height(px2vp(40));
        Text.fontSize(px2fp(35));
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: px2vp(20) });
        Text.pop();
        Row.create();
        Row.margin({ top: px2vp(20) });
        Row.padding({ left: px2vp(10), right: px2vp(10) });
        Text.create("昵称:");
        Text.fontSize(px2fp(30));
        Text.width('20%');
        Text.pop();
        TextInput.create({ text: this.user });
        TextInput.fontSize(px2fp(30));
        TextInput.width('70%');
        Row.pop();
        Row.create();
        Row.margin({ top: px2vp(10) });
        Row.padding({ left: px2vp(10), right: px2vp(10) });
        Text.create("分组:");
        Text.fontSize(px2fp(30));
        Text.width('20%');
        Text.pop();
        TextInput.create({ text: this.groupName, placeholder: "请输入好友分组" });
        TextInput.fontSize(px2fp(30));
        TextInput.onChange(v => {
            this.groupName = v;
        });
        TextInput.width('70%');
        Row.pop();
        Row.create();
        Row.margin({ top: px2vp(30), bottom: px2vp(10) });
        Text.create("(A)接受");
        Text.fontColor(Color.Green);
        Text.fontSize(px2fp(40));
        Text.onClick(v => {
            if (this.bare && this.groupName) {
                Smack.receiveFriends(this.bare, this.groupName, "receive request");
                this.controller.close();
            }
            else {
                prompt.showToast({
                    message: '请输入信息'
                });
            }
        });
        Text.textAlign(TextAlign.Center);
        Text.layoutWeight(1);
        Text.pop();
        Text.create("拒绝");
        Text.fontColor(Color.Red);
        Text.fontSize(px2fp(40));
        Text.onClick(v => {
            Smack.rejectFriends(this.bare, "reject request");
            this.controller.close();
        });
        Text.textAlign(TextAlign.Center);
        Text.layoutWeight(1);
        Text.pop();
        Row.pop();
        Column.pop();
    }
}
loadDocument(new Main("1", undefined, {}));
