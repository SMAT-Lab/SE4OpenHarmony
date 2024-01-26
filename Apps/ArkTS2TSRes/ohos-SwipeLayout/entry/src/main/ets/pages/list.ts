interface CustomContainerUser_Params {
    arr?: number[];
    text?;
    disWidth?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "list_" + ++__generate__Id;
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
import { SwipeLayoutLayDownFullList, SwipeLayoutLayDownRoot } from '@ohos/swipelayout';
import display from "@ohos.display";
class CustomContainerUser extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
        this.text = '.Do not, for one repulse, forgo the purpose that you resolved to effort. ';
        this.disWidth = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomContainerUser_Params) {
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.disWidth !== undefined) {
            this.disWidth = params.disWidth;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private arr: number[];
    private text;
    private disWidth: number;
    aboutToAppear() {
        this.disWidth = display.getDefaultDisplaySync().width;
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor(0xDCDCDC);
        Column.padding({ top: 5 });
        List.create({ initialIndex: 0 });
        List.divider({ strokeWidth: 1, color: 0xd2d3cc });
        List.width('100%');
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arr), (item: any) => {
            ListItem.create();
            ListItem.pop();
        }, (item: any): any => item);
        ForEach.pop();
        List.pop();
        Column.pop();
    }
}
loadDocument(new CustomContainerUser("1", undefined, {}));
