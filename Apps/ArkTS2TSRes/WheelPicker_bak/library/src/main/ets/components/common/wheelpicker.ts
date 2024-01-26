interface WheelPicker_Params {
    model?: WheelPicker.Model;
    scrollSwitch?: boolean;
    scrollOffset?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "wheelpicker_" + ++__generate__Id;
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
const ADAPTWIDTH = "30%";
const COMBACKGROUNDCOLOR = "#ffE5DEEB";
const TRANSPARENT = "#00E5DEEB";
class WheelPicker extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.model = new WheelPicker.Model();
        this.scrollSwitch = true;
        this.scrollOffset = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: WheelPicker_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.scrollSwitch !== undefined) {
            this.scrollSwitch = params.scrollSwitch;
        }
        if (params.scrollOffset !== undefined) {
            this.scrollOffset = params.scrollOffset;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private model: WheelPicker.Model;
    private scrollSwitch: boolean;
    private scrollOffset: number;
    OccupyText(parent = null) {
        ForEach.create("2", this, ObservedObject.GetRawObject(Array.from(new Array(this.model.mHalfItemCount).keys())), (item: number) => {
            Text.create("");
            Text.fontSize(this.model.mItemTextSize);
            Text.height(this.model.mItemHeight);
            Text.padding(this.model.mSpace);
            Text.pop();
        }, (item: string) => item);
        ForEach.pop();
    }
    ScrollIndex(textColor: string, parent = null) {
        Column.create();
        Column.width(ADAPTWIDTH);
        Column.alignItems(this.model.mAlign);
        If.create();
        if (!this.model.isCyslic) {
            If.branchId(0);
            ForEach.create("3", this, ObservedObject.GetRawObject(this.model.mData), (item: number) => {
                Text.create(item.toString());
                Text.fontSize(this.model.mItemTextSize);
                Text.height(this.model.mItemHeight);
                Text.fontColor(textColor);
                Text.fontFamily(this.model.mFontFamily);
                Text.padding(this.model.mSpace);
                Text.pop();
            }, (item: string) => item);
            ForEach.pop();
        }
        else if (this.model.mVisibleItem < this.model.mData.length) {
            If.branchId(1);
            ForEach.create("5", this, ObservedObject.GetRawObject(Array.from(new Array(3).keys())), (item: number) => {
                ForEach.create("4", this, ObservedObject.GetRawObject(this.model.mData), (item: number) => {
                    Text.create(item.toString());
                    Text.fontSize(this.model.mItemTextSize);
                    Text.height(this.model.mItemHeight);
                    Text.fontColor(textColor);
                    Text.fontFamily(this.model.mFontFamily);
                    Text.padding(this.model.mSpace);
                    Text.pop();
                }, (item: string) => item);
                ForEach.pop();
            }, (item: string) => item);
            ForEach.pop();
        }
        else {
            If.branchId(2);
            ForEach.create("7", this, ObservedObject.GetRawObject(Array.from(new Array(Math.ceil(this.model.mVisibleItem / this.model.mData.length) * 3).keys())), (item: number) => {
                ForEach.create("6", this, ObservedObject.GetRawObject(this.model.mData), (item: number) => {
                    Text.create(item.toString());
                    Text.fontSize(this.model.mItemTextSize);
                    Text.height(this.model.mItemHeight);
                    Text.fontColor(textColor);
                    Text.fontFamily(this.model.mFontFamily);
                    Text.padding(this.model.mSpace);
                    Text.pop();
                }, (item: string) => item);
                ForEach.pop();
            }, (item: string) => item);
            ForEach.pop();
        }
        If.pop();
        Column.pop();
    }
    aboutToAppear() {
        this.model.updateVisibleItemCount();
        setTimeout(() => {
            this.model.scrollInit(this.model.scroller1); //初始位置选择
            let mOffset: number = this.model.scroller.currentOffset().yOffset;
            if (this.model.isCyslic) {
                this.model.scroller1.scrollTo({
                    xOffset: 0,
                    yOffset: mOffset + this.model.mHalfItemCount * this.model.mItemHeight,
                });
                this.model.scroller.scrollTo({
                    xOffset: 0,
                    yOffset: 1,
                });
            }
            else {
                this.model.scroller1.scrollTo({
                    xOffset: 0,
                    yOffset: mOffset,
                });
            }
        }, 300);
    }
    render() {
        Row.create();
        Stack.create();
        Scroll.create(this.model.scroller);
        Scroll.height(this.model.mWheelHeight);
        Scroll.backgroundColor(COMBACKGROUNDCOLOR);
        Scroll.scrollBar(BarState.Off);
        Scroll.onTouch((event: TouchEvent) => {
            if (event.type === TouchType.Up) {
                this.scrollSwitch = true;
            }
        });
        Scroll.onScroll(() => {
            let mOffset: number = this.model.scroller.currentOffset().yOffset;
            if (this.model.isCyslic) {
                this.model.scroller1.scrollTo({
                    xOffset: 0,
                    yOffset: mOffset + this.model.mHalfItemCount * this.model.mItemHeight,
                });
            }
            else {
                this.model.scroller1.scrollTo({
                    xOffset: 0,
                    yOffset: mOffset,
                });
            }
        });
        Scroll.onScrollEnd(() => {
            if (this.scrollSwitch) {
                this.scrollSwitch = false;
                this.scrollOffset = this.model.scroller.currentOffset().yOffset % this.model.mItemHeight;
                if (this.scrollOffset >= (this.model.mItemHeight - 1) && this.scrollOffset <= 1) {
                    return;
                }
                if (this.scrollOffset >= (this.model.mItemHeight / 2) && this.scrollOffset < (this.model.mItemHeight - 1)) {
                    this.model.scroller.scrollTo({
                        xOffset: 0,
                        yOffset: this.model.scroller.currentOffset().yOffset - this.scrollOffset + this.model.mItemHeight,
                        animation: { duration: this.model.mDuration, curve: Curve.Ease }
                    });
                    if (this.model.isCyslic) {
                        this.model.mSelectedItemPosition = (((this.model.scroller.currentOffset()
                            .yOffset - this.scrollOffset) / this.model.mItemHeight + 1) % this.model.mData.length + this.model.mHalfItemCount) % this.model.mData.length;
                        this.model.mSelectedData = this.model.mData[this.model.mSelectedItemPosition];
                    }
                    else {
                        this.model.mSelectedItemPosition = ((this.model.scroller.currentOffset()
                            .yOffset - this.scrollOffset) / this.model.mItemHeight + 1) % this.model.mData.length;
                        this.model.mSelectedData = this.model.mData[(this.model.mSelectedItemPosition) % this.model.mData.length];
                    }
                    if (this.model.mSelectDataShow) {
                        this.model.mSelectDataShow(this.model.mSelectedData);
                    }
                }
                else if (this.scrollOffset > 1 && this.scrollOffset < (this.model.mItemHeight / 2)) {
                    this.model.scroller.scrollTo({
                        xOffset: 0,
                        yOffset: this.model.scroller.currentOffset().yOffset - this.scrollOffset,
                        animation: { duration: this.model.mDuration, curve: Curve.Ease }
                    });
                    this.model.mSelectedItemPosition = ((this.model.scroller.currentOffset()
                        .yOffset - this.scrollOffset) / this.model.mItemHeight) % this.model.mData.length;
                    if (this.model.isCyslic) {
                        this.model.mSelectedItemPosition = (this.model.mSelectedItemPosition + this.model.mHalfItemCount) % this.model.mData.length;
                        this.model.mSelectedData = this.model.mData[this.model.mSelectedItemPosition];
                    }
                    else {
                        this.model.mSelectedData = this.model.mData[this.model.mSelectedItemPosition];
                    }
                    if (this.model.mSelectDataShow) {
                        this.model.mSelectDataShow(this.model.mSelectedData);
                    }
                }
            }
        });
        Scroll.onScrollEdge((side: Edge) => {
            if (this.model.isCyslic) {
                let scollerBack = Math.ceil((Math.floor(this.model.mVisibleItem / this.model.mData.length) * 3) / 2 + 1) * this.model.mData.length * this.model.mItemHeight;
                if (side.valueOf() === 0) {
                    this.model.scroller.scrollTo({
                        xOffset: 0,
                        yOffset: scollerBack,
                        animation: { duration: 0, curve: Curve.Ease }
                    });
                }
                // 向下滚动
                if (side.valueOf() === 2) {
                    this.model.scroller.scrollTo({
                        xOffset: 0,
                        yOffset: scollerBack - (2 * this.model.mHalfItemCount + 1) * this.model.mItemHeight,
                        animation: { duration: 0, curve: Curve.Ease }
                    });
                }
            }
        });
        Column.create();
        If.create();
        if (!this.model.isCyslic) {
            If.branchId(0);
            this.OccupyText(this);
        }
        If.pop();
        this.ScrollIndex(this.model.mItemTextColor, this);
        If.create();
        if (!this.model.isCyslic) {
            If.branchId(0);
            this.OccupyText(this);
        }
        If.pop();
        Column.pop();
        Scroll.pop();
        If.create();
        if (this.model.hasIndicator) {
            If.branchId(0);
            Divider.create();
            Divider.offset({ x: 0, y: -this.model.mItemHeight / 2 });
            Divider.color(this.model.mIndicatorColor);
            Divider.width(ADAPTWIDTH);
            Divider.strokeWidth(this.model.mIndicatorSize);
            Divider.zIndex(2);
            Divider.create();
            Divider.offset({ x: 0, y: this.model.mItemHeight / 2 });
            Divider.color(this.model.mIndicatorColor);
            Divider.width(ADAPTWIDTH);
            Divider.strokeWidth(this.model.mIndicatorSize);
            Divider.zIndex(2);
        }
        If.pop();
        Column.create();
        Scroll.create(this.model.scroller1);
        Scroll.height(this.model.mItemHeight);
        Scroll.enabled(false);
        Scroll.backgroundColor(COMBACKGROUNDCOLOR);
        Scroll.scrollBar(BarState.Off);
        Column.create();
        this.ScrollIndex(this.model.mSelectedItemTextColor, this);
        Column.pop();
        Scroll.pop();
        Column.pop();
        If.create();
        if (this.model.hasAtmospheric) {
            If.branchId(0);
            Flex.create();
            Flex.width(ADAPTWIDTH);
            Flex.height(this.model.mWheelHeight);
            Flex.touchable(false);
            Flex.linearGradient({
                angle: 0,
                direction: GradientDirection.Top,
                colors: [[COMBACKGROUNDCOLOR, 0.0], [TRANSPARENT, 0.5], [COMBACKGROUNDCOLOR, 1.0]]
            });
            Flex.pop();
        }
        If.pop();
        If.create();
        if (this.model.hasCurtain) {
            If.branchId(0);
            Text.create();
            Text.width(ADAPTWIDTH);
            Text.height(this.model.mItemHeight);
            Text.opacity(0.5);
            Text.backgroundColor(this.model.mCurtainColor);
            Text.enabled(false);
            Text.pop();
        }
        If.pop();
        Stack.pop();
        Row.pop();
    }
}
namespace WheelPicker {
    export class Model {
        mDuration: number = 100;
        SelectPosition0: number = 0;
        computeEnd: boolean = false;
        mTextHeight: number = 28;
        mSpace: number = 8;
        mItemHeight: number = this.mTextHeight + 2 * this.mSpace;
        mVisibleItem: number = 7;
        mWheelHeight: number = this.mItemHeight * this.mVisibleItem;
        mItemTextSize: number = 24;
        mItemTextColor: string = "#536D8A";
        mSelectedItemTextColor: string = "#FAFAaa";
        mIndicatorSize: number = 1;
        mIndicatorColor: string = "red";
        mCurtainColor: string = "#FFFFFF";
        mHalfItemCount: number = (this.mVisibleItem - 1) / 2;
        mFontFamily: string = '';
        isCyslic: boolean = true;
        hasIndicator: boolean = true;
        hasAtmospheric: boolean = true;
        hasCurtain: boolean = true;
        mFirstSelectPosition: number = 1;
        mSelectedItemPosition: number = this.mFirstSelectPosition;
        mAlign: HorizontalAlign = HorizontalAlign.Center;
        mSelectedData: string = '';
        mData: string[] = [];
        scroller: Scroller = new Scroller();
        scroller1: Scroller = new Scroller();
        mSelectDataShow: (text: string) => void = (text: string) => { };
        constructor() {
        }
        setData(mData: string[]): Model {
            this.mData = mData;
            this.mData.forEach(() => {
            });
            return this;
        }
        setSelectDataShow(mSelectDataShow: (text: string) => void): Model {
            this.mSelectDataShow = mSelectDataShow;
            return this;
        }
        setFirstSelectedItemPosition(FirstSelectPosition: number): Model {
            this.mFirstSelectPosition = FirstSelectPosition;
            this.SelectPosition0 = FirstSelectPosition;
            return this;
        }
        getCurrentItemPosition(): number {
            return this.mSelectedItemPosition;
        }
        getCurrentItemData(): string {
            return this.mSelectedData;
        }
        setTextHeight(mTextHeight: number): Model {
            this.mTextHeight = mTextHeight;
            return this;
        }
        getTextHeight(): number {
            return this.mTextHeight;
        }
        setVisibleItemCount(count: number): Model {
            this.mVisibleItem = count;
            return this;
        }
        getVisibleItemCount(): number {
            return this.mVisibleItem;
        }
        getItemHeight(): number {
            return this.mItemHeight;
        }
        setCyclic(isCyslic: boolean): Model {
            this.isCyslic = isCyslic;
            return this;
        }
        isCyslicShow(): boolean {
            return this.isCyslic;
        }
        setSelectedItemTextColor(color: string): Model {
            this.mSelectedItemTextColor = color;
            return this;
        }
        getSelectedItemTextColor(): string {
            return this.mSelectedItemTextColor;
        }
        setItemTextColor(color: string): Model {
            this.mItemTextColor = color;
            return this;
        }
        getItemTextColor(): string {
            return this.mItemTextColor;
        }
        setItemTextSize(size: number): Model {
            this.mItemTextSize = size;
            return this;
        }
        getItemTextSize(): number {
            return this.mItemTextSize;
        }
        setItemSpace(space: number): Model {
            this.mSpace = space;
            return this;
        }
        getItemSpace(): number {
            return this.mSpace;
        }
        setIndicator(hasIndicator: boolean): Model {
            this.hasIndicator = hasIndicator;
            return this;
        }
        hasIndicatorDivide(): boolean {
            return this.hasIndicator;
        }
        setIndicatorSize(size: number): Model {
            this.mIndicatorSize = size;
            return this;
        }
        getIndicatorSize(): number {
            return this.mIndicatorSize;
        }
        setIndicatorColor(color: string): Model {
            this.mIndicatorColor = color;
            return this;
        }
        getIndicatorColor(): string {
            return this.mIndicatorColor;
        }
        setCurtain(hasCurtain: boolean): Model {
            this.hasCurtain = hasCurtain;
            return this;
        }
        hasCurtainShow(): boolean {
            return this.hasCurtain;
        }
        setCurtainColor(color: string): Model {
            this.mCurtainColor = color;
            return this;
        }
        getCurtainColor(): string {
            return this.mCurtainColor;
        }
        setAtmospheric(hasAtmospheric: boolean): Model {
            this.hasAtmospheric = hasAtmospheric;
            return this;
        }
        hasAtmosphericShow(): boolean {
            return this.hasAtmospheric;
        }
        setItemAlign(align: HorizontalAlign): Model {
            this.mAlign = align;
            return this;
        }
        getItemAlign(): HorizontalAlign {
            return this.mAlign;
        }
        setFontFamily(fontFamily: string): Model {
            this.mFontFamily = fontFamily;
            return this;
        }
        getFontFamily(): string {
            return this.mFontFamily;
        }
        updateVisibleItemCount() {
            if (this.mVisibleItem < 2)
                return;
            if (this.mVisibleItem % 2 == 0)
                this.mVisibleItem += 1;
            this.mWheelHeight = this.mVisibleItem * this.mItemHeight;
        }
        scrollInit(scroller: Scroller) {
            if (!this.computeEnd && this.isCyslic) {
                scroller.scrollTo({
                    xOffset: 0,
                    yOffset: this.mItemHeight * (this.mFirstSelectPosition + this.mData.length - this.mHalfItemCount),
                    animation: { duration: 0, curve: Curve.Ease }
                });
                this.mSelectedItemPosition = this.mFirstSelectPosition;
                this.computeEnd = true;
            }
            else if (!this.computeEnd) {
                scroller.scrollTo({
                    xOffset: 0,
                    yOffset: this.mItemHeight * this.mFirstSelectPosition,
                    animation: { duration: 0, curve: Curve.Ease }
                });
                this.mSelectedItemPosition = this.mFirstSelectPosition;
                this.computeEnd = true;
            }
        }
        setSelectedItemPosition(SelectPosition: number) {
            if (this.isCyslic) {
                this.scroller.scrollTo({
                    xOffset: 0,
                    yOffset: (SelectPosition - this.mHalfItemCount + this.mData.length) * this.mItemHeight,
                    animation: { duration: this.mDuration, curve: Curve.Ease }
                });
            }
            else {
                this.scroller.scrollTo({
                    xOffset: 0,
                    yOffset: SelectPosition * this.mItemHeight,
                    animation: { duration: this.mDuration, curve: Curve.Ease }
                });
            }
        }
    }
}
export default WheelPicker;
