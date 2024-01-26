interface Home_Params {
    tabsIndex?: number;
    curBp?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Home_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import { FirstLevelCategory } from './model/CategoricalDataType';
import { HOME_TABS } from './data/HomeData';
import { TabContentNavigation } from './TabContentNavigation';
class Home extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__tabsIndex = new ObservedPropertySimple(0, this, "tabsIndex");
        this.__curBp = AppStorage.SetAndLink('currentBreakpoint', 'sm', this, "curBp");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Home_Params) {
        if (params.tabsIndex !== undefined) {
            this.tabsIndex = params.tabsIndex;
        }
    }
    aboutToBeDeleted() {
        this.__tabsIndex.aboutToBeDeleted();
        this.__curBp.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 初始化tabsBar的index值为0
    private __tabsIndex: ObservedPropertySimple<number>;
    get tabsIndex() {
        return this.__tabsIndex.get();
    }
    set tabsIndex(newValue: number) {
        this.__tabsIndex.set(newValue);
    }
    private __curBp: ObservedPropertyAbstract<string>;
    get curBp() {
        return this.__curBp.get();
    }
    set curBp(newValue: string) {
        this.__curBp.set(newValue);
    }
    render() {
        Tabs.create({ barPosition: this.curBp === 'sm' ? BarPosition.End : BarPosition.Start });
        Tabs.vertical(this.curBp === 'sm' ? false : true);
        Tabs.barHeight(this.curBp === 'sm' ? '56vp' : '40%');
        Tabs.barWidth(this.curBp === 'sm' ? '100%' : '56vp');
        Tabs.barMode(BarMode.Fixed);
        Tabs.backgroundColor($r('app.color.background_shallow_grey'));
        Tabs.onChange((index: number) => {
            this.tabsIndex = index;
        });
        ForEach.create("3", this, ObservedObject.GetRawObject(HOME_TABS), (item: FirstLevelCategory, index: number) => {
            TabContent.create();
            TabContent.tabBar({ builder: () => {
                    this.CustomTabBar.call(this, item, index);
                } });
            let earlierCreatedChild_2: TabContentNavigation = (this && this.findChildById) ? this.findChildById("2") as TabContentNavigation : undefined;
            if (earlierCreatedChild_2 == undefined) {
                View.create(new TabContentNavigation("2", this, { categories: item.childNodes }));
            }
            else {
                earlierCreatedChild_2.updateWithValueParams({
                    categories: item.childNodes
                });
                if (!earlierCreatedChild_2.needsUpdate()) {
                    earlierCreatedChild_2.markStatic();
                }
                View.create(earlierCreatedChild_2);
            }
            TabContent.pop();
        }, (item: FirstLevelCategory) => JSON.stringify(item));
        ForEach.pop();
        Tabs.pop();
    }
    CustomTabBar(item: FirstLevelCategory, index: number, parent = null) {
        Column.create();
        Column.width('100%');
        Column.id(`tabBar${index}`);
        Column.padding({ top: 6, bottom: 6 });
        Column.alignItems(HorizontalAlign.Center);
        Image.create(this.tabsIndex === index ? item.iconSelected : item.icon);
        Image.width(24);
        Image.height(24);
        Image.margin({ bottom: 4 });
        Text.create(item.tabBarName);
        Text.fontSize(10);
        Text.fontFamily('HarmonyHeiTi-Medium');
        Text.fontColor(this.tabsIndex === index ? $r('app.color.tab_bar_select') : $r('app.color.tab_bar_unselect'));
        Text.pop();
        Column.pop();
    }
}
loadDocument(new Home("1", undefined, {}));
