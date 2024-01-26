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
export class StringBuilder {
    private str: Array<string>;
    constructor(value?: string | number | boolean | string[] | StringBuilder) {
        if (typeof value === 'string') {
            this.str = [value];
        }
        else if (value instanceof Array) {
            this.str = value;
        }
        else if (value instanceof StringBuilder) {
            this.str = value.str;
        }
        else if (value) {
            this.str = [value.toString()];
        }
        else {
            this.str = [];
        }
    }
    get length() {
        return this.str.length;
    }
    append(value: string | number | boolean | string[] | StringBuilder): StringBuilder {
        if (typeof value === 'string') {
            this.str.push(value);
        }
        else if (value instanceof Array) {
            this.str.push(...value);
        }
        else if (value instanceof StringBuilder) {
            this.str.push(...value.str);
        }
        else {
            this.str.push(value.toString());
        }
        return this;
    }
    insert(index: number, value: string | number | boolean | string[] | StringBuilder): void {
        if (typeof value === 'string') {
            this.str.splice(index, 0, value);
        }
        else if (value instanceof Array) {
            this.str.splice(index, 0, ...value);
        }
        else if (value instanceof StringBuilder) {
            this.str.splice(index, 0, ...value.str);
        }
        else {
            this.str.splice(index, 0, value.toString());
        }
    }
    clear() {
        this.str = [];
    }
    remove(start: number, length: number) {
        this.str.splice(start, length);
    }
    replace(substr: string, replacement: string) {
        this.str = this.str.map(s => s === substr ? replacement : s);
    }
    toString(): string {
        return this.str.join('');
    }
    equals(value: StringBuilder) {
        return this.toString() === value.toString();
    }
}
