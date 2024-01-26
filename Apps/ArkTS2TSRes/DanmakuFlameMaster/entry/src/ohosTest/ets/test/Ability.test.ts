let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { BaseDanmaku, DanmakuContext, DanmakuFactory, Danmakus, DanmakuTimer, DanmakuUtils, DanmakuView, Duration, IDanmakus, IDisplayer, OhosFileSource, SpecialDanmaku } from '@ohos/danmakuflamemaster';
const BASE_COUNT: number = 2000;
export default function abilityTest() {
    describe('ActsAbilityTest', () => {
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
        it('assertContain', 0, () => {
            // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
            hilog.info(0x0000, 'testTag', '%{public}s', 'it begin');
            let a = 'abc';
            let b = 'b';
            // Defines a variety of assertion methods, which are used to declare expected boolean conditions.
            expect(a).assertContain(b);
            expect(a).assertEqual(a);
        });
        it('test01', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.getBaseComparator()).assertUndefined();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.getBaseComparator();
            }
            endTime(startTime, 'test01');
        });
        it('test02', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.getDisplayer()).assertDeepEquals(danmakuContext.mDisplayer);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.getDisplayer();
            }
            endTime(startTime, 'test02');
        });
        it('test03', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setTypeface('a')).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setTypeface('a');
            }
            endTime(startTime, 'test03');
        });
        it('test57', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setTypeface('123')).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setTypeface('123');
            }
            endTime(startTime, 'test57');
        });
        it('test04', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setDanmakuTransparency(1)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setDanmakuTransparency(1);
            }
            endTime(startTime, 'test04');
        });
        it('test58', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setDanmakuTransparency(10)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setDanmakuTransparency(10);
            }
            endTime(startTime, 'test58');
        });
        it('test05', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setScaleTextSize(1)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setScaleTextSize(1);
            }
            endTime(startTime, 'test05');
        });
        it('test59', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setScaleTextSize(23)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setScaleTextSize(23);
            }
            endTime(startTime, 'test59');
        });
        it('test06', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setScaleTextSize(1)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setScaleTextSize(1);
            }
            endTime(startTime, 'test06');
        });
        it('test60', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setScaleTextSize(88)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setScaleTextSize(88);
            }
            endTime(startTime, 'test60');
        });
        it('test07', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setDanmakuMargin(1)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setDanmakuMargin(1);
            }
            endTime(startTime, 'test07');
        });
        it('test61', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setDanmakuMargin(31)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setDanmakuMargin(31);
            }
            endTime(startTime, 'test61');
        });
        it('test08', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setMarginTop(1)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setMarginTop(1);
            }
            endTime(startTime, 'test08');
        });
        it('test62', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setMarginTop(21)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setMarginTop(21);
            }
            endTime(startTime, 'test62');
        });
        it('test09', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.getFTDanmakuVisibility()).assertDeepEquals(danmakuContext.FTDanmakuVisibility);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.getFTDanmakuVisibility();
            }
            endTime(startTime, 'test09');
        });
        it('test10', 0, () => {
            let danmakuContext = new DanmakuContext();
            danmakuContext.FBDanmakuVisibility = true;
            expect(danmakuContext.getFBDanmakuVisibility()).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.getFBDanmakuVisibility();
            }
            endTime(startTime, 'test10');
        });
        it('test63', 0, () => {
            let danmakuContext = new DanmakuContext();
            danmakuContext.FBDanmakuVisibility = false;
            expect(danmakuContext.getFBDanmakuVisibility()).assertFalse();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.getFBDanmakuVisibility();
            }
            endTime(startTime, 'test63');
        });
        it('test11', 0, () => {
            let danmakuContext = new DanmakuContext();
            danmakuContext.L2RDanmakuVisibility = true;
            expect(danmakuContext.getL2RDanmakuVisibility()).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.getL2RDanmakuVisibility();
            }
            endTime(startTime, 'test11');
        });
        it('test64', 0, () => {
            let danmakuContext = new DanmakuContext();
            danmakuContext.L2RDanmakuVisibility = false;
            expect(danmakuContext.getL2RDanmakuVisibility()).assertFalse();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.getL2RDanmakuVisibility();
            }
            endTime(startTime, 'test64');
        });
        it('test12', 0, () => {
            let danmakuContext = new DanmakuContext();
            danmakuContext.SpecialDanmakuVisibility = true;
            expect(danmakuContext.getSpecialDanmakuVisibility()).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.getSpecialDanmakuVisibility();
            }
            endTime(startTime, 'test12');
        });
        it('test65', 0, () => {
            let danmakuContext = new DanmakuContext();
            danmakuContext.SpecialDanmakuVisibility = false;
            expect(danmakuContext.getSpecialDanmakuVisibility()).assertFalse();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.getSpecialDanmakuVisibility();
            }
            endTime(startTime, 'test65');
        });
        it('test13', 0, () => {
            let danmakuContext = new DanmakuContext();
            danmakuContext.SpecialDanmakuVisibility = true;
            expect(danmakuContext.getSpecialDanmakuVisibility()).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.getSpecialDanmakuVisibility();
            }
            endTime(startTime, 'test13');
        });
        it('test66', 0, () => {
            let danmakuContext = new DanmakuContext();
            danmakuContext.SpecialDanmakuVisibility = false;
            expect(danmakuContext.getSpecialDanmakuVisibility()).assertFalse();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.getSpecialDanmakuVisibility();
            }
            endTime(startTime, 'test66');
        });
        it('test14', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setSpecialDanmakuVisibility(true)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setSpecialDanmakuVisibility(true);
            }
            endTime(startTime, 'test14');
        });
        it('test67', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setSpecialDanmakuVisibility(false)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setSpecialDanmakuVisibility(false);
            }
            endTime(startTime, 'test67');
        });
        it('test15', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setMaximumVisibleSizeInScreen(1)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setMaximumVisibleSizeInScreen(1);
            }
            endTime(startTime, 'test15');
        });
        it('test68', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setMaximumVisibleSizeInScreen(22)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setMaximumVisibleSizeInScreen(22);
            }
            endTime(startTime, 'test68');
        });
        it('test16', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setDanmakuStyle(1)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setDanmakuStyle(1);
            }
            endTime(startTime, 'test16');
        });
        it('test69', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setDanmakuStyle(90)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setDanmakuStyle(90);
            }
            endTime(startTime, 'test69');
        });
        it('test17', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setDanmakuBold(true)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setDanmakuBold(true);
            }
            endTime(startTime, 'test17');
        });
        it('test70', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setDanmakuBold(false)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setDanmakuBold(false);
            }
            endTime(startTime, 'test70');
        });
        it('test18', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setColorValueWhiteList([1, 2])).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setColorValueWhiteList([1, 2]);
            }
            endTime(startTime, 'test18');
        });
        it('test71', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setColorValueWhiteList([])).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setColorValueWhiteList([]);
            }
            endTime(startTime, 'test71');
        });
        it('test19', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.getColorValueWhiteList()).assertDeepEquals(danmakuContext.mColorValueWhiteList);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.getColorValueWhiteList();
            }
            endTime(startTime, 'test19');
        });
        it('test21', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setUserHashBlackList([])).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setUserHashBlackList([]);
            }
            endTime(startTime, 'test21');
        });
        it('test72', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setUserHashBlackList(['bush'])).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setUserHashBlackList(['bush']);
            }
            endTime(startTime, 'test72');
        });
        it('test22', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.removeUserHashBlackList([])).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.removeUserHashBlackList([]);
            }
            endTime(startTime, 'test22');
        });
        it('test73', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.removeUserHashBlackList(['push'])).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.removeUserHashBlackList(['push']);
            }
            endTime(startTime, 'test73');
        });
        it('test23', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.addUserHashBlackList([])).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.addUserHashBlackList([]);
            }
            endTime(startTime, 'test23');
        });
        it('test74', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.addUserHashBlackList(['abc'])).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.addUserHashBlackList(['abc']);
            }
            endTime(startTime, 'test74');
        });
        it('test24', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.getUserHashBlackList()).assertDeepEquals(danmakuContext.mUserHashBlackList);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.getUserHashBlackList();
            }
            endTime(startTime, 'test24');
        });
        it('test25', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setUserIdBlackList([])).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setUserIdBlackList([]);
            }
            endTime(startTime, 'test25');
        });
        it('test75', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setUserIdBlackList([1, 2])).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setUserIdBlackList([1, 2]);
            }
            endTime(startTime, 'test75');
        });
        it('test26', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.removeUserIdBlackList([])).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.removeUserIdBlackList([]);
            }
            endTime(startTime, 'test26');
        });
        it('test76', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.removeUserIdBlackList([23])).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.removeUserIdBlackList([23]);
            }
            endTime(startTime, 'test76');
        });
        it('test27', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.addUserIdBlackList([])).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.addUserIdBlackList([]);
            }
            endTime(startTime, 'test27');
        });
        it('test77', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.addUserIdBlackList([77])).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.addUserIdBlackList([77]);
            }
            endTime(startTime, 'test77');
        });
        it('test28', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.getUserIdBlackList()).assertDeepEquals(danmakuContext.mUserIdBlackList);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.getUserIdBlackList();
            }
            endTime(startTime, 'test28');
        });
        it('test29', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.blockGuestDanmaku(true)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.blockGuestDanmaku(true);
            }
            endTime(startTime, 'test29');
        });
        it('test78', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.blockGuestDanmaku(false)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.blockGuestDanmaku(false);
            }
            endTime(startTime, 'test78');
        });
        it('test30', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setScrollSpeedFactor(1)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setScrollSpeedFactor(1);
            }
            endTime(startTime, 'test30');
        });
        it('test79', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setScrollSpeedFactor(55)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setScrollSpeedFactor(55);
            }
            endTime(startTime, 'test79');
        });
        it('test31', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setDuplicateMergingEnabled(true)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setDuplicateMergingEnabled(true);
            }
            endTime(startTime, 'test31');
        });
        it('test80', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setDuplicateMergingEnabled(false)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setDuplicateMergingEnabled(false);
            }
            endTime(startTime, 'test80');
        });
        it('test33', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.alignBottom(true)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.alignBottom(true);
            }
            endTime(startTime, 'test33');
        });
        it('test81', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.alignBottom(false)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.alignBottom(false);
            }
            endTime(startTime, 'test81');
        });
        it('test35', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.resetContext()).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.resetContext();
            }
            endTime(startTime, 'test35');
        });
        it('test36', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setFTDanmakuVisibility(true)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setFTDanmakuVisibility(true);
            }
            endTime(startTime, 'test36');
        });
        it('test82', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setFTDanmakuVisibility(false)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setFTDanmakuVisibility(false);
            }
            endTime(startTime, 'test82');
        });
        it('test37', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setFTDanmakuVisibility(true)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setFTDanmakuVisibility(true);
            }
            endTime(startTime, 'test37');
        });
        it('test83', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setFTDanmakuVisibility(false)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setFTDanmakuVisibility(false);
            }
            endTime(startTime, 'test83');
        });
        it('test38', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setFBDanmakuVisibility(true)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setFBDanmakuVisibility(true);
            }
            endTime(startTime, 'test38');
        });
        it('test84', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setFBDanmakuVisibility(false)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setFBDanmakuVisibility(false);
            }
            endTime(startTime, 'test84');
        });
        it('test39', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setL2RDanmakuVisibility(true)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setL2RDanmakuVisibility(true);
            }
            endTime(startTime, 'test39');
        });
        it('test85', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setL2RDanmakuVisibility(false)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setL2RDanmakuVisibility(false);
            }
            endTime(startTime, 'test85');
        });
        it('test40', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setR2LDanmakuVisibility(true)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setR2LDanmakuVisibility(true);
            }
            endTime(startTime, 'test40');
        });
        it('test89', 0, () => {
            let danmakuContext = new DanmakuContext();
            expect(danmakuContext.setR2LDanmakuVisibility(false)).assertDeepEquals(danmakuContext);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuContext.setR2LDanmakuVisibility(false);
            }
            endTime(startTime, 'test89');
        });
        it('test41', 0, () => {
            let danmakuTimer = new DanmakuTimer();
            expect(danmakuTimer.update(12)).assertDeepEquals(12);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuTimer.update(12);
            }
            endTime(startTime, 'test41');
        });
        it('test42', 0, () => {
            let danmakuTimer = new DanmakuTimer();
            expect(danmakuTimer.getLastInterval()).assertDeepEquals(0);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuTimer.getLastInterval();
            }
            endTime(startTime, 'test42');
        });
        it('test43', 0, () => {
            let danmakuTimer = new DanmakuTimer();
            expect(danmakuTimer.add(12)).assertDeepEquals(12);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                danmakuTimer.add(12);
            }
            endTime(startTime, 'test43');
        });
        it('test44', 0, () => {
            let duration = new Duration(12);
            expect(duration.setValue(12)).assertDeepEquals(undefined);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                duration.setValue(12);
            }
            endTime(startTime, 'test44');
        });
        it('test45', 0, () => {
            let duration = new Duration(12);
            expect(duration.setFactor(12)).assertDeepEquals(undefined);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                duration.setFactor(12);
            }
            endTime(startTime, 'test45');
        });
        it('test46', 0, () => {
            let specialDanmaku = new SpecialDanmaku();
            expect(specialDanmaku.getLeft()).assertDeepEquals(undefined);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                specialDanmaku.getLeft();
            }
            endTime(startTime, 'test46');
        });
        it('test47', 0, () => {
            let specialDanmaku = new SpecialDanmaku();
            expect(specialDanmaku.getTop()).assertDeepEquals(undefined);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                specialDanmaku.getTop();
            }
            endTime(startTime, 'test47');
        });
        it('test48', 0, () => {
            let specialDanmaku = new SpecialDanmaku();
            expect(specialDanmaku.getRight()).assertDeepEquals(undefined);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                specialDanmaku.getRight();
            }
            endTime(startTime, 'test48');
        });
        it('test49', 0, () => {
            let specialDanmaku = new SpecialDanmaku();
            expect(specialDanmaku.getBottom()).assertDeepEquals(undefined);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                specialDanmaku.getBottom();
            }
            endTime(startTime, 'test49');
        });
        it('test50', 0, () => {
            let specialDanmaku = new SpecialDanmaku();
            expect(specialDanmaku.getType()).assertDeepEquals(7);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                specialDanmaku.getType();
            }
            endTime(startTime, 'test50');
        });
        it('test51', 0, () => {
            let specialDanmaku = new SpecialDanmaku();
            expect(specialDanmaku.setTranslationData(1, 2, 3, 4, 5, 6)).assertDeepEquals(undefined);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                specialDanmaku.setTranslationData(1, 2, 3, 4, 5, 6);
            }
            endTime(startTime, 'test51');
        });
        it('test52', 0, () => {
            let specialDanmaku = new SpecialDanmaku();
            expect(specialDanmaku.setAlphaData(1, 2, 3)).assertDeepEquals(undefined);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                specialDanmaku.setAlphaData(1, 2, 3);
            }
            endTime(startTime, 'test52');
        });
        it('test53', 0, () => {
            let danmaku: BaseDanmaku | any;
            expect(DanmakuUtils.compare(danmaku, danmaku)).assertDeepEquals(0);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                DanmakuUtils.compare(danmaku, danmaku);
            }
            endTime(startTime, 'test53');
        });
        it('test54', 0, () => {
            let danmaku: BaseDanmaku | any;
            expect(DanmakuUtils.isDuplicate(danmaku, danmaku)).assertDeepEquals(false);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                DanmakuUtils.isDuplicate(danmaku, danmaku);
            }
            endTime(startTime, 'test54');
        });
        it('test55', 0, () => {
            let array = DanmakuFactory.create();
            expect(array.CURRENT_DISP_WIDTH).assertDeepEquals(0);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                array.CURRENT_DISP_WIDTH;
            }
            endTime(startTime, 'test55');
        });
    });
}
function endTime(startTime: number, tag: string) {
    console.info(tag + ":startTime:" + startTime);
    let endTime: number = new Date().getTime();
    let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
    console.info(tag + ":endTime:" + endTime);
    console.log(tag + ":averageTime:" + averageTime + "μs");
}
