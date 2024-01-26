let __generate__Id: number = 0;
function generateId(): string {
    return "Bug20LatinDetectedAsMaccyrillic.test_" + ++__generate__Id;
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
import { UniversalDetector } from '@ohos/juniversalchardet';
import { GlobalContext } from '../testability/GlobalContext';
import { typedArrayToBuffer } from './ArrayToBuffer';
export default function Bug20LatinDetectedAsMaccyrillicTest() {
    describe('Bug20LatinDetectedAsMaccyrillicTest', () => {
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
        it('testFile', 0, async () => {
            let data = await getFileEncoding($r('app.media.bug20_example_latin'), "bug20_example_latin.txt");
            expect("MACCYRILLIC").assertEqual(data);
        });
        it('testLatin', 1, () => {
            let data = new Int8Array([-60, -36, -42, -33, -28, -10, -4, 44, 78, 97, 109, 101, 49, -60, -36, -42, -33, -28, -10, -4, 44, 78, 97, 109, 101, 50, -60, -36, -42, -33, -28, -10, -4, 44, 78, 97, 109, 101, 51, -60, -36, -42, -33, -28, -10, -4, 44, 83, 116, 114, 101, 101, 116, -60, -36, -42, -33, -28, -10, -4, 44, 77, -60, -36, -42, -33, -28, -10, -4, 44, 68, 69, 44, 56, 48, 48, 56, 48, 44, 77, -4, 110, 99, 104, 101, 110, 44, 67, 111, 110, 116, 97, 99, 116, -60, -36, -42, -33, -28, -10, -4, 44, 43, 52, 57, 40, 48, 41, -60, -36, -42, -33, -28, -10, -4, 44, -60, -36, -42, -33, -28, -10, -4, 64, 103, 108, 115, 45, 105, 116, 115, 101, 114, 118, 105, 99, 101, 115, 46, 99, 111, 109, 44, 67, 111, 109, 109, 101, 110, 116, -60, -36, -42, -33, -28, -10, -4, 44, 43, 52, 57, 44, 40, 48, 41, 57, 56, 44, 55, 54, 53, 44, 52, 51, 50, 44, 66, 108, -60, -36, -42, -33, -28, -10, -4]);
            let detector = new UniversalDetector();
            detector.handleDataParent(typedArrayToBuffer(data));
            detector.dataEnd();
            expect("MACCYRILLIC").assertEqual(detector.getDetectedCharset());
        });
        it('testUTF8', 2, () => {
            let data = new Int8Array([-61, -124, -61, -100, -61, -106, -61, -97, -61, -92, -61, -74, -61, -68, 44, 78, 97, 109, 101, 49, -61, -124, -61, -100, -61, -106, -61, -97, -61, -92, -61, -74, -61, -68, 44, 78, 97, 109, 101, 50, -61, -124, -61, -100, -61, -106, -61, -97, -61, -92, -61, -74, -61, -68, 44, 78, 97, 109, 101, 51, -61, -124, -61, -100, -61, -106, -61, -97, -61, -92, -61, -74, -61, -68, 44, 83, 116, 114, 101, 101, 116, -61, -124, -61, -100, -61, -106, -61, -97, -61, -92, -61, -74, -61, -68, 44, 77, -61, -124, -61, -100, -61, -106, -61, -97, -61, -92, -61, -74, -61, -68, 44, 68, 69, 44, 56, 48, 48, 56, 48, 44, 77, -61, -68, 110, 99, 104, 101, 110, 44, 67, 111, 110, 116, 97, 99, 116, -61, -124, -61, -100, -61, -106, -61, -97, -61, -92, -61, -74, -61, -68, 44, 43, 52, 57, 40, 48, 41, -61, -124, -61, -100, -61, -106, -61, -97, -61, -92, -61, -74, -61, -68, 44, -61, -124, -61, -100, -61, -106, -61, -97, -61, -92, -61, -74, -61, -68, 64, 103, 108, 115, 45, 105, 116, 115, 101, 114, 118, 105, 99, 101, 115, 46, 99, 111, 109, 44, 67, 111, 109, 109, 101, 110, 116, -61, -124, -61, -100, -61, -106, -61, -97, -61, -92, -61, -74, -61, -68, 44, 43, 52, 57, 44, 40, 48, 41, 57, 56, 44, 55, 54, 53, 44, 52, 51, 50, 44, 66, 108, -61, -124, -61, -100, -61, -106, -61, -97, -61, -92, -61, -74, -61, -68]);
            let detector = new UniversalDetector();
            detector.handleDataParent(typedArrayToBuffer(data));
            detector.dataEnd();
            expect("UTF-8").assertEqual(detector.getDetectedCharset());
        });
    });
}
async function getFileEncoding(encoding: Resource, name: string): Promise<string> {
    let context: Context = GlobalContext.getContext().getObject("context") as Context;
    let filesDir: string = GlobalContext.getContext().getObject("filesDir") as string;
    let result = await context.resourceManager.getMediaContent(encoding.id);
    let filePath = filesDir + `/${name}`;
    let file = fs.openSync(filePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
    fs.writeSync(file.fd, result.buffer);
    fs.closeSync(file);
    let data = await UniversalDetector.detectCharset(filePath);
    return data;
}
