let __generate__Id: number = 0;
function generateId(): string {
    return "imageUtils_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import image from '@ohos.multimedia.image';
import ability_featureability from '@ohos.ability.featureAbility';
import { BitMatrix } from '@ohos/zxing';
interface loadLocalImageBufferResult {
    pixelMap: PixelMap;
    int32Array: Int32Array;
}
export function createEmptyPixelMap(): Promise<PixelMap> {
    let initializationOpts: image.InitializationOptions = {
        "alphaType": 1,
        "editable": true,
        "pixelFormat": 3,
        "scaleMode": 1,
        "size": { "width": 1, "height": 1 },
    };
    return image.createPixelMap(new ArrayBuffer(1), initializationOpts);
}
export function getPixelMap(buffer: ArrayBuffer, width: number, height: number): Promise<PixelMap> {
    return new Promise<PixelMap>((resolve, reject) => {
        // 配置创建PixelMap的参数
        let initializationOpts: image.InitializationOptions = {
            "alphaType": 1,
            "editable": true,
            "pixelFormat": 3,
            "scaleMode": 1,
            "size": { "width": width, "height": height },
        };
        // 根据二维码图片数据创建PixelMap
        image.createPixelMap(buffer, initializationOpts, (err, data) => {
            if (err) {
                console.error(TAG + 'getPixelMap error code is  ' + err.code);
                console.error(TAG + 'getPixelMap error msg is ' + err.message);
            }
            else {
                // 读取新创建的PixelMap
                let pixelBytesNumber = data.getPixelBytesNumber();
                console.error(TAG + 'getPixelMap pixelBytesNumber ' + pixelBytesNumber);
                console.error(TAG + 'getPixelMap Succeed');
                resolve(data);
            }
        });
    });
}
export function getPixelMapInt32ArrayData(pixelMap: PixelMap): Promise<Int32Array> {
    return new Promise<Int32Array>((resolve, reject) => {
        // 读取新创建的PixelMap
        let pixelBytesNumber: number = pixelMap.getPixelBytesNumber();
        console.error(TAG + 'getPixelMapInt32ArrayData pixelBytesNumber: ' + pixelBytesNumber);
        let readPixelsToBuffer = new ArrayBuffer(pixelBytesNumber);
        let readPixelsToUnit8Arr: Int32Array = new Int32Array(readPixelsToBuffer);
        pixelMap.readPixelsToBuffer(readPixelsToBuffer, (InfoErr, InfoData) => {
            if (InfoErr) {
                console.error(TAG + 'getPixelMapInt32ArrayData error code is  ' + InfoErr.code);
                console.error(TAG + 'getPixelMapInt32ArrayData error msg is ' + InfoErr.message);
            }
            else {
                console.log(TAG + 'getPixelMapInt32ArrayData success');
                console.log(TAG + 'getPixelMapInt32ArrayData readPixelsToUnit8Arr size:' + readPixelsToUnit8Arr.length);
                console.log(TAG + 'getPixelMapInt32ArrayData readPixelsToUnit8Arr:' + JSON.stringify(readPixelsToUnit8Arr));
                resolve(readPixelsToUnit8Arr);
            }
        });
    });
}
export function getMatrixPixelData(matrix: BitMatrix, width: number, height: number) {
    const BLACK = 0xFF000000;
    const WHITE = 0xFFFFFFFF;
    const pixels = new Uint32Array(width * height);
    for (let y = 0; y < height; y++) {
        let offset = y * width;
        for (let x = 0; x < width; x++) {
            pixels[offset + x] = matrix.get(x, y) ? BLACK : WHITE;
        }
    }
    return pixels;
}
let TAG = "imageUtils-----------------------";
