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
import EncoderContext from './EncoderContext';
import C40Encoder from './C40Encoder';
import HighLevelEncoder from './HighLevelEncoder';
import { char, int } from '../../../customTypings';
import StringBuilder from '../../util/StringBuilder';
import StringUtils from '../../common/StringUtils';
/*final*/
export default class X12Encoder extends C40Encoder {
    // @Override
    public getEncodingMode(): int {
        return HighLevelEncoder.X12_ENCODATION;
    }
    // @Override
    public encode(context: EncoderContext): void {
        // step C
        let buffer: StringBuilder = new StringBuilder();
        while (context.hasMoreCharacters()) {
            let c: char = context.getCurrentChar();
            context.pos++;
            this.encodeChar(c, buffer);
            let count: int = buffer.length();
            if ((count % 3) === 0) {
                C40Encoder.writeNextTriplet(context, buffer);
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
    // @Override
    encodeChar(c: char, sb: StringBuilder): int {
        switch (c) {
            case StringUtils.getCharCode('\r'):
                sb.append('\u0000');
                break;
            case StringUtils.getCharCode('*'):
                sb.append('\u0001');
                break;
            case StringUtils.getCharCode('>'):
                sb.append('\u0002');
                break;
            case StringUtils.getCharCode(' '):
                sb.append('\u0003');
                break;
            default:
                if (c >= StringUtils.getCharCode('0') && c <= StringUtils.getCharCode('9')) {
                    sb.append(/*(char)*/ (c - 48 + 4));
                }
                else if (c >= StringUtils.getCharCode('A') && c <= StringUtils.getCharCode('Z')) {
                    sb.append(/*(char)*/ (c - 65 + 14));
                }
                else {
                    HighLevelEncoder.illegalCharacter(c);
                }
                break;
        }
        return 1;
    }
    // @Override
    handleEOD(context: EncoderContext, buffer: StringBuilder): void {
        context.updateSymbolInfoNoArgs();
        let available: int = context.getSymbolInfo().getDataCapacity() - context.getCodewordCount();
        let count: int = buffer.length();
        context.pos -= count;
        if (context.getRemainingCharacters() > 1 || available > 1 ||
            context.getRemainingCharacters() !== available) {
            context.writeCodeword(HighLevelEncoder.X12_UNLATCH);
        }
        if (context.getNewEncoding() < 0) {
            context.signalEncoderChange(HighLevelEncoder.ASCII_ENCODATION);
        }
    }
}
