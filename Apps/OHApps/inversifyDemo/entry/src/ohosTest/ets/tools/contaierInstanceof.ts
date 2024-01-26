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
import { BindingScopeEnum, inject, injectable ,
  Container} from 'inversify';
ns;
export function contaierInstance(test){
  interface Warrior {
  }

  @injectable()
  class Ninja implements Warrior { }

  @injectable()
  class Samurai implements Warrior { }

  const container = new Container();
  container.bind<Warrior>(Ninja).to(Ninja);
  container.bind<Warrior>(Samurai).to(Samurai);

    if(test == "Samurai"){
      let aa =  (container.get(Samurai)) instanceof Samurai
      return aa
    }
    if(test == "Ninja"){
      let aa =  (container.get(Ninja)) instanceof Ninja
      return aa
    }
  return false
}


export function services( ){
  const weaponIdentifier = 'Weapon';

  @injectable()
  class Katana { }

  const container = new Container();
  container.bind(weaponIdentifier).to(Katana);

  const childContainer = new Container();
  childContainer.parent = container;

  const secondChildContainer = new Container();
  secondChildContainer.parent = childContainer;

  let boo=(secondChildContainer.get(weaponIdentifier)) instanceof  Katana
  return {boo:boo}
}

export function prioritize( ){
  const weaponIdentifier = 'Weapon';

  @injectable()
  class Katana { }

  @injectable()
  class DivineRapier { }

  const container = new Container();
  container.bind(weaponIdentifier).to(Katana);

  const childContainer = new Container();
  childContainer.parent = container;
  const secondChildContainer = new Container();
  secondChildContainer.parent = childContainer;
  secondChildContainer.bind(weaponIdentifier).to(DivineRapier);

  let boo=(secondChildContainer.get(weaponIdentifier)) instanceof  DivineRapier
  return {boo:boo}
}


export function configure( ){

  @injectable()
  class Katana { }

  @injectable()
  class Shuriken { }

  @injectable()
  @Reflect.metadata("design:paramtypes",[Katana])
  class Ninja {
    public constructor(public weapon: Katana) { }
  }

  class Samurai { }

  const container1 = new Container({ autoBindInjectable: true });
  const katana1 = container1.get(Katana);
  const ninja1 = container1.get(Ninja);
  let boo=katana1 instanceof Katana
  let boo1=ninja1 instanceof Ninja
  let boo2= ninja1.weapon instanceof Katana

  const container2 = new Container({ defaultScope: BindingScopeEnum.Singleton, autoBindInjectable: true });
  const katana2 = container2.get(Katana);
  const ninja2 = container2.get(Ninja);
  let boo3=katana2 instanceof Katana
  let boo4= ninja2 instanceof Ninja
  let boo5=ninja2.weapon instanceof Katana

  const container3 = new Container({ autoBindInjectable: true });
  container3.bind(Katana).toSelf().inSingletonScope();
  const katana3 = container3.get(Katana);
  const ninja3 = container3.get(Ninja);
  let boo6=katana3 instanceof Katana
  let boo7=ninja3 instanceof Ninja
  let boo8=ninja3.weapon instanceof Katana

  const container4 = new Container({ autoBindInjectable: true });
  container4.bind(Katana).to(Shuriken);
  const katana4 = container4.get(Katana);
  const ninja4 = container4.get(Ninja);
  let boo9=katana4 instanceof Shuriken
  let boo10=ninja4 instanceof Ninja
  let boo11=ninja4.weapon instanceof Shuriken

  return {
    boo:boo,
    boo1:boo1,
    boo2:boo2,
    boo3:boo3,
    boo4:boo4,
    boo5:boo5 ,
    boo6:boo6,
    boo7:boo7,
    boo8:boo8,
    boo9:boo9,
    boo10:boo10,
    boo11:boo11,
    Katana:Katana,
    Shuriken:Shuriken,
    Ninja:Ninja
  }
}
export function arrayConversion1(a) {

  return [a];

}


export function weaponProperty1() {

  interface Weapon { }
  @injectable()
  class Shuriken implements Weapon { }
  @injectable()
  class Ninja {
    @inject('Weapon')
    weaponProperty: Weapon
  }
  const container = new Container();
  container.bind('Weapon').to(Shuriken);
  const myNinja = container.resolve(Ninja);
  const weapon = myNinja.weaponProperty;
  let boo=weapon instanceof Shuriken
  return {boo:boo}
}

export function possible() {

  interface Weapon { }
  @injectable()
  class Shuriken implements Weapon { }
  @injectable()
  class Ninja {
    @inject('Weapon')
    throwableWeapon: Weapon
  }
  const container = new Container();
  container.bind('Weapon').to(Shuriken).when(request => {
    return request.target.name.equals('throwableWeapon');
  })
  const myNinja = container.resolve(Ninja);
  const weapon = myNinja.throwableWeapon;
  let boo= weapon instanceof Shuriken
  return {boo:boo}
}

