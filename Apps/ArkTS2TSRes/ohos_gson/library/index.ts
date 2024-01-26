let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
}
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
export { Gson } from './src/main/ets/gson/gson';
export { GsonBuilder } from './src/main/ets/gson/gsonBuilder';
export { JsonReader } from './src/main/ets/gson/stream/jsonReader';
export { JsonWriter } from './src/main/ets/gson/stream/jsonWriter';
export { StringBuilder } from './src/main/ets/gson/lang/stringBuilder';
export { StringReader } from './src/main/ets/gson/lang/stringReader';
export { JsonElement } from './src/main/ets/gson/jsonElement';
export { JsonObject } from './src/main/ets/gson/jsonObject';
export { JsonArray } from './src/main/ets/gson/jsonArray';
export { JsonPrimitive } from './src/main/ets/gson/jsonPrimitive';
export { JsonNull } from './src/main/ets/gson/jsonNull';
export { JsonTreeReader } from './src/main/ets/gson/internal/bind/jsonTreeReader';
export { JsonTreeWriter } from './src/main/ets/gson/internal/bind/jsonTreeWriter';
export { parseString, parseReader } from './src/main/ets/gson/jsonParser';
