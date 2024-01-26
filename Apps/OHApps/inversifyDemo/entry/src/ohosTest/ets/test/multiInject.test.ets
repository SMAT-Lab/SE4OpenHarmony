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
import { decorate } from 'inversify';
import { multiInject } from 'inversify';
import * as ERROR_MSGS from 'inversify/lib/constants/error_msgs';
import * as METADATA_KEY from 'inversify/lib/constants/metadata_keys';
import { interfaces } from 'inversify';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it as _it, expect } from '../utils/util'
import { multiInjectA } from '../tools/tools';
import * as ns from "reflect-metadata"
ns

export default function multiInjectTest() {
  interface Weapon { }

  class DecoratedWarrior {

    private _primaryWeapon: Weapon;
    private _secondaryWeapon: Weapon;

    public constructor(
      @multiInject('Weapon') weapons: Weapon[]
    ) {

      this._primaryWeapon = weapons[0] as Weapon;
      this._secondaryWeapon = weapons[1] as Weapon;
    }

    public mock() {
      return `${JSON.stringify(this._primaryWeapon)} ${JSON.stringify(this._secondaryWeapon)}`;
    }

  }

  class InvalidDecoratorUsageWarrior {

    private _primaryWeapon: Weapon;
    private _secondaryWeapon: Weapon;

    public constructor(
      weapons: Weapon[]
    ) {
      this._primaryWeapon = weapons[0] as Weapon;
      this._secondaryWeapon = weapons[1] as Weapon;
    }

    public test(a: string) { /*...*/ }

    public debug() {
      interface result1{
        primaryWeapon: Weapon;
        secondaryWeapon: Weapon;
      }
      let results1:result1= {
        primaryWeapon: this._primaryWeapon,
        secondaryWeapon: this._secondaryWeapon
      };
      return results1
    }

  }
  describe('multiInjectTest',  ()=> {
    _it('Should_generate_metadata_for_named_parameters', () => {
      const metadataKey = METADATA_KEY.TAGGED;
      const paramsMetadata:ESObject= Reflect.getMetadata(metadataKey, DecoratedWarrior);
      expect(paramsMetadata).to.be.an('object');

      // assert metadata for first argument
      expect(paramsMetadata['0']).to.be.instanceof(Array);
      const m1: interfaces.Metadata = paramsMetadata['0'][0];
      expect(m1.key).to.be.eql(METADATA_KEY.MULTI_INJECT_TAG);
      expect(m1.value).to.be.eql('Weapon');
      expect(paramsMetadata['0'][1]).to.eq(undefined);

      // no more metadata should be available
      expect(paramsMetadata['1']).to.eq(undefined);

    });

    _it('Should_throw_when_applied_multiple_times', () => {

      const useDecoratorMoreThanOnce =  ()=> {
        let a = multiInject('Weapon')
        let b =multiInject('Weapon')
        a(InvalidDecoratorUsageWarrior, undefined, 0)
        b(InvalidDecoratorUsageWarrior, undefined, 0)
      };

      const msg = `${ERROR_MSGS.DUPLICATED_METADATA} ${METADATA_KEY.MULTI_INJECT_TAG}`;
      expect(useDecoratorMoreThanOnce).to.throw(msg);

    });

    _it('Should_throw_when_not_applied_to_a_constructor', () => {

      const useDecoratorOnMethodThatIsNotAConstructor =  ()=> {
        multiInjectA()
      };

      const msg = `${ERROR_MSGS.INVALID_DECORATOR_OPERATION}`;
      expect(useDecoratorOnMethodThatIsNotAConstructor).to.throw(msg);

    });

    _it('Should_be_usable_in_VanillaJS_applications', () => {

      interface Katana { }
      interface Shurien { }

      const VanillaJSWarrior = ( ()=> {
        let Warrior=(primary: Katana, secondary: Shurien)=> {
          // ...
        }
        return Warrior;
      })();

      decorate(multiInject('Weapon'), VanillaJSWarrior, 0);
      const metadataKey = METADATA_KEY.TAGGED;
      const paramsMetadata:ESObject =Reflect.getMetadata(metadataKey, VanillaJSWarrior);;
      expect(paramsMetadata).to.be.an('object');

      // assert metadata for first argument
      expect(paramsMetadata['0']).to.be.instanceof(Array);
      const m1: interfaces.Metadata = paramsMetadata['0'][0];
      expect(m1.key).to.be.eql(METADATA_KEY.MULTI_INJECT_TAG);
      expect(m1.value).to.be.eql('Weapon');
      expect(paramsMetadata['0'][1]).to.eq(undefined);

      // no more metadata should be available
      expect(paramsMetadata['1']).to.eq(undefined);

    });
  })
}