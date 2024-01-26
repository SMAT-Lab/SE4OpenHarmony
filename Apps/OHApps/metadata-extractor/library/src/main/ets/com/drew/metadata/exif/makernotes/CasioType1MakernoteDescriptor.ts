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


import TagDescriptor from '../../TagDescriptor';
import CasioType1MakernoteDirectory from './CasioType1MakernoteDirectory';

export default class CasioType1MakernoteDescriptor extends TagDescriptor<CasioType1MakernoteDirectory> {
  public constructor(directory: CasioType1MakernoteDirectory) {
    super(directory);
  }

  public getDescription(tagType: number): string
  {
    switch (tagType) {
      case CasioType1MakernoteDirectory.TAG_RECORDING_MODE:
        return this.getRecordingModeDescription();
      case CasioType1MakernoteDirectory.TAG_QUALITY:
        return this.getQualityDescription();
      case CasioType1MakernoteDirectory.TAG_FOCUSING_MODE:
        return this.getFocusingModeDescription();
      case CasioType1MakernoteDirectory.TAG_FLASH_MODE:
        return this.getFlashModeDescription();
      case CasioType1MakernoteDirectory.TAG_FLASH_INTENSITY:
        return this.getFlashIntensityDescription();
      case CasioType1MakernoteDirectory.TAG_OBJECT_DISTANCE:
        return this.getObjectDistanceDescription();
      case CasioType1MakernoteDirectory.TAG_WHITE_BALANCE:
        return this.getWhiteBalanceDescription();
      case CasioType1MakernoteDirectory.TAG_DIGITAL_ZOOM:
        return this.getDigitalZoomDescription();
      case CasioType1MakernoteDirectory.TAG_SHARPNESS:
        return this.getSharpnessDescription();
      case CasioType1MakernoteDirectory.TAG_CONTRAST:
        return this.getContrastDescription();
      case CasioType1MakernoteDirectory.TAG_SATURATION:
        return this.getSaturationDescription();
      case CasioType1MakernoteDirectory.TAG_CCD_SENSITIVITY:
        return this.getCcdSensitivityDescription();
      default:
        return super.getDescription(tagType);
    }
  }

  public getCcdSensitivityDescription(): string
  {
    let value = this._directory.getInteger(CasioType1MakernoteDirectory.TAG_CCD_SENSITIVITY);
    switch (value) {
    // these four for QV3000
      case 64:
        return "Normal";
      case 125:
        return "+1.0";
      case 250:
        return "+2.0";
      case 244:
        return "+3.0";
    // these two for QV8000/2000
      case 80:
        return "Normal (ISO 80 equivalent)";
      case 100:
        return "High";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getSaturationDescription(): string
  {
    return this.getIndexedDescription(CasioType1MakernoteDirectory.TAG_SATURATION, "Normal", "Low", "High");
  }

  public getContrastDescription(): string
  {
    return this.getIndexedDescription(CasioType1MakernoteDirectory.TAG_CONTRAST, "Normal", "Low", "High");
  }

  public getSharpnessDescription(): string
  {
    return this.getIndexedDescription(CasioType1MakernoteDirectory.TAG_SHARPNESS, "Normal", "Soft", "Hard");
  }

  public getDigitalZoomDescription(): string
  {
    let value = this._directory.getInteger(CasioType1MakernoteDirectory.TAG_DIGITAL_ZOOM);

    switch (value) {
      case 0x10000:
        return "No digital zoom";
      case 0x10001:
        return "2x digital zoom";
      case 0x20000:
        return "2x digital zoom";
      case 0x40000:
        return "4x digital zoom";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getWhiteBalanceDescription(): string
  {
    let value = this._directory.getInteger(CasioType1MakernoteDirectory.TAG_WHITE_BALANCE);

    switch (value) {
      case 1:
        return "Auto";
      case 2:
        return "Tungsten";
      case 3:
        return "Daylight";
      case 4:
        return "Florescent";
      case 5:
        return "Shade";
      case 129:
        return "Manual";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getObjectDistanceDescription(): string
  {
    let value:Number = this._directory.getInteger(CasioType1MakernoteDirectory.TAG_OBJECT_DISTANCE);
    return TagDescriptor.getFocalLengthDescription(value.valueOf());
  }

  public getFlashIntensityDescription(): string
  {
    let value = this._directory.getInteger(CasioType1MakernoteDirectory.TAG_FLASH_INTENSITY);
    switch (value) {
      case 11:
        return "Weak";
      case 13:
        return "Normal";
      case 15:
        return "Strong";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getFlashModeDescription(): string
  {
    return this.getIndexedDescription(CasioType1MakernoteDirectory.TAG_FLASH_MODE, 1, "Auto", "On", "Off", "Red eye reduction");
  }

  public getFocusingModeDescription(): string
  {
    return this.getIndexedDescription(CasioType1MakernoteDirectory.TAG_FOCUSING_MODE, 2, "Macro", "Auto focus", "Manual focus", "Infinity");
  }

  public getQualityDescription(): string
  {
    return this.getIndexedDescription(CasioType1MakernoteDirectory.TAG_QUALITY, 1, "Economy", "Normal", "Fine");
  }

  public getRecordingModeDescription(): string
  {
    return this.getIndexedDescription(CasioType1MakernoteDirectory.TAG_RECORDING_MODE, 1, "Single shutter", "Panorama", "Night scene", "Portrait", "Landscape");
  }
}