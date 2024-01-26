interface requestGzip_Params {
    status?: string;
    content?: string;
    textInput?: string;
    ipInput?: string;
    portInput?: string;
    scroller?: Scroller;
    client?: HttpClient;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "requestGzip_" + ++__generate__Id;
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
import { HttpClient, Request, RequestBody, TimeUnit, Response } from '@ohos/httpclient';
import { BusinessError } from '@ohos.base';
class requestGzip extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__status = new ObservedPropertySimple('', this, "status");
        this.__content = new ObservedPropertySimple('', this, "content");
        this.textInput = '';
        this.ipInput = '1.94.37.200';
        this.portInput = '7070/gzip';
        this.scroller = new Scroller();
        this.client = new HttpClient
            .Builder()
            .setReadTimeout(10, TimeUnit.SECONDS)
            .setConnectTimeout(10, TimeUnit.SECONDS)
            .build();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: requestGzip_Params) {
        if (params.status !== undefined) {
            this.status = params.status;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.textInput !== undefined) {
            this.textInput = params.textInput;
        }
        if (params.ipInput !== undefined) {
            this.ipInput = params.ipInput;
        }
        if (params.portInput !== undefined) {
            this.portInput = params.portInput;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
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
    private textInput: string;
    private ipInput: string;
    private portInput: string;
    private scroller: Scroller;
    private client: HttpClient;
    render() {
        Column.create();
        Column.padding({ left: 5, right: 5 });
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
        Row.create();
        Row.height(px2vp(150));
        TextInput.create({ text: this.ipInput, placeholder: '输入服务器ip' });
        TextInput.layoutWeight(1);
        TextInput.height('100%');
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.ipInput = value;
        });
        Blank.create();
        Blank.width(px2vp(5));
        Blank.pop();
        TextInput.create({ text: this.portInput, placeholder: '输入服务器端口' });
        TextInput.layoutWeight(1);
        TextInput.height('100%');
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.portInput = value;
        });
        Row.pop();
        Row.create();
        Row.height(px2vp(150));
        Row.margin({ top: 10 });
        TextInput.create({ text: this.textInput, placeholder: 'default' });
        TextInput.layoutWeight(1);
        TextInput.height('100%');
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.textInput = value;
        });
        Row.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('getCompressedData');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(25);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            this.content = 'waiting for response';
            let request: Request = new Request.Builder()
                .url(this.getUrl() + '/getGzipData')
                .get()
                .build();
            this.client.newCall(request).enqueue((result: Response) => {
                if (result) {
                    this.status = '返回状态: ' + result.responseCode.toString();
                }
                if (result.result) {
                    this.content = '返回结果: ' + result.result + '\n';
                    this.content += '响应头: ' + JSON.stringify(result.header);
                }
                else {
                    this.content = '返回结果: ' + JSON.stringify(result);
                }
            }, (error: BusinessError) => {
                this.status = '请求状态: ' + error.code.toString();
                this.content = JSON.stringify(error);
            });
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('postCompressedInputData');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            this.content = 'waiting for response';
            const testStr = 'hello, world! hello HttpClientServer hello httpclientServer!' + this.textInput;
            let requestBody: RequestBody = RequestBody.create(testStr);
            let request: Request = new Request.Builder()
                .url(this.getUrl() + '/compressedRequest')
                .post(requestBody)
                .addHeader('Accept-Encoding', 'gzip')
                .addHeader('Content-Type', 'application/octet-stream')
                .build();
            this.client.newCall(request).enqueue((result: Response) => {
                if (result) {
                    this.status = '返回状态: ' + result.responseCode.toString();
                }
                if (result.result) {
                    this.content = '返回结果: ' + result.result + '\n';
                    this.content += '响应头: ' + JSON.stringify(result.header);
                }
                else {
                    this.content = '返回结果: ' + JSON.stringify(result);
                }
            }, (error: BusinessError) => {
                this.status = '请求状态: ' + error.code.toString();
                this.content = JSON.stringify(error);
            });
        });
        Button.pop();
        Flex.pop();
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.On);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.layoutWeight(1);
        Column.create();
        Column.width('100%');
        Text.create(this.status);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.width('100%');
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Path.create();
        Path.width('100%');
        Path.height(10);
        Path.commands('M0 0 L900 0');
        Path.stroke(Color.Black);
        Path.strokeWidth(3);
        Text.create(this.content);
        Text.fontSize(20);
        Text.width('100%');
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    getUrl() {
        return 'http://' + this.ipInput + ':' + this.portInput;
    }
}
loadDocument(new requestGzip("1", undefined, {}));
