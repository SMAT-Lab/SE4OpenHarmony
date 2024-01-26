interface Index_Params {
    augend?: number;
    addend?: number;
    ceilNumber?: number;
    precision?: number;
    mean?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MathTest_" + ++__generate__Id;
}
/**
 *  MIT License
 *
 *  Copyright (c) 2023 Huawei Device Co., Ltd.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */
import { add, ceil, meanBy } from "lodash";
class Objects {
    n: number = 0;
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__augend = new ObservedPropertySimple(0, this, "augend");
        this.__addend = new ObservedPropertySimple(0, this, "addend");
        this.__ceilNumber = new ObservedPropertySimple(0, this, "ceilNumber");
        this.__precision = new ObservedPropertySimple(0, this, "precision");
        this.__mean = new ObservedPropertySimple(0, this, "mean");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.augend !== undefined) {
            this.augend = params.augend;
        }
        if (params.addend !== undefined) {
            this.addend = params.addend;
        }
        if (params.ceilNumber !== undefined) {
            this.ceilNumber = params.ceilNumber;
        }
        if (params.precision !== undefined) {
            this.precision = params.precision;
        }
        if (params.mean !== undefined) {
            this.mean = params.mean;
        }
    }
    aboutToBeDeleted() {
        this.__augend.aboutToBeDeleted();
        this.__addend.aboutToBeDeleted();
        this.__ceilNumber.aboutToBeDeleted();
        this.__precision.aboutToBeDeleted();
        this.__mean.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __augend: ObservedPropertySimple<number>;
    get augend() {
        return this.__augend.get();
    }
    set augend(newValue: number) {
        this.__augend.set(newValue);
    }
    private __addend: ObservedPropertySimple<number>;
    get addend() {
        return this.__addend.get();
    }
    set addend(newValue: number) {
        this.__addend.set(newValue);
    }
    private __ceilNumber: ObservedPropertySimple<number>;
    get ceilNumber() {
        return this.__ceilNumber.get();
    }
    set ceilNumber(newValue: number) {
        this.__ceilNumber.set(newValue);
    }
    private __precision: ObservedPropertySimple<number>;
    get precision() {
        return this.__precision.get();
    }
    set precision(newValue: number) {
        this.__precision.set(newValue);
    }
    private __mean: ObservedPropertySimple<number>;
    get mean() {
        return this.__mean.get();
    }
    set mean(newValue: number) {
        this.__mean.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Button.createWithLabel('进行加法运算（10+7）');
        Button.onClick(() => {
            let additionCount: number = add(10, 7);
            console.log('additionCount（10+7）:' + Math.round(additionCount));
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('进行保留几位小数运算（6.004向上舍入保留2位小數）');
        Button.onClick(() => {
            let ceilCount: number = ceil(6.004, 2);
            console.log('ceil number:' + ceilCount);
        });
        Button.margin(5);
        Button.pop();
        Text.create("数组平均值：" + this.mean);
        Text.pop();
        Button.createWithLabel('求数组平均值');
        Button.onClick(() => {
            let sampleObjects: Objects[] = [{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }];
            this.mean = meanBy(sampleObjects, (o: Objects) => { return o.n; });
            console.log('mean:' + this.mean);
        });
        Button.margin(5);
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
