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

import {
  BarcodeFormat,
  MultiFormatReader,
  RGBLuminanceSource,
  BinaryBitmap,
  HybridBinarizer
} from '@ohos/zxing';
import image from '@ohos.multimedia.image';

export interface ImageWH{
  width: number,
  height: number
};
export default class QRCode {
  async decode(image: image.PixelMap, params: ImageWH): Promise<string> {
    const width: number = params.width;
    const height: number = params.height;
    let num = image.getPixelBytesNumber();
    let arrayBuffer: ArrayBuffer = new ArrayBuffer(num);
    await image.readPixelsToBuffer(arrayBuffer);
    const int32Array = new Int32Array(arrayBuffer);
    const luminanceSource = new RGBLuminanceSource(int32Array, width, height);
    console.log("yyc luminanceSource")
    const binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource));
    console.log("yyc binaryBitmap")
    const reader = new MultiFormatReader();
    console.log("yyc reader")
    let result = reader.decode(binaryBitmap);
    console.log("yyc result")
    let text = result.getText();
    return text;
  }
}