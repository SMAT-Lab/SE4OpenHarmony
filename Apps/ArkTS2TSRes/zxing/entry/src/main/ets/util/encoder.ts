let __generate__Id: number = 0;
function generateId(): string {
    return "encoder_" + ++__generate__Id;
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
import { BarcodeFormat, MultiFormatWriter, BitMatrix, ZXingStringEncoding, EncodeHintType } from '@ohos/zxing';
import { CodeData } from './interface';
const encodeHintTypeMap: Map<EncodeHintType, number> = new Map();
//设置二维码边空白的宽度
encodeHintTypeMap.set(EncodeHintType.MARGIN, 0);
export function encode(content: string, format: BarcodeFormat, width: number, height: number, hints?: Map<EncodeHintType, number> | null) {
    let obj: CodeData = {
        matrixPixelData: new Int32Array(),
        width: 0,
        height: 0,
        error: '',
    };
    try {
        const writer: MultiFormatWriter = new MultiFormatWriter();
        if (hints === undefined) {
            hints = encodeHintTypeMap;
        }
        let matrix: BitMatrix = writer.encode(content, format, width, height, hints);
        console.error(TAG + `content:${content}---width:${matrix.getWidth()}---height:${matrix.getHeight()}`);
        obj.matrixPixelData = getMatrixPixelData(matrix, matrix.getWidth(), matrix.getHeight());
        obj.width = matrix.getWidth();
        obj.height = matrix.getHeight();
    }
    catch (err) {
        let error = `content<${content}> encode error : ${err}`;
        console.error(TAG + error);
        obj.error = error;
    }
    return obj;
}
export function encodeCODABAR(content: string, width: number, height: number): CodeData {
    return encode(content, BarcodeFormat.CODABAR, width, height, null);
}
export function encodeCODE_93(content: string, width: number, height: number): CodeData {
    return encode(content, BarcodeFormat.CODE_93, width, height, null);
}
export function encodeEAN_8(content: string, width: number, height: number): CodeData {
    return encode(content, BarcodeFormat.EAN_8, width, height, null);
}
export function encodeEAN_13(content: string, width: number, height: number): CodeData {
    return encode(content, BarcodeFormat.EAN_13, width, height, null);
}
export function encodeUPC_A(content: string, width: number, height: number): CodeData {
    return encode(content, BarcodeFormat.UPC_A, width, height, null);
}
export function encodeUPC_E(content: string, width: number, height: number): CodeData {
    return encode(content, BarcodeFormat.UPC_E, width, height, null);
}
export function encodeOnBar39Code(content: string, width: number, height: number): CodeData {
    return encode(content, BarcodeFormat.CODE_39, width, height);
}
export function encodeOnBarItfCode(content: string, width: number, height: number): CodeData {
    return encode(content, BarcodeFormat.ITF, width, height);
}
export function encodeDATA_MATRIX(content: string, width: number, height: number): CodeData {
    return encode(content, BarcodeFormat.DATA_MATRIX, width, height);
}
export function encodeQrCode(content: string, width: number, height: number): CodeData {
    return encode(content, BarcodeFormat.QR_CODE, width, height);
}
export function encodeAztecCode(content: string, width: number, height: number): CodeData {
    return encode(content, BarcodeFormat.AZTEC, width, height);
}
export function encodeOnBar128Code(content: string, width: number, height: number): CodeData {
    return encode(content, BarcodeFormat.CODE_128, width, height, null);
}
export function encodePDF417(content: string, width: number, height: number): CodeData {
    return encode(content, BarcodeFormat.PDF_417, width, height, null);
}
function getMatrixPixelData(matrix: BitMatrix, width: number, height: number): Uint32Array {
    const BLACK = 0xFF000000;
    const WHITE = 0xFFFFFFFF;
    const pixels = new Uint32Array(width * height);
    for (let y = 0; y < height; y++) {
        let offset = y * width;
        for (let x = 0; x < width; x++) {
            pixels[offset + x] = matrix.get(x, y) ? BLACK : WHITE;
        }
    }
    console.log(TAG + 'getMatrixPixelData matrix pixels size :' + pixels.length);
    console.log(TAG + 'getMatrixPixelData matrix pixels:' + JSON.stringify(pixels));
    return pixels;
}
let TAG = "Encoder-----------------------";
