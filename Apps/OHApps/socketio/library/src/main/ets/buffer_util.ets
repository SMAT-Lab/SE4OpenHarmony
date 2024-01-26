/**
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * This software is distributed under a license. The full license
 * agreement can be found in the file LICENSE in this distribution.
 * This software may not be copied, modified, sold or distributed
 * other than expressed in the named license agreement.
 *
 * This software is distributed without any warranty.
 */

export class buffer_util {
  public static uint8ArrayToString(uint8Array: Uint8Array): string {
    let dataString = "";
    for (let i = 0; i < uint8Array.length; i++) {
      dataString += String.fromCharCode(uint8Array[i]);
    }
    return dataString
  }

  public static stringToUint8Array(message_string: string): Uint8Array {
    let array: number[] = [];
    for (let i = 0, j = message_string.length; i < j; ++i) {
      array.push(message_string.charCodeAt(i));
    }
    let uint8Array = new Uint8Array(array);
    return uint8Array
  }
}