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
class TiffDataFormat {
    public static readonly CODE_INT8_U: number = 1;
    public static readonly CODE_STRING: number = 2;
    public static readonly CODE_INT16_U: number = 3;
    public static readonly CODE_INT32_U: number = 4;
    public static readonly CODE_RATIONAL_U: number = 5;
    public static readonly CODE_INT8_S: number = 6;
    public static readonly CODE_UNDEFINED: number = 7;
    public static readonly CODE_INT16_S: number = 8;
    public static readonly CODE_INT32_S: number = 9;
    public static readonly CODE_RATIONAL_S: number = 10;
    public static readonly CODE_SINGLE: number = 11;
    public static readonly CODE_DOUBLE: number = 12;
    public static readonly INT8_U: TiffDataFormat = new TiffDataFormat("BYTE", TiffDataFormat.CODE_INT8_U, 1);
    public static readonly STRING: TiffDataFormat = new TiffDataFormat("STRING", TiffDataFormat.CODE_STRING, 1);
    public static readonly INT16_U: TiffDataFormat = new TiffDataFormat("USHORT", TiffDataFormat.CODE_INT16_U, 2);
    public static readonly INT32_U: TiffDataFormat = new TiffDataFormat("ULONG", TiffDataFormat.CODE_INT32_U, 4);
    public static readonly RATIONAL_U: TiffDataFormat = new TiffDataFormat("URATIONAL", TiffDataFormat.CODE_RATIONAL_U, 8);
    public static readonly INT8_S: TiffDataFormat = new TiffDataFormat("SBYTE", TiffDataFormat.CODE_INT8_S, 1);
    public static readonly UNDEFINED: TiffDataFormat = new TiffDataFormat("UNDEFINED", TiffDataFormat.CODE_UNDEFINED, 1);
    public static readonly INT16_S: TiffDataFormat = new TiffDataFormat("SSHORT", TiffDataFormat.CODE_INT16_S, 2);
    public static readonly INT32_S: TiffDataFormat = new TiffDataFormat("SLONG", TiffDataFormat.CODE_INT32_S, 4);
    public static readonly RATIONAL_S: TiffDataFormat = new TiffDataFormat("SRATIONAL", TiffDataFormat.CODE_RATIONAL_S, 8);
    public static readonly SINGLE: TiffDataFormat = new TiffDataFormat("SINGLE", TiffDataFormat.CODE_SINGLE, 4);
    public static readonly DOUBLE: TiffDataFormat = new TiffDataFormat("DOUBLE", TiffDataFormat.CODE_DOUBLE, 8);
    private readonly _name: string;
    private readonly _tiffFormatCode: number;
    private readonly _componentSizeBytes: number;
    public static fromTiffFormatCode(tiffFormatCode: number): TiffDataFormat {
        switch (tiffFormatCode) {
            case 1:
                return TiffDataFormat.INT8_U;
            case 2:
                return TiffDataFormat.STRING;
            case 3:
                return TiffDataFormat.INT16_U;
            case 4:
                return TiffDataFormat.INT32_U;
            case 5:
                return TiffDataFormat.RATIONAL_U;
            case 6:
                return TiffDataFormat.INT8_S;
            case 7:
                return TiffDataFormat.UNDEFINED;
            case 8:
                return TiffDataFormat.INT16_S;
            case 9:
                return TiffDataFormat.INT32_S;
            case 10:
                return TiffDataFormat.RATIONAL_S;
            case 11:
                return TiffDataFormat.SINGLE;
            case 12:
                return TiffDataFormat.DOUBLE;
        }
        return null;
    }
    private constructor(name: string, tiffFormatCode: number, componentSizeBytes: number) {
        this._name = name;
        this._tiffFormatCode = tiffFormatCode;
        this._componentSizeBytes = componentSizeBytes;
    }
    public getComponentSizeBytes(): number {
        return this._componentSizeBytes;
    }
    public getTiffFormatCode(): number {
        return this._tiffFormatCode;
    }
    public toString(): string {
        return this._name;
    }
}
export default TiffDataFormat;
