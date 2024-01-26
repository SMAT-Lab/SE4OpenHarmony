interface InputInfoPage_Params {
    protoController?: TextAreaController;
    pathController?: TextAreaController;
    dataController?: TextAreaController;
    protoInfo?: string;
    protoPath?: string;
    protoData?: string;
    messageToJsonResult?: string;
    jsonToMessageResult?: string;
    messageToXmlResult?: string;
    xmlToMessageResult?: string;
    messageToHtmlResult?: string;
    TAG?: string;
    defaultUserProto?: string;
    defaultUserPath?: string;
    defaultUserData?: UserInfo;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "InputInfoPage_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import { Format, Protobuf } from '@ohos/protobuf_format';
import hilog from '@ohos.hilog';
import promptAction from '@ohos.promptAction';
class UserInfo {
    sessionId: string = '';
    userPrivilege: number = 0;
    isTokenType: boolean = false;
    formatTimestamp: number = 0;
    field5: number = 0;
    field6: number = 0;
    field7: number = 0;
    field8: number = 0;
}
class InputInfoPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.protoController = new TextAreaController();
        this.pathController = new TextAreaController();
        this.dataController = new TextAreaController();
        this.__protoInfo = new ObservedPropertySimple('', this, "protoInfo");
        this.__protoPath = new ObservedPropertySimple('', this, "protoPath");
        this.__protoData = new ObservedPropertySimple('', this, "protoData");
        this.__messageToJsonResult = new ObservedPropertySimple("messageToJsonResult: ", this, "messageToJsonResult");
        this.__jsonToMessageResult = new ObservedPropertySimple("jsonToMessageResult: ", this, "jsonToMessageResult");
        this.__messageToXmlResult = new ObservedPropertySimple("messageToXmlResult: ", this, "messageToXmlResult");
        this.__xmlToMessageResult = new ObservedPropertySimple("xmlToMessageResult: ", this, "xmlToMessageResult");
        this.__messageToHtmlResult = new ObservedPropertySimple("messageToHtmlResult: ", this, "messageToHtmlResult");
        this.TAG = "protobuf-format";
        this.defaultUserProto = 'syntax = "proto3"; package com.user;message UserLoginResponse{' +
            'string sessionId = 1;' +
            'uint32 userPrivilege = 2;' +
            'bool isTokenType = 3;' +
            'uint64 formatTimestamp = 4;' +
            'int32 field5 = 5;' +
            'int64 field6 = 6;' +
            'double field7 = 7;' +
            'float field8 = 8;' +
            '}';
        this.defaultUserPath = "com.user.UserLoginResponse";
        this.defaultUserData = {
            sessionId: "testProtobufFormat",
            userPrivilege: 123456,
            isTokenType: false,
            formatTimestamp: 123456,
            field5: -500,
            field6: -600,
            field7: 703.1215926,
            field8: 803.1415926
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: InputInfoPage_Params) {
        if (params.protoController !== undefined) {
            this.protoController = params.protoController;
        }
        if (params.pathController !== undefined) {
            this.pathController = params.pathController;
        }
        if (params.dataController !== undefined) {
            this.dataController = params.dataController;
        }
        if (params.protoInfo !== undefined) {
            this.protoInfo = params.protoInfo;
        }
        if (params.protoPath !== undefined) {
            this.protoPath = params.protoPath;
        }
        if (params.protoData !== undefined) {
            this.protoData = params.protoData;
        }
        if (params.messageToJsonResult !== undefined) {
            this.messageToJsonResult = params.messageToJsonResult;
        }
        if (params.jsonToMessageResult !== undefined) {
            this.jsonToMessageResult = params.jsonToMessageResult;
        }
        if (params.messageToXmlResult !== undefined) {
            this.messageToXmlResult = params.messageToXmlResult;
        }
        if (params.xmlToMessageResult !== undefined) {
            this.xmlToMessageResult = params.xmlToMessageResult;
        }
        if (params.messageToHtmlResult !== undefined) {
            this.messageToHtmlResult = params.messageToHtmlResult;
        }
        if (params.TAG !== undefined) {
            this.TAG = params.TAG;
        }
        if (params.defaultUserProto !== undefined) {
            this.defaultUserProto = params.defaultUserProto;
        }
        if (params.defaultUserPath !== undefined) {
            this.defaultUserPath = params.defaultUserPath;
        }
        if (params.defaultUserData !== undefined) {
            this.defaultUserData = params.defaultUserData;
        }
    }
    aboutToBeDeleted() {
        this.__protoInfo.aboutToBeDeleted();
        this.__protoPath.aboutToBeDeleted();
        this.__protoData.aboutToBeDeleted();
        this.__messageToJsonResult.aboutToBeDeleted();
        this.__jsonToMessageResult.aboutToBeDeleted();
        this.__messageToXmlResult.aboutToBeDeleted();
        this.__xmlToMessageResult.aboutToBeDeleted();
        this.__messageToHtmlResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private protoController: TextAreaController;
    private pathController: TextAreaController;
    private dataController: TextAreaController;
    private __protoInfo: ObservedPropertySimple<string>;
    get protoInfo() {
        return this.__protoInfo.get();
    }
    set protoInfo(newValue: string) {
        this.__protoInfo.set(newValue);
    }
    private __protoPath: ObservedPropertySimple<string>;
    get protoPath() {
        return this.__protoPath.get();
    }
    set protoPath(newValue: string) {
        this.__protoPath.set(newValue);
    }
    private __protoData: ObservedPropertySimple<string>;
    get protoData() {
        return this.__protoData.get();
    }
    set protoData(newValue: string) {
        this.__protoData.set(newValue);
    }
    private __messageToJsonResult: ObservedPropertySimple<string>;
    get messageToJsonResult() {
        return this.__messageToJsonResult.get();
    }
    set messageToJsonResult(newValue: string) {
        this.__messageToJsonResult.set(newValue);
    }
    private __jsonToMessageResult: ObservedPropertySimple<string>;
    get jsonToMessageResult() {
        return this.__jsonToMessageResult.get();
    }
    set jsonToMessageResult(newValue: string) {
        this.__jsonToMessageResult.set(newValue);
    }
    private __messageToXmlResult: ObservedPropertySimple<string>;
    get messageToXmlResult() {
        return this.__messageToXmlResult.get();
    }
    set messageToXmlResult(newValue: string) {
        this.__messageToXmlResult.set(newValue);
    }
    private __xmlToMessageResult: ObservedPropertySimple<string>;
    get xmlToMessageResult() {
        return this.__xmlToMessageResult.get();
    }
    set xmlToMessageResult(newValue: string) {
        this.__xmlToMessageResult.set(newValue);
    }
    private __messageToHtmlResult: ObservedPropertySimple<string>;
    get messageToHtmlResult() {
        return this.__messageToHtmlResult.get();
    }
    set messageToHtmlResult(newValue: string) {
        this.__messageToHtmlResult.set(newValue);
    }
    private TAG: string;
    private defaultUserProto: string;
    private defaultUserPath: string;
    private defaultUserData: UserInfo;
    render() {
        Row.create();
        Row.height('100%');
        Row.alignItems(VerticalAlign.Top);
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.alignItems(HorizontalAlign.Center);
        Scroll.create();
        Scroll.align(Alignment.TopStart);
        Scroll.width('100%');
        Scroll.height('50%');
        Column.create({ space: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Text.create('messageToJsonResult: ');
        Text.fontColor(Color.Red);
        Text.pop();
        Text.create(this.messageToJsonResult);
        Text.width('100%');
        Text.pop();
        Text.create('jsonToMessageResult: ');
        Text.fontColor(Color.Red);
        Text.pop();
        Text.create(this.jsonToMessageResult);
        Text.width('100%');
        Text.pop();
        Text.create('messageToXmlResult: ');
        Text.fontColor(Color.Red);
        Text.pop();
        Text.create(this.messageToXmlResult);
        Text.width('100%');
        Text.pop();
        Text.create('xmlToMessageResult: ');
        Text.fontColor(Color.Red);
        Text.pop();
        Text.create(this.xmlToMessageResult);
        Text.width('100%');
        Text.pop();
        Text.create('messageToHtmlResult: ');
        Text.fontColor(Color.Red);
        Text.pop();
        Text.create(this.messageToHtmlResult);
        Text.width('100%');
        Text.pop();
        Column.pop();
        Scroll.pop();
        Divider.create();
        Divider.width('100%');
        Divider.height('10px');
        Divider.backgroundColor(Color.Red);
        Scroll.create();
        Scroll.align(Alignment.TopStart);
        Scroll.width('100%');
        Scroll.height('48%');
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Button.createWithLabel('填充默认proto info');
        Button.onClick(() => {
            this.protoInfo = this.defaultUserProto;
        });
        Button.alignSelf(ItemAlign.Start);
        Button.pop();
        TextArea.create({
            text: this.protoInfo,
            placeholder: "please input your proto info...",
            controller: this.protoController
        });
        TextArea.onChange((value) => {
            this.protoInfo = value;
        });
        Button.createWithLabel('填充默认proto path');
        Button.onClick(() => {
            this.protoPath = this.defaultUserPath;
        });
        Button.alignSelf(ItemAlign.Start);
        Button.pop();
        TextArea.create({
            text: this.protoPath,
            placeholder: "please input your proto path...",
            controller: this.pathController
        });
        TextArea.onChange((value) => {
            this.protoPath = value;
        });
        Button.createWithLabel('填充默认proto data');
        Button.onClick(() => {
            this.protoData = JSON.stringify(this.defaultUserData);
        });
        Button.alignSelf(ItemAlign.Start);
        Button.pop();
        TextArea.create({
            text: this.protoData,
            placeholder: "please input your proto data...",
            controller: this.dataController
        });
        TextArea.onChange((value) => {
            this.protoData = value;
        });
        Button.createWithLabel('protobuf format');
        Button.onClick(async () => {
            if (!this.protoInfo) {
                promptAction.showToast({ message: "please input proto info" });
                return;
            }
            if (!this.protoPath) {
                promptAction.showToast({ message: "please input proto path" });
                return;
            }
            if (!this.protoData) {
                promptAction.showToast({ message: "please input proto data" });
                return;
            }
            try {
                let builder: any = await Protobuf.loadProto(this.protoInfo, null, 'protoInfo.proto');
                if (!builder) {
                    hilog.error(0x0000, this.TAG, '%{public}s', 'codec error: builder is null|undefined.');
                    return;
                }
                let Message: any = builder.build(this.protoPath);
                let message: any = new Message(JSON.parse(this.protoData));
                this.protobufFormat(builder, message, this.protoPath);
            }
            catch (error) {
                hilog.error(0x0000, this.TAG, '%{public}s', 'protobufFormat catch error: ' + error);
                this.messageToJsonResult = 'messageToJsonResult: ';
                this.jsonToMessageResult = 'jsonToMessageResult: ';
                this.messageToXmlResult = 'messageToXmlResult: ';
                this.xmlToMessageResult = 'xmlToMessageResult: ';
                this.messageToHtmlResult = 'messageToHtmlResult: ';
            }
        });
        Button.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
        Row.pop();
    }
    private protobufFormat(builder: any, message: any, path: string): void {
        let messageJson: string = Format.messageToJson(message);
        hilog.info(0x0000, this.TAG, '%{public}s', 'messageJson: ' + messageJson);
        let jsonMessage: any = Format.jsonToMessage(builder, path, messageJson);
        hilog.info(0x0000, this.TAG, '%{public}s', 'jsonMessage: ' + jsonMessage);
        let messageXml: string = Format.messageToXml(message);
        hilog.info(0x0000, this.TAG, '%{public}s', 'messageXml: ' + messageXml);
        let xmlMessage: any = Format.xmlToMessage(builder, path, messageXml);
        hilog.info(0x0000, this.TAG, '%{public}s', 'xmlMessage: ' + xmlMessage);
        let messageHtml: string = Format.messageToHtml(message);
        hilog.info(0x0000, this.TAG, '%{public}s', 'messageHtml: ' + messageHtml);
        this.messageToJsonResult = messageJson;
        this.jsonToMessageResult = JSON.stringify(messageJson);
        this.messageToXmlResult = messageXml;
        this.xmlToMessageResult = JSON.stringify(messageXml);
        this.messageToHtmlResult = messageHtml;
    }
}
loadDocument(new InputInfoPage("1", undefined, {}));
