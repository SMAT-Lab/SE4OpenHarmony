let __generate__Id: number = 0;
function generateId(): string {
    return "Mixed.test_" + ++__generate__Id;
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
import { it, afterAll, afterEach, beforeAll, beforeEach, describe, expect } from '@ohos/hypium';
import {} from './IntertfaceData';
let validator: any = new Validator();
const BASE_COUNT = 1;
export default function mixedTest() {
    describe('mixedTest', () => {
        it('should_validate', 0, () => {
            let result: any = validator.validate({
                'name': 'test', 'lines': ['1']
            }, {
                'type': 'object',
                'properties': {
                    'name': {
                        'type': 'string'
                    },
                    'lines': {
                        'type': 'array',
                        'items': {
                            'type': 'string'
                        },
                    },
                },
            }).valid;
            expect(result).assertTrue();
        });
        it('should_not_validate', 0, () => {
            let result: any = validator.validate({
                'name': 'test', 'lines': [1]
            }, {
                'type': 'object',
                'properties': {
                    'name': {
                        'type': 'string'
                    },
                    'lines': {
                        'type': 'array',
                        'items': {
                            'type': 'string'
                        },
                    },
                },
            });
            expect(result.errors.length).assertEqual(1);
            let msgProperty: any = result.errors[0]['message'];
            expect(msgProperty).assertEqual('is not of a type(s) string');
            let instanceProperty: any = result.errors[0]['property'];
            expect(instanceProperty).assertEqual('instance.lines[0]');
        });
    });
}
