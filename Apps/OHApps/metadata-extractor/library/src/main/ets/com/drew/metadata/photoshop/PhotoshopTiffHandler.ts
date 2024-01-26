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

import ByteArrayReader from '../../lang/ByteArrayReader'
import RandomAccessReader from '../../lang/RandomAccessReader'
import SequentialByteArrayReader from '../../lang/SequentialByteArrayReader'
import Directory from '../Directory'
import Metadata from '../Metadata'
import ExifTiffHandler from '../exif/ExifTiffHandler'
import IccReader from '../icc/IccReader'
import XmpReader from '../xmp/XmpReader'
import PhotoshopReader from './PhotoshopReader'

class PhotoshopTiffHandler extends ExifTiffHandler {
  // Photoshop-specific Tiff Tags
  private static TAG_PAGE_MAKER_EXTENSION = 0x014A;
  private static TAG_JPEG_TABLES = 0X01B5;
  private static TAG_XMP = 0x02BC;
  private static TAG_FILE_INFORMATION = 0x83BB;
  private static TAG_PHOTOSHOP_IMAGE_RESOURCES = 0x8649;
  private static TAG_EXIF_IFD_POINTER = 0x8769;
  private static TAG_ICC_PROFILES = 0x8773;
  private static TAG_EXIF_GPS = 0x8825;
  private static TAG_T_IMAGE_SOURCE_DATA = 0x935C;
  private static TAG_T_ANNOTATIONS = 0xC44F;

  constructor(metadata: Metadata, parentDirectory: Directory) {
    super(metadata, parentDirectory);
  }

  public customProcessTag(tagOffset: number, processedIfdOffsets: Set<number>, tiffHeaderOffset: number,
                          reader: RandomAccessReader, tagId: number, byteCount: number): boolean {
    switch (tagId) {
      case PhotoshopTiffHandler.TAG_XMP:
        new XmpReader().extract(reader.getBytes(tagOffset, byteCount), null, null, this._metadata, null);
        return true;
      case PhotoshopTiffHandler.TAG_PHOTOSHOP_IMAGE_RESOURCES:
        new PhotoshopReader().extract(new SequentialByteArrayReader(reader.getBytes(tagOffset, byteCount)), byteCount, this._metadata);
        return true;
      case PhotoshopTiffHandler.TAG_ICC_PROFILES:
        new IccReader().extract(new ByteArrayReader(reader.getBytes(tagOffset, byteCount)), this._metadata);
        return true;
    }
    return super.customProcessTag(tagOffset, processedIfdOffsets, tiffHeaderOffset, reader, tagId, byteCount);
  }
}

export default PhotoshopTiffHandler