interface WheelAreaPicker_Params {
    model?: WheelAreaPicker.Model;
    provinceArray?: Province[];
    scrollerProvince?: Scroller;
    scrollerCity?: Scroller;
    scrollerArea?: Scroller;
    scroller1?: Scroller;
    scroller2?: Scroller;
    scroller3?: Scroller;
    lastProvincePosition?: number;
    lastCityPosition?: number;
    lastAreaPosition?: number;
    mHalfItemCount?: number;
    scrollerProvinceIndex?: number;
    scrollerCityIndex?: number;
    scrollerAreaIndex?: number;
    cityAndAreaState?: Array<CityAndArea>;
    AreaArrayState?: Array<string>;
    enabledProvince?: boolean;
    enabledCity?: boolean;
    enabledArea?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "wheelareapicker_" + ++__generate__Id;
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
import { initializeProvinceOnStartup, Province, CityAndArea } from '../common/Province';
const ADAPTWIDTH = "30%";
class WheelAreaPicker extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new WheelAreaPicker.Model(), this, "model");
        this.provinceArray = initializeProvinceOnStartup();
        this.scrollerProvince = new Scroller();
        this.scrollerCity = new Scroller();
        this.scrollerArea = new Scroller();
        this.scroller1 = new Scroller();
        this.scroller2 = new Scroller();
        this.scroller3 = new Scroller();
        this.lastProvincePosition = 0;
        this.lastCityPosition = 0;
        this.lastAreaPosition = 0;
        this.mHalfItemCount = 0;
        this.__scrollerProvinceIndex = new ObservedPropertySimple(0, this, "scrollerProvinceIndex");
        this.__scrollerCityIndex = new ObservedPropertySimple(0, this, "scrollerCityIndex");
        this.__scrollerAreaIndex = new ObservedPropertySimple(0, this, "scrollerAreaIndex");
        this.__cityAndAreaState = new ObservedPropertyObject(this.provinceArray[this.scrollerProvinceIndex].cityAndArea, this, "cityAndAreaState");
        this.__AreaArrayState = new ObservedPropertyObject(this.provinceArray[this.scrollerProvinceIndex].cityAndArea[this.scrollerCityIndex].area, this, "AreaArrayState");
        this.__enabledProvince = new ObservedPropertySimple(true, this, "enabledProvince");
        this.__enabledCity = new ObservedPropertySimple(true, this, "enabledCity");
        this.__enabledArea = new ObservedPropertySimple(true, this, "enabledArea");
        this.updateWithValueParams(params);
        this.declareWatch("scrollerProvinceIndex", this.scrollerProvinceIndexChange);
        this.declareWatch("scrollerCityIndex", this.scrollerCityIndexChange);
        this.declareWatch("scrollerAreaIndex", this.scrollerAreaIndexChange);
    }
    updateWithValueParams(params: WheelAreaPicker_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.provinceArray !== undefined) {
            this.provinceArray = params.provinceArray;
        }
        if (params.scrollerProvince !== undefined) {
            this.scrollerProvince = params.scrollerProvince;
        }
        if (params.scrollerCity !== undefined) {
            this.scrollerCity = params.scrollerCity;
        }
        if (params.scrollerArea !== undefined) {
            this.scrollerArea = params.scrollerArea;
        }
        if (params.scroller1 !== undefined) {
            this.scroller1 = params.scroller1;
        }
        if (params.scroller2 !== undefined) {
            this.scroller2 = params.scroller2;
        }
        if (params.scroller3 !== undefined) {
            this.scroller3 = params.scroller3;
        }
        if (params.lastProvincePosition !== undefined) {
            this.lastProvincePosition = params.lastProvincePosition;
        }
        if (params.lastCityPosition !== undefined) {
            this.lastCityPosition = params.lastCityPosition;
        }
        if (params.lastAreaPosition !== undefined) {
            this.lastAreaPosition = params.lastAreaPosition;
        }
        if (params.mHalfItemCount !== undefined) {
            this.mHalfItemCount = params.mHalfItemCount;
        }
        if (params.scrollerProvinceIndex !== undefined) {
            this.scrollerProvinceIndex = params.scrollerProvinceIndex;
        }
        if (params.scrollerCityIndex !== undefined) {
            this.scrollerCityIndex = params.scrollerCityIndex;
        }
        if (params.scrollerAreaIndex !== undefined) {
            this.scrollerAreaIndex = params.scrollerAreaIndex;
        }
        if (params.cityAndAreaState !== undefined) {
            this.cityAndAreaState = params.cityAndAreaState;
        }
        if (params.AreaArrayState !== undefined) {
            this.AreaArrayState = params.AreaArrayState;
        }
        if (params.enabledProvince !== undefined) {
            this.enabledProvince = params.enabledProvince;
        }
        if (params.enabledCity !== undefined) {
            this.enabledCity = params.enabledCity;
        }
        if (params.enabledArea !== undefined) {
            this.enabledArea = params.enabledArea;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__scrollerProvinceIndex.aboutToBeDeleted();
        this.__scrollerCityIndex.aboutToBeDeleted();
        this.__scrollerAreaIndex.aboutToBeDeleted();
        this.__cityAndAreaState.aboutToBeDeleted();
        this.__AreaArrayState.aboutToBeDeleted();
        this.__enabledProvince.aboutToBeDeleted();
        this.__enabledCity.aboutToBeDeleted();
        this.__enabledArea.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<WheelAreaPicker.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: WheelAreaPicker.Model) {
        this.__model.set(newValue);
    }
    private provinceArray: Province[];
    private scrollerProvince: Scroller;
    private scrollerCity: Scroller;
    private scrollerArea: Scroller;
    private scroller1: Scroller;
    private scroller2: Scroller;
    private scroller3: Scroller;
    private lastProvincePosition: number;
    private lastCityPosition: number;
    private lastAreaPosition: number;
    private mHalfItemCount: number;
    private __scrollerProvinceIndex: ObservedPropertySimple<number>;
    get scrollerProvinceIndex() {
        return this.__scrollerProvinceIndex.get();
    }
    set scrollerProvinceIndex(newValue: number) {
        this.__scrollerProvinceIndex.set(newValue);
    }
    private __scrollerCityIndex: ObservedPropertySimple<number>;
    get scrollerCityIndex() {
        return this.__scrollerCityIndex.get();
    }
    set scrollerCityIndex(newValue: number) {
        this.__scrollerCityIndex.set(newValue);
    }
    private __scrollerAreaIndex: ObservedPropertySimple<number>;
    get scrollerAreaIndex() {
        return this.__scrollerAreaIndex.get();
    }
    set scrollerAreaIndex(newValue: number) {
        this.__scrollerAreaIndex.set(newValue);
    }
    private __cityAndAreaState: ObservedPropertyObject<Array<CityAndArea>>;
    get cityAndAreaState() {
        return this.__cityAndAreaState.get();
    }
    set cityAndAreaState(newValue: Array<CityAndArea>) {
        this.__cityAndAreaState.set(newValue);
    }
    private __AreaArrayState: ObservedPropertyObject<Array<string>>;
    get AreaArrayState() {
        return this.__AreaArrayState.get();
    }
    set AreaArrayState(newValue: Array<string>) {
        this.__AreaArrayState.set(newValue);
    }
    private __enabledProvince: ObservedPropertySimple<boolean>;
    get enabledProvince() {
        return this.__enabledProvince.get();
    }
    set enabledProvince(newValue: boolean) {
        this.__enabledProvince.set(newValue);
    }
    private __enabledCity: ObservedPropertySimple<boolean>;
    get enabledCity() {
        return this.__enabledCity.get();
    }
    set enabledCity(newValue: boolean) {
        this.__enabledCity.set(newValue);
    }
    private __enabledArea: ObservedPropertySimple<boolean>;
    get enabledArea() {
        return this.__enabledArea.get();
    }
    set enabledArea(newValue: boolean) {
        this.__enabledArea.set(newValue);
    }
    scrollerProvinceIndexChange() {
        if (this.scrollerProvinceIndex > this.provinceArray.length - 1) {
            this.scrollerProvinceIndex = this.provinceArray.length - 1;
        }
    }
    scrollerCityIndexChange() {
        if (this.scrollerProvinceIndex > this.provinceArray.length - 1) {
            this.scrollerProvinceIndex = this.provinceArray.length - 1;
        }
        if (this.scrollerCityIndex > this.provinceArray[this.scrollerProvinceIndex].cityAndArea.length - 1) {
            this.scrollerCityIndex = this.provinceArray[this.scrollerProvinceIndex].cityAndArea.length - 1;
        }
    }
    scrollerAreaIndexChange() {
        if (this.scrollerProvinceIndex > this.provinceArray.length - 1) {
            this.scrollerProvinceIndex = this.provinceArray.length - 1;
        }
        if (this.scrollerCityIndex > this.provinceArray[this.scrollerProvinceIndex].cityAndArea.length - 1) {
            this.scrollerCityIndex = this.provinceArray[this.scrollerProvinceIndex].cityAndArea.length - 1;
        }
        if (this.scrollerAreaIndex > this.provinceArray[this.scrollerProvinceIndex].cityAndArea[this.scrollerCityIndex].area.length - 1) {
            this.scrollerAreaIndex = this.provinceArray[this.scrollerProvinceIndex].cityAndArea[this.scrollerCityIndex].area.length - 1;
        }
    }
    aboutToAppear() {
        this.model.updateVisibleItemCount();
        this.scrollerProvinceIndex = this.model.mFirstSelectPosition;
        this.cityAndAreaState = this.provinceArray[this.scrollerProvinceIndex].cityAndArea;
        this.AreaArrayState = this.provinceArray[this.scrollerProvinceIndex].cityAndArea[0].area;
    }
    render() {
        Row.create();
        Stack.create();
        Stack.width(ADAPTWIDTH);
        Scroll.create(this.scrollerProvince);
        Scroll.enabled(this.enabledProvince);
        Scroll.height(this.model.mWheelHeight);
        Scroll.backgroundColor('#E5DEEB');
        Scroll.scrollBar(BarState.Off);
        Scroll.onScroll((xOffset: number, yOffset: number) => {
            this.enabledCity = false;
            this.enabledArea = false;
            this.model.scrollInit(this.scrollerProvince); //初始位置选择
            let mOffset: number = this.scrollerProvince.currentOffset().yOffset;
            this.model.mHalfItemCount = (this.model.mVisibleItem - 1) / 2;
            this.lastProvincePosition = yOffset == 0 ? this.lastProvincePosition : yOffset;
            this.scroller1.scrollTo({
                xOffset: 0,
                yOffset: mOffset,
            });
        });
        Scroll.onScrollStop(() => {
            this.enabledCity = true;
            this.enabledArea = true;
            let scrollOffset = this.scrollerProvince.currentOffset().yOffset % this.model.mItemHeight;
            if (scrollOffset > 1) {
                if (this.lastProvincePosition <= 0) { // 小于0，向下滑动，大于0是，是向上滑动
                    this.scrollerProvince.scrollTo({
                        xOffset: 0,
                        yOffset: this.scrollerProvince.currentOffset().yOffset - scrollOffset,
                        animation: { duration: 100, curve: Curve.Ease }
                    });
                    this.scrollerProvinceIndex = (this.scrollerProvince.currentOffset()
                        .yOffset - scrollOffset) / this.model.mItemHeight;
                }
                else {
                    this.scrollerProvince.scrollTo({
                        xOffset: 0,
                        yOffset: this.scrollerProvince.currentOffset().yOffset + this.model.mItemHeight - scrollOffset,
                        animation: { duration: 100, curve: Curve.Ease }
                    });
                    this.scrollerProvinceIndex = (this.scrollerProvince.currentOffset()
                        .yOffset - scrollOffset) / this.model.mItemHeight + 1;
                }
                this.cityAndAreaState = this.provinceArray[this.scrollerProvinceIndex].cityAndArea;
                this.AreaArrayState = this.provinceArray[this.scrollerProvinceIndex].cityAndArea[0].area;
            }
            this.model.mProvinceName = this.provinceArray[this.scrollerProvinceIndex].provinceName;
            this.model.mCityName = this.cityAndAreaState[0].cityName;
            this.model.mAreaName = this.AreaArrayState[0];
        });
        Scroll.onScrollEdge((side: Edge) => {
            this.scrollerProvinceIndex = this.scrollerProvince.currentOffset().yOffset / this.model.mItemHeight;
            // 防止滚到到边缘 onScrollEnd回调函数不触发
            this.cityAndAreaState = this.provinceArray[this.scrollerProvinceIndex].cityAndArea;
            this.AreaArrayState = this.provinceArray[this.scrollerProvinceIndex].cityAndArea[0].area;
        });
        Column.create();
        Column.width('100%');
        Column.alignItems(this.model.mAlign);
        ForEach.create("2", this, ObservedObject.GetRawObject(Array.from(new Array(this.model.mHalfItemCount).keys())), (item: number) => {
            Text.create("");
            Text.fontSize(this.model.mItemTextSize);
            Text.height(this.model.mItemHeight);
            Text.padding(this.model.mSpace);
            Text.pop();
        }, (item: string) => item);
        ForEach.pop();
        ForEach.create("3", this, ObservedObject.GetRawObject(this.provinceArray), (provinceItem: Province) => {
            Text.create(provinceItem.provinceName);
            Text.fontSize(this.model.mItemTextSize);
            Text.height(this.model.mItemHeight);
            Text.fontColor(this.model.mItemTextColor);
            Text.fontFamily(this.model.mFontFamily);
            Text.padding(this.model.mSpace);
            Text.pop();
        }, (provinceItem: Province) => provinceItem.provinceName);
        ForEach.pop();
        ForEach.create("4", this, ObservedObject.GetRawObject(Array.from(new Array(this.model.mHalfItemCount).keys())), (item: number) => {
            Text.create("");
            Text.fontSize(this.model.mItemTextSize);
            Text.height(this.model.mItemHeight);
            Text.padding(this.model.mSpace);
            Text.pop();
        }, (item: string) => item);
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        If.create();
        if (this.model.hasIndicator) {
            If.branchId(0);
            Divider.create();
            Divider.offset({ x: 0, y: -this.model.mItemHeight / 2 });
            Divider.color(this.model.mIndicatorColor);
            Divider.width('100%');
            Divider.strokeWidth(this.model.mIndicatorSize);
            Divider.zIndex(2);
            Divider.create();
            Divider.offset({ x: 0, y: this.model.mItemHeight / 2 });
            Divider.color(this.model.mIndicatorColor);
            Divider.width('100%');
            Divider.strokeWidth(this.model.mIndicatorSize);
            Divider.zIndex(2);
        }
        If.pop();
        Column.create();
        Scroll.create(this.scroller1);
        Scroll.height(this.model.mItemHeight);
        Scroll.enabled(false);
        Scroll.backgroundColor('#E5DEEB');
        Scroll.scrollBar(BarState.Off);
        Column.create();
        Column.alignItems(this.model.mAlign);
        ForEach.create("5", this, ObservedObject.GetRawObject(this.provinceArray), (provinceItem: Province) => {
            Text.create(provinceItem.provinceName);
            Text.fontSize(this.model.mItemTextSize);
            Text.height(this.model.mItemHeight);
            Text.fontColor(this.model.mSelectedItemTextColor);
            Text.fontFamily(this.model.mFontFamily);
            Text.padding(this.model.mSpace);
            Text.pop();
        }, (provinceItem: Province) => provinceItem.provinceName);
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
        If.create();
        if (this.model.hasAtmospheric) {
            If.branchId(0);
            Flex.create();
            Flex.width('100%');
            Flex.height(this.model.mWheelHeight);
            Flex.touchable(false);
            Flex.linearGradient({
                angle: 0,
                direction: GradientDirection.Top,
                colors: [['#ffE5DEEB', 0.0], ['#00E5DEEB', 0.5], ['#ffE5DEEB', 1.0]]
            });
            Flex.pop();
        }
        If.pop();
        If.create();
        if (this.model.hasCurtain) {
            If.branchId(0);
            Text.create();
            Text.width('100%');
            Text.height(this.model.mItemHeight);
            Text.opacity(0.5);
            Text.backgroundColor(this.model.mCurtainColor);
            Text.enabled(false);
            Text.pop();
        }
        If.pop();
        Stack.pop();
        Stack.create();
        Stack.width(ADAPTWIDTH);
        Scroll.create(this.scrollerCity);
        Scroll.enabled(this.enabledCity);
        Scroll.height(this.model.mWheelHeight);
        Scroll.backgroundColor('#E5DEEB');
        Scroll.scrollBar(BarState.Off);
        Scroll.onScroll((xOffset: number, yOffset: number) => {
            this.enabledProvince = false;
            this.enabledArea = false;
            this.model.scrollInit(this.scrollerCity); //初始位置选择
            let mOffset: number = this.scrollerCity.currentOffset().yOffset;
            this.model.mHalfItemCount = (this.model.mVisibleItem - 1) / 2;
            this.lastCityPosition = yOffset == 0 ? this.lastCityPosition : yOffset;
            this.scroller2.scrollTo({
                xOffset: 0,
                yOffset: mOffset,
            });
        });
        Scroll.onScrollStop(() => {
            this.enabledProvince = true;
            this.enabledArea = true;
            let scrollOffset = this.scrollerCity.currentOffset().yOffset % this.model.mItemHeight;
            if (scrollOffset > 1) {
                if (this.lastCityPosition <= 0) { // 小于0，向下滑动，大于0是，是向上滑动
                    this.scrollerCity.scrollTo({
                        xOffset: 0,
                        yOffset: this.scrollerCity.currentOffset().yOffset - scrollOffset,
                        animation: { duration: 100, curve: Curve.Ease }
                    });
                    this.scrollerCityIndex = (this.scrollerCity.currentOffset()
                        .yOffset - scrollOffset) / this.model.mItemHeight;
                }
                else {
                    this.scrollerCity.scrollTo({
                        xOffset: 0,
                        yOffset: this.scrollerCity.currentOffset().yOffset + this.model.mItemHeight - scrollOffset,
                        animation: { duration: 100, curve: Curve.Ease }
                    });
                    this.scrollerCityIndex = (this.scrollerCity.currentOffset()
                        .yOffset - scrollOffset) / this.model.mItemHeight + 1;
                }
                this.AreaArrayState = this.provinceArray[this.scrollerProvinceIndex].cityAndArea[this.scrollerCityIndex].area;
            }
            this.model.mProvinceName = this.provinceArray[this.scrollerProvinceIndex].provinceName;
            this.model.mCityName = this.cityAndAreaState[this.scrollerCityIndex]?.cityName;
            this.model.mAreaName = this.AreaArrayState[0];
        });
        Scroll.onScrollEdge((side: Edge) => {
            this.scrollerProvinceIndex = this.scrollerCity.currentOffset().yOffset / this.model.mItemHeight;
        });
        Column.create();
        Column.width('100%');
        Column.alignItems(this.model.mAlign);
        ForEach.create("6", this, ObservedObject.GetRawObject(Array.from(new Array(this.model.mHalfItemCount).keys())), (item: number) => {
            Text.create("");
            Text.fontSize(this.model.mItemTextSize);
            Text.height(this.model.mItemHeight);
            Text.padding(this.model.mSpace);
            Text.pop();
        }, (item: string) => item);
        ForEach.pop();
        ForEach.create("7", this, ObservedObject.GetRawObject(this.cityAndAreaState), (val: CityAndArea) => {
            If.create();
            if (val.cityName.length > 5) {
                If.branchId(0);
                Text.create(val.cityName);
                Text.fontSize(this.model.mItemTextSize * 3 / 4);
                Text.height(this.model.mItemHeight);
                Text.fontColor(this.model.mItemTextColor);
                Text.fontFamily(this.model.mFontFamily);
                Text.padding(this.model.mSpace);
                Text.pop();
            }
            else {
                If.branchId(1);
                Text.create(val.cityName);
                Text.fontSize(this.model.mItemTextSize);
                Text.height(this.model.mItemHeight);
                Text.fontColor(this.model.mItemTextColor);
                Text.fontFamily(this.model.mFontFamily);
                Text.padding(this.model.mSpace);
                Text.pop();
            }
            If.pop();
        }, (val: CityAndArea) => val.id.toString());
        ForEach.pop();
        ForEach.create("8", this, ObservedObject.GetRawObject(Array.from(new Array(this.model.mHalfItemCount).keys())), (item: number) => {
            Text.create("");
            Text.fontSize(this.model.mItemTextSize);
            Text.height(this.model.mItemHeight);
            Text.padding(this.model.mSpace);
            Text.pop();
        }, (item: string) => item);
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        If.create();
        if (this.model.hasIndicator) {
            If.branchId(0);
            Divider.create();
            Divider.offset({ x: 0, y: -this.model.mItemHeight / 2 });
            Divider.color(this.model.mIndicatorColor);
            Divider.width('100%');
            Divider.strokeWidth(this.model.mIndicatorSize);
            Divider.zIndex(2);
            Divider.create();
            Divider.offset({ x: 0, y: this.model.mItemHeight / 2 });
            Divider.color(this.model.mIndicatorColor);
            Divider.width('100%');
            Divider.strokeWidth(this.model.mIndicatorSize);
            Divider.zIndex(2);
        }
        If.pop();
        Column.create();
        Scroll.create(this.scroller2);
        Scroll.height(this.model.mItemHeight);
        Scroll.enabled(false);
        Scroll.backgroundColor('#E5DEEB');
        Scroll.scrollBar(BarState.Off);
        Column.create();
        Column.alignItems(this.model.mAlign);
        ForEach.create("9", this, ObservedObject.GetRawObject(this.cityAndAreaState), (val: CityAndArea) => {
            If.create();
            if (val.cityName.length > 5) {
                If.branchId(0);
                Text.create(val.cityName);
                Text.fontSize(this.model.mItemTextSize * 3 / 4);
                Text.height(this.model.mItemHeight);
                Text.fontColor(this.model.mSelectedItemTextColor);
                Text.fontFamily(this.model.mFontFamily);
                Text.padding(this.model.mSpace);
                Text.pop();
            }
            else {
                If.branchId(1);
                Text.create(val.cityName);
                Text.fontSize(this.model.mItemTextSize);
                Text.height(this.model.mItemHeight);
                Text.fontColor(this.model.mSelectedItemTextColor);
                Text.fontFamily(this.model.mFontFamily);
                Text.padding(this.model.mSpace);
                Text.pop();
            }
            If.pop();
        }, (val: CityAndArea) => val.id.toString());
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
        If.create();
        if (this.model.hasAtmospheric) {
            If.branchId(0);
            Flex.create();
            Flex.width('100%');
            Flex.height(this.model.mWheelHeight);
            Flex.touchable(false);
            Flex.linearGradient({
                angle: 0,
                direction: GradientDirection.Top,
                colors: [['#ffE5DEEB', 0.0], ['#00E5DEEB', 0.5], ['#ffE5DEEB', 1.0]]
            });
            Flex.pop();
        }
        If.pop();
        If.create();
        if (this.model.hasCurtain) {
            If.branchId(0);
            Text.create();
            Text.width('100%');
            Text.height(this.model.mItemHeight);
            Text.opacity(0.5);
            Text.backgroundColor(this.model.mCurtainColor);
            Text.enabled(false);
            Text.pop();
        }
        If.pop();
        Stack.pop();
        If.create();
        if (!this.model.mHideArea) {
            If.branchId(0);
            Stack.create();
            Stack.width(ADAPTWIDTH);
            Scroll.create(this.scrollerArea);
            Scroll.enabled(this.enabledArea);
            Scroll.height(this.model.mWheelHeight);
            Scroll.backgroundColor('#E5DEEB');
            Scroll.scrollBar(BarState.Off);
            Scroll.onScroll((xOffset: number, yOffset: number) => {
                this.enabledProvince = false;
                this.enabledCity = false;
                this.model.scrollInit(this.scrollerArea); //初始位置选择
                let mOffset: number = this.scrollerArea.currentOffset().yOffset;
                this.model.mHalfItemCount = (this.model.mVisibleItem - 1) / 2;
                this.lastAreaPosition = yOffset == 0 ? this.lastAreaPosition : yOffset;
                this.scroller3.scrollTo({
                    xOffset: 0,
                    yOffset: mOffset,
                });
            });
            Scroll.onScrollStop(() => {
                this.enabledProvince = true;
                this.enabledCity = true;
                let scrollOffset = this.scrollerArea.currentOffset().yOffset % this.model.mItemHeight;
                if (scrollOffset > 1) {
                    if (this.lastAreaPosition <= 0) { // 小于0，向下滑动，大于0是，是向上滑动
                        this.scrollerArea.scrollTo({
                            xOffset: 0,
                            yOffset: this.scrollerArea.currentOffset().yOffset - scrollOffset,
                            animation: { duration: 100, curve: Curve.Ease }
                        });
                        this.scrollerAreaIndex = (this.scrollerArea.currentOffset()
                            .yOffset - scrollOffset) / this.model.mItemHeight;
                    }
                    else {
                        this.scrollerArea.scrollTo({
                            xOffset: 0,
                            yOffset: this.scrollerArea.currentOffset().yOffset + this.model.mItemHeight - scrollOffset,
                            animation: { duration: 100, curve: Curve.Ease }
                        });
                        this.scrollerAreaIndex = (this.scrollerArea.currentOffset()
                            .yOffset - scrollOffset) / this.model.mItemHeight + 1;
                    }
                    this.model.mProvinceName = this.provinceArray[this.scrollerProvinceIndex].provinceName;
                    this.model.mCityName = this.cityAndAreaState[this.scrollerCityIndex].cityName;
                    this.model.mAreaName = this.AreaArrayState[this.scrollerAreaIndex];
                }
            });
            Scroll.onScrollEdge((side: Edge) => {
                this.scrollerAreaIndex = this.scrollerArea.currentOffset().yOffset / this.model.mItemHeight;
            });
            Column.create();
            Column.width('100%');
            Column.alignItems(this.model.mAlign);
            ForEach.create("10", this, ObservedObject.GetRawObject(Array.from(new Array(this.model.mHalfItemCount).keys())), (item: number) => {
                Text.create("");
                Text.fontSize(this.model.mItemTextSize);
                Text.height(this.model.mItemHeight);
                Text.padding(this.model.mSpace);
                Text.pop();
            }, (item: string) => item);
            ForEach.pop();
            ForEach.create("11", this, ObservedObject.GetRawObject(this.AreaArrayState), (area: string) => {
                If.create();
                if (area.length > 5) { //长度超过5，设置更小字体
                    If.branchId(0);
                    Text.create(area);
                    Text.fontSize(this.model.mItemTextSize * 3 / 4);
                    Text.height(this.model.mItemHeight);
                    Text.fontColor(this.model.mItemTextColor);
                    Text.fontFamily(this.model.mFontFamily);
                    Text.padding(this.model.mSpace);
                    Text.pop();
                }
                else {
                    If.branchId(1);
                    Text.create(area);
                    Text.fontSize(this.model.mItemTextSize);
                    Text.height(this.model.mItemHeight);
                    Text.fontColor(this.model.mItemTextColor);
                    Text.fontFamily(this.model.mFontFamily);
                    Text.padding(this.model.mSpace);
                    Text.pop();
                }
                If.pop();
            }, (val: string) => val.toString());
            ForEach.pop();
            ForEach.create("12", this, ObservedObject.GetRawObject(Array.from(new Array(this.model.mHalfItemCount).keys())), (item: number) => {
                Text.create("");
                Text.fontSize(this.model.mItemTextSize);
                Text.height(this.model.mItemHeight);
                Text.padding(this.model.mSpace);
                Text.pop();
            }, (item: string) => item);
            ForEach.pop();
            Column.pop();
            Scroll.pop();
            If.create();
            if (this.model.hasIndicator) {
                If.branchId(0);
                Divider.create();
                Divider.offset({ x: 0, y: -this.model.mItemHeight / 2 });
                Divider.color(this.model.mIndicatorColor);
                Divider.width('100%');
                Divider.strokeWidth(this.model.mIndicatorSize);
                Divider.zIndex(2);
                Divider.create();
                Divider.offset({ x: 0, y: this.model.mItemHeight / 2 });
                Divider.color(this.model.mIndicatorColor);
                Divider.width('100%');
                Divider.strokeWidth(this.model.mIndicatorSize);
                Divider.zIndex(2);
            }
            If.pop();
            Column.create();
            Scroll.create(this.scroller3);
            Scroll.height(this.model.mItemHeight);
            Scroll.enabled(false);
            Scroll.backgroundColor('#E5DEEB');
            Scroll.scrollBar(BarState.Off);
            Column.create();
            Column.alignItems(this.model.mAlign);
            ForEach.create("13", this, ObservedObject.GetRawObject(this.AreaArrayState), (area: string) => {
                If.create();
                if (area.length > 5) { //长度超过5，设置更小字体
                    If.branchId(0);
                    Text.create(area);
                    Text.fontSize(this.model.mItemTextSize * 3 / 4);
                    Text.height(this.model.mItemHeight);
                    Text.fontColor(this.model.mSelectedItemTextColor);
                    Text.fontFamily(this.model.mFontFamily);
                    Text.padding(this.model.mSpace);
                    Text.pop();
                }
                else {
                    If.branchId(1);
                    Text.create(area);
                    Text.fontSize(this.model.mItemTextSize);
                    Text.height(this.model.mItemHeight);
                    Text.fontColor(this.model.mSelectedItemTextColor);
                    Text.fontFamily(this.model.mFontFamily);
                    Text.padding(this.model.mSpace);
                    Text.pop();
                }
                If.pop();
            }, (val: string) => val.toString());
            ForEach.pop();
            Column.pop();
            Scroll.pop();
            Column.pop();
            If.create();
            if (this.model.hasAtmospheric) {
                If.branchId(0);
                Flex.create();
                Flex.width('100%');
                Flex.height(this.model.mWheelHeight);
                Flex.touchable(false);
                Flex.linearGradient({
                    angle: 0,
                    direction: GradientDirection.Top,
                    colors: [['#ffE5DEEB', 0.0], ['#00E5DEEB', 0.5], ['#ffE5DEEB', 1.0]]
                });
                Flex.pop();
            }
            If.pop();
            If.create();
            if (this.model.hasCurtain) {
                If.branchId(0);
                Text.create();
                Text.width('100%');
                Text.height(this.model.mItemHeight);
                Text.opacity(0.5);
                Text.backgroundColor(this.model.mCurtainColor);
                Text.enabled(false);
                Text.pop();
            }
            If.pop();
            Stack.pop();
        }
        If.pop();
        Row.pop();
    }
}
namespace WheelAreaPicker {
    export class Model {
        computeEnd: boolean = false;
        mTextHeight: number = 30;
        mSpace: number = 8;
        mItemHeight: number = this.mTextHeight + 2 * this.mSpace;
        mVisibleItem: number = 9;
        mWheelHeight: number = this.mItemHeight * this.mVisibleItem;
        mCenterY: number = this.mWheelHeight / 2;
        mItemTextSize: number = 16;
        mItemTextColor: string = "#536D8A";
        mTextMaxHeight: number = 30;
        mSelectedItemTextColor: string = "#FAFAaa";
        mIndicatorSize: number = 2;
        mIndicatorColor: string = "red";
        mCurtainColor: string = "#FFFFFF";
        mHalfItemCount: number = 4;
        mFontFamily: string = '';
        hasIndicator: boolean = true;
        hasAtmospheric: boolean = true;
        hasCurtain: boolean = true;
        mFirstSelectPosition: number = 0;
        mSelectedItemPosition: number = 0;
        mAlign: HorizontalAlign = HorizontalAlign.Center;
        mHideArea: boolean = false;
        mProvinceName: string = '';
        mCityName: string = '';
        mAreaName: string = '';
        constructor() {
        }
        hideArea() {
            this.mHideArea = true;
        }
        setData(mData: string[]): Model {
            throw new Error("You can not invoke setData in WheelAreaPicker");
        }
        getProvince(): string {
            return this.mProvinceName;
        }
        getCity(): string {
            return this.mCityName;
        }
        getArea(): string {
            return this.mAreaName;
        }
        setSelectedItemPosition(FirstSelectPosition: number): Model {
            this.mFirstSelectPosition = FirstSelectPosition;
            return this;
        }
        getSelectedItemPosition(): number {
            return this.mFirstSelectPosition;
        }
        getCurrentItemPosition(): number {
            return this.mSelectedItemPosition;
        }
        setTextHeight(mTextHeight: number): Model {
            this.mTextHeight = mTextHeight;
            return this;
        }
        getTextHeight(mTextHeight: number): number {
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
            this.mCenterY = this.mWheelHeight / 2;
        }
        scrollInit(scroller: Scroller) {
            if (!this.computeEnd) {
                scroller.scrollTo({
                    xOffset: 0,
                    yOffset: this.mItemHeight * this.mFirstSelectPosition,
                    animation: { duration: 1, curve: Curve.Ease }
                });
                this.computeEnd = true;
            }
        }
    }
}
export default WheelAreaPicker;
