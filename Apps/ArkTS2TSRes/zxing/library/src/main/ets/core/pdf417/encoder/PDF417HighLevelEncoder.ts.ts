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
/*
 * This file has been modified from its original form in Barcode4J.
 */
// package com.google.zxing.pdf417.encoder;
//
// import com.google.zxing.WriterException;
// import com.google.zxing.common.CharacterSetECI;
//
// import java.math.BigInteger;
// import java.nio.charset.Charset;
// import java.nio.charset.CharsetEncoder;
// import java.nio.charset.StandardCharsets;
// import java.util.Arrays;
/**
 * PDF417 high-level encoder following the algorithm described in ISO/IEC 15438:2001(E) in
 * annex P.
 */
/**/
import StandardCharsets from '../../util/StandardCharsets';
import { int, byte, char, long } from '../../../customTypings';
import Charset from '../../util/Charset';
import { Compaction } from './Compaction';
import WriterException from '../../WriterException';
import StringBuilder from '../../util/StringBuilder';
import CharacterSetECI from '../../common/CharacterSetECI';
import StringUtils from '../../common/StringUtils';
import Arrays from '../../util/Arrays';
export class PDF417HighLevelEncoder {
    /**
     * code for Text compaction
     */
    private static TEXT_COMPACTION: int = 0;
    /**
     * code for Byte compaction
     */
    private static BYTE_COMPACTION: int = 1;
    /**
     * code for Numeric compaction
     */
    private static NUMERIC_COMPACTION: int = 2;
    /**
     * Text compaction submode Alpha
     */
    private static SUBMODE_ALPHA: int = 0;
    /**
     * Text compaction submode Lower
     */
    private static SUBMODE_LOWER: int = 1;
    /**
     * Text compaction submode Mixed
     */
    private static SUBMODE_MIXED: int = 2;
    /**
     * Text compaction submode Punctuation
     */
    private static SUBMODE_PUNCTUATION: int = 3;
    /**
     * mode latch to Text Compaction mode
     */
    private static LATCH_TO_TEXT: int = 900;
    /**
     * mode latch to Byte Compaction mode (number of characters NOT a multiple of 6)
     */
    private static LATCH_TO_BYTE_PADDED: int = 901;
    /**
     * mode latch to Numeric Compaction mode
     */
    private static LATCH_TO_NUMERIC: int = 902;
    /**
     * mode shift to Byte Compaction mode
     */
    private static SHIFT_TO_BYTE: int = 913;
    /**
     * mode latch to Byte Compaction mode (number of characters a multiple of 6)
     */
    private static LATCH_TO_BYTE: int = 924;
    /**
     * identifier for a user defined Extended Channel Interpretation (ECI)
     */
    private static ECI_USER_DEFINED: int = 925;
    /**
     * identifier for a general purpose ECO format
     */
    private static ECI_GENERAL_PURPOSE: int = 926;
    /**
     * identifier for an ECI of a character set of code page
     */
    private static ECI_CHARSET: int = 927;
    /**
     * Raw code table for text compaction Mixed sub-mode
     */
    private static TEXT_MIXED_RAW: byte[] = [
        48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 38, 13, 9, 44, 58,
        35, 45, 46, 36, 47, 43, 37, 42, 61, 94, 0, 32, 0, 0, 0
    ];
    /**
     * Raw code table for text compaction: Punctuation sub-mode
     */
    private static TEXT_PUNCTUATION_RAW: byte[] = [
        59, 60, 62, 64, 91, 92, 93, 95, 96, 126, 33, 13, 9, 44, 58,
        10, 45, 46, 36, 47, 34, 124, 42, 40, 41, 63, 123, 125, 39, 0
    ];
    private static MIXED: Int32Array = new Int32Array(128);
    private static PUNCTUATION: Int32Array = new Int32Array(128);
    private static DEFAULT_ENCODING: Charset = StandardCharsets.ISO_8859_1;
    private constructor() {
    }
    static init() {
        // Construct inverse lookups
        Arrays.fill(PDF417HighLevelEncoder.MIXED, -1);
        for (let i: int = 0; i < PDF417HighLevelEncoder.TEXT_MIXED_RAW.length; i++) {
            let b: byte = PDF417HighLevelEncoder.TEXT_MIXED_RAW[i];
            if (b > 0) {
                PDF417HighLevelEncoder.MIXED[b] = i;
            }
        }
        Arrays.fill(PDF417HighLevelEncoder.PUNCTUATION, -1);
        for (let i: int = 0; i < PDF417HighLevelEncoder.TEXT_PUNCTUATION_RAW.length; i++) {
            let b: byte = PDF417HighLevelEncoder.TEXT_PUNCTUATION_RAW[i];
            if (b > 0) {
                PDF417HighLevelEncoder.PUNCTUATION[b] = i;
            }
        }
    }
    /**
     * Performs high-level encoding of a PDF417 message using the algorithm described in annex P
     * of ISO/IEC 15438:2001(E). If byte compaction has been selected, then only byte compaction
     * is used.
     *
     * @param msg the message
     * @param compaction compaction mode to use
     * @param encoding character encoding used to encode in default or byte compaction
     *  or {@code null} for default / not applicable
     * @return the encoded message (the char values range from 0 to 928)
     */
    static encodeHighLevel(msg: string, compaction: Compaction, encoding: Charset): string {
        // the codewords 0..928 are encoded as Unicode characters
        let sb: StringBuilder = new StringBuilder();
        if (encoding == null) {
            encoding = this.DEFAULT_ENCODING;
        }
        else if (!this.DEFAULT_ENCODING.equals(encoding)) {
            let eci: CharacterSetECI = CharacterSetECI.getCharacterSetECIByName(encoding.name);
            if (eci != null) {
                this.encodingECI(eci.getValue(), sb);
            }
        }
        let len: int = msg.length;
        let p: int = 0;
        let textSubMode: int = PDF417HighLevelEncoder.SUBMODE_ALPHA;
        // User selected encoding mode
        switch (compaction) {
            case Compaction.TEXT:
                this.encodeText(msg, p, len, sb, textSubMode);
                break;
            case Compaction.BYTE:
                let msgBytes: Uint8Array = StringUtils.getBytes(msg, encoding);
                this.encodeBinary(msgBytes, p, msgBytes.length, PDF417HighLevelEncoder.BYTE_COMPACTION, sb);
                break;
            case Compaction.NUMERIC:
                sb.append(StringUtils.getCharAt(PDF417HighLevelEncoder.LATCH_TO_NUMERIC));
                this.encodeNumeric(msg, p, len, sb);
                break;
            default:
                let encodingMode: int = PDF417HighLevelEncoder.TEXT_COMPACTION; // Default mode, see 4.4.2.1
                while (p < len) {
                    let n: int = this.determineConsecutiveDigitCount(msg, p);
                    if (n >= 13) {
                        sb.append(StringUtils.getCharAt(PDF417HighLevelEncoder.LATCH_TO_NUMERIC));
                        encodingMode = this.NUMERIC_COMPACTION;
                        textSubMode = this.SUBMODE_ALPHA; // Reset after latch
                        this.encodeNumeric(msg, p, n, sb);
                        p += n;
                    }
                    else {
                        let t: int = this.determineConsecutiveTextCount(msg, p);
                        if (t >= 5 || n === len) {
                            if (encodingMode !== PDF417HighLevelEncoder.TEXT_COMPACTION) {
                                sb.append(StringUtils.getCharAt(PDF417HighLevelEncoder.LATCH_TO_TEXT));
                                encodingMode = PDF417HighLevelEncoder.TEXT_COMPACTION;
                                textSubMode = PDF417HighLevelEncoder.SUBMODE_ALPHA; // start with submode alpha after latch
                            }
                            textSubMode = PDF417HighLevelEncoder.encodeText(msg, p, t, sb, textSubMode);
                            p += t;
                        }
                        else {
                            let b: int = PDF417HighLevelEncoder.determineConsecutiveBinaryCount(msg, p, encoding);
                            if (b === 0) {
                                b = 1;
                            }
                            let bytes: Uint8Array = StringUtils.getBytes(msg.substring(p, p + b), encoding);
                            if (bytes.length === 1 && encodingMode === PDF417HighLevelEncoder.TEXT_COMPACTION) {
                                // Switch for one byte (instead of latch)
                                this.encodeBinary(bytes, 0, 1, PDF417HighLevelEncoder.TEXT_COMPACTION, sb);
                            }
                            else {
                                // Mode latch performed by encodeBinary()
                                this.encodeBinary(bytes, 0, bytes.length, encodingMode, sb);
                                encodingMode = PDF417HighLevelEncoder.BYTE_COMPACTION;
                                textSubMode = PDF417HighLevelEncoder.SUBMODE_ALPHA; // Reset after latch
                            }
                            p += b;
                        }
                    }
                }
                break;
        }
        return sb.toString();
    }
    /**
     * Encode parts of the message using Text Compaction as described in ISO/IEC 15438:2001(E),
     * chapter 4.4.2.
     *
     * @param msg            the message
     * @param startpos       the start position within the message
     * @param count          the number of characters to encode
     * @param sb             receives the encoded codewords
     * @param initialSubmode should normally be SUBMODE_ALPHA
     * @return the text submode in which this method ends
     */
    private static encodeText(msg: string, startpos: int, count: int, sb: StringBuilder, initialSubmode: int): int {
        let tmp: StringBuilder = new StringBuilder();
        let submode: int = initialSubmode;
        let idx: int = 0;
        while (true) {
            let ch: char = StringUtils.getCharCode(msg.charAt(startpos + idx));
            switch (submode) {
                case this.SUBMODE_ALPHA:
                    if (this.isAlphaUpper(ch)) {
                        if (ch === StringUtils.getCharCode(' ')) {
                            tmp.append(StringUtils.getCharAt(26)); // space
                        }
                        else {
                            tmp.append(StringUtils.getCharAt((ch - 65)));
                        }
                    }
                    else {
                        if (this.isAlphaLower(ch)) {
                            submode = this.SUBMODE_LOWER;
                            tmp.append(StringUtils.getCharAt(27)); // ll
                            continue;
                        }
                        else if (this.isMixed(ch)) {
                            submode = this.SUBMODE_MIXED;
                            tmp.append(StringUtils.getCharAt(28)); // ml
                            continue;
                        }
                        else {
                            tmp.append(StringUtils.getCharAt(29)); // ps
                            tmp.append(StringUtils.getCharAt(PDF417HighLevelEncoder.PUNCTUATION[ch]));
                            break;
                        }
                    }
                    break;
                case this.SUBMODE_LOWER:
                    if (this.isAlphaLower(ch)) {
                        if (ch === StringUtils.getCharCode(' ')) {
                            tmp.append(StringUtils.getCharAt(26)); // space
                        }
                        else {
                            tmp.append(StringUtils.getCharAt((ch - 97)));
                        }
                    }
                    else {
                        if (PDF417HighLevelEncoder.isAlphaUpper(ch)) {
                            tmp.append(StringUtils.getCharAt(27)); // as
                            tmp.append(StringUtils.getCharAt((ch - 65)));
                            // space cannot happen here, it is also in "Lower"
                            break;
                        }
                        else if (PDF417HighLevelEncoder.isMixed(ch)) {
                            submode = PDF417HighLevelEncoder.SUBMODE_MIXED;
                            tmp.append(StringUtils.getCharAt(28)); // ml
                            continue;
                        }
                        else {
                            tmp.append(StringUtils.getCharAt(29)); // ps
                            tmp.append(StringUtils.getCharAt(PDF417HighLevelEncoder.PUNCTUATION[ch]));
                            break;
                        }
                    }
                    break;
                case PDF417HighLevelEncoder.SUBMODE_MIXED:
                    if (PDF417HighLevelEncoder.isMixed(ch)) {
                        tmp.append(StringUtils.getCharAt(PDF417HighLevelEncoder.MIXED[ch]));
                    }
                    else {
                        if (PDF417HighLevelEncoder.isAlphaUpper(ch)) {
                            submode = PDF417HighLevelEncoder.SUBMODE_ALPHA;
                            tmp.append(StringUtils.getCharAt(28)); // al
                            continue;
                        }
                        else if (PDF417HighLevelEncoder.isAlphaLower(ch)) {
                            submode = PDF417HighLevelEncoder.SUBMODE_LOWER;
                            tmp.append(StringUtils.getCharAt(27)); // ll
                            continue;
                        }
                        else {
                            if (startpos + idx + 1 < count) {
                                let next: char = StringUtils.getCharCode(msg.charAt(startpos + idx + 1));
                                if (PDF417HighLevelEncoder.isPunctuation(next)) {
                                    submode = PDF417HighLevelEncoder.SUBMODE_PUNCTUATION;
                                    tmp.append(StringUtils.getCharAt(25)); // pl
                                    continue;
                                }
                            }
                            tmp.append(StringUtils.getCharAt(29)); // ps
                            tmp.append(StringUtils.getCharAt(PDF417HighLevelEncoder.PUNCTUATION[ch]));
                        }
                    }
                    break;
                default: // SUBMODE_PUNCTUATION
                    if (PDF417HighLevelEncoder.isPunctuation(ch)) {
                        tmp.append((StringUtils.getCharAt(this.PUNCTUATION[ch])));
                    }
                    else {
                        submode = PDF417HighLevelEncoder.SUBMODE_ALPHA;
                        tmp.append(StringUtils.getCharAt(29)); // al
                        continue;
                    }
            }
            idx++;
            if (idx >= count) {
                break;
            }
        }
        let h: char = 0;
        let len: int = tmp.length();
        for (let i: int = 0; i < len; i++) {
            let odd: boolean = (i % 2) !== 0;
            if (odd) {
                h = (h * 30) + StringUtils.getCharCode(tmp.charAt(i));
                sb.append(String.fromCodePoint(h));
            }
            else {
                h = StringUtils.getCharCode(tmp.charAt(i));
            }
        }
        if ((len % 2) !== 0) {
            sb.append(StringUtils.getCharAt(((h * 30) + 29))); // ps
        }
        return submode;
    }
    /**
     * Encode parts of the message using Byte Compaction as described in ISO/IEC 15438:2001(E),
     * chapter 4.4.3. The Unicode characters will be converted to binary using the cp437
     * codepage.
     *
     * @param bytes     the message converted to a byte array
     * @param startpos  the start position within the message
     * @param count     the number of bytes to encode
     * @param startmode the mode from which this method starts
     * @param sb        receives the encoded codewords
     */
    private static encodeBinary(bytes: Uint8Array, startpos: int, count: int, startmode: int, sb: StringBuilder): void {
        if (count === 1 && startmode === PDF417HighLevelEncoder.TEXT_COMPACTION) {
            sb.append(StringUtils.getCharAt(PDF417HighLevelEncoder.SHIFT_TO_BYTE));
        }
        else {
            if ((count % 6) === 0) {
                sb.append(StringUtils.getCharAt(PDF417HighLevelEncoder.LATCH_TO_BYTE));
            }
            else {
                sb.append(StringUtils.getCharAt(PDF417HighLevelEncoder.LATCH_TO_BYTE_PADDED));
            }
        }
        let idx: int = startpos;
        // Encode sixpacks
        if (count >= 6) {
            let chars: Array<String> = new Array<String>(5);
            while ((startpos + count - idx) >= 6) {
                let t: long = BigInt(0);
                for (let i: int = 0; i < 6; i++) {
                    t <<= BigInt(8);
                    t += BigInt(bytes[idx + i] & 0xff);
                }
                for (let i: int = 0; i < 5; i++) {
                    chars[i] = String.fromCodePoint(parseInt((t % BigInt(900)).toLocaleString()));
                    t /= BigInt(900);
                }
                for (let i: int = chars.length - 1; i >= 0; i--) {
                    sb.append(chars[i].toString());
                }
                idx += 6;
            }
        }
        // Encode rest (remaining n<5 bytes if any)
        for (let i: int = idx; i < startpos + count; i++) {
            let ch: int = bytes[i] & 0xff;
            sb.append(StringUtils.getCharAt(ch));
        }
    }
    private static encodeNumeric(msg: string, startpos: int, count: int, sb: StringBuilder): void {
        let idx: int = 0;
        let tmp: StringBuilder = new StringBuilder();
        let num900: bigint = BigInt(900);
        let num0: bigint = BigInt(0);
        while (idx < count) {
            tmp.setLengthToZero();
            let len: int = Math.min(44, count - idx);
            let part: string = '1' + msg.substring(startpos + idx, startpos + idx + len);
            let bigint: bigint = BigInt(part);
            do {
                tmp.append(StringUtils.getCharAt(Number.parseInt(bigint % num900 + '')));
                bigint = bigint / num900;
            } while (bigint !== num0);
            // Reverse temporary string
            for (let i: int = tmp.length() - 1; i >= 0; i--) {
                sb.append(tmp.charAt(i));
            }
            idx += len;
        }
    }
    private static isDigit(ch: char): boolean {
        return ch >= StringUtils.getCharCode('0') && ch <= StringUtils.getCharCode('9');
    }
    private static isAlphaUpper(ch: char): boolean {
        return ch === StringUtils.getCharCode(' ') || (ch >= StringUtils.getCharCode('A') && ch <= StringUtils.getCharCode('Z'));
    }
    private static isAlphaLower(ch: char): boolean {
        return ch === StringUtils.getCharCode(' ') || (ch >= StringUtils.getCharCode('a') && ch <= 'z'.charCodeAt(0));
    }
    private static isMixed(ch: char): boolean {
        return this.MIXED[ch] !== -1;
    }
    private static isPunctuation(ch: char): boolean {
        return this.PUNCTUATION[ch] !== -1;
    }
    private static isText(ch: char): boolean {
        return ch === StringUtils.getCharCode('\t') || ch === StringUtils.getCharCode('\n') || ch === StringUtils.getCharCode('\r') || (ch >= 32 && ch <= 126);
    }
    /**
     * Determines the number of consecutive characters that are encodable using numeric compaction
     *
     * @param msg      the message
     * @param startpos the start position within the message
     * @return the requested character count
     */
    private static determineConsecutiveDigitCount(msg: string, startpos: int): int {
        let count: int = 0;
        let len: int = msg.length;
        let idx: int = startpos;
        if (idx < len) {
            let ch: char = StringUtils.getCharCode(msg.charAt(idx));
            while (PDF417HighLevelEncoder.isDigit(ch) && idx < len) {
                count++;
                idx++;
                if (idx < len) {
                    ch = StringUtils.getCharCode(msg.charAt(idx));
                }
            }
        }
        return count;
    }
    /**
     * Determines the number of consecutive characters that are encodable using text compaction.
     *
     * @param msg      the message
     * @param startpos the start position within the message
     * @return the requested character count
     */
    private static determineConsecutiveTextCount(msg: string, startpos: int): int {
        let len: int = msg.length;
        let idx: int = startpos;
        while (idx < len) {
            let ch: char = StringUtils.getCharCode(msg.charAt(idx));
            let numericCount: int = 0;
            while (numericCount < 13 && PDF417HighLevelEncoder.isDigit(ch) && idx < len) {
                numericCount++;
                idx++;
                if (idx < len) {
                    ch = StringUtils.getCharCode(msg.charAt(idx));
                }
            }
            if (numericCount >= 13) {
                return idx - startpos - numericCount;
            }
            if (numericCount > 0) {
                // Heuristic: All text-encodable chars or digits are binary encodable
                continue;
            }
            ch = StringUtils.getCharCode(msg.charAt(idx));
            // Check if character is encodable
            if (!this.isText(ch)) {
                break;
            }
            idx++;
        }
        return idx - startpos;
    }
    /**
     * Determines the number of consecutive characters that are encodable using binary compaction.
     *
     * @param msg      the message
     * @param startpos the start position within the message
     * @param encoding the charset used to convert the message to a byte array
     * @return the requested character count
     */
    private static determineConsecutiveBinaryCount(msg: string, startpos: int, encoding: Charset): int {
        // let encoder: CharsetEncoder = encoding.newEncoder();
        let len: int = msg.length;
        let idx: int = startpos;
        while (idx < len) {
            let ch: char = StringUtils.getCharCode(msg.charAt(idx));
            let numericCount: int = 0;
            while (numericCount < 13 && PDF417HighLevelEncoder.isDigit(ch)) {
                numericCount++;
                // textCount++;
                let i: int = idx + numericCount;
                if (i >= len) {
                    break;
                }
                ch = StringUtils.getCharCode(msg.charAt(i));
            }
            if (numericCount >= 13) {
                return idx - startpos;
            }
            ch = StringUtils.getCharCode(msg.charAt(idx));
            if (!StringUtils.canEncode(ch, encoding)) {
                throw new WriterException('Non-encodable character detected: ' + ch + ' (Unicode: ' + ch + ')');
            }
            idx++;
        }
        return idx - startpos;
    }
    private static encodingECI(eci: int, sb: StringBuilder): void {
        if (eci >= 0 && eci < 900) {
            sb.append(StringUtils.getCharAt(PDF417HighLevelEncoder.ECI_CHARSET));
            sb.append(StringUtils.getCharAt(eci));
        }
        else if (eci < 810900) {
            sb.append(StringUtils.getCharAt(PDF417HighLevelEncoder.ECI_GENERAL_PURPOSE));
            sb.append(StringUtils.getCharAt((eci / 900 - 1)));
            sb.append(StringUtils.getCharAt((eci % 900)));
        }
        else if (eci < 811800) {
            sb.append(StringUtils.getCharAt(PDF417HighLevelEncoder.ECI_USER_DEFINED));
            sb.append(StringUtils.getCharAt((810900 - eci)));
        }
        else {
            throw new WriterException('ECI number not in valid range from 0..811799, but was ' + eci);
        }
    }
}
PDF417HighLevelEncoder.init();
// console.log('PDF417HighLevelEncoder init()');
