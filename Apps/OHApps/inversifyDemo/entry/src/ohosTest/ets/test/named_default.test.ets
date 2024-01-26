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
import { Container, inject, injectable, named } from "inversify";
import { describe, beforeAll, beforeEach, afterEach, afterAll, it as _it, expect } from '../utils/util'
import * as ns from "reflect-metadata"
ns

export default function named_defaultTest() {
  describe('named_defaultTest',  ()=> {
    _it("Should_be_able_to_inject_a_default_to_avoid_ambiguous_binding_exceptions", () => {
      interface TYPE{
        Warrior: string;
        Weapon: string;
      }
      interface  TAG1 {
        chinese: string;
        japanese: string;
        throwable: string;
      }
      const TYPES:TYPE = {
        Warrior: "Warrior",
        Weapon: "Weapon"
      };

      const TAG:TAG1 = {
        chinese: "chinese",
        japanese: "japanese",
        throwable: "throwable"
      };

      interface Weapon {
        name: string;
      }

      interface Warrior {
        name: string;
        weapon: Weapon;
      }

      @injectable()
      class Katana implements Weapon {
        public name: string;
        public constructor() {
          this.name = "Katana";
        }
      }

      @injectable()
      class Shuriken implements Weapon {
        public name: string;
        public constructor() {
          this.name = "Shuriken";
        }
      }

      @injectable()
      class Samurai implements Warrior {
        public name: string;
        public weapon: Weapon;
        public constructor(
          @inject(TYPES.Weapon) weapon: Weapon
        ) {
          this.name = "Samurai";
          this.weapon = weapon;
        }
      }

      @injectable()
      class Ninja implements Warrior {
        public name: string;
        public weapon: Weapon;
        public constructor(
          @inject(TYPES.Weapon) @named(TAG.throwable) weapon: Weapon
        ) {
          this.name = "Ninja";
          this.weapon = weapon;
        }
      }

      const container = new Container();
      container.bind<Warrior>(TYPES.Warrior).to(Ninja).whenTargetNamed(TAG.chinese);
      container.bind<Warrior>(TYPES.Warrior).to(Samurai).whenTargetNamed(TAG.japanese);
      container.bind<Weapon>(TYPES.Weapon).to(Shuriken).whenTargetNamed(TAG.throwable);
      container.bind<Weapon>(TYPES.Weapon).to(Katana).whenTargetIsDefault();

      const ninja = container.getNamed<Warrior>(TYPES.Warrior, TAG.chinese);
      const samurai = container.getNamed<Warrior>(TYPES.Warrior, TAG.japanese);

      expect(ninja.name).to.eql("Ninja");
      expect(ninja.weapon.name).to.eql("Shuriken");
      expect(samurai.name).to.eql("Samurai");
      expect(samurai.weapon.name).to.eql("Katana");

    });

    _it("Should_be_able_to_select_a_default_to_avoid_ambiguous_binding_exceptions", () => {
      interface TYPE{
        Weapon: string;
      }
      interface  TAG1 {
        throwable: string;
      }
      const TYPES:TYPE = {
        Weapon: "Weapon"
      };

      const TAG:TAG1 = {
        throwable: "throwable"
      };

      interface Weapon {
        name: string;
      }

      @injectable()
      class Katana implements Weapon {
        public name: string;
        public constructor() {
          this.name = "Katana";
        }
      }

      @injectable()
      class Shuriken implements Weapon {
        public name: string;
        public constructor() {
          this.name = "Shuriken";
        }
      }

      const container = new Container();
      container.bind<Weapon>(TYPES.Weapon).to(Shuriken).whenTargetNamed(TAG.throwable);
      container.bind<Weapon>(TYPES.Weapon).to(Katana).inSingletonScope().whenTargetIsDefault();

      const defaultWeapon = container.get<Weapon>(TYPES.Weapon);
      const throwableWeapon = container.getNamed<Weapon>(TYPES.Weapon, TAG.throwable);

      expect(defaultWeapon.name).eql("Katana");
      expect(throwableWeapon.name).eql("Shuriken");

    });
  })
}