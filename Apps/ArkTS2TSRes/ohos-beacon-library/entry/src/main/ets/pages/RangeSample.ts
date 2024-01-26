interface RangeSample_Params {
    btn_scan_text?: Resource;
    is_List?: boolean;
    loading_rotate?: number;
    list_visibility?: boolean;
    search_setting_text?: Resource;
    toast_open_bluetooth?: string;
    beaconList?: Array<Beacon>;
    beaconManager?: BeaconManager;
    edit_text_layout?: string;
    serviceUuid?: string;
    major?: string;
    minor?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "RangeSample_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { Identifier, Region, BeaconParser, BeaconManager, RangeNotifier, Beacon } from '@ohos/beacon-library';
import access from '@ohos.bluetooth.access';
import { ArrayHelper, PermissionHelper } from './Utils';
import abilityAccessCtrl, { Permissions } from '@ohos.abilityAccessCtrl';
import { GlobalContext } from './GlobalContext';
import { BusinessError } from '@ohos.base';
class RangeSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__btn_scan_text = new ObservedPropertyObject($r('app.string.start_range'), this, "btn_scan_text");
        this.__is_List = new ObservedPropertySimple(false, this, "is_List");
        this.__loading_rotate = new ObservedPropertySimple(0, this, "loading_rotate");
        this.__list_visibility = new ObservedPropertySimple(false, this, "list_visibility");
        this.__search_setting_text = new ObservedPropertyObject($r('app.string.expand_search_settings'), this, "search_setting_text");
        this.__toast_open_bluetooth = new ObservedPropertySimple('', this, "toast_open_bluetooth");
        this.__beaconList = new ObservedPropertyObject(new Array(), this, "beaconList");
        this.beaconManager = BeaconManager.getInstanceForApplication();
        this.edit_text_layout = 'm:2-3=beac,i:4-19,i:20-21,i:22-23,p:24-24,d:25-25';
        this.serviceUuid = '2f234454-cf6d-4a0f-adf2-f4911ba9ffa6';
        this.major = '1';
        this.minor = '2';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: RangeSample_Params) {
        if (params.btn_scan_text !== undefined) {
            this.btn_scan_text = params.btn_scan_text;
        }
        if (params.is_List !== undefined) {
            this.is_List = params.is_List;
        }
        if (params.loading_rotate !== undefined) {
            this.loading_rotate = params.loading_rotate;
        }
        if (params.list_visibility !== undefined) {
            this.list_visibility = params.list_visibility;
        }
        if (params.search_setting_text !== undefined) {
            this.search_setting_text = params.search_setting_text;
        }
        if (params.toast_open_bluetooth !== undefined) {
            this.toast_open_bluetooth = params.toast_open_bluetooth;
        }
        if (params.beaconList !== undefined) {
            this.beaconList = params.beaconList;
        }
        if (params.beaconManager !== undefined) {
            this.beaconManager = params.beaconManager;
        }
        if (params.edit_text_layout !== undefined) {
            this.edit_text_layout = params.edit_text_layout;
        }
        if (params.serviceUuid !== undefined) {
            this.serviceUuid = params.serviceUuid;
        }
        if (params.major !== undefined) {
            this.major = params.major;
        }
        if (params.minor !== undefined) {
            this.minor = params.minor;
        }
    }
    aboutToBeDeleted() {
        this.__btn_scan_text.aboutToBeDeleted();
        this.__is_List.aboutToBeDeleted();
        this.__loading_rotate.aboutToBeDeleted();
        this.__list_visibility.aboutToBeDeleted();
        this.__search_setting_text.aboutToBeDeleted();
        this.__toast_open_bluetooth.aboutToBeDeleted();
        this.__beaconList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __btn_scan_text: ObservedPropertyObject<Resource>;
    get btn_scan_text() {
        return this.__btn_scan_text.get();
    }
    set btn_scan_text(newValue: Resource) {
        this.__btn_scan_text.set(newValue);
    }
    private __is_List: ObservedPropertySimple<boolean>;
    get is_List() {
        return this.__is_List.get();
    }
    set is_List(newValue: boolean) {
        this.__is_List.set(newValue);
    }
    private __loading_rotate: ObservedPropertySimple<number>;
    get loading_rotate() {
        return this.__loading_rotate.get();
    }
    set loading_rotate(newValue: number) {
        this.__loading_rotate.set(newValue);
    }
    private __list_visibility: ObservedPropertySimple<boolean>;
    get list_visibility() {
        return this.__list_visibility.get();
    }
    set list_visibility(newValue: boolean) {
        this.__list_visibility.set(newValue);
    }
    private __search_setting_text: ObservedPropertyObject<Resource>;
    get search_setting_text() {
        return this.__search_setting_text.get();
    }
    set search_setting_text(newValue: Resource) {
        this.__search_setting_text.set(newValue);
    }
    private __toast_open_bluetooth: ObservedPropertySimple<string>;
    get toast_open_bluetooth() {
        return this.__toast_open_bluetooth.get();
    }
    set toast_open_bluetooth(newValue: string) {
        this.__toast_open_bluetooth.set(newValue);
    }
    private __beaconList: ObservedPropertyObject<Array<Beacon>>;
    get beaconList() {
        return this.__beaconList.get();
    }
    set beaconList(newValue: Array<Beacon>) {
        this.__beaconList.set(newValue);
    }
    private beaconManager: BeaconManager;
    private edit_text_layout: string;
    private serviceUuid: string;
    private major: string;
    private minor: string;
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.create();
        Column.width('100%');
        Column.alignItems(HorizontalAlign.Start);
        Column.padding(20);
        Text.create('设置信标库信标类型');
        Text.fontSize(13);
        Text.margin({ bottom: 10 });
        Text.height(20);
        Text.pop();
        Text.create('' + this.edit_text_layout);
        Text.fontSize(13);
        Text.margin({ bottom: 10 });
        Text.height(20);
        Text.pop();
        Row.create();
        Row.width('100%');
        Text.create('serviceUuid : ');
        Text.fontSize(13);
        Text.margin({ bottom: 10 });
        Text.height(20);
        Text.pop();
        Text.create('' + this.serviceUuid);
        Text.fontSize(13);
        Text.margin({ bottom: 10 });
        Text.height(20);
        Text.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Text.create('major : ');
        Text.fontSize(13);
        Text.margin({ bottom: 10 });
        Text.height(20);
        Text.pop();
        Text.create('' + this.major);
        Text.fontSize(13);
        Text.margin({ bottom: 10 });
        Text.height(20);
        Text.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Text.create('minor : ');
        Text.fontSize(13);
        Text.margin({ bottom: 10 });
        Text.height(20);
        Text.pop();
        Text.create('' + this.minor);
        Text.fontSize(13);
        Text.margin({ bottom: 10 });
        Text.height(20);
        Text.pop();
        Row.pop();
        Column.pop();
        Stack.create();
        Stack.width('100%');
        Button.createWithLabel(this.btn_scan_text);
        Button.onClick(() => this.onSearchClick());
        Button.fontSize(18);
        Button.height(60);
        Button.fontWeight(FontWeight.Bold);
        Button.pop();
        Image.create($r('app.media.ic_loading'));
        Context.animation({ duration: 1000, iterations: -1, curve: Curve.Linear });
        Image.width(30);
        Image.height('100%');
        Image.align(Alignment.Center);
        Image.markAnchor({ x: 30 + 10, y: 0 });
        Image.position({ x: '100%', y: 0 });
        Image.objectFit(ImageFit.Contain);
        Image.rotate({
            x: 0,
            y: 0,
            z: 1,
            centerX: '50%',
            centerY: '50%',
            angle: this.loading_rotate
        });
        Context.animation(null);
        Image.visibility(Visibility.None);
        Stack.pop();
        List.create();
        List.width('100%');
        List.height(300);
        List.margin({ top: 10 });
        List.padding({ left: 5, right: 5 });
        List.divider({ strokeWidth: 0.5, color: '#aaa' });
        List.visibility(this.is_List ? Visibility.Visible : Visibility.None);
        ListItem.create();
        Row.create();
        Row.width('100%');
        Row.height(40);
        Row.backgroundColor("#008B8B");
        Image.create($r('app.media.ic_blue_connected'));
        Image.width(30);
        Image.height(30);
        Column.create();
        Column.layoutWeight(1);
        Column.margin({ left: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Text.create($r('app.string.distance'));
        Text.fontSize(14);
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin({ left: 40, right: 40 });
        Text.create('蓝牙地址');
        Text.fontSize(14);
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin({ right: 30 });
        Text.create($r('app.string.rssi'));
        Text.fontSize(14);
        Text.pop();
        Column.pop();
        Row.pop();
        ListItem.pop();
        ForEach.create("2", this, ObservedObject.GetRawObject(this.beaconList), (device: Beacon) => {
            ListItem.create();
            Row.create();
            Row.width('100%');
            Row.height(40);
            Image.create($r('app.media.ic_blue_remote'));
            Image.width(30);
            Image.height(30);
            Column.create();
            Column.layoutWeight(1);
            Column.margin({ left: 10 });
            Column.alignItems(HorizontalAlign.Start);
            Text.create(device.getDistance().toFixed(2) + "米");
            Text.fontSize(14);
            Text.pop();
            Column.pop();
            Column.create();
            Column.margin({ left: 40, right: 40 });
            Text.create('' + device.getBluetoothAddress());
            Text.fontSize(14);
            Text.pop();
            Column.pop();
            Column.create();
            Column.margin({ right: 30 });
            Text.create('' + device.getRunningAverageRssi());
            Text.fontSize(14);
            Text.pop();
            Column.pop();
            Row.pop();
            ListItem.pop();
        }, (item: number) => item.toString());
        ForEach.pop();
        List.pop();
        Column.pop();
    }
    private onSearchClick(): void {
        if (this.btn_scan_text.id == $r('app.string.start_range').id) {
            if (BeaconManager.MOCK_DEVICE) {
                this.startRangeExecutor();
            }
            else {
                this.checkPermissions();
                // this.startRangeExecutor();
            }
        }
        else if (this.btn_scan_text.id == $r('app.string.stop_range').id) {
            this.stopRangeExecutor();
        }
    }
    private checkPermissions(): void {
        let atManager = abilityAccessCtrl.createAtManager();
        let context: Context = GlobalContext.getContext().getValue("ctt") as Context;
        let permissions: Permissions[] = [
            "ohos.permission.USE_BLUETOOTH",
            "ohos.permission.DISCOVER_BLUETOOTH",
            "ohos.permission.APPROXIMATELY_LOCATION",
            "ohos.permission.LOCATION",
            "ohos.permission.ACCESS_BLUETOOTH"
        ];
        try {
            atManager.requestPermissionsFromUser(context, permissions, (err: BusinessError, data: any) => {
                if (data.authResults[0] == 0) {
                    console.log("RangeSample checkPermissions bluetooth.state: " + access.getState());
                    this.startRangeExecutor();
                }
            });
        }
        catch (err) {
            console.log(`beacon permissions catch err->${JSON.stringify(err)}`);
        }
    }
    public clearScanDevice() {
        for (let i = 0; i < this.beaconList.length; i++) {
            ArrayHelper.removeIndex(this.beaconList, i);
        }
    }
    private startRangeExecutor(): void {
        let _this = this;
        _this.beaconManager.getBeaconParsers()
            .push(new BeaconParser().setBeaconLayout(_this.edit_text_layout));
        let region: Region = new Region("myRangingUniqueId", Identifier.parse(_this.serviceUuid), Identifier.parse(_this.major), Identifier.parse(_this.minor));
        console.log("RangeSample startScan " + JSON.stringify(region));
        _this.is_List = true;
        _this.clearScanDevice();
        console.log("loading_rotate before===== " + _this.loading_rotate);
        _this.loading_rotate = 360;
        console.log("loading_rotate after===== " + _this.loading_rotate);
        _this.btn_scan_text = $r('app.string.stop_range');
        console.log("btn_scan_text===== " + _this.btn_scan_text);
        _this.beaconManager.addRangeNotifier({
            didRangeBeaconsInRegion(beacons: Set<Beacon>, region: Region): void {
                console.info("RangeSample beacons :" + JSON.stringify(beacons));
                beacons.forEach((value, value2, array) => {
                    console.info("RangeSample beacons content:" + JSON.stringify(value));
                    for (let j = 0; j < _this.beaconList.length; j++) {
                        _this.beaconList.pop();
                    }
                    _this.beaconList.push(value);
                });
                console.info("RangeSample size:" + _this.beaconList.length);
                _this.beaconList.forEach((value, index, array) => {
                    console.info("RangeSample:" + JSON.stringify(value.getManufacturer()) + ",address:" + value.getBluetoothAddress());
                    console.info("RangeSample region:" + JSON.stringify(value.getId1()) + ",id2:" + value.getId2() + ",id3:" + value.getId3());
                });
            }
        });
        _this.beaconManager.startRangingBeacons(region);
        console.log("The first beacon I see is about ");
    }
    private stopRangeExecutor(): void {
        let _this = this;
        console.log("stopScan");
        _this.is_List = false;
        _this.clearScanDevice();
        _this.loading_rotate = 0;
        _this.btn_scan_text = $r('app.string.start_range');
        this.beaconManager.stopRangingBeacons(new Region("myRangingUniqueId", null, null, null));
        console.log("The first beacon I see is about ");
    }
    aboutToAppear() {
    }
    aboutToDisappear() {
    }
}
loadDocument(new RangeSample("1", undefined, {}));
