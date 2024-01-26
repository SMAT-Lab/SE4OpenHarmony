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
import { Gson, GsonOptions, DEFAULT_LENIENT, DEFAULT_JSON_NON_EXECUTABLE, DEFAULT_PRETTY_PRINT, DEFAULT_ESCAPE_HTML, DEFAULT_SERIALIZE_NULLS } from './gson';
export class GsonBuilder {
    private serializeNulls = DEFAULT_SERIALIZE_NULLS;
    private generateNonExecutableJson = DEFAULT_JSON_NON_EXECUTABLE;
    private escapeHtmlChars = DEFAULT_ESCAPE_HTML;
    private prettyPrinting = DEFAULT_PRETTY_PRINT;
    private lenient = DEFAULT_LENIENT;
    public setSerializeNulls(): GsonBuilder {
        this.serializeNulls = true;
        return this;
    }
    public setGenerateNonExecutableJson(): GsonBuilder {
        this.generateNonExecutableJson = true;
        return this;
    }
    public setPrettyPrinting(): GsonBuilder {
        this.prettyPrinting = true;
        return this;
    }
    public setLenient(): GsonBuilder {
        this.lenient = true;
        return this;
    }
    public disableHtmlEscaping(): GsonBuilder {
        this.escapeHtmlChars = false;
        return this;
    }
    public create(): Gson {
        return new Gson(new GsonOptions(this.serializeNulls, this.generateNonExecutableJson, this.escapeHtmlChars, this.prettyPrinting, this.lenient));
    }
}
