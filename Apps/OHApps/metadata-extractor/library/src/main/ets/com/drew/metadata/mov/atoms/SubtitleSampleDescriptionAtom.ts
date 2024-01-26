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
import QuickTimeSubtitleDirectory from '../media/QuickTimeSubtitleDirectory'
import SampleDescription from './SampleDescription'
import SampleDescriptionAtom from './SampleDescriptionAtom'
import SequentialReader from '../../../lang/SequentialReader'

class SubtitleSampleDescriptionAtom extends SampleDescriptionAtom<InstanceType<typeof SubtitleSampleDescriptionAtom.SubtitleSampleDescription>> {
  public constructor(reader: SequentialReader, atom: Atom) {
    super(reader, atom);
  }

  getSampleDescription(reader: SequentialReader): InstanceType<typeof SubtitleSampleDescriptionAtom.SubtitleSampleDescription> {
    return null;
  }

  static SubtitleSampleDescription = class extends SampleDescription {
    displayFlags: number;
    defaultTextBox: number;
    fontIdentifier: number;
    fontFace: number;
    fontSize: number;
    foregroundColor: Int32Array;
    public constructor(reader: SequentialReader) {
      super(reader);

      this.displayFlags = reader.getInt32();
      reader.skip(1); // Reserved
      reader.skip(1); // Reserved
      reader.skip(4); // Reserved
      this.defaultTextBox = reader.getInt64();
      reader.skip(4); // Reserved
      this.fontIdentifier = reader.getInt16();
      this.fontFace = reader.getInt8();
      this.fontSize = reader.getInt8();
      this.foregroundColor = new Int32Array([reader.getUInt16(), reader.getUInt16(), reader.getUInt16()]);
      // font table atom 'ftab' not currently parsed
    }
  }

  public addMetadata(directory: QuickTimeSubtitleDirectory): void {
    let description: InstanceType<typeof SubtitleSampleDescriptionAtom.SubtitleSampleDescription> = this.sampleDescriptions[0];

    directory.setBoolean(QuickTimeSubtitleDirectory.TAG_VERTICAL_PLACEMENT, (description.displayFlags & 0x20000000) == 0x20000000);
    directory.setBoolean(QuickTimeSubtitleDirectory.TAG_SOME_SAMPLES_FORCED, (description.displayFlags & 0x40000000) == 0x40000000);
    directory.setBoolean(QuickTimeSubtitleDirectory.TAG_ALL_SAMPLES_FORCED, (description.displayFlags & 0xC0000000) == 0xC0000000);

    directory.setLong(QuickTimeSubtitleDirectory.TAG_DEFAULT_TEXT_BOX, description.defaultTextBox);
    directory.setInt(QuickTimeSubtitleDirectory.TAG_FONT_IDENTIFIER, description.fontIdentifier);
    switch (description.fontFace) {
      case (1):
        directory.setString(QuickTimeSubtitleDirectory.TAG_FONT_FACE, "Bold");
        break;
      case (2):
        directory.setString(QuickTimeSubtitleDirectory.TAG_FONT_FACE, "Italic");
        break;
      case (4):
        directory.setString(QuickTimeSubtitleDirectory.TAG_FONT_FACE, "Underline");
        break;
    }
    directory.setInt(QuickTimeSubtitleDirectory.TAG_FONT_SIZE, description.fontSize);
    directory.setIntArray(QuickTimeSubtitleDirectory.TAG_FOREGROUND_COLOR, description.foregroundColor);
  }
}

export default SubtitleSampleDescriptionAtom