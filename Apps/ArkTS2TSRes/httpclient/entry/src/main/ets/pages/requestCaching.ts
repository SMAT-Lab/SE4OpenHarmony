interface requestCaching_Params {
    headerFlag?: number;
    headerName?: string;
    result?: string;
    status?: string;
    content?: string;
    data?: string;
    apiInput?: string;
    ipInput?: string;
    portInput?: string;
    caPem?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "requestCaching_" + ++__generate__Id;
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
import { Cache, CacheControl, Dns, HttpClient, Logger, Request, Response, StringUtil, TimeUnit, Utils, X509TrustManager } from '@ohos/httpclient';
import { Utils as GetCAUtils } from "../utils/Utils";
import certFramework from '@ohos.security.cert';
import base64 from 'base64-js';
import connection from '@ohos.net.connection';
const TAG: string = "request_caching_customCertificate_Unidirectional";
class requestCaching extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__headerFlag = new ObservedPropertySimple(0, this, "headerFlag");
        this.__headerName = new ObservedPropertySimple('https', this, "headerName");
        this.__result = new ObservedPropertySimple('', this, "result");
        this.__status = new ObservedPropertySimple('', this, "status");
        this.__content = new ObservedPropertySimple('', this, "content");
        this.__data = new ObservedPropertySimple('', this, "data");
        this.__apiInput = new ObservedPropertySimple('', this, "apiInput");
        this.ipInput = '1.94.37.200';
        this.portInput = '8080';
        this.caPem = "noPassword/ca.pem";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: requestCaching_Params) {
        if (params.headerFlag !== undefined) {
            this.headerFlag = params.headerFlag;
        }
        if (params.headerName !== undefined) {
            this.headerName = params.headerName;
        }
        if (params.result !== undefined) {
            this.result = params.result;
        }
        if (params.status !== undefined) {
            this.status = params.status;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.apiInput !== undefined) {
            this.apiInput = params.apiInput;
        }
        if (params.ipInput !== undefined) {
            this.ipInput = params.ipInput;
        }
        if (params.portInput !== undefined) {
            this.portInput = params.portInput;
        }
        if (params.caPem !== undefined) {
            this.caPem = params.caPem;
        }
    }
    aboutToBeDeleted() {
        this.__headerFlag.aboutToBeDeleted();
        this.__headerName.aboutToBeDeleted();
        this.__result.aboutToBeDeleted();
        this.__status.aboutToBeDeleted();
        this.__content.aboutToBeDeleted();
        this.__data.aboutToBeDeleted();
        this.__apiInput.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __headerFlag: ObservedPropertySimple<number>;
    get headerFlag() {
        return this.__headerFlag.get();
    }
    set headerFlag(newValue: number) {
        this.__headerFlag.set(newValue);
    }
    private __headerName: ObservedPropertySimple<string>;
    get headerName() {
        return this.__headerName.get();
    }
    set headerName(newValue: string) {
        this.__headerName.set(newValue);
    }
    private __result: ObservedPropertySimple<string>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: string) {
        this.__result.set(newValue);
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
    private __data: ObservedPropertySimple<string>;
    get data() {
        return this.__data.get();
    }
    set data(newValue: string) {
        this.__data.set(newValue);
    }
    private __apiInput: ObservedPropertySimple<string>;
    get apiInput() {
        return this.__apiInput.get();
    }
    set apiInput(newValue: string) {
        this.__apiInput.set(newValue);
    }
    private ipInput: string;
    private portInput: string;
    private caPem;
    render() {
        Column.create();
        Column.alignItems(HorizontalAlign.Center);
        Flex.create({
            direction: FlexDirection.Row
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
        Row.create();
        Row.justifyContent(FlexAlign.End);
        Row.flexGrow(1);
        Text.create('https');
        Text.fontSize(20);
        Text.padding(10);
        Text.margin({ right: 20 });
        Text.fontColor(this.headerFlag === 0 ? Color.Green : Color.Gray);
        Text.onClick(() => {
            this.headerFlag = 0;
            this.portInput = '8080';
            this.headerName = 'https';
        });
        Text.pop();
        Text.create('http');
        Text.padding(10);
        Text.fontSize(20);
        Text.fontColor(this.headerFlag === 0 ? Color.Gray : Color.Green);
        Text.onClick(() => {
            this.headerFlag = 1;
            this.portInput = '7070';
            this.headerName = 'http';
        });
        Text.pop();
        Row.pop();
        Flex.pop();
        Flex.create({
            direction: FlexDirection.Column,
            alignItems: ItemAlign.Center
        });
        Flex.margin({ top: 5 });
        Flex.height('100%');
        Flex.width('100%');
        TextInput.create({ text: this.ipInput, placeholder: '输入服务器ip' });
        TextInput.width('80%');
        TextInput.height('100%');
        TextInput.fontSize(18);
        TextInput.margin({ top: px2vp(20) });
        TextInput.height(px2vp(150));
        TextInput.enabled(false);
        TextInput.onChange((value: string) => {
            this.ipInput = value;
        });
        TextInput.create({ text: this.headerFlag === 0 ? '8080' : '7070', placeholder: '输入服务器端口' });
        TextInput.width('80%');
        TextInput.height('100%');
        TextInput.fontSize(18);
        TextInput.margin({ top: px2vp(20) });
        TextInput.height(px2vp(150));
        TextInput.enabled(false);
        TextInput.onChange((value: string) => {
            this.portInput = value;
        });
        TextInput.create({ text: this.apiInput, placeholder: '输入缓存接口' });
        TextInput.width('80%');
        TextInput.height('100%');
        TextInput.fontSize(18);
        TextInput.margin({ top: px2vp(20) });
        TextInput.height(px2vp(150));
        TextInput.enabled(false);
        TextInput.onChange((value: string) => {
            this.apiInput = value;
        });
        Column.create();
        Column.height('30%');
        Column.width('95%');
        Column.margin({ top: 10 });
        Column.borderWidth(1);
        Text.create('查询结果来源：' + this.result);
        Text.fontSize(18);
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10, bottom: 10 });
        Text.pop();
        Text.create('返回码：' + this.status);
        Text.fontSize(18);
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create(this.content);
        Text.fontSize(18);
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Column.pop();
        Row.create();
        Row.width('100%');
        Row.margin({ bottom: 10, top: 10 });
        Row.justifyContent(FlexAlign.Center);
        Button.createWithLabel('e/tag');
        Button.width('40%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin({ right: 20 });
        Button.onClick(async (event: ClickEvent) => {
            this.apiInput = '/cache/e/tag';
            this.content = "waiting for response";
            this.request(0);
        });
        Button.pop();
        Button.createWithLabel('e/tag/change');
        Button.width('40%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.onClick(async (event: ClickEvent) => {
            this.apiInput = '/cache/e/tag/change';
            this.content = "waiting for response";
            this.request(1);
        });
        Button.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.margin({ bottom: 10 });
        Row.justifyContent(FlexAlign.Center);
        Button.createWithLabel('expires');
        Button.width('40%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin({ right: 20 });
        Button.onClick(async (event: ClickEvent) => {
            this.apiInput = '/cache/expires';
            this.content = "waiting for response";
            this.request(2);
        });
        Button.pop();
        Button.createWithLabel('immutable');
        Button.width('40%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.onClick(async (event: ClickEvent) => {
            this.apiInput = '/cache/immutable';
            this.content = "waiting for response";
            this.request(3);
        });
        Button.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.margin({ bottom: 10 });
        Row.justifyContent(FlexAlign.Center);
        Button.createWithLabel('last/modified');
        Button.width('40%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin({ right: 20 });
        Button.onClick(async (event: ClickEvent) => {
            this.apiInput = '/cache/last/modified';
            this.content = "waiting for response";
            this.request(4);
        });
        Button.pop();
        Button.createWithLabel('modify/change');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.onClick(async (event: ClickEvent) => {
            this.apiInput = '/cache/last/modified/change';
            this.content = "waiting for response";
            this.request(5);
        });
        Button.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.margin({ bottom: 10 });
        Row.justifyContent(FlexAlign.Center);
        Button.createWithLabel('max/age');
        Button.width('40%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin({ right: 20 });
        Button.onClick(async (event: ClickEvent) => {
            this.apiInput = '/cache/max/age';
            this.content = "waiting for response";
            this.request(6);
        });
        Button.pop();
        Button.createWithLabel('no/cache');
        Button.width('40%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.onClick(async (event: ClickEvent) => {
            this.apiInput = '/cache/no/cache';
            this.content = "waiting for response";
            this.request(7);
        });
        Button.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.justifyContent(FlexAlign.Center);
        Button.createWithLabel('forceNetwork');
        Button.width('40%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin({ right: 20 });
        Button.onClick(async (event: ClickEvent) => {
            this.apiInput = '/cache/max/age';
            this.content = "waiting for response";
            this.request(8);
        });
        Button.pop();
        Button.createWithLabel('forceCache');
        Button.width('40%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.onClick(async (event: ClickEvent) => {
            this.apiInput = '/cache/max/age';
            this.content = "waiting for response";
            this.request(9);
        });
        Button.pop();
        Row.pop();
        Flex.pop();
        Column.pop();
    }
    async request(flag: number) {
        let context = getContext();
        let hereCacheDir: string = context.cacheDir;
        let cache: Cache.Cache = new Cache.Cache(hereCacheDir, 10 * 1024 * 1024, context);
        let httpClient: HttpClient = new HttpClient
            .Builder()
            .dns((this.headerFlag === 0) ? new CustomDnsForHttps() : new CustomDnsForHttp())
            .cache(cache)
            .setConnectTimeout(10000, TimeUnit.SECONDS)
            .setReadTimeout(10000, TimeUnit.SECONDS)
            .build();
        let caFile: string = await new GetCAUtils().getCA(this.caPem, context);
        let url: string = this.headerName + '://' + this.ipInput + ':' + this.portInput + this.apiInput;
        let request: Request = {} as Request;
        if (flag <= 5) {
            request = new Request.Builder()
                .get()
                .url(url)
                .ca(this.headerFlag === 0 ? [caFile] : '')
                .build();
        }
        else if (flag === 6) {
            request = new Request.Builder()
                .get()
                .url(url)
                .addHeader("Cache-Control", "max-age=30")
                .ca(this.headerFlag === 0 ? [caFile] : '')
                .build();
        }
        else if (flag === 7) {
            request = new Request.Builder()
                .get()
                .url(url)
                .addHeader("Cache-Control", "no-cache")
                .ca(this.headerFlag === 0 ? [caFile] : '')
                .build();
        }
        else if (flag === 8) {
            request = new Request.Builder()
                .get()
                .url(url)
                .cacheControl(CacheControl.FORCE_NETWORK())
                .ca(this.headerFlag === 0 ? [caFile] : '')
                .build();
        }
        else if (flag === 9) {
            request = new Request.Builder()
                .get()
                .url(url)
                .cacheControl(CacheControl.FORCE_CACHE())
                .ca(this.headerFlag === 0 ? [caFile] : '')
                .build();
        }
        httpClient
            .newCall(request)
            .checkCertificate(new SslCertificateManager())
            .execute()
            .then((result: Response) => {
            if (result.getNetWorkResponse()) {
                if (result.getNetWorkResponse().responseCode === 200) {
                    this.result = '网络';
                    this.status = result.responseCode + '';
                    if (((flag === 1) || (flag === 5)) && (result.result === '"true"')) {
                        this.content = '修改成功';
                    }
                    else {
                        this.content = result.result;
                    }
                }
                if (result.getNetWorkResponse().responseCode === 304) {
                    this.result = '缓存';
                    this.status = result.responseCode + '';
                    this.content = result.result;
                }
            }
            else {
                this.result = '缓存';
                this.status = result.getCacheResponse().getCode() + '';
                this.content = result.getCacheResponse().getBody() + '';
            }
        }, (error: Response) => {
            this.status = '';
            this.result = '';
            this.content = JSON.stringify(error);
        });
    }
}
export class CustomDnsForHttps implements Dns {
    async lookup(hostname: string): Promise<Array<connection.NetAddress>> {
        console.info('DNSTEST CustomDns begin here');
        return await new Promise((resolve, reject) => {
            let netAddress: Array<connection.NetAddress> = [{ 'address': '1.94.37.200', 'family': 1, 'port': 8080 }];
            resolve(netAddress);
        });
    }
}
export class CustomDnsForHttp implements Dns {
    async lookup(hostname: string): Promise<Array<connection.NetAddress>> {
        console.info('DNSTEST CustomDns begin here');
        return await new Promise((resolve, reject) => {
            let netAddress: Array<connection.NetAddress> = [{ 'address': '1.94.37.200', 'family': 1, 'port': 7070 }];
            resolve(netAddress);
        });
    }
}
export class SslCertificateManager implements X509TrustManager {
    // 校验服务器证书
    checkServerTrusted(X509Certificate: certFramework.X509Cert): void {
        Logger.info(TAG, 'Get Server Trusted X509Certificate');
        // 时间校验成功的设置值
        let currentDayTime = StringUtil.getCurrentDayTime();
        let date = currentDayTime + 'Z';
        try {
            X509Certificate.checkValidityWithDate(date); // 检查X509证书有效期
            console.error('checkValidityWithDate success');
        }
        catch (error) {
            console.error('checkValidityWithDate failed, errCode: ' + error.code + ', errMsg: ' + error.message);
            error.message = 'checkValidityWithDate failed, errCode: ' + error.code + ', errMsg: ' + error.message;
            throw new Error(error);
        }
    }
    // 校验客户端证书
    checkClientTrusted(X509Certificate: certFramework.X509Cert): void {
        Logger.info(TAG, 'Get Client Trusted X509Certificate');
        let encoded = X509Certificate.getEncoded(); // 获取X509证书序列化数据
        Logger.info(TAG, 'encoded: ', JSON.stringify(encoded));
        let publicKey = X509Certificate.getPublicKey(); // 获取X509证书公钥
        Logger.info(TAG, 'publicKey: ', JSON.stringify(publicKey));
        let version = X509Certificate.getVersion(); // 获取X509证书版本
        Logger.info(TAG, 'version: ', JSON.stringify(version));
        let serialNumber = X509Certificate.getCertSerialNumber(); //获取X509证书序列号
        Logger.info(TAG, 'serialNumber: ', serialNumber);
        let issuerName = X509Certificate.getIssuerName(); // 获取X509证书颁发者名称
        Logger.info(TAG, 'issuerName: ', Utils.uint8ArrayToString(issuerName.data));
        let subjectName = X509Certificate.getSubjectName(); // 获取X509证书主体名称
        Logger.info(TAG, 'subjectName: ', Utils.uint8ArrayToString(subjectName.data));
        let notBeforeTime = X509Certificate.getNotBeforeTime(); // 获取X509证书有效期起始时间
        Logger.info(TAG, 'notBeforeTime: ', notBeforeTime);
        let notAfterTime = X509Certificate.getNotAfterTime(); // 获取X509证书有效期截止时间
        Logger.info(TAG, 'notAfterTime: ', notAfterTime);
        let signature = X509Certificate.getSignature(); // 获取X509证书签名数据
        Logger.info(TAG, 'signature: ', Utils.uint8ArrayToString(signature.data));
        let signatureAlgName = X509Certificate.getSignatureAlgName(); // 获取X509证书签名算法名称
        Logger.info(TAG, 'signatureAlgName: ', signatureAlgName);
        let signatureAlgOid = X509Certificate.getSignatureAlgOid(); // 获取X509证书签名算法的对象标志符OID(Object Identifier)
        Logger.info(TAG, 'signatureAlgOid: ', signatureAlgOid);
        let signatureAlgParams = X509Certificate.getSignatureAlgParams(); // 获取X509证书签名算法参数
        Logger.info(TAG, 'signatureAlgParams: ', Utils.uint8ArrayToString(signatureAlgParams.data));
        let keyUsage = X509Certificate.getKeyUsage(); // 获取X509证书秘钥用途
        Logger.info(TAG, 'keyUsage: ', Utils.uint8ArrayToString(keyUsage.data));
        let extKeyUsage = X509Certificate.getExtKeyUsage(); //获取X509证书扩展秘钥用途
        Logger.info(TAG, 'extKeyUsage: ', JSON.stringify(extKeyUsage));
        let basicConstraints = X509Certificate.getBasicConstraints(); // 获取X509证书基本约束
        Logger.info(TAG, 'basicConstraints: ', JSON.stringify(basicConstraints));
        let subjectAltNames = X509Certificate.getSubjectAltNames(); // 获取X509证书主体可选名称
        Logger.info(TAG, 'subjectAltNames: ', JSON.stringify(subjectAltNames));
        let issuerAltNames = X509Certificate.getIssuerAltNames(); // 获取X509证书颁发者可选名称
        Logger.info(TAG, 'issuerAltNames: ', JSON.stringify(issuerAltNames));
        let tbs = X509Certificate.getItem(certFramework.CertItemType.CERT_ITEM_TYPE_TBS).data; // 获取X509证书TBS(to be signed)
        Logger.info(TAG, 'tbs: ', base64.fromByteArray(tbs));
        let pubKey = X509Certificate.getItem(certFramework.CertItemType.CERT_ITEM_TYPE_PUBLIC_KEY); // 获取X509证书公钥.
        Logger.info(TAG, 'pubKey: ', base64.fromByteArray(pubKey.data));
        let extensions = X509Certificate.getItem(certFramework.CertItemType.CERT_ITEM_TYPE_EXTENSIONS).data;
        Logger.info(TAG, 'extensions: ', base64.fromByteArray(extensions));
    }
}
loadDocument(new requestCaching("1", undefined, {}));
