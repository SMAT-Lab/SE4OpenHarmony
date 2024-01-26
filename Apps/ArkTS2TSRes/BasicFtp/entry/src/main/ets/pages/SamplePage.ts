interface SamplePage_Params {
    message?: string;
    secure?: boolean;
    user?: string;
    password?: string;
    host?: string;
    port?: number;
    secureOptions?: socket.TLSConnectOptions | null;
    remoteRoot?: string | null;
    currentFileList?: FileInfo[];
    localUploadFilePath?: string | null;
    localUploadFileDir?: string | null;
    localDownloadFilePath?: string | null;
    localDownloadFileDir?: string | null;
    selectFilePath?: string | null;
    selectDirPath?: string | null;
    isShowLog?: boolean;
    isLogin?: boolean;
    textValue?: string;
    inputValue?: string;
    operationType?: string;
    ftpUtil?: NoTlsUtil | null;
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
    return "SamplePage_" + ++__generate__Id;
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
import NoTlsUtil from '../utils/FtpApiUtil';
import { AccessOptions, FileInfo, FileType, FTPResponse, UnixPermissions } from '@ohos/basic-ftp';
import fs from '@ohos.file.fs';
import buffer from '@ohos.buffer';
import socket from '@ohos.net.socket';
import promptAction from '@ohos.promptAction';
import { ToolType } from '@ohos.multimodalInput.touchEvent';
import GlobalObj from '../GlobalObj';
/**
 * tips:一旦调用setWorkingDirectory 设置了当前工作目录 远程地址remotePath只需要写文件名，否则会报错，仅限于操作本文件夹内的文件
 * 设置工作目录之前，remotePath = 'Users\\Administrator\\Desktop\\commonsNet\\ftp\\serverReceived.txt'
 * 设置工作目录之后 remotePath = 'serverReceived.txt'
 */
const TAG = 'zdy';
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
        Text.create('请输入文件夹名称');
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
        Text.create('Tips:输入的文件夹如果不存在则会自动在远程服务器创建，并且是在当前工作目录里面创建，调用该方法之后工作目录会自动切换到该目录');
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
class SamplePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__secure = new ObservedPropertySimple(false, this, "secure");
        this.__user = new ObservedPropertySimple('xxx', this, "user");
        this.__password = new ObservedPropertySimple('xxx', this, "password");
        this.__host = new ObservedPropertySimple('xxx', this, "host");
        this.__port = new ObservedPropertySimple(21, this, "port");
        this.__secureOptions = new ObservedPropertyObject(null, this, "secureOptions");
        this.__remoteRoot = new ObservedPropertyObject(null, this, "remoteRoot");
        this.__currentFileList = new ObservedPropertyObject([], this, "currentFileList");
        this.__localUploadFilePath = new ObservedPropertyObject(null, this, "localUploadFilePath");
        this.__localUploadFileDir = new ObservedPropertyObject(null, this, "localUploadFileDir");
        this.__localDownloadFilePath = new ObservedPropertyObject(null, this, "localDownloadFilePath");
        this.__localDownloadFileDir = new ObservedPropertyObject(null, this, "localDownloadFileDir");
        this.__selectFilePath = new ObservedPropertyObject(null, this, "selectFilePath");
        this.__selectDirPath = new ObservedPropertyObject(null, this, "selectDirPath");
        this.__isShowLog = new ObservedPropertySimple(false, this, "isShowLog");
        this.__isLogin = new ObservedPropertySimple(false, this, "isLogin");
        this.__textValue = new ObservedPropertySimple('', this, "textValue");
        this.__inputValue = new ObservedPropertySimple('click me', this, "inputValue");
        this.__operationType = new ObservedPropertySimple('', this, "operationType");
        this.ftpUtil = null;
        this.option = {
            ALPNProtocols: ["spdy/1", "http/1.1"],
            address: {
                address: '',
                port: 50000,
                family: 1
            },
            secureOptions: {
                key: '',
                cert: '',
                ca: [''],
                password: '',
                protocols: [socket.Protocol.TLSv12, socket.Protocol.TLSv13],
                useRemoteCipherPrefer: true,
                signatureAlgorithms: "rsa_pss_rsae_sha256:ECDSA+SHA256",
                cipherSuite: "AES256-SHA256"
            }
        };
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogDiy("3", this, {
                    cancel: () => {
                        this.showToast(`关闭了对话框，取消在服务器创建新的文件夹`, 'CustomDialogDiy-cancel');
                    },
                    confirm: () => {
                        if (this.operationType === 'dir') {
                            this.showToast(`在服务器创建新的文件夹`, 'CustomDialogDiy-cancel');
                            this.ensureRemotePath();
                        }
                        else if (this.operationType === 'rename') {
                            this.showToast(`在服务器创建新的文件夹`, 'CustomDialogDiy-cancel');
                            this.renameFile();
                        }
                        else if (this.operationType === 'uploadSingleFile') {
                            this.uploadSingleFile();
                        }
                        else if (this.operationType === 'uploadDir') {
                            this.uploadDir();
                        }
                        else {
                            this.showToast(`未知操作类型`, 'CustomDialogDiy-unknow');
                        }
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
    updateWithValueParams(params: SamplePage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.secure !== undefined) {
            this.secure = params.secure;
        }
        if (params.user !== undefined) {
            this.user = params.user;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.host !== undefined) {
            this.host = params.host;
        }
        if (params.port !== undefined) {
            this.port = params.port;
        }
        if (params.secureOptions !== undefined) {
            this.secureOptions = params.secureOptions;
        }
        if (params.remoteRoot !== undefined) {
            this.remoteRoot = params.remoteRoot;
        }
        if (params.currentFileList !== undefined) {
            this.currentFileList = params.currentFileList;
        }
        if (params.localUploadFilePath !== undefined) {
            this.localUploadFilePath = params.localUploadFilePath;
        }
        if (params.localUploadFileDir !== undefined) {
            this.localUploadFileDir = params.localUploadFileDir;
        }
        if (params.localDownloadFilePath !== undefined) {
            this.localDownloadFilePath = params.localDownloadFilePath;
        }
        if (params.localDownloadFileDir !== undefined) {
            this.localDownloadFileDir = params.localDownloadFileDir;
        }
        if (params.selectFilePath !== undefined) {
            this.selectFilePath = params.selectFilePath;
        }
        if (params.selectDirPath !== undefined) {
            this.selectDirPath = params.selectDirPath;
        }
        if (params.isShowLog !== undefined) {
            this.isShowLog = params.isShowLog;
        }
        if (params.isLogin !== undefined) {
            this.isLogin = params.isLogin;
        }
        if (params.textValue !== undefined) {
            this.textValue = params.textValue;
        }
        if (params.inputValue !== undefined) {
            this.inputValue = params.inputValue;
        }
        if (params.operationType !== undefined) {
            this.operationType = params.operationType;
        }
        if (params.ftpUtil !== undefined) {
            this.ftpUtil = params.ftpUtil;
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
        this.__secure.aboutToBeDeleted();
        this.__user.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__host.aboutToBeDeleted();
        this.__port.aboutToBeDeleted();
        this.__secureOptions.aboutToBeDeleted();
        this.__remoteRoot.aboutToBeDeleted();
        this.__currentFileList.aboutToBeDeleted();
        this.__localUploadFilePath.aboutToBeDeleted();
        this.__localUploadFileDir.aboutToBeDeleted();
        this.__localDownloadFilePath.aboutToBeDeleted();
        this.__localDownloadFileDir.aboutToBeDeleted();
        this.__selectFilePath.aboutToBeDeleted();
        this.__selectDirPath.aboutToBeDeleted();
        this.__isShowLog.aboutToBeDeleted();
        this.__isLogin.aboutToBeDeleted();
        this.__textValue.aboutToBeDeleted();
        this.__inputValue.aboutToBeDeleted();
        this.__operationType.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
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
    private __user: ObservedPropertySimple<string>;
    get user() {
        return this.__user.get();
    }
    set user(newValue: string) {
        this.__user.set(newValue);
    }
    private __password: ObservedPropertySimple<string>;
    get password() {
        return this.__password.get();
    }
    set password(newValue: string) {
        this.__password.set(newValue);
    }
    private __host: ObservedPropertySimple<string>;
    get host() {
        return this.__host.get();
    }
    set host(newValue: string) {
        this.__host.set(newValue);
    }
    private __port: ObservedPropertySimple<number>;
    get port() {
        return this.__port.get();
    }
    set port(newValue: number) {
        this.__port.set(newValue);
    }
    private __secureOptions: ObservedPropertyObject<socket.TLSConnectOptions | null>;
    get secureOptions() {
        return this.__secureOptions.get();
    }
    set secureOptions(newValue: socket.TLSConnectOptions | null) {
        this.__secureOptions.set(newValue);
    }
    private __remoteRoot: ObservedPropertyObject<string | null>;
    get remoteRoot() {
        return this.__remoteRoot.get();
    }
    set remoteRoot(newValue: string | null) {
        this.__remoteRoot.set(newValue);
    }
    private __currentFileList: ObservedPropertyObject<FileInfo[]>;
    get currentFileList() {
        return this.__currentFileList.get();
    }
    set currentFileList(newValue: FileInfo[]) {
        this.__currentFileList.set(newValue);
    }
    private __localUploadFilePath: ObservedPropertyObject<string | null>;
    get localUploadFilePath() {
        return this.__localUploadFilePath.get();
    }
    set localUploadFilePath(newValue: string | null) {
        this.__localUploadFilePath.set(newValue);
    }
    private __localUploadFileDir: ObservedPropertyObject<string | null>;
    get localUploadFileDir() {
        return this.__localUploadFileDir.get();
    }
    set localUploadFileDir(newValue: string | null) {
        this.__localUploadFileDir.set(newValue);
    }
    private __localDownloadFilePath: ObservedPropertyObject<string | null>;
    get localDownloadFilePath() {
        return this.__localDownloadFilePath.get();
    }
    set localDownloadFilePath(newValue: string | null) {
        this.__localDownloadFilePath.set(newValue);
    }
    private __localDownloadFileDir: ObservedPropertyObject<string | null>;
    get localDownloadFileDir() {
        return this.__localDownloadFileDir.get();
    }
    set localDownloadFileDir(newValue: string | null) {
        this.__localDownloadFileDir.set(newValue);
    }
    private __selectFilePath: ObservedPropertyObject<string | null>;
    get selectFilePath() {
        return this.__selectFilePath.get();
    }
    set selectFilePath(newValue: string | null) {
        this.__selectFilePath.set(newValue);
    }
    private __selectDirPath: ObservedPropertyObject<string | null>;
    get selectDirPath() {
        return this.__selectDirPath.get();
    }
    set selectDirPath(newValue: string | null) {
        this.__selectDirPath.set(newValue);
    }
    private __isShowLog: ObservedPropertySimple<boolean>;
    get isShowLog() {
        return this.__isShowLog.get();
    }
    set isShowLog(newValue: boolean) {
        this.__isShowLog.set(newValue);
    }
    private __isLogin: ObservedPropertySimple<boolean>;
    get isLogin() {
        return this.__isLogin.get();
    }
    set isLogin(newValue: boolean) {
        this.__isLogin.set(newValue);
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
    private __operationType: ObservedPropertySimple<string>;
    get operationType() {
        return this.__operationType.get();
    }
    set operationType(newValue: string) {
        this.__operationType.set(newValue);
    }
    private ftpUtil: NoTlsUtil | null;
    private option: socket.TLSConnectOptions;
    private dialogController: CustomDialogController | null;
    SubMenu(parent = null) {
        Menu.create();
        MenuItem.create({ content: '获取当前工作目录', labelInfo: 'getCurrentDirectory' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.getCurrentDirectory();
            }
        });
        MenuItem.pop();
        MenuItem.create({ content: '返回上一级', labelInfo: 'back' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.backToParent();
            }
        });
        MenuItem.pop();
        MenuItem.create({ content: '获取文件大小', labelInfo: 'getFileSize' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.getFileSize();
            }
        });
        MenuItem.pop();
        MenuItem.create({ content: '获取文件最后修改时间', labelInfo: 'getLastModifyTime' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.getLastModifyTime();
            }
        });
        MenuItem.pop();
        MenuItem.create({ content: '获取服务器支持的能力', labelInfo: 'getServerFeatures' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.getServerFeatures();
            }
        });
        MenuItem.pop();
        MenuItem.create({ content: '删除单个文件', labelInfo: 'deleteSingleFile' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.deleteSingleFile();
            }
        });
        MenuItem.pop();
        MenuItem.create({ content: '确保服务器文件地址是否存在(若不存在会自动生成)', labelInfo: 'ensureRemotePath' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.operationType = 'dir';
                if (this.dialogController) {
                    this.dialogController.open();
                }
            }
            else {
                this.operationType = '';
            }
        });
        MenuItem.pop();
        MenuItem.create({ content: '删除空目录', labelInfo: 'deleteEmptyDirectory' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.deleteEmptyDirectory();
            }
        });
        MenuItem.pop();
        MenuItem.create({ content: '删除文件夹', labelInfo: 'deleteAll' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.deleteAll();
            }
        });
        MenuItem.pop();
        MenuItem.create({ content: '清空当前工作目录', labelInfo: 'deleteAllButSelf' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.deleteAllButSelf();
            }
        });
        MenuItem.pop();
        MenuItem.create({ content: '重命名文件', labelInfo: 'renameFile' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.operationType = 'rename';
                if (this.dialogController) {
                    this.dialogController.open();
                }
            }
            else {
                this.operationType = '';
            }
        });
        MenuItem.pop();
        Menu.pop();
    }
    aboutToAppear() {
        if (!this.ftpUtil) {
            this.ftpUtil = new NoTlsUtil(GlobalObj?.getInstance()?.getContext() ? GlobalObj?.getInstance()?.getContext() : getContext(this));
            this.ftpUtil.setTag();
        }
    }
    aboutToDisappear() {
        this.dialogController = null;
        if (this.ftpUtil) {
            this.ftpUtil.close();
        }
    }
    showToast(text: string, name = '测试') {
        const ctx = this;
        if (ctx.ftpUtil) {
            ctx.isLogin = ctx.ftpUtil.getLogin();
        }
        let index = ctx.message.lastIndexOf("\r\n");
        let newStr = ctx.message.substring(index, ctx.message.length);
        if (newStr.indexOf('当前上传长度') != -1) {
            let front = ctx.message.substring(0, index);
            ctx.message = front + "\r\n" + text;
        }
        else if (newStr.indexOf('当前下载长度') != -1) {
            let index = ctx.message.lastIndexOf("\r\n");
            let front = ctx.message.substring(0, index);
            ctx.message = front + "\r\n" + text;
        }
        else {
            ctx.message = ctx.message + "\r\n" + text;
        }
        console.log(`${TAG}---${name}--->${text}`);
        promptAction.showToast({
            message: text,
            duration: 2000,
            bottom: 50
        });
    }
    render() {
        If.create();
        if (!this.isLogin) {
            If.branchId(0);
            Row.create();
            Row.width('100%');
            Row.height('100%');
            Column.create();
            Column.justifyContent(FlexAlign.Center);
            Column.height('100%');
            Column.width('100%');
            Flex.create({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center });
            Text.create('服务器地址：');
            Text.fontSize(20);
            Text.height(50);
            Text.width(200);
            Text.margin({ left: 10 });
            Text.textAlign(TextAlign.Center);
            Text.fontWeight(FontWeight.Bold);
            Text.pop();
            TextInput.create({ placeholder: '请输入服务器地址', text: this.host });
            TextInput.width('100%');
            TextInput.height(50);
            TextInput.margin({ left: 15 });
            TextInput.borderWidth(2);
            TextInput.borderColor(Color.Gray);
            TextInput.type(InputType.Normal);
            TextInput.onChange((data) => {
                this.host = data;
            });
            Flex.pop();
            Flex.create({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center });
            Text.create('端口号：');
            Text.fontSize(20);
            Text.height(50);
            Text.width(200);
            Text.margin({ left: 10 });
            Text.textAlign(TextAlign.Center);
            Text.fontWeight(FontWeight.Bold);
            Text.pop();
            TextInput.create({ placeholder: '请输入端口号址', text: '21' });
            TextInput.width('100%');
            TextInput.height(50);
            TextInput.margin({ left: 15 });
            TextInput.borderWidth(2);
            TextInput.borderColor(Color.Gray);
            TextInput.type(InputType.Normal);
            TextInput.onChange((data) => {
                this.port = Number.parseInt(data);
            });
            Flex.pop();
            Flex.create({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center });
            Flex.margin({ top: 20 });
            Text.create('账号：');
            Text.fontSize(20);
            Text.height(50);
            Text.width(80);
            Text.margin({ left: 10 });
            Text.textAlign(TextAlign.Center);
            Text.fontWeight(FontWeight.Bold);
            Text.pop();
            TextInput.create({ placeholder: '请输入账号', text: this.user });
            TextInput.width('100%');
            TextInput.height(50);
            TextInput.margin({ left: 15 });
            TextInput.borderWidth(2);
            TextInput.borderColor(Color.Gray);
            TextInput.type(InputType.Normal);
            TextInput.onChange((data) => {
                this.user = data;
            });
            Flex.pop();
            Flex.create({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center });
            Flex.margin({ top: 20 });
            Text.create('密码：');
            Text.fontSize(20);
            Text.height(50);
            Text.width(80);
            Text.margin({ left: 10 });
            Text.textAlign(TextAlign.Center);
            Text.fontWeight(FontWeight.Bold);
            Text.pop();
            TextInput.create({ placeholder: '请输入密码', text: this.password });
            TextInput.width('100%');
            TextInput.height(50);
            TextInput.borderWidth(2);
            TextInput.margin({ left: 15 });
            TextInput.borderColor(Color.Gray);
            TextInput.type(InputType.Normal);
            TextInput.onChange((data) => {
                this.password = data;
            });
            Flex.pop();
            Flex.create({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center });
            Flex.margin({ top: 20 });
            Text.create('是否开启SSL/TLS');
            Text.fontSize(20);
            Text.height(50);
            Text.margin({ left: 15 });
            Text.textAlign(TextAlign.Center);
            Text.fontWeight(FontWeight.Bold);
            Text.pop();
            Checkbox.create({ name: '是否开启SSL/TLS', group: 'ssl' });
            Checkbox.height(40);
            Checkbox.select(false);
            Checkbox.margin({ left: 10 });
            Checkbox.selectedColor(Color.Blue);
            Checkbox.onChange((value) => {
                this.secure = value;
            });
            Checkbox.pop();
            Flex.pop();
            Button.createWithLabel('登录');
            Button.margin(20);
            Button.width('80%');
            Button.height(50);
            Button.backgroundColor(Color.Blue);
            Button.fontColor(Color.White);
            Button.onClick(() => {
                this.loginServer();
            });
            Button.pop();
            Column.pop();
            Row.pop();
        }
        else {
            If.branchId(1);
            Row.create();
            Row.width('100%');
            Row.height('100%');
            Column.create();
            Column.margin(15);
            Column.border({
                width: 2,
                color: Color.Red,
                radius: 10,
                style: BorderStyle.Solid
            });
            Column.width('100%');
            Column.height('100%');
            Flex.create({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Start });
            Flex.padding(20);
            MenuItem.create({
                startIcon: $r('app.media.icon'),
                content: '更多操作',
                endIcon: $r('app.media.more'),
                builder: this.SubMenu.bind(this)
            });
            MenuItem.bindMenu({ builder: this.SubMenu.bind(this) });
            MenuItem.pop();
            Text.create(`当前文件夹：${this.remoteRoot}`);
            Text.layoutWeight(1);
            Text.fontSize(12);
            Text.textAlign(TextAlign.Start);
            Text.height(50);
            Text.pop();
            Flex.pop();
            Flex.create({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Start });
            Flex.border({
                width: 5,
                color: Color.Green,
                style: BorderStyle.Solid
            });
            Flex.visibility(this.isShowLog ? Visibility.None : Visibility.Visible);
            Flex.layoutWeight(1);
            Flex.margin({ left: 20, right: 20 });
            List.create({ space: 10, initialIndex: 0 });
            List.width('100%');
            List.listDirection(Axis.Vertical);
            List.divider({ strokeWidth: 2, color: 0x888888 });
            List.edgeEffect(EdgeEffect.None);
            List.chainAnimation(false);
            ForEach.create("2", this, ObservedObject.GetRawObject(this.currentFileList), (item: FileInfo, index: number) => {
                ListItem.create();
                Gesture.create(GesturePriority.Parallel, GestureMask.Normal);
                TapGesture.create();
                TapGesture.onAction((event) => {
                    if (this.currentFileList && this.currentFileList.length > 0 && item) {
                        let name = item.name;
                        this.showToast(`点击了：${name}`, `ListItem---${item}`);
                        if (item.type != FileType.Directory) {
                            if (this.selectFilePath == undefined) {
                                this.selectFilePath = name;
                                this.showToast(`选择了 selectFilePath ${this.selectFilePath}`, 'selectFilePath');
                            }
                            else {
                                this.selectFilePath = null;
                                this.showToast(`取消了选择 `, 'selectFilePath');
                            }
                        }
                        else {
                            this.enterChildDir(item.name);
                        }
                    }
                });
                TapGesture.pop();
                Gesture.pop();
                Gesture.create(GesturePriority.Low, GestureMask.Normal);
                LongPressGesture.create();
                LongPressGesture.onAction((event) => {
                    if (this.selectDirPath && this.selectDirPath.length > 0) {
                        this.selectDirPath = null;
                    }
                    else {
                        this.selectDirPath = item.name;
                    }
                });
                LongPressGesture.pop();
                Gesture.pop();
                If.create();
                if (item.type == FileType.Directory) {
                    If.branchId(0);
                    Flex.create({
                        justifyContent: FlexAlign.Start,
                        direction: FlexDirection.Row,
                        alignItems: ItemAlign.Center
                    });
                    Flex.margin({ top: 10 });
                    Toggle.create({ type: ToggleType.Checkbox, isOn: true });
                    Toggle.size({ width: 30, height: 30 });
                    Toggle.selectedColor('#007DFF');
                    Toggle.visibility(this.selectDirPath && this.selectDirPath.length > 0 && this.selectDirPath == item.name ? Visibility.Visible : Visibility.None);
                    Toggle.pop();
                    Image.create($r('app.media.fileDir'));
                    Image.height(40);
                    Image.width(40);
                    Image.margin({ left: 10 });
                    Text.create(item.name);
                    Text.fontSize(20);
                    Text.height(50);
                    Text.margin({ left: 10 });
                    Text.fontWeight(FontWeight.Bold);
                    Text.pop();
                    Flex.pop();
                }
                else if (item.type == FileType.File) {
                    If.branchId(1);
                    Flex.create({
                        justifyContent: FlexAlign.Start,
                        direction: FlexDirection.Row,
                        alignItems: ItemAlign.Center
                    });
                    Flex.margin({ top: 10 });
                    Toggle.create({ type: ToggleType.Checkbox, isOn: true });
                    Toggle.size({ width: 30, height: 30 });
                    Toggle.selectedColor('#007DFF');
                    Toggle.visibility(this.selectFilePath && this.selectFilePath === item.name ? Visibility.Visible : Visibility.None);
                    Toggle.pop();
                    Image.create($r('app.media.file'));
                    Image.height(40);
                    Image.width(40);
                    Image.margin({ left: 10 });
                    Text.create(item.name);
                    Text.fontSize(20);
                    Text.height(50);
                    Text.margin({ left: 10 });
                    Text.fontWeight(FontWeight.Bold);
                    Text.pop();
                    Flex.pop();
                }
                else {
                    If.branchId(2);
                    Flex.create({
                        justifyContent: FlexAlign.Start,
                        direction: FlexDirection.Row,
                        alignItems: ItemAlign.Center
                    });
                    Flex.margin({ top: 10 });
                    Toggle.create({ type: ToggleType.Checkbox, isOn: true });
                    Toggle.size({ width: 30, height: 30 });
                    Toggle.selectedColor('#007DFF');
                    Toggle.visibility(this.selectDirPath && this.selectDirPath.length > 0 && this.selectDirPath == item.name ? Visibility.Visible : Visibility.None);
                    Toggle.pop();
                    Image.create($r('app.media.unknow'));
                    Image.height(40);
                    Image.width(40);
                    Image.margin({ left: 10 });
                    Text.create(item.name);
                    Text.fontSize(20);
                    Text.height(50);
                    Text.margin({ left: 10 });
                    Text.fontWeight(FontWeight.Bold);
                    Text.pop();
                    Flex.pop();
                }
                If.pop();
                ListItem.pop();
            }, (item: FileInfo, index: number) => item.name);
            ForEach.pop();
            List.pop();
            Flex.pop();
            Flex.create({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center });
            Flex.border({
                width: 5,
                color: Color.Green,
                style: BorderStyle.Solid
            });
            Flex.visibility(this.isShowLog ? Visibility.Visible : Visibility.None);
            Flex.layoutWeight(1);
            Flex.margin(20);
            Scroll.create();
            Scroll.width('100%');
            Text.create(this.message);
            Text.width('100%');
            Text.fontSize(20);
            Text.textAlign(TextAlign.Start);
            Text.padding(10);
            Text.pop();
            Scroll.pop();
            Flex.pop();
            Flex.create({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center });
            Flex.margin({ top: 10 });
            Button.createWithLabel(this.isShowLog ? '查看列表' : '查看日志');
            Button.fontSize(14);
            Button.height(30);
            Button.margin({ left: 10 });
            Button.fontWeight(FontWeight.Bold);
            Button.onClick(() => {
                this.isShowLog = !this.isShowLog;
            });
            Button.pop();
            Button.createWithLabel('退出登陆');
            Button.fontSize(14);
            Button.height(30);
            Button.margin({ left: 10 });
            Button.fontWeight(FontWeight.Bold);
            Button.onClick(async () => {
                this.isLogin = false;
                if (this.ftpUtil) {
                    await this.ftpUtil.close();
                }
                if (GlobalObj?.getInstance()?.getContext()) {
                    GlobalObj?.getInstance()?.getContext()?.terminateSelf();
                }
            });
            Button.pop();
            Flex.pop();
            Flex.create({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center });
            Flex.border({
                width: 5,
                color: Color.Green,
                style: BorderStyle.Solid
            });
            Flex.padding({ top: 5, bottom: 5 });
            Flex.margin({ top: 10 });
            Button.createWithLabel('生成本地文件');
            Button.fontSize(14);
            Button.height(30);
            Button.margin({ left: 10 });
            Button.fontWeight(FontWeight.Bold);
            Button.onClick(() => {
                this.createSingleFile();
            });
            Button.pop();
            Button.createWithLabel('上传单个本地文件');
            Button.fontSize(14);
            Button.height(30);
            Button.margin({ left: 10 });
            Button.fontWeight(FontWeight.Bold);
            Button.onClick(() => {
                this.operationType = 'uploadSingleFile';
                if (this.dialogController) {
                    this.dialogController.open();
                }
            });
            Button.pop();
            Flex.pop();
            Flex.create({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center });
            Flex.border({
                width: 5,
                color: Color.Green,
                style: BorderStyle.Solid
            });
            Flex.padding({ top: 5, bottom: 5 });
            Flex.margin({ top: 10 });
            Button.createWithLabel('生成本地文件');
            Button.fontSize(14);
            Button.height(30);
            Button.margin({ left: 10 });
            Button.fontWeight(FontWeight.Bold);
            Button.onClick(() => {
                this.createSingleFile();
            });
            Button.pop();
            Button.createWithLabel('追加上传');
            Button.fontSize(14);
            Button.height(30);
            Button.margin({ left: 10 });
            Button.fontWeight(FontWeight.Bold);
            Button.onClick(() => {
                this.appendFile();
            });
            Button.pop();
            Flex.pop();
            Flex.create({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center });
            Flex.border({
                width: 5,
                color: Color.Green,
                style: BorderStyle.Solid
            });
            Flex.padding({ top: 5, bottom: 5 });
            Flex.margin({ top: 10 });
            Button.createWithLabel('生成本地文件夹');
            Button.fontSize(14);
            Button.height(30);
            Button.margin({ left: 10 });
            Button.fontWeight(FontWeight.Bold);
            Button.onClick(() => {
                this.createFileDir();
            });
            Button.pop();
            Button.createWithLabel('上传本地文件夹');
            Button.fontSize(14);
            Button.height(30);
            Button.margin({ left: 10 });
            Button.fontWeight(FontWeight.Bold);
            Button.onClick(() => {
                this.operationType = 'uploadDir';
                if (this.dialogController) {
                    this.dialogController.open();
                }
            });
            Button.pop();
            Flex.pop();
            Flex.create({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center });
            Flex.margin({ top: 10, bottom: 20 });
            Button.createWithLabel('下载单个文件');
            Button.fontSize(14);
            Button.height(30);
            Button.margin({ left: 10 });
            Button.fontWeight(FontWeight.Bold);
            Button.onClick(() => {
                this.downloadSingleFile();
            });
            Button.pop();
            Button.createWithLabel('下载文件夹');
            Button.fontSize(14);
            Button.height(30);
            Button.margin({ left: 10 });
            Button.fontWeight(FontWeight.Bold);
            Button.onClick(() => {
                this.downloadDir();
            });
            Button.pop();
            Flex.pop();
            Column.pop();
            Row.pop();
        }
        If.pop();
    }
    async loginServer() {
        const ctx = this;
        ctx.message = '初始化参数，准备登录';
        let loginInfo: AccessOptions | null = null;
        if (ctx.secure) {
            let context = GlobalObj?.getInstance()?.getContext() ? GlobalObj?.getInstance()?.getContext() : getContext(this);
            if (!context) {
                return;
            }
            let keyData = await context?.resourceManager?.getRawFileContent('client_rsa_private.pem.unsecure');
            if (!keyData) {
                return;
            }
            let key = '';
            for (let i = 0; i < keyData.length; i++) {
                let todo = keyData[i];
                let item = String.fromCharCode(todo);
                key += item;
            }
            ctx.option.secureOptions.key = key;
            let certData = await context.resourceManager.getRawFileContent('client.pem');
            let cert = '';
            for (let i = 0; i < certData.length; i++) {
                let todo = certData[i];
                let item = String.fromCharCode(todo);
                cert += item;
            }
            ctx.option.secureOptions.cert = cert;
            let caData = await context.resourceManager.getRawFileContent('ca.pem');
            let ca = '';
            for (let i = 0; i < caData.length; i++) {
                let todo = caData[i];
                let item = String.fromCharCode(todo);
                ca += item;
            }
            if (ctx.option.secureOptions.ca instanceof Array) {
                ctx.option.secureOptions.ca[0] = ca;
            }
            else {
                ctx.option.secureOptions.ca = ca;
            }
            ctx.option.address = {
                address: ctx.host,
                port: ctx.port,
                family: 1
            };
            loginInfo = {
                host: ctx.host,
                user: ctx.user,
                port: ctx.port,
                password: ctx.password,
                secure: 'implicit',
                secureOptions: ctx.option
            };
        }
        else {
            loginInfo = {
                host: ctx.host,
                user: ctx.user,
                port: ctx.port,
                password: ctx.password,
                secure: false,
                secureOptions: undefined
            };
        }
        if (ctx.ftpUtil) {
            ctx.ftpUtil.doLogin(loginInfo, {
                onLoginStart(info: string) {
                    ctx.showToast(info, 'onLoginStart');
                },
                onLoginSuccess(result: string) {
                    ctx.showToast(result, 'onLoginSuccess');
                    ctx.refreshScreen();
                },
                onLoginErr(err: Error) {
                    ctx.showToast(err.message, 'onLoginErr');
                }
            });
        }
    }
    getCurrentDirectory() {
        const ctx = this;
        if (ctx.ftpUtil) {
            if (!ctx.ftpUtil.getLogin()) {
                ctx.showToast('客户端未登录，请先登录', 'isLogin');
                return;
            }
            ctx.ftpUtil.getCurrentDirectory({
                currentDirectoryErr(err: Error) {
                    ctx.showToast(`获取当前工作目录失败：${err.message}`, 'currentDirectoryErr');
                },
                currentDirectoryStart(info: string) {
                    ctx.showToast(`获取当前工作目录开始：${info}`, 'currentDirectoryStart');
                },
                currentDirectorySuccess(msg: string) {
                    ctx.showToast(`获取当前工作目录成功：${msg}`, 'currentDirectorySuccess');
                    ctx.remoteRoot = msg;
                }
            });
        }
    }
    refreshScreen() {
        const ctx = this;
        if (ctx.ftpUtil) {
            if (!ctx.ftpUtil?.getLogin()) {
                ctx.showToast('客户端未登录，请先登录', 'isLogin');
                return;
            }
            ctx.ftpUtil?.getCurrentDirectory({
                currentDirectoryErr(err: Error) {
                    ctx.showToast(`获取当前工作目录失败：${err.message}`, 'currentDirectoryErr');
                },
                currentDirectoryStart(info: string) {
                    ctx.showToast(`获取当前工作目录开始：${info}`, 'currentDirectoryStart');
                },
                currentDirectorySuccess(msg: string) {
                    ctx.showToast(`获取当前工作目录成功：${msg}`, 'currentDirectorySuccess');
                    ctx.remoteRoot = msg;
                    let listName = '';
                    if (ctx.remoteRoot == '' || ctx.remoteRoot == '\\' || ctx.remoteRoot == '/') {
                        listName = '';
                    }
                    else {
                        listName = msg;
                    }
                    ctx.ftpUtil?.getList(listName, {
                        getListErr(err: Error) {
                            ctx.showToast(`获取文件列表失败：${err.message}`, 'getListErr');
                            ctx.currentFileList = [];
                        },
                        getListStart(info: string) {
                            ctx.showToast(`获取文件列表开始：${info}`, 'getListStart');
                        },
                        getListSuccess(result: FileInfo[]) {
                            ctx.showToast(`获取当文件列表成功：${JSON.stringify(result)}`, 'getListSuccess');
                            if (!result) {
                                ctx.currentFileList = [];
                            }
                            else {
                                ctx.currentFileList = result;
                            }
                        }
                    });
                }
            });
        }
    }
    createSingleFile() {
        const ctx = this;
        try {
            ctx.showToast('开始生成单个本地文件', 'createSingleFile');
            let context: Context | null = GlobalObj?.getInstance()?.getContext() ? GlobalObj?.getInstance()?.getContext() : getContext(ctx);
            ctx.localUploadFilePath = context?.cacheDir + '/' + (new Date().getTime()) + '.txt';
            let file = fs.openSync(ctx.localUploadFilePath, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE);
            let str = '';
            for (let i = 0; i < 1024; i++) {
                str += "客户端发送到服务端的信息，请查收\r\n";
            }
            fs.writeSync(file.fd, str);
            fs.fsyncSync(file.fd);
            fs.closeSync(file);
            ctx.showToast('生成本地单个文件成功', 'createSingleFile');
        }
        catch (err) {
            ctx.localUploadFilePath = null;
            ctx.showToast('生成本地单个文件失败:' + JSON.stringify(err), 'createSingleFile');
        }
    }
    createFileDir() {
        const ctx = this;
        try {
            ctx.showToast('开始生成本地文件夹', 'createFileDir');
            let context: Context | null = GlobalObj?.getInstance()?.getContext() ? GlobalObj?.getInstance()?.getContext() : getContext(ctx);
            ctx.localUploadFileDir = context?.cacheDir + '/' + (new Date().getTime());
            let localPath1 = ctx.localUploadFileDir + '/' + 'test1.txt';
            let localPath2 = ctx.localUploadFileDir + '/' + 'test2.txt';
            let localPath3 = ctx.localUploadFileDir + '/' + 'test3.txt';
            fs.mkdirSync(ctx.localUploadFileDir);
            let file = fs.openSync(localPath1, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE);
            let str = '';
            for (let i = 0; i < 1024; i++) {
                str += "客户端发送到服务端的信息，请查收\r\n";
            }
            fs.writeSync(file.fd, str);
            fs.fsyncSync(file.fd);
            fs.closeSync(file);
            let file1 = fs.openSync(localPath2, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE);
            let str1 = '789456123abcd';
            fs.writeSync(file1.fd, str1);
            fs.fsyncSync(file1.fd);
            fs.closeSync(file1);
            let file3 = fs.openSync(localPath3, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE);
            let str3 = '111111111111111111111111111111111111111111111111111111';
            fs.writeSync(file3.fd, str3);
            fs.fsyncSync(file3.fd);
            fs.closeSync(file3);
            ctx.showToast('生成本地文件夹成功', 'createFileDir');
        }
        catch (err) {
            ctx.localUploadFileDir = null;
            ctx.showToast('生成本地文件夹失败:' + JSON.stringify(err), 'createFileDir');
        }
    }
    appendFile() {
        const ctx = this;
        if (ctx.ftpUtil) {
            if (!this.ftpUtil?.getLogin()) {
                ctx.operationType = '';
                ctx.showToast('客户端未登录，请先登录', 'uploadSingleFile');
                return;
            }
            if (!ctx.localUploadFilePath || ctx.localUploadFilePath.length < 1) {
                ctx.operationType = '';
                ctx.showToast('未生成本地单个文件，请先点击 生成本地文件  按钮', 'appendFile');
                return;
            }
            if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
                ctx.operationType = '';
                ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'appendFile');
                return;
            }
            if (!ctx.selectFilePath || ctx.selectFilePath.length < 1) {
                ctx.operationType = '';
                ctx.showToast('未选择需要附加上传的文件，请先选择需要附加上传的文件', 'appendFile');
                return;
            }
            ctx.ftpUtil?.getFileSize(ctx.selectFilePath, {
                getSizeErr(err: Error) {
                    ctx.showToast(`附加上传之前先获取原文件大小失败，${err.message}`, 'appendFile');
                },
                getSizeStart(info: string) {
                    ctx.showToast(`附加上传之前先获取原文件大小开始，${info}`, 'appendFile');
                },
                getSizeSuccess(result: number) {
                    ctx.showToast(`附加上传之前先获取原文件${ctx.selectFilePath}大小:${result}`, 'appendFile');
                    ctx.ftpUtil?.appendFile(ctx.localUploadFilePath, ctx.selectFilePath, {
                        appendErr(err: Error) {
                            ctx.showToast(`附加上传单个文件失败： ${JSON.stringify(err)}`, 'appendFile');
                        },
                        appendStart(info: string) {
                            ctx.showToast(info, 'uploadSingleFile');
                        },
                        appendSuccess(msg: FTPResponse) {
                            ctx.showToast(`附加上传成功，返回的信息是:` + JSON.stringify(msg), 'appendFile');
                            ctx.ftpUtil?.getFileSize(ctx.selectFilePath, {
                                getSizeErr(err: Error) {
                                    ctx.showToast(`附加上传之后获取原文件大小失败，${err.message}`, 'appendFile');
                                },
                                getSizeStart(info: string) {
                                    ctx.showToast(`附加上传之后获取原文件大小开始，${info}`, 'appendFile');
                                },
                                getSizeSuccess(result: number) {
                                    ctx.showToast(`附加上传之后获取原文件${ctx.selectFilePath}大小:${result}`, 'appendFile');
                                    ctx.refreshScreen();
                                }
                            });
                        },
                        appendProgress(currentSize: number, totalSize: number) {
                            ctx.showToast(`附加当前上传长度:${currentSize}，上次文件总长度：${totalSize}`, 'appendFile');
                        }
                    });
                }
            });
        }
    }
    uploadSingleFile() {
        const ctx = this;
        if (ctx.ftpUtil) {
            if (!this.ftpUtil?.getLogin()) {
                ctx.operationType = '';
                ctx.showToast('客户端未登录，请先登录', 'uploadSingleFile');
                return;
            }
            if (!ctx.localUploadFilePath || ctx.localUploadFilePath.length < 1) {
                ctx.operationType = '';
                ctx.showToast('未生成本地单个文件，请先点击 生成本地文件  按钮', 'uploadSingleFile');
                return;
            }
            if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
                ctx.operationType = '';
                ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'uploadSingleFile');
                return;
            }
            if (!ctx.inputValue || ctx.inputValue.length < 1) {
                ctx.operationType = '';
                ctx.showToast('未输入文件名，请先输入文件名', 'uploadSingleFile');
                return;
            }
            ctx.ftpUtil?.uploadSingleFile(ctx.localUploadFilePath, ctx.inputValue, {
                uploadErr(err: Error) {
                    ctx.showToast(`上传单个文件失败： ${JSON.stringify(err)}`, 'uploadSingleFile');
                },
                uploadStart(info: string) {
                    ctx.showToast(info, 'uploadSingleFile');
                },
                uploadSuccess(msg: FTPResponse) {
                    ctx.showToast(`上传成功，返回的信息是:` + JSON.stringify(msg), 'uploadSingleFile');
                    ctx.refreshScreen();
                },
                uploadProgress(currentSize: number, totalSize: number) {
                    ctx.showToast(`当前上传长度:${currentSize}，上次文件总长度：${totalSize}`, 'uploadSingleFile');
                }
            });
        }
    }
    uploadDir() {
        const ctx = this;
        if (ctx.ftpUtil) {
            if (!this.ftpUtil?.getLogin()) {
                ctx.operationType = '';
                ctx.showToast('客户端未登录，请先登录', 'uploadDir');
                return;
            }
            if (!ctx.localUploadFileDir || ctx.localUploadFileDir.length < 1) {
                ctx.operationType = '';
                ctx.showToast('未生成本地文件夹，请先点击 生成本地文件夹 按钮', 'uploadDir');
                return;
            }
            if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
                ctx.operationType = '';
                ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'uploadDir');
                return;
            }
            if (!ctx.inputValue || ctx.inputValue.length < 1) {
                ctx.operationType = '';
                ctx.showToast('未输入文件名，请先输入文件名', 'uploadDir');
                return;
            }
            ctx.ftpUtil?.uploadDir(ctx.localUploadFileDir, ctx.inputValue, {
                uploadDirErr(err: Error) {
                    ctx.showToast(err.message, 'uploadDir');
                },
                uploadDirStart(info: string) {
                    ctx.showToast(info, 'uploadDir');
                },
                uploadDirSuccess(msg: string) {
                    ctx.showToast(`上传文件夹成功，返回的信息是:${'\r\n'}` + JSON.stringify(msg), 'uploadDir');
                    ctx.refreshScreen();
                },
                uploadDirProgress(currentSize: number, totalSize: number) {
                    ctx.showToast(`currentSize：${currentSize}，totalSize：${totalSize}`, 'uploadDir');
                }
            });
        }
    }
    downloadSingleFile() {
        const ctx = this;
        let context = GlobalObj?.getInstance()?.getContext() ? GlobalObj?.getInstance()?.getContext() : getContext(ctx);
        if (this.ftpUtil) {
            if (!this.ftpUtil?.getLogin()) {
                ctx.showToast('客户端未登录，请先登录', 'downloadSingleFile');
                return;
            }
            if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
                ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'downloadSingleFile');
                return;
            }
            if (!ctx.selectFilePath || ctx.selectFilePath.length < 1) {
                ctx.showToast('未选择文件，请先选择文件', 'getFileSize');
                return;
            }
            let localPath = context?.cacheDir + '/' + ctx.selectFilePath;
            this.ftpUtil?.downloadSingleFile(localPath, ctx.selectFilePath, {
                downloadErr(err: Error) {
                    ctx.showToast(`下载单个文件失败，${err.message}`, 'downloadSingleFile');
                },
                downloadStart(info: string) {
                    ctx.showToast(`下载单个文件开始，${info}`, 'downloadSingleFile');
                },
                downloadSuccess(msg: FTPResponse) {
                    ctx.showToast(`下载成功，返回的信息是:` + JSON.stringify(msg), 'downloadSingleFile');
                },
                downloadProgress(currentSize: number, totalSize: number) {
                    ctx.showToast(`currentSize：${currentSize}，totalSize：${totalSize}`, 'uploadDir');
                }
            });
        }
    }
    downloadDir() {
        const ctx = this;
        let context = GlobalObj?.getInstance()?.getContext() ? GlobalObj?.getInstance()?.getContext() : getContext(ctx);
        if (this.ftpUtil) {
            if (!this.ftpUtil?.getLogin()) {
                ctx.showToast('客户端未登录，请先登录', 'downloadDir');
                return;
            }
            if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
                ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'downloadDir');
                return;
            }
            if (!ctx.selectDirPath || ctx.selectDirPath.length < 1) {
                ctx.showToast('请先长按选中某个文件夹再进行本操作', 'deleteEmptyDirectory');
                return;
            }
            let localDir = context?.cacheDir + ctx.selectDirPath;
            this.ftpUtil?.downloadDir(localDir, ctx.selectDirPath, {
                downloadDirErr(err: Error) {
                    ctx.showToast(`下载文件夹失败，${err.message}`, 'downloadDir');
                },
                downloadDirStart(info: string) {
                    ctx.showToast(`下载文件夹开始，${info}`, 'downloadDir');
                },
                downloadDirSuccess(msg: string) {
                    ctx.showToast(`下载文件夹成功，返回的信息是:${'\r\n'}` + JSON.stringify(msg), 'downloadDir');
                },
                downloadDirProgress(currentSize: number, totalSize: number) {
                    ctx.showToast(`当前下载长度：currentSize：${currentSize}，totalSize：${totalSize}`, 'downloadDir');
                }
            });
        }
    }
    getFileSize() {
        const ctx = this;
        if (this.ftpUtil) {
            if (!this.ftpUtil?.getLogin()) {
                ctx.showToast('客户端未登录，请先登录', 'getFileSize');
                return;
            }
            if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
                ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'getFileSize');
                return;
            }
            if (!ctx.selectFilePath || ctx.selectFilePath.length < 1) {
                ctx.showToast('未选择文件，请先选择文件', 'getFileSize');
                return;
            }
            this.ftpUtil?.getFileSize(ctx.selectFilePath, {
                getSizeErr(err: Error) {
                    ctx.showToast(`获取文件大小失败，${err.message}`, 'getFileSize');
                },
                getSizeStart(info: string) {
                    ctx.showToast(`获取文件大小开始，${info}`, 'getFileSize');
                },
                getSizeSuccess(result: number) {
                    ctx.showToast(`获取的文件${ctx.selectFilePath}大小:${result}`, 'getFileSize');
                }
            });
        }
    }
    getServerFeatures() {
        const ctx = this;
        if (this.ftpUtil) {
            if (!this.ftpUtil?.getLogin()) {
                ctx.showToast('客户端未登录，请先登录', 'getServerFeatures');
                return;
            }
            this.ftpUtil.getServerFeatures({
                featuresErr(err: Error) {
                    ctx.showToast(`获取服务端能力失败，${err.message}`, 'getFileSize');
                },
                featuresStart(info: string) {
                    ctx.showToast(`获取服务端能力开始，${info}`, 'getFileSize');
                },
                featuresSuccess(msg: Map<string, string>) {
                    ctx.showToast(`服务器能力获取成功，返回的信息是:${'\r\n'}${JSON.stringify(msg)}`, 'getFileSize');
                }
            });
        }
    }
    getLastModifyTime() {
        const ctx = this;
        if (ctx.ftpUtil) {
            if (!ctx.ftpUtil?.getLogin()) {
                ctx.showToast('客户端未登录，请先登录', 'getLastModifyTime');
                return;
            }
            if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
                ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'getLastModifyTime');
                return;
            }
            if (!ctx.selectFilePath || ctx.selectFilePath.length < 1) {
                ctx.showToast('未选择文件，请先选择文件', 'getLastModifyTime');
                return;
            }
            ctx.ftpUtil?.getLastModify(ctx.selectFilePath, {
                lastModifyErr(err: Error) {
                    ctx.showToast(`切换到工作目录的父目录失败，${err.message}`, 'getLastModifyTime');
                },
                lastModifyStart(info: string) {
                    ctx.showToast(`切换到工作目录的父目录开始，${info}`, 'getLastModifyTime');
                },
                lastModifySuccess(msg: Date) {
                    ctx.showToast(`切换到工作目录的父目录成功，返回的信息是:${'\r\n'}` + msg.toLocaleString(), 'getLastModifyTime');
                }
            });
        }
    }
    deleteSingleFile() {
        const ctx = this;
        if (ctx.ftpUtil) {
            if (!ctx.ftpUtil?.getLogin()) {
                ctx.showToast('客户端未登录，请先登录', 'deleteSingleFile');
                return;
            }
            if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
                ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'deleteSingleFile');
                return;
            }
            if (!ctx.selectFilePath || ctx.selectFilePath.length < 1) {
                ctx.showToast('未选择文件，请先选择文件', 'deleteSingleFile');
                return;
            }
            ctx.ftpUtil?.deleteFile(ctx.selectFilePath, {
                deleteFileErr(err: Error) {
                    ctx.showToast(`删除文件失败，${err.message}`, 'deleteSingleFile');
                },
                deleteFileStart(info: string) {
                    ctx.showToast(`删除文件开始，${info}`, 'deleteSingleFile');
                },
                deleteFileSuccess(msg: FTPResponse) {
                    ctx.showToast(`删除文件成功，返回的信息是:${'\r\n'}` + JSON.stringify(msg), 'deleteSingleFile');
                    ctx.refreshScreen();
                }
            });
        }
    }
    backToParent() {
        const ctx = this;
        if (ctx.ftpUtil) {
            if (!ctx.ftpUtil?.getLogin()) {
                ctx.showToast('客户端未登录，请先登录', 'backToParent');
                return;
            }
            if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
                ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'backToParent');
                return;
            }
            ctx.ftpUtil?.cdToParentDirectory({
                cdToParentDirectoryErr(err: Error) {
                    ctx.showToast(`切换到工作目录的父目录失败，${err.message}`, 'backToParent');
                },
                cdToParentDirectoryStart(info: string) {
                    ctx.showToast(`切换到工作目录的父目录开始，${info}`, 'backToParent');
                },
                cdToParentDirectorySuccess(res: FTPResponse) {
                    ctx.showToast(`切换到工作目录的父目录成功，返回的信息是:${'\r\n'}` + JSON.stringify(res), 'backToParent');
                    ctx.refreshScreen();
                }
            });
        }
    }
    ensureRemotePath() {
        const ctx = this;
        if (this.ftpUtil) {
            if (!this.ftpUtil?.getLogin()) {
                ctx.operationType = '';
                ctx.showToast('客户端未登录，请先登录', 'ensureRemotePath');
                return;
            }
            if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
                ctx.operationType = '';
                ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'ensureRemotePath');
                return;
            }
            if (!ctx.inputValue || ctx.inputValue.length < 1) {
                ctx.operationType = '';
                ctx.showToast('未输入文件夹名，请先输入输入文件夹名', 'ensureRemotePath');
                return;
            }
            this.ftpUtil?.ensureRemotePath(ctx.inputValue, {
                ensureRemotePathErr(err: Error) {
                    ctx.operationType = '';
                    ctx.showToast(`确保远程服务器存在给定的目录失败，${err.message}`, 'ensureRemotePath');
                },
                ensureRemotePathStart(info: string) {
                    ctx.operationType = '';
                    ctx.showToast(`确保远程服务器存在给定的目录开始，${info}`, 'ensureRemotePath');
                },
                ensureRemotePathSuccess(result: string) {
                    ctx.operationType = '';
                    ctx.showToast(`确保远程服务器存在给定的目录成功:${result}}`, 'ensureRemotePath');
                    ctx.refreshScreen();
                }
            });
        }
    }
    deleteEmptyDirectory() {
        const ctx = this;
        if (this.ftpUtil) {
            if (!this.ftpUtil?.getLogin()) {
                ctx.showToast('客户端未登录，请先登录', 'deleteEmptyDirectory');
                return;
            }
            if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
                ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'deleteEmptyDirectory');
                return;
            }
            if (!ctx.selectDirPath || ctx.selectDirPath.length < 1) {
                ctx.showToast('请先长按选中某个文件夹再进行本操作', 'deleteEmptyDirectory');
                return;
            }
            this.ftpUtil?.deleteEmptyDirectory(ctx.selectDirPath, {
                deleteEmptyDirectoryErr(err: Error) {
                    ctx.showToast(`删除空目录失败，${err.message}`, 'deleteEmptyDirectory');
                },
                deleteEmptyDirectoryStart(info: string) {
                    ctx.showToast(`删除空目录开始，${info}`, 'deleteEmptyDirectory');
                },
                deleteEmptyDirectorySuccess(result: FTPResponse) {
                    ctx.showToast(`删除空目录成功:${JSON.stringify(result)}}`, 'deleteEmptyDirectory');
                    ctx.refreshScreen();
                }
            });
        }
    }
    deleteAll() {
        const ctx = this;
        if (this.ftpUtil) {
            if (!this.ftpUtil?.getLogin()) {
                ctx.showToast('客户端未登录，请先登录', 'deleteEmptyDirectory');
                return;
            }
            if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
                ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'deleteEmptyDirectory');
                return;
            }
            if (!ctx.selectDirPath || ctx.selectDirPath.length < 1) {
                ctx.showToast('请先长按选中某个文件夹再进行本操作', 'deleteEmptyDirectory');
                return;
            }
            this.ftpUtil?.deleteAll(ctx.selectDirPath, {
                deleteAllErr(err: Error) {
                    ctx.showToast(`删除目录及其所有内容失败，${err.message}`, 'deleteEmptyDirectory');
                },
                deleteAllStart(info: string) {
                    ctx.showToast(`删除目录及其所有内容开始，${info}`, 'deleteEmptyDirectory');
                },
                deleteAllSuccess(result: string) {
                    ctx.showToast(`删除目录及其所有内容成功:${result}}`, 'deleteEmptyDirectory');
                    ctx.refreshScreen();
                }
            });
        }
    }
    deleteAllButSelf() {
        const ctx = this;
        if (this.ftpUtil) {
            if (!this.ftpUtil?.getLogin()) {
                ctx.showToast('客户端未登录，请先登录', 'deleteEmptyDirectory');
                return;
            }
            if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
                ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'deleteEmptyDirectory');
                return;
            }
            this.ftpUtil?.deleteAllButSelf({
                deleteAllButSelfErr(err: Error) {
                    ctx.showToast(`清空当前工作目录失败，${err.message}`, 'deleteEmptyDirectory');
                },
                deleteAllButSelfStart(info: string) {
                    ctx.showToast(`清空当前工作目录开始，${info}`, 'deleteEmptyDirectory');
                },
                deleteAllButSelfSuccess(result: string) {
                    ctx.showToast(`清空当前工作目录成功:${result}}`, 'deleteEmptyDirectory');
                    ctx.refreshScreen();
                }
            });
        }
    }
    renameFile() {
        const ctx = this;
        if (this.ftpUtil) {
            if (!this.ftpUtil?.getLogin()) {
                ctx.operationType = '';
                ctx.showToast('客户端未登录，请先登录', 'renameFile');
                return;
            }
            if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
                ctx.operationType = '';
                ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'renameFile');
                return;
            }
            if (!ctx.inputValue || ctx.inputValue.length < 1) {
                ctx.operationType = '';
                ctx.showToast('未输入文件名，请先输入输入文件名', 'renameFile');
                return;
            }
            if (!ctx.selectFilePath || ctx.selectFilePath.length < 1) {
                ctx.showToast('未选择文件，请先选择文件', 'deleteSingleFile');
                return;
            }
            this.ftpUtil?.renameFile(ctx.inputValue, ctx.selectFilePath, {
                renameFileErr(err: Error) {
                    ctx.operationType = '';
                    ctx.showToast(`重命名文件失败，${err.message}`, 'deleteEmptyDirectory');
                },
                renameFileStart(info: string) {
                    ctx.operationType = '';
                    ctx.showToast(`重命名文件开始，${info}`, 'deleteEmptyDirectory');
                },
                renameFileSuccess(result: FTPResponse) {
                    ctx.operationType = '';
                    ctx.showToast(`重命名文件成功:${result}}`, 'deleteEmptyDirectory');
                    ctx.refreshScreen();
                }
            });
        }
    }
    enterChildDir(remoteChildPath: string) {
        const ctx = this;
        if (this.ftpUtil) {
            if (!this.ftpUtil?.getLogin()) {
                ctx.showToast('客户端未登录，请先登录', 'enterChildDir');
                return;
            }
            if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
                ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'enterChildDir');
                return;
            }
            if (!remoteChildPath || remoteChildPath.length < 1) {
                ctx.showToast('文件夹名不合法,不可以为空', 'enterChildDir');
                return;
            }
            this.ftpUtil?.setWorkingDirectory(remoteChildPath, {
                setWorkingDirectoryErr(err: Error) {
                    ctx.showToast(`进入子文件夹失败，${err.message}`, 'ensureRemotePath');
                },
                setWorkingDirectoryStart(info: string) {
                    ctx.showToast(`进入子文件夹开始，${info}`, 'ensureRemotePath');
                },
                setWorkingDirectorySuccess(result: FTPResponse) {
                    ctx.showToast(`进入子文件夹成功:${result}}`, 'ensureRemotePath');
                    ctx.refreshScreen();
                }
            });
        }
    }
}
loadDocument(new SamplePage("1", undefined, {}));
