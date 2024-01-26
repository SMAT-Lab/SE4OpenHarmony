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
import CasioType1MakernoteDescriptor from './CasioType1MakernoteDescriptor';
export default class CasioType1MakernoteDirectory extends Directory {
    public static readonly TAG_RECORDING_MODE: number = 0x0001;
    public static readonly TAG_QUALITY: number = 0x0002;
    public static readonly TAG_FOCUSING_MODE: number = 0x0003;
    public static readonly TAG_FLASH_MODE: number = 0x0004;
    public static readonly TAG_FLASH_INTENSITY: number = 0x0005;
    public static readonly TAG_OBJECT_DISTANCE: number = 0x0006;
    public static readonly TAG_WHITE_BALANCE: number = 0x0007;
    public static readonly TAG_UNKNOWN_1: number = 0x0008;
    public static readonly TAG_UNKNOWN_2: number = 0x0009;
    public static readonly TAG_DIGITAL_ZOOM: number = 0x000A;
    public static readonly TAG_SHARPNESS: number = 0x000B;
    public static readonly TAG_CONTRAST: number = 0x000C;
    public static readonly TAG_SATURATION: number = 0x000D;
    public static readonly TAG_UNKNOWN_3: number = 0x000E;
    public static readonly TAG_UNKNOWN_4: number = 0x000F;
    public static readonly TAG_UNKNOWN_5: number = 0x0010;
    public static readonly TAG_UNKNOWN_6: number = 0x0011;
    public static readonly TAG_UNKNOWN_7: number = 0x0012;
    public static readonly TAG_UNKNOWN_8: number = 0x0013;
    public static readonly TAG_CCD_SENSITIVITY = 0x0014;
    private static readonly _tagNameMap: Map<number, string> = new Map();
    public constructor() {
        super();
        CasioType1MakernoteDirectory._tagNameMap.set(CasioType1MakernoteDirectory.TAG_CCD_SENSITIVITY, "CCD Sensitivity");
        CasioType1MakernoteDirectory._tagNameMap.set(CasioType1MakernoteDirectory.TAG_CONTRAST, "Contrast");
        CasioType1MakernoteDirectory._tagNameMap.set(CasioType1MakernoteDirectory.TAG_DIGITAL_ZOOM, "Digital Zoom");
        CasioType1MakernoteDirectory._tagNameMap.set(CasioType1MakernoteDirectory.TAG_FLASH_INTENSITY, "Flash Intensity");
        CasioType1MakernoteDirectory._tagNameMap.set(CasioType1MakernoteDirectory.TAG_FLASH_MODE, "Flash Mode");
        CasioType1MakernoteDirectory._tagNameMap.set(CasioType1MakernoteDirectory.TAG_FOCUSING_MODE, "Focusing Mode");
        CasioType1MakernoteDirectory._tagNameMap.set(CasioType1MakernoteDirectory.TAG_OBJECT_DISTANCE, "Object Distance");
        CasioType1MakernoteDirectory._tagNameMap.set(CasioType1MakernoteDirectory.TAG_QUALITY, "Quality");
        CasioType1MakernoteDirectory._tagNameMap.set(CasioType1MakernoteDirectory.TAG_RECORDING_MODE, "Recording Mode");
        CasioType1MakernoteDirectory._tagNameMap.set(CasioType1MakernoteDirectory.TAG_SATURATION, "Saturation");
        CasioType1MakernoteDirectory._tagNameMap.set(CasioType1MakernoteDirectory.TAG_SHARPNESS, "Sharpness");
        CasioType1MakernoteDirectory._tagNameMap.set(CasioType1MakernoteDirectory.TAG_UNKNOWN_1, "Makernote Unknown 1");
        CasioType1MakernoteDirectory._tagNameMap.set(CasioType1MakernoteDirectory.TAG_UNKNOWN_2, "Makernote Unknown 2");
        CasioType1MakernoteDirectory._tagNameMap.set(CasioType1MakernoteDirectory.TAG_UNKNOWN_3, "Makernote Unknown 3");
        CasioType1MakernoteDirectory._tagNameMap.set(CasioType1MakernoteDirectory.TAG_UNKNOWN_4, "Makernote Unknown 4");
        CasioType1MakernoteDirectory._tagNameMap.set(CasioType1MakernoteDirectory.TAG_UNKNOWN_5, "Makernote Unknown 5");
        CasioType1MakernoteDirectory._tagNameMap.set(CasioType1MakernoteDirectory.TAG_UNKNOWN_6, "Makernote Unknown 6");
        CasioType1MakernoteDirectory._tagNameMap.set(CasioType1MakernoteDirectory.TAG_UNKNOWN_7, "Makernote Unknown 7");
        CasioType1MakernoteDirectory._tagNameMap.set(CasioType1MakernoteDirectory.TAG_UNKNOWN_8, "Makernote Unknown 8");
        CasioType1MakernoteDirectory._tagNameMap.set(CasioType1MakernoteDirectory.TAG_WHITE_BALANCE, "White Balance");
        this.setDescriptor(new CasioType1MakernoteDescriptor(this));
    }
    public getName(): string {
        return "Casio Makernote";
    }
    protected getTagNameMap(): Map<number, string> {
        return CasioType1MakernoteDirectory._tagNameMap;
    }
}
