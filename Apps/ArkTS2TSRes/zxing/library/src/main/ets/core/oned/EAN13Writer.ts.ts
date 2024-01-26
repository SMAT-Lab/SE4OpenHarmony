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
import UPCEANWriter from './UPCEANWriter';
import { Collection, int } from '../../customTypings';
import Collections from '../util/Collections';
import UPCEANReader from './UPCEANReader';
import OneDimensionalCodeWriter from './OneDimensionalCodeWriter';
import EAN13Reader from './EAN13Reader';
import BarcodeFormat from '../BarcodeFormat';
import EncodeHintType from '../EncodeHintType';
import IllegalArgumentException from '../IllegalArgumentException';
import UPCLAndGPatterns from './UPCLANDGPATTERNS';
export default class EAN13Writer extends UPCEANWriter {
    // public constructor() {
    //   super();
    //   UPCEANReader.L_AND_G_PATTERNS = UPCEANReader.L_PATTERNS.map(arr => Int32Array.from(arr));
    //   for (let i = 10; i < 20; i++) {
    //     let widths = UPCEANReader.L_PATTERNS[i - 10];
    //     let reversedWidths = new Int32Array(widths.length);
    //     for (let j = 0; j < widths.length; j++) {
    //       reversedWidths[j] = widths[widths.length - j - 1];
    //     }
    //     UPCEANReader.L_AND_G_PATTERNS[i] = reversedWidths;
    //   }
    // }
    private static CODE_WIDTH: number /*int*/ = 3 + // start guard
        (7 * 6) + // left bars
        5 + // middle guard
        (7 * 6) + // right bars
        3; // end guard
    protected getSupportedWriteFormats(): Collection<BarcodeFormat> {
        return Collections.singletonList(BarcodeFormat.EAN_13);
    }
    encodeCode(contents: string, hints: Map<EncodeHintType, any>): boolean[] {
        let length: int = contents.length;
        switch (length) {
            case 12:
                // No check digit present, calculate it and add it
                let check: int;
                try {
                    check = UPCEANReader.getStandardUPCEANChecksum(contents);
                }
                catch (fe) {
                    throw new IllegalArgumentException(fe);
                }
                contents += check;
                break;
            case 13:
                try {
                    if (!UPCEANReader.checkStandardUPCEANChecksum(contents)) {
                        throw new IllegalArgumentException('Contents do not pass checksum');
                    }
                }
                catch (ignored) {
                    throw new IllegalArgumentException('Illegal contents');
                }
                break;
            default:
                throw new IllegalArgumentException('Requested contents should be 12  digits long, but got ' + length);
        }
        OneDimensionalCodeWriter.checkNumeric(contents);
        let firstDigit: int = parseInt(contents.charAt(0), 10);
        let parities: int = EAN13Reader.FIRST_DIGIT_ENCODINGS[firstDigit];
        let result: boolean[] = new Array<boolean>(EAN13Writer.CODE_WIDTH);
        let pos: int = 0;
        pos += OneDimensionalCodeWriter.appendPattern(result, pos, UPCEANReader.START_END_PATTERN, true);
        // See EAN13Reader for a description of how the first digit & left bars are encoded
        for (let i: int = 1; i <= 6; i++) {
            let digit: int = parseInt(contents.charAt(i), 10);
            if ((parities >> (6 - i) & 1) === 1) {
                digit += 10;
            }
            pos += OneDimensionalCodeWriter.appendPattern(result, pos, UPCLAndGPatterns.L_AND_G_PATTERNS[digit], false);
        }
        pos += OneDimensionalCodeWriter.appendPattern(result, pos, UPCEANReader.MIDDLE_PATTERN, false);
        for (let i: int = 7; i <= 12; i++) {
            let digit: int = parseInt(contents.charAt(i), 10);
            pos += OneDimensionalCodeWriter.appendPattern(result, pos, UPCEANReader.L_PATTERNS[digit], true);
        }
        OneDimensionalCodeWriter.appendPattern(result, pos, UPCEANReader.START_END_PATTERN, true);
        return result;
    }
}
