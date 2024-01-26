let __generate__Id: number = 0;
function generateId(): string {
    return "TestInterfaceResponseTime.test_" + ++__generate__Id;
}
/**
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
import fs from "@ohos/fileio-extra";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, TestType } from '@ohos/hypium';
import { GlobalContext } from "../testability/GlobalContext";
export default function telephonyPerfJsunit() {
    describe("telephonyPerfJsunit", () => {
        const BASE_COUNT = 2000;
        const HTTP_COUNT = 2;
        const BASELINE_HASSIMECASR = 500;
        const BASELINE_CREATEHTTP = 500;
        const BASELINE_REQUEST = 2500;
        const BASELINE_DESTROY = 30;
        //copy
        it("copy", TestType.PERFORMANCE, async (done: Function) => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            fs.mkdirsSync(`${fileDir}/copys`);
            fs.mkdirsSync(`${fileDir}/copys/text.txt`);
            fs.mkdirsSync(`${fileDir}/copys2`);
            let startTime = new Date().getTime();
            // console.log("Telephony_Http_CreateHttp_Perf_0100_SVGCircle startTime:"+startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                fs.copy(`${fileDir}/copys/text.txt`, `${fileDir}/copys2/test.txt`);
            }
            let endTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_copy endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Telephony_Http_CreateHttp_Perf_0100_copy averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        // emptyDirSync
        it("emptyDirSync", TestType.PERFORMANCE, async (done: Function) => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            let startTime = new Date().getTime();
            // console.log("Telephony_Http_CreateHttp_Perf_0100_SVGCircle startTime:"+startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                fs.emptyDirSync(`${fileDir}/folder`);
            }
            let endTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_emptyDirSync endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Telephony_Http_CreateHttp_Perf_0100_emptyDirSync averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        // outputJSONSync
        it("outputJSONSync", TestType.PERFORMANCE, async (done: Function) => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            let startTime = new Date().getTime();
            // console.log("Telephony_Http_CreateHttp_Perf_0100_SVGCircle startTime:"+startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                fs.outputJSONSync(`${fileDir}/folder/text.json`, "{start:1}", { encoding: "utf-8" });
            }
            let endTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_outputJSONSync endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Telephony_Http_CreateHttp_Perf_0100_outputJSONSync averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        // mkdirsSync
        it("mkdirsSync", TestType.PERFORMANCE, async (done: Function) => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            let startTime = new Date().getTime();
            // console.log("Telephony_Http_CreateHttp_Perf_0100_SVGCircle startTime:"+startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                fs.mkdirsSync(`${fileDir}/mkdirsSync${index}`);
            }
            let endTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_mkdirsSync endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Telephony_Http_CreateHttp_Perf_0100_mkdirsSync averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        // outputFileSync
        it("outputFileSync", TestType.PERFORMANCE, async (done: Function) => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            let startTime = new Date().getTime();
            // console.log("Telephony_Http_CreateHttp_Perf_0100_SVGCircle startTime:"+startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                fs.outputFileSync(`${fileDir}/folder/text.txt`, `文件内容${index}`);
            }
            let endTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_outputFileSync endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Telephony_Http_CreateHttp_Perf_0100_outputFileSync averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        // pathExistsSync
        it("pathExistsSync", TestType.PERFORMANCE, async (done: Function) => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            let startTime = new Date().getTime();
            // console.log("Telephony_Http_CreateHttp_Perf_0100_SVGCircle startTime:"+startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                fs.pathExistsSync(`${fileDir}/folder`);
            }
            let endTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_pathExistsSync endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Telephony_Http_CreateHttp_Perf_0100_pathExistsSync averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        // removeSync
        it("removeSync", TestType.PERFORMANCE, async (done: Function) => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            let startTime = new Date().getTime();
            // console.log("Telephony_Http_CreateHttp_Perf_0100_SVGCircle startTime:"+startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                fs.removeSync(`${fileDir}/mkdirsSync${index}`);
            }
            let endTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_removeSync endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Telephony_Http_CreateHttp_Perf_0100_removeSync averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
    });
}
