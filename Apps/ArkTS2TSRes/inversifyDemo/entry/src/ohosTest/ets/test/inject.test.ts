let __generate__Id: number = 0;
function generateId(): string {
    return "inject.test_" + ++__generate__Id;
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
import { decorate } from 'inversify';
import { inject } from 'inversify';
import { LazyServiceIdentifer, ServiceIdentifierOrFunc } from 'inversify/lib/annotation/lazy_service_identifier';
import * as ERROR_MSGS from 'inversify/lib/constants/error_msgs';
import * as METADATA_KEY from 'inversify/lib/constants/metadata_keys';
import { interfaces } from 'inversify';
import { multiInject } from 'inversify';
import * as ns from "reflect-metadata";
import { useDecoratorMoreThanOnce, useDecoratorOnMethodThatIsNotAConstructor, useDecoratorW_ithUndefined } from '../tools/declareFlies';
ns;
declare function __decorate(decorators: ClassDecorator[], target: NewableFunction, key?: any, descriptor?: PropertyDescriptor | undefined): void;
declare function __param(paramIndex: number, decorator: ParameterDecorator): ClassDecorator;
export default function injectTest() {
    interface Katana1 {
    }
    interface Shuriken1 {
    }
    interface Sword1 {
    }
    class Katana implements Katana1 {
    }
    class Shuriken implements Shuriken1 {
    }
    class Sword implements Sword1 {
    }
    const lazySwordId: any = new LazyServiceIdentifer<any>(() => 'Sword');
    class DecoratedWarrior {
        private _primaryWeapon: Katana;
        private _secondaryWeapon: Shuriken;
        private _tertiaryWeapon: Sword | Shuriken;
        public constructor(
        @inject('Katana')
        primary: Katana, 
        @inject('Shuriken')
        secondary: Shuriken, 
        @inject(lazySwordId)
        tertiary: Shuriken) {
            this._primaryWeapon = primary;
            this._secondaryWeapon = secondary;
            this._tertiaryWeapon = tertiary;
        }
        public debug() {
            interface result1 {
                primaryWeapon: Katana;
                secondaryWeapon: Shuriken;
                tertiaryWeapon: Sword | Shuriken;
            }
            let results1: result1 = {
                primaryWeapon: this._primaryWeapon,
                secondaryWeapon: this._secondaryWeapon,
                tertiaryWeapon: this._tertiaryWeapon
            };
            return results1;
        }
    }
    class InvalidDecoratorUsageWarrior {
        private _primaryWeapon: Katana;
        private _secondaryWeapon: Shuriken;
        public constructor(primary: Katana, secondary: Shuriken) {
            this._primaryWeapon = primary;
            this._secondaryWeapon = secondary;
        }
        public test(a: string) { }
        public debug() {
            interface result2 {
                primaryWeapon: Katana;
                secondaryWeapon: Shuriken;
            }
            let results2: result2 = {
                primaryWeapon: this._primaryWeapon,
                secondaryWeapon: this._secondaryWeapon
            };
            return results2;
        }
    }
    describe('injectTest', () => {
        _it('Should_generate_metadata_for_named_parameters', () => {
            const metadataKey = METADATA_KEY.TAGGED;
            const paramsMetadata: any = Reflect.getMetadata(metadataKey, DecoratedWarrior);
            expect(paramsMetadata).to.be.an('object');
            // assert metadata for first argument
            expect(paramsMetadata['0']).to.be.instanceof(Array);
            const m1: interfaces.Metadata = paramsMetadata['0'][0];
            expect(m1.key).to.be.eql(METADATA_KEY.INJECT_TAG);
            expect(m1.value).to.be.eql('Katana');
            expect(paramsMetadata['0'][1]).to.eq(undefined);
            // assert metadata for second argument
            expect(paramsMetadata['1']).to.be.instanceof(Array);
            const m2: interfaces.Metadata = paramsMetadata['1'][0];
            expect(m2.key).to.be.eql(METADATA_KEY.INJECT_TAG);
            expect(m2.value).to.be.eql('Shuriken');
            expect(paramsMetadata['1'][1]).to.eq(undefined);
            // assert metadata for second argument
            expect(paramsMetadata['2']).to.be.instanceof(Array);
            const m3: interfaces.Metadata = paramsMetadata['2'][0];
            expect(m3.key).to.be.eql(METADATA_KEY.INJECT_TAG);
            expect(m3.value).to.be.eql(lazySwordId);
            expect(paramsMetadata['2'][1]).to.eq(undefined);
            // no more metadata should be available
            expect(paramsMetadata['3']).to.eq(undefined);
        });
        _it('Should_throw_when_applied_multiple_times', () => {
            //   useDecoratorMoreThanOnce()
            //
            // const msg = `${ERROR_MSGS.DUPLICATED_METADATA} ${METADATA_KEY.INJECT_TAG}`;
            // expect(useDecoratorMoreThanOnce).to.throw(msg);
        });
        _it('Should_throw_when_not_applied_to_a_constructor', () => {
            // useDecoratorOnMethodThatIsNotAConstructor()
            //
            // const msg = `${ERROR_MSGS.INVALID_DECORATOR_OPERATION}`;
            // expect(useDecoratorOnMethodThatIsNotAConstructor).to.throw(msg);
        });
        _it('Should_throw_when_applied_w_ith_undefined', () => {
            // this can happen when there is circular dependency between symbols
            // useDecoratorW_ithUndefined()
            //
            // const msg = `${ERROR_MSGS.UNDEFINED_INJECT_ANNOTATION('InvalidDecoratorUsageWarrior')}`;
            // expect(useDecoratorW_ithUndefined).to.throw(msg);
        });
        _it('Should_be_usable_in_VanillaJS_applications', () => {
            interface Shurien {
            }
            const VanillaJSWarrior = (() => {
                let Warrior = (primary: Katana, secondary: Shurien) => {
                    // ...
                };
                return Warrior;
            })();
            decorate(inject('Katana'), VanillaJSWarrior, 0);
            decorate(inject('Shurien'), VanillaJSWarrior, 1);
            const metadataKey = METADATA_KEY.TAGGED;
            const paramsMetadata: any = Reflect.getMetadata(metadataKey, VanillaJSWarrior);
            expect(paramsMetadata).to.be.an('object');
            // assert metadata for first argument
            expect(paramsMetadata['0']).to.be.instanceof(Array);
            const m1: interfaces.Metadata = paramsMetadata['0'][0];
            expect(m1.key).to.be.eql(METADATA_KEY.INJECT_TAG);
            expect(m1.value).to.be.eql('Katana');
            expect(paramsMetadata['0'][1]).to.eq(undefined);
            // assert metadata for second argument
            expect(paramsMetadata['1']).to.be.instanceof(Array);
            const m2: interfaces.Metadata = paramsMetadata['1'][0];
            expect(m2.key).to.be.eql(METADATA_KEY.INJECT_TAG);
            expect(m2.value).to.be.eql('Shurien');
            expect(paramsMetadata['1'][1]).to.eq(undefined);
            // no more metadata should be available
            expect(paramsMetadata['2']).to.eq(undefined);
        });
        _it('should_throw_when_applied_inject_decorator_w_ith_undefined_service_identifier_to_a_property', () => {
            expect(() => {
                class W_ithUndefinedInject {
                    @inject(undefined as any as ServiceIdentifierOrFunc<undefined>)
                    property!: string;
                }
            }).to.throw(`${ERROR_MSGS.UNDEFINED_INJECT_ANNOTATION('W_ithUndefinedInject')}`);
        });
        _it('should_throw_when_applied_multiInject_decorator_w_ith_undefined_service_identifier_to_a_constructor_parameter', () => {
            expect(() => {
                class W_ithUndefinedInject {
                    @multiInject(undefined as any as ServiceIdentifierOrFunc<undefined>)
                    readonly dependency: string[] = [];
                    constructor() { }
                }
            }).to.throw(`${ERROR_MSGS.UNDEFINED_INJECT_ANNOTATION('W_ithUndefinedInject')}`);
        });
        _it('Should_unwrap_LazyServiceIdentifer', () => {
            const unwrapped: any = lazySwordId.unwrap();
            expect(unwrapped).to.be.equal('Sword');
        });
    });
}
