let __generate__Id: number = 0;
function generateId(): string {
    return "basic.test_" + ++__generate__Id;
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
export default function basicTest() {
    describe('basic', () => {
        it('basic_Normal_pinyin_strings', 0, () => {
            const result = pinyin('汉语拼音');
            expect(result).assertEqual('hàn yǔ pīn yīn');
        });
        it('basic_Pinyin_no_Chinese_character_strings', 0, () => {
            const result = pinyin('汉语拼音xxx.,');
            expect(result).assertEqual('hàn yǔ pīn yīn x x x . ,');
        });
        it('basic_Normal_pinyin_array', 0, () => {
            const result = pinyin('汉语拼音', {
                type: 'array'
            });
            expect(result).assertDeepEquals(['hàn', 'yǔ', 'pīn', 'yīn']);
        });
        it('basic_haohao', 0, () => {
            const result = pinyin('好好学习');
            expect(result).assertEqual('hǎo hǎo xué xí');
        });
        it('basic_Pinyin_no_Chinese_character_array', 0, () => {
            const result = pinyin('汉语拼音xxx.,', {
                type: 'array'
            });
            expect(result).assertDeepEquals([
                'hàn',
                'yǔ',
                'pīn',
                'yīn',
                'x',
                'x',
                'x',
                '.',
                ',',
            ]);
        });
        it('basic_Empty_strings', 0, () => {
            const result = pinyin('');
            expect(result).assertEqual('');
        });
        it('basic_Empty_array', 0, () => {
            const result = pinyin('', {
                type: 'array'
            });
            expect(result).assertDeepEquals([]);
        });
        it('basic_Normal_Pinyin1', 0, () => {
            const result = pinyin('哈发生你看三零四');
            expect(result).assertEqual('hā fā shēng nǐ kàn sān líng sì');
        });
        it('basic_Normal_Pinyin_array1', 0, () => {
            const result = pinyin('哈发生你看三零四', {
                type: 'array'
            });
            expect(result).assertDeepEquals([
                'hā',
                'fā',
                'shēng',
                'nǐ',
                'kàn',
                'sān',
                'líng',
                'sì',
            ]);
        });
        it('basic_test_xingbuxing', 0, () => {
            const result = pinyin('行不行');
            expect(result).assertEqual('xíng bù xíng');
        });
    });
}
