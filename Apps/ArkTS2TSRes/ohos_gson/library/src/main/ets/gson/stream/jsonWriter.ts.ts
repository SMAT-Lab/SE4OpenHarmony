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
import { StringBuilder } from '../lang/stringBuilder';
import { EMPTY_ARRAY, NONEMPTY_ARRAY, EMPTY_OBJECT, DANGLING_NAME, NONEMPTY_OBJECT, EMPTY_DOCUMENT, NONEMPTY_DOCUMENT, CLOSED } from './jsonScope';
import { REPLACEMENT_KEYS, REPLACEMENT_VALUES, HTML_SAFE_REPLACEMENT_KEYS, HTML_SAFE_REPLACEMENT_VALUES } from './jsonReplace';
export class JsonWriter {
    private out: StringBuilder = null;
    private stack: Array<number> = new Array(32);
    private stackSize: number = 0;
    private indent: string = null;
    private lenient: boolean = false;
    private htmlSafe: boolean = true;
    private serializeNulls: boolean = false;
    private deferredName: string = null;
    private separator = ":";
    private REPLACEMENT_CHARS = {
        '"': "\\\"",
        '\\': "\\\\",
        '\t': "\\t",
        '\b': "\\b",
        '\n': "\\n",
        '\r': "\\r",
        '\f': "\\f",
        '\u0000': '\\u0000',
        '\u0001': '\\u0001',
        '\u0002': '\\u0002',
        '\u0003': '\\u0003',
        '\u0004': '\\u0004',
        '\u0005': '\\u0005',
        '\u0006': '\\u0006',
        '\u0007': '\\u0007',
        '\u000b': '\\u000b',
        '\u000e': '\\u000e',
        '\u000f': '\\u000f',
        '\u0010': '\\u0010',
        '\u0011': '\\u0011',
        '\u0012': '\\u0012',
        '\u0013': '\\u0013',
        '\u0014': '\\u0014',
        '\u0015': '\\u0015',
        '\u0016': '\\u0016',
        '\u0017': '\\u0017',
        '\u0018': '\\u0018',
        '\u0019': '\\u0019',
        '\u001a': '\\u001a',
        '\u001b': '\\u001b',
        '\u001c': '\\u001c',
        '\u001d': '\\u001d',
        '\u001e': '\\u001e',
        '\u001f': '\\u001f',
        '\u2028': '\\u2028',
        '\u2029': '\\u2029'
    };
    private HTML_SAFE_REPLACEMENT_CHARS = {
        '"': "\\\"",
        '\\': "\\\\",
        '\t': "\\t",
        '\b': "\\b",
        '\n': "\\n",
        '\r': "\\r",
        '\f': "\\f",
        '\u0000': '\\u0000',
        '\u0001': '\\u0001',
        '\u0002': '\\u0002',
        '\u0003': '\\u0003',
        '\u0004': '\\u0004',
        '\u0005': '\\u0005',
        '\u0006': '\\u0006',
        '\u0007': '\\u0007',
        '\u000b': '\\u000b',
        '\u000e': '\\u000e',
        '\u000f': '\\u000f',
        '\u0010': '\\u0010',
        '\u0011': '\\u0011',
        '\u0012': '\\u0012',
        '\u0013': '\\u0013',
        '\u0014': '\\u0014',
        '\u0015': '\\u0015',
        '\u0016': '\\u0016',
        '\u0017': '\\u0017',
        '\u0018': '\\u0018',
        '\u0019': '\\u0019',
        '\u001a': '\\u001a',
        '\u001b': '\\u001b',
        '\u001c': '\\u001c',
        '\u001d': '\\u001d',
        '\u001e': '\\u001e',
        '\u001f': '\\u001f',
        '\u2028': '\\u2028',
        '\u2029': '\\u2029',
        '<': "\\u003c",
        '>': "\\u003e",
        '&': "\\u0026",
        '=': "\\u003d",
        '\'': "\\u0027"
    };
    constructor(out: StringBuilder) {
        if (out === null || out === undefined) {
            throw new Error('out == null');
        }
        this.out = out;
        this.push(EMPTY_DOCUMENT);
    }
    public getOut(): StringBuilder {
        return this.out;
    }
    public setIndent(indent: string): void {
        if (indent.length === 0) {
            this.indent = null;
            this.separator = ":";
        }
        else {
            this.indent = indent;
            this.separator = ": ";
        }
    }
    public setLenient(lenient: boolean): void {
        this.lenient = lenient;
    }
    public isLenient(): boolean {
        return this.lenient;
    }
    public setHtmlSafe(htmlSafe: boolean): void {
        this.htmlSafe = htmlSafe;
    }
    public isHtmlSafe(): boolean {
        return this.htmlSafe;
    }
    public setSerializeNulls(serializeNulls: boolean) {
        this.serializeNulls = serializeNulls;
    }
    public getSerializeNulls(): boolean {
        return this.serializeNulls;
    }
    public beginArray(): JsonWriter {
        this.writeDeferredName();
        return this.open(EMPTY_ARRAY, '[');
    }
    public endArray(): JsonWriter {
        return this._close(EMPTY_ARRAY, NONEMPTY_ARRAY, ']');
    }
    public beginObject(): JsonWriter {
        this.writeDeferredName();
        return this.open(EMPTY_OBJECT, '{');
    }
    public endObject(): JsonWriter {
        return this._close(EMPTY_OBJECT, NONEMPTY_OBJECT, '}');
    }
    public name(_name: string): JsonWriter {
        if (_name === null || _name === undefined) {
            throw new Error('name == null');
        }
        if (this.deferredName != null) {
            throw new Error('JsonWriter is closed.');
        }
        this.deferredName = _name;
        return this;
    }
    public value(_value: string | boolean | number): JsonWriter {
        if (_value === null || _value === undefined) {
            return this.nullValue();
        }
        this.writeDeferredName();
        this.beforeValue();
        if (typeof _value === 'string') {
            this.string(_value);
        }
        else if (typeof _value === 'boolean') {
            this.out.append(_value ? 'true' : 'false');
        }
        else if (typeof _value === 'number') {
            this.out.append(_value.toString());
        }
        return this;
    }
    public jsonValue(value: string): JsonWriter {
        if (value === null || value === undefined) {
            return this.nullValue();
        }
        this.writeDeferredName();
        this.beforeValue();
        this.out.append(value);
        return this;
    }
    public nullValue(): JsonWriter {
        if (this.deferredName != null) {
            if (this.serializeNulls) {
                this.writeDeferredName();
            }
            else {
                this.deferredName = null;
                return this;
            }
        }
        this.beforeValue();
        this.out.append('null');
        return this;
    }
    public close(): void {
        let size = this.stackSize;
        if (size > 1 || size === 1 && this.stack[size - 1] != NONEMPTY_DOCUMENT) {
            throw new Error('Incomplete document');
        }
        this.stackSize = 0;
    }
    private open(empty: number, openBracket: string): JsonWriter {
        this.beforeValue();
        this.push(empty);
        this.out.append(openBracket);
        return this;
    }
    private _close(empty: number, nonempty: number, closeBracket: string) {
        let context = this.peek();
        if (context != nonempty && context != empty) {
            throw new Error('Nesting problem.');
        }
        if (this.deferredName != null) {
            throw new Error("Dangling name: " + this.deferredName);
        }
        this.stackSize--;
        if (context === nonempty) {
            this.newline();
        }
        this.out.append(closeBracket);
        return this;
    }
    private writeDeferredName(): void {
        if (this.deferredName != null) {
            this.beforeName();
            this.string(this.deferredName);
            this.deferredName = null;
        }
    }
    private beforeName() {
        let context: number = this.peek();
        if (context === NONEMPTY_OBJECT) {
            this.out.append(',');
        }
        else if (context != EMPTY_OBJECT) {
            throw new Error('"Nesting problem."');
        }
        this.newline();
        this.replaceTop(DANGLING_NAME);
    }
    private push(newTop: number): void {
        if (this.stack.length === this.stackSize) {
            this.stack.concat(new Array(this.stackSize));
        }
        this.stack[this.stackSize++] = newTop;
    }
    private peek(): number {
        if (this.stackSize === 0) {
            throw new Error('JsonWriter is closed.');
        }
        return this.stack[this.stackSize - 1];
    }
    private newline(): void {
        if (this.indent === null || this.indent === undefined) {
            return;
        }
        this.out.append('\n');
        for (let i = 1, size = this.stackSize; i < size; i++) {
            this.out.append(this.indent);
        }
    }
    private string(value: string): void {
        this.out.append('"');
        let last = 0;
        let length = value.length;
        let replacements = this.htmlSafe ? this.HTML_SAFE_REPLACEMENT_CHARS : this.REPLACEMENT_CHARS;
        for (let i = 0; i < length; i++) {
            let c = value[i];
            let replacement;
            if (replacements.hasOwnProperty(c)) {
                replacement = replacements[c];
            }
            else {
                continue;
            }
            if (last < i) {
                this.out.append(value.slice(last, i));
            }
            this.out.append(replacement);
            last = i + 1;
        }
        if (last < length) {
            this.out.append(value.slice(last, length));
        }
        this.out.append('"');
    }
    private replaceTop(topOfStack: number): void {
        this.stack[this.stackSize - 1] = topOfStack;
    }
    private beforeValue(): void {
        switch (this.peek()) {
            case NONEMPTY_DOCUMENT:
                if (!this.lenient) {
                    throw new Error('JSON must have only one top-level value.');
                }
                break;
            case EMPTY_DOCUMENT:
                this.replaceTop(NONEMPTY_DOCUMENT);
                break;
            case EMPTY_ARRAY:
                this.replaceTop(NONEMPTY_ARRAY);
                this.newline();
                break;
            case NONEMPTY_ARRAY:
                this.out.append(',');
                this.newline();
                break;
            case DANGLING_NAME:
                this.out.append(this.separator);
                this.replaceTop(NONEMPTY_OBJECT);
                break;
            default:
                throw new Error('Nesting problem.');
                break;
        }
    }
}
