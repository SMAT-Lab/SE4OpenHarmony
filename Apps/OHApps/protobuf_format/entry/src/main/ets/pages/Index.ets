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
  result: ResultInfo[] = []
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

@Entry
@Component
struct Index {
  TAG: string = 'protobuf-format';
  @State messageData: string = "messageData: ";
  @State messageToJsonResult: string = "messageToJsonResult: ";
  @State jsonToMessageResult: string = "jsonToMessageResult: ";
  @State messageToXmlResult: string = "messageToXmlResult: ";
  @State xmlToMessageResult: string = "xmlToMessageResult: ";
  @State messageToHtmlResult: string = "messageToHtmlResult: ";
  private userProto: string = 'syntax = "proto3"; package com.user; message UserLoginResponse{uint64 sessionId = 1; string userPrivilege =2;bool isTokenType =3;int32 formatTimestamp =4;}';
  private personProto = `
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
  private innerProtoStr: string = `
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
  private personMessageData: string = `
    personData = {
      name: "personName@<>'*\".",
      id: 256,
      email: "personEmail@xxx.com",
      phones: [{ number: "13812341234", type: 0 }, { number: "0431-81234567", type: 1 }]
    };
  `
  private userMessageData: string = `
     userData = {
       sessionId: 1,
       isTokenType: false,
       formatTimestamp: 2
     };
  `
  private innerMessageData: string = `
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
  `
  private importTest1MessageData: string = `
    test1Data = {
      a: 150
    };
  `
  private importTest2MessageData: string = `
    test2Data = {
      b: "this is test2 value"
    };
  `
  private importTest3MessageData: string = `
    test3Data = {
      test1: { a: 150 },
      test2: { b: "this is test2 value" }
    };
  `
  private messageType: string = ``;

  build() {
    Row() {
      Column() {
        Scroll() {
          Column({ space: 10 }) {
            Text('messageData: ')
              .fontColor(Color.Red)
            Text(this.messageData)
              .width('100%')
            Text('messageToJsonResult: ')
              .fontColor(Color.Red)
            Text(this.messageToJsonResult)
              .width('100%')
            Text('jsonToMessageResult: ')
              .fontColor(Color.Red)
            Text(this.jsonToMessageResult)
              .width('100%')
            Text('messageToXmlResult: ')
              .fontColor(Color.Red)
            Text(this.messageToXmlResult)
              .width('100%')
            Text('xmlToMessageResult: ')
              .fontColor(Color.Red)
            Text(this.xmlToMessageResult)
              .width('100%')
            Text('messageToHtmlResult: ')
              .fontColor(Color.Red)
            Text(this.messageToHtmlResult)
              .width('100%')
          }.alignItems(HorizontalAlign.Start)
        }
        .align(Alignment.TopStart)
        .width('100%')
        .height('65%')

        Divider()
          .width('100%')
          .height('10px')
          .backgroundColor(Color.Red)

        Scroll() {
          Column({ space: 10 }) {
            Button('Jump to Second Page')
              .width('80%')
              .height('80px')
              .onClick(() => {
                router.pushUrl({ url: "pages/InputInfoPage" })
              })

            Button('person.proto format')
              .width('80%')
              .height('80px')
              .onClick(async () => {
                this.messageType = 'person';
                let idValue: Long = Long.fromValue({ high: 0, low: 256, unsigned: true });
                let personData: Person = {
                  name: "personName@<>'*\".",
                  id: idValue,
                  email: "personEmail@xxx.com",
                  phones: [{ number: "13812341234", type: 0 }, { number: "0431-81234567", type: 1 }]
                };
                let personBuilder: ESObject = await Protobuf.loadProto(this.personProto, null, 'person.proto')
                if (!personBuilder) {
                  hilog.error(0x0000, this.TAG, '%{public}s', 'codec error: builder is null|undefined.');
                  return;
                }
                let Person: ESObject = personBuilder.build("tutorial.Person");
                let message: ESObject = new Person(personData);
                this.protobufFormat(personBuilder, message, "tutorial.Person");
              })

            Button('user.proto format')
              .width('80%')
              .height('80px')
              .onClick(async () => {
                this.messageType = 'user';
                let userData: UserInfo = {
                  sessionId: 1,
                  isTokenType: false,
                  formatTimestamp: 2
                };
                let userBuilder: ESObject = await Protobuf.loadProto(this.userProto, null, 'user.proto')
                if (!userBuilder) {
                  hilog.error(0x0000, this.TAG, '%{public}s', 'codec error: builder is null|undefined.');
                  return;
                }
                let UserLoginResponse: ESObject = userBuilder.build("com.user.UserLoginResponse");
                let message: ESObject = new UserLoginResponse(userData);
                this.protobufFormat(userBuilder, message, "com.user.UserLoginResponse");
              })

            Button('inner.proto format')
              .width('80%')
              .height('80px')
              .onClick(async () => {
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
                let innerBuilder: ESObject = await Protobuf.loadProto(this.innerProtoStr, null, 'inner.proto')
                if (!innerBuilder) {
                  hilog.error(0x0000, this.TAG, '%{public}s', 'codec error: builder is null|undefined.');
                  return;
                }
                let ResultResponse: ESObject = innerBuilder.build("js.ResultResponse");
                let message: ESObject = new ResultResponse(innerData);
                this.protobufFormat(innerBuilder, message, "js.ResultResponse");
              })

            Button('imports.proto test1 format')
              .width('80%')
              .height('80px')
              .onClick(async () => {
                this.messageType = 'import_test1';
                let test1Data: Test1 = {
                  a: 150
                };
                let builder: ESObject = await Protobuf.loadProtoFile('imports.proto', null, null, getContext(this)
                  .resourceManager)
                if (!builder) {
                  hilog.error(0x0000, this.TAG, '%{public}s', 'codec error: builder is null|undefined.');
                  return;
                }
                let ImportTest1Entity: ESObject = builder.build("Test1");
                let message: ESObject = new ImportTest1Entity(test1Data);
                this.protobufFormat(builder, message, "Test1");
              })

            Button('imports.proto test2 format')
              .width('80%')
              .height('80px')
              .onClick(async () => {
                this.messageType = 'import_test2';
                let test2Data: Test2 = {
                  b: "this is test2 value"
                };
                let builder: ESObject = await Protobuf.loadProtoFile('imports.proto', null, null, getContext(this)
                  .resourceManager)
                if (!builder) {
                  hilog.error(0x0000, this.TAG, '%{public}s', 'codec error: builder is null|undefined.');
                  return;
                }
                let ImportTest2Entity: ESObject = builder.build("Test2");
                let message: ESObject = new ImportTest2Entity(test2Data);
                this.protobufFormat(builder, message, "Test2");
              })

            Button('imports.proto test3 format')
              .width('80%')
              .height('80px')
              .onClick(async () => {
                this.messageType = 'import_test3';
                let test3Data: Test3 = {
                  test1: { a: 150 },
                  test2: { b: "this is test2 value" }
                };
                let builder: ESObject = await Protobuf.loadProtoFile('imports.proto', null, null, getContext(this)
                  .resourceManager)
                if (!builder) {
                  hilog.error(0x0000, this.TAG, '%{public}s', 'codec error: builder is null|undefined.');
                  return;
                }
                let ImportTest3Entity: ESObject = builder.build("js.Test3");
                let message: ESObject = new ImportTest3Entity(test3Data);
                this.protobufFormat(builder, message, "js.Test3");
              })
          }.alignItems(HorizontalAlign.Start)
        }
        .align(Alignment.TopStart)
        .width('100%')
        .height('33%')
      }
      .margin({ top: 10, left: 10, right: 10 })
      .width('100%')
      .height('100%')
    }
    .height('100%')
    .alignItems(VerticalAlign.Top)
  }

  private protobufFormat(builder: ESObject, message: ESObject, path: string): void {
    try {
      let messageJson: string = Format.messageToJson(message);
      hilog.info(0x0000, this.TAG, '%{public}s', 'messageJson: ' + messageJson);
      let jsonMessage: ESObject = Format.jsonToMessage(builder, path, messageJson);
      hilog.info(0x0000, this.TAG, '%{public}s', 'jsonMessage: ' + jsonMessage);
      let messageXml: string = Format.messageToXml(message);
      hilog.info(0x0000, this.TAG, '%{public}s', 'messageXml: ' + messageXml);
      let xmlMessage: ESObject = Format.xmlToMessage(builder, path, messageXml);
      hilog.info(0x0000, this.TAG, '%{public}s', 'xmlMessage: ' + xmlMessage);
      let messageHtml: string = Format.messageToHtml(message);
      hilog.info(0x0000, this.TAG, '%{public}s', 'messageHtml: ' + messageHtml);

      this.messageToJsonResult = messageJson;
      this.jsonToMessageResult = JSON.stringify(jsonMessage);
      this.messageToXmlResult = messageXml
      this.xmlToMessageResult = JSON.stringify(xmlMessage);
      this.messageToHtmlResult = messageHtml

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
    } catch (error) {
      hilog.error(0x0000, this.TAG, '%{public}s', 'protobufFormat catch error: ' + error);
      this.messageToJsonResult = 'messageToJsonResult: ';
      this.jsonToMessageResult = 'jsonToMessageResult: ';
      this.messageToXmlResult = 'messageToXmlResult: ';
      this.xmlToMessageResult = 'xmlToMessageResult: ';
      this.messageToHtmlResult = 'messageToHtmlResult: ';
    }
  }
}