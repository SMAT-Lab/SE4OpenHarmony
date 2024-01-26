interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "UtilTest_" + ++__generate__Id;
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
import { conforms, filter, defaultTo, identity, nthArg, stubObject, times } from "lodash";
class conformsObject {
    a: number = 0;
    b: number = 0;
}
class identityObject {
    name: string = '';
    age: number = 0;
    active: boolean = true;
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
        Button.createWithLabel('获取新函数，并作为filter的参数筛选出对应的内容');
        Button.onClick(() => {
            let objects: conformsObject[] = [
                { a: 2, b: 1 },
                { a: 1, b: 2 }
            ];
            let result: number[] = filter(objects, conforms({ 'b': (n: number) => {
                    return n > 1;
                } }));
            // => [{ 'a': 1, 'b': 2 }]
            console.log('conforms：' + JSON.stringify(result));
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('检查值，以确定一个默认值是否应被返回');
        Button.onClick(() => {
            let isDefault: any = defaultTo(undefined, 10);
            // => 10
            console.log('如果检查值为NaN, null, 或者 undefined，返回默认值，否则返回检查值：' + JSON.stringify(isDefault));
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('获取接收的第一个参数');
        Button.onClick(() => {
            let user: identityObject[] = [
                { name: 'XXXX', age: 36, active: true },
                { name: 'YYYY', age: 40, active: false }
            ];
            let parameter: any = identity(user);
            console.log('获取接收的第一个参数:' + JSON.stringify(parameter));
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('创建一个函数，这个函数返回第n个参数');
        Button.onClick(() => {
            let func: any = nthArg(2);
            // 'c'
            console.log('创建一个函数，这个函数返回第n个参数为:' + JSON.stringify(func('a', 'b', 'c', 'd')));
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('获取一个空对象');
        Button.onClick(() => {
            let objects: any = times(2, stubObject);
            // => [{}, {}]
            console.log('返回一个空对象为:' + JSON.stringify(objects));
        });
        Button.margin(10);
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
