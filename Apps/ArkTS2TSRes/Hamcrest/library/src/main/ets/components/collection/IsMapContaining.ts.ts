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
import { BaseMatcher } from '../BaseMatcher';
import { Description } from '../Description';
import { IsAnything } from '../core/IsAnything';
import { StringDescription } from '../StringDescription';
export class IsMapContaining<K, V> extends BaseMatcher<Map<string, any>> {
    private readonly keyMatcher: Matcher<string>;
    private readonly valueMatcher: Matcher<any>;
    public constructor(keyMatcher: Matcher<string>, valueMatcher: Matcher<any>) {
        super();
        this.keyMatcher = keyMatcher;
        this.valueMatcher = valueMatcher;
    }
    public matchesSafely(map: Map<string, any>): boolean {
        map.forEach((value, key, map) => {
            if (this.keyMatcher.matches(key) && this.valueMatcher.matches(value)) {
                return true;
            }
        });
        return false;
    }
    public describeMismatchSafely(map: Map<string, any>, mismatchDescription: Description): void {
        console.info("IsMapContaining describeMismatchSafely:" + JSON.stringify(map));
        mismatchDescription.appendText("map was ").appendValueList("[", ", ", "]", null);
    }
    public describeTo(description: Description): void {
        description.appendText("map containing [")
            .appendDescriptionOf(this.keyMatcher)
            .appendText("->")
            .appendDescriptionOf(this.valueMatcher)
            .appendText("]");
    }
    /**
     * Creates a matcher for {@link java.util.Map}s matching when the examined {@link java.util.Map} contains
     * at least one entry whose key satisfies the specified <code>keyMatcher</code> <b>and</b> whose
     * value satisfies the specified <code>valueMatcher</code>.
     * For example:
     * <pre>assertThat(myMap, hasEntry(equalTo("bar"), equalTo("foo")))</pre>
     *
     * @param <K>
     *     the map key type.
     * @param <V>
     *     the map value type.
     * @param keyMatcher
     *     the key matcher that, in combination with the valueMatcher, must be satisfied by at least one entry
     * @param valueMatcher
     *     the value matcher that, in combination with the keyMatcher, must be satisfied by at least one entry
     * @return The matcher.
     */
    public static hasEntry(keyMatcher: Matcher<string>, valueMatcher: Matcher<any>): Matcher<Map<string, any>> {
        return new IsMapContaining<string, any>(keyMatcher, valueMatcher);
    }
    /**
     * Creates a matcher for {@link java.util.Map}s matching when the examined {@link java.util.Map} contains
     * at least one key that satisfies the specified matcher.
     * For example:
     * <pre>assertThat(myMap, hasKey(equalTo("bar")))</pre>
     *
     * @param <K>
     *     the map key type.
     * @param keyMatcher
     *     the matcher that must be satisfied by at least one key
     * @return The matcher.
     */
    public static hasKey(keyMatcher: Matcher<string>): Matcher<Map<string, string>> {
        return new IsMapContaining<string, any>(keyMatcher, IsAnything.anything());
    }
    /**
     * Creates a matcher for {@link java.util.Map}s matching when the examined {@link java.util.Map} contains
     * at least one value that satisfies the specified valueMatcher.
     * For example:
     * <pre>assertThat(myMap, hasValue(equalTo("foo")))</pre>
     *
     * @param <V>
     *     the value type.
     * @param valueMatcher
     *     the matcher that must be satisfied by at least one value
     * @return The matcher.
     */
    public static hasValue(valueMatcher: Matcher<any>): Matcher<Map<string, any>> {
        return new IsMapContaining<string, any>(IsAnything.anything(), valueMatcher);
    }
    public matches(map: Map<string, any>): boolean {
        map.forEach((value, key, map) => {
            if (this.keyMatcher.matches(key) && this.valueMatcher.matches(value)) {
                return true;
            }
        });
        return false;
    }
}
