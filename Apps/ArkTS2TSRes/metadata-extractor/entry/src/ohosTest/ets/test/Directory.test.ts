let __generate__Id: number = 0;
function generateId(): string {
    return "Directory.test_" + ++__generate__Id;
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
import { Directory, ExifSubIFDDirectory, ExifIFD0Directory } from '@ohos/metadata-extractor';
import { MockDirectory } from './MockDirectory';
let _directory: Directory;
export default function DirectoryTest() {
    describe('DirectoryTest', () => {
        beforeAll(() => {
            _directory = new MockDirectory();
        });
        it('testSetAndGetMultipleTagsInSingleDirectory', 0, () => {
            _directory.setString(ExifSubIFDDirectory.TAG_APERTURE, "TAG_APERTURE");
            _directory.setString(ExifSubIFDDirectory.TAG_BATTERY_LEVEL, "TAG_BATTERY_LEVEL");
            expect("TAG_APERTURE").assertEqual(_directory.getString(ExifSubIFDDirectory.TAG_APERTURE));
            expect("TAG_BATTERY_LEVEL").assertEqual(_directory.getString(ExifSubIFDDirectory.TAG_BATTERY_LEVEL));
        });
        it('testSetSameTagMultipleTimesOverwritesValue', 0, () => {
            _directory.setInt(ExifSubIFDDirectory.TAG_APERTURE, 1);
            _directory.setInt(ExifSubIFDDirectory.TAG_APERTURE, 2);
            expect(2).assertEqual(_directory.getInt(ExifSubIFDDirectory.TAG_APERTURE));
        });
        it('testUnderlyingInt', 0, () => {
            let value: number = 123;
            let tagType: number = 321;
            _directory.setInt(tagType, value);
            expect(value).assertEqual(_directory.getInt(tagType));
        });
        it('testSetAndGetIntArray', 0, () => {
            let inputValues: Int32Array = Int32Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
            let tagType: number = 123;
            _directory.setIntArray(tagType, inputValues);
            let outputValues: Int32Array = _directory.getIntArray(tagType);
            expect(outputValues).not().assertNull();
            expect(inputValues.length).assertEqual(outputValues.length);
        });
        it('testContainsTag', 0, () => {
            expect(_directory.containsTag(ExifSubIFDDirectory.TAG_APERTURE)).assertTrue();
        });
    });
}
