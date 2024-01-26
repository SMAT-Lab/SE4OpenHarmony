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
import { Matcher } from '../Matcher';
import { BaseMatcher } from '../BaseMatcher';
import { Description } from '../Description';
import { IsIterableContaining } from '../core/IsIterableContaining';
export class HasItemInArray<T> extends BaseMatcher<Array<any>> {
    private readonly elementMatcher: Matcher<any>;
    private readonly collectionMatcher: BaseMatcher<any>;
    public constructor(elementMatcher: Matcher<any>) {
        super();
        this.elementMatcher = elementMatcher;
        this.collectionMatcher = new IsIterableContaining<T>(elementMatcher);
    }
    public matches(item: Object): boolean {
        var source = new Array<Object>();
        source.push(item);
        return this.collectionMatcher.matches(source);
    }
    public describeMismatch(item: Object, mismatchDescription: Description): void {
    }
    public matchesSafely(actual: Array<any>): boolean {
        return this.collectionMatcher.matches(actual);
    }
    public describeMismatchSafely(actual: Array<any>, mismatchDescription: Description): void {
        this.collectionMatcher.describeMismatch(actual, mismatchDescription);
    }
    public describeTo(description: Description): void {
        description
            .appendText("an array containing ")
            .appendDescriptionOf(this.elementMatcher);
    }
}
