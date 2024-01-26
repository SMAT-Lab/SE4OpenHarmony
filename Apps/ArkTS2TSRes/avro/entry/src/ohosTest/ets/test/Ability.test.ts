let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import avro from '@ohos/avro-js';
export default function abilityTest() {
    describe('ActsAbilityTest', () => {
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
        it("parse", 0, () => {
            let arrayType: any = avro.parse({
                type: 'array', items: 'string'
            });
            expect(arrayType != undefined).assertTrue();
        });
        it("toBuffer", 0, () => {
            let arrayType: any = avro.parse({
                type: 'array', items: 'string'
            });
            let petArray = ['3443rtr', 'sfrf', 'eryryyh'];
            let bufArray: any = arrayType.toBuffer(petArray); // Buffer containing 'Hi''s Avro encoding.
            expect(bufArray != undefined).assertTrue();
        });
        it("fromBuffer", 0, () => {
            let arrayType: any = avro.parse({
                'type': 'array', items: 'string'
            });
            let petArray = ['3443rtr', 'sfrf', 'eryryyh'];
            let bufArray: any = arrayType.toBuffer(petArray); // Buffer containing 'Hi''s Avro encoding.
            let arraySrc: any = arrayType.fromBuffer(bufArray); // === 'Hi'
            expect(petArray.toString() == arraySrc).assertTrue();
        });
        it("encode", 0, () => {
            let arrayType: any = avro.parse({
                type: 'array', items: 'string'
            });
            let petArray = ['3443rtr', 'sfrf', 'eryryyh'];
            let bufArray: any = arrayType.toBuffer(petArray);
            let encodedData: any = arrayType.encode(petArray, bufArray);
            expect(encodedData).assertEqual(23);
        });
        it("decode", 0, () => {
            let arrayType: any = avro.parse({
                type: 'array', items: 'string'
            });
            let petArray = ['3443rtr', 'sfrf', 'eryryyh'];
            let bufArray: any = arrayType.toBuffer(petArray);
            let decodeData: any = arrayType.decode(bufArray);
            let expectValue: string = JSON.stringify(decodeData);
            let result: string = '{"value":["3443rtr","sfrf","eryryyh"],"offset":23}';
            expect(expectValue).assertEqual(result);
        });
        it("fromString", 0, () => {
            let arrayType: any = avro.parse({
                type: 'array', items: 'string'
            });
            let petArray = ['3443rtr', 'sfrf', 'eryryyh'];
            let typeStr: string = arrayType.toString(petArray);
            let expectValue: string = arrayType.fromString(typeStr).toString();
            let result: string = petArray.toString();
            expect(expectValue).assertEqual(result);
        });
        it("toString", 0, () => {
            let arrayType: any = avro.parse({
                type: 'array', items: 'string'
            });
            let petArray = ['3443rtr', 'sfrf', 'eryryyh'];
            let expectValue: string = arrayType.toString(petArray);
            let result: string = JSON.stringify(petArray);
            expect(expectValue).assertEqual(result);
        });
        it("isValid", 0, () => {
            let arrayType: any = avro.parse({
                type: 'array', items: 'string'
            });
            let petArray = ['3443rtr', 'sfrf', 'eryryyh'];
            let expectValue: boolean = arrayType.isValid(petArray);
            expect(expectValue).assertTrue();
        });
        it("clone", 0, () => {
            let arrayType: any = avro.parse({
                type: 'array', items: 'string'
            });
            let petArray = ['3443rtr', 'sfrf', 'eryryyh'];
            let expectValue: string = arrayType.clone(petArray).toString();
            expect(expectValue).assertEqual(petArray.toString());
        });
        it("compare0", 0, () => {
            let intType: any = avro.parse({
                type: 'int', items: 'number'
            });
            let petInt1 = 123;
            let petInt2 = 123;
            let expectValue: number = intType.compare(petInt1, petInt2);
            expect(expectValue).assertEqual(0);
        });
        it("compare1", 1, () => {
            let intType: any = avro.parse({
                type: 'int', items: 'number'
            });
            let petInt1 = 12;
            let petInt2 = 123;
            let expectValue: number = intType.compare(petInt1, petInt2);
            expect(expectValue).assertEqual(-1);
        });
        it("compare2", 2, () => {
            let intType: any = avro.parse({
                type: 'int', items: 'number'
            });
            let petInt1 = 123;
            let petInt2 = 12;
            let expectValue: number = intType.compare(petInt1, petInt2);
            expect(expectValue).assertEqual(1);
        });
        it("compareBuffers0", 0, () => {
            let arrayType: any = avro.parse({
                type: 'array', items: 'string'
            });
            let pet1 = ['3443rtr', 'sfrf', 'eryryyh'];
            let buf1: any = arrayType.toBuffer(pet1);
            let pet2 = ['3443rtr', 'sfrf', 'eryryyh'];
            let buf2: any = arrayType.toBuffer(pet2);
            let expectValue: number = arrayType.compareBuffers(buf1, buf2);
            expect(expectValue).assertEqual(0);
        });
        it("compareBuffers1", 1, () => {
            let arrayType: any = avro.parse({
                type: 'array', items: 'string'
            });
            let pet1 = ['3443rtr', 'sfrf', 'eryryyh'];
            let buf1: any = arrayType.toBuffer(pet1);
            let pet2 = ['3443rtr', 'sfrf'];
            let buf2: any = arrayType.toBuffer(pet2);
            let expectValue: number = arrayType.compareBuffers(buf1, buf2);
            expect(expectValue).assertEqual(1);
        });
        it("compareBuffers2", 2, () => {
            let arrayType: any = avro.parse({
                type: 'array', items: 'string'
            });
            let pet1 = ['3443rtr', 'sfrf'];
            let buf1: any = arrayType.toBuffer(pet1);
            let pet2 = ['3443rtr', 'sfrf', 'eryryyh'];
            let buf2: any = arrayType.toBuffer(pet2);
            let expectValue: number = arrayType.compareBuffers(buf1, buf2);
            expect(expectValue).assertEqual(-1);
        });
        it("random", 0, () => {
            let stringType: any = avro.parse({
                type: 'string'
            });
            let randomType: any = stringType.random();
            expect(randomType != null).assertTrue();
        });
        it("getName", 0, () => {
            let stringType: any = avro.parse({
                type: 'string'
            });
            let name: any = stringType.getName();
            expect(name).assertUndefined();
        });
        it("getSchema", 0, () => {
            let stringType: any = avro.parse({
                type: 'string'
            });
            let schema: any = stringType.getSchema();
            let value: string = schema.toString();
            let assertValue: string = JSON.stringify('string');
            expect(value).assertEqual(assertValue);
        });
        it("getFingerprint", 0, () => {
            let stringType: any = avro.parse({
                type: 'string'
            });
            let fingerprint: any = stringType.getFingerprint('md5');
            expect(fingerprint != null).assertTrue();
        });
        it("getItemsType", 0, () => {
            let arrayType: any = avro.parse({
                type: 'array', items: 'string'
            });
            let type: any = arrayType.getItemsType();
            let assertValue: string = JSON.stringify('string');
            expect(type.toString()).assertEqual(assertValue);
        });
        it("getAliases", 0, () => {
            let enumType: any = avro.parse({
                name: 'Pet', type: 'enum', symbols: ['CAT', 'DOG']
            });
            let aliases: any = enumType.getAliases();
            expect(aliases.length).assertEqual(0);
        });
        it("getSize", 0, () => {
            let fixedType: any = avro.parse({
                type: "fixed", name: "Id", size: 4
            });
            let size: any = fixedType.getSize();
            expect(size).assertEqual(4);
        });
        it("getValuesType", 0, () => {
            let mapType: any = avro.parse({
                type: 'map', values: 'string'
            });
            let type: any = mapType.getValuesType();
            let assertValue: string = JSON.stringify('string');
            expect(type.toString()).assertEqual(assertValue);
        });
    });
}
