interface Index_Params {
    coapGet?: string;
    getIp?: string;
    coapPut?: string;
    coapDelete?: string;
    coapUri?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import { CoapClient, CoapRequestMethod, CoapRequestType, CoapResponseCode, ContentFormat } from '@ohos/coap';
import connection from '@ohos.net.connection';
import cryptoFramework from '@ohos.security.cryptoFramework';
const CHARS_PER_BYTE: number = 2;
const BITS_PER_CHAR: number = 4;
const MAX_FOUR_BIT_VALUE: number = 0x0F;
const MAX_BYTE_VALUE: number = 0xFF;
const HEX_ARRAY: Array<string> = '0123456789abcdef'.split("");
function uint8ArrayToHexString(bytes: Uint8Array): string {
    if (!bytes || bytes.length == 0) {
        return "";
    }
    let hexChars: Array<string> = new Array(bytes.length + bytes.length);
    for (let index = 0; index < bytes.length; index++) {
        let value: number = bytes[index] & MAX_BYTE_VALUE;
        // byte的高4bit
        hexChars[index * CHARS_PER_BYTE] = HEX_ARRAY[value >>> BITS_PER_CHAR];
        // byte的低4bit
        hexChars[index * CHARS_PER_BYTE + 1] = HEX_ARRAY[value & MAX_FOUR_BIT_VALUE];
    }
    return hexChars.join("");
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__coapGet = new ObservedPropertySimple('coapGet', this, "coapGet");
        this.__getIp = new ObservedPropertySimple('getIp', this, "getIp");
        this.__coapPut = new ObservedPropertySimple('coapPut', this, "coapPut");
        this.__coapDelete = new ObservedPropertySimple('coapDelete', this, "coapDelete");
        this.__coapUri = new ObservedPropertySimple('', this, "coapUri");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.coapGet !== undefined) {
            this.coapGet = params.coapGet;
        }
        if (params.getIp !== undefined) {
            this.getIp = params.getIp;
        }
        if (params.coapPut !== undefined) {
            this.coapPut = params.coapPut;
        }
        if (params.coapDelete !== undefined) {
            this.coapDelete = params.coapDelete;
        }
        if (params.coapUri !== undefined) {
            this.coapUri = params.coapUri;
        }
    }
    aboutToBeDeleted() {
        this.__coapGet.aboutToBeDeleted();
        this.__getIp.aboutToBeDeleted();
        this.__coapPut.aboutToBeDeleted();
        this.__coapDelete.aboutToBeDeleted();
        this.__coapUri.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __coapGet: ObservedPropertySimple<string>;
    get coapGet() {
        return this.__coapGet.get();
    }
    set coapGet(newValue: string) {
        this.__coapGet.set(newValue);
    }
    private __getIp: ObservedPropertySimple<string>;
    get getIp() {
        return this.__getIp.get();
    }
    set getIp(newValue: string) {
        this.__getIp.set(newValue);
    }
    private __coapPut: ObservedPropertySimple<string>;
    get coapPut() {
        return this.__coapPut.get();
    }
    set coapPut(newValue: string) {
        this.__coapPut.set(newValue);
    }
    private __coapDelete: ObservedPropertySimple<string>;
    get coapDelete() {
        return this.__coapDelete.get();
    }
    set coapDelete(newValue: string) {
        this.__coapDelete.set(newValue);
    }
    private __coapUri: ObservedPropertySimple<string>;
    get coapUri() {
        return this.__coapUri.get();
    }
    set coapUri(newValue: string) {
        this.__coapUri.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        TextInput.create();
        TextInput.fontSize(18);
        TextInput.fontWeight(FontWeight.Bold);
        TextInput.onChange((value) => {
            this.coapUri = value;
        });
        Text.create(this.coapGet);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            CoapClient.setNativeLogOpen(true);
            let coapClient = new CoapClient();
            let coapGet = coapClient.request(this.coapUri, CoapRequestMethod.GET, CoapRequestType.COAP_MESSAGE_CON);
            console.log("libcoap get test");
            coapGet.then((data) => {
                if (data.code == CoapResponseCode.SUCCESS) {
                    console.log("libcoap get:" + data.message[0]);
                }
                else {
                    console.log("libcoap get code:" + data.code);
                    console.log("libcoap get error message:" + data.message[0]);
                }
            });
        });
        Text.pop();
        Text.create(this.coapPut);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(async () => {
            let coapClient = new CoapClient();
            coapClient.setPort(5683);
            coapClient.setFormat(ContentFormat.PLAIN);
            //payload test
            coapClient.setPayload("22");
            coapClient.setWaitSecond(3);
            let rand: cryptoFramework.Random = cryptoFramework.createRandom();
            let bytesBlob: cryptoFramework.DataBlob = await rand.generateRandom(8);
            console.log("libcoap bytes:" + bytesBlob.data.join());
            let tokenStr: string = uint8ArrayToHexString(bytesBlob.data);
            console.log("libcoap token:" + tokenStr);
            coapClient.setToken(bytesBlob.data);
            let coapPut = coapClient.request(this.coapUri, CoapRequestMethod.PUT, CoapRequestType.COAP_MESSAGE_CON);
            coapPut.then((data) => {
                if (data.code == CoapResponseCode.SUCCESS) {
                    console.log("libcoap put message:" + data.message[0]);
                }
            });
        });
        Text.pop();
        Text.create(this.getIp);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let that = this;
            connection.getDefaultNet((error, netHandle) => {
                connection.getConnectionProperties(netHandle).then((info) => {
                    if (info && info.linkAddresses.length > 0) {
                        for (let i = 0; i < info.linkAddresses.length; i++) {
                            if (info.linkAddresses[i].address.address.includes(".")) {
                                that.getIp = info.linkAddresses[i].address.address;
                                break;
                            }
                        }
                    }
                });
            });
        });
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
