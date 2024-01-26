interface CustomDialogExample_Params {
    controller?: CustomDialogController;
    confirm?: (a: string, b: string, c?: string) => void;
    value?: string;
    suffix?: string;
    content?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "create_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
let filename: string = "";
export function create(name: string) {
    filename = name;
}
export class CustomDialogExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = undefined;
        this.confirm = undefined;
        this.__value = new ObservedPropertySimple("", this, "value");
        this.__suffix = new ObservedPropertySimple(".txt", this, "suffix");
        this.__content = new ObservedPropertySimple("", this, "content");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomDialogExample_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
        if (params.value !== undefined) {
            this.value = params.value;
        }
        if (params.suffix !== undefined) {
            this.suffix = params.suffix;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
    }
    aboutToBeDeleted() {
        this.__value.aboutToBeDeleted();
        this.__suffix.aboutToBeDeleted();
        this.__content.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private confirm?: (a: string, b: string, c?: string) => void;
    private __value: ObservedPropertySimple<string>;
    get value() {
        return this.__value.get();
    }
    set value(newValue: string) {
        this.__value.set(newValue);
    }
    private __suffix: ObservedPropertySimple<string>;
    get suffix() {
        return this.__suffix.get();
    }
    set suffix(newValue: string) {
        this.__suffix.set(newValue);
    }
    private __content: ObservedPropertySimple<string>;
    get content() {
        return this.__content.get();
    }
    set content(newValue: string) {
        this.__content.set(newValue);
    }
    render() {
        Column.create();
        Row.create();
        Row.margin({ top: 10 });
        TextInput.create({ placeholder: "请输入文件名" });
        TextInput.width("50%");
        TextInput.onChange((e) => {
            this.value = e;
        });
        If.create();
        if (filename != "folder") {
            If.branchId(0);
            Text.create(this.suffix);
            Text.fontSize(18);
            Text.pop();
        }
        If.pop();
        Row.pop();
        If.create();
        if (filename != "folder") {
            If.branchId(0);
            TextInput.create({ placeholder: "请输入文件内容" });
            TextInput.margin({ top: 10, bottom: 10 });
            TextInput.width("60%");
            TextInput.onChange(e => {
                this.content = e;
            });
        }
        If.pop();
        Row.create();
        Button.createWithLabel("取消");
        Button.onClick(() => {
            if (this.controller !== undefined) {
                this.controller.close();
            }
        });
        Button.backgroundColor(0xffffff);
        Button.fontColor(Color.Black);
        Button.pop();
        Button.createWithLabel("确定");
        Button.onClick(() => {
            if (this.controller !== undefined) {
                this.controller.close();
            }
            let folder = "";
            if (filename != "folder") {
                folder = this.value.length <= 0 ? this.value : this.value + this.suffix;
            }
            else {
                folder = this.value;
            }
            if (!!this.confirm)
                this.confirm(folder, filename != "folder" ? "file" : "folder", this.content);
        });
        Button.backgroundColor(0xffffff);
        Button.fontColor(Color.Red);
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
