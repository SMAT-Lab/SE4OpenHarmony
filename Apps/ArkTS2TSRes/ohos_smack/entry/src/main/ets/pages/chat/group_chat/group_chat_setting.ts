interface InviteDialog_Params {
    controller?: CustomDialogController;
    invite?: string;
}
interface UpdateNickDialog_Params {
    controller?: CustomDialogController;
    nickStr?: string;
    nick?: string;
}
interface UpdateThemeDialog_Params {
    controller?: CustomDialogController;
    theme?: string;
}
interface Group_chat_setting_Params {
    name?: string;
    role?: string;
    affiliation?: string;
    ownerList?: Array<string>;
    InviteDialog?: CustomDialogController;
    updateThemeDialog?: CustomDialogController;
    updateNickDialog?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "group_chat_setting_" + ++__generate__Id;
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
import prompt from '@ohos.prompt';
import { ItemText } from '../../base/ItemText';
import { Constant } from '../../../entity/Constant';
import { Smack, MUCOperation } from '@ohos/smack';
import { GlobalContext } from '../../../entity/GlobalContext';
class Group_chat_setting extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__name = new ObservedPropertySimple("", this, "name");
        this.role = '';
        this.affiliation = '';
        this.ownerList = [];
        this.InviteDialog = new CustomDialogController({
            builder: () => {
                let jsDialog = new InviteDialog("6", this, {});
                jsDialog.setController(this.InviteDialog);
                View.create(jsDialog);
            },
            customStyle: true,
            alignment: DialogAlignment.Center
        }, this);
        this.updateThemeDialog = new CustomDialogController({
            builder: () => {
                let jsDialog = new UpdateThemeDialog("7", this, {});
                jsDialog.setController(this.updateThemeDialog);
                View.create(jsDialog);
            },
            customStyle: true,
            alignment: DialogAlignment.Center
        }, this);
        this.updateNickDialog = new CustomDialogController({
            builder: () => {
                let jsDialog = new UpdateNickDialog("8", this, { nick: this.__name });
                jsDialog.setController(this.updateNickDialog);
                View.create(jsDialog);
            },
            customStyle: true,
            alignment: DialogAlignment.Center
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Group_chat_setting_Params) {
        if (params.name !== undefined) {
            this.name = params.name;
        }
        if (params.role !== undefined) {
            this.role = params.role;
        }
        if (params.affiliation !== undefined) {
            this.affiliation = params.affiliation;
        }
        if (params.ownerList !== undefined) {
            this.ownerList = params.ownerList;
        }
        if (params.InviteDialog !== undefined) {
            this.InviteDialog = params.InviteDialog;
        }
        if (params.updateThemeDialog !== undefined) {
            this.updateThemeDialog = params.updateThemeDialog;
        }
        if (params.updateNickDialog !== undefined) {
            this.updateNickDialog = params.updateNickDialog;
        }
    }
    aboutToBeDeleted() {
        this.__name.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __name: ObservedPropertySimple<string>;
    get name() {
        return this.__name.get();
    }
    set name(newValue: string) {
        this.__name.set(newValue);
    }
    private role: string;
    private affiliation: string;
    private ownerList: Array<string>;
    private InviteDialog: CustomDialogController;
    private updateThemeDialog: CustomDialogController;
    private updateNickDialog: CustomDialogController;
    aboutToAppear() {
        this.name = Smack.nick();
    }
    onPageShow(): void {
        this.onGetAllOwnerList();
    }
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
    isRoomOwner(): boolean {
        let flag = false;
        let userName = GlobalContext.getContext().getValue('userName').toString().split('@')[0];
        if (this.ownerList && this.ownerList.length > 0) {
            for (let i = 0; i < this.ownerList.length; i++) {
                let user = this.ownerList[i].split("@")[0];
                if (user == userName) {
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    }
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Flex.width('100%');
        let earlierCreatedChild_2: Toolbar = (this && this.findChildById) ? this.findChildById("2") as Toolbar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Toolbar("2", this, {
                isBack: true,
                title: '群聊设置',
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                isBack: true,
                title: '群聊设置'
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: ItemText = (this && this.findChildById) ? this.findChildById("3") as ItemText : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new ItemText("3", this, { title: "查看所有群成员", clickEvent: () => {
                    router.push({
                        url: 'pages/chat/group_chat/group_all_member'
                    });
                } }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                title: "查看所有群成员", clickEvent: () => {
                    router.push({
                        url: 'pages/chat/group_chat/group_all_member'
                    });
                }
            });
            if (!earlierCreatedChild_3.needsUpdate()) {
                earlierCreatedChild_3.markStatic();
            }
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: ItemText = (this && this.findChildById) ? this.findChildById("4") as ItemText : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new ItemText("4", this, { title: "编辑房间配置（仅房间拥有者可执行）", clickEvent: () => {
                    if (this.isRoomOwner()) {
                        router.push({
                            url: 'pages/chat/group_chat/group_chat_edit'
                        });
                    }
                    else {
                        prompt.showToast({
                            message: '不是房间拥有者不能执行操作'
                        });
                    }
                } }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                title: "编辑房间配置（仅房间拥有者可执行）", clickEvent: () => {
                    if (this.isRoomOwner()) {
                        router.push({
                            url: 'pages/chat/group_chat/group_chat_edit'
                        });
                    }
                    else {
                        prompt.showToast({
                            message: '不是房间拥有者不能执行操作'
                        });
                    }
                }
            });
            if (!earlierCreatedChild_4.needsUpdate()) {
                earlierCreatedChild_4.markStatic();
            }
            View.create(earlierCreatedChild_4);
        }
        let earlierCreatedChild_5: ItemText = (this && this.findChildById) ? this.findChildById("5") as ItemText : undefined;
        if (earlierCreatedChild_5 == undefined) {
            // ItemText({title:"邀请新用户",clickEvent:()=>{
            //   this.InviteDialog.open()
            // }})
            View.create(new ItemText("5", this, { title: "修改房间主题(打开设置的情况下非访客都可执行)", clickEvent: () => {
                    this.updateThemeDialog.open();
                } }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                title: "修改房间主题(打开设置的情况下非访客都可执行)", clickEvent: () => {
                    this.updateThemeDialog.open();
                }
            });
            if (!earlierCreatedChild_5.needsUpdate()) {
                earlierCreatedChild_5.markStatic();
            }
            View.create(earlierCreatedChild_5);
        }
        Column.create();
        Column.padding({ left: 15 });
        Column.height(54);
        Column.width('100%');
        Column.backgroundColor(Color.White);
        Row.create();
        Text.create("我在群聊中的昵称");
        Text.fontSize(15);
        Text.width('60%');
        Text.height(50);
        Text.fontColor(Color.Black);
        Text.onClick(v => {
            this.updateNickDialog.open();
        });
        Text.pop();
        Text.create(this.name);
        Text.fontSize(15);
        Text.width('30%');
        Text.padding({ right: 20 });
        Text.height(50);
        Text.textAlign(TextAlign.End);
        Text.alignSelf(ItemAlign.Center);
        Text.fontColor(Color.Black);
        Text.pop();
        Row.pop();
        Line.create();
        Line.width('100%');
        Line.height(1);
        Line.backgroundColor('#ececec');
        Line.margin({ left: 20 });
        Column.pop();
        Button.createWithLabel('销 毁 群 聊（仅房间创建者可执行）');
        Button.backgroundColor('red');
        Button.margin({ top: 30 });
        Button.onClick(e => {
            this.onExitGroup();
        });
        Button.pop();
        Flex.pop();
    }
    // todo 退出群聊
    onExitGroup() {
        //销毁房间,群主可调用
        Smack.destroy(GlobalContext.getContext().getValue('userName') as string, "123");
        router.back();
        let options: router.RouterOptions = {
            url: 'pages/main'
        };
        router.replace(options);
    }
}
class UpdateThemeDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = {} as CustomDialogController;
        this.__theme = new ObservedPropertySimple(''
        // todo 修改主题
        , this, "theme");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: UpdateThemeDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.theme !== undefined) {
            this.theme = params.theme;
        }
    }
    aboutToBeDeleted() {
        this.__theme.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private __theme: ObservedPropertySimple<string>;
    get theme() {
        return this.__theme.get();
    }
    set theme(newValue: string) {
        this.__theme.set(newValue);
    }
    // todo 修改主题
    private onChangTheme() {
        if (this.theme == '') {
            prompt.showToast({
                message: "请输入新的群聊主题"
            });
        }
    }
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Flex.padding(20);
        Flex.height(180);
        Flex.backgroundColor('#ffffff');
        Flex.borderRadius(10);
        Flex.width('80%');
        Text.create('请输入群聊主题');
        Text.height(40);
        Text.fontSize(15);
        Text.padding(10);
        Text.pop();
        TextInput.create();
        TextInput.height(40);
        TextInput.fontSize(15);
        TextInput.onChange(v => {
            this.theme = v;
        });
        Button.createWithLabel('确定');
        Button.height(40);
        Button.fontSize(15);
        Button.onClick(e => {
            if (this.theme) {
                Smack.setSubject(this.theme);
            }
            //          this.onChangTheme()
            this.controller.close();
        });
        Button.margin({ top: 20 });
        Button.pop();
        Flex.pop();
    }
}
class UpdateNickDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = {} as CustomDialogController;
        this.nickStr = '';
        this.__nick = new SynchedPropertySimpleTwoWay(params.nick, this, "nick");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: UpdateNickDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.nickStr !== undefined) {
            this.nickStr = params.nickStr;
        }
    }
    aboutToBeDeleted() {
        this.__nick.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private nickStr: string;
    private __nick: SynchedPropertySimpleTwoWay<string
    // todo 修改昵称
    >;
    get nick() {
        return this.__nick.get();
    }
    set nick(newValue: string) {
        this.__nick.set(newValue);
    }
    // todo 修改昵称
    private onChangTheme() {
        if (this.nickStr == '') {
            prompt.showToast({
                message: "请输入新的群内昵称"
            });
        }
    }
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Flex.padding(20);
        Flex.height(180);
        Flex.backgroundColor('#ffffff');
        Flex.borderRadius(10);
        Flex.width('80%');
        Text.create('请输入群内昵称');
        Text.height(40);
        Text.fontSize(15);
        Text.padding(10);
        Text.pop();
        TextInput.create({});
        TextInput.height(40);
        TextInput.fontSize(15);
        TextInput.onChange(v => {
            this.nickStr = v;
        });
        Button.createWithLabel('确定');
        Button.height(40);
        Button.fontSize(15);
        Button.onClick(e => {
            Smack.setNick(this.nickStr);
            this.nick = this.nickStr;
            this.controller.close();
        });
        Button.margin({ top: 20 });
        Button.pop();
        Flex.pop();
    }
}
class InviteDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = {} as CustomDialogController;
        this.__invite = new ObservedPropertySimple(''
        // todo 邀请新用户
        , this, "invite");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: InviteDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.invite !== undefined) {
            this.invite = params.invite;
        }
    }
    aboutToBeDeleted() {
        this.__invite.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private __invite: ObservedPropertySimple<string>;
    get invite() {
        return this.__invite.get();
    }
    set invite(newValue: string) {
        this.__invite.set(newValue);
    }
    // todo 邀请新用户
    private onChangTheme() {
        if (this.invite == '') {
            prompt.showToast({
                message: "请输入被邀请用户名"
            });
        }
    }
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Flex.padding(20);
        Flex.height(180);
        Flex.backgroundColor('#ffffff');
        Flex.borderRadius(10);
        Flex.width('80%');
        Text.create('请输入被邀请用户名');
        Text.height(40);
        Text.fontSize(15);
        Text.padding(10);
        Text.pop();
        TextInput.create();
        TextInput.height(40);
        TextInput.fontSize(15);
        TextInput.onChange(v => {
            this.invite = v;
        });
        Button.createWithLabel('确定');
        Button.height(40);
        Button.fontSize(15);
        Button.onClick(e => {
            Smack.invite(this.invite + "@" + Constant.HOST_DOMAIN + Constant.HOST_RES, "invite");
            this.controller.close();
        });
        Button.margin({ top: 20 });
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Group_chat_setting("1", undefined, {}));
