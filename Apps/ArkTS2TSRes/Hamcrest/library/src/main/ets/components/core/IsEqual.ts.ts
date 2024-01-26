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
 * Is the value equal to another value, as tested by the
 * {@link java.lang.Object#equals} invokedMethod?
 */
export class IsEqual<T> extends BaseMatcher<T> {
    private expectedValue: Object;
    public constructor(equalArg: T) {
        super();
        this.expectedValue = equalArg;
    }
    public matches(actualValue: Object): boolean {
        return IsEqual.areEqual(actualValue, this.expectedValue);
    }
    public describeTo(description: Description): void {
        description.appendValue(this.expectedValue);
    }
    private static areEqual(actual: Object, expected: Object): boolean {
        if (actual == null) {
            return expected == null;
        }
        if (expected != null && Array.isArray(actual)) {
            return Array.isArray(expected) && IsEqual.areArraysEqual(actual, expected);
        }
        return actual == expected;
    }
    private static areArraysEqual(actualArray: Object, expectedArray: Object): boolean {
        return IsEqual.areArrayLengthsEqual(actualArray, expectedArray) && IsEqual.areArrayElementsEqual(actualArray, expectedArray);
    }
    private static areArrayLengthsEqual(actualArray: Object, expectedArray: Object): boolean {
        return (<Array<Object>>actualArray).length == (<Array<Object>>expectedArray).length;
    }
    private static areArrayElementsEqual(actualArray: Object, expectedArray: Object): boolean {
        for (let i = 0; i < (<Array<Object>>actualArray).length; i++) {
            if (!IsEqual.areEqual(actualArray[i], expectedArray[i])) {
                return false;
            }
        }
        return true;
    }
    /**
       * Creates a matcher that matches when the examined object is logically equal to the specified
       * <code>operand</code>, as determined by calling the {@link java.lang.Object#equals} method on
       * the <b>examined</b> object.
       *
       * <p>If the specified operand is <code>null</code> then the created matcher will only match if
       * the examined object's <code>equals</code> method returns <code>true</code> when passed a
       * <code>null</code> (which would be a violation of the <code>equals</code> contract), unless the
       * examined object itself is <code>null</code>, in which case the matcher will return a positive
       * match.</p>
       *
       * <p>The created matcher provides a special behaviour when examining <code>Array</code>s, whereby
       * it will match if both the operand and the examined object are arrays of the same length and
       * contain items that are equal to each other (according to the above rules) <b>in the same
       * indexes</b>.</p>
       * For example:
       * <pre>
       * assertThat("foo", equalTo("foo"));
       * assertThat(new String[] {"foo", "bar"}, equalTo(new String[] {"foo", "bar"}));
       * </pre>
       *
       * @param <T>
       *     the matcher type.
       * @param operand
       *     the value to check.
       * @return The matcher.
       */
    public static equalTo(operand: Object): Matcher<Object> {
        return new IsEqual<Object>(operand);
    }
    /**
       * Creates an {@link org.hamcrest.core.IsEqual} matcher that does not enforce the values being
       * compared to be of the same static type.
       *
       * @param operand
       *     the value to check.
       * @return The matcher.
       */
    public static equalToObject(operand: Object): Matcher<Object> {
        return new IsEqual<Object>(operand);
    }
}
