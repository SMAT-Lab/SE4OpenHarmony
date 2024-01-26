interface Encode_decode_Params {
    message?: string;
    status?: string;
    content?: string;
    echoServer?: string;
    client?: HttpClient;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "encode_decode_sample_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { HttpClient, Request, RequestBody, Response, TimeUnit } from '@ohos/httpclient';
import { CryptoJS } from '@ohos/crypto-js';
import Log from '../model/log';
import hilog from '@ohos.hilog';
import { BusinessError } from '@ohos/httpclient/src/main/ets/http';
class Encode_decode extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__status = new ObservedPropertySimple('000', this, "status");
        this.__content = new ObservedPropertySimple('init', this, "content");
        this.echoServer = "https://postman-echo.com/post";
        this.client = new HttpClient
            .Builder()
            .setConnectTimeout(10, TimeUnit.SECONDS)
            .setReadTimeout(10, TimeUnit.SECONDS)
            .build();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Encode_decode_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.status !== undefined) {
            this.status = params.status;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.echoServer !== undefined) {
            this.echoServer = params.echoServer;
        }
        if (params.client !== undefined) {
            this.client = params.client;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__status.aboutToBeDeleted();
        this.__content.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __status: ObservedPropertySimple<string>;
    get status() {
        return this.__status.get();
    }
    set status(newValue: string) {
        this.__status.set(newValue);
    }
    private __content: ObservedPropertySimple<string>;
    get content() {
        return this.__content.get();
    }
    set content(newValue: string) {
        this.__content.set(newValue);
    }
    private echoServer: string;
    private client: HttpClient;
    onError(error: BusinessError) {
        this.content = JSON.stringify(error);
    }
    render() {
        Scroll.create();
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.width('100%');
        Scroll.height('100%');
        Column.create();
        Column.width('100%');
        Column.margin({
            top: 5,
            bottom: 100
        });
        Flex.create({
            direction: FlexDirection.Column
        });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Navigator.create({
            target: "",
            type: NavigationType.Back
        });
        Text.create('BACK');
        Text.fontSize(12);
        Text.border({
            width: 1
        });
        Text.padding(10);
        Text.fontColor(0x000000);
        Text.borderColor(0x317aff);
        Text.pop();
        Navigator.pop();
        Flex.pop();
        Text.create(this.status);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create(this.content);
        Text.fontSize(20);
        Text.pop();
        Flex.create({
            direction: FlexDirection.Column
        });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('MD5 Test');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            let body: string = CryptoJS.MD5('hello world');
            Log.showInfo('MD5 hashing of hello world is ' + body);
            let request: Request = new Request.Builder()
                .url(this.echoServer)
                .post()
                .body(RequestBody.create(body))
                .addHeader("Content-Type", "application/json")
                .build();
            this.client.newCall(request)
                .execute()
                .then((result: Response) => {
                if (result) {
                    this.status = result.responseCode.toString();
                }
                if (result.result) {
                    this.content = result.result;
                }
                else {
                    this.content = JSON.stringify(result);
                }
                Log.showInfo("onComplete -> Status : " + this.status);
                Log.showInfo("onComplete -> Content : " + JSON.stringify(this.content));
            })
                .catch((error: BusinessError<string>) => {
                this.status = error.code.toString();
                if (error.message != undefined) {
                    this.content = error.message;
                }
                hilog.info(0x0001, "onError -> Error", this.content);
            });
        });
        Button.pop();
        Flex.pop();
        //Utf-8 encode
        Flex.create({
            direction: FlexDirection.Column
        });
        //Utf-8 encode
        Flex.height('10%');
        //Utf-8 encode
        Flex.width('100%');
        //Utf-8 encode
        Flex.padding(10);
        Button.createWithLabel('Utf-8 encode and decode');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            let wordArray: Utf8ParserResultType = CryptoJS.enc.Utf8.parse('hello world');
            let body: string = CryptoJS.enc.Utf8.stringify(wordArray);
            Log.showInfo('Utf decoded result is ' + body);
            let request: Request = new Request.Builder()
                .url(this.echoServer)
                .post()
                .body(RequestBody.create(body))
                .addHeader("Content-Type", "application/json")
                .build();
            this.client.newCall(request)
                .execute()
                .then((result: Response) => {
                if (result) {
                    this.status = result.responseCode.toString();
                }
                if (result.result) {
                    this.content = result.result;
                }
                else {
                    this.content = JSON.stringify(result);
                }
                Log.showInfo("onComplete -> Status : " + this.status);
                Log.showInfo("onComplete -> Content : " + JSON.stringify(this.content));
            })
                .catch((error: BusinessError<string>) => {
                this.status = error.code.toString();
                if (error.message != undefined) {
                    this.content = error.message;
                }
                hilog.info(0x0001, "onError -> Error", this.content);
            });
        });
        Button.pop();
        //Utf-8 encode
        Flex.pop();
        //base64 encode2
        Flex.create({
            direction: FlexDirection.Column
        });
        //base64 encode2
        Flex.height('10%');
        //base64 encode2
        Flex.width('100%');
        //base64 encode2
        Flex.padding(10);
        Button.createWithLabel('base64 encode');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            let body: string = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse("hello world"));
            console.log("base64Encode =" + body);
            let request: Request = new Request.Builder()
                .url(this.echoServer)
                .post()
                .body(RequestBody.create(body))
                .addHeader("Content-Type", "application/json")
                .build();
            this.client.newCall(request)
                .execute()
                .then((result: Response) => {
                if (result) {
                    this.status = result.responseCode.toString();
                }
                if (result.result) {
                    this.content = result.result;
                }
                else {
                    this.content = JSON.stringify(result);
                }
                Log.showInfo("onComplete -> Status : " + this.status);
                Log.showInfo("onComplete -> Content : " + JSON.stringify(this.content));
            })
                .catch((error: BusinessError) => {
                this.status = error.code.toString();
                if (error.message != undefined) {
                    this.content = error.message;
                }
                hilog.info(0x0001, "onError -> Error", this.content);
            });
        });
        Button.pop();
        //base64 encode2
        Flex.pop();
        //base64 decode2
        Flex.create({
            direction: FlexDirection.Column
        });
        //base64 decode2
        Flex.height('10%');
        //base64 decode2
        Flex.width('100%');
        //base64 decode2
        Flex.padding(10);
        Button.createWithLabel('base64 decode');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            let body: string = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse("aGVsbG8gd29ybGQ="));
            console.log("base64Decode =" + body);
            let request: Request = new Request.Builder()
                .url(this.echoServer)
                .post()
                .body(RequestBody.create(body))
                .addHeader("Content-Type", "application/json")
                .build();
            this.client.newCall(request)
                .execute()
                .then((result: Response) => {
                if (result) {
                    this.status = result.responseCode.toString();
                }
                if (result.result) {
                    this.content = result.result;
                }
                else {
                    this.content = JSON.stringify(result);
                }
                Log.showInfo("onComplete -> Status : " + this.status);
                Log.showInfo("onComplete -> Content : " + JSON.stringify(this.content));
            })
                .catch((error: BusinessError) => {
                this.status = error.code.toString();
                if (error.message != undefined) {
                    this.content = error.message;
                }
                hilog.info(0x0001, "onError -> Error", this.content);
            });
        });
        Button.pop();
        //base64 decode2
        Flex.pop();
        //hex encode
        Flex.create({
            direction: FlexDirection.Column
        });
        //hex encode
        Flex.height('10%');
        //hex encode
        Flex.width('100%');
        //hex encode
        Flex.padding(10);
        Button.createWithLabel('hex encode');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            let body: string = CryptoJS.enc.Hex.stringify(CryptoJS.enc.Utf8.parse('some random string'));
            Log.showInfo('hex encode of hello world:' + body);
            let request: Request = new Request.Builder()
                .url(this.echoServer)
                .post()
                .body(RequestBody.create(body))
                .addHeader("Content-Type", "application/json")
                .build();
            this.client.newCall(request)
                .execute()
                .then((result: Response) => {
                if (result) {
                    this.status = result.responseCode.toString();
                }
                if (result.result) {
                    this.content = result.result;
                }
                else {
                    this.content = JSON.stringify(result);
                }
                Log.showInfo("onComplete -> Status : " + this.status);
                Log.showInfo("onComplete -> Content : " + JSON.stringify(this.content));
            })
                .catch((error: BusinessError) => {
                this.status = error.code.toString();
                if (error.message != undefined) {
                    this.content = error.message;
                }
                hilog.info(0x0001, "onError -> Error", this.content);
            });
        });
        Button.pop();
        //hex encode
        Flex.pop();
        //hex decode
        Flex.create({
            direction: FlexDirection.Column
        });
        //hex decode
        Flex.height('10%');
        //hex decode
        Flex.width('100%');
        //hex decode
        Flex.padding(10);
        Button.createWithLabel('hex decode');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            let body: string = CryptoJS.enc.Hex.stringify(CryptoJS.enc.Utf8.parse('some random string'));
            Log.showInfo('hex encode of some random string:' + body);
            //Decode happens inside the response interceptor
            let request: Request = new Request.Builder()
                .url(this.echoServer)
                .post()
                .body(RequestBody.create(body))
                .addHeader("Content-Type", "application/json")
                .build();
            this.client.newCall(request).enqueue((result: Response) => {
                if (result) {
                    this.status = result.responseCode.toString();
                }
                if (result.result) {
                    this.content = result.result;
                }
                else {
                    this.content = JSON.stringify(result);
                }
                Log.showInfo("onComplete -> Status : " + this.status);
                Log.showInfo("onComplete -> Content : " + JSON.stringify(this.content));
                try {
                    let words: Utf8ParserResultType = CryptoJS.enc.Hex.parse(JSON.parse(this.content).data);
                    let textString: string = CryptoJS.enc.Utf8.stringify(words);
                    Log.showInfo('hex decode testcase and decoded text is:' + textString);
                }
                catch (error) {
                    Log.showError("hex decode testcase failed : " + error);
                }
            }, (error: BusinessError) => {
                this.status = error.code.toString();
                if (error.message != undefined) {
                    this.content = error.message;
                }
                hilog.info(0x0001, "onError -> Error", this.content);
            });
        });
        Button.pop();
        //hex decode
        Flex.pop();
        Column.pop();
        Scroll.pop();
    }
}
interface Utf8ParserResultType {
    words: string[];
    sigBytes: number;
}
loadDocument(new Encode_decode("1", undefined, {}));
