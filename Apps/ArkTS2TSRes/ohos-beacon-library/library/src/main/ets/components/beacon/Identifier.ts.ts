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
class Identifier {
    private static readonly HEX_REGEXP: RegExp = new RegExp("^0x[0-9A-Fa-f]*$");
    private static readonly HEX_REGEXP_NO_PREFIX: RegExp = new RegExp("^[0-9A-Fa-f]*$");
    private static readonly DECIMAL_REGEXP: RegExp = new RegExp("^0|[1-9][0-9]*$");
    private static readonly UUID_REGEXP: RegExp = new RegExp("^[0-9A-Fa-f]{8}-?[0-9A-Fa-f]{4}-?[0-9A-Fa-f]{4}-?[0-9A-Fa-f]{4}-?[0-9A-Fa-f]{12}$");
    private static readonly MAX_NUMBER: number = 65535;
    private mValue: Array<number> = [];
    constructor(value: Array<number>) {
        if (value == null) {
            throw new Error("Identifiers cannot be constructed from null pointers but \"value\" is null.");
        }
        this.mValue = value;
        return this;
    }
    public static parse(stringValue: string, desiredByteLength?: number): Identifier {
        if (desiredByteLength == null || desiredByteLength == 0) {
            desiredByteLength = -1;
        }
        if (stringValue == null || stringValue == "") {
            throw new Error("Identifiers cannot be constructed from null pointers but \"stringValue\" is null.");
        }
        if (this.HEX_REGEXP.test(stringValue)) {
            return this.parseHex(stringValue.substring(2), desiredByteLength);
        }
        if (this.UUID_REGEXP.test(stringValue)) {
            return this.parseHex(stringValue.replace(/-/g, ""), desiredByteLength);
        }
        if (this.DECIMAL_REGEXP.test(stringValue)) {
            var value: number = -1;
            try {
                value = parseInt(stringValue);
            }
            catch (Error) {
                throw new TypeError("Unable to parse Identifier in decimal format.");
            }
            if (desiredByteLength <= 0 || desiredByteLength == 2) {
                return this.fromInt(value);
            }
            else {
                return this.fromLong(value, desiredByteLength);
            }
        }
        if (this.HEX_REGEXP_NO_PREFIX.test(stringValue)) {
            return this.parseHex(stringValue, desiredByteLength);
        }
        throw new Error("Unable to parse Identifier.");
    }
    private static parseHex(identifierString: string, desiredByteLength: number): Identifier {
        let str: string = identifierString.length % 2 == 0 ? "" : "0";
        str += identifierString.toUpperCase();
        if (desiredByteLength > 0 && desiredByteLength < str.length / 2) {
            str = str.substring(str.length - desiredByteLength * 2);
        }
        if (desiredByteLength > 0 && desiredByteLength > str.length / 2) {
            let extraCharsToAdd: number = desiredByteLength * 2 - str.length;
            let sb: string;
            while (sb.length < extraCharsToAdd) {
                sb = sb + "0";
            }
            str = sb.toString() + str;
        }
        let result: Array<number> = new Array();
        for (let i: number = 0; i < (str.length / 2); i++) {
            let value = parseInt(str.substring(i * 2, i * 2 + 2), 16) & 0xFF;
            if (value > 127) {
                value = -(256 - value);
            }
            result.push(value);
        }
        return new Identifier(result);
    }
    public static fromInt(numberValue: number): Identifier {
        if (numberValue < 0 || numberValue > this.MAX_NUMBER) {
            throw new Error("Identifiers can only be constructed from integers between 0 and " + this.MAX_NUMBER + " (inclusive).");
        }
        var newValue: Array<number> = new Array();
        let value1 = numberValue >> 8;
        if (value1 > 127) {
            value1 = -(256 - value1);
        }
        newValue[0] = value1;
        let value2 = numberValue;
        if (value2 > 127) {
            value2 = -(256 - value2);
        }
        newValue[1] = value2;
        return new Identifier(newValue);
    }
    public static fromLong(longValue: number, desiredByteLength: number): Identifier {
        if (desiredByteLength < 0) {
            throw new Error("Identifier length must be > 0.");
        }
        let newValue: Array<number> = new Array();
        for (let i: number = desiredByteLength - 1; i >= 0; i--) {
            let value = (longValue & 0xff);
            if (value > 127) {
                value = -(256 - value);
            }
            newValue[i] = value;
            longValue = longValue >> 8;
        }
        return new Identifier(newValue);
    }
    public static fromBytes(bytes: Array<number>, start: number, end: number, littleEndian: boolean): Identifier {
        if (bytes == null) {
            throw new Error("Identifiers cannot be constructed from null pointers but \"bytes\" is null.");
        }
        if (start < 0 || start > bytes.length) {
            throw new RangeError("start < 0 || start > bytes.length");
        }
        if (end > bytes.length) {
            throw new RangeError("end > bytes.length");
        }
        if (start > end) {
            throw new Error("start > end");
        }
        let byteRange: Array<number> = bytes.slice(start, end);
        if (littleEndian) {
            this.reverseArray(byteRange);
        }
        return new Identifier(byteRange);
    }
    public toByteArrayOfSpecifiedEndianness(bigEndian: boolean): Array<number> {
        var copy: Array<number> = this.mValue;
        if (!bigEndian) {
            Identifier.reverseArray(copy);
        }
        return copy;
    }
    private static reverseArray(bytes: Array<number>): void {
        for (var i: number = 0; i < bytes.length / 2; i++) {
            var mirroredIndex: number = bytes.length - i - 1;
            var tmp: number = bytes[i];
            bytes[i] = bytes[mirroredIndex];
            bytes[mirroredIndex] = tmp;
        }
    }
    public getByteCount(): number {
        return this.mValue.length;
    }
    public toString(): string {
        // Note:  the toString() method is also used for serialization and deserialization.  So
        // toString() and parse() must always return objects that return true when you call equals()
        if (this.mValue.length == 2) {
            return this.toInt().toString();
        }
        return this.toHexString();
    }
    public equals(that: Object): boolean {
        if (!(that instanceof Identifier)) {
            return false;
        }
        let thatIdentifier: Identifier = that;
        return this.mValue.toString() == thatIdentifier.mValue.toString();
    }
    public toInt(): number {
        if (this.mValue.length > 2) {
            throw new Error("Only supported for Identifiers with max byte length of 2");
        }
        var result: number = 0;
        for (var i: number = 0; i < this.mValue.length; i++) {
            var tmp: number = new Number(this.mValue[i]).valueOf();
            result |= (tmp & 0xFF) << ((this.mValue.length - i - 1) * 8);
        }
        return result;
    }
    private static readonly HEX_DIGITS: Array<string> = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    public toHexString(): string {
        var l: number = this.mValue.length;
        var out: Array<string> = new Array();
        out[0] = '0';
        out[1] = 'x';
        for (var i: number = 0, j = 2; i < l; i++) {
            var tmp: number = new Number(this.mValue[i]).valueOf();
            out[j++] = Identifier.HEX_DIGITS[(0xF0 & tmp) >>> 4];
            out[j++] = Identifier.HEX_DIGITS[0x0F & tmp];
        }
        return out.toString();
    }
    public toByteArray(): Array<number> {
        return this.mValue;
    }
}
export default Identifier;
