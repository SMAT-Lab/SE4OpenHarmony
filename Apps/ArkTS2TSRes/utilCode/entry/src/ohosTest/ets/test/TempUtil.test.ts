let __generate__Id: number = 0;
function generateId(): string {
    return "TempUtil.test_" + ++__generate__Id;
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
import { TempUtils } from '@ohos/util_code';
export default function TempUtilsTest() {
    describe('ActsTempUtilsTest', () => {
        it('F2C', 0, () => {
            // Defines a variety of assertion methods, which are used to declare expected boolean conditions.
            expect(TempUtils.F2C(89.6)).assertEqual(32);
        });
        it('F2C_min', 0, () => {
            // Defines a variety of assertion methods, which are used to declare expected boolean conditions.
            expect(TempUtils.F2C(-459.4)).assertEqual(-273);
        });
        it('F2C_big', 0, () => {
            // Defines a variety of assertion methods, which are used to declare expected boolean conditions.
            expect(TempUtils.F2C(1830.200)).assertEqual(999.0000000000001);
        });
        it('F2C_hex', 0, () => {
            // Defines a variety of assertion methods, which are used to declare expected boolean conditions.
            expect(TempUtils.F2C(0x64)).assertEqual(37.77777777777778);
        });
        it('F2C_percent', 0, () => {
            // Defines a variety of assertion methods, which are used to declare expected boolean conditions.
            expect(TempUtils.F2C(12 / 50)).assertEqual(-17.644444444444446);
        });
        it('C2F', 0, () => {
            // Defines a variety of assertion methods, which are used to declare expected boolean conditions.
            expect(TempUtils.C2F(32)).assertEqual(89.6);
        });
        it('C2F_min', 0, () => {
            // Defines a variety of assertion methods, which are used to declare expected boolean conditions.
            expect(TempUtils.C2F(-273)).assertEqual(-459.40000000000003);
        });
        it('C2F_big', 0, () => {
            // Defines a variety of assertion methods, which are used to declare expected boolean conditions.
            expect(TempUtils.C2F(999)).assertEqual(1830.200);
        });
        it('C2F_hex', 0, () => {
            // Defines a variety of assertion methods, which are used to declare expected boolean conditions.
            expect(TempUtils.C2F(0x64)).assertEqual(212);
        });
        it('C2F_percent', 0, () => {
            // Defines a variety of assertion methods, which are used to declare expected boolean conditions.
            expect(TempUtils.C2F(12 / 50)).assertEqual(32.43200);
        });
    });
}
