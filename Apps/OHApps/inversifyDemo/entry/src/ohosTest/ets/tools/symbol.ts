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
import { Container, inject, injectable } from 'inversify';

export function throwableWeapon() {
  const throwableWeapon = Symbol('throwable');
  interface Weapon { }
  @injectable()
  class Shuriken implements Weapon { }
  @injectable()
  class Ninja {
    @inject('Weapon')
    [throwableWeapon]: Weapon
  }
  const container = new Container();
  container.bind('Weapon').to(Shuriken).when(request => {
    return request.target.name.equals('throwable');
  })
  const myNinja = container.resolve(Ninja);
  const weapon = myNinja[throwableWeapon];
  return weapon
}


export function symbolFor(str) {
  return Symbol.for(str)
}

export function symbol() {
  return Symbol()
}

export function symbolStr(str) {
  return Symbol(str)
}