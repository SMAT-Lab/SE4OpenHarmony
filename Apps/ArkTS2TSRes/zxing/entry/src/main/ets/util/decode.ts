let __generate__Id: number = 0;
function generateId(): string {
    return "decode_" + ++__generate__Id;
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
import { BarcodeFormat } from '@ohos/zxing';
import { MultiFormatReader } from '@ohos/zxing';
import { DecodeHintType } from '@ohos/zxing';
import { RGBLuminanceSource } from '@ohos/zxing';
import { BinaryBitmap } from '@ohos/zxing';
import { HybridBinarizer } from '@ohos/zxing';
import { EAN13Reader } from '@ohos/zxing';
import { Code128Reader } from '@ohos/zxing';
//https://github.com/zxing-js/library
export { decode, decodeEAN_13, decodeCODE_128 };
function decodeCODE_128(luminances: Uint8ClampedArray | Int32Array, width: number, height: number): string {
    const reader = new Code128Reader();
    const luminanceSource = new RGBLuminanceSource(luminances, width, height);
    const binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource));
    try {
        let result = reader.decode(binaryBitmap);
        let rawBytes = result.getRawBytes().toString();
        let text = result.getText();
        return text;
    }
    catch (err) {
        let error = `decode error ${err}`;
        console.error(error);
        return error;
    }
}
function decodeEAN_13(luminances: Uint8ClampedArray | Int32Array, width: number, height: number): string {
    const reader = new EAN13Reader();
    const luminanceSource = new RGBLuminanceSource(luminances, width, height);
    const binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource));
    let result = reader.decode(binaryBitmap);
    let text = result.getText();
    return text;
}
function decode(luminances: Uint8ClampedArray | Int32Array, width: number, height: number, format: number): string {
    const hints: Map<DecodeHintType, number[]> = new Map();
    const formats: number[] = [format];
    hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
    const reader = new MultiFormatReader();
    reader.setHints(hints);
    const luminanceSource = new RGBLuminanceSource(luminances, width, height);
    const binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource));
    try {
        let result = reader.decode(binaryBitmap);
        let text = result.getText();
        return text;
    }
    catch (err) {
        let error = `decode error ${err}`;
        console.error(error);
        return error;
    }
}
