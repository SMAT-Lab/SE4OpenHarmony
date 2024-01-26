interface Index_Params {
    serverMessage?: string;
    clientMessage?: string;
    stunServer?: StunServer | ESObject;
    stunClient?: StunClient | ESObject;
    clientAddress?: string;
    serverInfo?: Address;
    newDefaults?: Defaults;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { StunServer, StunClient } from '@ohos/stun';
import prompt from '@system.prompt';
class Address {
    host: string = '';
    port: string = '';
}
class Defaults {
    primary: Address | any;
    secondary: Address | any;
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__serverMessage = new ObservedPropertySimple("Tip: Click 'node-stun-server' to display the server log", this, "serverMessage");
        this.__clientMessage = new ObservedPropertySimple("Tip: Click 'node-stun-client' to display the client log", this, "clientMessage");
        this.stunServer = null;
        this.stunClient = null;
        this.clientAddress = '';
        this.serverInfo = {
            host: '127.0.0.1',
            port: '3478'
        };
        this.newDefaults = {
            primary: {
                host: '127.0.0.1',
                port: '3478'
            },
            secondary: {
                host: '127.0.0.2',
                port: '3479'
            }
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.serverMessage !== undefined) {
            this.serverMessage = params.serverMessage;
        }
        if (params.clientMessage !== undefined) {
            this.clientMessage = params.clientMessage;
        }
        if (params.stunServer !== undefined) {
            this.stunServer = params.stunServer;
        }
        if (params.stunClient !== undefined) {
            this.stunClient = params.stunClient;
        }
        if (params.clientAddress !== undefined) {
            this.clientAddress = params.clientAddress;
        }
        if (params.serverInfo !== undefined) {
            this.serverInfo = params.serverInfo;
        }
        if (params.newDefaults !== undefined) {
            this.newDefaults = params.newDefaults;
        }
    }
    aboutToBeDeleted() {
        this.__serverMessage.aboutToBeDeleted();
        this.__clientMessage.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __serverMessage: ObservedPropertySimple<string>;
    get serverMessage() {
        return this.__serverMessage.get();
    }
    set serverMessage(newValue: string) {
        this.__serverMessage.set(newValue);
    }
    private __clientMessage: ObservedPropertySimple<string>;
    get clientMessage() {
        return this.__clientMessage.get();
    }
    set clientMessage(newValue: string) {
        this.__clientMessage.set(newValue);
    }
    private stunServer: StunServer | any;
    private stunClient: StunClient | any;
    private clientAddress: string;
    private serverInfo: Address;
    private newDefaults: Defaults;
    private createServer() {
        let self = this;
        if (self.stunServer) {
            return;
        }
        self.serverMessage = "";
        prompt.showToast({ message: "node-stun-server", duration: 3000 });
        self.stunServer = new StunServer();
        self.stunServer.setServerMessageListener({ onMessageChanged(serverMessage: string) {
                self.serverMessage += serverMessage + "\n";
            } });
        self.stunServer.createServer(this.newDefaults);
    }
    private createClient() {
        let self = this;
        self.clientMessage = "";
        prompt.showToast({ message: "node-stun-client", duration: 3000 });
        if (this.clientAddress == '') {
            prompt.showToast({ message: "Please input client ip address", duration: 3000 });
            return;
        }
        if (!self.stunClient) {
            self.stunClient = new StunClient();
            self.stunClient.setClientMessageListener({
                onMessageChanged(clientMessage: string) {
                    self.clientMessage += clientMessage + "\n";
                }
            });
        }
        self.stunClient.createClient(this.clientAddress, this.serverInfo);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center /*, justifyContent: FlexAlign.Center*/
        });
        Flex.width('100%');
        Flex.height('100%');
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('50%');
        Row.create();
        TextInput.create({ placeholder: 'primary host', text: this.newDefaults.primary.host });
        TextInput.height(40);
        TextInput.placeholderFont({ size: 20, weight: 2 });
        TextInput.fontSize(20);
        TextInput.layoutWeight(1);
        TextInput.focusable(false);
        TextInput.onChange((value: string) => {
            this.newDefaults.primary.host = value;
        });
        TextInput.create({ placeholder: 'primary port', text: this.newDefaults.primary.port });
        TextInput.height(40);
        TextInput.placeholderFont({ size: 20, weight: 2 });
        TextInput.fontSize(20);
        TextInput.layoutWeight(1);
        TextInput.focusable(false);
        TextInput.onChange((value: string) => {
            this.newDefaults.primary.port = value;
        });
        Row.pop();
        Line.create();
        Line.backgroundColor(Color.Blue);
        Line.height(1);
        Line.width('100%');
        Row.create();
        TextInput.create({ placeholder: 'secondary host', text: this.newDefaults.secondary.host });
        TextInput.height(40);
        TextInput.placeholderFont({ size: 20, weight: 2 });
        TextInput.fontSize(20);
        TextInput.layoutWeight(1);
        TextInput.focusable(false);
        TextInput.onChange((value: string) => {
            this.newDefaults.secondary.host = value;
        });
        TextInput.create({ placeholder: 'secondary port', text: this.newDefaults.secondary.port });
        TextInput.height(40);
        TextInput.placeholderFont({ size: 20, weight: 2 });
        TextInput.fontSize(20);
        TextInput.layoutWeight(1);
        TextInput.focusable(false);
        TextInput.onChange((value: string) => {
            this.newDefaults.secondary.port = value;
        });
        Row.pop();
        Button.createWithLabel('node-stun-server', { type: ButtonType.Normal });
        Button.size({ width: '100%', height: 100 });
        Button.fontSize(38);
        Button.fontColor('#FFFFFF');
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            this.createServer();
        });
        Button.pop();
        Scroll.create();
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.On);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.scrollBarWidth(30);
        Text.create(this.serverMessage);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Scroll.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('50%');
        Row.create();
        TextInput.create({ placeholder: 'server host', text: this.serverInfo.host });
        TextInput.height(40);
        TextInput.placeholderFont({ size: 20, weight: 2 });
        TextInput.fontSize(20);
        TextInput.layoutWeight(1);
        TextInput.focusable(false);
        TextInput.onChange((value: string) => {
            this.serverInfo.host = value;
        });
        TextInput.create({ placeholder: 'server port', text: this.serverInfo.port });
        TextInput.height(40);
        TextInput.placeholderFont({ size: 20, weight: 2 });
        TextInput.fontSize(20);
        TextInput.layoutWeight(1);
        TextInput.focusable(false);
        TextInput.onChange((value: string) => {
            this.serverInfo.port = value;
        });
        Row.pop();
        Line.create();
        Line.backgroundColor(Color.Blue);
        Line.height(1);
        Line.width('100%');
        TextInput.create({ placeholder: 'Please input client ip address' });
        TextInput.height(50);
        TextInput.placeholderFont({ size: 20, weight: 2 });
        TextInput.fontSize(20);
        TextInput.onChange((value: string) => {
            this.clientAddress = value;
        });
        Button.createWithLabel('node-stun-client', { type: ButtonType.Normal });
        Button.size({ width: '100%', height: 100 });
        Button.fontSize(40);
        Button.fontColor('#FFFFFF');
        Button.fontWeight(FontWeight.Bold);
        Button.height(100);
        Button.onClick(() => {
            this.createClient();
        });
        Button.pop();
        Scroll.create();
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.On);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.scrollBarWidth(30);
        Scroll.height('70%');
        Text.create(this.clientMessage);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Scroll.pop();
        Flex.pop();
        Flex.pop();
    }
    public aboutToAppear() {
    }
}
loadDocument(new Index("1", undefined, {}));
