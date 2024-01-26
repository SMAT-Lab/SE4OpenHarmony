let __generate__Id: number = 0;
function generateId(): string {
    return "named.test_" + ++__generate__Id;
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
import { decorate } from 'inversify';
import { named } from 'inversify';
import * as ERROR_MSGS from 'inversify/lib/constants/error_msgs';
import * as METADATA_KEY from 'inversify/lib/constants/metadata_keys';
import { interfaces } from 'inversify';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it as _it, expect } from '../utils/util';
import multiInjectTest from './multiInject.test';
import { namedA } from '../tools/tools';
export default function namedTest() {
    interface Weapon {
    }
    class NamedWarrior {
        private _primaryWeapon: Weapon;
        private _secondaryWeapon: Weapon;
        public constructor(
        @named('more_powerful')
        primary: Weapon, 
        @named('less_powerful')
        secondary: Weapon) {
            this._primaryWeapon = primary;
            this._secondaryWeapon = secondary;
        }
        public debug() {
            interface result1 {
                primaryWeapon: Weapon;
                secondaryWeapon: Weapon;
            }
            let results1: result1 = {
                primaryWeapon: this._primaryWeapon,
                secondaryWeapon: this._secondaryWeapon
            };
            return results1;
        }
    }
    class InvalidDecoratorUsageWarrior {
        private _primaryWeapon: Weapon;
        private _secondaryWeapon: Weapon;
        public constructor(primary: Weapon, secondary: Weapon) {
            this._primaryWeapon = primary;
            this._secondaryWeapon = secondary;
        }
        public test(a: string) { }
        public debug() {
            interface result2 {
                primaryWeapon: Weapon;
                secondaryWeapon: Weapon;
            }
            let results2: result2 = {
                primaryWeapon: this._primaryWeapon,
                secondaryWeapon: this._secondaryWeapon
            };
            return results2;
        }
    }
    describe('namedTest', () => {
        _it('Should_generate_metadata_for_named_parameters', () => {
            const metadataKey = METADATA_KEY.TAGGED;
            const paramsMetadata: any = Reflect.getMetadata(metadataKey, NamedWarrior);
            expect(paramsMetadata).to.be.an('object');
            // assert metadata for first argument
            expect(paramsMetadata['0']).to.be.instanceof(Array);
            const m1: interfaces.Metadata = paramsMetadata['0'][0];
            expect(m1.key).to.be.eql(METADATA_KEY.NAMED_TAG);
            expect(m1.value).to.be.eql('more_powerful');
            expect(paramsMetadata['0'][1]).to.eq(undefined);
            // assert metadata for second argument
            expect(paramsMetadata['1']).to.be.instanceof(Array);
            const m2: interfaces.Metadata = paramsMetadata['1'][0];
            expect(m2.key).to.be.eql(METADATA_KEY.NAMED_TAG);
            expect(m2.value).to.be.eql('less_powerful');
            expect(paramsMetadata['1'][1]).to.eq(undefined);
            // no more metadata should be available
            expect(paramsMetadata['2']).to.eq(undefined);
        });
        _it('Should_generate_metadata_for_named_properties', () => {
            class Warrior {
                @named('throwable')
                public weapon!: Weapon;
            }
            const metadataKey = METADATA_KEY.TAGGED_PROP;
            const metadata: any = Reflect.getMetadata(metadataKey, Warrior);
            const m1: any = metadata.weapon[0];
            expect(m1.key).to.be.eql(METADATA_KEY.NAMED_TAG);
            expect(m1.value).to.be.eql('throwable');
            expect(metadata.weapon[1]).to.eq(undefined);
        });
        _it('Should_throw_when_applied_multiple_times', () => {
            const useDecoratorMoreThanOnce = () => {
                let a = named('a');
                let b = named('b');
                a<any>(InvalidDecoratorUsageWarrior, undefined, 0);
                b<any>(InvalidDecoratorUsageWarrior, undefined, 0);
            };
            const msg = `${ERROR_MSGS.DUPLICATED_METADATA} ${METADATA_KEY.NAMED_TAG}`;
            expect(useDecoratorMoreThanOnce).to.throw(msg);
        });
        _it('Should_throw_when_not_applied_to_a_constructor', () => {
            const useDecoratorOnMethodThatIsNotAConstructor = () => {
                namedA();
            };
            const msg = `${ERROR_MSGS.INVALID_DECORATOR_OPERATION}`;
            expect(useDecoratorOnMethodThatIsNotAConstructor).to.throw(msg);
        });
        _it('Should_be_usable_in_VanillaJS_applications', () => {
            interface Katana {
            }
            interface Shurien {
            }
            const VanillaJSWarrior = (() => {
                let NamedVanillaJSWarrior = (primary: Katana, secondary: Shurien) => {
                    // ...
                };
                return NamedVanillaJSWarrior;
            })();
            decorate(named('more_powerful'), VanillaJSWarrior, 0);
            decorate(named('less_powerful'), VanillaJSWarrior, 1);
            const metadataKey = METADATA_KEY.TAGGED;
            const paramsMetadata: any = Reflect.getMetadata(metadataKey, VanillaJSWarrior);
            expect(paramsMetadata).to.be.an('object');
            // assert metadata for first argument
            expect(paramsMetadata['0']).to.be.instanceof(Array);
            const m1: interfaces.Metadata = paramsMetadata['0'][0];
            expect(m1.key).to.be.eql(METADATA_KEY.NAMED_TAG);
            expect(m1.value).to.be.eql('more_powerful');
            expect(paramsMetadata['0'][1]).to.eq(undefined);
            // assert metadata for second argument
            expect(paramsMetadata['1']).to.be.instanceof(Array);
            const m2: interfaces.Metadata = paramsMetadata['1'][0];
            expect(m2.key).to.be.eql(METADATA_KEY.NAMED_TAG);
            expect(m2.value).to.be.eql('less_powerful');
            expect(paramsMetadata['1'][1]).eq(undefined);
            // no more metadata should be available
            expect(paramsMetadata['2']).to.eq(undefined);
        });
    });
}
