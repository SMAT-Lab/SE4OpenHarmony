interface PairDialog_Params {
    dialogController?: CustomDialogController;
    action?: (accept: boolean) => void;
    deviceName?: string;
    pinCode?: string;
}
interface AvailableDeviceComponent_Params {
    TAG_PAGE?;
    controller?: BluetoothDeviceController;
    isDeviceDiscovering?: boolean;
    availableDevices?: BluetoothDevice[];
    availableDevicesList?: AvailableDevicesDataSource;
    pairPinCode?: string;
    pairingDevice?: BluetoothDevice;
    controlPairing?: boolean;
    pairData?: BluetoothDevice;
    pinRequiredParam?: {
        deviceId: string;
        pinCode: string;
    };
    pairDialog?: CustomDialogController;
}
interface PairedDeviceComponent_Params {
    TAG_PAGE?;
    controller?: BluetoothDeviceController;
    pairedDevices?: BluetoothDevice[];
    isTouched?: boolean;
    hide?: boolean;
}
interface Bluetooth_Params {
    PAGE_TAG?;
    deviceController?: BluetoothDeviceController;
    isOn?: boolean;
    isEnabled?: boolean;
    localName?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "bluetooth_" + ++__generate__Id;
}
/**
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or
 {
 "name": "bluetoothTab", agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Router from '@system.router';
import deviceInfo from '@ohos.deviceInfo';
import BluetoothDevice from '../../model/BluetoothDevice';
import Logger from '../../model/Logger';
import BluetoothDeviceController from '../../controller/BluetoothDeviceController';
import { DeviceType, ProfileConnectionState, BondState } from '../../model/BluetoothModel';
import { TitleBar } from '../../common/TitleBar';
const PAIRED_ITEM_NUMBER = 3;
const PAGE_URI_DEVICE_NAME = 'pages/deviceName';
const PAGE_URI_BLUETOOTH_PAIRED_DEVICE_INFO = 'pages/bluetoothPairedDeviceInfo';
const deviceTypeInfo = deviceInfo.deviceType;
let pinRequiredTIimer = null;
export class Bluetooth extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.PAGE_TAG = 'Bluetooth page ';
        this.deviceController = new BluetoothDeviceController();
        this.__isOn = AppStorage.SetAndLink('bluetoothIsOn', false, this, "isOn");
        this.__isEnabled = AppStorage.SetAndLink('bluetoothToggleEnabled', true, this, "isEnabled");
        this.__localName = AppStorage.SetAndLink('bluetoothLocalName', '', this, "localName");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Bluetooth_Params) {
        if (params.PAGE_TAG !== undefined) {
            this.PAGE_TAG = params.PAGE_TAG;
        }
        if (params.deviceController !== undefined) {
            this.deviceController = params.deviceController;
        }
    }
    aboutToBeDeleted() {
        this.__isOn.aboutToBeDeleted();
        this.__isEnabled.aboutToBeDeleted();
        this.__localName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private PAGE_TAG;
    private deviceController: BluetoothDeviceController;
    private __isOn: ObservedPropertyAbstract<boolean>;
    get isOn() {
        return this.__isOn.get();
    }
    set isOn(newValue: boolean) {
        this.__isOn.set(newValue);
    }
    private __isEnabled: ObservedPropertyAbstract<boolean>;
    get isEnabled() {
        return this.__isEnabled.get();
    }
    set isEnabled(newValue: boolean) {
        this.__isEnabled.set(newValue);
    }
    private __localName: ObservedPropertyAbstract<string>;
    get localName() {
        return this.__localName.get();
    }
    set localName(newValue: string) {
        this.__localName.set(newValue);
    }
    aboutToAppear(): void {
        Logger.info(this.PAGE_TAG + 'aboutToAppear in : isOn = ' + this.isOn);
        this.deviceController
            .initData()
            .subscribe();
        Logger.info(this.PAGE_TAG + 'aboutToAppear out : isOn = ' + this.isOn);
    }
    onPageShow(): void {
        Logger.info(this.PAGE_TAG + 'onPageShow in : localName = ' + this.localName);
        Logger.info(this.PAGE_TAG + 'onPageShow out : localName = ' + this.localName);
    }
    aboutToDisappear(): void {
        this.deviceController.unsubscribe();
    }
    render() {
        Column.create();
        Column.backgroundColor($r("sys.color.ohos_id_color_sub_background"));
        Column.width('100%');
        Column.height('100%');
        let earlierCreatedChild_2: TitleBar = (this && this.findChildById) ? this.findChildById("2") as TitleBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TitleBar("2", this, { title: '蓝牙测试' }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: '蓝牙测试'
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        GridContainer.create({ gutter: 24, margin: 24 });
        GridContainer.width('100%');
        GridContainer.height('100%');
        Column.create();
        Column.useSizeType({
            sm: { span: 4, offset: 0 },
            md: { span: 6, offset: 1 },
            lg: { span: 8, offset: 2 }
        });
        Row.create();
        Row.margin({ top: 8 });
        Row.width('100%');
        Row.height(56);
        Row.borderRadius(28);
        Row.padding({ left: 12, right: 6 });
        Row.alignItems(VerticalAlign.Center);
        Row.borderRadius(24);
        Text.create("蓝牙");
        Text.fontColor($r('sys.color.ohos_fa_text_primary'));
        Text.fontSize(16);
        Text.fontWeight(FontWeight.Medium);
        Text.pop();
        Blank.create();
        Blank.pop();
        Toggle.create({ type: ToggleType.Switch, isOn: this.isOn });
        Toggle.width('36vp');
        Toggle.height('20vp');
        Toggle.selectedColor('#007DFF');
        Toggle.margin({ left: 6 });
        Toggle.onChange((isOn: boolean) => {
            Logger.info(this.PAGE_TAG + 'Toggle onClick: isOn = ' + isOn + ', enabled = ' + this.isEnabled);
            if (!this.isEnabled)
                return;
            this.deviceController.toggleValue(isOn);
        });
        Toggle.pop();
        Row.pop();
        Scroll.create();
        Scroll.scrollBarWidth(0);
        Scroll.width('100%');
        Scroll.align(Alignment.TopStart);
        Scroll.layoutWeight(1);
        Column.create();
        Column.width('100%');
        If.create();
        if (this.isOn) {
            If.branchId(0);
            let earlierCreatedChild_3: AvailableDeviceComponent = (this && this.findChildById) ? this.findChildById("3") as AvailableDeviceComponent : undefined;
            if (earlierCreatedChild_3 == undefined) {
                View.create(new AvailableDeviceComponent("3", this, {
                    controller: this.deviceController,
                }));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({
                    controller: this.deviceController
                });
                View.create(earlierCreatedChild_3);
            }
        }
        If.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
        GridContainer.pop();
        Column.pop();
    }
}
class PairedDeviceComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.TAG_PAGE = 'PairedDeviceComponent ';
        this.controller = undefined;
        this.__pairedDevices = AppStorage.SetAndLink('bluetoothPairedDevices', [], this, "pairedDevices");
        this.__isTouched = new ObservedPropertySimple(false, this, "isTouched");
        this.__hide = new ObservedPropertySimple(true, this, "hide");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PairedDeviceComponent_Params) {
        if (params.TAG_PAGE !== undefined) {
            this.TAG_PAGE = params.TAG_PAGE;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.isTouched !== undefined) {
            this.isTouched = params.isTouched;
        }
        if (params.hide !== undefined) {
            this.hide = params.hide;
        }
    }
    aboutToBeDeleted() {
        this.__pairedDevices.aboutToBeDeleted();
        this.__isTouched.aboutToBeDeleted();
        this.__hide.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private TAG_PAGE;
    private controller: BluetoothDeviceController;
    private __pairedDevices: ObservedPropertyAbstract<BluetoothDevice[]>;
    get pairedDevices() {
        return this.__pairedDevices.get();
    }
    set pairedDevices(newValue: BluetoothDevice[]) {
        this.__pairedDevices.set(newValue);
    }
    private __isTouched: ObservedPropertySimple<boolean>;
    get isTouched() {
        return this.__isTouched.get();
    }
    set isTouched(newValue: boolean) {
        this.__isTouched.set(newValue);
    }
    private __hide: ObservedPropertySimple<boolean>;
    get hide() {
        return this.__hide.get();
    }
    set hide(newValue: boolean) {
        this.__hide.set(newValue);
    }
    aboutToAppear(): void {
    }
    render() {
        Column.create();
        If.create();
        if (this.pairedDevices && this.pairedDevices.length > 0) {
            If.branchId(0);
            // paired devices title
            Row.create();
            // paired devices title
            Row.width('100%');
            // paired devices title
            Row.padding({
                left: 12,
                top: 19,
                bottom: 5
            });
            Text.create("已配对的设备");
            Text.width('100%');
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor($r('sys.color.ohos_id_color_text_secondary'));
            Text.pop();
            // paired devices title
            Row.pop();
            List.create();
            List.padding(4);
            List.borderRadius(24);
            // paired devices list
            ForEach.create("4", this, ObservedObject.GetRawObject(this.pairedDevices), (item: BluetoothDevice, index: number) => {
                If.create();
                if (index < PAIRED_ITEM_NUMBER || !this.hide) {
                    If.branchId(0);
                    ListItem.create();
                    Row.create();
                    Row.width('100%');
                    Row.borderRadius(24);
                    Row.onClick(() => {
                        this.itemClicked(item);
                    });
                    Text.create(item.deviceId);
                    Text.pop();
                    Row.pop();
                    ListItem.pop();
                }
                If.pop();
                If.create();
                if ((this.hide && index === PAIRED_ITEM_NUMBER) || //more
                    (!this.hide && index >= PAIRED_ITEM_NUMBER && index == this.pairedDevices.length - 1)) { //put_away
                    If.branchId(0);
                    ListItem.create();
                    Stack.create({ alignContent: Alignment.Center });
                    Stack.height(48);
                    Stack.backgroundColor($r("sys.color.ohos_id_color_foreground_contrary"));
                    Stack.create({ alignContent: Alignment.Center });
                    Stack.width('100%');
                    Stack.height(48);
                    Stack.borderRadius(20);
                    Stack.onTouch((event: TouchEvent) => {
                        if (event.type === TouchType.Down) {
                            this.isTouched = true;
                        }
                        if (event.type === TouchType.Up) {
                            this.isTouched = false;
                        }
                    });
                    Stack.onClick(() => {
                        this.hide = !this.hide;
                    });
                    Stack.pop();
                    Stack.pop();
                    ListItem.pop();
                }
                If.pop();
            }, item => JSON.stringify(item));
            // paired devices list
            ForEach.pop();
            List.pop();
        }
        If.pop();
        Column.pop();
    }
    /**
     * Get connection state text
     * @param device
     */
    getConnectionStateText(device: BluetoothDevice): string {
        let stateText: string = '';
        switch (device.connectionState) {
            case ProfileConnectionState.STATE_DISCONNECTED:
                stateText = '';
                break;
            case ProfileConnectionState.STATE_CONNECTING:
                stateText = JSON.parse("正在连接");
                break;
            case ProfileConnectionState.STATE_CONNECTED:
                if (device.deviceType === DeviceType.HEADPHONE) {
                    stateText = JSON.parse("已连接");
                }
                else {
                    stateText = '';
                }
                break;
            case ProfileConnectionState.STATE_DISCONNECTING:
                stateText = JSON.parse("正在断开");
                break;
        }
        return stateText;
    }
    /**
     * Whether headphone connected.
     * @param item device
     * @return headphone connected or not
     */
    private isHeadPhoneConnected(item: BluetoothDevice): boolean {
        return item.deviceType === DeviceType.HEADPHONE && item.connectionState === ProfileConnectionState.STATE_CONNECTED;
    }
    /**
     * Goto paired device Info
     * @param item device
     */
    private gotoPairedDeviceInfo(item: BluetoothDevice) {
        if (item.connectionState != 1
            && item.connectionState != 3) {
            Logger.info(this.TAG_PAGE + 'item right icon on click.');
            let param = { 'bluetoothDevice': JSON.stringify(item) };
            Router.push({
                uri: PAGE_URI_BLUETOOTH_PAIRED_DEVICE_INFO,
                params: param
            });
        }
    }
    /**
     * Item clicked
     * @param item device
     */
    private itemClicked(item: BluetoothDevice) {
        switch (item.connectionState) {
            case 2:
                this.showDisconnectDialog(item.deviceName, () => {
                    this.controller.disconnect(item.deviceId);
                });
                break;
            case 0:
                if (!this.controller.connect(item.deviceId)) {
                }
                break;
        }
    }
    /**
     * Disconnect Dialog
     */
    showDisconnectDialog(deviceName, callback) {
        AlertDialog.show({
            title: "断开连接？",
            message: "此操作将会断开您与以下设备的连接：" + deviceName,
            primaryButton: {
                value: $r('app.string.cancel'),
                action: () => {
                    Logger.info('Closed callbacks');
                }
            },
            secondaryButton: {
                value: $r('app.string.confirm'),
                action: () => {
                    Logger.info(`AlertDialog success:`);
                    callback();
                }
            },
            alignment: deviceTypeInfo === 'phone' || deviceTypeInfo === 'default' ? DialogAlignment.Bottom : DialogAlignment.Center,
            offset: ({ dx: 0, dy: deviceTypeInfo === 'phone' || deviceTypeInfo === 'default' ? '-24dp' : 0 })
        });
    }
}
class AvailableDeviceComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.TAG_PAGE = 'AvailableDeviceComponent ';
        this.controller = undefined;
        this.__isDeviceDiscovering = new ObservedPropertySimple(false, this, "isDeviceDiscovering");
        this.__availableDevices = AppStorage.SetAndLink('bluetoothAvailableDevices', [], this, "availableDevices");
        this.__availableDevicesList = new ObservedPropertyObject(new AvailableDevicesDataSource(this.availableDevices), this, "availableDevicesList");
        this.__pairPinCode = new ObservedPropertySimple('', this, "pairPinCode");
        this.pairingDevice = undefined;
        this.__controlPairing = AppStorage.SetAndLink("controlPairing", true, this, "controlPairing");
        this.__pairData = AppStorage.SetAndLink("pairData", null, this, "pairData");
        this.__pinRequiredParam = AppStorage.SetAndLink("pinRequiredParam", { deviceId: '', pinCode: '' }, this, "pinRequiredParam");
        this.pairDialog = new CustomDialogController({
            builder: () => {
                let jsDialog = new PairDialog("6", this, {
                    deviceName: (this.pairingDevice && this.pairingDevice.hasOwnProperty('deviceName')) ? this.pairingDevice.deviceName : undefined,
                    pinCode: this.pairPinCode,
                    action: (accept: boolean) => {
                        this.confirmPairing(accept);
                    }
                });
                jsDialog.setController(this.pairDialog);
                View.create(jsDialog);
            },
            alignment: deviceTypeInfo === 'phone' || deviceTypeInfo === 'default' ? DialogAlignment.Bottom : DialogAlignment.Center,
            offset: ({ dx: 0, dy: deviceTypeInfo === 'phone' || deviceTypeInfo === 'default' ? '-24dp' : 0 }),
            autoCancel: true
        }, this);
        this.updateWithValueParams(params);
        this.declareWatch("availableDevices", this.availableDevicesChange);
        this.declareWatch("pinRequiredParam", this.pinRequiredParamChange);
    }
    updateWithValueParams(params: AvailableDeviceComponent_Params) {
        if (params.TAG_PAGE !== undefined) {
            this.TAG_PAGE = params.TAG_PAGE;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.isDeviceDiscovering !== undefined) {
            this.isDeviceDiscovering = params.isDeviceDiscovering;
        }
        if (params.availableDevicesList !== undefined) {
            this.availableDevicesList = params.availableDevicesList;
        }
        if (params.pairPinCode !== undefined) {
            this.pairPinCode = params.pairPinCode;
        }
        if (params.pairingDevice !== undefined) {
            this.pairingDevice = params.pairingDevice;
        }
        if (params.pairDialog !== undefined) {
            this.pairDialog = params.pairDialog;
        }
    }
    aboutToBeDeleted() {
        this.__isDeviceDiscovering.aboutToBeDeleted();
        this.__availableDevices.aboutToBeDeleted();
        this.__availableDevicesList.aboutToBeDeleted();
        this.__pairPinCode.aboutToBeDeleted();
        this.__controlPairing.aboutToBeDeleted();
        this.__pairData.aboutToBeDeleted();
        this.__pinRequiredParam.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private TAG_PAGE;
    private controller: BluetoothDeviceController;
    private __isDeviceDiscovering: ObservedPropertySimple<boolean>;
    get isDeviceDiscovering() {
        return this.__isDeviceDiscovering.get();
    }
    set isDeviceDiscovering(newValue: boolean) {
        this.__isDeviceDiscovering.set(newValue);
    }
    private __availableDevices: ObservedPropertyAbstract<BluetoothDevice[]>;
    get availableDevices() {
        return this.__availableDevices.get();
    }
    set availableDevices(newValue: BluetoothDevice[]) {
        this.__availableDevices.set(newValue);
    }
    private __availableDevicesList: ObservedPropertyObject<AvailableDevicesDataSource>;
    get availableDevicesList() {
        return this.__availableDevicesList.get();
    }
    set availableDevicesList(newValue: AvailableDevicesDataSource) {
        this.__availableDevicesList.set(newValue);
    }
    private __pairPinCode: ObservedPropertySimple<string>;
    get pairPinCode() {
        return this.__pairPinCode.get();
    }
    set pairPinCode(newValue: string) {
        this.__pairPinCode.set(newValue);
    }
    private pairingDevice: BluetoothDevice;
    private __controlPairing: ObservedPropertyAbstract<boolean>;
    get controlPairing() {
        return this.__controlPairing.get();
    }
    set controlPairing(newValue: boolean) {
        this.__controlPairing.set(newValue);
    }
    private __pairData: ObservedPropertyAbstract<BluetoothDevice>;
    get pairData() {
        return this.__pairData.get();
    }
    set pairData(newValue: BluetoothDevice) {
        this.__pairData.set(newValue);
    }
    private __pinRequiredParam: ObservedPropertyAbstract<{
        deviceId: string;
        pinCode: string;
    }>;
    get pinRequiredParam() {
        return this.__pinRequiredParam.get();
    }
    set pinRequiredParam(newValue: {
        deviceId: string;
        pinCode: string;
    }) {
        this.__pinRequiredParam.set(newValue);
    }
    private pairDialog: CustomDialogController;
    availableDevicesChange() {
        this.availableDevicesList.setData(this.availableDevices);
    }
    aboutToAppear(): void {
        if (this.controller) {
            this.controller.startBluetoothDiscovery();
        }
    }
    render() {
        Column.create();
        Row.create();
        Row.height(48);
        Row.width('100%');
        Blank.create();
        Blank.pop();
        If.create();
        // bluetooth discovering
        if (this.isDeviceDiscovering) {
            If.branchId(0);
        }
        If.pop();
        Row.pop();
        If.create();
        if (this.availableDevices && this.availableDevices.length >= 1) {
            If.branchId(0);
            List.create();
            List.height('100%');
            List.padding({ bottom: 90 });
            // paired devices list
            ForEach.create("5", this, ObservedObject.GetRawObject(this.availableDevices), (item: BluetoothDevice) => {
                ListItem.create();
                Row.create();
                Row.height(70);
                Row.width('100%');
                Row.borderColor('#ffe5e4e4');
                Row.borderWidth({ bottom: 2 });
                Row.onClick(() => {
                    Logger.info(this.TAG_PAGE + 'item on click');
                    if (this.controlPairing) {
                        this.pairDevice(item);
                    }
                    else {
                        return;
                    }
                });
                Column.create();
                Text.create(item.deviceId);
                Text.margin({ bottom: 10 });
                Text.pop();
                Text.create(item.deviceName);
                Text.margin({ bottom: 10 });
                Text.pop();
                Column.pop();
                Row.pop();
                ListItem.pop();
            }, item => JSON.stringify(item));
            // paired devices list
            ForEach.pop();
            List.pop();
        }
        else {
            If.branchId(1);
            // Scanning...
            Text.create("正在扫描。。。。");
            // Scanning...
            Text.fontSize($r('sys.float.ohos_id_text_size_body2'));
            // Scanning...
            Text.textCase(TextCase.UpperCase);
            // Scanning...
            Text.fontWeight(FontWeight.Medium);
            // Scanning...
            Text.fontColor($r("sys.color.ohos_id_color_primary"));
            // Scanning...
            Text.height(48);
            // Scanning...
            Text.pop();
        }
        If.pop();
        Column.pop();
    }
    /**
     * Get pair state text
     * @param device
     */
    getPairStateText(device: BluetoothDevice): string {
        return device.connectionState == 1 ? JSON.parse(JSON.stringify("正在配对…")) : '';
    }
    pinRequiredParamChange() {
        clearTimeout(pinRequiredTIimer);
        pinRequiredTIimer = setTimeout(() => {
            this.pairPinCode = this.pinRequiredParam.pinCode;
            this.pairingDevice = this.pairData;
            if (this.pairDialog) {
                this.pairDialog.open();
            }
            () => {
            };
        }, 1000);
    }
    /**
     * Pair device
     * @param device
     */
    pairDevice(device: BluetoothDevice) {
        this.controller.pair(device.deviceId);
    }
    /**
     * Confirm pairing
     */
    confirmPairing(accept: boolean) {
        Logger.info(this.TAG_PAGE + 'confirmPairing pairingDevice');
        try {
            if (this.pairingDevice && this.pairingDevice.deviceId != null) {
                this.controller.confirmPairing(this.pairingDevice.deviceId, accept);
            }
        }
        catch (err) {
            Logger.info(this.TAG_PAGE + `confirmPairing pairingDevice error ${err}`);
        }
    }
}
/**
 * AvailableDevicesDataSource For Lazy Loading
 */
class AvailableDevicesDataSource {
    private availableDevicesArray: BluetoothDevice[] = null;
    constructor(availableDevicesArray: BluetoothDevice[]) {
        this.availableDevicesArray = availableDevicesArray;
    }
    public setData(data: BluetoothDevice[]) {
        this.availableDevicesArray = data;
    }
    public totalCount(): number {
        if (this.availableDevicesArray) {
            return this.availableDevicesArray.length;
        }
        return 0;
    }
    public getData(index: number): BluetoothDevice {
        if (!this.availableDevicesArray) {
            Logger.info('array is null.');
            return null;
        }
        if (index < 0 || index >= this.totalCount()) {
            Logger.info('index out of range.');
            return null;
        }
        return this.availableDevicesArray[index];
    }
    public delData(device: BluetoothDevice): void {
        let index = this.availableDevicesArray.indexOf(device);
        this.availableDevicesArray.splice(index, 1);
    }
}
class PairDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.dialogController = undefined;
        this.action = undefined;
        this.deviceName = undefined;
        this.pinCode = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PairDialog_Params) {
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
        if (params.action !== undefined) {
            this.action = params.action;
        }
        if (params.deviceName !== undefined) {
            this.deviceName = params.deviceName;
        }
        if (params.pinCode !== undefined) {
            this.pinCode = params.pinCode;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private dialogController: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.dialogController = ctr;
    }
    private action: (accept: boolean) => void;
    private deviceName: string;
    private pinCode: string;
    aboutToAppear(): void {
        Logger.info(`bluetooth PairDialog aboutToAppear.`);
    }
    render() {
        Column.create();
        Column.width(deviceTypeInfo === 'phone' || deviceTypeInfo === 'default' ? '100%' : 500);
        Column.padding(deviceTypeInfo === 'phone' || deviceTypeInfo === 'default' ? { left: 12, right: 12 } : {});
        Text.create("要与" + this.deviceName + "配对吗?");
        Text.fontSize(15);
        Text.height(56);
        Text.width(200);
        Text.pop();
        Column.create();
        Column.width('100%');
        Column.padding({
            left: 24,
            right: 24
        });
        If.create();
        if (this.pinCode) {
            If.branchId(0);
            Text.create("蓝牙配对码");
            Text.pop();
            Text.create(`${this.pinCode}`);
            Text.fontSize(32);
            Text.fontWeight(500);
            Text.fontColor($r("sys.color.ohos_id_color_primary"));
            Text.width(100);
            Text.textAlign(TextAlign.Center);
            Text.margin({
                top: 6,
                bottom: 10
            });
            Text.pop();
        }
        else {
            If.branchId(1);
            Text.create(this.deviceName);
            Text.fontSize(16);
            Text.width(100);
            Text.fontWeight(FontWeight.Bold);
            Text.pop();
        }
        If.pop();
        // button
        Flex.create({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
        // button
        Flex.width(100);
        // button
        Flex.height(56);
        // button
        Flex.margin({ top: 10 });
        // button
        Flex.padding({ bottom: 16 });
        Text.create($r('app.string.cancel'));
        Text.fontSize(16);
        Text.fontColor('#007DFF');
        Text.fontWeight(500);
        Text.flexGrow(1);
        Text.onClick(() => {
            this.dialogController.close();
            this.action(false);
        });
        Text.pop();
        Divider.create();
        Divider.height(24);
        Divider.strokeWidth(0.5);
        Divider.vertical(true);
        Divider.color($r("sys.color.ohos_id_color_list_separator"));
        Text.create("配对");
        Text.fontSize(16);
        Text.fontColor('#007DFF');
        Text.fontWeight(500);
        Text.flexGrow(1);
        Text.onClick(() => {
            this.dialogController.close();
            this.action(true);
        });
        Text.pop();
        // button
        Flex.pop();
        Column.pop();
        Column.pop();
    }
}
/**
 * Pair mode prompt
 * @param dialogTitle Dialog title
 * @param dialogMessage Dialog message
 * @param buttonValue Dialog buttonValue
 */
function showDialog(dialogTitle: string | Resource, dialogMessage: string | Resource, buttonValue: string | Resource) {
    Logger.info('Bluetooth page showDialog in.');
    AlertDialog.show({
        title: dialogTitle,
        message: dialogMessage,
        confirm: {
            value: buttonValue,
            action: () => {
                Logger.info('Bluetooth page showDialog : Button-clicking callback');
            }
        },
        cancel: () => {
            Logger.info('Bluetooth page showDialog : Closed callbacks');
        }
    });
    Logger.info('Bluetooth page showDialog out.');
}
loadDocument(new Bluetooth("1", undefined, {}));
