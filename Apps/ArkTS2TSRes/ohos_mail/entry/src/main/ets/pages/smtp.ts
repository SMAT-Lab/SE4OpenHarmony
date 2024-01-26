interface Smtp_Params {
    from?: string;
    authorizationCode?: string;
    host?: string;
    hostReceive?: string;
    to?: string[];
    Cc?: string[];
    Bc?: string[];
    port?: number;
    transport?: TransPort | null;
    subject?: string;
    text?: string;
    replyMsgIndex?: number;
    frowardMsgIndex?: number;
    portReceive?: number;
    isSSL?;
    ca?: string[];
    selectIndex?;
    supportMail?: string[];
    smtpHost?: string[];
    imapHost?: string[];
    caList?: string[];
    pass?: Array<string>;
    user?: Array<string>;
    filesPath?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "smtp_" + ++__generate__Id;
}
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
import { AttachmentBody, Folder, MailLogger, Message, MimeBodyPart, MimeMessage, Properties, RecipientType, Store, TransPort, MimeMultipart, GlobalContext } from '@ohos/mail';
import prompt from '@ohos.promptAction';
import { CAUtil } from './CAUtil';
import util from '@ohos.util';
import fs from '@ohos.file.fs';
import taskpool from '@ohos.taskpool';
class Smtp extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__from = new ObservedPropertySimple("xx@qq.com", this, "from");
        this.__authorizationCode = new ObservedPropertySimple("", this, "authorizationCode");
        this.__host = new ObservedPropertySimple("smtp.qq.com", this, "host");
        this.hostReceive = "imap.qq.com";
        this.to = ["xx@qq.com", "xx@sina.com"];
        this.Cc = ["xx@yeah.net"];
        this.Bc = ["xx@qq.com"];
        this.__port = new ObservedPropertySimple(25, this, "port");
        this.transport = null;
        this.subject = "清明节放假通知";
        this.text = "3.28号放假一天";
        this.replyMsgIndex = 1;
        this.frowardMsgIndex = 1;
        this.__portReceive = new ObservedPropertySimple(143, this, "portReceive");
        this.isSSL = false;
        this.ca = [];
        this.selectIndex = 0;
        this.supportMail = [];
        this.smtpHost = [];
        this.imapHost = [];
        this.caList = [];
        this.pass = new Array<string>();
        this.user = new Array<string>();
        this.filesPath = '';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Smtp_Params) {
        if (params.from !== undefined) {
            this.from = params.from;
        }
        if (params.authorizationCode !== undefined) {
            this.authorizationCode = params.authorizationCode;
        }
        if (params.host !== undefined) {
            this.host = params.host;
        }
        if (params.hostReceive !== undefined) {
            this.hostReceive = params.hostReceive;
        }
        if (params.to !== undefined) {
            this.to = params.to;
        }
        if (params.Cc !== undefined) {
            this.Cc = params.Cc;
        }
        if (params.Bc !== undefined) {
            this.Bc = params.Bc;
        }
        if (params.port !== undefined) {
            this.port = params.port;
        }
        if (params.transport !== undefined) {
            this.transport = params.transport;
        }
        if (params.subject !== undefined) {
            this.subject = params.subject;
        }
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.replyMsgIndex !== undefined) {
            this.replyMsgIndex = params.replyMsgIndex;
        }
        if (params.frowardMsgIndex !== undefined) {
            this.frowardMsgIndex = params.frowardMsgIndex;
        }
        if (params.portReceive !== undefined) {
            this.portReceive = params.portReceive;
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
        if (params.smtpHost !== undefined) {
            this.smtpHost = params.smtpHost;
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
        this.__host.aboutToBeDeleted();
        this.__port.aboutToBeDeleted();
        this.__portReceive.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
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
    private __host: ObservedPropertySimple<string>;
    get host() {
        return this.__host.get();
    }
    set host(newValue: string) {
        this.__host.set(newValue);
    }
    private hostReceive: string;
    private to: string[];
    private Cc: string[];
    private Bc: string[];
    private __port: ObservedPropertySimple<number>;
    get port() {
        return this.__port.get();
    }
    set port(newValue: number) {
        this.__port.set(newValue);
    }
    private transport: TransPort | null;
    private subject: string;
    private text: string;
    private replyMsgIndex: number;
    private frowardMsgIndex: number;
    private __portReceive: ObservedPropertySimple<number>;
    get portReceive() {
        return this.__portReceive.get();
    }
    set portReceive(newValue: number) {
        this.__portReceive.set(newValue);
    }
    private isSSL;
    private ca: string[];
    private selectIndex;
    private supportMail: string[];
    private smtpHost: string[];
    private imapHost: string[];
    private caList: string[];
    private pass: Array<string>;
    private user: Array<string>;
    private filesPath: string;
    aboutToAppear() {
        this.supportMail = GlobalContext.getContext().getValue('supportMail') as string[];
        this.smtpHost = GlobalContext.getContext().getValue('smtpHost') as string[];
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
        Flex.margin(10);
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
                this.host = this.smtpHost[index];
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
                this.port = 465;
                this.portReceive = 993;
                return;
            }
            else {
                this.port = 25;
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
        Column.margin({ top: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Column.backgroundColor('#cbd0cf');
        Text.create('发件服务器');
        Text.fontSize(16);
        Text.margin({ top: 5 });
        Text.pop();
        TextInput.create({ text: this.host, placeholder: '请输入发件服务器地址' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.host = value;
        });
        Text.create('发件服务器端口');
        Text.fontSize(16);
        Text.margin({ top: 5 });
        Text.pop();
        TextInput.create({ text: this.port.toString(), placeholder: '请输入发件服务器端口' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.type(InputType.Number);
        TextInput.onChange((value: string) => {
            this.port = Number(value).valueOf();
        });
        Text.create('发件邮箱');
        Text.fontSize(16);
        Text.margin({ top: 5 });
        Text.pop();
        TextInput.create({ text: this.from, placeholder: '请输入发件邮箱' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.from = value;
        });
        Text.create('发件邮箱授权码');
        Text.fontSize(16);
        Text.margin({ top: 5 });
        Text.pop();
        TextInput.create({ text: this.authorizationCode, placeholder: '请输入发件邮箱授权码' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.authorizationCode = value;
        });
        Text.create('收件邮箱');
        Text.fontSize(16);
        Text.margin({ top: 5 });
        Text.pop();
        TextInput.create({ text: this.getRecipient(this.to), placeholder: '请输入收件邮箱,多个邮箱 , 隔开' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.to = value.split(",");
        });
        Text.create('抄送邮箱');
        Text.fontSize(16);
        Text.margin({ top: 5 });
        Text.pop();
        TextInput.create({ text: this.getRecipient(this.Cc), placeholder: '请输入抄送人邮箱' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.Cc = value.split(",");
        });
        Text.create('密送邮箱');
        Text.fontSize(16);
        Text.margin({ top: 5 });
        Text.pop();
        TextInput.create({ text: this.getRecipient(this.Bc), placeholder: '请输入密送人邮箱' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.Bc = value.split(",");
        });
        Text.create('邮件主题');
        Text.fontSize(16);
        Text.margin({ top: 5 });
        Text.pop();
        TextInput.create({ text: this.subject, placeholder: '请输入邮件主题' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.subject = value;
        });
        Text.create('邮件文本内容');
        Text.fontSize(16);
        Text.margin({ top: 5 });
        Text.pop();
        TextInput.create({ text: this.text, placeholder: '请输入邮件文本内容' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.text = value;
        });
        Button.createWithLabel('发送邮件', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(async (event: ClickEvent) => {
            let task = new taskpool.Task(asyncTask, this.host, this.port, this.from, this.to, this.Cc, this.Cc, this.authorizationCode, this.isSSL, this.ca);
            try {
                await taskpool.execute(task);
                prompt.showToast({ message: "发送成功！", duration: 2500 });
            }
            catch (e) {
                prompt.showToast({
                    message: "发送失败：" + JSON.stringify(e),
                    duration: 2500
                });
            }
        });
        Button.pop();
        Column.pop();
        ListItem.pop();
        ListItem.create();
        Text.create('转发邮件');
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
        Text.create('需要转发邮件的索引');
        Text.fontSize(16);
        Text.margin({ top: 5 });
        Text.pop();
        TextInput.create({ text: this.frowardMsgIndex + "", placeholder: '需要转发邮件的索引' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.type(InputType.Number);
        TextInput.onChange((value: string) => {
            this.frowardMsgIndex = Number.parseInt(value);
        });
        Button.createWithLabel('转发邮件', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick((event: ClickEvent) => {
            let properties = new Properties("imap");
            properties.setHost(this.hostReceive);
            properties.setPort(this.portReceive);
            properties.setFrom(this.from);
            properties.setAuthorizationCode(this.authorizationCode);
            properties.ssl(this.isSSL);
            if (this.isSSL) {
                properties.ca(this.ca);
            }
            let store = new Store(properties);
            store.connect(async (success: boolean, err: Error) => {
                if (success) {
                    try {
                        let folder: Folder = await store.syncGetFolder("INBOX");
                        folder.open(Folder.READ_WRITE, async () => {
                            let messages = folder.getMessages();
                            let msg = messages[this.frowardMsgIndex - 1];
                            msg.getAllHeaders(async (success: boolean, message: Message) => {
                                if (success) {
                                    message.getSubject();
                                }
                                let result = await msg.syncGetContent();
                                let mime = result as MimeMultipart;
                                let textBody: MimeBodyPart;
                                let htmlBody: MimeBodyPart;
                                try {
                                    textBody = await mime.syncGetText();
                                }
                                catch (err) {
                                }
                                try {
                                    htmlBody = await mime.syncGetHtml();
                                }
                                catch (err) {
                                }
                                let mimeMessage = new MimeMessage();
                                let attachCount = mime.getAttachmentSize();
                                //附件结尾标记
                                const endOfFile = new Uint8Array([10]);
                                //遍历附件
                                for (let i = 0; i < attachCount; i++) {
                                    try {
                                        let attachBody = mime.getAttachment(i);
                                        //接收附件数据的文件
                                        let attachmentFilePath = this.filesPath + "/" + this.frowardMsgIndex + "-附件-" + i + ".txt";
                                        let attachmentFile = fs.openSync(attachmentFilePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE | fs.OpenMode.APPEND);
                                        //获取附件数据
                                        await new Promise<string>((resolve, reject) => {
                                            mime.getAttachmentContent(i, (success: boolean, result: ArrayBufferConstructor) => {
                                                if (success) {
                                                    if (result instanceof ArrayBuffer) {
                                                        if (result.byteLength === 1) {
                                                            const resultArray = new Uint8Array(result);
                                                            if (resultArray[0] === endOfFile[0]) { //遇到结尾标记，停止写入
                                                                fs.closeSync(attachmentFile);
                                                                let attachmentStr = fs.readTextSync(attachmentFilePath);
                                                                let encoder = new util.TextEncoder();
                                                                let buffer = encoder.encode(attachmentStr);
                                                                attachBody.setUint8ArrayData(buffer);
                                                                mimeMessage.addAttachmentBody(attachBody);
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
                                let inlineAttachmentSize = mime.getInlineAttachmentSize();
                                //遍历附件
                                for (let i = 0; i < inlineAttachmentSize; i++) {
                                    try {
                                        let attachBody = mime.getInlineAttachment(i);
                                        //接收附件数据的文件
                                        let attachmentFilePath = this.filesPath + "/" + this.frowardMsgIndex + "-内联附件-" + i + ".txt";
                                        let attachmentFile = fs.openSync(attachmentFilePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE | fs.OpenMode.APPEND);
                                        //获取附件数据
                                        await new Promise<string>((resolve, reject) => {
                                            mime.getInlineAttachmentContent(i, (success: boolean, result: ArrayBufferConstructor) => {
                                                if (success) {
                                                    if (result instanceof ArrayBuffer) {
                                                        if (result.byteLength === 1) {
                                                            const resultArray = new Uint8Array(result);
                                                            if (resultArray[0] === endOfFile[0]) { //遇到结尾标记，停止写入
                                                                fs.closeSync(attachmentFile);
                                                                let attachmentStr = fs.readTextSync(attachmentFilePath);
                                                                let encoder = new util.TextEncoder();
                                                                let buffer = encoder.encode(attachmentStr);
                                                                attachBody.setUint8ArrayData(buffer);
                                                                mimeMessage.addAttachmentBody(attachBody);
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
                                let properties = new Properties();
                                properties.setFrom(this.from);
                                properties.setHost(this.host);
                                properties.setPort(this.port);
                                properties.setAuthorizationCode(this.authorizationCode);
                                this.transport = new TransPort();
                                //连接服务
                                this.transport.connect(properties, async (success: boolean, err: Error) => {
                                    if (success) {
                                        MailLogger.info('ohos_mail-- login smtp success:');
                                        mimeMessage.setFrom(this.from);
                                        mimeMessage.setRecipients(RecipientType.TO, this.to);
                                        mimeMessage.setRecipients(RecipientType.CC, this.Cc);
                                        mimeMessage.setRecipients(RecipientType.BCC, this.Bc);
                                        mimeMessage.setSubject("转发:" + message.getSubject());
                                        let text = "转发测试\r\n\r\n\r\n"
                                            + "------------------ 原始邮件 ------------------\r\n"
                                            + "发件人: " + message.getFrom()[0] + "\r\n"
                                            + "发送时间: " + message.getSentDate() + "\r\n";
                                        let to = message.getRecipients(RecipientType.TO);
                                        if (!!to) {
                                            text += "收件人: ";
                                            for (let i = 0; i < to.length; i++) {
                                                if (i != to.length - 1) {
                                                    text += to[i] + " , ";
                                                }
                                                else {
                                                    text += to[i] + "\r\n";
                                                }
                                            }
                                        }
                                        text += "主题: " + message.getSubject() + "\r\n";
                                        let cc = message.getRecipients(RecipientType.CC);
                                        if (!!cc) {
                                            text += "抄送: ";
                                            for (let i = 0; i < cc.length; i++) {
                                                if (i != cc.length - 1) {
                                                    text += cc[i] + " , ";
                                                }
                                                else {
                                                    text += cc[i] + "\r\n";
                                                }
                                            }
                                        }
                                        text += "\r\n\r\n";
                                        if (!!textBody) {
                                            text += textBody.getContent();
                                        }
                                        //设置纯文本格式的正文
                                        mimeMessage.setText(text);
                                        if (!!htmlBody) {
                                            let htmlContent: string = htmlBody.getContent();
                                            //设置html
                                            MailLogger.info('ohos_mail-- html-----' + JSON.stringify(htmlContent
                                                .substring(htmlContent
                                                .length - 100, htmlContent.length)));
                                            mimeMessage.setHtml(htmlContent);
                                        }
                                        if (this.transport != null) {
                                            //转发邮件
                                            this.transport.sendMessage(mimeMessage, (err: Error) => {
                                                if (!err) {
                                                    MailLogger.info('ohos_mail-- send message success');
                                                    prompt.showToast({
                                                        message: "转发成功！",
                                                        duration: 2500
                                                    });
                                                }
                                                else {
                                                    prompt.showToast({
                                                        message: "转发失败：" + JSON.stringify(err),
                                                        duration: 2500
                                                    });
                                                }
                                                if (this.transport != null) {
                                                    this.transport.close((err: Error) => {
                                                        if (!err) {
                                                            MailLogger.info('ohos_mail-- socket close success!');
                                                        }
                                                        else {
                                                            MailLogger.info('ohos_mail-- socket close fail:' + err);
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    }
                                    else {
                                        prompt.showToast({ message: JSON.stringify(err), duration: 2500 });
                                        MailLogger.info('ohos_mail-- login smtp fail:' + err);
                                    }
                                });
                                store.close((success: boolean) => {
                                    if (success) {
                                        MailLogger.info('ohos_mail-- close imap success');
                                    }
                                    else {
                                        MailLogger.info('ohos_mail-- close imap fail');
                                    }
                                });
                            });
                        });
                    }
                    catch (err) {
                        MailLogger.info('ohos_mail-- smtp sync get folder fail :' + err);
                    }
                }
                else {
                    prompt.showToast({ message: JSON.stringify(err), duration: 2500 });
                    MailLogger.info('ohos_mail-- login IMAP fail : ' + err);
                }
            });
        });
        Button.pop();
        Column.pop();
        ListItem.pop();
        ListItem.create();
        Text.create('回复邮件');
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
        Text.create('需要回复邮件的索引');
        Text.fontSize(16);
        Text.margin({ top: 5 });
        Text.pop();
        TextInput.create({ text: this.replyMsgIndex + "", placeholder: '需要回复邮件的索引' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.type(InputType.Number);
        TextInput.onChange((value: string) => {
            this.replyMsgIndex = Number.parseInt(value);
        });
        Button.createWithLabel('回复邮件', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick((event: ClickEvent) => {
            let properties = new Properties("imap");
            properties.setHost(this.hostReceive);
            properties.setPort(this.portReceive);
            properties.setFrom(this.from);
            properties.setAuthorizationCode(this.authorizationCode);
            properties.ssl(this.isSSL);
            if (this.isSSL) {
                properties.ca(this.ca);
            }
            let store = new Store(properties);
            store.connect(async (success: boolean, err: Error) => {
                let properties = new Properties("imap");
                properties.setHost(this.hostReceive);
                properties.setPort(this.portReceive);
                properties.setFrom(this.from);
                properties.setAuthorizationCode(this.authorizationCode);
                properties.ssl(this.isSSL);
                if (this.isSSL) {
                    properties.ca(this.ca);
                }
                let store = new Store(properties);
                store.connect(async (success: boolean, err: Error) => {
                    if (success) {
                        try {
                            let folder: Folder = await store.syncGetFolder("INBOX");
                            folder.open(Folder.READ_WRITE, async () => {
                                let messages = folder.getMessages();
                                let msg = messages[this.replyMsgIndex - 1];
                                msg.getAllHeaders(async (success: boolean, message: Message) => {
                                    if (success) {
                                        message.getSubject();
                                    }
                                    let result = await msg.syncGetContent();
                                    let mime = result as MimeMultipart;
                                    let textBody: MimeBodyPart;
                                    let htmlBody: MimeBodyPart;
                                    try {
                                        textBody = await mime.syncGetText();
                                    }
                                    catch (err) {
                                        MailLogger.info('ohos_mail-- sync getTextBody fail:' + err);
                                    }
                                    try {
                                        htmlBody = await mime.syncGetHtml();
                                    }
                                    catch (err) {
                                        MailLogger.info('ohos_mail-- sync getHtmlBody fail:' + err);
                                    }
                                    let mimeMessage = new MimeMessage();
                                    let attachCount = mime.getAttachmentSize();
                                    //附件结尾标记
                                    const endOfFile = new Uint8Array([10]);
                                    //遍历附件
                                    for (let i = 0; i < attachCount; i++) {
                                        try {
                                            let attachBody = mime.getAttachment(i);
                                            //接收附件数据的文件
                                            let attachmentFilePath = this.filesPath + "/" + this.frowardMsgIndex + "-附件-" + i + ".txt";
                                            let attachmentFile = fs.openSync(attachmentFilePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE | fs.OpenMode.APPEND);
                                            //获取附件数据
                                            await new Promise<string>((resolve, reject) => {
                                                mime.getAttachmentContent(i, (success: boolean, result: ArrayBufferConstructor) => {
                                                    if (success) {
                                                        if (result instanceof ArrayBuffer) {
                                                            if (result.byteLength === 1) {
                                                                const resultArray = new Uint8Array(result);
                                                                if (resultArray[0] === endOfFile[0]) { //遇到结尾标记，停止写入
                                                                    fs.closeSync(attachmentFile);
                                                                    let attachmentStr = fs.readTextSync(attachmentFilePath);
                                                                    let encoder = new util.TextEncoder();
                                                                    let buffer = encoder.encode(attachmentStr);
                                                                    attachBody.setUint8ArrayData(buffer);
                                                                    mimeMessage.addAttachmentBody(attachBody);
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
                                    let inlineAttachmentSize = mime.getInlineAttachmentSize();
                                    //遍历附件
                                    for (let i = 0; i < inlineAttachmentSize; i++) {
                                        try {
                                            let attachBody = mime.getInlineAttachment(i);
                                            //接收附件数据的文件
                                            let attachmentFilePath = this.filesPath + "/" + this.frowardMsgIndex + "-内联附件-" + i + ".txt";
                                            let attachmentFile = fs.openSync(attachmentFilePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE | fs.OpenMode.APPEND);
                                            //获取附件数据
                                            await new Promise<string>((resolve, reject) => {
                                                mime.getInlineAttachmentContent(i, (success: boolean, result: ArrayBufferConstructor) => {
                                                    if (success) {
                                                        if (result instanceof ArrayBuffer) {
                                                            if (result.byteLength === 1) {
                                                                const resultArray = new Uint8Array(result);
                                                                if (resultArray[0] === endOfFile[0]) { //遇到结尾标记，停止写入
                                                                    fs.closeSync(attachmentFile);
                                                                    let attachmentStr = fs.readTextSync(attachmentFilePath);
                                                                    let encoder = new util.TextEncoder();
                                                                    let buffer = encoder.encode(attachmentStr);
                                                                    attachBody.setUint8ArrayData(buffer);
                                                                    mimeMessage.addAttachmentBody(attachBody);
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
                                    let properties = new Properties();
                                    properties.setFrom(this.from);
                                    properties.setHost(this.host);
                                    properties.setPort(this.port);
                                    properties.setAuthorizationCode(this.authorizationCode);
                                    this.transport = new TransPort();
                                    //连接服务
                                    this.transport.connect(properties, (success: boolean, err: Error) => {
                                        if (success) {
                                            MailLogger.info('ohos_mail-- login smtp success:');
                                            let mimeMessage = new MimeMessage();
                                            mimeMessage.setFrom(this.from);
                                            mimeMessage.setRecipients(RecipientType.TO, this.to);
                                            mimeMessage.setRecipients(RecipientType.CC, this.Cc);
                                            mimeMessage.setRecipients(RecipientType.BCC, this.Bc);
                                            mimeMessage.setSubject("回复:" + message.getSubject());
                                            let text = "回复测试\r\n\r\n\r\n"
                                                + "------------------ 原始邮件 ------------------\r\n"
                                                + "发件人: " + message.getFrom() + "\r\n"
                                                + "发送时间: " + message.getSentDate() + "\r\n";
                                            let to = message.getRecipients(RecipientType.TO);
                                            if (!!to) {
                                                text += "收件人: ";
                                                for (let i = 0; i < to.length; i++) {
                                                    if (i != to.length - 1) {
                                                        text += to[i] + ",";
                                                    }
                                                    else {
                                                        text += to[i] + "\r\n";
                                                    }
                                                }
                                            }
                                            text += "主题: " + message.getSubject() + "\r\n";
                                            let cc = message.getRecipients(RecipientType.CC);
                                            if (!!cc) {
                                                text += "抄送: ";
                                                for (let i = 0; i < cc.length; i++) {
                                                    if (i != cc.length - 1) {
                                                        text += cc[i] + ",";
                                                    }
                                                    else {
                                                        text += cc[i] + "\r\n";
                                                    }
                                                }
                                            }
                                            if (!!message.getRecipients(RecipientType.BCC)) {
                                                text += "密送: " + message.getRecipients(RecipientType.BCC) + "\r\n";
                                            }
                                            text += "\r\n\r\n";
                                            if (!!textBody) {
                                                text += textBody.getContent();
                                            }
                                            //设置纯文本格式的正文
                                            mimeMessage.setText(text);
                                            if (!!htmlBody) {
                                                let htmlContent: string = htmlBody.getContent();
                                                //设置html
                                                MailLogger.info('ohos_mail-- html-----' + JSON.stringify(htmlContent
                                                    .substring(htmlContent
                                                    .length - 100, htmlContent.length)));
                                                mimeMessage.setHtml(htmlContent);
                                            }
                                            if (this.transport != null) {
                                                //回复邮件
                                                this.transport.sendMessage(mimeMessage, (err: Error) => {
                                                    if (!err) {
                                                        MailLogger.info('ohos_mail-- send message success');
                                                        prompt.showToast({
                                                            message: "回复成功！",
                                                            duration: 2500
                                                        });
                                                    }
                                                    else {
                                                        prompt.showToast({
                                                            message: "回复失败：" + JSON.stringify(err),
                                                            duration: 2500
                                                        });
                                                    }
                                                    if (this.transport != null) {
                                                        this.transport.close((err: Error) => {
                                                            if (!err) {
                                                                MailLogger.info('ohos_mail-- socket close success!');
                                                            }
                                                            else {
                                                                MailLogger.info('ohos_mail-- socket close fail:' + err);
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        }
                                        else {
                                            prompt.showToast({ message: JSON.stringify(err), duration: 2500 });
                                            MailLogger.info('ohos_mail-- login smtp fail:' + err);
                                        }
                                    });
                                    store.close((success: boolean) => {
                                        if (success) {
                                            MailLogger.info('ohos_mail-- close imap success');
                                        }
                                        else {
                                            MailLogger.info('ohos_mail-- close imap fail');
                                        }
                                    });
                                });
                            });
                        }
                        catch (err) {
                            MailLogger.info('ohos_mail-- smtp sync get folder fail :' + err);
                        }
                    }
                    else {
                        prompt.showToast({ message: JSON.stringify(err), duration: 2500 });
                        MailLogger.info('ohos_mail-- connect IMAP fail : ' + err);
                    }
                });
            });
        });
        Button.pop();
        Column.pop();
        ListItem.pop();
        List.pop();
        Flex.pop();
    }
    private getRecipient(arr: string[]) {
        let recipient = "";
        for (let i = 0; i < arr.length; i++) {
            if (i != arr.length - 1) {
                recipient += arr[i] + ",";
            }
            else {
                recipient += arr[i];
            }
        }
        return recipient;
    }
}
async function asyncTask(host: string, port: number, sendFrom: string, to: string[], Cc: string[], Bc: string[], authorizationCode: string, isSSL: boolean, ca: string[]) {
    "use concurrent";
    let cacheContent = GlobalContext.getContext().getValue('cacheContent');
    let ret = await Promise.all<string>([
        new Promise((resolve, reject) => {
            let subject = "张三";
            let text = "杰卡斯不打算";
            let properties = new Properties();
            properties.setFrom(sendFrom);
            properties.setHost(host);
            properties.setPort(port);
            properties.ssl(isSSL);
            if (isSSL) {
                properties.ca(ca);
            }
            properties.setAuthorizationCode(authorizationCode);
            let transport = new TransPort();
            //连接服务
            transport.connect(properties, (success: boolean, err: Error) => {
                if (success) {
                    MailLogger.info('ohos_mail-- login smtp success:');
                    let mimeMessage = new MimeMessage();
                    mimeMessage.setFrom(sendFrom);
                    mimeMessage.setRecipients(RecipientType.TO, to);
                    mimeMessage.setRecipients(RecipientType.CC, Cc);
                    mimeMessage.setRecipients(RecipientType.BCC, Bc);
                    mimeMessage.setSubject(subject);
                    mimeMessage.setMIMEVersion("1.0");
                    //设置纯文本格式的正文
                    mimeMessage.setText(text);
                    //设置html格式文件
                    //mimeMessage.setHtml("<meta http-equiv=\"" + "Content-Type" + "\"" + "content=\"" + "text/html; charset=GB2312" + "\">" + "<div>" + this.text + "</div>")
                    //设置html格式文件带图片
                    //                                        let contentId = "imag01"
                    //                                        mimeMessage.addImgInside(new MimeBodyPart(this.filesPath, "test.png", contentId))
                    //                                        let contentId1 = "imag02"
                    //                                        mimeMessage.addImgInside(new MimeBodyPart(this.filesPath, "test.png", contentId1))
                    //                                        mimeMessage.setHtml("<meta http-equiv=\"" + "Content-Type" + "\"" + "content=\"" + "text/html; charset=GB2312" + "\">"
                    //                                        + "<div>" + this.text
                    //                                        + "<img src=\"" + "cid:" + contentId + "\""
                    //                                        + "id=\"" + "img_insert_165510789654906970130739777411" + "\"" + ">"
                    //                                        + "<img src=\"" + "cid:" + contentId1 + "\""
                    //                                        + "id=\"" + "img_insert_165510789654906970130739777411" + "\"" + ">"
                    //                                        + "</div><br>")
                    //设置附件
                    let attach = new AttachmentBody("/data/storage/el2/base/haps/entry/files", "test.jpg");
                    attach.setCacheContent(cacheContent);
                    mimeMessage.addAttachmentBody(attach);
                    //发送邮件
                    transport.sendMessage(mimeMessage, (err: Error) => {
                        if (!err) {
                            MailLogger.info('ohos_mail-- send mail success!');
                            resolve("发送成功！");
                        }
                        else {
                            reject(JSON.stringify(err));
                        }
                        transport.close((err: Error) => {
                            if (!err) {
                                MailLogger.info('ohos_mail-- smtp socket close success!');
                            }
                            else {
                                MailLogger.info('ohos_mail-- smtp socket close fail:' + err);
                            }
                        });
                    });
                }
                else {
                    MailLogger.error('ohos_mail-- login smtp fail:' + JSON.stringify(err));
                    reject(JSON.stringify(err));
                }
            });
        })
    ]);
    return ret;
}
loadDocument(new Smtp("1", undefined, {}));
