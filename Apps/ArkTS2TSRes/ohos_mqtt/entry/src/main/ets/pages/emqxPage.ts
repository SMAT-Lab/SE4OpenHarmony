interface EmqxPage_Params {
    arr?: string[];
    mqttAsyncClient?: MqttClient | null;
    scroller?: Scroller;
    topic?: string;
    payload?: string;
    url?: string;
    clientId?: string;
    userName?: string;
    password?: string;
    connectedCount?: number;
    isConnect?: boolean;
    isPromise?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "emqxPage_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the  Eclipse Public License -v 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.eclipse.org/legal/epl-2.0/
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { MqttAsync, MqttClientOptions, MqttConnectOptions, MqttSubscribeOptions, MqttPublishOptions, MqttResponse, MqttMessage, MqttClient, MqttQos, MqttPersistenceType } from '@ohos/mqtt';
import LogUtil from './utils/LogUtil';
import TimeUtil from './utils/TimeUtil';
const TAG = 'mqttasync';
class EmqxPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__arr = new ObservedPropertyObject([], this, "arr");
        this.mqttAsyncClient = null;
        this.scroller = new Scroller();
        this.__topic = new ObservedPropertySimple('', this, "topic");
        this.__payload = new ObservedPropertySimple('', this, "payload");
        this.__url = new ObservedPropertySimple('', this, "url");
        this.__clientId = new ObservedPropertySimple('', this, "clientId");
        this.__userName = new ObservedPropertySimple("", this, "userName");
        this.__password = new ObservedPropertySimple("", this, "password");
        this.__connectedCount = new ObservedPropertySimple(0, this, "connectedCount");
        this.__isConnect = new ObservedPropertySimple(false, this, "isConnect");
        this.__isPromise = new ObservedPropertySimple(false, this, "isPromise");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: EmqxPage_Params) {
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.mqttAsyncClient !== undefined) {
            this.mqttAsyncClient = params.mqttAsyncClient;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.topic !== undefined) {
            this.topic = params.topic;
        }
        if (params.payload !== undefined) {
            this.payload = params.payload;
        }
        if (params.url !== undefined) {
            this.url = params.url;
        }
        if (params.clientId !== undefined) {
            this.clientId = params.clientId;
        }
        if (params.userName !== undefined) {
            this.userName = params.userName;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.connectedCount !== undefined) {
            this.connectedCount = params.connectedCount;
        }
        if (params.isConnect !== undefined) {
            this.isConnect = params.isConnect;
        }
        if (params.isPromise !== undefined) {
            this.isPromise = params.isPromise;
        }
    }
    aboutToBeDeleted() {
        this.__arr.aboutToBeDeleted();
        this.__topic.aboutToBeDeleted();
        this.__payload.aboutToBeDeleted();
        this.__url.aboutToBeDeleted();
        this.__clientId.aboutToBeDeleted();
        this.__userName.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__connectedCount.aboutToBeDeleted();
        this.__isConnect.aboutToBeDeleted();
        this.__isPromise.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __arr: ObservedPropertyObject<string[]>;
    get arr() {
        return this.__arr.get();
    }
    set arr(newValue: string[]) {
        this.__arr.set(newValue);
    }
    private mqttAsyncClient: MqttClient | null;
    private scroller: Scroller;
    //  Set Client Configuration
    private __topic: ObservedPropertySimple<string>;
    get topic() {
        return this.__topic.get();
    }
    set topic(newValue: string) {
        this.__topic.set(newValue);
    }
    private __payload: ObservedPropertySimple<string>;
    get payload() {
        return this.__payload.get();
    }
    set payload(newValue: string) {
        this.__payload.set(newValue);
    }
    private __url: ObservedPropertySimple<string>;
    get url() {
        return this.__url.get();
    }
    set url(newValue: string) {
        this.__url.set(newValue);
    }
    private __clientId: ObservedPropertySimple<string>;
    get clientId() {
        return this.__clientId.get();
    }
    set clientId(newValue: string) {
        this.__clientId.set(newValue);
    }
    private __userName: ObservedPropertySimple<string>;
    get userName() {
        return this.__userName.get();
    }
    set userName(newValue: string) {
        this.__userName.set(newValue);
    }
    private __password: ObservedPropertySimple<string>;
    get password() {
        return this.__password.get();
    }
    set password(newValue: string) {
        this.__password.set(newValue);
    }
    private __connectedCount: ObservedPropertySimple<number>;
    get connectedCount() {
        return this.__connectedCount.get();
    }
    set connectedCount(newValue: number) {
        this.__connectedCount.set(newValue);
    }
    private __isConnect: ObservedPropertySimple<boolean>;
    get isConnect() {
        return this.__isConnect.get();
    }
    set isConnect(newValue: boolean) {
        this.__isConnect.set(newValue);
    }
    private __isPromise: ObservedPropertySimple<boolean>;
    get isPromise() {
        return this.__isPromise.get();
    }
    set isPromise(newValue: boolean) {
        this.__isPromise.set(newValue);
    }
    render() {
        Column.create();
        Column.width("100%");
        Column.height("100%");
        Text.create($r('app.string.entry_MainAbility'));
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.margin(10);
        Text.pop();
        Flex.create({ direction: FlexDirection.Row, justifyContent: FlexAlign.SpaceBetween });
        Flex.margin(10);
        Button.createWithChild();
        Button.backgroundColor($r("app.color.blue_1677ff"));
        Button.width("100%");
        Button.margin({ right: 8 });
        Button.onClick(() => {
            this.setIsPromise(this.isPromise);
        });
        Text.create('使用promise接口');
        Text.fontSize($r("app.float.font_20"));
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor($r("app.color.white"));
        Text.maxLines(1);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, justifyContent: FlexAlign.SpaceBetween });
        Flex.margin(10);
        Button.createWithChild();
        Button.backgroundColor($r("app.color.blue_1677ff"));
        Button.width("100%");
        Button.margin({ right: 8 });
        Button.onClick(() => {
            this.createClient();
        });
        Text.create('CreateClient');
        Text.fontSize($r("app.float.font_20"));
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor($r("app.color.white"));
        Text.maxLines(1);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.backgroundColor($r("app.color.blue_1677ff"));
        Button.width("100%");
        Button.onClick(() => {
            this.connect();
        });
        Text.create('Connect');
        Text.fontSize($r("app.float.font_20"));
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor($r("app.color.white"));
        Text.maxLines(1);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, justifyContent: FlexAlign.SpaceAround });
        Flex.margin(10);
        Button.createWithChild();
        Button.backgroundColor($r("app.color.blue_1677ff"));
        Button.width("100%");
        Button.margin({ right: 8 });
        Button.onClick(() => {
            this.subscribe();
        });
        Text.create('Subscribe');
        Text.fontSize($r("app.float.font_20"));
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor($r("app.color.white"));
        Text.maxLines(1);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.backgroundColor($r("app.color.blue_1677ff"));
        Button.width("100%");
        Button.onClick(() => {
            this.publish();
        });
        Text.create('Publish');
        Text.fontSize($r("app.float.font_20"));
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor($r("app.color.white"));
        Text.maxLines(1);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, justifyContent: FlexAlign.SpaceAround });
        Flex.margin(10);
        Button.createWithChild();
        Button.backgroundColor($r("app.color.blue_1677ff"));
        Button.width("100%");
        Button.margin({ right: 8 });
        Button.onClick(() => {
            this.messageArrived();
        });
        Text.create('MessageArrived');
        Text.fontSize($r("app.float.font_20"));
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor($r("app.color.white"));
        Text.maxLines(1);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.backgroundColor($r("app.color.blue_1677ff"));
        Button.width("100%");
        Button.onClick(() => {
            this.unsubscribe();
        });
        Text.create('Unsubscribe');
        Text.fontSize($r("app.float.font_20"));
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor($r("app.color.white"));
        Text.maxLines(1);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, justifyContent: FlexAlign.SpaceAround });
        Flex.margin(10);
        Button.createWithChild();
        Button.backgroundColor($r("app.color.blue_1677ff"));
        Button.width("100%");
        Button.margin({ right: 8 });
        Button.onClick(() => {
            this.disconnect();
        });
        Text.create('Disconnect');
        Text.fontSize($r("app.float.font_20"));
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor($r("app.color.white"));
        Text.maxLines(1);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.backgroundColor($r("app.color.blue_1677ff"));
        Button.width("100%");
        Button.onClick(() => {
            this.destroy();
        });
        Text.create('Destroy');
        Text.fontSize($r("app.float.font_20"));
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor($r("app.color.white"));
        Text.maxLines(1);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, justifyContent: FlexAlign.SpaceAround });
        Flex.margin(10);
        Button.createWithChild();
        Button.backgroundColor($r("app.color.blue_1677ff"));
        Button.width("100%");
        Button.margin({ right: 8 });
        Button.onClick(() => {
            if (!this.mqttAsyncClient) {
                this.showLog("client is not created");
                return;
            }
            this.isConnected();
        });
        Text.create('IsConnected');
        Text.fontSize($r("app.float.font_20"));
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor($r("app.color.white"));
        Text.width("100%");
        Text.maxLines(1);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.backgroundColor($r("app.color.blue_1677ff"));
        Button.width("100%");
        Button.onClick(() => {
            this.reconnect();
        });
        Text.create('Reconnect');
        Text.fontSize($r("app.float.font_20"));
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor($r("app.color.white"));
        Text.width("100%");
        Text.maxLines(1);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, justifyContent: FlexAlign.SpaceAround });
        Flex.margin(10);
        Button.createWithChild();
        Button.backgroundColor($r("app.color.blue_1677ff"));
        Button.width("100%");
        Button.margin({ right: 8 });
        Button.onClick(() => {
            this.connectLost();
        });
        Text.create('ConnectLost');
        Text.fontSize($r("app.float.font_20"));
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor($r("app.color.white"));
        Text.width("100%");
        Text.maxLines(1);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.backgroundColor($r("app.color.blue_1677ff"));
        Button.width("100%");
        Button.onClick(() => {
            this.clear();
        });
        Text.create('Clear');
        Text.fontSize($r("app.float.font_20"));
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor($r("app.color.white"));
        Text.maxLines(1);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Flex.pop();
        Scroll.create(this.scroller);
        Scroll.width("100%");
        Scroll.height("45%");
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.On);
        Scroll.padding(16);
        Scroll.align(Alignment.TopStart);
        Column.create({ space: 8 });
        Column.alignItems(HorizontalAlign.Start);
        Column.width("100%");
        Column.padding(10);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arr), (item: string) => {
            Text.create(item);
            Text.fontSize($r("app.float.font_18"));
            Text.pop();
        }, (item: string) => item);
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    showLog(info: string) {
        let time = TimeUtil.currentTimeStamp();
        this.arr.push(time + " | " + info);
        this.scroller.scrollEdge(Edge.Bottom);
    }
    createClient() {
        this.showLog("create client");
        if (this.mqttAsyncClient) {
            this.showLog("client is created");
            return;
        }
        this.mqttAsyncClient = MqttAsync.createMqtt({
            url: this.url,
            clientId: this.clientId,
            persistenceType: 1,
        });
        if (!this.mqttAsyncClient) {
            this.showLog("create client failed");
            return;
        }
        this.messageArrived();
        this.connectLost();
        this.mqttAsyncClient.setMqttTrace(6);
        this.showLog("create client success");
    }
    async connect() {
        LogUtil.info(TAG, "connect");
        this.showLog("connect");
        let options: MqttConnectOptions = {
            userName: this.userName,
            password: this.password,
            connectTimeout: 300
        };
        if (this.mqttAsyncClient == null) {
            this.showLog("client not created");
            return;
        }
        if (!(await this.isConnected())) {
            if (this.isPromise) {
                this.mqttAsyncClient.connect(options).then((data: MqttResponse) => {
                    LogUtil.info(TAG, "connect result:" + JSON.stringify(data));
                    this.showLog(JSON.stringify(data.message));
                    this.connectedCount++;
                }).catch((data: MqttResponse) => {
                    LogUtil.info(TAG, "connect fail result:" + JSON.stringify(data));
                    this.showLog(JSON.stringify(data.message));
                });
            }
            else {
                this.mqttAsyncClient.connect(options, (err: Error, data: MqttResponse) => {
                    if (!err) {
                        LogUtil.info(TAG, "connect result:" + JSON.stringify(data));
                        this.showLog(data.message);
                        if (data.message == "Connect Success") {
                            LogUtil.info(TAG, "connect result connectedCount:");
                            this.connectedCount++;
                        }
                    }
                    else {
                        this.showLog("connect error");
                        this.showLog(JSON.stringify(err));
                        LogUtil.info(TAG, "connect error:" + JSON.stringify(err));
                    }
                });
            }
        }
    }
    async publish() {
        LogUtil.info(TAG, "publish");
        this.showLog("publish");
        let publishOption: MqttPublishOptions = {
            topic: this.topic,
            qos: 1,
            payload: this.payload
        };
        if (this.mqttAsyncClient == null) {
            this.showLog("client not created");
            return;
        }
        if (await this.isConnected()) {
            if (this.isPromise) {
                this.mqttAsyncClient.publish(publishOption).then((data: MqttResponse) => {
                    LogUtil.info(TAG, "publish success result:" + JSON.stringify(data));
                    this.showLog(data.message);
                }).catch((err: MqttResponse) => {
                    LogUtil.info(TAG, "publish fail result:" + JSON.stringify(err));
                    this.showLog(err.message);
                });
            }
            else {
                this.mqttAsyncClient.publish(publishOption, (err: Error, data: MqttResponse) => {
                    LogUtil.info(TAG, "publish response:");
                    if (!err) {
                        this.showLog(data.message);
                        LogUtil.info(TAG, "publish result:" + JSON.stringify(data));
                    }
                    else {
                        this.showLog("publish error");
                        this.showLog(JSON.stringify(err));
                        LogUtil.info(TAG, "publish error:" + JSON.stringify(err));
                    }
                });
            }
        }
    }
    async subscribe() {
        LogUtil.info(TAG, "subscribe");
        this.showLog("subscribe");
        let subscribeOption: MqttSubscribeOptions = {
            topic: this.topic,
            qos: 2
        };
        if (this.mqttAsyncClient == null) {
            this.showLog("client not created");
            return;
        }
        if (await this.isConnected()) {
            if (this.isPromise) {
                this.mqttAsyncClient.subscribe(subscribeOption).then((data: MqttResponse) => {
                    LogUtil.info(TAG, "subscribe success result:" + JSON.stringify(data));
                    this.showLog(data.message);
                }).catch((err: MqttResponse) => {
                    LogUtil.info(TAG, "subscribe fail result:" + JSON.stringify(err));
                    this.showLog(err.message);
                });
            }
            else {
                this.mqttAsyncClient.subscribe(subscribeOption, (err: Error, data: MqttResponse) => {
                    if (!err) {
                        this.showLog(data.message);
                        LogUtil.info(TAG, "subscribe result:" + JSON.stringify(data));
                    }
                    else {
                        this.showLog("subscribe error");
                        this.showLog(JSON.stringify(err));
                        LogUtil.info(TAG, "subscribe error:" + JSON.stringify(err));
                    }
                });
            }
        }
    }
    messageArrived() {
        LogUtil.info(TAG, "messageArrived");
        this.showLog("messageArrived");
        if (this.mqttAsyncClient == null) {
            this.showLog("client not created");
            return;
        }
        this.mqttAsyncClient.messageArrived((err: Error, data: MqttMessage) => {
            if (!err) {
                let msg = "messageArrived topic:" + data.topic + ", msg:" + data.payload;
                this.showLog(msg);
                LogUtil.info(TAG, "messageArrived message:" + JSON.stringify(data));
            }
            else {
                this.showLog("messageArrived error");
                this.showLog(JSON.stringify(err));
                LogUtil.info(TAG, "messageArrived error:" + JSON.stringify(err));
            }
        });
    }
    async unsubscribe() {
        LogUtil.info(TAG, "unsubscribe");
        this.showLog("unsubscribe");
        let subscribeOption: MqttSubscribeOptions = {
            topic: this.topic,
            qos: 2
        };
        if (this.mqttAsyncClient == null) {
            this.showLog("client not created");
            return;
        }
        if (await this.isConnected()) {
            if (this.isPromise) {
                this.mqttAsyncClient.unsubscribe(subscribeOption).then((data: MqttResponse) => {
                    LogUtil.info(TAG, "unsubscribe success result:" + JSON.stringify(data));
                    this.showLog(data.message);
                }).catch((err: MqttResponse) => {
                    LogUtil.info(TAG, "unsubscribe fail result:" + JSON.stringify(err));
                    this.showLog(err.message);
                });
            }
            else {
                this.mqttAsyncClient.unsubscribe(subscribeOption, (err: Error, data: MqttResponse) => {
                    if (!err) {
                        this.showLog(data.message);
                        LogUtil.info(TAG, "unsubscribe result:" + JSON.stringify(data));
                    }
                    else {
                        this.showLog("unsubscribe error");
                        this.showLog(JSON.stringify(err));
                        LogUtil.info(TAG, "unsubscribe error:" + JSON.stringify(err));
                    }
                });
            }
        }
    }
    async disconnect() {
        LogUtil.info(TAG, "disconnect");
        this.showLog("disconnect");
        if (this.mqttAsyncClient == null) {
            this.showLog("client not created");
            return;
        }
        if (await this.isConnected()) {
            if (this.isPromise) {
                this.mqttAsyncClient.disconnect().then((data: MqttResponse) => {
                    LogUtil.info(TAG, "disconnect success result:" + JSON.stringify(data));
                    this.showLog(data.message);
                }).catch((err: MqttResponse) => {
                    LogUtil.info(TAG, "disconnect fail result:" + JSON.stringify(err));
                    this.showLog(err.message);
                });
            }
            else {
                this.mqttAsyncClient.disconnect((err: Error, data: MqttResponse) => {
                    if (!err) {
                        this.showLog(data.message);
                        LogUtil.info(TAG, "disconnect result:" + JSON.stringify(data));
                    }
                    else {
                        this.showLog("disconnect error");
                        this.showLog(JSON.stringify(err));
                        LogUtil.info(TAG, "disconnect error:" + JSON.stringify(err));
                    }
                });
            }
        }
    }
    isConnected() {
        LogUtil.info(TAG, "isConnected");
        this.showLog("isConnected");
        if (this.mqttAsyncClient == null) {
            this.showLog("client not created");
            return;
        }
        return this.mqttAsyncClient.isConnected().then((data: boolean) => {
            this.showLog("isConnected " + data);
            LogUtil.info(TAG, "isConnected result:" + data);
            if (!data) {
                this.showLog("client not connect");
            }
            return data;
        });
    }
    async reconnect() {
        LogUtil.info(TAG, "reconnect");
        this.showLog("reconnect");
        if (this.mqttAsyncClient == null) {
            this.showLog("client not created");
            return;
        }
        if (!(await this.isConnected())) {
            if (this.connectedCount == 0) {
                this.showLog("reconnect: client previously not connected");
                LogUtil.info(TAG, "reconnect: client previously not connected");
                return;
            }
            this.mqttAsyncClient.reconnect().then((data: boolean) => {
                this.showLog("reConnected " + data);
                LogUtil.info(TAG, "reConnected result:" + data);
            });
        }
    }
    connectLost() {
        LogUtil.info(TAG, "connectLost");
        this.showLog("connectLost");
        if (this.mqttAsyncClient == null) {
            this.showLog("client not created");
            return;
        }
        this.mqttAsyncClient.connectLost((err: Error, data: MqttResponse) => {
            if (!err) {
                this.showLog(data.message);
                this.reconnect();
                LogUtil.info(TAG, "connect lost cause:" + JSON.stringify(data));
            }
            else {
                this.showLog("connect lost error");
                this.showLog(JSON.stringify(err));
                LogUtil.info(TAG, "connect lost error:" + JSON.stringify(err));
            }
        });
    }
    async destroy() {
        LogUtil.info(TAG, "destroy");
        this.showLog("destroy client");
        if (this.mqttAsyncClient == null) {
            this.showLog("client not created");
            return;
        }
        this.mqttAsyncClient.destroy().then((data: boolean) => {
            this.showLog("destroy " + data);
            LogUtil.info(TAG, "destroy result:" + data);
            this.mqttAsyncClient = null;
            this.connectedCount = 0;
        });
    }
    clear() {
        this.arr = [];
    }
    setIsPromise(isPromise: boolean) {
        this.isPromise = !isPromise;
        this.showLog("setIsPromise： " + this.isPromise);
        LogUtil.info(TAG, "setIsPromise result:" + this.isPromise);
    }
}
loadDocument(new EmqxPage("1", undefined, {}));
