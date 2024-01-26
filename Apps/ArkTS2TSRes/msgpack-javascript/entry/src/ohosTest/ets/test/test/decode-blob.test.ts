let __generate__Id: number = 0;
function generateId(): string {
    return "decode-blob.test_" + ++__generate__Id;
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
import buffer from '@ohos.buffer';
import assert from "./assert2hypium";
import { encode, decode, decodeAsync } from "@msgpack/msgpack";
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import Util from "../test/stdlib/Util";
// const MyBlob = buffer.Blob;
export default function DecodeBlobTest() {
    describe('DecodeBlobTest', () => {
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
        it("decodes_it_with_decode_", 0, async () => {
            const encoded = encode<undefined>("Hello!");
            const blob = new buffer.Blob([encoded]);
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            blob.arrayBuffer().then((buffer) => {
                let startTime1 = new Date().getTime();
                let decoded = Util.decodeObject(buffer);
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / 1;
                console.log(`msgpack-javascript:decodes_it_with_decode_ averageTime = ${averageTime1}`);
                assert.deepStrictEqual(decoded, "Hello!");
            });
        });
        it("decodes_it_with_decodeAsync_1", 0, async () => {
            let startTime1 = new Date().getTime();
            const blob = new buffer.Blob([encode<undefined>("Hello!")]);
            let endTime1 = new Date().getTime();
            let averageTime1 = ((endTime1 - startTime1) * 1000) / 1;
            console.log(`msgpack-javascript:decodes_it_with_decodeAsync_1 averageTime = ${averageTime1}`);
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            // use any because the type of Blob#stream() in @types/node does not make sense here.
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            blob.text().then(text => {
                assert.deepStrictEqual(text, "Hello!");
            });
        });
        it("decodes_it_with_decodeAsync_2", 0, async () => {
            let startTime1 = new Date().getTime();
            const blob = new buffer.Blob([encode<undefined>("Hello!")]);
            let endTime1 = new Date().getTime();
            let averageTime1 = ((endTime1 - startTime1) * 1000) / 1;
            console.log(`msgpack-javascript:decodes_it_with_decodeAsync_2 averageTime = ${averageTime1}`);
            blob.arrayBuffer().then(buffer => {
                decodeAsync<undefined>(buffer as Object).then((result: Object) => {
                    assert.deepStrictEqual(result, "Hello!");
                });
            });
        });
        // OH的Blob暂时没有stream能力
        // it("decodes it with `decodeAsync()`", async () => {
        //   const blob = new MyBlob([encode("Hello!")]);
        //   // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        //   if (!blob.stream) {
        //     this.skip();
        //   }
        //
        //   // use any because the type of Blob#stream() in @types/node does not make sense here.
        //   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        //   assert.deepStrictEqual(await decodeAsync(blob.stream() as any), "Hello!");
        // });
    });
}
