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

import Directory from '../Directory'
import PcxDescriptor from './PcxDescriptor'

class PcxDirectory extends Directory {
  public static TAG_VERSION        = 1;
  public static TAG_BITS_PER_PIXEL = 2;
  public static TAG_XMIN           = 3;
  public static TAG_YMIN           = 4;
  public static TAG_XMAX           = 5;
  public static TAG_YMAX           = 6;
  public static TAG_HORIZONTAL_DPI = 7;
  public static TAG_VERTICAL_DPI   = 8;
  public static TAG_PALETTE        = 9;
  public static TAG_COLOR_PLANES   = 10;
  public static TAG_BYTES_PER_LINE = 11;
  public static TAG_PALETTE_TYPE   = 12;
  public static TAG_HSCR_SIZE      = 13;
  public static TAG_VSCR_SIZE      = 14;

  public static _tagNameMap: Map<number, string> = new Map([
    [PcxDirectory.TAG_VERSION, "Version"],
    [PcxDirectory.TAG_BITS_PER_PIXEL, "Bits Per Pixel"],
    [PcxDirectory.TAG_XMIN, "X Min"],
    [PcxDirectory.TAG_YMIN, "Y Min"],
    [PcxDirectory.TAG_XMAX, "X Max"],
    [PcxDirectory.TAG_YMAX, "Y Max"],
    [PcxDirectory.TAG_HORIZONTAL_DPI, "Horizontal DPI"],
    [PcxDirectory.TAG_VERTICAL_DPI, "Vertical DPI"],
    [PcxDirectory.TAG_PALETTE, "Palette"],
    [PcxDirectory.TAG_COLOR_PLANES, "Color Planes"],
    [PcxDirectory.TAG_BYTES_PER_LINE, "Bytes Per Line"],
    [PcxDirectory.TAG_PALETTE_TYPE, "Palette Type"],
    [PcxDirectory.TAG_HSCR_SIZE, "H Scr Size"],
    [PcxDirectory.TAG_VSCR_SIZE, "V Scr Size"]
  ]);

  constructor() {
    super();
    this.setDescriptor(new PcxDescriptor(this));
  }

  public getName() {
    return "PCX";
  }

  public getTagNameMap(): Map<number, string> {
    return PcxDirectory._tagNameMap;
  }
}

export default PcxDirectory