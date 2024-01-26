interface TopDialog_Params {
    isAnimation?: boolean;
    model?: BaseCenterMode;
    slotContent?: () => void;
    controller?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TopDialog_" + ++__generate__Id;
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
export class TopDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isAnimation = new SynchedPropertySimpleTwoWay(params.isAnimation, this, "isAnimation");
        this.__model = new ObservedPropertyObject(new BaseCenterMode(), this, "model");
        this.slotContent = undefined;
        this.controller = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TopDialog_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.slotContent !== undefined) {
            this.slotContent = params.slotContent;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__isAnimation.aboutToBeDeleted();
        this.__model.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isAnimation: SynchedPropertySimpleTwoWay<boolean>;
    get isAnimation() {
        return this.__isAnimation.get();
    }
    set isAnimation(newValue: boolean) {
        this.__isAnimation.set(newValue);
    }
    private __model: ObservedPropertyObject<BaseCenterMode>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: BaseCenterMode) {
        this.__model.set(newValue);
    }
    private __slotContent?;
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    aboutToAppear() {
        this.isAnimation = true;
    }
    aboutToDisappear() {
        this.isAnimation = false;
    }
    render() {
        Stack.create();
        Stack.height('100%');
        Stack.width('100%');
        Stack.onClick(() => {
            this.isAnimation = false;
            this.controller.close();
        });
        If.create();
        if (this.isAnimation) {
            If.branchId(0);
            Column.create();
            Column.position({ x: 0, y: 0 });
            Column.width(this.model.dialogWidth);
            Column.height(this.model.dialogHeight);
            Column.backgroundColor(this.model.dialogBgColor);
            Column.transition(this.model.popupAnimation);
            Column.onClick(() => {
                return;
            });
            If.create();
            if (this.slotContent != undefined) {
                If.branchId(0);
                this.slotContent(this);
            }
            If.pop();
            Column.pop();
        }
        If.pop();
        Stack.pop();
    }
}
