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
/**
 * BaseClass for all Matcher implementations.
 *
 * @see Matcher
 */
export abstract class BaseMatcher<T> implements Matcher<T> {
    public describeMismatch(item: Object, description: Description): void {
        description.appendText("was ").appendValue(item);
    }
    public toString(): String {
        return StringDescription.convertToString(this);
    }
    /**
     * Useful null-check method. Writes a mismatch description if the actual object is null
     * @param actual the object to check
     * @param mismatch where to write the mismatch description, if any
     * @return false iff the actual object is null
     */
    protected static isNotNull(actual: Object, mismatch: Description): boolean {
        if (actual == null) {
            mismatch.appendText("was null");
            return false;
        }
        return true;
    }
    public abstract matches(actual: Object): boolean;
    public abstract describeTo(description: Description): void;
}
