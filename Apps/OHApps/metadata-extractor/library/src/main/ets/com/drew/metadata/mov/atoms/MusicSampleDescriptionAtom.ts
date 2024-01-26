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
import QuickTimeMusicDirectory from '../media/QuickTimeMusicDirectory'
import SampleDescription from './SampleDescription'
import SampleDescriptionAtom from './SampleDescriptionAtom'
import SequentialReader from '../../../lang/SequentialReader'

class MusicSampleDescriptionAtom extends SampleDescriptionAtom<InstanceType<typeof MusicSampleDescriptionAtom.MusicSampleDescription>> {
  public constructor(reader: SequentialReader, atom: Atom) {
    super(reader, atom);
  }

  getSampleDescription(reader: SequentialReader): InstanceType<typeof MusicSampleDescriptionAtom.MusicSampleDescription> {
    return new MusicSampleDescriptionAtom.MusicSampleDescription(reader);
  }

  public addMetadata(directory: QuickTimeMusicDirectory): void {
    // Do nothing
  }

  static MusicSampleDescription = class extends SampleDescription {
    flags: number;
    public constructor(reader: SequentialReader) {
      super(reader);

      this.flags = reader.getUInt32();
    }
  }
}

export default MusicSampleDescriptionAtom