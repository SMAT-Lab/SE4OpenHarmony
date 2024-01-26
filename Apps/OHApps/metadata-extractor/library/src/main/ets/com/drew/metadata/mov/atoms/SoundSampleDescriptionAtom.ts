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
import QuickTimeDirectory from '../QuickTimeDirectory'
import SampleDescription from './SampleDescription'
import SampleDescriptionAtom from './SampleDescriptionAtom'
import SequentialReader from '../../../lang/SequentialReader'

class SoundSampleDescriptionAtom extends SampleDescriptionAtom<InstanceType<typeof SoundSampleDescriptionAtom.SoundSampleDescription>> {
  public constructor(reader: SequentialReader, atom: Atom) {
    super(reader, atom);
  }

  getSampleDescription(reader: SequentialReader): InstanceType<typeof SoundSampleDescriptionAtom.SoundSampleDescription>  {
    return new SoundSampleDescriptionAtom.SoundSampleDescription(reader);
  }

  public addMetadata(directory: QuickTimeDirectory): void {
    let description: InstanceType<typeof SoundSampleDescriptionAtom.SoundSampleDescription> = this.sampleDescriptions[0];
    QuickTimeDictionary.setLookup(0x0301, description.dataFormat, directory);
    directory.setInt(0x0302, description.numberOfChannels);
    directory.setInt(0x0303, description.sampleSize);
  }

  static SoundSampleDescription = class extends SampleDescription {
    version: number;
    revisionLevel: number;
    vendor: number;
    numberOfChannels: number;
    sampleSize: number;
    compressionID: number;
    packetSize: number;
    sampleRate: number;
    public constructor(reader: SequentialReader) {
      super(reader);

      this.version = reader.getUInt16();
      this.revisionLevel = reader.getUInt16();
      this.vendor = reader.getInt32();
      this.numberOfChannels = reader.getUInt16();
      this.sampleSize = reader.getUInt16();
      this.compressionID = reader.getUInt16();
      this.packetSize = reader.getUInt16();
      this.sampleRate = reader.getUInt32();
    }
  }
}

export default SoundSampleDescriptionAtom