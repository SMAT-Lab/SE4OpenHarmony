interface ProxyDemo_Params {
    info?: string;
    msg?: string;
    status?: string;
    content?: string;
    ipInput?: string;
    portInput?: number;
    URLPath?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Proxy_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { HttpClient, Request, Response, TimeUnit, Proxy, Type } from '@ohos/httpclient';
class ProxyDemo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__info = new ObservedPropertySimple('', this, "info");
        this.__msg = new ObservedPropertySimple("", this, "msg");
        this.__status = new ObservedPropertySimple("", this, "status");
        this.__content = new ObservedPropertySimple("", this, "content");
        this.ipInput = '1.94.37.200';
        this.portInput = 6443;
        this.__URLPath = new ObservedPropertySimple('http://publicobject.com/helloworld.txt', this, "URLPath");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ProxyDemo_Params) {
        if (params.info !== undefined) {
            this.info = params.info;
        }
        if (params.msg !== undefined) {
            this.msg = params.msg;
        }
        if (params.status !== undefined) {
            this.status = params.status;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.ipInput !== undefined) {
            this.ipInput = params.ipInput;
        }
        if (params.portInput !== undefined) {
            this.portInput = params.portInput;
        }
        if (params.URLPath !== undefined) {
            this.URLPath = params.URLPath;
        }
    }
    aboutToBeDeleted() {
        this.__info.aboutToBeDeleted();
        this.__msg.aboutToBeDeleted();
        this.__status.aboutToBeDeleted();
        this.__content.aboutToBeDeleted();
        this.__URLPath.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __info: ObservedPropertySimple<string>;
    get info() {
        return this.__info.get();
    }
    set info(newValue: string) {
        this.__info.set(newValue);
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
    private ipInput: string;
    private portInput: number;
    private __URLPath: ObservedPropertySimple<string>;
    get URLPath() {
        return this.__URLPath.get();
    }
    set URLPath(newValue: string) {
        this.__URLPath.set(newValue);
    }
    aboutToAppear(): void {
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
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
        Text.create('代理服务器ip');
        Text.fontSize(14);
        Text.padding(10);
        Text.width('90%');
        Text.fontColor(0x000000);
        Text.pop();
        TextInput.create({ text: this.ipInput, placeholder: '输入服务器ip' });
        TextInput.width('90%');
        TextInput.height('40');
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.ipInput = value;
        });
        Text.create('代理服务器端口');
        Text.fontSize(14);
        Text.padding(10);
        Text.width('90%');
        Text.fontColor(0x000000);
        Text.pop();
        TextInput.create({ text: this.portInput.toString(), placeholder: '输入服务器端口' });
        TextInput.width('90%');
        TextInput.height('40');
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.ipInput = value;
        });
        Text.create('请求网址');
        Text.fontSize(14);
        Text.padding(10);
        Text.width('90%');
        Text.fontColor(0x000000);
        Text.pop();
        TextInput.create({ text: this.URLPath, placeholder: '输入服务器端口' });
        TextInput.width('90%');
        TextInput.height('40');
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.URLPath = value;
        });
        Button.createWithLabel('请求网络');
        Button.width('80%');
        Button.height('40');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick(() => {
            this.setProxy();
        });
        Button.pop();
        Text.create(this.info);
        Text.fontSize(18);
        Text.width('85%');
        Text.height('25%');
        Text.border({ width: 2, color: Color.Black });
        Text.margin(10);
        Text.pop();
        Column.pop();
    }
    setProxy() {
        //创建代理
        let client: HttpClient = new HttpClient
            .Builder()
            .setProxy(new Proxy(Type.HTTP, '1.94.37.200', 6443))
            .setConnectTimeout(10, TimeUnit.SECONDS)
            .setReadTimeout(10, TimeUnit.SECONDS)
            .build();
        let request: Request = new Request.Builder()
            .url('http://publicobject.com/helloworld.txt')
            .method('GET')
            .build();
        client.newCall(request).enqueue((result: Response) => {
            this.info = "返回值值：" + result.responseCode.toString();
        }, (err: any) => {
            this.info = JSON.stringify(err);
            console.info('err ========' + JSON.stringify(err));
        });
    }
}
loadDocument(new ProxyDemo("1", undefined, {}));
