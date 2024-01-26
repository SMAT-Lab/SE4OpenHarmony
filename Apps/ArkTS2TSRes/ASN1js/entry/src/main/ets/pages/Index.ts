interface Index_Params {
    strPrototypeText?: string;
    strEncodingText?: string;
    strDecodingText?: string;
    scroller?: Scroller;
    contentScroller?: Scroller;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/**
 * BSD License
 *
 * Copyright (c) 2023 Huawei Device Co., Ltd. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * * Neither the name Facebook nor the names of its contributors may be used to
 * endorse or promote products derived from this software without specific
 * prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import asn1js from "@fortanix/asn1js";
import { bufferToHexCodes } from "pvutils";
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__strPrototypeText = new ObservedPropertySimple("", this, "strPrototypeText");
        this.__strEncodingText = new ObservedPropertySimple("", this, "strEncodingText");
        this.__strDecodingText = new ObservedPropertySimple("", this, "strDecodingText");
        this.scroller = new Scroller();
        this.contentScroller = new Scroller();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.strPrototypeText !== undefined) {
            this.strPrototypeText = params.strPrototypeText;
        }
        if (params.strEncodingText !== undefined) {
            this.strEncodingText = params.strEncodingText;
        }
        if (params.strDecodingText !== undefined) {
            this.strDecodingText = params.strDecodingText;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.contentScroller !== undefined) {
            this.contentScroller = params.contentScroller;
        }
    }
    aboutToBeDeleted() {
        this.__strPrototypeText.aboutToBeDeleted();
        this.__strEncodingText.aboutToBeDeleted();
        this.__strDecodingText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __strPrototypeText: ObservedPropertySimple<string>;
    get strPrototypeText() {
        return this.__strPrototypeText.get();
    }
    set strPrototypeText(newValue: string) {
        this.__strPrototypeText.set(newValue);
    }
    private __strEncodingText: ObservedPropertySimple<string>;
    get strEncodingText() {
        return this.__strEncodingText.get();
    }
    set strEncodingText(newValue: string) {
        this.__strEncodingText.set(newValue);
    }
    private __strDecodingText: ObservedPropertySimple<string>;
    get strDecodingText() {
        return this.__strDecodingText.get();
    }
    set strDecodingText(newValue: string) {
        this.__strDecodingText.set(newValue);
    }
    private scroller: Scroller;
    private contentScroller: Scroller;
    render() {
        Column.create();
        Column.height('100%');
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Horizontal);
        Scroll.height(120);
        Row.create();
        Row.alignItems(VerticalAlign.Center);
        Row.justifyContent(FlexAlign.Center);
        Row.height(200);
        Button.createWithLabel("Boolean BER");
        Button.fontSize(18);
        Button.height("45vp");
        Button.onClick((event) => {
            console.log("sasa:Boolean click");
            const asn: any = new asn1js.Boolean({
                value: true,
            });
            this.berHandle(asn, "Boolean");
        });
        Button.margin({ bottom: "20vp", left: "20vp" });
        Button.pop();
        Button.createWithLabel("BmpString BER");
        Button.fontSize(18);
        Button.height("45vp");
        Button.onClick((event) => {
            console.log("sasa:BmpString click");
            const testValue = "test message текст";
            const asn: any = new asn1js.BmpString({
                value: testValue,
            });
            this.berHandle(asn, "BmpString");
        });
        Button.margin({ bottom: "20vp", left: "20vp" });
        Button.pop();
        Button.createWithLabel("BitString BER");
        Button.fontSize(18);
        Button.height("45vp");
        Button.onClick((event) => {
            console.log("sasa:BitString click");
            const asn: any = new asn1js.BitString({
                value: [
                    new asn1js.BitString({
                        valueHex: new Uint8Array([0x01])
                    }),
                    new asn1js.BitString({
                        valueHex: new Uint8Array([0x02])
                    })
                ]
            });
            this.berHandle(asn, "BitString");
        });
        Button.margin({ bottom: "20vp", left: "20vp" });
        Button.pop();
        Button.createWithLabel("Integer BER");
        Button.fontSize(18);
        Button.height("45vp");
        Button.onClick((event) => {
            console.log("sasa:Integer click");
            const asn: any = new asn1js.Integer({
                value: 97196,
                valueHex: new Uint8Array([0x01, 0x7b, 0xac]),
            });
            this.berHandle(asn, "Integer");
        });
        Button.margin({ bottom: "20vp", left: "20vp" });
        Button.pop();
        Button.createWithLabel("CharacterString BER");
        Button.fontSize(18);
        Button.height("45vp");
        Button.onClick((event) => {
            console.log("sasa:CharacterString click");
            const testString = "some string";
            const asn: any = new asn1js.CharacterString({
                value: testString,
            });
            this.berHandle(asn, "CharacterString");
        });
        Button.margin({ bottom: "20vp", left: "20vp" });
        Button.pop();
        Button.createWithLabel("UniversalString BER");
        Button.fontSize(18);
        Button.height("45vp");
        Button.onClick((event) => {
            console.log("sasa:UniversalString click");
            const testString = "My test text";
            const asn: any = new asn1js.UniversalString({
                value: testString,
            });
            this.berHandle(asn, "UniversalString");
        });
        Button.margin({ bottom: "20vp", left: "20vp" });
        Button.pop();
        Button.createWithLabel("Utf8String BER");
        Button.fontSize(18);
        Button.height("45vp");
        Button.onClick((event) => {
            console.log("sasa:Utf8String click");
            const testString = "My test Utf8String";
            const asn: any = new asn1js.Utf8String({
                value: testString,
            });
            this.berHandle(asn, "Utf8String");
        });
        Button.margin({ bottom: "20vp", left: "20vp" });
        Button.pop();
        Button.createWithLabel("DATE BER");
        Button.fontSize(18);
        Button.height("45vp");
        Button.onClick((event) => {
            console.log("sasa:DATE click");
            const testString = "2000-01-02";
            const asn: any = new asn1js.DATE({
                value: testString,
            });
            this.berHandle(asn, "DATE");
        });
        Button.margin({ bottom: "20vp", left: "20vp" });
        Button.pop();
        Button.createWithLabel("DateTime BER");
        Button.fontSize(18);
        Button.height("45vp");
        Button.onClick((event) => {
            console.log("sasa:DateTime click");
            const testString = "2000-01-02 12:00";
            const asn: any = new asn1js.DateTime({
                value: testString,
            });
            this.berHandle(asn, "DateTime");
        });
        Button.margin({ bottom: "20vp", left: "20vp" });
        Button.pop();
        Button.createWithLabel("Duration BER");
        Button.fontSize(18);
        Button.height("45vp");
        Button.onClick((event) => {
            console.log("sasa:Duration click");
            const testString = "1000";
            const asn: any = new asn1js.Duration({
                value: testString,
            });
            this.berHandle(asn, "Duration");
        });
        Button.margin({ bottom: "20vp", left: "20vp" });
        Button.pop();
        Button.createWithLabel("GeneralString BER");
        Button.fontSize(18);
        Button.height("45vp");
        Button.onClick((event) => {
            const testString = "some text";
            const asn: any = new asn1js.GeneralString({
                value: testString,
            });
            this.berHandle(asn, "GeneralString");
        });
        Button.margin({ bottom: "20vp", left: "20vp" });
        Button.pop();
        Button.createWithLabel("GraphicString BER");
        Button.fontSize(18);
        Button.height("45vp");
        Button.onClick((event) => {
            const testString = "some text";
            const asn: any = new asn1js.GraphicString({
                value: testString,
            });
            this.berHandle(asn, "GraphicString");
        });
        Button.margin({ bottom: "20vp", left: "20vp" });
        Button.pop();
        Button.createWithLabel("NumericString BER");
        Button.fontSize(18);
        Button.height("45vp");
        Button.onClick((event) => {
            const testString = "1234567890";
            const asn: any = new asn1js.NumericString({
                value: testString,
            });
            this.berHandle(asn, "NumericString");
        });
        Button.margin({ bottom: "20vp", left: "20vp" });
        Button.pop();
        Button.createWithLabel("ObjectIdentifier BER");
        Button.fontSize(18);
        Button.height("45vp");
        Button.onClick((event) => {
            const testString = "0.2.3.4.5";
            const asn: any = new asn1js.ObjectIdentifier({
                value: testString,
            });
            this.berHandle(asn, "ObjectIdentifier");
        });
        Button.margin({ bottom: "20vp", left: "20vp" });
        Button.pop();
        Button.createWithLabel("OctetString BER");
        Button.fontSize(18);
        Button.height("45vp");
        Button.onClick((event) => {
            const asn: any = new asn1js.OctetString({
                value: [
                    new asn1js.OctetString({
                        valueHex: new Uint8Array([0x01])
                    }),
                    new asn1js.OctetString({
                        valueHex: new Uint8Array([0x02])
                    }),
                ]
            });
            this.berHandle(asn, "OctetString");
        });
        Button.margin({ bottom: "20vp", left: "20vp" });
        Button.pop();
        Button.createWithLabel("Null BER");
        Button.fontSize(18);
        Button.height("45vp");
        Button.onClick((event) => {
            const asn: any = new asn1js.Null({
                name: "block2",
            });
            this.berHandle(asn, "Null");
        });
        Button.margin({ bottom: "20vp", left: "20vp" });
        Button.pop();
        Button.createWithLabel("Sequence BER");
        Button.fontSize(18);
        Button.height("45vp");
        Button.onClick((event) => {
            const asn: any = new asn1js.Sequence({
                name: "block1",
                value: [
                    new asn1js.Null({
                        name: "block2"
                    }),
                    new asn1js.Integer({
                        name: "block3",
                        optional: true
                    }),
                ]
            });
            this.berHandle(asn, "Sequence");
        });
        Button.margin({ bottom: "20vp", left: "20vp" });
        Button.pop();
        Row.pop();
        Scroll.pop();
        Scroll.create(this.contentScroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.width('100%');
        Scroll.height(620);
        Column.create();
        Text.create(this.strPrototypeText);
        Text.fontSize(16);
        Text.margin({ top: "20vp" });
        Text.pop();
        Text.create(this.strEncodingText);
        Text.fontSize(16);
        Text.margin({ top: "20vp" });
        Text.pop();
        Text.create(this.strDecodingText);
        Text.fontSize(16);
        Text.margin({ top: "20vp" });
        Text.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    berHandle(asn: any, name: string) {
        const ber: any = asn.toBER();
        const asnParsed: any = asn1js.fromBER(ber);
        this.strPrototypeText = name + "组装数据：" + JSON.stringify(asn);
        this.strEncodingText = "toBER ArrayBuffer数据转换十六进制：" + bufferToHexCodes(ber);
        this.strDecodingText = "fromBER数据：" + JSON.stringify(asnParsed);
        console.debug(this.strPrototypeText + ":" + this.strEncodingText + ":" + this.strDecodingText);
    }
}
loadDocument(new Index("1", undefined, {}));
