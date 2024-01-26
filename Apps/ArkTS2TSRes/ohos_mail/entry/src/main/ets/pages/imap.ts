interface Imap_Params {
    scroller?: Scroller;
    from?: string;
    authorizationCode?: string;
    hostReceive?: string;
    portReceive?: number;
    readMsgIndex?: number;
    parseResult?: string;
    msgList?: string;
    deleteMsgIndex?: number;
    moveMsgIndex?: number;
    isSSL?;
    ca?: string[];
    selectIndex?;
    supportMail?: string[];
    imapHost?: string[];
    caList?: string[];
    pass?: Array<string>;
    user?: Array<string>;
    filesPath?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "imap_" + ++__generate__Id;
}
import fs from '@ohos.file.fs';
/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
import { AttachmentBody, Constant, Flag, Folder, GlobalContext, MailLogger, Message, MimeBodyPart, MimeMultipart, Properties, RecipientType, Store } from '@ohos/mail';
import prompt from '@ohos.promptAction';
import { CAUtil } from './CAUtil';
import taskpool from '@ohos.taskpool';
class Imap extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.__from = new ObservedPropertySimple("xx@qq.com", this, "from");
        this.__authorizationCode = new ObservedPropertySimple("", this, "authorizationCode");
        this.__hostReceive = new ObservedPropertySimple("imap.qq.com", this, "hostReceive");
        this.__portReceive = new ObservedPropertySimple(143, this, "portReceive");
        this.readMsgIndex = 1;
        this.__parseResult = new ObservedPropertySimple("", this, "parseResult");
        this.__msgList = new ObservedPropertySimple("", this, "msgList");
        this.deleteMsgIndex = 1;
        this.moveMsgIndex = 1;
        this.isSSL = false;
        this.ca = [];
        this.selectIndex = 0;
        this.supportMail = [];
        this.imapHost = [];
        this.caList = [];
        this.pass = new Array<string>();
        this.user = new Array<string>();
        this.filesPath = '';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Imap_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.from !== undefined) {
            this.from = params.from;
        }
        if (params.authorizationCode !== undefined) {
            this.authorizationCode = params.authorizationCode;
        }
        if (params.hostReceive !== undefined) {
            this.hostReceive = params.hostReceive;
        }
        if (params.portReceive !== undefined) {
            this.portReceive = params.portReceive;
        }
        if (params.readMsgIndex !== undefined) {
            this.readMsgIndex = params.readMsgIndex;
        }
        if (params.parseResult !== undefined) {
            this.parseResult = params.parseResult;
        }
        if (params.msgList !== undefined) {
            this.msgList = params.msgList;
        }
        if (params.deleteMsgIndex !== undefined) {
            this.deleteMsgIndex = params.deleteMsgIndex;
        }
        if (params.moveMsgIndex !== undefined) {
            this.moveMsgIndex = params.moveMsgIndex;
        }
        if (params.isSSL !== undefined) {
            this.isSSL = params.isSSL;
        }
        if (params.ca !== undefined) {
            this.ca = params.ca;
        }
        if (params.selectIndex !== undefined) {
            this.selectIndex = params.selectIndex;
        }
        if (params.supportMail !== undefined) {
            this.supportMail = params.supportMail;
        }
        if (params.imapHost !== undefined) {
            this.imapHost = params.imapHost;
        }
        if (params.caList !== undefined) {
            this.caList = params.caList;
        }
        if (params.pass !== undefined) {
            this.pass = params.pass;
        }
        if (params.user !== undefined) {
            this.user = params.user;
        }
        if (params.filesPath !== undefined) {
            this.filesPath = params.filesPath;
        }
    }
    aboutToBeDeleted() {
        this.__from.aboutToBeDeleted();
        this.__authorizationCode.aboutToBeDeleted();
        this.__hostReceive.aboutToBeDeleted();
        this.__portReceive.aboutToBeDeleted();
        this.__parseResult.aboutToBeDeleted();
        this.__msgList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private __from: ObservedPropertySimple<string>;
    get from() {
        return this.__from.get();
    }
    set from(newValue: string) {
        this.__from.set(newValue);
    }
    private __authorizationCode: ObservedPropertySimple<string>;
    get authorizationCode() {
        return this.__authorizationCode.get();
    }
    set authorizationCode(newValue: string) {
        this.__authorizationCode.set(newValue);
    }
    private __hostReceive: ObservedPropertySimple<string>;
    get hostReceive() {
        return this.__hostReceive.get();
    }
    set hostReceive(newValue: string) {
        this.__hostReceive.set(newValue);
    }
    private __portReceive: ObservedPropertySimple<number>;
    get portReceive() {
        return this.__portReceive.get();
    }
    set portReceive(newValue: number) {
        this.__portReceive.set(newValue);
    }
    private readMsgIndex: number;
    private __parseResult: ObservedPropertySimple<string>;
    get parseResult() {
        return this.__parseResult.get();
    }
    set parseResult(newValue: string) {
        this.__parseResult.set(newValue);
    }
    private __msgList: ObservedPropertySimple<string>;
    get msgList() {
        return this.__msgList.get();
    }
    set msgList(newValue: string) {
        this.__msgList.set(newValue);
    }
    private deleteMsgIndex: number;
    private moveMsgIndex: number;
    private isSSL;
    private ca: string[];
    private selectIndex;
    private supportMail: string[];
    private imapHost: string[];
    private caList: string[];
    private pass: Array<string>;
    private user: Array<string>;
    private filesPath: string;
    aboutToAppear() {
        this.supportMail = GlobalContext.getContext().getValue('supportMail') as string[];
        this.imapHost = GlobalContext.getContext().getValue('imapHost') as string[];
        this.caList = GlobalContext.getContext().getValue('caList') as string[];
        this.pass = GlobalContext.getContext().getValue('pass') as Array<string>;
        this.user = GlobalContext.getContext().getValue('user') as Array<string>;
        this.filesPath = GlobalContext.getContext().getValue('filesPath') as string;
        CAUtil.getCA(["qq.root.crt", "qq.crt"], (data: string[]) => {
            this.ca = data;
        });
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start });
        List.create({ space: 20, initialIndex: 0 });
        ListItem.create();
        Row.create();
        Column.create();
        Text.create("请选择邮箱");
        Text.fontSize("16fp");
        Text.margin({ top: "2%" });
        Text.pop();
        TextPicker.create({ range: this.supportMail, selected: this.selectIndex });
        TextPicker.height("300px");
        TextPicker.width("50%");
        TextPicker.margin({ top: "10%" });
        TextPicker.onChange((value: string | string[], index: number | number[]) => {
            if (typeof (index) == "number") {
                if (this.selectIndex == index) {
                    return;
                }
                this.hostReceive = this.imapHost[index];
                if (!!this.pass) {
                    this.authorizationCode = this.pass[index];
                }
                if (!!this.user) {
                    this.from = this.user[index];
                }
                this.selectIndex = index;
                let caList = this.caList;
                CAUtil.getCA([caList[index][0], caList[index][1]], (data: string[]) => {
                    this.ca = data;
                });
            }
        });
        TextPicker.pop();
        Column.pop();
        Row.create();
        Row.width("50%");
        Text.create("开启SSL");
        Text.fontSize("16fp");
        Text.margin({ left: "20%" });
        Text.pop();
        Toggle.create({ type: ToggleType.Switch, isOn: false });
        Toggle.selectedColor(0x39a2db);
        Toggle.switchPointColor(0xe5ffffff);
        Toggle.onChange((isOn: boolean) => {
            this.isSSL = isOn;
            if (isOn) {
                this.portReceive = 993;
            }
            else {
                this.portReceive = 143;
            }
        });
        Toggle.pop();
        Row.pop();
        Row.pop();
        ListItem.pop();
        ListItem.create();
        Column.create({ space: 12 });
        Column.width('100%');
        Column.padding(10);
        Column.alignItems(HorizontalAlign.Start);
        Column.backgroundColor('#cbd0cf');
        Text.create('接件服务器');
        Text.fontSize(16);
        Text.margin({ top: 5 });
        Text.pop();
        TextInput.create({ text: this.hostReceive, placeholder: '请输入接件服务器地址' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.hostReceive = value;
        });
        Text.create('接件服务器端口');
        Text.fontSize(16);
        Text.margin({ top: 5 });
        Text.pop();
        TextInput.create({ text: this.portReceive.toString(), placeholder: '请输入接件服务器端口' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.type(InputType.Number);
        TextInput.onChange((value: string) => {
            this.portReceive = Number(value).valueOf();
        });
        Text.create('接件邮箱');
        Text.fontSize(16);
        Text.margin({ top: 5 });
        Text.pop();
        TextInput.create({ text: this.from, placeholder: '请输入接件邮箱' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.from = value;
        });
        Text.create('接件邮箱授权码');
        Text.fontSize(16);
        Text.margin({ top: 5 });
        Text.pop();
        TextInput.create({ text: this.authorizationCode, placeholder: '请输入接件邮箱授权码' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.authorizationCode = value;
        });
        Text.create('需要读取邮件的索引');
        Text.fontSize(16);
        Text.margin({ top: 5 });
        Text.pop();
        TextInput.create({ text: this.readMsgIndex + "", placeholder: '需要读取邮件的索引' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.type(InputType.Number);
        TextInput.onChange((value: string) => {
            this.readMsgIndex = Number.parseInt(value);
        });
        Button.createWithLabel('接收邮件', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(async () => {
            this.parseResult = "";
            let properties = new Properties("imap");
            properties.setHost(this.hostReceive);
            properties.setPort(this.portReceive);
            properties.setFrom(this.from);
            properties.setAuthorizationCode(this.authorizationCode);
            properties.ssl(this.isSSL);
            if (this.isSSL) {
                properties.ca(this.ca);
            }
            let map: Map<string, string> = new Map();
            map.set("name", "myname");
            map.set("version", "1.0.0");
            map.set("vendor", "myclient");
            map.set("support-email", "xx@test.com");
            let store = new Store(properties);
            if (this.hostReceive.includes("126") || this.hostReceive.includes("163")
                || this.hostReceive.includes("yeah")) {
                store.id(map);
            }
            store.connect(async (success: boolean, err: Error) => {
                if (success) {
                    try {
                        let folder: Folder = await store.syncGetFolder("INBOX");
                        folder.open(Folder.READ_WRITE, async (err: Error) => {
                            if (!err) {
                                let messages = folder.getMessages();
                                if (messages.length > 0 && messages.length >= this.readMsgIndex) {
                                    let msg = messages[this.readMsgIndex - 1];
                                    msg.getAllHeaders(async (success: boolean, msg: Message) => {
                                        if (success) {
                                            this.parseResult += 'Headers ' + '\r\n'
                                                + '发件人:  ' + msg.getFrom()[0] + "\r\n"
                                                + '收件人:  ' + JSON.stringify(msg.getRecipients(RecipientType.TO)) + "\r\n"
                                                + '主题:  ' + msg.getSubject() + "\r\n"
                                                + '日期:  ' + msg.getSentDate()
                                                + "\r\n------------------------------------\r\n\r\n";
                                        }
                                        try {
                                            let result = await msg.syncGetContent();
                                            let mime = result as MimeMultipart;
                                            try {
                                                let textBody = await mime.syncGetText();
                                                this.parseResult += '正文 ' + '\r\n'
                                                    + 'Data:  ' + textBody.getContent() + "\r\n"
                                                    + 'CharSet:  ' + textBody.getCharSet() + "\r\n"
                                                    + 'MimeType:  ' + textBody.getMimeType() + "\r\n"
                                                    + 'TransferEncoding:  ' + textBody.getTransferEncoding()
                                                    + "\r\n------------------------------------\r\n\r\n";
                                            }
                                            catch (err) {
                                                MailLogger.info('ohos_mail-- sync getText fail:' + err);
                                            }
                                            try {
                                                let htmlBody = await mime.syncGetHtml();
                                                this.parseResult += 'Html ' + '\r\n'
                                                    + 'Data:  ' + htmlBody.getContent() + "\r\n"
                                                    + 'CharSet:  ' + htmlBody.getCharSet() + "\r\n"
                                                    + 'MimeType:  ' + htmlBody.getMimeType() + "\r\n"
                                                    + 'TransferEncoding:  ' + htmlBody.getTransferEncoding()
                                                    + "\r\n------------------------------------\r\n\r\n";
                                            }
                                            catch (err) {
                                                MailLogger.info('ohos_mail-- sync getHtml fail:' + err);
                                            }
                                            try {
                                                let calendarBody = await mime.syncGetCalendar();
                                                this.parseResult += 'Calendar ' + '\r\n'
                                                    + 'Data:  ' + calendarBody.getContent() + "\r\n"
                                                    + 'CharSet:  ' + calendarBody.getCharSet() + "\r\n"
                                                    + 'MimeType:  ' + calendarBody.getMimeType() + "\r\n"
                                                    + 'TransferEncoding:  ' + calendarBody.getTransferEncoding()
                                                    + "\r\n------------------------------------\r\n\r\n";
                                            }
                                            catch (err) {
                                                MailLogger.info('ohos_mail-- sync getCalendar fail:' + err);
                                            }
                                            let attachCount = mime.getAttachmentSize();
                                            //附件结尾标记
                                            const endOfFile = new Uint8Array([10]);
                                            for (let i = 0; i < attachCount; i++) {
                                                try {
                                                    let attachBody = mime.getAttachment(i);
                                                    this.parseResult += '附件 ' + i + '\r\n'
                                                        + 'FileName:  ' + attachBody.getFileName() + "\r\n"
                                                        + 'CharSet:  ' + attachBody.getCharSet() + "\r\n"
                                                        + 'MimeType:  ' + attachBody.getMimeType() + "\r\n"
                                                        + 'TransferEncoding:  ' + attachBody.getEncoding()
                                                        + "\r\n------------------------------------\r\n\r\n";
                                                    //接收附件数据的文件
                                                    let attachmentFilePath = this.filesPath + "/" + i + ".txt";
                                                    let attachmentFile = fs.openSync(attachmentFilePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE | fs.OpenMode.APPEND);
                                                    //获取附件数据
                                                    await new Promise<string>((resolve, reject) => {
                                                        mime.getAttachmentContent(i, (success: boolean, result: any) => {
                                                            if (success) {
                                                                if (result instanceof ArrayBuffer) {
                                                                    if (result.byteLength === 1) {
                                                                        const resultArray = new Uint8Array(result);
                                                                        if (resultArray[0] === endOfFile[0]) { //遇到结尾标记，停止写入
                                                                            fs.closeSync(attachmentFile);
                                                                            resolve("ok");
                                                                        }
                                                                    }
                                                                    else {
                                                                        fs.writeSync(attachmentFile.fd, result); //写入数据
                                                                    }
                                                                }
                                                            }
                                                            else {
                                                                reject(result);
                                                            }
                                                        });
                                                    });
                                                }
                                                catch (err) {
                                                    MailLogger.info('ohos_mail-- sync getAttachment fail:' + err);
                                                }
                                            }
                                            store.close((success: boolean) => {
                                                if (success) {
                                                    MailLogger.info('ohos_mail-- close imap success');
                                                }
                                                else {
                                                    MailLogger.info('ohos_mail-- close imap fail');
                                                }
                                            });
                                        }
                                        catch (err) {
                                            MailLogger.info('ohos_mail-- sync getContent fail:' + err);
                                        }
                                    });
                                }
                            }
                            else {
                                prompt.showToast({ message: JSON.stringify(err), duration: 4000 });
                                MailLogger.info('ohos_mail-- open folder fail : ' + err);
                                return;
                            }
                        });
                    }
                    catch (err) {
                        MailLogger.info('ohos_mail-- imap sync get folder fail:' + err);
                    }
                }
                else {
                    prompt.showToast({ message: JSON.stringify(err), duration: 4000 });
                    MailLogger.info('ohos_mail-- login IMAP fail : ' + err);
                }
            });
        });
        Button.pop();
        Button.createWithLabel('接收邮件(taskpool)', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(async () => {
            this.parseResult = "";
            let task = new taskpool.Task(asyncTask, this.readMsgIndex, this.hostReceive, this.portReceive, this.from, this.authorizationCode, this.isSSL, this.ca, this.filesPath);
            taskpool.execute(task).then((result: string) => {
                this.parseResult = result as string;
            });
        });
        Button.pop();
        Text.create("邮件内容\r\n\r\n" + this.parseResult);
        Text.width('90%');
        Text.fontSize(18);
        Text.padding({ left: 10 });
        Text.fontWeight(FontWeight.Bold);
        Text.border({ width: 2, radius: 10, color: Color.Black });
        Text.margin({ top: 10 });
        Text.pop();
        Column.pop();
        ListItem.pop();
        ListItem.create();
        Text.create('更新');
        Text.fontColor('#333333');
        Text.fontSize(20);
        Text.fontWeight(800);
        Text.margin({ top: 20 });
        Text.pop();
        ListItem.pop();
        ListItem.create();
        Column.create({ space: 12 });
        Column.width('100%');
        Column.padding(10);
        Column.margin({ top: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Column.backgroundColor('#cbd0cf');
        Button.createWithLabel('更新邮箱(获取最近10封邮件)', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(async () => {
            let properties = new Properties("imap");
            properties.setHost(this.hostReceive);
            properties.setPort(this.portReceive);
            properties.setFrom(this.from);
            properties.setAuthorizationCode(this.authorizationCode);
            properties.ssl(this.isSSL);
            if (this.isSSL) {
                properties.ca(this.ca);
            }
            let map: Map<string, string> = new Map();
            map.set("name", "myname");
            map.set("version", "1.0.0");
            map.set("vendor", "myclient");
            map.set("support-email", "xx@test.com");
            let store = new Store(properties);
            if (this.hostReceive.includes("126") || this.hostReceive.includes("163") || this.hostReceive.includes("yeah")) {
                store.id(map);
            }
            this.msgList = '';
            store.connect(async (success: boolean, err: Error) => {
                if (success) {
                    try {
                        let folder: Folder = await store.syncGetFolder("INBOX");
                        folder.open(Folder.READ_WRITE, async (err: Error) => {
                            let messages = folder.getMessages();
                            MailLogger.info('ohos_mail-- open-------------------------' + messages.length);
                            this.msgList = "";
                            let start = messages.length < 10 ? 0 : messages.length - 10;
                            for (let i = start; i < messages.length; i++) {
                                await new Promise<string>((resolve, reject) => {
                                    messages[i].getAllHeaders((success: boolean, result: any) => {
                                        if (success) {
                                            this.msgList += i + 1 + "\r\n"
                                                + '发件人：' + result.getFrom()[0] + Constant.LINEFEED + Constant.LINEFEED
                                                + '主题：' + result.getSubject() + Constant.LINEFEED + Constant.LINEFEED
                                                + '收件人:  ' + JSON.stringify(result.getRecipients(RecipientType.TO)) + Constant.LINEFEED
                                                + '日期:  ' + result.getSentDate() + Constant.LINEFEED + Constant.LINEFEED
                                                + "-----------------------------------------------------------------------\r\n\r\n";
                                        }
                                        resolve('');
                                    });
                                });
                            }
                            store.close((success: boolean) => {
                                if (success) {
                                    MailLogger.info('ohos_mail-- close imap success');
                                }
                                else {
                                    MailLogger.info('ohos_mail-- close imap fail');
                                }
                            });
                        });
                    }
                    catch (err) {
                        MailLogger.info('ohos_mail-- imap sync get folder fail:' + err);
                    }
                }
                else {
                    prompt.showToast({ message: JSON.stringify(err), duration: 4000 });
                    MailLogger.info('ohos_mail-- login IMAP fail : ' + err);
                }
            });
        });
        Button.pop();
        Text.create("邮件内容\r\n" + this.msgList);
        Text.width('90%');
        Text.fontSize(20);
        Text.padding({ left: 10 });
        Text.fontWeight(FontWeight.Bold);
        Text.border({ width: 2, radius: 10, color: Color.Black });
        Text.margin({ top: 50 });
        Text.pop();
        Column.pop();
        ListItem.pop();
        ListItem.create();
        Text.create('删除邮件');
        Text.fontColor('#333333');
        Text.fontSize(20);
        Text.fontWeight(800);
        Text.margin({ top: 20 });
        Text.pop();
        ListItem.pop();
        ListItem.create();
        Column.create({ space: 12 });
        Column.width('100%');
        Column.padding(10);
        Column.margin({ top: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Column.backgroundColor('#cbd0cf');
        Text.create('要删除邮件的编号');
        Text.fontSize(16);
        Text.margin({ top: 5 });
        Text.pop();
        TextInput.create({ text: this.deleteMsgIndex + "", placeholder: '要删除邮件的编号' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.type(InputType.Number);
        TextInput.onChange((value: string) => {
            this.deleteMsgIndex = Number.parseInt(value);
        });
        Button.createWithLabel('删除邮件', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(async () => {
            let properties = new Properties("imap");
            properties.setHost(this.hostReceive);
            properties.setPort(this.portReceive);
            properties.setFrom(this.from);
            properties.setAuthorizationCode(this.authorizationCode);
            properties.ssl(this.isSSL);
            if (this.isSSL) {
                properties.ca(this.ca);
            }
            let map: Map<string, string> = new Map();
            map.set("name", "myname");
            map.set("version", "1.0.0");
            map.set("vendor", "myclient");
            map.set("support-email", "xx@test.com");
            let store = new Store(properties);
            if (this.hostReceive.includes("126") || this.hostReceive.includes("163") || this.hostReceive.includes("yeah")) {
                store.id(map);
            }
            store.connect(async (success: boolean, err: Error) => {
                if (success) {
                    try {
                        let folder: Folder = await store.syncGetFolder("INBOX");
                        folder.open(Folder.READ_WRITE, () => {
                            let msgs = folder.getMessages();
                            console.info("delete msg----" + msgs.length);
                            if (msgs.length > 0 && this.deleteMsgIndex > 0 && this.deleteMsgIndex <= msgs.length) {
                                msgs[this.deleteMsgIndex - 1].setFlags([Flag.DELETED], true, async (err: Error) => {
                                    if (!err) {
                                        try {
                                            await folder.syncExpunge();
                                            MailLogger.info('ohos_mail-- expunge success');
                                            prompt.showToast({
                                                message: "删除成功",
                                                duration: 2500
                                            });
                                        }
                                        catch (err) {
                                            MailLogger.info('ohos_mail-- expunge fail: ' + err);
                                            prompt.showToast({
                                                message: "删除失败" + err,
                                                duration: 2500
                                            });
                                        }
                                        return;
                                    }
                                    prompt.showToast({ message: "删除失败：" + err, duration: 2000 });
                                    store.close((success: boolean) => {
                                        if (success) {
                                            MailLogger.info('ohos_mail-- close imap success');
                                        }
                                        else {
                                            MailLogger.info('ohos_mail-- close imap fail');
                                        }
                                    });
                                });
                            }
                            else {
                                prompt.showToast({ message: "不存在此邮件", duration: 2000 });
                            }
                        });
                    }
                    catch (err) {
                        MailLogger.info('ohos_mail-- imap sync get folder fail:' + err);
                    }
                }
                else {
                    prompt.showToast({ message: JSON.stringify(err), duration: 4000 });
                    MailLogger.info('ohos_mail-- login IMAP fail : ' + err);
                }
            });
        });
        Button.pop();
        Column.pop();
        ListItem.pop();
        ListItem.create();
        Text.create('移动邮件');
        Text.fontColor('#333333');
        Text.fontSize(20);
        Text.fontWeight(800);
        Text.margin({ top: 20 });
        Text.pop();
        ListItem.pop();
        ListItem.create();
        Column.create({ space: 12 });
        Column.width('100%');
        Column.padding(10);
        Column.margin({ top: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Column.backgroundColor('#cbd0cf');
        Text.create('要移动邮件的编号');
        Text.fontSize(16);
        Text.margin({ top: 5 });
        Text.pop();
        TextInput.create({ text: this.deleteMsgIndex + "", placeholder: '要移动邮件的编号' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.type(InputType.Number);
        TextInput.onChange((value: string) => {
            this.moveMsgIndex = Number.parseInt(value);
        });
        Button.createWithLabel('移动邮件', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(async () => {
            let properties = new Properties("imap");
            properties.setHost(this.hostReceive);
            properties.setPort(this.portReceive);
            properties.setFrom(this.from);
            properties.setAuthorizationCode(this.authorizationCode);
            properties.ssl(this.isSSL);
            if (this.isSSL) {
                properties.ca(this.ca);
            }
            let map: Map<string, string> = new Map();
            map.set("name", "myname");
            map.set("version", "1.0.0");
            map.set("vendor", "myclient");
            map.set("support-email", "xx@test.com");
            let store = new Store(properties);
            if (this.hostReceive.includes("126") || this.hostReceive.includes("163") || this.hostReceive.includes("yeah")) {
                store.id(map);
            }
            store.connect(async (success: boolean, err: Error) => {
                if (success) {
                    try {
                        let defaultFolder = store.getDefaultFolder();
                        let list: Array<Folder> = await defaultFolder.syncList();
                        for (let i = 0; i < list.length; i++) {
                            MailLogger.info('ohos_mail-- folder list:' + list[i].getName());
                        }
                        let folder: Folder = await store.syncGetFolder("INBOX");
                        folder.open(Folder.READ_WRITE, async (err: Error) => {
                            if (!err) {
                                let messages = folder.getMessages();
                                await folder.syncMoveMessages([messages[this.moveMsgIndex - 1]], new Folder('Drafts'));
                                MailLogger.info('ohos_mail-- moveMessages success');
                                prompt.showToast({ message: "移动成功", duration: 4000 });
                                await store.syncClose();
                            }
                            else {
                                MailLogger.info('ohos_mail-- imap open folder fail:' + err);
                            }
                        });
                    }
                    catch (err) {
                        MailLogger.info('ohos_mail-- imap sync get folder fail:' + err);
                    }
                }
                else {
                    prompt.showToast({ message: JSON.stringify(err), duration: 4000 });
                    MailLogger.info('ohos_mail-- login IMAP fail : ' + err);
                }
            });
        });
        Button.pop();
        Column.pop();
        ListItem.pop();
        List.pop();
        Flex.pop();
    }
}
async function asyncTask(index: number, hostReceive: string, portReceive: number, from: string, authorizationCode: string, isSSL: boolean, ca: string[], filesPath: string) {
    "use concurrent";
    let ret = await Promise.all<string>([
        new Promise((resolve, reject) => {
            let parseResult = "";
            let properties = new Properties("imap");
            properties.setHost(hostReceive);
            properties.setPort(portReceive);
            properties.setFrom(from);
            properties.setAuthorizationCode(authorizationCode);
            properties.ssl(isSSL);
            if (isSSL) {
                properties.ca(ca);
            }
            let map: Map<string, string> = new Map();
            map.set("name", "myname");
            map.set("version", "1.0.0");
            map.set("vendor", "myclient");
            map.set("support-email", "xx@test.com");
            let store = new Store(properties);
            if (hostReceive.includes("126") || hostReceive.includes("163")
                || hostReceive.includes("yeah")) {
                store.id(map);
            }
            store.connect(async (success: boolean, err: Error) => {
                if (success) {
                    try {
                        let folder: Folder = await store.syncGetFolder("INBOX");
                        folder.open(Folder.READ_WRITE, async (err: Error) => {
                            if (!err) {
                                let messages = folder.getMessages();
                                if (messages.length > 0 && messages.length >= index) {
                                    let msg = messages[index - 1];
                                    msg.getAllHeaders(async (success: boolean, msg: Message) => {
                                        if (success) {
                                            parseResult += 'Headers ' + '\r\n'
                                                + '发件人:  ' + msg.getFrom()[0] + "\r\n"
                                                + '收件人:  ' + JSON.stringify(msg.getRecipients(RecipientType.TO)) + "\r\n"
                                                + '主题:  ' + msg.getSubject() + "\r\n"
                                                + '日期:  ' + msg.getSentDate()
                                                + "\r\n------------------------------------\r\n\r\n";
                                        }
                                        try {
                                            let result = await msg.syncGetContent();
                                            let mime = result as MimeMultipart;
                                            try {
                                                let textBody = await mime.syncGetText();
                                                parseResult += '正文 ' + '\r\n'
                                                    + 'Data:  ' + textBody.getContent() + "\r\n"
                                                    + 'CharSet:  ' + textBody.getCharSet() + "\r\n"
                                                    + 'MimeType:  ' + textBody.getMimeType() + "\r\n"
                                                    + 'TransferEncoding:  ' + textBody.getTransferEncoding()
                                                    + "\r\n------------------------------------\r\n\r\n";
                                            }
                                            catch (err) {
                                                MailLogger.info('ohos_mail-- sync getText fail:' + err);
                                            }
                                            try {
                                                let htmlBody = await mime.syncGetHtml();
                                                parseResult += 'Html ' + '\r\n'
                                                    + 'Data:  ' + htmlBody.getContent() + "\r\n"
                                                    + 'CharSet:  ' + htmlBody.getCharSet() + "\r\n"
                                                    + 'MimeType:  ' + htmlBody.getMimeType() + "\r\n"
                                                    + 'TransferEncoding:  ' + htmlBody.getTransferEncoding()
                                                    + "\r\n------------------------------------\r\n\r\n";
                                                MailLogger.info('ohos_mail--  data** :' + htmlBody.getContent());
                                            }
                                            catch (err) {
                                                MailLogger.info('ohos_mail-- sync getHtml fail:' + err);
                                            }
                                            try {
                                                let calendar = await mime.syncGetCalendar();
                                                parseResult += 'Calendar ' + '\r\n'
                                                    + 'Data:  ' + calendar.getContent() + "\r\n"
                                                    + 'CharSet:  ' + calendar.getCharSet() + "\r\n"
                                                    + 'MimeType:  ' + calendar.getMimeType() + "\r\n"
                                                    + 'TransferEncoding:  ' + calendar.getTransferEncoding()
                                                    + "\r\n------------------------------------\r\n\r\n";
                                            }
                                            catch (err) {
                                                MailLogger.info('ohos_mail-- sync getCalendar fail:' + err);
                                            }
                                            let attachCount = mime.getAttachmentSize();
                                            //附件结尾标记
                                            const endOfFile = new Uint8Array([10]);
                                            //遍历附件
                                            for (let i = 0; i < attachCount; i++) {
                                                try {
                                                    let attachBody = mime.getAttachment(i);
                                                    parseResult += '附件 ' + i + '\r\n'
                                                        + 'FileName:  ' + attachBody.getFileName() + "\r\n"
                                                        + 'CharSet:  ' + attachBody.getCharSet() + "\r\n"
                                                        + 'MimeType:  ' + attachBody.getMimeType() + "\r\n"
                                                        + 'TransferEncoding:  ' + attachBody.getEncoding()
                                                        + "\r\n------------------------------------\r\n\r\n";
                                                    //接收附件数据的文件
                                                    let attachmentFilePath = filesPath + "/" + i + ".txt";
                                                    let attachmentFile = fs.openSync(attachmentFilePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE | fs.OpenMode.APPEND);
                                                    //获取附件数据
                                                    await new Promise<string>((resolve, reject) => {
                                                        mime.getAttachmentContent(i, (success: boolean, result: any) => {
                                                            if (success) {
                                                                if (result instanceof ArrayBuffer) {
                                                                    if (result.byteLength === 1) {
                                                                        const resultArray = new Uint8Array(result);
                                                                        if (resultArray[0] === endOfFile[0]) { //遇到结尾标记，停止写入
                                                                            fs.closeSync(attachmentFile);
                                                                            resolve("ok");
                                                                        }
                                                                    }
                                                                    else {
                                                                        fs.writeSync(attachmentFile.fd, result); //写入数据
                                                                    }
                                                                }
                                                            }
                                                            else {
                                                                reject(result);
                                                            }
                                                        });
                                                    });
                                                }
                                                catch (err) {
                                                    MailLogger.info('ohos_mail-- sync getAttachment fail:' + err);
                                                }
                                            }
                                            resolve(parseResult);
                                            store.close((success: boolean) => {
                                                if (success) {
                                                    MailLogger.info('ohos_mail-- close imap success');
                                                }
                                                else {
                                                    MailLogger.info('ohos_mail-- close imap fail');
                                                }
                                            });
                                        }
                                        catch (err) {
                                            reject(err);
                                            MailLogger.info('ohos_mail-- sync getContent fail:' + err);
                                        }
                                    });
                                }
                            }
                            else {
                                MailLogger.info('ohos_mail-- open folder fail : ' + err);
                                return;
                            }
                        });
                    }
                    catch (err) {
                        reject(err);
                        MailLogger.info('ohos_mail-- imap sync get folder fail:' + err);
                    }
                }
                else {
                    MailLogger.info('ohos_mail-- login IMAP fail : ' + err);
                }
            });
        })
    ]);
    return ret;
}
loadDocument(new Imap("1", undefined, {}));
