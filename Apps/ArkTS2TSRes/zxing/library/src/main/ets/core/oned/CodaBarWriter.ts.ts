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
import CodaBarReader from './CodaBarReader';
import BarcodeFormat from '../BarcodeFormat';
import IllegalArgumentException from '../IllegalArgumentException';
import EncodeHintType from '../EncodeHintType';
/**
 * This class renders CodaBar as {@code boolean[]}.
 *
 * @author dsbnatut@gmail.com (Kazuki Nishiura)
 */
export default class CodaBarWriter extends OneDimensionalCodeWriter {
    private static START_END_CHARS: string[] = ['A', 'B', 'C', 'D'];
    private static ALT_START_END_CHARS: string[] = ['T', 'N', '*', 'E'];
    private static CHARS_WHICH_ARE_TEN_LENGTH_EACH_AFTER_DECODED: string[] = ['/', ':', '+', '.'];
    private static DEFAULT_GUARD: string = CodaBarWriter.START_END_CHARS[0];
    protected getSupportedWriteFormats(): Collection<BarcodeFormat> {
        return Collections.singletonList(BarcodeFormat.CODABAR);
    }
    encodeCode(contents: string, hints: Map<EncodeHintType, any>): boolean[] {
        if (contents.length < 2) {
            // Can't have a start/end guard, so tentatively add default guards
            contents = CodaBarWriter.DEFAULT_GUARD + contents + CodaBarWriter.DEFAULT_GUARD;
        }
        else {
            // Verify input and calculate decoded length.
            let firstChar: string = contents.charAt(0).toUpperCase();
            let lastChar: string = contents.charAt(contents.length - 1).toUpperCase();
            let startsNormal: boolean = CodaBarReader.arrayContains(CodaBarWriter.START_END_CHARS, firstChar);
            let endsNormal: boolean = CodaBarReader.arrayContains(CodaBarWriter.START_END_CHARS, lastChar);
            let startsAlt: boolean = CodaBarReader.arrayContains(CodaBarWriter.ALT_START_END_CHARS, firstChar);
            let endsAlt: boolean = CodaBarReader.arrayContains(CodaBarWriter.ALT_START_END_CHARS, lastChar);
            if (startsNormal) {
                if (!endsNormal) {
                    throw new IllegalArgumentException('Invalid start/end guards: ' + contents);
                }
                // else already has valid start/end
            }
            else if (startsAlt) {
                if (!endsAlt) {
                    throw new IllegalArgumentException('Invalid start/end guards: ' + contents);
                }
                // else already has valid start/end
            }
            else {
                // Doesn't start with a guard
                if (endsNormal || endsAlt) {
                    throw new IllegalArgumentException('Invalid start/end guards: ' + contents);
                }
                // else doesn't end with guard either, so add a default
                contents = CodaBarWriter.DEFAULT_GUARD + contents + CodaBarWriter.DEFAULT_GUARD;
            }
        }
        // The start character and the end character are decoded to 10 length each.
        let resultLength: int = 20;
        for (let i: int = 1; i < contents.length - 1; i++) {
            if (this.hasNumber(contents.charAt(i)) || contents.charAt(i) === '-' || contents.charAt(i) === '$') {
                resultLength += 9;
            }
            else if (CodaBarReader.arrayContains(CodaBarWriter.CHARS_WHICH_ARE_TEN_LENGTH_EACH_AFTER_DECODED, contents.charAt(i))) {
                resultLength += 10;
            }
            else {
                throw new IllegalArgumentException('Cannot encode : \'' + contents.charAt(i) + '\'');
            }
        }
        // A blank is placed between each character.
        resultLength += contents.length - 1;
        let result: boolean[] = new Array<boolean>(resultLength);
        let position: int = 0;
        for (let index: int = 0; index < contents.length; index++) {
            let c: string = contents.charAt(index).toUpperCase();
            if (index === 0 || index === contents.length - 1) {
                // The start/end chars are not in the CodaBarReader.ALPHABET.
                switch (c) {
                    case 'T':
                        c = 'A';
                        break;
                    case 'N':
                        c = 'B';
                        break;
                    case '*':
                        c = 'C';
                        break;
                    case 'E':
                        c = 'D';
                        break;
                }
            }
            let code: int = 0;
            for (let i: int = 0; i < CodaBarReader.ALPHABET.length; i++) {
                // Found any, because I checked above.
                if (c === CodaBarReader.ALPHABET[i]) {
                    code = CodaBarReader.CHARACTER_ENCODINGS[i];
                    break;
                }
            }
            let color: boolean = true;
            let counter: int = 0;
            let bit: int = 0;
            while (bit < 7) { // A character consists of 7 digit.
                result[position] = color;
                position++;
                if (((code >> (6 - bit)) & 1) === 0 || counter === 1) {
                    color = !color; // Flip the color.
                    bit++;
                    counter = 0;
                }
                else {
                    counter++;
                }
            }
            if (index < contents.length - 1) {
                result[position] = false;
                position++;
            }
        }
        return result;
    }
    public hasNumber(str: string) {
        for (let i: int = 0; i < str.length; i++) {
            let asc = str.charCodeAt(i);
            if (asc >= 48 && asc <= 57) {
                return true;
            }
        }
        return false;
    }
}
