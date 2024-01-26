let __generate__Id: number = 0;
function generateId(): string {
    return "BasicFileEncodingDetection.test_" + ++__generate__Id;
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
import { EncodingDetectorInputStream, UniversalDetector } from '@ohos/juniversalchardet';
import fs from '@ohos.file.fs';
import { GlobalContext } from '../testability/GlobalContext';
export default function BasicFileEncodingDetectionTest() {
    describe('BasicFileEncodingDetectionTest', () => {
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
        it('testUTF8Emoji', 0, async () => {
            await getFileEncoding($r('app.media.utf8n_emoji'), "utf8n_emoji.txt", "UTF-8");
        });
        it('testASCII', 1, async () => {
            await getFileEncoding($r('app.media.ascii'), "ascii.txt", "US-ASCII");
        });
        it('testUTF8', 2, async () => {
            await getFileEncoding($r('app.media.utf8'), "utf8.txt", "UTF-8");
        });
        it('testUTF8N', 3, async () => {
            await getFileEncoding($r('app.media.utf8n'), "utf8n.txt", "UTF-8");
        });
        it('testUTF16LE', 4, async () => {
            await getFileEncoding($r('app.media.utf16le'), "utf16le.txt", "UTF-16LE");
        });
        it('testShifJis', 5, async () => {
            await getFileEncoding($r('app.media.shiftjis'), "shiftjis.txt", "SHIFT_JIS");
        });
        it('testEUC', 6, async () => {
            await getFileEncoding($r('app.media.euc'), "euc.txt", "EUC-JP");
        });
        it('testISO2022JP', 7, async () => {
            await getFileEncoding($r('app.media.iso2022jp'), "iso2022jp.txt", "ISO-2022-JP");
        });
        it('testBIG5', 8, async () => {
            await getFileEncoding($r('app.media.big5'), "big5.txt", "BIG5");
        });
        it('testEUCTW', 9, async () => {
            await getFileEncoding($r('app.media.euctw'), "euctw.txt", "EUC-TW");
        });
        it('testEUCKR', 10, async () => {
            await getFileEncoding($r('app.media.euckr'), "euckr.txt", "EUC-KR");
        });
        it('testWindows1255', 11, async () => {
            await getFileEncoding($r('app.media.windows1255'), "windows1255.txt", "WINDOWS-1255");
        });
    });
}
async function getFileEncoding(encoding: Resource, name: string, charset: string): Promise<void> {
    let context: Context = GlobalContext.getContext().getObject("context") as Context;
    let filesDir: string = GlobalContext.getContext().getObject("filesDir") as string;
    let result: Uint8Array = await context.resourceManager.getMediaContent(encoding.id);
    let filePath: string = filesDir + `/${name}`;
    let file = fs.openSync(filePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
    fs.writeSync(file.fd, result.buffer);
    fs.closeSync(file);
    let data = await UniversalDetector.detectCharset(filePath);
    expect(charset).assertEqual(data);
}
