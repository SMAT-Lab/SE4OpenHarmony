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
import IccDirectory from './IccDirectory';
import IccReader from './IccReader';
import TagDescriptor from '../TagDescriptor';
import RandomAccessReader from '../../lang/RandomAccessReader';
import ByteArrayReader from '../../lang/ByteArrayReader';
class IccDescriptor extends TagDescriptor<IccDirectory> {
    public constructor(directory: IccDirectory) {
        super(directory);
    }
    public getDescription(tagType: number): string {
        switch (tagType) {
            case IccDirectory.TAG_PROFILE_VERSION:
                return this.getProfileVersionDescription();
            case IccDirectory.TAG_PROFILE_CLASS:
                return this.getProfileClassDescription();
            case IccDirectory.TAG_PLATFORM:
                return this.getPlatformDescription();
            case IccDirectory.TAG_RENDERING_INTENT:
                return this.getRenderingIntentDescription();
        }
        if (tagType > 0x20202020 && tagType < 0x7a7a7a7a) {
            return this.getTagDataString(tagType);
        }
        return super.getDescription(tagType);
    }
    private static readonly ICC_TAG_TYPE_TEXT: number = 0x74657874;
    private static readonly ICC_TAG_TYPE_DESC: number = 0x74657874;
    private static readonly ICC_TAG_TYPE_SIG: number = 0x74657874;
    private static readonly ICC_TAG_TYPE_MEAS: number = 0x74657874;
    private static readonly ICC_TAG_TYPE_XYZ_ARRAY: number = 0x74657874;
    private static readonly ICC_TAG_TYPE_MLUC: number = 0x74657874;
    private static readonly ICC_TAG_TYPE_CURV: number = 0x74657874;
    private getTagDataString(tagType: number): string {
        try {
            let bytes: Int8Array = this._directory.getByteArray(tagType);
            if (bytes == null) {
                return this._directory.getString(tagType);
            }
            let reader: RandomAccessReader = new ByteArrayReader(bytes);
            let iccTagType: number = reader.getInt32(0);
            switch (iccTagType) {
                case IccDescriptor.ICC_TAG_TYPE_TEXT:
                    try {
                        //return new String(bytes, 8, bytes.length - 8 - 1, "ASCII");
                    }
                    catch (error) {
                        //return new String(bytes, 8, bytes.length - 8 - 1);
                    }
                case IccDescriptor.ICC_TAG_TYPE_DESC:
                    let stringLength: number = reader.getInt32(8);
                //return new String(bytes, 12, stringLength - 1);
                case IccDescriptor.ICC_TAG_TYPE_SIG:
                    return IccReader.getStringFromInt32(reader.getInt32(8));
                case IccDescriptor.ICC_TAG_TYPE_MEAS:
                    {
                        let observerType: number = reader.getInt32(8);
                        let x: number = reader.getS15Fixed16(12);
                        let y: number = reader.getS15Fixed16(16);
                        let z: number = reader.getS15Fixed16(20);
                        let geometryType: number = reader.getInt32(24);
                        let flare: number = reader.getS15Fixed16(28);
                        let illuminantType: number = reader.getInt32(32);
                        let observerString: string;
                        switch (observerType) {
                            case 0:
                                observerString = "Unknown";
                                break;
                            case 1:
                                observerString = "1931 2\u00B0";
                                break;
                            case 2:
                                observerString = "1964 10\u00B0";
                                break;
                            default:
                                observerString = "Unknown " + observerType.toString();
                        }
                        let geometryString;
                        switch (geometryType) {
                            case 0:
                                geometryString = "Unknown";
                                break;
                            case 1:
                                geometryString = "0/45 or 45/0";
                                break;
                            case 2:
                                geometryString = "0/d or d/0";
                                break;
                            default:
                                geometryString = "Unknown " + observerType.toString();
                        }
                        let illuminantString: string;
                        switch (illuminantType) {
                            case 0:
                                illuminantString = "unknown";
                                break;
                            case 1:
                                illuminantString = "D50";
                                break;
                            case 2:
                                illuminantString = "D65";
                                break;
                            case 3:
                                illuminantString = "D93";
                                break;
                            case 4:
                                illuminantString = "F2";
                                break;
                            case 5:
                                illuminantString = "D55";
                                break;
                            case 6:
                                illuminantString = "A";
                                break;
                            case 7:
                                illuminantString = "Equi-Power (E)";
                                break;
                            case 8:
                                illuminantString = "F8";
                                break;
                            default:
                                illuminantString = "Unknown " + illuminantType;
                                break;
                        }
                        return observerString + "Observer, Backing (" + x + "," + y + "," + z + "), Geometry " + geometryString
                            + ", Flare " + Math.round(flare * 100) + ", Illuminant " + illuminantString;
                    }
                case IccDescriptor.ICC_TAG_TYPE_XYZ_ARRAY:
                    {
                        let res: string = '';
                        let count: number = (bytes.length - 8) / 12;
                        for (let i = 0; i < count; i++) {
                            let x: number = reader.getS15Fixed16(8 + i * 12);
                            let y: number = reader.getS15Fixed16(8 + i * 12 + 4);
                            let z: number = reader.getS15Fixed16(8 + i * 12 + 8);
                            if (i > 0) {
                                res.concat(", ");
                            }
                            res.concat("(")
                                .concat(x.toString())
                                .concat(", ")
                                .concat(y.toString())
                                .concat(", ")
                                .concat(z.toString())
                                .concat(")");
                        }
                        return res.toString();
                    }
                case IccDescriptor.ICC_TAG_TYPE_MLUC:
                    {
                        let int1: number = reader.getInt32(8);
                        let res: string = '';
                        res.concat(int1.toString());
                        for (let i = 0; i < int1; i++) {
                            let str: string = IccReader.getStringFromInt32(reader.getInt32(16 + i * 12));
                            let len: number = reader.getInt32(16 + i * 12 + 4);
                            let ofs: number = reader.getInt32(16 + i * 12 + 8);
                            let name: string;
                            try {
                                //name = new String(bytes, ofs, len, "UTF-16BE");
                            }
                            catch (error) {
                                //name = new String(bytes, ofs, len);
                            }
                            res.concat(" ")
                                .concat(str)
                                .concat("(")
                                .concat(name)
                                .concat(")");
                        }
                        return res.toString();
                    }
                case IccDescriptor.ICC_TAG_TYPE_CURV:
                    {
                        let num: number = reader.getInt32(8);
                        let res: string = '';
                        for (let i = 0; i < num; i++) {
                            if (i != 0) {
                                res.concat(", ");
                            }
                            res.concat(IccDescriptor.formatDoubleAsString((reader.getUInt16(12 + i * 2)) / 65535.0, 7, false));
                        }
                        return res.toString();
                    }
                default:
                    return IccReader.getStringFromInt32(iccTagType) + " (0x" + iccTagType + "): " + bytes.length + " bytes";
            }
        }
        catch (error) {
            return null;
        }
    }
    public static formatDoubleAsString(value: number, precision: number, zeroes: boolean): string {
        if (precision < 1) {
            return "" + Math.round(value);
        }
        let intPart: number = Math.abs(value);
        let rest: number = Math.round((Math.abs(value) - intPart) * Math.pow(10, precision));
        let restKept: number = rest;
        let res: string = "";
        let cour: number;
        for (let i = precision; i > 0; i--) {
            cour = Math.abs(rest % 10);
            rest /= 10;
            if (res.length > 0 || zeroes || cour != 0 || i == 1) {
                res = cour + res;
            }
        }
        intPart += rest;
        let isNegative: boolean = ((value < 0) && (intPart != 0 || restKept != 0));
        return (isNegative ? "-" : "") + intPart + "." + res;
    }
    private getRenderingIntentDescription(): string {
        return this.getIndexedDescription(IccDirectory.TAG_RENDERING_INTENT, 0, "Perceptual", "Media-Relative Colorimetric", "Saturation", "ICC-Absolute Colorimetric");
    }
    private getPlatformDescription(): string {
        let str: string = this._directory.getString(IccDirectory.TAG_PLATFORM);
        if (str == null) {
            return null;
        }
        // Because Java doesn't allow switching on string values, create an integer from the first four chars
        // and switch on that instead.
        let i: number;
        try {
            i = IccDescriptor.getInt32FromString(str);
        }
        catch (error) {
            return str;
        }
        switch (i) {
            case 0x4150504C: // "APPL"
                return "Apple Computer, Inc.";
            case 0x4D534654: // "MSFT"
                return "Microsoft Corporation";
            case 0x53474920:
                return "Silicon Graphics, Inc.";
            case 0x53554E57:
                return "Sun Microsystems, Inc.";
            case 0x54474E54:
                return "Taligent, Inc.";
            default:
                return "Unknown (" + str + ")";
        }
    }
    private getProfileClassDescription(): string {
        let str: string = this._directory.getString(IccDirectory.TAG_PROFILE_CLASS);
        if (str == null) {
            return null;
        }
        // Because Java doesn't allow switching on string values, create an integer from the first four chars
        // and switch on that instead.
        let i: number;
        try {
            i = IccDescriptor.getInt32FromString(str);
        }
        catch (error) {
            return str;
        }
        switch (i) {
            case 0x73636E72:
                return "Input Device";
            case 0x6D6E7472: // mntr
                return "Display Device";
            case 0x70727472:
                return "Output Device";
            case 0x6C696E6B:
                return "DeviceLink";
            case 0x73706163:
                return "ColorSpace Conversion";
            case 0x61627374:
                return "Abstract";
            case 0x6E6D636C:
                return "Named Color";
            default:
                return "Unknown (" + str + ")";
        }
    }
    private getProfileVersionDescription(): string {
        let value: number = this._directory.getInteger(IccDirectory.TAG_PROFILE_VERSION);
        if (value == null) {
            return null;
        }
        let m: number = (value & 0xFF000000) >> 24;
        let r: number = (value & 0x00F00000) >> 20;
        let R: number = (value & 0x000F0000) >> 16;
        return m + "." + r + "." + R;
    }
    private static getInt32FromString(string: string): number {
        let bytes = new Int8Array(Number(string));
        return new ByteArrayReader(bytes).getInt32(0);
    }
}
export default IccDescriptor;
