interface AnimateInputContent_Params {
    inputValue?: string;
    title?: string;
    placeholder?: string;
    animateOption?: AnimateDialogOptions;
    // CheckDialogController: CustomDialogController = new CustomDialogController
    InputController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AnimateInputContent_" + ++__generate__Id;
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
import { AnimateInputDialog, AnimateEffect, AnimateDialogOptions } from '@ohos/dialogs';
class AnimateInputContent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__inputValue = new ObservedPropertySimple('', this, "inputValue");
        this.__title = new ObservedPropertySimple('标题', this, "title");
        this.__placeholder = new ObservedPropertySimple('请输入', this, "placeholder");
        this.__animateOption = new ObservedPropertyObject({ animate: AnimateEffect.ScaleCenterLeft }
        // CheckDialogController: CustomDialogController = new CustomDialogController
        , this, "animateOption");
        this.InputController = new CustomDialogController({
            builder: () => {
                let jsDialog = new AnimateInputDialog({
                    animateOptions: $animateOption,
                    cancel: () => { this.onCancel(); },
                    confirm: () => { this.confirm(); }
                });
                jsDialog.setController(this.
                // CheckDialogController: CustomDialogController = new CustomDialogController
                InputController);
                View.create(jsDialog);
            },
            customStyle: true,
            alignment: DialogAlignment.Center,
            openAnimation: { duration: 3000 },
            closeAnimation: { duration: 3000 }
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AnimateInputContent_Params) {
        if (params.inputValue !== undefined) {
            this.inputValue = params.inputValue;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.placeholder !== undefined) {
            this.placeholder = params.placeholder;
        }
        if (params.animateOption !== undefined) {
            this.animateOption = params.animateOption;
        }
        if (params.InputController !== undefined) {
            this.InputController = params.InputController;
        }
    }
    aboutToBeDeleted() {
        this.__inputValue.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
        this.__placeholder.aboutToBeDeleted();
        this.__animateOption.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __inputValue: ObservedPropertySimple<string>;
    get inputValue() {
        return this.__inputValue.get();
    }
    set inputValue(newValue: string) {
        this.__inputValue.set(newValue);
    }
    private __title: ObservedPropertySimple<string>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    private __placeholder: ObservedPropertySimple<string>;
    get placeholder() {
        return this.__placeholder.get();
    }
    set placeholder(newValue: string) {
        this.__placeholder.set(newValue);
    }
    private __animateOption: ObservedPropertyObject<AnimateDialogOptions>;
    get animateOption() {
        return this.__animateOption.get();
    }
    set animateOption(newValue: AnimateDialogOptions) {
        this.__animateOption.set(newValue);
    }
    // CheckDialogController: CustomDialogController = new CustomDialogController
    private InputController: CustomDialogController;
    onCancel() {
        console.info('Callback when the first button is clicked');
    }
    confirm() {
        console.info('Callback when the second button is clicked');
    }
    render() {
        Column.create();
        Button.createWithLabel('input弹窗');
        Button.onClick(() => {
            this.InputController.open();
        });
        Button.pop();
        Column.pop();
    }
}
loadDocument(new AnimateInputContent("1", undefined, {}));
