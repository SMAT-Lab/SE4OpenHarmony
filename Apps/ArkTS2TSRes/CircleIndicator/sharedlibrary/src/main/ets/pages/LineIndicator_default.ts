interface LineIndicator_page_Params {
    controller?: TabsController;
    model?: LineModel;
    index?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LineIndicator_default_" + ++__generate__Id;
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
import { LineIndicator, LineModel } from '@ohos/circleindicator';
import common from '@ohos.app.ability.common';
class LineIndicator_page extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = new TabsController();
        this.__model = new ObservedPropertyObject(new LineModel(this.controller), this, "model");
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: LineIndicator_page_Params) {
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
    private __model: ObservedPropertyObject<LineModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: LineModel) {
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
        let ctx = getContext(this).createModuleContext('sharedlibrary') as common.UIAbilityContext;
        this.model.setHeight('40vp')
            .setStrokeWidth($r('app.float.float2vp'), ctx)
            .setLineWidth($r('app.float.float30vp'), ctx)
            .setMargin($r('app.float.float5vp'), ctx);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Tabs.create({ index: this.index, controller: this.controller });
        Tabs.width("100%");
        Tabs.height("95%");
        Tabs.onChange((index) => {
            this.index = index;
        });
        Tabs.barWidth(0);
        Tabs.barHeight(0);
        Tabs.onTouch((event: TouchEvent) => {
            this.model.notifyTouch(event, this.index);
        });
        TabContent.create();
        Image.create($r('app.media.p1'));
        TabContent.pop();
        TabContent.create();
        Image.create($r('app.media.p2'));
        TabContent.pop();
        TabContent.create();
        Image.create($r('app.media.p3'));
        TabContent.pop();
        TabContent.create();
        Image.create($r('app.media.p4'));
        TabContent.pop();
        Tabs.pop();
        Column.pop();
    }
}
loadDocument(new LineIndicator_page("1", undefined, {}));
