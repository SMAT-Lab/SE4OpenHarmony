let __generate__Id: number = 0;
function generateId(): string {
    return "Age.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { describe, it, expect } from '@ohos/hypium';
import { Age } from '@ohos/metadata-extractor';
export default function AgeTest() {
    describe('AgeTest', () => {
        it('testParse', 0, () => {
            let age: Age = Age.fromPanasonicString("0031:07:15 00:00:00");
            expect(age).not().assertNull();
            expect(31).assertEqual(age.getYears());
            expect(7).assertEqual(age.getMonths());
            expect(15).assertEqual(age.getDays());
            expect(0).assertEqual(age.getHours());
            expect(0).assertEqual(age.getMinutes());
            expect(0).assertEqual(age.getSeconds());
        });
    });
}
