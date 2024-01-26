interface ContactEdit_Params {
    name?: string;
    tel?: string;
    contactName?: string;
    contactTel?: string;
    namePlaceholderFontColor?: string;
    contactEditHeight?: number;
    contactListHeight?: number;
    contactList?: {
        name: string;
        tel: string;
    }[];
    telFontColor?: string;
}
interface ContactList_Params {
    contactList?: {
        name: string;
        tel: string;
    }[];
    selectedIndex?: number;
    bgColor?: string;
    contactListHeight?: number;
    contactListName?: string;
    contactListTel?: string;
    contactEditHeight?: number;
    contactEditName?: string;
    contactEditTel?: string;
}
interface ContactCard_Params {
    contactName?: string;
    contactTel?: string;
    editable?: boolean;
    arr?: number[];
    bgColor?: string;
    contactListHeight?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Contact_" + ++__generate__Id;
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
import promptAction from '@ohos.promptAction';
export class ContactCard extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__contactName = new SynchedPropertySimpleTwoWay(params.contactName, this, "contactName");
        this.__contactTel = new SynchedPropertySimpleTwoWay(params.contactTel, this, "contactTel");
        this.editable = true;
        this.arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.__bgColor = new ObservedPropertySimple("#ffffffff", this, "bgColor");
        this.__contactListHeight = new SynchedPropertySimpleTwoWay(params.contactListHeight, this, "contactListHeight");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ContactCard_Params) {
        if (params.editable !== undefined) {
            this.editable = params.editable;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
    }
    aboutToBeDeleted() {
        this.__contactName.aboutToBeDeleted();
        this.__contactTel.aboutToBeDeleted();
        this.__bgColor.aboutToBeDeleted();
        this.__contactListHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __contactName: SynchedPropertySimpleTwoWay<string>;
    get contactName() {
        return this.__contactName.get();
    }
    set contactName(newValue: string) {
        this.__contactName.set(newValue);
    }
    private __contactTel: SynchedPropertySimpleTwoWay<string>;
    get contactTel() {
        return this.__contactTel.get();
    }
    set contactTel(newValue: string) {
        this.__contactTel.set(newValue);
    }
    private editable: boolean;
    private arr: number[];
    private __bgColor: ObservedPropertySimple<string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: string) {
        this.__bgColor.set(newValue);
    }
    private __contactListHeight: SynchedPropertySimpleTwoWay<number
    // @Link
    >;
    get contactListHeight() {
        return this.__contactListHeight.get();
    }
    set contactListHeight(newValue: number) {
        this.__contactListHeight.set(newValue);
    }
    // @Link
    render() {
        Column.create();
        If.create();
        if (this.editable) {
            If.branchId(0);
            Column.create();
            Column.width("100%");
            Text.create("基础用法");
            Text.alignSelf(ItemAlign.Start);
            Text.margin(20);
            Text.fontColor("#ff5b5b5b");
            Text.pop();
            Column.pop();
        }
        else {
            If.branchId(1);
            Column.create();
            Column.width("100%");
            Text.create("不可编辑");
            Text.alignSelf(ItemAlign.Start);
            Text.margin(20);
            Text.fontColor("#ff5b5b5b");
            Text.pop();
            Column.pop();
        }
        If.pop();
        Column.create();
        Context.animation({ duration: 150 });
        Column.backgroundColor(this.bgColor);
        Column.onClick(() => {
            this.bgColor = "#ffcdcdcd";
            this.contactListHeight = 760;
            setTimeout(() => {
                this.bgColor = "#ffffffff";
            }, 150);
        });
        Column.enabled(this.editable);
        Context.animation(null);
        Row.create();
        Row.width("100%");
        If.create();
        if (this.contactName === "") {
            If.branchId(0);
            Column.create();
            Column.layoutWeight(2);
            Column.margin({ top: 10, bottom: 10 });
            Image.create({ "id": 0, "type": 30000, params: ["Contact_add.png"] });
            Image.height(50);
            Image.width(50);
            Column.pop();
            Column.create();
            Column.layoutWeight(8);
            Text.create("添加联系人");
            Text.fontSize(18);
            Text.alignSelf(ItemAlign.Start);
            Text.pop();
            Column.pop();
        }
        else {
            If.branchId(1);
            Column.create();
            Column.layoutWeight(1);
            Column.margin({ left: 10 });
            Image.create({ "id": 0, "type": 30000, params: ["Contact_user.png"] });
            Image.width(25);
            Image.height(25);
            Column.pop();
            Column.create();
            Column.layoutWeight(8);
            Column.margin({ top: 15, bottom: 15 });
            Text.create("姓名: " + this.contactName);
            Text.alignSelf(ItemAlign.Start);
            Text.fontSize(18);
            Text.pop();
            Text.create("电话: " + this.contactTel);
            Text.alignSelf(ItemAlign.Start);
            Text.fontSize(18);
            Text.pop();
            Column.pop();
        }
        If.pop();
        If.create();
        if (this.editable) {
            If.branchId(0);
            Column.create();
            Column.layoutWeight(1);
            Image.create({ "id": 0, "type": 30000, params: ["Contact_rightArrow.png"] });
            Image.width(25);
            Column.pop();
        }
        else {
            If.branchId(1);
            Column.create();
            Column.layoutWeight(1);
            Column.pop();
        }
        If.pop();
        Row.pop();
        If.create();
        if (this.editable) {
            If.branchId(0);
            Flex.create({ justifyContent: FlexAlign.SpaceAround, direction: FlexDirection.Row });
            ForEach.create("2", this, ObservedObject.GetRawObject(this.arr), () => {
                Rect.create();
                Rect.layoutWeight(1);
                Rect.height(3);
                Rect.fill("#ff0080ff");
                Rect.margin({ right: 3, left: 3 });
                Rect.create();
                Rect.layoutWeight(1);
                Rect.height(3);
                Rect.fill("#ffff3030");
            });
            ForEach.pop();
            Flex.pop();
        }
        else {
            If.branchId(1);
            Flex.create({ justifyContent: FlexAlign.SpaceAround, direction: FlexDirection.Row });
            ForEach.create("3", this, ObservedObject.GetRawObject(this.arr), () => {
                Rect.create();
                Rect.layoutWeight(1);
                Rect.height(2);
                Rect.fill("#ff2793ff");
                Rect.margin({ right: 3, left: 3 });
                Rect.create();
                Rect.layoutWeight(1);
                Rect.height(2);
                Rect.fill("#ffff4747");
            });
            ForEach.pop();
            Flex.pop();
        }
        If.pop();
        Column.pop();
        Column.pop();
    }
}
export class ContactList extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__contactList = new SynchedPropertyObjectTwoWay(params.contactList, this, "contactList");
        this.__selectedIndex = new ObservedPropertySimple(0, this, "selectedIndex");
        this.__bgColor = new ObservedPropertySimple("#ffffffff", this, "bgColor");
        this.__contactListHeight = new SynchedPropertySimpleTwoWay(params.contactListHeight, this, "contactListHeight");
        this.__contactListName = new SynchedPropertySimpleTwoWay(params.contactListName, this, "contactListName");
        this.__contactListTel = new SynchedPropertySimpleTwoWay(params.contactListTel, this, "contactListTel");
        this.__contactEditHeight = new SynchedPropertySimpleTwoWay(params.contactEditHeight, this, "contactEditHeight");
        this.__contactEditName = new SynchedPropertySimpleTwoWay(params.contactEditName, this, "contactEditName");
        this.__contactEditTel = new SynchedPropertySimpleTwoWay(params.contactEditTel, this, "contactEditTel");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ContactList_Params) {
        if (params.selectedIndex !== undefined) {
            this.selectedIndex = params.selectedIndex;
        }
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
    }
    aboutToBeDeleted() {
        this.__contactList.aboutToBeDeleted();
        this.__selectedIndex.aboutToBeDeleted();
        this.__bgColor.aboutToBeDeleted();
        this.__contactListHeight.aboutToBeDeleted();
        this.__contactListName.aboutToBeDeleted();
        this.__contactListTel.aboutToBeDeleted();
        this.__contactEditHeight.aboutToBeDeleted();
        this.__contactEditName.aboutToBeDeleted();
        this.__contactEditTel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __contactList: SynchedPropertySimpleOneWay<{
        name: string;
        tel: string;
    }[]>;
    get contactList() {
        return this.__contactList.get();
    }
    set contactList(newValue: {
        name: string;
        tel: string;
    }[]) {
        this.__contactList.set(newValue);
    }
    private __selectedIndex: ObservedPropertySimple<number>;
    get selectedIndex() {
        return this.__selectedIndex.get();
    }
    set selectedIndex(newValue: number) {
        this.__selectedIndex.set(newValue);
    }
    private __bgColor: ObservedPropertySimple<string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: string) {
        this.__bgColor.set(newValue);
    }
    private __contactListHeight: SynchedPropertySimpleTwoWay<number>;
    get contactListHeight() {
        return this.__contactListHeight.get();
    }
    set contactListHeight(newValue: number) {
        this.__contactListHeight.set(newValue);
    }
    private __contactListName: SynchedPropertySimpleTwoWay<string>;
    get contactListName() {
        return this.__contactListName.get();
    }
    set contactListName(newValue: string) {
        this.__contactListName.set(newValue);
    }
    private __contactListTel: SynchedPropertySimpleTwoWay<string>;
    get contactListTel() {
        return this.__contactListTel.get();
    }
    set contactListTel(newValue: string) {
        this.__contactListTel.set(newValue);
    }
    private __contactEditHeight: SynchedPropertySimpleTwoWay<number>;
    get contactEditHeight() {
        return this.__contactEditHeight.get();
    }
    set contactEditHeight(newValue: number) {
        this.__contactEditHeight.set(newValue);
    }
    private __contactEditName: SynchedPropertySimpleTwoWay<string>;
    get contactEditName() {
        return this.__contactEditName.get();
    }
    set contactEditName(newValue: string) {
        this.__contactEditName.set(newValue);
    }
    private __contactEditTel: SynchedPropertySimpleTwoWay<string>;
    get contactEditTel() {
        return this.__contactEditTel.get();
    }
    set contactEditTel(newValue: string) {
        this.__contactEditTel.set(newValue);
    }
    render() {
        Row.create();
        Context.animation({ duration: 300 });
        Row.height(this.contactListHeight);
        Context.animation(null);
        Column.create();
        Column.backgroundColor("#ffe5e5e5");
        Column.alignSelf(ItemAlign.End);
        List.create();
        List.layoutWeight(12);
        ForEach.create("4", this, ObservedObject.GetRawObject(this.contactList), (item: {
            name: string;
            tel: string;
        }, index) => {
            ListItem.create();
            Context.animation({ duration: 150 });
            ListItem.backgroundColor(this.selectedIndex === index ? this.bgColor : "#ffffffff");
            ListItem.padding({ top: 15, bottom: 15 });
            ListItem.onClick(() => {
                //改变选中的对象
                this.selectedIndex = index;
                this.bgColor = "#ffe5e5e5";
                //关闭contactList
                this.contactListHeight = 0;
                //将值传回给父组件
                this.contactListName = item.name;
                this.contactListTel = item.tel;
                setTimeout(() => {
                    this.bgColor = "#ffffffff";
                }, 150);
            });
            Context.animation(null);
            Row.create();
            Column.create();
            Column.layoutWeight(1);
            If.create();
            if (this.selectedIndex === index) {
                If.branchId(0);
                Image.create({ "id": 0, "type": 30000, params: ["AddressList_selected.png"] });
                Image.width(20);
                Image.height(20);
            }
            else {
                If.branchId(1);
                Circle.create();
                Circle.fill("#ffffffff");
                Circle.stroke("#ff9f9f9f");
                Circle.strokeWidth(1);
                Circle.width(16);
                Circle.height(16);
            }
            If.pop();
            Column.pop();
            Column.create();
            Column.layoutWeight(8);
            Text.create(item.name + "，" + item.tel);
            Text.alignSelf(ItemAlign.Start);
            Text.pop();
            Column.pop();
            Column.create();
            Column.layoutWeight(1);
            Image.create({ "id": 0, "type": 30000, params: ["AddressList_edit.png"] });
            Image.height(20);
            Image.width(25);
            Column.pop();
            Row.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Column.create();
        Column.layoutWeight(1);
        Button.createWithLabel("新建联系人");
        Context.animation({ duration: 300 });
        Button.width("100%");
        Button.height("100%");
        Button.fontSize(20);
        Button.type(ButtonType.Normal);
        Button.backgroundColor("#ff0000");
        Button.onClick(() => {
            //展示contactEdit页面
            this.contactEditHeight = 760;
            //清空contactEdit页面的name值和Tel值
            this.contactEditName = "";
            this.contactEditTel = "";
        });
        Context.animation(null);
        Button.pop();
        Column.pop();
        Column.pop();
        Row.pop();
    }
}
export class ContactEdit extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.name = "";
        this.tel = "";
        this.__contactName = new SynchedPropertySimpleTwoWay(params.contactName, this, "contactName");
        this.__contactTel = new SynchedPropertySimpleTwoWay(params.contactTel, this, "contactTel");
        this.__namePlaceholderFontColor = new ObservedPropertySimple("#ffa4a4a4", this, "namePlaceholderFontColor");
        this.__contactEditHeight = new SynchedPropertySimpleTwoWay(params.contactEditHeight, this, "contactEditHeight");
        this.__contactListHeight = new SynchedPropertySimpleTwoWay(params.contactListHeight, this, "contactListHeight");
        this.__contactList = new SynchedPropertyObjectTwoWay(params.contactList, this, "contactList");
        this.__telFontColor = new ObservedPropertySimple("#ff000000"
        //展示提示弹窗
        , this, "telFontColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ContactEdit_Params) {
        if (params.name !== undefined) {
            this.name = params.name;
        }
        if (params.tel !== undefined) {
            this.tel = params.tel;
        }
        if (params.namePlaceholderFontColor !== undefined) {
            this.namePlaceholderFontColor = params.namePlaceholderFontColor;
        }
        if (params.telFontColor !== undefined) {
            this.telFontColor = params.telFontColor;
        }
    }
    aboutToBeDeleted() {
        this.__contactName.aboutToBeDeleted();
        this.__contactTel.aboutToBeDeleted();
        this.__namePlaceholderFontColor.aboutToBeDeleted();
        this.__contactEditHeight.aboutToBeDeleted();
        this.__contactListHeight.aboutToBeDeleted();
        this.__contactList.aboutToBeDeleted();
        this.__telFontColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private name: string;
    private tel: string;
    private __contactName: SynchedPropertySimpleTwoWay<string>;
    get contactName() {
        return this.__contactName.get();
    }
    set contactName(newValue: string) {
        this.__contactName.set(newValue);
    }
    private __contactTel: SynchedPropertySimpleTwoWay<string>;
    get contactTel() {
        return this.__contactTel.get();
    }
    set contactTel(newValue: string) {
        this.__contactTel.set(newValue);
    }
    private __namePlaceholderFontColor: ObservedPropertySimple<string>;
    get namePlaceholderFontColor() {
        return this.__namePlaceholderFontColor.get();
    }
    set namePlaceholderFontColor(newValue: string) {
        this.__namePlaceholderFontColor.set(newValue);
    }
    private __contactEditHeight: SynchedPropertySimpleTwoWay<number>;
    get contactEditHeight() {
        return this.__contactEditHeight.get();
    }
    set contactEditHeight(newValue: number) {
        this.__contactEditHeight.set(newValue);
    }
    private __contactListHeight: SynchedPropertySimpleTwoWay<number>;
    get contactListHeight() {
        return this.__contactListHeight.get();
    }
    set contactListHeight(newValue: number) {
        this.__contactListHeight.set(newValue);
    }
    private __contactList: SynchedPropertySimpleOneWay<{
        name: string;
        tel: string;
    }[]>;
    get contactList() {
        return this.__contactList.get();
    }
    set contactList(newValue: {
        name: string;
        tel: string;
    }[]) {
        this.__contactList.set(newValue);
    }
    private __telFontColor: ObservedPropertySimple<string>;
    get telFontColor() {
        return this.__telFontColor.get();
    }
    set telFontColor(newValue: string) {
        this.__telFontColor.set(newValue);
    }
    //展示提示弹窗
    showTips(message: string) {
        promptAction.showToast({
            message: message,
            duration: 1000,
            bottom: 400
        });
    }
    render() {
        Row.create();
        Context.animation({ duration: 300 });
        Row.height(this.contactEditHeight);
        Context.animation(null);
        Column.create();
        Column.backgroundColor("#ffe5e5e5");
        Column.width("100%");
        Column.height("100%");
        Column.create();
        Column.create();
        Column.backgroundColor("#ffffffff");
        Row.create();
        Row.margin({ left: 10, top: 10, bottom: 5 });
        Text.create("姓名");
        Text.margin({ right: 10 });
        Text.pop();
        TextInput.create({ placeholder: "请填写姓名", text: this.contactName });
        TextInput.backgroundColor("#ffffff");
        TextInput.onChange((value) => {
            this.name = value;
        });
        Row.pop();
        Divider.create();
        Divider.width("95%");
        Row.create();
        Row.margin({ left: 10, top: 5, bottom: 10 });
        Text.create("电话");
        Text.margin({ right: 10 });
        Text.pop();
        TextInput.create({ placeholder: "请填写电话", text: this.contactTel });
        TextInput.backgroundColor("#ffffff");
        TextInput.fontColor(this.telFontColor);
        TextInput.onChange((value) => {
            this.telFontColor = "#ff000000";
            this.tel = value;
        });
        Row.pop();
        Column.pop();
        Button.createWithLabel("保存");
        Button.onClick((event: ClickEvent) => {
            //将文本输入框中的值赋值
            this.contactName = this.name;
            this.contactTel = this.tel;
            if (this.contactTel.length == 11 && /^\d+$/.test(this.contactTel)) {
                //关闭编辑页面
                this.contactEditHeight = 0;
                //关闭联系人列表页面
                this.contactListHeight = 0;
                //将该联系人加入到联系人列表中
                this.contactList.push({ name: this.contactName, tel: this.contactTel });
            }
            else {
                this.showTips("请填写正确的电话");
                this.telFontColor = "#ffff0000";
            }
        });
        Button.margin({ top: 30 });
        Button.width("90%");
        Button.type(ButtonType.Normal);
        Button.backgroundColor("#ffff0000");
        Button.pop();
        Column.pop();
        Column.pop();
        Row.pop();
    }
}
