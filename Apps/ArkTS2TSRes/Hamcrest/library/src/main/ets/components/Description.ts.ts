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
import { NullDescription } from './NullDescription';
/**
 * A description of a Matcher. A Matcher will describe itself to a description
 * which can later be used for reporting.
 *
 * @see Matcher#describeTo(Description)
 */
export interface Description {
    /**
     * Appends some plain text to the description.
     *
     * @param text
     *     the text to append.
     * @return the update description when displaying the matcher error.
     */
    appendText(text: String): Description;
    /**
     * Appends the description of a {@link SelfDescribing} value to this description.
     *
     * @param value
     *     the value to append.
     * @return the update description when displaying the matcher error.
     */
    appendDescriptionOf(value: SelfDescribing): Description;
    /**
     * Appends an arbitrary value to the description.
     *
     * @param value
     *     the object to append.
     * @return the update description when displaying the matcher error.
     */
    appendValue(value: Object): Description;
    /**
     * Appends a list of values to the description.
     *
     * @param <T>
     *     the description type.
     * @param start
     *     the prefix.
     * @param separator
     *     the separator.
     * @param end
     *     the suffix.
     * @param values
     *     the values to append.
     * @return the update description when displaying the matcher error.
     */
    appendValueList(start: String, separator: String, end: String, ...list: SelfDescribing[]): Description;
    /**
     * Appends a list of SelfDescribing objects
     * to the description.
     * @param start
     *     the prefix.
     * @param separator
     *     the separator.
     * @param end
     *     the suffix.
     * @param values
     *     the values to append.
     * @return the update description when displaying the matcher error.
     */
    appendList(start: String, separator: String, end: String, list: SelfDescribing[]): Description;
}
