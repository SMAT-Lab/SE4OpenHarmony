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
import { int } from '../../customTypings';
import Writer from '../Writer';
import EAN13Writer from './EAN13Writer';
import BarcodeFormat from '../BarcodeFormat';
import IllegalArgumentException from '../IllegalArgumentException';
import BitMatrix from '../common/BitMatrix';
import EncodeHintType from '../EncodeHintType';
export default class UPCAWriter implements Writer {
    private subWriter: EAN13Writer = new EAN13Writer();
    public encode(contents: string, format: BarcodeFormat, width: int, height: int): BitMatrix {
        return this.encodeWithHints(contents, format, width, height, null);
    }
    public encodeWithHints(contents: string, format: BarcodeFormat, width: int, height: int, hints: Map<EncodeHintType, any>): BitMatrix {
        if (format !== BarcodeFormat.UPC_A) {
            throw new IllegalArgumentException('Can only encode UPC-A, but got ' + format);
        }
        // Transform a UPC-A code into the equivalent EAN-13 code and write it that way
        return this.subWriter.encode('0' + contents, BarcodeFormat.EAN_13, width, height, hints);
    }
}
