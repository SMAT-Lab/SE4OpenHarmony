let __generate__Id: number = 0;
function generateId(): string {
    return "optional.test_" + ++__generate__Id;
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
import { Container, inject, injectable, optional } from 'inversify';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it as _it, expect } from '../utils/util';
import * as ns from "reflect-metadata";
ns;
export default function optionalTest() {
    describe('optionalTest', () => {
        // Defines a test suite. Two parameters are supported: test suite name and test suite function.
        _it('Should_allow_to_flag_dependencies_as_optional', () => {
            @injectable()
            class Katana {
                public name: string;
                public constructor() {
                    this.name = 'Katana';
                }
            }
            @injectable()
            class Shuriken {
                public name: string;
                public constructor() {
                    this.name = 'Shuriken';
                }
            }
            @injectable()
            class Ninja {
                public name: string;
                public katana: Katana;
                public shuriken: Shuriken;
                public constructor(
                @inject('Katana')
                katana: Katana, 
                @inject('Shuriken')
                @optional()
                shuriken: Shuriken) {
                    this.name = 'Ninja';
                    this.katana = katana;
                    this.shuriken = shuriken;
                }
            }
            const container = new Container();
            container.bind<Katana>('Katana').to(Katana);
            container.bind<Ninja>('Ninja').to(Ninja);
            let ninja = container.get<Ninja>('Ninja');
            expect(ninja.name).to.eql('Ninja');
            expect(ninja.katana.name).to.eql('Katana');
            expect(ninja.shuriken).to.eql(undefined);
            container.bind<Shuriken>('Shuriken').to(Shuriken);
            ninja = container.get<Ninja>('Ninja');
            expect(ninja.name).to.eql('Ninja');
            expect(ninja.katana.name).to.eql('Katana');
            expect(ninja.shuriken.name).to.eql('Shuriken');
        });
        _it('Should_allow_to_set_a_default_value_for_dependencies_flagged_as_optional', () => {
            @injectable()
            class Katana {
                public name: string;
                public constructor() {
                    this.name = 'Katana';
                }
            }
            @injectable()
            class Shuriken {
                public name: string;
                public constructor() {
                    this.name = 'Shuriken';
                }
            }
            @injectable()
            class Ninja {
                public name: string;
                public katana: Katana;
                public shuriken: Shuriken;
                public constructor(
                @inject('Katana')
                katana: Katana, 
                @inject('Shuriken')
                @optional()
                shuriken: Shuriken = {
                    name: 'DefaultShuriken'
                }) {
                    this.name = 'Ninja';
                    this.katana = katana;
                    this.shuriken = shuriken;
                }
            }
            const container = new Container();
            container.bind<Katana>('Katana').to(Katana);
            container.bind<Ninja>('Ninja').to(Ninja);
            let ninja = container.get<Ninja>('Ninja');
            expect(ninja.name).to.eql('Ninja');
            expect(ninja.katana.name).to.eql('Katana');
            expect(ninja.shuriken.name).to.eql('DefaultShuriken');
            container.bind<Shuriken>('Shuriken').to(Shuriken);
            ninja = container.get<Ninja>('Ninja');
            expect(ninja.name).to.eql('Ninja');
            expect(ninja.katana.name).to.eql('Katana');
            expect(ninja.shuriken.name).to.eql('Shuriken');
        });
    });
}
