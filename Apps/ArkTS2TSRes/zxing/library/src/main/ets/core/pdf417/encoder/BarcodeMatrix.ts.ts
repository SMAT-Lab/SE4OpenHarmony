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
// package com.google.zxing.pdf417.encoder;
import { int, byte } from '../../../customTypings';
import { BarcodeRow } from './BarcodeRow';
/**
 * Holds all of the information for a barcode in a format where it can be easily accessible
 *
 * @author Jacob Haynes
 */
/*public*/
export class BarcodeMatrix {
    matrix: Array<BarcodeRow>;
    currentRow: int;
    height: int;
    width: int;
    /**
     * @param height the height of the matrix (Rows)
     * @param width  the width of the matrix (Cols)
     */
    constructor(height: int, width: int) {
        this.matrix = new Array<BarcodeRow>(height);
        // Initializes the array to the correct width
        for (let i: int = 0, matrixLength = this.matrix.length; i < matrixLength; i++) {
            this.matrix[i] = new BarcodeRow((width + 4) * 17 + 1);
        }
        this.width = width * 17;
        this.height = height;
        this.currentRow = -1;
    }
    public set(x: int, y: int, value: byte): void {
        this.matrix[y].set(x, value);
    }
    public startRow(): void {
        ++this.currentRow;
    }
    public getCurrentRow(): BarcodeRow {
        return this.matrix[this.currentRow];
    }
    public getMatrix(): Array<Uint8Array> {
        return this.getScaledMatrix(1, 1);
    }
    public getScaledMatrix(xScale: int, yScale: int): Array<Uint8Array> {
        let yMax: int = this.height * yScale;
        let matrixOut: Array<Uint8Array> = new Array<Uint8Array>(yMax);
        for (let i = 0; i !== yMax; i++) {
            // init array
            matrixOut[i] = new Uint8Array(this.width * xScale);
        }
        for (let i: int = 0; i < yMax; i++) {
            matrixOut[yMax - i - 1] = this.matrix[Math.floor(i / yScale)].getScaledRow(xScale);
        }
        return matrixOut;
    }
}
