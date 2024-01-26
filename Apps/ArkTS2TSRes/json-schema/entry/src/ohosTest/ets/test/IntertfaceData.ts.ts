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
import buffer from '@ohos.buffer';
import { Schema, Validator } from '@ohos/jsonschema';
export let schema = {
    dependencies: {
        bar: {
            properties: {
                foo: {
                    type: "array",
                    items: {
                        type: "integer"
                    },
                },
                bar: {
                    type: "integer"
                },
            },
            required: ["foo", "bar"],
        },
    },
};
export let data = {
    foo: [1, 2, 3],
    bar: 2,
};
export function freeze() {
    Object.freeze(data.foo);
    Object.freeze(data);
}
export let pjson = {
    name: "张三",
    sex: 45,
    votes: 22
};
export const schemajsonpro = {
    properties: {
        name: {
            type: 'string'
        },
        quantity: {
            type: 'number'
        }
    }
};
export const instancejson = {
    name: 123,
    quantity: '2'
};
export const schemavalue = {
    properties: {
        date: {
            id: 'http://example.com/date', type: 'string'
        },
    },
};
export const value = {
    date: '2020-09-30T23:39:27.060Z',
};
export interface Deful {
    id: string;
    type: string;
    items: {
        $ref: string;
    };
    definitions: {
        item: {
            type: string;
        };
    };
}
export interface Depro {
    "id": string;
    "type": string;
    "properties": {
        "name": {
            "type": string;
        };
        "address": {
            "$ref": string;
        };
        "votes": {
            "type": string;
            "minimum": number;
        };
    };
}
export interface Droptt {
    name: string;
    address: {
        lines: string[];
        zip: string;
        city: string;
        country: string;
    };
    votes: string;
}
export interface AllData {
    validateType1: string;
    validateType2: boolean;
    validateType3: number;
    validateType4: number;
    validateProperties: {
        a: any[];
        b: number;
    };
    validatePatternProperties: {
        x11: any[];
        abc: number;
    };
    validateAdditionalProperties1: {
        a: any[];
        bcd: number;
        "11": boolean;
    };
    validateAdditionalProperties2: {
        a: any[];
        bcd: number;
    };
    validateNumberOfProperties: {
        abc: string;
    };
    validateRequired: number;
    validateRequiredProperties1: {
        propA: number;
        propB: string;
    };
    validateRequiredProperties2: {
        propA: number;
        propB: string;
    };
    validateItems: string[];
    validateNumberOfItems: string[];
    validateUniqueItems: string[];
    validateNumber: number;
    validateInteger: number;
    validatePattern1: string;
    validatePattern2: string;
    validateFormat: string;
    validateLength: string;
    validateEnum: {
        x: number;
    };
    validateDependencies1: {
        a: string;
        b: boolean;
    };
    validateDependencies2: {
        a: string;
        b: boolean;
        c: number;
    };
    validateAnyOf: string;
    validateAllOf: boolean;
    validateOneOf: number;
    validateReference: string;
}
export let initSchemajson = {
    id: "/SimplePerson",
    type: "object",
    properties: {
        name: {
            type: "string"
        },
        address: {
            $ref: "/SimpleAddress"
        },
        votes: {
            type: "integer", minimum: 1
        }
    }
};
export const schemavaldator = {
    items: {
        $ref: '#items'
    },
    definitions: {
        items: {
            $id: '#items',
            type: 'array',
        },
    },
};
export const rewi = {
    // @ts-ignore
    rewrite: unmarshall
};
export let schemaunion = {
    type: "object",
    properties: {
        wildcards: {
            type: "array",
            items: {
                type: [{
                        $ref: "MongoDb#ObjectId", title: "test", description: "test"
                    }, {
                        type: "string", pattern: "^\\*$"
                    }]
            },
        },
    },
};
export let pre = {
    // @ts-ignore
    preValidateProperty: preValidate
};
export let skipAttribute = {
    skipAttributes: ["minimum"]
};
export interface Options {
    type?: string;
    items?: Options;
    maxItems?: number;
    uniqueItems?: boolean;
    a?: number;
    minItems?: number;
    b?: number;
    allowUnknownAttributes?: boolean;
    format?: string;
    example?: string;
    id?: string;
    required?: boolean;
    nestedErrors?: boolean;
    contains?: string;
    base?: string;
    date?: string;
    name?: number;
    quantity?: string;
    skipAttributes?: string[];
    'minimum'?: string;
    'exclusiveMinimum'?: boolean;
    'maximum'?: string;
    'exclusiveMaximum'?: boolean;
    'divisibleBy'?: number;
    'multipleOf'?: number;
    'pattern'?: string;
    'minLength'?: number;
    'maxLength'?: number;
    'enum'?: string[];
    'default'?: string;
    throwError?: boolean;
    const?: string;
    foo?: number[];
    bar?: number;
    class?: string;
    message?: string;
}
export interface ForArrayOr {
    type: string;
    properties: {
        wildcards: {
            type: string;
            items: {
                type: ({
                    $ref: string;
                    type?: undefined;
                    pattern?: undefined;
                } | {
                    type: string;
                    pattern: string;
                    $ref?: undefined;
                })[];
            };
        };
    };
}
export interface EmptyArray {
    type: string;
    properties: {
        wildcards: {
            type: string;
            items: {
                type: ({
                    $ref: string;
                    type?: undefined;
                    pattern?: undefined;
                } | {
                    type: string;
                    pattern: string;
                    $ref?: undefined;
                })[];
            };
        };
    };
}
export interface AndDescription {
    type: string;
    properties: {
        wildcards: {
            type: string;
            items: {
                type: ({
                    $ref: string;
                    title: string;
                    description: string;
                    type?: undefined;
                    pattern?: undefined;
                } | {
                    type: string;
                    pattern: string;
                    $ref?: undefined;
                    title?: undefined;
                    description?: undefined;
                })[];
            };
        };
    };
}
export interface ThrowError {
    properties: {
        a: {
            type: string;
        };
        b: {
            type: string;
        };
    };
}
export interface Invalid {
    a: any;
    b: any;
}
export interface ForObjectId {
    type: string;
    properties: {
        wildcards: {
            type: string;
            items: {
                type: ({
                    $ref: string;
                    type?: undefined;
                    pattern?: undefined;
                } | {
                    type: string;
                    pattern: string;
                    $ref?: undefined;
                })[];
            };
        };
    };
}
export interface Combinit {
    type: string;
    anyOf: {
        properties: {
            name: {
                type: string;
                enum: string[];
            };
        };
    }[];
}
export interface Constra {
    dependencies: {
        bar: {
            properties: {
                foo: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                bar: {
                    type: string;
                };
            };
            required: string[];
        };
    };
}
export interface ObjectSchema {
    'const': {
        "some key": (string | number | boolean | null)[];
    };
}
export interface CombinOne {
    type: string;
    oneOf: ({
        properties: {
            name1: {
                type: string;
                enum: string[];
            };
            name2?: undefined;
        };
        additionalProperties: boolean;
    } | {
        properties: {
            name2: {
                type: string;
                enum: string[];
            };
            name1?: undefined;
        };
        additionalProperties: boolean;
    })[];
}
export interface DeciData {
    type: string;
    pattern: RegExp;
}
export interface TheEnum {
    type: string;
    'enum': number[];
}
export interface ObjectIdSchema {
    type: string;
    id: string;
    description: string;
    properties: {
        id: {
            type: string;
        };
        _bsontype: {
            type: string;
        };
    };
}
export interface UnionSchema {
    type: string;
    required: boolean;
    properties: {
        frames: {
            type: string;
            required: boolean;
            items: {
                type: string;
                properties: {
                    filename: {
                        type: string;
                        required: boolean;
                    };
                    lineno: {
                        type: string[];
                    };
                    method: {
                        type: string[];
                    };
                };
            };
        };
        exception: {
            type: string;
            required: boolean;
            properties: {
                class: {
                    type: string;
                    required: boolean;
                };
                message: {
                    type: string;
                };
            };
        };
    };
}
export interface Optiress {
    'id': string;
    'type': string;
    'properties': {
        'lines': {
            'type': string;
            'items': {
                type: string;
            };
        };
        'zip': {
            type: string;
        };
        'city': {
            type: string;
        };
        'country': {
            type: string;
        };
    };
    'required': string[];
}
export interface OptionData {
    name?: string;
    name2?: string;
}
export interface NullType {
    type: Array<string | null>;
}
export interface UnderType {
    type: Array<string | undefined>;
}
export interface TypeData {
    type?: boolean;
    name?: boolean;
    nestedErrors?: boolean;
    throwError?: boolean;
}
export interface OneOfSchema {
    oneOf: ({
        type: string;
        enum?: undefined;
        required?: undefined;
    } | {
        enum: number[];
        type?: undefined;
        required?: undefined;
    } | {
        type: string;
        required: string[];
        enum?: undefined;
    })[];
}
export interface ReWri {
    properties: {
        date: {
            id: string;
            type: string;
        };
    };
}
export interface Derefernce {
    id: string;
    type: string;
    properties: {
        name: {
            type: string;
        };
        address: {
            $ref: string;
        };
        votes: {
            type: string;
            minimum: number;
        };
    };
}
export interface Derefeing {
    id: string;
    type: string;
    properties: {
        name: {
            type: string;
        };
        address: {
            $ref: string;
        };
        votes: {
            type: string;
            minimum: number;
        };
    };
}
export interface DereBaseUrl {
    id: string;
    type: string;
    items: {
        $ref: string;
    };
    definitions: {
        item: {
            type: string;
        };
    };
}
export interface DereRequ {
    type: string;
    items: {
        properties: {
            name: {
                type: string;
            };
            lastname: {
                type: string;
            };
        };
        required: string[];
    };
}
export interface AdllSchema {
    id: string;
    type: string;
    properties: {
        validateType1: {
            type: string;
        };
        validateType2: {
            type: string[];
        };
        validateType3: {
            not: string;
        };
        validateType4: {
            disallow: string[];
        };
        validateProperties: {
            type: string;
            properties: {
                a: {
                    type: string;
                };
                b: {
                    type: string;
                };
            };
        };
        validatePatternProperties: {
            type: string;
            patternProperties: {
                "^x1\\d*$": {
                    type: string;
                };
                "^[a-z]+$": {
                    type: string;
                };
            };
        };
        validateAdditionalProperties1: {
            type: string;
            properties: {
                a: {
                    type: string;
                };
            };
            patternProperties: {
                "[b-z]+": {
                    type: string;
                };
            };
            additionalProperties: {
                type: string;
            };
        };
        validateAdditionalProperties2: {
            type: string;
            properties: {
                a: {
                    type: string;
                };
            };
            patternProperties: {
                "[b-z]+": {
                    type: string;
                };
            };
            additionalProperties: boolean;
        };
        validateNumberOfProperties: {
            type: string;
            patternProperties: {
                "[a-z]+": {
                    type: string;
                };
            };
            minProperties: number;
            maxProperties: number;
        };
        validateRequired: {
            type: string;
            required: boolean;
        };
        validateRequiredProperties1: {
            type: string;
            required: string[];
        };
        validateRequiredProperties2: {
            type: string;
            properties: {
                propA: {
                    required: boolean;
                };
                propB: {
                    required: boolean;
                };
            };
        };
        validateItems: {
            type: string;
            items: {
                type: string;
            };
        };
        validateNumberOfItems: {
            type: string;
            minItems: number;
            maxItems: number;
        };
        validateUniqueItems: {
            type: string;
            uniqueItems: boolean;
        };
        validateNumber: {
            type: string[];
            minimum: number;
            maximum: number;
            divisibleBy: number;
            multipleOf: number;
        };
        validateInteger: {
            type: string[];
            divisibleBy: number;
            multipleOf: number;
        };
        validatePattern1: {
            type: string;
            pattern: string;
        };
        validatePattern2: {
            type: string;
            pattern: RegExp;
        };
        validateFormat: {
            type: string;
            format: string;
        };
        validateLength: {
            type: string;
            minLength: number;
            maxLength: number;
        };
        validateEnum: {
            enum: (string | {
                x: number;
            })[];
        };
        validateDependencies1: {
            type: string;
            properties: {
                a: {
                    type: string;
                };
                b: {
                    type: string;
                };
            };
            dependencies: {
                a: string;
            };
        };
        validateDependencies2: {
            type: string;
            properties: {
                a: {
                    type: string;
                };
                b: {
                    type: string;
                };
                c: {
                    type: string;
                };
            };
            dependencies: {
                a: string[];
            };
        };
        validateAnyOf: {
            anyOf: {
                type: string;
            }[];
        };
        validateAllOf: {
            allOf: ({
                type: string;
                enum?: undefined;
            } | {
                enum: boolean[];
                type?: undefined;
            })[];
        };
        validateOneOf: {
            oneOf: {
                type: string;
            }[];
        };
        validateReference: {
            $ref: string;
        };
    };
}
export interface Nestedata {
    oneOf: ({
        type: string;
        minLength: number;
        maxLength: number;
    } | {
        type: string;
        maxLength: number;
        minLength?: undefined;
    } | {
        type: string;
        minLength?: undefined;
        maxLength?: undefined;
    })[];
}
export interface RewriteData {
    rewrite: (instance: string, schema: Schema) => string | Date;
}
export interface PreProData {
    preValidateProperty: (object: string, key: string, schema: Schema, options: string, ctx: Schema) => void;
}
export interface PrePro {
    properties: {
        name: {
            type: string;
        };
        quantity: {
            type: string;
        };
    };
}
export interface SkipAtter {
    id: string;
    type: string;
    properties: {
        name: {
            type: string;
        };
        sex: {
            type: string;
            minimum: number;
        };
        votes: {
            type: string;
            minimum: number;
        };
    };
}
export interface ObjectTest {
    required: string[];
    properties: {
        constructor: {
            type: string;
        };
    };
}
export interface SkipBute {
    name: string;
    sex: number;
    votes: number;
}
export interface Reference {
    items: {
        $ref: string;
    };
    definitions: {
        items: {
            $id: string;
            type: string;
        };
    };
}
export interface PathDeve {
    items: {
        $ref: string;
    };
    definitions: {
        items: {
            type: string;
        };
    };
}
export interface Fragment {
    $id: string;
    items: {
        $ref: string;
    };
    type: string;
}
export interface Filename {
    $id: string;
    items: {
        $ref: string;
    };
    type: string;
}
export interface MixedSchema {
    type: string;
    properties: {
        name: {
            type: string;
        };
        lines: {
            type: string;
            items: {
                type: string;
                format: string;
            };
        };
    };
}
export interface Exising {
    type: string;
    properties: {
        name: {
            type: string;
        };
        nested: any;
    };
    additionalProperties: {
        type: string;
    };
}
export interface ExsiUndefit {
    type: string;
    patternProperties: {
        name: {
            type: string;
        };
        nested: any;
    };
    additionalProperties: {
        type: string;
    };
}
export let oneOfSchemadata = {
    oneOf: [
        { type: 'string' },
        { enum: [0, 1] },
        { type: 'object', required: ['type'] },
        { type: 'object', required: ['name'] },
    ],
};
export let ength = {
    type: 'string', minLength: 5
};
export let scrison = {
    description: 'some text'
};
export let objectneste = {
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        nested: {
            type: 'string'
        },
    },
    additionalProperties: false,
};
export let extra = {
    name: 'test', nested: 'test2', extraProp: 1
};
export let objectaddition = {
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        nested: {
            type: 'string'
        },
    },
    additionalProperties: {
        type: 'number'
    },
};
export let extradata = {
    name: 'test', nested: 'test2', extraProp: '1'
};
export let objectschema = {
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        nested: undefined,
    },
    additionalProperties: {
        type: 'number'
    },
};
export let nestobj = {
    name: 'test', nested: 2
};
export let additionalschema = {
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        nested: null,
    },
    additionalProperties: {
        type: 'number'
    },
};
export let ternProperschema = {
    type: 'object',
    patternProperties: {
        name: {
            type: 'string'
        },
        nested: undefined,
    },
    additionalProperties: {
        type: 'number'
    },
};
export let objectschemanull = {
    type: 'object',
    patternProperties: {
        name: {
            type: 'string'
        },
        nested: null,
    },
    additionalProperties: {
        type: 'number'
    },
};
export let wrong = {
    // @ts-ignore
    wrong_root: payment
};
export let objectIdSchemadata = {
    type: "object",
    id: "MongoDb#ObjectId",
    description: "MongoDB ObjectID",
    properties: {
        id: { type: "string" },
        _bsontype: { type: "string" },
    },
};
export let unionschema = {
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
export let excdata = {
    class: 'testing...', message: 'this is only a test'
};
export let ForNumber = { type: ['number', 'string'] };
export let ForNull = {
    type: ['null', 'string']
};
export let alidateFo = {
    type: ['null', {
            $ref: 'Test#Simple'
        }]
};
export let alidate = {
    type: [{
            type: 'string', pattern: '^\\*$'
        }, {
            $ref: 'Test#Num'
        }]
};
export let unitonschema = {
    type: "object",
    properties: {
        wildcards: {
            type: "array",
            items: {
                type: [{
                        $ref: "MongoDb#ObjectId"
                    }, {
                        type: "string", pattern: "^\\*$"
                    }]
            },
        },
    },
};
export let orArra = {
    wildcards: ['*']
};
export let Emptyschema = {
    type: "object",
    properties: {
        wildcards: {
            type: "array",
            items: {
                type: [{
                        $ref: "MongoDb#ObjectId"
                    }, {
                        type: "string", pattern: "^\\*$"
                    }]
            },
        },
    },
};
export let mptysc = {
    wildcards: []
};
export let wildcarschema = {
    type: "object",
    properties: {
        wildcards: {
            type: "array",
            items: {
                type: [{
                        $ref: "MongoDb#ObjectId"
                    }, {
                        type: "string", pattern: "^\\*$"
                    }]
            },
        },
    },
};
export let validtaschema = {
    type: 'number',
    oneMillionErrors: true,
};
export let validschema = {
    properties: {
        a: {
            type: 'number'
        },
        b: {
            type: 'number'
        },
    },
};
export let valid = {
    a: 0, b: 0
};
export let invalid = {
    a: null, b: null
};
export let worldinstance = {
    frames: [{
            filename: 'somefile.js', lineno: {
                hello: 'world'
            }
        }], exception: excdata
};
export let nullinstance = {
    frames: [{
            filename: 'somefile.js', lineno: null
        }], exception: excdata
};
export let wildcard = {
    wildcards: [{
            id: "1234", _bsontype: "test"
        }, '*']
};
