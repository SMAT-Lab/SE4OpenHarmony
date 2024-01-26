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
import { DiagnosingMatcher } from '../DiagnosingMatcher';
import { Matcher } from '../Matcher';
/**
 * Tests whether the value is an instance of a class.
 * Classes of basic types will be converted to the relevant "Object" classes
 */
export class IsInstanceOf extends DiagnosingMatcher<Object> {
    private expectedClass;
    /**
     * Creates a new instance of IsInstanceOf
     *
     * @param expectedClass The predicate evaluates to true for instances of this class
     *                 or one of its subclasses.
     */
    public constructor(expectedClass) {
        super();
        this.expectedClass = expectedClass;
    }
    protected matchesWithDiagnosingMatcher(item: Object, mismatch: Description): boolean {
        if (null == item) {
            mismatch.appendText("null");
            return false;
        }
        return item instanceof this.expectedClass;
    }
    public describeTo(description: Description): void {
        description.appendText("an instance of ").appendText(this.expectedClass.constructor.name);
    }
    /**
     * Creates a matcher that matches when the examined object is an instance of the specified <code>type</code>,
     * as determined by calling the {@link java.lang.Class#isInstance(Object)} method on that type, passing the
     * the examined object.
     *
     * <p>The created matcher assumes no relationship between specified type and the examined object.</p>
     * For example:
     * <pre>assertThat(new Canoe(), instanceOf(Paddlable.class));</pre>
     *
     * @param <T>
     *     the matcher type.
     * @param type
     *     the type to check.
     * @return The matcher.
     */
    public static instanceOf(typeValue: Object): Matcher<Object> {
        return new IsInstanceOf(typeValue);
    }
}
