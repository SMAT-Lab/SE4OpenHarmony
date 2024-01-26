interface bidirectionalCustomCertificate_Params {
    url?: string;
    unSecureUrl?: string;
    result?: string;
    ca?;
    clientKey?;
    clientCert?;
    unSecureCa?;
    unSecureKey?;
    unSecureCert?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "bidirectionalCustomCertificate_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
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
import { Dns, HttpClient, Logger, Request, Response, StringUtil, TimeUnit, Utils, X509TrustManager } from '@ohos/httpclient';
import connection from '@ohos.net.connection';
import { Utils as GetCAUtils } from "../utils/Utils";
import certFramework from '@ohos.security.cert';
import base64 from 'base64-js';
/**
 * 自定义证书配置双向证书的验证
 */
const TAG: string = "customCertificate_Bidirectional";
class bidirectionalCustomCertificate extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__url = new ObservedPropertySimple("https://1.94.37.200:8443/user/getUserByUuid?userUuid=1", this, "url");
        this.__unSecureUrl = new ObservedPropertySimple("http://106.15.92.248:9090/login.jsp", this, "unSecureUrl");
        this.__result = new ObservedPropertySimple("响应结果", this, "result");
        this.ca = "noPassword/ca.crt";
        this.clientKey = "noPassword/clientKey.crt";
        this.clientCert = "noPassword/clientCer.crt";
        this.unSecureCa = 'ca.crt';
        this.unSecureKey = 'client_rsa_private.pem.unsecure';
        this.unSecureCert = 'client.crt';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: bidirectionalCustomCertificate_Params) {
        if (params.url !== undefined) {
            this.url = params.url;
        }
        if (params.unSecureUrl !== undefined) {
            this.unSecureUrl = params.unSecureUrl;
        }
        if (params.result !== undefined) {
            this.result = params.result;
        }
        if (params.ca !== undefined) {
            this.ca = params.ca;
        }
        if (params.clientKey !== undefined) {
            this.clientKey = params.clientKey;
        }
        if (params.clientCert !== undefined) {
            this.clientCert = params.clientCert;
        }
        if (params.unSecureCa !== undefined) {
            this.unSecureCa = params.unSecureCa;
        }
        if (params.unSecureKey !== undefined) {
            this.unSecureKey = params.unSecureKey;
        }
        if (params.unSecureCert !== undefined) {
            this.unSecureCert = params.unSecureCert;
        }
    }
    aboutToBeDeleted() {
        this.__url.aboutToBeDeleted();
        this.__unSecureUrl.aboutToBeDeleted();
        this.__result.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __url: ObservedPropertySimple<string>;
    get url() {
        return this.__url.get();
    }
    set url(newValue: string) {
        this.__url.set(newValue);
    }
    private __unSecureUrl: ObservedPropertySimple<string>;
    get unSecureUrl() {
        return this.__unSecureUrl.get();
    }
    set unSecureUrl(newValue: string) {
        this.__unSecureUrl.set(newValue);
    }
    private __result: ObservedPropertySimple<string>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: string) {
        this.__result.set(newValue);
    }
    private ca;
    private clientKey;
    private clientCert;
    private unSecureCa;
    private unSecureKey;
    private unSecureCert;
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Row.create();
        Row.height('10%');
        Row.width('100%');
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
        Row.pop();
        TextInput.create({ text: this.url, placeholder: '请输入URL' });
        TextInput.placeholderColor("#ffffff");
        TextInput.caretColor(Color.Blue);
        TextInput.height("150px");
        TextInput.fontSize("18fp");
        TextInput.onChange((value: string) => {
            this.url = value;
        });
        Button.createWithLabel('GET请求1：校验通过请求');
        Button.width('80%');
        Button.height('80px');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick(async (event: ClickEvent) => {
            Logger.info(TAG, 'HttpClient begin');
            let client: HttpClient = new HttpClient
                .Builder()
                .dns(new CustomDns())
                .setConnectTimeout(10, TimeUnit.SECONDS)
                .setReadTimeout(10, TimeUnit.SECONDS)
                .build();
            Logger.info(TAG, 'HttpClient end');
            let context: Context = getContext();
            let CA: string = await new GetCAUtils().getCA(this.ca, context);
            let clientKey: string = await new GetCAUtils().getCA(this.clientKey, context);
            let clientCert: string = await new GetCAUtils().getCA(this.clientCert, context);
            Logger.info(TAG, 'CA:', JSON.stringify(CA));
            Logger.info(TAG, 'clientKey:', JSON.stringify(clientKey));
            Logger.info(TAG, 'clientCert:', JSON.stringify(clientCert));
            let request: Request = new Request.Builder()
                .url(this.url)
                .method('GET')
                .ca([CA])
                .key(clientKey)
                .cert(clientCert)
                .build();
            Logger.info(TAG, 'request end');
            client.newCall(request)
                .checkCertificate(new SslCertificateManagerSuccess())
                .enqueue((result: Response) => {
                this.result = "自定义证书return success, result: " + JSON.stringify(JSON.parse(JSON.stringify(result)), null, 4);
                Logger.info(TAG, "自定义证书return success, result: " + JSON.stringify(JSON.parse(JSON.stringify(result)), null, 4));
            }, (err: Response) => {
                this.result = "自定义证书return failed, result: " + JSON.stringify(err);
                Logger.info(TAG, "自定义证书return failed, result: ", JSON.stringify(err));
            });
        });
        Button.pop();
        Button.createWithLabel('GET请求2：校验失败拦截请求');
        Button.width('80%');
        Button.height('80px');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick(async (event: ClickEvent) => {
            Logger.info(TAG, 'HttpClient begin');
            let client: HttpClient = new HttpClient
                .Builder()
                .dns(new CustomDns())
                .setConnectTimeout(10, TimeUnit.SECONDS)
                .setReadTimeout(10, TimeUnit.SECONDS)
                .build();
            Logger.info(TAG, 'HttpClient end');
            let context: Context = getContext();
            let CA: string = await new GetCAUtils().getCA(this.ca, context);
            let clientKey: string = await new GetCAUtils().getCA(this.clientKey, context);
            let clientCert: string = await new GetCAUtils().getCA(this.clientCert, context);
            Logger.info(TAG, 'CA:', JSON.stringify(CA));
            Logger.info(TAG, 'clientKey:', JSON.stringify(clientKey));
            Logger.info(TAG, 'clientCert:', JSON.stringify(clientCert));
            let request: Request = new Request.Builder()
                .url(this.url)
                .method('GET')
                .ca([CA])
                .key(clientKey)
                .cert(clientCert)
                .build();
            Logger.info(TAG, 'request end');
            client.newCall(request)
                .checkCertificate(new SslCertificateManagerFail())
                .enqueue((result: Response) => {
                this.result = "自定义证书return success, result: " + JSON.stringify(JSON.parse(JSON.stringify(result)), null, 4);
                Logger.info(TAG, "自定义证书return success, result: " + JSON.stringify(JSON.parse(JSON.stringify(result)), null, 4));
            }, (err: Response) => {
                this.result = "自定义证书return failed, result: " + JSON.stringify(err);
                Logger.info(TAG, "自定义证书return failed, result: ", JSON.stringify(err));
            });
        });
        Button.pop();
        TextInput.create({ text: this.unSecureUrl, placeholder: '请输入URL' });
        TextInput.placeholderColor("#ffffff");
        TextInput.caretColor(Color.Blue);
        TextInput.height("150px");
        TextInput.fontSize("18fp");
        TextInput.onChange((value: string) => {
            this.unSecureUrl = value;
        });
        Button.createWithLabel('GET请求1：校验通过请求');
        Button.width('80%');
        Button.height('80px');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick(async (event: ClickEvent) => {
            Logger.info(TAG, 'HttpClient begin');
            let client: HttpClient = new HttpClient
                .Builder()
                .dns(new UnSecureDns())
                .setConnectTimeout(10, TimeUnit.SECONDS)
                .setReadTimeout(10, TimeUnit.SECONDS)
                .build();
            Logger.info(TAG, 'HttpClient end');
            let context: Context = getContext();
            let unSecureCa: string = await new GetCAUtils().getCA(this.unSecureCa, context);
            let unSecureKey: string = await new GetCAUtils().getCA(this.unSecureKey, context);
            let unSecureCert: string = await new GetCAUtils().getCA(this.unSecureCert, context);
            Logger.info(TAG, 'unSecureCa:', JSON.stringify(unSecureCa));
            Logger.info(TAG, 'unSecureKey:', JSON.stringify(unSecureKey));
            Logger.info(TAG, 'unSecureCert:', JSON.stringify(unSecureCert));
            let request: Request = new Request.Builder()
                .url(this.unSecureUrl)
                .method('GET')
                .ca([unSecureCa])
                .key(unSecureKey)
                .cert(unSecureCert)
                .build();
            Logger.info(TAG, 'request end');
            client.newCall(request)
                .checkCertificate(new SslCertificateManagerSuccess())
                .enqueue((result: Response) => {
                this.result = "自定义证书return success, result: " + JSON.stringify(JSON.parse(JSON.stringify(result)), null, 4);
                Logger.info(TAG, "自定义证书return success, result: " + JSON.stringify(JSON.parse(JSON.stringify(result)), null, 4));
            }, (err: Response) => {
                this.result = "自定义证书return failed, result: " + JSON.stringify(err);
                Logger.info(TAG, "自定义证书return failed, result: ", JSON.stringify(err));
            });
        });
        Button.pop();
        Button.createWithLabel('GET请求2：校验失败拦截请求');
        Button.width('80%');
        Button.height('80px');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick(async (event: ClickEvent) => {
            Logger.info(TAG, 'HttpClient begin');
            let client: HttpClient = new HttpClient
                .Builder()
                .dns(new UnSecureDns())
                .setConnectTimeout(10, TimeUnit.SECONDS)
                .setReadTimeout(10, TimeUnit.SECONDS)
                .build();
            Logger.info(TAG, 'HttpClient end');
            let context: Context = getContext();
            let unSecureCa: string = await new GetCAUtils().getCA(this.unSecureCa, context);
            let unSecureKey: string = await new GetCAUtils().getCA(this.unSecureKey, context);
            let unSecureCert: string = await new GetCAUtils().getCA(this.unSecureCert, context);
            Logger.info(TAG, 'unSecureCa:', JSON.stringify(unSecureCa));
            Logger.info(TAG, 'unSecureKey:', JSON.stringify(unSecureKey));
            Logger.info(TAG, 'unSecureCert:', JSON.stringify(unSecureCert));
            let request: Request = new Request.Builder()
                .url(this.unSecureUrl)
                .method('GET')
                .ca([unSecureCa])
                .key(unSecureKey)
                .cert(unSecureCert)
                .build();
            Logger.info(TAG, 'request end');
            client.newCall(request)
                .checkCertificate(new SslCertificateManagerFail())
                .enqueue((result: Response) => {
                this.result = "自定义证书return success, result: " + JSON.stringify(JSON.parse(JSON.stringify(result)), null, 4);
                Logger.info(TAG, "自定义证书return success, result: " + JSON.stringify(JSON.parse(JSON.stringify(result)), null, 4));
            }, (err: Response) => {
                this.result = "自定义证书return failed, result: " + JSON.stringify(err);
                Logger.info(TAG, "自定义证书return failed, result: ", JSON.stringify(err));
            });
        });
        Button.pop();
        Scroll.create();
        Scroll.width('100%');
        Scroll.layoutWeight(1);
        Column.create();
        Text.create(this.result);
        Text.width('80%');
        Text.fontSize("18fp");
        Text.margin(10);
        Text.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
// 1.94.37.200不支持DNS的解析，手动配置一个address，避免调用DNS解析的时候报错
export class CustomDns implements Dns {
    async lookup(hostname: string): Promise<Array<connection.NetAddress>> {
        Logger.info(TAG, 'CustomDns begin here');
        return await new Promise((resolve, reject) => {
            let netAddress: Array<connection.NetAddress> = [{ 'address': '1.94.37.200', 'family': 1, 'port': 8443 }];
            resolve(netAddress);
        });
    }
}
// 106.15.92.248不支持DNS的解析，手动配置一个address，避免调用DNS解析的时候报错
export class UnSecureDns implements Dns {
    async lookup(hostname: string): Promise<Array<connection.NetAddress>> {
        Logger.info(TAG, 'unSecureDns begin here');
        return await new Promise((resolve, reject) => {
            let netAddress: Array<connection.NetAddress> = [{ 'address': '106.15.92.248', 'family': 1, 'port': 9090 }];
            resolve(netAddress);
        });
    }
}
// 自定义双向证书校验成功的
export class SslCertificateManagerSuccess implements X509TrustManager {
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
        let tbs = X509Certificate.getItem(certFramework.CertItemType.CERT_ITEM_TYPE_TBS).data; // 获取X509证书TBS(to be signed)
        Logger.info(TAG, 'tbs: ', base64.fromByteArray(tbs));
        let pubKey = X509Certificate.getItem(certFramework.CertItemType.CERT_ITEM_TYPE_PUBLIC_KEY); // 获取X509证书公钥.
        Logger.info(TAG, 'pubKey: ', base64.fromByteArray(pubKey.data));
        let extensions = X509Certificate.getItem(certFramework.CertItemType.CERT_ITEM_TYPE_EXTENSIONS).data;
        Logger.info(TAG, 'extensions: ', base64.fromByteArray(extensions));
    }
}
export class SslCertificateManagerFail implements X509TrustManager {
    checkServerTrusted(X509Certificate: certFramework.X509Cert): void {
        Logger.info(TAG, 'Get Server Trusted X509Certificate');
        // 时间校验失败的设置值
        let date = '201001000001Z';
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
        let tbs = X509Certificate.getItem(certFramework.CertItemType.CERT_ITEM_TYPE_TBS).data; // 获取X509证书TBS(to be signed)
        Logger.info(TAG, 'tbs: ', base64.fromByteArray(tbs));
        let pubKey = X509Certificate.getItem(certFramework.CertItemType.CERT_ITEM_TYPE_PUBLIC_KEY); // 获取X509证书公钥.
        Logger.info(TAG, 'pubKey: ', base64.fromByteArray(pubKey.data));
        let extensions = X509Certificate.getItem(certFramework.CertItemType.CERT_ITEM_TYPE_EXTENSIONS).data;
        Logger.info(TAG, 'extensions: ', base64.fromByteArray(extensions));
    }
}
loadDocument(new bidirectionalCustomCertificate("1", undefined, {}));
