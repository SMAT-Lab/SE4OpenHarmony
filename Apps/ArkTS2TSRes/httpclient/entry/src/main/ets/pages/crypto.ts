interface Auxiliary_Params {
    message?: string;
    status?: string;
    content?: string;
    echoServer?: string;
    client?: HttpClient;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "crypto_" + ++__generate__Id;
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
import { Chain, HttpClient, Interceptor, Request, RequestBody, Response, TimeUnit } from '@ohos/httpclient';
import { CryptoJS } from '@ohos/crypto-js';
import Log from '../model/log';
import { BusinessError } from '@ohos/httpclient/src/main/ets/http';
const secretKey: string = 'abcd1234';
class Auxiliary extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__status = new ObservedPropertySimple("", this, "status");
        this.__content = new ObservedPropertySimple("", this, "content");
        this.echoServer = "https://postman-echo.com/get";
        this.client = new HttpClient
            .Builder()
            .setConnectTimeout(10, TimeUnit.SECONDS)
            .setReadTimeout(10, TimeUnit.SECONDS)
            .build();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Auxiliary_Params) {
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
    render() {
        Column.create();
        Column.width('100%');
        Column.margin({
            top: 5,
            bottom: 100
        });
        Column.height('80%');
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
        Flex.create({
            direction: FlexDirection.Column
        });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('AES');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            let client: HttpClient = new HttpClient.Builder()
                .addInterceptor(new CustomInterceptor())
                .setConnectTimeout(10000).build();
            let request: Request = new Request.Builder()
                .post()
                .body(RequestBody.create("test123"))
                .url(this.echoServer)
                .build();
            client.newCall(request).execute().then((result: Response) => {
                if (result) {
                    this.status = result.responseCode.toString();
                }
                if (result.result) {
                    this.content = result.result;
                }
                else {
                    this.content = JSON.stringify(result);
                }
            }).catch((error: BusinessError<string>) => {
                this.status = error.code.toString();
                if (error.data != undefined) {
                    this.content = error.data;
                }
            });
        });
        Button.pop();
        Flex.pop();
        Text.create(this.status);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create(this.content);
        Text.fontSize(20);
        Text.pop();
        Column.pop();
    }
}
class CustomInterceptor implements Interceptor {
    intercept(chain: Chain): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            let request: Request = chain.requestI();
            Log.showInfo("request = " + request);
            Log.showInfo("inside AES interceptor request" + JSON.stringify(request.body.content));
            let encrypted: string = CryptoJS.AES.encrypt(request.body.content, CryptoJS.enc.Utf8.parse(secretKey), {
                iv: CryptoJS.enc.Utf8.parse('0000000000'),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
                format: CryptoJS.format.Hex
            }).toString();
            request.body.content = encrypted;
            let response: Promise<Response> = chain.proceedI(request);
            Log.showInfo("response = " + response);
            response.then((data: Response) => {
                resolve(data);
                Log.showInfo("inside AES interceptor response");
                let decrypted: string = CryptoJS.AES.decrypt(data.result, CryptoJS.enc.Utf8.parse(secretKey), {
                    iv: CryptoJS.enc.Utf8.parse('0000000000'),
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7,
                    format: CryptoJS.format.Hex
                }).toString();
                console.log("AES decrypt = " + JSON.stringify(decrypted));
                data.result = decrypted;
            }).catch((err: BusinessError) => {
                reject(err);
            });
        });
    }
}
loadDocument(new Auxiliary("1", undefined, {}));
