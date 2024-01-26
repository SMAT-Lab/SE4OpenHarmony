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
import { BaseDescription } from './BaseDescription';
import { SelfDescribing } from './SelfDescribing';
/**
 * A {@link Description} that is stored as a string.
 */
export class StringDescription extends BaseDescription {
    value = '';
    constructor() {
        super();
    }
    /**
     * Return the description of a {@link SelfDescribing} object as a String.
     *
     * @param selfDescribing
     *    The object to be described.
     * @return
     *   The description of the object.
     */
    public static convertToString(selfDescribing: SelfDescribing): String {
        return new StringDescription().appendDescriptionOf(selfDescribing).toString();
    }
    /**
     * Alias for {@link #toString(SelfDescribing)}.
     *
     * @param selfDescribing
     *    The object to be described.
     * @return
     *   The description of the object.
     */
    public static asString(selfDescribing: SelfDescribing): String {
        return this.convertToString(selfDescribing);
    }
    protected append(str: String): void {
        this.value += str;
    }
    /**
     * Returns the description as a string.
     */
    public toString(): String {
        return this.value;
    }
}
