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
 * A matcher that always returns <code>true</code>.
 */
export class IsAnything<T> extends BaseMatcher<T> {
    private message: string;
    public constructor(message?: string) {
        super();
        if (message) {
            this.message = message;
        }
        this.message = 'ANYTHING';
    }
    public matches(o: Object): boolean {
        return true;
    }
    public describeTo(description: Description): void {
        description.appendText(this.message);
    }
    /**
     * Creates a matcher that always matches, regardless of the examined object, but describes
     * itself with the specified {@link String}.
     *
     * @param description
     *     a meaningful {@link String} used when describing itself
     * @return The matcher.
     */
    public static anything(description?: string): Matcher<Object> {
        return new IsAnything<Object>(description);
    }
}
