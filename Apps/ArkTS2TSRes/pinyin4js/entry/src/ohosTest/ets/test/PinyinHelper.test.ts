let __generate__Id: number = 0;
function generateId(): string {
    return "PinyinHelper.test_" + ++__generate__Id;
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
import { pinyin4js, PinyinHelper, PinyinFormat } from '@ohos/pinyin4js';
export default function PinyinHelperTest() {
    describe('PinyinHelperTest', () => {
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
        sourceTest("PinyinHelperConvertToPinyinString1", () => {
            expect(pinyin4js.convertToPinyinString('厦门你好大厦厦门', ',', pinyin4js.WITH_TONE_MARK)).assertEqual('xià,mén,nǐ,hǎo,dà,shà,xià,mén');
        });
        sourceTest("PinyinHelperConvertToPinyinString2", () => {
            expect(pinyin4js.convertToPinyinString('厦门你好大厦厦门', ',', PinyinFormat.WITH_TONE_MARK)).assertEqual('xià,mén,nǐ,hǎo,dà,shà,xià,mén');
        });
        sourceTest("PinyinHelperConvertToPinyinString3", () => {
            expect(pinyin4js.convertToPinyinString('厦门你好大厦厦门', '#', PinyinFormat.WITH_TONE_MARK)).assertEqual('xià#mén#nǐ#hǎo#dà#shà#xià#mén');
        });
        sourceTest("PinyinHelperConvertToPinyinString4", () => {
            expect(pinyin4js.convertToPinyinString('厦门你好大厦厦门', ',', PinyinFormat.WITHOUT_TONE)).assertEqual('xia,men,ni,hao,da,sha,xia,men');
        });
        sourceTest("PinyinHelperConvertToPinyinString5", () => {
            expect(pinyin4js.convertToPinyinString('脉脉', '', PinyinFormat.WITHOUT_TONE)).assertEqual('momo');
        });
        sourceTest("PinyinHelperConvertToPinyinString6", () => {
            expect(pinyin4js.convertToPinyinString('假期', ',', PinyinFormat.WITH_TONE_MARK)).assertEqual('jià,qī');
        });
        sourceTest("PinyinHelperConvertToPinyinString7", () => {
            expect(pinyin4js.convertToPinyinString('厦门你好大厦厦门', ',', PinyinFormat.WITH_TONE_NUMBER)).assertEqual('xia4,men2,ni3,hao3,da4,sha4,xia4,men2');
        });
        sourceTest("PinyinHelperConvertToPinyinString8", () => {
            expect(pinyin4js.convertToPinyinString('很好JavaScript很好', ' ', PinyinFormat.WITHOUT_TONE)).assertEqual('hen hao JavaScript hen hao');
        });
        sourceTest("PinyinHelperConvertToPinyinString9", () => {
            expect(PinyinHelper.getShortPinyin('厦门你好大厦厦门')).assertEqual('xmnhdsxm');
        });
        sourceTest("PinyinHelperConvertToPinyinString10", () => {
            expect(PinyinHelper.hasMultiPinyin('厦')).assertTrue();
        });
        sourceTest("PinyinHelperConvertToPinyinString11", () => {
            expect(PinyinHelper.hasMultiPinyin('你')).assertFalse();
        });
    });
}
