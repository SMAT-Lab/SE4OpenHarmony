interface PswDialog_Params {
    scanInfo?: wifi.WifiScanInfo;
    psw?: string;
    controller?: CustomDialogController;
    action?: (scanInfo, psw) => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PswDialog_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
import wifi from '@ohos.wifiManager';
export class PswDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__scanInfo = new SynchedPropertyObjectTwoWay(params.scanInfo, this, "scanInfo");
        this.psw = '';
        this.controller = undefined;
        this.action = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PswDialog_Params) {
        if (params.psw !== undefined) {
            this.psw = params.psw;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.action !== undefined) {
            this.action = params.action;
        }
    }
    aboutToBeDeleted() {
        this.__scanInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __scanInfo: SynchedPropertySimpleOneWay<wifi.WifiScanInfo>;
    get scanInfo() {
        return this.__scanInfo.get();
    }
    set scanInfo(newValue: wifi.WifiScanInfo) {
        this.__scanInfo.set(newValue);
    }
    private psw: string;
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private action: (scanInfo, psw) => void;
    render() {
        Column.create();
        Column.padding(15);
        Text.create(this.scanInfo.ssid);
        Text.fontSize(20);
        Text.width('95%');
        Text.pop();
        TextInput.create({ placeholder: 'input password' });
        TextInput.id('input');
        TextInput.type(InputType.Password);
        TextInput.placeholderColor(Color.Gray);
        TextInput.fontSize(19);
        TextInput.margin({ top: 15 });
        TextInput.width('95%');
        TextInput.height(36);
        TextInput.onChange((value: string) => {
            this.psw = value;
        });
        Row.create();
        Row.width('100%');
        Row.margin({ top: '3%' });
        Button.createWithChild();
        Button.id('sure');
        Button.layoutWeight(7);
        Button.backgroundColor(Color.White);
        Button.margin(5);
        Button.onClick(() => {
            this.controller.close();
            this.action(ObservedObject.GetRawObject(this.scanInfo), this.psw);
        });
        Text.create($r('app.string.sure'));
        Text.fontColor(Color.Blue);
        Text.fontSize(17);
        Text.pop();
        Button.pop();
        // 分割线
        Text.create();
        // 分割线
        Text.width(1);
        // 分割线
        Text.height(35);
        // 分割线
        Text.backgroundColor(Color.Black);
        // 分割线
        Text.pop();
        Button.createWithChild();
        Button.layoutWeight(7);
        Button.backgroundColor(Color.White);
        Button.margin(5);
        Button.onClick(() => {
            this.controller.close();
        });
        Text.create($r('app.string.cancel'));
        Text.fontColor(Color.Red);
        Text.fontSize(17);
        Text.pop();
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
