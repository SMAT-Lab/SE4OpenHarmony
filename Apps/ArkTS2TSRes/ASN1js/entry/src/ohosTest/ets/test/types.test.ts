let __generate__Id: number = 0;
function generateId(): string {
    return "types.test_" + ++__generate__Id;
}
/**
 * BSD License
 *
 * Copyright (c) 2023 Huawei Device Co., Ltd. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * * Neither the name Facebook nor the names of its contributors may be used to
 * endorse or promote products derived from this software without specific
 * prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import asn1js from "@fortanix/asn1js";
export default function typeTest() {
    describe('typeTest', () => {
        // Defines a test suite. Two parameters are supported: test suite name and test suite function.
        beforeAll(() => {
            // Presets an action, which is performed only once before all test cases of the test suite start.
            // This API supports only one parameter: preset action function.
        });
        beforeEach(() => {
            // Presets an action, which is performed before each unit test case starts.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: preset action function.
        });
        afterEach(() => {
            // Presets a clear action, which is performed after each unit test case ends.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: clear action function.
        });
        afterAll(() => {
            // Presets a clear action, which is performed after all test cases of the test suite end.
            // This API supports only one parameter: clear action function.
        });
        it('test01', 0, () => {
            const asn: any = new asn1js.Boolean({
                valueHex: new Uint8Array([0x01]),
            });
            expect(asn.valueBlock.value).assertDeepEquals(false);
        });
        it('test02', 0, () => {
            const asn: any = new asn1js.Boolean({ value: true });
            const json: any = asn.toJSON();
            expect(json.valueBlock).assertDeepEquals({ "blockName": "BooleanValueBlock", "blockLength": 0, "error": "", "warnings": [], "valueBeforeDecode": "", "value": true, "isHexOnly": false, "valueHex": "FF" });
        });
        it('test03', 0, () => {
            const asn: any = new asn1js.Integer({
                value: 97196,
            });
            expect(asn.valueBlock.toString()).assertDeepEquals("97196");
            const asn2: any = asn1js.fromBER(asn.toBER());
            expect(asn2.result.valueBlock.valueDec).assertDeepEquals(97196);
        });
        it('test04', 0, () => {
            const asn: any = new asn1js.Integer({
                valueHex: new Uint8Array([0x01, 0x7b, 0xac]),
            });
            expect(asn.valueBlock.isHexOnly).assertDeepEquals(false);
            const asn2: any = asn1js.fromBER(asn.toBER());
            expect(asn2.result.valueBlock.valueDec).assertDeepEquals(97196);
        });
        it('test05', 0, () => {
            const asn: any = new asn1js.Integer({
                valueHex: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]),
            });
            expect(asn.valueBlock.toString()).assertDeepEquals("18591708106338011145");
        });
        it('test06', 0, () => {
            const asn: any = new asn1js.Integer({
                valueHex: new Uint8Array([0x81, 2, 3, 4, 5, 6, 7, 8]),
            });
            expect(asn.valueBlock.toString()).assertDeepEquals("-9150748177064392952");
        });
        it('test07', 0, () => {
            let asn: any = new asn1js.GeneralizedTime({
                value: "20000102",
            });
            expect(asn.toString("hex")).assertDeepEquals("20000102160000Z");
        });
        it('test08', 0, () => {
            let asn: any = new asn1js.GeneralizedTime({
                value: "2000010212",
            });
            expect(asn.toString("hex")).assertDeepEquals("20000103040000Z");
        });
        it('test09', 0, () => {
            let asn: any = new asn1js.GeneralizedTime({
                value: "2000010212.100",
            });
            expect(asn.toString("hex")).assertDeepEquals("20000103040600Z");
        });
        it('test10', 0, () => {
            const value = "1.2.3.4.5";
            const asn: any = new asn1js.ObjectIdentifier({
                value,
            });
            expect(asn.toJSON().value).assertUndefined();
        });
    });
}
