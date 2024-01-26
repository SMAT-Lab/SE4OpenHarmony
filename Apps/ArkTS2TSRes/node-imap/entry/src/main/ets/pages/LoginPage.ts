interface LoginPage_Params {
    message?: string;
    account?: string;
    password?: string;
    mailType?: string;
    textValue?: string;
    inputValue?: string;
    secure?: boolean;
    isLogin?: boolean;
    capability?: string;
    util?: LoginUtil;
    option?: socket.TLSConnectOptions;
    dialogController?: CustomDialogController | null;
}
interface CustomDialogDiy_Params {
    textValue?: string;
    inputValue?: string;
    controller?: CustomDialogController;
    cancel?: Function;
    confirm?: Function;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LoginPage_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Imap, { inspect } from '@ohos/node-imap';
import promptAction from '@ohos.promptAction';
import router from '@ohos.router';
import socket from '@ohos.net.socket';
import LoginUtil from '../LoginUtil';
import GlobalObj from '../GlobalObj';
import LoginOption from '../bean/LoginOption';
class CustomDialogDiy extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__textValue = new SynchedPropertySimpleTwoWay(params.textValue, this, "textValue");
        this.__inputValue = new SynchedPropertySimpleTwoWay(params.inputValue, this, "inputValue");
        this.controller = undefined;
        this.cancel = () => {
        };
        this.confirm = () => {
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomDialogDiy_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
    }
    aboutToBeDeleted() {
        this.__textValue.aboutToBeDeleted();
        this.__inputValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __textValue: SynchedPropertySimpleTwoWay<string>;
    get textValue() {
        return this.__textValue.get();
    }
    set textValue(newValue: string) {
        this.__textValue.set(newValue);
    }
    private __inputValue: SynchedPropertySimpleTwoWay<string>;
    get inputValue() {
        return this.__inputValue.get();
    }
    set inputValue(newValue: string) {
        this.__inputValue.set(newValue);
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private cancel: Function;
    private confirm: Function;
    render() {
        Column.create();
        Text.create('请输入邮箱类型');
        Text.fontSize(20);
        Text.margin({ top: 10, bottom: 10 });
        Text.width('90%');
        Text.pop();
        TextInput.create({ placeholder: '', text: this.textValue });
        TextInput.height(60);
        TextInput.width('90%');
        TextInput.onChange((value: string) => {
            this.textValue = value;
        });
        Text.create('Tips:请输入正确格式的邮箱类型，例如@qq.com或者@163.com');
        Text.margin({ top: 10, bottom: 10 });
        Text.width('90%');
        Text.fontSize(8);
        Text.fontColor(Color.Red);
        Text.pop();
        Flex.create({ justifyContent: FlexAlign.SpaceAround });
        Button.createWithLabel('取消');
        Button.onClick(() => {
            this.controller.close();
            this.cancel();
        });
        Button.pop();
        Button.createWithLabel('确定');
        Button.onClick(() => {
            this.inputValue = this.textValue;
            this.controller.close();
            this.confirm();
        });
        Button.pop();
        Flex.pop();
        Column.pop();
    }
}
class LoginPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__account = new ObservedPropertySimple('', this, "account");
        this.__password = new ObservedPropertySimple('', this, "password");
        this.__mailType = new ObservedPropertySimple('@qq.com', this, "mailType");
        this.__textValue = new ObservedPropertySimple('', this, "textValue");
        this.__inputValue = new ObservedPropertySimple('click me', this, "inputValue");
        this.__secure = new ObservedPropertySimple(false, this, "secure");
        this.__isLogin = new ObservedPropertySimple(false, this, "isLogin");
        this.__capability = new ObservedPropertySimple('', this, "capability");
        this.util = new LoginUtil();
        this.option = {
            ALPNProtocols: ["spdy/1", "http/1.1"],
            address: {
                address: 'imap.xx.com',
                port: 993,
                family: 1
            },
            secureOptions: {
                key: '',
                cert: '',
                ca: [''],
                useRemoteCipherPrefer: true,
            }
        };
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogDiy("2", this, {
                    cancel: () => {
                        this.showToast(`关闭了对话框，取消选输入其他类型邮箱`, 'mailType-cancel');
                    },
                    confirm: () => {
                        if (!this.inputValue || this.inputValue.length < 1) {
                            this.showToast(`邮箱类型不可为空`, 'mailType-confirm');
                            return;
                        }
                        if (this.inputValue.indexOf('@') == -1 && this.inputValue.indexOf('@') != this.inputValue.lastIndexOf('@')) {
                            this.showToast(`邮箱类型必须含有一个@，且只能含有一个@`, 'mailType-confirm');
                            return;
                        }
                        if (this.inputValue.indexOf('.') == -1 && this.inputValue.indexOf('.') != this.inputValue.lastIndexOf('.')) {
                            this.showToast(`邮箱类型必须含有一个.，且只能含有一个.`, 'mailType-confirm');
                            return;
                        }
                        if (this.inputValue.indexOf('@') != -1 && this.inputValue.indexOf('.') != -1 && this.inputValue.indexOf('@') > this.inputValue.indexOf('.')) {
                            this.showToast(`邮箱类型中@需要在.之前，例如@qq.com,@163.com这些`, 'mailType-confirm');
                            return;
                        }
                        if (this.inputValue.indexOf('@') - this.inputValue.indexOf('.') == 1) {
                            this.showToast(`邮箱类型中除了@和.，必须含有其他字符`, 'mailType-confirm');
                            return;
                        }
                        if (this.inputValue.indexOf('@') != 0) {
                            this.showToast(`邮箱类型中@必须在第一位`, 'mailType-confirm');
                            return;
                        }
                        this.mailType = this.inputValue;
                        this.showToast(`输入其他类型邮箱：${this.mailType}`, 'mailType-confirm');
                    },
                    textValue: this.__textValue,
                    inputValue: this.__inputValue
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            autoCancel: true,
            customStyle: false
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: LoginPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.account !== undefined) {
            this.account = params.account;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.mailType !== undefined) {
            this.mailType = params.mailType;
        }
        if (params.textValue !== undefined) {
            this.textValue = params.textValue;
        }
        if (params.inputValue !== undefined) {
            this.inputValue = params.inputValue;
        }
        if (params.secure !== undefined) {
            this.secure = params.secure;
        }
        if (params.isLogin !== undefined) {
            this.isLogin = params.isLogin;
        }
        if (params.capability !== undefined) {
            this.capability = params.capability;
        }
        if (params.util !== undefined) {
            this.util = params.util;
        }
        if (params.option !== undefined) {
            this.option = params.option;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__account.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__mailType.aboutToBeDeleted();
        this.__textValue.aboutToBeDeleted();
        this.__inputValue.aboutToBeDeleted();
        this.__secure.aboutToBeDeleted();
        this.__isLogin.aboutToBeDeleted();
        this.__capability.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __account: ObservedPropertySimple<string>;
    get account() {
        return this.__account.get();
    }
    set account(newValue: string) {
        this.__account.set(newValue);
    }
    private __password: ObservedPropertySimple<string>;
    get password() {
        return this.__password.get();
    }
    set password(newValue: string) {
        this.__password.set(newValue);
    }
    private __mailType: ObservedPropertySimple<string>;
    get mailType() {
        return this.__mailType.get();
    }
    set mailType(newValue: string) {
        this.__mailType.set(newValue);
    }
    private __textValue: ObservedPropertySimple<string>;
    get textValue() {
        return this.__textValue.get();
    }
    set textValue(newValue: string) {
        this.__textValue.set(newValue);
    }
    private __inputValue: ObservedPropertySimple<string>;
    get inputValue() {
        return this.__inputValue.get();
    }
    set inputValue(newValue: string) {
        this.__inputValue.set(newValue);
    }
    private __secure: ObservedPropertySimple<boolean>;
    get secure() {
        return this.__secure.get();
    }
    set secure(newValue: boolean) {
        this.__secure.set(newValue);
    }
    private __isLogin: ObservedPropertySimple<boolean>;
    get isLogin() {
        return this.__isLogin.get();
    }
    set isLogin(newValue: boolean) {
        this.__isLogin.set(newValue);
    }
    private __capability: ObservedPropertySimple<string>;
    get capability() {
        return this.__capability.get();
    }
    set capability(newValue: string) {
        this.__capability.set(newValue);
    }
    private util: LoginUtil;
    private option: socket.TLSConnectOptions;
    private dialogController: CustomDialogController | null;
    aboutToDisappear() {
        this.dialogController = null;
        GlobalObj?.getInstance()?.getClient()?.end();
    }
    showToast(text: string, name = '测试') {
        console.log(`zdy---${name}--->${text}`);
        promptAction.showToast({
            message: text,
            duration: 2000,
            bottom: 50
        });
    }
    MailMenu(parent = null) {
        Menu.create();
        MenuItem.create({ content: 'qq', labelInfo: 'qq' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.mailType = '@qq.com';
            }
        });
        MenuItem.pop();
        MenuItem.create({ content: '163', labelInfo: '163' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.mailType = '@163.com';
            }
        });
        MenuItem.pop();
        MenuItem.create({ content: '139', labelInfo: '139' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.mailType = '@139.com';
            }
        });
        MenuItem.pop();
        MenuItem.create({ content: 'sina', labelInfo: 'sina' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.mailType = '@sina.com';
            }
        });
        MenuItem.pop();
        MenuItem.create({ content: '其他', labelInfo: 'other' });
        MenuItem.onChange((selected) => {
            if (selected) {
                if (this.dialogController) {
                    this.dialogController.open();
                }
            }
        });
        MenuItem.pop();
        Menu.pop();
    }
    CapabilityMenu(parent = null) {
        Menu.create();
        MenuItem.create({ content: 'IMAP4', labelInfo: 'IMAP4' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.mailType = 'IMAP4';
                this.checkServerCapability();
            }
        });
        MenuItem.pop();
        MenuItem.create({ content: 'IMAP4REV1', labelInfo: 'IMAP4REV1' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.mailType = 'IMAP4REV1';
            }
        });
        MenuItem.pop();
        MenuItem.create({ content: 'XLIST', labelInfo: 'XLIST' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.mailType = 'XLIST';
            }
        });
        MenuItem.pop();
        MenuItem.create({ content: 'MOVE', labelInfo: 'MOVE' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.mailType = 'MOVE';
            }
        });
        MenuItem.pop();
        MenuItem.create({ content: 'IDLE', labelInfo: 'IDLE' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.mailType = 'IDLE';
            }
        });
        MenuItem.pop();
        MenuItem.create({ content: 'XAPPLEPUSHSERVICE', labelInfo: 'XAPPLEPUSHSERVICE' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.mailType = 'XAPPLEPUSHSERVICE';
            }
        });
        MenuItem.pop();
        MenuItem.create({ content: 'NAMESPACE', labelInfo: 'NAMESPACE' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.mailType = 'NAMESPACE';
            }
        });
        MenuItem.pop();
        MenuItem.create({ content: 'CHILDREN', labelInfo: 'CHILDREN' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.mailType = 'CHILDREN';
            }
        });
        MenuItem.pop();
        MenuItem.create({ content: 'ID', labelInfo: 'ID' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.mailType = 'ID';
            }
        });
        MenuItem.pop();
        MenuItem.create({ content: 'UIDPLUS', labelInfo: 'UIDPLUS' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.mailType = 'UIDPLUS';
            }
        });
        MenuItem.pop();
        MenuItem.create({ content: 'COMPRESS-DEFLATE', labelInfo: 'COMPRESS-DEFLATE' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.mailType = 'COMPRESS-DEFLATE';
            }
        });
        MenuItem.pop();
        Menu.pop();
    }
    render() {
        Row.create();
        Row.width('100%');
        Flex.create({
            alignItems: ItemAlign.Center,
            justifyContent: FlexAlign.Center,
            alignContent: FlexAlign.Center,
            direction: FlexDirection.Column
        });
        Text.create('点击账号后面的邮箱可以切换邮箱类型');
        Text.fontSize(20);
        Text.height(50);
        Text.textAlign(TextAlign.Center);
        Text.margin({ bottom: 20 });
        Text.fontWeight(FontWeight.Bold);
        Text.width('100%');
        Text.pop();
        Flex.create({
            alignItems: ItemAlign.Start,
            justifyContent: FlexAlign.Start,
            alignContent: FlexAlign.Start,
            direction: FlexDirection.Row
        });
        Flex.margin({ left: 15, top: 20 });
        Text.create('账号：');
        Text.fontSize(20);
        Text.height(50);
        Text.textAlign(TextAlign.Center);
        Text.margin({ right: 5 });
        Text.pop();
        TextInput.create({ placeholder: '请输入账号', text: '' });
        TextInput.layoutWeight(1);
        TextInput.fontSize(20);
        TextInput.height(50);
        TextInput.borderWidth(2);
        TextInput.textAlign(TextAlign.Center);
        TextInput.borderColor(Color.Gray);
        TextInput.type(InputType.Normal);
        TextInput.margin({ left: 15 });
        TextInput.onChange((data) => {
            this.account = data;
        });
        Text.create(this.mailType);
        Text.fontSize(14);
        Text.height(50);
        Text.fontColor(Color.Blue);
        Text.textAlign(TextAlign.Center);
        Text.margin({ left: 5, right: 15 });
        Text.bindMenu({ builder: this.MailMenu.bind(this) });
        Text.pop();
        Flex.pop();
        Flex.create({
            alignItems: ItemAlign.Start,
            justifyContent: FlexAlign.Start,
            alignContent: FlexAlign.Start,
            direction: FlexDirection.Row
        });
        Flex.margin({ left: 15, top: 20 });
        Text.create('密码/授权码：');
        Text.fontSize(20);
        Text.height(50);
        Text.textAlign(TextAlign.Center);
        Text.margin({ right: 5 });
        Text.pop();
        TextInput.create({ placeholder: '请输入密码/授权码', text: 'bfxeualuaxambged' });
        TextInput.layoutWeight(1);
        TextInput.fontSize(20);
        TextInput.height(50);
        TextInput.borderWidth(2);
        TextInput.textAlign(TextAlign.Center);
        TextInput.borderColor(Color.Gray);
        TextInput.type(InputType.Normal);
        TextInput.margin({ right: 15 });
        TextInput.onChange((data) => {
            this.password = data;
        });
        Flex.pop();
        Flex.create({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center });
        Flex.margin({ left: 15, top: 20 });
        Text.create('是否开启SSL/TLS(当前仅需支持SMTP,无需支持SMTPS,此按钮暂不可用)');
        Text.fontSize(20);
        Text.height(50);
        Text.margin({});
        Text.textAlign(TextAlign.Center);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Checkbox.create({ name: '是否开启SSL/TLS', group: 'ssl' });
        Checkbox.height(40);
        Checkbox.select(false);
        Checkbox.onClick((event) => {
            this.showToast('当前仅需支持SMTP,无需支持SMTPS');
        });
        Checkbox.enabled(false);
        Checkbox.margin({ left: 10 });
        Checkbox.selectedColor(Color.Blue);
        Checkbox.onChange((value) => {
            this.secure = value;
        });
        Checkbox.pop();
        Flex.pop();
        Flex.create({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center });
        Flex.margin({ left: 15, top: 20 });
        Button.createWithLabel('登录');
        Button.margin(20);
        Button.width('80%');
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.login();
        });
        Button.pop();
        Button.createWithLabel('退出登录');
        Button.margin(20);
        Button.width('80%');
        Button.height(50);
        Button.visibility(this.isLogin ? Visibility.Visible : Visibility.Hidden);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.loginOut();
        });
        Button.pop();
        Flex.pop();
        Flex.create({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center });
        Flex.margin({ left: 15, top: 20 });
        Text.create('检查服务器的能力');
        Text.margin(20);
        Text.width('80%');
        Text.height(50);
        Text.visibility(this.isLogin ? Visibility.Visible : Visibility.Hidden);
        Text.backgroundColor(Color.Blue);
        Text.fontColor(Color.White);
        Text.bindMenu({ builder: this.MailMenu.bind(this) });
        Text.pop();
        Button.createWithLabel('跳转文件夹列表');
        Button.margin(20);
        Button.width('80%');
        Button.height(50);
        Button.visibility(this.isLogin ? Visibility.Visible : Visibility.Hidden);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.jumpIntoFolder();
        });
        Button.pop();
        Flex.pop();
        Flex.pop();
        Row.pop();
    }
    async login() {
        const ctx = this;
        try {
            ctx.showToast('开始登录账号', 'login-imap');
            let hostParam = ctx.mailType.substring(ctx.mailType.indexOf('@') + 1, ctx.mailType.indexOf('.'));
            let loginOption: LoginOption = new LoginOption();
            if (!GlobalObj?.getInstance()?.getClient()) {
                if (ctx.secure) {
                    let context: Context | null = GlobalObj?.getInstance()?.getContext() ? GlobalObj?.getInstance()?.getContext() : getContext();
                    if (!context) {
                        return;
                    }
                    let ca0Data = await context?.resourceManager?.getRawFileContent('QQMailMiddle.pem');
                    if (!ca0Data) {
                        return;
                    }
                    let ca0 = '';
                    for (let i = 0; i < ca0Data.length; i++) {
                        let todo = ca0Data[i];
                        let item = String.fromCharCode(todo);
                        ca0 += item;
                    }
                    if (ctx.option.secureOptions.ca instanceof Array) {
                        ctx.option.secureOptions.ca[0] = ca0;
                    }
                    else {
                        ctx.option.secureOptions.ca = ca0;
                    }
                    let ca1Data = await context.resourceManager.getRawFileContent('QQMailRoot.pem');
                    let ca1 = '';
                    for (let i = 0; i < ca1Data.length; i++) {
                        let todo = ca1Data[i];
                        let item = String.fromCharCode(todo);
                        ca1 += item;
                    }
                    if (ctx.option.secureOptions.ca instanceof Array) {
                        ctx.option.secureOptions.ca[1] = ca1;
                    }
                    else {
                        ctx.option.secureOptions.ca = ca1;
                    }
                    ctx.option.address.address = `imap.${hostParam}.com`;
                    ctx.option.address.port = 993;
                    loginOption.account = ctx.account;
                    loginOption.password = ctx.password;
                    loginOption.hostParam = hostParam;
                    loginOption.secure = ctx.secure;
                    loginOption.tlsOption = ctx.option;
                    loginOption.mailType = ctx.mailType;
                }
                else {
                    loginOption.account = ctx.account;
                    loginOption.password = ctx.password;
                    loginOption.hostParam = hostParam;
                    loginOption.secure = ctx.secure;
                    loginOption.tlsOption = null;
                    loginOption.mailType = ctx.mailType;
                }
            }
            this.util?.login(loginOption, () => {
                ctx.isLogin = true;
                ctx.showToast('登录成功，准备跳转邮件文件夹列表', 'login-imap');
            }, (err: Error) => {
                console.log(err.message);
            }, () => {
                console.log('Connection ended');
            });
            ctx.showToast('服务器连接成功', 'login-imap');
        }
        catch (err) {
            ctx.showToast(`账号登录出错：${err.message}`, 'login-smtp');
        }
    }
    loginOut() {
        const ctx = this;
        try {
            ctx.showToast('开始退出登录,请稍等', 'loginOut-imap');
            if (GlobalObj?.getInstance()?.getClient()) {
                GlobalObj?.getInstance()?.getClient()?.end(() => {
                    ctx.showToast('退出登录成功', 'loginOut-imap');
                    router.clear();
                    router.pushUrl({
                        url: 'pages/Index"'
                    });
                });
            }
            else {
                ctx.showToast('退出登录失败，客户端对象为空', 'loginOut-imap');
                router.clear();
                router.pushUrl({
                    url: 'pages/Index"'
                });
            }
        }
        catch (err) {
            ctx.showToast(`退出登录出错：${err.message}`, 'loginOut-smtp');
        }
    }
    checkServerCapability() {
        if (this.isLogin) {
            let checkResult: boolean | undefined = GlobalObj?.getInstance()?.getClient()?.serverSupports(this.capability);
            this.showToast(`服务端能力是否支持-${this.capability},结果是：${checkResult}`, 'checkServerCapability-smtp');
        }
        else {
            this.showToast(`检查服务端能力出错：客户端未登录`, 'checkServerCapability-smtp');
        }
    }
    jumpIntoFolder() {
        if (this.isLogin) {
            router.pushUrl({
                url: 'pages/FolderPage'
            });
        }
        else {
            this.showToast(`客户端未登录`, 'jumpIntoFolder-smtp');
        }
    }
}
loadDocument(new LoginPage("1", undefined, {}));
