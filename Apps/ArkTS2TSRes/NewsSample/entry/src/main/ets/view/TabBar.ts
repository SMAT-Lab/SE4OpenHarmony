interface TabBar_Params {
    tabBarArray?: NewsTypeBean[];
    currentIndex?: number;
    currentPage?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TabBar_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import NewsList from '../view/newslist';
import { TabBars, FULL_HEIGHT } from '../common/constant/CommonConstant';
import NewsTypeBean from '../common/bean/NewsTypeBean';
import NewsViewModel from '../viewmodel/NewsViewModel';
export default class TabBar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__tabBarArray = new ObservedPropertyObject(NewsViewModel.getDefaultTypeList(), this, "tabBarArray");
        this.__currentIndex = new ObservedPropertySimple(0, this, "currentIndex");
        this.__currentPage = new ObservedPropertySimple(1, this, "currentPage");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TabBar_Params) {
        if (params.tabBarArray !== undefined) {
            this.tabBarArray = params.tabBarArray;
        }
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.currentPage !== undefined) {
            this.currentPage = params.currentPage;
        }
    }
    aboutToBeDeleted() {
        this.__tabBarArray.aboutToBeDeleted();
        this.__currentIndex.aboutToBeDeleted();
        this.__currentPage.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __tabBarArray: ObservedPropertyObject<NewsTypeBean[]>;
    get tabBarArray() {
        return this.__tabBarArray.get();
    }
    set tabBarArray(newValue: NewsTypeBean[]) {
        this.__tabBarArray.set(newValue);
    }
    private __currentIndex: ObservedPropertySimple<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    private __currentPage: ObservedPropertySimple<number>;
    get currentPage() {
        return this.__currentPage.get();
    }
    set currentPage(newValue: number) {
        this.__currentPage.set(newValue);
    }
    TabBuilder(index: number, parent = null) {
        Column.create();
        Text.create(this.tabBarArray[index].name);
        Text.height(FULL_HEIGHT);
        Text.padding({ left: TabBars.HORIZONTAL_PADDING, right: TabBars.HORIZONTAL_PADDING });
        Text.fontSize(this.currentIndex === index ? TabBars.SELECT_TEXT_FONT_SIZE : TabBars.UN_SELECT_TEXT_FONT_SIZE);
        Text.fontWeight(this.currentIndex === index ? TabBars.SELECT_TEXT_FONT_WEIGHT : TabBars.UN_SELECT_TEXT_FONT_WEIGHT);
        Text.fontColor($r('app.color.fontColor_text3'));
        Text.pop();
        Column.pop();
    }
    aboutToAppear() {
        // Request news category.
        this.tabBarArray = NewsViewModel.getNewsTypeList();
    }
    render() {
        Tabs.create();
        Tabs.barHeight(TabBars.BAR_HEIGHT);
        Tabs.barMode(BarMode.Scrollable);
        Tabs.barWidth(TabBars.BAR_WIDTH);
        Tabs.onChange((index: number) => {
            this.currentIndex = index;
            this.currentPage = 1;
        });
        Tabs.vertical(false);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.tabBarArray), tabsItem => {
            TabContent.create();
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, tabsItem.id);
                } });
            Column.create();
            Column.pop();
            TabContent.pop();
        }, item => JSON.stringify(item));
        ForEach.pop();
        Tabs.pop();
    }
}
