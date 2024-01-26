let __generate__Id: number = 0;
function generateId(): string {
    return "prototype-pollution.test_" + ++__generate__Id;
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
import assert from "./assert2hypium";
import { encode, decode, DecodeError } from "@msgpack/msgpack";
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { o } from './stdlib/StdlibData';
import { defineProperty } from './stdlib/Stdlib';
export default function prototypePollutionTest() {
    describe('prototypePollutionTest', () => {
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
        assert.context("__proto__ exists as a map key", () => {
            it("raises_DecodeError_in_decoding", 0, () => {
                // override __proto__ as an enumerable property
                defineProperty();
                let startTime1 = new Date().getTime();
                const encoded = encode<undefined>(o);
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / 1;
                console.log(`msgpack-javascript:raises_DecodeError_in_decoding averageTime = ${averageTime1}`);
                let decodeError: DecodeError | null = null;
                assert.throws(() => {
                    decode<undefined>(encoded);
                }, decodeError);
            });
        });
    });
}
