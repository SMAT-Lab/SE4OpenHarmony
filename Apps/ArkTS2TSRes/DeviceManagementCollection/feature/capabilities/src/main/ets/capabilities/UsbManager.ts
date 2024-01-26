interface UsbManager_Params {
    isListener?: boolean;
    isRefreshing?: boolean;
    devices?: Array<DeviceAttribute>;
    device?: DeviceAttribute;
    dialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "UsbManager_" + ++__generate__Id;
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
import { DeviceAttribute } from '../model/DeviceAttribute';
import { DeviceCustomDialog } from '../components/usbmanager/DeviceCustomDialog';
import { DeviceList } from '../components/usbmanager/DeviceList';
import { createUsbSubscribe, cancelUsbSubscribe, getDeviceList } from '../util/UsbManagerUtil';
export class UsbManager extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isListener = new ObservedPropertySimple(false, this, "isListener");
        this.__isRefreshing = new ObservedPropertySimple(false, this, "isRefreshing");
        this.__devices = new ObservedPropertyObject([], this, "devices");
        this.addProvidedVar("devicesList", this.__devices, false);
        this.addProvidedVar("devices", this.__devices, false);
        this.__device = new ObservedPropertyObject(new DeviceAttribute(), this, "device");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new DeviceCustomDialog("3", this, { device: this.device });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            autoCancel: true,
            cancel: () => { }
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: UsbManager_Params) {
        if (params.isListener !== undefined) {
            this.isListener = params.isListener;
        }
        if (params.isRefreshing !== undefined) {
            this.isRefreshing = params.isRefreshing;
        }
        if (params.devices !== undefined) {
            this.devices = params.devices;
        }
        if (params.device !== undefined) {
            this.device = params.device;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__isListener.aboutToBeDeleted();
        this.__isRefreshing.aboutToBeDeleted();
        this.__devices.aboutToBeDeleted();
        this.__device.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isListener: ObservedPropertySimple<boolean>;
    get isListener() {
        return this.__isListener.get();
    }
    set isListener(newValue: boolean) {
        this.__isListener.set(newValue);
    }
    private __isRefreshing: ObservedPropertySimple<boolean>;
    get isRefreshing() {
        return this.__isRefreshing.get();
    }
    set isRefreshing(newValue: boolean) {
        this.__isRefreshing.set(newValue);
    }
    private __devices: ObservedPropertyObject<Array<DeviceAttribute>>;
    get devices() {
        return this.__devices.get();
    }
    set devices(newValue: Array<DeviceAttribute>) {
        this.__devices.set(newValue);
    }
    private __device: ObservedPropertyObject<DeviceAttribute>;
    get device() {
        return this.__device.get();
    }
    set device(newValue: DeviceAttribute) {
        this.__device.set(newValue);
    }
    private dialogController: CustomDialogController;
    render() {
        Column.create({ space: 12 });
        Column.width('100%');
        Column.height('100%');
        Column.padding(16);
        Row.create();
        Row.backgroundColor($r("app.color.white"));
        Row.borderRadius(20);
        Row.padding({ left: 16, right: 16 });
        Row.width('100%');
        Row.height(60);
        Text.create($r('app.string.usb_listener'));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Medium);
        Text.pop();
        Blank.create();
        Blank.pop();
        Toggle.create({ type: ToggleType.Switch, isOn: this.isListener });
        Toggle.onChange((isOn: boolean) => {
            this.isListener = !this.isListener;
            this.listenerSwitch(this.isListener);
        });
        Toggle.pop();
        Row.pop();
        let earlierCreatedChild_2: DeviceList = (this && this.findChildById) ? this.findChildById("2") as DeviceList : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new DeviceList("2", this, {
                isRefreshing: this.__isRefreshing,
                device: this.__device,
                getDeviceList: () => {
                    this.devices = getDeviceList();
                },
                openDialog: () => {
                    this.dialogController.open();
                }
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                getDeviceList: () => {
                    this.devices = getDeviceList();
                },
                openDialog: () => {
                    this.dialogController.open();
                }
            });
            View.create(earlierCreatedChild_2);
        }
        Column.pop();
    }
    SingleAttribute(title: Resource, info: string, parent = null) {
        Row.create();
        Row.margin({ top: 10 });
        Row.alignSelf(ItemAlign.Start);
        Text.create(title);
        Text.fontSize(20);
        Text.width('100');
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create(info);
        Text.fontSize(20);
        Text.layoutWeight(1);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Row.pop();
    }
    listenerSwitch(isListener: boolean) {
        if (isListener) {
            this.devices = getDeviceList();
            createUsbSubscribe(() => {
                this.devices = getDeviceList();
            });
        }
        else {
            cancelUsbSubscribe();
        }
    }
}
