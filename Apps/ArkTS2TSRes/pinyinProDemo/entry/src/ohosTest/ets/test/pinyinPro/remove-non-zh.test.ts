let __generate__Id: number = 0;
function generateId(): string {
    return "remove-non-zh.test_" + ++__generate__Id;
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
export default function removeNonZhTest() {
    describe('removeNonZh', () => {
        it('removeNonZh_mix', 0, () => {
            const result = pinyin('汉sa语2拼音', {
                removeNonZh: true
            });
            expect(result).assertEqual('hàn yǔ pīn yīn');
        });
        it('removeNonZh_none', 0, () => {
            const result = pinyin('saf21a', {
                removeNonZh: true
            });
            expect(result).assertEqual('');
        });
    });
}
