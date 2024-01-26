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
import System from '../util/System';
import StringBuilder from '../util/StringBuilder';
import Integer from '../util/Integer';
import { float, int } from '../../customTypings';
import NotFoundException from '../NotFoundException';
import StringUtils from '../common/StringUtils';
import ResultPoint from '../ResultPoint';
import BarcodeFormat from '../BarcodeFormat';
import OneDReader from './OneDReader';
import BitArray from '../common/BitArray';
import DecodeHintType from '../DecodeHintType';
import Result from '../Result';
/**
 * <p>Decodes Codabar barcodes.</p>
 *
 * @author Bas Vijfwinkel
 * @author David Walker
 */
export default class CodaBarReader extends OneDReader {
    // These values are critical for determining how permissive the decoding
    // will be. All stripe sizes must be within the window these define, as
    // compared to the average stripe size.
    private static MAX_ACCEPTABLE: number = 2.0;
    private static PADDING: number = 1.5;
    private static ALPHABET_STRING: string = '0123456789-$:/.+ABCD';
    static ALPHABET: string = CodaBarReader.ALPHABET_STRING;
    /**
     * These represent the encodings of characters, as patterns of wide and narrow bars. The 7 least-significant bits of
     * each int correspond to the pattern of wide and narrow, with 1s representing "wide" and 0s representing narrow.
     */
    static CHARACTER_ENCODINGS: number[] = [
        0x003, 0x006, 0x009, 0x060, 0x012, 0x042, 0x021, 0x024, 0x030, 0x048,
        0x00c, 0x018, 0x045, 0x051, 0x054, 0x015, 0x01A, 0x029, 0x00B, 0x00E, // -$:/.+ABCD
    ];
    // minimal number of characters that should be present (including start and stop characters)
    // under normal circumstances this should be set to 3, but can be set higher
    // as a last-ditch attempt to reduce false positives.
    private MIN_CHARACTER_LENGTH: int = 2;
    // official start and end patterns
    private STARTEND_ENCODING: string[] = ['A', 'B', 'C', 'D'];
    // some Codabar generator allow the Codabar string to be closed by every
    // character. This will cause lots of false positives!
    // some industries use a checksum standard but this is not part of the original Codabar standard
    // for more information see : http://www.mecsw.com/specs/codabar.html
    // Keep some instance variables to avoid reallocations
    private decodeRowResult: StringBuilder;
    private counters: Int32Array;
    private counterLength: int;
    public constructor() {
        super();
        this.decodeRowResult = new StringBuilder();
        this.counters = new Int32Array(80);
        this.counterLength = 0;
    }
    public decodeRow(rowNumber: number, row: BitArray, hints?: Map<DecodeHintType, any>): Result {
        this.counters.fill(0);
        this.setCounters(row);
        let startOffset: int = this.findStartPattern();
        let nextStart: int = startOffset;
        this.decodeRowResult.setLengthToZero();
        do {
            let charOffset: int = this.toNarrowWidePattern(nextStart);
            if (charOffset === -1) {
                throw new NotFoundException();
            }
            // Hack: We store the position in the alphabet table into a
            // StringBuilder, so that we can access the decoded patterns in
            // validatePattern. We'll translate to the actual characters later.
            this.decodeRowResult.append(StringUtils.getCharAt(charOffset));
            nextStart += 8;
            // Stop as soon as we see the end character.
            if (this.decodeRowResult.length() > 1 &&
                CodaBarReader.arrayContains(this.STARTEND_ENCODING, CodaBarReader.ALPHABET[charOffset])) {
                break;
            }
        } while (nextStart < this.counterLength); // no fixed end pattern so keep on reading while data is available
        // Look for whitespace after pattern:
        let trailingWhitespace: int = this.counters[nextStart - 1];
        let lastPatternSize: int = 0;
        for (let i: int = -8; i < -1; i++) {
            lastPatternSize += this.counters[nextStart + i];
        }
        // We need to see whitespace equal to 50% of the last pattern size,
        // otherwise this is probably a false positive. The exception is if we are
        // at the end of the row. (I.e. the barcode barely fits.)
        if (nextStart < this.counterLength && trailingWhitespace < lastPatternSize / 2) {
            throw NotFoundException.getNotFoundInstance();
        }
        this.validatePattern(startOffset);
        // Translate character table offsets to actual characters.
        for (let i: int = 0; i < this.decodeRowResult.length(); i++) {
            this.decodeRowResult.setCharAt(i, CodaBarReader.ALPHABET.charAt(StringUtils.getCharCode(this.decodeRowResult.charAt(i))));
        }
        // Ensure a valid start and end character
        let startchar: string = this.decodeRowResult.charAt(0);
        if (!CodaBarReader.arrayContains(this.STARTEND_ENCODING, startchar)) {
            throw NotFoundException.getNotFoundInstance();
        }
        let endchar: string = this.decodeRowResult.charAt(this.decodeRowResult.length() - 1);
        if (!CodaBarReader.arrayContains(this.STARTEND_ENCODING, endchar)) {
            throw NotFoundException.getNotFoundInstance();
        }
        // remove stop/start characters character and check if a long enough string is contained
        if (this.decodeRowResult.length() <= this.MIN_CHARACTER_LENGTH) {
            // Almost surely a false positive ( start + stop + at least 1 character)
            throw NotFoundException.getNotFoundInstance();
        }
        if (hints == null || !hints.get(DecodeHintType.RETURN_CODABAR_START_END) === true) {
            this.decodeRowResult.deleteCharAt(this.decodeRowResult.length() - 1);
            this.decodeRowResult.deleteCharAt(0);
        }
        let runningCount: int = 0;
        for (let i: int = 0; i < startOffset; i++) {
            runningCount += this.counters[i];
        }
        let left: number = runningCount;
        for (let i: int = startOffset; i < nextStart - 1; i++) {
            runningCount += this.counters[i];
        }
        let right: number = runningCount;
        /*    return new Result(
          decodeRowResult.toString(),
          null,
          new ResultPoint[]{
          new ResultPoint(left, rowNumber),
            new ResultPoint(right, rowNumber)},
        BarcodeFormat.CODABAR);
        result.putMetadata(ResultMetadataType.SYMBOLOGY_IDENTIFIER, ']F0');
        return result;*/
        return new Result(this.decodeRowResult.toString(), null, 0, [new ResultPoint(left, rowNumber), new ResultPoint(right, rowNumber)], BarcodeFormat.CODABAR, new Date().getTime());
    }
    private validatePattern(start: int) {
        // First, sum up the total size of our four categories of stripe sizes;
        let sizes: number[] = [0, 0, 0, 0];
        let counts: number[] = [0, 0, 0, 0];
        let end: int = this.decodeRowResult.length() - 1;
        // We break out of this loop in the middle, in order to handle
        // inter-character spaces properly.
        let pos: int = start;
        for (let i: int = 0; i <= end; i++) {
            let pattern: int = CodaBarReader.CHARACTER_ENCODINGS[this.decodeRowResult.charAt(i)];
            for (let j: int = 6; j >= 0; j--) {
                // Even j = bars, while odd j = spaces. Categories 2 and 3 are for
                // long stripes, while 0 and 1 are for short stripes.
                let category: int = (j & 1) + (pattern & 1) * 2;
                sizes[category] += this.counters[pos + j];
                counts[category]++;
                pattern >>= 1;
            }
            // We ignore the inter-character space - it could be of any size.
            pos += 8;
        }
        // Calculate our allowable size thresholds using fixed-point math.
        let maxes: float[] = new Array(4);
        let mins: float[] = new Array(4);
        // Define the threshold of acceptability to be the midpoint between the
        // average small stripe and the average large stripe. No stripe lengths
        // should be on the "wrong" side of that line.
        for (let i: int = 0; i < 2; i++) {
            mins[i] = 0.0; // Accept arbitrarily small "short" stripes.
            mins[i + 2] = (sizes[i] / counts[i] + sizes[i + 2] / counts[i + 2]) / 2.0;
            maxes[i] = mins[i + 2];
            maxes[i + 2] = (sizes[i + 2] * CodaBarReader.MAX_ACCEPTABLE + CodaBarReader.PADDING) / counts[i + 2];
        }
        // Now verify that all of the stripes are within the thresholds.
        pos = start;
        for (let i: int = 0; i <= end; i++) {
            let pattern: int = CodaBarReader.CHARACTER_ENCODINGS[this.decodeRowResult.charAt(i)];
            for (let j: int = 6; j >= 0; j--) {
                // Even j = bars, while odd j = spaces. Categories 2 and 3 are for
                // long stripes, while 0 and 1 are for short stripes.
                let category: int = (j & 1) + (pattern & 1) * 2;
                let size = this.counters[pos + j];
                if (size < mins[category] || size > maxes[category]) {
                    throw NotFoundException.getNotFoundInstance();
                }
                pattern >>= 1;
            }
            pos += 8;
        }
    }
    /**
     * Records the size of all runs of white and black pixels, starting with white.
     * This is just like recordPattern, except it records all the counters, and
     * uses our builtin "counters" member for storage.
     * @param row row to count from
     */
    private setCounters(row: BitArray) {
        this.counterLength = 0;
        // Start from the first white bit.
        let i: int = row.getNextUnset(0);
        let end: int = row.getSize();
        if (i >= end) {
            throw NotFoundException.getNotFoundInstance();
        }
        let isWhite: boolean = true;
        let count: int = 0;
        while (i < end) {
            if (row.get(i) !== isWhite) {
                count++;
            }
            else {
                this.counterAppend(count);
                count = 1;
                isWhite = !isWhite;
            }
            i++;
        }
        this.counterAppend(count);
    }
    private counterAppend(e: int) {
        this.counters[this.counterLength] = e;
        this.counterLength++;
        if (this.counterLength >= this.counters.length) {
            let temp: Int32Array = new Int32Array(this.counterLength * 2);
            System.arraycopy(this.counters, 0, temp, 0, this.counterLength);
            this.counters = temp;
        }
    }
    private findStartPattern(): int {
        for (let i: int = 1; i < this.counterLength; i += 2) {
            let charOffset: int = this.toNarrowWidePattern(i);
            if (charOffset !== -1 && CodaBarReader.arrayContains(this.STARTEND_ENCODING, CodaBarReader.ALPHABET[charOffset])) {
                // Look for whitespace before start pattern, >= 50% of width of start pattern
                // We make an exception if the whitespace is the first element.
                let patternSize: int = 0;
                for (let j: int = i; j < i + 7; j++) {
                    patternSize += this.counters[j];
                }
                if (i === 1 || this.counters[i - 1] >= patternSize / 2) {
                    return i;
                }
            }
        }
        throw NotFoundException.getNotFoundInstance();
    }
    static arrayContains(array: string[], key: string): boolean {
        if (array != null) {
            for (let c of array) {
                if (c === key) {
                    return true;
                }
            }
        }
        return false;
    }
    // Assumes that counters[position] is a bar.
    private toNarrowWidePattern(position: int): int {
        let end: int = position + 7;
        if (end >= this.counterLength) {
            return -1;
        }
        let theCounters: Int32Array = this.counters;
        let maxBar: int = 0;
        let minBar: int = Integer.MAX_VALUE;
        for (let j: int = position; j < end; j += 2) {
            let currentCounter: int = theCounters[j];
            if (currentCounter < minBar) {
                minBar = currentCounter;
            }
            if (currentCounter > maxBar) {
                maxBar = currentCounter;
            }
        }
        let thresholdBar: int = (minBar + maxBar) / 2;
        let maxSpace: int = 0;
        let minSpace: int = Integer.MAX_VALUE;
        for (let j: int = position + 1; j < end; j += 2) {
            let currentCounter: int = theCounters[j];
            if (currentCounter < minSpace) {
                minSpace = currentCounter;
            }
            if (currentCounter > maxSpace) {
                maxSpace = currentCounter;
            }
        }
        let thresholdSpace: int = (minSpace + maxSpace) / 2;
        let bitmask: int = 1 << 7;
        let pattern: int = 0;
        for (let i: int = 0; i < 7; i++) {
            let threshold: int = (i & 1) === 0 ? thresholdBar : thresholdSpace;
            bitmask >>= 1;
            if (theCounters[position + i] > threshold) {
                pattern |= bitmask;
            }
        }
        for (let i: int = 0; i < CodaBarReader.CHARACTER_ENCODINGS.length; i++) {
            if (CodaBarReader.CHARACTER_ENCODINGS[i] === pattern) {
                return i;
            }
        }
        return -1;
    }
}
