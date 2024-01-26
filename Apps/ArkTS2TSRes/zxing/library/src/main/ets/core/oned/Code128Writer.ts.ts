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
import OneDimensionalCodeWriter from './OneDimensionalCodeWriter';
import BarcodeFormat from '../BarcodeFormat';
import { Collection, int } from '../../customTypings';
import IllegalArgumentException from '../IllegalArgumentException';
import Collections from '../util/Collections';
import Integer from '../util/Integer';
import EncodeHintType from '../EncodeHintType';
import Code128Reader from './Code128Reader';
// Results of minimal lookahead for code C
enum CType {
    UNCODABLE,
    ONE_DIGIT,
    TWO_DIGITS,
    FNC_1
}
/**
 * This object renders a CODE128 code as a {@link BitMatrix}.
 *
 * @author erik.barbara@gmail.com (Erik Barbara)
 */
export default /*public */ class Code128Writer extends OneDimensionalCodeWriter {
    private static CODE_START_A: int = 103;
    private static CODE_START_B: int = 104;
    private static CODE_START_C: int = 105;
    private static CODE_CODE_A: int = 101;
    private static CODE_CODE_B: int = 100;
    private static CODE_CODE_C: int = 99;
    private static CODE_STOP: int = 106;
    // Dummy characters used to specify control characters in input
    private static ESCAPE_FNC_1 = '\u00f1';
    private static ESCAPE_FNC_2 = '\u00f2';
    private static ESCAPE_FNC_3 = '\u00f3';
    private static ESCAPE_FNC_4 = '\u00f4';
    private static CODE_FNC_1: int = 102; // Code A, Code B, Code C
    private static CODE_FNC_2: int = 97; // Code A, Code B
    private static CODE_FNC_3: int = 96; // Code A, Code B
    private static CODE_FNC_4_A: int = 101; // Code A
    private static CODE_FNC_4_B: int = 100; // Code B
    protected getSupportedWriteFormats(): Collection<BarcodeFormat> {
        return Collections.singletonList(BarcodeFormat.CODE_128);
    }
    encodeCode(contents: string, hints: Map<EncodeHintType, any>): boolean[] {
        let length: int = contents.length;
        // Check length
        if (length < 1 || length > 80) {
            throw new IllegalArgumentException('Contents length should be between 1 and 80 characters, but got ' + length);
        }
        // Check for forced code set hint.
        let forcedCodeSet: int = -1;
        if (hints != null && hints.has(EncodeHintType.FORCE_CODE_SET)) {
            let codeSetHint: String = hints.get(EncodeHintType.FORCE_CODE_SET).toString();
            switch (codeSetHint) {
                case 'A':
                    forcedCodeSet = Code128Writer.CODE_CODE_A;
                    break;
                case 'B':
                    forcedCodeSet = Code128Writer.CODE_CODE_B;
                    break;
                case 'C':
                    forcedCodeSet = Code128Writer.CODE_CODE_C;
                    break;
                default:
                    throw new IllegalArgumentException('Unsupported code set hint: ' + codeSetHint);
            }
        }
        // Check content
        for (let i: int = 0; i < length; i++) {
            let c = contents.charAt(i);
            // check for non ascii characters that are not special GS1 characters
            switch (c) {
                // special function characters
                case Code128Writer.ESCAPE_FNC_1:
                case Code128Writer.ESCAPE_FNC_2:
                case Code128Writer.ESCAPE_FNC_3:
                case Code128Writer.ESCAPE_FNC_4:
                    break;
                // non ascii characters
                default:
                    if (c.charCodeAt(0) > 127) {
                        // no full Latin-1 character set available at the moment
                        // shift and manual code change are not supported
                        throw new IllegalArgumentException('Bad character in input: ASCII value=' + c);
                    }
            }
            // check characters for compatibility with forced code set
            switch (forcedCodeSet) {
                case Code128Writer.CODE_CODE_A:
                    // allows no ascii above 95 (no lower caps, no special symbols)
                    if (c.charCodeAt(0) > 95 && c.charCodeAt(0) <= 127) {
                        throw new IllegalArgumentException('Bad character in input for forced code set A: ASCII value=' + c);
                    }
                    break;
                case Code128Writer.CODE_CODE_B:
                    // allows no ascii below 32 (terminal symbols)
                    if (c.charCodeAt(0) <= 32) {
                        throw new IllegalArgumentException('Bad character in input for forced code set B: ASCII value=' + c);
                    }
                    break;
                case Code128Writer.CODE_CODE_C:
                    // allows only ints and no FNC 2/3/4
                    if (c.charCodeAt(0) < 48 || (c.charCodeAt(0) > 57 && c.charCodeAt(0) <= 127) || c === Code128Writer.ESCAPE_FNC_2 || c === Code128Writer.ESCAPE_FNC_3 || c === Code128Writer.ESCAPE_FNC_4) {
                        throw new IllegalArgumentException('Bad character in input for forced code set C: ASCII value=' + c);
                    }
                    break;
            }
        }
        let patterns: Collection<Int32Array> = new Array<Int32Array>(); // temporary storage for patterns
        let checkSum: int = 0;
        let checkWeight: int = 1;
        let codeSet: int = 0; // selected code (CODE_CODE_B or CODE_CODE_C)
        let position: int = 0; // position in contents
        while (position < length) {
            // Select code to use
            let newCodeSet: int;
            if (forcedCodeSet === -1) {
                newCodeSet = Code128Writer.chooseCode(contents, position, codeSet);
            }
            else {
                newCodeSet = forcedCodeSet;
            }
            // Get the pattern index
            let patternIndex: int;
            if (newCodeSet === codeSet) {
                // Encode the current character
                // First handle escapes
                switch (contents.charAt(position)) {
                    case Code128Writer.ESCAPE_FNC_1:
                        patternIndex = Code128Writer.CODE_FNC_1;
                        break;
                    case Code128Writer.ESCAPE_FNC_2:
                        patternIndex = Code128Writer.CODE_FNC_2;
                        break;
                    case Code128Writer.ESCAPE_FNC_3:
                        patternIndex = Code128Writer.CODE_FNC_3;
                        break;
                    case Code128Writer.ESCAPE_FNC_4:
                        if (codeSet === Code128Writer.CODE_CODE_A) {
                            patternIndex = Code128Writer.CODE_FNC_4_A;
                        }
                        else {
                            patternIndex = Code128Writer.CODE_FNC_4_B;
                        }
                        break;
                    default:
                        // Then handle normal characters otherwise
                        switch (codeSet) {
                            case Code128Writer.CODE_CODE_A:
                                patternIndex = contents.charAt(position).charCodeAt(0) - ' '.charCodeAt(0);
                                if (patternIndex < 0) {
                                    // everything below a space character comes behind the underscore in the code patterns table
                                    patternIndex += '`'.charCodeAt(0);
                                }
                                break;
                            case Code128Writer.CODE_CODE_B:
                                patternIndex = contents.charAt(position).charCodeAt(0) - ' '.charCodeAt(0);
                                break;
                            default:
                                // CODE_CODE_C
                                if (position + 1 === length) {
                                    // this is the last character, but the encoding is C, which always encodes two characers
                                    throw new IllegalArgumentException('Bad int of characters for digit only encoding.');
                                }
                                patternIndex = Integer.parse(contents.substring(position, position + 2));
                                position++; // Also incremented below
                                break;
                        }
                }
                position++;
            }
            else {
                // Should we change the current code?
                // Do we have a code set?
                if (codeSet === 0) {
                    // No, we don't have a code set
                    switch (newCodeSet) {
                        case Code128Writer.CODE_CODE_A:
                            patternIndex = Code128Writer.CODE_START_A;
                            break;
                        case Code128Writer.CODE_CODE_B:
                            patternIndex = Code128Writer.CODE_START_B;
                            break;
                        default:
                            patternIndex = Code128Writer.CODE_START_C;
                            break;
                    }
                }
                else {
                    // Yes, we have a code set
                    patternIndex = newCodeSet;
                }
                codeSet = newCodeSet;
            }
            // Get the pattern
            patterns.push(Code128Reader.CODE_PATTERNS[patternIndex]);
            // Compute checksum
            checkSum += patternIndex * checkWeight;
            if (position !== 0) {
                checkWeight++;
            }
        }
        // Compute and append checksum
        checkSum %= 103;
        patterns.push(Code128Reader.CODE_PATTERNS[checkSum]);
        // Append stop code
        patterns.push(Code128Reader.CODE_PATTERNS[Code128Writer.CODE_STOP]);
        // Compute code width
        let codeWidth: int = 0;
        for (let pattern of patterns) {
            for (let width of pattern) {
                codeWidth += width;
            }
        }
        // Compute result
        let result: boolean[] = new Array<boolean>(codeWidth);
        let pos: int = 0;
        for (let pattern of patterns) {
            pos += Code128Writer.appendPattern(result, pos, pattern, true);
        }
        return result;
    }
    private static findCType(value: string, start: int): CType {
        let last: int = value.length;
        if (start >= last) {
            return CType.UNCODABLE;
        }
        let c = value.charAt(start);
        if (c === Code128Writer.ESCAPE_FNC_1) {
            return CType.FNC_1;
        }
        if (c < '0' || c > '9') {
            return CType.UNCODABLE;
        }
        if (start + 1 >= last) {
            return CType.ONE_DIGIT;
        }
        c = value.charAt(start + 1);
        if (c < '0' || c > '9') {
            return CType.ONE_DIGIT;
        }
        return CType.TWO_DIGITS;
    }
    private static chooseCode(value: string, start: int, oldCode: int): int {
        let lookahead: CType = this.findCType(value, start);
        if (lookahead === CType.ONE_DIGIT) {
            if (oldCode === Code128Writer.CODE_CODE_A) {
                return Code128Writer.CODE_CODE_A;
            }
            return Code128Writer.CODE_CODE_B;
        }
        if (lookahead === CType.UNCODABLE) {
            if (start < value.length) {
                let c: string = value.charAt(start);
                if (c < ' ' || (oldCode === Code128Writer.CODE_CODE_A && (c < '`' || (c >= Code128Writer.ESCAPE_FNC_1 && c <= Code128Writer.ESCAPE_FNC_4)))) {
                    // can continue in code A, encodes ASCII 0 to 95 or FNC1 to FNC4
                    return Code128Writer.CODE_CODE_A;
                }
            }
            return Code128Writer.CODE_CODE_B; // no choice
        }
        if (oldCode === Code128Writer.CODE_CODE_A && lookahead === CType.FNC_1) {
            return Code128Writer.CODE_CODE_A;
        }
        if (oldCode === Code128Writer.CODE_CODE_C) { // can continue in code C
            return Code128Writer.CODE_CODE_C;
        }
        if (oldCode === Code128Writer.CODE_CODE_B) {
            if (lookahead === CType.FNC_1) {
                return Code128Writer.CODE_CODE_B; // can continue in code B
            }
            // Seen two consecutive digits, see what follows
            lookahead = this.findCType(value, start + 2);
            if (lookahead === CType.UNCODABLE || lookahead === CType.ONE_DIGIT) {
                return Code128Writer.CODE_CODE_B; // not worth switching now
            }
            if (lookahead === CType.FNC_1) { // two digits, then FNC_1...
                lookahead = this.findCType(value, start + 3);
                if (lookahead === CType.TWO_DIGITS) { // then two more digits, switch
                    return Code128Writer.CODE_CODE_C;
                }
                else {
                    return Code128Writer.CODE_CODE_B; // otherwise not worth switching
                }
            }
            // At this point, there are at least 4 consecutive digits.
            // Look ahead to choose whether to switch now or on the next round.
            let index: int = start + 4;
            while ((lookahead = this.findCType(value, index)) === CType.TWO_DIGITS) {
                index += 2;
            }
            if (lookahead === CType.ONE_DIGIT) { // odd number of digits, switch later
                return Code128Writer.CODE_CODE_B;
            }
            return Code128Writer.CODE_CODE_C; // even number of digits, switch now
        }
        // Here oldCode == 0, which means we are choosing the initial code
        if (lookahead === CType.FNC_1) { // ignore FNC_1
            lookahead = this.findCType(value, start + 1);
        }
        if (lookahead === CType.TWO_DIGITS) { // at least two digits, start in code C
            return Code128Writer.CODE_CODE_C;
        }
        return Code128Writer.CODE_CODE_B;
    }
}
