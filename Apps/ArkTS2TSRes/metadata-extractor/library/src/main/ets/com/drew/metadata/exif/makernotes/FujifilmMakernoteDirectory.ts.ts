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
import { FujifilmMakernoteDescriptor } from './FujifilmMakernoteDescriptor';
import Directory from '../../Directory';
export class FujifilmMakernoteDirectory extends Directory {
    public static TAG_MAKERNOTE_VERSION = 0x0000;
    public static TAG_SERIAL_NUMBER = 0x0010;
    public static TAG_QUALITY = 0x1000;
    public static TAG_SHARPNESS = 0x1001;
    public static TAG_WHITE_BALANCE = 0x1002;
    public static TAG_COLOR_SATURATION = 0x1003;
    public static TAG_TONE = 0x1004;
    public static TAG_COLOR_TEMPERATURE = 0x1005;
    public static TAG_CONTRAST = 0x1006;
    public static TAG_WHITE_BALANCE_FINE_TUNE = 0x100a;
    public static TAG_NOISE_REDUCTION = 0x100b;
    public static TAG_HIGH_ISO_NOISE_REDUCTION = 0x100e;
    public static TAG_FLASH_MODE = 0x1010;
    public static TAG_FLASH_EV = 0x1011;
    public static TAG_MACRO = 0x1020;
    public static TAG_FOCUS_MODE = 0x1021;
    public static TAG_FOCUS_PIXEL = 0x1023;
    public static TAG_SLOW_SYNC = 0x1030;
    public static TAG_PICTURE_MODE = 0x1031;
    public static TAG_EXR_AUTO = 0x1033;
    public static TAG_EXR_MODE = 0x1034;
    public static TAG_AUTO_BRACKETING = 0x1100;
    public static TAG_SEQUENCE_NUMBER = 0x1101;
    public static TAG_FINE_PIX_COLOR = 0x1210;
    public static TAG_BLUR_WARNING = 0x1300;
    public static TAG_FOCUS_WARNING = 0x1301;
    public static TAG_AUTO_EXPOSURE_WARNING = 0x1302;
    public static TAG_GE_IMAGE_SIZE = 0x1304;
    public static TAG_DYNAMIC_RANGE = 0x1400;
    public static TAG_FILM_MODE = 0x1401;
    public static TAG_DYNAMIC_RANGE_SETTING = 0x1402;
    public static TAG_DEVELOPMENT_DYNAMIC_RANGE = 0x1403;
    public static TAG_MIN_FOCAL_LENGTH = 0x1404;
    public static TAG_MAX_FOCAL_LENGTH = 0x1405;
    public static TAG_MAX_APERTURE_AT_MIN_FOCAL = 0x1406;
    public static TAG_MAX_APERTURE_AT_MAX_FOCAL = 0x1407;
    public static TAG_AUTO_DYNAMIC_RANGE = 0x140b;
    public static TAG_FACES_DETECTED = 0x4100;
    /**
     * Left, top, right and bottom coordinates in full-sized image for each face detected.
     */
    public static TAG_FACE_POSITIONS = 0x4103;
    public static TAG_FACE_REC_INFO = 0x4282;
    public static TAG_FILE_SOURCE = 0x8000;
    public static TAG_ORDER_NUMBER = 0x8002;
    public static TAG_FRAME_NUMBER = 0x8003;
    public static TAG_PARALLAX = 0xb211;
    private static _tagNameMap: Map<number, string> = new Map<number, string>()
        .set(FujifilmMakernoteDirectory.TAG_MAKERNOTE_VERSION, "Makernote Version")
        .set(FujifilmMakernoteDirectory.TAG_SERIAL_NUMBER, "Serial Number")
        .set(FujifilmMakernoteDirectory.TAG_QUALITY, "Quality")
        .set(FujifilmMakernoteDirectory.TAG_SHARPNESS, "Sharpness")
        .set(FujifilmMakernoteDirectory.TAG_WHITE_BALANCE, "White Balance")
        .set(FujifilmMakernoteDirectory.TAG_COLOR_SATURATION, "Color Saturation")
        .set(FujifilmMakernoteDirectory.TAG_TONE, "Tone (Contrast)")
        .set(FujifilmMakernoteDirectory.TAG_COLOR_TEMPERATURE, "Color Temperature")
        .set(FujifilmMakernoteDirectory.TAG_CONTRAST, "Contrast")
        .set(FujifilmMakernoteDirectory.TAG_WHITE_BALANCE_FINE_TUNE, "White Balance Fine Tune")
        .set(FujifilmMakernoteDirectory.TAG_NOISE_REDUCTION, "Noise Reduction")
        .set(FujifilmMakernoteDirectory.TAG_HIGH_ISO_NOISE_REDUCTION, "High ISO Noise Reduction")
        .set(FujifilmMakernoteDirectory.TAG_FLASH_MODE, "Flash Mode")
        .set(FujifilmMakernoteDirectory.TAG_FLASH_EV, "Flash Strength")
        .set(FujifilmMakernoteDirectory.TAG_MACRO, "Macro")
        .set(FujifilmMakernoteDirectory.TAG_FOCUS_MODE, "Focus Mode")
        .set(FujifilmMakernoteDirectory.TAG_FOCUS_PIXEL, "Focus Pixel")
        .set(FujifilmMakernoteDirectory.TAG_SLOW_SYNC, "Slow Sync")
        .set(FujifilmMakernoteDirectory.TAG_PICTURE_MODE, "Picture Mode")
        .set(FujifilmMakernoteDirectory.TAG_EXR_AUTO, "EXR Auto")
        .set(FujifilmMakernoteDirectory.TAG_EXR_MODE, "EXR Mode")
        .set(FujifilmMakernoteDirectory.TAG_AUTO_BRACKETING, "Auto Bracketing")
        .set(FujifilmMakernoteDirectory.TAG_SEQUENCE_NUMBER, "Sequence Number")
        .set(FujifilmMakernoteDirectory.TAG_FINE_PIX_COLOR, "FinePix Color Setting")
        .set(FujifilmMakernoteDirectory.TAG_BLUR_WARNING, "Blur Warning")
        .set(FujifilmMakernoteDirectory.TAG_FOCUS_WARNING, "Focus Warning")
        .set(FujifilmMakernoteDirectory.TAG_AUTO_EXPOSURE_WARNING, "AE Warning")
        .set(FujifilmMakernoteDirectory.TAG_GE_IMAGE_SIZE, "GE Image Size")
        .set(FujifilmMakernoteDirectory.TAG_DYNAMIC_RANGE, "Dynamic Range")
        .set(FujifilmMakernoteDirectory.TAG_FILM_MODE, "Film Mode")
        .set(FujifilmMakernoteDirectory.TAG_DYNAMIC_RANGE_SETTING, "Dynamic Range Setting")
        .set(FujifilmMakernoteDirectory.TAG_DEVELOPMENT_DYNAMIC_RANGE, "Development Dynamic Range")
        .set(FujifilmMakernoteDirectory.TAG_MIN_FOCAL_LENGTH, "Minimum Focal Length")
        .set(FujifilmMakernoteDirectory.TAG_MAX_FOCAL_LENGTH, "Maximum Focal Length")
        .set(FujifilmMakernoteDirectory.TAG_MAX_APERTURE_AT_MIN_FOCAL, "Maximum Aperture at Minimum Focal Length")
        .set(FujifilmMakernoteDirectory.TAG_MAX_APERTURE_AT_MAX_FOCAL, "Maximum Aperture at Maximum Focal Length")
        .set(FujifilmMakernoteDirectory.TAG_AUTO_DYNAMIC_RANGE, "Auto Dynamic Range")
        .set(FujifilmMakernoteDirectory.TAG_FACES_DETECTED, "Faces Detected")
        .set(FujifilmMakernoteDirectory.TAG_FACE_POSITIONS, "Face Positions")
        .set(FujifilmMakernoteDirectory.TAG_FACE_REC_INFO, "Face Detection Data")
        .set(FujifilmMakernoteDirectory.TAG_FILE_SOURCE, "File Source")
        .set(FujifilmMakernoteDirectory.TAG_ORDER_NUMBER, "Order Number")
        .set(FujifilmMakernoteDirectory.TAG_FRAME_NUMBER, "Frame Number")
        .set(FujifilmMakernoteDirectory.TAG_PARALLAX, "Parallax");
    constructor() {
        super();
        this.setDescriptor(new FujifilmMakernoteDescriptor(this));
    }
    getName(): string {
        return "Fujifilm Makernote";
    }
    getTagNameMap(): Map<number, string> {
        return FujifilmMakernoteDirectory._tagNameMap;
    }
}
