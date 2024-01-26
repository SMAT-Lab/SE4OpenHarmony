let __generate__Id: number = 0;
function generateId(): string {
    return "Index.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import { data } from "../utils/data";
import utf8 from "utf8";
export default function IndexTest() {
    describe('IndexTest', () => {
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
        it('encode', 0, () => {
            data.forEach((object: Object) => {
                let description = (object as Record<string, Object>).description || 'U+' + ((object as Record<string, Object>).codePoint as number).toString(16).toUpperCase();
                if ((object as Record<string, Object>).error) {
                    raises(() => {
                        utf8.encode((object as Record<string, Object>).decoded);
                    }, Error, 'Error: non-scalar value detected');
                }
                else {
                    equal((object as Record<string, Object>).encoded, utf8.encode((object as Record<string, Object>).decoded), 'Encoding: ' + description);
                }
            });
        });
        it("decode", 0, () => {
            data.forEach((object: Object) => {
                let description = (object as Record<string, Object>).description || 'U+' + ((object as Record<string, Object>).codePoint as number).toString(16).toUpperCase();
                if ((object as Record<string, Object>).error) {
                    raises(() => {
                        utf8.decode((object as Record<string, Object>).encoded);
                    }, Error, 'Error: non-scalar value detected');
                }
                else {
                    equal((object as Record<string, Object>).decoded, utf8.decode((object as Record<string, Object>).encoded), 'Decoding: ' + description);
                }
            });
        });
    });
}
export function raises(func: () => void, error: Object, message: Object) {
    try {
        func();
        expect(1).assertEqual(2);
    }
    catch (err) {
    }
}
export function equal(source: Object, dest: Object, message: Object) {
    expect(source).assertEqual(dest);
}
