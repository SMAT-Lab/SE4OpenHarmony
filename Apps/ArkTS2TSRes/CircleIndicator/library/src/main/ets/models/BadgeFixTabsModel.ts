let __generate__Id: number = 0;
function generateId(): string {
    return "BadgeFixTabsModel_" + ++__generate__Id;
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
import common from '@ohos.app.ability.common';
import BaseModel from '../models/BaseModel';
import { length2Vp } from '../utils/UiUtil';
const DEFAULT_SELECTED_COLOR: string = '#ffffff';
const DEFAULT_UNSELECTED_COLOR: string = '#cccccc';
const DEFAULT_HEIGHT: Length = '50vp';
const DEFAULT_WIDTH: Length = '480vp';
const DEFAULT_INDICATOR_HEIGHT: Length = '3vp';
const DEFAULT_UNSELECTED_TEXT_SIZE = '13fp';
const DEFAULT_SELECTED_TEXT_SIZE = '17fp';
export class BadgeFixTabsModel extends BaseModel<BadgeFixTabsModel> {
    protected height: number = length2Vp(getContext(), DEFAULT_HEIGHT);
    protected width: number = length2Vp(getContext(), DEFAULT_WIDTH);
    public mBadgeTypes: Array<BadgeType> = [];
    private mBadgeText: Array<string> = [];
    private mBadgeRuleX: Array<BadgeRule | undefined> = [];
    private mBadgeRuleY: Array<BadgeRule | undefined> = [];
    private mAutoCancelBadge: boolean = false;
    private mItemWidths: Array<number> = [];
    private mIndicatorHeight: number = length2Vp(getContext(), DEFAULT_INDICATOR_HEIGHT);
    private mIndicatorColor: ResourceColor = $r('app.color.transparent');
    private mIndicatorYOffset: number = 0;
    private mUnselectedTextColor: string = DEFAULT_SELECTED_COLOR;
    private mSelectedTextColor: string = DEFAULT_UNSELECTED_COLOR;
    private mUnselectedTextSize: number = length2Vp(getContext(), DEFAULT_UNSELECTED_TEXT_SIZE);
    private mSelectedTextSize: number = length2Vp(getContext(), DEFAULT_SELECTED_TEXT_SIZE);
    private mChangeTextSize: boolean = false;
    private mSplit: boolean = false;
    private mIndicatorAnimation: boolean = false;
    private clickListener: (itemIndex: number) => void = (itemIndex: number) => { };
    constructor(tabsController: TabsController | null) {
        super(tabsController);
    }
    public getBadgeTypes(): BadgeType[] {
        return this.mBadgeTypes;
    }
    public setBadgeTypes(badgeTypes: BadgeType[]): BadgeFixTabsModel {
        this.mBadgeTypes = badgeTypes;
        return this;
    }
    public getBadgeTexts(): string[] {
        return this.mBadgeText;
    }
    public setBadgeTexts(badgeText: string[]): BadgeFixTabsModel {
        this.mBadgeText = badgeText;
        return this;
    }
    public getXBadgeRules(): Array<BadgeRule | undefined> {
        return this.mBadgeRuleX;
    }
    public setXBadgeRules(badgeRuleX: Array<BadgeRule | undefined>): BadgeFixTabsModel {
        for (let i = 0; i < badgeRuleX.length; i++) {
            if (badgeRuleX && badgeRuleX[i]) {
                if (badgeRuleX[i]?.getAnchor() != BadgeAnchor.LEFT
                    && badgeRuleX[i]?.getAnchor() != BadgeAnchor.RIGHT
                    && badgeRuleX[i]?.getAnchor() != BadgeAnchor.CENTER_X) {
                    throw new Error("x badge rule is wrong.");
                }
            }
        }
        this.mBadgeRuleX = badgeRuleX;
        return this;
    }
    public getYBadgeRules(): Array<BadgeRule | undefined> {
        return this.mBadgeRuleY;
    }
    public setYBadgeRules(badgeRuleY: Array<BadgeRule | undefined>): BadgeFixTabsModel {
        for (let i = 0; i < badgeRuleY.length; i++) {
            if (badgeRuleY[i]) {
                if (badgeRuleY[i]?.getAnchor() != BadgeAnchor.TOP
                    && badgeRuleY[i]?.getAnchor() != BadgeAnchor.BOTTOM
                    && badgeRuleY[i]?.getAnchor() != BadgeAnchor.CENTER_Y) {
                    throw new Error("y badge rule is wrong.");
                }
            }
        }
        this.mBadgeRuleY = badgeRuleY;
        return this;
    }
    public isAutoCancelBadge(): boolean {
        return this.mAutoCancelBadge;
    }
    public setAutoCancelBadge(autoCancelBadge: boolean): BadgeFixTabsModel {
        this.mAutoCancelBadge = autoCancelBadge;
        return this;
    }
    public getItemWidths(): number[] {
        return this.mItemWidths;
    }
    public setItemWidths(itemWidths: Length[], context?: common.UIAbilityContext): BadgeFixTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.mItemWidths = itemWidths.map((item) => length2Vp(context!, item));
        return this;
    }
    public getIndicatorHeight(): number {
        return this.mIndicatorHeight;
    }
    public setIndicatorHeight(indicatorHeight: Length, context?: common.UIAbilityContext): BadgeFixTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.mIndicatorHeight = length2Vp(context, indicatorHeight);
        return this;
    }
    public getIndicatorColor(): ResourceColor {
        return this.mIndicatorColor;
    }
    public setIndicatorColor(indicatorColor: ResourceColor): BadgeFixTabsModel {
        this.mIndicatorColor = indicatorColor;
        return this;
    }
    public getUnselectedTextColor(): string {
        return this.mUnselectedTextColor;
    }
    public setUnselectedTextColor(color: string): BadgeFixTabsModel {
        this.mUnselectedTextColor = color;
        return this;
    }
    public getSelectedTextColor(): string {
        return this.mSelectedTextColor;
    }
    public setSelectedTextColor(color: string): BadgeFixTabsModel {
        this.mSelectedTextColor = color;
        return this;
    }
    public getUnselectedTextSize(): number {
        return this.mUnselectedTextSize;
    }
    public setUnselectedTextSize(size: Length, context?: common.UIAbilityContext): BadgeFixTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.mUnselectedTextSize = length2Vp(context, size);
        return this;
    }
    public getSelectedTextSize(): number {
        return this.mSelectedTextSize;
    }
    public setSelectedTextSize(size: Length, context?: common.UIAbilityContext): BadgeFixTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.mSelectedTextSize = length2Vp(context, size);
        return this;
    }
    public getIndicatorYOffset(): number {
        return this.mIndicatorYOffset;
    }
    public setIndicatorYOffset(yOffset: number): BadgeFixTabsModel {
        this.mIndicatorYOffset = yOffset;
        return this;
    }
    public isIndicatorAnimation(): boolean {
        return this.mIndicatorAnimation;
    }
    public setIndicatorAnimation(indicatorAnimation: boolean): BadgeFixTabsModel {
        this.mIndicatorAnimation = indicatorAnimation;
        return this;
    }
    public isChangeTextSize(): boolean {
        return this.mChangeTextSize;
    }
    public setChangeTextSize(changeTextSize: boolean): BadgeFixTabsModel {
        this.mChangeTextSize = changeTextSize;
        return this;
    }
    public isSplit(): boolean {
        return this.mSplit;
    }
    public setSplit(split: boolean): BadgeFixTabsModel {
        this.mSplit = split;
        return this;
    }
    public setClickListener(listener: (num: number) => void): BadgeFixTabsModel {
        this.clickListener = listener;
        return this;
    }
    public getClickListener(): (num: number) => void {
        return this.clickListener;
    }
}
export enum BadgeType {
    NONE,
    COUNT,
    DOT
}
export enum BadgeAnchor {
    LEFT,
    TOP,
    RIGHT,
    BOTTOM,
    CENTER_X,
    CENTER_Y
}
export class BadgeRule {
    mAnchor: BadgeAnchor;
    mOffset: number = 0;
    constructor(anchor: BadgeAnchor, offset: number) {
        this.mAnchor = anchor;
        this.mOffset = offset;
    }
    public getAnchor(): BadgeAnchor {
        return this.mAnchor;
    }
    public setAnchor(anchor: BadgeAnchor): BadgeRule {
        this.mAnchor = anchor;
        return this;
    }
    public getOffset(): number {
        return this.mOffset;
    }
    public setOffset(offset: number): BadgeRule {
        this.mOffset = offset;
        return this;
    }
}
