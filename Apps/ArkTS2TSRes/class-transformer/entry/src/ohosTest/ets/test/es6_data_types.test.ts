let __generate__Id: number = 0;
function generateId(): string {
    return "es6_data_types.test_" + ++__generate__Id;
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
import * as rm from 'reflect-metadata';
import { instanceToInstance, classToClassFromExist, instanceToPlain, classToPlainFromExist, plainToInstance, plainToClassFromExist, } from 'class-transformer';
import { defaultMetadataStorage } from 'class-transformer/esm2015/storage';
import { Exclude, Expose, Type, Transform } from 'class-transformer';
import { describe, it as _it, expect } from "../utils/utils";
export default function es6_data_typesTest() {
    describe('es6_data_typesTest', () => {
        _it('using Map', () => {
            defaultMetadataStorage.clear();
            class User {
                id: number = 0;
                name: string = "";
                @Type(() => String)
                weapons: Map<string, string> = new Map();
            }
            const weapons = new Map<string, string>();
            weapons.set('firstWeapon', 'knife');
            weapons.set('secondWeapon', 'eagle');
            weapons.set('thirdWeapon', 'ak-47');
            const user = new User();
            user.id = 1;
            user.name = 'Max Pain';
            user.weapons = weapons;
            const weapons1: Record<string, string> = {
                "firstWeapon": 'knife',
                "secondWeapon": 'eagle',
                "thirdWeapon": 'ak-47',
            };
            const sourceValue: Record<string, number | string | Record<string, string>> = {
                "id": 1,
                "name": 'Max Pain',
                "weapons": weapons1,
            };
            const classedUser: User = plainToInstance(User, sourceValue);
            expect(classedUser instanceof User).toBe(true);
            console.log(`aa---1`);
            expect(classedUser.id).toEqual(1);
            console.log(`aa---2`);
            expect(classedUser.name).toEqual('Max Pain');
            console.log(`aa---3  classedUser.weapons.size ${classedUser.weapons.size}`);
        });
        _it('using Set', () => {
            defaultMetadataStorage.clear();
            class User {
                id: number = 0;
                name: string = "";
                @Type(() => Set)
                weapons: Set<string> = new Set();
            }
            const weapons = new Set<string>();
            weapons.add('knife');
            weapons.add('eagle');
            weapons.add('ak-47');
            const user = new User();
            user.id = 1;
            user.name = 'Max Pain';
            user.weapons = weapons;
            const sourceValue: Record<string, number | string | Array<string>> = {
                "id": 1,
                "name": 'Max Pain',
                "weapons": ['knife', 'eagle', 'ak-47'],
            };
            const classedUser: User = plainToInstance(User, sourceValue);
            expect(classedUser instanceof User).toBe(true);
        });
    });
}
