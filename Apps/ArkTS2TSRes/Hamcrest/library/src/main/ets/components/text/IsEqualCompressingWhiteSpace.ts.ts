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
import { Description } from '../Description';
import { Matcher } from '../Matcher';
import { BaseMatcher } from '../BaseMatcher';
/**
 * Tests if a string is equal to another string, compressing any changes in whitespace.
 */
export class IsEqualCompressingWhiteSpace extends BaseMatcher<String> {
    private str: String;
    public constructor(str: String) {
        super();
        if (str == null) {
            throw new Error("Non-null value required");
        }
        this.str = str;
    }
    protected getString(): String {
        return this.str;
    }
    public matches(item: String): boolean {
        console.info("matches: 1 " + ' this.str is ' + this.str + ', item is ' + item);
        console.info("matches: 2 " + this.stripSpaces(this.str));
        console.info("matches: 3 " + this.stripSpaces(item));
        return this.stripSpaces(this.str) == (this.stripSpaces(item));
    }
    public describeMismatch(item: String, mismatchDescription: Description): void {
        mismatchDescription.appendText("was ").appendValue(item);
    }
    public describeTo(description: Description): void {
        description.appendText("a string equal to ")
            .appendValue(this.str)
            .appendText(" compressing white space");
    }
    public stripSpaces(toBeStripped: String): String {
        return toBeStripped.replace(/\s/g, "").trim();
    }
    public static equalToIgnoringWhiteSpace(expectedString: String): Matcher<String> {
        return new IsEqualCompressingWhiteSpace(expectedString);
    }
    public static equalToCompressingWhiteSpace(expectedString: String): Matcher<String> {
        return new IsEqualCompressingWhiteSpace(expectedString);
    }
}
