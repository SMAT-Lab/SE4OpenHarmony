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
 * Tests if the argument is a string that ends with a specific substring.
 */
export class StringEndsWith extends SubstringMatcher {
    public constructor(ignoringCase: boolean, substring: String) {
        super("ending with", ignoringCase, substring);
    }
    protected evalSubstringOf(s: String): boolean {
        return super.converted(s).endsWith(super.converted(this.substring).toString());
    }
    /**
       * Creates a matcher that matches if the examined {@link String} ends with the specified
       * {@link String}.
       * For example:
       * <pre>assertThat("myStringOfNote", endsWith("Note"))</pre>
       *
       * @param suffix
       *      the substring that the returned matcher will expect at the end of any examined string
       * @return The matcher.
       */
    public static endsWith(suffix: String): Matcher<String> {
        return new StringEndsWith(false, suffix);
    }
    /**
       * Creates a matcher that matches if the examined {@link String} ends with the specified
       * {@link String}, ignoring case.
       * For example:
       * <pre>assertThat("myStringOfNote", endsWithIgnoringCase("note"))</pre>
       *
       * @param suffix
       *      the substring that the returned matcher will expect at the end of any examined string
       * @return The matcher.
       */
    public static endsWithIgnoringCase(suffix: String): Matcher<String> {
        return new StringEndsWith(true, suffix);
    }
}
