let __generate__Id: number = 0;
function generateId(): string {
    return "post_construct.test_" + ++__generate__Id;
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
import { decorate, postConstruct } from 'inversify';
import * as ERRORS_MSGS from 'inversify/lib/constants/error_msgs';
import * as METADATA_KEY from 'inversify/lib/constants/metadata_keys';
import { Metadata } from 'inversify/lib/planning/metadata';
import * as ns from "reflect-metadata";
import { VanillaJSWarrior1 } from '../tools/utilFun';
ns;
export default function post_constructTest() {
    describe('post_constructTest', () => {
        _it('Should_generate_metadata_for_the_decorated_method', () => {
            class Katana {
                private useMessage!: string;
                public use() {
                    return 'Used Katana!';
                }
                @postConstruct()
                public testMethod() {
                    this.useMessage = 'Used Katana!';
                }
                public debug() {
                    return this.useMessage;
                }
            }
            const metadata: Metadata = Reflect.getMetadata(METADATA_KEY.POST_CONSTRUCT, Katana);
            expect(metadata.value).to.be.equal('testMethod');
        });
        _it('Should_throw_when_applied_multiple_times', () => {
            let setup = () => {
                class Katana {
                    @postConstruct()
                    public testMethod1() {
                    }
                    @postConstruct()
                    public testMethod2() {
                    }
                }
                Katana.toString();
            };
            expect(setup).to.throw(ERRORS_MSGS.MULTIPLE_POST_CONSTRUCT_METHODS);
        });
        _it('Should_be_usable_in_VanillaJS_applications', () => {
            expect(VanillaJSWarrior1()).to.be.equal('testMethod');
        });
    });
}
