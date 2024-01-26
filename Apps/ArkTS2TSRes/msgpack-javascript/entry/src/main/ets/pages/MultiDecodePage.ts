interface MultiDecodePage_Params {
    message?: string;
    message2?: string;
    encodedUint8?: Uint8Array | undefined;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MultiDecodePage_" + ++__generate__Id;
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
import { encode } from "@msgpack/msgpack";
import Util from './Util';
class MultiDecodePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple("展示原数据", this, "message");
        this.__message2 = new ObservedPropertySimple("decodeMulti解码后的数据展示", this, "message2");
        this.encodedUint8 = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MultiDecodePage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.message2 !== undefined) {
            this.message2 = params.message2;
        }
        if (params.encodedUint8 !== undefined) {
            this.encodedUint8 = params.encodedUint8;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__message2.aboutToBeDeleted();
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
    private encodedUint8: Uint8Array | undefined;
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Button.createWithLabel('对象展示');
        Button.onClick(() => {
            console.log('dodo click on!');
            let bar: Bar = {
                name: "bar",
            };
            this.message = JSON.stringify([
                "foo",
                10,
                bar,
                [1, 2, 3],
            ]);
        });
        Button.pop();
        Text.create(this.message);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.createWithLabel('点击MultiDecode');
        Button.onClick(() => {
            let bar: Bar = {
                name: "bar",
            };
            let items = [
                "foo",
                10,
                bar,
                [1, 2, 3],
            ];
            let encodedItems = items.map((item) => encode<undefined>(item));
            let encoded = new Uint8Array(encodedItems.reduce((p, c) => p + c.byteLength, 0));
            let offset = 0;
            for (let encodedItem of encodedItems) {
                encoded.set(encodedItem, offset);
                offset += encodedItem.byteLength;
            }
            let result: Array<Object> = [];
            Util.decodeMultiSetResult(encoded, result);
            let retStr1 = JSON.stringify(result);
            this.message2 = retStr1;
        });
        Button.pop();
        Text.create(this.message2);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
interface Bar {
    name: string;
}
loadDocument(new MultiDecodePage("1", undefined, {}));
