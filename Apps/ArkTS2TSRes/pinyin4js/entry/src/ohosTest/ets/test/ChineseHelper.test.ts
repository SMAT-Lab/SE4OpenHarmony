let __generate__Id: number = 0;
function generateId(): string {
    return "ChineseHelper.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { ChineseHelper } from '@ohos/pinyin4js';
export default function ChineseHelperTest() {
    describe('ChineseHelperTest', () => {
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
        let sourceTest: (name: string, func: Function) => void = (name: string, func: Function) => {
            it(`${name}`, 0, func);
        };
        sourceTest("ChineseHelperConvertToSimplifiedChinese1", () => {
            expect(ChineseHelper.convertToSimplifiedChinese('臺喪麗')).assertEqual('台丧丽');
        });
        sourceTest("ChineseHelper_convertToTraditionalChinese2", () => {
            expect(ChineseHelper.convertToTraditionalChinese('台丧丽')).assertEqual('臺喪麗');
        });
        sourceTest("ChineseHelperContainsChinese12true3", () => {
            expect(ChineseHelper.containsChinese('12台丧丽')).assertTrue();
        });
        sourceTest("ChineseHelperContainsChinese123false4", () => {
            expect(ChineseHelper.containsChinese('123')).assertFalse();
        });
        sourceTest("ChineseHelperIsTraditionalChinesetrue5", () => {
            expect(ChineseHelper.isTraditionalChinese('臺')).assertTrue();
        });
        sourceTest("ChineseHelperIsTraditionalChinesefalse6", () => {
            expect(ChineseHelper.isTraditionalChinese('台')).assertFalse();
        });
        sourceTest("ChineseHelperisChinesetrue7", () => {
            expect(ChineseHelper.isChinese('台')).assertTrue();
        });
        sourceTest("ChineseHelperIsChinese3false8", () => {
            expect(ChineseHelper.isChinese('3')).assertFalse();
        });
        sourceTest("ChineseHelperIsChineseJfalse9", () => {
            expect(ChineseHelper.isChinese('J')).assertFalse();
        });
    });
}
