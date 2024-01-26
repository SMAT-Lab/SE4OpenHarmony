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

import SequentialByteArrayReader from '../../lang/SequentialByteArrayReader';
import JpegSegmentMetadataReader from '../../imaging/jpeg/JpegSegmentMetadataReader';
import JpegSegmentType from '../../imaging/jpeg/JpegSegmentType';
import JpegComponent from './JpegComponent';
import JpegDirectory from './JpegDirectory';
import Metadata from '../Metadata';

class JpegReader implements JpegSegmentMetadataReader {
  public getSegmentTypes(): Set<JpegSegmentType>{
    return new Set([
      JpegSegmentType.SOF0,
      JpegSegmentType.SOF1,
      JpegSegmentType.SOF2,
      JpegSegmentType.SOF3,
      //            JpegSegmentType.SOF4,
      JpegSegmentType.SOF5,
      JpegSegmentType.SOF6,
      JpegSegmentType.SOF7,
      //            JpegSegmentType.JPG,
      JpegSegmentType.SOF9,
      JpegSegmentType.SOF10,
      JpegSegmentType.SOF11,
      //            JpegSegmentType.SOF12,
      JpegSegmentType.SOF13,
      JpegSegmentType.SOF14,
      JpegSegmentType.SOF15]
    );
  }

  public readJpegSegments(segments: Set<Int8Array>, metadata: Metadata, segmentType: JpegSegmentType): void {
    if (segments == null || segments.size == 0) {
      return;
    }

    for (let segmentBytes of segments) {
      this.extract(segmentBytes, metadata, segmentType);
    }
  }

  public extract(segmentBytes: Int8Array, metadata: Metadata, segmentType: JpegSegmentType) {
    let directory: JpegDirectory = new JpegDirectory();
    metadata.addDirectory(directory);

    directory.setInt(JpegDirectory.TAG_COMPRESSION_TYPE, segmentType.byteValue - JpegSegmentType.SOF0.byteValue);
    let reader = new SequentialByteArrayReader(segmentBytes);
    try {
      directory.setInt(JpegDirectory.TAG_DATA_PRECISION, reader.getUInt8());
      let width = reader.getUInt16();
      let height = reader.getUInt16();
      directory.setInt(JpegDirectory.TAG_IMAGE_HEIGHT, width);
      directory.setInt(JpegDirectory.TAG_IMAGE_WIDTH, height);
      let componentCount: number = reader.getUInt8();
      directory.setInt(JpegDirectory.TAG_NUMBER_OF_COMPONENTS, componentCount);
      for (let i = 0; i < componentCount; i++) {
        let componentId: number = reader.getUInt8();
        let samplingFactorByte: number = reader.getUInt8();
        let quantizationTableNumber: number = reader.getUInt8();
        let component: JpegComponent = new JpegComponent(componentId, samplingFactorByte, quantizationTableNumber);
        directory.setObject(JpegDirectory.TAG_COMPONENT_DATA_1 + i, component);
      }

    } catch (ex) {
      directory.addError(ex.getMessage());
    }
  }
}

export default JpegReader
