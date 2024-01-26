let __generate__Id: number = 0;
function generateId(): string {
    return "Metaschema.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { SchemaError, validate, ValidationError, Validator, ValidatorResult } from '@ohos/jsonschema';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@ohos/hypium';
import metaschema from '../../json-metaschema/draft-04-schema.json';
let validator: any;
const BASE_COUNT = 1;
export default function metaschemaTest() {
    describe('metaschemaTest', () => {
        beforeAll(() => {
        });
        beforeEach(() => {
            validator = new Validator();
        });
        afterEach(() => {
        });
        afterAll(() => {
        });
        it('ValidatesItself', 0, () => {
            expect(metaschema).not().assertNull();
            let result: boolean = validator.validate(metaschema, metaschema).valid;
            expect(result).assertTrue();
        });
    });
}
