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
import { inject, injectable, named, tagged } from 'inversify';

export interface FooInterface {
  name: string;
  greet(): string;
}

export interface BarInterface {
  name: string;
  greet(): string;
}

export interface FooBarInterface {
  foo: FooInterface;
  bar: BarInterface;
  greet(): string;
}

export class Foo implements FooInterface {
  public name: string;
  public constructor() {
    this.name = 'foo';
  }
  public greet(): string {
    return this.name;
  }
}

export class Bar implements BarInterface {
  public name: string;
  public constructor() {
    this.name = 'bar';
  }
  public greet(): string {
    return this.name;
  }
}

@injectable()
export class FooBar implements FooBarInterface {
  public foo: FooInterface;
  public bar: BarInterface;
  public constructor(
    @inject('FooInterface') foo: FooInterface,
    @inject('BarInterface') bar: BarInterface
  ) {
    this.foo = foo;
    this.bar = bar;
  }
  public greet(): string {
    return this.foo.greet() + this.bar.greet();
  }
}

// 2.0

export interface Weapon { }
export interface Katana extends Weapon { }
export interface Shuriken extends Weapon { }

export class Katana implements Katana { }
export class Shuriken implements Shuriken { }

export class WarriorWithoutInjections { }

@injectable()
export class DecoratedWarriorWithoutInjections { }

@injectable()
export class Warrior {
  public constructor(
    @inject('Katana') primary: Katana,
    @inject('Shuriken') secondary: Shuriken
  ) {
    // ...
  }
}

export class InvalidDecoratorUsageWarrior {
  public constructor(
    primary: Weapon,
    secondary: Weapon) {
    // ...
  }
}

// export class InvalidDecoratorUsageWarrior1 {
//
//   private _primaryWeapon: Katana;
//   private _secondaryWeapon: Shuriken;
//
//   public constructor(
//     primary: Katana,
//     secondary: Shuriken
//   ) {
//
//     this._primaryWeapon = primary;
//     this._secondaryWeapon = secondary;
//   }
//
//   public test(a: string) { /*...*/ }
//
//   public debug() {
//     return {
//       primaryWeapon: this._primaryWeapon,
//       secondaryWeapon: this._secondaryWeapon
//     };
//   }
//
// }

export class MissingInjectionWarrior {
  public constructor(
    primary: Weapon,
    secondary: Weapon) {
    // ...
  }
}

@injectable()
export class NamedWarrior {
  public constructor(
    @inject('Katana') @named('strong') primary: Weapon,
    @inject('Shuriken') @named('weak') secondary: Weapon
  ) {
    // ...
  }
}

@injectable()
export class TaggedWarrior {
  public constructor(
    @inject('Katana') @tagged('power', 5) primary: Weapon,
    @inject('Shuriken') @tagged('power', 1) secondary: Weapon
  ) {
    // ...
  }
}