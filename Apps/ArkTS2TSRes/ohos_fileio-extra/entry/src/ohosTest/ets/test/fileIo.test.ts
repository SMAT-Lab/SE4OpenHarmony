let __generate__Id: number = 0;
function generateId(): string {
    return "fileIo.test_" + ++__generate__Id;
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import fs from "@ohos/fileio-extra";
import { GlobalContext } from "../testability/GlobalContext";
export default function abilityTest() {
    describe('fileIoTest', () => {
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
        interface DateMsg {
            msg: string;
        }
        it('mkdirsSync', 0, () => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            fs.mkdirsSync(fileDir + "/folder");
            let result: Boolean = fs.pathExistsSync(fileDir + "/folder");
            expect(result).assertTrue();
            fs.removeSync(fileDir + "/folder");
        });
        it('mkdirs', 1, async () => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            let result: Boolean = false;
            await fs.mkdirs(fileDir + "/folder").then(() => {
                result = true;
            });
            expect(result).assertTrue();
            fs.removeSync(fileDir + "/folder");
        });
        it('outputFileSync', 2, () => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            fs.outputFileSync(fileDir + "/folder/test1.txt", '文件内容');
            let result: string = fs.readTextSync(fileDir + "/folder/test1.txt");
            expect(result).assertEqual("文件内容");
            fs.removeSync(fileDir + "/folder");
        });
        it('outputFile', 3, async () => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            let result: boolean = false;
            await fs.outputFile(fileDir + "/folder/test2.txt", '文件内容').then(() => {
                result = true;
            }).catch((err: Error) => {
                console.log("fileioTest outputFile创建失败" + err);
            });
            expect(result).assertTrue();
            fs.removeSync(fileDir + "/folder");
        });
        it('outputJSONSync', 4, async () => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            fs.outputJSONSync(fileDir + "/folder/outputJSONSync.json", '{ start:1 }', { encoding: "utf-8" });
            await fs.readJSON(fileDir + "/folder/outputJSONSync.json", "utf-8").then((res: Object) => {
                expect(res).assertEqual('{ start:1 }');
            });
            fs.removeSync(fileDir + "/folder");
        });
        it('outputJSON', 5, async () => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            let result: boolean = false;
            await fs.outputJSON(fileDir + "/folder/outputJSON.json", '{ start:1 }', { encoding: "utf-8" }).then(() => {
                result = true;
            }).catch((err: Error) => {
                console.log('fileioTest outputJSON创建失败' + err);
            });
            expect(result).assertTrue();
            fs.removeSync(fileDir + "/folder");
        });
        it('readTextSync', 6, () => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            fs.outputFileSync(fileDir + "/folder/test.txt", '文件内容');
            let result: string = fs.readTextSync(fileDir + "/folder/test.txt");
            expect(result).assertEqual("文件内容");
            fs.removeSync(fileDir + "/folder");
        });
        it('readText', 7, async () => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            fs.outputFileSync(fileDir + "/folder/test.txt", '文件内容');
            await fs.readText(fileDir + "/folder/test.txt").then((read) => {
                expect(read).assertEqual("文件内容");
            }).catch((err: Error) => {
                console.log("fileioTest readText读取失败：" + err);
            });
            fs.removeSync(fileDir + "/folder");
        });
        it('readJSON', 8, async () => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            fs.outputJSONSync(fileDir + "/folder/readJSON.json", '{ start:1 }', { encoding: "utf-8" });
            await fs.readJSON(fileDir + "/folder/readJSON.json", "utf-8").then((res: Object) => {
                expect(res).assertEqual('{ start:1 }');
            });
            fs.removeSync(fileDir + "/folder");
        });
        it('readJSONSync', 9, () => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            fs.outputJSONSync(fileDir + "/folder/readJSONSync.json", '{ start:1 }', { encoding: "utf-8" });
            let result: string = fs.readJSONSync(fileDir + "/folder/readJSONSync.json", "utf-8");
            expect(result).assertEqual('{ start:1 }');
            fs.removeSync(fileDir + "/folder");
        });
        it('pathExists', 10, async () => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            fs.outputFileSync(fileDir + "/folder/test.txt", '文件内容');
            await fs.pathExists(fileDir + "/folder/test.txt").then((res: Object) => {
                expect(res).assertTrue();
            }).catch((err: Error) => {
                console.log("fileioTest readJSON:" + err);
            });
            fs.removeSync(fileDir + "/folder");
        });
        it('pathExistsSync', 11, () => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            fs.outputFileSync(fileDir + "/folder/test.txt", '文件内容');
            let result: Boolean = fs.pathExistsSync(fileDir + "/folder/test.txt");
            expect(result).assertTrue();
            fs.removeSync(fileDir + "/folder");
        });
        it('writeJSON', 12, async () => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            fs.outputJSONSync(fileDir + "/folder/test.json", '{}', { encoding: "utf-8" });
            let data: DateMsg = { msg: "hello" };
            let result: boolean = false;
            await fs.writeJSON(fileDir + "/folder/test.json", JSON.stringify(data)).then(() => {
                result = true;
            });
            expect(result).assertTrue();
            fs.removeSync(fileDir + "/folder");
        });
        it('writeJSONSync', 13, () => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            fs.outputJSONSync(fileDir + "/folder/test.json", '{}', { encoding: "utf-8" });
            let data: DateMsg = { msg: "hello" };
            fs.writeJSONSync(fileDir + "/folder/test.json", JSON.stringify(data));
            let result: string = fs.readJSONSync(fileDir + "/folder/test.json", "utf-8");
            expect(result).assertEqual('{"msg":"hello"}');
            fs.removeSync(fileDir + "/folder");
        });
        it('copySync', 14, () => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            fs.mkdirsSync(fileDir + "/copySync1/test.txt");
            fs.mkdirsSync(fileDir + "/copySync2");
            fs.copySync(fileDir + "/copySync1/test.txt", fileDir + "/copySync2/test.txt");
            let result: Boolean = fs.pathExistsSync(fileDir + "/copySync2/test.txt");
            expect(result).assertTrue();
            fs.removeSync(fileDir + "/copySync1");
            fs.removeSync(fileDir + "/copySync2");
        });
        it('copy', 15, async () => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            fs.mkdirsSync(fileDir + "/copy1/test.txt");
            fs.mkdirsSync(fileDir + "/copy2");
            let result: boolean = false;
            if (!fs.pathExistsSync(fileDir + "/copy2/test.txt")) {
                await fs.copy(fileDir + "/copy1/test.txt", fileDir + "/copy2").then(() => {
                    result = true;
                }).catch((err: Error) => {
                    console.log('fileioTest copy拷贝失败' + err);
                });
                expect(result).assertTrue();
            }
            fs.removeSync(fileDir + "/copy1");
            fs.removeSync(fileDir + "/copy2");
        });
        it('moveSync', 16, () => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            fs.mkdirsSync(fileDir + "/moveSync1/test.txt");
            fs.mkdirsSync(fileDir + "/moveSync2");
            fs.moveSync(fileDir + "/moveSync1/test.txt", fileDir + "/moveSync2/test.txt");
            let result: Boolean = fs.pathExistsSync(fileDir + "/moveSync2/test.txt");
            expect(result).assertTrue();
            fs.removeSync(fileDir + "/moveSync1");
            fs.removeSync(fileDir + "/moveSync2");
        });
        it('move', 17, async () => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            fs.mkdirsSync(fileDir + "/move1/test.txt");
            fs.mkdirsSync(fileDir + "/move2");
            let result: boolean = false;
            await fs.move(fileDir + "/move1/test.txt", fileDir + "/move2/test.txt").then(() => {
                result = true;
            }).catch((err: Error) => {
                console.log('移动失败' + err);
            });
            expect(result).assertTrue();
            fs.removeSync(fileDir + "/move1");
            fs.removeSync(fileDir + "/move2");
        });
        it('removeSync', 18, () => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            fs.mkdirsSync(fileDir + "/folder/test.txt");
            fs.removeSync(fileDir + "/folder");
            let result: Boolean = fs.pathExistsSync(fileDir + "/folder");
            expect(!result).assertTrue();
        });
        it('remove', 19, async () => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            fs.mkdirsSync(fileDir + "/folder/test.txt");
            let result: boolean = false;
            await fs.remove(fileDir + "/folder").then(() => {
                result = true;
            }).catch((err: Error) => {
                console.log('fileioTest remove删除失败' + err);
            });
            expect(result).assertTrue();
        });
        it('emptyDirSync', 20, () => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            fs.mkdirsSync(fileDir + "/folder");
            fs.mkdirsSync(fileDir + "/folder/111");
            fs.emptyDirSync(fileDir + "/folder");
            let result: Boolean = fs.pathExistsSync(fileDir + "/folder/111");
            expect(!result).assertTrue();
            fs.removeSync(fileDir + "/folder");
        });
        it('emptyDir', 21, async () => {
            let fileDir: string = GlobalContext.getContext().getObject("fileDir") as string;
            fs.mkdirsSync(fileDir + "/folder");
            fs.mkdirsSync(fileDir + "/folder/111");
            let result: boolean = false;
            await fs.emptyDir(fileDir + "/folder").then(() => {
                result = true;
            }).catch((err: Error) => {
                console.log('移动失败' + err);
            });
            expect(result).assertTrue();
            fs.removeSync(fileDir + "/folder");
        });
    });
}
