let __generate__Id: number = 0;
function generateId(): string {
    return "planner.test_" + ++__generate__Id;
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
import { inject } from 'inversify';
import { injectable } from 'inversify';
import { multiInject } from 'inversify';
import { tagged } from 'inversify';
import { targetName } from 'inversify';
import * as ERROR_MSGS from 'inversify/lib/constants/error_msgs';
import { TargetTypeEnum } from 'inversify';
import { Container } from 'inversify';
import { interfaces } from 'inversify';
import { named } from 'inversify';
import { MetadataReader } from 'inversify';
import { plan } from 'inversify/lib/planning/planner';
import * as ns from "reflect-metadata";
ns;
export default function plannerTest() {
    describe('plannerTest', () => {
        _it('Should_be_able_to_create_a_basic_plan', () => {
            interface KatanaBlade1 {
            }
            @injectable()
            class KatanaBlade implements KatanaBlade1 {
            }
            interface KatanaHandler1 {
            }
            @injectable()
            class KatanaHandler implements KatanaHandler1 {
            }
            interface Katana1 {
            }
            @injectable()
            class Katana implements Katana1 {
                public handler: KatanaHandler;
                public blade: KatanaBlade;
                public constructor(
                @inject('KatanaHandler')
                @targetName('handler')
                handler: KatanaHandler, 
                @inject('KatanaBlade')
                @targetName('blade')
                blade: KatanaBlade) {
                    this.handler = handler;
                    this.blade = blade;
                }
            }
            interface Shuriken1 {
            }
            @injectable()
            class Shuriken implements Shuriken1 {
            }
            interface Ninja1 {
            }
            @injectable()
            class Ninja implements Ninja1 {
                public katana: Katana;
                public shuriken: Shuriken;
                public constructor(
                @inject('Katana')
                @targetName('katana')
                katana: Katana, 
                @inject('Shuriken')
                @targetName('shuriken')
                shuriken: Shuriken) {
                    this.katana = katana;
                    this.shuriken = shuriken;
                }
            }
            const ninjaId = 'Ninja';
            const shurikenId = 'Shuriken';
            const katanaId = 'Katana';
            const katanaHandlerId = 'KatanaHandler';
            const katanaBladeId = 'KatanaBlade';
            const container = new Container();
            container.bind<Ninja>(ninjaId).to(Ninja);
            container.bind<Shuriken>(shurikenId).to(Shuriken);
            container.bind<Katana>(katanaId).to(Katana);
            container.bind<KatanaBlade>(katanaBladeId).to(KatanaBlade);
            container.bind<KatanaHandler>(katanaHandlerId).to(KatanaHandler);
            // Actual
            const actualPlan = plan(new MetadataReader(), container, false, TargetTypeEnum.Variable, ninjaId).plan;
            const actualNinjaRequest = actualPlan.rootRequest;
            const actualKatanaRequest = actualNinjaRequest.childRequests[0];
            const actualKatanaHandlerRequest = actualKatanaRequest?.childRequests[0];
            const actualKatanaBladeRequest = actualKatanaRequest?.childRequests[1];
            const actualShurikenRequest = actualNinjaRequest.childRequests[1];
            expect(actualNinjaRequest.serviceIdentifier).eql(ninjaId);
            expect(actualNinjaRequest.childRequests.length).eql(2);
            // Katana
            expect(actualKatanaRequest?.serviceIdentifier).eql(katanaId);
            expect(actualKatanaRequest?.bindings.length).eql(1);
            expect(actualKatanaRequest?.target.serviceIdentifier).eql(katanaId);
            expect(actualKatanaRequest?.childRequests.length).eql(2);
            // KatanaHandler
            expect(actualKatanaHandlerRequest?.serviceIdentifier).eql(katanaHandlerId);
            expect(actualKatanaHandlerRequest?.bindings.length).eql(1);
            expect(actualKatanaHandlerRequest?.target.serviceIdentifier).eql(katanaHandlerId);
            // KatanaBlade
            expect(actualKatanaBladeRequest?.serviceIdentifier).eql(katanaBladeId);
            expect(actualKatanaBladeRequest?.bindings.length).eql(1);
            expect(actualKatanaBladeRequest?.target.serviceIdentifier).eql(katanaBladeId);
            // Shuriken
            expect(actualShurikenRequest?.serviceIdentifier).eql(shurikenId);
            expect(actualShurikenRequest?.bindings.length).eql(1);
            expect(actualShurikenRequest?.target.serviceIdentifier).eql(shurikenId);
        });
        _it('Should_throw_when_circular_dependencies_found', () => {
            interface IA {
            }
            interface IB {
            }
            interface IC {
            }
            interface ID {
            }
            @injectable()
            class D implements ID {
                public a: IA;
                public constructor(
                @inject('A')
                a: IA) {
                    this.a = a;
                }
            }
            @injectable()
            class C implements IC {
                public d: ID;
                public constructor(
                @inject('D')
                d: ID) {
                    this.d = d;
                }
            }
            @injectable()
            class B implements IB {
            }
            @injectable()
            class A implements IA {
                public b: IB;
                public c: IC;
                public constructor(
                @inject('B')
                b: IB, 
                @inject('C')
                c: IC) {
                    this.b = b;
                    this.c = c;
                }
            }
            const aId = 'A';
            const bId = 'B';
            const cId = 'C';
            const dId = 'D';
            const container = new Container();
            container.bind<IA>(aId).to(A);
            container.bind<IB>(bId).to(B);
            container.bind<IC>(cId).to(C);
            container.bind<ID>(dId).to(D);
            const throwErrorFunction = () => {
                container.get(aId);
            };
            expect(throwErrorFunction).to.throw(`${ERROR_MSGS.CIRCULAR_DEPENDENCY} A --> C --> D --> A`);
        });
        _it('Should_only_plan_sub_dependencies_when_binding_type_is_BindingType_Instance', () => {
            interface KatanaBlade1 {
            }
            @injectable()
            class KatanaBlade implements KatanaBlade1 {
            }
            interface KatanaHandler1 {
            }
            @injectable()
            class KatanaHandler implements KatanaHandler1 {
            }
            interface Katana1 {
            }
            @injectable()
            class Katana implements Katana1 {
                public handler: KatanaHandler;
                public blade: KatanaBlade;
                public constructor(
                @inject('KatanaHandler')
                @targetName('handler')
                handler: KatanaHandler, 
                @inject('KatanaBlade')
                @targetName('blade')
                blade: KatanaBlade) {
                    this.handler = handler;
                    this.blade = blade;
                }
            }
            interface Shuriken1 {
            }
            @injectable()
            class Shuriken implements Shuriken1 {
            }
            interface Ninja1 {
            }
            @injectable()
            class Ninja implements Ninja1 {
                public katanaFactory: interfaces.Factory<Katana>;
                public shuriken: Shuriken;
                public constructor(
                @inject('Factory<Katana>')
                @targetName('katanaFactory')
                katanaFactory: interfaces.Factory<Katana>, 
                @inject('Shuriken')
                @targetName('shuriken')
                shuriken: Shuriken) {
                    this.katanaFactory = katanaFactory;
                    this.shuriken = shuriken;
                }
            }
            const ninjaId = 'Ninja';
            const shurikenId = 'Shuriken';
            const katanaId = 'Katana';
            const katanaHandlerId = 'KatanaHandler';
            const katanaBladeId = 'KatanaBlade';
            const katanaFactoryId = 'Factory<Katana>';
            const container = new Container();
            container.bind<Ninja>(ninjaId).to(Ninja);
            container.bind<Shuriken>(shurikenId).to(Shuriken);
            container.bind<Katana>(katanaBladeId).to(Katana);
            container.bind<KatanaBlade>(katanaBladeId).to(KatanaBlade);
            container.bind<KatanaHandler>(katanaHandlerId).to(KatanaHandler);
            container.bind<interfaces.Factory<Katana>>(katanaFactoryId).toFactory<Katana>((context: interfaces.Context) => () => context.container.get<Katana>(katanaId));
            const actualPlan = plan(new MetadataReader(), container, false, TargetTypeEnum.Variable, ninjaId).plan;
            expect(actualPlan.rootRequest.serviceIdentifier).eql(ninjaId);
            expect(actualPlan.rootRequest.childRequests[0]?.serviceIdentifier).eql(katanaFactoryId);
            expect(actualPlan.rootRequest.childRequests[0]?.childRequests.length).eql(0); // IMPORTANT!
            expect(actualPlan.rootRequest.childRequests[1]?.serviceIdentifier).eql(shurikenId);
            expect(actualPlan.rootRequest.childRequests[1]?.childRequests.length).eql(0);
            expect(actualPlan.rootRequest.childRequests[2]).eql(undefined);
        });
        _it('Should_generate_plans_with_multi_injections', () => {
            interface Weapon {
            }
            @injectable()
            class Katana implements Weapon {
            }
            @injectable()
            class Shuriken implements Weapon {
            }
            interface Ninja1 {
            }
            @injectable()
            class Ninja implements Ninja1 {
                public katana: Weapon;
                public shuriken: Weapon;
                public constructor(
                @multiInject('Weapon')
                @targetName('weapons')
                weapons: Weapon[]) {
                    this.katana = weapons[0] as Weapon;
                    this.shuriken = weapons[1] as Weapon;
                }
            }
            const ninjaId = 'Ninja';
            const weaponId = 'Weapon';
            const container = new Container();
            container.bind<Ninja>(ninjaId).to(Ninja);
            container.bind<Weapon>(weaponId).to(Shuriken);
            container.bind<Weapon>(weaponId).to(Katana);
            const actualPlan = plan(new MetadataReader(), container, false, TargetTypeEnum.Variable, ninjaId).plan;
            // root request has no target
            expect(actualPlan.rootRequest.serviceIdentifier).eql(ninjaId);
            expect(actualPlan.rootRequest.target.serviceIdentifier).eql(ninjaId);
            expect(actualPlan.rootRequest.target.isArray()).eql(false);
            // root request should only have one child request with target weapons/Weapon[]
            expect(actualPlan.rootRequest.childRequests[0]?.serviceIdentifier).eql('Weapon');
            expect(actualPlan.rootRequest.childRequests[1]).eql(undefined);
            expect(actualPlan.rootRequest.childRequests[0]?.target.name.value()).eql('weapons');
            expect(actualPlan.rootRequest.childRequests[0]?.target.serviceIdentifier).eql('Weapon');
            expect(actualPlan.rootRequest.childRequests[0]?.target.isArray()).eql(true);
            // child request should have two child requests with targets weapons/Weapon[] but bindings Katana and Shuriken
            expect(actualPlan.rootRequest.childRequests[0]?.childRequests.length).eql(2);
            expect(actualPlan.rootRequest.childRequests[0]?.childRequests[0]?.serviceIdentifier).eql(weaponId);
            expect(actualPlan.rootRequest.childRequests[0]?.childRequests[0]?.target.name.value()).eql('weapons');
            expect(actualPlan.rootRequest.childRequests[0]?.childRequests[0]?.target.serviceIdentifier).eql('Weapon');
            expect(actualPlan.rootRequest.childRequests[0]?.childRequests[0]?.target.isArray()).eql(true);
            expect(actualPlan.rootRequest.childRequests[0]?.childRequests[0]?.serviceIdentifier).eql('Weapon');
            expect(actualPlan.rootRequest.childRequests[0]?.childRequests[0]?.bindings[0]?.serviceIdentifier).eql('Weapon');
            interface nameobjs {
                name: string;
            }
            const shurikenImplementationType = actualPlan.rootRequest.childRequests[0]?.childRequests[0]?.bindings[0]?.implementationType as nameobjs;
            expect(shurikenImplementationType.name).eql('Shuriken');
            expect(actualPlan.rootRequest.childRequests[0]?.childRequests[1]?.serviceIdentifier).eql(weaponId);
            expect(actualPlan.rootRequest.childRequests[0]?.childRequests[1]?.target.name.value()).eql('weapons');
            expect(actualPlan.rootRequest.childRequests[0]?.childRequests[1]?.target.serviceIdentifier).eql('Weapon');
            expect(actualPlan.rootRequest.childRequests[0]?.childRequests[1]?.target.isArray()).eql(true);
            expect(actualPlan.rootRequest.childRequests[0]?.childRequests[1]?.serviceIdentifier).eql('Weapon');
            expect(actualPlan.rootRequest.childRequests[0]?.childRequests[1]?.bindings[0]?.serviceIdentifier).eql('Weapon');
            const katanaImplementationType = actualPlan.rootRequest.childRequests[0]?.childRequests[1]?.bindings[0]?.implementationType as nameobjs;
            expect(katanaImplementationType.name).eql('Katana');
        });
        _it('Should_throw_when_no_matching_bindings_are_found', () => {
            interface Katana1 {
            }
            @injectable()
            class Katana implements Katana1 {
            }
            interface Shuriken1 {
            }
            @injectable()
            class Shuriken implements Shuriken1 {
            }
            interface Ninja1 {
            }
            @injectable()
            class Ninja implements Ninja1 {
                public katana: Katana;
                public shuriken: Shuriken;
                public constructor(
                @inject('Katana')
                @targetName('katana')
                katana: Katana, 
                @inject('Shuriken')
                @targetName('shuriken')
                shuriken: Shuriken) {
                    this.katana = katana;
                    this.shuriken = shuriken;
                }
            }
            const ninjaId = 'Ninja';
            const shurikenId = 'Shuriken';
            const container = new Container();
            container.bind<Ninja>(ninjaId).to(Ninja);
            container.bind<Shuriken>(shurikenId).to(Shuriken);
            const throwFunction = () => {
                plan(new MetadataReader(), container, false, TargetTypeEnum.Variable, ninjaId);
            };
            expect(throwFunction).to.throw(`${ERROR_MSGS.NOT_REGISTERED} Katana`);
        });
        _it('Should_apply_constrains_when_an_ambiguous_match_is_found', () => {
            interface Weapon {
            }
            @injectable()
            class Katana implements Weapon {
            }
            @injectable()
            class Shuriken implements Weapon {
            }
            interface Ninja1 {
            }
            const ninjaId = 'Ninja';
            const weaponId = 'Weapon';
            @injectable()
            class Ninja implements Ninja1 {
                public katana: Weapon;
                public shuriken: Weapon;
                public constructor(
                @inject(weaponId)
                @targetName('katana')
                @tagged('canThrow', false)
                katana: Weapon, 
                @inject(weaponId)
                @targetName('shuriken')
                @tagged('canThrow', true)
                shuriken: Weapon) {
                    this.katana = katana;
                    this.shuriken = shuriken;
                }
            }
            const container = new Container();
            container.bind<Ninja>(ninjaId).to(Ninja);
            container.bind<Weapon>(weaponId).to(Katana).whenTargetTagged('canThrow', false);
            container.bind<Weapon>(weaponId).to(Shuriken).whenTargetTagged('canThrow', true);
            const actualPlan = plan(new MetadataReader(), container, false, TargetTypeEnum.Variable, ninjaId).plan;
            // root request has no target
            expect(actualPlan.rootRequest.serviceIdentifier).eql(ninjaId);
            expect(actualPlan.rootRequest.target.serviceIdentifier).eql(ninjaId);
            expect(actualPlan.rootRequest.target.isArray()).eql(false);
            // root request should have 2 child requests
            expect(actualPlan.rootRequest.childRequests[0]?.serviceIdentifier).eql(weaponId);
            expect(actualPlan.rootRequest.childRequests[0]?.target.name.value()).eql('katana');
            expect(actualPlan.rootRequest.childRequests[0]?.target.serviceIdentifier).eql(weaponId);
            expect(actualPlan.rootRequest.childRequests[1]?.serviceIdentifier).eql(weaponId);
            expect(actualPlan.rootRequest.childRequests[1]?.target.name.value()).eql('shuriken');
            expect(actualPlan.rootRequest.childRequests[1]?.target.serviceIdentifier).eql(weaponId);
            expect(actualPlan.rootRequest.childRequests[2]).eql(undefined);
        });
        _it('Should_throw_when_a_class_has_a_missing_injectable_annotation', () => {
            interface Weapon {
            }
            class Katana implements Weapon {
            }
            const container = new Container();
            container.bind<Weapon>('Weapon').to(Katana);
            const throwFunction = () => {
                plan(new MetadataReader(), container, false, TargetTypeEnum.Variable, 'Weapon');
            };
            expect(throwFunction).to.throw(`${ERROR_MSGS.MISSING_INJECTABLE_ANNOTATION} Katana.`);
        });
        _it('Should_throw_when_apply_a_metadata_decorator_without_inject_or_multiInject', () => {
            @injectable()
            class Ninja {
                @named('name')
                set weapon(weapon: Weapon) {
                }
            }
            interface Weapon {
            }
            class Katana implements Weapon {
            }
            const container = new Container();
            container.bind<Weapon>('Weapon').to(Katana);
            container.bind(Ninja).toSelf();
            const throwFunction = () => {
                plan(new MetadataReader(), container, false, TargetTypeEnum.Variable, Ninja);
            };
            expect(throwFunction).to.throw(`${ERROR_MSGS.MISSING_INJECTABLE_ANNOTATION} for property weapon in class Ninja.`);
        });
        _it('Should_ignore_checking_base_classes_for_injectable_when_skipBaseClassChecks_is_set_on_the_container', () => {
            class Test {
            }
            @injectable()
            class Test2 extends Test {
            }
            const container = new Container({
                skipBaseClassChecks: true
            });
            container.bind(Test2).toSelf();
            container.get(Test2);
        });
        _it('Should_ignore_checking_base_classes_for_injectable_on_resolve_when_skipBaseClassChecks_is_set', () => {
            class Test {
            }
            @injectable()
            class Test2 extends Test {
            }
            const container = new Container({
                skipBaseClassChecks: true
            });
            container.resolve(Test2);
        });
        _it('Should_throw_when_an_class_has_a_missing_inject_annotation', () => {
            interface Sword {
            }
            @injectable()
            class Katana implements Sword {
            }
            interface Warrior {
            }
            @injectable()
            class Ninja implements Warrior {
                public katana: Katana;
                public constructor(katana: Sword) {
                    this.katana = katana as Katana;
                }
            }
            const container = new Container();
            container.bind<Warrior>('Warrior').to(Ninja);
            container.bind<Sword>('Sword').to(Katana);
            const throwFunction = () => {
                plan(new MetadataReader(), container, false, TargetTypeEnum.Variable, 'Warrior');
            };
            expect(throwFunction).to.throw(`${ERROR_MSGS.MISSING_INJECT_ANNOTATION} argument 0 in class Ninja.`);
        });
        _it('Should_throw_when_a_function_has_a_missing_injectable_annotation', () => {
            interface Katana1 {
            }
            @injectable()
            class Katana implements Katana1 {
            }
            interface Ninja1 {
            }
            @injectable()
            class Ninja implements Ninja1 {
                public katana: Katana;
                public constructor(katanaFactory: () => Katana) {
                    this.katana = katanaFactory();
                }
            }
            const container = new Container();
            container.bind<Ninja>('Ninja').to(Ninja);
            container.bind<Katana>('Katana').to(Katana);
            container.bind<Katana>('Factory<Katana>').to(Katana);
            const throwFunction = () => {
                plan(new MetadataReader(), container, false, TargetTypeEnum.Variable, 'Ninja');
            };
            expect(throwFunction).to.throw(`${ERROR_MSGS.MISSING_INJECT_ANNOTATION} argument 0 in class Ninja.`);
        });
    });
}
