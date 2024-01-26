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
import { StringReader, StringReaderOption } from '../lang/stringReader';
import { arrayCopy, isNumber, getString, isOneNum } from '../utils';
import { EMPTY_ARRAY, NONEMPTY_ARRAY, EMPTY_OBJECT, DANGLING_NAME, NONEMPTY_OBJECT, EMPTY_DOCUMENT, NONEMPTY_DOCUMENT, CLOSED } from './jsonScope';
import { JsonToken } from './jsonToken';
const PEEKED_NONE = 0;
const PEEKED_BEGIN_OBJECT = 1;
const PEEKED_END_OBJECT = 2;
const PEEKED_BEGIN_ARRAY = 3;
const PEEKED_END_ARRAY = 4;
const PEEKED_TRUE = 5;
const PEEKED_FALSE = 6;
const PEEKED_NULL = 7;
const PEEKED_SINGLE_QUOTED = 8;
const PEEKED_DOUBLE_QUOTED = 9;
const PEEKED_UNQUOTED = 10;
/** When this is returned, the string value is stored in peekedString. */
const PEEKED_BUFFERED = 11;
const PEEKED_SINGLE_QUOTED_NAME = 12;
const PEEKED_DOUBLE_QUOTED_NAME = 13;
const PEEKED_UNQUOTED_NAME = 14;
/** When this is returned, the integer value is stored in peekedLong. */
const PEEKED_LONG = 15;
const PEEKED_NUMBER = 16;
const PEEKED_EOF = 17;
/* State machine when parsing numbers */
const NUMBER_CHAR_NONE = 0;
const NUMBER_CHAR_SIGN = 1;
const NUMBER_CHAR_DIGIT = 2;
const NUMBER_CHAR_DECIMAL = 3;
const NUMBER_CHAR_FRACTION_DIGIT = 4;
const NUMBER_CHAR_EXP_E = 5;
const NUMBER_CHAR_EXP_SIGN = 6;
const NUMBER_CHAR_EXP_DIGIT = 7;
const MIN_VALUE = -9223372036854775808;
const MIN_INCOMPLETE_INTEGER = MIN_VALUE / 10;
export class JsonReader {
    private reader: StringReader;
    private lenient: boolean = false;
    private buffer: Array<string> = new Array(1024);
    private pos: number = 0;
    private limit: number = 0;
    private lineNumber: number = 0;
    private lineStart: number = 0;
    private peeked: number = PEEKED_NONE;
    private peekedLong: number;
    private peekedNumberLength: number;
    private peekedString: string;
    private stack: Array<number> = new Array(32);
    private stackSize = 0;
    private pathNames: Array<string> = new Array(32);
    private pathIndices: Array<number> = new Array(32);
    constructor(reader: StringReader) {
        if (reader === null || reader === undefined) {
            throw new Error('reader == null');
        }
        this.buffer[1023] = undefined;
        this.reader = reader;
        this.stack.push(EMPTY_DOCUMENT);
        this.stackSize++;
    }
    public setLenient(lenient: boolean): void {
        this.lenient = lenient;
    }
    public isLenient(): boolean {
        return this.lenient;
    }
    public beginArray(): void {
        let p = this.peeked;
        if (p === PEEKED_NONE) {
            p = this.doPeek();
        }
        if (p === PEEKED_BEGIN_ARRAY) {
            this.push(EMPTY_ARRAY);
            this.pathIndices[this.stackSize - 1] = 0;
            this.peeked = PEEKED_NONE;
        }
        else {
            throw new Error("Expected BEGIN_ARRAY but was " + this.peek() + this.locationString());
        }
    }
    public endArray(): void {
        let p = this.peeked;
        if (p === PEEKED_NONE) {
            p = this.doPeek();
        }
        if (p === PEEKED_END_ARRAY) {
            this.stackSize--;
            this.peeked = PEEKED_NONE;
        }
        else {
            throw new Error("Expected END_ARRAY but was " + this.peek() + this.locationString());
        }
    }
    public beginObject(): void {
        let p = this.peeked;
        if (p === PEEKED_NONE) {
            p = this.doPeek();
        }
        if (p === PEEKED_BEGIN_OBJECT) {
            this.push(EMPTY_OBJECT);
            this.peeked = PEEKED_NONE;
        }
        else {
            throw new Error("Expected BEGIN_OBJECT but was " + this.peek() + this.locationString());
        }
    }
    public endObject(): void {
        let p = this.peeked;
        if (p === PEEKED_NONE) {
            p = this.doPeek();
        }
        if (p === PEEKED_END_OBJECT) {
            this.stackSize--;
            this.peeked = PEEKED_NONE;
        }
        else {
            throw new Error("Expected END_OBJECT but was " + this.peek() + this.locationString());
        }
    }
    public hasNext(): boolean {
        let p = this.peeked;
        if (p === PEEKED_NONE) {
            p = this.doPeek();
        }
        return p !== PEEKED_END_OBJECT && p !== PEEKED_END_ARRAY;
    }
    public peek(): JsonToken {
        let p = this.peeked;
        if (p === PEEKED_NONE) {
            p = this.doPeek();
        }
        switch (p) {
            case PEEKED_BEGIN_OBJECT:
                return JsonToken.BEGIN_OBJECT;
            case PEEKED_END_OBJECT:
                return JsonToken.END_OBJECT;
            case PEEKED_BEGIN_ARRAY:
                return JsonToken.BEGIN_ARRAY;
            case PEEKED_END_ARRAY:
                return JsonToken.END_ARRAY;
            case PEEKED_SINGLE_QUOTED_NAME:
            case PEEKED_DOUBLE_QUOTED_NAME:
            case PEEKED_UNQUOTED_NAME:
                return JsonToken.NAME;
            case PEEKED_TRUE:
            case PEEKED_FALSE:
                return JsonToken.BOOLEAN;
            case PEEKED_NULL:
                return JsonToken.NULL;
            case PEEKED_SINGLE_QUOTED:
            case PEEKED_DOUBLE_QUOTED:
            case PEEKED_UNQUOTED:
            case PEEKED_BUFFERED:
                return JsonToken.STRING;
            case PEEKED_LONG:
            case PEEKED_NUMBER:
                return JsonToken.NUMBER;
            case PEEKED_EOF:
                return JsonToken.END_DOCUMENT;
            default:
                throw new Error('AssertionError');
        }
    }
    private doPeek(): number {
        let peekStack = this.stack[this.stackSize - 1];
        if (peekStack === EMPTY_ARRAY) {
            this.stack[this.stackSize - 1] = NONEMPTY_ARRAY;
        }
        else if (peekStack === NONEMPTY_ARRAY) {
            let c = this.nextNonWhitespace(true);
            switch (c) {
                case ']':
                    return this.peeked = PEEKED_END_ARRAY;
                case ';':
                    this.checkLenient(); // fall-through
                case ',':
                    break;
                default:
                    throw new Error("Unterminated array");
            }
        }
        else if (peekStack === EMPTY_OBJECT || peekStack === NONEMPTY_OBJECT) {
            this.stack[this.stackSize - 1] = DANGLING_NAME;
            if (peekStack === NONEMPTY_OBJECT) {
                let c = this.nextNonWhitespace(true);
                switch (c) {
                    case '}':
                        return this.peeked = PEEKED_END_OBJECT;
                    case ';':
                        this.checkLenient(); // fall-through
                    case ',':
                        break;
                    default:
                        throw new Error("Unterminated object");
                }
            }
            let c = this.nextNonWhitespace(true);
            switch (c) {
                case '"':
                    return this.peeked = PEEKED_DOUBLE_QUOTED_NAME;
                case '\'':
                    this.checkLenient();
                    return this.peeked = PEEKED_SINGLE_QUOTED_NAME;
                case '}':
                    if (peekStack !== NONEMPTY_OBJECT) {
                        return this.peeked = PEEKED_END_OBJECT;
                    }
                    else {
                        throw new Error("Expected name");
                    }
                default:
                    this.checkLenient();
                    this.pos--; // Don't consume the first character in an unquoted string.
                    if (this.isLiteral(c)) {
                        return this.peeked = PEEKED_UNQUOTED_NAME;
                    }
                    else {
                        throw new Error("Expected name");
                    }
            }
        }
        else if (peekStack === DANGLING_NAME) {
            this.stack[this.stackSize - 1] = NONEMPTY_OBJECT;
            let c = this.nextNonWhitespace(true);
            switch (c) {
                case ':':
                    break;
                case '=':
                    this.checkLenient();
                    if ((this.pos < this.limit || this.fillBuffer(1)) && this.buffer[this.pos] === '>') {
                        this.pos++;
                    }
                    break;
                default:
                    throw new Error("Expected ':'");
            }
        }
        else if (peekStack === EMPTY_DOCUMENT) {
            if (this.lenient) {
                this.consumeNonExecutePrefix();
            }
            this.stack[this.stackSize - 1] = NONEMPTY_DOCUMENT;
        }
        else if (peekStack === NONEMPTY_DOCUMENT) {
            let c = this.nextNonWhitespace(false);
            if (c === null) {
                return this.peeked = PEEKED_EOF;
            }
            else {
                this.checkLenient();
                this.pos--;
            }
        }
        else if (peekStack === CLOSED) {
            throw new Error("JsonReader is closed");
        }
        let c = this.nextNonWhitespace(true);
        switch (c) {
            case ']':
                if (peekStack === EMPTY_ARRAY) {
                    return this.peeked = PEEKED_END_ARRAY;
                }
            // fall-through to handle ",]"
            case ';':
            case ',':
                // In lenient mode, a 0-length literal in an array means 'null'.
                if (peekStack === EMPTY_ARRAY || peekStack === NONEMPTY_ARRAY) {
                    this.checkLenient();
                    this.pos--;
                    return this.peeked = PEEKED_NULL;
                }
                else {
                    throw new Error("Unexpected value");
                }
            case '\'':
                this.checkLenient();
                return this.peeked = PEEKED_SINGLE_QUOTED;
            case '"':
                return this.peeked = PEEKED_DOUBLE_QUOTED;
            case '[':
                return this.peeked = PEEKED_BEGIN_ARRAY;
            case '{':
                return this.peeked = PEEKED_BEGIN_OBJECT;
            default:
                this.pos--; // Don't consume the first character in a literal value.
        }
        let result = this.peekKeyword();
        if (result !== PEEKED_NONE) {
            return result;
        }
        result = this.peekNumber();
        if (result !== PEEKED_NONE) {
            return result;
        }
        if (!this.isLiteral(this.buffer[this.pos])) {
            throw new Error("Expected value");
        }
        this.checkLenient();
        return this.peeked = PEEKED_UNQUOTED;
    }
    private peekKeyword(): number {
        let c = this.buffer[this.pos];
        let keyword: string;
        let keywordUpper: string;
        let peeking: number;
        if (c === 't' || c === 'T') {
            keyword = "true";
            keywordUpper = "TRUE";
            peeking = PEEKED_TRUE;
        }
        else if (c === 'f' || c === 'F') {
            keyword = "false";
            keywordUpper = "FALSE";
            peeking = PEEKED_FALSE;
        }
        else if (c === 'n' || c === 'N') {
            keyword = "null";
            keywordUpper = "NULL";
            peeking = PEEKED_NULL;
        }
        else {
            return PEEKED_NONE;
        }
        let length = keyword.length;
        for (let i = 1; i < length; i++) {
            if (this.pos + i >= this.limit && !this.fillBuffer(i + 1)) {
                return PEEKED_NONE;
            }
            c = this.buffer[this.pos + i];
            if (c !== keyword[i] && c !== keywordUpper[i]) {
                return PEEKED_NONE;
            }
        }
        if ((this.pos + length < this.limit || this.fillBuffer(length + 1))
            && this.isLiteral(this.buffer[this.pos + length])) {
            return PEEKED_NONE; // Don't match trues, falsey or nullsoft!
        }
        // We've found the keyword followed either by EOF or by a non-literal character.
        this.pos += length;
        return this.peeked = peeking;
    }
    public peekNumber(): number {
        let p = this.pos;
        let l = this.limit;
        let value = 0; // Negative to accommodate Long.MIN_VALUE more easily.
        let negative = false;
        let fitsInLong = true;
        let last = NUMBER_CHAR_NONE;
        let i = 0;
        charactersOfNumber: for (; true; i++) {
            if (p + i === l) {
                if (i === this.buffer.length) {
                    // Though this looks like a well-formed number, it's too long to continue reading. Give up
                    // and let the application handle this as an unquoted literal.
                    return PEEKED_NONE;
                }
                if (!this.fillBuffer(i + 1)) {
                    break;
                }
                p = this.pos;
                l = this.limit;
            }
            let c = this.buffer[p + i];
            switch (c) {
                case '-':
                    if (last === NUMBER_CHAR_NONE) {
                        negative = true;
                        last = NUMBER_CHAR_SIGN;
                        continue;
                    }
                    else if (last === NUMBER_CHAR_EXP_E) {
                        last = NUMBER_CHAR_EXP_SIGN;
                        continue;
                    }
                    return PEEKED_NONE;
                case '+':
                    if (last === NUMBER_CHAR_EXP_E) {
                        last = NUMBER_CHAR_EXP_SIGN;
                        continue;
                    }
                    return PEEKED_NONE;
                case 'e':
                case 'E':
                    if (last === NUMBER_CHAR_DIGIT || last === NUMBER_CHAR_FRACTION_DIGIT) {
                        last = NUMBER_CHAR_EXP_E;
                        continue;
                    }
                    return PEEKED_NONE;
                case '.':
                    if (last === NUMBER_CHAR_DIGIT) {
                        last = NUMBER_CHAR_DECIMAL;
                        continue;
                    }
                    return PEEKED_NONE;
                default:
                    if (!isOneNum(c)) {
                        if (!this.isLiteral(c)) {
                            break charactersOfNumber;
                        }
                        return PEEKED_NONE;
                    }
                    if (last === NUMBER_CHAR_SIGN || last === NUMBER_CHAR_NONE) {
                        value = -(parseInt(c) - parseInt('0'));
                        last = NUMBER_CHAR_DIGIT;
                    }
                    else if (last === NUMBER_CHAR_DIGIT) {
                        if (value === 0) {
                            return PEEKED_NONE; // Leading '0' prefix is not allowed (since it could be octal).
                        }
                        let newValue = value * 10 - (parseInt(c) - parseInt('0'));
                        fitsInLong = (1 & value) > MIN_INCOMPLETE_INTEGER
                            || (value === MIN_INCOMPLETE_INTEGER && newValue < value);
                        value = newValue;
                    }
                    else if (last === NUMBER_CHAR_DECIMAL) {
                        last = NUMBER_CHAR_FRACTION_DIGIT;
                    }
                    else if (last === NUMBER_CHAR_EXP_E || last === NUMBER_CHAR_EXP_SIGN) {
                        last = NUMBER_CHAR_EXP_DIGIT;
                    }
            }
        }
        // We've read a complete number. Decide if it's a PEEKED_LONG or a PEEKED_NUMBER.
        if (last === NUMBER_CHAR_DIGIT && fitsInLong && (value !== MIN_VALUE || negative) && (value != 0 || false == negative)) {
            this.peekedLong = negative ? value : -value;
            this.pos += i;
            return this.peeked = PEEKED_LONG;
        }
        else if (last === NUMBER_CHAR_DIGIT || last === NUMBER_CHAR_FRACTION_DIGIT
            || last === NUMBER_CHAR_EXP_DIGIT) {
            this.peekedNumberLength = i;
            return this.peeked = PEEKED_NUMBER;
        }
        else {
            return PEEKED_NONE;
        }
    }
    private isLiteral(c: string) {
        switch (c) {
            case '/':
            case '\\':
            case ';':
            case '#':
            case '=':
                this.checkLenient(); // fall-through
            case '{':
            case '}':
            case '[':
            case ']':
            case ':':
            case ',':
            case ' ':
            case '\t':
            case '\f':
            case '\r':
            case '\n':
                return false;
            default:
                return true;
        }
    }
    public nextName(): string {
        let p = this.peeked;
        if (p === PEEKED_NONE) {
            p = this.doPeek();
        }
        let result: string;
        if (p === PEEKED_UNQUOTED_NAME) {
            result = this.nextUnquotedValue();
        }
        else if (p === PEEKED_SINGLE_QUOTED_NAME) {
            result = this.nextQuotedValue('\'');
        }
        else if (p === PEEKED_DOUBLE_QUOTED_NAME) {
            result = this.nextQuotedValue('"');
        }
        else {
            throw new Error("Expected a name but was " + this.peek() + this.locationString());
        }
        this.peeked = PEEKED_NONE;
        this.pathNames[this.stackSize - 1] = result;
        return result;
    }
    public nextString(): string {
        let p = this.peeked;
        if (p === PEEKED_NONE) {
            p = this.doPeek();
        }
        let result;
        if (p === PEEKED_UNQUOTED) {
            result = this.nextUnquotedValue();
        }
        else if (p === PEEKED_SINGLE_QUOTED) {
            result = this.nextQuotedValue('\'');
        }
        else if (p === PEEKED_DOUBLE_QUOTED) {
            result = this.nextQuotedValue('"');
        }
        else if (p === PEEKED_BUFFERED) {
            result = this.peekedString;
            this.peekedString = null;
        }
        else if (p === PEEKED_LONG) {
            result = this.peekedLong.toString();
        }
        else if (p === PEEKED_NUMBER) {
            result = getString(this.buffer, this.pos, this.peekedNumberLength);
            this.pos += this.peekedNumberLength;
        }
        else {
            throw new Error("Expected a string but was " + this.peek() + this.locationString());
        }
        this.peeked = PEEKED_NONE;
        this.pathIndices[this.stackSize - 1]++;
        return result;
    }
    public nextBoolean(): boolean {
        let p = this.peeked;
        if (p === PEEKED_NONE) {
            p = this.doPeek();
        }
        if (p === PEEKED_TRUE) {
            this.peeked = PEEKED_NONE;
            this.pathIndices[this.stackSize - 1]++;
            return true;
        }
        else if (p === PEEKED_FALSE) {
            this.peeked = PEEKED_NONE;
            this.pathIndices[this.stackSize - 1]++;
            return false;
        }
        throw new Error("Expected a boolean but was " + this.peek() + this.locationString());
    }
    public nextNull(): void {
        let p = this.peeked;
        if (p === PEEKED_NONE) {
            p = this.doPeek();
        }
        if (p === PEEKED_NULL) {
            this.peeked = PEEKED_NONE;
            this.pathIndices[this.stackSize - 1]++;
        }
        else {
            throw new Error("Expected null but was " + this.peek() + this.locationString());
        }
    }
    public nextNumber(): number {
        let p = this.peeked;
        if (p === PEEKED_NONE) {
            p = this.doPeek();
        }
        if (p === PEEKED_LONG) {
            this.peeked = PEEKED_NONE;
            this.pathIndices[this.stackSize - 1]++;
            return this.peekedLong;
        }
        if (p === PEEKED_NUMBER) {
            this.peekedString = getString(this.buffer, this.pos, this.peekedNumberLength);
            this.pos += this.peekedNumberLength;
        }
        else if (p === PEEKED_SINGLE_QUOTED || p === PEEKED_DOUBLE_QUOTED) {
            this.peekedString = this.nextQuotedValue(p === PEEKED_SINGLE_QUOTED ? '\'' : '"');
        }
        else if (p === PEEKED_UNQUOTED) {
            this.peekedString = this.nextUnquotedValue();
        }
        else if (p !== PEEKED_BUFFERED) {
            throw new Error("Expected a double but was " + this.peek() + this.locationString());
        }
        this.peeked = PEEKED_BUFFERED;
        let result = Number.parseFloat(this.peekedString); // don't catch this NumberFormatException.
        if (!this.lenient && (Number.isNaN(result) || Number.isFinite(result))) {
            throw new Error("JSON forbids NaN and infinities: " + result + this.locationString());
        }
        this.peekedString = null;
        this.peeked = PEEKED_NONE;
        this.pathIndices[this.stackSize - 1]++;
        return result;
    }
    private nextQuotedValue(quote: string) {
        let builder: StringBuilder = null;
        while (true) {
            let p = this.pos;
            let l = this.limit;
            /* the index of the first character not yet appended to the builder. */
            let start = p;
            while (p < l) {
                let c = this.buffer[p++];
                if (c === quote) {
                    this.pos = p;
                    let len = p - start - 1;
                    if (builder === null) {
                        return getString(this.buffer, start, len);
                    }
                    else {
                        builder.append(getString(this.buffer, start, len));
                        return builder.toString();
                    }
                }
                else if (c === '\\') {
                    this.pos = p;
                    let len = p - start - 1;
                    if (builder === null) {
                        builder = new StringBuilder();
                    }
                    builder.append(getString(this.buffer, start, len));
                    builder.append(this.readEscapeCharacter());
                    p = this.pos;
                    l = this.limit;
                    start = p;
                }
                else if (c === '\n') {
                    this.lineNumber++;
                    this.lineStart = p;
                }
            }
            if (builder === null) {
                builder = new StringBuilder();
            }
            builder.append(getString(this.buffer, start, p - start));
            this.pos = p;
            if (!this.fillBuffer(1)) {
                throw new Error("Unterminated string");
            }
        }
    }
    private nextUnquotedValue(): string {
        let builder: StringBuilder = null;
        let i = 0;
        findNonLiteralCharacter: while (true) {
            for (; this.pos + i < this.limit; i++) {
                switch (this.buffer[this.pos + i]) {
                    case '/':
                    case '\\':
                    case ';':
                    case '#':
                    case '=':
                        this.checkLenient(); // fall-through
                    case '{':
                    case '}':
                    case '[':
                    case ']':
                    case ':':
                    case ',':
                    case ' ':
                    case '\t':
                    case '\f':
                    case '\r':
                    case '\n':
                        break findNonLiteralCharacter;
                }
            }
            // Attempt to load the entire literal into the buffer at once.
            if (i < this.buffer.length) {
                if (this.fillBuffer(i + 1)) {
                    continue;
                }
                else {
                    break;
                }
            }
            // use a StringBuilder when the value is too long. This is too long to be a number!
            if (builder === null) {
                builder = new StringBuilder();
            }
            builder.append(getString(this.buffer, this.pos, i));
            this.pos += i;
            i = 0;
            if (!this.fillBuffer(1)) {
                break;
            }
        }
        let result = (null === builder) ? getString(this.buffer, this.pos, i) : builder.append(getString(this.buffer, this.pos, i))
            .toString();
        this.pos += i;
        return result;
    }
    public close(): void {
        this.peeked = PEEKED_NONE;
        this.stack = [CLOSED];
        this.stackSize = 1;
        this.reader.close();
    }
    public skipValue(): void {
        let count = 0;
        do {
            let p = this.peeked;
            if (p === PEEKED_NONE) {
                p = this.doPeek();
            }
            if (p === PEEKED_BEGIN_ARRAY) {
                this.push(EMPTY_ARRAY);
                count++;
            }
            else if (p === PEEKED_BEGIN_OBJECT) {
                this.push(EMPTY_OBJECT);
                count++;
            }
            else if (p === PEEKED_END_ARRAY) {
                this.stackSize--;
                count--;
            }
            else if (p === PEEKED_END_OBJECT) {
                this.stackSize--;
                count--;
            }
            else if (p === PEEKED_UNQUOTED_NAME || p === PEEKED_UNQUOTED) {
                this.skipUnquotedValue();
            }
            else if (p === PEEKED_SINGLE_QUOTED || p === PEEKED_SINGLE_QUOTED_NAME) {
                this.skipQuotedValue('\'');
            }
            else if (p === PEEKED_DOUBLE_QUOTED || p === PEEKED_DOUBLE_QUOTED_NAME) {
                this.skipQuotedValue('"');
            }
            else if (p === PEEKED_NUMBER) {
                this.pos += this.peekedNumberLength;
            }
            this.peeked = PEEKED_NONE;
        } while (count !== 0);
        this.pathIndices[this.stackSize - 1]++;
        this.pathNames[this.stackSize - 1] = "null";
    }
    private skipQuotedValue(quote: string) {
        do {
            let p = this.pos;
            let l = this.limit;
            /* the index of the first character not yet appended to the builder. */
            while (p < l) {
                let c = this.buffer[p++];
                if (c === quote) {
                    this.pos = p;
                    return;
                }
                else if (c === '\\') {
                    this.pos = p;
                    this.readEscapeCharacter();
                    p = this.pos;
                    l = this.limit;
                }
                else if (c === '\n') {
                    this.lineNumber++;
                    this.lineStart = p;
                }
            }
            this.pos = p;
        } while (this.fillBuffer(1));
        throw new Error("Unterminated string");
    }
    private skipUnquotedValue() {
        do {
            let i = 0;
            for (; this.pos + i < this.limit; i++) {
                switch (this.buffer[this.pos + i]) {
                    case '/':
                    case '\\':
                    case ';':
                    case '#':
                    case '=':
                        this.checkLenient(); // fall-through
                    case '{':
                    case '}':
                    case '[':
                    case ']':
                    case ':':
                    case ',':
                    case ' ':
                    case '\t':
                    case '\f':
                    case '\r':
                    case '\n':
                        this.pos += i;
                        return;
                }
            }
            this.pos += i;
        } while (this.fillBuffer(1));
    }
    private push(newTop: number): void {
        if (this.stackSize === this.stack.length) {
            this.stack = this.stack.concat(new Array(this.stackSize));
            this.pathIndices = this.pathIndices.concat(new Array(this.stackSize));
            this.pathNames = this.pathNames.concat(new Array(this.stackSize));
        }
        this.stack[this.stackSize++] = newTop;
    }
    private checkLenient(): void {
        if (!this.lenient) {
            throw new Error("Use JsonReader.setLenient(true) to accept malformed JSON");
        }
    }
    private skipToEndOfLine() {
        while (this.pos < this.limit || this.fillBuffer(1)) {
            let c = this.buffer[this.pos++];
            if (c === '\n') {
                this.lineNumber++;
                this.lineStart = this.pos;
                break;
            }
            else if (c === '\r') {
                break;
            }
        }
    }
    private fillBufferOld(minimum: number): boolean {
        this.lineStart -= this.pos;
        if (this.limit !== this.pos) {
            this.limit -= this.pos;
            arrayCopy(this.buffer, this.pos, this.buffer, 0, this.limit);
        }
        else {
            this.limit = 0;
        }
        this.pos = 0;
        let total = 0;
        while ((total = this.reader.readBuffer(this.buffer, this.limit, this.buffer.length - this.limit)) !== -1) {
            this.limit += total;
            // if this is the first read, consume an optional byte order mark (BOM) if it exists
            if (this.lineNumber === 0 && this.lineStart === 0 && this.limit > 0 && this.buffer[0] === '\ufeff') {
                this.pos++;
                this.lineStart++;
                minimum++;
            }
            if (this.limit >= minimum) {
                return true;
            }
        }
        return false;
    }
    private fillBuffer(minimum: number): boolean {
        this.lineStart -= this.pos;
        if (this.limit !== this.pos) {
            this.limit -= this.pos;
            arrayCopy(this.buffer, this.pos, this.buffer, 0, this.limit);
        }
        else {
            this.limit = 0;
        }
        this.pos = 0;
        let option: StringReaderOption;
        while ((option = this.reader.readBufferOption(this.buffer, this.limit, this.buffer.length - this.limit)).n !== -1) {
            this.buffer = option.buffer;
            this.limit += option.n;
            // if this is the first read, consume an optional byte order mark (BOM) if it exists
            if (this.lineNumber === 0 && this.lineStart === 0 && this.limit > 0 && this.buffer[0] === '\ufeff') {
                this.pos++;
                this.lineStart++;
                minimum++;
            }
            if (this.limit >= minimum) {
                return true;
            }
        }
        return false;
    }
    private nextNonWhitespace(throwOnEof: boolean): string {
        let p = this.pos;
        let l = this.limit;
        while (true) {
            if (p === l) {
                this.pos = p;
                if (!this.fillBuffer(1)) {
                    break;
                }
                p = this.pos;
                l = this.limit;
            }
            let c: string = this.buffer[p++];
            if (c === '\n') {
                this.lineNumber++;
                this.lineStart = p;
                continue;
            }
            else if (c === ' ' || c === '\r' || c === '\t') {
                continue;
            }
            if (c === '/') {
                this.pos = p;
                if (p === l) {
                    this.pos--; // push back '/' so it's still in the this.buffer when this method returns
                    let charsLoaded = this.fillBuffer(2);
                    this.pos++; // consume the '/' again
                    if (!charsLoaded) {
                        return c;
                    }
                }
                this.checkLenient();
                let peek = this.buffer[this.pos];
                switch (peek) {
                    case '*':
                        // skip a /* c-style comment */
                        this.pos++;
                        if (!this.skipTo("*/")) {
                            throw new Error("Unterminated comment");
                        }
                        p = this.pos + 2;
                        l = this.limit;
                        continue;
                    case '/':
                        // skip a // end-of-line comment
                        this.pos++;
                        this.skipToEndOfLine();
                        p = this.pos;
                        l = this.limit;
                        continue;
                    default:
                        return c;
                }
            }
            else if (c === '#') {
                this.pos = p;
                /*
                 * Skip a # hash end-of-line comment. The JSON RFC doesn't
                 * specify this behaviour, but it's required to parse
                 * existing documents. See http://b/2571423.
                 */
                this.checkLenient();
                this.skipToEndOfLine();
                p = this.pos;
                l = this.limit;
            }
            else {
                this.pos = p;
                return c;
            }
        }
        if (throwOnEof) {
            throw new Error("End of input " + this.locationString());
        }
        else {
            return null;
        }
    }
    private skipTo(toFind: string): boolean {
        let length = toFind.length;
        outer: for (; this.pos + length <= this.limit || this.fillBuffer(length); this.pos++) {
            if (this.buffer[this.pos] === '\n') {
                this.lineNumber++;
                this.lineStart = this.pos + 1;
                continue;
            }
            for (let c = 0; c < length; c++) {
                if (this.buffer[this.pos + c] !== toFind[c]) {
                    continue outer;
                }
            }
            return true;
        }
        return false;
    }
    private readEscapeCharacter(): string {
        if (this.pos === this.limit && !this.fillBuffer(1)) {
            throw new Error("Unterminated escape sequence");
        }
        let escaped = this.buffer[this.pos++];
        switch (escaped) {
            case 'u':
                if (this.pos + 4 > this.limit && !this.fillBuffer(4)) {
                    throw new Error("Unterminated escape sequence");
                }
                // Equivalent to Integer.parseInt(stringPool.get(buffer, pos, 4), 16);
                let result = getString(this.buffer, this.pos, 4);
                let code = parseInt(result, 16);
                this.pos += 4;
                if (isNaN(code)) {
                    return '\\u' + result;
                }
                result = String.fromCharCode(code);
                return result;
            case 't':
                return '\t';
            case 'b':
                return '\b';
            case 'n':
                return '\n';
            case 'r':
                return '\r';
            case 'f':
                return '\f';
            case '\n':
                this.lineNumber++;
                this.lineStart = this.pos;
            // fall-through
            case '\'':
            case '"':
            case '\\':
            case '/':
                return escaped;
            default:
                // throw error when none of the above cases are matched
                throw new Error("Invalid escape sequence");
        }
    }
    private locationString(): string {
        let line = this.lineNumber + 1;
        let column = this.pos - this.lineStart + 1;
        return " at line " + line + " column " + column + " path " + this.getPath();
    }
    public getPath(): string {
        let result = new StringBuilder('$');
        for (let i = 0, size = this.stackSize; i < size; i++) {
            switch (this.stack[i]) {
                case EMPTY_ARRAY:
                case NONEMPTY_ARRAY:
                    result.append('[').append(this.pathIndices[i]).append(']');
                    break;
                case EMPTY_OBJECT:
                case DANGLING_NAME:
                case NONEMPTY_OBJECT:
                    result.append('.');
                    if (this.pathNames[i] !== null && this.pathNames[i] !== undefined) {
                        result.append(this.pathNames[i]);
                    }
                    break;
                case NONEMPTY_DOCUMENT:
                case EMPTY_DOCUMENT:
                case CLOSED:
                    break;
            }
        }
        return result.toString();
    }
    private consumeNonExecutePrefix(): void {
        this.nextNonWhitespace(true);
        this.pos--;
        let p = this.pos;
        if (p + 5 > this.limit && !this.fillBuffer(5)) {
            return;
        }
        let buf = this.buffer;
        if (buf[p] !== ')' || buf[p + 1] !== ']' || buf[p + 2] !== '}' || buf[p + 3] !== '\'' || buf[p + 4] !== '\n') {
            return; // not a security token!
        }
        // we consumed a security token!
        this.pos += 5;
    }
}
