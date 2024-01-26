interface CircleSampleChangDrawable_Params {
    text?: string[];
    count?: number;
    controller?: TabsController;
    model?: CircleModel;
    itemIndex?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "circleSampleChangDrawable_" + ++__generate__Id;
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
class CircleSampleChangDrawable extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__text = new ObservedPropertyObject(["1", "2", "3", "4", "5"], this, "text");
        this.__count = new ObservedPropertySimple(0, this, "count");
        this.controller = new TabsController();
        this.__model = new ObservedPropertyObject(new CircleModel(this.controller), this, "model");
        this.__itemIndex = new ObservedPropertySimple(0, this, "itemIndex");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CircleSampleChangDrawable_Params) {
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.count !== undefined) {
            this.count = params.count;
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
    }
    aboutToBeDeleted() {
        this.__text.aboutToBeDeleted();
        this.__count.aboutToBeDeleted();
        this.__model.aboutToBeDeleted();
        this.__itemIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __text: ObservedPropertyObject<string[]>;
    get text() {
        return this.__text.get();
    }
    set text(newValue: string[]) {
        this.__text.set(newValue);
    }
    private __count: ObservedPropertySimple<number>;
    get count() {
        return this.__count.get();
    }
    set count(newValue: number) {
        this.__count.set(newValue);
    }
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
            .setWidth(130) //总体宽度
            .setHeight(50) //总体高度
            .setRadius(10)
            .setMargin(10)
            .setBackgroundGradient(true) //背景渐变
            .setScale(true) //放大缩小
            .setFillColor("#ffffff")
            .setUnselectedColor("#555555");
        this.count = this.text.length;
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor(Color.Pink);
        Row.create();
        Button.createWithLabel('CHANGE DRAWABLE', { type: ButtonType.Normal });
        Button.fontSize(15);
        Button.width(130);
        Button.height(50);
        Button.backgroundColor("#555555");
        Button.borderRadius(5);
        Button.onClick(() => {
            this.model
                .setFillColor("#555555")
                .setUnselectedColor("#ffffff");
        });
        Button.pop();
        Button.createWithLabel('TINT DRAWABLE', { type: ButtonType.Normal });
        Button.fontSize(15);
        Button.width(130);
        Button.height(50);
        Button.backgroundColor("#555555");
        Button.borderRadius(5);
        Button.margin({ left: 80 });
        Button.onClick(() => {
            this.model
                .setFillColor("#e538c9")
                .setUnselectedColor("#0055ff");
        });
        Button.pop();
        Row.pop();
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
        Tabs.pop();
        Column.pop();
    }
}
loadDocument(new CircleSampleChangDrawable("1", undefined, {}));
