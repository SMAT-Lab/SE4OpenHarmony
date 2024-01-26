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
import { DERSerializer, DERDeserializer} from '@ohos/asn1-der';
import {Universal} from '@ohos/asn1'
export default function Asn1DerTest() {
  describe('Asn1DerTest', ()=> {

    it('DERSerializer', 0, ()=> {
      const serialize:ESObject = new DERSerializer();
      expect(serialize).not().assertNull();
      const asn1Sequence :ESObject= new Universal.Sequence([
        new Universal.Integer(123),
        new Universal.PrintableString('Hello World'),
      ]);
      expect(asn1Sequence).not().assertNull();
      const bufferContainingDEREncodedASN1:ESObject = serialize(asn1Sequence);
      expect(bufferContainingDEREncodedASN1).not().assertNull();
    });
    it('DERDeserializer', 0, ()=> {
      const serialize:ESObject = new DERSerializer();
      expect(serialize).not().assertNull();
      const asn1Sequence :ESObject= new Universal.Sequence([
        new Universal.Integer(123),
        new Universal.PrintableString('Hello World'),
      ]);
      expect(asn1Sequence).not().assertNull();
      const bufferContainingDEREncodedASN1:ESObject = serialize(asn1Sequence);

      expect(bufferContainingDEREncodedASN1).not().assertNull();
      const deserialize:ESObject = new DERDeserializer();
      expect(deserialize).not().assertNull();
      const des:ESObject = deserialize(bufferContainingDEREncodedASN1);
      expect(des).not().assertNull();
    });
  });
}