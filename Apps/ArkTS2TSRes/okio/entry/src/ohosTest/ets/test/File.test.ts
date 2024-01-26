let __generate__Id: number = 0;
function generateId(): string {
    return "File.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@ohos/hypium';
import { Okio } from '@ohos/okio';
import fs from '@ohos.file.fs';
import buffer from '@ohos.buffer';
import { GlobalContext } from './GlobalContext';
const content = 'write test data into file. 测试通过okio向文件中写入数据';
export default function fileTest() {
    describe('fileTest', () => {
        beforeAll(() => {
        });
        beforeEach(() => {
        });
        afterEach(() => {
        });
        afterAll(() => {
        });
        it('OkioWriteFile', 0, () => {
            const path = GlobalContext.getContext().getObject("filesDir") + '/testFile.txt';
            // const path = globalThis.filesDir + '/testFile.txt';
            let sink = new Okio.Sink(path);
            sink.write(content, false);
            let contentSize = buffer.from(content).buffer.byteLength;
            let size = fs.statSync(path).size;
            expect(contentSize).assertEqual(size);
        });
        it('OkioReadFile', 0, async () => {
            const path = GlobalContext.getContext().getObject("filesDir") + '/testFile.txt';
            // const path = globalThis.filesDir + '/testFile.txt';
            let sink = new Okio.Sink(path);
            sink.write(content, false);
            let source = new Okio.Source(path);
            if (await source.read() && typeof await source.read() === 'string') {
                expect(await source.read()).assertEqual(content);
            }
            else {
                expect(await source.read()).assertFail();
            }
        });
    });
}
