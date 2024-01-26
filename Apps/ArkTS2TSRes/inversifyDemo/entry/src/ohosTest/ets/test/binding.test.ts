let __generate__Id: number = 0;
function generateId(): string {
    return "binding.test_" + ++__generate__Id;
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
import { Binding } from 'inversify/lib/bindings/binding';
import { BindingScopeEnum } from 'inversify';
import * as Stubs from '../utils/stubs';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it as _it, expect } from '../utils/util';
export default function bindingTest() {
    describe('bindingTest', () => {
        _it('Should_set_its_own_properties_correctly', () => {
            const fooIdentifier = 'FooInterface';
            const fooBinding = new Binding<Stubs.FooInterface>(fooIdentifier, BindingScopeEnum.Transient);
            expect(fooBinding.serviceIdentifier).eql(fooIdentifier);
            expect(fooBinding.implementationType).eql(null);
            expect(fooBinding.cache).eql(null);
            expect(fooBinding.scope).eql(BindingScopeEnum.Transient);
            expect(fooBinding.id).to.be.a('number');
        });
    });
}
