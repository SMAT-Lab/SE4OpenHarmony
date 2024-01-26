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
import OlympusImageProcessingMakernoteDescriptor from './OlympusImageProcessingMakernoteDescriptor';
/**
 * The Olympus image processing makernote is used by many manufacturers (Epson, Konica, Minolta and Agfa...), and as such contains some tags
 * that appear specific to those manufacturers.
 */
class OlympusImageProcessingMakernoteDirectory extends Directory {
    public static TagImageProcessingVersion = 0x0000;
    public static TagWbRbLevels = 0x0100;
    // 0x0101 - in-camera AutoWB unless it is all 0's or all 256's (ref IB)
    public static TagWbRbLevels3000K = 0x0102;
    public static TagWbRbLevels3300K = 0x0103;
    public static TagWbRbLevels3600K = 0x0104;
    public static TagWbRbLevels3900K = 0x0105;
    public static TagWbRbLevels4000K = 0x0106;
    public static TagWbRbLevels4300K = 0x0107;
    public static TagWbRbLevels4500K = 0x0108;
    public static TagWbRbLevels4800K = 0x0109;
    public static TagWbRbLevels5300K = 0x010a;
    public static TagWbRbLevels6000K = 0x010b;
    public static TagWbRbLevels6600K = 0x010c;
    public static TagWbRbLevels7500K = 0x010d;
    public static TagWbRbLevelsCwB1 = 0x010e;
    public static TagWbRbLevelsCwB2 = 0x010f;
    public static TagWbRbLevelsCwB3 = 0x0110;
    public static TagWbRbLevelsCwB4 = 0x0111;
    public static TagWbGLevel3000K = 0x0113;
    public static TagWbGLevel3300K = 0x0114;
    public static TagWbGLevel3600K = 0x0115;
    public static TagWbGLevel3900K = 0x0116;
    public static TagWbGLevel4000K = 0x0117;
    public static TagWbGLevel4300K = 0x0118;
    public static TagWbGLevel4500K = 0x0119;
    public static TagWbGLevel4800K = 0x011a;
    public static TagWbGLevel5300K = 0x011b;
    public static TagWbGLevel6000K = 0x011c;
    public static TagWbGLevel6600K = 0x011d;
    public static TagWbGLevel7500K = 0x011e;
    public static TagWbGLevel = 0x011f;
    // 0x0121 = WB preset for flash (about 6000K) (ref IB)
    // 0x0125 = WB preset for underwater (ref IB)
    public static TagColorMatrix = 0x0200;
    // color matrices (ref 11):
    // 0x0201-0x020d are sRGB color matrices
    // 0x020e-0x021a are Adobe RGB color matrices
    // 0x021b-0x0227 are ProPhoto RGB color matrices
    // 0x0228 and 0x0229 are ColorMatrix for E-330
    // 0x0250-0x0252 are sRGB color matrices
    // 0x0253-0x0255 are Adobe RGB color matrices
    // 0x0256-0x0258 are ProPhoto RGB color matrices
    public static TagEnhancer = 0x0300;
    public static TagEnhancerValues = 0x0301;
    public static TagCoringFilter = 0x0310;
    public static TagCoringValues = 0x0311;
    public static TagBlackLevel2 = 0x0600;
    public static TagGainBase = 0x0610;
    public static TagValidBits = 0x0611;
    public static TagCropLeft = 0x0612;
    public static TagCropTop = 0x0613;
    public static TagCropWidth = 0x0614;
    public static TagCropHeight = 0x0615;
    public static TagUnknownBlock1 = 0x0635;
    public static TagUnknownBlock2 = 0x0636;
    // 0x0800 LensDistortionParams, float[9] (ref 11)
    // 0x0801 LensShadingParams, int16u[16] (ref 11)
    public static TagSensorCalibration = 0x0805;
    public static TagNoiseReduction2 = 0x1010;
    public static TagDistortionCorrection2 = 0x1011;
    public static TagShadingCompensation2 = 0x1012;
    public static TagMultipleExposureMode = 0x101c;
    public static TagUnknownBlock3 = 0x1103;
    public static TagUnknownBlock4 = 0x1104;
    public static TagAspectRatio = 0x1112;
    public static TagAspectFrame = 0x1113;
    public static TagFacesDetected = 0x1200;
    public static TagFaceDetectArea = 0x1201;
    public static TagMaxFaces = 0x1202;
    public static TagFaceDetectFrameSize = 0x1203;
    public static TagFaceDetectFrameCrop = 0x1207;
    public static TagCameraTemperature = 0x1306;
    public static TagKeystoneCompensation = 0x1900;
    public static TagKeystoneDirection = 0x1901;
    // 0x1905 - focal length (PH, E-M1)
    public static TagKeystoneValue = 0x1906;
    public static _tagNameMap: Map<number, string> = new Map([
        [OlympusImageProcessingMakernoteDirectory.TagImageProcessingVersion, "Image Processing Version"],
        [OlympusImageProcessingMakernoteDirectory.TagWbRbLevels, "WB RB Levels"],
        [OlympusImageProcessingMakernoteDirectory.TagWbRbLevels3000K, "WB RB Levels 3000K"],
        [OlympusImageProcessingMakernoteDirectory.TagWbRbLevels3300K, "WB RB Levels 3300K"],
        [OlympusImageProcessingMakernoteDirectory.TagWbRbLevels3600K, "WB RB Levels 3600K"],
        [OlympusImageProcessingMakernoteDirectory.TagWbRbLevels3900K, "WB RB Levels 3900K"],
        [OlympusImageProcessingMakernoteDirectory.TagWbRbLevels4000K, "WB RB Levels 4000K"],
        [OlympusImageProcessingMakernoteDirectory.TagWbRbLevels4300K, "WB RB Levels 4300K"],
        [OlympusImageProcessingMakernoteDirectory.TagWbRbLevels4500K, "WB RB Levels 4500K"],
        [OlympusImageProcessingMakernoteDirectory.TagWbRbLevels4800K, "WB RB Levels 4800K"],
        [OlympusImageProcessingMakernoteDirectory.TagWbRbLevels5300K, "WB RB Levels 5300K"],
        [OlympusImageProcessingMakernoteDirectory.TagWbRbLevels6000K, "WB RB Levels 6000K"],
        [OlympusImageProcessingMakernoteDirectory.TagWbRbLevels6600K, "WB RB Levels 6600K"],
        [OlympusImageProcessingMakernoteDirectory.TagWbRbLevels7500K, "WB RB Levels 7500K"],
        [OlympusImageProcessingMakernoteDirectory.TagWbRbLevelsCwB1, "WB RB Levels CWB1"],
        [OlympusImageProcessingMakernoteDirectory.TagWbRbLevelsCwB2, "WB RB Levels CWB2"],
        [OlympusImageProcessingMakernoteDirectory.TagWbRbLevelsCwB3, "WB RB Levels CWB3"],
        [OlympusImageProcessingMakernoteDirectory.TagWbRbLevelsCwB4, "WB RB Levels CWB4"],
        [OlympusImageProcessingMakernoteDirectory.TagWbGLevel3000K, "WB G Level 3000K"],
        [OlympusImageProcessingMakernoteDirectory.TagWbGLevel3300K, "WB G Level 3300K"],
        [OlympusImageProcessingMakernoteDirectory.TagWbGLevel3600K, "WB G Level 3600K"],
        [OlympusImageProcessingMakernoteDirectory.TagWbGLevel3900K, "WB G Level 3900K"],
        [OlympusImageProcessingMakernoteDirectory.TagWbGLevel4000K, "WB G Level 4000K"],
        [OlympusImageProcessingMakernoteDirectory.TagWbGLevel4300K, "WB G Level 4300K"],
        [OlympusImageProcessingMakernoteDirectory.TagWbGLevel4500K, "WB G Level 4500K"],
        [OlympusImageProcessingMakernoteDirectory.TagWbGLevel4800K, "WB G Level 4800K"],
        [OlympusImageProcessingMakernoteDirectory.TagWbGLevel5300K, "WB G Level 5300K"],
        [OlympusImageProcessingMakernoteDirectory.TagWbGLevel6000K, "WB G Level 6000K"],
        [OlympusImageProcessingMakernoteDirectory.TagWbGLevel6600K, "WB G Level 6600K"],
        [OlympusImageProcessingMakernoteDirectory.TagWbGLevel7500K, "WB G Level 7500K"],
        [OlympusImageProcessingMakernoteDirectory.TagWbGLevel, "WB G Level"],
        [OlympusImageProcessingMakernoteDirectory.TagColorMatrix, "Color Matrix"],
        [OlympusImageProcessingMakernoteDirectory.TagEnhancer, "Enhancer"],
        [OlympusImageProcessingMakernoteDirectory.TagEnhancerValues, "Enhancer Values"],
        [OlympusImageProcessingMakernoteDirectory.TagCoringFilter, "Coring Filter"],
        [OlympusImageProcessingMakernoteDirectory.TagCoringValues, "Coring Values"],
        [OlympusImageProcessingMakernoteDirectory.TagBlackLevel2, "Black Level 2"],
        [OlympusImageProcessingMakernoteDirectory.TagGainBase, "Gain Base"],
        [OlympusImageProcessingMakernoteDirectory.TagValidBits, "Valid Bits"],
        [OlympusImageProcessingMakernoteDirectory.TagCropLeft, "Crop Left"],
        [OlympusImageProcessingMakernoteDirectory.TagCropTop, "Crop Top"],
        [OlympusImageProcessingMakernoteDirectory.TagCropWidth, "Crop Width"],
        [OlympusImageProcessingMakernoteDirectory.TagCropHeight, "Crop Height"],
        [OlympusImageProcessingMakernoteDirectory.TagUnknownBlock1, "Unknown Block 1"],
        [OlympusImageProcessingMakernoteDirectory.TagUnknownBlock2, "Unknown Block 2"],
        [OlympusImageProcessingMakernoteDirectory.TagSensorCalibration, "Sensor Calibration"],
        [OlympusImageProcessingMakernoteDirectory.TagNoiseReduction2, "Noise Reduction 2"],
        [OlympusImageProcessingMakernoteDirectory.TagDistortionCorrection2, "Distortion Correction 2"],
        [OlympusImageProcessingMakernoteDirectory.TagShadingCompensation2, "Shading Compensation 2"],
        [OlympusImageProcessingMakernoteDirectory.TagMultipleExposureMode, "Multiple Exposure Mode"],
        [OlympusImageProcessingMakernoteDirectory.TagUnknownBlock3, "Unknown Block 3"],
        [OlympusImageProcessingMakernoteDirectory.TagUnknownBlock4, "Unknown Block 4"],
        [OlympusImageProcessingMakernoteDirectory.TagAspectRatio, "Aspect Ratio"],
        [OlympusImageProcessingMakernoteDirectory.TagAspectFrame, "Aspect Frame"],
        [OlympusImageProcessingMakernoteDirectory.TagFacesDetected, "Faces Detected"],
        [OlympusImageProcessingMakernoteDirectory.TagFaceDetectArea, "Face Detect Area"],
        [OlympusImageProcessingMakernoteDirectory.TagMaxFaces, "Max Faces"],
        [OlympusImageProcessingMakernoteDirectory.TagFaceDetectFrameSize, "Face Detect Frame Size"],
        [OlympusImageProcessingMakernoteDirectory.TagFaceDetectFrameCrop, "Face Detect Frame Crop"],
        [OlympusImageProcessingMakernoteDirectory.TagCameraTemperature, "Camera Temperature"],
        [OlympusImageProcessingMakernoteDirectory.TagKeystoneCompensation, "Keystone Compensation"],
        [OlympusImageProcessingMakernoteDirectory.TagKeystoneDirection, "Keystone Direction"],
        [OlympusImageProcessingMakernoteDirectory.TagKeystoneValue, "Keystone Value"],
    ]);
    constructor() {
        super();
        this.setDescriptor(new OlympusImageProcessingMakernoteDescriptor(this));
    }
    public getName(): string {
        return "Olympus Image Processing";
    }
    protected getTagNameMap(): Map<number, string> {
        return OlympusImageProcessingMakernoteDirectory._tagNameMap;
    }
}
export default OlympusImageProcessingMakernoteDirectory;
