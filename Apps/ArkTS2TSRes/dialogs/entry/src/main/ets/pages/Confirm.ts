interface ConfirmExample_Params {
    textValue?: string;
    contentValue?: string;
    inputValue?: string;
    positionDialog?: string;
    animitionMove?: string;
    model?: BaseCenterMode;
    dialogController?: CustomDialogController | undefined;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Confirm_" + ++__generate__Id;
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
import { ConfirmDialog } from '@ohos/dialogs';
import { BaseCenterMode } from '@ohos/dialogs';
import { BtnContentBorder } from '@ohos/dialogs';
import { TestType } from '@ohos/hypium';
class ConfirmExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__textValue = new ObservedPropertySimple('我是标题', this, "textValue");
        this.__contentValue = new ObservedPropertySimple('床前明月光，疑是地上霜，举头望明月，低头思故乡。床前明月光，疑是地上霜，举头望明月，低头思故乡。', this, "contentValue");
        this.__inputValue = new ObservedPropertySimple('click me', this, "inputValue");
        this.__positionDialog = new ObservedPropertySimple('center', this, "positionDialog");
        this.__animitionMove = new ObservedPropertySimple('center', this, "animitionMove");
        this.__model = new ObservedPropertyObject(new BaseCenterMode(), this, "model");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new ConfirmDialog({
                    slotContent: () => {
                        this.componentBuilder();
                    },
                    model: this.model
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            cancel: this.existApp,
            autoCancel: true,
            alignment: DialogAlignment.Center,
            offset: { dx: 0, dy: 0 },
            gridCount: 4,
            customStyle: true
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ConfirmExample_Params) {
        if (params.textValue !== undefined) {
            this.textValue = params.textValue;
        }
        if (params.contentValue !== undefined) {
            this.contentValue = params.contentValue;
        }
        if (params.inputValue !== undefined) {
            this.inputValue = params.inputValue;
        }
        if (params.positionDialog !== undefined) {
            this.positionDialog = params.positionDialog;
        }
        if (params.animitionMove !== undefined) {
            this.animitionMove = params.animitionMove;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__textValue.aboutToBeDeleted();
        this.__contentValue.aboutToBeDeleted();
        this.__inputValue.aboutToBeDeleted();
        this.__positionDialog.aboutToBeDeleted();
        this.__animitionMove.aboutToBeDeleted();
        this.__model.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __textValue: ObservedPropertySimple<string>;
    get textValue() {
        return this.__textValue.get();
    }
    set textValue(newValue: string) {
        this.__textValue.set(newValue);
    }
    private __contentValue: ObservedPropertySimple<string>;
    get contentValue() {
        return this.__contentValue.get();
    }
    set contentValue(newValue: string) {
        this.__contentValue.set(newValue);
    }
    private __inputValue: ObservedPropertySimple<string>;
    get inputValue() {
        return this.__inputValue.get();
    }
    set inputValue(newValue: string) {
        this.__inputValue.set(newValue);
    }
    private __positionDialog: ObservedPropertySimple<string>;
    get positionDialog() {
        return this.__positionDialog.get();
    }
    set positionDialog(newValue: string) {
        this.__positionDialog.set(newValue);
    }
    private __animitionMove: ObservedPropertySimple<string>;
    get animitionMove() {
        return this.__animitionMove.get();
    }
    set animitionMove(newValue: string) {
        this.__animitionMove.set(newValue);
    }
    private __model: ObservedPropertyObject<BaseCenterMode>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: BaseCenterMode) {
        this.__model.set(newValue);
    }
    aboutToAppear() {
        this.model.title = '我是标题';
        this.model.contentValue = '床前明月光，疑是地上霜，举头望明月，低头思故乡。床前明月光，疑是地上霜，举头望明月，低头思故乡。';
        // this.model.contentMargin = 20
        this.model.titleMargin = { top: 30, bottom: 10 };
        this.model.btnWidth = '100%';
        this.model.btnHeight = '100%';
        this.model.confirmBtnFontColor = '#87C5BF';
        this.model.confirmBtnBgColor = '#fff';
        this.model.confirm = this.onAccept;
        this.model.btnContentHeight = 60;
        this.model.btnContentMargin = { top: 20 };
        let btnContentBorder: BtnContentBorder = {
            width: { top: 1 },
            color: { top: '#F0F0F0' },
            style: { top: BorderStyle.Solid },
        };
        this.model.btnContentBorder = btnContentBorder;
    }
    private dialogController: CustomDialogController | undefined;
    // 在自定义组件即将析构销毁时将dialogControlle删除和置空
    aboutToDisappear() {
        this.dialogController = undefined; // 将dialogController置空
    }
    onAccept() {
        console.info('Callback when the second button is clicked');
    }
    existApp() {
        console.info('Click the callback in the blank area');
    }
    componentBuilder(parent = null) {
        Text.create('床前明月光，疑是地上霜，举头望明月，低头思故乡。床前明月光，疑是地上霜，举头望明月，低头思故乡。');
        Text.fontSize(this.model.contentFontSize);
        Text.margin(20);
        Text.textAlign(this.model.contentTextAlign);
        Text.pop();
    }
    render() {
        Column.create();
        Button.createWithLabel('显示confirm弹窗');
        Button.onClick(() => {
            if (this.dialogController != undefined) {
                this.dialogController.open();
            }
        });
        Button.pop();
        Column.pop();
    }
}
loadDocument(new ConfirmExample("1", undefined, {}));
