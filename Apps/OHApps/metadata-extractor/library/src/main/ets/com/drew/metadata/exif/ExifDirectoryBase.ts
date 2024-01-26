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

import Directory from '../Directory'

abstract class ExifDirectoryBase extends Directory {
  public static readonly TAG_INTEROP_INDEX: number = 0x0001;
  public static readonly TAG_INTEROP_VERSION: number = 0x0002;

  /**
   * The new subfile type tag.
   * 0 = Full-resolution Image
   * 1 = Reduced-resolution image
   * 2 = Single page of multi-page image
   * 3 = Single page of multi-page reduced-resolution image
   * 4 = Transparency mask
   * 5 = Transparency mask of reduced-resolution image
   * 6 = Transparency mask of multi-page image
   * 7 = Transparency mask of reduced-resolution multi-page image
   */
  public static readonly TAG_NEW_SUBFILE_TYPE: number = 0x00FE;
  /**
   * The old subfile type tag.
   * 1 = Full-resolution image (Main image)
   * 2 = Reduced-resolution image (Thumbnail)
   * 3 = Single page of multi-page image
   */
  public static readonly TAG_SUBFILE_TYPE: number = 0x00FF;
  public static readonly TAG_IMAGE_WIDTH: number = 0x0100;
  public static readonly TAG_IMAGE_HEIGHT: number = 0x0101;

  /**
   * When image format is no compression, this value shows the number of bits
   * per component for each pixel. Usually this value is '8,8,8'.
   */
  public static readonly TAG_BITS_PER_SAMPLE: number = 0x0102;
  public static readonly TAG_COMPRESSION: number = 0x0103;

  /**
   * Shows the color space of the image data components.
   * 0 = WhiteIsZero
   * 1 = BlackIsZero
   * 2 = RGB
   * 3 = RGB Palette
   * 4 = Transparency Mask
   * 5 = CMYK
   * 6 = YCbCr
   * 8 = CIELab
   * 9 = ICCLab
   * 10 = ITULab
   * 32803 = Color Filter Array
   * 32844 = Pixar LogL
   * 32845 = Pixar LogLuv
   * 34892 = Linear Raw
   */
  public static readonly TAG_PHOTOMETRIC_INTERPRETATION: number = 0x0106;

  /**
   * 1 = No dithering or halftoning
   * 2 = Ordered dither or halftone
   * 3 = Randomized dither
   */
  public static readonly TAG_THRESHOLDING: number = 0x0107;

  /**
   * 1 = Normal
   * 2 = Reversed
   */
  public static readonly TAG_FILL_ORDER: number = 0x010A;
  public static readonly TAG_DOCUMENT_NAME: number = 0x010D;
  public static readonly TAG_IMAGE_DESCRIPTION: number = 0x010E;
  public static readonly TAG_MAKE: number = 0x010F;
  public static readonly TAG_MODEL: number = 0x0110;
  /** The position in the file of raster data. */
  public static readonly TAG_STRIP_OFFSETS: number = 0x0111;
  public static readonly TAG_ORIENTATION: number = 0x0112;
  /** Each pixel is composed of this many samples. */
  public static readonly TAG_SAMPLES_PER_PIXEL: number = 0x0115;
  /** The raster is codified by a single block of data holding this many rows. */
  public static readonly TAG_ROWS_PER_STRIP: number = 0x0116;
  /** The size of the raster data in bytes. */
  public static readonly TAG_STRIP_BYTE_COUNTS: number = 0x0117;
  public static readonly TAG_MIN_SAMPLE_VALUE: number = 0x0118;
  public static readonly TAG_MAX_SAMPLE_VALUE: number = 0x0119;
  public static readonly TAG_X_RESOLUTION: number = 0x011A;
  public static readonly TAG_Y_RESOLUTION: number = 0x011B;
  /**
   * When image format is no compression YCbCr, this value shows byte aligns of
   * YCbCr data. If value is '1', Y/Cb/Cr value is chunky format, contiguous for
   * each subsampling pixel. If value is '2', Y/Cb/Cr value is separated and
   * stored to Y plane/Cb plane/Cr plane format.
   */
  public static readonly TAG_PLANAR_CONFIGURATION: number = 0x011C;
  public static readonly TAG_PAGE_NAME: number = 0x011D;
  public static readonly TAG_RESOLUTION_UNIT: number = 0x0128;
  public static readonly TAG_PAGE_NUMBER: number = 0x0129;
  public static readonly TAG_TRANSFER_FUNCTION: number = 0x012D;
  public static readonly TAG_SOFTWARE: number = 0x0131;
  public static readonly TAG_DATETIME: number = 0x0132;
  public static readonly TAG_ARTIST: number = 0x013B;
  public static readonly TAG_HOST_COMPUTER: number = 0x013C;
  public static readonly TAG_PREDICTOR: number = 0x013D;
  public static readonly TAG_WHITE_POINT: number = 0x013E;
  public static readonly TAG_PRIMARY_CHROMATICITIES: number = 0x013F;
  public static readonly TAG_TILE_WIDTH: number = 0x0142;
  public static readonly TAG_TILE_LENGTH: number = 0x0143;
  public static readonly TAG_TILE_OFFSETS: number = 0x0144;
  public static readonly TAG_TILE_BYTE_COUNTS: number = 0x0145;

  /**
   * Tag is a pointer to one or more sub-IFDs.
   + Seems to be used exclusively by raw formats, referencing one or two IFDs.
   */
  public static readonly TAG_SUB_IFD_OFFSET: number = 0x014a;
  public static readonly TAG_EXTRA_SAMPLES: number = 0x0152;
  public static readonly TAG_SAMPLE_FORMAT: number = 0x0153;
  public static readonly TAG_TRANSFER_RANGE: number = 0x0156;
  public static readonly TAG_JPEG_TABLES: number = 0x015B;
  public static readonly TAG_JPEG_PROC: number = 0x0200;

  // 0x0201 can have all kinds of descriptions for thumbnail starting index
  // 0x0202 can have all kinds of descriptions for thumbnail length
  public static readonly TAG_JPEG_RESTART_INTERVAL: number = 0x0203;
  public static readonly TAG_JPEG_LOSSLESS_PREDICTORS: number = 0x0205;
  public static readonly TAG_JPEG_POINT_TRANSFORMS: number = 0x0206;
  public static readonly TAG_JPEG_Q_TABLES: number = 0x0207;
  public static readonly TAG_JPEG_DC_TABLES: number = 0x0208;
  public static readonly TAG_JPEG_AC_TABLES: number = 0x0209;
  public static readonly TAG_YCBCR_COEFFICIENTS: number = 0x0211;
  public static readonly TAG_YCBCR_SUBSAMPLING: number = 0x0212;
  public static readonly TAG_YCBCR_POSITIONING: number = 0x0213;
  public static readonly TAG_REFERENCE_BLACK_WHITE: number = 0x0214;
  public static readonly TAG_STRIP_ROW_COUNTS: number = 0x022f;
  public static readonly TAG_APPLICATION_NOTES: number = 0x02bc;
  public static readonly TAG_RELATED_IMAGE_FILE_FORMAT: number = 0x1000;
  public static readonly TAG_RELATED_IMAGE_WIDTH: number = 0x1001;
  public static readonly TAG_RELATED_IMAGE_HEIGHT: number = 0x1002;
  public static readonly TAG_RATING: number = 0x4746;
  public static readonly TAG_CFA_REPEAT_PATTERN_DIM: number = 0x828D;
  /** There are two definitions for CFA pattern, I don't know the difference... */
  public static readonly TAG_CFA_PATTERN_2: number = 0x828E;
  public static readonly TAG_BATTERY_LEVEL: number = 0x828F;
  public static readonly TAG_COPYRIGHT: number = 0x8298;
  /**
   * Exposure time (reciprocal of shutter speed). Unit is second.
   */
  public static readonly TAG_EXPOSURE_TIME: number = 0x829A;
  /**
   * The actual F-number(F-stop) of lens when the image was taken.
   */
  public static readonly TAG_FNUMBER: number = 0x829D;
  public static readonly TAG_IPTC_NAA: number = 0x83BB;
  public static readonly TAG_PHOTOSHOP_SETTINGS: number = 0x8649;
  public static readonly TAG_INTER_COLOR_PROFILE: number = 0x8773;
  /**
   * Exposure program that the camera used when image was taken. '1' means
   * manual control, '2' program normal, '3' aperture priority, '4' shutter
   * priority, '5' program creative (slow program), '6' program action
   * (high-speed program), '7' portrait mode, '8' landscape mode.
   */
  public static readonly TAG_EXPOSURE_PROGRAM: number = 0x8822;
  public static readonly TAG_SPECTRAL_SENSITIVITY: number = 0x8824;
  public static readonly TAG_ISO_EQUIVALENT: number = 0x8827;
  /**
   * Indicates the Opto-Electric Conversion Function (OECF) specified in ISO 14524.
   * <p>
   * OECF is the relationship between the camera optical input and the image values.
   * <p>
   * The values are:
   * <ul>
   *   <li>Two shorts, indicating respectively number of columns, and number of rows.</li>
   *   <li>For each column, the column name in a null-terminated ASCII string.</li>
   *   <li>For each cell, an SRATIONAL value.</li>
   * </ul>
   */
  public static readonly TAG_OPTO_ELECTRIC_CONVERSION_FUNCTION: number = 0x8828;
  public static readonly TAG_INTERLACE: number = 0x8829;
  public static readonly TAG_TIME_ZONE_OFFSET_TIFF_EP: number = 0x882A;
  public static readonly TAG_SELF_TIMER_MODE_TIFF_EP: number = 0x882B;
  /**
   * Applies to ISO tag.
   *
   * 0 = Unknown
   * 1 = Standard Output Sensitivity
   * 2 = Recommended Exposure Index
   * 3 = ISO Speed
   * 4 = Standard Output Sensitivity and Recommended Exposure Index
   * 5 = Standard Output Sensitivity and ISO Speed
   * 6 = Recommended Exposure Index and ISO Speed
   * 7 = Standard Output Sensitivity, Recommended Exposure Index and ISO Speed
   */
  public static readonly TAG_SENSITIVITY_TYPE: number = 0x8830;
  public static readonly TAG_STANDARD_OUTPUT_SENSITIVITY: number = 0x8831;
  public static readonly TAG_RECOMMENDED_EXPOSURE_INDEX: number = 0x8832;
  public static readonly TAG_ISO_SPEED: number = 0x8833;
  public static readonly TAG_ISO_SPEED_LATITUDE_YYY: number = 0x8834;
  public static readonly TAG_ISO_SPEED_LATITUDE_ZZZ: number = 0x8835;
  public static readonly TAG_EXIF_VERSION: number = 0x9000;
  public static readonly TAG_DATETIME_ORIGINAL: number = 0x9003;
  public static readonly TAG_DATETIME_DIGITIZED: number = 0x9004;
  public static readonly TAG_TIME_ZONE: number = 0x9010;
  public static readonly TAG_TIME_ZONE_ORIGINAL: number = 0x9011;
  public static readonly TAG_TIME_ZONE_DIGITIZED: number = 0x9012;
  public static readonly TAG_COMPONENTS_CONFIGURATION: number = 0x9101;
  /**
   * Average (rough estimate) compression level in JPEG bits per pixel.
   * */
  public static readonly TAG_COMPRESSED_AVERAGE_BITS_PER_PIXEL: number = 0x9102;

  /**
   * Shutter speed by APEX value. To convert this value to ordinary 'Shutter Speed';
   * calculate this value's power of 2, then reciprocal. For example, if the
   * ShutterSpeedValue is '4', shutter speed is 1/(24)=1/16 second.
   */
  public static readonly TAG_SHUTTER_SPEED: number = 0x9201;
  /**
   * The actual aperture value of lens when the image was taken. Unit is APEX.
   * To convert this value to ordinary F-number (F-stop), calculate this value's
   * power of root 2 (=1.4142). For example, if the ApertureValue is '5',
   * F-number is 1.4142^5 = F5.6.
   */
  public static readonly TAG_APERTURE: number = 0x9202;
  public static readonly TAG_BRIGHTNESS_VALUE: number = 0x9203;
  public static readonly TAG_EXPOSURE_BIAS: number = 0x9204;
  /**
   * Maximum aperture value of lens. You can convert to F-number by calculating
   * power of root 2 (same process of ApertureValue:0x9202).
   * The actual aperture value of lens when the image was taken. To convert this
   * value to ordinary f-number(f-stop), calculate the value's power of root 2
   * (=1.4142). For example, if the ApertureValue is '5', f-number is 1.41425^5 = F5.6.
   */
  public static readonly TAG_MAX_APERTURE: number = 0x9205;
  /**
   * Indicates the distance the autofocus camera is focused to.  Tends to be less accurate as distance increases.
   */
  public static readonly TAG_SUBJECT_DISTANCE: number = 0x9206;
  /**
   * Exposure metering method. '0' means unknown, '1' average, '2' center
   * weighted average, '3' spot, '4' multi-spot, '5' multi-segment, '6' partial,
   * '255' other.
   */
  public static readonly TAG_METERING_MODE: number = 0x9207;

  /**
   * @deprecated use {@link com.drew.metadata.exif.ExifDirectoryBase#TAG_WHITE_BALANCE} instead.
   */
  public static readonly TAG_LIGHT_SOURCE: number = 0x9208;
  /**
   * White balance (aka light source). '0' means unknown, '1' daylight,
   * '2' fluorescent, '3' tungsten, '10' flash, '17' standard light A,
   * '18' standard light B, '19' standard light C, '20' D55, '21' D65,
   * '22' D75, '255' other.
   */
  public static readonly TAG_WHITE_BALANCE: number = 0x9208;
  /**
   * 0x0  = 0000000 = No Flash
   * 0x1  = 0000001 = Fired
   * 0x5  = 0000101 = Fired, Return not detected
   * 0x7  = 0000111 = Fired, Return detected
   * 0x9  = 0001001 = On
   * 0xd  = 0001101 = On, Return not detected
   * 0xf  = 0001111 = On, Return detected
   * 0x10 = 0010000 = Off
   * 0x18 = 0011000 = Auto, Did not fire
   * 0x19 = 0011001 = Auto, Fired
   * 0x1d = 0011101 = Auto, Fired, Return not detected
   * 0x1f = 0011111 = Auto, Fired, Return detected
   * 0x20 = 0100000 = No flash function
   * 0x41 = 1000001 = Fired, Red-eye reduction
   * 0x45 = 1000101 = Fired, Red-eye reduction, Return not detected
   * 0x47 = 1000111 = Fired, Red-eye reduction, Return detected
   * 0x49 = 1001001 = On, Red-eye reduction
   * 0x4d = 1001101 = On, Red-eye reduction, Return not detected
   * 0x4f = 1001111 = On, Red-eye reduction, Return detected
   * 0x59 = 1011001 = Auto, Fired, Red-eye reduction
   * 0x5d = 1011101 = Auto, Fired, Red-eye reduction, Return not detected
   * 0x5f = 1011111 = Auto, Fired, Red-eye reduction, Return detected
   *        6543210 (positions)
   *
   * This is a bitmask.
   * 0 = flash fired
   * 1 = return detected
   * 2 = return able to be detected
   * 3 = unknown
   * 4 = auto used
   * 5 = unknown
   * 6 = red eye reduction used
   */
  public static readonly TAG_FLASH: number = 0x9209;
  /**
   * Focal length of lens used to take image.  Unit is millimeter.
   * Nice digital cameras actually save the focal length as a function of how far they are zoomed in.
   */
  public static readonly TAG_FOCAL_LENGTH: number = 0x920A;
  public static readonly TAG_FLASH_ENERGY_TIFF_EP: number = 0x920B;
  public static readonly TAG_SPATIAL_FREQ_RESPONSE_TIFF_EP: number = 0x920C;
  public static readonly TAG_NOISE: number = 0x920D;
  public static readonly TAG_FOCAL_PLANE_X_RESOLUTION_TIFF_EP: number = 0x920E;
  public static readonly TAG_FOCAL_PLANE_Y_RESOLUTION_TIFF_EP: number = 0x920F;
  public static readonly TAG_IMAGE_NUMBER: number = 0x9211;
  public static readonly TAG_SECURITY_CLASSIFICATION: number = 0x9212;
  public static readonly TAG_IMAGE_HISTORY: number = 0x9213;
  public static readonly TAG_SUBJECT_LOCATION_TIFF_EP: number = 0x9214;
  public static readonly TAG_EXPOSURE_INDEX_TIFF_EP: number = 0x9215;
  public static readonly TAG_STANDARD_ID_TIFF_EP: number = 0x9216;

  /**
   * This tag holds the Exif Makernote. Makernotes are free to be in any format, though they are often IFDs.
   * To determine the format, we consider the starting bytes of the makernote itself and sometimes the
   * camera model and make.
   * <p>
   * The component count for this tag includes all of the bytes needed for the makernote.
   */
  public static readonly TAG_MAKERNOTE: number = 0x927C;
  public static readonly TAG_USER_COMMENT: number = 0x9286;
  public static readonly TAG_SUBSECOND_TIME: number = 0x9290;
  public static readonly TAG_SUBSECOND_TIME_ORIGINAL: number = 0x9291;
  public static readonly TAG_SUBSECOND_TIME_DIGITIZED: number = 0x9292;
  public static readonly TAG_TEMPERATURE: number = 0x9400;
  public static readonly TAG_HUMIDITY: number = 0x9401;
  public static readonly TAG_PRESSURE: number = 0x9402;
  public static readonly TAG_WATER_DEPTH: number = 0x9403;
  public static readonly TAG_ACCELERATION: number = 0x9404;
  public static readonly TAG_CAMERA_ELEVATION_ANGLE: number = 0x9405;

  /** The image title, as used by Windows XP. */
  public static readonly TAG_WIN_TITLE: number = 0x9C9B;
  /** The image comment, as used by Windows XP. */
  public static readonly TAG_WIN_COMMENT: number = 0x9C9C;
  /** The image author, as used by Windows XP (called Artist in the Windows shell). */
  public static readonly TAG_WIN_AUTHOR: number = 0x9C9D;
  /** The image keywords, as used by Windows XP. */
  public static readonly TAG_WIN_KEYWORDS: number = 0x9C9E;
  /** The image subject, as used by Windows XP. */
  public static readonly TAG_WIN_SUBJECT: number = 0x9C9F;
  public static readonly TAG_FLASHPIX_VERSION: number = 0xA000;
  /**
   * Defines Color Space. DCF image must use sRGB color space so value is
   * always '1'. If the picture uses the other color space, value is
   * '65535':Uncalibrated.
   */
  public static readonly TAG_COLOR_SPACE: number = 0xA001;
  public static readonly TAG_EXIF_IMAGE_WIDTH: number = 0xA002;
  public static readonly TAG_EXIF_IMAGE_HEIGHT: number = 0xA003;
  public static readonly TAG_RELATED_SOUND_FILE: number = 0xA004;
  public static readonly TAG_FLASH_ENERGY: number = 0xA20B;
  public static readonly TAG_SPATIAL_FREQ_RESPONSE: number = 0xA20C;
  public static readonly TAG_FOCAL_PLANE_X_RESOLUTION: number = 0xA20E;
  public static readonly TAG_FOCAL_PLANE_Y_RESOLUTION: number = 0xA20F;
  /**
   * Unit of FocalPlaneXResolution/FocalPlaneYResolution. '1' means no-unit,
   * '2' inch, '3' centimeter.
   *
   * Note: Some of Fujifilm's digicam(e.g.FX2700,FX2900,Finepix4700Z/40i etc)
   * uses value '3' so it must be 'centimeter', but it seems that they use a
   * '8.3mm?'(1/3in.?) to their ResolutionUnit. Fuji's BUG? Finepix4900Z has
   * been changed to use value '2' but it doesn't match to actual value also.
   */
  public static readonly TAG_FOCAL_PLANE_RESOLUTION_UNIT: number = 0xA210;
  public static readonly TAG_SUBJECT_LOCATION: number = 0xA214;
  public static readonly TAG_EXPOSURE_INDEX: number = 0xA215;
  public static readonly TAG_SENSING_METHOD: number = 0xA217;
  public static readonly TAG_FILE_SOURCE: number = 0xA300;
  public static readonly TAG_SCENE_TYPE: number = 0xA301;
  public static readonly TAG_CFA_PATTERN: number = 0xA302;

  /**
   * This tag indicates the use of special processing on image data, such as rendering
   * geared to output. When special processing is performed, the reader is expected to
   * disable or minimize any further processing.
   * Tag = 41985 (A401.H)
   * Type = SHORT
   * Count = 1
   * Default = 0
   *   0 = Normal process
   *   1 = Custom process
   *   Other = reserved
   */
  public static readonly TAG_CUSTOM_RENDERED: number = 0xA401;
  /**
   * This tag indicates the exposure mode set when the image was shot. In auto-bracketing
   * mode, the camera shoots a series of frames of the same scene at different exposure settings.
   * Tag = 41986 (A402.H)
   * Type = SHORT
   * Count = 1
   * Default = none
   *   0 = Auto exposure
   *   1 = Manual exposure
   *   2 = Auto bracket
   *   Other = reserved
   */
  public static readonly TAG_EXPOSURE_MODE: number = 0xA402;
  /**
   * This tag indicates the white balance mode set when the image was shot.
   * Tag = 41987 (A403.H)
   * Type = SHORT
   * Count = 1
   * Default = none
   *   0 = Auto white balance
   *   1 = Manual white balance
   *   Other = reserved
   */
  public static readonly TAG_WHITE_BALANCE_MODE: number = 0xA403;
  /**
   * This tag indicates the digital zoom ratio when the image was shot. If the
   * numerator of the recorded value is 0, this indicates that digital zoom was
   * not used.
   * Tag = 41988 (A404.H)
   * Type = RATIONAL
   * Count = 1
   * Default = none
   */
  public static readonly TAG_DIGITAL_ZOOM_RATIO: number = 0xA404;
  /**
   * This tag indicates the equivalent focal length assuming a 35mm film camera,
   * in mm. A value of 0 means the focal length is unknown. Note that this tag
   * differs from the FocalLength tag.
   * Tag = 41989 (A405.H)
   * Type = SHORT
   * Count = 1
   * Default = none
   */
  public static readonly TAG_35MM_FILM_EQUIV_FOCAL_LENGTH: number = 0xA405;
  /**
   * This tag indicates the type of scene that was shot. It can also be used to
   * record the mode in which the image was shot. Note that this differs from
   * the scene type (SceneType) tag.
   * Tag = 41990 (A406.H)
   * Type = SHORT
   * Count = 1
   * Default = 0
   *   0 = Standard
   *   1 = Landscape
   *   2 = Portrait
   *   3 = Night scene
   *   Other = reserved
   */
  public static readonly TAG_SCENE_CAPTURE_TYPE: number = 0xA406;
  /**
   * This tag indicates the degree of overall image gain adjustment.
   * Tag = 41991 (A407.H)
   * Type = SHORT
   * Count = 1
   * Default = none
   *   0 = None
   *   1 = Low gain up
   *   2 = High gain up
   *   3 = Low gain down
   *   4 = High gain down
   *   Other = reserved
   */
  public static readonly TAG_GAIN_CONTROL: number = 0xA407;
  /**
   * This tag indicates the direction of contrast processing applied by the camera
   * when the image was shot.
   * Tag = 41992 (A408.H)
   * Type = SHORT
   * Count = 1
   * Default = 0
   *   0 = Normal
   *   1 = Soft
   *   2 = Hard
   *   Other = reserved
   */
  public static readonly TAG_CONTRAST: number = 0xA408;
  /**
   * This tag indicates the direction of saturation processing applied by the camera
   * when the image was shot.
   * Tag = 41993 (A409.H)
   * Type = SHORT
   * Count = 1
   * Default = 0
   *   0 = Normal
   *   1 = Low saturation
   *   2 = High saturation
   *   Other = reserved
   */
  public static readonly TAG_SATURATION: number = 0xA409;
  /**
   * This tag indicates the direction of sharpness processing applied by the camera
   * when the image was shot.
   * Tag = 41994 (A40A.H)
   * Type = SHORT
   * Count = 1
   * Default = 0
   *   0 = Normal
   *   1 = Soft
   *   2 = Hard
   *   Other = reserved
   */
  public static readonly TAG_SHARPNESS: number = 0xA40A;
  /**
   * This tag indicates information on the picture-taking conditions of a particular
   * camera model. The tag is used only to indicate the picture-taking conditions in
   * the reader.
   * Tag = 41995 (A40B.H)
   * Type = UNDEFINED
   * Count = Any
   * Default = none
   *
   * The information is recorded in the format shown below. The data is recorded
   * in Unicode using SHORT type for the number of display rows and columns and
   * UNDEFINED type for the camera settings. The Unicode (UCS-2) string including
   * Signature is NULL terminated. The specifics of the Unicode string are as given
   * in ISO/IEC 10464-1.
   *
   *      Length  Type        Meaning
   *      ------+-----------+------------------
   *      2       SHORT       Display columns
   *      2       SHORT       Display rows
   *      Any     UNDEFINED   Camera setting-1
   *      Any     UNDEFINED   Camera setting-2
   *      :       :           :
   *      Any     UNDEFINED   Camera setting-n
   */
  public static readonly TAG_DEVICE_SETTING_DESCRIPTION: number = 0xA40B;
  /**
   * This tag indicates the distance to the subject.
   * Tag = 41996 (A40C.H)
   * Type = SHORT
   * Count = 1
   * Default = none
   *   0 = unknown
   *   1 = Macro
   *   2 = Close view
   *   3 = Distant view
   *   Other = reserved
   */
  public static readonly TAG_SUBJECT_DISTANCE_RANGE: number = 0xA40C;

  /**
   * This tag indicates an identifier assigned uniquely to each image. It is
   * recorded as an ASCII string equivalent to hexadecimal notation and 128-bit
   * fixed length.
   * Tag = 42016 (A420.H)
   * Type = ASCII
   * Count = 33
   * Default = none
   */
  public static readonly TAG_IMAGE_UNIQUE_ID: number = 0xA420;
  /** String. */
  public static readonly TAG_CAMERA_OWNER_NAME: number = 0xA430;
  /** String. */
  public static readonly TAG_BODY_SERIAL_NUMBER: number = 0xA431;
  /** An array of four Rational64u numbers giving focal and aperture ranges. */
  public static readonly TAG_LENS_SPECIFICATION = 0xA432;
  /** String. */
  public static readonly TAG_LENS_MAKE: number = 0xA433;
  /** String. */
  public static readonly TAG_LENS_MODEL: number = 0xA434;
  /** String. */
  public static readonly TAG_LENS_SERIAL_NUMBER: number = 0xA435;
  /** Rational64u. */
  public static readonly TAG_GAMMA: number = 0xA500;
  public static readonly TAG_PRINT_IMAGE_MATCHING_INFO: number = 0xC4A5;
  public static readonly TAG_PANASONIC_TITLE: number = 0xC6D2;
  public static readonly TAG_PANASONIC_TITLE_2: number = 0xC6D3;
  public static readonly TAG_PADDING: number = 0xEA1C;
  public static readonly TAG_LENS: number = 0xFDEA;

  public static addExifTagNames(map: Map<number, string>): Map<number, string>
  {
    map.set(ExifDirectoryBase.TAG_INTEROP_INDEX, "Interoperability Index");
    map.set(ExifDirectoryBase.TAG_INTEROP_VERSION, "Interoperability Version");
    map.set(ExifDirectoryBase.TAG_NEW_SUBFILE_TYPE, "New Subfile Type");
    map.set(ExifDirectoryBase.TAG_SUBFILE_TYPE, "Subfile Type");
    map.set(ExifDirectoryBase.TAG_IMAGE_WIDTH, "Image Width");
    map.set(ExifDirectoryBase.TAG_IMAGE_HEIGHT, "Image Height");
    map.set(ExifDirectoryBase.TAG_BITS_PER_SAMPLE, "Bits Per Sample");
    map.set(ExifDirectoryBase.TAG_COMPRESSION, "Compression");
    map.set(ExifDirectoryBase.TAG_PHOTOMETRIC_INTERPRETATION, "Photometric Interpretation");
    map.set(ExifDirectoryBase.TAG_THRESHOLDING, "Thresholding");
    map.set(ExifDirectoryBase.TAG_FILL_ORDER, "Fill Order");
    map.set(ExifDirectoryBase.TAG_DOCUMENT_NAME, "Document Name");
    map.set(ExifDirectoryBase.TAG_IMAGE_DESCRIPTION, "Image Description");
    map.set(ExifDirectoryBase.TAG_MAKE, "Make");
    map.set(ExifDirectoryBase.TAG_MODEL, "Model");
    map.set(ExifDirectoryBase.TAG_STRIP_OFFSETS, "Strip Offsets");
    map.set(ExifDirectoryBase.TAG_ORIENTATION, "Orientation");
    map.set(ExifDirectoryBase.TAG_SAMPLES_PER_PIXEL, "Samples Per Pixel");
    map.set(ExifDirectoryBase.TAG_ROWS_PER_STRIP, "Rows Per Strip");
    map.set(ExifDirectoryBase.TAG_STRIP_BYTE_COUNTS, "Strip Byte Counts");
    map.set(ExifDirectoryBase.TAG_MIN_SAMPLE_VALUE, "Minimum Sample Value");
    map.set(ExifDirectoryBase.TAG_MAX_SAMPLE_VALUE, "Maximum Sample Value");
    map.set(ExifDirectoryBase.TAG_X_RESOLUTION, "X Resolution");
    map.set(ExifDirectoryBase.TAG_Y_RESOLUTION, "Y Resolution");
    map.set(ExifDirectoryBase.TAG_PLANAR_CONFIGURATION, "Planar Configuration");
    map.set(ExifDirectoryBase.TAG_PAGE_NAME, "Page Name");
    map.set(ExifDirectoryBase.TAG_RESOLUTION_UNIT, "Resolution Unit");
    map.set(ExifDirectoryBase.TAG_PAGE_NUMBER, "Page Number");
    map.set(ExifDirectoryBase.TAG_TRANSFER_FUNCTION, "Transfer Function");
    map.set(ExifDirectoryBase.TAG_SOFTWARE, "Software");
    map.set(ExifDirectoryBase.TAG_ARTIST, "Artist");
    map.set(ExifDirectoryBase.TAG_PREDICTOR, "Predictor");
    map.set(ExifDirectoryBase.TAG_HOST_COMPUTER, "Host Computer");
    map.set(ExifDirectoryBase.TAG_WHITE_POINT, "White Point");
    map.set(ExifDirectoryBase.TAG_PRIMARY_CHROMATICITIES, "Primary Chromaticities");
    map.set(ExifDirectoryBase.TAG_TILE_WIDTH, "Tile Width");
    map.set(ExifDirectoryBase.TAG_TILE_LENGTH, "Tile Length");
    map.set(ExifDirectoryBase.TAG_TILE_OFFSETS, "Tile Offsets");
    map.set(ExifDirectoryBase.TAG_TILE_BYTE_COUNTS, "Tile Byte Counts");
    map.set(ExifDirectoryBase.TAG_SUB_IFD_OFFSET, "Sub IFD Pointer(s)");
    map.set(ExifDirectoryBase.TAG_EXTRA_SAMPLES, "Extra Samples");
    map.set(ExifDirectoryBase.TAG_SAMPLE_FORMAT, "Sample Format");
    map.set(ExifDirectoryBase.TAG_TRANSFER_RANGE, "Transfer Range");
    map.set(ExifDirectoryBase.TAG_JPEG_TABLES, "JPEG Tables");
    map.set(ExifDirectoryBase.TAG_JPEG_PROC, "JPEG Proc");

    map.set(ExifDirectoryBase.TAG_JPEG_RESTART_INTERVAL, "JPEG Restart Interval");
    map.set(ExifDirectoryBase.TAG_JPEG_LOSSLESS_PREDICTORS, "JPEG Lossless Predictors");
    map.set(ExifDirectoryBase.TAG_JPEG_POINT_TRANSFORMS, "JPEG Point Transforms");
    map.set(ExifDirectoryBase.TAG_JPEG_Q_TABLES, "JPEGQ Tables");
    map.set(ExifDirectoryBase.TAG_JPEG_DC_TABLES, "JPEGDC Tables");
    map.set(ExifDirectoryBase.TAG_JPEG_AC_TABLES, "JPEGAC Tables");

    map.set(ExifDirectoryBase.TAG_YCBCR_COEFFICIENTS, "YCbCr Coefficients");
    map.set(ExifDirectoryBase.TAG_YCBCR_SUBSAMPLING, "YCbCr Sub-Sampling");
    map.set(ExifDirectoryBase.TAG_YCBCR_POSITIONING, "YCbCr Positioning");
    map.set(ExifDirectoryBase.TAG_REFERENCE_BLACK_WHITE, "Reference Black/White");
    map.set(ExifDirectoryBase.TAG_STRIP_ROW_COUNTS, "Strip Row Counts");
    map.set(ExifDirectoryBase.TAG_APPLICATION_NOTES, "Application Notes");
    map.set(ExifDirectoryBase.TAG_RELATED_IMAGE_FILE_FORMAT, "Related Image File Format");
    map.set(ExifDirectoryBase.TAG_RELATED_IMAGE_WIDTH, "Related Image Width");
    map.set(ExifDirectoryBase.TAG_RELATED_IMAGE_HEIGHT, "Related Image Height");
    map.set(ExifDirectoryBase.TAG_RATING, "Rating");
    map.set(ExifDirectoryBase.TAG_CFA_REPEAT_PATTERN_DIM, "CFA Repeat Pattern Dim");
    map.set(ExifDirectoryBase.TAG_CFA_PATTERN_2, "CFA Pattern");
    map.set(ExifDirectoryBase.TAG_BATTERY_LEVEL, "Battery Level");
    map.set(ExifDirectoryBase.TAG_COPYRIGHT, "Copyright");
    map.set(ExifDirectoryBase.TAG_EXPOSURE_TIME, "Exposure Time");
    map.set(ExifDirectoryBase.TAG_FNUMBER, "F-Number");
    map.set(ExifDirectoryBase.TAG_IPTC_NAA, "IPTC/NAA");
    map.set(ExifDirectoryBase.TAG_PHOTOSHOP_SETTINGS, "Photoshop Settings");
    map.set(ExifDirectoryBase.TAG_INTER_COLOR_PROFILE, "Inter Color Profile");
    map.set(ExifDirectoryBase.TAG_EXPOSURE_PROGRAM, "Exposure Program");
    map.set(ExifDirectoryBase.TAG_SPECTRAL_SENSITIVITY, "Spectral Sensitivity");
    map.set(ExifDirectoryBase.TAG_ISO_EQUIVALENT, "ISO Speed Ratings");
    map.set(ExifDirectoryBase.TAG_OPTO_ELECTRIC_CONVERSION_FUNCTION, "Opto-electric Conversion Function (OECF)");
    map.set(ExifDirectoryBase.TAG_INTERLACE, "Interlace");
    map.set(ExifDirectoryBase.TAG_TIME_ZONE_OFFSET_TIFF_EP, "Time Zone Offset");
    map.set(ExifDirectoryBase.TAG_SELF_TIMER_MODE_TIFF_EP, "Self Timer Mode");
    map.set(ExifDirectoryBase.TAG_SENSITIVITY_TYPE, "Sensitivity Type");
    map.set(ExifDirectoryBase.TAG_STANDARD_OUTPUT_SENSITIVITY, "Standard Output Sensitivity");
    map.set(ExifDirectoryBase.TAG_RECOMMENDED_EXPOSURE_INDEX, "Recommended Exposure Index");
    map.set(ExifDirectoryBase.TAG_ISO_SPEED, "ISO Speed");
    map.set(ExifDirectoryBase.TAG_ISO_SPEED_LATITUDE_YYY, "ISO Speed Latitude yyy");
    map.set(ExifDirectoryBase.TAG_ISO_SPEED_LATITUDE_ZZZ, "ISO Speed Latitude zzz");
    map.set(ExifDirectoryBase.TAG_EXIF_VERSION, "Exif Version");
    map.set(ExifDirectoryBase.TAG_DATETIME_ORIGINAL, "Date/Time Original");
    map.set(ExifDirectoryBase.TAG_DATETIME_DIGITIZED, "Date/Time Digitized");
    map.set(ExifDirectoryBase.TAG_TIME_ZONE, "Time Zone");
    map.set(ExifDirectoryBase.TAG_TIME_ZONE_ORIGINAL, "Time Zone Original");
    map.set(ExifDirectoryBase.TAG_TIME_ZONE_DIGITIZED, "Time Zone Digitized");
    map.set(ExifDirectoryBase.TAG_COMPONENTS_CONFIGURATION, "Components Configuration");
    map.set(ExifDirectoryBase.TAG_COMPRESSED_AVERAGE_BITS_PER_PIXEL, "Compressed Bits Per Pixel");
    map.set(ExifDirectoryBase.TAG_SHUTTER_SPEED, "Shutter Speed Value");
    map.set(ExifDirectoryBase.TAG_APERTURE, "Aperture Value");
    map.set(ExifDirectoryBase.TAG_BRIGHTNESS_VALUE, "Brightness Value");
    map.set(ExifDirectoryBase.TAG_EXPOSURE_BIAS, "Exposure Bias Value");
    map.set(ExifDirectoryBase.TAG_MAX_APERTURE, "Max Aperture Value");
    map.set(ExifDirectoryBase.TAG_SUBJECT_DISTANCE, "Subject Distance");
    map.set(ExifDirectoryBase.TAG_METERING_MODE, "Metering Mode");
    map.set(ExifDirectoryBase.TAG_WHITE_BALANCE, "White Balance");
    map.set(ExifDirectoryBase.TAG_FLASH, "Flash");
    map.set(ExifDirectoryBase.TAG_FOCAL_LENGTH, "Focal Length");
    map.set(ExifDirectoryBase.TAG_FLASH_ENERGY_TIFF_EP, "Flash Energy");
    map.set(ExifDirectoryBase.TAG_SPATIAL_FREQ_RESPONSE_TIFF_EP, "Spatial Frequency Response");
    map.set(ExifDirectoryBase.TAG_NOISE, "Noise");
    map.set(ExifDirectoryBase.TAG_FOCAL_PLANE_X_RESOLUTION_TIFF_EP, "Focal Plane X Resolution");
    map.set(ExifDirectoryBase.TAG_FOCAL_PLANE_Y_RESOLUTION_TIFF_EP, "Focal Plane Y Resolution");
    map.set(ExifDirectoryBase.TAG_IMAGE_NUMBER, "Image Number");
    map.set(ExifDirectoryBase.TAG_SECURITY_CLASSIFICATION, "Security Classification");
    map.set(ExifDirectoryBase.TAG_IMAGE_HISTORY, "Image History");
    map.set(ExifDirectoryBase.TAG_SUBJECT_LOCATION_TIFF_EP, "Subject Location");
    map.set(ExifDirectoryBase.TAG_EXPOSURE_INDEX_TIFF_EP, "Exposure Index");
    map.set(ExifDirectoryBase.TAG_STANDARD_ID_TIFF_EP, "TIFF/EP Standard ID");
    map.set(ExifDirectoryBase.TAG_MAKERNOTE, "Makernote");
    map.set(ExifDirectoryBase.TAG_USER_COMMENT, "User Comment");
    map.set(ExifDirectoryBase.TAG_SUBSECOND_TIME, "Sub-Sec Time");
    map.set(ExifDirectoryBase.TAG_SUBSECOND_TIME_ORIGINAL, "Sub-Sec Time Original");
    map.set(ExifDirectoryBase.TAG_SUBSECOND_TIME_DIGITIZED, "Sub-Sec Time Digitized");
    map.set(ExifDirectoryBase.TAG_TEMPERATURE, "Temperature");
    map.set(ExifDirectoryBase.TAG_HUMIDITY, "Humidity");
    map.set(ExifDirectoryBase.TAG_PRESSURE, "Pressure");
    map.set(ExifDirectoryBase.TAG_WATER_DEPTH, "Water Depth");
    map.set(ExifDirectoryBase.TAG_ACCELERATION, "Acceleration");
    map.set(ExifDirectoryBase.TAG_CAMERA_ELEVATION_ANGLE, "Camera Elevation Angle");
    map.set(ExifDirectoryBase.TAG_WIN_TITLE, "Windows XP Title");
    map.set(ExifDirectoryBase.TAG_WIN_COMMENT, "Windows XP Comment");
    map.set(ExifDirectoryBase.TAG_WIN_AUTHOR, "Windows XP Author");
    map.set(ExifDirectoryBase.TAG_WIN_KEYWORDS, "Windows XP Keywords");
    map.set(ExifDirectoryBase.TAG_WIN_SUBJECT, "Windows XP Subject");
    map.set(ExifDirectoryBase.TAG_FLASHPIX_VERSION, "FlashPix Version");
    map.set(ExifDirectoryBase.TAG_COLOR_SPACE, "Color Space");
    map.set(ExifDirectoryBase.TAG_EXIF_IMAGE_WIDTH, "Exif Image Width");
    map.set(ExifDirectoryBase.TAG_EXIF_IMAGE_HEIGHT, "Exif Image Height");
    map.set(ExifDirectoryBase.TAG_RELATED_SOUND_FILE, "Related Sound File");
    map.set(ExifDirectoryBase.TAG_FLASH_ENERGY, "Flash Energy");
    map.set(ExifDirectoryBase.TAG_SPATIAL_FREQ_RESPONSE, "Spatial Frequency Response");
    map.set(ExifDirectoryBase.TAG_FOCAL_PLANE_X_RESOLUTION, "Focal Plane X Resolution");
    map.set(ExifDirectoryBase.TAG_FOCAL_PLANE_Y_RESOLUTION, "Focal Plane Y Resolution");
    map.set(ExifDirectoryBase.TAG_FOCAL_PLANE_RESOLUTION_UNIT, "Focal Plane Resolution Unit");
    map.set(ExifDirectoryBase.TAG_SUBJECT_LOCATION, "Subject Location");
    map.set(ExifDirectoryBase.TAG_EXPOSURE_INDEX, "Exposure Index");
    map.set(ExifDirectoryBase.TAG_SENSING_METHOD, "Sensing Method");
    map.set(ExifDirectoryBase.TAG_FILE_SOURCE, "File Source");
    map.set(ExifDirectoryBase.TAG_SCENE_TYPE, "Scene Type");
    map.set(ExifDirectoryBase.TAG_CFA_PATTERN, "CFA Pattern");
    map.set(ExifDirectoryBase.TAG_CUSTOM_RENDERED, "Custom Rendered");
    map.set(ExifDirectoryBase.TAG_EXPOSURE_MODE, "Exposure Mode");
    map.set(ExifDirectoryBase.TAG_WHITE_BALANCE_MODE, "White Balance Mode");
    map.set(ExifDirectoryBase.TAG_DIGITAL_ZOOM_RATIO, "Digital Zoom Ratio");
    map.set(ExifDirectoryBase.TAG_35MM_FILM_EQUIV_FOCAL_LENGTH, "Focal Length 35");
    map.set(ExifDirectoryBase.TAG_SCENE_CAPTURE_TYPE, "Scene Capture Type");
    map.set(ExifDirectoryBase.TAG_GAIN_CONTROL, "Gain Control");
    map.set(ExifDirectoryBase.TAG_CONTRAST, "Contrast");
    map.set(ExifDirectoryBase.TAG_SATURATION, "Saturation");
    map.set(ExifDirectoryBase.TAG_SHARPNESS, "Sharpness");
    map.set(ExifDirectoryBase.TAG_DEVICE_SETTING_DESCRIPTION, "Device Setting Description");
    map.set(ExifDirectoryBase.TAG_SUBJECT_DISTANCE_RANGE, "Subject Distance Range");
    map.set(ExifDirectoryBase.TAG_IMAGE_UNIQUE_ID, "Unique Image ID");
    map.set(ExifDirectoryBase.TAG_CAMERA_OWNER_NAME, "Camera Owner Name");
    map.set(ExifDirectoryBase.TAG_BODY_SERIAL_NUMBER, "Body Serial Number");
    map.set(ExifDirectoryBase.TAG_LENS_SPECIFICATION, "Lens Specification");
    map.set(ExifDirectoryBase.TAG_LENS_MAKE, "Lens Make");
    map.set(ExifDirectoryBase.TAG_LENS_MODEL, "Lens Model");
    map.set(ExifDirectoryBase.TAG_LENS_SERIAL_NUMBER, "Lens Serial Number");
    map.set(ExifDirectoryBase.TAG_GAMMA, "Gamma");
    map.set(ExifDirectoryBase.TAG_PRINT_IMAGE_MATCHING_INFO, "Print Image Matching (PIM) Info");
    map.set(ExifDirectoryBase.TAG_PANASONIC_TITLE, "Panasonic Title");
    map.set(ExifDirectoryBase.TAG_PANASONIC_TITLE_2, "Panasonic Title (2)");
    map.set(ExifDirectoryBase.TAG_PADDING, "Padding");
    map.set(ExifDirectoryBase.TAG_LENS, "Lens");
    return map;
  }
}

export default ExifDirectoryBase
