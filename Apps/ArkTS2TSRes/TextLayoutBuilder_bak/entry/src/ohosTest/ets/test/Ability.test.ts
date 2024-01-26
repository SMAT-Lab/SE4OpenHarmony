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
import { TextLayout } from '@ohos/TextLayoutBuilder';
const BASE_COUNT: number = 2000;
export default function abilityTest() {
    let layout: TextLayout.Layout = new TextLayout.Layout();
    describe('appInfoTest', () => {
        it('app_info_test_001', 0, () => {
            let startTime = new Date().getTime();
            console.log("app_info_test_001:startTime:" + startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                layout.setText("TEST");
            }
            endTime(startTime, 'app_info_test_001');
            layout.setText("TEST");
            expect("TEST").assertEqual(layout.getText());
        });
        it('app_info_test_002', 0, () => {
            layout.setEllipsize(TextOverflow.Ellipsis);
            let startTime = new Date().getTime();
            console.log("app_info_test_002:startTime:" + startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                layout.setEllipsize(TextOverflow.Ellipsis);
            }
            endTime(startTime, ' app_info_test_002');
            expect(TextOverflow.Ellipsis).assertEqual(layout.getEllipsize());
        });
        it('app_info_test_003', 0, () => {
            let startTime = new Date().getTime();
            console.log("app_info_test_003:startTime:" + startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                layout.setMaxLines(2);
            }
            endTime(startTime, ' app_info_test_003');
            layout.setMaxLines(2);
            expect(2).assertEqual(layout.getMaxLines());
        });
        it('app_info_test_004', 0, () => {
            let startTime = new Date().getTime();
            console.log("app_info_test_004:startTime:" + startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                layout.setSingleLine(true);
            }
            endTime(startTime, ' app_info_test_004');
            layout.setSingleLine(true);
            expect(true).assertEqual(layout.getSingleLine());
        });
        it('app_info_test_005', 0, () => {
            let startTime = new Date().getTime();
            console.log("app_info_test_005:startTime:" + startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                layout.setLinkColor(Color.Red);
            }
            endTime(startTime, ' app_info_test_005');
            layout.setLinkColor(Color.Red);
            expect(Color.Red).assertEqual(layout.getLinkColor());
        });
        it('app_info_test_006', 0, () => {
            let startTime = new Date().getTime();
            console.log("app_info_test_006:startTime:" + startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                layout.setMaxEms(5);
            }
            endTime(startTime, ' app_info_test_006');
            layout.setMaxEms(5);
            expect(5).assertEqual(layout.getMaxEms());
        });
        it('app_info_test_007', 0, () => {
            let startTime = new Date().getTime();
            console.log("app_info_test_007:startTime:" + startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                layout.setMinWidth(200);
            }
            endTime(startTime, ' app_info_test_007');
            layout.setMinWidth(200);
            expect(200).assertEqual(layout.getMinWidth());
        });
        it('app_info_test_008', 0, () => {
            let startTime = new Date().getTime();
            console.log("app_info_test_008:startTime:" + startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                layout.setTextSpacingExtra(10);
            }
            endTime(startTime, ' app_info_test_008');
            layout.setTextSpacingExtra(10);
            expect(10).assertEqual(layout.getTextSpacingExtra());
        });
    });
}
function endTime(startTime: number, tag: string) {
    let endTime: number = new Date().getTime();
    let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
    console.log(tag + ":endTime:" + endTime);
    console.log(tag + ":averageTime:" + averageTime + "μs");
}
