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
import NikonType1MakernoteDirectory from './NikonType1MakernoteDirectory';
import TagDescriptor from '../../TagDescriptor';
/**
 * Provides human-readable string representations of tag values stored in a {@link NikonType1MakernoteDirectory}.
 * <p>
 * Type-1 is for E-Series cameras prior to (not including) E990.  For example: E700, E800, E900,
 * E900S, E910, E950.
 * <p>
 * Makernote starts from ASCII string "Nikon". Data format is the same as IFD, but it starts from
 * offset 0x08. This is the same as Olympus except start string. Example of actual data
 * structure is shown below.
 * <pre><code>
 * :0000: 4E 69 6B 6F 6E 00 01 00-05 00 02 00 02 00 06 00 Nikon...........
 * :0010: 00 00 EC 02 00 00 03 00-03 00 01 00 00 00 06 00 ................
 * </code></pre>
 *
 */
class NikonType1MakernoteDescriptor extends TagDescriptor<NikonType1MakernoteDirectory> {
    constructor(directory: NikonType1MakernoteDirectory) {
        super(directory);
    }
    public getDescription(tagType: number): string {
        switch (tagType) {
            case NikonType1MakernoteDirectory.TAG_QUALITY:
                return this.getQualityDescription();
            case NikonType1MakernoteDirectory.TAG_COLOR_MODE:
                return this.getColorModeDescription();
            case NikonType1MakernoteDirectory.TAG_IMAGE_ADJUSTMENT:
                return this.getImageAdjustmentDescription();
            case NikonType1MakernoteDirectory.TAG_CCD_SENSITIVITY:
                return this.getCcdSensitivityDescription();
            case NikonType1MakernoteDirectory.TAG_WHITE_BALANCE:
                return this.getWhiteBalanceDescription();
            case NikonType1MakernoteDirectory.TAG_FOCUS:
                return this.getFocusDescription();
            case NikonType1MakernoteDirectory.TAG_DIGITAL_ZOOM:
                return this.getDigitalZoomDescription();
            case NikonType1MakernoteDirectory.TAG_CONVERTER:
                return this.getConverterDescription();
            default:
                return super.getDescription(tagType);
        }
    }
    public getConverterDescription(): string {
        return this.getIndexedDescription(NikonType1MakernoteDirectory.TAG_CONVERTER, "None", "Fisheye converter");
    }
    public getDigitalZoomDescription(): string {
        let value = this._directory.getRational(NikonType1MakernoteDirectory.TAG_DIGITAL_ZOOM);
        return value == null
            ? null
            : value.getNumerator() == 0
                ? "No digital zoom"
                : value.toSimpleString(true) + "x digital zoom";
    }
    public getFocusDescription(): string {
        let value = this._directory.getRational(NikonType1MakernoteDirectory.TAG_FOCUS);
        return value == null
            ? null
            : value.getNumerator() == 1 && value.getDenominator() == 0
                ? "Infinite"
                : value.toSimpleString(true);
    }
    public getWhiteBalanceDescription(): string {
        return this.getIndexedDescription(NikonType1MakernoteDirectory.TAG_WHITE_BALANCE, "Auto", "Preset", "Daylight", "Incandescence", "Florescence", "Cloudy", "SpeedLight");
    }
    public getCcdSensitivityDescription(): string {
        return this.getIndexedDescription(NikonType1MakernoteDirectory.TAG_CCD_SENSITIVITY, "ISO80", null, "ISO160", null, "ISO320", "ISO100");
    }
    public getImageAdjustmentDescription(): string {
        return this.getIndexedDescription(NikonType1MakernoteDirectory.TAG_IMAGE_ADJUSTMENT, "Normal", "Bright +", "Bright -", "Contrast +", "Contrast -");
    }
    public getColorModeDescription(): string {
        return this.getIndexedDescription(NikonType1MakernoteDirectory.TAG_COLOR_MODE, 1, "Color", "Monochrome");
    }
    public getQualityDescription(): string {
        return this.getIndexedDescription(NikonType1MakernoteDirectory.TAG_QUALITY, 1, "VGA Basic", "VGA Normal", "VGA Fine", "SXGA Basic", "SXGA Normal", "SXGA Fine");
    }
}
export default NikonType1MakernoteDescriptor;
