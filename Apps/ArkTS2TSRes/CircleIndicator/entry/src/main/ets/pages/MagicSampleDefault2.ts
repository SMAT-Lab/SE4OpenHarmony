interface MagicSampleDefault2_Params {
    initData?: Array<string>;
    controller?: TabsController;
    model2?: MagicScrollTabsModel;
    index?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MagicSampleDefault2_" + ++__generate__Id;
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
    Tabs.height("80%");
    Tabs.onTouch(onTouchListener);
}
class MagicSampleDefault2 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.initData = ["CUPCAKE", "DONUT", "ECLAIR", "GINGERBREAD", "HONEYCOMB", "ICE_CREAM_SANDWICH", "JELLY_BEAN", "KITKAT", "LOLLIPOP", "M", "NOUGAT"];
        this.controller = new TabsController();
        this.__model2 = new ObservedPropertyObject(new MagicScrollTabsModel(this.controller), this, "model2");
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MagicSampleDefault2_Params) {
        if (params.initData !== undefined) {
            this.initData = params.initData;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.model2 !== undefined) {
            this.model2 = params.model2;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
    }
    aboutToBeDeleted() {
        this.__model2.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private initData: Array<string>;
    private controller: TabsController;
    private __model2: ObservedPropertyObject<MagicScrollTabsModel>;
    get model2() {
        return this.__model2.get();
    }
    set model2(newValue: MagicScrollTabsModel) {
        this.__model2.set(newValue);
    }
    private __index: ObservedPropertySimple<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    SquareText(index: number, parent = null) {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.height("100%");
        Flex.width("100%");
        Flex.padding(15);
        Text.create(this.initData[index]);
        Text.fontSize(20);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Flex.pop();
    }
    TabContentSimple(index: number, parent = null) {
        TabContent.create();
        this.SquareText(index, this);
        TabContent.pop();
    }
    aboutToAppear() {
        this.model2
            .setTitles(this.initData)
            .setCursorType(MagicCursorType.LINE)
            .setSelectedTextSize(18)
            .setBackgroundColor(0x00c853)
            .setSelectedTextColor(0xffffff)
            .setUnselectedTextColor(0xc8e6c9)
            .setDividerWidthMode(MagicDividerWidthMode.MODE_EXACTLY)
            .setDividerWidth(10)
            .setStrokeWidth(3)
            .setScrollPivotX(0.25);
    }
    render() {
        Column.create({ space: 5 });
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor(0xeeeeee);
        Tabs.create({ index: this.index, controller: this.controller });
        Tabs.onChange((index) => {
            this.index = index;
        });
        __Tabs__indicator((event: TouchEvent) => {
            let index = this.index;
            this.model2.notifyTouch(event, index);
        });
        this.TabContentSimple(0, this);
        this.TabContentSimple(1, this);
        this.TabContentSimple(2, this);
        this.TabContentSimple(3, this);
        this.TabContentSimple(4, this);
        this.TabContentSimple(5, this);
        this.TabContentSimple(6, this);
        this.TabContentSimple(7, this);
        this.TabContentSimple(8, this);
        this.TabContentSimple(9, this);
        this.TabContentSimple(10, this);
        Tabs.pop();
        Column.pop();
    }
}
loadDocument(new MagicSampleDefault2("1", undefined, {}));
