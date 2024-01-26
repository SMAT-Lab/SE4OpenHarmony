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
// package com.google.zxing.datamatrix.encoder;
import Encoder from './Encoder';
import HighLevelEncoder from './HighLevelEncoder';
import { int, char } from '../../../customTypings';
import EncoderContext from './EncoderContext';
import IllegalStateException from '../../IllegalStateException';
import StringUtils from '../../common/StringUtils';
import StringBuilder from '../../util/StringBuilder';
export default class C40Encoder implements Encoder {
    // @Override
    public getEncodingMode(): int {
        return HighLevelEncoder.C40_ENCODATION;
    }
    // @Override
    public encode(context: EncoderContext): void {
        // step C
        let buffer: StringBuilder = new StringBuilder();
        while (context.hasMoreCharacters()) {
            let c: char = context.getCurrentChar();
            context.pos++;
            let lastCharSize: int = this.encodeChar(c, buffer);
            let unwritten: int = (Math.floor(buffer.length() / 3)) * 2;
            let curCodewordCount: int = context.getCodewordCount() + unwritten;
            context.updateSymbolInfo(curCodewordCount);
            let available: int = context.getSymbolInfo().getDataCapacity() - curCodewordCount;
            if (!context.hasMoreCharacters()) {
                // Avoid having a single C40 value in the last triplet
                let removed: StringBuilder = new StringBuilder();
                if ((buffer.length() % 3) === 2 && available !== 2) {
                    lastCharSize = this.backtrackOneCharacter(context, buffer, removed, lastCharSize);
                }
                while ((buffer.length() % 3) === 1 && (lastCharSize > 3 || available !== 1)) {
                    lastCharSize = this.backtrackOneCharacter(context, buffer, removed, lastCharSize);
                }
                break;
            }
            let count: int = buffer.length();
            if ((count % 3) === 0) {
                let newMode: int = HighLevelEncoder.lookAheadTest(context.getMessage(), context.pos, this.getEncodingMode());
                if (newMode !== this.getEncodingMode()) {
                    // Return to ASCII encodation, which will actually handle latch to new mode
                    context.signalEncoderChange(HighLevelEncoder.ASCII_ENCODATION);
                    break;
                }
            }
        }
        this.handleEOD(context, buffer);
    }
    private backtrackOneCharacter(context: EncoderContext, buffer: StringBuilder, removed: StringBuilder, lastCharSize: int): int {
        let count: int = buffer.length();
        buffer.delete(count - lastCharSize, count);
        context.pos--;
        let c: char = context.getCurrentChar();
        lastCharSize = this.encodeChar(c, removed);
        context.resetSymbolInfo(); // Deal with possible reduction in symbol size
        return lastCharSize;
    }
    static writeNextTriplet(context: EncoderContext, buffer: StringBuilder): void {
        context.writeCodewords(this.encodeToCodewords(buffer.toString()));
        buffer.delete(0, 3);
    }
    /**
     * Handle "end of data" situations
     *
     * @param context the encoder context
     * @param buffer  the buffer with the remaining encoded characters
     */
    handleEOD(context: EncoderContext, buffer: StringBuilder): void {
        let unwritten: int = (Math.floor(buffer.length() / 3)) * 2;
        let rest: int = buffer.length() % 3;
        let curCodewordCount: int = context.getCodewordCount() + unwritten;
        context.updateSymbolInfo(curCodewordCount);
        let available: int = context.getSymbolInfo().getDataCapacity() - curCodewordCount;
        if (rest === 2) {
            buffer.append('\0'); // Shift 1
            while (buffer.length() >= 3) {
                C40Encoder.writeNextTriplet(context, buffer);
            }
            if (context.hasMoreCharacters()) {
                context.writeCodeword(HighLevelEncoder.C40_UNLATCH);
            }
        }
        else if (available === 1 && rest === 1) {
            while (buffer.length() >= 3) {
                C40Encoder.writeNextTriplet(context, buffer);
            }
            if (context.hasMoreCharacters()) {
                context.writeCodeword(HighLevelEncoder.C40_UNLATCH);
            }
            // else no unlatch
            context.pos--;
        }
        else if (rest === 0) {
            while (buffer.length() >= 3) {
                C40Encoder.writeNextTriplet(context, buffer);
            }
            if (available > 0 || context.hasMoreCharacters()) {
                context.writeCodeword(HighLevelEncoder.C40_UNLATCH);
            }
        }
        else {
            throw new IllegalStateException('Unexpected case. Please report!');
        }
        context.signalEncoderChange(HighLevelEncoder.ASCII_ENCODATION);
    }
    encodeChar(c: char, sb: StringBuilder): int {
        if (c === StringUtils.getCharCode(' ')) {
            sb.append('\u0003');
            return 1;
        }
        if (c >= StringUtils.getCharCode('0') && c <= StringUtils.getCharCode('9')) {
            sb.append(/*(char)*/ (c - 48 + 4));
            return 1;
        }
        if (c >= StringUtils.getCharCode('A') && c <= StringUtils.getCharCode('Z')) {
            sb.append(/*(char)*/ (c - 65 + 14));
            return 1;
        }
        if (c < StringUtils.getCharCode(' ')) {
            sb.append('\u0000'); // Shift 1 Set
            sb.append(c);
            return 2;
        }
        if (c <= StringUtils.getCharCode('/')) {
            sb.append('\u0001'); // Shift 2 Set
            sb.append(/*(char)*/ (c - 33));
            return 2;
        }
        if (c <= StringUtils.getCharCode('@')) {
            sb.append('\u0001'); // Shift 2 Set
            sb.append(/*(char)*/ (c - 58 + 15));
            return 2;
        }
        if (c <= StringUtils.getCharCode('_')) {
            sb.append('\u0001'); // Shift 2 Set
            sb.append(/*(char)*/ (c - 91 + 22));
            return 2;
        }
        if (c <= 127) {
            sb.append('\u0002'); // Shift 3 Set
            sb.append(/*(char)*/ (c - 96));
            return 2;
        }
        sb.append('\u0001\u001e'); // Shift 2, Upper Shift
        let len: int = 2;
        len += this.encodeChar(/*(char)*/ (c - 128), sb);
        return len;
    }
    private static encodeToCodewords(sb: string): string {
        let v: int = (1600 * StringUtils.getCharCode(sb.charAt(0))) + (40 * StringUtils.getCharCode(sb.charAt(1))) + StringUtils.getCharCode(sb.charAt(2)) + 1;
        let cw1: char = /*(char)*/ (v / 256);
        let cw2: char = /*(char)*/ (v % 256);
        return StringUtils.valueOf(Int32Array.from([cw1, cw2]));
    }
}
