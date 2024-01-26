interface TestTabbar_Params {
    pop_w_default?: string;
    pop_visibility_bottom?: Visibility;
    pop_visibility_top?: Visibility;
    pop_visibility_right?: Visibility;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestPopup_" + ++__generate__Id;
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
import { Popup_bottom, Popup_default, Popup_right, Popup_top } from 'easyui';
class TestTabbar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__pop_w_default = new ObservedPropertySimple("0%", this, "pop_w_default");
        this.__pop_visibility_bottom = new ObservedPropertySimple(Visibility.Hidden, this, "pop_visibility_bottom");
        this.__pop_visibility_top = new ObservedPropertySimple(Visibility.Hidden, this, "pop_visibility_top");
        this.__pop_visibility_right = new ObservedPropertySimple(Visibility.Hidden, this, "pop_visibility_right");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestTabbar_Params) {
        if (params.pop_w_default !== undefined) {
            this.pop_w_default = params.pop_w_default;
        }
        if (params.pop_visibility_bottom !== undefined) {
            this.pop_visibility_bottom = params.pop_visibility_bottom;
        }
        if (params.pop_visibility_top !== undefined) {
            this.pop_visibility_top = params.pop_visibility_top;
        }
        if (params.pop_visibility_right !== undefined) {
            this.pop_visibility_right = params.pop_visibility_right;
        }
    }
    aboutToBeDeleted() {
        this.__pop_w_default.aboutToBeDeleted();
        this.__pop_visibility_bottom.aboutToBeDeleted();
        this.__pop_visibility_top.aboutToBeDeleted();
        this.__pop_visibility_right.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __pop_w_default: ObservedPropertySimple<string>;
    get pop_w_default() {
        return this.__pop_w_default.get();
    }
    set pop_w_default(newValue: string) {
        this.__pop_w_default.set(newValue);
    }
    // @State pop_visibility_default: Visibility = Visibility.Hidden;
    private __pop_visibility_bottom: ObservedPropertySimple<Visibility>;
    get pop_visibility_bottom() {
        return this.__pop_visibility_bottom.get();
    }
    set pop_visibility_bottom(newValue: Visibility) {
        this.__pop_visibility_bottom.set(newValue);
    }
    private __pop_visibility_top: ObservedPropertySimple<Visibility>;
    get pop_visibility_top() {
        return this.__pop_visibility_top.get();
    }
    set pop_visibility_top(newValue: Visibility) {
        this.__pop_visibility_top.set(newValue);
    }
    private __pop_visibility_right: ObservedPropertySimple<Visibility>;
    get pop_visibility_right() {
        return this.__pop_visibility_right.get();
    }
    set pop_visibility_right(newValue: Visibility) {
        this.__pop_visibility_right.set(newValue);
    }
    render() {
        Column.create({ space: 20 });
        Column.create({ space: 10 });
        Text.create("Popup基础用法");
        Text.fontSize(25);
        Text.width("100%");
        Text.height(30);
        Text.margin({ left: 10 });
        Text.align(Alignment.Start);
        Text.pop();
        Column.create();
        Button.createWithLabel("弹出Popup");
        Button.type(ButtonType.Normal);
        Button.height("10%");
        Button.width("35%");
        Button.backgroundColor(Color.White);
        Button.fontSize(25);
        Button.fontColor(Color.Black);
        Button.shadow({ radius: 5 });
        Button.onClick(() => {
            // this.pop_visibility_default = Visibility.Visible;
            this.pop_w_default = "100%";
        });
        Button.pop();
        Column.pop();
        Column.pop();
        Column.create({ space: 10 });
        Text.create("Popup弹出位置");
        Text.fontSize(25);
        Text.width("100%");
        Text.height(30);
        Text.margin({ left: 10 });
        Text.align(Alignment.Start);
        Text.pop();
        Row.create({ space: 10 });
        Button.createWithLabel("底部弹出");
        Button.type(ButtonType.Normal);
        Button.height("10%");
        Button.width("30%");
        Button.backgroundColor(Color.White);
        Button.fontSize(25);
        Button.fontColor(Color.Black);
        Button.shadow({ radius: 5 });
        Button.onClick(() => {
            this.pop_visibility_bottom = Visibility.Visible;
        });
        Button.pop();
        Button.createWithLabel("顶部弹出");
        Button.type(ButtonType.Normal);
        Button.height("10%");
        Button.width("30%");
        Button.backgroundColor(Color.White);
        Button.fontSize(25);
        Button.fontColor(Color.Black);
        Button.shadow({ radius: 5 });
        Button.onClick(() => {
            this.pop_visibility_top = Visibility.Visible;
            setTimeout(() => {
                this.pop_visibility_top = Visibility.Hidden;
            }, 2000);
        });
        Button.pop();
        Button.createWithLabel("右侧弹出");
        Button.type(ButtonType.Normal);
        Button.height("10%");
        Button.width("30%");
        Button.backgroundColor(Color.White);
        Button.fontSize(25);
        Button.fontColor(Color.Black);
        Button.shadow({ radius: 5 });
        Button.onClick(() => {
            this.pop_visibility_right = Visibility.Visible;
        });
        Button.pop();
        Row.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new TestTabbar("1", undefined, {}));
