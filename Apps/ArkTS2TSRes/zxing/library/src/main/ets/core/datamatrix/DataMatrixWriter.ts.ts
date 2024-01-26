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
// package com.google.zxing.datamatrix;
//
// import com.google.zxing.BarcodeFormat;
// import com.google.zxing.EncodeHintType;
// import com.google.zxing.Writer;
// import com.google.zxing.common.BitMatrix;
// import com.google.zxing.datamatrix.encoder.DefaultPlacement;
// import com.google.zxing.Dimension;
// import com.google.zxing.datamatrix.encoder.ErrorCorrection;
// import com.google.zxing.datamatrix.encoder.HighLevelEncoder;
// import com.google.zxing.datamatrix.encoder.SymbolInfo;
// import com.google.zxing.datamatrix.encoder.SymbolShapeHint;
// import com.google.zxing.qrcode.encoder.ByteMatrix;
// import java.util.Map;
import Writer from '../Writer';
import BarcodeFormat from '../BarcodeFormat';
import IllegalArgumentException from '../IllegalArgumentException';
import SymbolShapeHint from './encoder/SymbolShapeHint';
import Dimension from '../Dimension';
import EncodeHintType from '../EncodeHintType';
import HighLevelEncoder from './encoder/HighLevelEncoder';
import SymbolInfo from './encoder/SymbolInfo';
import { ErrorCorrection } from './encoder/ErrorCorrection';
import { DefaultPlacement } from './encoder/DefaultPlacement';
import ByteMatrix from '../qrcode/encoder/ByteMatrix';
import BitMatrix from '../common/BitMatrix';
import { int } from '../../customTypings';
import StringUtils from '../common/StringUtils';
/**
 * This object renders a Data Matrix code as a BitMatrix 2D array of greyscale values.
 *
 * @author dswitkin@google.com (Daniel Switkin)
 * @author Guillaume Le Biller Added to zxing lib.
 */
export /*public final*/ default class DataMatrixWriter implements Writer {
    // // @Override
    // public encode(contents: string, format: BarcodeFormat, width: int, height: int): BitMatrix {
    //   return encode(contents, format, width, height, null);
    // }
    // @Override
    public encode(contents: string, format: BarcodeFormat, width: int, height: int, hints: Map<EncodeHintType, any>): BitMatrix {
        if (StringUtils.isEmpty(contents)) {
            throw new IllegalArgumentException('Found empty contents');
        }
        if (format !== BarcodeFormat.DATA_MATRIX) {
            throw new IllegalArgumentException('Can only encode DATA_MATRIX, but got ' + format);
        }
        if (width < 0 || height < 0) {
            throw new IllegalArgumentException('Requested dimensions can\'t be negative: ' + width + 'x' + height);
        }
        // Try to get force shape & min / max size
        let shape: SymbolShapeHint = SymbolShapeHint.FORCE_NONE;
        let minSize: Dimension = null;
        let maxSize: Dimension = null;
        if (hints != null) {
            let requestedShape: SymbolShapeHint = /*(SymbolShapeHint) */ hints.get(EncodeHintType.DATA_MATRIX_SHAPE);
            if (requestedShape != null) {
                shape = requestedShape;
            }
            // @SuppressWarnings('deprecation')
            let requestedMinSize: Dimension = /*(Dimension)*/ hints.get(EncodeHintType.MIN_SIZE);
            if (requestedMinSize != null) {
                minSize = requestedMinSize;
            }
            // @SuppressWarnings('deprecation')
            let requestedMaxSize: Dimension = /*(Dimension) */ hints.get(EncodeHintType.MAX_SIZE);
            if (requestedMaxSize != null) {
                maxSize = requestedMaxSize;
            }
        }
        // 1. step: Data encodation
        let encoded: string = HighLevelEncoder.encodeHighLevel(contents, shape, minSize, maxSize);
        let symbolInfo: SymbolInfo = SymbolInfo.lookup(encoded.length, shape, minSize, maxSize, true);
        // 2. step: ECC generation
        let codewords: string = ErrorCorrection.encodeECC200(encoded, symbolInfo);
        // 3. step: Module placement in Matrix
        let placement: DefaultPlacement = new DefaultPlacement(codewords, symbolInfo.getSymbolDataWidth(), symbolInfo.getSymbolDataHeight());
        placement.place();
        // 4. step: low-level encoding
        return DataMatrixWriter.encodeLowLevel(placement, symbolInfo, width, height);
    }
    /**
     * Encode the given symbol info to a bit matrix.
     *
     * @param placement  The DataMatrix placement.
     * @param symbolInfo The symbol info to encode.
     * @return The bit matrix generated.
     */
    private static encodeLowLevel(placement: DefaultPlacement, symbolInfo: SymbolInfo, width: int, height: int): BitMatrix {
        let symbolWidth: int = symbolInfo.getSymbolDataWidth();
        let symbolHeight: int = symbolInfo.getSymbolDataHeight();
        let matrix: ByteMatrix = new ByteMatrix(symbolInfo.getSymbolWidth(), symbolInfo.getSymbolHeight());
        let matrixY: int = 0;
        for (let y: int = 0; y < symbolHeight; y++) {
            // Fill the top edge with alternate 0 / 1
            let matrixX: int;
            if ((y % symbolInfo.matrixHeight) === 0) {
                matrixX = 0;
                for (let x: int = 0; x < symbolInfo.getSymbolWidth(); x++) {
                    matrix.setBoolean(matrixX, matrixY, (x % 2) === 0);
                    matrixX++;
                }
                matrixY++;
            }
            matrixX = 0;
            for (let x: int = 0; x < symbolWidth; x++) {
                // Fill the right edge with full 1
                if ((x % symbolInfo.matrixWidth) === 0) {
                    matrix.setBoolean(matrixX, matrixY, true);
                    matrixX++;
                }
                matrix.setBoolean(matrixX, matrixY, placement.getBit(x, y));
                matrixX++;
                // Fill the right edge with alternate 0 / 1
                if ((x % symbolInfo.matrixWidth) === symbolInfo.matrixWidth - 1) {
                    matrix.setBoolean(matrixX, matrixY, (y % 2) === 0);
                    matrixX++;
                }
            }
            matrixY++;
            // Fill the bottom edge with full 1
            if ((y % symbolInfo.matrixHeight) === symbolInfo.matrixHeight - 1) {
                matrixX = 0;
                for (let x: int = 0; x < symbolInfo.getSymbolWidth(); x++) {
                    matrix.setBoolean(matrixX, matrixY, true);
                    matrixX++;
                }
                matrixY++;
            }
        }
        return this.convertByteMatrixToBitMatrix(matrix, width, height);
    }
    /**
     * Convert the ByteMatrix to BitMatrix.
     *
     * @param reqHeight The requested height of the image (in pixels) with the Datamatrix code
     * @param reqWidth The requested width of the image (in pixels) with the Datamatrix code
     * @param matrix The input matrix.
     * @return The output matrix.
     */
    private static convertByteMatrixToBitMatrix(matrix: ByteMatrix, reqWidth: int, reqHeight: int): BitMatrix {
        let matrixWidth: int = matrix.getWidth();
        let matrixHeight: int = matrix.getHeight();
        let outputWidth: int = Math.max(reqWidth, matrixWidth);
        let outputHeight: int = Math.max(reqHeight, matrixHeight);
        let multiple: int = Math.min(Math.floor(outputWidth / matrixWidth), Math.floor(outputHeight / matrixHeight));
        let leftPadding: int = Math.floor((outputWidth - (matrixWidth * multiple)) / 2);
        let topPadding: int = Math.floor((outputHeight - (matrixHeight * multiple)) / 2);
        let output: BitMatrix;
        // remove padding if requested width and height are too small
        if (reqHeight < matrixHeight || reqWidth < matrixWidth) {
            leftPadding = 0;
            topPadding = 0;
            output = new BitMatrix(matrixWidth, matrixHeight);
        }
        else {
            output = new BitMatrix(reqWidth, reqHeight);
        }
        output.clear();
        for (let inputY: int = 0, outputY = topPadding; inputY < matrixHeight; inputY++, outputY += multiple) {
            // Write the contents of this row of the bytematrix
            for (let inputX: int = 0, outputX = leftPadding; inputX < matrixWidth; inputX++, outputX += multiple) {
                if (matrix.get(inputX, inputY) === 1) {
                    output.setRegion(outputX, outputY, multiple, multiple);
                }
            }
        }
        return output;
    }
}
