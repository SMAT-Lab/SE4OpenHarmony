interface Retry_Params {
    status?: string;
    content?: string;
    echoServer?: string;
    client?: HttpClient;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "retry_" + ++__generate__Id;
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
import { HttpClient, Mime, Request, RequestBody, Response } from '@ohos/httpclient';
import Log from '../model/log';
import router from '@ohos.router';
import hilog from '@ohos.hilog';
import HttpCall from '@ohos/httpclient/src/main/ets/HttpCall';
import { BusinessError } from '@ohos.base';
class Retry extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__status = new ObservedPropertySimple('000', this, "status");
        this.__content = new ObservedPropertySimple('init', this, "content");
        this.echoServer = "http://www.yourserverfortest.com";
        this.client = new HttpClient.Builder().setConnectTimeout(10000).build();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Retry_Params) {
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
        this.__status.aboutToBeDeleted();
        this.__content.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
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
        Scroll.create();
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.width('100%');
        Scroll.height('100%');
        Scroll.margin({ top: 5, bottom: 100 });
        Column.create();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Navigator.create({ target: "", type: NavigationType.Back });
        Text.create('BACK');
        Text.fontSize(12);
        Text.border({ width: 1 });
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
        //请求前取消请求
        Flex.create({ direction: FlexDirection.Column });
        //请求前取消请求
        Flex.height('10%');
        //请求前取消请求
        Flex.width('100%');
        //请求前取消请求
        Flex.padding(10);
        Button.createWithLabel('CanceledBeforeExecute');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            let request: Request = new Request.Builder()
                .get("http://hshapp.ncn.com.cn/wisdom3/config/config.do")
                .addHeader("Content-Type", "application/json")
                .params("testKey1", "testValue1")
                .params("testKey2", "testValue2")
                .build();
            let call: HttpCall = this.client.newCall(request);
            call.cancel();
            call.execute().then((data: Response) => {
                Log.showInfo("RetryAndFollowUpInterceptor result   " + JSON.stringify(data));
                if (data) {
                    this.status = data.responseCode.toString();
                }
                if (data.result) {
                    this.content = data.result;
                }
                else {
                    this.content = JSON.stringify(data);
                }
            }).catch((error: BusinessError) => {
                this.status = error.code.toString();
                if (error.message != undefined) {
                    this.content = error.message;
                }
            });
        });
        Button.pop();
        //请求前取消请求
        Flex.pop();
        //连接服务器超时
        Flex.create({ direction: FlexDirection.Column });
        //连接服务器超时
        Flex.height('10%');
        //连接服务器超时
        Flex.width('100%');
        //连接服务器超时
        Flex.padding(10);
        Button.createWithLabel('ConnectionServerTimeout');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            let request: Request = new Request.Builder()
                .get("http://1.15.87.213:9527/timeoutApi/timeoutTest")
                .addHeader("Content-Type", "application/json")
                .params("testKey1", "testValue1")
                .params("testKey2", "testValue2")
                .build();
            let call: HttpCall = this.client.newCall(request);
            call.execute().then((data: Response) => {
                Log.showInfo("RetryAndFollowUpInterceptor result   " + JSON.stringify(data));
                if (data) {
                    this.status = data.responseCode.toString();
                }
                if (data.result) {
                    this.content = data.result;
                }
                else {
                    this.content = JSON.stringify(data);
                }
            }).catch((error: BusinessError) => {
                this.status = error.code.toString();
                if (error.message != undefined) {
                    this.content = error.message;
                }
            });
        });
        Button.pop();
        //连接服务器超时
        Flex.pop();
        //408 第一次请求408，重试请求，第二次仍为408，不再请求返回结果
        Flex.create({ direction: FlexDirection.Column });
        //408 第一次请求408，重试请求，第二次仍为408，不再请求返回结果
        Flex.height('10%');
        //408 第一次请求408，重试请求，第二次仍为408，不再请求返回结果
        Flex.width('100%');
        //408 第一次请求408，重试请求，第二次仍为408，不再请求返回结果
        Flex.padding(10);
        Button.createWithLabel('getClientRequestTimeout - 408');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            let request: Request = new Request.Builder()
                .get("http://httpbin.org/delay/2")
                .addHeader("Content-Type", "application/json")
                .addHeader("Connection", "Close")
                .debugCode(408)
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
            })
                .catch((error: BusinessError) => {
                this.status = error.code.toString();
                if (error.message != undefined) {
                    this.content = error.message;
                }
                hilog.info(0x0001, "onError -> Error", JSON.stringify(error));
            });
        });
        Button.pop();
        //408 第一次请求408，重试请求，第二次仍为408，不再请求返回结果
        Flex.pop();
        //503 第一次请求503，重试请求，第二次仍为503，不再请求返回结果
        Flex.create({ direction: FlexDirection.Column });
        //503 第一次请求503，重试请求，第二次仍为503，不再请求返回结果
        Flex.height('10%');
        //503 第一次请求503，重试请求，第二次仍为503，不再请求返回结果
        Flex.width('100%');
        //503 第一次请求503，重试请求，第二次仍为503，不再请求返回结果
        Flex.padding(10);
        Button.createWithLabel('retryOnUnavailableRetryAfter - 503');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            let request: Request = new Request.Builder()
                .get("https://mock.apifox.cn/m1/1773132-0-default/pet/1")
                .addHeader("Content-Type", "application/json")
                .addHeader("Connection", "Close")
                .debugCode(503)
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
            })
                .catch((error: BusinessError) => {
                this.status = error.code.toString();
                if (error.message != undefined) {
                    this.content = error.message;
                }
                hilog.info(0x0001, "onError -> Error", JSON.stringify(error));
            });
        });
        Button.pop();
        //503 第一次请求503，重试请求，第二次仍为503，不再请求返回结果
        Flex.pop();
        //401
        Flex.create({ direction: FlexDirection.Column });
        //401
        Flex.height('10%');
        //401
        Flex.width('100%');
        //401
        Flex.padding(10);
        Button.createWithLabel('authenticator - 401');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({
                url: 'pages/authenticator'
            });
        });
        Button.pop();
        //401
        Flex.pop();
        //401
        Flex.create({ direction: FlexDirection.Column });
        //401
        Flex.height('10%');
        //401
        Flex.width('100%');
        //401
        Flex.padding(10);
        Button.createWithLabel('authenticator_custom- 401');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({
                url: 'pages/authenticator_custom'
            });
        });
        Button.pop();
        //401
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('setFollowRedirectsFalse - 302');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            let request: Request = new Request.Builder()
                .url("https://mock.apifox.cn/m2/1773132-0-default/44759484")
                .post(RequestBody.create(new Mime.Builder().contentType('application/json', 'charset', 'utf8')
                .build()
                .getMime()))
                .followRedirects(false)
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
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('redirectRequest - 307');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            let request: Request = new Request.Builder()
                .url("https://mock.apifox.cn/m1/1773132-0-default/redirectRequest?apifoxResponseId=111715800")
                .post(RequestBody.create(new Mime.Builder().contentType('application/json', 'charset', 'utf8')
                .build()
                .getMime()))
                .debugUrl('https://mock.apifox.cn/m1/1773132-0-default/redirectRequest')
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
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('requestException');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            let request: Request = new Request.Builder()
                .url(this.echoServer)
                .post(RequestBody.create("123"))
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
        Flex.pop();
        Blank.create();
        Blank.height(150);
        Blank.pop();
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new Retry("1", undefined, {}));
