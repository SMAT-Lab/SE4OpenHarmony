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
 * Tests if the argument is a string that contains a specific substring.
 */
export class StringContains extends SubstringMatcher {
    public constructor(ignoringCase: boolean, substring: String) {
        super("containing", ignoringCase, substring);
    }
    protected evalSubstringOf(s: String): boolean {
        return super.converted(s).indexOf(super.converted(this.substring).toString()) >= 0;
        return false;
    }
    /**
       * Creates a matcher that matches if the examined {@link String} contains the specified
       * {@link String} anywhere.
       * For example:
       * <pre>assertThat("myStringOfNote", containsString("ring"))</pre>
       *
       * @param substring
       *     the substring that the returned matcher will expect to find within any examined string
       * @return The matcher.
       */
    public static containsString(substring: String): Matcher<String> {
        return new StringContains(false, substring);
    }
    /**
       * Creates a matcher that matches if the examined {@link String} contains the specified
       * {@link String} anywhere, ignoring case.
       * For example:
       * <pre>assertThat("myStringOfNote", containsStringIgnoringCase("Ring"))</pre>
       *
       * @param substring
       *     the substring that the returned matcher will expect to find within any examined string
       * @return The matcher.
       */
    public static containsStringIgnoringCase(substring: String): Matcher<String> {
        return new StringContains(true, substring);
    }
}
