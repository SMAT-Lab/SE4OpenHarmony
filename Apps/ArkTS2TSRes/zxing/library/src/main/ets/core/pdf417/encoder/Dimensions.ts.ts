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
import { int } from '../../../customTypings';
/**
 * Data object to specify the minimum and maximum number of rows and columns for a PDF417 barcode.
 *
 * @author qwandor@google.com (Andrew Walbran)
 */
/*public final*/
export class Dimensions {
    /*private*/ minCols: int;
    /*private*/ maxCols: int;
    /*private*/ minRows: int;
    /*private*/ maxRows: int;
    public constructor(minCols: int, maxCols: int, minRows: int, maxRows: int) {
        this.minCols = minCols;
        this.maxCols = maxCols;
        this.minRows = minRows;
        this.maxRows = maxRows;
    }
    public getMinCols(): int {
        return this.minCols;
    }
    public getMaxCols(): int {
        return this.maxCols;
    }
    public getMinRows(): int {
        return this.minRows;
    }
    public getMaxRows(): int {
        return this.maxRows;
    }
}
