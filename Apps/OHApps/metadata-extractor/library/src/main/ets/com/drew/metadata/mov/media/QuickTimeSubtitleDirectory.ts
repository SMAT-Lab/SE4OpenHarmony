
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
import QuickTimeSubtitleDescriptor from './QuickTimeSubtitleDescriptor'

class QuickTimeSubtitleDirectory extends QuickTimeDirectory {
  public static readonly TAG_VERTICAL_PLACEMENT: number          = 1;
  public static readonly TAG_SOME_SAMPLES_FORCED: number         = 2;
  public static readonly TAG_ALL_SAMPLES_FORCED: number          = 3;
  public static readonly TAG_DEFAULT_TEXT_BOX: number            = 4;
  public static readonly TAG_FONT_IDENTIFIER: number             = 5;
  public static readonly TAG_FONT_FACE: number                   = 6;
  public static readonly TAG_FONT_SIZE: number                   = 7;
  public static readonly TAG_FOREGROUND_COLOR: number            = 8;
  public static readonly TAG_CREATION_TIME: number = 0x5001;
  public static readonly TAG_MODIFICATION_TIME: number = 0x5002;
  public static readonly TAG_DURATION: number = 0x5003;

  public constructor() {
    super()
    this.setDescriptor(new QuickTimeSubtitleDescriptor(this));
  }

  public static readonly _tagNameMap: Map<number, string> = new Map<number, string>([
    [QuickTimeSubtitleDirectory.TAG_VERTICAL_PLACEMENT, "Vertical Placement"],
    [QuickTimeSubtitleDirectory.TAG_SOME_SAMPLES_FORCED, "Some Samples Forced"],
    [QuickTimeSubtitleDirectory.TAG_ALL_SAMPLES_FORCED, "All Samples Forced"],
    [QuickTimeSubtitleDirectory.TAG_DEFAULT_TEXT_BOX, "Default Text Box"],
    [QuickTimeSubtitleDirectory.TAG_FONT_IDENTIFIER, "Font Identifier"],
    [QuickTimeSubtitleDirectory.TAG_FONT_FACE, "Font Face"],
    [QuickTimeSubtitleDirectory.TAG_FONT_SIZE, "Font Size"],
    [QuickTimeSubtitleDirectory.TAG_FOREGROUND_COLOR, "Foreground Color"],
    [QuickTimeSubtitleDirectory.TAG_CREATION_TIME, "Creation Time"],
    [QuickTimeSubtitleDirectory.TAG_MODIFICATION_TIME, "Modification Time"],
    [QuickTimeSubtitleDirectory.TAG_DURATION, "Duration"]
  ]);


  public getName(): string {
    return "QuickTime Subtitle";
  }

  protected getTagNameMap(): Map<number, string> {
    return QuickTimeSubtitleDirectory._tagNameMap;
  }
}

export default QuickTimeSubtitleDirectory