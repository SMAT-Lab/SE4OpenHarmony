interface HomePage_Params {
    currentIndex?: number;
    controller?: TabsController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "HomePage_" + ++__generate__Id;
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
import ScreenUtil from '../common/util/ScreenUtil';
import { HomeConstants } from '../common/constants/HomeConstants';
import { CommonConstants } from '../common/constants/CommonConstants';
import { HomeTabContent } from '../view/HomeTabContent';
class HomePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentIndex = new ObservedPropertySimple(HomeConstants.HOME_TAB.CURRENT_INDEX, this, "currentIndex");
        this.controller = new TabsController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: HomePage_Params) {
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__currentIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentIndex: ObservedPropertySimple<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    private controller: TabsController;
    aboutToAppear() {
        ScreenUtil.setScreenSize();
    }
    TabBuilder(index: number, name: Resource, parent = null) {
        Column.create();
        Column.width(CommonConstants.FULL_PERCENT);
        Text.create(name);
        Text.fontColor(this.currentIndex === index ?
            $r('app.color.index_tab_selected_font_color') : $r('app.color.index_tab_font_color'));
        Text.fontSize($r('app.float.home_page_font_size'));
        Text.fontWeight(this.currentIndex === index ?
            HomeConstants.HOME_TAB.FONT_WEIGHT_SELECT : HomeConstants.HOME_TAB.FONT_WEIGHT_UNSELECT);
        Text.lineHeight(HomeConstants.HOME_TAB.LINE_HEIGHT);
        Text.margin({
            top: HomeConstants.HOME_TAB.MARGIN_TOP_TWO,
            bottom: HomeConstants.HOME_TAB.MARGIN_BOTTOM
        });
        Text.pop();
        Divider.create();
        Divider.strokeWidth(HomeConstants.HOME_TAB.STROKE_WIDTH);
        Divider.color($r('app.color.index_tab_selected_font_color'));
        Divider.opacity(this.currentIndex === index ?
            HomeConstants.HOME_TAB.TAB_BAR_SECOND : HomeConstants.HOME_TAB.TAB_BAR_FIRST);
        Column.pop();
    }
    render() {
        Column.create();
        Column.width(CommonConstants.FULL_PERCENT);
        Column.height(CommonConstants.FULL_PERCENT);
        Column.backgroundColor($r('app.color.index_background'));
        Tabs.create({ barPosition: BarPosition.Start, controller: this.controller });
        Tabs.vertical(false);
        Tabs.barMode(BarMode.Fixed);
        Tabs.barWidth(HomeConstants.HOME_TAB.BAR_WIDTH);
        Tabs.barHeight(HomeConstants.HOME_TAB.BAR_HEIGHT);
        Tabs.onChange((index: number) => {
            this.currentIndex = index;
        });
        Tabs.width(CommonConstants.FULL_PERCENT);
        Tabs.height(CommonConstants.FULL_PERCENT);
        Tabs.margin({ top: $r('app.float.home_tab_margin_top') });
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, HomeConstants.HOME_TAB.TAB_BAR_FIRST, $r('app.string.index_tab_local_video'));
            } });
        let earlierCreatedChild_2: HomeTabContent = (this && this.findChildById) ? this.findChildById("2") as HomeTabContent : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new HomeTabContent("2", this, { currIndex: HomeConstants.HOME_TAB.TAB_BAR_FIRST }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                currIndex: HomeConstants.HOME_TAB.TAB_BAR_FIRST
            });
            View.create(earlierCreatedChild_2);
        }
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, HomeConstants.HOME_TAB.TAB_BAR_SECOND, $r('app.string.index_tab_internet_video'));
            } });
        let earlierCreatedChild_3: HomeTabContent = (this && this.findChildById) ? this.findChildById("3") as HomeTabContent : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new HomeTabContent("3", this, { currIndex: HomeConstants.HOME_TAB.TAB_BAR_SECOND }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                currIndex: HomeConstants.HOME_TAB.TAB_BAR_SECOND
            });
            View.create(earlierCreatedChild_3);
        }
        TabContent.pop();
        Tabs.pop();
        Column.pop();
    }
}
loadDocument(new HomePage("1", undefined, {}));
