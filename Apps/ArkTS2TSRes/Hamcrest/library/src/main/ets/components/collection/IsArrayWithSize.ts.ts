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
export class IsArrayWithSize<E> extends FeatureMatcher<Array<any>, Number> {
    public constructor(sizeMatcher: Matcher<Number>) {
        super(sizeMatcher, "an array with size", "array size");
    }
    protected featureValueOf(actual: Array<any>): Number {
        return actual.length;
    }
    /**
     * Creates a matcher for arrays that matches when the <code>length</code> of the array
     * satisfies the specified matcher.
     * For example:
     * <pre>assertThat(new String[]{"foo", "bar"}, arrayWithSize(equalTo(2)))</pre>
     * @param <E>
     *     the matcher type.
     * @param sizeMatcher
     *     a matcher for the length of an examined array
     * @return The matcher.
     */
    public static arrayWithSize(sizeMatcher: Matcher<Number>): Matcher<Array<any>> {
        return new IsArrayWithSize(sizeMatcher);
    }
    /**
     * Creates a matcher for arrays that matches when the <code>length</code> of the array
     * equals the specified <code>size</code>.
     * For example:
     * <pre>assertThat(new String[]{"foo", "bar"}, arrayWithSize(2))</pre>
     *
     * @param <E>
     *     the matcher type.
     * @param size
     *     the length that an examined array must have for a positive match
     * @return The matcher.
     */
    public static arrayWithSizeOf(size: number): Matcher<Array<any>> {
        return IsArrayWithSize.arrayWithSize(IsEqual.equalTo(size));
    }
}
