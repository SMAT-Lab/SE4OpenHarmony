
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
import QuickTimeTextDescriptor from './QuickTimeTextDescriptor'

class QuickTimeTextDirectory extends QuickTimeDirectory {
  // Text Media Description Atom
  public static readonly TAG_AUTO_SCALE: number                          = 1;
  public static readonly TAG_MOVIE_BACKGROUND_COLOR: number              = 2;
  public static readonly TAG_SCROLL_IN: number                           = 3;
  public static readonly TAG_SCROLL_OUT: number                          = 4;
  public static readonly TAG_HORIZONTAL_SCROLL: number                   = 5;
  public static readonly TAG_REVERSE_SCROLL: number                      = 6;
  public static readonly TAG_CONTINUOUS_SCROLL: number                   = 7;
  public static readonly TAG_DROP_SHADOW: number                         = 8;
  public static readonly TAG_ANTI_ALIAS: number                          = 9;
  public static readonly TAG_KEY_TEXT: number                            = 10;
  public static readonly TAG_JUSTIFICATION: number                       = 11;
  public static readonly TAG_BACKGROUND_COLOR: number                    = 12;
  public static readonly TAG_DEFAULT_TEXT_BOX: number                    = 13;
  public static readonly TAG_FONT_NUMBER: number                         = 14;
  public static readonly TAG_FONT_FACE: number                           = 15;
  public static readonly TAG_FOREGROUND_COLOR: number                    = 16;
  public static readonly TAG_NAME: number                                = 17;

  public static readonly TAG_CREATION_TIME: number = 0x5001;
  public static readonly TAG_MODIFICATION_TIME: number = 0x5002;
  public static readonly TAG_DURATION: number = 0x5003;

  public constructor() {
    super()
    this.setDescriptor(new QuickTimeTextDescriptor(this));
  }

  public static readonly _tagNameMap: Map<number, string> = new Map<number, string>([
    [QuickTimeTextDirectory.TAG_AUTO_SCALE, "Auto Scale"],
    [QuickTimeTextDirectory.TAG_MOVIE_BACKGROUND_COLOR, "Use Background Color"],
    [QuickTimeTextDirectory.TAG_SCROLL_IN, "Scroll In"],
    [QuickTimeTextDirectory.TAG_SCROLL_OUT, "Scroll Out"],
    [QuickTimeTextDirectory.TAG_HORIZONTAL_SCROLL, "Scroll Orientation"],
    [QuickTimeTextDirectory.TAG_REVERSE_SCROLL, "Scroll Direction"],
    [QuickTimeTextDirectory.TAG_CONTINUOUS_SCROLL, "Continuous Scroll"],
    [QuickTimeTextDirectory.TAG_DROP_SHADOW, "Drop Shadow"],
    [QuickTimeTextDirectory.TAG_ANTI_ALIAS, "Anti-aliasing"],
    [QuickTimeTextDirectory.TAG_KEY_TEXT, "Display Text Background Color"],
    [QuickTimeTextDirectory.TAG_JUSTIFICATION, "Alignment"],
    [QuickTimeTextDirectory.TAG_BACKGROUND_COLOR, "Background Color"],
    [QuickTimeTextDirectory.TAG_DEFAULT_TEXT_BOX, "Default Text Box"],
    [QuickTimeTextDirectory.TAG_FONT_NUMBER, "Font Number"],
    [QuickTimeTextDirectory.TAG_FONT_FACE, "Font Face"],
    [QuickTimeTextDirectory.TAG_FOREGROUND_COLOR, "Foreground Color"],
    [QuickTimeTextDirectory.TAG_NAME, "Font Name"],
    [QuickTimeTextDirectory.TAG_CREATION_TIME, "Creation Time"],
    [QuickTimeTextDirectory.TAG_MODIFICATION_TIME, "Modification Time"],
    [QuickTimeTextDirectory.TAG_DURATION, "Duration"]
  ]);



  public getName(): string {
    return "QuickTime Text";
  }

  protected getTagNameMap(): Map<number, string> {
    return QuickTimeTextDirectory._tagNameMap;
  }
}

export default QuickTimeTextDirectory