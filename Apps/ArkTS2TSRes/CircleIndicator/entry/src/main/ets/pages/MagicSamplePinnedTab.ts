interface MagicSamplePinnedTab_Params {
    initData?: Array<string>;
    curData?: Array<string>;
    initDataLoading?: Array<boolean>;
    controller?: TabsController;
    model?: MagicScrollTabsModel;
    index?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MagicSamplePinnedTab_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { MagicScrollTabsIndicator, MagicScrollTabsModel, MagicTitleMode, MagicCursorType, MagicDividerWidthMode } from '@ohos/circleindicator';
function __Tabs__indicator(onTouchListener: (event: TouchEvent) => void): void {
    Tabs.barWidth(0);
    Tabs.width("100%");
    Tabs.height("60%");
    Tabs.onTouch(onTouchListener);
}
class MagicSamplePinnedTab extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.initData = ["CUPCAKE", "DONUT", "FROYO", "GINGERBREAD", "HONEYCOMB", "ICE CREAM SANDWICH", "JELLY BEAN", "KITKAT"];
        this.__curData = new ObservedPropertyObject(this.initData, this, "curData");
        this.__initDataLoading = new ObservedPropertyObject(new Array(), this, "initDataLoading");
        this.controller = new TabsController();
        this.__model = new ObservedPropertyObject(new MagicScrollTabsModel(this.controller), this, "model");
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.updateWithValueParams(params);
        this.declareWatch("index", this.itemIndexChange);
    }
    updateWithValueParams(params: MagicSamplePinnedTab_Params) {
        if (params.initData !== undefined) {
            this.initData = params.initData;
        }
        if (params.curData !== undefined) {
            this.curData = params.curData;
        }
        if (params.initDataLoading !== undefined) {
            this.initDataLoading = params.initDataLoading;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
    }
    aboutToBeDeleted() {
        this.__curData.aboutToBeDeleted();
        this.__initDataLoading.aboutToBeDeleted();
        this.__model.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private initData: Array<string>;
    private __curData: ObservedPropertyObject<Array<string>>;
    get curData() {
        return this.__curData.get();
    }
    set curData(newValue: Array<string>) {
        this.__curData.set(newValue);
    }
    private __initDataLoading: ObservedPropertyObject<Array<boolean>>;
    get initDataLoading() {
        return this.__initDataLoading.get();
    }
    set initDataLoading(newValue: Array<boolean>) {
        this.__initDataLoading.set(newValue);
    }
    private controller: TabsController;
    private __model: ObservedPropertyObject<MagicScrollTabsModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: MagicScrollTabsModel) {
        this.__model.set(newValue);
    }
    private __index: ObservedPropertySimple<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    itemIndexChange() {
        setTimeout(() => {
            this.initDataLoading[this.index] = true;
        }, 2000);
    }
    buildButton(text: string, click: Function, auto: boolean, parent = null) {
        Column.create();
        Column.backgroundColor(0xeeeeee);
        Column.padding(10);
        Column.border({ width: 2, color: "#999999", radius: 5 });
        Column.onClick(() => {
            click();
        });
        Text.create(auto ? text : "不" + text);
        Text.fontSize(20);
        Text.pop();
        Flex.create();
        Flex.height(10);
        Flex.width(50);
        Flex.border({ width: 1, color: "#999999", radius: 5 });
        Flex.backgroundColor(auto ? "#66ff66" : "#ffffff");
        Flex.pop();
        Column.pop();
    }
    numButton(num: number, parent = null) {
        Column.create();
        Column.backgroundColor(0xeeeeee);
        Column.padding(10);
        Column.border({ width: 2, color: "#999999", radius: 5 });
        Column.onClick(() => {
            this.curData = this.initData.slice(0, num);
            this.model.setMaxNum(num);
            this.initDataLoading = new Array();
            if (num <= this.index) {
                this.index = 0;
            }
            setTimeout(() => {
                this.initDataLoading[this.index] = true;
            }, 2000);
        });
        Text.create(num + "个");
        Text.fontSize(16);
        Text.pop();
        Column.pop();
    }
    SquareText(index: number, parent = null) {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.height("100%");
        Flex.width("100%");
        Flex.padding(15);
        If.create();
        if (this.initDataLoading[index]) {
            If.branchId(0);
            Text.create("界面" + index + "加载完成");
            Text.fontSize(16);
            Text.textAlign(TextAlign.Center);
            Text.pop();
        }
        else {
            If.branchId(1);
            Image.create($r("app.media.loading"));
            Image.width(60);
            Image.height(60);
        }
        If.pop();
        Flex.pop();
    }
    TabContentSimple(index: number, parent = null) {
        TabContent.create();
        this.SquareText(index, this);
        TabContent.pop();
    }
    aboutToAppear() {
        this.model
            .setTitles(this.initData)
            .setPinnedTabView(true)
            .setAdjustMode(false)
            .setCursorType(MagicCursorType.WRAP)
            .setHorizontalPadding(5)
            .setFillColor(0xffffff)
            .setUnselectedTextColor(0xffffff)
            .setSelectedTextColor(0xff0000)
            .setBackgroundColor(0xff0000)
            .setTitleMode(MagicTitleMode.COLOR_GRADIENT)
            .setPinnedTabBgColor(0xff0000);
        setTimeout(() => {
            this.initDataLoading[this.index] = true;
        }, 2000);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start });
        Flex.width("100%");
        Flex.height("16%");
        Row.create({ space: 20 });
        this.buildButton("自动布局", () => {
            this.model.setAdjustMode(!this.model.isAdjustMode());
        }, this.model.isAdjustMode(), this);
        this.buildButton("固定首个tab", () => {
            this.model.setPinnedTabView(!this.model.isPinnedTabView());
        }, this.model.isPinnedTabView(), this);
        Row.pop();
        Row.create({ space: 20 });
        Row.margin({ top: 5, bottom: 5 });
        this.numButton(3, this);
        this.numButton(4, this);
        this.numButton(5, this);
        this.numButton(12, this);
        Row.pop();
        Flex.pop();
        Tabs.create({ index: this.index, controller: this.controller });
        Tabs.onChange((index: number) => {
            this.index = index;
        });
        __Tabs__indicator((event: TouchEvent) => {
            this.model.notifyTouch(event, this.index);
        });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.curData), (item: string, idx: number) => {
            this.TabContentSimple(idx, this);
        }, (item: string) => JSON.stringify(item));
        ForEach.pop();
        Tabs.pop();
        Column.pop();
    }
}
loadDocument(new MagicSamplePinnedTab("1", undefined, {}));
