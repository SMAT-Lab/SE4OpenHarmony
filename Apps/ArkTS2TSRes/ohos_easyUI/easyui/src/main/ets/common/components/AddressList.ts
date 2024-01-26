interface addressEnable_Params {
    bgColor?: string;
    address?: Address;
}
interface address_Params {
    address?: Address //地址
    ;
    bgColor?: string;
    clickColor?: string;
    isSelectedId?: number //被选中的id
    ;
    isSelected?: boolean;
}
interface AddressList_Params {
    addressList?: Address[];
    outRangeIdArray?: number[];
    isSelectedId?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AddressList_" + ++__generate__Id;
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
type Address = {
    id: number;
    name: string;
    tel: string;
    address: string;
};
export class AddressList extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.addressList = [] //地址列表
        ;
        this.outRangeIdArray = [] //超出配送范围的地址id集合
        ;
        this.__isSelectedId = new ObservedPropertySimple(1 //被选中的地址
        //展示提示弹窗
        , this, "isSelectedId");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AddressList_Params) {
        if (params.addressList !== undefined) {
            this.addressList = params.addressList;
        }
        if (params.outRangeIdArray !== undefined) {
            this.outRangeIdArray = params.outRangeIdArray;
        }
        if (params.isSelectedId !== undefined) {
            this.isSelectedId = params.isSelectedId;
        }
    }
    aboutToBeDeleted() {
        this.__isSelectedId.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private addressList: Address[]; //地址列表
    private outRangeIdArray: number[]; //超出配送范围的地址id集合
    private __isSelectedId: ObservedPropertySimple<number>; //被选中的地址
    get isSelectedId() {
        return this.__isSelectedId.get();
    }
    set isSelectedId(newValue: number) {
        this.__isSelectedId.set(newValue);
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
        Column.create();
        Column.create();
        Column.height(400);
        Column.backgroundColor("#ffababab");
        List.create();
        ForEach.create("4", this, ObservedObject.GetRawObject(this.addressList), (item: Address, index) => {
            ListItem.create();
            If.create();
            if (!this.outRangeIdArray.includes(item.id)) {
                If.branchId(0);
                If.create();
                if (this.isSelectedId === item.id) {
                    If.branchId(0);
                    let earlierCreatedChild_2: address = (this && this.findChildById) ? this.findChildById("2") as address : undefined;
                    if (earlierCreatedChild_2 == undefined) {
                        View.create(new address("2", this, {
                            address: item,
                            isSelectedId: this.__isSelectedId,
                            isSelected: true
                        }));
                    }
                    else {
                        earlierCreatedChild_2.updateWithValueParams({
                            address: item,
                            isSelected: true
                        });
                        View.create(earlierCreatedChild_2);
                    }
                }
                else {
                    If.branchId(1);
                    let earlierCreatedChild_3: address = (this && this.findChildById) ? this.findChildById("3") as address : undefined;
                    if (earlierCreatedChild_3 == undefined) {
                        View.create(new address("3", this, {
                            address: item,
                            isSelectedId: this.__isSelectedId,
                            isSelected: false
                        }));
                    }
                    else {
                        earlierCreatedChild_3.updateWithValueParams({
                            address: item,
                            isSelected: false
                        });
                        View.create(earlierCreatedChild_3);
                    }
                }
                If.pop();
            }
            If.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Text.create("以下地址超出配送范围");
        Text.alignSelf(ItemAlign.Start);
        Text.margin({ left: 20, top: 5, bottom: 5 });
        Text.fontColor("#ff737373");
        Text.pop();
        List.create();
        List.height(100);
        ForEach.create("6", this, ObservedObject.GetRawObject(this.addressList), (item: Address) => {
            ListItem.create();
            If.create();
            if (this.outRangeIdArray.includes(item.id)) {
                If.branchId(0);
                Column.create();
                Column.width("100%");
                let earlierCreatedChild_5: addressEnable = (this && this.findChildById) ? this.findChildById("5") as addressEnable : undefined;
                if (earlierCreatedChild_5 == undefined) {
                    View.create(new addressEnable("5", this, {
                        address: item
                    }));
                }
                else {
                    earlierCreatedChild_5.updateWithValueParams({
                        address: item
                    });
                    if (!earlierCreatedChild_5.needsUpdate()) {
                        earlierCreatedChild_5.markStatic();
                    }
                    View.create(earlierCreatedChild_5);
                }
                Column.pop();
            }
            If.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Column.pop();
        Column.create();
        Column.position({ x: 0, y: 630 });
        Button.createWithLabel("新增地址");
        Button.type(ButtonType.Normal);
        Button.fontSize(24);
        Button.backgroundColor("#ff0000");
        Button.width("100%");
        Button.height(70);
        Button.onClick(() => {
            this.showTips("新增地址");
        });
        Button.pop();
        Column.pop();
        Column.pop();
    }
}
class address extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.address = undefined;
        this.__bgColor = new ObservedPropertySimple("#ffffffff", this, "bgColor");
        this.clickColor = "#ffbebebe";
        this.__isSelectedId = new SynchedPropertySimpleTwoWay(params.isSelectedId, this, "isSelectedId");
        this.__isSelected = new ObservedPropertySimple(false //是否被选中
        //展示提示弹窗
        , this, "isSelected");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: address_Params) {
        if (params.address !== undefined) {
            this.address = params.address;
        }
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
        if (params.clickColor !== undefined) {
            this.clickColor = params.clickColor;
        }
        if (params.isSelected !== undefined) {
            this.isSelected = params.isSelected;
        }
    }
    aboutToBeDeleted() {
        this.__bgColor.aboutToBeDeleted();
        this.__isSelectedId.aboutToBeDeleted();
        this.__isSelected.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private address: Address; //地址
    private __bgColor: ObservedPropertySimple<string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: string) {
        this.__bgColor.set(newValue);
    }
    private clickColor: string;
    private __isSelectedId: SynchedPropertySimpleTwoWay<number>; //被选中的id
    get isSelectedId() {
        return this.__isSelectedId.get();
    }
    set isSelectedId(newValue: number //被选中的id
    ) {
        this.__isSelectedId.set(newValue);
    }
    private __isSelected: ObservedPropertySimple<boolean>; //是否被选中
    get isSelected() {
        return this.__isSelected.get();
    }
    set isSelected(newValue: boolean) {
        this.__isSelected.set(newValue);
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
        Context.animation({ duration: 100 });
        Row.backgroundColor(this.bgColor);
        Context.animation(null);
        Row.create();
        Row.layoutWeight(9);
        Row.onClick(() => {
            this.bgColor = this.clickColor;
            this.isSelectedId = this.address.id;
            setTimeout(() => {
                this.bgColor = "#ffffffff";
            }, 100);
        });
        Row.margin({ bottom: 10, top: 10 });
        Column.create();
        Column.layoutWeight(1);
        If.create();
        if (this.isSelected) {
            If.branchId(0);
            Image.create({ "id": 0, "type": 30000, params: ["AddressList_selected.png"] });
            Image.width(20);
            Image.height(20);
        }
        else {
            If.branchId(1);
            Circle.create();
            Circle.width(16);
            Circle.height(16);
            Circle.fill("#ffffffff");
            Circle.strokeWidth(1);
            Circle.stroke("#ffbababa");
        }
        If.pop();
        Column.pop();
        Column.create();
        Column.layoutWeight(8);
        Row.create();
        Row.alignSelf(ItemAlign.Start);
        Row.margin({ bottom: 5 });
        Text.create("" + this.address.name + ", " + this.address.tel);
        Text.fontSize(18);
        Text.pop();
        Row.pop();
        Row.create();
        Row.alignSelf(ItemAlign.Start);
        Text.create("" + this.address.address);
        Text.fontColor("#ff6d6d6d");
        Text.pop();
        Row.pop();
        Column.pop();
        Row.pop();
        Column.create();
        Column.layoutWeight(1);
        Column.onClick(() => {
            this.showTips("编辑地址");
            this.bgColor = this.clickColor;
            setTimeout(() => {
                this.bgColor = "#ffffffff";
            }, 100);
        });
        Image.create({ "id": 0, "type": 30000, params: ["AddressList_edit.png"] });
        Image.width(30);
        Image.height(25);
        Column.pop();
        Row.pop();
    }
}
class addressEnable extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.bgColor = "#ffffffff";
        this.address = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: addressEnable_Params) {
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
        if (params.address !== undefined) {
            this.address = params.address;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private bgColor: string;
    private address: Address;
    render() {
        Row.create();
        Context.animation({ duration: 100 });
        Row.backgroundColor(this.bgColor);
        Context.animation(null);
        Row.create();
        Row.layoutWeight(9);
        Row.margin({ bottom: 10, top: 10 });
        Column.create();
        Column.layoutWeight(8);
        Column.margin({ left: 20 });
        Row.create();
        Row.alignSelf(ItemAlign.Start);
        Row.margin({ bottom: 5 });
        Text.create("" + this.address.name + ", " + this.address.tel);
        Text.fontSize(20);
        Text.fontColor("#ffaeaeae");
        Text.pop();
        Row.pop();
        Row.create();
        Row.alignSelf(ItemAlign.Start);
        Text.create("" + this.address.address);
        Text.fontColor("#ffaeaeae");
        Text.pop();
        Row.pop();
        Column.pop();
        Row.pop();
        Column.create();
        Column.layoutWeight(1);
        Image.create({ "id": 0, "type": 30000, params: ["AddressList_edit.png"] });
        Image.width(30);
        Image.height(25);
        Column.pop();
        Row.pop();
    }
}
