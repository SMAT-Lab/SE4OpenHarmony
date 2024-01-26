interface DeviceCustomDialog_Params {
    device?: DeviceAttribute;
    controller?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DeviceCustomDialog_" + ++__generate__Id;
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
import { Component } from '@ohos.UiTest';
import { DeviceAttribute } from '../../model/DeviceAttribute';
export class DeviceCustomDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.device = new DeviceAttribute();
        this.controller = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DeviceCustomDialog_Params) {
        if (params.device !== undefined) {
            this.device = params.device;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private device: DeviceAttribute;
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    render() {
        Column.create();
        Column.create();
        Column.margin({
            left: 32,
            right: 32,
            bottom: 72
        });
        Column.layoutWeight(1);
        Text.create(`${this.device.manufacturerName} ${this.device.productName}`);
        Text.width('100%');
        Text.fontSize(26);
        Text.margin({ top: 22, bottom: 22 });
        Text.fontWeight(FontWeight.Medium);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        List.create();
        List.scrollBar(BarState.Off);
        List.divider({
            strokeWidth: px2vp(1),
            color: $r("app.color.divider")
        });
        List.width('100%');
        List.backgroundColor($r("app.color.white"));
        List.borderRadius(20);
        ListItem.create();
        this.SingleAttribute($r('app.string.bus_address'), this.device.busAddress.toString(), this);
        ListItem.pop();
        ListItem.create();
        this.SingleAttribute($r('app.string.device_address'), this.device.deviceAddress.toString(), this);
        ListItem.pop();
        ListItem.create();
        this.SingleAttribute($r('app.string.serial'), this.device.serial, this);
        ListItem.pop();
        ListItem.create();
        this.SingleAttribute($r('app.string.device_name'), this.device.name, this);
        ListItem.pop();
        ListItem.create();
        this.SingleAttribute($r('app.string.manufacturer_name'), this.device.manufacturerName, this);
        ListItem.pop();
        ListItem.create();
        this.SingleAttribute($r('app.string.product_name'), this.device.productName, this);
        ListItem.pop();
        ListItem.create();
        this.SingleAttribute($r('app.string.version'), this.device.version, this);
        ListItem.pop();
        ListItem.create();
        this.SingleAttribute($r('app.string.vendor_id'), this.device.vendorId.toString(), this);
        ListItem.pop();
        ListItem.create();
        this.SingleAttribute($r('app.string.product_id'), this.device.productId.toString(), this);
        ListItem.pop();
        ListItem.create();
        this.SingleAttribute($r('app.string.device_class'), this.device.clazz.toString(), this);
        ListItem.pop();
        List.pop();
        Column.pop();
        Text.create($r('app.string.confirm'));
        Text.fontSize(20);
        Text.height(62);
        Text.margin({ top: 8, bottom: 8 });
        Text.fontColor($r("sys.color.ohos_id_color_activated"));
        Text.onClick(() => {
            this.controller?.close();
        });
        Text.pop();
        Column.pop();
    }
    SingleAttribute(title: Resource, info: string, parent = null) {
        Row.create();
        Row.height(48);
        Row.alignSelf(ItemAlign.Start);
        Text.create(title);
        Text.fontSize(20);
        Text.fontColor($r("app.color.list_content"));
        Text.fontWeight(FontWeight.Medium);
        Text.layoutWeight(1);
        Text.pop();
        Text.create(info);
        Text.fontSize(18);
        Text.fontColor($r("app.color.list_sub_content"));
        Text.fontWeight(FontWeight.Regular);
        Text.pop();
        Row.pop();
    }
}
