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
import { GsonIterator } from '../../lang/gsonIterator';
import { JsonNull } from '../../jsonNull';
import { JsonPrimitive } from '../../jsonPrimitive';
import { JsonObject } from '../../jsonObject';
import { JsonArray } from '../../jsonArray';
import { StringBuilder } from '../../lang/stringBuilder';
import { JsonReader } from '../../stream/jsonReader';
import { StringReader } from '../../lang/stringReader';
import { JsonElement } from '../../jsonElement';
import { JsonToken } from '../../stream/jsonToken';
const UNREADABLE_READER: StringReader = new StringReader('');
const SENTINEL_CLOSED: Object = new Object();
export class JsonTreeReader extends JsonReader {
    private _stack: Array<Object> = new Array(32);
    private _stackSize: number = 0;
    private _pathNames: Array<string> = new Array(32);
    private _pathIndices: Array<number> = new Array(32);
    constructor(element: JsonElement) {
        super(UNREADABLE_READER);
        this._push(element);
    }
    public beginArray(): void {
        this.expect(JsonToken.BEGIN_ARRAY);
        let array: JsonArray = this.peekStack() as JsonArray;
        this._push(array.list());
        this._pathIndices[this._stackSize - 1] = 0;
    }
    public endArray(): void {
        this.expect(JsonToken.END_ARRAY);
        this.popStack();
        this.popStack();
        if (this._stackSize > 0) {
            this._pathIndices[this._stackSize - 1]++;
        }
    }
    public beginObject(): void {
        this.expect(JsonToken.BEGIN_OBJECT);
        let object: JsonObject = this.peekStack() as JsonObject;
        this._push(object.entries());
    }
    public endObject(): void {
        this.expect(JsonToken.END_OBJECT);
        this.popStack();
        this.popStack();
        if (this._stackSize > 0) {
            this._pathIndices[this._stackSize - 1]++;
        }
    }
    public hasNext(): boolean {
        let token: JsonToken = this.peek();
        return token != JsonToken.END_OBJECT && token != JsonToken.END_ARRAY;
    }
    public peek(): JsonToken {
        if (this._stackSize === 0) {
            return JsonToken.END_DOCUMENT;
        }
        let o = this.peekStack();
        if (o instanceof GsonIterator) {
            let isObject = this._stack[this._stackSize - 2] instanceof JsonObject;
            if (o.hasNext()) {
                if (isObject) {
                    return JsonToken.NAME;
                }
                else {
                    this._push(o.next());
                    return this.peek();
                }
            }
            else {
                return isObject ? JsonToken.END_OBJECT : JsonToken.END_ARRAY;
            }
        }
        else if (o instanceof JsonObject) {
            return JsonToken.BEGIN_OBJECT;
        }
        else if (o instanceof JsonArray) {
            return JsonToken.BEGIN_ARRAY;
        }
        else if (o instanceof JsonPrimitive) {
            let primitive: JsonPrimitive = o;
            if (primitive.isString()) {
                return JsonToken.STRING;
            }
            else if (primitive.isBoolean()) {
                return JsonToken.BOOLEAN;
            }
            else if (primitive.isNumber()) {
                return JsonToken.NUMBER;
            }
            else {
                throw new Error('Assertion Error');
            }
        }
        else if (o instanceof JsonNull) {
            return JsonToken.NULL;
        }
        else if (o === SENTINEL_CLOSED) {
            throw new Error('JsonReader is closed');
        }
        else {
            throw new Error('Assertion Error');
        }
    }
    private peekStack(): Object {
        return this._stack[this._stackSize - 1];
    }
    private popStack(): Object {
        let result = this._stack[--this._stackSize];
        this._stack[this._stackSize] = null;
        return result;
    }
    private expect(expected: JsonToken): void {
        if (this.peek() != expected) {
            throw new Error('Expected ' + expected + ' but was ' + this.peek() + this._locationString());
        }
    }
    public nextName(): string {
        this.expect(JsonToken.NAME);
        let i: GsonIterator<[
            string,
            JsonElement
        ]> = this.peekStack() as GsonIterator<[
            string,
            JsonElement
        ]>;
        let entry = i.next();
        let result = entry[0];
        this._pathNames[this._stackSize - 1] = result;
        this._push(entry[1]);
        return result;
    }
    public nextString(): string {
        let token: JsonToken = this.peek();
        if (token != JsonToken.NUMBER && token != JsonToken.STRING) {
            throw new Error("Expected " + JsonToken.NUMBER + " but was " + token + this._locationString());
        }
        let jsonPrimitive = this.peekStack() as JsonPrimitive;
        let result = jsonPrimitive.getAsString();
        this.popStack();
        if (this._stackSize > 0) {
            this._pathIndices[this._stackSize - 1]++;
        }
        return result;
    }
    public nextBoolean(): boolean {
        this.expect(JsonToken.BOOLEAN);
        let jsonPrimitive = this.popStack() as JsonPrimitive;
        let result = jsonPrimitive.getAsBoolean();
        if (this._stackSize > 0) {
            this._pathIndices[this._stackSize - 1]++;
        }
        return result;
    }
    public nextNull(): void {
        this.expect(JsonToken.NULL);
        this.popStack();
        if (this._stackSize > 0) {
            this._pathIndices[this._stackSize - 1]++;
        }
    }
    public nextNumber(): number {
        let token: JsonToken = this.peek();
        if (token != JsonToken.NUMBER && token != JsonToken.STRING) {
            throw new Error("Expected " + JsonToken.NUMBER + " but was " + token + this._locationString());
        }
        let jsonPrimitive = this.peekStack() as JsonPrimitive;
        let result = jsonPrimitive.getAsNumber();
        this.popStack();
        if (this._stackSize > 0) {
            this._pathIndices[this._stackSize - 1]++;
        }
        return result;
    }
    public nextJsonElement(): JsonElement {
        let peeked: JsonToken = this.peek();
        if (peeked === JsonToken.NAME
            || peeked === JsonToken.END_ARRAY
            || peeked === JsonToken.END_OBJECT
            || peeked === JsonToken.END_DOCUMENT) {
            throw new Error("Unexpected " + peeked + " when reading a JsonElement.");
        }
        let element: JsonElement = this.popStack() as JsonElement;
        this.skipValue();
        return element;
    }
    public close(): void {
        this._stack = [SENTINEL_CLOSED];
        this._stackSize = 1;
    }
    public skipValue(): void {
        if (this.peek() == JsonToken.NAME) {
            this.nextName();
            this._pathNames[this._stackSize - 2] = 'null';
        }
        else {
            this.popStack();
            if (this._stackSize > 0) {
                this._pathNames[this._stackSize - 1] = 'null';
            }
        }
        if (this._stackSize > 0) {
            this._pathIndices[this._stackSize - 1]++;
        }
    }
    public promoteNameToValue(): void {
        this.expect(JsonToken.NAME);
        let i: GsonIterator<[
            string,
            JsonElement
        ]> = this.peekStack() as GsonIterator<[
            string,
            JsonElement
        ]>;
        let entry = i.next();
        this._push(entry[1]);
        this._push(new JsonPrimitive(entry[0]));
    }
    private _push(newTop: Object) {
        if (this._stackSize === this._stack.length) {
            this._stack = this._stack.concat(new Array(this._stackSize));
            this._pathIndices = this._pathIndices.concat(new Array(this._stackSize));
            this._pathNames = this._pathNames.concat(new Array(this._stackSize));
        }
        this._stack[this._stackSize++] = newTop;
    }
    public getPath(): string {
        let result: StringBuilder = new StringBuilder().append('$');
        for (let i = 0; i < this._stackSize; i++) {
            if (this._stack[i] instanceof JsonArray) {
                if (this._stack[++i] instanceof GsonIterator) {
                    result.append('[').append(this._pathIndices[i]).append(']');
                }
            }
            else if (this._stack[i] instanceof JsonObject) {
                if (this._stack[++i] instanceof GsonIterator) {
                    result.append('.');
                    if (this._pathNames[i] != null) {
                        result.append(this._pathNames[i]);
                    }
                }
            }
        }
        return result.toString();
    }
    private _locationString(): string {
        return ' at path ' + this.getPath();
    }
}
