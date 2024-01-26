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
import { JsonPrimitive } from '../../jsonPrimitive';
import { JsonArray } from '../../jsonArray';
import { JsonObject } from '../../jsonObject';
import { StringBuilder } from '../../lang/stringBuilder';
import { JsonNull } from '../../jsonNull';
import { JsonWriter } from '../../stream/jsonWriter';
import { JsonElement } from '../../jsonElement';
const UNWRITABLE_WRITER: StringBuilder = new StringBuilder();
const SENTINEL_CLOSED: JsonPrimitive = new JsonPrimitive("closed");
export class JsonTreeWriter extends JsonWriter {
    private _stack: Array<JsonElement> = new Array();
    private pendingName: string;
    private product: JsonElement = JsonNull.INSTANCE;
    constructor() {
        super(UNWRITABLE_WRITER);
    }
    public get(): JsonElement {
        if (this._stack.length !== 0) {
            throw new Error("Expected one JSON element but was " + this._stack);
        }
        return this.product;
    }
    private _peek(): JsonElement {
        return this._stack[this._stack.length - 1];
    }
    private put(value: JsonElement): void {
        if (this.pendingName !== null && this.pendingName !== undefined) {
            if (value instanceof JsonNull === false || super.getSerializeNulls()) {
                let object: JsonObject = this._peek() as JsonObject;
                object.add(this.pendingName, value);
            }
            this.pendingName = null;
        }
        else if (this._stack.length === 0) {
            this.product = value;
        }
        else {
            let element: JsonElement = this._peek();
            if (element instanceof JsonArray) {
                element.add(value);
            }
            else {
                throw new Error('IllegalStateException');
            }
        }
    }
    public beginArray(): JsonWriter {
        let array: JsonArray = new JsonArray();
        this.put(array);
        this._stack.push(array);
        return this;
    }
    public endArray(): JsonWriter {
        if (this._stack.length === 0 || this.pendingName != null) {
            throw new Error('IllegalStateException');
        }
        let element: JsonElement = this._peek();
        if (element instanceof JsonArray) {
            this._stack.pop();
            return this;
        }
        throw new Error('IllegalStateException');
    }
    public beginObject(): JsonWriter {
        let object: JsonObject = new JsonObject();
        this.put(object);
        this._stack.push(object);
        return this;
    }
    public endObject(): JsonWriter {
        if (this._stack.length === 0 || this.pendingName != null) {
            throw new Error('IllegalStateException');
        }
        let element: JsonElement = this._peek();
        if (element instanceof JsonObject) {
            this._stack.pop();
            return this;
        }
        throw new Error('IllegalStateException');
    }
    public name(_name: string): JsonWriter {
        if (_name === null || _name === undefined) {
            throw new Error('name == null');
        }
        if (this._stack.length === 0 || this.pendingName != null) {
            throw new Error('IllegalStateException');
        }
        let element: JsonElement = this._peek();
        if (element instanceof JsonObject) {
            this.pendingName = _name;
            return this;
        }
    }
    public value(_value: string | number | boolean): JsonWriter {
        if (_value === null || _value === undefined) {
            return this.nullValue();
        }
        if (!this.isLenient() && typeof _value === 'number') {
            if (Number.isNaN(_value) || !Number.isFinite(_value)) {
                throw new Error('IllegalStateException');
            }
        }
        this.put(new JsonPrimitive(_value));
        return this;
    }
    public nullValue(): JsonWriter {
        this.put(JsonNull.INSTANCE);
        return this;
    }
    public close(): void {
        if (this._stack.length !== 0) {
            throw new Error("Incomplete document");
        }
        this._stack.push(SENTINEL_CLOSED);
    }
}
