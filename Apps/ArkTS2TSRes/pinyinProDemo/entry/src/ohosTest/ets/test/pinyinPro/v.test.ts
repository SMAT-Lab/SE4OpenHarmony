let __generate__Id: number = 0;
function generateId(): string {
    return "v.test_" + ++__generate__Id;
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
export default function vTest() {
    describe('v', () => {
        it('v_no_v', 0, () => {
            const result1 = pinyin('吕布');
            expect(result1).assertEqual('lǚ bù');
        });
        it('v_no_v_toneType_none', 0, () => {
            const result2 = pinyin('吕布', {
                toneType: 'none'
            });
            expect(result2).assertEqual('lü bu');
        });
        it('v_v_toneType_none', 0, () => {
            const result3 = pinyin('吕布', {
                toneType: 'none', v: true
            });
            expect(result3).assertEqual('lv bu');
        });
        it('v_v', 0, () => {
            const result4 = pinyin('吕布', {
                v: true
            });
            expect(result4).assertEqual('lǚ bù');
        });
    });
}
