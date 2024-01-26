interface Home_Params {
    currentTabIndex?: number;
    currentBreakpoint?: string;
    breakpointSystem?: BreakpointSystem;
}
interface FoodsDisplay_Params {
    isCategoryMode?: boolean;
}
interface CategoryModeFoods_Params {
    currentTabIndex?: number;
    foodItems?: FoodInfo[];
    foodCategories?: Category[];
}
interface FoodGrid_Params {
    currentBreakpoint?: string;
    foodItems?: FoodInfo[];
}
interface FoodGridItem_Params {
    foodItem?: FoodInfo;
}
interface ListModeFoods_Params {
    foodItems?: Array<FoodInfo | string>;
}
interface FoodListItem_Params {
    foodItem?: FoodInfo;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Home_" + ++__generate__Id;
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
import router from '@ohos.router';
import curves from '@ohos.curves';
import { BreakpointSystem, BreakPointType } from '../common/BreakpointSystem';
import { FoodInfo, Category } from '../model/DataModels';
import { getFoods, getFoodCategories, getSortedFoodData } from '../model/DataUtil';
import { Records } from './components/DietRecord';
interface FoodId {
    foodId: FoodInfo;
}
class FoodListItem extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.foodItem = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: FoodListItem_Params) {
        if (params.foodItem !== undefined) {
            this.foodItem = params.foodItem;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private foodItem?: FoodInfo;
    render() {
        Navigator.create({ target: 'pages/FoodDetail' });
        Navigator.params({ foodId: this.foodItem } as FoodId);
        Navigator.margin({ right: 24, left: 32 });
        Row.create();
        Row.height(64);
        Row.width('100%');
        Image.create(this.foodItem!.image!);
        Image.objectFit(ImageFit.Contain);
        Image.autoResize(false);
        Image.height(40);
        Image.width(40);
        Image.backgroundColor('#FFf1f3f5');
        Image.margin({ right: 16 });
        Image.borderRadius(6);
        Image.sharedTransition(this.foodItem!.letter, {
            duration: 400,
            curve: curves.cubicBezier(0.2, 0.2, 0.1, 1.0),
            delay: 100
        });
        Text.create(this.foodItem?.name);
        Text.fontSize(14);
        Text.pop();
        Blank.create();
        Blank.pop();
        Text.create($r('app.string.calorie_with_kcal_unit', this.foodItem?.calories.toString()));
        Text.fontSize(14);
        Text.pop();
        Row.pop();
        Navigator.pop();
    }
}
class ListModeFoods extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.foodItems = getSortedFoodData();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ListModeFoods_Params) {
        if (params.foodItems !== undefined) {
            this.foodItems = params.foodItems;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private foodItems: Array<FoodInfo | string>;
    render() {
        Column.create();
        Text.create($r("app.string.title_food_list"));
        Text.width('100%');
        Text.height(56);
        Text.padding({ left: 20 });
        Text.backgroundColor('#FF1f3f5');
        Text.fontSize(20);
        Text.pop();
        List.create();
        List.layoutWeight(1);
        ForEach.create("3", this, ObservedObject.GetRawObject(this.foodItems), (item: FoodInfo) => {
            ListItem.create();
            If.create();
            if (item.letter !== undefined) {
                If.branchId(0);
                let earlierCreatedChild_2: FoodListItem = (this && this.findChildById) ? this.findChildById("2") as FoodListItem : undefined;
                if (earlierCreatedChild_2 == undefined) {
                    View.create(new FoodListItem("2", this, { foodItem: item }));
                }
                else {
                    earlierCreatedChild_2.updateWithValueParams({
                        foodItem: item
                    });
                    if (!earlierCreatedChild_2.needsUpdate()) {
                        earlierCreatedChild_2.markStatic();
                    }
                    View.create(earlierCreatedChild_2);
                }
            }
            else {
                If.branchId(1);
                If.create();
                if (typeof (item) === 'string') {
                    If.branchId(0);
                    Text.create(item);
                    Text.fontSize(14);
                    Text.height(48);
                    Text.margin({ left: 24 });
                    Text.width('100%');
                    Text.pop();
                }
                If.pop();
            }
            If.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Column.pop();
    }
}
class FoodGridItem extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.foodItem = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: FoodGridItem_Params) {
        if (params.foodItem !== undefined) {
            this.foodItem = params.foodItem;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private foodItem?: FoodInfo;
    render() {
        Column.create();
        Column.height(184);
        Column.clip(new Rect({ width: '100%', height: '100%', radius: 12 }));
        Column.onClick(() => {
            router.push({ url: 'pages/FoodDetail', params: { foodId: this.foodItem } });
        });
        Image.create(this.foodItem!.image!);
        Image.objectFit(ImageFit.Contain);
        Image.backgroundColor('#f1f3f5');
        Image.width('100%');
        Image.height(152);
        Image.sharedTransition(this.foodItem!.letter, {
            duration: 400,
            curve: curves.cubicBezier(0.2, 0.2, 0.1, 1.0),
            delay: 100
        });
        Row.create();
        Row.padding({ left: 12, right: 12 });
        Row.width('100%');
        Row.height(32);
        Row.backgroundColor('#E5E5E5');
        Text.create(this.foodItem?.name);
        Text.fontSize(14);
        Text.pop();
        Blank.create();
        Blank.pop();
        Text.create($r('app.string.calorie_with_kcal_unit', this.foodItem?.calories.toString()));
        Text.fontSize(14);
        Text.fontColor(0x99000000);
        Text.pop();
        Row.pop();
        Column.pop();
    }
}
class FoodGrid extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentBreakpoint = AppStorage.SetAndProp('currentBreakpoint', 'sm', this, "currentBreakpoint");
        this.foodItems = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: FoodGrid_Params) {
        if (params.foodItems !== undefined) {
            this.foodItems = params.foodItems;
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
    private foodItems?: FoodInfo[];
    render() {
        Grid.create();
        Grid.columnsTemplate(new BreakPointType({
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr',
            lg: '1fr 1fr 1fr 1fr'
        }).getValue(this.currentBreakpoint) as string);
        Grid.columnsGap(8);
        Grid.rowsGap(8);
        Grid.padding({ left: 16, right: 16 });
        ForEach.create("5", this, ObservedObject.GetRawObject(this.foodItems!), (item: FoodInfo) => {
            GridItem.create();
            let earlierCreatedChild_4: FoodGridItem = (this && this.findChildById) ? this.findChildById("4") as FoodGridItem : undefined;
            if (earlierCreatedChild_4 == undefined) {
                View.create(new FoodGridItem("4", this, { foodItem: item }));
            }
            else {
                earlierCreatedChild_4.updateWithValueParams({
                    foodItem: item
                });
                if (!earlierCreatedChild_4.needsUpdate()) {
                    earlierCreatedChild_4.markStatic();
                }
                View.create(earlierCreatedChild_4);
            }
            GridItem.pop();
        });
        ForEach.pop();
        Grid.pop();
    }
}
class CategoryModeFoods extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentTabIndex = new ObservedPropertySimple(0, this, "currentTabIndex");
        this.foodItems = getFoods();
        this.foodCategories = getFoodCategories();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CategoryModeFoods_Params) {
        if (params.currentTabIndex !== undefined) {
            this.currentTabIndex = params.currentTabIndex;
        }
        if (params.foodItems !== undefined) {
            this.foodItems = params.foodItems;
        }
        if (params.foodCategories !== undefined) {
            this.foodCategories = params.foodCategories;
        }
    }
    aboutToBeDeleted() {
        this.__currentTabIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentTabIndex: ObservedPropertySimple<number>;
    get currentTabIndex() {
        return this.__currentTabIndex.get();
    }
    set currentTabIndex(newValue: number) {
        this.__currentTabIndex.set(newValue);
    }
    private foodItems: FoodInfo[];
    private foodCategories: Category[];
    tabBarItemBuilder(value: Resource, index: number, parent = null) {
        Text.create(value);
        Text.fontColor(this.currentTabIndex === index ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.6)');
        Text.fontSize(this.currentTabIndex === index ? 24 : 18);
        Text.margin({ top: 2 });
        Text.height(56);
        Text.pop();
    }
    render() {
        Tabs.create();
        Tabs.animationDuration(0);
        Tabs.barWidth('80%');
        Tabs.onChange((index) => {
            this.currentTabIndex = index;
        });
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.tabBarItemBuilder.call(this, $r('app.string.category_all'), 0);
            } });
        let earlierCreatedChild_6: FoodGrid = (this && this.findChildById) ? this.findChildById("6") as FoodGrid : undefined;
        if (earlierCreatedChild_6 == undefined) {
            View.create(new FoodGrid("6", this, { foodItems: this.foodItems }));
        }
        else {
            earlierCreatedChild_6.updateWithValueParams({
                foodItems: this.foodItems
            });
            View.create(earlierCreatedChild_6);
        }
        TabContent.pop();
        ForEach.create("8", this, ObservedObject.GetRawObject(this.foodCategories), (foodCategory: Category, index?: number) => {
            TabContent.create();
            TabContent.tabBar({ builder: () => {
                    this.tabBarItemBuilder.call(this, foodCategory.name!, index! + 1);
                } });
            let earlierCreatedChild_7: FoodGrid = (this && this.findChildById) ? this.findChildById("7") as FoodGrid : undefined;
            if (earlierCreatedChild_7 == undefined) {
                View.create(new FoodGrid("7", this, { foodItems: this.foodItems.filter(item => (item.categoryId === foodCategory.id)) }));
            }
            else {
                earlierCreatedChild_7.updateWithValueParams({
                    foodItems: this.foodItems.filter(item => (item.categoryId === foodCategory.id))
                });
                View.create(earlierCreatedChild_7);
            }
            TabContent.pop();
        });
        ForEach.pop();
        Tabs.pop();
    }
}
class FoodsDisplay extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isCategoryMode = new ObservedPropertySimple(true, this, "isCategoryMode");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: FoodsDisplay_Params) {
        if (params.isCategoryMode !== undefined) {
            this.isCategoryMode = params.isCategoryMode;
        }
    }
    aboutToBeDeleted() {
        this.__isCategoryMode.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isCategoryMode: ObservedPropertySimple<boolean>;
    get isCategoryMode() {
        return this.__isCategoryMode.get();
    }
    set isCategoryMode(newValue: boolean) {
        this.__isCategoryMode.set(newValue);
    }
    render() {
        Stack.create({ alignContent: Alignment.TopEnd });
        If.create();
        if (this.isCategoryMode) {
            If.branchId(0);
            let earlierCreatedChild_9: CategoryModeFoods = (this && this.findChildById) ? this.findChildById("9") as CategoryModeFoods : undefined;
            if (earlierCreatedChild_9 == undefined) {
                View.create(new CategoryModeFoods("9", this, {}));
            }
            else {
                earlierCreatedChild_9.updateWithValueParams({});
                View.create(earlierCreatedChild_9);
            }
        }
        else {
            If.branchId(1);
            let earlierCreatedChild_10: ListModeFoods = (this && this.findChildById) ? this.findChildById("10") as ListModeFoods : undefined;
            if (earlierCreatedChild_10 == undefined) {
                View.create(new ListModeFoods("10", this, {}));
            }
            else {
                earlierCreatedChild_10.updateWithValueParams({});
                if (!earlierCreatedChild_10.needsUpdate()) {
                    earlierCreatedChild_10.markStatic();
                }
                View.create(earlierCreatedChild_10);
            }
        }
        If.pop();
        Row.create();
        Row.height(56);
        Row.backgroundColor(this.isCategoryMode ? Color.White : '#F1F3F5');
        Row.onClick(() => {
            this.isCategoryMode = !this.isCategoryMode;
        });
        Image.create($r("app.media.ic_switch"));
        Image.height(24);
        Image.width(24);
        Image.margin({ left: 24, right: 24 });
        Row.pop();
        Stack.pop();
    }
}
class Home extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentTabIndex = new ObservedPropertySimple(0, this, "currentTabIndex");
        this.__currentBreakpoint = AppStorage.SetAndProp('currentBreakpoint', 'sm', this, "currentBreakpoint");
        this.breakpointSystem = new BreakpointSystem();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Home_Params) {
        if (params.currentTabIndex !== undefined) {
            this.currentTabIndex = params.currentTabIndex;
        }
        if (params.breakpointSystem !== undefined) {
            this.breakpointSystem = params.breakpointSystem;
        }
    }
    aboutToBeDeleted() {
        this.__currentTabIndex.aboutToBeDeleted();
        this.__currentBreakpoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentTabIndex: ObservedPropertySimple<number>;
    get currentTabIndex() {
        return this.__currentTabIndex.get();
    }
    set currentTabIndex(newValue: number) {
        this.__currentTabIndex.set(newValue);
    }
    private __currentBreakpoint: ObservedPropertyAbstract<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    private breakpointSystem: BreakpointSystem;
    bottomBarItemBuilder(name: Resource, icon: Resource, index: number, parent = null) {
        Flex.create({
            direction: new BreakPointType({
                sm: FlexDirection.Column,
                md: FlexDirection.Row,
                lg: FlexDirection.Column
            }).getValue(this.currentBreakpoint),
            justifyContent: FlexAlign.Center,
            alignItems: ItemAlign.Center
        });
        Image.create(icon);
        Image.height(24);
        Image.width(24);
        Image.fillColor(this.getTabBarColor(index));
        Text.create(name);
        Text.margin(new BreakPointType<Padding>({
            sm: { top: 4 },
            md: { left: 8 },
            lg: { top: 4 }
        }).getValue(this.currentBreakpoint) as Padding);
        Text.fontSize(11);
        Text.fontColor(this.getTabBarColor(index));
        Text.pop();
        Flex.pop();
    }
    aboutToAppear() {
        this.breakpointSystem.register();
    }
    aboutToDisappear() {
        this.breakpointSystem.unregister();
    }
    render() {
        Tabs.create({
            barPosition: new BreakPointType({
                sm: BarPosition.End,
                md: BarPosition.End,
                lg: BarPosition.Start
            }).getValue(this.currentBreakpoint)
        });
        Tabs.vertical(new BreakPointType({ sm: false, md: false, lg: true }).getValue(this.currentBreakpoint) as boolean);
        Tabs.barWidth(new BreakPointType({ sm: '100%', md: '100%', lg: '56vp' }).getValue(this.currentBreakpoint) as string);
        Tabs.barHeight(new BreakPointType({ sm: '56vp', md: '56vp', lg: '60%' }).getValue(this.currentBreakpoint) as string);
        Tabs.animationDuration(0);
        Tabs.onChange((index) => {
            this.currentTabIndex = index;
        });
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.bottomBarItemBuilder.call(this, $r("app.string.tab_bar_home"), $r("app.media.ic_bottom_home"), 0);
            } });
        let earlierCreatedChild_11: FoodsDisplay = (this && this.findChildById) ? this.findChildById("11") as FoodsDisplay : undefined;
        if (earlierCreatedChild_11 == undefined) {
            View.create(new FoodsDisplay("11", this, {}));
        }
        else {
            earlierCreatedChild_11.updateWithValueParams({});
            View.create(earlierCreatedChild_11);
        }
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.bottomBarItemBuilder.call(this, $r("app.string.tab_bar_record"), $r("app.media.ic_bottom_record"), 1);
            } });
        let earlierCreatedChild_12: Records = (this && this.findChildById) ? this.findChildById("12") as Records : undefined;
        if (earlierCreatedChild_12 == undefined) {
            View.create(new Records("12", this, {}));
        }
        else {
            earlierCreatedChild_12.updateWithValueParams({});
            View.create(earlierCreatedChild_12);
        }
        TabContent.pop();
        Tabs.pop();
    }
    private getTabBarColor(index: number) {
        return this.currentTabIndex == index ? $r('app.color.tab_bar_select_color') : $r('app.color.tab_bar_normal_color');
    }
}
loadDocument(new Home("1", undefined, {}));
