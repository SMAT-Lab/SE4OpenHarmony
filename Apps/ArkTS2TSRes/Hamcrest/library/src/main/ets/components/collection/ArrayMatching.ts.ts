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
import { HasItemInArray } from './HasItemInArray';
import { IsEqual } from '../core/IsEqual';
export class ArrayMatching {
    /**
     * Creates a matcher for arrays that matches when the examined array contains at least one item
     * that is matched by the specified <code>elementMatcher</code>.  Whilst matching, the traversal
     * of the examined array will stop as soon as a matching element is found.
     * For example:
     * <pre>assertThat(new String[] {"foo", "bar"}, hasItemInArray(startsWith("ba")))</pre>
     *
     * @param <T>
     *     the matcher type.
     * @param elementMatcher
     *     the matcher to apply to elements in examined arrays
     * @return The matcher.
     */
    public static hasItemInArrayMatcher(elementMatcher: Matcher<Object>): Matcher<Object> {
        return new HasItemInArray<Object>(elementMatcher);
    }
    /**
     * A shortcut to the frequently used <code>hasItemInArray(equalTo(x))</code>.
     * For example:
     * <pre>assertThat(hasItemInArray(x))</pre>
     * instead of:
     * <pre>assertThat(hasItemInArray(equalTo(x)))</pre>
     *
     * @param <T>
     *     the matcher type.
     * @param element
     *     the element that should be present in examined arrays
     * @return The matcher.
     */
    public static hasItemInArray(element: Array<any>): Matcher<Array<any>> {
        return this.hasItemInArrayMatcher(IsEqual.equalTo(element));
    }
}
