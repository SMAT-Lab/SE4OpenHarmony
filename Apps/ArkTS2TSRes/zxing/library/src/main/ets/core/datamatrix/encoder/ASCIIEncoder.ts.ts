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
import Encoder from './Encoder';
import { int, char } from '../../../customTypings';
import HighLevelEncoder from './HighLevelEncoder';
import IllegalArgumentException from '../../IllegalArgumentException';
import IllegalStateException from '../../IllegalStateException';
import EncoderContext from './EncoderContext';
import StringUtils from '../../common/StringUtils';
export default class ASCIIEncoder implements Encoder {
    // @Override
    public getEncodingMode(): int {
        return HighLevelEncoder.ASCII_ENCODATION;
    }
    // @Override
    public encode(context: EncoderContext): void {
        // step B
        let n: int = HighLevelEncoder.determineConsecutiveDigitCount(context.getMessage(), context.pos);
        if (n >= 2) {
            context.writeCodeword(ASCIIEncoder.encodeASCIIDigits(StringUtils.getCharCode(context.getMessage().charAt(context.pos)), StringUtils.getCharCode(context.getMessage().charAt(context.pos + 1))));
            context.pos += 2;
        }
        else {
            let c: char = context.getCurrentChar();
            let newMode: int = HighLevelEncoder.lookAheadTest(context.getMessage(), context.pos, this.getEncodingMode());
            if (newMode !== this.getEncodingMode()) {
                switch (newMode) {
                    case HighLevelEncoder.BASE256_ENCODATION:
                        context.writeCodeword(HighLevelEncoder.LATCH_TO_BASE256);
                        context.signalEncoderChange(HighLevelEncoder.BASE256_ENCODATION);
                        return;
                    case HighLevelEncoder.C40_ENCODATION:
                        context.writeCodeword(HighLevelEncoder.LATCH_TO_C40);
                        context.signalEncoderChange(HighLevelEncoder.C40_ENCODATION);
                        return;
                    case HighLevelEncoder.X12_ENCODATION:
                        context.writeCodeword(HighLevelEncoder.LATCH_TO_ANSIX12);
                        context.signalEncoderChange(HighLevelEncoder.X12_ENCODATION);
                        break;
                    case HighLevelEncoder.TEXT_ENCODATION:
                        context.writeCodeword(HighLevelEncoder.LATCH_TO_TEXT);
                        context.signalEncoderChange(HighLevelEncoder.TEXT_ENCODATION);
                        break;
                    case HighLevelEncoder.EDIFACT_ENCODATION:
                        context.writeCodeword(HighLevelEncoder.LATCH_TO_EDIFACT);
                        context.signalEncoderChange(HighLevelEncoder.EDIFACT_ENCODATION);
                        break;
                    default:
                        throw new IllegalStateException('Illegal mode: ' + newMode);
                }
            }
            else if (HighLevelEncoder.isExtendedASCII(c)) {
                context.writeCodeword(HighLevelEncoder.UPPER_SHIFT);
                context.writeCodeword(/*(char)*/ (c - 128 + 1));
                context.pos++;
            }
            else {
                context.writeCodeword(/*(char)*/ (c + 1));
                context.pos++;
            }
        }
    }
    private static encodeASCIIDigits(digit1: char, digit2: char): char {
        if (HighLevelEncoder.isDigit(digit1) && HighLevelEncoder.isDigit(digit2)) {
            let num: int = (digit1 - 48) * 10 + (digit2 - 48);
            return (num + 130);
        }
        throw new IllegalArgumentException('not digits: ' + digit1 + digit2);
    }
}
