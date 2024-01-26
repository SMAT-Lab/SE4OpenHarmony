let __generate__Id: number = 0;
function generateId(): string {
    return "match.test_" + ++__generate__Id;
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
import { match } from 'pinyin-pro';
export default function matchTest() {
    describe('match', () => {
        it('match_default', 0, () => {
            const result: any = match('欢迎使用汉语拼音', 'hy');
            expect(result).assertDeepEquals([0, 1]);
        });
        it('match_startandcontinuous', 0, () => {
            const result: any = match('欢迎使用汉语拼音', 'yingshyon', {
                precision: 'start',
                continuous: true,
            });
            expect(result).assertDeepEquals([1, 2, 3]);
        });
        it('match_multiple1', 0, () => {
            const result: any = match('会计', 'kj');
            expect(result).assertDeepEquals([0, 1]);
        });
        it('match_multiple2', 0, () => {
            const result: any = match('会计', 'huij');
            expect(result).assertDeepEquals([0, 1]);
        });
        it('match_any', 0, () => {
            const result: any = match('开会', 'kaiui', {
                precision: 'any'
            });
            expect(result).assertDeepEquals([0, 1]);
        });
        it('match_anyempty', 0, () => {
            const result: any = match('开会', '', {
                precision: 'any'
            });
            expect(result).assertDeepEquals(null);
        });
        it('match_any_continuous', 0, () => {
            const result: any = match('开个大会', 'kaiui', {
                precision: 'any',
                continuous: true,
            });
            expect(result).assertDeepEquals(null);
        });
        it('match_any_nonZh', 0, () => {
            const result: any = match('开会', 'kaiuiaaaa', {
                precision: 'any'
            });
            expect(result).assertDeepEquals(null);
        });
        it('match_any_space', 0, () => {
            const result: any = match('开      会s  啊', 'kaiuisa', {
                precision: 'any'
            });
            expect(result).assertDeepEquals([0, 7, 8, 11]);
        });
        it('match_failwithsucess', 0, () => {
            const result: any = match('开会', 'kaig');
            expect(result).assertDeepEquals(null);
        });
        it('match_fail', 0, () => {
            const result: any = match('开会', 'l');
            expect(result).assertDeepEquals(null);
        });
        it('match_uncontinuous', 0, () => {
            const result: any = match('汉语拼音', 'hanpin');
            expect(result).assertDeepEquals([0, 2]);
        });
        it('match_basic', 0, () => {
            const result: any = match('汉语拼音', 'hyupy');
            expect(result).assertDeepEquals([0, 1, 2, 3]);
        });
        it('match_firstdoubleunicode', 0, () => {
            const result: any = match('𧒽测试', 'cs');
            expect(result).assertDeepEquals([2, 3]);
        });
        it('match_start', 0, () => {
            const result: any = match('欢迎使用汉语拼音', '欢yingshy', {
                precision: 'start',
            });
            expect(result).assertDeepEquals([0, 1, 2, 3]);
        });
        it('match_first_space', 0, () => {
            const result: any = match('𧒽测 试', 'c s');
            expect(result).assertDeepEquals([2, 4]);
        });
        it('match_nonZhmatch', 0, () => {
            const result: any = match('测uuuuuuuuuu试', 'cuuuuuu');
            expect(result).assertDeepEquals([0, 1, 2, 3, 4, 5, 6]);
        });
        it('match_lastPrecisioneveryail', 0, () => {
            const result: any = match('汉语拼音', 'hanyupinyi', {
                lastPrecision: 'every'
            });
            expect(result).assertDeepEquals(null);
        });
        it('match_lastPrecisioneverysuccess', 0, () => {
            const result: any = match('汉语拼音', 'hanyupinyin', {
                lastPrecision: 'every'
            });
            expect(result).assertDeepEquals([0, 1, 2, 3]);
        });
        it('match_lastPrecisionfirstfail', 0, () => {
            const result: any = match('汉语拼音', 'hanyupinyi', {
                lastPrecision: 'first'
            });
            expect(result).assertDeepEquals(null);
        });
        it('match_lastPrecisionfirstuccess', 0, () => {
            const result: any = match('汉语拼音', 'hanyupiny', {
                lastPrecision: 'first'
            });
            expect(result).assertDeepEquals([0, 1, 2, 3]);
        });
        it('match_lastPrecisionany', 0, () => {
            const result: any = match('汉语拼音', 'hanyupini', {
                lastPrecision: 'any'
            });
            expect(result).assertDeepEquals([0, 1, 2, 3]);
        });
        it('match_insensitive', 0, () => {
            const result: any = match('汉语KK拼音', 'hanyukkpinyin');
            expect(result).assertDeepEquals([0, 1, 2, 3, 4, 5]);
            const result1: any = match('汉语KK拼音', 'hanyukkpinyin', {
                insensitive: false,
            });
            expect(result1).assertDeepEquals(null);
        });
    });
}
