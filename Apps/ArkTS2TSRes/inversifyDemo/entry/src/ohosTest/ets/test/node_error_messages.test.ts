let __generate__Id: number = 0;
function generateId(): string {
    return "node_error_messages.test_" + ++__generate__Id;
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
import * as ns from "reflect-metadata";
import { Container, injectable } from 'inversify';
ns;
export default function node_error_messagesTest() {
    interface Weapon {
    }
    @injectable()
    class Katana implements Weapon {
    }
    @injectable()
    class Shuriken implements Weapon {
    }
    @injectable()
    class Bokken implements Weapon {
    }
    describe('node_error_messagesTest', () => {
        _it('Should_contain_correct_message_and_the_serviceIdentifier_in_error_message', () => {
            const container = new Container();
            container.bind<Weapon>('Weapon').to(Katana);
            const tryWeapon = () => { container.get('Ninja'); };
        });
        // _it('Should contain the provided name in error message when target is named', () => {
        //
        //   const container = new Container();
        //   const tryGetNamedWeapon = (name: string | number | symbol) => { container.getNamed('Weapon', name); };
        //
        //   expect(() => tryGetNamedWeapon(0)).to.throw(/.*\bWeapon\b.*\b0\b/g);
        //
        // });
        _it('Should_list_all_possible_bindings_in_error_message_if_no_matching_binding_found', () => {
            interface Weapon {
            }
            @injectable()
            class Katana implements Weapon {
            }
            @injectable()
            class Shuriken implements Weapon {
            }
            @injectable()
            class Bokken implements Weapon {
            }
            const container = new Container();
            container.bind<Weapon>('Weapon').to(Katana).whenTargetNamed('strong');
            container.bind<Weapon>('Weapon').to(Shuriken).whenTargetTagged('canThrow', true);
            container.bind<Weapon>('Weapon').to(Bokken).whenTargetNamed('weak');
            try {
                container.getNamed('Weapon', 'superior');
            }
            catch (error) {
                expect((error as Error).message).to.match(new RegExp(".*\\bKatana\\b.*\\bnamed\\b.*\\bstrong\\b"));
                expect((error as Error).message).to.match(new RegExp(".*\\bBokken\\b.*\\bnamed\\b.*\\bweak\\b"));
                expect((error as Error).message).to.match(new RegExp(".*\\bShuriken\\b.*\\btagged\\b.*\\bcanThrow\\b.*\\btrue\\b"));
            }
        });
        _it('Should_list_all_possible_bindings_in_error_message_if_ambiguous_matching_binding_found', () => {
            interface Weapon {
            }
            @injectable()
            class Katana implements Weapon {
            }
            @injectable()
            class Shuriken implements Weapon {
            }
            @injectable()
            class Bokken implements Weapon {
            }
            const container = new Container();
            container.bind<Weapon>('Weapon').to(Katana).whenTargetNamed('strong');
            container.bind<Weapon>('Weapon').to(Shuriken).whenTargetTagged('canThrow', true);
            container.bind<Weapon>('Weapon').to(Bokken).whenTargetNamed('weak');
            try {
                container.get('Weapon');
            }
            catch (error) {
                expect((error as Error).message).to.match(new RegExp(".*\\bKatana\\b.*\\bnamed\\b.*\\bstrong\\b"));
                expect((error as Error).message).to.match(new RegExp(".*\\bBokken\\b.*\\bnamed\\b.*\\bweak\\b"));
                expect((error as Error).message).to.match(new RegExp(".*\\bShuriken\\b.*\\btagged\\b.*\\bcanThrow\\b.*\\btrue\\b"));
            }
        });
    });
}
