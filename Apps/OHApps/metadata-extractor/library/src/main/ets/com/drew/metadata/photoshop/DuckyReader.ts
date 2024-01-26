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

import Metadata from '../Metadata';
import SequentialReader from '../../lang/SequentialReader';
import SequentialByteArrayReader from '../../lang/SequentialByteArrayReader';
import JpegSegmentType from '../../imaging/jpeg/JpegSegmentType';
import JpegSegmentMetadataReader from '../../imaging/jpeg/JpegSegmentMetadataReader';
import DuckyDirectory from './DuckyDirectory'
import Charsets from '../../lang/Charsets'

export default class DuckyReader implements JpegSegmentMetadataReader {
  private static readonly JPEG_SEGMENT_PREAMBLE: string = "Ducky";

  public getSegmentTypes(): Set<JpegSegmentType>
  {
    return new Set<JpegSegmentType>([JpegSegmentType.APPE]);
  }

  public readJpegSegments(segments: Set<Int8Array>, metadata: Metadata, segmentType: JpegSegmentType): void
  {
    let preambleLength: number = DuckyReader.JPEG_SEGMENT_PREAMBLE.length;


    for(let segmentBytes of segments) {
      // Ensure data starts with the necessary preamble
      let temp = segmentBytes.subarray(0, preambleLength).toString()
      if (segmentBytes.length < preambleLength || DuckyReader.JPEG_SEGMENT_PREAMBLE != temp)
      continue;

      this.extract(
        new SequentialByteArrayReader(segmentBytes, preambleLength),
        metadata);
    }

  }

  public extract(reader: SequentialReader, metadata: Metadata): void
  {
    let directory: DuckyDirectory = new DuckyDirectory();
    metadata.addDirectory(directory);

    try {
      while (true) {
        let tag = reader.getUInt16();

        // End of Segment is marked with zero
        if (tag == 0)
        break;

        let length = reader.getUInt16();

        switch (tag) {
          case DuckyDirectory.TAG_QUALITY:
          {
            if (length != 4) {
              directory.addError("Unexpected length for the quality tag");
              return;
            }
            directory.setInt(tag, reader.getInt32());
            break;
          }
          case DuckyDirectory.TAG_COMMENT:
          case DuckyDirectory.TAG_COPYRIGHT:
          {
            reader.skip(4);
            directory.setStringValue(tag, reader.getStringValue(length - 4, Charsets.UTF_16BE));
            break;
          }
          default:
            {
              // Unexpected tag
              directory.setByteArray(tag, reader.getBytes(length));
              break;
            }
        }
      }
    }
    catch (error) {
      directory.addError(JSON.stringify(error));
    }
  }
}