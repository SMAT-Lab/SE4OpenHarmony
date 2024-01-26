interface CertVerifyButtonStyle_Params {
    name?: string;
    tlsSocketListenerImpl?: TLSSocketListenerImpl;
}
interface certificate_cert_Params {
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
    certificate_cert_TAG?: string;
    tlsSocketListenerImpl?: TLSSocketListenerImpl;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "certificate_cert_" + ++__generate__Id;
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
import { HttpClient, RealTLSSocket, Request, StringUtil, TLSSocketListener, Utils } from '@ohos/httpclient';
import prompt from '@ohos.prompt';
import buffer from '@ohos.buffer';
import { BusinessError } from '@ohos/httpclient/src/main/ets/http';
import hilog from '@ohos.hilog';
import resmgr from '@ohos.resourceManager';
import { TLSSocketListenerImpl } from '../model/TLSSocketListenerImpl';
import promptAction from '@ohos.promptAction';
import { CertVerifyResult, SocketConnectError } from '../model/CertVerfiyDataStrcure';
class certificate_cert extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__status = new ObservedPropertySimple('', this, "status");
        this.__content = new ObservedPropertySimple('', this, "content");
        this.currentALPNProtocols = ["spdy/1", "http/1.1"];
        this.currentPasswd = "123456";
        this.currentSignatureAlgorithms = "rsa_pss_rsae_sha256:ECDSA+SHA256";
        this.currentCipherSuites = "AES256-SHA256";
        this.ifUseRemoteCipherPrefer = true;
        this.protocols = [socket.Protocol.TLSv13];
        this.keyRes = 'client_rsa_private.pem.unsecure';
        this.certRes = 'client.crt';
        this.caRes = ['ca.crt'];
        this.realTlsSocet = undefined;
        this.client = new HttpClient
            .Builder()
            .build();
        this.request = undefined;
        this.scroller = new Scroller();
        this.sendStr = '';
        this.ipInput = '106.15.92.248';
        this.portInput = '9090';
        this.certificate_cert_TAG = "struct certificate_cert page    ";
        this.tlsSocketListenerImpl = new TLSSocketListenerImpl();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: certificate_cert_Params) {
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
        if (params.certificate_cert_TAG !== undefined) {
            this.certificate_cert_TAG = params.certificate_cert_TAG;
        }
        if (params.tlsSocketListenerImpl !== undefined) {
            this.tlsSocketListenerImpl = params.tlsSocketListenerImpl;
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
    private certificate_cert_TAG: string;
    private tlsSocketListenerImpl: TLSSocketListenerImpl;
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
        Flex.height('40%');
        Flex.width('100%');
        Flex.padding(10);
        Row.create();
        Row.margin({ bottom: px2vp(20) });
        __Common__.create();
        __Common__.onClick(() => {
            prompt.showToast({ message: '加载证书' });
            this.initTLSSocketData(true);
        });
        let earlierCreatedChild_2: CertVerifyButtonStyle = (this && this.findChildById) ? this.findChildById("2") as CertVerifyButtonStyle : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new CertVerifyButtonStyle("2", this, {
                name: "加载证书"
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                name: "加载证书"
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        __Common__.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: px2vp(20) });
        Row.height(px2vp(150));
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
        __Common__.create();
        __Common__.onClick(() => {
            if (this.realTlsSocet != undefined) {
                this.realTlsSocet.setVerify(true);
                this.connect();
                this.content = "";
                setTimeout(() => {
                    this.refreshData();
                }, 1000);
            }
        });
        let earlierCreatedChild_3: CertVerifyButtonStyle = (this && this.findChildById) ? this.findChildById("3") as CertVerifyButtonStyle : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new CertVerifyButtonStyle("3", this, {
                name: "连接服务器",
                tlsSocketListenerImpl: this.tlsSocketListenerImpl
            }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                name: "连接服务器",
                tlsSocketListenerImpl: this.tlsSocketListenerImpl
            });
            if (!earlierCreatedChild_3.needsUpdate()) {
                earlierCreatedChild_3.markStatic();
            }
            View.create(earlierCreatedChild_3);
        }
        __Common__.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: px2vp(20) });
        Row.height(px2vp(150));
        TextInput.create({ text: this.sendStr, placeholder: '输入发送内容' });
        TextInput.width('60%');
        TextInput.height('100%');
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.sendStr = value;
        });
        __Common__.create();
        __Common__.onClick(() => {
            if (this.realTlsSocet != undefined) {
                if (StringUtil.isEmpty(this.sendStr)) {
                    prompt.showToast({ message: '请输入发送内容' });
                    return;
                }
                else {
                    this.realTlsSocet.setVerify(false);
                    this.send();
                    setTimeout(() => {
                        if (this.tlsSocketListenerImpl.errorMsg.code != 0) {
                            this.content += "fail in send" + this.sendStr;
                        }
                    }, 500);
                }
            }
        });
        let earlierCreatedChild_4: CertVerifyButtonStyle = (this && this.findChildById) ? this.findChildById("4") as CertVerifyButtonStyle : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new CertVerifyButtonStyle("4", this, {
                name: "发送数据",
                tlsSocketListenerImpl: this.tlsSocketListenerImpl
            }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                name: "发送数据",
                tlsSocketListenerImpl: this.tlsSocketListenerImpl
            });
            if (!earlierCreatedChild_4.needsUpdate()) {
                earlierCreatedChild_4.markStatic();
            }
            View.create(earlierCreatedChild_4);
        }
        __Common__.pop();
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
        this.realTlsSocet.setLisenter(this.tlsSocketListenerImpl);
        this.initTLSSocketData(false);
    }
    initTLSSocketData(isNeedShow: boolean) {
        let hereResourceManager: resmgr.ResourceManager = getContext().resourceManager;
        this.content = '';
        if (this.realTlsSocet != undefined) {
            this.realTlsSocet.setKeyDataByRes(hereResourceManager, this.keyRes, (errKey: BusinessError<string> | null, resultKey: Uint8Array) => {
                if (isNeedShow) {
                    this.content += '\ntlsSoket key:' + JSON.stringify(resultKey) + ' err :' + JSON.stringify(errKey) + '\n';
                }
            })
                .setCertDataByRes(hereResourceManager, this.certRes, (resulterrKey: Uint8Array) => {
                if (isNeedShow) {
                    this.content += '\ntlsSoket:cert:' + JSON.stringify(resulterrKey) + '\n';
                }
            })
                .setCaDataByRes(hereResourceManager, this.caRes, (resultCa: string | boolean | string[]) => {
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
    aboutToDisappear() {
        if (this.realTlsSocet != undefined) {
            this.realTlsSocet.close((error: BusinessError<string>) => {
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
            this.client.newCall(this.request)
                .execute()
                .catch((error: SocketConnectError) => {
                hilog.error(0x0000, this.certificate_cert_TAG, '%{public}s', "connect error : " + JSON.stringify(error));
            });
        }
    }
    getUrl() {
        let url = 'http://' + this.ipInput + ':' + this.portInput;
        return url;
    }
    send() {
        this.connect();
    }
    refreshData(): boolean {
        this.content = "";
        this.content += "\n\n 证书校验结果 ：" + "\n\n" + this.getVerifyDataResult(this.tlsSocketListenerImpl.onVerifyDataResult);
        this.content += "\n\n Ip和端口绑定结果 ： " + "\n" + JSON.stringify(this.tlsSocketListenerImpl.onBindData);
        this.content += "\n\n 连接服务器结果 ： " + "\n" + JSON.stringify(this.tlsSocketListenerImpl.onConnectData);
        this.content += "\n\n 接收服务器消息结果 ： " + "\n" + JSON.stringify(this.tlsSocketListenerImpl.onMessageData);
        this.content += "\n\n" + this.tlsSocketListenerImpl.content;
        return true;
    }
    getVerifyDataResult(certVerifyResult: CertVerifyResult[]): string {
        let formatResult: string = "";
        for (let index = 0, len = certVerifyResult.length; index < len; index++) {
            formatResult += "\n" + JSON.stringify(certVerifyResult[index]) + "\n";
        }
        return formatResult;
    }
}
class CertVerifyButtonStyle extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.name = "";
        this.tlsSocketListenerImpl = new TLSSocketListenerImpl();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CertVerifyButtonStyle_Params) {
        if (params.name !== undefined) {
            this.name = params.name;
        }
        if (params.tlsSocketListenerImpl !== undefined) {
            this.tlsSocketListenerImpl = params.tlsSocketListenerImpl;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private name: string;
    private tlsSocketListenerImpl?: TLSSocketListenerImpl;
    render() {
        Button.createWithLabel(this.name);
        Button.height(px2vp(100));
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.pop();
    }
}
loadDocument(new certificate_cert("1", undefined, {}));
