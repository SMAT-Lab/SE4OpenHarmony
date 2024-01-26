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
import FullAtom from './FullAtom'
import QuickTimeContext from '../QuickTimeContext'
import QuickTimeVideoDirectory from '../media/QuickTimeVideoDirectory'
import SequentialReader from '../../../lang/SequentialReader'

class TimeToSampleAtom extends FullAtom {
  private readonly entries: Array<InstanceType<typeof TimeToSampleAtom.Entry>>;

  public constructor(reader: SequentialReader, atom: Atom) {
    super(reader, atom);

    let numberOfEntries: number = reader.getUInt32();
    this.entries = new Array(numberOfEntries);
    for (let i: number = 0; i < numberOfEntries; i++) {
      this.entries = this.entries.concat(new Array(new TimeToSampleAtom.Entry(reader)));
    }
  }

  static Entry = class {
    sampleCount: number;
    sampleDuration: number;
    public constructor(reader: SequentialReader) {
      this.sampleCount = reader.getUInt32();
      this.sampleDuration = reader.getUInt32();
    }
  }

  public addMetadata(directory: QuickTimeVideoDirectory, context: QuickTimeContext): void {
    let frameRate: number = context.timeScale / this.entries[0].sampleDuration;
    directory.setFloat(QuickTimeVideoDirectory.TAG_FRAME_RATE, frameRate);
  }
}

export default TimeToSampleAtom