let __generate__Id: number = 0;
function generateId(): string {
    return "tone-type.test_" + ++__generate__Id;
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
export default function patternToneTypeTest() {
    describe('pattern_with_toneType', () => {
        it('tone_type_num_numstring', 0, () => {
            const result = pinyin('汉语拼音', {
                pattern: 'num', toneType: 'num'
            });
            expect(result).assertEqual('4 3 1 1');
        });
        it('tone_type_num_numarray', 0, () => {
            const result = pinyin('汉语拼音', {
                pattern: 'num',
                toneType: 'num',
                type: 'array',
            });
            expect(result).assertDeepEquals(['4', '3', '1', '1']);
        });
        it('tone_type_num_nonestring', 0, () => {
            const result = pinyin('汉语拼音', {
                pattern: 'num', toneType: 'none'
            });
            expect(result).assertEqual('4 3 1 1');
        });
        it('tone_type_num_nonearray', 0, () => {
            const result = pinyin('汉语拼音', {
                pattern: 'num',
                toneType: 'none',
                type: 'array',
            });
            expect(result).assertDeepEquals(['4', '3', '1', '1']);
        });
        it('tone_type_initial_numstring', 0, () => {
            const result = pinyin('汉语拼音', {
                pattern: 'initial', toneType: 'num'
            });
            expect(result).assertEqual('h4 y3 p1 y1');
        });
        it('tone_type_initial_numarray', 0, () => {
            const result = pinyin('汉语拼音', {
                pattern: 'initial',
                toneType: 'num',
                type: 'array',
            });
            expect(result).assertDeepEquals(['h4', 'y3', 'p1', 'y1']);
        });
        it('tone_type_final_numstring', 0, () => {
            const result = pinyin('汉语拼音', {
                pattern: 'final', toneType: 'num'
            });
            expect(result).assertEqual('an4 u3 in1 in1');
        });
        it('tone_type_final_numarray', 0, () => {
            const result = pinyin('汉语拼音', {
                pattern: 'final',
                toneType: 'num',
                type: 'array',
            });
            expect(result).assertDeepEquals(['an4', 'u3', 'in1', 'in1']);
        });
        it('tone_type_final_numdyz', 0, () => {
            const result = pinyin('好', {
                pattern: 'final',
                toneType: 'num',
                multiple: true,
            });
            expect(result).assertEqual('ao3 ao4');
        });
        it('tone_type_final_numdyzarray', 0, () => {
            const result = pinyin('好', {
                pattern: 'final',
                toneType: 'num',
                multiple: true,
                type: 'array',
            });
            expect(result).assertDeepEquals(['ao3', 'ao4']);
        });
        it('tone_type_none', 0, () => {
            const resultNone = pinyin('赵钱孙李吧', {
                toneType: 'none'
            });
            expect(resultNone).assertEqual('zhao qian sun li ba');
        });
        it('tone_type_num', 0, () => {
            const resultNum = pinyin('赵钱孙李吧', {
                toneType: 'num'
            });
            expect(resultNum).assertEqual('zhao4 qian2 sun1 li3 ba0');
        });
    });
}
