interface Records_Params {
    dietRecords?: Array<DietRecord>;
    dietStatisticsData?: Array<OneMealStatisticsInfo>;
    listenDataChange?: number;
}
interface NoRecord_Params {
}
interface DietDetails_Params {
    dietData?: Array<OneMealStatisticsInfo>;
    currentBreakpoint?: string;
}
interface MealCard_Params {
    mealInfo?: OneMealStatisticsInfo;
}
interface MealFoodDetail_Params {
    notifyDataChange?: number;
    shown?: boolean;
    translateX?: number;
    mealFoodInfo?: MealFoodInfo;
    panTranslateX?: number;
}
interface HeatHistogramContent_Params {
    legend?: HistogramLegend[];
}
interface NutritionHistogramContent_Params {
    legend?: HistogramLegend[];
}
interface Histogram_Params {
    dietData?: Array<OneMealStatisticsInfo>;
    content?: (item: OneMealStatisticsInfo) => void;
    legendComponent?: (item: HistogramLegend) => void;
    title?: string | Resource;
    legend?: HistogramLegend[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DietRecord_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import { OneMealStatisticsInfo, MealFoodInfo, DietRecord } from '../../model/DataModels';
import { statistics, updateDietWeight } from '../../model/DataUtil';
import { BreakPointType } from '../../common/BreakpointSystem';
import { CustomCounter } from './CustomCounter';
class HistogramLegend {
    public color: string;
    public value: Resource;
    constructor(color: string, value: Resource) {
        this.color = color;
        this.value = value;
    }
}
function GetColor(value: number): Resource {
    if (value / 1000 > 100) {
        return $r("app.color.theme_color_orange");
    }
    else {
        return $r("app.color.theme_color_green");
    }
}
class Histogram extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__dietData = this.initializeConsume("dietData", "dietData");
        this.content = undefined;
        this.legendComponent = undefined;
        this.title = '';
        this.legend = [];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Histogram_Params) {
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.legendComponent !== undefined) {
            this.legendComponent = params.legendComponent;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.legend !== undefined) {
            this.legend = params.legend;
        }
    }
    aboutToBeDeleted() {
        this.__dietData.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __dietData: SynchedPropertySimpleOneWay<Array<OneMealStatisticsInfo>>;
    get dietData() {
        return this.__dietData.get();
    }
    set dietData(newValue: Array<OneMealStatisticsInfo>) {
        this.__dietData.set(newValue);
    }
    private __content?;
    private __legendComponent?;
    private title: string | Resource;
    private legend: HistogramLegend[];
    render() {
        Column.create();
        Column.height('100%');
        Column.padding({ left: 32, right: 32 });
        Column.borderRadius(12);
        Column.backgroundColor('#FFFFFF');
        Text.create(this.title);
        Text.textAlign(TextAlign.Start);
        Text.fontSize(24);
        Text.fontColor('#000000');
        Text.fontFamily('HarmonyHeTi-Medium');
        Text.width('100%');
        Text.height(46);
        Text.pop();
        Stack.create({ alignContent: Alignment.Bottom });
        Stack.height(190);
        Column.create();
        Column.height('100%');
        Column.margin({ top: 20 });
        Column.justifyContent(FlexAlign.SpaceBetween);
        ForEach.create("2", this, ObservedObject.GetRawObject([0, 0, 0, 0, 0, 0]), (item: number) => {
            Divider.create();
            Divider.strokeWidth(1);
            Divider.color('#D8D8D8');
        });
        ForEach.pop();
        Column.pop();
        Column.create();
        Column.height(236);
        Flex.create({ direction: FlexDirection.Row, justifyContent: FlexAlign.SpaceEvenly, alignItems: ItemAlign.Start });
        ForEach.create("3", this, ObservedObject.GetRawObject(this.dietData), (item: OneMealStatisticsInfo) => {
            If.create();
            if (item.mealFoods.length > 1) {
                If.branchId(0);
                Column.create();
                Column.justifyContent(FlexAlign.End);
                Column.height('100%');
                If.create();
                if (this.content !== undefined) {
                    If.branchId(0);
                    this.content(item, this);
                }
                If.pop();
                Text.create(item.mealTime.name);
                Text.fontSize(14);
                Text.fontColor('#7E7E7E');
                Text.fontFamily('HarmonyHeTi');
                Text.margin({ top: 10 });
                Text.pop();
                Column.pop();
            }
            If.pop();
        });
        ForEach.pop();
        Flex.pop();
        Column.pop();
        Stack.pop();
        Row.create();
        Row.justifyContent(FlexAlign.SpaceEvenly);
        Row.width('100%');
        Row.margin({ top: 70 });
        ForEach.create("4", this, ObservedObject.GetRawObject(this.legend), (item: HistogramLegend) => {
            Row.create();
            Rect.create({ width: 9, height: 9, radius: 9 });
            Rect.fill(item.color);
            Rect.margin({ right: 18 });
            If.create();
            if (this.legendComponent !== undefined) {
                If.branchId(0);
                this.legendComponent(item, this);
            }
            If.pop();
            Row.pop();
        });
        ForEach.pop();
        Row.pop();
        Column.pop();
    }
}
class NutritionHistogramContent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.legend = [
            new HistogramLegend('#FFD339', $r("app.string.diet_record_fat")),
            new HistogramLegend('#FD9A42', $r("app.string.diet_record_protein")),
            new HistogramLegend('#73CD57', $r("app.string.diet_record_carbohydrates"))
        ];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: NutritionHistogramContent_Params) {
        if (params.legend !== undefined) {
            this.legend = params.legend;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private legend: HistogramLegend[];
    legendComponent(item: HistogramLegend, parent = null) {
        Text.create(item.value);
        Text.fontSize(12);
        Text.fontColor('#18181A');
        Text.fontFamily('HarmonyHeTi');
        Text.pop();
    }
    content(item: OneMealStatisticsInfo, parent = null) {
        Column.create();
        Column.clip(true);
        If.create();
        if (item.totalFat > 0) {
            If.branchId(0);
            Rect.create({ width: 14, height: item.totalFat / 200 + 14, radius: 7 });
            Rect.fill('#FD9A42');
            Rect.padding({ top: 14 });
            Rect.margin({ bottom: -28 });
        }
        If.pop();
        If.create();
        if (item.totalProtein > 0) {
            If.branchId(0);
            Rect.create({ width: 14, height: item.totalProtein / 200 + 14, radius: 7 });
            Rect.fill('#FBD44E');
            Rect.padding({ top: 14 });
            Rect.margin({ bottom: -21 });
        }
        If.pop();
        If.create();
        if (item.totalCarbohydrates > 0) {
            If.branchId(0);
            Rect.create({ width: 14, height: item.totalCarbohydrates / 200 + 14, radius: 7 });
            Rect.fill('#73CD57');
            Rect.padding({ top: 7 });
            Rect.margin({ bottom: -7 });
        }
        If.pop();
        Column.pop();
    }
    render() {
        Row.create();
        let earlierCreatedChild_5: Histogram = (this && this.findChildById) ? this.findChildById("5") as Histogram : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new Histogram("5", this, {
                title: $r("app.string.nutrition_element"),
                content: this.content,
                legend: this.legend,
                legendComponent: this.legendComponent
            }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                title: $r("app.string.nutrition_element"),
                content: this.content,
                legend: this.legend,
                legendComponent: this.legendComponent
            });
            View.create(earlierCreatedChild_5);
        }
        Row.pop();
    }
}
class HeatHistogramContent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.legend = [
            new HistogramLegend('#FD9A42', $r("app.string.high_calorie")),
            new HistogramLegend('#73CD57', $r("app.string.medium_low_calories")),
        ];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: HeatHistogramContent_Params) {
        if (params.legend !== undefined) {
            this.legend = params.legend;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private legend: HistogramLegend[];
    legendComponent(item: HistogramLegend, parent = null) {
        Text.create(item.value);
        Text.fontSize(12);
        Text.fontColor('#18181A');
        Text.fontFamily('HarmonyHeTi');
        Text.pop();
    }
    content(item: OneMealStatisticsInfo, parent = null) {
        Column.create();
        Column.clip(true);
        Rect.create({ width: 14, height: item.totalCalories / 1000 + 14, radius: 14 });
        Rect.fill(GetColor(item.totalCalories));
        Rect.padding({ top: 7 });
        Rect.margin({ bottom: -7 });
        Column.pop();
    }
    render() {
        Row.create();
        let earlierCreatedChild_6: Histogram = (this && this.findChildById) ? this.findChildById("6") as Histogram : undefined;
        if (earlierCreatedChild_6 == undefined) {
            View.create(new Histogram("6", this, {
                title: $r("app.string.diet_record_calorie"),
                content: this.content,
                legend: this.legend,
                legendComponent: this.legendComponent
            }));
        }
        else {
            earlierCreatedChild_6.updateWithValueParams({
                title: $r("app.string.diet_record_calorie"),
                content: this.content,
                legend: this.legend,
                legendComponent: this.legendComponent
            });
            View.create(earlierCreatedChild_6);
        }
        Row.pop();
    }
}
class MealFoodDetail extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__notifyDataChange = this.initializeConsume("dataChange", "notifyDataChange");
        this.__shown = new ObservedPropertySimple(true, this, "shown");
        this.__translateX = new ObservedPropertySimple(0, this, "translateX");
        this.mealFoodInfo = undefined;
        this.panTranslateX = 300;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MealFoodDetail_Params) {
        if (params.shown !== undefined) {
            this.shown = params.shown;
        }
        if (params.translateX !== undefined) {
            this.translateX = params.translateX;
        }
        if (params.mealFoodInfo !== undefined) {
            this.mealFoodInfo = params.mealFoodInfo;
        }
        if (params.panTranslateX !== undefined) {
            this.panTranslateX = params.panTranslateX;
        }
    }
    aboutToBeDeleted() {
        this.__notifyDataChange.aboutToBeDeleted();
        this.__shown.aboutToBeDeleted();
        this.__translateX.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __notifyDataChange: SynchedPropertySimpleTwoWay<number>;
    get notifyDataChange() {
        return this.__notifyDataChange.get();
    }
    set notifyDataChange(newValue: number) {
        this.__notifyDataChange.set(newValue);
    }
    private __shown: ObservedPropertySimple<boolean>;
    get shown() {
        return this.__shown.get();
    }
    set shown(newValue: boolean) {
        this.__shown.set(newValue);
    }
    private __translateX: ObservedPropertySimple<number>;
    get translateX() {
        return this.__translateX.get();
    }
    set translateX(newValue: number) {
        this.__translateX.set(newValue);
    }
    private mealFoodInfo?: MealFoodInfo;
    private panTranslateX: number;
    render() {
        If.create();
        if (this.shown) {
            If.branchId(0);
            If.create();
            if (this.mealFoodInfo !== undefined && this.mealFoodInfo.weight != 0) {
                If.branchId(0);
                Row.create();
                Row.transition({ type: TransitionType.Delete, translate: { x: -350, y: 0 }, opacity: 0 });
                Row.translate({ x: this.translateX });
                Row.width('100%');
                Row.height(70);
                Gesture.create(GesturePriority.Low);
                PanGesture.create();
                PanGesture.onActionUpdate((event?: GestureEvent) => {
                    if (event && event.offsetX < 0) {
                        if (event.offsetX < -100) {
                            this.translateX = (event.offsetX * Math.exp(-1.848)) - 100;
                        }
                        else {
                            this.translateX = event.offsetX;
                        }
                    }
                });
                PanGesture.pop();
                Gesture.pop();
                Row.create();
                Row.width('100%');
                Image.create(this.mealFoodInfo.image);
                Image.width(50);
                Image.height(50);
                Column.create();
                Column.alignItems(HorizontalAlign.Start);
                Text.create(this.mealFoodInfo.name);
                Text.fontSize(16);
                Text.fontColor('#444444');
                Text.fontFamily('HarmonyHeTi');
                Text.margin({ bottom: 4 });
                Text.pop();
                Text.create($r('app.string.calorie_with_kcal_unit', (this.mealFoodInfo.calories / 100).toString()));
                Text.fontSize(11);
                Text.fontColor('#A3A3A3');
                Text.fontFamily('HarmonyHeTi');
                Text.pop();
                Column.pop();
                Blank.create();
                Blank.pop();
                let earlierCreatedChild_7: CustomCounter = (this && this.findChildById) ? this.findChildById("7") as CustomCounter : undefined;
                if (earlierCreatedChild_7 == undefined) {
                    View.create(new CustomCounter("7", this, {
                        //              value: this.mealFoodInfo.weight + 'g',
                        value: this.mealFoodInfo.weight + 'g',
                        onDec: () => {
                            if (this.mealFoodInfo !== undefined && this.mealFoodInfo.weight > 0) {
                                this.mealFoodInfo.weight -= 50;
                                updateDietWeight(this.mealFoodInfo.recordId, this.mealFoodInfo.weight);
                                this.notifyDataChange++;
                            }
                        },
                        onInc: () => {
                            if (this.mealFoodInfo !== undefined) {
                                this.mealFoodInfo.weight += 50;
                                updateDietWeight(this.mealFoodInfo.recordId, this.mealFoodInfo.weight);
                                this.notifyDataChange++;
                            }
                        }
                    }));
                }
                else {
                    earlierCreatedChild_7.updateWithValueParams({
                        //              value: this.mealFoodInfo.weight + 'g',
                        value: this.mealFoodInfo.weight + 'g',
                        onDec: () => {
                            if (this.mealFoodInfo !== undefined && this.mealFoodInfo.weight > 0) {
                                this.mealFoodInfo.weight -= 50;
                                updateDietWeight(this.mealFoodInfo.recordId, this.mealFoodInfo.weight);
                                this.notifyDataChange++;
                            }
                        },
                        onInc: () => {
                            if (this.mealFoodInfo !== undefined) {
                                this.mealFoodInfo.weight += 50;
                                updateDietWeight(this.mealFoodInfo.recordId, this.mealFoodInfo.weight);
                                this.notifyDataChange++;
                            }
                        }
                    });
                    View.create(earlierCreatedChild_7);
                }
                Row.pop();
                Image.create($r("app.media.ic_public_delete"));
                Image.backgroundColor('#E84026');
                Image.objectFit(ImageFit.ScaleDown);
                Image.borderRadius(20);
                Image.margin({ left: 50 });
                Image.size({ width: 40, height: 40 });
                Image.onClick(() => {
                    Context.animateTo({ duration: 400 }, () => {
                        this.shown = false;
                        let dietRecords = AppStorage.Get<Array<DietRecord>>('dietRecords');
                        if (dietRecords !== undefined && this.mealFoodInfo !== undefined) {
                            let index = dietRecords.findIndex((item) => {
                                return item.foodId == this.mealFoodInfo!.foodId;
                            });
                            dietRecords[index].weight = 0;
                            AppStorage.SetOrCreate<Array<DietRecord>>('dietRecords', dietRecords);
                        }
                    });
                });
                Row.pop();
            }
            If.pop();
        }
        If.pop();
    }
}
class MealCard extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__mealInfo = new SynchedPropertyNesedObject(params.mealInfo, this, "mealInfo");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MealCard_Params) {
        this.__mealInfo.set(params.mealInfo);
    }
    aboutToBeDeleted() {
        this.__mealInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __mealInfo: SynchedPropertyNesedObject<OneMealStatisticsInfo>;
    get mealInfo() {
        return this.__mealInfo.get();
    }
    render() {
        Column.create();
        Column.backgroundColor(Color.White);
        Column.borderRadius(12);
        Column.padding({ left: 16, right: 16 });
        Column.margin(12);
        If.create();
        if (this.mealInfo.mealFoods.length > 1) {
            If.branchId(0);
            Text.create(this.mealInfo.mealTime.name);
            Text.fontSize(24);
            Text.fontFamily('HarmonyHeTi-Medium');
            Text.height(56);
            Text.width('100%');
            Text.backgroundColor('#FFFFFF');
            Text.padding({ left: 16, right: 16 });
            Text.pop();
            ForEach.create("9", this, ObservedObject.GetRawObject(this.mealInfo.mealFoods), (mealItem: MealFoodInfo) => {
                let earlierCreatedChild_8: MealFoodDetail = (this && this.findChildById) ? this.findChildById("8") as MealFoodDetail : undefined;
                if (earlierCreatedChild_8 == undefined) {
                    View.create(new MealFoodDetail("8", this, { mealFoodInfo: mealItem }));
                }
                else {
                    earlierCreatedChild_8.updateWithValueParams({
                        mealFoodInfo: mealItem
                    });
                    View.create(earlierCreatedChild_8);
                }
            });
            ForEach.pop();
        }
        If.pop();
        Column.pop();
    }
}
class DietDetails extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__dietData = this.initializeConsume("dietData", "dietData");
        this.__currentBreakpoint = AppStorage.SetAndProp('currentBreakpoint', 'sm', this, "currentBreakpoint");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DietDetails_Params) {
    }
    aboutToBeDeleted() {
        this.__dietData.aboutToBeDeleted();
        this.__currentBreakpoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __dietData: SynchedPropertySimpleOneWay<Array<OneMealStatisticsInfo>>;
    get dietData() {
        return this.__dietData.get();
    }
    set dietData(newValue: Array<OneMealStatisticsInfo>) {
        this.__dietData.set(newValue);
    }
    private __currentBreakpoint: ObservedPropertyAbstract<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    render() {
        Scroll.create();
        Scroll.backgroundColor('#EDF2F5');
        Column.create();
        Swiper.create();
        Swiper.itemSpace(12);
        Swiper.height(400);
        Swiper.width('100%');
        Swiper.indicatorStyle({ selectedColor: $r('app.color.theme_color_green') });
        Swiper.indicator(new BreakPointType({ sm: true, md: false, lg: false }).getValue(this.currentBreakpoint) as boolean);
        Swiper.displayCount(new BreakPointType({ sm: 1, md: 2, lg: 2 }).getValue(this.currentBreakpoint) as number);
        let earlierCreatedChild_10: HeatHistogramContent = (this && this.findChildById) ? this.findChildById("10") as HeatHistogramContent : undefined;
        if (earlierCreatedChild_10 == undefined) {
            View.create(new HeatHistogramContent("10", this, {}));
        }
        else {
            earlierCreatedChild_10.updateWithValueParams({});
            if (!earlierCreatedChild_10.needsUpdate()) {
                earlierCreatedChild_10.markStatic();
            }
            View.create(earlierCreatedChild_10);
        }
        let earlierCreatedChild_11: NutritionHistogramContent = (this && this.findChildById) ? this.findChildById("11") as NutritionHistogramContent : undefined;
        if (earlierCreatedChild_11 == undefined) {
            View.create(new NutritionHistogramContent("11", this, {}));
        }
        else {
            earlierCreatedChild_11.updateWithValueParams({});
            if (!earlierCreatedChild_11.needsUpdate()) {
                earlierCreatedChild_11.markStatic();
            }
            View.create(earlierCreatedChild_11);
        }
        Swiper.pop();
        ForEach.create("13", this, ObservedObject.GetRawObject(this.dietData), (item: OneMealStatisticsInfo) => {
            let earlierCreatedChild_12: MealCard = (this && this.findChildById) ? this.findChildById("12") as MealCard : undefined;
            if (earlierCreatedChild_12 == undefined) {
                View.create(new MealCard("12", this, { mealInfo: item }));
            }
            else {
                earlierCreatedChild_12.updateWithValueParams({
                    mealInfo: item
                });
                View.create(earlierCreatedChild_12);
            }
        });
        ForEach.pop();
        Column.pop();
        Scroll.pop();
    }
}
class NoRecord extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: NoRecord_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start });
        Flex.width('100%');
        Text.create($r("app.string.title_record"));
        Text.fontSize(26);
        Text.padding({ left: 26, top: 12 });
        Text.pop();
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Image.create($r("app.media.norecord"));
        Image.height(130);
        Image.width(130);
        Text.create($r("app.string.no_record_content"));
        Text.fontSize(15);
        Text.fontColor('rgba(0, 0,0,0.4)');
        Text.pop();
        Flex.pop();
        Flex.pop();
    }
}
export class Records extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__dietRecords = AppStorage.SetAndLink('dietRecords', [], this, "dietRecords");
        this.__dietStatisticsData = new ObservedPropertyObject([], this, "dietStatisticsData");
        this.addProvidedVar("dietData", this.__dietStatisticsData, false);
        this.addProvidedVar("dietStatisticsData", this.__dietStatisticsData, false);
        this.__listenDataChange = new ObservedPropertySimple(0, this, "listenDataChange");
        this.addProvidedVar("dataChange", this.__listenDataChange, false);
        this.addProvidedVar("listenDataChange", this.__listenDataChange, false);
        this.updateWithValueParams(params);
        this.declareWatch("dietRecords", this.onDataChange);
        this.declareWatch("listenDataChange", this.onDataChange);
    }
    updateWithValueParams(params: Records_Params) {
        if (params.dietStatisticsData !== undefined) {
            this.dietStatisticsData = params.dietStatisticsData;
        }
        if (params.listenDataChange !== undefined) {
            this.listenDataChange = params.listenDataChange;
        }
    }
    aboutToBeDeleted() {
        this.__dietRecords.aboutToBeDeleted();
        this.__dietStatisticsData.aboutToBeDeleted();
        this.__listenDataChange.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __dietRecords: ObservedPropertyAbstract<Array<DietRecord>>;
    get dietRecords() {
        return this.__dietRecords.get();
    }
    set dietRecords(newValue: Array<DietRecord>) {
        this.__dietRecords.set(newValue);
    }
    private __dietStatisticsData: ObservedPropertyObject<Array<OneMealStatisticsInfo>>;
    get dietStatisticsData() {
        return this.__dietStatisticsData.get();
    }
    set dietStatisticsData(newValue: Array<OneMealStatisticsInfo>) {
        this.__dietStatisticsData.set(newValue);
    }
    private __listenDataChange: ObservedPropertySimple<number>;
    get listenDataChange() {
        return this.__listenDataChange.get();
    }
    set listenDataChange(newValue: number) {
        this.__listenDataChange.set(newValue);
    }
    onDataChange() {
        console.log('onDataChange');
        this.dietStatisticsData = statistics();
    }
    aboutToAppear() {
        this.dietStatisticsData = statistics();
    }
    render() {
        Column.create();
        If.create();
        if (this.dietStatisticsData.length === 0) {
            If.branchId(0);
            let earlierCreatedChild_14: NoRecord = (this && this.findChildById) ? this.findChildById("14") as NoRecord : undefined;
            if (earlierCreatedChild_14 == undefined) {
                View.create(new NoRecord("14", this, {}));
            }
            else {
                earlierCreatedChild_14.updateWithValueParams({});
                if (!earlierCreatedChild_14.needsUpdate()) {
                    earlierCreatedChild_14.markStatic();
                }
                View.create(earlierCreatedChild_14);
            }
        }
        else {
            If.branchId(1);
            let earlierCreatedChild_15: DietDetails = (this && this.findChildById) ? this.findChildById("15") as DietDetails : undefined;
            if (earlierCreatedChild_15 == undefined) {
                View.create(new DietDetails("15", this, {}));
            }
            else {
                earlierCreatedChild_15.updateWithValueParams({});
                View.create(earlierCreatedChild_15);
            }
        }
        If.pop();
        Column.pop();
    }
}
loadDocument(new Records("1", undefined, {}));
