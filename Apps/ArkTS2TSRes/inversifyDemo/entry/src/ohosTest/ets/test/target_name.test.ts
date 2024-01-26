let __generate__Id: number = 0;
function generateId(): string {
    return "target_name.test_" + ++__generate__Id;
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
import { injectable } from 'inversify';
import { targetName } from 'inversify';
import * as METADATA_KEY from 'inversify/lib/constants/metadata_keys';
import * as Stubs from '../utils/stubs';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it as _it, expect } from '../utils/util';
import * as ns from "reflect-metadata";
ns;
export default function target_nameTest() {
    describe('target_nameTest', () => {
        _it('Should_generate_metadata_if_declared_parameter_names', () => {
            @injectable()
            class Warrior {
                public katana: Stubs.Katana;
                public shuriken: Stubs.Shuriken;
                public constructor(
                @targetName('katana')
                katana: Stubs.Katana, 
                @targetName('shuriken')
                shuriken: Stubs.Shuriken) {
                    this.katana = katana;
                    this.shuriken = shuriken;
                }
            }
            const metadata: any = Reflect.getMetadata(METADATA_KEY.TAGGED, Warrior);
            expect(metadata['0']).to.be.instanceof(Array);
            expect(metadata['1']).to.be.instanceof(Array);
            expect(metadata['2']).to.eql(undefined);
            expect(metadata['0'][0].key).to.be.eql(METADATA_KEY.NAME_TAG);
            expect(metadata['0'][0].value).to.be.eql('katana');
            expect(metadata['1'][0].key).to.be.eql(METADATA_KEY.NAME_TAG);
            expect(metadata['1'][0].value).to.be.eql('shuriken');
        });
        _it('Should_be_usable_in_VanillaJS_applications', () => {
            interface Katana {
            }
            interface Shuriken {
            }
            const VanillaJSWarrior = (primary: Katana, secondary: Shuriken) => {
                // ...
            };
            decorate(targetName('primary'), VanillaJSWarrior, 0);
            decorate(targetName('secondary'), VanillaJSWarrior, 1);
            const metadata: any = Reflect.getMetadata(METADATA_KEY.TAGGED, VanillaJSWarrior);
            expect(metadata['0']).to.be.instanceof(Array);
            expect(metadata['1']).to.be.instanceof(Array);
            expect(metadata['2']).to.eql(undefined);
            expect(metadata['0'][0].key).to.be.eql(METADATA_KEY.NAME_TAG);
            expect(metadata['0'][0].value).to.be.eql('primary');
            expect(metadata['1'][0].key).to.be.eql(METADATA_KEY.NAME_TAG);
            expect(metadata['1'][0].value).to.be.eql('secondary');
        });
    });
}
