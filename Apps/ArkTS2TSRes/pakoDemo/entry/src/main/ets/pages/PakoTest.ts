interface deflateDemo_Params {
    Deflate1?: string;
    Deflate2?: string;
    Deflate3?: string;
    Inflate?: string;
    Inflate2?: string;
    ungzip1?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PakoTest_" + ++__generate__Id;
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
import pako from 'pako';
import prompt from '@ohos.promptAction';
interface levelType {
    level: number;
}
interface optionsType {
    gzip: boolean;
    level: number;
}
let levelData: levelType = { level: 3 };
let ungzipTestData: optionsType = { gzip: true, level: 9 };
export default class deflateDemo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__Deflate1 = new ObservedPropertySimple("0", this, "Deflate1");
        this.__Deflate2 = new ObservedPropertySimple("0", this, "Deflate2");
        this.__Deflate3 = new ObservedPropertySimple("0", this, "Deflate3");
        this.__Inflate = new ObservedPropertySimple("0", this, "Inflate");
        this.__Inflate2 = new ObservedPropertySimple("0", this, "Inflate2");
        this.__ungzip1 = new ObservedPropertySimple("0", this, "ungzip1");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: deflateDemo_Params) {
        if (params.Deflate1 !== undefined) {
            this.Deflate1 = params.Deflate1;
        }
        if (params.Deflate2 !== undefined) {
            this.Deflate2 = params.Deflate2;
        }
        if (params.Deflate3 !== undefined) {
            this.Deflate3 = params.Deflate3;
        }
        if (params.Inflate !== undefined) {
            this.Inflate = params.Inflate;
        }
        if (params.Inflate2 !== undefined) {
            this.Inflate2 = params.Inflate2;
        }
        if (params.ungzip1 !== undefined) {
            this.ungzip1 = params.ungzip1;
        }
    }
    aboutToBeDeleted() {
        this.__Deflate1.aboutToBeDeleted();
        this.__Deflate2.aboutToBeDeleted();
        this.__Deflate3.aboutToBeDeleted();
        this.__Inflate.aboutToBeDeleted();
        this.__Inflate2.aboutToBeDeleted();
        this.__ungzip1.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __Deflate1: ObservedPropertySimple<string>;
    get Deflate1() {
        return this.__Deflate1.get();
    }
    set Deflate1(newValue: string) {
        this.__Deflate1.set(newValue);
    }
    private __Deflate2: ObservedPropertySimple<string>;
    get Deflate2() {
        return this.__Deflate2.get();
    }
    set Deflate2(newValue: string) {
        this.__Deflate2.set(newValue);
    }
    private __Deflate3: ObservedPropertySimple<string>;
    get Deflate3() {
        return this.__Deflate3.get();
    }
    set Deflate3(newValue: string) {
        this.__Deflate3.set(newValue);
    }
    private __Inflate: ObservedPropertySimple<string>;
    get Inflate() {
        return this.__Inflate.get();
    }
    set Inflate(newValue: string) {
        this.__Inflate.set(newValue);
    }
    private __Inflate2: ObservedPropertySimple<string>;
    get Inflate2() {
        return this.__Inflate2.get();
    }
    set Inflate2(newValue: string) {
        this.__Inflate2.set(newValue);
    }
    private __ungzip1: ObservedPropertySimple<string>;
    get ungzip1() {
        return this.__ungzip1.get();
    }
    set ungzip1(newValue: string) {
        this.__ungzip1.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start });
        List.create({ space: 20, initialIndex: 0 });
        ListItem.create();
        Column.create({ space: 12 });
        Button.createWithLabel('测试Deflate接口1', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(() => {
            this.DeflateTest1();
        });
        Button.pop();
        Text.create('预期结果:120,94,99,100,98,102,97,101,99,231,224,228,226,230,225,229,227,23,16,20,18,6,0,5,69,0,191');
        Text.fontSize(20);
        Text.margin({ top: 16 });
        Text.pop();
        Text.create('实际结果: ' + this.Deflate1);
        Text.fontSize(20);
        Text.margin({ top: 16 });
        Text.pop();
        Button.createWithLabel('测试Deflate接口2', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(() => {
            this.DeflateTest2();
        });
        Button.pop();
        Text.create('预期结果:120,156,99,100,98,102,97,101,99,231,224,4,0,0,174,0,46');
        Text.fontSize(20);
        Text.margin({ top: 16 });
        Text.pop();
        Text.create('实际结果: ' + this.Deflate2);
        Text.fontSize(20);
        Text.margin({ top: 16 });
        Text.pop();
        Button.createWithLabel('测试Deflate接口3', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(() => {
            this.DeflateTest3();
        });
        Button.pop();
        Text.create('预期结果:99,100,98,102,97,101,99,231,224,4,0');
        Text.fontSize(20);
        Text.margin({ top: 16 });
        Text.pop();
        Text.create('实际结果: ' + this.Deflate3);
        Text.fontSize(20);
        Text.margin({ top: 16 });
        Text.pop();
        Button.createWithLabel('测试Inflate接口', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(() => {
            this.InflateInflateTest();
        });
        Button.pop();
        Text.create('预期结果:1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19');
        Text.fontSize(20);
        Text.margin({ top: 16 });
        Text.pop();
        Text.create('实际结果: ' + this.Inflate);
        Text.fontSize(20);
        Text.margin({ top: 16 });
        Text.pop();
        Button.createWithLabel('测试inflateRaw接口', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(() => {
            this.InflateInflateRawTest();
        });
        Button.pop();
        Text.create('预期结果:1,2,3,4,5,6,7,8,9');
        Text.fontSize(20);
        Text.margin({ top: 16 });
        Text.pop();
        Text.create('实际结果: ' + this.Inflate2);
        Text.fontSize(20);
        Text.margin({ top: 16 });
        Text.pop();
        Button.createWithLabel('测试ungzip接口', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(() => {
            this.ungzipTest();
        });
        Button.pop();
        Text.create('预期结果:1,2,3,4,5,6,7,8,9');
        Text.fontSize(20);
        Text.margin({ top: 16 });
        Text.pop();
        Text.create('实际结果: ' + this.ungzip1);
        Text.fontSize(20);
        Text.margin({ top: 16 });
        Text.pop();
        Column.pop();
        ListItem.pop();
        List.pop();
        Flex.pop();
    }
    DeflateTest1() {
        let chunk1 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        let chunk2 = new Uint8Array([10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
        const deflate: pako.Deflate = new pako.Deflate(levelData);
        deflate.push(chunk1, false);
        deflate.push(chunk2, true);
        let deflateArray: Uint8Array = deflate.result;
        this.Deflate1 = deflateArray.toString();
        let err = deflate.err == deflate.msg;
        prompt.showToast({ message: "" + err, duration: 4000 });
    }
    DeflateTest2() {
        const data = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        let array = new Uint8Array([120, 156, 99, 100, 98, 102, 97, 101, 99, 231, 224, 4, 0, 0, 174, 0, 46]);
        let deflateArray: Uint8Array = pako.deflate(data);
        this.Deflate2 = deflateArray.toString();
        let result: Boolean = (deflateArray.toString() === array.toString());
        prompt.showToast({ message: result.toString(), duration: 4000 });
    }
    DeflateTest3() {
        let data = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        let deflateArray: Uint8Array = pako.deflateRaw(data);
        let array = new Uint8Array([99, 100, 98, 102, 97, 101, 99, 231, 224, 4, 0]);
        this.Deflate3 = deflateArray.toString();
        let result: Boolean = (deflateArray.toString() === array.toString());
        prompt.showToast({ message: result.toString(), duration: 4000 });
    }
    InflateInflateTest() {
        const chunk1 = new Uint8Array([120, 94, 99, 100, 98, 102, 97, 101, 99, 231, 224]);
        const chunk2 = new Uint8Array([228, 226, 230, 225, 229, 227, 23, 16, 20, 18, 6, 0, 5, 69, 0, 191]);
        const inflate: pako.Inflate = new pako.Inflate(levelData);
        inflate.push(chunk1, false);
        inflate.push(chunk2, true); // true -> last chunk
        let err = inflate.err == inflate.msg;
        this.Inflate = inflate.result.toString();
        prompt.showToast({ message: "" + err, duration: 4000 });
    }
    InflateInflateRawTest() {
        const chunk1 = new Uint8Array([99, 100, 98, 102, 97, 101, 99, 231, 224, 4, 0]);
        const inflate: pako.inflateRaw = new pako.inflateRaw(chunk1);
        this.Inflate2 = inflate.toString();
        let array = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        let result: Boolean = (inflate.toString() === array.toString());
        prompt.showToast({ message: result.toString(), duration: 4000 });
    }
    ungzipTest() {
        let array = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        let gzip: pako.gzip = new pako.gzip(array, ungzipTestData);
        let ungzip: pako.ungzip = new pako.ungzip(gzip, ungzipTestData);
        this.ungzip1 = ungzip.toString();
        let result: Boolean = (ungzip.toString() === array.toString());
        prompt.showToast({ message: result.toString(), duration: 4000 });
    }
}
loadDocument(new deflateDemo("1", undefined, {}));
