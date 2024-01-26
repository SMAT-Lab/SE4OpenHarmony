interface Index_Params {
    message?: string;
    strText?: string;
    serializeJsonText?: string;
    deserializeJsonText?: string;
    deserializeJsonTextBase64?: string;
    deserializeJsonTextHex?: string;
    deserializeJsonTextDer?: string;
    deserializeJsonTextDerS?: string;
    deserializeJsonTextDerD?: string;
    json?: ESObject | null;
    btnBase64Clicked?: boolean;
    btnHexClicked?: boolean;
    scroller?: Scroller;
    btn64Text?: string;
    btnHexText?: string;
    btnDerText?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Launcher_" + ++__generate__Id;
}
/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
import router from '@ohos.router';
import { JSONSerializer, JSONDeserializer, Universal } from '@ohos/asn1';
import { DERSerializer, DERDeserializer } from '@ohos/asn1-der';
import { btoa, atob } from 'Base64';
import { encode, decode } from 'hex-encode-decode';
import prompt from '@system.prompt';
let sequence: Universal.Sequence = new Universal.Sequence([
    new Universal.Integer(-Number.MAX_SAFE_INTEGER),
    new Universal.Integer(Number.MAX_SAFE_INTEGER),
    new Universal.Integer('424242424242424242424242424242424242'),
    new Universal.Null(),
    new Universal.Bool(true),
    new Universal.PrintableString('nice marmot'),
    new Universal.PrintableString('@#$%!&*()!_=&'),
]);
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('asn1 组装原数据：' + JSON.stringify(sequence), this, "message");
        this.__strText = new ObservedPropertySimple("", this, "strText");
        this.__serializeJsonText = new ObservedPropertySimple("", this, "serializeJsonText");
        this.__deserializeJsonText = new ObservedPropertySimple("", this, "deserializeJsonText");
        this.__deserializeJsonTextBase64 = new ObservedPropertySimple("ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz1234567890+/AA==!@#$%^&*()_-/][{}?:", this, "deserializeJsonTextBase64");
        this.__deserializeJsonTextHex = new ObservedPropertySimple("ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz1234567890+/AA==!@#$%^&*()_-/][{}?:", this, "deserializeJsonTextHex");
        this.__deserializeJsonTextDer = new ObservedPropertySimple("", this, "deserializeJsonTextDer");
        this.__deserializeJsonTextDerS = new ObservedPropertySimple("", this, "deserializeJsonTextDerS");
        this.__deserializeJsonTextDerD = new ObservedPropertySimple("", this, "deserializeJsonTextDerD");
        this.json = null;
        this.btnBase64Clicked = false;
        this.btnHexClicked = false;
        this.scroller = new Scroller();
        this.__btn64Text = new ObservedPropertySimple("base64 编码", this, "btn64Text");
        this.__btnHexText = new ObservedPropertySimple("Hex 编码", this, "btnHexText");
        this.__btnDerText = new ObservedPropertySimple("DER", this, "btnDerText");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.strText !== undefined) {
            this.strText = params.strText;
        }
        if (params.serializeJsonText !== undefined) {
            this.serializeJsonText = params.serializeJsonText;
        }
        if (params.deserializeJsonText !== undefined) {
            this.deserializeJsonText = params.deserializeJsonText;
        }
        if (params.deserializeJsonTextBase64 !== undefined) {
            this.deserializeJsonTextBase64 = params.deserializeJsonTextBase64;
        }
        if (params.deserializeJsonTextHex !== undefined) {
            this.deserializeJsonTextHex = params.deserializeJsonTextHex;
        }
        if (params.deserializeJsonTextDer !== undefined) {
            this.deserializeJsonTextDer = params.deserializeJsonTextDer;
        }
        if (params.deserializeJsonTextDerS !== undefined) {
            this.deserializeJsonTextDerS = params.deserializeJsonTextDerS;
        }
        if (params.deserializeJsonTextDerD !== undefined) {
            this.deserializeJsonTextDerD = params.deserializeJsonTextDerD;
        }
        if (params.json !== undefined) {
            this.json = params.json;
        }
        if (params.btnBase64Clicked !== undefined) {
            this.btnBase64Clicked = params.btnBase64Clicked;
        }
        if (params.btnHexClicked !== undefined) {
            this.btnHexClicked = params.btnHexClicked;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.btn64Text !== undefined) {
            this.btn64Text = params.btn64Text;
        }
        if (params.btnHexText !== undefined) {
            this.btnHexText = params.btnHexText;
        }
        if (params.btnDerText !== undefined) {
            this.btnDerText = params.btnDerText;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__strText.aboutToBeDeleted();
        this.__serializeJsonText.aboutToBeDeleted();
        this.__deserializeJsonText.aboutToBeDeleted();
        this.__deserializeJsonTextBase64.aboutToBeDeleted();
        this.__deserializeJsonTextHex.aboutToBeDeleted();
        this.__deserializeJsonTextDer.aboutToBeDeleted();
        this.__deserializeJsonTextDerS.aboutToBeDeleted();
        this.__deserializeJsonTextDerD.aboutToBeDeleted();
        this.__btn64Text.aboutToBeDeleted();
        this.__btnHexText.aboutToBeDeleted();
        this.__btnDerText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __strText: ObservedPropertySimple<string>;
    get strText() {
        return this.__strText.get();
    }
    set strText(newValue: string) {
        this.__strText.set(newValue);
    }
    private __serializeJsonText: ObservedPropertySimple<string>;
    get serializeJsonText() {
        return this.__serializeJsonText.get();
    }
    set serializeJsonText(newValue: string) {
        this.__serializeJsonText.set(newValue);
    }
    private __deserializeJsonText: ObservedPropertySimple<string>;
    get deserializeJsonText() {
        return this.__deserializeJsonText.get();
    }
    set deserializeJsonText(newValue: string) {
        this.__deserializeJsonText.set(newValue);
    }
    private __deserializeJsonTextBase64: ObservedPropertySimple<string>;
    get deserializeJsonTextBase64() {
        return this.__deserializeJsonTextBase64.get();
    }
    set deserializeJsonTextBase64(newValue: string) {
        this.__deserializeJsonTextBase64.set(newValue);
    }
    private __deserializeJsonTextHex: ObservedPropertySimple<string>;
    get deserializeJsonTextHex() {
        return this.__deserializeJsonTextHex.get();
    }
    set deserializeJsonTextHex(newValue: string) {
        this.__deserializeJsonTextHex.set(newValue);
    }
    private __deserializeJsonTextDer: ObservedPropertySimple<string>;
    get deserializeJsonTextDer() {
        return this.__deserializeJsonTextDer.get();
    }
    set deserializeJsonTextDer(newValue: string) {
        this.__deserializeJsonTextDer.set(newValue);
    }
    private __deserializeJsonTextDerS: ObservedPropertySimple<string>;
    get deserializeJsonTextDerS() {
        return this.__deserializeJsonTextDerS.get();
    }
    set deserializeJsonTextDerS(newValue: string) {
        this.__deserializeJsonTextDerS.set(newValue);
    }
    private __deserializeJsonTextDerD: ObservedPropertySimple<string>;
    get deserializeJsonTextDerD() {
        return this.__deserializeJsonTextDerD.get();
    }
    set deserializeJsonTextDerD(newValue: string) {
        this.__deserializeJsonTextDerD.set(newValue);
    }
    private json: any | null;
    private btnBase64Clicked: boolean;
    private btnHexClicked: boolean;
    private scroller: Scroller;
    private __btn64Text: ObservedPropertySimple<string>;
    get btn64Text() {
        return this.__btn64Text.get();
    }
    set btn64Text(newValue: string) {
        this.__btn64Text.set(newValue);
    }
    private __btnHexText: ObservedPropertySimple<string>;
    get btnHexText() {
        return this.__btnHexText.get();
    }
    set btnHexText(newValue: string) {
        this.__btnHexText.set(newValue);
    }
    private __btnDerText: ObservedPropertySimple<string>;
    get btnDerText() {
        return this.__btnDerText.get();
    }
    set btnDerText(newValue: string) {
        this.__btnDerText.set(newValue);
    }
    onPageShow() {
        // findType(1)
    }
    render() {
        Row.create();
        Row.height('100%');
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.width('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(16);
        Text.pop();
        Button.createWithLabel("asn1 序列化数据");
        Button.fontSize(16);
        Button.margin({ top: "20px" });
        Button.onClick((event) => {
            let serialize: JSONSerializer = new JSONSerializer();
            let startTime = new Date().getMilliseconds();
            console.info("asn1Demo-- start get JSONSerializer :" + startTime);
            this.json = serialize(sequence);
            let endTime = new Date().getMilliseconds();
            console.info("asn1Demo-- end get JSONSerializer time:" + (endTime));
            console.info("asn1Demo-- JSONSerializer time consuming:" + (endTime - startTime));
            this.serializeJsonText = JSON.stringify(this.json);
        });
        Button.pop();
        Text.create(this.serializeJsonText);
        Text.margin({ top: "20px" });
        Text.fontSize(16);
        Text.pop();
        Button.createWithLabel("asn1 反序列化数据");
        Button.fontSize(16);
        Button.margin({ top: "20px" });
        Button.onClick((event) => {
            if (!this.json) {
                prompt.showToast({ message: '先序列化数据', duration: 2000 });
                return;
            }
            const deserialize: JSONDeserializer = new JSONDeserializer();
            let startTime = new Date().getMilliseconds();
            console.info("asn1Demo-- start get JSONDeserializer :" + startTime);
            const asn1ObjectModel: any = deserialize(this.json);
            let endTime = new Date().getMilliseconds();
            console.info("asn1Demo-- end get JSONDeserializer time:" + (endTime));
            console.info("asn1Demo-- JSONDeserializer time consuming:" + (endTime - startTime));
            this.deserializeJsonText = JSON.stringify(asn1ObjectModel);
        });
        Button.pop();
        Text.create(this.deserializeJsonText);
        Text.margin({ top: "20px" });
        Text.fontSize(16);
        Text.pop();
        Text.create(this.deserializeJsonTextBase64);
        Text.margin({ top: "20px" });
        Text.fontSize(16);
        Text.pop();
        Button.createWithLabel(this.btn64Text);
        Button.fontSize(16);
        Button.margin({ top: "20px" });
        Button.onClick((event) => {
            let startTime = new Date().getMilliseconds();
            console.info("asn1Demo-- start get Base64 :" + startTime);
            if (!this.btnBase64Clicked) {
                this.deserializeJsonTextBase64 = btoa("ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz1234567890+/AA==!@#$%^&*()_-/][{}?:");
                this.btnBase64Clicked = true;
            }
            else {
                this.deserializeJsonTextBase64 = atob(this.deserializeJsonTextBase64);
                this.btnBase64Clicked = false;
            }
            this.btn64Text = this.btnBase64Clicked ? "base64 解码" : "base64 编码";
            let endTime = new Date().getMilliseconds();
            console.info("asn1Demo-- end get Base64 time:" + (endTime));
            console.info("asn1Demo-- Base64 time consuming:" + (endTime - startTime));
        });
        Button.pop();
        Text.create(this.deserializeJsonTextHex);
        Text.margin({ top: "20px" });
        Text.fontSize(16);
        Text.pop();
        Button.createWithLabel(this.btnHexText);
        Button.fontSize(16);
        Button.margin({ top: "20px" });
        Button.onClick((event) => {
            let startTime = new Date().getMilliseconds();
            console.info("asn1Demo-- start hex Base64 :" + startTime);
            if (!this.btnHexClicked) {
                this.deserializeJsonTextHex = encode("ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz1234567890+/AA==!@#$%^&*()_-/][{}?:");
                this.btnHexClicked = true;
            }
            else {
                this.deserializeJsonTextHex = decode(this.deserializeJsonTextHex);
                this.btnHexClicked = false;
            }
            this.btnHexText = this.btnHexClicked ? "Hex 解码" : "Hex 编码";
            let endTime = new Date().getMilliseconds();
            console.info("asn1Demo-- end get hex time:" + (endTime));
            console.info("asn1Demo-- hex time consuming:" + (endTime - startTime));
        });
        Button.pop();
        Text.create(this.deserializeJsonTextDer);
        Text.margin({ top: "20px" });
        Text.fontSize(16);
        Text.pop();
        Text.create(this.deserializeJsonTextDerS);
        Text.margin({ top: "20px" });
        Text.fontSize(16);
        Text.pop();
        Text.create(this.deserializeJsonTextDerD);
        Text.margin({ top: "20px" });
        Text.fontSize(16);
        Text.pop();
        Button.createWithLabel(this.btnDerText);
        Button.fontSize(16);
        Button.margin({ top: "20px" });
        Button.onClick((event) => {
            let startTime = new Date().getMilliseconds();
            console.info("asn1Demo-- der start get DERSerializer :" + startTime);
            const serialize: any = new DERSerializer();
            const asn1Sequence: any = new Universal.Sequence([
                new Universal.Integer(123),
                new Universal.PrintableString('Hello World'),
            ]);
            this.deserializeJsonTextDer = "DER 原抽象数据:" + JSON.stringify(asn1Sequence);
            const bufferContainingDEREncodedASN1: any = serialize(asn1Sequence);
            this.deserializeJsonTextDerS = "DER 序列化数据：" + JSON.stringify(bufferContainingDEREncodedASN1);
            let endTime = new Date().getMilliseconds();
            console.info("asn1Demo-- end get DERSerializer time:" + (endTime));
            console.info("asn1Demo-- DERSerializer time consuming:" + (endTime - startTime));
            let startTime1 = new Date().getMilliseconds();
            console.info("asn1Demo-- der start get DERDeserializer :" + startTime1);
            const deserialize: any = new DERDeserializer();
            const des: any = deserialize(bufferContainingDEREncodedASN1);
            let endTime1 = new Date().getMilliseconds();
            console.info("asn1Demo-- der end get DERDeserializer time:" + (endTime1));
            console.info("asn1Demo-- der DERDeserializer time consuming:" + (endTime1 - startTime1));
            this.deserializeJsonTextDerD = "DER 反序列化数据:" + JSON.stringify(des);
        });
        Button.pop();
        Button.createWithLabel("测试BER");
        Button.fontSize(16);
        Button.margin({ top: "20px" });
        Button.onClick((event) => {
            router.pushUrl({
                url: "pages/berTest"
            });
        });
        Button.pop();
        Column.pop();
        Scroll.pop();
        Row.pop();
    }
    aboutToAppear() {
        console.log("asnd1 aboutToAppear");
    }
}
loadDocument(new Index("1", undefined, {}));
