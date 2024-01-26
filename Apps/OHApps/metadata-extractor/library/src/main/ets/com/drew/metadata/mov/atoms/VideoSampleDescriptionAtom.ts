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

import Atom from './Atom'
import QuickTimeDictionary from '../QuickTimeDictionary'
import QuickTimeVideoDirectory from '../media/QuickTimeVideoDirectory'
import SampleDescription from './SampleDescription'
import SampleDescriptionAtom from './SampleDescriptionAtom'
import SequentialReader from '../../../lang/SequentialReader'

class VideoSampleDescriptionAtom extends SampleDescriptionAtom<InstanceType<typeof VideoSampleDescriptionAtom.VideoSampleDescription>> {
  public constructor(reader: SequentialReader, atom: Atom) {
    super(reader, atom);
  }

  getSampleDescription(reader: SequentialReader): InstanceType<typeof VideoSampleDescriptionAtom.VideoSampleDescription> {
    return new VideoSampleDescriptionAtom.VideoSampleDescription(reader);
  }

  public addMetadata(directory: QuickTimeVideoDirectory): void {
    let sampleDescription: InstanceType<typeof VideoSampleDescriptionAtom.VideoSampleDescription> = this.sampleDescriptions[0];

    QuickTimeDictionary.setLookup(QuickTimeVideoDirectory.TAG_VENDOR, sampleDescription.vendor, directory);
    QuickTimeDictionary.setLookup(QuickTimeVideoDirectory.TAG_COMPRESSION_TYPE, sampleDescription.dataFormat, directory);

    directory.setLong(QuickTimeVideoDirectory.TAG_TEMPORAL_QUALITY, sampleDescription.temporalQuality);
    directory.setLong(QuickTimeVideoDirectory.TAG_SPATIAL_QUALITY, sampleDescription.spatialQuality);
    directory.setInt(QuickTimeVideoDirectory.TAG_WIDTH, sampleDescription.width);
    directory.setInt(QuickTimeVideoDirectory.TAG_HEIGHT, sampleDescription.height);

    let compressorName: string = sampleDescription.compressorName.trim();
    if (compressorName.length != 0) {
      directory.setString(QuickTimeVideoDirectory.TAG_COMPRESSOR_NAME, compressorName);
    }

    directory.setInt(QuickTimeVideoDirectory.TAG_DEPTH, sampleDescription.depth);
    directory.setInt(QuickTimeVideoDirectory.TAG_COLOR_TABLE, sampleDescription.colorTableID);

    let horizontalInteger: number = (sampleDescription.horizontalResolution & 0xFFFF0000) >> 16;
    let horizontalFraction: number = (sampleDescription.horizontalResolution & 0xFFFF) / Math.pow(2, 4);
    directory.setDouble(QuickTimeVideoDirectory.TAG_HORIZONTAL_RESOLUTION, horizontalInteger + horizontalFraction);

    let verticalInteger: number = (sampleDescription.verticalResolution & 0xFFFF0000) >> 16;
    let verticalFraction: number = (sampleDescription.verticalResolution & 0xFFFF) / Math.pow(2, 4);
    directory.setDouble(QuickTimeVideoDirectory.TAG_VERTICAL_RESOLUTION, verticalInteger + verticalFraction);
  }

  static VideoSampleDescription = class extends SampleDescription {
    version: number;
    revisionLevel: number;
    vendor: string;
    temporalQuality: number;
    spatialQuality: number;
    width: number;
    height: number;
    horizontalResolution: number;
    verticalResolution: number;
    dataSize: number;
    frameCount: number;
    compressorName: string;
    depth: number;
    colorTableID: number;
    public constructor(reader: SequentialReader) {
      super(reader);

      this.version = reader.getUInt16();
      this.revisionLevel = reader.getUInt16();
      this.vendor = reader.getString(4);
      this.temporalQuality = reader.getUInt32();
      this.spatialQuality = reader.getUInt32();
      this.width = reader.getUInt16();
      this.height = reader.getUInt16();
      this.horizontalResolution = reader.getUInt32();
      this.verticalResolution = reader.getUInt32();
      this.dataSize = reader.getUInt32();
      this.frameCount = reader.getUInt16();
      this.compressorName = reader.getString(32);
      this.depth = reader.getUInt16();
      this.colorTableID = reader.getInt16();
    }
  }
}

export default VideoSampleDescriptionAtom