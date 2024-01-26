interface Index_Params {
    message?: string;
    serverIP?: string;
    clientIP?: string;
    basePath?: string;
    userName?: string;
    password?: string;
    foldName?: string;
    newFileName?: string;
    content?: string;
    fileName?: string;
    log?: string;
    readResult?: string;
    handlePopup?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import { SMB2 } from '@ohos/smbj';
import prompt from '@ohos.promptAction';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('test', this, "message");
        this.__serverIP = new ObservedPropertySimple('', this, "serverIP");
        this.__clientIP = new ObservedPropertySimple('', this, "clientIP");
        this.__basePath = new ObservedPropertySimple('test_smbj', this, "basePath");
        this.__userName = new ObservedPropertySimple('test', this, "userName");
        this.__password = new ObservedPropertySimple('test123', this, "password");
        this.__foldName = new ObservedPropertySimple('', this, "foldName");
        this.__newFileName = new ObservedPropertySimple('', this, "newFileName");
        this.__content = new ObservedPropertySimple('', this, "content");
        this.__fileName = new ObservedPropertySimple('', this, "fileName");
        this.__log = new ObservedPropertySimple('log', this, "log");
        this.__readResult = new ObservedPropertySimple('', this, "readResult");
        this.__handlePopup = new ObservedPropertySimple(false, this, "handlePopup");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.serverIP !== undefined) {
            this.serverIP = params.serverIP;
        }
        if (params.clientIP !== undefined) {
            this.clientIP = params.clientIP;
        }
        if (params.basePath !== undefined) {
            this.basePath = params.basePath;
        }
        if (params.userName !== undefined) {
            this.userName = params.userName;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.foldName !== undefined) {
            this.foldName = params.foldName;
        }
        if (params.newFileName !== undefined) {
            this.newFileName = params.newFileName;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.fileName !== undefined) {
            this.fileName = params.fileName;
        }
        if (params.log !== undefined) {
            this.log = params.log;
        }
        if (params.readResult !== undefined) {
            this.readResult = params.readResult;
        }
        if (params.handlePopup !== undefined) {
            this.handlePopup = params.handlePopup;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__serverIP.aboutToBeDeleted();
        this.__clientIP.aboutToBeDeleted();
        this.__basePath.aboutToBeDeleted();
        this.__userName.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__foldName.aboutToBeDeleted();
        this.__newFileName.aboutToBeDeleted();
        this.__content.aboutToBeDeleted();
        this.__fileName.aboutToBeDeleted();
        this.__log.aboutToBeDeleted();
        this.__readResult.aboutToBeDeleted();
        this.__handlePopup.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __serverIP: ObservedPropertySimple<string>;
    get serverIP() {
        return this.__serverIP.get();
    }
    set serverIP(newValue: string) {
        this.__serverIP.set(newValue);
    }
    private __clientIP: ObservedPropertySimple<string>;
    get clientIP() {
        return this.__clientIP.get();
    }
    set clientIP(newValue: string) {
        this.__clientIP.set(newValue);
    }
    private __basePath: ObservedPropertySimple<string>;
    get basePath() {
        return this.__basePath.get();
    }
    set basePath(newValue: string) {
        this.__basePath.set(newValue);
    }
    private __userName: ObservedPropertySimple<string>;
    get userName() {
        return this.__userName.get();
    }
    set userName(newValue: string) {
        this.__userName.set(newValue);
    }
    private __password: ObservedPropertySimple<string>;
    get password() {
        return this.__password.get();
    }
    set password(newValue: string) {
        this.__password.set(newValue);
    }
    private __foldName: ObservedPropertySimple<string>;
    get foldName() {
        return this.__foldName.get();
    }
    set foldName(newValue: string) {
        this.__foldName.set(newValue);
    }
    private __newFileName: ObservedPropertySimple<string>;
    get newFileName() {
        return this.__newFileName.get();
    }
    set newFileName(newValue: string) {
        this.__newFileName.set(newValue);
    }
    private __content: ObservedPropertySimple<string>;
    get content() {
        return this.__content.get();
    }
    set content(newValue: string) {
        this.__content.set(newValue);
    }
    private __fileName: ObservedPropertySimple<string>;
    get fileName() {
        return this.__fileName.get();
    }
    set fileName(newValue: string) {
        this.__fileName.set(newValue);
    }
    private __log: ObservedPropertySimple<string>;
    get log() {
        return this.__log.get();
    }
    set log(newValue: string) {
        this.__log.set(newValue);
    }
    private __readResult: ObservedPropertySimple<string>;
    get readResult() {
        return this.__readResult.get();
    }
    set readResult(newValue: string) {
        this.__readResult.set(newValue);
    }
    private __handlePopup: ObservedPropertySimple<boolean>;
    get handlePopup() {
        return this.__handlePopup.get();
    }
    set handlePopup(newValue: boolean) {
        this.__handlePopup.set(newValue);
    }
    render() {
        Column.create();
        Column.height('100%');
        TextInput.create({ placeholder: '服务器ip', text: this.serverIP });
        TextInput.placeholderColor(Color.Gray);
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(20);
        TextInput.fontWeight(FontWeight.Bold);
        TextInput.fontFamily("sans-serif");
        TextInput.fontStyle(FontStyle.Normal);
        TextInput.fontColor(Color.Black);
        TextInput.margin({ top: 20 });
        TextInput.onChange((value: string) => {
            this.serverIP = value;
        });
        TextInput.create({ placeholder: '客户端ip', text: this.clientIP });
        TextInput.placeholderColor(Color.Gray);
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(20);
        TextInput.fontWeight(FontWeight.Bold);
        TextInput.fontFamily("sans-serif");
        TextInput.fontStyle(FontStyle.Normal);
        TextInput.fontColor(Color.Black);
        TextInput.margin({ top: 20 });
        TextInput.onChange((value: string) => {
            this.clientIP = value;
        });
        TextInput.create({ placeholder: 'share', text: this.basePath });
        TextInput.placeholderColor(Color.Gray);
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(20);
        TextInput.fontWeight(FontWeight.Bold);
        TextInput.fontFamily("sans-serif");
        TextInput.fontStyle(FontStyle.Normal);
        TextInput.fontColor(Color.Black);
        TextInput.margin({ top: 20 });
        TextInput.onChange((value: string) => {
            this.basePath = value;
        });
        TextInput.create({ placeholder: 'UserName', text: this.userName });
        TextInput.placeholderColor(Color.Gray);
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(20);
        TextInput.fontWeight(FontWeight.Bold);
        TextInput.fontFamily("sans-serif");
        TextInput.fontStyle(FontStyle.Normal);
        TextInput.fontColor(Color.Black);
        TextInput.margin({ top: 10 });
        TextInput.onChange((value: string) => {
            this.userName = value;
        });
        TextInput.create({ placeholder: 'password', text: this.password });
        TextInput.placeholderColor(Color.Gray);
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(20);
        TextInput.fontWeight(FontWeight.Bold);
        TextInput.fontFamily("sans-serif");
        TextInput.fontStyle(FontStyle.Normal);
        TextInput.fontColor(Color.Black);
        TextInput.margin({ top: 10 });
        TextInput.onChange((value: string) => {
            this.password = value;
        });
        TextInput.create({ placeholder: '文件夹名称', text: this.foldName });
        TextInput.placeholderColor(Color.Gray);
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(20);
        TextInput.fontWeight(FontWeight.Bold);
        TextInput.fontFamily("sans-serif");
        TextInput.fontStyle(FontStyle.Normal);
        TextInput.fontColor(Color.Black);
        TextInput.margin({ top: 10 });
        TextInput.onChange((value: string) => {
            this.foldName = value;
        });
        TextInput.create({ placeholder: '文件名', text: this.fileName });
        TextInput.placeholderColor(Color.Gray);
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(20);
        TextInput.fontWeight(FontWeight.Bold);
        TextInput.fontFamily("sans-serif");
        TextInput.fontStyle(FontStyle.Normal);
        TextInput.fontColor(Color.Black);
        TextInput.margin({ top: 10 });
        TextInput.onChange((value: string) => {
            this.fileName = value;
        });
        TextInput.create({ placeholder: '新文件名称', text: this.newFileName });
        TextInput.placeholderColor(Color.Gray);
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(20);
        TextInput.fontWeight(FontWeight.Bold);
        TextInput.fontFamily("sans-serif");
        TextInput.fontStyle(FontStyle.Normal);
        TextInput.fontColor(Color.Black);
        TextInput.margin({ top: 10 });
        TextInput.onChange((value: string) => {
            this.newFileName = value;
        });
        TextInput.create({ placeholder: '文件内容', text: this.content });
        TextInput.placeholderColor(Color.Gray);
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(20);
        TextInput.fontWeight(FontWeight.Bold);
        TextInput.fontFamily("sans-serif");
        TextInput.fontStyle(FontStyle.Normal);
        TextInput.fontColor(Color.Black);
        TextInput.margin({ top: 10 });
        TextInput.onChange((value: string) => {
            this.content = value;
        });
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Start, justifyContent: FlexAlign.SpaceAround });
        Flex.margin({ top: 10 });
        Flex.height(80);
        Button.createWithLabel('exit', {
            type: ButtonType.Capsule,
            stateEffect: true
        });
        Button.backgroundColor(0x317aff);
        Button.width(90);
        Button.onClick(() => {
            let smbClient = this.getClient();
            let check = this.fileName == '' ? this.foldName : this.fileName;
            if (!!smbClient) {
                try {
                    smbClient.exists(check, (err: any, exit: boolean) => {
                        if (err) {
                            console.log('smb erro:' + err.message);
                            prompt.showToast({ message: err.message, duration: 5000 });
                            smbClient!.close();
                        }
                        else {
                            prompt.showToast({ message: "文件夹或文件是否存在:" + exit, duration: 5000 });
                            console.log("smb exit:" + exit);
                        }
                    });
                }
                catch (err) {
                    console.info("smb exits error");
                }
            }
        });
        Button.pop();
        Button.createWithLabel('mkdir', {
            type: ButtonType.Capsule,
            stateEffect: true
        });
        Button.backgroundColor(0x317aff);
        Button.width(90);
        Button.onClick(() => {
            let smbClient = this.getClient();
            if (!!smbClient) {
                try {
                    smbClient.mkdir(this.foldName, (err: any) => {
                        if (err) {
                            console.log('smb erro:' + err.message);
                            prompt.showToast({ message: err.message, duration: 5000 });
                        }
                        else {
                            prompt.showToast({ message: "make dir success", duration: 5000 });
                        }
                    });
                }
                catch (err) {
                    console.info("smb mkdir error");
                }
            }
        });
        Button.pop();
        Button.createWithLabel('readdir', {
            type: ButtonType.Capsule,
            stateEffect: true
        });
        Button.backgroundColor(0x317aff);
        Button.width(90);
        Button.onClick(() => {
            let smbClient = this.getClient();
            try {
                if (!!smbClient) {
                    smbClient.readdir(this.foldName, (err: any, fileNames: any) => {
                        if (err) {
                            console.log('smb erro:' + err.message);
                            prompt.showToast({ message: err.message, duration: 5000 });
                        }
                        else {
                            prompt.showToast({ message: JSON.stringify(fileNames), duration: 5000 });
                        }
                    });
                }
            }
            catch (e) {
                console.log('smb readdir erro:');
            }
        });
        Button.pop();
        Button.createWithLabel('readFile', {
            type: ButtonType.Capsule,
            stateEffect: true
        });
        Button.backgroundColor(0x317aff);
        Button.width(120);
        Button.onClick(() => {
            let smbClient = this.getClient();
            if (!!smbClient) {
                try {
                    smbClient.readFile(this.fileName, null, (err: any, result: any) => {
                        if (err) {
                            console.log('smb erro:' + err.message);
                            prompt.showToast({ message: err.message, duration: 5000 });
                        }
                        else {
                            prompt.showToast({ message: JSON.stringify(result), duration: 5000 });
                        }
                    });
                }
                catch (e) {
                    console.log('smb readFile erro:');
                }
            }
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Start, justifyContent: FlexAlign.SpaceAround });
        Flex.margin({ top: 10 });
        Flex.height(80);
        Button.createWithLabel('rename', {
            type: ButtonType.Capsule,
            stateEffect: true
        });
        Button.backgroundColor(0x317aff);
        Button.width(90);
        Button.onClick(() => {
            let smbClient = this.getClient();
            if (!!smbClient) {
                try {
                    smbClient.rename(this.fileName, this.newFileName, (err: any) => {
                        if (err) {
                            console.log('smb erro:' + err.message);
                            prompt.showToast({ message: err.message, duration: 5000 });
                        }
                        else {
                            prompt.showToast({ message: "rename success", duration: 5000 });
                        }
                    });
                }
                catch (err) {
                    console.info("smb rename error");
                }
            }
        });
        Button.pop();
        Button.createWithLabel('writeFile', {
            type: ButtonType.Capsule,
            stateEffect: true
        });
        Button.backgroundColor(0x317aff);
        Button.width(120);
        Button.onClick(() => {
            let smbClient = this.getClient();
            if (!!smbClient) {
                try {
                    smbClient.writeFile(this.fileName, this.content, 'UTF-8', (err: any) => {
                        if (err) {
                            console.log('smb erro:' + err.message);
                            prompt.showToast({ message: err.message, duration: 5000 });
                        }
                        else {
                            prompt.showToast({ message: "writeFile success", duration: 5000 });
                        }
                    });
                }
                catch (e) {
                    console.log('smb writeFile erro:');
                }
            }
        });
        Button.pop();
        Button.createWithLabel('rmfile', {
            type: ButtonType.Capsule,
            stateEffect: true
        });
        Button.backgroundColor(0x317aff);
        Button.width(90);
        Button.onClick(() => {
            let smbClient = this.getClient();
            if (!!smbClient) {
                try {
                    smbClient.unlink(this.fileName, (err: any, result: any) => {
                        if (err) {
                            console.log('smb erro:' + err.message);
                            prompt.showToast({ message: err.message, duration: 5000 });
                        }
                        else {
                            prompt.showToast({ message: "rmfile success", duration: 5000 });
                        }
                    });
                }
                catch (e) {
                    console.log('smb unlink erro:');
                }
            }
        });
        Button.pop();
        Flex.pop();
        Column.pop();
    }
    public getClient() {
        if (!this.serverIP) {
            prompt.showToast({ message: '请输入服务器ip', duration: 2000 });
            return;
        }
        if (!this.clientIP) {
            prompt.showToast({ message: '请输入客户端ip', duration: 2000 });
            return;
        }
        if (!this.basePath) {
            prompt.showToast({ message: '请输入share', duration: 2000 });
            return;
        }
        if (!this.userName) {
            prompt.showToast({ message: '请输入用户名', duration: 2000 });
            return;
        }
        if (!this.password) {
            prompt.showToast({ message: '请输入密码', duration: 2000 });
            return;
        }
        let option: Options = new Options('\\\\' + this.serverIP + '\\' + this.basePath, 'DOMAIN', this.userName, this.password, this.clientIP);
        return new SMB2(option);
    }
}
class Options {
    share: string;
    domain: string;
    username: string;
    password: string;
    clientIP: string;
    constructor(share: string, domain: string, username: string, password: string, clientIP: string) {
        this.share = share;
        this.domain = domain;
        this.username = username;
        this.password = password;
        this.clientIP = clientIP;
    }
}
loadDocument(new Index("1", undefined, {}));
