interface Collections_Params {
    eachResult?: string;
    mapResult?: string;
    reduceResult?: string;
    filterResult?: string;
    invokeResult?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Collections_" + ++__generate__Id;
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
import { each, map, reduce, filter, invoke } from 'underscore';
class Collections extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__eachResult = new ObservedPropertySimple('', this, "eachResult");
        this.__mapResult = new ObservedPropertySimple('', this, "mapResult");
        this.__reduceResult = new ObservedPropertySimple('', this, "reduceResult");
        this.__filterResult = new ObservedPropertySimple('', this, "filterResult");
        this.__invokeResult = new ObservedPropertySimple('', this, "invokeResult");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Collections_Params) {
        if (params.eachResult !== undefined) {
            this.eachResult = params.eachResult;
        }
        if (params.mapResult !== undefined) {
            this.mapResult = params.mapResult;
        }
        if (params.reduceResult !== undefined) {
            this.reduceResult = params.reduceResult;
        }
        if (params.filterResult !== undefined) {
            this.filterResult = params.filterResult;
        }
        if (params.invokeResult !== undefined) {
            this.invokeResult = params.invokeResult;
        }
    }
    aboutToBeDeleted() {
        this.__eachResult.aboutToBeDeleted();
        this.__mapResult.aboutToBeDeleted();
        this.__reduceResult.aboutToBeDeleted();
        this.__filterResult.aboutToBeDeleted();
        this.__invokeResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __eachResult: ObservedPropertySimple<string>;
    get eachResult() {
        return this.__eachResult.get();
    }
    set eachResult(newValue: string) {
        this.__eachResult.set(newValue);
    }
    private __mapResult: ObservedPropertySimple<string>;
    get mapResult() {
        return this.__mapResult.get();
    }
    set mapResult(newValue: string) {
        this.__mapResult.set(newValue);
    }
    private __reduceResult: ObservedPropertySimple<string>;
    get reduceResult() {
        return this.__reduceResult.get();
    }
    set reduceResult(newValue: string) {
        this.__reduceResult.set(newValue);
    }
    private __filterResult: ObservedPropertySimple<string>;
    get filterResult() {
        return this.__filterResult.get();
    }
    set filterResult(newValue: string) {
        this.__filterResult.set(newValue);
    }
    private __invokeResult: ObservedPropertySimple<string>;
    get invokeResult() {
        return this.__invokeResult.get();
    }
    set invokeResult(newValue: string) {
        this.__invokeResult.set(newValue);
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
            this.eachResult = each([1, 2, 3], () => {
            }); //1,2,3
            this.mapResult = map([1, 2, 3], (num: any) => {
                return num * 3;
            }); //3,6,9
            this.reduceResult = reduce([1, 2, 3], (memo: any, num: any): any => {
                return memo + num;
            }, 0); //6
            this.filterResult = filter([1, 2, 3, 4, 5, 6], (num: any) => {
                return num % 2 == 0;
            }); //2,4,6
            this.invokeResult = invoke([[5, 1, 7], [3, 2, 1]], 'sort'); //1,5,7,1,2,3
        });
        Button.pop();
        Column.create();
        Column.width('100%');
        Column.alignItems(HorizontalAlign.Start);
        Text.create('数据：[1, 2, 3]');
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('each: ' + this.eachResult);
        Text.fontSize(25);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('map(return num * 3): ' + this.mapResult);
        Text.fontSize(25);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('reduce(return memo + num): ' + this.reduceResult);
        Text.fontSize(25);
        Text.margin({ bottom: 30 });
        Text.pop();
        Text.create('数据：[1, 2, 3, 4, 5, 6]');
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('filter(return num % 2 == 0): ' + this.filterResult);
        Text.fontSize(25);
        Text.margin({ bottom: 30 });
        Text.pop();
        Text.create('数据：[[5, 1, 7], [3, 2, 1]], sort');
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('invoke: ' + this.invokeResult);
        Text.fontSize(25);
        Text.margin({ bottom: 30 });
        Text.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new Collections("1", undefined, {}));
