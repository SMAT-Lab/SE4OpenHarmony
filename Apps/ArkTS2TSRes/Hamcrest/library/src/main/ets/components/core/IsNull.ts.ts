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
import { IsNot } from './IsNot';
/**
 * Is the value null?
 */
export class IsNull<T> extends BaseMatcher<T> {
    public matches(o: Object): boolean {
        return o == null;
    }
    public describeTo(description: Description): void {
        description.appendText("null");
    }
    /**
     * Creates a matcher that matches if examined object is <code>null</code>.
     * For example:
     * <pre>assertThat(cheese, is(nullValue())</pre>
     *
     * @return The matcher.
     */
    public static nullValue(): Matcher<Object> {
        return new IsNull<Object>();
    }
    /**
     * A shortcut to the frequently used <code>not(nullValue())</code>.
     * For example:
     * <pre>assertThat(cheese, is(notNullValue()))</pre>
     * instead of:
     * <pre>assertThat(cheese, is(not(nullValue())))</pre>
     *
     * @return The matcher.
     */
    public static notNullValue(): Matcher<Object> {
        return IsNot.not(IsNull.nullValue());
    }
}
