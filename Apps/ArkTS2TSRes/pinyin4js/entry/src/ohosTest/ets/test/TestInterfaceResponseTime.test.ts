let __generate__Id: number = 0;
function generateId(): string {
    return "TestInterfaceResponseTime.test_" + ++__generate__Id;
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
import { describe, it, expect, TestType } from '@ohos/hypium';
import { ChineseHelper, pinyin4js, PinyinFormat, PinyinHelper } from '@ohos/pinyin4js';
export default function PinyinHelperJsunit() {
    describe('PinyinHelper', () => {
        const BASE_COUNT = 2000;
        const HTTP_COUNT = 2;
        const BASELINE_HASSIMECASR = 500;
        const BASELINE_CREATEHTTP = 500;
        const BASELINE_REQUEST = 2500;
        const BASELINE_DESTROY = 30;
        // pinyin4js.convertToPinyinString
        it('TestPinyinHelperInterface_001', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                pinyin4js.convertToPinyinString('厦门你好大厦厦门', ',', pinyin4js.WITH_TONE_MARK);
            }
            let endTime = new Date().getTime();
            console.info("TestPinyinHelperInterface_001 endTime" + endTime);
            let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
            console.log("TestPinyinHelperInterface_001 averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        // PinyinHelper.getShortPinyin
        it('TestPinyinHelperInterface_002', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                PinyinHelper.getShortPinyin('厦门你好大厦厦门');
            }
            let endTime = new Date().getTime();
            console.info("TestPinyinHelperInterface_002 endTime" + endTime);
            let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
            console.log("TestPinyinHelperInterface_002 averageTime:" + averageTime + "μs");
            expect(averageTime > BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        //  PinyinHelper.hasMultiPinyin
        it('TestPinyinHelperInterface_003', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                PinyinHelper.hasMultiPinyin('厦');
            }
            let endTime = new Date().getTime();
            console.info("TestPinyinHelperInterface_003 endTime" + endTime);
            let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
            console.log("TestPinyinHelperInterface_003 averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        //convertToPinyinString
        it('TestPinyinHelperInterface_004', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                pinyin4js.convertToPinyinString('厦门你好大厦厦门', ',', PinyinFormat.WITH_TONE_MARK);
            }
            let endTime = new Date().getTime();
            console.info("TestPinyinHelperInterface_004 endTime" + endTime);
            let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
            console.log("TestPinyinHelperInterface_004 averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        //  ChineseHelper.convertToSimplifiedChinese
        it('TestPinyinHelperInterface_005', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                ChineseHelper.convertToSimplifiedChinese('臺喪麗');
            }
            let endTime = new Date().getTime();
            console.info("TestPinyinHelperInterface_005 endTime" + endTime);
            let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
            console.log("TestPinyinHelperInterface_005 averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        //ChineseHelper.convertToTraditionalChinese
        it('TestPinyinHelperInterface_006', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                ChineseHelper.convertToTraditionalChinese('台丧丽');
            }
            let endTime = new Date().getTime();
            console.info("TestPinyinHelperInterface_006 endTime" + endTime);
            let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
            console.log("TestPinyinHelperInterface_006 averageTime:" + averageTime + "μs");
            expect(averageTime > BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        //ChineseHelper.containsChinese
        it('TestPinyinHelperInterface_007', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                ChineseHelper.containsChinese('12台丧丽');
            }
            let endTime = new Date().getTime();
            console.info("TestPinyinHelperInterface_007 endTime" + endTime);
            let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
            console.log("TestPinyinHelperInterface_007 averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        //ChineseHelper.isTraditionalChinese
        it('TestPinyinHelperInterface_008', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                ChineseHelper.isTraditionalChinese('臺');
            }
            let endTime = new Date().getTime();
            console.info("TestPinyinHelperInterface_008 endTime" + endTime);
            let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
            console.log("TestPinyinHelperInterface_008 averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        //ChineseHelper.isChinese
        it('TestPinyinHelperInterface_009', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                ChineseHelper.isChinese('台');
            }
            let endTime = new Date().getTime();
            console.info("TestPinyinHelperInterface_009 endTime" + endTime);
            let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
            console.log("TestPinyinHelperInterface_009 averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
    });
}
