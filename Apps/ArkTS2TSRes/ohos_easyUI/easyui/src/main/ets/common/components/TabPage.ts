interface TabPage_Params {
    currentIndex?: number;
    controller?: TabsController;
    tabLabels?: string[];
    tabContents?: string[];
    animated?: boolean;
    tabDisabled?: number;
    type?: string;
    tabPageWidth?: number | string;
    onMessage?: boolean;
    noContent?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TabPage_" + ++__generate__Id;
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
// xxx.ets
import display from '@ohos.display';
import deviceInfo from '@ohos.deviceInfo';
import promptAction from '@ohos.promptAction';
export class Func {
    static mainFunc() {
        let a = "aaa";
        console.log(a);
    }
}
export class TabPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentIndex = new SynchedPropertySimpleTwoWay(params.currentIndex, this, "currentIndex");
        this.controller = new TabsController();
        this.tabLabels = ["标签1", "标签2", "标签3", "标签4"] //标签页
        ;
        this.tabContents = ["内容1", "内容2", "内容3", "内容4"] //内容页
        ;
        this.animated = false //是否开启切换动画
        ;
        this.tabDisabled = -1 //禁用标签序号，从0开始
        ;
        this.type = "" //标签风格
        ;
        this.tabPageWidth = 60;
        this.onMessage = false;
        this.noContent = false;
        this.updateWithValueParams(params);
        this.declareWatch("currentIndex", this.showTip);
    }
    updateWithValueParams(params: TabPage_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.tabLabels !== undefined) {
            this.tabLabels = params.tabLabels;
        }
        if (params.tabContents !== undefined) {
            this.tabContents = params.tabContents;
        }
        if (params.animated !== undefined) {
            this.animated = params.animated;
        }
        if (params.tabDisabled !== undefined) {
            this.tabDisabled = params.tabDisabled;
        }
        if (params.type !== undefined) {
            this.type = params.type;
        }
        if (params.tabPageWidth !== undefined) {
            this.tabPageWidth = params.tabPageWidth;
        }
        if (params.onMessage !== undefined) {
            this.onMessage = params.onMessage;
        }
        if (params.noContent !== undefined) {
            this.noContent = params.noContent;
        }
    }
    aboutToBeDeleted() {
        this.__currentIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentIndex: SynchedPropertySimpleTwoWay<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    private controller: TabsController;
    private tabLabels: string[]; //标签页
    private tabContents: string[]; //内容页
    private animated: boolean; //是否开启切换动画
    private tabDisabled: number; //禁用标签序号，从0开始
    private type: string; //标签风格
    private tabPageWidth: number | string;
    private onMessage: boolean;
    private noContent: boolean;
    showTip() {
        if (this.currentIndex == this.tabDisabled) {
            promptAction.showToast({
                message: "标签" + (this.currentIndex + 1) + "已被禁用",
                duration: 2000,
                bottom: 300
            });
        }
        else {
            if (this.onMessage) {
                promptAction.showToast({
                    message: "标签" + (this.currentIndex + 1),
                    duration: 2000,
                    bottom: 300
                });
            }
        }
    }
    aboutToAppear() {
        //处理在开发板中和previewer中效果不同的情况
        if (this.tabLabels.length > 4) {
            if (deviceInfo.deviceType == "default") {
                this.tabPageWidth = px2vp(display.getDefaultDisplaySync().width / 5);
            }
            else {
                this.tabPageWidth = 360 / 5;
            }
        }
        else {
            this.tabPageWidth = "100%";
        }
    }
    TabBuilder(index: number, name: string, parent = null) {
        If.create();
        if (this.type == "card") {
            If.branchId(0);
            If.create();
            if (this.tabDisabled != index) {
                If.branchId(0);
                Column.create();
                Column.width(this.tabPageWidth);
                Column.borderWidth(1);
                Column.borderColor("#ffff0000");
                Column.backgroundColor(this.currentIndex === index ? '#ffff0000' : '#ffffffff');
                Text.create(name);
                Text.fontColor(this.currentIndex === index ? '#ffffffff' : '#ffff0000');
                Text.fontSize(16);
                Text.fontWeight(this.currentIndex === index ? 500 : 400);
                Text.lineHeight(22);
                Text.margin({ top: 17, bottom: 7 });
                Text.pop();
                Column.pop();
            }
            else {
                If.branchId(1);
                Column.create();
                Column.width(this.tabPageWidth);
                Column.borderWidth(1);
                Column.borderColor("#ffd7d7d7");
                Column.backgroundColor('#ffffffff');
                Text.create(name);
                Text.fontColor(this.currentIndex === index ? '#ffd7d7d7' : '#ffd7d7d7');
                Text.fontSize(16);
                Text.fontWeight(this.currentIndex === index ? 500 : 400);
                Text.lineHeight(22);
                Text.margin({ top: 17, bottom: 7 });
                Text.pop();
                Column.pop();
            }
            If.pop();
        }
        If.pop();
        If.create();
        if (this.tabDisabled != index) {
            If.branchId(0);
            Column.create();
            Column.width(this.tabPageWidth);
            Text.create(name);
            Text.fontColor(this.currentIndex === index ? '#ff000000' : '#ff5d5d5d');
            Text.fontSize(16);
            Text.fontWeight(this.currentIndex === index ? 500 : 400);
            Text.lineHeight(22);
            Text.margin({ top: 17, bottom: 7 });
            Text.pop();
            Divider.create();
            Context.animation({
                duration: 200
            });
            Divider.strokeWidth(2);
            Divider.color('#ffff0000');
            Divider.width("60%");
            Divider.opacity(this.currentIndex === index ? 1 : 0);
            Context.animation(null);
            Column.pop();
        }
        else {
            If.branchId(1);
            Column.create();
            Column.width(this.tabPageWidth);
            Text.create(name);
            Text.fontColor(this.currentIndex === index ? '#ffd7d7d7' : '#ffd7d7d7');
            Text.fontSize(16);
            Text.fontWeight(this.currentIndex === index ? 500 : 400);
            Text.lineHeight(22);
            Text.margin({ top: 17, bottom: 7 });
            Text.pop();
            Column.pop();
        }
        If.pop();
    }
    render() {
        Column.create();
        Column.width('100%');
        Tabs.create({ barPosition: BarPosition.Start, controller: this.controller });
        Tabs.scrollable(true);
        Tabs.vertical(false);
        Tabs.barMode(this.tabLabels.length > 4 ? BarMode.Scrollable : BarMode.Fixed);
        Tabs.barWidth("100%");
        Tabs.barHeight(56);
        Tabs.animationDuration(this.animated ? 300 : 0);
        Tabs.onChange((index: number) => {
            this.currentIndex = index;
        });
        Tabs.width("100%");
        Tabs.height(this.noContent ? 56 : 100);
        Tabs.margin({ top: 0 });
        Tabs.backgroundColor('#ffffffff');
        ForEach.create("2", this, ObservedObject.GetRawObject(this.tabLabels), (item, index) => {
            TabContent.create();
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, index, item);
                } });
            If.create();
            if (this.currentIndex != this.tabDisabled) {
                If.branchId(0);
                Column.create();
                Column.width('100%');
                Column.height('100%');
                Column.backgroundColor('#ffffffff');
                Text.create("" + this.tabContents[index]);
                Text.alignSelf(ItemAlign.Start);
                Text.margin({ top: 10, left: 10 });
                Text.pop();
                Column.pop();
            }
            If.pop();
            TabContent.pop();
        });
        ForEach.pop();
        Tabs.pop();
        Column.pop();
    }
}
