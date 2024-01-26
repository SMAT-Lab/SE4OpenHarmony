interface FootBarTools_Params {
    currentBreakpoint?: string;
    currentSideBarMode?: string;
    toolList?: MenuElement[];
}
interface SecondaryMenu_Params {
    currentBreakpoint?: string;
    currentSideBarMode?: string;
    currentSubIndex?: number | undefined;
    subTitleNameList?: MenuType[];
    changeIndex?: Function;
    tabsController?: TabsController;
}
interface PrimaryMenu_Params {
    currentBreakpoint?: string;
    currentSideBarMode?: string;
    currentSubIndex?: number;
    currentMainIndex?: number;
    sideTitleName?: Resource;
    subTitleNameList?: MenuType[];
    changeIndex?: Function;
    tabsController?: TabsController;
    mainTabsController?: TabsController;
    icon?: Resource;
    index?: number;
    isItemWrap?: boolean;
    iconList?: Resource[];
}
interface SideBarPrimaryNavigation_Params {
    currentBreakpoint?: string;
    currentSideBarMode?: string;
    sideListData?: MenuType[];
    mainController?: TabsController;
    currentSubIndex?: number;
    currentMainIndex?: number;
}
interface SearchModule_Params {
    currentBreakpoint?: string;
    currentSideBarMode?: string;
    searchCompWidth?: number | string;
    controller?: SearchController;
    searchFocusAble?: boolean;
    placeholderText?: Resource;
}
interface AccountInfo_Params {
    currentBreakpoint?: string;
    currentSideBarMode?: string;
}
interface SideBarController_Params {
    currentBreakpoint?: string;
    currentSideBarMode?: string;
    currentSubIndex?: number;
    currentMainIndex?: number;
    mainController?: TabsController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SideBarController_" + ++__generate__Id;
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
import { BreakpointType, SideBarMode } from '../common/BreakpointSystem';
import { StyleConfiguration } from '../common/Configuration';
import { MenuType } from '../model/MenuType';
import { sideListData } from '../model/SideListData';
export class SideBarController extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentSubIndex = new SynchedPropertySimpleTwoWay(params.currentSubIndex, this, "currentSubIndex");
        this.__currentMainIndex = new SynchedPropertySimpleTwoWay(params.currentMainIndex, this, "currentMainIndex");
        this.mainController = new TabsController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SideBarController_Params) {
        if (params.mainController !== undefined) {
            this.mainController = params.mainController;
        }
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__currentSideBarMode.aboutToBeDeleted();
        this.__currentSubIndex.aboutToBeDeleted();
        this.__currentMainIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentBreakpoint: ObservedPropertyAbstract<string> = this.localStorage_.setAndProp<string>("currentBreakpoint", 'md', this, "currentBreakpoint");
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    private __currentSideBarMode: ObservedPropertyAbstract<string> = this.localStorage_.setAndLink<string>("currentSideBarMode", 'list', this, "currentSideBarMode");
    get currentSideBarMode() {
        return this.__currentSideBarMode.get();
    }
    set currentSideBarMode(newValue: string) {
        this.__currentSideBarMode.set(newValue);
    }
    private __currentSubIndex: SynchedPropertySimpleTwoWay<number>;
    get currentSubIndex() {
        return this.__currentSubIndex.get();
    }
    set currentSubIndex(newValue: number) {
        this.__currentSubIndex.set(newValue);
    }
    private __currentMainIndex: SynchedPropertySimpleTwoWay<number>;
    get currentMainIndex() {
        return this.__currentMainIndex.get();
    }
    set currentMainIndex(newValue: number) {
        this.__currentMainIndex.set(newValue);
    }
    private mainController: TabsController;
    render() {
        Scroll.create();
        Scroll.scrollBar(BarState.Off);
        Column.create();
        Column.height('100%');
        Column.backgroundColor('#f1f3f5');
        If.create();
        if (new BreakpointType(false, true, true).GetValue(this.currentBreakpoint)) {
            If.branchId(0);
            Row.create();
            Row.width('100%');
            Row.justifyContent(new SideBarMode(FlexAlign.Center, FlexAlign.Start).GetValue(this.currentSideBarMode));
            Image.create($r('app.media.ic_public_drawer'));
            Image.width(24);
            Image.height(24);
            Image.margin({ top: 41, left: new SideBarMode(0, 24).GetValue(this.currentSideBarMode) });
            Image.id('switchButton');
            Image.onClick(() => {
                Context.animateTo({ duration: 300 }, () => {
                    this.currentSideBarMode = this.currentSideBarMode === 'tabs' ? 'list' : 'tabs';
                });
            });
            Row.pop();
        }
        If.pop();
        __Common__.create();
        __Common__.layoutWeight(1);
        let earlierCreatedChild_2: SideBarPrimaryNavigation = (this && this.findChildById) ? this.findChildById("2") as SideBarPrimaryNavigation : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new SideBarPrimaryNavigation("2", this, {
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
        __Common__.pop();
        If.create();
        if (new BreakpointType(false, true, true).GetValue(this.currentBreakpoint)) {
            If.branchId(0);
            let earlierCreatedChild_3: FootBarTools = (this && this.findChildById) ? this.findChildById("3") as FootBarTools : undefined;
            if (earlierCreatedChild_3 == undefined) {
                View.create(new FootBarTools("3", this, {}));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({});
                View.create(earlierCreatedChild_3);
            }
        }
        If.pop();
        Column.pop();
        Scroll.pop();
    }
}
class AccountInfo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AccountInfo_Params) {
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
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
    private __currentSideBarMode: ObservedPropertyAbstract<string> = this.localStorage_.setAndProp<string>("currentSideBarMode", 'list', this, "currentSideBarMode");
    get currentSideBarMode() {
        return this.__currentSideBarMode.get();
    }
    set currentSideBarMode(newValue: string) {
        this.__currentSideBarMode.set(newValue);
    }
    render() {
        Row.create();
        Row.height(48);
        Row.margin({ left: new SideBarMode(0, 12).GetValue(this.currentSideBarMode) });
        Image.create($r('app.media.ic_mine_normal'));
        Image.width($r('app.float.icon_size'));
        Image.height($r('app.float.icon_size'));
        If.create();
        if (this.currentSideBarMode === 'tabs') {
            If.branchId(0);
            Column.create();
            Column.transition({ type: TransitionType.All, opacity: 0 });
            Column.justifyContent(FlexAlign.SpaceAround);
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
            Column.margin({ left: 12 });
            Text.create('User account');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#E5000000');
            Text.pop();
            Text.create('139******43');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#E5000000');
            Text.pop();
            Column.pop();
        }
        If.pop();
        Row.pop();
    }
}
export class SearchModule extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__searchCompWidth = new ObservedPropertySimple('100%', this, "searchCompWidth");
        this.controller = new SearchController();
        this.__searchFocusAble = new ObservedPropertySimple(true, this, "searchFocusAble");
        this.__placeholderText = new ObservedPropertyObject($r('app.string.search'), this, "placeholderText");
        this.updateWithValueParams(params);
        this.declareWatch("currentSideBarMode", this.onCurrentSideBarModeChange);
    }
    updateWithValueParams(params: SearchModule_Params) {
        if (params.searchCompWidth !== undefined) {
            this.searchCompWidth = params.searchCompWidth;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.searchFocusAble !== undefined) {
            this.searchFocusAble = params.searchFocusAble;
        }
        if (params.placeholderText !== undefined) {
            this.placeholderText = params.placeholderText;
        }
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__currentSideBarMode.aboutToBeDeleted();
        this.__searchCompWidth.aboutToBeDeleted();
        this.__searchFocusAble.aboutToBeDeleted();
        this.__placeholderText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentBreakpoint: ObservedPropertyAbstract<string> = this.localStorage_.setAndProp<string>("currentBreakpoint", 'md', this, "currentBreakpoint");
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    private __currentSideBarMode: ObservedPropertyAbstract<string> = this.localStorage_.setAndLink<string>("currentSideBarMode", 'list', this, "currentSideBarMode");
    get currentSideBarMode() {
        return this.__currentSideBarMode.get();
    }
    set currentSideBarMode(newValue: string) {
        this.__currentSideBarMode.set(newValue);
    }
    private __searchCompWidth: ObservedPropertySimple<number | string>;
    get searchCompWidth() {
        return this.__searchCompWidth.get();
    }
    set searchCompWidth(newValue: number | string) {
        this.__searchCompWidth.set(newValue);
    }
    private controller: SearchController;
    private __searchFocusAble: ObservedPropertySimple<boolean>;
    get searchFocusAble() {
        return this.__searchFocusAble.get();
    }
    set searchFocusAble(newValue: boolean) {
        this.__searchFocusAble.set(newValue);
    }
    private __placeholderText: ObservedPropertyObject<Resource>;
    get placeholderText() {
        return this.__placeholderText.get();
    }
    set placeholderText(newValue: Resource) {
        this.__placeholderText.set(newValue);
    }
    aboutToAppear() {
        if (this.currentSideBarMode === 'list') {
            this.searchCompWidth = 40;
            this.placeholderText = $r('app.string.nullString');
        }
    }
    onCurrentSideBarModeChange() {
        Context.animateTo({ duration: 300, onFinish: () => {
                this.searchFocusAble = this.currentSideBarMode === 'tabs' ? true : false;
            } }, () => {
            this.searchCompWidth = this.searchCompWidth === '100%' ? 40 : '100%';
            this.placeholderText = this.searchCompWidth === 40 ? $r('app.string.nullString') : $r('app.string.search');
        });
    }
    render() {
        Row.create();
        Row.width(new BreakpointType('100%', this.searchCompWidth, this.searchCompWidth).GetValue(this.currentBreakpoint));
        Row.height(56);
        Row.padding(StyleConfiguration.getSubTabsControllerStyle(this.currentBreakpoint, this.currentSideBarMode)
            .searchModulePadding);
        Row.margin({ bottom: 8 });
        Search.create({
            placeholder: new BreakpointType($r('app.string.search'), this.placeholderText, this.placeholderText).GetValue(this.currentBreakpoint)
        });
        Search.focusable(this.searchFocusAble);
        Search.width('100%');
        Search.height(40);
        Search.id('searchButton');
        Search.onTouch((event: TouchEvent) => {
            Context.animateTo({ duration: 300 }, () => {
                if (event.type === TouchType.Up && this.currentSideBarMode === 'list') {
                    this.currentSideBarMode = 'tabs';
                }
            });
        });
        Search.backgroundColor('#fff');
        Search.pop();
        Row.pop();
    }
}
export class SideBarPrimaryNavigation extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__sideListData = new ObservedPropertyObject(sideListData, this, "sideListData");
        this.mainController = new TabsController();
        this.__currentSubIndex = new SynchedPropertySimpleTwoWay(params.currentSubIndex, this, "currentSubIndex");
        this.__currentMainIndex = new SynchedPropertySimpleTwoWay(params.currentMainIndex, this, "currentMainIndex");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SideBarPrimaryNavigation_Params) {
        if (params.sideListData !== undefined) {
            this.sideListData = params.sideListData;
        }
        if (params.mainController !== undefined) {
            this.mainController = params.mainController;
        }
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__currentSideBarMode.aboutToBeDeleted();
        this.__sideListData.aboutToBeDeleted();
        this.__currentSubIndex.aboutToBeDeleted();
        this.__currentMainIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentBreakpoint: ObservedPropertyAbstract<string> = this.localStorage_.setAndProp<string>("currentBreakpoint", 'md', this, "currentBreakpoint");
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    private __currentSideBarMode: ObservedPropertyAbstract<string> = this.localStorage_.setAndProp<string>("currentSideBarMode", 'list', this, "currentSideBarMode");
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
    private mainController: TabsController;
    private __currentSubIndex: SynchedPropertySimpleTwoWay<number>;
    get currentSubIndex() {
        return this.__currentSubIndex.get();
    }
    set currentSubIndex(newValue: number) {
        this.__currentSubIndex.set(newValue);
    }
    private __currentMainIndex: SynchedPropertySimpleTwoWay<number>;
    get currentMainIndex() {
        return this.__currentMainIndex.get();
    }
    set currentMainIndex(newValue: number) {
        this.__currentMainIndex.set(newValue);
    }
    subControllerChangeIndex(subController: TabsController, index: number) {
        subController.changeIndex(index);
    }
    render() {
        List.create();
        List.margin({ top: StyleConfiguration.getBreakpointStyle(this.currentBreakpoint).sideBarPrimaryNavListMargin });
        List.padding(StyleConfiguration.getSubTabsControllerStyle(this.currentBreakpoint, this.currentSideBarMode)
            .sideBarPrimaryNavListPadding);
        List.height(StyleConfiguration.getBreakpointStyle(this.currentBreakpoint).sideBarPrimaryNavListHeight);
        List.backgroundColor('#f1f3f5');
        List.listDirection(new BreakpointType(Axis.Horizontal, Axis.Vertical, Axis.Vertical).GetValue(this.currentBreakpoint));
        List.width('100%');
        List.alignListItem(ListItemAlign.Center);
        If.create();
        if (new BreakpointType(false, true, true).GetValue(this.currentBreakpoint)) {
            If.branchId(0);
            ListItem.create();
            let earlierCreatedChild_4: AccountInfo = (this && this.findChildById) ? this.findChildById("4") as AccountInfo : undefined;
            if (earlierCreatedChild_4 == undefined) {
                View.create(new AccountInfo("4", this, {}));
            }
            else {
                earlierCreatedChild_4.updateWithValueParams({});
                View.create(earlierCreatedChild_4);
            }
            ListItem.pop();
            ListItem.create();
            let earlierCreatedChild_5: SearchModule = (this && this.findChildById) ? this.findChildById("5") as SearchModule : undefined;
            if (earlierCreatedChild_5 == undefined) {
                View.create(new SearchModule("5", this, {}));
            }
            else {
                earlierCreatedChild_5.updateWithValueParams({});
                View.create(earlierCreatedChild_5);
            }
            ListItem.pop();
        }
        If.pop();
        ForEach.create("7", this, ObservedObject.GetRawObject(this.sideListData), (item: MenuType, index: number) => {
            ListItem.create();
            ListItem.width(StyleConfiguration.getBreakpointStyle(this.currentBreakpoint).sideBarPrimaryNavListItemWidth);
            If.create();
            if (this.currentBreakpoint !== 'sm' && index === this.sideListData.length - 1) {
                If.branchId(0);
            }
            else {
                If.branchId(1);
                Column.create();
                let earlierCreatedChild_6: PrimaryMenu = (this && this.findChildById) ? this.findChildById("6") as PrimaryMenu : undefined;
                if (earlierCreatedChild_6 == undefined) {
                    View.create(new PrimaryMenu("6", this, {
                        sideTitleName: item.name,
                        subTitleNameList: item.subTitleList,
                        changeIndex: () => this.subControllerChangeIndex,
                        tabsController: item.subController,
                        mainTabsController: this.mainController,
                        icon: item.icon,
                        currentSubIndex: this.__currentSubIndex,
                        index: index,
                        currentMainIndex: this.__currentMainIndex
                    }));
                }
                else {
                    earlierCreatedChild_6.updateWithValueParams({
                        sideTitleName: item.name,
                        subTitleNameList: item.subTitleList,
                        changeIndex: () => this.subControllerChangeIndex,
                        tabsController: item.subController,
                        mainTabsController: this.mainController,
                        icon: item.icon,
                        index: index
                    });
                    View.create(earlierCreatedChild_6);
                }
                Column.pop();
            }
            If.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
    }
}
export class PrimaryMenu extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentSubIndex = new SynchedPropertySimpleTwoWay(params.currentSubIndex, this, "currentSubIndex");
        this.__currentMainIndex = new SynchedPropertySimpleTwoWay(params.currentMainIndex, this, "currentMainIndex");
        this.sideTitleName = $r('app.string.index');
        this.subTitleNameList = new Array();
        this.changeIndex = () => {
        };
        this.tabsController = new TabsController();
        this.mainTabsController = new TabsController();
        this.icon = $r('app.media.icon');
        this.index = 0;
        this.__isItemWrap = new ObservedPropertySimple(false, this, "isItemWrap");
        this.__iconList = new ObservedPropertyObject([
            $r('app.media.ic_home_actived'),
            $r('app.media.ic_app_actived'),
            $r('app.media.ic_game_actived'),
            $r('app.media.ic_search_actived'),
            $r('app.media.ic_mine_actived'),
        ], this, "iconList");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PrimaryMenu_Params) {
        if (params.sideTitleName !== undefined) {
            this.sideTitleName = params.sideTitleName;
        }
        if (params.subTitleNameList !== undefined) {
            this.subTitleNameList = params.subTitleNameList;
        }
        if (params.changeIndex !== undefined) {
            this.changeIndex = params.changeIndex;
        }
        if (params.tabsController !== undefined) {
            this.tabsController = params.tabsController;
        }
        if (params.mainTabsController !== undefined) {
            this.mainTabsController = params.mainTabsController;
        }
        if (params.icon !== undefined) {
            this.icon = params.icon;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.isItemWrap !== undefined) {
            this.isItemWrap = params.isItemWrap;
        }
        if (params.iconList !== undefined) {
            this.iconList = params.iconList;
        }
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__currentSideBarMode.aboutToBeDeleted();
        this.__currentSubIndex.aboutToBeDeleted();
        this.__currentMainIndex.aboutToBeDeleted();
        this.__isItemWrap.aboutToBeDeleted();
        this.__iconList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentBreakpoint: ObservedPropertyAbstract<string> = this.localStorage_.setAndProp<string>("currentBreakpoint", 'md', this, "currentBreakpoint");
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    private __currentSideBarMode: ObservedPropertyAbstract<string> = this.localStorage_.setAndProp<string>("currentSideBarMode", 'list', this, "currentSideBarMode");
    get currentSideBarMode() {
        return this.__currentSideBarMode.get();
    }
    set currentSideBarMode(newValue: string) {
        this.__currentSideBarMode.set(newValue);
    }
    private __currentSubIndex: SynchedPropertySimpleTwoWay<number>;
    get currentSubIndex() {
        return this.__currentSubIndex.get();
    }
    set currentSubIndex(newValue: number) {
        this.__currentSubIndex.set(newValue);
    }
    private __currentMainIndex: SynchedPropertySimpleTwoWay<number>;
    get currentMainIndex() {
        return this.__currentMainIndex.get();
    }
    set currentMainIndex(newValue: number) {
        this.__currentMainIndex.set(newValue);
    }
    private sideTitleName: Resource;
    private subTitleNameList: MenuType[];
    private changeIndex: Function;
    private tabsController: TabsController;
    private mainTabsController: TabsController;
    private icon: Resource;
    private index: number;
    private __isItemWrap: ObservedPropertySimple<boolean>;
    get isItemWrap() {
        return this.__isItemWrap.get();
    }
    set isItemWrap(newValue: boolean) {
        this.__isItemWrap.set(newValue);
    }
    private __iconList: ObservedPropertyObject<Resource[]>;
    get iconList() {
        return this.__iconList.get();
    }
    set iconList(newValue: Resource[]) {
        this.__iconList.set(newValue);
    }
    getSelectColor() {
        if (this.index === 0 && (this.index !== this.currentMainIndex || this.currentSideBarMode === 'tabs')) {
            return '#66000000';
        }
        else if (this.currentSideBarMode === 'tabs') {
            return '';
        }
        else {
            return StyleConfiguration.getCurrentMainTabsStyle(this.index, this.currentMainIndex, this.currentBreakpoint)
                .fillColor;
        }
    }
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Flex.backgroundColor('#f1f3f5');
        Column.create();
        Column.alignItems(new BreakpointType(HorizontalAlign.Center, HorizontalAlign.Start, HorizontalAlign.Start).GetValue(this.currentBreakpoint));
        Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Center, alignItems: ItemAlign.Start });
        Flex.create({
            direction: this.isItemWrap ? FlexDirection.Column : new BreakpointType(FlexDirection.Row, FlexDirection.Row, this.currentSideBarMode === 'list' ? FlexDirection.Column : FlexDirection.Row)
                .GetValue(this.currentBreakpoint),
            justifyContent: StyleConfiguration.getSubTabsControllerStyle(this.currentBreakpoint, this.currentSideBarMode)
                .sideBarPrimaryMenuFlexAlign,
            alignItems: ItemAlign.Center,
            alignContent: new BreakpointType(FlexAlign.Start, FlexAlign.Start, FlexAlign.Center).GetValue(this.currentBreakpoint),
        });
        Flex.onClick(() => {
            Context.animateTo({ duration: 300 }, () => {
                this.currentMainIndex = this.index;
                this.currentSubIndex = 0;
                this.mainTabsController.changeIndex(this.index);
            });
        });
        Flex.width('100%');
        Flex.height(new BreakpointType(56, 40, this.currentSideBarMode === 'list' ? 56 : 40)
            .GetValue(this.currentBreakpoint));
        Flex.padding(StyleConfiguration.getSubTabsControllerStyle(this.currentBreakpoint, this.currentSideBarMode)
            .sideBarPrimaryMenuListPadding);
        Flex.onAreaChange((oldVal, newVal) => {
            if (newVal.width > 104) {
                this.isItemWrap = false;
            }
            else {
                this.isItemWrap = true;
            }
        });
        Image.create((this.index === this.currentMainIndex) && (this.currentSideBarMode === 'list' || this.currentBreakpoint === 'sm') ? this.iconList[this.index] : this.icon);
        Image.width(24);
        Image.height(24);
        Image.fillColor(this.getSelectColor());
        Image.margin(this.isItemWrap ? StyleConfiguration.getBreakpointStyle(this.currentBreakpoint)
            .sideBarPrimaryMenuImgMargin : 0);
        If.create();
        if (this.currentSideBarMode === 'tabs' || (this.currentBreakpoint !== 'md' && this.currentSideBarMode === 'list')) {
            If.branchId(0);
            Text.create(this.sideTitleName);
            Text.fontColor(this.currentSideBarMode === 'tabs' ? '#182431' : StyleConfiguration
                .getCurrentMainTabsStyle(this.index, this.currentMainIndex, this.currentBreakpoint)
                .fontColor as ResourceColor);
            Text.fontSize(StyleConfiguration.getBreakpointStyle(this.currentBreakpoint).sideBarPrimaryMenuTextSize);
            Text.height(StyleConfiguration.getBreakpointStyle(this.currentBreakpoint).sideBarPrimaryMenuTextHeight);
            Text.fontWeight(FontWeight.Medium);
            Text.margin(this.currentBreakpoint === 'sm' && !this.isItemWrap ?
                {
                    left: 4
                } : StyleConfiguration.getSubTabsControllerStyle(this.currentBreakpoint, this.currentSideBarMode)
                .sideBarPrimaryMenuTextMargin);
            Text.textAlign(StyleConfiguration.getSubTabsControllerStyle(this.currentBreakpoint, this.currentSideBarMode)
                .primaryMenuTextAlign);
            Text.transition({ type: TransitionType.All, opacity: 0 });
            Text.pop();
        }
        If.pop();
        Flex.pop();
        If.create();
        if (this.currentMainIndex === this.index
            && new BreakpointType(false, true, true).GetValue(this.currentBreakpoint)
            && this.currentSideBarMode === 'tabs') {
            If.branchId(0);
            let earlierCreatedChild_8: SecondaryMenu = (this && this.findChildById) ? this.findChildById("8") as SecondaryMenu : undefined;
            if (earlierCreatedChild_8 == undefined) {
                View.create(new SecondaryMenu("8", this, {
                    subTitleNameList: this.subTitleNameList,
                    changeIndex: this.changeIndex,
                    tabsController: this.tabsController,
                    currentSubIndex: this.__currentSubIndex
                }));
            }
            else {
                earlierCreatedChild_8.updateWithValueParams({
                    subTitleNameList: this.subTitleNameList,
                    changeIndex: this.changeIndex,
                    tabsController: this.tabsController
                });
                View.create(earlierCreatedChild_8);
            }
        }
        If.pop();
        Flex.pop();
        Column.pop();
        Flex.pop();
    }
}
export class SecondaryMenu extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentSubIndex = new SynchedPropertyObjectTwoWay(params.currentSubIndex, this, "currentSubIndex");
        this.subTitleNameList = new Array();
        this.changeIndex = () => {
        };
        this.tabsController = new TabsController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SecondaryMenu_Params) {
        if (params.subTitleNameList !== undefined) {
            this.subTitleNameList = params.subTitleNameList;
        }
        if (params.changeIndex !== undefined) {
            this.changeIndex = params.changeIndex;
        }
        if (params.tabsController !== undefined) {
            this.tabsController = params.tabsController;
        }
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__currentSideBarMode.aboutToBeDeleted();
        this.__currentSubIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentBreakpoint: ObservedPropertyAbstract<string> = this.localStorage_.setAndProp<string>("currentBreakpoint", 'md', this, "currentBreakpoint");
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    private __currentSideBarMode: ObservedPropertyAbstract<string> = this.localStorage_.setAndProp<string>("currentSideBarMode", 'list', this, "currentSideBarMode");
    get currentSideBarMode() {
        return this.__currentSideBarMode.get();
    }
    set currentSideBarMode(newValue: string) {
        this.__currentSideBarMode.set(newValue);
    }
    private __currentSubIndex: SynchedPropertySimpleOneWay<number | undefined>;
    get currentSubIndex() {
        return this.__currentSubIndex.get();
    }
    set currentSubIndex(newValue: number | undefined) {
        this.__currentSubIndex.set(newValue);
    }
    private subTitleNameList: MenuType[];
    private changeIndex: Function;
    private tabsController: TabsController;
    render() {
        Column.create();
        Column.clip(true);
        Column.transition({ opacity: 0 });
        Column.width('100%');
        Column.create();
        Column.width('100%');
        List.create({
            space: StyleConfiguration.getSubTabsControllerStyle(this.currentBreakpoint, this.currentSideBarMode)
                .secondMenuListSpace
        });
        List.width('100%');
        List.listDirection(StyleConfiguration.getSubTabsControllerStyle(this.currentBreakpoint, this.currentSideBarMode)
            .secondMenuListDirection);
        List.alignListItem(ListItemAlign.Center);
        ForEach.create("9", this, ObservedObject.GetRawObject(this.subTitleNameList), (item: MenuType, index: number) => {
            ListItem.create();
            ListItem.onClick(() => {
                Context.animateTo({ duration: 300 }, () => {
                    this.currentSubIndex = index;
                    this.changeIndex(this.tabsController, index);
                });
            });
            Column.create();
            Column.height(StyleConfiguration.getSubTabsControllerStyle(this.currentBreakpoint, this.currentSideBarMode)
                .secondMenuListItemHeight);
            Column.padding({ top: 12, bottom: 12 });
            Column.justifyContent(new BreakpointType(FlexAlign.End, FlexAlign.Center, FlexAlign.Center).GetValue(this.currentBreakpoint));
            Column.alignItems(new BreakpointType(HorizontalAlign.Center, HorizontalAlign.Start, HorizontalAlign.Start).GetValue(this.currentBreakpoint));
            Column.borderRadius(8);
            Column.width(StyleConfiguration.getSubTabsControllerStyle(this.currentBreakpoint, this.currentSideBarMode)
                .secondMenuListItemWidth);
            Column.backgroundColor(StyleConfiguration.getCurrentSubTabsStyle(this.currentBreakpoint, this.currentSideBarMode, index, ObservedObject.GetRawObject(this.currentSubIndex))
                .backgroundColor as ResourceColor);
            Text.create(item.name);
            Text.fontSize(StyleConfiguration.getCurrentSubTabsStyle(this.currentBreakpoint, this.currentSideBarMode, index, ObservedObject.GetRawObject(this.currentSubIndex))
                .fontSize);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(StyleConfiguration.getCurrentSubTabsStyle(this.currentBreakpoint, this.currentSideBarMode, index, ObservedObject.GetRawObject(this.currentSubIndex))
                .fontColor as ResourceColor);
            Text.margin(StyleConfiguration.getSubTabsControllerStyle(this.currentBreakpoint, this.currentSideBarMode)
                .secondMenuListItemMargin);
            Text.pop();
            Column.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Column.pop();
        Column.pop();
    }
}
interface MenuElement {
    value: string;
    action: () => void;
    icon?: Resource;
}
class FootBarTools extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__toolList = new ObservedPropertyObject([
            { value: 'Menu1', action: this.callback, icon: $r('app.media.ic_favourites') },
        ], this, "toolList");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: FootBarTools_Params) {
        if (params.toolList !== undefined) {
            this.toolList = params.toolList;
        }
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__currentSideBarMode.aboutToBeDeleted();
        this.__toolList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentBreakpoint: ObservedPropertyAbstract<string> = this.localStorage_.setAndProp<string>("currentBreakpoint", 'md', this, "currentBreakpoint");
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    private __currentSideBarMode: ObservedPropertyAbstract<string> = this.localStorage_.setAndProp<string>("currentSideBarMode", 'list', this, "currentSideBarMode");
    get currentSideBarMode() {
        return this.__currentSideBarMode.get();
    }
    set currentSideBarMode(newValue: string) {
        this.__currentSideBarMode.set(newValue);
    }
    private __toolList: ObservedPropertyObject<MenuElement[]>;
    get toolList() {
        return this.__toolList.get();
    }
    set toolList(newValue: MenuElement[]) {
        this.__toolList.set(newValue);
    }
    callback() {
    }
    render() {
        Column.create();
        List.create({ space: 24 });
        List.listDirection(Axis.Horizontal);
        List.height(58);
        List.width('100%');
        List.padding(StyleConfiguration.getSubTabsControllerStyle(this.currentBreakpoint, this.currentSideBarMode)
            .toolBarPadding);
        List.alignListItem(ListItemAlign.Center);
        If.create();
        if (this.currentSideBarMode === 'tabs') {
            If.branchId(0);
            ForEach.create("10", this, ObservedObject.GetRawObject(this.toolList), (item: MenuElement) => {
                ListItem.create();
                Image.create(item.icon);
                Image.width(24);
                Image.height(24);
                ListItem.pop();
            });
            ForEach.pop();
            ListItem.create();
            Image.create($r('app.media.add'));
            Image.width(24);
            Image.height(24);
            Image.onClick(() => {
                this.toolList.push({
                    value: `Menu${this.toolList.length + 1}`,
                    action: this.callback,
                    icon: $r('app.media.ic_favourites3')
                });
            });
            Image.id('addTools');
            ListItem.pop();
        }
        else {
            If.branchId(1);
            ListItem.create();
            Column.create();
            Column.width('100%');
            If.create();
            if (this.toolList.length >= 2) {
                If.branchId(0);
                Image.create($r('app.media.more'));
                Image.width(24);
                Image.height(24);
                Image.bindMenu(ObservedObject.GetRawObject(this.toolList), { placement: Placement.TopRight });
                Image.id('moreTools');
            }
            else {
                If.branchId(1);
                Image.create($r('app.media.ic_favourites'));
                Image.width(24);
                Image.height(24);
                Image.fillColor('#e5000000');
            }
            If.pop();
            Column.pop();
            ListItem.pop();
        }
        If.pop();
        List.pop();
        Column.pop();
    }
}
