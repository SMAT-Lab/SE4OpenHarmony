interface SendMailPage_Params {
    message?: string;
    from?: string;
    accountName?: string;
    to?: string;
    cc?: string;
    bcc?: string;
    subject?: string;
    content?: string;
    attachment?: Array<MessageAttachment>;
    mailType?: string;
    textValue?: string;
    inputValue?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SendMailPage_" + ++__generate__Id;
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
class SendMailPage extends View {
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
        this.__attachment = new ObservedPropertyObject([], this, "attachment");
        this.__mailType = new ObservedPropertySimple('@qq.com', this, "mailType");
        this.__textValue = new ObservedPropertySimple('', this, "textValue");
        this.__inputValue = new ObservedPropertySimple('click me', this, "inputValue");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SendMailPage_Params) {
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
            placeholder: '格式为：xx <xx@yxx.com>, xx <xx@yxx.com>，多个账号以英文逗号,连接。',
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
        Flex.create({
            alignItems: ItemAlign.Center,
            justifyContent: FlexAlign.Start,
            alignContent: FlexAlign.Start,
            direction: FlexDirection.Row
        });
        Flex.margin({ top: 10 });
        Button.createWithLabel('添加附件');
        Button.fontSize(20);
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.margin({ right: 5 });
        Button.onClick((event) => {
            this.createAttachment();
        });
        Button.pop();
        List.create({ space: 10, initialIndex: 0 });
        List.edgeEffect(EdgeEffect.None);
        List.chainAnimation(false);
        List.layoutWeight(1);
        List.height(100);
        List.listDirection(Axis.Horizontal);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.attachment), (item: MessageAttachment, index: number) => {
            ListItem.create();
            ListItem.borderWidth(2);
            ListItem.borderColor(Color.Gray);
            Flex.create({
                alignItems: ItemAlign.Center,
                justifyContent: FlexAlign.Center,
                alignContent: FlexAlign.Center,
                direction: FlexDirection.Row
            });
            If.create();
            if (item.type && item.type == 'txt') {
                If.branchId(0);
                Image.create($r('app.media.txt'));
                Image.width(40);
                Image.height(40);
                Image.margin({ left: 5, right: 5 });
            }
            else if (item.type && this.isImage(item.type)) {
                If.branchId(1);
                Image.create($r('app.media.image'));
                Image.width(40);
                Image.height(40);
                Image.margin({ left: 5, right: 5 });
            }
            else if (item.type && this.isDOC(item.type)) {
                If.branchId(2);
                Image.create($r('app.media.word'));
                Image.width(40);
                Image.height(40);
                Image.margin({ left: 5, right: 5 });
            }
            else if (item.type && this.isExcel(item.type)) {
                If.branchId(3);
                Image.create($r('app.media.excel'));
                Image.width(40);
                Image.height(40);
                Image.margin({ left: 5, right: 5 });
            }
            else {
                If.branchId(4);
                Image.create($r('app.media.app_icon'));
                Image.width(40);
                Image.height(40);
                Image.margin({ left: 5, right: 5 });
            }
            If.pop();
            Flex.create({
                alignItems: ItemAlign.Start,
                justifyContent: FlexAlign.Center,
                alignContent: FlexAlign.Start,
                direction: FlexDirection.Column
            });
            Text.create(item.name);
            Text.fontSize(14);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.maxLines(1);
            Text.width(100);
            Text.padding({ left: 5, right: 5, top: 5 });
            Text.maxLines(1);
            Text.textAlign(TextAlign.Center);
            Text.pop();
            Text.create(item.size + "字节");
            Text.fontSize(14);
            Text.width(100);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.maxLines(1);
            Text.padding({ left: 5, right: 5, top: 5, bottom: 5 });
            Text.maxLines(1);
            Text.textAlign(TextAlign.Center);
            Text.pop();
            Flex.pop();
            Flex.pop();
            ListItem.pop();
        }, (item: MessageAttachment, index: number) => item.name);
        ForEach.pop();
        List.pop();
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
    createAttachment() {
        const ctx = this;
        try {
            if (ctx.attachment && ctx.attachment.length == 0) {
                ctx.showToast('开始生成单个本地文件', 'createSingleFile');
                let context = GlobalObj?.getInstance()?.getContext() ? GlobalObj?.getInstance()?.getContext() : getContext();
                let randomNum = Math.round(Math.random() * 1024 + 1);
                let filePath = context?.cacheDir + '/' + 'attachment-' + randomNum + '.txt';
                let file = fs.openSync(filePath, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE);
                let str = "客户端发送到服务端的信息，请查收\r\n";
                fs.writeSync(file.fd, str);
                fs.fsyncSync(file.fd);
                fs.closeSync(file);
                let attach: MessageAttachment = {
                    name: 'attachment-' + randomNum + '.txt',
                    path: filePath,
                    type: '.txt',
                    size: str.length
                };
                this.attachment.push(attach);
                ctx.showToast('生成本地单个文件成功' + filePath, 'createSingleFile');
            }
            else if (ctx.attachment && ctx.attachment.length == 1) {
                ctx.showToast('开始生成单个本地文件', 'createSingleFile');
                let context: Context | null = GlobalObj?.getInstance()?.getContext() ? GlobalObj?.getInstance()?.getContext() : getContext();
                let filePath = context?.cacheDir + '/icon.png';
                context?.resourceManager?.getRawFileContent('icon.png')?.then((imageData) => {
                    if (imageData) {
                        let file = fs.openSync(filePath, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE);
                        fs.writeSync(file.fd, imageData.buffer);
                        fs.fsyncSync(file.fd);
                        fs.closeSync(file);
                        let attach: MessageAttachment = {
                            name: 'icon.png',
                            path: filePath,
                            type: 'jpg',
                            size: imageData.buffer.byteLength
                        };
                        this.attachment.push(attach);
                    }
                    else {
                        ctx.showToast(`生成本地单个文件${'icon.png'}失败` + filePath, 'createSingleFile');
                    }
                })?.catch((err: Error) => {
                    ctx.showToast(`生成本地单个文件${'icon.png'}失败,原因是：${err.message}` + filePath, 'createSingleFile');
                });
                ctx.showToast('生成本地单个文件成功' + filePath, 'createSingleFile');
            }
            else if (ctx.attachment && ctx.attachment.length == 2) {
                ctx.showToast('开始生成单个本地文件', 'createSingleFile');
                let context: Context | null = GlobalObj?.getInstance()?.getContext() ? GlobalObj?.getInstance()?.getContext() : getContext();
                let filePath = context?.cacheDir + '/test.docx';
                context?.resourceManager?.getRawFileContent('test.docx')?.then((wordData) => {
                    if (wordData) {
                        let file = fs.openSync(filePath, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE);
                        fs.writeSync(file.fd, wordData.buffer);
                        fs.fsyncSync(file.fd);
                        fs.closeSync(file);
                        let attach: MessageAttachment = {
                            name: 'test.docx',
                            path: filePath,
                            type: 'docx',
                            size: wordData.buffer.byteLength
                        };
                        this.attachment.push(attach);
                    }
                    else {
                        ctx.showToast(`生成本地单个文件${'test.docx'}失败` + filePath, 'createSingleFile');
                    }
                })?.catch((err: Error) => {
                    ctx.showToast(`生成本地单个文件${'test.docx'}失败,原因是：${err.message}` + filePath, 'createSingleFile');
                });
                ctx.showToast('生成本地单个文件成功' + filePath, 'createSingleFile');
            }
            else if (ctx.attachment && ctx.attachment.length == 3) {
                ctx.showToast('开始生成单个本地文件', 'createSingleFile');
                let context: Context | null = GlobalObj?.getInstance()?.getContext() ? GlobalObj?.getInstance()?.getContext() : getContext();
                if (!context) {
                    return;
                }
                let filePath = context.cacheDir + '/test.xlsx';
                context.resourceManager.getRawFileContent('test.xlsx').then((excelData) => {
                    if (excelData) {
                        let file = fs.openSync(filePath, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE);
                        fs.writeSync(file.fd, excelData.buffer);
                        fs.fsyncSync(file.fd);
                        fs.closeSync(file);
                        let attach: MessageAttachment = {
                            name: 'test.xlsx',
                            path: filePath,
                            type: 'xlsx',
                            size: excelData.buffer.byteLength
                        };
                        this.attachment.push(attach);
                    }
                    else {
                        ctx.showToast(`生成本地单个文件${'test.xlsx'}失败` + filePath, 'createSingleFile');
                    }
                }).catch((err: Error) => {
                    ctx.showToast(`生成本地单个文件${'test.xlsx'}失败,原因是：${err.message}` + filePath, 'createSingleFile');
                });
                ctx.showToast('生成本地单个文件成功' + filePath, 'createSingleFile');
            }
            else {
                ctx.showToast('暂时只支持测试文本，图片，文档，表格，其他类型的文件等待测试开放', 'createSingleFile');
            }
        }
        catch (err) {
            ctx.showToast('生成本地单个文件失败:' + JSON.stringify(err), 'createSingleFile');
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
loadDocument(new SendMailPage("1", undefined, {}));
