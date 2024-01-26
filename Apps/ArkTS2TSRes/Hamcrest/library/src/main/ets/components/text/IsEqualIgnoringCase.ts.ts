/*
* Copyright (C) 2022 Huawei Device Co., Ltd.
* Licensed under the BSD License, (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     https://opensource.org/licenses/BSD-3-Clause
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
import { BaseMatcher } from '../BaseMatcher';
import { Description } from '../Description';
import { Matcher } from '../Matcher';
/**
 * Tests if a string is equal to another string, regardless of the case.
 */
export class IsEqualIgnoringCase extends BaseMatcher<String> {
    private value: String;
    constructor(value: String) {
        super();
        if (value == null) {
            throw new Error("Non-null value required");
        }
        this.value = value;
    }
    public matches(item: String): boolean {
        return this.value.toLowerCase() == item.toLowerCase();
    }
    public describeMismatch(item: String, mismatchDescription: Description): void {
        super.describeMismatch(item, mismatchDescription);
    }
    public describeTo(description: Description): void {
        description.appendText("a string equal to ")
            .appendValue(this.value)
            .appendText(" ignoring case");
    }
    public static equalToIgnoringCase(expectedString: String): Matcher<String> {
        return new IsEqualIgnoringCase(expectedString);
    }
}
