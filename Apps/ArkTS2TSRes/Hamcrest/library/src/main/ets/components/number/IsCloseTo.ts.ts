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
 * Is the value a number equal to a value within some range of
 * acceptable error?
 */
export class IsCloseTo extends BaseMatcher<Number> {
    private delta: number;
    private value: number;
    public constructor(value: number, error: number) {
        super();
        this.delta = error;
        this.value = value;
    }
    public matches(item: number): boolean {
        return this.actualDelta(item) <= 0.0;
    }
    public describeMismatch(item: number, mismatchDescription: Description): void {
        mismatchDescription.appendValue(item)
            .appendText(" differed by ")
            .appendValue(this.actualDelta(item))
            .appendText(" more than delta ")
            .appendValue(this.delta);
    }
    public describeTo(description: Description): void {
        description.appendText("a numeric value within ")
            .appendValue(this.delta)
            .appendText(" of ")
            .appendValue(this.value);
    }
    private actualDelta(item: number): number {
        return Math.abs(item - this.value) - this.delta;
    }
    /**
       * Creates a matcher of {@link Double}s that matches when an examined double is equal
       * to the specified <code>operand</code>, within a range of +/- <code>error</code>.
       * For example:
       * <pre>assertThat(1.03, is(closeTo(1.0, 0.03)))</pre>
       *
       * @param operand
       *     the expected value of matching doubles
       * @param error
       *     the delta (+/-) within which matches will be allowed
       * @return The matcher.
       */
    public static closeTo(operand: number, error: number): Matcher<Number> {
        return new IsCloseTo(operand, error);
    }
}
