interface CommandPage_Params {
    message?: string;
    from?: string;
    to?: string;
    cc?: string;
    bcc?: string;
    subject?: string;
    listData?: Array<string>;
    mailType?: string;
    textValue?: string;
    inputValue?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CommandPage_" + ++__generate__Id;
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
import fs from '@ohos.file.fs';
import GlobalObj from '../GlobalObj';
class CommandPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__from = new ObservedPropertySimple('', this, "from");
        this.__to = new ObservedPropertySimple('', this, "to");
        this.__cc = new ObservedPropertySimple('', this, "cc");
        this.__bcc = new ObservedPropertySimple('', this, "bcc");
        this.__subject = new ObservedPropertySimple('', this, "subject");
        this.__listData = new ObservedPropertyObject([], this, "listData");
        this.__mailType = new ObservedPropertySimple('@qq.com', this, "mailType");
        this.__textValue = new ObservedPropertySimple('', this, "textValue");
        this.__inputValue = new ObservedPropertySimple('click me', this, "inputValue");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CommandPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.from !== undefined) {
            this.from = params.from;
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
        if (params.listData !== undefined) {
            this.listData = params.listData;
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
        this.__to.aboutToBeDeleted();
        this.__cc.aboutToBeDeleted();
        this.__bcc.aboutToBeDeleted();
        this.__subject.aboutToBeDeleted();
        this.__listData.aboutToBeDeleted();
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
    private __listData: ObservedPropertyObject<Array<string>>;
    get listData() {
        return this.__listData.get();
    }
    set listData(newValue: Array<string>) {
        this.__listData.set(newValue);
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
    async aboutToDisappear() {
        await GlobalObj?.getInstance()?.getClient()?.QUIT();
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
        let testParam = params as Record<string, Object>;
        if (testParam && testParam['sendCount'] && typeof testParam['sendCount'] === 'string') {
            this.from = testParam['sendCount'];
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
            direction: FlexDirection.Row
        });
        Flex.create({
            alignItems: ItemAlign.Start,
            justifyContent: FlexAlign.Start,
            alignContent: FlexAlign.Start,
            direction: FlexDirection.Row
        });
        Flex.layoutWeight(1);
        Flex.height('100%');
        Button.createWithLabel('STAT命令');
        Button.margin(20);
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.sendMail();
        });
        Button.margin({ top: 10 });
        Button.pop();
        Button.createWithLabel('LIST命令');
        Button.margin(20);
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.sendMail();
        });
        Button.margin({ top: 10 });
        Button.pop();
        Button.createWithLabel('TOP命令');
        Button.margin(20);
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.sendMail();
        });
        Button.margin({ top: 10 });
        Button.pop();
        Button.createWithLabel('UIDL命令');
        Button.margin(20);
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.sendMail();
        });
        Button.margin({ top: 10 });
        Button.pop();
        Button.createWithLabel('LAST命令');
        Button.margin(20);
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.sendMail();
        });
        Button.margin({ top: 10 });
        Button.pop();
        Button.createWithLabel('NOOP命令');
        Button.margin(20);
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.sendMail();
        });
        Button.margin({ top: 10 });
        Button.pop();
        Button.createWithLabel('DELE命令');
        Button.margin(20);
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.sendMail();
        });
        Button.margin({ top: 10 });
        Button.pop();
        Button.createWithLabel('RSET命令');
        Button.margin(20);
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.sendMail();
        });
        Button.margin({ top: 10 });
        Button.pop();
        Button.createWithLabel('RETR命令');
        Button.margin(20);
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.sendMail();
        });
        Button.margin({ top: 10 });
        Button.pop();
        Button.createWithLabel('QUIT命令');
        Button.margin(20);
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.sendMail();
        });
        Button.margin({ top: 10 });
        Button.pop();
        Flex.pop();
        List.create({ space: 10, initialIndex: 0 });
        List.edgeEffect(EdgeEffect.None);
        List.chainAnimation(false);
        List.layoutWeight(2);
        List.height('100%');
        List.listDirection(Axis.Horizontal);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.listData), (item: string, index: number) => {
            ListItem.create();
            ListItem.borderWidth(2);
            ListItem.borderColor(Color.Gray);
            Text.create(item);
            Text.fontSize(14);
            Text.padding(5);
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
        }, (item: string, index: number) => item);
        ForEach.pop();
        List.pop();
        Flex.pop();
        Scroll.pop();
        Column.pop();
        Row.pop();
    }
    async sendMail() {
        try {
            if (GlobalObj?.getInstance()?.getClient()) {
            }
            else {
                this.showToast('账号未登录，请需重新登录', 'sendmail-smtp');
            }
        }
        catch (err) {
            this.showToast(`邮件发送出错：${err.message}`, 'sendmail-smtp');
        }
    }
}
loadDocument(new CommandPage("1", undefined, {}));
