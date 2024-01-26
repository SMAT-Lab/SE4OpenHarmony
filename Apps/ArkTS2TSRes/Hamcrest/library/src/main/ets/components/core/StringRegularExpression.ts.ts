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
import { DiagnosingMatcher } from '../DiagnosingMatcher';
import { Description } from '../Description';
import { Matcher } from '../Matcher';
export class StringRegularExpression extends DiagnosingMatcher<String> {
    private pattern: RegExp;
    protected constructor(pattern: RegExp) {
        super();
        this.pattern = pattern;
    }
    public describeTo(description: Description): void {
        description.appendText("a string matching the pattern ").appendValue(this.pattern);
    }
    protected matchesWithDiagnosingMatcher(actual: string, mismatchDescription: Description): boolean {
        if (!this.pattern.test(actual.toString())) {
            mismatchDescription.appendText("the string was ").appendValue(actual);
            return false;
        }
        return true;
    }
    /**
     * Creates a matcher that checks if the examined string matches a specified {@link java.util.regex.Pattern}.
     *
     * @param pattern
     *            the pattern to be used.
     * @return The matcher.
     */
    public static matchesRegex(pattern: RegExp): Matcher<String> {
        return new StringRegularExpression(pattern);
    }
    /**
     * Creates a matcher that checks if the examined string matches a specified regex.
     *
     * @param regex
     *            The regex to be used for the validation.
     * @return The matcher.
     */
    public static matchesStringRegex(regex: string): Matcher<String> {
        return StringRegularExpression.matchesRegex(new RegExp(regex));
    }
}
