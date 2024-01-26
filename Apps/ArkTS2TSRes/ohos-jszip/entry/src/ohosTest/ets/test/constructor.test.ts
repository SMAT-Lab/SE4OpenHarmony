let __generate__Id: number = 0;
function generateId(): string {
    return "constructor.test_" + ++__generate__Id;
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
export default function constructorTest() {
    describe('constructorTest', () => {
        it('JSZip_exists', 0, () => {
            expect(!!JSZip).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                JSZip;
            }
            endTime(startTime, 'JSZip_exists');
        });
        it('new_JSZip', 0, () => {
            const zip = new JSZip();
            expect(zip instanceof JSZip).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                new JSZip();
            }
            endTime(startTime, 'new_JSZip');
        });
        it('JSZip', 0, () => {
            const zip = JSZip();
            expect(zip instanceof JSZip).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                JSZip();
            }
            endTime(startTime, 'JSZip');
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
