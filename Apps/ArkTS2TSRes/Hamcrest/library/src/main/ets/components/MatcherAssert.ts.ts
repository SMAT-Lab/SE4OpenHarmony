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
import { Matcher } from './Matcher';
import { Description } from './Description';
import { StringDescription } from './StringDescription';
export class MatcherAssert {
    public static assertThat(actual: any, matcher: Matcher<any>): void {
        MatcherAssert.assertThatWithMatcher(actual, matcher, "");
    }
    public static assertThatWithMatcher(actual: any, matcher: Matcher<any>, reason?: String): void {
        if (!matcher.matches(actual)) {
            let description: Description = new StringDescription();
            description.appendText(reason)
                .appendText("\n")
                .appendText("Expected: ")
                .appendDescriptionOf(matcher)
                .appendText("\n")
                .appendText("     but: ");
            matcher.describeMismatch(actual, description);
            throw new Error(description.toString());
        }
    }
    public static assertThatWithReason(reason: String, assertion: boolean): void {
        if (!assertion) {
            throw new Error(reason.toString());
        }
    }
}
