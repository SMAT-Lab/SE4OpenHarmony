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
import { ShortcutCombination } from './ShortcutCombination';
import { Matcher } from '../Matcher';
/**
 * Calculates the logical disjunction of multiple matchers. Evaluation is shortcut, so
 * subsequent matchers are not called if an earlier matcher returns <code>true</code>.
 */
export class AnyOf<T> extends ShortcutCombination<T> {
    public constructor(matchers: Array<Matcher<T>>) {
        super(matchers);
    }
    public matches(o: Object): boolean {
        return super.matchesWithShortcut(o, true);
    }
    public describeTo(description: Description): void {
        super.describeToWithShortcut(description, "or");
    }
    /**
     * Creates a matcher that matches if the examined object matches <b>ANY</b> of the specified matchers.
     * For example:
     * <pre>assertThat("myValue", anyOf(startsWith("foo"), containsString("Val")))</pre>
     *
     * @param <T>
     *     the matcher type.
     * @param matchers
     *     any the matchers must pass.
     * @return The matcher.
     */
    public static anyOf(matchers: Array<Matcher<Object>>): AnyOf<Object> {
        return new AnyOf<Object>(matchers);
    }
    /**
     * Creates a matcher that matches if the examined object matches <b>ANY</b> of the specified matchers.
     * For example:
     * <pre>assertThat("myValue", anyOf(startsWith("foo"), containsString("Val")))</pre>
     *
     * @param <T>
     *     the matcher type.
     * @param matchers
     *     any the matchers must pass.
     * @return The matcher.
     */
    public static anyOfMatches(...matchers: Matcher<Object>[]): AnyOf<Object> {
        return AnyOf.anyOf(matchers);
    }
}
