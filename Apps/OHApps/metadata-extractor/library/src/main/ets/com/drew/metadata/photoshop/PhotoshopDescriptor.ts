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

import PhotoshopDirectory from './PhotoshopDirectory';
import TagDescriptor from '../TagDescriptor';
import RandomAccessReader from '../../lang/RandomAccessReader';
import ByteArrayReader from '../../lang/ByteArrayReader';
import Charsets from '../../lang/Charsets';
import Knot from './Knot'
import Subpath from './Subpath'

class PhotoshopDescriptor extends TagDescriptor<PhotoshopDirectory> {
  constructor(directory: PhotoshopDirectory) {
    super(directory);
  }

  public getDescription(tagType: number): string {
    switch (tagType) {
      case PhotoshopDirectory.TAG_THUMBNAIL:
      case PhotoshopDirectory.TAG_THUMBNAIL_OLD:
        return this.getThumbnailDescription(tagType);
      case PhotoshopDirectory.TAG_URL:
      case PhotoshopDirectory.TAG_XML:
        return this.getSimpleString(tagType);
      case PhotoshopDirectory.TAG_IPTC:
        return this.getBinaryDataString(tagType);
      case PhotoshopDirectory.TAG_SLICES:
        return this.getSlicesDescription();
      case PhotoshopDirectory.TAG_VERSION:
        return this.getVersionDescription();
      case PhotoshopDirectory.TAG_COPYRIGHT:
        return this.getBooleanString(tagType);
      case PhotoshopDirectory.TAG_RESOLUTION_INFO:
        return this.getResolutionInfoDescription();
      case PhotoshopDirectory.TAG_GLOBAL_ANGLE:
      case PhotoshopDirectory.TAG_GLOBAL_ALTITUDE:
      case PhotoshopDirectory.TAG_URL_LIST:
      case PhotoshopDirectory.TAG_SEED_NUMBER:
        return this.get32BitNumberString(tagType);
      case PhotoshopDirectory.TAG_JPEG_QUALITY:
        return this.getJpegQualityString();
      case PhotoshopDirectory.TAG_PRINT_SCALE:
        return this.getPrintScaleDescription();
      case PhotoshopDirectory.TAG_PIXEL_ASPECT_RATIO:
        return this.getPixelAspectRatioString();
      case PhotoshopDirectory.TAG_CLIPPING_PATH_NAME:
        return this.getClippingPathNameString(tagType);
      default:
        if (tagType >= 0x07D0 && tagType <= 0x0BB6) {
          return this.getPathString(tagType);
        }
        return super.getDescription(tagType);
    }
  }

  public getJpegQualityString(): string {
    try {
      let b = this._directory.getByteArray(PhotoshopDirectory.TAG_JPEG_QUALITY);

      if (b == null) {
        return this._directory.getString(PhotoshopDirectory.TAG_JPEG_QUALITY);
      }

      let reader = new ByteArrayReader(b);
      let q = reader.getUInt16(0); // & 0xFFFF;
      let f = reader.getUInt16(2); // & 0xFFFF;
      let s = reader.getUInt16(4);

      let q1 = q <= 0xFFFF && q >= 0xFFFD
          ? q - 0xFFFC
          : q <= 8
              ? q + 4
              : q;

      let quality: string
      switch (q) {
        case 0xFFFD:
        case 0xFFFE:
        case 0xFFFF:
        case 0:
          quality = "Low";
          break;
        case 1:
        case 2:
        case 3:
          quality = "Medium";
          break;
        case 4:
        case 5:
          quality = "High";
          break;
        case 6:
        case 7:
        case 8:
          quality = "Maximum";
          break;
        default:
          quality = "Unknown";
      }

      let format: string
      switch (f) {
        case 0x0000:
          format = "Standard";
          break;
        case 0x0001:
          format = "Optimised";
          break;
        case 0x0101:
          format = "Progressive";
          break;
        default:
          format = "Unknown" + "0x%04X".replace(/0x%04X/, f.toString());
      }

      let scans = s >= 1 && s <= 3
           ? parseInt((s + 2).toString()).toString()
           : "Unknown" + "0x%04X".replace(/0x%04X/, s.toString());

      return parseInt(q1.toString()) + " (" + quality + "), " + format + "format, " + scans + " scans"
    } catch (e) {
       return null;
    }
  }

  public getPixelAspectRatioString(): string {
    try {
      let bytes = this._directory.getByteArray(PhotoshopDirectory.TAG_PIXEL_ASPECT_RATIO);
      if (bytes == null) {
        return null;
      }
      let reader = new ByteArrayReader(bytes);
      let d = reader.getDouble64(4);
      return d.toString();
    } catch (e) {
        return null;
    }
  }

  public getPrintScaleDescription(): string {
    try {
      let bytes = this._directory.getByteArray(PhotoshopDirectory.TAG_PRINT_SCALE);
      if (bytes == null) {
        return null;
      }
      let reader = new ByteArrayReader(bytes);
      let style = reader.getInt32(0);
      let locX = reader.getFloat32(2);
      let locY = reader.getFloat32(6);
      let scale = reader.getFloat32(10);
      switch (style) {
        case 0:
          return "Centered, Scale " + scale;
        case 1:
          return "Size to fit";
        case 2:
          return "User defined, X:" + locX.toString() + " Y:" + locY.toString() + ", Scale:" + scale.toString()
        default:
          return "Unknown " + "%04X".replace(/%04X/, style.toString()) + ", X:" +
                   locX.toString() + " Y:" + locY.toString() + ", Scale:" + scale.toString()
      }
    } catch (e) {
        return null;
    }
  }

  public getResolutionInfoDescription(): string {
    try {
      let bytes = this._directory.getByteArray(PhotoshopDirectory.TAG_RESOLUTION_INFO);
      if (bytes == null) {
        return null;
      }
      let reader = new ByteArrayReader(bytes);
      let resX = reader.getS15Fixed16(0);
      let resY = reader.getS15Fixed16(8); // is this the correct offset? it's only reading 4 bytes each time
      return resX.toFixed(2).toString() + "x" + resY.toFixed(2).toString() + " DPI";
    } catch (e) {
        return null;
    }
  }

  public getVersionDescription(): string {
    try {
      let bytes = this._directory.getByteArray(PhotoshopDirectory.TAG_VERSION);
      if (bytes == null) {
        return null;
      }
      let reader = new ByteArrayReader(bytes);
      let pos = 0;
      let ver = reader.getInt32(0);
      pos += 4;
      pos++;
      let readerLength = reader.getInt32(5);
      pos += 4;
      let readerStr = reader.getString(9, readerLength * 2, "UTF-16");
      pos += readerLength * 2;
      let writerLength = reader.getInt32(pos);
      pos += 4;
      let writerStr = reader.getString(pos, writerLength * 2, "UTF-16");
      pos += writerLength * 2;
      let fileVersion = reader.getInt32(pos);
        return parseInt(ver.toString()).toString() + " (" + readerStr + ", " + writerStr + ") " + parseInt(fileVersion.toString()).toString()
    } catch (e) {
        return null;
    }
  }

  public getSlicesDescription(): string {
    try {
      let bytes = this._directory.getByteArray(PhotoshopDirectory.TAG_SLICES);
      if (bytes == null) {
        return null;
      }
      let reader = new ByteArrayReader(bytes);
      let nameLength = reader.getInt32(20);
      let name = reader.getString(24, nameLength * 2, "UTF-16");
      let pos = 24 + nameLength * 2;
      let sliceCount = reader.getInt32(pos);
      return name + " (" + parseInt(reader.getInt32(4).toString()).toString() + "," +
               parseInt(reader.getInt32(8).toString()).toString() + "," +
               parseInt(reader.getInt32(12).toString()).toString() + "," +
               parseInt(reader.getInt32(16).toString()).toString() + ") " +
               parseInt(sliceCount.toString()).toString() + " Slices"
    } catch (e) {
        return null;
    }
  }

  public getThumbnailDescription(tagType: number) : string {
    try {
      let v = this._directory.getByteArray(tagType);
      if (v == null) {
        return null;
      }
      let reader = new ByteArrayReader(v);
      let format = reader.getInt32(0);
      let width = reader.getInt32(4);
      let height = reader.getInt32(8);
      //skip WidthBytes
      let totalSize = reader.getInt32(16);
      let compSize = reader.getInt32(20);
      let bpp = reader.getInt32(24);
      //skip Number of planes
      return (format == 1 ? "JpegRGB" : "RawRGB") + ", " + parseInt(width.toString()).toString() + "x" +
               parseInt(height.toString()).toString() + ", Decomp " +
               parseInt(totalSize.toString()).toString() + " bytes, " +
               parseInt(bpp.toString()).toString() + " bpp, " +
               parseInt(compSize.toString()).toString() + " bytes"
    } catch (e) {
        return null;
    }
  }

  private getBooleanString(tag: number): string {
    let bytes = this._directory.getByteArray(tag);
    if (bytes == null || bytes.length == 0) {
      return null;
    }
    return bytes[0] == 0 ? "No" : "Yes";
  }

  private get32BitNumberString(tag: number): string {
    let bytes = this._directory.getByteArray(tag);
    if (bytes == null) {
      return null;
    }
    let reader = new ByteArrayReader(bytes);
    try {
      return parseInt(reader.getInt32(0).toString()).toString()
    } catch (e) {
        return null;
    }
  }

  private getSimpleString(tagType: number): string {
    let bytes = this._directory.getByteArray(tagType);
    if (bytes == null) {
      return null;
    }
    return new String(bytes).toString();
  }

  private getBinaryDataString(tagType: number): string {
    let bytes = this._directory.getByteArray(tagType);
    if (bytes == null) {
      return null;
    }
    return parseInt(bytes.length.toString()).toString() + " bytes binary data"
  }

  public getClippingPathNameString(tagType: number): string {
    try {
      let bytes = this._directory.getByteArray(tagType);
      if (bytes == null) {
        return null;
      }
      let reader = new ByteArrayReader(bytes);
      let length = reader.getByte(0);
      return new String(reader.getBytes(1, length)).toString();
    } catch (e) {
        return null;
    }
  }

  public getPathString(tagType: number): string {
    try {
      let bytes = this._directory.getByteArray(tagType);
      if (bytes == null) {
        return null;
      }
      let reader = new ByteArrayReader(bytes);
      let length = (reader.getLength() - reader.getByte(reader.getLength() - 1) - 1) / 26;

      let fillRecord = null;

      // Possible subpaths
      let cSubpath = new Subpath("");
      let oSubpath = new Subpath("");

      let paths: Array<Subpath> = new Array<Subpath>();

      // Loop through each path resource block segment (26-bytes)
      for (let i = 0; i < length; i++) {
         // Spacer takes into account which block is currently being worked on while accessing byte array
        let recordSpacer = 26 * i;
        let selector = reader.getInt16(recordSpacer);

        /*
        * Subpath resource blocks come in 26-byte segments with 9 possible selectors - some selectors
        * are formatted different from others
        *
        *      0 = Closed subpath length record
        *      1 = Closed subpath Bezier knot, linked
        *      2 = Closed subpath Bezier knot, unlinked
        *      3 = Open subpath length record
        *      4 = Open subpath Bezier knot, linked
        *      5 = Open subpath Bezier knot, unlinked
        *      6 = Subpath fill rule record
        *      7 = Clipboard record
        *      8 = Initial fill rule record
        *
        */
        switch (selector) {
          case 0:
            // Insert previous Paths if there are any
            if (cSubpath.size() != 0) {
              paths.push(cSubpath);
            }

             // Make path size accordingly
             cSubpath = new Subpath("Closed Subpath");
             break;
          case 1:
          case 2:
          {
            let knot: Knot;
            if (selector == 1) {
              knot = new Knot("Linked");
            } else {
                knot = new Knot("Unlinked");
            }
            // Insert each point into cSubpath - points are 32-bit signed, fixed point numbers and have 8-bits before the point
            for (let j = 0; j < 6; j++) {
              knot.setPoint(j, reader.getInt8((j * 4) + 2 + recordSpacer) + (reader.getInt24((j * 4) + 3 + recordSpacer) / Math.pow(2.0, 24.0)));
            }
            cSubpath.add(knot);
            break;
          }
          case 3:
            // Insert previous Paths if there are any
            if (oSubpath.size() != 0) {
              paths.push(oSubpath);
            }

            // Make path size accordingly
            oSubpath = new Subpath("Open Subpath");
            break;
          case 4:
          case 5:
          {
            let knot: Knot;
            if (selector == 4) {
              knot = new Knot("Linked");
            } else {
                knot = new Knot("Unlinked");
            }
            // Insert each point into oSubpath - points are 32-bit signed, fixed point numbers and have 8-bits before the point
            for (let j = 0; j < 6; j++) {
              knot.setPoint(j, reader.getInt8((j * 4) + 2 + recordSpacer) + (reader.getInt24((j * 4) + 3 + recordSpacer) / Math.pow(2.0, 24.0)));
            }
            oSubpath.add(knot);
            break;
          }
          case 6:
            break;
          case 7:
            break;
          case 8:
            if (reader.getInt16(2 + recordSpacer) == 1) {
              fillRecord = "with all pixels";
            } else {
               fillRecord = "without all pixels";
            }
            break;
          }
        }

      // Add any more paths that were not added already
      if (cSubpath.size() != 0) {
        paths.push(cSubpath);
      }
      if (oSubpath.size() != 0) {
         paths.push(oSubpath);
      }

      // Extract name (previously appended to end of byte array)
      let nameLength = reader.getByte(reader.getLength() - 1);
      let name = reader.getString(reader.getLength() - nameLength - 1, nameLength, Charsets.ASCII);

      // Build description
      var str: string = '';

      str.concat('"').concat(name).concat('"')
          .concat(" having ");

      if (fillRecord != null) {
        str.concat("initial fill rule \"").concat(fillRecord).concat("\" and ");
      }

      str.concat(paths.length.toString()).concat(paths.length == 1 ? " subpath:" : " subpaths:");

      paths.forEach((path) => {
        str.concat("\n- ").concat(path.getType()).concat(" with ").concat(paths.length.toString()).concat(paths.length == 1 ? " knot:" : " knots:");

        path.getKnots().forEach((knot) => {
          str.concat("\n  - ").concat(knot.getType());
          str.concat(" (").concat(knot.getPoint(0).toString()).concat(",").concat(knot.getPoint(1).toString()).concat(")");
          str.concat(" (").concat(knot.getPoint(2).toString()).concat(",").concat(knot.getPoint(3).toString()).concat(")");
          str.concat(" (").concat(knot.getPoint(4).toString()).concat(",").concat(knot.getPoint(5).toString()).concat(")");
        });
      });

      return str.toString();
    } catch (e) {
         return null;
    }
  }
}

export default PhotoshopDescriptor
