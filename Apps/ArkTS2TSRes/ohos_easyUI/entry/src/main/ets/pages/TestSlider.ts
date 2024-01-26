interface TestSlider_Params {
    selectValue_1?: number;
    selectValue_2?: number;
    selectValue_3?: number;
    selectValue_4?: number;
    selectValue_5?: number;
    selectValue_6?: number;
    selectValue_7?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestSlider_" + ++__generate__Id;
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
import { Slider_basic, Slider_range, Slider_disable, Slider_button } from 'easyui';
import promptAction from '@ohos.promptAction';
class TestSlider extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__selectValue_1 = new ObservedPropertySimple(50, this, "selectValue_1");
        this.__selectValue_2 = new ObservedPropertySimple(50, this, "selectValue_2");
        this.__selectValue_3 = new ObservedPropertySimple(50, this, "selectValue_3");
        this.__selectValue_4 = new ObservedPropertySimple(50, this, "selectValue_4");
        this.__selectValue_5 = new ObservedPropertySimple(50, this, "selectValue_5");
        this.__selectValue_6 = new ObservedPropertySimple(50, this, "selectValue_6");
        this.__selectValue_7 = new ObservedPropertySimple(50, this, "selectValue_7");
        this.updateWithValueParams(params);
        this.declareWatch("selectValue_1", this.selectValueChange_1);
        this.declareWatch("selectValue_2", this.selectValueChange_2);
        this.declareWatch("selectValue_3", this.selectValueChange_3);
        this.declareWatch("selectValue_4", this.selectValueChange_4);
        this.declareWatch("selectValue_5", this.selectValueChange_5);
        this.declareWatch("selectValue_7", this.selectValueChange_7);
    }
    updateWithValueParams(params: TestSlider_Params) {
        if (params.selectValue_1 !== undefined) {
            this.selectValue_1 = params.selectValue_1;
        }
        if (params.selectValue_2 !== undefined) {
            this.selectValue_2 = params.selectValue_2;
        }
        if (params.selectValue_3 !== undefined) {
            this.selectValue_3 = params.selectValue_3;
        }
        if (params.selectValue_4 !== undefined) {
            this.selectValue_4 = params.selectValue_4;
        }
        if (params.selectValue_5 !== undefined) {
            this.selectValue_5 = params.selectValue_5;
        }
        if (params.selectValue_6 !== undefined) {
            this.selectValue_6 = params.selectValue_6;
        }
        if (params.selectValue_7 !== undefined) {
            this.selectValue_7 = params.selectValue_7;
        }
    }
    aboutToBeDeleted() {
        this.__selectValue_1.aboutToBeDeleted();
        this.__selectValue_2.aboutToBeDeleted();
        this.__selectValue_3.aboutToBeDeleted();
        this.__selectValue_4.aboutToBeDeleted();
        this.__selectValue_5.aboutToBeDeleted();
        this.__selectValue_6.aboutToBeDeleted();
        this.__selectValue_7.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __selectValue_1: ObservedPropertySimple<number>;
    get selectValue_1() {
        return this.__selectValue_1.get();
    }
    set selectValue_1(newValue: number) {
        this.__selectValue_1.set(newValue);
    }
    private __selectValue_2: ObservedPropertySimple<number>;
    get selectValue_2() {
        return this.__selectValue_2.get();
    }
    set selectValue_2(newValue: number) {
        this.__selectValue_2.set(newValue);
    }
    private __selectValue_3: ObservedPropertySimple<number>;
    get selectValue_3() {
        return this.__selectValue_3.get();
    }
    set selectValue_3(newValue: number) {
        this.__selectValue_3.set(newValue);
    }
    private __selectValue_4: ObservedPropertySimple<number>;
    get selectValue_4() {
        return this.__selectValue_4.get();
    }
    set selectValue_4(newValue: number) {
        this.__selectValue_4.set(newValue);
    }
    private __selectValue_5: ObservedPropertySimple<number>;
    get selectValue_5() {
        return this.__selectValue_5.get();
    }
    set selectValue_5(newValue: number) {
        this.__selectValue_5.set(newValue);
    }
    private __selectValue_6: ObservedPropertySimple<number>;
    get selectValue_6() {
        return this.__selectValue_6.get();
    }
    set selectValue_6(newValue: number) {
        this.__selectValue_6.set(newValue);
    }
    private __selectValue_7: ObservedPropertySimple<number>;
    get selectValue_7() {
        return this.__selectValue_7.get();
    }
    set selectValue_7(newValue: number) {
        this.__selectValue_7.set(newValue);
    }
    selectValueChange_1() {
        promptAction.showToast({
            message: `当前值：${this.selectValue_1.toFixed()}`,
            duration: 2000,
            bottom: 440
        });
    }
    selectValueChange_2() {
        promptAction.showToast({
            message: `当前值：${this.selectValue_2.toFixed()}`,
            duration: 2000,
            bottom: 440
        });
    }
    selectValueChange_3() {
        promptAction.showToast({
            message: `当前值：${this.selectValue_3.toFixed()}`,
            duration: 2000,
            bottom: 440
        });
    }
    selectValueChange_4() {
        promptAction.showToast({
            message: `当前值：${this.selectValue_4.toFixed()}`,
            duration: 2000,
            bottom: 440
        });
    }
    selectValueChange_5() {
        promptAction.showToast({
            message: `当前值：${this.selectValue_5.toFixed()}`,
            duration: 2000,
            bottom: 440
        });
    }
    selectValueChange_7() {
        promptAction.showToast({
            message: `当前值：${this.selectValue_7.toFixed()}`,
            duration: 2000,
            bottom: 440
        });
    }
    render() {
        Stack.create();
        Column.create();
        Column.backgroundColor("#ffececec");
        Text.create("基本用法");
        Text.alignSelf(ItemAlign.Start);
        Text.margin({ left: 10, top: 10 });
        Text.pop();
        Text.create("指定步长");
        Text.alignSelf(ItemAlign.Start);
        Text.margin({ left: 10, top: 10 });
        Text.pop();
        Text.create("自定义样式");
        Text.alignSelf(ItemAlign.Start);
        Text.margin({ left: 10, top: 10 });
        Text.pop();
        Text.create("自定义按钮");
        Text.alignSelf(ItemAlign.Start);
        Text.margin({ left: 10, top: 10 });
        Text.pop();
        Text.create("指定选择范围");
        Text.alignSelf(ItemAlign.Start);
        Text.margin({ left: 10, top: 10 });
        Text.pop();
        Text.create("禁用");
        Text.alignSelf(ItemAlign.Start);
        Text.margin({ left: 10, top: 10 });
        Text.pop();
        Text.create("垂直方向");
        Text.alignSelf(ItemAlign.Start);
        Text.margin({ left: 10, top: 10 });
        Text.pop();
        Column.pop();
        Stack.pop();
    }
}
loadDocument(new TestSlider("1", undefined, {}));
