interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LangTest_" + ++__generate__Id;
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
import { castArray, clone, eq, isArrayBuffer, isNumber } from "lodash";
class cloneObject {
    a: number = 0;
}
class bObject {
    b: number = 0;
}
class A {
    a: number = 0;
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Button.createWithLabel('将非数组数组强制转为数组');
        Button.onClick(() => {
            let array1: number[] = castArray({ 'a': 1 });
            // => [{ 'a': 1 }]
            let array2: number[] = castArray('abc');
            // => ['abc']
            console.log('强制转化后的型数组:' + JSON.stringify(array1) + ' ' + JSON.stringify(array2));
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('获取拷贝后的值');
        Button.onClick(() => {
            let objects = [{ a: 1 } as cloneObject, { b: 2 } as bObject];
            let shallow: any = clone(objects);
            console.log('拷贝后的值：' + JSON.stringify(shallow));
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('比较两者的值');
        Button.onClick(() => {
            let object: A = { a: 1 };
            let other: A = { a: 1 };
            let eqs1: boolean = eq(object, object);
            // => true
            let eqs2: boolean = eq(object, other);
            // => false
            console.log('比较两者的值,两个值相等返回true,否则返回false: ' + eqs1 + ' ' + eqs2);
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('检查值是否是ArrayBuffer对象');
        Button.onClick(() => {
            let arrayBuffer: boolean = isArrayBuffer(new ArrayBuffer(2));
            // => true
            console.log('检查值是否是ArrayBuffer对象: ' + arrayBuffer);
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('检查值是否是原始Number数值型或者对象');
        Button.onClick(() => {
            let isNumber1: boolean = isNumber(3);
            // => true
            let isNumber2: boolean = isNumber('3');
            // => false
            console.log('检查值是否是原始Number数值型或者对象: ' + isNumber1 + ' ' + isNumber2);
        });
        Button.margin(10);
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
