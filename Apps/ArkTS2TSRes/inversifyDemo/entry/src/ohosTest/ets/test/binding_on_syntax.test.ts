let __generate__Id: number = 0;
function generateId(): string {
    return "binding_on_syntax.test_" + ++__generate__Id;
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
import { BindingScopeEnum } from 'inversify';
import { interfaces } from 'inversify';
import { BindingOnSyntax } from 'inversify/lib/syntax/binding_on_syntax';
export default function binding_on_syntaxTest() {
    describe('binding_on_syntaxTest', () => {
        _it('Should_set_its_own_properties_correctly', () => {
            interface Ninja {
            }
            const ninjaIdentifier = 'Ninja';
            interface _binding {
                _binding: Binding<any>;
            }
            const binding = new Binding<Ninja>(ninjaIdentifier, BindingScopeEnum.Transient);
            const bindingOnSyntax = new BindingOnSyntax<Ninja>(binding);
            const _bindingOnSyntax = bindingOnSyntax as any as _binding;
            expect(_bindingOnSyntax._binding.serviceIdentifier).eql(ninjaIdentifier);
        });
        _it('Should_be_able_to_configure_the_activation_handler_of_a_binding', () => {
            interface Ninja {
            }
            const ninjaIdentifier = 'Ninja';
            const binding = new Binding<Ninja>(ninjaIdentifier, BindingScopeEnum.Transient);
            const bindingOnSyntax = new BindingOnSyntax<Ninja>(binding);
            bindingOnSyntax.onActivation((context: interfaces.Context, ninja: Ninja) => {
                const handler: any = {};
                return new Proxy<Ninja>(ninja, handler);
            });
            expect(binding.onActivation).not.to.eql(null);
        });
    });
}
