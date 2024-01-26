let __generate__Id: number = 0;
function generateId(): string {
    return "Unrar.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import { UnrarApi, ICallBack } from "@ohos/unrar";
import fileio from '@ohos.fileio';
import { testRarData } from './dataTestRar5';
import { nameEncryptData } from './dataNameEncrypt';
import { GlobalContext } from '../testability/pages/GlobalContextTest';
export default function unrarTest() {
    describe('UnrarTest', () => {
        // Defines a test suite. Two parameters are supported: test suite name and test suite function.
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
        it('isEncrypted', 0, () => {
            let context: Context = GlobalContext.getContext().getObject('context') as Context;
            // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
            let path: string = context.filesDir + "/name_encrypted.rar";
            try {
                fileio.accessSync(path, 0);
                let tag: number = UnrarApi.isEncrypted(path);
                let encrypted: string = '';
                if (tag == 1) {
                    encrypted = "name_encrypted.rar是加密文件！";
                    expect(true).assertTrue();
                }
                else {
                    expect(false).assertTrue();
                    encrypted = "name_encrypted.rar不是加密文件！";
                }
            }
            catch (err) {
                expect(false).assertTrue();
            }
        });
        it('rarFiles_Extract', 0, () => {
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
            try {
                fileio.accessSync(path, 0);
                let value = UnrarApi.extract(path, context.filesDir);
                let resultss: string = '';
                if (value == '解压成功') {
                    resultss = 'name_encrypted.rar文件解压成功,解压文件在:' + context.filesDir;
                    expect(true).assertTrue();
                }
                else {
                    expect(false).assertTrue();
                    resultss = value;
                }
            }
            catch (err) {
                expect(false).assertTrue();
            }
        });
        it('rarFiles_Extract_Encrypted', 0, () => {
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
            try {
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
                UnrarApi.RarFiles_Extract(path2, context.filesDir, callBack, "190512");
            }
            catch (err) {
                expect(false).assertTrue();
            }
        });
    });
}
