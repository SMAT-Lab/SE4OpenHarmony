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

import {inject,tagged } from 'inversify';
import { provide } from 'inversify-binding-decorators/es/index';
import { fluentProvide } from 'inversify-binding-decorators/es/index';
import "reflect-metadata";

export interface Warrior{
  primary:Weapon;
  secondary:Weapon;
  fight():string;
  sneak():string;
}

export interface Weapon{
 hit():string;
}

export interface ThrowableWeapon{
 throw():string;
}

export interface WeaponProvide{
  hit():string;
}

export interface WarriorProvide{
   katana:Weapon;
   shuriken:ThrowableWeapon;
   fight():string;
   sneak():string;
}

export let provideThrowable= (serviceIdentifier:string,isThrowable:boolean) => {
  return fluentProvide(serviceIdentifier).whenTargetTagged("throwable",isThrowable).done();
};

export let TYPE = {
  ThrowableWeapon:"ThrowableWeapon",
  Warrior:"Warrior",
  Weapon:"Weapon",
  WarriorProvide:"WarriorProvide",
  WeaponProvide:"WeaponProvide"
}

@provideThrowable(TYPE.Weapon,false)
export class Katana implements Weapon{
  public hit(){
    return "Hit by Katana!";
  }
}

@provideThrowable(TYPE.Weapon,true)
export class Shuriken implements Weapon{
  public hit(){
    return "Hit by Shuriken!";
  }
}

@fluentProvide(TYPE.Warrior).done()
export class Ninja implements Warrior{
  public primary:Weapon;
  public secondary:Weapon;
  public constructor(@inject(TYPE.Weapon) @tagged("throwable",false) primary:Weapon,
                     @inject(TYPE.Weapon) @tagged("throwable",true) secondary:Weapon
  ){
    this.primary=primary;
    this.secondary=secondary;
  }

  public fight(){
    return this.primary.hit();
  }

  public sneak(){
    return this.secondary.hit();
  }
}

@provide(TYPE.WeaponProvide)
export class KatanaProvide implements WeaponProvide{
  public hit(){
    return "cut!";
  }
}

@provide(TYPE.ThrowableWeapon)
export class ShurikenProvide implements ThrowableWeapon{
  public throw(){
    return "hit!";
  }
}

@provide(TYPE.WarriorProvide)
export class NinjaProvide implements WarriorProvide {
  public katana:Weapon;
  public shuriken:ThrowableWeapon;
  public constructor(@inject(TYPE.WeaponProvide) katana:Weapon,
                     @inject(TYPE.ThrowableWeapon) shuriken: ThrowableWeapon
  ){
    this.katana=katana;
    this.shuriken=shuriken;
  }

  public fight(){
    return this.katana.hit();
  }

  public sneak(){
    return this.shuriken.throw();
  }
}

