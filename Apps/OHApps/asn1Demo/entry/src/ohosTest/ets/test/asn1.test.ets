/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import {JSONSerializer,JSONDeserializer,Universal} from '@ohos/asn1'
let sequence:Universal.Sequence;
export default function Asn1Test() {
  describe('Asn1Test', ()=> {
    beforeAll(()=>{
      sequence = new Universal.Sequence([
        new Universal.Integer(-Number.MAX_SAFE_INTEGER),
        new Universal.Integer(Number.MAX_SAFE_INTEGER),
        new Universal.Integer('424242424242424242424242424242424242'), // big integer
        new Universal.Null(),
        new Universal.Bool(true),
        new Universal.PrintableString('nice marmot'),
        new Universal.PrintableString('@#$%!&*()!_=&'),
      ]);
    })
    it('JSONSerializer', 0, ()=> {
      let serialize:JSONSerializer= new JSONSerializer();
      expect(serialize).not().assertNull()
      let json:string = serialize(sequence);
      expect(json).not().assertNull()

    });
    it('JSONDeserializer', 0, ()=> {
      let serialize:JSONSerializer= new JSONSerializer();
      expect(serialize).not().assertNull()
      let json:string = serialize(sequence);
      expect(json).not().assertNull()
      const deserialize:JSONDeserializer = new JSONDeserializer();
      const asn1ObjectModel:ESObject = deserialize(json);
      expect(asn1ObjectModel).not().assertNull()
    });
  });
}