let __generate__Id: number = 0;
function generateId(): string {
    return "reflect-getownmetadatakeys.test_" + ++__generate__Id;
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
export default function getownmetadatakeysTest() {
    describe('ActsGetOwnMetadataKeysTest', () => {
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
        it('KeysWithoutTargetKeyWhenNotDefined', 0, () => {
            import("reflect-metadata").then((reflectMetadata) => {
                let obj = new type();
                let result: any = Reflect.getOwnMetadataKeys(obj, undefined);
                expect(result).assertDeepEquals([]);
            });
        });
        it('KeysWithoutTargetKeyWhenDefined', 0, () => {
            import("reflect-metadata").then((reflectMetadata) => {
                let obj = new type();
                Reflect.defineMetadata("key", "value", obj, undefined);
                let result: any = Reflect.getOwnMetadataKeys(obj, undefined);
                expect(result).assertDeepEquals(["key"]);
            });
        });
        it('KeysOrderWithoutTargetKey', 0, () => {
            import("reflect-metadata").then((reflectMetadata) => {
                let obj = new type();
                Reflect.defineMetadata("key1", "value", obj, undefined);
                Reflect.defineMetadata("key0", "value", obj, undefined);
                let result: any = Reflect.getOwnMetadataKeys(obj, undefined);
                expect(result).assertDeepEquals(["key1", "key0"]);
            });
        });
        it('KeysOrderAfterRedefineWithoutTargetKey', 0, () => {
            import("reflect-metadata").then((reflectMetadata) => {
                let obj = new type();
                Reflect.defineMetadata("key1", "value", obj, undefined);
                Reflect.defineMetadata("key0", "value", obj, undefined);
                Reflect.defineMetadata("key1", "value", obj, undefined);
                let result: any = Reflect.getOwnMetadataKeys(obj, undefined);
                expect(result).assertDeepEquals(["key1", "key0"]);
            });
        });
        it('KeysWithTargetKeyWhenNotDefined', 0, () => {
            import("reflect-metadata").then((reflectMetadata) => {
                let obj = new type();
                let result: any = Reflect.getOwnMetadataKeys(obj, "name");
                expect(result).assertDeepEquals([]);
            });
        });
        it('KeysWithTargetKeyWhenDefined', 0, () => {
            import("reflect-metadata").then((reflectMetadata) => {
                let obj = new type();
                Reflect.defineMetadata("key", "value", obj, "name");
                let result: any = Reflect.getOwnMetadataKeys(obj, "name");
                expect(result).assertDeepEquals(["key"]);
            });
        });
        it('KeysOrderAfterRedefineWithTargetKey', 0, () => {
            import("reflect-metadata").then((reflectMetadata) => {
                let obj = new type();
                Reflect.defineMetadata("key1", "value", obj, "name");
                Reflect.defineMetadata("key0", "value", obj, "name");
                Reflect.defineMetadata("key1", "value", obj, "name");
                let result: any = Reflect.getOwnMetadataKeys(obj, "name");
                expect(result).assertDeepEquals(["key1", "key0"]);
            });
        });
    });
}
