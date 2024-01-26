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
import BarcodeFormat from '../BarcodeFormat';
import EncodeHintType from '../EncodeHintType';
import IllegalArgumentException from '../IllegalArgumentException';
export default class EAN8Writer extends UPCEANWriter {
    private static CODE_WIDTH: int = 3 + // start guard
        (7 * 4) + // left bars
        5 + // middle guard
        (7 * 4) + // right bars
        3; // end guard
    protected getSupportedWriteFormats(): Collection<BarcodeFormat> {
        return Collections.singletonList(BarcodeFormat.EAN_8);
    }
    /**
     * @return a byte array of horizontal pixels (false = white, true = black)
     */
    encodeCode(contents: string, hints: Map<EncodeHintType, any>): boolean[] {
        let length: int = contents.length;
        switch (length) {
            case 7:
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
            case 8:
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
                throw new IllegalArgumentException('Requested contents should be 7  digits long, but got ' + length);
        }
        OneDimensionalCodeWriter.checkNumeric(contents);
        let result: boolean[] = new Array<boolean>(EAN8Writer.CODE_WIDTH);
        let pos: int = 0;
        pos += OneDimensionalCodeWriter.appendPattern(result, pos, UPCEANReader.START_END_PATTERN, true);
        for (let i: int = 0; i <= 3; i++) {
            let digit: int = parseInt(contents.charAt(i), 10);
            pos += OneDimensionalCodeWriter.appendPattern(result, pos, UPCEANReader.L_PATTERNS[digit], false);
        }
        pos += OneDimensionalCodeWriter.appendPattern(result, pos, UPCEANReader.MIDDLE_PATTERN, false);
        for (let i: int = 4; i <= 7; i++) {
            let digit: int = parseInt(contents.charAt(i), 10);
            pos += OneDimensionalCodeWriter.appendPattern(result, pos, UPCEANReader.L_PATTERNS[digit], true);
        }
        OneDimensionalCodeWriter.appendPattern(result, pos, UPCEANReader.START_END_PATTERN, true);
        return result;
    }
}
