interface authenticator_sample_Params {
    state?: string;
    content?: string;
    count?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "authenticator_sample_" + ++__generate__Id;
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
import { Credentials, HttpClient, NetAuthenticator, Response, Request } from '@ohos/httpclient';
import http from '@ohos.net.http';
import prompt from '@system.prompt';
class authenticator_sample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__state = new ObservedPropertySimple('', this, "state");
        this.__content = new ObservedPropertySimple('', this, "content");
        this.count = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: authenticator_sample_Params) {
        if (params.state !== undefined) {
            this.state = params.state;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.count !== undefined) {
            this.count = params.count;
        }
    }
    aboutToBeDeleted() {
        this.__state.aboutToBeDeleted();
        this.__content.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __state: ObservedPropertySimple<string>;
    get state() {
        return this.__state.get();
    }
    set state(newValue: string) {
        this.__state.set(newValue);
    }
    private __content: ObservedPropertySimple<string>;
    get content() {
        return this.__content.get();
    }
    set content(newValue: string) {
        this.__content.set(newValue);
    }
    private count: number;
    authenticator() {
        prompt.showToast({ message: 'http:authenticator' });
        this.clientServer();
    }
    clientServer() {
        this.state = '请求地址：\nhttps://publicobject.com/secrets/hellosecret.txt';
        this.state += '\n请求状态：正在请求中';
        this.content = '';
        let that = this;
        let credentials: string = Credentials.basic("jesse", "password1");
        let httpRequest = http.createHttp();
        // 用于订阅http响应头，此接口会比request请求先返回。可以根据业务需要订阅此消息
        // 从API 8开始，使用on('headersReceive', Callback)替代on('headerReceive', AsyncCallback)。 8+
        httpRequest.on('headersReceive', (header) => {
            console.info('header1: ' + JSON.stringify(header));
        });
        httpRequest.request(
        // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
        "https://publicobject.com/secrets/hellosecret.txt", {
            method: http.RequestMethod.GET,
            // 开发者根据自身业务需要添加header字段
            header: {
                //'Authorization':credentials,
                "content_type": "application/json"
            },
            connectTimeout: 60000,
            readTimeout: 60000, // 可选，默认为60s
        }, (err, data) => {
            if (!err) {
                // data.result为http响应内容，可根据业务需要进行解析
                console.info('Result2:' + data.result);
                console.info('code2:' + data.responseCode);
                if (data.responseCode == 401) {
                    that.state += '\n请求状态： 401,需要身份认证';
                    that.state += '\n请求状态： 身份认证用户名：jesse，密码：password1';
                    that.state += '\n认证凭证： Authorization:' + credentials;
                    that.state += '\n请求状态： 身份认证开始，重新请求中';
                    let request: Request = new Request.Builder()
                        .get('https://publicobject.com/secrets/hellosecret.txt')
                        .addHeader("Content-Type", "application/json")
                        .build();
                    const myResponse: Response = new Response();
                    myResponse.responseCode = data.responseCode;
                    myResponse.result = data.result.toString();
                    myResponse.header = JSON.stringify(data.header);
                    let requestResult: Request = new NetAuthenticator('jesse', 'password1').authenticate(request, myResponse);
                    console.info('method:' + request.method);
                    console.info('method:headers:' + JSON.stringify(request.headers));
                    setTimeout(() => {
                        that.auth(requestResult);
                    }, 1500);
                }
                console.info('header2:' + JSON.stringify(data.header));
            }
            else {
                console.info('error:' + JSON.stringify(err));
                that.content = JSON.stringify(err);
                httpRequest.destroy();
            }
        });
    }
    auth(requestRes: Request) {
        console.info('requestRes:method:' + JSON.stringify(requestRes.method));
        console.info('requestRes:headers:' + JSON.stringify(requestRes.headers));
        let that = this;
        let credentials: string = Credentials.basic("jesse", "password1");
        let httpRequest = http.createHttp();
        // 用于订阅http响应头，此接口会比request请求先返回。可以根据业务需要订阅此消息
        // 从API 8开始，使用on('headersReceive', Callback)替代on('headerReceive', AsyncCallback)。 8+
        httpRequest.on('headersReceive', (header) => {
            console.info('header1: ' + JSON.stringify(header));
        });
        httpRequest.request(
        // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
        "https://publicobject.com/secrets/hellosecret.txt", {
            method: requestRes.method,
            // 开发者根据自身业务需要添加header字段
            header: requestRes.headers,
            connectTimeout: 60000,
            readTimeout: 60000, // 可选，默认为60s
        }, (err, data) => {
            if (!err) {
                // data.result为http响应内容，可根据业务需要进行解析
                console.info('Result2:' + data.result);
                that.state += '\n请求状态： 身份认证结束，请求成功，内容如下：';
                that.content = data.result + '';
                // data.header为http响应头，可根据业务需要进行解析
                console.info('header2:' + JSON.stringify(data.header));
                console.info('cookies2:' + data.cookies); // 8+
            }
            else {
                console.info('error:' + JSON.stringify(err));
                that.content = JSON.stringify(err);
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest.destroy();
            }
        });
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.margin({
            top: 5,
            bottom: 100
        });
        Column.height('100%');
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
        Button.createWithLabel('身份认证');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            this.authenticator();
        });
        Button.pop();
        Flex.pop();
        Text.create(this.state);
        Text.width('100%');
        Text.fontSize(18);
        Text.fontColor(Color.Black);
        Text.pop();
        Text.create(this.content);
        Text.width('100%');
        Text.layoutWeight(1);
        Text.fontSize(10);
        Text.fontColor(Color.Black);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Column.pop();
    }
}
loadDocument(new authenticator_sample("1", undefined, {}));
