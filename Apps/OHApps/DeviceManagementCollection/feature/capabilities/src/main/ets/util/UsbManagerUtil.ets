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

import commonEventManager from '@ohos.commonEventManager';
import promptAction from '@ohos.promptAction';
import usbManager from '@ohos.usbManager';
import { BusinessError } from '@ohos.base';
import CheckEmptyUtils from './CheckEmptyUtils';
import { DeviceAttribute } from '../model/DeviceAttribute';
import { logger } from '@ohos/common';

const TAG: string = 'UsbManagerUtil';
let commonEventSubscriber : commonEventManager.CommonEventSubscriber | undefined = undefined;

export function getDeviceList(): DeviceAttribute[] {
  let usbDevices: usbManager.USBDevice[] = usbManager.getDevices();
  logger.info(TAG, `usb getDeviceList 000 is : ${JSON.stringify(usbDevices)}`);
  if (CheckEmptyUtils.isEmpty(usbDevices)) {
    logger.info(TAG, `usbDevices is null`);
    return [];
  }
  if (CheckEmptyUtils.isEmptyArray(usbDevices)) {
    logger.info(TAG, `usb getDeviceList is null`);
    return [];
  }
  let devices: DeviceAttribute[] = [];
  for (let index = 0;index < usbDevices.length; index++) {
    logger.info(TAG, `usb devices ${index} : ${JSON.stringify(devices)}`);
    let deviceAttribute: DeviceAttribute = {
      version: usbDevices[index].version,
      serial: usbDevices[index].serial,
      productName: usbDevices[index].productName,
      manufacturerName: usbDevices[index].manufacturerName,
      name: usbDevices[index].name,
      productId: usbDevices[index].productId,
      vendorId: usbDevices[index].vendorId,
      busAddress: usbDevices[index].busNum,
      clazz: usbDevices[index].clazz,
      deviceAddress: usbDevices[index].devAddress
    };
    if (devices.indexOf(deviceAttribute) === -1) {
      devices.push(deviceAttribute);
    }
  }
  logger.info(TAG, `usb devices : ${JSON.stringify(devices)}`);
  return devices;
}

export function createUsbSubscribe(callback: () => void) {
  if (!CheckEmptyUtils.isEmpty(commonEventSubscriber)) {
    logger.info(TAG, `usb event not subscribed`);
    return;
  }
  logger.info(TAG, 'usb subUsbListener....');
  let commonEventSubscribeInfo: commonEventManager.CommonEventSubscribeInfo = {
    events: [commonEventManager.Support.COMMON_EVENT_USB_DEVICE_DETACHED, commonEventManager.Support.COMMON_EVENT_USB_DEVICE_ATTACHED]
  };
  let promise = commonEventManager.createSubscriber(commonEventSubscribeInfo);
  let usbSubscribeCallback = (err: BusinessError, data: commonEventManager.CommonEventData) => {
    logger.info(TAG, `SubscriberCallBack  data = ${JSON.stringify(data)}`);
    if (data.event === 'usual.event.hardware.usb.action.USB_DEVICE_ATTACHED') {
      promptAction.showToast({ message: $r('app.string.toast_inserted') });
    } else {
      promptAction.showToast({ message: $r('app.string.toast_removed') });
    }
    callback();
  };
  promise.then((data) => {
    promptAction.showToast({ message: $r('app.string.toast_start_listening') });
    logger.info(TAG, 'usb CreateSubscriberCallBack....');
    commonEventSubscriber = data;
    commonEventManager.subscribe(commonEventSubscriber, usbSubscribeCallback);
    logger.info(TAG, 'Subscriber.subscribe success');
  }).catch((err: BusinessError) => {
    logger.info(TAG, `Subscriber.createSubscriber promise err = ${JSON.stringify(err)}`);
  })
}

export function cancelUsbSubscribe(): void {
  if (CheckEmptyUtils.isEmpty(commonEventSubscriber)) {
    logger.info(TAG, 'usb event already subscribed');
    return;
  }
  try {
    commonEventManager.unsubscribe(commonEventSubscriber, () => {
      logger.info(TAG, `usb event unsubscribed`);
      commonEventSubscriber = undefined;
      promptAction.showToast({ message: $r('app.string.toast_listening_cancel') });
    })
  } catch (err) {
    logger.error(TAG, `usb event unsubscribed fail:${JSON.parse(err)}`);
  }
}