let __generate__Id: number = 0;
function generateId(): string {
    return "asn1js.test_" + ++__generate__Id;
}
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
import asn1js from "@fortanix/asn1js";
export default function Asn1JSTest() {
    describe('Asn1JSTest', () => {
        it('Boolean_BER', 0, () => {
            const asn: any = new asn1js.Boolean({
                value: true,
            });
            expect(asn).not().assertNull();
            const ber: any = asn.toBER();
            expect(ber).not().assertNull();
            const asnParsed: any = asn1js.fromBER(ber);
            expect(asnParsed).not().assertNull();
        });
        it('BmpString_BER', 0, () => {
            const testValue = "test message текст";
            const asn: any = new asn1js.BmpString({
                value: testValue,
            });
            expect(asn).not().assertNull();
            const ber: any = asn.toBER();
            expect(ber).not().assertNull();
            const asnParsed: any = asn1js.fromBER(ber);
            expect(asnParsed).not().assertNull();
        });
        it('BitString_BER', 0, () => {
            const asn: any = new asn1js.BitString({
                value: [
                    new asn1js.BitString({
                        valueHex: new Uint8Array([0x01])
                    }),
                    new asn1js.BitString({
                        valueHex: new Uint8Array([0x02])
                    })
                ]
            });
            expect(asn).not().assertNull();
            const ber: any = asn.toBER();
            expect(ber).not().assertNull();
            const asnParsed: any = asn1js.fromBER(ber);
            expect(asnParsed).not().assertNull();
        });
        it('Integer_BER', 0, () => {
            const asn: any = new asn1js.Integer({
                value: 97196,
                valueHex: new Uint8Array([0x01, 0x7b, 0xac]),
            });
            expect(asn).not().assertNull();
            const ber: any = asn.toBER();
            expect(ber).not().assertNull();
            const asnParsed: any = asn1js.fromBER(ber);
            expect(asnParsed).not().assertNull();
        });
        it('CharacterString_BER', 0, () => {
            const testString = "some string";
            const asn: any = new asn1js.CharacterString({
                value: testString,
            });
            expect(asn).not().assertNull();
            const ber: any = asn.toBER();
            expect(ber).not().assertNull();
            const asnParsed: any = asn1js.fromBER(ber);
            expect(asnParsed).not().assertNull();
        });
        it('UniversalString_BER', 0, () => {
            const testString = "My test text";
            const asn: any = new asn1js.UniversalString({
                value: testString,
            });
            expect(asn).not().assertNull();
            const ber: any = asn.toBER();
            expect(ber).not().assertNull();
            const asnParsed: any = asn1js.fromBER(ber);
            expect(asnParsed).not().assertNull();
        });
        it('Utf8String_BER', 0, () => {
            const testString = "My test Utf8String";
            const asn: any = new asn1js.Utf8String({
                value: testString,
            });
            expect(asn).not().assertNull();
            const ber: any = asn.toBER();
            expect(ber).not().assertNull();
            const asnParsed: any = asn1js.fromBER(ber);
            expect(asnParsed).not().assertNull();
        });
        it('DATE_BER', 0, () => {
            const testString = "2000-01-02";
            const asn: any = new asn1js.DATE({
                value: testString,
            });
            expect(asn).not().assertNull();
            const ber: any = asn.toBER();
            expect(ber).not().assertNull();
            const asnParsed: any = asn1js.fromBER(ber);
            expect(asnParsed).not().assertNull();
        });
        it('DateTime_BER', 0, () => {
            const testString = "2000-01-02 12:00";
            const asn: any = new asn1js.DateTime({
                value: testString,
            });
            expect(asn).not().assertNull();
            const ber: any = asn.toBER();
            expect(ber).not().assertNull();
            const asnParsed: any = asn1js.fromBER(ber);
            expect(asnParsed).not().assertNull();
        });
        it('Duration_BER', 0, () => {
            const testString = "1000";
            const asn: any = new asn1js.Duration({
                value: testString,
            });
            expect(asn).not().assertNull();
            const ber: any = asn.toBER();
            expect(ber).not().assertNull();
            const asnParsed: any = asn1js.fromBER(ber);
            expect(asnParsed).not().assertNull();
        });
        it('GeneralString_BER', 0, () => {
            const testString = "some text";
            const asn: any = new asn1js.GeneralString({
                value: testString,
            });
            expect(asn).not().assertNull();
            const ber: any = asn.toBER();
            expect(ber).not().assertNull();
            const asnParsed: any = asn1js.fromBER(ber);
            expect(asnParsed).not().assertNull();
        });
        it('GraphicString_BER', 0, () => {
            const testString = "some text";
            const asn: any = new asn1js.GraphicString({
                value: testString,
            });
            expect(asn).not().assertNull();
            const ber: any = asn.toBER();
            expect(ber).not().assertNull();
            const asnParsed: any = asn1js.fromBER(ber);
            expect(asnParsed).not().assertNull();
        });
        it('NumericString_BER', 0, () => {
            const testString = "1234567890";
            const asn: any = new asn1js.NumericString({
                value: testString,
            });
            expect(asn).not().assertNull();
            const ber: any = asn.toBER();
            expect(ber).not().assertNull();
            const asnParsed: any = asn1js.fromBER(ber);
            expect(asnParsed).not().assertNull();
        });
        it('ObjectIdentifier_BER', 0, () => {
            const testString = "0.2.3.4.5";
            const asn: any = new asn1js.ObjectIdentifier({
                value: testString,
            });
            expect(asn).not().assertNull();
            const ber: any = asn.toBER();
            expect(ber).not().assertNull();
            const asnParsed: any = asn1js.fromBER(ber);
            expect(asnParsed).not().assertNull();
        });
        it('OctetString_BER', 0, () => {
            const asn: any = new asn1js.OctetString({
                value: [
                    new asn1js.OctetString({
                        valueHex: new Uint8Array([0x01])
                    }),
                    new asn1js.OctetString({
                        valueHex: new Uint8Array([0x02])
                    }),
                ]
            });
            expect(asn).not().assertNull();
            const ber: any = asn.toBER();
            expect(ber).not().assertNull();
            const asnParsed: any = asn1js.fromBER(ber);
            expect(asnParsed).not().assertNull();
        });
        it('Null_BER', 0, () => {
            const asn: any = new asn1js.Null({
                name: "block2",
            });
            expect(asn).not().assertNull();
            const ber: any = asn.toBER();
            expect(ber).not().assertNull();
            const asnParsed: any = asn1js.fromBER(ber);
            expect(asnParsed).not().assertNull();
        });
        it('Sequence_BER', 0, () => {
            const asn: any = new asn1js.Sequence({
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
            expect(asn).not().assertNull();
            const ber: any = asn.toBER();
            expect(ber).not().assertNull();
            const asnParsed: any = asn1js.fromBER(ber);
            expect(asnParsed).not().assertNull();
        });
    });
}
