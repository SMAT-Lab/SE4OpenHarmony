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
import OlympusCameraSettingsMakernoteDescriptor from './OlympusCameraSettingsMakernoteDescriptor';
import Directory from '../../Directory';
class OlympusCameraSettingsMakernoteDirectory extends Directory {
    public static readonly TagCameraSettingsVersion = 0x0000;
    public static readonly TagPreviewImageValid = 0x0100;
    public static readonly TagPreviewImageStart = 0x0101;
    public static readonly TagPreviewImageLength = 0x0102;
    public static readonly TagExposureMode = 0x0200;
    public static readonly TagAeLock = 0x0201;
    public static readonly TagMeteringMode = 0x0202;
    public static readonly TagExposureShift = 0x0203;
    public static readonly TagNdFilter = 0x0204;
    public static readonly TagMacroMode = 0x0300;
    public static readonly TagFocusMode = 0x0301;
    public static readonly TagFocusProcess = 0x0302;
    public static readonly TagAfSearch = 0x0303;
    public static readonly TagAfAreas = 0x0304;
    public static readonly TagAfPointSelected = 0x0305;
    public static readonly TagAfFineTune = 0x0306;
    public static readonly TagAfFineTuneAdj = 0x0307;
    public static readonly TagFlashMode = 0x400;
    public static readonly TagFlashExposureComp = 0x401;
    public static readonly TagFlashRemoteControl = 0x403;
    public static readonly TagFlashControlMode = 0x404;
    public static readonly TagFlashIntensity = 0x405;
    public static readonly TagManualFlashStrength = 0x406;
    public static readonly TagWhiteBalance2 = 0x500;
    public static readonly TagWhiteBalanceTemperature = 0x501;
    public static readonly TagWhiteBalanceBracket = 0x502;
    public static readonly TagCustomSaturation = 0x503;
    public static readonly TagModifiedSaturation = 0x504;
    public static readonly TagContrastSetting = 0x505;
    public static readonly TagSharpnessSetting = 0x506;
    public static readonly TagColorSpace = 0x507;
    public static readonly TagSceneMode = 0x509;
    public static readonly TagNoiseReduction = 0x50a;
    public static readonly TagDistortionCorrection = 0x50b;
    public static readonly TagShadingCompensation = 0x50c;
    public static readonly TagCompressionFactor = 0x50d;
    public static readonly TagGradation = 0x50f;
    public static readonly TagPictureMode = 0x520;
    public static readonly TagPictureModeSaturation = 0x521;
    public static readonly TagPictureModeHue = 0x522;
    public static readonly TagPictureModeContrast = 0x523;
    public static readonly TagPictureModeSharpness = 0x524;
    public static readonly TagPictureModeBWFilter = 0x525;
    public static readonly TagPictureModeTone = 0x526;
    public static readonly TagNoiseFilter = 0x527;
    public static readonly TagArtFilter = 0x529;
    public static readonly TagMagicFilter = 0x52c;
    public static readonly TagPictureModeEffect = 0x52d;
    public static readonly TagToneLevel = 0x52e;
    public static readonly TagArtFilterEffect = 0x52f;
    public static readonly TagColorCreatorEffect = 0x532;
    public static readonly TagDriveMode = 0x600;
    public static readonly TagPanoramaMode = 0x601;
    public static readonly TagImageQuality2 = 0x603;
    public static readonly TagImageStabilization = 0x604;
    public static readonly TagStackedImage = 0x804;
    public static readonly TagManometerPressure = 0x900;
    public static readonly TagManometerReading = 0x901;
    public static readonly TagExtendedWBDetect = 0x902;
    public static readonly TagRollAngle = 0x903;
    public static readonly TagPitchAngle = 0x904;
    public static readonly TagDateTimeUtc = 0x908;
    private static readonly _tagNameMap: Map<number, string> = new Map<number, string>([
        [OlympusCameraSettingsMakernoteDirectory.TagCameraSettingsVersion, "Camera Settings Version"],
        [OlympusCameraSettingsMakernoteDirectory.TagPreviewImageValid, "Preview Image Valid"],
        [OlympusCameraSettingsMakernoteDirectory.TagPreviewImageStart, "Preview Image Start"],
        [OlympusCameraSettingsMakernoteDirectory.TagPreviewImageLength, "Preview Image Length"],
        [OlympusCameraSettingsMakernoteDirectory.TagExposureMode, "Exposure Mode"],
        [OlympusCameraSettingsMakernoteDirectory.TagAeLock, "AE Lock"],
        [OlympusCameraSettingsMakernoteDirectory.TagMeteringMode, "Metering Mode"],
        [OlympusCameraSettingsMakernoteDirectory.TagExposureShift, "Exposure Shift"],
        [OlympusCameraSettingsMakernoteDirectory.TagNdFilter, "ND Filter"],
        [OlympusCameraSettingsMakernoteDirectory.TagMacroMode, "Macro Mode"],
        [OlympusCameraSettingsMakernoteDirectory.TagFocusMode, "Focus Mode"],
        [OlympusCameraSettingsMakernoteDirectory.TagFocusProcess, "Focus Process"],
        [OlympusCameraSettingsMakernoteDirectory.TagAfSearch, "AF Search"],
        [OlympusCameraSettingsMakernoteDirectory.TagAfAreas, "AF Areas"],
        [OlympusCameraSettingsMakernoteDirectory.TagAfPointSelected, "AF Point Selected"],
        [OlympusCameraSettingsMakernoteDirectory.TagAfFineTune, "AF Fine Tune"],
        [OlympusCameraSettingsMakernoteDirectory.TagAfFineTuneAdj, "AF Fine Tune Adj"],
        [OlympusCameraSettingsMakernoteDirectory.TagFlashMode, "Flash Mode"],
        [OlympusCameraSettingsMakernoteDirectory.TagFlashExposureComp, "Flash Exposure Comp"],
        [OlympusCameraSettingsMakernoteDirectory.TagFlashRemoteControl, "Flash Remote Control"],
        [OlympusCameraSettingsMakernoteDirectory.TagFlashControlMode, "Flash Control Mode"],
        [OlympusCameraSettingsMakernoteDirectory.TagFlashIntensity, "Flash Intensity"],
        [OlympusCameraSettingsMakernoteDirectory.TagManualFlashStrength, "Manual Flash Strength"],
        [OlympusCameraSettingsMakernoteDirectory.TagWhiteBalance2, "White Balance 2"],
        [OlympusCameraSettingsMakernoteDirectory.TagWhiteBalanceTemperature, "White Balance Temperature"],
        [OlympusCameraSettingsMakernoteDirectory.TagWhiteBalanceBracket, "White Balance Bracket"],
        [OlympusCameraSettingsMakernoteDirectory.TagCustomSaturation, "Custom Saturation"],
        [OlympusCameraSettingsMakernoteDirectory.TagModifiedSaturation, "Modified Saturation"],
        [OlympusCameraSettingsMakernoteDirectory.TagContrastSetting, "Contrast Setting"],
        [OlympusCameraSettingsMakernoteDirectory.TagSharpnessSetting, "Sharpness Setting"],
        [OlympusCameraSettingsMakernoteDirectory.TagColorSpace, "Color Space"],
        [OlympusCameraSettingsMakernoteDirectory.TagSceneMode, "Scene Mode"],
        [OlympusCameraSettingsMakernoteDirectory.TagNoiseReduction, "Noise Reduction"],
        [OlympusCameraSettingsMakernoteDirectory.TagDistortionCorrection, "Distortion Correction"],
        [OlympusCameraSettingsMakernoteDirectory.TagShadingCompensation, "Shading Compensation"],
        [OlympusCameraSettingsMakernoteDirectory.TagCompressionFactor, "Compression Factor"],
        [OlympusCameraSettingsMakernoteDirectory.TagGradation, "Gradation"],
        [OlympusCameraSettingsMakernoteDirectory.TagPictureMode, "Picture Mode"],
        [OlympusCameraSettingsMakernoteDirectory.TagPictureModeSaturation, "Picture Mode Saturation"],
        [OlympusCameraSettingsMakernoteDirectory.TagPictureModeHue, "Picture Mode Hue"],
        [OlympusCameraSettingsMakernoteDirectory.TagPictureModeContrast, "Picture Mode Contrast"],
        [OlympusCameraSettingsMakernoteDirectory.TagPictureModeSharpness, "Picture Mode Sharpness"],
        [OlympusCameraSettingsMakernoteDirectory.TagPictureModeBWFilter, "Picture Mode BW Filter"],
        [OlympusCameraSettingsMakernoteDirectory.TagPictureModeTone, "Picture Mode Tone"],
        [OlympusCameraSettingsMakernoteDirectory.TagNoiseFilter, "Noise Filter"],
        [OlympusCameraSettingsMakernoteDirectory.TagArtFilter, "Art Filter"],
        [OlympusCameraSettingsMakernoteDirectory.TagMagicFilter, "Magic Filter"],
        [OlympusCameraSettingsMakernoteDirectory.TagPictureModeEffect, "Picture Mode Effect"],
        [OlympusCameraSettingsMakernoteDirectory.TagToneLevel, "Tone Level"],
        [OlympusCameraSettingsMakernoteDirectory.TagArtFilterEffect, "Art Filter Effect"],
        [OlympusCameraSettingsMakernoteDirectory.TagColorCreatorEffect, "Color Creator Effect"],
        [OlympusCameraSettingsMakernoteDirectory.TagDriveMode, "Drive Mode"],
        [OlympusCameraSettingsMakernoteDirectory.TagPanoramaMode, "Panorama Mode"],
        [OlympusCameraSettingsMakernoteDirectory.TagImageQuality2, "Image Quality 2"],
        [OlympusCameraSettingsMakernoteDirectory.TagImageStabilization, "Image Stabilization"],
        [OlympusCameraSettingsMakernoteDirectory.TagStackedImage, "Stacked Image"],
        [OlympusCameraSettingsMakernoteDirectory.TagManometerPressure, "Manometer Pressure"],
        [OlympusCameraSettingsMakernoteDirectory.TagManometerReading, "Manometer Reading"],
        [OlympusCameraSettingsMakernoteDirectory.TagExtendedWBDetect, "Extended WB Detect"],
        [OlympusCameraSettingsMakernoteDirectory.TagRollAngle, "Roll Angle"],
        [OlympusCameraSettingsMakernoteDirectory.TagPitchAngle, "Pitch Angle"],
        [OlympusCameraSettingsMakernoteDirectory.TagDateTimeUtc, "Date Time UTC"]
    ]);
    constructor() {
        super();
        this.setDescriptor(new OlympusCameraSettingsMakernoteDescriptor(this));
    }
    public getName(): string {
        return "Olympus Camera Settings";
    }
    protected getTagNameMap(): Map<number, string> {
        return OlympusCameraSettingsMakernoteDirectory._tagNameMap;
    }
}
export default OlympusCameraSettingsMakernoteDirectory;
