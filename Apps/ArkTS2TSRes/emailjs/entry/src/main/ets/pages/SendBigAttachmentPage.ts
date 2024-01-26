interface SendBigAttachmentPage_Params {
    message?: string;
    from?: string;
    accountName?: string;
    to?: string;
    cc?: string;
    bcc?: string;
    subject?: string;
    content?: string;
    bigFileInfo?: string;
    bigFileName?: string;
    attachment?: Array<MessageAttachment>;
    mailType?: string;
    textValue?: string;
    inputValue?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SendBigAttachmentPage_" + ++__generate__Id;
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
import { Message, MessageAttachment, MessageHeaders } from '@ohos/emailjs';
import fs from '@ohos.file.fs';
import GlobalObj from '../GlobalObj';
const BASE_COUNT = 1;
class SendBigAttachmentPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__from = new ObservedPropertySimple('', this, "from");
        this.__accountName = new ObservedPropertySimple('OH邮件客户端', this, "accountName");
        this.__to = new ObservedPropertySimple('xxx@qq.com', this, "to");
        this.__cc = new ObservedPropertySimple('xxx@163.com', this, "cc");
        this.__bcc = new ObservedPropertySimple('xxx@139.com', this, "bcc");
        this.__subject = new ObservedPropertySimple('这是OH测试主题', this, "subject");
        this.__content = new ObservedPropertySimple('这是测试的鸿蒙邮件正文，邮件的收件人，抄送，密件抄送的格式为：someone <someone@your-email.com>, another <another@your-email.com>，多个账号以英文逗号,连接。', this, "content");
        this.__bigFileInfo = new ObservedPropertySimple('暂无附件', this, "bigFileInfo");
        this.__bigFileName = new ObservedPropertySimple('', this, "bigFileName");
        this.__attachment = new ObservedPropertyObject([], this, "attachment");
        this.__mailType = new ObservedPropertySimple('@qq.com', this, "mailType");
        this.__textValue = new ObservedPropertySimple('', this, "textValue");
        this.__inputValue = new ObservedPropertySimple('click me', this, "inputValue");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SendBigAttachmentPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.from !== undefined) {
            this.from = params.from;
        }
        if (params.accountName !== undefined) {
            this.accountName = params.accountName;
        }
        if (params.to !== undefined) {
            this.to = params.to;
        }
        if (params.cc !== undefined) {
            this.cc = params.cc;
        }
        if (params.bcc !== undefined) {
            this.bcc = params.bcc;
        }
        if (params.subject !== undefined) {
            this.subject = params.subject;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.bigFileInfo !== undefined) {
            this.bigFileInfo = params.bigFileInfo;
        }
        if (params.bigFileName !== undefined) {
            this.bigFileName = params.bigFileName;
        }
        if (params.attachment !== undefined) {
            this.attachment = params.attachment;
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
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__from.aboutToBeDeleted();
        this.__accountName.aboutToBeDeleted();
        this.__to.aboutToBeDeleted();
        this.__cc.aboutToBeDeleted();
        this.__bcc.aboutToBeDeleted();
        this.__subject.aboutToBeDeleted();
        this.__content.aboutToBeDeleted();
        this.__bigFileInfo.aboutToBeDeleted();
        this.__bigFileName.aboutToBeDeleted();
        this.__attachment.aboutToBeDeleted();
        this.__mailType.aboutToBeDeleted();
        this.__textValue.aboutToBeDeleted();
        this.__inputValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __from: ObservedPropertySimple<string>;
    get from() {
        return this.__from.get();
    }
    set from(newValue: string) {
        this.__from.set(newValue);
    }
    private __accountName: ObservedPropertySimple<string>;
    get accountName() {
        return this.__accountName.get();
    }
    set accountName(newValue: string) {
        this.__accountName.set(newValue);
    }
    private __to: ObservedPropertySimple<string>;
    get to() {
        return this.__to.get();
    }
    set to(newValue: string) {
        this.__to.set(newValue);
    }
    private __cc: ObservedPropertySimple<string>;
    get cc() {
        return this.__cc.get();
    }
    set cc(newValue: string) {
        this.__cc.set(newValue);
    }
    private __bcc: ObservedPropertySimple<string>;
    get bcc() {
        return this.__bcc.get();
    }
    set bcc(newValue: string) {
        this.__bcc.set(newValue);
    }
    private __subject: ObservedPropertySimple<string>;
    get subject() {
        return this.__subject.get();
    }
    set subject(newValue: string) {
        this.__subject.set(newValue);
    }
    private __content: ObservedPropertySimple<string>;
    get content() {
        return this.__content.get();
    }
    set content(newValue: string) {
        this.__content.set(newValue);
    }
    private __bigFileInfo: ObservedPropertySimple<string>;
    get bigFileInfo() {
        return this.__bigFileInfo.get();
    }
    set bigFileInfo(newValue: string) {
        this.__bigFileInfo.set(newValue);
    }
    private __bigFileName: ObservedPropertySimple<string>;
    get bigFileName() {
        return this.__bigFileName.get();
    }
    set bigFileName(newValue: string) {
        this.__bigFileName.set(newValue);
    }
    private __attachment: ObservedPropertyObject<Array<MessageAttachment>>;
    get attachment() {
        return this.__attachment.get();
    }
    set attachment(newValue: Array<MessageAttachment>) {
        this.__attachment.set(newValue);
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
    aboutToDisappear() {
        GlobalObj?.getInstance()?.getClient()?.close(true);
    }
    showToast(text: string, name = '测试') {
        console.log(`zdy---${name}--->${text}`);
        promptAction.showToast({
            message: text,
            duration: 2000,
            bottom: 50
        });
    }
    aboutToAppear() {
        let params = router.getParams();
        let temp = params as Record<string, Object>;
        if (temp && temp['sendCount'] && typeof temp['sendCount'] === 'string') {
            this.from = temp['sendCount'];
        }
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Scroll.create();
        Scroll.width('100%');
        Scroll.height('100%');
        Flex.create({
            alignItems: ItemAlign.Center,
            justifyContent: FlexAlign.Center,
            alignContent: FlexAlign.Center,
            direction: FlexDirection.Column
        });
        Text.create('添加信息，发送邮件');
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
        Flex.height(100);
        Flex.margin({ top: 10, right: 10 });
        Text.create(`发件人(${this.from})昵称：`);
        Text.fontSize(20);
        Text.height(50);
        Text.textAlign(TextAlign.Center);
        Text.margin({ right: 5 });
        Text.pop();
        TextInput.create({ placeholder: '请输入发件人昵称', text: this.accountName });
        TextInput.layoutWeight(1);
        TextInput.fontSize(20);
        TextInput.height(50);
        TextInput.borderWidth(2);
        TextInput.textAlign(TextAlign.Start);
        TextInput.borderColor(Color.Gray);
        TextInput.type(InputType.Normal);
        TextInput.onChange((data) => {
            this.accountName = data;
        });
        Flex.pop();
        Flex.create({
            alignItems: ItemAlign.Start,
            justifyContent: FlexAlign.Start,
            alignContent: FlexAlign.Start,
            direction: FlexDirection.Row
        });
        Flex.margin({ right: 10 });
        Text.create('收件人：');
        Text.fontSize(20);
        Text.height(50);
        Text.textAlign(TextAlign.Center);
        Text.margin({ right: 5 });
        Text.pop();
        TextInput.create({
            placeholder: '格式为：xx <xx@yxx.com>, xx <xx@yxx.com>，多个账号以英文逗号,连接。',
            text: this.to
        });
        TextInput.layoutWeight(1);
        TextInput.fontSize(20);
        TextInput.height(50);
        TextInput.borderWidth(2);
        TextInput.textAlign(TextAlign.Start);
        TextInput.borderColor(Color.Gray);
        TextInput.type(InputType.Normal);
        TextInput.onChange((data) => {
            this.to = data;
        });
        Flex.pop();
        Flex.create({
            alignItems: ItemAlign.Start,
            justifyContent: FlexAlign.Start,
            alignContent: FlexAlign.Start,
            direction: FlexDirection.Row
        });
        Flex.margin({ top: 10, right: 10 });
        Text.create('抄送：');
        Text.fontSize(20);
        Text.height(50);
        Text.textAlign(TextAlign.Center);
        Text.margin({ right: 5 });
        Text.pop();
        TextInput.create({
            placeholder: '格式为：xx <xx@xxx.com>, xx <xx@yxx.com>，多个账号以英文逗号,连接。',
            text: this.cc
        });
        TextInput.layoutWeight(1);
        TextInput.fontSize(20);
        TextInput.height(50);
        TextInput.borderWidth(2);
        TextInput.textAlign(TextAlign.Start);
        TextInput.borderColor(Color.Gray);
        TextInput.type(InputType.Normal);
        TextInput.onChange((data) => {
            this.cc = data;
        });
        Flex.pop();
        Flex.create({
            alignItems: ItemAlign.Start,
            justifyContent: FlexAlign.Start,
            alignContent: FlexAlign.Start,
            direction: FlexDirection.Row
        });
        Flex.margin({ top: 10, right: 10 });
        Text.create('密件抄送抄送：');
        Text.fontSize(20);
        Text.height(50);
        Text.textAlign(TextAlign.Center);
        Text.margin({ right: 5 });
        Text.pop();
        TextInput.create({
            placeholder: '格式为：xx <xx@yxx.com>, xx <xx@yxx.com>，多个账号以英文逗号,连接。',
            text: this.bcc
        });
        TextInput.layoutWeight(1);
        TextInput.fontSize(20);
        TextInput.height(50);
        TextInput.borderWidth(2);
        TextInput.textAlign(TextAlign.Center);
        TextInput.borderColor(Color.Gray);
        TextInput.type(InputType.Normal);
        TextInput.onChange((data) => {
            this.bcc = data;
        });
        Flex.pop();
        Flex.create({
            alignItems: ItemAlign.Start,
            justifyContent: FlexAlign.Start,
            alignContent: FlexAlign.Start,
            direction: FlexDirection.Row
        });
        Flex.margin({ top: 10, right: 10 });
        Text.create('主题：');
        Text.fontSize(20);
        Text.height(50);
        Text.textAlign(TextAlign.Center);
        Text.margin({ right: 5 });
        Text.pop();
        TextInput.create({ placeholder: '请输入邮件主题', text: this.subject });
        TextInput.layoutWeight(1);
        TextInput.fontSize(20);
        TextInput.height(50);
        TextInput.borderWidth(2);
        TextInput.textAlign(TextAlign.Start);
        TextInput.borderColor(Color.Gray);
        TextInput.type(InputType.Normal);
        TextInput.onChange((data) => {
            this.subject = data;
        });
        Flex.pop();
        Flex.create({
            alignItems: ItemAlign.Start,
            justifyContent: FlexAlign.Start,
            alignContent: FlexAlign.Start,
            direction: FlexDirection.Column
        });
        Flex.height(160);
        Flex.margin({ top: 10, right: 10 });
        Text.create('正文：');
        Text.fontSize(20);
        Text.height(50);
        Text.textAlign(TextAlign.Center);
        Text.margin({ right: 5 });
        Text.pop();
        TextInput.create({
            placeholder: '请输入邮件正文',
            text: this.content
        });
        TextInput.layoutWeight(1);
        TextInput.fontSize(20);
        TextInput.height(100);
        TextInput.margin({ left: 5, right: 5 });
        TextInput.borderWidth(2);
        TextInput.textAlign(TextAlign.Start);
        TextInput.borderColor(Color.Gray);
        TextInput.type(InputType.Normal);
        TextInput.onChange((data) => {
            this.content = data;
        });
        Flex.pop();
        Text.create('大附件需要手动推入设备沙箱，多个大附件仅选取第一个');
        Text.fontSize(20);
        Text.height(50);
        Text.textAlign(TextAlign.Center);
        Text.margin({ right: 5 });
        Text.pop();
        Flex.create({
            alignItems: ItemAlign.Start,
            justifyContent: FlexAlign.Start,
            alignContent: FlexAlign.Start,
            direction: FlexDirection.Row
        });
        Flex.margin({ right: 10 });
        Button.createWithLabel('添加大附件');
        Button.fontSize(20);
        Button.height(50);
        Button.onClick(() => {
            this.addBigFile();
        });
        Button.margin({ right: 5 });
        Button.pop();
        Text.create(this.bigFileInfo);
        Text.fontSize(20);
        Text.height(50);
        Text.visibility(this.bigFileName && this.bigFileName.length > 0 ? Visibility.Visible : Visibility.None);
        Text.textAlign(TextAlign.Center);
        Text.margin({ right: 5 });
        Text.pop();
        Flex.pop();
        Button.createWithLabel('发送邮件');
        Button.margin(20);
        Button.width('80%');
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.sendMail();
        });
        Button.margin({ top: 10 });
        Button.pop();
        Flex.pop();
        Scroll.pop();
        Column.pop();
        Row.pop();
    }
    async sendMail() {
        try {
            this.mailType = this.to.substring(this.to.lastIndexOf('@' + 1), this.to.lastIndexOf('.'));
            if (GlobalObj?.getInstance()?.getClient()) {
                if (GlobalObj?.getInstance()?.getClient()?.isLogin()) {
                    GlobalObj?.getInstance()?.getClient()?.setQuitAfterSendDone(true); // 设置发送完毕之后客户端是否退出 源库逻辑默认退出
                    let msg: Message | MessageHeaders = {
                        text: this.content,
                        from: `${this.accountName} <${this.from}>`,
                        to: this.to,
                        cc: this.cc,
                        bcc: this.bcc,
                        subject: this.subject,
                        attachment: this.attachment
                    };
                    let startTime1 = new Date().getTime();
                    const message = await GlobalObj?.getInstance()?.getClient()?.sendAsync(msg);
                    let endTime1 = new Date().getTime();
                    let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                    console.log("sendAsync averageTime : " + averageTime1 + "us");
                    this.showToast('邮件发送成功', 'sendmail-smtp');
                    if (GlobalObj?.getInstance()?.getClient()?.isQuitAfterSendDone()) {
                        GlobalObj?.getInstance()?.getClient()?.close(true);
                        GlobalObj?.getInstance()?.setClient(null);
                    }
                }
                else {
                    this.showToast('账号未登录，请需重新登录', 'sendmail-smtp');
                }
            }
            else {
                this.showToast('账号未登录，请需重新登录', 'sendmail-smtp');
            }
        }
        catch (err) {
            this.showToast(`邮件发送出错：${err.message}`, 'sendmail-smtp');
        }
    }
    addBigFile() {
        const ctx = this;
        try {
            ctx.bigFileName = '';
            ctx.bigFileInfo = '暂无附件';
            ctx.showToast('开始检测cache目录下的大附件', 'createSingleFile');
            let context = GlobalObj?.getInstance()?.getContext() ? GlobalObj?.getInstance()?.getContext() : getContext();
            if (!context) {
                return;
            }
            let fileDir = context?.cacheDir;
            let fileList = fs.listFileSync(fileDir);
            if (!fileList || fileList.length < 1) {
                ctx.showToast('请先推入大附件', 'addBigFile-imapclient');
                return;
            }
            for (let i = 0; i < fileList.length; i++) {
                if (fileList[i] && fileList[i].length > 0) {
                    ctx.bigFileName = fileList[i];
                    break;
                }
            }
            let filePath = fileDir + '/' + ctx.bigFileName;
            let stat = fs.statSync(filePath);
            ctx.bigFileInfo = `附件名称：${ctx.bigFileName},附件大小：${stat.size}`;
            let index = ctx.bigFileName.indexOf('.');
            let fileType = ctx.bigFileName.substring(index + 1, ctx.bigFileName.length);
            let attach: MessageAttachment = {
                name: ctx.bigFileName,
                path: filePath,
                type: fileType,
                size: stat.size
            };
            this.attachment.push(attach);
            ctx.showToast(`获取到大附件  ${ctx.bigFileName}`, 'addBigFile-imapclient');
        }
        catch (err) {
            ctx.showToast('请先推入大附件', 'addBigFile-imapclient');
        }
    }
    isImage(type: string): boolean {
        if (!type || type.length < 1) {
            return false;
        }
        let imageTypeArr = ['webp', 'bmp', 'pcx', 'tif', 'jpeg', 'tga', 'exif',
            'fpx', 'svg', 'psd', 'cdr', 'pcd', 'dxf', 'ufo', 'eps', 'jpg',
            'ai', 'png', 'hdri', 'raw', 'wmf', 'flic', 'emf', 'ico'];
        if (imageTypeArr.indexOf(type.toLowerCase()) != -1) {
            return true;
        }
        else {
            return false;
        }
    }
    isDOC(type: string): boolean {
        if (!type || type.length < 1) {
            return false;
        }
        let docTypeArr = ['doc', 'docx'];
        if (docTypeArr.indexOf(type.toLowerCase()) != -1) {
            return true;
        }
        else {
            return false;
        }
    }
    isExcel(type: string): boolean {
        if (!type || type.length < 1) {
            return false;
        }
        let excelTypeArr = ['xlsx', 'xls', 'csv'];
        if (excelTypeArr.indexOf(type.toLowerCase()) != -1) {
            return true;
        }
        else {
            return false;
        }
    }
    onBackPress() {
        GlobalObj?.getInstance()?.getContext()?.terminateSelf();
    }
}
loadDocument(new SendBigAttachmentPage("1", undefined, {}));
