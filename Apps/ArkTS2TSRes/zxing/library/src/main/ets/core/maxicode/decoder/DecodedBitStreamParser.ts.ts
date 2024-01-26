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
// package com.google.zxing.maxicode.decoder;
//
// import com.google.zxing.common.DecoderResult;
// import java.text.DecimalFormat;
// import java.text.NumberFormat;
import { char, int, byte } from '../../../customTypings';
import StringBuilder from '../../util/StringBuilder';
import DecoderResult from '../../common/DecoderResult';
import StringUtils from '../../common/StringUtils';
import IllegalArgumentException from '../../IllegalArgumentException';
/**
 * <p>MaxiCodes can encode text or structured information as bits in one of several modes,
 * with multiple character sets in one code. This class decodes the bits back into text.</p>
 *
 * @author mike32767
 * @author Manuel Kasten
 */
export /*final*/ class DecodedBitStreamParser {
    private static SHIFTA: string = '\uFFF0';
    private static SHIFTB: string = '\uFFF1';
    private static SHIFTC: string = '\uFFF2';
    private static SHIFTD: string = '\uFFF3';
    private static SHIFTE: string = '\uFFF4';
    private static TWOSHIFTA: string = '\uFFF5';
    private static THREESHIFTA: string = '\uFFF6';
    private static LATCHA: string = '\uFFF7';
    private static LATCHB: string = '\uFFF8';
    private static LOCK: string = '\uFFF9';
    private static ECI: string = '\uFFFA';
    private static NS: string = '\uFFFB';
    private static PAD: string = '\uFFFC';
    private static FS: string = '\u001C';
    private static GS: string = '\u001D';
    private static RS: string = '\u001E';
    private static SETS = [
        '\nABCDEFGHIJKLMNOPQRSTUVWXYZ' + DecodedBitStreamParser.ECI + DecodedBitStreamParser.FS + DecodedBitStreamParser.GS + DecodedBitStreamParser.RS + DecodedBitStreamParser.NS + ' ' + DecodedBitStreamParser.PAD +
            '"#$%&\'()*+,-./0123456789:' + DecodedBitStreamParser.SHIFTB + DecodedBitStreamParser.SHIFTC + DecodedBitStreamParser.SHIFTD + DecodedBitStreamParser.SHIFTE + DecodedBitStreamParser.LATCHB,
        '`abcdefghijklmnopqrstuvwxyz' + DecodedBitStreamParser.ECI + DecodedBitStreamParser.FS + DecodedBitStreamParser.GS + DecodedBitStreamParser.RS + DecodedBitStreamParser.NS + '{' + DecodedBitStreamParser.PAD +
            '}~\u007F;<=>?[\\]^_ ,./:@!|' + DecodedBitStreamParser.PAD + DecodedBitStreamParser.TWOSHIFTA + DecodedBitStreamParser.THREESHIFTA + DecodedBitStreamParser.PAD +
            DecodedBitStreamParser.SHIFTA + DecodedBitStreamParser.SHIFTC + DecodedBitStreamParser.SHIFTD + DecodedBitStreamParser.SHIFTE + DecodedBitStreamParser.LATCHA,
        '\u00C0\u00C1\u00C2\u00C3\u00C4\u00C5\u00C6\u00C7\u00C8\u00C9\u00CA\u00CB\u00CC\u00CD\u00CE\u00CF\u00D0\u00D1\u00D2\u00D3\u00D4\u00D5\u00D6\u00D7\u00D8\u00D9\u00DA' +
            DecodedBitStreamParser.ECI + DecodedBitStreamParser.FS + DecodedBitStreamParser.GS + DecodedBitStreamParser.RS + DecodedBitStreamParser.NS +
            '\u00DB\u00DC\u00DD\u00DE\u00DF\u00AA\u00AC\u00B1\u00B2\u00B3\u00B5\u00B9\u00BA\u00BC\u00BD\u00BE\u0080\u0081\u0082\u0083\u0084\u0085\u0086\u0087\u0088\u0089' +
            DecodedBitStreamParser.LATCHA + ' ' + DecodedBitStreamParser.LOCK + DecodedBitStreamParser.SHIFTD + DecodedBitStreamParser.SHIFTE + DecodedBitStreamParser.LATCHB,
        '\u00E0\u00E1\u00E2\u00E3\u00E4\u00E5\u00E6\u00E7\u00E8\u00E9\u00EA\u00EB\u00EC\u00ED\u00EE\u00EF\u00F0\u00F1\u00F2\u00F3\u00F4\u00F5\u00F6\u00F7\u00F8\u00F9\u00FA' +
            DecodedBitStreamParser.ECI + DecodedBitStreamParser.FS + DecodedBitStreamParser.GS + DecodedBitStreamParser.RS + DecodedBitStreamParser.NS +
            '\u00FB\u00FC\u00FD\u00FE\u00FF\u00A1\u00A8\u00AB\u00AF\u00B0\u00B4\u00B7\u00B8\u00BB\u00BF\u008A\u008B\u008C\u008D\u008E\u008F\u0090\u0091\u0092\u0093\u0094' +
            DecodedBitStreamParser.LATCHA + ' ' + DecodedBitStreamParser.SHIFTC + DecodedBitStreamParser.LOCK + DecodedBitStreamParser.SHIFTE + DecodedBitStreamParser.LATCHB,
        '\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\u0008\u0009\n\u000B\u000C\r\u000E\u000F\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001A' +
            DecodedBitStreamParser.ECI + DecodedBitStreamParser.PAD + DecodedBitStreamParser.PAD + '\u001B' + DecodedBitStreamParser.NS + DecodedBitStreamParser.FS + DecodedBitStreamParser.GS + DecodedBitStreamParser.RS +
            '\u001F\u009F\u00A0\u00A2\u00A3\u00A4\u00A5\u00A6\u00A7\u00A9\u00AD\u00AE\u00B6\u0095\u0096\u0097\u0098\u0099\u009A\u009B\u009C\u009D\u009E' +
            DecodedBitStreamParser.LATCHA + ' ' + DecodedBitStreamParser.SHIFTC + DecodedBitStreamParser.SHIFTD + DecodedBitStreamParser.LOCK + DecodedBitStreamParser.LATCHB,
    ];
    private constructor() {
    }
    static decode(bytes: Uint8Array, mode: int): DecoderResult {
        let result: StringBuilder = new StringBuilder();
        switch (mode) {
            case 2:
            case 3:
                let postcode: string;
                if (mode === 2) {
                    let pc: int = DecodedBitStreamParser.getPostCode2(bytes);
                    postcode = DecodedBitStreamParser.decimalFormat('0000000000'.substring(0, DecodedBitStreamParser.getPostCode2Length(bytes)), pc);
                }
                else {
                    postcode = DecodedBitStreamParser.getPostCode3(bytes);
                }
                let country: string = DecodedBitStreamParser.decimalFormat('000', DecodedBitStreamParser.getCountry(bytes));
                let service: string = DecodedBitStreamParser.decimalFormat('000', DecodedBitStreamParser.getServiceClass(bytes));
                result.append(DecodedBitStreamParser.getMessage(bytes, 10, 84));
                if (result.toString().startsWith('[)>' + DecodedBitStreamParser.RS + '01' + DecodedBitStreamParser.GS)) {
                    result.insert(9, postcode + DecodedBitStreamParser.GS + country + DecodedBitStreamParser.GS + service + DecodedBitStreamParser.GS);
                }
                else {
                    result.insert(0, postcode + DecodedBitStreamParser.GS + country + DecodedBitStreamParser.GS + service + DecodedBitStreamParser.GS);
                }
                break;
            case 4:
                result.append(DecodedBitStreamParser.getMessage(bytes, 1, 93));
                break;
            case 5:
                result.append(DecodedBitStreamParser.getMessage(bytes, 1, 77));
                break;
        }
        return new DecoderResult(bytes, result.toString(), null, StringUtils.valueOf(Int32Array.from([mode])));
    }
    private static getBit(bit: int, bytes: Uint8Array): int {
        bit--;
        return (bytes[Math.trunc(bit / 6)] & (1 << (5 - (bit % 6)))) === 0 ? 0 : 1;
    }
    private static getInt(bytes: Uint8Array, x: Int32Array): int {
        if (x.length === 0) {
            throw new IllegalArgumentException();
        }
        let val: int = 0;
        for (let i: int = 0; i < x.length; i++) {
            val += DecodedBitStreamParser.getBit(x[i], bytes) << (x.length - i - 1);
        }
        return val;
    }
    private static getCountry(bytes: Uint8Array): int {
        return DecodedBitStreamParser.getInt(bytes, Int32Array.from([53, 54, 43, 44, 45, 46, 47, 48, 37, 38]));
    }
    private static getServiceClass(bytes: Uint8Array): int {
        return DecodedBitStreamParser.getInt(bytes, Int32Array.from([55, 56, 57, 58, 59, 60, 49, 50, 51, 52]));
    }
    private static getPostCode2Length(bytes: Uint8Array): int {
        return DecodedBitStreamParser.getInt(bytes, Int32Array.from([39, 40, 41, 42, 31, 32]));
    }
    private static getPostCode2(bytes: Uint8Array): int {
        return DecodedBitStreamParser.getInt(bytes, Int32Array.from([33, 34, 35, 36, 25, 26, 27, 28, 29, 30, 19,
            20, 21, 22, 23, 24, 13, 14, 15, 16, 17, 18, 7, 8, 9, 10, 11, 12, 1, 2]));
    }
    private static getPostCode3(bytes: Uint8Array): string {
        return StringUtils.valueOf(Int32Array.from([
            StringUtils.getCharCode(DecodedBitStreamParser.SETS[0].charAt(DecodedBitStreamParser.getInt(bytes, Int32Array.from([39, 40, 41, 42, 31, 32])))),
            StringUtils.getCharCode(DecodedBitStreamParser.SETS[0].charAt(DecodedBitStreamParser.getInt(bytes, Int32Array.from([33, 34, 35, 36, 25, 26])))),
            StringUtils.getCharCode(DecodedBitStreamParser.SETS[0].charAt(DecodedBitStreamParser.getInt(bytes, Int32Array.from([27, 28, 29, 30, 19, 20])))),
            StringUtils.getCharCode(DecodedBitStreamParser.SETS[0].charAt(DecodedBitStreamParser.getInt(bytes, Int32Array.from([21, 22, 23, 24, 13, 14])))),
            StringUtils.getCharCode(DecodedBitStreamParser.SETS[0].charAt(DecodedBitStreamParser.getInt(bytes, Int32Array.from([15, 16, 17, 18, 7, 8])))),
            StringUtils.getCharCode(DecodedBitStreamParser.SETS[0].charAt(DecodedBitStreamParser.getInt(bytes, Int32Array.from([9, 10, 11, 12, 1, 2])))),
        ]));
    }
    private static getMessage(bytes: Uint8Array, start: int, len: int): string {
        let sb: StringBuilder = new StringBuilder();
        let shift: int = -1;
        let set: int = 0;
        let lastset: int = 0;
        for (let i: int = start; i < start + len; i++) {
            let c: string = DecodedBitStreamParser.SETS[set].charAt(bytes[i]);
            switch (c) {
                case DecodedBitStreamParser.LATCHA:
                    set = 0;
                    shift = -1;
                    break;
                case DecodedBitStreamParser.LATCHB:
                    set = 1;
                    shift = -1;
                    break;
                case DecodedBitStreamParser.SHIFTA:
                case DecodedBitStreamParser.SHIFTB:
                case DecodedBitStreamParser.SHIFTC:
                case DecodedBitStreamParser.SHIFTD:
                case DecodedBitStreamParser.SHIFTE:
                    lastset = set;
                    set = StringUtils.getCharCode(c) - StringUtils.getCharCode(DecodedBitStreamParser.SHIFTA);
                    shift = 1;
                    break;
                case DecodedBitStreamParser.TWOSHIFTA:
                    lastset = set;
                    set = 0;
                    shift = 2;
                    break;
                case DecodedBitStreamParser.THREESHIFTA:
                    lastset = set;
                    set = 0;
                    shift = 3;
                    break;
                case DecodedBitStreamParser.NS:
                    let nsval: int = (bytes[++i] << 24) + (bytes[++i] << 18) + (bytes[++i] << 12) + (bytes[++i] << 6) + bytes[++i];
                    sb.append(DecodedBitStreamParser.decimalFormat('000000000', nsval));
                    break;
                case DecodedBitStreamParser.LOCK:
                    shift = -1;
                    break;
                default:
                    sb.append(c);
            }
            if (shift-- === 0) {
                set = lastset;
            }
        }
        while (sb.length() > 0 && sb.charAt(sb.length() - 1) === DecodedBitStreamParser.PAD) {
            sb.deleteCharAt(sb.length() - 1);
        }
        return sb.toString();
    }
    static decimalFormat(format: string, value: number): string {
        let str = value.toString();
        let formatLength = format.length;
        while (str.length < formatLength) {
            str = '0' + str;
        }
        return str;
    }
}
