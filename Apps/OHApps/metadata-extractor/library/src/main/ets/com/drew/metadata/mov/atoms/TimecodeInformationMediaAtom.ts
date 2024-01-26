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
import QuickTimeTimecodeDirectory from '../media/QuickTimeTimecodeDirectory'
import SequentialReader from '../../../lang/SequentialReader'

class TimecodeInformationMediaAtom extends FullAtom {
  textFont: number;
  textFace: number;
  textSize: number;
  textColor: Int32Array;
  backgroundColor: Int32Array;
  fontName: string;

  public constructor(reader: SequentialReader, atom: Atom) {
    super(reader, atom);

    this.textFont = reader.getInt16();
    this.textFace = reader.getInt16();
    this.textSize = reader.getInt16();
    reader.skip(2); // Reserved
    this.textColor = new Int32Array([reader.getUInt16(), reader.getUInt16(), reader.getUInt16()]);
    this.backgroundColor = new Int32Array([reader.getUInt16(), reader.getUInt16(), reader.getUInt16()]);
    this.fontName = reader.getString(reader.getUInt8());
  }

  public addMetadata(directory: QuickTimeTimecodeDirectory): void {
    directory.setInt(QuickTimeTimecodeDirectory.TAG_TEXT_FONT, this.textFont);
    switch (this.textFace) {
      case (0x0001):
        directory.setString(QuickTimeTimecodeDirectory.TAG_TEXT_FACE, "Bold");
        break;
      case (0x0002):
        directory.setString(QuickTimeTimecodeDirectory.TAG_TEXT_FACE, "Italic");
        break;
      case (0x0004):
        directory.setString(QuickTimeTimecodeDirectory.TAG_TEXT_FACE, "Underline");
        break;
      case (0x0008):
        directory.setString(QuickTimeTimecodeDirectory.TAG_TEXT_FACE, "Outline");
        break;
      case (0x0010):
        directory.setString(QuickTimeTimecodeDirectory.TAG_TEXT_FACE, "Shadow");
        break;
      case (0x0020):
        directory.setString(QuickTimeTimecodeDirectory.TAG_TEXT_FACE, "Condense");
        break;
      case (0x0040):
        directory.setString(QuickTimeTimecodeDirectory.TAG_TEXT_FACE, "Extend");
    }

    directory.setInt(QuickTimeTimecodeDirectory.TAG_TEXT_SIZE, this.textSize);
    directory.setIntArray(QuickTimeTimecodeDirectory.TAG_TEXT_COLOR, this.textColor);
    directory.setIntArray(QuickTimeTimecodeDirectory.TAG_BACKGROUND_COLOR, this.backgroundColor);
    directory.setString(QuickTimeTimecodeDirectory.TAG_FONT_NAME, this.fontName);
  }
}

export default TimecodeInformationMediaAtom