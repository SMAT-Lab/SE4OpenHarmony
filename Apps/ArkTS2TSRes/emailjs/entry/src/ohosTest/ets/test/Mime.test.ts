let __generate__Id: number = 0;
function generateId(): string {
    return "Mime.test_" + ++__generate__Id;
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
import { mimeEncode, mimeWordEncode } from '@ohos/emailjs';
export default function mimeTest() {
    describe('mimeTest', () => {
        it('mimeEncode_should_encode_UTF_8', 0, () => {
            expect("tere =C3=95=C3=84=C3=96=C3=95").assertEqual(mimeEncode('tere ÕÄÖÕ'));
        });
        it('mimeEncode_should_encode_trailing_whitespace', 0, () => {
            expect('tere =20').assertEqual(mimeEncode('tere  '));
        });
        it('mimeEncode_should_encode_non_UTF_8', 0, () => {
            expect('=EB=B7=85').assertEqual(mimeEncode(new Uint8Array([0xbd, 0xc5]), 'utf-16be'));
        });
        it('mimeWordEncode_should_encode', 0, () => {
            expect('=?UTF-8?Q?See_on_=C3=B5hin_test?=').assertEqual(mimeWordEncode('See on õhin test'));
        });
        it('mimeWordEncode_should_QP_encode_mime_word', 0, () => {
            expect('=?UTF-8?Q?=E4=AB=B5=E6=9D=A5=E2=B5=B6=E6=87=9E?=').assertEqual(mimeWordEncode(new Uint8Array([0x4a, 0xf5, 0x67, 0x65, 0x2d, 0x76, 0x61, 0xde]), 'Q', 'utf-16be'));
        });
        it('mimeWordEncode_should_Base64_encode_mime_word', 0, () => {
            expect('=?UTF-8?B?0J/RgNC40LLQtdGCINC4INC00L4g0YHQstC40LTQsNC90LjRjw==?=')
                .assertEqual(mimeWordEncode('Привет и до свидания', 'B'));
        });
        it('mimeWordEncode_should_Base64_encode_a_long_mime_word', 0, () => {
            const payload = 'üöß‹€Привет и до свиданияПривет и до свиданияПривет и до свиданияПривет и до свиданияПривет и до свиданияПривет и до свиданияПривет и до свиданияПривет и до свидания';
            const expected = '=?UTF-8?B?w7zDtsOf4oC54oKs0J/RgNC40LLQtdGCINC4INC00L4g0YHQstC4?= ' +
                '=?UTF-8?B?0LTQsNC90LjRj9Cf0YDQuNCy0LXRgiDQuCDQtNC+INGB0LLQuNC0?= ' +
                '=?UTF-8?B?0LDQvdC40Y/Qn9GA0LjQstC10YIg0Lgg0LTQviDRgdCy0LjQtNCw?= ' +
                '=?UTF-8?B?0L3QuNGP0J/RgNC40LLQtdGCINC4INC00L4g0YHQstC40LTQsNC9?= ' +
                '=?UTF-8?B?0LjRj9Cf0YDQuNCy0LXRgiDQuCDQtNC+INGB0LLQuNC00LDQvdC4?= ' +
                '=?UTF-8?B?0Y/Qn9GA0LjQstC10YIg0Lgg0LTQviDRgdCy0LjQtNCw0L3QuNGP?= ' +
                '=?UTF-8?B?0J/RgNC40LLQtdGCINC4INC00L4g0YHQstC40LTQsNC90LjRj9Cf?= ' +
                '=?UTF-8?B?0YDQuNCy0LXRgiDQuCDQtNC+INGB0LLQuNC00LDQvdC40Y8=?=';
            expect(expected).assertEqual(mimeWordEncode(payload, 'B'));
        });
    });
}
