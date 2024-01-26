let __generate__Id: number = 0;
function generateId(): string {
    return "pattern-mix-tone-type.test_" + ++__generate__Id;
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
import { pinyin } from 'pinyin-pro';
export default function toneTypeTest() {
    describe('toneType', () => {
        it('pattern_mix_tone_type_num', 0, () => {
            const result = pinyin('汉语拼音', {
                toneType: 'num'
            });
            expect(result).assertEqual('han4 yu3 pin1 yin1');
        });
        it('pattern_mix_tone_type_numray', 0, () => {
            const result = pinyin('汉语拼音', {
                toneType: 'num', type: 'array'
            });
            expect(result).assertDeepEquals(['han4', 'yu3', 'pin1', 'yin1']);
        });
        it('pattern_mix_tone_type_one', 0, () => {
            const result = pinyin('汉语拼音', {
                toneType: 'none'
            });
            expect(result).assertEqual('han yu pin yin');
        });
        it('pattern_mix_tone_type_none', 0, () => {
            const result = pinyin('阿斯蒂芬嗯', {
                pattern: 'first', toneType: 'none'
            });
            expect(result).assertEqual('a s d f n');
        });
        it('pattern_mix_tone_type_specials', 0, () => {
            expect(pinyin('嗯')).assertEqual('ǹg');
            expect(pinyin('哼')).assertEqual('hēng');
        });
        it('pattern_mix_tone_type_nonarray', 0, () => {
            const result = pinyin('汉语拼音', {
                toneType: 'none', type: 'array'
            });
            expect(result).assertDeepEquals(['han', 'yu', 'pin', 'yin']);
        });
        it('pattern_mix_tone_type_symbol', 0, () => {
            const result = pinyin('汉语拼音', {
                toneType: 'symbol'
            });
            expect(result).assertEqual('hàn yǔ pīn yīn');
        });
        it('pattern_mix_tone_type_symbolarray', 0, () => {
            const result = pinyin('汉语拼音', {
                toneType: 'symbol', type: 'array'
            });
            expect(result).assertDeepEquals(['hàn', 'yǔ', 'pīn', 'yīn']);
        });
        it('pattern_mix_tone_type_firstwitnum', 0, () => {
            const result = pinyin('山西', {
                pattern: 'first', toneType: 'num'
            });
            expect(result).assertEqual('s1 x1');
        });
    });
}
