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
import { JsonTreeReader } from './jsonTreeReader';
import { isNumber } from '../../utils';
import { JsonReader } from '../../stream/jsonReader';
import { JsonElement } from '../../jsonElement';
import { JsonToken } from '../../stream/jsonToken';
import { JsonWriter } from '../../stream/jsonWriter';
import { JsonNull } from '../../jsonNull';
import { JsonArray } from '../../jsonArray';
import { JsonObject } from '../../jsonObject';
import { JsonPrimitive } from '../../jsonPrimitive';
class JsonElementType {
    public read(reader: JsonReader): JsonElement {
        if (reader instanceof JsonTreeReader) {
            return reader.nextJsonElement();
        }
        switch (reader.peek()) {
            case JsonToken.STRING:
                return new JsonPrimitive(reader.nextString());
            case JsonToken.NUMBER:
                let number = reader.nextString();
                if (isNumber(number)) {
                    return new JsonPrimitive(Number(number));
                }
                else {
                    return new JsonPrimitive(reader.nextString());
                }
            case JsonToken.BOOLEAN:
                return new JsonPrimitive(reader.nextBoolean());
            case JsonToken.NULL:
                reader.nextNull();
                return JsonNull.INSTANCE;
            case JsonToken.BEGIN_ARRAY:
                let array: JsonArray = new JsonArray();
                reader.beginArray();
                while (reader.hasNext()) {
                    array.add(this.read(reader));
                }
                reader.endArray();
                return array;
            case JsonToken.BEGIN_OBJECT:
                let object = new JsonObject();
                reader.beginObject();
                while (reader.hasNext()) {
                    object.add(reader.nextName(), this.read(reader));
                }
                reader.endObject();
                return object;
            case JsonToken.END_DOCUMENT:
            case JsonToken.NAME:
            case JsonToken.END_OBJECT:
            case JsonToken.END_ARRAY:
            default:
                throw new Error('IllegalArgument');
        }
    }
    public write(out: JsonWriter, value: JsonElement) {
        if (value === null || value === undefined || value instanceof JsonNull) {
            out.nullValue();
        }
        else if (value instanceof JsonPrimitive) {
            let primitive = value;
            if (primitive.isNumber()) {
                out.value(primitive.getAsNumber());
            }
            else if (primitive.getAsBoolean()) {
                out.value(primitive.getAsBoolean());
            }
            else {
                out.value(primitive.getAsString());
            }
        }
        else if (value instanceof JsonArray) {
            out.beginArray();
            for (let e of value.iterator()) {
                this.write(out, e);
            }
            out.endArray();
        }
        else if (value instanceof JsonObject) {
            out.beginObject();
            for (let [key, entry] of value.entrySet()) {
                out.name(key);
                this.write(out, entry);
            }
            out.endObject();
        }
        else {
            throw new Error('Couldn\'t write ' + value);
        }
    }
}
class ObjectType {
    public read(reader: JsonReader): Object {
        switch (reader.peek()) {
            case JsonToken.STRING:
                return reader.nextString();
            case JsonToken.NUMBER:
                let number = reader.nextString();
                if (isNumber(number)) {
                    return Number(number);
                }
                else {
                    return number;
                }
            case JsonToken.BOOLEAN:
                return reader.nextBoolean();
            case JsonToken.NULL:
                reader.nextNull();
                return null;
            case JsonToken.BEGIN_ARRAY:
                let array = [];
                reader.beginArray();
                while (reader.hasNext()) {
                    array.push(this.read(reader));
                }
                reader.endArray();
                return array;
            case JsonToken.BEGIN_OBJECT:
                let object = {};
                reader.beginObject();
                while (reader.hasNext()) {
                    object[reader.nextName()] = this.read(reader);
                }
                reader.endObject();
                return object;
            case JsonToken.END_DOCUMENT:
            case JsonToken.NAME:
            case JsonToken.END_OBJECT:
            case JsonToken.END_ARRAY:
            default:
                throw new Error('IllegalArgument');
        }
    }
    public write(out: JsonWriter, value: Object) {
        if (value === null || value === undefined) {
            out.nullValue();
        }
        else if (typeof value === 'string' || typeof value === 'boolean' || typeof value === 'number') {
            out.value(value);
        }
        else if (typeof value === 'object' && value instanceof Array) {
            out.beginArray();
            for (let e of value) {
                this.write(out, e);
            }
            out.endArray();
        }
        else if (typeof value === 'object') {
            out.beginObject();
            for (let key in value) {
                out.name(key);
                this.write(out, value[key]);
            }
            out.endObject();
        }
        else {
            throw new Error('Couldn\'t write ' + value);
        }
    }
}
export const JSON_ELEMENT_TYPE = new JsonElementType();
export const OBJECT_TYPE = new ObjectType();
