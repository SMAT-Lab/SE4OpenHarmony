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
import OlympusMakernoteDirectory from './OlympusMakernoteDirectory';
import TagDescriptor from '../../TagDescriptor';
import OlympusEquipmentMakernoteDirectory from './OlympusEquipmentMakernoteDirectory';
class OlympusEquipmentMakernoteDescriptor extends TagDescriptor<OlympusEquipmentMakernoteDirectory> {
    constructor(directory: OlympusEquipmentMakernoteDirectory) {
        super(directory);
    }
    public getDescription(tagType: number): string {
        switch (tagType) {
            case OlympusEquipmentMakernoteDirectory.TAG_EQUIPMENT_VERSION:
                return this.getEquipmentVersionDescription();
            case OlympusEquipmentMakernoteDirectory.TAG_CAMERA_TYPE_2:
                return this.getCameraType2Description();
            case OlympusEquipmentMakernoteDirectory.TAG_FOCAL_PLANE_DIAGONAL:
                return this.getFocalPlaneDiagonalDescription();
            case OlympusEquipmentMakernoteDirectory.TAG_BODY_FIRMWARE_VERSION:
                return this.getBodyFirmwareVersionDescription();
            case OlympusEquipmentMakernoteDirectory.TAG_LENS_TYPE:
                return this.getLensTypeDescription();
            case OlympusEquipmentMakernoteDirectory.TAG_LENS_FIRMWARE_VERSION:
                return this.getLensFirmwareVersionDescription();
            case OlympusEquipmentMakernoteDirectory.TAG_MAX_APERTURE_AT_MIN_FOCAL:
                return this.getMaxApertureAtMinFocalDescription();
            case OlympusEquipmentMakernoteDirectory.TAG_MAX_APERTURE_AT_MAX_FOCAL:
                return this.getMaxApertureAtMaxFocalDescription();
            case OlympusEquipmentMakernoteDirectory.TAG_MAX_APERTURE:
                return this.getMaxApertureDescription();
            case OlympusEquipmentMakernoteDirectory.TAG_LENS_PROPERTIES:
                return this.getLensPropertiesDescription();
            case OlympusEquipmentMakernoteDirectory.TAG_EXTENDER:
                return this.getExtenderDescription();
            case OlympusEquipmentMakernoteDirectory.TAG_FLASH_TYPE:
                return this.getFlashTypeDescription();
            case OlympusEquipmentMakernoteDirectory.TAG_FLASH_MODEL:
                return this.getFlashModelDescription();
            default:
                return super.getDescription(tagType);
        }
    }
    public getEquipmentVersionDescription(): string {
        return this.getVersionBytesDescription(OlympusEquipmentMakernoteDirectory.TAG_EQUIPMENT_VERSION, 4);
    }
    public getCameraType2Description(): string {
        let cameratype = this._directory.getString(OlympusEquipmentMakernoteDirectory.TAG_CAMERA_TYPE_2);
        if (cameratype == null)
            return null;
        if (OlympusMakernoteDirectory.OlympusCameraTypes.has(cameratype))
            return OlympusMakernoteDirectory.OlympusCameraTypes.get(cameratype);
        return cameratype;
    }
    public getFocalPlaneDiagonalDescription(): string {
        return this._directory.getString(OlympusEquipmentMakernoteDirectory.TAG_FOCAL_PLANE_DIAGONAL) + " mm";
    }
    public getBodyFirmwareVersionDescription(): string {
        let value = this._directory.getInteger(OlympusEquipmentMakernoteDirectory.TAG_BODY_FIRMWARE_VERSION);
        if (value == null)
            return null;
        let hex = "%04X".replace(/%04X/, value);
        return "%s.%s".replace(/%s/, hex.substr(0, hex.length - 3)).replace(/%s/, hex.substr(hex.length - 3, hex.length));
        //        let hex = String.format("%04X", value);
        //        return String.format("%s.%s",
        //            hex.substring(0, hex.length() - 3),
        //            hex.substring(hex.length() - 3));
    }
    public getLensTypeDescription(): string {
        let str = this._directory.getString(OlympusEquipmentMakernoteDirectory.TAG_LENS_TYPE);
        if (str == null)
            return null;
        // The String contains six numbers:
        //
        // - Make
        // - Unknown
        // - Model
        // - Sub-model
        // - Unknown
        // - Unknown
        //
        // Only the Make, Model and Sub-model are used to identify the lens type
        let values = str.split(" ");
        if (values.length < 6)
            return null;
        try {
            let num1 = values[0];
            let num2 = values[2];
            let num3 = values[3];
            return OlympusEquipmentMakernoteDescriptor._olympusLensTypes.get("%X %02X %02X".replace(/%X/, num1)
                .replace(/%02X/, num2)
                .replace(/%02X/, num3));
        }
        catch (e) {
            return null;
        }
    }
    public getLensFirmwareVersionDescription(): string {
        let value = this._directory.getInteger(OlympusEquipmentMakernoteDirectory.TAG_LENS_FIRMWARE_VERSION);
        if (value == null)
            return null;
        let hex = "%04X".replace(/%04X/, value);
        return "%s.%s".replace(/%s/, hex.substr(0, hex.length - 3)).replace(/%s/, hex.substr(hex.length - 3, hex.length));
        //        return String.format("%s.%s",
        //            hex.substring(0, hex.length() - 3),
        //            hex.substring(hex.length() - 3));
    }
    public getMaxApertureAtMinFocalDescription(): string {
        let value = this._directory.getInteger(OlympusEquipmentMakernoteDirectory.TAG_MAX_APERTURE_AT_MIN_FOCAL);
        if (value == null)
            return null;
        return OlympusEquipmentMakernoteDescriptor.CalcMaxAperture(value).toFixed(1);
        //        DecimalFormat format = new DecimalFormat("0.#");
        //        return format.format(CalcMaxAperture(value));
    }
    public getMaxApertureAtMaxFocalDescription(): string {
        let value = this._directory.getInteger(OlympusEquipmentMakernoteDirectory.TAG_MAX_APERTURE_AT_MAX_FOCAL);
        if (value == null)
            return null;
        return OlympusEquipmentMakernoteDescriptor.CalcMaxAperture(value).toFixed(1);
        //        DecimalFormat format = new DecimalFormat("0.#");
        //        return format.format(CalcMaxAperture(value));
    }
    public getMaxApertureDescription(): string {
        let value = this._directory.getInteger(OlympusEquipmentMakernoteDirectory.TAG_MAX_APERTURE);
        if (value == null)
            return null;
        return OlympusEquipmentMakernoteDescriptor.CalcMaxAperture(value).toFixed(1);
        //        DecimalFormat format = new DecimalFormat("0.#");
        //        return format.format(CalcMaxAperture(value));
    }
    private static CalcMaxAperture(value: number): number {
        return Math.pow(Math.sqrt(2.00), value / 256.0);
    }
    public getLensPropertiesDescription(): string {
        let value = this._directory.getInteger(OlympusEquipmentMakernoteDirectory.TAG_LENS_PROPERTIES);
        if (value == null)
            return null;
        return "0x%04X".replace(/0x%04X/, value);
        //        return String.format("0x%04X", value);
    }
    public getExtenderDescription(): string {
        let str = this._directory.getString(OlympusEquipmentMakernoteDirectory.TAG_EXTENDER);
        if (str == null)
            return null;
        // The String contains six numbers:
        //
        // - Make
        // - Unknown
        // - Model
        // - Sub-model
        // - Unknown
        // - Unknown
        //
        // Only the Make and Model are used to identify the extender
        let values = str.split(" ");
        if (values.length < 6)
            return null;
        try {
            let num1 = values[0];
            let num2 = values[2];
            let extenderType = "%X %02X".replace(/%X/, num1).replace(/%02X/, num2);
            return OlympusEquipmentMakernoteDescriptor._olympusExtenderTypes.get(extenderType);
        }
        catch (e) {
            return null;
        }
    }
    public getFlashTypeDescription(): string {
        return this.getIndexedDescription(OlympusEquipmentMakernoteDirectory.TAG_FLASH_TYPE, null, "None", null, "Simple E-System", "E-System");
    }
    public getFlashModelDescription(): string {
        return this.getIndexedDescription(OlympusEquipmentMakernoteDirectory.TAG_FLASH_MODEL, null, "None", "FL-20", "FL-50", "RF-11", "TF-22", "FL-36", "FL-50R", "FL-36R");
    }
    private static readonly _olympusLensTypes: Map<string, string> = new Map<string, string>([
        ["0 00 00", "None"],
        // Olympus lenses (also Kenko Tokina)
        ["0 01 00", "Olympus Zuiko Digital ED 50mm F2.0 Macro"],
        ["0 01 01", "Olympus Zuiko Digital 40-150mm F3.5-4.5"],
        ["0 01 10", "Olympus M.Zuiko Digital ED 14-42mm F3.5-5.6"],
        ["0 02 00", "Olympus Zuiko Digital ED 150mm F2.0"],
        ["0 02 10", "Olympus M.Zuiko Digital 17mm F2.8 Pancake"],
        ["0 03 00", "Olympus Zuiko Digital ED 300mm F2.8"],
        ["0 03 10", "Olympus M.Zuiko Digital ED 14-150mm F4.0-5.6 [II]"],
        ["0 04 10", "Olympus M.Zuiko Digital ED 9-18mm F4.0-5.6"],
        ["0 05 00", "Olympus Zuiko Digital 14-54mm F2.8-3.5"],
        ["0 05 01", "Olympus Zuiko Digital Pro ED 90-250mm F2.8"],
        ["0 05 10", "Olympus M.Zuiko Digital ED 14-42mm F3.5-5.6 L"],
        ["0 06 00", "Olympus Zuiko Digital ED 50-200mm F2.8-3.5"],
        ["0 06 01", "Olympus Zuiko Digital ED 8mm F3.5 Fisheye"],
        ["0 06 10", "Olympus M.Zuiko Digital ED 40-150mm F4.0-5.6"],
        ["0 07 00", "Olympus Zuiko Digital 11-22mm F2.8-3.5"],
        ["0 07 01", "Olympus Zuiko Digital 18-180mm F3.5-6.3"],
        ["0 07 10", "Olympus M.Zuiko Digital ED 12mm F2.0"],
        ["0 08 01", "Olympus Zuiko Digital 70-300mm F4.0-5.6"],
        ["0 08 10", "Olympus M.Zuiko Digital ED 75-300mm F4.8-6.7"],
        ["0 09 10", "Olympus M.Zuiko Digital 14-42mm F3.5-5.6 II"],
        ["0 10 01", "Kenko Tokina Reflex 300mm F6.3 MF Macro"],
        ["0 10 10", "Olympus M.Zuiko Digital ED 12-50mm F3.5-6.3 EZ"],
        ["0 11 10", "Olympus M.Zuiko Digital 45mm F1.8"],
        ["0 12 10", "Olympus M.Zuiko Digital ED 60mm F2.8 Macro"],
        ["0 13 10", "Olympus M.Zuiko Digital 14-42mm F3.5-5.6 II R"],
        ["0 14 10", "Olympus M.Zuiko Digital ED 40-150mm F4.0-5.6 R"],
        // '0 14 10.1", "Olympus M.Zuiko Digital ED 14-150mm F4.0-5.6 II"], //11 (questionable & unconfirmed -- all samples I can find are '0 3 10' - PH)
        ["0 15 00", "Olympus Zuiko Digital ED 7-14mm F4.0"],
        ["0 15 10", "Olympus M.Zuiko Digital ED 75mm F1.8"],
        ["0 16 10", "Olympus M.Zuiko Digital 17mm F1.8"],
        ["0 17 00", "Olympus Zuiko Digital Pro ED 35-100mm F2.0"],
        ["0 18 00", "Olympus Zuiko Digital 14-45mm F3.5-5.6"],
        ["0 18 10", "Olympus M.Zuiko Digital ED 75-300mm F4.8-6.7 II"],
        ["0 19 10", "Olympus M.Zuiko Digital ED 12-40mm F2.8 Pro"],
        ["0 20 00", "Olympus Zuiko Digital 35mm F3.5 Macro"],
        ["0 20 10", "Olympus M.Zuiko Digital ED 40-150mm F2.8 Pro"],
        ["0 21 10", "Olympus M.Zuiko Digital ED 14-42mm F3.5-5.6 EZ"],
        ["0 22 00", "Olympus Zuiko Digital 17.5-45mm F3.5-5.6"],
        ["0 22 10", "Olympus M.Zuiko Digital 25mm F1.8"],
        ["0 23 00", "Olympus Zuiko Digital ED 14-42mm F3.5-5.6"],
        ["0 23 10", "Olympus M.Zuiko Digital ED 7-14mm F2.8 Pro"],
        ["0 24 00", "Olympus Zuiko Digital ED 40-150mm F4.0-5.6"],
        ["0 24 10", "Olympus M.Zuiko Digital ED 300mm F4.0 IS Pro"],
        ["0 25 10", "Olympus M.Zuiko Digital ED 8mm F1.8 Fisheye Pro"],
        ["0 30 00", "Olympus Zuiko Digital ED 50-200mm F2.8-3.5 SWD"],
        ["0 31 00", "Olympus Zuiko Digital ED 12-60mm F2.8-4.0 SWD"],
        ["0 32 00", "Olympus Zuiko Digital ED 14-35mm F2.0 SWD"],
        ["0 33 00", "Olympus Zuiko Digital 25mm F2.8"],
        ["0 34 00", "Olympus Zuiko Digital ED 9-18mm F4.0-5.6"],
        ["0 35 00", "Olympus Zuiko Digital 14-54mm F2.8-3.5 II"],
        // Sigma lenses
        ["1 01 00", "Sigma 18-50mm F3.5-5.6 DC"],
        ["1 01 10", "Sigma 30mm F2.8 EX DN"],
        ["1 02 00", "Sigma 55-200mm F4.0-5.6 DC"],
        ["1 02 10", "Sigma 19mm F2.8 EX DN"],
        ["1 03 00", "Sigma 18-125mm F3.5-5.6 DC"],
        ["1 03 10", "Sigma 30mm F2.8 DN | A"],
        ["1 04 00", "Sigma 18-125mm F3.5-5.6 DC"],
        ["1 04 10", "Sigma 19mm F2.8 DN | A"],
        ["1 05 00", "Sigma 30mm F1.4 EX DC HSM"],
        ["1 05 10", "Sigma 60mm F2.8 DN | A"],
        ["1 06 00", "Sigma APO 50-500mm F4.0-6.3 EX DG HSM"],
        ["1 07 00", "Sigma Macro 105mm F2.8 EX DG"],
        ["1 08 00", "Sigma APO Macro 150mm F2.8 EX DG HSM"],
        ["1 09 00", "Sigma 18-50mm F2.8 EX DC Macro"],
        ["1 10 00", "Sigma 24mm F1.8 EX DG Aspherical Macro"],
        ["1 11 00", "Sigma APO 135-400mm F4.5-5.6 DG"],
        ["1 12 00", "Sigma APO 300-800mm F5.6 EX DG HSM"],
        ["1 13 00", "Sigma 30mm F1.4 EX DC HSM"],
        ["1 14 00", "Sigma APO 50-500mm F4.0-6.3 EX DG HSM"],
        ["1 15 00", "Sigma 10-20mm F4.0-5.6 EX DC HSM"],
        ["1 16 00", "Sigma APO 70-200mm F2.8 II EX DG Macro HSM"],
        ["1 17 00", "Sigma 50mm F1.4 EX DG HSM"],
        // Panasonic/Leica lenses
        ["2 01 00", "Leica D Vario Elmarit 14-50mm F2.8-3.5 Asph."],
        ["2 01 10", "Lumix G Vario 14-45mm F3.5-5.6 Asph. Mega OIS"],
        ["2 02 00", "Leica D Summilux 25mm F1.4 Asph."],
        ["2 02 10", "Lumix G Vario 45-200mm F4.0-5.6 Mega OIS"],
        ["2 03 00", "Leica D Vario Elmar 14-50mm F3.8-5.6 Asph. Mega OIS"],
        ["2 03 01", "Leica D Vario Elmar 14-50mm F3.8-5.6 Asph."],
        ["2 03 10", "Lumix G Vario HD 14-140mm F4.0-5.8 Asph. Mega OIS"],
        ["2 04 00", "Leica D Vario Elmar 14-150mm F3.5-5.6"],
        ["2 04 10", "Lumix G Vario 7-14mm F4.0 Asph."],
        ["2 05 10", "Lumix G 20mm F1.7 Asph."],
        ["2 06 10", "Leica DG Macro-Elmarit 45mm F2.8 Asph. Mega OIS"],
        ["2 07 10", "Lumix G Vario 14-42mm F3.5-5.6 Asph. Mega OIS"],
        ["2 08 10", "Lumix G Fisheye 8mm F3.5"],
        ["2 09 10", "Lumix G Vario 100-300mm F4.0-5.6 Mega OIS"],
        ["2 10 10", "Lumix G 14mm F2.5 Asph."],
        ["2 11 10", "Lumix G 12.5mm F12 3D"],
        ["2 12 10", "Leica DG Summilux 25mm F1.4 Asph."],
        ["2 13 10", "Lumix G X Vario PZ 45-175mm F4.0-5.6 Asph. Power OIS"],
        ["2 14 10", "Lumix G X Vario PZ 14-42mm F3.5-5.6 Asph. Power OIS"],
        ["2 15 10", "Lumix G X Vario 12-35mm F2.8 Asph. Power OIS"],
        ["2 16 10", "Lumix G Vario 45-150mm F4.0-5.6 Asph. Mega OIS"],
        ["2 17 10", "Lumix G X Vario 35-100mm F2.8 Power OIS"],
        ["2 18 10", "Lumix G Vario 14-42mm F3.5-5.6 II Asph. Mega OIS"],
        ["2 19 10", "Lumix G Vario 14-140mm F3.5-5.6 Asph. Power OIS"],
        ["2 20 10", "Lumix G Vario 12-32mm F3.5-5.6 Asph. Mega OIS"],
        ["2 21 10", "Leica DG Nocticron 42.5mm F1.2 Asph. Power OIS"],
        ["2 22 10", "Leica DG Summilux 15mm F1.7 Asph."],
        // '2 23 10", "Lumix G Vario 35-100mm F4.0-5.6 Asph. Mega OIS"], //20 (guess)
        ["2 24 10", "Lumix G Macro 30mm F2.8 Asph. Mega OIS"],
        ["2 25 10", "Lumix G 42.5mm F1.7 Asph. Power OIS"],
        ["3 01 00", "Leica D Vario Elmarit 14-50mm F2.8-3.5 Asph."],
        ["3 02 00", "Leica D Summilux 25mm F1.4 Asph."],
        // Tamron lenses
        ["5 01 10", "Tamron 14-150mm F3.5-5.8 Di III"], //20 (model C001)
    ]);
    private static readonly _olympusExtenderTypes: Map<string, string> = new Map<string, string>([
        ["0 00", "None"],
        ["0 04", "Olympus Zuiko Digital EC-14 1.4x Teleconverter"],
        ["0 08", "Olympus EX-25 Extension Tube"],
        ["0 10", "Olympus Zuiko Digital EC-20 2.0x Teleconverter"],
    ]);
}
export default OlympusEquipmentMakernoteDescriptor;