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
import { injectable } from 'inversify';
import { Binding } from 'inversify/lib/bindings/binding';
import * as ERROR_MSGS from 'inversify/lib/constants/error_msgs';
import { BindingScopeEnum, BindingTypeEnum } from 'inversify';
import { interfaces } from 'inversify';
import { BindingToSyntax } from 'inversify/lib/syntax/binding_to_syntax';
import * as ns from "reflect-metadata"
ns
export default function binding_to_syntaxTest() {
  describe('binding_to_syntaxTest',  ()=> {
    _it('Should_set_its_own_properties_correctly', () => {

      interface Ninja { }
      const ninjaIdentifier = 'Ninja';
      interface _binding{ _binding: interfaces.Binding<Ninja> }
      const binding = new Binding<Ninja>(ninjaIdentifier, BindingScopeEnum.Transient);
      const bindingToSyntax = new BindingToSyntax<Ninja>(binding);
      const _bindingToSyntax = bindingToSyntax as ESObject as _binding

      expect(_bindingToSyntax._binding.serviceIdentifier).eql(ninjaIdentifier);

    });

    _it('Should_be_able_to_configure_the_type_of_a_binding', () => {

      interface Ninja1 { }

      @injectable()
      class Ninja implements Ninja1 { }
      const ninjaIdentifier = 'Ninja';

      const binding = new Binding<Ninja>(ninjaIdentifier, BindingScopeEnum.Transient);
      // let bindingWithClassAsId = new Binding<Ninja>(Ninja, BindingScopeEnum.Transient);
      const bindingToSyntax = new BindingToSyntax<Ninja>(binding);

      expect(binding.type).eql(BindingTypeEnum.Invalid);

      bindingToSyntax.to(Ninja);
      expect(binding.type).eql(BindingTypeEnum.Instance);
      expect(binding.implementationType).not.to.eql(null);

      (bindingToSyntax as ESObject)._binding = binding;
      bindingToSyntax.toConstantValue(new Ninja());
      expect(binding.type).eql(BindingTypeEnum.ConstantValue);
      expect(binding.cache instanceof Ninja).eql(true);

      bindingToSyntax.toDynamicValue((context: interfaces.Context) => new Ninja());
      expect(binding.type).eql(BindingTypeEnum.DynamicValue);
      expect(typeof binding.dynamicValue).eql('function');

      const dynamicValueFactory: ESObject = binding.dynamicValue;
      expect(dynamicValueFactory(null) instanceof Ninja).eql(true);

      bindingToSyntax.toConstructor<Ninja>(Ninja);
      expect(binding.type).eql(BindingTypeEnum.Constructor);
      expect(binding.implementationType).not.to.eql(null);

      bindingToSyntax.toFactory<Ninja>((context: interfaces.Context) =>
      () =>
      new Ninja());

      expect(binding.type).eql(BindingTypeEnum.Factory);
      expect(binding.factory).not.to.eql(null);

      const f = () => 'test';
      bindingToSyntax.toFunction(f);
      expect(binding.type).eql(BindingTypeEnum.Function);
      expect(binding.cache === f).eql(true);

      bindingToSyntax.toAutoFactory<Ninja>(ninjaIdentifier);

      expect(binding.type).eql(BindingTypeEnum.Factory);
      expect(binding.factory).not.to.eql(null);

      bindingToSyntax.toAutoNamedFactory<Ninja>(ninjaIdentifier);

      expect(binding.type).eql(BindingTypeEnum.Factory);
      expect(binding.factory).not.to.eql(null);



    });

    _it('Should_prevent_invalid_function_bindings', () => {

      interface Ninja1 { }

      @injectable()
      class Ninja implements Ninja1 { }
      const ninjaIdentifier = 'Ninja';

      const binding = new Binding<Ninja>(ninjaIdentifier, BindingScopeEnum.Transient);
      const bindingToSyntax = new BindingToSyntax<Ninja>(binding);

      const f =  ()=> {
        bindingToSyntax.toFunction(5);
      };

      expect(f).to.throw(ERROR_MSGS.INVALID_FUNCTION_BINDING);

    });
  })
}