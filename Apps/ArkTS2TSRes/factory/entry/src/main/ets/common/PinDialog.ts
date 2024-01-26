interface PinDialog_Params {
    controller?: CustomDialogController;
    data?: bluetooth.PinRequiredParam | null;
    titleText?: string;
    pinCode?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PinDialog_" + ++__generate__Id;
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
import bluetooth from '@ohos.bluetooth';
import logger from '../Model/Logger';
const TAG: string = 'PinDialog';
export class PinDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = undefined;
        this.data = null;
        this.__titleText = new ObservedPropertySimple('', this, "titleText");
        this.__pinCode = new ObservedPropertySimple('', this, "pinCode");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PinDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.titleText !== undefined) {
            this.titleText = params.titleText;
        }
        if (params.pinCode !== undefined) {
            this.pinCode = params.pinCode;
        }
    }
    aboutToBeDeleted() {
        this.__titleText.aboutToBeDeleted();
        this.__pinCode.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private data: bluetooth.PinRequiredParam | null;
    private __titleText: ObservedPropertySimple<string>;
    get titleText() {
        return this.__titleText.get();
    }
    set titleText(newValue: string) {
        this.__titleText.set(newValue);
    }
    private __pinCode: ObservedPropertySimple<string>;
    get pinCode() {
        return this.__pinCode.get();
    }
    set pinCode(newValue: string) {
        this.__pinCode.set(newValue);
    }
    choiceText(message: Resource, handlerClick, parent = null) {
        Text.create(message);
        Text.width('50%');
        Text.fontSize(30);
        Text.textAlign(TextAlign.Center);
        Text.fontColor('#ff0742ef');
        Text.onClick(handlerClick);
        Text.pop();
    }
    aboutToAppear() {
        this.titleText = `"${this.data.deviceId}"要与您配对。请确认此配对码已在"${this.data.deviceId}"上直接显示，且不是手动输入的。`;
        this.pinCode = JSON.stringify(this.data.pinCode);
    }
    render() {
        Column.create({ space: 10 });
        Column.width('100%');
        Column.padding(15);
        Text.create($r('app.string.match_request'));
        Text.fontSize(30);
        Text.alignSelf(ItemAlign.Start);
        Text.pop();
        Text.create(this.titleText);
        Text.alignSelf(ItemAlign.Start);
        Text.margin({ top: 20 });
        Text.fontSize(21);
        Text.pop();
        Text.create(this.pinCode);
        Text.fontSize(40);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: 20 });
        Text.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center });
        Flex.alignSelf(ItemAlign.Start);
        Flex.width('95%');
        Flex.margin({ top: 5 });
        Checkbox.create({ name: 'checkbox' });
        Checkbox.select(false);
        Checkbox.selectedColor('#ff3d6fb8');
        Checkbox.key('checkBox');
        Checkbox.pop();
        Text.create($r('app.string.grant_permission'));
        Text.fontSize(15);
        Text.margin({ left: 3, top: 6 });
        Text.pop();
        Flex.pop();
        Row.create();
        Row.margin({ top: 20 });
        this.choiceText($r('app.string.cancel'), () => {
            bluetooth.setDevicePairingConfirmation(this.data.deviceId, false);
            logger.info(TAG, `setDevicePairingConfirmation = ${bluetooth.setDevicePairingConfirmation(this.data.deviceId, false)}`);
            this.controller.close();
        }, this);
        Divider.create();
        Divider.vertical(true);
        Divider.height(32);
        this.choiceText($r('app.string.match'), () => {
            bluetooth.setDevicePairingConfirmation(this.data.deviceId, true);
            logger.info(TAG, `setDevicePairingConfirmation = ${bluetooth.setDevicePairingConfirmation(this.data.deviceId, true)}`);
            this.controller.close();
        }, this);
        Row.pop();
        Column.pop();
    }
}
