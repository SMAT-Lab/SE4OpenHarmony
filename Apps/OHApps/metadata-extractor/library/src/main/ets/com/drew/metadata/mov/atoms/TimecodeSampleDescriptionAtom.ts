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
import QuickTimeTimecodeDirectory from '../media/QuickTimeTimecodeDirectory'
import SampleDescription from './SampleDescription'
import SampleDescriptionAtom from './SampleDescriptionAtom'
import SequentialReader from '../../../lang/SequentialReader'

class TimecodeSampleDescriptionAtom extends SampleDescriptionAtom<InstanceType<typeof TimecodeSampleDescriptionAtom.TimecodeSampleDescription>> {
  public constructor(reader: SequentialReader, atom: Atom) {
    super(reader, atom);
  }

  getSampleDescription(reader: SequentialReader): InstanceType<typeof TimecodeSampleDescriptionAtom.TimecodeSampleDescription> {
    return new TimecodeSampleDescriptionAtom.TimecodeSampleDescription(reader);
  }

  public addMetadata(directory: QuickTimeTimecodeDirectory): void {
    let description: InstanceType<typeof TimecodeSampleDescriptionAtom.TimecodeSampleDescription> = this.sampleDescriptions[0];

    directory.setBoolean(QuickTimeTimecodeDirectory.TAG_DROP_FRAME, (description.flags & 0x0001) == 0x0001);
    directory.setBoolean(QuickTimeTimecodeDirectory.TAG_24_HOUR_MAX, (description.flags & 0x0002) == 0x0002);
    directory.setBoolean(QuickTimeTimecodeDirectory.TAG_NEGATIVE_TIMES_OK, (description.flags & 0x0004) == 0x0004);
    directory.setBoolean(QuickTimeTimecodeDirectory.TAG_COUNTER, (description.flags & 0x0008) == 0x0008);
  }

  static TimecodeSampleDescription = class extends SampleDescription {
    flags: number;
    timeScale: number;
    frameDuration: number;
    numberOfFrames: number;
    public constructor(reader: SequentialReader) {
      super(reader);

      reader.skip(4); // Reserved
      this.flags = reader.getInt32();
      this.timeScale = reader.getInt32();
      this.frameDuration = reader.getInt32();
      this.numberOfFrames = reader.getInt8();
      reader.skip(1); // Reserved
      // Source reference...
    }
  }
}

export default TimecodeSampleDescriptionAtom