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
import LeicaMakernoteDescriptor from './LeicaMakernoteDescriptor';
class LeicaMakernoteDirectory extends Directory {
    public static TAG_QUALITY = 0x0300;
    public static TAG_USER_PROFILE = 0x0302;
    public static TAG_SERIAL_NUMBER = 0x0303;
    public static TAG_WHITE_BALANCE = 0x0304;
    public static TAG_LENS_TYPE = 0x0310;
    public static TAG_EXTERNAL_SENSOR_BRIGHTNESS_VALUE = 0x0311;
    public static TAG_MEASURED_LV = 0x0312;
    public static TAG_APPROXIMATE_F_NUMBER = 0x0313;
    public static TAG_CAMERA_TEMPERATURE = 0x0320;
    public static TAG_COLOR_TEMPERATURE = 0x0321;
    public static TAG_WB_RED_LEVEL = 0x0322;
    public static TAG_WB_GREEN_LEVEL = 0x0323;
    public static TAG_WB_BLUE_LEVEL = 0x0324;
    public static TAG_CCD_VERSION = 0x0330;
    public static TAG_CCD_BOARD_VERSION = 0x0331;
    public static TAG_CONTROLLER_BOARD_VERSION = 0x0332;
    public static TAG_M16_C_VERSION = 0x0333;
    public static TAG_IMAGE_ID_NUMBER = 0x0340;
    public static _tagNameMap: Map<number, string> = new Map([
        [LeicaMakernoteDirectory.TAG_QUALITY, "Quality"],
        [LeicaMakernoteDirectory.TAG_USER_PROFILE, "User Profile"],
        [LeicaMakernoteDirectory.TAG_SERIAL_NUMBER, "Serial Number"],
        [LeicaMakernoteDirectory.TAG_WHITE_BALANCE, "White Balance"],
        [LeicaMakernoteDirectory.TAG_LENS_TYPE, "Lens Type"],
        [LeicaMakernoteDirectory.TAG_EXTERNAL_SENSOR_BRIGHTNESS_VALUE, "External Sensor Brightness Value"],
        [LeicaMakernoteDirectory.TAG_MEASURED_LV, "Measured LV"],
        [LeicaMakernoteDirectory.TAG_APPROXIMATE_F_NUMBER, "Approximate F Number"],
        [LeicaMakernoteDirectory.TAG_CAMERA_TEMPERATURE, "Camera Temperature"],
        [LeicaMakernoteDirectory.TAG_COLOR_TEMPERATURE, "Color Temperature"],
        [LeicaMakernoteDirectory.TAG_WB_RED_LEVEL, "WB Red Level"],
        [LeicaMakernoteDirectory.TAG_WB_GREEN_LEVEL, "WB Green Level"],
        [LeicaMakernoteDirectory.TAG_WB_BLUE_LEVEL, "WB Blue Level"],
        [LeicaMakernoteDirectory.TAG_CCD_VERSION, "CCD Version"],
        [LeicaMakernoteDirectory.TAG_CCD_BOARD_VERSION, "CCD Board Version"],
        [LeicaMakernoteDirectory.TAG_CONTROLLER_BOARD_VERSION, "Controller Board Version"],
        [LeicaMakernoteDirectory.TAG_M16_C_VERSION, "M16 C Version"],
        [LeicaMakernoteDirectory.TAG_IMAGE_ID_NUMBER, "Image ID Number"]
    ]);
    constructor() {
        super();
        this.setDescriptor(new LeicaMakernoteDescriptor(this));
    }
    public getName(): string {
        return "Leica Makernote";
    }
    protected getTagNameMap(): Map<number, string> {
        return LeicaMakernoteDirectory._tagNameMap;
    }
}
export default LeicaMakernoteDirectory;
