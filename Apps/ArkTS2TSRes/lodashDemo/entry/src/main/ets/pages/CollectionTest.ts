interface Index_Params {
    resultArray?: number[];
    sampleArray?: number[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CollectionTest_" + ++__generate__Id;
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
import { forEach, sample, flatMap } from "lodash";
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__resultArray = new ObservedPropertyObject([], this, "resultArray");
        this.__sampleArray = new ObservedPropertyObject([], this, "sampleArray");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.resultArray !== undefined) {
            this.resultArray = params.resultArray;
        }
        if (params.sampleArray !== undefined) {
            this.sampleArray = params.sampleArray;
        }
    }
    aboutToBeDeleted() {
        this.__resultArray.aboutToBeDeleted();
        this.__sampleArray.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __resultArray: ObservedPropertyObject<number[]>;
    get resultArray() {
        return this.__resultArray.get();
    }
    set resultArray(newValue: number[]) {
        this.__resultArray.set(newValue);
    }
    private __sampleArray: ObservedPropertyObject<number[]>;
    get sampleArray() {
        return this.__sampleArray.get();
    }
    set sampleArray(newValue: number[]) {
        this.__sampleArray.set(newValue);
    }
    // @State resultArray: number[] = [];
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Button.createWithLabel('遍历集合中的每个元素');
        Button.onClick(() => {
            forEach([1, 2, 'a', 'b'], (value: number) => console.log("forEach:" + value));
        });
        Button.margin(10);
        Button.pop();
        Text.create("显示集合中一个随机元素:" + JSON.stringify(ObservedObject.GetRawObject(this.sampleArray)));
        Text.pop();
        Button.createWithLabel('将获得集合中一个随机元素');
        Button.onClick(() => {
            this.sampleArray = sample([0, undefined, 1, false, 2, 'string', 3, true, null]);
            console.log('sample:' + JSON.stringify(ObservedObject.GetRawObject(this.sampleArray)));
        });
        Button.margin(10);
        Button.pop();
        Text.create("显示新扁平化数组:" + JSON.stringify(ObservedObject.GetRawObject(this.resultArray)));
        Text.pop();
        Button.createWithLabel('展示新扁平化数组');
        Button.onClick(() => {
            let duplicate: (n: number) => void = (n: number): number[] => {
                return [n, n];
            };
            this.resultArray = flatMap([1, 2], duplicate);
            console.log('flatMap:' + JSON.stringify(ObservedObject.GetRawObject(this.resultArray)));
        });
        Button.margin(10);
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
