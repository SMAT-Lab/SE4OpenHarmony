interface IconsSampleDefault_Params {
    iconItems?: Array<IconItem>;
    initData?: Array<string>;
    controller?: TabsController;
    model?: IconModel;
    index?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "IconsSampleDefault_" + ++__generate__Id;
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
import { IconIndicator, IconItem, IconModel } from '@ohos/circleindicator';
import prompt from '@system.prompt';
import common from '@ohos.app.ability.common';
function __Tabs__indicator(that: any): void {
    Tabs.barWidth(0);
    Tabs.width("100%");
    Tabs.height("90%");
    Tabs.onChange((index: number) => {
        that.index = index;
    });
}
class IconsSampleDefault extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.iconItems = [{
                normal: $r("app.media.alarms_normal"),
                selected: $r("app.media.alarms_selected")
            }, {
                normal: $r("app.media.calendar_normal"),
                selected: $r("app.media.calendar_selected")
            }, {
                normal: $r("app.media.camera_normal"),
                selected: $r("app.media.camera_selected")
            }, {
                normal: $r("app.media.location_normal"),
                selected: $r("app.media.location_selected")
            }];
        this.initData = ["This ", "Is", "A", "Test"];
        this.controller = new TabsController();
        this.__model = new ObservedPropertyObject(new IconModel(this.controller), this, "model");
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: IconsSampleDefault_Params) {
        if (params.iconItems !== undefined) {
            this.iconItems = params.iconItems;
        }
        if (params.initData !== undefined) {
            this.initData = params.initData;
        }
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
    private iconItems: Array<IconItem>;
    private initData: Array<string>;
    private controller: TabsController;
    private __model: ObservedPropertyObject<IconModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: IconModel) {
        this.__model.set(newValue);
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
        Text.fontSize(40);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Flex.pop();
    }
    aboutToAppear() {
        let ctx = getContext(this).createModuleContext('sharedlibrary') as common.UIAbilityContext;
        this.model
            .setBackgroundColor("#eeeeee")
            .setMargin($r('app.float.float5vp'), ctx)
            .setSize($r('app.float.float30vp'), ctx)
            .setChangeListener((index: number) => {
            prompt.showToast({
                message: "change page to " + index
            });
        });
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Tabs.create({ index: this.index, controller: this.controller });
        __Tabs__indicator(this);
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
        Tabs.pop();
        Column.pop();
    }
}
loadDocument(new IconsSampleDefault("1", undefined, {}));
