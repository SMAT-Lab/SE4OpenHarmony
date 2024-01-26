interface UrlEncoding_Params {
    mUrlencodeInput?: string;
    mUrlencodeResult?: string;
    mUrlType?: number;
    mUrldecodeInput?: string;
    mUrldecodeResult?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "urlEncoding_" + ++__generate__Id;
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
import { urlEncode, urlDecode } from '../conversion/binToJson.js';
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
class UrlEncoding extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__mUrlencodeInput = new ObservedPropertySimple('word is word', this, "mUrlencodeInput");
        this.__mUrlencodeResult = new ObservedPropertySimple('', this, "mUrlencodeResult");
        this.__mUrlType = new ObservedPropertySimple(0, this, "mUrlType");
        this.__mUrldecodeInput = new ObservedPropertySimple('', this, "mUrldecodeInput");
        this.__mUrldecodeResult = new ObservedPropertySimple('', this, "mUrldecodeResult");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: UrlEncoding_Params) {
        if (params.mUrlencodeInput !== undefined) {
            this.mUrlencodeInput = params.mUrlencodeInput;
        }
        if (params.mUrlencodeResult !== undefined) {
            this.mUrlencodeResult = params.mUrlencodeResult;
        }
        if (params.mUrlType !== undefined) {
            this.mUrlType = params.mUrlType;
        }
        if (params.mUrldecodeInput !== undefined) {
            this.mUrldecodeInput = params.mUrldecodeInput;
        }
        if (params.mUrldecodeResult !== undefined) {
            this.mUrldecodeResult = params.mUrldecodeResult;
        }
    }
    aboutToBeDeleted() {
        this.__mUrlencodeInput.aboutToBeDeleted();
        this.__mUrlencodeResult.aboutToBeDeleted();
        this.__mUrlType.aboutToBeDeleted();
        this.__mUrldecodeInput.aboutToBeDeleted();
        this.__mUrldecodeResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __mUrlencodeInput: ObservedPropertySimple<string>;
    get mUrlencodeInput() {
        return this.__mUrlencodeInput.get();
    }
    set mUrlencodeInput(newValue: string) {
        this.__mUrlencodeInput.set(newValue);
    }
    private __mUrlencodeResult: ObservedPropertySimple<string>;
    get mUrlencodeResult() {
        return this.__mUrlencodeResult.get();
    }
    set mUrlencodeResult(newValue: string) {
        this.__mUrlencodeResult.set(newValue);
    }
    private __mUrlType: ObservedPropertySimple<number>;
    get mUrlType() {
        return this.__mUrlType.get();
    }
    set mUrlType(newValue: number) {
        this.__mUrlType.set(newValue);
    }
    private __mUrldecodeInput: ObservedPropertySimple<string>;
    get mUrldecodeInput() {
        return this.__mUrldecodeInput.get();
    }
    set mUrldecodeInput(newValue: string) {
        this.__mUrldecodeInput.set(newValue);
    }
    private __mUrldecodeResult: ObservedPropertySimple<string>;
    get mUrldecodeResult() {
        return this.__mUrldecodeResult.get();
    }
    set mUrldecodeResult(newValue: string) {
        this.__mUrldecodeResult.set(newValue);
    }
    render() {
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.margin(5);
        Text.create('urlencode编码内容：word is word ；Log打印结果：word%20is%20word \n 支持文本/数字/特殊字符');
        __Text__textFancy(12, Color.Black, true);
        Text.pop();
        Flex.create({ alignItems: ItemAlign.Center });
        TextInput.create({ placeholder: '', text: this.mUrlencodeInput });
        TextInput.onChange((value: string) => {
            this.mUrlencodeInput = value;
        });
        TextInput.width(220);
        Button.createWithChild();
        __Button__buttonFancy();
        Button.onClick(() => {
            this.mUrlType = 1;
            this.mUrlencodeResult = urlEncode(this.mUrlencodeInput);
            console.log("urlencode编码 = " + "【" + this.mUrlencodeResult + "】");
        });
        Text.create('url encode');
        __Text__textFancy(13, Color.White, false);
        Text.pop();
        Button.pop();
        Flex.pop();
        Text.create(this.mUrlType == 1 ? this.mUrlencodeResult : this.mUrldecodeResult);
        __Text__textFancy(13, Color.Black, false);
        Text.pop();
        Flex.create({ alignItems: ItemAlign.Center });
        TextInput.create({ placeholder: '', text: this.mUrlencodeResult });
        TextInput.onChange((value: string) => {
            this.mUrlencodeResult = value;
        });
        TextInput.width(220);
        Button.createWithChild();
        __Button__buttonFancy();
        Button.onClick(() => {
            this.mUrlType = 2;
            this.mUrldecodeResult = urlDecode(this.mUrlencodeResult);
            console.log("urlencode解码 = " + "【" + this.mUrldecodeResult + "】");
        });
        Text.create('url decode');
        __Text__textFancy(13, Color.White, false);
        Text.pop();
        Button.pop();
        Flex.pop();
        Column.pop();
    }
}
loadDocument(new UrlEncoding("1", undefined, {}));
