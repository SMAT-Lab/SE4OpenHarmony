let __generate__Id: number = 0;
function generateId(): string {
    return "lookup.test_" + ++__generate__Id;
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it as _it, expect } from '../utils/util';
import { Binding } from 'inversify/lib/bindings/binding';
import * as ERROR_MSGS from 'inversify/lib/constants/error_msgs';
import { BindingScopeEnum } from 'inversify';
import { Lookup } from 'inversify/lib/container/lookup';
import { interfaces } from 'inversify';
import { symbolFor } from '../tools/symbol';
export default function lookupTest() {
    class ClonableValue<T> implements interfaces.Clonable<ClonableValue<T>> {
        public readonly val: T;
        public constructor(val: T) {
            this.val = val;
        }
        public clone() {
            return new ClonableValue<T>(this.val);
        }
    }
    const invalid = null as any as interfaces.ServiceIdentifier<any>;
    describe('lookupTest', () => {
        _it('Should_throw_when_invoking_get_remove_or_hasKey_with_a_null_key', () => {
            const lookup: any = new Lookup<any>();
            expect(() => {
                lookup.get(invalid);
            }).to.throw(ERROR_MSGS.NULL_ARGUMENT);
            expect(() => {
                lookup.remove(invalid);
            }).to.throw(ERROR_MSGS.NULL_ARGUMENT);
            expect(() => {
                lookup.hasKey(invalid);
            }).to.throw(ERROR_MSGS.NULL_ARGUMENT);
        });
        _it('Should_throw_when_attempting_to_add_a_null_key', () => {
            const lookup: any = new Lookup<any>();
            expect(() => {
                lookup.add(invalid, new ClonableValue<number>(1));
            }).to.throw(ERROR_MSGS.NULL_ARGUMENT);
        });
        _it('Should_throw_when_attempting_to_add_a_null_value', () => {
            const lookup: any = new Lookup<any>();
            expect(() => {
                lookup.add('TEST_KEY', null);
            }).to.throw(ERROR_MSGS.NULL_ARGUMENT);
        });
        _it('Should_be_able_to_link_multiple_values_to_a_string_key', () => {
            const lookup: any = new Lookup<any>();
            const key = 'TEST_KEY';
            lookup.add(key, new ClonableValue<number>(1));
            lookup.add(key, new ClonableValue<number>(2));
            const result: any = lookup.get(key);
            expect(result.length).to.eql(2);
        });
        _it('Should_be_able_to_link_multiple_values_a_symbol_key', () => {
            const lookup: any = new Lookup<any>();
            const key = symbolFor('TEST_KEY');
            lookup.add(key, new ClonableValue<number>(1));
            lookup.add(key, new ClonableValue<number>(2));
            const result: any = lookup.get(key);
            expect(result.length).to.eql(2);
        });
        _it('Should_throws_when_key_not_found', () => {
            const lookup: any = new Lookup<any>();
            expect(() => {
                lookup.get('THIS_KEY_IS_NOT_AVAILABLE');
            }).to.throw(ERROR_MSGS.KEY_NOT_FOUND);
            expect(() => {
                lookup.remove('THIS_KEY_IS_NOT_AVAILABLE');
            }).to.throw(ERROR_MSGS.KEY_NOT_FOUND);
        });
        _it('Should_be_clonable', () => {
            const lookup: any = new Lookup<interfaces.Clonable<any>>();
            const key1 = symbolFor('TEST_KEY');
            class Warrior {
                public kind: string;
                public constructor(kind: string) {
                    this.kind = kind;
                }
                public clone() {
                    return new Warrior(this.kind);
                }
            }
            lookup.add(key1, new Warrior('ninja'));
            lookup.add(key1, new Warrior('samurai'));
            const copy: any = lookup.clone();
            expect(copy.hasKey(key1)).to.eql(true);
            lookup.remove(key1);
            expect(copy.hasKey(key1)).to.eql(true);
        });
        _it('Should_use_use_the_original_non_clonable_entry_if_it_is_not_clonable', () => {
            const lookup: any = new Lookup<any>();
            const key1 = symbolFor('TEST_KEY');
            class Warrior {
                public kind: string;
                public constructor(kind: string) {
                    this.kind = kind;
                }
            }
            const warrior = new Warrior('ninja');
            lookup.add(key1, warrior);
            const copy: any = lookup.clone();
            expect(copy.get(key1)[0] === warrior).to.eql(true);
        });
        _it('Should_be_able_to_remove_a_binding_by_a_condition', () => {
            const moduleId1 = 1;
            const moduleId2 = 2;
            const warriorId = 'Warrior';
            const weaponId = 'Weapon';
            const getLookup = () => {
                interface Warrior {
                }
                class Ninja implements Warrior {
                }
                const ninjaBinding: any = new Binding<any>(warriorId, BindingScopeEnum.Transient);
                ninjaBinding.implementationType = new Ninja();
                ninjaBinding.moduleId = moduleId1;
                class Samurai implements Warrior {
                }
                const samuraiBinding: any = new Binding<any>(warriorId, BindingScopeEnum.Transient);
                samuraiBinding.implementationType = new Samurai();
                samuraiBinding.moduleId = moduleId2;
                interface Weapon {
                }
                class Shuriken implements Weapon {
                }
                const shurikenBinding: any = new Binding<any>(weaponId, BindingScopeEnum.Transient);
                shurikenBinding.implementationType = new Shuriken();
                shurikenBinding.moduleId = moduleId1;
                class Katana implements Weapon {
                }
                const katanaBinding: any = new Binding<any>(weaponId, BindingScopeEnum.Transient);
                katanaBinding.implementationType = new Katana();
                katanaBinding.moduleId = moduleId2;
                const lookup: Lookup<Binding<any>> = new Lookup<Binding<any>>();
                lookup.add(warriorId, ninjaBinding);
                lookup.add(warriorId, samuraiBinding);
                lookup.add(weaponId, shurikenBinding);
                lookup.add(weaponId, katanaBinding);
                return lookup;
            };
            const removeByModule = (expected: any) => (item: interfaces.Binding<any>): boolean => item.moduleId === expected;
            const lookup1: any = getLookup();
            expect(lookup1.hasKey(warriorId)).to.eql(true);
            expect(lookup1.hasKey(weaponId)).to.eql(true);
            expect(lookup1.get(warriorId).length).to.eql(2);
            expect(lookup1.get(weaponId).length).to.eql(2);
            const removeByModule1 = removeByModule(moduleId1);
            lookup1.removeByCondition(removeByModule1);
            expect(lookup1.hasKey(warriorId)).to.eql(true);
            expect(lookup1.hasKey(weaponId)).to.eql(true);
            expect(lookup1.get(warriorId).length).to.eql(1);
            expect(lookup1.get(weaponId).length).to.eql(1);
            const lookup2: any = getLookup();
            expect(lookup2.hasKey(warriorId)).to.eql(true);
            expect(lookup2.hasKey(weaponId)).to.eql(true);
            expect(lookup2.get(warriorId).length).to.eql(2);
            expect(lookup2.get(weaponId).length).to.eql(2);
            const removeByModule2 = removeByModule(moduleId2);
            lookup2.removeByCondition(removeByModule1);
            lookup2.removeByCondition(removeByModule2);
            expect(lookup2.hasKey(warriorId)).to.eql(false);
            expect(lookup2.hasKey(weaponId)).to.eql(false);
        });
        _it('should_be_able_to_remove_the_intersection_with_another_lookup', () => {
            const lookup: Lookup<any> = new Lookup<any>();
            const serviceIdentifier1 = 'service-identifier-1';
            const serviceIdentifier2 = 'service-identifier-2';
            const serviceIdentifier1Values = [11, 12, 13, 14];
            const serviceIdentifier2Values = [21, 22, 23, 24];
            for (const value of serviceIdentifier1Values) {
                lookup.add(serviceIdentifier1, value);
            }
            for (const value of serviceIdentifier2Values) {
                lookup.add(serviceIdentifier2, value);
            }
            const lookupToIntersect: Lookup<any> = new Lookup<any>();
            const lookupToIntersectServiceIdentifier2Values = [23, 24, 25, 26];
            const serviceIdentifier3 = 'service-identifier-3';
            const lookupToIntersectServiceIdentifier3Values = [31, 32, 33, 34];
            for (const value of lookupToIntersectServiceIdentifier2Values) {
                lookupToIntersect.add(serviceIdentifier2, value);
            }
            for (const value of lookupToIntersectServiceIdentifier3Values) {
                lookupToIntersect.add(serviceIdentifier3, value);
            }
            lookup.removeIntersection(lookupToIntersect);
            expect(lookup.getMap()).to.deep.equal(new Map([
                [serviceIdentifier1, [...serviceIdentifier1Values]],
                [serviceIdentifier2, [21, 22]],
            ]));
        });
    });
}
