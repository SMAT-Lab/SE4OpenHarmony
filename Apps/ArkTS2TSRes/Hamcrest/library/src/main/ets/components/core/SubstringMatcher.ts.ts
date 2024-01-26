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
export abstract class SubstringMatcher extends BaseMatcher<String> {
    private relationship: String;
    private ignoringCase: boolean;
    protected substring: String;
    protected constructor(relationship: String, ignoringCase: boolean, substring: String) {
        super();
        this.relationship = relationship;
        this.ignoringCase = ignoringCase;
        this.substring = substring;
        if (null == substring) {
            throw new Error("missing substring");
        }
    }
    public matches(item: String): boolean {
        return this.evalSubstringOf(this.ignoringCase ? item.toLowerCase() : item);
    }
    public describeMismatch(item: String, mismatchDescription: Description): void {
        mismatchDescription.appendText("was \"").appendText(item).appendText("\"");
    }
    public describeTo(description: Description): void {
        description.appendText("a string ")
            .appendText(this.relationship)
            .appendText(" ")
            .appendValue(this.substring);
        if (this.ignoringCase) {
            description.appendText(" ignoring case");
        }
    }
    protected converted(arg: String): String {
        return this.ignoringCase ? arg.toLowerCase() : arg;
    }
    protected abstract evalSubstringOf(str: String): boolean;
}
