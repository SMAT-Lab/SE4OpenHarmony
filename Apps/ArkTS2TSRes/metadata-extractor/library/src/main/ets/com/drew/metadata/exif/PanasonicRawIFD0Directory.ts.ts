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
import PanasonicRawIFD0Descriptor from './PanasonicRawIFD0Descriptor';
import ExifDirectoryBase from './ExifDirectoryBase';
import Directory from '../Directory';
class PanasonicRawIFD0Directory extends Directory {
    public static readonly TagPanasonicRawVersion = 0x0001;
    public static readonly TagSensorWidth = 0x0002;
    public static readonly TagSensorHeight = 0x0003;
    public static readonly TagSensorTopBorder = 0x0004;
    public static readonly TagSensorLeftBorder = 0x0005;
    public static readonly TagSensorBottomBorder = 0x0006;
    public static readonly TagSensorRightBorder = 0x0007;
    public static readonly TagBlackLevel1 = 0x0008;
    public static readonly TagBlackLevel2 = 0x0009;
    public static readonly TagBlackLevel3 = 0x000a;
    public static readonly TagLinearityLimitRed = 0x000e;
    public static readonly TagLinearityLimitGreen = 0x000f;
    public static readonly TagLinearityLimitBlue = 0x0010;
    public static readonly TagRedBalance = 0x0011;
    public static readonly TagBlueBalance = 0x0012;
    public static readonly TagWbInfo = 0x0013;
    public static readonly TagIso = 0x0017;
    public static readonly TagHighIsoMultiplierRed = 0x0018;
    public static readonly TagHighIsoMultiplierGreen = 0x0019;
    public static readonly TagHighIsoMultiplierBlue = 0x001a;
    public static readonly TagBlackLevelRed = 0x001c;
    public static readonly TagBlackLevelGreen = 0x001d;
    public static readonly TagBlackLevelBlue = 0x001e;
    public static readonly TagWbRedLevel = 0x0024;
    public static readonly TagWbGreenLevel = 0x0025;
    public static readonly TagWbBlueLevel = 0x0026;
    public static readonly TagWbInfo2 = 0x0027;
    public static readonly TagJpgFromRaw = 0x002e;
    public static readonly TagCropTop = 0x002f;
    public static readonly TagCropLeft = 0x0030;
    public static readonly TagCropBottom = 0x0031;
    public static readonly TagCropRight = 0x0032;
    public static readonly TagMake = 0x010f;
    public static readonly TagModel = 0x0110;
    public static readonly TagStripOffsets = 0x0111;
    public static readonly TagOrientation = 0x0112;
    public static readonly TagRowsPerStrip = 0x0116;
    public static readonly TagStripByteCounts = 0x0117;
    public static readonly TagRawDataOffset = 0x0118;
    public static readonly TagDistortionInfo = 0x0119;
    private static readonly _tagNameMap: Map<number, string> = new Map<number, string>([
        [PanasonicRawIFD0Directory.TagPanasonicRawVersion, "Panasonic Raw Version"],
        [PanasonicRawIFD0Directory.TagSensorWidth, "Sensor Width"],
        [PanasonicRawIFD0Directory.TagSensorHeight, "Sensor Height"],
        [PanasonicRawIFD0Directory.TagSensorTopBorder, "Sensor Top Border"],
        [PanasonicRawIFD0Directory.TagSensorLeftBorder, "Sensor Left Border"],
        [PanasonicRawIFD0Directory.TagSensorBottomBorder, "Sensor Bottom Border"],
        [PanasonicRawIFD0Directory.TagSensorRightBorder, "Sensor Right Border"],
        [PanasonicRawIFD0Directory.TagBlackLevel1, "Black Level 1"],
        [PanasonicRawIFD0Directory.TagBlackLevel2, "Black Level 2"],
        [PanasonicRawIFD0Directory.TagBlackLevel3, "Black Level 3"],
        [PanasonicRawIFD0Directory.TagLinearityLimitRed, "Linearity Limit Red"],
        [PanasonicRawIFD0Directory.TagLinearityLimitGreen, "Linearity Limit Green"],
        [PanasonicRawIFD0Directory.TagLinearityLimitBlue, "Linearity Limit Blue"],
        [PanasonicRawIFD0Directory.TagRedBalance, "Red Balance"],
        [PanasonicRawIFD0Directory.TagBlueBalance, "Blue Balance"],
        [PanasonicRawIFD0Directory.TagIso, "ISO"],
        [PanasonicRawIFD0Directory.TagHighIsoMultiplierRed, "High ISO Multiplier Red"],
        [PanasonicRawIFD0Directory.TagHighIsoMultiplierGreen, "High ISO Multiplier Green"],
        [PanasonicRawIFD0Directory.TagHighIsoMultiplierBlue, "High ISO Multiplier Blue"],
        [PanasonicRawIFD0Directory.TagBlackLevelRed, "Black Level Red"],
        [PanasonicRawIFD0Directory.TagBlackLevelGreen, "Black Level Green"],
        [PanasonicRawIFD0Directory.TagBlackLevelBlue, "Black Level Blue"],
        [PanasonicRawIFD0Directory.TagWbRedLevel, "WB Red Level"],
        [PanasonicRawIFD0Directory.TagWbGreenLevel, "WB Green Level"],
        [PanasonicRawIFD0Directory.TagWbBlueLevel, "WB Blue Level"],
        [PanasonicRawIFD0Directory.TagJpgFromRaw, "Jpg From Raw"],
        [PanasonicRawIFD0Directory.TagCropTop, "Crop Top"],
        [PanasonicRawIFD0Directory.TagCropLeft, "Crop Left"],
        [PanasonicRawIFD0Directory.TagCropBottom, "Crop Bottom"],
        [PanasonicRawIFD0Directory.TagCropRight, "Crop Right"],
        [PanasonicRawIFD0Directory.TagMake, "Make"],
        [PanasonicRawIFD0Directory.TagModel, "Model"],
        [PanasonicRawIFD0Directory.TagStripOffsets, "Strip Offsets"],
        [PanasonicRawIFD0Directory.TagOrientation, "Orientation"],
        [PanasonicRawIFD0Directory.TagRowsPerStrip, "Rows Per Strip"],
        [PanasonicRawIFD0Directory.TagStripByteCounts, "Strip Byte Counts"],
        [PanasonicRawIFD0Directory.TagRawDataOffset, "Raw Data Offset"]
    ]);
    constructor() {
        super();
        this.setDescriptor(new PanasonicRawIFD0Descriptor(this));
    }
    public getName(): string {
        return "PanasonicRaw Exif IFD0";
    }
    protected getTagNameMap(): Map<number, string> {
        return PanasonicRawIFD0Directory._tagNameMap;
    }
}
export default PanasonicRawIFD0Directory;
