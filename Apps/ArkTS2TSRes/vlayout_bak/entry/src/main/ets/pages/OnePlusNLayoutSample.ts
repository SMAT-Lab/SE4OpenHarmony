interface OnePlusNLayoutSample_Params {
    vScroller?: Scroller;
    scroller?: Scroller[];
    textFirst?: number;
    textExisting?: number;
    textCreated?: number;
    textCount?: number;
    textOffset?: number;
    textInput?: number;
    data?: dataType[];
    beArr?: number[];
    num?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "OnePlusNLayoutSample_" + ++__generate__Id;
}
/*
Copyright (c) 2021 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import { GRID_LAYOUT, ONEN_LAYOUT, BANNER_LAYOUT, ONEN_EX_LAYOUT, STICKY_LAYOUT, LINEAR_LAYOUT, SCROLL_FIX_LAYOUT, JumpBar, layoutDataType, dataType } from '@ohos/vlayout';
class OnePlusNLayoutSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.vScroller = new Scroller();
        this.__scroller = new ObservedPropertyObject([this.vScroller], this, "scroller");
        this.__textFirst = new ObservedPropertySimple(0, this, "textFirst");
        this.__textExisting = new ObservedPropertySimple(0, this, "textExisting");
        this.__textCreated = new ObservedPropertySimple(0, this, "textCreated");
        this.__textCount = new ObservedPropertySimple(0, this, "textCount");
        this.__textOffset = new ObservedPropertySimple(0, this, "textOffset");
        this.__textInput = new ObservedPropertySimple(0, this, "textInput");
        this.__data = new ObservedPropertyObject([
            { layoutData: [0, 1, 2, 3, 4, 5] },
            { layoutData: [{ layoutText: 1 }, { layoutText: 2 }, { layoutText: 3 }, { layoutText: 4 },
                    { layoutText: 5 }, { layoutText: 6 }, { layoutText: 7 }, { layoutText: 8 },] },
            { layoutData: [{ layoutText: 9 }, { layoutText: 10 },] },
            { layoutData: [
                    { layoutText: 11 },
                    { layoutText: 12 },
                    { layoutText: 13 },
                ] },
            { layoutData: [
                    { layoutText: 14 },
                    { layoutText: 15 },
                    { layoutText: 16 },
                    { layoutText: 17 },
                ] },
            { layoutData: [
                    { layoutText: 18 },
                    { layoutText: 19 },
                    { layoutText: 20 },
                    { layoutText: 21 },
                    { layoutText: 22 },
                ] },
            { layoutData: [
                    { layoutText: 23 },
                    { layoutText: 24 },
                    { layoutText: 25 },
                    { layoutText: 26 },
                    { layoutText: 27 },
                ] },
            { layoutData: [
                    { layoutText: 28 },
                    { layoutText: 29 },
                    { layoutText: 30 },
                    { layoutText: 31 },
                    { layoutText: 32 },
                ] },
            { layoutData: [
                    { layoutText: 33 },
                    { layoutText: 34 },
                    { layoutText: 35 },
                    { layoutText: 36 },
                    { layoutText: 37 },
                ] },
            { layoutData: [
                    { layoutText: 38 },
                    { layoutText: 39 },
                    { layoutText: 40 },
                    { layoutText: 41 },
                    { layoutText: 42 },
                    { layoutText: 43 },
                ] },
            { layoutData: [
                    { layoutText: 44 },
                    { layoutText: 45 },
                    { layoutText: 46 },
                    { layoutText: 47 },
                    { layoutText: 48 },
                    { layoutText: 49 },
                    { layoutText: 50 },
                ] },
            { layoutData: [
                    { layoutText: 51 },
                    { layoutText: 52 },
                    { layoutText: 53 },
                    { layoutText: 54 },
                    { layoutText: 55 },
                    { layoutText: 56 },
                    { layoutText: 57 },
                ] },
            { layoutData: [
                    { layoutText: 58 },
                    { layoutText: 59 },
                    { layoutText: 60 },
                    { layoutText: 61 },
                    { layoutText: 62 },
                    { layoutText: 63 },
                    { layoutText: 64 },
                ] },
            { layoutData: [65] },
            {
                layoutData: [67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166]
            },
            { layoutData: [66] }, //SCROLL_FIX_LAYOUT
        ], this, "data");
        this.beArr = [];
        this.num = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: OnePlusNLayoutSample_Params) {
        if (params.vScroller !== undefined) {
            this.vScroller = params.vScroller;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.textFirst !== undefined) {
            this.textFirst = params.textFirst;
        }
        if (params.textExisting !== undefined) {
            this.textExisting = params.textExisting;
        }
        if (params.textCreated !== undefined) {
            this.textCreated = params.textCreated;
        }
        if (params.textCount !== undefined) {
            this.textCount = params.textCount;
        }
        if (params.textOffset !== undefined) {
            this.textOffset = params.textOffset;
        }
        if (params.textInput !== undefined) {
            this.textInput = params.textInput;
        }
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.beArr !== undefined) {
            this.beArr = params.beArr;
        }
        if (params.num !== undefined) {
            this.num = params.num;
        }
    }
    aboutToBeDeleted() {
        this.__scroller.aboutToBeDeleted();
        this.__textFirst.aboutToBeDeleted();
        this.__textExisting.aboutToBeDeleted();
        this.__textCreated.aboutToBeDeleted();
        this.__textCount.aboutToBeDeleted();
        this.__textOffset.aboutToBeDeleted();
        this.__textInput.aboutToBeDeleted();
        this.__data.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private vScroller: Scroller;
    private __scroller: ObservedPropertyObject<Scroller[]>;
    get scroller() {
        return this.__scroller.get();
    }
    set scroller(newValue: Scroller[]) {
        this.__scroller.set(newValue);
    }
    private __textFirst: ObservedPropertySimple<number>;
    get textFirst() {
        return this.__textFirst.get();
    }
    set textFirst(newValue: number) {
        this.__textFirst.set(newValue);
    }
    private __textExisting: ObservedPropertySimple<number>;
    get textExisting() {
        return this.__textExisting.get();
    }
    set textExisting(newValue: number) {
        this.__textExisting.set(newValue);
    }
    private __textCreated: ObservedPropertySimple<number>;
    get textCreated() {
        return this.__textCreated.get();
    }
    set textCreated(newValue: number) {
        this.__textCreated.set(newValue);
    }
    private __textCount: ObservedPropertySimple<number>;
    get textCount() {
        return this.__textCount.get();
    }
    set textCount(newValue: number) {
        this.__textCount.set(newValue);
    }
    private __textOffset: ObservedPropertySimple<number>;
    get textOffset() {
        return this.__textOffset.get();
    }
    set textOffset(newValue: number) {
        this.__textOffset.set(newValue);
    }
    private __textInput: ObservedPropertySimple<number>;
    get textInput() {
        return this.__textInput.get();
    }
    set textInput(newValue: number) {
        this.__textInput.set(newValue);
    }
    private __data: ObservedPropertyObject<dataType[]>;
    get data() {
        return this.__data.get();
    }
    set data(newValue: dataType[]) {
        this.__data.set(newValue);
    }
    private beArr: number[];
    private num: number;
    private compare(beforeArr: number[], afterArr: number[]) {
        let resObj: resObjType = new resObjType();
        let cenObj: any = {};
        //把beforeArr数组去重放入cenObj
        for (let i = 0; i < beforeArr.length; i++) {
            cenObj[beforeArr[i]] = beforeArr[i];
        }
        //遍历afterArr，查看其元素是否在cenObj中
        for (let j = 0; j < afterArr.length; j++) {
            if (!cenObj[afterArr[j]]) {
                resObj.add.push(afterArr[j]);
            }
            else {
                cenObj[afterArr[j]] = null;
            }
        }
        for (let k = 0; k < Object.getOwnPropertyNames(cenObj).length; k++) {
            resObj.del.push(Object.getOwnPropertyNames(cenObj)[k]);
        }
        return resObj;
    }
    bannerLayoutContent(item: layoutDataType, position: number | undefined, parent = null) {
        Text.create('Banner:' + item);
        Text.width('100%');
        Text.height('100%');
        Text.backgroundColor(0x22EEEEEE);
        Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Text.fontSize(20);
        Text.fontColor('#999999');
        Text.fontWeight(FontWeight.Bold);
        Text.maxLines(1);
        Text.textAlign(TextAlign.Center);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.onClick(() => {
            console.info('position = ' + position);
        });
        Text.pop();
    }
    gridLayoutContent(item: layoutDataType, position: number | undefined, parent = null) {
        Text.create(`${item.layoutText}`);
        Text.width('100%');
        Text.height('98%');
        Text.backgroundColor(0x22EEEEEE);
        Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Text.fontColor(0x999999);
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Center);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.onClick(() => {
            console.info('position = ' + position);
        });
        Text.pop();
    }
    onenLayoutContent(item: layoutDataType, parent = null) {
        Text.create(`${item.layoutText}`);
        Text.width('100%');
        Text.height('100%');
        Text.backgroundColor(0x22EEEEEE);
        Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Text.fontSize(25);
        Text.fontColor('#999999');
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Center);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.pop();
    }
    onenExLayoutContent(item: layoutDataType, parent = null) {
        Text.create(`${item.layoutText}`);
        Text.width('100%');
        Text.height('100%');
        Text.backgroundColor(0x22EEEEEE);
        Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Text.fontSize(25);
        Text.fontColor('#999999');
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Center);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.pop();
    }
    stickyLayoutContent(item: layoutDataType, position: number | undefined, parent = null) {
        Text.create(`${item}`);
        Text.width('100%');
        Text.height('20%');
        Text.backgroundColor(0x22EEEEEE);
        Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Text.fontSize(25);
        Text.fontColor('#999999');
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Center);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.onClick(() => {
            console.info('position = ' + position);
        });
        Text.pop();
    }
    linearLayoutContent(item: layoutDataType, position: number | undefined, parent = null) {
        Text.create(`${item}`);
        Text.width('100%');
        Text.height('100%');
        Text.backgroundColor(0x22EEEEEE);
        Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Text.fontSize(25);
        Text.fontColor('#999999');
        Text.fontWeight(FontWeight.Bold);
        Text.maxLines(1);
        Text.textAlign(TextAlign.Center);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.onClick(() => {
            console.info('position = ' + position);
        });
        Text.pop();
    }
    scrollFixLayoutContent(item: layoutDataType, position: number | undefined, parent = null) {
        Text.create(`${item}`);
        Text.width('100%');
        Text.height('100%');
        Text.backgroundColor(0x22EEEEEE);
        Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Text.fontSize(25);
        Text.fontColor(0x999999);
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Center);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.onClick(() => {
            console.info('position = ' + position);
        });
        Text.pop();
    }
    render() {
        Stack.create({ alignContent: Alignment.Bottom });
        Stack.width('100%');
        Stack.height('100%');
        Stack.backgroundColor('#AAAAAA');
        List.create({ scroller: this.vScroller });
        List.edgeEffect(EdgeEffect.None);
        List.onScrollIndex((start: number, end: number) => {
            //获取First
            if (typeof this.data[start].layoutData[0] == 'number') {
                this.textFirst = this.data[start].layoutData[0] as number;
            }
            else if (this.data[start].rowsTemplate == null && typeof this.data[start].layoutData[0] == 'object') {
                this.textFirst = (this.data[start].layoutData[0] as layoutDataType).layoutText as number;
            }
            else if ((this.data[start].rowsTemplate as string[]).length >= 1 && typeof this.data[start].layoutData[0] == 'object') {
                this.textFirst = (this.data[start].layoutData[0] as layoutDataType).layoutText as number;
            }
            //获取Count
            let afArr: number[] = [];
            for (let i = start; i <= end; i++) {
                afArr.push(this.data[i].layoutData.length);
            }
            if (this.num == 0) {
                this.beArr = afArr;
                for (let i = 0; i < this.beArr.length; i++) {
                    this.textCount += this.beArr[i];
                }
            }
            else {
                this.compare(this.beArr, afArr);
                let after: number = 0;
                for (let j = 0; j < afArr.length; j++) {
                    after += afArr[j];
                }
                this.textCount = after;
                this.beArr = afArr;
            }
            this.num++;
        });
        List.onScroll((scrollOffset: number) => {
            //获取Existing和Created
            if (scrollOffset < 0) {
                this.textCreated++;
                this.textExisting++;
            }
            else {
                this.textExisting--;
            }
        });
        ListItem.create();
        ListItem.pop();
        ListItem.create();
        ListItem.pop();
        ListItem.create();
        ListItem.pop();
        ListItem.create();
        ListItem.pop();
        ListItem.create();
        ListItem.pop();
        ListItem.create();
        ListItem.pop();
        ListItem.create();
        ListItem.pop();
        ListItem.create();
        ListItem.pop();
        ListItem.create();
        ListItem.pop();
        ListItem.create();
        ListItem.pop();
        ListItem.create();
        ListItem.pop();
        ListItem.create();
        ListItem.pop();
        ListItem.create();
        ListItem.sticky(Sticky.Normal);
        ListItem.pop();
        ListItem.create();
        ListItem.pop();
        List.pop();
        If.create();
        //SCROLL_FIX_LAYOUT滑动至某个位置出现的效果
        if (this.textFirst >= 65) {
            If.branchId(0);
        }
        If.pop();
        Stack.pop();
    }
}
class resObjType {
    add: number[] = [];
    del: string[] = [];
}
loadDocument(new OnePlusNLayoutSample("1", undefined, {}));
