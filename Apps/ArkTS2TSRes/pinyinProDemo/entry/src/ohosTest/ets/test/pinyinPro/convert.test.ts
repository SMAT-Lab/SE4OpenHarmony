let __generate__Id: number = 0;
function generateId(): string {
    return "convert.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { convert } from 'pinyin-pro';
export default function convertTest() {
    describe('convert', () => {
        it('convert_default', 0, () => {
            const result = convert('pin1 yin1');
            expect(result).assertEqual('pīn yīn');
        });
        it('convert_separator', 0, () => {
            const result = convert('pin1-yin1', {
                separator: '-'
            });
            expect(result).assertEqual('pīn-yīn');
        });
        it('convert_numToSymbol', 0, () => {
            const result = convert('pin1 yin1', {
                format: 'numToSymbol'
            });
            expect(result).assertEqual('pīn yīn');
        });
        it('convert_symbolToNum', 0, () => {
            const result = convert('pīn yīn', {
                format: 'symbolToNum'
            });
            expect(result).assertEqual('pin1 yin1');
        });
        it('convert_toneNone', 0, () => {
            const result = convert('pīn yīn', {
                format: 'toneNone'
            });
            expect(result).assertEqual('pin yin');
        });
        it('convert_array', 0, () => {
            const result = convert(['pin1', 'yin1']);
            expect(result).assertDeepEquals(['pīn', 'yīn']);
        });
        it('convert_array_others', 0, () => {
            const result = convert(['pin1', 'a', 'yin1']);
            expect(result).assertDeepEquals(['pīn', 'a', 'yīn']);
        });
        it('convert_string_others', 0, () => {
            const result = convert('pin1 a   yin1');
            expect(result).assertEqual('pīn a   yīn');
        });
    });
}
