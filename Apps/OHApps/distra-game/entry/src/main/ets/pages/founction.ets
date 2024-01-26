/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import distributedObject from '@ohos.data.distributedDataObject';
import deviceManager from '@ohos.distributedHardware.deviceManager';
import { hero } from '../object/hero'

let context

export let g_object

let deviceList1: deviceManager.DeviceInfo[]
context = getContext(this) as any
let hero1 = new hero
g_object = distributedObject.create(context, {
  name: "game",
  status: 2,
  hero: hero1,
  generate: 0,
  generateBig: 0,
  mode: 0
});

export function get_device(): deviceManager.DeviceInfo[] {
  deviceManager.createDeviceManager('com.example.mydevice', (err, value) => {
    if (!err) {
      let devManager = value;
      let deviceList = devManager.getTrustedDeviceListSync();
      console.info(JSON.stringify(deviceList))
      deviceList1 = deviceList
    }
  })
  return deviceList1
}

export function activeapp(dviceid: String): Array<number> {
  let Coordinate = []
  g_object.x = 1

  function changeCallback(sessionId, changeData) {
    console.info(`change: ${sessionId}`);
    if (changeData !== null && changeData !== undefined) {
      changeData.forEach(element => {
        console.info(`The element ${g_object[element]} changed.`);
      });
    }
  }

  let want = {
    deviceId: dviceid,
    bundleName: 'com.example.mydevice',
    abilityName: 'EntryAbility',
    parameters: {
      info: 1
    }
  };
  context.startAbility(want, (error) => {
    if (error.code) {
      // 处理业务逻辑错误
      console.info('startAbility failed, error.code: ' + JSON.stringify(error.code) +
      ' error.message: ' + JSON.stringify(error.message));
      return;
    }
    console.info('startAbility succeed');
  });
  let sessionId = '123456';
  g_object.setSessionId(sessionId);
  g_object.on("change", changeCallback.bind(this));
  globalThis.st = 1
  return Coordinate

}




