let __generate__Id: number = 0;
function generateId(): string {
    return "html.test_" + ++__generate__Id;
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
import { html } from 'pinyin-pro';
export default function htmlTest() {
    describe('html', () => {
        it('html_', 0, () => {
            const result = html('汉语拼音');
            expect(result).assertEqual('<span class="py-result-item"><ruby><span class="py-chinese-item">汉</span><rp>(</rp><rt class="py-pinyin-item">hàn</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">语</span><rp>(</rp><rt class="py-pinyin-item">yǔ</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">拼</span><rp>(</rp><rt class="py-pinyin-item">pīn</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">音</span><rp>(</rp><rt class="py-pinyin-item">yīn</rt><rp>)</rp></ruby></span>');
        });
        it('html_1', 0, () => {
            const result = html('汉语拼音', { toneType: 'none' });
            expect(result).assertEqual('<span class="py-result-item"><ruby><span class="py-chinese-item">汉</span><rp>(</rp><rt class="py-pinyin-item">han</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">语</span><rp>(</rp><rt class="py-pinyin-item">yu</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">拼</span><rp>(</rp><rt class="py-pinyin-item">pin</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">音</span><rp>(</rp><rt class="py-pinyin-item">yin</rt><rp>)</rp></ruby></span>');
        });
        it('html_non_chinese_1', 0, () => {
            const result = html('汉语，拼音');
            expect(result).assertEqual('<span class="py-result-item"><ruby><span class="py-chinese-item">汉</span><rp>(</rp><rt class="py-pinyin-item">hàn</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">语</span><rp>(</rp><rt class="py-pinyin-item">yǔ</rt><rp>)</rp></ruby></span>，<span class="py-result-item"><ruby><span class="py-chinese-item">拼</span><rp>(</rp><rt class="py-pinyin-item">pīn</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">音</span><rp>(</rp><rt class="py-pinyin-item">yīn</rt><rp>)</rp></ruby></span>');
        });
        it('html_wrapnonchinese_', 0, () => {
            const result = html('汉语，拼音', { wrapNonChinese: true });
            expect(result).assertEqual(`<span class="py-result-item"><ruby><span class="py-chinese-item">汉</span><rp>(</rp><rt class="py-pinyin-item">hàn</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">语</span><rp>(</rp><rt class="py-pinyin-item">yǔ</rt><rp>)</rp></ruby></span><span class="py-non-chinese-item">，</span><span class="py-result-item"><ruby><span class="py-chinese-item">拼</span><rp>(</rp><rt class="py-pinyin-item">pīn</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">音</span><rp>(</rp><rt class="py-pinyin-item">yīn</rt><rp>)</rp></ruby></span>`);
        });
        it('html_wrapnonchinese_1', 0, () => {
            const result = html('汉语，拼音', {
                wrapNonChinese: true,
            });
            expect(result).assertEqual(`<span class="py-result-item"><ruby><span class="py-chinese-item">汉</span><rp>(</rp><rt class="py-pinyin-item">hàn</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">语</span><rp>(</rp><rt class="py-pinyin-item">yǔ</rt><rp>)</rp></ruby></span><span class="py-non-chinese-item">，</span><span class="py-result-item"><ruby><span class="py-chinese-item">拼</span><rp>(</rp><rt class="py-pinyin-item">pīn</rt><rp>)</rp></ruby></span><span class="py-result-item"><ruby><span class="py-chinese-item">音</span><rp>(</rp><rt class="py-pinyin-item">yīn</rt><rp>)</rp></ruby></span>`);
        });
        it('html_custom_class_', 0, () => {
            const result = html('汉语，拼音', {
                wrapNonChinese: true,
                resultClass: 'my-result',
                chineseClass: 'my-chinese',
                pinyinClass: 'my-pinyin',
                nonChineseClass: 'my-non-chinese',
            });
            expect(result).assertEqual(`<span class="my-result"><ruby><span class="my-chinese">汉</span><rp>(</rp><rt class="my-pinyin">hàn</rt><rp>)</rp></ruby></span><span class="my-result"><ruby><span class="my-chinese">语</span><rp>(</rp><rt class="my-pinyin">yǔ</rt><rp>)</rp></ruby></span><span class="my-non-chinese">，</span><span class="my-result"><ruby><span class="my-chinese">拼</span><rp>(</rp><rt class="my-pinyin">pīn</rt><rp>)</rp></ruby></span><span class="my-result"><ruby><span class="my-chinese">音</span><rp>(</rp><rt class="my-pinyin">yīn</rt><rp>)</rp></ruby></span>`);
        });
    });
}
