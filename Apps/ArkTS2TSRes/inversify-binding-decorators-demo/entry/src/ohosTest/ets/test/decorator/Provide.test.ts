let __generate__Id: number = 0;
function generateId(): string {
    return "Provide.test_" + ++__generate__Id;
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
import { provide } from 'inversify-binding-decorators/es/index';
// import { it as _it, afterAll, afterEach, beforeAll, beforeEach, describe, expect } from '../util'
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { shouldThrow0, shouldThrow } from '../interface';
let tag = "inversify-demo： ";
export default function provideTest() {
    describe("provide", () => {
        beforeEach(() => {
        });
        afterEach(() => {
        });
        it("Should_return_target_type", 0, () => {
            class Ninja {
            }
            let ninja: Ninja = new Ninja();
            const provided: any = provide(ninja);
            expect(typeof provided).assertEqual("function");
        });
        it("Should_throw_if_provide_is_applied_more_than_once_without_force_flag", 0, () => {
            try {
                shouldThrow0 && shouldThrow0();
            }
            catch (err) {
                let value: string = "Cannot apply @provide decorator multiple times but is has been used " +
                    "multiple times in Ninja " +
                    "Please use @provide(ID, true) if you are trying to declare multiple bindings!";
                expect(err.message).assertEqual(value);
                console.log(tag + "expect(" + err.message + ").throw(" + value + ")");
            }
        });
        it("Should_work_if_provide_is_applied_more_than_once_with_force_flag", 0, () => {
            try {
                shouldThrow && shouldThrow();
            }
            catch (err) {
                console.log(tag + "expect(" + err.message + ").throw()");
            }
        });
    });
}
