interface VLayoutSample_Params {
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
    stickyStart?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "VLayoutSample_" + ++__generate__Id;
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
import { BANNER_LAYOUT, LINEAR_LAYOUT, SINGLE_LAYOUT, STICKY_LAYOUT, GRID_LAYOUT, RANGEGRID_LAYOUT, COLUMN_LAYOUT, ONEN_LAYOUT, STAGGEREDGRID_LAYOUT, FLOAT_LAYOUT, FIX_LAYOUT, JumpBar, dataType, layoutDataType } from '@ohos/vlayout';
enum AlignType {
    TOP_LEFT = 0,
    TOP_RIGHT = 1,
    BOTTOM_LEFT = 2,
    BOTTOM_RIGHT = 3
}
class VLayoutSample extends View {
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
            { layoutData: [2] },
            { layoutData: [3, 4, 5, 6, 7, 8] },
            { layoutData: [9] },
            { layoutData: [10] },
            { layoutData: [
                    { layoutText: 11 },
                    { layoutText: 12 },
                    { layoutText: 13 },
                    { layoutText: 14, colsSpan: 3 },
                ] },
            { layoutData: [
                    { layoutText: 15, layoutColor: '#00FF00' },
                    { layoutText: 16, layoutColor: '#00FF00' },
                    { layoutText: 17, layoutColor: '#00FF00' },
                    { layoutText: 18, layoutColor: '#00FF00' },
                    { layoutText: 19, colsSpan: 2, layoutColor: '#FF0000' },
                    { layoutText: 20, colsSpan: 2, layoutColor: '#FF0000' },
                    { layoutText: 21, colsSpan: 2, layoutColor: '#FF0000' },
                    { layoutText: 22, colsSpan: 2, layoutColor: '#FF0000' },
                    { layoutText: 23, colsSpan: 2, layoutColor: '#FFFF00' },
                    { layoutText: 24, colsSpan: 2, layoutColor: '#FFFF00' },
                    { layoutText: 25, colsSpan: 2, layoutColor: '#FFFF00' },
                    { layoutText: 26, colsSpan: 2, layoutColor: '#FFFF00' },
                    { layoutText: 27, layoutColor: '#00FF00' },
                    { layoutText: 28, layoutColor: '#00FF00' },
                    { layoutText: 29, layoutColor: '#00FF00' },
                    { layoutText: 30, layoutColor: '#00FF00' },
                ] },
            { layoutData: [31] },
            { layoutData: [
                    { layoutText: 32, layoutWeight: 5 },
                    { layoutText: 33, layoutWeight: 1 },
                    { layoutText: 34, layoutWeight: 5 },
                    { layoutText: 35, layoutWeight: 1 },
                    { layoutText: 36, layoutWeight: 1 },
                ] },
            { layoutData: [
                    { layoutText: 37 },
                    { layoutText: 38 },
                ] },
            { layoutData: [
                    { layoutText: 39 },
                    { layoutText: 40 },
                    { layoutText: 41 },
                    { layoutText: 42 },
                ] },
            { layoutData: [
                    { layoutText: 43 },
                    { layoutText: 44 },
                    { layoutText: 45 },
                ] },
            { layoutData: [
                    { layoutText: 46, layoutWeight: 1 },
                    { layoutText: 47, layoutWeight: 1 },
                    { layoutText: 48, layoutWeight: 1 },
                    { layoutText: 49, layoutWeight: 1 },
                ] },
            { layoutData: [
                    { layoutText: 51 },
                    { layoutText: 52 },
                ] },
            { layoutData: [
                    { layoutText: 53 },
                    { layoutText: 54 },
                    { layoutText: 55 },
                    { layoutText: 56 },
                    { layoutText: 57 },
                    { layoutText: 58 },
                    { layoutText: 59 },
                    { layoutText: 60 },
                ] },
            { layoutData: [
                    { layoutText: 61 },
                    { layoutText: 62 },
                    { layoutText: 63 },
                    { layoutText: 64 },
                    { layoutText: 65 },
                    { layoutText: 66 },
                    { layoutText: 67 },
                    { layoutText: 68 },
                    { layoutText: 69 },
                    { layoutText: 70 },
                    { layoutText: 71 },
                    { layoutText: 72 },
                    { layoutText: 73 },
                    { layoutText: 74 },
                    { layoutText: 75 },
                    { layoutText: 76 },
                    { layoutText: 77 },
                    { layoutText: 78 },
                    { layoutText: 79 },
                    { layoutText: 80 },
                    { layoutText: 81 },
                    { layoutText: 82 },
                    { layoutText: 83 },
                    { layoutText: 84 },
                    { layoutText: 85 },
                    { layoutText: 86 },
                    { layoutText: 87 },
                    { layoutText: 88 },
                    { layoutText: 89 },
                    { layoutText: 90 },
                    { layoutText: 91 },
                    { layoutText: 92 },
                    { layoutText: 93 },
                    { layoutText: 94 },
                    { layoutText: 95 },
                    { layoutText: 96 },
                    { layoutText: 97 },
                    { layoutText: 98 },
                    { layoutText: 99 },
                    { layoutText: 100 },
                    { layoutText: 101 },
                    { layoutText: 102 },
                    { layoutText: 103 },
                    { layoutText: 104 },
                    { layoutText: 105 },
                    { layoutText: 106 },
                    { layoutText: 107 },
                    { layoutText: 108 },
                    { layoutText: 109 },
                    { layoutText: 110 },
                    { layoutText: 111 },
                    { layoutText: 112 },
                    { layoutText: 113 },
                    { layoutText: 114 },
                    { layoutText: 115 },
                    { layoutText: 116 },
                    { layoutText: 117 },
                    { layoutText: 118 },
                    { layoutText: 119 },
                    { layoutText: 120 },
                    { layoutText: 121 },
                    { layoutText: 122 },
                    { layoutText: 123 },
                    { layoutText: 124 },
                    { layoutText: 125 },
                    { layoutText: 126 },
                    { layoutText: 127 },
                    { layoutText: 128 },
                    { layoutText: 129 },
                    { layoutText: 130 },
                    { layoutText: 131 },
                    { layoutText: 132 },
                    { layoutText: 133 },
                    { layoutText: 134 },
                    { layoutText: 135 },
                    { layoutText: 136 },
                    { layoutText: 137 },
                    { layoutText: 138 },
                    { layoutText: 139 },
                    { layoutText: 140 },
                ] },
            { layoutData: [142, 143, 144, 145, 146, 147, 148, 149, 150, 151] },
            { layoutData: [
                    { layoutText: 152 },
                    { layoutText: 153 },
                    { layoutText: 154 },
                ] },
            { layoutData: [
                    { layoutText: 155 },
                    { layoutText: 156 },
                    { layoutText: 157 },
                    { layoutText: 158 },
                    { layoutText: 159 },
                    { layoutText: 160 },
                    { layoutText: 161 },
                    { layoutText: 162 },
                    { layoutText: 163 },
                    { layoutText: 164 },
                    { layoutText: 165 },
                    { layoutText: 166 },
                    { layoutText: 167 },
                    { layoutText: 168 },
                    { layoutText: 169 },
                    { layoutText: 170 },
                    { layoutText: 171 },
                    { layoutText: 172 },
                    { layoutText: 173 },
                    { layoutText: 174 },
                    { layoutText: 175 },
                    { layoutText: 176 },
                    { layoutText: 177 },
                    { layoutText: 178 },
                    { layoutText: 179 },
                    { layoutText: 180 },
                    { layoutText: 181 },
                ] },
            { layoutData: [
                    {
                        layoutText: '1',
                        textSize: 25,
                        textColor: '#999999',
                        bgColor: '#CFCFCF',
                    },
                ] },
            { layoutData: [50] },
            { layoutData: [141] }, //FIX_LAYOUT
        ], this, "data");
        this.beArr = [];
        this.num = 0;
        this.__stickyStart = new ObservedPropertySimple(true //控制STICKY_LAYOUT是否吸顶
        , this, "stickyStart");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: VLayoutSample_Params) {
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
        if (params.stickyStart !== undefined) {
            this.stickyStart = params.stickyStart;
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
        this.__stickyStart.aboutToBeDeleted();
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
    linearLayoutContentWithDifferentHeight(item: layoutDataType, position: number | undefined, parent = null) {
        If.create();
        if (position !== undefined && position % 2 == 0) {
            If.branchId(0);
            Text.create(`${item}`);
            Text.width('100%');
            Text.height(80);
            Text.backgroundColor('#33EEEEEE');
            Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
            Text.fontColor('#999999');
            Text.fontSize(25);
            Text.fontWeight(FontWeight.Bold);
            Text.textAlign(TextAlign.Center);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.onClick(() => {
                console.info('position = ' + position + ', item = ' + JSON.stringify(item));
            });
            Text.pop();
        }
        else {
            If.branchId(1);
            Text.create(`${item}`);
            Text.width('100%');
            Text.height(100);
            Text.backgroundColor('#33EEEEEE');
            Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
            Text.fontColor('#999999');
            Text.fontSize(25);
            Text.fontWeight(FontWeight.Bold);
            Text.textAlign(TextAlign.Center);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.onClick(() => {
                console.info('position = ' + position + ', item = ' + JSON.stringify(item));
            });
            Text.pop();
        }
        If.pop();
    }
    singleLayoutContent(item: layoutDataType, position: number | undefined, parent = null) {
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
    stickyLayoutContent(item: layoutDataType, position: number | undefined, parent = null) {
        Text.create(`${item}`);
        Text.width('100%');
        Text.height('100%');
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
    gridLayoutContent(item: layoutDataType, position: number | undefined, gridItemHeight: number | undefined, parent = null) {
        Text.create(`${item.layoutText}`);
        Text.width('100%');
        Text.height('100%');
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
    rangeGridLayoutContent(item: layoutDataType, position: number | undefined, gridItemHeight: number | undefined, parent = null) {
        Column.create();
        Column.backgroundColor(item.layoutColor);
        Column.padding(5);
        Column.margin({
            top: position == 4 || position == 5 || position == 8 || position == 9 ? 5 : 0,
            right: position == 5 || position == 7 || position == 9 || position == 11 ? 10 : 0,
            bottom: position == 6 || position == 7 || position == 10 || position == 11 ? 5 : 0,
            left: position == 4 || position == 6 || position == 8 || position == 10 ? 10 : 0
        });
        Text.create(`${item.layoutText}`);
        Text.width('100%');
        Text.height('100%');
        Text.backgroundColor(0x22EEEEEE);
        Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Text.fontColor('#999999');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.maxLines(1);
        Text.textAlign(TextAlign.Center);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.onClick(() => {
            console.info('position = ' + position);
        });
        Text.pop();
        Column.pop();
    }
    columnLayoutContent(item: layoutDataType, position: number | undefined, parent = null) {
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
    staggeredGridLayoutContent(item: layoutDataType, position: number | undefined, parent = null) {
        If.create();
        if (position !== undefined && position % 2 == 0) {
            If.branchId(0);
            Text.create(`${item.layoutText}`);
            Text.width('100%');
            Text.height(220);
            Text.backgroundColor('#33EEEEEE');
            Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
            Text.fontColor('#999999');
            Text.fontSize(25);
            Text.fontWeight(FontWeight.Bold);
            Text.textAlign(TextAlign.Center);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.onClick(() => {
                console.info('position = ' + position + ', item = ' + JSON.stringify(item));
            });
            Text.pop();
        }
        else {
            If.branchId(1);
            Text.create(`${item.layoutText}`);
            Text.width('100%');
            Text.height(150);
            Text.backgroundColor('#33EEEEEE');
            Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
            Text.fontColor('#999999');
            Text.fontSize(25);
            Text.fontWeight(FontWeight.Bold);
            Text.textAlign(TextAlign.Center);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.onClick(() => {
                console.info('position = ' + position + ', item = ' + JSON.stringify(item));
            });
            Text.pop();
        }
        If.pop();
    }
    floatLayoutContent(item: layoutDataType, position: number | undefined, parent = null) {
        Text.create(`${item}`);
        Text.width('100%');
        Text.height('100%');
        Text.textAlign(TextAlign.Center);
        Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Text.pop();
    }
    fixLayoutContent(item: layoutDataType, position: number | undefined, parent = null) {
        Text.create(`${item}`);
        Text.width('100%');
        Text.height('100%');
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
    private __stickyStart: ObservedPropertySimple<boolean>; //控制STICKY_LAYOUT是否吸顶
    get stickyStart() {
        return this.__stickyStart.get();
    }
    set stickyStart(newValue: boolean) {
        this.__stickyStart.set(newValue);
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
        ListItem.sticky(this.stickyStart ? Sticky.Normal : Sticky.None);
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
        ListItem.pop();
        ListItem.create();
        ListItem.pop();
        ListItem.create();
        ListItem.pop();
        List.pop();
        If.create();
        //STICKY_LAYOUT的吸底效果
        if (this.textFirst < 3 && !this.stickyStart) {
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
loadDocument(new VLayoutSample("1", undefined, {}));
