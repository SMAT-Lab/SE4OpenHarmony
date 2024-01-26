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

import logger from '../Model/Logger';
import bluetoothManager from '@ohos.bluetoothManager';
import nuofan from './nuofan';

const TAG = "UM_BLE Bluetooth"

class Bluetooth {
  private device;

  constructor() {
    logger.info(TAG, 'Bluetooth get data init');
  }

  onReceiveEvent = async (data: Array<bluetoothManager.ScanResult>) => {
    logger.info(TAG, 'BLE scan device find result = ' + JSON.stringify(data));
  }

  getServices() {
    this.device = bluetoothManager.BLE.createGattClientDevice("C0:00:00:03:EE:FE");
    this.device.connect();
    try {
      this.device.getServices().then(result => {
        logger.info(TAG, "getServices successfully:" + JSON.stringify(result));
        this.writeCharacteristicValue()
        this.setNotifyCharacteristicChanged()
      });
    } catch (err) {
      logger.error(TAG, "errCode:" + err.code + ",errMessage:" + err.message);
    }
  }

  writeCharacteristicValue() {
    let descriptors = [];
    let bufferDesc = new ArrayBuffer(8);
    let descV = new Uint8Array(bufferDesc);
    descV[0] = 11;
    let descriptor = {
      serviceUuid: "0000FC00-0000-1000-8000-00805F9B34FB",
      characteristicUuid: "0000FCA0-0000-1000-8000-00805F9B34FB",
      descriptorUuid: "00002903-0000-1000-8000-00805F9B34FB",
      descriptorValue: bufferDesc
    };
    descriptors[0] = descriptor;

    let bufferCCC = new ArrayBuffer(4);
    let cccV = new Uint8Array(bufferCCC);
    cccV[0] = 0x04;
    cccV[1] = 0xb0;
    cccV[2] = 0xa0;
    cccV[3] = 0x54;
    let characteristic = {
      serviceUuid: "0000FC00-0000-1000-8000-00805F9B34FB",
      characteristicUuid: "0000FCA0-0000-1000-8000-00805F9B34FB",
      characteristicValue: bufferCCC,
      descriptors: descriptors
    };
    try {
      this.device.writeCharacteristicValue(characteristic);
    } catch (err) {
      logger.error(TAG, "errCode:" + err.code + ",errMessage:" + err.message);
    }
  }

  CharacteristicChange(CharacteristicChangeReq) {
    let parseDatavalue = nuofan.parseData(CharacteristicChangeReq)
    logger.info(TAG, 'parseDatavalue:' + JSON.stringify(parseDatavalue))
  }

  setNotifyCharacteristicChanged() {
    // 创建descriptors
    let descriptors = [];
    let arrayBuffer = new ArrayBuffer(8);
    let descV = new Uint8Array(arrayBuffer);
    descV[0] = 11;
    let descriptor = {
      serviceUuid: '0000FC00-0000-1000-8000-00805F9B34FB',
      characteristicUuid: '0000FCA1-0000-1000-8000-00805F9B34FB',
      descriptorUuid: '00002902-0000-1000-8000-00805F9B34FB',
      descriptorValue: arrayBuffer };
    descriptors[0] = descriptor;
    let arrayBufferC = new ArrayBuffer(8);
    let characteristic = {
      serviceUuid: '0000FC00-0000-1000-8000-00805F9B34FB',
      characteristicUuid: '0000FCA1-0000-1000-8000-00805F9B34FB',
      characteristicValue: arrayBufferC,
      descriptors: descriptors
    };
    try {
      this.device.setNotifyCharacteristicChanged(characteristic, true);
      this.device.on('BLECharacteristicChange', this.CharacteristicChange);
    } catch (err) {
      logger.error(TAG, "errCode:" + err.code + ",errMessage:" + err.message);
    }
  }
}

export default new Bluetooth();