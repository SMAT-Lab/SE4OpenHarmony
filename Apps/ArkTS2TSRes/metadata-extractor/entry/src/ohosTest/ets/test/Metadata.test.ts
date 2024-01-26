let __generate__Id: number = 0;
function generateId(): string {
    return "Metadata.test_" + ++__generate__Id;
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
import { ExifSubIFDDirectory, Metadata } from '@ohos/metadata-extractor';
export default function MetadataTest() {
    describe('MetadataTest', () => {
        it('testHasErrors', 0, () => {
            let directory: ExifSubIFDDirectory = new ExifSubIFDDirectory();
            directory.addError("Test Error 1");
            let metadata: Metadata = new Metadata();
            expect(metadata.hasErrors()).assertFalse();
            metadata.addDirectory(directory);
            expect(metadata.hasErrors()).assertTrue();
        });
    });
}
