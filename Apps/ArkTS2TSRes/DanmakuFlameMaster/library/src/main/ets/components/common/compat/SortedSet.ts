let __generate__Id: number = 0;
function generateId(): string {
    return "SortedSet_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Comparator } from './Comparator';
export class SortedSet<T> extends Array<T> {
    comparator: Comparator<T>;
    constructor(comparator: Comparator<T>) {
        super();
        this.comparator = comparator;
    }
    push(...items: T[]): number {
        let startIndex: number = 0;
        let endIndex: number = this.length - 1;
        let count: number = 0;
        for (let i: number = 0; i < items.length; i++) {
            count += this.binaryInsert(items[i]);
        }
        return count;
    }
    binaryInsert(item: T): number {
        if (this.length == 0) {
            return super.push(item);
        }
        let startIndex: number = 0;
        let endIndex: number = this.length - 1;
        let middleIndex: number;
        let cmp: number;
        while (startIndex <= endIndex) {
            middleIndex = Math.floor((startIndex + endIndex) / 2);
            cmp = this.comparator.compare(item, this[middleIndex]);
            if (cmp == 0) {
                return 0;
            }
            else if (cmp < 0) {
                endIndex = middleIndex - 1;
            }
            else {
                startIndex = middleIndex + 1;
            }
        }
        this.splice(startIndex, 0, item);
        return 1;
    }
    subSet(fromElement: T, toElement: T): SortedSet<T> {
        if (this.comparator.compare(fromElement, toElement) > 0) {
            throw Error("IllegalArguments: fromElement(" + JSON.stringify(fromElement) + ") > toElement(" + JSON.stringify(toElement) + ")");
        }
        let indexFrom = this.length;
        let indexTo = -1;
        for (let i: number = 0; i < this.length; i++) {
            if (this.comparator.compare(fromElement, this[i]) < 0) {
                indexFrom = i;
                break;
            }
        }
        for (let i: number = this.length - 1; i >= indexFrom; i--) {
            if (this.comparator.compare(toElement, this[i]) > 0) {
                indexTo = i;
                break;
            }
        }
        let result: SortedSet<T> = new SortedSet(this.comparator);
        if (indexTo >= indexFrom) {
            result.push(...this.slice(indexFrom, indexTo + 1));
        }
        return result;
    }
    toString(): string {
        let result: string = "[";
        this.forEach((item, index) => {
            result += JSON.stringify(item);
            if (index < this.length - 1) {
                result += ", ";
            }
        });
        return result + "]";
    }
}
