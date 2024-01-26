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
import OlympusRawDevelopment2MakernoteDirectory from './OlympusRawDevelopment2MakernoteDirectory';
/**
 * Provides human-readable String representations of tag values stored in a {@link OlympusRawDevelopment2MakernoteDirectory}.
 * <p>
 * Some Description functions converted from Exiftool version 10.10 created by Phil Harvey
 */
class OlympusRawDevelopment2MakernoteDescriptor extends TagDescriptor<OlympusRawDevelopment2MakernoteDirectory> {
    constructor(directory: OlympusRawDevelopment2MakernoteDirectory) {
        super(directory);
    }
    public getDescription(tagType: number): string {
        switch (tagType) {
            case OlympusRawDevelopment2MakernoteDirectory.TagRawDevVersion:
                return this.getRawDevVersionDescription();
            case OlympusRawDevelopment2MakernoteDirectory.TagRawDevExposureBiasValue:
                return this.getRawDevExposureBiasValueDescription();
            case OlympusRawDevelopment2MakernoteDirectory.TagRawDevColorSpace:
                return this.getRawDevColorSpaceDescription();
            case OlympusRawDevelopment2MakernoteDirectory.TagRawDevNoiseReduction:
                return this.getRawDevNoiseReductionDescription();
            case OlympusRawDevelopment2MakernoteDirectory.TagRawDevEngine:
                return this.getRawDevEngineDescription();
            case OlympusRawDevelopment2MakernoteDirectory.TagRawDevPictureMode:
                return this.getRawDevPictureModeDescription();
            case OlympusRawDevelopment2MakernoteDirectory.TagRawDevPmBwFilter:
                return this.getRawDevPmBwFilterDescription();
            case OlympusRawDevelopment2MakernoteDirectory.TagRawDevPmPictureTone:
                return this.getRawDevPmPictureToneDescription();
            case OlympusRawDevelopment2MakernoteDirectory.TagRawDevArtFilter:
                return this.getRawDevArtFilterDescription();
            default:
                return super.getDescription(tagType);
        }
    }
    public getRawDevVersionDescription(): string {
        return this.getVersionBytesDescription(OlympusRawDevelopment2MakernoteDirectory.TagRawDevVersion, 4);
    }
    public getRawDevExposureBiasValueDescription(): string {
        return this.getIndexedDescription(OlympusRawDevelopment2MakernoteDirectory.TagRawDevExposureBiasValue, 1, "Color Temperature", "Gray Point");
    }
    public getRawDevColorSpaceDescription(): string {
        return this.getIndexedDescription(OlympusRawDevelopment2MakernoteDirectory.TagRawDevColorSpace, "sRGB", "Adobe RGB", "Pro Photo RGB");
    }
    public getRawDevNoiseReductionDescription(): string {
        let value = this._directory.getInteger(OlympusRawDevelopment2MakernoteDirectory.TagRawDevNoiseReduction);
        if (value == null)
            return null;
        if (value == 0)
            return "(none)";
        var sb: string = '';
        let v = value;
        if ((v & 1) != 0)
            sb.concat("Noise Reduction, ");
        if (((v >> 1) & 1) != 0)
            sb.concat("Noise Filter, ");
        if (((v >> 2) & 1) != 0)
            sb.concat("Noise Filter (ISO Boost), ");
        if (((v >> 3) & 1) != 0)
            sb.concat("Noise Filter (Auto), ");
        if (sb.length > 2) {
            sb.substr(0, sb.length - 2).concat(sb.substr(sb.length));
        }
        return sb.toString();
    }
    public getRawDevEngineDescription(): string {
        return this.getIndexedDescription(OlympusRawDevelopment2MakernoteDirectory.TagRawDevEngine, "High Speed", "High Function", "Advanced High Speed", "Advanced High Function");
    }
    public getRawDevPictureModeDescription(): string {
        let value = this._directory.getInteger(OlympusRawDevelopment2MakernoteDirectory.TagRawDevPictureMode);
        if (value == null)
            return null;
        switch (value) {
            case 1:
                return "Vivid";
            case 2:
                return "Natural";
            case 3:
                return "Muted";
            case 256:
                return "Monotone";
            case 512:
                return "Sepia";
            default:
                return "Unknown (" + value + ")";
        }
    }
    public getRawDevPmBwFilterDescription(): string {
        return this.getIndexedDescription(OlympusRawDevelopment2MakernoteDirectory.TagRawDevPmBwFilter, "Neutral", "Yellow", "Orange", "Red", "Green");
    }
    public getRawDevPmPictureToneDescription(): string {
        return this.getIndexedDescription(OlympusRawDevelopment2MakernoteDirectory.TagRawDevPmPictureTone, "Neutral", "Sepia", "Blue", "Purple", "Green");
    }
    public getRawDevArtFilterDescription(): string {
        return this.getFilterDescription(OlympusRawDevelopment2MakernoteDirectory.TagRawDevArtFilter);
    }
    public getFilterDescription(tag: number): string {
        let values = this._directory.getIntArray(tag);
        if (values == null || values.length == 0)
            return null;
        var sb: string = '';
        for (let i = 0; i < values.length; i++) {
            if (i == 0)
                sb.concat(OlympusRawDevelopment2MakernoteDescriptor._filters.has(values[i]) ? OlympusRawDevelopment2MakernoteDescriptor._filters.get(values[i]) : "[unknown]");
            else
                sb.concat(values[i]).concat("; ");
            sb.concat("; ");
        }
        return sb.substring(0, sb.length - 2);
    }
    // RawDevArtFilter values
    private static _filters: Map<number, string> = new Map([
        [0, "Off"],
        [1, "Soft Focus"],
        [2, "Pop Art"],
        [3, "Pale & Light Color"],
        [4, "Light Tone"],
        [5, "Pin Hole"],
        [6, "Grainy Film"],
        [9, "Diorama"],
        [10, "Cross Process"],
        [12, "Fish Eye"],
        [13, "Drawing"],
        [14, "Gentle Sepia"],
        [15, "Pale & Light Color II"],
        [16, "Pop Art II"],
        [17, "Pin Hole II"],
        [18, "Pin Hole III"],
        [19, "Grainy Film II"],
        [20, "Dramatic Tone"],
        [21, "Punk"],
        [22, "Soft Focus 2"],
        [23, "Sparkle"],
        [24, "Watercolor"],
        [25, "Key Line"],
        [26, "Key Line II"],
        [27, "Miniature"],
        [28, "Reflection"],
        [29, "Fragmented"],
        [31, "Cross Process II"],
        [32, "Dramatic Tone II"],
        [33, "Watercolor I"],
        [34, "Watercolor II"],
        [35, "Diorama II"],
        [36, "Vintage"],
        [37, "Vintage II"],
        [38, "Vintage III"],
        [39, "Partial Color"],
        [40, "Partial Color II"],
        [41, "Partial Color III"]
    ]);
}
export default OlympusRawDevelopment2MakernoteDescriptor;
