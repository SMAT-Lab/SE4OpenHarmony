let __generate__Id: number = 0;
function generateId(): string {
    return "QRCode_" + ++__generate__Id;
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
import { BarcodeFormat, MultiFormatWriter, BitMatrix, ZXingStringEncoding, EncodeHintType, MultiFormatReader, DecodeHintType, RGBLuminanceSource, BinaryBitmap, HybridBinarizer } from '@ohos/zxing';
import image from '@ohos.multimedia.image';
import { getMatrixPixelData } from './imageUtils';
export default class QRCode {
    constructor() {
    }
    private typedArrayToBuffer(array: Uint32Array): ArrayBuffer {
        return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset);
    }
    async encode(content: string, params: Params): Promise<image.PixelMap> {
        const width = params.width;
        const height = params.height;
        const format = params.format ? params.format : BarcodeFormat.QR_CODE;
        const encodeHintTypeMap: Map<EncodeHintType, number> = new Map();
        // 设置二维码空白的宽度
        encodeHintTypeMap.set(EncodeHintType.MARGIN, 0);
        const writer: MultiFormatWriter = new MultiFormatWriter();
        let matrix: BitMatrix = writer.encode(content, format, width, height, encodeHintTypeMap);
        const PixelData = getMatrixPixelData(matrix, matrix.getWidth(), matrix.getHeight());
        return await image.createPixelMap(this.typedArrayToBuffer(PixelData), {
            size: {
                width, height
            }
        });
    }
    async decode(image: image.PixelMap, params: Params): Promise<string> {
        const width = params.width;
        const height = params.height;
        const format = params.format ? params.format : BarcodeFormat.QR_CODE;
        let num = image.getPixelBytesNumber();
        let arrayBuffer: ArrayBuffer = new ArrayBuffer(num);
        await image.readPixelsToBuffer(arrayBuffer);
        const int32Array = new Int32Array(arrayBuffer);
        const luminanceSource = new RGBLuminanceSource(int32Array, width, height);
        const binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource));
        const reader = new MultiFormatReader();
        const hints: Map<DecodeHintType, Array<BarcodeFormat>> = new Map();
        hints.set(DecodeHintType.POSSIBLE_FORMATS, [format]);
        reader.setHints(hints);
        let result = reader.decode(binaryBitmap);
        let text = result.getText();
        return text;
    }
}
interface Params {
    width: number;
    height: number;
    format?: BarcodeFormat;
}
