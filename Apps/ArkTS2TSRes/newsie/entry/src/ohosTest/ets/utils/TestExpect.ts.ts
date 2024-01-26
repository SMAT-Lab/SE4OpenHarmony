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
export function expectFunction(_expect, value) {
    return {
        toEqual(source) {
            _expect(value).assertEqual(source);
        },
        to: {
            throw(source) {
                try {
                    value();
                    _expect(1).assertEqual(2);
                }
                catch (err) {
                    _expect(err.message).assertEqual(source);
                }
            },
            be: {
                a(source) {
                    _expect(typeof value).assertEqual(source);
                },
                null() {
                    _expect(value).assertNull();
                },
                ok() {
                    _expect(!!value).assertTrue();
                },
                instanceof(source) {
                    _expect(value instanceof source).assertTrue();
                }
            },
            have: {
                length(source) {
                    _expect(value.length).assertEqual(source);
                }
            },
            equal(source) {
                _expect(value).assertEqual(source);
            },
        },
        assertNull() {
            _expect(value).assertNull();
        }
    };
}
