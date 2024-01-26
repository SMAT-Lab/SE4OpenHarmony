interface Index_Params {
    message?: string;
    m1?: Massage;
    m2?: Massage;
    m3?: Massage;
    m4?: Massage;
    m5?: Massage;
    m6?: Massage;
    m7?: Massage;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ExamPage_" + ++__generate__Id;
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
import { MsgTimestamp } from "../../../ohosTest/ets/test/test/msg/msg-timestamp";
import { encode, decode, ExtensionCodec } from "@msgpack/msgpack";
import ohBuffer from '@ohos.buffer';
import Util from './Util';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('点击查看log编码输入和解码输出', this, "message");
        this.m1 = {
            string: "Кириллица",
            msgpack: [
                [0xb2, 0xd0, 0x9a, 0xd0, 0xb8, 0xd1, 0x80, 0xd0, 0xb8, 0xd0, 0xbb, 0xd0, 0xbb, 0xd0, 0xb8, 0xd1, 0x86, 0xd0, 0xb0],
                [0xd9, 0x12, 0xd0, 0x9a, 0xd0, 0xb8, 0xd1, 0x80, 0xd0, 0xb8, 0xd0, 0xbb, 0xd0, 0xbb, 0xd0, 0xb8, 0xd1, 0x86, 0xd0, 0xb0]
            ]
        };
        this.m2 = {
            string: "ひらがな",
            msgpack: [
                [0xac, 0xe3, 0x81, 0xb2, 0xe3, 0x82, 0x89, 0xe3, 0x81, 0x8c, 0xe3, 0x81, 0xaa],
                [0xd9, 0x0c, 0xe3, 0x81, 0xb2, 0xe3, 0x82, 0x89, 0xe3, 0x81, 0x8c, 0xe3, 0x81, 0xaa]
            ]
        };
        this.m3 = {
            string: "한글",
            msgpack: [
                [0xa6, 0xed, 0x95, 0x9c, 0xea, 0xb8, 0x80],
                [0xd9, 0x06, 0xed, 0x95, 0x9c, 0xea, 0xb8, 0x80]
            ]
        };
        this.m4 = {
            string: "汉字",
            msgpack: [
                [0xa6, 0xe6, 0xb1, 0x89, 0xe5, 0xad, 0x97],
                [0xd9, 0x06, 0xe6, 0xb1, 0x89, 0xe5, 0xad, 0x97]
            ]
        };
        this.m5 = {
            string: "漢字",
            msgpack: [
                [0xa6, 0xe6, 0xbc, 0xa2, 0xe5, 0xad, 0x97],
                [0xd9, 0x06, 0xe6, 0xbc, 0xa2, 0xe5, 0xad, 0x97]
            ]
        };
        this.m6 = {
            string: "❤",
            msgpack: [
                [0xa3, 0xe2, 0x9d, 0xa4],
                [0xd9, 0x03, 0xe2, 0x9d, 0xa4]
            ]
        };
        this.m7 = {
            string: "🍺",
            msgpack: [
                [0xa4, 0xf0, 0x9f, 0x8d, 0xba],
                [0xd9, 0x04, 0xf0, 0x9f, 0x8d, 0xba]
            ]
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.m1 !== undefined) {
            this.m1 = params.m1;
        }
        if (params.m2 !== undefined) {
            this.m2 = params.m2;
        }
        if (params.m3 !== undefined) {
            this.m3 = params.m3;
        }
        if (params.m4 !== undefined) {
            this.m4 = params.m4;
        }
        if (params.m5 !== undefined) {
            this.m5 = params.m5;
        }
        if (params.m6 !== undefined) {
            this.m6 = params.m6;
        }
        if (params.m7 !== undefined) {
            this.m7 = params.m7;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private m1: Massage;
    private m2: Massage;
    private m3: Massage;
    private m4: Massage;
    private m5: Massage;
    private m6: Massage;
    private m7: Massage;
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Button.createWithLabel(this.message);
        Button.fontSize(50);
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            this.testSpecString();
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
    testSpecString() {
        // 补齐XTS中未通过用例
        let inputs = [
            this.m1,
            this.m2,
            this.m3,
            this.m4,
            this.m5,
            this.m6,
            this.m7
        ];
        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            this.checkEncodeAndDecode(input.string, input.msgpack[0], input.msgpack[1]);
        }
    }
    checkEncodeAndDecode(value: string, array1: number[], array2: number[]) {
        console.log("dodo 输入value=" + value);
        let extensionCodec = new ExtensionCodec<undefined>();
        extensionCodec.register(Util.register);
        let b1 = encode<undefined>(value, { extensionCodec });
        let u8 = b1;
        for (let i = 0; i < u8.length; i++) {
            console.log(`dodo 编码后buffer[${i}]=${u8[i]}`);
        }
        let encode1 = ohBuffer.from(array1);
        let encode2 = ohBuffer.from(array2);
        console.log("dodo 解码后 array1 对应 decode1=" + decode<undefined>(encode1.buffer, {
            extensionCodec
        }) + " array2 对应 decode2=" + decode<undefined>(encode2.buffer, { extensionCodec }));
    }
}
class Massage {
    string: string = "";
    msgpack: number[][] = [[0]];
}
loadDocument(new Index("1", undefined, {}));
