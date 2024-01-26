let __generate__Id: number = 0;
function generateId(): string {
    return "config.test_" + ++__generate__Id;
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
export default function config() {
    describe('configtest', () => {
        let MAX = 1e9;
        let t = (expected: string | BigNumber.Format | boolean | (() => BigNumber) | number | BigNumber | Function | undefined, value: string | undefined | Function | (() => BigNumber) | BigNumber.Format | boolean | number | null) => {
            new Test().areEqual(expected, value);
        };
        let tx = (fn: Function, msg: string) => {
            new Test().isException(fn, msg);
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
        it('config', 0, () => {
            t(BigNumber.config, BigNumber.set);
            let obj = BigNumber.config({
                DECIMAL_PLACES: 100,
                ROUNDING_MODE: 0,
                EXPONENTIAL_AT: 50,
                RANGE: 500
            });
            if (obj.DECIMAL_PLACES !== undefined && obj.ROUNDING_MODE !== undefined && obj.EXPONENTIAL_AT !== undefined && obj.RANGE !== undefined) {
                new Test().isTrue(obj.DECIMAL_PLACES === 100 &&
                    obj.ROUNDING_MODE === 0 &&
                    obj.EXPONENTIAL_AT[0] === -50 &&
                    obj.EXPONENTIAL_AT[1] === 50 &&
                    obj.RANGE[0] === -500 &&
                    obj.RANGE[1] === 500);
            }
            obj = BigNumber.config({
                DECIMAL_PLACES: 40,
                ROUNDING_MODE: 4,
                EXPONENTIAL_AT: 1E9,
                RANGE: 1E9
            });
            if (obj.DECIMAL_PLACES !== undefined && obj.ROUNDING_MODE !== undefined && obj.EXPONENTIAL_AT !== undefined && obj.RANGE !== undefined) {
                t('object', typeof obj);
                t(40, obj.DECIMAL_PLACES);
                t(4, obj.ROUNDING_MODE);
                t('object', typeof obj.EXPONENTIAL_AT);
                if (obj.EXPONENTIAL_AT instanceof Array) {
                    t(2, obj.EXPONENTIAL_AT.length);
                }
                t(-1e9, obj.EXPONENTIAL_AT[0]);
                t(1e9, obj.EXPONENTIAL_AT[1]);
                t('object', typeof obj.RANGE);
                if (obj.RANGE instanceof Array) {
                    t(2, obj.RANGE.length);
                }
                t(-1e9, obj.RANGE[0]);
                t(1e9, obj.RANGE[1]);
            }
            obj = BigNumber.config({ EXPONENTIAL_AT: [-7, 21], RANGE: [-324, 308] });
            // DECIMAL_PLACES
            t(0, BigNumber.config({ DECIMAL_PLACES: 0 }).DECIMAL_PLACES);
            t(1, BigNumber.config({ DECIMAL_PLACES: 1 }).DECIMAL_PLACES);
            t(20, BigNumber.config({ DECIMAL_PLACES: 20 }).DECIMAL_PLACES);
            t(300000, BigNumber.config({ DECIMAL_PLACES: 300000 }).DECIMAL_PLACES);
            t(4e+8, BigNumber.config({ DECIMAL_PLACES: 4e8 }).DECIMAL_PLACES);
            t(123456789, BigNumber.config({ DECIMAL_PLACES: 123456789 }).DECIMAL_PLACES);
            t(2000, BigNumber.config({ DECIMAL_PLACES: 2e+3 }).DECIMAL_PLACES);
            t(MAX, BigNumber.config({ DECIMAL_PLACES: MAX }).DECIMAL_PLACES);
            tx(() => { BigNumber.config({ DECIMAL_PLACES: -1 }); }, "DECIMAL_PLACES: -1");
            tx(() => { BigNumber.config({ DECIMAL_PLACES: 0.1 }); }, "DECIMAL_PLACES: 0.1");
            tx(() => { BigNumber.config({ DECIMAL_PLACES: 1.1 }); }, "DECIMAL_PLACES: 1.1");
            tx(() => { BigNumber.config({ DECIMAL_PLACES: -1.1 }); }, "DECIMAL_PLACES: -1.1");
            tx(() => { BigNumber.config({ DECIMAL_PLACES: 8.1 }); }, "DECIMAL_PLACES: 8.1");
            tx(() => { BigNumber.config({ DECIMAL_PLACES: MAX + 1 }); }, "DECIMAL_PLACES: MAX + 1");
            tx(() => { Utils.config({ DECIMAL_PLACES: [] }); }, "DECIMAL_PLACES: []");
            tx(() => { Utils.config({ DECIMAL_PLACES: {} }); }, "DECIMAL_PLACES: {}");
            tx(() => { Utils.config({ DECIMAL_PLACES: '' }); }, "DECIMAL_PLACES: ''");
            tx(() => { Utils.config({ DECIMAL_PLACES: '  ' }); }, "DECIMAL_PLACES: '  '");
            tx(() => { Utils.config({ DECIMAL_PLACES: 'hi' }); }, "DECIMAL_PLACES: 'hi'");
            tx(() => { Utils.config({ DECIMAL_PLACES: '1e+999' }); }, "DECIMAL_PLACES: '1e+999'");
            tx(() => { BigNumber.config({ DECIMAL_PLACES: Number.NaN }); }, "DECIMAL_PLACES: NaN");
            tx(() => { BigNumber.config({ DECIMAL_PLACES: Number.POSITIVE_INFINITY }); }, "DECIMAL_PLACES: Infinity");
            tx(() => { Utils.config({ DECIMAL_PLACES: null }); }, "DECIMAL_PLACES: null");
            tx(() => { BigNumber.config({ DECIMAL_PLACES: undefined }); }, "DECIMAL_PLACES: undefined");
            BigNumber.config({ DECIMAL_PLACES: 40 });
            // ROUNDING_MODE
            t(0, BigNumber.config({ ROUNDING_MODE: 0 }).ROUNDING_MODE);
            t(1, BigNumber.config({ ROUNDING_MODE: 1 }).ROUNDING_MODE);
            t(2, BigNumber.config({ ROUNDING_MODE: 2 }).ROUNDING_MODE);
            t(3, BigNumber.config({ ROUNDING_MODE: 3 }).ROUNDING_MODE);
            t(4, BigNumber.config({ ROUNDING_MODE: 4 }).ROUNDING_MODE);
            t(5, BigNumber.config({ ROUNDING_MODE: 5 }).ROUNDING_MODE);
            t(6, BigNumber.config({ ROUNDING_MODE: 6 }).ROUNDING_MODE);
            t(7, BigNumber.config({ ROUNDING_MODE: 7 }).ROUNDING_MODE);
            t(8, BigNumber.config({ ROUNDING_MODE: 8 }).ROUNDING_MODE);
            t(8, Utils.config(null).ROUNDING_MODE);
            t(8, Utils.config(undefined).ROUNDING_MODE);
            tx(() => { Utils.config(-1); }, "ROUNDING_MODE: -1");
            tx(() => { Utils.config(0.1); }, "ROUNDING_MODE: 0.1");
            tx(() => { Utils.config(1.1); }, "ROUNDING_MODE: 1.1");
            tx(() => { Utils.config(-1.1); }, "ROUNDING_MODE: -1.1");
            tx(() => { Utils.config(8.1); }, "ROUNDING_MODE: 8.1");
            tx(() => { Utils.config(9); }, "ROUNDING_MODE: 9");
            tx(() => { Utils.config(11); }, "ROUNDING_MODE: 11");
            tx(() => { Utils.config([]); }, "ROUNDING_MODE: []");
            tx(() => { Utils.config({}); }, "ROUNDING_MODE: {}");
            tx(() => { Utils.config(''); }, "ROUNDING_MODE: ''");
            tx(() => { Utils.config(' '); }, "ROUNDING_MODE: '  '");
            tx(() => { Utils.config('hi'); }, "ROUNDING_MODE: 'hi'");
            tx(() => { Utils.config(Number.NaN); }, "ROUNDING_MODE: NaN");
            tx(() => { Utils.config(Number.POSITIVE_INFINITY); }, "ROUNDING_MODE: Infinity");
            tx(() => { Utils.config(null); }, "ROUNDING_MODE: null");
            tx(() => { BigNumber.config({ ROUNDING_MODE: undefined }); }, "ROUNDING_MODE: undefined");
            // EXPONENTIAL_AT
            if (obj.EXPONENTIAL_AT !== undefined) {
                t(-7, obj.EXPONENTIAL_AT[0]);
                t(21, obj.EXPONENTIAL_AT[1]);
            }
            tx(() => { BigNumber.config({ EXPONENTIAL_AT: [0.1, 1] }); }, "EXPONENTIAL_AT: [0.1, 1]");
            tx(() => { BigNumber.config({ EXPONENTIAL_AT: [-1, -0.1] }); }, "EXPONENTIAL_AT: [-1, -0.1]");
            tx(() => { BigNumber.config({ EXPONENTIAL_AT: [1, 1] }); }, "EXPONENTIAL_AT: [1, 1]");
            tx(() => { BigNumber.config({ EXPONENTIAL_AT: [-1, -1] }); }, "EXPONENTIAL_AT: [-1, -1]");
            tx(() => { BigNumber.config({ EXPONENTIAL_AT: MAX + 1 }); }, "EXPONENTIAL_AT: MAX + 1");
            tx(() => { BigNumber.config({ EXPONENTIAL_AT: -MAX - 1 }); }, "EXPONENTIAL_AT: -MAX - 1");
            tx(() => { BigNumber.config({ EXPONENTIAL_AT: [-MAX - 1, MAX] }); }, "EXPONENTIAL_AT: [-MAX - 1, MAX]");
            tx(() => { BigNumber.config({ EXPONENTIAL_AT: [-MAX, MAX + 1] }); }, "EXPONENTIAL_AT: [-MAX, MAX + 1]");
            tx(() => { BigNumber.config({ EXPONENTIAL_AT: [MAX + 1, -MAX - 1] }); }, "EXPONENTIAL_AT: [MAX + 1, -MAX - 1]");
            tx(() => { BigNumber.config({ EXPONENTIAL_AT: [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY] }); }, "EXPONENTIAL_AT: [Infinity, -Infinity]");
            tx(() => { BigNumber.config({ EXPONENTIAL_AT: [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY] }); }, "EXPONENTIAL_AT: [Infinity, -Infinity]");
            obj = BigNumber.config({});
            if (obj.EXPONENTIAL_AT !== undefined) {
                t(-7, obj.EXPONENTIAL_AT[0]);
                t(21, obj.EXPONENTIAL_AT[1]);
            }
            let bigConfig = BigNumber.config({ EXPONENTIAL_AT: 1 });
            if (bigConfig.EXPONENTIAL_AT !== undefined) {
                t(1, bigConfig.EXPONENTIAL_AT[1]);
                t(-1, bigConfig.EXPONENTIAL_AT[0]);
            }
            obj = BigNumber.config({ EXPONENTIAL_AT: 0 });
            if (obj.EXPONENTIAL_AT !== undefined) {
                new Test().isTrue(obj.EXPONENTIAL_AT[0] === 0 && obj.EXPONENTIAL_AT[1] === 0);
            }
            obj = BigNumber.config({ EXPONENTIAL_AT: -1 });
            if (obj.EXPONENTIAL_AT !== undefined) {
                new Test().isTrue(obj.EXPONENTIAL_AT[0] === -1 && obj.EXPONENTIAL_AT[1] === 1);
            }
            // RANGE
            BigNumber.config({ EXPONENTIAL_AT: [-7, 21], RANGE: [-324, 308] });
            if (obj.RANGE !== undefined) {
                t(-324, obj.RANGE[0]);
                t(308, obj.RANGE[1]);
            }
            tx(() => { BigNumber.config({ RANGE: [-0.9, 1] }); }, "RANGE: [-0.9, 1]");
            tx(() => { BigNumber.config({ RANGE: [-1, 0.9] }); }, "RANGE: [-1, 0.9]");
            tx(() => { BigNumber.config({ RANGE: [0, 1] }); }, "RANGE: [0, 1]");
            tx(() => { BigNumber.config({ RANGE: [-1, 0] }); }, "RANGE: [-1, 0]");
            tx(() => { BigNumber.config({ RANGE: 0 }); }, "RANGE: 0");
            tx(() => { BigNumber.config({ RANGE: MAX + 1 }); }, "RANGE: MAX + 1");
            tx(() => { BigNumber.config({ RANGE: -MAX - 1 }); }, "RANGE: -MAX - 1");
            tx(() => { BigNumber.config({ RANGE: [-MAX - 1, MAX + 1] }); }, "RANGE: [-MAX - 1, MAX + 1]");
            tx(() => { BigNumber.config({ RANGE: [MAX + 1, -MAX - 1] }); }, "RANGE: [MAX + 1, -MAX - 1]");
            tx(() => { BigNumber.config({ RANGE: Number.POSITIVE_INFINITY }); }, "RANGE: Infinity");
            tx(() => { Utils.config({ RANGE: '-Infinity' }); }, "RANGE: '-Infinity'");
            tx(() => { BigNumber.config({ RANGE: [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY] }); }, "RANGE: [-Infinity, Infinity]");
            tx(() => { BigNumber.config({ RANGE: [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY] }); }, "RANGE: [Infinity, -Infinity]");
            obj = BigNumber.config({});
            if (obj.RANGE !== undefined) {
                t(-324, obj.RANGE[0]);
                t(308, obj.RANGE[1]);
            }
            let hundred = new BigNumber(100);
            t('100', hundred.toString());
            t('100', new BigNumber(hundred).toString());
            let range = BigNumber.config({ RANGE: 1 });
            if (range.RANGE !== undefined) {
                t(1, range.RANGE[1]);
                t(-1, range.RANGE[0]);
            }
            obj = BigNumber.config({ RANGE: 1 });
            if (obj.RANGE !== undefined) {
                new Test().isTrue(obj.RANGE[0] === -1 && obj.RANGE[1] === 1);
            }
            obj = BigNumber.config({ RANGE: -1 });
            if (obj.RANGE !== undefined) {
                new Test().isTrue(obj.RANGE[0] === -1 && obj.RANGE[1] === 1);
            }
            t('1', new BigNumber(1).toString());
            t('99', new BigNumber(99).toString());
            t('-99', new BigNumber(-99).toString());
            t('Infinity', new BigNumber(100).toString());
            t('-Infinity', new BigNumber(-100).toString());
            t('0.99', new BigNumber(0.99).toString());
            t('0.1', new BigNumber(0.1).toString());
            t('0', new BigNumber(0.09).toString());
            t('-0', new BigNumber(-0.09).valueOf());
            t('100', hundred.toString());
            t('Infinity', new BigNumber(hundred).toString());
            t('-Infinity', hundred.negated().toString());
            // FORMAT
            tx(() => { Utils.config({ FORMAT: '' }); }, "FORMAT: ''");
            tx(() => { Utils.config({ FORMAT: 1 }); }, "FORMAT: 1");
            let obj1: BigNumber.Format = {
                decimalSeparator: '.',
                groupSeparator: ',',
                groupSize: 3,
                secondaryGroupSize: 0,
                fractionGroupSeparator: '\xA0',
                fractionGroupSize: 0
            };
            t(obj1, BigNumber.config({ FORMAT: obj1 }).FORMAT);
            let format = BigNumber.config({}).FORMAT;
            if (format !== undefined) {
                t('.', format.decimalSeparator);
                obj1.decimalSeparator = ',';
                t(',', format.decimalSeparator);
            }
            // ALPHABET
            BigNumber.config({ ALPHABET: '0123456789abcdefghijklmnopqrstuvwxyz' });
            tx(() => { BigNumber.config({ ALPHABET: '' }); }, "ALPHABET: ''");
            tx(() => { BigNumber.config({ ALPHABET: '1' }); }, "ALPHABET: '1'");
            tx(() => { Utils.config({ ALPHABET: 2 }); }, "ALPHABET: 2");
            tx(() => { Utils.config({ ALPHABET: true }); }, "ALPHABET: true");
            tx(() => { BigNumber.config({ ALPHABET: 'aba' }); }, "ALPHABET: 'aba'");
            tx(() => { BigNumber.config({ ALPHABET: '0.' }); }, "ALPHABET: '0.'");
            tx(() => { BigNumber.config({ ALPHABET: '0-' }); }, "ALPHABET: '0-'");
            tx(() => { BigNumber.config({ ALPHABET: '0+' }); }, "ALPHABET: '0+'");
            tx(() => { BigNumber.config({ ALPHABET: '0123456789.' }); }, "ALPHABET: '0123456789.'");
            BigNumber.config({ ALPHABET: '0,' });
            t('0,', Utils.config(undefined).ALPHABET);
            BigNumber.config({ ALPHABET: 'xy' });
            t('xy', BigNumber.config({}).ALPHABET);
            BigNumber.config({ ALPHABET: '0123456789TE' });
            t('0123456789TE', BigNumber.config({}).ALPHABET);
            BigNumber.config({ ALPHABET: '9876543210' });
            t('9876543210', BigNumber.config({}).ALPHABET);
            BigNumber.config({ ALPHABET: '0123456789abcdefghijklmnopqrstuvwxyz' });
        });
    });
}
