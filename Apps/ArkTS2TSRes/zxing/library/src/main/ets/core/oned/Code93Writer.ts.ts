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
import { Collection, int } from '../../customTypings';
import Collections from '../util/Collections';
import StringBuilder from '../util/StringBuilder';
import StringUtils from '../common/StringUtils';
import IllegalArgumentException from '../IllegalArgumentException';
import Code93Reader from './Code93Reader';
import BarcodeFormat from '../BarcodeFormat';
import EncodeHintType from '../EncodeHintType';
export default class Code93Writer extends OneDimensionalCodeWriter {
    encodeCode(contents: string, hints: Map<EncodeHintType, any>): boolean[] {
        contents = Code93Writer.convertToExtended(contents);
        let length = contents.length;
        if (length > 80) {
            throw new IllegalArgumentException('Requested contents should be less than 80 digits long after ' +
                'converting to extended encoding, but got ' + length);
        }
        // length of code + 2 start/stop characters + 2 checksums, each of 9 bits, plus a termination bar
        let codeWidth: int = (contents.length + 2 + 2) * 9 + 1;
        // boolean[] result = new boolean[codeWidth];
        let result: boolean[] = new Array<boolean>(codeWidth);
        // start character (*)
        let pos: int = this.appendPattern(result, 0, Code93Reader.ASTERISK_ENCODING);
        for (let i: int = 0; i < length; i++) {
            let indexInString: int = Code93Reader.ALPHABET_STRING.indexOf(contents.charAt(i));
            pos += this.appendPattern(result, pos, Code93Reader.CHARACTER_ENCODINGS[indexInString]);
        }
        // add two checksums
        let check1: int = Code93Writer.computeChecksumIndex(contents, 20);
        pos += this.appendPattern(result, pos, Code93Reader.CHARACTER_ENCODINGS[check1]);
        // append the contents to reflect the first checksum added
        contents += Code93Reader.ALPHABET_STRING.charAt(check1);
        let check2: int = Code93Writer.computeChecksumIndex(contents, 15);
        pos += this.appendPattern(result, pos, Code93Reader.CHARACTER_ENCODINGS[check2]);
        // end character (*)
        pos += this.appendPattern(result, pos, Code93Reader.ASTERISK_ENCODING);
        // termination bar (single black bar)
        result[pos] = true;
        return result;
    }
    protected getSupportedWriteFormats(): Collection<BarcodeFormat> {
        return Collections.singletonList(BarcodeFormat.CODE_93);
    }
    /**
     * @param contents barcode contents to encode. It should not be encoded for extended characters.
     * @return a {@code boolean[]} of horizontal pixels (false = white, true = black)
     */
    /**
     * @param target output to append to
     * @param pos start position
     * @param pattern pattern to append
     * @param startColor unused
     * @return 9
     * @deprecated without replacement; intended as an internal-only method
     */
    /*protected static appendPattern(target: boolean[], pos: int, pattern: Int32Array, startColor: boolean): int {
      for (let bit of pattern) {
        target[pos++] = bit !== 0;
      }
      return 9;
    }*/
    public static computeChecksumIndex(contents: string, maxWeight: int): int {
        let weight: int = 1;
        let total: int = 0;
        for (let i: int = contents.length - 1; i >= 0; i--) {
            let indexInString: int = Code93Reader.ALPHABET_STRING.indexOf(contents.charAt(i));
            total += indexInString * weight;
            if (++weight > maxWeight) {
                weight = 1;
            }
        }
        return total % 47;
    }
    appendPattern(target: boolean[], pos: int, a: int): int {
        for (let i: int = 0; i < 9; i++) {
            let temp: int = a & (1 << (8 - i));
            target[pos + i] = temp !== 0;
        }
        return 9;
    }
    static convertToExtended(contents: string): string {
        let length: int = contents.length;
        let extendedContent: StringBuilder = new StringBuilder();
        for (let i: int = 0; i < length; i++) {
            let character: number = StringUtils.getCharCode(contents.charAt(i));
            // ($)=a, (%)=b, (/)=c, (+)=d. see Code93Reader.ALPHABET_STRING
            if (character === 0) {
                // NUL: (%)U
                extendedContent.append('bU');
            }
            else if (character <= 26) {
                // SOH - SUB: ($)A - ($)Z
                extendedContent.append('a');
                extendedContent.append(StringUtils.getCharAt(StringUtils.getCharCode('A') + (character - 1)));
            }
            else if (character <= 31) {
                // ESC - US: (%)A - (%)E
                extendedContent.append('b');
                extendedContent.append(StringUtils.getCharAt(StringUtils.getCharCode('A') + (character - 27)));
            }
            else if (StringUtils.getCharAt(character) === ' ' || StringUtils.getCharAt(character) === '$' || StringUtils.getCharAt(character) === '%' || StringUtils.getCharAt(character) === '+') {
                // space $ % +
                extendedContent.append(character);
            }
            else if (StringUtils.getCharAt(character) <= ',') {
                // ! " # & ' ( ) * ,: (/)A - (/)L
                extendedContent.append('c');
                extendedContent.append(StringUtils.getCharAt(StringUtils.getCharCode('A') + (character - StringUtils.getCharCode(('!')))));
            }
            else if (StringUtils.getCharAt(character) <= '9') {
                extendedContent.append(character);
            }
            else if (StringUtils.getCharAt(character) === ':') {
                // :: (/)Z
                extendedContent.append('cZ');
            }
            else if (StringUtils.getCharAt(character) <= '?') {
                // ; - ?: (%)F - (%)J
                extendedContent.append('b');
                extendedContent.append(StringUtils.getCharAt(StringUtils.getCharCode('F') + (character - StringUtils.getCharCode((';')))));
            }
            else if (StringUtils.getCharAt(character) === '@') {
                // @: (%)V
                extendedContent.append('bV');
            }
            else if (StringUtils.getCharAt(character) <= 'Z') {
                // A - Z
                extendedContent.append(character);
            }
            else if (StringUtils.getCharAt(character) <= '_') {
                // [ - _: (%)K - (%)O
                extendedContent.append('b');
                extendedContent.append(StringUtils.getCharAt(StringUtils.getCharCode('K') + (character - StringUtils.getCharCode(('[')))));
            }
            else if (StringUtils.getCharAt(character) === '`') {
                // `: (%)W
                extendedContent.append('bW');
            }
            else if (StringUtils.getCharAt(character) <= 'z') {
                // a - z: (*)A - (*)Z
                extendedContent.append('d');
                extendedContent.append(StringUtils.getCharAt(StringUtils.getCharCode('A') + (character - StringUtils.getCharCode(('a')))));
            }
            else if (character <= 127) {
                // { - DEL: (%)P - (%)T
                extendedContent.append('b');
                extendedContent.append(StringUtils.getCharAt(StringUtils.getCharCode('P') + (character - StringUtils.getCharCode(('{')))));
            }
            else {
                throw new IllegalArgumentException('Requested content contains a non-encodable character: \'' + character + '\'');
            }
        }
        return extendedContent.toString();
    }
}
