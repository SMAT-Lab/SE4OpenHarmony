interface TestLabel_2_Params {
}
interface TestLabel_1_Params {
}
interface TestLabel_Params {
    controller?: TabsController;
    fontColor?: string;
    selectedFontColor?: string;
    currentIndex?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestLabel_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Institute of Software, Chinese Academy of Sciences.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Label_topic_default, Label_topic_primary, Label_topic_success, Label_topic_info, Label_topic_warning, Label_topic_danger, Label_badge_default, Label_badge_primary, Label_badge_success, Label_badge_info, Label_badge_warning, Label_badge_danger, Label_dot_default, Label_dot_primary, Label_dot_success, Label_dot_info, Label_dot_warning, Label_dot_danger, Label_outline_topic_default, Label_outline_topic_primary, Label_outline_topic_success, Label_outline_topic_info, Label_outline_topic_warning, Label_outline_topic_danger, Label_outline_badge_default, Label_outline_badge_primary, Label_outline_badge_success, Label_outline_badge_info, Label_outline_badge_warning, Label_outline_badge_danger, Label_outline_dot_default, Label_outline_dot_primary, Label_outline_dot_success, Label_outline_dot_info, Label_outline_dot_warning, Label_outline_dot_danger, Label_useInButton_default, Label_useInButton_primary, Label_useInButton_success, Label_useInButton_info, Label_useInButton_warning, Label_useInButton_danger, Label_useInButton_primary_1, Label_useInButton_success_1, Label_useInButton_info_1, Label_useInButton_warning_1, Label_useInButton_danger_1, Label_useInButton_default_2, Label_useInButton_primary_2, Label_useInButton_success_2, Label_useInButton_info_2, Label_useInButton_warning_2, Label_useInButton_danger_2, Label_useInButton_primary_3, Label_useInButton_success_3, Label_useInButton_info_3, Label_useInButton_warning_3, Label_useInButton_danger_3 } from "easyui";
class TestLabel extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = new TabsController();
        this.__fontColor = new ObservedPropertySimple('rgba(0, 0, 0, 0.4)', this, "fontColor");
        this.__selectedFontColor = new ObservedPropertySimple('rgba(10, 30, 255, 1)', this, "selectedFontColor");
        this.__currentIndex = new ObservedPropertySimple(0, this, "currentIndex");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestLabel_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.fontColor !== undefined) {
            this.fontColor = params.fontColor;
        }
        if (params.selectedFontColor !== undefined) {
            this.selectedFontColor = params.selectedFontColor;
        }
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
    }
    aboutToBeDeleted() {
        this.__fontColor.aboutToBeDeleted();
        this.__selectedFontColor.aboutToBeDeleted();
        this.__currentIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: TabsController;
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
    TabBuilder(index: number, parent = null) {
        Column.create();
        Text.create(`第${(index > 2 ? (index - 1) : index) + 1}页`);
        Text.fontColor(this.currentIndex === index ? this.selectedFontColor : this.fontColor);
        Text.fontSize(24);
        Text.margin({ top: 2 });
        Text.pop();
        Column.pop();
    }
    render() {
        Column.create();
        Tabs.create({ barPosition: BarPosition.End, controller: this.controller });
        Tabs.barHeight(40);
        Tabs.onChange((index: number) => {
            this.currentIndex = index;
        });
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, 0);
            } });
        TabContent.backgroundColor(0xF5F5F5);
        Flex.create();
        Flex.position({
            x: 0, y: 20
        });
        let earlierCreatedChild_2: TestLabel_1 = (this && this.findChildById) ? this.findChildById("2") as TestLabel_1 : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TestLabel_1("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Flex.pop();
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, 1);
            } });
        TabContent.backgroundColor(0xF5F5F5);
        Flex.create();
        Flex.position({
            x: 0, y: 20
        });
        let earlierCreatedChild_3: TestLabel_2 = (this && this.findChildById) ? this.findChildById("3") as TestLabel_2 : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new TestLabel_2("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            if (!earlierCreatedChild_3.needsUpdate()) {
                earlierCreatedChild_3.markStatic();
            }
            View.create(earlierCreatedChild_3);
        }
        Flex.pop();
        TabContent.pop();
        Tabs.pop();
        Column.pop();
    }
}
class TestLabel_1 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestLabel_1_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Column.margin(10);
        /**
         * 颜色主题
         */
        Text.create("颜色主题");
        /**
         * 颜色主题
         */
        Text.fontSize(16);
        /**
         * 颜色主题
         */
        Text.margin({ bottom: 10 });
        /**
         * 颜色主题
         */
        Text.pop();
        Flex.create();
        Flex.pop();
        /**
         * 作为徽标
         */
        Text.create("作为徽标");
        /**
         * 作为徽标
         */
        Text.fontSize(16);
        /**
         * 作为徽标
         */
        Text.margin({ bottom: 10 });
        /**
         * 作为徽标
         */
        Text.markAnchor({
            x: 0,
            y: -80
        });
        /**
         * 作为徽标
         */
        Text.pop();
        Flex.create();
        Flex.pop();
        /**
         * 小圆点徽标
         */
        Text.create("小圆点徽标");
        /**
         * 小圆点徽标
         */
        Text.fontSize(16);
        /**
         * 小圆点徽标
         */
        Text.margin({ bottom: 10 });
        /**
         * 小圆点徽标
         */
        Text.markAnchor({
            x: 0,
            y: -160
        });
        /**
         * 小圆点徽标
         */
        Text.pop();
        Flex.create();
        Flex.pop();
        /**
         * 轮廓外观
         */
        Text.create("轮廓外观");
        /**
         * 轮廓外观
         */
        Text.fontSize(16);
        /**
         * 轮廓外观
         */
        Text.margin({ bottom: 10 });
        /**
         * 轮廓外观
         */
        Text.markAnchor({
            x: 0,
            y: -190
        });
        /**
         * 轮廓外观
         */
        Text.pop();
        Flex.create();
        Flex.pop();
        Column.pop();
    }
}
class TestLabel_2 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestLabel_2_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Column.margin(10);
        /**
         * 按钮中的徽标使用
         */
        Text.create("按钮中的徽标使用");
        /**
         * 按钮中的徽标使用
         */
        Text.fontSize(16);
        /**
         * 按钮中的徽标使用
         */
        Text.margin({ bottom: 10 });
        /**
         * 按钮中的徽标使用
         */
        Text.markAnchor({
            x: 0,
            y: 0
        });
        /**
         * 按钮中的徽标使用
         */
        Text.pop();
        Flex.create();
        Flex.pop();
        Column.pop();
    }
}
loadDocument(new TestLabel("1", undefined, {}));
