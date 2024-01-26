interface EventListeners_Params {
    scroller?: Scroller | undefined;
    status?: string | undefined;
    content?: string | undefined;
    url?: string | undefined;
    // @State url: string = '1.94.37.200:7070';
    eventListener?: EventListener | undefined;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "eventListener_" + ++__generate__Id;
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
import { HttpClient, Request, Response, BusinessError, IOException, EventListener, HttpCall, RequestBody } from '@ohos/httpclient';
import { Logger } from '@ohos/httpclient';
class EventListeners extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.__status = new ObservedPropertyObject('', this, "status");
        this.__content = new ObservedPropertyObject('init', this, "content");
        this.__url = new ObservedPropertyObject('jsonplaceholder.typicode.com/posts', this, "url");
        this.eventListener = new HttpEventListener();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: EventListeners_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.status !== undefined) {
            this.status = params.status;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.url !== undefined) {
            this.url = params.url;
        }
        if (params.eventListener !== undefined) {
            this.eventListener = params.eventListener;
        }
    }
    aboutToBeDeleted() {
        this.__status.aboutToBeDeleted();
        this.__content.aboutToBeDeleted();
        this.__url.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller | undefined;
    private __status: ObservedPropertyObject<string | undefined>;
    get status() {
        return this.__status.get();
    }
    set status(newValue: string | undefined) {
        this.__status.set(newValue);
    }
    private __content: ObservedPropertyObject<string | undefined>;
    get content() {
        return this.__content.get();
    }
    set content(newValue: string | undefined) {
        this.__content.set(newValue);
    }
    private __url: ObservedPropertyObject<string | undefined>;
    get url() {
        return this.__url.get();
    }
    set url(newValue: string | undefined) {
        this.__url.set(newValue);
    }
    // @State url: string = '1.94.37.200:7070';
    private eventListener: EventListener | undefined;
    defaultClientListenerGet() {
        let client: HttpClient | undefined = new HttpClient.Builder()
            .addEventListener(this.eventListener)
            .build();
        let request: Request | undefined = new Request.Builder()
            .get(this.getUrl())
            .build();
        client.newCall(request).execute().then((result) => {
            Logger.info('result >>>>>' + JSON.stringify(result));
            if (result) {
                this.status = result.responseCode.toString();
            }
            if (result.result) {
                this.content = JSON.stringify(result.result);
            }
            else {
                this.content = JSON.stringify(result);
            }
            client = undefined;
            request = undefined;
        }).catch((error: BusinessError) => {
            this.status = error.code.toString();
            client = undefined;
            request = undefined;
        });
    }
    defaultClientListenerPost() {
        let client: HttpClient | undefined = new HttpClient.Builder()
            .addEventListener(this.eventListener)
            .build();
        let request: Request | undefined = new Request.Builder()
            .url(this.getUrl())
            .post(RequestBody.create({ 'name': 'Hello Kitty', 'status': 'sold' }))
            .build();
        client.newCall(request).execute().then((result) => {
            Logger.info('result >>>>>' + JSON.stringify(result));
            if (result) {
                this.status = result.responseCode.toString();
            }
            if (result.result) {
                this.content = JSON.stringify(result.result);
            }
            else {
                this.content = JSON.stringify(result);
            }
            client = undefined;
            request = undefined;
        }).catch((error: BusinessError) => {
            this.status = error.code.toString();
            client = undefined;
            request = undefined;
        });
    }
    aboutToDisappear(): void {
        this.scroller = undefined;
        this.status = undefined;
        this.content = undefined;
        this.url = undefined;
        this.eventListener = undefined;
    }
    getUrl() {
        return 'http://' + this.url;
    }
    render() {
        Column.create();
        Column.justifyContent(FlexAlign.Start);
        Column.width('100%');
        Column.height('100%');
        TextInput.create({ text: this.url, placeholder: 'url地址' });
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            if (!value)
                return;
            this.url = value;
        });
        Button.createWithLabel('自定义EventListener + get');
        Button.width('80%');
        Button.height(50);
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick(() => {
            this.defaultClientListenerGet();
        });
        Button.pop();
        Button.createWithLabel('自定义EventListener + post');
        Button.width('80%');
        Button.height(50);
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick(() => {
            this.defaultClientListenerPost();
        });
        Button.pop();
        Button.createWithLabel('清空');
        Button.width('50%');
        Button.height(50);
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick(() => {
            this.content = '';
            this.status = '';
        });
        Button.pop();
        Text.create('响应状态：' + this.status);
        Text.fontSize(20);
        Text.pop();
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.scrollBarWidth(10);
        Scroll.edgeEffect(EdgeEffect.None);
        Text.create('响应数据：' + this.content);
        Text.fontSize(20);
        Text.pop();
        Scroll.pop();
        Column.pop();
    }
}
class HttpEventListener extends EventListener {
    protected startTime: number = 0;
    logWithTime(message: string) {
        const nosTime: number = new Date().getTime();
        if (message == 'callStart') {
            this.startTime = nosTime;
        }
        const elapsedTime: number = (nosTime - this.startTime) / 1000;
        Logger.info('自定义EventListener' + elapsedTime + ' ' + message);
    }
    callStart(call: HttpCall) {
        this.logWithTime('callStart');
    }
    ;
    dnsStart(call: HttpCall, domainName: string) {
        this.logWithTime('dnsStart');
    }
    ;
    dnsEnd(call: HttpCall, domainName: string, inetAddressList: [
    ]) {
        this.logWithTime('dnsEnd');
    }
    ;
    connectStart(call: HttpCall) {
        this.logWithTime('connectStart');
    }
    ;
    secureConnectStart(call: HttpCall) {
        this.logWithTime('secureConnectStart');
    }
    ;
    secureConnectEnd(call: HttpCall) {
        this.logWithTime('secureConnectEnd');
    }
    ;
    connectEnd(call: HttpCall) {
        this.logWithTime('connectEnd');
    }
    ;
    connectFailed(call: HttpCall) {
        this.logWithTime('connectFailed');
    }
    connectionAcquired(call: HttpCall) {
        this.logWithTime('connectionAcquired');
    }
    connectionReleased(call: HttpCall) {
        this.logWithTime('connectionReleased');
    }
    requestHeadersStart(call: HttpCall) {
        this.logWithTime('requestHeadersStart');
    }
    requestHeadersEnd(call: HttpCall, request: Request) {
        this.logWithTime('requestHeadersEnd');
    }
    requestBodyStart(call: HttpCall) {
        this.logWithTime('requestBodyStart');
    }
    requestBodyEnd(call: HttpCall, request: Request) {
        this.logWithTime('requestBodyEnd');
    }
    requestFailed(call: HttpCall, ioe: IOException) {
        this.logWithTime('requestFailed' + JSON.stringify(ioe));
    }
    responseHeadersStart(call: HttpCall) {
        this.logWithTime('responseHeadersStart');
    }
    responseHeadersEnd(call: HttpCall, response: Response) {
        this.logWithTime('responseHeadersEnd');
    }
    responseBodyStart(call: HttpCall) {
        this.logWithTime('responseBodyStart');
    }
    responseBodyEnd(call: HttpCall, response: Response) {
        this.logWithTime('responseBodyEnd');
    }
    responseFailed(call: HttpCall, ioe: IOException) {
        this.logWithTime('responseFailed' + JSON.stringify(ioe));
    }
    callEnd(call: HttpCall) {
        this.logWithTime('callEnd');
    }
    callFailed(call: HttpCall, ioe: IOException) {
        this.logWithTime('callFailed' + JSON.stringify(ioe));
    }
}
loadDocument(new EventListeners("1", undefined, {}));
