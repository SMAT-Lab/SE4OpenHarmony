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
import bluetooth from '@ohos.bluetooth';
import bluetoothManager from '@ohos.bluetoothManager';
import Logger from './Logger'

export enum ProfileCode {
  CODE_BT_PROFILE_A2DP_SINK = 0,
  CODE_BT_PROFILE_A2DP_SOURCE,
  CODE_BT_PROFILE_AVRCP_CT,
  CODE_BT_PROFILE_AVRCP_TG,
  CODE_BT_PROFILE_HANDS_FREE_AUDIO_GATEWAY,
  CODE_BT_PROFILE_HANDS_FREE_UNIT,
  CODE_BT_PROFILE_HID_HOST,
  CODE_BT_PROFILE_PAN_NETWORK,
  CODE_BT_PROFILE_PBAP_CLIENT,
  CODE_BT_PROFILE_PBAP_SERVER,
};

export enum ProfileConnectionState {
  /** the current profile is disconnected */
  STATE_DISCONNECTED = 0,
  /** the current profile is being connected */
  STATE_CONNECTING = 1,
  /** the current profile is connected */
  STATE_CONNECTED = 2,
  /** the current profile is being disconnected */
  STATE_DISCONNECTING = 3
}

export enum BondState {
  /** Indicate the bond state is invalid */
  BOND_STATE_INVALID = 0,
  /** Indicate the bond state is bonding */
  BOND_STATE_BONDING = 1,
  /** Indicate the bond state is bonded*/
  BOND_STATE_BONDED = 2
}

export enum DeviceType {
  BLUETOOTH = '1',
  HEADPHONE = '2',
  PHONE = '3',
  COMPUTER = '4',
  WATCH = '5'
}

export enum BluetoothErrorCode {
  SUCCESS = -1,
  HOLD_PAIRING_MODE = 1,
  APP_PAIR = 2,
  PAIR_FAILED = 3,
  DEVICE_ILLEGAL = 4,
  CONNECT_FAILED = 5
}

enum BluetoothState {
  /** Indicates the local Bluetooth is off */
  STATE_OFF = 0,
  /** Indicates the local Bluetooth is turning on */
  STATE_TURNING_ON = 1,
  /** Indicates the local Bluetooth is on, and ready for use */
  STATE_ON = 2,
  /** Indicates the local Bluetooth is turning off */
  STATE_TURNING_OFF = 3,
  /** Indicates the local Bluetooth is turning LE mode on */
  STATE_BLE_TURNING_ON = 4,
  /** Indicates the local Bluetooth is in LE only mode */
  STATE_BLE_ON = 5,
  /** Indicates the local Bluetooth is turning off LE only mode */
  STATE_BLE_TURNING_OFF = 6
}

/**
 * bluetooth service class
 */
export class BluetoothModel  {
  private TAG = 'BluetoothModel ';
  private profiles: any[] = new Array(10);
  public canUse: boolean = false;

  /**
   * constructor
   */
  constructor() {
    try{
      Logger.info('bluetooth.getProfile start')
      let ProfileId = bluetoothManager.ProfileId;
      this.profiles[ProfileId.PROFILE_A2DP_SOURCE]
        = bluetoothManager.getProfileInstance(ProfileId.PROFILE_A2DP_SOURCE);
      this.profiles[ProfileId.PROFILE_HANDS_FREE_AUDIO_GATEWAY]
        = bluetoothManager.getProfileInstance(ProfileId.PROFILE_HANDS_FREE_AUDIO_GATEWAY);
      this.profiles[ProfileId.PROFILE_HID_HOST]
        = bluetoothManager.getProfileInstance(ProfileId.PROFILE_HID_HOST);
      Logger.info('bluetooth.getProfile end')
      this.canUse = true;
      }
    catch(error){
      Logger.info('bluetooth.getProfile error')
      this.canUse = false;
      Logger.info(`BluetoothModel error: ${JSON.stringify(error)}.`);
    }
  }


  /**
   * Get Bluetooth status
   * @return value of bluetooth.BluetoothState type
   */
  getState(): number {
    let bluetoothState = bluetooth.getState();
    Logger.info(`${this.TAG} getState: bluetoothState = ${bluetoothState}`);
    return bluetoothState;
  }

  /**
   * Get Bluetooth switch status
   */
  isStateOn(): boolean {
    let result = false;
    let state = bluetooth.getState();
    Logger.info(`${this.TAG} isStateOn: state = ${state}`);
    switch (state) {
      case BluetoothState.STATE_ON:
        result = true
        break;
      default:
        break;
    }
    Logger.info(`${this.TAG} isStateOn: bluetoothState = ${result}`);
    return result;
  }

  /**
   * Subscribe Bluetooth switch status Change
   */
  subscribeStateChange(callback: (data: boolean) => void): void {
    Logger.info('bluetooth.subscribeStateChange start');
    bluetooth.on('stateChange', (data) => {
      Logger.info(`${this.TAG} subscribeStateChange->stateChange data:${data}`);
      if (callback) {
        switch (data) {
          case BluetoothState.STATE_ON:
            bluetooth.setBluetoothScanMode(4, 0);
            Logger.info(`${this.TAG} subscribeStateChange->stateChange return: true`);
            callback(true)
            break;

          case BluetoothState.STATE_OFF:
            Logger.info(`${this.TAG} subscribeStateChange->stateChange return: false`);
            callback(false)
            break;

          default:
            break;
        }
      }
    })
  }

  /**
   * unsubscribe Bluetooth switch status Change
   */
  unsubscribeStateChange(callback?: (data: boolean) => void): void {
    Logger.info('bluetooth.unsubscribeStateChange start');
    bluetooth.off('stateChange', (data) => {
      Logger.info(`${this.TAG} unsubscribeStateChange->stateChange data:${data}`);
      if (callback) {
        let result = false;
        switch (data) {
          case BluetoothState.STATE_ON:
            Logger.info(`${this.TAG} unsubscribeStateChange->stateChange return : true`);
            callback(true)
            break;
          case BluetoothState.STATE_OFF:
            Logger.info(`${this.TAG} unsubscribeStateChange->stateChange return : false`);
            callback(false)
            break;
          default:
            break;
        }
      }
    })
  }

  /**
   * Turn on Bluetooth
   */
 
  enableBluetooth(): boolean {
    return bluetooth.enableBluetooth();
  }

  /**
   * Turn off Bluetooth
   */
 
  disableBluetooth(): boolean {
    return bluetooth.disableBluetooth();
  }

  /**
   * Get local name
   */
  getLocalName(): string {
    return bluetooth.getLocalName();
  }

  /**
   * Set local name
   */
  setLocalName(name: string): boolean {
    return bluetooth.setLocalName(name);
  }

  /**
   * Get paired device ids
   */
  getPairedDeviceIds(): Array<string> {
    return bluetooth.getPairedDevices();
  }

  /**
   * Start Bluetooth discovery
   */
 
  startBluetoothDiscovery(): boolean {
    return bluetooth.startBluetoothDiscovery();
  }

  /**
   * Stop Bluetooth discovery
   */
 
  stopBluetoothDiscovery(): boolean {
    return bluetooth.stopBluetoothDiscovery();
  }

  /**
   * Subscribe Bluetooth status Change
   */
  subscribeBluetoothDeviceFind(callback: (data: Array<string>) => void): void {
    Logger.info('bluetooth.subscribeBluetoothDeviceFind start');
    bluetooth.on('bluetoothDeviceFind', (data: Array<string>) => {
      Logger.info(`${this.TAG} subscribeBluetoothDeviceFind->deviceFind callback`);
      if (callback) {
        callback(data)
      }
    })
  }

  /**
   * unsubscribe Bluetooth status Change
   */
  unsubscribeBluetoothDeviceFind(callback?: (data: Array<string>) => void): void {
    Logger.info('bluetooth.unsubscribeBluetoothDeviceFind start');
    bluetooth.off('bluetoothDeviceFind', (data) => {
      Logger.info(`${this.TAG} unsubscribeBluetoothDeviceFind->deviceFind callback`);
      if (callback) {
        callback(data)
      }
    })
  }

  /**
   * Pair device
   */
  pairDevice(deviceId: string): boolean {
    return bluetooth.pairDevice(deviceId);
  }

  /**
   * Subscribe PinRequired
   */
  subscribePinRequired(callback: (data: {
    deviceId: string;
    pinCode: string;
  }) => void): void {
    Logger.info('bluetooth.subscribePinRequired start');
    bluetooth.on('pinRequired', (data: {
      deviceId: string;
      pinCode: string;
    }) => {
      Logger.info(`${this.TAG} subscribePinRequired->pinRequired return: ${data.pinCode}`);
      if (callback) {
        callback(data)
      }
    })
  }

  /**
   * Unsubscribe PinRequired
   */
  unsubscribePinRequired(callback?: (data: {
    deviceId: string;
    pinCode: string;
  }) => void): void {
    Logger.info('bluetooth.unsubscribePinRequired start');
    bluetooth.off('pinRequired', (data: {
      deviceId: string;
      pinCode: string;
    }) => {
      if(data == undefined || !data){
        Logger.error(`${this.TAG} unsubscribePinRequired->pinRequired error`);
        return;
      }
      Logger.info(`${this.TAG} unsubscribePinRequired->pinRequired return: ${data.pinCode}`);
      if (callback) {
        callback(data)
      }
    })
  }

  /**
   * Set device PairingConfirmation
   */
  setDevicePairingConfirmation(deviceId: string, accept: boolean): boolean {
    Logger.info('bluetooth.setDevicePairingConfirmation start, accept:' + accept);
    let ret = bluetooth.setDevicePairingConfirmation(deviceId, accept);
    Logger.info('bluetooth.unsubscribePinRequired end, ret: ' + ret);
    return ret;
  }

  /**
   * Subscribe bondStateChange
   */
  subscribeBondStateChange(callback): void {
    Logger.info('bluetooth.subscribeBondStateChange start');
    bluetooth.on('bondStateChange', (data) => {
      Logger.info(`${this.TAG} subscribeBondStateChange->bondStateChange data.state:${JSON.stringify(data.state)}`);
      if (callback) {
        let result = {
          deviceId: data.deviceId,
          bondState: data.state
        }
        Logger.info(`${this.TAG} subscribeBondStateChange->bondStateChange return:${JSON.stringify(result.bondState)}`);
        callback(result);
      }
    })
  }

  /**
   * Unsubscribe bondStateChange
   */
  unsubscribeBondStateChange(callback?: (data: {
    deviceId: string;
    bondState: number;
  }) => void): void {
    bluetooth.off('bondStateChange', (data) => {
      Logger.info(`${this.TAG} unsubscribeBondStateChange->bondStateChange start`);
      if (callback) {
        let result = {
          deviceId: data.deviceId,
          bondState: data.state
        }
        Logger.info(`${this.TAG} unsubscribeBondStateChange->bondStateChange return:${JSON.stringify(result.bondState)}`);
        callback(result);
      }
    })
  }

  /**
   * Get device name
   */
  getDeviceName(deviceId: string): string {
    return bluetooth.getRemoteDeviceName(deviceId);
  }

  /**
   * Get device type
   */
  getDeviceType(deviceId: string): string {
    let deviceType = DeviceType.BLUETOOTH;
    let deviceClass = bluetooth.getRemoteDeviceClass(deviceId);
    switch (deviceClass.majorClass) {
      case 0x0100:
        deviceType = DeviceType.COMPUTER;
        break;
      case 0x0400:
        if (deviceClass.majorMinorClass === 0x0418 || deviceClass.majorMinorClass === 0x0404) {
          deviceType = DeviceType.HEADPHONE;
        }
        break;
      case 0x0700:
        if (deviceClass.majorMinorClass === 0x0704) {
          deviceType = DeviceType.WATCH;
        }
        break;
      case 0x0200:
        deviceType = DeviceType.PHONE;
        break;
      default:
        deviceType = DeviceType.BLUETOOTH;
        break;
    }
    Logger.info('bluetooth.getDeviceType end, return:' + deviceType);
    return deviceType;
  }

  /**
   * Get device state
   */
  getDeviceState(deviceId: string): Array<{
    profileId: number;
    profileConnectionState: number;
  }> {
    let result = [];
    for (let i = 0;i < this.profiles.length; i++) {
      if (this.profiles[i]) {
        try {
          let state = this.profiles[i].getDeviceState(deviceId);
          result.push({
            profileId: i,
            profileConnectionState: state
          });
        } catch (BusinessError) {
          Logger.error("Bluetooth getDeviceState failed , BusinessError is " + JSON.stringify(BusinessError))
        }
      }
    }
    return result;
  }

  /**
   * Unpair device
   */
  unpairDevice(deviceId: string): boolean {
    return bluetooth.cancelPairedDevice(deviceId);
  }

  /**
   * Connect device
   */
  connectDevice(deviceId: string): Array<{
    profileId: number;
    connectRet: boolean;
  }> {
    Logger.info('bluetooth.connectDevice start');
    let result = [];
    for (let i = 0;i < this.profiles.length; i++) {
      if (this.profiles[i]) {
        let profile = this.profiles[i];
        let connectRet = true;
        try {
          profile.connect(deviceId);
        } catch (BusinessError) {
          Logger.info(`${this.TAG} connect failed. BusinessError is  ` + JSON.stringify(BusinessError));
          connectRet = false;
        }
        result.push({
          profileId: i,
          connectRet: connectRet
        });
      }
    }
    Logger.info('bluetooth.connectDevice end, return:' + result);
    return result;
  }

  /**
   * Disconnect device
   */
  disconnectDevice(deviceId: string): Array<{
    profileId: number;
    disconnectRet: boolean;
  }> {
    Logger.info('bluetooth.disconnectDevice start');
    let result = [];
    for (let i = 0;i < this.profiles.length; i++) {
      let profile = this.profiles[i];
      if (this.profiles[i]) {
        let profileConnectionState = profile.getDeviceState(deviceId);
        let disconnectRet = true;
        Logger.info(`${this.TAG} disconnectDevice , connectionState = ${profileConnectionState}`);
        if (profileConnectionState === 2) {
          try {
            profile.disconnect(deviceId);
          } catch (BusinessError) {
            Logger.info(`${this.TAG} disconnect failed. BusinessError is  ` + JSON.stringify(BusinessError));
            disconnectRet = false;
          }
        }
        result.push({
          profileId: i,
          disconnectRet: disconnectRet
        });
      }
    }
    Logger.info('bluetooth.connectDevice end, return:' + result);
    return result;
  }

  /**
   * Subscribe device connection state Change
   */
  subscribeDeviceStateChange(callback: (data: {
    profileId: number;
    deviceId: string;
    profileConnectionState: number;
  }) => void): void {
    for (let i = 0;i < this.profiles.length; i++) {
      if (this.profiles[i]) {
        let profile = this.profiles[i];
        profile.on('connectionStateChange', (data) => {
          if (callback) {
            let result = {
              profileId: i,
              deviceId: data.deviceId,
              profileConnectionState: data.state
            };
            Logger.info(`${this.TAG} subscribeDeviceStateChange->connectionStateChange,
              return:${result.profileId} - ${result.profileConnectionState}`);
            callback(result);
          }
        })
      }
    }
  }

  /**
   * unsubscribe device connection state Change
   */
  unsubscribeDeviceStateChange(callback?: (data: {
    profileId: number;
    deviceId: string;
    profileConnectionState: number;
  }) => void): void {
    for (let i = 0;i < this.profiles.length; i++) {
      if (this.profiles[i]) {
        let profile = this.profiles[i];
        profile.off('connectionStateChange', (data) => {
          if(data == undefined || !data){
            Logger.error(`${this.TAG} unsubscribeDeviceStateChange->connectionStateChange error`);
            return;
          }
          if (callback) {
            let result = {
              profileId: i,
              deviceId: data.deviceId,
              profileConnectionState: data.state
            };
            Logger.info(`${this.TAG} unsubscribeDeviceStateChange->connectionStateChange,
              return:${result.profileId} - ${result.profileConnectionState}`);
            callback(result);
          }
        })
      }
    }
  }
}

let bluetoothModel = new BluetoothModel();

export default bluetoothModel as BluetoothModel;