let __generate__Id: number = 0;
function generateId(): string {
    return "polyphonic.test_" + ++__generate__Id;
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
import { polyphonic } from 'pinyin-pro';
export default function polyphonicTest() {
    describe('polyphonic', () => {
        it('polyphonic_normal', 0, () => {
            const result = polyphonic('好好学习');
            expect(result).assertDeepEquals(['hǎo hào', 'hǎo hào', 'xué', 'xí']);
        });
        it('polyphonic_array', 0, () => {
            const result = polyphonic('好好学习', {
                type: 'array'
            });
            expect(result).assertDeepEquals([
                ['hǎo', 'hào'],
                ['hǎo', 'hào'],
                ['xué'],
                ['xí'],
            ]);
        });
        it('polyphonic_all', 0, () => {
            const result = polyphonic('好好学习', {
                type: 'all'
            });
            expect(result).assertDeepEquals([
                [
                    {
                        final: 'ǎo',
                        finalBody: 'ǎ',
                        finalHead: '',
                        finalTail: 'o',
                        first: 'h',
                        initial: 'h',
                        isZh: true,
                        num: 3,
                        origin: '好',
                        pinyin: 'hǎo',
                    },
                    {
                        final: 'ào',
                        finalBody: 'à',
                        finalHead: '',
                        finalTail: 'o',
                        first: 'h',
                        initial: 'h',
                        isZh: true,
                        num: 4,
                        origin: '好',
                        pinyin: 'hào',
                    },
                ],
                [
                    {
                        final: 'ǎo',
                        finalBody: 'ǎ',
                        finalHead: '',
                        finalTail: 'o',
                        first: 'h',
                        initial: 'h',
                        isZh: true,
                        num: 3,
                        origin: '好',
                        pinyin: 'hǎo',
                    },
                    {
                        final: 'ào',
                        finalBody: 'à',
                        finalHead: '',
                        finalTail: 'o',
                        first: 'h',
                        initial: 'h',
                        isZh: true,
                        num: 4,
                        origin: '好',
                        pinyin: 'hào',
                    },
                ],
                [
                    {
                        final: 'üé',
                        finalBody: 'é',
                        finalHead: 'ü',
                        finalTail: '',
                        first: 'x',
                        initial: 'x',
                        isZh: true,
                        num: 2,
                        origin: '学',
                        pinyin: 'xué',
                    },
                ],
                [
                    {
                        final: 'í',
                        finalBody: 'í',
                        finalHead: '',
                        finalTail: '',
                        first: 'x',
                        initial: 'x',
                        isZh: true,
                        num: 2,
                        origin: '习',
                        pinyin: 'xí',
                    },
                ],
            ]);
        });
        it('polyphonic_empty', 0, () => {
            const result = polyphonic('');
            expect(result).assertDeepEquals([]);
        });
        it('polyphonic_nonzh', 0, () => {
            const result = polyphonic('好好学习s');
            expect(result).assertDeepEquals(['hǎo hào', 'hǎo hào', 'xué', 'xí', '']);
        });
        it('polyphonic_allnonZh', 0, () => {
            const result = polyphonic('好好学习s', {
                type: 'all'
            });
            expect(result).assertDeepEquals([
                [
                    {
                        final: 'ǎo',
                        finalBody: 'ǎ',
                        finalHead: '',
                        finalTail: 'o',
                        first: 'h',
                        initial: 'h',
                        isZh: true,
                        num: 3,
                        origin: '好',
                        pinyin: 'hǎo',
                    },
                    {
                        final: 'ào',
                        finalBody: 'à',
                        finalHead: '',
                        finalTail: 'o',
                        first: 'h',
                        initial: 'h',
                        isZh: true,
                        num: 4,
                        origin: '好',
                        pinyin: 'hào',
                    },
                ],
                [
                    {
                        final: 'ǎo',
                        finalBody: 'ǎ',
                        finalHead: '',
                        finalTail: 'o',
                        first: 'h',
                        initial: 'h',
                        isZh: true,
                        num: 3,
                        origin: '好',
                        pinyin: 'hǎo',
                    },
                    {
                        final: 'ào',
                        finalBody: 'à',
                        finalHead: '',
                        finalTail: 'o',
                        first: 'h',
                        initial: 'h',
                        isZh: true,
                        num: 4,
                        origin: '好',
                        pinyin: 'hào',
                    },
                ],
                [
                    {
                        final: 'üé',
                        finalBody: 'é',
                        finalHead: 'ü',
                        finalTail: '',
                        first: 'x',
                        initial: 'x',
                        isZh: true,
                        num: 2,
                        origin: '学',
                        pinyin: 'xué',
                    },
                ],
                [
                    {
                        final: 'í',
                        finalBody: 'í',
                        finalHead: '',
                        finalTail: '',
                        first: 'x',
                        initial: 'x',
                        isZh: true,
                        num: 2,
                        origin: '习',
                        pinyin: 'xí',
                    },
                ],
                [
                    {
                        final: '',
                        finalBody: '',
                        finalHead: '',
                        finalTail: '',
                        first: '',
                        initial: '',
                        isZh: false,
                        num: 0,
                        origin: 's',
                        pinyin: '',
                    },
                ],
            ]);
        });
        it('polyphonic_num', 0, () => {
            const result = polyphonic('好好学习', {
                pattern: 'num'
            });
            expect(result).assertDeepEquals(['3 4', '3 4', '2', '2']);
        });
        it('polyphonic_toneType', 0, () => {
            const result = polyphonic('好好学习', {
                toneType: 'none'
            });
            expect(result).assertDeepEquals(['hao', 'hao', 'xue', 'xi']);
        });
        it('polyphonic_toneTypenum', 0, () => {
            const result = polyphonic('好好学习', {
                toneType: 'num'
            });
            expect(result).assertDeepEquals(['hao3 hao4', 'hao3 hao4', 'xue2', 'xi2']);
        });
    });
}
