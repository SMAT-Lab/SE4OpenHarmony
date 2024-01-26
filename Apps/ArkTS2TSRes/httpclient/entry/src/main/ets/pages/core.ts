interface Core_Params {
    message?: string;
    status?: string;
    content?: string;
    filePath?: string;
    // info: ESObject;
    hereAbilityContext?: Context;
    hereCacheDir?: string;
    hereFilesDir?: string;
    ca1?;
    ca2?;
    echoServer?: string;
    redirectServer?: string;
    client?: HttpClient;
    cache?: Cache.Cache;
    CacheClient?: HttpClient;
    writeContent?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "core_" + ++__generate__Id;
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
import { Cache, Chain, DnsResolve, FormEncoder, HttpClient, Interceptor, Mime, MultiPart, Request, RequestBody, Response } from '@ohos/httpclient';
import Log from '../model/log';
import fs from '@ohos.file.fs';
import hilog from '@ohos.hilog';
import { Utils } from "../utils/Utils";
import { BusinessError } from '@ohos/httpclient/src/main/ets/http';
const TAG: string = "Core --> ";
class Core extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__status = new ObservedPropertySimple('000', this, "status");
        this.__content = new ObservedPropertySimple('init', this, "content");
        this.__filePath = new ObservedPropertySimple('', this, "filePath");
        this.hereAbilityContext = getContext();
        this.hereCacheDir = this.hereAbilityContext.cacheDir;
        this.hereFilesDir = this.hereAbilityContext.filesDir;
        this.ca1 = "wanandroidRoot.crt";
        this.ca2 = "wanandroidRSA.crt";
        this.echoServer = "http://www.yourserverfortest.com";
        this.redirectServer = "http://www.yourserverforredirect.com";
        this.client = new HttpClient.Builder().setConnectTimeout(10000).build();
        this.cache = new Cache.Cache(this.hereCacheDir, 10 * 1024 * 1024, getContext());
        this.CacheClient = new HttpClient.Builder().cache(this.cache).setConnectTimeout(10000).build();
        this.writeContent = '# httpclient## Design IdeaIn a traditional I/O,  other data fldfdsfdfgdgfdhghjkh,6565g6r56456f5g65f65546456443';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Core_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.status !== undefined) {
            this.status = params.status;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.filePath !== undefined) {
            this.filePath = params.filePath;
        }
        if (params.hereAbilityContext !== undefined) {
            this.hereAbilityContext = params.hereAbilityContext;
        }
        if (params.hereCacheDir !== undefined) {
            this.hereCacheDir = params.hereCacheDir;
        }
        if (params.hereFilesDir !== undefined) {
            this.hereFilesDir = params.hereFilesDir;
        }
        if (params.ca1 !== undefined) {
            this.ca1 = params.ca1;
        }
        if (params.ca2 !== undefined) {
            this.ca2 = params.ca2;
        }
        if (params.echoServer !== undefined) {
            this.echoServer = params.echoServer;
        }
        if (params.redirectServer !== undefined) {
            this.redirectServer = params.redirectServer;
        }
        if (params.client !== undefined) {
            this.client = params.client;
        }
        if (params.cache !== undefined) {
            this.cache = params.cache;
        }
        if (params.CacheClient !== undefined) {
            this.CacheClient = params.CacheClient;
        }
        if (params.writeContent !== undefined) {
            this.writeContent = params.writeContent;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__status.aboutToBeDeleted();
        this.__content.aboutToBeDeleted();
        this.__filePath.aboutToBeDeleted();
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
    private __filePath: ObservedPropertySimple<string>;
    get filePath() {
        return this.__filePath.get();
    }
    set filePath(newValue: string) {
        this.__filePath.set(newValue);
    }
    // info: ESObject;
    private hereAbilityContext: Context;
    private hereCacheDir: string;
    private hereFilesDir: string;
    private ca1;
    private ca2;
    private echoServer: string;
    private redirectServer: string;
    private client: HttpClient;
    private cache: Cache.Cache;
    private CacheClient: HttpClient;
    private writeContent: string;
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
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('GET execute');
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
                .catch((error: BusinessError<string>) => {
                this.status = error.code.toString();
                if (error.data != undefined) {
                    this.content = error.data;
                }
                hilog.info(0x0001, "onError -> Error", JSON.stringify(error));
            });
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('GET enqueue');
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
            }, (error: BusinessError<string>) => {
                this.status = error.code.toString();
                if (error.data != undefined) {
                    this.content = error.data;
                }
                hilog.info(0x0001, "onError -> Error", JSON.stringify(error));
            });
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('POST-execute');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            let request: Request = new Request.Builder()
                .url("https://jsonplaceholder.typicode.com/posts") //Mime
                .post(RequestBody.create({ 'name': 'Hello Kitty', 'status': 'sold' }, new Mime.Builder().contentType('application/x-www-form-urlencoded').build().getMime()))
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
                if (error.data != undefined) {
                    this.content = error.data;
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
        Button.createWithLabel('POST-1');
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
                .post(RequestBody.create("test123"))
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
                if (error.data != undefined) {
                    this.content = error.data;
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
        Button.createWithLabel('POST-2');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            let request: Request = new Request.Builder()
                .url("https://postman-echo.com/post")
                .post(RequestBody.create({
                a: 'a1', b: 'b1'
            }, new Mime.Builder().contentType('application/json').build().getMime()))
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
                if (error.data != undefined) {
                    this.content = error.data;
                }
                hilog.info(0x0001, "onError -> Error", this.content);
            });
        });
        Button.pop();
        Flex.pop();
        //111111111
        Flex.create({ direction: FlexDirection.Column });
        //111111111
        Flex.height('10%');
        //111111111
        Flex.width('100%');
        //111111111
        Flex.padding(10);
        Button.createWithLabel('POST-3');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            let formEncoder: FormEncoder = new FormEncoder.Builder()
                .add('key1', 'value1')
                .add('key2', 'value2')
                .build();
            let feBody: RequestBody = formEncoder.createRequestBody();
            let request: Request = new Request.Builder()
                .url("https://postman-echo.com/post")
                .post(feBody)
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
                if (error.data != undefined) {
                    this.content = error.data;
                }
                hilog.info(0x0001, "onError -> Error", this.content);
            });
        });
        Button.pop();
        //111111111
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('REDIRECT');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            let request: Request = new Request.Builder()
                .get(this.redirectServer)
                .addHeader("Content-Type", "application/json")
                .followRedirects(true)
                .retryOnConnectionFailure(true)
                .redirectMaxLimit(20)
                .retryMaxLimit(20)
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
                if (error.data != undefined) {
                    this.content = error.data;
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
        Button.createWithLabel('PUT');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            let request: Request = new Request.Builder()
                .url("https://postman-echo.com/put")
                .put(RequestBody.create({
                a: 'a1', b: 'b1'
            }, new Mime.Builder().contentType('application/json', 'charset', 'utf8').build()))
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
                this.status = "";
                if (error.data != undefined) {
                    this.content = error.data;
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
        Button.createWithLabel('DELETE');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            let request: Request = new Request.Builder()
                .url("https://reqres.in/api/users/2")
                .delete()
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
                if (error.data != undefined) {
                    this.content = error.data;
                }
                hilog.info(0x0001, "onError -> Error", this.content);
            });
        });
        Button.pop();
        Flex.pop();
        //2222222
        Flex.create({ direction: FlexDirection.Column });
        //2222222
        Flex.height('10%');
        //2222222
        Flex.width('100%');
        //2222222
        Flex.padding(10);
        Button.createWithLabel('MULTI DATA REQUEST');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            this.content = "";
            const ctx = this;
            let isSuccess = ctx.createFileIfNotExist();
            if (!isSuccess) {
                console.log("    createFileIfNotExist - fail ");
            }
            let data = ctx.getFileData();
            if (data === null || data === undefined) {
                console.log("    getFileData - fail ");
            }
            let requestBody1: RequestBody = RequestBody.create({
                Title: 'Multipart',
                Color: 'Brown'
            }, new Mime.Builder().contentDisposition('form-data; name="myfile"')
                .contentType('text/plain', 'charset', 'utf8')
                .build()
                .getMime());
            let requestBody2: RequestBody = RequestBody.create("HttpClient", new Mime.Builder().contentDisposition('form-data; name="http"')
                .contentType('text/plain', 'charset', 'utf8')
                .build()
                .getMime());
            let requestBody3: RequestBody = RequestBody.create(data, new Mime.Builder().contentDisposition('form-data; name="file";filename="httpclient.txt"')
                .contentType('text/plain', 'charset', 'utf8')
                .build()
                .getMime());
            let boundary: string = "AaB03x";
            let multiPartObj: MultiPart = new MultiPart.Builder()
                .type(MultiPart.FORMDATA)
                .addPart(requestBody1)
                .addPart(requestBody2)
                .addPart(requestBody3)
                .build();
            let body: RequestBody = multiPartObj.createRequestBody();
            let request: Request = new Request.Builder()
                .url(this.echoServer)
                .post(body)
                .addHeader("Content-Type", "multipart/form-data")
                .params("LibName", "HttpClient-ohos")
                .params("Request", "MultiData")
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
            }, (error: BusinessError<string>) => {
                this.status = error.code.toString();
                if (error.data != undefined) {
                    this.content = error.data;
                }
                hilog.info(0x0001, "onError -> Error", this.content);
            });
        });
        Button.pop();
        //2222222
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('MULTIPLE REQUESTS');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            this.content = "";
            let request1: Request = new Request.Builder()
                .get(this.echoServer)
                .addHeader("Content-Type", "application/json")
                .params("testKey1", "testValue1")
                .params("testKey2", "testValue2")
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
                Log.showInfo("onComplete -> Status : " + this.status);
                Log.showInfo("onComplete -> Content : " + JSON.stringify(this.content));
            }, (error: BusinessError<string>) => {
                this.status = error.code.toString();
                if (error.data != undefined) {
                    this.content = error.data;
                }
                hilog.info(0x0001, "onError -> Error", this.content);
            });
            //POST
            let request2: Request = new Request.Builder()
                .url(this.echoServer)
                .post(RequestBody.create("test123"))
                .addHeader("Content-Type", "application/json")
                .build();
            this.client.newCall(request2).enqueue((result: Response) => {
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
            }, (error: BusinessError<string>) => {
                this.status = error.code.toString();
                if (error.data != undefined) {
                    this.content = error.data;
                }
                hilog.info(0x0001, "onError -> Error", this.content);
            });
            //POST with 2 values
            let request3: Request = new Request.Builder()
                .url(this.echoServer)
                .post(RequestBody.create({
                a: 'a1', b: 'b1'
            }, new Mime.Builder().contentType('application/json', 'charset', 'utf8').build().getMime()))
                .build();
            this.client.newCall(request3).enqueue((result: Response) => {
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
            }, (error: BusinessError<string>) => {
                this.status = error.code.toString();
                if (error.data != undefined) {
                    this.content = error.data;
                }
                hilog.info(0x0001, "onError -> Error", this.content);
            });
            //POST with 3 values
            let formEncoder: FormEncoder = new FormEncoder.Builder()
                .add('key1', 'value1')
                .add('key2', 'value2')
                .add('key3', 'value3')
                .build();
            let feBody: RequestBody = formEncoder.createRequestBody();
            let request4: Request = new Request.Builder()
                .url(this.echoServer)
                .post(feBody)
                .build();
            this.client.newCall(request4).enqueue((result: Response) => {
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
            }, (error: BusinessError<string>) => {
                this.status = error.code.toString();
                if (error.data != undefined) {
                    this.content = error.data;
                }
                hilog.info(0x0001, "onError -> Error", this.content);
            });
            //PUT request
            let request5: Request = new Request.Builder()
                .url(this.echoServer)
                .put(RequestBody.create({
                a: 'a1', b: 'b1'
            }, new Mime.Builder().contentType('application/json', 'charset', 'utf8').build().getMime()))
                .build();
            this.client.newCall(request5).enqueue((result: Response) => {
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
            }, (error: BusinessError<string>) => {
                this.status = error.code.toString();
                if (error.data != undefined) {
                    this.content = error.data;
                }
                hilog.info(0x0001, "onError -> Error", this.content);
            });
            //DELETE request
            let request6: Request = new Request.Builder()
                .url(this.echoServer)
                .delete()
                .build();
            this.client.newCall(request6).enqueue((result: Response) => {
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
            }, (error: BusinessError<string>) => {
                this.status = error.code.toString();
                if (error.data != undefined) {
                    this.content = error.data;
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
        Button.createWithLabel('DNS Interceptor');
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
            let url = "https://www.wanandroid.com/hotkey/json";
            // this.info = DnsResolve.resolveDNSQuery(url);
            //execute useDNSInterceptor after 3000 milliseconds (3 seconds)
            setTimeout(async () => {
                let url = "https://www.wanandroid.com/hotkey/json";
                let CA: string = await new Utils().getCA(this.ca1, this.hereAbilityContext);
                let CA1: string = await new Utils().getCA(this.ca2, this.hereAbilityContext);
                let request: Request = new Request.Builder()
                    .get(url)
                    .ca([CA, CA1])
                    .build();
                client.newCall(request).enqueue((result: Response) => {
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
                }, (error: BusinessError<string>) => {
                    this.status = error.code.toString();
                    if (error.data != undefined) {
                        this.content = error.data;
                    }
                    hilog.info(0x0001, "onError -> Error", this.content);
                });
            }, 3000);
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.padding(10);
        Flex.height('10%');
        Flex.width('100%');
        Button.createWithLabel('OpenCache');
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
                .url('https://reqres.in/api/users/2')
                .build();
            this.CacheClient.newCall(request1).execute().then((result: Response) => {
                console.info("get response data ===> " + JSON.stringify(result.getNetWorkResponse()?.getBody()));
                console.info("get response data cache ===> " + JSON.stringify(result.getCacheResponse()?.getBody()));
                if (result.getNetWorkResponse()) {
                    this.status = "" + result.responseCode;
                }
                else {
                    this.status = "" + result.getCacheResponse().getCode();
                }
                if (result.getNetWorkResponse()) {
                    this.content = result.result;
                }
                else {
                    this.content = result.getCacheResponse().getBody().toString();
                }
            }, (error: BusinessError<string>) => {
                this.content = JSON.stringify(error);
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
    createFileIfNotExist(): boolean {
        let isCreateSuccess: boolean = false;
        try {
            const ctx = this;
            let cacheDir: string = getContext().cacheDir;
            console.log(TAG + "   cacheDir   " + cacheDir);
            ctx.filePath = cacheDir + "/" + 'formtest.txt';
            console.log(TAG + "   filePath   " + ctx.filePath);
            let fd = fs.openSync(ctx.filePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
            fs.truncateSync(fd.fd);
            fs.writeSync(fd.fd, ctx.writeContent);
            fs.fsyncSync(fd.fd);
            fs.closeSync(fd);
            isCreateSuccess = true;
            console.log(TAG + "    writeSync    ");
            console.log(TAG + "   create file success   ");
        }
        catch (e) {
            isCreateSuccess = false;
            hilog.info(0x0001, TAG + "    FileUtils - readFilePic ", e);
        }
        return isCreateSuccess;
    }
    getFileData(): ArrayBuffer {
        const ctx = this;
        try {
            let fd1 = fs.openSync(ctx.filePath, fs.OpenMode.READ_WRITE);
            let length = fs.statSync(ctx.filePath).size;
            let buf = new ArrayBuffer(length);
            fs.readSync(fd1.fd, buf);
            return buf;
        }
        catch (e) {
            hilog.info(0x0001, TAG + "    FileUtils - readFilePic ", e);
            return new ArrayBuffer(0);
        }
    }
}
export class CustomInterceptor implements Interceptor {
    intercept(chain: Chain): Promise<Response> {
        let request: Request = chain.requestI();
        Log.showInfo("request = " + request);
        return chain.proceedI(request).then((response: Response): Promise<Response> => {
            Log.showInfo("response = " + response);
            return Promise.resolve(response);
        });
    }
}
loadDocument(new Core("1", undefined, {}));
