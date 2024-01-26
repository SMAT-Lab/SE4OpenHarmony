let __generate__Id: number = 0;
function generateId(): string {
    return "random.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { BigNumber } from './BigNumber';
import Test from './tester';
import Utils from './Utils';
export default function random() {
    describe('randomtest', () => {
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
        it('random', 0, () => {
            let dp: number = 0, i: number, msg: string | undefined, r: BigNumber = BigNumber.random();
            BigNumber.config({ CRYPTO: false });
            for (i = 0; i < 4994; i++) {
                if (i & 1) {
                    dp = Math.random() * 100 + 1 | 0;
                    BigNumber.config({ DECIMAL_PLACES: dp });
                    r = BigNumber.random();
                }
                else {
                    dp = Math.random() * 100 | 0;
                    r = BigNumber.random(dp);
                }
                //new Test().write('\n  dp: ' + dp + '  r: ' + r.toString());
                // Check that the random number r has a maximum of dp decimal places.
                let rdp = r.dp();
                if (rdp !== null && rdp > dp) {
                    msg = 'r.dp() > dp';
                    // Check 0 <= r < 1
                }
                else if (r.lt(0) || r.gte(1)) {
                    msg = 'r.lt(0) || r.gte(1)';
                    // Check that the attributes of r are formed correctly.
                }
                else if (!r.eq(new BigNumber(r)) || !r.eq(new BigNumber(r.toString()))) {
                    msg = '!r.eq( new BigNumber(r) ) || !r.eq( new BigNumber( r.toString() ) )';
                }
                new Test().isTrue(msg === undefined);
                if (msg !== undefined) {
                    new Test().write('\n  Random number r failed integrity test: ' + msg);
                    new Test().write('\n  r:    ' + r);
                    new Test().write('\n  r.c:  ' + r.c);
                    new Test().write('\n  r.e:  ' + r.e);
                    new Test().write('\n  r.s:  ' + r.s);
                    new Test().write('\n  r.dp: ' + r.dp());
                    new Test().write('\n  dp:   ' + dp);
                    msg = undefined;
                }
            }
            BigNumber.random(undefined);
            Utils.random(null);
            BigNumber.random(3);
            BigNumber.random(0);
            new Test().isException(() => { BigNumber.random(Number.POSITIVE_INFINITY); }, 'Infinity');
            new Test().isException(() => { Utils.random('-Infinity'); }, "'-Infinity'");
            new Test().isException(() => { BigNumber.random(Number.NaN); }, 'NaN');
            new Test().isException(() => { Utils.random('ugh'); }, "'ugh'");
            new Test().isException(() => { BigNumber.random(-1); }, "-1");
            new Test().isException(() => { Utils.random({}); }, "{}");
        });
    });
}
