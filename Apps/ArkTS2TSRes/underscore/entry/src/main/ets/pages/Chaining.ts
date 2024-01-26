interface Chain_Params {
    chainResult?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Chaining_" + ++__generate__Id;
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
import { chain } from 'underscore';
class Chain extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__chainResult = new ObservedPropertySimple('', this, "chainResult");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Chain_Params) {
        if (params.chainResult !== undefined) {
            this.chainResult = params.chainResult;
        }
    }
    aboutToBeDeleted() {
        this.__chainResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __chainResult: ObservedPropertySimple<string>;
    get chainResult() {
        return this.__chainResult.get();
    }
    set chainResult(newValue: string) {
        this.__chainResult.set(newValue);
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
            this.chainResult = chain([{ name: 'curly', age: 25 }, { name: 'moe', age: 21 }, { name: 'larry', age: 23 }])
                .sortBy((stooge: any): any => {
                return stooge.age;
            })
                .map((stooge: any) => {
                return stooge.name + ' is ' + stooge.age;
            })
                .first()
                .value(); //moe is 21
        });
        Button.pop();
        Column.create();
        Column.width('100%');
        Column.alignItems(HorizontalAlign.Start);
        Text.create('数据：[{ name: curly, age: 25 }, { name: moe, age: 21 }, { name: larry, age: 23 }]');
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('chain: ' + this.chainResult);
        Text.fontSize(25);
        Text.margin({ bottom: 30 });
        Text.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new Chain("1", undefined, {}));
