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

import { ReconyxHyperFireMakernoteDescriptor } from './ReconyxHyperFireMakernoteDescriptor';
import Directory from '../../Directory';

export class ReconyxHyperFireMakernoteDirectory extends Directory {
  public static MAKERNOTE_VERSION = 61697
  public static TAG_MAKERNOTE_VERSION = 0
  public static TAG_FIRMWARE_VERSION = 2
  public static TAG_TRIGGER_MODE = 12
  public static TAG_SEQUENCE = 14
  public static TAG_EVENT_NUMBER = 18
  public static TAG_DATE_TIME_ORIGINAL = 22
  public static TAG_MOON_PHASE = 36
  public static TAG_AMBIENT_TEMPERATURE_FAHRENHEIT = 38
  public static TAG_AMBIENT_TEMPERATURE = 40
  public static TAG_SERIAL_NUMBER = 42
  public static TAG_CONTRAST = 72
  public static TAG_BRIGHTNESS = 74
  public static TAG_SHARPNESS = 76
  public static TAG_SATURATION = 78
  public static TAG_INFRARED_ILLUMINATOR = 80
  public static TAG_MOTION_SENSITIVITY = 82
  public static TAG_BATTERY_VOLTAGE = 84
  public static TAG_USER_LABEL = 86

  private static _tagNameMap: Map<number, string> = new Map<number, string>()
    .set(ReconyxHyperFireMakernoteDirectory.TAG_MAKERNOTE_VERSION, "Makernote Version")
    .set(ReconyxHyperFireMakernoteDirectory.TAG_FIRMWARE_VERSION, "Firmware Version")
    .set(ReconyxHyperFireMakernoteDirectory.TAG_TRIGGER_MODE, "Trigger Mode")
    .set(ReconyxHyperFireMakernoteDirectory.TAG_SEQUENCE, "Sequence")
    .set(ReconyxHyperFireMakernoteDirectory.TAG_EVENT_NUMBER, "Event Number")
    .set(ReconyxHyperFireMakernoteDirectory.TAG_DATE_TIME_ORIGINAL, "Date/Time Original")
    .set(ReconyxHyperFireMakernoteDirectory.TAG_MOON_PHASE, "Moon Phase")
    .set(ReconyxHyperFireMakernoteDirectory.TAG_AMBIENT_TEMPERATURE_FAHRENHEIT, "Ambient Temperature Fahrenheit")
    .set(ReconyxHyperFireMakernoteDirectory.TAG_AMBIENT_TEMPERATURE, "Ambient Temperature")
    .set(ReconyxHyperFireMakernoteDirectory.TAG_SERIAL_NUMBER, "Serial Number")
    .set(ReconyxHyperFireMakernoteDirectory.TAG_CONTRAST, "Contrast")
    .set(ReconyxHyperFireMakernoteDirectory.TAG_BRIGHTNESS, "Brightness")
    .set(ReconyxHyperFireMakernoteDirectory.TAG_SHARPNESS, "Sharpness")
    .set(ReconyxHyperFireMakernoteDirectory.TAG_SATURATION, "Saturation")
    .set(ReconyxHyperFireMakernoteDirectory.TAG_INFRARED_ILLUMINATOR, "Infrared Illuminator")
    .set(ReconyxHyperFireMakernoteDirectory.TAG_MOTION_SENSITIVITY, "Motion Sensitivity")
    .set(ReconyxHyperFireMakernoteDirectory.TAG_BATTERY_VOLTAGE, "Battery Voltage")
    .set(ReconyxHyperFireMakernoteDirectory.TAG_USER_LABEL, "User Label")


  constructor() {
    super()
    this.setDescriptor(new ReconyxHyperFireMakernoteDescriptor(this));
  }

  public getName(): string{
    return "Reconyx HyperFire Makernote";
  }

  protected getTagNameMap(): Map<number, string>{
    return ReconyxHyperFireMakernoteDirectory._tagNameMap;
  }
}