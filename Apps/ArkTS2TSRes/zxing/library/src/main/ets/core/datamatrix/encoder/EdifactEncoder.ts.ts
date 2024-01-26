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
/*final*/
import EncoderContext from './EncoderContext';
import Encoder from './Encoder';
import HighLevelEncoder from './HighLevelEncoder';
import StringBuilder from '../../util/StringBuilder';
import { char, int } from '../../../customTypings';
import IllegalStateException from '../../IllegalStateException';
import StringUtils from '../../common/StringUtils';
export default class EdifactEncoder implements Encoder {
    // @Override
    public getEncodingMode(): int {
        return HighLevelEncoder.EDIFACT_ENCODATION;
    }
    // @Override
    public encode(context: EncoderContext): void {
        // step F
        let buffer: StringBuilder = new StringBuilder();
        while (context.hasMoreCharacters()) {
            let c: char = context.getCurrentChar();
            EdifactEncoder.encodeChar(c, buffer);
            context.pos++;
            let count: int = buffer.length();
            if (count >= 4) {
                context.writeCodewords(EdifactEncoder.encodeToCodewords(buffer.toString()));
                buffer.delete(0, 4);
                let newMode: int = HighLevelEncoder.lookAheadTest(context.getMessage(), context.pos, this.getEncodingMode());
                if (newMode !== this.getEncodingMode()) {
                    // Return to ASCII encodation, which will actually handle latch to new mode
                    context.signalEncoderChange(HighLevelEncoder.ASCII_ENCODATION);
                    break;
                }
            }
        }
        buffer.append(/*(char)*/ 31); // Unlatch
        EdifactEncoder.handleEOD(context, buffer.toString());
    }
    /**
     * Handle "end of data" situations
     *
     * @param context the encoder context
     * @param buffer  the buffer with the remaining encoded characters
     */
    private static handleEOD(context: EncoderContext, buffer: string): void {
        try {
            let count: int = buffer.length;
            if (count === 0) {
                return; // Already finished
            }
            if (count === 1) {
                // Only an unlatch at the end
                context.updateSymbolInfoNoArgs();
                let available: int = context.getSymbolInfo().getDataCapacity() - context.getCodewordCount();
                let remaining: int = context.getRemainingCharacters();
                // The following two lines are a hack inspired by the 'fix' from https://sourceforge.net/p/barcode4j/svn/221/
                if (remaining > available) {
                    context.updateSymbolInfo(context.getCodewordCount() + 1);
                    available = context.getSymbolInfo().getDataCapacity() - context.getCodewordCount();
                }
                if (remaining <= available && available <= 2) {
                    return; // No unlatch
                }
            }
            if (count > 4) {
                throw new IllegalStateException('Count must not exceed 4');
            }
            let restChars: int = count - 1;
            let encoded: string = this.encodeToCodewords(buffer);
            let endOfSymbolReached: boolean = !context.hasMoreCharacters();
            let restInAscii: boolean = endOfSymbolReached && restChars <= 2;
            if (restChars <= 2) {
                context.updateSymbolInfo(context.getCodewordCount() + restChars);
                let available: int = context.getSymbolInfo().getDataCapacity() - context.getCodewordCount();
                if (available >= 3) {
                    restInAscii = false;
                    context.updateSymbolInfo(context.getCodewordCount() + encoded.length);
                    // available = context.symbolInfo.dataCapacity - context.getCodewordCount();
                }
            }
            if (restInAscii) {
                context.resetSymbolInfo();
                context.pos -= restChars;
            }
            else {
                context.writeCodewords(encoded);
            }
        }
        finally {
            context.signalEncoderChange(HighLevelEncoder.ASCII_ENCODATION);
        }
    }
    private static encodeChar(c: char, sb: StringBuilder): void {
        if (c >= StringUtils.getCharCode(' ') && c <= StringUtils.getCharCode('?')) {
            sb.append(c);
        }
        else if (c >= StringUtils.getCharCode('@') && c <= StringUtils.getCharCode('^')) {
            sb.append(/*(char)*/ (c - 64));
        }
        else {
            HighLevelEncoder.illegalCharacter(c);
        }
    }
    private static encodeToCodewords(sb: string): string {
        let len: int = sb.length;
        if (len === 0) {
            throw new IllegalStateException('StringBuilder must not be empty');
        }
        let c1: char = StringUtils.getCharCode(sb.charAt(0));
        let c2: char = len >= 2 ? StringUtils.getCharCode(sb.charAt(1)) : 0;
        let c3: char = len >= 3 ? StringUtils.getCharCode(sb.charAt(2)) : 0;
        let c4: char = len >= 4 ? StringUtils.getCharCode(sb.charAt(3)) : 0;
        let v: int = (c1 << 18) + (c2 << 12) + (c3 << 6) + c4;
        let cw1: char = /*(char)*/ ((v >> 16) & 255);
        let cw2: char = /*(char)*/ ((v >> 8) & 255);
        let cw3: char = /*(char)*/ (v & 255);
        let res: StringBuilder = new StringBuilder();
        res.append(cw1);
        if (len >= 2) {
            res.append(cw2);
        }
        if (len >= 3) {
            res.append(cw3);
        }
        return res.toString();
    }
}
