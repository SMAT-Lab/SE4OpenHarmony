let __generate__Id: number = 0;
function generateId(): string {
    return "decodeMulti.test_" + ++__generate__Id;
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
import { encode, decodeMulti } from "@msgpack/msgpack";
import Util from "../test/stdlib/Util";
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
export default function decodeMultiTest() {
    describe('decodeMultiTest', () => {
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
        it("decodes_multiple_objects_in_a_single_binary", 0, () => {
            let bar: Bar = {
                name: "bar",
            };
            const items = [
                "foo",
                10,
                bar,
                [1, 2, 3],
            ];
            const encodedItems = items.map((item) => encode<undefined>(item));
            const encoded = new Uint8Array(encodedItems.reduce((p, c) => p + c.byteLength, 0));
            let offset = 0;
            for (const encodedItem of encodedItems) {
                encoded.set(encodedItem, offset);
                offset += encodedItem.byteLength;
            }
            const result: Array<Object> = [];
            let startTime1 = new Date().getTime();
            Util.decodeMultiSetResult(encoded, result);
            let endTime1 = new Date().getTime();
            let averageTime1 = ((endTime1 - startTime1) * 1000) / 1;
            console.log(`msgpack-javascript:decodes_multiple_objects_in_a_single_binary averageTime = ${averageTime1}`);
            assert.deepStrictEqual(result, items);
        });
    });
}
interface Bar {
    name: string;
}
