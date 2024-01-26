let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
/*
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
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import fs from '@ohos.file.fs';
import { OHOSTar } from "@ohos/tar";
import { GlobalContext } from './GlobalContext';
export default function tarTest() {
    class OHOStarTestInit {
        private static instance: OHOStarTestInit;
        rootDir: string = GlobalContext.getContext().getObject('filesDir') as string;
        tarSourceDir: string = "tarSourceDir";
        untarTargetDir: string = "untarTargetDir";
        tarFileName: string = "tarFile";
        public static getInstance(): OHOStarTestInit {
            if (!OHOStarTestInit.instance) {
                OHOStarTestInit.instance = new OHOStarTestInit();
            }
            return OHOStarTestInit.instance;
        }
        public GetTarFileName(): string {
            return this.rootDir + '/' + this.tarFileName + '.tar';
        }
        public GetTarSourceDir() {
            return this.rootDir + '/' + this.tarSourceDir;
        }
        public GetUntarTargetDir() {
            return this.rootDir + '/' + this.untarTargetDir;
        }
        // tartest初始化
        TestTarInit(): void {
            fs.mkdir(this.GetTarSourceDir(), (err) => {
                if (err) {
                    console.info("mkdir failed with error message:" + err.message + ",errorcode:" + err.code);
                }
                else {
                    let filePath = this.GetTarSourceDir() + "/testFile.txt";
                    let file = fs.openSync(filePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
                    fs.write(file.fd, "1234567890abcdefghij", (err) => {
                        if (err) {
                            console.info("write failed with error message: " + err.message + " error code: " + err.code);
                        }
                        else {
                            fs.closeSync(file);
                        }
                    });
                }
            });
        }
        // untartest初始化
        TestUnTarInit(): void {
            fs.rmdir(this.GetUntarTargetDir());
        }
    }
    describe('tarTest', () => {
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
        it('tarTestSuccess', 0, () => {
            OHOStarTestInit.getInstance().TestTarInit();
            let timer: number = setTimeout(() => {
                console.info("tar.tar()");
                let tar: OHOSTar = new OHOSTar(OHOStarTestInit.getInstance().rootDir, OHOStarTestInit.getInstance()
                    .tarFileName, OHOStarTestInit.getInstance().untarTargetDir);
                tar.addTarPath(OHOStarTestInit.getInstance().tarSourceDir);
                tar.setTarName(OHOStarTestInit.getInstance().tarFileName);
                let ret: number = tar.tar();
                hilog.info(0x0000, 'tar_test', '%{public}s', 'tar ret = ' + ret);
                expect(ret).assertContain("Tar create success");
            }, 100);
        });
        it('tarTestFailure', 0, () => {
            OHOStarTestInit.getInstance().TestTarInit();
            let tar: OHOSTar = new OHOSTar(OHOStarTestInit.getInstance().rootDir, OHOStarTestInit.getInstance().tarFileName);
            tar.addTarPath(OHOStarTestInit.getInstance().tarSourceDir + 'notexist');
            tar.setTarName(OHOStarTestInit.getInstance().tarFileName);
            let ret: number = tar.tar();
            hilog.info(0x0000, 'tar_test', '%{public}s', 'tar ret = ' + ret);
            expect(ret).assertContain("Tar create failure");
            OHOStarTestInit.getInstance().TestTarInit();
            tar = new OHOSTar(OHOStarTestInit.getInstance().rootDir, OHOStarTestInit.getInstance().tarFileName);
            tar.addTarPath(OHOStarTestInit.getInstance().tarSourceDir);
            tar.delTarPath(OHOStarTestInit.getInstance().tarSourceDir);
            tar.setTarName(OHOStarTestInit.getInstance().tarFileName);
            ret = tar.tar();
            hilog.info(0x0000, 'tar_test', '%{public}s', 'tar ret = ' + ret);
            expect(ret).assertContain("Tar create failure");
            OHOStarTestInit.getInstance().TestTarInit();
            tar = new OHOSTar(OHOStarTestInit.getInstance().rootDir, OHOStarTestInit.getInstance().tarFileName);
            tar.addTarPath(OHOStarTestInit.getInstance().tarSourceDir);
            tar.setTarName('notexist/' + OHOStarTestInit.getInstance().tarFileName);
            ret = tar.tar();
            hilog.info(0x0000, 'tar_test', '%{public}s', 'tar ret = ' + ret);
            expect(ret).assertContain("Tar create failure");
        });
        it('untarTestSuccess', 0, () => {
            OHOStarTestInit.getInstance().TestTarInit();
            let timer: number = setTimeout(() => {
                let tar: OHOSTar = new OHOSTar(OHOStarTestInit.getInstance().rootDir, OHOStarTestInit.getInstance()
                    .tarFileName, OHOStarTestInit.getInstance().untarTargetDir);
                tar.addTarPath(OHOStarTestInit.getInstance().tarSourceDir);
                tar.setTarName(OHOStarTestInit.getInstance().tarFileName);
                let ret: number = tar.tar();
                hilog.info(0x0000, 'tar_test', '%{public}s', 'tar ret = ' + ret);
                expect(ret).assertContain("Tar create success");
                OHOStarTestInit.getInstance().TestUnTarInit();
                tar.setUnTarPath(OHOStarTestInit.getInstance().untarTargetDir);
                tar.setUnTarName(OHOStarTestInit.getInstance().tarFileName);
                ret = tar.untar();
                hilog.info(0x0000, 'tar_test', '%{public}s', 'untar ret = ' + ret);
                expect(ret).assertContain("UnTar create success");
            }, 100);
        });
        it('untarTestFailure', 0, () => {
            let tar: OHOSTar = new OHOSTar(OHOStarTestInit.getInstance().rootDir, OHOStarTestInit.getInstance().tarFileName, OHOStarTestInit.getInstance().untarTargetDir);
            tar.setUnTarPath(OHOStarTestInit.getInstance().tarSourceDir);
            tar.setUnTarName(OHOStarTestInit.getInstance().tarFileName + 'notexist');
            let ret: number = tar.untar();
            hilog.info(0x0000, 'tar_test', '%{public}s', 'untar ret = ' + ret);
            expect(ret).assertContain("UnTar create failure");
        });
    });
}
