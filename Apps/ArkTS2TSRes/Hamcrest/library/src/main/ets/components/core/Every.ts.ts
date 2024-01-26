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
import { DiagnosingMatcher } from '../DiagnosingMatcher';
export class Every<T> extends DiagnosingMatcher<Array<T>> {
    private matcher: Matcher<T>;
    public constructor(matcher: Matcher<T>) {
        super();
        this.matcher = matcher;
    }
    public matchesWithDiagnosingMatcher(collection: T[], mismatchDescription: Description): boolean {
        for (let t of collection) {
            if (!this.matcher.matches(t)) {
                mismatchDescription.appendText("an item ");
                this.matcher.describeMismatch(t, mismatchDescription);
                return false;
            }
        }
        return true;
    }
    public describeTo(description: Description): void {
        description.appendText("every item is ").appendDescriptionOf(this.matcher);
    }
    public static everyItem(itemMatcher: Matcher<any>): Matcher<Array<any>> {
        return new Every<any>(itemMatcher);
    }
}
