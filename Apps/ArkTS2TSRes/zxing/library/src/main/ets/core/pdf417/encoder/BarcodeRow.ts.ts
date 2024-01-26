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
/**
 * @author Jacob Haynes
 */
export /*final*/ class BarcodeRow {
    row: Uint8Array;
    // A tacker for position in the bar
    currentLocation: int;
    /**
     * Creates a Barcode row of the width
     */
    constructor(width: int) {
        this.row = new Uint8Array(width);
        this.currentLocation = 0;
    }
    /**
     * Sets a specific location in the bar
     *
     * @param x The location in the bar
     * @param value Black if true, white if false;
     */
    set(x: int, value: byte): void {
        this.row[x] = value;
    }
    /**
     * Sets a specific location in the bar
     *
     * @param x The location in the bar
     * @param black Black if true, white if false;
     */
    private setBoolean(x: int, black: boolean): void {
        this.row[x] = black ? 1 : 0;
    }
    /**
     * @param black A boolean which is true if the bar black false if it is white
     * @param width How many spots wide the bar is.
     */
    public addBar(black: boolean, width: int): void {
        for (let ii: int = 0; ii < width; ii++) {
            this.setBoolean(this.currentLocation++, black);
        }
    }
    /**
     * This function scales the row
     *
     * @param scale How much you want the image to be scaled, must be greater than or equal to 1.
     * @return the scaled row
     */
    public getScaledRow(scale: int): Uint8Array {
        let output: Uint8Array = new Uint8Array(this.row.length * scale);
        for (let i: int = 0; i < output.length; i++) {
            output[i] = this.row[Math.floor(i / scale)];
        }
        return output;
    }
}
