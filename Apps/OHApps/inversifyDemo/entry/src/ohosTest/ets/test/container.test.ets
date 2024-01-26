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
import * as ns from "reflect-metadata";
import { inject } from 'inversify';
import { injectable } from 'inversify';
import { postConstruct } from 'inversify';
import * as ERROR_MSGS from 'inversify/lib/constants/error_msgs';
import { BindingScopeEnum } from 'inversify';
import { Container } from 'inversify';
import { ContainerModule } from 'inversify';
import { ModuleActivationStore } from 'inversify/lib/container/module_activation_store';
import { interfaces } from 'inversify/lib/interfaces/interfaces';
import { getBindingDictionary } from 'inversify/lib/planning/planner';
import { getServiceIdentifierAsString } from 'inversify/lib/utils/serialization';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it as _it, expect } from '../utils/util'
import {  symbolFor } from '../tools/symbol';
import { arrayConversion1, configure, contaierInstance, prioritize,
  weaponProperty1,
  services,
  possible
} from "../tools/contaierInstanceof"
ns;


export default function containerTest() {
  type Dictionary = Map<interfaces.ServiceIdentifier, interfaces.Binding<ESObject>[]>;

  describe('containerTest',  ()=> {
    _it('Should_be_able_to_use_modules_as_configuration', () => {

      interface Ninja1 { }
      interface Katana1 { }
      interface Shuriken1 { }

      @injectable()
      class Katana implements Katana1 { }

      @injectable()
      class Shuriken implements Shuriken1 { }

      @injectable()
      class Ninja implements Ninja1 { }

      const warriors = new ContainerModule((bind: interfaces.Bind) => {
        bind<Ninja>('Ninja').to(Ninja);
      });

      const weapons = new ContainerModule((bind: interfaces.Bind) => {
        bind<Katana>('Katana').to(Katana);
        bind<Shuriken>('Shuriken').to(Shuriken);
      });

      const container = new Container();
      container.load(warriors, weapons);

      let map: Dictionary = getBindingDictionary(container).getMap();
      expect(map.has('Ninja')).equal(true);
      expect(map.has('Katana')).equal(true);
      expect(map.has('Shuriken')).equal(true);
      expect(map.size).equal(3);

      const tryGetKatana = () => { container.get('Katana'); };
      const tryGetShuruken = () => { container.get('Shuriken'); };

      container.unload(warriors);
      map = getBindingDictionary(container).getMap();
      expect(map.size).equal(2);
      expect(tryGetKatana).not.to.throw();
      expect(tryGetShuruken).not.to.throw();

      container.unload(weapons);
      map = getBindingDictionary(container).getMap();
      expect(map.size).equal(0);
    });

    _it('Should_be_able_to_store_bindings', () => {

      interface Ninja1 { }

      @injectable()
      class Ninja implements Ninja1 { }
      const ninjaId = 'Ninja';

      const container = new Container();
      container.bind<Ninja>(ninjaId).to(Ninja);

      const map: Dictionary = getBindingDictionary(container).getMap();
      expect(map.size).equal(1);
      expect(map.has(ninjaId)).equal(true);

    });

    _it('Should_have_an_unique_identifier', () => {

      const container1 = new Container();
      const container2 = new Container();
      expect(container1.id).to.be.a('number');
      expect(container2.id).to.be.a('number');
      expect(container1.id).not.equal(container2.id);

    });

    _it('Should_unbind_a_binding_when_requested', () => {

      interface Ninja1 { }

      @injectable()
      class Ninja implements Ninja1 { }
      const ninjaId = 'Ninja';

      const container = new Container();
      container.bind<Ninja>(ninjaId).to(Ninja);

      const map: Dictionary = getBindingDictionary(container).getMap();
      expect(map.has(ninjaId)).equal(true);

      container.unbind(ninjaId);
      expect(map.has(ninjaId)).equal(false);
      expect(map.size).equal(0);

    });

    _it('Should_throw_when_cannot_unbind', () => {
      const serviceIdentifier = 'Ninja';
      const container = new Container();
      const throwFunction = () => { container.unbind(serviceIdentifier); };
      expect(throwFunction).to.throw(`${ERROR_MSGS.CANNOT_UNBIND} ${getServiceIdentifierAsString(serviceIdentifier)}`);
    });

    _it('Should_throw_when_cannot_unbind_(async)', async () => {
      const serviceIdentifier = 'Ninja';
      const container = new Container();

      try {
        await container.unbindAsync(serviceIdentifier);
      } catch (err) {
        expect((err as Error).message).to.eql(`${ERROR_MSGS.CANNOT_UNBIND} ${getServiceIdentifierAsString(serviceIdentifier)}`);
      }
    });

    _it('Should_unbind_a_binding_when_requested', () => {

      interface Ninja1 { }

      @injectable()
      class Ninja implements Ninja1 { }
      interface Samurai1 { }

      @injectable()
      class Samurai implements Samurai1 { }

      const ninjaId = 'Ninja';
      const samuraiId = 'Samurai';

      const container = new Container();
      container.bind<Ninja>(ninjaId).to(Ninja);
      container.bind<Samurai>(samuraiId).to(Samurai);

      let map: Dictionary = getBindingDictionary(container).getMap();

      expect(map.size).equal(2);
      expect(map.has(ninjaId)).equal(true);
      expect(map.has(samuraiId)).equal(true);

      container.unbind(ninjaId);
      map = getBindingDictionary(container).getMap();
      expect(map.size).equal(1);

    });

    _it('Should_be_able_unbound_all_dependencies', () => {

      interface Ninja1 { }

      @injectable()
      class Ninja implements Ninja1 { }

      interface Samurai1 { }

      @injectable()
      class Samurai implements Samurai1 { }

      const ninjaId = 'Ninja';
      const samuraiId = 'Samurai';

      const container = new Container();
      container.bind<Ninja>(ninjaId).to(Ninja);
      container.bind<Samurai>(samuraiId).to(Samurai);

      let map: Dictionary = getBindingDictionary(container).getMap();

      expect(map.size).equal(2);
      expect(map.has(ninjaId)).equal(true);
      expect(map.has(samuraiId)).equal(true);

      container.unbindAll();
      map = getBindingDictionary(container).getMap();
      expect(map.size).equal(0);

    });

    _it('Should_NOT_be_able_to_get_unregistered_services', () => {

      interface Ninja1 { }

      @injectable()
      class Ninja implements Ninja1 { }
      const ninjaId = 'Ninja';

      const container = new Container();
      const throwFunction = () => { container.get<Ninja>(ninjaId); };

      expect(throwFunction).to.throw(`${ERROR_MSGS.NOT_REGISTERED} ${ninjaId}`);
    });

    _it('Should_NOT_be_able_to_get_ambiguous_match', () => {

      interface Warrior { }

      @injectable()
      class Ninja implements Warrior { }

      @injectable()
      class Samurai implements Warrior { }

      const warriorId = 'Warrior';

      const container = new Container();
      container.bind<Warrior>(warriorId).to(Ninja);
      container.bind<Warrior>(warriorId).to(Samurai);

      const dictionary: Dictionary = getBindingDictionary(container).getMap();

      expect(dictionary.size).equal(1);
      dictionary.forEach((value:ESObject, key) => {
        expect(key).equal(warriorId);
        expect(value.length).equal(2);
      });



    });

    _it('Should_NOT_be_able_to_getAll_of_an_unregistered_services', () => {

      interface Ninja1 { }

      @injectable()
      class Ninja implements Ninja1 { }
      const ninjaId = 'Ninja';

      const container = new Container();
      const throwFunction = () => { container.getAll<Ninja>(ninjaId); };

      expect(throwFunction).to.throw(`${ERROR_MSGS.NOT_REGISTERED} ${ninjaId}`);

    });

    _it('Should_be_able_to_get_a_string_literal_identifier_as_a_string', () => {
      const Katana = 'Katana';
      const KatanaStr = getServiceIdentifierAsString(Katana);
      expect(KatanaStr).to.equal('Katana');
    });

    _it('Should_be_able_to_get_a_symbol_identifier_as_a_string', () => {
      const KatanaSymbol = symbolFor('Katana');
      const KatanaStr = getServiceIdentifierAsString(KatanaSymbol);
      expect(KatanaStr).to.equal('Symbol(Katana)');
    });

    _it('Should_be_able_to_get_a_class_identifier_as_a_string', () => {
      class Katana { }
      const KatanaStr = getServiceIdentifierAsString(Katana);
      expect(KatanaStr).to.equal('Katana');
    });

    _it('Should_be_able_to_snapshot_and_restore_container', () => {

      interface Warrior {
      }

      @injectable()
      class Ninja implements Warrior { }

      @injectable()
      class Samurai implements Warrior { }

      const container = new Container();
      container.bind<Warrior>(Ninja).to(Ninja);
      container.bind<Warrior>(Samurai).to(Samurai);
      let contaierInstance1:Boolean = contaierInstance("Samurai")
      expect(contaierInstance1).equal(true)

      let contaierInstance2:Boolean = contaierInstance("Ninja")
      expect(contaierInstance2).equal(true)


      container.snapshot(); // snapshot container = v1

      container.unbind(Ninja);

      let contaierInstance3:Boolean = contaierInstance("Samurai")
      expect(contaierInstance3).equal(true)
      expect(() => container.get(Ninja)).to.throw();

      container.snapshot(); // snapshot container = v2
      expect(() => container.get(Ninja)).to.throw();

      container.bind<Warrior>(Ninja).to(Ninja);
      let contaierInstance4:Boolean = contaierInstance("Samurai")
      expect(contaierInstance4).equal(true)

      let contaierInstance5:Boolean = contaierInstance("Ninja")
      expect(contaierInstance5).equal(true)


      container.restore(); // restore container to v2
      let contaierInstance6:Boolean = contaierInstance("Samurai")
      expect(contaierInstance6).equal(true)
      expect(() => container.get(Ninja)).to.throw();

      container.restore(); // restore container to v1
      let contaierInstance7:Boolean = contaierInstance("Samurai")
      expect(contaierInstance7).equal(true)

      let contaierInstance8:Boolean = contaierInstance("Ninja")
      expect(contaierInstance8).equal(true)


    });

    _it('Should_maintain_the_activation_state_of_a_singleton_when_doing_a_snapshot_of_a_container', () => {

      let timesCalled = 0;

      @injectable()
      class Ninja {
        @postConstruct()
        public postConstruct() {
          timesCalled++;
        }
      }

      const container = new Container();

      container.bind<Ninja>(Ninja).to(Ninja).inSingletonScope();

      container.get<Ninja>(Ninja);
      container.snapshot();
      container.restore();
      container.get<Ninja>(Ninja);

      expect(timesCalled).to.be.equal(1);
    });

    _it('Should_save_and_restore_the_container_activations_and_deactivations_when_snapshot_and_restore', () => {
      const sid = 'sid';
      const container = new Container();
      container.bind<string>(sid).toConstantValue('Value');

      let activated = false;
      let deactivated = false

      container.snapshot();

      container.onActivation<string>(sid, (c, i) => {
        activated = true;
        return i;
      });
      container.onDeactivation(sid, (i:ESObject) => {
        deactivated = true;
      });

      container.restore();

      container.get(sid);
      container.unbind(sid);

      expect(activated).to.equal(false);
      expect(deactivated).to.equal(false);
    })

    _it('Should_save_and_restore_the_module_activation_store_when_snapshot_and_restore', () => {
      const container = new Container();
      const clonedActivationStore = new ModuleActivationStore();
      const originalActivationStore:ESObject = {
        clone() {
          return clonedActivationStore;
        }
      }
      const anyContainer: ESObject = container;
      anyContainer._moduleActivationStore = originalActivationStore;
      container.snapshot();
      const snapshot = anyContainer._snapshots[0] as interfaces.ContainerSnapshot;
      expect(snapshot.moduleActivationStore === clonedActivationStore).to.equal(true);
      container.restore();
      expect(anyContainer._moduleActivationStore === clonedActivationStore).to.equal(true);
    })

    _it('Should_be_able_to_check_is_there_are_bindings_available_for_a_given_identifier', () => {

      interface Warrior { }
      const warriorId = 'Warrior';
      const warriorSymbol = symbolFor('Warrior');

      @injectable()
      class Ninja implements Warrior { }

      const container = new Container();
      container.bind<Warrior>(Ninja).to(Ninja);
      container.bind<Warrior>(warriorId).to(Ninja);
      container.bind<Warrior>(warriorSymbol).to(Ninja);

      expect(container.isBound(Ninja)).equal(true);
      expect(container.isBound(warriorId)).equal(true);
      expect(container.isBound(warriorSymbol)).equal(true);

      interface Katana1 { }
      const katanaId = 'Katana';
      const katanaSymbol = symbolFor('Katana');

      @injectable()
      class Katana implements Katana1 { }

      expect(container.isBound(Katana)).equal(false);
      expect(container.isBound(katanaId)).equal(false);
      expect(container.isBound(katanaSymbol)).equal(false);

    });

    _it('Should_be_able_to_check_is_there_are_bindings_available_for_a_given_identifier_only_in_current_container', () => {

      interface Warrior { }

      @injectable()
      class Ninja implements Warrior { }

      const containerParent = new Container();
      const containerChild = new Container();

      containerChild.parent = containerParent;

      containerParent.bind<Warrior>(Ninja).to(Ninja);

      expect(containerParent.isBound(Ninja)).to.eql(true);
      expect(containerParent.isCurrentBound(Ninja)).to.eql(true);
      expect(containerChild.isBound(Ninja)).to.eql(true);
      expect(containerChild.isCurrentBound(Ninja)).to.eql(false);
    });

    _it('Should_be_able_to_get_services_from_parent_container', () => {
      const weaponIdentifier = 'Weapon';
      let results =services()
      @injectable()
      class Katana { }

      const container = new Container();
      container.bind(weaponIdentifier).to(Katana);

      const childContainer = new Container();
      childContainer.parent = container;

      const secondChildContainer = new Container();
      secondChildContainer.parent = childContainer;

      expect(results.boo).equal(true);
    });

    _it('Should_be_able_to_check_if_services_are_bound_from_parent_container', () => {
      const weaponIdentifier = 'Weapon';

      @injectable()
      class Katana { }

      const container = new Container();
      container.bind(weaponIdentifier).to(Katana);

      const childContainer = new Container();
      childContainer.parent = container;

      const secondChildContainer = new Container();
      secondChildContainer.parent = childContainer;

      expect(secondChildContainer.isBound(weaponIdentifier)).to.be.equal(true);
    });

    _it('Should_prioritize_requested_container_to_resolve_a_service_identifier', () => {
      const weaponIdentifier = 'Weapon';
      let res=prioritize()
      @injectable()
      class Katana { }

      @injectable()
      class DivineRapier { }

      const container = new Container();
      container.bind(weaponIdentifier).to(Katana);

      const childContainer = new Container();
      childContainer.parent = container;

      const secondChildContainer = new Container();
      secondChildContainer.parent = childContainer;
      secondChildContainer.bind(weaponIdentifier).to(DivineRapier);

      expect(res.boo).equal(true);
    });

    _it('Should_be_able_to_resolve_named_multi-injection', () => {

      interface Intl {
        hello?: string;
        goodbye?: string;
      }

      const container = new Container();
      container.bind<Intl>('Intl').toConstantValue({ hello: 'bonjour' }).whenTargetNamed('fr');
      container.bind<Intl>('Intl').toConstantValue({ goodbye: 'au revoir' }).whenTargetNamed('fr');
      container.bind<Intl>('Intl').toConstantValue({ hello: 'hola' }).whenTargetNamed('es');
      container.bind<Intl>('Intl').toConstantValue({ goodbye: 'adios' }).whenTargetNamed('es');

      const fr = container.getAllNamed<Intl>('Intl', 'fr');
      expect(fr.length).to.equal(2);
      expect(fr[0]?.hello).to.equal('bonjour');
      expect(fr[1]?.goodbye).to.equal('au revoir');

      const es = container.getAllNamed<Intl>('Intl', 'es');
      expect(es.length).to.equal(2);
      expect(es[0]?.hello).to.equal('hola');
      expect(es[1]?.goodbye).to.equal('adios');

    });

    _it('Should_be_able_to_resolve_tagged_multi-injection', () => {

      interface Intl {
        hello?: string;
        goodbye?: string;
      }

      const container = new Container();
      container.bind<Intl>('Intl').toConstantValue({ hello: 'bonjour' }).whenTargetTagged('lang', 'fr');
      container.bind<Intl>('Intl').toConstantValue({ goodbye: 'au revoir' }).whenTargetTagged('lang', 'fr');
      container.bind<Intl>('Intl').toConstantValue({ hello: 'hola' }).whenTargetTagged('lang', 'es');
      container.bind<Intl>('Intl').toConstantValue({ goodbye: 'adios' }).whenTargetTagged('lang', 'es');

      const fr = container.getAllTagged<Intl>('Intl', 'lang', 'fr');
      expect(fr.length).to.equal(2);
      expect(fr[0]?.hello).to.equal('bonjour');
      expect(fr[1]?.goodbye).to.equal('au revoir');

      const es = container.getAllTagged<Intl>('Intl', 'lang', 'es');
      expect(es.length).to.equal(2);
      expect(es[0]?.hello).to.equal('hola');
      expect(es[1]?.goodbye).to.equal('adios');

    });

    _it('Should_be_able_configure_the_default_scope_at_a_global_level', () => {

      interface Warrior {
        health: number;
        takeH_it(damage: number): void;
      }

      @injectable()
      class Ninja implements Warrior {
        public health: number;
        public constructor() {
          this.health = 100;
        }
        public takeH_it(damage: number) {
          this.health = this.health - damage;
        }
      }
      interface TYPE{
        Warrior: string;
      }
      const TYPES:TYPE = {
        Warrior: 'Warrior'
      };

      const container1 = new Container();
      container1.bind<Warrior>(TYPES.Warrior).to(Ninja);

      const transientNinja1 = container1.get<Warrior>(TYPES.Warrior);
      expect(transientNinja1.health).to.equal(100);
      transientNinja1.takeH_it(10);
      expect(transientNinja1.health).to.equal(90);

      const transientNinja2 = container1.get<Warrior>(TYPES.Warrior);
      expect(transientNinja2.health).to.equal(100);
      transientNinja2.takeH_it(10);
      expect(transientNinja2.health).to.equal(90);

      const container2 = new Container({ defaultScope: BindingScopeEnum.Singleton });
      container2.bind<Warrior>(TYPES.Warrior).to(Ninja);

      const singletonNinja1 = container2.get<Warrior>(TYPES.Warrior);
      expect(singletonNinja1.health).to.equal(100);
      singletonNinja1.takeH_it(10);
      expect(singletonNinja1.health).to.equal(90);

      const singletonNinja2 = container2.get<Warrior>(TYPES.Warrior);
      expect(singletonNinja2.health).to.equal(90);
      singletonNinja2.takeH_it(10);
      expect(singletonNinja2.health).to.equal(80);

    });

    _it('Should_default_binding_scope_to_Transient_if_no_default_scope_on_options', () => {
      const container = new Container();
      container.options.defaultScope = undefined;
      const expectedScope: interfaces.BindingScope = 'Transient';
      interface scope{ scope: interfaces.BindingScope }
      interface _binding{ _binding:scope  }
      expect((container.bind('SID') as ESObject as _binding )._binding.scope).to.equal(expectedScope);
    });
    _it('Should_be_able_to_configure_automatic_binding_for_@injectable()_decorated_classes', () => {

      let res =configure()
      const container1 = new Container({ autoBindInjectable: true });
      const katana1 = container1.get(res.Katana);
      const ninja1 = container1.get(res.Ninja);
      expect(res.boo).equal(true);
      expect(katana1).to.not.equal(container1.get(res.Katana));
      expect(res.boo1).equal(true);
      expect(ninja1).to.not.equal(container1.get(res.Ninja));
      expect(res.boo2).equal(true);
      expect(ninja1.weapon).to.not.equal(container1.get(res.Ninja).weapon);
      expect(ninja1.weapon).to.not.equal(katana1);

      const container2 = new Container({ defaultScope: BindingScopeEnum.Singleton, autoBindInjectable: true });
      const katana2 = container2.get(res.Katana);
      const ninja2 = container2.get(res.Ninja);
      expect(res.boo3).equal(true);
      expect(katana2).to.equal(container2.get(res.Katana));
      expect(res.boo4).equal(true);
      expect(ninja2).to.equal(container2.get(res.Ninja));
      expect(res.boo5).equal(true);
      expect(ninja2.weapon).to.equal(container2.get(res.Ninja).weapon);
      expect(ninja2.weapon).to.equal(katana2);

      const container3 = new Container({ autoBindInjectable: true });
      container3.bind(res.Katana).toSelf().inSingletonScope();
      const katana3 = container3.get(res.Katana);
      const ninja3 = container3.get(res.Ninja);
      expect(res.boo6).equal(true);
      expect(katana3).to.equal(container3.get(res.Katana));
      expect(res.boo7).equal(true);
      expect(ninja3).to.not.equal(container3.get(res.Ninja));
      expect(res.boo8).equal(true);
      expect(ninja3.weapon).to.equal(container3.get(res.Ninja).weapon);
      expect(ninja3.weapon).to.equal(katana3);

      const container4 = new Container({ autoBindInjectable: true });
      container4.bind(res.Katana).to(res.Shuriken);
      const katana4 = container4.get(res.Katana);
      const ninja4 = container4.get(res.Ninja);
      expect(res.boo9).equal(true);
      expect(katana4).to.not.equal(container4.get(res.Katana));
      expect(res.boo10).equal(true);
      expect(ninja4).to.not.equal(container4.get(res.Ninja));
      expect(res.boo11).equal(true);
      expect(ninja4.weapon).to.not.equal(container4.get(res.Ninja).weapon);
      expect(ninja4.weapon).to.not.equal(katana4);

    });

    _it('Should_be_throw_an_exception_if_incorrect_options_is_provided', () => {

      const invalidOptions1 = () => 0;
      const wrong1 = () => new Container(invalidOptions1 as ESObject as interfaces.ContainerOptions);
      expect(wrong1).to.throw(`${ERROR_MSGS.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT}`);
      interface  autoBindInjectable{ autoBindInjectable: string; }
      const invalidOptions2:autoBindInjectable = { autoBindInjectable: 'wrongValue' };
      const wrong2 = () => new Container(invalidOptions2 as ESObject as interfaces.ContainerOptions);
      expect(wrong2).to.throw(`${ERROR_MSGS.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE}`);
      interface defaultScope { defaultScope: string; }
      const invalidOptions3:defaultScope = { defaultScope: 'wrongValue' };
      const wrong3 = () => new Container(invalidOptions3 as ESObject as interfaces.ContainerOptions);
      expect(wrong3).to.throw(`${ERROR_MSGS.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE}`);

    });

    _it('Should_be_able_to_merge_two_containers', () => {

      @injectable()
      class Ninja {
        public name = 'Ninja';
      }

      @injectable()
      class Shuriken {
        public name = 'Shuriken';
      }
      interface  CHINA_EXPANSION_TYPE {
        Ninja: string;
        Shuriken: string;
      }
      const CHINA_EXPANSION_TYPES:CHINA_EXPANSION_TYPE = {
        Ninja: 'Ninja',
        Shuriken: 'Shuriken'
      };

      const chinaExpansionContainer = new Container();
      chinaExpansionContainer.bind<Ninja>(CHINA_EXPANSION_TYPES.Ninja).to(Ninja);
      chinaExpansionContainer.bind<Shuriken>(CHINA_EXPANSION_TYPES.Shuriken).to(Shuriken);

      @injectable()
      class Samurai {
        public name = 'Samurai';
      }

      @injectable()
      class Katana {
        public name = 'Katana';
      }
      interface JAPAN_EXPANSION_TYPE{
        Katana: string;
        Samurai: string;
      }
      const JAPAN_EXPANSION_TYPES:JAPAN_EXPANSION_TYPE = {
        Katana: 'Katana',
        Samurai: 'Samurai'
      };

      const japanExpansionContainer = new Container();
      japanExpansionContainer.bind<Samurai>(JAPAN_EXPANSION_TYPES.Samurai).to(Samurai);
      japanExpansionContainer.bind<Katana>(JAPAN_EXPANSION_TYPES.Katana).to(Katana);

      const gameContainer = Container.merge(chinaExpansionContainer, japanExpansionContainer);
      expect(gameContainer.get<Ninja>(CHINA_EXPANSION_TYPES.Ninja).name).to.equal('Ninja');
      expect(gameContainer.get<Shuriken>(CHINA_EXPANSION_TYPES.Shuriken).name).to.equal('Shuriken');
      expect(gameContainer.get<Samurai>(JAPAN_EXPANSION_TYPES.Samurai).name).to.equal('Samurai');
      expect(gameContainer.get<Katana>(JAPAN_EXPANSION_TYPES.Katana).name).to.equal('Katana');

    });

    _it('Should_be_able_to_merge_multiple_containers', () => {
      @injectable()
      class Ninja {
        public name = 'Ninja';
      }

      @injectable()
      class Shuriken {
        public name = 'Shuriken';
      }
      interface  CHINA_EXPANSION_TYPE{
        Ninja: string;
        Shuriken: string;
      }
      const CHINA_EXPANSION_TYPES:CHINA_EXPANSION_TYPE = {
        Ninja: 'Ninja',
        Shuriken: 'Shuriken'
      };

      const chinaExpansionContainer = new Container();
      chinaExpansionContainer.bind<Ninja>(CHINA_EXPANSION_TYPES.Ninja).to(Ninja);
      chinaExpansionContainer.bind<Shuriken>(CHINA_EXPANSION_TYPES.Shuriken).to(Shuriken);

      @injectable()
      class Samurai {
        public name = 'Samurai';
      }

      @injectable()
      class Katana {
        public name = 'Katana';
      }
      interface JAPAN_EXPANSION_TYPE {
        Katana: string;
        Samurai: string;
      }
      const JAPAN_EXPANSION_TYPES:JAPAN_EXPANSION_TYPE = {
        Katana: 'Katana',
        Samurai: 'Samurai'
      };

      const japanExpansionContainer = new Container();
      japanExpansionContainer.bind<Samurai>(JAPAN_EXPANSION_TYPES.Samurai).to(Samurai);
      japanExpansionContainer.bind<Katana>(JAPAN_EXPANSION_TYPES.Katana).to(Katana);

      @injectable()
      class Sheriff {
        public name = 'Sheriff';
      }

      @injectable()
      class Revolver {
        public name = 'Revolver';
      }
      interface USA_EXPANSION_TYPE {
        Revolver: string;
        Sheriff: string;
      }
      const USA_EXPANSION_TYPES:USA_EXPANSION_TYPE = {
        Revolver: 'Revolver',
        Sheriff: 'Sheriff'
      };

      const usaExpansionContainer = new Container();
      usaExpansionContainer.bind<Sheriff>(USA_EXPANSION_TYPES.Sheriff).to(Sheriff);
      usaExpansionContainer.bind<Revolver>(USA_EXPANSION_TYPES.Revolver).to(Revolver);

      const gameContainer = Container.merge(chinaExpansionContainer, japanExpansionContainer, usaExpansionContainer);
      expect(gameContainer.get<Ninja>(CHINA_EXPANSION_TYPES.Ninja).name).to.equal('Ninja');
      expect(gameContainer.get<Shuriken>(CHINA_EXPANSION_TYPES.Shuriken).name).to.equal('Shuriken');
      expect(gameContainer.get<Samurai>(JAPAN_EXPANSION_TYPES.Samurai).name).to.equal('Samurai');
      expect(gameContainer.get<Katana>(JAPAN_EXPANSION_TYPES.Katana).name).to.equal('Katana');
      expect(gameContainer.get<Sheriff>(USA_EXPANSION_TYPES.Sheriff).name).to.equal('Sheriff');
      expect(gameContainer.get<Revolver>(USA_EXPANSION_TYPES.Revolver).name).to.equal('Revolver');
    });

    _it('Should_be_able_create_a_child_containers', () => {
      const parent = new Container();
      const child = parent.createChild();
      if (child.parent === null) {
        throw new Error('Parent should not be null');
      }
      expect(child.parent.id).to.equal(parent.id);
    });

    _it('Should_inherit_parent_container_options', () => {
      @injectable()
      class Warrior { }

      const parent = new Container({
        defaultScope: BindingScopeEnum.Singleton
      });

      const child = parent.createChild();
      child.bind(Warrior).toSelf();

      const singletonWarrior1 = child.get(Warrior);
      const singletonWarrior2 = child.get(Warrior);
      expect(singletonWarrior1).to.equal(singletonWarrior2);
    });

    _it('Should_be_able_to_override_options_to_child_containers', () => {
      @injectable()
      class Warrior { }

      const parent = new Container({
        defaultScope: BindingScopeEnum.Request
      });

      const child = parent.createChild({
        defaultScope: BindingScopeEnum.Singleton
      });
      child.bind(Warrior).toSelf();

      const singletonWarrior1 = child.get(Warrior);
      const singletonWarrior2 = child.get(Warrior);
      expect(singletonWarrior1).to.equal(singletonWarrior2);
    });

    _it('Should_be_able_check_if_a_named_binding_is_bound', () => {

      const zero = 'Zero';
      const invalidDivisor = 'InvalidDivisor';
      const validDivisor = 'ValidDivisor';
      const container = new Container();

      expect(container.isBound(zero)).to.equal(false);
      container.bind<number>(zero).toConstantValue(0);
      expect(container.isBound(zero)).to.equal(true);

      container.unbindAll();
      expect(container.isBound(zero)).to.equal(false);
      container.bind<number>(zero).toConstantValue(0).whenTargetNamed(invalidDivisor);
      expect(container.isBoundNamed(zero, invalidDivisor)).to.equal(true);
      expect(container.isBoundNamed(zero, validDivisor)).to.equal(false);

      container.bind<number>(zero).toConstantValue(1).whenTargetNamed(validDivisor);
      expect(container.isBoundNamed(zero, invalidDivisor)).to.equal(true);
      expect(container.isBoundNamed(zero, validDivisor)).to.equal(true);

    });

    _it('Should_be_able_to_check_if_a_named_binding_is_bound_from_parent_container', () => {

      const zero = 'Zero';
      const invalidDivisor = 'InvalidDivisor';
      const validDivisor = 'ValidDivisor';
      const container = new Container();
      const childContainer = container.createChild();
      const secondChildContainer = childContainer.createChild();

      container.bind<number>(zero).toConstantValue(0).whenTargetNamed(invalidDivisor);
      expect(secondChildContainer.isBoundNamed(zero, invalidDivisor)).to.equal(true);
      expect(secondChildContainer.isBoundNamed(zero, validDivisor)).to.equal(false);

      container.bind<number>(zero).toConstantValue(1).whenTargetNamed(validDivisor);
      expect(secondChildContainer.isBoundNamed(zero, invalidDivisor)).to.equal(true);
      expect(secondChildContainer.isBoundNamed(zero, validDivisor)).to.equal(true);

    });

    _it('Should_be_able_to_get_a_tagged_binding', () => {

      const zero = 'Zero';
      const isValidDivisor = 'IsValidDivisor';
      const container = new Container();

      container.bind<number>(zero).toConstantValue(0).whenTargetTagged(isValidDivisor, false);
      expect(container.getTagged(zero, isValidDivisor, false)).to.equal(0);

      container.bind<number>(zero).toConstantValue(1).whenTargetTagged(isValidDivisor, true);
      expect(container.getTagged(zero, isValidDivisor, false)).to.equal(0);
      expect(container.getTagged(zero, isValidDivisor, true)).to.equal(1);

    });

    _it('Should_be_able_to_get_a_tagged_binding_from_parent_container', () => {

      const zero = 'Zero';
      const isValidDivisor = 'IsValidDivisor';
      const container = new Container();
      const childContainer = container.createChild();
      const secondChildContainer = childContainer.createChild();

      container.bind<number>(zero).toConstantValue(0).whenTargetTagged(isValidDivisor, false);
      container.bind<number>(zero).toConstantValue(1).whenTargetTagged(isValidDivisor, true);
      expect(secondChildContainer.getTagged(zero, isValidDivisor, false)).to.equal(0);
      expect(secondChildContainer.getTagged(zero, isValidDivisor, true)).to.equal(1);

    });

    _it('Should_be_able_check_if_a_tagged_binding_is_bound', () => {

      const zero = 'Zero';
      const isValidDivisor = 'IsValidDivisor';
      const container = new Container();

      expect(container.isBound(zero)).to.equal(false);
      container.bind<number>(zero).toConstantValue(0);
      expect(container.isBound(zero)).to.equal(true);

      container.unbindAll();
      expect(container.isBound(zero)).to.equal(false);
      container.bind<number>(zero).toConstantValue(0).whenTargetTagged(isValidDivisor, false);
      expect(container.isBoundTagged(zero, isValidDivisor, false)).to.equal(true);
      expect(container.isBoundTagged(zero, isValidDivisor, true)).to.equal(false);

      container.bind<number>(zero).toConstantValue(1).whenTargetTagged(isValidDivisor, true);
      expect(container.isBoundTagged(zero, isValidDivisor, false)).to.equal(true);
      expect(container.isBoundTagged(zero, isValidDivisor, true)).to.equal(true);

    });

    _it('Should_be_able_to_check_if_a_tagged_binding_is_bound_from_parent_container', () => {

      const zero = 'Zero';
      const isValidDivisor = 'IsValidDivisor';
      const container = new Container();
      const childContainer = container.createChild();
      const secondChildContainer = childContainer.createChild();

      container.bind<number>(zero).toConstantValue(0).whenTargetTagged(isValidDivisor, false);
      expect(secondChildContainer.isBoundTagged(zero, isValidDivisor, false)).to.equal(true);
      expect(secondChildContainer.isBoundTagged(zero, isValidDivisor, true)).to.equal(false);

      container.bind<number>(zero).toConstantValue(1).whenTargetTagged(isValidDivisor, true);
      expect(secondChildContainer.isBoundTagged(zero, isValidDivisor, false)).to.equal(true);
      expect(secondChildContainer.isBoundTagged(zero, isValidDivisor, true)).to.equal(true);

    });

    _it('Should_be_able_to_override_a_binding_using_rebind', () => {
      interface TYPE{
        someType: string;
      }
      const TYPES:TYPE = {
        someType: 'someType'
      };

      const container = new Container();
      container.bind<number>(TYPES.someType).toConstantValue(1);
      container.bind<number>(TYPES.someType).toConstantValue(2);

      const values1:ESObject = container.getAll(TYPES.someType);
      expect(values1[0]).to.eq(1);
      expect(values1[1]).to.eq(2);

      container.rebind<number>(TYPES.someType).toConstantValue(3);
      const values2:ESObject = container.getAll(TYPES.someType);
      expect(values2[0]).to.eq(3);
      expect(values2[1]).to.eq(undefined);

    });

    _it('Should_be_able_to_override_a_binding_using_rebindAsync', async () => {
      interface TYPE{
        someType: string;
      }

      const TYPES:TYPE = {
        someType: 'someType'
      };

      const container = new Container();
      container.bind<number>(TYPES.someType).toConstantValue(1);
      container.bind<number>(TYPES.someType).toConstantValue(2);
      container.onDeactivation(TYPES.someType, () => Promise.resolve())

      const values1:ESObject = container.getAll(TYPES.someType);
      expect(values1[0]).to.eq(1);
      expect(values1[1]).to.eq(2);

      (await container.rebindAsync<number>(TYPES.someType)).toConstantValue(3);
      const values2:ESObject = container.getAll(TYPES.someType);
      expect(values2[0]).to.eq(3);
      expect(values2[1]).to.eq(undefined);

    });

    _it('Should_be_able_to_resolve_named_multi-injection_(async)', async () => {

      interface Intl {
        hello?: string;
        goodbye?: string;
      }
      const container = new Container();
      container.bind<Intl>('Intl').toDynamicValue(() => Promise.resolve<Intl>({ hello: 'bonjour' })).whenTargetNamed('fr');
      container.bind<Intl>('Intl').toDynamicValue(() => Promise.resolve<Intl>({ goodbye: 'au revoir' })).whenTargetNamed('fr');
      container.bind<Intl>('Intl').toDynamicValue(() => Promise.resolve<Intl>({ hello: 'hola' })).whenTargetNamed('es');
      container.bind<Intl>('Intl').toDynamicValue(() => Promise.resolve<Intl>({ goodbye: 'adios' })).whenTargetNamed('es');

      const fr = await container.getAllNamedAsync<Intl>('Intl', 'fr');
      expect(fr.length).to.equal(2);
      expect(fr[0]?.hello).to.equal('bonjour');
      expect(fr[1]?.goodbye).to.equal('au revoir');

      const es = await container.getAllNamedAsync<Intl>('Intl', 'es');
      expect(es.length).to.equal(2);
      expect(es[0]?.hello).to.equal('hola');
      expect(es[1]?.goodbye).to.equal('adios');

    });

    _it('Should_be_able_to_resolve_named_async', async () => {
      interface Intl {
        hello?: string;
        goodbye?: string;
      }

      const container = new Container();
      container.bind<Intl>('Intl').toDynamicValue(() => Promise.resolve<Intl>({ hello: 'bonjour' })).whenTargetNamed('fr');
      container.bind<Intl>('Intl').toDynamicValue(() => Promise.resolve<Intl>({ hello: 'hola' })).whenTargetNamed('es');

      const fr = await container.getNamedAsync<Intl>('Intl', 'fr');
      expect(fr.hello).to.equal('bonjour');

      const es = await container.getNamedAsync<Intl>('Intl', 'es');
      expect(es.hello).to.equal('hola');
    });

    _it('Should_be_able_to_resolve_tagged_multi_injectionasync', async () => {

      interface Intl {
        hello?: string;
        goodbye?: string;
      }

      const container = new Container();
      container.bind<Intl>('Intl').toDynamicValue(() => Promise.resolve<Intl>({ hello: 'bonjour' })).whenTargetTagged('lang', 'fr');
      container.bind<Intl>('Intl').toDynamicValue(() => Promise.resolve<Intl>({ goodbye: 'au revoir' })).whenTargetTagged('lang', 'fr');
      container.bind<Intl>('Intl').toDynamicValue(() => Promise.resolve<Intl>({ hello: 'hola' })).whenTargetTagged('lang', 'es');
      container.bind<Intl>('Intl').toDynamicValue(() => Promise.resolve<Intl>({ goodbye: 'adios' })).whenTargetTagged('lang', 'es');

      const fr = await container.getAllTaggedAsync<Intl>('Intl', 'lang', 'fr');
      expect(fr.length).to.equal(2);
      expect(fr[0]?.hello).to.equal('bonjour');
      expect(fr[1]?.goodbye).to.equal('au revoir');

      const es = await container.getAllTaggedAsync<Intl>('Intl', 'lang', 'es');
      expect(es.length).to.equal(2);
      expect(es[0]?.hello).to.equal('hola');
      expect(es[1]?.goodbye).to.equal('adios');

    });

    _it('Should_be_able_to_get_a_tagged_binding_async', async () => {

      const zero = 'Zero';
      const isValidDivisor = 'IsValidDivisor';
      const container = new Container();

      container.bind<number>(zero).toDynamicValue(() => Promise.resolve(0)).whenTargetTagged(isValidDivisor, false);
      expect(await container.getTaggedAsync(zero, isValidDivisor, false)).to.equal(0);

      container.bind<number>(zero).toDynamicValue(() => Promise.resolve(1)).whenTargetTagged(isValidDivisor, true);
      expect(await container.getTaggedAsync(zero, isValidDivisor, false)).to.equal(0);
      expect(await container.getTaggedAsync(zero, isValidDivisor, true)).to.equal(1);

    });

    _it('should_be_able_to_get_all_the_services_binded_async', async () => {
      const serviceIdentifier = 'service-identifier';

      const container = new Container();

      const firstValueBinded = 'value-one';
      const secondValueBinded = 'value-two';
      const thirdValueBinded = 'value-three';

      container.bind(serviceIdentifier).toConstantValue(firstValueBinded);
      container.bind(serviceIdentifier).toConstantValue(secondValueBinded);
      container.bind(serviceIdentifier).toDynamicValue(_ => Promise.resolve(thirdValueBinded));
      const services = await container.getAllAsync<string>(serviceIdentifier);

      expect(services).to.deep.equal([firstValueBinded, secondValueBinded, thirdValueBinded]);
    });

    _it('should_throw_an_error_if_skipBaseClassChecks_is_not_a_boolean', () => {
      expect(() =>
      new Container({
        skipBaseClassChecks: 'Jolene, Jolene, Jolene, Jolene' as ESObject as boolean
      })
      ).to.throw(ERROR_MSGS.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK);
    });

    _it('Should_be_able_to_inject_when_symbol_property_key', () => {
      let res=weaponProperty1()
      expect(res.boo).equal(true);
    });

    _it('Should_be_possible_to_constrain_to_a_symbol_description', () => {
      let res=possible()
      expect(res.boo).equal(true);
    });

    _it('container_resolve_should_come_from_the_same_container', () => {
      @injectable()
      class CompositionRoot { }
      class DerivedContainer extends Container {
        public planningForCompositionRoot(): void {
          //
        }
      }
      const middleware: interfaces.Middleware = (next) =>
      (nextArgs:ESObject) => {
        const contextInterceptor:ESObject = nextArgs.contextInterceptor;
        nextArgs.contextInterceptor = (context:ESObject):ESObject => {
          if (context.plan.rootRequest.serviceIdentifier === new CompositionRoot()) {
            (context.container as DerivedContainer).planningForCompositionRoot();
          }
          return contextInterceptor(context);
        }
        return next(nextArgs)
      }

      const myContainer = new DerivedContainer();
      myContainer.applyMiddleware(middleware);
      myContainer.resolve(CompositionRoot);
      // tslint:disable-next-line: no-unused-expression
      expect(() => myContainer.resolve(CompositionRoot)).not.to.throw;
    })
  })
}