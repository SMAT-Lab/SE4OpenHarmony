let __generate__Id: number = 0;
function generateId(): string {
    return "multiple.test_" + ++__generate__Id;
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
export default function multipleTest() {
    describe('multiple', () => {
        it('multiple_j', 0, () => {
            const result = pinyin('汉语拼音', {
                multiple: true
            });
            expect(result).assertEqual('hàn yǔ pīn yīn');
        });
        it('multiple_', 0, () => {
            const result = pinyin('好', {
                multiple: true
            });
            expect(result).assertEqual('hǎo hào');
        });
        it('multiple_7', 0, () => {
            const result = pinyin('好', {
                multiple: true, toneType: 'none'
            });
            expect(result).assertEqual('hao');
        });
        it('multiple_9', 0, () => {
            const result = pinyin('汉语拼音', {
                multiple: true, type: 'array'
            });
            expect(result).assertDeepEquals(['hàn', 'yǔ', 'pīn', 'yīn']);
        });
        it('multiple_2', 0, () => {
            const result = pinyin('好', {
                multiple: true, type: 'array'
            });
            expect(result).assertDeepEquals(['hǎo', 'hào']);
        });
        it('multiple_5', 0, () => {
            const result = pinyin('a', {
                multiple: true, type: 'array'
            });
            expect(result).assertDeepEquals(['a']);
        });
        it('multiple_multiplesurname', 0, () => {
            const result = pinyin('能', {
                mode: 'surname', multiple: true
            });
            expect(result).assertEqual('nài');
        });
        it('multiple_base', 0, () => {
            const result = pinyin('好', {
                multiple: true
            });
            expect(result).assertEqual('hǎo hào');
        });
    });
}
