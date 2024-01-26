// @ts-nocheck
/**
 *  MIT License
 *
 *  Copyright (c) 2023 Huawei Device Co., Ltd.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */
import { EncodedText } from "./EncodedText";
import { System } from "./System";
import { UnsupportedEncodingException } from './UnsupportedEncodingException';
export class BufferTools {
    public static unpackSynchsafeInteger(b1: number, b2: number, b3: number, b4: number): number {
        let value = b4 & 0x7f;
        value += this.shiftByte(b3 & 0x7f, -7);
        value += this.shiftByte(b2 & 0x7f, -14);
        value += this.shiftByte(b1 & 0x7f, -21);
        return value;
    }
    public static unpackInteger(b1: number, b2: number, b3: number, b4: number): number {
        let value = b4 & 0xff;
        value += this.shiftByte(b3, -8);
        value += this.shiftByte(b2, -16);
        value += this.shiftByte(b1, -24);
        return value;
    }
    public static packInteger(i: number): number[] {
        let bytes: number[] = new Array(4);
        bytes[3] = i & 0xff;
        bytes[2] = (i >> 8) & 0xff;
        bytes[1] = (i >> 16) & 0xff;
        bytes[0] = (i >> 24) & 0xff;
        return bytes;
    }
    public static shiftByte(c: number, places: number): number {
        let i = c & 0xff;
        if (places < 0) {
            return i << -places;
        }
        else if (places > 0) {
            return i >> places;
        }
        return i;
    }
    public static checkBit(b: number, bitPosition: number): boolean {
        return ((b & (0x01 << bitPosition)) != 0);
    }
    public static copyBuffer(bytes: Int8Array, offset: number, length: number): number[] {
        let copy: number[] = new Array(length);
        if (length > 0) {
            for (let i = 0; i < copy.length; i++) {
                copy[i] = bytes[i + offset];
            }
        }
        return copy;
    }
    public static copyIntoByteBuffer(bytes: number[], offset: number, length: number, destBuffer: number[], destOffset: number): void {
        if (length > 0) {
            System.arraycopy(bytes, offset, destBuffer, destOffset, length);
        }
    }
    public static byteBufferToStringIgnoringEncodingIssues(bytes: Int8Array, offset: number, length: number): string {
        try {
            if (length < 1)
                return "";
            let str = "";
            for (let i = 0; i < length; i++) {
                str += String.fromCharCode(bytes[offset + i]);
            }
            return str;
        }
        catch (error) {
            return null;
        }
    }
    public static trimStringRight(s: string): string {
        let endPosition = s.length - 1;
        let endChar;
        while (endPosition >= 0) {
            endChar = s.charCodeAt(endPosition);
            if (endChar > 32) {
                break;
            }
            endPosition--;
        }
        if (endPosition == s.length - 1)
            return s;
        else if (endPosition < 0)
            return "";
        return s.substring(0, endPosition + 1);
    }
    public static byteBufferToString(bytes: number[], offset: number, length: number): string {
        try {
            if (length < 1)
                return "";
            let str = "";
            for (let i = 0; i < length; i++) {
                str += String.fromCharCode(bytes[offset + i]);
            }
            return str;
        }
        catch (error) {
            throw new UnsupportedEncodingException();
        }
    }
    public static indexOfTerminatorForEncoding(bytes: number[], fromIndex: number, encoding: number): number {
        let terminatorLength = (encoding == EncodedText.TEXT_ENCODING_UTF_16 || encoding == EncodedText.TEXT_ENCODING_UTF_16BE) ? 2 : 1;
        return this.indexOfTerminator(bytes, fromIndex, terminatorLength);
    }
    public static indexOfTerminator(bytes: number[], fromIndex: number, terminatorLength: number): number {
        let marker = -1;
        for (let i = fromIndex; i <= bytes.length - terminatorLength; i++) {
            if ((i - fromIndex) % terminatorLength == 0) {
                let matched;
                for (matched = 0; matched < terminatorLength; matched++) {
                    if (bytes[i + matched] != 0)
                        break;
                }
                if (matched == terminatorLength) {
                    marker = i;
                    break;
                }
            }
        }
        return marker;
    }
    public static stringIntoByteBuffer(s: string, offset: number, length: number, bytes: number[], destOffset: number): void {
        try {
            let stringToCopy: string = s.substring(offset, offset + length);
            let srcBytes: string = this.stringToBytes(stringToCopy);
            if (srcBytes.length > 0) {
                System.arraycopy(srcBytes, 0, bytes, destOffset, srcBytes.length);
            }
        }
        catch (error) {
            throw new UnsupportedEncodingException();
        }
    }
    public static fill(a: number[], va: number): void {
        let len = a.length;
        for (let i = 0; i < len; i++) {
            a[i] = va;
        }
    }
    public static stringToBytes(str: string): number[] {
        let bytes: number[] = new Array();
        let len, c;
        len = str.length;
        for (let i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if (c >= 0x010000 && c <= 0x10FFFF) {
                bytes.push(((c >> 18) & 0x07) | 0xF0);
                bytes.push(((c >> 12) & 0x3F) | 0x80);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            }
            else if (c >= 0x000800 && c <= 0x00FFFF) {
                bytes.push(((c >> 12) & 0x0F) | 0xE0);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            }
            else if (c >= 0x000080 && c <= 0x0007FF) {
                bytes.push(((c >> 6) & 0x1F) | 0xC0);
                bytes.push((c & 0x3F) | 0x80);
            }
            else {
                bytes.push(c & 0xFF);
            }
        }
        return bytes;
    }
    public static mergeArrayBuffer(...arrays): ArrayBuffer {
        let totalLen = 0;
        for (let i = 0; i < arrays.length; i++) {
            arrays[i] = new Int8Array(arrays[i]);
            totalLen += arrays[i].length;
        }
        let res = new Int8Array(totalLen);
        let offset = 0;
        for (let arr of arrays) {
            res.set(arr, offset);
            offset += arr.length;
        }
        return res.buffer;
    }
    public static setBit(b: number, bitPosition: number, value: boolean): number {
        let newByte;
        if (value) {
            newByte = Int8Array.from([(b | (0x01 << bitPosition))])[0];
        }
        else {
            newByte = Int8Array.from([(b & (~(0x01 << bitPosition)))])[0];
        }
        return newByte;
    }
    public static packSynchsafeInteger(i: number): number[] {
        let bytes: number[] = new Array(4);
        BufferTools.packSynchsafeIntegerOther(i, bytes, 0);
        return bytes;
    }
    public static packSynchsafeIntegerOther(i: number, bytes: number[], offset: number): void {
        bytes[offset + 3] = (i & 0x7f);
        bytes[offset + 2] = ((i >> 7) & 0x7f);
        bytes[offset + 1] = ((i >> 14) & 0x7f);
        bytes[offset + 0] = ((i >> 21) & 0x7f);
    }
    public static padStringRight(s: string, length: number, padWith: string): string {
        if (s.length >= length)
            return s;
        while (s.length < length) {
            s + padWith;
        }
        return s;
    }
    public static sizeUnsynchronisationWouldAdd(bytes: number[]): number {
        let count = 0;
        for (let i = 0; i < bytes.length - 1; i++) {
            if (bytes[i] == 0xff && ((bytes[i + 1] & 0xe0) == 0xe0 || bytes[i + 1] == 0)) {
                count++;
            }
        }
        if (bytes.length > 0 && bytes[bytes.length - 1] == 0xff)
            count++;
        return count;
    }
    public static unsynchroniseBuffer(bytes: number[]): number {
        let count = this.sizeUnsynchronisationWouldAdd(bytes);
        if (count == 0)
            return bytes;
        let newBuffer = new Array(bytes.length + count);
        let j = 0;
        for (let i = 0; i < bytes.length - 1; i++) {
            newBuffer[j++] = bytes[i];
            if (bytes[i] == 0xff && ((bytes[i + 1] & 0xe0) == 0xe0 || bytes[i + 1] == 0)) {
                newBuffer[j++] = 0;
            }
        }
        newBuffer[j++] = bytes[bytes.length - 1];
        if (bytes[bytes.length - 1] == 0xff) {
            newBuffer[j++] = 0;
        }
        return newBuffer;
    }
    public static copyOf(original: number[], newLength: number): number[] {
        let copy = new Array(newLength);
        System.arraycopy(original, 0, copy, 0, Math.min(original.length, newLength));
        return copy;
    }
    public static isNumber(val: string): boolean {
        // 非负浮点数
        let regPos = /^\d+(\.\d+)?$/;
        // 负浮点数
        let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
        if (regPos.test(val) || regNeg.test(val)) {
            return true;
        }
        else {
            return false;
        }
    }
    public static sizeSynchronisationWouldSubtract(bytes: number[]): number {
        let count = 0;
        for (let i = 0; i < bytes.length - 2; i++) {
            // (byte) 0xff-----> -1 ,  (byte) 0xe0 ----->-32
            if (bytes[i] == -1 && bytes[i + 1] == 0 && ((bytes[i + 2] & -32) == -32 || bytes[i + 2] == 0)) {
                count++;
            }
        }
        if (bytes.length > 1 && bytes[bytes.length - 2] == -1 && bytes[bytes.length - 1] == 0)
            count++;
        return count;
    }
    public static synchroniseBuffer(bytes: number[]): number[] {
        // synchronisation is replacing instances of:
        // 11111111 00000000 111xxxxx with 11111111 111xxxxx and
        // 11111111 00000000 00000000 with 11111111 00000000
        let count = BufferTools.sizeSynchronisationWouldSubtract(bytes);
        if (count == 0)
            return bytes;
        let newBuffer = new Array(bytes.length - count);
        let i = 0;
        for (let j = 0; j < newBuffer.length - 1; j++) {
            newBuffer[j] = bytes[i];
            // (byte) 0xff-----> -1 ,  (byte) 0xe0 ----->-32
            if (bytes[i] == -1 && bytes[i + 1] == 0 && ((bytes[i + 2] & -32) == -32 || bytes[i + 2] == 0)) {
                i++;
            }
            i++;
        }
        newBuffer[newBuffer.length - 1] = bytes[i];
        return newBuffer;
    }
    public static replaceNumbersWithBytes(bytes: number[], offset: number): void {
        for (let i = offset; i < bytes.length; i++) {
            // '0' ----48 ,'9' ----- 57
            if (bytes[i] >= 48 && bytes[i] <= 57) {
                bytes[i] -= 48;
            }
        }
    }
    public static stringToByteBuffer(s: string, offset: number, length: number): number[] {
        try {
            let stringToCopy = s.substring(offset, offset + length);
            return BufferTools.stringToBytes(stringToCopy);
        }
        catch (error) {
            throw new UnsupportedEncodingException();
        }
    }
}
