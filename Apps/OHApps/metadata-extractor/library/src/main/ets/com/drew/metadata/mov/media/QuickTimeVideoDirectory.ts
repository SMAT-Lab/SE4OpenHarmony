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
import QuickTimeVideoDescriptor from './QuickTimeVideoDescriptor'

class QuickTimeVideoDirectory extends QuickTimeDirectory {
  // Video Sample Description Atom
  public static readonly TAG_VENDOR: number                                  = 1;
  public static readonly TAG_TEMPORAL_QUALITY: number                        = 2;
  public static readonly TAG_SPATIAL_QUALITY: number                         = 3;
  public static readonly TAG_WIDTH: number                                   = 4;
  public static readonly TAG_HEIGHT: number                                  = 5;
  public static readonly TAG_HORIZONTAL_RESOLUTION: number                   = 6;
  public static readonly TAG_VERTICAL_RESOLUTION: number                     = 7;
  public static readonly TAG_COMPRESSOR_NAME: number                         = 8;
  public static readonly TAG_DEPTH: number                                   = 9;
  public static readonly TAG_COMPRESSION_TYPE: number                        = 10;

  // Video Media Information Header Atom
  public static readonly TAG_GRAPHICS_MODE: number                           = 11;
  public static readonly TAG_OPCOLOR: number                                 = 12;
  public static readonly TAG_COLOR_TABLE: number                             = 13;
  public static readonly TAG_FRAME_RATE: number                              = 14;


  public static readonly TAG_CREATION_TIME: number = 0x5001;
  public static readonly TAG_MODIFICATION_TIME: number = 0x5002;
  public static readonly TAG_DURATION: number = 0x5003;

  public constructor() {
    super();
    this.setDescriptor(new QuickTimeVideoDescriptor(this));
  }

  public static readonly _tagNameMap: Map<number, string> = new Map<number, string>([
    [QuickTimeVideoDirectory.TAG_VENDOR, "Vendor"],
    [QuickTimeVideoDirectory.TAG_TEMPORAL_QUALITY, "Temporal Quality"],
    [QuickTimeVideoDirectory.TAG_SPATIAL_QUALITY, "Spatial Quality"],
    [QuickTimeVideoDirectory.TAG_WIDTH, "Width"],
    [QuickTimeVideoDirectory.TAG_HEIGHT, "Height"],
    [QuickTimeVideoDirectory.TAG_HORIZONTAL_RESOLUTION, "Horizontal Resolution"],
    [QuickTimeVideoDirectory.TAG_VERTICAL_RESOLUTION, "Vertical Resolution"],
    [QuickTimeVideoDirectory.TAG_COMPRESSOR_NAME, "Compressor Name"],
    [QuickTimeVideoDirectory.TAG_DEPTH, "Depth"],
    [QuickTimeVideoDirectory.TAG_COMPRESSION_TYPE, "Compression Type"],
    [QuickTimeVideoDirectory.TAG_GRAPHICS_MODE, "Graphics Mode"],
    [QuickTimeVideoDirectory.TAG_OPCOLOR, "Opcolor"],
    [QuickTimeVideoDirectory.TAG_COLOR_TABLE, "Color Table"],
    [QuickTimeVideoDirectory.TAG_FRAME_RATE, "Frame Rate"],
    [QuickTimeVideoDirectory.TAG_CREATION_TIME, "Creation Time"],
    [QuickTimeVideoDirectory.TAG_MODIFICATION_TIME, "Modification Time"],
    [QuickTimeVideoDirectory.TAG_DURATION, "Duration"]
  ]);


  public getName(): string {
    return "QuickTime Video";
  }

  protected getTagNameMap(): Map<number, string> {
    return QuickTimeVideoDirectory._tagNameMap;
  }
}

export default QuickTimeVideoDirectory