interface PressPage_Params {
    message?: string;
    client?: Client | null;
    secure?: boolean;
    option?: socket.TLSConnectOptions;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PressPage_" + ++__generate__Id;
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
import { AccessOptions, Client, FileInfo, FTPResponse, join, to } from '@ohos/basic-ftp';
import fs from '@ohos.file.fs';
import socket from '@ohos.net.socket';
import GlobalObj from '../GlobalObj';
class PressPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.client = null;
        this.secure = false;
        this.option = {
            ALPNProtocols: ["spdy/1", "http/1.1"],
            address: {
                address: '',
                port: 21,
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
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PressPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.client !== undefined) {
            this.client = params.client;
        }
        if (params.secure !== undefined) {
            this.secure = params.secure;
        }
        if (params.option !== undefined) {
            this.option = params.option;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private client: Client | null;
    private secure: boolean;
    private option: socket.TLSConnectOptions;
    aboutToAppear() {
        this.client = new Client(GlobalObj?.getInstance()?.getContext() ? GlobalObj?.getInstance()?.getContext() : getContext(this), 60000);
    }
    render() {
        Flex.create({
            alignItems: ItemAlign.Start,
            justifyContent: FlexAlign.Start,
            alignContent: FlexAlign.Start,
            direction: FlexDirection.Column
        });
        Flex.create({ direction: FlexDirection.Row });
        Scroll.create();
        Scroll.layoutWeight(1);
        Column.create();
        Column.width('100%');
        Column.height(2200);
        Button.createWithLabel('login');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.width("100%");
        Button.onClick(() => {
            this.login();
        });
        Button.pop();
        Button.createWithLabel('appendFrom');
        Button.fontSize(14);
        Button.height(50);
        Button.width("100%");
        Button.margin(10);
        Button.onClick(() => {
            this.appendFrom();
        });
        Button.pop();
        Button.createWithLabel('cdup');
        Button.fontSize(14);
        Button.height(50);
        Button.width("100%");
        Button.margin(10);
        Button.onClick(() => {
            this.cdup();
        });
        Button.pop();
        Button.createWithLabel('cd');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.width("100%");
        Button.onClick(() => {
            this.cd();
        });
        Button.pop();
        Button.createWithLabel('list');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.width("100%");
        Button.onClick(() => {
            this.list();
        });
        Button.pop();
        Button.createWithLabel('uploadFromDir');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.width("100%");
        Button.onClick(() => {
            this.uploadFromDir();
        });
        Button.pop();
        Button.createWithLabel('downloadTo');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.width("100%");
        Button.onClick(() => {
            this.downloadTo();
        });
        Button.pop();
        Button.createWithLabel('downloadDir');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.width("100%");
        Button.onClick(() => {
            this.downloadDir();
        });
        Button.pop();
        Button.createWithLabel('size');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.width("100%");
        Button.onClick(() => {
            this.sizeApi();
        });
        Button.pop();
        Button.createWithLabel('features');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.width("100%");
        Button.onClick(() => {
            this.features();
        });
        Button.pop();
        Column.pop();
        Scroll.pop();
        Scroll.create();
        Scroll.layoutWeight(1);
        Column.create();
        Column.width('100%');
        Column.height(2200);
        Button.createWithLabel('lastMod');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.width("100%");
        Button.onClick(() => {
            this.lastMod();
        });
        Button.pop();
        Button.createWithLabel('rename');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.width("100%");
        Button.onClick(() => {
            this.rename();
        });
        Button.pop();
        Button.createWithLabel('ensureDir');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.width("100%");
        Button.onClick(() => {
            this.ensureDir();
        });
        Button.pop();
        Button.createWithLabel('removeEmptyDir');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.width("100%");
        Button.onClick(() => {
            this.removeEmptyDir();
        });
        Button.pop();
        Button.createWithLabel('remove');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.width("100%");
        Button.onClick(() => {
            this.remove();
        });
        Button.pop();
        Button.createWithLabel('removeDir');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.width("100%");
        Button.onClick(() => {
            this.removeDir();
        });
        Button.pop();
        Button.createWithLabel('clearWorkingDir');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.width("100%");
        Button.onClick(() => {
            this.clearWorkingDir();
        });
        Button.pop();
        Button.createWithLabel('close');
        Button.fontSize(14);
        Button.height(50);
        Button.margin(10);
        Button.width("100%");
        Button.onClick(() => {
            this.close();
        });
        Button.pop();
        Column.pop();
        Scroll.pop();
        Flex.pop();
        Flex.pop();
    }
    login() {
        const ctx = this;
        try {
            let loginInfo: AccessOptions | null = null;
            if (ctx.secure) {
                loginInfo = {
                    host: '',
                    user: 'xxxx',
                    password: '',
                    secure: 'implicit',
                    secureOptions: ctx.option
                };
            }
            else {
                loginInfo = {
                    host: '',
                    user: 'xxxx',
                    password: '',
                    secure: false,
                    secureOptions: undefined
                };
            }
            console.log("BasicFtpTest : access 接口已调用 : ");
            console.log("BasicFtpTest : reset 接口已调用 : ");
            console.log("BasicFtpTest : socket不带参数 接口已调用 : ");
            console.log("BasicFtpTest : socket带参数 接口已调用 : ");
            console.log("BasicFtpTest : connect 接口已调用 : ");
            console.log("BasicFtpTest : connectImplicitTLS 接口已调用 : ");
            console.log("BasicFtpTest : sendIgnoringError 接口已调用 : ");
            console.log("BasicFtpTest : login 接口已调用 : ");
            console.log("BasicFtpTest : closed 接口已调用 : ");
            this.client?.access(loginInfo);
        }
        catch (err) {
        }
    }
    cdup() {
        try {
            console.log("BasicFtpTest : cdup 接口已调用 : ");
            this.client?.cdup();
        }
        catch (err) {
        }
    }
    cd() {
        try {
            console.log("BasicFtpTest : cd 接口已调用 : ");
            this.client?.cd('appTest');
        }
        catch (err) {
        }
    }
    appendFrom() {
        try {
            let tempPath = GlobalObj?.getInstance()?.getContext()?.cacheDir + '/' + (new Date().getTime()) + '.txt';
            fs.open(tempPath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
            console.log("BasicFtpTest : uploadFrom 接口已调用 : ");
            this.client?.uploadFrom(tempPath, 'appendFrom.txt');
        }
        catch (err) {
        }
    }
    downloadTo() {
        try {
            let tempPath = GlobalObj?.getInstance()?.getContext()?.cacheDir + '/' + (new Date().getTime()) + '.txt';
            fs.open(tempPath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
            console.log("BasicFtpTest : downloadTo 接口已调用 : ");
            this.client?.downloadTo(tempPath, 'download.txt');
        }
        catch (err) {
        }
    }
    list() {
        try {
            console.log("BasicFtpTest : list 接口已调用 : ");
            this.client?.list('');
        }
        catch (err) {
        }
    }
    uploadFromDir() {
        try {
            let tempPath = GlobalObj?.getInstance()?.getContext()?.cacheDir + '/' + (new Date().getTime());
            fs.mkdir(tempPath);
            console.log("BasicFtpTest : uploadFromDir 接口已调用 : ");
            this.client?.uploadFromDir(tempPath, 'remoteDir');
        }
        catch (err) {
        }
    }
    downloadDir() {
        try {
            let tempPath = GlobalObj?.getInstance()?.getContext()?.cacheDir + '/' + (new Date().getTime());
            fs.mkdir(tempPath);
            console.log("BasicFtpTest : downloadToDir 接口已调用 : ");
            this.client?.downloadToDir(tempPath, 'remoteDir');
        }
        catch (err) {
        }
    }
    sizeApi() {
        try {
            console.log("BasicFtpTest : size 接口已调用 : ");
            this.client?.size('test.txt');
        }
        catch (err) {
        }
    }
    features() {
        try {
            console.log("BasicFtpTest : features 接口已调用 : ");
            this.client?.features();
        }
        catch (err) {
        }
    }
    lastMod() {
        try {
            console.log("BasicFtpTest : lastMod 接口已调用 : ");
            this.client?.lastMod('test.txt');
        }
        catch (err) {
        }
    }
    rename() {
        try {
            console.log("BasicFtpTest : rename 接口已调用 : ");
            this.client?.rename('test.txt', 'rename.txt');
        }
        catch (err) {
        }
    }
    ensureDir() {
        try {
            console.log("BasicFtpTest : ensureDir 接口已调用 : ");
            this.client?.ensureDir('clientToServer');
        }
        catch (err) {
        }
    }
    removeEmptyDir() {
        try {
            console.log("BasicFtpTest : removeEmptyDir 接口已调用 : ");
            this.client?.removeEmptyDir('remotePath');
        }
        catch (err) {
        }
    }
    remove() {
        try {
            console.log("BasicFtpTest : remove 接口已调用 : ");
            this.client?.remove('test.txt');
        }
        catch (err) {
        }
    }
    removeDir() {
        try {
            console.log("BasicFtpTest : removeDir 接口已调用 : ");
            this.client?.removeDir('remotePath');
        }
        catch (err) {
        }
    }
    clearWorkingDir() {
        try {
            console.log("BasicFtpTest : clearWorkingDir 接口已调用 : ");
            this.client?.clearWorkingDir();
        }
        catch (err) {
        }
    }
    close() {
        try {
            console.log("BasicFtpTest : close 接口已调用 : ");
            this.client?.close();
        }
        catch (err) {
        }
    }
}
loadDocument(new PressPage("1", undefined, {}));
