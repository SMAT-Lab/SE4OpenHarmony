let __generate__Id: number = 0;
function generateId(): string {
    return "inversify.test_" + ++__generate__Id;
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
import * as ERROR_MSGS from 'inversify/lib/constants/error_msgs';
import { interfaces } from 'inversify';
import { arrayConversion } from '../tools/utilFun';
import { Container, ContainerModule, decorate, inject, injectable, LazyServiceIdentifer, multiInject, named, tagged, targetName, typeConstraint, unmanaged } from 'inversify';
import * as ns from "reflect-metadata";
import { SYMBOL, invertPrototype, SYMBOLSSymbol2, SYMBOLSSymbol4, TYPESSymbol2, TYPESSymbol3, TYPESSymbol4 } from '../tools/tools';
import { symbolFor, } from '../tools/symbol';
import { ninjaFun } from '../tools/reflectMetadata';
ns;
export default function inversifyTest() {
    describe('inversifyTest', () => {
        _it('Should_be_able_to_resolve_and_inject_dependencies', () => {
            interface Ninja1 {
                fight(): string;
                sneak(): string;
            }
            interface Katana1 {
                h_it(): string;
            }
            interface Shuriken1 {
                throw(): string;
            }
            @injectable()
            class Katana implements Katana1 {
                public h_it() {
                    return 'cut!';
                }
            }
            @injectable()
            class Shuriken implements Shuriken1 {
                public throw() {
                    return 'hit!';
                }
            }
            @injectable()
            class Ninja implements Ninja1 {
                private _katana: Katana;
                private _shuriken: Shuriken;
                public constructor(
                @inject('Katana')
                katana: Katana, 
                @inject('Shuriken')
                shuriken: Shuriken) {
                    this._katana = katana;
                    this._shuriken = shuriken;
                }
                public fight(): string { return this._katana.h_it(); }
                public sneak(): string { return this._shuriken.throw(); }
            }
            const container = new Container();
            container.bind<Ninja>('Ninja').to(Ninja);
            container.bind<Katana>('Katana').to(Katana);
            container.bind<Shuriken>('Shuriken').to(Shuriken);
            const ninja = container.get<Ninja>('Ninja');
            expect(ninja.fight()).eql('cut!');
            expect(ninja.sneak()).eql('hit!');
        });
        _it('Should_be_able_to_do_setter_injection_and_property_injection', () => {
            interface Katana1 {
                h_it(): string;
            }
            @injectable()
            class Shuriken {
                public throw() {
                    return 'hit!';
                }
            }
            @injectable()
            class Katana implements Katana1 {
                public h_it() {
                    return 'cut!';
                }
            }
            @injectable()
            class Ninja {
                private _shuriken!: Shuriken;
                @inject(Shuriken)
                public set Shuriken(shuriken: Shuriken) {
                    this._shuriken = shuriken;
                }
                @inject(Katana)
                public katana!: Katana;
                public sneak(): string { return this._shuriken.throw(); }
                public fight(): string { return this.katana.h_it(); }
            }
            const container = new Container();
            container.bind<Ninja>('Ninja').to(Ninja);
            container.bind(Shuriken).toSelf();
            container.bind(Katana).toSelf();
            const ninja = container.get<Ninja>('Ninja');
            expect(ninja.sneak()).to.eql('hit!');
            expect(ninja.fight()).to.eql('cut!');
        });
        _it('Should_be_able_to_resolve_and_inject_dependencies_in_VanillaJS', () => {
            interface typs {
                Katana: string;
                Ninja: string;
                Shuriken: string;
                Blowgun: string;
            }
            const TYPES: typs = {
                Katana: 'Katana',
                Ninja: 'Ninja',
                Shuriken: 'Shuriken',
                Blowgun: 'Blowgun'
            };
            class Blowgun {
                public blow() {
                    return 'poison!';
                }
            }
            class Katana {
                public h_it() {
                    return 'cut!';
                }
            }
            class Shuriken {
                public throw() {
                    return 'hit!';
                }
            }
            class Ninja {
                public _katana: Katana;
                public _shuriken: Shuriken;
                public _blowgun!: Blowgun;
                public constructor(katana: Katana, shuriken: Shuriken) {
                    this._katana = katana;
                    this._shuriken = shuriken;
                }
                public fight(): string { return this._katana.h_it(); }
                public sneak(): string { return this._shuriken.throw(); }
                public poisonDart(): string { return this._blowgun.blow(); }
                public set blowgun(blowgun: Blowgun) {
                    this._blowgun = blowgun;
                }
            }
            let Prototype: any = invertPrototype(Ninja);
            decorate(injectable(), Katana);
            decorate(injectable(), Shuriken);
            decorate(injectable(), Ninja);
            decorate(injectable(), Blowgun);
            decorate(inject(TYPES.Katana), Ninja, 0);
            decorate(inject(TYPES.Shuriken), Ninja, 1);
            decorate(inject(TYPES.Blowgun), Prototype, 'blowgun');
            const container = new Container();
            container.bind<Ninja>(TYPES.Ninja).to(Ninja);
            container.bind<Katana>(TYPES.Katana).to(Katana);
            container.bind<Shuriken>(TYPES.Shuriken).to(Shuriken);
            container.bind<Blowgun>(TYPES.Blowgun).to(Blowgun);
            const ninja = container.get<Ninja>(TYPES.Ninja);
            expect(ninja.fight()).eql('cut!');
            expect(ninja.sneak()).eql('hit!');
            expect(ninja.poisonDart()).eql('poison!');
        });
        _it('Should_be_able_to_use_classes_as_runtime_identifiers', () => {
            // @injectable()
            // class Katana {
            //   public h_it() {
            //     return 'cut!';
            //   }
            // }
            //
            // @injectable()
            // class Shuriken {
            //   public throw() {
            //     return 'hit!';
            //   }
            // }
            //
            // @injectable()
            // @Reflect.metadata("design:paramtypes",[Katana,Shuriken])
            // class Ninja {
            //
            //   private _katana: Katana;
            //   private _shuriken: Shuriken;
            //
            //   public constructor(katana: Katana, shuriken: Shuriken) {
            //     this._katana = katana;
            //     this._shuriken = shuriken;
            //   }
            //
            //   public fight():string { return this._katana.h_it(); }
            //   public sneak():string { return this._shuriken.throw(); }
            //
            // }
            //
            // const container = new Container();
            // container.bind<Ninja>(Ninja).to(Ninja);
            // container.bind<Katana>(Katana).to(Katana);
            // container.bind<Shuriken>(Shuriken).to(Shuriken);
            //
            const ninja: any = ninjaFun();
            expect(ninja.fight()).eql('cut!');
            expect(ninja.sneak()).eql('hit!');
        });
        _it('Should_be_able_to_use_Symbols_as_runtime_identifiers', () => {
            interface Ninja2 {
                fight(): string;
                sneak(): string;
            }
            interface Katana2 {
                h_it(): string;
            }
            interface Shuriken2 {
                throw(): string;
            }
            @injectable()
            class Katana implements Katana2 {
                public h_it() {
                    return 'cut!';
                }
            }
            @injectable()
            class Shuriken implements Shuriken2 {
                public throw() {
                    return 'hit!';
                }
            }
            const TYPES = TYPESSymbol3();
            @injectable()
            class Ninja implements Ninja2 {
                private _katana: Katana;
                private _shuriken: Shuriken;
                public constructor(
                @inject(TYPES.Katana)
                katana: Katana, 
                @inject(TYPES.Shuriken)
                shuriken: Shuriken) {
                    this._katana = katana;
                    this._shuriken = shuriken;
                }
                public fight(): string { return this._katana.h_it(); }
                public sneak(): string { return this._shuriken.throw(); }
            }
            const container = new Container();
            container.bind<Ninja>(TYPES.Ninja).to(Ninja);
            container.bind<Katana>(TYPES.Katana).to(Katana);
            container.bind<Shuriken>(TYPES.Shuriken).to(Shuriken);
            const ninja = container.get<Ninja>(TYPES.Ninja);
            expect(ninja.fight()).eql('cut!');
            expect(ninja.sneak()).eql('hit!');
        });
        _it('Should_be_able_to_wrap_Symbols_with_LazyServiceIdentifer', () => {
            interface Ninja3 {
                fight(): string;
                sneak(): string;
            }
            interface Katana3 {
                h_it(): string;
            }
            interface Shuriken3 {
                throw(): string;
            }
            @injectable()
            class Katana implements Katana3 {
                public h_it() {
                    return 'cut!';
                }
            }
            @injectable()
            class Shuriken implements Shuriken3 {
                public throw() {
                    return 'hit!';
                }
            }
            const TYPES = TYPESSymbol3();
            @injectable()
            class Ninja implements Ninja3 {
                private _katana: Katana;
                private _shuriken: Shuriken;
                public constructor(
                @inject(new LazyServiceIdentifer<string>(() => TYPES.Katana))
                katana: Katana, 
                @inject(new LazyServiceIdentifer<string>(() => TYPES.Shuriken))
                shuriken: Shuriken) {
                    this._katana = katana;
                    this._shuriken = shuriken;
                }
                public fight(): string { return this._katana.h_it(); }
                public sneak(): string { return this._shuriken.throw(); }
            }
            const container = new Container();
            container.bind<Ninja>(TYPES.Ninja).to(Ninja);
            container.bind<Katana>(TYPES.Katana).to(Katana);
            container.bind<Shuriken>(TYPES.Shuriken).to(Shuriken);
            const ninja = container.get<Ninja>(TYPES.Ninja);
            expect(ninja.fight()).eql('cut!');
            expect(ninja.sneak()).eql('hit!');
        });
        _it('Should_support_Container_modules', () => {
            interface Ninja4 {
                fight(): string;
                sneak(): string;
            }
            interface Katana4 {
                h_it(): string;
            }
            interface Shuriken4 {
                throw(): string;
            }
            @injectable()
            class Katana implements Katana4 {
                public h_it() {
                    return 'cut!';
                }
            }
            @injectable()
            class Shuriken implements Shuriken4 {
                public throw() {
                    return 'hit!';
                }
            }
            @injectable()
            class Ninja implements Ninja4 {
                private _katana: Katana;
                private _shuriken: Shuriken;
                public constructor(
                @inject('Katana')
                katana: Katana, 
                @inject('Shuriken')
                shuriken: Shuriken) {
                    this._katana = katana;
                    this._shuriken = shuriken;
                }
                public fight(): string { return this._katana.h_it(); }
                public sneak(): string { return this._shuriken.throw(); }
            }
            const warriors = new ContainerModule((bind: interfaces.Bind) => {
                bind<Ninja>('Ninja').to(Ninja);
            });
            const weapons = new ContainerModule((bind: interfaces.Bind) => {
                bind<Katana>('Katana').to(Katana);
                bind<Shuriken>('Shuriken').to(Shuriken);
            });
            const container = new Container();
            // load
            container.load(warriors, weapons);
            const ninja = container.get<Ninja>('Ninja');
            expect(ninja.fight()).eql('cut!');
            expect(ninja.sneak()).eql('hit!');
            const tryGetNinja = () => { container.get('Ninja'); };
            const tryGetKatana = () => { container.get('Katana'); };
            const tryGetShuruken = () => { container.get('Shuriken'); };
            // unload
            container.unload(warriors);
            expect(tryGetKatana).not.to.throw();
            expect(tryGetShuruken).not.to.throw();
        });
        _it('Should_support_control_over_the_scope_of_the_dependencies', () => {
            interface Ninja5 {
                fight(): string;
                sneak(): string;
            }
            interface Katana5 {
                h_it(): string;
            }
            interface Shuriken5 {
                throw(): string;
            }
            @injectable()
            class Katana implements Katana5 {
                private _usageCount: number;
                public constructor() {
                    this._usageCount = 0;
                }
                public h_it() {
                    this._usageCount = this._usageCount + 1;
                    return `This katana was used ${this._usageCount} times!`;
                }
            }
            @injectable()
            class Shuriken implements Shuriken5 {
                private _shurikenCount: number;
                public constructor() {
                    this._shurikenCount = 10;
                }
                public throw() {
                    this._shurikenCount = this._shurikenCount - 1;
                    return `Only ${this._shurikenCount} items left!`;
                }
            }
            @injectable()
            class Ninja implements Ninja5 {
                private _katana: Katana;
                private _shuriken: Shuriken;
                public constructor(
                @inject('Katana')
                katana: Katana, 
                @inject('Shuriken')
                shuriken: Shuriken) {
                    this._katana = katana;
                    this._shuriken = shuriken;
                }
                public fight(): string { return this._katana.h_it(); }
                public sneak(): string { return this._shuriken.throw(); }
            }
            const container = new Container();
            container.bind<Ninja>('Ninja').to(Ninja);
            container.bind<Katana>('Katana').to(Katana).inSingletonScope();
            container.bind<Shuriken>('Shuriken').to(Shuriken);
            const ninja1 = container.get<Ninja>('Ninja');
            expect(ninja1.fight()).eql('This katana was used 1 times!');
            expect(ninja1.fight()).eql('This katana was used 2 times!');
            expect(ninja1.sneak()).eql('Only 9 items left!');
            expect(ninja1.sneak()).eql('Only 8 items left!');
            const ninja2 = container.get<Ninja>('Ninja');
            expect(ninja2.fight()).eql('This katana was used 3 times!');
            expect(ninja2.sneak()).eql('Only 9 items left!');
        });
        _it('Should_support_the_injection_of_classes_to_itself', () => {
            const heroName = 'superman';
            @injectable()
            class Hero {
                public name: string;
                public constructor() {
                    this.name = heroName;
                }
            }
            const container = new Container();
            container.bind(Hero).toSelf();
            const hero = container.get<Hero>(Hero);
            expect(hero.name).eql(heroName);
        });
        _it('Should_support_the_injection_of_constant_values', () => {
            interface Warrior {
                name: string;
            }
            interface types {
                Warrior: string;
            }
            const TYPES: types = {
                Warrior: 'Warrior'
            };
            const heroName = 'superman';
            @injectable()
            class Hero implements Warrior {
                public name: string;
                public constructor() {
                    this.name = heroName;
                }
            }
            const container = new Container();
            container.bind<Warrior>(TYPES.Warrior).toConstantValue(new Hero());
            const hero = container.get<Warrior>(TYPES.Warrior);
            expect(hero.name).eql(heroName);
        });
        _it('Should_support_the_injection_of_dynamic_values', () => {
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
            container.bind<UseDate1>('UseDate').to(UseDate);
            container.bind<Date>('Date').toDynamicValue((context: interfaces.Context) => new Date());
            const subject1 = container.get<UseDate1>('UseDate');
            const subject2 = container.get<UseDate1>('UseDate');
            expect(subject1.doSomething() === subject2.doSomething()).eql(false);
            container.unbind('Date');
            container.bind<Date>('Date').toConstantValue(new Date());
            const subject3 = container.get<UseDate1>('UseDate');
            const subject4 = container.get<UseDate1>('UseDate');
            expect(subject3.doSomething() === subject4.doSomething()).eql(true);
        });
        _it('Should_support_the_injection_of_Functions', () => {
            const ninjaId = 'Ninja';
            const longDistanceWeaponId = 'LongDistanceWeapon';
            const shortDistanceWeaponFactoryId = 'ShortDistanceWeaponFactory';
            type ShortDistanceWeaponFactory = () => ShortDistanceWeapon;
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
            interface ShortDistanceWeapon {
                handler: KatanaHandler1;
                blade: KatanaBlade1;
            }
            @injectable()
            class Katana implements ShortDistanceWeapon {
                public handler: KatanaHandler1;
                public blade: KatanaBlade1;
                public constructor(handler: KatanaHandler1, blade: KatanaBlade1) {
                    this.handler = handler;
                    this.blade = blade;
                }
            }
            interface LongDistanceWeapon {
            }
            @injectable()
            class Shuriken implements LongDistanceWeapon {
            }
            interface Warrior {
                shortDistanceWeaponFactory: ShortDistanceWeaponFactory;
                longDistanceWeapon: LongDistanceWeapon;
            }
            @injectable()
            class Ninja implements Warrior {
                public shortDistanceWeaponFactory: ShortDistanceWeaponFactory;
                public longDistanceWeapon: LongDistanceWeapon;
                public constructor(
                @inject(shortDistanceWeaponFactoryId)
                @targetName('katana')
                shortDistanceWeaponFactory: ShortDistanceWeaponFactory, 
                @inject(longDistanceWeaponId)
                @targetName('shuriken')
                longDistanceWeapon: LongDistanceWeapon) {
                    this.shortDistanceWeaponFactory = shortDistanceWeaponFactory;
                    this.longDistanceWeapon = longDistanceWeapon;
                }
            }
            const container = new Container();
            container.bind<Warrior>(ninjaId).to(Ninja);
            container.bind<LongDistanceWeapon>(longDistanceWeaponId).to(Shuriken);
            const katanaFactory = () => {
                return new Katana(new KatanaHandler(), new KatanaBlade());
            };
            container.bind<ShortDistanceWeaponFactory>(shortDistanceWeaponFactoryId).toFunction(katanaFactory); // IMPORTANT!
            const ninja = container.get<Ninja>(ninjaId);
            expect(ninja instanceof Ninja).eql(true);
            expect(typeof ninja.shortDistanceWeaponFactory === 'function').eql(true);
            expect(ninja.shortDistanceWeaponFactory() instanceof Katana).eql(true);
            expect(ninja.shortDistanceWeaponFactory().handler instanceof KatanaHandler).eql(true);
            expect(ninja.shortDistanceWeaponFactory().blade instanceof KatanaBlade).eql(true);
            expect(ninja.longDistanceWeapon instanceof Shuriken).eql(true);
        });
        _it('Should_support_the_injection_of_class_constructors', () => {
            interface Katana1 {
                h_it(): string;
            }
            @injectable()
            class Katana implements Katana1 {
                public h_it() {
                    return 'cut!';
                }
            }
            @injectable()
            class Ninja {
                private _katana: Katana1;
                public constructor(
                @inject('Newable<Katana>')
                katana: interfaces.Newable<Katana1>) {
                    this._katana = new katana();
                }
                public fight() { return this._katana.h_it(); }
            }
            const container = new Container();
            container.bind<Ninja>('Ninja').to(Ninja);
            container.bind<interfaces.Newable<Katana1>>('Newable<Katana>').toConstructor<Katana1>(Katana);
            const ninja = container.get<Ninja>('Ninja');
            expect(ninja.fight()).eql('cut!');
        });
        _it('Should_support_the_injection_of_user_defined_factories', () => {
            interface Ninja {
                fight(): string;
                sneak(): string;
            }
            interface Katana1 {
                h_it(): string;
            }
            interface Shuriken1 {
                throw(): string;
            }
            @injectable()
            class Katana implements Katana1 {
                public h_it() {
                    return 'cut!';
                }
            }
            @injectable()
            class Shuriken implements Shuriken1 {
                public throw() {
                    return 'hit!';
                }
            }
            @injectable()
            class NinjaWithUserDefinedFactory implements Ninja {
                private _katana: Katana;
                private _shuriken: Shuriken;
                public constructor(
                @inject('Factory<Katana>')
                katanaFactory: () => Katana, 
                @inject('Shuriken')
                shuriken: Shuriken) {
                    this._katana = katanaFactory();
                    this._shuriken = shuriken;
                }
                public fight(): string { return this._katana.h_it(); }
                public sneak(): string { return this._shuriken.throw(); }
            }
            const container = new Container();
            container.bind<Ninja>('Ninja').to(NinjaWithUserDefinedFactory);
            container.bind<Shuriken>('Shuriken').to(Shuriken);
            container.bind<Katana>('Katana').to(Katana);
            container.bind<interfaces.Factory<Katana>>('Factory<Katana>').toFactory<Katana>((context) => () => context.container.get<Katana>('Katana'));
            const ninja = container.get<Ninja>('Ninja');
            expect(ninja.fight()).eql('cut!');
            expect(ninja.sneak()).eql('hit!');
        });
        _it('Should_support_the_injection_of_user_defined_factories_with_args', () => {
            interface Ninja {
                fight(): string;
                sneak(): string;
            }
            interface Weapon {
                use(): string;
            }
            @injectable()
            class Katana implements Weapon {
                public use() {
                    return 'katana!';
                }
            }
            @injectable()
            class Shuriken implements Weapon {
                public use() {
                    return 'shuriken!';
                }
            }
            @injectable()
            class NinjaWithUserDefinedFactory implements Ninja {
                private _katana: Weapon;
                private _shuriken: Weapon;
                public constructor(
                @inject('Factory<Weapon>')
                weaponFactory: (throwable: boolean) => Weapon) {
                    this._katana = weaponFactory(false);
                    this._shuriken = weaponFactory(true);
                }
                public fight() { return this._katana.use(); }
                public sneak() { return this._shuriken.use(); }
            }
            const container = new Container();
            container.bind<Ninja>('Ninja').to(NinjaWithUserDefinedFactory);
            container.bind<Weapon>('Weapon').to(Shuriken).whenTargetTagged('throwable', true);
            container.bind<Weapon>('Weapon').to(Katana).whenTargetTagged('throwable', false);
            container.bind<interfaces.Factory<Weapon>>('Factory<Weapon>').toFactory<Weapon, [
                boolean
            ]>((context) => (throwable: boolean) => context.container.getTagged<Weapon>('Weapon', 'throwable', throwable));
            const ninja = container.get<Ninja>('Ninja');
            expect(ninja.fight()).eql('katana!');
            expect(ninja.sneak()).eql('shuriken!');
        });
        _it('Should_support_the_injection_of_user_defined_factories_with_partial_application', () => {
            interface InjectorPump1 {
            }
            @injectable()
            class InjectorPump implements InjectorPump1 {
            }
            interface SparkPlugs1 {
            }
            @injectable()
            class SparkPlugs implements SparkPlugs1 {
            }
            interface Engine {
                displacement: number | null;
            }
            @injectable()
            class DieselEngine implements Engine {
                public displacement: number | null;
                private _injectorPump: InjectorPump;
                public constructor(
                @inject('InjectorPump')
                injectorPump: InjectorPump) {
                    this._injectorPump = injectorPump;
                    this.displacement = null;
                }
                public debug() {
                    return this._injectorPump;
                }
            }
            @injectable()
            class PetrolEngine implements Engine {
                public displacement: number | null;
                private _sparkPlugs: SparkPlugs;
                public constructor(
                @inject('SparkPlugs')
                sparkPlugs: SparkPlugs) {
                    this._sparkPlugs = sparkPlugs;
                    this.displacement = null;
                }
                public debug() {
                    return this._sparkPlugs;
                }
            }
            interface CarFactory {
                createEngine(displacement: number): Engine;
            }
            @injectable()
            class DieselCarFactory implements CarFactory {
                private _dieselFactory: (displacement: number) => Engine;
                public constructor(
                @inject('Factory<Engine>')
                factory: (category: string) => (displacement: number) => Engine) {
                    this._dieselFactory = factory('diesel');
                }
                public createEngine(displacement: number): Engine {
                    return this._dieselFactory(displacement);
                }
            }
            const container = new Container();
            container.bind<SparkPlugs>('SparkPlugs').to(SparkPlugs);
            container.bind<InjectorPump>('InjectorPump').to(InjectorPump);
            container.bind<Engine>('Engine').to(PetrolEngine).whenTargetNamed('petrol');
            container.bind<Engine>('Engine').to(DieselEngine).whenTargetNamed('diesel');
            container.bind<interfaces.Factory<Engine>>('Factory<Engine>').toFactory<Engine, [
                string
            ], [
                number
            ]>((context: interfaces.Context) => (theNamed: string) => (displacement: number) => {
                const theEngine = context.container.getNamed<Engine>('Engine', theNamed);
                theEngine.displacement = displacement;
                return theEngine;
            });
            container.bind<CarFactory>('DieselCarFactory').to(DieselCarFactory);
            const dieselCarFactory = container.get<CarFactory>('DieselCarFactory');
            const engine = dieselCarFactory.createEngine(300);
            expect(engine.displacement).eql(300);
            expect(engine instanceof DieselEngine).eql(true);
        });
        _it('Should_support_the_injection_of_auto_factories', () => {
            interface Ninja {
                fight(): string;
                sneak(): string;
            }
            interface Katana1 {
                h_it(): string;
            }
            interface Shuriken1 {
                throw(): string;
            }
            @injectable()
            class Katana implements Katana1 {
                public h_it() {
                    return 'cut!';
                }
            }
            @injectable()
            class Shuriken implements Shuriken1 {
                public throw() {
                    return 'hit!';
                }
            }
            @injectable()
            class NinjaWithAutoFactory implements Ninja {
                private _katana: Katana;
                private _shuriken: Shuriken;
                public constructor(
                @inject('Factory<Katana>')
                katanaAutoFactory: () => Katana, 
                @inject('Shuriken')
                shuriken: Shuriken) {
                    this._katana = katanaAutoFactory();
                    this._shuriken = shuriken;
                }
                public fight(): string { return this._katana.h_it(); }
                public sneak(): string { return this._shuriken.throw(); }
            }
            const container = new Container();
            container.bind<Ninja>('Ninja').to(NinjaWithAutoFactory);
            container.bind<Shuriken>('Shuriken').to(Shuriken);
            container.bind<Katana>('Katana').to(Katana);
            container.bind<interfaces.Factory<Katana>>('Factory<Katana>').toAutoFactory<Katana>('Katana');
            const ninja = container.get<Ninja>('Ninja');
            expect(ninja.fight()).eql('cut!');
            expect(ninja.sneak()).eql('hit!');
        });
        _it('Should_support_the_injection_of_auto_named_factories', () => {
            interface Ninja {
                fight(): string;
                sneak(): string;
            }
            interface Weapon {
            }
            interface Katana1 extends Weapon {
                h_it(): string;
            }
            interface Shuriken1 extends Weapon {
                throw(): string;
            }
            @injectable()
            class Katana implements Katana1 {
                public h_it() {
                    return 'cut!';
                }
            }
            @injectable()
            class Shuriken implements Shuriken1 {
                public throw() {
                    return 'hit!';
                }
            }
            @injectable()
            class NinjaWithAutoNamedFactory implements Ninja {
                private _katana: Katana;
                private _shuriken: Shuriken;
                public constructor(
                @inject('Factory<Weapon>')
                weaponFactory: <TWeapon extends Weapon = Weapon>(named: string) => TWeapon) {
                    this._katana = weaponFactory<Katana>('katana');
                    this._shuriken = weaponFactory<Shuriken>('shuriken');
                }
                public fight(): string { return this._katana.h_it(); }
                public sneak(): string { return this._shuriken.throw(); }
            }
            const container = new Container();
            container.bind<Ninja>('Ninja').to(NinjaWithAutoNamedFactory);
            container.bind<Shuriken>('Shuriken').to(Shuriken);
            container.bind<Katana>('Katana').to(Katana);
            container.bind<Weapon>('Weapon').to(Katana).whenTargetNamed('katana');
            container.bind<Weapon>('Weapon').to(Shuriken).whenTargetNamed('shuriken');
            container.bind<interfaces.Factory<Weapon>>('Factory<Weapon>').toAutoNamedFactory<Weapon>('Weapon');
            const ninja = container.get<Ninja>('Ninja');
            expect(ninja.fight()).eql('cut!');
            expect(ninja.sneak()).eql('hit!');
        });
        _it('Should_support_the_injection_of_providers', (done: any) => {
            type KatanaProvider = () => Promise<Katana>;
            interface Ninja {
                katana: Katana | null;
                katanaProvider: KatanaProvider;
            }
            interface Katana1 {
                h_it(): string;
            }
            @injectable()
            class Katana implements Katana1 {
                public h_it() {
                    return 'cut!';
                }
            }
            @injectable()
            class NinjaWithProvider implements Ninja {
                public katana: Katana | null;
                public katanaProvider: KatanaProvider;
                public constructor(
                @inject('Provider<Katana>')
                katanaProvider: KatanaProvider) {
                    this.katanaProvider = katanaProvider;
                    this.katana = null;
                }
            }
            const container = new Container();
            container.bind<Ninja>('Ninja').to(NinjaWithProvider);
            container.bind<Katana>('Katana').to(Katana);
            container.bind<KatanaProvider>('Provider<Katana>').toProvider<Katana>((context: interfaces.Context) => () => new Promise<Katana>((resolve) => {
                const katana = context.container.get<Katana>('Katana');
                resolve(katana);
            }));
            const ninja = container.get<Ninja>('Ninja');
            ninja.katanaProvider()
                .then((katana) => {
                ninja.katana = katana;
                expect(ninja.katana.h_it()).eql('cut!');
                done();
            })
                .catch(() => { });
        });
        _it('Should_support_the_injection_of_multiple_values', () => {
            const warriorId = 'Warrior';
            const weaponId = 'Weapon';
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
                @multiInject(weaponId)
                weapons: Weapon[]) {
                    this.katana = weapons[0] as Weapon;
                    this.shuriken = weapons[1] as Weapon;
                }
            }
            const container = new Container();
            container.bind<Warrior>(warriorId).to(Ninja);
            container.bind<Weapon>(weaponId).to(Katana);
            container.bind<Weapon>(weaponId).to(Shuriken);
            const ninja = container.get<Warrior>(warriorId);
            expect(ninja.katana.name).eql('Katana');
            expect(ninja.shuriken.name).eql('Shuriken');
            // if only one value is bound to Weapon
            const container2 = new Container();
            container2.bind<Warrior>(warriorId).to(Ninja);
            container2.bind<Weapon>(weaponId).to(Katana);
            const ninja2 = container2.get<Warrior>(warriorId);
            expect(ninja2.katana.name).eql('Katana');
        });
        _it('Should_support_the_injection_of_multiple_values_with_nested_inject', () => {
            interface Ninja1 {
                fight(): string;
                sneak(): string;
            }
            interface Katana1 {
                h_it(): string;
            }
            interface Shuriken1 {
                throw(): string;
            }
            @injectable()
            class Katana implements Katana1 {
                public h_it() {
                    return 'cut!';
                }
            }
            @injectable()
            class Shuriken implements Shuriken1 {
                public throw() {
                    return 'hit!';
                }
            }
            @injectable()
            class Ninja implements Ninja1 {
                private _katana: Katana;
                private _shuriken: Shuriken;
                public constructor(
                @inject('Katana')
                katana: Katana, 
                @inject('Shuriken')
                shuriken: Shuriken) {
                    this._katana = katana;
                    this._shuriken = shuriken;
                }
                public fight(): string { return this._katana.h_it(); }
                public sneak(): string { return this._shuriken.throw(); }
            }
            interface School {
                ninjaMaster: Ninja;
                student: Ninja;
            }
            @injectable()
            class NinjaSchool implements School {
                public ninjaMaster: Ninja;
                public student: Ninja;
                public constructor(
                @multiInject('Ninja')
                ninja: Ninja[]) {
                    this.ninjaMaster = ninja[0] as Ninja;
                    this.student = ninja[1] as Ninja;
                }
            }
            const container = new Container();
            container.bind<Katana>('Katana').to(Katana);
            container.bind<Shuriken>('Shuriken').to(Shuriken);
            container.bind<Ninja>('Ninja').to(Ninja);
            container.bind<Ninja>('Ninja').to(Ninja);
            container.bind<School>('School').to(NinjaSchool);
            const ninjaSchool = container.get<School>('School');
            expect(ninjaSchool.ninjaMaster.fight()).eql('cut!');
            expect(ninjaSchool.ninjaMaster.sneak()).eql('hit!');
            expect(ninjaSchool.student.fight()).eql('cut!');
            expect(ninjaSchool.student.sneak()).eql('hit!');
        });
        _it('Should_support_the_injection_of_multiple_values_with_nested_multiInject', () => {
            const warriorId = 'Warrior';
            const swordId = 'Sword';
            const shurikenId = 'Shuriken';
            const schoolId = 'School';
            const organisationId = 'Organisation';
            interface Warrior {
                fight(): string;
                sneak(): string;
            }
            interface Sword {
                h_it(): string;
            }
            interface Shuriken1 {
                throw(): string;
            }
            @injectable()
            class Katana implements Sword {
                public h_it() {
                    return 'cut!';
                }
            }
            @injectable()
            class Shuriken implements Shuriken1 {
                public throw() {
                    return 'hit!';
                }
            }
            @injectable()
            class Ninja implements Warrior {
                private _katana: Sword;
                private _shuriken: Shuriken;
                public constructor(
                @inject(swordId)
                katana: Sword, 
                @inject(shurikenId)
                shuriken: Shuriken) {
                    this._katana = katana;
                    this._shuriken = shuriken;
                }
                public fight(): string { return this._katana.h_it(); }
                public sneak(): string { return this._shuriken.throw(); }
            }
            interface School {
                ninjaMaster: Warrior;
                student: Warrior;
            }
            @injectable()
            class NinjaSchool implements School {
                public ninjaMaster: Warrior;
                public student: Warrior;
                public constructor(
                @multiInject(warriorId)
                ninjas: Ninja[]) {
                    this.ninjaMaster = ninjas[0] as Ninja;
                    this.student = ninjas[1] as Ninja;
                }
            }
            interface Organisation {
                schools: School[];
            }
            @injectable()
            class NinjaOrganisation implements Organisation {
                public schools: School[];
                public constructor(
                @multiInject(schoolId)
                schools: School[]) {
                    this.schools = schools;
                }
            }
            const container = new Container();
            container.bind<Sword>(swordId).to(Katana);
            container.bind<Shuriken>(shurikenId).to(Shuriken);
            container.bind<Warrior>(warriorId).to(Ninja);
            container.bind<Warrior>(warriorId).to(Ninja);
            container.bind<School>(schoolId).to(NinjaSchool);
            container.bind<School>(schoolId).to(NinjaSchool);
            container.bind<Organisation>(organisationId).to(NinjaOrganisation);
            const ninjaOrganisation = container.get<Organisation>(organisationId);
            for (let i = 0; i < 2; i++) {
                const ithNinjaOrganizationSchool = ninjaOrganisation.schools[i] as School;
                expect(ithNinjaOrganizationSchool.ninjaMaster.fight()).eql('cut!');
                expect(ithNinjaOrganizationSchool.ninjaMaster.sneak()).eql('hit!');
                expect(ithNinjaOrganizationSchool.student.fight()).eql('cut!');
                expect(ithNinjaOrganizationSchool.student.sneak()).eql('hit!');
            }
        });
        _it('Should_support_the_injection_of_multiple_values_when_using_classes_as_keys', () => {
            @injectable()
            class Weapon {
                public name!: string;
            }
            @injectable()
            class Katana extends Weapon {
                public constructor() {
                    super();
                    this.name = 'Katana';
                }
            }
            @injectable()
            class Shuriken extends Weapon {
                public constructor() {
                    super();
                    this.name = 'Shuriken';
                }
            }
            @injectable()
            class Ninja {
                public katana: Weapon;
                public shuriken: Weapon;
                public constructor(
                @multiInject(Weapon)
                weapons: Weapon[]) {
                    this.katana = weapons[0] as Weapon;
                    this.shuriken = weapons[1] as Weapon;
                }
            }
            const container = new Container();
            container.bind<Ninja>(Ninja).to(Ninja);
            container.bind<Weapon>(Weapon).to(Katana);
            container.bind<Weapon>(Weapon).to(Shuriken);
            const ninja = container.get<Ninja>(Ninja);
            expect(ninja.katana.name).eql('Katana');
            expect(ninja.shuriken.name).eql('Shuriken');
            // if only one value is bound to Weapon
            const container2 = new Container();
            container2.bind<Ninja>(Ninja).to(Ninja);
            container2.bind<Weapon>(Weapon).to(Katana);
            const ninja2 = container2.get<Ninja>(Ninja);
            expect(ninja2.katana.name).eql('Katana');
        });
        _it('Should_support_the_injection_of_multiple_values_with_nested_inject', () => {
            @injectable()
            class Katana {
                public h_it() {
                    return 'cut!';
                }
            }
            @injectable()
            class Shuriken {
                public throw() {
                    return 'hit!';
                }
            }
            @injectable()
            @Reflect.metadata("design:paramtypes", arrayConversion(Katana, Shuriken))
            class Ninja {
                private _katana: Katana;
                private _shuriken: Shuriken;
                public constructor(katana: Katana, shuriken: Shuriken) {
                    this._katana = katana;
                    this._shuriken = shuriken;
                }
                public fight(): string { return this._katana.h_it(); }
                public sneak(): string { return this._shuriken.throw(); }
            }
            @injectable()
            @Reflect.metadata("design:paramtypes", Ninja)
            class NinjaSchool {
                public ninjaMaster: Ninja;
                public student: Ninja;
                public constructor(
                @multiInject(Ninja)
                ninja: Ninja[]) {
                    this.ninjaMaster = ninja[0] as Ninja;
                    this.student = ninja[1] as Ninja;
                }
            }
            const container = new Container();
            container.bind<Katana>(Katana).to(Katana);
            container.bind<Shuriken>(Shuriken).to(Shuriken);
            container.bind<Ninja>(Ninja).to(Ninja);
            container.bind<Ninja>(Ninja).to(Ninja);
            container.bind<NinjaSchool>(NinjaSchool).to(NinjaSchool);
            const ninjaSchool = container.get<NinjaSchool>(NinjaSchool);
            expect(ninjaSchool.ninjaMaster.fight()).eql('cut!');
            expect(ninjaSchool.ninjaMaster.sneak()).eql('hit!');
            expect(ninjaSchool.student.fight()).eql('cut!');
            expect(ninjaSchool.student.sneak()).eql('hit!');
        });
        _it('Should_support_the_injection_of_multiple_values_with_nested_multiInject', () => {
            @injectable()
            class Katana {
                public h_it() {
                    return 'cut!';
                }
            }
            @injectable()
            class Shuriken {
                public throw() {
                    return 'hit!';
                }
            }
            @injectable()
            @Reflect.metadata("design:paramtypes", arrayConversion(Katana, Shuriken))
            class Ninja {
                private _katana: Katana;
                private _shuriken: Shuriken;
                public constructor(katana: Katana, shuriken: Shuriken) {
                    this._katana = katana;
                    this._shuriken = shuriken;
                }
                public fight(): string { return this._katana.h_it(); }
                public sneak(): string { return this._shuriken.throw(); }
            }
            @injectable()
            @Reflect.metadata("design:paramtypes", Ninja)
            class NinjaSchool {
                public ninjaMaster: Ninja;
                public student: Ninja;
                public constructor(
                @multiInject(Ninja)
                ninjas: Ninja[]) {
                    this.ninjaMaster = ninjas[0] as Ninja;
                    this.student = ninjas[1] as Ninja;
                }
            }
            @injectable()
            @Reflect.metadata("design:paramtypes", NinjaSchool)
            class NinjaOrganisation {
                public schools: NinjaSchool[];
                public constructor(
                @multiInject(NinjaSchool)
                schools: NinjaSchool[]) {
                    this.schools = schools;
                }
            }
            const container = new Container();
            container.bind<Katana>(Katana).to(Katana);
            container.bind<Shuriken>(Shuriken).to(Shuriken);
            container.bind<Ninja>(Ninja).to(Ninja);
            container.bind<Ninja>(Ninja).to(Ninja);
            container.bind<NinjaSchool>(NinjaSchool).to(NinjaSchool);
            container.bind<NinjaSchool>(NinjaSchool).to(NinjaSchool);
            container.bind<NinjaOrganisation>(NinjaOrganisation).to(NinjaOrganisation);
            const ninjaOrganisation = container.get<NinjaOrganisation>(NinjaOrganisation);
            for (let i = 0; i < 2; i++) {
                const ithNinjaOrganizationSchool = ninjaOrganisation.schools[i] as NinjaSchool;
                expect(ithNinjaOrganizationSchool.ninjaMaster.fight()).eql('cut!');
                expect(ithNinjaOrganizationSchool.ninjaMaster.sneak()).eql('hit!');
                expect(ithNinjaOrganizationSchool.student.fight()).eql('cut!');
                expect(ithNinjaOrganizationSchool.student.sneak()).eql('hit!');
            }
        });
        _it('Should_support_the_injection_of_multiple_values_when_using_Symbols_as_keys', () => {
            const TYPES = TYPESSymbol2();
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
                @multiInject(TYPES.Weapon)
                weapons: Weapon[]) {
                    this.katana = weapons[0] as Weapon;
                    this.shuriken = weapons[1] as Weapon;
                }
            }
            const container = new Container();
            container.bind<Warrior>(TYPES.Warrior).to(Ninja);
            container.bind<Weapon>(TYPES.Weapon).to(Katana);
            container.bind<Weapon>(TYPES.Weapon).to(Shuriken);
            const ninja = container.get<Warrior>(TYPES.Warrior);
            expect(ninja.katana.name).eql('Katana');
            expect(ninja.shuriken.name).eql('Shuriken');
            // if only one value is bound to Weapon
            const container2 = new Container();
            container2.bind<Warrior>(TYPES.Warrior).to(Ninja);
            container2.bind<Weapon>(TYPES.Weapon).to(Katana);
            const ninja2 = container2.get<Warrior>(TYPES.Warrior);
            expect(ninja2.katana.name).eql('Katana');
        });
        _it('Should_support_the_injection_of_multiple_values_with_nested_inject', () => {
            const TYPES = TYPESSymbol4();
            interface Ninja1 {
                fight(): string;
                sneak(): string;
            }
            interface Katana1 {
                h_it(): string;
            }
            interface Shuriken1 {
                throw(): string;
            }
            @injectable()
            class Katana implements Katana1 {
                public h_it() {
                    return 'cut!';
                }
            }
            @injectable()
            class Shuriken implements Shuriken1 {
                public throw() {
                    return 'hit!';
                }
            }
            @injectable()
            class Ninja implements Ninja1 {
                private _katana: Katana;
                private _shuriken: Shuriken;
                public constructor(
                @inject(TYPES.Katana)
                katana: Katana, 
                @inject(TYPES.Shuriken)
                shuriken: Shuriken) {
                    this._katana = katana;
                    this._shuriken = shuriken;
                }
                public fight(): string { return this._katana.h_it(); }
                public sneak(): string { return this._shuriken.throw(); }
            }
            interface School {
                ninjaMaster: Ninja;
                student: Ninja;
            }
            @injectable()
            class NinjaSchool implements School {
                public ninjaMaster: Ninja;
                public student: Ninja;
                public constructor(
                @multiInject(TYPES.Ninja)
                ninja: Ninja[]) {
                    this.ninjaMaster = ninja[0] as Ninja;
                    this.student = ninja[1] as Ninja;
                }
            }
            const container = new Container();
            container.bind<Katana>(TYPES.Katana).to(Katana);
            container.bind<Shuriken>(TYPES.Shuriken).to(Shuriken);
            container.bind<Ninja>(TYPES.Ninja).to(Ninja);
            container.bind<Ninja>(TYPES.Ninja).to(Ninja);
            container.bind<School>(TYPES.School).to(NinjaSchool);
            const ninjaSchool = container.get<School>(TYPES.School);
            expect(ninjaSchool.ninjaMaster.fight()).eql('cut!');
            expect(ninjaSchool.ninjaMaster.sneak()).eql('hit!');
            expect(ninjaSchool.student.fight()).eql('cut!');
            expect(ninjaSchool.student.sneak()).eql('hit!');
        });
        _it('Should_support_the_injection_of_multiple_values_with_nested_multiInject', () => {
            const TYPES = TYPESSymbol4();
            interface Ninja1 {
                fight(): string;
                sneak(): string;
            }
            interface Katana1 {
                h_it(): string;
            }
            interface Shuriken1 {
                throw(): string;
            }
            @injectable()
            class Katana implements Katana1 {
                public h_it() {
                    return 'cut!';
                }
            }
            @injectable()
            class Shuriken implements Shuriken1 {
                public throw() {
                    return 'hit!';
                }
            }
            @injectable()
            class Ninja implements Ninja1 {
                private _katana: Katana;
                private _shuriken: Shuriken;
                public constructor(
                @inject(TYPES.Katana)
                katana: Katana, 
                @inject(TYPES.Shuriken)
                shuriken: Shuriken) {
                    this._katana = katana;
                    this._shuriken = shuriken;
                }
                public fight(): string { return this._katana.h_it(); }
                public sneak(): string { return this._shuriken.throw(); }
            }
            interface School {
                ninjaMaster: Ninja;
                student: Ninja;
            }
            @injectable()
            class NinjaSchool implements School {
                public ninjaMaster: Ninja;
                public student: Ninja;
                public constructor(
                @multiInject(TYPES.Ninja)
                ninjas: Ninja[]) {
                    this.ninjaMaster = ninjas[0] as Ninja;
                    this.student = ninjas[1] as Ninja;
                }
            }
            interface Organisation {
                schools: NinjaSchool[];
            }
            @injectable()
            class NinjaOrganisation implements Organisation {
                public schools: NinjaSchool[];
                public constructor(
                @multiInject(TYPES.School)
                schools: School[]) {
                    this.schools = schools;
                }
            }
            const container = new Container();
            container.bind<Katana>(TYPES.Katana).to(Katana);
            container.bind<Shuriken>(TYPES.Shuriken).to(Shuriken);
            container.bind<Ninja>(TYPES.Ninja).to(Ninja);
            container.bind<Ninja>(TYPES.Ninja).to(Ninja);
            container.bind<School>(TYPES.School).to(NinjaSchool);
            container.bind<School>(TYPES.School).to(NinjaSchool);
            container.bind<Organisation>(TYPES.Organisation).to(NinjaOrganisation);
            const ninjaOrganisation = container.get<Organisation>(TYPES.Organisation);
            for (let i = 0; i < 2; i++) {
                const ithNinjaOrganizationSchool = ninjaOrganisation.schools[i] as School;
                expect(ithNinjaOrganizationSchool.ninjaMaster.fight()).eql('cut!');
                expect(ithNinjaOrganizationSchool.ninjaMaster.sneak()).eql('hit!');
                expect(ithNinjaOrganizationSchool.student.fight()).eql('cut!');
                expect(ithNinjaOrganizationSchool.student.sneak()).eql('hit!');
            }
        });
        _it('Should_support_tagged_bindings', () => {
            enum Tag {
                CanThrow
            }
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
                @tagged('canThrow', false)
                katana: Weapon, 
                @inject('Weapon')
                @tagged(Tag.CanThrow, true)
                shuriken: Weapon) {
                    this.katana = katana;
                    this.shuriken = shuriken;
                }
            }
            const container = new Container();
            container.bind<Warrior>('Warrior').to(Ninja);
            container.bind<Weapon>('Weapon').to(Katana).whenTargetTagged('canThrow', false);
            container.bind<Weapon>('Weapon').to(Shuriken).whenTargetTagged(Tag.CanThrow, true);
            const ninja = container.get<Warrior>('Warrior');
            expect(ninja.katana instanceof Katana).eql(true);
            expect(ninja.shuriken instanceof Shuriken).eql(true);
        });
        _it('Should_support_custom_tag_decorators', () => {
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
            const throwable = tagged('canThrow', true);
            const notThrowable = tagged('canThrow', false);
            @injectable()
            class Ninja implements Warrior {
                public katana: Weapon;
                public shuriken: Weapon;
                public constructor(
                @inject('Weapon')
                @notThrowable
                katana: Weapon, 
                @inject('Weapon')
                @throwable
                shuriken: Weapon) {
                    this.katana = katana;
                    this.shuriken = shuriken;
                }
            }
            const container = new Container();
            container.bind<Warrior>('Warrior').to(Ninja);
            container.bind<Weapon>('Weapon').to(Katana).whenTargetTagged('canThrow', false);
            container.bind<Weapon>('Weapon').to(Shuriken).whenTargetTagged('canThrow', true);
            const ninja = container.get<Warrior>('Warrior');
            expect(ninja.katana instanceof Katana).eql(true);
            expect(ninja.shuriken instanceof Shuriken).eql(true);
        });
        _it('Should_support_named_bindings', () => {
            const name = symbolFor('Weak');
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
                @named('strong')
                katana: Weapon, 
                @inject('Weapon')
                @named(name)
                shuriken: Weapon) {
                    this.katana = katana;
                    this.shuriken = shuriken;
                }
            }
            const container = new Container();
            container.bind<Warrior>('Warrior').to(Ninja);
            container.bind<Weapon>('Weapon').to(Katana).whenTargetNamed('strong');
            container.bind<Weapon>('Weapon').to(Shuriken).whenTargetNamed(name);
            const ninja = container.get<Warrior>('Warrior');
            expect(ninja.katana instanceof Katana).eql(true);
            expect(ninja.shuriken instanceof Shuriken).eql(true);
        });
        _it('Should_support_contextual_bindings_and_targetName_annotation', () => {
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
            const container = new Container();
            container.bind<Warrior>('Warrior').to(Ninja);
            container.bind<Weapon>('Weapon').to(Katana).when((request: interfaces.Request) => request !== null && request.target !== null && request.target.name.equals('katana'));
            container.bind<Weapon>('Weapon').to(Shuriken).when((request: interfaces.Request) => request !== null && request.target !== null && request.target.name.equals('shuriken'));
            const ninja = container.get<Warrior>('Warrior');
            expect(ninja.katana instanceof Katana).eql(true);
            expect(ninja.shuriken instanceof Shuriken).eql(true);
        });
        _it('Should_be_able_to_resolve_a_ambiguous_binding_by_providing_a_named_tag', () => {
            interface Weapon {
                name: string;
            }
            @injectable()
            class Katana implements Weapon {
                public name: string;
                public constructor() {
                    this.name = 'katana';
                }
            }
            @injectable()
            class Shuriken implements Weapon {
                public name: string;
                public constructor() {
                    this.name = 'shuriken';
                }
            }
            const container = new Container();
            container.bind<Weapon>('Weapon').to(Katana).whenTargetNamed('japonese');
            container.bind<Weapon>('Weapon').to(Shuriken).whenTargetNamed('chinese');
            const katana = container.getNamed<Weapon>('Weapon', 'japonese');
            const shuriken = container.getNamed<Weapon>('Weapon', 'chinese');
            expect(katana.name).eql('katana');
            expect(shuriken.name).eql('shuriken');
        });
        _it('Should_be_able_to_resolve_a_ambiguous_binding_by_providing_a_custom_tag', () => {
            interface Weapon {
                name: string;
            }
            @injectable()
            class Katana implements Weapon {
                public name: string;
                public constructor() {
                    this.name = 'katana';
                }
            }
            @injectable()
            class Shuriken implements Weapon {
                public name: string;
                public constructor() {
                    this.name = 'shuriken';
                }
            }
            const container = new Container();
            container.bind<Weapon>('Weapon').to(Katana).whenTargetTagged('faction', 'samurai');
            container.bind<Weapon>('Weapon').to(Shuriken).whenTargetTagged('faction', 'ninja');
            const katana = container.getTagged<Weapon>('Weapon', 'faction', 'samurai');
            const shuriken = container.getTagged<Weapon>('Weapon', 'faction', 'ninja');
            expect(katana.name).eql('katana');
            expect(shuriken.name).eql('shuriken');
        });
        _it('Should_be_able_to_inject_into_a_super_constructor', () => {
            const SYMBOLS = SYMBOLSSymbol4();
            interface Weapon {
                name: string;
            }
            interface Warrior {
                weapon: Weapon;
            }
            @injectable()
            class Katana implements Weapon {
                public name: string;
                public constructor() {
                    this.name = 'katana';
                }
            }
            @injectable()
            class Samurai implements Warrior {
                public weapon: Weapon;
                public constructor(weapon: Weapon) {
                    this.weapon = weapon;
                }
            }
            // Important: derived classes constructor must be manually implemented and annotated
            // Therefore the following will fail
            @injectable()
            class SamuraiMaster extends Samurai implements Warrior {
                public isMaster!: boolean;
            }
            // However, he following will work
            @injectable()
            class SamuraiMaster2 extends Samurai implements Warrior {
                public isMaster: boolean;
                public constructor(
                @inject(SYMBOLS.Weapon)
                weapon: Weapon) {
                    super(weapon);
                    this.isMaster = true;
                }
            }
            const container = new Container();
            container.bind<Weapon>(SYMBOLS.Weapon).to(Katana);
            container.bind<Warrior>(SYMBOLS.Samurai).to(Samurai);
            container.bind<Warrior>(SYMBOLS.SamuraiMaster).to(SamuraiMaster);
            container.bind<Warrior>(SYMBOLS.SamuraiMaster2).to(SamuraiMaster2);
            const errorFunction = () => { container.get<Warrior>(SYMBOLS.SamuraiMaster); };
            const error = ERROR_MSGS.ARGUMENTS_LENGTH_MISMATCH('SamuraiMaster');
            const samuraiMaster2 = container.get<SamuraiMaster2>(SYMBOLS.SamuraiMaster2);
            expect(samuraiMaster2.weapon.name).eql('katana');
            expect(typeof samuraiMaster2.isMaster).eql('boolean');
        });
        _it('Should_allow_to_flag_arguments_as_unmanaged', () => {
            const container = new Container();
            // CASE 1: should throw
            const Base1Id = 'Base1';
            @injectable()
            class Base1 {
                public prop: string;
                public constructor(arg: string) {
                    this.prop = arg;
                }
            }
            @injectable()
            class Derived1 extends Base1 {
                public constructor() {
                    super('unmanaged-injected-value');
                }
            }
            container.bind<Base1>(Base1Id).to(Derived1);
            const tryGet = () => { container.get(Base1Id); };
            const error = ERROR_MSGS.ARGUMENTS_LENGTH_MISMATCH('Derived1');
            // CASE 2: Use @unmanaged to overcome issue
            const Base2Id = 'Base2';
            @injectable()
            class Base2 {
                public prop1: string;
                public constructor(
                @unmanaged()
                arg1: string) {
                    this.prop1 = arg1;
                }
            }
            @injectable()
            class Derived2 extends Base2 {
                public constructor() {
                    super('unmanaged-injected-value');
                }
            }
            container.bind<Base2>(Base2Id).to(Derived2);
            const derived1 = container.get<Base2>(Base2Id);
            expect(derived1 instanceof Derived2).to.eql(true);
            expect(derived1.prop1).to.eql('unmanaged-injected-value');
            // CASE 3: Use @unmanaged to overcome issue when multiple args
            const Base3Id = 'Base3';
            @injectable()
            class Base3 {
                public prop1: string;
                public prop2: string;
                public constructor(
                @unmanaged()
                arg1: string, arg2: string) {
                    this.prop1 = arg1;
                    this.prop2 = arg2;
                }
            }
            @injectable()
            class Derived3 extends Base3 {
                public constructor(
                @inject('SomeId')
                arg1: string) {
                    super('unmanaged-injected-value', arg1);
                }
            }
            container.bind<Base3>(Base3Id).to(Derived3);
            container.bind<string>('SomeId').toConstantValue('managed-injected-value');
            const derived2 = container.get<Base3>(Base3Id);
            expect(derived2 instanceof Base3).to.eql(true);
            expect(derived2.prop1).to.eql('unmanaged-injected-value');
            expect(derived2.prop2).to.eql('managed-injected-value');
        });
        _it('Should_support_a_whenInjectedInto_contextual_bindings_constraint', () => {
            interface types {
                Ninja: string;
                Weapon: string;
            }
            const TYPES: types = {
                Ninja: 'Ninja',
                Weapon: 'Weapon'
            };
            interface Weapon {
                name: string;
            }
            @injectable()
            class Katana implements Weapon {
                public name: string;
                public constructor() {
                    this.name = 'katana';
                }
            }
            @injectable()
            class Bokken implements Weapon {
                public name: string;
                public constructor() {
                    this.name = 'bokken';
                }
            }
            interface Ninja {
                weapon: Weapon;
            }
            @injectable()
            class NinjaStudent implements Ninja {
                public weapon: Weapon;
                public constructor(
                @inject('Weapon')
                @targetName('weapon')
                weapon: Weapon) {
                    this.weapon = weapon;
                }
            }
            @injectable()
            class NinjaMaster implements Ninja {
                public weapon: Weapon;
                public constructor(
                @inject('Weapon')
                @targetName('weapon')
                weapon: Weapon) {
                    this.weapon = weapon;
                }
            }
            const container = new Container();
            container.bind<Ninja>(TYPES.Ninja).to(NinjaStudent).whenTargetTagged('master', false);
            container.bind<Ninja>(TYPES.Ninja).to(NinjaMaster).whenTargetTagged('master', true);
            container.bind<Weapon>(TYPES.Weapon).to(Katana).whenInjectedInto(NinjaMaster);
            container.bind<Weapon>(TYPES.Weapon).to(Bokken).whenInjectedInto(NinjaStudent);
            const master = container.getTagged<Ninja>(TYPES.Ninja, 'master', true);
            const student = container.getTagged<Ninja>(TYPES.Ninja, 'master', false);
            expect(master instanceof NinjaMaster).eql(true);
            expect(student instanceof NinjaStudent).eql(true);
            expect(master.weapon.name).eql('katana');
            expect(student.weapon.name).eql('bokken');
        });
        _it('Should_support_a_whenParentNamed_contextual_bindings_constraint', () => {
            interface types {
                Material: string;
                Ninja: string;
                Weapon: string;
            }
            const TYPES: types = {
                Material: 'Material',
                Ninja: 'Ninja',
                Weapon: 'Weapon'
            };
            interface Material {
                name: string;
            }
            @injectable()
            class Wood implements Material {
                public name: string;
                public constructor() {
                    this.name = 'wood';
                }
            }
            @injectable()
            class Iron implements Material {
                public name: string;
                public constructor() {
                    this.name = 'iron';
                }
            }
            interface Weapon {
                material: Material;
            }
            @injectable()
            class Sword implements Weapon {
                public material: Material;
                public constructor(
                @inject('Material')
                material: Material) {
                    this.material = material;
                }
            }
            interface Ninja {
                weapon: Weapon;
            }
            @injectable()
            class NinjaStudent implements Ninja {
                public weapon: Weapon;
                public constructor(
                @inject('Weapon')
                @named('non-lethal')
                weapon: Weapon) {
                    this.weapon = weapon;
                }
            }
            @injectable()
            class NinjaMaster implements Ninja {
                public weapon: Weapon;
                public constructor(
                @inject('Weapon')
                @named('lethal')
                weapon: Weapon) {
                    this.weapon = weapon;
                }
            }
            const container = new Container();
            container.bind<Ninja>(TYPES.Ninja).to(NinjaStudent).whenTargetTagged('master', false);
            container.bind<Ninja>(TYPES.Ninja).to(NinjaMaster).whenTargetTagged('master', true);
            container.bind<Weapon>(TYPES.Weapon).to(Sword);
            container.bind<Material>(TYPES.Material).to(Iron).whenParentNamed('lethal');
            container.bind<Material>(TYPES.Material).to(Wood).whenParentNamed('non-lethal');
            const master = container.getTagged<Ninja>(TYPES.Ninja, 'master', true);
            const student = container.getTagged<Ninja>(TYPES.Ninja, 'master', false);
            expect(master.weapon.material.name).eql('iron');
            expect(student.weapon.material.name).eql('wood');
        });
        _it('Should_support_a_whenParentTagged_contextual_bindings_constraint', () => {
            interface types {
                Material: string;
                Ninja: string;
                Weapon: string;
            }
            const TYPES: types = {
                Material: 'Material',
                Ninja: 'Ninja',
                Weapon: 'Weapon'
            };
            interface Material {
                name: string;
            }
            @injectable()
            class Wood implements Material {
                public name: string;
                public constructor() {
                    this.name = 'wood';
                }
            }
            @injectable()
            class Iron implements Material {
                public name: string;
                public constructor() {
                    this.name = 'iron';
                }
            }
            interface Weapon {
                material: Material;
            }
            @injectable()
            class Sword implements Weapon {
                public material: Material;
                public constructor(
                @inject('Material')
                material: Material) {
                    this.material = material;
                }
            }
            interface Ninja {
                weapon: Weapon;
            }
            @injectable()
            class NinjaStudent implements Ninja {
                public weapon: Weapon;
                public constructor(
                @inject('Weapon')
                @tagged('lethal', false)
                weapon: Weapon) {
                    this.weapon = weapon;
                }
            }
            @injectable()
            class NinjaMaster implements Ninja {
                public weapon: Weapon;
                public constructor(
                @inject('Weapon')
                @tagged('lethal', true)
                weapon: Weapon) {
                    this.weapon = weapon;
                }
            }
            const container = new Container();
            container.bind<Ninja>(TYPES.Ninja).to(NinjaStudent).whenTargetTagged('master', false);
            container.bind<Ninja>(TYPES.Ninja).to(NinjaMaster).whenTargetTagged('master', true);
            container.bind<Weapon>(TYPES.Weapon).to(Sword);
            container.bind<Material>(TYPES.Material).to(Iron).whenParentTagged('lethal', true);
            container.bind<Material>(TYPES.Material).to(Wood).whenParentTagged('lethal', false);
            const master = container.getTagged<Ninja>(TYPES.Ninja, 'master', true);
            const student = container.getTagged<Ninja>(TYPES.Ninja, 'master', false);
            expect(master.weapon.material.name).eql('iron');
            expect(student.weapon.material.name).eql('wood');
        });
        _it('Should_support_a_whenAnyAncestorIs_and_whenNoAncestorIs_contextual_bindings_constraint', () => {
            interface types {
                Material: string;
                Ninja: string;
                Weapon: string;
            }
            const TYPES: types = {
                Material: 'Material',
                Ninja: 'Ninja',
                Weapon: 'Weapon'
            };
            interface Material {
                name: string;
            }
            @injectable()
            class Wood implements Material {
                public name: string;
                public constructor() {
                    this.name = 'wood';
                }
            }
            @injectable()
            class Iron implements Material {
                public name: string;
                public constructor() {
                    this.name = 'iron';
                }
            }
            interface Weapon {
                material: Material;
            }
            @injectable()
            class Sword implements Weapon {
                public material: Material;
                public constructor(
                @inject('Material')
                material: Material) {
                    this.material = material;
                }
            }
            interface Ninja {
                weapon: Weapon;
            }
            @injectable()
            class NinjaStudent implements Ninja {
                public weapon: Weapon;
                public constructor(
                @inject('Weapon')
                weapon: Weapon) {
                    this.weapon = weapon;
                }
            }
            @injectable()
            class NinjaMaster implements Ninja {
                public weapon: Weapon;
                public constructor(
                @inject('Weapon')
                weapon: Weapon) {
                    this.weapon = weapon;
                }
            }
            // whenAnyAncestorIs
            const container = new Container();
            container.bind<Ninja>(TYPES.Ninja).to(NinjaStudent).whenTargetTagged('master', false);
            container.bind<Ninja>(TYPES.Ninja).to(NinjaMaster).whenTargetTagged('master', true);
            container.bind<Weapon>(TYPES.Weapon).to(Sword);
            container.bind<Material>(TYPES.Material).to(Iron).whenAnyAncestorIs(NinjaMaster);
            container.bind<Material>(TYPES.Material).to(Wood).whenAnyAncestorIs(NinjaStudent);
            const master = container.getTagged<Ninja>(TYPES.Ninja, 'master', true);
            const student = container.getTagged<Ninja>(TYPES.Ninja, 'master', false);
            expect(master.weapon.material.name).eql('iron');
            expect(student.weapon.material.name).eql('wood');
            // whenNoAncestorIs
            const container2 = new Container();
            container2.bind<Ninja>(TYPES.Ninja).to(NinjaStudent).whenTargetTagged('master', false);
            container2.bind<Ninja>(TYPES.Ninja).to(NinjaMaster).whenTargetTagged('master', true);
            container2.bind<Weapon>(TYPES.Weapon).to(Sword);
            container2.bind<Material>(TYPES.Material).to(Iron).whenNoAncestorIs(NinjaStudent);
            container2.bind<Material>(TYPES.Material).to(Wood).whenNoAncestorIs(NinjaMaster);
            const master2 = container2.getTagged<Ninja>(TYPES.Ninja, 'master', true);
            const student2 = container2.getTagged<Ninja>(TYPES.Ninja, 'master', false);
            expect(master2.weapon.material.name).eql('iron');
            expect(student2.weapon.material.name).eql('wood');
        });
        _it('Should_support_a_whenAnyAncestorNamed_and_whenNoAncestorNamed_contextual_bindings_constraint', () => {
            interface types {
                Material: string;
                Ninja: string;
                Weapon: string;
            }
            const TYPES: types = {
                Material: 'Material',
                Ninja: 'Ninja',
                Weapon: 'Weapon'
            };
            interface Material {
                name: string;
            }
            @injectable()
            class Wood implements Material {
                public name: string;
                public constructor() {
                    this.name = 'wood';
                }
            }
            @injectable()
            class Iron implements Material {
                public name: string;
                public constructor() {
                    this.name = 'iron';
                }
            }
            interface Weapon {
                material: Material;
            }
            @injectable()
            class Sword implements Weapon {
                public material: Material;
                public constructor(
                @inject('Material')
                material: Material) {
                    this.material = material;
                }
            }
            interface Ninja {
                weapon: Weapon;
            }
            @injectable()
            class NinjaStudent implements Ninja {
                public weapon: Weapon;
                public constructor(
                @inject('Weapon')
                weapon: Weapon) {
                    this.weapon = weapon;
                }
            }
            @injectable()
            class NinjaMaster implements Ninja {
                public weapon: Weapon;
                public constructor(
                @inject('Weapon')
                weapon: Weapon) {
                    this.weapon = weapon;
                }
            }
            // whenAnyAncestorNamed
            const container = new Container();
            container.bind<Ninja>(TYPES.Ninja).to(NinjaStudent).whenTargetNamed('non-lethal');
            container.bind<Ninja>(TYPES.Ninja).to(NinjaMaster).whenTargetNamed('lethal');
            container.bind<Weapon>(TYPES.Weapon).to(Sword);
            container.bind<Material>(TYPES.Material).to(Iron).whenAnyAncestorNamed('lethal');
            container.bind<Material>(TYPES.Material).to(Wood).whenAnyAncestorNamed('non-lethal');
            const master = container.getNamed<Ninja>(TYPES.Ninja, 'lethal');
            const student = container.getNamed<Ninja>(TYPES.Ninja, 'non-lethal');
            expect(master.weapon.material.name).eql('iron');
            expect(student.weapon.material.name).eql('wood');
            // whenNoAncestorNamed
            const container2 = new Container();
            container2.bind<Ninja>(TYPES.Ninja).to(NinjaStudent).whenTargetNamed('non-lethal');
            container2.bind<Ninja>(TYPES.Ninja).to(NinjaMaster).whenTargetNamed('lethal');
            container2.bind<Weapon>(TYPES.Weapon).to(Sword);
            container2.bind<Material>(TYPES.Material).to(Iron).whenNoAncestorNamed('non-lethal');
            container2.bind<Material>(TYPES.Material).to(Wood).whenNoAncestorNamed('lethal');
            const master2 = container.getNamed<Ninja>(TYPES.Ninja, 'lethal');
            const student2 = container.getNamed<Ninja>(TYPES.Ninja, 'non-lethal');
            expect(master2.weapon.material.name).eql('iron');
            expect(student2.weapon.material.name).eql('wood');
        });
        _it('Should_support_a_whenAnyAncestorTagged_and_whenNoAncestorTaggedcontextual_bindings_constraint', () => {
            interface types {
                Material: string;
                Ninja: string;
                Weapon: string;
            }
            const TYPES: types = {
                Material: 'Material',
                Ninja: 'Ninja',
                Weapon: 'Weapon'
            };
            interface Material {
                name: string;
            }
            @injectable()
            class Wood implements Material {
                public name: string;
                public constructor() {
                    this.name = 'wood';
                }
            }
            @injectable()
            class Iron implements Material {
                public name: string;
                public constructor() {
                    this.name = 'iron';
                }
            }
            interface Weapon {
                material: Material;
            }
            @injectable()
            class Sword implements Weapon {
                public material: Material;
                public constructor(
                @inject('Material')
                material: Material) {
                    this.material = material;
                }
            }
            interface Ninja {
                weapon: Weapon;
            }
            @injectable()
            class NinjaStudent implements Ninja {
                public weapon: Weapon;
                public constructor(
                @inject('Weapon')
                weapon: Weapon) {
                    this.weapon = weapon;
                }
            }
            @injectable()
            class NinjaMaster implements Ninja {
                public weapon: Weapon;
                public constructor(
                @inject('Weapon')
                weapon: Weapon) {
                    this.weapon = weapon;
                }
            }
            // whenAnyAncestorTagged
            const container = new Container();
            container.bind<Ninja>(TYPES.Ninja).to(NinjaStudent).whenTargetTagged('lethal', false);
            container.bind<Ninja>(TYPES.Ninja).to(NinjaMaster).whenTargetTagged('lethal', true);
            container.bind<Weapon>(TYPES.Weapon).to(Sword);
            container.bind<Material>(TYPES.Material).to(Iron).whenAnyAncestorTagged('lethal', true);
            container.bind<Material>(TYPES.Material).to(Wood).whenAnyAncestorTagged('lethal', false);
            const master = container.getTagged<Ninja>(TYPES.Ninja, 'lethal', true);
            const student = container.getTagged<Ninja>(TYPES.Ninja, 'lethal', false);
            expect(master.weapon.material.name).eql('iron');
            expect(student.weapon.material.name).eql('wood');
            // whenNoAncestorTagged
            const container2 = new Container();
            container2.bind<Ninja>(TYPES.Ninja).to(NinjaStudent).whenTargetTagged('lethal', false);
            container2.bind<Ninja>(TYPES.Ninja).to(NinjaMaster).whenTargetTagged('lethal', true);
            container2.bind<Weapon>(TYPES.Weapon).to(Sword);
            container2.bind<Material>(TYPES.Material).to(Iron).whenNoAncestorTagged('lethal', false);
            container2.bind<Material>(TYPES.Material).to(Wood).whenNoAncestorTagged('lethal', true);
            const master2 = container.getTagged<Ninja>(TYPES.Ninja, 'lethal', true);
            const student2 = container.getTagged<Ninja>(TYPES.Ninja, 'lethal', false);
            expect(master2.weapon.material.name).eql('iron');
            expect(student2.weapon.material.name).eql('wood');
        });
        _it('Should_support_a_whenAnyAncestorMatches_and_whenNoAncestorMatches_contextual_bindings_constraint', () => {
            interface types {
                Material: string;
                Ninja: string;
                Weapon: string;
            }
            const TYPES: types = {
                Material: 'Material',
                Ninja: 'Ninja',
                Weapon: 'Weapon'
            };
            interface Material {
                name: string;
            }
            @injectable()
            class Wood implements Material {
                public name: string;
                public constructor() {
                    this.name = 'wood';
                }
            }
            @injectable()
            class Iron implements Material {
                public name: string;
                public constructor() {
                    this.name = 'iron';
                }
            }
            interface Weapon {
                material: Material;
            }
            @injectable()
            class Sword implements Weapon {
                public material: Material;
                public constructor(
                @inject('Material')
                material: Material) {
                    this.material = material;
                }
            }
            interface Ninja {
                weapon: Weapon;
            }
            @injectable()
            class NinjaStudent implements Ninja {
                public weapon: Weapon;
                public constructor(
                @inject('Weapon')
                weapon: Weapon) {
                    this.weapon = weapon;
                }
            }
            @injectable()
            class NinjaMaster implements Ninja {
                public weapon: Weapon;
                public constructor(
                @inject('Weapon')
                weapon: Weapon) {
                    this.weapon = weapon;
                }
            }
            // custom constraints
            const anyAncestorIsNinjaMasterConstraint = typeConstraint(NinjaMaster);
            const anyAncestorIsNinjaStudentConstraint = typeConstraint(NinjaStudent);
            // whenAnyAncestorMatches
            const container = new Container();
            container.bind<Ninja>(TYPES.Ninja).to(NinjaStudent).whenTargetTagged('master', false);
            container.bind<Ninja>(TYPES.Ninja).to(NinjaMaster).whenTargetTagged('master', true);
            container.bind<Weapon>(TYPES.Weapon).to(Sword);
            container.bind<Material>(TYPES.Material).to(Iron).whenAnyAncestorMatches(anyAncestorIsNinjaMasterConstraint);
            container.bind<Material>(TYPES.Material).to(Wood).whenAnyAncestorMatches(anyAncestorIsNinjaStudentConstraint);
            const master = container.getTagged<Ninja>(TYPES.Ninja, 'master', true);
            const student = container.getTagged<Ninja>(TYPES.Ninja, 'master', false);
            expect(master.weapon.material.name).eql('iron');
            expect(student.weapon.material.name).eql('wood');
            // whenNoAncestorMatches
            const container2 = new Container();
            container2.bind<Ninja>(TYPES.Ninja).to(NinjaStudent).whenTargetTagged('master', false);
            container2.bind<Ninja>(TYPES.Ninja).to(NinjaMaster).whenTargetTagged('master', true);
            container2.bind<Weapon>(TYPES.Weapon).to(Sword);
            container2.bind<Material>(TYPES.Material).to(Iron).whenNoAncestorMatches(anyAncestorIsNinjaStudentConstraint);
            container2.bind<Material>(TYPES.Material).to(Wood).whenNoAncestorMatches(anyAncestorIsNinjaMasterConstraint);
            const master2 = container2.getTagged<Ninja>(TYPES.Ninja, 'master', true);
            const student2 = container2.getTagged<Ninja>(TYPES.Ninja, 'master', false);
            expect(master2.weapon.material.name).eql('iron');
            expect(student2.weapon.material.name).eql('wood');
        });
        _it('Should_be_able_to_inject_a_regular_derived_class', () => {
            const SYMBOLS = SYMBOLSSymbol2();
            interface Warrior {
                rank: string;
            }
            @injectable()
            class Samurai implements Warrior {
                public rank: string;
                public constructor(rank: string) {
                    this.rank = rank;
                }
            }
            @injectable()
            class SamuraiMaster extends Samurai implements Warrior {
                public constructor(
                @inject(SYMBOLS.RANK)
                rank: string) {
                    super(rank);
                }
            }
            const container = new Container();
            container.bind<Warrior>(SYMBOLS.SamuraiMaster).to(SamuraiMaster);
            container.bind<string>(SYMBOLS.RANK).toConstantValue('Master');
            const samurai = container.get<SamuraiMaster>(SYMBOLS.SamuraiMaster);
            expect(samurai.rank).eql('Master');
        });
        _it('Should_be_able_to_identify_missing_injectable_in_a_base_class', () => {
            const SYMBOLS = SYMBOL();
            interface Warrior {
                rank: string;
            }
            // IMPORTANT: Missing @injectable()
            class Samurai implements Warrior {
                public rank: string;
                public constructor(rank: string) {
                    this.rank = rank;
                }
            }
            @injectable()
            class SamuraiMaster extends Samurai implements Warrior {
                public constructor() {
                    super('master');
                }
            }
            const container = new Container();
            container.bind<Warrior>(SYMBOLS.SamuraiMaster).to(SamuraiMaster);
            throws: () => {
                return container.get<Warrior>(SYMBOLS.SamuraiMaster);
            };
        });
    });
}
