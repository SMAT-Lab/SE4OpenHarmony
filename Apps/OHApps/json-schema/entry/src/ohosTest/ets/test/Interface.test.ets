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

import { scan, SchemaError, SchemaScanResult, validate, ValidationError, Validator, ValidatorResult } from '@ohos/jsonschema'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@ohos/hypium'
import { Options,ObjectSchema } from './IntertfaceData';

let validator: ESObject;
const BASE_COUNT = 1
let stringSchema:Options ={ 'const': 'value' };
let objectSchema:ObjectSchema ={ 'const': { "some key": [null, "1", 2, true] } };

export default function interfaceTest() {
  describe('interfaceTest', () => {
    beforeAll(() => {
    })
    beforeEach(() => {
      validator = new Validator();
    })
    afterEach(() => {
    })
    afterAll(() => {
    })
    it('Validator', 0, () => {
      expect(typeof Validator).assertEqual('function')
    });

    it('ValidatorResult', 0, () => {
      expect(typeof ValidatorResult).assertEqual('function')
    });

    it('ValidationError', 0, () => {
      expect(typeof ValidationError).assertEqual('function')
    });

    it('SchemaError', 0, () => {
      expect(typeof SchemaError).assertEqual('function')
    });

    it('SchemaScanResult', 0, () => {
      expect(typeof SchemaScanResult).assertEqual('function')
    });

    it('scan', 0, () => {
      expect(typeof scan).assertEqual('function')
    });

    it('validate', 0, () => {
      expect(typeof validate).assertEqual('function')
    });
  })
}