interface Array_Params {
    firstResult?: string;
    lastResult?: string;
    unionResult?: string;
    indexOfResult?: string;
    rangeResult?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Arrays_" + ++__generate__Id;
}
/*
 * MIT License
 *
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { first, last, union, indexOf, range } from 'underscore';
class Array extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__firstResult = new ObservedPropertySimple('', this, "firstResult");
        this.__lastResult = new ObservedPropertySimple('', this, "lastResult");
        this.__unionResult = new ObservedPropertySimple('', this, "unionResult");
        this.__indexOfResult = new ObservedPropertySimple('', this, "indexOfResult");
        this.__rangeResult = new ObservedPropertySimple('', this, "rangeResult");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Array_Params) {
        if (params.firstResult !== undefined) {
            this.firstResult = params.firstResult;
        }
        if (params.lastResult !== undefined) {
            this.lastResult = params.lastResult;
        }
        if (params.unionResult !== undefined) {
            this.unionResult = params.unionResult;
        }
        if (params.indexOfResult !== undefined) {
            this.indexOfResult = params.indexOfResult;
        }
        if (params.rangeResult !== undefined) {
            this.rangeResult = params.rangeResult;
        }
    }
    aboutToBeDeleted() {
        this.__firstResult.aboutToBeDeleted();
        this.__lastResult.aboutToBeDeleted();
        this.__unionResult.aboutToBeDeleted();
        this.__indexOfResult.aboutToBeDeleted();
        this.__rangeResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __firstResult: ObservedPropertySimple<string>;
    get firstResult() {
        return this.__firstResult.get();
    }
    set firstResult(newValue: string) {
        this.__firstResult.set(newValue);
    }
    private __lastResult: ObservedPropertySimple<string>;
    get lastResult() {
        return this.__lastResult.get();
    }
    set lastResult(newValue: string) {
        this.__lastResult.set(newValue);
    }
    private __unionResult: ObservedPropertySimple<string>;
    get unionResult() {
        return this.__unionResult.get();
    }
    set unionResult(newValue: string) {
        this.__unionResult.set(newValue);
    }
    private __indexOfResult: ObservedPropertySimple<string>;
    get indexOfResult() {
        return this.__indexOfResult.get();
    }
    set indexOfResult(newValue: string) {
        this.__indexOfResult.set(newValue);
    }
    private __rangeResult: ObservedPropertySimple<string>;
    get rangeResult() {
        return this.__rangeResult.get();
    }
    set rangeResult(newValue: string) {
        this.__rangeResult.set(newValue);
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
            this.firstResult = first([5, 4, 3, 2, 1]); //5
            this.lastResult = last([5, 4, 3, 2, 1]); //1
            this.unionResult = union([1, 2, 3], [101, 2, 1, 10], [2, 1]); //1,2,3,101,10
            this.indexOfResult = indexOf([1, 2, 3], 2); //1
            this.rangeResult = range(10); //0,1,2,3,4,5,6,7,8,9
        });
        Button.pop();
        Column.create();
        Column.width('100%');
        Column.alignItems(HorizontalAlign.Start);
        Text.create('数据：[5, 4, 3, 2, 1]');
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('first: ' + this.firstResult);
        Text.fontSize(25);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('last: ' + this.lastResult);
        Text.fontSize(25);
        Text.margin({ bottom: 30 });
        Text.pop();
        Text.create('数据：[1, 2, 3], [101, 2, 1, 10], [2, 1]');
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('union: ' + this.unionResult);
        Text.fontSize(25);
        Text.margin({ bottom: 30 });
        Text.pop();
        Text.create('数据：[1, 2, 3], 2');
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('indexOf: ' + this.indexOfResult);
        Text.fontSize(25);
        Text.margin({ bottom: 30 });
        Text.pop();
        Text.create('数据：10');
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('range: ' + this.rangeResult);
        Text.fontSize(25);
        Text.margin({ bottom: 30 });
        Text.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new Array("1", undefined, {}));
