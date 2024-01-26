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
 * Is the value the same object as another value?
 */
export class IsSame<T> extends BaseMatcher<T> {
    private object: T;
    public constructor(object: T) {
        super();
        this.object = object;
    }
    public matches(arg: Object): boolean {
        return arg === this.object;
    }
    public describeTo(description: Description): void {
        description.appendText("sameInstance(")
            .appendValue(this.object)
            .appendText(")");
    }
    /**
     * Creates a matcher that matches only when the examined object is the same instance as
     * the specified target object.
     *
     * @param <T>
     *     the matcher type.
     * @param target
     *     the target instance against which others should be assessed
     * @return The matcher.
     */
    public static sameInstance(target: Object): Matcher<Object> {
        return new IsSame<Object>(target);
    }
    /**
     * Creates a matcher that matches only when the examined object is the same instance as
     * the specified target object.
     *
     * @param <T>
     *     the matcher type.
     * @param target
     *     the target instance against which others should be assessed
     * @return The matcher.
     */
    public static theInstance(target: Object): Matcher<Object> {
        return new IsSame<Object>(target);
    }
}
