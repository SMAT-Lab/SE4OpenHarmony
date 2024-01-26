interface InputDialog_Params {
    controller?: CustomDialogController;
    model?: inputModel;
    inputValue?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "InputDialog_" + ++__generate__Id;
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
import { inputModel } from '../model/inputModel';
export class InputDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = undefined;
        this.__model = new ObservedPropertyObject(new inputModel(), this, "model");
        this.__inputValue = new SynchedPropertySimpleTwoWay(params.inputValue, this, "inputValue");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: InputDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__inputValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private __model: ObservedPropertyObject<inputModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: inputModel) {
        this.__model.set(newValue);
    }
    private __inputValue: SynchedPropertySimpleTwoWay<string>;
    get inputValue() {
        return this.__inputValue.get();
    }
    set inputValue(newValue: string) {
        this.__inputValue.set(newValue);
    }
    render() {
        Column.create();
        Column.width(this.model.dialogWidth);
        Column.padding(this.model.dialogPadding);
        Column.backgroundColor(this.model.dialogBgColor);
        Column.borderRadius(this.model.dialogBorderRadius);
        Column.transition(this.model.popupAnimation);
        Text.create(this.model.title);
        Text.fontSize(this.model.titleFontSize);
        Text.height(this.model.titleHeight);
        Text.fontColor(this.model.titleFontColor);
        Text.textAlign(this.model.titleTextAlign);
        Text.pop();
        Text.create(this.model.contentValue);
        Text.fontSize(this.model.contentFontSize);
        Text.fontColor(this.model.contentFontColor);
        Text.textAlign(this.model.contentTextAlign);
        Text.pop();
        TextInput.create({ placeholder: this.model.placeholder, text: this.inputValue });
        TextInput.borderRadius(this.model.inputBorderRadius);
        TextInput.margin(this.model.inputMargin);
        TextInput.fontColor(this.model.inputFontColor);
        TextInput.backgroundColor(this.model.inputBgColor);
        TextInput.border(this.model.inputBorder);
        TextInput.padding(this.model.inputPadding);
        TextInput.borderRadius(this.model.inputBorderRadius);
        TextInput.placeholderColor(this.model.placeholderColor);
        If.create();
        if (this.model.isDisplayBtn) {
            If.branchId(0);
            Column.create();
            Column.width(this.model.btnContentWidth);
            Column.margin(this.model.btnContentMargin);
            Column.border(this.model.btnContentBorder);
            Flex.create({ direction: FlexDirection.Row });
            Button.createWithLabel(this.model.cancelBtnTitle, { type: this.model.btnType });
            Button.fontColor(this.model.cancelBtnFontColor);
            Button.fontSize(this.model.btnFontSize);
            Button.backgroundColor(this.model.cancelBtnBgColor);
            Button.width(this.model.btnWidth);
            Button.height(this.model.btnHeight);
            Button.border(this.model.btnBorder);
            Button.onClick(() => {
                this.controller.close();
                if (this.model.cancel != undefined) {
                    this.model.cancel();
                }
            });
            Button.borderRadius(this.model.cancelBtnBorderRadius);
            Button.pop();
            Button.createWithLabel(this.model.confirmBtnTitle, { type: this.model.btnType });
            Button.fontColor(this.model.contentFontColor);
            Button.fontSize(this.model.btnFontSize);
            Button.backgroundColor(this.model.confirmBtnBgColor);
            Button.width(this.model.btnWidth);
            Button.height(this.model.btnHeight);
            Button.onClick(() => {
                this.controller.close();
                if (this.model.confirm != undefined) {
                    this.model.confirm();
                }
            });
            Button.borderRadius(this.model.confirmBtnBorderRadius);
            Button.pop();
            Flex.pop();
            Column.pop();
        }
        If.pop();
        Column.pop();
    }
}
