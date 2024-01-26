interface Capabilities_Params {
    selectedLabel?: string;
    label?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Capabilities_" + ++__generate__Id;
}
/**
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
import { getString } from '@ohos/common';
import { BatteryInfo, RunningLockManager, PowerManager, SettingsManager, Thermal, UsbManager, StationaryManager } from '@ohos/capabilities';
export class Capabilities extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__selectedLabel = AppStorage.SetAndLink('selectedLabel', '', this, "selectedLabel");
        this.__label = new ObservedPropertySimple('', this, "label");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Capabilities_Params) {
        if (params.label !== undefined) {
            this.label = params.label;
        }
    }
    aboutToBeDeleted() {
        this.__selectedLabel.aboutToBeDeleted();
        this.__label.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __selectedLabel: ObservedPropertyAbstract<string>;
    get selectedLabel() {
        return this.__selectedLabel.get();
    }
    set selectedLabel(newValue: string) {
        this.__selectedLabel.set(newValue);
    }
    private __label: ObservedPropertySimple<string>;
    get label() {
        return this.__label.get();
    }
    set label(newValue: string) {
        this.__label.set(newValue);
    }
    aboutToAppear() {
        // StorageLink会触发多次刷新，用State接收
        this.label = this.selectedLabel;
    }
    render() {
        Column.create();
        Column.padding({ left: 12, right: 12 });
        If.create();
        // 此处根据选中的菜单，显示对应的页面内容
        if (this.label === getString($r('app.string.battery_info'))) {
            If.branchId(0);
        }
        else if (this.label === getString($r('app.string.running_lock'))) {
            If.branchId(1);
        }
        else if (this.label === getString($r('app.string.power_manager'))) {
            If.branchId(2);
        }
        else if (this.label === getString($r('app.string.settings'))) {
            If.branchId(3);
        }
        else if (this.label === getString($r('app.string.stationary'))) {
            If.branchId(4);
        }
        else if (this.label === getString($r('app.string.thermal'))) {
            If.branchId(5);
        }
        else if (this.label === getString($r('app.string.usb_manager'))) {
            If.branchId(6);
        }
        If.pop();
        Column.pop();
    }
}
