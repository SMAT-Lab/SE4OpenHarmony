interface TabsIndicatorDefault_Params {
    text?;
    icons?: IconItem[];
    controller?: TabsController;
    model?: ScrollTabsModel;
    model2?: ScrollTabsModel;
    model3?: ScrollTabsModel;
    index?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TabsIndicatorDefault_" + ++__generate__Id;
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
import { ScrollTabsIndicator, ScrollTabsModel, IconItem } from '@ohos/circleindicator';
import common from '@ohos.app.ability.common';
function __Tabs__indicator(onTouchListener: (event?: TouchEvent) => void): void {
    Tabs.barWidth(0);
    Tabs.onTouch(onTouchListener);
}
class TabsIndicatorDefault extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.text = ['Calendar', 'Camera', 'Alarms', 'Location', 'Location'];
        this.icons = [];
        this.controller = new TabsController();
        this.__model = new ObservedPropertyObject(new ScrollTabsModel(this.controller), this, "model");
        this.__model2 = new ObservedPropertyObject(new ScrollTabsModel(this.controller), this, "model2");
        this.__model3 = new ObservedPropertyObject(new ScrollTabsModel(this.controller), this, "model3");
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TabsIndicatorDefault_Params) {
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.icons !== undefined) {
            this.icons = params.icons;
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
        if (params.model3 !== undefined) {
            this.model3 = params.model3;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__model2.aboutToBeDeleted();
        this.__model3.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private text;
    private icons: IconItem[];
    public controller: TabsController;
    private __model: ObservedPropertyObject<ScrollTabsModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: ScrollTabsModel) {
        this.__model.set(newValue);
    }
    private __model2: ObservedPropertyObject<ScrollTabsModel>;
    get model2() {
        return this.__model2.get();
    }
    set model2(newValue: ScrollTabsModel) {
        this.__model2.set(newValue);
    }
    private __model3: ObservedPropertyObject<ScrollTabsModel>;
    get model3() {
        return this.__model3.get();
    }
    set model3(newValue: ScrollTabsModel) {
        this.__model3.set(newValue);
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
        Text.create(this.text[index]);
        Text.fontSize(40);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Flex.pop();
    }
    public aboutToAppear() {
        let ctx = getContext(this).createModuleContext('sharedlibrary') as common.UIAbilityContext;
        let icon1: IconItem = { normal: $r("app.media.alarms_normal"), selected: $r("app.media.alarms_selected") };
        let icon2: IconItem = {
            normal: $r("app.media.calendar_normal"),
            selected: $r("app.media.calendar_selected")
        };
        let icon3: IconItem = { normal: $r("app.media.camera_normal"), selected: $r("app.media.camera_selected") };
        let icon4: IconItem = {
            normal: $r("app.media.location_normal"),
            selected: $r("app.media.location_selected")
        };
        let icon5: IconItem = {
            normal: $r("app.media.location_normal"),
            selected: $r("app.media.location_selected")
        };
        this.icons = [icon1, icon2, icon3, icon4, icon5];
        this.model.setSnap(false)
            .setIcons(this.icons)
            .setShowDivider(true)
            .setSelectedTextColor("#292626")
            .setBackgroundColor("#dddddd")
            .setIconSize($r('app.float.float40vp'), ctx)
            .setSelectedTextSize($r('app.float.float15vp'), ctx)
            .setUnselectedTextSize($r('app.float.float10vp'), ctx);
        this.model2.setSnap(false)
            .setShowDivider(true)
            .setBackgroundColor("#dddddd")
            .setSelectedTextColor("#292626")
            .setSelectedTextSize($r('app.float.float15vp'), ctx)
            .setUnselectedTextSize($r('app.float.float10vp'), ctx)
            .setWidth($r('app.float.float30vp'), ctx)
            .setHeight($r('app.float.float20vp'), ctx)
            .setCursorWidth($r('app.float.float30vp'), ctx)
            .setCursorHeight($r('app.float.float3vp'), ctx);
        this.model3.setSnap(false)
            .setUnselectedTextColor("#ffffff")
            .setShowDivider(false)
            .setBackgroundColor("#000000")
            .setSelectedTextColor("#ffffff")
            .setCursorColor("#2894ff")
            .setDividerColor("#2894ff")
            .setSelectedTextSize($r('app.float.float15vp'), ctx)
            .setUnselectedTextSize($r('app.float.float10vp'), ctx)
            .setWidth($r('app.float.float30vp'), ctx)
            .setHeight($r('app.float.float20vp'), ctx)
            .setCursorWidth($r('app.float.float30vp'), ctx)
            .setCursorHeight($r('app.float.float3vp'), ctx);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor("#ffffff");
        Tabs.create({ index: this.index, controller: this.controller });
        Tabs.width("100%");
        Tabs.height("80%");
        Tabs.onChange((index) => {
            this.index = index;
        });
        __Tabs__indicator((event: TouchEvent) => {
            this.model.notifyTouch(event, this.index);
        });
        TabContent.create();
        this.SquareText(0, this);
        TabContent.pop();
        TabContent.create();
        this.SquareText(1, this);
        TabContent.pop();
        TabContent.create();
        this.SquareText(2, this);
        TabContent.pop();
        TabContent.create();
        this.SquareText(3, this);
        TabContent.pop();
        TabContent.create();
        this.SquareText(4, this);
        TabContent.pop();
        Tabs.pop();
        Column.pop();
    }
}
loadDocument(new TabsIndicatorDefault("1", undefined, {}));
