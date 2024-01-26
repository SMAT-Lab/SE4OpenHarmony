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
import QuickTimeTextDirectory from '../media/QuickTimeTextDirectory'
import SampleDescription from './SampleDescription'
import SampleDescriptionAtom from './SampleDescriptionAtom'
import SequentialReader from '../../../lang/SequentialReader'

class TextSampleDescriptionAtom extends SampleDescriptionAtom<InstanceType<typeof TextSampleDescriptionAtom.TextSampleDescription>> {
  public constructor(reader: SequentialReader, atom: Atom) {
    super(reader, atom);
  }

  getSampleDescription(reader: SequentialReader): InstanceType<typeof TextSampleDescriptionAtom.TextSampleDescription> {
    return new TextSampleDescriptionAtom.TextSampleDescription(reader);
  }

  public addMetadata(directory: QuickTimeTextDirectory): void {
    let description: InstanceType<typeof TextSampleDescriptionAtom.TextSampleDescription> = this.sampleDescriptions[0];

    directory.setBoolean(QuickTimeTextDirectory.TAG_AUTO_SCALE, (description.displayFlags & 0x0002) == 0x0002);
    directory.setBoolean(QuickTimeTextDirectory.TAG_MOVIE_BACKGROUND_COLOR, (description.displayFlags & 0x0008) == 0x0008);
    directory.setBoolean(QuickTimeTextDirectory.TAG_SCROLL_IN, (description.displayFlags & 0x0020) == 0x0020);
    directory.setBoolean(QuickTimeTextDirectory.TAG_SCROLL_OUT, (description.displayFlags & 0x0040) == 0x0040);
    directory.setString(QuickTimeTextDirectory.TAG_HORIZONTAL_SCROLL, ((description.displayFlags & 0x0080) == 0x0080) ? "Horizontal" : "Vertical");
    directory.setString(QuickTimeTextDirectory.TAG_REVERSE_SCROLL, ((description.displayFlags & 0x0100) == 0x0100) ? "Reverse" : "Normal");
    directory.setBoolean(QuickTimeTextDirectory.TAG_CONTINUOUS_SCROLL, (description.displayFlags & 0x0200) == 0x0200);
    directory.setBoolean(QuickTimeTextDirectory.TAG_DROP_SHADOW, (description.displayFlags & 0x1000) == 0x1000);
    directory.setBoolean(QuickTimeTextDirectory.TAG_ANTI_ALIAS, (description.displayFlags & 0x2000) == 0x2000);
    directory.setBoolean(QuickTimeTextDirectory.TAG_KEY_TEXT, (description.displayFlags & 0x4000) == 0x4000);

    switch (description.textJustification) {
      case (0):
        directory.setString(QuickTimeTextDirectory.TAG_JUSTIFICATION, "Left");
        break;
      case (1):
        directory.setString(QuickTimeTextDirectory.TAG_JUSTIFICATION, "Center");
        break;
      case (-1):
        directory.setString(QuickTimeTextDirectory.TAG_JUSTIFICATION, "Right");
    }

    directory.setIntArray(QuickTimeTextDirectory.TAG_BACKGROUND_COLOR, description.backgroundColor);
    directory.setLong(QuickTimeTextDirectory.TAG_DEFAULT_TEXT_BOX, description.defaultTextBox);
    directory.setInt(QuickTimeTextDirectory.TAG_FONT_NUMBER, description.fontNumber);

    switch (description.fontFace) {
      case (0x0001):
        directory.setString(QuickTimeTextDirectory.TAG_FONT_FACE, "Bold");
        break;
      case (0x0002):
        directory.setString(QuickTimeTextDirectory.TAG_FONT_FACE, "Italic");
        break;
      case (0x0004):
        directory.setString(QuickTimeTextDirectory.TAG_FONT_FACE, "Underline");
        break;
      case (0x0008):
        directory.setString(QuickTimeTextDirectory.TAG_FONT_FACE, "Outline");
        break;
      case (0x0010):
        directory.setString(QuickTimeTextDirectory.TAG_FONT_FACE, "Shadow");
        break;
      case (0x0020):
        directory.setString(QuickTimeTextDirectory.TAG_FONT_FACE, "Condense");
        break;
      case (0x0040):
        directory.setString(QuickTimeTextDirectory.TAG_FONT_FACE, "Extend");
    }

    directory.setIntArray(QuickTimeTextDirectory.TAG_FOREGROUND_COLOR, description.foregroundColor);
    directory.setString(QuickTimeTextDirectory.TAG_NAME, description.textName);
  }

  static TextSampleDescription = class extends SampleDescription {
    displayFlags: number;
    textJustification: number;
    backgroundColor: Int32Array;
    defaultTextBox: number;
    fontNumber: number;
    fontFace: number;
    foregroundColor: Int32Array;
    textName: string;
    public constructor(reader: SequentialReader) {
      super(reader);

      this.displayFlags = reader.getInt32();
      this.textJustification = reader.getInt32();
      this.backgroundColor = new Int32Array([reader.getUInt16(), reader.getUInt16(), reader.getUInt16()]);
      this.defaultTextBox = reader.getInt64();
      reader.skip(8); // 64-bits of reserved space set to 0
      this.fontNumber = reader.getUInt16();
      this.fontFace = reader.getUInt16();
      reader.skip(1); // 8-bits of reserved space set to 0
      reader.skip(2); // 16-bits of reserved space set to 0
      this.foregroundColor = new Int32Array([reader.getUInt16(), reader.getUInt16(), reader.getUInt16()]);
      this.textName = reader.getString(reader.getUInt8());
    }
  }
}

export default TextSampleDescriptionAtom