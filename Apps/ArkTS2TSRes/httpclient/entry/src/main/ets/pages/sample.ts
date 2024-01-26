interface Sample_Params {
    msg?: string;
    status?: string;
    content?: string;
    echoServer?: string;
    yourServer?: string;
    fileName?: string;
    message?: string;
    hereAbilityContext?: Context;
    client?: HttpClient;
    cookieJar?: ESObject;
    cookieManager?: ESObject;
    store?: ESObject;
    sampleTag?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "sample_" + ++__generate__Id;
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
import { CookieJar, CookieManager, CookiePolicy, CookieStore, HttpClient, Request, RequestBody, Response, TimeUnit } from '@ohos/httpclient';
import Author from '../model/author';
import Log from '../model/log';
import router from '@ohos.router';
import hilog from '@ohos.hilog';
import resmgr from '@ohos.resourceManager';
import HttpCall from '@ohos/httpclient/src/main/ets/HttpCall';
import { BusinessError } from '@ohos.base';
class Sample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__msg = new ObservedPropertySimple("", this, "msg");
        this.__status = new ObservedPropertySimple("", this, "status");
        this.__content = new ObservedPropertySimple("", this, "content");
        this.echoServer = "https://postman-echo.com/get";
        this.yourServer = "http://www.yourserver.com";
        this.fileName = "/test.txt";
        this.message = 'Hello World';
        this.hereAbilityContext = getContext();
        this.client = new HttpClient
            .Builder()
            .setConnectTimeout(10, TimeUnit.SECONDS)
            .setReadTimeout(10, TimeUnit.SECONDS)
            .build();
        this.cookieJar = new CookieJar();
        this.cookieManager = new CookieManager();
        this.store = new CookieStore(this.hereAbilityContext.cacheDir);
        this.sampleTag = "Sample :";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Sample_Params) {
        if (params.msg !== undefined) {
            this.msg = params.msg;
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
        if (params.yourServer !== undefined) {
            this.yourServer = params.yourServer;
        }
        if (params.fileName !== undefined) {
            this.fileName = params.fileName;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.hereAbilityContext !== undefined) {
            this.hereAbilityContext = params.hereAbilityContext;
        }
        if (params.client !== undefined) {
            this.client = params.client;
        }
        if (params.cookieJar !== undefined) {
            this.cookieJar = params.cookieJar;
        }
        if (params.cookieManager !== undefined) {
            this.cookieManager = params.cookieManager;
        }
        if (params.store !== undefined) {
            this.store = params.store;
        }
        if (params.sampleTag !== undefined) {
            this.sampleTag = params.sampleTag;
        }
    }
    aboutToBeDeleted() {
        this.__msg.aboutToBeDeleted();
        this.__status.aboutToBeDeleted();
        this.__content.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __msg: ObservedPropertySimple<string>;
    get msg() {
        return this.__msg.get();
    }
    set msg(newValue: string) {
        this.__msg.set(newValue);
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
    private yourServer: string;
    private fileName: string;
    private message: string;
    private hereAbilityContext: Context;
    private client: HttpClient;
    private cookieJar: any;
    private cookieManager: any;
    private store: any;
    private sampleTag: string;
    render() {
        Scroll.create();
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.width('100%');
        Scroll.height('100%');
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
        Flex.create({
            direction: FlexDirection.Column
        });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('timeoutRequest');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            this.content = "waiting for response";
            let request1: Request = new Request.Builder()
                .get()
                .url("http://httpbin.org/delay/10")
                .tag("tag_timeout")
                .addHeader("Content-Type", "application/json")
                .build();
            this.client.newCall(request1).enqueue((result: Response) => {
                if (result) {
                    this.status = result.responseCode.toString();
                }
                if (result.result) {
                    this.content = result.result;
                }
                else {
                    this.content = JSON.stringify(result);
                }
            }, (error: BusinessError) => {
                this.content = JSON.stringify(error);
            });
        });
        Button.pop();
        Flex.pop();
        Flex.create({
            direction: FlexDirection.Column
        });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('Custom Request');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            this.content = "";
            let authorId = "abc7689";
            let userName = "TestUser";
            let emailId = "testmail@gmail.com";
            let password = "password123";
            let author = new Author(authorId, userName, emailId, password);
            let requestBody: RequestBody = RequestBody.create(JSON.stringify(author));
            let request: Request = new Request.Builder()
                .url("https://postman-echo.com/post")
                .post()
                .body(requestBody)
                .addHeader("Content-Type", "application/json")
                .build();
            this.client.newCall(request)
                .execute()
                .then((result: Response) => {
                this.status = result.responseCode.toString();
                if (result.result)
                    this.content = result.result;
                else
                    this.content = JSON.stringify(result);
            })
                .catch((err: BusinessError) => {
                if (err.message != undefined) {
                    this.content = err.message;
                }
            });
        });
        Button.pop();
        Flex.pop();
        Flex.create({
            direction: FlexDirection.Column
        });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('Cancel Running Call');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            this.content = "";
            let request: Request = new Request.Builder()
                .url(this.echoServer)
                .get()
                .addHeader("Content-Type", "application/json")
                .build();
            let call: HttpCall = this.client.newCall(request);
            call.enqueue((result: Response) => {
                if (result) {
                    this.status = result.responseCode.toString();
                }
                if (result.result) {
                    this.content = JSON.stringify(result.result);
                }
                else {
                    this.content = JSON.stringify(result);
                }
            }, (error: BusinessError) => {
                this.content = JSON.stringify(error);
            });
            call.cancel();
            this.content += "\n\n" + "call.isCancelled() ： " + call.isCancelled();
        });
        Button.pop();
        Flex.pop();
        Flex.create({
            direction: FlexDirection.Column
        });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('Cancel Queued Call');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            this.content = "";
            let request1: Request = new Request.Builder()
                .url(this.echoServer)
                .post()
                .body(RequestBody.create("This is just a test message"))
                .addHeader("Content-Type", "application/json")
                .build();
            this.client.newCall(request1).enqueue((result: Response) => {
                if (result) {
                    Log.showInfo(this.sampleTag + result.responseCode.toString());
                }
                if (result.result) {
                    Log.showInfo(this.sampleTag + "request1 result.result" + result.result);
                }
                else
                    Log.showInfo(this.sampleTag + "request1 result.result" + result.result);
            }, (error: BusinessError) => {
                Log.showError(this.sampleTag + "request1.error" + JSON.stringify(error));
            });
            let request2: Request = new Request.Builder()
                .url(this.echoServer)
                .get()
                .body(RequestBody.create("This is just a hello world message"))
                .addHeader("Content-Type", "application/json")
                .build();
            this.client.newCall(request2).enqueue((result: Response) => {
                if (result) {
                    Log.showInfo(this.sampleTag + result.responseCode.toString());
                }
                if (result.result)
                    Log.showInfo(this.sampleTag + "request2 result.result" + result.result);
                else
                    Log.showInfo(this.sampleTag + "request2 result.result" + result.result);
            }, (error: BusinessError) => {
                Log.showError(this.sampleTag + "request2.reeror" + JSON.stringify(error));
                this.content = JSON.stringify(error);
            });
            let request3: Request = new Request.Builder()
                .get()
                .url(this.echoServer)
                .addHeader("Content-Type", "application/json")
                .build();
            this.client.newCall(request3).enqueue((result: Response) => {
                if (result) {
                    Log.showInfo(this.sampleTag + result.responseCode.toString());
                }
                if (result.result)
                    Log.showInfo(this.sampleTag + "request3 result.result" + result.result);
                else
                    Log.showInfo(this.sampleTag + "request3 result.result" + result.result);
            }, (error: BusinessError) => {
                Log.showError(this.sampleTag + "request3.error" + JSON.stringify(error));
            });
            let request4: Request = new Request.Builder()
                .url(this.echoServer)
                .post()
                .body(RequestBody.create("This is just a repeated hello world message"))
                .addHeader("Content-Type", "application/json")
                .build();
            let call: HttpCall = this.client.newCall(request4);
            call.enqueue((result: Response) => {
                if (result) {
                    Log.showInfo(this.sampleTag + result.responseCode.toString());
                }
                if (result.result)
                    Log.showInfo(this.sampleTag + "request4 result.result" + result.result);
                else
                    Log.showInfo(this.sampleTag + "request4 result.result" + result.result);
            }, (error: BusinessError) => {
                this.status = error.code.toString();
                this.content = JSON.stringify(error);
                Log.showError(this.sampleTag + "request4.error" + JSON.stringify(error));
            });
            call.cancel();
            this.content += "\n\n" + "Cancel Queued call.isCancelled() ： " + call.isCancelled();
        });
        Button.pop();
        Flex.pop();
        Flex.create({
            direction: FlexDirection.Column
        });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('cookieRequest');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick(async (event: ClickEvent) => {
            this.content = "";
            let self = this;
            this.cookieManager.setCookiePolicy(CookiePolicy.ACCEPT_ALL);
            this.cookieJar.setCookieStore(this.store);
            //first request to get the cookie
            let request1: Request = new Request.Builder()
                .get()
                .url(this.yourServer)
                .tag("tag_cookie1")
                .setCookieJar(this.cookieJar)
                .setAbilityContext(this.hereAbilityContext)
                .setCookieManager(this.cookieManager)
                .addHeader("Content-Type", "application/json")
                .build();
            self.client.newCall(request1).enqueue((response: Response) => {
                if (response) {
                    this.status = "" + response.responseCode;
                }
                if (response.result) {
                    this.content = response.result;
                }
                else {
                    this.content = JSON.stringify(response);
                }
                Log.showInfo("onComplete cookie-> Status : " + this.status);
                Log.showInfo("onComplete cookie-> Content : " + JSON.stringify(this.content));
            }, (error: BusinessError) => {
                this.status = "";
                if (error != undefined) {
                    this.content = error.message;
                }
                hilog.info(0x0001, "onError -> Error", this.content);
            });
        });
        Button.pop();
        Flex.pop();
        Flex.create({
            direction: FlexDirection.Column
        });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('cookieExpiryRequest');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            this.content = "";
            let self = this;
            this.cookieManager.setCookiePolicy(CookiePolicy.ACCEPT_ALL);
            this.cookieJar.setCookieStore(this.store);
            let request1: Request = new Request.Builder()
                .get()
                .url(this.yourServer)
                .tag("tag_cookie1")
                .setCookieJar(this.cookieJar)
                .setCookieManager(this.cookieManager)
                .addHeader("Content-Type", "application/json")
                .build();
            self.client.newCall(request1).enqueue((result: CookieResultType) => {
                if (result) {
                    this.status = result.responseCode + " ";
                    this.content = result.response.result;
                }
                else
                    this.content = JSON.stringify(result);
            }, (error: BusinessError) => {
                this.content = JSON.stringify(error);
            });
        });
        Button.pop();
        Flex.pop();
        Flex.create({
            direction: FlexDirection.Column
        });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('cookieDomainRequest');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            this.content = "";
            let self = this;
            this.cookieManager.setCookiePolicy(CookiePolicy.ACCEPT_ORIGINAL_SERVER);
            this.cookieJar.setCookieStore(this.store);
            let request1: Request = new Request.Builder()
                .get()
                .url(this.yourServer)
                .tag("tag_cookie2")
                .setCookieJar(this.cookieJar)
                .setCookieManager(this.cookieManager)
                .addHeader("Content-Type", "application/json")
                .build();
            self.client.newCall(request1).enqueue((result: CookieResultType) => {
                if (result) {
                    this.status = result.responseCode + " ";
                    this.content = result.response.result;
                }
                else
                    this.content = JSON.stringify(result);
            }, (error: BusinessError) => {
                this.content = JSON.stringify(error);
            });
        });
        Button.pop();
        Flex.pop();
        Flex.create({
            direction: FlexDirection.Column
        });
        Flex.onClick((event: ClickEvent) => {
            router.pushUrl({
                url: "pages/CustomRequest"
            });
        });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('JSONCallback');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.pop();
        Flex.pop();
        Flex.create({
            direction: FlexDirection.Column
        });
        Flex.onClick((event: ClickEvent) => {
            router.push({
                url: "pages/requestCaching"
            });
        });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('caching');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.pop();
        Flex.pop();
        Blank.create();
        Blank.height(150);
        Blank.pop();
        Column.pop();
        Scroll.pop();
    }
}
interface CookieResultType {
    priorResponse: null;
    responseCode: number;
    result: string;
    header: string;
    request: object;
    protocol: string;
    response: Response;
    sentRequestAtMillis: number;
    receivedResponseAtMillis: number;
}
loadDocument(new Sample("1", undefined, {}));
