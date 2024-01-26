interface TestTabPage_Params {
    currentIndex_1?: number;
    currentIndex_2?: number;
    currentIndex_3?: number;
    currentIndex_4?: number;
    currentIndex_5?: number;
    currentIndex_6?: number;
    currentIndex_7?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestTabPage_" + ++__generate__Id;
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
import { TabPage } from 'easyui';
import promptAction from '@ohos.promptAction';
class TestTabPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentIndex_1 = new ObservedPropertySimple(0, this, "currentIndex_1");
        this.__currentIndex_2 = new ObservedPropertySimple(0, this, "currentIndex_2");
        this.__currentIndex_3 = new ObservedPropertySimple(0, this, "currentIndex_3");
        this.__currentIndex_4 = new ObservedPropertySimple(0, this, "currentIndex_4");
        this.__currentIndex_5 = new ObservedPropertySimple(0, this, "currentIndex_5");
        this.__currentIndex_6 = new ObservedPropertySimple(0, this, "currentIndex_6");
        this.__currentIndex_7 = new ObservedPropertySimple(0, this, "currentIndex_7");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestTabPage_Params) {
        if (params.currentIndex_1 !== undefined) {
            this.currentIndex_1 = params.currentIndex_1;
        }
        if (params.currentIndex_2 !== undefined) {
            this.currentIndex_2 = params.currentIndex_2;
        }
        if (params.currentIndex_3 !== undefined) {
            this.currentIndex_3 = params.currentIndex_3;
        }
        if (params.currentIndex_4 !== undefined) {
            this.currentIndex_4 = params.currentIndex_4;
        }
        if (params.currentIndex_5 !== undefined) {
            this.currentIndex_5 = params.currentIndex_5;
        }
        if (params.currentIndex_6 !== undefined) {
            this.currentIndex_6 = params.currentIndex_6;
        }
        if (params.currentIndex_7 !== undefined) {
            this.currentIndex_7 = params.currentIndex_7;
        }
    }
    aboutToBeDeleted() {
        this.__currentIndex_1.aboutToBeDeleted();
        this.__currentIndex_2.aboutToBeDeleted();
        this.__currentIndex_3.aboutToBeDeleted();
        this.__currentIndex_4.aboutToBeDeleted();
        this.__currentIndex_5.aboutToBeDeleted();
        this.__currentIndex_6.aboutToBeDeleted();
        this.__currentIndex_7.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentIndex_1: ObservedPropertySimple<number>;
    get currentIndex_1() {
        return this.__currentIndex_1.get();
    }
    set currentIndex_1(newValue: number) {
        this.__currentIndex_1.set(newValue);
    }
    private __currentIndex_2: ObservedPropertySimple<number>;
    get currentIndex_2() {
        return this.__currentIndex_2.get();
    }
    set currentIndex_2(newValue: number) {
        this.__currentIndex_2.set(newValue);
    }
    private __currentIndex_3: ObservedPropertySimple<number>;
    get currentIndex_3() {
        return this.__currentIndex_3.get();
    }
    set currentIndex_3(newValue: number) {
        this.__currentIndex_3.set(newValue);
    }
    private __currentIndex_4: ObservedPropertySimple<number>;
    get currentIndex_4() {
        return this.__currentIndex_4.get();
    }
    set currentIndex_4(newValue: number) {
        this.__currentIndex_4.set(newValue);
    }
    private __currentIndex_5: ObservedPropertySimple<number>;
    get currentIndex_5() {
        return this.__currentIndex_5.get();
    }
    set currentIndex_5(newValue: number) {
        this.__currentIndex_5.set(newValue);
    }
    private __currentIndex_6: ObservedPropertySimple<number>;
    get currentIndex_6() {
        return this.__currentIndex_6.get();
    }
    set currentIndex_6(newValue: number) {
        this.__currentIndex_6.set(newValue);
    }
    private __currentIndex_7: ObservedPropertySimple<number>;
    get currentIndex_7() {
        return this.__currentIndex_7.get();
    }
    set currentIndex_7(newValue: number) {
        this.__currentIndex_7.set(newValue);
    }
    render() {
        Scroll.create();
        Scroll.width("100%");
        Scroll.height("100%");
        Scroll.backgroundColor("#ffe9e9e9");
        Column.create();
        Text.create("基础用法");
        Text.alignSelf(ItemAlign.Start);
        Text.margin(20);
        Text.pop();
        Text.create("通过名称匹配");
        Text.alignSelf(ItemAlign.Start);
        Text.margin(20);
        Text.pop();
        Text.create("标题栏滚动");
        Text.alignSelf(ItemAlign.Start);
        Text.margin(20);
        Text.pop();
        Text.create("禁用标签");
        Text.alignSelf(ItemAlign.Start);
        Text.margin(20);
        Text.pop();
        Text.create("样式风格");
        Text.alignSelf(ItemAlign.Start);
        Text.margin(20);
        Text.pop();
        Text.create("点击事件");
        Text.alignSelf(ItemAlign.Start);
        Text.margin(20);
        Text.pop();
        Text.create("切换动画");
        Text.alignSelf(ItemAlign.Start);
        Text.margin(20);
        Text.pop();
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new TestTabPage("1", undefined, {}));
