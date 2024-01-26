interface TriangularSampleIndicator_Params {
    data?: Array<string>;
    controller?: TabsController;
    model?: TriangularModel;
    itemIndex?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TriangularSampleIndicator_" + ++__generate__Id;
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
import Curves from '@ohos.curves';
import { TriangularIndicator, TriangularModel } from '@ohos/circleindicator';
import common from '@ohos.app.ability.common';
class TriangularSampleIndicator extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.data = ["CUPCAKE", "DONUT", "ECLAIR", "GINGERBREAD", "NOUGAT", "DONUT"];
        this.controller = new TabsController();
        this.__model = new ObservedPropertyObject(new TriangularModel(this.controller), this, "model");
        this.__itemIndex = new ObservedPropertySimple(0, this, "itemIndex");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TriangularSampleIndicator_Params) {
        if (params.data !== undefined) {
            this.data = params.data;
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
        this.__model.aboutToBeDeleted();
        this.__itemIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private data: Array<string>;
    private controller: TabsController;
    private __model: ObservedPropertyObject<TriangularModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: TriangularModel) {
        this.__model.set(newValue);
    }
    private __itemIndex: ObservedPropertySimple<number>;
    get itemIndex() {
        return this.__itemIndex.get();
    }
    set itemIndex(newValue: number) {
        this.__itemIndex.set(newValue);
    }
    aboutToAppear() {
        let ctx = getContext(this).createModuleContext('sharedlibrary') as common.UIAbilityContext;
        this.model
            .setReverse(true)
            .setLineHeight(4)
            .setTriangleWidth($r('app.float.float30vp'), ctx)
            .setTriangleHeight($r('app.float.float10vp'), ctx)
            .setLineHeight($r('app.float.float2vp'), ctx)
            .setLineColor("#e94220")
            .setBackgroundColor("#eeeeee")
            .setChangeListener((itemIndex: number) => {
            console.info("change page to " + this.data[itemIndex]);
        });
    }
    SquareText(index: number, parent = null) {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.height("100%");
        Flex.width("100%");
        Flex.padding(15);
        Text.create(this.data[index]);
        Text.fontSize(30);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Flex.pop();
    }
    TabContentSample(index: number, parent = null) {
        TabContent.create();
        this.SquareText(index, this);
        TabContent.pop();
    }
    render() {
        Column.create();
        Column.padding({ top: 40 });
        Column.backgroundColor("#eeeeee");
        Tabs.create({ index: this.itemIndex, controller: this.controller });
        Tabs.onChange((index) => {
            this.itemIndex = index;
        });
        Tabs.barWidth(0);
        Tabs.onTouch((event: TouchEvent) => {
            this.model.notifyTouch(event, this.itemIndex);
        });
        this.TabContentSample(0, this);
        this.TabContentSample(1, this);
        this.TabContentSample(2, this);
        this.TabContentSample(3, this);
        this.TabContentSample(4, this);
        this.TabContentSample(5, this);
        Tabs.pop();
        Column.pop();
    }
}
loadDocument(new TriangularSampleIndicator("1", undefined, {}));
