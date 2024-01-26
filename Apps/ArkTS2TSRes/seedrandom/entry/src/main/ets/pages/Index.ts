interface Index_Params {
    value1?: string;
    value2?: string;
    value3?: string;
    value4?: string;
    value5?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * MIT License
 *
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
import seedrandom from 'seedrandom';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__value1 = new ObservedPropertySimple('', this, "value1");
        this.__value2 = new ObservedPropertySimple('', this, "value2");
        this.__value3 = new ObservedPropertySimple('', this, "value3");
        this.__value4 = new ObservedPropertySimple('', this, "value4");
        this.__value5 = new ObservedPropertySimple('', this, "value5");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.value1 !== undefined) {
            this.value1 = params.value1;
        }
        if (params.value2 !== undefined) {
            this.value2 = params.value2;
        }
        if (params.value3 !== undefined) {
            this.value3 = params.value3;
        }
        if (params.value4 !== undefined) {
            this.value4 = params.value4;
        }
        if (params.value5 !== undefined) {
            this.value5 = params.value5;
        }
    }
    aboutToBeDeleted() {
        this.__value1.aboutToBeDeleted();
        this.__value2.aboutToBeDeleted();
        this.__value3.aboutToBeDeleted();
        this.__value4.aboutToBeDeleted();
        this.__value5.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __value1: ObservedPropertySimple<string>;
    get value1() {
        return this.__value1.get();
    }
    set value1(newValue: string) {
        this.__value1.set(newValue);
    }
    private __value2: ObservedPropertySimple<string>;
    get value2() {
        return this.__value2.get();
    }
    set value2(newValue: string) {
        this.__value2.set(newValue);
    }
    private __value3: ObservedPropertySimple<string>;
    get value3() {
        return this.__value3.get();
    }
    set value3(newValue: string) {
        this.__value3.set(newValue);
    }
    private __value4: ObservedPropertySimple<string>;
    get value4() {
        return this.__value4.get();
    }
    set value4(newValue: string) {
        this.__value4.set(newValue);
    }
    private __value5: ObservedPropertySimple<string>;
    get value5() {
        return this.__value5.get();
    }
    set value5(newValue: string) {
        this.__value5.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Button.createWithLabel('Click', { type: ButtonType.Capsule, stateEffect: true });
        Button.backgroundColor(0x317aff);
        Button.width('50%');
        Button.height(60);
        Button.margin({ bottom: 30, top: 50 });
        Button.onClick(() => {
            let rng1: any = seedrandom('hello.');
            this.value1 = rng1();
            let rng2: any = seedrandom('hello.', { global: true });
            this.value2 = Math.random().toString();
            let rng3: any = seedrandom();
            this.value3 = rng3();
            let rng4: any = seedrandom('added entropy.', { entropy: true });
            this.value4 = rng4();
            let rng5: any = seedrandom.xor4096('hello.');
            this.value5 = rng5();
        });
        Button.pop();
        Column.create();
        Column.width('100%');
        Column.alignItems(HorizontalAlign.Start);
        Text.create("种子值: 'hello.'");
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create("随机数序列: " + this.value1);
        Text.fontSize(20);
        Text.margin({ bottom: 20 });
        Text.pop();
        Text.create("种子值: 'hello.', { global: true }");
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create("random随机数: " + this.value2);
        Text.fontSize(20);
        Text.margin({ bottom: 20 });
        Text.pop();
        Text.create("种子值: ' '");
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create("随机数序列: " + this.value3);
        Text.fontSize(20);
        Text.margin({ bottom: 20 });
        Text.pop();
        Text.create("种子值: 'added entropy.', { entropy: true }");
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create("随机数序列: " + this.value4);
        Text.fontSize(20);
        Text.margin({ bottom: 20 });
        Text.pop();
        Text.create("PRNG: xor4096; 种子值: 'hello.'");
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create("随机数序列:" + this.value5);
        Text.fontSize(20);
        Text.margin({ bottom: 20 });
        Text.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
