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
 * Calculates the logical negation of a matcher.
 */
export class IsNot<T> extends BaseMatcher<T> {
    private matcher: Matcher<T>;
    public constructor(matcher: Matcher<T>) {
        super();
        this.matcher = matcher;
    }
    public matches(arg: Object): boolean {
        return !this.matcher.matches(arg);
    }
    public describeTo(description: Description): void {
        description.appendText("not ").appendDescriptionOf(this.matcher);
    }
    /**
     * Creates a matcher that wraps an existing matcher, but inverts the logic by which
     * it will match.
     * For example:
     * <pre>assertThat(cheese, is(not(equalTo(smelly))))</pre>
     *
     * @param <T>
     *     the matcher type.
     * @param matcher
     *     the matcher whose sense should be inverted
     * @return The matcher.
     */
    public static not(matcher: Matcher<Object>): Matcher<Object> {
        return new IsNot<Object>(matcher);
    }
}
