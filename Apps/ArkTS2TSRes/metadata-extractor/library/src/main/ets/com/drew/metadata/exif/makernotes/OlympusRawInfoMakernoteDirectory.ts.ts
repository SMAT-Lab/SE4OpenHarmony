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
import OlympusRawInfoMakernoteDescriptor from './OlympusRawInfoMakernoteDescriptor';
/**
 * These tags are found only in ORF images of some models (eg. C8080WZ)
 */
class OlympusRawInfoMakernoteDirectory extends Directory {
    public static TagRawInfoVersion = 0x0000;
    public static TagWbRbLevelsUsed = 0x0100;
    public static TagWbRbLevelsAuto = 0x0110;
    public static TagWbRbLevelsShade = 0x0120;
    public static TagWbRbLevelsCloudy = 0x0121;
    public static TagWbRbLevelsFineWeather = 0x0122;
    public static TagWbRbLevelsTungsten = 0x0123;
    public static TagWbRbLevelsEveningSunlight = 0x0124;
    public static TagWbRbLevelsDaylightFluor = 0x0130;
    public static TagWbRbLevelsDayWhiteFluor = 0x0131;
    public static TagWbRbLevelsCoolWhiteFluor = 0x0132;
    public static TagWbRbLevelsWhiteFluorescent = 0x0133;
    public static TagColorMatrix2 = 0x0200;
    public static TagCoringFilter = 0x0310;
    public static TagCoringValues = 0x0311;
    public static TagBlackLevel2 = 0x0600;
    public static TagYCbCrCoefficients = 0x0601;
    public static TagValidPixelDepth = 0x0611;
    public static TagCropLeft = 0x0612;
    public static TagCropTop = 0x0613;
    public static TagCropWidth = 0x0614;
    public static TagCropHeight = 0x0615;
    public static TagLightSource = 0x1000;
    //the following 5 tags all have 3 values: val, min, max
    public static TagWhiteBalanceComp = 0x1001;
    public static TagSaturationSetting = 0x1010;
    public static TagHueSetting = 0x1011;
    public static TagContrastSetting = 0x1012;
    public static TagSharpnessSetting = 0x1013;
    // settings written by Camedia Master 4.x
    public static TagCmExposureCompensation = 0x2000;
    public static TagCmWhiteBalance = 0x2001;
    public static TagCmWhiteBalanceComp = 0x2002;
    public static TagCmWhiteBalanceGrayPoint = 0x2010;
    public static TagCmSaturation = 0x2020;
    public static TagCmHue = 0x2021;
    public static TagCmContrast = 0x2022;
    public static TagCmSharpness = 0x2023;
    public static _tagNameMap: Map<number, string> = new Map([
        [OlympusRawInfoMakernoteDirectory.TagRawInfoVersion, "Raw Info Version"],
        [OlympusRawInfoMakernoteDirectory.TagWbRbLevelsUsed, "WB RB Levels Used"],
        [OlympusRawInfoMakernoteDirectory.TagWbRbLevelsAuto, "WB RB Levels Auto"],
        [OlympusRawInfoMakernoteDirectory.TagWbRbLevelsShade, "WB RB Levels Shade"],
        [OlympusRawInfoMakernoteDirectory.TagWbRbLevelsCloudy, "WB RB Levels Cloudy"],
        [OlympusRawInfoMakernoteDirectory.TagWbRbLevelsFineWeather, "WB RB Levels Fine Weather"],
        [OlympusRawInfoMakernoteDirectory.TagWbRbLevelsTungsten, "WB RB Levels Tungsten"],
        [OlympusRawInfoMakernoteDirectory.TagWbRbLevelsEveningSunlight, "WB RB Levels Evening Sunlight"],
        [OlympusRawInfoMakernoteDirectory.TagWbRbLevelsDaylightFluor, "WB RB Levels Daylight Fluor"],
        [OlympusRawInfoMakernoteDirectory.TagWbRbLevelsDayWhiteFluor, "WB RB Levels Day White Fluor"],
        [OlympusRawInfoMakernoteDirectory.TagWbRbLevelsCoolWhiteFluor, "WB RB Levels Cool White Fluor"],
        [OlympusRawInfoMakernoteDirectory.TagWbRbLevelsWhiteFluorescent, "WB RB Levels White Fluorescent"],
        [OlympusRawInfoMakernoteDirectory.TagColorMatrix2, "Color Matrix 2"],
        [OlympusRawInfoMakernoteDirectory.TagCoringFilter, "Coring Filter"],
        [OlympusRawInfoMakernoteDirectory.TagCoringValues, "Coring Values"],
        [OlympusRawInfoMakernoteDirectory.TagBlackLevel2, "Black Level 2"],
        [OlympusRawInfoMakernoteDirectory.TagYCbCrCoefficients, "YCbCrCoefficients"],
        [OlympusRawInfoMakernoteDirectory.TagValidPixelDepth, "Valid Pixel Depth"],
        [OlympusRawInfoMakernoteDirectory.TagCropLeft, "Crop Left"],
        [OlympusRawInfoMakernoteDirectory.TagCropTop, "Crop Top"],
        [OlympusRawInfoMakernoteDirectory.TagCropWidth, "Crop Width"],
        [OlympusRawInfoMakernoteDirectory.TagCropHeight, "Crop Height"],
        [OlympusRawInfoMakernoteDirectory.TagLightSource, "Light Source"],
        [OlympusRawInfoMakernoteDirectory.TagWhiteBalanceComp, "White Balance Comp"],
        [OlympusRawInfoMakernoteDirectory.TagSaturationSetting, "Saturation Setting"],
        [OlympusRawInfoMakernoteDirectory.TagHueSetting, "Hue Setting"],
        [OlympusRawInfoMakernoteDirectory.TagContrastSetting, "Contrast Setting"],
        [OlympusRawInfoMakernoteDirectory.TagSharpnessSetting, "Sharpness Setting"],
        [OlympusRawInfoMakernoteDirectory.TagCmExposureCompensation, "CM Exposure Compensation"],
        [OlympusRawInfoMakernoteDirectory.TagCmWhiteBalance, "CM White Balance"],
        [OlympusRawInfoMakernoteDirectory.TagCmWhiteBalanceComp, "CM White Balance Comp"],
        [OlympusRawInfoMakernoteDirectory.TagCmWhiteBalanceGrayPoint, "CM White Balance Gray Point"],
        [OlympusRawInfoMakernoteDirectory.TagCmSaturation, "CM Saturation"],
        [OlympusRawInfoMakernoteDirectory.TagCmHue, "CM Hue"],
        [OlympusRawInfoMakernoteDirectory.TagCmContrast, "CM Contrast"],
        [OlympusRawInfoMakernoteDirectory.TagCmSharpness, "CM Sharpness"]
    ]);
    constructor() {
        super();
        this.setDescriptor(new OlympusRawInfoMakernoteDescriptor(this));
    }
    public getName(): string {
        return "Olympus Raw Info";
    }
    protected getTagNameMap(): Map<number, string> {
        return OlympusRawInfoMakernoteDirectory._tagNameMap;
    }
}
export default OlympusRawInfoMakernoteDirectory;
