interface FoodDetail_Params {
    currentBreakpoint?: string;
    foodInfo?: FoodInfo;
    nutritionElements?: NutritionElement[] | undefined;
    dialogController?: CustomDialogController;
}
interface Record_Params {
    foodInfo?: FoodInfo;
    controller?: CustomDialogController;
    select?: number;
    mileTime?: string[];
    foodWeight?: string[];
    mealTimeId?: MealTimeId;
    mealWeight?: number;
}
interface NutritionPercent_Params {
    foodInfo?: FoodInfo;
    nutritionElements?: NutritionElement[];
}
interface NutritionPieChart_Params {
    foodInfo?: FoodInfo | null;
    nutritionElements?: NutritionElement[];
    settings?: RenderingContextSettings;
    context?: CanvasRenderingContext2D;
}
interface CaloriesProgress_Params {
    foodInfo?: FoodInfo;
    averageCalories?: number;
    totalCalories?: number;
    highCalories?: boolean;
}
interface ContentTable_Params {
    foodInfo?: FoodInfo;
}
interface FoodImageDisplay_Params {
    foodInfo?: FoodInfo;
    imageBgColorA?: number;
    currentBreakpoint?: string;
}
interface PageTitle_Params {
    foodName?: Resource;
}
interface CardTitle_Params {
    title?: string | Resource | undefined;
    subtitle?: string | Resource | undefined;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "FoodDetail_" + ++__generate__Id;
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
import curves from '@ohos.curves';
import router from '@ohos.router';
import { CIRCLE_RADIUS } from '../common/Constants';
import { BreakPointType } from '../common/BreakpointSystem';
import { FoodInfo, CategoryId, MealTime, MealTimeId, DietRecord } from '../model/DataModels';
import { getFoodInfo, initDietRecords, getMileTimes } from '../model/DataUtil';
class CardTitle extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.title = '';
        this.subtitle = '';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CardTitle_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.subtitle !== undefined) {
            this.subtitle = params.subtitle;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private title: string | Resource | undefined;
    private subtitle: string | Resource | undefined;
    render() {
        Row.create();
        Row.width('100%');
        Row.height(26);
        Text.create(this.title);
        Text.fontSize(26);
        Text.pop();
        Blank.create();
        Blank.pop();
        Text.create(this.subtitle);
        Text.fontSize(13);
        Text.fontColor('rgba(0,0,0,0.6)');
        Text.pop();
        Row.pop();
    }
}
class PageTitle extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.foodName = $r('app.string.title_food_detail');
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PageTitle_Params) {
        if (params.foodName !== undefined) {
            this.foodName = params.foodName;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private foodName: Resource;
    render() {
        Row.create();
        Row.padding(12);
        Row.width('100%');
        Image.create($r('app.media.back'));
        Image.width(20);
        Image.height(20);
        Image.onClick(() => {
            router.back();
        });
        Text.create(this.foodName);
        Text.fontSize(22);
        Text.margin({ left: 20 });
        Text.pop();
        Row.pop();
    }
}
class FoodImageDisplay extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.foodInfo = new FoodInfo(0, '', '', null);
        this.__imageBgColorA = new ObservedPropertySimple(0, this, "imageBgColorA");
        this.__currentBreakpoint = AppStorage.SetAndProp('currentBreakpoint', 'sm', this, "currentBreakpoint");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: FoodImageDisplay_Params) {
        if (params.foodInfo !== undefined) {
            this.foodInfo = params.foodInfo;
        }
        if (params.imageBgColorA !== undefined) {
            this.imageBgColorA = params.imageBgColorA;
        }
    }
    aboutToBeDeleted() {
        this.__imageBgColorA.aboutToBeDeleted();
        this.__currentBreakpoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private foodInfo: FoodInfo;
    private __imageBgColorA: ObservedPropertySimple<number>;
    get imageBgColorA() {
        return this.__imageBgColorA.get();
    }
    set imageBgColorA(newValue: number) {
        this.__imageBgColorA.set(newValue);
    }
    private __currentBreakpoint: ObservedPropertyAbstract<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    render() {
        Stack.create({ alignContent: Alignment.BottomStart });
        Stack.height(this.currentBreakpoint == 'lg' ? 166 : 280);
        Image.create(this.foodInfo.image!);
        Image.sharedTransition(this.foodInfo.letter, {
            duration: 400,
            curve: curves.cubicBezier(0.2, 0.2, 0.1, 1.0),
            delay: 100
        });
        Image.backgroundColor(`rgba(255, 255, 255, ${this.imageBgColorA})`);
        Image.objectFit(ImageFit.Contain);
        Text.create(this.foodInfo.name);
        Text.fontSize(26);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ left: 26, bottom: 18 });
        Text.pop();
        Stack.pop();
    }
}
class ContentTable extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.foodInfo = new FoodInfo(0, '', '', null);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ContentTable_Params) {
        if (params.foodInfo !== undefined) {
            this.foodInfo = params.foodInfo;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private foodInfo: FoodInfo;
    IngredientItem(title: string | Resource | undefined, colorValue: string, name: Resource, value: Resource, parent = null) {
        Row.create();
        Row.margin({ bottom: 20 });
        Text.create(title);
        Text.fontSize(18);
        Text.fontWeight(FontWeight.Bold);
        Text.layoutWeight(1);
        Text.align(Alignment.Start);
        Text.pop();
        Row.create();
        Row.width('100%');
        Row.layoutWeight(2);
        Circle.create({ width: 6, height: 6 });
        Circle.margin({ right: 12 });
        Circle.fill(colorValue);
        Text.create(name);
        Text.fontSize(18);
        Text.pop();
        Blank.create();
        Blank.pop();
        Text.create(value);
        Text.fontSize(18);
        Text.pop();
        Row.pop();
        Row.pop();
    }
    render() {
        Column.create();
        Column.height('100%');
        Column.padding({ top: 20, right: 20, left: 20 });
        Column.backgroundColor(Color.White);
        Column.borderRadius(12);
        this.IngredientItem($r('app.string.diet_record_calorie'), '#F54040', $r('app.string.diet_record_calorie'), $r('app.string.calorie_with_kcal_unit', this.foodInfo.calories.toString()), this);
        Row.create();
        Row.height(20);
        Row.pop();
        this.IngredientItem($r('app.string.nutrition_element'), '#CCC', $r('app.string.nutrition_element'), $r('app.string.weight_with_gram_unit', this.foodInfo.protein.toString()), this);
        this.IngredientItem('', '#F5D640', $r('app.string.diet_record_fat'), $r('app.string.weight_with_gram_unit', this.foodInfo.fat.toString()), this);
        this.IngredientItem('', '#9E9EFF', $r('app.string.diet_record_carbohydrates'), $r('app.string.weight_with_gram_unit', this.foodInfo.carbohydrates.toString()), this);
        this.IngredientItem('', '#53F540', $r('app.string.diet_record_vitaminC'), $r('app.string.weight_with_milligram_unit', this.foodInfo.vitaminC.toString()), this);
        Column.pop();
    }
}
class CaloriesProgress extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.foodInfo = new FoodInfo(0, '', '', null);
        this.averageCalories = 0;
        this.totalCalories = 0;
        this.highCalories = false;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CaloriesProgress_Params) {
        if (params.foodInfo !== undefined) {
            this.foodInfo = params.foodInfo;
        }
        if (params.averageCalories !== undefined) {
            this.averageCalories = params.averageCalories;
        }
        if (params.totalCalories !== undefined) {
            this.totalCalories = params.totalCalories;
        }
        if (params.highCalories !== undefined) {
            this.highCalories = params.highCalories;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private foodInfo: FoodInfo;
    private averageCalories: number;
    private totalCalories: number;
    private highCalories: boolean;
    aboutToAppear() {
        switch (this.foodInfo.categoryId) {
            case CategoryId.Vegetable:
                this.averageCalories = 26;
                break;
            case CategoryId.Fruit:
                this.averageCalories = 60;
                break;
            case CategoryId.Nut:
                this.averageCalories = 606;
                break;
            case CategoryId.Seafood:
                this.averageCalories = 56;
                break;
            case CategoryId.Dessert:
                this.averageCalories = 365;
                break;
        }
        this.totalCalories = this.averageCalories * 2;
        this.highCalories = this.foodInfo.calories < this.averageCalories;
    }
    render() {
        Column.create();
        Column.height('100%');
        Column.padding({ top: 20, right: 20, left: 20 });
        Column.backgroundColor(Color.White);
        Column.borderRadius(12);
        let earlierCreatedChild_2: CardTitle = (this && this.findChildById) ? this.findChildById("2") as CardTitle : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new CardTitle("2", this, { title: $r('app.string.diet_record_calorie'), subtitle: $r('app.string.unit_weight') }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: $r('app.string.diet_record_calorie'), subtitle: $r('app.string.unit_weight')
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Row.create();
        Row.margin({ top: 25, bottom: 25 });
        Row.alignItems(VerticalAlign.Bottom);
        Text.create(this.foodInfo.calories.toString());
        Text.fontColor(this.getCalorieColor());
        Text.fontSize(65);
        Text.pop();
        Text.create($r('app.string.calorie_with_kcal_unit', ''));
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Row.pop();
        Text.create(this.highCalories ? $r('app.string.high_calorie_food') : $r('app.string.low_calorie_food'));
        Text.fontSize(13);
        Text.fontColor('#313131');
        Text.pop();
        Progress.create({ value: this.foodInfo.calories, total: this.totalCalories, style: ProgressStyle.Linear });
        Progress.style({ strokeWidth: 24 });
        Progress.color(this.getCalorieColor());
        Progress.margin({ top: 18 });
        Column.pop();
    }
    getCalorieColor() {
        return this.highCalories ? $r('app.color.high_calorie') : $r('app.color.low_calorie');
    }
}
class NutritionElement {
    element: string | Resource | undefined = '';
    weight: number = 0;
    percent: number = 0;
    beginAngle: number = 0;
    endAngle: number = 0;
    color: string = '';
    constructor(element: Resource, weight: number, color: string) {
        this.element = element;
        this.weight = weight;
        this.color = color;
    }
}
class NutritionPieChart extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.foodInfo = null;
        this.nutritionElements = [];
        this.settings = new RenderingContextSettings(true);
        this.context = new CanvasRenderingContext2D(this.settings);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: NutritionPieChart_Params) {
        if (params.foodInfo !== undefined) {
            this.foodInfo = params.foodInfo;
        }
        if (params.nutritionElements !== undefined) {
            this.nutritionElements = params.nutritionElements;
        }
        if (params.settings !== undefined) {
            this.settings = params.settings;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private foodInfo: FoodInfo | null;
    private nutritionElements: NutritionElement[];
    private settings: RenderingContextSettings;
    private context: CanvasRenderingContext2D;
    render() {
        Column.create();
        Column.height('100%');
        Column.padding({ top: 20, right: 20, left: 20 });
        Column.backgroundColor(Color.White);
        Column.borderRadius(12);
        let earlierCreatedChild_3: CardTitle = (this && this.findChildById) ? this.findChildById("3") as CardTitle : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new CardTitle("3", this, { title: $r('app.string.nutrition_element'), subtitle: $r('app.string.unit_weight') }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                title: $r('app.string.nutrition_element'), subtitle: $r('app.string.unit_weight')
            });
            if (!earlierCreatedChild_3.needsUpdate()) {
                earlierCreatedChild_3.markStatic();
            }
            View.create(earlierCreatedChild_3);
        }
        Canvas.create(this.context);
        Canvas.height(CIRCLE_RADIUS * 2);
        Canvas.aspectRatio(1);
        Canvas.margin({ top: 30, bottom: 32 });
        Canvas.onReady(() => {
            this.nutritionElements.forEach((item) => {
                this.context.beginPath();
                this.context.moveTo(CIRCLE_RADIUS, CIRCLE_RADIUS);
                this.context.arc(CIRCLE_RADIUS, CIRCLE_RADIUS, CIRCLE_RADIUS, item.beginAngle, item.endAngle);
                this.context.fillStyle = item.color;
                this.context.fill();
            });
        });
        Canvas.pop();
        Row.create();
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceAround);
        ForEach.create("4", this, ObservedObject.GetRawObject(this.nutritionElements), (item: NutritionElement) => {
            Row.create({ space: 4 });
            Circle.create({ width: 8, height: 8 });
            Circle.fill(item.color);
            Text.create(item.element);
            Text.fontSize(12);
            Text.pop();
            Text.create($r('app.string.weight_with_gram_unit', item.weight.toString()));
            Text.fontSize(12);
            Text.pop();
            Row.pop();
        });
        ForEach.pop();
        Row.pop();
        Column.pop();
    }
}
class NutritionPercent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.foodInfo = new FoodInfo(0, '', '', null);
        this.nutritionElements = [new NutritionElement($r('app.string.nutrition_element'), 0, '')];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: NutritionPercent_Params) {
        if (params.foodInfo !== undefined) {
            this.foodInfo = params.foodInfo;
        }
        if (params.nutritionElements !== undefined) {
            this.nutritionElements = params.nutritionElements;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private foodInfo: FoodInfo;
    private nutritionElements: NutritionElement[];
    render() {
        Column.create();
        Column.height('100%');
        Column.padding({ top: 20, right: 20, left: 20 });
        Column.backgroundColor(Color.White);
        Column.borderRadius(12);
        let earlierCreatedChild_5: CardTitle = (this && this.findChildById) ? this.findChildById("5") as CardTitle : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new CardTitle("5", this, { title: $r('app.string.nutrition_element'), subtitle: $r('app.string.unit_weight') }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                title: $r('app.string.nutrition_element'), subtitle: $r('app.string.unit_weight')
            });
            if (!earlierCreatedChild_5.needsUpdate()) {
                earlierCreatedChild_5.markStatic();
            }
            View.create(earlierCreatedChild_5);
        }
        Row.create();
        Row.width('100%');
        Row.margin({ top: 50 });
        ForEach.create("6", this, ObservedObject.GetRawObject(this.nutritionElements), (item: NutritionElement) => {
            Column.create();
            Column.layoutWeight(1);
            Stack.create({ alignContent: Alignment.Center });
            Progress.create({ value: item.percent, type: ProgressType.Ring });
            Progress.style({ strokeWidth: 10 });
            Progress.color(item.color);
            Progress.margin(4);
            Text.create(item.percent + '%');
            Text.fontSize(17);
            Text.pop();
            Stack.pop();
            Text.create(item.element);
            Text.fontSize(13);
            Text.margin({ top: 24 });
            Text.pop();
            Text.create($r('app.string.weight_with_gram_unit', item.weight.toString()));
            Text.fontSize(13);
            Text.pop();
            Column.pop();
        });
        ForEach.pop();
        Row.pop();
        Column.pop();
    }
}
class Record extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.foodInfo = new FoodInfo(0, '', '', null);
        this.controller = undefined;
        this.select = 1;
        this.mileTime = getMileTimes();
        this.foodWeight = ['25', '50', '100', '150', '200', '250', '300', '350', '400', '450', '500'];
        this.mealTimeId = MealTimeId.Lunch;
        this.mealWeight = Number(this.foodWeight[this.select]);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Record_Params) {
        if (params.foodInfo !== undefined) {
            this.foodInfo = params.foodInfo;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.select !== undefined) {
            this.select = params.select;
        }
        if (params.mileTime !== undefined) {
            this.mileTime = params.mileTime;
        }
        if (params.foodWeight !== undefined) {
            this.foodWeight = params.foodWeight;
        }
        if (params.mealTimeId !== undefined) {
            this.mealTimeId = params.mealTimeId;
        }
        if (params.mealWeight !== undefined) {
            this.mealWeight = params.mealWeight;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private foodInfo: FoodInfo;
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private select: number;
    private mileTime: string[];
    private foodWeight: string[];
    private mealTimeId: MealTimeId;
    private mealWeight: number;
    render() {
        Column.create();
        Column.height('100%');
        Column.padding({ top: 20, right: 20, left: 20 });
        Column.backgroundColor(Color.White);
        Column.borderRadius(12);
        Column.height(254);
        Column.width('90%');
        Row.create({ space: 6 });
        Row.height(128);
        Column.create();
        Column.layoutWeight(1);
        Column.justifyContent(FlexAlign.Center);
        Text.create(this.foodInfo.name);
        Text.minFontSize(18);
        Text.maxFontSize(30);
        Text.maxLines(1);
        Text.pop();
        Text.create($r('app.string.calorie_with_kcal_unit', this.foodInfo.calories.toString()));
        Text.fontSize(16);
        Text.fontColor('rgba(0,0,0,0.4)');
        Text.margin({ top: 2 });
        Text.pop();
        Column.pop();
        TextPicker.create({ range: this.mileTime, selected: this.select });
        TextPicker.height('100%');
        TextPicker.layoutWeight(1);
        TextPicker.linearGradient({
            angle: 0,
            direction: GradientDirection.Top,
            colors: [[0xfdfdfd, 0.0], [0xe0e0e0, 0.5], [0xfdfdfd, 1]],
        });
        TextPicker.onChange((value: string | string[], index: number | number[]) => {
            this.mealTimeId = index as number;
        });
        TextPicker.pop();
        TextPicker.create({ range: this.foodWeight, selected: this.select });
        TextPicker.height('100%');
        TextPicker.layoutWeight(1);
        TextPicker.linearGradient({
            angle: 0,
            direction: GradientDirection.Top,
            colors: [[0xfdfdfd, 0.0], [0xe0e0e0, 0.5], [0xfdfdfd, 1]],
        });
        TextPicker.onChange((value: string | string[], index: number | number[]) => {
            this.mealWeight = Number(value);
        });
        TextPicker.pop();
        Row.pop();
        Button.createWithLabel($r('app.string.button_food_detail_complete'), { type: ButtonType.Capsule, stateEffect: true });
        Button.height(43);
        Button.width('100%');
        Button.margin({ top: 33, left: 72, right: 72 });
        Button.backgroundColor($r('app.color.theme_color_green'));
        Button.onClick(() => {
            let dietRecordsList = AppStorage.Get<Array<DietRecord>>('dietRecords');
            if (dietRecordsList == undefined || dietRecordsList.length === 0) {
                dietRecordsList = initDietRecords;
            }
            let dietRecordData = new DietRecord(dietRecordsList.length, this.foodInfo.id, new MealTime(this.mealTimeId), this.mealWeight);
            dietRecordsList.push(dietRecordData);
            AppStorage.SetOrCreate<Array<DietRecord>>('dietRecords', dietRecordsList);
            if (this.controller !== undefined) {
                this.controller.close();
            }
        });
        Button.pop();
        Column.pop();
    }
}
class FoodDetail extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentBreakpoint = AppStorage.SetAndProp('currentBreakpoint', 'sm', this, "currentBreakpoint");
        this.foodInfo = getFoodInfo();
        this.nutritionElements = undefined;
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new Record("13", this, { foodInfo: this.foodInfo });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            autoCancel: true,
            alignment: DialogAlignment.Bottom,
            offset: { dx: 0, dy: -20 },
            customStyle: true
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: FoodDetail_Params) {
        if (params.foodInfo !== undefined) {
            this.foodInfo = params.foodInfo;
        }
        if (params.nutritionElements !== undefined) {
            this.nutritionElements = params.nutritionElements;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentBreakpoint: ObservedPropertyAbstract<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    private foodInfo: FoodInfo;
    private nutritionElements: NutritionElement[] | undefined;
    private dialogController: CustomDialogController;
    aboutToAppear() {
        let total = this.foodInfo.protein + this.foodInfo.fat + this.foodInfo.carbohydrates;
        this.nutritionElements = [
            new NutritionElement($r('app.string.diet_record_protein'), this.foodInfo.protein, '#ff9421'),
            new NutritionElement($r('app.string.diet_record_fat'), this.foodInfo.fat, '#ffd100'),
            new NutritionElement($r('app.string.diet_record_carbohydrates'), this.foodInfo.carbohydrates, '#4cd041')
        ];
        let lastEndAngle = -0.5 * Math.PI;
        this.nutritionElements.forEach((value) => {
            let percent = value.weight / total;
            value.percent = Math.round(percent * 100);
            value.beginAngle = lastEndAngle;
            value.endAngle = (percent * 2 * Math.PI) + lastEndAngle;
            lastEndAngle = value.endAngle;
            return value;
        });
    }
    render() {
        Scroll.create();
        Scroll.backgroundColor('#EDF2F5');
        Scroll.height('100%');
        Scroll.align(Alignment.Top);
        Column.create();
        Column.alignItems(HorizontalAlign.Center);
        let earlierCreatedChild_7: PageTitle = (this && this.findChildById) ? this.findChildById("7") as PageTitle : undefined;
        if (earlierCreatedChild_7 == undefined) {
            View.create(new PageTitle("7", this, {}));
        }
        else {
            earlierCreatedChild_7.updateWithValueParams({});
            if (!earlierCreatedChild_7.needsUpdate()) {
                earlierCreatedChild_7.markStatic();
            }
            View.create(earlierCreatedChild_7);
        }
        let earlierCreatedChild_8: FoodImageDisplay = (this && this.findChildById) ? this.findChildById("8") as FoodImageDisplay : undefined;
        if (earlierCreatedChild_8 == undefined) {
            View.create(new FoodImageDisplay("8", this, { foodInfo: this.foodInfo }));
        }
        else {
            earlierCreatedChild_8.updateWithValueParams({
                foodInfo: this.foodInfo
            });
            View.create(earlierCreatedChild_8);
        }
        Swiper.create();
        Swiper.indicator(new BreakPointType({ sm: true, md: false, lg: false }).getValue(this.currentBreakpoint) as boolean);
        Swiper.displayCount(new BreakPointType({ sm: 1, md: 2, lg: 3 }).getValue(this.currentBreakpoint) as number);
        Swiper.clip(new Rect().width('100%').height('100%').radiusWidth(15).radiusHeight(15));
        Swiper.itemSpace(20);
        Swiper.height(330);
        Swiper.indicatorStyle({ selectedColor: $r('app.color.theme_color_green') });
        Swiper.margin({ top: 10, right: 10, left: 10 });
        let earlierCreatedChild_9: ContentTable = (this && this.findChildById) ? this.findChildById("9") as ContentTable : undefined;
        if (earlierCreatedChild_9 == undefined) {
            View.create(new ContentTable("9", this, { foodInfo: this.foodInfo }));
        }
        else {
            earlierCreatedChild_9.updateWithValueParams({
                foodInfo: this.foodInfo
            });
            if (!earlierCreatedChild_9.needsUpdate()) {
                earlierCreatedChild_9.markStatic();
            }
            View.create(earlierCreatedChild_9);
        }
        let earlierCreatedChild_10: CaloriesProgress = (this && this.findChildById) ? this.findChildById("10") as CaloriesProgress : undefined;
        if (earlierCreatedChild_10 == undefined) {
            View.create(new CaloriesProgress("10", this, { foodInfo: this.foodInfo }));
        }
        else {
            earlierCreatedChild_10.updateWithValueParams({
                foodInfo: this.foodInfo
            });
            if (!earlierCreatedChild_10.needsUpdate()) {
                earlierCreatedChild_10.markStatic();
            }
            View.create(earlierCreatedChild_10);
        }
        let earlierCreatedChild_11: NutritionPercent = (this && this.findChildById) ? this.findChildById("11") as NutritionPercent : undefined;
        if (earlierCreatedChild_11 == undefined) {
            View.create(new NutritionPercent("11", this, { foodInfo: this.foodInfo, nutritionElements: this.nutritionElements }));
        }
        else {
            earlierCreatedChild_11.updateWithValueParams({
                foodInfo: this.foodInfo, nutritionElements: this.nutritionElements
            });
            if (!earlierCreatedChild_11.needsUpdate()) {
                earlierCreatedChild_11.markStatic();
            }
            View.create(earlierCreatedChild_11);
        }
        let earlierCreatedChild_12: NutritionPieChart = (this && this.findChildById) ? this.findChildById("12") as NutritionPieChart : undefined;
        if (earlierCreatedChild_12 == undefined) {
            View.create(new NutritionPieChart("12", this, { foodInfo: this.foodInfo, nutritionElements: this.nutritionElements }));
        }
        else {
            earlierCreatedChild_12.updateWithValueParams({
                foodInfo: this.foodInfo, nutritionElements: this.nutritionElements
            });
            if (!earlierCreatedChild_12.needsUpdate()) {
                earlierCreatedChild_12.markStatic();
            }
            View.create(earlierCreatedChild_12);
        }
        Swiper.pop();
        Button.createWithLabel($r('app.string.button_food_detail_record'), { type: ButtonType.Capsule, stateEffect: true });
        Button.height(42);
        Button.width('80%');
        Button.margin({ top: 32, bottom: 32 });
        Button.backgroundColor($r('app.color.theme_color_green'));
        Button.onClick(() => {
            this.dialogController.open();
        });
        Button.pop();
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new FoodDetail("1", undefined, {}));
