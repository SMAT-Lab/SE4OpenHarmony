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
import { JsonTreeReader } from './internal/bind/jsonTreeReader';
import { OBJECT_TYPE } from './internal/bind/typeAdapters';
import { write } from './internal/streams';
import { JsonWriter } from './stream/jsonWriter';
import { JsonReader } from './stream/jsonReader';
import { JsonNull } from './jsonNull';
import { StringBuilder } from './lang/stringBuilder';
import { StringReader } from './lang/stringReader';
import { JsonElement } from './jsonElement';
import { JsonTreeWriter } from './internal/bind/jsonTreeWriter';
export const DEFAULT_JSON_NON_EXECUTABLE = false;
export const DEFAULT_LENIENT = false;
export const DEFAULT_PRETTY_PRINT = false;
export const DEFAULT_ESCAPE_HTML = true;
export const DEFAULT_SERIALIZE_NULLS = false;
const JSON_NON_EXECUTABLE_PREFIX = ")]}'\n";
export class Gson {
    private serializeNulls: boolean = DEFAULT_SERIALIZE_NULLS;
    private generateNonExecutableJson: boolean = DEFAULT_JSON_NON_EXECUTABLE;
    private htmlSafe: boolean = DEFAULT_ESCAPE_HTML;
    private prettyPrinting: boolean = DEFAULT_PRETTY_PRINT;
    private lenient: boolean = DEFAULT_LENIENT;
    constructor(options?: GsonOptions) {
        if (options !== null && options !== undefined) {
            this.serializeNulls = options.serializeNulls;
            this.generateNonExecutableJson = options.generateNonExecutableJson;
            this.htmlSafe = options.htmlSafe;
            this.prettyPrinting = options.prettyPrinting;
            this.lenient = options.lenient;
        }
        else {
            this.serializeNulls = DEFAULT_SERIALIZE_NULLS;
            this.generateNonExecutableJson = DEFAULT_JSON_NON_EXECUTABLE;
            this.htmlSafe = DEFAULT_ESCAPE_HTML;
            this.prettyPrinting = DEFAULT_PRETTY_PRINT;
            this.lenient = DEFAULT_LENIENT;
        }
    }
    public getSerializeNulls(): boolean {
        return this.serializeNulls;
    }
    public getHtmlSafe(): boolean {
        return this.htmlSafe;
    }
    public toJsonTree(src: Object): JsonElement {
        if (src === null || src === undefined) {
            return JsonNull.INSTANCE;
        }
        let writer: JsonTreeWriter = new JsonTreeWriter();
        this.toJson(src, writer);
        return writer.get();
    }
    public toJson(src: Object | JsonElement, writer?: StringBuilder | JsonWriter): string {
        let jsonWriter: JsonWriter;
        if (writer == null) {
            jsonWriter = this.newJsonWriter(new StringBuilder());
        }
        else if (writer instanceof JsonWriter) {
            jsonWriter = writer;
        }
        else {
            jsonWriter = this.newJsonWriter(writer);
        }
        if (src == null) {
            src = JsonNull.INSTANCE;
        }
        let oldLenient = jsonWriter.isLenient();
        jsonWriter.setLenient(this.lenient);
        let oldHtmlSafe = jsonWriter.isHtmlSafe();
        jsonWriter.setHtmlSafe(this.htmlSafe);
        let oldSerializeNulls = jsonWriter.getSerializeNulls();
        jsonWriter.setSerializeNulls(this.serializeNulls);
        try {
            if (src instanceof JsonElement) {
                write(src, jsonWriter);
            }
            else {
                OBJECT_TYPE.write(jsonWriter, src);
            }
        }
        catch (error) {
            throw error;
        }
        finally {
            jsonWriter.setLenient(oldLenient);
            jsonWriter.setHtmlSafe(oldHtmlSafe);
            jsonWriter.setSerializeNulls(oldSerializeNulls);
        }
        return jsonWriter.getOut().toString();
    }
    public fromJson(json: string | JsonElement): Object {
        if (json == null) {
            return null;
        }
        let reader: JsonReader;
        if (json instanceof JsonElement) {
            reader = new JsonTreeReader(json);
        }
        else {
            let stringReader: StringReader = new StringReader(json);
            reader = this.newJsonReader(stringReader);
        }
        let isEmpty = true;
        let oldLenient = reader.isLenient();
        reader.setLenient(this.lenient);
        let object = null;
        try {
            reader.peek();
            isEmpty = false;
            object = OBJECT_TYPE.read(reader);
        }
        catch (error) {
            if (isEmpty) {
                return null;
            }
            throw new Error('JsonSyntax');
        }
        finally {
            reader.setLenient(oldLenient);
        }
        return object;
    }
    public newJsonWriter(writer: StringBuilder): JsonWriter {
        if (this.generateNonExecutableJson) {
            writer.append(JSON_NON_EXECUTABLE_PREFIX);
        }
        let jsonWriter: JsonWriter = new JsonWriter(writer);
        if (this.prettyPrinting) {
            jsonWriter.setIndent("  ");
        }
        jsonWriter.setSerializeNulls(this.serializeNulls);
        return jsonWriter;
    }
    public newJsonReader(reader: StringReader): JsonReader {
        let jsonReader = new JsonReader(reader);
        jsonReader.setLenient(this.lenient);
        return jsonReader;
    }
}
export class GsonOptions {
    public serializeNulls: boolean;
    public generateNonExecutableJson: boolean;
    public htmlSafe: boolean;
    public prettyPrinting: boolean;
    public lenient: boolean;
    constructor(serializeNulls: boolean, generateNonExecutableJson: boolean, htmlSafe: boolean, prettyPrinting: boolean, lenient: boolean) {
        this.serializeNulls = serializeNulls;
        this.generateNonExecutableJson = generateNonExecutableJson;
        this.htmlSafe = htmlSafe;
        this.prettyPrinting = prettyPrinting;
        this.lenient = lenient;
    }
}
