interface EditDialog_Params {
    notebookName?: string;
    newValue?: string;
    controller?: CustomDialogController;
    confirm?: (notebookName: string) => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "EditDialog_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import CommonConstants from '../common/constants/CommonConstants';
export default class EditDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__notebookName = new SynchedPropertySimpleTwoWay(params.notebookName, this, "notebookName");
        this.__newValue = new ObservedPropertySimple('', this, "newValue");
        this.controller = undefined;
        this.confirm = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: EditDialog_Params) {
        if (params.newValue !== undefined) {
            this.newValue = params.newValue;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
    }
    aboutToBeDeleted() {
        this.__notebookName.aboutToBeDeleted();
        this.__newValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __notebookName: SynchedPropertySimpleTwoWay<string>;
    get notebookName() {
        return this.__notebookName.get();
    }
    set notebookName(newValue: string) {
        this.__notebookName.set(newValue);
    }
    private __newValue: ObservedPropertySimple<string>;
    get newValue() {
        return this.__newValue.get();
    }
    set newValue(newValue: string) {
        this.__newValue.set(newValue);
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private confirm: (notebookName: string) => void;
    render() {
        Column.create();
        Text.create($r('app.string.dialog_change_name'));
        Text.fontSize(CommonConstants.FONT_SIZE_29);
        Text.margin({ top: 30, bottom: 20 });
        Text.pop();
        TextInput.create({
            placeholder: $r('app.string.notebook_name_input'), text: this.notebookName
        });
        TextInput.maxLength(30);
        TextInput.placeholderColor($r('app.color.black_30'));
        TextInput.fontSize(CommonConstants.FONT_SIZE_19);
        TextInput.padding({
            left: 10
        });
        TextInput.backgroundColor($r('app.color.black_3'));
        TextInput.height(48);
        TextInput.borderRadius(0);
        TextInput.width('90%');
        TextInput.onChange((value: string) => {
            this.newValue = value;
        });
        Flex.create({ justifyContent: FlexAlign.SpaceAround });
        Text.create($r('app.string.dialog_cancel'));
        Text.fontSize(CommonConstants.FONT_SIZE_19);
        Text.onClick(() => {
            this.newValue = this.notebookName;
            this.controller.close();
        });
        Text.backgroundColor(0xffffff);
        Text.fontColor(Color.Black);
        Text.fontSize(CommonConstants.FONT_SIZE_22);
        Text.padding({ bottom: 20, top: 15 });
        Text.layoutWeight(1);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Text.create($r('app.string.dialog_confirm'));
        Text.onClick(() => {
            if (this.notebookName.length > 0) {
                this.notebookName = this.newValue;
                this.confirm(this.notebookName);
            }
            this.controller.close();
        });
        Text.backgroundColor(0xffffff);
        Text.fontColor($r('app.color.theme'));
        Text.fontSize(CommonConstants.FONT_SIZE_22);
        Text.padding({ bottom: 20, top: 15 });
        Text.layoutWeight(1);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Flex.pop();
        Column.pop();
    }
}
