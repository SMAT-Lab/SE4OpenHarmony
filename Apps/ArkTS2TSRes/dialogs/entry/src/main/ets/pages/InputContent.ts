interface InputDialogExample_Params {
    inputValue?: string;
    title?: string;
    placeholder?: string;
    model?: inputModel;
    select?: SelectParam;
    InputController?: CustomDialogController | undefined;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "InputContent_" + ++__generate__Id;
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
import { InputDialog, inputModel } from '@ohos/dialogs';
import { BtnBorder, BtnContentBorder, InputBorder } from '@ohos/dialogs';
import { SelectParam } from '../components/SelectParam';
import { SelectInput } from '../components/SelectInput';
class InputDialogExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__inputValue = new ObservedPropertySimple('', this, "inputValue");
        this.__title = new ObservedPropertySimple('标题', this, "title");
        this.__placeholder = new ObservedPropertySimple('请输入', this, "placeholder");
        this.__model = new ObservedPropertyObject(new inputModel(), this, "model");
        this.__select = new ObservedPropertyObject(new SelectParam(), this, "select");
        this.InputController = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: InputDialogExample_Params) {
        if (params.inputValue !== undefined) {
            this.inputValue = params.inputValue;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.placeholder !== undefined) {
            this.placeholder = params.placeholder;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.select !== undefined) {
            this.select = params.select;
        }
        if (params.InputController !== undefined) {
            this.InputController = params.InputController;
        }
    }
    aboutToBeDeleted() {
        this.__inputValue.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
        this.__placeholder.aboutToBeDeleted();
        this.__model.aboutToBeDeleted();
        this.__select.aboutToBeDeleted();
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
    private __model: ObservedPropertyObject<inputModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: inputModel) {
        this.__model.set(newValue);
    }
    private __select: ObservedPropertyObject<SelectParam>;
    get select() {
        return this.__select.get();
    }
    set select(newValue: SelectParam) {
        this.__select.set(newValue);
    }
    aboutToAppear() {
        this.model.titleFontColor = '#ffffff';
        this.model.titleHeight = 60;
        this.model.contentFontColor = '#ffffff';
        this.model.cancelBtnFontColor = '#ffffff';
        this.model.cancelBtnBgColor = '#232323';
        this.model.cancelBtnTitle = 'cancel';
        let btnBorder: BtnBorder = {
            width: { right: 1 },
            color: { right: '#ffffff' },
            style: { top: BorderStyle.Solid }
        };
        this.model.btnBorder = btnBorder;
        this.model.confirmBtnFontColor = '#ffffff';
        this.model.confirmBtnBgColor = '#232323';
        this.model.confirmBtnTitle = 'OK';
        this.model.isDisplayBtn = true;
        this.model.btnWidth = '50%';
        this.model.btnHeight = 60;
        this.model.btnContentMargin = { top: 30 };
        this.model.placeholderColor = '#ffffff';
        this.model.dialogBgColor = '#232323';
        this.model.dialogPadding = { top: 10 };
        this.model.inputBgColor = '#232323';
        this.model.inputPadding = 0;
        this.model.inputMargin = { left: 20, right: 20 };
        this.model.inputMargin = { left: 20, right: 20 };
        this.model.inputBorderRadius = 0;
        let btnContentBorder: BtnContentBorder = {
            width: { top: 1 },
            color: { top: '#ffffff' },
            style: { top: BorderStyle.Solid }
        };
        this.model.btnContentBorder = btnContentBorder;
        let inputBorder: InputBorder = {
            width: { bottom: 1 },
            color: { bottom: '#008577' },
            style: { top: BorderStyle.Solid }
        };
        this.model.inputBorder = inputBorder;
        this.model.titleFontColor = '#ffffff';
        this.model.isDisplayInput = true;
        this.model.cancel = this.onCancel;
        this.model.confirm = this.confirm;
        this.model.customCallback = {
            beforeAppear: () => {
                console.log('inputContent', 'beforeAppear回调');
            },
            beforeDisappear: () => {
                console.log('inputContent', 'beforeDisappear回调');
            }
        };
        this.model.dialogWidth = '80%';
    }
    private InputController: CustomDialogController | undefined;
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
            this.InputController = new CustomDialogController({
                builder: () => {
                    let jsDialog = new InputDialog({
                        model: this.model,
                        inputValue: this.inputValue
                    });
                    jsDialog.setController(this.InputController);
                    View.create(jsDialog);
                },
                customStyle: true,
                autoCancel: this.select.autoCancel,
                alignment: DialogAlignment.Center,
                maskColor: this.select.maskColor,
                offset: { dx: this.select.dx, dy: this.select.dy }
            }, this);
            this.model.isDisplayInput = this.select.isDisplayInput;
            this.model.dialogBorderRadius = this.select.borderRadius;
            this.model.confirmBtnBorderRadius = { bottomRight: this.select.borderRadius };
            this.model.cancelBtnBorderRadius = { bottomLeft: this.select.borderRadius };
            this.model.isSupportGesture = this.select.isSupportGesture;
            this.model.autoCancel = this.select.autoCancel;
            if (this.InputController != undefined) {
                this.InputController.open();
            }
        });
        Button.pop();
        let earlierCreatedChild_2: SelectInput = (this && this.findChildById) ? this.findChildById("2") as SelectInput : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new SelectInput("2", this, {
                select: this.select
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                select: this.select
            });
            View.create(earlierCreatedChild_2);
        }
        Column.pop();
    }
}
loadDocument(new InputDialogExample("1", undefined, {}));
