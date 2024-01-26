interface IndicatoCircleVertical_Params {
    text?;
    controller?: TabsController;
    model?: CircleModel;
    itemIndex?: number;
    count?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "IndicatoCircleSampleVertical_" + ++__generate__Id;
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
import { CircleIndicator, CircleModel, CircleOrientation } from '@ohos/circleindicator';
function __Tabs__indicator(onTouchListener: (event: TouchEvent) => void): void {
    Tabs.barWidth(0);
    Tabs.width("90%");
    Tabs.height("100%");
    Tabs.vertical(true);
    Tabs.onTouch(onTouchListener);
}
class IndicatoCircleVertical extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.text = ["CUPCAKE", "DONUT", "ECLAIR", "GINGERBREAD",
            "HONEYCOMB", "ICE_CREAM_SANDWICH", "JELLY_BEAN", "KITKAT", "LOLLIPOP", "M", "NOUGAT"];
        this.controller = new TabsController();
        this.__model = new ObservedPropertyObject(new CircleModel(this.controller), this, "model");
        this.__itemIndex = new ObservedPropertySimple(0, this, "itemIndex");
        this.__count = new ObservedPropertySimple(0, this, "count");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: IndicatoCircleVertical_Params) {
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.itemIndex !== undefined) {
            this.itemIndex = params.itemIndex;
        }
        if (params.count !== undefined) {
            this.count = params.count;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__itemIndex.aboutToBeDeleted();
        this.__count.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private text;
    private controller: TabsController;
    private __model: ObservedPropertyObject<CircleModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: CircleModel) {
        this.__model.set(newValue);
    }
    private __itemIndex: ObservedPropertySimple<number>;
    get itemIndex() {
        return this.__itemIndex.get();
    }
    set itemIndex(newValue: number) {
        this.__itemIndex.set(newValue);
    }
    private __count: ObservedPropertySimple<number>;
    get count() {
        return this.__count.get();
    }
    set count(newValue: number) {
        this.__count.set(newValue);
    }
    SquareText(index: number, parent = null) {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.height("100%");
        Flex.width("100%");
        Flex.padding(15);
        Text.create(this.text[index]);
        Text.fontSize(40);
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
        this.model
            .setCentered(true)
            .setRadius(8)
            .setOrientation(CircleOrientation.VERTICAL) //设置垂直方向
            .setBackgroundColor("#dddddd")
            .setWidth(72)
            .setHeight('1280px');
        this.count = this.text.length;
    }
    render() {
        Row.create();
        Row.width('100%');
        Row.height('100%');
        Tabs.create({ index: this.itemIndex, controller: this.controller });
        Tabs.onChange((index) => {
            this.itemIndex = index;
        });
        __Tabs__indicator((event: TouchEvent) => {
            this.model.notifyTouch(event, this.itemIndex);
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
        Row.pop();
    }
}
loadDocument(new IndicatoCircleVertical("1", undefined, {}));
