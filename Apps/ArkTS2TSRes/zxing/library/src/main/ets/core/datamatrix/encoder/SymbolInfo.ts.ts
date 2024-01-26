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
//
// import com.google.zxing.Dimension;
import { int } from '../../../customTypings';
import Dimension from '../../Dimension';
import IllegalArgumentException from '../../IllegalArgumentException';
import IllegalStateException from '../../IllegalStateException';
import SymbolShapeHint from './SymbolShapeHint';
/**
 * Symbol info table for DataMatrix.
 *
 * @version $Id$
 */
/*public*/
export default class SymbolInfo {
    /*private*/
    rectangular: boolean;
    /*private*/
    dataCapacity: int;
    /*private*/
    errorCodewords: int;
    public matrixWidth: int;
    public matrixHeight: int;
    /*private*/
    dataRegions: int;
    /*private*/
    rsBlockData: int;
    /*private*/
    rsBlockError: int;
    static getPROD_SYMBOLS(): Array<SymbolInfo> {
        return PROD_SYMBOLS;
    }
    /**
     * Overrides the symbol info set used by this class. Used for testing purposes.
     *
     * @param override the symbol info set to use
     */
    public static overrideSymbolSet(override: SymbolInfo[]): void {
        symbols = override;
    }
    public static newSymbolInfo(rectangular: boolean, dataCapacity: int, errorCodewords: int, matrixWidth: int, matrixHeight: int, dataRegions: int) {
        return new SymbolInfo(rectangular, dataCapacity, errorCodewords, matrixWidth, matrixHeight, dataRegions, dataCapacity, errorCodewords);
    }
    constructor(rectangular: boolean, dataCapacity: int, errorCodewords: int, matrixWidth: int, matrixHeight: int, dataRegions: int, rsBlockData: int, rsBlockError: int) {
        this.rectangular = rectangular;
        this.dataCapacity = dataCapacity;
        this.errorCodewords = errorCodewords;
        this.matrixWidth = matrixWidth;
        this.matrixHeight = matrixHeight;
        this.dataRegions = dataRegions;
        this.rsBlockData = rsBlockData;
        this.rsBlockError = rsBlockError;
    }
    public static lookupOneArgs(dataCodewords: int): SymbolInfo {
        return SymbolInfo.lookupThreeArgs(dataCodewords, SymbolShapeHint.FORCE_NONE, true);
    }
    public static lookupTwoArgs(dataCodewords: int, shape: SymbolShapeHint): SymbolInfo {
        return SymbolInfo.lookupThreeArgs(dataCodewords, shape, true);
    }
    public static lookupThreeArgsWithBoolean(dataCodewords: int, allowRectangular: boolean, fail: boolean): SymbolInfo {
        let shape: SymbolShapeHint = allowRectangular
            ? SymbolShapeHint.FORCE_NONE : SymbolShapeHint.FORCE_SQUARE;
        return SymbolInfo.lookupThreeArgs(dataCodewords, shape, fail);
    }
    private static lookupThreeArgs(dataCodewords: int, shape: SymbolShapeHint, fail: boolean): SymbolInfo {
        return SymbolInfo.lookup(dataCodewords, shape, null, null, fail);
    }
    public static lookup(dataCodewords: int, shape: SymbolShapeHint, minSize: Dimension, maxSize: Dimension, fail: boolean): SymbolInfo {
        for (let symbol /*: SymbolInfo*/ of symbols) {
            if (shape === SymbolShapeHint.FORCE_SQUARE && symbol.rectangular) {
                continue;
            }
            if (shape === SymbolShapeHint.FORCE_RECTANGLE && !symbol.rectangular) {
                continue;
            }
            if (minSize != null
                && (symbol.getSymbolWidth() < minSize.getWidth()
                    || symbol.getSymbolHeight() < minSize.getHeight())) {
                continue;
            }
            if (maxSize != null
                && (symbol.getSymbolWidth() > maxSize.getWidth()
                    || symbol.getSymbolHeight() > maxSize.getHeight())) {
                continue;
            }
            if (dataCodewords <= symbol.dataCapacity) {
                return symbol;
            }
        }
        if (fail) {
            throw new IllegalArgumentException('Can\'t find a symbol arrangement that matches the message. Data codewords: '
                + dataCodewords);
        }
        return null;
    }
    private getHorizontalDataRegions(): int {
        switch (this.dataRegions) {
            case 1:
                return 1;
            case 2:
            case 4:
                return 2;
            case 16:
                return 4;
            case 36:
                return 6;
            default:
                throw new IllegalStateException('Cannot handle this number of data regions');
        }
    }
    private getVerticalDataRegions(): int {
        switch (this.dataRegions) {
            case 1:
            case 2:
                return 1;
            case 4:
                return 2;
            case 16:
                return 4;
            case 36:
                return 6;
            default:
                throw new IllegalStateException('Cannot handle this number of data regions');
        }
    }
    public getSymbolDataWidth(): int {
        return this.getHorizontalDataRegions() * this.matrixWidth;
    }
    public getSymbolDataHeight(): int {
        return this.getVerticalDataRegions() * this.matrixHeight;
    }
    public getSymbolWidth(): int {
        return this.getSymbolDataWidth() + (this.getHorizontalDataRegions() * 2);
    }
    public getSymbolHeight(): int {
        return this.getSymbolDataHeight() + (this.getVerticalDataRegions() * 2);
    }
    public getCodewordCount(): int {
        return this.dataCapacity + this.errorCodewords;
    }
    public getInterleavedBlockCount(): int {
        return this.dataCapacity / this.rsBlockData;
    }
    public getDataCapacity(): int {
        return this.dataCapacity;
    }
    public getErrorCodewords(): int {
        return this.errorCodewords;
    }
    public getDataLengthForInterleavedBlock(index: int): int {
        return this.rsBlockData;
    }
    public getErrorLengthForInterleavedBlock(index: int): int {
        return this.rsBlockError;
    }
    // @Override
    public toString(): string {
        return (this.rectangular ? 'Rectangular Symbol:' : 'Square Symbol:') +
            ' data region ' + this.matrixWidth + 'x' + this.matrixHeight +
            ', symbol size ' + this.getSymbolWidth() + 'x' + this.getSymbolHeight() +
            ', symbol data size ' + this.getSymbolDataWidth() + 'x' + this.getSymbolDataHeight() +
            ', codewords ' + this.dataCapacity + '+' + this.errorCodewords;
    }
}
class DataMatrixSymbolInfo144 extends SymbolInfo {
    constructor() {
        super(false, 1558, 620, 22, 22, 36, -1, 62);
    }
    // @Override
    public getInterleavedBlockCount(): int {
        return 10;
    }
    // @Override
    public getDataLengthForInterleavedBlock(index: int): int {
        return (index <= 8) ? 156 : 155;
    }
}
// @ts-ignore
// @ts-ignore
let PROD_SYMBOLS: Array<SymbolInfo> = Array.from([
    SymbolInfo.newSymbolInfo(false, 3, 5, 8, 8, 1),
    SymbolInfo.newSymbolInfo(false, 5, 7, 10, 10, 1),
    /*rect*/ SymbolInfo.newSymbolInfo(true, 5, 7, 16, 6, 1),
    SymbolInfo.newSymbolInfo(false, 8, 10, 12, 12, 1),
    /*rect*/ SymbolInfo.newSymbolInfo(true, 10, 11, 14, 6, 2),
    SymbolInfo.newSymbolInfo(false, 12, 12, 14, 14, 1),
    /*rect*/ SymbolInfo.newSymbolInfo(true, 16, 14, 24, 10, 1),
    SymbolInfo.newSymbolInfo(false, 18, 14, 16, 16, 1),
    SymbolInfo.newSymbolInfo(false, 22, 18, 18, 18, 1),
    /*rect*/ SymbolInfo.newSymbolInfo(true, 22, 18, 16, 10, 2),
    SymbolInfo.newSymbolInfo(false, 30, 20, 20, 20, 1),
    /*rect*/ SymbolInfo.newSymbolInfo(true, 32, 24, 16, 14, 2),
    SymbolInfo.newSymbolInfo(false, 36, 24, 22, 22, 1),
    SymbolInfo.newSymbolInfo(false, 44, 28, 24, 24, 1),
    /*rect*/ SymbolInfo.newSymbolInfo(true, 49, 28, 22, 14, 2),
    SymbolInfo.newSymbolInfo(false, 62, 36, 14, 14, 4),
    SymbolInfo.newSymbolInfo(false, 86, 42, 16, 16, 4),
    SymbolInfo.newSymbolInfo(false, 114, 48, 18, 18, 4),
    SymbolInfo.newSymbolInfo(false, 144, 56, 20, 20, 4),
    SymbolInfo.newSymbolInfo(false, 174, 68, 22, 22, 4),
    new SymbolInfo(false, 204, 84, 24, 24, 4, 102, 42),
    new SymbolInfo(false, 280, 112, 14, 14, 16, 140, 56),
    new SymbolInfo(false, 368, 144, 16, 16, 16, 92, 36),
    new SymbolInfo(false, 456, 192, 18, 18, 16, 114, 48),
    new SymbolInfo(false, 576, 224, 20, 20, 16, 144, 56),
    new SymbolInfo(false, 696, 272, 22, 22, 16, 174, 68),
    new SymbolInfo(false, 816, 336, 24, 24, 16, 136, 56),
    new SymbolInfo(false, 1050, 408, 18, 18, 36, 175, 68),
    new SymbolInfo(false, 1304, 496, 20, 20, 36, 163, 62),
    new DataMatrixSymbolInfo144()
]);
let symbols: Array<SymbolInfo> = PROD_SYMBOLS;
