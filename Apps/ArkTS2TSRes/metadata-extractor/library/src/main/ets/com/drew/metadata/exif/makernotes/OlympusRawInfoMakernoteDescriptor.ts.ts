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
import Rational from '../../../lang/Rational';
import TagDescriptor from '../../TagDescriptor';
import OlympusRawInfoMakernoteDirectory from './OlympusRawInfoMakernoteDirectory';
/**
 * Provides human-readable String representations of tag values stored in a {@link OlympusRawInfoMakernoteDirectory}.
 * <p>
 * Some Description functions converted from Exiftool version 10.33 created by Phil Harvey
 */
class OlympusRawInfoMakernoteDescriptor extends TagDescriptor<OlympusRawInfoMakernoteDirectory> {
    constructor(directory: OlympusRawInfoMakernoteDirectory) {
        super(directory);
    }
    public getDescription(tagType: number): string {
        switch (tagType) {
            case OlympusRawInfoMakernoteDirectory.TagRawInfoVersion:
                return this.getVersionBytesDescription(OlympusRawInfoMakernoteDirectory.TagRawInfoVersion, 4);
            case OlympusRawInfoMakernoteDirectory.TagColorMatrix2:
                return this.getColorMatrix2Description();
            case OlympusRawInfoMakernoteDirectory.TagYCbCrCoefficients:
                return this.getYCbCrCoefficientsDescription();
            case OlympusRawInfoMakernoteDirectory.TagLightSource:
                return this.getOlympusLightSourceDescription();
            default:
                return super.getDescription(tagType);
        }
    }
    public getColorMatrix2Description(): string {
        let values = this._directory.getIntArray(OlympusRawInfoMakernoteDirectory.TagColorMatrix2);
        if (values == null)
            return null;
        let sb: string = '';
        for (let i = 0; i < values.length; i++) {
            sb.concat(values[i]);
            if (i < values.length - 1)
                sb.concat(" ");
        }
        return sb.length == 0 ? null : sb.toString();
    }
    public getYCbCrCoefficientsDescription(): string {
        let values = this._directory.getIntArray(OlympusRawInfoMakernoteDirectory.TagYCbCrCoefficients);
        if (values == null)
            return null;
        let ret = new Rational[values.length / 2];
        for (let i = 0; i < values.length / 2; i++) {
            ret[i] = new Rational(values[2 * i], values[2 * i + 1]);
        }
        let sb: string = '';
        for (let i = 0; i < ret.length; i++) {
            sb.concat(ret[i].doubleValue());
            if (i < ret.length - 1)
                sb.concat(" ");
        }
        return sb.length == 0 ? null : sb.toString();
    }
    public getOlympusLightSourceDescription(): string {
        let value = this._directory.getInteger(OlympusRawInfoMakernoteDirectory.TagLightSource);
        if (value == null)
            return null;
        switch (value.shortValue()) {
            case 0:
                return "Unknown";
            case 16:
                return "Shade";
            case 17:
                return "Cloudy";
            case 18:
                return "Fine Weather";
            case 20:
                return "Tungsten (Incandescent)";
            case 22:
                return "Evening Sunlight";
            case 33:
                return "Daylight Fluorescent";
            case 34:
                return "Day White Fluorescent";
            case 35:
                return "Cool White Fluorescent";
            case 36:
                return "White Fluorescent";
            case 256:
                return "One Touch White Balance";
            case 512:
                return "Custom 1-4";
            default:
                return "Unknown (" + value + ")";
        }
    }
}
export default OlympusRawInfoMakernoteDescriptor;
