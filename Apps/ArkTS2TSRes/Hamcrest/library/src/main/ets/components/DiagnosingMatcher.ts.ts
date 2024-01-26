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
import { BaseMatcher } from './BaseMatcher';
import { Description } from './Description';
import { BaseDescription } from './BaseDescription';
/**
 * TODO(ngd): Document.
 *
 * @param <T> the type of matcher being diagnosed.
 */
export abstract class DiagnosingMatcher<T> extends BaseMatcher<T> {
    public matches(item: Object): boolean {
        return this.matchesWithDiagnosingMatcher(item, BaseDescription.NONE);
    }
    public describeMismatch(item: Object, mismatchDescription: Description): void {
        this.matchesWithDiagnosingMatcher(item, mismatchDescription);
    }
    protected abstract matchesWithDiagnosingMatcher(item: Object, mismatchDescription: Description): boolean;
}
