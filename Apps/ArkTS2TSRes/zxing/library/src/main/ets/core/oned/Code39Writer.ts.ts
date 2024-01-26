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
package com.google.zxing.oned;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.common.BitMatrix;

import java.util.Collection;
import java.util.Collections;
*/
import OneDimensionalCodeWriter from './OneDimensionalCodeWriter';
import BarcodeFormat from '../BarcodeFormat';
import { Collection, int } from '../../customTypings';
import Collections from '../util/Collections';
import IllegalArgumentException from '../IllegalArgumentException';
import Code39Reader from './Code39Reader';
import StringBuilder from '../util/StringBuilder';
import StringUtils from '../common/StringUtils';
import EncodeHintType from '../EncodeHintType';
/*public final class Code39Writer extends OneDimensionalCodeWriter {

  @Override
  protected Collection<BarcodeFormat> getSupportedWriteFormats() {
    return Collections.singleton(BarcodeFormat.CODE_39);
  }
  */
/*/**
 * This object renders a CODE39 code as a {@link BitMatrix}.
 *
 * @author erik.barbara@gmail.com (Erik Barbara)
 */
export default class Code39Writer extends OneDimensionalCodeWriter {
    encodeCode(contents: string, hints: Map<EncodeHintType, any>): boolean[] {
        let length: int = contents.length;
        if (length > 80) {
            throw new IllegalArgumentException('Requested contents should be less than 80 digits long, but got ' + length);
        }
        for (let i: int = 0; i < length; i++) {
            let indexInString: int = Code39Reader.ALPHABET_STRING.indexOf(contents.charAt(i));
            if (indexInString < 0) {
                contents = this.tryToConvertToExtendedMode(contents);
                length = contents.length;
                if (length > 80) {
                    throw new IllegalArgumentException('Requested contents should be less than 80 digits long, but got ' +
                        length + ' (extended full ASCII mode)');
                }
                break;
            }
        }
        let widths: Int32Array = new Int32Array(9);
        let codeWidth: int = 24 + 1 + (13 * length);
        let result: boolean[] = new Array<boolean>(codeWidth);
        this.toIntArray(Code39Reader.ASTERISK_ENCODING, widths);
        let pos: int = Code39Writer.appendPattern(result, 0, widths, true);
        let narrowWhite: Int32Array = Int32Array.from([1]);
        pos += Code39Writer.appendPattern(result, pos, narrowWhite, false);
        // append next character to byte matrix
        for (let i: int = 0; i < length; i++) {
            let indexInString: int = Code39Reader.ALPHABET_STRING.indexOf(contents.charAt(i));
            this.toIntArray(Code39Reader.CHARACTER_ENCODINGS[indexInString], widths);
            pos += Code39Writer.appendPattern(result, pos, widths, true);
            pos += Code39Writer.appendPattern(result, pos, narrowWhite, false);
        }
        this.toIntArray(Code39Reader.ASTERISK_ENCODING, widths);
        Code39Writer.appendPattern(result, pos, widths, true);
        return result;
    }
    protected getSupportedWriteFormats(): Collection<BarcodeFormat> {
        return Collections.singletonList(BarcodeFormat.CODE_39);
    }
    private toIntArray(a: int, toReturn: Int32Array) {
        for (let i: int = 0; i < 9; i++) {
            let temp: int = a & (1 << (8 - i));
            // tslint:disable-next-line:triple-equals
            toReturn[i] = temp == 0 ? 1 : 2;
        }
    }
    private tryToConvertToExtendedMode(contents: string) {
        let length: int = contents.length;
        let extendedContent = new StringBuilder();
        for (let i: int = 0; i < length; i++) {
            // let character: string = contents.charAt(i);
            let character: number = StringUtils.getCharCode(contents.charAt(i));
            switch (character) {
                case StringUtils.getCharCode('\u0000'):
                    extendedContent.append('%U');
                    break;
                case StringUtils.getCharCode(' '):
                case StringUtils.getCharCode('-'):
                case StringUtils.getCharCode('.'):
                    extendedContent.append(character);
                    break;
                case StringUtils.getCharCode('@'):
                    extendedContent.append('%V');
                    break;
                case StringUtils.getCharCode('`'):
                    extendedContent.append('%W');
                    break;
                default:
                    if (character <= 26) {
                        extendedContent.append('$');
                        extendedContent.append(/*(char) */ StringUtils.getCharAt(StringUtils.getCharCode('A') + (character - 1)));
                    }
                    else if (StringUtils.getCharAt(character) < ' ') {
                        extendedContent.append('%');
                        extendedContent.append(/*(char) */ StringUtils.getCharAt(StringUtils.getCharCode('A') + (character - 27)));
                        // tslint:disable-next-line:triple-equals
                    }
                    else if (StringUtils.getCharAt(character) <= ',' || StringUtils.getCharAt(character) == '/' || StringUtils.getCharAt(character) == ':') {
                        extendedContent.append('/');
                        extendedContent.append(/*(char) */ StringUtils.getCharAt(StringUtils.getCharCode('A') + (character - 33)));
                    }
                    else if (StringUtils.getCharAt(character) <= '9') {
                        extendedContent.append(/*(char) */ StringUtils.getCharAt(StringUtils.getCharCode('0') + (character - 48)));
                    }
                    else if (StringUtils.getCharAt(character) <= '?') {
                        extendedContent.append('%');
                        extendedContent.append(/*(char) */ StringUtils.getCharAt(StringUtils.getCharCode('F') + (character - 59)));
                    }
                    else if (StringUtils.getCharAt(character) <= 'Z') {
                        extendedContent.append(/*(char) */ StringUtils.getCharAt(StringUtils.getCharCode('A') + (character - 65)));
                    }
                    else if (StringUtils.getCharAt(character) <= '_') {
                        extendedContent.append('%');
                        extendedContent.append(/*(char) */ StringUtils.getCharAt(StringUtils.getCharCode('K') + (character - 91)));
                    }
                    else if (StringUtils.getCharAt(character) <= 'z') {
                        extendedContent.append('+');
                        extendedContent.append(/*(char) */ StringUtils.getCharAt(StringUtils.getCharCode('A') + (character - 97)));
                    }
                    else if (character <= 127) {
                        extendedContent.append('%');
                        extendedContent.append(/*(char)*/ StringUtils.getCharAt(StringUtils.getCharCode('P') + (character - 123)));
                    }
                    else {
                        throw new IllegalArgumentException('Requested content contains a non-encodable character: \'' + contents.charAt(i) + '\'');
                    }
                    break;
            }
        }
        return extendedContent.toString();
    }
}
