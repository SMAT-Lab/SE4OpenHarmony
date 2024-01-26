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
import { Description } from './Description';
import { SelfDescribing } from './SelfDescribing';
export class NullDescription implements Description {
    public appendDescriptionOf(value: SelfDescribing): Description {
        return this;
    }
    public appendList(start: String, separator: String, end: String, values: SelfDescribing[]): Description {
        return this;
    }
    public appendText(text: String): Description {
        return this;
    }
    public appendValue(value: Object): Description {
        return this;
    }
    public appendValueList(start: String, separator: String, end: String, ...values: SelfDescribing[]): Description {
        return this;
    }
    public toString(): String {
        return "";
    }
}
