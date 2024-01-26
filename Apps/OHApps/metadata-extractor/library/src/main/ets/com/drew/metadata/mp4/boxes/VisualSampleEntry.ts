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

import SampleEntry from './SampleEntry'
import SequentialReader from '../../../lang/SequentialReader';
import Box from './Box'
import Mp4VideoDirectory from '../media/Mp4VideoDirectory'
import Mp4Dictionary from '../Mp4Dictionary'

export default class VisualSampleEntry extends SampleEntry {
  version: number;
  revisionLevel: number;
  vendor: string;
  temporalQuality: number;
  spatialQuality: number;
  width: number;
  height: number;
  horizresolution: number;
  vertresolution: number;
  frameCount: number;
  compressorname: string;
  depth: number;
  public constructor(reader: SequentialReader, box: Box) {
    super(reader, box);

    this.version = reader.getInt16();
    this.revisionLevel = reader.getInt16();
    this.vendor = reader.getString(4);
    this.temporalQuality = reader.getInt32();
    this.spatialQuality = reader.getInt32();
    this.width = reader.getUInt16();
    this.height = reader.getUInt16();
    this.horizresolution = reader.getUInt32();
    this.vertresolution = reader.getUInt32();
    reader.skip(4); // Reserved
    this.frameCount = reader.getUInt16();
    this.compressorname = reader.getString(32);
    this.depth = reader.getUInt16();
    reader.skip(2); // Pre-defined
  }

  public addMetadata(directory: Mp4VideoDirectory): void
  {
    Mp4Dictionary.setLookup(Mp4VideoDirectory.TAG_COMPRESSION_TYPE, this.format, directory);

    directory.setInt(Mp4VideoDirectory.TAG_WIDTH, this.width);
    directory.setInt(Mp4VideoDirectory.TAG_HEIGHT, this.height);

    let compressorName = this.compressorname.trim();
    if (compressorName != null && compressorName != '') {
      directory.setString(Mp4VideoDirectory.TAG_COMPRESSOR_NAME, compressorName);
    }

    directory.setInt(Mp4VideoDirectory.TAG_DEPTH, this.depth);

    // Calculate horizontal res
    let horizontalInteger = (this.horizresolution & 0xFFFF0000) >> 16;
    let horizontalFraction = (this.horizresolution & 0xFFFF) / Math.pow(2, 4);
    directory.setDouble(Mp4VideoDirectory.TAG_HORIZONTAL_RESOLUTION, horizontalInteger + horizontalFraction);

    let verticalInteger = (this.vertresolution & 0xFFFF0000) >> 16;
    let verticalFraction = (this.vertresolution & 0xFFFF) / Math.pow(2, 4);
    directory.setDouble(Mp4VideoDirectory.TAG_VERTICAL_RESOLUTION, verticalInteger + verticalFraction);
  }
}