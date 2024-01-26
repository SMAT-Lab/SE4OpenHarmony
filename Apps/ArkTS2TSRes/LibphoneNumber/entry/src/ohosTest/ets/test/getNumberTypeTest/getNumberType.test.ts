let __generate__Id: number = 0;
function generateId(): string {
    return "getNumberType.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
import { describe, it, expect } from '@ohos/hypium';
import { getNumberType, NumberType, parsePhoneNumber, PhoneNumber } from 'libphonenumber-js';
export default function getNumberTypeXts() {
    describe('getNumberTypeTest', () => {
        it("ShouldInferPhoneNumberType", 0, () => {
            expect(getNumberType({
                country: 'US',
                phone: '2133734253'
            }))
                .assertEqual("FIXED_LINE_OR_MOBILE");
        });
        it("ShouldInferPhoneNumberTypeFIXED_LINE_OR_MOBILE", 0, () => {
            expect(getNumberType("2133734253", "US"))
                .assertEqual("FIXED_LINE_OR_MOBILE");
        });
        it("ShouldInferPhoneNumberTypeOneArg", 0, () => {
            const phoneNumberObj: PhoneNumber = parsePhoneNumber("Phone: 8 (800) 555 35 35.", "RU");
            const numberType: NumberType = getNumberType(phoneNumberObj.nationalNumber);
            expect(numberType)
                .assertUndefined();
        });
        it("ShouldInferPhoneNumberTypeOne", 0, () => {
            const numberType: NumberType = getNumberType("7624369230", "IM");
            expect(numberType)
                .assertUndefined();
        });
    });
}
