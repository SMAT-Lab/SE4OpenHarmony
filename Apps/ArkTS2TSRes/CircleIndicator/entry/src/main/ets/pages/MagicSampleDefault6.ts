interface MagicSampleDefault_Params {
    initData?: Array<string>;
    controller?: TabsController;
    model6?: MagicScrollTabsModel;
    index?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MagicSampleDefault6_" + ++__generate__Id;
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
//import curves  from '@ohos.curves'
function __Tabs__indicator(onTouchListener: (event: TouchEvent) => void): void {
    Tabs.barWidth(0);
    Tabs.width("100%");
    Tabs.height("80%");
    Tabs.onTouch(onTouchListener);
}
class MagicSampleDefault extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.initData = ["CUPCAKE", "DONUT", "ECLAIR", "GINGERBREAD", "HONEYCOMB", "ICE_CREAM_SANDWICH", "JELLY_BEAN", "KITKAT", "LOLLIPOP", "M", "NOUGAT"];
        this.controller = new TabsController();
        this.__model6 = new ObservedPropertyObject(new MagicScrollTabsModel(this.controller), this, "model6");
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MagicSampleDefault_Params) {
        if (params.initData !== undefined) {
            this.initData = params.initData;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.model6 !== undefined) {
            this.model6 = params.model6;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
    }
    aboutToBeDeleted() {
        this.__model6.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private initData: Array<string>;
    private controller: TabsController;
    private __model6: ObservedPropertyObject<MagicScrollTabsModel>;
    get model6() {
        return this.__model6.get();
    }
    set model6(newValue: MagicScrollTabsModel) {
        this.__model6.set(newValue);
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
        this.model6
            .setTitles(this.initData)
            .setUnselectedTextSize(12)
            .setBackgroundColor(0xfafafa)
            .setSelectedTextColor(0x00c853)
            .setUnselectedTextColor(0x9e9e9e)
            .setStrokeWidth(5)
            .setIndicatorColors(0x00c853)
            .setScrollPivotX(0.65)
            .setTitleMode(MagicTitleMode.COLOR_FLIP)
            .setCursorType(MagicCursorType.LINE)
            .setDividerWidthMode(MagicDividerWidthMode.MODE_EXACTLY)
            .setDividerWidth(10);
        //      .setLeftCurve(curves.cubicBezier(0.7, 0.15, 0.7, 0.15))
        //      .setRightCurve(curves.cubicBezier(0.15, 0.7, 0.15, 0.7))
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
            this.model6.notifyTouch(event, index);
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
loadDocument(new MagicSampleDefault("1", undefined, {}));
