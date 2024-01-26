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
import { BufferTools } from "./BufferTools";
import { InvalidDataException } from './InvalidDataException';
import { NotSupportedException } from './NotSupportedException';
export class ID3v2Frame {
    protected dataLength: number = 0;
    protected id: string;
    protected data: number[] = null;
    protected static DATA_LENGTH_OFFSET: number = 4;
    private static HEADER_LENGTH: number = 10;
    private static ID_OFFSET: number = 0;
    private static ID_LENGTH: number = 4;
    private static FLAGS1_OFFSET: number = 8;
    private static FLAGS2_OFFSET: number = 9;
    private static PRESERVE_TAG_BIT: number = 6;
    private static PRESERVE_FILE_BIT: number = 5;
    private static READ_ONLY_BIT: number = 4;
    private static GROUP_BIT: number = 6;
    private static COMPRESSION_BIT: number = 3;
    private static ENCRYPTION_BIT: number = 2;
    private static UNSYNCHRONISATION_BIT: number = 1;
    private static DATA_LENGTH_INDICATOR_BIT: number = 0;
    private preserveTag: boolean = false;
    private preserveFile: boolean = false;
    private readOnly: boolean = false;
    private group: boolean = false;
    private compression: boolean = false;
    private encryption: boolean = false;
    private unsynchronisation: boolean = false;
    private dataLengthIndicator: boolean = false;
    constructor(id: string, bytes: Int8Array) {
        this.id = id;
        this.data = bytes;
        this.dataLength = bytes == null ? 0 : bytes.length;
    }
    public static create(bytes: Int8Array, offset: number): ID3v2Frame {
        let frame = new ID3v2Frame(null, null);
        frame.unpackFrame(bytes, offset);
        return frame;
    }
    protected unpackFrame(bytes: Int8Array, offset: number): void {
        try {
            let dataOffset = this.unpackHeader(bytes, offset);
            this.sanityCheckUnpackedHeader();
            this.data = BufferTools.copyBuffer(bytes, dataOffset, this.dataLength);
        }
        catch (error) {
            throw new InvalidDataException();
        }
    }
    protected unpackHeader(bytes: Int8Array, offset: number): number {
        this.id = BufferTools.byteBufferToStringIgnoringEncodingIssues(bytes, offset + ID3v2Frame.ID_OFFSET, ID3v2Frame.ID_LENGTH);
        this.unpackDataLength(bytes, offset);
        this.unpackFlags(bytes, offset);
        return offset + ID3v2Frame.HEADER_LENGTH;
    }
    protected unpackDataLength(bytes: Int8Array, offset: number): void {
        this.dataLength = BufferTools.unpackInteger(bytes[offset + ID3v2Frame.DATA_LENGTH_OFFSET], bytes[offset + ID3v2Frame.DATA_LENGTH_OFFSET + 1], bytes[offset + ID3v2Frame.DATA_LENGTH_OFFSET + 2], bytes[offset + ID3v2Frame.DATA_LENGTH_OFFSET + 3]);
    }
    private unpackFlags(buffer: Int8Array, offset: number): void {
        this.preserveTag = BufferTools.checkBit(buffer[offset + ID3v2Frame.FLAGS1_OFFSET], ID3v2Frame.PRESERVE_TAG_BIT);
        this.preserveFile = BufferTools.checkBit(buffer[offset + ID3v2Frame.FLAGS1_OFFSET], ID3v2Frame.PRESERVE_FILE_BIT);
        this.readOnly = BufferTools.checkBit(buffer[offset + ID3v2Frame.FLAGS1_OFFSET], ID3v2Frame.READ_ONLY_BIT);
        this.group = BufferTools.checkBit(buffer[offset + ID3v2Frame.FLAGS2_OFFSET], ID3v2Frame.GROUP_BIT);
        this.compression = BufferTools.checkBit(buffer[offset + ID3v2Frame.FLAGS2_OFFSET], ID3v2Frame.COMPRESSION_BIT);
        this.encryption = BufferTools.checkBit(buffer[offset + ID3v2Frame.FLAGS2_OFFSET], ID3v2Frame.ENCRYPTION_BIT);
        this.unsynchronisation = BufferTools.checkBit(buffer[offset + ID3v2Frame.FLAGS2_OFFSET], ID3v2Frame.UNSYNCHRONISATION_BIT);
        this.dataLengthIndicator = BufferTools.checkBit(buffer[offset + ID3v2Frame.FLAGS2_OFFSET], ID3v2Frame.DATA_LENGTH_INDICATOR_BIT);
    }
    protected sanityCheckUnpackedHeader(): void {
        for (let i = 0; i < this.id.length; i++) {
            if (!((this.id.charAt(i) >= 'A' && this.id.charAt(i) <= 'Z') || (this.id.charAt(i) >= '0' && this.id.charAt(i) <= '9'))) {
                throw new InvalidDataException("Not a valid frame - invalid tag " + this.id);
            }
        }
    }
    public toBytes(): number[] {
        try {
            let bytes: number[] = new Array(this.getLength());
            this.packFrame(bytes, 0);
            return bytes;
        }
        catch (error) {
            throw new NotSupportedException();
        }
    }
    public packFrame(bytes: number[], offset: number): void {
        try {
            this.packHeader(bytes, offset);
            BufferTools.copyIntoByteBuffer(this.data, 0, this.data.length, bytes, offset + ID3v2Frame.HEADER_LENGTH);
        }
        catch (error) {
            throw new NotSupportedException();
        }
    }
    private packHeader(bytes: number[], i: number): void {
        try {
            BufferTools.stringIntoByteBuffer(this.id, 0, this.id.length, bytes, 0);
        }
        catch (error) {
        }
        BufferTools.copyIntoByteBuffer(this.packDataLength(), 0, 4, bytes, 4);
        BufferTools.copyIntoByteBuffer(this.packFlags(), 0, 2, bytes, 8);
    }
    protected packDataLength(): number[] {
        return BufferTools.packInteger(this.dataLength);
    }
    private packFlags(): number[] {
        let bytes: number[] = new Array(2);
        bytes[0] = BufferTools.setBit(bytes[0], ID3v2Frame.PRESERVE_TAG_BIT, this.preserveTag);
        bytes[0] = BufferTools.setBit(bytes[0], ID3v2Frame.PRESERVE_FILE_BIT, this.preserveFile);
        bytes[0] = BufferTools.setBit(bytes[0], ID3v2Frame.READ_ONLY_BIT, this.readOnly);
        bytes[1] = BufferTools.setBit(bytes[1], ID3v2Frame.GROUP_BIT, this.group);
        bytes[1] = BufferTools.setBit(bytes[1], ID3v2Frame.COMPRESSION_BIT, this.compression);
        bytes[1] = BufferTools.setBit(bytes[1], ID3v2Frame.ENCRYPTION_BIT, this.encryption);
        bytes[1] = BufferTools.setBit(bytes[1], ID3v2Frame.UNSYNCHRONISATION_BIT, this.unsynchronisation);
        bytes[1] = BufferTools.setBit(bytes[1], ID3v2Frame.DATA_LENGTH_INDICATOR_BIT, this.dataLengthIndicator);
        return bytes;
    }
    public getId(): string {
        return this.id;
    }
    public getDataLength(): number {
        return this.dataLength;
    }
    public getLength(): number {
        return this.dataLength + ID3v2Frame.HEADER_LENGTH;
    }
    public getData(): number[] {
        return this.data;
    }
    public setData(data: number[]): void {
        this.data = data;
        if (data == null)
            this.dataLength = 0;
        else
            this.dataLength = data.length;
    }
    public hasDataLengthIndicator(): boolean {
        return this.dataLengthIndicator;
    }
    public hasCompression(): boolean {
        return this.compression;
    }
    public hasEncryption(): boolean {
        return this.encryption;
    }
    public hasGroup(): boolean {
        return this.group;
    }
    public hasPreserveFile(): boolean {
        return this.preserveFile;
    }
    public hasPreserveTag(): boolean {
        return this.preserveTag;
    }
    public isReadOnly(): boolean {
        return this.readOnly;
    }
    public hasUnsynchronisation(): boolean {
        return this.unsynchronisation;
    }
}
