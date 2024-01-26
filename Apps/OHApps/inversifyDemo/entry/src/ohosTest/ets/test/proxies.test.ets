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
import { interfaces } from 'inversify';
import { Container, inject, injectable } from 'inversify';
import {weapon1}from'../tools/tools'
import * as ns from  "reflect-metadata"
ns

export default function proxiesTest() {
  describe('proxiesTest',  ()=> {
    _it('Should_support_the_injection_of_proxied_objects', () => {

      const weaponId = 'Weapon';
      const warriorId = 'Warrior';

      interface Weapon {
        use(): void;
      }

      @injectable()
      class Katana implements Weapon {
        public use: () => string = () =>  {
          return 'Used Katana!';
        }
      }

      interface Warrior {
        weapon: Weapon;
      }

      @injectable()
      class Ninja implements Warrior {
        public weapon: Weapon;

        public constructor(@inject(weaponId) weapon: Weapon) {
          this.weapon = weapon;
        }
      }

      const container = new Container();
      container.bind<Warrior>(warriorId).to(Ninja);
      const log: string[] = [];

      container.bind<Weapon>(weaponId).to(Katana).onActivation((context: interfaces.Context, weapon: Weapon) => {
        weapon1(weapon,log)
        return weapon;
      });

      const ninja = container.get<Warrior>(warriorId);
      ninja.weapon.use();

      expect(log.length).eql(2);
      expect(log[0]?.indexOf('Starting: ')).not.to.eql(-1);
      expect(log[1]?.indexOf('Finished: ')).not.to.eql(-1);

    });
  })
}