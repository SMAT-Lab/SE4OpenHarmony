// @ts-nocheck
/**
 *  MIT License
 *
 *  Copyright (c) 2023 Huawei Device Co., Ltd.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */
import { ID3v2Frame } from "./ID3v2Frame";
import { BufferTools } from "./BufferTools";
import { InvalidDataException } from './InvalidDataException';
export class ID3v24Frame extends ID3v2Frame {
    constructor(id: string, bytes: Int8Array) {
        try {
            super(id, bytes);
        }
        catch (error) {
            throw new InvalidDataException();
        }
    }
    protected static create(bytes: Int8Array, offset: number): ID3v24Frame {
        let frame = new ID3v24Frame(null, null);
        frame.unpackFrame(bytes, offset);
        return frame;
    }
    protected unpackDataLength(buffer: number[], offset: number): void {
        this.dataLength = BufferTools.unpackSynchsafeInteger(buffer[offset + ID3v2Frame.DATA_LENGTH_OFFSET], buffer[offset + ID3v2Frame.DATA_LENGTH_OFFSET + 1], buffer[offset + ID3v2Frame.DATA_LENGTH_OFFSET + 2], buffer[offset + ID3v2Frame.DATA_LENGTH_OFFSET + 3]);
    }
    protected packDataLength(): number[] {
        return BufferTools.packSynchsafeInteger(this.dataLength);
    }
}
