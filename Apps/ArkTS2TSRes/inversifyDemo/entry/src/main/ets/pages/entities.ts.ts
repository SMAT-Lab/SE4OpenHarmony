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
import { injectable, inject } from "inversify";
import { Weapon, ThrowableWeapon, Warrior } from "./interfaces";
import { TYPES } from "./types";
import * as ns from "reflect-metadata";
ns;
@injectable()
class Katana implements Weapon {
    public hit() {
        return "cut!";
    }
}
@injectable()
class Shuriken implements ThrowableWeapon {
    public throw() {
        return "hit!";
    }
}
@injectable()
class Ninja implements Warrior {
    private _katana: Weapon;
    private _shuriken: ThrowableWeapon;
    public constructor(
    @inject(TYPES.Weapon)
    katana: Weapon, 
    @inject(TYPES.ThrowableWeapon)
    shuriken: ThrowableWeapon) {
        this._katana = katana;
        this._shuriken = shuriken;
    }
    public fight() { return this._katana.hit(); }
    public sneak() { return this._shuriken.throw(); }
}
export { Ninja, Katana, Shuriken };
