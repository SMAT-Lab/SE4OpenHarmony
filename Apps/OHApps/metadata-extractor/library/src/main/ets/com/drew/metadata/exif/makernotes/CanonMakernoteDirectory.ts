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

import Directory from '../../Directory';
import CanonMakernoteDescriptor from './CanonMakernoteDescriptor';


  export class  CameraSettings{
    // These 'sub'-tag values have been created for consistency -- they don't exist within the exif segment
    public static readonly OFFSET: number = 0xC100;

    /**
     * 1 = Macro
     * 2 = Normal
     */
    public static readonly TAG_MACRO_MODE: number = CameraSettings.OFFSET + 0x01;
    public static readonly TAG_SELF_TIMER_DELAY: number = CameraSettings.OFFSET + 0x02;
    /**
     * 2 = Normal
     * 3 = Fine
     * 5 = Superfine
     */
    public static readonly TAG_QUALITY: number = CameraSettings.OFFSET + 0x03;
    /**
     * 0 = Flash Not Fired
     * 1 = Auto
     * 2 = On
     * 3 = Red Eye Reduction
     * 4 = Slow Synchro
     * 5 = Auto + Red Eye Reduction
     * 6 = On + Red Eye Reduction
     * 16 = External Flash
     */
    public static readonly TAG_FLASH_MODE: number = CameraSettings.OFFSET + 0x04;
    /**
     * 0 = Single Frame or Timer Mode
     * 1 = Continuous
     */
    public static readonly TAG_CONTINUOUS_DRIVE_MODE: number = CameraSettings.OFFSET + 0x05;
    public static readonly TAG_UNKNOWN_2: number = CameraSettings.OFFSET + 0x06;
    /**
     * 0 = One-Shot
     * 1 = AI Servo
     * 2 = AI Focus
     * 3 = Manual Focus
     * 4 = Single
     * 5 = Continuous
     * 6 = Manual Focus
     */
    public static readonly TAG_FOCUS_MODE_1: number = CameraSettings.OFFSET + 0x07;
    public static readonly TAG_UNKNOWN_3: number = CameraSettings.OFFSET + 0x08;
    public static readonly TAG_RECORD_MODE: number = CameraSettings.OFFSET + 0x09;
    /**
     * 0 = Large
     * 1 = Medium
     * 2 = Small
     */
    public static readonly TAG_IMAGE_SIZE: number = CameraSettings.OFFSET + 0x0A;
    /**
     * 0 = Full Auto
     * 1 = Manual
     * 2 = Landscape
     * 3 = Fast Shutter
     * 4 = Slow Shutter
     * 5 = Night
     * 6 = Black &amp; White
     * 7 = Sepia
     * 8 = Portrait
     * 9 = Sports
     * 10 = Macro / Close-Up
     * 11 = Pan Focus
     */
    public static readonly TAG_EASY_SHOOTING_MODE: number = CameraSettings.OFFSET + 0x0B;
    /**
     * 0 = No Digital Zoom
     * 1 = 2x
     * 2 = 4x
     */
    public static readonly TAG_DIGITAL_ZOOM: number = CameraSettings.OFFSET + 0x0C;
    /**
     * 0 = Normal
     * 1 = High
     * 65535 = Low
     */
    public static readonly TAG_CONTRAST: number = CameraSettings.OFFSET + 0x0D;
    /**
     * 0 = Normal
     * 1 = High
     * 65535 = Low
     */
    public static readonly TAG_SATURATION: number = CameraSettings.OFFSET + 0x0E;
    /**
     * 0 = Normal
     * 1 = High
     * 65535 = Low
     */
    public static readonly TAG_SHARPNESS: number = CameraSettings.OFFSET + 0x0F;
    /**
     * 0 = Check ISOSpeedRatings EXIF tag for ISO Speed
     * 15 = Auto ISO
     * 16 = ISO 50
     * 17 = ISO 100
     * 18 = ISO 200
     * 19 = ISO 400
     */
    public static readonly TAG_ISO: number = CameraSettings.OFFSET + 0x10;
    /**
     * 3 = Evaluative
     * 4 = Partial
     * 5 = Centre Weighted
     */
    public static readonly TAG_METERING_MODE: number = CameraSettings.OFFSET + 0x11;
    /**
     * 0 = Manual
     * 1 = Auto
     * 3 = Close-up (Macro)
     * 8 = Locked (Pan Mode)
     */
    public static readonly TAG_FOCUS_TYPE: number = CameraSettings.OFFSET + 0x12;
    /**
     * 12288 = None (Manual Focus)
     * 12289 = Auto Selected
     * 12290 = Right
     * 12291 = Centre
     * 12292 = Left
     */
    public static readonly TAG_AF_POINT_SELECTED: number = CameraSettings.OFFSET + 0x13;
    /**
     * 0 = Easy Shooting (See Easy Shooting Mode)
     * 1 = Program
     * 2 = Tv-Priority
     * 3 = Av-Priority
     * 4 = Manual
     * 5 = A-DEP
     */
    public static readonly TAG_EXPOSURE_MODE: number = CameraSettings.OFFSET + 0x14;
    public static readonly TAG_UNKNOWN_7: number = CameraSettings.OFFSET + 0x15;
    public static readonly TAG_LENS_TYPE: number = CameraSettings.OFFSET + 0x16;
    public static readonly TAG_LONG_FOCAL_LENGTH: number = CameraSettings.OFFSET + 0x17;
    public static readonly TAG_SHORT_FOCAL_LENGTH: number = CameraSettings.OFFSET + 0x18;
    public static readonly TAG_FOCAL_UNITS_PER_MM: number = CameraSettings.OFFSET + 0x19;
    public static readonly TAG_MAX_APERTURE: number = CameraSettings.OFFSET + 0x1A;
    public static readonly TAG_MIN_APERTURE: number = CameraSettings.OFFSET + 0x1B;
    /**
     * 0 = Flash Did Not Fire
     * 1 = Flash Fired
     */
    public static readonly TAG_FLASH_ACTIVITY: number = CameraSettings.OFFSET + 0x1C;
    public static readonly TAG_FLASH_DETAILS: number = CameraSettings.OFFSET + 0x1D;
    public static readonly TAG_FOCUS_CONTINUOUS: number = CameraSettings.OFFSET + 0x1E;
    public static readonly TAG_AE_SETTING: number = CameraSettings.OFFSET + 0x1F;
    /**
     * 0 = Focus Mode: Single
     * 1 = Focus Mode: Continuous
     */
    public static readonly TAG_FOCUS_MODE_2: number = CameraSettings.OFFSET + 0x20;
    public static readonly TAG_DISPLAY_APERTURE: number = CameraSettings.OFFSET + 0x21;
    public static readonly TAG_ZOOM_SOURCE_WIDTH: number = CameraSettings.OFFSET + 0x22;
    public static readonly TAG_ZOOM_TARGET_WIDTH: number = CameraSettings.OFFSET + 0x23;
    public static readonly TAG_SPOT_METERING_MODE: number = CameraSettings.OFFSET + 0x25;
    public static readonly TAG_PHOTO_EFFECT: number = CameraSettings.OFFSET + 0x26;
    public static readonly TAG_MANUAL_FLASH_OUTPUT: number = CameraSettings.OFFSET + 0x27;
    public static readonly TAG_COLOR_TONE: number = CameraSettings.OFFSET + 0x29;
    public static readonly TAG_SRAW_QUALITY: number = CameraSettings.OFFSET + 0x2D;
  }
  export class FocalLength{
    // These 'sub'-tag values have been created for consistency -- they don't exist within the exif segment

    public static readonly OFFSET: number = 0xC200;

    /**
     * 0 = Auto
     * 1 = Sunny
     * 2 = Cloudy
     * 3 = Tungsten
     * 4 = Florescent
     * 5 = Flash
     * 6 = Custom
     */
    public static readonly TAG_WHITE_BALANCE: number = FocalLength.OFFSET + 0x07;
    public static readonly TAG_SEQUENCE_NUMBER: number = FocalLength.OFFSET + 0x09;
    public static readonly TAG_AF_POINT_USED: number = FocalLength.OFFSET + 0x0E;
    /**
     * The value of this tag may be translated into a flash bias value, in EV.
     *
     * 0xffc0 = -2 EV
     * 0xffcc = -1.67 EV
     * 0xffd0 = -1.5 EV
     * 0xffd4 = -1.33 EV
     * 0xffe0 = -1 EV
     * 0xffec = -0.67 EV
     * 0xfff0 = -0.5 EV
     * 0xfff4 = -0.33 EV
     * 0x0000 = 0 EV
     * 0x000c = 0.33 EV
     * 0x0010 = 0.5 EV
     * 0x0014 = 0.67 EV
     * 0x0020 = 1 EV
     * 0x002c = 1.33 EV
     * 0x0030 = 1.5 EV
     * 0x0034 = 1.67 EV
     * 0x0040 = 2 EV
     */
    public static readonly TAG_FLASH_BIAS: number = FocalLength.OFFSET + 0x0F;
    public static readonly TAG_AUTO_EXPOSURE_BRACKETING: number = FocalLength.OFFSET + 0x10;
    public static readonly TAG_AEB_BRACKET_VALUE: number = FocalLength.OFFSET + 0x11;
    public static readonly TAG_SUBJECT_DISTANCE: number = FocalLength.OFFSET + 0x13;
  }
 export class ShotInfo  {
    // These 'sub'-tag values have been created for consistency -- they don't exist within the exif segment

    public static readonly OFFSET: number = 0xC400;
    public static readonly TAG_AUTO_ISO: number = ShotInfo.OFFSET + 1;
    public static readonly TAG_BASE_ISO: number = ShotInfo.OFFSET + 2;
    public static readonly TAG_MEASURED_EV: number = ShotInfo.OFFSET + 3;
    public static readonly TAG_TARGET_APERTURE: number = ShotInfo.OFFSET + 4;
    public static readonly TAG_TARGET_EXPOSURE_TIME: number = ShotInfo.OFFSET + 5;
    public static readonly TAG_EXPOSURE_COMPENSATION: number = ShotInfo.OFFSET + 6;
    public static readonly TAG_WHITE_BALANCE: number = ShotInfo.OFFSET + 7;
    public static readonly TAG_SLOW_SHUTTER: number = ShotInfo.OFFSET + 8;
    public static readonly TAG_SEQUENCE_NUMBER: number = ShotInfo.OFFSET + 9;
    public static readonly TAG_OPTICAL_ZOOM_CODE: number = ShotInfo.OFFSET + 10;
    public static readonly TAG_CAMERA_TEMPERATURE: number = ShotInfo.OFFSET + 12;
    public static readonly TAG_FLASH_GUIDE_NUMBER: number = ShotInfo.OFFSET + 13;
    public static readonly TAG_AF_POINTS_IN_FOCUS: number = ShotInfo.OFFSET + 14;
    public static readonly TAG_FLASH_EXPOSURE_BRACKETING: number = ShotInfo.OFFSET + 15;
    public static readonly TAG_AUTO_EXPOSURE_BRACKETING: number = ShotInfo.OFFSET + 16;
    public static readonly TAG_AEB_BRACKET_VALUE: number = ShotInfo.OFFSET + 17;
    public static readonly TAG_CONTROL_MODE: number = ShotInfo.OFFSET + 18;
    public static readonly TAG_FOCUS_DISTANCE_UPPER: number = ShotInfo.OFFSET + 19;
    public static readonly TAG_FOCUS_DISTANCE_LOWER: number = ShotInfo.OFFSET + 20;
    public static readonly TAG_F_NUMBER: number = ShotInfo.OFFSET + 21;
    public static readonly TAG_EXPOSURE_TIME: number = ShotInfo.OFFSET + 22;
    public static readonly TAG_MEASURED_EV_2: number = ShotInfo.OFFSET + 23;
    public static readonly TAG_BULB_DURATION: number = ShotInfo.OFFSET + 24;
    public static readonly TAG_CAMERA_TYPE: number = ShotInfo.OFFSET + 26;
    public static readonly TAG_AUTO_ROTATE: number = ShotInfo.OFFSET + 27;
    public static readonly TAG_ND_FILTER: number = ShotInfo.OFFSET + 28;
    public static readonly TAG_SELF_TIMER_2: number = ShotInfo.OFFSET + 29;
    public static readonly TAG_FLASH_OUTPUT: number = ShotInfo.OFFSET + 33;
  }

export class Panorama {
    // These 'sub'-tag values have been created for consistency -- they don't exist within the exif segment

    public static readonly OFFSET: number = 0xC500;
    public static readonly TAG_PANORAMA_FRAME_NUMBER: number = Panorama.OFFSET + 2;
    public static readonly TAG_PANORAMA_DIRECTION: number = Panorama.OFFSET + 5;
  }
 export class AFInfo  {
    // These 'sub'-tag values have been created for consistency -- they don't exist within the exif segment

    public static readonly OFFSET: number = 0xD200;
    public static readonly TAG_NUM_AF_POINTS: number = AFInfo.OFFSET ;
    public static readonly TAG_VALID_AF_POINTS: number = AFInfo.OFFSET + 1;
    public static readonly TAG_IMAGE_WIDTH: number = AFInfo.OFFSET + 2;
    public static readonly TAG_IMAGE_HEIGHT: number = AFInfo.OFFSET + 3;
    public static readonly TAG_AF_IMAGE_WIDTH: number = AFInfo.OFFSET + 4;
    public static readonly TAG_AF_IMAGE_HEIGHT: number = AFInfo.OFFSET + 5;
    public static readonly TAG_AF_AREA_WIDTH: number = AFInfo.OFFSET + 6;
    public static readonly TAG_AF_AREA_HEIGHT: number = AFInfo.OFFSET + 7;
    public static readonly TAG_AF_AREA_X_POSITIONS: number = AFInfo.OFFSET + 8;
    public static readonly TAG_AF_AREA_Y_POSITIONS: number = AFInfo.OFFSET + 9;
    public static readonly TAG_AF_POINTS_IN_FOCUS: number = AFInfo.OFFSET + 10;
    public static readonly TAG_PRIMARY_AF_POINT_1: number = AFInfo.OFFSET + 11;
    public static readonly TAG_PRIMARY_AF_POINT_2: number = AFInfo.OFFSET + 12; // not sure why there are two of these
  }
/**
 * Describes tags specific to Canon cameras.
 */
class CanonMakernoteDirectory extends Directory {
  // These TAG_*_ARRAY Exif tags map to arrays of int16 values which are split out into separate 'fake' tags.
  // When an attempt is made to set one of these on the directory, it is split and the corresponding offset added to the tagType.
  // So the resulting tag is the offset + the index into the array.

  private static readonly TAG_CAMERA_SETTINGS_ARRAY: number          = 0x0001;
  private static readonly TAG_FOCAL_LENGTH_ARRAY: number             = 0x0002;
  //    private static readonly TAG_FLASH_INFO: number                     = 0x0003;
  private static readonly TAG_SHOT_INFO_ARRAY: number               = 0x0004;
  private static readonly TAG_PANORAMA_ARRAY: number                 = 0x0005;
  public static readonly TAG_CANON_IMAGE_TYPE: number                = 0x0006;
  public static readonly TAG_CANON_FIRMWARE_VERSION: number          = 0x0007;
  public static readonly TAG_CANON_IMAGE_NUMBER: number              = 0x0008;
  public static readonly TAG_CANON_OWNER_NAME: number                = 0x0009;
  public static readonly TAG_CANON_SERIAL_NUMBER: number             = 0x000C;
  public static readonly TAG_CAMERA_INFO_ARRAY: number               = 0x000D; // depends upon model, so leave for now
  public static readonly TAG_CANON_FILE_LENGTH: number               = 0x000E;
  public static readonly TAG_CANON_CUSTOM_FUNCTIONS_ARRAY: number    = 0x000F; // depends upon model, so leave for now
  public static readonly TAG_MODEL_ID: number                        = 0x0010;
  public static readonly TAG_MOVIE_INFO_ARRAY: number                = 0x0011; // not currently decoded as not sure we see it in still images
  private static readonly TAG_AF_INFO_ARRAY: number                  = 0x0012; // not currently decoded
  public static readonly TAG_THUMBNAIL_IMAGE_VALID_AREA: number      = 0x0013;
  public static readonly TAG_SERIAL_NUMBER_FORMAT: number            = 0x0015;
  public static readonly TAG_SUPER_MACRO: number                     = 0x001A;
  public static readonly TAG_DATE_STAMP_MODE: number                 = 0x001C;
  public static readonly TAG_MY_COLORS: number                       = 0x001D;
  public static readonly TAG_FIRMWARE_REVISION: number               = 0x001E;
  public static readonly TAG_CATEGORIES: number                      = 0x0023;
  public static readonly TAG_FACE_DETECT_ARRAY_1: number             = 0x0024;
  public static readonly TAG_FACE_DETECT_ARRAY_2: number             = 0x0025;
  public static readonly TAG_AF_INFO_ARRAY_2: number                 = 0x0026;
  public static readonly TAG_IMAGE_UNIQUE_ID: number                 = 0x0028;
  public static readonly TAG_RAW_DATA_OFFSET: number                 = 0x0081;
  public static readonly TAG_ORIGINAL_DECISION_DATA_OFFSET: number   = 0x0083;
  public static readonly TAG_CUSTOM_FUNCTIONS_1D_ARRAY: number       = 0x0090; // not currently decoded
  public static readonly TAG_PERSONAL_FUNCTIONS_ARRAY: number        = 0x0091; // not currently decoded
  public static readonly TAG_PERSONAL_FUNCTION_VALUES_ARRAY: number  = 0x0092; // not currently decoded
  public static readonly TAG_FILE_INFO_ARRAY: number                 = 0x0093; // not currently decoded
  public static readonly TAG_AF_POINTS_IN_FOCUS_1D: number           = 0x0094;
  public static readonly TAG_LENS_MODEL: number                      = 0x0095;
  public static readonly TAG_SERIAL_INFO_ARRAY: number               = 0x0096; // not currently decoded
  public static readonly TAG_DUST_REMOVAL_DATA: number               = 0x0097;
  public static readonly TAG_CROP_INFO: number                       = 0x0098; // not currently decoded
  public static readonly TAG_CUSTOM_FUNCTIONS_ARRAY_2: number        = 0x0099; // not currently decoded
  public static readonly TAG_ASPECT_INFO_ARRAY: number               = 0x009A; // not currently decoded
  public static readonly TAG_PROCESSING_INFO_ARRAY: number           = 0x00A0; // not currently decoded
  public static readonly TAG_TONE_CURVE_TABLE: number                = 0x00A1;
  public static readonly TAG_SHARPNESS_TABLE: number                 = 0x00A2;
  public static readonly TAG_SHARPNESS_FREQ_TABLE: number            = 0x00A3;
  public static readonly TAG_WHITE_BALANCE_TABLE: number             = 0x00A4;
  public static readonly TAG_COLOR_BALANCE_ARRAY: number             = 0x00A9; // not currently decoded
  public static readonly TAG_MEASURED_COLOR_ARRAY: number            = 0x00AA; // not currently decoded
  public static readonly TAG_COLOR_TEMPERATURE: number               = 0x00AE;
  public static readonly TAG_CANON_FLAGS_ARRAY: number               = 0x00B0; // not currently decoded
  public static readonly TAG_MODIFIED_INFO_ARRAY: number             = 0x00B1; // not currently decoded
  public static readonly TAG_TONE_CURVE_MATCHING: number             = 0x00B2;
  public static readonly TAG_WHITE_BALANCE_MATCHING: number          = 0x00B3;
  public static readonly TAG_COLOR_SPACE: number                     = 0x00B4;
  public static readonly TAG_PREVIEW_IMAGE_INFO_ARRAY: number        = 0x00B6; // not currently decoded
  public static readonly TAG_VRD_OFFSET: number                      = 0x00D0;
  public static readonly TAG_SENSOR_INFO_ARRAY: number               = 0x00E0; // not currently decoded

  public static readonly TAG_COLOR_DATA_ARRAY_2: number              = 0x4001; // depends upon camera model, not currently decoded
  public static readonly TAG_CRW_PARAM: number                       = 0x4002; // depends upon camera model, not currently decoded
  public static readonly TAG_COLOR_INFO_ARRAY_2: number              = 0x4003; // not currently decoded
  public static readonly TAG_BLACK_LEVEL: number                     = 0x4008; // not currently decoded
  public static readonly TAG_CUSTOM_PICTURE_STYLE_FILE_NAME: number  = 0x4010;
  public static readonly TAG_COLOR_INFO_ARRAY: number                = 0x4013; // not currently decoded
  public static readonly TAG_VIGNETTING_CORRECTION_ARRAY_1: number   = 0x4015; // not currently decoded
  public static readonly TAG_VIGNETTING_CORRECTION_ARRAY_2: number   = 0x4016; // not currently decoded
  public static readonly TAG_LIGHTING_OPTIMIZER_ARRAY: number        = 0x4018; // not currently decoded
  public static readonly TAG_LENS_INFO_ARRAY: number                 = 0x4019; // not currently decoded
  public static readonly TAG_AMBIANCE_INFO_ARRAY: number             = 0x4020; // not currently decoded
  public static readonly TAG_FILTER_INFO_ARRAY: number               = 0x4024; // not currently decoded




  private static readonly _tagNameMap: Map<number, string> = new Map<number, string>([
    [CanonMakernoteDirectory.TAG_CANON_FIRMWARE_VERSION, "Firmware Version"],
    [CanonMakernoteDirectory.TAG_CANON_IMAGE_NUMBER, "Image Number"],
    [CanonMakernoteDirectory.TAG_CANON_IMAGE_TYPE, "Image Type"],
    [CanonMakernoteDirectory.TAG_CANON_OWNER_NAME, "Owner Name"],
    [CanonMakernoteDirectory.TAG_CANON_SERIAL_NUMBER, "Camera Serial Number"],
    [CanonMakernoteDirectory.TAG_CAMERA_INFO_ARRAY, "Camera Info Array"],
    [CanonMakernoteDirectory.TAG_CANON_FILE_LENGTH, "File Length"],
    [CanonMakernoteDirectory.TAG_CANON_CUSTOM_FUNCTIONS_ARRAY, "Custom Functions"],
    [CanonMakernoteDirectory.TAG_MODEL_ID, "Canon Model ID"],
    [CanonMakernoteDirectory.TAG_MOVIE_INFO_ARRAY, "Movie Info Array"],

    [CameraSettings.TAG_AF_POINT_SELECTED, "AF Point Selected"],
    [CameraSettings.TAG_CONTINUOUS_DRIVE_MODE, "Continuous Drive Mode"],
    [CameraSettings.TAG_CONTRAST, "Contrast"],
    [CameraSettings.TAG_EASY_SHOOTING_MODE, "Easy Shooting Mode"],
    [CameraSettings.TAG_EXPOSURE_MODE, "Exposure Mode"],
    [CameraSettings.TAG_FLASH_DETAILS, "Flash Details"],
    [CameraSettings.TAG_FLASH_MODE, "Flash Mode"],
    [CameraSettings.TAG_FOCAL_UNITS_PER_MM, "Focal Units per mm"],
    [CameraSettings.TAG_FOCUS_MODE_1, "Focus Mode"],
    [CameraSettings.TAG_FOCUS_MODE_2, "Focus Mode"],
    [CameraSettings.TAG_IMAGE_SIZE, "Image Size"],
    [CameraSettings.TAG_ISO, "Iso"],
    [CameraSettings.TAG_LONG_FOCAL_LENGTH, "Long Focal Length"],
    [CameraSettings.TAG_MACRO_MODE, "Macro Mode"],
    [CameraSettings.TAG_METERING_MODE, "Metering Mode"],
    [CameraSettings.TAG_SATURATION, "Saturation"],
    [CameraSettings.TAG_SELF_TIMER_DELAY, "Self Timer Delay"],
    [CameraSettings.TAG_SHARPNESS, "Sharpness"],
    [CameraSettings.TAG_SHORT_FOCAL_LENGTH, "Short Focal Length"],
    [CameraSettings.TAG_QUALITY, "Quality"],
    [CameraSettings.TAG_UNKNOWN_2, "Unknown Camera Setting 2"],
    [CameraSettings.TAG_UNKNOWN_3, "Unknown Camera Setting 3"],
    [CameraSettings.TAG_RECORD_MODE, "Record Mode"],
    [CameraSettings.TAG_DIGITAL_ZOOM, "Digital Zoom"],
    [CameraSettings.TAG_FOCUS_TYPE, "Focus Type"],
    [CameraSettings.TAG_UNKNOWN_7, "Unknown Camera Setting 7"],
    [CameraSettings.TAG_LENS_TYPE, "Lens Type"],
    [CameraSettings.TAG_MAX_APERTURE, "Max Aperture"],
    [CameraSettings.TAG_MIN_APERTURE, "Min Aperture"],
    [CameraSettings.TAG_FLASH_ACTIVITY, "Flash Activity"],
    [CameraSettings.TAG_FOCUS_CONTINUOUS, "Focus Continuous"],
    [CameraSettings.TAG_AE_SETTING, "AE Setting"],
    [CameraSettings.TAG_DISPLAY_APERTURE, "Display Aperture"],
    [CameraSettings.TAG_ZOOM_SOURCE_WIDTH, "Zoom Source Width"],
    [CameraSettings.TAG_ZOOM_TARGET_WIDTH, "Zoom Target Width"],
    [CameraSettings.TAG_SPOT_METERING_MODE, "Spot Metering Mode"],
    [CameraSettings.TAG_PHOTO_EFFECT, "Photo Effect"],
    [CameraSettings.TAG_MANUAL_FLASH_OUTPUT, "Manual Flash Output"],
    [CameraSettings.TAG_COLOR_TONE, "Color Tone"],
    [CameraSettings.TAG_SRAW_QUALITY, "SRAW Quality"],

    [FocalLength.TAG_WHITE_BALANCE, "White Balance"],
    [FocalLength.TAG_SEQUENCE_NUMBER, "Sequence Number"],
    [FocalLength.TAG_AF_POINT_USED, "AF Point Used"],
    [FocalLength.TAG_FLASH_BIAS, "Flash Bias"],
    [FocalLength.TAG_AUTO_EXPOSURE_BRACKETING, "Auto Exposure Bracketing"],
    [FocalLength.TAG_AEB_BRACKET_VALUE, "AEB Bracket Value"],
    [FocalLength.TAG_SUBJECT_DISTANCE, "Subject Distance"],

    [ShotInfo.TAG_AUTO_ISO, "Auto ISO"],
    [ShotInfo.TAG_BASE_ISO, "Base ISO"],
    [ShotInfo.TAG_MEASURED_EV, "Measured EV"],
    [ShotInfo.TAG_TARGET_APERTURE, "Target Aperture"],
    [ShotInfo.TAG_TARGET_EXPOSURE_TIME, "Target Exposure Time"],
    [ShotInfo.TAG_EXPOSURE_COMPENSATION, "Exposure Compensation"],
    [ShotInfo.TAG_WHITE_BALANCE, "White Balance"],
    [ShotInfo.TAG_SLOW_SHUTTER, "Slow Shutter"],
    [ShotInfo.TAG_SEQUENCE_NUMBER, "Sequence Number"],
    [ShotInfo.TAG_OPTICAL_ZOOM_CODE, "Optical Zoom Code"],
    [ShotInfo.TAG_CAMERA_TEMPERATURE, "Camera Temperature"],
    [ShotInfo.TAG_FLASH_GUIDE_NUMBER, "Flash Guide Number"],
    [ShotInfo.TAG_AF_POINTS_IN_FOCUS, "AF Points in Focus"],
    [ShotInfo.TAG_FLASH_EXPOSURE_BRACKETING, "Flash Exposure Compensation"],
    [ShotInfo.TAG_AUTO_EXPOSURE_BRACKETING, "Auto Exposure Bracketing"],
    [ShotInfo.TAG_AEB_BRACKET_VALUE, "AEB Bracket Value"],
    [ShotInfo.TAG_CONTROL_MODE, "Control Mode"],
    [ShotInfo.TAG_FOCUS_DISTANCE_UPPER, "Focus Distance Upper"],
    [ShotInfo.TAG_FOCUS_DISTANCE_LOWER, "Focus Distance Lower"],
    [ShotInfo.TAG_F_NUMBER, "F Number"],
    [ShotInfo.TAG_EXPOSURE_TIME, "Exposure Time"],
    [ShotInfo.TAG_MEASURED_EV_2, "Measured EV 2"],
    [ShotInfo.TAG_BULB_DURATION, "Bulb Duration"],
    [ShotInfo.TAG_CAMERA_TYPE, "Camera Type"],
    [ShotInfo.TAG_AUTO_ROTATE, "Auto Rotate"],
    [ShotInfo.TAG_ND_FILTER, "ND Filter"],
    [ShotInfo.TAG_SELF_TIMER_2, "Self Timer 2"],
    [ShotInfo.TAG_FLASH_OUTPUT, "Flash Output"],

    [Panorama.TAG_PANORAMA_FRAME_NUMBER, "Panorama Frame Number"],
    [Panorama.TAG_PANORAMA_DIRECTION, "Panorama Direction"],

    [AFInfo.TAG_NUM_AF_POINTS, "AF Point Count"],
    [AFInfo.TAG_VALID_AF_POINTS, "Valid AF Point Count"],
    [AFInfo.TAG_IMAGE_WIDTH, "Image Width"],
    [AFInfo.TAG_IMAGE_HEIGHT, "Image Height"],
    [AFInfo.TAG_AF_IMAGE_WIDTH, "AF Image Width"],
    [AFInfo.TAG_AF_IMAGE_HEIGHT, "AF Image Height"],
    [AFInfo.TAG_AF_AREA_WIDTH, "AF Area Width"],
    [AFInfo.TAG_AF_AREA_HEIGHT, "AF Area Height"],
    [AFInfo.TAG_AF_AREA_X_POSITIONS, "AF Area X Positions"],
    [AFInfo.TAG_AF_AREA_Y_POSITIONS, "AF Area Y Positions"],
    [AFInfo.TAG_AF_POINTS_IN_FOCUS, "AF Points in Focus"],
    [AFInfo.TAG_PRIMARY_AF_POINT_1, "Primary AF Point 1"],
    [AFInfo.TAG_PRIMARY_AF_POINT_2, "Primary AF Point 2"],

    [CanonMakernoteDirectory.TAG_THUMBNAIL_IMAGE_VALID_AREA, "Thumbnail Image Valid Area"],
    [CanonMakernoteDirectory.TAG_SERIAL_NUMBER_FORMAT, "Serial Number Format"],
    [CanonMakernoteDirectory.TAG_SUPER_MACRO, "Super Macro"],
    [CanonMakernoteDirectory.TAG_DATE_STAMP_MODE, "Date Stamp Mode"],
    [CanonMakernoteDirectory.TAG_MY_COLORS, "My Colors"],
    [CanonMakernoteDirectory.TAG_FIRMWARE_REVISION, "Firmware Revision"],
    [CanonMakernoteDirectory.TAG_CATEGORIES, "Categories"],
    [CanonMakernoteDirectory.TAG_FACE_DETECT_ARRAY_1, "Face Detect Array 1"],
    [CanonMakernoteDirectory.TAG_FACE_DETECT_ARRAY_2, "Face Detect Array 2"],
    [CanonMakernoteDirectory.TAG_AF_INFO_ARRAY_2, "AF Info Array 2"],
    [CanonMakernoteDirectory.TAG_IMAGE_UNIQUE_ID, "Image Unique ID"],
    [CanonMakernoteDirectory.TAG_RAW_DATA_OFFSET, "Raw Data Offset"],
    [CanonMakernoteDirectory.TAG_ORIGINAL_DECISION_DATA_OFFSET, "Original Decision Data Offset"],
    [CanonMakernoteDirectory.TAG_CUSTOM_FUNCTIONS_1D_ARRAY, "Custom Functions (1D) Array"],
    [CanonMakernoteDirectory.TAG_PERSONAL_FUNCTIONS_ARRAY, "Personal Functions Array"],
    [CanonMakernoteDirectory.TAG_PERSONAL_FUNCTION_VALUES_ARRAY, "Personal Function Values Array"],
    [CanonMakernoteDirectory.TAG_FILE_INFO_ARRAY, "File Info Array"],
    [CanonMakernoteDirectory.TAG_AF_POINTS_IN_FOCUS_1D, "AF Points in Focus (1D)"],
    [CanonMakernoteDirectory.TAG_LENS_MODEL, "Lens Model"],
    [CanonMakernoteDirectory.TAG_SERIAL_INFO_ARRAY, "Serial Info Array"],
    [CanonMakernoteDirectory.TAG_DUST_REMOVAL_DATA, "Dust Removal Data"],
    [CanonMakernoteDirectory.TAG_CROP_INFO, "Crop Info"],
    [CanonMakernoteDirectory.TAG_CUSTOM_FUNCTIONS_ARRAY_2, "Custom Functions Array 2"],
    [CanonMakernoteDirectory.TAG_ASPECT_INFO_ARRAY, "Aspect Information Array"],
    [CanonMakernoteDirectory.TAG_PROCESSING_INFO_ARRAY, "Processing Information Array"],
    [CanonMakernoteDirectory.TAG_TONE_CURVE_TABLE, "Tone Curve Table"],
    [CanonMakernoteDirectory.TAG_SHARPNESS_TABLE, "Sharpness Table"],
    [CanonMakernoteDirectory.TAG_SHARPNESS_FREQ_TABLE, "Sharpness Frequency Table"],
    [CanonMakernoteDirectory.TAG_WHITE_BALANCE_TABLE, "White Balance Table"],
    [CanonMakernoteDirectory.TAG_COLOR_BALANCE_ARRAY, "Color Balance Array"],
    [CanonMakernoteDirectory.TAG_MEASURED_COLOR_ARRAY, "Measured Color Array"],
    [CanonMakernoteDirectory.TAG_COLOR_TEMPERATURE, "Color Temperature"],
    [CanonMakernoteDirectory.TAG_CANON_FLAGS_ARRAY, "Canon Flags Array"],
    [CanonMakernoteDirectory.TAG_MODIFIED_INFO_ARRAY, "Modified Information Array"],
    [CanonMakernoteDirectory.TAG_TONE_CURVE_MATCHING, "Tone Curve Matching"],
    [CanonMakernoteDirectory.TAG_WHITE_BALANCE_MATCHING, "White Balance Matching"],
    [CanonMakernoteDirectory.TAG_COLOR_SPACE, "Color Space"],
    [CanonMakernoteDirectory.TAG_PREVIEW_IMAGE_INFO_ARRAY, "Preview Image Info Array"],
    [CanonMakernoteDirectory.TAG_VRD_OFFSET, "VRD Offset"],
    [CanonMakernoteDirectory.TAG_SENSOR_INFO_ARRAY, "Sensor Information Array"],
    [CanonMakernoteDirectory.TAG_COLOR_DATA_ARRAY_2, "Color Data Array 1"],
    [CanonMakernoteDirectory.TAG_CRW_PARAM, "CRW Parameters"],
    [CanonMakernoteDirectory.TAG_COLOR_INFO_ARRAY_2, "Color Data Array 2"],
    [CanonMakernoteDirectory.TAG_BLACK_LEVEL, "Black Level"],
    [CanonMakernoteDirectory.TAG_CUSTOM_PICTURE_STYLE_FILE_NAME, "Custom Picture Style File Name"],
    [CanonMakernoteDirectory.TAG_COLOR_INFO_ARRAY, "Color Info Array"],
    [CanonMakernoteDirectory.TAG_VIGNETTING_CORRECTION_ARRAY_1, "Vignetting Correction Array 1"],
    [CanonMakernoteDirectory.TAG_VIGNETTING_CORRECTION_ARRAY_2, "Vignetting Correction Array 2"],
    [CanonMakernoteDirectory.TAG_LIGHTING_OPTIMIZER_ARRAY, "Lighting Optimizer Array"],
    [CanonMakernoteDirectory.TAG_LENS_INFO_ARRAY, "Lens Info Array"],
    [CanonMakernoteDirectory.TAG_AMBIANCE_INFO_ARRAY, "Ambiance Info Array"],
    [CanonMakernoteDirectory.TAG_FILTER_INFO_ARRAY, "Filter Info Array"],
  ]);

  public constructor() {
    super();
    this.setDescriptor(new CanonMakernoteDescriptor(this));
  }

  public getName(): string
  {
    return "Canon Makernote";
  }

  protected getTagNameMap(): Map<number, string>
  {
    return CanonMakernoteDirectory._tagNameMap;
  }

  public setObjectArray(tagType: number, array: Object): void
  {

    if (Array.isArray(array) && array.length > 0 && !(array[0] instanceof Number)) {
      // no special handling...
      super.setObjectArray(tagType, array);
      return;
    }

    // Certain Canon tags contain arrays of values that we split into 'fake' tags as each
    // index in the array has its own meaning and decoding.
    // Pick those tags out here and throw away the original array.
    // Otherwise just add as usual.
    switch (tagType) {
      case CanonMakernoteDirectory.TAG_CAMERA_SETTINGS_ARRAY:
      {
        let ints: number[] = <number[]> array;
        for (let i: number = 0; i < ints.length; i++)
        this.setInt(CameraSettings.OFFSET + i, ints[i]);
        break;
      }
      case CanonMakernoteDirectory.TAG_FOCAL_LENGTH_ARRAY:
      {
        let ints: number[] = <number[]> array;
        for (let i: number = 0; i < ints.length; i++)
        this.setInt(FocalLength.OFFSET + i, ints[i]);
        break;
      }
      case CanonMakernoteDirectory.TAG_SHOT_INFO_ARRAY:
      {
        let ints: number[] = <number[]> array;
        for (let i: number = 0; i < ints.length; i++)
        this.setInt(ShotInfo.OFFSET + i, ints[i]);
        break;
      }
      case CanonMakernoteDirectory.TAG_PANORAMA_ARRAY:
      {
        let ints: number[] = <number[]> array;
        for (let i: number = 0; i < ints.length; i++)
        this.setInt(Panorama.OFFSET + i, ints[i]);
        break;
      }
      case CanonMakernoteDirectory.TAG_AF_INFO_ARRAY:
      {
        // Notes from Exiftool 10.10 by Phil Harvey, lib\Image\Exiftool\Canon.pm:
        // Auto-focus information used by many older Canon models. The values in this
        // record are sequential, and some have variable sizes based on the value of
        // numafpoints (which may be 1,5,7,9,15,45, or 53). The AFArea coordinates are
        // given in a system where the image has dimensions given by AFImageWidth and
        // AFImageHeight, and 0,0 is the image center. The direction of the Y axis
        // depends on the camera model, with positive Y upwards for EOS models, but
        // apparently downwards for PowerShot models.

        // AFInfo is another array with 'fake' tags. The first int of the array contains
        // the number of AF points. Iterate through the array one byte at a time, generally
        // assuming one byte corresponds to one tag UNLESS certain tag numbers are encountered.
        // For these, read specific subsequent bytes from the array based on the tag type. The
        // number of bytes read can vary.

        let values: number[] = <number[]> array;
        let numafpoints: number = values[0];
        let tagnumber: number = 0;
        for (let i = 0; i < values.length; i++) {
          // These two tags store 'numafpoints' bytes of data in the array
          if (AFInfo.OFFSET + tagnumber == AFInfo.TAG_AF_AREA_X_POSITIONS ||
          AFInfo.OFFSET + tagnumber == AFInfo.TAG_AF_AREA_Y_POSITIONS) {
            // There could be incorrect data in the array, so boundary check
            if (values.length - 1 >= (i + numafpoints)) {
              let areaPositions: number[] = [];
              for (let j = 0; j < areaPositions.length; j++)
              areaPositions[j] = values[i + j];

              super.setObjectArray(AFInfo.OFFSET + tagnumber, areaPositions);
            }
            i += numafpoints - 1; // assume these bytes are processed and skip
          }
          else if (AFInfo.OFFSET + tagnumber == AFInfo.TAG_AF_POINTS_IN_FOCUS) {
            let pointsInFocus: number[] = [];

            // There could be incorrect data in the array, so boundary check
            if (values.length - 1 >= (i + pointsInFocus.length)) {
              for (let j = 0; j < pointsInFocus.length; j++)
              pointsInFocus[j] = values[i + j];

              super.setObjectArray(AFInfo.OFFSET + tagnumber, pointsInFocus);
            }
            i += pointsInFocus.length - 1; // assume these bytes are processed and skip
          }
          else
          super.setObjectArray(AFInfo.OFFSET + tagnumber, values[i]);
          tagnumber++;
        }
        break;
      }
      default:
        {
          // no special handling...
          super.setObjectArray(tagType, array);
          break;
        }
    }
  }
}

export default CanonMakernoteDirectory