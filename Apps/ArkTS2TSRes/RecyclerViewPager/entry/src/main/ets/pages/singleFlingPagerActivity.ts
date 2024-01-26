interface singleFlingPagerActivity_Params {
    index?: number;
    offsetX?: number;
    arr?: number[];
    marginLeft?: number;
    marginRight?: number;
    Containderwidth?: number;
    ContainderHeight?: number | string;
    ScreenOffset?: number;
    fontSize?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "singleFlingPagerActivity_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { singleFlingPager } from "@ohos/recyclerviewpager";
import { Toolbar } from './toolbar';
class singleFlingPagerActivity extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.__offsetX = new ObservedPropertySimple(0, this, "offsetX");
        this.arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.marginLeft = 20 * 2;
        this.marginRight = 10;
        this.Containderwidth = 300;
        this.ContainderHeight = '100%';
        this.ScreenOffset = 2800;
        this.fontSize = 30 * 2;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: singleFlingPagerActivity_Params) {
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.offsetX !== undefined) {
            this.offsetX = params.offsetX;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.marginLeft !== undefined) {
            this.marginLeft = params.marginLeft;
        }
        if (params.marginRight !== undefined) {
            this.marginRight = params.marginRight;
        }
        if (params.Containderwidth !== undefined) {
            this.Containderwidth = params.Containderwidth;
        }
        if (params.ContainderHeight !== undefined) {
            this.ContainderHeight = params.ContainderHeight;
        }
        if (params.ScreenOffset !== undefined) {
            this.ScreenOffset = params.ScreenOffset;
        }
        if (params.fontSize !== undefined) {
            this.fontSize = params.fontSize;
        }
    }
    aboutToBeDeleted() {
        this.__index.aboutToBeDeleted();
        this.__offsetX.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
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
    private arr: number[];
    private marginLeft: number;
    private marginRight: number;
    private Containderwidth: number;
    private ContainderHeight: number | string;
    private ScreenOffset: number;
    private fontSize: number;
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
            View.create(new Toolbar("2", this, { title: 'Single Fling Pager', isBack: true }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: 'Single Fling Pager', isBack: true
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
loadDocument(new singleFlingPagerActivity("1", undefined, {}));
