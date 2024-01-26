let __generate__Id: number = 0;
function generateId(): string {
    return "Date.test_" + ++__generate__Id;
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
import { describe, it, expect } from '@ohos/hypium';
import { getRFC2822Date, getRFC2822DateUTC, isRFC2822Date } from '@ohos/emailjs';
const toD_utc = (dt: number) => getRFC2822DateUTC(new Date(dt));
const toD = (dt: number, utc = false) => getRFC2822Date(new Date(dt), utc);
export default function dateTest() {
    describe('dateTest', () => {
        it('rfc2822_non_UTC', 0, () => {
            expect(isRFC2822Date(toD(0))).assertTrue();
            expect(isRFC2822Date(toD(329629726785))).assertTrue();
            expect(isRFC2822Date(toD(729629726785))).assertTrue();
            expect(isRFC2822Date(toD(1129629726785))).assertTrue();
            expect(isRFC2822Date(toD(1529629726785))).assertTrue();
        });
        it('rfc2822_UTC', 0, () => {
            expect('Thu, 01 Jan 1970 00:00:00 +0000').assertEqual(toD_utc(0));
            expect(toD(0, true)).assertEqual(toD_utc(0));
            expect('Thu, 12 Jun 1980 03:48:46 +0000').assertEqual(toD_utc(329629726785));
            expect(toD(329629726785, true)).assertEqual(toD_utc(329629726785));
            expect('Sat, 13 Feb 1993 18:55:26 +0000').assertEqual(toD_utc(729629726785));
            expect(toD(729629726785, true)).assertEqual(toD_utc(729629726785));
            expect('Tue, 18 Oct 2005 10:02:06 +0000').assertEqual(toD_utc(1129629726785));
            expect(toD(1129629726785, true)).assertEqual(toD_utc(1129629726785));
            expect('Fri, 22 Jun 2018 01:08:46 +0000').assertEqual(toD_utc(1529629726785));
            expect(toD(1529629726785, true)).assertEqual(toD_utc(1529629726785));
        });
    });
}
