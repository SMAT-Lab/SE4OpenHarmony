interface singleFlingPagerActivityRe_Params {
    arr?: number[];
    index?: number;
    offsetX?: number;
    marginLeft?: number;
    Containderwidth?: number;
    marginRight?: number;
    ContainderHeight?: number | string;
    offsetIndex?: number;
    leftFlag?: boolean;
    ScreenOffset?: number;
    fontSize?: number;
    matgintop?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "singleFlingPagerActivityRe_" + ++__generate__Id;
}
/*
  * Copyright (c) 2022 Huawei Device Co., Ltd.
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  * http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
import { singleFlingPager } from "@ohos/recyclerviewpager";
import { Toolbar } from './toolbar';
class singleFlingPagerActivityRe extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.__index = new ObservedPropertySimple(this.arr.length - 1, this, "index");
        this.__offsetX = new ObservedPropertySimple(0, this, "offsetX");
        this.marginLeft = 20 * 2;
        this.Containderwidth = 300;
        this.marginRight = 0;
        this.ContainderHeight = '100%';
        this.offsetIndex = 100;
        this.leftFlag = false;
        this.ScreenOffset = 2800;
        this.fontSize = 30 * 2;
        this.matgintop = 35 * 2;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: singleFlingPagerActivityRe_Params) {
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.offsetX !== undefined) {
            this.offsetX = params.offsetX;
        }
        if (params.marginLeft !== undefined) {
            this.marginLeft = params.marginLeft;
        }
        if (params.Containderwidth !== undefined) {
            this.Containderwidth = params.Containderwidth;
        }
        if (params.marginRight !== undefined) {
            this.marginRight = params.marginRight;
        }
        if (params.ContainderHeight !== undefined) {
            this.ContainderHeight = params.ContainderHeight;
        }
        if (params.offsetIndex !== undefined) {
            this.offsetIndex = params.offsetIndex;
        }
        if (params.leftFlag !== undefined) {
            this.leftFlag = params.leftFlag;
        }
        if (params.ScreenOffset !== undefined) {
            this.ScreenOffset = params.ScreenOffset;
        }
        if (params.fontSize !== undefined) {
            this.fontSize = params.fontSize;
        }
        if (params.matgintop !== undefined) {
            this.matgintop = params.matgintop;
        }
    }
    aboutToBeDeleted() {
        this.__index.aboutToBeDeleted();
        this.__offsetX.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private arr: number[];
    private __index: ObservedPropertySimple<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private __offsetX: ObservedPropertySimple<number>;
    get offsetX() {
        return this.__offsetX.get();
    }
    set offsetX(newValue: number) {
        this.__offsetX.set(newValue);
    }
    private marginLeft: number;
    private Containderwidth: number;
    private marginRight: number;
    private ContainderHeight: number | string;
    private offsetIndex: number;
    private leftFlag: boolean;
    private ScreenOffset: number;
    private fontSize: number;
    private matgintop: number;
    specificParam(item: any, parent = null) {
        If.create();
        if (item.i == this.index) {
            If.branchId(0);
            Flex.create();
            Flex.margin({ left: this.marginLeft, right: this.marginRight });
            Flex.width(this.Containderwidth);
            Flex.height('80%');
            Flex.backgroundColor("#273238");
            Flex.scale({
                x: 1,
                y: this.offsetX < 0 ? 1 + this.offsetX / this.ScreenOffset : 1 - this.offsetX / this.ScreenOffset
            });
            Flex.offset({ x: '1%' });
            Text.create("item=" + item.i);
            Text.fontSize(this.fontSize);
            Text.fontColor("#e5e1e1");
            Text.pop();
            Flex.pop();
        }
        else {
            If.branchId(1);
            Flex.create();
            Flex.margin({ left: this.marginLeft, right: this.marginRight });
            Flex.width(this.Containderwidth);
            Flex.height('50%');
            Flex.backgroundColor("#273238");
            Flex.scale({
                x: 1,
                y: this.offsetX < 0 ? 1 - this.offsetX / this.ScreenOffset : 1 + this.offsetX / this.ScreenOffset
            });
            Flex.offset({ x: '1%' });
            Text.create("item");
            Text.fontSize(this.fontSize);
            Text.fontColor("#e5e1e1");
            Text.pop();
            Flex.pop();
        }
        If.pop();
    }
    render() {
        Column.create();
        let earlierCreatedChild_2: Toolbar = (this && this.findChildById) ? this.findChildById("2") as Toolbar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Toolbar("2", this, { title: 'Reverse Single Fling Pager', isBack: true }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: 'Reverse Single Fling Pager', isBack: true
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Flex.create({ direction: FlexDirection.Column });
        Flex.pop();
        Column.pop();
    }
}
loadDocument(new singleFlingPagerActivityRe("1", undefined, {}));
