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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it as _it, expect } from '../utils/util'
import { Binding } from 'inversify/lib/bindings/binding';
import { BindingScopeEnum } from 'inversify';
import { BindingInSyntax } from 'inversify/lib/syntax/binding_in_syntax';

export default function binding_in_syntaxTest() {
  describe('binding_in_syntaxTest',  ()=> {
    _it('Should_set_its_own_properties_correctly', () => {

      interface Ninja {}

      const ninjaIdentifier = 'Ninja';
      interface _binding { _binding: Binding<ESObject> }
      const binding = new Binding<Ninja>(ninjaIdentifier, BindingScopeEnum.Transient);
      const bindingInSyntax = new BindingInSyntax<Ninja>(binding);
      const _bindingInSyntax = bindingInSyntax as ESObject as _binding;

      expect(_bindingInSyntax._binding.serviceIdentifier).eql(ninjaIdentifier);

    });

    _it('Should_be_able_to_configure_the_scope_of_a_binding', () => {

      interface Ninja {}

      const ninjaIdentifier = 'Ninja';

      const binding = new Binding<Ninja>(ninjaIdentifier, BindingScopeEnum.Transient);
      const bindingInSyntax = new BindingInSyntax<Ninja>(binding);

      // default scope is transient
      expect(binding.scope).eql(BindingScopeEnum.Transient);

      // singleton scope
      bindingInSyntax.inSingletonScope();
      expect(binding.scope).eql(BindingScopeEnum.Singleton);

      // set transient scope explicitly
      bindingInSyntax.inTransientScope();
      expect(binding.scope).eql(BindingScopeEnum.Transient);

    });
  })
}