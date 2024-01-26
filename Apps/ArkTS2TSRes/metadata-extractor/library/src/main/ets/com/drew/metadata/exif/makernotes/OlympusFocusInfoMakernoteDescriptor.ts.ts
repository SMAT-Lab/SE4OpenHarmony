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
import OlympusFocusInfoMakernoteDirectory from './OlympusFocusInfoMakernoteDirectory';
/**
 * Provides human-readable String representations of tag values stored in a {@link OlympusFocusInfoMakernoteDirectory}.
 * <p>
 * Some Description functions converted from Exiftool version 10.10 created by Phil Harvey
 */
class OlympusFocusInfoMakernoteDescriptor extends TagDescriptor<OlympusFocusInfoMakernoteDirectory> {
    constructor(directory: OlympusFocusInfoMakernoteDirectory) {
        super(directory);
    }
    public getDescription(tagType: number): string {
        switch (tagType) {
            case OlympusFocusInfoMakernoteDirectory.TagFocusInfoVersion:
                return this.getFocusInfoVersionDescription();
            case OlympusFocusInfoMakernoteDirectory.TagAutoFocus:
                return this.getAutoFocusDescription();
            case OlympusFocusInfoMakernoteDirectory.TagFocusDistance:
                return this.getFocusDistanceDescription();
            case OlympusFocusInfoMakernoteDirectory.TagAfPoint:
                return this.getAfPointDescription();
            case OlympusFocusInfoMakernoteDirectory.TagExternalFlash:
                return this.getExternalFlashDescription();
            case OlympusFocusInfoMakernoteDirectory.TagExternalFlashBounce:
                return this.getExternalFlashBounceDescription();
            case OlympusFocusInfoMakernoteDirectory.TagExternalFlashZoom:
                return this.getExternalFlashZoomDescription();
            case OlympusFocusInfoMakernoteDirectory.TagManualFlash:
                return this.getManualFlashDescription();
            case OlympusFocusInfoMakernoteDirectory.TagMacroLed:
                return this.getMacroLedDescription();
            case OlympusFocusInfoMakernoteDirectory.TagSensorTemperature:
                return this.getSensorTemperatureDescription();
            case OlympusFocusInfoMakernoteDirectory.TagImageStabilization:
                return this.getImageStabilizationDescription();
            default:
                return super.getDescription(tagType);
        }
    }
    public getFocusInfoVersionDescription(): string {
        return this.getVersionBytesDescription(OlympusFocusInfoMakernoteDirectory.TagFocusInfoVersion, 4);
    }
    public getAutoFocusDescription(): string {
        return this.getIndexedDescription(OlympusFocusInfoMakernoteDirectory.TagAutoFocus, "Off", "On");
    }
    public getFocusDistanceDescription(): string {
        let value = this._directory.getRational(OlympusFocusInfoMakernoteDirectory.TagFocusDistance);
        if (value == null)
            return "inf";
        if (value.getNumerator() == 0xFFFFFFFF || value.getNumerator() == 0x00000000)
            return "inf";
        return value.getNumerator() / 1000.0 + " m";
    }
    public getAfPointDescription(): string {
        let value = this._directory.getInteger(OlympusFocusInfoMakernoteDirectory.TagAfPoint);
        if (value == null)
            return null;
        return value.toString();
    }
    public getExternalFlashDescription(): string {
        let values = this._directory.getIntArray(OlympusFocusInfoMakernoteDirectory.TagExternalFlash);
        if (values == null || values.length < 2)
            return null;
        let join = parseInt(values[0]).toString() + " " + parseInt(values[1]).toString();
        if (join == "0 0")
            return "Off";
        else if (join == "1 0")
            return "On";
        else
            return "Unknown (" + join + ")";
    }
    public getExternalFlashBounceDescription(): string {
        return this.getIndexedDescription(OlympusFocusInfoMakernoteDirectory.TagExternalFlashBounce, "Bounce or Off", "Direct");
    }
    public getExternalFlashZoomDescription(): string {
        let values = this._directory.getIntArray(OlympusFocusInfoMakernoteDirectory.TagExternalFlashZoom);
        if (values == null) {
            // check if it's only one value long also
            let value = this._directory.getInteger(OlympusFocusInfoMakernoteDirectory.TagExternalFlashZoom);
            if (value == null)
                return null;
            values = new Array<number>();
            values[0] = value;
        }
        if (values.length == 0)
            return null;
        let join = parseInt(values[0]).toString();
        if (values.length > 1)
            join += " " + parseInt(values[1]).toString();
        if (join == "0")
            return "Off";
        else if (join == "1")
            return "On";
        else if (join == "0 0")
            return "Off";
        else if (join == "1 0")
            return "On";
        else
            return "Unknown (" + join + ")";
    }
    public getManualFlashDescription(): string {
        let values = this._directory.getIntArray(OlympusFocusInfoMakernoteDirectory.TagManualFlash);
        if (values == null)
            return null;
        if (values[0] == 0)
            return "Off";
        if (values[1] == 1)
            return "Full";
        return "On (1/" + values[1] + " strength)";
    }
    public getMacroLedDescription(): string {
        return this.getIndexedDescription(OlympusFocusInfoMakernoteDirectory.TagMacroLed, "Off", "On");
    }
    /// <remarks>
    /// <para>TODO: Complete when Camera Model is available.</para>
    /// <para>There are differences in how to interpret this tag that can only be reconciled by knowing the model.</para>
    /// </remarks>
    public getSensorTemperatureDescription(): string {
        return this._directory.getString(OlympusFocusInfoMakernoteDirectory.TagSensorTemperature);
    }
    public getImageStabilizationDescription(): string {
        let values = this._directory.getByteArray(OlympusFocusInfoMakernoteDirectory.TagImageStabilization);
        if (values == null)
            return null;
        if ((values[0] | values[1] | values[2] | values[3]) == 0x0)
            return "Off";
        return "On, " + ((values[43] & 1) > 0 ? "Mode 1" : "Mode 2");
    }
}
export default OlympusFocusInfoMakernoteDescriptor;
