interface AppStore_Params {
    currentBreakpoint?: string;
    currentSideBarMode?: string;
    sideListData?: MenuType[];
    currentMainIndex?: number;
    currentSubIndex?: number;
    mainController?: TabsController;
    sideBarWidth?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AppStore_" + ++__generate__Id;
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
import { MenuType } from '../model/MenuType';
import { sideListData } from '../model/SideListData';
import { CommonMainTabs } from '../common/CommonMainTabs';
import { StyleConfiguration } from '../common/Configuration';
import { SideBarController } from '../common/SideBarController';
import { BreakpointType, SideBarMode } from '../common/BreakpointSystem';
let storage = LocalStorage.GetShared();
class AppStore extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__sideListData = new ObservedPropertyObject(sideListData, this, "sideListData");
        this.__currentMainIndex = new ObservedPropertySimple(0, this, "currentMainIndex");
        this.__currentSubIndex = new ObservedPropertySimple(0, this, "currentSubIndex");
        this.mainController = new TabsController();
        this.__sideBarWidth = new ObservedPropertySimple(64, this, "sideBarWidth");
        this.updateWithValueParams(params);
        this.declareWatch("currentSideBarMode", this.onCurrentSideBarModeChange);
    }
    updateWithValueParams(params: AppStore_Params) {
        if (params.sideListData !== undefined) {
            this.sideListData = params.sideListData;
        }
        if (params.currentMainIndex !== undefined) {
            this.currentMainIndex = params.currentMainIndex;
        }
        if (params.currentSubIndex !== undefined) {
            this.currentSubIndex = params.currentSubIndex;
        }
        if (params.mainController !== undefined) {
            this.mainController = params.mainController;
        }
        if (params.sideBarWidth !== undefined) {
            this.sideBarWidth = params.sideBarWidth;
        }
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__currentSideBarMode.aboutToBeDeleted();
        this.__sideListData.aboutToBeDeleted();
        this.__currentMainIndex.aboutToBeDeleted();
        this.__currentSubIndex.aboutToBeDeleted();
        this.__sideBarWidth.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentBreakpoint: ObservedPropertyAbstract<string> = this.localStorage_.setAndLink<string>("currentBreakpoint", 'md', this, "currentBreakpoint");
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    private __currentSideBarMode: ObservedPropertyAbstract<string> = this.localStorage_.setAndLink<string>("currentSideBarMode", 'tabs', this, "currentSideBarMode");
    get currentSideBarMode() {
        return this.__currentSideBarMode.get();
    }
    set currentSideBarMode(newValue: string) {
        this.__currentSideBarMode.set(newValue);
    }
    private __sideListData: ObservedPropertyObject<MenuType[]>;
    get sideListData() {
        return this.__sideListData.get();
    }
    set sideListData(newValue: MenuType[]) {
        this.__sideListData.set(newValue);
    }
    private __currentMainIndex: ObservedPropertySimple<number>;
    get currentMainIndex() {
        return this.__currentMainIndex.get();
    }
    set currentMainIndex(newValue: number) {
        this.__currentMainIndex.set(newValue);
    }
    private __currentSubIndex: ObservedPropertySimple<number>;
    get currentSubIndex() {
        return this.__currentSubIndex.get();
    }
    set currentSubIndex(newValue: number) {
        this.__currentSubIndex.set(newValue);
    }
    private mainController: TabsController;
    private __sideBarWidth: ObservedPropertySimple<number>;
    get sideBarWidth() {
        return this.__sideBarWidth.get();
    }
    set sideBarWidth(newValue: number) {
        this.__sideBarWidth.set(newValue);
    }
    onCurrentSideBarModeChange() {
        Context.animateTo({ duration: 300 }, () => {
            if (this.currentSideBarMode === 'list') {
                let sideBarWidth = new BreakpointType(0, 64, 96).GetValue(this.currentBreakpoint);
                this.sideBarWidth = sideBarWidth === undefined ? this.sideBarWidth : sideBarWidth;
            }
            else {
                this.sideBarWidth = 240;
            }
        });
    }
    getMinSideBarWidth() {
        let sideBarWidth = new SideBarMode(this.sideBarWidth, 240).GetValue(this.currentSideBarMode);
        return sideBarWidth === undefined ? this.sideBarWidth : sideBarWidth;
    }
    getMaxSideBarWidth() {
        let sideBarWidth = new SideBarMode(this.sideBarWidth, 280).GetValue(this.currentSideBarMode);
        return sideBarWidth === undefined ? this.sideBarWidth : sideBarWidth;
    }
    render() {
        GridRow.create({ columns: { sm: 3, md: 6, lg: 9 } });
        GridRow.onBreakpointChange((breakpoints: string) => {
            this.currentBreakpoint = breakpoints;
            setTimeout(() => {
                Context.animateTo({ duration: 300 }, () => {
                    if (this.currentSideBarMode === 'list') {
                        let sideBarWidth = new BreakpointType(0, 64, 96).GetValue(this.currentBreakpoint);
                        this.sideBarWidth = sideBarWidth === undefined ? this.sideBarWidth : sideBarWidth;
                    }
                });
            }, 100);
        });
        GridCol.create({ span: { sm: 3, md: 6, lg: 9 } });
        Column.create();
        // md、lg模式
        Column.create();
        // md、lg模式
        Column.visibility(this.currentBreakpoint !== 'sm' ? Visibility.Visible : Visibility.None);
        SideBarContainer.create();
        SideBarContainer.showControlButton(false);
        SideBarContainer.backgroundColor('#f1f3f5');
        SideBarContainer.controlButton(StyleConfiguration.getBreakpointStyle(this.currentBreakpoint)
            .controlButtonStyle);
        SideBarContainer.autoHide(false);
        SideBarContainer.sideBarWidth(this.sideBarWidth);
        SideBarContainer.minSideBarWidth(this.getMinSideBarWidth());
        SideBarContainer.maxSideBarWidth(this.getMaxSideBarWidth());
        Column.create();
        let earlierCreatedChild_2: SideBarController = (this && this.findChildById) ? this.findChildById("2") as SideBarController : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new SideBarController("2", this, {
                currentMainIndex: this.__currentMainIndex,
                currentSubIndex: this.__currentSubIndex,
                mainController: this.mainController
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                mainController: this.mainController
            });
            View.create(earlierCreatedChild_2);
        }
        Column.pop();
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor($r('sys.color.ohos_id_color_background'));
        let earlierCreatedChild_3: CommonMainTabs = (this && this.findChildById) ? this.findChildById("3") as CommonMainTabs : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new CommonMainTabs("3", this, {
                currentMainIndex: this.__currentMainIndex,
                currentSubIndex: this.__currentSubIndex,
                mainTabsController: this.mainController,
                subTabsController: this.sideListData[this.currentMainIndex].subController,
                mainTabsContentList: this.sideListData,
            }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                mainTabsController: this.mainController,
                subTabsController: this.sideListData[this.currentMainIndex].subController,
                mainTabsContentList: this.sideListData
            });
            View.create(earlierCreatedChild_3);
        }
        Column.pop();
        SideBarContainer.pop();
        // md、lg模式
        Column.pop();
        // sm模式
        Column.create();
        // sm模式
        Column.visibility(this.currentBreakpoint === 'sm' ? Visibility.Visible : Visibility.None);
        __Common__.create();
        __Common__.layoutWeight(1);
        let earlierCreatedChild_4: CommonMainTabs = (this && this.findChildById) ? this.findChildById("4") as CommonMainTabs : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new CommonMainTabs("4", this, {
                currentMainIndex: this.__currentMainIndex,
                currentSubIndex: this.__currentSubIndex,
                mainTabsController: this.mainController,
                subTabsController: this.sideListData[this.currentMainIndex].subController,
                mainTabsContentList: this.sideListData,
            }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                mainTabsController: this.mainController,
                subTabsController: this.sideListData[this.currentMainIndex].subController,
                mainTabsContentList: this.sideListData
            });
            View.create(earlierCreatedChild_4);
        }
        __Common__.pop();
        __Common__.create();
        __Common__.height(56);
        let earlierCreatedChild_5: SideBarController = (this && this.findChildById) ? this.findChildById("5") as SideBarController : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new SideBarController("5", this, {
                currentMainIndex: this.__currentMainIndex,
                currentSubIndex: this.__currentSubIndex,
                mainController: this.mainController
            }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                mainController: this.mainController
            });
            View.create(earlierCreatedChild_5);
        }
        __Common__.pop();
        // sm模式
        Column.pop();
        Column.pop();
        GridCol.pop();
        GridRow.pop();
    }
}
loadDocument(new AppStore("1", undefined, {}, storage));
