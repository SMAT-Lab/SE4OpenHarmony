let __generate__Id: number = 0;
function generateId(): string {
    return "InterfaceTime.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { describe, expect, it, TestType } from '@ohos/hypium';
import { FormData, FileUpload } from "@ohos/commons-fileupload";
export default function InterfaceTime() {
    describe("InterfaceTime", () => {
        const BASE_COUNT = 2000;
        const BASELINE_CREATEHTTP = 2000;
        it("formData.append", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                const formData: any = new FormData();
                formData.append("id", 1);
            }
            let endTime = new Date().getTime();
            console.log("formData.append:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("formData.append:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
    });
}
