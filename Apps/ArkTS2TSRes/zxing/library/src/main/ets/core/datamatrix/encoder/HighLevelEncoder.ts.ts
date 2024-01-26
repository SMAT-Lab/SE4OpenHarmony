/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
// package com.google.zxing.datamatrix.encoder;
//
// import com.google.zxing.Dimension;
//
// import java.util.Arrays;
/**
 * DataMatrix ECC 200 data encoder following the algorithm described in ISO/IEC 16022:200(E) in
 * annex S.
 */
/*public final*/
import Dimension from '../../Dimension';
import Encoder from './Encoder';
import ASCIIEncoder from './ASCIIEncoder';
import EncoderContext from './EncoderContext';
import { int, char, float, byte } from '../../../customTypings';
import StringBuilder from '../../util/StringBuilder';
import Integer from '../../util/Integer';
import Arrays from '../../util/Arrays';
import StringUtils from '../../common/StringUtils';
import IllegalArgumentException from '../../IllegalArgumentException';
import SymbolShapeHint from './SymbolShapeHint';
import X12Encoder from './X12Encoder';
import Base256Encoder from './Base256Encoder';
import EdifactEncoder from './EdifactEncoder';
import TextEncoder from './TextEncoder';
import C40Encoder from './C40Encoder';
export default class HighLevelEncoder {
    /**
     * Padding character
     */
    private static PAD: char = 129;
    /**
     * mode latch to C40 encodation mode
     */
    static LATCH_TO_C40: char = 230;
    /**
     * mode latch to Base 256 encodation mode
     */
    static LATCH_TO_BASE256: char = 231;
    /**
     * FNC1 Codeword
     */
    // private static  char FNC1 = 232;
    /**
     * Structured Append Codeword
     */
    // private static  char STRUCTURED_APPEND = 233;
    /**
     * Reader Programming
     */
    // private static  char READER_PROGRAMMING = 234;
    /**
     * Upper Shift
     */
    static UPPER_SHIFT: char = 235;
    /**
     * 05 Macro
     */
    private static MACRO_05: char = 236;
    /**
     * 06 Macro
     */
    private static MACRO_06: char = 237;
    /**
     * mode latch to ANSI X.12 encodation mode
     */
    static LATCH_TO_ANSIX12: char = 238;
    /**
     * mode latch to Text encodation mode
     */
    static LATCH_TO_TEXT: char = 239;
    /**
     * mode latch to EDIFACT encodation mode
     */
    static LATCH_TO_EDIFACT: char = 240;
    /**
     * ECI character (Extended Channel Interpretation)
     */
    // private static  char ECI = 241;
    /**
     * Unlatch from C40 encodation
     */
    static C40_UNLATCH: char = 254;
    /**
     * Unlatch from X12 encodation
     */
    static X12_UNLATCH: char = 254;
    /**
     * 05 Macro header
     */
    private static MACRO_05_HEADER: string = '[)>\u001E05\u001D';
    /**
     * 06 Macro header
     */
    private static MACRO_06_HEADER: string = '[)>\u001E06\u001D';
    /**
     * Macro trailer
     */
    private static MACRO_TRAILER: string = '\u001E\u0004';
    static ASCII_ENCODATION: int = 0;
    static C40_ENCODATION: int = 1;
    static TEXT_ENCODATION: int = 2;
    static X12_ENCODATION: int = 3;
    static EDIFACT_ENCODATION: int = 4;
    static BASE256_ENCODATION: int = 5;
    private HighLevelEncoder() {
    }
    private static randomize253State(codewordPosition: int): char {
        let pseudoRandom: int = ((149 * codewordPosition) % 253) + 1;
        let tempVariable: int = HighLevelEncoder.PAD + pseudoRandom;
        return /*(char)*/ (tempVariable <= 254 ? tempVariable : tempVariable - 254);
    }
    /**
     * Performs message encoding of a DataMatrix message using the algorithm described in annex P
     * of ISO/IEC 16022:2000(E).
     *
     * @param msg the message
     * @return the encoded message (the char values range from 0 to 255)
     */
    public static encodeHighLevelWithMsg(msg: string): string {
        return this.encodeHighLevel(msg, SymbolShapeHint.FORCE_NONE, null, null);
    }
    /**
     * Performs message encoding of a DataMatrix message using the algorithm described in annex P
     * of ISO/IEC 16022:2000(E).
     *
     * @param msg     the message
     * @param shape   requested shape. May be {@code SymbolShapeHint.FORCE_NONE},
     *                {@code SymbolShapeHint.FORCE_SQUARE} or {@code SymbolShapeHint.FORCE_RECTANGLE}.
     * @param minSize the minimum symbol size constraint or null for no constraint
     * @param maxSize the maximum symbol size constraint or null for no constraint
     * @return the encoded message (the char values range from 0 to 255)
     */
    public static encodeHighLevel(msg: string, shape: SymbolShapeHint, minSize: Dimension, maxSize: Dimension): string {
        // the codewords 0..255 are encoded as Unicode characters
        let encoders: Array<Encoder> = Array.from([new ASCIIEncoder(), new C40Encoder(), new TextEncoder(),
            new X12Encoder(), new EdifactEncoder(), new Base256Encoder()]);
        let context: EncoderContext = new EncoderContext(msg);
        context.setSymbolShape(shape);
        context.setSizeConstraints(minSize, maxSize);
        if (msg.startsWith(HighLevelEncoder.MACRO_05_HEADER) && msg.endsWith(HighLevelEncoder.MACRO_TRAILER)) {
            context.writeCodeword(HighLevelEncoder.MACRO_05);
            context.setSkipAtEnd(2);
            context.pos += HighLevelEncoder.MACRO_05_HEADER.length;
        }
        else if (msg.startsWith(HighLevelEncoder.MACRO_06_HEADER) && msg.endsWith(HighLevelEncoder.MACRO_TRAILER)) {
            context.writeCodeword(HighLevelEncoder.MACRO_06);
            context.setSkipAtEnd(2);
            context.pos += HighLevelEncoder.MACRO_06_HEADER.length;
        }
        let encodingMode: int = HighLevelEncoder.ASCII_ENCODATION; // Default mode
        while (context.hasMoreCharacters()) {
            encoders[encodingMode].encode(context);
            if (context.getNewEncoding() >= 0) {
                encodingMode = context.getNewEncoding();
                context.resetEncoderSignal();
            }
        }
        let len: int = context.getCodewordCount();
        context.updateSymbolInfoNoArgs();
        let capacity: int = context.getSymbolInfo().getDataCapacity();
        if (len < capacity &&
            encodingMode !== HighLevelEncoder.ASCII_ENCODATION &&
            encodingMode !== HighLevelEncoder.BASE256_ENCODATION &&
            encodingMode !== HighLevelEncoder.EDIFACT_ENCODATION) {
            context.writeCodeword(StringUtils.getCharCode('\u00fe')); // Unlatch (254)
        }
        // Padding
        let codewords: StringBuilder = context.getCodewords();
        if (codewords.length() < capacity) {
            codewords.append(HighLevelEncoder.PAD);
        }
        while (codewords.length() < capacity) {
            codewords.append(this.randomize253State(codewords.length() + 1));
        }
        return context.getCodewords().toString();
    }
    static lookAheadTest(msg: string, startpos: int, currentMode: int): int {
        if (startpos >= msg.length) {
            return currentMode;
        }
        let charCounts: Float32Array;
        // step J
        if (currentMode === HighLevelEncoder.ASCII_ENCODATION) {
            charCounts = new Float32Array([0, 1, 1, 1, 1, 1.25]);
        }
        else {
            charCounts = new Float32Array([1, 2, 2, 2, 2, 2.25]);
            charCounts[currentMode] = 0;
        }
        let charsProcessed: int = 0;
        while (true) {
            // step K
            if ((startpos + charsProcessed) === msg.length) {
                let min: int = Integer.MAX_VALUE;
                let mins: Uint8Array = new Uint8Array(6);
                let intCharCounts: Int32Array = new Int32Array(6);
                min = this.findMinimums(charCounts, intCharCounts, min, mins);
                let minCount: int = this.getMinimumCount(mins);
                if (intCharCounts[HighLevelEncoder.ASCII_ENCODATION] === min) {
                    return HighLevelEncoder.ASCII_ENCODATION;
                }
                if (minCount === 1 && mins[HighLevelEncoder.BASE256_ENCODATION] > 0) {
                    return HighLevelEncoder.BASE256_ENCODATION;
                }
                if (minCount === 1 && mins[HighLevelEncoder.EDIFACT_ENCODATION] > 0) {
                    return HighLevelEncoder.EDIFACT_ENCODATION;
                }
                if (minCount === 1 && mins[HighLevelEncoder.TEXT_ENCODATION] > 0) {
                    return HighLevelEncoder.TEXT_ENCODATION;
                }
                if (minCount === 1 && mins[HighLevelEncoder.X12_ENCODATION] > 0) {
                    return HighLevelEncoder.X12_ENCODATION;
                }
                return HighLevelEncoder.C40_ENCODATION;
            }
            let c: char = StringUtils.getCharCode(msg.charAt(startpos + charsProcessed));
            charsProcessed++;
            // step L
            if (this.isDigit(c)) {
                charCounts[HighLevelEncoder.ASCII_ENCODATION] += 0.5;
            }
            else if (this.isExtendedASCII(c)) {
                charCounts[HighLevelEncoder.ASCII_ENCODATION] = /*(float)*/ Math.ceil(charCounts[HighLevelEncoder.ASCII_ENCODATION]);
                charCounts[HighLevelEncoder.ASCII_ENCODATION] += 2.0;
            }
            else {
                charCounts[HighLevelEncoder.ASCII_ENCODATION] = /*(float)*/ Math.ceil(charCounts[HighLevelEncoder.ASCII_ENCODATION]);
                charCounts[HighLevelEncoder.ASCII_ENCODATION]++;
            }
            // step M
            if (this.isNativeC40(c)) {
                charCounts[HighLevelEncoder.C40_ENCODATION] += 2.0 / 3.0;
            }
            else if (this.isExtendedASCII(c)) {
                charCounts[HighLevelEncoder.C40_ENCODATION] += 8.0 / 3.0;
            }
            else {
                charCounts[HighLevelEncoder.C40_ENCODATION] += 4.0 / 3.0;
            }
            // step N
            if (this.isNativeText(c)) {
                charCounts[HighLevelEncoder.TEXT_ENCODATION] += 2.0 / 3.0;
            }
            else if (this.isExtendedASCII(c)) {
                charCounts[HighLevelEncoder.TEXT_ENCODATION] += 8.0 / 3.0;
            }
            else {
                charCounts[HighLevelEncoder.TEXT_ENCODATION] += 4.0 / 3.0;
            }
            // step O
            if (this.isNativeX12(c)) {
                charCounts[HighLevelEncoder.X12_ENCODATION] += 2.0 / 3.0;
            }
            else if (this.isExtendedASCII(c)) {
                charCounts[HighLevelEncoder.X12_ENCODATION] += 13.0 / 3.0;
            }
            else {
                charCounts[HighLevelEncoder.X12_ENCODATION] += 10.0 / 3.0;
            }
            // step P
            if (this.isNativeEDIFACT(c)) {
                charCounts[HighLevelEncoder.EDIFACT_ENCODATION] += 3.0 / 4.0;
            }
            else if (this.isExtendedASCII(c)) {
                charCounts[HighLevelEncoder.EDIFACT_ENCODATION] += 17.0 / 4.0;
            }
            else {
                charCounts[HighLevelEncoder.EDIFACT_ENCODATION] += 13.0 / 4.0;
            }
            // step Q
            if (this.isSpecialB256(c)) {
                charCounts[HighLevelEncoder.BASE256_ENCODATION] += 4.0;
            }
            else {
                charCounts[HighLevelEncoder.BASE256_ENCODATION]++;
            }
            // step R
            if (charsProcessed >= 4) {
                let intCharCounts: Int32Array = new Int32Array(6);
                let mins: Uint8Array = new Uint8Array(6);
                this.findMinimums(charCounts, intCharCounts, Integer.MAX_VALUE, mins);
                let minCount: int = this.getMinimumCount(mins);
                if (intCharCounts[HighLevelEncoder.ASCII_ENCODATION] < intCharCounts[HighLevelEncoder.BASE256_ENCODATION]
                    && intCharCounts[HighLevelEncoder.ASCII_ENCODATION] < intCharCounts[HighLevelEncoder.C40_ENCODATION]
                    && intCharCounts[HighLevelEncoder.ASCII_ENCODATION] < intCharCounts[HighLevelEncoder.TEXT_ENCODATION]
                    && intCharCounts[HighLevelEncoder.ASCII_ENCODATION] < intCharCounts[HighLevelEncoder.X12_ENCODATION]
                    && intCharCounts[HighLevelEncoder.ASCII_ENCODATION] < intCharCounts[HighLevelEncoder.EDIFACT_ENCODATION]) {
                    return HighLevelEncoder.ASCII_ENCODATION;
                }
                if (intCharCounts[HighLevelEncoder.BASE256_ENCODATION] < intCharCounts[HighLevelEncoder.ASCII_ENCODATION]
                    || (mins[HighLevelEncoder.C40_ENCODATION] + mins[HighLevelEncoder.TEXT_ENCODATION] + mins[HighLevelEncoder.X12_ENCODATION] + mins[HighLevelEncoder.EDIFACT_ENCODATION]) === 0) {
                    return HighLevelEncoder.BASE256_ENCODATION;
                }
                if (minCount === 1 && mins[HighLevelEncoder.EDIFACT_ENCODATION] > 0) {
                    return HighLevelEncoder.EDIFACT_ENCODATION;
                }
                if (minCount === 1 && mins[HighLevelEncoder.TEXT_ENCODATION] > 0) {
                    return HighLevelEncoder.TEXT_ENCODATION;
                }
                if (minCount === 1 && mins[HighLevelEncoder.X12_ENCODATION] > 0) {
                    return HighLevelEncoder.X12_ENCODATION;
                }
                if (intCharCounts[HighLevelEncoder.C40_ENCODATION] + 1 < intCharCounts[HighLevelEncoder.ASCII_ENCODATION]
                    && intCharCounts[HighLevelEncoder.C40_ENCODATION] + 1 < intCharCounts[HighLevelEncoder.BASE256_ENCODATION]
                    && intCharCounts[HighLevelEncoder.C40_ENCODATION] + 1 < intCharCounts[HighLevelEncoder.EDIFACT_ENCODATION]
                    && intCharCounts[HighLevelEncoder.C40_ENCODATION] + 1 < intCharCounts[HighLevelEncoder.TEXT_ENCODATION]) {
                    if (intCharCounts[HighLevelEncoder.C40_ENCODATION] < intCharCounts[HighLevelEncoder.X12_ENCODATION]) {
                        return HighLevelEncoder.C40_ENCODATION;
                    }
                    if (intCharCounts[HighLevelEncoder.C40_ENCODATION] === intCharCounts[HighLevelEncoder.X12_ENCODATION]) {
                        let p: int = startpos + charsProcessed + 1;
                        while (p < msg.length) {
                            let tc: char = StringUtils.getCharCode(msg.charAt(p));
                            if (this.isX12TermSep(tc)) {
                                return HighLevelEncoder.X12_ENCODATION;
                            }
                            if (!this.isNativeX12(tc)) {
                                break;
                            }
                            p++;
                        }
                        return HighLevelEncoder.C40_ENCODATION;
                    }
                }
            }
        }
    }
    private static findMinimums(charCounts: Float32Array, intCharCounts: Int32Array, min: int, mins: Uint8Array): int {
        Arrays.fill(mins, /*(byte)*/ 0);
        for (let i: int = 0; i < 6; i++) {
            intCharCounts[i] = /*(int)*/ Math.ceil(charCounts[i]);
            let current: int = intCharCounts[i];
            if (min > current) {
                min = current;
                Arrays.fill(mins, /*(byte)*/ 0);
            }
            if (min === current) {
                mins[i]++;
            }
        }
        return min;
    }
    private static getMinimumCount(mins: Uint8Array): int {
        let minCount: int = 0;
        for (let i: int = 0; i < 6; i++) {
            minCount += mins[i];
        }
        return minCount;
    }
    static isDigit(ch: char): boolean {
        return ch >= StringUtils.getCharCode('0') && ch <= StringUtils.getCharCode('9');
    }
    static isExtendedASCII(ch: char): boolean {
        return ch >= 128 && ch <= 255;
    }
    private static isNativeC40(ch: char): boolean {
        return (ch === StringUtils.getCharCode(' ')) || (ch >= StringUtils.getCharCode('0') && ch <= StringUtils.getCharCode('9')) || (ch >= StringUtils.getCharCode('A') && ch <= StringUtils.getCharCode('Z'));
    }
    private static isNativeText(ch: char): boolean {
        return (ch === StringUtils.getCharCode(' ')) || (ch >= StringUtils.getCharCode('0')) && ch <= StringUtils.getCharCode('9') || (ch >= StringUtils.getCharCode('a') && ch <= StringUtils.getCharCode('z'));
    }
    private static isNativeX12(ch: char): boolean {
        return this.isX12TermSep(ch) || (ch === StringUtils.getCharCode(' ')) || (ch >= StringUtils.getCharCode('0') && ch <= StringUtils.getCharCode('9')) || (ch >= StringUtils.getCharCode('A') && ch <= StringUtils.getCharCode('Z'));
    }
    private static isX12TermSep(ch: char): boolean {
        return (ch === StringUtils.getCharCode('\r')) // CR
            || (ch === StringUtils.getCharCode('*'))
            || (ch === StringUtils.getCharCode('>'));
    }
    private static isNativeEDIFACT(ch: char): boolean {
        return ch >= StringUtils.getCharCode(' ') && ch <= StringUtils.getCharCode('^');
    }
    private static isSpecialB256(ch: char): boolean {
        return false; // TODO NOT IMPLEMENTED YET!!!
    }
    /**
     * Determines the number of consecutive characters that are encodable using numeric compaction.
     *
     * @param msg      the message
     * @param startpos the start position within the message
     * @return the requested character count
     */
    public static determineConsecutiveDigitCount(msg: string, startpos: int): int {
        let count: int = 0;
        let len: int = msg.length;
        let idx: int = startpos;
        if (idx < len) {
            let ch: char = StringUtils.getCharCode(msg.charAt(idx));
            while (this.isDigit(ch) && idx < len) {
                count++;
                idx++;
                if (idx < len) {
                    ch = StringUtils.getCharCode(msg.charAt(idx));
                }
            }
        }
        return count;
    }
    static illegalCharacter(c: char): void {
        let hex: string = Integer.toHexString(c);
        hex = '0000'.substring(0, 4 - hex.length) + hex;
        throw new IllegalArgumentException('Illegal character: ' + c + ' (0x' + hex + ')');
    }
}
