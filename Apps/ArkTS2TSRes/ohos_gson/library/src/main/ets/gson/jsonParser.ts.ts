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
import { StringReader } from './lang/stringReader';
import { JsonElement } from './jsonElement';
import { JsonReader } from './stream/jsonReader';
import { parse } from './internal/streams';
export function parseString(json: string): JsonElement {
    return parseReader(new StringReader(json));
}
export function parseReader(reader: StringReader | JsonReader): JsonElement {
    let jsonReader: JsonReader;
    if (reader instanceof StringReader) {
        jsonReader = new JsonReader(reader);
    }
    else {
        jsonReader = reader;
    }
    jsonReader.setLenient(true);
    try {
        return parse(jsonReader);
    }
    catch (error) {
        throw new Error("Failed parsing JSON source: " + reader + " to Json," + error.toString());
    }
}
