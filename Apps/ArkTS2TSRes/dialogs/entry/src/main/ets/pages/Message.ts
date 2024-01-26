interface Message_Params {
    model?: BaseCenterMode;
    textValue?: string;
    inputValue?: string;
    isFixPosition?: boolean;
    positionDialog?: string;
    blurValue?: number;
    dialogController?: CustomDialogController | undefined;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Message_" + ++__generate__Id;
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
import { MessageDialog, BaseCenterMode } from '@ohos/dialogs';
class Message extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new BaseCenterMode(), this, "model");
        this.__textValue = new ObservedPropertySimple('这里是消息内容', this, "textValue");
        this.__inputValue = new ObservedPropertySimple('消息弹窗', this, "inputValue");
        this.__isFixPosition = new ObservedPropertySimple(true, this, "isFixPosition");
        this.__positionDialog = new ObservedPropertySimple('top', this, "positionDialog");
        this.__blurValue = new ObservedPropertySimple(0, this, "blurValue");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new MessageDialog({
                    model: this.model,
                    isFixPosition: this.isFixPosition,
                    positionDialog: this.positionDialog,
                    blurValue: this.blurValue
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            autoCancel: true,
            alignment: DialogAlignment.Center,
            offset: { dx: 0, dy: 0 },
            gridCount: 4,
            customStyle: true,
            maskColor: Color.Transparent
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Message_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.textValue !== undefined) {
            this.textValue = params.textValue;
        }
        if (params.inputValue !== undefined) {
            this.inputValue = params.inputValue;
        }
        if (params.isFixPosition !== undefined) {
            this.isFixPosition = params.isFixPosition;
        }
        if (params.positionDialog !== undefined) {
            this.positionDialog = params.positionDialog;
        }
        if (params.blurValue !== undefined) {
            this.blurValue = params.blurValue;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__textValue.aboutToBeDeleted();
        this.__inputValue.aboutToBeDeleted();
        this.__isFixPosition.aboutToBeDeleted();
        this.__positionDialog.aboutToBeDeleted();
        this.__blurValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<BaseCenterMode>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: BaseCenterMode) {
        this.__model.set(newValue);
    }
    private __textValue: ObservedPropertySimple<string>;
    get textValue() {
        return this.__textValue.get();
    }
    set textValue(newValue: string) {
        this.__textValue.set(newValue);
    }
    private __inputValue: ObservedPropertySimple<string>;
    get inputValue() {
        return this.__inputValue.get();
    }
    set inputValue(newValue: string) {
        this.__inputValue.set(newValue);
    }
    private __isFixPosition: ObservedPropertySimple<boolean>;
    get isFixPosition() {
        return this.__isFixPosition.get();
    }
    set isFixPosition(newValue: boolean) {
        this.__isFixPosition.set(newValue);
    }
    private __positionDialog: ObservedPropertySimple<string>;
    get positionDialog() {
        return this.__positionDialog.get();
    }
    set positionDialog(newValue: string) {
        this.__positionDialog.set(newValue);
    }
    private __blurValue: ObservedPropertySimple<number>;
    get blurValue() {
        return this.__blurValue.get();
    }
    set blurValue(newValue: number) {
        this.__blurValue.set(newValue);
    }
    aboutToAppear() {
        this.model.contentValue = '这里是消息内容';
        this.model.contentPadding = 10;
        this.model.dialogWidth = 300;
        this.model.dialogBgColor = Color.Pink;
    }
    private dialogController: CustomDialogController | undefined;
    // 在自定义组件即将析构销毁时将dialogControlle删除和置空
    aboutToDisappear() {
        this.dialogController = undefined; // 将dialogController置空
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.margin({ top: 25 });
        Column.backgroundColor(Color.White);
        Column.blur(this.blurValue);
        Column.create();
        Column.height(200);
        Column.width(200);
        Column.backgroundColor(Color.Yellow);
        Column.pop();
        Text.create('模糊效果');
        Text.pop();
        Button.createWithLabel(this.inputValue);
        Button.onClick(() => {
            if (this.dialogController != undefined) {
                this.dialogController.open();
                this.blurValue = 50;
            }
        });
        Button.pop();
        Column.pop();
    }
}
loadDocument(new Message("1", undefined, {}));
