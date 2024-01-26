let __generate__Id: number = 0;
function generateId(): string {
    return "Uint8Array.test_" + ++__generate__Id;
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
import { atob } from '@ohos/img2pdf/src/main/ets/components/libs/AtobBtoa';
import { GlobalContext } from './globalThis';
import { Options } from './interface';
import { getContent2, getArrayBuffer } from '../../../../main/ets/pages/Pdf';
const BASE_COUNT: number = 2000;
export default function addimageUint8ArrayTest() {
    describe('addimageUint8ArrayTest', () => {
        let jpgImage = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAABAAEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+f+iiigD/2Q==";
        let jpgImageUint8Array = convertDataURIToArrayBuffer(jpgImage);
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
        it("Uint8Array_getImageFileTypeByImageData", 0, () => {
            expect(jsPDF.API.__addimage__.getImageFileTypeByImageData(jpgImageUint8Array)).assertEqual("JPEG");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                jsPDF.API.__addimage__.getImageFileTypeByImageData(jpgImageUint8Array);
            }
            endTime(startTime, 'Uint8Array_getImageFileTypeByImageData');
        });
        it("Uint8Array_addImagae", 0, () => {
            let gloContext: Context = GlobalContext.getContext().getObject("context") as Context;
            let filesDir: string = gloContext.filesDir;
            let options: Options = {
                orientation: "p",
                unit: "pt",
                format: "a4",
                floatPrecision: 2
            };
            const doc: jsPDF = new jsPDF(options);
            let content: Array<number> = getContent2(doc, jpgImageUint8Array, "JPEG", 15, 40, 1, 1);
            expect(content.length).assertEqual(3876);
            let buf: ArrayBuffer = getArrayBuffer(doc, content);
            expect(new Uint8Array(buf) != undefined).assertTrue();
            expect(buf.byteLength).assertEqual(3876);
            const writer = fs.openSync(filesDir + `/jpg.pdf`, 0o102);
            fs.writeSync(writer.fd, buf);
            fs.close(writer);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                new Uint8Array(buf);
            }
            endTime(startTime, 'Uint8Array_addImagae');
        });
    });
}
function convertDataURIToArrayBuffer(dataURI: string) {
    let BASE64_MARKER = ";base64,";
    let base64Index: number = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    let base64: string = dataURI.substring(base64Index);
    let raw: string = atob(base64);
    let rawLength: number = raw.length;
    let array = new Uint8Array(new ArrayBuffer(rawLength));
    let i = 0;
    for (i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }
    return array;
}
function endTime(startTime: number, tag: string) {
    let endTime: number = new Date().getTime();
    let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
    console.info(tag + ":endTime:" + endTime);
    console.log(tag + ":averageTime:" + averageTime + "μs");
}
