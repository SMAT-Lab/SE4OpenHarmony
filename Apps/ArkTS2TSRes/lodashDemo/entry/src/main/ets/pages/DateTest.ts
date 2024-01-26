interface Index_Params {
    date?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DateTest_" + ++__generate__Id;
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
import { now } from "lodash";
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__date = new ObservedPropertySimple(0, this, "date");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.date !== undefined) {
            this.date = params.date;
        }
    }
    aboutToBeDeleted() {
        this.__date.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __date: ObservedPropertySimple<number>;
    get date() {
        return this.__date.get();
    }
    set date(newValue: number) {
        this.__date.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Text.create('Unix 纪元 (1 January 1970 00:00:00 UTC) 直到现在的毫秒数: ' + this.date);
        Text.pop();
        Button.createWithLabel('获得 Unix 纪元 (1 January 1970 00:00:00 UTC) 直到现在的毫秒数');
        Button.onClick(() => {
            this.date = now();
            console.log('获得 Unix 纪元 (1 January 1970 00:00:00 UTC) 直到现在的毫秒数:' + this.date);
        });
        Button.margin(10);
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
