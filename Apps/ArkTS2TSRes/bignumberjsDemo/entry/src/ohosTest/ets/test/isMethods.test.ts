let __generate__Id: number = 0;
function generateId(): string {
    return "isMethods.test_" + ++__generate__Id;
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
export default function isMethods() {
    describe('isMethodstest', () => {
        let t = (expected: string | BigNumber.Format | boolean | (() => BigNumber) | number | BigNumber | Function, value: string | Function | (() => BigNumber) | BigNumber.Format | boolean | number | null) => {
            new Test().areEqual(expected, value);
        };
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
        it('isMethods', 0, () => {
            let n: BigNumber;
            t(Utils.isEqualTo, Utils.eq);
            t(Utils.isGreaterThan, Utils.gt);
            t(Utils.isGreaterThanOrEqualTo, Utils.gte);
            t(Utils.isLessThan, Utils.lt);
            t(Utils.isLessThanOrEqualTo, Utils.lte);
            BigNumber.config({
                DECIMAL_PLACES: 20,
                ROUNDING_MODE: 4,
                EXPONENTIAL_AT: 1e+9,
                RANGE: 1e+9
            });
            n = new BigNumber(1);
            t(true, n.isFinite());
            t(true, n.isInteger());
            t(false, n.isNaN());
            t(false, n.isNegative());
            t(true, n.isPositive());
            t(false, n.isZero());
            t(true, n.isEqualTo(n));
            t(true, n.isEqualTo(n, 2));
            t(true, n.isEqualTo(1, 3));
            t(true, n.isEqualTo(n, 4));
            t(true, n.isEqualTo(1, 5));
            t(true, n.isEqualTo(n, 6));
            t(true, n.isEqualTo(1, 7));
            t(true, n.isEqualTo(n, 8));
            t(true, n.isEqualTo(1, 9));
            t(true, n.isEqualTo(n, 10));
            t(true, n.isEqualTo(n, 11));
            t(true, n.isEqualTo(1, 12));
            t(true, n.isEqualTo(n, 13));
            t(true, n.isEqualTo(1, 14));
            t(true, n.isEqualTo(n, 15));
            t(true, n.isEqualTo(1, 16));
            t(true, n.isEqualTo(n, 17));
            t(true, n.isEqualTo(1, 18));
            t(true, n.isEqualTo(n, 19));
            t(true, n.isEqualTo('1.0', 20));
            t(true, n.isEqualTo('1.00', 21));
            t(true, n.isEqualTo('1.000', 22));
            t(true, n.isEqualTo('1.0000', 23));
            t(true, n.isEqualTo('1.00000', 24));
            t(true, n.isEqualTo('1.000000', 25));
            t(true, n.isEqualTo(new BigNumber(1, 10), 26));
            t(true, n.isEqualTo(new BigNumber(1), 27));
            t(true, n.isEqualTo(1, 28));
            t(true, n.isEqualTo(1, 29));
            t(true, n.isEqualTo(1, 30));
            t(true, n.isEqualTo(1, 31));
            t(true, n.isEqualTo(1, 32));
            t(true, n.isEqualTo(1, 33));
            t(true, n.isEqualTo(1, 34));
            t(true, n.isEqualTo(1, 35));
            t(true, n.isEqualTo(1, 36));
            t(true, n.isGreaterThan(0.99999));
            t(false, n.isGreaterThanOrEqualTo(1.1));
            t(true, n.isLessThan(1.001));
            t(true, n.isLessThanOrEqualTo(2));
            t(true, n.toString() === n.valueOf());
            n = new BigNumber('-0.1');
            t(true, n.isFinite());
            t(false, n.isInteger());
            t(false, n.isNaN());
            t(true, n.isNegative());
            t(false, n.isPositive());
            t(false, n.isZero());
            t(false, n.isEqualTo(0.1));
            t(false, n.isGreaterThan(-0.1));
            t(true, n.isGreaterThanOrEqualTo(-1));
            t(true, n.isLessThan(-0.01));
            t(false, n.isLessThanOrEqualTo(-1));
            t(true, n.toString() === n.valueOf());
            n = new BigNumber(Number.POSITIVE_INFINITY);
            t(false, n.isFinite());
            t(false, n.isInteger());
            t(false, n.isNaN());
            t(false, n.isNegative());
            t(true, n.isPositive());
            t(false, n.isZero());
            t(true, n.eq('Infinity'));
            t(true, n.eq(1 / 0));
            t(true, n.gt('9e999'));
            t(true, n.gte(Number.POSITIVE_INFINITY));
            t(false, n.lt(Number.POSITIVE_INFINITY));
            t(true, n.lte(Number.POSITIVE_INFINITY));
            t(true, n.toString() === n.valueOf());
            n = new BigNumber('-Infinity');
            t(false, n.isFinite());
            t(false, n.isInteger());
            t(false, n.isNaN());
            t(true, n.isNegative());
            t(false, n.isPositive());
            t(false, n.isZero());
            t(false, n.isEqualTo(Number.POSITIVE_INFINITY));
            t(true, n.isEqualTo(-1 / 0));
            t(false, n.isGreaterThan(Number.NEGATIVE_INFINITY));
            t(true, n.isGreaterThanOrEqualTo('-Infinity', 8));
            t(true, n.isLessThan(0));
            t(true, n.isLessThanOrEqualTo(Number.POSITIVE_INFINITY));
            t(true, n.toString() === n.valueOf());
            n = new BigNumber('0.0000000');
            t(true, n.isFinite());
            t(true, n.isInteger());
            t(false, n.isNaN());
            t(false, n.isNegative());
            t(true, n.isPositive());
            t(true, n.isZero());
            t(true, n.eq(-0));
            t(true, n.gt(-0.000001));
            t(false, n.gte(0.1));
            t(true, n.lt(0.0001));
            t(true, n.lte(-0));
            t(true, n.toString() === n.valueOf());
            n = new BigNumber(-0);
            t(true, n.isFinite());
            t(true, n.isInteger());
            t(false, n.isNaN());
            t(true, n.isNegative());
            t(false, n.isPositive());
            t(true, n.isZero());
            t(true, n.isEqualTo('0.000'));
            t(true, n.isGreaterThan(-1));
            t(false, n.isGreaterThanOrEqualTo(0.1));
            t(false, n.isLessThan(0));
            t(false, n.isLessThan(0, 36));
            t(true, n.isLessThan(0.1));
            t(true, n.isLessThanOrEqualTo(0));
            t(true, n.valueOf() === '-0');
            t(true, n.toJSON() === '-0');
            t(true, n.toString() === '0');
            n = new BigNumber('NaN');
            t(false, n.isFinite());
            t(false, n.isInteger());
            t(true, n.isNaN());
            t(false, n.isNegative());
            t(false, n.isPositive());
            t(false, n.isZero());
            t(false, n.eq(Number.NaN));
            t(false, n.eq(Number.POSITIVE_INFINITY));
            t(false, n.gt(0));
            t(false, n.gte(0));
            t(false, n.lt(1));
            t(false, n.lte(-0));
            t(false, n.lte(-1));
            t(true, n.toString() === n.valueOf());
            n = new BigNumber('-1.234e+2');
            t(true, n.isFinite());
            t(false, n.isInteger());
            t(false, n.isNaN());
            t(true, n.isNegative());
            t(false, n.isPositive());
            t(false, n.isZero());
            t(true, n.eq(-123.4, 10));
            t(true, n.gt('-ff', 16));
            t(true, n.gte('-1.234e+3'));
            t(true, n.lt(-123.39999));
            t(true, n.lte('-123.4e+0'));
            t(true, n.toString() === n.valueOf());
            n = new BigNumber('5e-200');
            t(true, n.isFinite());
            t(false, n.isInteger());
            t(false, n.isNaN());
            t(false, n.isNegative());
            t(true, n.isPositive());
            t(false, n.isZero());
            t(true, n.isEqualTo(5e-200));
            t(true, n.isGreaterThan(5e-201));
            t(false, n.isGreaterThanOrEqualTo(1));
            t(true, n.isLessThan(6e-200));
            t(true, n.isLessThanOrEqualTo(5.1e-200));
            t(true, n.toString() === n.valueOf());
            n = new BigNumber('1');
            t(true, n.isEqualTo(n));
            t(true, n.isEqualTo(n.toString()));
            t(true, n.isEqualTo(n.toString()));
            t(true, n.isEqualTo(n.valueOf()));
            t(true, n.isEqualTo(n.toFixed()));
            t(true, n.isEqualTo(1));
            t(true, n.isEqualTo('1e+0'));
            t(false, n.isEqualTo(-1));
            t(false, n.isEqualTo(0.1));
            t(true, new BigNumber(10).isGreaterThan(10, 2));
            t(true, new BigNumber(10).isGreaterThan(10, 3));
            t(true, new BigNumber(10).isGreaterThan(10, 4));
            t(true, new BigNumber(10).isGreaterThan(10, 5));
            t(true, new BigNumber(10).isGreaterThan(10, 6));
            t(true, new BigNumber(10).isGreaterThan(10, 7));
            t(true, new BigNumber(10).isGreaterThan(10, 8));
            t(true, new BigNumber(10).isGreaterThan(10, 9));
            t(false, new BigNumber(10).isGreaterThan(10, 10));
            t(false, new BigNumber(10).isGreaterThan(10, 11));
            t(false, new BigNumber(10).isGreaterThan(10, 12));
            t(false, new BigNumber(10).isGreaterThan(10, 13));
            t(true, new BigNumber(10).isLessThan(10, 11));
            t(true, new BigNumber(10).isLessThan(10, 12));
            t(true, new BigNumber(10).isLessThan(10, 13));
            t(true, new BigNumber(10).isLessThan(10, 14));
            t(true, new BigNumber(10).isLessThan(10, 15));
            t(true, new BigNumber(10).isLessThan(10, 16));
            t(true, new BigNumber(10).isLessThan(10, 17));
            t(true, new BigNumber(10).isLessThan(10, 18));
            t(true, new BigNumber(10).isLessThan(10, 19));
            t(true, new BigNumber(10).isLessThan(10, 20));
            t(true, new BigNumber(10).isLessThan(10, 21));
            t(true, new BigNumber(10).isLessThan(10, 22));
            t(true, new BigNumber(10).isLessThan(10, 34));
            t(true, new BigNumber(10).isLessThan(10, 35));
            t(true, new BigNumber(10).isLessThan(10, 36));
            t(false, new BigNumber(Number.NaN).isLessThan(Number.NaN));
            t(false, new BigNumber(Number.POSITIVE_INFINITY).isLessThan(Number.NEGATIVE_INFINITY));
            t(false, new BigNumber(Number.POSITIVE_INFINITY).isLessThan(Number.POSITIVE_INFINITY));
            t(true, new BigNumber(Number.POSITIVE_INFINITY, 10).isLessThanOrEqualTo(Number.POSITIVE_INFINITY, 2));
            t(false, new BigNumber(Number.NaN).isGreaterThanOrEqualTo(Number.NaN));
            t(true, new BigNumber(Number.POSITIVE_INFINITY).isGreaterThanOrEqualTo(Number.POSITIVE_INFINITY));
            t(true, new BigNumber(Number.POSITIVE_INFINITY).isGreaterThanOrEqualTo(Number.NEGATIVE_INFINITY));
            t(false, new BigNumber(Number.NaN).isGreaterThanOrEqualTo(Number.NEGATIVE_INFINITY));
            t(true, new BigNumber(Number.NEGATIVE_INFINITY).isGreaterThanOrEqualTo(Number.NEGATIVE_INFINITY));
            t(false, new BigNumber(2, 10).isGreaterThan(10, 2));
            t(false, new BigNumber(10, 2).isLessThan(2, 10));
            t(true, new BigNumber(255).isLessThanOrEqualTo('ff', 16));
            t(true, new BigNumber('a', 16).isGreaterThanOrEqualTo(9, 16));
            t(false, new BigNumber(0).isLessThanOrEqualTo('NaN'));
            t(false, new BigNumber(0).isGreaterThanOrEqualTo(Number.NaN));
            t(false, new BigNumber(Number.NaN, 2).isLessThanOrEqualTo('NaN', 36));
            t(false, new BigNumber(Number.NaN, 36).isGreaterThanOrEqualTo(Number.NaN, 2));
            t(false, new BigNumber(0).isLessThanOrEqualTo(Number.NEGATIVE_INFINITY));
            t(true, new BigNumber(0).isGreaterThanOrEqualTo(Number.NEGATIVE_INFINITY));
            t(true, new BigNumber(0).isLessThanOrEqualTo('Infinity', 36));
            t(false, new BigNumber(0).isGreaterThanOrEqualTo('Infinity', 36));
            t(false, new BigNumber(10).isLessThanOrEqualTo(20, 4));
            t(true, new BigNumber(10).isLessThanOrEqualTo(20, 5));
            t(false, new BigNumber(10).isGreaterThanOrEqualTo(20, 6));
            t(false, new BigNumber(1.23001e-2).isLessThan(1.23e-2));
            t(true, new BigNumber(1.23e-2).lt(1.23001e-2));
            t(false, new BigNumber(1e-2).isLessThan(9.999999e-3));
            t(true, new BigNumber(9.999999e-3).lt(1e-2));
            t(false, new BigNumber(1.23001e+2).isLessThan(1.23e+2));
            t(true, new BigNumber(1.23e+2).lt(1.23001e+2));
            t(true, new BigNumber(9.999999e+2).isLessThan(1e+3));
            t(false, new BigNumber(1e+3).lt(9.9999999e+2));
            t(false, new BigNumber(1.23001e-2).isLessThanOrEqualTo(1.23e-2));
            t(true, new BigNumber(1.23e-2).lte(1.23001e-2));
            t(false, new BigNumber(1e-2).isLessThanOrEqualTo(9.999999e-3));
            t(true, new BigNumber(9.999999e-3).lte(1e-2));
            t(false, new BigNumber(1.23001e+2).isLessThanOrEqualTo(1.23e+2));
            t(true, new BigNumber(1.23e+2).lte(1.23001e+2));
            t(true, new BigNumber(9.999999e+2).isLessThanOrEqualTo(1e+3));
            t(false, new BigNumber(1e+3).lte(9.9999999e+2));
            t(true, new BigNumber(1.23001e-2).isGreaterThan(1.23e-2));
            t(false, new BigNumber(1.23e-2).gt(1.23001e-2));
            t(true, new BigNumber(1e-2).isGreaterThan(9.999999e-3));
            t(false, new BigNumber(9.999999e-3).gt(1e-2));
            t(true, new BigNumber(1.23001e+2).isGreaterThan(1.23e+2));
            t(false, new BigNumber(1.23e+2).gt(1.23001e+2));
            t(false, new BigNumber(9.999999e+2).isGreaterThan(1e+3));
            t(true, new BigNumber(1e+3).gt(9.9999999e+2));
            t(true, new BigNumber(1.23001e-2).isGreaterThanOrEqualTo(1.23e-2));
            t(false, new BigNumber(1.23e-2).gte(1.23001e-2));
            t(true, new BigNumber(1e-2).isGreaterThanOrEqualTo(9.999999e-3));
            t(false, new BigNumber(9.999999e-3).gte(1e-2));
            t(true, new BigNumber(1.23001e+2).isGreaterThanOrEqualTo(1.23e+2));
            t(false, new BigNumber(1.23e+2).gte(1.23001e+2));
            t(false, new BigNumber(9.999999e+2).isGreaterThanOrEqualTo(1e+3));
            t(true, new BigNumber(1e+3).gte(9.9999999e+2));
            new Test().isException(() => { Utils.bigLt(true); }, "new BigNumber(1).lt(true, null)");
            new Test().isException(() => { new BigNumber(1).gt('one'); }, "new BigNumber(1).gt('one')");
        });
    });
}
