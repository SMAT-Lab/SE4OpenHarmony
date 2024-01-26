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
export abstract class ShortcutCombination<T> extends BaseMatcher<T> {
    private matchers: Array<Matcher<T>>;
    public constructor(matchers: Array<Matcher<T>>) {
        super();
        this.matchers = matchers;
    }
    public abstract matches(o: Object): boolean;
    public abstract describeTo(description: Description): void;
    protected matchesWithShortcut(o: Object, shortcut: boolean): boolean {
        for (let matcher of this.matchers) {
            if (matcher.matches(o) == shortcut) {
                return shortcut;
            }
        }
        return !shortcut;
    }
    public describeToWithShortcut(description: Description, operator: String): void {
        description.appendList("(", " " + operator + " ", ")", this.matchers);
    }
}
