interface DeviceList_Params {
    isRefreshing?: boolean;
    device?: DeviceAttribute;
    devices?: Array<DeviceAttribute>;
    getDeviceList?: () => void;
    openDialog?: () => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DeviceList_" + ++__generate__Id;
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
import { DeviceAttribute } from '../../model/DeviceAttribute';
export class DeviceList extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isRefreshing = new SynchedPropertySimpleTwoWay(params.isRefreshing, this, "isRefreshing");
        this.__device = new SynchedPropertyObjectTwoWay(params.device, this, "device");
        this.__devices = this.initializeConsume('devicesList', "devices");
        this.getDeviceList = () => {
        };
        this.openDialog = () => {
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DeviceList_Params) {
        if (params.getDeviceList !== undefined) {
            this.getDeviceList = params.getDeviceList;
        }
        if (params.openDialog !== undefined) {
            this.openDialog = params.openDialog;
        }
    }
    aboutToBeDeleted() {
        this.__isRefreshing.aboutToBeDeleted();
        this.__device.aboutToBeDeleted();
        this.__devices.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isRefreshing: SynchedPropertySimpleTwoWay<boolean>;
    get isRefreshing() {
        return this.__isRefreshing.get();
    }
    set isRefreshing(newValue: boolean) {
        this.__isRefreshing.set(newValue);
    }
    private __device: SynchedPropertySimpleOneWay<DeviceAttribute>;
    get device() {
        return this.__device.get();
    }
    set device(newValue: DeviceAttribute) {
        this.__device.set(newValue);
    }
    private __devices: SynchedPropertySimpleOneWay<Array<DeviceAttribute>>;
    get devices() {
        return this.__devices.get();
    }
    set devices(newValue: Array<DeviceAttribute>) {
        this.__devices.set(newValue);
    }
    public getDeviceList: () => void;
    public openDialog: () => void;
    render() {
        Column.create();
        Column.width('100%');
        Column.layoutWeight(1);
        Column.borderRadius(20);
        Column.backgroundColor($r('app.color.list_background'));
        Text.create($r('app.string.device_list'));
        Text.fontSize(16);
        Text.fontColor($r('app.color.list_sub_content'));
        Text.fontWeight(FontWeight.Medium);
        Text.margin({
            left: 16,
            top: 24,
            bottom: 12
        });
        Text.width('100%');
        Text.pop();
        Refresh.create({ refreshing: this.isRefreshing, offset: 120, friction: 100 });
        Refresh.width('100%');
        Refresh.margin({ bottom: 20 });
        Refresh.layoutWeight(1);
        Refresh.onRefreshing(() => {
            this.isRefreshing = true;
            this.getDeviceList();
            setTimeout(() => {
                this.isRefreshing = false;
            }, 1000);
        });
        List.create();
        List.width('100%');
        List.borderRadius(20);
        List.divider({
            strokeWidth: px2vp(1),
            color: $r("app.color.divider"),
            startMargin: 16,
            endMargin: 16
        });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.devices), (item: DeviceAttribute, index: number) => {
            ListItem.create();
            ListItem.onClick(() => {
                this.device = this.devices[index];
                this.openDialog();
            });
            Text.create(`${item.manufacturerName} ${item.productName}`);
            Text.height(60);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.width('100%');
            Text.fontColor($r("app.color.black"));
            Text.backgroundColor($r("app.color.white"));
            Text.padding({ left: 16, right: 16 });
            Text.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Refresh.pop();
        Column.pop();
    }
}
