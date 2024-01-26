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
import { Container, inject } from 'inversify';
import { buildProviderModule } from "inversify-binding-decorators/es/index";
import { provide } from "inversify-binding-decorators/es/index";
import "reflect-metadata";
interface WeaponWarrior {
    katana: WeaponWeapon;
    shuriken: WeaponThrowableWeapon;
    fight(): string;
    sneak(): string;
}
interface WeaponWeapon {
    hit(): string;
}
interface WeaponThrowableWeapon {
    throw(): string;
}
let WeaponTYPE = {
    WeaponThrowableWeapon: "WeaponThrowableWeapon",
    WeaponWarrior: "WeaponWarrior",
    WeaponWeapon: "WeaponWeapon"
};
@provide(WeaponTYPE.WeaponWeapon)
export class WeaponKatana implements WeaponWeapon {
    public hit() {
        return "cut!";
    }
}
@provide(WeaponTYPE.WeaponThrowableWeapon)
export class WeaponShuriken implements WeaponThrowableWeapon {
    public throw() {
        return "hit!";
    }
}
@provide(WeaponTYPE.WeaponWarrior)
export class WeaponNinja implements WeaponWarrior {
    public katana: WeaponWeapon;
    public shuriken: WeaponThrowableWeapon;
    public constructor(
    @inject(WeaponTYPE.WeaponWeapon)
    katana: WeaponWeapon, 
    @inject(WeaponTYPE.WeaponThrowableWeapon)
    shuriken: WeaponThrowableWeapon) {
        this.katana = katana;
        this.shuriken = shuriken;
    }
    public fight() {
        return this.katana.hit();
    }
    public sneak() {
        return this.shuriken.throw();
    }
}
export function getWeaponNinja() {
    let container = new Container();
    container.load(buildProviderModule());
    let ninja = container.get<WeaponWarrior>(WeaponTYPE.WeaponWarrior);
    return ninja;
}
