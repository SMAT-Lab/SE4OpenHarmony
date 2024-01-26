interface Index_Params {
    fontColor?: string;
    selectedFontColor?: string;
    currentIndex?: number;
    controller?: TabsController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import { Encrypt } from '../tab/Encrypt';
import { Decrypt } from '../tab/Decrypt';
import { Sign } from '../tab/Sign';
import { Verify } from '../tab/Verify';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__fontColor = new ObservedPropertySimple('#182431', this, "fontColor");
        this.__selectedFontColor = new ObservedPropertySimple('#007DFF', this, "selectedFontColor");
        this.__currentIndex = new ObservedPropertySimple(0, this, "currentIndex");
        this.controller = new TabsController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.fontColor !== undefined) {
            this.fontColor = params.fontColor;
        }
        if (params.selectedFontColor !== undefined) {
            this.selectedFontColor = params.selectedFontColor;
        }
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__fontColor.aboutToBeDeleted();
        this.__selectedFontColor.aboutToBeDeleted();
        this.__currentIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __fontColor: ObservedPropertySimple<string>;
    get fontColor() {
        return this.__fontColor.get();
    }
    set fontColor(newValue: string) {
        this.__fontColor.set(newValue);
    }
    private __selectedFontColor: ObservedPropertySimple<string>;
    get selectedFontColor() {
        return this.__selectedFontColor.get();
    }
    set selectedFontColor(newValue: string) {
        this.__selectedFontColor.set(newValue);
    }
    private __currentIndex: ObservedPropertySimple<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    private controller: TabsController;
    TabBuilder(index: number, name: Resource, parent = null) {
        Column.create();
        Text.create(name);
        Text.id(index.toString());
        Text.fontColor(this.currentIndex === index ? this.selectedFontColor : this.fontColor);
        Text.fontSize(16);
        Text.fontWeight(this.currentIndex === index ? 500 : 400);
        Text.lineHeight(22);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 18, left: 8, right: 8 });
        Text.pop();
        Divider.create();
        Divider.strokeWidth(2);
        Divider.color('#007DFF');
        Divider.width('32vp');
        Divider.opacity(this.currentIndex === index ? 1 : 0);
        Divider.margin({ bottom: 8 });
        Column.pop();
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Text.create($r('app.string.module_desc'));
        Text.fontSize(24);
        Text.fontWeight(700);
        Text.textAlign(TextAlign.Start);
        Text.margin({ left: 24, right: 24, bottom: 11, top: 12 });
        Text.fontColor('#182431');
        Text.lineHeight(33);
        Text.alignSelf(ItemAlign.Start);
        Text.pop();
        Tabs.create({ barPosition: BarPosition.Start, controller: this.controller });
        Tabs.vertical(false);
        Tabs.barMode(BarMode.Fixed);
        Tabs.barWidth(360);
        Tabs.barHeight(56);
        Tabs.animationDuration(400);
        Tabs.onChange((index: number) => {
            this.currentIndex = index;
        });
        Tabs.backgroundColor('#F1F3F5');
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, 0, $r('app.string.encrypt'));
            } });
        let earlierCreatedChild_2: Encrypt = (this && this.findChildById) ? this.findChildById("2") as Encrypt : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Encrypt("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, 1, $r('app.string.decrypt'));
            } });
        let earlierCreatedChild_3: Decrypt = (this && this.findChildById) ? this.findChildById("3") as Decrypt : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new Decrypt("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, 2, $r('app.string.sign'));
            } });
        let earlierCreatedChild_4: Sign = (this && this.findChildById) ? this.findChildById("4") as Sign : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new Sign("4", this, {}));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({});
            View.create(earlierCreatedChild_4);
        }
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, 3, $r('app.string.verify'));
            } });
        let earlierCreatedChild_5: Verify = (this && this.findChildById) ? this.findChildById("5") as Verify : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new Verify("5", this, {}));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({});
            View.create(earlierCreatedChild_5);
        }
        TabContent.pop();
        Tabs.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
