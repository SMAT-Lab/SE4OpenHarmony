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

import fileio from '@ohos.fileio';
import StreamReader from '../../lang/StreamReader';
import JpegSegmentData from './JpegSegmentData'
import JpegSegmentType from './JpegSegmentType'
import SequentialReader from '../../lang/SequentialReader'

class JpegSegmentReader {
  public static readonly SEGMENT_IDENTIFIER: number = -1;
  public static readonly SEGMENT_SOS: number = -38;
  public static readonly MARKER_EOI: number = -39;

  public static readSegments(filePath: string, reader?: SequentialReader, segmentTypes?: Set<JpegSegmentType>): JpegSegmentData {
    let stream = fileio.createStreamSync(filePath, 'r+');
    try {
      reader = new StreamReader(filePath);
      let magicNumber: number = reader.getUInt16();
      if (magicNumber != 0xFFD8) {
        throw new Error("JPEG data is expected to begin with 0xFFD8 (ÿØ) not 0x")
      }

      let segmentTypeBytes:Set<number> = null;
      if (segmentTypes != null) {
        segmentTypeBytes = new  Set<number>();
        for (let segmentType of  segmentTypes) {
          segmentTypeBytes.add(segmentType.byteValue);
        }
      }
      let segmentData: JpegSegmentData = new JpegSegmentData();

      do {
        let segmentIdentifier: number = reader.getInt8();
        let segmentType: number = reader.getInt8();

        while (segmentIdentifier != JpegSegmentReader.SEGMENT_IDENTIFIER || segmentType == JpegSegmentReader.SEGMENT_IDENTIFIER || segmentType == 0) {
          segmentIdentifier = segmentType;
          segmentType = reader.getInt8();
        }
        if (segmentType == JpegSegmentReader.SEGMENT_SOS) {

          return segmentData;
        }

        if (segmentType == JpegSegmentReader.MARKER_EOI) {
          return segmentData;
        }

        let segmentLength: number = reader.getUInt16();

        segmentLength -= 2;

        if (segmentLength < 0)
        throw new Error("JPEG segment size would be less than zero");

        if (segmentTypeBytes == null || segmentTypeBytes.has(segmentType)) {
          let segmentBytes: Int8Array = reader.getBytes(segmentLength);
          segmentData.addSegment(segmentType, segmentBytes);
        } else {
          if (!reader.trySkip(segmentLength)) {
            // If skipping failed, just return the segments we found so far
            return segmentData;
          }
        }

      } while (true);
    } finally {
      stream.closeSync();
    }
  }

  constructor() {
    throw new Error("Not intended for instantiation.");
  }
}

export default JpegSegmentReader