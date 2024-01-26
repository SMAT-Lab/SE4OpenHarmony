interface Objects_Params {
    keysResult?: string;
    valuesResult?: string;
    pairsResult?: string;
    extendResult?: string;
    cloneResult?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Objects_" + ++__generate__Id;
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
import { keys, values, pairs, extend, clone } from 'underscore';
class Objects extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__keysResult = new ObservedPropertySimple('', this, "keysResult");
        this.__valuesResult = new ObservedPropertySimple('', this, "valuesResult");
        this.__pairsResult = new ObservedPropertySimple('', this, "pairsResult");
        this.__extendResult = new ObservedPropertySimple('', this, "extendResult");
        this.__cloneResult = new ObservedPropertySimple('', this, "cloneResult");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Objects_Params) {
        if (params.keysResult !== undefined) {
            this.keysResult = params.keysResult;
        }
        if (params.valuesResult !== undefined) {
            this.valuesResult = params.valuesResult;
        }
        if (params.pairsResult !== undefined) {
            this.pairsResult = params.pairsResult;
        }
        if (params.extendResult !== undefined) {
            this.extendResult = params.extendResult;
        }
        if (params.cloneResult !== undefined) {
            this.cloneResult = params.cloneResult;
        }
    }
    aboutToBeDeleted() {
        this.__keysResult.aboutToBeDeleted();
        this.__valuesResult.aboutToBeDeleted();
        this.__pairsResult.aboutToBeDeleted();
        this.__extendResult.aboutToBeDeleted();
        this.__cloneResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __keysResult: ObservedPropertySimple<string>;
    get keysResult() {
        return this.__keysResult.get();
    }
    set keysResult(newValue: string) {
        this.__keysResult.set(newValue);
    }
    private __valuesResult: ObservedPropertySimple<string>;
    get valuesResult() {
        return this.__valuesResult.get();
    }
    set valuesResult(newValue: string) {
        this.__valuesResult.set(newValue);
    }
    private __pairsResult: ObservedPropertySimple<string>;
    get pairsResult() {
        return this.__pairsResult.get();
    }
    set pairsResult(newValue: string) {
        this.__pairsResult.set(newValue);
    }
    private __extendResult: ObservedPropertySimple<string>;
    get extendResult() {
        return this.__extendResult.get();
    }
    set extendResult(newValue: string) {
        this.__extendResult.set(newValue);
    }
    private __cloneResult: ObservedPropertySimple<string>;
    get cloneResult() {
        return this.__cloneResult.get();
    }
    set cloneResult(newValue: string) {
        this.__cloneResult.set(newValue);
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
            this.keysResult = keys({ one: 1, two: 2, three: 3 }); //one,two,three
            this.valuesResult = values({ one: 1, two: 2, three: 3 }); //1,2,3
            this.pairsResult = pairs({ one: 1, two: 2, three: 3 }); //one,1,two,2,three,3
            this.extendResult = extend({}, { a: 'b' }).a; //b
            this.cloneResult = clone({ name: 'moe' }).name; //moe
        });
        Button.pop();
        Column.create();
        Column.width('100%');
        Column.alignItems(HorizontalAlign.Start);
        Text.create('数据：{ one: 1, two: 2, three: 3 }');
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('keys: ' + this.keysResult);
        Text.fontSize(25);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('values: ' + this.valuesResult);
        Text.fontSize(25);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('pairs: ' + this.pairsResult);
        Text.fontSize(25);
        Text.margin({ bottom: 30 });
        Text.pop();
        Text.create('数据：{}, { a: b }');
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('extend: ' + this.extendResult);
        Text.fontSize(25);
        Text.margin({ bottom: 30 });
        Text.pop();
        Text.create('数据：{ name: moe }');
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('clone: ' + this.cloneResult);
        Text.fontSize(25);
        Text.margin({ bottom: 30 });
        Text.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new Objects("1", undefined, {}));
