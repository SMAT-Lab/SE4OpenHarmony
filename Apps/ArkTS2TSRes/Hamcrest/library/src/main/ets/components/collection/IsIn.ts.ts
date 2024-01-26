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
export class IsIn<T> extends BaseMatcher<T> {
    collection: any[];
    constructor(collection: any[]) {
        super();
        this.collection = collection;
    }
    matches(actual: Object) {
        return this.collection.indexOf(actual) != -1;
    }
    describeTo(buffer: Description) {
        buffer.appendText("one of ");
        buffer.appendList("{", ", ", "}", this.collection);
    }
    public static isIn(collection: any[]): Matcher<any> {
        return this.in(collection);
    }
    public static in(collection: any[]): Matcher<any> {
        return new IsIn<any>(collection);
    }
}
