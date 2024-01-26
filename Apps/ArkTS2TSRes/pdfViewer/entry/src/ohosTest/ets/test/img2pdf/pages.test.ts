let __generate__Id: number = 0;
function generateId(): string {
    return "pages.test_" + ++__generate__Id;
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
import fs from '@ohos.file.fs';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import jsPDF from '@ohos/img2pdf';
import { GlobalContext } from './globalThis';
import { Options } from './interface';
import { getContent3, getContent4, getContent5, getContent6, getContent7, getContent8, getArrayBuffer, addPage, getPageWidth, getPageHeight } from '../../../../main/ets/pages/Pdf';
const BASE_COUNT: number = 2000;
export default function pagesTest() {
    let filesDir: string = '';
    describe('PagesTest', () => {
        // Defines a test suite. Two parameters are supported: test suite name and test suite function.
        beforeAll(() => {
            // Presets an action, which is performed only once before all test cases of the test suite start.
            // This API supports only one parameter: preset action function.
        });
        beforeEach(() => {
            let gloContext: Context = GlobalContext.getContext().getObject("context") as Context;
            filesDir = gloContext.filesDir;
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
        it("should_add_new_page", 0, () => {
            let options: Options = {
                floatPrecision: 2
            };
            const doc: jsPDF = new jsPDF(options);
            let content: string = getContent3(doc);
            let buf: ArrayBuffer = getArrayBuffer(doc, content);
            expect(new Uint8Array(buf) != undefined).assertTrue();
            expect(buf.byteLength).assertEqual(content.length);
            const writer = fs.openSync(filesDir + `/should_add_new_page.pdf`, 0o102);
            fs.writeSync(writer.fd, content);
            fs.close(writer);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                fs.openSync(filesDir + `/should_add_new_page.pdf`, 0o102);
            }
            endTime(startTime, 'should_add_new_page');
        });
        it("should_insert_new_page_at_the_beginning", 0, () => {
            let options: Options = {
                floatPrecision: 2
            };
            const doc: jsPDF = new jsPDF(options);
            let content: string = getContent4(doc);
            let buf: ArrayBuffer = getArrayBuffer(doc, content);
            expect(new Uint8Array(buf) != undefined).assertTrue();
            expect(buf.byteLength).assertEqual(content.length);
            const writer = fs.openSync(filesDir + `/should_insert_new_page_at_the_beginning.pdf`, 0o102);
            fs.writeSync(writer.fd, content);
            fs.close(writer);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                fs.openSync(filesDir + `/should_add_new_page.pdf`, 0o102);
            }
            endTime(startTime, 'should_insert_new_page_at_the_beginning');
        });
        it("should_insert_new_page_in_the_middle", 0, () => {
            let options: Options = {
                floatPrecision: 2
            };
            const doc: jsPDF = new jsPDF(options);
            let content: Array<number> = getContent5(doc);
            let buf: ArrayBuffer = getArrayBuffer(doc, content);
            expect(new Uint8Array(buf) != undefined).assertTrue();
            expect(buf.byteLength).assertEqual(content.length);
            const writer = fs.openSync(filesDir + `/should_insert_new_page_in_the_middle.pdf`, 0o102);
            fs.writeSync(writer.fd, buf);
            fs.close(writer);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                fs.openSync(filesDir + `/should_insert_new_page_in_the_middle.pdf`, 0o102);
            }
            endTime(startTime, 'should_insert_new_page_in_the_middle');
        });
        it("should_delete_a_page_in_the_middle", 0, () => {
            let options: Options = {
                floatPrecision: 2
            };
            const doc: jsPDF = new jsPDF(options);
            let content: Array<number> = getContent6(doc);
            let buf: ArrayBuffer = getArrayBuffer(doc, content);
            expect(new Uint8Array(buf) != undefined).assertTrue();
            expect(buf.byteLength).assertEqual(content.length);
            const writer = fs.openSync(filesDir + `/should_insert_new_page_in_the_middle.pdf`, 0o102);
            fs.writeSync(writer.fd, buf);
            fs.close(writer);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                fs.openSync(filesDir + `/should_insert_new_page_in_the_middle.pdf`, 0o102);
            }
            endTime(startTime, 'should_delete_a_page_in_the_middle');
        });
        it("should_insert_two_pages_and_make_them_swap_places", 0, () => {
            let options: Options = {
                floatPrecision: 2
            };
            const doc: jsPDF = new jsPDF(options);
            let content: string = getContent7(doc);
            let buf: ArrayBuffer = getArrayBuffer(doc, content);
            expect(new Uint8Array(buf) != undefined).assertTrue();
            expect(buf.byteLength).assertEqual(content.length);
            const writer = fs.openSync(filesDir + `/should_insert_new_page_in_the_middle.pdf`, 0o102);
            fs.writeSync(writer.fd, content);
            fs.close(writer);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                fs.openSync(filesDir + `/should_insert_new_page_in_the_middle.pdf`, 0o102);
            }
            endTime(startTime, 'should_insert_two_pages_and_make_them_swap_places');
        });
        it("should_insert_new_page_in_the_middle1", 0, () => {
            let options: Options = {
                floatPrecision: 2
            };
            const doc: jsPDF = new jsPDF(options);
            let content: Array<number> = getContent8(doc);
            let buf: ArrayBuffer = getArrayBuffer(doc, content);
            expect(new Uint8Array(buf) != undefined).assertTrue();
            expect(buf.byteLength).assertEqual(content.length);
            const writer = fs.openSync(filesDir + `/should_insert_new_page_in_the_middle.pdf`, 0o102);
            fs.writeSync(writer.fd, buf);
            fs.close(writer);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                fs.openSync(filesDir + `/should_insert_new_page_in_the_middle.pdf`, 0o102);
            }
            endTime(startTime, 'should_insert_new_page_in_the_middle1');
        });
        it("portrait_mode_and_landscape_mode_should_not_switch", 0, () => {
            let options: Options = {
                orientation: "landscape"
            };
            const doc: jsPDF = new jsPDF(options);
            addPage(doc);
            expect(getPageWidth(doc, 0)).assertEqual(getPageWidth(doc, 1));
            expect(getPageHeight(doc, 0)).assertEqual(getPageHeight(doc, 1));
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                addPage(doc);
            }
            endTime(startTime, 'portrait_mode_and_landscape_mode_should_not_switch');
        });
    });
}
function endTime(startTime: number, tag: string) {
    let endTime: number = new Date().getTime();
    let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
    console.info(tag + ":endTime:" + endTime);
    console.log(tag + ":averageTime:" + averageTime + "μs");
}
