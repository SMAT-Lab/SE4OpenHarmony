interface EncodeDecodePage_Params {
    message?: string;
    message2?: string;
    message3?: string;
    encodedUint8?: Uint8Array;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "EncodeDecodePage_" + ++__generate__Id;
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
import { encode, decode } from "@msgpack/msgpack";
class EncodeDecodePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple("编码后的数据展示", this, "message");
        this.__message2 = new ObservedPropertySimple("解码后的数据展示", this, "message2");
        this.__message3 = new ObservedPropertySimple("解码后的数据展示", this, "message3");
        this.encodedUint8 = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: EncodeDecodePage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.message2 !== undefined) {
            this.message2 = params.message2;
        }
        if (params.message3 !== undefined) {
            this.message3 = params.message3;
        }
        if (params.encodedUint8 !== undefined) {
            this.encodedUint8 = params.encodedUint8;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__message2.aboutToBeDeleted();
        this.__message3.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
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
    private encodedUint8?: Uint8Array;
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Button.createWithLabel('点击对象编码');
        Button.onClick(() => {
            console.log("dodo click on!");
            this.encodedUint8 = encode<string>(data);
            this.message = "编码后的数据=" + this.encodedUint8;
        });
        Button.pop();
        Text.create(this.message);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.createWithLabel('点击解码');
        Button.onClick(() => {
            if (this.encodedUint8) {
                this.message2 = "解码后的数据=" + JSON.stringify(decode<string[]>(this.encodedUint8));
            }
            else {
                this.message3 = '解码数据为undefined, 请先点击编码';
            }
        });
        Button.pop();
        Text.create(this.message2);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Column.pop();
        Row.pop();
    }
    aboutToAppear() {
    }
}
class Data {
    foo: string = "";
}
let data: Data = { foo: "bar" };
loadDocument(new EncodeDecodePage("1", undefined, {}));
