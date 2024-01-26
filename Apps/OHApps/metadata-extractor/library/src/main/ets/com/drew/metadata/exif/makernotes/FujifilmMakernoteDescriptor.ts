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

import { FujifilmMakernoteDirectory } from './FujifilmMakernoteDirectory';
import TagDescriptor from '../../TagDescriptor';

export class FujifilmMakernoteDescriptor extends TagDescriptor<FujifilmMakernoteDirectory> {
  constructor(directory: FujifilmMakernoteDirectory) {
    super(directory)
  }

  getDescription(tagType: number): string{
    switch (tagType) {
      case FujifilmMakernoteDirectory.TAG_MAKERNOTE_VERSION:
        return this.getMakernoteVersionDescription();
      case FujifilmMakernoteDirectory.TAG_SHARPNESS:
        return this.getSharpnessDescription();
      case FujifilmMakernoteDirectory.TAG_WHITE_BALANCE:
        return this.getWhiteBalanceDescription();
      case FujifilmMakernoteDirectory.TAG_COLOR_SATURATION:
        return this.getColorSaturationDescription();
      case FujifilmMakernoteDirectory.TAG_TONE:
        return this.getToneDescription();
      case FujifilmMakernoteDirectory.TAG_CONTRAST:
        return this.getContrastDescription();
      case FujifilmMakernoteDirectory.TAG_NOISE_REDUCTION:
        return this.getNoiseReductionDescription();
      case FujifilmMakernoteDirectory.TAG_HIGH_ISO_NOISE_REDUCTION:
        return this.getHighIsoNoiseReductionDescription();
      case FujifilmMakernoteDirectory.TAG_FLASH_MODE:
        return this.getFlashModeDescription();
      case FujifilmMakernoteDirectory.TAG_FLASH_EV:
        return this.getFlashExposureValueDescription();
      case FujifilmMakernoteDirectory.TAG_MACRO:
        return this.getMacroDescription();
      case FujifilmMakernoteDirectory.TAG_FOCUS_MODE:
        return this.getFocusModeDescription();
      case FujifilmMakernoteDirectory.TAG_SLOW_SYNC:
        return this.getSlowSyncDescription();
      case FujifilmMakernoteDirectory.TAG_PICTURE_MODE:
        return this.getPictureModeDescription();
      case FujifilmMakernoteDirectory.TAG_EXR_AUTO:
        return this.getExrAutoDescription();
      case FujifilmMakernoteDirectory.TAG_EXR_MODE:
        return this.getExrModeDescription();
      case FujifilmMakernoteDirectory.TAG_AUTO_BRACKETING:
        return this.getAutoBracketingDescription();
      case FujifilmMakernoteDirectory.TAG_FINE_PIX_COLOR:
        return this.getFinePixColorDescription();
      case FujifilmMakernoteDirectory.TAG_BLUR_WARNING:
        return this.getBlurWarningDescription();
      case FujifilmMakernoteDirectory.TAG_FOCUS_WARNING:
        return this.getFocusWarningDescription();
      case FujifilmMakernoteDirectory.TAG_AUTO_EXPOSURE_WARNING:
        return this.getAutoExposureWarningDescription();
      case FujifilmMakernoteDirectory.TAG_DYNAMIC_RANGE:
        return this.getDynamicRangeDescription();
      case FujifilmMakernoteDirectory.TAG_FILM_MODE:
        return this.getFilmModeDescription();
      case FujifilmMakernoteDirectory.TAG_DYNAMIC_RANGE_SETTING:
        return this.getDynamicRangeSettingDescription();
      default:
        return super.getDescription(tagType);
    }
  }

  private getMakernoteVersionDescription(): string{
    return this.getVersionBytesDescription(FujifilmMakernoteDirectory.TAG_MAKERNOTE_VERSION, 2);
  }

  public getSharpnessDescription(): string{
    const value = this._directory.getInteger(FujifilmMakernoteDirectory.TAG_SHARPNESS);
    if (value == null) {
      return null;
    }

    switch (value) {
      case 1:
        return "Softest";
      case 2:
        return "Soft";
      case 3:
        return "Normal";
      case 4:
        return "Hard";
      case 5:
        return "Hardest";
      case 0x82:
        return "Medium Soft";
      case 0x84:
        return "Medium Hard";
      case 0x8000:
        return "Film Simulation";
      case 0xFFFF:
        return "N/A";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getWhiteBalanceDescription(): string{
    const value = this._directory.getInteger(FujifilmMakernoteDirectory.TAG_WHITE_BALANCE);
    if (value == null)
    return null;
    switch (value) {
      case 0x000:
        return "Auto";
      case 0x100:
        return "Daylight";
      case 0x200:
        return "Cloudy";
      case 0x300:
        return "Daylight Fluorescent";
      case 0x301:
        return "Day White Fluorescent";
      case 0x302:
        return "White Fluorescent";
      case 0x303:
        return "Warm White Fluorescent";
      case 0x304:
        return "Living Room Warm White Fluorescent";
      case 0x400:
        return "Incandescence";
      case 0x500:
        return "Flash";
      case 0xf00:
        return "Custom White Balance";
      case 0xf01:
        return "Custom White Balance 2";
      case 0xf02:
        return "Custom White Balance 3";
      case 0xf03:
        return "Custom White Balance 4";
      case 0xf04:
        return "Custom White Balance 5";
      case 0xff0:
        return "Kelvin";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getColorSaturationDescription(): string{
    let value = this._directory.getInteger(FujifilmMakernoteDirectory.TAG_COLOR_SATURATION);
    if (value == null)
    return null;
    switch (value) {
      case 0x000:
        return "Normal";
      case 0x080:
        return "Medium High";
      case 0x100:
        return "High";
      case 0x180:
        return "Medium Low";
      case 0x200:
        return "Low";
      case 0x300:
        return "None (B&W)";
      case 0x301:
        return "B&W Green Filter";
      case 0x302:
        return "B&W Yellow Filter";
      case 0x303:
        return "B&W Blue Filter";
      case 0x304:
        return "B&W Sepia";
      case 0x8000:
        return "Film Simulation";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getToneDescription(): string{
    const value = this._directory.getInteger(FujifilmMakernoteDirectory.TAG_TONE);
    if (value == null)
    return null;
    switch (value) {
      case 0x000:
        return "Normal";
      case 0x080:
        return "Medium High";
      case 0x100:
        return "High";
      case 0x180:
        return "Medium Low";
      case 0x200:
        return "Low";
      case 0x300:
        return "None (B&W)";
      case 0x8000:
        return "Film Simulation";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getContrastDescription(): string{
    const value = this._directory.getInteger(FujifilmMakernoteDirectory.TAG_CONTRAST);
    if (value == null)
    return null;
    switch (value) {
      case 0x000:
        return "Normal";
      case 0x100:
        return "High";
      case 0x300:
        return "Low";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getNoiseReductionDescription(): string{
    const value = this._directory.getInteger(FujifilmMakernoteDirectory.TAG_NOISE_REDUCTION);
    if (value == null)
    return null;
    switch (value) {
      case 0x040:
        return "Low";
      case 0x080:
        return "Normal";
      case 0x100:
        return "N/A";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getHighIsoNoiseReductionDescription(): string{
    const value = this._directory.getInteger(FujifilmMakernoteDirectory.TAG_HIGH_ISO_NOISE_REDUCTION);
    if (value == null)
    return null;
    switch (value) {
      case 0x000:
        return "Normal";
      case 0x100:
        return "Strong";
      case 0x200:
        return "Weak";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getFlashModeDescription(): string{
    return this.getIndexedDescription(
      FujifilmMakernoteDirectory.TAG_FLASH_MODE,
      "Auto",
      "On",
      "Off",
      "Red-eye Reduction",
      "External"
    );
  }

  public getFlashExposureValueDescription(): string{
    let value = this._directory.getRational(FujifilmMakernoteDirectory.TAG_FLASH_EV);
    return value == null ? null : value.toSimpleString(false) + " EV (Apex)";
  }

  public getMacroDescription(): string{
    return this.getIndexedDescription(FujifilmMakernoteDirectory.TAG_MACRO, "Off", "On");
  }

  public getFocusModeDescription(): string{
    return this.getIndexedDescription(FujifilmMakernoteDirectory.TAG_FOCUS_MODE, "Auto Focus", "Manual Focus");
  }

  public getSlowSyncDescription(): string{
    return this.getIndexedDescription(FujifilmMakernoteDirectory.TAG_SLOW_SYNC, "Off", "On");
  }

  public getPictureModeDescription(): string{
    const value = this._directory.getInteger(FujifilmMakernoteDirectory.TAG_PICTURE_MODE);
    if (value == null)
    return null;
    switch (value) {
      case 0x000:
        return "Auto";
      case 0x001:
        return "Portrait scene";
      case 0x002:
        return "Landscape scene";
      case 0x003:
        return "Macro";
      case 0x004:
        return "Sports scene";
      case 0x005:
        return "Night scene";
      case 0x006:
        return "Program AE";
      case 0x007:
        return "Natural Light";
      case 0x008:
        return "Anti-blur";
      case 0x009:
        return "Beach & Snow";
      case 0x00a:
        return "Sunset";
      case 0x00b:
        return "Museum";
      case 0x00c:
        return "Party";
      case 0x00d:
        return "Flower";
      case 0x00e:
        return "Text";
      case 0x00f:
        return "Natural Light & Flash";
      case 0x010:
        return "Beach";
      case 0x011:
        return "Snow";
      case 0x012:
        return "Fireworks";
      case 0x013:
        return "Underwater";
      case 0x014:
        return "Portrait with Skin Correction";
    // skip 0x015
      case 0x016:
        return "Panorama";
      case 0x017:
        return "Night (Tripod)";
      case 0x018:
        return "Pro Low-light";
      case 0x019:
        return "Pro Focus";
    // skip 0x01a
      case 0x01b:
        return "Dog Face Detection";
      case 0x01c:
        return "Cat Face Detection";
      case 0x100:
        return "Aperture priority AE";
      case 0x200:
        return "Shutter priority AE";
      case 0x300:
        return "Manual exposure";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getExrAutoDescription(): string{
    return this.getIndexedDescription(FujifilmMakernoteDirectory.TAG_EXR_AUTO, "Auto", "Manual");
  }

  public getExrModeDescription(): string{
    const value = this._directory.getInteger(FujifilmMakernoteDirectory.TAG_EXR_MODE);
    if (value == null)
    return null;
    switch (value) {
      case 0x100:
        return "HR (High Resolution)";
      case 0x200:
        return "SN (Signal to Noise Priority)";
      case 0x300:
        return "DR (Dynamic Range Priority)";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getAutoBracketingDescription(): string{
    return this.getIndexedDescription(
      FujifilmMakernoteDirectory.TAG_AUTO_BRACKETING,
      "Off",
      "On",
      "No Flash & Flash"
    );
  }

  public getFinePixColorDescription(): string{
    const value = this._directory.getInteger(FujifilmMakernoteDirectory.TAG_FINE_PIX_COLOR);
    if (value == null)
    return null;
    switch (value) {
      case 0x00:
        return "Standard";
      case 0x10:
        return "Chrome";
      case 0x30:
        return "B&W";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getBlurWarningDescription(): string{
    return this.getIndexedDescription(
      FujifilmMakernoteDirectory.TAG_BLUR_WARNING,
      "No Blur Warning",
      "Blur warning"
    );
  }

  public getFocusWarningDescription(): string{
    return this.getIndexedDescription(
      FujifilmMakernoteDirectory.TAG_FOCUS_WARNING,
      "Good Focus",
      "Out Of Focus"
    );
  }

  public getAutoExposureWarningDescription(): string{
    return this.getIndexedDescription(
      FujifilmMakernoteDirectory.TAG_AUTO_EXPOSURE_WARNING,
      "AE Good",
      "Over Exposed"
    );
  }

  public getDynamicRangeDescription(): string{
    return this.getIndexedDescription(
      FujifilmMakernoteDirectory.TAG_DYNAMIC_RANGE,
      1,
      "Standard",
      null,
      "Wide"
    );
  }

  public getFilmModeDescription(): string{
    const value = this._directory.getInteger(FujifilmMakernoteDirectory.TAG_FILM_MODE);
    if (value == null)
    return null;
    switch (value) {
      case 0x000:
        return "F0/Standard (Provia) ";
      case 0x100:
        return "F1/Studio Portrait";
      case 0x110:
        return "F1a/Studio Portrait Enhanced Saturation";
      case 0x120:
        return "F1b/Studio Portrait Smooth Skin Tone (Astia)";
      case 0x130:
        return "F1c/Studio Portrait Increased Sharpness";
      case 0x200:
        return "F2/Fujichrome (Velvia)";
      case 0x300:
        return "F3/Studio Portrait Ex";
      case 0x400:
        return "F4/Velvia";
      case 0x500:
        return "Pro Neg. Std";
      case 0x501:
        return "Pro Neg. Hi";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getDynamicRangeSettingDescription(): string{
    const value = this._directory.getInteger(FujifilmMakernoteDirectory.TAG_DYNAMIC_RANGE_SETTING);
    if (value == null)
    return null;
    switch (value) {
      case 0x000:
        return "Auto (100-400%)";
      case 0x001:
        return "Manual";
      case 0x100:
        return "Standard (100%)";
      case 0x200:
        return "Wide 1 (230%)";
      case 0x201:
        return "Wide 2 (400%)";
      case 0x8000:
        return "Film Simulation";
      default:
        return "Unknown (" + value + ")";
    }
  }
}