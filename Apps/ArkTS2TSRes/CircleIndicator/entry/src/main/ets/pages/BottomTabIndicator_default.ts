interface BottomTabIndicator_page_Params {
    controller?: TabsController;
    model?: BottomTabsModel;
    index?: number;
    data?: TabIcon[] | undefined;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BottomTabIndicator_default_" + ++__generate__Id;
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
import { BottomTabsIndicator, BottomTabsModel } from '@ohos/circleindicator';
import { TabIcon } from '@ohos/circleindicator';
class BottomTabIndicator_page extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = new TabsController();
        this.__model = new ObservedPropertyObject(new BottomTabsModel(this.controller), this, "model");
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.data = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BottomTabIndicator_page_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.data !== undefined) {
            this.data = params.data;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: TabsController;
    private __model: ObservedPropertyObject<BottomTabsModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: BottomTabsModel) {
        this.__model.set(newValue);
    }
    private __index: ObservedPropertySimple<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private data: TabIcon[] | undefined;
    aboutToAppear() {
        let data1: TabIcon = {
            text: 'NOUGAT',
            selectIcon: $r('app.media.icon'),
            normalIcon: $r('app.media.icon')
        };
        let data2: TabIcon = {
            text: 'DONUT',
            selectIcon: $r('app.media.icon'),
            normalIcon: $r('app.media.icon')
        };
        let data3: TabIcon = {
            text: 'ECLAIR',
            selectIcon: $r('app.media.icon'),
            normalIcon: $r('app.media.icon')
        };
        let data4: TabIcon = {
            text: 'KITKAT',
            selectIcon: $r('app.media.icon'),
            normalIcon: $r('app.media.icon')
        };
        this.data = [data1, data2, data3, data4];
        this.model
            .setIconsScale(true)
            .setBackgroundColor('#000000')
            .setSelectedTextColor('#ffffff')
            .setUnselectedTextColor('#cfcfcf')
            .setHeight('75vp');
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Tabs.create({ index: this.index, controller: this.controller });
        Tabs.width("100%");
        Tabs.height("90%");
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
        Stack.create();
        Stack.width('100%');
        Stack.backgroundColor(Color.Black);
        Stack.pop();
        Column.pop();
    }
}
loadDocument(new BottomTabIndicator_page("1", undefined, {}));
