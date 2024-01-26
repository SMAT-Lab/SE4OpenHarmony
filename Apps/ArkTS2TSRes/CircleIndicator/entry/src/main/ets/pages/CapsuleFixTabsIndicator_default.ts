interface CapsuleFixTabsIndicator_page_Params {
    controller?: TabsController;
    model?: CapsuleFixTabsModel;
    index?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CapsuleFixTabsIndicator_default_" + ++__generate__Id;
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
import { CapsuleFixTabsIndicator, CapsuleFixTabsModel } from '@ohos/circleindicator';
class CapsuleFixTabsIndicator_page extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = new TabsController();
        this.__model = new ObservedPropertyObject(new CapsuleFixTabsModel(this.controller), this, "model");
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CapsuleFixTabsIndicator_page_Params) {
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
        this.__model.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: TabsController;
    private __model: ObservedPropertyObject<CapsuleFixTabsModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: CapsuleFixTabsModel) {
        this.__model.set(newValue);
    }
    private __index: ObservedPropertySimple<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    aboutToAppear() {
        this.model
            .setSelectedTextColor('#ffffff')
            .setUnselectedTextColor('#d7674e')
            .setFillColor('#a7271c')
            .setWidth(250)
            .setUnselectedTextSize(17)
            .setSelectedTextSize(17)
            .setBackgroundColor('#dddddd');
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Tabs.create({ index: this.index, controller: this.controller });
        Tabs.width("100%");
        Tabs.height("100%");
        Tabs.onChange((index) => {
            this.index = index;
        });
        Tabs.barWidth(0);
        Tabs.barHeight(0);
        Tabs.onTouch((event: TouchEvent) => {
            this.model.notifyTouch(event, this.index);
        });
        Tabs.backgroundColor('#aaaaaa');
        TabContent.create();
        Image.create($r('app.media.p1'));
        TabContent.pop();
        TabContent.create();
        Image.create($r('app.media.p2'));
        TabContent.pop();
        TabContent.create();
        Image.create($r('app.media.p3'));
        TabContent.pop();
        Tabs.pop();
        Column.pop();
    }
}
loadDocument(new CapsuleFixTabsIndicator_page("1", undefined, {}));
