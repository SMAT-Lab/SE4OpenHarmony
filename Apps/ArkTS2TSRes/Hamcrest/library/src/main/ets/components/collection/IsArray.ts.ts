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
import { BaseMatcher } from '../BaseMatcher';
import { Description } from '../Description';
import { Matcher } from '../Matcher';
/**
 * Matcher for array whose elements satisfy a sequence of matchers.
 * The array size must equal the number of element matchers.
 */
export class IsArray<T> extends BaseMatcher<T[]> {
    elementMatchers: Matcher<T>[];
    constructor(mArray: Matcher<T>[]) {
        super();
        this.elementMatchers = mArray;
    }
    describeTo(description: Description) {
        description.appendList(this.descriptionStart(), this.descriptionSeparator(), this.descriptionEnd(), this.elementMatchers);
    }
    matches(actual: Object) {
        /**
         * 类型转换
         */
        var array = [];
        Object.keys(actual).forEach(function (key: string) {
            array.push(actual[key]);
        });
        if (array.length != this.elementMatchers.length)
            return false;
        for (var i = 0; i < array.length; i++) {
            if (!this.elementMatchers[i].matches(array[i]))
                return false;
        }
        return true;
    }
    ;
    describeMismatch(items: Object, description: Description) {
        var actual = [];
        for (var key in items) {
            if (!Object.prototype.hasOwnProperty.call(item, key)) {
                continue;
            }
            var item = {};
            item[key] = items[key];
            actual.push(item);
        }
        if (actual.length != this.elementMatchers.length) {
            description.appendText("array length was ").appendValue(actual.length);
            return;
        }
        for (var i = 0; i < actual.length; i++) {
            if (!this.elementMatchers[i].matches(actual[i])) {
                description.appendText("element ").appendValue(i).appendText(" ");
                this.elementMatchers[i].describeMismatch(actual[i], description);
                return;
            }
        }
    }
    protected descriptionStart(): string {
        return "[";
    }
    protected descriptionSeparator(): string {
        return ", ";
    }
    protected descriptionEnd(): string {
        return "]";
    }
    public static array(...elementMatchers: any[]): Matcher<any> {
        return new IsArray<any>(elementMatchers);
    }
}
