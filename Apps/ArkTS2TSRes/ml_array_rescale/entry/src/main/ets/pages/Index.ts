interface Index_Params {
    arr?: Array<number>;
    inputStr1?: string;
    inputStr2?: string;
    inputStr3?: string;
    inputStr4?: string;
    inputStr5?: string;
    inputStr6?: string;
    inputStr7?: string;
    inputStr8?: string;
    result1?: string;
    result2?: string;
    result3?: string;
    result4?: string;
    result5?: string;
    result6?: string;
    result7?: string;
    result8?: string;
    inputMin1?;
    inputMin2?;
    inputMin3?;
    inputMax1?;
    inputMax2?;
    inputMax3?;
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
import rescale from "ml-array-rescale";
const errHint: string = '请输入有效数据';
const min: number = 0;
const max: number = 2;
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.arr = [1, 2, 3];
        this.inputStr1 = '';
        this.inputStr2 = '';
        this.inputStr3 = '';
        this.inputStr4 = '';
        this.inputStr5 = '';
        this.inputStr6 = '';
        this.inputStr7 = '';
        this.inputStr8 = '';
        this.__result1 = new ObservedPropertySimple('', this, "result1");
        this.__result2 = new ObservedPropertySimple('', this, "result2");
        this.__result3 = new ObservedPropertySimple('', this, "result3");
        this.__result4 = new ObservedPropertySimple('', this, "result4");
        this.__result5 = new ObservedPropertySimple('', this, "result5");
        this.__result6 = new ObservedPropertySimple('', this, "result6");
        this.__result7 = new ObservedPropertySimple('', this, "result7");
        this.__result8 = new ObservedPropertySimple('', this, "result8");
        this.inputMin1 = "";
        this.inputMin2 = "";
        this.inputMin3 = "";
        this.inputMax1 = "";
        this.inputMax2 = "";
        this.inputMax3 = "";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.inputStr1 !== undefined) {
            this.inputStr1 = params.inputStr1;
        }
        if (params.inputStr2 !== undefined) {
            this.inputStr2 = params.inputStr2;
        }
        if (params.inputStr3 !== undefined) {
            this.inputStr3 = params.inputStr3;
        }
        if (params.inputStr4 !== undefined) {
            this.inputStr4 = params.inputStr4;
        }
        if (params.inputStr5 !== undefined) {
            this.inputStr5 = params.inputStr5;
        }
        if (params.inputStr6 !== undefined) {
            this.inputStr6 = params.inputStr6;
        }
        if (params.inputStr7 !== undefined) {
            this.inputStr7 = params.inputStr7;
        }
        if (params.inputStr8 !== undefined) {
            this.inputStr8 = params.inputStr8;
        }
        if (params.result1 !== undefined) {
            this.result1 = params.result1;
        }
        if (params.result2 !== undefined) {
            this.result2 = params.result2;
        }
        if (params.result3 !== undefined) {
            this.result3 = params.result3;
        }
        if (params.result4 !== undefined) {
            this.result4 = params.result4;
        }
        if (params.result5 !== undefined) {
            this.result5 = params.result5;
        }
        if (params.result6 !== undefined) {
            this.result6 = params.result6;
        }
        if (params.result7 !== undefined) {
            this.result7 = params.result7;
        }
        if (params.result8 !== undefined) {
            this.result8 = params.result8;
        }
        if (params.inputMin1 !== undefined) {
            this.inputMin1 = params.inputMin1;
        }
        if (params.inputMin2 !== undefined) {
            this.inputMin2 = params.inputMin2;
        }
        if (params.inputMin3 !== undefined) {
            this.inputMin3 = params.inputMin3;
        }
        if (params.inputMax1 !== undefined) {
            this.inputMax1 = params.inputMax1;
        }
        if (params.inputMax2 !== undefined) {
            this.inputMax2 = params.inputMax2;
        }
        if (params.inputMax3 !== undefined) {
            this.inputMax3 = params.inputMax3;
        }
    }
    aboutToBeDeleted() {
        this.__result1.aboutToBeDeleted();
        this.__result2.aboutToBeDeleted();
        this.__result3.aboutToBeDeleted();
        this.__result4.aboutToBeDeleted();
        this.__result5.aboutToBeDeleted();
        this.__result6.aboutToBeDeleted();
        this.__result7.aboutToBeDeleted();
        this.__result8.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private arr: Array<number>;
    private inputStr1: string;
    private inputStr2: string;
    private inputStr3: string;
    private inputStr4: string;
    private inputStr5: string;
    private inputStr6: string;
    private inputStr7: string;
    private inputStr8: string;
    private __result1: ObservedPropertySimple<string>;
    get result1() {
        return this.__result1.get();
    }
    set result1(newValue: string) {
        this.__result1.set(newValue);
    }
    private __result2: ObservedPropertySimple<string>;
    get result2() {
        return this.__result2.get();
    }
    set result2(newValue: string) {
        this.__result2.set(newValue);
    }
    private __result3: ObservedPropertySimple<string>;
    get result3() {
        return this.__result3.get();
    }
    set result3(newValue: string) {
        this.__result3.set(newValue);
    }
    private __result4: ObservedPropertySimple<string>;
    get result4() {
        return this.__result4.get();
    }
    set result4(newValue: string) {
        this.__result4.set(newValue);
    }
    private __result5: ObservedPropertySimple<string>;
    get result5() {
        return this.__result5.get();
    }
    set result5(newValue: string) {
        this.__result5.set(newValue);
    }
    private __result6: ObservedPropertySimple<string>;
    get result6() {
        return this.__result6.get();
    }
    set result6(newValue: string) {
        this.__result6.set(newValue);
    }
    private __result7: ObservedPropertySimple<string>;
    get result7() {
        return this.__result7.get();
    }
    set result7(newValue: string) {
        this.__result7.set(newValue);
    }
    private __result8: ObservedPropertySimple<string>;
    get result8() {
        return this.__result8.get();
    }
    set result8(newValue: string) {
        this.__result8.set(newValue);
    }
    private inputMin1;
    private inputMin2;
    private inputMin3;
    private inputMax1;
    private inputMax2;
    private inputMax3;
    render() {
        Scroll.create();
        Scroll.height('100%');
        Row.create();
        Column.create();
        Column.width('100%');
        Text.create('rescale(array)使用示例');
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Normal);
        Text.margin({ top: 10 });
        Text.pop();
        TextInput.create({ placeholder: '请输入数组 如： [1,2,3]' });
        TextInput.height(50);
        TextInput.fontSize("18vp");
        TextInput.margin({ top: 10 });
        TextInput.width('80%');
        TextInput.onChange((value) => {
            this.inputStr1 = value;
        });
        Text.create('无输入默认值为 [1,2,3]');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Normal);
        Text.margin({ top: 10 });
        Text.pop();
        Text.create('点击，运算');
        Text.fontSize(30);
        Text.height(50);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: 10 });
        Text.onClick((ev) => {
            let tmpArr: Array<number> = [];
            if (this.inputStr1) {
                try {
                    tmpArr = JSON.parse(this.inputStr1);
                }
                catch (e) {
                    console.log('test page 1 e:' + e.message);
                    this.result1 = errHint;
                    return;
                }
            }
            else {
                tmpArr = this.arr;
            }
            if (isAnyArray(tmpArr) && tmpArr.length > 0) {
                this.result1 = JSON.stringify(rescale(tmpArr));
            }
            else {
                this.result1 = errHint;
            }
        });
        Text.pop();
        Text.create('结果: ' + this.result1);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: 10 });
        Text.pop();
        Text.create('rescale(array, { outputArrray })使用示例');
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Normal);
        Text.margin({ top: 30 });
        Text.pop();
        TextInput.create({ placeholder: '请输入数组 如： [1,2,3]' });
        TextInput.height(50);
        TextInput.fontSize("18vp");
        TextInput.margin({ top: 10 });
        TextInput.width('80%');
        TextInput.onChange((value) => {
            this.inputStr2 = value;
        });
        Text.create('无输入默认值为 [1,2,3]');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Normal);
        Text.margin({ top: 10 });
        Text.pop();
        Text.create('点击，运算');
        Text.fontSize(30);
        Text.height(50);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: 10 });
        Text.onClick((ev) => {
            let tmpArr: Array<number> = [];
            if (this.inputStr2) {
                try {
                    tmpArr = JSON.parse(this.inputStr2);
                }
                catch (e) {
                    console.log('test page 2 e:' + e.message);
                    this.result2 = errHint;
                    return;
                }
            }
            else {
                tmpArr = this.arr;
            }
            if (isAnyArray(tmpArr) && tmpArr.length > 0) {
                const output = new Array<number>(tmpArr.length);
                rescale(tmpArr, { output });
                this.result2 = JSON.stringify(output);
            }
            else {
                this.result2 = errHint;
            }
        });
        Text.pop();
        Text.create('outputArrray结果: ' + this.result2);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: 10 });
        Text.pop();
        Text.create('rescale(array, { output: array });使用示例');
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Normal);
        Text.margin({ top: 30 });
        Text.pop();
        TextInput.create({ placeholder: '请输入数组 如： [1,2,3]' });
        TextInput.height(50);
        TextInput.fontSize("18vp");
        TextInput.margin({ top: 10 });
        TextInput.width('80%');
        TextInput.onChange((value) => {
            this.inputStr3 = value;
        });
        Text.create('无输入默认值为 [1,2,3]');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Normal);
        Text.margin({ top: 10 });
        Text.pop();
        Text.create('点击，运算');
        Text.fontSize(30);
        Text.height(50);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: 10 });
        Text.onClick((ev) => {
            let tmpArr: Array<number> = [];
            if (this.inputStr3) {
                try {
                    tmpArr = JSON.parse(this.inputStr3);
                }
                catch (e) {
                    console.log('test page 3 e:' + e.message);
                    this.result3 = errHint;
                    return;
                }
            }
            else {
                tmpArr = this.arr;
            }
            if (isAnyArray(tmpArr) && tmpArr.length > 0) {
                rescale(tmpArr, { output: tmpArr });
                this.result3 = JSON.stringify(tmpArr);
            }
            else {
                this.result3 = errHint;
            }
        });
        Text.pop();
        Text.create('array结果: ' + this.result3);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: 10 });
        Text.pop();
        Text.create('rescale(array, { min })使用示例');
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Normal);
        Text.margin({ top: 30 });
        Text.pop();
        TextInput.create({ placeholder: '请输入数组 如： [1,2,3]' });
        TextInput.height(50);
        TextInput.fontSize("18vp");
        TextInput.margin({ top: 10 });
        TextInput.width('80%');
        TextInput.onChange((value) => {
            this.inputStr4 = value;
        });
        Text.create('无输入默认值为 [1,2,3]');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Normal);
        Text.margin({ top: 10 });
        Text.pop();
        TextInput.create({ placeholder: '请输入min值' });
        TextInput.height(50);
        TextInput.fontSize("18vp");
        TextInput.margin({ top: 10 });
        TextInput.width('80%');
        TextInput.onChange((value) => {
            this.inputMin1 = value;
        });
        Text.create('无输入min默认值为 ' + min);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Normal);
        Text.margin({ top: 10 });
        Text.pop();
        Text.create('点击，运算');
        Text.fontSize(30);
        Text.height(50);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: 10 });
        Text.onClick((ev) => {
            console.log('test page min 1');
            let tmpArr: Array<number> = [];
            let tmpMin: number;
            this.result4 = '';
            if (this.inputStr4) {
                console.log('test page min 2');
                try {
                    tmpArr = JSON.parse(this.inputStr4);
                }
                catch (e) {
                    console.log('test page 4 e:' + e.message);
                    this.result4 = errHint;
                    return;
                }
            }
            else {
                console.log('test page min 3');
                tmpArr = this.arr;
            }
            if (!!this.inputMin1) {
                console.log('test page min 4');
                try {
                    tmpMin = Number.parseInt(this.inputMin1);
                    console.log('test page min 4 tmpMin:' + tmpMin);
                }
                catch (e) {
                    console.log('test page min 5');
                    console.log('test page 5 e:' + e.message);
                    this.result4 = errHint;
                    return;
                }
            }
            else {
                console.log('test page min 6');
                tmpMin = min;
            }
            console.log('test page min 7 ' + tmpMin);
            if (isAnyArray(tmpArr) && tmpArr.length > 0 && (tmpMin || tmpMin == 0) && !!!this.result4) {
                console.log('test page min 8 tmpMin:' + tmpMin);
                try {
                    this.result4 = JSON.stringify(rescale(tmpArr, { min: tmpMin }));
                }
                catch (e) {
                    console.log('test page min 8 e:' + e.message);
                    this.result4 = e.message;
                }
            }
            else {
                console.log('test page min 9');
                this.result4 = errHint;
            }
        });
        Text.pop();
        Text.create('结果: ' + this.result4);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: 10 });
        Text.pop();
        Text.create('rescale(array, { max })使用示例');
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Normal);
        Text.margin({ top: 30 });
        Text.pop();
        TextInput.create({ placeholder: '请输入数组 如： [1,2,3]' });
        TextInput.height(50);
        TextInput.fontSize("18vp");
        TextInput.margin({ top: 10 });
        TextInput.width('80%');
        TextInput.onChange((value) => {
            this.inputStr5 = value;
        });
        Text.create('无输入默认值为 [1,2,3]');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Normal);
        Text.margin({ top: 10 });
        Text.pop();
        TextInput.create({ placeholder: '请输入max值' });
        TextInput.height(50);
        TextInput.fontSize("18vp");
        TextInput.margin({ top: 10 });
        TextInput.width('80%');
        TextInput.onChange((value) => {
            this.inputMax1 = value;
        });
        Text.create('无输入max默认值为 ' + max);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Normal);
        Text.margin({ top: 10 });
        Text.pop();
        Text.create('点击，运算');
        Text.fontSize(30);
        Text.height(50);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: 10 });
        Text.onClick((ev) => {
            let tmpArr: Array<number> = [];
            let tmpMax: number;
            this.result5 = '';
            if (this.inputStr5) {
                try {
                    tmpArr = JSON.parse(this.inputStr5);
                }
                catch (e) {
                    console.log('test page 6 e:' + e.message);
                    this.result5 = errHint;
                    return;
                }
            }
            else {
                tmpArr = this.arr;
            }
            if (!!this.inputMax1) {
                try {
                    tmpMax = Number.parseInt(this.inputMax1);
                }
                catch (e) {
                    console.log('test page 7 e:' + e.message);
                    this.result5 = errHint;
                    return;
                }
            }
            else {
                tmpMax = max;
            }
            if (isAnyArray(tmpArr) && tmpArr.length > 0 && (tmpMax || tmpMax == 0) && !!!this.result5) {
                try {
                    this.result5 = JSON.stringify(rescale(tmpArr, { max: tmpMax }));
                }
                catch (e) {
                    console.log('test page min 7 e:' + e.message);
                    this.result5 = e.message;
                }
            }
            else {
                this.result5 = errHint;
            }
        });
        Text.pop();
        Text.create('结果: ' + this.result5);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: 10 });
        Text.pop();
        Text.create('rescale(array, { min, autoMinMax: true })使用示例');
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Normal);
        Text.margin({ top: 30 });
        Text.pop();
        TextInput.create({ placeholder: '请输入数组 如： [1,2,3]' });
        TextInput.height(50);
        TextInput.fontSize("18vp");
        TextInput.margin({ top: 10 });
        TextInput.width('80%');
        TextInput.onChange((value) => {
            this.inputStr6 = value;
        });
        Text.create('无输入默认值为 [1,2,3]');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Normal);
        Text.margin({ top: 10 });
        Text.pop();
        TextInput.create({ placeholder: '请输入min值' });
        TextInput.height(50);
        TextInput.fontSize("18vp");
        TextInput.margin({ top: 10 });
        TextInput.width('80%');
        TextInput.onChange((value) => {
            this.inputMin2 = value;
        });
        Text.create('无输入min默认值为 ' + min);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Normal);
        Text.margin({ top: 10 });
        Text.pop();
        Text.create('点击，运算');
        Text.fontSize(30);
        Text.height(50);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: 10 });
        Text.onClick((ev) => {
            let tmpArr: Array<number> = [];
            let tmpMin: number;
            this.result6 = '';
            if (this.inputStr6) {
                try {
                    tmpArr = JSON.parse(this.inputStr6);
                }
                catch (e) {
                    console.log('test page 8 e:' + e.message);
                    this.result6 = errHint;
                    return;
                }
            }
            else {
                tmpArr = this.arr;
            }
            if (!!this.inputMin2) {
                try {
                    tmpMin = Number.parseInt(this.inputMin2);
                }
                catch (e) {
                    console.log('test page 9 e:' + e.message);
                    this.result6 = errHint;
                    return;
                }
            }
            else {
                tmpMin = min;
            }
            if (isAnyArray(tmpArr) && tmpArr.length > 0 && (tmpMin || tmpMin == 0) && !!!this.result6) {
                try {
                    this.result6 = JSON.stringify(rescale(tmpArr, { min: tmpMin, autoMinMax: true }));
                }
                catch (e) {
                    console.log('test page min 9 e:' + e.message);
                    this.result6 = e.message;
                }
            }
            else {
                this.result6 = errHint;
            }
        });
        Text.pop();
        Text.create('结果: ' + this.result6);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: 10 });
        Text.pop();
        Text.create('rescale(array, { max, autoMinMax: true })使用示例');
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Normal);
        Text.margin({ top: 30 });
        Text.pop();
        TextInput.create({ placeholder: '请输入数组 如： [1,2,3]' });
        TextInput.height(50);
        TextInput.fontSize("18vp");
        TextInput.margin({ top: 10 });
        TextInput.width('80%');
        TextInput.onChange((value) => {
            this.inputStr7 = value;
        });
        Text.create('无输入默认值为 [1,2,3]');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Normal);
        Text.margin({ top: 10 });
        Text.pop();
        TextInput.create({ placeholder: '请输入max值' });
        TextInput.height(50);
        TextInput.fontSize("18vp");
        TextInput.margin({ top: 10 });
        TextInput.width('80%');
        TextInput.onChange((value) => {
            this.inputMax2 = value;
        });
        Text.create('无输入max默认值为 ' + max);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Normal);
        Text.margin({ top: 10 });
        Text.pop();
        Text.create('点击，运算');
        Text.fontSize(30);
        Text.height(50);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: 10 });
        Text.onClick((ev) => {
            let tmpArr: Array<number> = [];
            let tmpMax: number;
            this.result7 = '';
            if (this.inputStr7) {
                try {
                    tmpArr = JSON.parse(this.inputStr7);
                }
                catch (e) {
                    console.log('test page 10 e:' + e.message);
                    this.result7 = errHint;
                    return;
                }
            }
            else {
                tmpArr = this.arr;
            }
            if (!!this.inputMax2) {
                try {
                    tmpMax = Number.parseInt(this.inputMax2);
                }
                catch (e) {
                    console.log('test page 11 e:' + e.message);
                    this.result7 = e.message;
                    return;
                }
            }
            else {
                tmpMax = max;
            }
            if (isAnyArray(tmpArr) && tmpArr.length > 0 && (tmpMax || tmpMax == 0) && !!!this.result7) {
                try {
                    this.result7 = JSON.stringify(rescale(tmpArr, { max: tmpMax, autoMinMax: true }));
                }
                catch (e) {
                    console.log('test page min 11 e:' + e.message);
                    this.result7 = e.message;
                }
            }
            else {
                this.result7 = errHint;
            }
        });
        Text.pop();
        Text.create('结果: ' + this.result7);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: 10 });
        Text.pop();
        Text.create('rescale(array, { min, max })使用示例');
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Normal);
        Text.margin({ top: 30 });
        Text.pop();
        TextInput.create({ placeholder: '请输入数组 如： [1,2,3]' });
        TextInput.height(50);
        TextInput.fontSize("18vp");
        TextInput.margin({ top: 10 });
        TextInput.width('80%');
        TextInput.onChange((value) => {
            this.inputStr8 = value;
        });
        Text.create('无输入默认值为 [1,2,3]');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Normal);
        Text.margin({ top: 10 });
        Text.pop();
        TextInput.create({ placeholder: '请输入min值' });
        TextInput.height(50);
        TextInput.fontSize("18vp");
        TextInput.margin({ top: 10 });
        TextInput.width('80%');
        TextInput.onChange((value) => {
            this.inputMin3 = value;
        });
        Text.create('无输入min默认值为 ' + min);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Normal);
        Text.margin({ top: 10 });
        Text.pop();
        TextInput.create({ placeholder: '请输入max值' });
        TextInput.height(50);
        TextInput.fontSize("18vp");
        TextInput.margin({ top: 10 });
        TextInput.width('80%');
        TextInput.onChange((value) => {
            this.inputMax3 = value;
        });
        Text.create('无输入max默认值为 ' + max);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Normal);
        Text.margin({ top: 10 });
        Text.pop();
        Text.create('点击，运算');
        Text.fontSize(30);
        Text.height(50);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: 10 });
        Text.onClick((ev) => {
            let tmpArr: Array<number> = [];
            let tmpMin: number;
            let tmpMax: number;
            this.result8 = '';
            if (this.inputStr8) {
                try {
                    tmpArr = JSON.parse(this.inputStr8);
                }
                catch (e) {
                    console.log('test page 12 e:' + e.message);
                    this.result8 = errHint;
                    return;
                }
            }
            else {
                tmpArr = this.arr;
            }
            if (!!this.inputMin3) {
                try {
                    tmpMin = Number.parseInt(this.inputMin3);
                }
                catch (e) {
                    console.log('test page 13 e:' + e.message);
                    this.result8 = errHint;
                    return;
                }
            }
            else {
                tmpMin = min;
            }
            if (!!this.inputMax3) {
                try {
                    tmpMax = Number.parseInt(this.inputMax3);
                }
                catch (e) {
                    console.log('test page 14 e:' + e.message);
                    this.result8 = errHint;
                    return;
                }
            }
            else {
                tmpMax = max;
            }
            if (isAnyArray(tmpArr) && tmpArr.length > 0 && (tmpMax || tmpMax == 0) && (tmpMin || tmpMin == 0) && !!!this.result8) {
                try {
                    this.result8 = JSON.stringify(rescale(tmpArr, { min: tmpMin, max: tmpMax }));
                }
                catch (e) {
                    console.log('test page min 14 e:' + e.message);
                    this.result8 = e.message;
                }
            }
            else {
                this.result8 = errHint;
            }
        });
        Text.pop();
        Text.create('结果: ' + this.result8);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: 10, bottom: 30 });
        Text.pop();
        Column.pop();
        Row.pop();
        Scroll.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
