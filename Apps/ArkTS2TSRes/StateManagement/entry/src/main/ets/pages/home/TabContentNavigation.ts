interface FourthLevelNavigation_Params {
    fourthLevelCategory?: FourthLevelCategory;
}
interface ThirdLevelNavigation_Params {
    isUnfold?: boolean;
    thirdLevelCategory?: ThirdLevelCategory;
    ThirdLevelNavigationIndex?: number;
    secondLevelCategoryIndex?: number;
}
interface TabContentNavigation_Params {
    categories?: ThirdLevelCategory[] | SecondLevelCategory[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TabContentNavigation_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License")
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
import { SecondLevelCategory, ThirdLevelCategory, FourthLevelCategory } from './model/CategoricalDataType';
function __Column__ColumnStyle(): void {
    Column.width('100%');
    Column.borderRadius(24);
    Column.backgroundColor(Color.White);
    Column.padding({ left: 12, right: 12, bottom: 4, top: 4 });
}
export class TabContentNavigation extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.categories = [];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TabContentNavigation_Params) {
        if (params.categories !== undefined) {
            this.categories = params.categories;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private categories: ThirdLevelCategory[] | SecondLevelCategory[];
    hasSecondLevelCategory(category: ThirdLevelCategory | SecondLevelCategory): boolean {
        return category && category.tag ? false : true;
    }
    render() {
        Column.create();
        Column.height('100%');
        Column.padding({ top: 12 });
        List.create();
        List.width('100%');
        List.layoutWeight(1);
        List.padding({ left: 16, right: 16, top: 4 });
        If.create();
        if (this.categories.length > 0 && this.hasSecondLevelCategory(this.categories[0])) {
            If.branchId(0);
            ForEach.create("4", this, ObservedObject.GetRawObject(this.categories), (secondLevelCategory: SecondLevelCategory, secondLevelCategoryIndex: number) => {
                ListItem.create();
                Column.create();
                Text.create(secondLevelCategory.title);
                Text.height(48);
                Text.fontSize(14);
                Text.width('100%');
                Text.textAlign(TextAlign.Start);
                Text.fontFamily('HarmonyHeiTi-Medium');
                Text.fontColor($r('app.color.font_color_shallow'));
                Text.padding({ bottom: 4, top: 4, left: 24 });
                Text.pop();
                Column.create();
                __Column__ColumnStyle();
                ForEach.create("3", this, ObservedObject.GetRawObject(secondLevelCategory.childNodes), (thirdLevelCategory: ThirdLevelCategory, thirdLevelCategoryIndex: number) => {
                    let earlierCreatedChild_2: ThirdLevelNavigation = (this && this.findChildById) ? this.findChildById("2") as ThirdLevelNavigation : undefined;
                    if (earlierCreatedChild_2 == undefined) {
                        View.create(new ThirdLevelNavigation("2", this, {
                            thirdLevelCategory: thirdLevelCategory,
                            secondLevelCategoryIndex: secondLevelCategoryIndex,
                            ThirdLevelNavigationIndex: thirdLevelCategoryIndex
                        }));
                    }
                    else {
                        earlierCreatedChild_2.updateWithValueParams({
                            thirdLevelCategory: thirdLevelCategory,
                            secondLevelCategoryIndex: secondLevelCategoryIndex,
                            ThirdLevelNavigationIndex: thirdLevelCategoryIndex
                        });
                        View.create(earlierCreatedChild_2);
                    }
                });
                ForEach.pop();
                Column.pop();
                Column.pop();
                ListItem.pop();
            });
            ForEach.pop();
        }
        else {
            If.branchId(1);
            ForEach.create("6", this, ObservedObject.GetRawObject(this.categories), (thirdLevelCategory: ThirdLevelCategory) => {
                ListItem.create();
                ListItem.margin({ top: 4, bottom: 4 });
                Column.create();
                __Column__ColumnStyle();
                let earlierCreatedChild_5: ThirdLevelNavigation = (this && this.findChildById) ? this.findChildById("5") as ThirdLevelNavigation : undefined;
                if (earlierCreatedChild_5 == undefined) {
                    View.create(new ThirdLevelNavigation("5", this, { thirdLevelCategory: thirdLevelCategory }));
                }
                else {
                    earlierCreatedChild_5.updateWithValueParams({
                        thirdLevelCategory: thirdLevelCategory
                    });
                    View.create(earlierCreatedChild_5);
                }
                Column.pop();
                ListItem.pop();
            });
            ForEach.pop();
        }
        If.pop();
        List.pop();
        Blank.create();
        Blank.pop();
        Divider.create();
        Divider.height(0.75);
        Divider.width('100%');
        Divider.alignSelf(ItemAlign.Baseline);
        Divider.color($r('app.color.tab_bar_divider'));
        Column.pop();
    }
}
class ThirdLevelNavigation extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isUnfold = new ObservedPropertySimple(false, this, "isUnfold");
        this.thirdLevelCategory = new ThirdLevelCategory();
        this.ThirdLevelNavigationIndex = 0;
        this.secondLevelCategoryIndex = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ThirdLevelNavigation_Params) {
        if (params.isUnfold !== undefined) {
            this.isUnfold = params.isUnfold;
        }
        if (params.thirdLevelCategory !== undefined) {
            this.thirdLevelCategory = params.thirdLevelCategory;
        }
        if (params.ThirdLevelNavigationIndex !== undefined) {
            this.ThirdLevelNavigationIndex = params.ThirdLevelNavigationIndex;
        }
        if (params.secondLevelCategoryIndex !== undefined) {
            this.secondLevelCategoryIndex = params.secondLevelCategoryIndex;
        }
    }
    aboutToBeDeleted() {
        this.__isUnfold.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isUnfold: ObservedPropertySimple<boolean>;
    get isUnfold() {
        return this.__isUnfold.get();
    }
    set isUnfold(newValue: boolean) {
        this.__isUnfold.set(newValue);
    }
    private thirdLevelCategory: ThirdLevelCategory;
    private ThirdLevelNavigationIndex: number;
    private secondLevelCategoryIndex: number;
    render() {
        Column.create();
        Column.id(`secondLevelMenu${this.secondLevelCategoryIndex}${this.secondLevelCategoryIndex === 1 ? 0 : this.ThirdLevelNavigationIndex}`);
        Row.create();
        Row.height(56);
        Row.width('100%');
        Row.onClick(() => {
            if (this.thirdLevelCategory.childNodes === undefined) {
                // Click to jump to the corresponding page
                if (this.thirdLevelCategory.url !== undefined) {
                    router.pushUrl({
                        url: this.thirdLevelCategory.url
                    });
                }
            }
            else {
                this.isUnfold = !this.isUnfold;
            }
        });
        Text.create(this.thirdLevelCategory.title);
        Text.fontSize(16);
        Text.margin({ left: 16 });
        Text.fontFamily('HarmonyHeiTi-Medium');
        Text.fontColor($r('app.color.font_color_dark'));
        Text.pop();
        Blank.create();
        Blank.pop();
        If.create();
        if (this.thirdLevelCategory.childNodes) {
            If.branchId(0);
            Image.create(this.isUnfold ? $r('app.media.ic_down_arrow') : $r('app.media.ic_right_arrow'));
            Image.width(this.isUnfold ? 24 : 12);
            Image.height(this.isUnfold ? 12 : 24);
            Image.margin({ right: this.isUnfold ? 0 : 6 });
        }
        If.pop();
        Row.pop();
        If.create();
        // Click to expand the fourth-level category
        if (this.isUnfold) {
            If.branchId(0);
            ForEach.create("8", this, ObservedObject.GetRawObject(this.thirdLevelCategory.childNodes), (fourthLevelCategory: FourthLevelCategory) => {
                Column.create();
                Divider.create();
                Divider.height(1);
                Divider.opacity(0.2);
                Divider.margin({ left: 42, right: 8 });
                Divider.color($r('app.color.font_color_dark'));
                let earlierCreatedChild_7: FourthLevelNavigation = (this && this.findChildById) ? this.findChildById("7") as FourthLevelNavigation : undefined;
                if (earlierCreatedChild_7 == undefined) {
                    View.create(new FourthLevelNavigation("7", this, { fourthLevelCategory: fourthLevelCategory }));
                }
                else {
                    earlierCreatedChild_7.updateWithValueParams({
                        fourthLevelCategory: fourthLevelCategory
                    });
                    if (!earlierCreatedChild_7.needsUpdate()) {
                        earlierCreatedChild_7.markStatic();
                    }
                    View.create(earlierCreatedChild_7);
                }
                Column.pop();
            }, (item: FourthLevelCategory) => JSON.stringify(item));
            ForEach.pop();
        }
        If.pop();
        Column.pop();
    }
}
class FourthLevelNavigation extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.fourthLevelCategory = new FourthLevelCategory();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: FourthLevelNavigation_Params) {
        if (params.fourthLevelCategory !== undefined) {
            this.fourthLevelCategory = params.fourthLevelCategory;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private fourthLevelCategory: FourthLevelCategory;
    render() {
        Row.create();
        Row.height(48);
        Row.width('100%');
        Row.onClick(() => {
            // Click to jump to the corresponding page
            if (this.fourthLevelCategory.url != undefined) {
                router.pushUrl({
                    url: this.fourthLevelCategory.url
                });
            }
        });
        Text.create(this.fourthLevelCategory.title);
        Text.fontSize(16);
        Text.layoutWeight(1);
        Text.margin({ left: 42 });
        Text.align(Alignment.Start);
        Text.fontFamily('HarmonyHeiTi-Medium');
        Text.fontColor($r('app.color.font_color_dark'));
        Text.pop();
        Blank.create();
        Blank.pop();
        Row.pop();
    }
}
