let __generate__Id: number = 0;
function generateId(): string {
    return "Fluent_provide.test_" + ++__generate__Id;
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
import { shouldThrow1, shouldThrow2 } from '../interface';
let tag = "inversify-demo： ";
export default function fluentProvideTest() {
    describe("fluentProvide", () => {
        it("Should_throw_if_provideFluent_is_applied_more_than_once_without_force_flag", 0, () => {
            try {
                shouldThrow1 && shouldThrow1();
            }
            catch (err) {
                let value: string = "Cannot apply @provideFluent decorator multiple times but is has been used " +
                    "multiple times in Ninja " +
                    "Please use done(true) if you are trying to declare multiple bindings!";
                expect(err.message).assertEqual(value);
                console.log(tag + "expect(" + err.message + ").throw(" + value + ")");
            }
        });
        it("Should_work_if_provide_is_applied_more_than_once_with_force_flag", 0, () => {
            try {
                shouldThrow2 && shouldThrow2();
            }
            catch (err) {
                expect(1).assertEqual(2);
                console.log(tag + "expect(" + err.message + ").throw()");
            }
            expect(1).assertEqual(1);
        });
    });
}
