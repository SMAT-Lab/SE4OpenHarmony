let __generate__Id: number = 0;
function generateId(): string {
    return "TestInterfaceResponseTime.test_" + ++__generate__Id;
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
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, TestType } from '@ohos/hypium';
import fileio from '@ohos.fileio';
import { testRarData } from './dataTestRar5';
import { nameEncryptData } from './dataNameEncrypt';
import { GlobalContext } from '../testability/pages/GlobalContextTest';
import { ICallBack, UnrarApi } from '@ohos/unrar';
export default function telephonyPerfJsunit() {
    describe("telephonyPerfJsunit", () => {
        const BASE_COUNT = 2000;
        const HTTP_COUNT = 2;
        const BASELINE_HASSIMECASR = 500;
        const BASELINE_CREATEHTTP = 500;
        const BASELINE_REQUEST = 2500;
        const BASELINE_DESTROY = 30;
        beforeAll(() => {
            // Presets an action, which is performed only once before all test cases of the test suite start.
            // This API supports only one parameter: preset action function.
            let context: Context = GlobalContext.getContext().getObject('context') as Context;
            let srcPath: string = context.filesDir;
            try {
                fileio.mkdirSync(srcPath);
            }
            catch (err) {
            }
            const writer = fileio.openSync(srcPath + '/testRar5.rar', 0o100 | 0o2, 0o666); //0o102
            const writer2 = fileio.openSync(srcPath + '/name_encrypted.rar', 0o100 | 0o2, 0o666); //0o102
            fileio.writeSync(writer, testRarData.buffer);
            fileio.writeSync(writer2, nameEncryptData.buffer);
            fileio.closeSync(writer);
            fileio.closeSync(writer2);
        });
        //isEncrypted
        it("isEncrypted", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_isEncrypted startTime:" + startTime);
            let context: Context = GlobalContext.getContext().getObject('context') as Context;
            let path: string = context.filesDir + "/name_encrypted.rar";
            fileio.accessSync(path, 0);
            for (let index = 0; index < BASE_COUNT; index++) {
                let tag: number = UnrarApi.isEncrypted(path);
            }
            let endTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_isEncrypted endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 100) / BASE_COUNT;
            console.log("Telephony_Http_CreateHttp_Perf_0100_isEncrypted averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        //extract
        it("extract", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_extract startTime:" + startTime);
            let context: Context = GlobalContext.getContext().getObject('context') as Context;
            let srcPath: string = context.filesDir;
            try {
                fileio.mkdirSync(srcPath);
            }
            catch (err) {
            }
            const writer = fileio.openSync(srcPath + '/testRar5.rar', 0o100 | 0o2, 0o666); //0o102
            fileio.writeSync(writer, testRarData.buffer);
            fileio.closeSync(writer);
            let path: string = context.filesDir + '/testRar5.rar';
            fileio.accessSync(path, 0);
            for (let index = 0; index < BASE_COUNT; index++) {
                let value = UnrarApi.extract(path, context.filesDir);
            }
            let endTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_extract endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 100) / BASE_COUNT;
            console.log("Telephony_Http_CreateHttp_Perf_0100_extract averageTime:" + averageTime + "μs");
            expect(averageTime > BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        //RarFiles_Extract
        it("RarFiles_Extract", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_RarFiles_Extract startTime:" + startTime);
            let context: Context = GlobalContext.getContext().getObject('context') as Context;
            let srcPath: string = context.filesDir;
            try {
                fileio.mkdirSync(srcPath);
            }
            catch (err) {
            }
            const writer2 = fileio.openSync(srcPath + '/name_encrypted.rar', 0o100 | 0o2, 0o666); //0o102
            fileio.writeSync(writer2, nameEncryptData.buffer);
            fileio.closeSync(writer2);
            let path2: string = context.filesDir + "/name_encrypted.rar";
            fileio.accessSync(path2, 0);
            let callBack: ICallBack = {
                callBackResult(value: string) {
                    let resultss: string = '';
                    if (value == '解压成功') {
                        expect(true).assertTrue();
                        resultss = '解压testRar5.rar文件解压成功,解压文件在:' + context.filesDir;
                    }
                    else {
                        expect(false).assertTrue();
                        resultss = value;
                    }
                }
            };
            for (let index = 0; index < BASE_COUNT; index++) {
                UnrarApi.RarFiles_Extract(path2, context.filesDir, callBack, "190512");
            }
            let endTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_RarFiles_Extract endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 100) / BASE_COUNT;
            console.log("Telephony_Http_CreateHttp_Perf_0100_RarFiles_Extract averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
    });
}
