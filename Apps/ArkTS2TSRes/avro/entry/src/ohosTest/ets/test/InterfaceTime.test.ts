let __generate__Id: number = 0;
function generateId(): string {
    return "InterfaceTime.test_" + ++__generate__Id;
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
import { describe, expect, it, TestType } from '@ohos/hypium';
import avro from '@ohos/avro-js';
export default function InterfaceTime() {
    describe("InterfaceTime", () => {
        const BASE_COUNT = 2000;
        const BASELINE_CREATEHTTP = 2000;
        it("parse", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                avro.parse({
                    type: 'array', items: 'string'
                });
            }
            let endTime = new Date().getTime();
            console.log("avro parse:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("avro parse:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("toBuffer", TestType.PERFORMANCE, async (done: Function) => {
            let arrayType: any = avro.parse({
                type: 'array', items: 'string'
            });
            let petArray = ['3443rtr', 'sfrf', 'eryryyh'];
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                arrayType.toBuffer(petArray);
            }
            let endTime = new Date().getTime();
            console.log("avro toBuffer:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("avro toBuffer:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("fromBuffer", TestType.PERFORMANCE, async (done: Function) => {
            let arrayType: any = avro.parse({
                'type': 'array', items: 'string'
            });
            let petArray = ['3443rtr', 'sfrf', 'eryryyh'];
            let bufArray: any = arrayType.toBuffer(petArray);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                arrayType.fromBuffer(bufArray);
            }
            let endTime = new Date().getTime();
            console.log("avro fromBuffer:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("avro fromBuffer:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("encode", TestType.PERFORMANCE, async (done: Function) => {
            let arrayType: any = avro.parse({
                type: 'array', items: 'string'
            });
            let petArray = ['3443rtr', 'sfrf', 'eryryyh'];
            let bufArray: any = arrayType.toBuffer(petArray);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                arrayType.encode(petArray, bufArray);
            }
            let endTime = new Date().getTime();
            console.log("avro encode:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("avro encode:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("decode", TestType.PERFORMANCE, async (done: Function) => {
            let arrayType: any = avro.parse({
                type: 'array', items: 'string'
            });
            let petArray = ['3443rtr', 'sfrf', 'eryryyh'];
            let bufArray: any = arrayType.toBuffer(petArray);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                arrayType.decode(bufArray);
            }
            let endTime = new Date().getTime();
            console.log("avro decode:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("avro decode:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("fromString", TestType.PERFORMANCE, async (done: Function) => {
            let arrayType: any = avro.parse({
                type: 'array', items: 'string'
            });
            let petArray = ['3443rtr', 'sfrf', 'eryryyh'];
            let typeStr: string = arrayType.toString(petArray);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                arrayType.fromString(typeStr);
            }
            let endTime = new Date().getTime();
            console.log("avro fromString:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("avro fromString:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("toString", TestType.PERFORMANCE, async (done: Function) => {
            let arrayType: any = avro.parse({
                type: 'array', items: 'string'
            });
            let petArray = ['3443rtr', 'sfrf', 'eryryyh'];
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                arrayType.toString(petArray);
            }
            let endTime = new Date().getTime();
            console.log("avro toString:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("avro toString:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("isValid", TestType.PERFORMANCE, async (done: Function) => {
            let arrayType: any = avro.parse({
                type: 'array', items: 'string'
            });
            let petArray = ['3443rtr', 'sfrf', 'eryryyh'];
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                arrayType.isValid(petArray);
            }
            let endTime = new Date().getTime();
            console.log("avro isValid:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("avro isValid:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("clone", TestType.PERFORMANCE, async (done: Function) => {
            let arrayType: any = avro.parse({
                type: 'array', items: 'string'
            });
            let petArray = ['3443rtr', 'sfrf', 'eryryyh'];
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                arrayType.clone(petArray);
            }
            let endTime = new Date().getTime();
            console.log("avro clone:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("avro clone:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("compare", TestType.PERFORMANCE, async (done: Function) => {
            let intType: any = avro.parse({
                type: 'int', items: 'number'
            });
            let petInt1 = 123;
            let petInt2 = 123;
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                intType.compare(petInt1, petInt2);
            }
            let endTime = new Date().getTime();
            console.log("avro compare:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("avro compare:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("compareBuffers", TestType.PERFORMANCE, async (done: Function) => {
            let arrayType: any = avro.parse({
                type: 'array', items: 'string'
            });
            let pet1 = ['3443rtr', 'sfrf', 'eryryyh'];
            let buf1: any = arrayType.toBuffer(pet1);
            let pet2 = ['3443rtr', 'sfrf', 'eryryyh'];
            let buf2: any = arrayType.toBuffer(pet2);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                arrayType.compareBuffers(buf1, buf2);
            }
            let endTime = new Date().getTime();
            console.log("avro compareBuffers:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("avro compareBuffers:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("random", TestType.PERFORMANCE, async (done: Function) => {
            let stringType: any = avro.parse({
                type: 'string'
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                stringType.random();
            }
            let endTime = new Date().getTime();
            console.log("avro random:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("avro random:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("getName", TestType.PERFORMANCE, async (done: Function) => {
            let stringType: any = avro.parse({
                type: 'string'
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                stringType.getName();
            }
            let endTime = new Date().getTime();
            console.log("avro getName:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("avro getName:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("getSchema", TestType.PERFORMANCE, async (done: Function) => {
            let stringType: any = avro.parse({
                type: 'string'
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                stringType.getSchema();
            }
            let endTime = new Date().getTime();
            console.log("avro getSchema:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("avro getSchema:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("getFingerprint", TestType.PERFORMANCE, async (done: Function) => {
            let stringType: any = avro.parse({
                type: 'string'
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                stringType.getFingerprint('md5');
            }
            let endTime = new Date().getTime();
            console.log("avro getFingerprint:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("avro getFingerprint:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("getItemsType", TestType.PERFORMANCE, async (done: Function) => {
            let arrayType: any = avro.parse({
                type: 'array', items: 'string'
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                arrayType.getItemsType();
            }
            let endTime = new Date().getTime();
            console.log("avro getItemsType:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("avro getItemsType:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("getAliases", TestType.PERFORMANCE, async (done: Function) => {
            let enumType: any = avro.parse({
                name: 'Pet', type: 'enum', symbols: ['CAT', 'DOG']
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                enumType.getAliases();
            }
            let endTime = new Date().getTime();
            console.log("avro getAliases:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("avro getAliases:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("getSize", TestType.PERFORMANCE, async (done: Function) => {
            let fixedType: any = avro.parse({
                type: "fixed", name: "Id", size: 4
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                fixedType.getSize();
            }
            let endTime = new Date().getTime();
            console.log("avro getSize:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("avro getSize:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("getValuesType", TestType.PERFORMANCE, async (done: Function) => {
            let mapType: any = avro.parse({
                type: 'map', values: 'string'
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                mapType.getValuesType();
            }
            let endTime = new Date().getTime();
            console.log("avro getValuesType:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("avro getValuesType:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
    });
}
