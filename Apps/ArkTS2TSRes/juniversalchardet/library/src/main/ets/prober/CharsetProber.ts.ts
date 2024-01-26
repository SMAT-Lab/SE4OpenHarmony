/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is mozilla.org code.
 *
 * The Initial Developer of the Original Code is
 * Netscape Communications Corporation.
 * Portions created by the Initial Developer are Copyright (C) 1998
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Copyright (c) 2022 Huawei Device Co., Ltd.
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */
////////////////////////////////////////////////////////////////
// inner types
////////////////////////////////////////////////////////////////
export enum ProbingState {
    DETECTING,
    FOUND_IT,
    NOT_ME
}
;
abstract class CharsetProber {
    ////////////////////////////////////////////////////////////////
    // constants
    ////////////////////////////////////////////////////////////////
    public static SHORTCUT_THRESHOLD: number = 0.95; //float
    // 十六进制
    public static ASCII_A: number = 0x61; // 'a' int
    public static ASCII_Z: number = 0x7A; // 'z' int
    public static ASCII_A_CAPITAL: number = 0x41; // 'A' int
    public static ASCII_Z_CAPITAL: number = 0x5A; // 'Z' int
    public static ASCII_LT: number = 0x3C; // '<' int
    public static ASCII_GT: number = 0x3E; // '>' int
    public static ASCII_SP: number = 0x20; // ' ' int
    private active: boolean = true;
    ////////////////////////////////////////////////////////////////
    // methods
    ////////////////////////////////////////////////////////////////
    public constructor() {
    }
    public abstract getCharSetName(): string;
    public abstract handleData(buf: ArrayBuffer, offset: number, length: number): ProbingState;
    public abstract getState(): ProbingState;
    public abstract reset(): void;
    public abstract getConfidence(): number; // float
    public abstract setOption(): void;
    // ByteBuffer.position() indicates number of bytes written.
    public filterWithoutEnglishLetters(buf: ArrayBuffer, // byte[]
    offset: number, // int
    length: number): Map<number, ArrayBuffer> {
        let map = new Map();
        let pos: number = 0;
        let meetMSB: boolean = false;
        let c: number;
        let prevPtr = offset;
        let curPtr = offset;
        let maxPtr = offset + length;
        let intArray = new Int8Array(buf);
        let array = new Int8Array(buf.byteLength);
        array.fill(0);
        for (; curPtr < maxPtr; ++curPtr) {
            c = intArray[curPtr];
            if (!this.isAscii(c)) {
                meetMSB = true;
            }
            else if (this.isAsciiSymbol(c)) {
                // current char is a symbol, most likely a punctuation.
                // we treat it as segment delimiter
                if (meetMSB && curPtr > prevPtr) {
                    // this segment contains more than single symbol,
                    // and it has upper ASCII, we need to keep it
                    let slice: ArrayBuffer = buf.slice(prevPtr, curPtr);
                    let sliceIntArray = new Int8Array(slice);
                    array.set(sliceIntArray, pos);
                    let asciiSp = new Int8Array(1);
                    asciiSp[0] = CharsetProber.ASCII_SP;
                    array.set(asciiSp, sliceIntArray.byteLength);
                    pos = pos + curPtr - prevPtr + 1;
                    map.set(pos, array);
                    prevPtr = curPtr + 1;
                    meetMSB = false;
                }
                else {
                    // ignore current segment.
                    // (either because it is just a symbol or just an English word)
                    prevPtr = curPtr + 1;
                }
            }
        }
        if (meetMSB && curPtr > prevPtr) {
            let slice: ArrayBuffer = buf.slice(prevPtr, curPtr);
            let sliceIntArray = new Int8Array(slice);
            array.set(sliceIntArray, pos);
            pos = pos + curPtr - prevPtr;
            map.set(pos, array);
        }
        return map;
    }
    public filterWithEnglishLetters(buf: ArrayBuffer, // byte
    offset: number, // int,
    length: number): Map<number, ArrayBuffer> {
        let map = new Map();
        let pos: number = 0;
        let isInTag: boolean = false;
        let c: number;
        let prevPtr = offset;
        let curPtr = offset;
        let maxPtr = offset + length;
        let intArray = new Int8Array(buf);
        let array = new Int8Array(buf.byteLength);
        array.fill(0);
        for (; curPtr < maxPtr; ++curPtr) {
            c = intArray[curPtr];
            if (c == CharsetProber.ASCII_GT) {
                isInTag = false;
            }
            else if (c == CharsetProber.ASCII_LT) {
                isInTag = true;
            }
            if (this.isAscii(c) && this.isAsciiSymbol(c)) {
                if (curPtr > prevPtr && !isInTag) {
                    // Current segment contains more than just a symbol
                    // and it is not inside a tag, keep it.
                    let slice: ArrayBuffer = buf.slice(prevPtr, curPtr);
                    let sliceIntArray = new Int8Array(slice);
                    array.set(sliceIntArray, pos);
                    let asciiSp = new Int8Array(1);
                    asciiSp[0] = CharsetProber.ASCII_SP;
                    array.set(asciiSp, sliceIntArray.byteLength);
                    pos = pos + curPtr - prevPtr + 1;
                    map.set(pos, array);
                    prevPtr = curPtr + 1;
                }
                else {
                    prevPtr = curPtr + 1;
                }
            }
        }
        // If the current segment contains more than just a symbol
        // and it is not inside a tag then keep it.
        if (!isInTag && curPtr > prevPtr) {
            let slice: ArrayBuffer = buf.slice(prevPtr, curPtr);
            let sliceIntArray = new Int8Array(slice);
            array.set(sliceIntArray, pos);
            pos = pos + curPtr - prevPtr;
            map.set(pos, array);
        }
        return map;
    }
    private isAscii(b: number): boolean {
        return ((b & 0x80) == 0);
    }
    // b must be in ASCII code range (MSB can't be 1).
    private isAsciiSymbol(b: number): boolean {
        let c: number = b & 0xFF; // int
        return ((c < CharsetProber.ASCII_A_CAPITAL) ||
            (c > CharsetProber.ASCII_Z_CAPITAL && c < CharsetProber.ASCII_A) ||
            (c > CharsetProber.ASCII_Z));
    }
    public isActive(): boolean {
        return this.active;
    }
    public setActive(active: boolean): void {
        this.active = active;
    }
}
export default CharsetProber;
