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
// package com.google.zxing.maxicode;
//
// import com.google.zxing.BarcodeFormat;
// import com.google.zxing.BinaryBitmap;
// import com.google.zxing.ChecksumException;
// import com.google.zxing.DecodeHintType;
// import com.google.zxing.FormatException;
// import com.google.zxing.NotFoundException;
// import com.google.zxing.Reader;
// import com.google.zxing.Result;
// import com.google.zxing.ResultMetadataType;
// import com.google.zxing.ResultPoint;
// import com.google.zxing.common.BitMatrix;
// import com.google.zxing.common.DecoderResult;
// import com.google.zxing.maxicode.decoder.Decoder;
//
// import java.util.Map;
/**
 * This implementation can detect and decode a MaxiCode in an image.
 */
import Reader from '../Reader';
import Decoder from './decoder/Decoder';
import { int } from '../../customTypings';
import ResultPoint from '../ResultPoint';
import DecodeHintType from '../DecodeHintType';
import BinaryBitmap from '../BinaryBitmap';
import Result from '../Result';
import BitMatrix from '../common/BitMatrix';
import DecoderResult from '../common/DecoderResult';
import BarcodeFormat from '../BarcodeFormat';
import ResultMetadataType from '../ResultMetadataType';
import NotFoundException from '../NotFoundException';
export default class MaxiCodeReader implements Reader {
    private static NO_POINTS: ResultPoint[] = new Array<ResultPoint>(0);
    private static MATRIX_WIDTH: int = 30;
    private static MATRIX_HEIGHT: int = 33;
    private decoder: Decoder = new Decoder();
    //
    //   /**
    //    * Locates and decodes a MaxiCode in an image.
    //    *
    //    * @return a String representing the content encoded by the MaxiCode
    //    * @throws NotFoundException if a MaxiCode cannot be found
    //    * @throws FormatException if a MaxiCode cannot be decoded
    //    * @throws ChecksumException if error correction fails
    //    */
    //   @Override
    //   public  decode( image:BinaryBitmap):Result{
    //   return decode(image, null);
    // }
    // @Override
    public decode(image: BinaryBitmap, hints: Map<DecodeHintType, any>): Result {
        // Note that MaxiCode reader effectively always assumes PURE_BARCODE mode
        // and can't detect it in an image
        let bits: BitMatrix = MaxiCodeReader.extractPureBits(image.getBlackMatrix());
        let decoderResult: DecoderResult = this.decoder.decode(bits, hints);
        let result: Result = new Result(decoderResult.getText(), decoderResult.getRawBytes(), decoderResult.getRawBytes().length, MaxiCodeReader.NO_POINTS, BarcodeFormat.MAXICODE);
        let ecLevel: string = decoderResult.getECLevel();
        if (ecLevel != null) {
            result.putMetadata(ResultMetadataType.ERROR_CORRECTION_LEVEL, ecLevel);
        }
        return result;
    }
    // @Override
    public reset(): void {
        // do nothing
    }
    /**
     * This method detects a code in a "pure" image -- that is, pure monochrome image
     * which contains only an unrotated, unskewed, image of a code, with some white border
     * around it. This is a specialized method that works exceptionally fast in this special
     * case.
     */
    private static extractPureBits(image: BitMatrix): BitMatrix {
        let enclosingRectangle: Int32Array = image.getEnclosingRectangle();
        if (enclosingRectangle == null) {
            throw NotFoundException.getNotFoundInstance();
        }
        let left: int = enclosingRectangle[0];
        let top: int = enclosingRectangle[1];
        let width: int = enclosingRectangle[2];
        let height: int = enclosingRectangle[3];
        // Now just read off the bits
        let bits: BitMatrix = new BitMatrix(MaxiCodeReader.MATRIX_WIDTH, MaxiCodeReader.MATRIX_HEIGHT);
        for (let y: int = 0; y < MaxiCodeReader.MATRIX_HEIGHT; y++) {
            let iy: int = Math.min(Math.floor(top + (y * height + height / 2) / MaxiCodeReader.MATRIX_HEIGHT), height - 1);
            for (let x: int = 0; x < MaxiCodeReader.MATRIX_WIDTH; x++) {
                // srowen: I don't quite understand why the formula below is necessary, but it
                // can walk off the image if left + width = the right boundary. So cap it.
                let ix: int = left + Math.min(Math.floor((x * width + width / 2 + (y & 0x01) * width / 2) / MaxiCodeReader.MATRIX_WIDTH), width - 1);
                if (image.get(ix, iy)) {
                    bits.set(x, y);
                }
            }
        }
        return bits;
    }
}
