interface Index_Params {
    mgs_compressed?: string;
    mgs_decompressed?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import brotli from "brotli-js";
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__mgs_compressed = new ObservedPropertySimple("空", this, "mgs_compressed");
        this.__mgs_decompressed = new ObservedPropertySimple("空", this, "mgs_decompressed");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.mgs_compressed !== undefined) {
            this.mgs_compressed = params.mgs_compressed;
        }
        if (params.mgs_decompressed !== undefined) {
            this.mgs_decompressed = params.mgs_decompressed;
        }
    }
    aboutToBeDeleted() {
        this.__mgs_compressed.aboutToBeDeleted();
        this.__mgs_decompressed.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __mgs_compressed: ObservedPropertySimple<string>;
    get mgs_compressed() {
        return this.__mgs_compressed.get();
    }
    set mgs_compressed(newValue: string) {
        this.__mgs_compressed.set(newValue);
    }
    private __mgs_decompressed: ObservedPropertySimple<string>;
    get mgs_decompressed() {
        return this.__mgs_decompressed.get();
    }
    set mgs_decompressed(newValue: string) {
        this.__mgs_decompressed.set(newValue);
    }
    private stringToBytes(str: string): Int8Array {
        let out = new Int8Array(str.length);
        for (let i = 0; i < str.length; ++i)
            out[i] = str.charCodeAt(i);
        return out;
    }
    // private bytesToString(bytes:number[]): string {
    //   return String.fromCharCode.apply(null, new Uint16Array(bytes));
    // }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Text.create('Brotli');
        Text.fontSize(15);
        Text.fontColor(Color.Black);
        Text.pop();
        Text.create('Brotli is a generic-purpose lossless compression algorithm that compresses data using a combination of a modern variant of the LZ77 algorithm, Huffman coding and 2nd order context modeling, with a compression ratio comparable to the best currently available general-purpose compression methods. It is similar in speed with deflate but offers more dense compression..');
        Text.textOverflow({ overflow: TextOverflow.None });
        Text.fontSize(12);
        Text.border({ width: 1 });
        Text.padding(10);
        Text.margin(30);
        Text.pop();
        Text.create('压缩');
        Text.fontSize(20);
        Text.margin(30);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            const str = 'test txt';
            const buf = new ArrayBuffer(str.length);
            const bufView = new Uint8Array(buf);
            for (let i = 0, strLen = str.length; i < strLen; i++) {
                bufView[i] = str.charCodeAt(i);
            }
            const compressed: string = brotli.compressArray(bufView, 6);
            const decompressed: number[] = brotli.decompressArray(compressed);
            const restoredStr: string = String.fromCharCode(...decompressed);
            this.mgs_compressed = compressed;
            this.mgs_decompressed = restoredStr;
        });
        Text.pop();
        Text.create('编码结果：' + this.mgs_compressed);
        Text.margin(30);
        Text.textOverflow({ overflow: TextOverflow.None });
        Text.fontSize(12);
        Text.border({ width: 1 });
        Text.padding(10);
        Text.pop();
        Text.create('解码结果：' + this.mgs_decompressed);
        Text.margin(30);
        Text.textOverflow({ overflow: TextOverflow.None });
        Text.fontSize(12);
        Text.border({ width: 1 });
        Text.padding(10);
        Text.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
