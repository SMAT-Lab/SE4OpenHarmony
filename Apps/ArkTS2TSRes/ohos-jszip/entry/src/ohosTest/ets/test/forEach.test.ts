let __generate__Id: number = 0;
function generateId(): string {
    return "forEach.test_" + ++__generate__Id;
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
import JSZip from "jszip";
const BASE_COUNT: number = 2000;
const createZipAll = () => {
    const zip = new JSZip();
    zip.file("Hello.txt", "Hello World\n");
    zip.folder("images")?.file("smile.gif", "R0lGODdhBQAFAIACAAAAAP/eACwAAAAABQAFAAACCIwPkWerClIBADs=", { base64: true });
    return zip;
};
export default function forEachTest() {
    describe('forEachTest', () => {
        it('forEach_works_on', 0, () => {
            const zip = createZipAll();
            let count: number = 0;
            const calls: string[] = [];
            zip.forEach((path, elt) => {
                expect(path).assertEqual(elt.name);
                count++;
                calls.push(path);
            });
            expect(count).assertEqual(3);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                zip.forEach(() => { });
            }
            endTime(startTime, 'forEach_works_on');
        });
        it('forEach_works_on_a_sub_folder', 0, () => {
            const zip = new JSZip();
            const sub = zip.folder("subfolder");
            sub && sub.file("Hello.txt", "Hello World\n");
            sub && sub.folder("images")?.file("smile.gif", "R0lGODdhBQAFAIACAAAAAP/eACwAAAAABQAFAAACCIwPkWerClIBADs=", { base64: true });
            let count: number = 0;
            let calls: string[] = [];
            expect(!!zip.file("subfolder/Hello.txt")).assertTrue();
            sub && sub.forEach((path, elt) => {
                expect(path).assertEqual(elt.name.substr("subfolder/".length));
                count++;
                calls.push(path);
            });
            expect(count).assertEqual(3);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                sub && sub.forEach(() => { });
            }
            endTime(startTime, 'forEach_works_on_a_sub_folder');
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
