interface Index_Params {
    length?: number;
    toByteArrayStr?: string;
    fromByteArray?: string;
    toByteArray?: Uint8Array;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import base64 from 'base64-js';
import util from '@ohos.util';
import { Unit8ArrayUtils } from './Unit8ArrayUtils';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__length = new ObservedPropertySimple(0, this, "length");
        this.__toByteArrayStr = new ObservedPropertySimple('', this, "toByteArrayStr");
        this.__fromByteArray = new ObservedPropertySimple('', this, "fromByteArray");
        this.__toByteArray = new ObservedPropertyObject(new Uint8Array([0, 0, 0]), this, "toByteArray");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.length !== undefined) {
            this.length = params.length;
        }
        if (params.toByteArrayStr !== undefined) {
            this.toByteArrayStr = params.toByteArrayStr;
        }
        if (params.fromByteArray !== undefined) {
            this.fromByteArray = params.fromByteArray;
        }
        if (params.toByteArray !== undefined) {
            this.toByteArray = params.toByteArray;
        }
    }
    aboutToBeDeleted() {
        this.__length.aboutToBeDeleted();
        this.__toByteArrayStr.aboutToBeDeleted();
        this.__fromByteArray.aboutToBeDeleted();
        this.__toByteArray.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __length: ObservedPropertySimple<number>;
    get length() {
        return this.__length.get();
    }
    set length(newValue: number) {
        this.__length.set(newValue);
    }
    private __toByteArrayStr: ObservedPropertySimple<string>;
    get toByteArrayStr() {
        return this.__toByteArrayStr.get();
    }
    set toByteArrayStr(newValue: string) {
        this.__toByteArrayStr.set(newValue);
    }
    private __fromByteArray: ObservedPropertySimple<string>;
    get fromByteArray() {
        return this.__fromByteArray.get();
    }
    set fromByteArray(newValue: string) {
        this.__fromByteArray.set(newValue);
    }
    private __toByteArray: ObservedPropertyObject<Uint8Array>;
    get toByteArray() {
        return this.__toByteArray.get();
    }
    set toByteArray(newValue: Uint8Array) {
        this.__toByteArray.set(newValue);
    }
    encode(input: string) {
        if (input != '') {
            let inputValue = Unit8ArrayUtils.stringToUint8Array(input);
            let base = new util.Base64Helper();
            let encode_value = base.encodeSync(inputValue);
            this.fromByteArray = base64.fromByteArray(encode_value);
            this.length = base64.byteLength(this.fromByteArray);
            this.toByteArray = base.decodeSync(base64.toByteArray(this.fromByteArray));
        }
        else {
            this.length = 0;
            this.toByteArray = new Uint8Array([0, 0, 0]);
            this.fromByteArray = '';
        }
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.justifyContent(FlexAlign.Start);
        Column.width('100%');
        Column.height('85%');
        TextInput.create({ placeholder: "请输入base64解码字符" });
        TextInput.onChange((v) => {
            this.encode(v);
        });
        Row.create();
        Row.width('90%');
        Text.create('length:');
        Text.pop();
        Text.create(this.length + '');
        Text.pop();
        Row.pop();
        Row.create();
        Row.width('90%');
        Text.create('toByteArray:');
        Text.pop();
        Text.create(Unit8ArrayUtils.Uint8ArrayToString(ObservedObject.GetRawObject(this.toByteArray)));
        Text.pop();
        Row.pop();
        Row.create();
        Row.width('90%');
        Text.create('fromByteArray:');
        Text.pop();
        Text.create(this.fromByteArray);
        Text.pop();
        Row.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
