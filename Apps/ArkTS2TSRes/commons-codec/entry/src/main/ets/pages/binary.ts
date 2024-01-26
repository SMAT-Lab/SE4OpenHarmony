interface Binary_Params {
    mBase64Input?: string;
    mBase64Result?: string;
    mBase64decodeResult?: string;
    mBase64Type?: number;
    mBase32Type?: number;
    mBase32Input?: string;
    mBase32Result?: string;
    mBase32decodeResult?: string;
    mBinary2Input?: string;
    mBinary2Result?: string;
    mBinary16Input?: string;
    mBinary16Result?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "binary_" + ++__generate__Id;
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
import CryptoJS from '@ohos/crypto-js';
import jsBase32 from 'hi-base32';
import { strToArr, strToHexCharCode } from '../conversion/binToJson.js';
function __Divider__dividerFancy(): void {
    Divider.strokeWidth(1);
    Divider.color(Color.Blue);
    Divider.margin(5);
    Divider.lineCap(LineCapStyle.Butt);
}
function __Text__textFancy(fontSize: number, textColor: Color, isBold: Boolean): void {
    Text.fontSize(fontSize);
    Text.fontColor(textColor);
    Text.fontWeight(isBold ? FontWeight.Bold : FontWeight.Normal);
}
function __Button__buttonFancy(): void {
    Button.type(ButtonType.Capsule);
    Button.width(90);
    Button.height(40);
    Button.align(Alignment.Center);
}
class Binary extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__mBase64Input = new ObservedPropertySimple('Qi Li Xiang', this, "mBase64Input");
        this.__mBase64Result = new ObservedPropertySimple('', this, "mBase64Result");
        this.__mBase64decodeResult = new ObservedPropertySimple('', this, "mBase64decodeResult");
        this.__mBase64Type = new ObservedPropertySimple(0
        //===========================================
        , this, "mBase64Type");
        this.__mBase32Type = new ObservedPropertySimple(0, this, "mBase32Type");
        this.__mBase32Input = new ObservedPropertySimple('Qi Li Xiang', this, "mBase32Input");
        this.__mBase32Result = new ObservedPropertySimple('', this, "mBase32Result");
        this.__mBase32decodeResult = new ObservedPropertySimple(''
        //==================================
        , this, "mBase32decodeResult");
        this.__mBinary2Input = new ObservedPropertySimple('Qi Li Xiang', this, "mBinary2Input");
        this.__mBinary2Result = new ObservedPropertySimple(''
        //======================================
        , this, "mBinary2Result");
        this.__mBinary16Input = new ObservedPropertySimple('Qi Li Xiang', this, "mBinary16Input");
        this.__mBinary16Result = new ObservedPropertySimple('', this, "mBinary16Result");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Binary_Params) {
        if (params.mBase64Input !== undefined) {
            this.mBase64Input = params.mBase64Input;
        }
        if (params.mBase64Result !== undefined) {
            this.mBase64Result = params.mBase64Result;
        }
        if (params.mBase64decodeResult !== undefined) {
            this.mBase64decodeResult = params.mBase64decodeResult;
        }
        if (params.mBase64Type !== undefined) {
            this.mBase64Type = params.mBase64Type;
        }
        if (params.mBase32Type !== undefined) {
            this.mBase32Type = params.mBase32Type;
        }
        if (params.mBase32Input !== undefined) {
            this.mBase32Input = params.mBase32Input;
        }
        if (params.mBase32Result !== undefined) {
            this.mBase32Result = params.mBase32Result;
        }
        if (params.mBase32decodeResult !== undefined) {
            this.mBase32decodeResult = params.mBase32decodeResult;
        }
        if (params.mBinary2Input !== undefined) {
            this.mBinary2Input = params.mBinary2Input;
        }
        if (params.mBinary2Result !== undefined) {
            this.mBinary2Result = params.mBinary2Result;
        }
        if (params.mBinary16Input !== undefined) {
            this.mBinary16Input = params.mBinary16Input;
        }
        if (params.mBinary16Result !== undefined) {
            this.mBinary16Result = params.mBinary16Result;
        }
    }
    aboutToBeDeleted() {
        this.__mBase64Input.aboutToBeDeleted();
        this.__mBase64Result.aboutToBeDeleted();
        this.__mBase64decodeResult.aboutToBeDeleted();
        this.__mBase64Type.aboutToBeDeleted();
        this.__mBase32Type.aboutToBeDeleted();
        this.__mBase32Input.aboutToBeDeleted();
        this.__mBase32Result.aboutToBeDeleted();
        this.__mBase32decodeResult.aboutToBeDeleted();
        this.__mBinary2Input.aboutToBeDeleted();
        this.__mBinary2Result.aboutToBeDeleted();
        this.__mBinary16Input.aboutToBeDeleted();
        this.__mBinary16Result.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __mBase64Input: ObservedPropertySimple<string>;
    get mBase64Input() {
        return this.__mBase64Input.get();
    }
    set mBase64Input(newValue: string) {
        this.__mBase64Input.set(newValue);
    }
    private __mBase64Result: ObservedPropertySimple<string>;
    get mBase64Result() {
        return this.__mBase64Result.get();
    }
    set mBase64Result(newValue: string) {
        this.__mBase64Result.set(newValue);
    }
    private __mBase64decodeResult: ObservedPropertySimple<string>;
    get mBase64decodeResult() {
        return this.__mBase64decodeResult.get();
    }
    set mBase64decodeResult(newValue: string) {
        this.__mBase64decodeResult.set(newValue);
    }
    private __mBase64Type: ObservedPropertySimple<number>;
    get mBase64Type() {
        return this.__mBase64Type.get();
    }
    set mBase64Type(newValue: number) {
        this.__mBase64Type.set(newValue);
    }
    //===========================================
    private __mBase32Type: ObservedPropertySimple<number>;
    get mBase32Type() {
        return this.__mBase32Type.get();
    }
    set mBase32Type(newValue: number) {
        this.__mBase32Type.set(newValue);
    }
    private __mBase32Input: ObservedPropertySimple<string>;
    get mBase32Input() {
        return this.__mBase32Input.get();
    }
    set mBase32Input(newValue: string) {
        this.__mBase32Input.set(newValue);
    }
    private __mBase32Result: ObservedPropertySimple<string>;
    get mBase32Result() {
        return this.__mBase32Result.get();
    }
    set mBase32Result(newValue: string) {
        this.__mBase32Result.set(newValue);
    }
    private __mBase32decodeResult: ObservedPropertySimple<string>;
    get mBase32decodeResult() {
        return this.__mBase32decodeResult.get();
    }
    set mBase32decodeResult(newValue: string) {
        this.__mBase32decodeResult.set(newValue);
    }
    //==================================
    private __mBinary2Input: ObservedPropertySimple<string>;
    get mBinary2Input() {
        return this.__mBinary2Input.get();
    }
    set mBinary2Input(newValue: string) {
        this.__mBinary2Input.set(newValue);
    }
    private __mBinary2Result: ObservedPropertySimple<string>;
    get mBinary2Result() {
        return this.__mBinary2Result.get();
    }
    set mBinary2Result(newValue: string) {
        this.__mBinary2Result.set(newValue);
    }
    //======================================
    private __mBinary16Input: ObservedPropertySimple<string>;
    get mBinary16Input() {
        return this.__mBinary16Input.get();
    }
    set mBinary16Input(newValue: string) {
        this.__mBinary16Input.set(newValue);
    }
    private __mBinary16Result: ObservedPropertySimple<string>;
    get mBinary16Result() {
        return this.__mBinary16Result.get();
    }
    set mBinary16Result(newValue: string) {
        this.__mBinary16Result.set(newValue);
    }
    render() {
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.margin(5);
        Text.create('Base64测试内容：Qi Li Xiang；Log打印结果： UWkgTGkgWGlhbmc= \n 支持文本/数字/特殊字符/图片');
        __Text__textFancy(12, Color.Black, true);
        Text.pop();
        Flex.create({ alignItems: ItemAlign.Center });
        TextInput.create({ placeholder: '', text: this.mBase64Input });
        TextInput.onChange((value: string) => {
            this.mBase64Input = value;
        });
        TextInput.width(220);
        TextInput.margin(5);
        Button.createWithChild();
        __Button__buttonFancy();
        Button.onClick(() => {
            this.mBase64Type = 1;
            this.mBase64Result = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse((this.mBase64Input))); //加密结果：5YWt5pyI5Yid5bel5YW356uZ
            console.log("Base64编码 = " + "【" + this.mBase64Result + "】");
        });
        Text.create('Base64编码');
        __Text__textFancy(13, Color.White, false);
        Text.pop();
        Button.pop();
        Flex.pop();
        Text.create(this.mBase64Type == 1 ? this.mBase64Result : this.mBase64decodeResult);
        __Text__textFancy(12, Color.Black, false);
        Text.pop();
        Flex.create({ alignItems: ItemAlign.Center });
        TextInput.create({ placeholder: '', text: this.mBase64Result });
        TextInput.onChange((value: string) => {
            this.mBase64Result = value;
        });
        TextInput.width(220);
        TextInput.margin(5);
        Button.createWithChild();
        __Button__buttonFancy();
        Button.onClick(() => {
            this.mBase64Type = 2;
            this.mBase64decodeResult = CryptoJS.enc.Base64.parse(this.mBase64Result).toString(CryptoJS.enc.Utf8);
            console.log("Base64解码 = " + "【" + this.mBase64decodeResult + "】");
        });
        Text.create('Base64解码');
        __Text__textFancy(13, Color.White, false);
        Text.pop();
        Button.pop();
        Flex.pop();
        //======================================================================================
        Divider.create();
        __Divider__dividerFancy();
        //===================================================================================
        Text.create('Base32测试内容：Qi Li Xiang；Log打印结果：KFUSATDJEBMGSYLOM4======  \n 支持文本/数字/特殊字符/图片');
        __Text__textFancy(12, Color.Black, true);
        //===================================================================================
        Text.pop();
        Flex.create({ alignItems: ItemAlign.Center });
        TextInput.create({ placeholder: '', text: this.mBase32Input });
        TextInput.onChange((value: string) => {
            this.mBase32Input = value;
        });
        TextInput.width(220);
        TextInput.margin(5);
        Button.createWithChild();
        __Button__buttonFancy();
        Button.onClick(() => {
            this.mBase32Type = 1;
            this.mBase32Result = jsBase32.encode(this.mBase32Input);
            console.log("Base32编码 = " + "【" + this.mBase32Result + "】");
        });
        Text.create('Base32编码');
        __Text__textFancy(13, Color.White, false);
        Text.pop();
        Button.pop();
        Flex.pop();
        Text.create(this.mBase32Type == 1 ? this.mBase32Result : this.mBase32decodeResult);
        __Text__textFancy(13, Color.Black, false);
        Text.pop();
        Flex.create({ alignItems: ItemAlign.Center });
        TextInput.create({ placeholder: '', text: this.mBase32Result });
        TextInput.onChange((value: string) => {
            this.mBase32Result = value;
        });
        TextInput.width(220);
        TextInput.margin(5);
        Button.createWithChild();
        __Button__buttonFancy();
        Button.onClick(() => {
            this.mBase32Type = 2;
            this.mBase32decodeResult = jsBase32.decode(this.mBase32Result);
            console.log("Base32解码 = " + "【" + this.mBase32decodeResult + "】");
        });
        Text.create('Base32解码');
        __Text__textFancy(13, Color.White, false);
        Text.pop();
        Button.pop();
        Flex.pop();
        //======================================================================================
        Divider.create();
        __Divider__dividerFancy();
        //===================================================================================
        Text.create('二进制测试内容：Qi Li Xiang；Log打印结果：1010001,1101001,100000,1001100,1101001,100000,1011000,1101001,1100001,1101110,1100111  \n 支持文本/数字/特殊字符');
        __Text__textFancy(12, Color.Black, true);
        //===================================================================================
        Text.pop();
        Flex.create({ alignItems: ItemAlign.Center });
        TextInput.create({ placeholder: '', text: this.mBinary2Input });
        TextInput.onChange((value: string) => {
            this.mBinary2Input = value;
        });
        TextInput.width(220);
        TextInput.margin(5);
        Button.createWithChild();
        __Button__buttonFancy();
        Button.onClick(() => {
            this.mBinary2Result = strToArr(this.mBinary2Input) + '';
            console.log("二进制解析 = " + "【" + this.mBinary2Result + "】");
        });
        Text.create('二进制解析');
        __Text__textFancy(13, Color.White, false);
        Text.pop();
        Button.pop();
        Flex.pop();
        Text.create(this.mBinary2Result);
        __Text__textFancy(12, Color.Black, false);
        Text.pop();
        //======================================================================================
        Divider.create();
        __Divider__dividerFancy();
        //===================================================================================
        Text.create('十六进制测试内容：Qi Li Xiang；Log打印结果：0x5169204c69205869616e67  \n 支持文本/数字/特殊字符');
        __Text__textFancy(12, Color.Black, true);
        //===================================================================================
        Text.pop();
        Flex.create({ alignItems: ItemAlign.Center });
        TextInput.create({ placeholder: '', text: this.mBinary16Input });
        TextInput.onChange((value: string) => {
            this.mBinary16Input = value;
        });
        TextInput.width(220);
        TextInput.margin(5);
        Button.createWithChild();
        __Button__buttonFancy();
        Button.onClick(() => {
            this.mBinary16Result = strToHexCharCode(this.mBinary16Input) + '';
            console.log("十六进制解析 = " + "【" + this.mBinary16Result + "】");
        });
        Text.create('十六进制解析');
        __Text__textFancy(13, Color.White, false);
        Text.pop();
        Button.pop();
        Flex.pop();
        Text.create(this.mBinary16Result);
        __Text__textFancy(12, Color.Black, false);
        Text.pop();
        Column.pop();
    }
}
loadDocument(new Binary("1", undefined, {}));
