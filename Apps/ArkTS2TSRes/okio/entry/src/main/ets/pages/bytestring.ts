interface Bytestring_Params {
    decodeBase64Value?: string;
    decodeHexValue?: string;
    encodeUtf8Value?: string;
    ofOutPutValue?: string;
    asciiLowercaseValue?: string;
    asciiUppercaseValue?: string;
    byteArrayValue?: string;
    internalArrayValue?: string;
    hashCodeValue?: string;
    inputData?: string;
    inputDataLength?: string;
    compareToResult?: string;
    encodeBase64Value?: string;
    encodeHexValue?: string;
    encodeMD5HexValue?: string;
    scroller?: Scroller;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "bytestring_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import { ByteString } from '@ohos/okio';
import promptAction from '@ohos.promptAction';
class Bytestring extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__decodeBase64Value = new ObservedPropertySimple('', this, "decodeBase64Value");
        this.__decodeHexValue = new ObservedPropertySimple('', this, "decodeHexValue");
        this.__encodeUtf8Value = new ObservedPropertySimple('', this, "encodeUtf8Value");
        this.__ofOutPutValue = new ObservedPropertySimple('', this, "ofOutPutValue");
        this.__asciiLowercaseValue = new ObservedPropertySimple('', this, "asciiLowercaseValue");
        this.__asciiUppercaseValue = new ObservedPropertySimple('', this, "asciiUppercaseValue");
        this.__byteArrayValue = new ObservedPropertySimple('', this, "byteArrayValue");
        this.__internalArrayValue = new ObservedPropertySimple('', this, "internalArrayValue");
        this.__hashCodeValue = new ObservedPropertySimple('', this, "hashCodeValue");
        this.__inputData = new ObservedPropertySimple('', this, "inputData");
        this.__inputDataLength = new ObservedPropertySimple('', this, "inputDataLength");
        this.__compareToResult = new ObservedPropertySimple('', this, "compareToResult");
        this.__encodeBase64Value = new ObservedPropertySimple('', this, "encodeBase64Value");
        this.__encodeHexValue = new ObservedPropertySimple('', this, "encodeHexValue");
        this.__encodeMD5HexValue = new ObservedPropertySimple('', this, "encodeMD5HexValue");
        this.scroller = new Scroller();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Bytestring_Params) {
        if (params.decodeBase64Value !== undefined) {
            this.decodeBase64Value = params.decodeBase64Value;
        }
        if (params.decodeHexValue !== undefined) {
            this.decodeHexValue = params.decodeHexValue;
        }
        if (params.encodeUtf8Value !== undefined) {
            this.encodeUtf8Value = params.encodeUtf8Value;
        }
        if (params.ofOutPutValue !== undefined) {
            this.ofOutPutValue = params.ofOutPutValue;
        }
        if (params.asciiLowercaseValue !== undefined) {
            this.asciiLowercaseValue = params.asciiLowercaseValue;
        }
        if (params.asciiUppercaseValue !== undefined) {
            this.asciiUppercaseValue = params.asciiUppercaseValue;
        }
        if (params.byteArrayValue !== undefined) {
            this.byteArrayValue = params.byteArrayValue;
        }
        if (params.internalArrayValue !== undefined) {
            this.internalArrayValue = params.internalArrayValue;
        }
        if (params.hashCodeValue !== undefined) {
            this.hashCodeValue = params.hashCodeValue;
        }
        if (params.inputData !== undefined) {
            this.inputData = params.inputData;
        }
        if (params.inputDataLength !== undefined) {
            this.inputDataLength = params.inputDataLength;
        }
        if (params.compareToResult !== undefined) {
            this.compareToResult = params.compareToResult;
        }
        if (params.encodeBase64Value !== undefined) {
            this.encodeBase64Value = params.encodeBase64Value;
        }
        if (params.encodeHexValue !== undefined) {
            this.encodeHexValue = params.encodeHexValue;
        }
        if (params.encodeMD5HexValue !== undefined) {
            this.encodeMD5HexValue = params.encodeMD5HexValue;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    aboutToBeDeleted() {
        this.__decodeBase64Value.aboutToBeDeleted();
        this.__decodeHexValue.aboutToBeDeleted();
        this.__encodeUtf8Value.aboutToBeDeleted();
        this.__ofOutPutValue.aboutToBeDeleted();
        this.__asciiLowercaseValue.aboutToBeDeleted();
        this.__asciiUppercaseValue.aboutToBeDeleted();
        this.__byteArrayValue.aboutToBeDeleted();
        this.__internalArrayValue.aboutToBeDeleted();
        this.__hashCodeValue.aboutToBeDeleted();
        this.__inputData.aboutToBeDeleted();
        this.__inputDataLength.aboutToBeDeleted();
        this.__compareToResult.aboutToBeDeleted();
        this.__encodeBase64Value.aboutToBeDeleted();
        this.__encodeHexValue.aboutToBeDeleted();
        this.__encodeMD5HexValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __decodeBase64Value: ObservedPropertySimple<string>;
    get decodeBase64Value() {
        return this.__decodeBase64Value.get();
    }
    set decodeBase64Value(newValue: string) {
        this.__decodeBase64Value.set(newValue);
    }
    private __decodeHexValue: ObservedPropertySimple<string>;
    get decodeHexValue() {
        return this.__decodeHexValue.get();
    }
    set decodeHexValue(newValue: string) {
        this.__decodeHexValue.set(newValue);
    }
    private __encodeUtf8Value: ObservedPropertySimple<string>;
    get encodeUtf8Value() {
        return this.__encodeUtf8Value.get();
    }
    set encodeUtf8Value(newValue: string) {
        this.__encodeUtf8Value.set(newValue);
    }
    private __ofOutPutValue: ObservedPropertySimple<string>;
    get ofOutPutValue() {
        return this.__ofOutPutValue.get();
    }
    set ofOutPutValue(newValue: string) {
        this.__ofOutPutValue.set(newValue);
    }
    private __asciiLowercaseValue: ObservedPropertySimple<string>;
    get asciiLowercaseValue() {
        return this.__asciiLowercaseValue.get();
    }
    set asciiLowercaseValue(newValue: string) {
        this.__asciiLowercaseValue.set(newValue);
    }
    private __asciiUppercaseValue: ObservedPropertySimple<string>;
    get asciiUppercaseValue() {
        return this.__asciiUppercaseValue.get();
    }
    set asciiUppercaseValue(newValue: string) {
        this.__asciiUppercaseValue.set(newValue);
    }
    private __byteArrayValue: ObservedPropertySimple<string>;
    get byteArrayValue() {
        return this.__byteArrayValue.get();
    }
    set byteArrayValue(newValue: string) {
        this.__byteArrayValue.set(newValue);
    }
    private __internalArrayValue: ObservedPropertySimple<string>;
    get internalArrayValue() {
        return this.__internalArrayValue.get();
    }
    set internalArrayValue(newValue: string) {
        this.__internalArrayValue.set(newValue);
    }
    private __hashCodeValue: ObservedPropertySimple<string>;
    get hashCodeValue() {
        return this.__hashCodeValue.get();
    }
    set hashCodeValue(newValue: string) {
        this.__hashCodeValue.set(newValue);
    }
    private __inputData: ObservedPropertySimple<string>;
    get inputData() {
        return this.__inputData.get();
    }
    set inputData(newValue: string) {
        this.__inputData.set(newValue);
    }
    private __inputDataLength: ObservedPropertySimple<string>;
    get inputDataLength() {
        return this.__inputDataLength.get();
    }
    set inputDataLength(newValue: string) {
        this.__inputDataLength.set(newValue);
    }
    private __compareToResult: ObservedPropertySimple<string>;
    get compareToResult() {
        return this.__compareToResult.get();
    }
    set compareToResult(newValue: string) {
        this.__compareToResult.set(newValue);
    }
    private __encodeBase64Value: ObservedPropertySimple<string>;
    get encodeBase64Value() {
        return this.__encodeBase64Value.get();
    }
    set encodeBase64Value(newValue: string) {
        this.__encodeBase64Value.set(newValue);
    }
    private __encodeHexValue: ObservedPropertySimple<string>;
    get encodeHexValue() {
        return this.__encodeHexValue.get();
    }
    set encodeHexValue(newValue: string) {
        this.__encodeHexValue.set(newValue);
    }
    private __encodeMD5HexValue: ObservedPropertySimple<string>;
    get encodeMD5HexValue() {
        return this.__encodeMD5HexValue.get();
    }
    set encodeMD5HexValue(newValue: string) {
        this.__encodeMD5HexValue.set(newValue);
    }
    private scroller: Scroller;
    render() {
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.width('100%');
        Stack.height('100%');
        Stack.backgroundColor(0xDCDCDC);
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.On);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.scrollBarWidth(30);
        Column.create();
        Column.width('100%');
        Text.create('测试decodeBase64->' + this.decodeBase64Value);
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            this.decodeBase64Value = JSON.stringify(new ByteString.ByteString('hello world').decodeBase64('SGVsbG8gd29ybGQ='));
        });
        Text.pop();
        Text.create('测试decodeHex->' + this.decodeHexValue);
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            this.decodeHexValue = JSON.stringify(new ByteString.ByteString('hello world').decodeHex('48656C6C6F20776F726C640D0A'));
        });
        Text.pop();
        Text.create('测试encodeUtf8->' + this.encodeUtf8Value);
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            this.encodeUtf8Value = JSON.stringify(new ByteString.ByteString('hello world').encodeUtf8('Hello Word #4 ❤ （!!!∑(ﾟДﾟノ)ノ） '));
        });
        Text.pop();
        Text.create('测试of->' + this.ofOutPutValue);
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            this.ofOutPutValue = JSON.stringify(new ByteString.ByteString('hello world').of(['hello', 'world']));
        });
        Text.pop();
        Text.create('测试toAsciiLowercase->' + this.asciiLowercaseValue);
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            this.asciiLowercaseValue = JSON.stringify(new ByteString.ByteString('hello world').toAsciiLowercase(['HELLO WORLD']));
        });
        Text.pop();
        Text.create('测试toAsciiUppercase->' + this.asciiUppercaseValue);
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            this.asciiUppercaseValue = JSON.stringify(new ByteString.ByteString('hello world').toAsciiUppercase(['hello world']));
        });
        Text.pop();
        Text.create('测试toByteArray->' + this.byteArrayValue);
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            this.byteArrayValue = JSON.stringify(new ByteString.ByteString('hello world').toByteArray());
        });
        Text.pop();
        Text.create('测试internalArray->' + this.internalArrayValue);
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            this.internalArrayValue = JSON.stringify(new ByteString.ByteString('hello world').internalArray());
        });
        Text.pop();
        Text.create('测试hashCode->' + this.hashCodeValue);
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            this.hashCodeValue = JSON.stringify(new ByteString.ByteString('hello world').hashCode());
        });
        Text.pop();
        Text.create('测试compareToOther->' + this.compareToResult);
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            this.compareToResult = new ByteString.ByteString('a').compareToOther(new ByteString.ByteString('cadsd'));
        });
        Text.pop();
        Text.create('测试getLength->' + this.inputDataLength);
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            this.inputData = 'abcdesgsd213';
            if (this.inputData.length > 0) {
                this.inputDataLength = new ByteString.ByteString(this.inputData).getSize();
            }
        });
        Text.pop();
        Text.create('测试encodeBase64->' + this.encodeBase64Value);
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            this.encodeBase64Value = JSON.stringify(new ByteString.ByteString('hello world').encodeUtf8('Hello World').Base64());
        });
        Text.pop();
        Text.create('测试encodeHex->' + this.encodeHexValue);
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            this.encodeHexValue = JSON.stringify(new ByteString.ByteString('hello world').encodeUtf8('Hello World').Hex());
        });
        Text.pop();
        Text.create('测试encodeMD5Hex->' + this.encodeMD5HexValue);
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            this.encodeMD5HexValue = JSON.stringify(new ByteString.ByteString('hello world').encodeUtf8('Hello World test test').md5().Hex());
        });
        Text.pop();
        Column.pop();
        Scroll.pop();
        Button.createWithLabel('全部重置显示', { type: ButtonType.Capsule, stateEffect: true });
        Button.backgroundColor(0x317aff);
        Button.margin({ top: 200, left: 5 });
        Button.width(120);
        Button.onClick(() => {
            this.decodeBase64Value = '';
            this.decodeHexValue = '';
            this.encodeUtf8Value = '';
            this.ofOutPutValue = '';
            this.asciiLowercaseValue = '';
            this.asciiUppercaseValue = '';
            this.byteArrayValue = '';
            this.internalArrayValue = '';
            this.hashCodeValue = '';
            this.inputData = '';
            this.inputDataLength = '';
            this.compareToResult = '';
            this.encodeBase64Value = '';
            this.encodeHexValue = '';
            this.encodeMD5HexValue = '';
        });
        Button.pop();
        Stack.pop();
    }
}
loadDocument(new Bytestring("1", undefined, {}));
