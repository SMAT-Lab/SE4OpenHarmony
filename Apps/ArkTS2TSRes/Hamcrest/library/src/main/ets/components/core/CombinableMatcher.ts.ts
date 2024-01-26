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
import { DiagnosingMatcher } from '../DiagnosingMatcher';
import { Description } from '../Description';
import { Matcher } from '../Matcher';
import { AllOf } from './AllOf';
import { AnyOf } from './AnyOf';
export class CombinableMatcher<T> extends DiagnosingMatcher<T> {
    private matcher: Matcher<T>;
    public constructor(matcher: Matcher<T>) {
        super();
        this.matcher = matcher;
    }
    protected matchesWithDiagnosingMatcher(item: T, mismatch: Description): boolean {
        if (!this.matcher.matches(item)) {
            this.matcher.describeMismatch(item, mismatch);
            return false;
        }
        return true;
    }
    public describeTo(description: Description): void {
        description.appendDescriptionOf(this.matcher);
    }
    public and(other: Matcher<T>): CombinableMatcher<T> {
        return new CombinableMatcher<T>(new AllOf<T>(this.templatedListWith(other)));
    }
    public or(other: Matcher<T>): CombinableMatcher<T> {
        return new CombinableMatcher<T>(new AnyOf<T>(this.templatedListWith(other)));
    }
    private templatedListWith(other: Matcher<T>): Array<Matcher<T>> {
        let matchers: Array<Matcher<T>> = [];
        matchers.push(this.matcher);
        matchers.push(other);
        return matchers;
    }
}
