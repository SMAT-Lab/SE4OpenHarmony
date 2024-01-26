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

import Directory from '../../Directory'
import NikonType1MakernoteDescriptor from './NikonType1MakernoteDescriptor'

/**
 * Describes tags specific to Nikon (type 1) cameras.  Type-1 is for E-Series cameras prior to (not including) E990.
 *
 * There are 3 formats of Nikon's Makernote. Makernote of E700/E800/E900/E900S/E910/E950
 * starts from ASCII string "Nikon". Data format is the same as IFD, but it starts from
 * offset 0x08. This is the same as Olympus except start string. Example of actual data
 * structure is shown below.
 * <pre><code>
 * :0000: 4E 69 6B 6F 6E 00 01 00-05 00 02 00 02 00 06 00 Nikon...........
 * :0010: 00 00 EC 02 00 00 03 00-03 00 01 00 00 00 06 00 ................
 * </code></pre>
 *
 */

class NikonType1MakernoteDirectory extends Directory {
  public static TAG_UNKNOWN_1 = 0x0002;
  public static TAG_QUALITY = 0x0003;
  public static TAG_COLOR_MODE = 0x0004;
  public static TAG_IMAGE_ADJUSTMENT = 0x0005;
  public static TAG_CCD_SENSITIVITY = 0x0006;
  public static TAG_WHITE_BALANCE = 0x0007;
  public static TAG_FOCUS = 0x0008;
  public static TAG_UNKNOWN_2 = 0x0009;
  public static TAG_DIGITAL_ZOOM = 0x000A;
  public static TAG_CONVERTER = 0x000B;
  public static TAG_UNKNOWN_3 = 0x0F00;

  public static _tagNameMap: Map<number, string> = new Map([
    [NikonType1MakernoteDirectory.TAG_CCD_SENSITIVITY, "CCD Sensitivity"],
    [NikonType1MakernoteDirectory.TAG_COLOR_MODE, "Color Mode"],
    [NikonType1MakernoteDirectory.TAG_DIGITAL_ZOOM, "Digital Zoom"],
    [NikonType1MakernoteDirectory.TAG_CONVERTER, "Fisheye Converter"],
    [NikonType1MakernoteDirectory.TAG_FOCUS, "Focus"],
    [NikonType1MakernoteDirectory.TAG_IMAGE_ADJUSTMENT, "Image Adjustment"],
    [NikonType1MakernoteDirectory.TAG_QUALITY, "Quality"],
    [NikonType1MakernoteDirectory.TAG_UNKNOWN_1, "Makernote Unknown 1"],
    [NikonType1MakernoteDirectory.TAG_UNKNOWN_2, "Makernote Unknown 2"],
    [NikonType1MakernoteDirectory.TAG_UNKNOWN_3, "Makernote Unknown 3"],
    [NikonType1MakernoteDirectory.TAG_WHITE_BALANCE, "White Balance"]
  ]);

  constructor() {
    super();
    this.setDescriptor(new NikonType1MakernoteDescriptor(this));
  }

  public getName(): string {
    return "Nikon Makernote";
  }

  protected getTagNameMap(): Map<number, string> {
    return NikonType1MakernoteDirectory._tagNameMap;
  }
}

export default NikonType1MakernoteDirectory