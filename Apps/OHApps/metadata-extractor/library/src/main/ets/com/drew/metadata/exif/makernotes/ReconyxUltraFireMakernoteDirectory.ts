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

import { ReconyxUltraFireMakernoteDescriptor } from './ReconyxUltraFireMakernoteDescriptor';
import Directory from '../../Directory';

export class ReconyxUltraFireMakernoteDirectory extends Directory {
  public static MAKERNOTE_ID = 0x00010000
  public static MAKERNOTE_PUBLIC_ID = 0x07f10001
  public static TAG_LABEL = 0
  public static TAG_MAKERNOTE_ID = 10
  public static TAG_MAKERNOTE_SIZE = 14
  public static TAG_MAKERNOTE_PUBLIC_ID = 18
  public static TAG_MAKERNOTE_PUBLIC_SIZE = 22
  public static TAG_CAMERA_VERSION = 24
  public static TAG_UIB_VERSION = 31
  public static TAG_BTL_VERSION = 38
  public static TAG_PEX_VERSION = 45
  public static TAG_EVENT_TYPE = 52
  public static TAG_SEQUENCE = 53
  public static TAG_EVENT_NUMBER = 55
  public static TAG_DATE_TIME_ORIGINAL = 59
  public static TAG_DAY_OF_WEEK = 66
  public static TAG_MOON_PHASE = 67
  public static TAG_AMBIENT_TEMPERATURE_FAHRENHEIT = 68
  public static TAG_AMBIENT_TEMPERATURE = 70
  public static TAG_FLASH = 72
  public static TAG_BATTERY_VOLTAGE = 73
  public static TAG_SERIAL_NUMBER = 75
  public static TAG_USER_LABEL = 80

  private static _tagNameMap: Map<number, string> = new Map<number, string>()
    .set(ReconyxUltraFireMakernoteDirectory.TAG_LABEL, "Makernote Label")
    .set(ReconyxUltraFireMakernoteDirectory.TAG_MAKERNOTE_ID, "Makernote ID")
    .set(ReconyxUltraFireMakernoteDirectory.TAG_MAKERNOTE_SIZE, "Makernote Size")
    .set(ReconyxUltraFireMakernoteDirectory.TAG_MAKERNOTE_PUBLIC_ID, "Makernote Public ID")
    .set(ReconyxUltraFireMakernoteDirectory.TAG_MAKERNOTE_PUBLIC_SIZE, "Makernote Public Size")
    .set(ReconyxUltraFireMakernoteDirectory.TAG_CAMERA_VERSION, "Camera Version")
    .set(ReconyxUltraFireMakernoteDirectory.TAG_UIB_VERSION, "Uib Version")
    .set(ReconyxUltraFireMakernoteDirectory.TAG_BTL_VERSION, "Btl Version")
    .set(ReconyxUltraFireMakernoteDirectory.TAG_PEX_VERSION, "Pex Version")
    .set(ReconyxUltraFireMakernoteDirectory.TAG_EVENT_TYPE, "Event Type")
    .set(ReconyxUltraFireMakernoteDirectory.TAG_SEQUENCE, "Sequence")
    .set(ReconyxUltraFireMakernoteDirectory.TAG_EVENT_NUMBER, "Event Number")
    .set(ReconyxUltraFireMakernoteDirectory.TAG_DATE_TIME_ORIGINAL, "Date/Time Original")
    .set(ReconyxUltraFireMakernoteDirectory.TAG_DAY_OF_WEEK, "Day of Week")
    .set(ReconyxUltraFireMakernoteDirectory.TAG_MOON_PHASE, "Moon Phase")
    .set(ReconyxUltraFireMakernoteDirectory.TAG_AMBIENT_TEMPERATURE_FAHRENHEIT, "Ambient Temperature Fahrenheit")
    .set(ReconyxUltraFireMakernoteDirectory.TAG_AMBIENT_TEMPERATURE, "Ambient Temperature")
    .set(ReconyxUltraFireMakernoteDirectory.TAG_FLASH, "Flash")
    .set(ReconyxUltraFireMakernoteDirectory.TAG_BATTERY_VOLTAGE, "Battery Voltage")
    .set(ReconyxUltraFireMakernoteDirectory.TAG_SERIAL_NUMBER, "Serial Number")
    .set(ReconyxUltraFireMakernoteDirectory.TAG_USER_LABEL, "User Label")

  constructor() {
    super()
    this.setDescriptor(new ReconyxUltraFireMakernoteDescriptor(this));
  }

  getName(): string{
    return "Reconyx UltraFire Makernote";
  }

  protected getTagNameMap(): Map<number, string>
  {
    return ReconyxUltraFireMakernoteDirectory._tagNameMap;
  }
}