interface Index_Params {
    value1?: string;
    value2?: string;
    value3?: string;
    value4?: string;
    value5?: string;
    value6?: string;
    value7?: string;
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
import typed from 'typed-function';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__value1 = new ObservedPropertySimple('', this, "value1");
        this.__value2 = new ObservedPropertySimple('', this, "value2");
        this.__value3 = new ObservedPropertySimple('', this, "value3");
        this.__value4 = new ObservedPropertySimple('', this, "value4");
        this.__value5 = new ObservedPropertySimple('', this, "value5");
        this.__value6 = new ObservedPropertySimple('', this, "value6");
        this.__value7 = new ObservedPropertySimple('', this, "value7");
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
        if (params.value6 !== undefined) {
            this.value6 = params.value6;
        }
        if (params.value7 !== undefined) {
            this.value7 = params.value7;
        }
    }
    aboutToBeDeleted() {
        this.__value1.aboutToBeDeleted();
        this.__value2.aboutToBeDeleted();
        this.__value3.aboutToBeDeleted();
        this.__value4.aboutToBeDeleted();
        this.__value5.aboutToBeDeleted();
        this.__value6.aboutToBeDeleted();
        this.__value7.aboutToBeDeleted();
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
    private __value6: ObservedPropertySimple<string>;
    get value6() {
        return this.__value6.get();
    }
    set value6(newValue: string) {
        this.__value6.set(newValue);
    }
    private __value7: ObservedPropertySimple<string>;
    get value7() {
        return this.__value7.get();
    }
    set value7(newValue: string) {
        this.__value7.set(newValue);
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
            let fn: any = typed({
                string: (value: string) => {
                    return 'string:' + value;
                },
                number: (value: number) => {
                    return 'number:' + value;
                },
                boolean: (value: boolean) => {
                    return 'boolean:' + value;
                },
                'number,number': () => {
                    return 'number,number';
                },
                'string,string': () => {
                    return 'string,string';
                },
                'Array,string': () => {
                    return 'Array,string';
                },
                'number,number,string': () => {
                    return 'three';
                }
            });
            this.value1 = fn("foo");
            this.value2 = fn(123);
            this.value3 = fn(false);
            this.value4 = fn(12, 34);
            this.value5 = fn("foo", "bar");
            this.value6 = fn([], "foo");
            this.value7 = fn(11, 22, "foo");
        });
        Button.pop();
        Column.create();
        Column.width('100%');
        Column.alignItems(HorizontalAlign.Start);
        Text.create('类型：string; 输入值："foo"');
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('返回: ' + this.value1);
        Text.fontSize(25);
        Text.margin({ bottom: 15 });
        Text.pop();
        Text.create('类型：number; 输入值：123');
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('返回: ' + this.value2);
        Text.fontSize(25);
        Text.margin({ bottom: 15 });
        Text.pop();
        Text.create('类型：boolean; 输入值：false');
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('返回: ' + this.value3);
        Text.fontSize(25);
        Text.margin({ bottom: 15 });
        Text.pop();
        Text.create('类型：number,number; 输入值：12,34');
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('返回: ' + this.value4);
        Text.fontSize(25);
        Text.margin({ bottom: 15 });
        Text.pop();
        Text.create('类型：string,string; 输入值："foo", "bar"');
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('返回: ' + this.value5);
        Text.fontSize(25);
        Text.margin({ bottom: 15 });
        Text.pop();
        Text.create('类型：Array,string; 输入值：[],"foo"');
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('返回: ' + this.value6);
        Text.fontSize(25);
        Text.margin({ bottom: 15 });
        Text.pop();
        Text.create('类型：number,number,string; 输入值：11,22,"foo"');
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('返回: ' + this.value7);
        Text.fontSize(25);
        Text.margin({ bottom: 15 });
        Text.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
