let __generate__Id: number = 0;
function generateId(): string {
    return "InerfaceTime.test_" + ++__generate__Id;
}
/**
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { Context } from '@ohos.abilityAccessCtrl';
import { GlobalContext } from '../testability/GlobalContext';
import { Base64 } from '@ohos/base64';
export default function InterfaceTime() {
    describe("InterfaceTime", () => {
        const BASE_COUNT = 2000;
        const BASELINE_CREATEHTTP = 2000;
        let test: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let testArr = new Uint8Array(test);
        it("Base64.encode", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                Base64.encode(testArr);
            }
            let endTime = new Date().getTime();
            console.log("Base64.encode:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Base64.encode:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("Base64.encodeBytesToBytes", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                Base64.encodeBytesToBytes(testArr);
            }
            let endTime = new Date().getTime();
            console.log("Base64.encodeBytesToBytes:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Base64.encodeBytesToBytes:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("Base64.encodeToString", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                Base64.encodeToString(testArr);
            }
            let endTime = new Date().getTime();
            console.log("Base64.encodeToString:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Base64.encodeToString:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("Base64.encodeBytes", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                Base64.encodeBytes(testArr);
            }
            let endTime = new Date().getTime();
            console.log("Base64.encodeBytes:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Base64.encodeBytes:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("Base64.decode", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            let str = 'AABDCDHFAGA23';
            for (let index = 0; index < BASE_COUNT; index++) {
                Base64.decode(str);
            }
            let endTime = new Date().getTime();
            console.log("Base64.decode:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Base64.decode:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("Base64.bytesToString", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            let encode = Base64.encode(testArr);
            for (let index = 0; index < BASE_COUNT; index++) {
                Base64.bytesToString(encode);
            }
            let endTime = new Date().getTime();
            console.log("Base64.bytesToString:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Base64.bytesToString:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("Base64.stringToBytes", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            let encodeString = Base64.encodeToString(testArr);
            for (let index = 0; index < BASE_COUNT; index++) {
                Base64.stringToBytes(encodeString);
            }
            let endTime = new Date().getTime();
            console.log("Base64.stringToBytes:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Base64.stringToBytes:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("Base64.encodeToFile", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            let fileDir = context.filesDir;
            for (let index = 0; index < BASE_COUNT; index++) {
                Base64.encodeToFile(fileDir + '/test1.txt', testArr);
            }
            let endTime = new Date().getTime();
            console.log("Base64.encodeToFile:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Base64.encodeToFile:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("Base64.encodeFromFile", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            let fileDir = context.filesDir;
            Base64.encodeToFile(fileDir + '/test2.txt', testArr);
            for (let index = 0; index < BASE_COUNT; index++) {
                Base64.encodeFromFile(fileDir + '/test2.txt');
            }
            let endTime = new Date().getTime();
            console.log("Base64.encodeFromFile:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Base64.encodeFromFile:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("Base64.decodeToFile", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            let fileDir = context.filesDir;
            let encodeString = Base64.encodeToString(testArr);
            for (let index = 0; index < BASE_COUNT; index++) {
                Base64.decodeToFile(fileDir + '/test3.txt', encodeString);
            }
            let endTime = new Date().getTime();
            console.log("Base64.decodeToFile:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Base64.decodeToFile:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("Base64.decodeFromFile", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            let fileDir = context.filesDir;
            Base64.encodeToFile(fileDir + '/test4.txt', testArr);
            for (let index = 0; index < BASE_COUNT; index++) {
                Base64.decodeFromFile(fileDir + '/test4.txt');
            }
            let endTime = new Date().getTime();
            console.log("Base64.decodeFromFile:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Base64.decodeFromFile:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
    });
}
