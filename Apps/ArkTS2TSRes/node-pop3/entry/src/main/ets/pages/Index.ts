interface Index_Params {
    message?: string;
    account?: string;
    password?: string;
    mailType?: string;
    textValue?: string;
    inputValue?: string;
    secure?: boolean;
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
    return "Index_" + ++__generate__Id;
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
import promptAction from '@ohos.promptAction';
import router from '@ohos.router';
import socket from '@ohos.net.socket';
import Pop3Command, { Pop3LoginBean } from '@ohos/node-pop3';
import GlobalObj from '../GlobalObj';
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
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__account = new ObservedPropertySimple('xxx', this, "account");
        this.__password = new ObservedPropertySimple('xxx', this, "password");
        this.__mailType = new ObservedPropertySimple('@qq.com', this, "mailType");
        this.__textValue = new ObservedPropertySimple('', this, "textValue");
        this.__inputValue = new ObservedPropertySimple('click me', this, "inputValue");
        this.__secure = new ObservedPropertySimple(false, this, "secure");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogDiy("2", this, {
                    cancel: () => {
                        this.showToast(`关闭了对话框，取消选输入其他类型邮箱`, 'mailType-cancel');
                    },
                    confirm: () => {
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
    updateWithValueParams(params: Index_Params) {
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
    private dialogController: CustomDialogController | null;
    aboutToDisappear() {
        this.dialogController = null;
        GlobalObj?.getInstance()?.getClient()?.QUIT();
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
        TextInput.create({ placeholder: '请输入账号', text: this.account });
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
        TextInput.create({ placeholder: '请输入密码/授权码', text: this.password });
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
        Flex.create({ justifyContent: FlexAlign.Center, direction: FlexDirection.Row, alignItems: ItemAlign.Center });
        Button.createWithLabel('命令说明及注意事项');
        Button.margin(20);
        Button.layoutWeight(1);
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            router.pushUrl({
                url: 'pages/TipsPage'
            });
        });
        Button.pop();
        Button.createWithLabel('测试自己调用登陆并通过command获取邮件');
        Button.margin(20);
        Button.layoutWeight(1);
        Button.height(50);
        Button.visibility(Visibility.None);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.diyLogin();
        });
        Button.pop();
        Button.createWithLabel('测试通过library登录以及使用已有的指令');
        Button.margin(20);
        Button.layoutWeight(1);
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.autoLogin();
        });
        Button.pop();
        Flex.pop();
        Flex.pop();
        Row.pop();
    }
    async diyLogin() {
        const ctx = this;
        try {
            let hostParam = ctx.mailType.substring(ctx.mailType.indexOf('@') + 1, ctx.mailType.indexOf('.'));
            if (!GlobalObj?.getInstance()?.getClient()) {
                let client: Pop3Command | null = null;
                if (this.secure) {
                    let option: socket.TLSConnectOptions = {
                        ALPNProtocols: ["spdy/1", "http/1.1"],
                        address: {
                            address: `smtp.${hostParam}.com`,
                            port: 465,
                            family: 1
                        },
                        secureOptions: {
                            key: '',
                            cert: '',
                            ca: [''],
                            useRemoteCipherPrefer: true,
                        }
                    };
                    let context: Context | null = GlobalObj?.getInstance()?.getContext() ? GlobalObj?.getInstance()?.getContext() : getContext(this);
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
                    if (option.secureOptions.ca instanceof Array) {
                        option.secureOptions.ca[0] = ca0;
                    }
                    else {
                        option.secureOptions.ca = ca0;
                    }
                    let ca1Data = await context.resourceManager.getRawFileContent('QQMailRoot.pem');
                    let ca1 = '';
                    for (let i = 0; i < ca1Data.length; i++) {
                        let todo = ca1Data[i];
                        let item = String.fromCharCode(todo);
                        ca1 += item;
                    }
                    if (option.secureOptions.ca instanceof Array) {
                        option.secureOptions.ca[1] = ca1;
                    }
                    else {
                        option.secureOptions.ca = ca1;
                    }
                    client = new Pop3Command({
                        host: `pop.${hostParam}.com`,
                        port: 465,
                        user: ctx.account + ctx.mailType,
                        password: ctx.password,
                        timeout: 30000,
                        servername: `pop.${hostParam}.com`,
                        tls: true,
                        tlsOptions: option
                    });
                }
                else {
                    client = new Pop3Command({
                        host: `pop.${hostParam}.com`,
                        port: 465,
                        user: ctx.account + ctx.mailType,
                        password: ctx.password,
                        timeout: 30000,
                        servername: `pop.${hostParam}.com`,
                        tls: false,
                        tlsOptions: undefined
                    });
                }
                GlobalObj?.getInstance()?.setClient(client);
            }
            if (GlobalObj?.getInstance()?.getClient()) {
                // 因为没有登录状态判断的接口 所以登陆之前先退出一下 防止已经登录导致出错了
                try {
                    const quitInfo = await GlobalObj?.getInstance()?.getClient()?.command('QUIT');
                }
                catch (err) {
                }
                // These must be in order
                await GlobalObj?.getInstance()?.getClient()?.connect();
                await GlobalObj?.getInstance()?.getClient()?.command('USER', ctx.account + ctx.mailType);
                await GlobalObj?.getInstance()?.getClient()?.command('PASS', ctx.password);
                this.showToast('账号登录成功', 'login-pop3');
                router.pushUrl({
                    url: 'pages/CommandPage',
                    params: {
                        sendCount: ctx.account + ctx.mailType
                    }
                });
            }
        }
        catch (err) {
            this.showToast(`账号登录出错：${err.message}`, 'login-pop3');
        }
    }
    async autoLogin() {
        const ctx = this;
        GlobalObj?.getInstance()?.setClient(null);
        let jumpOption: Pop3LoginBean | null = null;
        try {
            let hostParam = ctx.mailType.substring(ctx.mailType.indexOf('@') + 1, ctx.mailType.indexOf('.'));
            if (this.secure) {
                let option: socket.TLSConnectOptions = {
                    ALPNProtocols: ["spdy/1", "http/1.1"],
                    address: {
                        address: `pop.${hostParam}.com`,
                        port: 995,
                        family: 1
                    },
                    secureOptions: {
                        key: '',
                        cert: '',
                        ca: [''],
                        useRemoteCipherPrefer: true,
                    }
                };
                let context: Context | null = GlobalObj?.getInstance()?.getContext() ? GlobalObj?.getInstance()?.getContext() : getContext(this);
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
                if (option.secureOptions.ca instanceof Array) {
                    option.secureOptions.ca[0] = ca0;
                }
                else {
                    option.secureOptions.ca = ca0;
                }
                let ca1Data = await context.resourceManager.getRawFileContent('QQMailRoot.pem');
                let ca1 = '';
                for (let i = 0; i < ca1Data.length; i++) {
                    let todo = ca1Data[i];
                    let item = String.fromCharCode(todo);
                    ca1 += item;
                }
                if (option.secureOptions.ca instanceof Array) {
                    option.secureOptions.ca[1] = ca1;
                }
                else {
                    option.secureOptions.ca = ca1;
                }
                jumpOption = {
                    host: `pop.${hostParam}.com`,
                    port: 995,
                    user: ctx.account + ctx.mailType,
                    password: ctx.password,
                    timeout: 30000,
                    servername: `pop.${hostParam}.com`,
                    tls: true,
                    tlsOptions: option
                };
            }
            else {
                jumpOption = {
                    host: `pop.${hostParam}.com`,
                    port: 110,
                    user: ctx.account + ctx.mailType,
                    password: ctx.password,
                    timeout: 30000,
                    servername: `pop.${hostParam}.com`,
                    tls: false,
                    tlsOptions: undefined
                };
            }
            router.pushUrl({
                url: 'pages/AutoLoginCommandPage',
                params: {
                    loginOption: jumpOption
                }
            });
        }
        catch (err) {
            this.showToast(`配置登录参数失败：${err.message}`, 'login-pop3');
        }
    }
}
loadDocument(new Index("1", undefined, {}));
