interface TriangularIndicator_Params {
    model?: TriangularModel;
    itemIndex?: number;
    count?: number;
    startX?: number;
    indicatorOffset?: number;
    mYOffset?: number;
    timeoutId?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TriangularIndicator_" + ++__generate__Id;
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
import { TriangularModel } from '../models/TriangularModel';
class TriangularIndicator extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new TriangularModel(null), this, "model");
        this.__itemIndex = new SynchedPropertySimpleTwoWay(params.itemIndex, this, "itemIndex");
        this.__count = new ObservedPropertySimple(0, this, "count");
        this.startX = 0;
        this.__indicatorOffset = new ObservedPropertySimple(0, this, "indicatorOffset");
        this.__mYOffset = new ObservedPropertySimple(0, this, "mYOffset");
        this.timeoutId = -1;
        this.updateWithValueParams(params);
        this.declareWatch("itemIndex", this.itemIndexChange);
    }
    updateWithValueParams(params: TriangularIndicator_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.count !== undefined) {
            this.count = params.count;
        }
        if (params.startX !== undefined) {
            this.startX = params.startX;
        }
        if (params.indicatorOffset !== undefined) {
            this.indicatorOffset = params.indicatorOffset;
        }
        if (params.mYOffset !== undefined) {
            this.mYOffset = params.mYOffset;
        }
        if (params.timeoutId !== undefined) {
            this.timeoutId = params.timeoutId;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__itemIndex.aboutToBeDeleted();
        this.__count.aboutToBeDeleted();
        this.__indicatorOffset.aboutToBeDeleted();
        this.__mYOffset.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<TriangularModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: TriangularModel) {
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
    private startX: number;
    private __indicatorOffset: ObservedPropertySimple<number>;
    get indicatorOffset() {
        return this.__indicatorOffset.get();
    }
    set indicatorOffset(newValue: number) {
        this.__indicatorOffset.set(newValue);
    }
    private __mYOffset: ObservedPropertySimple<number>;
    get mYOffset() {
        return this.__mYOffset.get();
    }
    set mYOffset(newValue: number) {
        this.__mYOffset.set(newValue);
    }
    private timeoutId: number;
    itemIndexChange(): void {
        clearTimeout(this.timeoutId);
        this.indicatorOffset = 0;
        if (this.model.getChangeListener()) {
            this.model.getChangeListener()(this.itemIndex);
        }
    }
    render() {
        Stack.create({ alignContent: Alignment.Top });
        Stack.width('100%');
        Stack.height(this.model.getHeight());
        Stack.backgroundColor(this.model.getBackgroundColor());
        Rect.create({ width: this.model.getWidth(), height: this.model.getLineHeight() });
        Rect.fill(this.model.getLineColor());
        Polygon.create();
        Polygon.points(this.model.getReverse() ?
            [[px2vp(this.model.getWidth()) / (this.count * 2) - this.model.getTriangleWidth() / 2, this.model.getLineHeight() - this.mYOffset],
                [px2vp(this.model.getWidth()) / (this.count * 2), this.model.getLineHeight() + this.model.getTriangleHeight() - this.mYOffset],
                [px2vp(this.model.getWidth()) / (this.count * 2) + this.model.getTriangleWidth() / 2, this.model.getLineHeight() - this.mYOffset]] :
            [[px2vp(this.model.getWidth()) / (this.count * 2) - this.model.getTriangleWidth() / 2, -this.mYOffset],
                [px2vp(this.model.getWidth()) / (this.count * 2), -this.model.getTriangleHeight() - this.mYOffset],
                [px2vp(this.model.getWidth()) / (this.count * 2) + this.model.getTriangleWidth() / 2, -this.mYOffset]]);
        Polygon.offset(this.model.mStartInterpolator ?
            {
                x: this.model.getWidth() / this.count * (this.itemIndex - this.model.mStartInterpolator.interpolate(Math.abs(this.indicatorOffset / this.model.getWidth())) * Math.sign(this.indicatorOffset)),
                y: 0
            } :
            { x: this.model.getWidth() / this.count * (this.itemIndex - this.indicatorOffset / this.model.getWidth()),
                y: 0 });
        Polygon.fill(this.model.getLineColor());
        Polygon.height(this.model.getHeight());
        Polygon.width(this.model.getWidth());
        Stack.pop();
    }
    aboutToAppear() {
        this.model.setOnPageTouchListener((event: TouchEvent, currentIndex: number) => {
            this.onIndicatorTouch(event, currentIndex);
        });
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
                this.indicatorOffset = offset;
            }, 750);
        }
    }
}
export default TriangularIndicator;
