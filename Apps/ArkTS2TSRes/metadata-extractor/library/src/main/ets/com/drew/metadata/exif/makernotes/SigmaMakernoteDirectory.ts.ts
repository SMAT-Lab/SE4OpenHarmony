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
import { SigmaMakernoteDescriptor } from './SigmaMakernoteDescriptor';
import Directory from '../../Directory';
export class SigmaMakernoteDirectory extends Directory {
    public static TAG_SERIAL_NUMBER = 0x2;
    public static TAG_DRIVE_MODE = 0x3;
    public static TAG_RESOLUTION_MODE = 0x4;
    public static TAG_AUTO_FOCUS_MODE = 0x5;
    public static TAG_FOCUS_SETTING = 0x6;
    public static TAG_WHITE_BALANCE = 0x7;
    public static TAG_EXPOSURE_MODE = 0x8;
    public static TAG_METERING_MODE = 0x9;
    public static TAG_LENS_RANGE = 0xa;
    public static TAG_COLOR_SPACE = 0xb;
    public static TAG_EXPOSURE = 0xc;
    public static TAG_CONTRAST = 0xd;
    public static TAG_SHADOW = 0xe;
    public static TAG_HIGHLIGHT = 0xf;
    public static TAG_SATURATION = 0x10;
    public static TAG_SHARPNESS = 0x11;
    public static TAG_FILL_LIGHT = 0x12;
    public static TAG_COLOR_ADJUSTMENT = 0x14;
    public static TAG_ADJUSTMENT_MODE = 0x15;
    public static TAG_QUALITY = 0x16;
    public static TAG_FIRMWARE = 0x17;
    public static TAG_SOFTWARE = 0x18;
    public static TAG_AUTO_BRACKET = 0x19;
    private static _tagNameMap: Map<number, string> = new Map<number, string>()
        .set(SigmaMakernoteDirectory.TAG_SERIAL_NUMBER, "Serial Number")
        .set(SigmaMakernoteDirectory.TAG_DRIVE_MODE, "Drive Mode")
        .set(SigmaMakernoteDirectory.TAG_RESOLUTION_MODE, "Resolution Mode")
        .set(SigmaMakernoteDirectory.TAG_AUTO_FOCUS_MODE, "Auto Focus Mode")
        .set(SigmaMakernoteDirectory.TAG_FOCUS_SETTING, "Focus Setting")
        .set(SigmaMakernoteDirectory.TAG_WHITE_BALANCE, "White Balance")
        .set(SigmaMakernoteDirectory.TAG_EXPOSURE_MODE, "Exposure Mode")
        .set(SigmaMakernoteDirectory.TAG_METERING_MODE, "Metering Mode")
        .set(SigmaMakernoteDirectory.TAG_LENS_RANGE, "Lens Range")
        .set(SigmaMakernoteDirectory.TAG_COLOR_SPACE, "Color Space")
        .set(SigmaMakernoteDirectory.TAG_EXPOSURE, "Exposure")
        .set(SigmaMakernoteDirectory.TAG_CONTRAST, "Contrast")
        .set(SigmaMakernoteDirectory.TAG_SHADOW, "Shadow")
        .set(SigmaMakernoteDirectory.TAG_HIGHLIGHT, "Highlight")
        .set(SigmaMakernoteDirectory.TAG_SATURATION, "Saturation")
        .set(SigmaMakernoteDirectory.TAG_SHARPNESS, "Sharpness")
        .set(SigmaMakernoteDirectory.TAG_FILL_LIGHT, "Fill Light")
        .set(SigmaMakernoteDirectory.TAG_COLOR_ADJUSTMENT, "Color Adjustment")
        .set(SigmaMakernoteDirectory.TAG_ADJUSTMENT_MODE, "Adjustment Mode")
        .set(SigmaMakernoteDirectory.TAG_QUALITY, "Quality")
        .set(SigmaMakernoteDirectory.TAG_FIRMWARE, "Firmware")
        .set(SigmaMakernoteDirectory.TAG_SOFTWARE, "Software")
        .set(SigmaMakernoteDirectory.TAG_AUTO_BRACKET, "Auto Bracket");
    constructor() {
        super();
        this.setDescriptor(new SigmaMakernoteDescriptor(this));
    }
    public getName(): string {
        return "Sigma Makernote";
    }
    protected getTagNameMap(): Map<number, string> {
        return SigmaMakernoteDirectory._tagNameMap;
    }
}
