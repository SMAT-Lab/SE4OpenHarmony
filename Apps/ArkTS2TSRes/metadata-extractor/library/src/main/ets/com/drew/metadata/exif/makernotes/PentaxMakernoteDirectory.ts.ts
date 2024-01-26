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
import PentaxMakernoteDescriptor from './PentaxMakernoteDescriptor';
import Directory from '../../Directory';
/**
 * Describes tags specific to Pentax and Asahi cameras.
 */
class PentaxMakernoteDirectory extends Directory {
    /**
     * 0 = Auto
     * 1 = Night-scene
     * 2 = Manual
     * 4 = Multiple
     */
    public static readonly TAG_CAPTURE_MODE: number = 0x0001;
    /**
     * 0 = Good
     * 1 = Better
     * 2 = Best
     */
    public static readonly TAG_QUALITY_LEVEL: number = 0x0002;
    /**
     * 2 = Custom
     * 3 = Auto
     */
    public static readonly TAG_FOCUS_MODE: number = 0x0003;
    /**
     * 1 = Auto
     * 2 = Flash on
     * 4 = Flash off
     * 6 = Red-eye Reduction
     */
    public static readonly TAG_FLASH_MODE: number = 0x0004;
    /**
     * 0 = Auto
     * 1 = Daylight
     * 2 = Shade
     * 3 = Tungsten
     * 4 = Fluorescent
     * 5 = Manual
     */
    public static readonly TAG_WHITE_BALANCE: number = 0x0007;
    /**
     * (0 = Off)
     */
    public static readonly TAG_DIGITAL_ZOOM: number = 0x000A;
    /**
     * 0 = Normal
     * 1 = Soft
     * 2 = Hard
     */
    public static readonly TAG_SHARPNESS: number = 0x000B;
    /**
     * 0 = Normal
     * 1 = Low
     * 2 = High
     */
    public static readonly TAG_CONTRAST: number = 0x000C;
    /**
     * 0 = Normal
     * 1 = Low
     * 2 = High
     */
    public static readonly TAG_SATURATION: number = 0x000D;
    /**
     * 10 = ISO 100
     * 16 = ISO 200
     * 100 = ISO 100
     * 200 = ISO 200
     */
    public static readonly TAG_ISO_SPEED: number = 0x0014;
    /**
     * 1 = Normal
     * 2 = Black &amp; White
     * 3 = Sepia
     */
    public static readonly TAG_COLOUR: number = 0x0017;
    /**
     * See Print Image Matching for specification.
     * http://www.ozhiker.com/electronics/pjmt/jpeg_info/pim.html
     */
    public static readonly TAG_PRINT_IMAGE_MATCHING_INFO: number = 0x0E00;
    /**
     * (String).
     */
    public static readonly TAG_TIME_ZONE: number = 0x1000;
    /**
     * (String).
     */
    public static readonly TAG_DAYLIGHT_SAVINGS: number = 0x1001;
    private static readonly _tagNameMap: Map<number, string> = new Map<number, string>([
        [PentaxMakernoteDirectory.TAG_CAPTURE_MODE, "Capture Mode"],
        [PentaxMakernoteDirectory.TAG_QUALITY_LEVEL, "Quality Level"],
        [PentaxMakernoteDirectory.TAG_FOCUS_MODE, "Focus Mode"],
        [PentaxMakernoteDirectory.TAG_FLASH_MODE, "Flash Mode"],
        [PentaxMakernoteDirectory.TAG_WHITE_BALANCE, "White Balance"],
        [PentaxMakernoteDirectory.TAG_DIGITAL_ZOOM, "Digital Zoom"],
        [PentaxMakernoteDirectory.TAG_SHARPNESS, "Sharpness"],
        [PentaxMakernoteDirectory.TAG_CONTRAST, "Contrast"],
        [PentaxMakernoteDirectory.TAG_SATURATION, "Saturation"],
        [PentaxMakernoteDirectory.TAG_ISO_SPEED, "ISO Speed"],
        [PentaxMakernoteDirectory.TAG_COLOUR, "Colour"],
        [PentaxMakernoteDirectory.TAG_PRINT_IMAGE_MATCHING_INFO, "Print Image Matching (PIM) Info"],
        [PentaxMakernoteDirectory.TAG_TIME_ZONE, "Time Zone"],
        [PentaxMakernoteDirectory.TAG_DAYLIGHT_SAVINGS, "Daylight Savings"]
    ]);
    public constructor() {
        super();
        this.setDescriptor(new PentaxMakernoteDescriptor(this));
    }
    public getName(): string {
        return "Pentax Makernote";
    }
    protected getTagNameMap(): Map<number, string> {
        return PentaxMakernoteDirectory._tagNameMap;
    }
}
export default PentaxMakernoteDirectory;
