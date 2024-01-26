interface Login_Params {
    userName?: string;
    passWord?: string;
    ip?: string;
    doMain?: string;
    serviceName?: string;
    resource?: string;
    port?: string;
    uName?: string;
    uPassword?: string;
    compression?: boolean;
    authed?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "login_" + ++__generate__Id;
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
import router from '@ohos.router';
import { Toolbar } from '../base/toolbar';
import prompt from '@ohos.prompt';
import { Constant } from '../../entity/Constant';
import { Smack } from '@ohos/smack';
import { GlobalContext } from '../../entity/GlobalContext';
class Login extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.userName = '';
        this.passWord = '';
        this.__ip = new ObservedPropertySimple('', this, "ip");
        this.__doMain = new ObservedPropertySimple('', this, "doMain");
        this.__serviceName = new ObservedPropertySimple('', this, "serviceName");
        this.__resource = new ObservedPropertySimple('', this, "resource");
        this.__port = new ObservedPropertySimple('', this, "port");
        this.__uName = new ObservedPropertySimple('', this, "uName");
        this.__uPassword = new ObservedPropertySimple('', this, "uPassword");
        this.__compression = new ObservedPropertySimple(false, this, "compression");
        this.__authed = new ObservedPropertySimple(false, this, "authed");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Login_Params) {
        if (params.userName !== undefined) {
            this.userName = params.userName;
        }
        if (params.passWord !== undefined) {
            this.passWord = params.passWord;
        }
        if (params.ip !== undefined) {
            this.ip = params.ip;
        }
        if (params.doMain !== undefined) {
            this.doMain = params.doMain;
        }
        if (params.serviceName !== undefined) {
            this.serviceName = params.serviceName;
        }
        if (params.resource !== undefined) {
            this.resource = params.resource;
        }
        if (params.port !== undefined) {
            this.port = params.port;
        }
        if (params.uName !== undefined) {
            this.uName = params.uName;
        }
        if (params.uPassword !== undefined) {
            this.uPassword = params.uPassword;
        }
        if (params.compression !== undefined) {
            this.compression = params.compression;
        }
        if (params.authed !== undefined) {
            this.authed = params.authed;
        }
    }
    aboutToBeDeleted() {
        this.__ip.aboutToBeDeleted();
        this.__doMain.aboutToBeDeleted();
        this.__serviceName.aboutToBeDeleted();
        this.__resource.aboutToBeDeleted();
        this.__port.aboutToBeDeleted();
        this.__uName.aboutToBeDeleted();
        this.__uPassword.aboutToBeDeleted();
        this.__compression.aboutToBeDeleted();
        this.__authed.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private userName: string;
    private passWord: string;
    private __ip: ObservedPropertySimple<string>;
    get ip() {
        return this.__ip.get();
    }
    set ip(newValue: string) {
        this.__ip.set(newValue);
    }
    private __doMain: ObservedPropertySimple<string>;
    get doMain() {
        return this.__doMain.get();
    }
    set doMain(newValue: string) {
        this.__doMain.set(newValue);
    }
    private __serviceName: ObservedPropertySimple<string>;
    get serviceName() {
        return this.__serviceName.get();
    }
    set serviceName(newValue: string) {
        this.__serviceName.set(newValue);
    }
    private __resource: ObservedPropertySimple<string>;
    get resource() {
        return this.__resource.get();
    }
    set resource(newValue: string) {
        this.__resource.set(newValue);
    }
    private __port: ObservedPropertySimple<string>;
    get port() {
        return this.__port.get();
    }
    set port(newValue: string) {
        this.__port.set(newValue);
    }
    private __uName: ObservedPropertySimple<string>;
    get uName() {
        return this.__uName.get();
    }
    set uName(newValue: string) {
        this.__uName.set(newValue);
    }
    private __uPassword: ObservedPropertySimple<string>;
    get uPassword() {
        return this.__uPassword.get();
    }
    set uPassword(newValue: string) {
        this.__uPassword.set(newValue);
    }
    private __compression: ObservedPropertySimple<boolean>;
    get compression() {
        return this.__compression.get();
    }
    set compression(newValue: boolean) {
        this.__compression.set(newValue);
    }
    private __authed: ObservedPropertySimple<boolean>;
    get authed() {
        return this.__authed.get();
    }
    set authed(newValue: boolean) {
        this.__authed.set(newValue);
    }
    render() {
        Column.create();
        let earlierCreatedChild_2: Toolbar = (this && this.findChildById) ? this.findChildById("2") as Toolbar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Toolbar("2", this, { title: '登录' }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: '登录'
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Column.create();
        Column.margin({ top: 20 });
        Column.padding({ left: 50, right: 50 });
        Column.height('100%');
        Column.width('100%');
        Column.create();
        TextInput.create({ placeholder: '请输入用户名', text: this.userName });
        TextInput.margin({ bottom: 20 });
        TextInput.height(px2vp(100));
        TextInput.fontSize(px2fp(20));
        TextInput.placeholderFont({ size: px2vp(36) });
        TextInput.type(InputType.Normal);
        TextInput.onChange(v => {
            this.userName = v;
        });
        TextInput.create({ placeholder: '请输入密码', text: this.passWord });
        TextInput.type(InputType.Password);
        TextInput.height(px2vp(100));
        TextInput.fontSize(px2fp(20));
        TextInput.placeholderFont({ size: px2vp(36) });
        TextInput.onChange(v => {
            this.passWord = v;
        });
        Button.createWithLabel('登 录');
        Button.width('100%');
        Button.height(px2vp(50));
        Button.fontSize(px2fp(20));
        Button.margin({ top: 10 });
        Button.onClick(v => {
            //              let isConnect = globalThis.Smack.isConnected()
            //              if (isConnect) {
            this.onLogin();
            //              } else {
            //                prompt.showToast({
            //                  message: "请先连接服务"
            //                })
            //              }
        });
        Button.pop();
        Button.createWithLabel('连接服务');
        Button.width('100%');
        Button.height(px2vp(50));
        Button.fontSize(px2fp(20));
        Button.margin({ top: 10 });
        Button.onClick(v => {
            if (this.check()) {
                this.connectService();
            }
        });
        Button.pop();
        Button.createWithLabel('注 册');
        Button.margin({ top: 10 });
        Button.width('100%');
        Button.height(px2vp(50));
        Button.fontSize(px2fp(20));
        Button.padding({ left: 30, right: 30 });
        Button.backgroundColor('#000000');
        Button.onClick(v => {
            this.onRegister();
        });
        Button.pop();
        Column.pop();
        Text.create("ip:  " + this.ip);
        Text.width("100%");
        Text.margin({ top: 5 });
        Text.pop();
        Text.create("doMain:  " + this.doMain);
        Text.width("100%");
        Text.margin({ top: 5 });
        Text.pop();
        Text.create("serviceName:  " + this.serviceName);
        Text.width("100%");
        Text.margin({ top: 5 });
        Text.pop();
        Text.create("resource:  " + this.resource);
        Text.width("100%");
        Text.margin({ top: 5 });
        Text.pop();
        Text.create("port:  " + this.port);
        Text.width("100%");
        Text.margin({ top: 5 });
        Text.pop();
        Text.create("userName:  " + this.uName);
        Text.width("100%");
        Text.margin({ top: 5 });
        Text.pop();
        Text.create("passWord:  " + this.uPassword);
        Text.width("100%");
        Text.margin({ top: 5 });
        Text.pop();
        Text.create("compression:  " + this.compression);
        Text.width("100%");
        Text.margin({ top: 5 });
        Text.pop();
        Text.create("authed:  " + this.authed);
        Text.width("100%");
        Text.margin({ top: 5 });
        Text.pop();
        Column.pop();
        Column.pop();
    }
    public connectService() {
        Smack.setServer(Constant.HOST_IP);
        Smack.setServer(Constant.SERVICE_NAME);
        Smack.setResource(Constant.HOST_RES.replace("/", ""));
        Smack.setPort(Constant.HOST_PORT);
        Smack.setUsernameAndPassword(this.userName, this.passWord);
        Smack.connect();
        this.uName = Smack.username();
        this.uPassword = Smack.password();
        this.resource = Smack.resource();
        this.ip = Smack.server();
        this.port = String(Smack.port());
        this.compression = Smack.compression();
        this.authed = Smack.authed();
    }
    // todo 登录
    private onLogin() {
        let result: number;
        if (this.check()) {
            prompt.showToast({
                message: '登陆中..'
            });
            setTimeout(() => {
                this.connectService();
                try {
                    let LoginName = this.uName + '@' + Constant.HOST_IP;
                    GlobalContext.getContext().setValue('userName', this.uName + '@' + Constant.HOST_IP + Constant.HOST_RES);
                    result = Smack.Login(LoginName, this.uPassword);
                }
                catch (e) {
                    console.log("onLogin err  " + e.message);
                }
                if (result == 1) {
                    router.replace({
                        url: 'pages/main'
                    });
                }
                else {
                    prompt.showToast({
                        message: "登录失败"
                    });
                }
            }, 100);
        }
    }
    public check(): boolean {
        if (this.userName == '') {
            prompt.showToast({
                message: "请输入用户名"
            });
            return false;
        }
        if (this.passWord == '') {
            prompt.showToast({
                message: "请输入登陆密码"
            });
            return false;
        }
        return true;
    }
    private onRegister() {
        router.push({
            url: 'pages/user/register'
        });
    }
}
loadDocument(new Login("1", undefined, {}));
