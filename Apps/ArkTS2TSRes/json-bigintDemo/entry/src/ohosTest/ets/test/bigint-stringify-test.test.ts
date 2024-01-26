let __generate__Id: number = 0;
function generateId(): string {
    return "bigint-stringify-test.test_" + ++__generate__Id;
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
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@ohos/hypium';
import jsonBig from 'json-bigint';
import { jsonBigTpye } from '../../../main/ets/pages/index.ts';
export default function bigint_stringify_test() {
    describe('Testing_native_BigInt_support_stringify', () => {
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
        it("Should_show_JSONbig_can_stringify_native_BigInt", 0, () => {
            interface objType {
                big: string;
                small: number;
                bigConstructed: bigint;
                smallConstructed: number;
            }
            ;
            let obj: objType = {
                big: "123456789012345678901234567890",
                small: -42,
                bigConstructed: BigInt(1),
                smallConstructed: Number(2),
            };
            let bigInt: jsonBigTpye = jsonBig({
                alwaysParseAsBig: true,
                storeAsString: true
            });
            let inputParse = '{"big":123456789012345678901234567890,"small":-42,"bigConstructed":"1","smallConstructed":2}';
            let objParse: Record<string, string> = bigInt.parse(inputParse);
            expect(obj.small.toString()).assertEqual("-42");
            expect(obj.big.toString()).assertEqual("123456789012345678901234567890");
            let output: string = bigInt.stringify(objParse);
            expect(output).assertEqual('{' +
                '"big":"123456789012345678901234567890",' +
                '"small":-42,' +
                '"bigConstructed":"1",' +
                '"smallConstructed":2' +
                '}');
        });
    });
}
