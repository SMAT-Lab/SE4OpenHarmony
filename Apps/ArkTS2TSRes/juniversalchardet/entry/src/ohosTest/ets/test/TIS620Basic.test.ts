let __generate__Id: number = 0;
function generateId(): string {
    return "TIS620Basic.test_" + ++__generate__Id;
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
export default function TIS620BasicTest() {
    describe('TIS620BasicTest', () => {
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
        it('testTIS620', 0, async () => {
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            let filesDir: string = GlobalContext.getContext().getObject("filesDir") as string;
            let result = await context.resourceManager.getMediaContent($r('app.media.tis620').id);
            let filePath = filesDir + `/tis620.txt`;
            let file = fs.openSync(filePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
            fs.writeSync(file.fd, result.buffer);
            fs.closeSync(file);
            let data = await UniversalDetector.detectCharset(filePath);
            expect("TIS620").assertEqual(data);
        });
    });
}
