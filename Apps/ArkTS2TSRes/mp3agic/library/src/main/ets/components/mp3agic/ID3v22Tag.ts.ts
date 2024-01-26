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
import { AbstractID3v2Tag } from './AbstractID3v2Tag';
import { BufferTools } from "./BufferTools";
export class ID3v22Tag extends AbstractID3v2Tag {
    public static VERSION: string = "2.0";
    constructor(data?: Int8Array, obseleteFormat?: boolean) {
        super(data, obseleteFormat);
        if (!data) {
            this.version = ID3v22Tag.VERSION;
        }
    }
    public unpackFlags(bytes: Int8Array): void {
        this.unsynchronisation = BufferTools.checkBit(bytes[AbstractID3v2Tag.FLAGS_OFFSET], AbstractID3v2Tag.UNSYNCHRONISATION_BIT);
        this.compression = BufferTools.checkBit(bytes[AbstractID3v2Tag.FLAGS_OFFSET], AbstractID3v2Tag.COMPRESSION_BIT);
    }
    public packFlags(bytes: number[], offset: number): void {
        bytes[offset + AbstractID3v2Tag.FLAGS_OFFSET] = BufferTools.setBit(bytes[offset + AbstractID3v2Tag.FLAGS_OFFSET], AbstractID3v2Tag.UNSYNCHRONISATION_BIT, this.unsynchronisation);
        bytes[offset + AbstractID3v2Tag.FLAGS_OFFSET] = BufferTools.setBit(bytes[offset + AbstractID3v2Tag.FLAGS_OFFSET], AbstractID3v2Tag.COMPRESSION_BIT, this.compression);
    }
}
