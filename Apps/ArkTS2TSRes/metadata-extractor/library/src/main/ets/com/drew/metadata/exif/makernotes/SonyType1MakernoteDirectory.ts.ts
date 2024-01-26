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
import SonyType1MakernoteDescriptor from './SonyType1MakernoteDescriptor';
/**
 * Describes tags specific to Sony cameras that use the Sony Type 1 makernote tags.
 */
class SonyType1MakernoteDirectory extends Directory {
    public static readonly TAG_CAMERA_INFO: number = 0x0010;
    public static readonly TAG_FOCUS_INFO: number = 0x0020;
    public static readonly TAG_IMAGE_QUALITY: number = 0x0102;
    public static readonly TAG_FLASH_EXPOSURE_COMP: number = 0x0104;
    public static readonly TAG_TELECONVERTER: number = 0x0105;
    public static readonly TAG_WHITE_BALANCE_FINE_TUNE: number = 0x0112;
    public static readonly TAG_CAMERA_SETTINGS: number = 0x0114;
    public static readonly TAG_WHITE_BALANCE: number = 0x0115;
    public static readonly TAG_EXTRA_INFO: number = 0x0116;
    public static readonly TAG_PRINT_IMAGE_MATCHING_INFO: number = 0x0E00;
    public static readonly TAG_MULTI_BURST_MODE: number = 0x1000;
    public static readonly TAG_MULTI_BURST_IMAGE_WIDTH: number = 0x1001;
    public static readonly TAG_MULTI_BURST_IMAGE_HEIGHT: number = 0x1002;
    public static readonly TAG_PANORAMA: number = 0x1003;
    public static readonly TAG_PREVIEW_IMAGE: number = 0x2001;
    public static readonly TAG_RATING: number = 0x2002;
    public static readonly TAG_CONTRAST: number = 0x2004;
    public static readonly TAG_SATURATION: number = 0x2005;
    public static readonly TAG_SHARPNESS: number = 0x2006;
    public static readonly TAG_BRIGHTNESS: number = 0x2007;
    public static readonly TAG_LONG_EXPOSURE_NOISE_REDUCTION: number = 0x2008;
    public static readonly TAG_HIGH_ISO_NOISE_REDUCTION: number = 0x2009;
    public static readonly TAG_HDR: number = 0x200a;
    public static readonly TAG_MULTI_FRAME_NOISE_REDUCTION: number = 0x200b;
    public static readonly TAG_PICTURE_EFFECT: number = 0x200e;
    public static readonly TAG_SOFT_SKIN_EFFECT: number = 0x200f;
    public static readonly TAG_VIGNETTING_CORRECTION: number = 0x2011;
    public static readonly TAG_LATERAL_CHROMATIC_ABERRATION: number = 0x2012;
    public static readonly TAG_DISTORTION_CORRECTION: number = 0x2013;
    public static readonly TAG_WB_SHIFT_AMBER_MAGENTA: number = 0x2014;
    public static readonly TAG_AUTO_PORTRAIT_FRAMED: number = 0x2016;
    public static readonly TAG_FOCUS_MODE: number = 0x201b;
    public static readonly TAG_AF_POINT_SELECTED: number = 0x201e;
    public static readonly TAG_SHOT_INFO: number = 0x3000;
    public static readonly TAG_FILE_FORMAT: number = 0xb000;
    public static readonly TAG_SONY_MODEL_ID: number = 0xb001;
    public static readonly TAG_COLOR_MODE_SETTING: number = 0xb020;
    public static readonly TAG_COLOR_TEMPERATURE: number = 0xb021;
    public static readonly TAG_COLOR_COMPENSATION_FILTER: number = 0xb022;
    public static readonly TAG_SCENE_MODE: number = 0xb023;
    public static readonly TAG_ZONE_MATCHING: number = 0xb024;
    public static readonly TAG_DYNAMIC_RANGE_OPTIMISER: number = 0xb025;
    public static readonly TAG_IMAGE_STABILISATION: number = 0xb026;
    public static readonly TAG_LENS_ID: number = 0xb027;
    public static readonly TAG_MINOLTA_MAKERNOTE: number = 0xb028;
    public static readonly TAG_COLOR_MODE: number = 0xb029;
    public static readonly TAG_LENS_SPEC: number = 0xb02a;
    public static readonly TAG_FULL_IMAGE_SIZE: number = 0xb02b;
    public static readonly TAG_PREVIEW_IMAGE_SIZE: number = 0xb02c;
    public static readonly TAG_MACRO: number = 0xb040;
    public static readonly TAG_EXPOSURE_MODE: number = 0xb041;
    public static readonly TAG_FOCUS_MODE_2: number = 0xb042;
    public static readonly TAG_AF_MODE: number = 0xb043;
    public static readonly TAG_AF_ILLUMINATOR: number = 0xb044;
    public static readonly TAG_JPEG_QUALITY: number = 0xb047;
    public static readonly TAG_FLASH_LEVEL: number = 0xb048;
    public static readonly TAG_RELEASE_MODE: number = 0xb049;
    public static readonly TAG_SEQUENCE_NUMBER: number = 0xb04a;
    public static readonly TAG_ANTI_BLUR: number = 0xb04b;
    /**
     * (FocusMode for RX100)
     * 0 = Manual
     * 2 = AF-S
     * 3 = AF-C
     * 5 = Semi-manual
     * 6 = Direct Manual Focus
     * (LongExposureNoiseReduction for other models)
     * 0 = Off
     * 1 = On
     * 2 = On 2
     * 65535 = n/a
     */
    public static readonly TAG_LONG_EXPOSURE_NOISE_REDUCTION_OR_FOCUS_MODE: number = 0xb04e;
    public static readonly TAG_DYNAMIC_RANGE_OPTIMIZER: number = 0xb04f;
    public static readonly TAG_HIGH_ISO_NOISE_REDUCTION_2: number = 0xb050;
    public static readonly TAG_INTELLIGENT_AUTO: number = 0xb052;
    public static readonly TAG_WHITE_BALANCE_2: number = 0xb054;
    public static readonly TAG_NO_PRINT: number = 0xFFFF;
    private static readonly _tagNameMap: Map<number, string> = new Map<number, string>([
        [SonyType1MakernoteDirectory.TAG_CAMERA_INFO, "Camera Info"],
        [SonyType1MakernoteDirectory.TAG_FOCUS_INFO, "Focus Info"],
        [SonyType1MakernoteDirectory.TAG_IMAGE_QUALITY, "Image Quality"],
        [SonyType1MakernoteDirectory.TAG_FLASH_EXPOSURE_COMP, "Flash Exposure Compensation"],
        [SonyType1MakernoteDirectory.TAG_TELECONVERTER, "Teleconverter Model"],
        [SonyType1MakernoteDirectory.TAG_WHITE_BALANCE_FINE_TUNE, "White Balance Fine Tune Value"],
        [SonyType1MakernoteDirectory.TAG_CAMERA_SETTINGS, "Camera Settings"],
        [SonyType1MakernoteDirectory.TAG_WHITE_BALANCE, "White Balance"],
        [SonyType1MakernoteDirectory.TAG_EXTRA_INFO, "Extra Info"],
        [SonyType1MakernoteDirectory.TAG_PRINT_IMAGE_MATCHING_INFO, "Print Image Matching (PIM) Info"],
        [SonyType1MakernoteDirectory.TAG_MULTI_BURST_MODE, "Multi Burst Mode"],
        [SonyType1MakernoteDirectory.TAG_MULTI_BURST_IMAGE_WIDTH, "Multi Burst Image Width"],
        [SonyType1MakernoteDirectory.TAG_MULTI_BURST_IMAGE_HEIGHT, "Multi Burst Image Height"],
        [SonyType1MakernoteDirectory.TAG_PANORAMA, "Panorama"],
        [SonyType1MakernoteDirectory.TAG_PREVIEW_IMAGE, "Preview Image"],
        [SonyType1MakernoteDirectory.TAG_RATING, "Rating"],
        [SonyType1MakernoteDirectory.TAG_CONTRAST, "Contrast"],
        [SonyType1MakernoteDirectory.TAG_SATURATION, "Saturation"],
        [SonyType1MakernoteDirectory.TAG_SHARPNESS, "Sharpness"],
        [SonyType1MakernoteDirectory.TAG_BRIGHTNESS, "Brightness"],
        [SonyType1MakernoteDirectory.TAG_LONG_EXPOSURE_NOISE_REDUCTION, "Long Exposure Noise Reduction"],
        [SonyType1MakernoteDirectory.TAG_HIGH_ISO_NOISE_REDUCTION, "High ISO Noise Reduction"],
        [SonyType1MakernoteDirectory.TAG_HDR, "HDR"],
        [SonyType1MakernoteDirectory.TAG_MULTI_FRAME_NOISE_REDUCTION, "Multi Frame Noise Reduction"],
        [SonyType1MakernoteDirectory.TAG_PICTURE_EFFECT, "Picture Effect"],
        [SonyType1MakernoteDirectory.TAG_SOFT_SKIN_EFFECT, "Soft Skin Effect"],
        [SonyType1MakernoteDirectory.TAG_VIGNETTING_CORRECTION, "Vignetting Correction"],
        [SonyType1MakernoteDirectory.TAG_LATERAL_CHROMATIC_ABERRATION, "Lateral Chromatic Aberration"],
        [SonyType1MakernoteDirectory.TAG_DISTORTION_CORRECTION, "Distortion Correction"],
        [SonyType1MakernoteDirectory.TAG_WB_SHIFT_AMBER_MAGENTA, "WB Shift Amber/Magenta"],
        [SonyType1MakernoteDirectory.TAG_AUTO_PORTRAIT_FRAMED, "Auto Portrait Framing"],
        [SonyType1MakernoteDirectory.TAG_FOCUS_MODE, "Focus Mode"],
        [SonyType1MakernoteDirectory.TAG_AF_POINT_SELECTED, "AF Point Selected"],
        [SonyType1MakernoteDirectory.TAG_SHOT_INFO, "Shot Info"],
        [SonyType1MakernoteDirectory.TAG_FILE_FORMAT, "File Format"],
        [SonyType1MakernoteDirectory.TAG_SONY_MODEL_ID, "Sony Model ID"],
        [SonyType1MakernoteDirectory.TAG_COLOR_MODE_SETTING, "Color Mode Setting"],
        [SonyType1MakernoteDirectory.TAG_COLOR_TEMPERATURE, "Color Temperature"],
        [SonyType1MakernoteDirectory.TAG_COLOR_COMPENSATION_FILTER, "Color Compensation Filter"],
        [SonyType1MakernoteDirectory.TAG_SCENE_MODE, "Scene Mode"],
        [SonyType1MakernoteDirectory.TAG_ZONE_MATCHING, "Zone Matching"],
        [SonyType1MakernoteDirectory.TAG_DYNAMIC_RANGE_OPTIMISER, "Dynamic Range Optimizer"],
        [SonyType1MakernoteDirectory.TAG_IMAGE_STABILISATION, "Image Stabilisation"],
        [SonyType1MakernoteDirectory.TAG_LENS_ID, "Lens ID"],
        [SonyType1MakernoteDirectory.TAG_MINOLTA_MAKERNOTE, "Minolta Makernote"],
        [SonyType1MakernoteDirectory.TAG_COLOR_MODE, "Color Mode"],
        [SonyType1MakernoteDirectory.TAG_LENS_SPEC, "Lens Spec"],
        [SonyType1MakernoteDirectory.TAG_FULL_IMAGE_SIZE, "Full Image Size"],
        [SonyType1MakernoteDirectory.TAG_PREVIEW_IMAGE_SIZE, "Preview Image Size"],
        [SonyType1MakernoteDirectory.TAG_MACRO, "Macro"],
        [SonyType1MakernoteDirectory.TAG_EXPOSURE_MODE, "Exposure Mode"],
        [SonyType1MakernoteDirectory.TAG_FOCUS_MODE_2, "Focus Mode"],
        [SonyType1MakernoteDirectory.TAG_AF_MODE, "AF Mode"],
        [SonyType1MakernoteDirectory.TAG_AF_ILLUMINATOR, "AF Illuminator"],
        [SonyType1MakernoteDirectory.TAG_JPEG_QUALITY, "Quality"],
        [SonyType1MakernoteDirectory.TAG_FLASH_LEVEL, "Flash Level"],
        [SonyType1MakernoteDirectory.TAG_RELEASE_MODE, "Release Mode"],
        [SonyType1MakernoteDirectory.TAG_SEQUENCE_NUMBER, "Sequence Number"],
        [SonyType1MakernoteDirectory.TAG_ANTI_BLUR, "Anti Blur"],
        [SonyType1MakernoteDirectory.TAG_LONG_EXPOSURE_NOISE_REDUCTION_OR_FOCUS_MODE, "Long Exposure Noise Reduction"],
        [SonyType1MakernoteDirectory.TAG_DYNAMIC_RANGE_OPTIMIZER, "Dynamic Range Optimizer"],
        [SonyType1MakernoteDirectory.TAG_HIGH_ISO_NOISE_REDUCTION_2, "High ISO Noise Reduction"],
        [SonyType1MakernoteDirectory.TAG_INTELLIGENT_AUTO, "Intelligent Auto"],
        [SonyType1MakernoteDirectory.TAG_WHITE_BALANCE_2, "White Balance 2"],
        [SonyType1MakernoteDirectory.TAG_NO_PRINT, "No Print"],
    ]);
    public constructor() {
        super();
        this.setDescriptor(new SonyType1MakernoteDescriptor(this));
    }
    public getName(): string {
        return "Sony Makernote";
    }
    protected getTagNameMap(): Map<number, string> {
        return SonyType1MakernoteDirectory._tagNameMap;
    }
}
export default SonyType1MakernoteDirectory;
