interface sockets_Params {
    msg?: string;
    url?: string;
    chatArr?: Array<User>;
    connectStatus?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "sockets_" + ++__generate__Id;
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
import { HttpClient, RealWebSocket, Request, TimeUnit, WebSocket, WebSocketListener } from '@ohos/httpclient';
import Log from '../model/log';
import hilog from '@ohos.hilog';
import prompt from '@ohos.promptAction';
class MyWebSocketListener extends WebSocketListener {
    status: string;
    chatArr: Array<User> = new Array();
    constructor(status: string, chatArr: Array<User> = new Array()) {
        super();
        this.status = status;
        this.chatArr = chatArr;
    }
    onOpen(webSocket: RealWebSocket, response: string) {
        this.status = "connected";
        Log.showInfo("ws------onOpen");
        isConnect = true;
        prompt.showToast({ message: "connected", duration: 3000 });
    }
    ;
    onMessage(webSocket: RealWebSocket, text: string) {
        Log.showInfo("ws------onMessage");
        this.chatArr.push(new User(0, text));
    }
    ;
    onClosing(webSocket: RealWebSocket, code: number, reason: string) {
        Log.showInfo("ws------onClosing");
        prompt.showToast({ message: "isClosing", duration: 3000 });
    }
    ;
    onClosed(webSocket: RealWebSocket, code: number, reason: string) {
        this.status = "disconnected";
        prompt.showToast({ message: "disconnected", duration: 3000 });
        Log.showInfo("ws------onClosed");
        isConnect = false;
    }
    ;
    onFailure(webSocket: RealWebSocket, e: Error, response?: string) {
        this.status = "disconnected";
        prompt.showToast({ message: "disconnected", duration: 3000 });
        hilog.info(0x0001, "ws------onFailure--", e.message);
        isConnect = false;
    }
    ;
}
let ws: WebSocket;
let isConnect: boolean = false;
class sockets extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__msg = new ObservedPropertySimple("", this, "msg");
        this.__url = new ObservedPropertySimple("ws://192.168.1.81:8990/open/ws/position", this, "url");
        this.__chatArr = new ObservedPropertyObject(new Array(), this, "chatArr");
        this.__connectStatus = new ObservedPropertySimple("disconnect", this, "connectStatus");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: sockets_Params) {
        if (params.msg !== undefined) {
            this.msg = params.msg;
        }
        if (params.url !== undefined) {
            this.url = params.url;
        }
        if (params.chatArr !== undefined) {
            this.chatArr = params.chatArr;
        }
        if (params.connectStatus !== undefined) {
            this.connectStatus = params.connectStatus;
        }
    }
    aboutToBeDeleted() {
        this.__msg.aboutToBeDeleted();
        this.__url.aboutToBeDeleted();
        this.__chatArr.aboutToBeDeleted();
        this.__connectStatus.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __msg: ObservedPropertySimple<string>;
    get msg() {
        return this.__msg.get();
    }
    set msg(newValue: string) {
        this.__msg.set(newValue);
    }
    private __url: ObservedPropertySimple<string>;
    get url() {
        return this.__url.get();
    }
    set url(newValue: string) {
        this.__url.set(newValue);
    }
    private __chatArr: ObservedPropertyObject<Array<User>>;
    get chatArr() {
        return this.__chatArr.get();
    }
    set chatArr(newValue: Array<User>) {
        this.__chatArr.set(newValue);
    }
    private __connectStatus: ObservedPropertySimple<string>;
    get connectStatus() {
        return this.__connectStatus.get();
    }
    set connectStatus(newValue: string) {
        this.__connectStatus.set(newValue);
    }
    render() {
        Stack.create({ alignContent: Alignment.TopStart });
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
        Flex.create({
            direction: FlexDirection.Column
        });
        Flex.width('100%');
        Flex.padding(10);
        List.create({ space: 20, initialIndex: 0 });
        List.listDirection(Axis.Vertical);
        List.divider({ strokeWidth: 2, color: 0xFFFFFF });
        List.edgeEffect(EdgeEffect.None);
        List.chainAnimation(false);
        List.backgroundColor("#ffe2dada");
        ForEach.create("2", this, ObservedObject.GetRawObject(this.chatArr), (item: User) => {
            ListItem.create();
            ListItem.editable(true);
            Text.create(item.getType() == 0 ? "服务器--" + item.getContent() : "客户端--" + item.getContent());
            Text.width('100%');
            Text.fontColor(item.getType() == 0 ? "#ffffff" : "#ff0e46be");
            Text.fontSize("16fp");
            Text.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        TextInput.create({ text: this.url, placeholder: '请输入WebSocket类型的url' });
        TextInput.placeholderColor("#ffffff");
        TextInput.caretColor(Color.Blue);
        TextInput.height("150px");
        TextInput.fontSize("18fp");
        TextInput.onChange((value: string) => {
            this.url = value;
        });
        Button.createWithLabel('connect');
        Button.width('80%');
        Button.height('80px');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            let client: HttpClient = new HttpClient
                .Builder()
                .setConnectTimeout(10, TimeUnit.SECONDS)
                .setReadTimeout(10, TimeUnit.SECONDS)
                .build();
            let request: Request = new Request.Builder()
                .url(this.url)
                .retryConnectionCount(3)
                .params("name", "zhansgan")
                .params("age", 23)
                .build();
            ws = client.newWebSocket(request, new MyWebSocketListener(this.connectStatus, this.chatArr));
        });
        Button.pop();
        TextInput.create({ placeholder: '请输入要发送的消息' });
        TextInput.placeholderColor("#ffffff");
        TextInput.caretColor(Color.Blue);
        TextInput.height("150px");
        TextInput.fontSize("18fp");
        TextInput.onChange((value: string) => {
            this.msg = value;
        });
        Button.createWithLabel('send');
        Button.width('80%');
        Button.height('80px');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            if (!isConnect) {
                prompt.showToast({ message: "websocket disconnect" });
                Log.showInfo("ws------not connect");
                return;
            }
            ws.send(this.msg).then((isSuccess: boolean) => {
                if (isSuccess) {
                    this.chatArr.push(new User(1, this.msg));
                    Log.showInfo("ws------sendMessage--success:");
                }
                else {
                    Log.showInfo("ws------sendMessage--FAIL:");
                }
            });
        });
        Button.pop();
        Button.createWithLabel('close');
        Button.width('80%');
        Button.height('80px');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            if (!isConnect) {
                prompt.showToast({ message: "websocket disconnect" });
                Log.showInfo("ws------not connect");
                return;
            }
            ws.close(1000).then((isSuccess: boolean) => {
                if (isSuccess) {
                    this.connectStatus = "connected";
                    Log.showInfo("ws------close--success:");
                }
                else {
                    Log.showInfo("ws------close--FAIL:");
                }
            });
        });
        Button.pop();
        Flex.pop();
        Column.pop();
        Stack.pop();
    }
}
class User {
    type: number;
    content: string;
    constructor(type: number, content: string) {
        this.type = type;
        this.content = content;
    }
    getType() {
        return this.type;
    }
    getContent() {
        return this.content;
    }
}
loadDocument(new sockets("1", undefined, {}));
