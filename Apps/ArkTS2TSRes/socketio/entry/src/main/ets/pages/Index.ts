interface ChatItemView_Params {
    message?: ESObject;
}
interface Index_Params {
    uri?: string;
    username?: string;
    message?: string;
    connect_finish?: boolean;
    login_finish?: boolean;
    chatDetailData?;
    client?: client_socket;
    scroller?: Scroller;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/**
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * This software is distributed under a license. The full license
 * agreement can be found in the file LICENSE in this distribution.
 * This software may not be copied, modified, sold or distributed
 * other than expressed in the named license agreement.
 *
 * This software is distributed without any warranty.
 */
import { BasicDataSource } from '../common/BasicDataSource';
// import { ServiceMessage, ClientMessage, UserCall } from './MessageInfo';
import prompt from '@ohos.promptAction';
import { client_socket } from '@ohos/socketio';
import router from '@ohos.router';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__uri = new ObservedPropertySimple("", this, "uri");
        this.__username = new ObservedPropertySimple("", this, "username");
        this.__message = new ObservedPropertySimple("", this, "message");
        this.__connect_finish = new ObservedPropertySimple(false, this, "connect_finish");
        this.__login_finish = new ObservedPropertySimple(false, this, "login_finish");
        this.chatDetailData = new ChatDetailData();
        this.client = new client_socket();
        this.scroller = new Scroller();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.uri !== undefined) {
            this.uri = params.uri;
        }
        if (params.username !== undefined) {
            this.username = params.username;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.connect_finish !== undefined) {
            this.connect_finish = params.connect_finish;
        }
        if (params.login_finish !== undefined) {
            this.login_finish = params.login_finish;
        }
        if (params.chatDetailData !== undefined) {
            this.chatDetailData = params.chatDetailData;
        }
        if (params.client !== undefined) {
            this.client = params.client;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    aboutToBeDeleted() {
        this.__uri.aboutToBeDeleted();
        this.__username.aboutToBeDeleted();
        this.__message.aboutToBeDeleted();
        this.__connect_finish.aboutToBeDeleted();
        this.__login_finish.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __uri: ObservedPropertySimple<string>;
    get uri() {
        return this.__uri.get();
    }
    set uri(newValue: string) {
        this.__uri.set(newValue);
    }
    private __username: ObservedPropertySimple<string>;
    get username() {
        return this.__username.get();
    }
    set username(newValue: string) {
        this.__username.set(newValue);
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __connect_finish: ObservedPropertySimple<boolean>;
    get connect_finish() {
        return this.__connect_finish.get();
    }
    set connect_finish(newValue: boolean) {
        this.__connect_finish.set(newValue);
    }
    private __login_finish: ObservedPropertySimple<boolean>;
    get login_finish() {
        return this.__login_finish.get();
    }
    set login_finish(newValue: boolean) {
        this.__login_finish.set(newValue);
    }
    private chatDetailData;
    private client: client_socket;
    private scroller: Scroller;
    on_open(): void {
        console.log("SOCKET_IO_INDEX on_open");
        this.connect_finish = true;
        prompt.showToast({ message: "连接服务器成功" });
    }
    on_fail(): void {
        console.log("SOCKET_IO_INDEX on_fail");
        prompt.showToast({ message: "连接服务器失败" });
    }
    on_reconnecting(): void {
        console.log("SOCKET_IO_INDEX on_reconnecting");
    }
    on_reconnect(): void {
        console.log("SOCKET_IO_INDEX on_reconnect");
    }
    on_close(reason: string): void {
        this.connect_finish = false;
        console.log("SOCKET_IO_INDEX on_close: " + reason);
    }
    on_socket_open(nsp: string): void {
        console.log("SOCKET_IO_INDEX on_socket_open: " + nsp);
    }
    on_socket_close(nsp: string): void {
        console.log("SOCKET_IO_INDEX on_socket_close: " + nsp);
    }
    on_login_listener(event_json: string): void {
        let loginCall: any = JSON.parse(event_json);
        let notice = "Welcome to Socket.IO Chat,there " + (loginCall.numUsers != 1 ? " are " : "\'s ") + loginCall.numUsers + (loginCall.numUsers != 1 ? " participants" : " participant");
        let serviceMessage: any = { message: notice, id: 0 };
        this.pushData(serviceMessage);
    }
    on_new_message_listener(event_json: string): void {
        console.log("SOCKET_IO_INDEX on_new_message_listener: " + event_json);
        let messageCall: any = JSON.parse(event_json);
        let serviceMessage: any = { username: messageCall.username, message: messageCall.message, id: 1 };
        this.pushData(serviceMessage);
    }
    on_user_joined_listener(event_json: string): void {
        console.log("SOCKET_IO_INDEX on_user_joined_listener: " + event_json);
        let userJoinCall: any = JSON.parse(event_json);
        let notice = userJoinCall.username + " joined" + ",there" + (userJoinCall.numUsers != 1 ? " are " : "\'s ") + userJoinCall.numUsers + (userJoinCall.numUsers != 1 ? " participants" : " participant");
        let serviceMessage: any = { message: notice, id: 0 };
        this.pushData(serviceMessage);
    }
    on_user_left_listener(event_json: string): void {
        console.log("SOCKET_IO_INDEX on_user_left_listener: " + event_json);
        let userLeftCall: any = JSON.parse(event_json);
        let notice = userLeftCall.username + " left" + ",there" + (userLeftCall.numUsers != 1 ? "are " : "\'s ") + userLeftCall.numUsers + (userLeftCall.numUsers != 1 ? " participants" : " participant");
        let serviceMessage: any = { message: notice, id: 0 };
        this.pushData(serviceMessage);
    }
    on_emit_callback(emit_callback_json: string): void {
        console.log("SOCKET_IO_INDEX on_emit_callback： " + emit_callback_json);
    }
    pushData(any: any) {
        this.chatDetailData.pushData(any);
        // setTimeout(() => {
        //   this.chatDetailData.pushData(any);
        // }, 10);
    }
    //配置client
    initClient(uri: string) {
        console.log("SOCKET_IO_INDEX initClient");
        this.client.set_open_listener(() => {
            this.on_open();
        });
        this.client.set_fail_listener(() => {
            this.on_fail();
        });
        this.client.set_reconnecting_listener(() => {
            this.on_reconnecting();
        });
        this.client.set_reconnect_listener(() => {
            this.on_reconnect();
        });
        this.client.set_close_listener((reason: string) => {
            this.on_close(reason);
        });
        this.client.set_socket_open_listener((nsp: string) => {
            this.on_socket_open(nsp);
        });
        this.client.set_socket_close_listener((nsp: string) => {
            this.on_socket_close(nsp);
        });
        this.client.connect(uri);
    }
    //配置socket
    initSocket() {
        console.log("SOCKET_IO_INDEX initSocket");
        this.client.on("new message", (event_json: string) => {
            this.on_new_message_listener(event_json);
        });
        this.client.on("user joined", (event_json: string) => {
            this.on_user_joined_listener(event_json);
        });
        this.client.on("user left", (event_json: string) => {
            this.on_user_left_listener(event_json);
        });
        this.client.on("login", (event_json: string) => {
            this.on_login_listener(event_json);
        });
    }
    //登录
    login(username: string) {
        console.log("SOCKET_IO_INDEX login");
        if (!this.connect_finish) {
            prompt.showToast({ message: "暂未连接服务器" });
            return;
        }
        this.client.emit("add user", username);
        this.login_finish = !this.login_finish;
    }
    //发送消息
    sendMessage(message: string) {
        console.log("SOCKET_IO_INDEX sendMessage");
        if (!this.connect_finish) {
            console.log("SOCKET_IO_INDEX 暂未连接服务器");
            return;
        }
        this.client.emit("new message", message, this.on_emit_callback);
    }
    //退出连接
    close() {
        console.log("SOCKET_IO_INDEX close");
        if (!this.connect_finish) {
            console.log("SOCKET_IO_INDEX 暂未连接服务器");
            return;
        }
        console.log("SOCKET_IO_INDEX close start 1");
        this.client.socket_close();
        console.log("SOCKET_IO_INDEX close start 2");
        this.client.close();
        console.log("SOCKET_IO_INDEX close stop");
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        If.create();
        if (this.login_finish) {
            If.branchId(0);
            List.create({ scroller: this.scroller });
            List.listDirection(Axis.Vertical);
            List.divider({ strokeWidth: 2, color: "#f3f3f3" });
            List.height('80%');
            List.width('100%');
            LazyForEach.create("3", this, ObservedObject.GetRawObject(this.chatDetailData), (message: any) => {
                this.isRenderingInProgress = true;
                ListItem.create();
                let earlierCreatedChild_2: ChatItemView = (this && this.findChildById) ? this.findChildById("2") as ChatItemView : undefined;
                if (earlierCreatedChild_2 == undefined) {
                    View.create(new ChatItemView("2", this, { message: message }));
                }
                else {
                    earlierCreatedChild_2.updateWithValueParams({
                        message: message
                    });
                    if (!earlierCreatedChild_2.needsUpdate()) {
                        earlierCreatedChild_2.markStatic();
                    }
                    View.create(earlierCreatedChild_2);
                }
                ListItem.pop();
                this.isRenderingInProgress = false;
            });
            LazyForEach.pop();
            List.pop();
            Row.create();
            Row.height('10%');
            Row.width('100%');
            TextInput.create({ placeholder: "请输入消息,退出聊天室请输入exit", text: this.message });
            TextInput.width('80%');
            TextInput.onChange((message) => {
                this.message = message;
            });
            Button.createWithLabel('Send');
            Button.onClick(() => {
                if (this.message == "exit") {
                    this.close();
                    this.login_finish = false;
                }
                else if (this.message == "") {
                    prompt.showToast({ message: "请输入消息" });
                }
                else {
                    this.sendMessage(this.message);
                    let clientMessage: any = { username: this.username, message: this.message, id: 2 };
                    this.pushData(clientMessage);
                    this.message = "";
                }
            });
            Button.width('20%');
            Button.pop();
            Row.pop();
        }
        else {
            If.branchId(1);
            TextInput.create({ placeholder: "请输入socket.io服务端地址", text: this.uri });
            TextInput.onChange((uri) => {
                this.uri = uri;
            });
            Button.createWithLabel('Connect');
            Button.margin(20);
            Button.onClick(() => {
                this.initClient(this.uri);
                this.initSocket();
            });
            Button.pop();
            TextInput.create({ placeholder: "请输入用户名" });
            TextInput.onChange((username) => {
                this.username = username;
            });
            Button.createWithLabel('Login');
            Button.margin(20);
            Button.onClick(() => {
                this.login(this.username);
            });
            Button.pop();
        }
        If.pop();
        Column.pop();
        Row.pop();
    }
}
class ChatItemView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.message = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ChatItemView_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private message: any;
    render() {
        Column.create();
        If.create();
        if (this.message.id == 0) {
            If.branchId(0);
            Row.create();
            Row.width("100%");
            Row.justifyContent(FlexAlign.Center);
            Row.margin({ top: 15 });
            Text.create(this.message.message);
            Text.pop();
            Row.pop();
        }
        else if (this.message.id == 1) {
            If.branchId(1);
            // 聊天页面对方的消息
            Row.create();
            // 聊天页面对方的消息
            Row.width("100%");
            // 聊天页面对方的消息
            Row.alignItems(VerticalAlign.Top);
            // 聊天页面对方的消息
            Row.margin({ top: 15 });
            // 聊天页面对方的消息
            Row.padding({ right: 50 });
            Text.create(this.message.username + ":" + this.message.message);
            Text.pop();
            // 聊天页面对方的消息
            Row.pop();
        }
        else {
            If.branchId(2);
            // 聊天页面本人消息
            Row.create();
            // 聊天页面本人消息
            Row.alignItems(VerticalAlign.Top);
            // 聊天页面本人消息
            Row.width("100%");
            // 聊天页面本人消息
            Row.direction(Direction.Rtl);
            // 聊天页面本人消息
            Row.padding({ left: 50 });
            // 聊天页面本人消息
            Row.margin({ top: 15 });
            Text.create(this.message.username + ":" + this.message.message);
            Text.pop();
            // 聊天页面本人消息
            Row.pop();
        }
        If.pop();
        Column.pop();
    }
}
class ChatDetailData extends BasicDataSource {
    private msgList: Array<any> = [];
    public totalCount(): number {
        return this.msgList.length;
    }
    public getData(index: number): number {
        return this.msgList[index];
    }
    public addData(index: number, data: any): void {
        this.msgList.splice(index, 0, data);
        this.notifyDataAdd(index);
    }
    public pushData(data: any): void {
        this.msgList.push(data);
        this.notifyDataAdd(this.msgList.length - 1);
    }
}
loadDocument(new Index("1", undefined, {}));
