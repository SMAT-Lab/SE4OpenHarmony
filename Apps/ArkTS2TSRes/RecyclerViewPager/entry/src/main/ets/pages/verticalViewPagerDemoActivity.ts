interface verticalViewPagerDemoActivity_Params {
    index?: number;
    offsetY?: number;
    arr?: number[];
    topSpaced?: number;
    marginBottom?;
    marginTop?;
    fontSize?: number;
    ContainderHeight?: number;
    ContainderWidth?: number | string;
    offsetFlag?: number;
    pageFlag?: boolean;
    ScreenOffset?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "verticalViewPagerDemoActivity_" + ++__generate__Id;
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
import { verticalViewPager } from "@ohos/recyclerviewpager";
import { Toolbar } from './toolbar';
class verticalViewPagerDemoActivity extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.__offsetY = new ObservedPropertySimple(0, this, "offsetY");
        this.arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.topSpaced = 35 * 2;
        this.marginBottom = this.topSpaced;
        this.marginTop = this.topSpaced;
        this.fontSize = 30 * 2;
        this.ContainderHeight = 610;
        this.ContainderWidth = '100%';
        this.offsetFlag = 100;
        this.pageFlag = false;
        this.ScreenOffset = 3000;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: verticalViewPagerDemoActivity_Params) {
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.offsetY !== undefined) {
            this.offsetY = params.offsetY;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.topSpaced !== undefined) {
            this.topSpaced = params.topSpaced;
        }
        if (params.marginBottom !== undefined) {
            this.marginBottom = params.marginBottom;
        }
        if (params.marginTop !== undefined) {
            this.marginTop = params.marginTop;
        }
        if (params.fontSize !== undefined) {
            this.fontSize = params.fontSize;
        }
        if (params.ContainderHeight !== undefined) {
            this.ContainderHeight = params.ContainderHeight;
        }
        if (params.ContainderWidth !== undefined) {
            this.ContainderWidth = params.ContainderWidth;
        }
        if (params.offsetFlag !== undefined) {
            this.offsetFlag = params.offsetFlag;
        }
        if (params.pageFlag !== undefined) {
            this.pageFlag = params.pageFlag;
        }
        if (params.ScreenOffset !== undefined) {
            this.ScreenOffset = params.ScreenOffset;
        }
    }
    aboutToBeDeleted() {
        this.__index.aboutToBeDeleted();
        this.__offsetY.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __index: ObservedPropertySimple<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private __offsetY: ObservedPropertySimple<number>;
    get offsetY() {
        return this.__offsetY.get();
    }
    set offsetY(newValue: number) {
        this.__offsetY.set(newValue);
    }
    private arr: number[];
    private topSpaced: number;
    private marginBottom;
    private marginTop;
    private fontSize: number;
    private ContainderHeight: number;
    private ContainderWidth: number | string;
    private offsetFlag: number;
    private pageFlag: boolean;
    private ScreenOffset: number;
    specificParam(item: any, parent = null) {
        If.create();
        if (item.i == this.index) {
            If.branchId(0);
            Flex.create();
            Flex.margin({ top: this.topSpaced, bottom: this.topSpaced /*, left: this.topSpaced, right: this.topSpaced */
            });
            Flex.width('100%');
            Flex.height(this.ContainderHeight);
            Flex.backgroundColor("#273238");
            Flex.scale({
                x: this.offsetY < 0 ? 1 + this.offsetY / this.ScreenOffset : 1 - this.offsetY / this.ScreenOffset,
                y: 1
            });
            Text.create("item=" + this.index);
            Text.fontSize(this.fontSize);
            Text.fontColor("#e5e1e1");
            Text.pop();
            Flex.pop();
        }
        else {
            If.branchId(1);
            Flex.create();
            Flex.margin({ top: this.topSpaced, bottom: this.topSpaced, left: this.topSpaced, right: this.topSpaced });
            Flex.width('90%');
            Flex.height(this.ContainderHeight);
            Flex.backgroundColor("#273238");
            Flex.scale({
                x: this.offsetY < 0 ? 1 - this.offsetY / this.ScreenOffset : 1 + this.offsetY / this.ScreenOffset,
                y: 1
            });
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
            View.create(new Toolbar("2", this, { title: 'Vertical ViewPager Demo', isBack: true }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: 'Vertical ViewPager Demo', isBack: true
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Flex.create();
        Flex.pop();
        Column.pop();
    }
}
loadDocument(new verticalViewPagerDemoActivity("1", undefined, {}));
