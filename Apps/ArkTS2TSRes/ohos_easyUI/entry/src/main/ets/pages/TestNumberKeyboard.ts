interface TestNumberKeyboard_Params {
    result?: string;
    isPop_1?: boolean;
    isPop_2?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestNumberKeyboard_" + ++__generate__Id;
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
import { NumberKeyboard_custom, NumberKeyboard_default } from 'easyui';
import promptAction from '@ohos.promptAction';
class TestNumberKeyboard extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__result = new ObservedPropertySimple("", this, "result");
        this.__isPop_1 = new ObservedPropertySimple(false //控制默认键盘弹出
        , this, "isPop_1");
        this.__isPop_2 = new ObservedPropertySimple(false //控制自定义键盘弹出
        , this, "isPop_2");
        this.updateWithValueParams(params);
        this.declareWatch("result", this.showResult);
    }
    updateWithValueParams(params: TestNumberKeyboard_Params) {
        if (params.result !== undefined) {
            this.result = params.result;
        }
        if (params.isPop_1 !== undefined) {
            this.isPop_1 = params.isPop_1;
        }
        if (params.isPop_2 !== undefined) {
            this.isPop_2 = params.isPop_2;
        }
    }
    aboutToBeDeleted() {
        this.__result.aboutToBeDeleted();
        this.__isPop_1.aboutToBeDeleted();
        this.__isPop_2.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __result: ObservedPropertySimple<string>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: string) {
        this.__result.set(newValue);
    }
    private __isPop_1: ObservedPropertySimple<boolean>; //控制默认键盘弹出
    get isPop_1() {
        return this.__isPop_1.get();
    }
    set isPop_1(newValue: boolean) {
        this.__isPop_1.set(newValue);
    }
    private __isPop_2: ObservedPropertySimple<boolean>; //控制自定义键盘弹出
    get isPop_2() {
        return this.__isPop_2.get();
    }
    set isPop_2(newValue: boolean) {
        this.__isPop_2.set(newValue);
    }
    showResult() {
        promptAction.showToast({
            message: "选中值：" + this.result,
            duration: 2000,
            bottom: 350
        });
    }
    render() {
        Column.create();
        Column.backgroundColor("#ffe3e3e3");
        Column.width("100%");
        Column.create();
        Column.width("100%");
        Text.create("默认样式");
        Text.alignSelf(ItemAlign.Start);
        Text.margin({ left: 10, top: 10 });
        Text.fontColor("#ff7a7a7a");
        Text.pop();
        Button.createWithLabel("弹出默认键盘");
        Button.fontColor("#ff000000");
        Button.backgroundColor("#ffffffff");
        Button.type(ButtonType.Normal);
        Button.alignSelf(ItemAlign.Start);
        Button.margin({ left: 10, top: 10 });
        Button.onClick(() => {
            this.isPop_1 = true;
            this.isPop_2 = false;
        });
        Button.pop();
        Column.pop();
        Column.create();
        Column.width("100%");
        Text.create("自定义样式");
        Text.alignSelf(ItemAlign.Start);
        Text.margin({ left: 10, top: 10 });
        Text.fontColor("#ff7a7a7a");
        Text.pop();
        Button.createWithLabel("弹出自定义键盘");
        Button.fontColor("#ff000000");
        Button.backgroundColor("#ffffffff");
        Button.type(ButtonType.Normal);
        Button.alignSelf(ItemAlign.Start);
        Button.margin({ left: 10, top: 10 });
        Button.onClick(() => {
            this.isPop_1 = false;
            this.isPop_2 = true;
        });
        Button.pop();
        Column.pop();
        Row.create();
        Row.layoutWeight(4);
        Stack.create();
        Stack.alignSelf(ItemAlign.End);
        Stack.pop();
        Row.pop();
        Column.pop();
    }
}
loadDocument(new TestNumberKeyboard("1", undefined, {}));
