interface Main_Params {
    basicCompHeight?: number;
    formCompHeight?: number;
    feedBackCompHeight?: number;
    showCompHeight?: number;
    navCompHeight?: number;
    busCompHeight?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Main_" + ++__generate__Id;
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
import { Cell } from 'easyui';
class Main extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__basicCompHeight = new ObservedPropertySimple(0, this, "basicCompHeight");
        this.__formCompHeight = new ObservedPropertySimple(0, this, "formCompHeight");
        this.__feedBackCompHeight = new ObservedPropertySimple(0, this, "feedBackCompHeight");
        this.__showCompHeight = new ObservedPropertySimple(0, this, "showCompHeight");
        this.__navCompHeight = new ObservedPropertySimple(0, this, "navCompHeight");
        this.__busCompHeight = new ObservedPropertySimple(0, this, "busCompHeight");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Main_Params) {
        if (params.basicCompHeight !== undefined) {
            this.basicCompHeight = params.basicCompHeight;
        }
        if (params.formCompHeight !== undefined) {
            this.formCompHeight = params.formCompHeight;
        }
        if (params.feedBackCompHeight !== undefined) {
            this.feedBackCompHeight = params.feedBackCompHeight;
        }
        if (params.showCompHeight !== undefined) {
            this.showCompHeight = params.showCompHeight;
        }
        if (params.navCompHeight !== undefined) {
            this.navCompHeight = params.navCompHeight;
        }
        if (params.busCompHeight !== undefined) {
            this.busCompHeight = params.busCompHeight;
        }
    }
    aboutToBeDeleted() {
        this.__basicCompHeight.aboutToBeDeleted();
        this.__formCompHeight.aboutToBeDeleted();
        this.__feedBackCompHeight.aboutToBeDeleted();
        this.__showCompHeight.aboutToBeDeleted();
        this.__navCompHeight.aboutToBeDeleted();
        this.__busCompHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __basicCompHeight: ObservedPropertySimple<number>;
    get basicCompHeight() {
        return this.__basicCompHeight.get();
    }
    set basicCompHeight(newValue: number) {
        this.__basicCompHeight.set(newValue);
    }
    private __formCompHeight: ObservedPropertySimple<number>;
    get formCompHeight() {
        return this.__formCompHeight.get();
    }
    set formCompHeight(newValue: number) {
        this.__formCompHeight.set(newValue);
    }
    private __feedBackCompHeight: ObservedPropertySimple<number>;
    get feedBackCompHeight() {
        return this.__feedBackCompHeight.get();
    }
    set feedBackCompHeight(newValue: number) {
        this.__feedBackCompHeight.set(newValue);
    }
    private __showCompHeight: ObservedPropertySimple<number>;
    get showCompHeight() {
        return this.__showCompHeight.get();
    }
    set showCompHeight(newValue: number) {
        this.__showCompHeight.set(newValue);
    }
    private __navCompHeight: ObservedPropertySimple<number>;
    get navCompHeight() {
        return this.__navCompHeight.get();
    }
    set navCompHeight(newValue: number) {
        this.__navCompHeight.set(newValue);
    }
    private __busCompHeight: ObservedPropertySimple<number>;
    get busCompHeight() {
        return this.__busCompHeight.get();
    }
    set busCompHeight(newValue: number) {
        this.__busCompHeight.set(newValue);
    }
    render() {
        Column.create();
        Column.backgroundColor("#fff2f3f5");
        Column.padding(20);
        Column.width("100%");
        Column.height("100%");
        Text.create("EasyUI");
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Bolder);
        Text.margin({ bottom: 20 });
        Text.pop();
        Column.create();
        Column.height("90%");
        Scroll.create();
        Scroll.scrollBar(BarState.Auto);
        Column.create();
        Column.create();
        Column.padding({ left: 10, right: 10, top: 15, bottom: 15 });
        Column.borderRadius(15);
        Column.margin({ bottom: 20 });
        Column.backgroundColor("#ffffffff");
        Column.width("100%");
        Column.onClick(() => {
            if (this.basicCompHeight == 0) {
                this.basicCompHeight = 200;
            }
            else {
                this.basicCompHeight = 0;
            }
        });
        Row.create();
        Row.width("100%");
        Text.create("基础组件");
        Text.fontSize(18);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Row.pop();
        Column.create();
        Context.animation({
            duration: 300
        });
        Column.height(this.basicCompHeight);
        Context.animation(null);
        Column.pop();
        Column.pop();
        Column.create();
        Column.padding({ left: 10, right: 10, top: 15, bottom: 15 });
        Column.borderRadius(15);
        Column.margin({ bottom: 20 });
        Column.backgroundColor("#ffffffff");
        Column.width("100%");
        Column.onClick(() => {
            if (this.formCompHeight == 0) {
                this.formCompHeight = 360;
            }
            else {
                this.formCompHeight = 0;
            }
        });
        Row.create();
        Row.width("100%");
        Text.create("表单组件");
        Text.fontSize(18);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Row.pop();
        Column.create();
        Context.animation({
            duration: 300
        });
        Column.height(this.formCompHeight);
        Context.animation(null);
        Column.pop();
        Column.pop();
        Column.create();
        Column.padding({ left: 10, right: 10, top: 15, bottom: 15 });
        Column.borderRadius(15);
        Column.margin({ bottom: 20 });
        Column.backgroundColor("#ffffffff");
        Column.width("100%");
        Column.onClick(() => {
            if (this.feedBackCompHeight == 0) {
                this.feedBackCompHeight = 160;
            }
            else {
                this.feedBackCompHeight = 0;
            }
        });
        Row.create();
        Row.width("100%");
        Text.create("反馈组件");
        Text.fontSize(18);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Row.pop();
        Column.create();
        Context.animation({
            duration: 300
        });
        Column.height(this.feedBackCompHeight);
        Context.animation(null);
        Column.pop();
        Column.pop();
        Column.create();
        Column.padding({ left: 10, right: 10, top: 15, bottom: 15 });
        Column.borderRadius(15);
        Column.margin({ bottom: 20 });
        Column.backgroundColor("#ffffffff");
        Column.width("100%");
        Column.onClick(() => {
            if (this.showCompHeight == 0) {
                this.showCompHeight = 620;
            }
            else {
                this.showCompHeight = 0;
            }
        });
        Row.create();
        Row.width("100%");
        Text.create("展示组件");
        Text.fontSize(18);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Row.pop();
        Column.create();
        Context.animation({
            duration: 300
        });
        Column.height(this.showCompHeight);
        Context.animation(null);
        Column.pop();
        Column.pop();
        Column.create();
        Column.padding({ left: 10, right: 10, top: 15, bottom: 15 });
        Column.borderRadius(15);
        Column.margin({ bottom: 20 });
        Column.backgroundColor("#ffffffff");
        Column.width("100%");
        Column.onClick(() => {
            if (this.navCompHeight == 0) {
                this.navCompHeight = 160;
            }
            else {
                this.navCompHeight = 0;
            }
        });
        Row.create();
        Row.width("100%");
        Text.create("导航组件");
        Text.fontSize(18);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Row.pop();
        Column.create();
        Context.animation({
            duration: 300
        });
        Column.height(this.navCompHeight);
        Context.animation(null);
        Column.pop();
        Column.pop();
        Column.create();
        Column.padding({ left: 10, right: 10, top: 15, bottom: 15 });
        Column.borderRadius(15);
        Column.margin({ bottom: 20 });
        Column.backgroundColor("#ffffffff");
        Column.width("100%");
        Column.onClick(() => {
            if (this.busCompHeight == 0) {
                this.busCompHeight = 160;
            }
            else {
                this.busCompHeight = 0;
            }
        });
        Row.create();
        Row.width("100%");
        Text.create("业务组件");
        Text.fontSize(18);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Row.pop();
        Column.create();
        Context.animation({
            duration: 300
        });
        Column.height(this.busCompHeight);
        Context.animation(null);
        Column.pop();
        Column.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new Main("1", undefined, {}));
