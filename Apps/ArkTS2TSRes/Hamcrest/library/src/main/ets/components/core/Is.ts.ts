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
 * Decorates another Matcher, retaining the behaviour but allowing tests
 * to be slightly more expressive.
 *
 * For example:  assertThat(cheese, equalTo(smelly))
 *          vs.  assertThat(cheese, is(equalTo(smelly)))
 */
export class Is<T> extends BaseMatcher<T> {
    private matcher: Matcher<T>;
    public constructor(matcher: Matcher<T>) {
        super();
        this.matcher = matcher;
    }
    public matches(arg: Object): boolean {
        return this.matcher.matches(arg);
    }
    public describeTo(description: Description): void {
        description.appendText("is ").appendDescriptionOf(this.matcher);
    }
    public describeMismatch(item: Object, mismatchDescription: Description): void {
        this.matcher.describeMismatch(item, mismatchDescription);
    }
    /**
     * Decorates another Matcher, retaining its behaviour, but allowing tests
     * to be slightly more expressive.
     * For example:
     * <pre>assertThat(cheese, is(equalTo(smelly)))</pre>
     * instead of:
     * <pre>assertThat(cheese, equalTo(smelly))</pre>
     *
     * @param <T>
     *     the matcher type.
     * @param matcher
     *     the matcher to wrap.
     * @return The matcher.
     */
    public static is(matcher: Matcher<Object>): Matcher<Object> {
        return new Is<Object>(matcher);
    }
}
