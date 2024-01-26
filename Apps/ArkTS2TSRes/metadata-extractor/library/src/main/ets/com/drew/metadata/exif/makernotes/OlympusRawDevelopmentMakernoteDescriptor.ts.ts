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
import TagDescriptor from '../../TagDescriptor';
import OlympusRawDevelopmentMakernoteDirectory from './OlympusRawDevelopmentMakernoteDirectory';
/**
 * Provides human-readable String representations of tag values stored in a {@link OlympusRawDevelopmentMakernoteDirectory}.
 * <p>
 * Some Description functions converted from Exiftool version 10.10 created by Phil Harvey
 */
class OlympusRawDevelopmentMakernoteDescriptor extends TagDescriptor<OlympusRawDevelopmentMakernoteDirectory> {
    constructor(directory: OlympusRawDevelopmentMakernoteDirectory) {
        super(directory);
    }
    public getDescription(tagType: number): string {
        switch (tagType) {
            case OlympusRawDevelopmentMakernoteDirectory.TagRawDevVersion:
                return this.getRawDevVersionDescription();
            case OlympusRawDevelopmentMakernoteDirectory.TagRawDevColorSpace:
                return this.getRawDevColorSpaceDescription();
            case OlympusRawDevelopmentMakernoteDirectory.TagRawDevEngine:
                return this.getRawDevEngineDescription();
            case OlympusRawDevelopmentMakernoteDirectory.TagRawDevNoiseReduction:
                return this.getRawDevNoiseReductionDescription();
            case OlympusRawDevelopmentMakernoteDirectory.TagRawDevEditStatus:
                return this.getRawDevEditStatusDescription();
            case OlympusRawDevelopmentMakernoteDirectory.TagRawDevSettings:
                return this.getRawDevSettingsDescription();
            default:
                return super.getDescription(tagType);
        }
    }
    public getRawDevVersionDescription(): string {
        return this.getVersionBytesDescription(OlympusRawDevelopmentMakernoteDirectory.TagRawDevVersion, 4);
    }
    public getRawDevColorSpaceDescription(): string {
        return this.getIndexedDescription(OlympusRawDevelopmentMakernoteDirectory.TagRawDevColorSpace, "sRGB", "Adobe RGB", "Pro Photo RGB");
    }
    public getRawDevEngineDescription(): string {
        return this.getIndexedDescription(OlympusRawDevelopmentMakernoteDirectory.TagRawDevEngine, "High Speed", "High Function", "Advanced High Speed", "Advanced High Function");
    }
    public getRawDevNoiseReductionDescription(): string {
        let value = this._directory.getInteger(OlympusRawDevelopmentMakernoteDirectory.TagRawDevNoiseReduction);
        if (value == null)
            return null;
        if (value == 0)
            return "(none)";
        let sb: string = '';
        let v = value;
        if ((v & 1) != 0)
            sb.concat("Noise Reduction, ");
        if (((v >> 1) & 1) != 0)
            sb.concat("Noise Filter, ");
        if (((v >> 2) & 1) != 0)
            sb.concat("Noise Filter (ISO Boost), ");
        return sb.substring(0, sb.length - 2);
    }
    public getRawDevEditStatusDescription(): string {
        let value = this._directory.getInteger(OlympusRawDevelopmentMakernoteDirectory.TagRawDevEditStatus);
        if (value == null)
            return null;
        switch (value) {
            case 0:
                return "Original";
            case 1:
                return "Edited (Landscape)";
            case 6:
            case 8:
                return "Edited (Portrait)";
            default:
                return "Unknown (" + value + ")";
        }
    }
    public getRawDevSettingsDescription(): string {
        let value = this._directory.getInteger(OlympusRawDevelopmentMakernoteDirectory.TagRawDevSettings);
        if (value == null)
            return null;
        if (value == 0)
            return "(none)";
        let sb: string = '';
        let v = value;
        if ((v & 1) != 0)
            sb.concat("WB Color Temp, ");
        if (((v >> 1) & 1) != 0)
            sb.concat("WB Gray Point, ");
        if (((v >> 2) & 1) != 0)
            sb.concat("Saturation, ");
        if (((v >> 3) & 1) != 0)
            sb.concat("Contrast, ");
        if (((v >> 4) & 1) != 0)
            sb.concat("Sharpness, ");
        if (((v >> 5) & 1) != 0)
            sb.concat("Color Space, ");
        if (((v >> 6) & 1) != 0)
            sb.concat("High Function, ");
        if (((v >> 7) & 1) != 0)
            sb.concat("Noise Reduction, ");
        return sb.substring(0, sb.length - 2);
    }
}
export default OlympusRawDevelopmentMakernoteDescriptor;
