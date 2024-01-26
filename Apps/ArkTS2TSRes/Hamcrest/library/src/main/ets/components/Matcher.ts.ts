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
import { SelfDescribing } from './SelfDescribing';
import { Description } from './Description';
export interface Matcher<T> extends SelfDescribing {
    /**
     * Evaluates the matcher for argument <var>item</var>.
     *
     * This method matches against Object, instead of the generic type T. This is
     * because the caller of the Matcher does not know at runtime what the type is
     * (because of type erasure with Java generics). It is down to the implementations
     * to check the correct type.
     *
     * @param actual the object against which the matcher is evaluated.
     * @return <code>true</code> if <var>item</var> matches, otherwise <code>false</code>.
     *
     * @see BaseMatcher
     */
    matches(actual: Object): boolean;
    /**
     * Generate a description of why the matcher has not accepted the item.
     * The description will be part of a larger description of why a matching
     * failed, so it should be concise.
     * This method assumes that <code>matches(item)</code> is false, but
     * will not check this.
     *
     * @param actual The item that the Matcher has rejected.
     * @param mismatchDescription
     *     The description to be built or appended to.
     */
    describeMismatch(actual: Object, mismatchDescription: Description): void;
}
