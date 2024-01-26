interface Index_Params {
    testString?: string;
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
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
import { length, encode, decode, test } from '@protobufjs/base64';
import util from '@ohos.util';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__testString = new ObservedPropertySimple("harmonys os", this, "testString");
        this.__message = new ObservedPropertySimple('', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.testString !== undefined) {
            this.testString = params.testString;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        this.__testString.aboutToBeDeleted();
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __testString: ObservedPropertySimple<string>;
    get testString() {
        return this.__testString.get();
    }
    set testString(newValue: string) {
        this.__testString.set(newValue);
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        TextInput.create({ text: this.testString, placeholder: '请输入内容' });
        TextInput.fontSize(16);
        TextInput.onChange((value: string) => {
            this.testString = value;
        });
        Button.createWithLabel("encode");
        Button.fontSize(30);
        Button.margin({ top: 20 });
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(event => {
            const textEncoder = new util.TextEncoder();
            let uint8Array = textEncoder.encodeInto(this.testString);
            this.message = "encode result: " + encode(uint8Array, 0, uint8Array.length);
        });
        Button.pop();
        Button.createWithLabel("decode");
        Button.fontSize(30);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 20 });
        Button.onClick(event => {
            const textEncoder = new util.TextEncoder();
            let uint8Array = textEncoder.encodeInto(this.testString);
            let encodeStr = encode(uint8Array, 0, uint8Array.length);
            let decodeUint8Array = new Uint8Array(length(encodeStr));
            decode(encodeStr, decodeUint8Array, 0);
            this.message = "decode result: " + JSON.stringify(decodeUint8Array);
        });
        Button.pop();
        Button.createWithLabel("length");
        Button.fontSize(30);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 20 });
        Button.onClick(event => {
            const textEncoder = new util.TextEncoder();
            let uint8Array = textEncoder.encodeInto(this.testString);
            let encodeStr = encode(uint8Array, 0, uint8Array.length);
            this.message = "byte length: " + length(encodeStr);
        });
        Button.pop();
        Button.createWithLabel("test");
        Button.fontSize(30);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 20 });
        Button.onClick(event => {
            this.message = "test result: " + test(this.testString) + "\r\n";
        });
        Button.pop();
        Text.create(this.message);
        Text.fontSize(18);
        Text.margin({ right: 10, left: 10 });
        Text.fontWeight(FontWeight.Bold);
        Text.height("50%");
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
