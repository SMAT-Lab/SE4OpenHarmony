interface BadgeFixTabsIndicator_Params {
    model?: BadgeFixTabsModel;
    titles?: Array<string>;
    itemIndex?: number;
    startX?: number;
    indicatorOffset?: number;
    isInClick?: boolean;
    isOnTouch?: boolean;
    newIndex?: number;
    timeoutId?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BadgeFixTabsIndicator_" + ++__generate__Id;
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
import { BadgeFixTabsModel, BadgeAnchor, BadgeRule, BadgeType } from '../models/BadgeFixTabsModel';
class BadgeFixTabsIndicator extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new BadgeFixTabsModel(null), this, "model");
        this.__titles = new ObservedPropertyObject([], this, "titles");
        this.__itemIndex = new SynchedPropertySimpleTwoWay(params.itemIndex, this, "itemIndex");
        this.startX = 0;
        this.__indicatorOffset = new ObservedPropertySimple(0, this, "indicatorOffset");
        this.isInClick = false;
        this.isOnTouch = false;
        this.__newIndex = new ObservedPropertySimple(0, this, "newIndex");
        this.timeoutId = -1;
        this.updateWithValueParams(params);
        this.declareWatch("itemIndex", this.itemIndexChange);
    }
    updateWithValueParams(params: BadgeFixTabsIndicator_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.titles !== undefined) {
            this.titles = params.titles;
        }
        if (params.startX !== undefined) {
            this.startX = params.startX;
        }
        if (params.indicatorOffset !== undefined) {
            this.indicatorOffset = params.indicatorOffset;
        }
        if (params.isInClick !== undefined) {
            this.isInClick = params.isInClick;
        }
        if (params.isOnTouch !== undefined) {
            this.isOnTouch = params.isOnTouch;
        }
        if (params.newIndex !== undefined) {
            this.newIndex = params.newIndex;
        }
        if (params.timeoutId !== undefined) {
            this.timeoutId = params.timeoutId;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__titles.aboutToBeDeleted();
        this.__itemIndex.aboutToBeDeleted();
        this.__indicatorOffset.aboutToBeDeleted();
        this.__newIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<BadgeFixTabsModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: BadgeFixTabsModel) {
        this.__model.set(newValue);
    }
    private __titles: ObservedPropertyObject<Array<string>>;
    get titles() {
        return this.__titles.get();
    }
    set titles(newValue: Array<string>) {
        this.__titles.set(newValue);
    }
    private __itemIndex: SynchedPropertySimpleTwoWay<number>;
    get itemIndex() {
        return this.__itemIndex.get();
    }
    set itemIndex(newValue: number) {
        this.__itemIndex.set(newValue);
    }
    private startX: number;
    private __indicatorOffset: ObservedPropertySimple<number>;
    get indicatorOffset() {
        return this.__indicatorOffset.get();
    }
    set indicatorOffset(newValue: number) {
        this.__indicatorOffset.set(newValue);
    }
    private isInClick: boolean;
    private isOnTouch: boolean;
    private __newIndex: ObservedPropertySimple<number>;
    get newIndex() {
        return this.__newIndex.get();
    }
    set newIndex(newValue: number) {
        this.__newIndex.set(newValue);
    }
    private timeoutId: number;
    itemIndexChange(): void {
        clearTimeout(this.timeoutId);
        this.reset();
        if (this.model.isAutoCancelBadge()) {
            this.model.mBadgeTypes[this.itemIndex] = BadgeType.NONE;
            let newTypes = [...this.model.getBadgeTypes()];
            newTypes[this.itemIndex] = BadgeType.NONE;
            this.model.setBadgeTypes(newTypes);
        }
        if (this.model.getChangeListener()) {
            if ((this.isInClick || this.isOnTouch) && (this.itemIndex != this.newIndex)) {
                return;
            }
            this.model.getChangeListener()(this.itemIndex);
        }
    }
    comFontColor(index: number, itemIndex: number): string {
        let offset = this.indicatorOffset / this.model.getWidth();
        let textColor = this.model.getUnselectedTextColor();
        let selectedTextColor = this.model.getSelectedTextColor();
        let arr = this.titles;
        if (index == itemIndex) {
            if ((itemIndex > 0 && offset > 0) || (itemIndex < arr.length - 1 && offset < 0)) {
                return this.comHalfFontColor(textColor, selectedTextColor, Math.abs(offset));
            }
            return selectedTextColor;
        }
        else if (itemIndex > 0 && index == itemIndex - 1 && offset > 0) {
            return this.comHalfFontColor(textColor, selectedTextColor, 1 - Math.abs(offset));
        }
        else if (itemIndex < arr.length - 1 && index == itemIndex + 1 && offset < 0) {
            return this.comHalfFontColor(textColor, selectedTextColor, 1 - Math.abs(offset));
        }
        return textColor;
    }
    comHalfFontColor(textColor: string, selectedTextColor: string, offset: number): string {
        let mSelectedTextColor = selectedTextColor.substring(selectedTextColor.indexOf("#") + 1);
        let mTextColor = textColor.substring(textColor.indexOf("#") + 1);
        let halfFontColor = "#";
        for (let i = 0; i < 3; i++) {
            let a = Math.floor(Number.parseInt("0x" + mSelectedTextColor.substring(i * 2, i * 2 + 2)) * (1 - offset) + Number.parseInt("0x" + mTextColor.substring(i * 2, i * 2 + 2)) * offset)
                .toString(16);
            halfFontColor += a.length == 2 ? a : "0" + a;
        }
        return halfFontColor;
    }
    comFontSize(index: number, itemIndex: number): number {
        let offset = this.indicatorOffset / this.model.getWidth();
        let textSize = this.model.getUnselectedTextSize();
        let selectedTextSize = this.model.getSelectedTextSize();
        let arr = this.titles;
        if (selectedTextSize) {
            if (index == itemIndex) {
                if ((itemIndex > 0 && offset > 0) || (itemIndex < arr.length - 1 && offset < 0)) {
                    return Math.abs(offset) * textSize + (1 - Math.abs(offset)) * selectedTextSize;
                }
                return selectedTextSize;
            }
            else if (itemIndex > 0 && index == itemIndex - 1 && offset > 0) {
                return Math.abs(offset) * selectedTextSize + (1 - Math.abs(offset)) * textSize;
            }
            else if (itemIndex < arr.length - 1 && index == itemIndex + 1 && offset < 0) {
                return Math.abs(offset) * selectedTextSize + (1 - Math.abs(offset)) * textSize;
            }
        }
        return textSize;
    }
    getOffsetXMaxValue(itemIndex: number): number {
        let width = this.model.getItemWidths()[itemIndex];
        let nextWidth = this.indicatorOffset > 0 ? this.model.getItemWidths()[itemIndex - 1] : this.model.getItemWidths()[itemIndex + 1];
        let offsetX: number = 0;
        if (this.indicatorOffset > 0 && itemIndex > 0) {
            if ((this.indicatorOffset / this.model.getWidth() - 1 / 4) < 0) {
                offsetX = -this.indicatorOffset / this.model.getWidth() * 4 * nextWidth;
            }
            else {
                offsetX = -nextWidth;
            }
        }
        //向左滑动
        else if (this.indicatorOffset < 0 && itemIndex < this.titles.length - 1) {
            if ((this.indicatorOffset / this.model.getWidth() + 1 / 4) > 0) {
                offsetX = 0;
            }
            else {
                if ((this.indicatorOffset / this.model.getWidth() + 1 / 2) > 0) {
                    offsetX = -(this.indicatorOffset / this.model.getWidth() + 1 / 4) * 4 * width;
                }
                else {
                    offsetX = width;
                }
            }
        }
        return offsetX;
    }
    computeWidth(itemIndex: number): number {
        //当前宽度
        let width = this.model.getItemWidths()[itemIndex];
        let nextWidth = this.indicatorOffset > 0 ? this.model.getItemWidths()[itemIndex - 1] : this.model.getItemWidths()[itemIndex + 1];
        //当前偏移量
        let offsetX = width * (-this.indicatorOffset / this.model.getWidth());
        //下一个宽度
        let temp = 0;
        if (this.indicatorOffset > 0 && itemIndex > 0) {
            if ((this.indicatorOffset / this.model.getWidth() - 1 / 4) < 0) {
                width = width - this.getOffsetXMaxValue(itemIndex);
            }
            else {
                if ((this.indicatorOffset / this.model.getWidth() - 1 / 2) < 0) {
                    width = nextWidth + width - (this.indicatorOffset / this.model.getWidth() - 1 / 4) * 4 * width;
                }
                else {
                    width = nextWidth;
                }
            }
        }
        //向左滑动
        else if (this.indicatorOffset < 0 && itemIndex < this.titles.length - 1) {
            if ((this.indicatorOffset / this.model.getWidth() + 1 / 4) > 0) {
                width = width - this.indicatorOffset / this.model.getWidth() * 4 * nextWidth;
            }
            else {
                if ((this.indicatorOffset / this.model.getWidth() + 1 / 2) > 0) {
                    width = width + nextWidth - this.getOffsetXMaxValue(itemIndex);
                }
                else {
                    width = nextWidth;
                }
            }
        }
        return width;
    }
    calOffsetX(): number[] {
        let badgeOffsetX: number[] = [];
        if (this.model && this.model.getXBadgeRules()) {
            badgeOffsetX = new Array(this.model.getXBadgeRules().length);
            for (let i = 0; i < this.model.getXBadgeRules().length; i++) {
                let badgeRule = this.model.getXBadgeRules()[i];
                if (badgeRule) {
                    let anchor = badgeRule.getAnchor();
                    if (anchor == BadgeAnchor.LEFT) {
                        badgeOffsetX[i] = -this.model.getItemWidths()[i] / 2;
                    }
                    else if (anchor == BadgeAnchor.CENTER_X) {
                        badgeOffsetX[i] = 0;
                    }
                    else if (anchor == BadgeAnchor.RIGHT) {
                        badgeOffsetX[i] = this.model.getItemWidths()[i] / 2;
                    }
                    let offset = badgeRule.getOffset();
                    badgeOffsetX[i] += offset ? offset : 0;
                }
            }
        }
        return badgeOffsetX;
    }
    calOffsetY(): number[] {
        let badgeOffsetY: number[] = new Array(this.model.getYBadgeRules().length);
        for (let i = 0; i < this.model.getYBadgeRules().length; i++) {
            let yBadgeRules = this.model.getYBadgeRules()[i];
            if (yBadgeRules) {
                if (yBadgeRules.getAnchor() == BadgeAnchor.TOP) {
                    badgeOffsetY[i] = -this.model.getHeight() / 2;
                }
                if (yBadgeRules.getAnchor() == BadgeAnchor.CENTER_Y) {
                    badgeOffsetY[i] = 0;
                }
                if (yBadgeRules.getAnchor() == BadgeAnchor.BOTTOM) {
                    badgeOffsetY[i] = this.model.getHeight() / 2;
                }
                let offset = yBadgeRules.getOffset();
                badgeOffsetY[i] += offset ? offset : 0;
            }
        }
        return badgeOffsetY;
    }
    render() {
        Flex.create({ direction: FlexDirection.Row, justifyContent: FlexAlign.Center });
        Flex.width(this.model.getWidth());
        Flex.height(this.model.getHeight());
        Flex.backgroundColor(this.model.getBackgroundColor());
        ForEach.create("2", this, ObservedObject.GetRawObject(this.titles), (item: string, index: number) => {
            Column.create();
            Column.height(this.model.getHeight());
            Stack.create();
            Stack.onClick(() => {
                this.isInClick = true;
                this.newIndex = index;
                this.itemIndex = index;
                this.isInClick = false;
                if (this.model.getClickListener()) {
                    this.model.getClickListener()(this.itemIndex);
                }
                let b = [...this.model.getBadgeTypes()];
                b[index] = BadgeType.NONE;
                this.model.setBadgeTypes(b);
            });
            If.create();
            if (index == this.itemIndex) {
                If.branchId(0);
                Rect.create(
                //                  this.model.isIndicatorAnimation() ?
                //                    { width: this.computeWidth(index), height: this.model.getIndicatorHeight() } :
                { width: this.model.getItemWidths()[index], height: this.model.getIndicatorHeight() });
                Rect.fill(this.model.getIndicatorColor());
                Rect.offset(this.model.isIndicatorAnimation() ?
                    { x: this.getOffsetXMaxValue(this.newIndex),
                        y: this.model.getIndicatorYOffset() } :
                    { x: this.model.getItemWidths()[this.newIndex] * (-this.indicatorOffset / this.model.getWidth()),
                        y: this.model.getIndicatorYOffset() });
            }
            If.pop();
            Text.create('' + this.titles[index]);
            Text.width(this.model.getItemWidths()[index]);
            Text.height(this.model.getHeight());
            Text.textAlign(TextAlign.Center);
            Text.fontColor(this.comFontColor(index, this.newIndex));
            Text.fontSize(this.model.isChangeTextSize() ? this.comFontSize(index, this.newIndex) : this.model.getUnselectedTextSize());
            Text.pop();
            If.create();
            if (this.model.mBadgeTypes[index] == BadgeType.DOT) {
                If.branchId(0);
                Circle.create();
                Circle.width(8);
                Circle.height(8);
                Circle.fill(Color.Red);
                Circle.offset({ x: this.calOffsetX()[index],
                    y: this.calOffsetY()[index] });
            }
            else if (this.model.mBadgeTypes[index] == BadgeType.COUNT) {
                If.branchId(1);
                Stack.create({ alignContent: Alignment.Center });
                Stack.offset({ x: this.calOffsetX()[index],
                    y: this.calOffsetY()[index] });
                Circle.create();
                Circle.width(12);
                Circle.height(12);
                Circle.fill(Color.Red);
                Text.create('' + this.model.getBadgeTexts()[index]);
                Text.fontSize(10);
                Text.fontColor(Color.White);
                Text.pop();
                Stack.pop();
            }
            else if (this.model.mBadgeTypes[index] == BadgeType.NONE) {
                If.branchId(2);
            }
            If.pop();
            Stack.pop();
            Column.pop();
            If.create();
            if (this.model.isSplit()) {
                If.branchId(0);
                If.create();
                if (index < this.titles.length - 1) {
                    If.branchId(0);
                    Rect.create({ width: 1, height: 40 });
                    Rect.fill(this.model.getUnselectedTextColor());
                    Rect.padding({ top: 15 });
                }
                If.pop();
            }
            If.pop();
        }, (item: string) => JSON.stringify(item));
        ForEach.pop();
        Flex.pop();
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
            this.newIndex = currentIndex;
        }
        if (event.type === TouchType.Move) {
            offset = event.touches[0].x - startX;
            if ((offset >= 0 && currentIndex > 0) || (offset <= 0 && currentIndex < this.titles.length - 1)) {
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
        this.newIndex = this.itemIndex;
        this.isOnTouch = false;
    }
}
export default BadgeFixTabsIndicator;
