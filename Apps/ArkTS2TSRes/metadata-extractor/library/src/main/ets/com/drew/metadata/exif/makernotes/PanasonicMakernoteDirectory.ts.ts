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
import Directory from '../../Directory';
import PanasonicMakernoteDescriptor from './PanasonicMakernoteDescriptor';
import ByteArrayReader from '../../../lang/ByteArrayReader';
import RandomAccessReader from '../../../lang/RandomAccessReader';
import Age from '../../Age';
import Face from '../../Face';
/**
 * Describes tags specific to Panasonic and Leica cameras.
 */
class PanasonicMakernoteDirectory extends Directory {
    /**
     * <br>
     * 2 = High            <br>
     * 3 = Normal          <br>
     * 6 = Very High       <br>
     * 7 = Raw             <br>
     * 9 = Motion Picture  <br>
     */
    public static TAG_QUALITY_MODE = 0x0001;
    public static TAG_FIRMWARE_VERSION = 0x0002;
    /**
     * <br>
     * 1 = Auto            <br>
     * 2 = Daylight        <br>
     * 3 = Cloudy          <br>
     * 4 = Incandescent    <br>
     * 5 = Manual          <br>
     * 8 = Flash           <br>
     * 10 = Black &amp; White  <br>
     * 11 = Manual         <br>
     * 12 = Shade          <br>
     */
    public static TAG_WHITE_BALANCE = 0x0003;
    /**
     * <br>
     * 1 = Auto                <br>
     * 2 = Manual              <br>
     * 4 =  Auto, Focus Button <br>
     * 5 = Auto, Continuous    <br>
     */
    public static TAG_FOCUS_MODE = 0x0007;
    /**
     * <br>
     * 2 bytes                         <br>
     * (DMC-FZ10)                      <br>
     * '0 1' = Spot Mode On            <br>
     * '0 16' = Spot Mode Off          <br>
     * '(other models)                 <br>
     * 16 = Normal?                    <br>
     * '0 1' = 9-area                  <br>
     * '0 16' = 3-area (high speed)    <br>
     * '1 0' = Spot Focusing           <br>
     * '1 1' = 5-area                  <br>
     * '16 0' = 1-area                 <br>
     * '16 16' = 1-area (high speed)   <br>
     * '32 0' = Auto or Face Detect    <br>
     * '32 1' = 3-area (left)?         <br>
     * '32 2' = 3-area (center)?       <br>
     * '32 3' = 3-area (right)?        <br>
     * '64 0' = Face Detect            <br>
     */
    public static TAG_AF_AREA_MODE = 0x000f;
    /**
     * <br>
     * 2 = On, Mode 1   <br>
     * 3 = Off          <br>
     * 4 = On, Mode 2   <br>
     */
    public static TAG_IMAGE_STABILIZATION = 0x001a;
    /**
     * <br>
     * 1 = On    <br>
     * 2 = Off   <br>
     */
    public static TAG_MACRO_MODE = 0x001C;
    /**
     * <br>
     * 1 = Normal                            <br>
     * 2 = Portrait                          <br>
     * 3 = Scenery                           <br>
     * 4 = Sports                            <br>
     * 5 = Night Portrait                    <br>
     * 6 = Program                           <br>
     * 7 = Aperture Priority                 <br>
     * 8 = Shutter Priority                  <br>
     * 9 = Macro                             <br>
     * 10= Spot                              <br>
     * 11= Manual                            <br>
     * 12= Movie Preview                     <br>
     * 13= Panning                           <br>
     * 14= Simple                            <br>
     * 15= Color Effects                     <br>
     * 16= Self Portrait                     <br>
     * 17= Economy                           <br>
     * 18= Fireworks                         <br>
     * 19= Party                             <br>
     * 20= Snow                              <br>
     * 21= Night Scenery                     <br>
     * 22= Food                              <br>
     * 23= Baby                              <br>
     * 24= Soft Skin                         <br>
     * 25= Candlelight                       <br>
     * 26= Starry Night                      <br>
     * 27= High Sensitivity                  <br>
     * 28= Panorama Assist                   <br>
     * 29= Underwater                        <br>
     * 30= Beach                             <br>
     * 31= Aerial Photo                      <br>
     * 32= Sunset                            <br>
     * 33= Pet                               <br>
     * 34= Intelligent ISO                   <br>
     * 35= Clipboard                         <br>
     * 36= High Speed Continuous Shooting    <br>
     * 37= Intelligent Auto                  <br>
     * 39= Multi-aspect                      <br>
     * 41= Transform                         <br>
     * 42= Flash Burst                       <br>
     * 43= Pin Hole                          <br>
     * 44= Film Grain                        <br>
     * 45= My Color                          <br>
     * 46= Photo Frame                       <br>
     * 51= HDR                               <br>
     */
    public static TAG_RECORD_MODE = 0x001F;
    /**
     * 1 = Yes <br>
     * 2 = No  <br>
     */
    public static TAG_AUDIO = 0x0020;
    /**
     * No idea, what this is
     */
    public static TAG_UNKNOWN_DATA_DUMP = 0x0021;
    public static TAG_EASY_MODE = 0x0022;
    public static TAG_WHITE_BALANCE_BIAS = 0x0023;
    public static TAG_FLASH_BIAS = 0x0024;
    /**
     * this number is unique, and contains the date of manufacture,
     * but is not the same as the number printed on the camera body
     */
    public static TAG_INTERNAL_SERIAL_NUMBER = 0x0025;
    /**
     * Panasonic Exif Version
     */
    public static TAG_EXIF_VERSION = 0x0026;
    /**
     * 1 = Off           <br>
     * 2 = Warm          <br>
     * 3 = Cool          <br>
     * 4 = Black &amp; White <br>
     * 5 = Sepia         <br>
     */
    public static TAG_COLOR_EFFECT = 0x0028;
    /**
     * 4 Bytes <br>
     * Time in 1/100 s from when the camera was powered on to when the
     * image is written to memory card
     */
    public static TAG_UPTIME = 0x0029;
    /**
     * 0 = Off        <br>
     * 1 = On         <br>
     * 2 = Infinite   <br>
     * 4 = Unlimited  <br>
     */
    public static TAG_BURST_MODE = 0x002a;
    public static TAG_SEQUENCE_NUMBER = 0x002b;
    /**
     * (this decoding seems to work for some models such as the LC1, LX2, FZ7, FZ8, FZ18 and FZ50, but may not be correct for other models such as the FX10, G1, L1, L10 and LC80) <br>
     * 0x0 = Normal                                            <br>
     * 0x1 = Low                                               <br>
     * 0x2 = High                                              <br>
     * 0x6 = Medium Low                                        <br>
     * 0x7 = Medium High                                       <br>
     * 0x100 = Low                                             <br>
     * 0x110 = Normal                                          <br>
     * 0x120 = High                                            <br>
     * (these values are used by the GF1)                      <br>
     * 0 = -2                                                  <br>
     * 1 = -1                                                  <br>
     * 2 = Normal                                              <br>
     * 3 = +1                                                  <br>
     * 4 = +2                                                  <br>
     * 7 = Nature (Color Film)                                 <br>
     * 12 = Smooth (Color Film) or Pure (My Color)             <br>
     * 17 = Dynamic (B&amp;W Film)                             <br>
     * 22 = Smooth (B&amp;W Film)                              <br>
     * 27 = Dynamic (Color Film)                               <br>
     * 32 = Vibrant (Color Film) or Expressive (My Color)      <br>
     * 33 = Elegant (My Color)                                 <br>
     * 37 = Nostalgic (Color Film)                             <br>
     * 41 = Dynamic Art (My Color)                             <br>
     * 42 = Retro (My Color)                                   <br>
     */
    public static TAG_CONTRAST_MODE = 0x002c;
    /**
     * 0 = Standard      <br>
     * 1 = Low (-1)      <br>
     * 2 = High (+1)     <br>
     * 3 = Lowest (-2)   <br>
     * 4 = Highest (+2)  <br>
     */
    public static TAG_NOISE_REDUCTION = 0x002d;
    /**
     * 1 = Off   <br>
     * 2 = 10 s  <br>
     * 3 = 2 s   <br>
     */
    public static TAG_SELF_TIMER = 0x002e;
    /**
     * 1 = 0 DG    <br>
     * 3 = 180 DG  <br>
     * 6 =  90 DG  <br>
     * 8 = 270 DG  <br>
     */
    public static TAG_ROTATION = 0x0030;
    /**
     * 1 = Fired <br>
     * 2 = Enabled nut not used <br>
     * 3 = Disabled but required <br>
     * 4 = Disabled and not required
     */
    public static TAG_AF_ASSIST_LAMP = 0x0031;
    /**
     * 0 = Normal <br>
     * 1 = Natural<br>
     * 2 = Vivid
     *
     */
    public static TAG_COLOR_MODE = 0x0032;
    public static TAG_BABY_AGE = 0x0033;
    /**
     *  1 = Standard <br>
     *  2 = Extended
     */
    public static TAG_OPTICAL_ZOOM_MODE = 0x0034;
    /**
     * 1 = Off <br>
     * 2 = Wide <br>
     * 3 = Telephoto <br>
     * 4 = Macro
     */
    public static TAG_CONVERSION_LENS = 0x0035;
    public static TAG_TRAVEL_DAY = 0x0036;
    /**
     * 0 = Normal
     */
    public static TAG_CONTRAST = 0x0039;
    /**
     * <br>
     * 1 = Home <br>
     * 2 = Destination
     */
    public static TAG_WORLD_TIME_LOCATION = 0x003a;
    /**
     * 1 = Off   <br>
     * 2 = On
     */
    public static TAG_TEXT_STAMP = 0x003b;
    public static TAG_PROGRAM_ISO = 0x003c;
    /**
     * <br>
     * 1 = Normal                               <br>
     * 2 = Outdoor/Illuminations/Flower/HDR Art <br>
     * 3 = Indoor/Architecture/Objects/HDR B&amp;W  <br>
     * 4 = Creative                             <br>
     * 5 = Auto                                 <br>
     * 7 = Expressive                           <br>
     * 8 = Retro                                <br>
     * 9 = Pure                                 <br>
     * 10 = Elegant                             <br>
     * 12 = Monochrome                          <br>
     * 13 = Dynamic Art                         <br>
     * 14 = Silhouette                          <br>
     */
    public static TAG_ADVANCED_SCENE_MODE = 0x003d;
    /**
     * 1 = Off   <br>
     * 2 = On
     */
    public static TAG_TEXT_STAMP_1 = 0x003e;
    public static TAG_FACES_DETECTED = 0x003f;
    public static TAG_SATURATION = 0x0040;
    public static TAG_SHARPNESS = 0x0041;
    public static TAG_FILM_MODE = 0x0042;
    public static TAG_COLOR_TEMP_KELVIN = 0x0044;
    public static TAG_BRACKET_SETTINGS = 0x0045;
    /**
    * WB adjust AB. Positive is a shift toward blue.
    */
    public static TAG_WB_ADJUST_AB = 0x0046;
    /**
    * WB adjust GM. Positive is a shift toward green.
    */
    public static TAG_WB_ADJUST_GM = 0x0047;
    public static TAG_FLASH_CURTAIN = 0x0048;
    public static TAG_LONG_EXPOSURE_NOISE_REDUCTION = 0x0049;
    public static TAG_PANASONIC_IMAGE_WIDTH = 0x004b;
    public static TAG_PANASONIC_IMAGE_HEIGHT = 0x004c;
    public static TAG_AF_POINT_POSITION = 0x004d;
    /**
     * <br>
     * Integer (16Bit) Indexes:                                             <br>
     * 0  Number Face Positions (maybe less than Faces Detected)            <br>
     * 1-4 Face Position 1                                                  <br>
     * 5-8 Face Position 2                                                  <br>
     * and so on                                                            <br>
     *                                                                      <br>
     * The four Integers are interpreted as follows:                        <br>
     * (XYWH)  X,Y Center of Face,  (W,H) Width and Height                  <br>
     * All values are in respect to double the size of the thumbnail image  <br>
     *
     */
    public static TAG_FACE_DETECTION_INFO = 0x004e;
    public static TAG_LENS_TYPE = 0x0051;
    public static TAG_LENS_SERIAL_NUMBER = 0x0052;
    public static TAG_ACCESSORY_TYPE = 0x0053;
    public static TAG_ACCESSORY_SERIAL_NUMBER = 0x0054;
    /**
     * (decoded as two 16-bit signed integers)
     * '-1 1' = Slim Low
     * '-3 2' = Slim High
     * '0 0' = Off
     * '1 1' = Stretch Low
     * '3 2' = Stretch High
     */
    public static TAG_TRANSFORM = 0x0059;
    /**
    * 0 = Off <br>
    * 1 = Low <br>
    * 2 = Standard <br>
    * 3 = High
    */
    public static TAG_INTELLIGENT_EXPOSURE = 0x005d;
    public static TAG_LENS_FIRMWARE_VERSION = 0x0060;
    public static TAG_BURST_SPEED = 0x0077;
    public static TAG_INTELLIGENT_D_RANGE = 0x0079;
    public static TAG_CLEAR_RETOUCH = 0x007c;
    public static TAG_CITY2 = 0x0080;
    public static TAG_PHOTO_STYLE = 0x0089;
    public static TAG_SHADING_COMPENSATION = 0x008a;
    public static TAG_ACCELEROMETER_Z = 0x008c;
    public static TAG_ACCELEROMETER_X = 0x008d;
    public static TAG_ACCELEROMETER_Y = 0x008e;
    public static TAG_CAMERA_ORIENTATION = 0x008f;
    public static TAG_ROLL_ANGLE = 0x0090;
    public static TAG_PITCH_ANGLE = 0x0091;
    public static TAG_SWEEP_PANORAMA_DIRECTION = 0x0093;
    public static TAG_SWEEP_PANORAMA_FIELD_OF_VIEW = 0x0094;
    public static TAG_TIMER_RECORDING = 0x0096;
    public static TAG_INTERNAL_ND_FILTER = 0x009d;
    public static TAG_HDR = 0x009e;
    public static TAG_SHUTTER_TYPE = 0x009f;
    public static TAG_CLEAR_RETOUCH_VALUE = 0x00a3;
    public static TAG_TOUCH_AE = 0x00ab;
    public static TAG_PRINT_IMAGE_MATCHING_INFO = 0x0E00;
    /**
     * Byte Indexes:                                                                       <br>
     *  0    Int (2  Byte) Number of Recognized Faces                                      <br>
     *  4    String(20 Byte)    Recognized Face 1 Name                                     <br>
     * 24    4 Int (8 Byte)     Recognized Face 1 Position  (Same Format as Face Detection)  <br>
     * 32    String(20 Byte)    Recognized Face 1 Age                                      <br>
     * 52    String(20 Byte)    Recognized Face 2 Name                                     <br>
     * 72    4 Int (8 Byte)     Recognized Face 2 Position  (Same Format as Face Detection)  <br>
     * 80    String(20 Byte)    Recognized Face 2 Age                                      <br>
     *                                                                                     <br>
     * And so on                                                                           <br>
     *                                                                                     <br>
     * The four Integers are interpreted as follows:                                       <br>
     * (XYWH)  X,Y Center of Face,  (W,H) Width and Height                                 <br>
     * All values are in respect to double the size of the thumbnail image                 <br>
     *
     */
    public static TAG_FACE_RECOGNITION_INFO = 0x0061;
    /**
    * 0 = No <br>
    * 1 = Yes
    */
    public static TAG_FLASH_WARNING = 0x0062;
    public static TAG_RECOGNIZED_FACE_FLAGS = 0x0063;
    public static TAG_TITLE = 0x0065;
    public static TAG_BABY_NAME = 0x0066;
    public static TAG_LOCATION = 0x0067;
    public static TAG_COUNTRY = 0x0069;
    public static TAG_STATE = 0x006b;
    public static TAG_CITY = 0x006d;
    public static TAG_LANDMARK = 0x006f;
    /**
     * 0 = Off <br>
     * 2 = Auto <br>
     * 3 = On
     */
    public static TAG_INTELLIGENT_RESOLUTION = 0x0070;
    public static TAG_MAKERNOTE_VERSION = 0x8000;
    public static TAG_SCENE_MODE = 0x8001;
    public static TAG_WB_RED_LEVEL = 0x8004;
    public static TAG_WB_GREEN_LEVEL = 0x8005;
    public static TAG_WB_BLUE_LEVEL = 0x8006;
    public static TAG_FLASH_FIRED = 0x8007;
    public static TAG_TEXT_STAMP_2 = 0x8008;
    public static TAG_TEXT_STAMP_3 = 0x8009;
    public static TAG_BABY_AGE_1 = 0x8010;
    /**
   * (decoded as two 16-bit signed integers)
   * '-1 1' = Slim Low
   * '-3 2' = Slim High
   * '0 0' = Off
   * '1 1' = Stretch Low
   * '3 2' = Stretch High
   */
    public static TAG_TRANSFORM_1 = 0x8012;
    public static _tagNameMap: Map<number, string> = new Map([
        [PanasonicMakernoteDirectory.TAG_QUALITY_MODE, "Quality Mode"],
        [PanasonicMakernoteDirectory.TAG_FIRMWARE_VERSION, "Version"],
        [PanasonicMakernoteDirectory.TAG_WHITE_BALANCE, "White Balance"],
        [PanasonicMakernoteDirectory.TAG_FOCUS_MODE, "Focus Mode"],
        [PanasonicMakernoteDirectory.TAG_AF_AREA_MODE, "AF Area Mode"],
        [PanasonicMakernoteDirectory.TAG_IMAGE_STABILIZATION, "Image Stabilization"],
        [PanasonicMakernoteDirectory.TAG_MACRO_MODE, "Macro Mode"],
        [PanasonicMakernoteDirectory.TAG_RECORD_MODE, "Record Mode"],
        [PanasonicMakernoteDirectory.TAG_AUDIO, "Audio"],
        [PanasonicMakernoteDirectory.TAG_INTERNAL_SERIAL_NUMBER, "Internal Serial Number"],
        [PanasonicMakernoteDirectory.TAG_UNKNOWN_DATA_DUMP, "Unknown Data Dump"],
        [PanasonicMakernoteDirectory.TAG_EASY_MODE, "Easy Mode"],
        [PanasonicMakernoteDirectory.TAG_WHITE_BALANCE_BIAS, "White Balance Bias"],
        [PanasonicMakernoteDirectory.TAG_FLASH_BIAS, "Flash Bias"],
        [PanasonicMakernoteDirectory.TAG_EXIF_VERSION, "Exif Version"],
        [PanasonicMakernoteDirectory.TAG_COLOR_EFFECT, "Color Effect"],
        [PanasonicMakernoteDirectory.TAG_UPTIME, "Camera Uptime"],
        [PanasonicMakernoteDirectory.TAG_BURST_MODE, "Burst Mode"],
        [PanasonicMakernoteDirectory.TAG_SEQUENCE_NUMBER, "Sequence Number"],
        [PanasonicMakernoteDirectory.TAG_CONTRAST_MODE, "Contrast Mode"],
        [PanasonicMakernoteDirectory.TAG_NOISE_REDUCTION, "Noise Reduction"],
        [PanasonicMakernoteDirectory.TAG_SELF_TIMER, "Self Timer"],
        [PanasonicMakernoteDirectory.TAG_ROTATION, "Rotation"],
        [PanasonicMakernoteDirectory.TAG_AF_ASSIST_LAMP, "AF Assist Lamp"],
        [PanasonicMakernoteDirectory.TAG_COLOR_MODE, "Color Mode"],
        [PanasonicMakernoteDirectory.TAG_BABY_AGE, "Baby Age"],
        [PanasonicMakernoteDirectory.TAG_OPTICAL_ZOOM_MODE, "Optical Zoom Mode"],
        [PanasonicMakernoteDirectory.TAG_CONVERSION_LENS, "Conversion Lens"],
        [PanasonicMakernoteDirectory.TAG_TRAVEL_DAY, "Travel Day"],
        [PanasonicMakernoteDirectory.TAG_CONTRAST, "Contrast"],
        [PanasonicMakernoteDirectory.TAG_WORLD_TIME_LOCATION, "World Time Location"],
        [PanasonicMakernoteDirectory.TAG_TEXT_STAMP, "Text Stamp"],
        [PanasonicMakernoteDirectory.TAG_PROGRAM_ISO, "Program ISO"],
        [PanasonicMakernoteDirectory.TAG_ADVANCED_SCENE_MODE, "Advanced Scene Mode"],
        [PanasonicMakernoteDirectory.TAG_PRINT_IMAGE_MATCHING_INFO, "Print Image Matching (PIM) Info"],
        [PanasonicMakernoteDirectory.TAG_FACES_DETECTED, "Number of Detected Faces"],
        [PanasonicMakernoteDirectory.TAG_SATURATION, "Saturation"],
        [PanasonicMakernoteDirectory.TAG_SHARPNESS, "Sharpness"],
        [PanasonicMakernoteDirectory.TAG_FILM_MODE, "Film Mode"],
        [PanasonicMakernoteDirectory.TAG_COLOR_TEMP_KELVIN, "Color Temp Kelvin"],
        [PanasonicMakernoteDirectory.TAG_BRACKET_SETTINGS, "Bracket Settings"],
        [PanasonicMakernoteDirectory.TAG_WB_ADJUST_AB, "White Balance Adjust (AB)"],
        [PanasonicMakernoteDirectory.TAG_WB_ADJUST_GM, "White Balance Adjust (GM)"],
        [PanasonicMakernoteDirectory.TAG_FLASH_CURTAIN, "Flash Curtain"],
        [PanasonicMakernoteDirectory.TAG_LONG_EXPOSURE_NOISE_REDUCTION, "Long Exposure Noise Reduction"],
        [PanasonicMakernoteDirectory.TAG_PANASONIC_IMAGE_WIDTH, "Panasonic Image Width"],
        [PanasonicMakernoteDirectory.TAG_PANASONIC_IMAGE_HEIGHT, "Panasonic Image Height"],
        [PanasonicMakernoteDirectory.TAG_AF_POINT_POSITION, "Af Point Position"],
        [PanasonicMakernoteDirectory.TAG_FACE_DETECTION_INFO, "Face Detection Info"],
        [PanasonicMakernoteDirectory.TAG_LENS_TYPE, "Lens Type"],
        [PanasonicMakernoteDirectory.TAG_LENS_SERIAL_NUMBER, "Lens Serial Number"],
        [PanasonicMakernoteDirectory.TAG_ACCESSORY_TYPE, "Accessory Type"],
        [PanasonicMakernoteDirectory.TAG_ACCESSORY_SERIAL_NUMBER, "Accessory Serial Number"],
        [PanasonicMakernoteDirectory.TAG_TRANSFORM, "Transform"],
        [PanasonicMakernoteDirectory.TAG_INTELLIGENT_EXPOSURE, "Intelligent Exposure"],
        [PanasonicMakernoteDirectory.TAG_LENS_FIRMWARE_VERSION, "Lens Firmware Version"],
        [PanasonicMakernoteDirectory.TAG_FACE_RECOGNITION_INFO, "Face Recognition Info"],
        [PanasonicMakernoteDirectory.TAG_FLASH_WARNING, "Flash Warning"],
        [PanasonicMakernoteDirectory.TAG_RECOGNIZED_FACE_FLAGS, "Recognized Face Flags"],
        [PanasonicMakernoteDirectory.TAG_TITLE, "Title"],
        [PanasonicMakernoteDirectory.TAG_BABY_NAME, "Baby Name"],
        [PanasonicMakernoteDirectory.TAG_LOCATION, "Location"],
        [PanasonicMakernoteDirectory.TAG_COUNTRY, "Country"],
        [PanasonicMakernoteDirectory.TAG_STATE, "State"],
        [PanasonicMakernoteDirectory.TAG_CITY, "City"],
        [PanasonicMakernoteDirectory.TAG_LANDMARK, "Landmark"],
        [PanasonicMakernoteDirectory.TAG_INTELLIGENT_RESOLUTION, "Intelligent Resolution"],
        [PanasonicMakernoteDirectory.TAG_BURST_SPEED, "Burst Speed"],
        [PanasonicMakernoteDirectory.TAG_INTELLIGENT_D_RANGE, "Intelligent D-Range"],
        [PanasonicMakernoteDirectory.TAG_CLEAR_RETOUCH, "Clear Retouch"],
        [PanasonicMakernoteDirectory.TAG_CITY2, "City 2"],
        [PanasonicMakernoteDirectory.TAG_PHOTO_STYLE, "Photo Style"],
        [PanasonicMakernoteDirectory.TAG_SHADING_COMPENSATION, "Shading Compensation"],
        [PanasonicMakernoteDirectory.TAG_ACCELEROMETER_Z, "Accelerometer Z"],
        [PanasonicMakernoteDirectory.TAG_ACCELEROMETER_X, "Accelerometer X"],
        [PanasonicMakernoteDirectory.TAG_ACCELEROMETER_Y, "Accelerometer Y"],
        [PanasonicMakernoteDirectory.TAG_CAMERA_ORIENTATION, "Camera Orientation"],
        [PanasonicMakernoteDirectory.TAG_ROLL_ANGLE, "Roll Angle"],
        [PanasonicMakernoteDirectory.TAG_PITCH_ANGLE, "Pitch Angle"],
        [PanasonicMakernoteDirectory.TAG_SWEEP_PANORAMA_DIRECTION, "Sweep Panorama Direction"],
        [PanasonicMakernoteDirectory.TAG_SWEEP_PANORAMA_FIELD_OF_VIEW, "Sweep Panorama Field Of View"],
        [PanasonicMakernoteDirectory.TAG_TIMER_RECORDING, "Timer Recording"],
        [PanasonicMakernoteDirectory.TAG_INTERNAL_ND_FILTER, "Internal ND Filter"],
        [PanasonicMakernoteDirectory.TAG_HDR, "HDR"],
        [PanasonicMakernoteDirectory.TAG_SHUTTER_TYPE, "Shutter Type"],
        [PanasonicMakernoteDirectory.TAG_CLEAR_RETOUCH_VALUE, "Clear Retouch Value"],
        [PanasonicMakernoteDirectory.TAG_TOUCH_AE, "Touch AE"],
        [PanasonicMakernoteDirectory.TAG_MAKERNOTE_VERSION, "Makernote Version"],
        [PanasonicMakernoteDirectory.TAG_SCENE_MODE, "Scene Mode"],
        [PanasonicMakernoteDirectory.TAG_WB_RED_LEVEL, "White Balance (Red)"],
        [PanasonicMakernoteDirectory.TAG_WB_GREEN_LEVEL, "White Balance (Green)"],
        [PanasonicMakernoteDirectory.TAG_WB_BLUE_LEVEL, "White Balance (Blue)"],
        [PanasonicMakernoteDirectory.TAG_FLASH_FIRED, "Flash Fired"],
        [PanasonicMakernoteDirectory.TAG_TEXT_STAMP_1, "Text Stamp 1"],
        [PanasonicMakernoteDirectory.TAG_TEXT_STAMP_2, "Text Stamp 2"],
        [PanasonicMakernoteDirectory.TAG_TEXT_STAMP_3, "Text Stamp 3"],
        [PanasonicMakernoteDirectory.TAG_BABY_AGE_1, "Baby Age 1"],
        [PanasonicMakernoteDirectory.TAG_TRANSFORM_1, "Transform 1"]
    ]);
    constructor() {
        super();
        this.setDescriptor(new PanasonicMakernoteDescriptor(this));
    }
    public getName(): string {
        return "Panasonic Makernote";
    }
    protected getTagNameMap(): Map<number, string> {
        return PanasonicMakernoteDirectory._tagNameMap;
    }
    public getDetectedFaces(): Face[] {
        let bytes = this.getByteArray(PanasonicMakernoteDirectory.TAG_FACE_DETECTION_INFO);
        if (bytes == null)
            return null;
        let reader: RandomAccessReader = new ByteArrayReader(bytes);
        reader.setMotorolaByteOrder(false);
        try {
            let faceCount = reader.getUInt16(0);
            if (faceCount == 0)
                return null;
            let faces: Face[] = new Face[faceCount];
            for (let i = 0; i < faceCount; i++) {
                let offset = 2 + i * 8;
                faces[i] = new Face(reader.getUInt16(offset), reader.getUInt16(offset + 2), reader.getUInt16(offset + 4), reader.getUInt16(offset + 6), null, null);
            }
            return faces;
        }
        catch (e) {
            return null;
        }
    }
    public getRecognizedFaces(): Face[] {
        let bytes = this.getByteArray(PanasonicMakernoteDirectory.TAG_FACE_RECOGNITION_INFO);
        if (bytes == null)
            return null;
        let reader: RandomAccessReader = new ByteArrayReader(bytes);
        reader.setMotorolaByteOrder(false);
        try {
            let faceCount = reader.getUInt16(0);
            if (faceCount == 0)
                return null;
            let faces: Face[] = new Face[faceCount];
            for (let i = 0; i < faceCount; i++) {
                let offset = 4 + i * 44;
                let name = reader.getString(offset, 20, "ASCII").trim();
                let age = reader.getString(offset + 28, 20, "ASCII").trim();
                faces[i] = new Face(reader.getUInt16(offset + 20), reader.getUInt16(offset + 22), reader.getUInt16(offset + 24), reader.getUInt16(offset + 26), name, Age.fromPanasonicString(age));
            }
            return faces;
        }
        catch (e) {
            return null;
        }
    }
    /**
     * Attempts to convert the underlying string value (as stored in the directory) into an Age object.
     * @param tag The tag identifier.
     * @return The parsed Age object, or null if the tag was empty of the value unable to be parsed.
     */
    public getAge(tag: number): Age {
        let ageString = this.getString(tag);
        if (ageString == null)
            return null;
        return Age.fromPanasonicString(ageString);
    }
}
export default PanasonicMakernoteDirectory;
