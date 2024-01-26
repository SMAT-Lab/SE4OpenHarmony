interface ConfirmDialog_Params {
    slotContent?: () => void;
    model?: BaseCenterMode;
    controller?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ConfirmDialog_" + ++__generate__Id;
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
import { BaseCenterMode } from '../model/BaseCenterModel';
export class ConfirmDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.slotContent = undefined;
        this.__model = new ObservedPropertyObject(new BaseCenterMode(), this, "model");
        this.controller = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ConfirmDialog_Params) {
        if (params.slotContent !== undefined) {
            this.slotContent = params.slotContent;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __slotContent?;
    private __model: ObservedPropertyObject<BaseCenterMode>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: BaseCenterMode) {
        this.__model.set(newValue);
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    // 若尝试在CustomDialog中传入多个其他的Controller，以实现在CustomDialog中打开另一个或另一些CustomDialog，那么此处需要将指向自己的controller放在最后
    render() {
        Column.create();
        Column.width(this.model.dialogWidth);
        Column.backgroundColor(this.model.dialogBgColor);
        Column.borderRadius(this.model.dialogBorderRadius);
        Text.create(this.model.title);
        Text.fontSize(this.model.titleFontSize);
        Text.margin(this.model.titleMargin);
        Text.textAlign(this.model.titleTextAlign);
        Text.pop();
        Column.create();
        If.create();
        if (this.slotContent != undefined) {
            If.branchId(0);
            this.slotContent(this);
        }
        If.pop();
        Column.pop();
        If.create();
        if (this.model.isDisplayBtn) {
            If.branchId(0);
            Column.create();
            Column.height(this.model.btnContentHeight);
            Column.width(this.model.btnContentWidth);
            Column.margin(this.model.btnContentMargin);
            Column.border(this.model.btnContentBorder);
            Button.createWithLabel(this.model.confirmBtnTitle, { type: this.model.btnType });
            Button.fontColor(this.model.confirmBtnFontColor);
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
            Column.pop();
        }
        If.pop();
        Column.pop();
    }
}
