let __generate__Id: number = 0;
function generateId(): string {
    return "Injectssue685.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { getThrows, getTest } from './inject';
let tag: string = "inversify-demo： ";
export default function injectssue685Test() {
    describe('Injectssue685Test', () => {
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
        it("Should_throw_exception_if_circular_dependencies_are_declared_in_a_single_file", 0, () => {
            // This error may seem a bit misleading because when using
            // classes as service indentifiers @inject anotations should
            // not be required and if we do add an annotation like
            // @inject(Dom) or @inject(DomUi) we will still get the same
            // exception. This happens because at point in time in which
            // the decorator is invoked, the class has not been declared
            // so the decorator is invoked as @inject(undefined). This
            // trigger inversify to think that the annotation was never
            // added. The solution is to use Symbols as service identifiers.
            //   expect(getThrows()).to.throw(
            //     "Missing required @inject or @multiInject annotation in: argument 0 in class Dom."
            //   );
            try {
                getThrows && getThrows();
            }
            catch (err) {
                let value: string = "Missing required @inject or @multiInject annotation in: argument 0 in class Dom.";
                console.log(tag + "expect(" + err.message + ").throw(" + value + ")");
            }
        });
        it("Should_be_able_to_resolve_lazy_circular_dependencies", 0, () => {
            const test = getTest();
            expect(test.dom.name).assertEqual("Dom");
            expect(test.dom.domUi.name).assertEqual("DomUi");
            expect(test.dom.domUi.dom.name).assertEqual("Dom");
            expect(test.dom).assertEqual(test.dom.domUi.dom);
            expect(test.dom.domUi).assertEqual(test.dom.domUi.dom.domUi);
        });
    });
}
