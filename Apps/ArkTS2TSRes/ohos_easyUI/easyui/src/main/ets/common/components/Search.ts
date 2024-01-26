interface search_advance_Params {
    searchIconUrl?: string;
    placeholder?: string;
    text?: string;
    inputType?: InputType;
    borderRadius_num?: number;
    visibility_close?: Visibility;
    controller?: TextInputController;
}
interface search_listen_Params {
    searchIconUrl?: string;
    placeholder?: string;
    text?: string;
    inputType?: InputType;
    borderRadius_num?: number;
    visibility_close?: Visibility;
    controller?: TextInputController;
}
interface search_default_Params {
    searchIconUrl?: string;
    placeholder?: string;
    text?: string;
    inputType?: InputType;
    borderRadius_num?: number;
    visibility_close?: Visibility;
    controller?: TextInputController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Search_" + ++__generate__Id;
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
/**
 * 搜索_基础用法
 */
import promptAction from '@ohos.promptAction';
export class search_default extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__searchIconUrl = new ObservedPropertySimple("", this, "searchIconUrl");
        this.__placeholder = new ObservedPropertySimple("", this, "placeholder");
        this.__text = new ObservedPropertySimple("", this, "text");
        this.__inputType = new ObservedPropertySimple(InputType.Normal, this, "inputType");
        this.__borderRadius_num = new ObservedPropertySimple(0, this, "borderRadius_num");
        this.__visibility_close = new ObservedPropertySimple(Visibility.Hidden, this, "visibility_close");
        this.controller = new TextInputController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: search_default_Params) {
        if (params.searchIconUrl !== undefined) {
            this.searchIconUrl = params.searchIconUrl;
        }
        if (params.placeholder !== undefined) {
            this.placeholder = params.placeholder;
        }
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.inputType !== undefined) {
            this.inputType = params.inputType;
        }
        if (params.borderRadius_num !== undefined) {
            this.borderRadius_num = params.borderRadius_num;
        }
        if (params.visibility_close !== undefined) {
            this.visibility_close = params.visibility_close;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__searchIconUrl.aboutToBeDeleted();
        this.__placeholder.aboutToBeDeleted();
        this.__text.aboutToBeDeleted();
        this.__inputType.aboutToBeDeleted();
        this.__borderRadius_num.aboutToBeDeleted();
        this.__visibility_close.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __searchIconUrl: ObservedPropertySimple<string>; //搜索图标图片路径
    get searchIconUrl() {
        return this.__searchIconUrl.get();
    }
    set searchIconUrl(newValue: string) {
        this.__searchIconUrl.set(newValue);
    }
    private __placeholder: ObservedPropertySimple<string>; //输入框提示文本
    get placeholder() {
        return this.__placeholder.get();
    }
    set placeholder(newValue: string) {
        this.__placeholder.set(newValue);
    }
    private __text: ObservedPropertySimple<string>; //输入框文本
    get text() {
        return this.__text.get();
    }
    set text(newValue: string) {
        this.__text.set(newValue);
    }
    private __inputType: ObservedPropertySimple<InputType>; //输入框类型
    get inputType() {
        return this.__inputType.get();
    }
    set inputType(newValue: InputType) {
        this.__inputType.set(newValue);
    }
    private __borderRadius_num: ObservedPropertySimple<number>; //输入框圆角值
    get borderRadius_num() {
        return this.__borderRadius_num.get();
    }
    set borderRadius_num(newValue: number) {
        this.__borderRadius_num.set(newValue);
    }
    private __visibility_close: ObservedPropertySimple<Visibility>; //关闭按钮的可见性
    get visibility_close() {
        return this.__visibility_close.get();
    }
    set visibility_close(newValue: Visibility) {
        this.__visibility_close.set(newValue);
    }
    private controller: TextInputController;
    render() {
        Column.create();
        Row.create();
        Row.backgroundColor(Color.White);
        Row.borderRadius(this.borderRadius_num);
        Row.width("100%");
        Row.height(100);
        Row.alignItems(VerticalAlign.Center);
        Row.create();
        Row.borderRadius(this.borderRadius_num);
        Row.width('90%');
        Row.margin({ right: "5%", left: "5%" });
        Row.backgroundColor("#ffefefef");
        Stack.create();
        Stack.width("15%");
        Image.create($rawfile(this.searchIconUrl));
        Image.height(30);
        Image.width(30);
        Stack.pop();
        Stack.create();
        Stack.width("75%");
        Stack.opacity(0.5);
        TextInput.create({ placeholder: this.placeholder, text: this.text, controller: this.controller });
        TextInput.placeholderColor(Color.Black);
        TextInput.caretColor(Color.Black);
        TextInput.backgroundColor("#ffefefef");
        TextInput.height(50);
        TextInput.fontSize(20);
        TextInput.fontWeight(FontWeight.Bold);
        TextInput.fontColor(Color.Black);
        TextInput.borderWidth(0);
        TextInput.borderRadius(this.borderRadius_num);
        TextInput.type(this.inputType);
        TextInput.onChange((value: string) => {
            this.text = value;
            if (this.text.length > 0)
                this.visibility_close = Visibility.Visible;
            else
                this.visibility_close = Visibility.Hidden;
        });
        TextInput.onEditChange((isEdit: boolean) => {
            if (isEdit && this.text.length > 0) {
                this.visibility_close = Visibility.Visible;
            }
            else {
                this.visibility_close = Visibility.Hidden;
            }
        });
        Stack.pop();
        Image.create({ "id": 0, "type": 30000, params: ["Search_close.png"] });
        Image.height(30);
        Image.position({ x: "88%", y: "10%" });
        Image.visibility(this.visibility_close);
        Image.onClick(() => {
            this.text = "";
        });
        Image.opacity(0.7);
        Row.pop();
        Row.pop();
        Column.pop();
    }
}
export class search_listen extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__searchIconUrl = new ObservedPropertySimple("", this, "searchIconUrl");
        this.__placeholder = new ObservedPropertySimple("", this, "placeholder");
        this.__text = new ObservedPropertySimple("", this, "text");
        this.__inputType = new ObservedPropertySimple(InputType.Normal, this, "inputType");
        this.__borderRadius_num = new ObservedPropertySimple(0, this, "borderRadius_num");
        this.__visibility_close = new ObservedPropertySimple(Visibility.Hidden, this, "visibility_close");
        this.controller = new TextInputController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: search_listen_Params) {
        if (params.searchIconUrl !== undefined) {
            this.searchIconUrl = params.searchIconUrl;
        }
        if (params.placeholder !== undefined) {
            this.placeholder = params.placeholder;
        }
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.inputType !== undefined) {
            this.inputType = params.inputType;
        }
        if (params.borderRadius_num !== undefined) {
            this.borderRadius_num = params.borderRadius_num;
        }
        if (params.visibility_close !== undefined) {
            this.visibility_close = params.visibility_close;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__searchIconUrl.aboutToBeDeleted();
        this.__placeholder.aboutToBeDeleted();
        this.__text.aboutToBeDeleted();
        this.__inputType.aboutToBeDeleted();
        this.__borderRadius_num.aboutToBeDeleted();
        this.__visibility_close.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __searchIconUrl: ObservedPropertySimple<string>; //搜索图标图片路径
    get searchIconUrl() {
        return this.__searchIconUrl.get();
    }
    set searchIconUrl(newValue: string) {
        this.__searchIconUrl.set(newValue);
    }
    private __placeholder: ObservedPropertySimple<string>; //输入框提示文本
    get placeholder() {
        return this.__placeholder.get();
    }
    set placeholder(newValue: string) {
        this.__placeholder.set(newValue);
    }
    private __text: ObservedPropertySimple<string>; //输入框文本
    get text() {
        return this.__text.get();
    }
    set text(newValue: string) {
        this.__text.set(newValue);
    }
    private __inputType: ObservedPropertySimple<InputType>; //输入框类型
    get inputType() {
        return this.__inputType.get();
    }
    set inputType(newValue: InputType) {
        this.__inputType.set(newValue);
    }
    private __borderRadius_num: ObservedPropertySimple<number>; //输入框圆角值
    get borderRadius_num() {
        return this.__borderRadius_num.get();
    }
    set borderRadius_num(newValue: number) {
        this.__borderRadius_num.set(newValue);
    }
    private __visibility_close: ObservedPropertySimple<Visibility>; //关闭按钮的可见性
    get visibility_close() {
        return this.__visibility_close.get();
    }
    set visibility_close(newValue: Visibility) {
        this.__visibility_close.set(newValue);
    }
    private controller: TextInputController;
    render() {
        Column.create();
        Row.create();
        Row.backgroundColor(Color.White);
        Row.borderRadius(this.borderRadius_num);
        Row.width("100%");
        Row.height(100);
        Row.alignItems(VerticalAlign.Center);
        Row.create();
        Row.height("50");
        Row.borderRadius(this.borderRadius_num);
        Row.width('90%');
        Row.margin({ right: "5%", left: "5%" });
        Row.backgroundColor("#ffefefef");
        Stack.create();
        Stack.width("15%");
        Image.create($rawfile(this.searchIconUrl));
        Image.height(30);
        Image.width(30);
        Stack.pop();
        Row.create();
        Row.backgroundColor("#ffefefef");
        Row.width("70%");
        Row.opacity(0.5);
        TextInput.create({ placeholder: this.placeholder, text: this.text, controller: this.controller });
        TextInput.placeholderColor(Color.Gray);
        TextInput.caretColor(Color.Black);
        TextInput.width("90%");
        TextInput.height(50);
        TextInput.fontSize(20);
        TextInput.backgroundColor("#ffefefef");
        TextInput.fontWeight(FontWeight.Bold);
        TextInput.fontStyle(FontStyle.Normal);
        TextInput.fontColor(Color.Black);
        TextInput.borderWidth(0);
        TextInput.borderRadius(this.borderRadius_num);
        TextInput.type(this.inputType);
        TextInput.onSubmit((key: EnterKeyType) => {
            promptAction.showToast({
                message: this.text,
                duration: 1500,
                bottom: 500 // 距离底部的距离
            });
        });
        TextInput.onChange((value: string) => {
            this.text = value;
            if (this.text.length > 0)
                this.visibility_close = Visibility.Visible;
            else
                this.visibility_close = Visibility.Hidden;
        });
        TextInput.onEditChange((isEdit: boolean) => {
            if (isEdit && this.text.length > 0) {
                this.visibility_close = Visibility.Visible;
            }
            else {
                this.visibility_close = Visibility.Hidden;
            }
        });
        Image.create({ "id": 0, "type": 30000, params: ["Search_close.png"] });
        Image.height(35);
        Image.position({ x: "88%", y: "15%" });
        Image.visibility(this.visibility_close);
        Image.onClick(() => {
            this.text = "";
        });
        Row.pop();
        Text.create("取消");
        Text.width("15%");
        Text.height("100%");
        Text.backgroundColor(Color.White);
        Text.fontSize(20);
        Text.fontColor(Color.Black);
        Text.textAlign(TextAlign.Center);
        Text.onClick(() => {
            promptAction.showToast({
                message: "取消",
                duration: 1500,
                bottom: 500 // 距离底部的距离
            });
            this.text = "";
        });
        Text.pop();
        Row.pop();
        Row.pop();
        Column.pop();
    }
}
export class search_advance extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__searchIconUrl = new ObservedPropertySimple("", this, "searchIconUrl");
        this.__placeholder = new ObservedPropertySimple("", this, "placeholder");
        this.__text = new ObservedPropertySimple("", this, "text");
        this.__inputType = new ObservedPropertySimple(InputType.Normal, this, "inputType");
        this.__borderRadius_num = new ObservedPropertySimple(0, this, "borderRadius_num");
        this.__visibility_close = new ObservedPropertySimple(Visibility.Hidden, this, "visibility_close");
        this.controller = new TextInputController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: search_advance_Params) {
        if (params.searchIconUrl !== undefined) {
            this.searchIconUrl = params.searchIconUrl;
        }
        if (params.placeholder !== undefined) {
            this.placeholder = params.placeholder;
        }
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.inputType !== undefined) {
            this.inputType = params.inputType;
        }
        if (params.borderRadius_num !== undefined) {
            this.borderRadius_num = params.borderRadius_num;
        }
        if (params.visibility_close !== undefined) {
            this.visibility_close = params.visibility_close;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__searchIconUrl.aboutToBeDeleted();
        this.__placeholder.aboutToBeDeleted();
        this.__text.aboutToBeDeleted();
        this.__inputType.aboutToBeDeleted();
        this.__borderRadius_num.aboutToBeDeleted();
        this.__visibility_close.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __searchIconUrl: ObservedPropertySimple<string>; //搜索图标图片路径
    get searchIconUrl() {
        return this.__searchIconUrl.get();
    }
    set searchIconUrl(newValue: string) {
        this.__searchIconUrl.set(newValue);
    }
    private __placeholder: ObservedPropertySimple<string>; //输入框提示文本
    get placeholder() {
        return this.__placeholder.get();
    }
    set placeholder(newValue: string) {
        this.__placeholder.set(newValue);
    }
    private __text: ObservedPropertySimple<string>; //输入框文本
    get text() {
        return this.__text.get();
    }
    set text(newValue: string) {
        this.__text.set(newValue);
    }
    private __inputType: ObservedPropertySimple<InputType>; //输入框类型
    get inputType() {
        return this.__inputType.get();
    }
    set inputType(newValue: InputType) {
        this.__inputType.set(newValue);
    }
    private __borderRadius_num: ObservedPropertySimple<number>; //输入框圆角值
    get borderRadius_num() {
        return this.__borderRadius_num.get();
    }
    set borderRadius_num(newValue: number) {
        this.__borderRadius_num.set(newValue);
    }
    private __visibility_close: ObservedPropertySimple<Visibility>; //关闭按钮的可见性
    get visibility_close() {
        return this.__visibility_close.get();
    }
    set visibility_close(newValue: Visibility) {
        this.__visibility_close.set(newValue);
    }
    private controller: TextInputController;
    render() {
        Column.create();
        Row.create();
        Row.backgroundColor(Color.White);
        Row.width("100%");
        Row.height(100);
        Row.alignItems(VerticalAlign.Center);
        Row.create();
        Row.borderRadius(this.borderRadius_num);
        Row.backgroundColor("#ffefefef");
        Row.height("50");
        Row.width('80%');
        Row.margin({ left: "5%" });
        Row.create();
        Row.width("18%");
        Text.create("地址");
        Text.fontSize("20");
        Text.margin({ left: 5 });
        Text.pop();
        Image.create($rawfile(this.searchIconUrl));
        Image.height(30);
        Image.width(30);
        Image.margin({ left: 5 });
        Row.pop();
        Row.create();
        Row.margin({ left: "5%" });
        Row.width("75%");
        Row.opacity(0.5);
        TextInput.create({ placeholder: this.placeholder, text: this.text, controller: this.controller });
        TextInput.placeholderColor(Color.Gray);
        TextInput.caretColor(Color.Black);
        TextInput.width("90%");
        TextInput.height(50);
        TextInput.fontSize(20);
        TextInput.borderRadius(0);
        TextInput.backgroundColor("#ffefefef");
        TextInput.fontWeight(FontWeight.Bold);
        TextInput.fontStyle(FontStyle.Normal);
        TextInput.fontColor(Color.Black);
        TextInput.borderWidth(0);
        TextInput.type(this.inputType);
        TextInput.onSubmit((key: EnterKeyType) => {
            promptAction.showToast({
                message: this.text,
                duration: 1500,
                bottom: 500 // 距离底部的距离
            });
        });
        TextInput.onChange((value: string) => {
            this.text = value;
            if (this.text.length > 0)
                this.visibility_close = Visibility.Visible;
            else
                this.visibility_close = Visibility.Hidden;
        });
        TextInput.onEditChange((isEdit: boolean) => {
            if (isEdit && this.text.length > 0) {
                this.visibility_close = Visibility.Visible;
            }
            else {
                this.visibility_close = Visibility.Hidden;
            }
        });
        Image.create({ "id": 0, "type": 30000, params: ["Search_close.png"] });
        Image.height(35);
        Image.position({ x: "88%", y: "15%" });
        Image.visibility(this.visibility_close);
        Image.onClick(() => {
            this.text = "";
        });
        Row.pop();
        Row.pop();
        Text.create("搜索");
        Text.height("100%");
        Text.backgroundColor(Color.White);
        Text.fontSize(20);
        Text.fontColor(Color.Black);
        Text.textAlign(TextAlign.Center);
        Text.onClick(() => {
            promptAction.showToast({
                message: this.text,
                duration: 1500,
                bottom: 500 // 距离底部的距离
            });
        });
        Text.pop();
        Row.pop();
        Column.pop();
    }
}
