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
import { NullDescription } from './NullDescription';
/**
 * A {@link Description} that is stored as a string.
 */
export abstract class BaseDescription implements Description {
    static NONE: Description = new NullDescription();
    value = '';
    public appendText(text): Description {
        this.append(text);
        return this;
    }
    public appendDescriptionOf(value: SelfDescribing): Description {
        value.describeTo(this);
        return this;
    }
    public appendValue(value: Object): Description {
        if (value === undefined) {
            this.append('undefined');
        }
        else if (value == null) {
            this.append('null');
        }
        else if (value instanceof String) {
            this.append('"' + value + '"');
        }
        else if (value instanceof Array) {
            this.appendList('[', ', ', ']', value);
        }
        else {
            this.append(value.toString());
        }
        return this;
    }
    public appendValueList(start: String, separator: String, end: String, ...list: SelfDescribing[]): Description {
        return this.appendList(start, separator, end, list);
    }
    public appendList(start: String, separator: String, end: String, list: SelfDescribing[]): Description {
        this.append(start);
        for (let i = 0; i < list.length; i++) {
            if (i > 0) {
                this.append(separator);
            }
            this.appendDescriptionOf(list[i]);
        }
        this.append(end);
        return this;
    }
    protected abstract append(str: String): void;
}
