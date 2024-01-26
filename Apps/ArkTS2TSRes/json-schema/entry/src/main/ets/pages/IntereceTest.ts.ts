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
import { Validator } from '@ohos/jsonschema';
export let allowschema = {
    type: "string",
    format: "email",
    example: "foo",
};
export let validschema = {
    "id": "/All",
    "type": "object",
    "properties": {
        "validateType1": {
            "type": "string"
        },
        "validateType2": {
            "type": ["boolean", "string"]
        },
        "validateType3": {
            "not": "string",
        },
        "validateType4": {
            "disallow": ["boolean", "string"]
        },
        "validateProperties": {
            "type": "object",
            "properties": {
                "a": {
                    "type": "array"
                },
                "b": {
                    "type": "integer"
                }
            }
        },
        "validatePatternProperties": {
            "type": "object",
            "patternProperties": {
                "^x1\\d*$": {
                    "type": "array"
                },
                "^[a-z]+$": {
                    "type": "integer"
                }
            }
        },
        "validateAdditionalProperties1": {
            "type": "object",
            "properties": {
                "a": {
                    "type": "array"
                }
            },
            "patternProperties": {
                "[b-z]+": {
                    "type": "integer"
                }
            },
            "additionalProperties": {
                "type": "boolean"
            }
        },
        "validateAdditionalProperties2": {
            "type": "object",
            "properties": {
                "a": {
                    "type": "array"
                }
            },
            "patternProperties": {
                "[b-z]+": {
                    "type": "integer"
                }
            },
            "additionalProperties": false
        },
        "validateNumberOfProperties": {
            "type": "object",
            "patternProperties": {
                "[a-z]+": {
                    "type": "string"
                }
            },
            "minProperties": 1,
            "maxProperties": 2
        },
        "validateRequired": {
            "type": "any",
            "required": true
        },
        "validateRequiredProperties1": {
            "type": "object",
            "required": [
                "propA",
                "propB"
            ]
        },
        "validateRequiredProperties2": {
            "type": "object",
            "properties": {
                "propA": {
                    "required": true
                },
                "propB": {
                    "required": true
                }
            }
        },
        "validateItems": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "validateNumberOfItems": {
            "type": "array",
            "minItems": 1,
            "maxItems": 2
        },
        "validateUniqueItems": {
            "type": "array",
            "uniqueItems": true
        },
        "validateNumber": {
            "type": ["number"],
            "minimum": 0,
            "maximum": 10,
            "divisibleBy": 2.4,
            "multipleOf": 4.8
        },
        "validateInteger": {
            "type": ["integer"],
            "divisibleBy": 2,
            "multipleOf": 4
        },
        "validatePattern1": {
            "type": "string",
            "pattern": "str"
        },
        "validatePattern2": {
            "type": "string",
            "pattern": /str/
        },
        "validateFormat": {
            "type": "string",
            "format": "color"
        },
        "validateLength": {
            "type": "string",
            "minLength": 1,
            "maxLength": 2
        },
        "validateEnum": {
            "enum": [
                "value",
                {
                    "x": 11
                }
            ]
        },
        "validateDependencies1": {
            "type": "object",
            "properties": {
                "a": {
                    "type": "string",
                },
                "b": {
                    "type": "boolean"
                }
            },
            "dependencies": {
                "a": "b"
            }
        },
        "validateDependencies2": {
            "type": "object",
            "properties": {
                "a": {
                    "type": "string",
                },
                "b": {
                    "type": "boolean"
                },
                "c": {
                    "type": "number"
                }
            },
            "dependencies": {
                "a": ["b", "c"]
            }
        },
        "validateAnyOf": { "anyOf": [
                {
                    "type": "boolean"
                },
                {
                    "type": "string"
                }
            ] },
        "validateAllOf": { "allOf": [
                {
                    "type": "boolean"
                },
                {
                    "enum": [true]
                }
            ] },
        "validateOneOf": { "oneOf": [
                {
                    "type": "boolean"
                },
                {
                    "type": "integer"
                }
            ] },
        "validateReference": {
            "$ref": "/ReferencedSchema"
        }
    }
};
export let referencedSchema = {
    "id": "/ReferencedSchema",
    "type": "string"
};
export let all = {
    "validateType1": "a string",
    "validateType2": true,
    "validateType3": 6,
    "validateType4": 6,
    "validateProperties": {
        "a": [],
        "b": 6
    },
    "validatePatternProperties": {
        "x11": [],
        "abc": 5
    },
    "validateAdditionalProperties1": {
        "a": [],
        "bcd": 4,
        "11": true
    },
    "validateAdditionalProperties2": {
        "a": [],
        "bcd": 4
    },
    "validateNumberOfProperties": {
        "abc": "a string"
    },
    "validateRequired": 6,
    "validateRequiredProperties1": {
        "propA": 6,
        "propB": "a string"
    },
    "validateRequiredProperties2": {
        "propA": 6,
        "propB": "a string"
    },
    "validateItems": [
        "str-a",
        "str-b"
    ],
    "validateNumberOfItems": [
        "str-a"
    ],
    "validateUniqueItems": [
        "str-a",
        "str-b"
    ],
    "validateNumber": 9.6,
    "validateInteger": 8,
    "validatePattern1": "a string",
    "validatePattern2": "a string",
    "validateFormat": "blue",
    "validateLength": "a",
    "validateEnum": {
        "x": 11
    },
    "validateDependencies1": {
        "a": "a string",
        "b": true
    },
    "validateDependencies2": {
        "a": "a string",
        "b": true,
        "c": 8
    },
    "validateAnyOf": "a string",
    "validateAllOf": true,
    "validateOneOf": 6,
    "validateReference": "a string"
};
export let addressSchema = {
    "id": "/SimpleAddress",
    "type": "object",
    "properties": {
        "lines": {
            "type": "array",
            "items": { "type": "string" }
        },
        "zip": { "type": "string" },
        "city": { "type": "string" },
        "country": { "type": "string" }
    },
    "required": ["country"]
};
export let complicschema = {
    "id": "/SimplePerson",
    "type": "object",
    "properties": {
        "name": { "type": "string" },
        "address": { "$ref": "/SimpleAddress" },
        "votes": { "type": "integer", "minimum": 1 }
    }
};
export let p = {
    "name": "Barack Obama",
    "address": {
        "lines": ["1600 Pennsylvania Avenue Northwest"],
        "zip": "DC 20500",
        "city": "Washington",
        "country": "USA"
    },
    "votes": "lots"
};
export let dereferdata = {
    "type": "number"
};
export let dereferdapro = {
    "id": "/simplePerson",
    "type": "object",
    "properties": {
        "name": { "type": "string" },
        "address": { "$ref": "/SimpleAddress" },
        "votes": { "type": "integer", "minimum": 1 }
    }
};
export let dereferaddress = {
    "type": "array",
    "items": {
        "properties": {
            "name": { "type": "string" },
            "lastname": { "type": "string" }
        },
        "required": ["name", "lastname"]
    }
};
export let initSchema = {
    "id": "/SimplePerson",
    "type": "object",
    "properties": {
        "name": { "type": "string" },
        "address": { "$ref": "/SimpleAddress" },
        "votes": { "type": "integer", "minimum": 1 }
    }
};
Validator.prototype.customFormats.myFormat = function (input) {
    return input === 'myFormat';
};
export let localschema = {
    oneOf: [
        { type: 'string', minLength: 32, maxLength: 32 },
        { type: 'string', maxLength: 16 },
        { type: 'number' },
    ]
};
export let nesteschema = {
    oneOf: [
        { type: 'string', minLength: 32, maxLength: 32 },
        { type: 'string', maxLength: 16 },
        { type: 'number' },
    ]
};
export let preproschema = { 'properties': {
        'name': { 'type': 'string' },
        'quantity': { 'type': 'number' }
    } };
export let preproinstance = {
    name: 123,
    quantity: '2'
};
export const rewrischema = {
    properties: {
        date: { id: 'http://example.com/date', type: 'string' },
    },
};
export const rewrivalue = {
    date: '2020-09-30T23:39:27.060Z',
};
export let simpleschema = { "type": "number" };
export let skipschema = {
    "id": "/SimplePerson",
    "type": "object",
    "properties": {
        "name": { "type": "string" },
        "sex": { "type": "number", "minimum": 50 },
        "votes": { "type": "integer", "minimum": 1 }
    }
};
export let skipp = {
    "name": "张三",
    "sex": 45,
    "votes": 22
};
