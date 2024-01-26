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
export class CharSequenceLength extends FeatureMatcher<String, Number> {
    public constructor(lengthMatcher: Matcher<Number>) {
        super(lengthMatcher, "a CharSequence with length", "length");
    }
    protected featureValueOf(actual: String): Number {
        return actual.length;
    }
    /**
       * Creates a matcher of {@link CharSequence} that matches when a char sequence has the given length
       * For example:
       *
       * <pre>
       * assertThat("text", hasLength(4))
       * </pre>
       *
       * @param length the expected length of the string
       * @return The matcher.
       */
    public static hasLength(length: number): Matcher<String> {
        return new CharSequenceLength(IsEqual.equalTo(length));
    }
    /**
        * Creates a matcher of {@link CharSequence} that matches when a char sequence has the given length
        * For example:
        *
        * <pre>
        * assertThat("text", hasLength(lessThan(4)))
        * </pre>
        *
        * @param lengthMatcher the expected length of the string
        * @return The matcher.
        */
    public static hasLengthMatcher(lengthMatcher: Matcher<String>): Matcher<String> {
        return new CharSequenceLength(lengthMatcher);
    }
}
