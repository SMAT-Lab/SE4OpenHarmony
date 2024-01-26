/*
 * Copyright (c) 2023 Shenzhen Kaihong Digital Industry Development Co., Ltd.
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
import abilityAccessCtrl from '@ohos.abilityAccessCtrl';
import type { Permissions } from '@ohos.abilityAccessCtrl';
import util from '@ohos.util';
import Logger from '../common/Logger';
const INDEX: number = 2; // 序号
const SLEEP_TIME: number = 10; // 睡眠时间
const RADIX: number = 16; // parInt第二个参数值
const TAG = 'pickerCommon';
const GRANT_MAX: number = 3;
// ############################################# 应用授权 ##########################################################
export function reqPermissions(context): void {
    let atManager = abilityAccessCtrl.createAtManager();
    const permissions: Array<Permissions> = [
        'ohos.permission.READ_MEDIA',
        'ohos.permission.WRITE_MEDIA',
        'ohos.permission.MEDIA_LOCATION',
        'ohos.permission.DISTRIBUTED_DATASYNC'
    ];
    atManager.requestPermissionsFromUser(context, permissions).then((data) => {
        Logger.info(TAG, `[requestPermissions] data: ${JSON.stringify(data)}`);
        let grantStatus: Array<number> = data.authResults;
        let arrLength = grantStatus.length;
        if (arrLength < GRANT_MAX) {
            Logger.info(TAG, '[requestPermissions] Do not have 3 permissions.');
        }
        else {
            if (grantStatus[0] === 0 && grantStatus[1] === 0 && grantStatus[INDEX] === 0) {
                // 授权成功
                Logger.info(TAG, '[requestPermissions] Success to start request permissions.');
            }
            else {
                // 授权失败
                Logger.info(TAG, '[requestPermissions] Do not have permissions.');
            }
        }
    }).catch((err) => {
        Logger.error(TAG, `[requestPermissions] Failed to start request permissions. Error: ${JSON.stringify(err)}`);
    });
}
export function strToUtf8Bytes(content: string | number | boolean): Array<number> {
    const code = encodeURIComponent(content);
    let bytes = [];
    for (let i = 0; i < code.length; i++) {
        const char = code.charAt(i);
        if (char === '%') {
            const hex = code.charAt(i + 1) + code.charAt(i + INDEX);
            const hexValue = parseInt(hex, RADIX);
            bytes.push(hexValue);
            i += INDEX;
        }
        else {
            bytes.push(char.charCodeAt(0));
        }
    }
    return bytes;
}
export function strToArrayBuffer(text: string): ArrayBuffer {
    const bytes = this.strToUtf8Bytes(text);
    const buffer = new ArrayBuffer(bytes.length);
    const bufView = new DataView(buffer);
    for (let i = 0; i < bytes.length; i++) {
        bufView.setUint8(i, bytes[i]);
    }
    return buffer;
}
export async function sleep(times: number): Promise<void> {
    if (!times) {
        times = SLEEP_TIME;
    }
    await new Promise((res) => setTimeout(res, times));
}
export function randomString(num: number, chars: string): string {
    let len = num;
    let maxPos = chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
export function bufferToString(buffer: ArrayBuffer): string {
    let textDecoder = new util.TextDecoder('utf-8', {
        ignoreBOM: true
    });
    let resultPut = textDecoder.decodeWithStream(new Uint8Array(buffer), {
        stream: true
    });
    return resultPut;
}
export function stringToBuffer(content: string): Uint8Array {
    let textEncoder = new util.TextEncoder('utf-8');
    let resultBuf = textEncoder.encodeInto(content);
    return resultBuf;
}
