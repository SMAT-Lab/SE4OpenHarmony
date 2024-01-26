interface Index_Params {
    result?: string;
    addResult?: string;
    divResult?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import Fraction from 'fraction.js';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__result = new ObservedPropertySimple('', this, "result");
        this.__addResult = new ObservedPropertySimple('', this, "addResult");
        this.__divResult = new ObservedPropertySimple('', this, "divResult");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.result !== undefined) {
            this.result = params.result;
        }
        if (params.addResult !== undefined) {
            this.addResult = params.addResult;
        }
        if (params.divResult !== undefined) {
            this.divResult = params.divResult;
        }
    }
    aboutToBeDeleted() {
        this.__result.aboutToBeDeleted();
        this.__addResult.aboutToBeDeleted();
        this.__divResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __result: ObservedPropertySimple<string>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: string) {
        this.__result.set(newValue);
    }
    private __addResult: ObservedPropertySimple<string>;
    get addResult() {
        return this.__addResult.get();
    }
    set addResult(newValue: string) {
        this.__addResult.set(newValue);
    }
    private __divResult: ObservedPropertySimple<string>;
    get divResult() {
        return this.__divResult.get();
    }
    set divResult(newValue: string) {
        this.__divResult.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create('new Fraction(123.4567)');
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let x = new Fraction(123.4567);
            this.result = x.toString();
        });
        Text.pop();
        Text.create("结果:" + this.result);
        Text.fontSize(30);
        Text.pop();
        Text.create('new Fraction(123.7).add(33)');
        Text.fontSize(30);
        Text.margin({ top: 20 });
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let x = new Fraction(123.7);
            this.addResult = x.add(33).toString();
        });
        Text.pop();
        Text.create("结果:" + this.addResult);
        Text.fontSize(30);
        Text.pop();
        Text.create('new Fraction(123.7).div(33)');
        Text.fontSize(30);
        Text.margin({ top: 20 });
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let x = new Fraction(123.7);
            this.divResult = x.div(33).toString();
        });
        Text.pop();
        Text.create("结果:" + this.divResult);
        Text.fontSize(30);
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
