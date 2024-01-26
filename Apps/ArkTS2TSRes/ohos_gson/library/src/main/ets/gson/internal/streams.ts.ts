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
import { JsonElement } from '../jsonElement';
import { JsonNull } from '../jsonNull';
import { JsonWriter } from '../stream/jsonWriter';
import { JsonReader } from '../stream/jsonReader';
import { JSON_ELEMENT_TYPE } from './bind/typeAdapters';
export function write(element: JsonElement, writer: JsonWriter) {
    JSON_ELEMENT_TYPE.write(writer, element);
}
export function parse(reader: JsonReader): JsonElement {
    let isEmpty = true;
    try {
        reader.peek();
        isEmpty = false;
        return JSON_ELEMENT_TYPE.read(reader);
    }
    catch (error) {
        if (isEmpty) {
            return JsonNull.INSTANCE;
        }
        throw new Error('JsonSyntaxException' + error.toString());
    }
}
