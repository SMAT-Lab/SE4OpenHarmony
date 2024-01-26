let __generate__Id: number = 0;
function generateId(): string {
    return "Auto_wire.test_" + ++__generate__Id;
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
import { autoProvide } from "inversify-binding-decorators/es/index";
import * as entites from "../stubs/entities";
import { DeleteMetadata } from '../interface';
export default function autoWireTest() {
    describe("autoProvide", () => {
        beforeEach(() => {
            DeleteMetadata();
        });
        it("Should_be_able_to_auto_wire_binding_declarations", 0, () => {
            let container = new Container();
            autoProvide(container, entites);
            container.load(buildProviderModule());
            let warrior = container.get(entites.Warrior);
            expect(warrior.fight()).assertEqual("Using_Katana...".replace('_', ' '));
        });
    });
}
