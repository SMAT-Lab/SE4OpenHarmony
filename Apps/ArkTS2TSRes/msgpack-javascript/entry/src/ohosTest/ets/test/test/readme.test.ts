let __generate__Id: number = 0;
function generateId(): string {
    return "readme.test_" + ++__generate__Id;
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
import { encode, decode } from "@msgpack/msgpack";
import Util from "../test/stdlib/Util";
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
export default function readmeTest() {
    describe('readmeTest', () => {
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
        assert.context("## Synopsis", () => {
            it("runs", 0, () => {
                let foo: Foo = {
                    foo: "bar"
                };
                let object: ValueObject = {
                    nil: null,
                    integer: 1,
                    float: Math.PI,
                    string: "Hello, world!",
                    binary: Uint8Array.from([1, 2, 3]),
                    array: [10, 20, 30],
                    map: foo,
                    timestampExt: new Date(),
                };
                let startTime1 = new Date().getTime();
                const encoded = encode<undefined>(object);
                let decoded = Util.decodeObject(encoded);
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / 2;
                console.log(`msgpack-javascript:runs averageTime = ${averageTime1}`);
                // encoded is an Uint8Array instance
                assert.deepStrictEqual(decoded, object);
            });
        });
    });
}
interface Foo {
    foo: string;
}
interface ValueObject {
    nil: null;
    integer: number;
    float: number;
    string: string;
    binary: Uint8Array;
    array: number[];
    map: Foo;
    timestampExt: Date;
}
