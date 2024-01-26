let __generate__Id: number = 0;
function generateId(): string {
    return "resolver.test_" + ++__generate__Id;
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
import * as ns from "reflect-metadata";
import { describe, beforeAll, beforeEach, afterEach, afterAll, it as _it, expect } from '../utils/util';
import { inject } from 'inversify';
import { injectable } from 'inversify';
import { multiInject } from 'inversify';
import { named } from 'inversify';
import { postConstruct } from 'inversify';
import { preDestroy } from 'inversify';
import { tagged } from 'inversify';
import { targetName } from 'inversify';
import * as ERROR_MSGS from 'inversify/lib/constants/error_msgs';
import { BindingTypeEnum, TargetTypeEnum } from 'inversify';
import { Container } from 'inversify';
import { interfaces } from 'inversify';
import { MetadataReader } from 'inversify';
import { getBindingDictionary, plan } from 'inversify/lib/planning/planner';
import { resolveInstance } from 'inversify/lib/resolution/instantiation';
import { resolveTyped, Ninja1 } from '../tools/tools';
import { autoBindInjectable, dependencies, layers, onActivation, postConstruct1, sharedAutoBindInjectable, onDeactivation } from "../tools/resolver";
ns;
export default function resolverTest() {
    describe('resolverTest', () => {
        _it('Should_be_able_to_resolve_BindingType.Instance_bindings', () => {
            const ninjaId = 'Ninja';
            const shurikenId = 'Shuriken';
            const katanaId = 'Katana';
            const katanaHandlerId = 'KatanaHandler';
            const katanaBladeId = 'KatanaBlade';
            interface Blade {
            }
            @injectable()
            class KatanaBlade implements Blade {
            }
            interface Handler {
            }
            @injectable()
            class KatanaHandler implements Handler {
            }
            interface Sword {
                handler: KatanaHandler;
                blade: KatanaBlade;
            }
            @injectable()
            class Katana implements Sword {
                public handler: Handler;
                public blade: Blade;
                public constructor(
                @inject(katanaHandlerId)
                @targetName('handler')
                handler: Handler, 
                @inject(katanaBladeId)
                @targetName('blade')
                blade: Blade) {
                    this.handler = handler;
                    this.blade = blade;
                }
            }
            interface Shuriken1 {
            }
            @injectable()
            class Shuriken implements Shuriken1 {
            }
            interface Warrior {
                katana: Katana;
                shuriken: Shuriken;
            }
            @injectable()
            class Ninja implements Warrior {
                public katana: Katana;
                public shuriken: Shuriken;
                public constructor(
                @inject(katanaId)
                @targetName('katana')
                katana: Katana, 
                @inject(shurikenId)
                @targetName('shuriken')
                shuriken: Shuriken) {
                    this.katana = katana;
                    this.shuriken = shuriken;
                }
            }
            const container = new Container();
            container.bind<Ninja>(ninjaId).to(Ninja);
            container.bind<Shuriken>(shurikenId).to(Shuriken);
            container.bind<Katana>(katanaId).to(Katana);
            container.bind<KatanaBlade>(katanaBladeId).to(KatanaBlade);
            container.bind<KatanaHandler>(katanaHandlerId).to(KatanaHandler);
            const context = plan(new MetadataReader(), container, false, TargetTypeEnum.Variable, ninjaId);
            const ninja: any = resolveTyped<Ninja>(context);
            expect(ninja instanceof Ninja).eql(true);
            expect(ninja.katana instanceof Katana).eql(true);
            expect(ninja.katana.handler instanceof KatanaHandler).eql(true);
            expect(ninja.katana.blade instanceof KatanaBlade).eql(true);
            expect(ninja.shuriken instanceof Shuriken).eql(true);
        });
        _it('Should_store_singleton_type_bindings_in_cache', () => {
            const ninjaId = 'Ninja';
            const shurikenId = 'Shuriken';
            const katanaId = 'Katana';
            const katanaHandlerId = 'KatanaHandler';
            const katanaBladeId = 'KatanaBlade';
            interface Blade {
            }
            @injectable()
            class KatanaBlade implements Blade {
            }
            interface Handler {
            }
            @injectable()
            class KatanaHandler implements Handler {
            }
            interface Sword {
                handler: KatanaHandler;
                blade: KatanaBlade;
            }
            @injectable()
            class Katana implements Sword {
                public handler: Handler;
                public blade: Blade;
                public constructor(
                @inject(katanaHandlerId)
                @targetName('handler')
                handler: Handler, 
                @inject(katanaBladeId)
                @targetName('blade')
                blade: Blade) {
                    this.handler = handler;
                    this.blade = blade;
                }
            }
            interface Shuriken1 {
            }
            @injectable()
            class Shuriken implements Shuriken1 {
            }
            interface Warrior {
                katana: Katana;
                shuriken: Shuriken;
            }
            @injectable()
            class Ninja implements Warrior {
                public katana: Katana;
                public shuriken: Shuriken;
                public constructor(
                @inject(katanaId)
                @targetName('katana')
                katana: Katana, 
                @inject(shurikenId)
                @targetName('shuriken')
                shuriken: Shuriken) {
                    this.katana = katana;
                    this.shuriken = shuriken;
                }
            }
            const container = new Container();
            container.bind<Ninja>(ninjaId).to(Ninja);
            container.bind<Shuriken>(shurikenId).to(Shuriken);
            container.bind<Katana>(katanaId).to(Katana).inSingletonScope(); // SINGLETON!
            container.bind<KatanaBlade>(katanaBladeId).to(KatanaBlade);
            container.bind<KatanaHandler>(katanaHandlerId).to(KatanaHandler).inSingletonScope(); // SINGLETON!
            const bindingDictionary: any = getBindingDictionary(container);
            const context = plan(new MetadataReader(), container, false, TargetTypeEnum.Variable, ninjaId);
            const katanaBinding: any = bindingDictionary.get(katanaId)[0];
            expect(katanaBinding?.cache === null).eql(true);
            expect(katanaBinding?.activated).eql(false);
            const ninja: any = resolveTyped<Ninja>(context);
            expect(ninja instanceof Ninja).eql(true);
            const ninja2: any = resolveTyped<Ninja>(context);
            expect(ninja2 instanceof Ninja).eql(true);
            expect(katanaBinding?.cache instanceof Katana).eql(true);
            expect(katanaBinding?.activated).eql(true);
        });
        _it('Should_throw_when_an_invalid_BindingType_is_detected', () => {
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
            interface Warrior {
                katana: Katana;
                shuriken: Shuriken;
            }
            @injectable()
            class Ninja implements Warrior {
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
            // container and bindings
            const ninjaId = 'Ninja';
            const container = new Container();
            container.bind<Ninja>(ninjaId); // IMPORTANT! (Invalid binding)
            // context and plan
            const context = plan(new MetadataReader(), container, false, TargetTypeEnum.Variable, ninjaId);
            const throwFunction = () => {
                resolveTyped<any>(context);
            };
            expect(context.plan.rootRequest.bindings[0]?.type).eql(BindingTypeEnum.Invalid);
            expect(throwFunction).to.throw(`${ERROR_MSGS.INVALID_BINDING_TYPE} ${ninjaId}`);
        });
        _it('Should_be_able_to_resolve_BindingType.ConstantValue_bindings', () => {
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
            interface Sword {
                handler: KatanaHandler;
                blade: KatanaBlade;
            }
            @injectable()
            class Katana implements Sword {
                public handler: KatanaHandler;
                public blade: KatanaBlade;
                public constructor(handler: KatanaHandler, blade: KatanaBlade) {
                    this.handler = handler;
                    this.blade = blade;
                }
            }
            interface Shuriken1 {
            }
            @injectable()
            class Shuriken implements Shuriken1 {
            }
            interface Warrior {
                katana: Katana;
                shuriken: Shuriken;
            }
            @injectable()
            class Ninja implements Warrior {
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
            const container = new Container();
            container.bind<Ninja>(ninjaId).to(Ninja);
            container.bind<Shuriken>(shurikenId).to(Shuriken);
            container.bind<Katana>(katanaId).toConstantValue(new Katana(new KatanaHandler(), new KatanaBlade())); // IMPORTANT!
            const context = plan(new MetadataReader(), container, false, TargetTypeEnum.Variable, ninjaId);
            const katanaBinding: any = getBindingDictionary(container).get(katanaId)[0];
            expect(katanaBinding?.activated).eql(false);
            const ninja: any = resolveTyped<Ninja>(context);
            expect(katanaBinding?.activated).eql(true);
            expect(ninja instanceof Ninja).eql(true);
            expect(ninja.katana instanceof Katana).eql(true);
            expect(ninja.katana.handler instanceof KatanaHandler).eql(true);
            expect(ninja.katana.blade instanceof KatanaBlade).eql(true);
            expect(ninja.shuriken instanceof Shuriken).eql(true);
        });
        _it('Should_be_able_to_resolve_BindingTypeDynamicValue_bindings', () => {
            interface UseDate1 {
                doSomething(): Date;
            }
            @injectable()
            class UseDate implements UseDate1 {
                public currentDate: Date;
                public constructor(
                @inject('Date')
                currentDate: Date) {
                    this.currentDate = currentDate;
                }
                public doSomething() {
                    return this.currentDate;
                }
            }
            const container = new Container();
            container.bind<UseDate>('UseDate').to(UseDate);
            container.bind<Date>('Date').toDynamicValue((context: interfaces.Context) => new Date());
            const subject1 = container.get<UseDate>('UseDate');
            const subject2 = container.get<UseDate>('UseDate');
            expect(subject1.doSomething() === subject2.doSomething()).eql(false);
            container.unbind('Date');
            container.bind<Date>('Date').toConstantValue(new Date());
            const subject3 = container.get<UseDate>('UseDate');
            const subject4 = container.get<UseDate>('UseDate');
            expect(subject3.doSomething() === subject4.doSomething()).eql(true);
        });
        _it('Should_be_able_to_resolve_BindingTypeConstructor_bindings', () => {
            const ninjaId = 'Ninja';
            const newableKatanaId = 'Newable<Katana>';
            @injectable()
            class Katana {
            }
            @injectable()
            class Ninja {
                public katana: Katana;
                public constructor(
                @inject(newableKatanaId)
                katana: interfaces.Newable<Katana>) {
                    this.katana = new katana(); // IMPORTANT!
                }
            }
            const container = new Container();
            container.bind<Ninja>(ninjaId).to(Ninja);
            container.bind<interfaces.Newable<Katana>>(newableKatanaId).toConstructor<Katana>(Katana); // IMPORTANT!
            const context = plan(new MetadataReader(), container, false, TargetTypeEnum.Variable, ninjaId);
            const ninja: any = resolveTyped<Ninja>(context);
            expect(ninja instanceof Ninja).eql(true);
            expect(ninja.katana instanceof Katana).eql(true);
        });
        _it('Should_be_able_to_resolve_BindingTypeFactory_bindings', () => {
            const ninjaId = 'Ninja';
            const shurikenId = 'Shuriken';
            const swordFactoryId = 'Factory<Sword>';
            const katanaId = 'Katana';
            const handlerId = 'Handler';
            const bladeId = 'Blade';
            interface Blade {
            }
            @injectable()
            class KatanaBlade implements Blade {
            }
            interface Handler {
            }
            @injectable()
            class KatanaHandler implements Handler {
            }
            interface Sword {
                handler: Handler;
                blade: Blade;
            }
            type SwordFactory = () => Sword;
            @injectable()
            class Katana implements Sword {
                public handler: Handler;
                public blade: Blade;
                public constructor(
                @inject(handlerId)
                @targetName('handler')
                handler: Handler, 
                @inject(bladeId)
                @targetName('blade')
                blade: Blade) {
                    this.handler = handler;
                    this.blade = blade;
                }
            }
            interface Shuriken1 {
            }
            @injectable()
            class Shuriken implements Shuriken1 {
            }
            interface Warrior {
                katana: Katana;
                shuriken: Shuriken;
            }
            @injectable()
            class Ninja implements Warrior {
                public katana: Katana;
                public shuriken: Shuriken;
                public constructor(
                @inject(swordFactoryId)
                @targetName('makeKatana')
                makeKatana: SwordFactory, 
                @inject(shurikenId)
                @targetName('shuriken')
                shuriken: Shuriken) {
                    this.katana = makeKatana() as Katana; // IMPORTANT!
                    this.shuriken = shuriken;
                }
            }
            const container = new Container();
            container.bind<Ninja>(ninjaId).to(Ninja);
            container.bind<Shuriken>(shurikenId).to(Shuriken);
            container.bind<Katana>(katanaId).to(Katana);
            container.bind<KatanaBlade>(bladeId).to(KatanaBlade);
            container.bind<KatanaHandler>(handlerId).to(KatanaHandler);
            container.bind<interfaces.Factory<Katana>>(swordFactoryId).toFactory<Katana>((theContext: interfaces.Context) => () => theContext.container.get<Katana>(katanaId));
            const context = plan(new MetadataReader(), container, false, TargetTypeEnum.Variable, ninjaId);
            const ninja: any = resolveTyped<Ninja>(context);
            expect(ninja instanceof Ninja).eql(true);
            expect(ninja.katana instanceof Katana).eql(true);
            expect(ninja.katana.handler instanceof KatanaHandler).eql(true);
            expect(ninja.katana.blade instanceof KatanaBlade).eql(true);
            expect(ninja.shuriken instanceof Shuriken).eql(true);
        });
        _it('Should_be_able_to_resolve_bindings_with_auto_factory', () => {
            const ninjaId = 'Ninja';
            const shurikenId = 'Shuriken';
            const katanaFactoryId = 'Factory<Sword>';
            const katanaId = 'Katana';
            const katanaHandlerId = 'KatanaHandler';
            const katanaBladeId = 'KatanaBlade';
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
            interface Sword {
                handler: KatanaHandler;
                blade: KatanaBlade;
            }
            type SwordFactory = () => Sword;
            @injectable()
            class Katana implements Sword {
                public handler: KatanaHandler;
                public blade: KatanaBlade;
                public constructor(
                @inject(katanaHandlerId)
                @targetName('handler')
                handler: KatanaHandler, 
                @inject(katanaBladeId)
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
            interface Warrior {
                katana: Katana;
                shuriken: Shuriken;
            }
            @injectable()
            class Ninja implements Warrior {
                public katana: Katana;
                public shuriken: Shuriken;
                public constructor(
                @inject(katanaFactoryId)
                @targetName('makeKatana')
                makeKatana: SwordFactory, 
                @inject(shurikenId)
                @targetName('shuriken')
                shuriken: Shuriken) {
                    this.katana = makeKatana() as Katana; // IMPORTANT!
                    this.shuriken = shuriken;
                }
            }
            const container = new Container();
            container.bind<Ninja>(ninjaId).to(Ninja);
            container.bind<Shuriken>(shurikenId).to(Shuriken);
            container.bind<Katana>(katanaId).to(Katana);
            container.bind<KatanaBlade>(katanaBladeId).to(KatanaBlade);
            container.bind<KatanaHandler>(katanaHandlerId).to(KatanaHandler);
            container.bind<interfaces.Factory<Katana>>(katanaFactoryId).toAutoFactory<Katana>(katanaId);
            const context = plan(new MetadataReader(), container, false, TargetTypeEnum.Variable, ninjaId);
            const ninja: any = resolveTyped<Ninja>(context);
            expect(ninja instanceof Ninja).eql(true);
            expect(ninja.katana instanceof Katana).eql(true);
            expect(ninja.katana.handler instanceof KatanaHandler).eql(true);
            expect(ninja.katana.blade instanceof KatanaBlade).eql(true);
            expect(ninja.shuriken instanceof Shuriken).eql(true);
        });
        _it('Should_be_able_to_resolve_BindingTypeProvider_bindings', (done: any) => {
            type SwordProvider = () => Promise<Sword>;
            const ninjaId = 'Ninja';
            const shurikenId = 'Shuriken';
            const swordProviderId = 'Provider<Sword>';
            const swordId = 'Sword';
            const handlerId = 'Handler';
            const bladeId = 'Blade';
            interface Blade {
            }
            @injectable()
            class KatanaBlade implements Blade {
            }
            interface Handler {
            }
            @injectable()
            class KatanaHandler implements Handler {
            }
            interface Sword {
                handler: Handler;
                blade: Blade;
            }
            @injectable()
            class Katana implements Sword {
                public handler: Handler;
                public blade: Blade;
                public constructor(
                @inject(handlerId)
                @targetName('handler')
                handler: Handler, 
                @inject(bladeId)
                @targetName('handler')
                blade: Blade) {
                    this.handler = handler;
                    this.blade = blade;
                }
            }
            interface Shuriken1 {
            }
            @injectable()
            class Shuriken implements Shuriken1 {
            }
            interface Warrior {
                katana: Katana | null;
                katanaProvider: SwordProvider;
                shuriken: Shuriken;
            }
            @injectable()
            class Ninja implements Warrior {
                public katana: Katana | null;
                public katanaProvider: SwordProvider;
                public shuriken: Shuriken;
                public constructor(
                @inject(swordProviderId)
                @targetName('katanaProvider')
                katanaProvider: SwordProvider, 
                @inject(shurikenId)
                @targetName('shuriken')
                shuriken: Shuriken) {
                    this.katana = null;
                    this.katanaProvider = katanaProvider;
                    this.shuriken = shuriken;
                }
            }
            const container = new Container();
            container.bind<Warrior>(ninjaId).to(Ninja);
            container.bind<Shuriken>(shurikenId).to(Shuriken);
            container.bind<Sword>(swordId).to(Katana);
            container.bind<Blade>(bladeId).to(KatanaBlade);
            container.bind<Handler>(handlerId).to(KatanaHandler);
            container.bind<SwordProvider>(swordProviderId).toProvider<Sword>((theContext: interfaces.Context) => () => new Promise<Sword>((resolveFunc) => {
                // Using setTimeout to simulate complex initialization
                setTimeout(() => {
                    resolveFunc(theContext.container.get<Sword>(swordId));
                }, 100);
            }));
            const context = plan(new MetadataReader(), container, false, TargetTypeEnum.Variable, ninjaId);
            const ninja: any = resolveTyped<Warrior>(context);
            expect(ninja instanceof Ninja).eql(true);
            expect(ninja.shuriken instanceof Shuriken).eql(true);
            ninja.katanaProvider().then((katana: any) => {
                ninja.katana = katana;
                expect(ninja.katana instanceof Katana).eql(true);
                expect(ninja.katana.handler instanceof KatanaHandler).eql(true);
                expect(ninja.katana.blade instanceof KatanaBlade).eql(true);
                done();
            });
        });
        _it('Should_be_able_to_resolve_plans_with_constraints_on_tagged_targets', () => {
            interface Weapon {
            }
            @injectable()
            class Katana implements Weapon {
            }
            @injectable()
            class Shuriken implements Weapon {
            }
            interface Warrior {
                katana: Weapon;
                shuriken: Weapon;
            }
            @injectable()
            class Ninja implements Warrior {
                public katana: Weapon;
                public shuriken: Weapon;
                public constructor(
                @inject('Weapon')
                @targetName('katana')
                @tagged('canThrow', false)
                katana: Weapon, 
                @inject('Weapon')
                @targetName('shuriken')
                @tagged('canThrow', true)
                shuriken: Weapon) {
                    this.katana = katana;
                    this.shuriken = shuriken;
                }
            }
            const ninjaId = 'Ninja';
            const weaponId = 'Weapon';
            const container = new Container();
            container.bind<Ninja>(ninjaId).to(Ninja);
            container.bind<Weapon>(weaponId).to(Katana).whenTargetTagged('canThrow', false);
            container.bind<Weapon>(weaponId).to(Shuriken).whenTargetTagged('canThrow', true);
            const context = plan(new MetadataReader(), container, false, TargetTypeEnum.Variable, ninjaId);
            const ninja: any = resolveTyped<Ninja>(context);
            expect(ninja instanceof Ninja).eql(true);
            expect(ninja.katana instanceof Katana).eql(true);
            expect(ninja.shuriken instanceof Shuriken).eql(true);
        });
        _it('Should_be_able_to_resolve_plans_with_constraints_on_named_targets', () => {
            interface Weapon {
            }
            @injectable()
            class Katana implements Weapon {
            }
            @injectable()
            class Shuriken implements Weapon {
            }
            interface Warrior {
                katana: Weapon;
                shuriken: Weapon;
            }
            @injectable()
            class Ninja implements Warrior {
                public katana: Weapon;
                public shuriken: Weapon;
                public constructor(
                @inject('Weapon')
                @targetName('katana')
                @named('strong')
                katana: Weapon, 
                @inject('Weapon')
                @targetName('shuriken')
                @named('weak')
                shuriken: Weapon) {
                    this.katana = katana;
                    this.shuriken = shuriken;
                }
            }
            const ninjaId = 'Ninja';
            const weaponId = 'Weapon';
            const container = new Container();
            container.bind<Ninja>(ninjaId).to(Ninja);
            container.bind<Weapon>(weaponId).to(Katana).whenTargetNamed('strong');
            container.bind<Weapon>(weaponId).to(Shuriken).whenTargetNamed('weak');
            const context = plan(new MetadataReader(), container, false, TargetTypeEnum.Variable, ninjaId);
            const ninja: any = resolveTyped<Ninja>(context);
            expect(ninja instanceof Ninja).eql(true);
            expect(ninja.katana instanceof Katana).eql(true);
            expect(ninja.shuriken instanceof Shuriken).eql(true);
        });
        _it('Should_be_able_to_resolve_plans_with_custom_contextual_constraints', () => {
            interface Weapon {
            }
            @injectable()
            class Katana implements Weapon {
            }
            @injectable()
            class Shuriken implements Weapon {
            }
            interface Warrior {
                katana: Weapon;
                shuriken: Weapon;
            }
            @injectable()
            class Ninja implements Warrior {
                public katana: Weapon;
                public shuriken: Weapon;
                public constructor(
                @inject('Weapon')
                @targetName('katana')
                katana: Weapon, 
                @inject('Weapon')
                @targetName('shuriken')
                shuriken: Weapon) {
                    this.katana = katana;
                    this.shuriken = shuriken;
                }
            }
            const ninjaId = 'Ninja';
            const weaponId = 'Weapon';
            const container = new Container();
            container.bind<Ninja>(ninjaId).to(Ninja);
            container.bind<Weapon>(weaponId).to(Katana).when((request: interfaces.Request) => request.target.name.equals('katana'));
            container.bind<Weapon>(weaponId).to(Shuriken).when((request: interfaces.Request) => request.target.name.equals('shuriken'));
            const context = plan(new MetadataReader(), container, false, TargetTypeEnum.Variable, ninjaId);
            const ninja: any = resolveTyped<Ninja>(context);
            expect(ninja instanceof Ninja).eql(true);
            expect(ninja.katana instanceof Katana).eql(true);
            expect(ninja.shuriken instanceof Shuriken).eql(true);
        });
        _it('Should_be_able_to_resolve_plans_with_multi_injections', () => {
            interface Weapon {
                name: string;
            }
            @injectable()
            class Katana implements Weapon {
                public name = 'Katana';
            }
            @injectable()
            class Shuriken implements Weapon {
                public name = 'Shuriken';
            }
            interface Warrior {
                katana: Weapon;
                shuriken: Weapon;
            }
            @injectable()
            class Ninja implements Warrior {
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
            container.bind<Weapon>(weaponId).to(Katana);
            container.bind<Weapon>(weaponId).to(Shuriken);
            const context = plan(new MetadataReader(), container, false, TargetTypeEnum.Variable, ninjaId);
            const ninja: any = resolveTyped<Ninja>(context);
            expect(ninja instanceof Ninja).eql(true);
            expect(ninja.katana instanceof Katana).eql(true);
            expect(ninja.shuriken instanceof Shuriken).eql(true);
            // if only one value is bound to weaponId
            const container2 = new Container();
            container2.bind<Ninja>(ninjaId).to(Ninja);
            container2.bind<Weapon>(weaponId).to(Katana);
            const context2 = plan(new MetadataReader(), container2, false, TargetTypeEnum.Variable, ninjaId);
            const ninja2: any = resolveTyped<Ninja>(context2);
            expect(ninja2 instanceof Ninja).eql(true);
            expect(ninja2.katana instanceof Katana).eql(true);
        });
        _it('Should_be_able_to_resolve_plans_with_async_multi_injections', async () => {
            interface Weapon {
                name: string;
            }
            @injectable()
            class Katana implements Weapon {
                public name = 'Katana';
            }
            @injectable()
            class Shuriken implements Weapon {
                public name = 'Shuriken';
            }
            interface Warrior {
                katana: Weapon;
                shuriken: Weapon;
            }
            @injectable()
            class Ninja implements Warrior {
                public katana: Weapon;
                public shuriken: Weapon;
                public constructor(
                @multiInject('Weapon')
                weapons: Weapon[]) {
                    this.katana = weapons[0] as Weapon;
                    this.shuriken = weapons[1] as Weapon;
                }
            }
            const ninjaId = 'Ninja';
            const weaponId = 'Weapon';
            const container = new Container();
            container.bind<Ninja>(ninjaId).to(Ninja);
            container.bind<Weapon>(weaponId).toDynamicValue(_ => Promise.resolve(new Katana()));
            container.bind<Weapon>(weaponId).to(Shuriken);
            const context = plan(new MetadataReader(), container, false, TargetTypeEnum.Variable, ninjaId);
            const ninja: any = await resolveTyped<Promise<Ninja>>(context);
            expect(ninja instanceof Ninja).eql(true);
            expect(ninja.katana instanceof Katana).eql(true);
            expect(ninja.shuriken instanceof Shuriken).eql(true);
            // if only one value is bound to weaponId
            const container2 = new Container();
            container2.bind<Ninja>(ninjaId).to(Ninja);
            container2.bind<Weapon>(weaponId).toDynamicValue(_ => new Katana());
            const context2 = plan(new MetadataReader(), container2, false, TargetTypeEnum.Variable, ninjaId);
            const ninja2: any = await resolveTyped<Promise<Ninja>>(context2);
            expect(ninja2 instanceof Ninja).eql(true);
            expect(ninja2.katana instanceof Katana).eql(true);
            expect(ninja2.shuriken === undefined).eql(true);
        });
        _it('Should_be_able_to_resolve_plans_with_async_and_non_async_injections', async () => {
            const syncPropertyId = 'syncProperty';
            const asyncPropertyId = 'asyncProperty';
            const syncCtorId = 'syncCtor';
            const asyncCtorId = 'asyncCtor';
            @injectable()
            class CrazyInjectable {
                @inject(syncCtorId)
                readonly syncCtor: string = '';
                @inject(asyncCtorId)
                readonly asyncCtor: string = '';
                public constructor() {
                }
                @inject(syncPropertyId)
                public syncProperty!: string;
                @inject(asyncPropertyId)
                public asyncProperty!: string;
            }
            const crazyInjectableId = 'crazy';
            const container = new Container();
            container.bind<CrazyInjectable>(crazyInjectableId).to(CrazyInjectable);
            container.bind<string>(syncCtorId).toConstantValue('syncCtor');
            container.bind<string>(asyncCtorId).toDynamicValue(_ => Promise.resolve('asyncCtor'));
            container.bind<string>(syncPropertyId).toConstantValue('syncProperty');
            container.bind<string>(asyncPropertyId).toDynamicValue(_ => Promise.resolve('asyncProperty'));
            const context = plan(new MetadataReader(), container, false, TargetTypeEnum.Variable, crazyInjectableId);
            const crazyInjectable: any = await resolveTyped<Promise<CrazyInjectable>>(context);
            expect(crazyInjectable.syncCtor).eql('syncCtor');
            expect(crazyInjectable.asyncCtor).eql('asyncCtor');
            expect(crazyInjectable.syncProperty).eql('syncProperty');
            expect(crazyInjectable.asyncProperty).eql('asyncProperty');
        });
        _it('Should_be_able_to_resolve_plans_with_activation_handlers', () => {
            interface Sword {
                use(): void;
            }
            @injectable()
            class Katana implements Sword {
                public use: () => string = () => {
                    return 'Used Katana!';
                };
            }
            interface Warrior {
                katana: Katana;
            }
            @injectable()
            class Ninja implements Warrior {
                public katana: Katana;
                public constructor(
                @inject('Katana')
                katana: Katana) {
                    this.katana = katana;
                }
            }
            const ninjaId = 'Ninja';
            const katanaId = 'Katana';
            const container = new Container();
            container.bind<Ninja>(ninjaId).to(Ninja);
            // This is a global for unit testing but remember
            // that it is not a good idea to use globals
            const timeTracker: string[] = [];
            container.bind<Katana>(katanaId).to(Katana).onActivation((theContext: interfaces.Context, katana: Katana) => {
                const handler: any = {
                    apply(target: any, thisArgument: any, argumentsList: any[]): any {
                        timeTracker.push(`Starting ${target.name} ${new Date().getTime()}`);
                        const result: any = target.apply(thisArgument, argumentsList);
                        timeTracker.push(`Finished ${target.name} ${new Date().getTime()}`);
                        return result;
                    }
                };
                /// create a proxy for method use() own by katana instance about to be injected
                katana.use = new Proxy(katana.use, handler);
                return katana;
            });
            const context = plan(new MetadataReader(), container, false, TargetTypeEnum.Variable, ninjaId);
            const ninja: any = resolveTyped<Ninja>(context);
            expect(ninja.katana.use()).eql('Used Katana!');
            expect(Array.isArray(timeTracker)).eql(true);
            expect(timeTracker.length).eql(2);
        });
        _it('Should_be_able_to_resolve_BindingTypeFunction_bindings', () => {
            const ninjaId = 'Ninja';
            const shurikenId = 'Shuriken';
            const katanaFactoryId = 'KatanaFactory';
            type KatanaFactory = () => Katana;
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
            interface Sword {
                handler: KatanaHandler;
                blade: KatanaBlade;
            }
            @injectable()
            class Katana implements Sword {
                public handler: KatanaHandler;
                public blade: KatanaBlade;
                public constructor(handler: KatanaHandler, blade: KatanaBlade) {
                    this.handler = handler;
                    this.blade = blade;
                }
            }
            interface Shuriken1 {
            }
            @injectable()
            class Shuriken implements Shuriken1 {
            }
            interface Warrior {
                katanaFactory: KatanaFactory;
                shuriken: Shuriken;
            }
            const container = new Container();
            container.bind<Ninja1>(ninjaId).to(Ninja1);
            container.bind<Shuriken>(shurikenId).to(Shuriken);
            const katanaFactoryInstance = () => {
                return new Katana(new KatanaHandler(), new KatanaBlade());
            };
            container.bind<KatanaFactory>(katanaFactoryId).toFunction(katanaFactoryInstance);
            const katanaFactoryBinding: any = getBindingDictionary(container).get(katanaFactoryId)[0];
            expect(katanaFactoryBinding?.activated).eql(false);
            const context = plan(new MetadataReader(), container, false, TargetTypeEnum.Variable, ninjaId);
            const ninja: any = resolveTyped<Ninja1>(context);
            expect(ninja instanceof Ninja1).eql(true);
            expect(typeof ninja.katanaFactory === 'function').eql(true);
            expect(ninja.katanaFactory() instanceof Katana).eql(true);
            expect(ninja.katanaFactory().handler instanceof KatanaHandler).eql(true);
            expect(ninja.katanaFactory().blade instanceof KatanaBlade).eql(true);
            expect(ninja.shuriken instanceof Shuriken).eql(true);
            expect(katanaFactoryBinding?.activated).eql(true);
            expect(katanaFactoryBinding?.activated).eql(true);
        });
        _it('Should_run_the_PostConstruct_method', () => {
            interface Sword {
                use(): string;
            }
            @injectable()
            class Katana implements Sword {
                private useMessage!: string;
                public use() {
                    return this.useMessage;
                }
                @postConstruct()
                public postConstruct() {
                    this.useMessage = 'Used Katana!';
                }
            }
            interface Warrior {
                katana: Katana;
            }
            @injectable()
            class Ninja implements Warrior {
                public katana: Katana;
                public constructor(
                @inject('Katana')
                katana: Katana) {
                    this.katana = katana;
                }
            }
            const ninjaId = 'Ninja';
            const katanaId = 'Katana';
            const container = new Container();
            container.bind<Ninja>(ninjaId).to(Ninja);
            container.bind<Katana>(katanaId).to(Katana);
            const context = plan(new MetadataReader(), container, false, TargetTypeEnum.Variable, ninjaId);
            const ninja: any = resolveTyped<Ninja>(context);
            expect(ninja.katana.use()).eql('Used Katana!');
        });
        _it('Should_throw_an_error_if_the_postConstruct_method_throws_an_error', () => {
            @injectable()
            class Katana {
                @postConstruct()
                public postConstruct() {
                    throw new Error('Original Message');
                }
            }
            expect((): any => resolveInstance({} as interfaces.Binding<any>, Katana, [], () => null))
                .to.throw('@postConstruct error in class Katana: Original Message');
        });
        _it('Should run the @PostConstruct method of parent class', () => {
            interface Weapon {
                use(): string;
            }
            @injectable()
            abstract class Sword implements Weapon {
                protected useMessage!: string;
                @postConstruct()
                public postConstruct() {
                    this.useMessage = 'Used Weapon!';
                }
                public abstract use(): string;
            }
            @injectable()
            class Katana extends Sword {
                public use() {
                    return this.useMessage;
                }
            }
            interface Warrior {
                katana: Katana;
            }
            @injectable()
            class Ninja implements Warrior {
                public katana: Katana;
                public constructor(
                @inject('Katana')
                katana: Katana) {
                    this.katana = katana;
                }
            }
            const ninjaId = 'Ninja';
            const katanaId = 'Katana';
            const container = new Container();
            container.bind<Ninja>(ninjaId).to(Ninja);
            container.bind<Katana>(katanaId).to(Katana);
            const context = plan(new MetadataReader(), container, false, TargetTypeEnum.Variable, ninjaId);
            const ninja: any = resolveTyped<Ninja>(context);
            expect(ninja.katana.use()).eql('Used Weapon!');
        });
        _it('Should_run_the_PostConstruct_method_once_in_the_singleton_scope', () => {
            let timesCalled = 0;
            @injectable()
            class Katana {
                @postConstruct()
                public postConstruct() {
                    timesCalled++;
                }
            }
            @injectable()
            class Ninja {
                public katana: Katana;
                public constructor(
                @inject('Katana')
                katana: Katana) {
                    this.katana = katana;
                }
            }
            @injectable()
            class Samurai {
                public katana: Katana;
                public constructor(
                @inject('Katana')
                katana: Katana) {
                    this.katana = katana;
                }
            }
            const ninjaId = 'Ninja';
            const samuraiId = 'Samurai';
            const katanaId = 'Katana';
            const container = new Container();
            container.bind<Ninja>(ninjaId).to(Ninja);
            container.bind<Samurai>(samuraiId).to(Samurai);
            container.bind<Katana>(katanaId).to(Katana).inSingletonScope();
            container.get(ninjaId);
            container.get(samuraiId);
            expect(timesCalled).to.be.equal(1);
        });
        _it('Should_not_cache_bindings_if_a_dependency_in_the_async_chain_fails', async () => {
            let level2Attempts = 0;
            @injectable()
            class Level2 {
                public value: string;
                public constructor(
                @inject('level1')
                value: string) {
                    level2Attempts += 1;
                    this.value = value;
                }
            }
            let level1Attempts = 0;
            const container = new Container({
                defaultScope: 'Singleton', autoBindInjectable: true
            });
            container.bind('level1').toDynamicValue(async (context) => {
                level1Attempts += 1;
                if (level1Attempts === 1) {
                    throw new Error('first try failed.');
                }
                return 'foobar';
            });
            container.bind('a').to(Level2);
            try {
                await container.getAsync('a');
                throw new Error('should have failed on first invocation.');
            }
            catch (ex) {
                // ignore
            }
            const level2 = await container.getAsync<Level2>('a');
            expect(level2.value).equals('foobar');
            expect(level1Attempts).equals(2);
            expect(level2Attempts).equals(1);
        });
        _it('Should_support_async_when_default_scope_is_singleton', async () => {
            const container = new Container({
                defaultScope: 'Singleton'
            });
            container.bind('a').toDynamicValue(async () => Math.random());
            const object1: any = await container.getAsync('a');
            const object2: any = await container.getAsync('a');
            expect(object1).equals(object2);
        });
        _it('Should_return_different_values_if_default_singleton_scope_is_overriden_by_bind', async () => {
            const container = new Container({
                defaultScope: 'Singleton'
            });
            container.bind('a').toDynamicValue(async () => Math.random()).inTransientScope();
            const object1: any = await container.getAsync('a');
            const object2: any = await container.getAsync('a');
            expect(object1).not.equals(object2);
        });
        _it('Should_only_call_parent_async_singleton_once_within_child_containers', async () => {
            const parent = new Container();
            parent.bind<Date>('Parent').toDynamicValue(() => Promise.resolve(new Date())).inSingletonScope();
            const child = parent.createChild();
            let subject1: any;
            let subject2: any;
            Promise.all<Date>([
                child.getAsync<Date>('Parent'),
                child.getAsync<Date>('Parent')
            ]).then((results) => {
                subject1 = results[0];
                subject2 = results[1];
            });
            expect(subject1 === subject2).eql(true);
        });
        _it('Should_return_resolved_instance_to_onDeactivation_when_binding_is_async', async () => {
            let results = await onDeactivation();
            @injectable()
            class Destroyable {
            }
            const container = new Container();
            let deactivatedDestroyable: Destroyable | null = null;
            container.bind<Destroyable>('Destroyable').toDynamicValue(() => Promise.resolve(new Destroyable()))
                .inSingletonScope()
                .onDeactivation((instance) => new Promise((r) => {
                deactivatedDestroyable = instance;
                r();
            }));
            await container.getAsync('Destroyable');
            await container.unbindAsync('Destroyable');
            expect(results.boo).equal(true);
            // with BindingInWhenOnSyntax
            const container2 = new Container({
                defaultScope: 'Singleton'
            });
            let deactivatedDestroyable2: Destroyable | null = null;
            container2.bind<Destroyable>('Destroyable').toDynamicValue(() => Promise.resolve(new Destroyable()))
                .onDeactivation((instance) => new Promise((r) => {
                deactivatedDestroyable2 = instance;
                r();
            }));
            await container2.getAsync('Destroyable');
            await container2.unbindAsync('Destroyable');
            expect(results.boo1).equal(true);
        });
        _it('Should_wait_on_deactivation_promise_before_returning_unbindAsync', async () => {
            let resolved = false;
            @injectable()
            class Destroyable {
            }
            const container = new Container();
            container.bind<Destroyable>('Destroyable').to(Destroyable).inSingletonScope()
                .onDeactivation(() => new Promise((r) => {
                r();
                resolved = true;
            }));
            container.get('Destroyable');
            await container.unbindAsync('Destroyable');
            expect(resolved).eql(true);
        });
        _it('Should_wait_on_predestroy_promise_before_returning_unbindAsync', async () => {
            let resolved = false;
            @injectable()
            class Destroyable {
                @preDestroy()
                public myPreDestroyMethod() {
                    return new Promise<any>((r) => {
                        r({});
                        resolved = true;
                    });
                }
            }
            const container = new Container();
            container.bind<Destroyable>('Destroyable').to(Destroyable).inSingletonScope();
            container.get('Destroyable');
            await container.unbindAsync('Destroyable');
            expect(resolved).eql(true);
        });
        _it('Should_wait_on_deactivation_promise_before_returning_unbindAllAsync', async () => {
            let resolved = false;
            @injectable()
            class Destroyable {
            }
            const container = new Container();
            container.bind<Destroyable>('Destroyable').to(Destroyable).inSingletonScope()
                .onDeactivation(() => new Promise((r) => {
                r();
                resolved = true;
            }));
            container.get('Destroyable');
            await container.unbindAllAsync();
            expect(resolved).eql(true);
        });
        _it('Should_wait_on_predestroy_promise_before_returning_unbindAllAsync', async () => {
            let resolved = false;
            @injectable()
            class Destroyable {
                @preDestroy()
                public myPreDestroyMethod() {
                    return new Promise<any>((r) => {
                        r({});
                        resolved = true;
                    });
                }
            }
            const container = new Container();
            container.bind<Destroyable>('Destroyable').to(Destroyable).inSingletonScope();
            container.get('Destroyable');
            await container.unbindAllAsync();
            expect(resolved).eql(true);
        });
        _it('Should_not_allow_transient_construction_with_async_preDestroy', async () => {
            @injectable()
            class Destroyable {
                @preDestroy()
                public myPreDestroyMethod() {
                    return Promise.resolve();
                }
            }
            const container = new Container();
            container.bind<Destroyable>('Destroyable').to(Destroyable).inTransientScope();
            expect((): any => container.get('Destroyable')).to
                .throw('@preDestroy error in class Destroyable: Class cannot be instantiated in transient scope.');
        });
        _it('Should_not_allow_transient_construction_with_async_deactivation', async () => {
            @injectable()
            class Destroyable {
            }
            const container = new Container();
            container.bind<Destroyable>('Destroyable').to(Destroyable).inTransientScope()
                .onDeactivation(() => Promise.resolve());
            expect((): any => container.get('Destroyable')).to
                .throw('onDeactivation() error in class Destroyable: Class cannot be instantiated in transient scope.');
        });
        _it('Should_not_allow_request_construction_with_preDestroy', async () => {
            @injectable()
            class Destroyable {
                @preDestroy()
                public myPreDestroyMethod() {
                    return;
                }
            }
            const container = new Container();
            container.bind<Destroyable>('Destroyable').to(Destroyable).inRequestScope();
            expect((): any => container.get('Destroyable')).to
                .throw('@preDestroy error in class Destroyable: Class cannot be instantiated in request scope.');
        });
        _it('Should_not_allow_request_construction_with_deactivation', async () => {
            @injectable()
            class Destroyable {
            }
            const container = new Container();
            container.bind<Destroyable>('Destroyable').to(Destroyable).inRequestScope()
                .onDeactivation(() => {
                //
            });
            expect((): any => container.get('Destroyable')).to
                .throw('onDeactivation() error in class Destroyable: Class cannot be instantiated in request scope.');
        });
        _it('Should_force_a_class_with_an_async_deactivation_to_use_the_async_unbindAll_api', async () => {
            @injectable()
            class Destroyable {
            }
            const container = new Container();
            container.bind<Destroyable>('Destroyable').to(Destroyable).inSingletonScope()
                .onDeactivation(() => Promise.resolve());
            container.get('Destroyable');
            expect(() => container.unbindAll()).to
                .throw('Attempting to unbind dependency with asynchronous destruction (@preDestroy or onDeactivation)');
        });
        _it('Should_force_a_class_with_an_async_pre_destroy_to_use_the_async_unbindAll_api', async () => {
            @injectable()
            class Destroyable {
                @preDestroy()
                public myPreDestroyMethod() {
                    return Promise.resolve();
                }
            }
            const container = new Container();
            container.bind<Destroyable>('Destroyable').to(Destroyable).inSingletonScope();
            container.get('Destroyable');
            expect(() => container.unbindAll()).to
                .throw('Attempting to unbind dependency with asynchronous destruction (@preDestroy or onDeactivation)');
        });
        _it('Should_force_a_class_with_an_async_deactivation_to_use_the_async_unbind_api', async () => {
            @injectable()
            class Destroyable {
            }
            const container = new Container();
            container.bind<Destroyable>('Destroyable').to(Destroyable).inSingletonScope()
                .onDeactivation(() => Promise.resolve());
            container.get('Destroyable');
            expect(() => container.unbind('Destroyable')).to
                .throw('Attempting to unbind dependency with asynchronous destruction (@preDestroy or onDeactivation)');
        });
        _it('Should_throw_deactivation_error_when_errors_in_deactivation_sync', () => {
            @injectable()
            class Destroyable {
            }
            const errorMessage = 'the error message';
            const container = new Container();
            container.bind<Destroyable>('Destroyable').to(Destroyable).inSingletonScope()
                .onDeactivation(() => {
                throw new Error(errorMessage);
            });
            container.get('Destroyable');
            const expectedErrorMessage = ERROR_MSGS.ON_DEACTIVATION_ERROR('Destroyable', errorMessage);
            expect(() => container.unbind('Destroyable')).to
                .throw(expectedErrorMessage);
        });
        _it('Should_throw_deactivation_error_when_errors_in_deactivation_async', async () => {
            @injectable()
            class Destroyable {
            }
            const errorMessage = 'the error message';
            const container = new Container();
            container.bind<Destroyable>('Destroyable').to(Destroyable).inSingletonScope()
                .onDeactivation(() => Promise.reject(new Error(errorMessage)));
            container.get('Destroyable');
            const expectedErrorMessage = ERROR_MSGS.ON_DEACTIVATION_ERROR('Destroyable', errorMessage);
            let error: Error | any;
            try {
                await container.unbindAsync('Destroyable');
            }
            catch (e) {
                error = e;
            }
            expect((error as Error).message).to.eql(expectedErrorMessage);
        });
        _it('Should_invoke_destroy_in_orderall_asyncchild_containerparent_containerbinding_class', async () => {
            let roll = 1;
            let binding: any = null;
            let klass: any = null;
            let parent: any = null;
            let child: any = null;
            @injectable()
            class Destroyable {
                @preDestroy()
                public myPreDestroyMethod() {
                    return new Promise<any>((presolve) => {
                        klass = roll;
                        roll += 1;
                        presolve({});
                    });
                }
            }
            const container = new Container();
            container.onDeactivation('Destroyable', () => {
                return new Promise((presolve) => {
                    parent = roll;
                    roll += 1;
                    presolve();
                });
            });
            const childContainer = container.createChild();
            childContainer.bind<Destroyable>('Destroyable').to(Destroyable)
                .inSingletonScope()
                .onDeactivation(() => new Promise((presolve) => {
                binding = roll;
                roll += 1;
                presolve();
            }));
            childContainer.onDeactivation('Destroyable', () => {
                return new Promise((presolve) => {
                    child = roll;
                    roll += 1;
                    presolve();
                });
            });
            childContainer.get('Destroyable');
            await childContainer.unbindAsync('Destroyable');
            expect(roll).eql(5);
            expect(child).eql(1);
            expect(parent).eql(2);
            expect(binding).eql(3);
            expect(klass).eql(4);
        });
        _it('Should_invoke_destroy_in_order_async_child_containerparent_containerbinding_class', async () => {
            let roll = 1;
            let binding: any = null;
            let klass: any = null;
            let parent: any = null;
            let child: any = null;
            @injectable()
            class Destroyable {
                @preDestroy()
                public myPreDestroyMethod() {
                    return new Promise<any>((presolve) => {
                        klass = roll;
                        roll += 1;
                        presolve({});
                    });
                }
            }
            const container = new Container();
            container.onDeactivation('Destroyable', () => {
                parent = roll;
                roll += 1;
            });
            const childContainer = container.createChild();
            childContainer.bind<Destroyable>('Destroyable').to(Destroyable).inSingletonScope().onDeactivation(() => {
                binding = roll;
                roll += 1;
            });
            childContainer.onDeactivation('Destroyable', () => {
                return new Promise((presolve) => {
                    child = roll;
                    roll += 1;
                    presolve();
                });
            });
            childContainer.get('Destroyable');
            await childContainer.unbindAsync('Destroyable');
            expect(roll).eql(5);
            expect(child).eql(1);
            expect(parent).eql(2);
            expect(binding).eql(3);
            expect(klass).eql(4);
        });
        _it('Should_invoke_destroy_in_order_all_sync_child_container_parent_container_binding_class', () => {
            let roll = 1;
            let binding: any = null;
            let klass: any = null;
            let parent: any = null;
            let child: any = null;
            @injectable()
            class Destroyable {
                @preDestroy()
                public myPreDestroyMethod() {
                    klass = roll;
                    roll += 1;
                }
            }
            const container = new Container();
            container.onDeactivation('Destroyable', () => {
                parent = roll;
                roll += 1;
            });
            const childContainer = container.createChild();
            childContainer.bind<Destroyable>('Destroyable').to(Destroyable).inSingletonScope().onDeactivation(() => {
                binding = roll;
                roll += 1;
            });
            childContainer.onDeactivation('Destroyable', () => {
                child = roll;
                roll += 1;
            });
            childContainer.get('Destroyable');
            childContainer.unbind('Destroyable');
            expect(roll).eql(5);
            expect(child).eql(1);
            expect(parent).eql(2);
            expect(binding).eql(3);
            expect(klass).eql(4);
        });
        _it('Should_invoke_destroy_in_order_async_child_container_parent_container_binding_class', async () => {
            let roll = 1;
            let binding: any = null;
            let klass: any = null;
            let parent: any = null;
            let child: any = null;
            @injectable()
            class Destroyable {
                @preDestroy()
                public async myPreDestroyMethod() {
                    klass = roll;
                    roll += 1;
                }
            }
            const container = new Container();
            container.onDeactivation('Destroyable', async () => {
                parent = roll;
                roll += 1;
            });
            const childContainer = container.createChild();
            childContainer.bind<Destroyable>('Destroyable').to(Destroyable).inSingletonScope().onDeactivation(() => {
                binding = roll;
                roll += 1;
            });
            childContainer.onDeactivation('Destroyable', () => {
                child = roll;
                roll += 1;
            });
            childContainer.get('Destroyable');
            await childContainer.unbindAsync('Destroyable');
            expect(roll).eql(5);
            expect(child).eql(1);
            expect(parent).eql(2);
            expect(binding).eql(3);
            expect(klass).eql(4);
        });
        _it('Should_force_a_class_with_an_async_pre_destroy_to_use_the_async_unbind_api', async () => {
            @injectable()
            class Destroyable {
                @preDestroy()
                public myPreDestroyMethod() {
                    return Promise.resolve();
                }
            }
            const container = new Container();
            container.bind<Destroyable>('Destroyable').to(Destroyable).inSingletonScope();
            container.get('Destroyable');
            expect(() => container.unbind('Destroyable')).to
                .throw('Attempting to unbind dependency with asynchronous destruction (@preDestroy or onDeactivation)');
        });
        _it('Should_force_a_class_with_an_async_onActivation_to_use_the_async_api', async () => {
            @injectable()
            class Constructable {
            }
            const container = new Container();
            container.bind<Constructable>('Constructable').to(Constructable).inSingletonScope()
                .onActivation(() => Promise.resolve());
            expect((): any => container.get('Constructable')).to.throw(`You are attempting to construct 'Constructable' in a synchronous way
 but it has asynchronous dependencies.`);
        });
        _it('Should_force_a_class_with_an_async_post_construct_to_use_the_async_api', async () => {
            @injectable()
            class Constructable {
                @postConstruct()
                public myPostConstructMethod() {
                    return Promise.resolve();
                }
            }
            const container = new Container();
            container.bind<Constructable>('Constructable').to(Constructable);
            expect((): any => container.get('Constructable')).to.throw(`You are attempting to construct 'Constructable' in a synchronous way
 but it has asynchronous dependencies.`);
        });
        _it('Should_retry_promise_if_first_time_failed', async () => {
            @injectable()
            class Constructable {
            }
            let attemped = false;
            const container = new Container();
            container.bind<Constructable>('Constructable').toDynamicValue(() => {
                if (attemped) {
                    return Promise.resolve(new Constructable());
                }
                attemped = true;
                return Promise.reject('break');
            }).inSingletonScope();
            try {
                await container.getAsync('Constructable');
                throw new Error('should have thrown exception.');
            }
            catch (ex) {
                await container.getAsync('Constructable');
            }
        });
        _it('Should_return_resolved_instance_to_onActivation_when_binding_is_async', async () => {
            let results = await onActivation();
            @injectable()
            class Constructable {
            }
            let activated: Constructable | null = null;
            const container = new Container();
            container.bind<Constructable>('Constructable').toDynamicValue(() => Promise.resolve(new Constructable()))
                .inSingletonScope()
                .onActivation((context, c) => new Promise((r) => {
                activated = c;
                r(c);
            }));
            await container.getAsync('Constructable');
            expect(results.boo1).equal(true);
        });
        _it('Should_not_allow_sync_get_if_an_async_activation_was_added_to_container', async () => {
            const container = new Container();
            container.bind('foo').toConstantValue('bar');
            container.onActivation('foo', () => Promise.resolve('baz'));
            expect((): any => container.get('foo')).to.throw(`You are attempting to construct 'foo' in a synchronous way
 but it has asynchronous dependencies.`);
        });
        _it('Should_allow_onActivation_sync_of_a_previously_binded_sync_object_without_activation', async () => {
            const container = new Container();
            container.bind('foo').toConstantValue('bar');
            container.onActivation('foo', () => 'baz');
            const result: any = container.get('foo');
            expect(result).eql('baz');
        });
        _it('Should_allow_onActivation_to_replace_objects_in_async_autoBindInjectable_chain', async () => {
            class Level1 {
            }
            @injectable()
            class Level2 {
                public level1: Level1;
                constructor(
                @inject(Level1)
                l1: Level1) {
                    this.level1 = l1;
                }
            }
            @injectable()
            class Level3 {
                public level2: Level2;
                constructor(
                @inject(Level2)
                l2: Level2) {
                    this.level2 = l2;
                }
            }
            const constructedLevel2 = new Level2(new Level1());
            const container = new Container({
                autoBindInjectable: true, defaultScope: 'Singleton'
            });
            container.bind(Level1).toDynamicValue(() => Promise.resolve(new Level1()));
            container.onActivation(Level2, () => {
                return Promise.resolve(constructedLevel2);
            });
            const level2 = await container.getAsync(Level2);
            expect(level2).equals(constructedLevel2);
            const level3 = await container.getAsync(Level3);
            expect(level3.level2).equals(constructedLevel2);
        });
        _it('Should_allow_onActivation_async_of_a_previously_binded_sync_object_without_activation', async () => {
            const container = new Container();
            container.bind('foo').toConstantValue('bar');
            container.onActivation('foo', () => Promise.resolve('baz'));
            const result: any = await container.getAsync('foo');
            expect(result).eql('baz');
        });
        _it('Should_allow_onActivation_sync_of_a_previously_binded_async_object_without_activation', async () => {
            const container = new Container();
            container.bind('foo').toDynamicValue(() => Promise.resolve('bar'));
            container.onActivation('foo', () => 'baz');
            const result: any = await container.getAsync('foo');
            expect(result).eql('baz');
        });
        _it('Should_allow_onActivation_async_of_a_previously_binded_async_object_without_activation', async () => {
            const container = new Container();
            container.bind('foo').toDynamicValue(() => Promise.resolve('bar'));
            container.onActivation('foo', () => Promise.resolve('baz'));
            const result: any = await container.getAsync('foo');
            expect(result).eql('baz');
        });
        _it('Should_allow_onActivation_sync_of_a_previously_binded_sync_object_with_activation', async () => {
            const container = new Container();
            container.bind('foo').toConstantValue('bar').onActivation(() => 'bum');
            container.onActivation('foo', (context, previous: any) => `${previous}baz`);
            const result: any = container.get('foo');
            expect(result).eql('bumbaz');
        });
        _it('Should_allow_onActivation_async_of_a_previously_binded_sync_object_with_activation', async () => {
            const container = new Container();
            container.bind('foo').toConstantValue('bar').onActivation(() => 'bum');
            container.onActivation('foo', (context, previous: any) => Promise.resolve(`${previous}baz`));
            const result: any = await container.getAsync('foo');
            expect(result).eql('bumbaz');
        });
        _it('Should_allow_onActivation_sync_of_a_previously_binded_async_object_with_activation', async () => {
            const container = new Container();
            container.bind('foo').toDynamicValue(() => Promise.resolve('bar')).onActivation(() => 'bum');
            container.onActivation('foo', (context, previous: any) => `${previous}baz`);
            const result: any = await container.getAsync('foo');
            expect(result).eql('bumbaz');
        });
        _it('Should_allow_onActivation_async_of_a_previously_binded_async_object_with_activation', async () => {
            const container = new Container();
            container.bind('foo').toDynamicValue(() => Promise.resolve('bar')).onActivation(() => 'bum');
            container.onActivation('foo', (context, previous: any) => Promise.resolve(`${previous}baz`));
            const result: any = await container.getAsync('foo');
            expect(result).eql('bumbaz');
        });
        _it('Should_allow_onActivation_sync_of_parent_async_through_autobind_tree', async () => {
            class Parent {
                foo: string = '';
            }
            @injectable()
            class Child {
                public parent: Parent;
                public constructor(
                @inject(Parent)
                parent: Parent) {
                    this.parent = parent;
                }
            }
            const container = new Container({
                autoBindInjectable: true
            });
            container.bind<Parent>(Parent).toDynamicValue(() => Promise.resolve(new Parent()));
            const constructed = new Parent();
            constructed.foo = 'bar';
            container.onActivation(Parent, () => constructed);
            const result = await container.getAsync(Child);
            expect(result.parent).equals(constructed);
        });
        _it('Should_allow_onActivation_sync_of_child_async_through_autobind_tree', async () => {
            class Parent {
            }
            @injectable()
            class Child {
                public parent: Parent;
                public constructor(
                @inject(Parent)
                parent: Parent) {
                    this.parent = parent;
                }
            }
            const container = new Container({
                autoBindInjectable: true
            });
            container.bind<Parent>(Parent).toDynamicValue(() => Promise.resolve(new Parent()));
            const constructed = new Child(new Parent());
            container.onActivation(Child, () => constructed);
            const result = await container.getAsync(Child);
            expect(result).equals(constructed);
        });
        _it('Should_allow_onActivation_async_of_parent_async_through_autobind_tree', async () => {
            class Parent {
            }
            @injectable()
            class Child {
                public parent: Parent;
                public constructor(
                @inject(Parent)
                parent: Parent) {
                    this.parent = parent;
                }
            }
            const container = new Container({
                autoBindInjectable: true
            });
            container.bind<Parent>(Parent).toDynamicValue(() => Promise.resolve(new Parent()));
            const constructed = new Parent();
            container.onActivation(Parent, () => Promise.resolve(constructed));
            const result = await container.getAsync(Child);
            expect(result.parent).equals(constructed);
        });
        _it('Should_allow_onActivation_async_of_child_async_through_autobind_tree', async () => {
            class Parent {
            }
            @injectable()
            class Child {
                public parent: Parent;
                public constructor(
                @inject(Parent)
                parent: Parent) {
                    this.parent = parent;
                }
            }
            const container = new Container({
                autoBindInjectable: true
            });
            container.bind<Parent>(Parent).toDynamicValue(() => Promise.resolve(new Parent()));
            const constructed = new Child(new Parent());
            container.onActivation(Child, () => Promise.resolve(constructed));
            const result = await container.getAsync(Child);
            expect(result).equals(constructed);
        });
        _it('Should_allow_onActivation_of_child_on_parent_container', async () => {
            class Parent {
            }
            @injectable()
            class Child {
                public parent: Parent;
                public constructor(
                @inject(Parent)
                parent: Parent) {
                    this.parent = parent;
                }
            }
            const container = new Container({
                autoBindInjectable: true
            });
            container.bind<Parent>(Parent).toDynamicValue(() => Promise.resolve(new Parent()));
            const constructed = new Child(new Parent());
            container.onActivation(Child, () => Promise.resolve(constructed));
            const child = container.createChild();
            const result = await child.getAsync(Child);
            expect(result).equals(constructed);
        });
        _it('Should_allow_onActivation_of_parent_on_parent_container', async () => {
            class Parent {
            }
            @injectable()
            class Child {
                public parent: Parent;
                public constructor(
                @inject(Parent)
                parent: Parent) {
                    this.parent = parent;
                }
            }
            const container = new Container({
                autoBindInjectable: true
            });
            container.bind<Parent>(Parent).toDynamicValue(() => Promise.resolve(new Parent()));
            const constructed = new Parent();
            container.onActivation(Parent, () => Promise.resolve(constructed));
            const child = container.createChild();
            const result = await child.getAsync(Child);
            expect(result.parent).equals(constructed);
        });
        _it('Should_allow_onActivation_of_child_from_child_container', async () => {
            class Parent {
            }
            @injectable()
            class Child {
                public parent: Parent;
                public constructor(
                @inject(Parent)
                parent: Parent) {
                    this.parent = parent;
                }
            }
            const container = new Container({
                autoBindInjectable: true
            });
            container.bind<Parent>(Parent).toDynamicValue(() => Promise.resolve(new Parent()));
            const constructed = new Child(new Parent());
            const child = container.createChild();
            child.onActivation(Child, () => Promise.resolve(constructed));
            const result = await child.getAsync(Child);
            expect(result).equals(constructed);
        });
        _it('Should_priortize_onActivation_of_parent_container_over_child_container', () => {
            const container = new Container();
            container.onActivation('foo', (context, previous: any) => `${previous}baz`);
            container.onActivation('foo', (context, previous: any) => `${previous}1`);
            const child = container.createChild();
            child.bind<string>('foo').toConstantValue('bar').onActivation((c, previous) => `${previous}bah`);
            child.onActivation('foo', (context, previous: any) => `${previous}bum`);
            child.onActivation('foo', (context, previous: any) => `${previous}2`);
            const result: any = child.get('foo');
            expect(result).equals('barbahbaz1bum2');
        });
        _it('Should_priortize_async_onActivation_of_parent_container_over_child_container_async', async () => {
            const container = new Container();
            container.onActivation('foo', async (context, previous: any) => `${previous}baz`);
            container.onActivation('foo', async (context, previous: any) => `${previous}1`);
            const child = container.createChild();
            child.bind<string>('foo').toConstantValue('bar').onActivation((c, previous) => `${previous}bah`);
            child.onActivation('foo', async (context, previous: any) => `${previous}bum`);
            child.onActivation('foo', async (context, previous: any) => `${previous}2`);
            const result: any = await child.getAsync('foo');
            expect(result).equals('barbahbaz1bum2');
        });
        _it('Should_not_allow_onActivation_of_parent_on_child_container', async () => {
            class Parent {
            }
            @injectable()
            class Child {
                public parent: Parent;
                public constructor(
                @inject(Parent)
                parent: Parent) {
                    this.parent = parent;
                }
            }
            const container = new Container({
                autoBindInjectable: true
            });
            container.bind<Parent>(Parent).toDynamicValue(() => Promise.resolve(new Parent())).inSingletonScope();
            const constructed = new Parent();
            const child = container.createChild();
            child.onActivation(Parent, () => Promise.resolve(constructed));
            const result = await child.getAsync(Child);
            expect(result.parent).not.equals(constructed);
        });
        _it('Should_wait_until_onActivation_promise_resolves_before_returning_object', async () => {
            let resolved = false;
            let results = await onActivation();
            @injectable()
            class Constructable {
            }
            const container = new Container();
            container.bind<Constructable>('Constructable').to(Constructable).inSingletonScope()
                .onActivation((context, c) => new Promise((r) => {
                resolved = true;
                r(c);
            }));
            const result: any = await container.getAsync('Constructable');
            expect(results.boo1).equal(true);
            expect(resolved).eql(true);
        });
        _it('Should_wait_until_postConstruct_promise_resolves_before_returning_object', async () => {
            let resolved = false;
            let results = await postConstruct1();
            @injectable()
            class Constructable {
                @postConstruct()
                public myPostConstructMethod() {
                    return new Promise<any>((r) => {
                        resolved = true;
                        r({});
                    });
                }
            }
            const container = new Container();
            container.bind<Constructable>('Constructable').to(Constructable);
            const result: any = await container.getAsync('Constructable');
            expect(results.boo1).equal(true);
            expect(resolved).eql(true);
        });
        _it('Should_only_call_async_method_once_if_marked_as_singleton_indirect', async () => {
            interface UseDate1 {
                doSomething(): Date;
            }
            @injectable()
            class UseDate implements UseDate1 {
                public currentDate: Date;
                public constructor(
                @inject('Date')
                currentDate: Date) {
                    expect(currentDate).instanceOf(Date);
                    this.currentDate = currentDate;
                }
                public doSomething() {
                    return this.currentDate;
                }
            }
            const container = new Container();
            container.bind<UseDate>('UseDate').to(UseDate);
            container.bind<Date>('Date').toDynamicValue(() => Promise.resolve(new Date())).inSingletonScope();
            const subject1 = await container.getAsync<UseDate>('UseDate');
            const subject2 = await container.getAsync<UseDate>('UseDate');
            expect(subject1.doSomething() === subject2.doSomething()).eql(true);
        });
        _it('Should_support_async_singletons_when_using_autoBindInjectable', async () => {
            let results = await autoBindInjectable();
            @injectable()
            class AsyncValue {
                public date: Date;
                public constructor(
                @inject('Date')
                date: Date) {
                    this.date = date;
                }
            }
            @injectable()
            class MixedDependency {
                public asyncValue: AsyncValue;
                public date!: Date;
                public constructor(
                @inject(AsyncValue)
                asyncValue: AsyncValue) {
                    expect(results.boo1).equal(true);
                    this.asyncValue = asyncValue;
                }
            }
            const container = new Container({
                autoBindInjectable: true, defaultScope: 'Singleton'
            });
            container.bind<Date>('Date').toDynamicValue(() => Promise.resolve(new Date())).inSingletonScope();
            const object1 = await container.getAsync<MixedDependency>(MixedDependency);
            const object2 = await container.getAsync<MixedDependency>(MixedDependency);
            expect(object1).equals(object2);
        });
        _it('Should_support_shared_async_singletons_when_using_autoBindInjectable', async () => {
            let results = await sharedAutoBindInjectable();
            @injectable()
            class AsyncValue {
                public date: Date;
                public constructor(
                @inject('Date')
                date: Date) {
                    this.date = date;
                }
            }
            @injectable()
            class MixedDependency {
                public asyncValue: AsyncValue;
                public constructor(
                @inject(AsyncValue)
                asyncValue: AsyncValue) {
                    expect(results.boo1).equal(true);
                    this.asyncValue = asyncValue;
                }
            }
            const container = new Container({
                autoBindInjectable: true, defaultScope: 'Singleton'
            });
            container.bind<Date>('Date').toDynamicValue(() => Promise.resolve(new Date())).inSingletonScope();
            const async = await container.getAsync<AsyncValue>(AsyncValue);
            const object1 = await container.getAsync<MixedDependency>(MixedDependency);
            expect(async).equals(object1.asyncValue);
        });
        _it('Should_support_async_dependencies_in_multiple_layers', async () => {
            let results = await layers();
            @injectable()
            class AsyncValue {
                public date: Date;
                public constructor(
                @inject('Date')
                date: Date) {
                    //expect(date).instanceOf(date);
                    this.date = date;
                }
            }
            @injectable()
            class MixedDependency {
                public asyncValue: AsyncValue;
                public date: Date;
                public constructor(
                @inject(AsyncValue)
                asyncValue: AsyncValue, 
                @inject('Date')
                date: Date) {
                    expect(results.boo).equal(true);
                    expect(date).instanceOf(Date);
                    this.date = date;
                    this.asyncValue = asyncValue;
                }
            }
            const container = new Container({
                autoBindInjectable: true
            });
            container.bind<Date>('Date').toDynamicValue(() => Promise.resolve(new Date())).inSingletonScope();
            const subject1 = await container.getAsync<MixedDependency>(MixedDependency);
            expect(subject1.date).instanceOf(Date);
            expect(results.boo1).equal(true);
        });
        _it('Should_support_async_values_already_in_cache', async () => {
            const container = new Container({
                autoBindInjectable: true
            });
            container.bind<Date>('Date').toDynamicValue(() => Promise.resolve(new Date())).inSingletonScope();
            expect(await container.getAsync<Date>('Date'))
                .instanceOf(Date); // causes container to cache singleton as Lazy object
            expect(await container.getAsync<Date>('Date')).instanceOf(Date);
        });
        _it('Should_support_async_values_already_in_cache_when_there_dependencies', async () => {
            @injectable()
            class HasDependencies {
                public constructor(
                @inject('Date')
                date: Date) {
                    expect(date).instanceOf(Date);
                }
            }
            const container = new Container({
                autoBindInjectable: true
            });
            container.bind<Date>('Date').toDynamicValue(() => Promise.resolve(new Date())).inSingletonScope();
            expect(await container.getAsync<Date>('Date'))
                .instanceOf(Date); // causes container to cache singleton as Lazy object
            await container.getAsync<HasDependencies>(HasDependencies);
        });
        _it('Should_support_async_values_already_in_cache_when_there_are_transient_dependencies', async () => {
            let results: any = await dependencies();
            @injectable()
            class Parent {
                public constructor(
                @inject('Date')
                date: Date) {
                    expect(date).instanceOf(Date);
                }
            }
            @injectable()
            class Child {
                public constructor(
                @inject(Parent)
                parent: Parent, 
                @inject('Date')
                date: Date) {
                    expect(results.boo).equal(true);
                    expect(date).instanceOf(Date);
                }
            }
            const container = new Container({
                autoBindInjectable: true
            });
            container.bind<Date>('Date').toDynamicValue(() => Promise.resolve(new Date())).inSingletonScope();
            expect(await container.getAsync<Date>('Date'))
                .instanceOf(Date); // causes container to cache singleton as Lazy object
            await container.getAsync<Child>(Child);
        });
        _it('Should_be_able_to_mix_async_bindings_with_non_async_values', async () => {
            interface UseDate1 {
            }
            @injectable()
            class UseDate implements UseDate1 {
                public currentDate: Date;
                public foobar: string;
                public constructor(
                @inject('Date')
                currentDate: Date, 
                @inject('Static')
                foobar: string) {
                    expect(currentDate).instanceOf(Date);
                    this.currentDate = currentDate;
                    this.foobar = foobar;
                }
            }
            const container = new Container();
            container.bind<UseDate>('UseDate').to(UseDate);
            container.bind<Date>('Date').toDynamicValue(() => Promise.resolve(new Date()));
            container.bind<String>('Static').toConstantValue('foobar');
            const subject1 = await container.getAsync<UseDate>('UseDate');
            expect(subject1.foobar).eql('foobar');
        });
        _it('Should_throw_exception_if_using_sync_API_with_async_dependencies', async () => {
            interface UseDate1 {
                doSomething(): Date;
            }
            @injectable()
            class UseDate implements UseDate1 {
                public currentDate: Date;
                public constructor(
                @inject('Date')
                currentDate: Date) {
                    expect(currentDate).instanceOf(Date);
                    this.currentDate = currentDate;
                }
                public doSomething() {
                    return this.currentDate;
                }
            }
            const container = new Container();
            container.bind<UseDate>('UseDate').to(UseDate);
            container.bind<Date>('Date').toDynamicValue(() => Promise.resolve(new Date()));
            expect(() => container.get<UseDate>('UseDate')).to.throw(`You are attempting to construct 'UseDate' in a synchronous way
 but it has asynchronous dependencies.`);
        });
        _it('Should_be_able_to_resolve_indirect_Promise_bindings', async () => {
            interface UseDate1 {
                doSomething(): Date;
            }
            @injectable()
            class UseDate implements UseDate1 {
                public currentDate: Date;
                public constructor(
                @inject('Date')
                currentDate: Date) {
                    expect(currentDate).instanceOf(Date);
                    this.currentDate = currentDate;
                }
                public doSomething() {
                    return this.currentDate;
                }
            }
            const container = new Container();
            container.bind<UseDate>('UseDate').to(UseDate);
            container.bind<Date>('Date').toDynamicValue(() => Promise.resolve(new Date()));
            const subject1 = await container.getAsync<UseDate>('UseDate');
            const subject2 = await container.getAsync<UseDate>('UseDate');
            expect(subject1.doSomething() === subject2.doSomething()).eql(false);
        });
        _it('Should_be_able_to_resolve_direct_promise_bindings', async () => {
            const container = new Container();
            container.bind<string>('async').toDynamicValue(() => Promise.resolve('foobar'));
            const value = await container.getAsync<string>('async');
            expect(value).eql('foobar');
        });
        _it('Should_error_if_trying_to_resolve_an_promise_in_sync_API', () => {
            const container = new Container();
            container.bind<string>('async').toDynamicValue(() => Promise.resolve('foobar'));
            expect(() => container.get<string>('async')).to.throw(`You are attempting to construct 'async' in a synchronous way
 but it has asynchronous dependencies.`);
        });
    });
}
