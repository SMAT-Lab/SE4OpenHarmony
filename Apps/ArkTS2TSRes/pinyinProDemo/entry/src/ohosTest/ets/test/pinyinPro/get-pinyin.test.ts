let __generate__Id: number = 0;
function generateId(): string {
    return "get-pinyin.test_" + ++__generate__Id;
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
export default function getPinyinTest() {
    describe('getPinyin', () => {
        it('get_pinyin_double_symbol', 0, () => {
            const result = pinyin('aaaa');
            expect(result).assertEqual('a a a a');
        });
        it('get_pinyin_length_greater_than5', 0, () => {
            const result = pinyin('赵钱孙李吧你');
            expect(result).assertEqual('zhào qián sūn lǐ ba nǐ');
        });
        it('get_pinyin_dict2', 0, () => {
            const result = pinyin('阿比让');
            expect(result).assertEqual('ā bǐ ràng');
        });
    });
}
