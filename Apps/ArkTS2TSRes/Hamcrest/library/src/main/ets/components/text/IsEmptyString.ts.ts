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
 * Matches empty Strings (and null).
 */
export class IsEmptyString extends BaseMatcher<String> {
    private static INSTANCE: IsEmptyString = new IsEmptyString();
    private static NULL_OR_EMPTY_INSTANCE: Matcher<String> = AnyOf.anyOfMatches(IsNull.nullValue(), IsEmptyString.INSTANCE);
    private constructor() {
        super();
    }
    public matches(item: String): boolean {
        if (item == null) {
            return false;
        }
        return item.length == 0;
    }
    public describeTo(description: Description): void {
        description.appendText("an empty string");
    }
    /**
     * Creates a matcher of {@link String} that matches when the examined string has zero length.
     * For example:
     * <pre>assertThat("", isEmptyString())</pre>
     *
     * @deprecated use is(emptyString()) instead
     * @return The matcher.
     */
    public static isEmptyString(): Matcher<String> {
        return IsEmptyString.emptyString();
    }
    /**
     * Creates a matcher of {@link String} that matches when the examined string has zero length.
     * For example:
     * <pre>assertThat("", is(emptyString()))</pre>
     *
     * @return The matcher.
     */
    public static emptyString(): Matcher<String> {
        return IsEmptyString.INSTANCE;
    }
    /**
     * Creates a matcher of {@link String} that matches when the examined string is <code>null</code>, or
     * has zero length.
     * For example:
     * <pre>assertThat(((String)null), isEmptyOrNullString())</pre>
     *
     * @deprecated use is(emptyOrNullString()) instead
     * @return The matcher.
     */
    public static isEmptyOrNullString(): Matcher<String> {
        return IsEmptyString.emptyOrNullString();
    }
    /**
     * Creates a matcher of {@link String} that matches when the examined string is <code>null</code>, or
     * has zero length.
     * For example:
     * <pre>assertThat(((String)null), is(emptyOrNullString()))</pre>
     *
     * @return The matcher.
     */
    public static emptyOrNullString(): Matcher<String> {
        return IsEmptyString.NULL_OR_EMPTY_INSTANCE;
    }
}
