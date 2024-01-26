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
import PentaxMakernoteDirectory from './PentaxMakernoteDirectory';
import TagDescriptor from '../../TagDescriptor';
/**
 * Provides human-readable string representations of tag values stored in a {@link PentaxMakernoteDirectory}.
 */
class PentaxMakernoteDescriptor extends TagDescriptor<PentaxMakernoteDirectory> {
    public constructor(directory: PentaxMakernoteDirectory) {
        super(directory);
    }
    public getDescription(tagType: number): string {
        switch (tagType) {
            case PentaxMakernoteDirectory.TAG_CAPTURE_MODE:
                return this.getCaptureModeDescription();
            case PentaxMakernoteDirectory.TAG_QUALITY_LEVEL:
                return this.getQualityLevelDescription();
            case PentaxMakernoteDirectory.TAG_FOCUS_MODE:
                return this.getFocusModeDescription();
            case PentaxMakernoteDirectory.TAG_FLASH_MODE:
                return this.getFlashModeDescription();
            case PentaxMakernoteDirectory.TAG_WHITE_BALANCE:
                return this.getWhiteBalanceDescription();
            case PentaxMakernoteDirectory.TAG_DIGITAL_ZOOM:
                return this.getDigitalZoomDescription();
            case PentaxMakernoteDirectory.TAG_SHARPNESS:
                return this.getSharpnessDescription();
            case PentaxMakernoteDirectory.TAG_CONTRAST:
                return this.getContrastDescription();
            case PentaxMakernoteDirectory.TAG_SATURATION:
                return this.getSaturationDescription();
            case PentaxMakernoteDirectory.TAG_ISO_SPEED:
                return this.getIsoSpeedDescription();
            case PentaxMakernoteDirectory.TAG_COLOUR:
                return this.getColourDescription();
            default:
                return super.getDescription(tagType);
        }
    }
    public getColourDescription(): string {
        return this.getIndexedDescription(PentaxMakernoteDirectory.TAG_COLOUR, 1, "Normal", "Black & White", "Sepia");
    }
    public getIsoSpeedDescription(): string {
        let value: number = this._directory.getInteger(PentaxMakernoteDirectory.TAG_ISO_SPEED);
        if (value == null)
            return null;
        switch (value) {
            // TODO there must be other values which aren't catered for here
            case 10:
                return "ISO 100";
            case 16:
                return "ISO 200";
            case 100:
                return "ISO 100";
            case 200:
                return "ISO 200";
            default:
                return "Unknown (" + value + ")";
        }
    }
    public getSaturationDescription(): string {
        return this.getIndexedDescription(PentaxMakernoteDirectory.TAG_SATURATION, "Normal", "Low", "High");
    }
    public getContrastDescription(): string {
        return this.getIndexedDescription(PentaxMakernoteDirectory.TAG_CONTRAST, "Normal", "Low", "High");
    }
    public getSharpnessDescription(): string {
        return this.getIndexedDescription(PentaxMakernoteDirectory.TAG_SHARPNESS, "Normal", "Soft", "Hard");
    }
    public getDigitalZoomDescription(): string {
        let value: number = this._directory.getFloatObject(PentaxMakernoteDirectory.TAG_DIGITAL_ZOOM);
        if (value == null)
            return null;
        if (value == 0)
            return "Off";
        return value.toString();
    }
    public getWhiteBalanceDescription(): string {
        return this.getIndexedDescription(PentaxMakernoteDirectory.TAG_WHITE_BALANCE, "Auto", "Daylight", "Shade", "Tungsten", "Fluorescent", "Manual");
    }
    public getFlashModeDescription(): string {
        return this.getIndexedDescription(PentaxMakernoteDirectory.TAG_FLASH_MODE, 1, "Auto", "Flash On", null, "Flash Off", null, "Red-eye Reduction");
    }
    public getFocusModeDescription(): string {
        return this.getIndexedDescription(PentaxMakernoteDirectory.TAG_FOCUS_MODE, 2, "Custom", "Auto");
    }
    public getQualityLevelDescription(): string {
        return this.getIndexedDescription(PentaxMakernoteDirectory.TAG_QUALITY_LEVEL, "Good", "Better", "Best");
    }
    public getCaptureModeDescription(): string {
        return this.getIndexedDescription(PentaxMakernoteDirectory.TAG_CAPTURE_MODE, "Auto", "Night-scene", "Manual", null, "Multiple");
    }
}
export default PentaxMakernoteDescriptor;
