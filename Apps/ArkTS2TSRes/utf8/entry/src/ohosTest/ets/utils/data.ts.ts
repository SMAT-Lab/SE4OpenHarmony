/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
export const data = [
    // 1-byte
    {
        'codePoint': 0x0000,
        'decoded': '\0',
        'encoded': '\0'
    },
    {
        'codePoint': 0x005C,
        'decoded': '\x5C',
        'encoded': '\x5C'
    },
    {
        'codePoint': 0x007F,
        'decoded': '\x7F',
        'encoded': '\x7F'
    },
    // 2-byte
    {
        'codePoint': 0x0080,
        'decoded': '\x80',
        'encoded': '\xC2\x80'
    },
    {
        'codePoint': 0x05CA,
        'decoded': '\u05CA',
        'encoded': '\xD7\x8A'
    },
    {
        'codePoint': 0x07FF,
        'decoded': '\u07FF',
        'encoded': '\xDF\xBF',
    },
    // 3-byte
    {
        'codePoint': 0x0800,
        'decoded': '\u0800',
        'encoded': '\xE0\xA0\x80',
    },
    {
        'codePoint': 0x2C3C,
        'decoded': '\u2C3C',
        'encoded': '\xE2\xB0\xBC'
    },
    {
        'codePoint': 0xFFFF,
        'decoded': '\uFFFF',
        'encoded': '\xEF\xBF\xBF'
    },
    // unmatched surrogate halves
    // high surrogates: 0xD800 to 0xDBFF
    {
        'codePoint': 0xD800,
        'decoded': '\uD800',
        'encoded': '\xED\xA0\x80',
        'error': true
    },
    {
        'description': 'High surrogate followed by another high surrogate',
        'decoded': '\uD800\uD800',
        'encoded': '\xED\xA0\x80\xED\xA0\x80',
        'error': true
    },
    {
        'description': 'High surrogate followed by a symbol that is not a surrogate',
        'decoded': '\uD800A',
        'encoded': '\xED\xA0\x80A',
        'error': true
    },
    {
        'description': 'Unmatched high surrogate, followed by a surrogate pair, followed by an unmatched high surrogate',
        'decoded': '\uD800\uD834\uDF06\uD800',
        'encoded': '\xED\xA0\x80\xF0\x9D\x8C\x86\xED\xA0\x80',
        'error': true
    },
    {
        'codePoint': 0xD9AF,
        'decoded': '\uD9AF',
        'encoded': '\xED\xA6\xAF',
        'error': true
    },
    {
        'codePoint': 0xDBFF,
        'decoded': '\uDBFF',
        'encoded': '\xED\xAF\xBF',
        'error': true
    },
    // low surrogates: 0xDC00 to 0xDFFF
    {
        'codePoint': 0xDC00,
        'decoded': '\uDC00',
        'encoded': '\xED\xB0\x80',
        'error': true
    },
    {
        'description': 'Low surrogate followed by another low surrogate',
        'decoded': '\uDC00\uDC00',
        'encoded': '\xED\xB0\x80\xED\xB0\x80',
        'error': true
    },
    {
        'description': 'Low surrogate followed by a symbol that is not a surrogate',
        'decoded': '\uDC00A',
        'encoded': '\xED\xB0\x80A',
        'error': true
    },
    {
        'description': 'Unmatched low surrogate, followed by a surrogate pair, followed by an unmatched low surrogate',
        'decoded': '\uDC00\uD834\uDF06\uDC00',
        'encoded': '\xED\xB0\x80\xF0\x9D\x8C\x86\xED\xB0\x80',
        'error': true
    },
    {
        'codePoint': 0xDEEE,
        'decoded': '\uDEEE',
        'encoded': '\xED\xBB\xAE',
        'error': true
    },
    {
        'codePoint': 0xDFFF,
        'decoded': '\uDFFF',
        'encoded': '\xED\xBF\xBF',
        'error': true
    },
    // 4-byte
    {
        'codePoint': 0x010000,
        'decoded': '\uD800\uDC00',
        'encoded': '\xF0\x90\x80\x80'
    },
    {
        'codePoint': 0x01D306,
        'decoded': '\uD834\uDF06',
        'encoded': '\xF0\x9D\x8C\x86'
    },
    {
        'codePoint': 0x10FFF,
        'decoded': '\uDBFF\uDFFF',
        'encoded': '\xF4\x8F\xBF\xBF'
    }
];
