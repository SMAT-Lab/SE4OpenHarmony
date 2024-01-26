interface Index_Params {
    message1?: string;
    message2?: string;
    message3?: string;
    message4?: string;
    message5?: string;
    message6?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import hilog from '@ohos.hilog';
var libAddon = globalThis.requireNapi("arraybuffer2native", true);
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message1 = new ObservedPropertySimple('PassingArrayBufferReturnVoid', this, "message1");
        this.__message2 = new ObservedPropertySimple('PassingArrayBufferReturnArrayBuffer', this, "message2");
        this.__message3 = new ObservedPropertySimple('PassingArrayBufferReturnInt8Array', this, "message3");
        this.__message4 = new ObservedPropertySimple('PassingArrayBufferReturnInt16Array', this, "message4");
        this.__message5 = new ObservedPropertySimple('ArrayBufferHandler', this, "message5");
        this.__message6 = new ObservedPropertySimple('AsyncTaskArrayBufferReturnArrayBuffer', this, "message6");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message1 !== undefined) {
            this.message1 = params.message1;
        }
        if (params.message2 !== undefined) {
            this.message2 = params.message2;
        }
        if (params.message3 !== undefined) {
            this.message3 = params.message3;
        }
        if (params.message4 !== undefined) {
            this.message4 = params.message4;
        }
        if (params.message5 !== undefined) {
            this.message5 = params.message5;
        }
        if (params.message6 !== undefined) {
            this.message6 = params.message6;
        }
    }
    aboutToBeDeleted() {
        this.__message1.aboutToBeDeleted();
        this.__message2.aboutToBeDeleted();
        this.__message3.aboutToBeDeleted();
        this.__message4.aboutToBeDeleted();
        this.__message5.aboutToBeDeleted();
        this.__message6.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message1: ObservedPropertySimple<string>;
    get message1() {
        return this.__message1.get();
    }
    set message1(newValue: string) {
        this.__message1.set(newValue);
    }
    private __message2: ObservedPropertySimple<string>;
    get message2() {
        return this.__message2.get();
    }
    set message2(newValue: string) {
        this.__message2.set(newValue);
    }
    private __message3: ObservedPropertySimple<string>;
    get message3() {
        return this.__message3.get();
    }
    set message3(newValue: string) {
        this.__message3.set(newValue);
    }
    private __message4: ObservedPropertySimple<string>;
    get message4() {
        return this.__message4.get();
    }
    set message4(newValue: string) {
        this.__message4.set(newValue);
    }
    private __message5: ObservedPropertySimple<string>;
    get message5() {
        return this.__message5.get();
    }
    set message5(newValue: string) {
        this.__message5.set(newValue);
    }
    private __message6: ObservedPropertySimple<string>;
    get message6() {
        return this.__message6.get();
    }
    set message6(newValue: string) {
        this.__message6.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.message1);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let buff: ArrayBuffer = new ArrayBuffer(8);
            let uint8Buff1: Uint8Array = new Uint8Array(buff);
            uint8Buff1[0] = 0;
            uint8Buff1[1] = 1;
            uint8Buff1[2] = 2;
            uint8Buff1[3] = 3;
            libAddon.PassingArrayBufferReturnVoid(buff);
            this.message1 = uint8Buff1.toString();
        });
        Text.pop();
        Text.create(this.message2);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let buff: ArrayBuffer = new ArrayBuffer(8);
            let uint8Buff1: Uint8Array = new Uint8Array(buff);
            uint8Buff1[0] = 0;
            uint8Buff1[1] = 1;
            uint8Buff1[2] = 2;
            uint8Buff1[3] = 3;
            let result: ArrayBuffer = libAddon.PassingArrayBufferReturnArrayBuffer(buff);
            uint8Buff1 = new Uint8Array(result);
            this.message2 = uint8Buff1.toString();
        });
        Text.pop();
        Text.create(this.message3);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let buff: ArrayBuffer = new ArrayBuffer(8);
            let int8Buff: Int8Array = new Int8Array(buff);
            int8Buff[0] = 0;
            int8Buff[1] = 1;
            int8Buff[2] = 2;
            int8Buff[3] = 3;
            let result: Int8Array = libAddon.PassingArrayBufferReturnInt8Array(buff);
            this.message3 = result.toString();
        });
        Text.pop();
        Text.create(this.message4);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let buff: ArrayBuffer = new ArrayBuffer(16);
            let int16Buff: Int16Array = new Int16Array(buff);
            int16Buff[0] = 0;
            int16Buff[1] = 1;
            int16Buff[2] = 2;
            int16Buff[3] = 3;
            let result: Int16Array = libAddon.PassingArrayBufferReturnInt16Array(buff);
            this.message4 = result.toString();
        });
        Text.pop();
        Text.create(this.message5);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let buff: ArrayBuffer = new ArrayBuffer(4);
            let uint8Buff: Uint8Array = new Uint8Array(buff);
            uint8Buff[0] = 0;
            uint8Buff[1] = 1;
            uint8Buff[2] = 2;
            uint8Buff[3] = 3;
            let result = new libAddon.ArrayBufferHandler();
            result.buf = uint8Buff;
            this.message5 = result.buf.toString();
        });
        Text.pop();
        Text.create(this.message6);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let buff: ArrayBuffer = new ArrayBuffer(4);
            let uint8Buff: Uint8Array = new Uint8Array(buff);
            uint8Buff[0] = 0;
            uint8Buff[1] = 1;
            uint8Buff[2] = 2;
            uint8Buff[3] = 3;
            libAddon.asyncTaskArrayBufferReturnArrayBuffer(uint8Buff).then(res => {
                let uint8Buff1 = new Uint8Array(res);
                this.message6 = uint8Buff1.toString();
            });
        });
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
