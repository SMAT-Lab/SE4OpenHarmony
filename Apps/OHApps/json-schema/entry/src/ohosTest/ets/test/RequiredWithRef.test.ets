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

import { SchemaError, validate, ValidationError, Validator, ValidatorResult } from '@ohos/jsonschema'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@ohos/hypium'
import buffer from '@ohos.buffer';

import schema from '../../json-metaschema/data_schema.json'

import types from '../../json-metaschema/types.json'

import data from '../../json-metaschema/data.json'
import { wrong } from './IntertfaceData';
import { amou } from './DataFormat';


let validator: ESObject
const BASE_COUNT = 1

interface Payam {
  amout?: String | Number
  amount?: number;
  other_amount: number;
  usage: string;

}

let payment: Payam

export default function requiredWithRefTest() {
  describe('requiredWithRefTest', () => {


    beforeAll(() => {
    })
    beforeEach(async () => {
      validator = new Validator();
      validator.addSchema(types, '/types.json');
      payment = data.payment;
    })
    afterEach(() => {
    })
    afterAll(() => {
    })


    it('ShouldValidate', 0, async () => {
      let result: boolean = validator.validate(data, schema).valid
      expect(result).assertTrue();
    });
    it('WithWrongRootNodeSchouldNotBeValid', 0, async () => {
      let result: boolean = validator.validate({
        wrong_root: payment
      }, schema).valid
      expect(result).assertFalse();
    });
    it('Test1', 0, async () => {
      payment.amount = 1;
      let result: boolean = validator.validate(data, schema).valid
      expect(result).assertTrue();
    });
    it('Test1000000000', 0, async () => {
      payment.amount = 1000000000;
      let result: boolean = validator.validate(data, schema).valid
      expect(result).assertTrue();
    });
    it('Missing', 0, async () => {
      amou(payment)
      let result: boolean = validator.validate(data, schema).valid
      expect(result).assertFalse();
    });
    it('Test1.2', 0, async () => {
      payment.amout = 1.2;
      let result: boolean = validator.validate(data, schema).valid
      expect(result).assertFalse();
    });
    it('Test0', 0, async () => {
      payment.amout = 0;
      let result: boolean = validator.validate(data, schema).valid
      expect(result).assertFalse();
    });
    it('TestMinus1', 0, async () => {
      payment.amout = -1;
      let result: boolean = validator.validate(data, schema).valid
      expect(result).assertFalse();
    });
    it('TestMinus1.2', 0, async () => {
      payment.amout = -1.2;
      let result: boolean = validator.validate(data, schema).valid
      expect(result).assertFalse();
    });
    it('Foo', 0, async () => {
      payment.amout = 'foo';
      let result: boolean = validator.validate(data, schema).valid
      expect(result).assertFalse();
    });
  })
}