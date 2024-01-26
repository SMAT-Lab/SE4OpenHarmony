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
import OlympusRawDevelopment2MakernoteDescriptor from './OlympusRawDevelopment2MakernoteDescriptor';
/**
 * The Olympus raw development 2 makernote is used by many manufacturers (Epson, Konica, Minolta and Agfa...), and as such contains some tags
 * that appear specific to those manufacturers.
 */
class OlympusRawDevelopment2MakernoteDirectory extends Directory {
    public static TagRawDevVersion = 0x0000;
    public static TagRawDevExposureBiasValue = 0x0100;
    public static TagRawDevWhiteBalance = 0x0101;
    public static TagRawDevWhiteBalanceValue = 0x0102;
    public static TagRawDevWbFineAdjustment = 0x0103;
    public static TagRawDevGrayPoint = 0x0104;
    public static TagRawDevContrastValue = 0x0105;
    public static TagRawDevSharpnessValue = 0x0106;
    public static TagRawDevSaturationEmphasis = 0x0107;
    public static TagRawDevMemoryColorEmphasis = 0x0108;
    public static TagRawDevColorSpace = 0x0109;
    public static TagRawDevNoiseReduction = 0x010a;
    public static TagRawDevEngine = 0x010b;
    public static TagRawDevPictureMode = 0x010c;
    public static TagRawDevPmSaturation = 0x010d;
    public static TagRawDevPmContrast = 0x010e;
    public static TagRawDevPmSharpness = 0x010f;
    public static TagRawDevPmBwFilter = 0x0110;
    public static TagRawDevPmPictureTone = 0x0111;
    public static TagRawDevGradation = 0x0112;
    public static TagRawDevSaturation3 = 0x0113;
    public static TagRawDevAutoGradation = 0x0119;
    public static TagRawDevPmNoiseFilter = 0x0120;
    public static TagRawDevArtFilter = 0x0121;
    public static _tagNameMap: Map<number, string> = new Map([
        [OlympusRawDevelopment2MakernoteDirectory.TagRawDevVersion, "Raw Dev Version"],
        [OlympusRawDevelopment2MakernoteDirectory.TagRawDevExposureBiasValue, "Raw Dev Exposure Bias Value"],
        [OlympusRawDevelopment2MakernoteDirectory.TagRawDevWhiteBalance, "Raw Dev White Balance"],
        [OlympusRawDevelopment2MakernoteDirectory.TagRawDevWhiteBalanceValue, "Raw Dev White Balance Value"],
        [OlympusRawDevelopment2MakernoteDirectory.TagRawDevWbFineAdjustment, "Raw Dev WB Fine Adjustment"],
        [OlympusRawDevelopment2MakernoteDirectory.TagRawDevGrayPoint, "Raw Dev Gray Point"],
        [OlympusRawDevelopment2MakernoteDirectory.TagRawDevContrastValue, "Raw Dev Contrast Value"],
        [OlympusRawDevelopment2MakernoteDirectory.TagRawDevSharpnessValue, "Raw Dev Sharpness Value"],
        [OlympusRawDevelopment2MakernoteDirectory.TagRawDevSaturationEmphasis, "Raw Dev Saturation Emphasis"],
        [OlympusRawDevelopment2MakernoteDirectory.TagRawDevMemoryColorEmphasis, "Raw Dev Memory Color Emphasis"],
        [OlympusRawDevelopment2MakernoteDirectory.TagRawDevColorSpace, "Raw Dev Color Space"],
        [OlympusRawDevelopment2MakernoteDirectory.TagRawDevNoiseReduction, "Raw Dev Noise Reduction"],
        [OlympusRawDevelopment2MakernoteDirectory.TagRawDevEngine, "Raw Dev Engine"],
        [OlympusRawDevelopment2MakernoteDirectory.TagRawDevPictureMode, "Raw Dev Picture Mode"],
        [OlympusRawDevelopment2MakernoteDirectory.TagRawDevPmSaturation, "Raw Dev PM Saturation"],
        [OlympusRawDevelopment2MakernoteDirectory.TagRawDevPmContrast, "Raw Dev PM Contrast"],
        [OlympusRawDevelopment2MakernoteDirectory.TagRawDevPmSharpness, "Raw Dev PM Sharpness"],
        [OlympusRawDevelopment2MakernoteDirectory.TagRawDevPmBwFilter, "Raw Dev PM BW Filter"],
        [OlympusRawDevelopment2MakernoteDirectory.TagRawDevPmPictureTone, "Raw Dev PM Picture Tone"],
        [OlympusRawDevelopment2MakernoteDirectory.TagRawDevGradation, "Raw Dev Gradation"],
        [OlympusRawDevelopment2MakernoteDirectory.TagRawDevSaturation3, "Raw Dev Saturation 3"],
        [OlympusRawDevelopment2MakernoteDirectory.TagRawDevAutoGradation, "Raw Dev Auto Gradation"],
        [OlympusRawDevelopment2MakernoteDirectory.TagRawDevPmNoiseFilter, "Raw Dev PM Noise Filter"],
        [OlympusRawDevelopment2MakernoteDirectory.TagRawDevArtFilter, "Raw Dev Art Filter"],
    ]);
    constructor() {
        super();
        this.setDescriptor(new OlympusRawDevelopment2MakernoteDescriptor(this));
    }
    public getName(): string {
        return "Olympus Raw Development 2";
    }
    protected getTagNameMap(): Map<number, string> {
        return OlympusRawDevelopment2MakernoteDirectory._tagNameMap;
    }
}
export default OlympusRawDevelopment2MakernoteDirectory;
