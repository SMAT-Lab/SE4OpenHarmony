interface IndicatoCircleScale_Params {
    text?;
    controller?: TabsController;
    model?: CircleModel;
    model2?: CircleModel;
    model1?: CircleModel;
    model3?: CircleModel;
    itemIndex?: number;
    count?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "IndicatoCircleSampleDefault_" + ++__generate__Id;
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
import { CircleIndicator, CircleModel } from '@ohos/circleindicator';
function __Tabs__indicator(onTouchListener: (event: TouchEvent) => void): void {
    Tabs.barWidth(0);
    Tabs.onTouch(onTouchListener);
}
class IndicatoCircleScale extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.text = ["CUPCAKE", "DONUT", "ECLAIR", "GINGERBREAD",
            "HONEYCOMB", "ICE_CREAM_SANDWICH", "JELLY_BEAN", "KITKAT", "LOLLIPOP", "M", "NOUGAT"];
        this.controller = new TabsController();
        this.__model = new ObservedPropertyObject(new CircleModel(this.controller), this, "model");
        this.__model2 = new ObservedPropertyObject(new CircleModel(this.controller), this, "model2");
        this.__model1 = new ObservedPropertyObject(new CircleModel(this.controller), this, "model1");
        this.__model3 = new ObservedPropertyObject(new CircleModel(this.controller), this, "model3");
        this.__itemIndex = new ObservedPropertySimple(0, this, "itemIndex");
        this.__count = new ObservedPropertySimple(0, this, "count");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: IndicatoCircleScale_Params) {
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.model2 !== undefined) {
            this.model2 = params.model2;
        }
        if (params.model1 !== undefined) {
            this.model1 = params.model1;
        }
        if (params.model3 !== undefined) {
            this.model3 = params.model3;
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
        this.__model2.aboutToBeDeleted();
        this.__model1.aboutToBeDeleted();
        this.__model3.aboutToBeDeleted();
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
    private __model2: ObservedPropertyObject<CircleModel>;
    get model2() {
        return this.__model2.get();
    }
    set model2(newValue: CircleModel) {
        this.__model2.set(newValue);
    }
    private __model1: ObservedPropertyObject<CircleModel>;
    get model1() {
        return this.__model1.get();
    }
    set model1(newValue: CircleModel) {
        this.__model1.set(newValue);
    }
    private __model3: ObservedPropertyObject<CircleModel>;
    get model3() {
        return this.__model3.get();
    }
    set model3(newValue: CircleModel) {
        this.__model3.set(newValue);
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
            .setUnselectedColor("#f5eff5")
            .setWidth(230) //总体宽度
            .setHeight(50) //总体高度
            .setRadius(15)
            .setMargin(5)
            .setSnap(true); //移动轨迹
        this.model2 //旋转的矩形
            .setUnselectedColor("#817c81") //矩形背景色
            .setWidth(230) //总体宽度
            .setHeight(50) //总体高度
            .setRectangle(true) //是否矩形
            .setItemWidth(10) //矩形宽度
            .setItemHeight(10) //矩形高度
            .setRotate(true); //开启旋转
        this.model3 //设置移动轨迹
            .setMargin(5) //间隔
            .setRadius(15) //圆形弧度
            .setWidth(230)
            .setHeight(50)
            .setBorderLines(true) //是否显示变框线
            .setStrokeColor("#336699") //边框线颜色
            .setBackgroundColor("#ddaacc"); //总体背景
        this.count = this.text.length;
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor(Color.Pink);
        Tabs.create({ index: this.itemIndex, controller: this.controller });
        Tabs.width("100%");
        Tabs.height("70%");
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
        Column.pop();
    }
}
loadDocument(new IndicatoCircleScale("1", undefined, {}));
