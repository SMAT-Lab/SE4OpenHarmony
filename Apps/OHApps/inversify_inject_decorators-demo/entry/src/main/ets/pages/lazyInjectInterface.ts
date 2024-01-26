/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import getDecorators from "inversify-inject-decorators/es/index";
import { Container, injectable, tagged, named } from "inversify";
import "reflect-metadata"

export interface Result {
  msg: string
  msg2: string
}

export function LazyInjectNamedFunction(){
  let container = new Container();
  let { lazyInjectNamed } = getDecorators(container);
  let TYPES = { Weapon: "Weapon" };

  interface Weapon {
    name: string;
    durability: number;
    use(): void;
  }

  @injectable()
  class Sword implements Weapon {
    public name: string;
    public durability: number;
    public constructor() {
      this.durability = 100;
      this.name = "Sword";
    }
    public use() {
      this.durability = this.durability - 10;
    }
  }

  @injectable()
  class Shuriken implements Weapon {
    public name: string;
    public durability: number;
    public constructor() {
      this.durability = 100;
      this.name = "Shuriken";
    }
    public use() {
      this.durability = this.durability - 10;
    }
  }

  class Warrior {

    @lazyInjectNamed(TYPES.Weapon, "not-throwable")
    @named("not-throwable")
    public primaryWeapon: Weapon;

    @lazyInjectNamed(TYPES.Weapon, "throwable")
    @named("throwable")
    public secondaryWeapon: Weapon;

  }

  container.bind<Weapon>(TYPES.Weapon).to(Sword).whenTargetNamed("not-throwable");
  container.bind<Weapon>(TYPES.Weapon).to(Shuriken).whenTargetNamed("throwable");

  let warrior = new Warrior();
  console.log((warrior.primaryWeapon instanceof Sword)+""); // true
  console.log((warrior.secondaryWeapon instanceof Shuriken)+""); // true
  let sword=(warrior.primaryWeapon instanceof Sword)+"";
  let shuriken=(warrior.secondaryWeapon instanceof Shuriken)+"";
  let obj = {
    sword: sword,
    shuriken: shuriken
  }
  return obj
}

export function LazyInjectFunction() {
  let container = new Container();
  let { lazyInject } = getDecorators(container);
  let TYPES = { Weapon: "Weapon" };

  interface Weapon {
    name: string;
    durability: number;
    use(): void;
  }

  @injectable()
  class Sword implements Weapon {
    public name: string;
    public durability: number;
    public constructor() {
      this.durability = 100;
      this.name = "Sword";
    }
    public use() {
      this.durability = this.durability - 10;
    }
  }

  class Warrior {
    @lazyInject(TYPES.Weapon)
    public weapon: Weapon;
  }

  container.bind<Weapon>(TYPES.Weapon).to(Sword);

  let warrior = new Warrior();
  console.log((warrior.weapon instanceof Sword)+""); // true
  let sword=(warrior.weapon instanceof Sword)+"";
  return sword
}

export function LazyInjectTaggedFunction() {
  let container = new Container();
  let { lazyInjectTagged } = getDecorators(container);
  let TYPES = { Weapon: "Weapon" };

  interface Weapon {
    name: string;
    durability: number;
    use(): void;
  }

  @injectable()
  class Sword implements Weapon {
    public name: string;
    public durability: number;
    public constructor() {
      this.durability = 100;
      this.name = "Sword";
    }
    public use() {
      this.durability = this.durability - 10;
    }
  }

  @injectable()
  class Shuriken implements Weapon {
    public name: string;
    public durability: number;
    public constructor() {
      this.durability = 100;
      this.name = "Shuriken";
    }
    public use() {
      this.durability = this.durability - 10;
    }
  }

  class Warrior {

    @lazyInjectTagged(TYPES.Weapon, "throwable", false)
    @tagged("throwwable", false)
    public primaryWeapon: Weapon;

    @lazyInjectTagged(TYPES.Weapon, "throwable", true)
    @tagged("throwwable", true)
    public secondaryWeapon: Weapon;

  }

  container.bind<Weapon>(TYPES.Weapon).to(Sword).whenTargetTagged("throwable", false);
  container.bind<Weapon>(TYPES.Weapon).to(Shuriken).whenTargetTagged("throwable", true);

  let warrior = new Warrior();
  console.log((warrior.primaryWeapon instanceof Sword)+""); // true
  console.log((warrior.secondaryWeapon instanceof Shuriken)+""); // true
  let sword=(warrior.primaryWeapon instanceof Sword)+"";
  let shuriken=(warrior.secondaryWeapon instanceof Shuriken)+"";
  let obj = {
    sword: sword,
    shuriken: shuriken
  }
  return obj
}

export function LazyMultiInjectFunction() {
  let container = new Container();
  let { lazyMultiInject } = getDecorators(container);
  let TYPES = { Weapon: "Weapon" };

  interface Weapon {
    name: string;
    durability: number;
    use(): void;
  }

  @injectable()
  class Sword implements Weapon {
    public name: string;
    public durability: number;
    public constructor() {
      this.durability = 100;
      this.name = "Sword";
    }
    public use() {
      this.durability = this.durability - 10;
    }
  }

  @injectable()
  class Shuriken implements Weapon {
    public name: string;
    public durability: number;
    public constructor() {
      this.durability = 100;
      this.name = "Shuriken";
    }
    public use() {
      this.durability = this.durability - 10;
    }
  }

  class Warrior {

    @lazyMultiInject(TYPES.Weapon)
    public weapons: Weapon[];

  }

  container.bind<Weapon>(TYPES.Weapon).to(Sword);
  container.bind<Weapon>(TYPES.Weapon).to(Shuriken);

  let warrior = new Warrior();
  console.log((warrior.weapons[0] instanceof Sword)+""); // true
  console.log((warrior.weapons[1] instanceof Shuriken)+""); // true
  let sword=(warrior.weapons[0] instanceof Sword)+"";
  let shuriken=(warrior.weapons[1] instanceof Shuriken)+"";
  let obj = {
    sword: sword,
    shuriken: shuriken
  }
  return obj
}