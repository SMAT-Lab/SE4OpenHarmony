interface Cell_group_Params {
    leftTitle?: string;
    describeMessage?: string;
    label?: string;
    rightTitle?: string;
    leftIcon?: string;
    rightArrow?: string;
    url?: string;
    groupTitle?: string;
    bgColor?: string;
}
interface Cell_Params {
    leftTitle?: string;
    describeMessage?: string;
    label?: string;
    rightTitle?: string;
    leftIcon?: string;
    rightArrow?: string;
    url?: string;
    bgColor?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Cell_" + ++__generate__Id;
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
// @Entry
import router from '@ohos.router';
export class Cell extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.leftTitle = "" //自定义标题显示内容
        ;
        this.describeMessage = "" //自定义标题下方描述显示内容
        ;
        this.label = "";
        this.rightTitle = "";
        this.leftIcon = "" //自定义左侧图标
        ;
        this.rightArrow = "" //自定义右侧按钮
        ;
        this.url = "";
        this.__bgColor = new ObservedPropertySimple("#ffffffff", this, "bgColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Cell_Params) {
        if (params.leftTitle !== undefined) {
            this.leftTitle = params.leftTitle;
        }
        if (params.describeMessage !== undefined) {
            this.describeMessage = params.describeMessage;
        }
        if (params.label !== undefined) {
            this.label = params.label;
        }
        if (params.rightTitle !== undefined) {
            this.rightTitle = params.rightTitle;
        }
        if (params.leftIcon !== undefined) {
            this.leftIcon = params.leftIcon;
        }
        if (params.rightArrow !== undefined) {
            this.rightArrow = params.rightArrow;
        }
        if (params.url !== undefined) {
            this.url = params.url;
        }
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
    }
    aboutToBeDeleted() {
        this.__bgColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private leftTitle: string; //自定义标题显示内容
    private describeMessage: string; //自定义标题下方描述显示内容
    private label: string;
    private rightTitle: string;
    private leftIcon: string; //自定义左侧图标
    private rightArrow: string; //自定义右侧按钮
    private url: string;
    private __bgColor: ObservedPropertySimple<string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: string) {
        this.__bgColor.set(newValue);
    }
    render() {
        Column.create();
        Context.animation({
            duration: 50
        });
        Column.backgroundColor(this.bgColor);
        Column.padding(10);
        Column.width("100%");
        Column.hitTestBehavior(this.rightArrow == "" ? HitTestMode.None : HitTestMode.Default);
        Column.onClick(() => {
            this.bgColor = "#ffc1c1c1";
            router.pushUrl({
                url: this.url
            });
            setTimeout(() => {
                this.bgColor = "#ffffffff";
            }, 50);
        });
        Context.animation(null);
        Row.create();
        Row.width("100%");
        If.create();
        if (this.leftIcon != "") {
            If.branchId(0);
            Image.create($rawfile(this.leftIcon));
            Image.width(16);
            Image.height(16);
            Image.margin({ right: 5 });
        }
        If.pop();
        If.create();
        if (this.leftTitle != "") {
            If.branchId(0);
            Text.create(this.leftTitle);
            Text.alignSelf(ItemAlign.Start);
            Text.margin({ right: 5 });
            Text.pop();
        }
        If.pop();
        If.create();
        if (this.label != "") {
            If.branchId(0);
            Text.create(this.label);
            Text.fontColor("#ffffffff");
            Text.fontSize(14);
            Text.backgroundColor("#ffff0000");
            Text.padding(2);
            Text.pop();
        }
        If.pop();
        If.create();
        if (this.leftTitle == "" && this.leftIcon == "" && this.label == "" && this.describeMessage == "") { //如果只设置rightTitle
            If.branchId(0);
            Text.create(this.rightTitle);
            Text.fontColor("#ff000000");
            Text.margin({ right: 5 });
            Text.pop();
        }
        else {
            If.branchId(1);
            Column.create();
            Column.layoutWeight(1);
            Text.create(this.rightTitle);
            Text.fontColor("#ff818181");
            Text.alignSelf(ItemAlign.End);
            Text.margin({ right: 5 });
            Text.pop();
            Column.pop();
        }
        If.pop();
        If.create();
        if (this.rightArrow != "") {
            If.branchId(0);
            Text.create(this.rightArrow);
            Text.fontWeight(FontWeight.Bolder);
            Text.fontColor("#ff818181");
            Text.pop();
        }
        If.pop();
        Row.pop();
        If.create();
        if (this.describeMessage != "") {
            If.branchId(0);
            Text.create(this.describeMessage);
            Text.fontSize(14);
            Text.fontColor("#ff818181");
            Text.alignSelf(ItemAlign.Start);
            Text.margin({ top: 5 });
            Text.pop();
        }
        If.pop();
        Column.pop();
    }
}
export class Cell_group extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.leftTitle = "" //自定义标题显示内容
        ;
        this.describeMessage = "" //自定义标题下方描述显示内容
        ;
        this.label = "";
        this.rightTitle = "";
        this.leftIcon = "" //自定义左侧图标
        ;
        this.rightArrow = "" //自定义右侧按钮
        ;
        this.url = "";
        this.groupTitle = "";
        this.__bgColor = new ObservedPropertySimple("#ffffffff", this, "bgColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Cell_group_Params) {
        if (params.leftTitle !== undefined) {
            this.leftTitle = params.leftTitle;
        }
        if (params.describeMessage !== undefined) {
            this.describeMessage = params.describeMessage;
        }
        if (params.label !== undefined) {
            this.label = params.label;
        }
        if (params.rightTitle !== undefined) {
            this.rightTitle = params.rightTitle;
        }
        if (params.leftIcon !== undefined) {
            this.leftIcon = params.leftIcon;
        }
        if (params.rightArrow !== undefined) {
            this.rightArrow = params.rightArrow;
        }
        if (params.url !== undefined) {
            this.url = params.url;
        }
        if (params.groupTitle !== undefined) {
            this.groupTitle = params.groupTitle;
        }
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
    }
    aboutToBeDeleted() {
        this.__bgColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private leftTitle: string; //自定义标题显示内容
    private describeMessage: string; //自定义标题下方描述显示内容
    private label: string;
    private rightTitle: string;
    private leftIcon: string; //自定义左侧图标
    private rightArrow: string; //自定义右侧按钮
    private url: string;
    private groupTitle: string;
    private __bgColor: ObservedPropertySimple<string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: string) {
        this.__bgColor.set(newValue);
    }
    render() {
        Column.create();
        Column.width("100%");
        Text.create(this.groupTitle);
        Text.fontColor("#ff818181");
        Text.alignSelf(ItemAlign.Start);
        Text.margin({ left: 10, bottom: 5, top: 10 });
        Text.pop();
        Row.create();
        Context.animation({
            duration: 50
        });
        Row.backgroundColor(this.bgColor);
        Row.padding(10);
        Row.hitTestBehavior(this.rightArrow == "" ? HitTestMode.None : HitTestMode.Default);
        Row.onClick(() => {
            this.bgColor = "#ffc1c1c1";
            router.pushUrl({
                url: this.url
            });
            setTimeout(() => {
                this.bgColor = "#ffffffff";
            }, 50);
        });
        Context.animation(null);
        Row.create();
        Row.width("100%");
        If.create();
        if (this.leftIcon != "") {
            If.branchId(0);
            Image.create($rawfile(this.leftIcon));
            Image.width(16);
            Image.height(16);
            Image.margin({ right: 5 });
        }
        If.pop();
        If.create();
        if (this.leftTitle != "") {
            If.branchId(0);
            Text.create(this.leftTitle);
            Text.alignSelf(ItemAlign.Start);
            Text.margin({ right: 5 });
            Text.pop();
        }
        If.pop();
        If.create();
        if (this.label != "") {
            If.branchId(0);
            Text.create(this.label);
            Text.fontColor("#ffffffff");
            Text.fontSize(12);
            Text.backgroundColor("#ffff0000");
            Text.padding(2);
            Text.pop();
        }
        If.pop();
        If.create();
        if (this.leftTitle == "" && this.leftIcon == "" && this.label == "" && this.describeMessage == "") { //如果只设置rightTitle
            If.branchId(0);
            Text.create(this.rightTitle);
            Text.fontColor("#ff000000");
            Text.margin({ right: 5 });
            Text.pop();
        }
        else {
            If.branchId(1);
            Column.create();
            Column.layoutWeight(1);
            Text.create(this.rightTitle);
            Text.fontColor("#ff818181");
            Text.alignSelf(ItemAlign.End);
            Text.margin({ right: 5 });
            Text.pop();
            Column.pop();
        }
        If.pop();
        If.create();
        if (this.rightArrow != "") {
            If.branchId(0);
            Text.create(this.rightArrow);
            Text.fontWeight(FontWeight.Bolder);
            Text.fontColor("#ff818181");
            Text.pop();
        }
        If.pop();
        Row.pop();
        If.create();
        if (this.describeMessage != "") {
            If.branchId(0);
            Text.create(this.describeMessage);
            Text.fontSize(14);
            Text.fontColor("#ff818181");
            Text.alignSelf(ItemAlign.Start);
            Text.margin({ top: 5 });
            Text.pop();
        }
        If.pop();
        Row.pop();
        Column.pop();
    }
}
