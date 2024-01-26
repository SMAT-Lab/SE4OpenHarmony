interface SpringSampleDefault_Params {
    initData?: number[];
    controller?: TabsController;
    model?: SpringScrollTabsModel;
    itemIndex?: number;
    isShow?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SpringSampleDefault_" + ++__generate__Id;
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
import { SpringScrollTabsIndicator, SpringScrollTabsModel } from '@ohos/circleindicator';
function __Tabs__indicator(onTouchListener: (event: TouchEvent) => void): void {
    Tabs.barWidth(0);
    Tabs.width("100%");
    Tabs.height("60%");
    Tabs.onTouch(onTouchListener);
}
class SpringSampleDefault extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.initData = Array.from(new Array(16).keys());
        this.controller = new TabsController();
        this.__model = new ObservedPropertyObject(new SpringScrollTabsModel(this.controller), this, "model");
        this.__itemIndex = new ObservedPropertySimple(2, this, "itemIndex");
        this.__isShow = new ObservedPropertySimple(false, this, "isShow");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SpringSampleDefault_Params) {
        if (params.initData !== undefined) {
            this.initData = params.initData;
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
        if (params.isShow !== undefined) {
            this.isShow = params.isShow;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__itemIndex.aboutToBeDeleted();
        this.__isShow.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private initData: number[];
    private controller: TabsController;
    private __model: ObservedPropertyObject<SpringScrollTabsModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SpringScrollTabsModel) {
        this.__model.set(newValue);
    }
    private __itemIndex: ObservedPropertySimple<number>;
    get itemIndex() {
        return this.__itemIndex.get();
    }
    set itemIndex(newValue: number) {
        this.__itemIndex.set(newValue);
    }
    private __isShow: ObservedPropertySimple<boolean>;
    get isShow() {
        return this.__isShow.get();
    }
    set isShow(newValue: boolean) {
        this.__isShow.set(newValue);
    }
    SquareText(index: number, parent = null) {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.height("100%");
        Flex.width("100%");
        Flex.padding(15);
        If.create();
        if (this.isShow) {
            If.branchId(0);
            Text.create("" + this.initData[index] + "界面加载完毕");
            Text.fontSize(20);
            Text.textAlign(TextAlign.Center);
            Text.pop();
        }
        else {
            If.branchId(1);
            Image.create($r('app.media.loading'));
            Image.width(100);
            Image.height(100);
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
            .setHeight(50)
            .setUnselectTextSize(14)
            .setSelectedTextSize(20)
            .setUnselectTextColor("#000000")
            .setSelectedTextColor("#f8f8f8")
            .setMaxRadiusPercent(0.8)
            .setMinRadiusPercent(0.2);
        setTimeout(() => {
            this.isShow = !this.isShow;
        }, 2500);
    }
    render() {
        Column.create({ space: 5 });
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor("#eeeeee");
        Tabs.create({ index: this.itemIndex, controller: this.controller });
        Tabs.onChange((index) => {
            this.itemIndex = index;
        });
        __Tabs__indicator((event: TouchEvent) => {
            let itemIndex = this.itemIndex;
            this.model.notifyTouch(event, itemIndex);
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
        this.TabContentSimple(11, this);
        this.TabContentSimple(12, this);
        this.TabContentSimple(13, this);
        this.TabContentSimple(14, this);
        this.TabContentSimple(15, this);
        Tabs.pop();
        Column.pop();
    }
}
loadDocument(new SpringSampleDefault("1", undefined, {}));
