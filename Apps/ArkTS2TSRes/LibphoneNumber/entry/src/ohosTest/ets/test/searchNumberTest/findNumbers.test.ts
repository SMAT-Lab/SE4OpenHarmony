let __generate__Id: number = 0;
function generateId(): string {
    return "findNumbers.test_" + ++__generate__Id;
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
import { findNumbers } from 'libphonenumber-js';
export default function findNumbersXts() {
    describe('findNumbersTest', () => {
        it("ShouldFindNumbers", 0, () => {
            expect(findNumbers('2133734253', 'US')).assertDeepEquals([{
                    phone: '2133734253',
                    country: 'US',
                    startsAt: 0,
                    endsAt: 10
                }]);
            expect(findNumbers('(213) 373-4253', 'US')).assertDeepEquals([{
                    phone: '2133734253',
                    country: 'US',
                    startsAt: 0,
                    endsAt: 14
                }]);
            expect(findNumbers('The number is +7 (800) 555-35-35 as written in the document.'))
                .assertDeepEquals([{
                    phone: '8005553535',
                    country: 'RU',
                    startsAt: 14,
                    endsAt: 32
                }]);
        });
        it("ShouldFindNumbersCase2", 0, () => {
            expect(findNumbers('The number is +7 (800) 555-35-35 and not (213) 373-4253 (that\'s not even in the same country!) as written in the document.', 'US'))
                .assertDeepEquals([{
                    phone: '8005553535',
                    country: 'RU',
                    startsAt: 14,
                    endsAt: 32
                }, {
                    phone: '2133734253',
                    country: 'US',
                    startsAt: 41,
                    endsAt: 55
                }]);
        });
        it("ShouldFindNumbersCase3", 0, () => {
            expect(findNumbers('The number is +7 (800) 555-35-35 and not (213) 373-4253 as written in the document.', 'US'))
                .assertDeepEquals([{
                    phone: '8005553535',
                    country: 'RU',
                    startsAt: 14,
                    endsAt: 32
                }, {
                    phone: '2133734253',
                    country: 'US',
                    startsAt: 41,
                    endsAt: 55
                }]);
        });
        it("ShouldFindNumbersCase4", 0, () => {
            expect(findNumbers('The number is +7 (800) 555-35-35 as written in the document.'))
                .assertDeepEquals([{
                    phone: '8005553535',
                    country: 'RU',
                    startsAt: 14,
                    endsAt: 32
                }]);
            expect(findNumbers('The number is +7 (800) 555-35-35 as written in the document.', 'US'))
                .assertDeepEquals([{
                    phone: '8005553535',
                    country: 'RU',
                    startsAt: 14,
                    endsAt: 32
                }]);
        });
        it("ShouldFindNumbersCase5", 0, () => {
            expect(findNumbers('Digits 12 are not a number, but +7 (800) 555-35-35 is.'))
                .assertDeepEquals([{
                    phone: '8005553535',
                    country: 'RU',
                    startsAt: 32,
                    endsAt: 50
                }]);
            expect(findNumbers('Date 02/17/2018 is not a number, but +7 (800) 555-35-35 ext. 123 is.'))
                .assertDeepEquals([{
                    phone: '8005553535',
                    country: 'RU',
                    ext: '123',
                    startsAt: 37,
                    endsAt: 64
                }]);
        });
        it("ShouldFindNumbersFromV2", 0, () => {
            const phoneNumbers = findNumbers('The number is +7 (800) 555-35-35 ext. 1234 and not (213) 373-4253 as written in the document.', {
                defaultCountry: "US", v2: true
            });
            expect(phoneNumbers.length).assertEqual(2);
            expect(phoneNumbers[0].startsAt).assertEqual(14);
            expect(phoneNumbers[0].endsAt).assertEqual(42);
            expect(phoneNumbers[1].startsAt).assertEqual(51);
            expect(phoneNumbers[1].endsAt).assertEqual(65);
            expect(phoneNumbers[1].number.country).assertEqual('US');
            expect(phoneNumbers[0].number.country).assertEqual('RU');
            expect(phoneNumbers[0].number.number).assertEqual('+78005553535');
            expect(phoneNumbers[0].number.nationalNumber).assertEqual('8005553535');
            expect(phoneNumbers[1].number.number).assertEqual('+12133734253');
            expect(phoneNumbers[1].number.nationalNumber).assertEqual('2133734253');
            expect(phoneNumbers[1].number.countryCallingCode).assertEqual('1');
            expect(phoneNumbers[0].number.countryCallingCode).assertEqual('7');
        });
        it("ShouldFindNonEuropeanDigits", 0, () => {
            expect(findNumbers('العَرَبِيَّة‎ +٤٤٣٣٣٣٣٣٣٣٣٣عَرَبِيّ‎')).assertDeepEquals([{
                    country: 'GB',
                    phone: '3333333333',
                    startsAt: 14,
                    endsAt: 27
                }]);
        });
    });
}
