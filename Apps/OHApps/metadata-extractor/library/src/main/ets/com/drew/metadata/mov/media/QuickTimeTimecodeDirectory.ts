
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

import QuickTimeDirectory from '../QuickTimeDirectory'
import QuickTimeTimecodeDescriptor from './QuickTimeTimecodeDescriptor'

class QuickTimeTimecodeDirectory extends QuickTimeDirectory {
  // Timecode Media Description Atom
  public static readonly TAG_DROP_FRAME: number                      = 1;
  public static readonly TAG_24_HOUR_MAX: number                     = 2;
  public static readonly TAG_NEGATIVE_TIMES_OK: number               = 3;
  public static readonly TAG_COUNTER: number                         = 4;
  public static readonly TAG_TEXT_FONT: number                       = 5;
  public static readonly TAG_TEXT_FACE: number                       = 6;
  public static readonly TAG_TEXT_SIZE: number                       = 7;
  public static readonly TAG_TEXT_COLOR: number                      = 8;
  public static readonly TAG_BACKGROUND_COLOR: number                = 9;
  public static readonly TAG_FONT_NAME: number                       = 10;

  public static readonly TAG_CREATION_TIME: number = 0x5001;
  public static readonly TAG_MODIFICATION_TIME: number = 0x5002;
  public static readonly TAG_DURATION: number = 0x5003;

  public constructor() {
    super()
    this.setDescriptor(new QuickTimeTimecodeDescriptor(this));
  }

  public static readonly _tagNameMap: Map<number, string> = new Map<number, string>([
    [QuickTimeTimecodeDirectory.TAG_DROP_FRAME, "Drop Frame"],
    [QuickTimeTimecodeDirectory.TAG_24_HOUR_MAX, "24 Hour Max"],
    [QuickTimeTimecodeDirectory.TAG_NEGATIVE_TIMES_OK, "Negative Times OK"],
    [QuickTimeTimecodeDirectory.TAG_COUNTER, "Counter"],
    [QuickTimeTimecodeDirectory.TAG_TEXT_FONT, "Text Font"],
    [QuickTimeTimecodeDirectory.TAG_TEXT_FACE, "Text Face"],
    [QuickTimeTimecodeDirectory.TAG_TEXT_SIZE, "Text Size"],
    [QuickTimeTimecodeDirectory.TAG_TEXT_COLOR, "Text Color"],
    [QuickTimeTimecodeDirectory.TAG_BACKGROUND_COLOR, "Background Color"],
    [QuickTimeTimecodeDirectory.TAG_FONT_NAME, "Font Name"],
    [QuickTimeTimecodeDirectory.TAG_CREATION_TIME, "Creation Time"],
    [QuickTimeTimecodeDirectory.TAG_MODIFICATION_TIME, "Modification Time"],
    [QuickTimeTimecodeDirectory.TAG_DURATION, "Duration"]
  ]);



  public getName(): string {
    return "QuickTime Timecode";
  }

  protected getTagNameMap(): Map<number, string> {
    return QuickTimeTimecodeDirectory._tagNameMap;
  }
}

export default QuickTimeTimecodeDirectory