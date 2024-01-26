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
import { TitleBar } from '../../common/TitleBar'


const PAIRED_ITEM_NUMBER = 3;
const PAGE_URI_DEVICE_NAME = 'pages/deviceName';
const PAGE_URI_BLUETOOTH_PAIRED_DEVICE_INFO = 'pages/bluetoothPairedDeviceInfo';
const deviceTypeInfo = deviceInfo.deviceType;
let pinRequiredTIimer = null;

@Entry
@Component
export struct Bluetooth {
  private PAGE_TAG = 'Bluetooth page ';
  private deviceController: BluetoothDeviceController = new BluetoothDeviceController();
  @StorageLink('bluetoothIsOn') isOn: boolean = false;
  @StorageLink('bluetoothToggleEnabled') isEnabled: boolean = true;
  @StorageLink('bluetoothLocalName') localName: string = '';

  aboutToAppear(): void {
    Logger.info(this.PAGE_TAG + 'aboutToAppear in : isOn = ' + this.isOn)
    this.deviceController
      .initData()
      .subscribe();
    Logger.info(this.PAGE_TAG + 'aboutToAppear out : isOn = ' + this.isOn)
  }

  onPageShow(): void {
    Logger.info(this.PAGE_TAG + 'onPageShow in : localName = ' + this.localName)
    Logger.info(this.PAGE_TAG + 'onPageShow out : localName = ' + this.localName)
  }

  aboutToDisappear(): void {
    this.deviceController.unsubscribe();
  }

  build() {
    Column() {
      TitleBar({ title: '蓝牙测试' })
      GridContainer({ gutter: 24, margin: 24 }) {
        Column() {

          Row() {
            Text("蓝牙")
              .fontColor($r('sys.color.ohos_fa_text_primary'))
              .fontSize(16)
              .fontWeight(FontWeight.Medium)

            Blank()

            Toggle({ type: ToggleType.Switch, isOn: this.isOn })
              .width('36vp')
              .height('20vp')
              .selectedColor('#007DFF')
              .margin({ left: 6 })
              .onChange((isOn: boolean) => {
                Logger.info(this.PAGE_TAG + 'Toggle onClick: isOn = ' + isOn + ', enabled = ' + this.isEnabled)
                if (!this.isEnabled) return;
                this.deviceController.toggleValue(isOn);
              });
          }
          .margin({ top: 8 })
          .width('100%')
          .height(56)
          .borderRadius(28)
          .padding({ left: 12, right: 6 })
          .alignItems(VerticalAlign.Center)
          .borderRadius(24)

          Scroll() {
            Column() {

              if (this.isOn) {
                AvailableDeviceComponent({
                  controller: this.deviceController,
                })
              }
            }
            .width('100%')
          }
          .scrollBarWidth(0)
          .width('100%')
          .align(Alignment.TopStart)
          .layoutWeight(1)
        }
        .useSizeType({
          sm: { span: 4, offset: 0 },
          md: { span: 6, offset: 1 },
          lg: { span: 8, offset: 2 }
        });
      }
      .width('100%')
      .height('100%');
    }
    .backgroundColor($r("sys.color.ohos_id_color_sub_background"))
    .width('100%')
    .height('100%');
  }
}


/**
 * Paired device component
 */
@Component
struct PairedDeviceComponent {
  private TAG_PAGE = 'PairedDeviceComponent ';
  private controller: BluetoothDeviceController;
  @StorageLink('bluetoothPairedDevices') pairedDevices: BluetoothDevice[] = [];
  @State isTouched: boolean = false;
  @State hide: boolean = true;

  aboutToAppear(): void {

  }

  build() {
    Column() {
      if (this.pairedDevices && this.pairedDevices.length > 0) {
        // paired devices title
        Row() {
          Text("已配对的设备")
            .width('100%')
            .fontSize(14)
            .fontWeight(FontWeight.Medium)
            .fontColor($r('sys.color.ohos_id_color_text_secondary'))
        }
        .width('100%')
        .padding({
          left: 12,
          top: 19,
          bottom: 5
        })

        List() {
          // paired devices list
          ForEach(this.pairedDevices, (item: BluetoothDevice, index: number) => {

            if (index < PAIRED_ITEM_NUMBER || !this.hide) {
              ListItem() {
                Row() {
                  Text(item.deviceId)
                }
                .width('100%')
                .borderRadius(24)
                .onClick(() => {
                  this.itemClicked(item);
                })
              }
            }

            if ((this.hide && index === PAIRED_ITEM_NUMBER) || //more
            (!this.hide && index >= PAIRED_ITEM_NUMBER && index == this.pairedDevices.length - 1)) { //put_away
              ListItem() {
                Stack({ alignContent: Alignment.Center }) {
                  Stack({ alignContent: Alignment.Center }) {

                  }
                  .width('100%')
                  .height(48)
                  .borderRadius(20)
                  .onTouch((event: TouchEvent) => {
                    if (event.type === TouchType.Down) {
                      this.isTouched = true;
                    }
                    if (event.type === TouchType.Up) {
                      this.isTouched = false;
                    }
                  })
                  .onClick(() => {
                    this.hide = !this.hide;
                  })
                }
                .height(48)
                .backgroundColor($r("sys.color.ohos_id_color_foreground_contrary"))
              }
            }
          }, item => JSON.stringify(item));
        }
        .padding(4)
        .borderRadius(24)
      }
    }
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
        } else {
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
    return item.deviceType === DeviceType.HEADPHONE && item.connectionState === ProfileConnectionState.STATE_CONNECTED
  }

  /**
   * Goto paired device Info
   * @param item device
   */
  private gotoPairedDeviceInfo(item: BluetoothDevice) {
    if (item.connectionState != 1
    && item.connectionState != 3) {
      Logger.info(this.TAG_PAGE + 'item right icon on click.');
      let param = { 'bluetoothDevice': JSON.stringify(item) }
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
          this.controller.disconnect(item.deviceId)
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
    })
  }
}


/**
 * Available device component
 */
@Component
struct AvailableDeviceComponent {
  private TAG_PAGE = 'AvailableDeviceComponent ';
  private controller: BluetoothDeviceController;
  @State isDeviceDiscovering: boolean = false;
  @StorageLink('bluetoothAvailableDevices') @Watch("availableDevicesChange") availableDevices: BluetoothDevice[] = [];
  @State availableDevicesList: AvailableDevicesDataSource = new AvailableDevicesDataSource(this.availableDevices);
  @State pairPinCode: string = '';
  private pairingDevice: BluetoothDevice = undefined;
  @StorageLink("controlPairing") controlPairing: boolean = true;
  @StorageLink("pairData") pairData: BluetoothDevice = null;
  @StorageLink("pinRequiredParam") @Watch("pinRequiredParamChange") pinRequiredParam: {
    deviceId: string;
    pinCode: string
  } = { deviceId: '', pinCode: '' };
  pairDialog: CustomDialogController = new CustomDialogController({
    builder: PairDialog({
      deviceName: (this.pairingDevice && this.pairingDevice.hasOwnProperty('deviceName')) ? this.pairingDevice.deviceName : undefined,
      pinCode: this.pairPinCode,
      action: (accept: boolean) => {
        this.confirmPairing(accept);
      }
    }),
    alignment: deviceTypeInfo === 'phone' || deviceTypeInfo === 'default' ? DialogAlignment.Bottom : DialogAlignment.Center,
    offset: ({ dx: 0, dy: deviceTypeInfo === 'phone' || deviceTypeInfo === 'default' ? '-24dp' : 0 }),
    autoCancel: true,
  });

  availableDevicesChange() {
    this.availableDevicesList.setData(this.availableDevices)
  }

  aboutToAppear(): void {
    if (this.controller) {


      this.controller.startBluetoothDiscovery();
    }
  }

  build() {
    Column() {
      Row() {

        Blank()

        // bluetooth discovering
        if (this.isDeviceDiscovering) {
        }
      }
      .height(48)
      .width('100%')

      if (this.availableDevices && this.availableDevices.length >= 1) {

        List() {
          // paired devices list
          ForEach(this.availableDevices, (item: BluetoothDevice) => {
            ListItem() {
              Row() {
                Column() {
                  Text(item.deviceId)
                    .margin({ bottom: 10 })
                  Text(item.deviceName)
                    .margin({ bottom: 10 })
                }
              }
              .height(70)
              .width('100%')
              .borderColor('#ffe5e4e4')
              .borderWidth({ bottom: 2 })
              .onClick(() => {
                Logger.info(this.TAG_PAGE + 'item on click');
                if (this.controlPairing) {
                  this.pairDevice(item);
                } else {
                  return;
                }
              })
            }
          }, item => JSON.stringify(item));
        }
        .height('100%')
        .padding({ bottom: 90 })
      } else {
        // Scanning...
        Text("正在扫描。。。。")
          .fontSize($r('sys.float.ohos_id_text_size_body2'))
          .textCase(TextCase.UpperCase)
          .fontWeight(FontWeight.Medium)
          .fontColor($r("sys.color.ohos_id_color_primary"))
          .height(48)
      }
    }
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
      }
    }, 1000)
  }
  /**
   * Pair device
   * @param device
   */
  pairDevice(device: BluetoothDevice) {
    this.controller.pair(device.deviceId)
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
    } catch (err) {
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
    this.availableDevicesArray.splice(index, 1)
  }
}

/**
 * Pair dialog
 */
@CustomDialog
struct PairDialog {
  dialogController: CustomDialogController;
  action: (accept: boolean) => void;
  private deviceName: string = undefined;
  private pinCode: string;

  aboutToAppear(): void {
    Logger.info(`bluetooth PairDialog aboutToAppear.`)
  }

  build() {
    Column() {
      Text("要与" + this.deviceName + "配对吗?")
        .fontSize(15)
        .height(56)
        .width(200)
      Column() {
        if (this.pinCode) {
          Text("蓝牙配对码")
          Text(`${this.pinCode}`)
            .fontSize(32)
            .fontWeight(500)
            .fontColor($r("sys.color.ohos_id_color_primary"))
            .width(100)
            .textAlign(TextAlign.Center)
            .margin({
              top: 6,
              bottom: 10
            })
        } else {

          Text(this.deviceName)
            .fontSize(16)
            .width(100)
            .fontWeight(FontWeight.Bold)
        }

        // button
        Flex({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center }) {
          Text($r('app.string.cancel'))
            .fontSize(16)
            .fontColor('#007DFF')
            .fontWeight(500)
            .flexGrow(1)
            .onClick(() => {
              this.dialogController.close();
              this.action(false);
            })

          Divider()
            .height(24)
            .strokeWidth(0.5)
            .vertical(true)
            .color($r("sys.color.ohos_id_color_list_separator"))

          Text("配对")
            .fontSize(16)
            .fontColor('#007DFF')
            .fontWeight(500)
            .flexGrow(1)
            .onClick(() => {
              this.dialogController.close();
              this.action(true);
            })

        }
        .width(100)
        .height(56)
        .margin({ top: 10 })
        .padding({ bottom: 16 })
      }
      .width('100%')
      .padding({
        left: 24,
        right: 24
      })
    }
    .width(deviceTypeInfo === 'phone' || deviceTypeInfo === 'default' ? '100%' : 500)
    .padding(deviceTypeInfo === 'phone' || deviceTypeInfo === 'default' ? { left: 12, right: 12 } : {})
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
  })

  Logger.info('Bluetooth page showDialog out.');
}