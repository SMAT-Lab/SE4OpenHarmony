interface Index_Params {
    isOn?: boolean;
    deviceBleList?: Array<BleFoundInformation>;
    discoveryBleList?: Array<BleFoundInformation>;
    //蓝牙开标识
    enable?: any;
    //蓝牙关标识
    disable?: any;
    //扫描一次
    BLEScan?: number;
    BLEDevice?: any;
    BleOnflag?: boolean;
    intervalId?: number;
    handlerClickButton?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/* Copyright 2023 Unionman Technology Co., Ltd.
 *
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
 *
 */
import promptAction from '@ohos.promptAction';
import logger from '../Model/Logger';
import { TitleBar } from '../Commom/TitleBar';
import bluetoothManager from '@ohos.bluetoothManager';
import Bluetooth from './Bluetooth';
const TAG: string = 'UM_BLE Index';
export class BleFoundInformation {
    BleAddress: string = '';
    BleInfoName: string = '';
    BleRssi: number = 0;
    constructor() {
    }
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isOn = new ObservedPropertySimple(false
        // BLE配对设备列表
        , this, "isOn");
        this.__deviceBleList = new ObservedPropertyObject([]
        // BLE设备发现列表
        , this, "deviceBleList");
        this.__discoveryBleList = new ObservedPropertyObject([]
        //蓝牙开标识
        , this, "discoveryBleList");
        this.enable = false;
        this.disable = false;
        this.BLEScan = 1;
        this.BLEDevice = undefined;
        this.BleOnflag = true;
        this.intervalId = -1;
        this.handlerClickButton = () => {
            globalThis.abilityContext.terminateSelf();
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.isOn !== undefined) {
            this.isOn = params.isOn;
        }
        if (params.deviceBleList !== undefined) {
            this.deviceBleList = params.deviceBleList;
        }
        if (params.discoveryBleList !== undefined) {
            this.discoveryBleList = params.discoveryBleList;
        }
        if (params.enable !== undefined) {
            this.enable = params.enable;
        }
        if (params.disable !== undefined) {
            this.disable = params.disable;
        }
        if (params.BLEScan !== undefined) {
            this.BLEScan = params.BLEScan;
        }
        if (params.BLEDevice !== undefined) {
            this.BLEDevice = params.BLEDevice;
        }
        if (params.BleOnflag !== undefined) {
            this.BleOnflag = params.BleOnflag;
        }
        if (params.intervalId !== undefined) {
            this.intervalId = params.intervalId;
        }
        if (params.handlerClickButton !== undefined) {
            this.handlerClickButton = params.handlerClickButton;
        }
    }
    aboutToBeDeleted() {
        this.__isOn.aboutToBeDeleted();
        this.__deviceBleList.aboutToBeDeleted();
        this.__discoveryBleList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 蓝牙开关标识位
    private __isOn: ObservedPropertySimple<boolean>;
    get isOn() {
        return this.__isOn.get();
    }
    set isOn(newValue: boolean) {
        this.__isOn.set(newValue);
    }
    // BLE配对设备列表
    private __deviceBleList: ObservedPropertyObject<Array<BleFoundInformation>>;
    get deviceBleList() {
        return this.__deviceBleList.get();
    }
    set deviceBleList(newValue: Array<BleFoundInformation>) {
        this.__deviceBleList.set(newValue);
    }
    // BLE设备发现列表
    private __discoveryBleList: ObservedPropertyObject<Array<BleFoundInformation>>;
    get discoveryBleList() {
        return this.__discoveryBleList.get();
    }
    set discoveryBleList(newValue: Array<BleFoundInformation>) {
        this.__discoveryBleList.set(newValue);
    }
    //蓝牙开标识
    private enable: any;
    //蓝牙关标识
    private disable: any;
    //扫描一次
    private BLEScan: number;
    private BLEDevice: any;
    private BleOnflag: boolean;
    private intervalId: number;
    private handlerClickButton;
    // 搜索BLE蓝牙设备
    foundDevices() {
        // BLE设备发现上报事件，data为蓝牙设备集合
        bluetoothManager.BLE.on('BLEDeviceFind', (data) => {
            logger.info(TAG, `Begin to start foundDevices`);
            if (data !== null && data.length > 0) {
                // if (this.discoveryBleList.indexOf(data[0]) === -1) {
                let BleTmpInfo: BleFoundInformation = new BleFoundInformation();
                BleTmpInfo.BleAddress = data[0].deviceId;
                // 读取广播包，解析广播包，得到设备名字，并存入设备列表
                var i = 0;
                var x = data[0].data[i];
                var y = data[0].data[i + 1];
                while (y != 0x09 && i + x + 2 < data[0].data.byteLength) {
                    i = i + x + 1;
                    x = data[0].data[i];
                    y = data[0].data[i + 1];
                }
                let arr = data[0].data.slice(i + 2, i + x + 1);
                var BLEName = "";
                for (let j = 0; j < arr.byteLength; j++) {
                    BLEName += String.fromCharCode(arr[j]);
                }
                logger.info(TAG, `BLEName = ` + JSON.stringify(BLEName));
                BleTmpInfo.BleInfoName = BLEName;
                BleTmpInfo.BleRssi = data[0].rssi;
                //将发现的设备存入discoveryBleList
                this.discoveryBleList.push(BleTmpInfo);
                logger.info(TAG, ` BleTmpInfo Address ` + JSON.stringify(BleTmpInfo.BleAddress));
                logger.info(TAG, ` BleTmpInfo BleInfoName ` + JSON.stringify(BleTmpInfo.BleInfoName));
                logger.info(TAG, ` BleTmpInfo BleRssi ` + JSON.stringify(BleTmpInfo.BleRssi));
                logger.info(TAG, ` discoveryBleList ` + JSON.stringify(this.discoveryBleList));
                // }
            }
        });
        // 设置蓝牙BLE扫描模式（根据名字扫描）
        bluetoothManager.BLE.startBLEScan([{
                deviceId: "C0:00:00:03:EE:FE",
            }], {
            interval: 7000,
            dutyMode: bluetoothManager.ScanDuty.SCAN_MODE_LOW_POWER,
            matchMode: bluetoothManager.MatchMode.MATCH_MODE_AGGRESSIVE,
        });
    }
    async aboutToAppear() {
        // 获取蓝牙状态
        let state = bluetoothManager.getState();
        // 蓝牙打开，搜索附件蓝牙设备
        if (state === bluetoothManager.BluetoothState.STATE_ON) {
            this.isOn = true;
            this.foundDevices();
        }
        if (state === bluetoothManager.BluetoothState.STATE_OFF) {
            this.isOn = false;
        }
        // 重复调用,更新蓝牙设备列表
        this.intervalId = setInterval(() => {
            this.discoveryBleList = [];
        }, 7000);
    }
    initBluetooth() {
        // 打开蓝牙
        bluetoothManager.on('stateChange', (data) => {
            logger.info(TAG, `enter on stateChange`);
            if (data === bluetoothManager.BluetoothState.STATE_ON) {
                this.foundDevices();
                logger.info(TAG, ` enter BluetoothState.STATE_ON`);
            }
            if (data === bluetoothManager.BluetoothState.STATE_OFF) {
                logger.info(TAG, ` enter BluetoothState.STATE_OFF`);
                this.discoveryBleList = [];
            }
            logger.info(TAG, ` BluetoothState = ${JSON.stringify(data)}`);
        });
        bluetoothManager.enableBluetooth();
    }
    render() {
        Column.create();
        let earlierCreatedChild_2: TitleBar = (this && this.findChildById) ? this.findChildById("2") as TitleBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TitleBar("2", this, { handlerClickButton: this.handlerClickButton }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                handlerClickButton: this.handlerClickButton
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Scroll.create();
        Scroll.constraintSize({ maxHeight: '85%' });
        Column.create();
        Row.create();
        Row.width('90%');
        Column.create();
        Text.create($r('app.string.bluetooth'));
        Text.fontSize(30);
        Text.margin({ top: 20 });
        Text.alignSelf(ItemAlign.Start);
        Text.pop();
        If.create();
        if (true == this.isOn) {
            If.branchId(0);
            Text.create($r('app.string.discovery'));
            Text.fontSize(20);
            Text.alignSelf(ItemAlign.Start);
            Text.pop();
        }
        If.pop();
        Column.pop();
        Blank.create();
        Blank.pop();
        Column.create();
        Toggle.create({ type: ToggleType.Switch, isOn: this.isOn });
        Toggle.selectedColor('#ff2982ea');
        Toggle.key('toggleBtn');
        Toggle.onChange((isOn: boolean) => {
            if (isOn) {
                this.isOn = true;
                this.initBluetooth();
            }
            else {
                this.isOn = false;
                bluetoothManager.BLE.off('BLEDeviceFind', () => {
                    logger.info(TAG, "取消BLE设备发现订阅！");
                });
                bluetoothManager.BLE.stopBLEScan();
                bluetoothManager.disableBluetooth();
                this.discoveryBleList = [];
                if (this.disable == true) {
                    promptAction.showToast({
                        message: 'Close bluetooth  ' + this.disable,
                        duration: 2000,
                    });
                }
            }
        });
        Toggle.pop();
        Column.pop();
        Row.pop();
        If.create();
        if (this.isOn) {
            If.branchId(0);
            Divider.create();
            Divider.vertical(false);
            Divider.strokeWidth(10);
            Divider.color('#ffece7e7');
            Divider.lineCap(LineCapStyle.Butt);
            Divider.margin('1%');
            Divider.create();
            Divider.vertical(false);
            Divider.strokeWidth(10);
            Divider.color('#ffece7e7');
            Divider.lineCap(LineCapStyle.Butt);
            Divider.margin('1%');
            Text.create("BLE配对设备列表");
            Text.fontSize(25);
            Text.fontColor('#ff565555');
            Text.margin({ left: '5%', bottom: '2%' });
            Text.alignSelf(ItemAlign.Start);
            Text.pop();
            ForEach.create("3", this, ObservedObject.GetRawObject(this.deviceBleList), (item) => {
                Row.create();
                Row.alignSelf(ItemAlign.Start);
                Row.width('100%');
                Row.height(50);
                Row.margin({ left: '5%', top: '1%' });
                Text.create("配对设备名字: " + item.BleInfoName);
                Text.fontSize(20);
                Text.pop();
                Text.create("配对设备MAC: " + item.BleAddress);
                Text.fontSize(20);
                Text.pop();
                Button.createWithLabel("断开");
                Button.alignSelf(ItemAlign.Center);
                Button.onClick(() => {
                    AlertDialog.show({
                        title: $r('app.string.disconnect'),
                        message: '此操作将会断开该设备的连接',
                        primaryButton: {
                            value: $r('app.string.cancel'),
                            action: () => {
                            }
                        },
                        secondaryButton: {
                            value: $r('app.string.confirm'),
                            action: () => {
                                let BLEdisConnect = this.BLEDevice.disconnect();
                                if (BLEdisConnect) {
                                    logger.info(`connectState BLEdisConnect = ${JSON.stringify(BLEdisConnect)},断开连接`);
                                    this.deviceBleList.pop();
                                }
                            }
                        }
                    });
                });
                Button.pop();
                Row.pop();
                Divider.create();
                Divider.vertical(false);
                Divider.color('#ffece7e7');
                Divider.lineCap(LineCapStyle.Butt);
                Divider.margin('1%');
            });
            ForEach.pop();
            Divider.create();
            Divider.vertical(false);
            Divider.strokeWidth(10);
            Divider.color('#ffece7e7');
            Divider.lineCap(LineCapStyle.Butt);
            Divider.margin('1%');
            Text.create("BLE设备列表");
            Text.fontSize(25);
            Text.fontColor('#ff565555');
            Text.margin({ left: '5%', bottom: '2%' });
            Text.alignSelf(ItemAlign.Start);
            Text.pop();
            ForEach.create("4", this, ObservedObject.GetRawObject(this.discoveryBleList), (item) => {
                Row.create();
                Row.alignSelf(ItemAlign.Start);
                Row.width('100%');
                Row.height(50);
                Row.margin({ left: '5%', top: '1%' });
                Button.createWithLabel("连接");
                Button.alignSelf(ItemAlign.Center);
                Button.onClick(() => {
                    //订阅BEL状态变化
                    if (this.BleOnflag) {
                        //只创建一个GattClient对象
                        this.BleOnflag = false;
                        this.BLEDevice = bluetoothManager.BLE.createGattClientDevice(item.BleAddress);
                        let deviceName = this.BLEDevice.getDeviceName((err, data) => {
                            logger.info(TAG, ' device name err ' + JSON.stringify(err));
                            logger.info(TAG, ' device name' + JSON.stringify(data));
                        });
                        this.BLEDevice.on('BLEConnectionStateChange', (data) => {
                            logger.info(TAG, 'bluetooth connectState state changed');
                            let connectState = data.state;
                            if (connectState === 0) {
                                logger.info(TAG, `connectState = ${JSON.stringify(connectState)},断开连接`);
                                promptAction.showToast({
                                    message: '断开连接',
                                    duration: 2000,
                                });
                                this.deviceBleList.pop();
                            }
                            else if (connectState == 2) {
                                logger.info(TAG, `connectState = ${JSON.stringify(connectState)},连接成功`);
                                promptAction.showToast({
                                    message: '连接成功',
                                    duration: 2000,
                                });
                                // 添加连接成功的设备
                                this.deviceBleList.push(item);
                                // 订阅获取设备的服务
                                Bluetooth.getServices();
                            }
                            else if (connectState == 1) {
                                logger.info(TAG, `connectState = ${JSON.stringify(connectState)},正在连接`);
                            }
                            else {
                                logger.info(TAG, `connectState = ${JSON.stringify(connectState)},正在断连`);
                            }
                            logger.info(TAG, `connectState = ${JSON.stringify(connectState)}`);
                        });
                    }
                    // 连接蓝牙
                    this.BLEDevice.connect();
                });
                Button.pop();
                Text.create(" Name: " + item.BleInfoName);
                Text.fontSize(20);
                Text.pop();
                Text.create(" MAC: " + item.BleAddress);
                Text.fontSize(20);
                Text.pop();
                Text.create(" Rssi: " + item.BleRssi);
                Text.fontSize(20);
                Text.pop();
                Row.pop();
                Divider.create();
                Divider.vertical(false);
                Divider.color('#ffece7e7');
                Divider.lineCap(LineCapStyle.Butt);
                Divider.margin('1%');
            });
            ForEach.pop();
            Divider.create();
            Divider.vertical(false);
            Divider.strokeWidth(10);
            Divider.color('#ffece7e7');
            Divider.lineCap(LineCapStyle.Butt);
            Divider.margin('1%');
        }
        If.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
