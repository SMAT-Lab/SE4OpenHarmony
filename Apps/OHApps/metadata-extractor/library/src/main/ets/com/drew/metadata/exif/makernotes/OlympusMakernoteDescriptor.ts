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

import PhotographicConversions from '../../../imaging/PhotographicConversions';
import StringUtil from '../../../lang/StringUtil';
import DateUtil from '../../../lang/DateUtil';
import TagDescriptor from '../../TagDescriptor';
import OlympusMakernoteDirectory from './OlympusMakernoteDirectory'
import { CameraSettings } from './OlympusMakernoteDirectory'

class OlympusMakernoteDescriptor extends TagDescriptor<OlympusMakernoteDirectory> {

  // TODO extend support for some offset-encoded byte[] tags: http://www.ozhiker.com/electronics/pjmt/jpeg_info/olympus_mn.html

  constructor(directory: OlympusMakernoteDirectory) {
    super(directory);
  }

  public getDescription(tagType: number): string
  {
    switch (tagType) {
      case OlympusMakernoteDirectory.TAG_MAKERNOTE_VERSION:
        return this.getMakernoteVersionDescription();
      case OlympusMakernoteDirectory.TAG_COLOUR_MODE:
        return this.getColorModeDescription();
      case OlympusMakernoteDirectory.TAG_IMAGE_QUALITY_1:
        return this.getImageQuality1Description();
      case OlympusMakernoteDirectory.TAG_IMAGE_QUALITY_2:
        return this.getImageQuality2Description();
      case OlympusMakernoteDirectory.TAG_SPECIAL_MODE:
        return this.getSpecialModeDescription();
      case OlympusMakernoteDirectory.TAG_JPEG_QUALITY:
        return this.getJpegQualityDescription();
      case OlympusMakernoteDirectory.TAG_MACRO_MODE:
        return this.getMacroModeDescription();
      case OlympusMakernoteDirectory.TAG_BW_MODE:
        return this.getBWModeDescription();
      case OlympusMakernoteDirectory.TAG_DIGITAL_ZOOM:
        return this.getDigitalZoomDescription();
      case OlympusMakernoteDirectory.TAG_FOCAL_PLANE_DIAGONAL:
        return this.getFocalPlaneDiagonalDescription();
      case OlympusMakernoteDirectory.TAG_CAMERA_TYPE:
        return this.getCameraTypeDescription();
      case OlympusMakernoteDirectory.TAG_CAMERA_ID:
        return this.getCameraIdDescription();
      case OlympusMakernoteDirectory.TAG_ONE_TOUCH_WB:
        return this.getOneTouchWbDescription();
      case OlympusMakernoteDirectory.TAG_SHUTTER_SPEED_VALUE:
        return this.getShutterSpeedDescription();
      case OlympusMakernoteDirectory.TAG_ISO_VALUE:
        return this.getIsoValueDescription();
      case OlympusMakernoteDirectory.TAG_APERTURE_VALUE:
        return this.getApertureValueDescription();
      case OlympusMakernoteDirectory.TAG_FLASH_MODE:
        return this.getFlashModeDescription();
      case OlympusMakernoteDirectory.TAG_FOCUS_RANGE:
        return this.getFocusRangeDescription();
      case OlympusMakernoteDirectory.TAG_FOCUS_MODE:
        return this.getFocusModeDescription();
      case OlympusMakernoteDirectory.TAG_SHARPNESS:
        return this.getSharpnessDescription();
      case OlympusMakernoteDirectory.TAG_COLOUR_MATRIX:
        return this.getColorMatrixDescription();
      case OlympusMakernoteDirectory.TAG_WB_MODE:
        return this.getWbModeDescription();
      case OlympusMakernoteDirectory.TAG_RED_BALANCE:
        return this.getRedBalanceDescription();
      case OlympusMakernoteDirectory.TAG_BLUE_BALANCE:
        return this.getBlueBalanceDescription();
      case OlympusMakernoteDirectory.TAG_CONTRAST:
        return this.getContrastDescription();
      case OlympusMakernoteDirectory.TAG_PREVIEW_IMAGE_VALID:
        return this.getPreviewImageValidDescription();

      case CameraSettings.TAG_EXPOSURE_MODE:
        return this.getExposureModeDescription();
      case CameraSettings.TAG_FLASH_MODE:
        return this.getFlashModeCameraSettingDescription();
      case CameraSettings.TAG_WHITE_BALANCE:
        return this.getWhiteBalanceDescription();
      case CameraSettings.TAG_IMAGE_SIZE:
        return this.getImageSizeDescription();
      case CameraSettings.TAG_IMAGE_QUALITY:
        return this.getImageQualityDescription();
      case CameraSettings.TAG_SHOOTING_MODE:
        return this.getShootingModeDescription();
      case CameraSettings.TAG_METERING_MODE:
        return this.getMeteringModeDescription();
      case CameraSettings.TAG_APEX_FILM_SPEED_VALUE:
        return this.getApexFilmSpeedDescription();
      case CameraSettings.TAG_APEX_SHUTTER_SPEED_TIME_VALUE:
        return this.getApexShutterSpeedTimeDescription();
      case CameraSettings.TAG_APEX_APERTURE_VALUE:
        return this.getApexApertureDescription();
      case CameraSettings.TAG_MACRO_MODE:
        return this.getMacroModeCameraSettingDescription();
      case CameraSettings.TAG_DIGITAL_ZOOM:
        return this.getDigitalZoomCameraSettingDescription();
      case CameraSettings.TAG_EXPOSURE_COMPENSATION:
        return this.getExposureCompensationDescription();
      case CameraSettings.TAG_BRACKET_STEP:
        return this.getBracketStepDescription();

      case CameraSettings.TAG_INTERVAL_LENGTH:
        return this.getIntervalLengthDescription();
      case CameraSettings.TAG_INTERVAL_NUMBER:
        return this.getIntervalNumberDescription();
      case CameraSettings.TAG_FOCAL_LENGTH:
        return this.getFocalLengthDescription();
      case CameraSettings.TAG_FOCUS_DISTANCE:
        return this.getFocusDistanceDescription();
      case CameraSettings.TAG_FLASH_FIRED:
        return this.getFlashFiredDescription();
      case CameraSettings.TAG_DATE:
        return this.getDateDescription();
      case CameraSettings.TAG_TIME:
        return this.getTimeDescription();
      case CameraSettings.TAG_MAX_APERTURE_AT_FOCAL_LENGTH:
        return this.getMaxApertureAtFocalLengthDescription();

      case CameraSettings.TAG_FILE_NUMBER_MEMORY:
        return this.getFileNumberMemoryDescription();
      case CameraSettings.TAG_LAST_FILE_NUMBER:
        return this.getLastFileNumberDescription();
      case CameraSettings.TAG_WHITE_BALANCE_RED:
        return this.getWhiteBalanceRedDescription();
      case CameraSettings.TAG_WHITE_BALANCE_GREEN:
        return this.getWhiteBalanceGreenDescription();
      case CameraSettings.TAG_WHITE_BALANCE_BLUE:
        return this.getWhiteBalanceBlueDescription();
      case CameraSettings.TAG_SATURATION:
        return this.getSaturationDescription();
      case CameraSettings.TAG_CONTRAST:
        return this.getContrastCameraSettingDescription();
      case CameraSettings.TAG_SHARPNESS:
        return this.getSharpnessCameraSettingDescription();
      case CameraSettings.TAG_SUBJECT_PROGRAM:
        return this.getSubjectProgramDescription();
      case CameraSettings.TAG_FLASH_COMPENSATION:
        return this.getFlashCompensationDescription();
      case CameraSettings.TAG_ISO_SETTING:
        return this.getIsoSettingDescription();
      case CameraSettings.TAG_CAMERA_MODEL:
        return this.getCameraModelDescription();
      case CameraSettings.TAG_INTERVAL_MODE:
        return this.getIntervalModeDescription();
      case CameraSettings.TAG_FOLDER_NAME:
        return this.getFolderNameDescription();
      case CameraSettings.TAG_COLOR_MODE:
        return this.getColorModeCameraSettingDescription();
      case CameraSettings.TAG_COLOR_FILTER:
        return this.getColorFilterDescription();
      case CameraSettings.TAG_BLACK_AND_WHITE_FILTER:
        return this.getBlackAndWhiteFilterDescription();
      case CameraSettings.TAG_INTERNAL_FLASH:
        return this.getInternalFlashDescription();
      case CameraSettings.TAG_APEX_BRIGHTNESS_VALUE:
        return this.getApexBrightnessDescription();
      case CameraSettings.TAG_SPOT_FOCUS_POINT_X_COORDINATE:
        return this.getSpotFocusPointXCoordinateDescription();
      case CameraSettings.TAG_SPOT_FOCUS_POINT_Y_COORDINATE:
        return this.getSpotFocusPointYCoordinateDescription();
      case CameraSettings.TAG_WIDE_FOCUS_ZONE:
        return this.getWideFocusZoneDescription();
      case CameraSettings.TAG_FOCUS_MODE:
        return this.getFocusModeCameraSettingDescription();
      case CameraSettings.TAG_FOCUS_AREA:
        return this.getFocusAreaDescription();
      case CameraSettings.TAG_DEC_SWITCH_POSITION:
        return this.getDecSwitchPositionDescription();
      default:
        return super.getDescription(tagType);
    }
  }

  public getExposureModeDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_EXPOSURE_MODE, null, "P", "A", "S", "M");
  }

  public getFlashModeCameraSettingDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_FLASH_MODE, null,
      "Normal", "Red-eye reduction", "Rear flash sync", "Wireless");
  }

  public getWhiteBalanceDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_WHITE_BALANCE, null,
      "Auto", // 0
      "Daylight",
      "Cloudy",
      "Tungsten",
      null,
      "Custom", // 5
      null,
      "Fluorescent",
      "Fluorescent 2",
      null,
      null, // 10
      "Custom 2",
      "Custom 3"
    );
  }

  public getImageSizeDescription(): string
  {
    // This is a pretty weird way to store this information!
    return this.getIndexedDescription(CameraSettings.TAG_IMAGE_SIZE, null, "2560 x 1920", "1600 x 1200", "1280 x 960", "640 x 480");
  }

  public getImageQualityDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_IMAGE_QUALITY, null, "Raw", "Super Fine", "Fine", "Standard", "Economy", "Extra Fine");
  }

  public getShootingModeDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_SHOOTING_MODE, null,
      "Single",
      "Continuous",
      "Self Timer",
      null,
      "Bracketing",
      "Interval",
      "UHS Continuous",
      "HS Continuous"
    );
  }

  public getMeteringModeDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_METERING_MODE, null, "Multi-Segment", "Centre Weighted", "Spot");
  }

  public getApexFilmSpeedDescription(): string
  {
    // http://www.ozhiker.com/electronics/pjmt/jpeg_info/minolta_mn.html#Minolta_Camera_Settings
    // Apex Speed value = value/8-1 ,
    // ISO = (2^(value/8-1))*3.125
    let value = this._directory.getLongObject(CameraSettings.TAG_APEX_FILM_SPEED_VALUE);

    if (value == null)
    return null;

    let iso = Math.pow((value / 8) - 1, 2) * 3.125;
    return iso.toFixed(2)
    //        DecimalFormat format = new DecimalFormat("0.##");
    //        format.setRoundingMode(RoundingMode.HALF_UP);
    //        return format.format(iso);
  }

  public getApexShutterSpeedTimeDescription(): string
  {
    // http://www.ozhiker.com/electronics/pjmt/jpeg_info/minolta_mn.html#Minolta_Camera_Settings
    // Apex Time value = value/8-6 ,
    // ShutterSpeed = 2^( (48-value)/8 ),
    // Due to rounding error value=8 should be displayed as 30 sec.
    let value = this._directory.getLongObject(CameraSettings.TAG_APEX_SHUTTER_SPEED_TIME_VALUE);

    if (value == null)
    return null;

    let shutterSpeed = Math.pow((49 - value) / 8, 2);
    return shutterSpeed.toFixed(3) + " sec";
    //        DecimalFormat format = new DecimalFormat("0.###");
    //        format.setRoundingMode(RoundingMode.HALF_UP);
    //        return format.format(shutterSpeed) + " sec";
  }

  public getApexApertureDescription(): string
  {
    // http://www.ozhiker.com/electronics/pjmt/jpeg_info/minolta_mn.html#Minolta_Camera_Settings
    // Apex Aperture Value = value/8-1 ,
    // Aperture F-stop = 2^( value/16-0.5 )
    let value = this._directory.getLongObject(CameraSettings.TAG_APEX_APERTURE_VALUE);

    if (value == null)
    return null;

    let fStop = Math.pow((value / 16) - 0.5, 2);
    return TagDescriptor.getFStopDescription(fStop);
  }

  public getMacroModeCameraSettingDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_MACRO_MODE, null, "Off", "On");
  }

  public getDigitalZoomCameraSettingDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_DIGITAL_ZOOM, null, "Off", "Electronic magnification", "Digital zoom 2x");
  }

  public getExposureCompensationDescription(): string
  {
    let value = this._directory.getLongObject(CameraSettings.TAG_EXPOSURE_COMPENSATION);
    if (value == null) {
      return null
    }
    return ((value / 3) - 2).toFixed(2) + " EV";
    //        DecimalFormat format = new DecimalFormat("0.##");
    //        return value == null ? null : format.format((value / 3d) - 2) + " EV";
  }

  public getBracketStepDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_BRACKET_STEP, null, "1/3 EV", "2/3 EV", "1 EV");
  }

  public getIntervalLengthDescription(): string
  {
    if (!this._directory.isIntervalMode())
    return "N/A";

    let value = this._directory.getLongObject(CameraSettings.TAG_INTERVAL_LENGTH);
    return value == null ? null : value + " min";
  }

  public getIntervalNumberDescription(): string
  {
    if (!this._directory.isIntervalMode())
    return "N/A";

    let value = this._directory.getLongObject(CameraSettings.TAG_INTERVAL_NUMBER);
    return value == null ? null : value.toString();
  }

  public getFocalLengthDescription(): string
  {
    let value = this._directory.getLongObject(CameraSettings.TAG_FOCAL_LENGTH);
    return value == null ? null : TagDescriptor.getFocalLengthDescription(value / 256);
  }

  public getFocusDistanceDescription(): string
  {
    let value = this._directory.getLongObject(CameraSettings.TAG_FOCUS_DISTANCE);
    return value == null
      ? null
      : value == 0
          ? "Infinity"
          : value + " mm";
  }

  public getFlashFiredDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_FLASH_FIRED, null, "No", "Yes");
  }

  public getDateDescription(): string
  {
    // day = value%256,
    // month = floor( (value - floor( value/65536 )*65536 )/256 )
    // year = floor( value/65536)
    let value = this._directory.getLongObject(CameraSettings.TAG_DATE);
    if (value == null)
    return null;

    let day = (value & 0xFF);
    let month = ((value >> 16) & 0xFF);
    let year = ((value >> 8) & 0xFF) + 1970;

    if (!DateUtil.isValidDate(year, month, day))
    return "Invalid date";

    return "%04d-%02d-%02d".replace(/%04d/, year.toString())
      .replace(/%02d/, (month + 1).toString())
      .replace(/%02d/, day.toString())
    //        return String.format("%04d-%02d-%02d", year, month + 1, day);
  }

  public getTimeDescription(): string
  {
    // hours = floor( value/65536 ),
    // minutes = floor( ( value - floor( value/65536 )*65536 )/256 ),
    // seconds = value%256
    let value = this._directory.getLongObject(CameraSettings.TAG_TIME);
    if (value == null)
    return null;

    let hours = ((value >> 8) & 0xFF);
    let minutes = ((value >> 16) & 0xFF);
    let seconds = (value & 0xFF);

    if (!DateUtil.isValidTime(hours, minutes, seconds))
    return "Invalid time";

    return "%02d:%02d:%02d".replace(/%02d/, hours.toString())
      .replace(/%02d/, minutes.toString())
      .replace(/%02d/, seconds.toString())
    //        return String.format("%02d:%02d:%02d", hours, minutes, seconds);
  }

  public getMaxApertureAtFocalLengthDescription(): string
  {
    // Aperture F-Stop = 2^(value/16-0.5)
    let value = this._directory.getLongObject(CameraSettings.TAG_TIME);
    if (value == null)
    return null;
    let fStop = Math.pow((value / 16) - 0.5, 2);
    return TagDescriptor.getFStopDescription(fStop);
  }

  public getFileNumberMemoryDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_FILE_NUMBER_MEMORY, null, "Off", "On");
  }

  public getLastFileNumberDescription(): string
  {
    let value = this._directory.getLongObject(CameraSettings.TAG_LAST_FILE_NUMBER);
    return value == null
      ? null
      : value == 0
          ? "File Number Memory Off"
          : value.toString();
  }

  public getWhiteBalanceRedDescription(): string
  {
    let value = this._directory.getLongObject(CameraSettings.TAG_WHITE_BALANCE_RED);
    return value == null ? null : (value / 256).toFixed(2);
    //        DecimalFormat format = new DecimalFormat("0.##");
    //        return value == null ? null : format.format(value/256d);
  }

  public getWhiteBalanceGreenDescription(): string
  {
    let value = this._directory.getLongObject(CameraSettings.TAG_WHITE_BALANCE_GREEN);
    return value == null ? null : (value / 256).toFixed(2);
    //        DecimalFormat format = new DecimalFormat("0.##");
    //        return value == null ? null : format.format(value/256d);
  }

  public getWhiteBalanceBlueDescription(): string
  {
    let value = this._directory.getLongObject(CameraSettings.TAG_WHITE_BALANCE_BLUE);
    return value == null ? null : (value / 256).toFixed(2);
    //        DecimalFormat format = new DecimalFormat("0.##");
    //        return value == null ? null : format.format(value / 256d);
  }

  public getSaturationDescription(): string
  {
    let value = this._directory.getLongObject(CameraSettings.TAG_SATURATION);
    return value == null ? null : (value - 3).toString();
  }

  public getContrastCameraSettingDescription(): string
  {
    let value = this._directory.getLongObject(CameraSettings.TAG_CONTRAST);
    return value == null ? null : (value - 3).toString();
  }

  public getSharpnessCameraSettingDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_SHARPNESS, null, "Hard", "Normal", "Soft");
  }

  public getSubjectProgramDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_SUBJECT_PROGRAM, null, "None", "Portrait", "Text", "Night Portrait", "Sunset", "Sports Action");
  }

  public getFlashCompensationDescription(): string
  {
    let value = this._directory.getLongObject(CameraSettings.TAG_FLASH_COMPENSATION);
    return value == null ? null : ((value - 6) / 3).toFixed(2) + " EV";
    //        DecimalFormat format = new DecimalFormat("0.##");
    //        return value == null ? null : format.format((value-6)/3d) + " EV";
  }

  public getIsoSettingDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_ISO_SETTING, null, "100", "200", "400", "800", "Auto", "64");
  }

  public getCameraModelDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_CAMERA_MODEL, null,
      "DiMAGE 7",
      "DiMAGE 5",
      "DiMAGE S304",
      "DiMAGE S404",
      "DiMAGE 7i",
      "DiMAGE 7Hi",
      "DiMAGE A1",
      "DiMAGE S414");
  }

  public getIntervalModeDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_INTERVAL_MODE, null, "Still Image", "Time Lapse Movie");
  }

  public getFolderNameDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_FOLDER_NAME, null, "Standard Form", "Data Form");
  }

  public getColorModeCameraSettingDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_COLOR_MODE, null, "Natural Color", "Black & White", "Vivid Color", "Solarization", "AdobeRGB");
  }

  public getColorFilterDescription(): string
  {
    let value = this._directory.getLongObject(CameraSettings.TAG_COLOR_FILTER);
    return value == null ? null : (value - 3).toString();
  }

  public getBlackAndWhiteFilterDescription(): string
  {
    return super.getDescription(CameraSettings.TAG_BLACK_AND_WHITE_FILTER);
  }

  public getInternalFlashDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_INTERNAL_FLASH, null, "Did Not Fire", "Fired");
  }

  public getApexBrightnessDescription(): string
  {
    let value = this._directory.getLongObject(CameraSettings.TAG_APEX_BRIGHTNESS_VALUE);
    return ((value / 8) - 6).toFixed(2)
    //        DecimalFormat format = new DecimalFormat("0.##");
    //        return value == null ? null : format.format((value/8d)-6);
  }

  public getSpotFocusPointXCoordinateDescription(): string
  {
    return super.getDescription(CameraSettings.TAG_SPOT_FOCUS_POINT_X_COORDINATE);
  }

  public getSpotFocusPointYCoordinateDescription(): string
  {
    return super.getDescription(CameraSettings.TAG_SPOT_FOCUS_POINT_Y_COORDINATE);
  }

  public getWideFocusZoneDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_WIDE_FOCUS_ZONE, null,
      "No Zone or AF Failed",
      "Center Zone (Horizontal Orientation)",
      "Center Zone (Vertical Orientation)",
      "Left Zone",
      "Right Zone"
    );
  }

  public getFocusModeCameraSettingDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_FOCUS_MODE, null, "Auto Focus", "Manual Focus");
  }

  public getFocusAreaDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_FOCUS_AREA, null, "Wide Focus (Normal)", "Spot Focus");
  }

  public getDecSwitchPositionDescription(): string
  {
    return this.getIndexedDescription(CameraSettings.TAG_DEC_SWITCH_POSITION, null, "Exposure", "Contrast", "Saturation", "Filter");
  }

  public getMakernoteVersionDescription(): string
  {
    return this.getVersionBytesDescription(OlympusMakernoteDirectory.TAG_MAKERNOTE_VERSION, 2);
  }

  public getImageQuality2Description(): string
  {
    return this.getIndexedDescription(OlympusMakernoteDirectory.TAG_IMAGE_QUALITY_2, null,
      "Raw",
      "Super Fine",
      "Fine",
      "Standard",
      "Extra Fine");
  }

  public getImageQuality1Description(): string
  {
    return this.getIndexedDescription(OlympusMakernoteDirectory.TAG_IMAGE_QUALITY_1, null,
      "Raw",
      "Super Fine",
      "Fine",
      "Standard",
      "Extra Fine");
  }

  public getColorModeDescription(): string
  {
    return this.getIndexedDescription(OlympusMakernoteDirectory.TAG_COLOUR_MODE, null,
      "Natural Colour",
      "Black & White",
      "Vivid Colour",
      "Solarization",
      "AdobeRGB");
  }

  public getSharpnessDescription(): string
  {
    return this.getIndexedDescription(OlympusMakernoteDirectory.TAG_SHARPNESS, null, "Normal", "Hard", "Soft");
  }

  public getColorMatrixDescription(): string
  {
    let obj = this._directory.getIntArray(OlympusMakernoteDirectory.TAG_COLOUR_MATRIX);
    if (obj == null)
    return null;

    let sb = '';
    for (let i = 0; i < obj.length; i++) {
      sb + obj[i];
      if (i < obj.length - 1)
      sb + " ";
    }
    return sb.length == 0 ? null : sb;
  }

  public getWbModeDescription(): string
  {
    let obj = this._directory.getIntArray(OlympusMakernoteDirectory.TAG_WB_MODE);
    if (obj == null)
    return null;

    let val = "%d %d".replace(/%d/, obj[0]).replace(/%d/, obj[1]);

    if (val == "1 0")
    return "Auto";
    else if (val == "1 2")
    return "Auto (2)";
    else if (val == "1 4")
    return "Auto (4)";
    else if (val == "2 2")
    return "3000 Kelvin";
    else if (val == "2 3")
    return "3700 Kelvin";
    else if (val == "2 4")
    return "4000 Kelvin";
    else if (val == "2 5")
    return "4500 Kelvin";
    else if (val == "2 6")
    return "5500 Kelvin";
    else if (val == "2 7")
    return "6500 Kelvin";
    else if (val == "2 8")
    return "7500 Kelvin";
    else if (val == "3 0")
    return "One-touch";
    else
    return "Unknown " + val;
  }

  public getRedBalanceDescription(): string
  {
    let values = this._directory.getIntArray(OlympusMakernoteDirectory.TAG_RED_BALANCE);
    if (values == null)
    return null;

    let value = values[0];

    return (value / 256).toString();
  }

  public getBlueBalanceDescription(): string
  {
    let values = this._directory.getIntArray(OlympusMakernoteDirectory.TAG_BLUE_BALANCE);
    if (values == null)
    return null;

    let value = values[0];

    return (value / 256).toString();
  }

  public getContrastDescription(): string
  {
    return this.getIndexedDescription(OlympusMakernoteDirectory.TAG_CONTRAST, null, "High", "Normal", "Low");
  }

  public getPreviewImageValidDescription(): string
  {
    return this.getIndexedDescription(OlympusMakernoteDirectory.TAG_PREVIEW_IMAGE_VALID, null, "No", "Yes");
  }

  public getFocusModeDescription(): string
  {
    return this.getIndexedDescription(OlympusMakernoteDirectory.TAG_FOCUS_MODE, null, "Auto", "Manual");
  }

  public getFocusRangeDescription(): string
  {
    return this.getIndexedDescription(OlympusMakernoteDirectory.TAG_FOCUS_RANGE, null, "Normal", "Macro");
  }

  public getFlashModeDescription(): string
  {
    return this.getIndexedDescription(OlympusMakernoteDirectory.TAG_FLASH_MODE, null, null, null, "On", "Off");
  }

  public getDigitalZoomDescription(): string
  {
    let value = this._directory.getRational(OlympusMakernoteDirectory.TAG_DIGITAL_ZOOM);
    if (value == null)
    return null;
    return value.toSimpleString(false);
  }

  public getFocalPlaneDiagonalDescription(): string
  {
    let value = this._directory.getRational(OlympusMakernoteDirectory.TAG_FOCAL_PLANE_DIAGONAL);
    if (value == null)
    return null;

    return value.numberValue().toFixed(3) + " mm";
    //        DecimalFormat format = new DecimalFormat("0.###");
    //        return format.format(value.doubleValue()) + " mm";
  }

  public getCameraTypeDescription(): string
  {
    let cameratype = this._directory.getString(OlympusMakernoteDirectory.TAG_CAMERA_TYPE);
    if (cameratype == null)
    return null;

    if (OlympusMakernoteDirectory.OlympusCameraTypes.has(cameratype))
    return OlympusMakernoteDirectory.OlympusCameraTypes.get(cameratype);

    return cameratype;
  }

  public getCameraIdDescription(): string
  {
    let bytes = this._directory.getByteArray(OlympusMakernoteDirectory.TAG_CAMERA_ID);
    if (bytes == null)
    return null;
    return StringUtil.utf8ByteToUnicodeStr(bytes);
  }

  public getOneTouchWbDescription(): string
  {
    return this.getIndexedDescription(OlympusMakernoteDirectory.TAG_ONE_TOUCH_WB, null, "Off", "On", "On (Preset)");
  }

  public getShutterSpeedDescription(): string
  {
    return super.getShutterSpeedDescription(OlympusMakernoteDirectory.TAG_SHUTTER_SPEED_VALUE);
  }

  public getIsoValueDescription(): string
  {
    let value = this._directory.getRational(OlympusMakernoteDirectory.TAG_ISO_VALUE);
    if (value == null)
    return null;

    return Math.round(Math.pow(2, value.numberValue() - 5) * 100).toString();
  }

  public getApertureValueDescription(): string
  {
    let aperture = this._directory.getDoubleObject(OlympusMakernoteDirectory.TAG_APERTURE_VALUE);
    if (aperture == null)
    return null;
    let fStop = PhotographicConversions.apertureToFStop(aperture);
    return TagDescriptor.getFStopDescription(fStop);
  }

  public getMacroModeDescription(): string
  {
    return this.getIndexedDescription(OlympusMakernoteDirectory.TAG_MACRO_MODE, null, "Normal (no macro)", "Macro");
  }

  public getBWModeDescription(): string
  {
    return this.getIndexedDescription(OlympusMakernoteDirectory.TAG_BW_MODE, null, "Off", "On");
  }

  public getJpegQualityDescription(): string
  {
    let cameratype = this._directory.getString(OlympusMakernoteDirectory.TAG_CAMERA_TYPE);

    if (cameratype != null) {
      let value = this._directory.getInteger(OlympusMakernoteDirectory.TAG_JPEG_QUALITY);
      if (value == null)
      return null;

      if ((cameratype.startsWith("SX") && !cameratype.startsWith("SX151"))
      || cameratype.startsWith("D4322")) {
        switch (value) {
          case 0:
            return "Standard Quality (Low)";
          case 1:
            return "High Quality (Normal)";
          case 2:
            return "Super High Quality (Fine)";
          case 6:
            return "RAW";
          default:
            return "Unknown (" + value.toString() + ")";
        }
      }
      else {
        switch (value) {
          case 0:
            return "Standard Quality (Low)";
          case 1:
            return "High Quality (Normal)";
          case 2:
            return "Super High Quality (Fine)";
          case 4:
            return "RAW";
          case 5:
            return "Medium-Fine";
          case 6:
            return "Small-Fine";
          case 33:
            return "Uncompressed";
          default:
            return "Unknown (" + value.toString() + ")";
        }
      }
    }
    else
    return this.getIndexedDescription(OlympusMakernoteDirectory.TAG_JPEG_QUALITY,
      1,
      "Standard Quality",
      "High Quality",
      "Super High Quality");
  }

  public getSpecialModeDescription(): string
  {
    let values = this._directory.getObject(OlympusMakernoteDirectory.TAG_SPECIAL_MODE);
    if (values == null)
    return null;
    if (values.length < 1)
    return "";
    let desc = '';

    switch (values[0]) {
      case 0:
        desc + "Normal picture taking mode";
        break;
      case 1:
        desc + "Unknown picture taking mode";
        break;
      case 2:
        desc + "Fast picture taking mode";
        break;
      case 3:
        desc + "Panorama picture taking mode";
        break;
      default:
        desc + "Unknown picture taking mode";
        break;
    }

    if (values.length >= 2) {
      switch (values[1]) {
        case 0:
          break;
        case 1:
          desc + " / 1st in a sequence";
          break;
        case 2:
          desc + " / 2nd in a sequence";
          break;
        case 3:
          desc + " / 3rd in a sequence";
          break;
        default:
          desc + " / ";
          desc + values[1];
          desc + "th in a sequence";
          break;
      }
    }
    if (values.length >= 3) {
      switch (values[2]) {
        case 1:
          desc + " / Left to right panorama direction";
          break;
        case 2:
          desc + " / Right to left panorama direction";
          break;
        case 3:
          desc + " / Bottom to top panorama direction";
          break;
        case 4:
          desc + " / Top to bottom panorama direction";
          break;
      }
    }

    return desc.toString();
  }
}

export default OlympusMakernoteDescriptor
