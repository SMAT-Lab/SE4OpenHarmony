interface TestToast_Params {
    pop_visibility_default?: Visibility;
    pop_visibility_loading?: Visibility;
    pop_visibility_success?: Visibility;
    pop_visibility_failed?: Visibility;
    pop_visibility_advance?: Visibility;
    content?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestToast_" + ++__generate__Id;
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
import { Toast_advance, Toast_default, Toast_loading, Toast_successOrFailed } from 'easyui';
class TestToast extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__pop_visibility_default = new ObservedPropertySimple(Visibility.Hidden, this, "pop_visibility_default");
        this.__pop_visibility_loading = new ObservedPropertySimple(Visibility.Hidden, this, "pop_visibility_loading");
        this.__pop_visibility_success = new ObservedPropertySimple(Visibility.Hidden, this, "pop_visibility_success");
        this.__pop_visibility_failed = new ObservedPropertySimple(Visibility.Hidden, this, "pop_visibility_failed");
        this.__pop_visibility_advance = new ObservedPropertySimple(Visibility.Hidden, this, "pop_visibility_advance");
        this.__content = new ObservedPropertySimple("", this, "content");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestToast_Params) {
        if (params.pop_visibility_default !== undefined) {
            this.pop_visibility_default = params.pop_visibility_default;
        }
        if (params.pop_visibility_loading !== undefined) {
            this.pop_visibility_loading = params.pop_visibility_loading;
        }
        if (params.pop_visibility_success !== undefined) {
            this.pop_visibility_success = params.pop_visibility_success;
        }
        if (params.pop_visibility_failed !== undefined) {
            this.pop_visibility_failed = params.pop_visibility_failed;
        }
        if (params.pop_visibility_advance !== undefined) {
            this.pop_visibility_advance = params.pop_visibility_advance;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
    }
    aboutToBeDeleted() {
        this.__pop_visibility_default.aboutToBeDeleted();
        this.__pop_visibility_loading.aboutToBeDeleted();
        this.__pop_visibility_success.aboutToBeDeleted();
        this.__pop_visibility_failed.aboutToBeDeleted();
        this.__pop_visibility_advance.aboutToBeDeleted();
        this.__content.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __pop_visibility_default: ObservedPropertySimple<Visibility>;
    get pop_visibility_default() {
        return this.__pop_visibility_default.get();
    }
    set pop_visibility_default(newValue: Visibility) {
        this.__pop_visibility_default.set(newValue);
    }
    private __pop_visibility_loading: ObservedPropertySimple<Visibility>;
    get pop_visibility_loading() {
        return this.__pop_visibility_loading.get();
    }
    set pop_visibility_loading(newValue: Visibility) {
        this.__pop_visibility_loading.set(newValue);
    }
    private __pop_visibility_success: ObservedPropertySimple<Visibility>;
    get pop_visibility_success() {
        return this.__pop_visibility_success.get();
    }
    set pop_visibility_success(newValue: Visibility) {
        this.__pop_visibility_success.set(newValue);
    }
    private __pop_visibility_failed: ObservedPropertySimple<Visibility>;
    get pop_visibility_failed() {
        return this.__pop_visibility_failed.get();
    }
    set pop_visibility_failed(newValue: Visibility) {
        this.__pop_visibility_failed.set(newValue);
    }
    private __pop_visibility_advance: ObservedPropertySimple<Visibility>;
    get pop_visibility_advance() {
        return this.__pop_visibility_advance.get();
    }
    set pop_visibility_advance(newValue: Visibility) {
        this.__pop_visibility_advance.set(newValue);
    }
    private __content: ObservedPropertySimple<string>;
    get content() {
        return this.__content.get();
    }
    set content(newValue: string) {
        this.__content.set(newValue);
    }
    render() {
        Column.create({ space: 20 });
        Column.create({ space: 10 });
        Text.create("Toast文字提示");
        Text.fontSize(25);
        Text.width("100%");
        Text.height(30);
        Text.margin({ left: 10 });
        Text.align(Alignment.Start);
        Text.pop();
        Row.create({ space: 30 });
        Button.createWithLabel("文字提示");
        Button.type(ButtonType.Normal);
        Button.height("10%");
        Button.width("35%");
        Button.backgroundColor(Color.White);
        Button.fontSize(25);
        Button.fontColor(Color.Black);
        Button.shadow({ radius: 5 });
        Button.onClick(() => {
            this.content = "提示内容";
            this.pop_visibility_default = Visibility.Visible;
        });
        Button.pop();
        Button.createWithLabel("长文字提示");
        Button.type(ButtonType.Normal);
        Button.height("10%");
        Button.width("35%");
        Button.backgroundColor(Color.White);
        Button.fontSize(25);
        Button.fontColor(Color.Black);
        Button.shadow({ radius: 5 });
        Button.onClick(() => {
            this.content = "这是一条长文字提示，超过一定字数就会换行";
            this.pop_visibility_default = Visibility.Visible;
        });
        Button.pop();
        Row.pop();
        Column.pop();
        Column.create({ space: 10 });
        Text.create("Toast加载提示");
        Text.fontSize(25);
        Text.width("100%");
        Text.height(30);
        Text.margin({ left: 10 });
        Text.align(Alignment.Start);
        Text.pop();
        Row.create({ space: 30 });
        Button.createWithLabel("加载提示");
        Button.type(ButtonType.Normal);
        Button.height("10%");
        Button.width("35%");
        Button.backgroundColor(Color.White);
        Button.fontSize(25);
        Button.fontColor(Color.Black);
        Button.shadow({ radius: 5 });
        Button.onClick(() => {
            this.content = "加载中...";
            this.pop_visibility_loading = Visibility.Visible;
        });
        Button.pop();
        Row.pop();
        Column.pop();
        Column.create({ space: 10 });
        Text.create("Toast成功/失败提示");
        Text.fontSize(25);
        Text.width("100%");
        Text.height(30);
        Text.margin({ left: 10 });
        Text.align(Alignment.Start);
        Text.pop();
        Row.create({ space: 30 });
        Button.createWithLabel("成功提示");
        Button.type(ButtonType.Normal);
        Button.height("10%");
        Button.width("35%");
        Button.backgroundColor(Color.White);
        Button.fontSize(25);
        Button.fontColor(Color.Black);
        Button.shadow({ radius: 5 });
        Button.onClick(() => {
            this.content = "成功文案";
            this.pop_visibility_success = Visibility.Visible;
        });
        Button.pop();
        Button.createWithLabel("失败提示");
        Button.type(ButtonType.Normal);
        Button.height("10%");
        Button.width("35%");
        Button.backgroundColor(Color.White);
        Button.fontSize(25);
        Button.fontColor(Color.Black);
        Button.shadow({ radius: 5 });
        Button.onClick(() => {
            this.content = "失败文案";
            this.pop_visibility_failed = Visibility.Visible;
        });
        Button.pop();
        Row.pop();
        Column.pop();
        Column.create({ space: 10 });
        Text.create("Toast高级用法");
        Text.fontSize(25);
        Text.width("100%");
        Text.height(30);
        Text.margin({ left: 10 });
        Text.align(Alignment.Start);
        Text.pop();
        Row.create({ space: 30 });
        Button.createWithLabel("高级用法");
        Button.type(ButtonType.Normal);
        Button.height("10%");
        Button.width("35%");
        Button.backgroundColor(Color.White);
        Button.fontSize(25);
        Button.fontColor(Color.Black);
        Button.shadow({ radius: 5 });
        Button.onClick(() => {
            this.pop_visibility_advance = Visibility.Visible;
        });
        Button.pop();
        Row.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new TestToast("1", undefined, {}));
