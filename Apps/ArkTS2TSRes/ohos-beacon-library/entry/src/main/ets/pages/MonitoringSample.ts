interface MonitoringSample_Params {
    btn_scan_text?: Resource;
    edit_text_layout_hint?: string;
    edit_text_region_hint?: string;
    edit_text_layout?: string;
    edit_text_region?: string;
    is_List?: boolean;
    loading_rotate?: number;
    setting_visibility?: Visibility;
    list_visibility?: boolean;
    search_setting_text?: Resource;
    toast_open_bluetooth?: string;
    beaconManager?: BeaconManager;
    countArray?: Array<number>;
    count?: number;
    enterRegionText?: string;
    determineStateText?: string;
    resourceManager?: ESObject | null;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MonitoringSample_" + ++__generate__Id;
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
import { Identifier, Region, BeaconParser, BeaconManager, MonitorNotifier } from '@ohos/beacon-library';
import bluetoothAccess from '@ohos.bluetooth.access';
import { ArrayHelper, PermissionHelper } from './Utils';
import prompt from '@system.prompt';
import { Permissions } from '@ohos.abilityAccessCtrl';
import { GlobalContext } from './GlobalContext';
class MonitoringSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__btn_scan_text = new ObservedPropertyObject($r('app.string.start_monitor'), this, "btn_scan_text");
        this.__edit_text_layout_hint = new ObservedPropertySimple('', this, "edit_text_layout_hint");
        this.__edit_text_region_hint = new ObservedPropertySimple('', this, "edit_text_region_hint");
        this.__edit_text_layout = new ObservedPropertySimple('', this, "edit_text_layout");
        this.__edit_text_region = new ObservedPropertySimple('', this, "edit_text_region");
        this.__is_List = new ObservedPropertySimple(false, this, "is_List");
        this.__loading_rotate = new ObservedPropertySimple(0, this, "loading_rotate");
        this.__setting_visibility = new ObservedPropertySimple(Visibility.None, this, "setting_visibility");
        this.__list_visibility = new ObservedPropertySimple(false, this, "list_visibility");
        this.__search_setting_text = new ObservedPropertyObject($r('app.string.expand_search_settings'), this, "search_setting_text");
        this.__toast_open_bluetooth = new ObservedPropertySimple('', this, "toast_open_bluetooth");
        this.__beaconManager = new ObservedPropertyObject(BeaconManager.getInstanceForApplication(), this, "beaconManager");
        this.__countArray = new ObservedPropertyObject([], this, "countArray");
        this.__count = new ObservedPropertySimple(0, this, "count");
        this.__enterRegionText = new ObservedPropertySimple('', this, "enterRegionText");
        this.__determineStateText = new ObservedPropertySimple('', this, "determineStateText");
        this.resourceManager = null;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MonitoringSample_Params) {
        if (params.btn_scan_text !== undefined) {
            this.btn_scan_text = params.btn_scan_text;
        }
        if (params.edit_text_layout_hint !== undefined) {
            this.edit_text_layout_hint = params.edit_text_layout_hint;
        }
        if (params.edit_text_region_hint !== undefined) {
            this.edit_text_region_hint = params.edit_text_region_hint;
        }
        if (params.edit_text_layout !== undefined) {
            this.edit_text_layout = params.edit_text_layout;
        }
        if (params.edit_text_region !== undefined) {
            this.edit_text_region = params.edit_text_region;
        }
        if (params.is_List !== undefined) {
            this.is_List = params.is_List;
        }
        if (params.loading_rotate !== undefined) {
            this.loading_rotate = params.loading_rotate;
        }
        if (params.setting_visibility !== undefined) {
            this.setting_visibility = params.setting_visibility;
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
        if (params.beaconManager !== undefined) {
            this.beaconManager = params.beaconManager;
        }
        if (params.countArray !== undefined) {
            this.countArray = params.countArray;
        }
        if (params.count !== undefined) {
            this.count = params.count;
        }
        if (params.enterRegionText !== undefined) {
            this.enterRegionText = params.enterRegionText;
        }
        if (params.determineStateText !== undefined) {
            this.determineStateText = params.determineStateText;
        }
        if (params.resourceManager !== undefined) {
            this.resourceManager = params.resourceManager;
        }
    }
    aboutToBeDeleted() {
        this.__btn_scan_text.aboutToBeDeleted();
        this.__edit_text_layout_hint.aboutToBeDeleted();
        this.__edit_text_region_hint.aboutToBeDeleted();
        this.__edit_text_layout.aboutToBeDeleted();
        this.__edit_text_region.aboutToBeDeleted();
        this.__is_List.aboutToBeDeleted();
        this.__loading_rotate.aboutToBeDeleted();
        this.__setting_visibility.aboutToBeDeleted();
        this.__list_visibility.aboutToBeDeleted();
        this.__search_setting_text.aboutToBeDeleted();
        this.__toast_open_bluetooth.aboutToBeDeleted();
        this.__beaconManager.aboutToBeDeleted();
        this.__countArray.aboutToBeDeleted();
        this.__count.aboutToBeDeleted();
        this.__enterRegionText.aboutToBeDeleted();
        this.__determineStateText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __btn_scan_text: ObservedPropertyObject<Resource>;
    get btn_scan_text() {
        return this.__btn_scan_text.get();
    }
    set btn_scan_text(newValue: Resource) {
        this.__btn_scan_text.set(newValue);
    }
    private __edit_text_layout_hint: ObservedPropertySimple<string>;
    get edit_text_layout_hint() {
        return this.__edit_text_layout_hint.get();
    }
    set edit_text_layout_hint(newValue: string) {
        this.__edit_text_layout_hint.set(newValue);
    }
    private __edit_text_region_hint: ObservedPropertySimple<string>;
    get edit_text_region_hint() {
        return this.__edit_text_region_hint.get();
    }
    set edit_text_region_hint(newValue: string) {
        this.__edit_text_region_hint.set(newValue);
    }
    private __edit_text_layout: ObservedPropertySimple<string>;
    get edit_text_layout() {
        return this.__edit_text_layout.get();
    }
    set edit_text_layout(newValue: string) {
        this.__edit_text_layout.set(newValue);
    }
    private __edit_text_region: ObservedPropertySimple<string>;
    get edit_text_region() {
        return this.__edit_text_region.get();
    }
    set edit_text_region(newValue: string) {
        this.__edit_text_region.set(newValue);
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
    private __setting_visibility: ObservedPropertySimple<Visibility>;
    get setting_visibility() {
        return this.__setting_visibility.get();
    }
    set setting_visibility(newValue: Visibility) {
        this.__setting_visibility.set(newValue);
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
    private __beaconManager: ObservedPropertyObject<BeaconManager>;
    get beaconManager() {
        return this.__beaconManager.get();
    }
    set beaconManager(newValue: BeaconManager) {
        this.__beaconManager.set(newValue);
    }
    private __countArray: ObservedPropertyObject<Array<number>>;
    get countArray() {
        return this.__countArray.get();
    }
    set countArray(newValue: Array<number>) {
        this.__countArray.set(newValue);
    }
    private __count: ObservedPropertySimple<number>;
    get count() {
        return this.__count.get();
    }
    set count(newValue: number) {
        this.__count.set(newValue);
    }
    private __enterRegionText: ObservedPropertySimple<string>;
    get enterRegionText() {
        return this.__enterRegionText.get();
    }
    set enterRegionText(newValue: string) {
        this.__enterRegionText.set(newValue);
    }
    private __determineStateText: ObservedPropertySimple<string>;
    get determineStateText() {
        return this.__determineStateText.get();
    }
    set determineStateText(newValue: string) {
        this.__determineStateText.set(newValue);
    }
    private resourceManager: any | null;
    aboutToAppear() {
        this.loadStrings();
        let context: Context = GlobalContext.getContext().getValue("ctt") as Context;
        this.resourceManager = context.resourceManager;
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.create();
        Column.width('100%');
        Column.alignItems(HorizontalAlign.Start);
        Column.padding(20);
        Column.visibility(this.setting_visibility);
        TextInput.create({ placeholder: this.edit_text_layout_hint, text: this.edit_text_layout });
        TextInput.type(InputType.Normal);
        TextInput.placeholderColor(Color.Gray);
        TextInput.placeholderFont({ size: 48 });
        TextInput.margin({ bottom: 10 });
        TextInput.onChange((value: string) => {
            this.edit_text_layout = value;
        });
        TextInput.create({ placeholder: this.edit_text_region_hint, text: this.edit_text_region });
        TextInput.type(InputType.Normal);
        TextInput.placeholderColor(Color.Gray);
        TextInput.placeholderFont({ size: 48 });
        TextInput.margin({ bottom: 10 });
        TextInput.onChange((value: string) => {
            this.edit_text_region = value;
        });
        Column.pop();
        Button.createWithLabel(this.search_setting_text);
        Button.onClick(() => this.onSearchSettingClick());
        Button.fontSize(18);
        Button.margin({ bottom: 10 });
        Button.pop();
        Stack.create();
        Stack.width('100%');
        Button.createWithLabel(this.btn_scan_text);
        Button.onClick(() => this.onSearchClick());
        Button.fontSize(18);
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
        List.layoutWeight(1);
        List.margin({ top: 10 });
        List.padding({ left: 5, right: 5 });
        List.divider({ strokeWidth: 0.5, color: '#aaa' });
        List.visibility(this.is_List ? Visibility.Visible : Visibility.None);
        ListItem.create();
        Row.create();
        Row.width('100%');
        Row.height(40);
        Image.create($r('app.media.ic_blue_remote'));
        Image.width(30);
        Image.height(30);
        Text.create(this.enterRegionText);
        Text.fontSize(18);
        Text.pop();
        Text.create(this.determineStateText);
        Text.fontSize(18);
        Text.pop();
        Row.pop();
        ListItem.pop();
        List.pop();
        Column.pop();
    }
    private loadStrings() {
        this.resourceManager.getString($r('app.string.setting_layout')
            .id).then((text: string) => {
            this.edit_text_layout_hint = text;
        });
        this.resourceManager.getString($r('app.string.setting_region')
            .id).then((text: string) => {
            this.edit_text_region_hint = text;
        });
    }
    private onSearchSettingClick(): void {
        if (this.setting_visibility == Visibility.Visible) {
            this.setting_visibility = Visibility.None;
            this.search_setting_text = $r('app.string.expand_search_settings');
        }
        else {
            this.setting_visibility = Visibility.Visible;
            this.search_setting_text = $r('app.string.retrieve_search_settings');
        }
    }
    private onSearchClick(): void {
        if (this.btn_scan_text.id == $r('app.string.start_monitor').id) {
            if (BeaconManager.MOCK_DEVICE) {
                this.startMonitorExecutor();
            }
            else {
                this.checkPermissions();
            }
        }
        else if (this.btn_scan_text.id == $r('app.string.stop_monitor').id) {
            this.stopMonitorExecutor();
        }
    }
    private checkPermissions(): void {
        let result = bluetoothAccess.getState();
        console.log("checkPermissions bluetooth.state: " + result);
        if (result == 0) {
            prompt.showToast({ message: this.toast_open_bluetooth, duration: 300, });
            return;
        }
        let permissions: Array<Permissions> = ['ohos.permission.ACCESS_BLUETOOTH'];
        PermissionHelper.requestPermissions(permissions, results => {
            for (let i = 0; i < permissions.length; i++) {
                if (permissions[i] == "ohos.permission.ACCESS_BLUETOOTH" && results[i] == 0) {
                    this.onPermissionGranted(permissions[i]);
                    break;
                }
            }
        });
    }
    private onPermissionGranted(permission: string): void {
        this.startMonitorExecutor();
    }
    public clearScanDevice() {
        for (let i = 0; i < this.countArray.length; i++) {
            ArrayHelper.removeIndex(this.countArray, i);
        }
        this.count = 0;
    }
    private startMonitorExecutor(): void {
        let _this = this;
        let layoutFlag: boolean = true;
        let regionFlag: boolean = true;
        if (_this.edit_text_layout != "") {
            layoutFlag = _this.checkBeaconLayout();
        }
        if (_this.edit_text_region != "") {
            regionFlag = _this.checkRegion();
        }
        if (!layoutFlag) {
            AlertDialog.show({
                title: $r('app.string.notifyTitle'),
                message: $r('app.string.layoutError'),
                confirm: {
                    value: $r('app.string.ok'),
                    action: () => {
                        return;
                    }
                },
                cancel: () => {
                    return;
                }
            });
            return;
        }
        if (!regionFlag) {
            AlertDialog.show({
                title: $r('app.string.notifyTitle'),
                message: $r('app.string.regionError'),
                confirm: {
                    value: $r('app.string.ok'),
                    action: () => {
                        return;
                    }
                },
                cancel: () => {
                    return;
                }
            });
            return;
        }
        if (_this.edit_text_layout != "") {
            _this.beaconManager.getBeaconParsers()
                .push(new BeaconParser().setBeaconLayout(_this.edit_text_layout));
        }
        let region: Region = new Region("myMonitorUniqueId");
        if (_this.edit_text_region != "") {
            let ids: string[] = _this.edit_text_region.split(",");
            console.debug("MonitoringSample ids:" + JSON.stringify(ids));
            if (ids.length == 1) {
                region = new Region("myMonitorUniqueId", Identifier.parse(ids[0]));
            }
            else if (ids.length == 2) {
                region = new Region("myMonitorUniqueId", Identifier.parse(ids[0]), Identifier.parse(ids[1]));
            }
            else if (ids.length == 3) {
                region = new Region("myMonitorUniqueId", Identifier.parse(ids[0]), Identifier.parse(ids[1]), Identifier.parse(ids[2]));
            }
        }
        console.log("startScan");
        _this.is_List = true;
        _this.clearScanDevice();
        _this.loading_rotate = 360;
        _this.btn_scan_text = $r('app.string.stop_monitor');
        _this.beaconManager.addMonitorNotifier({
            didEnterRegion(region: Region): void {
                _this.enterRegionText = "I just saw a region: " + region.getUniqueId();
            },
            didExitRegion(region: Region): void {
                _this.enterRegionText = "I no longer see an beacon in Region:" + region.getUniqueId();
            },
            didDetermineStateForRegion(state: number, region: Region): void {
                _this.determineStateText = "I have just switched from seeing/not seeing beacons: " + state;
            },
            INSIDE: 1,
            OUTSIDE: 0
        });
        _this.beaconManager.startMonitoring(region);
    }
    private checkBeaconLayout(): boolean {
        try {
            new BeaconParser().setBeaconLayout(this.edit_text_layout);
        }
        catch (e) {
            return false;
        }
        return true;
    }
    private checkRegion(): boolean {
        try {
            let ids: string[] = this.edit_text_region.split(",");
            if (ids.length > 3) {
                return false;
            }
            for (let id of ids) {
                if (id != "") {
                    Identifier.parse(id);
                }
            }
        }
        catch (e) {
            return false;
        }
        return true;
    }
    private stopMonitorExecutor(): void {
        let _this = this;
        console.log("stopScan");
        _this.is_List = false;
        _this.clearScanDevice();
        _this.loading_rotate = 0;
        _this.btn_scan_text = $r('app.string.start_monitor');
        this.beaconManager.stopMonitoring(new Region("myMonitorUniqueId"));
        console.log("The first beacon I see is about ");
    }
}
loadDocument(new MonitoringSample("1", undefined, {}));
