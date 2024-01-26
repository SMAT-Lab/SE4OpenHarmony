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
import { DiagnosingMatcher } from './DiagnosingMatcher';
import { Description } from './Description';
import { Matcher } from './Matcher';
/**
 * Supporting class for matching a feature of an object. Implement <code>featureValueOf()</code>
 * in a subclass to pull out the feature to be matched against.
 *
 * @param <T> The type of the object to be matched
 * @param <U> The type of the feature to be matched
 */
export abstract class FeatureMatcher<T, U> extends DiagnosingMatcher<T> {
    private subMatcher: Matcher<U>;
    private featureDescription: String;
    private featureName: String;
    /**
     * Constructor
     * @param subMatcher The matcher to apply to the feature
     * @param featureDescription Descriptive text to use in describeTo
     * @param featureName Identifying text for mismatch message
     */
    public constructor(subMatcher: Matcher<U>, featureDescription: String, featureName: String) {
        super();
        this.subMatcher = subMatcher;
        this.featureDescription = featureDescription;
        this.featureName = featureName;
    }
    /**
     * Implement this to extract the interesting feature.
     * @param actual the target object
     * @return the feature to be matched
     */
    protected abstract featureValueOf(actual: T): U;
    protected matchesWithDiagnosingMatcher(actual: T, mismatch: Description): boolean {
        let featureValue: U = this.featureValueOf(actual);
        if (!this.subMatcher.matches(featureValue)) {
            mismatch.appendText(this.featureName).appendText(" ");
            this.subMatcher.describeMismatch(featureValue, mismatch);
            return false;
        }
        return true;
    }
    public describeTo(description: Description): void {
        description.appendText(this.featureDescription).appendText(" ")
            .appendDescriptionOf(this.subMatcher);
    }
}
