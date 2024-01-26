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
import UPCEReader from './UPCEReader';
import OneDimensionalCodeWriter from './OneDimensionalCodeWriter';
import BarcodeFormat from '../BarcodeFormat';
import EncodeHintType from '../EncodeHintType';
import IllegalArgumentException from '../IllegalArgumentException';
import UPCLAndGPatterns from './UPCLANDGPATTERNS';
export default class UPCEWriter extends UPCEANWriter {
    private static CODE_WIDTH: number = 3 + // start guard
        (7 * 6) + // bars
        6; // end guard
    protected getSupportedWriteFormats(): Collection<BarcodeFormat> {
        return Collections.singletonList(BarcodeFormat.UPC_E);
    }
    encodeCode(contents: string, hints: Map<EncodeHintType, any>): boolean[] {
        let length: int = contents.length;
        switch (length) {
            case 7:
                // No check digit present, calculate it and add it
                let check: int;
                try {
                    check = UPCEANReader.getStandardUPCEANChecksum(UPCEReader.convertUPCEtoUPCA(contents));
                }
                catch (fe) {
                    throw new IllegalArgumentException(fe);
                }
                contents += check;
                break;
            case 8:
                try {
                    if (!UPCEANReader.checkStandardUPCEANChecksum(UPCEReader.convertUPCEtoUPCA(contents))) {
                        throw new IllegalArgumentException('Contents do not pass checksum');
                    }
                }
                catch (ignored) {
                    throw new IllegalArgumentException('Illegal contents');
                }
                break;
            default:
                throw new IllegalArgumentException('Requested contents should be 7 digits long, but got ' + length);
        }
        OneDimensionalCodeWriter.checkNumeric(contents);
        let firstDigit: int = parseInt(contents.charAt(0), 10);
        if (firstDigit !== 0 && firstDigit !== 1) {
            throw new IllegalArgumentException('Number system must be 0 or 1');
        }
        let checkDigit: int = parseInt(contents.charAt(7), 10);
        let parities: int = UPCEReader.NUMSYS_AND_CHECK_DIGIT_PATTERNS[firstDigit][checkDigit];
        let result: boolean[] = new Array<boolean>(UPCEWriter.CODE_WIDTH);
        let pos: int = OneDimensionalCodeWriter.appendPattern(result, 0, UPCEANReader.START_END_PATTERN, true);
        for (let i: int = 1; i <= 6; i++) {
            let digit: int = parseInt(contents.charAt(i), 10);
            if ((parities >> (6 - i) & 1) === 1) {
                digit += 10;
            }
            pos += OneDimensionalCodeWriter.appendPattern(result, pos, UPCLAndGPatterns.L_AND_G_PATTERNS[digit], false);
        }
        OneDimensionalCodeWriter.appendPattern(result, pos, UPCEANReader.END_PATTERN, false);
        return result;
    }
}
