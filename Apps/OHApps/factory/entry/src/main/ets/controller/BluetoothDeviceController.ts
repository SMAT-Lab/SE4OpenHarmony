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

import deviceInfo from '@ohos.deviceInfo';
import BluetoothModel, { BondState, ProfileConnectionState } from '../Model/BluetoothModel';
import BluetoothDevice from '../Model/BluetoothDevice';
import Logger from '../Model/Logger';
import settings from '@ohos.settings';


const deviceTypeInfo = deviceInfo.deviceType;
const DISCOVERY_DURING_TIME: number = 30000; // 30'
const DISCOVERY_INTERVAL_TIME: number = 3000; // 3'
let debounceTimer = null;

export default class BluetoothDeviceController {
  private TAG =  'BluetoothDeviceController '

  //state
  private isOn: boolean = false;
  private enabled: boolean = false;

  // paired devices
  private pairedDevices: BluetoothDevice[] = [];

  // available devices
  private isDeviceDiscovering: boolean = false;
  private availableDevices: BluetoothDevice[] = [];
  private pairPinCode: string = '';
  private discoveryStartTimeoutId: number;
  private discoveryStopTimeoutId: number;



  initData(){
     Logger.info(this.TAG + 'start to initData bluetooth');
    let isOn = BluetoothModel.isStateOn();
     Logger.info(this.TAG + 'initData bluetooth state isOn ' + isOn + ', typeof isOn = ' + typeof (isOn))
    if (isOn) {
      this.refreshPairedDevices();
    }

     Logger.info(this.TAG + 'initData save value to app storage. ')
    this.isOn = new Boolean(isOn).valueOf()
    this.enabled = true

    AppStorage.SetOrCreate('bluetoothIsOn', this.isOn);
    AppStorage.SetOrCreate('bluetoothToggleEnabled', this.enabled);
    AppStorage.SetOrCreate('bluetoothAvailableDevices', this.availableDevices);

    return this;
  }

  subscribe() {
     Logger.info(this.TAG + 'subscribe bluetooth state isOn ' + this.isOn)
    this.subscribeStateChange();
    this.subscribeBluetoothDeviceFind();
    this.subscribeBondStateChange();
    this.subscribeDeviceConnectStateChange();
    BluetoothModel.subscribePinRequired((pinRequiredParam: {
      deviceId: string;
      pinCode: string;
    }) => {
       Logger.info(this.TAG + 'bluetooth subscribePinRequired callback. pinRequiredParam = ' + pinRequiredParam.pinCode);
      let pairData = this.getAvailableDevice(pinRequiredParam.deviceId);
      this.pairPinCode = pinRequiredParam.pinCode;
      AppStorage.SetOrCreate('pairData', pairData);
      AppStorage.SetOrCreate('pinRequiredParam', pinRequiredParam);
    })
    return this;
  }

  unsubscribe(){
     Logger.info(this.TAG + 'start to unsubscribe bluetooth');
    this.stopBluetoothDiscovery();

    if (this.discoveryStartTimeoutId) {
      clearTimeout(this.discoveryStartTimeoutId);
    }

    if (this.discoveryStopTimeoutId) {
      clearTimeout(this.discoveryStopTimeoutId);
    }

    BluetoothModel.unsubscribeBluetoothDeviceFind();
    BluetoothModel.unsubscribeBondStateChange();
    BluetoothModel.unsubscribeDeviceStateChange();
    AppStorage.Delete('BluetoothFailedDialogFlag');
    return this;
  }

  /**
   * Set toggle value
   */
  toggleValue(isOn: boolean) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      let curState = BluetoothModel.getState();
      if ((curState === 2) === isOn) {
        return;
      }
      this.enabled = false
      AppStorage.SetOrCreate('bluetoothToggleEnabled', this.enabled);
       Logger.info(this.TAG + 'afterCurrentValueChanged bluetooth state isOn = ' + this.isOn)
      if (isOn) {
        BluetoothModel.enableBluetooth();
      } else {
        BluetoothModel.disableBluetooth();
        // remove all elements from availableDevices array
        this.availableDevices.splice(0, this.availableDevices.length)
      }
    },500)
  }


  /**
   * Pair device.
   *
   * @param deviceId device id
   * @param success success callback
   * @param error error callback
   */
  pair(deviceId: string, success?: (pinCode: string) => void, error?: () => void): void {
    const device: BluetoothDevice = this.getAvailableDevice(deviceId);
    if (device && device.connectionState === BondState.BOND_STATE_BONDING) {
       Logger.info(this.TAG + `bluetooth no Aavailable device or device is already pairing.`)
      return;
    }
    // start pairing
     BluetoothModel.pairDevice(deviceId);
  }

  /**
   * Confirm pairing.
   *
   * @param deviceId device id
   * @param accept accept or not
   * @param success success callback
   * @param error error callback
   */
  confirmPairing(deviceId: string, accept: boolean): void {
    if (accept) {
      try {
        this.getAvailableDevice(deviceId).connectionState = BondState.BOND_STATE_BONDING;
      } catch (err) {
         Logger.error(this.TAG + 'confirmPairing =' + JSON.stringify(err));
      }
    }
    // set paring confirmation
    BluetoothModel.setDevicePairingConfirmation(deviceId, accept);

  }

  /**
   * Connect device.
   * @param deviceId device id
   */
  connect(deviceId: string): Array<{
    profileId: number;
    connectRet: boolean;
  }> {
    return BluetoothModel.connectDevice(deviceId);
  }

  /**
   * disconnect device.
   * @param deviceId device id
   */
  disconnect(deviceId: string): Array<{
    profileId: number;
    disconnectRet: boolean;
  }> {
    return BluetoothModel.disconnectDevice(deviceId);
  }

  /**
   * Unpair device.
   * @param deviceId device id
   */
  unpair(deviceId: string): boolean {
    AppStorage.SetOrCreate('BluetoothFailedDialogFlag', false);
    const result = BluetoothModel.unpairDevice(deviceId);
     Logger.info(this.TAG + 'bluetooth paired device unpair. result = ' + result)
    this.refreshPairedDevices()
    return result;
  }

  /**
   * Refresh paired devices.
   */
  refreshPairedDevices() {
    let deviceIds: string[] = BluetoothModel.getPairedDeviceIds();
    let list: BluetoothDevice[] = []
    deviceIds.forEach(deviceId => {
      list.push(this.getDevice(deviceId));
    });
    this.pairedDevices = list;
    this.sortPairedDevices();
    AppStorage.SetOrCreate('bluetoothPairedDevices', this.pairedDevices);
     Logger.info(this.TAG + 'bluetooth paired devices. list length = ' + JSON.stringify(list.length))
  }

  /**
   * Paired device should be shown on top of the list.
   */
  private sortPairedDevices() {
     Logger.info(this.TAG + 'sortPairedDevices in.')
    this.pairedDevices.sort((a: BluetoothDevice, b: BluetoothDevice) => {
      if (a.connectionState == ProfileConnectionState.STATE_DISCONNECTED && b.connectionState == ProfileConnectionState.STATE_DISCONNECTED) {
        return 0
      } else if (b.connectionState == ProfileConnectionState.STATE_DISCONNECTED) {
        return -1
      } else if (a.connectionState == ProfileConnectionState.STATE_DISCONNECTED) {
        return 1
      } else {
        return 0
      }
    })
     Logger.info(this.TAG + 'sortPairedDevices out.')
  }

  //---------------------- subscribe ----------------------
  /**
   * Subscribe bluetooth state change
   */
  private subscribeStateChange() {
    BluetoothModel.subscribeStateChange((isOn: boolean) => {
       Logger.info(this.TAG + 'bluetooth state changed. isOn = ' + isOn)
      this.isOn = new Boolean(isOn).valueOf();
      this.enabled = true;

       Logger.info(this.TAG + 'bluetooth state changed. save value.')
      AppStorage.SetOrCreate('bluetoothIsOn', this.isOn);
      AppStorage.SetOrCreate('bluetoothToggleEnabled', this.enabled);

      if (isOn) {
         Logger.info(this.TAG + 'bluetooth state changed. unsubscribe')
        this.startBluetoothDiscovery();
      } else {
         Logger.info(this.TAG + 'bluetooth state changed. subscribe')
        this.mStopBluetoothDiscovery();
      }
    });
  }

  /**
   * Subscribe device find
   */
  private subscribeBluetoothDeviceFind() {
    BluetoothModel.subscribeBluetoothDeviceFind((deviceIds: Array<string>) => {
       Logger.info( this.TAG + 'available bluetooth devices changed.');

      deviceIds?.forEach(deviceId => {
        let device = this.availableDevices.find((availableDevice) => {
          return availableDevice.deviceId === deviceId
        })
         Logger.info(this.TAG + 'available bluetooth find');
        if (!device) {
          let pairedDevice = this.pairedDevices.find((pairedDevice) => {
            return pairedDevice.deviceId === deviceId
          })
          if (pairedDevice) {
             Logger.info(this.TAG + `available bluetooth is paried.`);
          } else {
             Logger.info(this.TAG + 'available bluetooth new device found. availableDevices length = ' + this.availableDevices.length);
            let newDevice = this.getDevice(deviceId);
            this.availableDevices.push(newDevice);
             Logger.info(this.TAG + 'available bluetooth new device pushed. availableDevices length = ' + this.availableDevices.length);
          }
        }
      })
      AppStorage.SetOrCreate('bluetoothAvailableDevices', this.availableDevices);
    });
  }

  /**
   * Subscribe bond state change
   */
  private subscribeBondStateChange() {
    BluetoothModel.subscribeBondStateChange((data: {
      deviceId: string;
      bondState: number;
    }) => {
       Logger.info(this.TAG + "data.bondState" + JSON.stringify(data.bondState))
      //paired devices
      if (data.bondState !== BondState.BOND_STATE_BONDING) {
        AppStorage.SetOrCreate("controlPairing", true)
        this.refreshPairedDevices();
      }

      //available devices
      if (data.bondState == BondState.BOND_STATE_BONDING) {
        AppStorage.SetOrCreate("controlPairing", false)
        // case bonding
        // do nothing and still listening
         Logger.info(this.TAG + 'bluetooth continue listening bondStateChange.');
        if (this.getAvailableDevice(data.deviceId) != null) {
          this.getAvailableDevice(data.deviceId).connectionState = ProfileConnectionState.STATE_CONNECTING;
        }

      } else if (data.bondState == BondState.BOND_STATE_INVALID) {
        AppStorage.SetOrCreate("controlPairing", true)
        // case failed
        if (this.getAvailableDevice(data.deviceId) != null) {
          this.getAvailableDevice(data.deviceId).connectionState = ProfileConnectionState.STATE_DISCONNECTED;
        }
        this.forceRefresh(this.availableDevices);
        AppStorage.SetOrCreate('bluetoothAvailableDevices', this.availableDevices);
        let showFlag = AppStorage.Get('BluetoothFailedDialogFlag');
        if (showFlag == false) {
          AppStorage.SetOrCreate('BluetoothFailedDialogFlag', true);
          return;
        }
      } else if (data.bondState == BondState.BOND_STATE_BONDED) {
        // case success
         Logger.info(this.TAG + 'bluetooth bonded : remove device.');
        this.removeAvailableDevice(data.deviceId);
        BluetoothModel.connectDevice(data.deviceId);
      }

    });
  }

  /**
   * Subscribe device connect state change
   */
  private subscribeDeviceConnectStateChange() {
    BluetoothModel.subscribeDeviceStateChange((data: {
      profileId: number;
      deviceId: string;
      profileConnectionState: number;
    }) => {
       Logger.info(this.TAG + 'device connection state changed. profileId:' + JSON.stringify(data.profileId)
      + ' profileConnectionState: ' + JSON.stringify(data.profileConnectionState));
      for (let device of this.pairedDevices) {
        if (device.deviceId === data.deviceId) {
          device.setProfile(data);
          this.sortPairedDevices();
          AppStorage.SetOrCreate('bluetoothPairedDevices', this.pairedDevices);
          break;
        }
      };
       Logger.info(this.TAG + 'device connection state changed. pairedDevices length = '
      + JSON.stringify(this.pairedDevices.length))
       Logger.info(this.TAG + 'device connection state changed. availableDevices length = '
      + JSON.stringify(this.availableDevices.length))
      this.removeAvailableDevice(data.deviceId);
    });
  }

  //---------------------- private ----------------------
  /**
   * Get device by device id.
   * @param deviceId device id
   */
  protected getDevice(deviceId: string): BluetoothDevice {
    let device = new BluetoothDevice();
    device.deviceId = deviceId;
    device.deviceName = BluetoothModel.getDeviceName(deviceId);
    device.deviceType = BluetoothModel.getDeviceType(deviceId);
    device.setProfiles(BluetoothModel.getDeviceState(deviceId));
    return device;
  }

  /**
     * Force refresh array.
     * Note: the purpose of this function is just trying to fix page (ets) level's bug below,
     *   and should be useless if fixed by the future sdk.
     * Bug Details:
     *   @State is not supported well for Array<CustomClass> type.
     *   In the case that the array item's field value changed, while not its length,
     *   the build method on page will not be triggered!
     */
  protected forceRefresh(arr: BluetoothDevice[]): void {
    arr.push(new BluetoothDevice())
    arr.pop();
  }

  /**
   * Start bluetooth discovery.
   */
  public startBluetoothDiscovery() {
    this.isDeviceDiscovering = true;
    BluetoothModel.startBluetoothDiscovery();

    this.discoveryStopTimeoutId = setTimeout(() => {
      this.stopBluetoothDiscovery();
    }, DISCOVERY_DURING_TIME);
  }

  /**
   * Stop bluetooth discovery.
   */
  private stopBluetoothDiscovery() {
    this.isDeviceDiscovering = false;
    BluetoothModel.stopBluetoothDiscovery();

    this.discoveryStartTimeoutId = setTimeout(() => {
      this.startBluetoothDiscovery();
    }, DISCOVERY_INTERVAL_TIME);
  }

  /**
  * Stop bluetooth discovery.
  */
  private mStopBluetoothDiscovery() {
    this.isDeviceDiscovering = false;
    BluetoothModel.stopBluetoothDiscovery();
    if (this.discoveryStartTimeoutId) {
      clearTimeout(this.discoveryStartTimeoutId);
    }

    if (this.discoveryStopTimeoutId) {
      clearTimeout(this.discoveryStopTimeoutId);
    }
  }


  /**
   * Get available device.
   *
   * @param deviceId device id
   */
  private getAvailableDevice(deviceIds: string): BluetoothDevice {
     Logger.info(this.TAG + 'getAvailableDevice  length = ' + this.availableDevices.length);
    let temp = this.availableDevices;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].deviceId === deviceIds) {
        return temp[i];
      }
    }
    return null;
  }

  /**
   * Remove available device.
   *
   * @param deviceId device id
   */
  private removeAvailableDevice(deviceId: string): void {
     Logger.info(this.TAG + 'removeAvailableDevice : before : availableDevices length = ' + this.availableDevices.length);
    this.availableDevices = this.availableDevices.filter((device) => device.deviceId !== deviceId)
    AppStorage.SetOrCreate('bluetoothAvailableDevices', this.availableDevices);
     Logger.info(this.TAG + 'removeAvailableDevice : after : availableDevices length = ' + this.availableDevices.length);
  }


}