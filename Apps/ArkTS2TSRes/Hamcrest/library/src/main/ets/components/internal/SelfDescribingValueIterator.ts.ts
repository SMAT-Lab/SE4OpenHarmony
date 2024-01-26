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
export class SelfDescribingValueIterator {
    private readonly values: Array<any>;
    private currentIndex: number = 0;
    public constructor(array: Array<any>) {
        if (!Array.isArray(array)) {
            throw new Error("not an array");
        }
        this.values = array;
    }
    public hasNext(): boolean {
        return this.currentIndex < this.values.length;
    }
    public next(): Object {
        this.currentIndex++;
        return this.values.pop();
    }
    public remove(): void {
        throw new Error("cannot remove items from an array");
    }
}
