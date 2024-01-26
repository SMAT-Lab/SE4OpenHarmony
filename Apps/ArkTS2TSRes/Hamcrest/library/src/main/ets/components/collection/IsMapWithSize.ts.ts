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
import { FeatureMatcher } from '../FeatureMatcher';
import { Matcher } from '../Matcher';
import { IsEqual } from '../core/IsEqual';
export class IsMapWithSize<K, V> extends FeatureMatcher<Map<string, any>, Number> {
    public constructor(sizeMatcher: Matcher<Number>) {
        super(sizeMatcher, "a map with size", "map size");
    }
    protected featureValueOf(actual: Map<string, any>): Number {
        return actual.size;
    }
    /**
     * Creates a matcher for {@link java.util.Map}s that matches when the <code>size()</code> method returns
     * a value that satisfies the specified matcher.
     * For example:
     * <pre>assertThat(myMap, is(aMapWithSize(equalTo(2))))</pre>
     *
     * @param <K>
     *     the map key type.
     * @param <V>
     *     the map value type.
     * @param sizeMatcher
     *     a matcher for the size of an examined {@link java.util.Map}
     * @return The matcher.
     */
    public static aMapWithSizeOfMatcher(sizeMatcher: Matcher<Object>): Matcher<Map<string, any>> {
        return new IsMapWithSize(sizeMatcher);
    }
    /**
     * Creates a matcher for {@link java.util.Map}s that matches when the <code>size()</code> method returns
     * a value equal to the specified <code>size</code>.
     * For example:
     * <pre>assertThat(myMap, is(aMapWithSize(2)))</pre>
     *
     * @param <K>
     *     the map key type.
     * @param <V>
     *     the map value type.
     * @param size
     *     the expected size of an examined {@link java.util.Map}
     * @return The matcher.
     */
    public static aMapWithSize(size: number): Matcher<Map<string, any>> {
        return IsMapWithSize.aMapWithSizeOfMatcher(IsEqual.equalTo(size));
    }
    /**
     * Creates a matcher for {@link java.util.Map}s that matches when the <code>size()</code> method returns
     * zero.
     * For example:
     * <pre>assertThat(myMap, is(anEmptyMap()))</pre>
     *
     * @param <K>
     *     the map key type.
     * @param <V>
     *     the map value type.
     * @return The matcher.
     */
    public static anEmptyMap(): Matcher<Map<string, any>> {
        return IsMapWithSize.aMapWithSizeOfMatcher(IsEqual.equalTo(0));
    }
}
