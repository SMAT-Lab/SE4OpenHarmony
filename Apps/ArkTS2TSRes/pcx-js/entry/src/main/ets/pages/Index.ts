interface Index_Params {
    p1Pixels?: PixelMap | undefined;
    mCount?: number;
    p2Pixels?: PixelMap | undefined;
    p3Pixels?: PixelMap | undefined;
    mCount2?: number;
    p4Pixels?: PixelMap | undefined;
    p5Pixels?: PixelMap | undefined;
    smallUint8?: Uint8Array | undefined;
    smallPcx?: PCX | undefined;
    testTimeHint?: string;
    testTimeHint2?: string;
    testNilPcx?: string;
    testNoDataPcx?: string;
    tests?: Array<Tests>;
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
import image from '@ohos.multimedia.image';
import { DecodeType } from "./utils/decode";
import PCX from 'pcx-js';
interface Tests {
    name: string;
    func: () => void;
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__p1Pixels = new ObservedPropertyObject(undefined, this, "p1Pixels");
        this.mCount = 0;
        this.__p2Pixels = new ObservedPropertyObject(undefined, this, "p2Pixels");
        this.__p3Pixels = new ObservedPropertyObject(undefined, this, "p3Pixels");
        this.mCount2 = 0;
        this.__p4Pixels = new ObservedPropertyObject(undefined, this, "p4Pixels");
        this.__p5Pixels = new ObservedPropertyObject(undefined, this, "p5Pixels");
        this.smallUint8 = undefined;
        this.smallPcx = undefined;
        this.__testTimeHint = new ObservedPropertySimple('测试耗时文字提醒', this, "testTimeHint");
        this.__testTimeHint2 = new ObservedPropertySimple('', this, "testTimeHint2");
        this.__testNilPcx = new ObservedPropertySimple('测试对象为空情况', this, "testNilPcx");
        this.__testNoDataPcx = new ObservedPropertySimple('测试pcx图片入参有问题情况', this, "testNoDataPcx");
        this.tests = [
            {
                name: 'new PCX()',
                func: () => {
                    let encoder: PCX = new PCX(this.smallUint8);
                }
            },
            {
                name: 'pcx.decode()',
                func: () => {
                    // let pcx = new PCX(this.smallUint8);
                    this.smallPcx!.decode();
                }
            }
        ];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.p1Pixels !== undefined) {
            this.p1Pixels = params.p1Pixels;
        }
        if (params.mCount !== undefined) {
            this.mCount = params.mCount;
        }
        if (params.p2Pixels !== undefined) {
            this.p2Pixels = params.p2Pixels;
        }
        if (params.p3Pixels !== undefined) {
            this.p3Pixels = params.p3Pixels;
        }
        if (params.mCount2 !== undefined) {
            this.mCount2 = params.mCount2;
        }
        if (params.p4Pixels !== undefined) {
            this.p4Pixels = params.p4Pixels;
        }
        if (params.p5Pixels !== undefined) {
            this.p5Pixels = params.p5Pixels;
        }
        if (params.smallUint8 !== undefined) {
            this.smallUint8 = params.smallUint8;
        }
        if (params.smallPcx !== undefined) {
            this.smallPcx = params.smallPcx;
        }
        if (params.testTimeHint !== undefined) {
            this.testTimeHint = params.testTimeHint;
        }
        if (params.testTimeHint2 !== undefined) {
            this.testTimeHint2 = params.testTimeHint2;
        }
        if (params.testNilPcx !== undefined) {
            this.testNilPcx = params.testNilPcx;
        }
        if (params.testNoDataPcx !== undefined) {
            this.testNoDataPcx = params.testNoDataPcx;
        }
        if (params.tests !== undefined) {
            this.tests = params.tests;
        }
    }
    aboutToBeDeleted() {
        this.__p1Pixels.aboutToBeDeleted();
        this.__p2Pixels.aboutToBeDeleted();
        this.__p3Pixels.aboutToBeDeleted();
        this.__p4Pixels.aboutToBeDeleted();
        this.__p5Pixels.aboutToBeDeleted();
        this.__testTimeHint.aboutToBeDeleted();
        this.__testTimeHint2.aboutToBeDeleted();
        this.__testNilPcx.aboutToBeDeleted();
        this.__testNoDataPcx.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __p1Pixels: ObservedPropertyObject<PixelMap | undefined>;
    get p1Pixels() {
        return this.__p1Pixels.get();
    }
    set p1Pixels(newValue: PixelMap | undefined) {
        this.__p1Pixels.set(newValue);
    }
    private mCount: number;
    private __p2Pixels: ObservedPropertyObject<PixelMap | undefined>;
    get p2Pixels() {
        return this.__p2Pixels.get();
    }
    set p2Pixels(newValue: PixelMap | undefined) {
        this.__p2Pixels.set(newValue);
    }
    private __p3Pixels: ObservedPropertyObject<PixelMap | undefined>;
    get p3Pixels() {
        return this.__p3Pixels.get();
    }
    set p3Pixels(newValue: PixelMap | undefined) {
        this.__p3Pixels.set(newValue);
    }
    private mCount2: number;
    private __p4Pixels: ObservedPropertyObject<PixelMap | undefined>;
    get p4Pixels() {
        return this.__p4Pixels.get();
    }
    set p4Pixels(newValue: PixelMap | undefined) {
        this.__p4Pixels.set(newValue);
    }
    private __p5Pixels: ObservedPropertyObject<PixelMap | undefined>;
    get p5Pixels() {
        return this.__p5Pixels.get();
    }
    set p5Pixels(newValue: PixelMap | undefined) {
        this.__p5Pixels.set(newValue);
    }
    private smallUint8: Uint8Array | undefined;
    private smallPcx: PCX | undefined;
    private __testTimeHint: ObservedPropertySimple<string>;
    get testTimeHint() {
        return this.__testTimeHint.get();
    }
    set testTimeHint(newValue: string) {
        this.__testTimeHint.set(newValue);
    }
    private __testTimeHint2: ObservedPropertySimple<string>;
    get testTimeHint2() {
        return this.__testTimeHint2.get();
    }
    set testTimeHint2(newValue: string) {
        this.__testTimeHint2.set(newValue);
    }
    private __testNilPcx: ObservedPropertySimple<string>;
    get testNilPcx() {
        return this.__testNilPcx.get();
    }
    set testNilPcx(newValue: string) {
        this.__testNilPcx.set(newValue);
    }
    private __testNoDataPcx: ObservedPropertySimple<string>;
    get testNoDataPcx() {
        return this.__testNoDataPcx.get();
    }
    set testNoDataPcx(newValue: string) {
        this.__testNoDataPcx.set(newValue);
    }
    render() {
        Scroll.create();
        Scroll.width('100%');
        Scroll.height('100%');
        Column.create();
        Button.createWithLabel('解码thimbleweed.pcx_585KB');
        Button.fontSize(20);
        Button.onClick(() => {
            getContext(this).resourceManager.getMediaContent($r("app.media.thimbleweed").id).then((uint8Array) => {
                let pcxDecoder: PCX = new PCX(uint8Array.buffer);
                let decodeData: DecodeType = pcxDecoder.decode();
                this.RBGA2BGRA(decodeData.pixelArray);
                image.createPixelMap(this.typedArrayToBuffer(decodeData.pixelArray), {
                    'size': {
                        'width': decodeData.width,
                        'height': decodeData.height
                    }
                }).then((pixels) => {
                    this.p1Pixels = pixels;
                });
            });
        });
        Button.pop();
        Image.create(this.p1Pixels == undefined ? "" : this.p1Pixels);
        Image.objectFit(ImageFit.Contain);
        Image.width(200);
        Image.height(200);
        Image.backgroundColor(Color.Pink);
        Image.margin(10);
        Button.createWithLabel('解码small.pcx_1KB');
        Button.fontSize(20);
        Button.onClick(() => {
            getContext(this).resourceManager.getMediaContent($r('app.media.small').id).then((uint8Array) => {
                this.smallUint8 = uint8Array;
                let pcxDecoder: PCX = new PCX(uint8Array.buffer);
                this.smallPcx = pcxDecoder;
                let decodeData: DecodeType = pcxDecoder.decode();
                this.RBGA2BGRA(decodeData.pixelArray);
                image.createPixelMap(this.typedArrayToBuffer(decodeData.pixelArray), {
                    'size': {
                        'width': decodeData.width,
                        'height': decodeData.height
                    }
                }).then((pixels) => {
                    this.p2Pixels = pixels;
                });
            });
        });
        Button.pop();
        Image.create(this.p2Pixels == undefined ? "" : this.p2Pixels);
        Image.objectFit(ImageFit.Contain);
        Image.width(200);
        Image.height(200);
        Image.backgroundColor(Color.Pink);
        Image.margin(10);
        Button.createWithLabel('解码parrot.pcx_25KB');
        Button.fontSize(20);
        Button.onClick(() => {
            getContext(this).resourceManager.getMediaContent($r('app.media.parrot').id).then((uint8Array) => {
                let pcxDecoder: PCX = new PCX(uint8Array.buffer);
                let decodeData: DecodeType = pcxDecoder.decode();
                this.RBGA2BGRA(decodeData.pixelArray);
                image.createPixelMap(this.typedArrayToBuffer(decodeData.pixelArray), {
                    'size': {
                        'width': decodeData.width,
                        'height': decodeData.height
                    }
                }).then((pixels) => {
                    this.p3Pixels = pixels;
                });
            });
        });
        Button.pop();
        Image.create(this.p3Pixels == undefined ? "" : this.p3Pixels);
        Image.objectFit(ImageFit.Contain);
        Image.width(200);
        Image.height(200);
        Image.backgroundColor(Color.Pink);
        Image.margin(10);
        Button.createWithLabel('解码16col.pcx_40KB');
        Button.fontSize(20);
        Button.onClick(() => {
            getContext(this).resourceManager.getMediaContent($r('app.media.16col').id).then((uint8Array) => {
                let pcxDecoder: PCX = new PCX(uint8Array.buffer);
                let decodeData: DecodeType = pcxDecoder.decode();
                this.RBGA2BGRA(decodeData.pixelArray);
                image.createPixelMap(this.typedArrayToBuffer(decodeData.pixelArray), {
                    'size': {
                        'width': decodeData.width,
                        'height': decodeData.height
                    }
                }).then((pixels) => {
                    this.p4Pixels = pixels;
                });
            });
        });
        Button.pop();
        Image.create(this!.p4Pixels);
        Image.objectFit(ImageFit.Contain);
        Image.width(200);
        Image.height(200);
        Image.backgroundColor(Color.Pink);
        Image.margin(10);
        Button.createWithLabel('解码clown.pcx 73KB');
        Button.fontSize(20);
        Button.onClick(() => {
            getContext(this).resourceManager.getMediaContent($r('app.media.clown').id).then((uint8Array) => {
                let pcxDecoder: PCX = new PCX(uint8Array.buffer);
                let decodeData: DecodeType = pcxDecoder.decode();
                this.RBGA2BGRA(decodeData.pixelArray);
                image.createPixelMap(this.typedArrayToBuffer(decodeData.pixelArray), {
                    'size': {
                        'width': decodeData.width,
                        'height': decodeData.height
                    }
                }).then((pixels) => {
                    this.p5Pixels = pixels;
                });
            });
        });
        Button.pop();
        Image.create(this.p5Pixels == undefined ? "" : this.p5Pixels);
        Image.objectFit(ImageFit.Contain);
        Image.width(200);
        Image.height(200);
        Image.backgroundColor(Color.Pink);
        Image.margin(10);
        Text.create(this.testTimeHint);
        Text.margin({ top: 5, bottom: 5 });
        Text.pop();
        Text.create(this.testTimeHint2);
        Text.margin({ top: 5, bottom: 5 });
        Text.pop();
        Button.createWithLabel('先点击small再点击这个测试耗时按钮');
        Button.onClick(() => {
            if (this.smallUint8 && this.smallPcx) {
                this.clickTestTime();
            }
            else {
                this.testTimeHint = 'smallUint8&smallPcx为空,请先点击small加载,才能继续测试';
            }
        });
        Button.margin({ top: 5, bottom: 5 });
        Button.pop();
        Text.create(this.testNilPcx);
        Text.margin({ top: 5, bottom: 5 });
        Text.pop();
        Button.createWithLabel('点击空对象PCX调用decode');
        Button.onClick(() => {
            let pcx: PCX | null = null;
            if (!pcx) {
                this.testNilPcx = 'pcx对象为空无法继续调用';
            }
            else if (this.smallUint8) {
                let pcx: PCX = new PCX(this.smallUint8);
                this.testNilPcx = 'pcx对象不为空并且small有数据则能够调用decode方法';
                let decodeData: DecodeType = pcx.decode();
            }
        });
        Button.margin({ top: 5, bottom: 5 });
        Button.pop();
        Text.create(this.testNoDataPcx);
        Text.margin({ top: 5, bottom: 5 });
        Text.pop();
        Button.createWithLabel('点击调用无参数PCX的解析');
        Button.onClick(() => {
            this.testErrorInput();
        });
        Button.margin({ top: 5, bottom: 5 });
        Button.pop();
        Column.pop();
        Scroll.pop();
    }
    aboutToAppear() {
    }
    testErrorInput() {
        try {
            let pcx: PCX = new PCX();
            let decodeData: DecodeType = pcx.decode();
        }
        catch (err) {
            this.testNoDataPcx = 'pcx没有解析数据调用解码会程序异常,如果存在这种场景请主动捕获异常';
        }
    }
    RBGA2BGRA(input: Uint8ClampedArray) {
        for (let i = 0; i < input.byteLength; i = i + 4) {
            let colorR = input[i + 0];
            let colorG = input[i + 1];
            let colorB = input[i + 2];
            let colorA = input[i + 3];
            let temp = colorR;
            input[i + 0] = colorB;
            input[i + 2] = temp;
        }
    }
    private getSysTime(): number {
        return new Date().getTime();
    }
    testTimeFunction(name: string, func: Function, count: number, invalid?: number) {
        let sumAve = 0;
        for (let i = 0; i < count; i++) {
            let s = this.getSysTime();
            func();
            let e = this.getSysTime();
            sumAve += (e - s) * 1000;
        }
        let ave = (sumAve * 1.0) / (count * 1.0 * (invalid ? invalid : 1));
        console.log(`pcx-js:${name} averageTime = ${ave}us`);
        this.testTimeHint2 += `pcx-js:${name} averageTime = ${ave}us`;
    }
    clickTestTime() {
        for (let i = 0; i < this.tests.length; i++) {
            let obj = this.tests[i];
            this.testTimeFunction(obj.name, obj.func, 1000);
        }
    }
    private tests: Array<Tests>;
    typedArrayToBuffer(array: Uint8ClampedArray): ArrayBuffer {
        return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset);
    }
}
loadDocument(new Index("1", undefined, {}));
