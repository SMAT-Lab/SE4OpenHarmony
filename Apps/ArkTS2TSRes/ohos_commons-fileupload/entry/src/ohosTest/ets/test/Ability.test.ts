let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { FormData, FileUpload } from "@ohos/commons-fileupload";
const BASE_COUNT: number = 2000;
const HTTP_COUNT = 2;
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
        it('assertContain', 0, () => {
            // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
            hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.INFO);
            hilog.info(0x0000, 'testTag', '%{public}s', 'it begin');
            let a = 'abc';
            let b = 'b';
            // Defines a variety of assertion methods, which are used to declare expected boolean conditions.
            expect(a).assertContain(b);
            expect(a).assertEqual(a);
        });
        it('test01', 0, () => {
            const formData: any = new FormData();
            formData.append("id", 1);
            expect(formData.result.name).assertUndefined();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                formData.append("id", 1);
            }
            endTime(startTime, 'test01');
        });
        it('test02', 0, () => {
            const formData: any = new FormData();
            formData.append("id", 1);
            let fileUpload = new FileUpload({
                baseUrl: "https://musetransfer.com/",
                readTimeout: 60000,
                connectTimeout: 60000
            });
            let result: boolean | any;
            fileUpload.post("/api/upload", formData).then((res: any) => {
                result = true;
                expect(result).assertDeepEquals(true);
            }).catch((err: any) => {
                result = false;
                expect(result).assertDeepEquals(false);
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                fileUpload.post("/api/upload", formData);
            }
            endTime(startTime, 'test02');
        });
        it('test03', 0, () => {
            const formData: any = new FormData();
            formData.append("id", 1);
            let fileUpload = new FileUpload({
                baseUrl: "https://musetransfer.com/",
                readTimeout: 60000,
                connectTimeout: 60000
            });
            let result: boolean | any;
            fileUpload.get("/api/upload", formData).then((res: any) => {
                result = true;
                expect(result).assertDeepEquals(true);
            }).catch((err: any) => {
                result = false;
                expect(result).assertDeepEquals(false);
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                fileUpload.get("/api/upload", formData);
            }
            endTime(startTime, 'test03');
        });
        it('test04', 0, () => {
            const formData: any = new FormData();
            formData.append("id", 1);
            let fileUpload = new FileUpload({
                baseUrl: "https://musetransfer.com/",
                readTimeout: 60000,
                connectTimeout: 60000
            });
            let result: boolean | any;
            fileUpload.head("/api/upload", formData).then((res: any) => {
                result = true;
                expect(result).assertDeepEquals(true);
            }).catch((err: any) => {
                result = false;
                expect(result).assertDeepEquals(false);
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                fileUpload.head("/api/upload", formData);
            }
            endTime(startTime, 'test04');
        });
        it('test05', 0, () => {
            const formData: any = new FormData();
            formData.append("id", 1);
            let fileUpload = new FileUpload({
                baseUrl: "https://musetransfer.com/",
                readTimeout: 60000,
                connectTimeout: 60000
            });
            let result: boolean | any;
            fileUpload.options("/api/upload", formData).then((res: any) => {
                result = true;
                expect(result).assertDeepEquals(true);
            }).catch((err: any) => {
                result = false;
                expect(result).assertDeepEquals(false);
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                fileUpload.options("/api/upload", formData);
            }
            endTime(startTime, 'test05');
        });
        it('test06', 0, () => {
            const formData: any = new FormData();
            formData.append("id", 1);
            let fileUpload = new FileUpload({
                baseUrl: "https://musetransfer.com/",
                readTimeout: 60000,
                connectTimeout: 60000
            });
            let result: boolean | any;
            fileUpload.put("/api/upload", formData).then((res: any) => {
                result = true;
                expect(result).assertDeepEquals(true);
            }).catch((err: any) => {
                result = false;
                expect(result).assertDeepEquals(false);
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                fileUpload.put("/api/upload", formData);
            }
            endTime(startTime, 'test06');
        });
        it('test07', 0, () => {
            const formData: any = new FormData();
            formData.append("id", 1);
            let fileUpload = new FileUpload({
                baseUrl: "https://musetransfer.com/",
                readTimeout: 60000,
                connectTimeout: 60000
            });
            let result: boolean | any;
            fileUpload.delete("/api/upload", formData).then((res: any) => {
                result = true;
                expect(result).assertDeepEquals(true);
            }).catch((err: any) => {
                result = false;
                expect(result).assertDeepEquals(false);
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                fileUpload.delete("/api/upload", formData);
            }
            endTime(startTime, 'test07');
        });
        it('test08', 0, () => {
            const formData: any = new FormData();
            formData.append("id", 1);
            let fileUpload = new FileUpload({
                baseUrl: "https://musetransfer.com/",
                readTimeout: 60000,
                connectTimeout: 60000
            });
            let result: boolean | any;
            fileUpload.trace("/api/upload", formData).then((res: any) => {
                result = true;
                expect(result).assertDeepEquals(true);
            }).catch((err: any) => {
                result = false;
                expect(result).assertDeepEquals(false);
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                fileUpload.trace("/api/upload", formData);
            }
            endTime(startTime, 'test08');
        });
        it('test09', 0, () => {
            const formData: any = new FormData();
            formData.append("id", 1);
            let fileUpload = new FileUpload({
                baseUrl: "https://musetransfer.com/",
                readTimeout: 60000,
                connectTimeout: 60000
            });
            let result: boolean | any;
            fileUpload.connect("/api/upload", formData).then((res: any) => {
                result = true;
                expect(result).assertDeepEquals(true);
            }).catch((err: any) => {
                result = false;
                expect(result).assertDeepEquals(false);
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                fileUpload.connect("/api/upload", formData);
            }
            endTime(startTime, 'test09');
        });
    });
}
function endTime(startTime: number, tag: string) {
    let endTime: number = new Date().getTime();
    let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
    console.info(tag + ":endTime:" + endTime);
    console.log(tag + ":averageTime:" + averageTime + "μs");
}
