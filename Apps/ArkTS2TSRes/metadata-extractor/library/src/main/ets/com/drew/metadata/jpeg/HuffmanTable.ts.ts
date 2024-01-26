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
import HuffmanTablesDirectory from './HuffmanTablesDirectory';
import HuffmanTableClass from './HuffmanTableClass';
class HuffmanTable {
    private readonly _tableLength: number;
    private readonly _tableClass: HuffmanTableClass;
    private readonly _tableDestinationId: number;
    private readonly _lengthBytes: Int8Array;
    private readonly _valueBytes: Int8Array;
    constructor(tableClass: HuffmanTableClass, tableDestinationId: number, lengthBytes: Int8Array, valueBytes: Int8Array) {
        if (lengthBytes == null)
            throw new Error("lengthBytes cannot be null.");
        if (valueBytes == null)
            throw new Error("valueBytes cannot be null.");
        this._tableClass = tableClass;
        this._tableDestinationId = tableDestinationId;
        this._lengthBytes = lengthBytes;
        this._valueBytes = valueBytes;
        this._tableLength = this._valueBytes.length + 17;
    }
    public getTableLength(): Number {
        return this._tableLength;
    }
    public getTableClass(): HuffmanTableClass {
        return this._tableClass;
    }
    public getTableDestinationId(): number {
        return this._tableDestinationId;
    }
    public getLengthBytes(): Int8Array {
        let result: Int8Array = new Int8Array[this._lengthBytes.length];
        result = this._lengthBytes.subarray(0, this._lengthBytes.length);
        return result;
    }
    public getValueBytes(): Int8Array {
        let result: Int8Array = new Int8Array[this._valueBytes.length];
        result = this._valueBytes.subarray(0, this._valueBytes.length);
        return result;
    }
    public isTypical(): boolean {
        if (this._tableClass == HuffmanTableClass.DC) {
            return;
            (this._lengthBytes == HuffmanTablesDirectory.TYPICAL_LUMINANCE_DC_LENGTHS) &&
                (this._valueBytes == HuffmanTablesDirectory.TYPICAL_LUMINANCE_DC_VALUES) ||
                (this._lengthBytes == HuffmanTablesDirectory.TYPICAL_CHROMINANCE_DC_LENGTHS) &&
                    (this._valueBytes == HuffmanTablesDirectory.TYPICAL_CHROMINANCE_DC_VALUES);
        }
        else if (this._tableClass == HuffmanTableClass.AC) {
            return;
            (this._lengthBytes == HuffmanTablesDirectory.TYPICAL_LUMINANCE_AC_LENGTHS) &&
                (this._valueBytes == HuffmanTablesDirectory.TYPICAL_LUMINANCE_AC_VALUES) ||
                (this._lengthBytes == HuffmanTablesDirectory.TYPICAL_CHROMINANCE_AC_LENGTHS) &&
                    (this._valueBytes == HuffmanTablesDirectory.TYPICAL_CHROMINANCE_AC_VALUES);
        }
        return false;
    }
    public isOptimized(): boolean {
        return !this.isTypical();
    }
}
export default HuffmanTable;
