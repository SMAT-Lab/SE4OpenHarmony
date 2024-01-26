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
/**
 * Calculates the logical conjunction of multiple matchers. Evaluation is shortcut, so
 * subsequent matchers are not called if an earlier matcher returns <code>false</code>.
 */
export class AllOf<T> extends DiagnosingMatcher<T> {
    private matchers: Array<Matcher<T>>;
    constructor(matchers: Array<Matcher<T>>) {
        super();
        this.matchers = matchers;
    }
    public matchesWithDiagnosingMatcher(o: Object, mismatch: Description): boolean {
        for (let matcher of this.matchers) {
            if (!matcher.matches(o)) {
                mismatch.appendDescriptionOf(matcher).appendText(" ");
                matcher.describeMismatch(o, mismatch);
                return false;
            }
        }
        return true;
    }
    public describeTo(description: Description): void {
        description.appendList("(", " " + "and" + " ", ")", this.matchers);
    }
    /**
     * Creates a matcher that matches if the examined object matches <b>ALL</b> of the specified matchers.
     * For example:
     * <pre>assertThat("myValue", allOf(startsWith("my"), containsString("Val")))</pre>
     *
     * @param <T>
     *     the matcher type.
     * @param matchers
     *     all the matchers must pass.
     * @return The matcher.
     */
    public static allOf(matchers: Array<Matcher<Object>>): Matcher<Object> {
        return new AllOf<Object>(matchers);
    }
    /**
     * Creates a matcher that matches if the examined object matches <b>ALL</b> of the specified matchers.
     * For example:
     * <pre>assertThat("myValue", allOf(startsWith("my"), containsString("Val")))</pre>
     *
     * @param <T>
     *     the matcher type.
     * @param matchers
     *     all the matchers must pass.
     * @return The matcher.
     */
    public static allOfMatches(...matchers: Matcher<Object>[]): Matcher<Object> {
        return AllOf.allOf(matchers);
    }
}
