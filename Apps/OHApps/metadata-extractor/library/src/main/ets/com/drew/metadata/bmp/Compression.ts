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

export enum Compression {
  /** 0 = None */
  BI_RGB = 0,

  /** 1 = RLE 8-bit/pixel */
  BI_RLE8 = 1,

  /** 2 = RLE 4-bit/pixel */
  BI_RLE4 = 2,

  /** 3 = Bit fields (not OS22XBITMAPHEADER (size 64)) */
  BI_BITFIELDS = 3,

  /** 3 = Huffman 1D (if OS22XBITMAPHEADER (size 64)) */
  BI_HUFFMAN_1D = 3,

  /** 4 = JPEG (not OS22XBITMAPHEADER (size 64)) */
  BI_JPEG = 4,

  /** 4 = RLE 24-bit/pixel (if OS22XBITMAPHEADER (size 64)) */
  BI_RLE24 = 4,

  /** 5 = PNG */
  BI_PNG = 5,

  /** 6 = RGBA bit fields */
  BI_ALPHABITFIELDS = 6,

  /** 11 = CMYK */
  BI_CMYK = 11,

  /** 12 = CMYK RLE-8 */
  BI_CMYKRLE8 = 12,

  /** 13 = CMYK RLE-4 */
  BI_CMYKRLE4 = 13
}

export namespace Compression {
  export function typeOf(value: number | BmpHeaderDirectory, headerSize?: number) {
    if (typeof value == "number") {
      switch (value) {
        case 0:
          return Compression.BI_RGB;
        case 1:
          return Compression.BI_RLE8;
        case 2:
          return Compression.BI_RLE4;
        case 3:
          return headerSize == 64 ? Compression.BI_HUFFMAN_1D : Compression.BI_BITFIELDS;
        case 4:
          return headerSize == 64 ? Compression.BI_RLE24 : Compression.BI_JPEG;
        case 5:
          return Compression.BI_PNG;
        case 6:
          return Compression.BI_ALPHABITFIELDS;
        case 11:
          return Compression.BI_CMYK;
        case 12:
          return Compression.BI_CMYKRLE8;
        case 13:
          return Compression.BI_CMYKRLE4;
        default:
          return null;
      }
    } else {
      let value1 = value.getInteger(BmpHeaderDirectory.TAG_COMPRESSION)
      if (value1 == null) {
        return null;
      }
      let headerSize = value.getInteger(BmpHeaderDirectory.TAG_HEADER_SIZE)
      if (headerSize == null) {
        return null;
      }
      switch (value1) {
        case 0:
          return Compression.BI_RGB;
        case 1:
          return Compression.BI_RLE8;
        case 2:
          return Compression.BI_RLE4;
        case 3:
          return headerSize == 64 ? Compression.BI_HUFFMAN_1D : Compression.BI_BITFIELDS;
        case 4:
          return headerSize == 64 ? Compression.BI_RLE24 : Compression.BI_JPEG;
        case 5:
          return Compression.BI_PNG;
        case 6:
          return Compression.BI_ALPHABITFIELDS;
        case 11:
          return Compression.BI_CMYK;
        case 12:
          return Compression.BI_CMYKRLE8;
        case 13:
          return Compression.BI_CMYKRLE4;
        default:
          return null;
      }

    }

  }

  export function toString(compression: Compression) {
    switch (compression) {
      case Compression.BI_RGB:
        return "None";
      case Compression.BI_RLE8:
        return "RLE 8-bit/pixel";
      case Compression.BI_RLE4:
        return "RLE 4-bit/pixel";
      case Compression.BI_BITFIELDS:
        return "Bit Fields";
      case Compression.BI_HUFFMAN_1D:
        return "Huffman 1D";
      case Compression.BI_JPEG:
        return "JPEG";
      case Compression.BI_RLE24:
        return "RLE 24-bit/pixel";
      case Compression.BI_PNG:
        return "PNG";
      case Compression.BI_ALPHABITFIELDS:
        return "RGBA Bit Fields";
      case Compression.BI_CMYK:
        return "CMYK Uncompressed";
      case Compression.BI_CMYKRLE8:
        return "CMYK RLE-8";
      case Compression.BI_CMYKRLE4:
        return "CMYK RLE-4";
      default:
        throw new Error("Unimplemented compression type " + compression);
    }
  }
}