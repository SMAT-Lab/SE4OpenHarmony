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
import { JsonArray } from './jsonArray';
import { JsonPrimitive } from './jsonPrimitive';
import { JsonNull } from './jsonNull';
import { JsonElement } from './jsonElement';
import { GsonIterator } from './lang/gsonIterator';
export class JsonObject extends JsonElement {
    private members: Map<string, JsonElement> = new Map<string, JsonElement>();
    public deepCopy(): JsonObject {
        let result: JsonObject = new JsonObject();
        for (let [key, value] of this.members) {
            result.add(key, value.deepCopy());
        }
        return result;
    }
    public add(property: string, value: JsonElement) {
        this.members.set(property, value == null ? JsonNull.INSTANCE : value);
    }
    public remove(property: string): JsonElement {
        if (this.has(property)) {
            let result = this.members.get(property);
            if (this.members.delete(property)) {
                return result;
            }
        }
        return null;
    }
    public addProperty(property: string, value: string | number | boolean) {
        this.add(property, value == null ? JsonNull.INSTANCE : new JsonPrimitive(value));
    }
    public entries(): GsonIterator<[
        string,
        JsonElement
    ]> {
        let entries = new Array();
        for (let entry of this.entrySet()) {
            entries.push(entry);
        }
        return new GsonIterator(entries);
    }
    public entrySet(): IterableIterator<[
        string,
        JsonElement
    ]> {
        return this.members.entries();
    }
    public keySet(): IterableIterator<string> {
        return this.members.keys();
    }
    public size(): number {
        return this.members.size;
    }
    public has(memberName: string): boolean {
        return this.members.has(memberName);
    }
    public get(memberName: string): JsonElement {
        return this.members.get(memberName);
    }
    public getAsJsonPrimitiveByMemberName(memberName: string): JsonPrimitive {
        let result = this.get(memberName);
        if (result instanceof JsonPrimitive) {
            return result;
        }
        else {
            return null;
        }
    }
    public getAsJsonArrayByMemberName(memberName: string): JsonArray {
        let result = this.get(memberName);
        if (result instanceof JsonArray) {
            return result;
        }
        else {
            return null;
        }
    }
    public getAsJsonObjectByMemberName(memberName: string): JsonObject {
        let result = this.get(memberName);
        if (result instanceof JsonObject) {
            return result;
        }
        else {
            return null;
        }
    }
}
