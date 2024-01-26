let __generate__Id: number = 0;
function generateId(): string {
    return "codec-bigint.test_" + ++__generate__Id;
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
import assert from "./assert2hypium";
import CodecBigint from "../test/stdlib/CodecBigint";
// 测试用例通过 测试框架不支持 expect cannot serialize a BigInt
export default function CodecBigintTest() {
    describe('CodecBigintTest', () => {
        // Defines a test suite. Two parameters are supported: test suite name and test suite function.
        beforeAll(() => {
            // Presets an action, which is performed only once before all test cases of the test suite start.
            // This API supports only one parameter: preset action function.
        });
        beforeEach(() => {
            // if (typeof BigInt === "undefined") {
            //   this.skip();
            // }
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
        it("encodes_and_decodes_0n", 0, () => {
            let value = BigInt(0);
            let decoded: Object = CodecBigint.encodes_and_decodes_0n();
            // 测试框架无法覆盖BitInt(0)的情况
            // assert.deepStrictEqual(decoded, value);
            assert.strictEqual(decoded, value);
        });
        it("encodes_and_decodes_MAX_SAFE_INTEGER_1", 0, () => {
            const value = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1);
            let decoded: Object = CodecBigint.encodes_and_decodes_MAX_SAFE_INTEGER_1();
            // assert.deepStrictEqual(decoded, value);
            assert.strictEqual(decoded, value);
        });
        it("encodes_and_decodes_MIN_SAFE_INTEGER_minus1", 0, () => {
            const value = BigInt(Number.MIN_SAFE_INTEGER) - BigInt(1);
            let decoded: Object = CodecBigint.encodes_and_decodes_MIN_SAFE_INTEGER_minus1();
            // assert.deepStrictEqual(decoded, value);
            assert.strictEqual(decoded, value);
        });
    });
}
