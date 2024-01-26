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
import OlympusRawDevelopmentMakernoteDescriptor from './OlympusRawDevelopmentMakernoteDescriptor'

/**
 * The Olympus raw development makernote is used by many manufacturers (Epson, Konica, Minolta and Agfa...), and as such contains some tags
 * that appear specific to those manufacturers.
 */

class OlympusRawDevelopmentMakernoteDirectory extends Directory {
  public static TagRawDevVersion = 0x0000;
  public static TagRawDevExposureBiasValue = 0x0100;
  public static TagRawDevWhiteBalanceValue = 0x0101;
  public static TagRawDevWbFineAdjustment = 0x0102;
  public static TagRawDevGrayPoint = 0x0103;
  public static TagRawDevSaturationEmphasis = 0x0104;
  public static TagRawDevMemoryColorEmphasis = 0x0105;
  public static TagRawDevContrastValue = 0x0106;
  public static TagRawDevSharpnessValue = 0x0107;
  public static TagRawDevColorSpace = 0x0108;
  public static TagRawDevEngine = 0x0109;
  public static TagRawDevNoiseReduction = 0x010a;
  public static TagRawDevEditStatus = 0x010b;
  public static TagRawDevSettings = 0x010c;

  public static _tagNameMap: Map<number, string> = new Map([
    [OlympusRawDevelopmentMakernoteDirectory.TagRawDevVersion, "Raw Dev Version"],
    [OlympusRawDevelopmentMakernoteDirectory.TagRawDevExposureBiasValue, "Raw Dev Exposure Bias Value"],
    [OlympusRawDevelopmentMakernoteDirectory.TagRawDevWhiteBalanceValue, "Raw Dev White Balance Value"],
    [OlympusRawDevelopmentMakernoteDirectory.TagRawDevWbFineAdjustment, "Raw Dev WB Fine Adjustment"],
    [OlympusRawDevelopmentMakernoteDirectory.TagRawDevGrayPoint, "Raw Dev Gray Point"],
    [OlympusRawDevelopmentMakernoteDirectory.TagRawDevSaturationEmphasis, "Raw Dev Saturation Emphasis"],
    [OlympusRawDevelopmentMakernoteDirectory.TagRawDevMemoryColorEmphasis, "Raw Dev Memory Color Emphasis"],
    [OlympusRawDevelopmentMakernoteDirectory.TagRawDevContrastValue, "Raw Dev Contrast Value"],
    [OlympusRawDevelopmentMakernoteDirectory.TagRawDevSharpnessValue, "Raw Dev Sharpness Value"],
    [OlympusRawDevelopmentMakernoteDirectory.TagRawDevColorSpace, "Raw Dev Color Space"],
    [OlympusRawDevelopmentMakernoteDirectory.TagRawDevEngine, "Raw Dev Engine"],
    [OlympusRawDevelopmentMakernoteDirectory.TagRawDevNoiseReduction, "Raw Dev Noise Reduction"],
    [OlympusRawDevelopmentMakernoteDirectory.TagRawDevEditStatus, "Raw Dev Edit Status"],
    [OlympusRawDevelopmentMakernoteDirectory.TagRawDevSettings, "Raw Dev Settings"]
  ]);

  constructor() {
    super();
    this.setDescriptor(new OlympusRawDevelopmentMakernoteDescriptor(this));
  }

  public getName(): string {
    return "Olympus Raw Development";
  }

  protected getTagNameMap(): Map<number, string> {
    return OlympusRawDevelopmentMakernoteDirectory._tagNameMap;
  }
}

export default OlympusRawDevelopmentMakernoteDirectory
