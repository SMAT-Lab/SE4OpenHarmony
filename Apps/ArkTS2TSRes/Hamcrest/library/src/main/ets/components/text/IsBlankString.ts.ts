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
import { AnyOf } from '../core/AnyOf';
import { IsNull } from '../core/IsNull';
/**
 * Matches blank Strings (and null).
 */
export class IsBlankString extends BaseMatcher<String> {
    private static BLANK_INSTANCE: IsBlankString = new IsBlankString();
    private static NULL_OR_BLANK_INSTANCE: Matcher<String> = AnyOf.anyOfMatches(IsNull.nullValue(), IsBlankString.BLANK_INSTANCE);
    private static REGEX_WHITESPACE: RegExp = new RegExp("\\s");
    private constructor() {
        super();
    }
    public matches(item: String): boolean {
        return IsBlankString.REGEX_WHITESPACE.test(item.toString());
    }
    public describeTo(description: Description): void {
        description.appendText("a blank string");
    }
    /**
     * Creates a matcher of {@link String} that matches when the examined string contains
     * zero or more whitespace characters and nothing else.
     * For example:
     * <pre>assertThat("  ", is(blankString()))</pre>
     *
     * @return The matcher.
     */
    public static blankString(): Matcher<String> {
        return IsBlankString.BLANK_INSTANCE;
    }
    /**
     * Creates a matcher of {@link String} that matches when the examined string is <code>null</code>, or
     * contains zero or more whitespace characters and nothing else.
     * For example:
     * <pre>assertThat(((String)null), is(blankOrNullString()))</pre>
     *
     * @return The matcher.
     */
    public static blankOrNullString(): Matcher<String> {
        return IsBlankString.NULL_OR_BLANK_INSTANCE;
    }
}
