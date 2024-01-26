interface Index_Params {
    arr?: Array<number>;
    inputStr?: string;
    result?: string;
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
import { isAnyArray } from "is-any-array";
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.arr = [1, 2, 3];
        this.inputStr = '';
        this.__result = new ObservedPropertySimple('', this, "result");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.inputStr !== undefined) {
            this.inputStr = params.inputStr;
        }
        if (params.result !== undefined) {
            this.result = params.result;
        }
    }
    aboutToBeDeleted() {
        this.__result.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private arr: Array<number>;
    private inputStr: string;
    private __result: ObservedPropertySimple<string>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: string) {
        this.__result.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        TextInput.create({ placeholder: '请输入数组 如： [1,2,3]' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.width('80%');
        TextInput.onChange((value) => {
            this.inputStr = value;
            console.info('test change:' + value);
        });
        Text.create('无输入默认值为 [1,2,3]');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Normal);
        Text.margin({ top: 10 });
        Text.pop();
        Text.create('是否是数组判断：');
        Text.fontSize(30);
        Text.height(50);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: 10 });
        Text.onClick((ev) => {
            let tmpArr: string;
            if (this.inputStr) {
                try {
                    tmpArr = JSON.parse(this.inputStr);
                }
                catch (e) {
                    tmpArr = this.inputStr;
                }
                this.result = isAnyArray(tmpArr) + '';
            }
            else {
                this.result = isAnyArray(this.arr) + '';
            }
        });
        Text.pop();
        Text.create('结果: ' + this.result);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: 10 });
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
