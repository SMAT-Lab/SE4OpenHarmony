interface mailParseAndBuild_Params {
    pathParseResult?: string;
    buildResult?: string;
    from?: string;
    to?: string[];
    Cc?: string[];
    Bc?: string[];
    subject?: string;
    text?: string;
    filesPath?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "mailParseAndBuild_" + ++__generate__Id;
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
import { EmlFormat, AttachmentBody, MimeMessage, MimeBodyPart, MailLogger, RecipientType, GlobalContext, } from '@ohos/mail';
import prompt from '@ohos.promptAction';
import util from '@ohos.util';
class mailParseAndBuild extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__pathParseResult = new ObservedPropertySimple("", this, "pathParseResult");
        this.__buildResult = new ObservedPropertySimple("", this, "buildResult");
        this.from = "xx@qq.com";
        this.to = ["xx@sina.com", "xx@hoperun.com"];
        this.Cc = ["xx@qq.com"];
        this.Bc = ["xx@qq.com"];
        this.subject = "测试邮件发送";
        this.text = "这是一个测试邮件";
        this.filesPath = '';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: mailParseAndBuild_Params) {
        if (params.pathParseResult !== undefined) {
            this.pathParseResult = params.pathParseResult;
        }
        if (params.buildResult !== undefined) {
            this.buildResult = params.buildResult;
        }
        if (params.from !== undefined) {
            this.from = params.from;
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
        if (params.subject !== undefined) {
            this.subject = params.subject;
        }
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.filesPath !== undefined) {
            this.filesPath = params.filesPath;
        }
    }
    aboutToBeDeleted() {
        this.__pathParseResult.aboutToBeDeleted();
        this.__buildResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __pathParseResult: ObservedPropertySimple<string>;
    get pathParseResult() {
        return this.__pathParseResult.get();
    }
    set pathParseResult(newValue: string) {
        this.__pathParseResult.set(newValue);
    }
    private __buildResult: ObservedPropertySimple<string>;
    get buildResult() {
        return this.__buildResult.get();
    }
    set buildResult(newValue: string) {
        this.__buildResult.set(newValue);
    }
    private from: string;
    private to: string[];
    private Cc: string[];
    private Bc: string[];
    private subject: string;
    private text: string;
    private filesPath: string;
    aboutToAppear() {
        this.filesPath = GlobalContext.getContext().getValue('filesPath') as string;
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start });
        List.create({ space: 20, initialIndex: 0 });
        ListItem.create();
        Text.create('邮件解析、构建');
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
        Button.createWithLabel('解析邮件', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.backgroundColor('#12939f');
        Button.onClick((event: ClickEvent) => {
            new EmlFormat().parse(this.filesPath + '/sample.eml', (success: boolean, result: any) => {
                if (success) {
                    MailLogger.info('ohos_mail-- parser file result----:' + JSON.stringify(result));
                    this.pathParseResult = JSON.stringify(JSON.parse(JSON.stringify(result)), null, 4);
                }
                else {
                    prompt.showToast({ message: "解析失败：" + JSON.stringify(result), duration: 3000 });
                    MailLogger.info('ohos_mail-- parser file fail : ' + JSON.stringify(result));
                }
            });
        });
        Button.pop();
        Text.create('文件名：sample.eml');
        Text.fontColor('#333333');
        Text.fontSize(18);
        Text.fontWeight(700);
        Text.pop();
        Text.create('解析结果 : ' + this.pathParseResult);
        Text.fontColor('#ff206adf');
        Text.fontSize(16);
        Text.fontWeight(700);
        Text.pop();
        Column.pop();
        ListItem.pop();
        ListItem.create();
        Column.create({ space: 12 });
        Column.width('100%');
        Column.padding(10);
        Column.margin({ top: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Column.backgroundColor('#cbd0cf');
        Button.createWithLabel('构建邮件', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width('70%');
        Button.margin({ top: 10 });
        Button.backgroundColor('#12939f');
        Button.onClick((event: ClickEvent) => {
            let mimeMessage = new MimeMessage();
            mimeMessage.setFrom(this.from);
            mimeMessage.setRecipients(RecipientType.TO, this.to);
            mimeMessage.setRecipients(RecipientType.CC, this.Cc);
            mimeMessage.setRecipients(RecipientType.BCC, this.Bc);
            mimeMessage.setSubject(this.subject);
            mimeMessage.setMIMEVersion("1.0");
            //设置纯文本格式的正文
            mimeMessage.setText(this.text);
            //设置html格式文件
            //                                            mimeMessage.setHtml("<meta http-equiv=\"" + "Content-Type" + "\"" + "content=\"" + "text/html; charset=GB2312" + "\">" + "<div>" + text + "</div>")
            //设置html格式文件带图片
            let contentId = "imag01";
            mimeMessage.addImgInside(new MimeBodyPart(this.filesPath, "test.png", contentId));
            let contentId1 = "imag02";
            mimeMessage.addImgInside(new MimeBodyPart(this.filesPath, "test.png", contentId1));
            mimeMessage.setHtml("<meta http-equiv=\"" + "Content-Type" + "\"" + "content=\"" + "text/html; charset=GB2312" + "\">"
                + "<div>" + this.text
                + "<img src=\"" + "cid:" + contentId + "\""
                + "id=\"" + "img_insert_165510789654906970130739777411" + "\"" + ">"
                + "<img src=\"" + "cid:" + contentId1 + "\""
                + "id=\"" + "img_insert_165510789654906970130739777411" + "\"" + ">"
                + "</div><br>");
            //设置附件
            mimeMessage.addAttachmentBody(new AttachmentBody(this.filesPath, "test.png"));
            mimeMessage.addAttachmentBody(new AttachmentBody(this.filesPath, "test.png"));
            const decoder = util.TextDecoder.create('utf-8');
            const utfStr = decoder.decodeWithStream(new Uint8Array(mimeMessage.getMimeMessage()));
            this.buildResult = utfStr;
        });
        Button.pop();
        Text.create('构建结果 : \r\n' + this.buildResult);
        Text.fontColor('#ff206adf');
        Text.fontSize(16);
        Text.fontWeight(700);
        Text.pop();
        Column.pop();
        ListItem.pop();
        List.pop();
        Flex.pop();
    }
}
loadDocument(new mailParseAndBuild("1", undefined, {}));
