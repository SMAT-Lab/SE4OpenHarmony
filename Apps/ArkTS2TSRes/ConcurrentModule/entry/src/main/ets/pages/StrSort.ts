interface Index_Params {
    controller?: TabsController;
    index?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "StrSort_" + ++__generate__Id;
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
import { WorkerTab } from '../component/WorkerTab';
import { TaskPoolTab } from '../component/TaskPoolTab';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = new TabsController();
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
    }
    aboutToBeDeleted() {
        this.__index.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: TabsController;
    private __index: ObservedPropertySimple<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    tabJsWorker(parent = null) {
        Column.create();
        Column.id("tabJsWorker");
        Column.width("100%");
        Column.height("100%");
        Column.position({ x: "65%", y: "0vp" });
        Column.onClick(() => {
            this.index = 0;
            this.controller.changeIndex(this.index);
        });
        Text.create("Worker");
        Text.width("57vp");
        Text.height("22vp");
        Text.position({ x: "0vp", y: "17vp" });
        Text.fontFamily("HarmonyHeiTi-Medium");
        Text.fontSize(16);
        Text.fontColor(this.index === 0 ? "#007DFF" : "#182431");
        Text.textAlign(TextAlign.Center);
        Text.lineHeight(22);
        Text.fontWeight(this.index === 0 ? 500 : 400);
        Text.opacity(this.index === 0 ? 1 : 0.6);
        Text.pop();
        Line.create();
        Line.width("57vp");
        Line.height("2vp");
        Line.position({ x: "0", y: "46vp" });
        Line.backgroundColor(this.index === 0 ? "#007DFF" : "linear-gradient(269deg,rgba(0,0,0,0.00)%,#FFFFFF 10%)");
        Column.pop();
    }
    tabTaskPool(parent = null) {
        Column.create();
        Column.id("tabTaskPool");
        Column.height("100%");
        Column.width("100%");
        Column.position({ x: "4%", y: "0" });
        Column.onClick(() => {
            this.index = 1;
            this.controller.changeIndex(this.index);
        });
        Text.create("TaskPool");
        Text.width("68vp");
        Text.height("22vp");
        Text.position({ x: "10vp", y: "17vp" });
        Text.fontFamily("HarmonyHeiTi-Medium");
        Text.fontSize(16);
        Text.fontColor(this.index === 1 ? "#007DFF" : "#182431");
        Text.textAlign(TextAlign.Center);
        Text.lineHeight(22);
        Text.fontWeight(this.index === 1 ? 500 : 400);
        Text.opacity(this.index === 1 ? 1 : 0.6);
        Text.pop();
        Line.create();
        Line.width("68vp");
        Line.height("2vp");
        Line.position({ x: "10vp", y: "46vp" });
        Line.backgroundColor(this.index === 1 ? "#007DFF" : "linear-gradient(269deg,rgba(0,0,0,0.00)%,#FFFFFF 10%)");
        Column.pop();
    }
    render() {
        Row.create();
        Row.width("100%");
        Row.height("100%");
        Column.create();
        Column.backgroundColor("#f1f3f5");
        Column.width("100%");
        Column.height("100%");
        Text.create("ConcurrentModule");
        Text.width("100%");
        Text.height("41vp");
        Text.position({ x: "7%", y: "31vp" });
        Text.fontColor("#182431");
        Text.fontSize("30fp");
        Text.fontFamily("HarmonyHeiTi-Bold");
        Text.lineHeight(41);
        Text.fontWeight(700);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Tabs.create({
            barPosition: BarPosition.Start,
            controller: this.controller
        });
        Tabs.width("100%");
        Tabs.height("696vp");
        Tabs.barWidth("100%");
        Tabs.barHeight("56vp");
        Tabs.position({ x: "0vp", y: "80vp" });
        Tabs.padding({ bottom: "24vp" });
        Tabs.backgroundImage("linear-gradient(269deg,rgba(0,0,0,0.00)%,#FFFFFF 10%)");
        Tabs.barMode(BarMode.Fixed);
        Tabs.onChange((index: number) => {
            this.index = index;
        });
        TabContent.create();
        TabContent.width("100%");
        TabContent.height("100%");
        TabContent.tabBar({ builder: this.tabJsWorker.bind(this) });
        let earlierCreatedChild_2: WorkerTab = (this && this.findChildById) ? this.findChildById("2") as WorkerTab : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new WorkerTab("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        TabContent.pop();
        TabContent.create();
        TabContent.width("100%");
        TabContent.height("100%");
        TabContent.tabBar({ builder: this.tabTaskPool.bind(this) });
        let earlierCreatedChild_3: TaskPoolTab = (this && this.findChildById) ? this.findChildById("3") as TaskPoolTab : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new TaskPoolTab("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        TabContent.pop();
        Tabs.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
