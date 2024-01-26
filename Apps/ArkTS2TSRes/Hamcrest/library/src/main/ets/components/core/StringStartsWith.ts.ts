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
import { Matcher } from '../Matcher';
import { SubstringMatcher } from './SubstringMatcher';
/**
 * Tests if the argument is a string that starts with a specific substring.
 */
export class StringStartsWith extends SubstringMatcher {
    public constructor(ignoringCase: boolean, substring: String) {
        super("starting with", ignoringCase, substring);
    }
    protected evalSubstringOf(s: String): boolean {
        return super.converted(s).startsWith(super.converted(this.substring).toString());
    }
    /**
     * <p>
     * Creates a matcher that matches if the examined {@link String} starts with the specified
     * {@link String}.
     * </p>
     * For example:
     * <pre>assertThat("myStringOfNote", startsWith("my"))</pre>
     *
     * @param prefix
     *      the substring that the returned matcher will expect at the start of any examined string
     * @return The matcher.
     */
    public static startsWith(prefix: String): Matcher<String> {
        return new StringStartsWith(false, prefix);
    }
    /**
     * <p>
     * Creates a matcher that matches if the examined {@link String} starts with the specified
     * {@link String}, ignoring case
     * </p>
     * For example:
     * <pre>assertThat("myStringOfNote", startsWithIgnoringCase("My"))</pre>
     *
     * @param prefix
     *      the substring that the returned matcher will expect at the start of any examined string
     * @return The matcher.
     */
    public static startsWithIgnoringCase(prefix: String): Matcher<String> {
        return new StringStartsWith(true, prefix);
    }
}
