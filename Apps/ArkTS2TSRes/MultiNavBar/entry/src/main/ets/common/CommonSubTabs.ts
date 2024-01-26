interface SubTabsContentTitle_Params {
    subTabsTitleName?: Resource;
    currentBreakpoint?: string;
}
interface CommonSubTabs_Params {
    currentBreakpoint?: string;
    currentSubIndex?: number;
    subTabsController?: TabsController;
    subTabsContentList?: MenuType[];
    currentSideBarMode?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CommonSubTabs_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
import { BreakpointType } from '../common/BreakpointSystem';
import { StyleConfiguration } from '../common/Configuration';
import { MenuType } from '../model/MenuType';
import { RecommendationList } from './RecommendationList';
import { SearchModule, SecondaryMenu } from './SideBarController';
export class CommonSubTabs extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentSubIndex = new SynchedPropertySimpleTwoWay(params.currentSubIndex, this, "currentSubIndex");
        this.subTabsController = new TabsController();
        this.subTabsContentList = new Array();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CommonSubTabs_Params) {
        if (params.subTabsController !== undefined) {
            this.subTabsController = params.subTabsController;
        }
        if (params.subTabsContentList !== undefined) {
            this.subTabsContentList = params.subTabsContentList;
        }
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__currentSubIndex.aboutToBeDeleted();
        this.__currentSideBarMode.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentBreakpoint: ObservedPropertyAbstract<string> = this.localStorage_.setAndProp<string>("currentBreakpoint", 'md', this, "currentBreakpoint");
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    private __currentSubIndex: SynchedPropertySimpleTwoWay<number>;
    get currentSubIndex() {
        return this.__currentSubIndex.get();
    }
    set currentSubIndex(newValue: number) {
        this.__currentSubIndex.set(newValue);
    }
    private subTabsController: TabsController;
    private subTabsContentList: MenuType[];
    private __currentSideBarMode: ObservedPropertyAbstract<string> = this.localStorage_.setAndProp<string>("currentSideBarMode", 'tabs', this, "currentSideBarMode");
    get currentSideBarMode() {
        return this.__currentSideBarMode.get();
    }
    set currentSideBarMode(newValue: string) {
        this.__currentSideBarMode.set(newValue);
    }
    subControllerChangeIndex(subController: TabsController, index: number) {
        subController.changeIndex(index);
    }
    render() {
        Column.create();
        If.create();
        if (StyleConfiguration.getSubTabsControllerStyle(this.currentBreakpoint, this.currentSideBarMode)
            .isShowSecondMenu) {
            If.branchId(0);
            Column.create();
            Column.width('100%');
            __Common__.create();
            __Common__.height(56);
            let earlierCreatedChild_2: SecondaryMenu = (this && this.findChildById) ? this.findChildById("2") as SecondaryMenu : undefined;
            if (earlierCreatedChild_2 == undefined) {
                View.create(new SecondaryMenu("2", this, {
                    subTitleNameList: this.subTabsContentList,
                    changeIndex: this.subControllerChangeIndex,
                    tabsController: this.subTabsController,
                    currentSubIndex: this.__currentSubIndex
                }));
            }
            else {
                earlierCreatedChild_2.updateWithValueParams({
                    subTitleNameList: this.subTabsContentList,
                    changeIndex: this.subControllerChangeIndex,
                    tabsController: this.subTabsController
                });
                View.create(earlierCreatedChild_2);
            }
            __Common__.pop();
            Column.pop();
        }
        If.pop();
        __Common__.create();
        __Common__.visibility(new BreakpointType(true, false, false).GetValue(this.currentBreakpoint) ? Visibility.Visible : Visibility.None);
        let earlierCreatedChild_3: SearchModule = (this && this.findChildById) ? this.findChildById("3") as SearchModule : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new SearchModule("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        __Common__.pop();
        Tabs.create({ barPosition: BarPosition.Start, controller: this.subTabsController, index: this.currentSubIndex });
        Tabs.scrollable(false);
        Tabs.layoutWeight(1);
        Tabs.barHeight(0);
        Tabs.onChange((index: number) => {
            this.currentSubIndex = index;
        });
        Tabs.width('100%');
        ForEach.create("6", this, ObservedObject.GetRawObject(this.subTabsContentList), (item: MenuType, index: number) => {
            If.create();
            if (index === 0) {
                If.branchId(0);
                TabContent.create();
                Column.create();
                Column.height('100%');
                Column.width('100%');
                If.create();
                if (StyleConfiguration.getSubTabsControllerStyle(this.currentBreakpoint, this.currentSideBarMode)
                    .isShowPageTitle) {
                    If.branchId(0);
                    let earlierCreatedChild_4: SubTabsContentTitle = (this && this.findChildById) ? this.findChildById("4") as SubTabsContentTitle : undefined;
                    if (earlierCreatedChild_4 == undefined) {
                        View.create(new SubTabsContentTitle("4", this, { subTabsTitleName: item.name }));
                    }
                    else {
                        earlierCreatedChild_4.updateWithValueParams({
                            subTabsTitleName: item.name
                        });
                        View.create(earlierCreatedChild_4);
                    }
                }
                If.pop();
                __Common__.create();
                __Common__.layoutWeight(1);
                __Common__.margin(StyleConfiguration.getBreakpointStyle(this.currentBreakpoint)
                    .recommendCompMargin);
                let earlierCreatedChild_5: RecommendationList = (this && this.findChildById) ? this.findChildById("5") as RecommendationList : undefined;
                if (earlierCreatedChild_5 == undefined) {
                    View.create(new RecommendationList("5", this, {}));
                }
                else {
                    earlierCreatedChild_5.updateWithValueParams({});
                    View.create(earlierCreatedChild_5);
                }
                __Common__.pop();
                Column.pop();
                TabContent.pop();
            }
            else {
                If.branchId(1);
                TabContent.create();
                TabContent.pop();
            }
            If.pop();
        }, (item: MenuType) => JSON.stringify(item));
        ForEach.pop();
        Tabs.pop();
        Column.pop();
    }
}
class SubTabsContentTitle extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.subTabsTitleName = $r('app.string.recommend');
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SubTabsContentTitle_Params) {
        if (params.subTabsTitleName !== undefined) {
            this.subTabsTitleName = params.subTabsTitleName;
        }
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private subTabsTitleName: Resource;
    private __currentBreakpoint: ObservedPropertyAbstract<string> = this.localStorage_.setAndProp<string>("currentBreakpoint", 'md', this, "currentBreakpoint");
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    render() {
        Row.create();
        Row.width('100%');
        Row.height(56);
        Text.create(this.subTabsTitleName);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Medium);
        Text.pop();
        Row.pop();
    }
}
