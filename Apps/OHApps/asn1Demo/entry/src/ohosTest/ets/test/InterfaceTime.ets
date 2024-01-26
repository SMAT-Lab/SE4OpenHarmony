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

import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect, TestType } from '@ohos/hypium';
import { JSONSerializer, JSONDeserializer, Universal } from '@ohos/asn1'
import asn1js from "@fortanix/asn1js"
import { DERSerializer, DERDeserializer } from '@ohos/asn1-der';
import { btoa, atob } from 'Base64'
import { encode, decode } from 'hex-encode-decode'
import {
  LocalBaseBlock,
  arrayBufferToString,
  bufferToHexCodes,
  checkBufferParams,
  fromBase64,
  getParametersValue,
  getUTCDate,
  isEqualBuffer,
  nearestPowerOf2,
  padNumber,
  stringToArrayBuffer,
  toBase64,
  utilConcatBuf,
  utilConcatView,
  utilFromBase,
  utilToBase
} from 'pvutils'


let sequence: Universal.Sequence;

export default function InterfaceTime() {
  describe('InterfaceTime', () => {
    const BASE_COUNT = 2000
    const BASELINE_CREATEHTTP = 2000

    beforeAll(() => {
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

    it("JSONSerializer", TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let serialize: JSONSerializer = new JSONSerializer();
      for (let index = 0; index < BASE_COUNT; index++) {
        let json: string = serialize(sequence);
      }
      let endTime = new Date().getTime()
      console.log("asn1.JSONSerializer:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("asn1.JSONSerializer:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it("JSONDeserializer", TestType.PERFORMANCE, async (done: Function) => {
      let serialize: JSONSerializer = new JSONSerializer();
      let json: string = serialize(sequence);
      let startTime = new Date().getTime()
      const deserialize: JSONDeserializer = new JSONDeserializer();
      for (let index = 0; index < BASE_COUNT; index++) {
        const asn1ObjectModel: ESObject = deserialize(json);
      }
      let endTime = new Date().getTime()
      console.log("asn1.JSONDeserializer:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("asn1.JSONDeserializer:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it('DERSerializer', TestType.PERFORMANCE, async (done: Function) => {
      const serialize: ESObject = new DERSerializer();
      const asn1Sequence: ESObject = new Universal.Sequence([
        new Universal.Integer(123),
        new Universal.PrintableString('Hello World'),
      ]);
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        const bufferContainingDEREncodedASN1: ESObject = serialize(asn1Sequence);
      }
      let endTime = new Date().getTime()
      console.log("asn1_der.DERSerializer:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("asn1_der.DERSerializer:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it('DERDeserializer', TestType.PERFORMANCE, async (done: Function) => {
      const serialize: ESObject = new DERSerializer();
      const asn1Sequence: ESObject = new Universal.Sequence([
        new Universal.Integer(123),
        new Universal.PrintableString('Hello World'),
      ]);
      const bufferContainingDEREncodedASN1: ESObject = serialize(asn1Sequence);
      expect(bufferContainingDEREncodedASN1).not().assertNull();
      const deserialize: ESObject = new DERDeserializer();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        const des: ESObject = deserialize(bufferContainingDEREncodedASN1);
      }
      let endTime = new Date().getTime()
      console.log("asn1_der.DERDeserializer:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("asn1_der.DERDeserializer:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it('Boolean_BER', TestType.PERFORMANCE, async (done: Function) => {
      const asn: ESObject = new asn1js.Boolean({
        value: true,
      });
      const ber: ESObject = asn.toBER();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        const asnParsed: ESObject = asn1js.fromBER(ber);
      }
      let endTime = new Date().getTime()
      console.log("asn1js.Boolean.fromBER:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("asn1js.Boolean.fromBER:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it('BmpString_BER', TestType.PERFORMANCE, async (done: Function) => {
      const testValue = "test message текст"
      const asn: ESObject = new asn1js.BmpString({
        value: testValue,
      });

      const ber: ESObject = asn.toBER();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        const asnParsed: ESObject = asn1js.fromBER(ber);
      }

      let endTime = new Date().getTime()
      console.log("asn1js.BmpString.fromBER:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("asn1js.BmpString.fromBER:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it('BitString_BER', TestType.PERFORMANCE, async (done: Function) => {
      const asn: ESObject = new asn1js.BitString({
        value: [
          new asn1js.BitString({
            valueHex: new Uint8Array([0x01])
          }),
          new asn1js.BitString({
            valueHex: new Uint8Array([0x02])
          })
        ]
      });

      const ber: ESObject = asn.toBER();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        const asnParsed: ESObject = asn1js.fromBER(ber);
      }

      let endTime = new Date().getTime()
      console.log("asn1js.BitString.fromBER:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("asn1js.BitString.fromBER:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it('Integer_BER', TestType.PERFORMANCE, async (done: Function) => {
      const asn: ESObject = new asn1js.Integer({
        value: 97196,
        valueHex: new Uint8Array([0x01, 0x7b, 0xac]),
      });
      const ber: ESObject = asn.toBER();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        const asnParsed: ESObject = asn1js.fromBER(ber);
      }

      let endTime = new Date().getTime()
      console.log("asn1js.Integer.fromBER:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("asn1js.Integer.fromBER:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it('CharacterString_BER', TestType.PERFORMANCE, async (done: Function) => {
      const testString = "some string";
      const asn: ESObject = new asn1js.CharacterString({
        value: testString,
      });

      const ber: ESObject = asn.toBER();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        const asnParsed: ESObject = asn1js.fromBER(ber);
      }

      let endTime = new Date().getTime()
      console.log("asn1js.CharacterString.fromBER:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("asn1js.CharacterString.fromBER:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it('UniversalString_BER', TestType.PERFORMANCE, async (done: Function) => {
      const testString = "My test text";
      const asn: ESObject = new asn1js.UniversalString({
        value: testString,
      });

      const ber: ESObject = asn.toBER();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        const asnParsed: ESObject = asn1js.fromBER(ber);
      }

      let endTime = new Date().getTime()
      console.log("asn1js.UniversalString.fromBER:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("asn1js.UniversalString.fromBER:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it('Utf8String_BER', TestType.PERFORMANCE, async (done: Function) => {
      const testString = "My test Utf8String";
      const asn: ESObject = new asn1js.Utf8String({
        value: testString,
      });
      const ber: ESObject = asn.toBER();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        const asnParsed: ESObject = asn1js.fromBER(ber);
      }
      let endTime = new Date().getTime()
      console.log("asn1js.Utf8String.fromBER:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("asn1js.Utf8String.fromBER:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it('DATE_BER', TestType.PERFORMANCE, async (done: Function) => {
      const testString = "2000-01-02";
      const asn: ESObject = new asn1js.DATE({
        value: testString,
      });
      const ber: ESObject = asn.toBER();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        const asnParsed: ESObject = asn1js.fromBER(ber);
      }
      let endTime = new Date().getTime()
      console.log("asn1js.DATE.fromBER:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("asn1js.DATE.fromBER:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it('DateTime_BER', TestType.PERFORMANCE, async (done: Function) => {
      const testString = "2000-01-02 12:00";
      const asn: ESObject = new asn1js.DateTime({
        value: testString,
      });
      const ber: ESObject = asn.toBER();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        const asnParsed: ESObject = asn1js.fromBER(ber);
      }
      let endTime = new Date().getTime()
      console.log("asn1js.DateTime.fromBER:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("asn1js.DateTime.fromBER:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it('Duration_BER', TestType.PERFORMANCE, async (done: Function) => {
      const testString = "1000";
      const asn: ESObject = new asn1js.Duration({
        value: testString,
      });
      const ber: ESObject = asn.toBER();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        const asnParsed: ESObject = asn1js.fromBER(ber);
      }
      let endTime = new Date().getTime()
      console.log("asn1js.Duration.fromBER:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("asn1js.Duration.fromBER:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it('GeneralString_BER', TestType.PERFORMANCE, async (done: Function) => {
      const testString = "some text";
      const asn: ESObject = new asn1js.GeneralString({
        value: testString,
      });
      const ber: ESObject = asn.toBER();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        const asnParsed: ESObject = asn1js.fromBER(ber);
      }
      let endTime = new Date().getTime()
      console.log("asn1js.GeneralString.fromBER:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("asn1js.GeneralString.fromBER:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it('GraphicString_BER', TestType.PERFORMANCE, async (done: Function) => {
      const testString = "some text";
      const asn: ESObject = new asn1js.GraphicString({
        value: testString,
      });
      const ber: ESObject = asn.toBER();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        const asnParsed: ESObject = asn1js.fromBER(ber);
      }
      let endTime = new Date().getTime()
      console.log("asn1js.GraphicString.fromBER:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("asn1js.GraphicString.fromBER:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it('NumericString_BER', TestType.PERFORMANCE, async (done: Function) => {
      const testString = "1234567890";
      const asn: ESObject = new asn1js.NumericString({
        value: testString,
      });
      const ber: ESObject = asn.toBER();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        const asnParsed: ESObject = asn1js.fromBER(ber);
      }
      let endTime = new Date().getTime()
      console.log("asn1js.NumericString.fromBER:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("asn1js.NumericString.fromBER:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it('ObjectIdentifier_BER', TestType.PERFORMANCE, async (done: Function) => {
      const testString = "0.2.3.4.5";
      const asn: ESObject = new asn1js.ObjectIdentifier({
        value: testString,
      });
      const ber: ESObject = asn.toBER();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        const asnParsed: ESObject = asn1js.fromBER(ber);
      }
      let endTime = new Date().getTime()
      console.log("asn1js.ObjectIdentifier.fromBER:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("asn1js.ObjectIdentifier.fromBER:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it('OctetString_BER', TestType.PERFORMANCE, async (done: Function) => {
      const asn: ESObject = new asn1js.OctetString({
        value: [
          new asn1js.OctetString({
            valueHex: new Uint8Array([0x01])
          }),
          new asn1js.OctetString({
            valueHex: new Uint8Array([0x02])
          }),
        ]
      });

      const ber: ESObject = asn.toBER();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        const asnParsed: ESObject = asn1js.fromBER(ber);
      }
      let endTime = new Date().getTime()
      console.log("asn1js.OctetString.fromBER:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("asn1js.OctetString.fromBER:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it('Null_BER', TestType.PERFORMANCE, async (done: Function) => {
      const asn: ESObject = new asn1js.Null({
        name: "block2",
      });

      const ber: ESObject = asn.toBER();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        const asnParsed: ESObject = asn1js.fromBER(ber);
      }

      let endTime = new Date().getTime()
      console.log("asn1js.Null.fromBER:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("asn1js.Null.fromBER:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it('Sequence_BER', TestType.PERFORMANCE, async (done: Function) => {
      const asn: ESObject = new asn1js.Sequence({
        name: "block1",
        value: [
          new asn1js.Null({
            name: "block2"
          }),
          new asn1js.Integer({
            name: "block3",
            optional: true
          }),
        ]
      });

      const ber: ESObject = asn.toBER();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        const asnParsed: ESObject = asn1js.fromBER(ber);
      }

      let endTime = new Date().getTime()
      console.log("asn1js.Sequence.fromBER:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("asn1js.Sequence.fromBER:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it('encode', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        btoa('hello')
      }

      let endTime = new Date().getTime()
      console.log("BASE64.btoa:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("BASE64.btoa:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it('decode', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        atob('aGVsbG8=')
      }

      let endTime = new Date().getTime()
      console.log("BASE64.atob:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("BASE64.atob:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it('hex_encode', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        encode('hello')
      }

      let endTime = new Date().getTime()
      console.log("hex.encode:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("hex.encode:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });
    it('hex_decode', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        decode('68656c6c6f')
      }

      let endTime = new Date().getTime()
      console.log("hex.decode:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("hex.decode:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it("getUTCDate", TestType.PERFORMANCE, async (done: Function) => {
      const date = new Date();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        getUTCDate(date)
      }

      let endTime = new Date().getTime()
      console.log("pvutils.getUTCDate:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("pvutils.getUTCDate:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });
    it("getParametersValue", TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        getParametersValue({
          name: 33
        }, "fake", 2)
      }

      let endTime = new Date().getTime()
      console.log("pvutils.getParametersValue:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("pvutils.getParametersValue:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });
    it("bufferToHexCodes", TestType.PERFORMANCE, async (done: Function) => {
      const data = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A]);
      let ab: ArrayBuffer = data.buffer.slice(0, data.buffer.byteLength)
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        bufferToHexCodes(ab, 1, 3, true)
      }

      let endTime = new Date().getTime()
      console.log("pvutils.bufferToHexCodes:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("pvutils.bufferToHexCodes:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });
    it("checkBufferParams", TestType.PERFORMANCE, async (done: Function) => {
      const baseBlock = {} as LocalBaseBlock;
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        checkBufferParams(baseBlock, 1 as ESObject, 1, 1)
      }

      let endTime = new Date().getTime()
      console.log("pvutils.checkBufferParams:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("pvutils.checkBufferParams:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });
    it("utilFromBase", TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        utilFromBase(new Uint8Array([0x01]), 7)
      }

      let endTime = new Date().getTime()
      console.log("pvutils.utilFromBase:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("pvutils.utilFromBase:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });
    it("utilToBase", TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        utilToBase(16513, 7, 0)
      }

      let endTime = new Date().getTime()
      console.log("pvutils.utilToBase:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("pvutils.utilToBase:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });
    it("utilConcatBuf", TestType.PERFORMANCE, async (done: Function) => {
      const data = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A]);
      let ab: ArrayBuffer = data.buffer.slice(0, data.buffer.byteLength)
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        utilConcatBuf(ab, ab, ab)
      }

      let endTime = new Date().getTime()
      console.log("pvutils.utilConcatBuf:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("pvutils.utilConcatBuf:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });
    it("utilConcatView", TestType.PERFORMANCE, async (done: Function) => {
      const data = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A]);
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        utilConcatView(data, data, data)
      }

      let endTime = new Date().getTime()
      console.log("pvutils.utilConcatView:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("pvutils.utilConcatView:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });
    it("isEqualBuffer", TestType.PERFORMANCE, async (done: Function) => {
      const data = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A]);
      let ab: ArrayBuffer = data.buffer.slice(0, data.buffer.byteLength)
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isEqualBuffer(ab, ab)
      }

      let endTime = new Date().getTime()
      console.log("pvutils.isEqualBuffer:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("pvutils.isEqualBuffer:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });
    it("padNumber", TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        padNumber(1, -1)
      }

      let endTime = new Date().getTime()
      console.log("pvutils.padNumber:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("pvutils.padNumber:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });
    it("toBase64", TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        toBase64("\x00\x00\x01\x02\x03\x04\x05\x06\xFF\xFF\xFF\xFF\xFF", true, true, true)
      }

      let endTime = new Date().getTime()
      console.log("pvutils.toBase64:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("pvutils.toBase64:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });
    it("fromBase64", TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        fromBase64("AQIDBAUGBwj//w==")
      }

      let endTime = new Date().getTime()
      console.log("pvutils.fromBase64:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("pvutils.fromBase64:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()

    });
    it("arrayBufferToString", TestType.PERFORMANCE, async (done: Function) => {
      const data = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A]);
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        arrayBufferToString(data.buffer.slice(0, data.buffer.byteLength))
      }

      let endTime = new Date().getTime()
      console.log("pvutils.arrayBufferToString:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("pvutils.arrayBufferToString:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });
    it("stringToArrayBuffer", TestType.PERFORMANCE, async (done: Function) => {
      const data = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A]);
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        stringToArrayBuffer("\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0A")
      }

      let endTime = new Date().getTime()
      console.log("pvutils.stringToArrayBuffer:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("pvutils.stringToArrayBuffer:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });
    it("nearestPowerOf2", TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        nearestPowerOf2(7)
      }

      let endTime = new Date().getTime()
      console.log("pvutils.nearestPowerOf2:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("pvutils.nearestPowerOf2:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

  });
}