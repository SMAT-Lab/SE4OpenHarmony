let __generate__Id: number = 0;
function generateId(): string {
    return "toFormat.test_" + ++__generate__Id;
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
interface Format {
    decimalSeparator: string;
    groupSeparator: string;
    groupSize: number;
    secondaryGroupSize: number | null;
    fractionGroupSeparator: string;
    fractionGroupSize: number;
}
export default function toFormat() {
    describe('toFormattest', () => {
        let t = (expected: string | boolean | (() => BigNumber) | number | BigNumber | Function, value: BigNumber.Value, dp?: number) => {
            new Test().areEqual(expected, new BigNumber(value).toFormat(dp));
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
        it('toFormat', 0, () => {
            let format: BigNumber.Format = {
                decimalSeparator: '.',
                groupSeparator: ',',
                groupSize: 3,
                secondaryGroupSize: 0,
                fractionGroupSeparator: ' ',
                fractionGroupSize: 0
            };
            BigNumber.config({
                DECIMAL_PLACES: 20,
                ROUNDING_MODE: 4,
                RANGE: 1E9,
                EXPONENTIAL_AT: [-7, 21],
                FORMAT: format
            });
            t('0', 0);
            t('1', 1);
            t('-1', -1);
            t('123.456', 123.456);
            t('NaN', Number.NaN);
            t('Infinity', 1 / 0);
            t('-Infinity', -1 / 0);
            t('0', 0, undefined);
            t('1', 1, undefined);
            t('-1', -1, 0);
            t('123.456', 123.456, 3);
            t('NaN', Number.NaN, 0);
            t('Infinity', 1 / 0, 3);
            t('-Infinity', -1 / 0, 0);
            t('0.0', 0, 1);
            t('1.00', 1, 2);
            t('-1.000', -1, 3);
            t('123.4560', 123.456, 4);
            t('NaN', Number.NaN, 5);
            t('Infinity', 1 / 0, 6);
            t('-Infinity', -1 / 0, 7);
            t('9,876.54321', 9876.54321);
            t('4,018,736,400,000,000,000,000', '4.0187364e+21');
            t('999,999,999,999,999', 999999999999999);
            t('99,999,999,999,999', 99999999999999);
            t('9,999,999,999,999', 9999999999999);
            t('999,999,999,999', 999999999999);
            t('99,999,999,999', 99999999999);
            t('9,999,999,999', 9999999999);
            t('999,999,999', 999999999);
            t('99,999,999', 99999999);
            t('9,999,999', 9999999);
            t('999,999', 999999);
            t('99,999', 99999);
            t('9,999', 9999);
            t('999', 999);
            t('99', 99);
            t('9', 9);
            t('76,852.342091', '7.6852342091e+4');
            format.groupSeparator = ' ';
            t('76 852.34', '7.6852342091e+4', 2);
            t('76 852.342091', '7.6852342091e+4');
            t('76 852.3420910871', '7.6852342091087145832640897e+4', 10);
            format.fractionGroupSize = 5;
            t('4 018 736 400 000 000 000 000', '4.0187364e+21');
            t('76 852.34209 10871 45832 64089', '7.685234209108714583264089e+4', 20);
            t('76 852.34209 10871 45832 64089 7', '7.6852342091087145832640897e+4', 21);
            t('76 852.34209 10871 45832 64089 70000', '7.6852342091087145832640897e+4', 25);
            t('999 999 999 999 999', 999999999999999, 0);
            t('99 999 999 999 999.0', 99999999999999, 1);
            t('9 999 999 999 999.00', 9999999999999, 2);
            t('999 999 999 999.000', 999999999999, 3);
            t('99 999 999 999.0000', 99999999999, 4);
            t('9 999 999 999.00000', 9999999999, 5);
            t('999 999 999.00000 0', 999999999, 6);
            t('99 999 999.00000 00', 99999999, 7);
            t('9 999 999.00000 000', 9999999, 8);
            t('999 999.00000 0000', 999999, 9);
            t('99 999.00000 00000', 99999, 10);
            t('9 999.00000 00000 0', 9999, 11);
            t('999.00000 00000 00', 999, 12);
            t('99.00000 00000 000', 99, 13);
            t('9.00000 00000 0000', 9, 14);
            t('1.00000 00000 00000', 1, 15);
            t('1.00000 00000 0000', 1, 14);
            t('1.00000 00000 000', 1, 13);
            t('1.00000 00000 00', 1, 12);
            t('1.00000 00000 0', 1, 11);
            t('1.00000 00000', 1, 10);
            t('1.00000 0000', 1, 9);
            format.fractionGroupSize = 0;
            t('4 018 736 400 000 000 000 000', '4.0187364e+21');
            t('76 852.34209108714583264089', '7.685234209108714583264089e+4', 20);
            t('76 852.342091087145832640897', '7.6852342091087145832640897e+4', 21);
            t('76 852.3420910871458326408970000', '7.6852342091087145832640897e+4', 25);
            t('999 999 999 999 999', 999999999999999, 0);
            t('99 999 999 999 999.0', 99999999999999, 1);
            t('9 999 999 999 999.00', 9999999999999, 2);
            t('999 999 999 999.000', 999999999999, 3);
            t('99 999 999 999.0000', 99999999999, 4);
            t('9 999 999 999.00000', 9999999999, 5);
            t('999 999 999.000000', 999999999, 6);
            t('99 999 999.0000000', 99999999, 7);
            t('9 999 999.00000000', 9999999, 8);
            t('999 999.000000000', 999999, 9);
            t('99 999.0000000000', 99999, 10);
            t('9 999.00000000000', 9999, 11);
            t('999.000000000000', 999, 12);
            t('99.0000000000000', 99, 13);
            t('9.00000000000000', 9, 14);
            t('1.000000000000000', 1, 15);
            t('1.00000000000000', 1, 14);
            t('1.0000000000000', 1, 13);
            t('1.000000000000', 1, 12);
            t('1.00000000000', 1, 11);
            t('1.0000000000', 1, 10);
            t('1.000000000', 1, 9);
            format = {
                decimalSeparator: '.',
                groupSeparator: ',',
                groupSize: 3,
                secondaryGroupSize: 2,
                fractionGroupSeparator: ' ',
                fractionGroupSize: 0
            };
            BigNumber.config({ FORMAT: format });
            t('9,876.54321', 9876.54321);
            t('10,00,037.123', '1000037.123456789', 3);
            t('4,01,87,36,40,00,00,00,00,00,000', '4.0187364e+21');
            t('99,99,99,99,99,99,999', 999999999999999);
            t('9,99,99,99,99,99,999', 99999999999999);
            t('99,99,99,99,99,999', 9999999999999);
            t('9,99,99,99,99,999', 999999999999);
            t('99,99,99,99,999', 99999999999);
            t('9,99,99,99,999', 9999999999);
            t('99,99,99,999', 999999999);
            t('9,99,99,999', 99999999);
            t('99,99,999', 9999999);
            t('9,99,999', 999999);
            t('99,999', 99999);
            t('9,999', 9999);
            t('999', 999);
            t('99', 99);
            t('9', 9);
            format.decimalSeparator = ',';
            format.groupSeparator = '.';
            t('1.23.45.60.000,000000000008', '1.23456000000000000000789e+9', 12);
            format.groupSeparator = '';
            t('10000000000123456789000000,0000000001', '10000000000123456789000000.000000000100000001', 10);
            format.groupSeparator = ' ';
            format.groupSize = 1;
            format.secondaryGroupSize = 4;
            t('4658 0734 6509 8347 6580 3645 0,6', '4658073465098347658036450.59764985763489569875659876459', 1);
            format.fractionGroupSize = 2;
            format.fractionGroupSeparator = ':';
            format.secondaryGroupSize = undefined;
            t('4 6 5 8 0 7 3 4 6 5 0 9 8 3 4 7 6 5 8 0 3 6 4 5 0,59:76:49:85:76:34:89:56:98:75:65:98:76:45:9', '4658073465098347658036450.59764985763489569875659876459');
        });
    });
}
