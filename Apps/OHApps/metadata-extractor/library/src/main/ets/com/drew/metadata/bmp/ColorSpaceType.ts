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

export enum ColorSpaceType {
  /** 0 = Calibrated RGB */
  LCS_CALIBRATED_RGB = 0,

  /** "sRGB" = sRGB Color Space */
  LCS_sRGB = 0x73524742,

  /** "Win " = System Default Color Space, sRGB */
  LCS_WINDOWS_COLOR_SPACE = 0x57696E20,

  /** "LINK" = Linked Profile */
  PROFILE_LINKED = 0x4C494E4B,

  /** "MBED" = Embedded Profile */
  PROFILE_EMBEDDED = 0x4D424544
}

export namespace ColorSpaceType {
  export function typeOf(value: number) {
    switch (value) {
      case ColorSpaceType.LCS_CALIBRATED_RGB:
        return ColorSpaceType.LCS_CALIBRATED_RGB;
        break
      case ColorSpaceType.LCS_sRGB:
        return ColorSpaceType.LCS_sRGB;
        break
      case ColorSpaceType.LCS_WINDOWS_COLOR_SPACE:
        return ColorSpaceType.LCS_WINDOWS_COLOR_SPACE;
        break
      case ColorSpaceType.PROFILE_LINKED:
        return ColorSpaceType.PROFILE_LINKED;
        break
      case ColorSpaceType.PROFILE_EMBEDDED:
        return ColorSpaceType.PROFILE_EMBEDDED;
        break
    }

  }

  export function toString(colorSpaceType: ColorSpaceType) {
    switch (colorSpaceType) {
      case ColorSpaceType.LCS_CALIBRATED_RGB:
        return "Calibrated RGB";
      case ColorSpaceType.LCS_sRGB:
        return "sRGB Color Space";
      case ColorSpaceType.LCS_WINDOWS_COLOR_SPACE:
        return "System Default Color Space, sRGB";
      case ColorSpaceType.PROFILE_LINKED:
        return "Linked Profile";
      case ColorSpaceType.PROFILE_EMBEDDED:
        return "Embedded Profile";
      default:
        throw new Error("Unimplemented color space type " + colorSpaceType);
    }

  }
}