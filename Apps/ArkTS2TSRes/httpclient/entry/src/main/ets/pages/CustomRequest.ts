interface CustomRequest_Params {
    scroller?: Scroller;
    content?: string;
    result?: string;
    Country?: string;
    Isp?: string;
    result_queue?: string;
    property_two_queue?: string;
    property_one_queue?: string;
    client?: HttpClient;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CustomRequest_" + ++__generate__Id;
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
import Author from '../model/author';
import { HttpClient, Request, RequestBody, TimeUnit } from '@ohos/httpclient';
import Weather from '../model/Weather';
import hilog from '@ohos.hilog';
import { BusinessError } from '@ohos.base';
class CustomRequest extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.__content = new ObservedPropertySimple("", this, "content");
        this.__result = new ObservedPropertySimple("请求结果：\r\n", this, "result");
        this.__Country = new ObservedPropertySimple("对象的属性值：\r\n", this, "Country");
        this.__Isp = new ObservedPropertySimple("对象的属性值：\r\n", this, "Isp");
        this.__result_queue = new ObservedPropertySimple("请求结果：\r\n", this, "result_queue");
        this.__property_two_queue = new ObservedPropertySimple("对象的属性值：\r\n", this, "property_two_queue");
        this.__property_one_queue = new ObservedPropertySimple("对象的属性值：\r\n", this, "property_one_queue");
        this.client = new HttpClient
            .Builder()
            .setConnectTimeout(10, TimeUnit.SECONDS)
            .setReadTimeout(10, TimeUnit.SECONDS)
            .build();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomRequest_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.result !== undefined) {
            this.result = params.result;
        }
        if (params.Country !== undefined) {
            this.Country = params.Country;
        }
        if (params.Isp !== undefined) {
            this.Isp = params.Isp;
        }
        if (params.result_queue !== undefined) {
            this.result_queue = params.result_queue;
        }
        if (params.property_two_queue !== undefined) {
            this.property_two_queue = params.property_two_queue;
        }
        if (params.property_one_queue !== undefined) {
            this.property_one_queue = params.property_one_queue;
        }
        if (params.client !== undefined) {
            this.client = params.client;
        }
    }
    aboutToBeDeleted() {
        this.__content.aboutToBeDeleted();
        this.__result.aboutToBeDeleted();
        this.__Country.aboutToBeDeleted();
        this.__Isp.aboutToBeDeleted();
        this.__result_queue.aboutToBeDeleted();
        this.__property_two_queue.aboutToBeDeleted();
        this.__property_one_queue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private __content: ObservedPropertySimple<string>;
    get content() {
        return this.__content.get();
    }
    set content(newValue: string) {
        this.__content.set(newValue);
    }
    private __result: ObservedPropertySimple<string>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: string) {
        this.__result.set(newValue);
    }
    private __Country: ObservedPropertySimple<string>;
    get Country() {
        return this.__Country.get();
    }
    set Country(newValue: string) {
        this.__Country.set(newValue);
    }
    private __Isp: ObservedPropertySimple<string>;
    get Isp() {
        return this.__Isp.get();
    }
    set Isp(newValue: string) {
        this.__Isp.set(newValue);
    }
    private __result_queue: ObservedPropertySimple<string>;
    get result_queue() {
        return this.__result_queue.get();
    }
    set result_queue(newValue: string) {
        this.__result_queue.set(newValue);
    }
    private __property_two_queue: ObservedPropertySimple<string>;
    get property_two_queue() {
        return this.__property_two_queue.get();
    }
    set property_two_queue(newValue: string) {
        this.__property_two_queue.set(newValue);
    }
    private __property_one_queue: ObservedPropertySimple<string>;
    get property_one_queue() {
        return this.__property_one_queue.get();
    }
    set property_one_queue(newValue: string) {
        this.__property_one_queue.set(newValue);
    }
    private client: HttpClient;
    render() {
        Column.create();
        Column.width('100%');
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
        Text.fontSize(10);
        Text.border({
            width: 1
        });
        Text.padding(10);
        Text.fontColor(0x000000);
        Text.borderColor(0x317aff);
        Text.pop();
        Navigator.pop();
        Flex.pop();
        Text.create('得到的是一个自定义的天气对象\r\n');
        Text.fontSize(18);
        Text.fontColor(0xCCCCCC);
        Text.align(Alignment.Center);
        Text.margin(30);
        Text.pop();
        Scroll.create(this.scroller);
        Scroll.layoutWeight(1);
        Scroll.scrollBar(BarState.Off);
        Scroll.scrollable(ScrollDirection.Vertical);
        Column.create();
        Button.createWithLabel('同步自定义请求');
        Button.width('80%');
        Button.height('80px');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(30);
        Button.onClick((event: ClickEvent) => {
            let authorId = "abc7689";
            let userName = "TestUser";
            let emailId = "testmail@gmail.com";
            let password = "password123";
            let author = new Author(authorId, userName, emailId, password);
            let requestBody: RequestBody = RequestBody.create(JSON.stringify(author));
            let request: Request = new Request.Builder()
                .url("http://apis.juhe.cn/simpleWeather/query?city=%E8%8B%8F%E5%B7%9E&key=b01495997ccfd574b61f2976dadd76df")
                .post()
                .body(requestBody)
                .addHeader("Content-Type", "application/json")
                .setEntryObj(new Weather())
                .build();
            this.client.newCall(request)
                .executed()
                .then((result: Response) => {
                this.result = "请求结果:\r\n" + JSON.stringify(result);
                console.log('Custom Request Results 222 == ' + JSON.stringify(result));
                // 调用对象的Isp属性
                this.Country = "对象的属性值：\r\n" + JSON.stringify(result.result.future);
                console.log('Custom Request Object Properties == ' + result.result.future);
                this.Isp = "对象的属性值：\r\n" + result.result.city;
                console.log('Custom Request Object Properties == ' + result.result.city);
            })
                .catch((err: BusinessError<string>) => {
                if (err.message != undefined) {
                    this.content = err.message;
                }
            });
        });
        Button.pop();
        Text.create(this.result);
        Text.width('80%');
        Text.fontSize("18fp");
        Text.margin(20);
        Text.pop();
        Text.create(this.Country);
        Text.width('80%');
        Text.fontSize("18fp");
        Text.margin(10);
        Text.pop();
        Text.create(this.Isp);
        Text.width('80%');
        Text.fontSize("18fp");
        Text.margin(10);
        Text.pop();
        Button.createWithLabel('异步自定义请求');
        Button.width('80%');
        Button.height('80px');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(30);
        Button.onClick((event: ClickEvent) => {
            let authorId = "abc7689";
            let userName = "TestUser";
            let emailId = "testmail@gmail.com";
            let password = "password123";
            let author = new Author(authorId, userName, emailId, password);
            let requestBody: RequestBody = RequestBody.create(JSON.stringify(author));
            let request: Request = new Request.Builder()
                .url("http://apis.juhe.cn/simpleWeather/query?city=%E8%8B%8F%E5%B7%9E&key=b01495997ccfd574b61f2976dadd76df")
                .post()
                .body(requestBody)
                .addHeader("Content-Type", "application/json")
                .setEntryObj(new Weather(), true) //设置自定义请求的实体对象,第二个参数为是否自定义请求（默认不是，false）
                .build();
            this.client.newCall(request)
                .enqueue((result: Response) => {
                console.log('Custom Request Results == ' + JSON.stringify(result));
                this.result_queue = "请求结果:\r\n" + JSON.stringify(result);
                this.property_one_queue = "对象的属性值：\r\n" + JSON.stringify(result.result.future);
                console.log('Custom Request Object Properties == ' + JSON.stringify(result.result.future));
                this.property_two_queue = "对象的属性值：\r\n" + result.result.city;
                console.log('Custom Request Object Properties == ' + result.result.city);
            }, (error: BusinessError) => {
                this.result_queue = "请求结果:\r\n" + JSON.stringify(error);
                hilog.info(0x0001, "Custom Request error == ", JSON.stringify(error));
            });
        });
        Button.pop();
        Text.create(this.result_queue);
        Text.width('80%');
        Text.fontSize("18fp");
        Text.margin(20);
        Text.pop();
        Text.create(this.property_one_queue);
        Text.width('80%');
        Text.fontSize("18fp");
        Text.margin(10);
        Text.pop();
        Text.create(this.property_two_queue);
        Text.width('80%');
        Text.fontSize("18fp");
        Text.margin(10);
        Text.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
interface Response {
    reason: string;
    result: Result;
    error_code: number;
}
interface Result {
    city: string;
    realtime: RealTimeType;
    future: FutureType;
}
interface RealTimeType {
    temperature: string;
    humidity: string;
    info: string;
    wid: string;
    direct: string;
    power: string;
    aqi: string;
}
interface FutureType {
    date: string;
    temperature: string;
    wid: WidType;
    direct: string;
}
interface WidType {
    day: string;
    night: string;
}
loadDocument(new CustomRequest("1", undefined, {}));
