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
declare function __decorate(decorators: ClassDecorator[], target: NewableFunction, key?: ESObject, descriptor?: PropertyDescriptor | undefined): void;
declare function __param(paramIndex: number, decorator: ParameterDecorator): ClassDecorator;
import { Container, decorate, inject, injectable, interfaces, METADATA_KEY, multiInject, named, postConstruct, tagged, targetName } from 'inversify';
import { LazyServiceIdentifer, ServiceIdentifierOrFunc } from 'inversify/lib/annotation/lazy_service_identifier';
import { resolve } from 'inversify/lib/resolution/resolver';
import { InvalidDecoratorUsageWarrior } from '../utils/stubs';
import * as ns from "reflect-metadata";
ns;
interface Weapon {
    use(): void;
}
export function weapon1(weapon: Weapon, a) {
    const handler: ESObject = {
        apply(target: ESObject, thisArgument: ESObject, argumentsList: ESObject[]): ESObject {
            a.push(`Starting: ${new Date().getTime()}`);
            const result: ESObject = target.apply(thisArgument, argumentsList);
            a.push(`Finished: ${new Date().getTime()}`);
            return result;
        }
    };
    return weapon.use = new Proxy(weapon.use, handler);
}
export function valueOrDefault<T>(provider: () => Promise<T>, defaultValue: T) {
    return new Promise<T>((resolve, reject) => {
        provider().then((value) => {
            resolve(value);
        }).catch(() => {
            resolve(defaultValue);
        });
    });
}
export function resolveTyped<T>(context: interfaces.Context) {
    return resolve(context) as T;
}
export function taggedA() {
    let a = tagged('a', 1);
    return a(InvalidDecoratorUsageWarrior.prototype, "test", 0);
}
export function multiInjectA() {
    let a = multiInject('Weapon');
    return a(InvalidDecoratorUsageWarrior.prototype, "test", 0);
}
export function namedA() {
    let a = named('a');
    return a(InvalidDecoratorUsageWarrior.prototype, "test", 0);
}
export function SYMBOL() {
    let SYMBOLS = {
        SamuraiMaster: Symbol.for('SamuraiMaster')
    };
    return SYMBOLS;
}
export function TYPESSymbol3() {
    const TYPES = {
        Katana: Symbol.for('Katana'),
        Ninja: Symbol.for('Ninja'),
        Shuriken: Symbol.for('Shuriken')
    };
    return TYPES;
}
export function TYPESSymbol2() {
    const TYPES = {
        Warrior: Symbol.for('Warrior'),
        Weapon: Symbol.for('Weapon')
    };
    return TYPES;
}
export function TYPESSymbol4() {
    const TYPES = {
        Katana: Symbol.for('Katana'),
        Ninja: Symbol.for('Ninja'),
        School: Symbol.for('School'),
        Shuriken: Symbol.for('Shuriken'),
        Organisation: Symbol.for('Organisation'),
    };
    return TYPES;
}
export function SYMBOLSSymbol4() {
    const SYMBOLS = {
        Samurai: Symbol.for('Samurai'),
        SamuraiMaster: Symbol.for('SamuraiMaster'),
        SamuraiMaster2: Symbol.for('SamuraiMaster2'),
        Weapon: Symbol.for('Weapon')
    };
    return SYMBOLS;
}
export function SYMBOLSSymbol2() {
    const SYMBOLS = {
        RANK: Symbol.for('RANK'),
        SamuraiMaster: Symbol.for('SamuraiMaster')
    };
    return SYMBOLS;
}
export function invertPrototype(a) {
    let aa = a.prototype;
    return aa;
}
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
@injectable()
export class Ninja1 implements Warrior {
    public constructor(
    @inject(katanaFactoryId)
    @targetName('katana')
    public katanaFactory: KatanaFactory, 
    @inject(shurikenId)
    @targetName('shuriken')
    public shuriken: Shuriken) {
    }
}
