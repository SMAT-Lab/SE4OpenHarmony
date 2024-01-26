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
export class MatchesPattern extends BaseMatcher<String> {
    private pattern: RegExp;
    public constructor(pattern: RegExp) {
        super();
        this.pattern = pattern;
    }
    public matches(item: string): boolean {
        return this.pattern.test(item);
    }
    public describeTo(description: Description): void {
        description.appendText("a string matching the pattern '" + this.pattern + "'");
    }
    /**
       * Creates a matcher of {@link java.lang.String} that matches when the examined string
       *
       * @param pattern
       *     the text pattern to match.
       * @return The matcher.
       */
    public static matchesPattern(pattern: RegExp): Matcher<String> {
        return new MatchesPattern(pattern);
    }
    /**
       * Creates a matcher of {@link java.lang.String} that matches when the examined string
       *
       * @param regex
       *     the regex to match.
       * @return The matcher.
       */
    public static matchesStringPattern(regex: string): Matcher<String> {
        return new MatchesPattern(new RegExp(regex));
    }
}
