interface Index_Params {
    message?: string;
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
import isEqual from 'lodash.isequal';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('比较得结果是：', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Scroll.create();
        Scroll.width('100%');
        Scroll.height('100%');
        Column.create();
        Column.width('100%');
        Flex.create({
            alignItems: ItemAlign.Start,
            justifyContent: FlexAlign.Start,
            alignContent: FlexAlign.Start,
            direction: FlexDirection.Column
        });
        Text.create(this.message);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.width('100%');
        Text.padding(10);
        Text.backgroundColor(Color.Red);
        Text.fontColor(Color.White);
        Text.pop();
        Text.create('数字类型比较');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.width('100%');
        Text.height(50);
        Text.margin({
            top: 20
        });
        Text.backgroundColor(Color.Blue);
        Text.fontColor(Color.White);
        Text.onClick(() => {
            this.numberDataTypeisEqual();
        });
        Text.pop();
        Text.create('字符串类型比较');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.width('100%');
        Text.height(50);
        Text.margin({
            top: 20
        });
        Text.backgroundColor(Color.Blue);
        Text.fontColor(Color.White);
        Text.onClick(() => {
            this.stringDataTypeisEqual();
        });
        Text.pop();
        Text.create('布尔类型比较');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.width('100%');
        Text.height(50);
        Text.margin({
            top: 20
        });
        Text.backgroundColor(Color.Blue);
        Text.fontColor(Color.White);
        Text.onClick(() => {
            this.boolDataTypeisEqual();
        });
        Text.pop();
        Text.create('数组类型比较');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.width('100%');
        Text.height(50);
        Text.margin({
            top: 20
        });
        Text.backgroundColor(Color.Blue);
        Text.fontColor(Color.White);
        Text.onClick(() => {
            this.arrayDataTypeisEqual();
        });
        Text.pop();
        Text.create('对象类型比较');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.width('100%');
        Text.height(50);
        Text.margin({
            top: 20
        });
        Text.backgroundColor(Color.Blue);
        Text.fontColor(Color.White);
        Text.onClick(() => {
            this.objectDataTypeisEqual();
        });
        Text.pop();
        Flex.pop();
        Column.pop();
        Scroll.pop();
        Row.pop();
    }
    numberDataTypeisEqual() {
        let a = 1;
        let b = 1;
        let res: boolean = isEqual(a, b);
        this.message = 'a = ' + a + ' b= ' + b
            + '\r\na和b比较结果\r\n' + res + '\r\n';
        a = 1;
        b = 2;
        res = isEqual(a, b);
        this.message = 'a = ' + a + ' b= ' + b
            + '\r\na和b比较结果\r\n' + res + '\r\n';
        a = 1.1;
        b = 2.1;
        res = isEqual(a, b);
        this.message = 'a = ' + a + ' b= ' + b
            + '\r\na和b比较结果\r\n' + res + '\r\n';
        a = 1.1;
        b = 1.1;
        res = isEqual(a, b);
        this.message = 'a = ' + a + ' b= ' + b
            + '\r\na和b比较结果\r\n' + res + '\r\n';
    }
    stringDataTypeisEqual() {
        let a = "'abc'";
        let b = "'abc'";
        let res: boolean = isEqual(a, b);
        this.message = 'a = ' + a + ' b= ' + b
            + '\r\na和b比较结果\r\n' + res + '\r\n';
        a = "'abcd'";
        b = "'abc'";
        res = isEqual(a, b);
        this.message = 'a = ' + a + ' b= ' + b
            + '\r\na和b比较结果\r\n' + res + '\r\n';
    }
    boolDataTypeisEqual() {
        let a = false;
        let b = false;
        let res: boolean = isEqual(a, b);
        this.message = 'a = ' + a + ' b= ' + b
            + '\r\na和b比较结果\r\n' + res + '\r\n';
        a = false;
        b = true;
        res = isEqual(a, b);
        this.message = 'a = ' + a + ' b= ' + b
            + '\r\na和b比较结果\r\n' + res + '\r\n';
    }
    arrayDataTypeisEqual() {
        let a = [1, 2];
        let b = [1, 2];
        let res: boolean = isEqual(a, b);
        this.message = 'a = [' + a + '] b= [' + b + ']'
            + '\r\na和b比较结果\r\n' + res + '\r\n';
        a = [1, 2];
        b = [1, 3];
        res = isEqual(a, b);
        this.message = 'a = [' + a + '] b= [' + b + ']'
            + '\r\na和b比较结果\r\n' + res + '\r\n';
    }
    objectDataTypeisEqual() {
        class Temp {
            no: number;
            name: string;
            constructor(no: number, name: string) {
                this.no = no;
                this.name = name;
            }
        }
        let a = new Temp(1, 'xiaoming');
        let b = new Temp(2, 'xiaoming');
        let res: boolean = isEqual(a, b);
        this.message = this.message + '\r\n'
            + 'a = [' + a + '] b= [' + b + ']'
            + '\r\na和b比较结果\r\n' + res + '\r\n';
        a = new Temp(1, 'xiaoming');
        b = new Temp(1, 'xiaoming');
        res = isEqual(a, b);
        this.message = 'a = [' + a + '] b= [' + b + ']'
            + '\r\na和b比较结果\r\n' + res + '\r\n';
    }
}
loadDocument(new Index("1", undefined, {}));
