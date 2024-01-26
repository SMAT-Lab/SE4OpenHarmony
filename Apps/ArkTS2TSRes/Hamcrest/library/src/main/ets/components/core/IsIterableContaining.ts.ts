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
import { IsEqual } from './IsEqual';
import { AllOf } from './AllOf';
export class IsIterableContaining<T> extends DiagnosingMatcher<Object> {
    private elementMatcher: Matcher<Object>;
    public constructor(elementMatcher: Matcher<Object>) {
        super();
        this.elementMatcher = elementMatcher;
    }
    protected matchesWithDiagnosingMatcher(collection: Array<Object>, mismatchDescription: Description): boolean {
        if (this.isEmpty(collection)) {
            mismatchDescription.appendText("was empty");
            return false;
        }
        for (let item of collection) {
            if (this.elementMatcher.matches(item)) {
                return true;
            }
        }
        mismatchDescription.appendText("mismatches were: [");
        let isPastFirst: boolean = false;
        for (let item of collection) {
            if (isPastFirst) {
                mismatchDescription.appendText(", ");
            }
            this.elementMatcher.describeMismatch(item, mismatchDescription);
            isPastFirst = true;
        }
        mismatchDescription.appendText("]");
        return false;
    }
    private isEmpty(iterable: Array<Object>): boolean {
        return iterable == null ? true : iterable.length == 0;
    }
    public describeTo(description: Description): void {
        description
            .appendText("a collection containing ")
            .appendDescriptionOf(this.elementMatcher);
    }
    /**
       * Creates a matcher for {@link Iterable}s that only matches when a single pass over the
       * examined {@link Iterable} yields at least one item that is matched by the specified
       * <code>itemMatcher</code>.  Whilst matching, the traversal of the examined {@link Iterable}
       * will stop as soon as a matching item is found.
       * For example:
       * <pre>assertThat(Arrays.asList("foo", "bar"), hasItem(startsWith("ba")))</pre>
       *
       * @param <T>
       *     the matcher type.
       * @param itemMatcher
       *     the matcher to apply to items provided by the examined {@link Iterable}
       * @return The matcher.
       */
    public static hasItem(itemMatcher: Matcher<Object>): Matcher<Object> {
        return new IsIterableContaining<Object>(itemMatcher);
    }
    /**
       * Creates a matcher for {@link Iterable}s that only matches when a single pass over the
       * examined {@link Iterable} yields at least one item that is equal to the specified
       * <code>item</code>.  Whilst matching, the traversal of the examined {@link Iterable}
       * will stop as soon as a matching item is found.
       * For example:
       * <pre>assertThat(Arrays.asList("foo", "bar"), hasItem("bar"))</pre>
       *
       * @param <T>
       *     the matcher type.
       * @param item
       *     the item to compare against the items provided by the examined {@link Iterable}
       * @return The matcher.
       */
    public static hasTargetItem(item: Object): Matcher<Object> {
        // Doesn't forward to hasItem() method so compiler can sort out generics.
        return new IsIterableContaining<Object>(IsEqual.equalTo(item));
    }
    /**
       * Creates a matcher for {@link Iterable}s that matches when consecutive passes over the
       * examined {@link Iterable} yield at least one item that is matched by the corresponding
       * matcher from the specified <code>itemMatchers</code>.  Whilst matching, each traversal of
       * the examined {@link Iterable} will stop as soon as a matching item is found.
       * For example:
       * <pre>assertThat(Arrays.asList("foo", "bar", "baz"), hasItems(endsWith("z"), endsWith("o")))</pre>
       *
       * @param <T>
       *     the matcher type.
       * @param itemMatchers
       *     the matchers to apply to items provided by the examined {@link Iterable}
       * @return The matcher.
       */
    public static hasItems(...itemMatchers: Matcher<Object>[]): Matcher<Object> {
        return AllOf.allOf(itemMatchers);
    }
    /**
       * Creates a matcher for {@link Iterable}s that matches when consecutive passes over the
       * examined {@link Iterable} yield at least one item that is equal to the corresponding
       * item from the specified <code>items</code>.  Whilst matching, each traversal of the
       * examined {@link Iterable} will stop as soon as a matching item is found.
       * For example:
       * <pre>assertThat(Arrays.asList("foo", "bar", "baz"), hasItems("baz", "foo"))</pre>
       *
       * @param <T>
       *     the matcher type.
       * @param items
       *     the items to compare against the items provided by the examined {@link Iterable}
       * @return The matcher.
       */
    public static hasTargetItems(...items: Object[]): Matcher<Object> {
        let all: Matcher<Object>[] = [];
        for (let item of items) {
            all.push(IsIterableContaining.hasTargetItem(item));
        }
        return AllOf.allOf(all);
    }
}
