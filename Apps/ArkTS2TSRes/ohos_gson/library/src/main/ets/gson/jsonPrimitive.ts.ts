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
import { JsonElement } from './jsonElement';
import { isNumber } from './utils';
export class JsonPrimitive extends JsonElement {
    private value: string | number | boolean;
    constructor(value: string | number | boolean) {
        super();
        this.value = value;
    }
    public deepCopy(): JsonPrimitive {
        return this;
    }
    public isBoolean(): boolean {
        return typeof this.value === 'boolean';
    }
    public getAsBoolean(): boolean {
        if (typeof this.value === 'boolean') {
            return this.value;
        }
    }
    public isNumber(): boolean {
        return typeof this.value === 'number';
    }
    public getAsNumber(): number {
        if (typeof this.value === 'number') {
            return this.value;
        }
        else if (typeof this.value === 'string') {
            if (isNumber(this.value)) {
                return Number(this.value);
            }
            else {
                return 0;
            }
        }
        else if (typeof this.value === 'boolean') {
            if (this.value) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    public isString(): boolean {
        return typeof this.value === 'string';
    }
    public getAsString(): string {
        if (this.isNumber()) {
            return this.getAsNumber().toString();
        }
        else if (this.isBoolean()) {
            return this.value.toString();
        }
        else if (typeof this.value === 'string') {
            return this.value;
        }
    }
}
