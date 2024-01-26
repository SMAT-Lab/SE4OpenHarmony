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
import { NotSupportedException } from './NotSupportedException';
export class ID3v2ObseleteFrame extends ID3v2Frame {
    private static HEADER_LENGTH: number = 6;
    private static ID_OFFSET: number = 0;
    private static ID_LENGTH: number = 3;
    protected static DATA_LENGTH_OFFSET: number = 3;
    constructor(id: string, bytes: Int8Array) {
        super(id, bytes);
    }
    public static create(bytes: Int8Array, offset: number): ID3v2ObseleteFrame {
        let frame = new ID3v2ObseleteFrame(null, null);
        frame.unpackFrame(bytes, offset);
        return frame;
    }
    protected unpackHeader(buffer: Int8Array, offset: number): number {
        this.id = BufferTools.byteBufferToStringIgnoringEncodingIssues(buffer, offset + ID3v2ObseleteFrame.ID_OFFSET, ID3v2ObseleteFrame.ID_LENGTH);
        this.unpackDataLength(buffer, offset);
        return offset + ID3v2ObseleteFrame.HEADER_LENGTH;
    }
    // (byte) 0 ------> 0
    protected unpackDataLength(buffer: Int8Array, offset: number): void {
        this.dataLength = BufferTools.unpackInteger(0, buffer[offset + ID3v2ObseleteFrame.DATA_LENGTH_OFFSET], buffer[offset + ID3v2ObseleteFrame.DATA_LENGTH_OFFSET + 1], buffer[offset + ID3v2ObseleteFrame.DATA_LENGTH_OFFSET + 2]);
    }
    public packFrame(buffer: Int8Array, offset: number): void {
        throw new NotSupportedException("Packing Obselete frames is not supported");
    }
    public getLength(): number {
        return this.dataLength + ID3v2ObseleteFrame.HEADER_LENGTH;
    }
}
