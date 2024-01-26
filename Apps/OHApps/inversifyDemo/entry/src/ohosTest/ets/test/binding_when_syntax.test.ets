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
import { BindingScopeEnum, TargetTypeEnum } from 'inversify';
import { Container } from 'inversify';
import { interfaces } from 'inversify';
import { Context } from 'inversify/lib/planning/context';
import { Metadata } from 'inversify/es/planning/metadata';
import { Request } from 'inversify/lib/planning/request';
import { Target } from 'inversify/es/planning/target';
import { BindingWhenSyntax } from 'inversify/lib/syntax/binding_when_syntax';
import { typeConstraint } from 'inversify/lib/syntax/constraint_helpers';
import { NULL_ARGUMENT } from 'inversify/lib/constants/error_msgs';
import { getKatanaBindingWhenSyntax } from '../tools/bindingWhen';
import { getBindingWhenSyntax } from '../tools/bindingWhenShould';


export default function binding_when_syntaxTest() {
  interface Material {
    name: string;
  }

  interface Weapon {
    name: string;
    material: Material;
  }

  class Katana implements Weapon {
    public name = 'Katana';
    public material: Material;
    public constructor(material: Material) {
      this.material = material;
    }
  }

  class Shuriken implements Weapon {
    public name = 'Shuriken';
    public material: Material;
    public constructor(material: Material) {
      this.material = material;
    }
  }


  interface Samurai {
    katana: Weapon;
  }

  interface Ninja {
    shuriken: Weapon;
  }

  class NinjaMaster implements Ninja {
    public shuriken: Weapon;
    public constructor(shuriken: Weapon) {
      this.shuriken = shuriken;
    }
  }

  class SamuraiMaster implements Samurai {
    public katana: Weapon;
    public constructor(katana: Weapon) {
      this.katana = katana;
    }
  }

  class NinjaStudent implements Ninja {
    public shuriken: Weapon;
    public constructor(shuriken: Weapon) {
      this.shuriken = shuriken;
    }
  }

  class SamuraiStudent implements Samurai {
    public katana: Weapon;
    public constructor(katana: Weapon) {
      this.katana = katana;
    }
  }

  const context = new Context(new Container());

  // Samurai
  const samuraiMasterBinding = new Binding<Samurai>('Samurai', BindingScopeEnum.Transient);
  samuraiMasterBinding.implementationType = new SamuraiMaster(Object(null));

  const samuraiStudentBinding = new Binding<Samurai>('Samurai', BindingScopeEnum.Transient);
  samuraiStudentBinding.implementationType = new SamuraiStudent(Object(null));

  const samuraiTarget:ESObject = new Target(TargetTypeEnum.ConstructorArgument, '', 'Samurai', new Metadata('sneaky', false));
  const samuraiMasterRequest = new Request('Samurai', context, null, samuraiMasterBinding, samuraiTarget);
  const samuraiStudentRequest = new Request('Samurai', context, null, samuraiStudentBinding, samuraiTarget);

  // Ninja
  const ninjaMasterBinding = new Binding<Ninja>('Ninja', BindingScopeEnum.Transient);
  ninjaMasterBinding.implementationType = new NinjaMaster(Object(null));

  const ninjaStudentBinding = new Binding<Ninja>('Ninja', BindingScopeEnum.Transient);
  ninjaStudentBinding.implementationType =  new NinjaStudent(Object(null));

  const ninjaTarget:ESObject = new Target(TargetTypeEnum.ConstructorArgument, '', 'Ninja', new Metadata('sneaky', true));
  const ninjaMasterRequest = new Request('Ninja', context, null, ninjaMasterBinding, ninjaTarget);
  const ninjaStudentRequest = new Request('Ninja', context, null, ninjaStudentBinding, ninjaTarget);

  // Katana
  const katanaBinding = new Binding<Weapon>('Weapon', BindingScopeEnum.Transient);
  katanaBinding.implementationType = new Katana(Object(null));
  const katanaBindingWhenSyntax = new BindingWhenSyntax<Weapon>(katanaBinding);
  const katanaTarget:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'katana', 'Weapon');
  const ironKatanaRequest = new Request('Weapon', context, samuraiMasterRequest, katanaBinding, katanaTarget);
  const woodKatanaRequest = new Request('Weapon', context, samuraiStudentRequest, katanaBinding, katanaTarget);

  // Shuriken
  const shurikenBinding = new Binding<Weapon>('Weapon', BindingScopeEnum.Transient);
  shurikenBinding.implementationType = new Shuriken(Object(null));
  const shurikenBindingWhenSyntax:ESObject = new BindingWhenSyntax<Weapon>(shurikenBinding);
  const shurikenTarget:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'shuriken', 'Weapon');
  const ironShurikenRequest = new Request('Weapon', context, ninjaMasterRequest, shurikenBinding, shurikenTarget);
  const woodShurikenRequest = new Request('Weapon', context, ninjaStudentRequest, shurikenBinding, shurikenTarget);
  describe('binding_when_syntaxTest',  ()=> {
    _it('Should_set_its_own_properties_correctly', () => {

      interface Ninja { }
      const ninjaIdentifier = 'Ninja';
   interface _binding{ _binding: Binding<ESObject> }
      const binding = new Binding<Ninja>(ninjaIdentifier, BindingScopeEnum.Transient);
      const bindingWhenSyntax = new BindingWhenSyntax<Ninja>(binding);
      const _bindingWhenSyntax = bindingWhenSyntax as ESObject as _binding;

      expect(_bindingWhenSyntax._binding.serviceIdentifier).eql(ninjaIdentifier);

    });

    _it('Should_be_able_to_configure_custom_constraint_of_a_binding', () => {

      interface Ninja { }
      const ninjaIdentifier = 'Ninja';

      const binding = new Binding<Ninja>(ninjaIdentifier, BindingScopeEnum.Transient);
      const bindingWhenSyntax = new BindingWhenSyntax<Ninja>(binding);

      bindingWhenSyntax.when((theRequest: interfaces.Request) =>
      theRequest.target.name.equals('ninja'));

      const target:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'ninja', ninjaIdentifier);
      const context = new Context(new Container());
      const request = new Request(ninjaIdentifier, context, null, binding, target);
      expect(binding.constraint(request)).eql(true);

    });

    _it('Should_have_false_constraint_binding_null_request_whenTargetIsDefault', () => {

      interface Weapon {
        name: string;
      }

      const shurikenBinding = new Binding<Weapon>('Weapon', BindingScopeEnum.Transient);
      const shurikenBindingWhenSyntax = new BindingWhenSyntax<Weapon>(shurikenBinding);

      shurikenBindingWhenSyntax.whenTargetIsDefault();
      expect(shurikenBinding.constraint(null)).eql(false);

    });

    _it('Should_be_able_to_constraint_a_binding_to_a_named_target', () => {

      interface Ninja { }
      const ninjaIdentifier = 'Ninja';

      const binding = new Binding<Ninja>(ninjaIdentifier, BindingScopeEnum.Transient);
      const bindingWhenSyntax = new BindingWhenSyntax<Ninja>(binding);

      const named = 'primary';

      bindingWhenSyntax.whenTargetNamed(named);
      expect(binding.constraint).not.to.eql(null);

      const context = new Context(new Container());

      const target:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'ninja', ninjaIdentifier, named);
      const request = new Request(ninjaIdentifier, context, null, binding, target);
      expect(binding.constraint(request)).eql(true);

      const target2:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'ninja', ninjaIdentifier);
      const request2 = new Request(ninjaIdentifier, context, null, binding, target2);
      expect(binding.constraint(request2)).eql(false);

    });

    _it('Should_be_able_to_constraint_a_binding_to_a_tagged_target', () => {

      interface Ninja { }
      const ninjaIdentifier = 'Ninja';

      const binding = new Binding<Ninja>(ninjaIdentifier, BindingScopeEnum.Transient);
      const bindingWhenSyntax = new BindingWhenSyntax<Ninja>(binding);

      bindingWhenSyntax.whenTargetTagged('canSwim', true);
      expect(binding.constraint).not.to.eql(null);

      const context = new Context(new Container());

      const target:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'ninja', ninjaIdentifier, new Metadata('canSwim', true));
      const request = new Request(ninjaIdentifier, context, null, binding, target);
      expect(binding.constraint(request)).eql(true);

      const target2:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'ninja', ninjaIdentifier, new Metadata('canSwim', false));
      const request2 = new Request(ninjaIdentifier, context, null, binding, target2);
      expect(binding.constraint(request2)).eql(false);

    });

    _it('Should_be_able_to_constraint_a_binding_to_its_parent', () => {

      // interface Weapon {
      //   name: string;
      // }
      //
      // interface JaponeseWarrior {
      //   katana: Weapon;
      // }
      //
      // interface ChineseWarrior {
      //   shuriken: Weapon;
      // }
      //
      // class Ninja implements ChineseWarrior {
      //   public shuriken: Weapon;
      //   public constructor(shuriken: Weapon) {
      //     this.shuriken = shuriken;
      //   }
      // }
      //
      // class Samurai implements JaponeseWarrior {
      //   public katana: Weapon;
      //   public constructor(katana: Weapon) {
      //     this.katana = katana;
      //   }
      // }
      //
      // const context = new Context(new Container());
      //
      // const samuraiBinding = new Binding<Samurai>('Samurai', BindingScopeEnum.Transient);
      // samuraiBinding.implementationType = new Samurai(Object(null));
      // const samuraiTarget:ESObject = new Target(TargetTypeEnum.Variable, '', 'Samurai');
      // const samuraiRequest = new Request('Samurai', context, null, samuraiBinding, samuraiTarget);
      //
      // const ninjaBinding = new Binding<Ninja>('Ninja', BindingScopeEnum.Transient);
      // ninjaBinding.implementationType =  new Ninja(Object(null));
      // const ninjaTarget:ESObject = new Target(TargetTypeEnum.Variable, '', 'Ninja');
      // const ninjaRequest = new Request('Ninja', context, null, ninjaBinding, ninjaTarget);
      //
      // const katanaBinding = new Binding<Weapon>('Weapon', BindingScopeEnum.Transient);
      // const katanaBindingWhenSyntax = new BindingWhenSyntax<Weapon>(katanaBinding);
      // const katanaTarget:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'katana', 'Weapon');
      // const katanaRequest = new Request('Weapon', context, samuraiRequest, katanaBinding, katanaTarget);
      //
      // const shurikenBinding = new Binding<Weapon>('Weapon', BindingScopeEnum.Transient);
      // const shurikenBindingWhenSyntax = new BindingWhenSyntax<Weapon>(shurikenBinding);
      // const shurikenTarget:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'shuriken', 'Weapon');
      // const shurikenRequest = new Request('Weapon', context, ninjaRequest, shurikenBinding, shurikenTarget);

      let katanaBindingWhenSyntaxSamurai = getKatanaBindingWhenSyntax("katanaBindingWhenSyntaxSamurai")

      expect(katanaBindingWhenSyntaxSamurai.katanaBinding.constraint(katanaBindingWhenSyntaxSamurai.katanaRequest)).eql(true);
      expect(katanaBindingWhenSyntaxSamurai.katanaBinding.constraint(katanaBindingWhenSyntaxSamurai.shurikenRequest)).eql(false);

      let katanaBindingWhenSyntaxNinja = getKatanaBindingWhenSyntax("katanaBindingWhenSyntaxNinja")

      expect(katanaBindingWhenSyntaxNinja.katanaBinding.constraint(katanaBindingWhenSyntaxNinja.katanaRequest)).eql(false);
      expect(katanaBindingWhenSyntaxNinja.katanaBinding.constraint(katanaBindingWhenSyntaxNinja.shurikenRequest)).eql(true);

      let shurikenBindingWhenSyntaxSamurai = getKatanaBindingWhenSyntax("shurikenBindingWhenSyntaxSamurai")

      expect(shurikenBindingWhenSyntaxSamurai.shurikenBinding.constraint(shurikenBindingWhenSyntaxSamurai.katanaRequest)).eql(true);
      expect(shurikenBindingWhenSyntaxSamurai.shurikenBinding.constraint(shurikenBindingWhenSyntaxSamurai.shurikenRequest)).eql(false);

      let shurikenBindingWhenSyntaxNinja = getKatanaBindingWhenSyntax("shurikenBindingWhenSyntaxNinja")

      expect(shurikenBindingWhenSyntaxNinja.shurikenBinding.constraint(shurikenBindingWhenSyntaxNinja.katanaRequest)).eql(false);
      expect(shurikenBindingWhenSyntaxNinja.shurikenBinding.constraint(shurikenBindingWhenSyntaxNinja.shurikenRequest)).eql(true);

      let katanaBindingWhenSyntaxSamuraiStr = getKatanaBindingWhenSyntax("katanaBindingWhenSyntaxSamuraiStr")

      expect(katanaBindingWhenSyntaxSamuraiStr.katanaBinding.constraint(katanaBindingWhenSyntaxSamuraiStr.katanaRequest)).eql(true);
      expect(katanaBindingWhenSyntaxSamuraiStr.katanaBinding.constraint(katanaBindingWhenSyntaxSamuraiStr.shurikenRequest)).eql(false);

      let katanaBindingWhenSyntaxNinjaStr = getKatanaBindingWhenSyntax("katanaBindingWhenSyntaxNinjaStr")

      expect(katanaBindingWhenSyntaxNinjaStr.katanaBinding.constraint(katanaBindingWhenSyntaxNinjaStr.katanaRequest)).eql(false);
      expect(katanaBindingWhenSyntaxNinjaStr.katanaBinding.constraint(katanaBindingWhenSyntaxNinjaStr.shurikenRequest)).eql(true);

      let shurikenBindingWhenSyntaxSamuraiStr = getKatanaBindingWhenSyntax("shurikenBindingWhenSyntaxSamuraiStr")

      expect(shurikenBindingWhenSyntaxSamuraiStr.shurikenBinding.constraint(shurikenBindingWhenSyntaxSamuraiStr.katanaRequest)).eql(true);
      expect(shurikenBindingWhenSyntaxSamuraiStr.shurikenBinding.constraint(shurikenBindingWhenSyntaxSamuraiStr.shurikenRequest)).eql(false);

      let shurikenBindingWhenSyntaxNinjaStr = getKatanaBindingWhenSyntax("shurikenBindingWhenSyntaxNinjaStr")

      expect(shurikenBindingWhenSyntaxNinjaStr.shurikenBinding.constraint(shurikenBindingWhenSyntaxNinjaStr.katanaRequest)).eql(false);
      expect(shurikenBindingWhenSyntaxNinjaStr.shurikenBinding.constraint(shurikenBindingWhenSyntaxNinjaStr.shurikenRequest)).eql(true);

    });

    _it('Should_be_able_to_constraint_a_binding_to_a_named_parent', () => {

      interface Weapon {
        name: string;
      }

      interface JaponeseWarrior {
        katana: Weapon;
      }

      interface ChineseWarrior {
        shuriken: Weapon;
      }

      class Ninja implements ChineseWarrior {
        public shuriken: Weapon;
        public constructor(shuriken: Weapon) {
          this.shuriken = shuriken;
        }
      }

      class Samurai implements JaponeseWarrior {
        public katana: Weapon;
        public constructor(katana: Weapon) {
          this.katana = katana;
        }
      }

      const samuraiBinding = new Binding<Samurai>('Samurai', BindingScopeEnum.Transient);
      samuraiBinding.implementationType = new Samurai(Object(null));

      const context = new Context(new Container());

      const samuraiTarget:ESObject = new Target(TargetTypeEnum.ConstructorArgument, '', 'Samurai', 'japonese');
      const samuraiRequest = new Request('Samurai', context, null, samuraiBinding, samuraiTarget);
      const ninjaBinding = new Binding<Ninja>('Ninja', BindingScopeEnum.Transient);

      ninjaBinding.implementationType =  new Ninja(Object(null));

      const ninjaTarget:ESObject = new Target(TargetTypeEnum.ConstructorArgument, '', 'Ninja', 'chinese');
      const ninjaRequest = new Request('Ninja', context, null, ninjaBinding, ninjaTarget);

      const katanaBinding = new Binding<Weapon>('Weapon', BindingScopeEnum.Transient);
      const katanaBindingWhenSyntax = new BindingWhenSyntax<Weapon>(katanaBinding);
      const katanaTarget:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'katana', 'Weapon');
      const katanaRequest = new Request('Weapon', context, samuraiRequest, katanaBinding, katanaTarget);

      const shurikenBinding = new Binding<Weapon>('Weapon', BindingScopeEnum.Transient);
      const shurikenBindingWhenSyntax = new BindingWhenSyntax<Weapon>(shurikenBinding);
      const shurikenTarget:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'shuriken', 'Weapon');
      const shurikenRequest = new Request('Weapon', context, ninjaRequest, shurikenBinding, shurikenTarget);

      katanaBindingWhenSyntax.whenParentNamed('chinese');
      shurikenBindingWhenSyntax.whenParentNamed('chinese');
      expect(katanaBinding.constraint(katanaRequest)).eql(false);
      expect(shurikenBinding.constraint(shurikenRequest)).eql(true);

      katanaBindingWhenSyntax.whenParentNamed('japonese');
      shurikenBindingWhenSyntax.whenParentNamed('japonese');
      expect(katanaBinding.constraint(katanaRequest)).eql(true);
      expect(shurikenBinding.constraint(shurikenRequest)).eql(false);

    });

    _it('Should_be_able_to_constraint_a_binding_to_a_tagged_parent', () => {

      interface Weapon {
        name: string;
      }

      interface JaponeseWarrior {
        katana: Weapon;
      }

      interface ChineseWarrior {
        shuriken: Weapon;
      }

      class Ninja implements ChineseWarrior {
        public shuriken: Weapon;
        public constructor(shuriken: Weapon) {
          this.shuriken = shuriken;
        }
      }

      class Samurai implements JaponeseWarrior {
        public katana: Weapon;
        public constructor(katana: Weapon) {
          this.katana = katana;
        }
      }

      const context = new Context(new Container());

      const samuraiBinding = new Binding<Samurai>('Samurai', BindingScopeEnum.Transient);
      samuraiBinding.implementationType =  new Samurai(Object(null));

      const samuraiTarget:ESObject = new Target(TargetTypeEnum.ConstructorArgument, '', 'Samurai', new Metadata('sneaky', false));
      const samuraiRequest = new Request('Samurai', context, null, samuraiBinding, samuraiTarget);

      const ninjaBinding = new Binding<Ninja>('Ninja', BindingScopeEnum.Transient);
      ninjaBinding.implementationType =  new Ninja(Object(null));
      const ninjaTarget:ESObject = new Target(TargetTypeEnum.ConstructorArgument, '', 'Ninja', new Metadata('sneaky', true));
      const ninjaRequest = new Request('Ninja', context, null, ninjaBinding, ninjaTarget);

      const katanaBinding = new Binding<Weapon>('Weapon', BindingScopeEnum.Transient);
      const katanaBindingWhenSyntax = new BindingWhenSyntax<Weapon>(katanaBinding);
      const katanaTarget:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'katana', 'Weapon');
      const katanaRequest = new Request('Weapon', context, samuraiRequest, katanaBinding, katanaTarget);

      const shurikenBinding = new Binding<Weapon>('Weapon', BindingScopeEnum.Transient);
      const shurikenBindingWhenSyntax = new BindingWhenSyntax<Weapon>(shurikenBinding);
      const shurikenTarget:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'shuriken', 'Weapon');
      const shurikenRequest = new Request('Weapon', context, ninjaRequest, shurikenBinding, shurikenTarget);

      katanaBindingWhenSyntax.whenParentTagged('sneaky', true);
      shurikenBindingWhenSyntax.whenParentTagged('sneaky', true);
      expect(katanaBinding.constraint(katanaRequest)).eql(false);
      expect(shurikenBinding.constraint(shurikenRequest)).eql(true);

      katanaBindingWhenSyntax.whenParentTagged('sneaky', false);
      shurikenBindingWhenSyntax.whenParentTagged('sneaky', false);
      expect(katanaBinding.constraint(katanaRequest)).eql(true);
      expect(shurikenBinding.constraint(shurikenRequest)).eql(false);

    });



    _it('Should_be_able_to_apply_a_type_constraint_to_some_of_its_ancestors', () => {

      let  shurikenBindingWhenSyntaxNinjaMaster = getBindingWhenSyntax("shurikenBindingWhenSyntaxNinjaMaster")
      expect(shurikenBindingWhenSyntaxNinjaMaster.shurikenBinding.constraint(shurikenBindingWhenSyntaxNinjaMaster.woodShurikenRequest)).eql(false);
      expect(shurikenBindingWhenSyntaxNinjaMaster.shurikenBinding.constraint(shurikenBindingWhenSyntaxNinjaMaster.ironShurikenRequest)).eql(true);

      let  shurikenBindingWhenSyntaxNinjaStudent = getBindingWhenSyntax("shurikenBindingWhenSyntaxNinjaStudent")
      expect(shurikenBindingWhenSyntaxNinjaStudent.shurikenBinding.constraint(shurikenBindingWhenSyntaxNinjaStudent.woodShurikenRequest)).eql(true);
      expect(shurikenBindingWhenSyntaxNinjaStudent.shurikenBinding.constraint(shurikenBindingWhenSyntaxNinjaStudent.ironShurikenRequest)).eql(false);

      let  katanaBindingWhenSyntaxSamuraiMaster = getBindingWhenSyntax("katanaBindingWhenSyntaxSamuraiMaster")
      expect(katanaBindingWhenSyntaxSamuraiMaster.katanaBinding.constraint(katanaBindingWhenSyntaxSamuraiMaster.woodKatanaRequest)).eql(false);
      expect(katanaBindingWhenSyntaxSamuraiMaster.katanaBinding.constraint(katanaBindingWhenSyntaxSamuraiMaster.ironKatanaRequest)).eql(true);

      let  katanaBindingWhenSyntaxSamuraiStudent = getBindingWhenSyntax("katanaBindingWhenSyntaxSamuraiStudent")
      expect(katanaBindingWhenSyntaxSamuraiStudent.katanaBinding.constraint(katanaBindingWhenSyntaxSamuraiStudent.woodKatanaRequest)).eql(true);
      expect(katanaBindingWhenSyntaxSamuraiStudent.katanaBinding.constraint(katanaBindingWhenSyntaxSamuraiStudent.ironKatanaRequest)).eql(false);

    });

    _it('Should_be_able_to_apply_a_type_constraint_to_none_of_its_ancestors', () => {

      let  shurikenBindingWhenSyntaxIsNinjaMaster = getBindingWhenSyntax("shurikenBindingWhenSyntaxIsNinjaMaster")
      expect(shurikenBindingWhenSyntaxIsNinjaMaster.shurikenBinding.constraint(shurikenBindingWhenSyntaxIsNinjaMaster.woodShurikenRequest)).eql(true);
      expect(shurikenBindingWhenSyntaxIsNinjaMaster.shurikenBinding.constraint(shurikenBindingWhenSyntaxIsNinjaMaster.ironShurikenRequest)).eql(false);

      let  shurikenBindingWhenSyntaxIsNinjaStudent = getBindingWhenSyntax("shurikenBindingWhenSyntaxIsNinjaStudent")
      expect(shurikenBindingWhenSyntaxIsNinjaStudent.shurikenBinding.constraint(shurikenBindingWhenSyntaxIsNinjaStudent.woodShurikenRequest)).eql(false);
      expect(shurikenBindingWhenSyntaxIsNinjaStudent.shurikenBinding.constraint(shurikenBindingWhenSyntaxIsNinjaStudent.ironShurikenRequest)).eql(true);

      let  katanaBindingWhenSyntaxIsSamuraiMaster = getBindingWhenSyntax("katanaBindingWhenSyntaxIsSamuraiMaster")
      expect(katanaBindingWhenSyntaxIsSamuraiMaster.katanaBinding.constraint(katanaBindingWhenSyntaxIsSamuraiMaster.woodKatanaRequest)).eql(true);
      expect(katanaBindingWhenSyntaxIsSamuraiMaster.katanaBinding.constraint(katanaBindingWhenSyntaxIsSamuraiMaster.ironKatanaRequest)).eql(false);

      let  katanaBindingWhenSyntaxIsSamuraiStudent = getBindingWhenSyntax("katanaBindingWhenSyntaxIsSamuraiStudent")
      expect(katanaBindingWhenSyntaxIsSamuraiStudent.katanaBinding.constraint(katanaBindingWhenSyntaxIsSamuraiStudent.woodKatanaRequest)).eql(false);
      expect(katanaBindingWhenSyntaxIsSamuraiStudent.katanaBinding.constraint(katanaBindingWhenSyntaxIsSamuraiStudent.ironKatanaRequest)).eql(true);

    });

    _it('Should_be_able_to_apply_a_named_constraint_to_some_of_its_ancestors', () => {

      shurikenBindingWhenSyntax.whenAnyAncestorNamed('chinese');
      expect(shurikenBinding.constraint(woodShurikenRequest)).eql(false);
      expect(shurikenBinding.constraint(ironShurikenRequest)).eql(false);

      shurikenBindingWhenSyntax.whenAnyAncestorNamed('chinese');
      expect(shurikenBinding.constraint(woodShurikenRequest)).eql(false);
      expect(shurikenBinding.constraint(ironShurikenRequest)).eql(false);

      katanaBindingWhenSyntax.whenAnyAncestorNamed('japonese');
      expect(katanaBinding.constraint(woodKatanaRequest)).eql(false);
      expect(katanaBinding.constraint(ironKatanaRequest)).eql(false);

      katanaBindingWhenSyntax.whenAnyAncestorNamed('japonese');
      expect(katanaBinding.constraint(woodKatanaRequest)).eql(false);
      expect(katanaBinding.constraint(ironKatanaRequest)).eql(false);

    });

    _it('Should_be_able_to_apply_a_named_constraint_to_none_of_its_ancestors', () => {

      shurikenBindingWhenSyntax.whenNoAncestorNamed('chinese');
      expect(shurikenBinding.constraint(woodShurikenRequest)).eql(true);
      expect(shurikenBinding.constraint(ironShurikenRequest)).eql(true);

      shurikenBindingWhenSyntax.whenNoAncestorNamed('chinese');
      expect(shurikenBinding.constraint(woodShurikenRequest)).eql(true);
      expect(shurikenBinding.constraint(ironShurikenRequest)).eql(true);

      katanaBindingWhenSyntax.whenNoAncestorNamed('japonese');
      expect(katanaBinding.constraint(woodKatanaRequest)).eql(true);
      expect(katanaBinding.constraint(ironKatanaRequest)).eql(true);

      katanaBindingWhenSyntax.whenNoAncestorNamed('japonese');
      expect(katanaBinding.constraint(woodKatanaRequest)).eql(true);
      expect(katanaBinding.constraint(ironKatanaRequest)).eql(true);

    });

    _it('Should_be_able_to_apply_a_tagged_constraint_to_some_of_its_ancestors', () => {

      shurikenBindingWhenSyntax.whenAnyAncestorTagged('sneaky', true);
      expect(shurikenBinding.constraint(woodShurikenRequest)).eql(true);
      expect(shurikenBinding.constraint(ironShurikenRequest)).eql(true);

      shurikenBindingWhenSyntax.whenAnyAncestorTagged('sneaky', false);
      expect(shurikenBinding.constraint(woodShurikenRequest)).eql(false);
      expect(shurikenBinding.constraint(ironShurikenRequest)).eql(false);

      katanaBindingWhenSyntax.whenAnyAncestorTagged('sneaky', true);
      expect(katanaBinding.constraint(woodKatanaRequest)).eql(false);
      expect(katanaBinding.constraint(ironKatanaRequest)).eql(false);

      katanaBindingWhenSyntax.whenAnyAncestorTagged('sneaky', false);
      expect(katanaBinding.constraint(woodKatanaRequest)).eql(true);
      expect(katanaBinding.constraint(ironKatanaRequest)).eql(true);

    });

    _it('Should_be_able_to_apply_a_tagged_constraint_to_none_of_its_ancestors', () => {

      shurikenBindingWhenSyntax.whenNoAncestorTagged('sneaky', true);
      expect(shurikenBinding.constraint(woodShurikenRequest)).eql(false);
      expect(shurikenBinding.constraint(ironShurikenRequest)).eql(false);

      shurikenBindingWhenSyntax.whenNoAncestorTagged('sneaky', false);
      expect(shurikenBinding.constraint(woodShurikenRequest)).eql(true);
      expect(shurikenBinding.constraint(ironShurikenRequest)).eql(true);

      katanaBindingWhenSyntax.whenNoAncestorTagged('sneaky', true);
      expect(katanaBinding.constraint(woodKatanaRequest)).eql(true);
      expect(katanaBinding.constraint(ironKatanaRequest)).eql(true);

      katanaBindingWhenSyntax.whenNoAncestorTagged('sneaky', false);
      expect(katanaBinding.constraint(woodKatanaRequest)).eql(false);
      expect(katanaBinding.constraint(ironKatanaRequest)).eql(false);

    });

    _it('Should_be_able_to_apply_a_custom_constraint_to_some_of_its_ancestors', () => {
      // 要改

      let  shurikenBindingWhenSyntaxNinjaMasterConstraint = getBindingWhenSyntax("shurikenBindingWhenSyntaxNinjaMasterConstraint")
      expect(shurikenBindingWhenSyntaxNinjaMasterConstraint.shurikenBinding.constraint(shurikenBindingWhenSyntaxNinjaMasterConstraint.woodShurikenRequest)).eql(false);
      expect(shurikenBindingWhenSyntaxNinjaMasterConstraint.shurikenBinding.constraint(shurikenBindingWhenSyntaxNinjaMasterConstraint.ironShurikenRequest)).eql(true);

      let  shurikenBindingWhenSyntaxNinjaStudentConstraint = getBindingWhenSyntax("shurikenBindingWhenSyntaxNinjaStudentConstraint")
      expect(shurikenBindingWhenSyntaxNinjaStudentConstraint.shurikenBinding.constraint(shurikenBindingWhenSyntaxNinjaStudentConstraint.woodShurikenRequest)).eql(true);
      expect(shurikenBindingWhenSyntaxNinjaStudentConstraint.shurikenBinding.constraint(shurikenBindingWhenSyntaxNinjaStudentConstraint.ironShurikenRequest)).eql(false);

      let  katanaBindingWhenSyntaxSamuraiMasterConstraint = getBindingWhenSyntax("katanaBindingWhenSyntaxSamuraiMasterConstraint")
      expect(katanaBindingWhenSyntaxSamuraiMasterConstraint.katanaBinding.constraint(katanaBindingWhenSyntaxSamuraiMasterConstraint.woodKatanaRequest)).eql(false);
      expect(katanaBindingWhenSyntaxSamuraiMasterConstraint.katanaBinding.constraint(katanaBindingWhenSyntaxSamuraiMasterConstraint.ironKatanaRequest)).eql(true);

      let  katanaBindingWhenSyntaxSamuraiStudentConstraint = getBindingWhenSyntax("katanaBindingWhenSyntaxSamuraiStudentConstraint")
      expect(katanaBindingWhenSyntaxSamuraiStudentConstraint.katanaBinding.constraint(katanaBindingWhenSyntaxSamuraiStudentConstraint.woodKatanaRequest)).eql(true);
      expect(katanaBindingWhenSyntaxSamuraiStudentConstraint.katanaBinding.constraint(katanaBindingWhenSyntaxSamuraiStudentConstraint.ironKatanaRequest)).eql(false);

    });

    _it('Should_be_able_to_apply_a_custom_constraint_to_none_of_its_ancestors', () => {

      let  shurikenBindingWhenSyntaxNoneNinjaMasterConstraint = getBindingWhenSyntax("shurikenBindingWhenSyntaxNoneNinjaMasterConstraint")
      expect(shurikenBindingWhenSyntaxNoneNinjaMasterConstraint.shurikenBinding.constraint(shurikenBindingWhenSyntaxNoneNinjaMasterConstraint.woodShurikenRequest)).eql(true);
      expect(shurikenBindingWhenSyntaxNoneNinjaMasterConstraint.shurikenBinding.constraint(shurikenBindingWhenSyntaxNoneNinjaMasterConstraint.ironShurikenRequest)).eql(false);

      let  shurikenBindingWhenSyntaxNoneNinjaStudentConstraint = getBindingWhenSyntax("shurikenBindingWhenSyntaxNoneNinjaStudentConstraint")
      expect(shurikenBindingWhenSyntaxNoneNinjaStudentConstraint.shurikenBinding.constraint(shurikenBindingWhenSyntaxNoneNinjaStudentConstraint.woodShurikenRequest)).eql(false);
      expect(shurikenBindingWhenSyntaxNoneNinjaStudentConstraint.shurikenBinding.constraint(shurikenBindingWhenSyntaxNoneNinjaStudentConstraint.ironShurikenRequest)).eql(true);

      let  katanaBindingWhenSyntaxNoneSamuraiMasterConstraint = getBindingWhenSyntax("katanaBindingWhenSyntaxNoneSamuraiMasterConstraint")
      expect(katanaBindingWhenSyntaxNoneSamuraiMasterConstraint.katanaBinding.constraint(katanaBindingWhenSyntaxNoneSamuraiMasterConstraint.woodKatanaRequest)).eql(true);
      expect(katanaBindingWhenSyntaxNoneSamuraiMasterConstraint.katanaBinding.constraint(katanaBindingWhenSyntaxNoneSamuraiMasterConstraint.ironKatanaRequest)).eql(false);

      let  katanaBindingWhenSyntaxNoneSamuraiStudentConstraint = getBindingWhenSyntax("katanaBindingWhenSyntaxNoneSamuraiStudentConstraint")
      expect(katanaBindingWhenSyntaxNoneSamuraiStudentConstraint.katanaBinding.constraint(katanaBindingWhenSyntaxNoneSamuraiStudentConstraint.woodKatanaRequest)).eql(false);
      expect(katanaBindingWhenSyntaxNoneSamuraiStudentConstraint.katanaBinding.constraint(katanaBindingWhenSyntaxNoneSamuraiStudentConstraint.ironKatanaRequest)).eql(true);
    });
  })
}