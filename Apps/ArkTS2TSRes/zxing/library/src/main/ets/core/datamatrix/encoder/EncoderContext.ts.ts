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
//
// import com.google.zxing.Dimension;
//
// import java.nio.charset.StandardCharsets;
import { int, char } from '../../../customTypings';
import StringBuilder from '../../util/StringBuilder';
import IllegalArgumentException from '../../IllegalArgumentException';
import StringUtils from '../../common/StringUtils';
import Dimension from '../../Dimension';
import StandardCharsets from '../../util/StandardCharsets';
import SymbolInfo from './SymbolInfo';
import SymbolShapeHint from './SymbolShapeHint';
/*final*/
export default class EncoderContext {
    private msg: string;
    private shape: SymbolShapeHint;
    private minSize: Dimension;
    private maxSize: Dimension;
    private codewords: StringBuilder;
    pos: int = 0;
    private newEncoding: int = 0;
    private symbolInfo: SymbolInfo;
    private skipAtEnd: int = 0;
    constructor(msg: string) {
        // From this point on Strings are not Unicode anymore!
        let msgBinary: Uint8Array = StringUtils.getBytes(msg, StandardCharsets.ISO_8859_1);
        let sb: StringBuilder = new StringBuilder();
        for (let i: int = 0, c = msgBinary.length; i < c; i++) {
            let ch: char = /*(char)*/ (msgBinary[i] & 0xff);
            if (ch === StringUtils.getCharCode('?') && StringUtils.getCharCode(msg.charAt(i)) !== StringUtils.getCharCode('?')) {
                throw new IllegalArgumentException('Message contains characters outside ISO-8859-1 encoding.');
            }
            sb.append(ch);
        }
        this.msg = sb.toString(); // Not Unicode here!
        this.shape = SymbolShapeHint.FORCE_NONE;
        this.codewords = new StringBuilder();
        this.newEncoding = -1;
    }
    public setSymbolShape(shape: SymbolShapeHint): void {
        this.shape = shape;
    }
    public setSizeConstraints(minSize: Dimension, maxSize: Dimension): void {
        this.minSize = minSize;
        this.maxSize = maxSize;
    }
    public getMessage(): string {
        return this.msg;
    }
    public setSkipAtEnd(count: int): void {
        this.skipAtEnd = count;
    }
    public getCurrentChar(): char {
        return StringUtils.getCharCode(this.msg.charAt(this.pos));
    }
    public getCurrent(): char {
        return StringUtils.getCharCode(this.msg.charAt(this.pos));
    }
    public getCodewords(): StringBuilder {
        return this.codewords;
    }
    public writeCodewords(codewords: string): void {
        this.codewords.append(codewords);
    }
    public writeCodeword(codeword: char): void {
        this.codewords.append(codeword);
    }
    public getCodewordCount(): int {
        return this.codewords.length();
    }
    public getNewEncoding(): int {
        return this.newEncoding;
    }
    public signalEncoderChange(encoding: int): void {
        this.newEncoding = encoding;
    }
    public resetEncoderSignal(): void {
        this.newEncoding = -1;
    }
    public hasMoreCharacters(): boolean {
        return this.pos < this.getTotalMessageCharCount();
    }
    private getTotalMessageCharCount(): int {
        return this.msg.length - this.skipAtEnd;
    }
    public getRemainingCharacters(): int {
        return this.getTotalMessageCharCount() - this.pos;
    }
    public getSymbolInfo(): SymbolInfo {
        return this.symbolInfo;
    }
    public updateSymbolInfoNoArgs(): void {
        this.updateSymbolInfo(this.getCodewordCount());
    }
    public updateSymbolInfo(len: int): void {
        if (this.symbolInfo == null || len > this.symbolInfo.getDataCapacity()) {
            this.symbolInfo = SymbolInfo.lookup(len, this.shape, this.minSize, this.maxSize, true);
        }
    }
    public resetSymbolInfo(): void {
        this.symbolInfo = null;
    }
}
