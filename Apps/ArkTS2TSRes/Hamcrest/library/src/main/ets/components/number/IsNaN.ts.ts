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
import { Matcher } from '../Matcher';
import { BaseMatcher } from '../BaseMatcher';
/**
 * Is the value a number actually not a number (NaN)?
 */
export class IsNaN extends BaseMatcher<Number> {
    private constructor() {
        super();
    }
    public matches(item: number): boolean {
        return Number.isNaN(item);
    }
    public describeMismatch(item: number, mismatchDescription: Description): void {
        mismatchDescription.appendText("was ").appendValue(item);
    }
    public describeTo(description: Description): void {
        description.appendText("a double value of NaN");
    }
    /**
       * Creates a matcher of {@link Double}s that matches when an examined double is not a number.
       * For example:
       * <pre>assertThat(Double.NaN, is(notANumber()))</pre>
       *
       * @return The matcher.
       */
    public static notANumber(): Matcher<Number> {
        return new IsNaN();
    }
}
