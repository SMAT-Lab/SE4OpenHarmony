interface certificatePinner_Params {
    url?: string | undefined;
    result?: string | undefined;
    hostname?: string | undefined;
    successPin?: string | undefined;
    failPin?: string | undefined;
    ca?: string | undefined;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "certificate_pinner_" + ++__generate__Id;
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
import { Dns, HttpClient, Request, Response, TimeUnit, CertificatePinnerBuilder, Logger } from '@ohos/httpclient';
import connection from '@ohos.net.connection';
import { Utils } from "../utils/Utils";
import { BusinessError } from '@ohos.base';
import { CertificatePinner } from '@ohos/httpclient/src/main/ets/CertificatePinner';
class certificatePinner extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__url = new ObservedPropertyObject('https://1.94.37.200:8080/user/getUserByUuid?userUuid=1', this, "url");
        this.__result = new ObservedPropertyObject('响应结果', this, "result");
        this.__hostname = new ObservedPropertyObject('1.94.37.200', this, "hostname");
        this.__successPin = new ObservedPropertyObject('sha1/f58c753eff28a6c9847775c4bc90f023b44dfd41', this, "successPin");
        this.__failPin = new ObservedPropertyObject('sha1/f58c753eff28a6c', this, "failPin");
        this.ca = 'caPin.crt';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: certificatePinner_Params) {
        if (params.url !== undefined) {
            this.url = params.url;
        }
        if (params.result !== undefined) {
            this.result = params.result;
        }
        if (params.hostname !== undefined) {
            this.hostname = params.hostname;
        }
        if (params.successPin !== undefined) {
            this.successPin = params.successPin;
        }
        if (params.failPin !== undefined) {
            this.failPin = params.failPin;
        }
        if (params.ca !== undefined) {
            this.ca = params.ca;
        }
    }
    aboutToBeDeleted() {
        this.__url.aboutToBeDeleted();
        this.__result.aboutToBeDeleted();
        this.__hostname.aboutToBeDeleted();
        this.__successPin.aboutToBeDeleted();
        this.__failPin.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __url: ObservedPropertyObject<string | undefined>;
    get url() {
        return this.__url.get();
    }
    set url(newValue: string | undefined) {
        this.__url.set(newValue);
    }
    private __result: ObservedPropertyObject<string | undefined>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: string | undefined) {
        this.__result.set(newValue);
    }
    private __hostname: ObservedPropertyObject<string | undefined>;
    get hostname() {
        return this.__hostname.get();
    }
    set hostname(newValue: string | undefined) {
        this.__hostname.set(newValue);
    }
    private __successPin: ObservedPropertyObject<string | undefined>;
    get successPin() {
        return this.__successPin.get();
    }
    set successPin(newValue: string | undefined) {
        this.__successPin.set(newValue);
    }
    private __failPin: ObservedPropertyObject<string | undefined>;
    get failPin() {
        return this.__failPin.get();
    }
    set failPin(newValue: string | undefined) {
        this.__failPin.set(newValue);
    }
    private ca: string | undefined;
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Row.create();
        Row.height('10%');
        Row.width('100%');
        Navigator.create({
            target: '',
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
        TextInput.placeholderColor('#ffffff');
        TextInput.caretColor(Color.Blue);
        TextInput.height('150px');
        TextInput.fontSize('18fp');
        TextInput.onChange((value: string) => {
            this.url = value;
        });
        TextInput.margin(10);
        TextInput.create({ text: this.hostname, placeholder: '请输入hostname' });
        TextInput.placeholderColor('#ffffff');
        TextInput.caretColor(Color.Blue);
        TextInput.height('150px');
        TextInput.fontSize('18fp');
        TextInput.onChange((value: string) => {
            this.hostname = value;
        });
        TextInput.margin(10);
        TextInput.create({ text: this.successPin, placeholder: '请输入成功指纹' });
        TextInput.placeholderColor('#ffffff');
        TextInput.caretColor(Color.Blue);
        TextInput.height('150px');
        TextInput.fontSize('18fp');
        TextInput.onChange((value: string) => {
            this.successPin = value;
        });
        TextInput.margin(10);
        TextInput.create({ text: this.failPin, placeholder: '请输入失败指纹' });
        TextInput.placeholderColor('#ffffff');
        TextInput.caretColor(Color.Blue);
        TextInput.height('150px');
        TextInput.fontSize('18fp');
        TextInput.onChange((value: string) => {
            this.failPin = value;
        });
        TextInput.margin(10);
        Button.createWithLabel('发起请求-校验通过');
        Button.width('80%');
        Button.height('80px');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick(async () => {
            let certificatePinner: CertificatePinner | undefined = new CertificatePinnerBuilder()
                .add('1.94.37.200', ObservedObject.GetRawObject(this.successPin))
                .build();
            let client: HttpClient | undefined = new HttpClient
                .Builder()
                .dns(new CustomDns())
                .setConnectTimeout(10, TimeUnit.SECONDS)
                .setReadTimeout(10, TimeUnit.SECONDS)
                .build();
            let context: Context | undefined = getContext();
            let CA: string | undefined = await new Utils().getCA(this.ca, context);
            let request: Request | undefined = new Request.Builder()
                .url(ObservedObject.GetRawObject(this.url))
                .method('GET')
                .ca([CA])
                .build();
            client.newCall(request)
                .setCertificatePinner(certificatePinner)
                .enqueue((result: Response) => {
                this.result = '响应结果success' + JSON.stringify(JSON.parse(JSON.stringify(result)), null, 4);
                Logger.info('证书锁定---success---' + JSON.stringify(JSON.parse(JSON.stringify(result)), null, 4));
                certificatePinner = undefined;
                client = undefined;
                context = undefined;
                CA = undefined;
                request = undefined;
            }, (err: BusinessError) => {
                this.result = '响应结果fail' + JSON.stringify(err);
                Logger.info('证书锁定---failed--- ', JSON.stringify(err));
                certificatePinner = undefined;
                client = undefined;
                context = undefined;
                CA = undefined;
                request = undefined;
            });
        });
        Button.pop();
        Button.createWithLabel('发起请求-校验失败');
        Button.width('80%');
        Button.height('80px');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick(async () => {
            let certificatePinner: CertificatePinner | undefined = new CertificatePinnerBuilder()
                .add('1.94.37.200', ObservedObject.GetRawObject(this.failPin))
                .build();
            let client: HttpClient | undefined = new HttpClient
                .Builder()
                .dns(new CustomDns())
                .setConnectTimeout(10, TimeUnit.SECONDS)
                .setReadTimeout(10, TimeUnit.SECONDS)
                .build();
            let context: Context | undefined = getContext();
            let CA: string | undefined = await new Utils().getCA(this.ca, context);
            let request: Request | undefined = new Request.Builder()
                .url(ObservedObject.GetRawObject(this.url))
                .method('GET')
                .ca([CA])
                .build();
            client.newCall(request)
                .setCertificatePinner(certificatePinner)
                .enqueue((result: Response) => {
                this.result = '响应结果success' + JSON.stringify(JSON.parse(JSON.stringify(result)), null, 4);
                Logger.info('证书锁定---success---' + JSON.stringify(JSON.parse(JSON.stringify(result)), null, 4));
                certificatePinner = undefined;
                client = undefined;
                context = undefined;
                CA = undefined;
                request = undefined;
            }, (err: BusinessError) => {
                this.result = '响应结果fail' + JSON.stringify(err);
                Logger.info('证书锁定---failed--- ', JSON.stringify(err));
                certificatePinner = undefined;
                client = undefined;
                context = undefined;
                CA = undefined;
                request = undefined;
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
    aboutToDisappear(): void {
        this.url = undefined;
        this.result = undefined;
        this.hostname = undefined;
        this.successPin = undefined;
        this.failPin = undefined;
        this.ca = undefined;
    }
    Uint8ArrayToString(fileData: Uint8Array): string {
        let dataString = '';
        for (let i = 0; i < fileData.length; i++) {
            dataString += String.fromCharCode(fileData[i]);
        }
        return dataString;
    }
}
export class CustomDns implements Dns {
    async lookup(hostname: string): Promise<Array<connection.NetAddress>> {
        console.info('DNSTEST CustomDns begin here');
        return await new Promise((resolve, reject) => {
            let netAddress: Array<connection.NetAddress> = [{ 'address': '1.94.37.200', 'family': 1, 'port': 8080 }];
            ;
            resolve(netAddress);
        });
    }
    ;
}
loadDocument(new certificatePinner("1", undefined, {}));
