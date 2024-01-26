interface LineIndicator_Params {
    model?: LineModel;
    itemIndex?: number;
    count?: number;
    arr?: number[];
    startX?;
    indicatorOffset?: number;
    timeoutId?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LineIndicator_" + ++__generate__Id;
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
import { LineModel } from '../models/LineModel';
class LineIndicator extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new LineModel(null), this, "model");
        this.__itemIndex = new SynchedPropertySimpleTwoWay(params.itemIndex, this, "itemIndex");
        this.__count = new ObservedPropertySimple(0, this, "count");
        this.__arr = new ObservedPropertyObject([], this, "arr");
        this.startX = 0;
        this.__indicatorOffset = new ObservedPropertySimple(0, this, "indicatorOffset");
        this.timeoutId = -1;
        this.updateWithValueParams(params);
        this.declareWatch("itemIndex", this.onIndexChange);
        this.declareWatch("count", this.onCountChange);
    }
    updateWithValueParams(params: LineIndicator_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.count !== undefined) {
            this.count = params.count;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.startX !== undefined) {
            this.startX = params.startX;
        }
        if (params.indicatorOffset !== undefined) {
            this.indicatorOffset = params.indicatorOffset;
        }
        if (params.timeoutId !== undefined) {
            this.timeoutId = params.timeoutId;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__itemIndex.aboutToBeDeleted();
        this.__count.aboutToBeDeleted();
        this.__arr.aboutToBeDeleted();
        this.__indicatorOffset.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<LineModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: LineModel) {
        this.__model.set(newValue);
    }
    private __itemIndex: SynchedPropertySimpleTwoWay<number>;
    get itemIndex() {
        return this.__itemIndex.get();
    }
    set itemIndex(newValue: number) {
        this.__itemIndex.set(newValue);
    }
    private __count: ObservedPropertySimple<number>;
    get count() {
        return this.__count.get();
    }
    set count(newValue: number) {
        this.__count.set(newValue);
    }
    private __arr: ObservedPropertyObject<number[]>;
    get arr() {
        return this.__arr.get();
    }
    set arr(newValue: number[]) {
        this.__arr.set(newValue);
    }
    private startX;
    private __indicatorOffset: ObservedPropertySimple<number>;
    get indicatorOffset() {
        return this.__indicatorOffset.get();
    }
    set indicatorOffset(newValue: number) {
        this.__indicatorOffset.set(newValue);
    }
    private timeoutId: number;
    onIndexChange() {
        clearTimeout(this.timeoutId);
        this.reset();
    }
    onCountChange() {
        this.arr = Array.from(new Array(this.count).keys());
    }
    aboutToAppear() {
        this.model.setOnPageTouchListener((event: TouchEvent, currentIndex: number) => {
            this.onIndicatorTouch(event, currentIndex);
        });
        this.onCountChange();
    }
    render() {
        Flex.create({ alignItems: ItemAlign.Center, justifyContent: this.model.isCentered() ? FlexAlign.Center : FlexAlign.Start });
        Flex.height(this.model.getHeight());
        Flex.width(this.model.getWidth());
        Flex.backgroundColor(this.model.getBackgroundColor());
        Stack.create({ alignContent: Alignment.Start });
        Row.create();
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arr), (item: number) => {
            If.create();
            if (item != 0) {
                If.branchId(0);
                Flex.create();
                Flex.width(this.model.getMargin());
                Flex.pop();
            }
            If.pop();
            Text.create('');
            Text.backgroundColor(this.model.getUnselectedColor());
            Text.width(this.model.getLineWidth());
            Text.height(this.model.getStrokeWidth());
            Text.pop();
        }, (item: number) => item.toString());
        ForEach.pop();
        Row.pop();
        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width(this.model.getLineWidth());
        Flex.height(this.model.getStrokeWidth());
        Flex.offset({
            x: this.model.isAnimation() ? ((this.model.getLineWidth() + this.model.getMargin()) * (this.itemIndex - this.indicatorOffset / 480)) : ((this.model.getLineWidth() + this.model.getMargin()) * (this.itemIndex)),
            y: 0
        });
        Text.create('');
        Text.backgroundColor(this.model.getSelectedColor());
        Text.width('100%');
        Text.height('100%');
        Text.pop();
        Flex.pop();
        Stack.pop();
        Flex.pop();
    }
    onIndicatorTouch(event: TouchEvent, currentIndex: number) {
        let startX = this.startX;
        let offset = 0;
        if (event.type === TouchType.Down) {
            this.startX = event.touches[0].x;
        }
        if (event.type === TouchType.Move) {
            offset = event.touches[0].x - startX;
            if ((offset >= 0 && currentIndex > 0) || (offset <= 0 && currentIndex < this.count - 1)) {
                this.indicatorOffset = offset;
            }
        }
        if (event.type === TouchType.Up) {
            this.timeoutId = setTimeout(() => {
                offset = 0;
                this.reset();
            }, 750);
        }
    }
    reset() {
        this.indicatorOffset = 0;
        if (this.model.getChangeListener()) {
            this.model.getChangeListener()(this.itemIndex);
        }
    }
}
export default LineIndicator;
