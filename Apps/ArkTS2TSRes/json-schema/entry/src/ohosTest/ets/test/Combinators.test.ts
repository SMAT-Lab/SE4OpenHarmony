let __generate__Id: number = 0;
function generateId(): string {
    return "Combinators.test_" + ++__generate__Id;
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
import { Combinit, CombinOne, OptionData, Options, } from './IntertfaceData';
let validator: any;
const BASE_COUNT = 1;
let initSchema: Combinit = {
    'type': 'object',
    'anyOf': [{
            'properties': {
                'name': { 'type': 'string', 'enum': ['test1'] },
            },
        }, {
            'properties': {
                'name': { 'type': 'string', 'enum': ['test2'] },
            },
        }],
};
let oneOfSchema: CombinOne = {
    'type': 'object',
    'oneOf': [{
            'properties': {
                'name1': { 'type': 'string', 'enum': ['test1'] },
            },
            'additionalProperties': false,
        }, {
            'properties': {
                'name2': { 'type': 'string', 'enum': ['test2'] },
            },
            'additionalProperties': false,
        }],
};
let name: OptionData = {
    'name': 'test2'
};
let namedata: OptionData = {
    'name': 'test3'
};
let errorflag: Options = {
    throwError: true
};
let name2: OptionData = {
    'name2': 'test2'
};
export default function combinatorsTest() {
    describe('combinatorsTest', () => {
        beforeAll(() => {
        });
        beforeEach(() => {
            validator = new Validator();
        });
        afterEach(() => {
        });
        afterAll(() => {
        });
        it('ShouldValidateIfMatchesAnyOf', 0, () => {
            let result: boolean = validator.validate(name, initSchema).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateIfNotMatchAnyOf', 0, () => {
            let result: boolean = validator.validate(namedata, initSchema).valid;
            expect(result).assertFalse();
        });
        it('ShouldNotThrowIfValidWhenThrowErrorIsSet1', 0, () => {
            let isThrow = false;
            try {
                validator.validate(name, initSchema, errorflag);
            }
            catch (err) {
                isThrow = true;
            }
            expect(isThrow).assertFalse();
        });
        it('ShouldThrowIfInvalidWhenThrowErrorIsSet1', 0, () => {
            let isThrow = false;
            try {
                validator.validate(namedata, initSchema, errorflag);
            }
            catch (err) {
                isThrow = true;
            }
            expect(isThrow).assertTrue();
        });
        it('ShouldValidateIfMatchesExactlyOneOf', 0, () => {
            let result: boolean = validator.validate(name2, oneOfSchema).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateIfNotMatchExactlyOneOf', 0, () => {
            let result: boolean = validator.validate({
                'name1': 'test1', 'name2': 'test2'
            }, oneOfSchema).valid;
            expect(result).assertFalse();
        });
        it('ShouldNotThrowIfValidWhenThrowErrorIsSet2', 0, () => {
            let isThrow = false;
            try {
                validator.validate(name2, oneOfSchema, errorflag);
            }
            catch (err) {
                isThrow = true;
            }
            expect(isThrow).assertFalse();
        });
        it('ShouldThrowIfInvalidWhenThrowErrorIsSet2', 0, () => {
            let isThrow = false;
            try {
                validator.validate({
                    'name1': 'test1', 'name2': 'test2'
                }, oneOfSchema, errorflag);
            }
            catch (err) {
                isThrow = true;
            }
            expect(isThrow).assertTrue();
        });
    });
}
