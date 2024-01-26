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
import HighLevelEncoder from './HighLevelEncoder';
import { int, char } from '../../../customTypings';
import EncoderContext from './EncoderContext';
import StringBuilder from '../../util/StringBuilder';
import IllegalStateException from '../../IllegalStateException';
import StringUtils from '../../common/StringUtils';
export default class Base256Encoder implements Encoder {
    // @Override
    public getEncodingMode(): int {
        return HighLevelEncoder.BASE256_ENCODATION;
    }
    // @Override
    public encode(context: EncoderContext): void {
        let buffer: StringBuilder = new StringBuilder();
        buffer.append('\0'); // Initialize length field
        while (context.hasMoreCharacters()) {
            let c: char = context.getCurrentChar();
            buffer.append(c);
            context.pos++;
            let newMode: int = HighLevelEncoder.lookAheadTest(context.getMessage(), context.pos, this.getEncodingMode());
            if (newMode !== this.getEncodingMode()) {
                // Return to ASCII encodation, which will actually handle latch to new mode
                context.signalEncoderChange(HighLevelEncoder.ASCII_ENCODATION);
                break;
            }
        }
        let dataCount: int = buffer.length() - 1;
        let lengthFieldSize: int = 1;
        let currentSize: int = context.getCodewordCount() + dataCount + lengthFieldSize;
        context.updateSymbolInfo(currentSize);
        let mustPad: boolean = (context.getSymbolInfo().getDataCapacity() - currentSize) > 0;
        if (context.hasMoreCharacters() || mustPad) {
            if (dataCount <= 249) {
                buffer.setCharAt(0, /*(char)*/ StringUtils.getCharAt(dataCount));
            }
            else if (dataCount <= 1555) {
                buffer.setCharAt(0, /*(char)*/ StringUtils.getCharAt((Math.floor((dataCount / 250)) + 249)));
                buffer.insert(1, /*(char)*/ StringUtils.getCharAt((dataCount % 250)));
            }
            else {
                throw new IllegalStateException('Message length not in valid ranges: ' + dataCount);
            }
        }
        for (let i: int = 0, c = buffer.length(); i < c; i++) {
            context.writeCodeword(Base256Encoder.randomize255State(StringUtils.getCharCode(buffer.charAt(i)), context.getCodewordCount() + 1));
        }
    }
    private static randomize255State(ch: char, codewordPosition: int): char {
        let pseudoRandom: int = ((149 * codewordPosition) % 255) + 1;
        let tempVariable: int = ch + pseudoRandom;
        if (tempVariable <= 255) {
            return /*(char) */ tempVariable;
        }
        else {
            return /*(char) */ (tempVariable - 256);
        }
    }
}
