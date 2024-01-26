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

import NikonType2MakernoteDirectory from './NikonType2MakernoteDirectory';
import TagDescriptor from '../../TagDescriptor';

/**
 * Provides human-readable string representations of tag values stored in a {@link NikonType2MakernoteDirectory}.
 *
 * Type-2 applies to the E990 and D-series cameras such as the D1, D70 and D100.
 *
 */

class NikonType2MakernoteDescriptor extends TagDescriptor<NikonType2MakernoteDirectory> {
  constructor(directory: NikonType2MakernoteDirectory) {
    super(directory);
  }

  public getDescription(tagType: number): string {
    switch (tagType) {
      case NikonType2MakernoteDirectory.TAG_PROGRAM_SHIFT:
        return this.getProgramShiftDescription();
      case NikonType2MakernoteDirectory.TAG_EXPOSURE_DIFFERENCE:
        return this.getExposureDifferenceDescription();
      case NikonType2MakernoteDirectory.TAG_LENS:
        return this.getLensDescription();
      case NikonType2MakernoteDirectory.TAG_CAMERA_HUE_ADJUSTMENT:
        return this.getHueAdjustmentDescription();
      case NikonType2MakernoteDirectory.TAG_CAMERA_COLOR_MODE:
        return this.getColorModeDescription();
      case NikonType2MakernoteDirectory.TAG_AUTO_FLASH_COMPENSATION:
        return this.getAutoFlashCompensationDescription();
      case NikonType2MakernoteDirectory.TAG_FLASH_EXPOSURE_COMPENSATION:
        return this.getFlashExposureCompensationDescription();
      case NikonType2MakernoteDirectory.TAG_FLASH_BRACKET_COMPENSATION:
        return this.getFlashBracketCompensationDescription();
      case NikonType2MakernoteDirectory.TAG_EXPOSURE_TUNING:
        return this.getExposureTuningDescription();
      case NikonType2MakernoteDirectory.TAG_LENS_STOPS:
        return this.getLensStopsDescription();
      case NikonType2MakernoteDirectory.TAG_COLOR_SPACE:
        return this.getColorSpaceDescription();
      case NikonType2MakernoteDirectory.TAG_ACTIVE_D_LIGHTING:
        return this.getActiveDLightingDescription();
      case NikonType2MakernoteDirectory.TAG_VIGNETTE_CONTROL:
        return this.getVignetteControlDescription();
      case NikonType2MakernoteDirectory.TAG_ISO_1:
        return this.getIsoSettingDescription();
      case NikonType2MakernoteDirectory.TAG_DIGITAL_ZOOM:
        return this.getDigitalZoomDescription();
      case NikonType2MakernoteDirectory.TAG_FLASH_USED:
        return this.getFlashUsedDescription();
      case NikonType2MakernoteDirectory.TAG_AF_FOCUS_POSITION:
        return this.getAutoFocusPositionDescription();
      case NikonType2MakernoteDirectory.TAG_FIRMWARE_VERSION:
        return this.getFirmwareVersionDescription();
      case NikonType2MakernoteDirectory.TAG_LENS_TYPE:
        return this.getLensTypeDescription();
      case NikonType2MakernoteDirectory.TAG_SHOOTING_MODE:
        return this.getShootingModeDescription();
      case NikonType2MakernoteDirectory.TAG_NEF_COMPRESSION:
        return this.getNEFCompressionDescription();
      case NikonType2MakernoteDirectory.TAG_HIGH_ISO_NOISE_REDUCTION:
        return this.getHighISONoiseReductionDescription();
      case NikonType2MakernoteDirectory.TAG_POWER_UP_TIME:
        return this.getPowerUpTimeDescription();
      default:
        return super.getDescription(tagType);
    }
  }

  public getPowerUpTimeDescription(): string {
    // this is generally a byte[] of length 8 directly representing a date and time.
    // the format is : first 2 bytes together are the year, and then each byte after
    //                 is month, day, hour, minute, second with the eighth byte unused
    // e.g., 2011:04:25 01:54:58

    let values = this._directory.getByteArray(NikonType2MakernoteDirectory.TAG_POWER_UP_TIME);
    let year = parseInt(values[0].toString() + values[1].toString());
    return parseInt(year.toString()).toFixed(4).toString() + ":" +
      parseInt(values[2].toString()).toFixed(2).toString() + ":" +
      parseInt(values[3].toString()).toFixed(2).toString() + ":" +
      parseInt(values[4].toString()).toFixed(2).toString() + ":" +
      parseInt(values[5].toString()).toFixed(2).toString() + ":" +
      parseInt(values[6].toString()).toFixed(2).toString();
  }

  public getHighISONoiseReductionDescription(): string {
    return this.getIndexedDescription(NikonType2MakernoteDirectory.TAG_HIGH_ISO_NOISE_REDUCTION,
      "Off",
      "Minimal",
      "Low",
      null,
      "Normal",
      null,
      "High"
    );
  }

  public getFlashUsedDescription(): string {
    return this.getIndexedDescription(NikonType2MakernoteDirectory.TAG_FLASH_USED,
      "Flash Not Used",
      "Manual Flash",
      null,
      "Flash Not Ready",
      null,
      null,
      null,
      "External Flash",
      "Fired, Commander Mode",
      "Fired, TTL Mode"
    );
  }

  public getNEFCompressionDescription(): string {
    return this.getIndexedDescription(NikonType2MakernoteDirectory.TAG_NEF_COMPRESSION,
      1,
      "Lossy (Type 1)",
      null,
      "Uncompressed",
      null,
      null,
      null,
      "Lossless",
      "Lossy (Type 2)"
    );
  }

  public getShootingModeDescription(): string {
    return this.getBitFlagDescription(NikonType2MakernoteDirectory.TAG_SHOOTING_MODE,
      // LSB [low label, high label]
      [["Single Frame", "Continuous"],
      "Delay",
      null,
      "PC Control",
      "Exposure Bracketing",
      "Auto ISO",
      "White-Balance Bracketing",
      "IR Control"
      ]
    );
  }

  public getLensTypeDescription(): string {
    return this.getBitFlagDescription(NikonType2MakernoteDirectory.TAG_LENS_TYPE,
      // LSB [low label, high label]
      [["AF", "MF"],
      "D",
      "G",
      "VR"
      ]
    );
  }

  public getColorSpaceDescription(): string {
    return this.getIndexedDescription(NikonType2MakernoteDirectory.TAG_COLOR_SPACE,
      1,
      "sRGB",
      "Adobe RGB"
    );
  }

  public getActiveDLightingDescription(): string {
    let value = this._directory.getInteger(NikonType2MakernoteDirectory.TAG_ACTIVE_D_LIGHTING);
    if (value==null) {
      return null;
    }
    switch (value) {
      case 0: return "Off";
      case 1: return "Light";
      case 3: return "Normal";
      case 5: return "High";
      case 7: return "Extra High";
      case 65535: return "Auto";
      default: return "Unknown (" + value + ")";
    }
  }

  public getVignetteControlDescription(): string {
    let value = this._directory.getInteger(NikonType2MakernoteDirectory.TAG_VIGNETTE_CONTROL);
    if (value==null) {
      return null;
    }
    switch (value) {
      case 0: return "Off";
      case 1: return "Low";
      case 3: return "Normal";
      case 5: return "High";
      default: return "Unknown (" + value + ")";
    }
  }

  public getAutoFocusPositionDescription(): string {
    let values: Array<number> = this._directory.getIntArray(NikonType2MakernoteDirectory.TAG_AF_FOCUS_POSITION);
    if (values==null){
      return null;
    }
    if (values.length != 4 || values[0] != 0 || values[2] != 0 || values[3] != 0) {
      return "Unknown (" + this._directory.getString(NikonType2MakernoteDirectory.TAG_AF_FOCUS_POSITION) + ")";
    }
    switch (values[1]) {
      case 0:
        return "Centre";
      case 1:
        return "Top";
      case 2:
        return "Bottom";
      case 3:
        return "Left";
      case 4:
        return "Right";
      default:
        return "Unknown (" + values[1] + ")";
    }
  }

  public getDigitalZoomDescription(): string {
    let value = this._directory.getRational(NikonType2MakernoteDirectory.TAG_DIGITAL_ZOOM);
    if (value == null) {
      return null;
    }
    return value.numberValue() == 1
      ? "No digital zoom"
      : value.toSimpleString(true) + "x digital zoom";
    }

  public getProgramShiftDescription(): string {
    return this.getEVDescription(NikonType2MakernoteDirectory.TAG_PROGRAM_SHIFT);
  }

  public getExposureDifferenceDescription(): string {
    return this.getEVDescription(NikonType2MakernoteDirectory.TAG_EXPOSURE_DIFFERENCE);
  }

  public getAutoFlashCompensationDescription(): string {
    return this.getEVDescription(NikonType2MakernoteDirectory.TAG_AUTO_FLASH_COMPENSATION);
  }

  public getFlashExposureCompensationDescription(): string {
    return this.getEVDescription(NikonType2MakernoteDirectory.TAG_FLASH_EXPOSURE_COMPENSATION);
  }

  public getFlashBracketCompensationDescription(): string {
    return this.getEVDescription(NikonType2MakernoteDirectory.TAG_FLASH_BRACKET_COMPENSATION);
  }

  public getExposureTuningDescription(): string {
    return this.getEVDescription(NikonType2MakernoteDirectory.TAG_EXPOSURE_TUNING);
  }

  public getLensStopsDescription(): string {
    return this.getEVDescription(NikonType2MakernoteDirectory.TAG_LENS_STOPS);
  }

  private getEVDescription(tagType: number): string {
    let values: Array<number> = this._directory.getIntArray(tagType);
    if (values == null || values.length < 2) {
      return null;
    }
    if (values.length < 3 || values[2] == 0) {
      return null;
    }
    let ev = values[0] * values[1] / values[2];
    return ev.toFixed(4) + " EV";
  }

  public getIsoSettingDescription(): string {
    let values: Array<number> = this._directory.getIntArray(NikonType2MakernoteDirectory.TAG_ISO_1);
    if (values == null) {
      return null;
    }
    if (values[0] != 0 || values[1] == 0) {
      return "Unknown (" + this._directory.getString(NikonType2MakernoteDirectory.TAG_ISO_1) + ")";
    }
    return "ISO " + values[1];
  }

  public getLensDescription(): string {
    return this.getLensSpecificationDescription(NikonType2MakernoteDirectory.TAG_LENS);
  }

  public getLensFocusDistance(): string {
    let values: Array<number> = this._directory.getDecryptedIntArray(NikonType2MakernoteDirectory.TAG_LENS_DATA);

    if (values == null || values.length < 11) {
      return null;
    }

    return this.getDistanceInMeters(values[10]).toFixed(4) + "m"
  }

  public getHueAdjustmentDescription(): string {
    return this.getFormattedString(NikonType2MakernoteDirectory.TAG_CAMERA_HUE_ADJUSTMENT, "%s degrees");
  }

  public getColorModeDescription(): string {
    let value = this._directory.getString(NikonType2MakernoteDirectory.TAG_CAMERA_COLOR_MODE);
    return value == null ? null : value.startsWith("MODE1") ? "Mode I (sRGB)" : value;
  }

  public getFirmwareVersionDescription(): string {
    return this.getVersionBytesDescription(NikonType2MakernoteDirectory.TAG_FIRMWARE_VERSION, 2);
  }

  private  getDistanceInMeters(val: number): number {
    if (val < 0) {
      val += 256;
    }
    return 0.01 * Math.pow(10, val / 40);
  }
}

export default NikonType2MakernoteDescriptor
