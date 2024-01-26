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

import JpegSegmentMetadataReader from '../../imaging/jpeg/JpegSegmentMetadataReader';
import JpegSegmentType from '../../imaging/jpeg/JpegSegmentType';
import MetadataReader from '../MetadataReader';
import Metadata from '../Metadata';
import ByteArrayReader from '../../lang/ByteArrayReader';
import RandomAccessReader from '../../lang/RandomAccessReader';
import Directory from '../Directory';
import DateUtil from '../../lang/DateUtil';
import IccDirectory from './IccDirectory';

class IccReader implements JpegSegmentMetadataReader, MetadataReader {
  public static readonly JPEG_SEGMENT_PREAMBLE: string = 'ICC_PROFILE';

  public getSegmentTypes(): Set<JpegSegmentType> {
    return new Set<JpegSegmentType>([JpegSegmentType.APP2]);
  }

  public readJpegSegments(segments: Set<Int8Array>, metadata: Metadata, segmentType: JpegSegmentType): void {
    let preambleLength: number = IccReader.JPEG_SEGMENT_PREAMBLE.length;

    // ICC data can be spread across multiple JPEG segments.
    // We concat them together in this buffer for later processing.
    let buffer: Int8Array = null;

    for (let segmentBytes of segments) {
      // Skip any segments that do not contain the required preamble
      if (segmentBytes.length < preambleLength || IccReader.JPEG_SEGMENT_PREAMBLE != new String(segmentBytes).substring(0, preambleLength)) {
        continue;
      }

      // NOTE we ignore three bytes here -- are they useful for anything?
      // Grow the buffer
      if (buffer == null) {
        let data: Int8Array = new Int8Array(segmentBytes.length - 14);
        // skip the first 14 bytes
        data.set(segmentBytes.slice(14, segmentBytes.length), 0);
        buffer = data;
      } else {
        let data = new Int8Array(buffer.length + segmentBytes.length - 14);
        data.set(buffer.slice(0, buffer.length), 0);
        data.set(segmentBytes.slice(14, segmentBytes.length), buffer.length)

        /*System.arraycopy(buffer, 0, newBuffer, 0, buffer.length);
        System.arraycopy(segmentBytes, 14, newBuffer, buffer.length, segmentBytes.length - 14);*/
        buffer = data;
      }
    }

    if (buffer != null) {
      this.extract(new ByteArrayReader(buffer), metadata);
    }
  }

  public extract(reader: RandomAccessReader, metadata: Metadata, parentDirectory?: Directory): void {
    // TODO review whether the 'tagPtr' values below really do require RandomAccessReader or whether SequentialReader may be used instead
    let directory: IccDirectory = new IccDirectory();

    if (parentDirectory != null) {
      directory.setParent(parentDirectory);
    }

    try {
      let profileByteCount: number = reader.getInt32(IccDirectory.TAG_PROFILE_BYTE_COUNT);
      directory.setInt(IccDirectory.TAG_PROFILE_BYTE_COUNT, profileByteCount);

      // For these tags, the int value of the tag is in fact it's offset within the buffer.
      this.set4ByteString(directory, IccDirectory.TAG_CMM_TYPE, reader);
      this.setInt32(directory, IccDirectory.TAG_PROFILE_VERSION, reader);
      this.set4ByteString(directory, IccDirectory.TAG_PROFILE_CLASS, reader);
      this.set4ByteString(directory, IccDirectory.TAG_COLOR_SPACE, reader);
      this.set4ByteString(directory, IccDirectory.TAG_PROFILE_CONNECTION_SPACE, reader);
      this.setDate(directory, IccDirectory.TAG_PROFILE_DATETIME, reader);
      this.set4ByteString(directory, IccDirectory.TAG_SIGNATURE, reader);
      this.set4ByteString(directory, IccDirectory.TAG_PLATFORM, reader);
      this.setInt32(directory, IccDirectory.TAG_CMM_FLAGS, reader);
      this.set4ByteString(directory, IccDirectory.TAG_DEVICE_MAKE, reader);

      let temp: number = reader.getInt32(IccDirectory.TAG_DEVICE_MODEL);
      if (temp != 0) {
        if (temp <= 0x20202020) {
          directory.setInt(IccDirectory.TAG_DEVICE_MODEL, temp);
        } else {
          directory.setString(IccDirectory.TAG_DEVICE_MODEL, IccReader.getStringFromInt32(temp));
        }
      }

      this.setInt32(directory, IccDirectory.TAG_RENDERING_INTENT, reader);
      this.setInt64(directory, IccDirectory.TAG_DEVICE_ATTR, reader);

      let xyz: number[] = [
        reader.getS15Fixed16(IccDirectory.TAG_XYZ_VALUES),
        reader.getS15Fixed16(IccDirectory.TAG_XYZ_VALUES + 4),
        reader.getS15Fixed16(IccDirectory.TAG_XYZ_VALUES + 8)

      ];
      directory.setObject(IccDirectory.TAG_XYZ_VALUES, xyz);

      // Process 'ICC tags'
      let tagCount: number = reader.getInt32(IccDirectory.TAG_TAG_COUNT);
      directory.setInt(IccDirectory.TAG_TAG_COUNT, tagCount);

      for (let i = 0; i < tagCount; i++) {
        let pos: number = IccDirectory.TAG_TAG_COUNT + 4 + i * 12;
        let tagType: number = reader.getInt32(pos);
        let tagPtr: number = reader.getInt32(pos + 4);
        let tagLen: number = reader.getInt32(pos + 8);
        let b: Int8Array = reader.getBytes(tagPtr, tagLen);
        directory.setByteArray(tagType, b);
      }
    } catch (error) {
      throw new Error("Exception reading ICC profile: " + error);
    }

    metadata.addDirectory(directory);
  }

  private set4ByteString(directory: Directory, tagType: number, reader: RandomAccessReader): void {
    let i: number = reader.getInt32(tagType);
    if (i != 0) {
      directory.setString(tagType, IccReader.getStringFromInt32(i));
    }
  }

  private setInt32(directory: Directory, tagType: number, reader: RandomAccessReader): void {
    let i: number = reader.getInt32(tagType);
    if (i != 0) {
      directory.setInt(tagType, i);
    }
  }

  private setInt64(directory: Directory, tagType: number, reader: RandomAccessReader): void {
    let l: number = reader.getInt64(tagType);
    if (l != 0) {
      directory.setLong(tagType, l);
    }
  }

  private setDate(directory: Directory, tagType: number, reader: RandomAccessReader): void {
    let y: number = reader.getUInt16(tagType);
    let m: number = reader.getUInt16(tagType + 2);
    let d: number = reader.getUInt16(tagType + 4);
    let h: number = reader.getUInt16(tagType + 6);
    let M: number = reader.getUInt16(tagType + 8);
    let s: number = reader.getUInt16(tagType + 10);

    if (DateUtil.isValidDate(y, m - 1, d) && DateUtil.isValidTime(h, M, s)) {
      let dateString: string = y + ":" + m + ":" + d + " " + h + ":" + M + ":" + s;
      directory.setString(tagType, dateString);
    } else {
      directory.addError("ICC data describes an invalid date/time: year=" + y + " month=" + m + " day=" + d
      + " hour=" + h + " minute=" + M + " second=" + s);
    }
  }

  public static getStringFromInt32(d: number): string {
    // MSB
    let b: Int8Array[] = [
      new Int8Array([(d & 0xFF000000) >> 24]),
      new Int8Array([(d & 0x00FF0000) >> 16]),
      new Int8Array([(d & 0x0000FF00) >> 8]),
      new Int8Array([(d & 0x000000FF)]),
    ];
    return b.toString();
  }
}

export default IccReader;