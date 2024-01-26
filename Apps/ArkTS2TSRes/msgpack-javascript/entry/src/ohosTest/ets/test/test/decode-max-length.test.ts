let __generate__Id: number = 0;
function generateId(): string {
    return "decode-max-length.test_" + ++__generate__Id;
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
import { encode, decode, DecodeOptions } from "@msgpack/msgpack";
import { describe, beforeAll, beforeEach, afterEach, afterAll, it } from '@ohos/hypium';
import { decodeOption } from './stdlib/StdlibData';
export default function DecodeMaxLengthTest() {
    describe('DecodeMaxLengthTest', () => {
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
        assert.context("maxStrLength", () => {
            let startTime1 = new Date().getTime();
            const input = encode<undefined>("foo");
            const options: DecodeOptions = decodeOption;
            let endTime1 = new Date().getTime();
            let averageTime1 = ((endTime1 - startTime1) * 1000) / 1;
            console.log(`msgpack-javascript:maxStrLength averageTime = ${averageTime1}`);
            it("throws_errors_synchronous_", 0, () => {
                assert.throws(() => {
                    decode<undefined>(input, options);
                }, new RegExp("/max length exceeded/i"));
            });
        });
        assert.context("maxBinLength", () => {
            let startTime1 = new Date().getTime();
            const input = encode<undefined>(Uint8Array.from([1, 2, 3]));
            const options: MaxBinLength = {
                maxBinLength: 1
            };
            let endTime1 = new Date().getTime();
            let averageTime1 = ((endTime1 - startTime1) * 1000) / 1;
            console.log(`msgpack-javascript:maxBinLength averageTime = ${averageTime1}`);
            it("throws_errors_synchronous", 0, () => {
                assert.throws(() => {
                    decode<undefined>(input, options);
                }, new RegExp('/max length exceeded/i'));
            });
        });
        assert.context("maxArrayLength", () => {
            let startTime1 = new Date().getTime();
            const input = encode<undefined>([1, 2, 3]);
            const options: MaxArrayLength = {
                maxArrayLength: 1
            };
            let endTime1 = new Date().getTime();
            let averageTime1 = ((endTime1 - startTime1) * 1000) / 1;
            console.log(`msgpack-javascript:maxArrayLength averageTime = ${averageTime1}`);
            it("throws_errors_synchronous_", 0, () => {
                assert.throws(() => {
                    decode<undefined>(input, options);
                }, new RegExp('/max length exceeded/i'));
            });
        });
        assert.context("maxMapLength", () => {
            let startTime1 = new Date().getTime();
            let inputValue: InputValue = {
                foo: 1, bar: 1, baz: 3
            };
            const input = encode<undefined>(inputValue);
            const options: MaxMapLength = {
                maxMapLength: 1
            };
            let endTime1 = new Date().getTime();
            let averageTime1 = ((endTime1 - startTime1) * 1000) / 1;
            console.log(`msgpack-javascript:maxMapLength averageTime = ${averageTime1}`);
            it("throws_errors_synchronous", 0, () => {
                assert.throws(() => {
                    decode<undefined>(input, options);
                }, new RegExp('/max length exceeded/i'));
            });
        });
        assert.context("maxExtType", () => {
            let startTime1 = new Date().getTime();
            const input = encode<undefined>(new Date());
            // timextamp ext requires at least 4 bytes.
            const options: MaxExtLength = {
                maxExtLength: 1
            };
            let endTime1 = new Date().getTime();
            let averageTime1 = ((endTime1 - startTime1) * 1000) / 1;
            console.log(`msgpack-javascript:maxExtType averageTime = ${averageTime1}`);
            it("throws_errors_synchronous", 0, () => {
                assert.throws(() => {
                    decode<undefined>(input, options);
                }, new RegExp(' /max length exceeded/i'));
            });
        });
    });
}
interface MaxBinLength {
    maxBinLength: number;
}
interface MaxArrayLength {
    maxArrayLength: number;
}
interface MaxMapLength {
    maxMapLength: number;
}
interface MaxExtLength {
    maxExtLength: number;
}
interface InputValue {
    foo: number;
    bar: number;
    baz: number;
}
