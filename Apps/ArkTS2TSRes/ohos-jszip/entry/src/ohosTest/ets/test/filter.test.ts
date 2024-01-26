let __generate__Id: number = 0;
function generateId(): string {
    return "filter.test_" + ++__generate__Id;
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
import JSZip, { JSZipObject } from "jszip";
const BASE_COUNT: number = 2000;
export default function filterTest() {
    describe('filterTest', () => {
        it('Filtering_a_zip', 0, () => {
            const zip = new JSZip();
            zip.file("1.txt", "1\n");
            zip.file("2.txt", "2\n");
            zip.file("3.log", "3\n");
            const result = zip.filter((relativeFilename) => {
                return relativeFilename.indexOf(".txt") !== -1;
            });
            expect(result.length).assertEqual(2);
            expect(result[0].name.indexOf(".txt") !== -1).assertTrue();
            expect(result[1].name.indexOf(".txt") !== -1).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                zip.filter((relativeFilename) => {
                    return relativeFilename.indexOf(".txt") !== -1;
                });
            }
            endTime(startTime, 'Filtering_a_zip');
        });
        it('Filtering_a_zip_from_a_relative_path2', 0, () => {
            const zip = new JSZip();
            zip.file("foo/1.txt", "1\n");
            zip.file("foo/2.txt", "2\n");
            zip.file("foo/3.log", "3\n");
            zip.file("1.txt", "1\n");
            zip.file("2.txt", "2\n");
            zip.file("3.log", "3\n");
            let count = 0;
            const result: Array<JSZipObject> | undefined = zip.folder("foo")?.filter((relativeFilename) => {
                count++;
                return relativeFilename.indexOf("3") !== -1;
            });
            expect(count).assertEqual(3);
            expect(result?.length).assertEqual(1);
            expect(result && result.length && result[0].name).assertEqual("foo/3.log");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                zip.folder("foo")?.filter((relativeFilename) => {
                    count++;
                    return relativeFilename.indexOf("3") !== -1;
                });
            }
            endTime(startTime, 'Filtering_a_zip_from_a_relative_path2');
        });
        it('Filtering_a_zip_from_a_relative_path', 0, () => {
            const zip = new JSZip();
            zip.file("foo/1.txt", "1\n");
            zip.file("foo/2.txt", "2\n");
            zip.file("foo/3.log", "3\n");
            zip.file("1.txt", "1\n");
            zip.file("2.txt", "2\n");
            zip.file("3.log", "3\n");
            const result: Array<JSZipObject> | undefined = zip.folder("foo")?.filter((relativeFilename, file) => {
                return file.name.indexOf("3") !== -1;
            });
            expect(result?.length).assertEqual(1);
            expect(result && result.length && result[0].name).assertEqual("foo/3.log");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                zip.folder("foo")?.filter((relativeFilename, file) => {
                    return file.name.indexOf("3") !== -1;
                });
            }
            endTime(startTime, 'Filtering_a_zip_from_a_relative_path');
        });
    });
}
function endTime(startTime: number, tag: string) {
    console.log(tag + ":startTime:" + startTime);
    let endTime: number = new Date().getTime();
    let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
    console.log(tag + ":endTime:" + endTime);
    console.log(tag + ":averageTime:" + averageTime + "μs");
}
