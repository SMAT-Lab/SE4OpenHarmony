let __generate__Id: number = 0;
function generateId(): string {
    return "searchPhoneNumbersInText.test_" + ++__generate__Id;
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
import { NumberFound, searchPhoneNumbersInText } from 'libphonenumber-js';
import { searchPhoneNumbersInTextTsToEts } from './searchNumberIterableIteratorResultToEts';
export default function searchPhoneNumbersInTextXts() {
    describe('searchPhoneNumbersInTextTest', () => {
        const tmp: Array<NumberFound> = searchPhoneNumbersInTextTsToEts('The number is +7 (800) 555-35-35 and not (213) 373-4253 as written in the document.', 'US');
        console.log("searchPhoneNumbersInTextTsToEts tmp.length == " + tmp.length);
        it("ShouldFindPhoneNumbersWithDefaultCountry", 0, () => {
            expect(tmp[0].number.country).assertEqual("RU");
        });
        it("ShouldFindPhoneNumbersWithLength", 0, () => {
            expect(tmp.length).assertEqual(2);
        });
        it("ShouldFindPhoneNumbersWithCountryCallingCode", 0, () => {
            expect(tmp[0].number.countryCallingCode).assertEqual("7");
        });
        it("ShouldFindPhoneNumbersWithDefaultCallingCode", 0, () => {
            let tmp2: Array<NumberFound> = searchPhoneNumbersInTextTsToEts('The number is +7 (800) 555-35-35 and not (213) 373-4253 as written in the document.', {
                defaultCountry: "RU",
                defaultCallingCode: "7"
            });
            console.log("searchPhoneNumbersInTextTsToEts tmp.length 2 == " + tmp2.length);
            expect(tmp2[0].startsAt).assertEqual(14);
        });
    });
}
