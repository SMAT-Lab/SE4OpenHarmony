let __generate__Id: number = 0;
function generateId(): string {
    return "GB18030Samples.test_" + ++__generate__Id;
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
export default function GB18030SamplesTest() {
    describe('GB18030SamplesTest', () => {
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
        it('testGB18030Sample', 0, async () => {
            await getFileEncoding($r('app.media.gb2312_sample'), "gb2312_sample.txt", "GB18030");
        });
        it('testGBKSample', 1, async () => {
            await getFileEncoding($r('app.media.gbk_sample'), "gbk_sample.txt", "GB18030");
        });
    });
}
async function getFileEncoding(encoding: Resource, name: string, charset: string): Promise<void> {
    let context: Context = GlobalContext.getContext().getObject("context") as Context;
    let filesDir: string = GlobalContext.getContext().getObject("filesDir") as string;
    let result = await context.resourceManager.getMediaContent(encoding.id);
    let filePath = filesDir + `/${name}`;
    let file = fs.openSync(filePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
    fs.writeSync(file.fd, result.buffer);
    fs.closeSync(file);
    let data = await UniversalDetector.detectCharset(filePath);
    expect(charset).assertEqual(data);
}
