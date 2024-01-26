interface certificate_certChain_Params {
    status?: string;
    content?: string;
    currentALPNProtocols?;
    currentPasswd?;
    currentSignatureAlgorithms?;
    currentCipherSuites?;
    ifUseRemoteCipherPrefer?;
    protocols?;
    keyRes?: string;
    certRes?: string;
    caRes?: string[];
    realTlsSocet?: RealTLSSocket;
    client?: HttpClient;
    request?: Request;
    scroller?: Scroller;
    sendStr?: string;
    ipInput?: string;
    portInput?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "certificate_certChain_" + ++__generate__Id;
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
import socket from '@ohos.net.socket';
import { HttpClient, RealTLSSocket, Request, StringUtil, TLSSocketListener } from '@ohos/httpclient';
import prompt from '@ohos.prompt';
import resmgr from '@ohos.resourceManager';
import { TLSSocketListenerImpl } from '../model/TLSSocketListenerImpl';
import { BusinessError } from '@ohos/httpclient/src/main/ets/http';
class certificate_certChain extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__status = new ObservedPropertySimple('', this, "status");
        this.__content = new ObservedPropertySimple('', this, "content");
        this.currentALPNProtocols = ["spdy/1", "http/1.1"];
        this.currentPasswd = "123456";
        this.currentSignatureAlgorithms = "rsa_pss_rsae_sha256:ECDSA+SHA256";
        this.currentCipherSuites = "AES256-SHA256";
        this.ifUseRemoteCipherPrefer = true;
        this.protocols = [socket.Protocol.TLSv12];
        this.keyRes = 'privekey.pem.unsecure';
        this.certRes = 'secondServer.crt';
        this.caRes = ['cacert.crt', 'caMidcert.crt'];
        this.realTlsSocet = undefined;
        this.client = new HttpClient
            .Builder()
            .build();
        this.request = undefined;
        this.scroller = new Scroller();
        this.sendStr = 'hello word';
        this.ipInput = '106.15.92.248';
        this.portInput = '5555';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: certificate_certChain_Params) {
        if (params.status !== undefined) {
            this.status = params.status;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.currentALPNProtocols !== undefined) {
            this.currentALPNProtocols = params.currentALPNProtocols;
        }
        if (params.currentPasswd !== undefined) {
            this.currentPasswd = params.currentPasswd;
        }
        if (params.currentSignatureAlgorithms !== undefined) {
            this.currentSignatureAlgorithms = params.currentSignatureAlgorithms;
        }
        if (params.currentCipherSuites !== undefined) {
            this.currentCipherSuites = params.currentCipherSuites;
        }
        if (params.ifUseRemoteCipherPrefer !== undefined) {
            this.ifUseRemoteCipherPrefer = params.ifUseRemoteCipherPrefer;
        }
        if (params.protocols !== undefined) {
            this.protocols = params.protocols;
        }
        if (params.keyRes !== undefined) {
            this.keyRes = params.keyRes;
        }
        if (params.certRes !== undefined) {
            this.certRes = params.certRes;
        }
        if (params.caRes !== undefined) {
            this.caRes = params.caRes;
        }
        if (params.realTlsSocet !== undefined) {
            this.realTlsSocet = params.realTlsSocet;
        }
        if (params.client !== undefined) {
            this.client = params.client;
        }
        if (params.request !== undefined) {
            this.request = params.request;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.sendStr !== undefined) {
            this.sendStr = params.sendStr;
        }
        if (params.ipInput !== undefined) {
            this.ipInput = params.ipInput;
        }
        if (params.portInput !== undefined) {
            this.portInput = params.portInput;
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
    private currentALPNProtocols;
    private currentPasswd;
    private currentSignatureAlgorithms;
    private currentCipherSuites;
    private ifUseRemoteCipherPrefer;
    private protocols;
    private keyRes: string;
    private certRes: string;
    private caRes: string[];
    private realTlsSocet?: RealTLSSocket;
    private client: HttpClient;
    private request?: Request;
    private scroller: Scroller;
    private sendStr: string;
    private ipInput: string;
    private portInput: string;
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
        Flex.height('30%');
        Flex.width('100%');
        Flex.padding(10);
        Row.create();
        Row.margin({ top: px2vp(20) });
        Button.createWithLabel('加载证书');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick(() => {
            prompt.showToast({ message: '加载证书' });
            this.initTLSSocketData(true);
        });
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: px2vp(20) });
        TextInput.create({ text: this.ipInput, placeholder: '输入服务器ip' });
        TextInput.width('40%');
        TextInput.height('100%');
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.ipInput = value;
        });
        Blank.create();
        Blank.width(px2vp(20));
        Blank.pop();
        TextInput.create({ text: this.portInput, placeholder: '输入服务器端口' });
        TextInput.width('30%');
        TextInput.height('100%');
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.portInput = value;
        });
        Blank.create();
        Blank.width(px2vp(20));
        Blank.pop();
        Button.createWithLabel('连接服务器');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick(() => {
            prompt.showToast({ message: '链接' });
            this.sendStr = '';
            if (this.realTlsSocet != undefined) {
                this.realTlsSocet.setVerify(true);
            }
            this.connect();
        });
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: px2vp(20) });
        TextInput.create({ text: this.sendStr, placeholder: '输入发送内容' });
        TextInput.width('60%');
        TextInput.height('100%');
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.sendStr = value;
        });
        Button.createWithLabel('发送数据');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick(() => {
            if (StringUtil.isEmpty(this.sendStr)) {
                prompt.showToast({ message: '请输入发送内容' });
                return;
            }
            else {
                prompt.showToast({ message: '发送数据:' + this.sendStr });
            }
            if (this.realTlsSocet != undefined) {
                this.realTlsSocet.setVerify(false);
            }
            this.send();
        });
        Button.pop();
        Row.pop();
        Flex.pop();
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.On);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.layoutWeight(1);
        Column.create();
        Column.width('100%');
        Text.create(this.content);
        Text.fontSize(18);
        Text.fontColor(Color.Black);
        Text.width('100%');
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Blank.create();
        Blank.height(20);
        Blank.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    aboutToAppear() {
        this.initRealTLSSocket();
        this.request = new Request.Builder()
            .setTlsRequst(this.realTlsSocet)
            .url(this.getUrl())
            .build();
    }
    initRealTLSSocket() {
        let that = this;
        this.realTlsSocet = new RealTLSSocket();
        this.realTlsSocet.setLisenter(new TLSSocketListenerImpl());
        this.initTLSSocketData(false);
    }
    initTLSSocketData(isNeedShow: boolean) {
        this.content = '';
        let hereResourceManager: resmgr.ResourceManager = getContext().resourceManager;
        if (this.realTlsSocet != undefined) {
            this.realTlsSocet.setKeyDataByRes(hereResourceManager, this.keyRes, (errKey: BusinessError<string>, resultKey: string) => {
                if (isNeedShow) {
                    this.content += '\ntlsSoket key:' + JSON.stringify(resultKey) + ' err :' + JSON.stringify(errKey) + '\n';
                }
            })
                .setCertDataByRes(hereResourceManager, this.certRes, (resulterrKey: string) => {
                if (isNeedShow) {
                    this.content += '\ntlsSoket:cert:' + JSON.stringify(resulterrKey) + '\n';
                }
            })
                .setCaDataByRes(hereResourceManager, this.caRes, (resultCa: string) => {
                if (isNeedShow) {
                    this.content += '\ntlsSoket:ca:' + JSON.stringify(resultCa) + '\n';
                }
            })
                .setUseRemoteCipherPrefer(this.ifUseRemoteCipherPrefer)
                .setSignatureAlgorithms(this.currentSignatureAlgorithms)
                .setCipherSuites(this.currentCipherSuites)
                .setPasswd(this.currentPasswd)
                .setProtocols(this.protocols)
                .setALPNProtocols(this.currentALPNProtocols);
        }
    }
    onDestroy() {
        if (this.realTlsSocet != undefined) {
            this.realTlsSocet.close((err: BusinessError<string>, data: string) => {
            });
        }
    }
    connect() {
        let that = this;
        that.content = '';
        if (StringUtil.isEmpty(this.ipInput)) {
            prompt.showToast({ message: '请输入服务器地址ip' });
            return;
        }
        if (StringUtil.isEmpty(this.portInput)) {
            prompt.showToast({ message: '请输入服务器端口' });
            return;
        }
        if (this.request != undefined) {
            this.request.url = this.getUrl();
            this.request.setData(this.sendStr);
            this.client.newCall(this.request).execute();
        }
    }
    getUrl() {
        let url = 'http://' + this.ipInput + ':' + this.portInput;
        return url;
    }
    send() {
        this.connect();
    }
}
loadDocument(new certificate_certChain("1", undefined, {}));
