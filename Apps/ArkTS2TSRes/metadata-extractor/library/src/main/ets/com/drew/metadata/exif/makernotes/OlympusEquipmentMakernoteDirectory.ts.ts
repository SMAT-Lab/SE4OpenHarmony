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
import OlympusEquipmentMakernoteDescriptor from './OlympusEquipmentMakernoteDescriptor';
import Directory from '../../Directory';
class OlympusEquipmentMakernoteDirectory extends Directory {
    public static readonly TAG_EQUIPMENT_VERSION = 0x0000;
    public static readonly TAG_CAMERA_TYPE_2 = 0x0100;
    public static readonly TAG_SERIAL_NUMBER = 0x0101;
    public static readonly TAG_INTERNAL_SERIAL_NUMBER = 0x0102;
    public static readonly TAG_FOCAL_PLANE_DIAGONAL = 0x0103;
    public static readonly TAG_BODY_FIRMWARE_VERSION = 0x0104;
    public static readonly TAG_LENS_TYPE = 0x0201;
    public static readonly TAG_LENS_SERIAL_NUMBER = 0x0202;
    public static readonly TAG_LENS_MODEL = 0x0203;
    public static readonly TAG_LENS_FIRMWARE_VERSION = 0x0204;
    public static readonly TAG_MAX_APERTURE_AT_MIN_FOCAL = 0x0205;
    public static readonly TAG_MAX_APERTURE_AT_MAX_FOCAL = 0x0206;
    public static readonly TAG_MIN_FOCAL_LENGTH = 0x0207;
    public static readonly TAG_MAX_FOCAL_LENGTH = 0x0208;
    public static readonly TAG_MAX_APERTURE = 0x020A;
    public static readonly TAG_LENS_PROPERTIES = 0x020B;
    public static readonly TAG_EXTENDER = 0x0301;
    public static readonly TAG_EXTENDER_SERIAL_NUMBER = 0x0302;
    public static readonly TAG_EXTENDER_MODEL = 0x0303;
    public static readonly TAG_EXTENDER_FIRMWARE_VERSION = 0x0304;
    public static readonly TAG_CONVERSION_LENS = 0x0403;
    public static readonly TAG_FLASH_TYPE = 0x1000;
    public static readonly TAG_FLASH_MODEL = 0x1001;
    public static readonly TAG_FLASH_FIRMWARE_VERSION = 0x1002;
    public static readonly TAG_FLASH_SERIAL_NUMBER = 0x1003;
    private static readonly _tagNameMap = new Map<number, string>([
        [OlympusEquipmentMakernoteDirectory.TAG_EQUIPMENT_VERSION, "Equipment Version"],
        [OlympusEquipmentMakernoteDirectory.TAG_CAMERA_TYPE_2, "Camera Type 2"],
        [OlympusEquipmentMakernoteDirectory.TAG_SERIAL_NUMBER, "Serial Number"],
        [OlympusEquipmentMakernoteDirectory.TAG_INTERNAL_SERIAL_NUMBER, "Internal Serial Number"],
        [OlympusEquipmentMakernoteDirectory.TAG_FOCAL_PLANE_DIAGONAL, "Focal Plane Diagonal"],
        [OlympusEquipmentMakernoteDirectory.TAG_BODY_FIRMWARE_VERSION, "Body Firmware Version"],
        [OlympusEquipmentMakernoteDirectory.TAG_LENS_TYPE, "Lens Type"],
        [OlympusEquipmentMakernoteDirectory.TAG_LENS_SERIAL_NUMBER, "Lens Serial Number"],
        [OlympusEquipmentMakernoteDirectory.TAG_LENS_MODEL, "Lens Model"],
        [OlympusEquipmentMakernoteDirectory.TAG_LENS_FIRMWARE_VERSION, "Lens Firmware Version"],
        [OlympusEquipmentMakernoteDirectory.TAG_MAX_APERTURE_AT_MIN_FOCAL, "Max Aperture At Min Focal"],
        [OlympusEquipmentMakernoteDirectory.TAG_MAX_APERTURE_AT_MAX_FOCAL, "Max Aperture At Max Focal"],
        [OlympusEquipmentMakernoteDirectory.TAG_MIN_FOCAL_LENGTH, "Min Focal Length"],
        [OlympusEquipmentMakernoteDirectory.TAG_MAX_FOCAL_LENGTH, "Max Focal Length"],
        [OlympusEquipmentMakernoteDirectory.TAG_MAX_APERTURE, "Max Aperture"],
        [OlympusEquipmentMakernoteDirectory.TAG_LENS_PROPERTIES, "Lens Properties"],
        [OlympusEquipmentMakernoteDirectory.TAG_EXTENDER, "Extender"],
        [OlympusEquipmentMakernoteDirectory.TAG_EXTENDER_SERIAL_NUMBER, "Extender Serial Number"],
        [OlympusEquipmentMakernoteDirectory.TAG_EXTENDER_MODEL, "Extender Model"],
        [OlympusEquipmentMakernoteDirectory.TAG_EXTENDER_FIRMWARE_VERSION, "Extender Firmware Version"],
        [OlympusEquipmentMakernoteDirectory.TAG_CONVERSION_LENS, "Conversion Lens"],
        [OlympusEquipmentMakernoteDirectory.TAG_FLASH_TYPE, "Flash Type"],
        [OlympusEquipmentMakernoteDirectory.TAG_FLASH_MODEL, "Flash Model"],
        [OlympusEquipmentMakernoteDirectory.TAG_FLASH_FIRMWARE_VERSION, "Flash Firmware Version"],
        [OlympusEquipmentMakernoteDirectory.TAG_FLASH_SERIAL_NUMBER, "Flash Serial Number"]
    ]);
    constructor() {
        super();
        this.setDescriptor(new OlympusEquipmentMakernoteDescriptor(this));
    }
    public getName(): string {
        return "Olympus Equipment";
    }
    protected getTagNameMap(): Map<number, string> {
        return OlympusEquipmentMakernoteDirectory._tagNameMap;
    }
}
export default OlympusEquipmentMakernoteDirectory;
