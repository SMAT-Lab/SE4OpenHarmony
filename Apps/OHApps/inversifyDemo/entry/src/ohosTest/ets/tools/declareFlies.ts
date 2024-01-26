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
import { inject, LazyServiceIdentifer } from 'inversify';
import { ServiceIdentifierOrFunc } from 'inversify/lib/annotation/lazy_service_identifier';

declare function __decorate(
  decorators: ClassDecorator[],
  target: NewableFunction,
  key?: ESObject,
  descriptor?: PropertyDescriptor | undefined
): void;

declare function __param(paramIndex: number, decorator: ParameterDecorator): ClassDecorator;

interface Katana1 { }
interface Shuriken1 { }
interface Sword1 { }
class Katana implements Katana1 { }
class Shuriken implements Shuriken1 { }
class Sword implements Sword1 { }

const lazySwordId:ESObject = new LazyServiceIdentifer<ESObject>(() => 'Sword');
class DecoratedWarrior {

  private _primaryWeapon: Katana;
  private _secondaryWeapon: Shuriken;
  private _tertiaryWeapon: Sword|Shuriken;

  public constructor(
    @inject('Katana') primary: Katana,
    @inject('Shuriken') secondary: Shuriken,
    @inject(lazySwordId) tertiary: Shuriken
  ) {
    this._primaryWeapon = primary;
    this._secondaryWeapon = secondary;
    this._tertiaryWeapon = tertiary ;
  }

  public debug() {
    interface result1{
      primaryWeapon: Katana;
      secondaryWeapon: Shuriken;
      tertiaryWeapon: Sword|Shuriken;
    }
    let results1:result1= {
      primaryWeapon: this._primaryWeapon,
      secondaryWeapon: this._secondaryWeapon,
      tertiaryWeapon: this._tertiaryWeapon
    };
    return results1
  }

}

class InvalidDecoratorUsageWarrior {

  private _primaryWeapon: Katana;
  private _secondaryWeapon: Shuriken;

  public constructor(
    primary: Katana,
    secondary: Shuriken
  ) {

    this._primaryWeapon = primary;
    this._secondaryWeapon = secondary;
  }

  public test(a: string) { /*...*/ }

  public debug() {
    interface result2{
      primaryWeapon: Katana;
      secondaryWeapon: Shuriken;
    }
    let results2:result2= {
      primaryWeapon: this._primaryWeapon,
      secondaryWeapon: this._secondaryWeapon
    };
    return results2
  }

}



export function useDecoratorMoreThanOnce() {
  __decorate([__param(0, inject('Katana')), __param(0, inject('Shurien'))], InvalidDecoratorUsageWarrior);
}

export function useDecoratorOnMethodThatIsNotAConstructor() {
  __decorate([__param(0, inject('Katana'))],
    InvalidDecoratorUsageWarrior.prototype as ESObject as NewableFunction,
    'test', Object.getOwnPropertyDescriptor(InvalidDecoratorUsageWarrior.prototype, 'test'));

}

export function useDecoratorW_ithUndefined() {
  __decorate([__param(0, inject(undefined as ESObject as ServiceIdentifierOrFunc<ESObject>))], InvalidDecoratorUsageWarrior);

}