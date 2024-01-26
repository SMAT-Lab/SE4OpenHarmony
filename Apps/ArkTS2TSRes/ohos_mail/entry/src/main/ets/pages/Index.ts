interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import router from '@ohos.router';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        Flex.margin(10);
        Button.createWithLabel("smtp协议");
        Button.backgroundColor(Color.Grey);
        Button.fontSize("18fp");
        Button.fontColor(Color.White);
        Button.type(ButtonType.Capsule);
        Button.width("90%");
        Button.margin({ "top": 50 });
        Button.height("120px");
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({
                url: 'pages/smtp'
            });
        });
        Button.pop();
        Button.createWithLabel("pop3协议");
        Button.backgroundColor(Color.Grey);
        Button.fontSize("18fp");
        Button.fontColor(Color.White);
        Button.type(ButtonType.Capsule);
        Button.width("90%");
        Button.margin({ "top": 50 });
        Button.height("120px");
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({
                url: 'pages/pop'
            });
        });
        Button.pop();
        Button.createWithLabel("imap协议");
        Button.backgroundColor(Color.Grey);
        Button.fontSize("18fp");
        Button.fontColor(Color.White);
        Button.type(ButtonType.Capsule);
        Button.width("90%");
        Button.margin({ "top": 50 });
        Button.height("120px");
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({
                url: 'pages/imap'
            });
        });
        Button.pop();
        Button.createWithLabel("邮件解析");
        Button.backgroundColor(Color.Grey);
        Button.fontSize("18fp");
        Button.fontColor(Color.White);
        Button.type(ButtonType.Capsule);
        Button.width("90%");
        Button.margin({ "top": 50 });
        Button.height("120px");
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({
                url: 'pages/mailParseAndBuild'
            });
        });
        Button.pop();
        Button.createWithLabel("mimeType");
        Button.backgroundColor(Color.Grey);
        Button.fontSize("18fp");
        Button.fontColor(Color.White);
        Button.type(ButtonType.Capsule);
        Button.width("90%");
        Button.margin({ "top": 50 });
        Button.height("120px");
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({
                url: 'pages/mimeType'
            });
        });
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
