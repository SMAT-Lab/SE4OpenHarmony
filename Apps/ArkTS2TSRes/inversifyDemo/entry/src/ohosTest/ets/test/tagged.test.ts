let __generate__Id: number = 0;
function generateId(): string {
    return "tagged.test_" + ++__generate__Id;
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
import { tagged } from 'inversify';
import * as ERRORS_MSGS from 'inversify/lib/constants/error_msgs';
import * as METADATA_KEY from 'inversify/lib/constants/metadata_keys';
import { interfaces } from 'inversify';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it as _it, expect } from '../utils/util';
import { taggedA } from '../tools/tools';
import * as ns from "reflect-metadata";
ns;
export default function taggedTest() {
    interface Weapon {
    }
    class TaggedWarrior {
        private _primaryWeapon: Weapon;
        private _secondaryWeapon: Weapon;
        public constructor(
        @tagged('power', 1)
        primary: Weapon, 
        @tagged('power', 2)
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
    class DoubleTaggedWarrior {
        private _primaryWeapon: Weapon;
        private _secondaryWeapon: Weapon;
        public constructor(
        @tagged('power', 1)
        @tagged('distance', 1)
        primary: Weapon, 
        @tagged('power', 2)
        @tagged('distance', 5)
        secondary: Weapon) {
            this._primaryWeapon = primary;
            this._secondaryWeapon = secondary;
        }
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
    class InvalidDecoratorUsageWarrior {
        private _primaryWeapon: Weapon;
        private _secondaryWeapon: Weapon;
        public constructor(primary: Weapon, secondary: Weapon) {
            this._primaryWeapon = primary;
            this._secondaryWeapon = secondary;
        }
        public test(a: string) { }
        public debug() {
            interface result3 {
                primaryWeapon: Weapon;
                secondaryWeapon: Weapon;
            }
            let results3: result3 = {
                primaryWeapon: this._primaryWeapon,
                secondaryWeapon: this._secondaryWeapon
            };
            return results3;
        }
    }
    describe('taggedTest', () => {
        _it('Should_generate_metadata_for_tagged_parameters', () => {
            const metadataKey = METADATA_KEY.TAGGED;
            const paramsMetadata: any = Reflect.getMetadata(metadataKey, TaggedWarrior);
            expect(paramsMetadata).to.be.an('object');
            // assert metadata for first argument
            expect(paramsMetadata['0']).to.be.instanceof(Array);
            const m1: interfaces.Metadata = paramsMetadata['0'][0];
            expect(m1.key).to.be.eql('power');
            expect(m1.value).to.be.eql(1);
            // argument at index 0 should only have one tag
            expect(paramsMetadata['0'][1]).to.eq(undefined);
            // assert metadata for second argument
            expect(paramsMetadata['1']).to.be.instanceof(Array);
            const m2: interfaces.Metadata = paramsMetadata['1'][0];
            expect(m2.key).to.be.eql('power');
            expect(m2.value).to.be.eql(2);
            // argument at index 1 should only have one tag
            expect(paramsMetadata['1'][1]).to.eq(undefined);
            // no more metadata should be available
            expect(paramsMetadata['2']).to.eq(undefined);
        });
        _it('Should_generate_metadata_for_tagged_properties', () => {
            class Warrior {
                @tagged('throwable', false)
                public weapon!: Weapon;
            }
            const metadataKey = METADATA_KEY.TAGGED_PROP;
            const metadata: any = Reflect.getMetadata(metadataKey, Warrior);
            const m1: any = metadata.weapon[0];
            expect(m1.key).to.be.eql('throwable');
            expect(m1.value).to.be.eql(false);
            expect(metadata.weapon[1]).to.eq(undefined);
        });
        _it('Should_generate_metadata_for_parameters_tagged_multiple_times', () => {
            const metadataKey = METADATA_KEY.TAGGED;
            const paramsMetadata: any = Reflect.getMetadata(metadataKey, DoubleTaggedWarrior);
            expect(paramsMetadata).to.be.an('object');
            // assert metadata for argument at index 0
            expect(paramsMetadata['0']).to.be.instanceof(Array);
            // assert argument at index 0 first tag
            const m11: interfaces.Metadata = paramsMetadata['0'][0];
            expect(m11.key).to.be.eql('distance');
            expect(m11.value).to.be.eql(1);
            // assert argument at index 0 second tag
            const m12: interfaces.Metadata = paramsMetadata['0'][1];
            expect(m12.key).to.be.eql('power');
            expect(m12.value).to.be.eql(1);
            // assert metadata for argument at index 1
            expect(paramsMetadata['1']).to.be.instanceof(Array);
            // assert argument at index 1 first tag
            const m21: interfaces.Metadata = paramsMetadata['1'][0];
            expect(m21.key).to.be.eql('distance');
            expect(m21.value).to.be.eql(5);
            // assert argument at index 1 second tag
            const m22: interfaces.Metadata = paramsMetadata['1'][1];
            expect(m22.key).to.be.eql('power');
            expect(m22.value).to.be.eql(2);
            // no more metadata (argument at index > 1)
            expect(paramsMetadata['2']).to.eq(undefined);
        });
        _it('Should_throw_when_applied_multiple_times', () => {
            const metadataKey = 'a';
            const useDecoratorMoreThanOnce = () => {
                let a = tagged(metadataKey, 1);
                let b = tagged(metadataKey, 2);
                a<any>(InvalidDecoratorUsageWarrior, undefined, 0);
                b<any>(InvalidDecoratorUsageWarrior, undefined, 0);
            };
            const msg = `${ERRORS_MSGS.DUPLICATED_METADATA} ${metadataKey}`;
            expect(useDecoratorMoreThanOnce).to.throw(msg);
        });
        _it('Should_throw_when_not_applied_to_a_constructor', () => {
            const useDecoratorOnMethodThatIsNotAConstructor = () => {
                taggedA();
            };
            const msg = ERRORS_MSGS.INVALID_DECORATOR_OPERATION;
            expect(useDecoratorOnMethodThatIsNotAConstructor).to.throw(msg);
        });
        _it('Should_be_usable_in_VanillaJS_applications', () => {
            interface Katana {
            }
            interface Shuriken {
            }
            const VanillaJSWarrior = (() => {
                let TaggedVanillaJSWarrior = (primary: Katana, secondary: Shuriken) => {
                    // ...
                };
                return TaggedVanillaJSWarrior;
            });
            decorate(tagged('power', 1), VanillaJSWarrior, 0);
            decorate(tagged('power', 2), VanillaJSWarrior, 1);
            const metadataKey = METADATA_KEY.TAGGED;
            const paramsMetadata: any = Reflect.getMetadata(metadataKey, VanillaJSWarrior);
            expect(paramsMetadata).to.be.an('object');
            // assert metadata for first argument
            expect(paramsMetadata['0']).to.be.instanceof(Array);
            const m1: interfaces.Metadata = paramsMetadata['0'][0];
            expect(m1.key).to.be.eql('power');
            expect(m1.value).to.be.eql(1);
            // argument at index 0 should only have one tag
            expect(paramsMetadata['0'][1]).to.eq(undefined);
            // assert metadata for second argument
            expect(paramsMetadata['1']).to.be.instanceof(Array);
            const m2: interfaces.Metadata = paramsMetadata['1'][0];
            expect(m2.key).to.be.eql('power');
            expect(m2.value).to.be.eql(2);
            // argument at index 1 should only have one tag
            expect(paramsMetadata['1'][1]).to.eq(undefined);
            // no more metadata should be available
            expect(paramsMetadata['2']).to.eq(undefined);
        });
    });
}
