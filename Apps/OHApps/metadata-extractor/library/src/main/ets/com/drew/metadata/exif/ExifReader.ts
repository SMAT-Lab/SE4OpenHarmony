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

import ExifTiffHandler from './ExifTiffHandler';
import TiffReader from '../../imaging/tiff/TiffReader';
import ByteArrayReader from '../../lang/ByteArrayReader';
import Directory from '../Directory';
import RandomAccessReader from '../../lang/RandomAccessReader';
import StringUtil from '../../lang/StringUtil';
import JpegSegmentType from '../../imaging/jpeg/JpegSegmentType';
import Metadata from '../Metadata';
import JpegSegmentMetadataReader from '../../imaging/jpeg/JpegSegmentMetadataReader'

class ExifReader implements JpegSegmentMetadataReader {
  /** Exif data stored in JPEG files' APP1 segment are preceded by this six character preamble "Exif\0\0". */
  public static readonly JPEG_SEGMENT_PREAMBLE: string = "Exif\0\0";

  public constructor(){

  }
  public getSegmentTypes(): Set<JpegSegmentType>
  {
      return new Set<JpegSegmentType>([JpegSegmentType.APP1]);
  }

  public readJpegSegments(segments: Set<Int8Array>, metadata: Metadata, segmentType: JpegSegmentType):void {

    for (let segmentBytes of segments) {
      // Segment must have the expected preamble
      if (ExifReader.startsWithJpegExifPreamble(segmentBytes)) {
        this.extract(new ByteArrayReader(segmentBytes), metadata, ExifReader.JPEG_SEGMENT_PREAMBLE.length);
      }
    }
  }

  /** Indicates whether 'bytes' starts with 'JpegSegmentPreamble'. */
  public static startsWithJpegExifPreamble(bytes: Int8Array): boolean
  {
    if (bytes.length < ExifReader.JPEG_SEGMENT_PREAMBLE.length) {
      return false
    }
    if (StringUtil.compare(StringUtil.utf8ByteToUnicodeStr(bytes), ExifReader.JPEG_SEGMENT_PREAMBLE) != 0) {
      return false
    }
    return true
  }

  /** Reads TIFF formatted Exif data at a specified offset within a {@link RandomAccessReader}. */
  public extract(reader: RandomAccessReader, metadata: Metadata, readerOffset?: number, parentDirectory?: Directory): void
  {
    if (parentDirectory == undefined) {
      parentDirectory = null
    }
    let exifTiffHandler: ExifTiffHandler = new ExifTiffHandler(metadata, parentDirectory);

    try {
//       Read the TIFF-formatted Exif data
      new TiffReader().processTiff(
        reader,
        exifTiffHandler,
        readerOffset
      );
    } catch (e) {
      throw new Error("Exception processing TIFF data");
    }
  }
}

export default ExifReader
