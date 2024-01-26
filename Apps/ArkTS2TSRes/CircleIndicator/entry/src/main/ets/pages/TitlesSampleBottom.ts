interface TitlesSampleBottom_Params {
    tabsController?: TabsController;
    model?: TitleModel;
    titles?: string[];
    index?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TitlesSampleBottom_" + ++__generate__Id;
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
import { TitleIndicator } from '@ohos/circleindicator';
import { TitleModel, TitleLinePosition } from '@ohos/circleindicator';
class TitlesSampleBottom extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.tabsController = new TabsController();
        this.__model = new ObservedPropertyObject(new TitleModel(this.tabsController), this, "model");
        this.titles = ["This", "Is", "A", "Test"];
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TitlesSampleBottom_Params) {
        if (params.tabsController !== undefined) {
            this.tabsController = params.tabsController;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.titles !== undefined) {
            this.titles = params.titles;
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
    private tabsController: TabsController;
    private __model: ObservedPropertyObject<TitleModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: TitleModel) {
        this.__model.set(newValue);
    }
    private titles: string[];
    private __index: ObservedPropertySimple<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    makeTabContent(index: number, parent = null) {
        TabContent.create();
        TabContent.width('100%');
        TabContent.height('100%');
        Stack.create();
        Stack.width('100%');
        Stack.height('100%');
        Text.create(this.calcText(this.titles[index]));
        Text.fontSize(68);
        Text.fontColor(0x777777);
        Text.margin({ right: 8, left: 8 });
        Text.pop();
        Stack.pop();
        TabContent.pop();
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Tabs.create({ controller: this.tabsController });
        Tabs.width('100%');
        Tabs.height("100%");
        Tabs.onChange((index) => {
            this.index = index;
        });
        Tabs.barHeight(0);
        Tabs.onTouch((event: TouchEvent) => {
            this.model.notifyTouch(event, this.index);
        });
        this.makeTabContent(0, this);
        this.makeTabContent(1, this);
        this.makeTabContent(2, this);
        this.makeTabContent(3, this);
        Tabs.pop();
        Flex.pop();
    }
    aboutToAppear() {
        this.model
            .setBackgroundColor(0xffcccccc)
            .setLinePosition(TitleLinePosition.TOP);
    }
    calcText(text: string): string {
        return (text + " ").repeat(20);
    }
}
loadDocument(new TitlesSampleBottom("1", undefined, {}));
