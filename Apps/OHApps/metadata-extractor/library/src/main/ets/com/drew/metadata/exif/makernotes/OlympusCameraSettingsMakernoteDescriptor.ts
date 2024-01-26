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
import OlympusCameraSettingsMakernoteDirectory from './OlympusCameraSettingsMakernoteDirectory';

class OlympusCameraSettingsMakernoteDescriptor extends TagDescriptor<OlympusCameraSettingsMakernoteDirectory> {
  constructor(directory: OlympusCameraSettingsMakernoteDirectory) {
    super(directory);
  }

  public getDescription(tagType: number) {
    switch (tagType) {
      case OlympusCameraSettingsMakernoteDirectory.TagCameraSettingsVersion:
        return this.getCameraSettingsVersionDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagPreviewImageValid:
        return this.getPreviewImageValidDescription();

      case OlympusCameraSettingsMakernoteDirectory.TagExposureMode:
        return this.getExposureModeDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagAeLock:
        return this.getAeLockDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagMeteringMode:
        return this.getMeteringModeDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagExposureShift:
        return this.getExposureShiftDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagNdFilter:
        return this.getNdFilterDescription();

      case OlympusCameraSettingsMakernoteDirectory.TagMacroMode:
        return this.getMacroModeDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagFocusMode:
        return this.getFocusModeDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagFocusProcess:
        return this.getFocusProcessDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagAfSearch:
        return this.getAfSearchDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagAfAreas:
        return this.getAfAreasDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagAfPointSelected:
        return this.getAfPointSelectedDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagAfFineTune:
        return this.getAfFineTuneDescription();

      case OlympusCameraSettingsMakernoteDirectory.TagFlashMode:
        return this.getFlashModeDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagFlashRemoteControl:
        return this.getFlashRemoteControlDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagFlashControlMode:
        return this.getFlashControlModeDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagFlashIntensity:
        return this.getFlashIntensityDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagManualFlashStrength:
        return this.getManualFlashStrengthDescription();

      case OlympusCameraSettingsMakernoteDirectory.TagWhiteBalance2:
        return this.getWhiteBalance2Description();
      case OlympusCameraSettingsMakernoteDirectory.TagWhiteBalanceTemperature:
        return this.getWhiteBalanceTemperatureDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagCustomSaturation:
        return this.getCustomSaturationDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagModifiedSaturation:
        return this.getModifiedSaturationDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagContrastSetting:
        return this.getContrastSettingDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagSharpnessSetting:
        return this.getSharpnessSettingDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagColorSpace:
        return this.getColorSpaceDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagSceneMode:
        return this.getSceneModeDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagNoiseReduction:
        return this.getNoiseReductionDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagDistortionCorrection:
        return this.getDistortionCorrectionDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagShadingCompensation:
        return this.getShadingCompensationDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagGradation:
        return this.getGradationDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagPictureMode:
        return this.getPictureModeDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagPictureModeSaturation:
        return this.getPictureModeSaturationDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagPictureModeContrast:
        return this.getPictureModeContrastDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagPictureModeSharpness:
        return this.getPictureModeSharpnessDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagPictureModeBWFilter:
        return this.getPictureModeBWFilterDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagPictureModeTone:
        return this.getPictureModeToneDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagNoiseFilter:
        return this.getNoiseFilterDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagArtFilter:
        return this.getArtFilterDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagMagicFilter:
        return this.getMagicFilterDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagPictureModeEffect:
        return this.getPictureModeEffectDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagToneLevel:
        return this.getToneLevelDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagArtFilterEffect:
        return this.getArtFilterEffectDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagColorCreatorEffect:
        return this.getColorCreatorEffectDescription();

      case OlympusCameraSettingsMakernoteDirectory.TagDriveMode:
        return this.getDriveModeDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagPanoramaMode:
        return this.getPanoramaModeDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagImageQuality2:
        return this.getImageQuality2Description();
      case OlympusCameraSettingsMakernoteDirectory.TagImageStabilization:
        return this.getImageStabilizationDescription();

      case OlympusCameraSettingsMakernoteDirectory.TagStackedImage:
        return this.getStackedImageDescription();

      case OlympusCameraSettingsMakernoteDirectory.TagManometerPressure:
        return this.getManometerPressureDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagManometerReading:
        return this.getManometerReadingDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagExtendedWBDetect:
        return this.getExtendedWBDetectDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagRollAngle:
        return this.getRollAngleDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagPitchAngle:
        return this.getPitchAngleDescription();
      case OlympusCameraSettingsMakernoteDirectory.TagDateTimeUtc:
        return this.getDateTimeUTCDescription();

      default:
        return super.getDescription(tagType);
    }
  }

  public getCameraSettingsVersionDescription(): string
  {
    return this.getVersionBytesDescription(OlympusCameraSettingsMakernoteDirectory.TagCameraSettingsVersion, 4);
  }

  public getPreviewImageValidDescription(): string
  {
    return this.getIndexedDescription(OlympusCameraSettingsMakernoteDirectory.TagPreviewImageValid, null,
      "No", "Yes");
  }

  public getExposureModeDescription(): string
  {
    return this.getIndexedDescription(OlympusCameraSettingsMakernoteDirectory.TagExposureMode, 1,
      "Manual", "Program", "Aperture-priority AE", "Shutter speed priority", "Program-shift");
  }

  public getAeLockDescription(): string
  {
    return this.getIndexedDescription(OlympusCameraSettingsMakernoteDirectory.TagAeLock, null,
      "Off", "On");
  }

  public getMeteringModeDescription(): string
  {
    let value = this._directory.getInteger(OlympusCameraSettingsMakernoteDirectory.TagMeteringMode);
    if (value == null)
    return null;

    switch (value) {
      case 2:
        return "Center-weighted average";
      case 3:
        return "Spot";
      case 5:
        return "ESP";
      case 261:
        return "Pattern+AF";
      case 515:
        return "Spot+Highlight control";
      case 1027:
        return "Spot+Shadow control";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getExposureShiftDescription(): string
  {
    return this.getRationalOrDoubleString(OlympusCameraSettingsMakernoteDirectory.TagExposureShift);
  }

  public getNdFilterDescription(): string
  {
    return this.getIndexedDescription(OlympusCameraSettingsMakernoteDirectory.TagNdFilter, null, "Off", "On");
  }

  public getMacroModeDescription(): string
  {
    return this.getIndexedDescription(OlympusCameraSettingsMakernoteDirectory.TagMacroMode, null, "Off", "On", "Super Macro");
  }

  public getFocusModeDescription(): string
  {
    let values = this._directory.getIntArray(OlympusCameraSettingsMakernoteDirectory.TagFocusMode);
    if (values == null) {
      // check if it's only one value long also
      let value = this._directory.getInteger(OlympusCameraSettingsMakernoteDirectory.TagFocusMode);
      if (value == null)
      return null;

      values = [value];
    }

    if (values.length == 0)
    return null;

    let sb = '';
    switch (values[0]) {
      case 0:
        sb + "Single AF";
        break;
      case 1:
        sb + "Sequential shooting AF";
        break;
      case 2:
        sb + "Continuous AF";
        break;
      case 3:
        sb + "Multi AF";
        break;
      case 4:
        sb + "Face detect";
        break;
      case 10:
        sb + "MF";
        break;
      default:
        sb + "Unknown (" + values[0] + ")";
        break;
    }

    if (values.length > 1) {
      sb + "; ";
      let value1 = values[1];

      if (value1 == 0) {
        sb + "(none)";
      } else {
        if ((value1 & 1) > 0) sb + "S-AF, ";
        if (((value1 >> 2) & 1) > 0) sb + "C-AF, ";
        if (((value1 >> 4) & 1) > 0) sb + "MF, ";
        if (((value1 >> 5) & 1) > 0) sb + "Face detect, ";
        if (((value1 >> 6) & 1) > 0) sb + "Imager AF, ";
        if (((value1 >> 7) & 1) > 0) sb + "Live View Magnification Frame, ";
        if (((value1 >> 8) & 1) > 0) sb + "AF sensor, ";

        //                sb.setLength(sb.length() - 2);
      }
    }

    return sb;
  }

  public getFocusProcessDescription(): string
  {
    let values = this._directory.getIntArray(OlympusCameraSettingsMakernoteDirectory.TagFocusProcess);
    if (values == null) {
      // check if it's only one value long also
      let value = this._directory.getInteger(OlympusCameraSettingsMakernoteDirectory.TagFocusProcess);
      if (value == null)
      return null;

      values = [value];
    }

    if (values.length == 0)
    return null;

    let sb = '';

    switch (values[0]) {
      case 0:
        sb + "AF not used";
        break;
      case 1:
        sb + "AF used";
        break;
      default:
        sb + "Unknown (" + values[0] + ")";
        break;
    }

    if (values.length > 1)
    sb + "; " + values[1];

    return sb;
  }

  public getAfSearchDescription(): string
  {
    return this.getIndexedDescription(OlympusCameraSettingsMakernoteDirectory.TagAfSearch, null, "Not Ready", "Ready");
  }

  /** coordinates range from 0 to 255 */

  public getAfAreasDescription(): string
  {
    let obj = this._directory.getObject(OlympusCameraSettingsMakernoteDirectory.TagAfAreas);
    if (obj == null || !(obj instanceof Array))
    return null;

    let sb = '';
    for (let point of obj) {
      if (point == 0)
      continue;
      if (sb.length != 0)
      sb + ", ";

      if (point == 0x36794285)
      sb + "Left ";
      else if (point == 0x79798585)
      sb + "Center ";
      else if (point == 0xBD79C985)
      sb + "Right ";

      sb = sb + "(%d/255,%d/255)-(%d/255,%d/255)"
        .replace(/%d/, ((point >> 24) & 0xFF).toString())
        .replace(/%d/, ((point >> 16) & 0xFF).toString())
        .replace(/%d/, ((point >> 8) & 0xFF).toString())
        .replace(/%d/, (point & 0xFF).toString())
      //                (point >> 24) & 0xFF,
      //                (point >> 16) & 0xFF,
      //                (point >> 8) & 0xFF,
      //                point & 0xFF);
    }

    return sb.length == 0 ? null : sb;
  }

  /** coordinates expressed as a percent */

  public getAfPointSelectedDescription(): string
  {
    let values = this._directory.getRationalArray(OlympusCameraSettingsMakernoteDirectory.TagAfPointSelected);
    if (values == null)
    return "n/a";

    if (values.length < 4)
    return null;

    let index = 0;
    if (values.length == 5 && values[0].numberValue() == 0)
    index = 1;

    let p1 = (values[index].numberValue() * 100);
    let p2 = (values[index + 1].numberValue() * 100);
    let p3 = (values[index + 2].numberValue() * 100);
    let p4 = (values[index + 3].numberValue() * 100);

    if (p1 + p2 + p3 + p4 == 0)
    return "n/a";
    return "(%d%%,%d%%) (%d%%,%d%%)".replace(/%d%%/, p1.toString())
      .replace(/%d%%/, p2.toString())
      .replace(/%d%%/, p3.toString())
      .replace(/%d%%/, p4.toString())
    //        return String.format("(%d%%,%d%%) (%d%%,%d%%)", p1, p2, p3, p4);
  }

  public getAfFineTuneDescription(): string
  {
    return this.getIndexedDescription(OlympusCameraSettingsMakernoteDirectory.TagAfFineTune, null, "Off", "On");
  }

  public getFlashModeDescription(): string
  {
    let value = this._directory.getInteger(OlympusCameraSettingsMakernoteDirectory.TagFlashMode);
    if (value == null)
    return null;

    if (value == 0)
    return "Off";

    let sb = '';
    let v = value;

    if ((v & 1) != 0) sb + "On, ";
    if (((v >> 1) & 1) != 0) sb + "Fill-in, ";
    if (((v >> 2) & 1) != 0) sb + "Red-eye, ";
    if (((v >> 3) & 1) != 0) sb + "Slow-sync, ";
    if (((v >> 4) & 1) != 0) sb + "Forced On, ";
    if (((v >> 5) & 1) != 0) sb + "2nd Curtain, ";

    return sb.substring(0, sb.length - 2);
  }

  public getFlashRemoteControlDescription(): string
  {
    let value = this._directory.getInteger(OlympusCameraSettingsMakernoteDirectory.TagFlashRemoteControl);
    if (value == null)
    return null;

    switch (value) {
      case 0:
        return "Off";
      case 0x01:
        return "Channel 1, Low";
      case 0x02:
        return "Channel 2, Low";
      case 0x03:
        return "Channel 3, Low";
      case 0x04:
        return "Channel 4, Low";
      case 0x09:
        return "Channel 1, Mid";
      case 0x0a:
        return "Channel 2, Mid";
      case 0x0b:
        return "Channel 3, Mid";
      case 0x0c:
        return "Channel 4, Mid";
      case 0x11:
        return "Channel 1, High";
      case 0x12:
        return "Channel 2, High";
      case 0x13:
        return "Channel 3, High";
      case 0x14:
        return "Channel 4, High";

      default:
        return "Unknown (" + value + ")";
    }
  }

  /** 3 or 4 values */

  public getFlashControlModeDescription(): string
  {
    let values = this._directory.getIntArray(OlympusCameraSettingsMakernoteDirectory.TagFlashControlMode);
    if (values == null)
    return null;

    if (values.length == 0)
    return null;

    let sb = '';

    switch (values[0]) {
      case 0:
        sb + "Off";
        break;
      case 3:
        sb + "TTL";
        break;
      case 4:
        sb + "Auto";
        break;
      case 5:
        sb + "Manual";
        break;
      default:
        sb + "Unknown (" + values[0] + ")";
        break;
    }

    for (let i = 1; i < values.length; i++)
    sb + "; " + values[i];

    return sb;
  }

  /** 3 or 4 values */

  public getFlashIntensityDescription(): string
  {
    let values = this._directory.getRationalArray(OlympusCameraSettingsMakernoteDirectory.TagFlashIntensity);
    if (values == null || values.length == 0)
    return null;

    if (values.length == 3) {
      if (values[0].getDenominator() == 0 && values[1].getDenominator() == 0 && values[2].getDenominator() == 0)
      return "n/a";
    } else if (values.length == 4) {
      if (values[0].getDenominator() == 0 && values[1].getDenominator() == 0 && values[2].getDenominator() == 0 && values[3].getDenominator() == 0)
      return "n/a (x4)";
    }

    let sb = '';
    for (let t of values)
    sb + t + ", ";

    return sb.substring(0, sb.length - 2);
  }

  public getManualFlashStrengthDescription(): string
  {
    let values = this._directory.getRationalArray(OlympusCameraSettingsMakernoteDirectory.TagManualFlashStrength);
    if (values == null || values.length == 0)
    return "n/a";

    if (values.length == 3) {
      if (values[0].getDenominator() == 0 && values[1].getDenominator() == 0 && values[2].getDenominator() == 0)
      return "n/a";
    } else if (values.length == 4) {
      if (values[0].getDenominator() == 0 && values[1].getDenominator() == 0 && values[2].getDenominator() == 0 && values[3].getDenominator() == 0)
      return "n/a (x4)";
    }

    let sb = '';
    for (let t of values)
    sb + t + ", ";

    return sb.substring(0, sb.length - 2);
  }

  public getWhiteBalance2Description(): string
  {
    let value = this._directory.getInteger(OlympusCameraSettingsMakernoteDirectory.TagWhiteBalance2);
    if (value == null)
    return null;

    switch (value) {
      case 0:
        return "Auto";
      case 1:
        return "Auto (Keep Warm Color Off)";
      case 16:
        return "7500K (Fine Weather with Shade)";
      case 17:
        return "6000K (Cloudy)";
      case 18:
        return "5300K (Fine Weather)";
      case 20:
        return "3000K (Tungsten light)";
      case 21:
        return "3600K (Tungsten light-like)";
      case 22:
        return "Auto Setup";
      case 23:
        return "5500K (Flash)";
      case 33:
        return "6600K (Daylight fluorescent)";
      case 34:
        return "4500K (Neutral white fluorescent)";
      case 35:
        return "4000K (Cool white fluorescent)";
      case 36:
        return "White Fluorescent";
      case 48:
        return "3600K (Tungsten light-like)";
      case 67:
        return "Underwater";
      case 256:
        return "One Touch WB 1";
      case 257:
        return "One Touch WB 2";
      case 258:
        return "One Touch WB 3";
      case 259:
        return "One Touch WB 4";
      case 512:
        return "Custom WB 1";
      case 513:
        return "Custom WB 2";
      case 514:
        return "Custom WB 3";
      case 515:
        return "Custom WB 4";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getWhiteBalanceTemperatureDescription(): string
  {
    let value = this._directory.getInteger(OlympusCameraSettingsMakernoteDirectory.TagWhiteBalanceTemperature);
    if (value == null)
    return null;
    if (value == 0)
    return "Auto";
    return value.toString();
  }

  public getCustomSaturationDescription(): string
  {
    // TODO: if model is /^E-1\b/  then
    // $a-=$b; $c-=$b;
    // return "CS$a (min CS0, max CS$c)"
    return this.getValueMinMaxDescription(OlympusCameraSettingsMakernoteDirectory.TagCustomSaturation);
  }

  public getModifiedSaturationDescription(): string
  {
    return this.getIndexedDescription(OlympusCameraSettingsMakernoteDirectory.TagModifiedSaturation, null,
      "Off", "CM1 (Red Enhance)", "CM2 (Green Enhance)", "CM3 (Blue Enhance)", "CM4 (Skin Tones)");
  }

  public getContrastSettingDescription(): string
  {
    return this.getValueMinMaxDescription(OlympusCameraSettingsMakernoteDirectory.TagContrastSetting);
  }

  public getSharpnessSettingDescription(): string
  {
    return this.getValueMinMaxDescription(OlympusCameraSettingsMakernoteDirectory.TagSharpnessSetting);
  }

  public getColorSpaceDescription(): string
  {
    return this.getIndexedDescription(OlympusCameraSettingsMakernoteDirectory.TagColorSpace, null,
      "sRGB", "Adobe RGB", "Pro Photo RGB");
  }

  public getSceneModeDescription(): string
  {
    let value = this._directory.getInteger(OlympusCameraSettingsMakernoteDirectory.TagSceneMode);
    if (value == null)
    return null;

    switch (value) {
      case 0:
        return "Standard";
      case 6:
        return "Auto";
      case 7:
        return "Sport";
      case 8:
        return "Portrait";
      case 9:
        return "Landscape+Portrait";
      case 10:
        return "Landscape";
      case 11:
        return "Night Scene";
      case 12:
        return "Self Portrait";
      case 13:
        return "Panorama";
      case 14:
        return "2 in 1";
      case 15:
        return "Movie";
      case 16:
        return "Landscape+Portrait";
      case 17:
        return "Night+Portrait";
      case 18:
        return "Indoor";
      case 19:
        return "Fireworks";
      case 20:
        return "Sunset";
      case 21:
        return "Beauty Skin";
      case 22:
        return "Macro";
      case 23:
        return "Super Macro";
      case 24:
        return "Food";
      case 25:
        return "Documents";
      case 26:
        return "Museum";
      case 27:
        return "Shoot & Select";
      case 28:
        return "Beach & Snow";
      case 29:
        return "Self Portrait+Timer";
      case 30:
        return "Candle";
      case 31:
        return "Available Light";
      case 32:
        return "Behind Glass";
      case 33:
        return "My Mode";
      case 34:
        return "Pet";
      case 35:
        return "Underwater Wide1";
      case 36:
        return "Underwater Macro";
      case 37:
        return "Shoot & Select1";
      case 38:
        return "Shoot & Select2";
      case 39:
        return "High Key";
      case 40:
        return "Digital Image Stabilization";
      case 41:
        return "Auction";
      case 42:
        return "Beach";
      case 43:
        return "Snow";
      case 44:
        return "Underwater Wide2";
      case 45:
        return "Low Key";
      case 46:
        return "Children";
      case 47:
        return "Vivid";
      case 48:
        return "Nature Macro";
      case 49:
        return "Underwater Snapshot";
      case 50:
        return "Shooting Guide";
      case 54:
        return "Face Portrait";
      case 57:
        return "Bulb";
      case 59:
        return "Smile Shot";
      case 60:
        return "Quick Shutter";
      case 63:
        return "Slow Shutter";
      case 64:
        return "Bird Watching";
      case 65:
        return "Multiple Exposure";
      case 66:
        return "e-Portrait";
      case 67:
        return "Soft Background Shot";
      case 142:
        return "Hand-held Starlight";
      case 154:
        return "HDR";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getNoiseReductionDescription(): string
  {
    let value = this._directory.getInteger(OlympusCameraSettingsMakernoteDirectory.TagNoiseReduction);
    if (value == null)
    return null;

    if (value == 0)
    return "(none)";

    let sb = '';
    let v = value;

    if ((v & 1) != 0) sb + "Noise Reduction, ";
    if (((v >> 1) & 1) != 0) sb + "Noise Filter, ";
    if (((v >> 2) & 1) != 0) sb + "Noise Filter (ISO Boost), ";
    if (((v >> 3) & 1) != 0) sb + "Auto, ";

    return sb.length != 0
      ? sb.substring(0, sb.length - 2)
      : "(none)";
  }

  public getDistortionCorrectionDescription(): string
  {
    return this.getIndexedDescription(OlympusCameraSettingsMakernoteDirectory.TagDistortionCorrection, null, "Off", "On");
  }

  public getShadingCompensationDescription(): string
  {
    return this.getIndexedDescription(OlympusCameraSettingsMakernoteDirectory.TagShadingCompensation, null, "Off", "On");
  }

  /** 3 or 4 values */

  public getGradationDescription(): string
  {
    let values = this._directory.getIntArray(OlympusCameraSettingsMakernoteDirectory.TagGradation);
    if (values == null || values.length < 3)
    return null;

    //        String join = String.format("%d %d %d", values[0], values[1], values[2]);
    let join = "%d %d %d".replace(/%d/, values[0]).replace(/%d/, values[1]).replace(/%d/, values[2]);
    let ret;
    if (join == "0 0 0") {
      ret = "n/a";
    } else if (join == "-1 -1 1") {
      ret = "Low Key";
    } else if (join == "0 -1 1") {
      ret = "Normal";
    } else if (join == "1 -1 1") {
      ret = "High Key";
    } else {
      ret = "Unknown (" + join + ")";
    }

    if (values.length > 3) {
      if (values[3] == 0)
      ret += "; User-Selected";
      else if (values[3] == 1)
      ret += "; Auto-Override";
    }

    return ret;
  }

  /** 1 or 2 values */

  public getPictureModeDescription(): string
  {
    let values = this._directory.getIntArray(OlympusCameraSettingsMakernoteDirectory.TagPictureMode);
    if (values == null) {
      // check if it's only one value long also
      let value = this._directory.getInteger(OlympusCameraSettingsMakernoteDirectory.TagNoiseReduction);
      if (value == null)
      return null;

      values = [value];
    }

    if (values.length == 0)
    return null;

    let sb = '';
    switch (values[0]) {
      case 1:
        sb + "Vivid";
        break;
      case 2:
        sb + "Natural";
        break;
      case 3:
        sb + "Muted";
        break;
      case 4:
        sb + "Portrait";
        break;
      case 5:
        sb + "i-Enhance";
        break;
      case 256:
        sb + "Monotone";
        break;
      case 512:
        sb + "Sepia";
        break;
      default:
        sb + "Unknown (" + values[0] + ")";
        break;
    }

    if (values.length > 1)
    sb + "; " + values[1];

    return sb.toString();
  }

  public getPictureModeSaturationDescription(): string
  {
    return this.getValueMinMaxDescription(OlympusCameraSettingsMakernoteDirectory.TagPictureModeSaturation);
  }

  public getPictureModeContrastDescription(): string
  {
    return this.getValueMinMaxDescription(OlympusCameraSettingsMakernoteDirectory.TagPictureModeContrast);
  }

  public getPictureModeSharpnessDescription(): string
  {
    return this.getValueMinMaxDescription(OlympusCameraSettingsMakernoteDirectory.TagPictureModeSharpness);
  }

  public getPictureModeBWFilterDescription(): string
  {
    return this.getIndexedDescription(OlympusCameraSettingsMakernoteDirectory.TagPictureModeBWFilter, null,
      "n/a", "Neutral", "Yellow", "Orange", "Red", "Green");
  }

  public getPictureModeToneDescription(): string
  {
    return this.getIndexedDescription(OlympusCameraSettingsMakernoteDirectory.TagPictureModeTone, null,
      "n/a", "Neutral", "Sepia", "Blue", "Purple", "Green");
  }

  public getNoiseFilterDescription(): string
  {
    let values = this._directory.getIntArray(OlympusCameraSettingsMakernoteDirectory.TagNoiseFilter);
    if (values == null)
    return null;

    let join = "%d %d %d".replace(/%d/, values[0]).replace(/%d/, values[1]).replace(/%d/, values[2]);

    if (join == "0 0 0")
    return "n/a";
    if (join == "-2 -2 1")
    return "Off";
    if (join == "-1 -2 1")
    return "Low";
    if (join == "0 -2 1")
    return "Standard";
    if (join == "1 -2 1")
    return "High";
    return "Unknown (" + join + ")";
  }

  public getArtFilterDescription(): string
  {
    return this.getFiltersDescription(OlympusCameraSettingsMakernoteDirectory.TagArtFilter);
  }

  public getMagicFilterDescription(): string
  {
    return this.getFiltersDescription(OlympusCameraSettingsMakernoteDirectory.TagMagicFilter);
  }

  public getPictureModeEffectDescription(): string
  {
    let values = this._directory.getIntArray(OlympusCameraSettingsMakernoteDirectory.TagPictureModeEffect);
    if (values == null)
    return null;

    let key = "%d %d %d".replace(/%d/, values[0]).replace(/%d/, values[1]).replace(/%d/, values[2]);
    if (key == "0 0 0")
    return "n/a";
    if (key == "-1 -1 1")
    return "Low";
    if (key == "0 -1 1")
    return "Standard";
    if (key == "1 -1 1")
    return "High";
    return "Unknown (" + key + ")";
  }

  public getToneLevelDescription(): string
  {
    let values = this._directory.getIntArray(OlympusCameraSettingsMakernoteDirectory.TagToneLevel);
    if (values == null || values.length == 0)
    return null;

    let sb = '';
    for (let i = 0; i < values.length; i++) {
      if (i == 0 || i == 4 || i == 8 || i == 12 || i == 16 || i == 20 || i == 24)
      sb + OlympusCameraSettingsMakernoteDescriptor._toneLevelType.get(values[i]) + "; ";
      else
      sb + values[i] + "; ";
    }

    return sb.substring(0, sb.length - 2);
  }

  public getArtFilterEffectDescription(): string
  {
    let values = this._directory.getIntArray(OlympusCameraSettingsMakernoteDirectory.TagArtFilterEffect);
    if (values == null)
    return null;

    let sb = '';
    for (let i = 0; i < values.length; i++) {
      if (i == 0) {
        sb + (OlympusCameraSettingsMakernoteDescriptor._filters.has(values[i]) ? OlympusCameraSettingsMakernoteDescriptor._filters.get(values[i]) : "[unknown]") + "; ";
      } else if (i == 3) {
        sb + "Partial Color " + values[i] + "; ";
      } else if (i == 4) {
        switch (values[i]) {
          case 0x0000:
            sb + "No Effect";
            break;
          case 0x8010:
            sb + "Star Light";
            break;
          case 0x8020:
            sb + "Pin Hole";
            break;
          case 0x8030:
            sb + "Frame";
            break;
          case 0x8040:
            sb + "Soft Focus";
            break;
          case 0x8050:
            sb + "White Edge";
            break;
          case 0x8060:
            sb + "B&W";
            break;
          default:
            sb + "Unknown (" + values[i] + ")";
            break;
        }
        sb + "; ";
      } else if (i == 6) {
        switch (values[i]) {
          case 0:
            sb + "No Color Filter";
            break;
          case 1:
            sb + "Yellow Color Filter";
            break;
          case 2:
            sb + "Orange Color Filter";
            break;
          case 3:
            sb + "Red Color Filter";
            break;
          case 4:
            sb + "Green Color Filter";
            break;
          default:
            sb + "Unknown (" + values[i] + ")";
            break;
        }
        sb + "; ";
      } else {
        sb + values[i] + "; ";
      }
    }

    return sb.substring(0, sb.length - 2);
  }

  public getColorCreatorEffectDescription(): string
  {
    let values = this._directory.getIntArray(OlympusCameraSettingsMakernoteDirectory.TagColorCreatorEffect);
    if (values == null)
    return null;

    let sb = '';
    for (let i = 0; i < values.length; i++) {
      if (i == 0) {
        sb + "Color " + values[i] + "; ";
      } else if (i == 3) {
        sb + "Strength " + values[i] + "; ";
      } else {
        sb + values[i] + "; ";
      }
    }

    return sb.substring(0, sb.length - 2);
  }

  /** 2 or 3 numbers: 1. Mode, 2. Shot number, 3. Mode bits */

  public getDriveModeDescription(): string
  {
    let values = this._directory.getIntArray(OlympusCameraSettingsMakernoteDirectory.TagDriveMode);
    if (values == null)
    return null;

    if (values.length == 0 || values[0] == 0)
    return "Single Shot";

    let a = '';

    if (values[0] == 5 && values.length >= 3) {
      let c = values[2];
      if ((c & 1) > 0) a + "AE";
      if (((c >> 1) & 1) > 0) a + "WB";
      if (((c >> 2) & 1) > 0) a + "FL";
      if (((c >> 3) & 1) > 0) a + "MF";
      if (((c >> 6) & 1) > 0) a + "Focus";

      a + " Bracketing";
    } else {
      switch (values[0]) {
        case 1:
          a + "Continuous Shooting";
          break;
        case 2:
          a + "Exposure Bracketing";
          break;
        case 3:
          a + "White Balance Bracketing";
          break;
        case 4:
          a + "Exposure+WB Bracketing";
          break;
        default:
          a + "Unknown (" + values[0] + ")";
          break;
      }
    }

    a + ", Shot " + values[1];

    return a.toString();
  }

  /** 2 numbers: 1. Mode, 2. Shot number */

  public getPanoramaModeDescription(): string
  {
    let values = this._directory.getIntArray(OlympusCameraSettingsMakernoteDirectory.TagPanoramaMode);
    if (values == null)
    return null;

    if (values.length == 0 || values[0] == 0)
    return "Off";

    let a;
    switch (values[0]) {
      case 1:
        a = "Left to Right";
        break;
      case 2:
        a = "Right to Left";
        break;
      case 3:
        a = "Bottom to Top";
        break;
      case 4:
        a = "Top to Bottom";
        break;
      default:
        a = "Unknown (" + values[0] + ")";
        break;
    }

    return "%s, Shot %d".replace(/%s/, a).replace(/%d/, values[1]);
  }

  public getImageQuality2Description(): string
  {
    return this.getIndexedDescription(OlympusCameraSettingsMakernoteDirectory.TagImageQuality2, 1,
      "SQ", "HQ", "SHQ", "RAW", "SQ (5)");
  }

  public getImageStabilizationDescription(): string
  {
    return this.getIndexedDescription(OlympusCameraSettingsMakernoteDirectory.TagImageStabilization, null,
      "Off", "On, Mode 1", "On, Mode 2", "On, Mode 3", "On, Mode 4");
  }

  public getStackedImageDescription(): string
  {
    let values = this._directory.getIntArray(OlympusCameraSettingsMakernoteDirectory.TagStackedImage);
    if (values == null || values.length < 2)
    return null;

    let v1 = values[0];
    let v2 = values[1];

    if (v1 == 0 && v2 == 0)
    return "No";
    if (v1 == 9 && v2 == 8)
    return "Focus-stacked (8 images)";

    return "Unknown (%d %d)".replace(/%d/, v1).replace(/%d/, v2);
  }

  /// <remarks>
  /// TODO: need better image examples to test this function
  /// </remarks>
  /// <returns></returns>

  public getManometerPressureDescription(): string
  {
    let value = this._directory.getInteger(OlympusCameraSettingsMakernoteDirectory.TagManometerPressure);
    if (value == null)
    return null;

    //        return String.format("%s kPa", new DecimalFormat("#.##").format(value / 10.0));
    return "%s kPa".replace(/%s/, (value / 10.0).toFixed(2));
  }

  /// <remarks>
  /// TODO: need better image examples to test this function
  /// </remarks>
  /// <returns></returns>

  public getManometerReadingDescription(): string
  {
    let values = this._directory.getIntArray(OlympusCameraSettingsMakernoteDirectory.TagManometerReading);
    if (values == null || values.length < 2)
    return null;

    //        DecimalFormat format = new DecimalFormat("#.##");
    //        return String.format("%s m, %s ft",
    //            format.format(values[0] / 10.0),
    //            format.format(values[1] / 10.0));
    return "%s m, %s ft".replace(/%s/, (values[0] / 10.0).toFixed(2)).replace(/%s/, (values[1] / 10.0).toFixed(2))
  }

  public getExtendedWBDetectDescription(): string
  {
    return this.getIndexedDescription(OlympusCameraSettingsMakernoteDirectory.TagExtendedWBDetect, null, "Off", "On");
  }

  /** converted to degrees of clockwise camera rotation */
  // TODO: need better image examples to test this function

  public getRollAngleDescription(): string
  {
    let values = this._directory.getIntArray(OlympusCameraSettingsMakernoteDirectory.TagRollAngle);
    if (values == null || values.length < 2)
    return null;

    let ret = values[0] != 0
      ? (-values[0] / 10.0).toString()
      : "n/a";

    return "%s %d".replace(/%s/, ret).replace(/%d/, values[1]);
  }

  /** converted to degrees of upward camera tilt */
  // TODO: need better image examples to test this function

  public getPitchAngleDescription(): string
  {
    let values = this._directory.getIntArray(OlympusCameraSettingsMakernoteDirectory.TagPitchAngle);
    if (values == null || values.length < 2)
    return null;

    // (second value is 0 if level gauge is off)
    let ret = values[0] != 0
      ? (values[0] / 10.0).toString()
      : "n/a";

    //        return String.format("%s %d", ret, values[1]);
    return "%s %d".replace(/%s/, ret).replace(/%d/, values[1]);
  }

  public getDateTimeUTCDescription(): string
  {
    let value = this._directory.getObject(OlympusCameraSettingsMakernoteDirectory.TagDateTimeUtc);
    if (value == null)
    return null;
    return value.toString();
  }

  private getValueMinMaxDescription(tagId: number) {
    let values = this._directory.getIntArray(tagId);
    if (values == null || values.length < 3)
    return null;

    return "%d (min %d, max %d)".replace(/%d/, values[0]).replace(/%d/, values[1]).replace(/%d/, values[2]);
  }

  private getFiltersDescription(tagId: number) {
    let values = this._directory.getIntArray(tagId);
    if (values == null || values.length == 0)
    return null;

    let sb = '';
    for (let i = 0; i < values.length; i++) {
      if (i == 0)
        sb + OlympusCameraSettingsMakernoteDescriptor._filters.has(values[i]) ? OlympusCameraSettingsMakernoteDescriptor._filters.get(values[i]) : "[unknown]";
      else
      sb + values[i];
      sb + "; "
    }

    return sb.substring(0, sb.length - 2);
  }

  private static readonly _toneLevelType: Map<number, string> = new Map<number, string>();
  // ArtFilter, ArtFilterEffect and MagicFilter values
  private static readonly _filters: Map<number, string> = new Map<number, string>([
    [0, "Off"],
    [1, "Soft Focus"],
    [2, "Pop Art"],
    [3, "Pale & Light Color"],
    [4, "Light Tone"],
    [5, "Pin Hole"],
    [6, "Grainy Film"],
    [9, "Diorama"],
    [10, "Cross Process"],
    [12, "Fish Eye"],
    [13, "Drawing"],
    [14, "Gentle Sepia"],
    [15, "Pale & Light Color II"],
    [16, "Pop Art II"],
    [17, "Pin Hole II"],
    [18, "Pin Hole III"],
    [19, "Grainy Film II"],
    [20, "Dramatic Tone"],
    [21, "Punk"],
    [22, "Soft Focus 2"],
    [23, "Sparkle"],
    [24, "Watercolor"],
    [25, "Key Line"],
    [26, "Key Line II"],
    [27, "Miniature"],
    [28, "Reflection"],
    [29, "Fragmented"],
    [31, "Cross Process II"],
    [32, "Dramatic Tone II"],
    [33, "Watercolor I"],
    [34, "Watercolor II"],
    [35, "Diorama II"],
    [36, "Vintage"],
    [37, "Vintage II"],
    [38, "Vintage III"],
    [39, "Partial Color"],
    [40, "Partial Color II"],
    [41, "Partial Color III"]
  ]
  );
}

export default OlympusCameraSettingsMakernoteDescriptor
