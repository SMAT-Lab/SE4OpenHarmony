/*
Copyright (c) 2022 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { BmpHeaderDirectory } from './BmpHeaderDirectory';
import TagDescriptor from '../TagDescriptor';

export class BmpHeaderDescriptor extends TagDescriptor<BmpHeaderDirectory> {
  constructor(directory: BmpHeaderDirectory) {
    super(directory)
  }

  getDescription(tagType: number) {
    switch (tagType) {
      case BmpHeaderDirectory.TAG_BITMAP_TYPE:
        return this.getBitmapTypeDescription();
      case BmpHeaderDirectory.TAG_COMPRESSION:
        return this.getCompressionDescription();
      case BmpHeaderDirectory.TAG_RENDERING:
        return this.getRenderingDescription();
      case BmpHeaderDirectory.TAG_COLOR_ENCODING:
        return this.getColorEncodingDescription();
      case BmpHeaderDirectory.TAG_RED_MASK:
      case BmpHeaderDirectory.TAG_GREEN_MASK:
      case BmpHeaderDirectory.TAG_BLUE_MASK:
      case BmpHeaderDirectory.TAG_ALPHA_MASK:
        return BmpHeaderDescriptor.formatHex(this._directory.getLongObject(tagType), 8);
      case BmpHeaderDirectory.TAG_COLOR_SPACE_TYPE:
        return this.getColorSpaceTypeDescription();
      case BmpHeaderDirectory.TAG_GAMMA_RED:
      case BmpHeaderDirectory.TAG_GAMMA_GREEN:
      case BmpHeaderDirectory.TAG_GAMMA_BLUE:
        return BmpHeaderDescriptor.formatFixed1616(this._directory.getLongObject(tagType));
      case BmpHeaderDirectory.TAG_INTENT:
        return this.getRenderingIntentDescription();
      default:
        return super.getDescription(tagType);
    }
  }

  getBitmapTypeDescription() {
    let bitmapType = this._directory.getBitmapType();
    return bitmapType == null ? null : bitmapType;
  }

  public getCompressionDescription() {
    //  0 = None
    //  1 = RLE 8-bit/pixel
    //  2 = RLE 4-bit/pixel
    //  3 = Bit fields (or Huffman 1D if OS22XBITMAPHEADER (size 64))
    //  4 = JPEG (or RLE 24-bit/pixel if OS22XBITMAPHEADER (size 64))
    //  5 = PNG
    // 11 = CMYK
    // 12 = CMYK RLE-8
    // 13 = CMYK RLE-4

    let compression = this._directory.getCompression();
    if (compression != null) {
      return compression.toString();
    }
    let value = this._directory.getInteger(BmpHeaderDirectory.TAG_COMPRESSION);
    return value == null ? null : "Illegal value 0x" + parseInt((value.toString()))
  }

  public getRenderingDescription() {
    let renderingHalftoningAlgorithm = this._directory.getRendering();
    return renderingHalftoningAlgorithm == null ? null : renderingHalftoningAlgorithm.toString();
  }

  public getColorEncodingDescription() {
    let colorEncoding = this._directory.getColorEncoding();
    return colorEncoding == null ? null : colorEncoding.toString();
  }

  public getColorSpaceTypeDescription() {
    let colorSpaceType = this._directory.getColorSpaceType();
    return colorSpaceType == null ? null : colorSpaceType.toString();
  }

  public getRenderingIntentDescription() {
    let renderingIntent = this._directory.getRenderingIntent();
    return renderingIntent == null ? null : renderingIntent.toString();
  }

  public static formatHex(value: number, digits: number) {
    return value == null ? null : this.formatHex(value & 0xFFFFFFFF, digits);
  }

  public static formatFixed1616(value: number) {
    let d = value / 0x10000;
    let format = d.toFixed(3)
    return format;
  }
}