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
import { BaseMatcher } from '../BaseMatcher';
import { Matcher } from '../Matcher';
export class HasProperty<T> extends BaseMatcher<T> {
    private propertyName: string;
    public constructor(propertyName: string) {
        super();
        this.propertyName = propertyName;
    }
    public matches(obj: T): boolean {
        return obj == null ? false : this.hasOwn(obj, this.propertyName);
    }
    public describeMismatch(item: T, mismatchDescription: Description): void {
        mismatchDescription.appendText("no ").appendValue(this.propertyName).appendText(" in ").appendValue(item);
    }
    public describeTo(description: Description): void {
        description.appendText("hasProperty(").appendValue(this.propertyName).appendText(")");
    }
    /**
     * Creates a matcher that matches when the examined object has a JavaBean property
     * with the specified name.
     * For example:
     * <pre>assertThat(myBean, hasProperty("foo"))</pre>
     *
     * @param <T>
     *     the matcher type.
     * @param propertyName
     *     the name of the JavaBean property that examined beans should possess
     * @return The matcher.
     */
    public static hasProperty(propertyName: string): Matcher<Object> {
        return new HasProperty<Object>(propertyName);
    }
    private hasOwn(obj, value): boolean {
        for (let key in obj) {
            if (key === value) {
                return true;
            }
        }
        return false;
    }
}
