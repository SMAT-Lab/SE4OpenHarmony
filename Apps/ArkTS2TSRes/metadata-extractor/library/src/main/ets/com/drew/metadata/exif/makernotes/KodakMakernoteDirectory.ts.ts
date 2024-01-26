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
import { KodakMakernoteDescriptor } from './KodakMakernoteDescriptor';
import Directory from '../../Directory';
export class KodakMakernoteDirectory extends Directory {
    public static TAG_KODAK_MODEL = 0;
    public static TAG_QUALITY = 9;
    public static TAG_BURST_MODE = 10;
    public static TAG_IMAGE_WIDTH = 12;
    public static TAG_IMAGE_HEIGHT = 14;
    public static TAG_YEAR_CREATED = 16;
    public static TAG_MONTH_DAY_CREATED = 18;
    public static TAG_TIME_CREATED = 20;
    public static TAG_BURST_MODE_2 = 24;
    public static TAG_SHUTTER_MODE = 27;
    public static TAG_METERING_MODE = 28;
    public static TAG_SEQUENCE_NUMBER = 29;
    public static TAG_F_NUMBER = 30;
    public static TAG_EXPOSURE_TIME = 32;
    public static TAG_EXPOSURE_COMPENSATION = 36;
    public static TAG_FOCUS_MODE = 56;
    public static TAG_WHITE_BALANCE = 64;
    public static TAG_FLASH_MODE = 92;
    public static TAG_FLASH_FIRED = 93;
    public static TAG_ISO_SETTING = 94;
    public static TAG_ISO = 96;
    public static TAG_TOTAL_ZOOM = 98;
    public static TAG_DATE_TIME_STAMP = 100;
    public static TAG_COLOR_MODE = 102;
    public static TAG_DIGITAL_ZOOM = 104;
    public static TAG_SHARPNESS = 107;
    private static _tagNameMap: Map<number, string> = new Map<number, string>()
        .set(KodakMakernoteDirectory.TAG_KODAK_MODEL, "Kodak Model")
        .set(KodakMakernoteDirectory.TAG_QUALITY, "Quality")
        .set(KodakMakernoteDirectory.TAG_BURST_MODE, "Burst Mode")
        .set(KodakMakernoteDirectory.TAG_IMAGE_WIDTH, "Image Width")
        .set(KodakMakernoteDirectory.TAG_IMAGE_HEIGHT, "Image Height")
        .set(KodakMakernoteDirectory.TAG_YEAR_CREATED, "Year Created")
        .set(KodakMakernoteDirectory.TAG_MONTH_DAY_CREATED, "Month/Day Created")
        .set(KodakMakernoteDirectory.TAG_TIME_CREATED, "Time Created")
        .set(KodakMakernoteDirectory.TAG_BURST_MODE_2, "Burst Mode 2")
        .set(KodakMakernoteDirectory.TAG_SHUTTER_MODE, "Shutter Speed")
        .set(KodakMakernoteDirectory.TAG_METERING_MODE, "Metering Mode")
        .set(KodakMakernoteDirectory.TAG_SEQUENCE_NUMBER, "Sequence Number")
        .set(KodakMakernoteDirectory.TAG_F_NUMBER, "F Number")
        .set(KodakMakernoteDirectory.TAG_EXPOSURE_TIME, "Exposure Time")
        .set(KodakMakernoteDirectory.TAG_EXPOSURE_COMPENSATION, "Exposure Compensation")
        .set(KodakMakernoteDirectory.TAG_FOCUS_MODE, "Focus Mode")
        .set(KodakMakernoteDirectory.TAG_WHITE_BALANCE, "White Balance")
        .set(KodakMakernoteDirectory.TAG_FLASH_MODE, "Flash Mode")
        .set(KodakMakernoteDirectory.TAG_FLASH_FIRED, "Flash Fired")
        .set(KodakMakernoteDirectory.TAG_ISO_SETTING, "ISO Setting")
        .set(KodakMakernoteDirectory.TAG_ISO, "ISO")
        .set(KodakMakernoteDirectory.TAG_TOTAL_ZOOM, "Total Zoom")
        .set(KodakMakernoteDirectory.TAG_DATE_TIME_STAMP, "Date/Time Stamp")
        .set(KodakMakernoteDirectory.TAG_COLOR_MODE, "Color Mode")
        .set(KodakMakernoteDirectory.TAG_DIGITAL_ZOOM, "Digital Zoom")
        .set(KodakMakernoteDirectory.TAG_SHARPNESS, "Sharpness");
    constructor() {
        super();
        this.setDescriptor(new KodakMakernoteDescriptor(this));
    }
    public getName(): string {
        return "Kodak Makernote";
    }
    protected getTagNameMap(): Map<number, string> {
        return KodakMakernoteDirectory._tagNameMap;
    }
}
