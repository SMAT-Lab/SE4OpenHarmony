interface CustomDialogExample_Params {
    controller?: CustomDialogController;
    pass1?: string;
    pass2?: string;
}
interface Setting_Params {
    states?: string[];
    select?: number;
    dialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "setting_" + ++__generate__Id;
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
import { Toolbar } from '../base/toolbar';
import { PresenceType } from '@ohos/smack';
import prompt from '@ohos.prompt';
import router from '@ohos.router';
import { PresenceRoomType, Smack } from '@ohos/smack';
export class Setting extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.states = ['空闲', '在线', '离开', '长时间离开', '请勿打扰'];
        this.__select = new ObservedPropertySimple(1, this, "select");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogExample("3", this, {});
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            customStyle: true,
            alignment: DialogAlignment.Center
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Setting_Params) {
        if (params.states !== undefined) {
            this.states = params.states;
        }
        if (params.select !== undefined) {
            this.select = params.select;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__select.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private states: string[];
    private __select: ObservedPropertySimple<number>;
    get select() {
        return this.__select.get();
    }
    set select(newValue: number) {
        this.__select.set(newValue);
    }
    private dialogController: CustomDialogController;
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor('#ffffff');
        let earlierCreatedChild_2: Toolbar = (this && this.findChildById) ? this.findChildById("2") as Toolbar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Toolbar("2", this, { title: '设置' }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: '设置'
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Column.create();
        Text.create('修改密码');
        Text.width('100%');
        Text.padding(px2vp(30));
        Text.fontSize(px2fp(30));
        Text.margin({ bottom: 1 });
        Text.onClick(e => {
            this.dialogController.open();
        });
        Text.backgroundColor('#ffffff');
        Text.pop();
        Text.create('设置状态 （' + this.states[this.select] + '）');
        Text.width('100%');
        Text.padding(px2vp(30));
        Text.fontSize(px2fp(30));
        Text.margin({ bottom: 1 });
        Text.backgroundColor('#ffffff');
        Text.onClick(e => {
            TextPickerDialog.show({
                range: this.states,
                selected: this.select,
                onAccept: (value: TextPickerResult) => {
                    if (typeof value.index == 'number') {
                        this.select = value.index as number;
                        this.onSetOnLineState();
                    }
                }
            });
        });
        Text.pop();
        Divider.create();
        Divider.color('#ffe7e7e7');
        Flex.create({ direction: FlexDirection.Row, justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
        Flex.padding({ top: 30 });
        Flex.backgroundColor('#ffffff');
        Button.createWithLabel('退出登录');
        Button.backgroundColor('red');
        Button.height(px2vp(80));
        Button.width('30%');
        Button.fontSize(px2fp(30));
        Button.onClick(e => {
            AlertDialog.show({
                title: '提示',
                message: '确定退出登录吗？',
                confirm: {
                    value: '确定',
                    action: () => {
                        this.onExitAccount();
                    }
                }
            });
        });
        Button.pop();
        Button.createWithLabel('账号注销');
        Button.margin({ left: 20 });
        Button.backgroundColor('red');
        Button.height(px2vp(80));
        Button.fontSize(px2fp(30));
        Button.width('30%');
        Button.onClick(e => {
            AlertDialog.show({
                title: '提示',
                message: '确定注销账号吗？',
                confirm: {
                    value: '确定',
                    action: () => {
                        this.onDeleteAccount();
                    }
                }
            });
        });
        Button.pop();
        Flex.pop();
        Column.pop();
        Column.pop();
    }
    // todo 退出登录
    private onExitAccount() {
        Smack.loginout();
        router.clear();
        router.replace({
            url: 'pages/user/login'
        });
    }
    // todo 账号删除
    private onDeleteAccount() {
        Smack.unregister();
        router.replace({
            url: 'pages/user/login'
        });
    }
    // todo 设置在线状态
    private onSetOnLineState() {
        let presenceType: PresenceType = PresenceType.Available;
        if (this.select == 0) {
            presenceType = PresenceType.Chat;
        }
        else if (this.select == 1) {
            presenceType = PresenceType.Available;
        }
        else if (this.select == 2) {
            presenceType = PresenceType.Away;
        }
        else if (this.select == 3) {
            presenceType = PresenceType.Xa;
        }
        else if (this.select == 4) {
            presenceType = PresenceType.Dnd;
        }
        Smack.changePresence(presenceType, this.states[this.select]);
    }
}
class CustomDialogExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = {} as CustomDialogController;
        this.__pass1 = new ObservedPropertySimple('', this, "pass1");
        this.__pass2 = new ObservedPropertySimple(''
        // todo 修改密码
        , this, "pass2");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomDialogExample_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.pass1 !== undefined) {
            this.pass1 = params.pass1;
        }
        if (params.pass2 !== undefined) {
            this.pass2 = params.pass2;
        }
    }
    aboutToBeDeleted() {
        this.__pass1.aboutToBeDeleted();
        this.__pass2.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private __pass1: ObservedPropertySimple<string>;
    get pass1() {
        return this.__pass1.get();
    }
    set pass1(newValue: string) {
        this.__pass1.set(newValue);
    }
    private __pass2: ObservedPropertySimple<string>;
    get pass2() {
        return this.__pass2.get();
    }
    set pass2(newValue: string) {
        this.__pass2.set(newValue);
    }
    // todo 修改密码
    private onChangPassword() {
        if (this.pass1 == '' || this.pass2 == '') {
            prompt.showToast({
                message: "请输入数据"
            });
        }
        else if (this.pass1 !== this.pass2) {
            prompt.showToast({
                message: "密码不一致"
            });
        }
        else {
            Smack.changPwd(this.pass1);
            prompt.showToast({
                message: "修改成功"
            });
            console.log('密码修改结束');
        }
    }
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Flex.padding(20);
        Flex.height(px2vp(500));
        Flex.backgroundColor('#ffffff');
        Flex.borderRadius(10);
        Flex.width('80%');
        Text.create('请输入新密码');
        Text.height(px2vp(80));
        Text.fontSize(px2fp(30));
        Text.padding(px2vp(10));
        Text.pop();
        TextInput.create();
        TextInput.height(px2vp(80));
        TextInput.fontSize(px2fp(30));
        TextInput.padding({ left: px2vp(15), top: 0, bottom: 0 });
        TextInput.onChange(v => {
            this.pass1 = v;
        });
        Text.create('请再次输入新密码');
        Text.height(px2vp(80));
        Text.fontSize(px2fp(30));
        Text.padding(px2vp(10));
        Text.pop();
        TextInput.create();
        TextInput.height(px2vp(80));
        TextInput.fontSize(px2fp(30));
        TextInput.padding({ left: px2vp(15), top: 0, bottom: 0 });
        TextInput.onChange(v => {
            this.pass2 = v;
        });
        Button.createWithLabel('确定');
        Button.height(px2vp(80));
        Button.fontSize(px2fp(30));
        Button.onClick(e => {
            this.onChangPassword();
            if (this.controller != null) {
                this.controller.close();
            }
        });
        Button.margin({ top: 20 });
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Setting("1", undefined, {}));
