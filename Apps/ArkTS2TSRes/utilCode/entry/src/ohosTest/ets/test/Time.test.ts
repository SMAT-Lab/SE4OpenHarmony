let __generate__Id: number = 0;
function generateId(): string {
    return "Time.test_" + ++__generate__Id;
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { get12, get24 } from 'time-ampm';
import isLeapYear from 'leap-year';
export default function TimeTest() {
    describe('TimeTest', () => {
        it('get12', 0, () => {
            expect(get12(0)).assertEqual('12 am');
        });
        it('get24', 0, () => {
            expect(get24('10 pm')).assertEqual('22');
        });
        it('isLeapYear1_2016', 0, () => {
            expect(isLeapYear(2014)).assertFalse();
        });
        it('isLeapYear2_2016', 0, () => {
            expect(isLeapYear(2016)).assertTrue();
        });
        it('isLeapYear_2016_date', 0, () => {
            expect(isLeapYear(new Date(2016, 0))).assertTrue();
        });
        it('isLeapYear_err', 0, () => {
            expect(isLeapYear(111)).assertInstanceOf('Boolean');
        });
    });
}
