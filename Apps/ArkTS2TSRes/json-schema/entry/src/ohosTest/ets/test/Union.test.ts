let __generate__Id: number = 0;
function generateId(): string {
    return "Union.test_" + ++__generate__Id;
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
import { AndDescription, EmptyArray, ForArrayOr, ForObjectId, ObjectIdSchema, Options, UnionSchema, } from './IntertfaceData';
let validator: any;
const BASE_COUNT = 1;
let testSchema: Options = {
    "type": "string",
};
let numSchema: Options = {
    "type": "number",
};
let objectIdSchema: ObjectIdSchema = {
    "type": "object",
    "id": "MongoDb#ObjectId",
    "description": "MongoDB ObjectID",
    "properties": {
        "id": { "type": "string" },
        "_bsontype": { "type": "string" },
    },
};
let schema: UnionSchema = {
    type: 'object',
    required: true,
    properties: {
        frames: {
            type: 'array',
            required: true,
            items: {
                type: 'object',
                properties: {
                    filename: { type: 'string', required: true },
                    lineno: { type: ['integer', 'null'] },
                    method: { type: ['string', 'null'] },
                },
            },
        },
        exception: {
            type: 'object',
            required: true,
            properties: {
                class: { type: 'string', required: true },
                message: { type: 'string' },
            },
        },
    },
};
export default function unionTest() {
    describe('unionTest', () => {
        beforeAll(() => {
        });
        beforeEach(() => {
            validator = new Validator();
            validator.addSchema(testSchema, '/Test#Simple');
            validator.addSchema(numSchema, '/Test#Num');
            validator.addSchema(objectIdSchema, '/MongoDb#ObjectId');
        });
        afterEach(() => {
        });
        afterAll(() => {
        });
        let exc: Options = {
            class: 'testing...', message: 'this is only a test'
        };
        it('ShouldValidateForNumber', 0, () => {
            let result: boolean = validator.validate(1, {
                'type': ['number', 'string']
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateForString1', 0, () => {
            let result: boolean = validator.validate('1', {
                'type': ['number', 'string']
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateIfNoStringOrNumber1', 0, () => {
            let result: boolean = validator.validate(true, {
                'type': ['number', 'string']
            }).valid;
            expect(result).assertFalse();
        });
        it('shouldValidateForNull1', 0, () => {
            let result: boolean = validator.validate(null, {
                'type': ['null', 'string']
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateForString2', 0, () => {
            let result: boolean = validator.validate('1', {
                'type': ['null', 'string']
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateIfNoStringOrNumber2', 0, () => {
            let result: boolean = validator.validate(true, {
                'type': ['null', 'string']
            }).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateForNull2', 0, () => {
            let result: boolean = validator.validate(null, {
                'type': ['null', 'string']
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateForString3', 0, () => {
            let result: boolean = validator.validate('1', {
                'type': ['null', 'string']
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateIfNoStringOrNumber3', 0, () => {
            let result: boolean = validator.validate(true, {
                'type': ['null', 'string']
            }).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateForNull3', 0, () => {
            let result: boolean = validator.validate(null, {
                'type': ['null', {
                        '$ref': 'Test#Simple'
                    }]
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateForString4', 0, () => {
            let result: boolean = validator.validate('test', {
                'type': ['null', {
                        '$ref': 'Test#Simple'
                    }]
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateIfNoStringOrNumber4', 0, () => {
            let result: boolean = validator.validate(true, {
                'type': ['null', {
                        '$ref': 'Test#Simple'
                    }]
            }).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateFor', 0, () => {
            let result: boolean = validator.validate('*', {
                'type': [{
                        type: 'string', pattern: '^\\*$'
                    }, {
                        '$ref': 'Test#Num'
                    }]
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateFor1', 0, () => {
            let result: boolean = validator.validate(1, {
                'type': [{
                        type: 'string', pattern: '^\\*$'
                    }, {
                        '$ref': 'Test#Num'
                    }]
            }).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateFor', 0, () => {
            let result: boolean = validator.validate('-', {
                'type': [{
                        type: 'string', pattern: '^\\*$'
                    }, {
                        '$ref': 'Test#Num'
                    }]
            }).valid;
            expect(result).assertFalse();
        });
        it('ShouldValidateForArrayOr', 0, () => {
            let schema: ForArrayOr = {
                "type": "object",
                "properties": {
                    "wildcards": {
                        "type": "array",
                        "items": {
                            "type": [{
                                    "$ref": "MongoDb#ObjectId"
                                }, {
                                    "type": "string", "pattern": "^\\*$"
                                }]
                        },
                    },
                },
            };
            let result: boolean = validator.validate({
                'wildcards': ['*']
            }, schema).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateFoEmptyArray', 0, () => {
            let schema: EmptyArray = {
                "type": "object",
                "properties": {
                    "wildcards": {
                        "type": "array",
                        "items": {
                            "type": [{
                                    "$ref": "MongoDb#ObjectId"
                                }, {
                                    "type": "string", "pattern": "^\\*$"
                                }]
                        },
                    },
                },
            };
            let result: boolean = validator.validate({
                'wildcards': []
            }, schema).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateForObjectId', 0, () => {
            let schema: ForObjectId = {
                "type": "object",
                "properties": {
                    "wildcards": {
                        "type": "array",
                        "items": {
                            "type": [{
                                    "$ref": "MongoDb#ObjectId"
                                }, {
                                    "type": "string", "pattern": "^\\*$"
                                }]
                        },
                    },
                },
            };
            let result: boolean = validator.validate({
                'wildcards': [{
                        "id": "1234", "_bsontype": "test"
                    }, '*']
            }, schema).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateForObjectidAndIgnoreTitleAndDescription', 0, () => {
            let schema: AndDescription = {
                "type": "object",
                "properties": {
                    "wildcards": {
                        "type": "array",
                        "items": {
                            "type": [{
                                    "$ref": "MongoDb#ObjectId", "title": "test", "description": "test"
                                }, {
                                    "type": "string", "pattern": "^\\*$"
                                }]
                        },
                    },
                },
            };
            let result: boolean = validator.validate({
                'wildcards': [{
                        "id": "1234", "_bsontype": "test"
                    }, '*']
            }, schema).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateForNulls', 0, () => {
            let result: boolean = validator.validate({
                frames: [{
                        filename: 'somefile.js', lineno: null
                    }], exception: exc
            }, schema).valid;
            expect(result).assertTrue();
        });
        it('ShouldValidateForNullAndString', 0, () => {
            let result: boolean = validator.validate({
                frames: [{
                        filename: 'somefile.js', lineno: null
                    }], exception: exc
            }, schema).valid;
            expect(result).assertTrue();
        });
        it('ShouldNotValidateForStringAndString', 0, () => {
            let result: boolean = validator.validate({
                frames: [{
                        filename: 'somefile.js', lineno: {
                            hello: 'world'
                        }
                    }], exception: exc
            }, schema).valid;
            expect(result).assertFalse();
        });
    });
}
