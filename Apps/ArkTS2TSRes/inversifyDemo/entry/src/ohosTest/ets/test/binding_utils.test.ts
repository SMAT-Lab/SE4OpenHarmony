let __generate__Id: number = 0;
function generateId(): string {
    return "binding_utils.test_" + ++__generate__Id;
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it as _it, expect } from '../utils/util';
import { Binding } from 'inversify/lib/bindings/binding';
import { getFactoryDetails } from 'inversify/lib/utils/binding_utils';
export default function binding_utilsTest() {
    describe('binding_utilsTest', () => {
        _it('should_thrown_an_exception_non_factory_binding_type', () => {
            const binding: Binding<string> = new Binding('', 'Singleton');
            binding.type = 'Instance';
            expect(() => getFactoryDetails(binding)).to.throw('Unexpected factory type Instance');
        });
    });
}
