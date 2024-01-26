interface singleFlingPagerActivitySelect_Params {
    arr?: number[];
    index?: number;
    offsetX?: number;
    marginLeft?: number;
    marginRight?: number;
    ContainderHeight?;
    Containderwidth?: number;
    ScreenOffset?: number;
    fontSize?: number;
    targetPositionfontSize?: number;
    matgintop?: number;
    TargetPosition?: string;
    TargetPositionFlag?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "singleFlingPagerActivitySelect_" + ++__generate__Id;
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
import { singleFlingPagerSelect } from "@ohos/recyclerviewpager";
import { Toolbar } from './toolbar';
class singleFlingPagerActivitySelect extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.__offsetX = new ObservedPropertySimple(0, this, "offsetX");
        this.marginLeft = 1;
        this.marginRight = 1;
        this.ContainderHeight = '80%';
        this.Containderwidth = 358 * 2;
        this.ScreenOffset = 2800;
        this.fontSize = 30 * 2;
        this.targetPositionfontSize = 15 * 2;
        this.matgintop = 10 * 2;
        this.TargetPosition = '';
        this.TargetPositionFlag = false;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: singleFlingPagerActivitySelect_Params) {
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
        if (params.marginRight !== undefined) {
            this.marginRight = params.marginRight;
        }
        if (params.ContainderHeight !== undefined) {
            this.ContainderHeight = params.ContainderHeight;
        }
        if (params.Containderwidth !== undefined) {
            this.Containderwidth = params.Containderwidth;
        }
        if (params.ScreenOffset !== undefined) {
            this.ScreenOffset = params.ScreenOffset;
        }
        if (params.fontSize !== undefined) {
            this.fontSize = params.fontSize;
        }
        if (params.targetPositionfontSize !== undefined) {
            this.targetPositionfontSize = params.targetPositionfontSize;
        }
        if (params.matgintop !== undefined) {
            this.matgintop = params.matgintop;
        }
        if (params.TargetPosition !== undefined) {
            this.TargetPosition = params.TargetPosition;
        }
        if (params.TargetPositionFlag !== undefined) {
            this.TargetPositionFlag = params.TargetPositionFlag;
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
    private marginRight: number;
    private ContainderHeight;
    private Containderwidth: number;
    private ScreenOffset: number;
    private fontSize: number;
    private targetPositionfontSize: number;
    private matgintop: number;
    private TargetPosition: string;
    private TargetPositionFlag: boolean;
    specificParam(item: any, parent = null) {
        If.create();
        if (item.i == this.index) {
            If.branchId(0);
            Flex.create();
            Flex.margin({ left: this.marginLeft, right: this.marginRight });
            Flex.width(this.Containderwidth);
            Flex.height('90%');
            Flex.backgroundColor("#273238");
            Flex.scale({
                x: 1,
                y: this.offsetX < 0 ? 1 + this.offsetX / this.ScreenOffset : 1 - this.offsetX / this.ScreenOffset
            });
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
            Flex.height('80%');
            Flex.backgroundColor("#273238");
            Flex.scale({
                x: 1,
                y: this.offsetX < 0 ? 1 - this.offsetX / this.ScreenOffset : 1 + this.offsetX / this.ScreenOffset
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
            View.create(new Toolbar("2", this, { title: 'Loop ViewPager Demo', isBack: true }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: 'Loop ViewPager Demo', isBack: true
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Flex.create({ direction: FlexDirection.Column });
        TextInput.create({ placeholder: "Target Position" });
        TextInput.width('100%');
        TextInput.height('5%');
        TextInput.caretColor(Color.Red);
        TextInput.margin({ top: this.matgintop });
        TextInput.type(InputType.Normal);
        TextInput.onChange((value: string) => {
            this.TargetPosition = value;
        });
        Text.create('SCROLL TO TARGET POSITIOJN');
        Text.alignSelf(ItemAlign.Center);
        Text.width('100%');
        Text.fontColor("#000000");
        Text.height('5%');
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: this.matgintop });
        Text.backgroundColor("#dedbdb");
        Text.fontSize(this.targetPositionfontSize);
        Text.onTouch((event: TouchEvent) => {
            if (event.type === TouchType.Down) {
                this.TargetPositionFlag = true;
                let num = new Number(this.TargetPosition);
                this.index = (num <= (this.arr.length - 1) ? num : this.index).valueOf();
                console.info('---------- select index:' + this.index);
            }
            if (event.type === TouchType.Up) {
                this.TargetPositionFlag = false;
            }
        });
        Text.pop();
        Flex.pop();
        Column.pop();
    }
}
loadDocument(new singleFlingPagerActivitySelect("1", undefined, {}));
