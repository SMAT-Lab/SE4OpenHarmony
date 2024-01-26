let __generate__Id: number = 0;
function generateId(): string {
    return "parseIncompletePhoneNumber.test_" + ++__generate__Id;
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
import { parseIncompletePhoneNumber, parsePhoneNumberCharacter, parseDigits } from 'libphonenumber-js';
export default function parseIncompletePhoneNumberXts() {
    describe('parseIncompletePhoneNumberTest', () => {
        it("ShouldParseIncompletePhoneNumber", 0, () => {
            expect(parseIncompletePhoneNumber('')).assertEqual('');
            // Doesn't accept non-leading `+`.
            expect(parseIncompletePhoneNumber('++')).assertEqual('+');
            // Accepts leading `+`.
            expect(parseIncompletePhoneNumber('+7 800 555')).assertEqual('+7800555');
            // Parses digits.
            expect(parseIncompletePhoneNumber('8 (800) 555')).assertEqual('8800555');
        });
        it("ShouldParseIncompletePhoneNumber_ParsesNonEuropeanDigits", 0, () => {
            // Parses non-European digits.
            expect(parseIncompletePhoneNumber('+٤٤٢٣٢٣٢٣٤')).assertEqual('+442323234');
        });
        it("ShouldParsePhoneNumberCharacter", 0, () => {
            // Doesn't accept non-leading `+`.
            expect(parsePhoneNumberCharacter('++')).assertUndefined();
            // Parses non-European digits.
            expect(parsePhoneNumberCharacter('٤')).assertEqual('4');
            // Dismisses other characters.
            expect(parsePhoneNumberCharacter('-')).assertUndefined();
        });
        it("ShouldParsePhoneNumberCharacter_AcceptsLeading", 0, () => {
            // Accepts leading `+`.
            expect(parsePhoneNumberCharacter('+')).assertEqual('+');
        });
        it("ShouldParsePhoneNumberCharacter_ParsesDigits", 0, () => {
            // Parses digits.
            expect(parsePhoneNumberCharacter('1')).assertEqual('1');
        });
        it("parseDigits", 0, () => {
            expect(parseDigits("x123")).assertEqual("123");
            expect(parseDigits("+86")).assertEqual("86");
            expect(parseDigits("٤٤٢٣")).assertEqual("4423");
            expect(parseDigits("+٤٤٢٣٢٣٢٣٤")).assertEqual("442323234");
        });
    });
}
