let __generate__Id: number = 0;
function generateId(): string {
    return "reflect-metadata.test_" + ++__generate__Id;
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
export default function metadataTest() {
    describe('ActsMetadataTest', () => {
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
        class type {
        }
        it('ReturnsDecoratorFunction', 0, () => {
            import("reflect-metadata").then((reflectMetadata) => {
                let result: any = Reflect.metadata("key", "value");
                expect(typeof result).assertEqual("function");
            });
        });
        it('OnTargetWithoutTargetKey', 0, () => {
            import("reflect-metadata").then((reflectMetadata) => {
                let decorator = Reflect.metadata("key", "value");
                let target = () => {
                };
                decorator(target);
                let result: any = Reflect.hasOwnMetadata("key", target, undefined);
                expect(result).assertEqual(true);
            });
        });
        it('OnTargetWithTargetKey', 0, () => {
            import("reflect-metadata").then((reflectMetadata) => {
                let decorator = Reflect.metadata("key", "value");
                let target = new type();
                decorator(target, "name");
                let result: any = Reflect.hasOwnMetadata("key", target, "name");
                expect(result).assertEqual(true);
            });
        });
    });
}