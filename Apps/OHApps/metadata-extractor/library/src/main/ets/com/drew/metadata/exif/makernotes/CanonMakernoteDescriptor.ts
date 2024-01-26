/*
* Copyright (C) 2022 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import CanonMakernoteDirectory from './CanonMakernoteDirectory';
import TagDescriptor from '../../TagDescriptor';
import util from '@ohos.util';
import {CameraSettings} from './CanonMakernoteDirectory'
import {FocalLength} from './CanonMakernoteDirectory'
import {AFInfo} from './CanonMakernoteDirectory'

/**
 * Provides human-readable string representations of tag values stored in a {@link CanonMakernoteDirectory}.
 */
class CanonMakernoteDescriptor extends TagDescriptor<CanonMakernoteDirectory> {
  public constructor(directory: CanonMakernoteDirectory) {
    super(directory);
  }

  public getDescription(tagType: number): string {
    switch (tagType) {
      case CanonMakernoteDirectory.TAG_CANON_SERIAL_NUMBER:
        return this.getSerialNumberDescription();
      case CameraSettings.TAG_FLASH_ACTIVITY:
        return this.getFlashActivityDescription();
      case CameraSettings.TAG_FOCUS_TYPE:
        return this.getFocusTypeDescription();
      case CameraSettings.TAG_DIGITAL_ZOOM:
        return this.getDigitalZoomDescription();
      case CameraSettings.TAG_RECORD_MODE:
        return this.getRecordModeDescription();
      case CameraSettings.TAG_QUALITY:
        return this.getQualityDescription();
      case CameraSettings.TAG_MACRO_MODE:
        return this.getMacroModeDescription();
      case CameraSettings.TAG_SELF_TIMER_DELAY:
        return this.getSelfTimerDelayDescription();
      case CameraSettings.TAG_FLASH_MODE:
        return this.getFlashModeDescription();
      case CameraSettings.TAG_CONTINUOUS_DRIVE_MODE:
        return this.getContinuousDriveModeDescription();
      case CameraSettings.TAG_FOCUS_MODE_1:
        return this.getFocusMode1Description();
      case CameraSettings.TAG_IMAGE_SIZE:
        return this.getImageSizeDescription();
      case CameraSettings.TAG_EASY_SHOOTING_MODE:
        return this.getEasyShootingModeDescription();
      case CameraSettings.TAG_CONTRAST:
        return this.getContrastDescription();
      case CameraSettings.TAG_SATURATION:
        return this.getSaturationDescription();
      case CameraSettings.TAG_SHARPNESS:
        return this.getSharpnessDescription();
      case CameraSettings.TAG_ISO:
        return this.getIsoDescription();
      case CameraSettings.TAG_METERING_MODE:
        return this.getMeteringModeDescription();
      case CameraSettings.TAG_AF_POINT_SELECTED:
        return this.getAfPointSelectedDescription();
      case CameraSettings.TAG_EXPOSURE_MODE:
        return this.getExposureModeDescription();
      case CameraSettings.TAG_LENS_TYPE:
        return this.getLensTypeDescription();
      case CameraSettings.TAG_LONG_FOCAL_LENGTH:
        return this.getLongFocalLengthDescription();
      case CameraSettings.TAG_SHORT_FOCAL_LENGTH:
        return this.getShortFocalLengthDescription();
      case CameraSettings.TAG_FOCAL_UNITS_PER_MM:
        return this.getFocalUnitsPerMillimetreDescription();
      case CameraSettings.TAG_FLASH_DETAILS:
        return this.getFlashDetailsDescription();
      case CameraSettings.TAG_FOCUS_MODE_2:
        return this.getFocusMode2Description();
      case FocalLength.TAG_WHITE_BALANCE:
        return this.getWhiteBalanceDescription();
      case FocalLength.TAG_AF_POINT_USED:
        return this.getAfPointUsedDescription();
      case FocalLength.TAG_FLASH_BIAS:
        return this.getFlashBiasDescription();
      case AFInfo.TAG_AF_POINTS_IN_FOCUS:
        return this.getTagAfPointsInFocus();
      case CameraSettings.TAG_MAX_APERTURE:
        return this.getMaxApertureDescription();
      case CameraSettings.TAG_MIN_APERTURE:
        return this.getMinApertureDescription();
      case CameraSettings.TAG_FOCUS_CONTINUOUS:
        return this.getFocusContinuousDescription();
      case CameraSettings.TAG_AE_SETTING:
        return this.getAESettingDescription();
      case CameraSettings.TAG_DISPLAY_APERTURE:
        return this.getDisplayApertureDescription();
      case CameraSettings.TAG_SPOT_METERING_MODE:
        return this.getSpotMeteringModeDescription();
      case CameraSettings.TAG_PHOTO_EFFECT:
        return this.getPhotoEffectDescription();
      case CameraSettings.TAG_MANUAL_FLASH_OUTPUT:
        return this.getManualFlashOutputDescription();
      case CameraSettings.TAG_COLOR_TONE:
        return this.getColorToneDescription();
      case CameraSettings.TAG_SRAW_QUALITY:
        return this.getSRawQualityDescription();
      default:
        return super.getDescription(tagType);
    }
  }

  public getSerialNumberDescription(): string
  {
    let value: number = this._directory.getInteger(CanonMakernoteDirectory.TAG_CANON_SERIAL_NUMBER);
    if (value == null)
    return null;
    return util.printf("%s%d", ((value >> 8) & 0xFF).toString(16), value & 0xFF);
  }

  public getFlashBiasDescription(): string
  {
    let value: number = this._directory.getInteger(FocalLength.TAG_FLASH_BIAS);

    if (value == null)
    return null;

    let isNegative: boolean = false;
    if (value > 0xF000) {
      isNegative = true;
      value = 0xFFFF - value;
      value++;
    }

    // this tag is interesting in that the values returned are:
    //  0, 0.375, 0.5, 0.626, 1
    // not
    //  0, 0.33,  0.5, 0.66,  1

    return (isNegative ? "-" : "") + (value / 32).toString() + " EV";
  }

  public getAfPointUsedDescription(): string
  {
    let value: number = this._directory.getInteger(FocalLength.TAG_AF_POINT_USED);
    if (value == null)
    return null;
    if ((value & 0x7) == 0) {
      return "Right";
    } else if ((value & 0x7) == 1) {
      return "Centre";
    } else if ((value & 0x7) == 2) {
      return "Left";
    } else {
      return "Unknown (" + value + ")";
    }
  }

  public getTagAfPointsInFocus(): string
  {
    let value: number = this._directory.getInteger(AFInfo.TAG_AF_POINTS_IN_FOCUS);
    if (value == null)
    return null;

    let sb: String = new String();

    for (let i = 0; i < 16; i++) {
      if ((value & 1 << i) != 0) {
        if (sb.length != 0)
        sb.concat(',');
        sb.concat(i.toString());
      }
    }

    return sb.length == 0 ? "None" : sb.toString();
  }

  public getWhiteBalanceDescription(): string
  {
    return this.getIndexedDescription(
      FocalLength.TAG_WHITE_BALANCE,
      "Auto",
      "Sunny",
      "Cloudy",
      "Tungsten",
      "Florescent",
      "Flash",
      "Custom"
    );
  }

  public getFocusMode2Description(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_FOCUS_MODE_2, "Single", "Continuous");
  }

  public getFlashDetailsDescription(): string {
    let value: number = this._directory.getInteger(CameraSettings.TAG_FLASH_DETAILS);
    if (value == null)
    return null;
    if (((value >> 14) & 1) != 0) {
      return "External E-TTL";
    }
    if (((value >> 13) & 1) != 0) {
      return "Internal flash";
    }
    if (((value >> 11) & 1) != 0) {
      return "FP sync used";
    }
    if (((value >> 4) & 1) != 0) {
      return "FP sync enabled";
    }
    return "Unknown (" + value + ")";
  }

  public getFocalUnitsPerMillimetreDescription(): string {
    let value: number = this._directory.getInteger(CameraSettings.TAG_FOCAL_UNITS_PER_MM);
    if (value == null)
    return null;
    if (value != 0) {
      return value.toString();
    } else {
      return "";
    }
  }

  public getShortFocalLengthDescription(): string
  {
    let value: number = this._directory.getInteger(CameraSettings.TAG_SHORT_FOCAL_LENGTH);
    if (value == null)
    return null;
    let units: string = this.getFocalUnitsPerMillimetreDescription();
    return value.toString() + " " + units;
  }

  public getLongFocalLengthDescription(): string
  {
    let value: number = this._directory.getInteger(CameraSettings.TAG_LONG_FOCAL_LENGTH);
    if (value == null)
    return null;
    let units: string = this.getFocalUnitsPerMillimetreDescription();
    return value.toString() + " " + units;
  }

  public getExposureModeDescription(): string
  {
    return this.getIndexedDescription(
      CameraSettings.TAG_EXPOSURE_MODE,
      "Easy shooting",
      "Program",
      "Tv-priority",
      "Av-priority",
      "Manual",
      "A-DEP"
    );
  }

  public getLensTypeDescription(): string {
    let value: number = this._directory.getInteger(CameraSettings.TAG_LENS_TYPE);
    if (value == null)
    return null;

    return CanonMakernoteDescriptor._lensTypeById.has(value)
      ? CanonMakernoteDescriptor._lensTypeById.get(value)
//      : String.format("Unknown (%d)", value);
      : util.printf("Unknown (%d)", value);
  }

  public getMaxApertureDescription(): string
  {
    let value: number = this._directory.getInteger(CameraSettings.TAG_MAX_APERTURE);
    if (value == null)
    return null;
    if (value > 512)
//    return String.format("Unknown (%d)", value);
    return util.printf("Unknown (%d)", value);
    return TagDescriptor.getFStopDescription(Math.exp(this.decodeCanonEv(value) * Math.log(2.0) / 2.0));
  }

  public getMinApertureDescription(): string
  {
    let value: number = this._directory.getInteger(CameraSettings.TAG_MIN_APERTURE);
    if (value == null)
    return null;
    if (value > 512)
//    return String.format("Unknown (%d)", value);
    return util.printf("Unknown (%d)", value);
    return TagDescriptor.getFStopDescription(Math.exp(this.decodeCanonEv(value) * Math.log(2.0) / 2.0));
  }

  public getAfPointSelectedDescription(): string
  {
    return this.getIndexedDescription(
      CameraSettings.TAG_AF_POINT_SELECTED,
      0x3000,
      "None (MF)",
      "Auto selected",
      "Right",
      "Centre",
      "Left"
    );
  }

  public getMeteringModeDescription(): string
  {
    return this.getIndexedDescription(
      CameraSettings.TAG_METERING_MODE,
      3,
      "Evaluative",
      "Partial",
      "Centre weighted"
    );
  }

  public getIsoDescription(): string
  {
    let value: number = this._directory.getInteger(CameraSettings.TAG_ISO);
    if (value == null)
    return null;

    // Canon PowerShot S3 is special
    let canonMask: number = 0x4000;
    if ((value & canonMask) != 0)
    return "" + (value & ~canonMask);

    switch (value) {
      case 0:
        return "Not specified (see ISOSpeedRatings tag)";
      case 15:
        return "Auto";
      case 16:
        return "50";
      case 17:
        return "100";
      case 18:
        return "200";
      case 19:
        return "400";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getSharpnessDescription(): string
  {
    let value: number = this._directory.getInteger(CameraSettings.TAG_SHARPNESS);
    if (value == null)
    return null;
    switch (value) {
      case 0xFFFF:
        return "Low";
      case 0x000:
        return "Normal";
      case 0x001:
        return "High";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getSaturationDescription(): string
  {
    let value: number = this._directory.getInteger(CameraSettings.TAG_SATURATION);
    if (value == null)
    return null;
    switch (value) {
      case 0xFFFF:
        return "Low";
      case 0x000:
        return "Normal";
      case 0x001:
        return "High";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getContrastDescription(): string
  {
    let value: number = this._directory.getInteger(CameraSettings.TAG_CONTRAST);
    if (value == null)
    return null;
    switch (value) {
      case 0xFFFF:
        return "Low";
      case 0x000:
        return "Normal";
      case 0x001:
        return "High";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getEasyShootingModeDescription(): string
  {
    return this.getIndexedDescription(
      CameraSettings.TAG_EASY_SHOOTING_MODE,
      "Full auto",
      "Manual",
      "Landscape",
      "Fast shutter",
      "Slow shutter",
      "Night",
      "B&W",
      "Sepia",
      "Portrait",
      "Sports",
      "Macro / Closeup",
      "Pan focus"
    );
  }

  public getImageSizeDescription(): string
  {
    return this.getIndexedDescription(
      CameraSettings.TAG_IMAGE_SIZE,
      "Large",
      "Medium",
      "Small"
    );
  }

  public getFocusMode1Description(): string
  {
    return this.getIndexedDescription(
      CameraSettings.TAG_FOCUS_MODE_1,
      "One-shot",
      "AI Servo",
      "AI Focus",
      "Manual Focus",
      // TODO should check field 32 here (FOCUS_MODE_2)
      "Single",
      "Continuous",
      "Manual Focus"
    );
  }

  public getContinuousDriveModeDescription(): string
  {
    let value: number = this._directory.getInteger(CameraSettings.TAG_CONTINUOUS_DRIVE_MODE);
    if (value == null)
    return null;
    switch (value) {
      case 0:
        let delay: number = this._directory.getInteger(CameraSettings.TAG_SELF_TIMER_DELAY);
        if (delay != null)
        return delay == 0 ? "Single shot" : "Single shot with self-timer";
      case 1:
        return "Continuous";
    }
    return "Unknown (" + value + ")";
  }

  public getFlashModeDescription(): string
  {
    let value: number = this._directory.getInteger(CameraSettings.TAG_FLASH_MODE);
    if (value == null)
    return null;
    switch (value) {
      case 0:
        return "No flash fired";
      case 1:
        return "Auto";
      case 2:
        return "On";
      case 3:
        return "Red-eye reduction";
      case 4:
        return "Slow-synchro";
      case 5:
        return "Auto and red-eye reduction";
      case 6:
        return "On and red-eye reduction";
      case 16:
      // note: this value not set on Canon D30
        return "External flash";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getSelfTimerDelayDescription(): string
  {
    let value: number = this._directory.getInteger(CameraSettings.TAG_SELF_TIMER_DELAY);
    if (value == null)
    return null;
    if (value == 0) {
      return "Self timer not used";
    } else {
      return value.toFixed(2) + " sec";
    }
  }

  public getMacroModeDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_MACRO_MODE, 1, "Macro", "Normal");
  }

  public getQualityDescription(): string
  {
    let value: number = this._directory.getInteger(CameraSettings.TAG_QUALITY);
    if (value == null)
    return null;
    switch (value) {
      case -1:
        return "n/a";
      case 1:
        return "Economy";
      case 2:
        return "Normal";
      case 3:
        return "Fine";
      case 4:
        return "RAW";
      case 5:
        return "Superfine";
      case 7:
        return "CRAW";
      case 130:
        return "Normal Movie";
      case 1131:
        return "Movie (2)";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getDigitalZoomDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_DIGITAL_ZOOM, "No digital zoom", "2x", "4x");
  }

  public getRecordModeDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_RECORD_MODE, 1, "JPEG", "CRW+THM", "AVI+THM", "TIF", "TIF+JPEG", "CR2", "CR2+JPEG", null, "MOV", "MP4");
  }

  public getFocusTypeDescription(): string
  {
    let value: number = this._directory.getInteger(CameraSettings.TAG_FOCUS_TYPE);
    if (value == null)
    return null;
    switch (value) {
      case 0:
        return "Manual";
      case 1:
        return "Auto";
      case 3:
        return "Close-up (Macro)";
      case 8:
        return "Locked (Pan Mode)";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getFlashActivityDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_FLASH_ACTIVITY, "Flash did not fire", "Flash fired");
  }

  public getFocusContinuousDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_FOCUS_CONTINUOUS, 0,
      "Single", "Continuous", null, null, null, null, null, null, "Manual");
  }

  public getAESettingDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_AE_SETTING, 0,
      "Normal AE", "Exposure Compensation", "AE Lock", "AE Lock + Exposure Comp.", "No AE");
  }

  public getDisplayApertureDescription(): string
  {
    let value: number = this._directory.getInteger(CameraSettings.TAG_DISPLAY_APERTURE);
    if (value == null)
    return null;

    if (value == 0xFFFF)
    return value.toString();
    return TagDescriptor.getFStopDescription(value / 10);
  }

  public getSpotMeteringModeDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_SPOT_METERING_MODE, 0,
      "Center", "AF Point");
  }

  public getPhotoEffectDescription(): string
  {
    let value: number = this._directory.getInteger(CameraSettings.TAG_PHOTO_EFFECT);
    if (value == null)
    return null;

    switch (value) {
      case 0:
        return "Off";
      case 1:
        return "Vivid";
      case 2:
        return "Neutral";
      case 3:
        return "Smooth";
      case 4:
        return "Sepia";
      case 5:
        return "B&W";
      case 6:
        return "Custom";
      case 100:
        return "My Color Data";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getManualFlashOutputDescription(): string
  {
    let value: number = this._directory.getInteger(CameraSettings.TAG_MANUAL_FLASH_OUTPUT);
    if (value == null)
    return null;

    switch (value) {
      case 0:
        return "n/a";
      case 0x500:
        return "Full";
      case 0x502:
        return "Medium";
      case 0x504:
        return "Low";
      case 0x7fff:
        return "n/a"; // (EOS models)
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getColorToneDescription(): string
  {
    let value: number = this._directory.getInteger(CameraSettings.TAG_COLOR_TONE);
    if (value == null)
    return null;

    return value == 0x7fff ? "n/a" : value.toString();
  }

  public getSRawQualityDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_SRAW_QUALITY, 0, "n/a", "sRAW1 (mRAW)", "sRAW2 (sRAW)");
  }

  /**
   * Canon hex-based EV (modulo 0x20) to real number.
   *
   * Converted from Exiftool version 10.10 created by Phil Harvey
   *
   *         eg) 0x00 -> 0
   *             0x0c -> 0.33333
   *             0x10 -> 0.5
   *             0x14 -> 0.66666
   *             0x20 -> 1   ... etc
   */
  private decodeCanonEv(val: number): number
  {
    let sign: number = 1;
    if (val < 0) {
      val = -val;
      sign = -1;
    }

    let frac: number = val & 0x1f;
    val -= frac;

    if (frac == 0x0c)
    frac = 0x20 / 3;
    else if (frac == 0x14)
    frac = 0x40 / 3;

    return sign * (val + frac) / 0x20;
  }

  /**
   *  Map from <see cref="CanonMakernoteDirectory.CameraSettings.TagLensType"/> to string descriptions.
   *
   *  Note that only Canon lenses are listed. Lenses from other manufacturers may identify themselves to the camera
   *  as being from this set, but in fact may be quite different. This limits the usefulness of this data,
   *  unfortunately.
   */
  private static readonly _lensTypeById: Map<number, string> = new Map<number, string>([
    [1, "Canon EF 50mm f/1.8"],
    [2, "Canon EF 28mm f/2.8"],
    [3, "Canon EF 135mm f/2.8 Soft"],
    [4, "Canon EF 35-105mm f/3.5-4.5 or Sigma Lens"],
    [5, "Canon EF 35-70mm f/3.5-4.5"],
    [6, "Canon EF 28-70mm f/3.5-4.5 or Sigma or Tokina Lens"],
    [7, "Canon EF 100-300mm f/5.6L"],
    [8, "Canon EF 100-300mm f/5.6 or Sigma or Tokina Lens"],
    [9, "Canon EF 70-210mm f/4"],
    [10, "Canon EF 50mm f/2.5 Macro or Sigma Lens"],
    [11, "Canon EF 35mm f/2"],
    [13, "Canon EF 15mm f/2.8 Fisheye"],
    [14, "Canon EF 50-200mm f/3.5-4.5L"],
    [15, "Canon EF 50-200mm f/3.5-4.5"],
    [16, "Canon EF 35-135mm f/3.5-4.5"],
    [17, "Canon EF 35-70mm f/3.5-4.5A"],
    [18, "Canon EF 28-70mm f/3.5-4.5"],
    [20, "Canon EF 100-200mm f/4.5A"],
    [21, "Canon EF 80-200mm f/2.8L"],
    [22, "Canon EF 20-35mm f/2.8L or Tokina Lens"],
    [23, "Canon EF 35-105mm f/3.5-4.5"],
    [24, "Canon EF 35-80mm f/4-5.6 Power Zoom"],
    [25, "Canon EF 35-80mm f/4-5.6 Power Zoom"],
    [26, "Canon EF 100mm f/2.8 Macro or Other Lens"],
    [27, "Canon EF 35-80mm f/4-5.6"],
    [28, "Canon EF 80-200mm f/4.5-5.6 or Tamron Lens"],
    [29, "Canon EF 50mm f/1.8 II"],
    [30, "Canon EF 35-105mm f/4.5-5.6"],
    [31, "Canon EF 75-300mm f/4-5.6 or Tamron Lens"],
    [32, "Canon EF 24mm f/2.8 or Sigma Lens"],
    [33, "Voigtlander or Carl Zeiss Lens"],
    [35, "Canon EF 35-80mm f/4-5.6"],
    [36, "Canon EF 38-76mm f/4.5-5.6"],
    [37, "Canon EF 35-80mm f/4-5.6 or Tamron Lens"],
    [38, "Canon EF 80-200mm f/4.5-5.6"],
    [39, "Canon EF 75-300mm f/4-5.6"],
    [40, "Canon EF 28-80mm f/3.5-5.6"],
    [41, "Canon EF 28-90mm f/4-5.6"],
    [42, "Canon EF 28-200mm f/3.5-5.6 or Tamron Lens"],
    [43, "Canon EF 28-105mm f/4-5.6"],
    [44, "Canon EF 90-300mm f/4.5-5.6"],
    [45, "Canon EF-S 18-55mm f/3.5-5.6 [II]"],
    [46, "Canon EF 28-90mm f/4-5.6"],
    [47, "Zeiss Milvus 35mm f/2 or 50mm f/2"],
    [48, "Canon EF-S 18-55mm f/3.5-5.6 IS"],
    [49, "Canon EF-S 55-250mm f/4-5.6 IS"],
    [50, "Canon EF-S 18-200mm f/3.5-5.6 IS"],
    [51, "Canon EF-S 18-135mm f/3.5-5.6 IS"],
    [52, "Canon EF-S 18-55mm f/3.5-5.6 IS II"],
    [53, "Canon EF-S 18-55mm f/3.5-5.6 III"],
    [54, "Canon EF-S 55-250mm f/4-5.6 IS II"],
    [94, "Canon TS-E 17mm f/4L"],
    [95, "Canon TS-E 24.0mm f/3.5 L II"],
    [124, "Canon MP-E 65mm f/2.8 1-5x Macro Photo"],
    [125, "Canon TS-E 24mm f/3.5L"],
    [126, "Canon TS-E 45mm f/2.8"],
    [127, "Canon TS-E 90mm f/2.8"],
    [129, "Canon EF 300mm f/2.8L"],
    [130, "Canon EF 50mm f/1.0L"],
    [131, "Canon EF 28-80mm f/2.8-4L or Sigma Lens"],
    [132, "Canon EF 1200mm f/5.6L"],
    [134, "Canon EF 600mm f/4L IS"],
    [135, "Canon EF 200mm f/1.8L"],
    [136, "Canon EF 300mm f/2.8L"],
    [137, "Canon EF 85mm f/1.2L or Sigma or Tamron Lens"],
    [138, "Canon EF 28-80mm f/2.8-4L"],
    [139, "Canon EF 400mm f/2.8L"],
    [140, "Canon EF 500mm f/4.5L"],
    [141, "Canon EF 500mm f/4.5L"],
    [142, "Canon EF 300mm f/2.8L IS"],
    [143, "Canon EF 500mm f/4L IS or Sigma Lens"],
    [144, "Canon EF 35-135mm f/4-5.6 USM"],
    [145, "Canon EF 100-300mm f/4.5-5.6 USM"],
    [146, "Canon EF 70-210mm f/3.5-4.5 USM"],
    [147, "Canon EF 35-135mm f/4-5.6 USM"],
    [148, "Canon EF 28-80mm f/3.5-5.6 USM"],
    [149, "Canon EF 100mm f/2 USM"],
    [150, "Canon EF 14mm f/2.8L or Sigma Lens"],
    [151, "Canon EF 200mm f/2.8L"],
    [152, "Canon EF 300mm f/4L IS or Sigma Lens"],
    [153, "Canon EF 35-350mm f/3.5-5.6L or Sigma or Tamron Lens"],
    [154, "Canon EF 20mm f/2.8 USM or Zeiss Lens"],
    [155, "Canon EF 85mm f/1.8 USM"],
    [156, "Canon EF 28-105mm f/3.5-4.5 USM or Tamron Lens"],
    [160, "Canon EF 20-35mm f/3.5-4.5 USM or Tamron or Tokina Lens"],
    [161, "Canon EF 28-70mm f/2.8L or Sigma or Tamron Lens"],
    [162, "Canon EF 200mm f/2.8L"],
    [163, "Canon EF 300mm f/4L"],
    [164, "Canon EF 400mm f/5.6L"],
    [165, "Canon EF 70-200mm f/2.8 L"],
    [166, "Canon EF 70-200mm f/2.8 L + 1.4x"],
    [167, "Canon EF 70-200mm f/2.8 L + 2x"],
    [168, "Canon EF 28mm f/1.8 USM or Sigma Lens"],
    [169, "Canon EF 17-35mm f/2.8L or Sigma Lens"],
    [170, "Canon EF 200mm f/2.8L II"],
    [171, "Canon EF 300mm f/4L"],
    [172, "Canon EF 400mm f/5.6L or Sigma Lens"],
    [173, "Canon EF 180mm Macro f/3.5L or Sigma Lens"],
    [174, "Canon EF 135mm f/2L or Other Lens"],
    [175, "Canon EF 400mm f/2.8L"],
    [176, "Canon EF 24-85mm f/3.5-4.5 USM"],
    [177, "Canon EF 300mm f/4L IS"],
    [178, "Canon EF 28-135mm f/3.5-5.6 IS"],
    [179, "Canon EF 24mm f/1.4L"],
    [180, "Canon EF 35mm f/1.4L or Other Lens"],
    [181, "Canon EF 100-400mm f/4.5-5.6L IS + 1.4x or Sigma Lens"],
    [182, "Canon EF 100-400mm f/4.5-5.6L IS + 2x or Sigma Lens"],
    [183, "Canon EF 100-400mm f/4.5-5.6L IS or Sigma Lens"],
    [184, "Canon EF 400mm f/2.8L + 2x"],
    [185, "Canon EF 600mm f/4L IS"],
    [186, "Canon EF 70-200mm f/4L"],
    [187, "Canon EF 70-200mm f/4L + 1.4x"],
    [188, "Canon EF 70-200mm f/4L + 2x"],
    [189, "Canon EF 70-200mm f/4L + 2.8x"],
    [190, "Canon EF 100mm f/2.8 Macro USM"],
    [191, "Canon EF 400mm f/4 DO IS"],
    [193, "Canon EF 35-80mm f/4-5.6 USM"],
    [194, "Canon EF 80-200mm f/4.5-5.6 USM"],
    [195, "Canon EF 35-105mm f/4.5-5.6 USM"],
    [196, "Canon EF 75-300mm f/4-5.6 USM"],
    [197, "Canon EF 75-300mm f/4-5.6 IS USM"],
    [198, "Canon EF 50mm f/1.4 USM or Zeiss Lens"],
    [199, "Canon EF 28-80mm f/3.5-5.6 USM"],
    [200, "Canon EF 75-300mm f/4-5.6 USM"],
    [201, "Canon EF 28-80mm f/3.5-5.6 USM"],
    [202, "Canon EF 28-80mm f/3.5-5.6 USM IV"],
    [208, "Canon EF 22-55mm f/4-5.6 USM"],
    [209, "Canon EF 55-200mm f/4.5-5.6"],
    [210, "Canon EF 28-90mm f/4-5.6 USM"],
    [211, "Canon EF 28-200mm f/3.5-5.6 USM"],
    [212, "Canon EF 28-105mm f/4-5.6 USM"],
    [213, "Canon EF 90-300mm f/4.5-5.6 USM or Tamron Lens"],
    [214, "Canon EF-S 18-55mm f/3.5-5.6 USM"],
    [215, "Canon EF 55-200mm f/4.5-5.6 II USM"],
    [217, "Tamron AF 18-270mm f/3.5-6.3 Di II VC PZD"],
    [224, "Canon EF 70-200mm f/2.8L IS"],
    [225, "Canon EF 70-200mm f/2.8L IS + 1.4x"],
    [226, "Canon EF 70-200mm f/2.8L IS + 2x"],
    [227, "Canon EF 70-200mm f/2.8L IS + 2.8x"],
    [228, "Canon EF 28-105mm f/3.5-4.5 USM"],
    [229, "Canon EF 16-35mm f/2.8L"],
    [230, "Canon EF 24-70mm f/2.8L"],
    [231, "Canon EF 17-40mm f/4L"],
    [232, "Canon EF 70-300mm f/4.5-5.6 DO IS USM"],
    [233, "Canon EF 28-300mm f/3.5-5.6L IS"],
    [234, "Canon EF-S 17-85mm f/4-5.6 IS USM or Tokina Lens"],
    [235, "Canon EF-S 10-22mm f/3.5-4.5 USM"],
    [236, "Canon EF-S 60mm f/2.8 Macro USM"],
    [237, "Canon EF 24-105mm f/4L IS"],
    [238, "Canon EF 70-300mm f/4-5.6 IS USM"],
    [239, "Canon EF 85mm f/1.2L II"],
    [240, "Canon EF-S 17-55mm f/2.8 IS USM"],
    [241, "Canon EF 50mm f/1.2L"],
    [242, "Canon EF 70-200mm f/4L IS"],
    [243, "Canon EF 70-200mm f/4L IS + 1.4x"],
    [244, "Canon EF 70-200mm f/4L IS + 2x"],
    [245, "Canon EF 70-200mm f/4L IS + 2.8x"],
    [246, "Canon EF 16-35mm f/2.8L II"],
    [247, "Canon EF 14mm f/2.8L II USM"],
    [248, "Canon EF 200mm f/2L IS or Sigma Lens"],
    [249, "Canon EF 800mm f/5.6L IS"],
    [250, "Canon EF 24mm f/1.4L II or Sigma Lens"],
    [251, "Canon EF 70-200mm f/2.8L IS II USM"],
    [252, "Canon EF 70-200mm f/2.8L IS II USM + 1.4x"],
    [253, "Canon EF 70-200mm f/2.8L IS II USM + 2x"],
    [254, "Canon EF 100mm f/2.8L Macro IS USM"],
    [255, "Sigma 24-105mm f/4 DG OS HSM | A or Other Sigma Lens"],
    [488, "Canon EF-S 15-85mm f/3.5-5.6 IS USM"],
    [489, "Canon EF 70-300mm f/4-5.6L IS USM"],
    [490, "Canon EF 8-15mm f/4L Fisheye USM"],
    [491, "Canon EF 300mm f/2.8L IS II USM"],
    [492, "Canon EF 400mm f/2.8L IS II USM"],
    [493, "Canon EF 500mm f/4L IS II USM or EF 24-105mm f4L IS USM"],
    [494, "Canon EF 600mm f/4.0L IS II USM"],
    [495, "Canon EF 24-70mm f/2.8L II USM"],
    [496, "Canon EF 200-400mm f/4L IS USM"],
    [499, "Canon EF 200-400mm f/4L IS USM + 1.4x"],
    [502, "Canon EF 28mm f/2.8 IS USM"],
    [503, "Canon EF 24mm f/2.8 IS USM"],
    [504, "Canon EF 24-70mm f/4L IS USM"],
    [505, "Canon EF 35mm f/2 IS USM"],
    [506, "Canon EF 400mm f/4 DO IS II USM"],
    [507, "Canon EF 16-35mm f/4L IS USM"],
    [508, "Canon EF 11-24mm f/4L USM"],
    [747, "Canon EF 100-400mm f/4.5-5.6L IS II USM"],
    [750, "Canon EF 35mm f/1.4L II USM"],
    [4142, "Canon EF-S 18-135mm f/3.5-5.6 IS STM"],
    [4143, "Canon EF-M 18-55mm f/3.5-5.6 IS STM or Tamron Lens"],
    [4144, "Canon EF 40mm f/2.8 STM"],
    [4145, "Canon EF-M 22mm f/2 STM"],
    [4146, "Canon EF-S 18-55mm f/3.5-5.6 IS STM"],
    [4147, "Canon EF-M 11-22mm f/4-5.6 IS STM"],
    [4148, "Canon EF-S 55-250mm f/4-5.6 IS STM"],
    [4149, "Canon EF-M 55-200mm f/4.5-6.3 IS STM"],
    [4150, "Canon EF-S 10-18mm f/4.5-5.6 IS STM"],
    [4152, "Canon EF 24-105mm f/3.5-5.6 IS STM"],
    [4153, "Canon EF-M 15-45mm f/3.5-6.3 IS STM"],
    [4154, "Canon EF-S 24mm f/2.8 STM"],
    [4156, "Canon EF 50mm f/1.8 STM"],
    [36912, "Canon EF-S 18-135mm f/3.5-5.6 IS USM"],
    [65535, "N/A"]
  ]);
}

export default CanonMakernoteDescriptor