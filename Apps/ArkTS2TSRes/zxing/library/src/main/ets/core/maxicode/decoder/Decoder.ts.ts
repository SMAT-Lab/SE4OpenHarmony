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
// package com.google.zxing.maxicode.decoder;
//
// import com.google.zxing.ChecksumException;
// import com.google.zxing.DecodeHintType;
// import com.google.zxing.FormatException;
// import com.google.zxing.common.BitMatrix;
// import com.google.zxing.common.DecoderResult;
// import com.google.zxing.common.reedsolomon.GenericGF;
// import com.google.zxing.common.reedsolomon.ReedSolomonDecoder;
// import com.google.zxing.common.reedsolomon.ReedSolomonException;
//
// import java.util.Map;
import { int } from '../../../customTypings';
import ReedSolomonDecoder from '../../common/reedsolomon/ReedSolomonDecoder';
import GenericGF from '../../common/reedsolomon/GenericGF';
import BitMatrix from '../../common/BitMatrix';
import DecodeHintType from '../../DecodeHintType';
import { BitMatrixParser } from './BitMatrixParser';
import DecoderResult from '../../common/DecoderResult';
import FormatException from '../../FormatException';
import System from '../../util/System';
import { DecodedBitStreamParser } from './DecodedBitStreamParser';
import ChecksumException from '../../ChecksumException';
/**
 * <p>The main class which implements MaxiCode decoding -- as opposed to locating and extracting
 * the MaxiCode from an image.</p>
 *
 * @author Manuel Kasten
 */
export default /*final*/ class Decoder {
    private static ALL: int = 0;
    private static EVEN: int = 1;
    private static ODD: int = 2;
    private rsDecoder: ReedSolomonDecoder;
    public constructor() {
        this.rsDecoder = new ReedSolomonDecoder(GenericGF.MAXICODE_FIELD_64);
    }
    // public decode(bits: BitMatrix): DecoderResult {
    //   return decode(bits, null);
    // }
    public decode(bits: BitMatrix, hints: Map<DecodeHintType, any>): DecoderResult {
        let parser: BitMatrixParser = new BitMatrixParser(bits);
        let codewords: Int8Array = parser.readCodewords();
        this.correctErrors(codewords, 0, 10, 10, Decoder.ALL);
        let mode: int = codewords[0] & 0x0F;
        let datawords: Uint8Array;
        switch (mode) {
            case 2:
            case 3:
            case 4:
                this.correctErrors(codewords, 20, 84, 40, Decoder.EVEN);
                this.correctErrors(codewords, 20, 84, 40, Decoder.ODD);
                datawords = new Uint8Array(94);
                break;
            case 5:
                this.correctErrors(codewords, 20, 68, 56, Decoder.EVEN);
                this.correctErrors(codewords, 20, 68, 56, Decoder.ODD);
                datawords = new Uint8Array(78);
                break;
            default:
                throw FormatException.getFormatInstance();
        }
        System.arraycopy(codewords, 0, datawords, 0, 10);
        System.arraycopy(codewords, 20, datawords, 10, datawords.length - 10);
        return DecodedBitStreamParser.decode(datawords, mode);
    }
    private correctErrors(codewordBytes: Int8Array, start: int, dataCodewords: int, ecCodewords: int, mode: int): void {
        let codewords: int = dataCodewords + ecCodewords;
        // in EVEN or ODD mode only half the codewords
        let divisor: int = mode === Decoder.ALL ? 1 : 2;
        // First read into an array of ints
        let codewordsInts: Int32Array = new Int32Array(Math.trunc(codewords / divisor));
        for (let i: int = 0; i < codewords; i++) {
            if ((mode === Decoder.ALL) || (i % 2 === (mode - 1))) {
                codewordsInts[Math.trunc(i / divisor)] = codewordBytes[i + start] & 0xFF;
            }
        }
        try {
            this.rsDecoder.decode(codewordsInts, Math.trunc(ecCodewords / divisor));
        }
        catch (ignored) {
            throw ChecksumException.getChecksumInstance();
        }
        // Copy back into array of bytes -- only need to worry about the bytes that were data
        // We don't care about errors in the error-correction codewords
        for (let i: int = 0; i < dataCodewords; i++) {
            if ((mode === Decoder.ALL) || (i % 2 === (mode - 1))) {
                codewordBytes[i + start] = codewordsInts[Math.trunc(i / divisor)];
            }
        }
    }
}
