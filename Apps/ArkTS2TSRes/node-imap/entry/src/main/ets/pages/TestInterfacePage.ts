interface TestInterfacePage_Params {
    isLogin?: boolean;
    isBoxOpen?: boolean;
    message?: string;
    secure?: boolean;
    startIndex?: number;
    endIndex?: number;
    bean?: Box | null;
    uidList?: Array<string>;
    subFolderList?: Array<string>;
    folderList?: Array<string>;
    listData?: Array<MsgListBean>;
    account?: string;
    password?: string;
    util?: TestInterfaceUtil;
    pageSize?: number;
    folderName?: string;
    option?: socket.TLSConnectOptions;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestInterfacePage_" + ++__generate__Id;
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
import Imap, { inspect } from '@ohos/node-imap';
import socket from '@ohos.net.socket';
import StatusBean from '../bean/StatusBean';
import MsgListBean, { MsgListFootBean, MsgListHeadBean } from '../bean/MsgListBean';
import Box from '../bean/Box';
import TestInterfaceUtil from '../TestInterfaceUtil';
import GlobalObj from '../GlobalObj';
import LoginOption from '../bean/LoginOption';
import MailBoxes from '../bean/MailBoxes';
import DetailCallback from '../bean/DetailCallback';
import MsgSendBean from '../bean/MsgSendBean';
import AppendOptions from '../bean/AppendOptions';
import { ImapMessageAttributes } from '../bean/ImapMessage';
const BASE_COUNT = 1;
class TestInterfacePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isLogin = new ObservedPropertySimple(false, this, "isLogin");
        this.__isBoxOpen = new ObservedPropertySimple(false, this, "isBoxOpen");
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__secure = new ObservedPropertySimple(false, this, "secure");
        this.__startIndex = new ObservedPropertySimple(1 //当前页
        , this, "startIndex");
        this.__endIndex = new ObservedPropertySimple(10 //当前页
        , this, "endIndex");
        this.__bean = new ObservedPropertyObject(null //获取邮件列表之前先获取该文件夹里面的邮件总数和状态
        , this, "bean");
        this.__uidList = new ObservedPropertyObject([] //邮件uid列表
        , this, "uidList");
        this.__subFolderList = new ObservedPropertyObject([] //邮件列表数据集合
        , this, "subFolderList");
        this.__folderList = new ObservedPropertyObject([] //邮件列表数据集合
        , this, "folderList");
        this.__listData = new ObservedPropertyObject([] //邮件列表数据集合
        , this, "listData");
        this.__account = new ObservedPropertySimple('xxx@qq.com', this, "account");
        this.__password = new ObservedPropertySimple('xxx', this, "password");
        this.util = new TestInterfaceUtil();
        this.pageSize = 10 //请求时的每页多少条信息，用于分页请求
        ;
        this.folderName = 'INBOX';
        this.option = {
            ALPNProtocols: ["spdy/1", "http/1.1"],
            address: {
                address: 'imap.qq.com',
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
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestInterfacePage_Params) {
        if (params.isLogin !== undefined) {
            this.isLogin = params.isLogin;
        }
        if (params.isBoxOpen !== undefined) {
            this.isBoxOpen = params.isBoxOpen;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.secure !== undefined) {
            this.secure = params.secure;
        }
        if (params.startIndex !== undefined) {
            this.startIndex = params.startIndex;
        }
        if (params.endIndex !== undefined) {
            this.endIndex = params.endIndex;
        }
        if (params.bean !== undefined) {
            this.bean = params.bean;
        }
        if (params.uidList !== undefined) {
            this.uidList = params.uidList;
        }
        if (params.subFolderList !== undefined) {
            this.subFolderList = params.subFolderList;
        }
        if (params.folderList !== undefined) {
            this.folderList = params.folderList;
        }
        if (params.listData !== undefined) {
            this.listData = params.listData;
        }
        if (params.account !== undefined) {
            this.account = params.account;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.util !== undefined) {
            this.util = params.util;
        }
        if (params.pageSize !== undefined) {
            this.pageSize = params.pageSize;
        }
        if (params.folderName !== undefined) {
            this.folderName = params.folderName;
        }
        if (params.option !== undefined) {
            this.option = params.option;
        }
    }
    aboutToBeDeleted() {
        this.__isLogin.aboutToBeDeleted();
        this.__isBoxOpen.aboutToBeDeleted();
        this.__message.aboutToBeDeleted();
        this.__secure.aboutToBeDeleted();
        this.__startIndex.aboutToBeDeleted();
        this.__endIndex.aboutToBeDeleted();
        this.__bean.aboutToBeDeleted();
        this.__uidList.aboutToBeDeleted();
        this.__subFolderList.aboutToBeDeleted();
        this.__folderList.aboutToBeDeleted();
        this.__listData.aboutToBeDeleted();
        this.__account.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isLogin: ObservedPropertySimple<boolean>;
    get isLogin() {
        return this.__isLogin.get();
    }
    set isLogin(newValue: boolean) {
        this.__isLogin.set(newValue);
    }
    private __isBoxOpen: ObservedPropertySimple<boolean>;
    get isBoxOpen() {
        return this.__isBoxOpen.get();
    }
    set isBoxOpen(newValue: boolean) {
        this.__isBoxOpen.set(newValue);
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __secure: ObservedPropertySimple<boolean>;
    get secure() {
        return this.__secure.get();
    }
    set secure(newValue: boolean) {
        this.__secure.set(newValue);
    }
    private __startIndex: ObservedPropertySimple<number>; //当前页
    get startIndex() {
        return this.__startIndex.get();
    }
    set startIndex(newValue: number) {
        this.__startIndex.set(newValue);
    }
    private __endIndex: ObservedPropertySimple<number>; //当前页
    get endIndex() {
        return this.__endIndex.get();
    }
    set endIndex(newValue: number) {
        this.__endIndex.set(newValue);
    }
    private __bean: ObservedPropertyObject<Box | null>; //获取邮件列表之前先获取该文件夹里面的邮件总数和状态
    get bean() {
        return this.__bean.get();
    }
    set bean(newValue: Box | null) {
        this.__bean.set(newValue);
    }
    private __uidList: ObservedPropertyObject<Array<string>>; //邮件uid列表
    get uidList() {
        return this.__uidList.get();
    }
    set uidList(newValue: Array<string>) {
        this.__uidList.set(newValue);
    }
    private __subFolderList: ObservedPropertyObject<Array<string>>; //邮件列表数据集合
    get subFolderList() {
        return this.__subFolderList.get();
    }
    set subFolderList(newValue: Array<string>) {
        this.__subFolderList.set(newValue);
    }
    private __folderList: ObservedPropertyObject<Array<string>>; //邮件列表数据集合
    get folderList() {
        return this.__folderList.get();
    }
    set folderList(newValue: Array<string>) {
        this.__folderList.set(newValue);
    }
    private __listData: ObservedPropertyObject<Array<MsgListBean>>; //邮件列表数据集合
    get listData() {
        return this.__listData.get();
    }
    set listData(newValue: Array<MsgListBean>) {
        this.__listData.set(newValue);
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
    private util: TestInterfaceUtil;
    private pageSize: number; //请求时的每页多少条信息，用于分页请求
    private folderName: string;
    private option: socket.TLSConnectOptions;
    showToast(text: string, name = '测试') {
        console.log(`IMAPTest---${name}--->${text}`);
        promptAction.showToast({
            message: text,
            duration: 2000,
            bottom: 50
        });
        this.message = this.message + "\r\n" + text;
    }
    render() {
        Flex.create({
            alignItems: ItemAlign.Start,
            justifyContent: FlexAlign.Start,
            alignContent: FlexAlign.Start,
            direction: FlexDirection.Column
        });
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
        Flex.create({ direction: FlexDirection.Row });
        Scroll.create();
        Scroll.layoutWeight(1);
        Column.create();
        Column.width('100%');
        Column.height(2200);
        Button.createWithLabel('登录');
        Button.fontSize(14);
        Button.height(50);
        Button.visibility(this.isLogin ? Visibility.None : Visibility.Visible);
        Button.width("100%");
        Button.margin({ top: 100, left: 10, right: 10 });
        Button.onClick(() => {
            this.login();
        });
        Button.pop();
        Button.createWithLabel('退出登录');
        Button.fontSize(14);
        Button.height(50);
        Button.visibility(this.isLogin ? Visibility.Visible : Visibility.None);
        Button.width("100%");
        Button.margin(10);
        Button.onClick(() => {
            this.loginOut();
        });
        Button.pop();
        Button.createWithLabel('检查服务器支持的能力');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.visibility(this.isLogin ? Visibility.Visible : Visibility.None);
        Button.width("100%");
        Button.onClick(() => {
            this.checkServerCapability();
        });
        Button.pop();
        Button.createWithLabel('获取邮箱里的文件夹列表');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.visibility(this.isLogin ? Visibility.Visible : Visibility.None);
        Button.width("100%");
        Button.onClick(() => {
            this.getFolderList();
        });
        Button.pop();
        Button.createWithLabel('添加新文件夹(名字暂定test)');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.visibility(this.isLogin ? Visibility.Visible : Visibility.None);
        Button.width("100%");
        Button.onClick(() => {
            this.createFolder();
        });
        Button.pop();
        Button.createWithLabel('删除新文件夹');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.visibility(this.isLogin ? Visibility.Visible : Visibility.None);
        Button.width("100%");
        Button.onClick(() => {
            this.delFolder();
        });
        Button.pop();
        Button.createWithLabel('重命名新文件夹');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.visibility(this.isLogin ? Visibility.Visible : Visibility.None);
        Button.width("100%");
        Button.onClick(() => {
            this.renameFolder();
        });
        Button.pop();
        Button.createWithLabel('获取订阅邮箱文件夹列表');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.visibility(this.isLogin ? Visibility.Visible : Visibility.None);
        Button.width("100%");
        Button.onClick(() => {
            this.getSubFolderList();
        });
        Button.pop();
        Button.createWithLabel('订阅邮箱文件夹');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.visibility(this.isLogin ? Visibility.Visible : Visibility.None);
        Button.width("100%");
        Button.onClick(() => {
            this.subBox();
        });
        Button.pop();
        Button.createWithLabel('取消订阅邮箱文件夹');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.visibility(this.isLogin ? Visibility.Visible : Visibility.None);
        Button.width("100%");
        Button.onClick(() => {
            this.unSubBox();
        });
        Button.pop();
        Button.createWithLabel('获取主邮箱列表');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.visibility(this.isLogin && !this.isBoxOpen ? Visibility.Visible : Visibility.None);
        Button.width("100%");
        Button.onClick(() => {
            this.openBoxAndGetStatu();
        });
        Button.pop();
        Button.createWithLabel('获取某个邮件详情');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.visibility(this.isLogin && this.isBoxOpen ? Visibility.Visible : Visibility.None);
        Button.width("100%");
        Button.onClick(() => {
            this.getMsgDetail();
        });
        Button.pop();
        Button.createWithLabel('上传本地邮件到邮箱');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.visibility(this.isLogin && this.isBoxOpen ? Visibility.Visible : Visibility.None);
        Button.width("100%");
        Button.onClick(() => {
            this.appendMail();
        });
        Button.pop();
        Button.createWithLabel('关闭邮箱主文件夹');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.visibility(this.isLogin && this.isBoxOpen ? Visibility.Visible : Visibility.None);
        Button.width("100%");
        Button.onClick(() => {
            this.closeBox();
        });
        Button.pop();
        Button.createWithLabel('邮件排序');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.visibility(this.isLogin && this.isBoxOpen ? Visibility.Visible : Visibility.None);
        Button.width("100%");
        Button.onClick(() => {
            this.sortMail();
        });
        Button.pop();
        Button.createWithLabel('搜索邮件');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.visibility(this.isLogin && this.isBoxOpen ? Visibility.Visible : Visibility.None);
        Button.width("100%");
        Button.onClick(() => {
            this.search();
        });
        Button.pop();
        Button.createWithLabel('给邮件添加删除标记');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.visibility(this.isLogin && this.isBoxOpen ? Visibility.Visible : Visibility.None);
        Button.width("100%");
        Button.onClick(() => {
            this.storeMail();
        });
        Button.pop();
        Button.createWithLabel('复制邮件到其他文件夹');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.visibility(this.isLogin && this.isBoxOpen ? Visibility.Visible : Visibility.None);
        Button.width("100%");
        Button.onClick(() => {
            this.copyMail();
        });
        Button.pop();
        Button.createWithLabel('给邮件添加flag');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.visibility(this.isLogin && this.isBoxOpen ? Visibility.Visible : Visibility.None);
        Button.width("100%");
        Button.onClick(() => {
            this.addFlag();
        });
        Button.pop();
        Button.createWithLabel('给邮件设置flag');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.visibility(this.isLogin && this.isBoxOpen ? Visibility.Visible : Visibility.None);
        Button.width("100%");
        Button.onClick(() => {
            this.setFlag();
        });
        Button.pop();
        Button.createWithLabel('给邮件删除flag');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.visibility(this.isLogin && this.isBoxOpen ? Visibility.Visible : Visibility.None);
        Button.width("100%");
        Button.onClick(() => {
            this.deleteFlag();
        });
        Button.pop();
        Button.createWithLabel('给邮件添加keyword');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.visibility(this.isLogin && this.isBoxOpen ? Visibility.Visible : Visibility.None);
        Button.width("100%");
        Button.onClick(() => {
            this.addKeywords();
        });
        Button.pop();
        Button.createWithLabel('给邮件设置keyword');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.visibility(this.isLogin && this.isBoxOpen ? Visibility.Visible : Visibility.None);
        Button.width("100%");
        Button.onClick(() => {
            this.setKeywords();
        });
        Button.pop();
        Button.createWithLabel('给邮件删除keyword');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.visibility(this.isLogin && this.isBoxOpen ? Visibility.Visible : Visibility.None);
        Button.width("100%");
        Button.onClick(() => {
            this.delKeywords();
        });
        Button.pop();
        Button.createWithLabel('移动邮件到其他文件夹');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.visibility(this.isLogin && this.isBoxOpen ? Visibility.Visible : Visibility.None);
        Button.width("100%");
        Button.onClick(() => {
            this.moveMail();
        });
        Button.pop();
        Column.pop();
        Scroll.pop();
        Scroll.create();
        Scroll.layoutWeight(1);
        Scroll.height('100%');
        Flex.create({ alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start });
        Text.create(this.message);
        Text.fontSize(14);
        Text.textAlign(TextAlign.Start);
        Text.padding(20);
        Text.backgroundColor('#22CCCCCC');
        Text.fontColor(Color.Black);
        Text.width('100%');
        Text.pop();
        Flex.pop();
        Scroll.pop();
        Flex.pop();
        Flex.pop();
    }
    async login() {
        const ctx = this;
        ctx.message = '';
        try {
            ctx.showToast('开始登录账号', 'login-imap');
            let hostParam = ctx.account.substring(ctx.account.indexOf('@') + 1, ctx.account.indexOf('.'));
            let mailType = ctx.account.substring(ctx.account.indexOf('@') + 1, ctx.account.length);
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
                    loginOption.mailType = mailType;
                    loginOption.hostParam = hostParam;
                    loginOption.tlsOption = ctx.option;
                    loginOption.secure = ctx.secure;
                }
                else {
                    loginOption.account = ctx.account;
                    loginOption.password = ctx.password;
                    loginOption.mailType = mailType;
                    loginOption.hostParam = hostParam;
                    loginOption.tlsOption = null;
                    loginOption.secure = ctx.secure;
                }
            }
            this?.util?.login(loginOption, () => {
                ctx.isLogin = true;
                ctx.showToast('登录成功，准备跳转邮件文件夹列表', 'login-imap');
                // GlobalObj?.getInstance()?.getClient()?._doKeepaliveTimer(true) //登陆成功之后通过noop命令不断的轮训服务器 防止断开连接 原库已封装了该命令不断调用 无需用户手动调用
            }, (err: Error) => {
                console.log(err.message);
            }, () => {
                console.log('Connection ended');
            });
        }
        catch (err) {
            ctx.showToast(`账号登录出错：${err.message}`, 'login-smtp');
        }
    }
    loginOut() {
        const ctx = this;
        ctx.message = '';
        try {
            ctx.showToast('开始退出登录,请稍等', 'loginOut-imap');
            if (GlobalObj?.getInstance()?.getClient()) {
                let startTime1 = new Date().getTime();
                GlobalObj?.getInstance()?.getClient()?.end();
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("IMAPClientTest : end averageTime : " + averageTime1 + "us");
                ctx.showToast('退出登录成功', 'loginOut-imap');
                let startTime2 = new Date().getTime();
                GlobalObj?.getInstance()?.getClient()?.destroy();
                let endTime2 = new Date().getTime();
                let averageTime2 = ((endTime2 - startTime2) * 1000) / BASE_COUNT;
                console.log("IMAPClientTest : destroy averageTime : " + averageTime2 + "us");
                GlobalObj?.getInstance()?.setClient(null);
                ctx.isLogin = false;
            }
            else {
                ctx.showToast('退出登录失败，客户端对象为空', 'loginOut-imap');
                ctx.isLogin = false;
            }
        }
        catch (err) {
            ctx.showToast(`退出登录出错：${err.message}`, 'loginOut-smtp');
        }
    }
    checkServerCapability() {
        this.message = '';
        if (!GlobalObj?.getInstance()?.getClient() || !this.isLogin) {
            this.showToast(`检查服务端能力出错：客户端未登录`, 'checkServerCapability-smtp');
            return;
        }
        let startTime1 = new Date().getTime();
        let checkResult: boolean = GlobalObj?.getInstance()?.getClient()?.serverSupports('IMAP4') ? GlobalObj?.getInstance()?.getClient()?.serverSupports('IMAP4') : false;
        let endTime1 = new Date().getTime();
        let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
        console.log("IMAPClientTest : serverSupports averageTime : " + averageTime1 + "us");
        this.showToast(`服务端能力是否支持-${'IMAP4'},结果是：${checkResult}`, 'checkServerCapability-smtp');
    }
    getFolderList() {
        const ctx = this;
        ctx.message = '';
        if (!GlobalObj?.getInstance()?.getClient() || !ctx.isLogin) {
            ctx.showToast('账号未登录，请登录后再试', 'getFolderList-imap');
            return;
        }
        ctx.showToast(`获取邮箱里的文件夹列表开始`, 'getFolderList-imap');
        let startTime1 = new Date().getTime();
        GlobalObj?.getInstance()?.getClient()?.getBoxes((err: Error, data: MailBoxes) => {
            let endTime1 = new Date().getTime();
            let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
            console.log("IMAPClientTest : getBoxes averageTime : " + averageTime1 + "us");
            if (err) {
                ctx.showToast(`获取邮箱里的文件夹列表出错，数据是：${err.message}`, 'getFolderList-imap');
                return;
            }
            if (!data || typeof data != 'object') {
                ctx.showToast(`获取邮箱里的文件夹列表出错，get box status fail`, 'getFolderList-imap');
                return;
            }
            ctx.folderList = [];
            let keyArr = Object.getOwnPropertyNames(data);
            for (let i = 0; i < keyArr.length; i++) {
                ctx.folderList.push(keyArr[i]);
            }
            ctx.showToast(`获取邮箱里的文件夹列表成功，数据是：${JSON.stringify(ctx.folderList)}`, 'getFolderList-imap');
        });
    }
    createFolder() {
        const ctx = this;
        try {
            ctx.message = '';
            if (!GlobalObj?.getInstance()?.getClient() || !ctx.isLogin) {
                ctx.showToast('账号未登录，请登录后再试', 'createFolder-imap');
                return;
            }
            ctx.showToast('开始创建文件夹', 'createFolder-imap');
            let startTime1 = new Date().getTime();
            let addName = 'addFolder' + new Date().getTime();
            GlobalObj?.getInstance()?.getClient()?.addBox(addName, (err: Error) => {
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("IMAPClientTest : addBox averageTime : " + averageTime1 + "us");
                if (err) {
                    ctx.showToast(`创建文件夹失败,原因：${err.message}`, 'createFolder-imap');
                }
                else {
                    ctx.showToast('创建文件夹成功', 'createFolder-imap');
                    ctx.showToast(`获取邮箱里的文件夹列表开始`, 'getFolderList-imap');
                    GlobalObj?.getInstance()?.getClient()?.getBoxes((err: Error, data: MailBoxes) => {
                        if (err) {
                            ctx.showToast(`获取邮箱里的文件夹列表出错，数据是：${err.message}`, 'getFolderList-imap');
                            return;
                        }
                        ;
                        if (!data || typeof data != 'object') {
                            ctx.showToast(`获取邮箱里的文件夹列表出错，get box status fail`, 'getFolderList-imap');
                            return;
                        }
                        ctx.folderList = [];
                        let keyArr = Object.getOwnPropertyNames(data);
                        for (let i = 0; i < keyArr.length; i++) {
                            ctx.folderList.push(keyArr[i]);
                        }
                        ctx.showToast(`获取邮箱里的文件夹列表成功，数据是：${JSON.stringify(ctx.folderList)}`, 'getFolderList-imap');
                    });
                }
            });
        }
        catch (err) {
            ctx.showToast(`账号登录出错：${err.message}`, 'createFolder-smtp');
        }
    }
    delFolder() {
        const ctx = this;
        try {
            ctx.message = '';
            if (!GlobalObj?.getInstance()?.getClient() || !ctx.isLogin) {
                ctx.showToast('账号未登录，请登录后再试', 'delFolder-imap');
                return;
            }
            let folderName = 'delFolder' + new Date().getTime();
            GlobalObj?.getInstance()?.getClient()?.addBox(folderName, (err: Error) => {
                if (err) {
                    ctx.showToast(`创建用于删除的文件夹失败,原因：${err.message}`, 'delFolder-imap');
                }
                else {
                    ctx.showToast('创建用于删除的文件夹成功', 'delFolder-imap');
                    ctx.showToast(`获取邮箱里的文件夹列表开始`, 'delFolder-imap');
                    GlobalObj?.getInstance()?.getClient()?.getBoxes((err: Error, data: MailBoxes) => {
                        if (err) {
                            ctx.showToast(`获取邮箱里的文件夹列表出错，数据是：${err.message}`, 'delFolder-imap');
                            return;
                        }
                        ;
                        if (!data || typeof data != 'object') {
                            ctx.showToast(`获取邮箱里的文件夹列表出错，get box status fail`, 'delFolder-imap');
                            return;
                        }
                        ctx.folderList = [];
                        let keyArr = Object.getOwnPropertyNames(data);
                        for (let i = 0; i < keyArr.length; i++) {
                            ctx.folderList.push(keyArr[i]);
                        }
                        ctx.showToast(`获取邮箱里的文件夹列表成功，数据是：${JSON.stringify(ctx.folderList)}`, 'delFolder-imap');
                        ctx.showToast('开始删除文件夹：delFolder', 'deleteFolder-imap');
                        let startTime1 = new Date().getTime();
                        GlobalObj?.getInstance()?.getClient()?.delBox(folderName, (err: Error) => {
                            let endTime1 = new Date().getTime();
                            let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                            console.log("IMAPClientTest : delBox averageTime : " + averageTime1 + "us");
                            if (err) {
                                ctx.showToast('删除文件夹失败', 'delFolder-imap');
                            }
                            else {
                                ctx.showToast('删除文件夹成功', 'delFolder-imap');
                                ctx.showToast(`获取邮箱里的文件夹列表开始`, 'getFolderList-imap');
                                GlobalObj?.getInstance()?.getClient()?.getBoxes((err: Error, data: MailBoxes) => {
                                    if (err) {
                                        ctx.showToast(`获取邮箱里的文件夹列表出错，数据是：${err.message}`, 'getFolderList-imap');
                                        return;
                                    }
                                    if (!data || typeof data != 'object') {
                                        ctx.showToast(`获取邮箱里的文件夹列表出错，get box status fail`, 'getFolderList-imap');
                                        return;
                                    }
                                    ctx.folderList = [];
                                    let keyArr = Object.getOwnPropertyNames(data);
                                    for (let i = 0; i < keyArr.length; i++) {
                                        ctx.folderList.push(keyArr[i]);
                                    }
                                    ctx.showToast(`获取邮箱里的文件夹列表成功，数据是：${JSON.stringify(ctx.folderList)}`, 'getFolderList-imap');
                                });
                            }
                        });
                    });
                }
            });
        }
        catch (err) {
            ctx.showToast(`账号登录出错：${err.message}`, 'createFolder-smtp');
        }
    }
    renameFolder() {
        const ctx = this;
        try {
            ctx.message = '';
            if (!GlobalObj?.getInstance()?.getClient() || !ctx.isLogin) {
                ctx.showToast('账号未登录，请登录后再试', 'renameFolder-imap');
                return;
            }
            let renameName = 'renameFolder' + new Date().getTime();
            GlobalObj?.getInstance()?.getClient()?.addBox(renameName, (err: Error) => {
                if (err) {
                    ctx.showToast(`创建用于删除的文件夹失败,原因：${err.message}`, 'renameFolder-imap');
                }
                else {
                    ctx.showToast('创建用于删除的文件夹成功', 'renameFolder-imap');
                    ctx.showToast(`获取邮箱里的文件夹列表开始`, 'renameFolder-imap');
                    GlobalObj?.getInstance()?.getClient()?.getBoxes((err: Error, data: MailBoxes) => {
                        if (err) {
                            ctx.showToast(`获取邮箱里的文件夹列表出错，数据是：${err.message}`, 'renameFolder-imap');
                            return;
                        }
                        if (!data || typeof data != 'object') {
                            ctx.showToast(`获取邮箱里的文件夹列表出错，get box status fail`, 'renameFolder-imap');
                            return;
                        }
                        ctx.folderList = [];
                        let keyArr = Object.getOwnPropertyNames(data);
                        for (let i = 0; i < keyArr.length; i++) {
                            ctx.folderList.push(keyArr[i]);
                        }
                        ctx.showToast(`获取邮箱里的文件夹列表成功，数据是：${JSON.stringify(ctx.folderList)}`, 'renameFolder-imap');
                        ctx.showToast('开始重命名文件夹', 'renameFolder-imap');
                        let startTime1 = new Date().getTime();
                        GlobalObj?.getInstance()?.getClient()?.renameBox(renameName, 'newFolder', (err: Error, result: MailBoxes) => {
                            let endTime1 = new Date().getTime();
                            let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                            console.log("IMAPClientTest : renameBox averageTime : " + averageTime1 + "us");
                            if (err) {
                                ctx.showToast(`重命名文件夹失败,原因：${err.message}`, 'renameFolder-imap');
                            }
                            else {
                                ctx.showToast('重命名文件夹成功', 'renameFolder-imap');
                                ctx.showToast(`获取邮箱里的文件夹列表开始`, 'getFolderList-imap');
                                GlobalObj?.getInstance()?.getClient()?.getBoxes((err: Error, data: MailBoxes) => {
                                    if (err) {
                                        ctx.showToast(`获取邮箱里的文件夹列表出错，数据是：${err.message}`, 'getFolderList-imap');
                                        return;
                                    }
                                    ;
                                    if (!data || typeof data != 'object') {
                                        ctx.showToast(`获取邮箱里的文件夹列表出错，get box status fail`, 'getFolderList-imap');
                                        return;
                                    }
                                    ctx.folderList = [];
                                    let keyArr = Object.getOwnPropertyNames(data);
                                    for (let i = 0; i < keyArr.length; i++) {
                                        ctx.folderList.push(keyArr[i]);
                                    }
                                    ctx.showToast(`获取邮箱里的文件夹列表成功，数据是：${JSON.stringify(ctx.folderList)}`, 'getFolderList-imap');
                                });
                            }
                        });
                    });
                }
            });
        }
        catch (err) {
            ctx.showToast(`账号登录出错：${err.message}`, 'renameFolder-smtp');
        }
    }
    subBox() {
        const ctx = this;
        try {
            ctx.message = '';
            if (!GlobalObj?.getInstance()?.getClient() || !ctx.isLogin) {
                ctx.showToast('账号未登录，请登录后再试', 'subBox-imap');
                return;
            }
            ctx.showToast('开始获取订阅的文件夹。', 'subBox-imap');
            GlobalObj?.getInstance()?.getClient()?.getSubscribedBoxes((err: Error, data: MailBoxes) => {
                if (err) {
                    ctx.showToast(`获取订阅的文件夹失败,原因：${err.message}`, 'subBox-imap');
                }
                else {
                    if (!data || typeof data != 'object') {
                        ctx.showToast(`获取邮箱里的文件夹列表出错，get box status fail`, 'subBox-imap');
                        return;
                    }
                    ctx.subFolderList = [];
                    let keyArr = Object.getOwnPropertyNames(data);
                    for (let i = 0; i < keyArr.length; i++) {
                        ctx.subFolderList.push(keyArr[i]);
                    }
                    ctx.showToast(`获取订阅的文件夹成功，数据是：${JSON.stringify(ctx.subFolderList)}`, 'subBox-imap');
                    ctx.showToast('开始创建文件夹', 'subBox-imap');
                    let subName = 'subFolder' + new Date().getTime();
                    GlobalObj?.getInstance()?.getClient()?.addBox(subName, (err: Error) => {
                        if (err) {
                            ctx.showToast(`创建文件夹失败,原因：${err.message}`, 'subBox-imap');
                        }
                        else {
                            ctx.showToast('创建文件夹成功', 'subBox-imap');
                            ctx.showToast('订阅addFolder文件夹', 'subBox-imap');
                            let startTime1 = new Date().getTime();
                            GlobalObj?.getInstance()?.getClient()?.subscribeBox(subName, (err: Error) => {
                                let endTime1 = new Date().getTime();
                                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                                console.log("IMAPClientTest : subscribeBox averageTime : " + averageTime1 + "us");
                                if (err) {
                                    ctx.showToast(`订阅邮箱失败,原因：${err.message}`, 'subBox-imap');
                                }
                                else {
                                    ctx.showToast('订阅邮箱成功', 'subBox-imap');
                                    ctx.showToast('开始获取订阅的文件夹。', 'subBox-imap');
                                    GlobalObj?.getInstance()?.getClient()?.getSubscribedBoxes((err: Error, data: MailBoxes) => {
                                        if (err) {
                                            ctx.showToast(`获取订阅的文件夹失败,原因：${err.message}`, 'subBox-imap');
                                        }
                                        else {
                                            if (!data || typeof data != 'object') {
                                                ctx.showToast(`获取邮箱里的文件夹列表出错，get box status fail`, 'subBox-imap');
                                                return;
                                            }
                                            ctx.subFolderList = [];
                                            let keyArr = Object.getOwnPropertyNames(data);
                                            for (let i = 0; i < keyArr.length; i++) {
                                                ctx.subFolderList.push(keyArr[i]);
                                            }
                                            ctx.showToast(`获取订阅的文件夹成功，数据是：${JSON.stringify(ctx.subFolderList)}`, 'subBox-imap');
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
        catch (err) {
            ctx.showToast(`订阅邮箱出错：${err.message}`, 'subBox-smtp');
        }
    }
    unSubBox() {
        const ctx = this;
        try {
            ctx.message = '';
            if (!GlobalObj?.getInstance()?.getClient() || !ctx.isLogin) {
                ctx.showToast('账号未登录，请登录后再试', 'unSubBox-imap');
                return;
            }
            ctx.showToast('开始获取订阅的文件夹。', 'unSubBox-imap');
            GlobalObj?.getInstance()?.getClient()?.getSubscribedBoxes((err: Error, data: MailBoxes) => {
                if (err) {
                    ctx.showToast(`获取订阅的文件夹失败,原因：${err.message}`, 'unSubBox-imap');
                }
                else {
                    if (!data || typeof data != 'object') {
                        ctx.showToast(`获取邮箱里的文件夹列表出错，get box status fail`, 'subBox-imap');
                        return;
                    }
                    ctx.subFolderList = [];
                    let keyArr = Object.getOwnPropertyNames(data);
                    for (let i = 0; i < keyArr.length; i++) {
                        ctx.subFolderList.push(keyArr[i]);
                    }
                    ctx.showToast(`获取订阅的文件夹成功，数据是：${JSON.stringify(ctx.subFolderList)}`, 'unSubBox-imap');
                    ctx.showToast('开始创建文件夹', 'subBox-imap');
                    let unSubName = 'unSubFolder' + new Date().getTime();
                    GlobalObj?.getInstance()?.getClient()?.addBox(unSubName, (err: Error) => {
                        if (err) {
                            ctx.showToast(`创建文件夹失败,原因：${err.message}`, 'unSubBox-imap');
                        }
                        else {
                            ctx.showToast('创建文件夹成功', 'subBox-imap');
                            ctx.showToast('订阅addFolder文件夹', 'subBox-imap');
                            GlobalObj?.getInstance()?.getClient()?.subscribeBox(unSubName, (err: Error) => {
                                if (err) {
                                    ctx.showToast(`订阅邮箱失败,原因：${err.message}`, 'unSubBox-imap');
                                }
                                else {
                                    ctx.showToast('订阅邮箱成功', 'subBox-imap');
                                    ctx.showToast('开始获取订阅的文件夹。', 'subBox-imap');
                                    GlobalObj?.getInstance()?.getClient()?.getSubscribedBoxes((err: Error, data: MailBoxes) => {
                                        if (err) {
                                            ctx.showToast(`获取订阅的文件夹失败,原因：${err.message}`, 'unSubBox-imap');
                                        }
                                        else {
                                            if (!data || typeof data != 'object') {
                                                ctx.showToast(`获取邮箱里的文件夹列表出错，get box status fail`, 'subBox-imap');
                                                return;
                                            }
                                            ctx.subFolderList = [];
                                            let keyArr = Object.getOwnPropertyNames(data);
                                            for (let i = 0; i < keyArr.length; i++) {
                                                ctx.subFolderList.push(keyArr[i]);
                                            }
                                            ctx.showToast(`获取订阅的文件夹成功，数据是：${JSON.stringify(ctx.subFolderList)}`, 'unSubBox-imap');
                                            let startTime1 = new Date().getTime();
                                            GlobalObj?.getInstance()?.getClient()?.unsubscribeBox(unSubName, (err: Error) => {
                                                let endTime1 = new Date().getTime();
                                                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                                                console.log("IMAPClientTest : unsubscribeBox averageTime : " + averageTime1 + "us");
                                                if (err) {
                                                    ctx.showToast(`取消订阅邮箱失败,原因：${err.message}`, 'unSubBox-imap');
                                                }
                                                else {
                                                    ctx.showToast('取消订阅邮箱成功', 'unSubBox-imap');
                                                    ctx.showToast('开始获取订阅的文件夹。', 'getSubFolderList-imap');
                                                    GlobalObj?.getInstance()?.getClient()?.getSubscribedBoxes((err: Error, data: MailBoxes) => {
                                                        if (err) {
                                                            ctx.showToast(`获取订阅的文件夹失败,原因：${err.message}`, 'getSubFolderList-imap');
                                                        }
                                                        else {
                                                            if (!data || typeof data != 'object') {
                                                                ctx.showToast(`获取邮箱里的文件夹列表出错，get box status fail`, 'subBox-imap');
                                                                return;
                                                            }
                                                            ctx.subFolderList = [];
                                                            let keyArr = Object.getOwnPropertyNames(data);
                                                            for (let i = 0; i < keyArr.length; i++) {
                                                                ctx.subFolderList.push(keyArr[i]);
                                                            }
                                                            ctx.showToast(`获取订阅的文件夹成功，数据是：${JSON.stringify(ctx.subFolderList)}`, 'getFolderList-imap');
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
        catch (err) {
            ctx.showToast(`订阅邮箱出错：${err.message}`, 'subBox-smtp');
        }
    }
    getSubFolderList() {
        const ctx = this;
        try {
            ctx.message = '';
            if (!GlobalObj?.getInstance()?.getClient() || !ctx.isLogin) {
                ctx.showToast('账号未登录，请登录后再试', 'getSubFolderList-imap');
                return;
            }
            ctx.showToast('开始获取订阅的文件夹。', 'getSubFolderList-imap');
            let startTime1 = new Date().getTime();
            GlobalObj?.getInstance()?.getClient()?.getSubscribedBoxes((err: Error, data: MailBoxes) => {
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("IMAPClientTest : getSubscribedBoxes averageTime : " + averageTime1 + "us");
                if (err) {
                    ctx.showToast(`获取订阅的文件夹失败,原因：${err.message}`, 'getSubFolderList-imap');
                }
                else {
                    if (!data || typeof data != 'object') {
                        ctx.showToast(`获取邮箱里的文件夹列表出错，get box status fail`, 'getSubFolderList-imap');
                        return;
                    }
                    ctx.subFolderList = [];
                    let keyArr = Object.getOwnPropertyNames(data);
                    for (let i = 0; i < keyArr.length; i++) {
                        ctx.subFolderList.push(keyArr[i]);
                    }
                    ctx.showToast(`获取订阅的文件夹成功，数据是：${JSON.stringify(ctx.subFolderList)}`, 'getFolderList-imap');
                }
            });
        }
        catch (err) {
            ctx.showToast(`获取订阅的文件夹出错：${err.message}`, 'getSubFolderList-smtp');
        }
    }
    refreshPageSize() {
        const ctx = this;
        if (ctx.startIndex >= (ctx?.bean?.messages?.total ? ctx?.bean?.messages?.total : 0)) {
            return;
        }
        ctx.endIndex = ctx.startIndex + ctx.pageSize - 1;
        if (ctx.endIndex > (ctx?.bean?.messages?.total ? ctx?.bean?.messages?.total : 0)) {
            ctx.endIndex = (ctx?.bean?.messages?.total ? ctx?.bean?.messages?.total : 0);
        }
    }
    openBoxAndGetStatu() {
        const ctx = this;
        try {
            ctx.message = '';
            if (!GlobalObj?.getInstance()?.getClient() || !ctx.isLogin) {
                ctx.showToast('账号未登录，请登录后再试', 'openBoxAndGetStatu-imap');
                return;
            }
            ctx.showToast(`获取主邮箱主文件夹状态开始，${ctx.folderName}`, 'openBoxAndGetStatu-imap');
            let startTime1 = new Date().getTime();
            GlobalObj?.getInstance()?.getClient()?.status(ctx.folderName, (err: Error, data: Box) => {
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("IMAPClientTest : status averageTime : " + averageTime1 + "us");
                if (err) {
                    ctx.isBoxOpen = false;
                    ctx.showToast(`获取邮箱主文件夹状态失败，${err.message}`, 'openBoxAndGetStatu-imap');
                    return;
                }
                if (!data || (data?.messages?.total ? data?.messages?.total : 0) < 1) {
                    ctx.isBoxOpen = false;
                    ctx.showToast('获取邮箱主文件夹状态失败，无数据', 'openBoxAndGetStatu-imap');
                    return;
                }
                try {
                    ctx.bean = data;
                    if ((ctx?.bean?.messages?.total ? ctx?.bean?.messages?.total : 0) > 0) {
                        let startTime1 = new Date().getTime();
                        GlobalObj?.getInstance()?.getClient()?.openBox(ctx.folderName, true, (err: Error, data: Box) => {
                            let endTime1 = new Date().getTime();
                            let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                            console.log("IMAPClientTest : openBox averageTime : " + averageTime1 + "us");
                            if (err) {
                                ctx.isBoxOpen = true;
                                ctx.showToast(`打开邮箱主文件夹失败，${err.message}`, 'openBoxAndGetStatu-imap');
                                return;
                            }
                            ctx.showToast(`打开邮箱主文件夹成功`, 'openBoxAndGetStatu-imap');
                            ctx.isBoxOpen = true;
                            ctx.getListData();
                        });
                    }
                    else {
                        ctx.isBoxOpen = false;
                        ctx.showToast(`文件夹：${ctx.folderName}中，有信息总共：${ctx?.bean?.messages?.total},新消息:${ctx?.bean?.messages?.new},未读消息:${ctx?.bean?.messages?.unseen},未打开邮箱`, 'openBoxAndGetStatu-imap');
                    }
                }
                catch (err) {
                    ctx.showToast(`打开邮箱主文件夹失败，${err.message}`, 'openBoxAndGetStatu-imap');
                }
            });
        }
        catch (err) {
            ctx.showToast(`获取主邮箱邮件列表失败，信息是：${err.message}`, 'getListData-imap');
            throw err as Error;
        }
    }
    getListData() {
        const ctx = this;
        try {
            ctx.listData = [];
            ctx.refreshPageSize();
            ctx.message = '';
            if (!GlobalObj?.getInstance()?.getClient() || !ctx.isLogin) {
                ctx.showToast('账号未登录，请登录后再试', 'getListData-imap');
                return;
            }
            if (!ctx.isBoxOpen) {
                ctx.showToast('邮箱未打开，无法获取邮件列表', 'getListData-imap');
                return;
            }
            if (!GlobalObj?.getInstance()?.getClient()?.seq) {
                ctx.showToast('客户端seq对象为空', 'getListData-imap');
                return;
            }
            ctx.showToast(`开始获取主邮箱邮件列表`, 'getListData-imap');
            // fetch里面可以是fetch(`1:3`）这种取序号为1-3的信息的  也可以是可以是fetch(`1`）这种取序号为1的信息
            let startTime1 = new Date().getTime();
            let prefix: string = '';
            let buffer: string = '';
            let callback: DetailCallback = {
                messageStartCallback: (seqno: number) => {
                    console.log('Message #%d', seqno);
                    prefix = '(#' + seqno + ') ';
                },
                bodyStartCallback: () => {
                },
                bodyDataCallback: (data: string) => {
                    buffer += data;
                },
                bodyEndCallback: () => {
                },
                attributesCallback: (attrs: ImapMessageAttributes) => {
                    if (attrs && attrs.uid) {
                        ctx.uidList.push(attrs.uid + "");
                    }
                },
                messageEndCallback: () => {
                    console.log(prefix + 'Finished');
                },
                fetchErrorCallback: (err: Error) => {
                    console.log('Fetch error: ' + err);
                    ctx.showToast(`获取主邮箱邮件列表失败，信息是：${err.message}`, 'getListData-imap');
                },
                fetchEndCallback: () => {
                    let endTime1 = new Date().getTime();
                    let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                    console.log("IMAPClientTest : fetch averageTime : " + averageTime1 + "us");
                    console.log('Done fetching all messages!');
                    let jsonObj = buffer.split('\r\n\r\n');
                    if (!jsonObj) {
                        throw new Error('get message list fail');
                    }
                    for (let i = 0; i < jsonObj.length; i++) {
                        let childArr = jsonObj[i].split('\r\n');
                        let bean = new MsgListBean();
                        if (i < ctx.uidList.length) {
                            bean.uid = ctx.uidList[i];
                        }
                        for (let j = 0; j < childArr.length; j++) {
                            let child = childArr[j];
                            if (child && child.indexOf('Date') != -1) {
                                bean.Date = child;
                            }
                            else if (child && child.indexOf('From') != -1) {
                                bean.From = child;
                            }
                            else if (child && child.indexOf('To') != -1) {
                                bean.To = child;
                            }
                            else if (child && child.indexOf('Subject') != -1) {
                                bean.Subject = child;
                            }
                            else {
                                continue;
                            }
                        }
                        ctx.listData.push(bean);
                    }
                    ctx.showToast(`获取主邮箱邮件列表成功，数据是：${JSON.stringify(ctx.listData)}`, 'getListData-imap');
                    // GlobalObj?.getInstance()?.getClient()?.end();
                }
            };
            this.util?.getListData(ctx.startIndex, ctx.endIndex, callback);
        }
        catch (err) {
            ctx.showToast(`获取主邮箱邮件列表失败，信息是：${err.message}`, 'getListData-imap');
            throw err as Error;
        }
    }
    createMailData() {
        let msg: MsgSendBean = {
            text: 'IMAP协议测试上传的邮件',
            from: `${'鸿蒙搬砖工'} <${'xx@qq.com'}>`,
            to: 'xx@qq.com',
            cc: 'xx@163.com',
            bcc: 'xx@139.com',
            subject: '鸿蒙客户端IMAP协议的主题'
        };
        return JSON.stringify(msg);
    }
    appendMail() {
        const ctx = this;
        try {
            ctx.message = '';
            if (!GlobalObj?.getInstance()?.getClient() || !ctx.isLogin) {
                ctx.showToast('账号未登录，请登录后再试', 'appendMail-imap');
                return;
            }
            if (!ctx.isBoxOpen) {
                ctx.showToast('邮箱未打开，无法获取邮件列表', 'appendMail-imap');
                return;
            }
            let data = ctx.createMailData();
            if (!data || data.length < 1) {
                ctx.showToast('上传的邮件数据不可以为空', 'appendMail-imap');
                return;
            }
            ctx.showToast('开始上传邮件', 'appendMail-imap');
            let option: AppendOptions = {
                mailbox: 'INBOX',
                flags: ['Seen'],
                date: new Date(), //取值 Seen flagged等
            };
            let startTime1 = new Date().getTime();
            GlobalObj?.getInstance()?.getClient()?.append(data, option, (err: Error) => {
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("IMAPClientTest : append averageTime : " + averageTime1 + "us");
                if (err) {
                    ctx.showToast(`上传邮件失败,原因：${err.message}`, 'appendMail-imap');
                }
                else {
                    ctx.showToast('上传邮件成功', 'appendMail-imap');
                }
            });
        }
        catch (err) {
            ctx.showToast(`上传邮件出错：${err.message}`, 'appendMail-smtp');
        }
    }
    closeBox() {
        const ctx = this;
        try {
            ctx.message = '';
            ctx.showToast('开始关闭本文件夹', 'closeBox-imap');
            if (!GlobalObj?.getInstance()?.getClient() || !ctx.isLogin) {
                ctx.showToast('账号未登录，请登录后再试', 'closeBox-imap');
                return;
            }
            if (!ctx.isBoxOpen) {
                ctx.showToast('邮箱未打开，无法获取邮件列表', 'closeBox-imap');
                return;
            }
            let startTime1 = new Date().getTime();
            GlobalObj?.getInstance()?.getClient()?.closeBox((err: Error) => {
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("IMAPClientTest : closeBox averageTime : " + averageTime1 + "us");
                if (err) {
                    ctx.showToast(`关闭本文件夹失败,原因：${err.message}`, 'closeBox-imap');
                }
                else {
                    ctx.isBoxOpen = false;
                    ctx.showToast('关闭本文件夹成功', 'appendMail-imap');
                }
            });
        }
        catch (err) {
            ctx.showToast(`关闭本文件夹出错：${err.message}`, 'closeBox-smtp');
        }
    }
    sortMail() {
        const ctx = this;
        try {
            ctx.message = '';
            ctx.showToast('开始设置排序', 'sortMail-imap');
            if (!GlobalObj?.getInstance()?.getClient() || !ctx.isLogin) {
                ctx.showToast('账号未登录，请登录后再试', 'sortMail-imap');
                return;
            }
            if (!ctx.isBoxOpen) {
                ctx.showToast('邮箱未打开，无法获取邮件列表', 'sortMail-imap');
                return;
            }
            ctx.showToast('开始对邮件按照日期排序', 'sortMail-imap');
            let startTime1 = new Date().getTime();
            GlobalObj?.getInstance()?.getClient()?.sort(['DATE'], ['ALL'], (err: Error, uids: number[]) => {
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("IMAPClientTest : sort averageTime : " + averageTime1 + "us");
                if (err) {
                    ctx.showToast(`对邮件按照日期排序失败,原因：${err.message}`, 'sortMail-imap');
                }
                else {
                    ctx.showToast('对邮件按照日期排序成功', 'sortMail-imap');
                }
            });
        }
        catch (err) {
            ctx.showToast(`设置排序出错：${err.message}`, 'sortMail-smtp');
        }
    }
    search() {
        const ctx = this;
        try {
            ctx.message = '';
            ctx.showToast('开始搜索邮件', 'search-imap');
            if (!GlobalObj?.getInstance()?.getClient() || !ctx.isLogin) {
                ctx.showToast('账号未登录，请登录后再试', 'search-imap');
                return;
            }
            if (!ctx.isBoxOpen) {
                ctx.showToast('邮箱未打开，无法获取邮件列表', 'search-imap');
                return;
            }
            let startTime1 = new Date().getTime();
            GlobalObj?.getInstance()?.getClient()?.search(['RECENT'], (err: Error, uids: number[]) => {
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("IMAPClientTest : search averageTime : " + averageTime1 + "us");
                if (err) {
                    ctx.showToast(`搜索邮件失败,原因：${err.message}`, 'search-imap');
                }
                else {
                    ctx.showToast('搜索邮件成功 ' + JSON.stringify(uids), 'search-imap');
                }
            });
        }
        catch (err) {
            ctx.showToast(`搜索邮件出错：${err.message}`, 'search-smtp');
        }
    }
    /**
     * 给邮件打标记 比如删除 已读
     * Deleted \Flagged \Seen
     *
     */
    storeMail() {
        const ctx = this;
        ctx.message = '';
        if (!GlobalObj?.getInstance()?.getClient() || !ctx.isLogin) {
            ctx.showToast('账号未登录，请登录后再试', 'search-imap');
            return;
        }
        if (!ctx.isBoxOpen) {
            ctx.showToast('邮箱未打开，无法获取邮件列表', 'search-imap');
            return;
        }
        if (!ctx.listData || ctx.listData.length < 1) {
            ctx.showToast('当前邮箱中暂无可用的消息', 'storeMail---IMAP');
            return;
        }
        let uid = '';
        for (let i = 0; i < ctx.listData.length; i++) {
            if (ctx.listData[i] && ctx.listData[i].uid && ctx.listData[i].uid.toString().length > 0) {
                uid = ctx.listData[1].uid;
                break;
            }
        }
        if (uid && uid.length > 0) {
            ctx.addDeleteFlag(uid);
        }
        else {
            ctx.showToast('暂无可以操作的邮件', 'storeMail---IMAP');
        }
    }
    addDeleteFlag(uid: string) {
        const ctx = this;
        try {
            ctx.showToast('开始给邮件打删除标记', 'addDeleteFlag-imap');
            GlobalObj?.getInstance()?.getClient()?.addFlags(uid, '\\Deleted', (err: Error) => {
                if (err) {
                    ctx.showToast(`给邮件打删除标记失败,原因：${err.message}`, 'addDeleteFlag-imap');
                }
                else {
                    ctx.showToast('给邮件打删除标记成功', 'storeMail-imap');
                    ctx.expungeMail(uid);
                }
            });
        }
        catch (err) {
            ctx.showToast(`给邮件打删除标记出错：${err.message}`, 'storeMail-smtp');
        }
    }
    expungeMail(uid: string) {
        const ctx = this;
        try {
            ctx.showToast('开始删除所有的标志为DELETED的邮件，EXPUNGE删除的邮件将不可以恢复', 'expungeMail-imap');
            let startTime1 = new Date().getTime();
            GlobalObj?.getInstance()?.getClient()?.expunge(uid, (err: Error) => {
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("IMAPClientTest : expunge averageTime : " + averageTime1 + "us");
                if (err) {
                    ctx.showToast(`永久删除失败,原因：${err.message}`, 'expungeMail-imap');
                }
                else {
                    ctx.showToast(`永久删除成功`, 'expungeMail-imap');
                }
            });
        }
        catch (err) {
            ctx.showToast(`永久删除出错：${err.message}`, 'expungeMail-smtp');
        }
    }
    copyMail() {
        const ctx = this;
        try {
            ctx.message = '';
            if (!GlobalObj?.getInstance()?.getClient() || !ctx.isLogin) {
                ctx.showToast('账号未登录，请登录后再试', 'copyMail-imap');
                return;
            }
            if (!ctx.isBoxOpen) {
                ctx.showToast('邮箱未打开，无法获取邮件列表', 'copyMail-imap');
                return;
            }
            if (!ctx.listData || ctx.listData.length < 1) {
                ctx.showToast('当前邮箱中暂无可用的消息', 'copyMail---IMAP');
                return;
            }
            let uid = ctx.listData[0].uid;
            if (!uid || uid.length < 1) {
                ctx.showToast('当前邮箱中暂无可用的消息', 'copyMail---IMAP');
                return;
            }
            if (!ctx.folderList || ctx.folderList.length < 1) {
                ctx.showToast('无可用的邮箱', 'copyMail---IMAP');
                return;
            }
            let selectFoler = '';
            if (ctx.folderList) {
                let count = 0;
                for (let i = 0; i < ctx.folderList.length; i++) {
                    if (ctx.folderList[i] && ctx.folderList[i].length > 0 && ctx.folderList[i] != ctx.folderName) {
                        count++;
                        selectFoler = ctx.folderList[i];
                    }
                }
                if (count === 0) {
                    ctx.showToast('无可用的邮箱', 'copyMail---IMAP');
                    return;
                }
            }
            ctx.showToast(`复制邮件开始`, 'copyMail-imap');
            let startTime1 = new Date().getTime();
            GlobalObj?.getInstance()?.getClient()?.copy(uid, selectFoler, (err: Error) => {
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("IMAPClientTest : copy averageTime : " + averageTime1 + "us");
                if (err) {
                    ctx.showToast(`复制邮件失败,原因：${err.message}`, 'copyMail-imap');
                }
                else {
                    ctx.showToast('复制邮件成功，请去测试的邮箱查看是否复制成功，这里不通过日志展示 ', 'copyMail-imap');
                }
            });
        }
        catch (err) {
            ctx.showToast(`复制邮件出错：${err.message}`, 'copyMail-smtp');
        }
    }
    moveMail() {
        const ctx = this;
        try {
            ctx.message = '';
            if (!GlobalObj?.getInstance()?.getClient() || !ctx.isLogin) {
                ctx.showToast('账号未登录，请登录后再试', 'moveMail-imap');
                return;
            }
            if (!ctx.isBoxOpen) {
                ctx.showToast('邮箱未打开，无法获取邮件列表', 'moveMail-imap');
                return;
            }
            if (!ctx.listData || ctx.listData.length < 1) {
                ctx.showToast('当前邮箱中暂无可用的消息', 'moveMail---IMAP');
                return;
            }
            let uid = ctx.listData[0].uid;
            if (!uid || uid.length < 1) {
                ctx.showToast('当前邮箱中暂无可用的消息', 'moveMail---IMAP');
                return;
            }
            if (!ctx.folderList || ctx.folderList.length < 1) {
                ctx.showToast('无可用的邮箱', 'moveMail---IMAP');
                return;
            }
            let selectFoler = '';
            if (ctx.folderList) {
                let count = 0;
                for (let i = 0; i < ctx.folderList.length; i++) {
                    if (ctx.folderList[i] && ctx.folderList[i].length > 0 && ctx.folderList[i] != ctx.folderName) {
                        count++;
                        selectFoler = ctx.folderList[i];
                    }
                }
                if (count === 0) {
                    ctx.showToast('无可用的邮箱', 'moveMail---IMAP');
                    return;
                }
            }
            ctx.showToast(`移动邮件开始，从主邮箱移动到 ${selectFoler}`, 'moveMail-imap');
            let startTime1 = new Date().getTime();
            GlobalObj?.getInstance()?.getClient()?.move(uid, selectFoler, (err: Error) => {
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("IMAPClientTest : move averageTime : " + averageTime1 + "us");
                if (err) {
                    ctx.showToast(`移动邮件失败,原因：${err.message}`, 'moveMail-imap');
                }
                else {
                    ctx.showToast('移动邮件成功 ', 'moveMail-imap');
                    ctx.showToast(`移动邮件成功之后，请到主邮箱查看是否少了一封邮件，请到${selectFoler} 查看是否新增了一封邮件，然后点击 关闭邮箱 以及获取邮箱列表刷新数据以便进行其他操作 `, 'moveMail-imap');
                }
            });
        }
        catch (err) {
            ctx.showToast(`移动邮件出错：${err.message}`, 'moveMail-smtp');
        }
    }
    addFlag() {
        const ctx = this;
        try {
            ctx.message = '';
            if (!GlobalObj?.getInstance()?.getClient() || !ctx.isLogin) {
                ctx.showToast('账号未登录，请登录后再试', 'addFlag-imap');
                return;
            }
            if (!ctx.isBoxOpen) {
                ctx.showToast('邮箱未打开，无法获取邮件列表', 'addFlag-imap');
                return;
            }
            if (!ctx.listData || ctx.listData.length < 1) {
                ctx.showToast('当前邮箱中暂无可用的消息', 'addFlag---IMAP');
                return;
            }
            let uid = ctx.listData[0].uid;
            if (!uid || uid.length < 1) {
                ctx.showToast('当前邮箱中暂无可用的消息', 'addFlag---IMAP');
                return;
            }
            ctx.showToast('开始给邮件添加已读标记', 'addFlag-imap');
            let startTime1 = new Date().getTime();
            GlobalObj?.getInstance()?.getClient()?.addFlags(uid, '\\Seen', (err: Error) => {
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("IMAPClientTest : addFlags averageTime : " + averageTime1 + "us");
                if (err) {
                    ctx.showToast(`给邮件添加已读标记失败,原因：${err.message}`, 'addFlag-imap');
                }
                else {
                    ctx.showToast('给邮件添加已读标记成功', 'addFlag-imap');
                }
            });
        }
        catch (err) {
            ctx.showToast(`给邮件添加已读标记出错：${err.message}`, 'storeMail-smtp');
        }
    }
    setFlag() {
        const ctx = this;
        try {
            ctx.message = '';
            if (!GlobalObj?.getInstance()?.getClient() || !ctx.isLogin) {
                ctx.showToast('账号未登录，请登录后再试', 'setFlag-imap');
                return;
            }
            if (!ctx.isBoxOpen) {
                ctx.showToast('邮箱未打开，无法获取邮件列表', 'setFlag-imap');
                return;
            }
            if (!ctx.listData || ctx.listData.length < 1) {
                ctx.showToast('当前邮箱中暂无可用的消息', 'setFlag---IMAP');
                return;
            }
            let uid = ctx.listData[0].uid;
            if (!uid || uid.length < 1) {
                ctx.showToast('当前邮箱中暂无可用的消息', 'setFlag---IMAP');
                return;
            }
            ctx.showToast('开始给邮件设置已读标记', 'setFlag-imap');
            let startTime1 = new Date().getTime();
            GlobalObj?.getInstance()?.getClient()?.setFlags(uid, '\\Seen', (err: Error) => {
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("IMAPClientTest : setFlags averageTime : " + averageTime1 + "us");
                if (err) {
                    ctx.showToast(`给邮件设置已读标记失败,原因：${err.message}`, 'setFlag-imap');
                }
                else {
                    ctx.showToast('给邮件设置已读标记成功', 'setFlag-imap');
                }
            });
        }
        catch (err) {
            ctx.showToast(`给邮件设置已读标记出错：${err.message}`, 'setFlag-smtp');
        }
    }
    deleteFlag() {
        const ctx = this;
        try {
            ctx.message = '';
            if (!GlobalObj?.getInstance()?.getClient() || !ctx.isLogin) {
                ctx.showToast('账号未登录，请登录后再试', 'deleteFlag-imap');
                return;
            }
            if (!ctx.isBoxOpen) {
                ctx.showToast('邮箱未打开，无法获取邮件列表', 'deleteFlag-imap');
                return;
            }
            if (!ctx.listData || ctx.listData.length < 1) {
                ctx.showToast('当前邮箱中暂无可用的消息', 'deleteFlag---IMAP');
                return;
            }
            let uid = ctx.listData[0].uid;
            if (!uid || uid.length < 1) {
                ctx.showToast('当前邮箱中暂无可用的消息', 'deleteFlag---IMAP');
                return;
            }
            ctx.showToast('开始给邮件取消已读标记', 'deleteFlag-imap');
            let startTime1 = new Date().getTime();
            GlobalObj?.getInstance()?.getClient()?.delFlags(uid, '\\Seen', (err: Error) => {
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("IMAPClientTest : delFlags averageTime : " + averageTime1 + "us");
                if (err) {
                    ctx.showToast(`给邮件取消已读标记失败,原因：${err.message}`, 'deleteFlag-imap');
                }
                else {
                    ctx.showToast('给邮件取消已读标记成功', 'deleteFlag-imap');
                }
            });
        }
        catch (err) {
            ctx.showToast(`给邮件取消已读标记出错：${err.message}`, 'deleteFlag-smtp');
        }
    }
    addKeywords() {
        const ctx = this;
        try {
            ctx.message = '';
            if (!GlobalObj?.getInstance()?.getClient() || !ctx.isLogin) {
                ctx.showToast('账号未登录，请登录后再试', 'addKeywords-imap');
                return;
            }
            if (!ctx.isBoxOpen) {
                ctx.showToast('邮箱未打开，无法获取邮件列表', 'addKeywords-imap');
                return;
            }
            if (!ctx.listData || ctx.listData.length < 1) {
                ctx.showToast('当前邮箱中暂无可用的消息', 'addKeywords---IMAP');
                return;
            }
            let uid = ctx.listData[0].uid;
            if (!uid || uid.length < 1) {
                ctx.showToast('当前邮箱中暂无可用的消息', 'addKeywords---IMAP');
                return;
            }
            ctx.showToast('开始给邮件添加关键字', 'addKeywords-imap');
            let startTime1 = new Date().getTime();
            GlobalObj?.getInstance()?.getClient()?.addKeywords(uid, '鸿蒙关键字', (err: Error) => {
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("IMAPClientTest : addKeywords averageTime : " + averageTime1 + "us");
                if (err) {
                    ctx.showToast(`给邮件添加关键字失败,原因：${err.message}`, 'addKeywords-imap');
                }
                else {
                    ctx.showToast('给邮件添加关键字成功', 'addKeywords-imap');
                }
            });
        }
        catch (err) {
            ctx.showToast(`给邮件添加关键字出错：${err.message}`, 'addKeywords-smtp');
        }
    }
    setKeywords() {
        const ctx = this;
        try {
            ctx.message = '';
            if (!GlobalObj?.getInstance()?.getClient() || !ctx.isLogin) {
                ctx.showToast('账号未登录，请登录后再试', 'setKeywords-imap');
                return;
            }
            if (!ctx.isBoxOpen) {
                ctx.showToast('邮箱未打开，无法获取邮件列表', 'setKeywords-imap');
                return;
            }
            if (!ctx.listData || ctx.listData.length < 1) {
                ctx.showToast('当前邮箱中暂无可用的消息', 'setKeywords---IMAP');
                return;
            }
            let uid = ctx.listData[0].uid;
            if (!uid || uid.length < 1) {
                ctx.showToast('当前邮箱中暂无可用的消息', 'setKeywords---IMAP');
                return;
            }
            ctx.showToast('开始给邮件设置关键字', 'setKeywords-imap');
            let startTime1 = new Date().getTime();
            GlobalObj?.getInstance()?.getClient()?.setKeywords(uid, '鸿蒙关键字', (err: Error) => {
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("IMAPClientTest : setKeywords averageTime : " + averageTime1 + "us");
                if (err) {
                    ctx.showToast(`给邮件设置关键字失败,原因：${err.message}`, 'setKeywords-imap');
                }
                else {
                    ctx.showToast('给邮件设置关键字成功', 'setKeywords-imap');
                }
            });
        }
        catch (err) {
            ctx.showToast(`给邮件设置关键字出错：${err.message}`, 'setKeywords-smtp');
        }
    }
    delKeywords() {
        const ctx = this;
        try {
            ctx.message = '';
            if (!GlobalObj?.getInstance()?.getClient() || !ctx.isLogin) {
                ctx.showToast('账号未登录，请登录后再试', 'delKeywords-imap');
                return;
            }
            if (!ctx.isBoxOpen) {
                ctx.showToast('邮箱未打开，无法获取邮件列表', 'delKeywords-imap');
                return;
            }
            if (!ctx.listData || ctx.listData.length < 1) {
                ctx.showToast('当前邮箱中暂无可用的消息', 'delKeywords---IMAP');
                return;
            }
            let uid = ctx.listData[0].uid;
            if (!uid || uid.length < 1) {
                ctx.showToast('当前邮箱中暂无可用的消息', 'delKeywords---IMAP');
                return;
            }
            ctx.showToast('开始给邮件删除关键字', 'delKeywords-imap');
            let startTime1 = new Date().getTime();
            GlobalObj?.getInstance()?.getClient()?.delKeywords(uid, '鸿蒙关键字', (err: Error) => {
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("IMAPClientTest : delKeywords averageTime : " + averageTime1 + "us");
                if (err) {
                    ctx.showToast(`给邮件删除关键字失败,原因：${err.message}`, 'delKeywords-imap');
                }
                else {
                    ctx.showToast('给邮件删除关键字成功', 'delKeywords-imap');
                }
            });
        }
        catch (err) {
            ctx.showToast(`给邮件删除关键字出错：${err.message}`, 'delKeywords-smtp');
        }
    }
    getMsgDetail() {
        const ctx = this;
        try {
            ctx.message = '';
            if (!GlobalObj?.getInstance()?.getClient() || !ctx.isLogin) {
                ctx.showToast('账号未登录，请登录后再试', 'getMsgDetail-imap');
                return;
            }
            if (!ctx.isBoxOpen) {
                ctx.showToast('邮箱未打开，无法获取邮件列表', 'getMsgDetail-imap');
                return;
            }
            if (!ctx.listData || ctx.listData.length < 1) {
                ctx.showToast('当前邮箱中暂无可用的消息', 'getMsgDetail---IMAP');
                return;
            }
            ctx.showToast('开始获取整个邮件体', 'getMsgDetail-imap');
            let startTime1 = new Date().getTime();
            let prefix: string = '';
            let buffer: string = '';
            let callback: DetailCallback = {
                messageStartCallback: (seqno: number) => {
                    console.log('Message #%d', seqno);
                    prefix = '(#' + seqno + ') ';
                },
                bodyStartCallback: () => {
                },
                bodyDataCallback: (data: string) => {
                    buffer += data;
                },
                bodyEndCallback: () => {
                    let endTime1 = new Date().getTime();
                    let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                    console.log("IMAPClientTest : fetch detail averageTime : " + averageTime1 + "us");
                    try {
                        ctx.showToast(`获取整个邮件体成功,为防止内容过多造成的卡死，只取前1000字符长度显示：${'\r\n'}${buffer}`, 'getMsgDetail-imap');
                    }
                    catch (err) {
                        ctx.showToast(`获取整个邮件体失败：${err.message}`, 'getMsgDetail-smtp');
                    }
                },
                attributesCallback: (attrs: ImapMessageAttributes) => {
                    if (attrs && attrs.uid) {
                        ctx.uidList.push(attrs.uid + "");
                    }
                },
                messageEndCallback: () => {
                },
                fetchErrorCallback: (err: Error) => {
                    ctx.showToast(`获取整个邮件体失败：${err.message}`, 'getMsgDetail-smtp');
                },
                fetchEndCallback: () => {
                }
            };
            this.util?.getDetail(1, callback);
        }
        catch (err) {
            ctx.showToast(`获取整个邮件体出错：${err.message}`, 'getMsgDetail-smtp');
        }
    }
}
loadDocument(new TestInterfacePage("1", undefined, {}));
