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
import { System } from "./System";
import { BufferTools } from "./BufferTools";
import { CharacterCodingException } from './CharacterCodingException';
import { IllegalArgumentException } from './IllegalArgumentException';
import buffer from '@ohos.buffer';
export class EncodedText {
    public static TEXT_ENCODING_ISO_8859_1: number = 0;
    public static TEXT_ENCODING_UTF_16: number = 1;
    public static TEXT_ENCODING_UTF_16BE: number = 2;
    public static TEXT_ENCODING_UTF_8: number = 3;
    public static CHARSET_ISO_8859_1: string = "ISO-8859-1";
    public static CHARSET_UTF_16: string = "UTF-16LE";
    public static CHARSET_UTF_16BE: string = "UTF-16BE";
    public static CHARSET_UTF_8: string = "UTF-8";
    private static characterSets: string[] = [
        EncodedText.CHARSET_ISO_8859_1,
        EncodedText.CHARSET_UTF_16,
        EncodedText.CHARSET_UTF_16BE,
        EncodedText.CHARSET_UTF_8
    ];
    private textEncodingFallback: number[] = [0, 2, 1, 3];
    //  -2 -------> (byte) 0xfe   -1 -------> (byte) 0xff
    private static boms: number[][] = [
        [],
        [-1, -2],
        [-2, -1],
        []
    ];
    private static terminators: number[][] = [
        [0],
        [0, 0],
        [0, 0],
        [0]
    ];
    private value: number[];
    private textEncoding: number;
    constructor(textValues: {
        textEncoding?: number;
        value?: number[];
        str?: string;
    }) {
        // if encoding type 1 and big endian BOM is present, switch to big endian
        if (textValues != null) {
            if (textValues.str != null) {
                if (textValues.textEncoding) {
                    this.textEncoding = textValues.textEncoding;
                    this.value = EncodedText.stringToBytes(textValues.str, EncodedText.characterSetForTextEncoding(this.textEncoding));
                }
                else {
                    for (let textEncoding of this.textEncodingFallback) {
                        this.textEncoding = textEncoding;
                        this.value = EncodedText.stringToBytes(textValues.str, EncodedText.characterSetForTextEncoding(textEncoding));
                        if (this.value != null && this.toString() != null) {
                            this.stripBomAndTerminator();
                            return;
                        }
                    }
                }
            }
            else {
                if ((textValues.textEncoding == EncodedText.TEXT_ENCODING_UTF_16) &&
                    (EncodedText.textEncodingForBytesFromBOM(textValues.value) == EncodedText.TEXT_ENCODING_UTF_16BE)) {
                    this.textEncoding = EncodedText.TEXT_ENCODING_UTF_16BE;
                }
                else {
                    this.textEncoding = textValues.textEncoding;
                }
                this.value = textValues.value;
                this.stripBomAndTerminator();
            }
        }
    }
    private static textEncodingForBytesFromBOM(value: number[]): number {
        //  -2 -------> (byte) 0xfe   -1 -------> (byte) 0xff
        if (value.length >= 2 && value[0] == -1 && value[1] == -2) {
            return EncodedText.TEXT_ENCODING_UTF_16;
        }
        else if (value.length >= 2 && value[0] == -2 && value[1] == -1) {
            return EncodedText.TEXT_ENCODING_UTF_16BE;
            // -17 ----> (byte) 0xef   -69 ----> (byte) 0xbb  -65 ----> (byte) 0xbf
        }
        else if (value.length >= 3 && (value[0] == -17 && value[1] == -69 && value[2] == -65)) {
            return EncodedText.TEXT_ENCODING_UTF_8;
        }
        else {
            return EncodedText.TEXT_ENCODING_ISO_8859_1;
        }
    }
    private stripBomAndTerminator(): void {
        let leadingCharsToRemove: number = 0;
        //  -2 -------> (byte) 0xfe   -1 -------> (byte) 0xff
        if (this.value.length >= 2 && ((this.value[0] == -2 && this.value[1] == -1) || (this.value[0] == -1 && this.value[1] == -2))) {
            leadingCharsToRemove = 2;
            // -17 ----> (byte) 0xef   -69 ----> (byte) 0xbb  -65 ----> (byte) 0xbf
        }
        else if (this.value.length >= 3 && (this.value[0] == -17 && this.value[1] == -69 && this.value[2] == -65)) {
            leadingCharsToRemove = 3;
        }
        let trailingCharsToRemove: number = 0;
        let terminator: number[] = EncodedText.terminators[this.textEncoding];
        if (this.value.length - leadingCharsToRemove >= terminator.length) {
            let haveTerminator: boolean = true;
            for (let i = 0; i < terminator.length; i++) {
                if (this.value[this.value.length - terminator.length + i] != terminator[i]) {
                    haveTerminator = false;
                    break;
                }
            }
            if (haveTerminator)
                trailingCharsToRemove = terminator.length;
        }
        if (leadingCharsToRemove + trailingCharsToRemove > 0) {
            let newLength: number = this.value.length - leadingCharsToRemove - trailingCharsToRemove;
            let newValue: number[] = new Array(newLength);
            if (newLength > 0) {
                System.arraycopy(this.value, leadingCharsToRemove, newValue, 0, newValue.length);
            }
            this.value = newValue;
        }
    }
    public getTextEncoding(): number {
        return this.textEncoding;
    }
    public setTextEncoding(textEncoding: number, transcode: boolean): void {
        try {
            if (this.textEncoding != textEncoding) {
                let str = this.toString();
                let transcodedBytes = EncodedText.stringToBytes(str, EncodedText.characterSetForTextEncoding(textEncoding));
                this.textEncoding = textEncoding;
                this.value = transcodedBytes;
            }
        }
        catch (error) {
            throw new CharacterCodingException();
        }
    }
    public toString(): string {
        try {
            if (this.value.length < 1)
                return "";
            let str = "";
            if (EncodedText.characterSetForTextEncoding(this.textEncoding) == EncodedText.CHARSET_UTF_16 || EncodedText.characterSetForTextEncoding(this.textEncoding) == EncodedText.CHARSET_UTF_16BE) {
                let res = new Int8Array(this.value.length);
                for (let i = 0; i < this.value.length; i++) {
                    res[i] = this.value[i];
                }
                if (res.buffer.byteLength % 16 == 0) {
                    str = String.fromCodePoint.apply(null, new Uint16Array(res.buffer));
                }
                else {
                    str = String.fromCodePoint.apply(null, new Uint16Array(res));
                }
            }
            else if (EncodedText.characterSetForTextEncoding(this.textEncoding) == EncodedText.CHARSET_UTF_8) {
                let res = new Int8Array(this.value.length);
                for (let i = 0; i < this.value.length; i++) {
                    res[i] = this.value[i];
                }
                let encode = String.fromCodePoint.apply(null, new Uint8Array(res.buffer));
                // 没有这一步中文会乱码
                str = decodeURIComponent(escape(encode));
            }
            else {
                for (let i = 0; i < this.value.length; i++) {
                    if (this.value[i] == 0) {
                        continue;
                    }
                    str += String.fromCharCode(this.value[i]);
                }
            }
            return str;
        }
        catch (error) {
            console.error('mp3agiclog EncodedText toString error: ' + error);
            return null;
        }
    }
    public getTerminator(): number[] {
        return EncodedText.terminators[this.textEncoding];
    }
    public toBytes(includeBom: boolean, includeTerminator: boolean): number[] {
        EncodedText.characterSetForTextEncoding(this.textEncoding); // ensured textEncoding is valid
        let newLength = this.value.length + (includeBom ? EncodedText.boms[this.textEncoding].length : 0) + (includeTerminator ?
            this.getTerminator().length : 0);
        if (newLength == this.value.length) {
            return this.value;
        }
        else {
            let bytes: number[] = new Array(newLength);
            let i: number = 0;
            if (includeBom) {
                let bom: number = EncodedText.boms[this.textEncoding];
                if (bom.length > 0) {
                    System.arraycopy(EncodedText.boms[this.textEncoding], 0, bytes, i, EncodedText.boms[this.textEncoding].length);
                    i += EncodedText.boms[this.textEncoding].length;
                }
            }
            if (this.value.length > 0) {
                System.arraycopy(this.value, 0, bytes, i, this.value.length);
                i += this.value.length;
            }
            if (includeTerminator) {
                let terminator: number[] = this.getTerminator();
                if (terminator.length > 0) {
                    System.arraycopy(terminator, 0, bytes, i, terminator.length);
                }
            }
            return bytes;
        }
    }
    private static characterSetForTextEncoding(textEncoding: number): string {
        try {
            return EncodedText.characterSets[textEncoding];
        }
        catch (e) {
            throw new IllegalArgumentException("Invalid text encoding " + textEncoding);
        }
    }
    private static stringToBytes(s: string, characterSet: string): number[] {
        try {
            let bytes = this.charBufferToBytes(s, characterSet);
            if (characterSet == EncodedText.CHARSET_UTF_8) {
                for (let i = 0; i < bytes.length; i++) {
                    bytes[i] = Int8Array.from([bytes[i]])[0];
                }
            }
            if (characterSet == EncodedText.CHARSET_UTF_16 || characterSet == EncodedText.CHARSET_UTF_16BE) {
                let codePoints = s.split('').map(char => char.charCodeAt(0));
                let swapped = codePoints.map(val => (val >> 8) | (val << 8));
                let data_16 = new Uint16Array(swapped);
                // data_8 默认为 UTF-16BE格式数据
                let data_8 = new Int8Array(data_16.buffer);
                let data = new Int8Array(data_8.byteLength);
                // data_8 每两位互换位置得新的data为 UTF-16LE格式数据。UTF-16LE格式数据最终转换为string
                for (let i = 0; i < data_8.byteLength; i++) {
                    data[i] = data_8[i + 1];
                    data[i + 1] = data_8[i];
                    i++;
                }
                bytes = data;
            }
            return bytes;
        }
        catch (error) {
            return null;
        }
    }
    private static charBufferToBytes(charBuffer: string, characterSet: string): number[] {
        try {
            let byteBuffer = BufferTools.stringToBytes(charBuffer);
            return BufferTools.copyBuffer(byteBuffer, 0, byteBuffer.length);
        }
        catch (error) {
            throw new CharacterCodingException();
        }
    }
    public getCharacterSet(): string {
        return EncodedText.characterSetForTextEncoding(this.textEncoding);
    }
}
