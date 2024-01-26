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
import TagDescriptor from '../TagDescriptor';
import PngDirectory from './PngDirectory';
import PngColorType from '../../imaging/png/PngColorType';
import KeyValuePair from '../../lang/KeyValuePair';
import SequentialReader from '../../lang/SequentialReader';
import SequentialByteArrayReader from '../../lang/SequentialByteArrayReader';
class PngDescriptor extends TagDescriptor<PngDirectory> {
    public constructor(directory: PngDirectory) {
        super(directory);
    }
    public getDescription(tagType: number): string {
        switch (tagType) {
            case PngDirectory.TAG_COLOR_TYPE:
                return this.getColorTypeDescription();
            case PngDirectory.TAG_COMPRESSION_TYPE:
                return this.getCompressionTypeDescription();
            case PngDirectory.TAG_FILTER_METHOD:
                return this.getFilterMethodDescription();
            case PngDirectory.TAG_INTERLACE_METHOD:
                return this.getInterlaceMethodDescription();
            case PngDirectory.TAG_PALETTE_HAS_TRANSPARENCY:
                return this.getPaletteHasTransparencyDescription();
            case PngDirectory.TAG_SRGB_RENDERING_INTENT:
                return this.getIsSrgbColorSpaceDescription();
            case PngDirectory.TAG_TEXTUAL_DATA:
                return this.getTextualDataDescription();
            case PngDirectory.TAG_BACKGROUND_COLOR:
                return this.getBackgroundColorDescription();
            case PngDirectory.TAG_UNIT_SPECIFIER:
                return this.getUnitSpecifierDescription();
            default:
                return super.getDescription(tagType);
        }
    }
    public getColorTypeDescription(): string {
        let value: number = this._directory.getInteger(PngDirectory.TAG_COLOR_TYPE);
        if (value == null) {
            return null;
        }
        let colorType: PngColorType = PngColorType.fromNumericValue(value);
        if (colorType == null) {
            return null;
        }
        return colorType.getDescription();
    }
    public getCompressionTypeDescription(): string {
        return this.getIndexedDescription(PngDirectory.TAG_COMPRESSION_TYPE, 0, "Deflate");
    }
    public getFilterMethodDescription(): string {
        return this.getIndexedDescription(PngDirectory.TAG_FILTER_METHOD, 0, "Adaptive");
    }
    public getInterlaceMethodDescription(): string {
        return this.getIndexedDescription(PngDirectory.TAG_INTERLACE_METHOD, 0, "No Interlace", "Adam7 Interlace");
    }
    public getPaletteHasTransparencyDescription(): string {
        return this.getIndexedDescription(PngDirectory.TAG_PALETTE_HAS_TRANSPARENCY, null, "Yes");
    }
    public getIsSrgbColorSpaceDescription(): string {
        return this.getIndexedDescription(PngDirectory.TAG_SRGB_RENDERING_INTENT, 0, "Perceptual", "Relative Colorimetric", "Saturation", "Absolute Colorimetric");
    }
    public getUnitSpecifierDescription(): string {
        return this.getIndexedDescription(PngDirectory.TAG_UNIT_SPECIFIER, 0, "Unspecified", "Metres");
    }
    public getTextualDataDescription(): string {
        let object: object = this._directory.getObject(PngDirectory.TAG_TEXTUAL_DATA);
        if (object == null) {
            return null;
        }
        //let keyValues = new Set<KeyValuePair>(object);
        let keyValues = new Set<KeyValuePair>();
        let sb: string = '';
        for (let keyValue of keyValues) {
            if (sb.length != 0) {
                sb += '\n';
            }
            sb += keyValue.getKey() + ": " + keyValue.getValue();
        }
        return sb;
    }
    public getBackgroundColorDescription(): string {
        let bytes: Int8Array = this._directory.getByteArray(PngDirectory.TAG_BACKGROUND_COLOR);
        if (bytes == null) {
            return null;
        }
        let reader: SequentialReader = new SequentialByteArrayReader(bytes);
        try {
            // TODO do we need to normalise these based upon the bit depth?
            switch (bytes.length) {
                case 1:
                    return "Palette Index " + reader.getUInt8();
                case 2:
                    return "Greyscale Level " + reader.getUInt16();
                case 6:
                    return "R " + reader.getUInt16() + ", G " + reader.getUInt16() + ", B " + reader.getUInt16();
            }
        }
        catch (error) {
            return null;
        }
        return null;
    }
}
export default PngDescriptor;
