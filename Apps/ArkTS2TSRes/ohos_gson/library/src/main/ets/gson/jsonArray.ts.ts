/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import { GsonIterator } from './lang/gsonIterator';
import { arrayRemove } from './utils';
import { JsonPrimitive } from './jsonPrimitive';
import { JsonNull } from './jsonNull';
import { JsonElement } from './jsonElement';
export class JsonArray extends JsonElement {
    private elements: Array<JsonElement> = new Array<JsonElement>();
    constructor() {
        super();
    }
    ;
    public deepCopy(): JsonArray {
        if (this.elements != null && this.elements.length > 0) {
            let result: JsonArray = new JsonArray();
            for (let element of this.elements) {
                result.add(element);
            }
            return result;
        }
        return new JsonArray();
    }
    public add(value: JsonElement | string | number | boolean): void {
        if (value === null || value === undefined) {
            value = JsonNull.INSTANCE;
            this.elements.push(value);
        }
        else if (value instanceof JsonElement) {
            this.elements.push(value);
        }
        else {
            this.elements.push(new JsonPrimitive(value));
        }
    }
    public addAll(array: JsonArray): void {
        for (let element of array.elements) {
            this.elements.push(element);
        }
    }
    public set(index: number, element: JsonElement): JsonElement {
        return this.elements[index] = element;
    }
    public remove(elementOrIndex: JsonElement | number): boolean | JsonElement {
        if (elementOrIndex instanceof JsonElement) {
            return arrayRemove(this.elements, elementOrIndex);
        }
        else if (this.elements.length > elementOrIndex) {
            let result = this.elements[elementOrIndex];
            this.elements.slice(elementOrIndex, 1);
            return result;
        }
        return null;
    }
    public contains(element: JsonElement): boolean {
        return this.elements.indexOf(element) != -1;
    }
    public size(): number {
        return this.elements.length;
    }
    public isEmpty(): boolean {
        return this.elements == null || this.elements.length === 0;
    }
    public iterator(): IterableIterator<JsonElement> {
        return this.elements.values();
    }
    public list(): GsonIterator<JsonElement> {
        return new GsonIterator(this.elements);
    }
    public get(i: number): JsonElement {
        if (this.elements.length > i) {
            this.elements[i];
        }
        else {
            return null;
        }
    }
    public getAsNumber(): number {
        if (this.elements.length === 1) {
            let element = this.elements[0];
            if (element instanceof JsonPrimitive) {
                return element.getAsNumber();
            }
        }
        throw new Error('not a number');
    }
    public getAsString(): string {
        if (this.elements.length === 1) {
            let element = this.elements[0];
            if (element instanceof JsonPrimitive) {
                return element.getAsString();
            }
        }
        throw new Error('not a number');
    }
    public getAsBoolean(): boolean {
        if (this.elements.length === 1) {
            let element = this.elements[0];
            if (element instanceof JsonPrimitive) {
                return element.getAsBoolean();
            }
        }
        throw new Error('not a number');
    }
}
