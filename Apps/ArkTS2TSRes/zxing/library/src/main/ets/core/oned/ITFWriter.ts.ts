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
import BarcodeFormat from '../BarcodeFormat';
import Collections from '../util/Collections';
import IllegalArgumentException from '../IllegalArgumentException';
import EncodeHintType from '../EncodeHintType';
export default class ITFWriter extends OneDimensionalCodeWriter {
    private static START_PATTERN: Int32Array = Int32Array.from([1, 1, 1, 1]);
    private static END_PATTERN: Int32Array = Int32Array.from([3, 1, 1]);
    private static W: int = 3; // Pixel width of a 3x wide line
    private static N: int = 1; // Pixed width of a narrow line
    private static PATTERNS: int[][] = [
        [ITFWriter.N, ITFWriter.N, ITFWriter.W, ITFWriter.W, ITFWriter.N],
        [ITFWriter.W, ITFWriter.N, ITFWriter.N, ITFWriter.N, ITFWriter.W],
        [ITFWriter.N, ITFWriter.W, ITFWriter.N, ITFWriter.N, ITFWriter.W],
        [ITFWriter.W, ITFWriter.W, ITFWriter.N, ITFWriter.N, ITFWriter.N],
        [ITFWriter.N, ITFWriter.N, ITFWriter.W, ITFWriter.N, ITFWriter.W],
        [ITFWriter.W, ITFWriter.N, ITFWriter.W, ITFWriter.N, ITFWriter.N],
        [ITFWriter.N, ITFWriter.W, ITFWriter.W, ITFWriter.N, ITFWriter.N],
        [ITFWriter.N, ITFWriter.N, ITFWriter.N, ITFWriter.W, ITFWriter.W],
        [ITFWriter.W, ITFWriter.N, ITFWriter.N, ITFWriter.W, ITFWriter.N],
        [ITFWriter.N, ITFWriter.W, ITFWriter.N, ITFWriter.W, ITFWriter.N]
    ];
    protected getSupportedWriteFormats(): Collection<BarcodeFormat> {
        return Collections.singletonList(BarcodeFormat.ITF);
    }
    encodeCode(contents: string, hints: Map<EncodeHintType, any>): boolean[] {
        let length: int = contents.length;
        // tslint:disable-next-line:triple-equals
        if (length % 2 != 0) {
            throw new IllegalArgumentException('The length of the input should be even');
        }
        if (length > 80) {
            throw new IllegalArgumentException('Requested contents should be less than 80 digits long, but got ' + length);
        }
        OneDimensionalCodeWriter.checkNumeric(contents);
        let result: boolean[] = new Array<boolean>(9 + 9 * length);
        let pos: int = OneDimensionalCodeWriter.appendPattern(result, 0, ITFWriter.START_PATTERN, true);
        for (let i: int = 0; i < length; i += 2) {
            let one: int = parseInt(contents.charAt(i), 10);
            let two: int = parseInt(contents.charAt(i + 1), 10);
            let encoding: Int32Array = new Int32Array(10);
            for (let j: int = 0; j < 5; j++) {
                encoding[2 * j] = ITFWriter.PATTERNS[one][j];
                encoding[2 * j + 1] = ITFWriter.PATTERNS[two][j];
            }
            pos += OneDimensionalCodeWriter.appendPattern(result, pos, encoding, true);
        }
        OneDimensionalCodeWriter.appendPattern(result, pos, ITFWriter.END_PATTERN, true);
        return result;
    }
}
