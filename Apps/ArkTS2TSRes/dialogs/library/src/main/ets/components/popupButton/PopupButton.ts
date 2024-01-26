interface PopupButton_Params {
    model?: ButtonAttributeModel;
    customPopup?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PopupButton_" + ++__generate__Id;
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
import { ButtonAttributeModel } from '../model/ButtonAttributeModel';
export class PopupButton extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new ButtonAttributeModel(), this, "model");
        this.__customPopup = new ObservedPropertySimple(false, this, "customPopup");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PopupButton_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.customPopup !== undefined) {
            this.customPopup = params.customPopup;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__customPopup.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<ButtonAttributeModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: ButtonAttributeModel) {
        this.__model.set(newValue);
    }
    private __customPopup: ObservedPropertySimple<boolean>;
    get customPopup() {
        return this.__customPopup.get();
    }
    set customPopup(newValue: boolean) {
        this.__customPopup.set(newValue);
    }
    popupBuilder(parent = null) {
        Row.create();
        Row.padding(20);
        If.create();
        if (this.model.firstText) {
            If.branchId(0);
            Text.create(this.model.firstText);
            Text.fontSize(this.model.firstFontSize);
            Text.fontColor(this.model.firstFontColor);
            Text.width(this.model.firstWidth);
            Text.height(this.model.firstHeight);
            Text.onClick(this.model.firstAction);
            Text.pop();
        }
        If.pop();
        If.create();
        if (this.model.hasDivider) {
            If.branchId(0);
            Divider.create();
            Divider.vertical(this.model.isVertical);
            Divider.height(this.model.dividerHeight);
            Divider.color(this.model.dividerColor);
            Divider.opacity(this.model.dividerOpacity);
            Divider.margin(this.model.dividerMargin);
        }
        If.pop();
        If.create();
        if (this.model.secondText) {
            If.branchId(0);
            Text.create(this.model.secondText);
            Text.fontSize(this.model.secondFontSize);
            Text.fontColor(this.model.secondFontColor);
            Text.width(this.model.secondWidth);
            Text.height(this.model.secondHeight);
            Text.onClick(this.model.secondAction);
            Text.pop();
        }
        If.pop();
        Row.pop();
    }
    render() {
        Button.createWithLabel(this.model.buttonText);
        Button.type(this.model.buttonType);
        Button.borderRadius(this.model.buttonBorderRadius);
        Button.backgroundColor(this.model.buttonBgColor);
        Button.fontSize(this.model.buttonFontSize);
        Button.fontColor(this.model.buttonFontColor);
        Button.width(this.model.buttonWidth);
        Button.height(this.model.buttonHeight);
        Button.onClick(() => {
            this.customPopup = true;
        });
        Button.bindPopup(this.customPopup, {
            builder: { builder: this.popupBuilder.bind(this) },
            targetSpace: this.model.targetSpace,
            placement: this.model.placement,
            popupColor: this.model.popupColor,
            autoCancel: this.model.autoCancel,
            enableArrow: this.model.enableArrow,
            onStateChange: (e) => {
                if (!e.isVisible) {
                    this.customPopup = false;
                }
            }
        });
        Button.pop();
    }
}
