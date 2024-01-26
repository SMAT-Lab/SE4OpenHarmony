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
//
// package com.google.zxing.datamatrix.encoder;
//
// import java.util.Arrays;
import Arrays from '../../util/Arrays';
import { byte, int } from '../../../customTypings';
import StringUtils from '../../common/StringUtils';
/**
 * Symbol Character Placement Program. Adapted from Annex M.1 in ISO/IEC 16022:2000(E).
 */
/*public*/
export class DefaultPlacement {
    /* private*/
    codewords: string;
    /* private*/
    numrows: int;
    /* private*/
    numcols: int;
    /* private*/
    bits: byte[];
    /**
     * Main constructor
     *
     * @param codewords the codewords to place
     * @param numcols   the number of columns
     * @param numrows   the number of rows
     */
    constructor(codewords: string, numcols: int, numrows: int) {
        this.codewords = codewords;
        this.numcols = numcols;
        this.numrows = numrows;
        this.bits = new Array<byte>(numcols * numrows);
        Arrays.fill(this.bits, /*(byte)*/ -1); // Initialize with "not set" value
    }
    getNumrows(): int {
        return this.numrows;
    }
    getNumcols(): int {
        return this.numcols;
    }
    getBits(): byte[] {
        return this.bits;
    }
    public getBit(col: int, row: int): boolean {
        return this.bits[row * this.numcols + col] === 1;
    }
    private setBit(col: int, row: int, bit: boolean): void {
        this.bits[row * this.numcols + col] = /*(byte)*/ (bit ? 1 : 0);
    }
    private noBit(col: int, row: int): boolean {
        return this.bits[row * this.numcols + col] < 0;
    }
    public place(): void {
        let pos: int = 0;
        let row: int = 4;
        let col: int = 0;
        do {
            // repeatedly first check for one of the special corner cases, then...
            if ((row === this.numrows) && (col === 0)) {
                this.corner1(pos++);
            }
            if ((row === this.numrows - 2) && (col === 0) && ((this.numcols % 4) !== 0)) {
                this.corner2(pos++);
            }
            if ((row === this.numrows - 2) && (col === 0) && (this.numcols % 8 === 4)) {
                this.corner3(pos++);
            }
            if ((row === this.numrows + 4) && (col === 2) && ((this.numcols % 8) === 0)) {
                this.corner4(pos++);
            }
            // sweep upward diagonally, inserting successive characters...
            do {
                if ((row < this.numrows) && (col >= 0) && this.noBit(col, row)) {
                    this.utah(row, col, pos++);
                }
                row -= 2;
                col += 2;
            } while (row >= 0 && (col < this.numcols));
            row++;
            col += 3;
            // and then sweep downward diagonally, inserting successive characters, ...
            do {
                if ((row >= 0) && (col < this.numcols) && this.noBit(col, row)) {
                    this.utah(row, col, pos++);
                }
                row += 2;
                col -= 2;
            } while ((row < this.numrows) && (col >= 0));
            row += 3;
            col++;
            // ...until the entire array is scanned
        } while ((row < this.numrows) || (col < this.numcols));
        // Lastly, if the lower right-hand corner is untouched, fill in fixed pattern
        if (this.noBit(this.numcols - 1, this.numrows - 1)) {
            this.setBit(this.numcols - 1, this.numrows - 1, true);
            this.setBit(this.numcols - 2, this.numrows - 2, true);
        }
    }
    private module(row: int, col: int, pos: int, bit: int): void {
        if (row < 0) {
            row += this.numrows;
            col += 4 - ((this.numrows + 4) % 8);
        }
        if (col < 0) {
            col += this.numcols;
            row += 4 - ((this.numcols + 4) % 8);
        }
        // Note the conversion:
        let v: int = StringUtils.getCharCode(this.codewords.charAt(pos));
        v &= 1 << (8 - bit);
        this.setBit(col, row, v !== 0);
    }
    /**
     * Places the 8 bits of a utah-shaped symbol character in ECC200.
     *
     * @param row the row
     * @param col the column
     * @param pos character position
     */
    private utah(row: int, col: int, pos: int): void {
        this.module(row - 2, col - 2, pos, 1);
        this.module(row - 2, col - 1, pos, 2);
        this.module(row - 1, col - 2, pos, 3);
        this.module(row - 1, col - 1, pos, 4);
        this.module(row - 1, col, pos, 5);
        this.module(row, col - 2, pos, 6);
        this.module(row, col - 1, pos, 7);
        this.module(row, col, pos, 8);
    }
    private corner1(pos: int): void {
        this.module(this.numrows - 1, 0, pos, 1);
        this.module(this.numrows - 1, 1, pos, 2);
        this.module(this.numrows - 1, 2, pos, 3);
        this.module(0, this.numcols - 2, pos, 4);
        this.module(0, this.numcols - 1, pos, 5);
        this.module(1, this.numcols - 1, pos, 6);
        this.module(2, this.numcols - 1, pos, 7);
        this.module(3, this.numcols - 1, pos, 8);
    }
    private corner2(pos: int): void {
        this.module(this.numrows - 3, 0, pos, 1);
        this.module(this.numrows - 2, 0, pos, 2);
        this.module(this.numrows - 1, 0, pos, 3);
        this.module(0, this.numcols - 4, pos, 4);
        this.module(0, this.numcols - 3, pos, 5);
        this.module(0, this.numcols - 2, pos, 6);
        this.module(0, this.numcols - 1, pos, 7);
        this.module(1, this.numcols - 1, pos, 8);
    }
    private corner3(pos: int): void {
        this.module(this.numrows - 3, 0, pos, 1);
        this.module(this.numrows - 2, 0, pos, 2);
        this.module(this.numrows - 1, 0, pos, 3);
        this.module(0, this.numcols - 2, pos, 4);
        this.module(0, this.numcols - 1, pos, 5);
        this.module(1, this.numcols - 1, pos, 6);
        this.module(2, this.numcols - 1, pos, 7);
        this.module(3, this.numcols - 1, pos, 8);
    }
    private corner4(pos: int): void {
        this.module(this.numrows - 1, 0, pos, 1);
        this.module(this.numrows - 1, this.numcols - 1, pos, 2);
        this.module(0, this.numcols - 3, pos, 3);
        this.module(0, this.numcols - 2, pos, 4);
        this.module(0, this.numcols - 1, pos, 5);
        this.module(1, this.numcols - 3, pos, 6);
        this.module(1, this.numcols - 2, pos, 7);
        this.module(1, this.numcols - 1, pos, 8);
    }
}
