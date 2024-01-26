let __generate__Id: number = 0;
function generateId(): string {
    return "percentageRegexTest.test_" + ++__generate__Id;
}
/**
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
import percentageRegex from 'percentage-regex';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
export default function percentageRegexTest() {
    describe('percentageRegexTest', () => {
        // Defines a test suite. Two parameters are supported: test suite name and test suite function.
        beforeAll(() => {
            // Presets an action, which is performed only once before all test cases of the test suite start.
            // This API supports only one parameter: preset action function.
        });
        beforeEach(() => {
            // Presets an action, which is performed before each unit test case starts.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: preset action function.
        });
        afterEach(() => {
            // Presets a clear action, which is performed after each unit test case ends.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: clear action function.
        });
        afterAll(() => {
            // Presets a clear action, which is performed after all test cases of the test suite end.
            // This API supports only one parameter: clear action function.
        });
        const shouldPass = [
            '19%',
            '10.0%',
            '1%',
            '1.0%',
            '1.00%',
            '1 %',
            '39 %',
            '1.00 %',
            '0%',
            '.5%',
            '.05%',
            '.05 %'
        ];
        const shouldFail = [
            '',
            '   ',
            'foobar',
            '10',
            '10.0',
            '10.00',
            '.5',
            '.5 ',
            '1..00%',
            '%%',
            '%',
            '.',
            ' %',
            '. 5%',
            '.%',
            '. %',
            '..5%',
            '. 5%',
            '.\t5%',
            '.5.5%',
            '12.%'
        ];
        interface exactType {
            exact: boolean;
        }
        let exactData1: exactType = { exact: true };
        let exactData2: exactType = { exact: false };
        it('exact_regex_should_match', 0, () => {
            shouldPass.forEach(fixture => {
                expect(percentageRegex(exactData1).test(fixture)).assertTrue();
            });
        });
        it('exact_regex_should_not_match', 0, () => {
            shouldFail.forEach(fixture => {
                expect(percentageRegex(exactData1).test(fixture)).assertFalse();
            });
        });
        it('non_exact_regex_should_match_all_percentages_in_a_string', 0, () => {
            expect('10%'.match(percentageRegex(exactData2))?.toString()).assertEqual(['10%'].toString());
            expect('foo 10% bar'.match(percentageRegex(exactData2))?.toString()).assertEqual(['10%'].toString());
            expect('foo 10%'.match(percentageRegex(exactData2))?.toString()).assertEqual(['10%'].toString());
            expect('.5% 10%'.match(percentageRegex(exactData2))?.toString()).assertEqual(['.5%', '10%'].toString());
            expect('foo .5% 10%'.match(percentageRegex(exactData2))?.toString()).assertEqual(['.5%', '10%'].toString());
            expect('.5% 10% bar'.match(percentageRegex(exactData2))?.toString()).assertEqual(['.5%', '10%'].toString());
            expect('0% 10% bar'.match(percentageRegex(exactData2))?.toString()).assertEqual(['0%', '10%'].toString());
        });
        it('exact_should_default_to_false', 0, () => {
            let result = 'foo 10% bar'.match(percentageRegex());
            expect(result?.toString()).assertEqual(['10%'].toString());
        });
    });
}
