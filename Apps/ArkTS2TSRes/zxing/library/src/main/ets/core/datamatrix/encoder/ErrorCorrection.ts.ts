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
// package com.google.zxing.datamatrix.encoder;
/**
 * Error Correction Code for ECC200.
 */
/*public*/
import { int } from '../../../customTypings';
import SymbolInfo from './SymbolInfo';
import IllegalArgumentException from '../../IllegalArgumentException';
import StringBuilder from '../../util/StringBuilder';
import StringUtils from '../../common/StringUtils';
export class ErrorCorrection {
    /**
     * Lookup table which factors to use for which number of error correction codewords.
     * See FACTORS.
     */
    private static FACTOR_SETS: Int32Array = Int32Array.from([5, 7, 10, 11, 12, 14, 18, 20, 24, 28, 36, 42, 48, 56, 62, 68]);
    /**
     * Precomputed polynomial factors for ECC 200.
     */
    private static FACTORS: Int32Array[] = [
        Int32Array.from([228, 48, 15, 111, 62]),
        Int32Array.from([23, 68, 144, 134, 240, 92, 254]),
        Int32Array.from([28, 24, 185, 166, 223, 248, 116, 255, 110, 61]),
        Int32Array.from([175, 138, 205, 12, 194, 168, 39, 245, 60, 97, 120]),
        Int32Array.from([41, 153, 158, 91, 61, 42, 142, 213, 97, 178, 100, 242]),
        Int32Array.from([156, 97, 192, 252, 95, 9, 157, 119, 138, 45, 18, 186, 83, 185]),
        Int32Array.from([83, 195, 100, 39, 188, 75, 66, 61, 241, 213, 109, 129, 94, 254, 225, 48, 90, 188]),
        Int32Array.from([15, 195, 244, 9, 233, 71, 168, 2, 188, 160, 153, 145, 253, 79, 108, 82, 27, 174, 186, 172]),
        Int32Array.from([52, 190, 88, 205, 109, 39, 176, 21, 155, 197, 251, 223, 155, 21, 5, 172,
            254, 124, 12, 181, 184, 96, 50, 193]),
        Int32Array.from([211, 231, 43, 97, 71, 96, 103, 174, 37, 151, 170, 53, 75, 34, 249, 121,
            17, 138, 110, 213, 141, 136, 120, 151, 233, 168, 93, 255]),
        Int32Array.from([245, 127, 242, 218, 130, 250, 162, 181, 102, 120, 84, 179, 220, 251, 80, 182,
            229, 18, 2, 4, 68, 33, 101, 137, 95, 119, 115, 44, 175, 184, 59, 25,
            225, 98, 81, 112]),
        Int32Array.from([77, 193, 137, 31, 19, 38, 22, 153, 247, 105, 122, 2, 245, 133, 242, 8,
            175, 95, 100, 9, 167, 105, 214, 111, 57, 121, 21, 1, 253, 57, 54, 101,
            248, 202, 69, 50, 150, 177, 226, 5, 9, 5]),
        Int32Array.from([245, 132, 172, 223, 96, 32, 117, 22, 238, 133, 238, 231, 205, 188, 237, 87,
            191, 106, 16, 147, 118, 23, 37, 90, 170, 205, 131, 88, 120, 100, 66, 138,
            186, 240, 82, 44, 176, 87, 187, 147, 160, 175, 69, 213, 92, 253, 225, 19]),
        Int32Array.from([175, 9, 223, 238, 12, 17, 220, 208, 100, 29, 175, 170, 230, 192, 215, 235,
            150, 159, 36, 223, 38, 200, 132, 54, 228, 146, 218, 234, 117, 203, 29, 232,
            144, 238, 22, 150, 201, 117, 62, 207, 164, 13, 137, 245, 127, 67, 247, 28,
            155, 43, 203, 107, 233, 53, 143, 46]),
        Int32Array.from([242, 93, 169, 50, 144, 210, 39, 118, 202, 188, 201, 189, 143, 108, 196, 37,
            185, 112, 134, 230, 245, 63, 197, 190, 250, 106, 185, 221, 175, 64, 114, 71,
            161, 44, 147, 6, 27, 218, 51, 63, 87, 10, 40, 130, 188, 17, 163, 31,
            176, 170, 4, 107, 232, 7, 94, 166, 224, 124, 86, 47, 11, 204]),
        Int32Array.from([220, 228, 173, 89, 251, 149, 159, 56, 89, 33, 147, 244, 154, 36, 73, 127,
            213, 136, 248, 180, 234, 197, 158, 177, 68, 122, 93, 213, 15, 160, 227, 236,
            66, 139, 153, 185, 202, 167, 179, 25, 220, 232, 96, 210, 231, 136, 223, 239,
            181, 241, 59, 52, 172, 25, 49, 232, 211, 189, 64, 54, 108, 153, 132, 63,
            96, 103, 82, 186])
    ];
    private static MODULO_VALUE: int = 0x12D;
    private static LOG: Int32Array;
    private static ALOG: Int32Array;
    static init() {
        // Create log and antilog table
        ErrorCorrection.LOG = new Int32Array(256);
        ErrorCorrection.ALOG = new Int32Array(255);
        let p: int = 1;
        for (let i: int = 0; i < 255; i++) {
            ErrorCorrection.ALOG[i] = p;
            ErrorCorrection.LOG[p] = i;
            p *= 2;
            if (p >= 256) {
                p ^= ErrorCorrection.MODULO_VALUE;
            }
        }
    }
    private ErrorCorrection() {
    }
    /**
     * Creates the ECC200 error correction for an encoded message.
     *
     * @param codewords  the codewords
     * @param symbolInfo information about the symbol to be encoded
     * @return the codewords with interleaved error correction.
     */
    public static encodeECC200(codewords: string, symbolInfo: SymbolInfo): string {
        if (codewords.length !== symbolInfo.getDataCapacity()) {
            throw new IllegalArgumentException('The number of codewords does not match the selected symbol');
        }
        let sb: StringBuilder = new StringBuilder( /*symbolInfo.getDataCapacity() + symbolInfo.getErrorCodewords()*/);
        sb.append(codewords);
        let blockCount: int = symbolInfo.getInterleavedBlockCount();
        if (blockCount === 1) {
            let ecc: string = ErrorCorrection.createECCBlock(codewords, symbolInfo.getErrorCodewords());
            sb.append(ecc);
        }
        else {
            // sb.setLength(sb.capacity());
            let dataSizes: Int32Array = new Int32Array(blockCount);
            let errorSizes: Int32Array = new Int32Array(blockCount);
            for (let i: int = 0; i < blockCount; i++) {
                dataSizes[i] = symbolInfo.getDataLengthForInterleavedBlock(i + 1);
                errorSizes[i] = symbolInfo.getErrorLengthForInterleavedBlock(i + 1);
            }
            for (let block: int = 0; block < blockCount; block++) {
                let temp: StringBuilder = new StringBuilder( /*dataSizes[block]*/);
                for (let d: int = block; d < symbolInfo.getDataCapacity(); d += blockCount) {
                    temp.append(codewords.charAt(d));
                }
                let ecc: String = ErrorCorrection.createECCBlock(temp.toString(), errorSizes[block]);
                let pos: int = 0;
                for (let e: int = block; e < errorSizes[block] * blockCount; e += blockCount) {
                    sb.setCharAt(symbolInfo.getDataCapacity() + e, ecc.charAt(pos++));
                }
            }
        }
        return sb.toString();
    }
    private static createECCBlock(codewords: string, numECWords: int): string {
        let table: int = -1;
        for (let i: int = 0; i < ErrorCorrection.FACTOR_SETS.length; i++) {
            if (ErrorCorrection.FACTOR_SETS[i] === numECWords) {
                table = i;
                break;
            }
        }
        if (table < 0) {
            throw new IllegalArgumentException('Illegal number of error correction codewords specified: ' + numECWords);
        }
        let poly: Int32Array = ErrorCorrection.FACTORS[table];
        let ecc: Int32Array = new Int32Array(numECWords);
        for (let i: int = 0; i < numECWords; i++) {
            ecc[i] = 0;
        }
        for (let i: int = 0; i < codewords.length; i++) {
            let m: int = ecc[numECWords - 1] ^ StringUtils.getCharCode(codewords.charAt(i));
            for (let k: int = numECWords - 1; k > 0; k--) {
                if (m !== 0 && poly[k] !== 0) {
                    ecc[k] = /*(char)*/ (ecc[k - 1] ^ ErrorCorrection.ALOG[(ErrorCorrection.LOG[m] + ErrorCorrection.LOG[poly[k]]) % 255]);
                }
                else {
                    ecc[k] = ecc[k - 1];
                }
            }
            if (m !== 0 && poly[0] !== 0) {
                ecc[0] = /*(char)*/ ErrorCorrection.ALOG[(ErrorCorrection.LOG[m] + ErrorCorrection.LOG[poly[0]]) % 255];
            }
            else {
                ecc[0] = 0;
            }
        }
        let eccReversed: Int32Array = new Int32Array(numECWords);
        for (let i: int = 0; i < numECWords; i++) {
            eccReversed[i] = ecc[numECWords - i - 1];
        }
        return StringUtils.valueOf(eccReversed);
    }
}
ErrorCorrection.init();
