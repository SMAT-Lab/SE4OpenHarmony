let __generate__Id: number = 0;
function generateId(): string {
    return "Index.test_" + ++__generate__Id;
}
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { Container } from 'inversify';
import { buildProviderModule } from "inversify-binding-decorators/es/index";
import { Warrior, TYPE, Katana1, Shuriken1, Ninja1, Warrior1, TYPE1, Katana2, Shuriken2, Ninja2, Katana3, Shuriken3, Ninja3, TYPE2, Warrior2, Katana4, Shuriken4, Ninja4, Warrior3, TYPE3, KatanaDojo, WakizashiDojo, Ninja5, Katana5, Wakizashi, DeleteMetadata } from './interface';
import { WeaponKatana, getWeaponNinja, WeaponShuriken, WeaponNinja } from './Weapon_interface';
export default function indexTest() {
    describe("inversify_binding_decorators", () => {
        beforeEach(() => {
            // Clean our metadata before each test
            // DeleteMetadata()
        });
        it("Should_be_able_to_declare_bindings_using_string_literals_as_identifiers", 0, () => {
            let ninja = getWeaponNinja();
            expect(ninja instanceof WeaponNinja).assertEqual(true);
            expect(ninja.katana instanceof WeaponKatana).assertEqual(true);
            expect(ninja.shuriken instanceof WeaponShuriken).assertEqual(true);
            expect(ninja.fight()).assertEqual("cut!");
            expect(ninja.sneak()).assertEqual("hit!");
        });
        it("Should_be_able_to_declare_bindings_using_classes_as_identifiers", 0, () => {
            try {
                let container = new Container();
                container.load(buildProviderModule());
                let ninja = container.get<Ninja1>(Ninja1);
                expect(ninja instanceof Ninja1).assertEqual(true);
                expect(ninja.katana instanceof Katana1).assertEqual(true);
                expect(ninja.shuriken instanceof Shuriken1).assertEqual(true);
                expect(ninja.fight()).assertEqual("cut!");
                expect(ninja.sneak()).assertEqual("hit!");
            }
            catch (e) {
            }
        });
        it("Should_be_able_to_declare_bindings_using_symbols_as_identifiers", 0, () => {
            try {
                let container = new Container();
                container.load(buildProviderModule());
                let ninja = container.get<Warrior1>(TYPE1.Warrior1);
                expect(ninja instanceof Ninja2).assertEqual(true);
                expect(ninja.katana instanceof Katana2).assertEqual(true);
                expect(ninja.shuriken instanceof Shuriken2).assertEqual(true);
                expect(ninja.fight()).assertEqual("cut!");
                expect(ninja.sneak()).assertEqual("hit!");
            }
            catch (e) {
            }
        });
        it("Should_be_able_to_declare_the_scope_of_a_binding", 0, () => {
            try {
                let container = new Container();
                container.load(buildProviderModule());
                let ninja = container.get<Warrior>(TYPE.Warrior);
                expect(ninja instanceof Ninja3).assertEqual(true);
                expect(ninja.katana instanceof Katana3).assertEqual(true);
                expect(ninja.shuriken instanceof Shuriken3).assertEqual(true);
                expect(ninja.fight().indexOf("cut!")).assertEqual(0);
                expect(ninja.sneak().indexOf("hit!")).assertEqual(0);
            }
            catch (e) {
            }
        });
        it("Should_be_able_to_declare_contextual_constraints", 0, () => {
            try {
                let container = new Container();
                container.load(buildProviderModule());
                let ninja = container.get<Warrior2>(TYPE2.Warrior2);
                expect(ninja instanceof Ninja4).assertEqual(true);
                expect(ninja.primary instanceof Katana4).assertEqual(true);
                expect(ninja.secondary instanceof Shuriken4).assertEqual(true);
                expect(ninja.fight()).assertEqual("Hit_by_Katana!".replace('_', ' '));
                expect(ninja.sneak()).assertEqual("Hit_by_Shuriken!".replace('_', ' '));
            }
            catch (e) {
            }
        });
        it("Should_be_able_to_both_declare_scope_and_declare_contextual_constraints", 0, () => {
            let container = new Container();
            container.load(buildProviderModule());
            let ninjaDefault = container.get<Warrior3>(TYPE3.Warrior3);
            let ninjaShort = container.getNamed<Warrior3>(TYPE3.Warrior3, "shortsword");
            let katanaDojo = container.get<KatanaDojo>(KatanaDojo);
            let wakizashiDojo = container.get<KatanaDojo>(WakizashiDojo);
            try {
                expect(ninjaDefault instanceof Ninja5).assertEqual(true);
                expect(ninjaDefault.weaponLength()).assertEqual("long");
                expect(ninjaDefault.weapon instanceof Katana5).assertEqual(true);
                expect(ninjaShort.weaponLength()).assertEqual("short");
                expect(ninjaShort.weapon instanceof Wakizashi).assertEqual(true);
                expect(katanaDojo.warrior.weaponLength()).assertEqual("long");
                expect(wakizashiDojo.warrior.weaponLength()).assertEqual("short");
                expect(wakizashiDojo.warrior.fight()).assertEqual(ninjaShort.fight());
                expect(wakizashiDojo.warrior.weapon === ninjaShort.weapon).assertEqual(true);
            }
            catch (e) {
            }
        });
    });
}
