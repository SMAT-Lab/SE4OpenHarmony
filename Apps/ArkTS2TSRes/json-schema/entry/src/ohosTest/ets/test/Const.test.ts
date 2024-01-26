let __generate__Id: number = 0;
function generateId(): string {
    return "Const.test_" + ++__generate__Id;
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
import { ObjectSchema, Options, } from './IntertfaceData';
let validator: any;
const BASE_COUNT = 1;
let stringSchema: Options = { 'const': 'value' };
let objectSchema: ObjectSchema = { 'const': { "some key": [null, "1", 2, true] } };
export default function constTest() {
    describe('constTest', () => {
        beforeAll(() => {
        });
        beforeEach(() => {
            validator = new Validator();
        });
        afterEach(() => {
        });
        afterAll(() => {
        });
        it('StringValid', 0, () => {
            let result: boolean = validator.validate("value", stringSchema).valid;
            expect(result).assertTrue();
        });
        it('StringInvalid1', 0, () => {
            let result: boolean = validator.validate("invalid 1", stringSchema).valid;
            expect(result).assertFalse();
        });
        it('StringInvalid2', 0, () => {
            let result: boolean = validator.validate("", stringSchema).valid;
            expect(result).assertFalse();
        });
        it('ObjectValid', 0, () => {
            let result: boolean = validator.validate({
                "some key": [null, "1", 2, true]
            }, objectSchema).valid;
            expect(result).assertTrue();
        });
        it('ObjectInvalid1', 0, () => {
            let result: boolean = validator.validate([null], objectSchema).valid;
            expect(result).assertFalse();
        });
        it('ObjectInvalid2', 0, () => {
            let result: boolean = validator.validate({
                "some key": [false, "1", 2, true]
            }, objectSchema).valid;
            expect(result).assertFalse();
        });
        it('ObjectInvalid3', 0, () => {
            let result: boolean = validator.validate(true, objectSchema).valid;
            expect(result).assertFalse();
        });
    });
}
