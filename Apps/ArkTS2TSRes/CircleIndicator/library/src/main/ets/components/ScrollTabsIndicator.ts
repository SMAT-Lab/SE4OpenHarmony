interface ScrollTabsIndicator_Params {
    model?: ScrollTabsModel;
    titles?: string[];
    itemIndex?: number;
    scroller?: Scroller;
    startX?: number;
    indicatorOffset?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ScrollTabsIndicator_" + ++__generate__Id;
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
import { ScrollTabsModel } from '../models/ScrollTabsModel';
class ScrollTabsIndicator extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new ScrollTabsModel(null), this, "model");
        this.__titles = new ObservedPropertyObject([], this, "titles");
        this.__itemIndex = new SynchedPropertySimpleTwoWay(params.itemIndex, this, "itemIndex");
        this.scroller = new Scroller();
        this.startX = 0;
        this.indicatorOffset = 0;
        this.updateWithValueParams(params);
        this.declareWatch("itemIndex", this.itemIndexChange);
    }
    updateWithValueParams(params: ScrollTabsIndicator_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.titles !== undefined) {
            this.titles = params.titles;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.startX !== undefined) {
            this.startX = params.startX;
        }
        if (params.indicatorOffset !== undefined) {
            this.indicatorOffset = params.indicatorOffset;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__titles.aboutToBeDeleted();
        this.__itemIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<ScrollTabsModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: ScrollTabsModel) {
        this.__model.set(newValue);
    }
    private __titles: ObservedPropertyObject<string[]>;
    get titles() {
        return this.__titles.get();
    }
    set titles(newValue: string[]) {
        this.__titles.set(newValue);
    }
    private __itemIndex: SynchedPropertySimpleTwoWay<number>;
    get itemIndex() {
        return this.__itemIndex.get();
    }
    set itemIndex(newValue: number) {
        this.__itemIndex.set(newValue);
    }
    private scroller: Scroller;
    private startX: number;
    private indicatorOffset: number;
    itemIndexChange(): void {
        this.model.getTabsController()?.changeIndex(this.itemIndex);
        if (this.model.getChangeListener()) {
            this.model.getChangeListener()(this.itemIndex);
        }
        this.scroller.scrollTo({
            xOffset: (-this.model.getWidth() / 2) + (this.itemIndex + 0.5) * (this.model.getTextWidth() + (this.model.hasIcon() ? this.model.getIconSize() : 0) + (this.model.isShowDivider() ? this.model.getDividerHeight() : 0)),
            yOffset: 0,
        });
    }
    render() {
        Column.create();
        Column.height(this.model.getHeight());
        Column.width(this.model.getWidth());
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Horizontal);
        Scroll.scrollBar(BarState.On);
        Column.create();
        Row.create();
        Row.backgroundColor(this.model.getBackgroundColor());
        ForEach.create("2", this, ObservedObject.GetRawObject(this.titles), (item: string, idx: number) => {
            Stack.create();
            Row.create();
            Row.onClick(() => {
                this.itemIndex = idx;
                if (this.model.getClickListener()) {
                    this.model.getClickListener()(this.itemIndex);
                }
            });
            If.create();
            if (this.model.hasIcon()) {
                If.branchId(0);
                Image.create((idx == this.itemIndex) ? this.model.getIcons()[idx].selected : this.model.getIcons()[idx].normal);
                Image.width(this.model.getIconSize());
                Image.height(this.model.getIconSize());
            }
            If.pop();
            Text.create(item);
            Text.fontSize((`${idx}` == (this.itemIndex) + "") ? this.model.getSelectedTextSize() : this.model.getUnselectedTextSize());
            Text.width(this.model.getTextWidth());
            Text.height(this.model.getTextHeight());
            Text.fontColor((`${idx}` == (this.itemIndex) + "") ? this.model.getSelectedTextColor() : this.model.getUnselectedTextColor());
            Text.textAlign(TextAlign.Center);
            Text.pop();
            If.create();
            if (this.model.isShowDivider() == true && idx != this.titles.length - 1) {
                If.branchId(0);
                Divider.create();
                Divider.strokeWidth(this.model.getDividerHeight());
                Divider.color(this.model.getDividerColor());
                Divider.vertical(true);
                Divider.height(this.model.getTextHeight() - 10);
                Divider.opacity(0.3);
            }
            If.pop();
            Row.pop();
            Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.SpaceBetween });
            Flex.enabled(false);
            Rect.create();
            Rect.fill((this.model.isCursorUp() && this.itemIndex == idx) ? this.model.color : '#00ffffff');
            Rect.height(this.model.getCursorHeight());
            Rect.width(this.model.getCursorWidth() + ((this.model.hasIcon() ? this.model.getIconSize() : 0)));
            Rect.create();
            Rect.fill((!this.model.isCursorUp() && this.itemIndex == idx) ? this.model.color : '#00ffffff');
            Rect.height(this.model.getCursorHeight());
            Rect.width(this.model.getCursorWidth() + ((this.model.hasIcon() ? this.model.getIconSize() : 0)));
            Flex.pop();
            Stack.pop();
        }, (item: string) => item);
        ForEach.pop();
        Row.pop();
        Column.pop();
        Scroll.pop();
        If.create();
        if (this.model.isShowDivider() == false && this.model.isCursorUp() == false) {
            If.branchId(0);
            Divider.create();
            Divider.strokeWidth(this.model.getDividerHeight());
            Divider.color(this.model.getDividerColor());
            Divider.width(((this.model.hasIcon() ? this.model.getIconSize() : 0) + this.model.getCursorWidth()) * this.titles.length
                + (this.model.isShowDivider() ? (this.model.getDividerHeight() * (this.titles.length - 1)) : 0));
        }
        If.pop();
        Column.pop();
    }
    aboutToAppear() {
        this.model.setOnPageTouchListener((event: TouchEvent, currentIndex: number) => {
            this.onIndicatorTouch(event, currentIndex);
        });
    }
    onIndicatorTouch(event: TouchEvent, index: number) {
        let startX = this.startX;
        let offset = 0;
        if (event.type === TouchType.Down) {
            this.startX = event.touches[0].x;
        }
        if (event.type === TouchType.Move) {
            offset = event.touches[0].x - startX;
            if ((offset >= 0 && index > 0) || (offset <= 0 && index < this.titles.length - 1)) {
                this.indicatorOffset = offset;
            }
        }
        if (event.type === TouchType.Up) {
            offset = 0;
            this.indicatorOffset = offset;
            this.model.getTabsController()?.changeIndex(this.itemIndex);
            this.itemIndex = index;
        }
    }
}
export default ScrollTabsIndicator;
