interface Index_Params {
    TAG?: string;
    messageData?: string;
    messageToJsonResult?: string;
    jsonToMessageResult?: string;
    messageToXmlResult?: string;
    xmlToMessageResult?: string;
    messageToHtmlResult?: string;
    userProto?: string;
    personProto?;
    innerProtoStr?: string;
    personMessageData?: string;
    userMessageData?: string;
    innerMessageData?: string;
    importTest1MessageData?: string;
    importTest2MessageData?: string;
    importTest3MessageData?: string;
    messageType?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import { Format, Long, Protobuf } from '@ohos/protobuf_format';
import hilog from '@ohos.hilog';
import router from '@ohos.router';
class Person {
    name: string = '';
    id: number | Long = 0;
    email: string = '';
    phones: PhoneInfo[] = [];
}
class PhoneInfo {
    number: string = '';
    type: number = 0;
}
class UserInfo {
    sessionId: number = 0;
    isTokenType: boolean = false;
    formatTimestamp: number = 0;
}
class InnerClass {
    result: ResultInfo[] = [];
}
class ResultInfo {
    url: string = '';
    title: string = '';
    spinner: string[] = [];
}
class Test1 {
    a: number = 0;
}
class Test2 {
    b: string = '';
}
class Test3 {
    test1: Test1 = { a: 0 };
    test2: Test2 = { b: '' };
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.TAG = 'protobuf-format';
        this.__messageData = new ObservedPropertySimple("messageData: ", this, "messageData");
        this.__messageToJsonResult = new ObservedPropertySimple("messageToJsonResult: ", this, "messageToJsonResult");
        this.__jsonToMessageResult = new ObservedPropertySimple("jsonToMessageResult: ", this, "jsonToMessageResult");
        this.__messageToXmlResult = new ObservedPropertySimple("messageToXmlResult: ", this, "messageToXmlResult");
        this.__xmlToMessageResult = new ObservedPropertySimple("xmlToMessageResult: ", this, "xmlToMessageResult");
        this.__messageToHtmlResult = new ObservedPropertySimple("messageToHtmlResult: ", this, "messageToHtmlResult");
        this.userProto = 'syntax = "proto3"; package com.user; message UserLoginResponse{uint64 sessionId = 1; string userPrivilege =2;bool isTokenType =3;int32 formatTimestamp =4;}';
        this.personProto = `
    syntax = "proto3";
    package tutorial;

    message Person {
      string name = 1;
      fixed64 id = 2;
      string email = 3;

      enum PhoneType {
        MOBILE = 0;
        HOME = 1;
        WORK = 2;
      }

      message PhoneNumber {
        string number = 1;
        PhoneType type = 2;
      }
      repeated PhoneNumber phones = 4;
    }`;
        this.innerProtoStr = `
    syntax = "proto3";
    package js;
    message ResultResponse {
      message Result {
        string url = 1;
        string title = 2;
        repeated string spinner = 3;
      }
      repeated Result result = 4;
    }`;
        this.personMessageData = `
    personData = {
      name: "personName@<>'*\".",
      id: 256,
      email: "personEmail@xxx.com",
      phones: [{ number: "13812341234", type: 0 }, { number: "0431-81234567", type: 1 }]
    };
  `;
        this.userMessageData = `
     userData = {
       sessionId: 1,
       isTokenType: false,
       formatTimestamp: 2
     };
  `;
        this.innerMessageData = `
    innerData = {
      result: [{
        url: "url1",
        title: "title1",
        spinner: ["array111", "array2222"]
      }, {
        url: "url2",
        title: "title2",
        spinner: ["spinner1", "spinner2"]
      }]
    };
  `;
        this.importTest1MessageData = `
    test1Data = {
      a: 150
    };
  `;
        this.importTest2MessageData = `
    test2Data = {
      b: "this is test2 value"
    };
  `;
        this.importTest3MessageData = `
    test3Data = {
      test1: { a: 150 },
      test2: { b: "this is test2 value" }
    };
  `;
        this.messageType = ``;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.TAG !== undefined) {
            this.TAG = params.TAG;
        }
        if (params.messageData !== undefined) {
            this.messageData = params.messageData;
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
        if (params.userProto !== undefined) {
            this.userProto = params.userProto;
        }
        if (params.personProto !== undefined) {
            this.personProto = params.personProto;
        }
        if (params.innerProtoStr !== undefined) {
            this.innerProtoStr = params.innerProtoStr;
        }
        if (params.personMessageData !== undefined) {
            this.personMessageData = params.personMessageData;
        }
        if (params.userMessageData !== undefined) {
            this.userMessageData = params.userMessageData;
        }
        if (params.innerMessageData !== undefined) {
            this.innerMessageData = params.innerMessageData;
        }
        if (params.importTest1MessageData !== undefined) {
            this.importTest1MessageData = params.importTest1MessageData;
        }
        if (params.importTest2MessageData !== undefined) {
            this.importTest2MessageData = params.importTest2MessageData;
        }
        if (params.importTest3MessageData !== undefined) {
            this.importTest3MessageData = params.importTest3MessageData;
        }
        if (params.messageType !== undefined) {
            this.messageType = params.messageType;
        }
    }
    aboutToBeDeleted() {
        this.__messageData.aboutToBeDeleted();
        this.__messageToJsonResult.aboutToBeDeleted();
        this.__jsonToMessageResult.aboutToBeDeleted();
        this.__messageToXmlResult.aboutToBeDeleted();
        this.__xmlToMessageResult.aboutToBeDeleted();
        this.__messageToHtmlResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private TAG: string;
    private __messageData: ObservedPropertySimple<string>;
    get messageData() {
        return this.__messageData.get();
    }
    set messageData(newValue: string) {
        this.__messageData.set(newValue);
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
    private userProto: string;
    private personProto;
    private innerProtoStr: string;
    private personMessageData: string;
    private userMessageData: string;
    private innerMessageData: string;
    private importTest1MessageData: string;
    private importTest2MessageData: string;
    private importTest3MessageData: string;
    private messageType: string;
    render() {
        Row.create();
        Row.height('100%');
        Row.alignItems(VerticalAlign.Top);
        Column.create();
        Column.margin({ top: 10, left: 10, right: 10 });
        Column.width('100%');
        Column.height('100%');
        Scroll.create();
        Scroll.align(Alignment.TopStart);
        Scroll.width('100%');
        Scroll.height('65%');
        Column.create({ space: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Text.create('messageData: ');
        Text.fontColor(Color.Red);
        Text.pop();
        Text.create(this.messageData);
        Text.width('100%');
        Text.pop();
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
        Scroll.height('33%');
        Column.create({ space: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Button.createWithLabel('Jump to Second Page');
        Button.width('80%');
        Button.height('80px');
        Button.onClick(() => {
            router.pushUrl({ url: "pages/InputInfoPage" });
        });
        Button.pop();
        Button.createWithLabel('person.proto format');
        Button.width('80%');
        Button.height('80px');
        Button.onClick(async () => {
            this.messageType = 'person';
            let idValue: Long = Long.fromValue({ high: 0, low: 256, unsigned: true });
            let personData: Person = {
                name: "personName@<>'*\".",
                id: idValue,
                email: "personEmail@xxx.com",
                phones: [{ number: "13812341234", type: 0 }, { number: "0431-81234567", type: 1 }]
            };
            let personBuilder: any = await Protobuf.loadProto(this.personProto, null, 'person.proto');
            if (!personBuilder) {
                hilog.error(0x0000, this.TAG, '%{public}s', 'codec error: builder is null|undefined.');
                return;
            }
            let Person: any = personBuilder.build("tutorial.Person");
            let message: any = new Person(personData);
            this.protobufFormat(personBuilder, message, "tutorial.Person");
        });
        Button.pop();
        Button.createWithLabel('user.proto format');
        Button.width('80%');
        Button.height('80px');
        Button.onClick(async () => {
            this.messageType = 'user';
            let userData: UserInfo = {
                sessionId: 1,
                isTokenType: false,
                formatTimestamp: 2
            };
            let userBuilder: any = await Protobuf.loadProto(this.userProto, null, 'user.proto');
            if (!userBuilder) {
                hilog.error(0x0000, this.TAG, '%{public}s', 'codec error: builder is null|undefined.');
                return;
            }
            let UserLoginResponse: any = userBuilder.build("com.user.UserLoginResponse");
            let message: any = new UserLoginResponse(userData);
            this.protobufFormat(userBuilder, message, "com.user.UserLoginResponse");
        });
        Button.pop();
        Button.createWithLabel('inner.proto format');
        Button.width('80%');
        Button.height('80px');
        Button.onClick(async () => {
            this.messageType = 'inner';
            let innerData: InnerClass = {
                result: [{
                        url: "url1",
                        title: "title1",
                        spinner: ["array111", "array2222"]
                    }, {
                        url: "url2",
                        title: "title2",
                        spinner: ["spinner1", "spinner2"]
                    }]
            };
            let innerBuilder: any = await Protobuf.loadProto(this.innerProtoStr, null, 'inner.proto');
            if (!innerBuilder) {
                hilog.error(0x0000, this.TAG, '%{public}s', 'codec error: builder is null|undefined.');
                return;
            }
            let ResultResponse: any = innerBuilder.build("js.ResultResponse");
            let message: any = new ResultResponse(innerData);
            this.protobufFormat(innerBuilder, message, "js.ResultResponse");
        });
        Button.pop();
        Button.createWithLabel('imports.proto test1 format');
        Button.width('80%');
        Button.height('80px');
        Button.onClick(async () => {
            this.messageType = 'import_test1';
            let test1Data: Test1 = {
                a: 150
            };
            let builder: any = await Protobuf.loadProtoFile('imports.proto', null, null, getContext(this)
                .resourceManager);
            if (!builder) {
                hilog.error(0x0000, this.TAG, '%{public}s', 'codec error: builder is null|undefined.');
                return;
            }
            let ImportTest1Entity: any = builder.build("Test1");
            let message: any = new ImportTest1Entity(test1Data);
            this.protobufFormat(builder, message, "Test1");
        });
        Button.pop();
        Button.createWithLabel('imports.proto test2 format');
        Button.width('80%');
        Button.height('80px');
        Button.onClick(async () => {
            this.messageType = 'import_test2';
            let test2Data: Test2 = {
                b: "this is test2 value"
            };
            let builder: any = await Protobuf.loadProtoFile('imports.proto', null, null, getContext(this)
                .resourceManager);
            if (!builder) {
                hilog.error(0x0000, this.TAG, '%{public}s', 'codec error: builder is null|undefined.');
                return;
            }
            let ImportTest2Entity: any = builder.build("Test2");
            let message: any = new ImportTest2Entity(test2Data);
            this.protobufFormat(builder, message, "Test2");
        });
        Button.pop();
        Button.createWithLabel('imports.proto test3 format');
        Button.width('80%');
        Button.height('80px');
        Button.onClick(async () => {
            this.messageType = 'import_test3';
            let test3Data: Test3 = {
                test1: { a: 150 },
                test2: { b: "this is test2 value" }
            };
            let builder: any = await Protobuf.loadProtoFile('imports.proto', null, null, getContext(this)
                .resourceManager);
            if (!builder) {
                hilog.error(0x0000, this.TAG, '%{public}s', 'codec error: builder is null|undefined.');
                return;
            }
            let ImportTest3Entity: any = builder.build("js.Test3");
            let message: any = new ImportTest3Entity(test3Data);
            this.protobufFormat(builder, message, "js.Test3");
        });
        Button.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
        Row.pop();
    }
    private protobufFormat(builder: any, message: any, path: string): void {
        try {
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
            this.jsonToMessageResult = JSON.stringify(jsonMessage);
            this.messageToXmlResult = messageXml;
            this.xmlToMessageResult = JSON.stringify(xmlMessage);
            this.messageToHtmlResult = messageHtml;
            switch (this.messageType) {
                case 'person':
                    this.messageData = this.personMessageData;
                    break;
                case 'user':
                    this.messageData = this.userMessageData;
                    break;
                case 'inner':
                    this.messageData = this.innerMessageData;
                    break;
                case 'import_test1':
                    this.messageData = this.importTest1MessageData;
                    break;
                case 'import_test2':
                    this.messageData = this.importTest2MessageData;
                    break;
                case 'import_test3':
                    this.messageData = this.importTest3MessageData;
                    break;
                default:
                    this.messageData = '';
                    break;
            }
        }
        catch (error) {
            hilog.error(0x0000, this.TAG, '%{public}s', 'protobufFormat catch error: ' + error);
            this.messageToJsonResult = 'messageToJsonResult: ';
            this.jsonToMessageResult = 'jsonToMessageResult: ';
            this.messageToXmlResult = 'messageToXmlResult: ';
            this.xmlToMessageResult = 'xmlToMessageResult: ';
            this.messageToHtmlResult = 'messageToHtmlResult: ';
        }
    }
}
loadDocument(new Index("1", undefined, {}));
