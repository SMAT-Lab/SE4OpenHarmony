let __generate__Id: number = 0;
function generateId(): string {
    return "ByteUtil.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import { ByteUtil } from '@ohos/metadata-extractor';
export default function ByteUtilTest() {
    describe('ByteUtilTest', () => {
        it('testGetInt16', 0, () => {
            let buffer: Int8Array = Int8Array.of(0x7F, -1);
            expect(0x7FFF).assertEqual(ByteUtil.getInt16(buffer, 0, true));
            expect(0xFF7F).assertEqual(ByteUtil.getInt16(buffer, 0, false));
            buffer = Int8Array.of(-1, -1);
            expect(0xFFFF).assertEqual(ByteUtil.getInt16(buffer, 0, true));
            expect(0xFFFF).assertEqual(ByteUtil.getInt16(buffer, 0, false));
            buffer = Int8Array.of(0x1, 0x0);
            expect(0x100).assertEqual(ByteUtil.getInt16(buffer, 0, true));
            expect(0x1).assertEqual(ByteUtil.getInt16(buffer, 0, false));
            buffer = Int8Array.of(0x7F, -1, 0x7F, -1, 0x7F, -1);
            expect(0xFF7F).assertEqual(ByteUtil.getInt16(buffer, 1, true));
            expect(0x7FFF).assertEqual(ByteUtil.getInt16(buffer, 1, false));
            expect(0x7FFF).assertEqual(ByteUtil.getInt16(buffer, 2, true));
            expect(0xFF7F).assertEqual(ByteUtil.getInt16(buffer, 2, false));
        });
        it("testGetInt32", 0, () => {
            let buffer: Int8Array = Int8Array.of(0x7F, -1, -1, -1);
            expect(0x7FFFFFFF).assertEqual(ByteUtil.getInt32(buffer, 0, true));
            expect(-129).assertEqual(ByteUtil.getInt32(buffer, 0, false));
            //
        });
        it("testGetInt64", 0, () => {
            let buffer: Int8Array = Int8Array.of(0x7F, -1, -1, -1, -1, -1, -1, -1);
            expect(-1).assertEqual(ByteUtil.getLong64(buffer, 0, true));
            expect(-1).assertEqual(ByteUtil.getLong64(buffer, 0, false));
        });
    });
}
