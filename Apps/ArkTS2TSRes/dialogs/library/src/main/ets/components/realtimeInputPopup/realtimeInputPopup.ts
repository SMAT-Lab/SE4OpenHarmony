interface RealtimeInputPopup_Params {
    customPopup?: boolean;
    model?: InputAttributeModel;
    inputVal?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "realtimeInputPopup_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { InputAttributeModel } from '../model/InputAttributeModel';
export class RealtimeInputPopup extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__customPopup = new ObservedPropertySimple(false, this, "customPopup");
        this.__model = new SynchedPropertyObjectTwoWay(params.model, this, "model");
        this.__inputVal = new SynchedPropertySimpleTwoWay(params.inputVal, this, "inputVal");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: RealtimeInputPopup_Params) {
        if (params.customPopup !== undefined) {
            this.customPopup = params.customPopup;
        }
    }
    aboutToBeDeleted() {
        this.__customPopup.aboutToBeDeleted();
        this.__model.aboutToBeDeleted();
        this.__inputVal.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __customPopup: ObservedPropertySimple<boolean>;
    get customPopup() {
        return this.__customPopup.get();
    }
    set customPopup(newValue: boolean) {
        this.__customPopup.set(newValue);
    }
    private __model: SynchedPropertySimpleOneWay<InputAttributeModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: InputAttributeModel) {
        this.__model.set(newValue);
    }
    private __inputVal: SynchedPropertySimpleTwoWay<string
    // popup构造器定义弹框内容
    >;
    get inputVal() {
        return this.__inputVal.get();
    }
    set inputVal(newValue: string) {
        this.__inputVal.set(newValue);
    }
    // popup构造器定义弹框内容
    popupBuilder(parent = null) {
        If.create();
        if (this.model.dataList.length != 0) {
            If.branchId(0);
            List.create();
            List.scrollBar(this.model.popupScrollBar);
            List.divider(this.model.hasDivider ? this.model.divider : null);
            List.constraintSize({ maxWidth: this.model.popupMaxWidth, maxHeight: this.model.popupMaxWidth });
            List.width(this.model.popupWidth);
            List.height('100%');
            List.border(this.model.popupBorder);
            ForEach.create("2", this, ObservedObject.GetRawObject(this.model.dataList), (data: string) => {
                ListItem.create();
                Button.createWithLabel(data);
                Button.fontSize(this.model.popupFontSize);
                Button.fontColor(this.model.popupFontColor);
                Button.type(ButtonType.Normal);
                Button.align(Alignment.Start);
                Button.width('100%');
                Button.padding(10);
                Button.backgroundColor(Color.Transparent);
                Button.onClick(() => {
                    this.customPopup = false;
                    setTimeout(() => {
                        this.inputVal = data;
                    }, 100);
                });
                Button.pop();
                ListItem.pop();
            });
            ForEach.pop();
            List.pop();
        }
        If.pop();
    }
    render() {
        Column.create();
        TextInput.create({ text: this.inputVal, placeholder: this.model.placeholder });
        TextInput.fontSize(this.model.inputFontSize);
        TextInput.fontColor(this.model.inputFontColor);
        TextInput.borderRadius(this.model.inputRadius);
        TextInput.width(this.model.inputWidth);
        TextInput.onChange((value) => {
            this.inputVal = value;
            if (!value) {
                this.model.dataList = [];
                this.customPopup = false;
                return;
            }
            this.customPopup = true;
        });
        TextInput.bindPopup(this.customPopup, {
            builder: { builder: this.popupBuilder.bind(this) },
            targetSpace: this.model.targetSpace,
            placement: this.model.placement,
            popupColor: this.model.popupColor,
            autoCancel: true,
            enableArrow: false,
            onStateChange: (e) => {
                if (!e.isVisible) {
                    this.customPopup = false;
                }
            }
        });
        Column.pop();
    }
}
