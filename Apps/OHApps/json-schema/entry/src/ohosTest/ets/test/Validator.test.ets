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

import {
  Schema,
  SchemaError, validate, ValidationError, Validator, ValidatorResult, ValidatorResultError } from '@ohos/jsonschema'
import { it as _it, afterAll, afterEach, beforeAll, beforeEach, describe, expect } from '@ohos/hypium'
import {
  Filename,
  Fragment,
  Invalid,
  invalid,
  Options,
  PathDeve,
  Reference,
  schemavaldator,
  ThrowError,
  valid,
  validschema,
  validtaschema } from './IntertfaceData';

let validator: ESObject;
const BASE_COUNT = 1

let n='http://example.com/base.json';

export default function validatorTest() {
  describe('validatorTest', () => {
    beforeAll(() => {
    })
    beforeEach(() => {
      validator = new Validator();
    })
    afterEach(() => {
    })
    afterAll(() => {
    })

    _it('initial value', 0, () => {
      expect(validator.unresolvedRefs).assertDeepEquals([])
    });
    _it('addSchema', 0, () => {
      let result:Object  = validator.addSchema({
        id: 'http://example.com/base.json',
        items: {
          $ref: 'item.json',
        },
      });
      expect(validator.unresolvedRefs).assertDeepEquals(['http://example.com/item.json'])
    });

    _it('argument schema must be a schema object', 0, () => {
      let result :Object= validator.addSchema(new Object(), 'http://example.com/base.json');
      expect(validator.schemas['http://example.com/base.json']).assertDeepEquals(new Object())
    });
    // TODO: held for major version upgrade
    _it('argument schema must be a schema true', 0, () => {
      validator.addSchema(true, 'http://example.com/base.json');
      expect(validator.schemas['http://example.com/base.json']).assertEqual(undefined)
    });
    // TODO: held for major version upgrade
    _it('argument schema must be a schema false', 0, () => {
      validator.addSchema(false, 'http://example.com/base.json');
      expect(validator.schemas['http://example.com/base.json']).assertEqual(undefined)
    });
    _it('argument schema must be a schema null', 0, () => {
      let res :Object= validator.addSchema(undefined, 'http://example.com/base.json');
      expect(res).assertEqual(null);
      let result =  validator.schemas.n!=undefined
      expect(result).assertFalse();
    });
    _it('argument schema must be a schema undefined', 0, () => {
      let res:Object = validator.addSchema(undefined, 'http://example.com/base.json');
      expect(res).assertEqual(null);
      let result =  validator.schemas.n!=undefined
      expect(result).assertFalse();
    });
    // TODO: held for major version upgrade
    _it('argument schema must not be a number', 0, () => {
      try {
        validator.addSchema(1, 'http://example.com/base.json');
      } catch (err) {
        expect(err instanceof Error).assertTrue()
      }
    });
    // TODO: held for major version upgrade
    _it('argument schema must not be a string', 0, () => {
      try {
        validator.addSchema("schema", 'http://example.com/base.json');
      } catch (err) {
        expect(err instanceof Error).assertTrue()
      }
    });
    // TODO: held for major version upgrade
    _it('argument schema must not be null', 0, () => {
      try {
        validator.addSchema(null, 'http://example.com/base.json');
      } catch (err) {
        expect(err instanceof Error).assertTrue()
      }
    });
    // TODO: held for major version upgrade
    _it('argument schema must not be undefined', 0, () => {
      try {
        validator.addSchema(undefined, 'http://example.com/base.json');
      } catch (err) {
        expect(err instanceof Error).assertTrue()
      }
    });
    _it('addSchema with absolute id', 0,  ()=>{
      validator.addSchema({
        id: 'http://example.com/base.json'
      });
      expect(validator.unresolvedRefs).assertDeepEquals([])
      expect(validator.schemas['http://example.com/base.json']).assertDeepEquals({
        id: 'http://example.com/base.json'
      })
    });
    _it('addSchema with absolute $id', 0, () => {
      validator.addSchema({
        $id: 'http://example.com/base.json',
      });
      expect(validator.unresolvedRefs).assertDeepEquals([])
    });
    // TODO: held for next major version
    _it('base must be a full URI', 0, () => {
      try {
        validator.addSchema({
          id: 'main.json'
        }, '/index.json');
      } catch (err) {
        expect(err instanceof SchemaError).assertTrue()
      }
    });
    _it('addSchema with absolute base', 0, () => {
      expect(validator.addSchema({type: 'string'}, 'http://example.com/main.json')).not().assertNull();
      expect( validator.schemas.n==undefined).assertTrue();
      // expect('http://example.com/main.json' in validator.schemas).assertTrue();
      expect(validator.schemas['http://example.com/main.json']).assertDeepEquals(validator.addSchema({type: 'string'}, 'http://example.com/main.json'))
    });
    _it('addSchema with absolute $id', 0, () => {
      let res :Object= validator.addSchema({
        type: 'string'
      }, 'http://example.com/main.json');
      expect(res).not().assertNull();
      expect(validator.schemas.n==undefined).assertTrue();
      expect(validator.schemas['http://example.com/main.json']).assertDeepEquals(res)
    });
    _it('addSchema with relative id', 0, () => {
      let res:Object = validator.addSchema({
        id: 'main.json'
      }, 'http://example.com/index.html');
      // assert(res);
      expect(validator.schemas.n==undefined).assertTrue();
    });
    _it('addSchema with relative $id', 0, () => {
      let res :Object= validator.addSchema({
        $id: 'main.json'
      }, 'http://example.com/index.html');
      // assert(res);
      expect(validator.schemas.n==undefined).assertTrue();
    });
    _it('addSchema populates unresolvedRefs', 0, () => {
      validator.addSchema({
        $id: 'main.json',
        items: {
          $ref: 'item.json',
        },
      }, 'http://example.com/index.json');
      expect(validator.schemas.n==undefined).assertTrue();
      expect(validator.unresolvedRefs[0]).assertDeepEquals('http://example.com/item.json')
      validator.addSchema({
        $id: 'item.json'
      }, 'http://example.com/index.json');
      expect(validator.unresolvedRefs.length).assertEqual(0)
    });
    _it('schema may be an object', 0, () => {
      expect(validator.validate(true, new Object()).valid).assertTrue()
    });
    _it('schema may be true', 0, () => {
      expect(validator.validate(true, true).valid).assertTrue()
    });
    _it('schema may be false', 0, () => {
      expect(validator.validate(true, false).valid).assertFalse()
    });
    _it('schema cannot be null', 0, () => {
      try {
        validator.validate(true, null);
      } catch (err) {
        expect(err instanceof SchemaError).assertTrue();
        expect(err.message.indexOf('object or boolean') >= 0).assertTrue();
      }

    });
    _it('schema cannot be undefined', 0, () => {
      try {
        validator.validate(true, undefined);
      } catch (err) {
        expect(err instanceof SchemaError).assertTrue();
        expect(err.message.indexOf('object or boolean') >= 0).assertTrue();
      }
    });
    _it('schema cannot be a string', 0, () => {
      try {
        validator.validate(true, "string");
      } catch (err) {
        expect(err instanceof SchemaError).assertTrue();
        expect(err.message.indexOf('object or boolean') >= 0).assertTrue();
      }
    });
    _it('options may be undefined', 0, () => {
      expect(validator.validate(null, true, undefined).valid).assertTrue();
    });
    _it('options may be null', 0, () => {
      expect(validator.validate(null, true, null).valid).assertTrue();
    });
    _it('options.base must be a string', 0, () => {
      expect(validator.validate(null, true, null).valid).assertTrue();
    });
    _it('options.required with defined instance', 0, () => {
      expect(validator.validate(undefined, true, {required: true}).valid).assertFalse();
      expect(validator.validate(undefined, true, {required: true}).errors[0].message.indexOf('required') >= 0).assertTrue();
      expect(validator.validate(null, true, {required: true}).valid).assertTrue();
    });
    _it('options.required with undefined instance', 0, () => {
      expect(validator.validate(undefined, true, {required: true}).valid).assertFalse()
      expect(validator.validate(undefined, true, {required: true}).errors[0].message.indexOf('required') >= 0).assertTrue();
      expect(validator.validate(null, true, {required: true}).valid).assertTrue();
    });
    _it('options.required is false', 0, () => {
      expect(validator.validate(undefined, true, {required: false}).valid).assertTrue();
      expect(validator.validate(null, true, {required: true}).valid).assertTrue()
    });
    _it('options.required defaults false', 0, () => {
      // TODO DEPRECATED: this behavior changes to true in next major version
      expect(validator.validate(undefined, true, new Object()).valid).assertTrue();
      expect(validator.validate(null, true, {required: true}).valid).assertTrue()
    });
    _it('options throwError', 0, () => {
      let schema:ThrowError = {
        properties: {
          "a": {
            type: 'number'
          },
          "b": {
            type: 'number'
          },
        },
      };
      let valid :Options= {
        a: 0, b: 0
      };
      let invalid :Invalid= {
        a: null, b: null
      };
      expect(validator.validate(valid, schema, new Object()).valid).assertTrue();
      expect(validator.validate(invalid, schema, new Object()).valid).assertFalse()
      try {
        validator.validate(invalid, schema, {
          throwError: true
        });
      } catch (err) {
        expect(err instanceof ValidationError).assertTrue()
      }
    });
    _it('options throwFirst', 0, () => {
      let schema:ThrowError = {
        properties: {
          "a": {
            type: 'number'
          },
          "b": {
            type: 'number'
          },
        },
      };
      let valid :Options= {
        a: 0, b: 0
      };
      let invalid :Invalid= {
        a: null, b: null
      };
      expect(validator.validate(valid, schema, {throwAll: true}).valid).assertTrue();
      expect(validator.validate(invalid, schema, new Object()).valid).assertFalse()
      try {
        validator.validate(invalid, schema, {
          throwFirst: true
        });
      } catch (err) {
        expect(err instanceof Error).assertTrue()
        expect(err instanceof ValidatorResultError).assertTrue()
        expect(err.errors.length).assertEqual(1)
      }
    });
    _it('options throwAll', 0, () => {
      let schema:ThrowError = {
        properties: {
          "a": {
            type: 'number'
          },
          "b": {
            type: 'number'
          },
        },
      };
      let valid :Options= {
        a: 0, b: 0
      };
      let invalid :Invalid= {
        a: null, b: null
      };

      expect(validator.validate(valid, schema, {throwAll: true}).valid).assertTrue();
      expect( validator.validate(invalid, schema, new Object()).valid).assertFalse()

      try {
        validator.validate(invalid, schema, {
          throwAll: true
        });
      } catch (err) {
        expect(err instanceof Error).assertTrue()
        expect(err instanceof ValidatorResultError).assertTrue()
        expect(err.errors.length).assertEqual(2)
      }
    });
    _it('million errors', 0, () => {
    validator.attributes.oneMillionErrors =  (instance:ESObject, schema:ESObject, options:ESObject, ctx:ESObject):ESObject=> {
      const result:ESObject = new ValidatorResult(instance, schema, options, ctx);
      for (let i = 0; i < 1000; i++) {
        result.addError('oneMillionErrors error');
      }
      return result;
    }
    let res :ESObject= validator.validate(1, {
      type: 'number',
      oneMillionErrors: true,
    }, {});
    expect(res.valid).assertFalse();
    expect(res.errors.length).assertEqual(1000)
  });
    _it('subschema references named reference', 0, () => {
      let schema :Reference = {
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
      expect(validator.validate([[]], schema).valid).assertTrue();
      expect(validator.validate([null], schema).valid).assertFalse();
    });
    _it('subschema references path reference', 0, () => {
      let schema :PathDeve  = {
        items: {
          $ref: '#/definitions/items'
        },
        definitions: {
          items: {
            type: 'array',
          },
        },
      };
      expect(validator.validate([[]], schema).valid).assertTrue();
      expect(validator.validate([null], schema).valid).assertFalse();
    });
    _it('recursive references fragment reference', 0, () => {
      let schema :Fragment= {
        $id: 'http://example.com/foo.json',
        items: {
          $ref: '#'
        },
        type: 'array',
      };
      expect(validator.validate([[[[]]]], schema).valid).assertTrue();
      expect(validator.validate([null], schema).valid).assertFalse();
    });
    _it('recursive references filename reference', 0, () => {
      let  schema :Filename= {
        $id: 'http://example.com/foo.json',
        items: {
          $ref: 'foo.json'
        },
        type: 'array',
      };
      expect(validator.validate([[[[]]]], schema).valid).assertTrue();
      expect(validator.validate([null], schema).valid).assertFalse();
    });


  })
}