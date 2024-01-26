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
import { ReconyxHyperFire2MakernoteDescriptor } from './ReconyxHyperFire2MakernoteDescriptor';
import Directory from '../../Directory';
export class ReconyxHyperFire2MakernoteDirectory extends Directory {
    public static TAG_FILE_NUMBER = 16;
    public static TAG_DIRECTORY_NUMBER = 18;
    public static TAG_FIRMWARE_VERSION = 42;
    public static TAG_FIRMWARE_DATE = 48;
    public static TAG_TRIGGER_MODE = 52;
    public static TAG_SEQUENCE = 54;
    public static TAG_EVENT_NUMBER = 58;
    public static TAG_DATE_TIME_ORIGINAL = 62;
    public static TAG_DAY_OF_WEEK = 74;
    public static TAG_MOON_PHASE = 76;
    public static TAG_AMBIENT_TEMPERATURE_FAHRENHEIT = 78;
    public static TAG_AMBIENT_TEMPERATURE = 80;
    public static TAG_CONTRAST = 82;
    public static TAG_BRIGHTNESS = 84;
    public static TAG_SHARPNESS = 86;
    public static TAG_SATURATION = 88;
    public static TAG_FLASH = 90;
    public static TAG_AMBIENT_INFRARED = 92;
    public static TAG_AMBIENT_LIGHT = 94;
    public static TAG_MOTION_SENSITIVITY = 96;
    public static TAG_BATTERY_VOLTAGE = 98;
    public static TAG_BATTERY_VOLTAGE_AVG = 100;
    public static TAG_BATTERY_TYPE = 102;
    public static TAG_USER_LABEL = 104;
    public static TAG_SERIAL_NUMBER = 126;
    private static _tagNameMap: Map<number, string> = new Map<number, string>()
        .set(ReconyxHyperFire2MakernoteDirectory.TAG_FILE_NUMBER, "File Number")
        .set(ReconyxHyperFire2MakernoteDirectory.TAG_DIRECTORY_NUMBER, "Directory Number")
        .set(ReconyxHyperFire2MakernoteDirectory.TAG_FIRMWARE_VERSION, "Firmware Version")
        .set(ReconyxHyperFire2MakernoteDirectory.TAG_FIRMWARE_DATE, "Firmware Date")
        .set(ReconyxHyperFire2MakernoteDirectory.TAG_TRIGGER_MODE, "Trigger Mode")
        .set(ReconyxHyperFire2MakernoteDirectory.TAG_SEQUENCE, "Sequence")
        .set(ReconyxHyperFire2MakernoteDirectory.TAG_EVENT_NUMBER, "Event Number")
        .set(ReconyxHyperFire2MakernoteDirectory.TAG_DATE_TIME_ORIGINAL, "Date/Time Original")
        .set(ReconyxHyperFire2MakernoteDirectory.TAG_DAY_OF_WEEK, "DaY of Week")
        .set(ReconyxHyperFire2MakernoteDirectory.TAG_MOON_PHASE, "Moon Phase")
        .set(ReconyxHyperFire2MakernoteDirectory.TAG_AMBIENT_TEMPERATURE_FAHRENHEIT, "Ambient Temperature Fahrenheit")
        .set(ReconyxHyperFire2MakernoteDirectory.TAG_AMBIENT_TEMPERATURE, "Ambient Temperature")
        .set(ReconyxHyperFire2MakernoteDirectory.TAG_CONTRAST, "Contrast")
        .set(ReconyxHyperFire2MakernoteDirectory.TAG_BRIGHTNESS, "Brightness")
        .set(ReconyxHyperFire2MakernoteDirectory.TAG_SHARPNESS, "Sharpness")
        .set(ReconyxHyperFire2MakernoteDirectory.TAG_SATURATION, "Saturation")
        .set(ReconyxHyperFire2MakernoteDirectory.TAG_FLASH, "Flash")
        .set(ReconyxHyperFire2MakernoteDirectory.TAG_AMBIENT_INFRARED, "Ambient Infrared")
        .set(ReconyxHyperFire2MakernoteDirectory.TAG_AMBIENT_LIGHT, "Ambient Light")
        .set(ReconyxHyperFire2MakernoteDirectory.TAG_MOTION_SENSITIVITY, "Motion Sensitivity")
        .set(ReconyxHyperFire2MakernoteDirectory.TAG_BATTERY_VOLTAGE, "Battery Voltage")
        .set(ReconyxHyperFire2MakernoteDirectory.TAG_BATTERY_VOLTAGE_AVG, "Battery Voltage Average")
        .set(ReconyxHyperFire2MakernoteDirectory.TAG_BATTERY_TYPE, "Battery Type")
        .set(ReconyxHyperFire2MakernoteDirectory.TAG_USER_LABEL, "User Label")
        .set(ReconyxHyperFire2MakernoteDirectory.TAG_SERIAL_NUMBER, "Serial Number");
    constructor() {
        super();
        this.setDescriptor(new ReconyxHyperFire2MakernoteDescriptor(this));
    }
    public getName(): string {
        return "Reconyx HyperFire 2 Makernote";
    }
    protected getTagNameMap(): Map<number, string> {
        return ReconyxHyperFire2MakernoteDirectory._tagNameMap;
    }
}
