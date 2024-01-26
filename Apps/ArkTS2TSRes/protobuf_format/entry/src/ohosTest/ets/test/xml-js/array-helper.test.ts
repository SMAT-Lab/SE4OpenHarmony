let __generate__Id: number = 0;
function generateId(): string {
    return "array-helper.test_" + ++__generate__Id;
}
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
import helper from '@ohos/xml_js/src/main/ets/array-helper';
import { afterEach, beforeEach, describe, expect, it } from '@ohos/hypium';
export default function arrayHelperTest() {
    describe('ArrayHelperTest', () => {
        it('Returns_true_for_an_array', 0, () => {
            expect(helper.isArray([])).assertTrue();
            expect(helper.isArray(['one', 'two', 'three'])).assertTrue();
        });
        it('Returns_false_for_none_array_values', 0, () => {
            expect(helper.isArray({})).assertFalse();
            expect(helper.isArray('[]')).assertFalse();
        });
        it('Returns_false_for_undefined_values', 0, () => {
            expect(helper.isArray(undefined)).assertFalse();
            expect(helper.isArray(null)).assertFalse();
        });
        it('Use_fallback_when_isArray_is_not_defined', 0, () => {
            expect(helper.isArray(['one', 'two', 'three'])).assertTrue();
            expect(helper.isArray({})).assertFalse();
        });
    });
}
