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
import { inject, tagged, named } from 'inversify';
import { provide } from "inversify-binding-decorators/es/index";
import { fluentProvide } from "inversify-binding-decorators/es/index";
import { METADATA_KEY } from "inversify-binding-decorators/es/constants";
import ProvideDoneSyntax from "inversify-binding-decorators/es/syntax/provide_done_syntax";
import interfaces from "inversify-binding-decorators/dts/interfaces/interfaces";
import ProvideInWhenOnSyntax from 'inversify-binding-decorators/es/syntax/provide_in_when_on_syntax';
import ProvideInSyntax from 'inversify-binding-decorators/es/syntax/provide_in_syntax';
import ProvideWhenSyntax from 'inversify-binding-decorators/es/syntax/provide_when_syntax';
import ProvideOnSyntax from 'inversify-binding-decorators/es/syntax/provide_on_syntax';
import ProvideWhenOnSyntax from "inversify-binding-decorators/es/syntax/provide_when_on_syntax";
import { interfaces as inversifyInterfaces, Container } from "inversify";
import "reflect-metadata";
export interface Warrior {
    katana: Weapon;
    shuriken: ThrowableWeapon;
    fight(): string;
    sneak(): string;
}
export interface Weapon {
    hit(): string;
}
export interface ThrowableWeapon {
    throw(): string;
}
export let TYPE = {
    ThrowableWeapon: "ThrowableWeapon",
    Warrior: "Warrior",
    Weapon: "Weapon"
};
@provide(TYPE.Weapon)
export class Katana implements Weapon {
    public hit() {
        return "cut!";
    }
}
@provide(TYPE.ThrowableWeapon)
export class Shuriken implements ThrowableWeapon {
    public throw() {
        return "hit!";
    }
}
@provide(TYPE.Warrior)
export class Ninja implements Warrior {
    public katana: Weapon;
    public shuriken: ThrowableWeapon;
    public constructor(
    @inject(TYPE.Weapon)
    katana: Weapon, 
    @inject(TYPE.ThrowableWeapon)
    shuriken: ThrowableWeapon) {
        this.katana = katana;
        this.shuriken = shuriken;
    }
    public fight() {
        return this.katana.hit();
    }
    public sneak() {
        return this.shuriken.throw();
    }
}
@provide(Katana1)
export class Katana1 {
    public hit() {
        return "cut!";
    }
}
@provide(Shuriken1)
export class Shuriken1 {
    public throw() {
        return "hit!";
    }
}
@provide(Ninja1)
export class Ninja1 {
    public katana: Katana;
    public shuriken: Shuriken;
    public constructor(katana: Katana, shuriken: Shuriken) {
        this.katana = katana;
        this.shuriken = shuriken;
    }
    public fight() {
        return this.katana.hit();
    }
    public sneak() {
        return this.shuriken.throw();
    }
}
export interface Warrior1 {
    katana: Katana;
    shuriken: Shuriken;
    fight(): string;
    sneak(): string;
}
export let TYPE1 = {
    ThrowableWeapon: Symbol.for("ThrowableWeapon"),
    Warrior1: Symbol.for("Warrior1"),
    Weapon: Symbol.for("Weapon"),
};
@provide(TYPE1.Weapon)
export class Katana2 implements Weapon {
    public hit() {
        return "cut!";
    }
}
@provide(TYPE1.ThrowableWeapon)
export class Shuriken2 implements ThrowableWeapon {
    public throw() {
        return "hit!";
    }
}
@provide(TYPE1.Warrior1)
export class Ninja2 implements Warrior {
    public katana: Weapon;
    public shuriken: ThrowableWeapon;
    public constructor(
    @inject(TYPE1.Weapon)
    katana: Weapon, 
    @inject(TYPE1.ThrowableWeapon)
    shuriken: ThrowableWeapon) {
        this.katana = katana;
        this.shuriken = shuriken;
    }
    public fight() {
        return this.katana.hit();
    }
    public sneak() {
        return this.shuriken.throw();
    }
}
let provideSingleton = function (identifier: string) {
    return fluentProvide(identifier).inSingletonScope().done();
};
let provideTransient = function (identifier: string) {
    return fluentProvide(identifier).inTransientScope().done();
};
@provideSingleton(TYPE.Weapon)
export class Katana3 implements Weapon {
    private _mark: any;
    public constructor() {
        this._mark = Math.random();
    }
    public hit() {
        return "cut! " + this._mark;
    }
}
@provideTransient(TYPE.ThrowableWeapon)
export class Shuriken3 implements ThrowableWeapon {
    private _mark: any;
    public constructor() {
        this._mark = Math.random();
    }
    public throw() {
        return "hit! " + this._mark;
    }
}
@provideTransient(TYPE.Warrior)
export class Ninja3 implements Warrior {
    public katana: Weapon;
    public shuriken: ThrowableWeapon;
    public constructor(
    @inject(TYPE.Weapon)
    katana: Weapon, 
    @inject(TYPE.ThrowableWeapon)
    shuriken: ThrowableWeapon) {
        this.katana = katana;
        this.shuriken = shuriken;
    }
    public fight() {
        return this.katana.hit();
    }
    public sneak() {
        return this.shuriken.throw();
    }
}
export let TYPE2 = {
    Warrior2: "Warrior2",
    Weapon: "Weapon"
};
let provideThrowable = function (serviceIdentifier: string, isThrowable: boolean) {
    return fluentProvide(serviceIdentifier).whenTargetTagged("throwable", isThrowable).done();
};
export interface Warrior2 {
    primary: Weapon;
    secondary: Weapon;
    fight(): string;
    sneak(): string;
}
@provideThrowable(TYPE2.Weapon, false)
export class Katana4 implements Weapon {
    public hit() {
        return "Hit by Katana!";
    }
}
@provideThrowable(TYPE2.Weapon, true)
export class Shuriken4 implements Weapon {
    public hit() {
        return "Hit by Shuriken!";
    }
}
@fluentProvide(TYPE2.Warrior2).done()
export class Ninja4 implements Warrior2 {
    public primary: Weapon;
    public secondary: Weapon;
    public constructor(
    @inject(TYPE2.Weapon)
    @tagged("throwable", false)
    primary: Weapon, 
    @inject(TYPE2.Weapon)
    @tagged("throwable", true)
    secondary: Weapon) {
        this.primary = primary;
        this.secondary = secondary;
    }
    public fight() { return this.primary.hit(); }
    public sneak() { return this.secondary.hit(); }
}
let provideShortWeapon = function (serviceIdentifier: string, isThrowable: boolean) {
    return fluentProvide(serviceIdentifier).inSingletonScope().whenAnyAncestorNamed("shortsword").done();
};
let provideLongWeapon = function (serviceIdentifier: string, isThrowable: boolean) {
    return fluentProvide(serviceIdentifier).whenNoAncestorNamed("shortsword").done();
};
export interface Warrior3 {
    weapon: Weapon1;
    fight(): number;
    weaponLength(): string;
}
export interface Weapon1 {
    hit(): number;
    length(): string;
}
export interface Dojo {
    warrior: Warrior3;
}
export let TYPE3 = {
    Dojo: "Dojo",
    Warrior3: "Warrior3",
    Weapon1: "Weapon1"
};
@provideShortWeapon(TYPE3.Weapon1, false)
export class Wakizashi implements Weapon {
    private _mark: any;
    public constructor() {
        this._mark = Math.random();
    }
    public hit() {
        return this._mark;
    }
    public length() {
        return "short";
    }
}
@provideLongWeapon(TYPE3.Weapon1, false)
export class Katana5 implements Weapon1 {
    private _mark: any;
    public constructor() {
        this._mark = Math.random();
    }
    public hit() {
        return this._mark;
    }
    public length() {
        return "long";
    }
}
@provide(KatanaDojo)
export class KatanaDojo implements Dojo {
    public warrior: Warrior3;
    constructor(
    @inject(TYPE3.Warrior3)
    warrior: Warrior3) {
        this.warrior = warrior;
    }
}
@provide(WakizashiDojo)
export class WakizashiDojo implements Dojo {
    public warrior: Warrior3;
    constructor(
    @named("shortsword")
    @inject(TYPE3.Warrior3)
    warrior: Warrior3) {
        this.warrior = warrior;
    }
}
@fluentProvide(TYPE3.Warrior3).done()
export class Ninja5 implements Warrior3 {
    public weapon: Weapon1;
    public constructor(
    @inject(TYPE3.Weapon1)
    weapon: Weapon1) {
        this.weapon = weapon;
    }
    public fight() { return this.weapon.hit(); }
    public weaponLength() { return this.weapon.length(); }
}
export function DeleteMetadata() {
    Reflect.deleteMetadata(METADATA_KEY.provide, Reflect);
}
export function getMetadata() {
    return Reflect.getMetadata(METADATA_KEY.provide, Reflect)[0].implementationType;
}
export function shouldThrow0() {
    @provide("Ninja")
    @provide("SilentNinja")
    class Ninja {
    }
    return Ninja;
}
export function shouldThrow() {
    @provide("Ninja", true)
    @provide("SilentWarrior", true)
    class Ninja {
    }
    return Ninja;
}
const provideSingleton1 = (identifier: any) => {
    return fluentProvide(identifier)
        .inSingletonScope()
        .done(); // IMPORTANT!
};
const provideSingleton2 = (identifier: any) => {
    return fluentProvide(identifier)
        .inSingletonScope()
        .done(true); // IMPORTANT!
};
export function shouldThrow1() {
    @provideSingleton1("Ninja")
    @provideSingleton1("SilentNinja")
    class Ninja {
    }
    return Ninja;
}
export function shouldThrow2() {
    @provideSingleton2("Ninja")
    @provideSingleton2("SilentNinja")
    class Ninja {
    }
    return Ninja;
}
export class Ninja6 {
}
let bindingInSyntax = (bind: inversifyInterfaces.Bind, target: any) => bind<Ninja6>("Ninja").to(target);
let binding: interfaces.BindConstraint = (bind: inversifyInterfaces.Bind, target: any) => (<any>bindingInSyntax(bind, target))._binding;
let provideDoneSyntax = new ProvideDoneSyntax(binding);
export let decorator = provideDoneSyntax.done();
class Ninja7 {
}
class Game {
}
let bindingInSyntaxFunction = (bind: inversifyInterfaces.Bind, target: any) => bind<Ninja7>("Ninja7").to(<any>null);
let provideDoneSyntax1 = new ProvideDoneSyntax(bindingInSyntaxFunction);
export let provideInSyntax = new ProvideInSyntax(bindingInSyntaxFunction, provideDoneSyntax1);
export let provideWhenSyntax = new ProvideWhenSyntax(bindingInSyntaxFunction, provideDoneSyntax1);
export let provideOnSyntax = new ProvideOnSyntax(bindingInSyntaxFunction, provideDoneSyntax1);
let provideInWhenOnSyntax = new ProvideInWhenOnSyntax(provideInSyntax, provideWhenSyntax, provideOnSyntax);
export function getProvideInSyntax() {
    return (<any>provideInWhenOnSyntax)._provideInSyntax;
}
export function getProvideWhenSyntax() {
    return (<any>provideInWhenOnSyntax)._provideWhenSyntax;
}
export function getProvideOnSyntax() {
    return (<any>provideInWhenOnSyntax)._provideOnSyntax;
}
class Ninja8 {
}
let bindingInSyntaxFunction2 = (bind: inversifyInterfaces.Bind, target: any) => bind<Ninja8>("Ninja8").to(<any>null);
let provideDoneSyntax2 = new ProvideDoneSyntax(bindingInSyntaxFunction2);
export let provideWhenSyntax2 = new ProvideWhenSyntax(bindingInSyntaxFunction2, provideDoneSyntax2);
export let provideOnSyntax2 = new ProvideOnSyntax(bindingInSyntaxFunction2, provideDoneSyntax2);
let provideWhenOnSyntax2 = new ProvideWhenOnSyntax(provideWhenSyntax2, provideOnSyntax2);
export function getProvideWhenSyntax2() {
    let pro = (<any>provideWhenOnSyntax2)._provideWhenSyntax;
    return pro;
}
export function getProvideOnSyntax2() {
    return (<any>provideWhenOnSyntax2)._provideOnSyntax;
}
