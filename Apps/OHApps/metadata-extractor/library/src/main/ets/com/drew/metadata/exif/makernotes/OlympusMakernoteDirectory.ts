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

import SequentialByteArrayReader from '../../../lang/SequentialByteArrayReader';
import OlympusMakernoteDescriptor from './OlympusMakernoteDescriptor';
import Directory from '../../Directory';

export class CameraSettings {
  // These 'sub'-tag values have been created for consistency -- they don't exist within the Makernote IFD
  public static readonly OFFSET = 0xF000;
  public static readonly TAG_EXPOSURE_MODE = CameraSettings.OFFSET + 2;
  public static readonly TAG_FLASH_MODE = CameraSettings.OFFSET + 3;
  public static readonly TAG_WHITE_BALANCE = CameraSettings.OFFSET + 4;
  public static readonly TAG_IMAGE_SIZE = CameraSettings.OFFSET + 5;
  public static readonly TAG_IMAGE_QUALITY = CameraSettings.OFFSET + 6;
  public static readonly TAG_SHOOTING_MODE = CameraSettings.OFFSET + 7;
  public static readonly TAG_METERING_MODE = CameraSettings.OFFSET + 8;
  public static readonly TAG_APEX_FILM_SPEED_VALUE = CameraSettings.OFFSET + 9;
  public static readonly TAG_APEX_SHUTTER_SPEED_TIME_VALUE = CameraSettings.OFFSET + 10;
  public static readonly TAG_APEX_APERTURE_VALUE = CameraSettings.OFFSET + 11;
  public static readonly TAG_MACRO_MODE = CameraSettings.OFFSET + 12;
  public static readonly TAG_DIGITAL_ZOOM = CameraSettings.OFFSET + 13;
  public static readonly TAG_EXPOSURE_COMPENSATION = CameraSettings.OFFSET + 14;
  public static readonly TAG_BRACKET_STEP = CameraSettings.OFFSET + 15;
  // 16 missing
  public static readonly TAG_INTERVAL_LENGTH = CameraSettings.OFFSET + 17;
  public static readonly TAG_INTERVAL_NUMBER = CameraSettings.OFFSET + 18;
  public static readonly TAG_FOCAL_LENGTH = CameraSettings.OFFSET + 19;
  public static readonly TAG_FOCUS_DISTANCE = CameraSettings.OFFSET + 20;
  public static readonly TAG_FLASH_FIRED = CameraSettings.OFFSET + 21;
  public static readonly TAG_DATE = CameraSettings.OFFSET + 22;
  public static readonly TAG_TIME = CameraSettings.OFFSET + 23;
  public static readonly TAG_MAX_APERTURE_AT_FOCAL_LENGTH = CameraSettings.OFFSET + 24;
  // 25, 26 missing
  public static readonly TAG_FILE_NUMBER_MEMORY = CameraSettings.OFFSET + 27;
  public static readonly TAG_LAST_FILE_NUMBER = CameraSettings.OFFSET + 28;
  public static readonly TAG_WHITE_BALANCE_RED = CameraSettings.OFFSET + 29;
  public static readonly TAG_WHITE_BALANCE_GREEN = CameraSettings.OFFSET + 30;
  public static readonly TAG_WHITE_BALANCE_BLUE = CameraSettings.OFFSET + 31;
  public static readonly TAG_SATURATION = CameraSettings.OFFSET + 32;
  public static readonly TAG_CONTRAST = CameraSettings.OFFSET + 33;
  public static readonly TAG_SHARPNESS = CameraSettings.OFFSET + 34;
  public static readonly TAG_SUBJECT_PROGRAM = CameraSettings.OFFSET + 35;
  public static readonly TAG_FLASH_COMPENSATION = CameraSettings.OFFSET + 36;
  public static readonly TAG_ISO_SETTING = CameraSettings.OFFSET + 37;
  public static readonly TAG_CAMERA_MODEL = CameraSettings.OFFSET + 38;
  public static readonly TAG_INTERVAL_MODE = CameraSettings.OFFSET + 39;
  public static readonly TAG_FOLDER_NAME = CameraSettings.OFFSET + 40;
  public static readonly TAG_COLOR_MODE = CameraSettings.OFFSET + 41;
  public static readonly TAG_COLOR_FILTER = CameraSettings.OFFSET + 42;
  public static readonly TAG_BLACK_AND_WHITE_FILTER = CameraSettings.OFFSET + 43;
  public static readonly TAG_INTERNAL_FLASH = CameraSettings.OFFSET + 44;
  public static readonly TAG_APEX_BRIGHTNESS_VALUE = CameraSettings.OFFSET + 45;
  public static readonly TAG_SPOT_FOCUS_POINT_X_COORDINATE = CameraSettings.OFFSET + 46;
  public static readonly TAG_SPOT_FOCUS_POINT_Y_COORDINATE = CameraSettings.OFFSET + 47;
  public static readonly TAG_WIDE_FOCUS_ZONE = CameraSettings.OFFSET + 48;
  public static readonly TAG_FOCUS_MODE = CameraSettings.OFFSET + 49;
  public static readonly TAG_FOCUS_AREA = CameraSettings.OFFSET + 50;
  public static readonly TAG_DEC_SWITCH_POSITION = CameraSettings.OFFSET + 51;
}

class OlympusMakernoteDirectory extends Directory {
  /** Used by Konica / Minolta cameras. */
  public static readonly TAG_MAKERNOTE_VERSION = 0x0000;
  /** Used by Konica / Minolta cameras. */
  public static readonly TAG_CAMERA_SETTINGS_1 = 0x0001;
  /** Alternate Camera Settings Tag. Used by Konica / Minolta cameras. */
  public static readonly TAG_CAMERA_SETTINGS_2 = 0x0003;
  /** Used by Konica / Minolta cameras. */
  public static readonly TAG_COMPRESSED_IMAGE_SIZE = 0x0040;
  /** Used by Konica / Minolta cameras. */
  public static readonly TAG_MINOLTA_THUMBNAIL_OFFSET_1 = 0x0081;
  /** Alternate Thumbnail Offset. Used by Konica / Minolta cameras. */
  public static readonly TAG_MINOLTA_THUMBNAIL_OFFSET_2 = 0x0088;
  /** Length of thumbnail in bytes. Used by Konica / Minolta cameras. */
  public static readonly TAG_MINOLTA_THUMBNAIL_LENGTH = 0x0089;
  public static readonly TAG_THUMBNAIL_IMAGE = 0x0100;

  /**
       * Used by Konica / Minolta cameras
       * 0 = Natural Colour
       * 1 = Black &amp; White
       * 2 = Vivid colour
       * 3 = Solarization
       * 4 = AdobeRGB
       */
  public static readonly TAG_COLOUR_MODE = 0x0101;

  /**
       * Used by Konica / Minolta cameras.
       * 0 = Raw
       * 1 = Super Fine
       * 2 = Fine
       * 3 = Standard
       * 4 = Extra Fine
       */
  public static readonly TAG_IMAGE_QUALITY_1 = 0x0102;

  /**
       * Not 100% sure about this tag.
       * <p>
       * Used by Konica / Minolta cameras.
       * 0 = Raw
       * 1 = Super Fine
       * 2 = Fine
       * 3 = Standard
       * 4 = Extra Fine
       */
  public static readonly TAG_IMAGE_QUALITY_2 = 0x0103;
  public static readonly TAG_BODY_FIRMWARE_VERSION = 0x0104;

  /**
       * Three values:
       * Value 1: 0=Normal, 2=Fast, 3=Panorama
       * Value 2: Sequence Number Value 3:
       * 1 = Panorama Direction: Left to Right
       * 2 = Panorama Direction: Right to Left
       * 3 = Panorama Direction: Bottom to Top
       * 4 = Panorama Direction: Top to Bottom
       */
  public static readonly TAG_SPECIAL_MODE = 0x0200;

  /**
       * 1 = Standard Quality
       * 2 = High Quality
       * 3 = Super High Quality
       */
  public static readonly TAG_JPEG_QUALITY = 0x0201;

  /**
       * 0 = Normal (Not Macro)
       * 1 = Macro
       */
  public static readonly TAG_MACRO_MODE = 0x0202;

  /**
       * 0 = Off, 1 = On
       */
  public static readonly TAG_BW_MODE = 0x0203;

  /** Zoom Factor (0 or 1 = normal) */
  public static readonly TAG_DIGITAL_ZOOM = 0x0204;
  public static readonly TAG_FOCAL_PLANE_DIAGONAL = 0x0205;
  public static readonly TAG_LENS_DISTORTION_PARAMETERS = 0x0206;
  public static readonly TAG_CAMERA_TYPE = 0x0207;
  public static readonly TAG_PICT_INFO = 0x0208;
  public static readonly TAG_CAMERA_ID = 0x0209;

  /**
       * Used by Epson cameras
       * Units = pixels
       */
  public static readonly TAG_IMAGE_WIDTH = 0x020B;

  /**
       * Used by Epson cameras
       * Units = pixels
       */
  public static readonly TAG_IMAGE_HEIGHT = 0x020C;

  /** A string. Used by Epson cameras. */
  public static readonly TAG_ORIGINAL_MANUFACTURER_MODEL = 0x020D;
  public static readonly TAG_PREVIEW_IMAGE = 0x0280;
  public static readonly TAG_PRE_CAPTURE_FRAMES = 0x0300;
  public static readonly TAG_WHITE_BOARD = 0x0301;
  public static readonly TAG_ONE_TOUCH_WB = 0x0302;
  public static readonly TAG_WHITE_BALANCE_BRACKET = 0x0303;
  public static readonly TAG_WHITE_BALANCE_BIAS = 0x0304;
  public static readonly TAG_SCENE_MODE = 0x0403;
  public static readonly TAG_SERIAL_NUMBER_1 = 0x0404;
  public static readonly TAG_FIRMWARE = 0x0405;

  /**
       * See the PIM specification here:
       * http://www.ozhiker.com/electronics/pjmt/jpeg_info/pim.html
       */
  public static readonly TAG_PRINT_IMAGE_MATCHING_INFO = 0x0E00;
  public static readonly TAG_DATA_DUMP_1 = 0x0F00;
  public static readonly TAG_DATA_DUMP_2 = 0x0F01;
  public static readonly TAG_SHUTTER_SPEED_VALUE = 0x1000;
  public static readonly TAG_ISO_VALUE = 0x1001;
  public static readonly TAG_APERTURE_VALUE = 0x1002;
  public static readonly TAG_BRIGHTNESS_VALUE = 0x1003;
  public static readonly TAG_FLASH_MODE = 0x1004;
  public static readonly TAG_FLASH_DEVICE = 0x1005;
  public static readonly TAG_BRACKET = 0x1006;
  public static readonly TAG_SENSOR_TEMPERATURE = 0x1007;
  public static readonly TAG_LENS_TEMPERATURE = 0x1008;
  public static readonly TAG_LIGHT_CONDITION = 0x1009;
  public static readonly TAG_FOCUS_RANGE = 0x100A;
  public static readonly TAG_FOCUS_MODE = 0x100B;
  public static readonly TAG_FOCUS_DISTANCE = 0x100C;
  public static readonly TAG_ZOOM = 0x100D;
  public static readonly TAG_MACRO_FOCUS = 0x100E;
  public static readonly TAG_SHARPNESS = 0x100F;
  public static readonly TAG_FLASH_CHARGE_LEVEL = 0x1010;
  public static readonly TAG_COLOUR_MATRIX = 0x1011;
  public static readonly TAG_BLACK_LEVEL = 0x1012;
  public static readonly TAG_COLOR_TEMPERATURE_BG = 0x1013;
  public static readonly TAG_COLOR_TEMPERATURE_RG = 0x1014;
  public static readonly TAG_WB_MODE = 0x1015;
  //    public static readonly TAG_ = 0x1016;
  public static readonly TAG_RED_BALANCE = 0x1017;
  public static readonly TAG_BLUE_BALANCE = 0x1018;
  public static readonly TAG_COLOR_MATRIX_NUMBER = 0x1019;
  public static readonly TAG_SERIAL_NUMBER_2 = 0x101A;
  public static readonly TAG_EXTERNAL_FLASH_AE1_0 = 0x101B;
  public static readonly TAG_EXTERNAL_FLASH_AE2_0 = 0x101C;
  public static readonly TAG_INTERNAL_FLASH_AE1_0 = 0x101D;
  public static readonly TAG_INTERNAL_FLASH_AE2_0 = 0x101E;
  public static readonly TAG_EXTERNAL_FLASH_AE1 = 0x101F;
  public static readonly TAG_EXTERNAL_FLASH_AE2 = 0x1020;
  public static readonly TAG_INTERNAL_FLASH_AE1 = 0x1021;
  public static readonly TAG_INTERNAL_FLASH_AE2 = 0x1022;
  public static readonly TAG_FLASH_BIAS = 0x1023;
  public static readonly TAG_INTERNAL_FLASH_TABLE = 0x1024;
  public static readonly TAG_EXTERNAL_FLASH_G_VALUE = 0x1025;
  public static readonly TAG_EXTERNAL_FLASH_BOUNCE = 0x1026;
  public static readonly TAG_EXTERNAL_FLASH_ZOOM = 0x1027;
  public static readonly TAG_EXTERNAL_FLASH_MODE = 0x1028;
  public static readonly TAG_CONTRAST = 0x1029;
  public static readonly TAG_SHARPNESS_FACTOR = 0x102A;
  public static readonly TAG_COLOUR_CONTROL = 0x102B;
  public static readonly TAG_VALID_BITS = 0x102C;
  public static readonly TAG_CORING_FILTER = 0x102D;
  public static readonly TAG_OLYMPUS_IMAGE_WIDTH = 0x102E;
  public static readonly TAG_OLYMPUS_IMAGE_HEIGHT = 0x102F;
  public static readonly TAG_SCENE_DETECT = 0x1030;
  public static readonly TAG_SCENE_AREA = 0x1031;
  //    public static readonly TAG_ = 0x1032;
  public static readonly TAG_SCENE_DETECT_DATA = 0x1033;
  public static readonly TAG_COMPRESSION_RATIO = 0x1034;
  public static readonly TAG_PREVIEW_IMAGE_VALID = 0x1035;
  public static readonly TAG_PREVIEW_IMAGE_START = 0x1036;
  public static readonly TAG_PREVIEW_IMAGE_LENGTH = 0x1037;
  public static readonly TAG_AF_RESULT = 0x1038;
  public static readonly TAG_CCD_SCAN_MODE = 0x1039;
  public static readonly TAG_NOISE_REDUCTION = 0x103A;
  public static readonly TAG_INFINITY_LENS_STEP = 0x103B;
  public static readonly TAG_NEAR_LENS_STEP = 0x103C;
  public static readonly TAG_LIGHT_VALUE_CENTER = 0x103D;
  public static readonly TAG_LIGHT_VALUE_PERIPHERY = 0x103E;
  public static readonly TAG_FIELD_COUNT = 0x103F;
  public static readonly TAG_EQUIPMENT = 0x2010;
  public static readonly TAG_CAMERA_SETTINGS = 0x2020;
  public static readonly TAG_RAW_DEVELOPMENT = 0x2030;
  public static readonly TAG_RAW_DEVELOPMENT_2 = 0x2031;
  public static readonly TAG_IMAGE_PROCESSING = 0x2040;
  public static readonly TAG_FOCUS_INFO = 0x2050;
  public static readonly TAG_RAW_INFO = 0x3000;
  public static readonly TAG_MAIN_INFO = 0x4000;

  private static readonly _tagNameMap: Map<number, string> = new Map<number, string>([
    [OlympusMakernoteDirectory.TAG_MAKERNOTE_VERSION, "Makernote Version"],
    [OlympusMakernoteDirectory.TAG_CAMERA_SETTINGS_1, "Camera Settings"],
    [OlympusMakernoteDirectory.TAG_CAMERA_SETTINGS_2, "Camera Settings"],
    [OlympusMakernoteDirectory.TAG_COMPRESSED_IMAGE_SIZE, "Compressed Image Size"],
    [OlympusMakernoteDirectory.TAG_MINOLTA_THUMBNAIL_OFFSET_1, "Thumbnail Offset"],
    [OlympusMakernoteDirectory.TAG_MINOLTA_THUMBNAIL_OFFSET_2, "Thumbnail Offset"],
    [OlympusMakernoteDirectory.TAG_MINOLTA_THUMBNAIL_LENGTH, "Thumbnail Length"],
    [OlympusMakernoteDirectory.TAG_THUMBNAIL_IMAGE, "Thumbnail Image"],
    [OlympusMakernoteDirectory.TAG_COLOUR_MODE, "Colour Mode"],
    [OlympusMakernoteDirectory.TAG_IMAGE_QUALITY_1, "Image Quality"],
    [OlympusMakernoteDirectory.TAG_IMAGE_QUALITY_2, "Image Quality"],
    [OlympusMakernoteDirectory.TAG_BODY_FIRMWARE_VERSION, "Body Firmware Version"],
    [OlympusMakernoteDirectory.TAG_SPECIAL_MODE, "Special Mode"],
    [OlympusMakernoteDirectory.TAG_JPEG_QUALITY, "JPEG Quality"],
    [OlympusMakernoteDirectory.TAG_MACRO_MODE, "Macro"],
    [OlympusMakernoteDirectory.TAG_BW_MODE, "BW Mode"],
    [OlympusMakernoteDirectory.TAG_DIGITAL_ZOOM, "Digital Zoom"],
    [OlympusMakernoteDirectory.TAG_FOCAL_PLANE_DIAGONAL, "Focal Plane Diagonal"],
    [OlympusMakernoteDirectory.TAG_LENS_DISTORTION_PARAMETERS, "Lens Distortion Parameters"],
    [OlympusMakernoteDirectory.TAG_CAMERA_TYPE, "Camera Type"],
    [OlympusMakernoteDirectory.TAG_PICT_INFO, "Pict Info"],
    [OlympusMakernoteDirectory.TAG_CAMERA_ID, "Camera Id"],
    [OlympusMakernoteDirectory.TAG_IMAGE_WIDTH, "Image Width"],
    [OlympusMakernoteDirectory.TAG_IMAGE_HEIGHT, "Image Height"],
    [OlympusMakernoteDirectory.TAG_ORIGINAL_MANUFACTURER_MODEL, "Original Manufacturer Model"],
    [OlympusMakernoteDirectory.TAG_PREVIEW_IMAGE, "Preview Image"],
    [OlympusMakernoteDirectory.TAG_PRE_CAPTURE_FRAMES, "Pre Capture Frames"],
    [OlympusMakernoteDirectory.TAG_WHITE_BOARD, "White Board"],
    [OlympusMakernoteDirectory.TAG_ONE_TOUCH_WB, "One Touch WB"],
    [OlympusMakernoteDirectory.TAG_WHITE_BALANCE_BRACKET, "White Balance Bracket"],
    [OlympusMakernoteDirectory.TAG_WHITE_BALANCE_BIAS, "White Balance Bias"],
    [OlympusMakernoteDirectory.TAG_SCENE_MODE, "Scene Mode"],
    [OlympusMakernoteDirectory.TAG_SERIAL_NUMBER_1, "Serial Number"],
    [OlympusMakernoteDirectory.TAG_FIRMWARE, "Firmware"],
    [OlympusMakernoteDirectory.TAG_PRINT_IMAGE_MATCHING_INFO, "Print Image Matching (PIM) Info"],
    [OlympusMakernoteDirectory.TAG_DATA_DUMP_1, "Data Dump"],
    [OlympusMakernoteDirectory.TAG_DATA_DUMP_2, "Data Dump 2"],
    [OlympusMakernoteDirectory.TAG_SHUTTER_SPEED_VALUE, "Shutter Speed Value"],
    [OlympusMakernoteDirectory.TAG_ISO_VALUE, "ISO Value"],
    [OlympusMakernoteDirectory.TAG_APERTURE_VALUE, "Aperture Value"],
    [OlympusMakernoteDirectory.TAG_BRIGHTNESS_VALUE, "Brightness Value"],
    [OlympusMakernoteDirectory.TAG_FLASH_MODE, "Flash Mode"],
    [OlympusMakernoteDirectory.TAG_FLASH_DEVICE, "Flash Device"],
    [OlympusMakernoteDirectory.TAG_BRACKET, "Bracket"],
    [OlympusMakernoteDirectory.TAG_SENSOR_TEMPERATURE, "Sensor Temperature"],
    [OlympusMakernoteDirectory.TAG_LENS_TEMPERATURE, "Lens Temperature"],
    [OlympusMakernoteDirectory.TAG_LIGHT_CONDITION, "Light Condition"],
    [OlympusMakernoteDirectory.TAG_FOCUS_RANGE, "Focus Range"],
    [OlympusMakernoteDirectory.TAG_FOCUS_MODE, "Focus Mode"],
    [OlympusMakernoteDirectory.TAG_FOCUS_DISTANCE, "Focus Distance"],
    [OlympusMakernoteDirectory.TAG_ZOOM, "Zoom"],
    [OlympusMakernoteDirectory.TAG_MACRO_FOCUS, "Macro Focus"],
    [OlympusMakernoteDirectory.TAG_SHARPNESS, "Sharpness"],
    [OlympusMakernoteDirectory.TAG_FLASH_CHARGE_LEVEL, "Flash Charge Level"],
    [OlympusMakernoteDirectory.TAG_COLOUR_MATRIX, "Colour Matrix"],
    [OlympusMakernoteDirectory.TAG_BLACK_LEVEL, "Black Level"],
    [OlympusMakernoteDirectory.TAG_COLOR_TEMPERATURE_BG, "Color Temperature BG"],
    [OlympusMakernoteDirectory.TAG_COLOR_TEMPERATURE_RG, "Color Temperature RG"],
    [OlympusMakernoteDirectory.TAG_WB_MODE, "White Balance Mode"],
    [OlympusMakernoteDirectory.TAG_RED_BALANCE, "Red Balance"],
    [OlympusMakernoteDirectory.TAG_BLUE_BALANCE, "Blue Balance"],
    [OlympusMakernoteDirectory.TAG_COLOR_MATRIX_NUMBER, "Color Matrix Number"],
    [OlympusMakernoteDirectory.TAG_SERIAL_NUMBER_2, "Serial Number"],
    [OlympusMakernoteDirectory.TAG_EXTERNAL_FLASH_AE1_0, "External Flash AE1 0"],
    [OlympusMakernoteDirectory.TAG_EXTERNAL_FLASH_AE2_0, "External Flash AE2 0"],
    [OlympusMakernoteDirectory.TAG_INTERNAL_FLASH_AE1_0, "Internal Flash AE1 0"],
    [OlympusMakernoteDirectory.TAG_INTERNAL_FLASH_AE2_0, "Internal Flash AE2 0"],
    [OlympusMakernoteDirectory.TAG_EXTERNAL_FLASH_AE1, "External Flash AE1"],
    [OlympusMakernoteDirectory.TAG_EXTERNAL_FLASH_AE2, "External Flash AE2"],
    [OlympusMakernoteDirectory.TAG_INTERNAL_FLASH_AE1, "Internal Flash AE1"],
    [OlympusMakernoteDirectory.TAG_INTERNAL_FLASH_AE2, "Internal Flash AE2"],
    [OlympusMakernoteDirectory.TAG_FLASH_BIAS, "Flash Bias"],
    [OlympusMakernoteDirectory.TAG_INTERNAL_FLASH_TABLE, "Internal Flash Table"],
    [OlympusMakernoteDirectory.TAG_EXTERNAL_FLASH_G_VALUE, "External Flash G Value"],
    [OlympusMakernoteDirectory.TAG_EXTERNAL_FLASH_BOUNCE, "External Flash Bounce"],
    [OlympusMakernoteDirectory.TAG_EXTERNAL_FLASH_ZOOM, "External Flash Zoom"],
    [OlympusMakernoteDirectory.TAG_EXTERNAL_FLASH_MODE, "External Flash Mode"],
    [OlympusMakernoteDirectory.TAG_CONTRAST, "Contrast"],
    [OlympusMakernoteDirectory.TAG_SHARPNESS_FACTOR, "Sharpness Factor"],
    [OlympusMakernoteDirectory.TAG_COLOUR_CONTROL, "Colour Control"],
    [OlympusMakernoteDirectory.TAG_VALID_BITS, "Valid Bits"],
    [OlympusMakernoteDirectory.TAG_CORING_FILTER, "Coring Filter"],
    [OlympusMakernoteDirectory.TAG_OLYMPUS_IMAGE_WIDTH, "Olympus Image Width"],
    [OlympusMakernoteDirectory.TAG_OLYMPUS_IMAGE_HEIGHT, "Olympus Image Height"],
    [OlympusMakernoteDirectory.TAG_SCENE_DETECT, "Scene Detect"],
    [OlympusMakernoteDirectory.TAG_SCENE_AREA, "Scene Area"],
    [OlympusMakernoteDirectory.TAG_SCENE_DETECT_DATA, "Scene Detect Data"],
    [OlympusMakernoteDirectory.TAG_COMPRESSION_RATIO, "Compression Ratio"],
    [OlympusMakernoteDirectory.TAG_PREVIEW_IMAGE_VALID, "Preview Image Valid"],
    [OlympusMakernoteDirectory.TAG_PREVIEW_IMAGE_START, "Preview Image Start"],
    [OlympusMakernoteDirectory.TAG_PREVIEW_IMAGE_LENGTH, "Preview Image Length"],
    [OlympusMakernoteDirectory.TAG_AF_RESULT, "AF Result"],
    [OlympusMakernoteDirectory.TAG_CCD_SCAN_MODE, "CCD Scan Mode"],
    [OlympusMakernoteDirectory.TAG_NOISE_REDUCTION, "Noise Reduction"],
    [OlympusMakernoteDirectory.TAG_INFINITY_LENS_STEP, "Infinity Lens Step"],
    [OlympusMakernoteDirectory.TAG_NEAR_LENS_STEP, "Near Lens Step"],
    [OlympusMakernoteDirectory.TAG_LIGHT_VALUE_CENTER, "Light Value Center"],
    [OlympusMakernoteDirectory.TAG_LIGHT_VALUE_PERIPHERY, "Light Value Periphery"],
    [OlympusMakernoteDirectory.TAG_FIELD_COUNT, "Field Count"],
    [OlympusMakernoteDirectory.TAG_EQUIPMENT, "Equipment"],
    [OlympusMakernoteDirectory.TAG_CAMERA_SETTINGS, "Camera Settings"],
    [OlympusMakernoteDirectory.TAG_RAW_DEVELOPMENT, "Raw Development"],
    [OlympusMakernoteDirectory.TAG_RAW_DEVELOPMENT_2, "Raw Development 2"],
    [OlympusMakernoteDirectory.TAG_IMAGE_PROCESSING, "Image Processing"],
    [OlympusMakernoteDirectory.TAG_FOCUS_INFO, "Focus Info"],
    [OlympusMakernoteDirectory.TAG_RAW_INFO, "Raw Info"],
    [OlympusMakernoteDirectory.TAG_MAIN_INFO, "Main Info"],

    [CameraSettings.TAG_EXPOSURE_MODE, "Exposure Mode"],
    [CameraSettings.TAG_FLASH_MODE, "Flash Mode"],
    [CameraSettings.TAG_WHITE_BALANCE, "White Balance"],
    [CameraSettings.TAG_IMAGE_SIZE, "Image Size"],
    [CameraSettings.TAG_IMAGE_QUALITY, "Image Quality"],
    [CameraSettings.TAG_SHOOTING_MODE, "Shooting Mode"],
    [CameraSettings.TAG_METERING_MODE, "Metering Mode"],
    [CameraSettings.TAG_APEX_FILM_SPEED_VALUE, "Apex Film Speed Value"],
    [CameraSettings.TAG_APEX_SHUTTER_SPEED_TIME_VALUE, "Apex Shutter Speed Time Value"],
    [CameraSettings.TAG_APEX_APERTURE_VALUE, "Apex Aperture Value"],
    [CameraSettings.TAG_MACRO_MODE, "Macro Mode"],
    [CameraSettings.TAG_DIGITAL_ZOOM, "Digital Zoom"],
    [CameraSettings.TAG_EXPOSURE_COMPENSATION, "Exposure Compensation"],
    [CameraSettings.TAG_BRACKET_STEP, "Bracket Step"],

    [CameraSettings.TAG_INTERVAL_LENGTH, "Interval Length"],
    [CameraSettings.TAG_INTERVAL_NUMBER, "Interval Number"],
    [CameraSettings.TAG_FOCAL_LENGTH, "Focal Length"],
    [CameraSettings.TAG_FOCUS_DISTANCE, "Focus Distance"],
    [CameraSettings.TAG_FLASH_FIRED, "Flash Fired"],
    [CameraSettings.TAG_DATE, "Date"],
    [CameraSettings.TAG_TIME, "Time"],
    [CameraSettings.TAG_MAX_APERTURE_AT_FOCAL_LENGTH, "Max Aperture at Focal Length"],

    [CameraSettings.TAG_FILE_NUMBER_MEMORY, "File Number Memory"],
    [CameraSettings.TAG_LAST_FILE_NUMBER, "Last File Number"],
    [CameraSettings.TAG_WHITE_BALANCE_RED, "White Balance Red"],
    [CameraSettings.TAG_WHITE_BALANCE_GREEN, "White Balance Green"],
    [CameraSettings.TAG_WHITE_BALANCE_BLUE, "White Balance Blue"],
    [CameraSettings.TAG_SATURATION, "Saturation"],
    [CameraSettings.TAG_CONTRAST, "Contrast"],
    [CameraSettings.TAG_SHARPNESS, "Sharpness"],
    [CameraSettings.TAG_SUBJECT_PROGRAM, "Subject Program"],
    [CameraSettings.TAG_FLASH_COMPENSATION, "Flash Compensation"],
    [CameraSettings.TAG_ISO_SETTING, "ISO Setting"],
    [CameraSettings.TAG_CAMERA_MODEL, "Camera Model"],
    [CameraSettings.TAG_INTERVAL_MODE, "Interval Mode"],
    [CameraSettings.TAG_FOLDER_NAME, "Folder Name"],
    [CameraSettings.TAG_COLOR_MODE, "Color Mode"],
    [CameraSettings.TAG_COLOR_FILTER, "Color Filter"],
    [CameraSettings.TAG_BLACK_AND_WHITE_FILTER, "Black and White Filter"],
    [CameraSettings.TAG_INTERNAL_FLASH, "Internal Flash"],
    [CameraSettings.TAG_APEX_BRIGHTNESS_VALUE, "Apex Brightness Value"],
    [CameraSettings.TAG_SPOT_FOCUS_POINT_X_COORDINATE, "Spot Focus Point X Coordinate"],
    [CameraSettings.TAG_SPOT_FOCUS_POINT_Y_COORDINATE, "Spot Focus Point Y Coordinate"],
    [CameraSettings.TAG_WIDE_FOCUS_ZONE, "Wide Focus Zone"],
    [CameraSettings.TAG_FOCUS_MODE, "Focus Mode"],
    [CameraSettings.TAG_FOCUS_AREA, "Focus Area"],
    [CameraSettings.TAG_DEC_SWITCH_POSITION, "DEC Switch Position"],
  ]);

  constructor() {
    super();
    this.setDescriptor(new OlympusMakernoteDescriptor(this));
  }

  public getName(): string
  {
    return "Olympus Makernote";
  }

  public setByteArray(tagType: number, bytes: Int8Array) {
    if (tagType == OlympusMakernoteDirectory.TAG_CAMERA_SETTINGS_1 || tagType == OlympusMakernoteDirectory.TAG_CAMERA_SETTINGS_2) {
      this.processCameraSettings(bytes);
    } else {
      super.setByteArray(tagType, bytes);
    }
  }

  private processCameraSettings(bytes: Int8Array) {
    let reader = new SequentialByteArrayReader(bytes);
    reader.setMotorolaByteOrder(true);

    let count = bytes.length / 4;

    try {
      for (let i = 0; i < count; i++) {
        let value = reader.getInt32();
        this.setInt(CameraSettings.OFFSET + i, value);
      }
    } catch (e) {
      // Should never happen, given that we check the length of the bytes beforehand.
    }
  }

  public isIntervalMode(): boolean
  {
    let value = this.getLongObject(CameraSettings.TAG_SHOOTING_MODE);
    return value != null && value == 5;
  }

  protected getTagNameMap(): Map<number, string>
  {
    return OlympusMakernoteDirectory._tagNameMap;
  }

  /**
       * These values are currently decoded only for Olympus models.  Models with
       * Olympus-style maker notes from other brands such as Acer, BenQ, Hitachi, HP,
       * Premier, Konica-Minolta, Maginon, Ricoh, Rollei, SeaLife, Sony, Supra,
       * Vivitar are not listed.
       *
       *
       * Converted from Exiftool version 10.33 created by Phil Harvey
       * http://www.sno.phy.queensu.ca/~phil/exiftool/
       * lib\Image\ExifTool\Olympus.pm
       */
  static readonly OlympusCameraTypes: Map<string, string>  = new Map<string, string>([
    ["D4028", "X-2,C-50Z"],
    ["D4029", "E-20,E-20N,E-20P"],
    ["D4034", "C720UZ"],
    ["D4040", "E-1"],
    ["D4041", "E-300"],
    ["D4083", "C2Z,D520Z,C220Z"],
    ["D4106", "u20D,S400D,u400D"],
    ["D4120", "X-1"],
    ["D4122", "u10D,S300D,u300D"],
    ["D4125", "AZ-1"],
    ["D4141", "C150,D390"],
    ["D4193", "C-5000Z"],
    ["D4194", "X-3,C-60Z"],
    ["D4199", "u30D,S410D,u410D"],
    ["D4205", "X450,D535Z,C370Z"],
    ["D4210", "C160,D395"],
    ["D4211", "C725UZ"],
    ["D4213", "FerrariMODEL2003"],
    ["D4216", "u15D"],
    ["D4217", "u25D"],
    ["D4220", "u-miniD,Stylus V"],
    ["D4221", "u40D,S500,uD500"],
    ["D4231", "FerrariMODEL2004"],
    ["D4240", "X500,D590Z,C470Z"],
    ["D4244", "uD800,S800"],
    ["D4256", "u720SW,S720SW"],
    ["D4261", "X600,D630,FE5500"],
    ["D4262", "uD600,S600"],
    ["D4301", "u810/S810"], // (yes, "/".  Olympus is not consistent in the notation)
    ["D4302", "u710,S710"],
    ["D4303", "u700,S700"],
    ["D4304", "FE100,X710"],
    ["D4305", "FE110,X705"],
    ["D4310", "FE-130,X-720"],
    ["D4311", "FE-140,X-725"],
    ["D4312", "FE150,X730"],
    ["D4313", "FE160,X735"],
    ["D4314", "u740,S740"],
    ["D4315", "u750,S750"],
    ["D4316", "u730/S730"],
    ["D4317", "FE115,X715"],
    ["D4321", "SP550UZ"],
    ["D4322", "SP510UZ"],
    ["D4324", "FE170,X760"],
    ["D4326", "FE200"],
    ["D4327", "FE190/X750"], // (also SX876)
    ["D4328", "u760,S760"],
    ["D4330", "FE180/X745"], // (also SX875)
    ["D4331", "u1000/S1000"],
    ["D4332", "u770SW,S770SW"],
    ["D4333", "FE240/X795"],
    ["D4334", "FE210,X775"],
    ["D4336", "FE230/X790"],
    ["D4337", "FE220,X785"],
    ["D4338", "u725SW,S725SW"],
    ["D4339", "FE250/X800"],
    ["D4341", "u780,S780"],
    ["D4343", "u790SW,S790SW"],
    ["D4344", "u1020,S1020"],
    ["D4346", "FE15,X10"],
    ["D4348", "FE280,X820,C520"],
    ["D4349", "FE300,X830"],
    ["D4350", "u820,S820"],
    ["D4351", "u1200,S1200"],
    ["D4352", "FE270,X815,C510"],
    ["D4353", "u795SW,S795SW"],
    ["D4354", "u1030SW,S1030SW"],
    ["D4355", "SP560UZ"],
    ["D4356", "u1010,S1010"],
    ["D4357", "u830,S830"],
    ["D4359", "u840,S840"],
    ["D4360", "FE350WIDE,X865"],
    ["D4361", "u850SW,S850SW"],
    ["D4362", "FE340,X855,C560"],
    ["D4363", "FE320,X835,C540"],
    ["D4364", "SP570UZ"],
    ["D4366", "FE330,X845,C550"],
    ["D4368", "FE310,X840,C530"],
    ["D4370", "u1050SW,S1050SW"],
    ["D4371", "u1060,S1060"],
    ["D4372", "FE370,X880,C575"],
    ["D4374", "SP565UZ"],
    ["D4377", "u1040,S1040"],
    ["D4378", "FE360,X875,C570"],
    ["D4379", "FE20,X15,C25"],
    ["D4380", "uT6000,ST6000"],
    ["D4381", "uT8000,ST8000"],
    ["D4382", "u9000,S9000"],
    ["D4384", "SP590UZ"],
    ["D4385", "FE3010,X895"],
    ["D4386", "FE3000,X890"],
    ["D4387", "FE35,X30"],
    ["D4388", "u550WP,S550WP"],
    ["D4390", "FE5000,X905"],
    ["D4391", "u5000"],
    ["D4392", "u7000,S7000"],
    ["D4396", "FE5010,X915"],
    ["D4397", "FE25,X20"],
    ["D4398", "FE45,X40"],
    ["D4401", "XZ-1"],
    ["D4402", "uT6010,ST6010"],
    ["D4406", "u7010,S7010 / u7020,S7020"],
    ["D4407", "FE4010,X930"],
    ["D4408", "X560WP"],
    ["D4409", "FE26,X21"],
    ["D4410", "FE4000,X920,X925"],
    ["D4411", "FE46,X41,X42"],
    ["D4412", "FE5020,X935"],
    ["D4413", "uTough-3000"],
    ["D4414", "StylusTough-6020"],
    ["D4415", "StylusTough-8010"],
    ["D4417", "u5010,S5010"],
    ["D4418", "u7040,S7040"],
    ["D4419", "u9010,S9010"],
    ["D4423", "FE4040"],
    ["D4424", "FE47,X43"],
    ["D4426", "FE4030,X950"],
    ["D4428", "FE5030,X965,X960"],
    ["D4430", "u7030,S7030"],
    ["D4432", "SP600UZ"],
    ["D4434", "SP800UZ"],
    ["D4439", "FE4020,X940"],
    ["D4442", "FE5035"],
    ["D4448", "FE4050,X970"],
    ["D4450", "FE5050,X985"],
    ["D4454", "u-7050"],
    ["D4464", "T10,X27"],
    ["D4470", "FE5040,X980"],
    ["D4472", "TG-310"],
    ["D4474", "TG-610"],
    ["D4476", "TG-810"],
    ["D4478", "VG145,VG140,D715"],
    ["D4479", "VG130,D710"],
    ["D4480", "VG120,D705"],
    ["D4482", "VR310,D720"],
    ["D4484", "VR320,D725"],
    ["D4486", "VR330,D730"],
    ["D4488", "VG110,D700"],
    ["D4490", "SP-610UZ"],
    ["D4492", "SZ-10"],
    ["D4494", "SZ-20"],
    ["D4496", "SZ-30MR"],
    ["D4498", "SP-810UZ"],
    ["D4500", "SZ-11"],
    ["D4504", "TG-615"],
    ["D4508", "TG-620"],
    ["D4510", "TG-820"],
    ["D4512", "TG-1"],
    ["D4516", "SH-21"],
    ["D4519", "SZ-14"],
    ["D4520", "SZ-31MR"],
    ["D4521", "SH-25MR"],
    ["D4523", "SP-720UZ"],
    ["D4529", "VG170"],
    ["D4531", "XZ-2"],
    ["D4535", "SP-620UZ"],
    ["D4536", "TG-320"],
    ["D4537", "VR340,D750"],
    ["D4538", "VG160,X990,D745"],
    ["D4541", "SZ-12"],
    ["D4545", "VH410"],
    ["D4546", "XZ-10"], //IB
    ["D4547", "TG-2"],
    ["D4548", "TG-830"],
    ["D4549", "TG-630"],
    ["D4550", "SH-50"],
    ["D4553", "SZ-16,DZ-105"],
    ["D4562", "SP-820UZ"],
    ["D4566", "SZ-15"],
    ["D4572", "STYLUS1"],
    ["D4574", "TG-3"],
    ["D4575", "TG-850"],
    ["D4579", "SP-100EE"],
    ["D4580", "SH-60"],
    ["D4581", "SH-1"],
    ["D4582", "TG-835"],
    ["D4585", "SH-2 / SH-3"],
    ["D4586", "TG-4"],
    ["D4587", "TG-860"],
    ["D4591", "TG-870"],
    ["D4593", "TG-5"],
    ["D4809", "C2500L"],
    ["D4842", "E-10"],
    ["D4856", "C-1"],
    ["D4857", "C-1Z,D-150Z"],
    ["DCHC", "D500L"],
    ["DCHT", "D600L / D620L"],
    ["K0055", "AIR-A01"],
    ["S0003", "E-330"],
    ["S0004", "E-500"],
    ["S0009", "E-400"],
    ["S0010", "E-510"],
    ["S0011", "E-3"],
    ["S0013", "E-410"],
    ["S0016", "E-420"],
    ["S0017", "E-30"],
    ["S0018", "E-520"],
    ["S0019", "E-P1"],
    ["S0023", "E-620"],
    ["S0026", "E-P2"],
    ["S0027", "E-PL1"],
    ["S0029", "E-450"],
    ["S0030", "E-600"],
    ["S0032", "E-P3"],
    ["S0033", "E-5"],
    ["S0034", "E-PL2"],
    ["S0036", "E-M5"],
    ["S0038", "E-PL3"],
    ["S0039", "E-PM1"],
    ["S0040", "E-PL1s"],
    ["S0042", "E-PL5"],
    ["S0043", "E-PM2"],
    ["S0044", "E-P5"],
    ["S0045", "E-PL6"],
    ["S0046", "E-PL7"], //IB
    ["S0047", "E-M1"],
    ["S0051", "E-M10"],
    ["S0052", "E-M5MarkII"], //IB
    ["S0059", "E-M10MarkII"],
    ["S0061", "PEN-F"], //forum7005
    ["S0065", "E-PL8"],
    ["S0067", "E-M1MarkII"],
    ["SR45", "D220"],
    ["SR55", "D320L"],
    ["SR83", "D340L"],
    ["SR85", "C830L,D340R"],
    ["SR852", "C860L,D360L"],
    ["SR872", "C900Z,D400Z"],
    ["SR874", "C960Z,D460Z"],
    ["SR951", "C2000Z"],
    ["SR952", "C21"],
    ["SR953", "C21T.commu"],
    ["SR954", "C2020Z"],
    ["SR955", "C990Z,D490Z"],
    ["SR956", "C211Z"],
    ["SR959", "C990ZS,D490Z"],
    ["SR95A", "C2100UZ"],
    ["SR971", "C100,D370"],
    ["SR973", "C2,D230"],
    ["SX151", "E100RS"],
    ["SX351", "C3000Z / C3030Z"],
    ["SX354", "C3040Z"],
    ["SX355", "C2040Z"],
    ["SX357", "C700UZ"],
    ["SX358", "C200Z,D510Z"],
    ["SX374", "C3100Z,C3020Z"],
    ["SX552", "C4040Z"],
    ["SX553", "C40Z,D40Z"],
    ["SX556", "C730UZ"],
    ["SX558", "C5050Z"],
    ["SX571", "C120,D380"],
    ["SX574", "C300Z,D550Z"],
    ["SX575", "C4100Z,C4000Z"],
    ["SX751", "X200,D560Z,C350Z"],
    ["SX752", "X300,D565Z,C450Z"],
    ["SX753", "C750UZ"],
    ["SX754", "C740UZ"],
    ["SX755", "C755UZ"],
    ["SX756", "C5060WZ"],
    ["SX757", "C8080WZ"],
    ["SX758", "X350,D575Z,C360Z"],
    ["SX759", "X400,D580Z,C460Z"],
    ["SX75A", "AZ-2ZOOM"],
    ["SX75B", "D595Z,C500Z"],
    ["SX75C", "X550,D545Z,C480Z"],
    ["SX75D", "IR-300"],
    ["SX75F", "C55Z,C5500Z"],
    ["SX75G", "C170,D425"],
    ["SX75J", "C180,D435"],
    ["SX771", "C760UZ"],
    ["SX772", "C770UZ"],
    ["SX773", "C745UZ"],
    ["SX774", "X250,D560Z,C350Z"],
    ["SX775", "X100,D540Z,C310Z"],
    ["SX776", "C460ZdelSol"],
    ["SX777", "C765UZ"],
    ["SX77A", "D555Z,C315Z"],
    ["SX851", "C7070WZ"],
    ["SX852", "C70Z,C7000Z"],
    ["SX853", "SP500UZ"],
    ["SX854", "SP310"],
    ["SX855", "SP350"],
    ["SX873", "SP320"],
    ["SX875", "FE180/X745"], // (also D4330)
    ["SX876", "FE190/X750"] // (also D4327)
  ]);
}

export default OlympusMakernoteDirectory
