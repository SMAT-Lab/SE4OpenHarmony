interface Digest_Params {
    mMd5Input?: string;
    mMd5Result?: string;
    mMd2Input?: string;
    mMd2Result?: string;
    mSha256Input?: string;
    mSha256Result?: string;
    mSha256Type?: number;
    mSha256HexInput?: string;
    mSha256HexResult?: string;
    mSha224Input?: string;
    mSha224Result?: string;
    mSha224Type?: number;
    mSha224HexInput?: string;
    mSha224HexResult?: string;
    mSha1Input?: string;
    mSha1Result?: string;
    mSha1Type?: number;
    mSha1HexInput?: string;
    mSha1HexResult?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "digest_" + ++__generate__Id;
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
import jsMd5 from 'js-md5';
import jsMd2 from 'js-md2';
import jsSha256 from 'js-sha256';
import jsSha1 from 'js-sha1';
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
class Digest extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__mMd5Input = new ObservedPropertySimple('Qi Li Xiang', this, "mMd5Input");
        this.__mMd5Result = new ObservedPropertySimple(''
        //===============================
        , this, "mMd5Result");
        this.__mMd2Input = new ObservedPropertySimple('Qi Li Xiang', this, "mMd2Input");
        this.__mMd2Result = new ObservedPropertySimple(''
        //==============================
        , this, "mMd2Result");
        this.__mSha256Input = new ObservedPropertySimple('Qi Li Xiang', this, "mSha256Input");
        this.__mSha256Result = new ObservedPropertySimple('', this, "mSha256Result");
        this.__mSha256Type = new ObservedPropertySimple(0, this, "mSha256Type");
        this.__mSha256HexInput = new ObservedPropertySimple('Qi Li Xiang', this, "mSha256HexInput");
        this.__mSha256HexResult = new ObservedPropertySimple(''
        //====================================
        , this, "mSha256HexResult");
        this.__mSha224Input = new ObservedPropertySimple('Qi Li Xiang', this, "mSha224Input");
        this.__mSha224Result = new ObservedPropertySimple('', this, "mSha224Result");
        this.__mSha224Type = new ObservedPropertySimple(0, this, "mSha224Type");
        this.__mSha224HexInput = new ObservedPropertySimple('Qi Li Xiang', this, "mSha224HexInput");
        this.__mSha224HexResult = new ObservedPropertySimple(''
        //==========================================
        , this, "mSha224HexResult");
        this.__mSha1Input = new ObservedPropertySimple('Qi Li Xiang', this, "mSha1Input");
        this.__mSha1Result = new ObservedPropertySimple('', this, "mSha1Result");
        this.__mSha1Type = new ObservedPropertySimple(0, this, "mSha1Type");
        this.__mSha1HexInput = new ObservedPropertySimple('Qi Li Xiang', this, "mSha1HexInput");
        this.__mSha1HexResult = new ObservedPropertySimple('', this, "mSha1HexResult");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Digest_Params) {
        if (params.mMd5Input !== undefined) {
            this.mMd5Input = params.mMd5Input;
        }
        if (params.mMd5Result !== undefined) {
            this.mMd5Result = params.mMd5Result;
        }
        if (params.mMd2Input !== undefined) {
            this.mMd2Input = params.mMd2Input;
        }
        if (params.mMd2Result !== undefined) {
            this.mMd2Result = params.mMd2Result;
        }
        if (params.mSha256Input !== undefined) {
            this.mSha256Input = params.mSha256Input;
        }
        if (params.mSha256Result !== undefined) {
            this.mSha256Result = params.mSha256Result;
        }
        if (params.mSha256Type !== undefined) {
            this.mSha256Type = params.mSha256Type;
        }
        if (params.mSha256HexInput !== undefined) {
            this.mSha256HexInput = params.mSha256HexInput;
        }
        if (params.mSha256HexResult !== undefined) {
            this.mSha256HexResult = params.mSha256HexResult;
        }
        if (params.mSha224Input !== undefined) {
            this.mSha224Input = params.mSha224Input;
        }
        if (params.mSha224Result !== undefined) {
            this.mSha224Result = params.mSha224Result;
        }
        if (params.mSha224Type !== undefined) {
            this.mSha224Type = params.mSha224Type;
        }
        if (params.mSha224HexInput !== undefined) {
            this.mSha224HexInput = params.mSha224HexInput;
        }
        if (params.mSha224HexResult !== undefined) {
            this.mSha224HexResult = params.mSha224HexResult;
        }
        if (params.mSha1Input !== undefined) {
            this.mSha1Input = params.mSha1Input;
        }
        if (params.mSha1Result !== undefined) {
            this.mSha1Result = params.mSha1Result;
        }
        if (params.mSha1Type !== undefined) {
            this.mSha1Type = params.mSha1Type;
        }
        if (params.mSha1HexInput !== undefined) {
            this.mSha1HexInput = params.mSha1HexInput;
        }
        if (params.mSha1HexResult !== undefined) {
            this.mSha1HexResult = params.mSha1HexResult;
        }
    }
    aboutToBeDeleted() {
        this.__mMd5Input.aboutToBeDeleted();
        this.__mMd5Result.aboutToBeDeleted();
        this.__mMd2Input.aboutToBeDeleted();
        this.__mMd2Result.aboutToBeDeleted();
        this.__mSha256Input.aboutToBeDeleted();
        this.__mSha256Result.aboutToBeDeleted();
        this.__mSha256Type.aboutToBeDeleted();
        this.__mSha256HexInput.aboutToBeDeleted();
        this.__mSha256HexResult.aboutToBeDeleted();
        this.__mSha224Input.aboutToBeDeleted();
        this.__mSha224Result.aboutToBeDeleted();
        this.__mSha224Type.aboutToBeDeleted();
        this.__mSha224HexInput.aboutToBeDeleted();
        this.__mSha224HexResult.aboutToBeDeleted();
        this.__mSha1Input.aboutToBeDeleted();
        this.__mSha1Result.aboutToBeDeleted();
        this.__mSha1Type.aboutToBeDeleted();
        this.__mSha1HexInput.aboutToBeDeleted();
        this.__mSha1HexResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __mMd5Input: ObservedPropertySimple<string>;
    get mMd5Input() {
        return this.__mMd5Input.get();
    }
    set mMd5Input(newValue: string) {
        this.__mMd5Input.set(newValue);
    }
    private __mMd5Result: ObservedPropertySimple<string>;
    get mMd5Result() {
        return this.__mMd5Result.get();
    }
    set mMd5Result(newValue: string) {
        this.__mMd5Result.set(newValue);
    }
    //===============================
    private __mMd2Input: ObservedPropertySimple<string>;
    get mMd2Input() {
        return this.__mMd2Input.get();
    }
    set mMd2Input(newValue: string) {
        this.__mMd2Input.set(newValue);
    }
    private __mMd2Result: ObservedPropertySimple<string>;
    get mMd2Result() {
        return this.__mMd2Result.get();
    }
    set mMd2Result(newValue: string) {
        this.__mMd2Result.set(newValue);
    }
    //==============================
    private __mSha256Input: ObservedPropertySimple<string>;
    get mSha256Input() {
        return this.__mSha256Input.get();
    }
    set mSha256Input(newValue: string) {
        this.__mSha256Input.set(newValue);
    }
    private __mSha256Result: ObservedPropertySimple<string>;
    get mSha256Result() {
        return this.__mSha256Result.get();
    }
    set mSha256Result(newValue: string) {
        this.__mSha256Result.set(newValue);
    }
    private __mSha256Type: ObservedPropertySimple<number>;
    get mSha256Type() {
        return this.__mSha256Type.get();
    }
    set mSha256Type(newValue: number) {
        this.__mSha256Type.set(newValue);
    }
    private __mSha256HexInput: ObservedPropertySimple<string>;
    get mSha256HexInput() {
        return this.__mSha256HexInput.get();
    }
    set mSha256HexInput(newValue: string) {
        this.__mSha256HexInput.set(newValue);
    }
    private __mSha256HexResult: ObservedPropertySimple<string>;
    get mSha256HexResult() {
        return this.__mSha256HexResult.get();
    }
    set mSha256HexResult(newValue: string) {
        this.__mSha256HexResult.set(newValue);
    }
    //====================================
    private __mSha224Input: ObservedPropertySimple<string>;
    get mSha224Input() {
        return this.__mSha224Input.get();
    }
    set mSha224Input(newValue: string) {
        this.__mSha224Input.set(newValue);
    }
    private __mSha224Result: ObservedPropertySimple<string>;
    get mSha224Result() {
        return this.__mSha224Result.get();
    }
    set mSha224Result(newValue: string) {
        this.__mSha224Result.set(newValue);
    }
    private __mSha224Type: ObservedPropertySimple<number>;
    get mSha224Type() {
        return this.__mSha224Type.get();
    }
    set mSha224Type(newValue: number) {
        this.__mSha224Type.set(newValue);
    }
    private __mSha224HexInput: ObservedPropertySimple<string>;
    get mSha224HexInput() {
        return this.__mSha224HexInput.get();
    }
    set mSha224HexInput(newValue: string) {
        this.__mSha224HexInput.set(newValue);
    }
    private __mSha224HexResult: ObservedPropertySimple<string>;
    get mSha224HexResult() {
        return this.__mSha224HexResult.get();
    }
    set mSha224HexResult(newValue: string) {
        this.__mSha224HexResult.set(newValue);
    }
    //==========================================
    private __mSha1Input: ObservedPropertySimple<string>;
    get mSha1Input() {
        return this.__mSha1Input.get();
    }
    set mSha1Input(newValue: string) {
        this.__mSha1Input.set(newValue);
    }
    private __mSha1Result: ObservedPropertySimple<string>;
    get mSha1Result() {
        return this.__mSha1Result.get();
    }
    set mSha1Result(newValue: string) {
        this.__mSha1Result.set(newValue);
    }
    private __mSha1Type: ObservedPropertySimple<number>;
    get mSha1Type() {
        return this.__mSha1Type.get();
    }
    set mSha1Type(newValue: number) {
        this.__mSha1Type.set(newValue);
    }
    private __mSha1HexInput: ObservedPropertySimple<string>;
    get mSha1HexInput() {
        return this.__mSha1HexInput.get();
    }
    set mSha1HexInput(newValue: string) {
        this.__mSha1HexInput.set(newValue);
    }
    private __mSha1HexResult: ObservedPropertySimple<string>;
    get mSha1HexResult() {
        return this.__mSha1HexResult.get();
    }
    set mSha1HexResult(newValue: string) {
        this.__mSha1HexResult.set(newValue);
    }
    render() {
        Scroll.create();
        Scroll.scrollable(ScrollDirection.Vertical);
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.margin(5);
        Text.create('MD5加密内容：Qi Li Xiang；Log打印结果：d962b63a0f819b562a86b05a8aa60c3a  \n 支持文本/数字/特殊字符');
        __Text__textFancy(12, Color.Black, true);
        Text.pop();
        Flex.create({ alignItems: ItemAlign.Center });
        TextInput.create({ placeholder: '', text: this.mMd5Input });
        TextInput.onChange((value: string) => {
            this.mMd5Input = value;
        });
        TextInput.width(220);
        Button.createWithChild();
        __Button__buttonFancy();
        Button.onClick(() => {
            //https://github.com/emn178/js-md5
            this.mMd5Result = jsMd5(this.mMd5Input);
            console.log("Md5加密 = " + "【" + this.mMd5Result + "】");
        });
        Text.create('MD5');
        __Text__textFancy(13, Color.White, true);
        Text.pop();
        Button.pop();
        Flex.pop();
        Text.create(this.mMd5Result);
        __Text__textFancy(12, Color.Black, false);
        Text.pop();
        //======================================================================================
        Divider.create();
        __Divider__dividerFancy();
        //===================================================================================
        Text.create('MD2加密内容：Qi Li Xiang；Log打印结果：505753f30e271890f1832c8021e7e66e \n 支持文本/数字/特殊字符');
        __Text__textFancy(12, Color.Black, true);
        //===================================================================================
        Text.pop();
        Flex.create({ alignItems: ItemAlign.Center });
        TextInput.create({ placeholder: '', text: this.mMd2Input });
        TextInput.onChange((value: string) => {
            this.mMd2Input = value;
        });
        TextInput.width(220);
        Button.createWithChild();
        __Button__buttonFancy();
        Button.onClick(() => {
            //https://github.com/emn178/js-md2
            this.mMd2Result = jsMd2(this.mMd2Input);
            console.log("Md2加密 = " + "【" + this.mMd2Result + "】");
        });
        Text.create('MD2');
        __Text__textFancy(13, Color.White, false);
        Text.pop();
        Button.pop();
        Flex.pop();
        Text.create(this.mMd2Result);
        __Text__textFancy(12, Color.Black, false);
        Text.pop();
        //======================================================================================
        Divider.create();
        __Divider__dividerFancy();
        //===================================================================================
        Text.create('SHA256内容：Qi Li Xiang；Log打印结果：63f14d6a5c155d3710c35c421d5b47152c0cee26d0bf930d1688403419e60adb \n 支持文本/数字/特殊字符');
        __Text__textFancy(12, Color.Black, true);
        //===================================================================================
        Text.pop();
        Flex.create({ alignItems: ItemAlign.Center });
        TextInput.create({ placeholder: '', text: this.mSha256Input });
        TextInput.onChange((value: string) => {
            this.mSha256Input = value;
        });
        TextInput.width(220);
        Button.createWithChild();
        __Button__buttonFancy();
        Button.onClick(() => {
            //  https://github.com/emn178/js-sha256
            this.mSha256Type = 1;
            var sha256 = jsSha256.sha256;
            this.mSha256Result = sha256(this.mSha256Input);
            console.log("SHA256编码= " + "【" + this.mSha256Result + "】");
        });
        Text.create('SHA256');
        __Text__textFancy(13, Color.White, false);
        Text.pop();
        Button.pop();
        Flex.pop();
        Text.create(this.mSha256Type == 1 ? this.mSha256Result : this.mSha256HexResult);
        __Text__textFancy(12, Color.Black, false);
        Text.pop();
        Flex.create({ alignItems: ItemAlign.Center });
        TextInput.create({ placeholder: '', text: this.mSha256HexInput });
        TextInput.onChange((value: string) => {
            this.mSha256HexInput = value;
        });
        TextInput.width(220);
        Button.createWithChild();
        __Button__buttonFancy();
        Button.onClick(() => {
            //  https://github.com/emn178/js-sha256
            this.mSha256Type = 2;
            var sha256 = jsSha256.sha256;
            this.mSha256HexResult = sha256.hex(this.mSha256HexInput);
            console.log("SHA256编码转Hex = " + "【" + this.mSha256HexResult + "】");
        });
        Text.create('SHA256 Hex');
        __Text__textFancy(13, Color.White, false);
        Text.pop();
        Button.pop();
        Flex.pop();
        //======================================================================================
        Divider.create();
        __Divider__dividerFancy();
        //===================================================================================
        Text.create('SHA224内容：Qi Li Xiang；Log打印结果：9526b1c9cea665794322b4807cd5a6f8770aad4f8619be812b9879da \n 支持文本/数字/特殊字符');
        __Text__textFancy(12, Color.Black, true);
        //===================================================================================
        Text.pop();
        Flex.create({ alignItems: ItemAlign.Center });
        TextInput.create({ placeholder: '', text: this.mSha224Input });
        TextInput.onChange((value: string) => {
            this.mSha224Input = value;
        });
        TextInput.width(220);
        Button.createWithChild();
        __Button__buttonFancy();
        Button.onClick(() => {
            //  https://github.com/emn178/js-sha256
            this.mSha224Type = 1;
            var sha224 = jsSha256.sha224;
            this.mSha224Result = sha224(this.mSha224Input);
            console.log("SHA224编码= " + "【" + this.mSha224Result + "】");
        });
        Text.create('SHA224');
        __Text__textFancy(13, Color.White, false);
        Text.pop();
        Button.pop();
        Flex.pop();
        Text.create(this.mSha224Type == 1 ? this.mSha224Result : this.mSha224HexResult);
        __Text__textFancy(12, Color.Black, false);
        Text.pop();
        Flex.create({ alignItems: ItemAlign.Center });
        TextInput.create({ placeholder: '', text: this.mSha224HexInput });
        TextInput.onChange((value: string) => {
            this.mSha224HexInput = value;
        });
        TextInput.width(220);
        Button.createWithChild();
        __Button__buttonFancy();
        Button.onClick(() => {
            //  https://github.com/emn178/js-sha256
            this.mSha224Type = 2;
            var sha224 = jsSha256.sha224;
            this.mSha224HexResult = sha224.hex(this.mSha224HexInput);
            console.log("SHA224编码转Hex = " + "【" + this.mSha224HexResult + "】");
        });
        Text.create('SHA224 Hex');
        __Text__textFancy(13, Color.White, false);
        Text.pop();
        Button.pop();
        Flex.pop();
        //======================================================================================
        Divider.create();
        __Divider__dividerFancy();
        //===================================================================================
        Text.create('SHA1内容：Qi Li Xiang；Log打印结果：a800c4835d35221ee87a252c824aa47e1d09d88c \n 支持文本/数字/特殊字符');
        __Text__textFancy(12, Color.Black, true);
        //===================================================================================
        Text.pop();
        Flex.create({ alignItems: ItemAlign.Center });
        TextInput.create({ placeholder: '', text: this.mSha1Input });
        TextInput.onChange((value: string) => {
            this.mSha1Input = value;
        });
        TextInput.width(220);
        Button.createWithChild();
        __Button__buttonFancy();
        Button.onClick(() => {
            this.mSha1Type = 1;
            //SHA1加密 https://github.com/emn178/js-sha1
            this.mSha1Result = jsSha1(this.mSha1Input);
            console.log("SHA1编码= " + "【" + this.mSha1Result + "】");
        });
        Text.create('SHA1');
        __Text__textFancy(13, Color.White, false);
        Text.pop();
        Button.pop();
        Flex.pop();
        Text.create(this.mSha1Type == 1 ? this.mSha1Result : this.mSha1HexResult);
        __Text__textFancy(12, Color.Black, false);
        Text.pop();
        Flex.create({ alignItems: ItemAlign.Center });
        TextInput.create({ placeholder: '', text: this.mSha1HexInput });
        TextInput.onChange((value: string) => {
            this.mSha1HexInput = value;
        });
        TextInput.width(220);
        Button.createWithChild();
        __Button__buttonFancy();
        Button.onClick(() => {
            this.mSha1Type = 2;
            //SHA1加密 https://github.com/emn178/js-sha1
            this.mSha1HexResult = jsSha1.hex(this.mSha1HexInput);
            console.log("SHA1编码转Hex = " + "【" + this.mSha1HexResult + "】");
        });
        Text.create('SHA1 Hex');
        __Text__textFancy(13, Color.White, false);
        Text.pop();
        Button.pop();
        Flex.pop();
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new Digest("1", undefined, {}));
