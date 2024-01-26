interface CustomContainerUser_Params {
    arr?: number[];
    text?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "grid_" + ++__generate__Id;
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
import { SwipeLayoutLayDownFullGrid } from '@ohos/swipelayout';
import hilog from '@ohos.hilog';
class CustomContainerUser extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        this.text = '.If winter comes , can spring be far behind ? \n';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomContainerUser_Params) {
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.text !== undefined) {
            this.text = params.text;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private arr: number[];
    private text;
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor(0xDCDCDC);
        Column.padding(10);
        Grid.create();
        Grid.columnsGap(10);
        Grid.rowsGap(10);
        Grid.columnsTemplate('1fr 1fr');
        Grid.width('100%');
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arr), (item: string) => {
            GridItem.create();
            ColumnSplit.create();
            ColumnSplit.backgroundColor('#d2d3cc');
            ColumnSplit.pop();
            GridItem.pop();
        }, (item: string) => item);
        ForEach.pop();
        Grid.pop();
        Column.pop();
    }
}
loadDocument(new CustomContainerUser("1", undefined, {}));
