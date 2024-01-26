interface Chats_Params {
    numberOfPeople?: number;
    message?: string;
    chats?: WebSocketSource;
    isConnect?: boolean;
    ipAddress?: string;
    controller?: CustomDialogController;
}
interface BindCustomDialog_Params {
    ipAddress?: string;
    controller?: CustomDialogController;
    onBind?: (ipAddress: string) => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Chats_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import promptAction from '@ohos.promptAction';
import webSocket from '@ohos.net.webSocket';
import Logger from '../model/Logger';
import TopBar from '../common/TopBar';
import ChatData from '../model/ChatData';
import ChatsPage from '../common/ChatsPage';
import SendMessage from '../common/SendMessage';
import BindServiceIP from '../common/BindServiceIp';
import { WebSocketSource } from '../model/DataSource';
const TAG: string = '[Chats]';
let socket: webSocket.WebSocket = webSocket.createWebSocket();
class BindCustomDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__ipAddress = new ObservedPropertySimple('', this, "ipAddress");
        this.controller = undefined;
        this.onBind = (ipAddress: string) => {
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BindCustomDialog_Params) {
        if (params.ipAddress !== undefined) {
            this.ipAddress = params.ipAddress;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.onBind !== undefined) {
            this.onBind = params.onBind;
        }
    }
    aboutToBeDeleted() {
        this.__ipAddress.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __ipAddress: ObservedPropertySimple<string>;
    get ipAddress() {
        return this.__ipAddress.get();
    }
    set ipAddress(newValue: string) {
        this.__ipAddress.set(newValue);
    }
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private onBind: (ipAddress: string) => void;
    render() {
        Column.create();
        Column.width('100%');
        Column.margin({ bottom: 20 });
        let earlierCreatedChild_2: BindServiceIP = (this && this.findChildById) ? this.findChildById("2") as BindServiceIP : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new BindServiceIP("2", this, { ipAddress: this.__ipAddress, onBind: () => {
                    this.onBind(this.ipAddress);
                } }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                onBind: () => {
                    this.onBind(this.ipAddress);
                }
            });
            View.create(earlierCreatedChild_2);
        }
        Column.pop();
    }
}
class Chats extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__numberOfPeople = new ObservedPropertySimple(1, this, "numberOfPeople");
        this.__message = new ObservedPropertySimple('', this, "message");
        this.__chats = new ObservedPropertyObject(new WebSocketSource([]), this, "chats");
        this.__isConnect = new ObservedPropertySimple(false, this, "isConnect");
        this.__ipAddress = new ObservedPropertySimple('', this, "ipAddress");
        this.controller = new CustomDialogController({
            builder: () => {
                let jsDialog = new BindCustomDialog("6", this, { onBind: (ipAddress: string): void => this.onBind(ipAddress) });
                jsDialog.setController(this.controller);
                View.create(jsDialog);
            },
            autoCancel: false
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Chats_Params) {
        if (params.numberOfPeople !== undefined) {
            this.numberOfPeople = params.numberOfPeople;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.chats !== undefined) {
            this.chats = params.chats;
        }
        if (params.isConnect !== undefined) {
            this.isConnect = params.isConnect;
        }
        if (params.ipAddress !== undefined) {
            this.ipAddress = params.ipAddress;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__numberOfPeople.aboutToBeDeleted();
        this.__message.aboutToBeDeleted();
        this.__chats.aboutToBeDeleted();
        this.__isConnect.aboutToBeDeleted();
        this.__ipAddress.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __numberOfPeople: ObservedPropertySimple<number>;
    get numberOfPeople() {
        return this.__numberOfPeople.get();
    }
    set numberOfPeople(newValue: number) {
        this.__numberOfPeople.set(newValue);
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __chats: ObservedPropertyObject<WebSocketSource>;
    get chats() {
        return this.__chats.get();
    }
    set chats(newValue: WebSocketSource) {
        this.__chats.set(newValue);
    }
    private __isConnect: ObservedPropertySimple<boolean>;
    get isConnect() {
        return this.__isConnect.get();
    }
    set isConnect(newValue: boolean) {
        this.__isConnect.set(newValue);
    }
    private __ipAddress: ObservedPropertySimple<string>;
    get ipAddress() {
        return this.__ipAddress.get();
    }
    set ipAddress(newValue: string) {
        this.__ipAddress.set(newValue);
    }
    private controller: CustomDialogController;
    aboutToAppear() {
        this.controller.open();
    }
    onBind(ipAddress: string) {
        this.ipAddress = ipAddress;
        this.controller.close();
    }
    onConnect() {
        let promise = socket.connect(this.ipAddress);
        Logger.info(TAG, `ipAddress:${JSON.stringify(this.ipAddress)}`);
        promise.then(() => {
            Logger.info(TAG, `connect success`);
        }).catch((err: Error) => {
            Logger.info(TAG, `connect fail, error:${JSON.stringify(err)}`);
        });
        socket.on('open', () => {
            // 当收到on('open')事件时，可以通过send()方法与服务器进行通信
            promptAction.showToast({ message: '连接成功,可以聊天了！', duration: 1500 });
        });
        socket.on('message', (err: Error, value: Object) => {
            Logger.info(TAG, `on message, value = ${value}`);
            let receiveMessage = new ChatData(JSON.stringify(value), true);
            this.chats.pushData(receiveMessage);
        });
    }
    disConnect() {
        socket.off('open', (err, value) => {
            let val: Record<string, Object> = value as Record<string, Object>;
            Logger.info(TAG, `on open, status:${val['status']}, message:${val['message']}`);
        });
        socket.off('message');
        promptAction.showToast({ message: '连接已断开！', duration: 1500 });
        socket.close();
    }
    sendMessage() {
        let sendMessage = new ChatData(this.message, false);
        this.chats.pushData(sendMessage);
        let sendResult = socket.send(this.message);
        sendResult.then(() => {
            Logger.info(TAG, `[send]send success:${this.message}`);
        }).catch((err: Error) => {
            Logger.info(TAG, `[send]send fail, err:${JSON.stringify(err)}`);
        });
        this.message = '';
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Text.create($r('app.string.EntryAbility_label'));
        Text.height(50);
        Text.fontSize(25);
        Text.width('100%');
        Text.padding({ left: 10 });
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Start);
        Text.backgroundColor('#0D9FFB');
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        let earlierCreatedChild_3: TopBar = (this && this.findChildById) ? this.findChildById("3") as TopBar : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new TopBar("3", this, { isConnect: this.__isConnect, connect: () => {
                    this.isConnect = !this.isConnect;
                    if (this.isConnect) {
                        this.onConnect();
                    }
                    else {
                        this.disConnect();
                    }
                } }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                connect: () => {
                    this.isConnect = !this.isConnect;
                    if (this.isConnect) {
                        this.onConnect();
                    }
                    else {
                        this.disConnect();
                    }
                }
            });
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: ChatsPage = (this && this.findChildById) ? this.findChildById("4") as ChatsPage : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new ChatsPage("4", this, { chats: this.__chats }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({});
            View.create(earlierCreatedChild_4);
        }
        let earlierCreatedChild_5: SendMessage = (this && this.findChildById) ? this.findChildById("5") as SendMessage : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new SendMessage("5", this, { message: this.__message, sendMessage: () => {
                    this.sendMessage();
                } }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                sendMessage: () => {
                    this.sendMessage();
                }
            });
            View.create(earlierCreatedChild_5);
        }
        Column.pop();
    }
}
loadDocument(new Chats("1", undefined, {}));
